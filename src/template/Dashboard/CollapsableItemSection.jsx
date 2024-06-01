import React from "react";
import { Book, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import '../../assets/styles.css';


function CollapsableItemSection({
  index,
  title,
  item,
  emptyContent,
  emptyButtonLabel,
  buttonLabel,
  imageSrc,
  onActionButtonClick,
  dropdownMenuActions,
}) {
  return (
    <>
      <div className="flex-row justify-between items-center gap-2 flex">
        <Link
          to={{
            pathname: `/book/edit/${index}`,
          }}
          className=""
        >
          <div className="justify-start items-start gap-4 flex">
            <div className="relative bg-neutral-300 rounded-lg p-8">
              <Book />
            </div>
            <div className="flex-col justify-center items-start gap-2 inline-flex">
              <span className="text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7">
                {item.text || "Unnamed Project"}
              </span>
              <span className="text-neutral-500 text-base font-normal font-['DM Sans'] leading-snug">
                {item.description || "No description available"}
              </span>
            </div>
          </div>
        </Link>
        <div className="justify-end items-center gap-4 flex">
          <div className="text-neutral-500 text-base font-normal font-['DM Sans'] leading-snug">
            0 collections / 0 books {index}
          </div>

          {/* todo: create a dropdown menu displaying delete project option*/}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <MoreHorizontal />
            </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
              <DropdownMenu.Item className="DropdownMenuItem" onClick={()=>dropdownMenuActions.delete(index)}>
                Delete <div className="RightSlot">(permanently)</div>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="DropdownMenuItem">
                Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item className="DropdownMenuItem" disabled>
                Share
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
          </DropdownMenu.Root>

        </div>
      </div>
    </>
  );
}

export default CollapsableItemSection;
