import { Router } from "express";
import {
  changePassword,
  changeUserDetails,
  getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  signup,
  updateAvatar,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/signUp").post(signup);
router.route("/login").post(login);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logout);
router.route("/change-user-details").patch(verifyJWT, changeUserDetails);
router.route("/change-password").patch(verifyJWT, changePassword);
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar") ,updateAvatar);
router.route('/refresh-access-token').patch(verifyJWT,refreshAccessToken)

export default router;
