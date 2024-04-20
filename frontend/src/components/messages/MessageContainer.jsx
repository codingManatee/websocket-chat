import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import NoChatSelected from "./NoChatSelected";

const MessageContainer = () => {
    const { conversationId } = useParams();
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { authUser } = useAuthContext();


    useEffect(() => {
        const fetchConversationDetails = async () => {
            if (conversationId) {
                try {
                    const response = await axios.get(`/api/rooms/info/${conversationId}`);
                    setSelectedConversation(response.data.conversation);
                } catch (error) {
                    toast.error('Error fetching conversation details:', error);
                }
            }
        };

        fetchConversationDetails();

        // Cleanup function
        return () => setSelectedConversation(null);
    }, [conversationId, setSelectedConversation]);
    
    let displayName = "No name specify" 
    if (selectedConversation)
    {
        displayName = selectedConversation.participants.length === 2 ? 
        selectedConversation.participants.find(participant => participant !== authUser._id) : selectedConversation.name 
    }


    return (
        <div className='md:min-w-[450px] max-h-screen flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span>{" "}
                        <span className='text-gray-900 font-bold'>{displayName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;

