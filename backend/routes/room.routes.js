import express from "express";
import {
  createRoom,
  getAllRooms,
  getPrivateRoom,
  getRoom,
} from "../controllers/room.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createRoom);
router.get("/:targetUserId", protectRoute, getPrivateRoom);
router.get("/", protectRoute, getAllRooms);
router.get("/info/:conversationId", getRoom);

export default router;
