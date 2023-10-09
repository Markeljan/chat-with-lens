'use client'

import { useChat, type Message } from 'ai/react'
import { toast } from 'react-hot-toast'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useTextToSpeech } from '@/lib/hooks/use-text-to-speech'
import { useEffect, useState } from 'react'
import usePublicationContent from '@/app/lens/use-publication-content'

export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
}

export function Chat({ className }: ChatProps) {
    const publicationContentString = usePublicationContent({ handle: 'stani' })
    const publicationContentMessage = {
        id: '0',
        role: 'system' as const,
        content: publicationContentString
    }
    const toggleAudio = useTextToSpeech()

    const { messages, append, reload, stop, isLoading, input, setInput } =
        useChat({
            initialMessages: [publicationContentMessage],
            onResponse(response) {
                if (response.status === 401) {
                    toast.error(response.statusText)
                }
            },
            onFinish(message) {
                toggleAudio(message.content)
            }
        })

    return (
        <>
            <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
                {messages.length ? (
                    <>
                        <ChatList messages={messages} />
                        <ChatScrollAnchor trackVisibility={isLoading} />
                    </>
                ) : <></>
                }
            </div>
            <ChatPanel
                isLoading={isLoading}
                stop={stop}
                append={append}
                reload={reload}
                messages={messages}
                input={input}
                setInput={setInput}
            />
        </>
    )
}