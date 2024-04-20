import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import Conversations from "./Conversations";
import toast from 'react-hot-toast';

const SidebarChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [roomName, setRoomName] = useState('');

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleCreateRoom = async () => {
        try {
            await axios.post('/api/rooms', {
                name: roomName,
				participants: [],
            });
            closeModal();
        } catch (error) {
            toast.error('Failed to create room:', error);
        }
    };

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col w-[350px]'>
            <button
                className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4"
                onClick={openModal}
            >
                Create Room
            </button>
            <Conversations />

            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
                        <Dialog.Title className="text-lg font-medium">Create a New Room</Dialog.Title>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateRoom();
                        }}>
                            <input
                                type="text"
                                className="mt-4 px-4 py-2 border rounded w-full"
                                placeholder="Room Name"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                required
                            />
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    className="mr-2 rounded bg-gray-200 hover:bg-gray-300 text-black py-2 px-4"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded bg-blue-500 hover:bg-blue-700 text-white py-2 px-4"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default SidebarChat;
