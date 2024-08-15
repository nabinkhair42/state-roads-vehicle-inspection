"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const file_model_1 = __importDefault(require("./file.model"));
exports.serviceModel = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: file_model_1.default,
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Mechanics",
    },
    features: {
        type: [String],
        required: false,
    },
    serviceType: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: "services",
});
exports.default = mongoose_1.default.model("Service", exports.serviceModel);
//# sourceMappingURL=service.model.js.map