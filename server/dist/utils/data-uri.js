"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("datauri/parser"));
const path_1 = __importDefault(require("path"));
const getDataUri = (file) => {
    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file object. Expected properties: originalname, buffer.");
    }
    const parser = new parser_1.default();
    const extName = path_1.default.extname(file.originalname);
    if (!extName) {
        throw new Error("Invalid file extension.");
    }
    // `parser.format` returns an object. Access `.content` for the Data URI.
    const result = parser.format(extName, file.buffer);
    if (!result || !result.content) {
        throw new Error("Failed to generate Data URI.");
    }
    return {
        fileName: file.originalname,
        content: result.content,
    };
};
exports.default = getDataUri;
//# sourceMappingURL=data-uri.js.map