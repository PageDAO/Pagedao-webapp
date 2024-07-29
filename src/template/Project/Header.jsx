import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useDynamicContext, useUserUpdateRequest } from "@dynamic-labs/sdk-react-core";
import { TasksContext, TasksDispatchContext } from "../Providers/TasksContext";

function Header({
  title: initialTitle,
  projectIndex,
  breadcrumb,
  breadcrumbLink = "/",
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const { updateUser } = useUserUpdateRequest();
  const projects = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const user = useDynamicContext();

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    projects[projectIndex].title = title;
    projects[projectIndex].text = title;
    dispatch({
      type: "changed",
      task: projects[projectIndex].id,
      metadata: user.metadata,
      userUpdateFunction: updateUser,
    });
    console.log("Title changed to:", title);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <>
      <div className="w-full bg-gray-50">
        <div className="container mx-auto py-10 flex justify-between">
          <div className="grow shrink basis-0 flex-col justify-end items-start gap-4 inline-flex">
            <div className="self-stretch justify-start items-center inline-flex mb-4">
              <Link
                to={breadcrumbLink}
                className="text-orange-800 text-base font-normal font-['DM Sans'] leading-snug"
              >
                {breadcrumb}
              </Link>
            </div>
            <div className="self-stretch pr-16 justify-start items-start gap-2 inline-flex">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="text-neutral-800 text-6xl font-bold font-['Arvo'] leading-10"
                />
              ) : (
                <h1
                  onClick={handleTitleClick}
                  className="grow shrink basis-0 text-neutral-800 text-6xl font-bold font-['Arvo'] leading-10"
                >
                  {title}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
