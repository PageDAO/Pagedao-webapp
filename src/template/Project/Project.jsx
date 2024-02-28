import ProjectDetail from "./ProjectDetail.jsx";
import Header from "./Header.jsx";
import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";

function Project() {

    const projectInfo = {
        title: "Project Title",
        description: "Project Description",
        stats: {
            created: "dd/mm/yyyy",
            books: 0,
            collections: 0,
            collaborators: "None"
        }
    }


    return (
        <>
            <TopNav/>
            <Header title={projectInfo.title} breadcrumb="My Books"/>
            <ProjectDetail/>
            <Footer/>
        </>
    )
}

export default Project;