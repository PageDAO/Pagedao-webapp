import Header from "./Header.jsx";
import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import AddBookDetail from "./AddBookDetail.jsx";
import { useParams } from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from "react";
import { fetchMetadata } from "../Utils";

function AddBook() {

    // check the status of the book - whether it's been published or not, if it has, navigate to the ViewBook page and pass in the chain agnosic identifier

    const {projectIndex} = useParams();
    const { user } = useDynamicContext();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function fetchMeta() {
            const metadata = await fetchMetadata(user?.metadata.hash);
            console.log(metadata);
            setProjects(metadata.projects);
            setIsLoading(false);
        }
        fetchMeta();
      }, [user?.metadata, isLoading]);
    
    return (
        <>
            <TopNav/>
            <Header title={isLoading?"":projects[projectIndex].title} breadcrumb="Back" breadcrumbLink={{pathname: `/project/${projectIndex}`}}/>
            <div className="container mx-auto">
                Add a new item to your project.
            </div>
            <AddBookDetail project={projects[projectIndex]} projectIndex={projectIndex}/>
            <Footer/>
        </>
    )
}

export default AddBook;