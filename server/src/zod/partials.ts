import z from "zod";

export const PageNo = () => {
  return z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !Number.isNaN(val) && val > 0)
    .default("1");
};

export const ResponseLimit = () => {
  return z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !Number.isNaN(val) && val > 0 && val <= 100)
    .default("16");
};

export const SortOrder = () => {
  return z
    .enum(["asc", "desc"])
    .transform((val) => (val === "asc" ? 1 : -1))
    .default("desc");
};
