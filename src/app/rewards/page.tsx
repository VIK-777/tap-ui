"use client"

import { Rewards } from "@/components/rewards"
import { Header, Under } from "@/components/header"
import TonConnectUIProvider from "@/components/TonConnectUIProvider"

export default function Home() {
  return (
    <TonConnectUIProvider manifestUrl="https://tontools.vishnevskiy.dev/tonconnect-manifest.json">
      <div>
        <Header />
        <div className="pb-20">
          <Rewards />
        </div>
        <Under />
      </div>
    </TonConnectUIProvider>
  )
}
