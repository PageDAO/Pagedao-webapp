import Header from "./Header.jsx";
import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import AddBookDetail from "./AddBookDetail.jsx";
import { useParams } from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect, useContext } from "react";
import { TasksContext } from "../Providers/TasksContext.js";

function AddBook() {
  // check the status of the book - whether it's been published or not, if it has, navigate to the ViewBook page and pass in the chain agnosic identifier

  const params = useParams();
  const projects = useContext(TasksContext);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (projects && projects.length > 0) {
      setIsLoading(false);
    }
  }, [projects]);

  return (
    <>
      <TopNav />
      {!isLoading ? (
        <>
          <Header
            title={projects[params.projectIndex].title}
            breadcrumb="Back"
            breadcrumbLink={{ pathname: `/project/${params.projectIndex}` }}
          />
          <div className="container mx-auto">
            Add a new item to your project.
          </div>

          <AddBookDetail
            projectIndex={params.projectIndex}
            itemIndex={params.itemIndex}
          />
        </>
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}

export default AddBook;
