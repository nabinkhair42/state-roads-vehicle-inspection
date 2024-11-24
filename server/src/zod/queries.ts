import z from "zod";

import { PageNo, ResponseLimit, SortOrder } from "./partials";
import unique from "@/utils/unique";

export const PaginationSchema = (allowedSortByFields: string[] = []) =>
  z.object({
    query: z.string().default(""),
    pageNo: PageNo(),
    limit: ResponseLimit(),
    sortBy: z
      .string()
      .default("createdAt")
      .refine(
        (val) => unique(["createdAt", ...allowedSortByFields]).includes(val),
        {
          message: `Foreign field found, Allowed fields: ${[
            "createdAt",
            ...allowedSortByFields,
          ].join(", ")}`,
        }
      ),
    sortOrder: SortOrder(),
  });

export type PaginationSchema = Required<
  z.infer<ReturnType<typeof PaginationSchema>>
>;

export const RecordWithAllowedFields = (allowedFields: string[] = []) => {
  return z
    .record(
      z.string().refine((val) => allowedFields.includes(val), {
        message: `Foreign field found, Allowed fields: ${allowedFields.join(
          ", "
        )}`,
      }),
      z.string()
    )
    .default({});
};

export const APIQueriesWithPaginationAndSearchSchema = <T extends string>({
  exactSearch = [],
  regexSearch = [],
  sortBy = [],
  allowedReturnFields = [],
  defaultReturnFields,
}: {
  exactSearch?: T[];
  regexSearch?: T[];
  sortBy?: T[];
  allowedReturnFields?: T[];
  defaultReturnFields: T[];
}) => {
  return PaginationSchema(sortBy).merge(
    z.object({
      regexSearch: RecordWithAllowedFields(regexSearch),
      exactSearch: RecordWithAllowedFields(exactSearch),
      fields: z
        .string()
        .optional()
        .default(defaultReturnFields.join(", "))
        .refine(
          (val) => {
            // Split the input string and trim whitespace
            const fieldsArray = val.split(",").map((v) => v.trim());
            // Check if all fields are in allowedReturnFields
            return fieldsArray.every((field) =>
              allowedReturnFields.includes(field as T)
            );
          },
          {
            message: `Foreign field found, Allowed fields: ${allowedReturnFields.join(
              ", "
            )}`,
          }
        )
        .transform((val) =>
          val
            .split(",")
            .map((val) => val.trim())
            .join(" ")
        ),
    })
  );
};

export type APIQueriesWithPaginationAndSearchSchema = Required<
  z.infer<ReturnType<typeof APIQueriesWithPaginationAndSearchSchema>>
>;
