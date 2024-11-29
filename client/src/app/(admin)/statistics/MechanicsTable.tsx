import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IMechanicsLists } from "@/types/admin"
import { ChevronUp, ChevronDown } from 'lucide-react'

interface MechanicsTableProps {
  mechanics: IMechanicsLists[]
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onSortChange: (field: string) => void
}

export function MechanicsTable({ mechanics, sortBy, sortOrder, onSortChange }: MechanicsTableProps) {
  const renderSortIcon = (field: string) => {
    if (sortBy === field) {
      return sortOrder === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : (
        <ChevronDown className="ml-2 h-4 w-4" />
      )
    }
    return null
  }

  const fields = ['name', 'email', 'storeName', 'phone', 'storeAddress', 'totalAppointments']
  const sortableFields = ['name', 'email', 'phone',]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {fields.map((field) => (
            <TableHead
              key={field}
              className="cursor-pointer"
              onClick={() => {
                if (sortableFields.includes(field)) {
                  onSortChange(field)
                }
              }
              }
            >
              <div className="flex items-center">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {renderSortIcon(field)}
              </div>
            </TableHead>
          ))}
          <TableHead>Verified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mechanics.map((mechanic) => (
          <TableRow key={mechanic._id}>
            <TableCell className="font-medium">{mechanic.name}</TableCell>
            <TableCell>{mechanic.email}</TableCell>
            <TableCell>{mechanic.storeName}</TableCell>
            <TableCell>{mechanic.phone}</TableCell>
            <TableCell>{mechanic.storeAddress}</TableCell>
            <TableCell>{mechanic.totalAppointments}</TableCell>
            <TableCell>
              <Badge variant={mechanic.isVerified ? "success" : "destructive"}>
                {mechanic.isVerified ? "Verified" : "Unverified"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

