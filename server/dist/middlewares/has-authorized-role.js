"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAuthorizedRole = void 0;
const send_response_1 = require("./send-response");
const mechanics_model_1 = __importDefault(require("@/models/mechanics.model"));
const user_model_1 = __importDefault(require("@/models/user.model"));
const roles_const_1 = require("@/constants/roles.const");
// use verifyToken before this middleware
const hasAuthorizedRole = (role) => {
    return (req, res, next) => {
        const userId = res.locals.jwtData.userId;
        if (!userId) {
            return (0, send_response_1.sendRes)(res, {
                status: 401,
                message: "Sorry, please login to continue...",
            });
        }
        if (role === roles_const_1.ROLES.MECHANICS) {
            const user = mechanics_model_1.default.findById(userId);
            res.locals.user = user;
            if (!user) {
                return (0, send_response_1.sendRes)(res, {
                    status: 401,
                    message: "Sorry, you are not authorized to access this resource!",
                });
            }
        }
        else if (role === roles_const_1.ROLES.USER) {
            const user = user_model_1.default.findById(userId);
            res.locals.user = user;
            if (!user) {
                return (0, send_response_1.sendRes)(res, {
                    status: 401,
                    message: "Sorry, you are not authorized to access this resource!",
                });
            }
        }
        else {
            throw new Error("Invalid role");
        }
        return next();
    };
};
exports.hasAuthorizedRole = hasAuthorizedRole;
//# sourceMappingURL=has-authorized-role.js.map