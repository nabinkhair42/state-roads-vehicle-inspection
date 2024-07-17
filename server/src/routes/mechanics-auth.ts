import {
  handleMechanicsSignup,
  handleGetMechanicsProfile,
  handleMechanicsLogout,
  handleMechanicsLogin,
} from "@/controllers/mechanics-auth";
import { validateBody } from "@/middlewares/validate-body";
import { Router } from "express";
import { verifyToken } from "@/utils/token-manager";
import ENV_CONFIG from "@/config/env.config";
import { MechanicsLoginSchema, MechanicsSignupSchema } from "@/zod";
import { tryCatch } from "@/middlewares/try-catch";

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
authRouter.get(
  "/me",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  tryCatch(handleGetMechanicsProfile)
);
authRouter.get("/logout", tryCatch(handleMechanicsLogout));

export default authRouter;
