"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const env_config_1 = __importDefault(require("@/config/env.config"));
const send_response_1 = require("@/middlewares/send-response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id, expiresIn) => {
    const payload = { userId: id };
    const token = jsonwebtoken_1.default.sign(payload, env_config_1.default.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
exports.createToken = createToken;
const verifyToken = (cookieId) => {
    return (req, res, next) => {
        const token = req.signedCookies[cookieId];
        if (!token || token.trim() === "") {
            const response = {
                status: 401,
                message: "Sorry, please login to continue...",
            };
            return (0, send_response_1.sendRes)(res, response);
        }
        return new Promise((resolve, reject) => {
            return jsonwebtoken_1.default.verify(token, env_config_1.default.JWT_SECRET, (err, success) => {
                if (err) {
                    reject(err.message);
                    return (0, send_response_1.sendRes)(res, {
                        status: 401,
                        message: "Auth Error, Invalid token",
                    });
                }
                else {
                    resolve();
                    res.locals.jwtData = success;
                    return next();
                }
            });
        });
    };
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token-manager.js.map