import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ["4-wheeler", "2-wheeler"],
      default: "4-wheeler",
      required: true,
    },
    licenceNumber: {
      type: String,
      required: true,
    },
    vehicleOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const VEHICLE = mongoose.model("VEHICLE", vehicleSchema);
