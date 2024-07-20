import z from "zod";

export const MechanicsSignupSchema = z.object({
  name: z.string(),
  email: z.string().email("Please enter a valid email!"),
  phone: z.string(),
  password: z.string().min(8, "Password is too short!"),
  storeName: z.string(),
  storeCoordinates: z.object({
    x: z.string(),
    y: z.string(),
  }),
  storeAddress: z.string(),
});

export const MechanicsLoginSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
  password: z.string(),
});

export type IMechanicsSignupSchema = z.infer<typeof MechanicsSignupSchema>;
export type IMechanicsLoginSchema = z.infer<typeof MechanicsLoginSchema>;
