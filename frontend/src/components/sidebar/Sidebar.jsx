import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import Users from "./Users";
import Profile from "./Profile"

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col max-w-[350px]'>
			<Profile/>
			<div className='divider px-3'></div>
			<Users />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;

