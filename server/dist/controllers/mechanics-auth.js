"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMechanicsLogout = exports.handleGetMechanicsProfile = exports.handleMechanicsLogin = exports.handleMechanicsSignup = void 0;
const send_response_1 = require("@/middlewares/send-response");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookies_1 = require("@/utils/cookies");
const env_config_1 = __importDefault(require("@/config/env.config"));
const mechanics_model_1 = __importDefault(require("@/models/mechanics.model"));
const handleMechanicsSignup = async (req, res) => {
    const body = req.body;
    const mechanics = await mechanics_model_1.default.findOne({ email: body.email });
    if (mechanics) {
        return (0, send_response_1.sendRes)(res, {
            status: 400,
            message: "Account already exists with this email, Please login!",
        });
    }
    const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
    const newMechanics = new mechanics_model_1.default({
        ...body,
        password: hashedPassword,
    });
    await newMechanics.save();
    (0, cookies_1.registerCookies)(res, newMechanics._id.toString(), env_config_1.default.MECHANICS_AUTH_TOKEN_ID);
    return (0, send_response_1.sendRes)(res, {
        status: 201,
        message: `Welcome ${newMechanics.name}, your account is created successfully!`,
    });
};
exports.handleMechanicsSignup = handleMechanicsSignup;
const handleMechanicsLogin = async (req, res) => {
    const body = req.body;
    const mechanics = await mechanics_model_1.default.findOne({ email: body.email });
    if (!mechanics) {
        return (0, send_response_1.sendRes)(res, {
            status: 404,
            message: "Account not found, Please create an account!",
        });
    }
    const isPasswordValid = await bcrypt_1.default.compare(body.password, mechanics.password);
    if (!isPasswordValid) {
        return (0, send_response_1.sendRes)(res, {
            status: 400,
            message: "Invalid credentials, Please try again!",
        });
    }
    (0, cookies_1.registerCookies)(res, mechanics._id.toString(), env_config_1.default.MECHANICS_AUTH_TOKEN_ID);
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        message: `Welcome back ${mechanics.name}!`,
    });
};
exports.handleMechanicsLogin = handleMechanicsLogin;
const handleGetMechanicsProfile = async (req, res) => {
    const mechanics = res.locals.jwtData.userId;
    const mechanicsDoc = await mechanics_model_1.default
        .findById(mechanics)
        .select("-password");
    if (!mechanicsDoc) {
        return (0, send_response_1.sendRes)(res, {
            status: 404,
            message: "Mechanics not found!",
        });
    }
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        data: mechanicsDoc,
    });
};
exports.handleGetMechanicsProfile = handleGetMechanicsProfile;
const handleMechanicsLogout = async (req, res) => {
    (0, cookies_1.clearCookies)(res, env_config_1.default.MECHANICS_AUTH_TOKEN_ID);
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        message: "Logged out successfully!",
    });
};
exports.handleMechanicsLogout = handleMechanicsLogout;
//# sourceMappingURL=mechanics-auth.js.map