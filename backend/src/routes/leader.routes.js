import { Router } from "express";
import {
  addLeader,
  deleteLeader,
  getAllLeader,
  getLeaderbyId,
  toggleStatus,
} from "../controllers/leader.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(verifyJWT);
router.route("/add-leader").post(addLeader);
router.route("/get-all-leaders").get(getAllLeader);
router.route("/get-leader-by-id/:lid").get(getLeaderbyId);
router.route("/toggle-status/:leaderId").patch(toggleStatus);
router.route("/delete-leader/:leaderId").delete(deleteLeader);

export default router;
