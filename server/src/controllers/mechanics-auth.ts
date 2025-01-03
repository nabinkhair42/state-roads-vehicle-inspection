import { sendRes } from "@/middlewares/send-response";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import ENV_CONFIG from "@/config/env.config";
import mechanicsModel from "@/models/mechanics.model";
import { IMechanicsLoginSchema, IMechanicsSignupSchema } from "@/zod";
import OTPModel from "@/models/otp.model";
import { generateOTP, validateOTP } from "@/utils/generate-otp";
import { createToken } from "@/utils/token-manager";
import { sendHTMLMail } from "@/utils/send-html-mail";
import { OPT_EXPIRATION_IN_SEC } from "@/constants/time.const";

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

  // /generate otp
  const otp = generateOTP();
  await OTPModel.create({
    userId: newMechanics._id,
    role: "MECHANIC",
    otp: otp,
    purpose: "ACCOUNT_VERIFICATION",
  });

  // don t await this
  sendHTMLMail({
    email: newMechanics.email,
    template: "signup",
    variables: {
      NAME: newMechanics.name,
      OTP: otp,
      OTP_EXPIRATION: String(OPT_EXPIRATION_IN_SEC / 60),
      SUPPORT_EMAIL: ENV_CONFIG.SUPPORT_EMAIL,
    },
  });

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
    otp: otp,
    purpose: "ACCOUNT_VERIFICATION",
  });

  sendHTMLMail({
    email: userDoc.email,
    template: "resend-signup-otp",
    variables: {
      NAME: userDoc.name,
      OTP: otp,
      OTP_EXPIRATION: String(OPT_EXPIRATION_IN_SEC / 60),
      SUPPORT_EMAIL: ENV_CONFIG.SUPPORT_EMAIL,
    },
  });

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
    otp: otp,
    purpose: "RESET_PASSWORD",
  });

  sendHTMLMail({
    email: user.email,
    template: "reset-password-otp",
    variables: {
      NAME: user.name,
      OTP: otp,
      OTP_EXPIRATION: String(OPT_EXPIRATION_IN_SEC / 60),
      SUPPORT_EMAIL: ENV_CONFIG.SUPPORT_EMAIL,
    },
  });

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
