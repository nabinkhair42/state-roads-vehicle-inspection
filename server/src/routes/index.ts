import { Router } from "express";
import authRouter from "./auth";
import mechanicsAuthRouter from "./mechanics-auth";
import serviceRouter from "./service";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/mechanics/auth", mechanicsAuthRouter);
appRouter.use("/services", serviceRouter);

export default appRouter;
