"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // isVerified: { // In later chapters, we might implement email verification
    //   type: Boolean,
    //   default: false,
    // },
}, {
    timestamps: true,
    collection: "users",
});
exports.default = mongoose_1.default.model("User", exports.userModel);
//# sourceMappingURL=user.model.js.map