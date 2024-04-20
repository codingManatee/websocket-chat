import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import Users from "./Users";

const SidebarChat = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col max-w-[350px]'>
			<SearchInput />
			<div className='divider px-3'></div>
			{/* <Users /> */}
		</div>
	);
};
export default SidebarChat;

