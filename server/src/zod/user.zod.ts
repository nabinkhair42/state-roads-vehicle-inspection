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

export const ResetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
  newPassword: z.string().min(8, "Password is too short!"),
  otp: z.string({
    message: "Please enter a OTP!",
  }),
});

export type ISignupSchema = z.infer<typeof SignupSchema>;
export type ILoginSchema = z.infer<typeof LoginSchema>;
export type IResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
