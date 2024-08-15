"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ServiceSchema = zod_1.default.object({
    description: zod_1.default.string(),
    price: zod_1.default.string().transform((val) => Number(val)),
    features: zod_1.default.array(zod_1.default.string()).optional(),
    serviceType: zod_1.default.string(),
});
//# sourceMappingURL=service.zod.js.map