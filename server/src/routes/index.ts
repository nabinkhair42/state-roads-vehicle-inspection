import { Router } from "express";
import authRouter from "./user-auth";
import mechanicsAuthRouter from "./mechanics-auth";
import serviceRouter from "./service";
import notificationRouter from "./notification";
import appointmentRouter from "./appointment";
import statsRouter from "./stats";
import workshopRouter from "./workshop";
import contactRouter from "./contact";
const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/mechanics/auth", mechanicsAuthRouter);
appRouter.use("/services", serviceRouter);
appRouter.use("/notifications", notificationRouter);
appRouter.use("/appointments", appointmentRouter);
appRouter.use("/stats", statsRouter);
appRouter.use("/workshops", workshopRouter);
appRouter.use("/contact", contactRouter);

export default appRouter;
