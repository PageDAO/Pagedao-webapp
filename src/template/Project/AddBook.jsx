import Header from "./Header.jsx";
import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import AddBookDetail from "./AddBookDetail.jsx";
import { useParams } from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function AddBook() {

    // check the status of the book - whether it's been published or not, if it has, navigate to the ViewBook page and pass in the chain agnosic identifier

    const {projectIndex} = useParams();
    const { user } = useDynamicContext();
    const projectInfo = user?.metadata?.projects[projectIndex];
    /*
    const projectInfo = {
        title: "Project Title",
        description: "Project Description",
        category: "My Books",
        items: [
            {
                name: "Name of NFT (chapter, book, preview, promo, etc.)",
                description: "Description of NFT",
                image: "https://via.placeholder.com/150",
                pdf: "https://via.placeholder.com/150",
                video: "https://via.placeholder.com/150",
                audio: "https://via.placeholder.com/150",
                encryptedfile: "https://via.placeholder.com/150",
                previewPages: 10,
                pages: 100,
                genre: "Genre",
                type: "Book",
                releases: [
                    {
                        chainId: 137,
                        contractAddress: "0x1234567890",
                        tokenStandard: "ERC721",
                        tokenId: "1234567890",
                        date: "dd/mm/yyyy",
                        price: 0,
                        currency: "ETH",
                        royalties: 0,
                        
                    }
                ],
                status: "Draft"
            }
        ]
        stats: {
            created: "dd/mm/yyyy",
            books: 0,
            collections: 0,
            collaborators: "None"
        }
    }
*/

    return (
        <>
            <TopNav/>
            <Header title={projectInfo?.title} breadcrumb="Back" breadcrumbLink={{pathname: `/project/${projectIndex}`}}/>
            <div className="container mx-auto">
                Add a new item to your project.
            </div>
            <AddBookDetail/>
            <Footer/>
        </>
    )
}

export default AddBook;