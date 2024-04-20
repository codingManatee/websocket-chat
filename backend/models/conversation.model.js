import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to set the chat name dynamically
conversationSchema.pre('save', async function (next) {
  if (this.name) {
    return next();
  }

  if (this.participants.length === 2) {
    try {
      const userIds = this.participants.map(participant => participant.toString());
      const users = await mongoose.model('User').find({
        '_id': { $in: userIds }
      });

      const otherUser = users.find(user => user.id !== userIds[0]);
      this.name = otherUser.fullName;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
