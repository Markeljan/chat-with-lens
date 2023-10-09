'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { LensProvider, LensConfig, production } from "@lens-protocol/react-web";
import { polygonMumbai, polygon } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

import { TooltipProvider } from '@/components/ui/tooltip'



const { publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai, polygon],
    [publicProvider()]
);

const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
        new InjectedConnector({
            options: {
                shimDisconnect: false,
            },
        }),
    ],
});

const lensConfig: LensConfig = {
    bindings: wagmiBindings(),
    environment: production,
};

export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props} >
            <WagmiConfig config={config}>
                <LensProvider config={lensConfig}>
                    <TooltipProvider>{children}</TooltipProvider>
                </LensProvider>
            </WagmiConfig>
        </NextThemesProvider>
    )
}