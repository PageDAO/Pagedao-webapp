import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCaretDown, faSquareCaretUp} from "@fortawesome/free-regular-svg-icons";
import {Collapse} from "react-collapse/src";

function CollapsableSection({title, content, buttonLabel, imageSrc, onActionButtonClick}) {
    const [isOpened, setIsOpened] = useState(true);

    const toggleCollapse = () => {
        setIsOpened(!isOpened);
    };

    return (
        <>
            <div className="flex-col justify-between items-start gap-2 flex w-full">
                <div className="justify-between items-center inline-flex w-full">
                    <h3 className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                        {title}
                    </h3>
                    <button onClick={toggleCollapse}>
                        {isOpened ? <FontAwesomeIcon icon={faSquareCaretUp}/> :
                            <FontAwesomeIcon icon={faSquareCaretDown}/>}

                    </button>
                </div>
                <Collapse isOpened={isOpened}>
                    <div
                        className="w-full px-10 py-16 bg-white rounded-lg flex-col justify-start items-center gap-6 flex"
                    >
                        <div>
                            {imageSrc && <img src={imageSrc} alt={title} className="w-30 h-30"/>}
                        </div>
                        <div
                            className="text-neutral-500 text-sm font-normal font-['DM Sans'] leading-tight"
                        >
                            {content}
                        </div>
                        <button
                            onClick={onActionButtonClick}
                            className="px-8 py-3 bg-dao-primary rounded-lg justify-center items-center gap-1 inline-flex text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug">
                            {buttonLabel}
                        </button>
                    </div>
                </Collapse>
            </div>
        </>
    );
}

export default CollapsableSection;