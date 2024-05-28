import React from "react";
import ProjectItem from "./ProjectItem.jsx";
import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowUpAZ,
  ArrowUpNarrowWide,
  Search,
} from "lucide-react";
import ProjectStats from "./ProjectStats.jsx";

function ProjectDetail({ projectIndex, project }) {
  let show = true;

  return (
    <>
      <div className="w-full bg-neutral-100">
        <div className="container mx-auto py-10 flex justify-between gap-4">
          <div className="basis-3/4 flex-col justify-start items-start gap-8 inline-flex w-full">
            <div className="flex gap-2 w-full">
              <div className="flex flex-col w-full grow">
                <div className="relative flex items-center">
                  <input
                    type={show ? "text" : "password"}
                    name="search"
                    id="search"
                    className="h-11 flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded-lg text-sm text-gray-900 w-full"
                    placeholder="Search"
                  />
                  <button
                    type="button"
                    className="absolute right-2 bg-transparent flex items-center justify-center text-gray-700"
                  >
                    <Search />
                  </button>
                </div>
              </div>
              <div>
                <button className="relative group transition-all duration-200 focus:overflow-visible w-max h-11 px-6 py-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-lg border border-zinc-200">
                  <span>Newest to Oldest</span>
                  <ArrowDownWideNarrow />

                  {/* Dropdown */}
                  <div className="absolute shadow-lg -bottom-40 left-0 w-full h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2">
                    <span className="flex flex-row justify-between gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg">
                      <p>Oldest to Newest</p>
                      <ArrowUpNarrowWide />
                    </span>

                    <span className="flex flex-row justify-between gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg">
                      <p>A-Z</p>
                      <ArrowDownAZ />
                    </span>

                    <span className="flex flex-row justify-between gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg">
                      <p>Z-A</p>
                      <ArrowUpAZ />
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 w-full">
                <ProjectItem projectIndex={projectIndex}/>
              {project.items?.map((item, index) => (
                <ProjectItem
                  key={index}
                  projectIndex={projectIndex}
                  project={project}
                  item={item}
                  itemIndex={index}
                />
              ))}
            </div>
          </div>

          <div className="basis-1/4 w-full">
            <ProjectStats />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetail;
