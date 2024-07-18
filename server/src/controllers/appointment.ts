import { sendRes } from "@/middlewares/send-response";
import appointmentModel from "@/models/appointment.model";
import serviceModel from "@/models/service.model";
import { Request, Response } from "express";

export const handleMakeAppointment = async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;

  const service = await serviceModel.findById(serviceId);
  if (!service) {
    return sendRes(res, {
      status: 404,
      message: "Service not found",
    });
  }

  const appointmentData = {
    bookedBy: res.locals.jwtData.userId,
    bookedFor: service.postedBy,
    service: serviceId,
    ...req.body,
  };

  // Create the appointment
  const appointment = await appointmentModel.create(appointmentData);
  await appointment.save();

  // todo send mail to the mechanic
  // todo mail to user
  // todo send notification to the mechanic
  // todo send notification to the user

  return sendRes(res, {
    status: 201,
    message: "Thank you for booking the appointment, we will contact you soon!",
    data: appointment,
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

  const appointment = await appointmentModel.findById(appointmentId);
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

  if (appointment.bookedFor.toString() !== mechanicId) {
    return sendRes(res, {
      status: 403,
      message: "You are not authorized to approve this appointment",
    });
  }

  appointment.status = "APPROVED";
  await appointment.save();

  // todo send mail to the user
  // todo send notification to the user

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

  const appointment = await appointmentModel.findById(appointmentId);

  if (!appointment) {
    return sendRes(res, {
      status: 404,
      message: "Appointment not found",
    });
  }

  if (appointment.bookedFor.toString() !== mechanicId) {
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

  // todo send mail to the user
  // todo send notification to the user

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

  const appointment = await appointmentModel.findById(appointmentId);
  if (!appointment) {
    return sendRes(res, {
      status: 404,
      message: "Appointment not found",
    });
  }

  if (appointment.bookedFor.toString() !== mechanicId) {
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

  appointment.status = "COMPLETED";
  await appointment.save();

  // todo send mail to the user
  // todo send notification to the user

  return sendRes(res, {
    status: 200,
    message: "Appointment completed successfully",
  });
};

export const handleCompleteAppointmentByUser = async (
  req: Request,
  res: Response
) => {
  const appointmentId = req.params.appointmentId;
  const userId = res.locals.jwtData.userId;

  const appointment = await appointmentModel.findById(appointmentId);
  if (!appointment) {
    return sendRes(res, {
      status: 404,
      message: "Appointment not found",
    });
  }

  if (appointment.bookedBy.toString() !== userId) {
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

  appointment.status = "COMPLETED";

  await appointment.save();

  // todo send mail to the mechanic
  // todo send notification to the mechanic

  return sendRes(res, {
    status: 200,
    message: "Appointment completed successfully",
  });
};
