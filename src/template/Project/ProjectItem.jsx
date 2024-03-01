import React from "react";
import {PlusCircle} from "lucide-react";
import {Link} from "react-router-dom";

function ProjectItem({project}) {

    return (
        <>
            {project ? (
                <div className="pb-6 flex-col justify-start items-start gap-4 inline-flex">
                    <div className="relative bg-neutral-50 rounded-lg">
                        <Link to={'/book/edit'}>
                        <img
                            className="h-[347px]"
                            src="https://picsum.photos/266/347"
                            alt="Cover"
                        />
                        </Link>
                        <div
                            className="px-2 py-1 left-[16px] top-[16px] absolute bg-amber-200 rounded-lg justify-center items-center gap-2 inline-flex">
                            <div
                                className="text-neutral-800 text-sm font-normal font-['DM Sans'] leading-tight">
                                Published
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-1 flex">
                        <div className="pr-4 justify-start items-start gap-6 inline-flex">
                            <div className="grow shrink basis-0 justify-center items-center gap-2 flex">
                                <Link
                                    to={'/book/edit'}
                                    className="grow shrink basis-0 text-neutral-800 text-lg font-normal font-['DM Sans'] leading-relaxed"
                                >
                                    {project.title}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link
                    to={'/book/add'}
                    className="h-[347px] flex flex-col gap-4 bg-white px-4 rounded-lg justify-center items-center text-center border-2 border-gray-400 border-dotted"
                >
                    <PlusCircle size={50} className="text-gray-500"/>
                </Link>
            )}
        </>
    );
}

export default ProjectItem;