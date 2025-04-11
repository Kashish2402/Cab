import { Router } from "express";
import { deleteVehicle, getUserVehicles, getVehicleDetails, previewVehicleData, registerVehicle, updateVehicle } from "../controllers/vehicle.controller";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router()

router.use(verifyJWT)
router.route("/register-vehicle").post(upload.single("vehicleImage"),registerVehicle)
router.route("/update-vehicle/:id").patch(upload.single("vehicleImage"),updateVehicle)
router.route("/preview-vehicle-details").post(previewVehicleData)
router.route("/get-vehicle-details/:id").get(getVehicleDetails)
router.route("/get-user-vehicles").get(getUserVehicles)
router.route("/delete/:id").delete(deleteVehicle)


export default router