import ProjectDetail from "./ProjectDetail.jsx";
import Header from "./Header.jsx";
import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useParams, useNavigate } from "react-router-dom";

function Project() {
    const { projectIndex } = useParams();
    const { user } = useDynamicContext();
  // todo: replace "projectInfo" with actual project data from the API
  /*    const projectInfo = {
        title: "Project Title",
        description: "Project Description",
        stats: {
            created: "dd/mm/yyyy",
            books: 0,
            collections: 0,
            collaborators: "None"
        }
    }
*/
    const navigate = useNavigate();
// if the projectIndex is missing, redirect to the dashboard
    if (projectIndex===undefined) {
        navigate("/project");
    }
  const projectInfo = user?.metadata?.projects[projectIndex];

  return (
    <>
      <TopNav />
      <Header title={projectInfo.title} breadcrumb="My Books" />
      <ProjectDetail projectIndex={projectIndex} project={projectInfo}/>
      <Footer />
    </>
  );
}

export default Project;
