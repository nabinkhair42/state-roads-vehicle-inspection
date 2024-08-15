"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookies = exports.registerCookies = void 0;
const token_manager_1 = require("./token-manager");
const env_config_1 = __importDefault(require("@/config/env.config"));
/**
 * A utility class for handling cookies.
 */
/**
 * Handles cookies by clearing existing cookies and setting new ones.
 * @param res - The express.js response object.
 * @param userId - The user ID.
 */
const registerCookies = (res, userId, authToken) => {
    // clear cookies
    // clearCookies(res);
    // set cookies
    const token = (0, token_manager_1.createToken)(userId, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(authToken, token, {
        path: "/",
        domain: env_config_1.default.FRONTEND_DOMAIN,
        expires: expires,
        httpOnly: true,
        signed: true,
        sameSite: "none",
        secure: true,
    });
};
exports.registerCookies = registerCookies;
/**
 * Clears the existing cookies.
 * @param res - The response object.
 */
const clearCookies = (res, authToken) => {
    res.clearCookie(authToken, {
        path: "/",
        domain: env_config_1.default.FRONTEND_DOMAIN,
        httpOnly: true,
        signed: true,
        sameSite: "none",
        secure: true,
    });
};
exports.clearCookies = clearCookies;
//# sourceMappingURL=cookies.js.map