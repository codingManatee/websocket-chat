import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: conversationId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      _id: conversationId,
    });

    const newMessage = new Message({
      senderId,
      conversationId,
      message,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    const populatedMessage = await Message.findById(newMessage._id).populate(
      "senderId"
    );

    conversation.participants.forEach((participant) => {
      if (participant !== senderId) {
        const socketId = getReceiverSocketId(participant);
        if (socketId) {
          io.to(socketId).emit("newMessage", populatedMessage);
        }
      }
    });

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const conversation = await Conversation.findOne({
      _id: conversationId,
    }).populate({
      path: "messages",
      populate: {
        path: "senderId",
        model: "User",
      },
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createRoom = async (req, res) => {
  try {
    const userId = req.user._id;
    const { participants } = req.params;
    const conversation = await Conversation.create({
      participants: [userId, ...participants],
    });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    console.log("Error in createConversation controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPrivateRoom = async (req, res) => {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.targetUserId;

    // Find conversation with only these two users
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, targetUserId] },
    });

    // If conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, targetUserId],
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

    if (!conversation) {
      res
        .status(400)
        .json({ error: `No conversation with ${conversationId} as id` });
    }

    // Return the conversation ID
    res.status(200).json({ conversation: conversation });
  } catch (error) {
    console.log("Error in getPrivateRoom controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find conversations where the user is a participant and the total number of participants is greater than 2
    const conversations = await Conversation.find({
      participants: userId,
      $where: "this.participants.length > 2",
    });

    res.status(200).json(conversations);
  } catch (error) {
    console.log("Error in getAllRooms controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};