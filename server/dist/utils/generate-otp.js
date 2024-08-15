"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateOTP = () => {
    const otp = (crypto_1.default.randomInt(0, 1000000) + 1000000)
        .toString()
        .substring(1);
    return otp;
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=generate-otp.js.map