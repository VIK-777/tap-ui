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

interface UserAssetKeys {
  [key: string]: any;
}

interface UserAsset extends UserAssetKeys {
  name: string,
  image: string,
  category: string,
  balance: number,
  prices: {
    TON: number,
    USD: number
  },
  values: {
    TON: number,
    USD: number
  },
  comment: string,
  mappedAssets: [UserAsset],
}

export function UserAssets() {
  const [searchTerms, setSearchTerms] = useState({
    name: "",
  })
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState<any>(null)
  const [data, setData] = useState<UserAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/test') // Replace with your API endpoint
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, []);

  const filteredAssets = useMemo(() => {
    return data.filter((dat) => {
      return (
        dat.name.toLowerCase().includes(searchTerms.name.toLowerCase())
      )
    })
  }, [searchTerms, data])
  const sortedAssets = useMemo(() => {
    if (!sortColumn) return filteredAssets

    const getNestedValue = (obj: UserAsset, path: string) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    return filteredAssets.sort((a, b) => {
      const valueA = getNestedValue(a, sortColumn);
      const valueB = getNestedValue(b, sortColumn);

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredAssets, sortColumn, sortDirection, data])

  const handleSort = (column: any) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }
  const handleSearch = (e: { target: { name: any; value: any } }) => {
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
      borderRadius: '50%',
    },
    text: {
      lineHeight: '1em', // Ensure line height matches the image height
      margin: '0 10px', // Optional: Add some margin around the text
    },
  };

  return (
    <div className="bg-background rounded-lg shadow-lg">
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
      <div className="p-4 border-b">
        Total assets: ${(data.reduce((sum, item) => sum + item.values.USD, 0)).toFixed(2)} / {(data.reduce((sum, item) => sum + item.values.TON, 0)).toFixed(2)} TON
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
              Category
              {sortColumn === "category" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Name
              {sortColumn === "name" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("balance")}>
              Balance
              {sortColumn === "balance" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("values.USD")}>
              USD Total
              {sortColumn === "values.USD" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("values.TON")}>
              TON Total
              {sortColumn === "values.TON" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets
      .map((dat, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{dat.category}</TableCell>
              <TableCell style={styles.container}>
                <img src={dat.image} style={styles.image} title={dat.name}></img><a style={styles.text}>{dat.name}</a>
              </TableCell>
              <TableCell>{dat.balance.toFixed(2)}</TableCell>
              <TableCell>${dat.values.USD.toFixed(2)}</TableCell>
              <TableCell>{dat.values.TON.toFixed(2)} TON</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}