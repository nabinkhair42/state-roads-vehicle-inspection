"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCompleteAppointmentByMechanic = exports.handleRejectAppointmentByMechanic = exports.handleApproveAppointmentByMechanic = exports.handleGetAppointmentsByMechanic = exports.handleGetAppointmentsByUser = exports.handleMakeAppointment = void 0;
const send_response_1 = require("@/middlewares/send-response");
const appointment_model_1 = __importDefault(require("@/models/appointment.model"));
const service_model_1 = __importDefault(require("@/models/service.model"));
const user_model_1 = __importDefault(require("@/models/user.model"));
const mail_templates_1 = require("@/utils/mail-templates");
const send_mail_1 = require("@/utils/send-mail");
const handleMakeAppointment = async (req, res) => {
    const serviceId = req.params.serviceId;
    const userId = res.locals.jwtData.userId;
    const service = await service_model_1.default
        .findById(serviceId)
        .populate("postedBy");
    if (!service) {
        return (0, send_response_1.sendRes)(res, {
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
    const appointment = await appointment_model_1.default.create(appointmentData);
    await appointment.save();
    const user = await user_model_1.default.findById(userId);
    // send mail to the user
    const mailDataForUser = mail_templates_1.mailTemplates.toUser.appointmentCreated({
        date: appointment.appointmentDate,
        usersName: user.name,
        serviceName: service.title,
        storeAddress: service.postedBy.storeAddress,
        storeEmail: service.postedBy.email,
        storeName: service.postedBy.name,
        storePhone: service.postedBy.phone,
    });
    // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
    (0, send_mail_1.sendMail)({
        to: user.email,
        ...mailDataForUser,
    });
    // send mail to the mechanic
    const mailDataForMechanic = mail_templates_1.mailTemplates.toMechanic.appointmentCreated({
        date: appointment.appointmentDate,
        userEmail: user.email,
        userPhone: user.phone,
        message: appointment.message,
        serviceTitle: service.title,
        userName: user.name,
        storeName: service.postedBy.storeName,
    });
    // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
    (0, send_mail_1.sendMail)({
        to: service.postedBy.email,
        ...mailDataForMechanic,
    });
    // todo send notification to the mechanic
    // todo send notification to the user
    return (0, send_response_1.sendRes)(res, {
        status: 201,
        message: "Thank you for booking the appointment, we will contact you soon!",
    });
};
exports.handleMakeAppointment = handleMakeAppointment;
const handleGetAppointmentsByUser = async (req, res) => {
    const userId = res.locals.jwtData.userId;
    const appointments = await appointment_model_1.default
        .find({ bookedBy: userId })
        .sort({ appointmentDate: -1 })
        .populate("bookedBy service bookedFor");
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        data: appointments,
    });
};
exports.handleGetAppointmentsByUser = handleGetAppointmentsByUser;
const handleGetAppointmentsByMechanic = async (req, res) => {
    const mechanicId = res.locals.jwtData.userId;
    const appointments = await appointment_model_1.default
        .find({ bookedFor: mechanicId })
        .sort({ appointmentDate: -1 })
        .populate("bookedBy service bookedFor");
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        data: appointments,
    });
};
exports.handleGetAppointmentsByMechanic = handleGetAppointmentsByMechanic;
// changing the status of the appointment
const handleApproveAppointmentByMechanic = async (req, res) => {
    const appointmentId = req.params.appointmentId;
    const mechanicId = res.locals.jwtData.userId;
    const appointment = await appointment_model_1.default
        .findById(appointmentId)
        .populate("bookedBy service bookedFor");
    if (!appointment) {
        return (0, send_response_1.sendRes)(res, {
            status: 404,
            message: "Appointment not found",
        });
    }
    if (appointment.status !== "PENDING") {
        return (0, send_response_1.sendRes)(res, {
            status: 400,
            message: "This appointment is already approved or rejected",
        });
    }
    if (appointment.bookedFor._id.toString() !== mechanicId.toString()) {
        return (0, send_response_1.sendRes)(res, {
            status: 403,
            message: "You are not authorized to approve this appointment",
        });
    }
    appointment.status = "APPROVED";
    await appointment.save();
    // send mail to the user
    const mailDataForUser = mail_templates_1.mailTemplates.toUser.appointmentApproved({
        date: appointment.appointmentDate,
        serviceTitle: appointment.service.title,
        storeAddress: appointment.bookedFor.storeAddress,
        storeEmail: appointment.bookedFor.email,
        storeName: appointment.bookedFor.storeName,
        storePhone: appointment.bookedFor.phone,
        userName: appointment.bookedBy.name,
    });
    // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
    (0, send_mail_1.sendMail)({
        to: appointment.bookedBy.email,
        ...mailDataForUser,
    });
    // todo send notification to the user
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        message: "Appointment approved successfully",
    });
};
exports.handleApproveAppointmentByMechanic = handleApproveAppointmentByMechanic;
const handleRejectAppointmentByMechanic = async (req, res) => {
    const appointmentId = req.params.appointmentId;
    const mechanicId = res.locals.jwtData.userId;
    const appointment = await appointment_model_1.default
        .findById(appointmentId)
        .populate("bookedBy service bookedFor");
    if (!appointment) {
        return (0, send_response_1.sendRes)(res, {
            status: 404,
            message: "Appointment not found",
        });
    }
    if (appointment.bookedFor._id.toString() !== mechanicId.toString()) {
        return (0, send_response_1.sendRes)(res, {
            status: 403,
            message: "You are not authorized to reject this appointment",
        });
    }
    if (appointment.status !== "PENDING") {
        return (0, send_response_1.sendRes)(res, {
            status: 400,
            message: "This appointment is already approved or rejected",
        });
    }
    appointment.status = "REJECTED";
    await appointment.save();
    // send mail to the user
    const mailDataForUser = mail_templates_1.mailTemplates.toUser.appointmentRejected({
        date: appointment.appointmentDate,
        serviceTitle: appointment.service.title,
        storeAddress: appointment.bookedFor.storeAddress,
        storeEmail: appointment.bookedFor.email,
        storeName: appointment.bookedFor.name,
        storePhone: appointment.bookedFor.phone,
        userName: appointment.bookedBy.name,
    });
    // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
    (0, send_mail_1.sendMail)({
        to: appointment.bookedBy.email,
        ...mailDataForUser,
    });
    // todo send notification to the user
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        message: "Appointment rejected successfully",
    });
};
exports.handleRejectAppointmentByMechanic = handleRejectAppointmentByMechanic;
const handleCompleteAppointmentByMechanic = async (req, res) => {
    const appointmentId = req.params.appointmentId;
    const mechanicId = res.locals.jwtData.userId;
    const report = res.locals.file;
    const appointment = await appointment_model_1.default
        .findById(appointmentId)
        .populate("bookedBy service bookedFor");
    if (!appointment) {
        return (0, send_response_1.sendRes)(res, {
            status: 404,
            message: "Appointment not found",
        });
    }
    if (appointment.bookedFor._id.toString() !== mechanicId.toString()) {
        return (0, send_response_1.sendRes)(res, {
            status: 403,
            message: "You are not authorized to complete this appointment",
        });
    }
    if (appointment.status !== "APPROVED") {
        return (0, send_response_1.sendRes)(res, {
            status: 400,
            message: "This appointment is not approved yet!",
        });
    }
    if (!report) {
        return (0, send_response_1.sendRes)(res, {
            status: 400,
            message: "Report file is required to complete the appointment",
        });
    }
    appointment.status = "COMPLETED";
    appointment.report = report;
    console.log("report", report);
    await appointment.save();
    // send mail to the user
    const mailDataForUser = mail_templates_1.mailTemplates.toUser.appointmentCompleted({
        date: appointment.appointmentDate,
        serviceTitle: appointment.service.title,
        storeAddress: appointment.bookedFor.storeAddress,
        storeEmail: appointment.bookedFor.email,
        storeName: appointment.bookedFor.storeName,
        storePhone: appointment.bookedFor.phone,
        userName: appointment.bookedBy.name,
    });
    // await is not used here because we don't want to wait for the mail to be sent which will slow down the response
    (0, send_mail_1.sendMail)({
        to: appointment.bookedBy.email,
        ...mailDataForUser,
    });
    // todo send notification to the user
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        message: "Appointment completed successfully",
    });
};
exports.handleCompleteAppointmentByMechanic = handleCompleteAppointmentByMechanic;
//# sourceMappingURL=appointment.js.map