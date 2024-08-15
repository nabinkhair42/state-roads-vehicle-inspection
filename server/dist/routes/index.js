"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const mechanics_auth_1 = __importDefault(require("./mechanics-auth"));
const service_1 = __importDefault(require("./service"));
const notification_1 = __importDefault(require("./notification"));
const appointment_1 = __importDefault(require("./appointment"));
const stats_1 = __importDefault(require("./stats"));
const workshop_1 = __importDefault(require("./workshop"));
const appRouter = (0, express_1.Router)();
appRouter.use("/auth", auth_1.default);
appRouter.use("/mechanics/auth", mechanics_auth_1.default);
appRouter.use("/services", service_1.default);
appRouter.use("/notifications", notification_1.default);
appRouter.use("/appointments", appointment_1.default);
appRouter.use("/stats", stats_1.default);
appRouter.use("/workshops", workshop_1.default);
exports.default = appRouter;
//# sourceMappingURL=index.js.map