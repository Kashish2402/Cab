import { Ride } from "../models/ride.model";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

const createRide = asyncHandler(async (req, res, next) => {
  const { pickupLocation, dropLocation, rideTime, rideDate } = req.body;

  if (!req.user?._id)
    return next(new ApiError(400, "User should logged in !!!"));

  if (!pickupLocation || !dropLocation)
    throw next(new ApiError(400, "Pickup and Drop location is required"));

  const ride = await Ride.create({
    userId: req.user?._id,
    pickupLocation,
    dropLocation,
    rideTime: rideTime ? rideTime : Date.now,
    rideDate: rideDate ? rideDate : Date.now,
  });

  const leader = await User.findOne({
    role: "leader",
    status: "active",
    _id: { $ne: req.user?.id },
  }).select("_id");

  if (!leader)
    return next(new ApiError(400, "No leader available for this ride"));

  ride.leaderId = leader?._id;

  await ride.save();

  const rideDetails = await Ride.aggregate([
    {
      $match: { _id: ride._id },
    },
    {
      $lookup: {
        from: "users",
        localField: "leaderId",
        foreignField: "_id",
        as: "ride_Details",
      },
      $unwind: "$ride_Details",
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "ride_Details.vehicleId",
        foreignField: "_id",
        as: "ride_Details_vehicle",
      },
      $unwind: "$ride_Details_vehicle",
    },
    {
      $project: {
        "ride_Details_vehicle.password": 0,
        "ride_Details_vehicle.refreshToken": 0,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, rideDetails[0], "Ride created Successfully..."));
});

const getAllRides = asyncHandler(async (req, res, next) => {
  const rides = await Ride.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "leaderId",
        foreignField: "_id",
        as: "ride_Details",
      },
      $unwind: "$ride_Details",
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "ride_Details.vehicleId",
        foreignField: "_id",
        as: "ride_Details_vehicle",
      },
      $unwind: "$ride_Details_vehicle",
    },
    {
      $project: {
        "ride_Details_vehicle.password": 0,
        "ride_Details_vehicle.refreshToken": 0,
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, rides, "Rides fetched Successfully..."));
});

const getUserRides = asyncHandler(async (req, res, next) => {
  const rides = await Ride.aggregate([
    {
      $match: {
        userId: req.user._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "leaderId",
        foreignField: "_id",
        as: "ride_Details",
      },
      $unwind: "$ride_Details",
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "ride_Details.vehicleId",
        foreignField: "_id",
        as: "ride_Details_vehicle",
      },
      $unwind: "$ride_Details_vehicle",
    },
    {
      $project: {
        "ride_Details_vehicle.password": 0,
        "ride_Details_vehicle.refreshToken": 0,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, rides, "User Rides fetched Successfully..."));
});

const getLeaderRides = asyncHandler(async (req, res, next) => {
  const { leaderId } = req.params;
  const rides = await Ride.aggregate([
    {
      $match: {
        leaderId: leaderId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "leaderId",
        foreignField: "_id",
        as: "ride_Details",
      },
      $unwind: "$ride_Details",
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "ride_Details.vehicleId",
        foreignField: "_id",
        as: "ride_Details_vehicle",
      },
      $unwind: "$ride_Details_vehicle",
    },
    {
      $project: {
        "ride_Details_vehicle.password": 0,
        "ride_Details_vehicle.refreshToken": 0,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, rides, "User Rides fetched Successfully..."));
});

const updateRideStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!isValidObjectId(id)) return next(new ApiError(400, "Ride not found"));

  const ride = await Ride.findByIdAndUpdate(id, { status }, { new: true });
  if (!ride) return next(new ApiError(404, "Ride not found"));
  return res
    .status(200)
    .json(new ApiResponse(200, ride, "Ride status updated Successfully..."));
});

const cancelRide = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;

  if (!isValidObjectId(id)) return next(ApiError(400, "Ride doesn't exists!!"));

  if (!reason) return next(new ApiError(400, "Cancellation reason is required"));

  const ride = await Ride.findById(id);
  if (!ride) return next(ApiError(404, "Ride doesn't exists!!"));

  if (ride.userId.toString() !== req.user?._id.toString())
    return next(new ApiError(403, "You don't have access to this ride!!!"));

  ride.status = "cancelled";
  ride.cancellationReason = reason;
  await ride.save();
  return res
    .status(200)
    .json(new ApiResponse(200, ride, "Ride cancelled Successfully..."));
});

export {
  createRide,
  getAllRides,
  getUserRides,
  getLeaderRides,
  updateRideStatus,
  cancelRide
};
