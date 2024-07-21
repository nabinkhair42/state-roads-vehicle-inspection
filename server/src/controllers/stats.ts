import { sendRes } from "@/middlewares/send-response";
import appointmentModel from "@/models/appointment.model";
import serviceModel from "@/models/service.model";
import { Request, Response } from "express";

export const handleGetMechanicsStats = async (req: Request, res: Response) => {
  const userId = res.locals.jwtData.userId;

  const totalAppointments = await appointmentModel.countDocuments({
    bookedFor: userId,
  });

  const totalServices = await serviceModel.countDocuments({ postedBy: userId });

  return sendRes(res, {
    status: 200,
    data: {
      totalAppointments,
      totalServices,
    },
  });
};
