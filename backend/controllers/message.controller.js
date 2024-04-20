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
