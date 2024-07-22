import mongoose from "mongoose";

export const mechanicsModel = new mongoose.Schema(
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
    storeName: {
      type: String,
      required: true,
    },
    storeCoordinates: {
      latitude: {
        type: String,
        required: true,
      },
      longitude: {
        type: String,
        required: true,
      },
    },
    storeAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "mechanics",
  }
);

export default mongoose.model("Mechanics", mechanicsModel);
