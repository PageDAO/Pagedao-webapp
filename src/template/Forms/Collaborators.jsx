import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';

const CollaboratorsComponent = ({collaborators, setCollaborators}) => {
    const addCollaborator = () => {
        setCollaborators([...collaborators, {address: ''}]);
    };

    const handleCollaboratorChange = (index, event) => {
        const newCollaborators = [...collaborators];
        newCollaborators[index].address = event.target.value;
        setCollaborators(newCollaborators);
    };

    const removeCollaborator = (index) => {
        const newCollaborators = [...collaborators];
        newCollaborators.splice(index, 1);
        setCollaborators(newCollaborators);
    };

    return (
        <div className="grow shrink basis-0 justify-start items-start gap-2.5 flex flex-col w-full">
            <div
                className="self-stretch isOpened flex-col justify-start items-start gap-4 flex"
            >
                <div
                    className="self-stretch isOpened rounded-lg flex-col justify-start items-start gap-1 flex"
                >
                    <div
                        className="self-stretch isOpened pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-3 flex"
                    >
                        {collaborators.map((collaborator, index) => (
                            <div key={index}
                                 className="grow shrink basis-0 isOpened justify-start items-center gap-2.5 flex w-full">
                                <input
                                    type="text"
                                    value={collaborator.address}
                                    onChange={(e) => handleCollaboratorChange(index, e)}
                                    className="p-4 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                                    placeholder="0x..."
                                />
                                {collaborators.length > 1 && (
                                    <button onClick={() => removeCollaborator(index)}>
                                        <FontAwesomeIcon icon={faCircleXmark}/>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className=" justify-center items-center gap-1 inline-flex"
            >
                <button onClick={addCollaborator}
                        className="px-4 py-2 rounded-lg border border-neutral-800 text-neutral-800 text-sm font-bold font-['DM Sans'] leading-tight">
                    Add more
                </button>
            </div>
        </div>


    )
        ;
};

export default CollaboratorsComponent;