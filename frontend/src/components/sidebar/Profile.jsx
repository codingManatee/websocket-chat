import { useAuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="p-2 font-bold text-gray-200 text-2xl">Profile</div>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
      >
        <div className={`avatar online`}>
          <div className="w-12 rounded-full">
            <img src={authUser.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 truncate w-2/3">
              {authUser.fullName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
