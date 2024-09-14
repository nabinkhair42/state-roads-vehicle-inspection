import { sendRes } from "@/middlewares/send-response";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateOTP } from "@/utils/generate-otp";
import ENV_CONFIG from "@/config/env.config";
import mechanicsModel from "@/models/mechanics.model";
import { IMechanicsLoginSchema, IMechanicsSignupSchema } from "@/zod";
import appointmentModel from "@/models/appointment.model";
import serviceModel from "@/models/service.model";
import { createToken } from "@/utils/token-manager";

export const handleMechanicsSignup = async (
  req: Request<{}, {}, IMechanicsSignupSchema>,
  res: Response
) => {
  const body = req.body;
  const mechanics = await mechanicsModel.findOne({ email: body.email });
  if (mechanics) {
    return sendRes(res, {
      status: 400,
      message: "Account already exists with this email, Please login!",
    });
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newMechanics = new mechanicsModel({
    ...body,
    password: hashedPassword,
  });

  await newMechanics.save();

  const token = createToken(
    {
      userId: newMechanics._id.toString(),
      role: "MECHANIC",
    },
    "7d"
  );
  return sendRes(res, {
    status: 201,
    message: `Welcome ${newMechanics.name}, your account is created successfully!`,
    data: {
      token: {
        key: ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID,
        value: token,
      },
    },
  });
};

export const handleMechanicsLogin = async (
  req: Request<{}, {}, IMechanicsLoginSchema>,
  res: Response
) => {
  const body = req.body;
  const mechanics = await mechanicsModel.findOne({ email: body.email });
  if (!mechanics) {
    return sendRes(res, {
      status: 404,
      message: "Account not found, Please create an account!",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    body.password,
    mechanics.password
  );
  if (!isPasswordValid) {
    return sendRes(res, {
      status: 400,
      message: "Invalid credentials, Please try again!",
    });
  }

  const token = createToken(
    {
      userId: mechanics._id.toString(),
      role: "MECHANIC",
    },
    "7d"
  );

  return sendRes(res, {
    status: 200,
    message: `Welcome back ${mechanics.name}!`,
    data: {
      token: {
        key: ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID,
        value: token,
      },
    },
  });
};

export const handleGetMechanicsProfile = async (
  req: Request,
  res: Response
) => {
  const mechanics = res.locals.jwtData.userId;
  const mechanicsDoc = await mechanicsModel
    .findById(mechanics)
    .select("-password");
  if (!mechanicsDoc) {
    return sendRes(res, {
      status: 404,
      message: "Mechanics not found!",
    });
  }
  return sendRes(res, {
    status: 200,
    data: mechanicsDoc,
  });
};
