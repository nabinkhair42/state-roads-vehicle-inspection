import ENV_CONFIG from "@/config/env.config";
import { IResponse, sendRes } from "@/middlewares/send-response";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const createToken = (
  payload: {
    userId: string;
    role: "USER" | "MECHANIC";
  },
  expiresIn: string
) => {
  const token = jwt.sign(payload, ENV_CONFIG.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = (headerId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers[headerId.toLowerCase()] as string;

    if (!token || token.trim() === "") {
      const response: IResponse = {
        status: 401,
        message: "Sorry, please login to continue...",
      };
      return sendRes(res, response);
    }
    return new Promise<void>((resolve, reject) => {
      return jwt.verify(
        token,
        ENV_CONFIG.JWT_SECRET,
        (err: any, success: any) => {
          if (err) {
            reject(err.message);
            return sendRes(res, {
              status: 401,
              message: "Auth Error, Invalid token",
            });
          } else {
            resolve();
            res.locals.jwtData = success;
            return next();
          }
        }
      );
    });
  };
};
