import React, {useState} from 'react';
import {ChevronDownSquare, ChevronUpSquare} from 'lucide-react';
import {Collapse} from "react-collapse/src";
import CollapsableEmptySection from "./CollapsableEmptySection.jsx";
import CollapsableItemSection from "./CollapsableItemSection.jsx";

function CollapsableSection(
    {
        title,
        items,
        emptyContent,
        emptyButtonLabel,
        buttonLabel,
        imageSrc,
        onActionButtonClick
    }
) {
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
                        {isOpened ? <ChevronUpSquare/> : <ChevronDownSquare/>}
                    </button>
                </div>
                <Collapse isOpened={isOpened}>
                    {(items && items.length > 0) ? (
                        <div
                            className="w-full py-6 flex-col justify-start items-start gap-4 inline-flex"
                        >
                            <div
                                className="justify-center items-center gap-1 inline-flex">
                                <button
                                    onClick={onActionButtonClick}
                                    className="px-4 py-2 bg-dao-primary rounded-lg text-neutral-50 text-sm font-bold font-['DM Sans'] leading-tight"
                                >
                                    {buttonLabel}
                                </button>
                            </div>
                            <div className="w-full p-10 bg-white rounded-lg gap-4 flex flex-col">
                                {items.map((item, index) => (
                                    <CollapsableItemSection
                                        key={index}
                                        title={title}
                                        item={item}
                                        emptyContent={emptyContent}
                                        emptyButtonLabel={emptyButtonLabel}
                                        buttonLabel={buttonLabel}
                                        imageSrc={imageSrc}
                                        onActionButtonClick={onActionButtonClick}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <CollapsableEmptySection
                            title={title}
                            items={items}
                            emptyContent={emptyContent}
                            emptyButtonLabel={emptyButtonLabel}
                            imageSrc={imageSrc}
                            onActionButtonClick={onActionButtonClick}
                        />
                    )}
                </Collapse>
            </div>
        </>
    );
}

export default CollapsableSection;