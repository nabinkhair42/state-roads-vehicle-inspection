"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllWorkshops = void 0;
const send_response_1 = require("@/middlewares/send-response");
const mechanics_model_1 = __importDefault(require("@/models/mechanics.model"));
const handleGetAllWorkshops = async (req, res) => {
    const mechanics = await mechanics_model_1.default.find().select("-password");
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        data: mechanics,
    });
};
exports.handleGetAllWorkshops = handleGetAllWorkshops;
//# sourceMappingURL=workshop.js.map