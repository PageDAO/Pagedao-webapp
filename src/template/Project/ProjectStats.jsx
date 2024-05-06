import React from "react";
import ProjectModal from "./ProjectModal.jsx";

function ProjectStats() {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div
                className="p-6 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-6 inline-flex w-full">
                <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                    <div
                        className="self-stretch text-neutral-800 text-3xl font-bold font-['Arvo'] leading-loose">Project
                        Stats
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                        <div
                            className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                            <div
                                className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Created
                            </div>
                            <div
                                className="text-right text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">dd/mm/yyyy
                            </div>
                        </div>
                        <div
                            className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                            <div
                                className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Number
                                of items
                            </div>
                            <div
                                className="text-right text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">0
                            </div>
                        </div>
                        <div
                            className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                            <div
                                className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Number
                                of collections
                            </div>
                            <div
                                className="text-right text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">0
                            </div>
                        </div>
                        <div className="self-stretch pb-2 flex-col justify-start items-start gap-2 flex">
                            <div
                                className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Collaborators
                            </div>
                            <div
                                className="text-right text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">None
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="self-stretch justify-center items-center gap-1 inline-flex">
                    <button
                        onClick={openModal}
                        className="px-8 py-3 rounded-lg border border-neutral-800 text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug w-full">
                        Edit
                    </button>
                </div>
            </div>


            <ProjectModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
        </>
    );
}

export default ProjectStats;