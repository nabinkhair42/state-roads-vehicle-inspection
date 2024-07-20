import {
  handleUserSignup,
  handleGetUserProfile,
  handleUserLogout,
  handleUserLogin,
} from "@/controllers/auth";
import { validateBody } from "@/middlewares/validate-body";
import { Router } from "express";
import { verifyToken } from "@/utils/token-manager";
import { LoginSchema, SignupSchema } from "@/zod";
import ENV_CONFIG from "@/config/env.config";
import { tryCatch } from "@/middlewares/try-catch";

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
authRouter.get("/logout", tryCatch(handleUserLogout));

export default authRouter;
