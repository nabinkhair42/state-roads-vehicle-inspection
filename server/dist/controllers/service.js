"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetServiceByMechanicId = exports.handleGetServiceById = exports.handleGetAllServices = exports.handleDeleteServiceById = exports.handleCreateService = void 0;
const send_response_1 = require("@/middlewares/send-response");
const service_model_1 = __importDefault(require("@/models/service.model"));
const handleCreateService = async (req, res) => {
    const postedBy = res.locals.jwtData.userId;
    const thumbnail = res.locals.file;
    const service = new service_model_1.default({
        ...req.body,
        thumbnail,
        postedBy,
    });
    await service.save();
    return (0, send_response_1.sendRes)(res, {
        status: 201,
        message: "Service created successfully!",
        data: service,
    });
};
exports.handleCreateService = handleCreateService;
const handleDeleteServiceById = async (req, res) => {
    const userId = res.locals.jwtData.userId;
    const service = await service_model_1.default.findById(req.params.id);
    if (!service) {
        return (0, send_response_1.sendRes)(res, {
            status: 404,
            message: "Service not found!",
        });
    }
    if (service.postedBy.toString() !== userId) {
        return (0, send_response_1.sendRes)(res, {
            status: 401,
            message: "Sorry, you are not authorized to delete this service!",
        });
    }
    await service.deleteOne();
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        message: "Service deleted successfully!",
    });
};
exports.handleDeleteServiceById = handleDeleteServiceById;
const handleGetAllServices = async (req, res) => {
    const { query } = req.query;
    let queryObj = {};
    // if query is present, search for the query as serviceType
    if (query) {
        queryObj = {
            serviceType: {
                $regex: query,
                $options: "i", // case-insensitive
            },
        };
    }
    const services = await service_model_1.default
        .find()
        .sort({ createdAt: -1 })
        .populate("postedBy")
        .where(queryObj);
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        data: services,
    });
};
exports.handleGetAllServices = handleGetAllServices;
const handleGetServiceById = async (req, res) => {
    const service = await service_model_1.default
        .findById(req.params.id)
        .populate("postedBy");
    if (!service) {
        return (0, send_response_1.sendRes)(res, {
            status: 404,
            message: "Service not found!",
        });
    }
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        data: service,
    });
};
exports.handleGetServiceById = handleGetServiceById;
const handleGetServiceByMechanicId = async (req, res) => {
    const services = await service_model_1.default
        .find({ postedBy: req.params.id })
        .sort({ createdAt: -1 })
        .populate("postedBy");
    return (0, send_response_1.sendRes)(res, {
        status: 200,
        data: services,
    });
};
exports.handleGetServiceByMechanicId = handleGetServiceByMechanicId;
//# sourceMappingURL=service.js.map