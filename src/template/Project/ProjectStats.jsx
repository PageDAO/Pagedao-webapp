import React from "react";
import ProjectModal from "./ProjectModal.jsx";
import { TasksContext } from "../Providers/TasksContext.js";

function ProjectStats({projectIndex}) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const projects = React.useContext(TasksContext);
    const project = projects[projectIndex];
    console.log("project", project);

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
        {project && (
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
                                className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Number
                                of items
                            </div>
                            <div
                                className="text-right text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">{project.items.length}
                            </div>
                        </div>
                        <div
                            className="self-stretch pb-2 border-b border-neutral-500 flex-col justify-start items-start gap-2 flex">
                            <div
                                className="text-neutral-800 text-xl font-normal font-['DM Sans'] leading-7">Number
                                of collections
                            </div>
                            <div
                                className="text-right text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">{projects.length}
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
            </div>
        )}

        </>
    );
}

export default ProjectStats;