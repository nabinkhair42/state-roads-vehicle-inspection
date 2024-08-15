"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("@/config/env.config"));
const roles_const_1 = require("@/constants/roles.const");
const service_1 = require("@/controllers/service");
const has_authorized_role_1 = require("@/middlewares/has-authorized-role");
const multer_1 = require("@/middlewares/multer");
const remote_upload_1 = require("@/middlewares/remote-upload");
const try_catch_1 = require("@/middlewares/try-catch");
const validate_body_1 = require("@/middlewares/validate-body");
const token_manager_1 = require("@/utils/token-manager");
const zod_1 = require("@/zod");
const express_1 = require("express");
const serviceRouter = (0, express_1.Router)();
serviceRouter.post("/", (0, token_manager_1.verifyToken)(env_config_1.default.MECHANICS_AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.MECHANICS), (0, multer_1.parseFile)("thumbnail"), (0, remote_upload_1.remoteUploadFile)("service-thumbnails"), 
// @ts-ignore //* because validateBody expects price as number but it is string as we are receiving it from the form data
(0, validate_body_1.validateBody)(zod_1.ServiceSchema), (0, try_catch_1.tryCatch)(service_1.handleCreateService));
serviceRouter.delete("/:id", (0, token_manager_1.verifyToken)(env_config_1.default.MECHANICS_AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.MECHANICS), (0, try_catch_1.tryCatch)(service_1.handleDeleteServiceById));
serviceRouter.get("/", (0, try_catch_1.tryCatch)(service_1.handleGetAllServices));
serviceRouter.get("/:id", (0, try_catch_1.tryCatch)(service_1.handleGetServiceById));
serviceRouter.get("/mechanics/:id", (0, token_manager_1.verifyToken)(env_config_1.default.MECHANICS_AUTH_TOKEN_ID), (0, has_authorized_role_1.hasAuthorizedRole)(roles_const_1.ROLES.MECHANICS), (0, try_catch_1.tryCatch)(service_1.handleGetServiceByMechanicId));
exports.default = serviceRouter;
//# sourceMappingURL=service.js.map