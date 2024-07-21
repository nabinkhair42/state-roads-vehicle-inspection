import ENV_CONFIG from "@/config/env.config";
import { ROLES } from "@/constants/roles.const";
import { handleGetMechanicsStats } from "@/controllers/stats";
import { hasAuthorizedRole } from "@/middlewares/has-authorized-role";
import { tryCatch } from "@/middlewares/try-catch";
import { verifyToken } from "@/utils/token-manager";
import { Router } from "express";

const statsRouter = Router();
statsRouter.get(
  "/mechanics",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.MECHANICS),
  tryCatch(handleGetMechanicsStats)
);

export default statsRouter;
