import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { handleGetAllMechanicsLists } from "@/services/admin";
import { IMechanicsLists, IMechanicsResponse } from "@/types/admin";

export function useMechanicsData() {
  const [mechanics, setMechanics] = useState<IMechanicsLists[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchMechanics = useCallback(async () => {
    try {
      setLoading(true);
      const data: IMechanicsResponse = await handleGetAllMechanicsLists(
        page,
        debouncedSearchQuery,
        sortBy,
        sortOrder
      );
      setMechanics(data.results);
      setTotalPages(data.pagination.totalPages);
      setError(null);
    } catch (err) {
      console.error("Error fetching mechanics:", err);
      setError("Failed to fetch mechanics data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchQuery, sortBy, sortOrder]);

  useEffect(() => {
    fetchMechanics();
  }, [fetchMechanics]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    mechanics,
    loading,
    error,
    page,
    totalPages,
    searchQuery,
    sortBy,
    sortOrder,
    handleSearch,
    handleSortChange,
    handlePageChange,
  };
}

