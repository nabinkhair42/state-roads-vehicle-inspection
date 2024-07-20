import getDataUri from "@/utils/data-uri";
import { uploadFile } from "@/utils/upload-file";
import { NextFunction, Request, Response } from "express";
import { sendRes } from "./send-response";

export const remoteUploadFile = (folder: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file) {
      return sendRes(res, {
        status: 400,
        message: "Please provide a file to upload!",
      });
    }

    const fileUri = getDataUri(file);
    uploadFile(fileUri.content, fileUri.fileName, folder)
      .then((result) => {
        res.locals.file = result;
        next();
      })
      .catch((error) => {
        return sendRes(res, {
          status: 500,
          message: error.message ?? "Something went wrong!",
          error: error,
        });
      });
  };
};
