import {
  handleApproveAppointmentByAdmin,
  handleGetAdminStats,
  handleGetAppointmentsNotApprovedByAdmin,
  handleGetMechanicsDetailByAdmin,
  handleRejectAppointmentByAdmin,
} from "@/controllers/admin";
import { tryCatch } from "@/middlewares/try-catch";
import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/stats", tryCatch(handleGetAdminStats));
adminRouter.get("/mechanics", tryCatch(handleGetMechanicsDetailByAdmin));
adminRouter.get(
  "/appointments",
  tryCatch(handleGetAppointmentsNotApprovedByAdmin)
);

adminRouter.put(
  "/appointments/:appointmentId/approve",
  tryCatch(handleApproveAppointmentByAdmin)
);

adminRouter.delete(
  "/appointments/:appointmentId/reject",
  tryCatch(handleRejectAppointmentByAdmin)
);

export default adminRouter;
