import { sendRes } from "@/middlewares/send-response";
import appointmentModel from "@/models/appointment.model";
import mechanicsModel from "@/models/mechanics.model";
import userModel from "@/models/user.model";
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
  const mechanics = await mechanicsModel.find().select("-password");

  const mechanicsWithTotalAppointments = await Promise.all(
    mechanics.map(async (mechanic) => {
      const totalAppointments = await appointmentModel.countDocuments({
        bookedFor: mechanic._id,
      });

      return {
        ...mechanic.toObject(),
        totalAppointments,
      };
    })
  );

  return sendRes(res, {
    status: 200,
    data: mechanicsWithTotalAppointments,
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
