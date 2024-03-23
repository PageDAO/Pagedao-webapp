
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
// AuthorProfile.

import AuthorInfo from './AuthorInfo';
import AuthorGallery from './AuthorGallery';
import axios from 'axios';


function AuthorProfile() {
    const { userId } = useParams(); // Get userId from URL parameters

    const { user } = useDynamicContext();
    const [author, setAuthor] = useState(null);

    // Check if user is the same as the userId parameter
    const isCurrentUser = user && user.id === userId;


    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`https://app.dynamicauth.com/api/v0/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_DYNAMIC_API_KEY}`
                    }
                });
                setAuthor(response.data);
            } catch (error) {
                console.error('Failed to fetch author:', error);
            }
        };

        fetchAuthor();
    }, [userId]); // Re-run the effect when userId changes

    if (!author) return 'Loading...'; // Show loading message while author data is being fetched
    
  return (
    <div>
        <AuthorInfo author={author} isCurrentUser={isCurrentUser} />
        <AuthorGallery books={author.books} isCurrentUser={isCurrentUser} />
    </div>
  );
}

export default AuthorProfile;