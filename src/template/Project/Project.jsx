import ProjectDetail from "./ProjectDetail.jsx";
import Header from "./Header.jsx";
import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TasksContext } from "../Providers/TasksContext.js";

function Project() {
    const [isLoading, setIsLoading] = useState(true);
    const { projectIndex } = useParams();
    const projects = useContext(TasksContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (projects && projects.length > 0) {
            setIsLoading(false);
        }
    }, [projects]);

// if the projectIndex is missing, redirect to the dashboard
    if (projectIndex===undefined) {
        navigate("/");
    }

  return (
    <>
      <TopNav />
      {!isLoading ? (
        <>
      <Header title={projects[projectIndex].title} projectIndex={projectIndex} breadcrumb="My Books" />
      <ProjectDetail projectIndex={projectIndex}/>
      </>
      ):("Loading...")}
      <Footer />
    </>
  );
}

export default Project;
