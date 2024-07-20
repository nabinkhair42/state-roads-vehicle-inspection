import ENV_CONFIG from "@/config/env.config";
import { ROLES } from "@/constants/roles.const";
import {
  handleApproveAppointmentByMechanic,
  handleCompleteAppointmentByMechanic,
  handleCompleteAppointmentByUser,
  handleGetAppointmentsByMechanic,
  handleGetAppointmentsByUser,
  handleMakeAppointment,
  handleRejectAppointmentByMechanic,
} from "@/controllers/appointment";
import { hasAuthorizedRole } from "@/middlewares/has-authorized-role";
import { tryCatch } from "@/middlewares/try-catch";
import { validateBody } from "@/middlewares/validate-body";
import { verifyToken } from "@/utils/token-manager";
import { AppointmentSchema } from "@/zod";
import { Router } from "express";

const appointmentRouter = Router();

appointmentRouter.post(
  "/:serviceId",
  verifyToken(ENV_CONFIG.AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.USER),
  validateBody(AppointmentSchema),
  tryCatch(handleMakeAppointment)
);

appointmentRouter.get(
  "/user",
  verifyToken(ENV_CONFIG.AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.USER),
  tryCatch(handleGetAppointmentsByUser)
);

appointmentRouter.get(
  "/mechanics",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.MECHANICS),
  tryCatch(handleGetAppointmentsByMechanic)
);

// change status

appointmentRouter.put(
  "/status/approve/:appointmentId",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.MECHANICS),
  tryCatch(handleApproveAppointmentByMechanic)
);

appointmentRouter.put(
  "/status/reject/:appointmentId",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.MECHANICS),
  tryCatch(handleRejectAppointmentByMechanic)
);

appointmentRouter.put(
  "/status/complete/:appointmentId",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.MECHANICS),
  tryCatch(handleCompleteAppointmentByMechanic)
);

// complete by user
appointmentRouter.put(
  "/status/complete/user/:appointmentId",
  verifyToken(ENV_CONFIG.AUTH_TOKEN_ID),
  hasAuthorizedRole(ROLES.USER),
  tryCatch(handleCompleteAppointmentByUser)
);

export default appointmentRouter;