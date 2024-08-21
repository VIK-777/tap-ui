/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/z6sPCllUccr
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Link from 'next/link'
import NavLink from "@/components/nav-link"

interface Pool {
  name: string,
  url: string,
  dailyReward: number,
  totalReward: number,
  investmentInUSD: number,
  liquidityBeforeDeposit: number,
  liquidityAfterDeposit: number,
  position: number,
  positionInPercents: number,
  dailyRewardInUSD: number,
  dailyRewardInPercents: number,
  daysLeft: number,
  maxPossibleRewardInUSD: number,
}

export function Component() {
  const [searchTerms, setSearchTerms] = useState({
    name: "",
    deposit: 100,
  })
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)
  const [data, setData] = useState<Pool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    fetch('http://localhost:8091/rewards?deposit=' + searchTerms.deposit) // Replace with your API endpoint
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [searchTerms.deposit]);

  const filteredPools = useMemo(() => {
    return data.filter((dat) => {
      return (
        dat.name.toLowerCase().includes(searchTerms.name.toLowerCase())
      )
    })
  }, [searchTerms, data])
  const sortedPools = useMemo(() => {
    if (!sortColumn) return filteredPools
    return filteredPools.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredPools, sortColumn, sortDirection, data])

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }
  const handleSearch = (e) => {
    const { name, value } = e.target
    setSearchTerms((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  if (isLoading && data.length === 0) {
    return <div>Loading...</div>;
  }

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center', // Align items vertically centered
    },
    image: {
      height: '2em', // Set the image height to match the text height
      width: 'auto', // Maintain aspect ratio
      verticalAlign: 'middle', // Ensure vertical alignment with text
    },
    text: {
      lineHeight: '1em', // Ensure line height matches the image height
      margin: '0 10px', // Optional: Add some margin around the text
    },
  };

  return (
    <div className="bg-background rounded-lg shadow-lg">
      <div className="p-4 border-b">
        Deposit
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Input
              name="deposit"
              placeholder="Search by deposit in $"
              value={searchTerms.deposit}
              onChange={handleSearch}
              className="bg-muted"
            />
          </div>
        </div>
      </div>
      <div className="p-4 border-b">
        Filters
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Input
              name="name"
              placeholder="Search by name"
              value={searchTerms.name}
              onChange={handleSearch}
              className="bg-muted"
            />
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("deposit")}>
              Your Deposit
              {sortColumn === "deposit" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Pool
              {sortColumn === "name" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("dailyReward")}>
              Pool Daily Reward
              {sortColumn === "dailyReward" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("totalReward")}>
              Pool Total Reward
              {sortColumn === "totalReward" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("liquidityBeforeDeposit")}>
              Liquidity Before Deposit
              {sortColumn === "liquidityBeforeDeposit" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("liquidityAfterDeposit")}>
              Liquidity After Deposit
              {sortColumn === "liquidityAfterDeposit" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("position")}>
              Your Position
              {sortColumn === "position" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("dailyRewardInUSD")}>
              Your Daily Profit
              {sortColumn === "dailyRewardInUSD" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("daysLeft")}>
              Days Left
              {sortColumn === "daysLeft" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("maxPossibleRewardInUSD")}>
              Your Max Possible Profit
              {sortColumn === "maxPossibleRewardInUSD" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPools.map((dat) => (
            <TableRow key={dat.name}>
              <TableCell>${dat.investmentInUSD}</TableCell>
              <TableCell style={styles.container}>
                <img src="https://dedust.io/favicon.ico" style={styles.image}></img><a href={dat.url} style={styles.text}><u>{dat.name}</u></a>
              </TableCell>
              <TableCell>${dat.dailyReward}</TableCell>
              <TableCell>${dat.totalReward}</TableCell>
              <TableCell>${dat.liquidityBeforeDeposit}</TableCell>
              <TableCell>${dat.liquidityAfterDeposit}</TableCell>
              <TableCell>{dat.positionInPercents}%</TableCell>
              <TableCell>${dat.dailyRewardInUSD}</TableCell>
              <TableCell>{dat.daysLeft}</TableCell>
              <TableCell>${dat.maxPossibleRewardInUSD}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
