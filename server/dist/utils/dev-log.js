"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devLog = void 0;
const env_config_1 = __importDefault(require("@/config/env.config"));
const devLog = (...args) => {
    if (env_config_1.default.NODE_ENV === "development") {
        console.log("DEV LOG:");
        console.log(...args);
    }
};
exports.devLog = devLog;
//# sourceMappingURL=dev-log.js.map