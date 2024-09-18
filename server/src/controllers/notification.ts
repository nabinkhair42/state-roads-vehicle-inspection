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

export const handleHideNotification = async (req: Request, res: Response) => {
  const id = req.query.id;
  const userId = res.locals.jwtData.userId;

  const notification = await notificationModel.findById(id);

  if (!notification) {
    return sendRes(res, {
      status: 404,
      message: "Notification not found!",
    });
  }

  if (notification.for.toString() !== userId) {
    return sendRes(res, {
      status: 403,
      message: "You are not allowed to hide this notification!",
    });
  }

  await notificationModel.findByIdAndUpdate(id, {
    isHidden: true,
  });

  return sendRes(res, {
    status: 200,
    message: "Notification hidden!",
  });
};
