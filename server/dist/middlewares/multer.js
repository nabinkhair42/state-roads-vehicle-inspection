"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMultipleFile = exports.parseFile = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const parseFile = (fieldName) => {
    return (0, multer_1.default)({ storage: storage }).single(fieldName);
};
exports.parseFile = parseFile;
const parseMultipleFile = (fieldName) => {
    return (0, multer_1.default)({ storage: storage }).array(fieldName);
};
exports.parseMultipleFile = parseMultipleFile;
//# sourceMappingURL=multer.js.map