import { devLog } from "@/utils/dev-log";
import { Request, Response } from "express";
import { sendRes } from "./send-response";

export const tryCatch = (fn: Function) => {
  return async (req: Request, res: Response) => {
    try {
      const result = await fn(req, res);
      return result;
    } catch (error) {
      devLog(error);
      return sendRes(res, {
        status: 500,
        message: error.message ?? "Something went wrong!",
        error: error,
      });
    }
  };
};
