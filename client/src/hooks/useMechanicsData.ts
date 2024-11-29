import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { handleGetAllMechanicsLists } from "@/services/admin";
import { IMechanicsLists, IMechanicsResponse } from "@/types/admin";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useMechanicsData(params: any) {
  return useQuery({
    queryKey: ["mechanics", params],
    queryFn: async () => {
      const data = await handleGetAllMechanicsLists(
        params.pageNo,
        params.searchQuery,
        params.searchBy,
        params.sortBy,
        params.sortOrder
      );
      return data;
    },
  });
}
