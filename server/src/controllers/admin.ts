//@ts-nocheck

import { sendRes } from "@/middlewares/send-response";
import appointmentModel from "@/models/appointment.model";
import mechanicsModel from "@/models/mechanics.model";
import userModel from "@/models/user.model";
import { queryDocuments } from "@/utils/query-documents";
import { sendHTMLMail } from "@/utils/send-html-mail";
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

  const appointment = await appointmentModel
    .findOneAndUpdate(
      { _id: appointmentId },
      { isApprovedByAdmin: true },
      { new: true }
    )
    .populate("bookedBy service bookedFor");

  sendHTMLMail({
    email: appointment.bookedBy.email,
    template: "appointment-approved-by-admin",
    variables: {
      USER_NAME: appointment.bookedBy.name,
      SERVICE_TITLE: appointment.service.serviceType,
      APPOINTMENT_DATE: appointment.appointmentDate.toLocaleString(),
      APPOINTMENT_TIME: appointment.appointmentTime,
      STORE_NAME: appointment.bookedFor.storeName,
      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    },
  });

  sendHTMLMail({
    email: appointment.bookedFor.email,
    template: "appointment-approved-by-admin-to-mechanics",
    variables: {
      MECHANIC_NAME: appointment.bookedFor.name,
      SERVICE_TITLE: appointment.service.serviceType,
      APPOINTMENT_DATE: appointment.appointmentDate.toLocaleString(),
      APPOINTMENT_TIME: appointment.appointmentTime,
      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
      USER_NAME: appointment.bookedBy.name,
      USER_EMAIL: appointment.bookedBy.email,
      USER_PHONE: appointment.bookedBy.phone,
    },
  });

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

  const appointment = await appointmentModel
    .findOneAndDelete({
      _id: appointmentId,
      isApprovedByAdmin: false,
    })
    .populate("bookedBy service bookedFor");

  sendHTMLMail({
    //@ts-ignore
    email: appointment.bookedBy.email,
    template: "appointment-rejected-by-admin",
    variables: {
      USER_NAME: appointment.bookedBy.name,
      SERVICE_TITLE: appointment.service.serviceType,
      APPOINTMENT_DATE: appointment.appointmentDate.toLocaleString(),
      APPOINTMENT_TIME: appointment.appointmentTime,
      STORE_NAME: appointment.bookedFor.storeName,
      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    },
  });

  return sendRes(res, {
    status: 200,
    data: appointment,
  });
};
