import mongoose from "mongoose";
import { Leader } from "../models/leader.models.js";
import { User } from "../models/User.models.js";

const addLeader = asyncHandler(async (req, res, next) => {
  const { leaderId, vehicleId } = req.body;

  if (!isValidObjectId(leaderId) || !isValidObjectId(vehicleId)) {
    return next(new ApiError(400, "Invalid leaderId or vehicleId"));
  }

  if (!leaderId || !vehicleId)
    return next(new ApiError(404, "Leader id and vehicle id are required"));

  const leader = await Leader.findOne({ leaderId: leaderId });

  if (leader) return next(new ApiError(404, "Leader already exists!!!"));

  const newLeader = await Leader.create({
    leaderId,
    vehicleId,
    status: "active",
  });

  if (!newLeader) return next(new ApiError(404, "Failed to add leader!!!"));

  await User.findByIdAndUpdate(leaderId, { role: "leader" });

  res
    .status(200)
    .json(new ApiResponse(200, newLeader, "Leader created Successfully..."));
});

const toggleStatus = asyncHandler(async (req, res, next) => {
  const { leaderId } = req.body;
  if (!isValidObjectId(leaderId))
    return next(new ApiError(400, "Invalid leaderId"));

  const leader = await Leader.findById(leaderId);
  if (!leader) return next(new ApiError(404, "Leader not found!!!"));

  leader.status = leader.status === "active" ? "inactive" : "active";
  await leader.save();

  res
    .status(200)
    .json(new ApiResponse(200, leader, "Leader status toggled successfully"));
});

const deleteLeader = asyncHandler(async (req, res, next) => {
  const { leaderId } = req.body;
  if (!isValidObjectId(leaderId))
    return next(new ApiError(400, "Invalid leaderId"));
  const leader = await Leader.findByIdAndDelete(leaderId);
  if (!leader) return next(new ApiError(404, "Leader not found!!!"));
  res
    .status(200)
    .json(new ApiResponse(200, leader, "Leader deleted successfully"));
});

const getLeaderbyId = asyncHandler(async (req, res, next) => {
  const { lId } = req.params;
  if (!isValidObjectId(lId)) return next(new ApiError(400, "Invalid leaderId"));

  const leader = await Leader.aggregate([
    {
      $match: {
        leaderId: mongoose.Types.ObjectId(lId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "leaderId",
        foreignField: "_id",
        as: "leader_details",
      },
    },
    {
      $unwind: "$leader_details",
    },
    {
      $project: {
        "leader_details.password": 0,
        "leader_details.refreshToken": 0,
      },
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "vehicleId",
        foreignField: "_id",
        as: "vehicle_details",
      },
    },
    {
      $unwind: "$vehicle_details",
    },
  ]);

  if (!leader) return next(new ApiError(404, "Leader not found"));

  return res
    .status(200)
    .json(new ApiResponse(200, leader[0], "Leader details found"));
});

const getAllLeader = asyncHandler(async (req, res, next) => {
  let { page, pageSize } = req.query;

  page=parseInt(page,10)
  pageSize=parseInt(pageSize,10)

  const leader = await Leader.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "leaderId",
        foreignField: "_id",
        as: "leader_details",
      },
    },
    {
      $unwind: "$leader_details",
    },
    {
      $project: {
        "leader_details.password": 0,
        "leader_details.refreshToken": 0,
      },
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "vehicleId",
        foreignField: "_id",
        as: "vehicle_details",
      },
    },
  ]);

  if (!leader) return next(new ApiError(404, "Leader not found"));

  return res
    .status(200)
    .json(new ApiResponse(200, leader, "Leader details found"));
});

export { addLeader, toggleStatus, deleteLeader, getLeaderbyId, getAllLeader };
