import { Router } from "express";
import authRouter from "./auth";
import mechanicsAuthRouter from "./mechanics-auth";
import serviceRouter from "./service";
import notificationRouter from "./notification";
import appointmentRouter from "./appointment";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/mechanics/auth", mechanicsAuthRouter);
appRouter.use("/services", serviceRouter);
appRouter.use("/notifications", notificationRouter);
appRouter.use("/appointments", appointmentRouter);

export default appRouter;
