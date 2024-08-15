"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const env_config_1 = __importDefault(require("@/config/env.config"));
const nodemailer_1 = require("nodemailer");
const sendMail = async ({ html, subject, to }) => {
    const transporter = (0, nodemailer_1.createTransport)({
        host: env_config_1.default.SMTP_HOST,
        auth: {
            user: env_config_1.default.SMTP_USER_EMAIL,
            pass: env_config_1.default.SMTP_USER_PASSWORD,
        },
    });
    try {
        await transporter.sendMail({
            to,
            from: env_config_1.default.SMTP_USER_EMAIL,
            subject: env_config_1.default.NODE_ENV === "development"
                ? `DEVELOPMENT: ${subject}`
                : subject,
            html,
        });
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.sendMail = sendMail;
//# sourceMappingURL=send-mail.js.map