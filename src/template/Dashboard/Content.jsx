import {useDynamicContext} from "@dynamic-labs/sdk-react-core";
import iconGrayColor from "../../assets/icon-gray-color.svg";
import createHand from "../../assets/create-hand.svg";
import CollapsableSection from "./CollapsableSection.jsx";
import SideBar from "./SideBar.jsx";
import Modal from 'react-modal';
import React from 'react';
import ProjectModal from "../Project/ProjectModal.jsx";

function Content() {
    const {user} = useDynamicContext();

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    const projects = [
        {
            title: "Project 1",
            description: "This is the first project"
        },
        {
            title: "Project 2",
            description: "This is the second project"
        },
        {
            title: "Project 3",
            description: "This is the third project"
        }
    ]


    return (
        <>
            <div className="w-full bg-neutral-100">
                <div className="container mx-auto py-10 flex justify-between gap-4">
                    <div className="basis-3/4 flex-col justify-start items-start gap-8 inline-flex w-full">

                        <CollapsableSection
                            title="What I created"
                            items={projects}
                            emptyContent={"You haven’t create any project yet..."}
                            emptyButtonLabel="Create"
                            buttonLabel="Create new project"
                            imageSrc={createHand}
                            onActionButtonClick={() => {
                                openModal();
                            }}
                        />

                        <ProjectModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />


                        <CollapsableSection
                            title="What I purchased"
                            emptyContent={"You haven’t collected any book yet..."}
                            emptyButtonLabel="Discover"
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