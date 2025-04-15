import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    leaderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rideName: {
      type: String,
      required: true,
    },
    rideDate: {
      type: Date,
      required: true,
    },
    rideTime: {
      type: Date,
      default: Date.now,
    },
    dropOffTime: {
      type: Date,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    dropLocation: {
      type: String,
      required: true,
    },
    rideStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected", "fullfiled", "cancelled"],
      default: "pending",
    },
    cancellationReason: {
      type: String,
      default: null,
    },
    rideType: {
      type: String,
      enum: ["one way", "round trip"],
      default: "one way",
    },
    rideCapacity: {
      type: Number,
      default: 3,
      min: 1,
    },
    rideCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Ride = mongoose.model("Ride", rideSchema);
