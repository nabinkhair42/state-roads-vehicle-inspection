"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mechanics_auth_1 = require("@/controllers/mechanics-auth");
const validate_body_1 = require("@/middlewares/validate-body");
const express_1 = require("express");
const token_manager_1 = require("@/utils/token-manager");
const env_config_1 = __importDefault(require("@/config/env.config"));
const zod_1 = require("@/zod");
const try_catch_1 = require("@/middlewares/try-catch");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", (0, validate_body_1.validateBody)(zod_1.MechanicsSignupSchema), (0, try_catch_1.tryCatch)(mechanics_auth_1.handleMechanicsSignup));
authRouter.post("/login", (0, validate_body_1.validateBody)(zod_1.MechanicsLoginSchema), (0, try_catch_1.tryCatch)(mechanics_auth_1.handleMechanicsLogin));
authRouter.get("/me", (0, token_manager_1.verifyToken)(env_config_1.default.MECHANICS_AUTH_TOKEN_ID), (0, try_catch_1.tryCatch)(mechanics_auth_1.handleGetMechanicsProfile));
authRouter.get("/logout", (0, try_catch_1.tryCatch)(mechanics_auth_1.handleMechanicsLogout));
exports.default = authRouter;
//# sourceMappingURL=mechanics-auth.js.map