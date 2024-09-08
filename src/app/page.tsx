'use client'

import Link from 'next/link';

export default function Home() {
  // Get the pathname without the leading slash
  const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/^\//, '') : '';
  console.log("pathname: " + pathname)
  // Construct the base path
  const basePath = pathname ? `/${pathname}` : '';
  console.log("Base path: " + basePath)
  return (
    <body>
      <div><Link href={`/farms`}>Farms</Link></div>
      <div><Link href={`/userAssets`}>User Assets</Link></div>
    </body>
  )
}
