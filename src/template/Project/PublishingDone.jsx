import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import { Link } from "react-router-dom";
import pageDAOGuy from "../../assets/pagedao-guy.svg";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { TasksContext } from "../Providers/TasksContext.js";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function PublishingDone() {
    const projects = useContext(TasksContext);
    const { projectIndex, itemIndex } = useParams();
    const { user } = useDynamicContext();
  return (
    <>
      <TopNav />
      <div className="px-52 py-10 bg-dao-primary w-full">
        <div className="container mx-auto justify-center gap-20 flex-col ">
          <h1 className="grow shrink basis-0 text-center text-neutral-50 text-4xl font-bold font-['Arvo']">
            All done!
          </h1>
          <h2 className="mt-4 self-stretch text-center text-neutral-50  font-normal font-['Arvo']">
            {projects && projects[projectIndex] && projects[projectIndex].items[itemIndex] && projects[projectIndex].items[itemIndex].name}
          </h2>
        </div>
      </div>
      <div className="bg-dao-primary w-full pb-14">
        <div className="container mx-auto justify-center flex flex-col w-full">
          <div className="flex flex-col w-full mb-10">
            <img src={pageDAOGuy} alt="Done" className="h-80" />
          </div>
          <div className="flex-col justify-end items-center gap-2 inline-flex">
            <div className="text-center text-neutral-50 text-xl font-bold font-['DM Sans'] leading-7">
              Nice! Your {projects && projects[projectIndex] && projects[projectIndex].items[itemIndex] && projects[projectIndex].items[itemIndex].type} is now on the market.
            </div>
            <div className="justify-center items-end gap-2 inline-flex">
              <div className="px-8 py-3 rounded-lg border border-neutral-800 justify-center items-center gap-1 flex">
                <Link
                    to={user && projects && projects[projectIndex] && ("/book/" + user.userId + "/" + projects[projectIndex].id + "/" + itemIndex)} 
                    className="text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug"
                >
                  See on marketplace
                </Link>
              </div>
              <div className="px-8 py-3 rounded-lg border border-neutral-800 justify-center items-center gap-1 flex">
                <Link
                  to={projects && projects[projectIndex] && "/project/" + projectIndex}
                  className="text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug"
                >
                  Return to project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PublishingDone;
