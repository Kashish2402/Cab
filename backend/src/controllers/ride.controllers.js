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
    rideTime: rideTime ? rideTime : Date.now(),
    rideDate: rideDate ? rideDate : Date.now(),
    status: "pending",
  });

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
      $project: {
        "ride_Details.password": 0,
        "ride_Details.refreshToken": 0,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, rideDetails[0], "Ride created Successfully..."));
});

const acceptRide = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return next(new ApiError(200, "Invalid ride id"));

  const ride = await Ride.findById(id);
  if (!ride) return next(new ApiError(200, "Ride not found"));
  if (ride.status === "pending") {
    ride.status = "accepted";
    ride.leaderId = req.user?._id;
  }
  await ride.save();
  return res
    .status(200)
    .json(new ApiResponse(200, ride, "Ride accepted successfully..."));
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

  if (!reason)
    return next(new ApiError(400, "Cancellation reason is required"));

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

const rideCompleted=asyncHandler(async(req,res,next)=>{
  const{id}=req.params;

  if(!isValidObjectId(id))return next(new ApiError(400,"Invalid RideId"))

    const ride=await Ride.findById(id);

    if (!ride) return next(new ApiError(404, "Ride not found"));

    if (ride.status === "fulfilled") {
      return next(new ApiError(400, "Ride is already completed"));
    }

    ride.status="fulfilled"
    await ride.save();
    return res
    .status(200)
    .json(new ApiResponse(200,ride,"Ride completed Successfully..."));
})

const getRideDetails=asyncHandler(async(req,res,next)=>{
  const{id}=req.params;

  if(!isValidObjectId(id))return next( new ApiError(400,"Invalid RideID !!!"))

  const ride=await Ride.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
        },

    },
    {
      $lookup:{
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind:"$user"
    },{
      $project:{
        "user.password":0,
        "user.refreshToken":0
    }},
    {
      $lookup:{
        from:"users",
        localField:"leaderId",
        foreignField:"_id",
        as:"leader"
      }
    },
    {
      $unwind: "$leader",
      preserveNullAndEmptyArrays: true,
    },
    {
      $project:{
        "leader.password":0,
        "leader.refreshToken":0
        }
    },
    {
      $lookup:{
        from:"vehicles",
        localField:"leader.vehicleId",
        foreignField:"_id",
        as:"vehicle"
      }
    },
    {
      $unwind: "$vehicle"
    }
  ])

  if (!ride || ride.length === 0) return next(new ApiError(404, "Ride not found"));

  return res.status(200).json(new ApiResponse(200, ride[0], "Ride details fetched successfully..."));
})
export {
  createRide,
  acceptRide,
  getAllRides,
  rideCompleted,
  getUserRides,
  getLeaderRides,
  updateRideStatus,
  cancelRide,
};
