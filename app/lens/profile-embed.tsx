'use client'

import { useTheme } from 'next-themes'

import { Profile, Theme } from '@lens-protocol/widgets-react'


export default function ProfileEmbed({ handle }: { handle?: string }) {
    const { resolvedTheme } = useTheme()
    return <Profile
        handle={handle || "stani"}
        theme={resolvedTheme as Theme}
        containerStyle={{ width: '100%', height: '100%' }}
    />
}