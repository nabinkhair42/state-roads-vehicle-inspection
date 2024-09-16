import ENV_CONFIG from "@/config/env.config";
import {
  handleGetAllNotificationsForMechanic,
  handleGetAllNotificationsForUser,
  handleViewNotification,
} from "@/controllers/notification";
import { verifyToken } from "@/utils/token-manager";
import { Router } from "express";

const notificationRouter = Router();

notificationRouter.get(
  "/user",
  verifyToken(ENV_CONFIG.AUTH_HEADER_ID),
  handleGetAllNotificationsForUser
);

notificationRouter.get(
  "/mechanic",
  verifyToken(ENV_CONFIG.MECHANICS_AUTH_HEADER_ID),
  handleGetAllNotificationsForMechanic
);

notificationRouter.put("/view", handleViewNotification);

export default notificationRouter;
