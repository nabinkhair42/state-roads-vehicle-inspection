"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("module-alias/register");
const env_config_1 = __importDefault(require("./config/env.config"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
exports.app = app;
//middlewares
app.use((0, cookie_parser_1.default)(env_config_1.default.COOKIE_SECRET));
app.use(body_parser_1.default.urlencoded({ limit: env_config_1.default.MAX_REQUEST_SIZE, extended: true }));
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express_1.default.json());
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
//routes
app.get("/", (_, res) => {
    res.send({
        message: "Welcome to the API",
    });
});
app.use("/api/v1", routes_1.default);
//# sourceMappingURL=app.js.map