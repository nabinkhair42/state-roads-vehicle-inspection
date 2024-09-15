import {
  handleMechanicsSignup,
  handleGetMechanicsProfile,
  handleMechanicsLogin,
  handleVerifyOTPForMechanicsSignup,
  handleResendOTPForMechanicsSignup,
  handleResetMechanicsPassword,
  handleChangeMechanicsPassword,
  handleVerifyOTPForMechanicsResetPassword,
} from "@/controllers/mechanics-auth";
import { validateBody } from "@/middlewares/validate-body";
import { Router } from "express";
import { verifyToken } from "@/utils/token-manager";
import ENV_CONFIG from "@/config/env.config";
import {
  MechanicsLoginSchema,
  MechanicsSignupSchema,
  ResetPasswordSchema,
} from "@/zod";
import { tryCatch } from "@/middlewares/try-catch";
import z from "zod";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(MechanicsSignupSchema),
  tryCatch(handleMechanicsSignup)
);
authRouter.post(
  "/login",
  validateBody(MechanicsLoginSchema),
  tryCatch(handleMechanicsLogin)
);

authRouter.post(
  "/verify",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  tryCatch(handleVerifyOTPForMechanicsSignup)
);

authRouter.get(
  "/signup/resend-otp",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  tryCatch(handleResendOTPForMechanicsSignup)
);

authRouter.post(
  "/reset-password",
  validateBody(
    z.object({ email: z.string().email("Please provide a valid email") })
  ),
  tryCatch(handleResetMechanicsPassword)
);

authRouter.put(
  "/update-password",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  validateBody(
    z.object({
      oldPassword: z.string(),
      newPassword: z.string().min(6),
    })
  ),
  tryCatch(handleChangeMechanicsPassword)
);

authRouter.post(
  "/reset-password/verify",
  validateBody(ResetPasswordSchema),
  tryCatch(handleVerifyOTPForMechanicsResetPassword)
);

authRouter.get(
  "/me",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  tryCatch(handleGetMechanicsProfile)
);

export default authRouter;
