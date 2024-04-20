import SearchInput from "./SearchInput";
import Conversations from "./Conversations";

const SidebarChat = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col max-w-[350px]'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations/>
		</div>
	);
};
export default SidebarChat;

