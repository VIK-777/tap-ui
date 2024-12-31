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
          {" "}
          {/* Add padding-bottom to the main content */}
          <UserAssets
            flatten={false}
            address="EQBlsic2160scD9raXoa61gwRvBw3rseL2-K65d5Y1cXpyzK"
            categoryFieldName="category"></UserAssets>
        </div>
        <Under />
      </div>
    </TonConnectUIProvider>
  )
}
