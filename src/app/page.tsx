"use client"

import { TonConnectUIProvider } from "@tonconnect/ui-react"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <TonConnectUIProvider manifestUrl="https://vik-777.github.io/tap-ui/tonconnect-manifest.json">
      <div>
        <Header />
      </div>
    </TonConnectUIProvider>
  )
}
