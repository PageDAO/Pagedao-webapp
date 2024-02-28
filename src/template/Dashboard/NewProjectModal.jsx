import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import FileDnD from "../Forms/FileDnD.jsx";
import Modal from "react-modal";
import React, {useState} from "react";
import CollaboratorsComponent from "../Forms/Collaborators.jsx";
import {faBook, faHandsHoldingCircle} from "@fortawesome/free-solid-svg-icons";

const customStyles = {
    content: {
        backgroundColor: 'transparent',
        border: 'none',
        bottom: 'auto',
        left: '50%',
        marginRight: '-50%',
        maxHeight: '80%',
        maxWidth: '80%',
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
            contentLabel="New Project Modal"
        >
            <div
                className="p-8 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-8 inline-flex">
                <div className="flex-col justify-start items-start gap-6 flex ">
                    <div className="self-stretch justify-between items-start inline-flex">
                        <div
                            className=" text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                            Create a new project
                        </div>
                        <div>
                            <button onClick={closeModal}>
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className="w-5 h-5 text-gray-400"
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
                                        className="p-4 bg-neutral-50 rounded-lg justify-start items-start gap-2 inline-flex">
                                        <FontAwesomeIcon icon={faHandsHoldingCircle} className="w-10 h-10 text-gray-400"/>
                                    </div>
                                    <div
                                        className="self-stretch isOpened rounded-lg flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch isOpened pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div
                                                className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                                                    Project name
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch isOpened justify-start items-start gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 isOpened justify-start items-center gap-2.5 flex">
                                                    <input
                                                        className="p-4 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                                                        name="project_name"
                                                        type="text"
                                                        placeholder="Write your project name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch isOpened rounded-lg flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch grow shrink basis-0 pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                                            <div
                                                className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <div
                                                    className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                                                    Description
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                                                <div
                                                    className="grow shrink basis-0 isOpened justify-start items-center gap-2.5 flex"
                                                >
                                                    <textarea
                                                        className="p-4 text-black text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                                                        name="description"
                                                        placeholder="Write a good description"
                                                        rows="5"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="self-stretch isOpened flex-col justify-start items-start gap-6 flex"
                                >
                                    <div
                                        className="self-stretch isOpened flex-col justify-start items-start gap-2 flex"
                                    >
                                        <div
                                            className="text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7"
                                        >
                                            Collaborators
                                        </div>
                                        <div
                                            className="self-stretch text-neutral-800 text-sm font-normal font-['DM Sans'] leading-tight"
                                        >
                                            The following collaborators will have full permission to add,
                                            edit and modify anything within the project. Please add
                                            their address in the following.
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch isOpened flex-col justify-start items-start gap-4 flex"
                                    >
                                        <CollaboratorsComponent collaborators={collaborators}
                                                                setCollaborators={setCollaborators}/>
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