import { useEffect, useRef } from 'react'
import { UseChatHelpers } from 'ai/react'
import Textarea from 'react-textarea-autosize'

import { Button } from '@/components/ui/button'
import { IconArrowElbow } from '@/components/ui/icons'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { VoiceInputButton } from '@/components/voice-input-button'
import { useVoiceInput } from '@/lib/hooks/use-voice-input'



export interface PromptProps
    extends Pick<UseChatHelpers, 'input' | 'setInput'> {
    onSubmit: (value: string) => Promise<void>
    isLoading: boolean
}

export function PromptForm({
    onSubmit,
    input,
    setInput,
    isLoading
}: PromptProps) {
    const { formRef, onKeyDown } = useEnterSubmit()
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const { transcript, isRecording, handleToggleRecording } = useVoiceInput(() => {
        formRef.current?.requestSubmit()
    })

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    useEffect(() => {
        if (transcript) {
            setInput(transcript)
        }
    }, [transcript])

    return (
        <form
            onSubmit={async e => {
                e.preventDefault()
                if (!input?.trim() || isLoading) {
                    return
                }
                setInput('')
                await onSubmit(input)
            }}
            ref={formRef}
        >
            <div className='relative'>
                <div className="absolute bottom-3 left-0 sm:left-4">
                    <VoiceInputButton isRecording={isRecording} handleToggleRecording={handleToggleRecording} />
                </div>
                <div className="flex max-h-[140px] w-full grow overflow-scroll bg-background px-8 sm:rounded-md sm:border sm:px-12">
                    <Textarea
                        ref={inputRef}
                        tabIndex={0}
                        onKeyDown={onKeyDown}
                        rows={1}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Send a message."
                        spellCheck={false}
                        className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                    />

                </div>
                <div className="absolute bottom-3 right-0 sm:right-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || input === ''}
                            >
                                <IconArrowElbow />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </form >
    )
}