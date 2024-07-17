import mongoose from "mongoose";

export const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
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
