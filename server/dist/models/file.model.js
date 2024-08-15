"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const fileModel = new mongoose_1.default.Schema({
    fileId: {
        type: String,
    },
    name: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
    },
});
exports.FileModel = mongoose_1.default.model("File", fileModel);
exports.default = fileModel;
//# sourceMappingURL=file.model.js.map