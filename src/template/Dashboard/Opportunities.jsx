"use client";

import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import { HiBars2, HiSquaresPlus } from "react-icons/hi2";
import UpdateSection from "./UpdateSection.jsx";

export default function Opportunities() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button className="bg-white px-4 py-3 rounded-xl cursor-pointer text-neutral-800 text-base font-medium font-['DM Sans'] leading-snug" onClick={() => setIsOpen(true)}>Opportunities</button>
      <Drawer
        edge
        open={isOpen}
        onClose={handleClose}
        position="bottom"
        className="p-0"
      >
        <Drawer.Header
          closeIcon={HiBars2}
          title="Get Involved"
          titleIcon={HiSquaresPlus}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer px-4 pt-4 hover:bg-gray-50 dark:hover:bg-gray-700"
        />
        <Drawer.Items className="p-4">
          <UpdateSection />
        </Drawer.Items>
      </Drawer>
    </>
  );
}
