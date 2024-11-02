import { TonConnectButton } from "@tonconnect/ui-react"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <div className="logo-container">
          <img
            src="https://vik-777.github.io/tap-ui/favicon.ico"
            alt="Vanguard Vision Logo"
          />
        </div>
        <span className="ml-2">
          {" "}
          {/* Add margin-left here */}
          <Link href={`/`}>Vanguard Vision</Link>
        </span>
      </div>
      <div>
        <Link href={`/farms`}>Farms</Link>
      </div>
      <div>
        <Link href={`/userAssets`}>User Assets</Link>
      </div>
      <div>
        <Link href={`/userAssets2`}>User Assets 2</Link>
      </div>
      <TonConnectButton />
    </header>
  )
}
