import { NextFunction, Request, Response } from "express";
import { sendRes } from "./send-response";
import mechanicsModel from "@/models/mechanics.model";
import userModel from "@/models/user.model";
import { ROLES } from "@/constants/roles.const";

// use verifyToken before this middleware
export const hasAuthorizedRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwtData.userId;

    if (!userId) {
      return sendRes(res, {
        status: 401,
        message: "Sorry, please login to continue...",
      });
    }

    if (role === ROLES.MECHANICS) {
      const user = mechanicsModel.findById(userId);
      res.locals.user = user;
      if (!user) {
        return sendRes(res, {
          status: 401,
          message: "Sorry, you are not authorized to access this resource!",
        });
      }
    } else if (role === ROLES.USER) {
      const user = userModel.findById(userId);
      res.locals.user = user;
      if (!user) {
        return sendRes(res, {
          status: 401,
          message: "Sorry, you are not authorized to access this resource!",
        });
      }
    } else {
      throw new Error("Invalid role");
    }
    return next();
  };
};
