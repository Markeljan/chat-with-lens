'use client'

import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

export function useVoiceInput(handleInputSpeechEnd: () => void = () => { }) {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef<any>(null)
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const MAX_SILENCE_DURATION = 2000;

    // Function to start recording
    const startRecording = () => {
        setIsRecording(true);
        // Create a new SpeechRecognition instance and configure it
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
            const { transcript } = event.results[event.results.length - 1][0];
            setTranscript(transcript);

            // Clear any existing timeout
            if (silenceTimeoutRef.current) {
                clearTimeout(silenceTimeoutRef.current);
            }

            // Set a new timeout
            silenceTimeoutRef.current = setTimeout(() => {
                stopRecording();
            }, MAX_SILENCE_DURATION);
        };

        recognitionRef.current.onspeechend = () => {
            handleInputSpeechEnd();
        };

        // Start the speech recognition
        recognitionRef.current.start();
    };

    // Cleanup effect when the component unmounts
    useEffect(() => {
        return () => {
            // Stop the speech recognition if it's active
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            // Clear any existing timeout
            if (silenceTimeoutRef.current) {
                clearTimeout(silenceTimeoutRef.current);
            }
        };
    }, []);

    function stopRecording() {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    };

    function handleToggleRecording(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        setIsRecording(!isRecording);
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    };

    return { handleToggleRecording, isRecording, transcript }

}