import {
  handleUserSignup,
  handleGetUserProfile,
  handleUserLogin,
  handleVerifyOTPForSignup,
  handleResetPassword,
  handleVerifyOTPForResetPassword,
  handleResendOTPForSignup,
  handleChangePassword,
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
  verifyToken(ENV_CONFIG.AUTH_HEADER_ID),
  tryCatch(handleGetUserProfile)
);

authRouter.post(
  "/verify",
  verifyToken(ENV_CONFIG.AUTH_HEADER_ID),
  tryCatch(handleVerifyOTPForSignup)
);

authRouter.get(
  "/signup/resend-otp",
  verifyToken(ENV_CONFIG.AUTH_HEADER_ID),
  tryCatch(handleResendOTPForSignup)
);

authRouter.post(
  "/reset-password",
  validateBody(
    z.object({ email: z.string().email("Please provide a valid email") })
  ),
  tryCatch(handleResetPassword)
);

authRouter.put(
  "/update-password",
  verifyToken(ENV_CONFIG.AUTH_HEADER_ID),
  validateBody(
    z.object({
      oldPassword: z.string(),
      newPassword: z.string().min(6),
    })
  ),
  tryCatch(handleChangePassword)
);

authRouter.post(
  "/reset-password/verify",
  validateBody(ResetPasswordSchema),
  tryCatch(handleVerifyOTPForResetPassword)
);

export default authRouter;
