import z from "zod";

export const ContactSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(2, {
      message: "Name must be at least 2 characters long",
    }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  phoneNumber: z
    .string({
      message: "Phone number is required",
    })
    .min(10, {
      message: "Phone number must be at least 10 characters long",
    }),
  companyName: z.string().optional().nullable(),
  message: z
    .string({
      message: "Message is required",
    })
    .min(10, {
      message: "Please enter a little more message",
    }),
});

export type IContactSchema = z.infer<typeof ContactSchema>;
