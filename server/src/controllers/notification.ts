import { sendRes } from "@/middlewares/send-response";
import notificationModel from "@/models/notification.model";
import { Request, Response } from "express";

export const handleGetAllNotificationsForUser = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.jwtData.userId;
  const notifications = await notificationModel
    .find({ for: userId, role: "User" })
    .sort({ createdAt: -1 });

  return sendRes(res, {
    status: 200,
    data: notifications,
  });
};

export const handleGetAllNotificationsForMechanic = async (
  req: Request,
  res: Response
) => {
  const mechanicId = res.locals.jwtData.userId;
  const notifications = await notificationModel
    .find({ for: mechanicId, role: "Mechanics" })
    .sort({ createdAt: -1 });

  return sendRes(res, {
    status: 200,
    data: notifications,
  });
};

export const handleViewNotification = async (req: Request, res: Response) => {
  const id = req.query.id;

  await notificationModel.findByIdAndUpdate(id, {
    isViewed: true,
  });

  return sendRes(res, {
    status: 200,
  });
};
