import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDownAZ,
    faArrowDownWideShort,
    faArrowUpAZ,
    faArrowUpWideShort,
    faBook,
    faGrip,
    faPlusCircle,
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import Project from "./Project.jsx";
import ProjectItem from "./ProjectItem.jsx";

function ProjectDetail() {
    let show = true;

    return (
        <>
            <div className="w-full bg-neutral-100">
                <div className="container mx-auto py-10 flex justify-between gap-4">
                    <div className="basis-3/4 flex-col justify-start items-start gap-8 inline-flex w-full">

                        <div className="flex gap-2 w-full">
                            <div className="flex flex-col w-full grow">
                                <div className="relative flex items-center">
                                    <input
                                        type={show ? 'text' : 'password'}
                                        name="search"
                                        id="search"
                                        className="h-11 flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-lg text-sm text-gray-900 w-full"
                                        placeholder="Search"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 bg-transparent flex items-center justify-center text-gray-700"
                                    >
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="relative group transition-all duration-200 focus:overflow-visible w-max h-11 px-6 py-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-lg border border-zinc-200"
                                >
                                    <span>
                                        Newest to Oldest
                                    </span>
                                    <FontAwesomeIcon icon={faArrowDownWideShort}/>

                                    {/* Dropdown */}
                                    <div
                                        className="absolute shadow-lg -bottom-40 left-0 w-full h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2"
                                    >

                                        <span
                                            className="flex flex-row justify-between gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"
                                        >
                                            <p>Oldest to Newest</p>
                                            <FontAwesomeIcon icon={faArrowUpWideShort}/>
                                        </span>

                                        <span
                                            className="flex flex-row justify-between gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"
                                        >
                                            <p>A-Z</p>
                                            <FontAwesomeIcon icon={faArrowDownAZ}/>
                                        </span>

                                        <span
                                            className="flex flex-row justify-between gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"
                                        >
                                            <p>Z-A</p>
                                            <FontAwesomeIcon icon={faArrowUpAZ}/>
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 w-full">
                            <ProjectItem />
                            <ProjectItem />
                            <ProjectItem />
                        </div>

                    </div>


                    {/* Project Stats */}
                    <div className="basis-1/4 w-full">
                        <div
                            className="p-6 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-6 inline-flex">
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
                                            of book
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
                                className="self-stretch px-8 py-3 rounded-lg border border-neutral-800 justify-center items-center gap-1 inline-flex">
                                <div className="text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug">Edit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDetail;