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
    },
    vehicleImage: {
      type: String,
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
    },
    vehicleModel: {
      type: String,
    },
    vehicleStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
