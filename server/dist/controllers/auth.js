"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserLogout = exports.handleGetUserProfile = exports.handleUserLogin = exports.handleUserSignup = void 0;
const send_response_1 = require("@/middlewares/send-response");
const user_model_1 = __importDefault(require("@/models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookies_1 = require("@/utils/cookies");
const env_config_1 = __importDefault(require("@/config/env.config"));
const handleUserSignup = async (req, res) => {
    const body = req.body;
    const user = await user_model_1.default.findOne({ email: body.email });
    if (user) {
        return (0, send_response_1.sendRes)(res, {
            status: 400,
            message: "User already exists with this email, Please login!",
        });
    }
    const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
    const newUser = new user_model_1.default({
        ...body,
        password: hashedPassword,
    });
    await newUser.save();
    (0, cookies_1.registerCookies)(res, newUser._id.toString(), env_config_1.default.AUTH_TOKEN_ID);
    return (0, send_response_1.sendRes)(res, {
        status: 201,
        message: `Welcome ${newUser.name}, your account is created successfully!`,
    });
};
exports.handleUserSignup = handleUserSignup;
const handleUserLogin = async (req, res) => {
    const body = req.body;
    const user = await user_model_1.default.findOne({ email: body.email });
    if (!user) {
        return (0, send_response_1.sendRes)(res, {
            status: 404,
            message: "User not found, Please create an account!",
        });
    }
    const isPasswordValid = await bcrypt_1.default.compare(body.password, user.password);
    if (!isPasswordValid) {
        return (0, send_response_1.sendRes)(res, {
            status: 400,
            message: "Invalid credentials, Please try again!",
        });
    }
    (0, cookies_1.registerCookies)(res, user._id.toString(), env_config_1.default.AUTH_TOKEN_ID);
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        message: `Welcome back ${user.name}!`,
    });
};
exports.handleUserLogin = handleUserLogin;
const handleGetUserProfile = async (req, res) => {
    const user = res.locals.jwtData.userId;
    const userDoc = await user_model_1.default.findById(user).select("-password");
    if (!userDoc) {
        return (0, send_response_1.sendRes)(res, {
            status: 404,
            message: "User not found!",
        });
    }
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        data: userDoc,
    });
};
exports.handleGetUserProfile = handleGetUserProfile;
const handleUserLogout = async (req, res) => {
    (0, cookies_1.clearCookies)(res, env_config_1.default.AUTH_TOKEN_ID);
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        message: "Logged out successfully!",
    });
};
exports.handleUserLogout = handleUserLogout;
//# sourceMappingURL=auth.js.map