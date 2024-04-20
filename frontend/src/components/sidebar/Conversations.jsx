import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			<div className="p-2 font-bold text-gray-200 text-2xl">Rooms</div>
			{conversations.map((room, idx) => (
				<Conversation
					key={room._id}
					conversation={room}
					emoji={getRandomEmoji()}
					lastIdx={idx === room.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;

