
"use client";

import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEnvelope } from "react-icons/hi2";
import { useDynamicContext, useUserUpdateRequest } from "@dynamic-labs/sdk-react-core";

export default function Invite() {
  const { user } = useDynamicContext();
  const [numInvites, setNumInvites] = useState(10);

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (user && user.metadata && user.metadata.invites) {
      setNumInvites(user.metadata.invites);
    }
  }, [user]);

  return (
    <>
      <div>
      <button className="px-4 py-2 bg-red-50 rounded-lg text-black" onClick={() => setIsOpen(true)}>Invites: {numInvites}</button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
      <Drawer.Header title="Invite a Creator" titleIcon={HiEnvelope} />
      <Drawer.Items>
        <form action="#">
        <div className="mb-6">
          {numInvites} invites remaining
        </div>
        <div className="mb-6 mt-3">
          <Label htmlFor="email" className="mb-2 block">
          Email of invitee
          </Label>
          <TextInput id="email" name="email" placeholder="name@domain.com" type="email" />
        </div>
        <div className="mb-6">
          <Label htmlFor="subject" className="mb-2 block">
          Subject
          </Label>
          <TextInput id="subject" name="subject" placeholder="Invitation to PageDAO Alpha" />
        </div>
        <div className="mb-6">
          <Label htmlFor="message" className="mb-2 block">
          Your message
          </Label>
          <Textarea id="message" name="message" placeholder="Your message..." rows={4} />
        </div>
        <div className="mb-6">
          <Button type="submit" className="w-full">
          Send message
          </Button>
        </div>

        </form>
      </Drawer.Items>
      </Drawer>
    </>
    );
}
