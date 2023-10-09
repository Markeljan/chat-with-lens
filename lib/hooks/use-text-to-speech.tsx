'use client'

import { useState, useCallback, useEffect } from "react";

export function useTextToSpeech() {
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);


    useEffect(() => {
        setAudioElement(new Audio());
    }, []);

    const toggleAudio = useCallback(async (text: string, voiceId: string) => {
        if (isPlaying && audioSource) {
            audioSource.stop();
            setIsPlaying(false);
            return;
        }

        const response = await fetch('/api/text-to-speech', {
            method: 'POST',
            headers: {
                'accept': "audio/mpeg",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, voiceId })
        });

        if (!response.ok || !response.body) {
            const { error } = await response.json();
            console.error("Error generating audio:", error);
            throw new Error("Error generating audio");
        }

        const audioURL = URL.createObjectURL(await response.blob());
        if (!audioElement) {
            return;
        }
        audioElement.src = audioURL;
        audioElement.controls = true;

        audioElement.onended = () => {
            setIsPlaying(false);
            URL.revokeObjectURL(audioURL); // Revoke the URL after playback ends
        };

        audioElement.play();
        setIsPlaying(true);
    }, [audioElement, isPlaying]);

    useEffect(() => {
        return () => {
            if (audioSource) {
                audioSource.stop();
            }
        };
    }, [audioSource]);

    return toggleAudio;
}
