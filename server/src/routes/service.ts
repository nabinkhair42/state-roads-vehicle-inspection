import ENV_CONFIG from "@/config/env.config";
import { ROLES } from "@/constants/roles.const";
import {
  handleCreateService,
  handleDeleteServiceById,
  handleGetAllServices,
  handleGetServiceById,
  handleGetServiceByMechanicId,
} from "@/controllers/service";
import { hasAuthorizedRole } from "@/middlewares/has-authorized-role";
import { parseFile } from "@/middlewares/multer";
import { remoteUploadFile } from "@/middlewares/remote-upload";
import { tryCatch } from "@/middlewares/try-catch";
import { validateBody } from "@/middlewares/validate-body";
import { verifyToken } from "@/utils/token-manager";
import { ServiceSchema } from "@/zod";
import { Router } from "express";

const serviceRouter = Router();

serviceRouter.post(
  "/",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.MECHANICS),
  parseFile("thumbnail"),
  remoteUploadFile("service-thumbnails"),
  // @ts-ignore //* because validateBody expects price as number but it is string as we are receiving it from the form data
  validateBody(ServiceSchema),
  tryCatch(handleCreateService)
);

serviceRouter.delete(
  "/:id",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.MECHANICS),
  tryCatch(handleDeleteServiceById)
);

serviceRouter.get("/", tryCatch(handleGetAllServices));

serviceRouter.get("/:id", tryCatch(handleGetServiceById));
serviceRouter.get(
  "/mechanics/:id",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.MECHANICS),
  tryCatch(handleGetServiceByMechanicId)
);

export default serviceRouter;
