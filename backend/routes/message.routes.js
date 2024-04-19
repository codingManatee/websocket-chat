import express from "express";
import {
  createRoom,
  getAllRooms,
  getMessages,
  getPrivateRoom,
  getRoom,
  sendMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/room", protectRoute, createRoom);
router.get("/room/:targetUserId", protectRoute, getPrivateRoom);
router.get("/room", protectRoute, getAllRooms);
router.get("/room/info/:conversationId", getRoom);

export default router;
