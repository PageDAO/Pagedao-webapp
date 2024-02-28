import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faGrip, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import NewCollectionModal from "./NewCollectionModal.jsx";

function ProjectItem({project}) {
    const [isHovering, setIsHovering] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    const handleMouseOver = () => {
        setIsHovering(true);
        console.log('hovering');
    };

    const handleMouseOut = () => {
        setIsHovering(false);
        console.log('not hovering');
    };

    return (
        <>
            <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="transition ease-in-out delay-150"
            >
                {!isHovering &&
                    <div
                        className="transition ease-in-out delay-150 flex flex-col gap-4 bg-white px-4 py-32 rounded-lg justify-center items-center text-center border-2 border-gray-400 border-dotted"
                    >
                        <FontAwesomeIcon icon={faPlusCircle} className="h-12 text-gray-500"/>
                    </div>
                }
                {isHovering &&
                    <div
                        className="flex flex-col gap-4 bg-gray-700 px-4 py-28 rounded-lg justify-center items-center text-center border-2 border-gray-400 border-dotted">
                        <Link
                            to={'/book/add'}
                            className="bg-dao-primary px-4 py-2 rounded text-white gap-4 flex items-center justify-between w-full">
                            Books
                            <FontAwesomeIcon icon={faBook}/>
                        </Link>

                        <button
                            onClick={openModal}
                            className="bg-dao-primary px-4 py-2 rounded text-white gap-4 flex items-center justify-between w-full">
                            Collection
                            <FontAwesomeIcon icon={faGrip}/>
                        </button>
                    </div>
                }
            </div>

            <NewCollectionModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        </>
    );
}

export default ProjectItem;