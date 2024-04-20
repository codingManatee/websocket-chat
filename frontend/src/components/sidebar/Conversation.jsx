import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Conversation = ({conversation, lastIdx, emoji }) => {
    
	const navigate = useNavigate();
	const handleSelectConversation = async () => {
		try {
			const response = await axios.post(`/api/rooms/join/${conversation._id}`);
			if (response.status === 200) {
				navigate(`/room/${response.data.conversationId}`);
			}
		} catch (error) {
			toast.error("Error fetching private room:", error);
		}
	};

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
			`}
				onClick={handleSelectConversation}
			>
				<div className='flex flex-col flex-1 overflow-hidden'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200 truncate w-2/3'>{conversation.name}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>
			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;

