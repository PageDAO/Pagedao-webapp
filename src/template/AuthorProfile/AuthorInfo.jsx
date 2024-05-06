// AuthorInfo.jsx
import { XCircle } from "lucide-react";
import React from "react";
function AuthorInfo({author, iscurrentuser }) {
  return (
    <div>
      <button className="mb-5 text-medium">Back</button>
      <div className="flex justify-between">
        <div className="flex flex-col mr-4">
          <div className="mb-4">
            <h2 className="text-neutral-800 text-ex-large font-bold font-['Arvo']">
              {author.alias}
            </h2>
          </div>
          <div
            className="font-['DM Sans'] leading-tight text-medium"
            style={{
              maxWidth: "500px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {author.bio}
          </div>
          <div className="flex justify-start items-center">
            <div className="mt-5 relative w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
              <span className="text-white ">Pic</span>
            </div>
            <div className="text-medium font-['DM Sans'] leading-tight ml-3 mt-5">
              wallet address
            </div>
          </div>
        </div>
        <div className="flex flex-col mr-20">
          <div className="mb-4 mt-4">
            {" "}
            <div className="flex items-center">
              {" "}
              {/* Add this line */}
              <XCircle className="mr-3" />
              <a href="https://getbootstrap.com/docs/5.0/content/images/#picture">
                web url
              </a>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              {" "}
              {/* Add this line */}
              <XCircle className="mr-3" />
              <a href="https://getbootstrap.com/docs/5.0/content/images/#picture">
                social link
              </a>
            </div>
          </div>
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-3 mt-12 rounded text-medium"
            style={{ whiteSpace: "nowrap" }}
          >
            Edit profile
          </button>
        </div>
      </div>
      {/* <p>author.bioauthor.bio</p> */}

      {/* Add AuthorAvatar, AuthorAddresses, AuthorWebpage, and AuthorSocial here */}
    </div>
  );
}

export default AuthorInfo;
