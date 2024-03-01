import React from 'react';

function CollapsableEmptySection({
                                title, items, emptyContent, emptyButtonLabel, buttonLabel, imageSrc, onActionButtonClick
                            }) {

    return (<>
        <div
            className="w-full px-10 py-16 bg-white rounded-lg flex-col justify-start items-center gap-6 flex"
        >
            <div>
                {imageSrc && <img src={imageSrc} alt={title} className="w-30 h-30"/>}
            </div>
            <div
                className="text-neutral-500 text-sm font-normal font-['DM Sans'] leading-tight"
            >
                {emptyContent}
            </div>
            <button
                onClick={onActionButtonClick}
                className="px-8 py-3 bg-dao-primary rounded-lg justify-center items-center gap-1 inline-flex text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug">
                {emptyButtonLabel}
            </button>
        </div>
    </>);
}

export default CollapsableEmptySection;