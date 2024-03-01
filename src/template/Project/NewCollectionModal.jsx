import Modal from "react-modal";
import React, {useState} from "react";
import {XCircle} from "lucide-react";

const customStyles = {
    content: {
        backgroundColor: 'transparent',
        border: 'none',
        bottom: 'auto',
        left: '50%',
        marginRight: '-50%',
        maxHeight: '80%',
        maxWidth: '50%',
        padding: '0',
        right: 'auto',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        backgroundColor: '#acacacbd',
        backdropFilter: 'blur(5px)',
    },
};

Modal.setAppElement('#root');


function NewProjectModal({modalIsOpen, setIsOpen}) {

    const [collaborators, setCollaborators] = useState([{address: ''}]);

    function afterOpenModal() {
        console.log("Modal Opened");
    }

    function closeModal() {
        setIsOpen(false);
    }

    function createProject(data) {
        console.log("Create project", data);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        console.log(collaborators);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="New Collection Modal"
        >
            <div
                className="p-8 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-8 inline-flex">
                <div className="flex-col justify-start items-start gap-6 flex ">
                    <div className="self-stretch justify-between items-start inline-flex">
                        <div
                            className=" text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                            Create a new collection
                        </div>
                        <div>
                            <button onClick={closeModal}>
                                <XCircle size={20}
                                         className="text-gray-400"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
                        <form action={createProject} onSubmit={handleSubmit}>
                            <div
                                className="self-stretch  flex-col justify-start items-start gap-8 flex">
                                <div
                                    className="self-stretch  flex-col justify-start items-start gap-2 flex">
                                    <div
                                        className="py-2 rounded-lg justify-start items-start gap-2 inline-flex">
                                        Collection allows writer like you to group a set of books and list them as
                                        collection in other major marketplace such as opensea.
                                    </div>
                                    <div
                                        className="self-stretch isOpened rounded-lg flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch isOpened pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div
                                                className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                                                    Collection name
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch isOpened justify-start items-start gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 isOpened justify-start items-center gap-2.5 flex">
                                                    <input
                                                        className="bg-transparent py-2 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                                                        name="project_name"
                                                        type="text"
                                                        placeholder="Write your collection name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    className="self-stretch justify-center items-center gap-1 inline-flex">
                    <button
                        type="submit"
                        onClick={createProject}
                        className="px-8 py-3 bg-dao-primary rounded-lg text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug w-full"
                    >
                        Create
                    </button>

                </div>
            </div>
        </Modal>
    )
}

export default NewProjectModal;