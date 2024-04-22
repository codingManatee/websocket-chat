import LogoutButton from "./LogoutButton";
import Users from "./Users";
import Profile from "./Profile"
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col max-w-[350px]'>
			<Profile/>
			<div className='divider'></div>
			<SearchInput className='pb-2'/>
			<Users />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;

