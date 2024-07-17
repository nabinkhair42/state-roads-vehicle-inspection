import LENGTH from "@/constants/length.const";
import mongoose from "mongoose";

export const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: LENGTH.NAME.min,
      maxLength: LENGTH.NAME.max,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // isVerified: { // In later chapters, we might implement email verification
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export default mongoose.model("User", userModel);
