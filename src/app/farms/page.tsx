"use client"

import { FarmsCalculator } from "@/components/farmscalculator"
import { TonConnectUIProvider } from "@tonconnect/ui-react"
import { Header, Under } from "@/components/header"

export default function Home() {
  return (
    <TonConnectUIProvider manifestUrl="https://vik-777.github.io/tap-ui/tonconnect-manifest.json">
      <div>
        <Header />
        <div className="pb-20">
          <FarmsCalculator />
        </div>
        <Under />
      </div>
    </TonConnectUIProvider>
  )
}
