
import React, { useMemo, useContext } from "react";
import ProjectModal from "../Project/ProjectModal.jsx";

import * as Toast from "@radix-ui/react-toast";

function ProjectView() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  //todo: query the user's projects and items from the backend - use a reducer?

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Toast.Provider>
        <div className="w-full bg-neutral-100">
          <div className="container mx-auto py-10 flex justify-between gap-4">
            <div className="basis-3/4 flex-col justify-start items-start gap-8 inline-flex w-full">
            Project View
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
          </div>
        </div>
      </Toast.Provider>
    </>
  );
}

export default ProjectView;
