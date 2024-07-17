import z from "zod";

export const ServiceSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string().transform((val) => Number(val)),
});

export type IServiceSchema = z.infer<typeof ServiceSchema>;
