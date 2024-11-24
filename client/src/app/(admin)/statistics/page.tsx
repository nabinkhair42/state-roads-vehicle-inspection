"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleGetAllMechanicsLists } from "@/services/admin";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"; 
import { IMechanicsLists } from "@/types/admin";

export default function MechanicStats() {
  const [mechanics, setMechanics] = useState<IMechanicsLists[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const data = await handleGetAllMechanicsLists(page, searchQuery);
        setMechanics(data.results);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, [page, searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Mechanic Statistics</h1>
      <input
        type="text"
        placeholder="Search mechanics..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead>Store Address</TableHead>
              <TableHead>Appointments Served</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mechanics.map((mechanic) => (
              <TableRow key={mechanic.id}>
                <TableCell>{mechanic.name}</TableCell>
                <TableCell>{mechanic.email}</TableCell>
                <TableCell>{mechanic.phone}</TableCell>
                <TableCell>{mechanic.storeName}</TableCell>
                <TableCell>{mechanic.storeAddress}</TableCell>
                <TableCell>{mechanic.totalAppointments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <Pagination>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
              
              />
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={index + 1 === page}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
               
              />
            </Pagination>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
