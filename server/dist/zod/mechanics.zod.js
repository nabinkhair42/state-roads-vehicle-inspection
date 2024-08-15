"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MechanicsLoginSchema = exports.MechanicsSignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.MechanicsSignupSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email("Please enter a valid email!"),
    phone: zod_1.default.string(),
    password: zod_1.default.string().min(8, "Password is too short!"),
    storeName: zod_1.default.string(),
    storeCoordinates: zod_1.default.object({
        latitude: zod_1.default.string(),
        longitude: zod_1.default.string(),
    }),
    storeAddress: zod_1.default.string(),
});
exports.MechanicsLoginSchema = zod_1.default.object({
    email: zod_1.default.string().email("Please enter a valid email!"),
    password: zod_1.default.string(),
});
//# sourceMappingURL=mechanics.zod.js.map