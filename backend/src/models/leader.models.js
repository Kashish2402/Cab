import mongoose, { Schema } from "mongoose";

const leaderSchema = new Schema(
  {
    leaderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Leader = mongoose.model("Leader", leaderSchema);
