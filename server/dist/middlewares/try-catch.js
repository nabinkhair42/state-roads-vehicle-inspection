"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
const dev_log_1 = require("@/utils/dev-log");
const send_response_1 = require("./send-response");
const tryCatch = (fn) => {
    return async (req, res) => {
        try {
            const result = await fn(req, res);
            return result;
        }
        catch (error) {
            (0, dev_log_1.devLog)(error);
            return (0, send_response_1.sendRes)(res, {
                status: 500,
                message: error.message ?? "Something went wrong!",
                error: error,
            });
        }
    };
};
exports.tryCatch = tryCatch;
//# sourceMappingURL=try-catch.js.map