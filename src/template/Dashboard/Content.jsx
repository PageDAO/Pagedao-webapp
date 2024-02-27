import {useDynamicContext} from "@dynamic-labs/sdk-react-core";
import iconGrayColor from "../../assets/icon-gray-color.svg";
import createHand from "../../assets/create-hand.svg";
import CollapsableSection from "./CollapsableSection.jsx";
import SideBar from "./SideBar.jsx";
import Modal from 'react-modal';
import React from 'react';
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        backgroundColor: 'transparent',
        padding: '0',
    },
    overlay: {
        backgroundColor: '#acacacbd',
        backdropFilter: 'blur(5px)',
    },
};

Modal.setAppElement('#root');

function Content() {
    const {user} = useDynamicContext();

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <div className="w-full bg-gray-50">
                <div className="container mx-auto py-10 flex justify-between gap-4">
                    <div className="basis-3/4 flex-col justify-start items-start gap-8 inline-flex w-full">

                        <CollapsableSection
                            title="What I created"
                            content={"You haven’t create any project yet..."}
                            buttonLabel="Create"
                            imageSrc={createHand}
                            onActionButtonClick={() => {
                                openModal();
                            }}
                        />

                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <div
                                className="p-8 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-8 inline-flex">
                                <div className="flex-col justify-start items-start gap-6 flex">
                                    <div className="self-stretch justify-between items-start inline-flex">
                                        <div
                                            className=" text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                                            Create a new project
                                        </div>
                                        <div className="">
                                            <button onClick={closeModal}>
                                                <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
                                        <div
                                            className="self-stretch  flex-col justify-start items-start gap-8 flex">
                                            <div
                                                className="self-stretch  flex-col justify-start items-start gap-2 flex">
                                                <div
                                                    className="p-4 bg-neutral-50 rounded-lg justify-start items-start gap-2 inline-flex">
                                                    <FontAwesomeIcon icon={faUpload}
                                                                     className="w-10 h-10 text-gray-400"/>
                                                </div>
                                                <div
                                                    className="self-stretch isOpened rounded-lg flex-col justify-start items-start gap-1 flex">
                                                    <div
                                                        className="self-stretch isOpened pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                                                        <div
                                                            className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                            <div
                                                                className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                                                                Project
                                                                name
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="self-stretch isOpened justify-start items-start gap-1 inline-flex">
                                                            <div
                                                                className="grow shrink basis-0 isOpened justify-start items-center gap-2.5 flex">
                                                                <div
                                                                    className="text-neutral-300 text-base font-normal font-['DM Sans'] leading-snug">Project
                                                                    name
                                                                </div>
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
                                                                className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">Description
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                                                            <div
                                                                className="grow shrink basis-0 isOpened justify-start items-center gap-2.5 flex">
                                                                <div
                                                                    className="text-neutral-300 text-base font-normal font-['DM Sans'] leading-snug">Multi-line
                                                                    here
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch isOpened flex-col justify-start items-start gap-6 flex">
                                                <div
                                                    className="self-stretch isOpened flex-col justify-start items-start gap-2 flex">
                                                    <div
                                                        className="text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">Collaborators
                                                    </div>
                                                    <div
                                                        className="self-stretch text-neutral-800 text-sm font-normal font-['DM Sans'] leading-tight">The
                                                        following collaborators will have full permission to add, edit
                                                        and modify anything within the project. Please add their address
                                                        in the following.
                                                    </div>
                                                </div>
                                                <div
                                                    className="self-stretch isOpened flex-col justify-start items-start gap-4 flex">
                                                    <div
                                                        className="self-stretch isOpened rounded-lg flex-col justify-start items-start gap-1 flex">
                                                        <div
                                                            className="self-stretch isOpened pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                                                            <div
                                                                className="self-stretch isOpened justify-start items-start gap-1 inline-flex">
                                                                <div
                                                                    className="grow shrink basis-0 isOpened justify-start items-center gap-2.5 flex">
                                                                    <div
                                                                        className="text-neutral-300 text-base font-normal font-['DM Sans'] leading-snug">0x...
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="px-4 py-2 rounded-lg border border-neutral-800 justify-center items-center gap-1 inline-flex">
                                                        <div
                                                            className="text-neutral-800 text-sm font-bold font-['DM Sans'] leading-tight">Add
                                                            more
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="self-stretch px-8 py-3 bg-red-500 rounded-lg justify-center items-center gap-1 inline-flex">
                                    <div
                                        className="text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug">Create
                                    </div>
                                </div>
                            </div>
                        </Modal>

                        <CollapsableSection
                            title="What I purchased"
                            content={"You haven’t collected any book yet..."}
                            buttonLabel="Discover"
                            imageSrc={iconGrayColor}
                            onActionButtonClick={() => {
                                console.log("Button clicked!");
                            }}
                        />

                    </div>
                    <div className="basis-1/4 w-full">
                        <SideBar/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Content;