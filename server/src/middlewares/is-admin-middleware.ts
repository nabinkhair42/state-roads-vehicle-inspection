import { NextFunction, Request, Response } from "express";
import { sendRes } from "./send-response";

export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["admin-login-token"];

  if (!token) {
    return sendRes(res, {
      status: 401,
      message: "Sorry, you are not authorized for this action!",
    });
  } else if (token !== process.env.ADMIN_LOGIN_TOKEN) {
    return sendRes(res, {
      status: 401,
      message: "Sorry, your token is invalid!",
    });
  }
  return next();
};
