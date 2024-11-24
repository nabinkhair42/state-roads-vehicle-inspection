import { sendRes } from "@/middlewares/send-response";
import appointmentModel from "@/models/appointment.model";
import mechanicsModel from "@/models/mechanics.model";
import userModel from "@/models/user.model";
import { queryDocuments } from "@/utils/query-documents";
import { Request, Response } from "express";

export const handleGetAdminStats = async (req: Request, res: Response) => {
  const mechanicsCount = await mechanicsModel.countDocuments();
  const usersCount = await userModel.countDocuments();
  const appointmentsCount = await appointmentModel.countDocuments();

  return sendRes(res, {
    status: 200,
    data: {
      mechanicsCount,
      usersCount,
      appointmentsCount,
    },
  });
};

export const handleGetMechanicsDetailByAdmin = async (
  req: Request,
  res: Response
) => {
  const data = await queryDocuments({
    model: mechanicsModel,
    query: req.query as unknown as any,
    searchFields: ["name", "description", "subject"],
  });

  const mechanicsWithTotalAppointments = await Promise.all(
    data?.results.map(async (mechanic) => {
      const totalAppointments = await appointmentModel.countDocuments({
        //@ts-ignore
        bookedFor: mechanic._id,
      });

      return {
        //@ts-ignore
        ...mechanic.toObject(),
        totalAppointments,
      };
    })
  );

  return sendRes(res, {
    status: 200,
    data: {
      ...data,
      results: mechanicsWithTotalAppointments,
    },
  });
};
export const handleGetAppointmentsNotApprovedByAdmin = async (
  req: Request,
  res: Response
) => {
  const appointments = await appointmentModel
    .find({ isApprovedByAdmin: false })
    .populate("bookedBy service bookedFor");

  return sendRes(res, {
    status: 200,
    data: appointments,
  });
};

export const handleApproveAppointmentByAdmin = async (
  req: Request,
  res: Response
) => {
  const appointmentId = req.params.appointmentId;

  const appointment = await appointmentModel.findOneAndUpdate(
    { _id: appointmentId },
    { isApprovedByAdmin: true },
    { new: true }
  );

  return sendRes(res, {
    status: 200,
    data: appointment,
  });
};

export const handleRejectAppointmentByAdmin = async (
  req: Request,
  res: Response
) => {
  const appointmentId = req.params.appointmentId;

  const appointment = await appointmentModel.findOneAndDelete({
    _id: appointmentId,
  });

  return sendRes(res, {
    status: 200,
    data: appointment,
  });
};
