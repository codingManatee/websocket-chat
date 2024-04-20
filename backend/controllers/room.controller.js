import Conversation from "../models/conversation.model.js";
import { io } from "../socket/socket.js";

export const createRoom = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, participants } = req.body;
    const uniqueParticipants = [...new Set([userId, ...participants])];
    const conversation = await Conversation.create({
      name,
      participants: uniqueParticipants,
    });

    io.emit("newRoomCreated", conversation);
    res.status(201).json(conversation);
  } catch (error) {
    console.log("Error in createRoom controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPrivateRoom = async (req, res) => {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.targetUserId;

    // Find conversation with only these two users
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, targetUserId], $size: 2 },
      isPrivateRoom: true,
    });

    // If conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, targetUserId],
        isPrivateRoom: true,
      });
    }

    // Return the conversation ID
    res.status(200).json({ conversationId: conversation._id });
  } catch (error) {
    console.log("Error in getPrivateRoom controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRoom = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    // Find conversation with only these two users
    let conversation = await Conversation.findOne({
      _id: conversationId,
    });

    if (!conversation || !conversation.participants.includes(req.user._id)) {
      return res
        .status(404)
        .json({ error: "Conversation not found or access denied" });
    }

    // Return the conversation ID
    res.status(200).json({ conversation: conversation });
  } catch (error) {
    console.log("Error in getRoom controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const conversations = await Conversation.aggregate([
      { $match: { isPrivateRoom: false } },
    ]);

    res.status(200).json(conversations);
  } catch (error) {
    console.log("Error in getAllRooms controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    // Check if the room exists and if the user is already a participant
    const room = await Conversation.findById(conversationId);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (room.participants.includes(userId)) {
      // User is already a participant, navigate to the room
      return res
        .status(200)
        .json({ message: "Navigating to room", conversationId: room._id });
    } else {
      // Add user to the room's participants list if they are not already a participant
      const updatedRoom = await Conversation.findByIdAndUpdate(
        conversationId,
        { $addToSet: { participants: userId } },
        { new: true }
      );

      if (!updatedRoom) {
        return res.status(404).json({ error: "Room not found" });
      }

      // Successfully added to the room, now navigate to the room
      res.status(200).json({
        message: "Joined and navigating to room",
        conversationId: updatedRoom._id,
      });
    }
  } catch (error) {
    console.log("Error in joinRoom controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
