import {useDynamicContext} from "@dynamic-labs/sdk-react-core";
import iconGrayColor from "../../assets/icon-gray-color.svg";
import createHand from "../../assets/create-hand.svg";
import CollapsableSection from "./CollapsableSection.jsx";
import SideBar from "./SideBar.jsx";
import Modal from 'react-modal';
import React from 'react';
import NewProjectModal from "./NewProjectModal.jsx";

function Content() {
    const {user} = useDynamicContext();

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="w-full bg-neutral-100">
                <div className="container mx-auto py-10 flex justify-between gap-4">
                    <div className="basis-3/4 flex-col justify-start items-start gap-8 inline-flex w-full">

                        <CollapsableSection
                            title="What I created"
                            content={"You haven’t create any project yet..."}
                            buttonLabel="Create"
                            imageSrc={createHand}
                            onActionButtonClick={() => {
                                openModal();
                            }}
                        />

                        <NewProjectModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />


                        <CollapsableSection
                            title="What I purchased"
                            content={"You haven’t collected any book yet..."}
                            buttonLabel="Discover"
                            imageSrc={iconGrayColor}
                            onActionButtonClick={() => {
                                console.log("Button clicked!");
                            }}
                        />

                    </div>
                    <div className="basis-1/4 w-full">
                        <SideBar/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Content;