import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Vehicle } from "../models/Vehicle.models.js";
import { fetchVehicleData } from "../utils/vehicleDataApi.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

const getVehicleData = async (vehicleNumber) => {
  try {
    const vehicleData = await fetchVehicleData(vehicleNumber);
    if (!vehicleData) {
      return next(new ApiError(400, "Vehicle Data not found"));
    }
    return vehicleData;
  } catch (error) {
    console.error("Unable to fetch data")
    throw err
  }
};

const registerVehicle = asyncHandler(async (req, res, next) => {
  const {
    vehicleNumber,
    vehicleType,
    licenceNumber,
    vehicleName,
    vehicleModel,
    vehicleStatus,
    useServerApi,
  } = req.body;

  const vehicleImage = req.file?.path;
  if (!vehicleImage) return next(404, "Vehicle Image not found");

  const vehicleImg = await uploadOnCloudinary(vehicleImage);
  if (!vehicleImg)
    return next(
      new ApiError(400, "Unable to upload vehicle image on server!!!")
    );

  if (!vehicleNumber && !licenceNumber) {
    return next(
      new ApiError(400, "Vehicle Number and Licence Number are required")
    );
  }

  const vehicle = await Vehicle.findOne({ vehicleNumber });
  if (vehicle) return next(new ApiError(400, "Vehicle already exists."));

  if (useServerApi) {
    const vehicleData = await getVehicleData(vehicleNumber);
    if (!vehicleData) {
      return next(new ApiError(400, "Vehicle Data not found"));
    }
    const newVehicle = await Vehicle.create({
      vehicleNumber,
      vehicleType: vehicleData.vehicleType,
      licenceNumber,
      vehicleImage: vehicleImg.url,
      vehicleName: vehicleData.vehicleName,
      vehicleModel: vehicleData.vehicleModel,
      vehicleStatus: vehicleData.vehicleStatus,
      vehicleOwner: req.user?._id,
    });

    if (!newVehicle)
      return next(new ApiError(400, "Unable to register your vehicle!!!"));

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Vehicle registered successfully", newVehicle)
      );
  } else {
    if (!vehicleType || !vehicleName || !vehicleModel || !vehicleStatus) {
      return next(new ApiError(400, "All fields are required"));
    }
    const newVehicle = await Vehicle.create({
      vehicleNumber,
      vehicleType,
      licenceNumber,
      vehicleName,
      vehicleModel,
      vehicleStatus,
      vehicleImage: vehicleImg.url,
      vehicleOwner: req.user?._id,
    });
    if (!newVehicle)
      return next(new ApiError(400, "Unable to register your vehicle!!!"));
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Vehicle registered Successfully...", newVehicle)
      );
  }
});

const deleteVehicle = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  if (!isValidObjectId(id))
    return next(new ApiError(404, "Vehicle doesn't exist!!!"));
  const vehicle = await Vehicle.findByIdAndDelete(id);
  if (!vehicle)
    return next(
      new ApiError(
        404,
        "Unable to delete vehicle or vehicle already deleted!!!"
      )
    );
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Vehicle deleted Successfully..."));
});

const updateVehicle = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { vehicleType, vehicleName, vehicleModel, vehicleStatus } = req.body;
  const vehicleImage = req.file;

  const vehicleImg = await uploadOnCloudinary(vehicleImage);

  if (!vehicleImg) return next(400, "Unable to upload image on server!!!");

  if (!isValidObjectId(id))
    return next(new ApiError(404, "Vehicle doesn't exist!!!"));

  const vehicle = await Vehicle.findById(id);
  if (!vehicle) return next(new ApiError(404, "Vehicle doesn't exist!!!"));

  if (vehicle.vehicleOwner.toString() !== req.user?._id.toString())
    return next(new ApiError(403, "You are not the owner of this vehicle!!!"));

  if (vehicleType) vehicle.vehicleType = vehicleType;
  if (vehicleName) vehicle.vehicleName = vehicleName;
  if (vehicleModel) vehicle.vehicleModel = vehicleModel;
  if (vehicleStatus) vehicle.vehicleStatus = vehicleStatus;
  if (vehicleImage) vehicle.vehicleImage = vehicleImg.url;

  await vehicle.save();
  return res
    .status(200)
    .json(
      new ApiResponse(200, vehicle, "Vehicle Details updated Successfully....")
    );
});

const getVehicleDetails = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!isValidObjectId(id))
    return next(new ApiError(404, "Vehicle doesn't exist!!!"));

  const vehicle = await Vehicle.findById(id);
  if (!vehicle) return next(new ApiError(404, "Vehicle doesn't exist!!!"));

  if (vehicle.vehicleOwner.toString() !== req.user?._id.toString())
    return next(new ApiError(403, "You are not the owner of this vehicle!!!"));

  return res
    .status(200)
    .json(
      new ApiResponse(200, vehicle, "Vehicle Details updated Successfully....")
    );
});

const getUserVehicles = asyncHandler(async (req, res, next) => {
  const vehicleDetails = await Vehicle.find({ vehicleOwner: req.user?._id });

  if (!vehicleDetails) return next(new ApiError(404, "No Vehicles found!!!"));

  return res
    .status(200)
    .json(
      new ApiError(
        200,
        vehicleDetails,
        "Your registered vehicles fetched successfully..."
      )
    );
});

const previewVehicleData = asyncHandler(async (req, res, next) => {
    const { vehicleNumber } = req.body;
  
    if (!vehicleNumber) {
      return next(new ApiError(400, "Vehicle number is required"));
    }
  
    const vehicleData = await fetchVehicleData(vehicleNumber);
  
    if (!vehicleData) {
      return next(new ApiError(404, "Vehicle data not found"));
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, vehicleData, "Vehicle data preview fetched successfully"));
  });
  
export {
  registerVehicle,
  deleteVehicle,
  updateVehicle,
  getVehicleDetails,
  getUserVehicles,
  previewVehicleData
};
