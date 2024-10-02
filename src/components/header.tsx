import { TonConnectButton } from "@tonconnect/ui-react"

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <span>TON Investments</span>
      <TonConnectButton />
    </header>
  )
}
