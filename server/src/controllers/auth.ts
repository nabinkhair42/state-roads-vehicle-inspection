import { sendRes } from "@/middlewares/send-response";
import userModel from "@/models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateOTP } from "@/utils/generate-otp";
import { registerCookies } from "@/utils/cookies";
import ENV_CONFIG from "@/config/env.config";
import { ILoginSchema, ISignupSchema } from "@/zod";

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

  registerCookies(res, newUser._id.toString());
  return sendRes(res, {
    status: 201,
    message: `Welcome ${newUser.name}, your account is created successfully!`,
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

  registerCookies(res, user._id.toString());
  return sendRes(res, {
    status: 200,
    message: `Welcome back ${user.name}!`,
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

export const handleUserLogout = async (req: Request, res: Response) => {
  res.clearCookie(ENV_CONFIG.AUTH_TOKEN_ID);
  return sendRes(res, {
    status: 200,
    message: "Logged out successfully!",
  });
};
