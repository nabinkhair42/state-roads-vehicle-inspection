"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_config_1 = __importDefault(require("@/config/env.config"));
const db_1 = require("./db");
const dev_log_1 = require("./utils/dev-log");
// app
(0, db_1.connectToDB)()
    .then(() => {
    console.log("Connected to DB");
    app_1.app.listen(env_config_1.default.PORT, () => {
        console.log(`Server is running on PORT :${env_config_1.default.PORT}`);
    });
})
    .catch((err) => {
    console.log("Server failed to start!");
    (0, dev_log_1.devLog)(err);
});
//# sourceMappingURL=index.js.map