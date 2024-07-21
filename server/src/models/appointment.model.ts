import mongoose from "mongoose";
import FileModel from "./file.model";

export const appointmentModel = new mongoose.Schema(
  {
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookedFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanics",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    appointmentDate: {
      type: Date, // Date and Time
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "COMPLETED"],
      default: "PENDING",
    },
    report: FileModel,
  },
  {
    timestamps: true,
    collection: "appointments",
  }
);

export default mongoose.model("Appointment", appointmentModel);
