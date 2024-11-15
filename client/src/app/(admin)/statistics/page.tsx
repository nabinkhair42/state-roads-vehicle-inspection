// @ts-nocheck

"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Search } from "lucide-react";

// This would typically come from an API call
const mechanicsData = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Mechanic ${i + 1}`,
  customersServed: Math.floor(Math.random() * 1000),
}));

export default function MechanicStats() {
  const [mechanics, setMechanics] = React.useState(mechanicsData);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: "ascending",
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mechanics.length / itemsPerPage);

  const filteredMechanics = React.useMemo(() => {
    return mechanics.filter((mechanic) =>
      mechanic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mechanics, searchTerm]);

  const sortedMechanics = React.useMemo(() => {
    let sortableMechanics = [...filteredMechanics];
    if (sortConfig.key !== null) {
      sortableMechanics.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableMechanics;
  }, [filteredMechanics, sortConfig]);

  const currentMechanics = sortedMechanics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Mechanic Statistics</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search mechanics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <Select onValueChange={(value) => setCurrentPage(1)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customersAsc">Customers (Ascending)</SelectItem>
            <SelectItem value="customersDesc">
              Customers (Descending)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border rounded-md">
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort("customersServed")}
                >
                  Customers Served
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMechanics.map((mechanic) => (
              <TableRow key={mechanic.id}>
                <TableCell className="font-medium">{mechanic.id}</TableCell>
                <TableCell>{mechanic.name}</TableCell>
                <TableCell>{mechanic.customersServed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(Math.min(5, totalPages))].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 5 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
