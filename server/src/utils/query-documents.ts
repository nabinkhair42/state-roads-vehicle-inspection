import { PaginatedResponse } from "@/types/response";
import { APIQueriesWithPaginationAndSearchSchema } from "@/zod/queries";
import type { Document, Model } from "mongoose";
import type mongoose from "mongoose";

const buildQuery = (
  query: APIQueriesWithPaginationAndSearchSchema,
  searchFields: string[]
): mongoose.FilterQuery<Document> => {
  const { query: search, regexSearch, exactSearch } = query;
  const mongoQuery: mongoose.FilterQuery<Document> = {};

  // Add exact search criteria
  for (const [key, value] of Object.entries(exactSearch)) {
    mongoQuery[key] = value;
  }

  // Add regex search criteria
  for (const [key, value] of Object.entries(regexSearch)) {
    mongoQuery[key] = { $regex: new RegExp(value, "i") }; // Case insensitive search
  }

  // Add search criteria for the specified fields
  if (search) {
    const searchQuery = {
      $or: searchFields.map((field) => ({
        [field]: { $regex: new RegExp(search, "i") }, // Case insensitive search
      })),
    };
    mongoQuery.$or = mongoQuery.$or
      ? [...mongoQuery.$or, ...searchQuery.$or]
      : searchQuery.$or;
  }

  return mongoQuery;
};

export const queryDocuments = async <T extends string, M>({
  model,
  query,
  searchFields,
}: {
  model: Model<M>;
  searchFields: T[];
  query: APIQueriesWithPaginationAndSearchSchema;
}): Promise<PaginatedResponse<unknown>> => {
  const { pageNo, limit, sortBy, sortOrder, fields } = query;

  try {
    const mongoQuery = buildQuery(query, searchFields);

    // Create a sort object
    const sortObject = {
      [sortBy]: sortOrder,
    };

    // Execute the query
    const results = await model
      .find(mongoQuery)
      .select(fields) // Select specified fields or default
      .sort(sortObject) // Sort by the specified field and order
      .skip((pageNo - 1) * limit) // Pagination: skip documents
      .limit(limit); // Limit results

    // Get total count for pagination
    const totalCount = await model.countDocuments(mongoQuery);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = pageNo < totalPages;

    return {
      results,
      pagination: {
        pageNo,
        limit,
        hasNextPage,
        totalPages,
      },
    };
  } catch {
    return {
      pagination: {
        hasNextPage: false,
        limit,
        pageNo,
        totalPages: 0,
      },
      results: [],
    };
  }
};
