import {PlusCircle} from "lucide-react";
import {Link} from "react-router-dom";

function ProjectItem({project, projectIndex, item, itemIndex}) {
    return (
        <>
            {project ? (
                <div className="pb-6 flex-col justify-start items-start gap-4 inline-flex">
                    <Link to={`/book/edit/${projectIndex}/${itemIndex}`}>
                    <div className="relative bg-neutral-50 rounded-lg">
                        <img
                            className="h-[347px]"
                            src={`https://ipfs.nftbookbazaar.com/ipfs/${item.image}` || "https://via.placeholder.com/150"}
                            alt="Cover"
                        />                        <div
                            className="px-2 py-1 left-[16px] top-[16px] absolute bg-amber-200 rounded-lg justify-center items-center gap-2 inline-flex">
                            <div
                                className="text-neutral-800 text-sm font-normal font-['DM Sans'] leading-tight">
                                {item.contracts[0].contractAddress ? "Published" : "Unpublished"}
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-1 flex">
                        <div className="pr-4 justify-start items-start gap-6 inline-flex">
                            <div className="grow shrink basis-0 justify-center items-center gap-2 flex">
                                <div
                                    className="grow shrink basis-0 text-neutral-800 text-lg font-normal font-['DM Sans'] leading-relaxed"
                                >
                                    {item.name}
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
            ) : (
                <Link
                    to={`/book/add/${projectIndex}`}
                    className="h-[347px] flex flex-col gap-4 bg-white px-4 rounded-lg justify-center items-center text-center border-2 border-gray-400 border-dotted"
                >
                    <PlusCircle size={50} className="text-gray-500"/>
                </Link>
            )}
        </>
    );
}

export default ProjectItem;