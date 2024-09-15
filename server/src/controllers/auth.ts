import { sendRes } from "@/middlewares/send-response";
import userModel from "@/models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateOTP } from "@/utils/generate-otp";
import ENV_CONFIG from "@/config/env.config";
import { ILoginSchema, ISignupSchema } from "@/zod";
import { createToken } from "@/utils/token-manager";

export const handleUserSignup = async (
  req: Request<{}, {}, ISignupSchema>,
  res: Response
) => {
  const body = req.body;
  const user = await userModel.findOne({ email: body.email });
  if (user) {
    return sendRes(res, {
      status: 400,
      message: "User already exists with this email, Please login!",
    });
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = new userModel({
    ...body,
    password: hashedPassword,
  });

  await newUser.save();
  const token = createToken(
    {
      userId: newUser._id.toString(),
      role: "USER",
    },
    "7d"
  );
  return sendRes(res, {
    status: 201,
    message: `Welcome ${newUser.name}, your account is created successfully!`,
    data: {
      token: {
        key: ENV_CONFIG.AUTH_TOKEN_ID,
        value: token,
      },
    },
  });
};

export const handleUserLogin = async (
  req: Request<{}, {}, ILoginSchema>,
  res: Response
) => {
  const body = req.body;
  const user = await userModel.findOne({ email: body.email });
  if (!user) {
    return sendRes(res, {
      status: 404,
      message: "User not found, Please create an account!",
    });
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    return sendRes(res, {
      status: 400,
      message: "Invalid credentials, Please try again!",
    });
  }

  const token = createToken(
    {
      userId: user._id.toString(),
      role: "USER",
    },
    "7d"
  );

  return sendRes(res, {
    status: 200,
    message: `Welcome back ${user.name}!`,
    data: {
      token: {
        key: ENV_CONFIG.AUTH_TOKEN_ID,
        value: token,
      },
    },
  });
};

export const handleGetUserProfile = async (req: Request, res: Response) => {
  const user = res.locals.jwtData.userId;
  const userDoc = await userModel.findById(user).select("-password");
  if (!userDoc) {
    return sendRes(res, {
      status: 404,
      message: "User not found!",
    });
  }
  return sendRes(res, {
    status: 200,
    data: userDoc,
  });
};
