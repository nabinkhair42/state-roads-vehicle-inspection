import z from "zod";

export const ServiceSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string().transform((val) => Number(val)),
  features: z.array(z.string()).optional(),
  serviceType: z.string(),
});

export type IServiceSchema = z.infer<typeof ServiceSchema>;
