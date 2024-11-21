import { Router } from "express";
import authRouter from "./user-auth";
import mechanicsAuthRouter from "./mechanics-auth";
import serviceRouter from "./service";
import notificationRouter from "./notification";
import appointmentRouter from "./appointment";
import statsRouter from "./stats";
import workshopRouter from "./workshop";
import contactRouter from "./contact";
import adminRouter from "./admin";
import { isAdminMiddleware } from "@/middlewares/is-admin-middleware";
const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/mechanics/auth", mechanicsAuthRouter);
appRouter.use("/services", serviceRouter);
appRouter.use("/notifications", notificationRouter);
appRouter.use("/appointments", appointmentRouter);
appRouter.use("/stats", statsRouter);
appRouter.use("/workshops", workshopRouter);
appRouter.use("/contact", contactRouter);
appRouter.use(
  "/admin",
  // isAdminMiddleware,
  adminRouter
);

export default appRouter;
