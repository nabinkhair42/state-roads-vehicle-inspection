'use client'

import React, { useState } from "react"
import { useMechanicsData } from "@/hooks/useMechanicsData"
import { MechanicsTable } from "./MechanicsTable"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useDebounce } from "use-debounce"



export default function MechanicStats() {
  const [params, setParams] = useState({
    pageNo: 1,
    searchQuery: "",
    searchBy: "name",
    sortBy: "name",
    sortOrder: "asc",
  })

  // const debouncedSearchQuery = useDebounce(params, 300)

  const {
    data,
    error,
    isLoading,
  } = useMechanicsData(params)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mechanic Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <Input
            type="text"
            placeholder="Search mechanics by name, email, or store name..."
            value={params.searchQuery}
            onChange={(e) => setParams((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="max-w-sm"
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{JSON.stringify(error)}</div>
        ) : (
          <MechanicsTable
            mechanics={data?.results ?? []}
            sortBy={params.sortBy}
            sortOrder={params.sortOrder as any}
            onSortChange={(field) => {
              setParams((prev) => ({
                ...prev,
                sortBy: field,
                sortOrder: prev.sortBy === field ? (prev.sortOrder === "asc" ? "desc" : "asc") : "asc",
              }))
            }}
          />
        )}
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setParams((prev) => ({ ...prev, pageNo: prev.pageNo - 1 }))}
                  disabled={params.pageNo === 1}
                />
              </PaginationItem>
              {Array.from({ length: data?.pagination?.totalPages ?? 0 }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setParams((prev) => ({ ...prev, pageNo: i + 1 }))}
                    isActive={i + 1 === params.pageNo}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setParams((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }))}
                  disabled={!data?.pagination?.hasNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}

