"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = exports.uploadFile = void 0;
const imagekit_config_1 = __importDefault(require("@/config/imagekit.config"));
/**
 * Uploads an image file to ImageKit.
 * @param file - The image file to upload.
 * @param folder - The folder in which to upload the image.
 * @returns A promise that resolves to the upload result or rejects with an error message.
 */
const uploadFile = async (bytes, filename, folder) => {
    return new Promise(async (resolve, reject) => {
        imagekit_config_1.default.upload({
            file: bytes,
            fileName: filename,
            folder: folder,
        }, async (err, result) => {
            if (err) {
                return reject(err.message);
            }
            else {
                return resolve(result);
            }
        });
    });
};
exports.uploadFile = uploadFile;
const deleteFiles = async (fileId) => {
    if (fileId instanceof Array) {
        return Promise.all(fileId.map(async (id) => {
            return new Promise(async (resolve, reject) => {
                imagekit_config_1.default.deleteFile(id, async (err, result) => {
                    if (err) {
                        return reject(err.message);
                    }
                    else {
                        return resolve(result);
                    }
                });
            });
        }));
    }
    else {
        return new Promise(async (resolve, reject) => {
            imagekit_config_1.default.deleteFile(fileId, async (err, result) => {
                if (err) {
                    return reject(err.message);
                }
                else {
                    return resolve(result);
                }
            });
        });
    }
};
exports.deleteFiles = deleteFiles;
//# sourceMappingURL=upload-file.js.map