import z from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email("Please enter a valid email!"),
  phone: z.string(),
  password: z.string().min(8, "Password is too short!"),
});

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
  password: z.string(),
});

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(8, "Password is too short!"),
  newPassword: z.string().min(8, "Password is too short!"),
});

export type ISignupSchema = z.infer<typeof SignupSchema>;
export type ILoginSchema = z.infer<typeof LoginSchema>;
export type IChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
