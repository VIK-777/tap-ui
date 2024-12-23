import { TonConnectButton } from "@tonconnect/ui-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

// Create a reusable component for the links
const NavigationLinks = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className="flex justify-center">
      {" "}
      {/* Center links horizontally */}
      <div className="mr-4">
        <Link href={`/farms`}>Farms</Link>
      </div>
      <div className="mr-4">
        <Link href={`/userAssets`}>User Assets</Link>
      </div>
      <div className="mr-4">
        <Link href={`/userAssetsPlain`}>User Assets (plain)</Link>
      </div>
    </div>
  )
}

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <div className="logo-container">
          <Link href={"/"}>
            <Image
              src="https://vik-777.github.io/tap-ui/logo.ico"
              alt="VV Logo"
              width={1024}
              height={1024}
            />
          </Link>
        </div>
        <span className="ml-2">
          <Link href={`/`}>VV Tools</Link>
        </span>
      </div>
      {/* Conditionally render links based on isMobile state */}
      {!isMobile && <NavigationLinks isMobile={isMobile} />}
      <TonConnectButton />
    </header>
  )
}

export const Under = () => {
  const [isMobile, setIsMobile] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null) // Ref for the main content

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className="fixed bottom-0 left-0 w-full"
      style={{ backgroundColor: "rgb(255, 255, 255)" }}>
      {/* rgb(31, 41, 55) is the equivalent of gray-800 */}
      <div className="container mx-auto p-4 text-center">
        {isMobile && <NavigationLinks isMobile={isMobile} />}
      </div>
    </div>
  )
}
