import { sendRes } from "@/middlewares/send-response";
import userModel from "@/models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateOTP, validateOTP } from "@/utils/generate-otp";
import { clearCookies, registerCookies } from "@/utils/cookies";
import ENV_CONFIG from "@/config/env.config";
import { ILoginSchema, ISignupSchema } from "@/zod";
import OTPModel from "@/models/otp.model";
import { otpMailer } from "@/mailers/otp-mailer";
import { sendWelcomeMailToUser } from "@/mailers/welcome-user";

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

  // /generate otp
  const otp = generateOTP();
  await OTPModel.create({
    userId: newUser._id,
    role: "USER",
    otp: parseInt(otp),
    purpose: "ACCOUNT_VERIFICATION",
  });

  // don t await this
  sendWelcomeMailToUser(otp, newUser.email, newUser.name);

  registerCookies(res, newUser._id.toString(), ENV_CONFIG.AUTH_TOKEN_ID);
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

  registerCookies(res, user._id.toString(), ENV_CONFIG.AUTH_TOKEN_ID);
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
  clearCookies(res, ENV_CONFIG.AUTH_TOKEN_ID);
  return sendRes(res, {
    status: 200,
    message: "Logged out successfully!",
  });
};

export const handleVerifyOTPForSignup = async (req: Request, res: Response) => {
  const { otp: userOtp } = req.body;

  if (!userOtp) {
    return sendRes(res, {
      status: 422,
      message: "Please provide OTP!",
    });
  }

  const user = res.locals.jwtData.userId;

  const otpRecord = await OTPModel.findOne({
    userId: user,
    purpose: "ACCOUNT_VERIFICATION",
    role: "USER",
  });

  if (!otpRecord) {
    return sendRes(res, {
      status: 400,
      message: "OTP is expired, Please request a new one!",
    });
  }

  const { isValid, reason } = validateOTP({
    existingOTP: otpRecord.otp,
    expiresAt: otpRecord.expiresAt,
    otp: userOtp,
  });

  if (!isValid) {
    const errorMessage =
      reason === "EXPIRED"
        ? "OTP is expired, Please request a new one!"
        : "Invalid OTP, Please try again";
    return sendRes(res, {
      status: 400,
      message: errorMessage,
    });
  }

  await otpRecord.deleteOne();
  await userModel.findByIdAndUpdate(user, { isVerified: true });

  return sendRes(res, {
    status: 200,
    message: "You account is verified!",
  });
};

export const handleResendOTPForSignup = async (req: Request, res: Response) => {
  const user = res.locals.jwtData.userId;

  const userDoc = await userModel.findById(user);
  if (!userDoc) {
    return sendRes(res, {
      status: 404,
      message: "User not found!",
    });
  }

  if (userDoc.isVerified) {
    return sendRes(res, {
      status: 400,
      message: "Your account is already verified!",
    });
  }

  // this is because we want to delete the previous otp
  await OTPModel.findOneAndDelete({
    userId: user,
    purpose: "ACCOUNT_VERIFICATION",
    role: "USER",
  });

  const otp = generateOTP();

  await OTPModel.create({
    userId: user,
    role: "USER",
    otp: parseInt(otp),
    purpose: "ACCOUNT_VERIFICATION",
  });

  otpMailer(otp, userDoc.email);

  return sendRes(res, {
    status: 200,
    message: "OTP sent to your email!",
  });
};

export const handleResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return sendRes(res, {
      status: 404,
      message: "User not found!",
    });
  }

  await OTPModel.findOneAndDelete({
    userId: user._id,
    purpose: "RESET_PASSWORD",
    role: "USER",
  });

  const otp = generateOTP();

  await OTPModel.create({
    userId: user._id,
    role: "USER",
    otp: parseInt(otp),
    purpose: "RESET_PASSWORD",
  });

  otpMailer(otp, user.email);

  return sendRes(res, {
    status: 200,
    message: "OTP sent to your email!",
  });
};

export const handleVerifyOTPForResetPassword = async (
  req: Request,
  res: Response
) => {
  const { otp: userOtp, email, newPassword } = req.body;

  if (!userOtp) {
    return sendRes(res, {
      status: 422,
      message: "Please provide OTP!",
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return sendRes(res, {
      status: 404,
      message: "User not found!",
    });
  }

  const otpRecord = await OTPModel.findOne({
    userId: user._id,
    purpose: "RESET_PASSWORD",
    role: "USER",
  });

  if (!otpRecord) {
    return sendRes(res, {
      status: 400,
      message: "OTP is expired, Please request a new one!",
    });
  }
  console.log(otpRecord.otp, userOtp);

  const { isValid, reason } = validateOTP({
    existingOTP: otpRecord.otp,
    expiresAt: otpRecord.expiresAt,
    otp: userOtp,
  });

  if (!isValid) {
    const errorMessage =
      reason === "EXPIRED"
        ? "OTP is expired, Please request a new one!"
        : "Invalid OTP, Please try again";
    return sendRes(res, {
      status: 400,
      message: errorMessage,
    });
  }

  await otpRecord.deleteOne();

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await userModel.findByIdAndUpdate(user, { password: hashedPassword });

  return sendRes(res, {
    status: 200,
    message: "You password is updated, you can login now!",
  });
};

export const handleChangePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    return sendRes(res, {
      status: 400,
      message: "Old password and new password can't be same!",
    });
  }

  const user = res.locals.jwtData.userId;
  const userDoc = await userModel.findById(user);
  if (!userDoc) {
    return sendRes(res, {
      status: 404,
      message: "User not found!",
    });
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, userDoc.password);

  if (!isPasswordValid) {
    return sendRes(res, {
      status: 400,
      message: "Invalid old password!",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await userModel.findByIdAndUpdate(user, { password: hashedPassword });

  return sendRes(res, {
    status: 200,
    message: "You password is updated!",
  });
};
