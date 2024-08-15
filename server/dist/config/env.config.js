"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const ENV_CONFIG = {
    // server related
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    MAX_REQUEST_SIZE: process.env.MAX_REQUEST_SIZE || "10mb",
    // auth related
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    AUTH_TOKEN_ID: "auth-token",
    MECHANICS_AUTH_TOKEN_ID: "mechanics-auth-token",
    NODE_ENV: process.env.NODE_ENV || "development",
    // imagekit related
    IMAGE_KIT_PUBLIC_KEY: process.env.IMAGE_KIT_PUBLIC_KEY,
    IMAGE_KIT_PRIVATE_KEY: process.env.IMAGE_KIT_PRIVATE_KEY,
    IMAGE_KIT_ENDPOINT: process.env.IMAGE_KIT_ENDPOINT,
    // email related
    SMTP_USER_EMAIL: process.env.SMTP_USER_EMAIL,
    SMTP_USER_PASSWORD: process.env.SMTP_USER_PASSWORD,
    SMTP_HOST: process.env.SMTP_HOST ?? "smtp.gmail.com",
};
exports.default = ENV_CONFIG;
//# sourceMappingURL=env.config.js.map