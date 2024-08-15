"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("@/config/env.config"));
const roles_const_1 = require("@/constants/roles.const");
const appointment_1 = require("@/controllers/appointment");
const has_authorized_role_1 = require("@/middlewares/has-authorized-role");
const multer_1 = require("@/middlewares/multer");
const remote_upload_1 = require("@/middlewares/remote-upload");
const try_catch_1 = require("@/middlewares/try-catch");
const validate_body_1 = require("@/middlewares/validate-body");
const token_manager_1 = require("@/utils/token-manager");
const zod_1 = require("@/zod");
const express_1 = require("express");
const appointmentRouter = (0, express_1.Router)();
appointmentRouter.post("/:serviceId", (0, token_manager_1.verifyToken)(env_config_1.default.AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.USER), (0, validate_body_1.validateBody)(zod_1.AppointmentSchema), (0, try_catch_1.tryCatch)(appointment_1.handleMakeAppointment));
appointmentRouter.get("/user", (0, token_manager_1.verifyToken)(env_config_1.default.AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.USER), (0, try_catch_1.tryCatch)(appointment_1.handleGetAppointmentsByUser));
appointmentRouter.get("/mechanics", (0, token_manager_1.verifyToken)(env_config_1.default.MECHANICS_AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.MECHANICS), (0, try_catch_1.tryCatch)(appointment_1.handleGetAppointmentsByMechanic));
// change status
appointmentRouter.put("/status/approve/:appointmentId", (0, token_manager_1.verifyToken)(env_config_1.default.MECHANICS_AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.MECHANICS), (0, try_catch_1.tryCatch)(appointment_1.handleApproveAppointmentByMechanic));
appointmentRouter.put("/status/reject/:appointmentId", (0, token_manager_1.verifyToken)(env_config_1.default.MECHANICS_AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.MECHANICS), (0, try_catch_1.tryCatch)(appointment_1.handleRejectAppointmentByMechanic));
appointmentRouter.put("/status/complete/:appointmentId", (0, multer_1.parseFile)("report"), (0, remote_upload_1.remoteUploadFile)("appointment-reports"), (0, token_manager_1.verifyToken)(env_config_1.default.MECHANICS_AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.MECHANICS), (0, try_catch_1.tryCatch)(appointment_1.handleCompleteAppointmentByMechanic));
exports.default = appointmentRouter;
//# sourceMappingURL=appointment.js.map