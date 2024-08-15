"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mechanicsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mechanicsModel = new mongoose_1.default.Schema({
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
    storeName: {
        type: String,
        required: true,
    },
    storeCoordinates: {
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
    },
    storeAddress: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: "mechanics",
});
exports.default = mongoose_1.default.model("Mechanics", exports.mechanicsModel);
//# sourceMappingURL=mechanics.model.js.map