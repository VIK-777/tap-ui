"use client"

import { UserAssets } from "@/components/userassets"
import { Header, Under } from "@/components/header"
import TonConnectUIProvider from "@/components/TonConnectUIProvider"

export default function Home() {
  return (
    <TonConnectUIProvider manifestUrl="https://tontools.vishnevskiy.dev/tonconnect-manifest.json">
      <div>
        <Header />
        <div className="pb-20">
          <UserAssets
            flatten={true}
            address="EQBlsic2160scD9raXoa61gwRvBw3rseL2-K65d5Y1cXpyzK"
            categoryFieldName="name"></UserAssets>
        </div>
        <Under />
      </div>
    </TonConnectUIProvider>
  )
}
