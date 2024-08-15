"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("@/controllers/auth");
const validate_body_1 = require("@/middlewares/validate-body");
const express_1 = require("express");
const token_manager_1 = require("@/utils/token-manager");
const zod_1 = require("@/zod");
const env_config_1 = __importDefault(require("@/config/env.config"));
const try_catch_1 = require("@/middlewares/try-catch");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", (0, validate_body_1.validateBody)(zod_1.SignupSchema), (0, try_catch_1.tryCatch)(auth_1.handleUserSignup));
authRouter.post("/login", (0, validate_body_1.validateBody)(zod_1.LoginSchema), (0, try_catch_1.tryCatch)(auth_1.handleUserLogin));
authRouter.get("/me", (0, token_manager_1.verifyToken)(env_config_1.default.AUTH_TOKEN_ID), (0, try_catch_1.tryCatch)(auth_1.handleGetUserProfile));
authRouter.get("/logout", (0, try_catch_1.tryCatch)(auth_1.handleUserLogout));
exports.default = authRouter;
//# sourceMappingURL=auth.js.map