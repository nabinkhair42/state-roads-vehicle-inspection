import mongoose from "mongoose";
import FileModel from "./file.model";

export const serviceModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: FileModel,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanics",
    },
    features: {
      type: [String],
      required: false,
    },
    serviceType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "services",
  }
);

export default mongoose.model("Service", serviceModel);
