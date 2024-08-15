"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workshop_1 = require("@/controllers/workshop");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", workshop_1.handleGetAllWorkshops);
exports.default = router;
//# sourceMappingURL=workshop.js.map