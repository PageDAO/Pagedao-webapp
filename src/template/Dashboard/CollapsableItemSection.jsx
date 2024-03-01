import React from 'react';
import {Book, MoreHorizontal} from 'lucide-react';
import {Link} from "react-router-dom";

function CollapsableItemSection(
    {
        title,
        item,
        emptyContent,
        emptyButtonLabel,
        buttonLabel,
        imageSrc,
        onActionButtonClick
    }
) {

    return (
        <>
            <div
                className="flex-row justify-between items-center gap-2 flex"
            >
                <div className="justify-start items-start gap-4 flex">
                    <Link
                        to="/book/edit"
                        className="relative bg-neutral-300 rounded-lg p-8"
                    >
                        <Book/>
                    </Link>
                    <div className="flex-col justify-center items-start gap-2 inline-flex">
                        <Link
                            to="/book/edit"
                            className="text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7"
                        >
                            {item.title || "Unnamed Project"}
                        </Link>
                        <Link
                            to="/book/edit"
                            className="text-neutral-500 text-base font-normal font-['DM Sans'] leading-snug"
                        >
                            {item.description || "No description available"}
                        </Link>
                    </div>
                </div>
                <div className="justify-end items-center gap-4 flex">
                    <div
                        className="text-neutral-500 text-base font-normal font-['DM Sans'] leading-snug">
                        0 collections / 0 books
                    </div>
                    <Link to="#">
                        <MoreHorizontal/>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default CollapsableItemSection;