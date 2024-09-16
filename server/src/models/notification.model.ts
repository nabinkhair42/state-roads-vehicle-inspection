import mongoose from "mongoose";

export const notificationModel = new mongoose.Schema(
  {
    for: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    role: {
      type: String,
      enum: ["Mechanics", "User"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isViewed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "notifications",
    expires: 604800, // 7 days
  }
);

export default mongoose.model("Notification", notificationModel);
