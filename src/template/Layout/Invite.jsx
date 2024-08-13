"use client";

import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import { HiEnvelope } from "react-icons/hi2";
import {
  useDynamicContext,
  useUserUpdateRequest,
} from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import * as Toast from "@radix-ui/react-toast";

export default function Invite() {
  const { user } = useDynamicContext();
  const [numInvites, setNumInvites] = useState(10);
  const [toastMessage, setToastMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  const handleClose = () => setIsOpen(false);
  const { updateUser } = useUserUpdateRequest();

  function showToastMessage(message) {
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      setToastMessage(message);
    }, 200);
  }

  useEffect(() => {
    if (user && user.metadata && user.metadata.invites) {
      if (user.metadata.invites.count != numInvites)
        setNumInvites(user.metadata.invites.count);
    } else {
      if (user && user.metadata) {
        updateUser({ metadata: { ...user.metadata, invites: { count: 10 } } });
      }
    }
  }, [user, numInvites, updateUser]);

  const updateInvites = () => {
    updateUser({
      metadata: { ...user.metadata, invites: { count: numInvites - 1 } },
    });
    setNumInvites(numInvites - 1);
  };

  return (
    <>
      <div>
        <button
          className="px-4 py-2 bg-red-50 rounded-lg text-black"
          onClick={() => setIsOpen(true)}
        >
          Invites: {numInvites}
        </button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Invite a Creator" titleIcon={HiEnvelope} />
        <Drawer.Items>
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post(
                  import.meta.env.VITE_APP_BACKEND_API_URL + "/invite",
                  {
                    data: {
                      email: e.target.email.value,
                      from: e.target.from.value,
                      name: e.target.name.value,
                      message: e.target.message.value,
                    },
                  },
                  {
                    headers: { "Content-Type": "application/json" },
                  }
                )
                .then((response) => {
                  updateInvites();
                  showToastMessage("Invite sent successfully");
                  console.log(response);
                })
                .catch((error) => {
                  showToastMessage("Failed to send invite: " + error);
                  console.log(error);
                });
            }}
          >
            <div className="mb-6">{numInvites} invites remaining</div>
            <div className="mb-6 mt-3">
              <Label htmlFor="from" className="mb-2 block">
                From (Alias)
              </Label>
              <TextInput
                className="w-fit"
                id="from"
                name="from"
                value={user.alias}
              />
            </div>
            <div className="mb-6 mt-3">
              <Label htmlFor="name" className="mb-2 block">
                Name of invitee
              </Label>
              <TextInput
                className="w-fit"
                id="name"
                name="name"
                placeholder="Name of invitee"
              />
            </div>
            <div className="mb-6 mt-3">
              <Label htmlFor="email" className="mb-2 block">
                Email of invitee
              </Label>
              <TextInput
                className="w-fit"
                id="email"
                name="email"
                placeholder="name@domain.com"
                type="email"
              />
            </div>
            <div className="mb-6">
              <Label className="mb-2 block">Subject</Label>
              <span>{user.alias} invites you to the PageDAO WebApp!</span>
            </div>
            <div className="mb-6">
              <Label htmlFor="message" className="mb-2 block">
                Your message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                rows={4}
              />
            </div>
            <div className="mb-6">
              <Button type="submit" className="w-full">
                Send message
              </Button>
            </div>
          </form>
        </Drawer.Items>
      </Drawer>
      <Toast.Provider>
        <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
          <Toast.Title className="ToastTitle">{toastMessage}</Toast.Title>
          <Toast.Description asChild></Toast.Description>
          <Toast.Action className="ToastAction" asChild altText="undo">
            <button className="Button small green">Undo</button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </>
  );
}
