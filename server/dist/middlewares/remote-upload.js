"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteUploadFile = void 0;
const data_uri_1 = __importDefault(require("@/utils/data-uri"));
const upload_file_1 = require("@/utils/upload-file");
const send_response_1 = require("./send-response");
const remoteUploadFile = (folder) => {
    return async (req, res, next) => {
        const file = req.file;
        if (!file) {
            return (0, send_response_1.sendRes)(res, {
                status: 400,
                message: "Please provide a file to upload!",
            });
        }
        const fileUri = (0, data_uri_1.default)(file);
        (0, upload_file_1.uploadFile)(fileUri.content, fileUri.fileName, folder)
            .then((result) => {
            res.locals.file = result;
            next();
        })
            .catch((error) => {
            return (0, send_response_1.sendRes)(res, {
                status: 500,
                message: error.message ?? "Something went wrong!",
                error: error,
            });
        });
    };
};
exports.remoteUploadFile = remoteUploadFile;
//# sourceMappingURL=remote-upload.js.map