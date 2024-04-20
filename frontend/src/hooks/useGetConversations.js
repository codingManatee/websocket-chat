import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";

const useGetConversations = () => {
  const { socket } = useSocketContext();
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/rooms");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();

    // Listen for new room created events and update the conversations list
    if (socket) {
      socket.on("newRoomCreated", (newRoom) => {
        setConversations((prevConversations) => [
          ...prevConversations,
          newRoom,
        ]);
      });

      return () => {
        socket.off("newRoomCreated");
      };
    }
  }, [socket]);

  return { loading, conversations };
};
export default useGetConversations;
