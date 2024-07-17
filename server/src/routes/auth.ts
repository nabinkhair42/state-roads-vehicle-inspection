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

const authRouter = Router();

authRouter.post("/signup", validateBody(SignupSchema), handleUserSignup);
authRouter.post("/login", validateBody(LoginSchema), handleUserLogin);
authRouter.get(
  "/me",
  verifyToken(ENV_CONFIG.AUTH_TOKEN_ID),
  handleGetUserProfile
);
authRouter.get("/logout", handleUserLogout);

export default authRouter;
