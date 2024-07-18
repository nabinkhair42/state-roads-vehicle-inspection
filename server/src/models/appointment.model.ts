import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
    collection: "appointments",
  }
);

export default mongoose.model("Appointment", appointmentModel);
