'use client'

import { type Message } from 'ai'
import { Speech as IconSpeech } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { useTextToSpeech } from '@/lib/hooks/use-text-to-speech'


interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
    message: Message
    voiceId: string
}

export function ChatMessageActions({
    message,
    voiceId,
    className,
    ...props
}: ChatMessageActionsProps) {
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
    const toggleAudio = useTextToSpeech()

    const onCopy = () => {
        if (isCopied) return
        copyToClipboard(message.content)
    }

    const onToggleAudio = () => {
        toggleAudio(message.content, voiceId)
    }


    return (
        <div
            className={cn(
                'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
                className
            )}
            {...props}
        >
            {message.role === 'assistant' && (
                <Button variant="ghost" size="icon" onClick={onToggleAudio}>
                    <IconSpeech className='h4 w-4' />
                    <span className="sr-only">Play message</span>
                </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onCopy}>
                {isCopied ? <IconCheck /> : <IconCopy />}
                <span className="sr-only">Copy message</span>
            </Button>
        </div>
    )
}