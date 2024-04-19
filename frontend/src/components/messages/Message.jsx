import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300";
  const bubbleTextColor = fromMe ? "text-white" : "text-gray-800";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Chat profile" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble ${bubbleTextColor} ${bubbleBgColor} ${shakeClass} pb-2 dark:bg-gray-700 dark:text-gray-300`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center dark:text-gray-400">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
