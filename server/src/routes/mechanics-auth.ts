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

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(MechanicsSignupSchema),
  handleMechanicsSignup
);
authRouter.post(
  "/login",
  validateBody(MechanicsLoginSchema),
  handleMechanicsLogin
);
authRouter.get(
  "/me",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  handleGetMechanicsProfile
);
authRouter.get("/logout", handleMechanicsLogout);

export default authRouter;
