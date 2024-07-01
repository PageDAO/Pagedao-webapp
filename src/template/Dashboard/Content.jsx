import iconGrayColor from "../../assets/icon-gray-color.svg";
import createHand from "../../assets/create-hand.svg";
import CollapsableSection from "./CollapsableSection.jsx";
import SideBar from "./SideBar.jsx";
import React, { useMemo, useContext } from "react";
import ProjectModal from "../Project/ProjectModal.jsx";
import CollapsableEmptySection from "./CollapsableEmptySection.jsx";
import {
  TasksContext,
  TasksDispatchContext,
} from "../Providers/TasksContext.js";
import * as Toast from "@radix-ui/react-toast";
import { useUserUpdateRequest } from "@dynamic-labs/sdk-react-core";

function Content() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const timerRef = React.useRef(0);

  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const { updateUser } = useUserUpdateRequest();


  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const nextItemId = useMemo(
    () =>
      tasks ? tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1 : null,
    [tasks]
  );

  //todo: fix functionality for opening new item creation only when no items exits
  function openModal() {
    setIsOpen(true);
  }

  function editProject(id) {
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      setToastMessage("Not currently available");
    }, 100);
  }

  function deleteProject(id) {
    setOpen(false);
    console.log("deleting project id" + id);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      dispatch({
        type: "deleted",
        id: id,
        userUpdateFunction: updateUser,
      });
      setToastMessage("Project deleted");
    }, 100);
  }

  function shareProject(id) {
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      setToastMessage("Not currently available");
    }, 100);
  }
  return (
    <>
      <Toast.Provider>
        <div className="w-full bg-neutral-100">
          <div className="container mx-auto py-10 flex justify-between gap-4">
            <div className="basis-3/4 flex-col justify-start items-start gap-8 inline-flex w-full">
              <CollapsableSection
                title="What I created"
                items={TasksContext}
                emptyContent={"You haven’t created any projects yet..."}
                emptyButtonLabel="Create"
                buttonLabel="Create new project"
                imageSrc={createHand}
                onActionButtonClick={openModal}
                dropdownMenuActions={{
                  edit: editProject,
                  delete: deleteProject,
                  share: shareProject,
                }}
              />

              <ProjectModal
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                type="added"
                itemID={nextItemId}
              />
              <Toast.Root
                className="ToastRoot"
                open={open}
                onOpenChange={setOpen}
              >
                <Toast.Title className="ToastTitle">{toastMessage}</Toast.Title>
                <Toast.Description asChild></Toast.Description>
                <Toast.Action className="ToastAction" asChild altText="undo">
                  <button className="Button small green">Undo</button>
                </Toast.Action>
              </Toast.Root>
              <Toast.Viewport className="ToastViewport" />
            </div>
            <div className="basis-1/4 w-full">
              <SideBar projects={tasks}/>
            </div>
          </div>
        </div>
      </Toast.Provider>
    </>
  );
}

export default Content;
