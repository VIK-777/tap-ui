'use client'

import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname()
  const basePathSegments = pathname.split('/').slice(0, -1)
  const basePath = basePathSegments.join('/')
  console.log("Base path: " + basePath)
  return (
    <body>
      <div><a href={`${basePath}/farms`}>Farms</a></div>
      <div><a href={`${basePath}/userAssets`}>User Assets</a></div>
    </body>
  )
}
