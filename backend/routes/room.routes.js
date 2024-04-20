import express from "express";
import {
  createRoom,
  getAllRooms,
  getPrivateRoom,
  getRoom,
  joinRoom,
} from "../controllers/room.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createRoom);
router.post("/:targetUserId", protectRoute, getPrivateRoom);
router.get("/", protectRoute, getAllRooms);
router.get("/info/:conversationId", protectRoute, getRoom);
router.post("/join/:conversationId", protectRoute, joinRoom);

export default router;
