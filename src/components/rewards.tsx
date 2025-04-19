"use client"

import { useState, useMemo } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@nextui-org/table"
import { Button } from "@nextui-org/react"

interface RewardProps {
  wallet: string
  tokenName: string
  tonValue: string
  dateReceived: string
}

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  setSelectedOptions,
  label,
}: {
  options: string[]
  selectedOptions: string[]
  setSelectedOptions: (options: string[]) => void
  label: string
}) => {
  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option))
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="bg-muted p-2 rounded w-full border border-gray-300 max-h-40 overflow-y-auto">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="form-checkbox"
            />
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Rewards() {
  const [rewards, setRewards] = useState<RewardProps[]>([])
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [address, setAddress] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  )
  const [selectedTokenName, setSelectedTokenName] = useState<string | null>(
    null
  )
  const [extendedInfo, setExtendedInfo] = useState(false)
  const [originalRewards, setOriginalRewards] = useState<RewardProps[]>([])
  const [selectedWallets, setSelectedWallets] = useState<string[]>([])
  const [selectedTokenNames, setSelectedTokenNames] = useState<string[]>([])

  // Fetch data from API
  const fetchRewards = async () => {
    setIsFetching(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/rewardTokensRewards?addresses=${address}`
      )
      const data = await response.json()

      if (Array.isArray(data)) {
        // Aggregate data by wallet, tokenName, and dateReceived
        const aggregatedData = Array.from(
          data.reduce((map, reward) => {
            const key = `${reward.wallet}-${reward.tokenName}-${reward.dateReceived}`
            if (!map.has(key)) {
              map.set(key, {
                wallet: reward.wallet,
                tokenName: reward.tokenName,
                dateReceived: reward.dateReceived,
                tonValue: 0,
              })
            }
            map.get(key).tonValue += parseFloat(reward.tonValue)
            return map
          }, new Map())
        ).map((entry) => {
          const [, reward] = entry as [string, RewardProps]
          return reward
        })

        // Store the aggregated data
        setOriginalRewards(aggregatedData)
      } else {
        console.error("API response is not an array:", data)
        setOriginalRewards([])
      }
    } catch (error) {
      console.error("Failed to fetch rewards:", error)
      setOriginalRewards([])
    } finally {
      setIsFetching(false)
    }
  }

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  const distinctWallets = useMemo(() => {
    return Array.from(
      new Set(originalRewards.map((reward) => reward.wallet))
    ).sort()
  }, [originalRewards])

  const distinctTokenNames = useMemo(() => {
    return Array.from(
      new Set(originalRewards.map((reward) => reward.tokenName))
    ).sort()
  }, [originalRewards])

  const filteredData = useMemo(() => {
    return originalRewards.filter((reward) => {
      const matchesStartDate = startDate
        ? new Date(reward.dateReceived) >= startDate
        : true
      const matchesEndDate = endDate
        ? new Date(reward.dateReceived) <= endDate
        : true
      const matchesSelectedWallets = selectedWallets.length
        ? selectedWallets.includes(reward.wallet)
        : true
      const matchesSelectedTokenNames = selectedTokenNames.length
        ? selectedTokenNames.includes(reward.tokenName)
        : true

      return (
        matchesStartDate &&
        matchesEndDate &&
        matchesSelectedWallets &&
        matchesSelectedTokenNames
      )
    })
  }, [originalRewards, startDate, endDate, selectedWallets, selectedTokenNames])

  const dataToRender = useMemo(() => {
    if (extendedInfo) {
      return filteredData
    }

    // Aggregate data by token name and value
    return Array.from(
      filteredData.reduce((map, reward) => {
        const { tokenName, tonValue } = reward
        const currentSum = map.get(tokenName) || 0
        map.set(tokenName, currentSum + parseFloat(tonValue))
        return map
      }, new Map())
    ).map(([tokenName, tonValue]) => ({ tokenName, tonValue }))
  }, [filteredData, extendedInfo])

  const totalSum = useMemo(() => {
    return dataToRender.reduce(
      (sum, reward) => sum + parseFloat(reward.tonValue),
      0
    )
  }, [dataToRender])

  const renderTable = () => {
    const sortedData = useMemo(() => {
      if (!sortColumn || !sortDirection) return dataToRender

      return [...dataToRender].sort((a, b) => {
        const valueA =
          typeof a === "object" && sortColumn in a
            ? a[sortColumn as keyof typeof a]
            : null
        const valueB =
          typeof b === "object" && sortColumn in b
            ? b[sortColumn as keyof typeof b]
            : null
        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA)
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortDirection === "asc" ? valueA - valueB : valueB - valueA
        }

        return 0
      })
    }, [dataToRender, sortColumn, sortDirection])

    if (extendedInfo) {
      // Extended Info Table
      return (
        <Table
          aria-label="Rewards Table"
          className="w-full border border-gray-300">
          <TableHeader>
            <TableColumn onClick={() => handleSort("tokenName")}>
              Token Name{" "}
              {sortColumn === "tokenName" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </TableColumn>
            <TableColumn onClick={() => handleSort("tonValue")}>
              Value{" "}
              {sortColumn === "tonValue" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </TableColumn>
            <TableColumn onClick={() => handleSort("wallet")}>
              Wallet{" "}
              {sortColumn === "wallet" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableColumn>
            <TableColumn onClick={() => handleSort("dateReceived")}>
              Date{" "}
              {sortColumn === "dateReceived" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </TableColumn>
          </TableHeader>
          <TableBody>
            {sortedData.map((reward, index) => (
              <TableRow key={index}>
                <TableCell>{reward.tokenName}</TableCell>
                <TableCell>{`${parseFloat(reward.tonValue).toFixed(2)} TON`}</TableCell>
                <TableCell>
                  {"wallet" in reward ? String(reward.wallet) : "N/A"}
                </TableCell>
                <TableCell>
                  {"dateReceived" in reward
                    ? String(reward.dateReceived)
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    } else {
      // Aggregated Info Table
      return (
        <Table
          aria-label="Rewards Table"
          className="w-full border border-gray-300">
          <TableHeader>
            <TableColumn onClick={() => handleSort("tokenName")}>
              Token Name{" "}
              {sortColumn === "tokenName" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </TableColumn>
            <TableColumn onClick={() => handleSort("tonValue")}>
              Value{" "}
              {sortColumn === "tonValue" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </TableColumn>
          </TableHeader>
          <TableBody>
            {sortedData.map((reward, index) => (
              <TableRow key={index}>
                <TableCell>{reward.tokenName}</TableCell>
                <TableCell>{`${parseFloat(reward.tonValue).toFixed(2)} TON`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }
  }

  return (
    <div className="bg-background rounded-lg shadow-lg">
      {/* Address Section */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">Address</h2>
        <div className="grid grid-cols-3 gap-4">
          <input
            name="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-muted p-2 rounded w-full border border-gray-300"
          />
          <Button onClick={fetchRewards} disabled={isFetching}>
            {isFetching ? (
              <span className="loading custom-spinner"></span>
            ) : (
              "Fetch Data"
            )}
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="bg-muted p-2 rounded w-full border border-gray-300"
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="bg-muted p-2 rounded w-full border border-gray-300"
              placeholderText="Select end date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Wallet</label>
            <select
              value={selectedWallet || ""}
              onChange={(e) => setSelectedWallet(e.target.value || null)}
              className="bg-muted p-2 rounded w-full border border-gray-300">
              <option value="">All Wallets</option>
              {distinctWallets.map((wallet) => (
                <option key={wallet} value={wallet}>
                  {wallet}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Token Name</label>
            <select
              value={selectedTokenName || ""}
              onChange={(e) => setSelectedTokenName(e.target.value || null)}
              className="bg-muted p-2 rounded w-full border border-gray-300">
              <option value="">All Tokens</option>
              {distinctTokenNames.map((tokenName) => (
                <option key={tokenName} value={tokenName}>
                  {tokenName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <MultiSelectDropdown
            options={distinctWallets}
            selectedOptions={selectedWallets}
            setSelectedOptions={setSelectedWallets}
            label="Wallets"
          />
        </div>
        <div>
          <MultiSelectDropdown
            options={distinctTokenNames}
            selectedOptions={selectedTokenNames}
            setSelectedOptions={setSelectedTokenNames}
            label="Token Names"
          />
        </div>
      </div>

      {/* Extended Info Checkbox */}
      <div className="p-4 border-b">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={extendedInfo}
            onChange={(e) => setExtendedInfo(e.target.checked)}
            className="form-checkbox"
          />
          <span>Extended Info</span>
        </label>
      </div>

      {/* Table Section */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">Rewards</h2>
        <div className="mb-4 text-lg font-medium">
          Total Value: {totalSum.toFixed(2)} TON
        </div>
        {renderTable()}
      </div>
    </div>
  )
}
