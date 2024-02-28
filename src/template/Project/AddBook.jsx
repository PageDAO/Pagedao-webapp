import ProjectDetail from "./ProjectDetail.jsx";
import Header from "./Header.jsx";
import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import AddBookDetail from "./AddBookDetail.jsx";

function AddBook() {

    const projectInfo = {
        title: "Project Title",
        description: "Project Description",
        category: "My Books",
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
            <Header title="Adding a Book" breadcrumb="Back" breadcrumbLink={"/project"}/>
            <AddBookDetail/>
            <Footer/>
        </>
    )
}

export default AddBook;