import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import AuthorInfo from "./AuthorInfo";
import AuthorGallery from "./AuthorGallery";
import axios from "axios";

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
        console.log("trying to fetch author with userId:", userId);
        //todo: refactor this to make the api url a config variable
        axios.defaults.headers.get["Content-Type"] = "application/json";
        const response = await axios.get(
          import.meta.env.VITE_APP_BACKEND_API_URL +
            `/usermetadata?userid=${userId}`
        );
        setAuthor(response.data);
        console.log("author profile:", response.data);
        if (user && userId == user.id) {
          setIsCurrentUser(true);
        }
      } catch (error) {
        console.error("Failed to fetch author:", error);
      }
    };

    fetchAuthor();
  }, [userId, user]); // Re-run the effect when userId changes

  return (
    <>
      <TopNav />
      <div className="workspace">
        {author ? (
          <div className="container mx-auto">
            <AuthorInfo author={author} isCurrentUser={isCurrentUser} />
            <AuthorGallery author={author} isCurrentUser={isCurrentUser} />
          </div>
        ) : (
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default AuthorProfile;
