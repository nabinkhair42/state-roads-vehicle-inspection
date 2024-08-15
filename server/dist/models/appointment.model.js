"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const file_model_1 = __importDefault(require("./file.model"));
exports.appointmentModel = new mongoose_1.default.Schema({
    bookedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookedFor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Mechanics",
        required: true,
    },
    service: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    appointmentDate: {
        type: Date, // Date and Time
        required: true,
    },
    appointmentTime: {
        type: String, // Date and Time
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED", "COMPLETED"],
        default: "PENDING",
    },
    report: file_model_1.default,
}, {
    timestamps: true,
    collection: "appointments",
});
exports.default = mongoose_1.default.model("Appointment", exports.appointmentModel);
//# sourceMappingURL=appointment.model.js.map