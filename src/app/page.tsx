import Link from 'next/link';

export default function Home() {
  return (
    <body>
      <div><Link href={`/farms`}>Farms</Link></div>
      <div><Link href={`/userAssets`}>User Assets</Link></div>
    </body>
  )
}
