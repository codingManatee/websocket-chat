import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white dark:text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner text-gray-800 dark:text-white"></span>
      )}
    </div>
  );
};
export default LogoutButton;
