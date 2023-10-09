'use client'

import { useChat, type Message } from 'ai/react'
import { toast } from 'react-hot-toast'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useTextToSpeech } from '@/lib/hooks/use-text-to-speech'
import usePublicationContent from '@/app/lens/use-publication-content'
import ProfileEmbed from '@/app/lens/profile-embed'

export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
}

export function Chat({ className, handle }: ChatProps & { handle: string }) {
    const publicationContentString = usePublicationContent({ handle: handle || 'stani' })
    const voiceId = handle === 'stani' ? 'VlV52zS5NCUt9NPe1OcZ' : handle === 'nader' ? '3HBw1sEab1KBYMDEugo6' : handle === 'markeljan' ? 'nQBi4oZIEJAdZGHGtOpV' : '1rEpyS4Ro5Yt7Yiodu6s'
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
                toggleAudio(message.content, voiceId)
            }
        })

    return (
        <>
            <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
                {messages.length ? (
                    <>
                        <div className="flex justify-center mt-2 mb-1 max-w-[350px] lg:max-w-[400px] mx-auto">
                            <ProfileEmbed handle='stani' />
                        </div>
                        <ChatList messages={messages} voiceId={voiceId} />
                        <ChatScrollAnchor trackVisibility={isLoading} />
                    </>
                ) : <>    <div className="flex justify-center mt-2 mb-1 max-w-[350px] lg:max-w-[400px] mx-auto">
                    <ProfileEmbed handle='stani' />
                </div></>
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