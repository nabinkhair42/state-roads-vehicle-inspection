"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.notificationModel = new mongoose_1.default.Schema({
    for: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "refType",
        required: true,
    },
    refType: {
        type: String,
        enum: ["Mechanics", "User"],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isViewed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    collection: "notifications",
});
exports.default = mongoose_1.default.model("Notification", exports.notificationModel);
//# sourceMappingURL=notification.model.js.map