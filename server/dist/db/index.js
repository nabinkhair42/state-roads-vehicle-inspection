"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDb = exports.connectToDB = void 0;
const env_config_1 = __importDefault(require("@/config/env.config"));
const dev_log_1 = require("@/utils/dev-log");
const mongoose_1 = require("mongoose");
const connectToDB = () => {
    return new Promise(async (resolve, reject) => {
        console.log("Connecting to MongoDB...");
        try {
            await (0, mongoose_1.connect)(env_config_1.default.MONGO_URI);
            resolve("MongoDB connected!");
        }
        catch (err) {
            (0, dev_log_1.devLog)(err);
            reject("MongoDB connection failed!");
        }
    });
};
exports.connectToDB = connectToDB;
const disconnectFromDb = async () => {
    try {
        await (0, mongoose_1.disconnect)();
        console.log("MongoDB disconnected!");
    }
    catch (err) {
        console.log("MongoDB disconnection failed!");
        (0, dev_log_1.devLog)(err);
    }
};
exports.disconnectFromDb = disconnectFromDb;
//# sourceMappingURL=index.js.map