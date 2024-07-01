
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import AuthorInfo from './AuthorInfo';
import AuthorGallery from './AuthorGallery';
import axios from 'axios';

import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";

function AuthorProfile() {
    const { userId } = useParams(); // Get userId from URL parameters

    const { user } = useDynamicContext();
    const [author, setAuthor] = useState(null);
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    useMemo(() => {
        const fetchAuthor = async () => {
            try {

                //todo: refactor this to make the api url a config variable
                axios.defaults.headers.get['Content-Type'] = 'application/json';
                const response = await axios.get(import.meta.env.VITE_APP_BACKEND_API_URL+`/usermetadata?userid=${userId}`);
                setAuthor(response.data);
            } catch (error) {
                console.error('Failed to fetch author:', error);
            }
        };

        fetchAuthor();

    }, [userId]); // Re-run the effect when userId changes
    

    return (
        <>
            <TopNav/>
            <div className="workspace">
            {author?(
                <div className="container mx-auto">
                    <AuthorInfo author={author} isCurrentUser={isCurrentUser} />
                    <AuthorGallery books={author} isCurrentUser={isCurrentUser} />
                
                </div>
            ):(<p>Loading...</p>)}
            </div>
            <Footer/>
        </>
    );
}

export default AuthorProfile;