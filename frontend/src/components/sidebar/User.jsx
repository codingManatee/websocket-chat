import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";
import axios from "axios";

const User = ({ user, lastIdx, emoji }) => {
  const { onlineUsers } = useSocketContext();
  const navigate = useNavigate();
  const isOnline = onlineUsers.includes(user._id);

  const handleSelectUser = async () => {
    try {
      const response = await axios.get(`/api/rooms/${user._id}`);
      if (response.status === 200) {
        const conversation_data = await axios.get(`/api/rooms/info/${response.data.conversationId}`);
        if (conversation_data) {
          navigate(`/room/${conversation_data.data.conversation._id}`);
        }
      } 
    } catch (error) {
      console.error("Error fetching private room:", error);
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${user._id === onlineUsers ? "bg-sky-500" : ""}
			`}
        onClick={handleSelectUser}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 truncate w-2/3">
              {user.fullName}
            </p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default User;
