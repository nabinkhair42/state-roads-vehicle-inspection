import { Router } from "express";
import authRouter from "./auth";
import mechanicsAuthRouter from "./mechanics-auth";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/mechanics/auth", mechanicsAuthRouter);

export default appRouter;
