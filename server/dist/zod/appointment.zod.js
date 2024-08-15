"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.AppointmentSchema = zod_1.default.object({
    appointmentDate: zod_1.default.string(),
    message: zod_1.default.string(),
    appointmentTime: zod_1.default.string(),
});
//# sourceMappingURL=appointment.zod.js.map