import { sendRes } from "@/middlewares/send-response";
import serviceModel from "@/models/service.model";
import { Request, Response } from "express";

export const handleCreateService = async (req: Request, res: Response) => {
  const postedBy = res.locals.jwtData.userId;
  const thumbnail = res.locals.file;

  const service = new serviceModel({
    ...req.body,
    thumbnail,
    postedBy,
  });

  await service.save();

  return sendRes(res, {
    status: 201,
    message: "Service created successfully!",
    data: service,
  });
};

export const handleDeleteServiceById = async (req: Request, res: Response) => {
  const userId = res.locals.jwtData.userId;
  const service = await serviceModel.findById(req.params.id);

  if (!service) {
    return sendRes(res, {
      status: 404,
      message: "Service not found!",
    });
  }

  if (service.postedBy.toString() !== userId) {
    return sendRes(res, {
      status: 401,
      message: "Sorry, you are not authorized to delete this service!",
    });
  }

  await service.deleteOne();

  return sendRes(res, {
    status: 200,
    message: "Service deleted successfully!",
  });
};

export const handleGetAllServices = async (req: Request, res: Response) => {
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
  const services = await serviceModel
    .find()
    .sort({ createdAt: -1 })
    .populate("postedBy")
    .where(queryObj);

  return sendRes(res, {
    status: 200,
    data: services,
  });
};

export const handleGetServiceById = async (req: Request, res: Response) => {
  const service = await serviceModel
    .findById(req.params.id)
    .populate("postedBy");

  if (!service) {
    return sendRes(res, {
      status: 404,
      message: "Service not found!",
    });
  }

  return sendRes(res, {
    status: 200,
    data: service,
  });
};

export const handleGetServiceByMechanicId = async (
  req: Request,
  res: Response
) => {
  const services = await serviceModel
    .find({ postedBy: req.params.id })
    .sort({ createdAt: -1 })
    .populate("postedBy");

  return sendRes(res, {
    status: 200,
    data: services,
  });
};
