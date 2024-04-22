import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetUsers from "../../hooks/useGetUsers";
import toast from "react-hot-toast";
import axios from "axios";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { users } = useGetUsers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    console.log(search)
    const user = users.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    try {
      const response = await axios.post(`/api/rooms/${user._id}`);
      if (response.status === 200) {
        const conversation_data = await axios.get(`/api/rooms/info/${response.data.conversationId}`);
        if (conversation_data) {
          setSelectedConversation(conversation_data.data.conversation);
          setSearch("");
        } else toast.error("No such user found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 pb-5">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800"
      >
        <IoSearchSharp className="w-6 h-6" />
      </button>
    </form>
  );
};
export default SearchInput;
