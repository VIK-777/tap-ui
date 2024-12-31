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

import { useRef, useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  SortDescriptor,
} from "@nextui-org/table"
import Chart from "chart.js/auto"
import { Button } from "@nextui-org/react"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExplorerLinkIcon } from "@/components/explorer-link-icon"
import { useTonAddress } from "@/hooks/useTonAddress"

interface UserAssetKeys {
  [key: string]: any
}

interface UserAsset extends UserAssetKeys {
  name: string
  symbol: string
  address: string
  image: string
  category: string
  balance: number
  prices: {
    TON: number
    USD: number
  }
  values: {
    TON: number
    USD: number
  }
  comment: string
  mappedAssets: UserAsset[]
}

interface UserAssetsProps {
  address: string
  flatten: boolean
  categoryFieldName: string
}

export function UserAssets({
  address,
  flatten,
  categoryFieldName,
}: UserAssetsProps) {
  const [searchTerms, setSearchTerms] = useState({
    name: "",
  })
  const [sortColumn, setSortColumn] = useState<string | undefined>("")
  const [sortDirection, setSortDirection] = useState<any>(null)
  const [data, setData] = useState<UserAsset[]>([])
  // const [isLoading, setIsLoading] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(address)
  const [isFetching, setIsFetching] = useState(false) // State for loading indicator

  // State to manage expansion for each asset
  const [expandedAssets, setExpandedAssets] = useState<Record<number, boolean>>(
    {}
  )

  const tonAddress = useTonAddress()

  useEffect(() => {
    if (tonAddress !== null && tonAddress !== undefined && tonAddress !== "") {
      setCurrentAddress(tonAddress)
    }
  }, [tonAddress])

  const loadData = () => {
    setIsFetching(true) // Show loading indicator
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/test?flatten=${flatten}&address=${currentAddress}`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        // Reset expanded rows when new data is fetched
        setExpandedAssets({})
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setIsFetching(false)) // Hide loading indicator
  }

  const filteredAssets = useMemo(() => {
    return data.filter((dat) => {
      return dat.name.toLowerCase().includes(searchTerms.name.toLowerCase())
    })
  }, [searchTerms, data])
  const sortedAssets = useMemo(() => {
    if (!sortColumn) return filteredAssets

    const getNestedValue = (obj: UserAsset, path: string) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj)
    }

    return filteredAssets.sort((a, b) => {
      const valueA = getNestedValue(a, sortColumn)
      const valueB = getNestedValue(b, sortColumn)

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredAssets, sortColumn, sortDirection, data])

  const handleSort = (sortDescriptor: SortDescriptor) => {
    if (sortColumn === sortDescriptor.column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(sortDescriptor.column?.toString())
      setSortDirection("asc")
    }
    return sortedAssets
  }
  const handleSearch = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setSearchTerms((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAddress(e.target.value)
  }

  const styles = {
    container: {
      display: "flex",
      alignItems: "center", // This will vertically center the content
      lineHeight: "auto",
    },
    image: {
      height: "2em", // Set the image height to match the text height
      width: "auto", // Maintain aspect ratio
      verticalAlign: "middle", // Ensure vertical alignment with text
      borderRadius: "50%",
      marginRight: "10px",
    },
    text: {
      lineHeight: "auto", // Ensure line height matches the image height
      marginRight: "5px", // Optional: Add some margin around the text
    },
  }

  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = canvas.current

    if (ctx) {
      if (Chart.getChart("myChart")) {
        Chart.getChart("myChart")?.destroy()
      }

      // Group data by category and calculate total USD value for each category
      const categoryData = data.reduce<Record<string, number>>((acc, asset) => {
        const category = asset[categoryFieldName]
        if (!acc[category]) {
          acc[category] = 0
        }
        acc[category] += asset.values.USD
        return acc
      }, {})

      // Extract labels and data for the chart
      const labels = Object.keys(categoryData)
      const chartData = Object.values(categoryData).map((value: number) =>
        value.toFixed(2)
      )

      const chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "USD Value",
              data: chartData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Total USD Value by categories",
            },
          },
        },
      })
    }
  }, [data, categoryFieldName])

  // Function to toggle asset expansion
  const toggleAssetExpansion = (assetIndex: number) => {
    setExpandedAssets((prevExpandedAssets) => ({
      ...prevExpandedAssets,
      [assetIndex]: !prevExpandedAssets[assetIndex],
    }))
  }

  const renderAssets = (assets: UserAsset[], assetIndex: number, level = 0) => {
    const indentStyle = {
      paddingLeft: `${level * 20}px`,
      whiteSpace: "nowrap",
    } // 20px indentation per level

    return (
      <div>
        {assets.map((asset, i) => (
          <div style={indentStyle} key={i}>
            {level > 0 && "↳ "}
            {Number.isInteger(asset.balance)
              ? asset.balance
              : asset.balance.toFixed(2)}{" "}
            {asset.symbol}{" "}
            {level > 0 && <ExplorerLinkIcon address={asset.address} />}
            {level === 0 &&
              i === 0 &&
              assets[0].mappedAssets &&
              assets[0].mappedAssets.length > 0 && (
                <Button
                  size="sm"
                  onClick={() => toggleAssetExpansion(assetIndex)}>
                  {expandedAssets[assetIndex] ? "Collapse" : "Expand"}
                </Button>
              )}
            <AnimatePresence>
              {expandedAssets[assetIndex] && asset.mappedAssets && (
                <motion.div
                  key={assetIndex}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}>
                  {renderAssets(asset.mappedAssets, assetIndex, level + 1)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-background rounded-lg shadow-lg">
      {data.length === 0 ? (
        <div className="p-4 border-b">
          Address
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input
                name="address"
                placeholder="Enter address"
                value={currentAddress}
                onChange={handleAddressChange}
                className="bg-muted"
              />
            </div>
            <div>
              {" "}
              {/* Add a button to trigger data fetching */}
              <Button onClick={loadData} disabled={isFetching}>
                {isFetching ? (
                  <span className="loading custom-spinner"></span> // Spinner while loading
                ) : (
                  "Fetch Data"
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 border-b">
            Address
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Input
                  name="address"
                  placeholder="Enter address"
                  value={currentAddress}
                  onChange={handleAddressChange}
                  className="bg-muted"
                />
              </div>
              <div>
                {" "}
                {/* Add a button to trigger data fetching */}
                <Button onClick={loadData} disabled={isFetching}>
                  {isFetching ? (
                    <span className="loading custom-spinner"></span> // Spinner while loading
                  ) : (
                    "Fetch Data"
                  )}
                </Button>
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
          <div className="p-4 border-b">
            Total assets: $
            {data.reduce((sum, item) => sum + item.values.USD, 0).toFixed(2)} /{" "}
            {data.reduce((sum, item) => sum + item.values.TON, 0).toFixed(2)}{" "}
            TON
          </div>
          <div
            className="container"
            style={{ width: "300px", height: "300px" }}>
            <canvas id="myChart" ref={canvas}></canvas>
          </div>
          <Table
            aria-label="User Assets Table" // Add an accessible label
            onSortChange={handleSort}
            isStriped>
            <TableHeader>
              <TableColumn> </TableColumn>
              <TableColumn key="category" allowsSorting>
                Category
              </TableColumn>
              <TableColumn key="name" allowsSorting>
                Name
              </TableColumn>
              <TableColumn key="balance" allowsSorting>
                Balance
              </TableColumn>
              <TableColumn key="values.USD" allowsSorting>
                USD Total
              </TableColumn>
              <TableColumn key="values.TON" allowsSorting>
                TON Total
              </TableColumn>
            </TableHeader>
            <TableBody>
              {sortedAssets.map((dat, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{dat.category}</TableCell>
                  <TableCell>
                    <div style={styles.container}>
                      <img
                        src={dat.image}
                        style={styles.image}
                        title={dat.name}></img>
                      <span>
                        <a style={styles.text}>{dat.name}</a>
                        <ExplorerLinkIcon address={dat.address} />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderAssets([dat], index)} {/* Pass the asset index */}
                  </TableCell>
                  <TableCell>${dat.values.USD.toFixed(2)}</TableCell>
                  <TableCell>{dat.values.TON.toFixed(2)} TON</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  )
}
