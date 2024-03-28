
import { useEffect, useState } from "react";
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

    useEffect(() => {
        const fetchAuthor = async () => {
            try {

                //todo: refactor this to make the api url a config variable
                axios.defaults.headers.get['Content-Type'] = 'application/json';
                const response = await axios.get(`https://s9x201dz-5000.use.devtunnels.ms/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_DYNAMIC_API_KEY}`
                    },
                    query: {
                        "filter": {
                            "filterColumn": "alias",
                            "filterValue": userId
                        }
                    }
                });
                setAuthor(response.data);
            } catch (error) {
                console.error('Failed to fetch author:', error);
            }
        };

        fetchAuthor();
        if (author && author.userId === user.userId) {
            setIsCurrentUser(true);
        }

    }, [author, user, userId]); // Re-run the effect when userId changes
    


    return (
        <>
            <TopNav/>
            {author?(
                <>
                    <AuthorInfo author={author} isCurrentUser={isCurrentUser} />
                    <AuthorGallery books={author} isCurrentUser={isCurrentUser} />
                </>
            ):(<p>Loading...</p>)}
            <Footer/>
        </>
    );
}

export default AuthorProfile;