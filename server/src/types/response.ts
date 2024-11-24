export interface PaginatedResponse<D> {
  results: D[];
  pagination: {
    pageNo: number;
    limit: number;
    hasNextPage: boolean;
    totalPages: number;
  };
}

export type PaginationRequest = {
  pageNo: string;
  limit: number;
  query: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  fields: string;
} & Record<`exact.${string}` | `search.${string}`, string>;
