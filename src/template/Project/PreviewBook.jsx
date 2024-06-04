import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import PreviewBookDetail from "./PreviewBookDetail.jsx";
import { useParams } from "react-router-dom";

function PreviewBook() {
    const params = useParams();
    return (
        <>
            <TopNav/>
            <PreviewBookDetail projectIndex={params.projectIndex} itemIndex={params.itemIndex}/>
            <Footer/>
        </>
    )
}

export default PreviewBook;