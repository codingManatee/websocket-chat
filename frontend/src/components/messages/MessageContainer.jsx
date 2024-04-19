import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';  // Make sure axios is imported
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
    const { conversationId } = useParams();
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        const fetchConversationDetails = async () => {
            if (conversationId) {
                try {
                    const response = await axios.get(`/api/messages/room/info/${conversationId}`);
					console.log(response.data)
                    setSelectedConversation(response.data);
                } catch (error) {
                    console.error('Error fetching conversation details:', error);
                    // Optionally handle error state here (e.g., show an error message)
                }
            }
        };

        fetchConversationDetails();

        // Cleanup function
        return () => setSelectedConversation(null);
    }, [conversationId]);
	
	console.log(selectedConversation)
    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span>{" "}
                        <span className='text-gray-900 font-bold'>{selectedConversation.name}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName}</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};
