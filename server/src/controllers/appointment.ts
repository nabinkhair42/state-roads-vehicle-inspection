import { sendRes } from "@/middlewares/send-response";
import appointmentModel from "@/models/appointment.model";
import notificationModel from "@/models/notification.model";
import serviceModel from "@/models/service.model";
import userModel from "@/models/user.model";
import { mailTemplates } from "@/utils/mail-templates";
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

  await notificationModel.create({
    for: user?.id,
    role: "User",
    title: "Appointment Created",
    message: `Your appointment for ${service.serviceType} in ${service.postedBy.storeName} has been created.`,
  });

  await notificationModel.create({
    for: service.postedBy._id,
    role: "Mechanics",
    title: "New Appointment",
    message: `${user.name} has scheduled a new appointment for ${service.serviceType}`,
  });

  // send mail to the user
  const mailDataForUser = mailTemplates.toUser.appointmentCreated({
    date: appointment.appointmentDate,
    usersName: user.name,
    serviceName: service.title,
    storeAddress: service.postedBy.storeAddress,
    storeEmail: service.postedBy.email,
    storeName: service.postedBy.name,
    storePhone: service.postedBy.phone,
  });

  // // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
  sendMail({
    to: user.email,
    ...mailDataForUser,
  });

  // send mail to the mechanic
  const mailDataForMechanic = mailTemplates.toMechanic.appointmentCreated({
    date: appointment.appointmentDate,
    userEmail: user.email,
    userPhone: user.phone,
    message: appointment.message,
    serviceTitle: service.title,
    userName: user.name,
    storeName: service.postedBy.storeName,
  });

  // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
  sendMail({
    to: service.postedBy.email,
    ...mailDataForMechanic,
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

  // send mail to the user
  const mailDataForUser = mailTemplates.toUser.appointmentApproved({
    date: appointment.appointmentDate,
    serviceTitle: appointment.service.title,
    storeAddress: appointment.bookedFor.storeAddress,
    storeEmail: appointment.bookedFor.email,
    storeName: appointment.bookedFor.storeName,
    storePhone: appointment.bookedFor.phone,
    userName: appointment.bookedBy.name,
  });

  // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
  sendMail({
    to: appointment.bookedBy.email,
    ...mailDataForUser,
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

  // send mail to the user

  const mailDataForUser = mailTemplates.toUser.appointmentRejected({
    date: appointment.appointmentDate,
    serviceTitle: appointment.service.title,
    storeAddress: appointment.bookedFor.storeAddress,
    storeEmail: appointment.bookedFor.email,
    storeName: appointment.bookedFor.name,
    storePhone: appointment.bookedFor.phone,
    userName: appointment.bookedBy.name,
  });

  // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
  sendMail({
    to: appointment.bookedBy.email,
    ...mailDataForUser,
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

  // send mail to the user
  const mailDataForUser = mailTemplates.toUser.appointmentCompleted({
    date: appointment.appointmentDate,
    serviceTitle: appointment.service.title,
    storeAddress: appointment.bookedFor.storeAddress,
    storeEmail: appointment.bookedFor.email,
    storeName: appointment.bookedFor.storeName,
    storePhone: appointment.bookedFor.phone,
    userName: appointment.bookedBy.name,
  });

  // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
  sendMail({
    to: appointment.bookedBy.email,
    ...mailDataForUser,
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
