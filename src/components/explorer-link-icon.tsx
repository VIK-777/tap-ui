import React from "react"

interface ExplorerLinkIconProps {
  address: string
}

export const ExplorerLinkIcon: React.FC<ExplorerLinkIconProps> = ({
  address,
}) => {
  const explorerUrl = `https://tonviewer.com/${address}`
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        marginLeft: "0px",
        display: "inline-block",
        verticalAlign: "text-top",
      }}>
      <img
        src={`${baseUrl}/explorer-image.svg`}
        alt="View on Explorer"
        style={{
          verticalAlign: "middle",
          width: "16px",
          height: "16px",
          filter: "grayscale(100%)",
        }}
      />
    </a>
  )
}
