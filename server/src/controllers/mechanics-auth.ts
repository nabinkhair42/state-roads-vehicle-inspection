import { sendRes } from "@/middlewares/send-response";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { clearCookies, registerCookies } from "@/utils/cookies";
import ENV_CONFIG from "@/config/env.config";
import mechanicsModel from "@/models/mechanics.model";
import { IMechanicsLoginSchema, IMechanicsSignupSchema } from "@/zod";
import OTPModel from "@/models/otp.model";
import { generateOTP, validateOTP } from "@/utils/generate-otp";
import { otpMailer } from "@/mailers/otp-mailer";

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

  registerCookies(
    res,
    newMechanics._id.toString(),
    ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID
  );
  return sendRes(res, {
    status: 201,
    message: `Welcome ${newMechanics.name}, your account is created successfully!`,
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

  registerCookies(
    res,
    mechanics._id.toString(),
    ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID
  );
  return sendRes(res, {
    status: 200,
    message: `Welcome back ${mechanics.name}!`,
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

export const handleMechanicsLogout = async (req: Request, res: Response) => {
  clearCookies(res, ENV_CONFIG.MECHANICS_AUTH_TOKEN_ID);
  return sendRes(res, {
    status: 200,
    message: "Logged out successfully!",
  });
};

export const handleVerifyOTPForMechanicsSignup = async (
  req: Request,
  res: Response
) => {
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
    role: "MECHANIC",
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
  await mechanicsModel.findByIdAndUpdate(user, { isVerified: true });

  return sendRes(res, {
    status: 200,
    message: "You account is verified!",
  });
};

export const handleResendOTPForMechanicsSignup = async (
  req: Request,
  res: Response
) => {
  const user = res.locals.jwtData.userId;

  const userDoc = await mechanicsModel.findById(user);
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
    role: "MECHANIC",
  });

  const otp = generateOTP();

  await OTPModel.create({
    userId: user,
    role: "MECHANIC",
    otp: parseInt(otp),
    purpose: "ACCOUNT_VERIFICATION",
  });

  otpMailer(otp, userDoc.email);

  return sendRes(res, {
    status: 200,
    message: "OTP sent to your email!",
  });
};

export const handleResetMechanicsPassword = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  const user = await mechanicsModel.findOne({ email });
  if (!user) {
    return sendRes(res, {
      status: 404,
      message: "User not found!",
    });
  }

  await OTPModel.findOneAndDelete({
    userId: user._id,
    purpose: "RESET_PASSWORD",
    role: "MECHANIC",
  });

  const otp = generateOTP();

  await OTPModel.create({
    userId: user._id,
    role: "MECHANIC",
    otp: parseInt(otp),
    purpose: "RESET_PASSWORD",
  });

  otpMailer(otp, user.email);

  return sendRes(res, {
    status: 200,
    message: "OTP sent to your email!",
  });
};

export const handleVerifyOTPForMechanicsResetPassword = async (
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

  const user = await mechanicsModel.findOne({ email });

  if (!user) {
    return sendRes(res, {
      status: 404,
      message: "User not found!",
    });
  }

  const otpRecord = await OTPModel.findOne({
    userId: user._id,
    purpose: "RESET_PASSWORD",
    role: "MECHANIC",
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

  await mechanicsModel.findByIdAndUpdate(user, { password: hashedPassword });

  return sendRes(res, {
    status: 200,
    message: "You password is updated, you can login now!",
  });
};

export const handleChangeMechanicsPassword = async (
  req: Request,
  res: Response
) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    return sendRes(res, {
      status: 400,
      message: "Old password and new password can't be same!",
    });
  }

  const user = res.locals.jwtData.userId;
  const userDoc = await mechanicsModel.findById(user);
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

  await mechanicsModel.findByIdAndUpdate(user, { password: hashedPassword });

  return sendRes(res, {
    status: 200,
    message: "You password is updated!",
  });
};
