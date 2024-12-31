"use client"

import { Header, Under } from "@/components/header"
import TonConnectUIProvider from "@/components/TonConnectUIProvider"

export default function Home() {
  return (
    <TonConnectUIProvider manifestUrl="https://tontools.vishnevskiy.dev/tonconnect-manifest.json">
      <div>
        <Header />
        <Under />
      </div>
    </TonConnectUIProvider>
  )
}
