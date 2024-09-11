import {
  handleUserSignup,
  handleGetUserProfile,
  handleUserLogout,
  handleUserLogin,
  handleVerifyOTPForSignup,
  handleResetPassword,
  handleVerifyOTPForResetPassword,
  handleResendOTPForSignup,
} from "@/controllers/user-auth";
import { validateBody } from "@/middlewares/validate-body";
import { Router } from "express";
import { verifyToken } from "@/utils/token-manager";
import { LoginSchema, ResetPasswordSchema, SignupSchema } from "@/zod";
import ENV_CONFIG from "@/config/env.config";
import { tryCatch } from "@/middlewares/try-catch";
import z from "zod";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(SignupSchema),
  tryCatch(handleUserSignup)
);
authRouter.post("/login", validateBody(LoginSchema), tryCatch(handleUserLogin));
authRouter.get(
  "/me",
  verifyToken(ENV_CONFIG.AUTH_TOKEN_ID),
  tryCatch(handleGetUserProfile)
);

authRouter.post(
  "/verify",
  verifyToken(ENV_CONFIG.AUTH_TOKEN_ID),
  tryCatch(handleVerifyOTPForSignup)
);

authRouter.get(
  "/signup/resend-otp",
  verifyToken(ENV_CONFIG.AUTH_TOKEN_ID),
  tryCatch(handleResendOTPForSignup)
);

authRouter.post(
  "/reset-password",
  validateBody(
    z.object({ email: z.string().email("Please provide a valid email") })
  ),
  tryCatch(handleResetPassword)
);

authRouter.post(
  "/reset-password/verify",
  validateBody(ResetPasswordSchema),
  tryCatch(handleVerifyOTPForResetPassword)
);

authRouter.get("/logout", tryCatch(handleUserLogout));

export default authRouter;
