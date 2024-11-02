import { TonConnectButton } from "@tonconnect/ui-react"

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
          Vanguard Vision
        </span>
      </div>
      <TonConnectButton />
    </header>
  )
}
