import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
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
                participants: [], // This can be updated based on how participants are managed
            });
            closeModal();
            toast.success('Room created successfully!');
        } catch (error) {
            toast.error('Failed to create room. Please try again.');
        }
    };

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col w-[350px]'>
            <button
                className="transition duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300 rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4"
                onClick={openModal}
            >
                Create Room
            </button>
            <Conversations />

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                                    Create a New Room
                                </Dialog.Title>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleCreateRoom();
                                }}>
                                    <input
                                        type="text"
                                        className="mt-4 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Room Name"
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        required
                                    />
                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default SidebarChat;
