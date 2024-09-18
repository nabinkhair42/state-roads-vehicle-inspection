import z from "zod";

export const ContactSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  phoneNumber: z.string({
    message: "Phone number is required",
  }),
  companyName: z.string().optional().nullable(),
  message: z.string({
    message: "Message is required",
  }),
});

export type IContactSchema = z.infer<typeof ContactSchema>;
