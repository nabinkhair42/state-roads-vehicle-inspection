"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRes = void 0;
const env_config_1 = __importDefault(require("@/config/env.config"));
const status_const_1 = require("@/constants/status.const");
const sendRes = (res, responseData) => {
    let error = undefined;
    if (responseData.error) {
        if (env_config_1.default.NODE_ENV === "development" || responseData.forceError) {
            error = responseData.error;
        }
        else {
            error =
                "The actual error has been hidden for security reasons, Please report the administrator for more information.";
        }
    }
    return res.status(responseData.status).json({
        ...status_const_1.STATUS[responseData.status || 200],
        ...responseData,
        error,
    });
};
exports.sendRes = sendRes;
//# sourceMappingURL=send-response.js.map