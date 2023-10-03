'use client'

import { Mic as IconMic, Pause as IconPause } from 'lucide-react'

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VoiceInputButtonProps = ButtonProps & {
  handleToggleRecording: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  isRecording: boolean
}

export function VoiceInputButton({
  className,
  handleToggleRecording,
  isRecording,
  ...props
}: VoiceInputButtonProps) {

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant={isRecording ? 'destructive' : 'default'}
          onClick={(event) => handleToggleRecording(event)}
          // add pulsing animation when recording
          className={cn((isRecording && 'animate-pulse'), className)}
          {...props}
        >
          {isRecording ? <IconPause /> : <IconMic />}
          <span className="sr-only">Voice Input</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Voice Input</TooltipContent>
    </Tooltip >

  )
}