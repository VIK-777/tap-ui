'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  // const pathname = usePathname()
  // const basePathSegments = pathname.split('/').slice(0, -1)
  // const basePath = basePathSegments.join('/')

  // Get the current URL origin (e.g., "https://mysite.com")
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  // Get the pathname without the leading slash
  const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/^\//, '') : '';
  console.log("pathname: " + pathname)

  // Construct the base path
  const basePath = pathname ? `/${pathname}` : '';

  console.log("Base path: " + basePath)
  return (
    <body>
      <div><Link href={`${basePath}/farms`}>Farms</Link></div>
      <div><Link href={`${basePath}/userAssets`}>User Assets</Link></div>
    </body>
  )
}
