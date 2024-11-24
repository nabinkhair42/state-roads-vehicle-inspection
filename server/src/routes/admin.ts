import {
  handleApproveAppointmentByAdmin,
  handleGetAdminStats,
  handleGetAppointmentsNotApprovedByAdmin,
  handleGetMechanicsDetailByAdmin,
  handleRejectAppointmentByAdmin,
} from "@/controllers/admin";
import { tryCatch } from "@/middlewares/try-catch";
import { validateQueries } from "@/middlewares/validate-queries";
import { ExtractKeys } from "@/types/common";
import { APIQueriesWithPaginationAndSearchSchema } from "@/zod/queries";
import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/stats", tryCatch(handleGetAdminStats));
adminRouter.get(
  "/mechanics",
  validateQueries(
    // @ts-expect-error: The types of '_input.pageNo' are incompatible between these types. it is not working because if transform string to number
    APIQueriesWithPaginationAndSearchSchema<ExtractKeys<any>>({
      exactSearch: ["_id", "email", "phone", "isVerified"],
      regexSearch: ["name", "email", "storeName"],
      sortBy: [
        "name",
        "email",
        "phone",
        "isVerified",
        "createdBy",
        "createdAt",
        "_id",
      ],
      allowedReturnFields: [
        "_id",
        "name",
        "createdAt",
        "updatedAt",
        "email",
        "phone",
        "isVerified",
        "storeName",
        "storeAddress",
        "storeCoordinates",
      ],
      defaultReturnFields: [
        "_id",
        "name",
        "createdAt",
        "updatedAt",
        "email",
        "phone",
        "isVerified",
        "storeName",
        "storeAddress",
        "storeCoordinates",
      ],
    })
  ),
  tryCatch(handleGetMechanicsDetailByAdmin)
);


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
