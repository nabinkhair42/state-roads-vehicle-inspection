import { OPT_EXPIRATION_IN_SEC } from "@/constants/time.const";
import mongoose from "mongoose";

const otpModel = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    role: {
      type: String,
      required: true,
      enum: ["MECHANIC", "USER"],
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
      enum: ["ACCOUNT_VERIFICATION", "RESET_PASSWORD"],
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + OPT_EXPIRATION_IN_SEC * 1000),
      expires: OPT_EXPIRATION_IN_SEC, // TTL in seconds
    },
  },
  {
    timestamps: true,
  }
);

export const OTPModel = mongoose.model("OTP", otpModel);
export default OTPModel;
