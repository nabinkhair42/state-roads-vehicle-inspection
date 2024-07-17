import z from "zod";
import LENGTH from "../constants/length.const";
import { PASSWORD_REGEX, USERNAME_REGEX } from "../constants/regex.const";

export const SignupSchema = z.object({
  name: z
    .string()
    .min(LENGTH.NAME.min, "Name is too short!")
    .max(LENGTH.NAME.max, "Name is too long!"),
  email: z.string().email("Please enter a valid email!"),
  password: z
    .string()
    .min(LENGTH.PASSWORD.min, "Password is too short!")
    .regex(
      PASSWORD_REGEX,
      "Password must contain one uppercase, lowercase, number and special character!"
    ),
});

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
  password: z.string(),
});

export type ISignupSchema = z.infer<typeof SignupSchema>;
export type ILoginSchema = z.infer<typeof LoginSchema>;
