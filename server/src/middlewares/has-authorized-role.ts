import { NextFunction, Request, Response } from "express";
import { sendRes } from "./send-response";
import mechanicsModel from "@/models/mechanics.model";
import userModel from "@/models/user.model";
import { ROLES } from "@/constants/roles.const";

// use verifyToken before this middleware
export const hasAuthorizedRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwtData.userId;

    if (!userId) {
      return sendRes(res, {
        status: 401,
        message: "Sorry, please login to continue...",
      });
    }

    if (role === ROLES.MECHANICS) {
      const user = await mechanicsModel.findById(userId);
      res.locals.user = user;
      if (!user) {
        return sendRes(res, {
          status: 401,
          message: "Sorry, you are not authorized to access this resource!",
        });
      }

      if (!user.isVerified) {
        return sendRes(res, {
          status: 401,
          message: "Please verify your account to continue!",
        });
      }
    } else if (role === ROLES.USER) {
      const user = await userModel.findById(userId);
      res.locals.user = user;
      if (!user) {
        return sendRes(res, {
          status: 401,
          message: "Sorry, you are not authorized to access this resource!",
        });
      }

      if (!user.isVerified) {
        return sendRes(res, {
          status: 401,
          message: "Please verify your account to continue!",
        });
      }
    } else {
      throw new Error("Invalid role");
    }
    return next();
  };
};
