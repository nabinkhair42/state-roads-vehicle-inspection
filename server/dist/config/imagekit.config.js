"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imagekit_1 = __importDefault(require("imagekit"));
const env_config_1 = __importDefault(require("./env.config"));
const imageKit = new imagekit_1.default({
    publicKey: env_config_1.default.IMAGE_KIT_PUBLIC_KEY || "",
    privateKey: env_config_1.default.IMAGE_KIT_PRIVATE_KEY || "",
    urlEndpoint: env_config_1.default.IMAGE_KIT_ENDPOINT || "",
});
exports.default = imageKit;
//# sourceMappingURL=imagekit.config.js.map