import ENV_CONFIG from "@/config/env.config";
import { sendRes } from "@/middlewares/send-response";
import appointmentModel from "@/models/appointment.model";
import notificationModel from "@/models/notification.model";
import serviceModel from "@/models/service.model";
import userModel from "@/models/user.model";
import { mailTemplates } from "@/utils/mail-templates";
import { sendHTMLMail } from "@/utils/send-html-mail";
import { sendMail } from "@/utils/send-mail";
import { Request, Response } from "express";

export const handleMakeAppointment = async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;
  const userId = res.locals.jwtData.userId;

  const service: any = await serviceModel
    .findById(serviceId)
    .populate("postedBy");
  if (!service) {
    return sendRes(res, {
      status: 404,
      message: "Service not found",
    });
  }

  const appointmentData = {
    bookedBy: userId,
    bookedFor: service.postedBy,
    service: serviceId,
    ...req.body,
  };

  // Create the appointment
  const appointment = await appointmentModel.create(appointmentData);
  await appointment.save();

  const user = await userModel.findById(userId);

  const userDetails: Record<string, string> = {
    USER_NAME: user.name,
    USER_PHONE: user.email,
    USER_EMAIL: user.phone,
  };

  const appointmentDetails: Record<string, string> = {
    APPOINTMENT_DATE: appointment.appointmentDate.toLocaleDateString(),
    APPOINTMENT_TIME: appointment.appointmentTime,
    SERVICE_TITLE: service.serviceType,
    APPOINTMENT_MESSAGE: appointment.message ?? "No message provided",
  };

  const storeDetails: Record<string, string> = {
    STORE_NAME: service.postedBy.storeName,
    STORE_ADDRESS: service.postedBy.storeAddress,
    STORE_PHONE: service.postedBy.phone,
    STORE_EMAIL: service.postedBy.email,
  };

  await notificationModel.create({
    for: user?.id,
    role: "User",
    title: "Appointment Request Submitted",
    message: `Your appointment for ${service.serviceType} in ${service.postedBy.storeName} has been submitted.`,
  });

  await notificationModel.create({
    for: service.postedBy._id,
    role: "Mechanics",
    title: "Upcoming Appointment Request",
    message: `${user.name} has scheduled a new appointment for ${service.serviceType}`,
  });

  //send mail to the admin
  sendHTMLMail({
    email: "079bct094@ioepc.edu.np",
    template: "make-appointment-admin",
    variables: {
      ...appointmentDetails,
      ...userDetails,
      ...storeDetails,
      SUPPORT_EMAIL: ENV_CONFIG.SUPPORT_EMAIL,
    },
  });

  // send mail to the user
  sendHTMLMail({
    email: user.email,
    template: "make-appointment-user",
    variables: {
      ...appointmentDetails,
      ...userDetails,
      ...storeDetails,
      SUPPORT_EMAIL: ENV_CONFIG.SUPPORT_EMAIL,
    },
  });

  // send mail to the mechanic
  sendHTMLMail({
    email: service.postedBy.email,
    template: "make-appointment-mechanic",
    variables: {
      ...appointmentDetails,
      ...userDetails,
      ...storeDetails,
      SUPPORT_EMAIL: ENV_CONFIG.SUPPORT_EMAIL,
    },
  });

  return sendRes(res, {
    status: 201,
    message: "Thank you for booking the appointment, we will contact you soon!",
  });
};

export const handleGetAppointmentsByUser = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.jwtData.userId;
  const appointments = await appointmentModel
    .find({ bookedBy: userId })
    .sort({ appointmentDate: -1 })
    .populate("bookedBy service bookedFor");

  return sendRes(res, {
    status: 200,
    data: appointments,
  });
};

export const handleGetAppointmentsByMechanic = async (
  req: Request,
  res: Response
) => {
  const mechanicId = res.locals.jwtData.userId;
  const appointments = await appointmentModel
    .find({ bookedFor: mechanicId })
    .sort({ appointmentDate: -1 })
    .populate("bookedBy service bookedFor");

  return sendRes(res, {
    status: 200,
    data: appointments,
  });
};

// changing the status of the appointment

export const handleApproveAppointmentByMechanic = async (
  req: Request,
  res: Response
) => {
  const appointmentId = req.params.appointmentId;
  const mechanicId = res.locals.jwtData.userId;

  const appointment: any = await appointmentModel
    .find({ _id: appointmentId, isApprovedByAdmin: true })
    .populate("bookedBy service bookedFor");

  if (!appointment) {
    return sendRes(res, {
      status: 404,
      message: "Appointment not found",
    });
  }

  if (appointment.status !== "PENDING") {
    return sendRes(res, {
      status: 400,
      message: "This appointment is already approved or rejected",
    });
  }

  if (appointment.bookedFor._id.toString() !== mechanicId.toString()) {
    return sendRes(res, {
      status: 403,
      message: "You are not authorized to approve this appointment",
    });
  }

  appointment.status = "APPROVED";
  await appointment.save();

  sendHTMLMail({
    email: appointment.bookedBy.email,
    template: "appointment-approved-by-mechanics",
    variables: {
      USER_NAME: appointment.bookedBy.name,
      APPOINTMENT_DATE: appointment.appointmentDate.toLocaleDateString(),
      APPOINTMENT_TIME: appointment.appointmentTime,
      SERVICE_TITLE: appointment.service.serviceType,
      STORE_NAME: appointment.bookedFor.storeName,
      STORE_ADDRESS: appointment.bookedFor.storeAddress,
      STORE_PHONE: appointment.bookedFor.phone,
      STORE_EMAIL: appointment.bookedFor.email,
      SUPPORT_EMAIL: ENV_CONFIG.SUPPORT_EMAIL,
    },
  });

  //  send notification to the user

  await notificationModel.create({
    for: appointment.bookedBy._id,
    role: "User",
    title: "Appointment Approved",
    message: `Your appointment for ${appointment.service.serviceType} in ${appointment.bookedFor.storeName} has been approved.`,
  });

  return sendRes(res, {
    status: 200,
    message: "Appointment approved successfully",
  });
};

export const handleRejectAppointmentByMechanic = async (
  req: Request,
  res: Response
) => {
  const appointmentId = req.params.appointmentId;
  const mechanicId = res.locals.jwtData.userId;

  const appointment: any = await appointmentModel
    .findById(appointmentId)
    .populate("bookedBy service bookedFor");

  if (!appointment) {
    return sendRes(res, {
      status: 404,
      message: "Appointment not found",
    });
  }

  if (appointment.bookedFor._id.toString() !== mechanicId.toString()) {
    return sendRes(res, {
      status: 403,
      message: "You are not authorized to reject this appointment",
    });
  }

  if (appointment.status !== "PENDING") {
    return sendRes(res, {
      status: 400,
      message: "This appointment is already approved or rejected",
    });
  }

  appointment.status = "REJECTED";
  await appointment.save();

  sendHTMLMail({
    email: appointment.bookedBy.email,
    template: "appointment-rejected-by-mechanics",
    variables: {
      USER_NAME: appointment.bookedBy.name,
      APPOINTMENT_DATE: appointment.appointmentDate.toLocaleDateString(),
      APPOINTMENT_TIME: appointment.appointmentTime,
      SERVICE_TITLE: appointment.service.serviceType,
      STORE_NAME: appointment.bookedFor.storeName,
      STORE_ADDRESS: appointment.bookedFor.storeAddress,
      STORE_PHONE: appointment.bookedFor.phone,
      STORE_EMAIL: appointment.bookedFor.email,
      SUPPORT_EMAIL: ENV_CONFIG.SUPPORT_EMAIL,
    },
  });

  //  send notification to the user
  await notificationModel.create({
    for: appointment.bookedBy._id,
    role: "User",
    title: "Appointment Rejected",
    message: `Your appointment for ${appointment.service.serviceType} in ${appointment.bookedFor.storeName} has been rejected.`,
  });

  return sendRes(res, {
    status: 200,
    message: "Appointment rejected successfully",
  });
};

export const handleCompleteAppointmentByMechanic = async (
  req: Request,
  res: Response
) => {
  const appointmentId = req.params.appointmentId;
  const mechanicId = res.locals.jwtData.userId;
  const report = res.locals.file;
  const appointment: any = await appointmentModel
    .findById(appointmentId)
    .populate("bookedBy service bookedFor");

  if (!appointment) {
    return sendRes(res, {
      status: 404,
      message: "Appointment not found",
    });
  }

  if (appointment.bookedFor._id.toString() !== mechanicId.toString()) {
    return sendRes(res, {
      status: 403,
      message: "You are not authorized to complete this appointment",
    });
  }

  if (appointment.status !== "APPROVED") {
    return sendRes(res, {
      status: 400,
      message: "This appointment is not approved yet!",
    });
  }

  if (!report) {
    return sendRes(res, {
      status: 400,
      message: "Report file is required to complete the appointment",
    });
  }

  appointment.status = "COMPLETED";
  appointment.report = report;
  await appointment.save();

  sendHTMLMail({
    email: appointment.bookedBy.email,
    template: "appointment-complete",
    variables: {
      USER_NAME: appointment.bookedBy.name,
      APPOINTMENT_DATE: appointment.appointmentDate.toLocaleDateString(),
      APPOINTMENT_TIME: appointment.appointmentTime,
      SERVICE_TITLE: appointment.service.serviceType,
      STORE_NAME: appointment.bookedFor.storeName,
      STORE_ADDRESS: appointment.bookedFor.storeAddress,
      STORE_PHONE: appointment.bookedFor.phone,
      STORE_EMAIL: appointment.bookedFor.email,
      SUPPORT_EMAIL: ENV_CONFIG.SUPPORT_EMAIL,
      INVOICE_LINK: appointment.report.url,
    },
  });

  // send notification to the user
  await notificationModel.create({
    for: appointment.bookedBy._id,
    role: "User",
    title: "Appointment Completed",
    message: `Your appointment for ${appointment.service.serviceType} in ${appointment.bookedFor.storeName} has been completed.`,
  });

  return sendRes(res, {
    status: 200,
    message: "Appointment completed successfully",
  });
};
