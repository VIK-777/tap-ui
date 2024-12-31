"use client"

import { FarmsCalculator } from "@/components/farmscalculator"
import { Header, Under } from "@/components/header"
import TonConnectUIProvider from "@/components/TonConnectUIProvider"

export default function Home() {
  return (
    <TonConnectUIProvider manifestUrl="https://tontools.vishnevskiy.dev/tonconnect-manifest.json">
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
