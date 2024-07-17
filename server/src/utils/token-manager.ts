import ENV_CONFIG from "@/config/env.config";
import { IResponse, sendRes } from "@/middlewares/send-response";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const createToken = (id: string, expiresIn: string) => {
  const payload = { userId: id };
  const token = jwt.sign(payload, ENV_CONFIG.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = (cookieId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[cookieId];
    if (!token || token.trim() === "") {
      const response: IResponse = {
        status: 401,
        message: "Auth Error, Cookies not found",
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
