"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetMechanicsStats = void 0;
const send_response_1 = require("@/middlewares/send-response");
const appointment_model_1 = __importDefault(require("@/models/appointment.model"));
const service_model_1 = __importDefault(require("@/models/service.model"));
const handleGetMechanicsStats = async (req, res) => {
    const userId = res.locals.jwtData.userId;
    const totalAppointments = await appointment_model_1.default.countDocuments({
        bookedFor: userId,
    });
    const totalServices = await service_model_1.default.countDocuments({ postedBy: userId });
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        data: {
            totalAppointments,
            totalServices,
        },
    });
};
exports.handleGetMechanicsStats = handleGetMechanicsStats;
//# sourceMappingURL=stats.js.map