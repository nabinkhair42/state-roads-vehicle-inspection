import { sendRes } from "@/middlewares/send-response";
import mechanicsModel from "@/models/mechanics.model";
import { Request, Response } from "express";

export const handleGetAllWorkshops = async (req: Request, res: Response) => {
  const mechanics = await mechanicsModel.find().select("-password");
  return sendRes(res, {
    status: 200,
    data: mechanics,
  });
};
