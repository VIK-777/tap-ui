"use client"

import { UserAssets } from "@/components/userassets"
import { TonConnectUIProvider } from "@tonconnect/ui-react"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <TonConnectUIProvider manifestUrl="https://vik-777.github.io/tap-ui/tonconnect-manifest.json">
      <div>
        <Header />
        <UserAssets
          flatten={true}
          address="EQBlsic2160scD9raXoa61gwRvBw3rseL2-K65d5Y1cXpyzK"
          categoryFieldName="name"></UserAssets>
      </div>
    </TonConnectUIProvider>
  )
}
