import Conversation from "../models/conversation.model.js";

export const createRoom = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, participants } = req.body;
    const conversation = await Conversation.create({
      name,
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
      participants: { $all: [userId, targetUserId], $size: 2 },
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
    const conversations = await Conversation.aggregate([
      { $match: { participants: userId } },
      { $addFields: { participantCount: { $size: "$participants" } } },
      { $match: { participantCount: { $gt: 2 } } },
    ]);

    res.status(200).json(conversations);
  } catch (error) {
    console.log("Error in getAllRooms controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
