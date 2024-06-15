import React, { useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../Layout/TopNav.jsx";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
import axios from "axios";

import * as Toast from "@radix-ui/react-toast";
import { useUserUpdateRequest } from "@dynamic-labs/sdk-react-core";

function ItemView() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const timerRef = React.useRef(0);
  const [item, setItem] = React.useState(null);

  const { userId, projectId, itemId } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      if (!item)
        try {
          const queryURL = `${
            import.meta.env.VITE_APP_BACKEND_API_URL
          }/usermetadata?userid=${userId}`;
          console.log("fetch projects queryURL: ", queryURL);
          const result = await axios.get(queryURL);
          console.log("fetch projects response: ", result.data.tasks);
          const project = result.data.tasks.find(
            (project) => project.id == projectId
          );
          console.log("Project data", project);
          const currentItem = project.items[itemId];
          setItem(currentItem);
          console.log("Item data", currentItem);
        } catch (error) {
          console.error("Error fetching project data", error);
        }
    };
    fetchData();
  }, [item, userId, itemId, projectId]);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  //todo: query the user's projects and items from the backend - use a reducer?

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <TopNav />
      <Toast.Provider>
        <div className="w-full bg-neutral-100">
          <div className="container mx-auto py-10 flex justify-between gap-4">
            <div className="flex-col justify-start items-start gap-8 inline-flex w-full">
              {item ? (
                <iframe
                  allowFullScreen
                  className="flex-col justify-start items-center gap-4 w-full min-h-96 inline-flex"
                  src={`https://ipfs.nftbookbazaar.com/ipfs/${item.interactiveURL}`}
                />
              ) : (
                <div className="spinner-container flex-col justify-start items-center gap-4 w-full min-h-96 inline-flex">
                  <div className="spinner"></div>
                </div>
              )}

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
      <Footer />
    </>
  );
}

export default ItemView;
