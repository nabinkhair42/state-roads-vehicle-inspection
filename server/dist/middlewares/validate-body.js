"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const send_response_1 = require("./send-response");
const zod_validation_error_1 = require("zod-validation-error");
const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            let parsed = schema.parse(req.body);
            req.body = parsed;
            next();
        }
        catch (e) {
            const message = (0, zod_validation_error_1.fromError)(e).toString();
            return (0, send_response_1.sendRes)(res, {
                status: 400,
                message,
                error: e.errors,
                forceError: true,
            });
        }
    };
};
exports.validateBody = validateBody;
//# sourceMappingURL=validate-body.js.map