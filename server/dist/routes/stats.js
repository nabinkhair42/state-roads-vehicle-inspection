"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("@/config/env.config"));
const roles_const_1 = require("@/constants/roles.const");
const stats_1 = require("@/controllers/stats");
const has_authorized_role_1 = require("@/middlewares/has-authorized-role");
const try_catch_1 = require("@/middlewares/try-catch");
const token_manager_1 = require("@/utils/token-manager");
const express_1 = require("express");
const statsRouter = (0, express_1.Router)();
statsRouter.get("/mechanics", (0, token_manager_1.verifyToken)(env_config_1.default.MECHANICS_AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.MECHANICS), (0, try_catch_1.tryCatch)(stats_1.handleGetMechanicsStats));
exports.default = statsRouter;
//# sourceMappingURL=stats.js.map