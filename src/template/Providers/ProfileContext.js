import { createContext, useReducer, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { pinToIPFS } from "../Utils";

export const ProfileContext = createContext(null);
export const ProfileDispatchContext = createContext(null);

export async function saveMetadata(tasks, metadata, profileHash, ownedHash) {
  const file = new File(
    [JSON.stringify({ tasks: tasks })],
    "userMetadata.json",
    {
      type: "application/json",
    }
  );
  const metadataHash = await pinToIPFS(
    file,
    "userMetadata.json",
    import.meta.env.VITE_APP_IPFS_API_URL
  );
  return { metadata: { hash: metadataHash, profileHash: profileHash, ownedHash: ownedHash } };
}

const initialProfile = [];

export function ProfileProvider({ children }) {
  const [profile, dispatch] = useReducer(profileReducer, initialProfile);
  const { user, isAuthenticated } = useDynamicContext();
  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          // Make a GET request to the API
          console.log("fetching", user.metadata);
          if (user.metadata.profileHash === undefined) {
            dispatch({ type: "initialized", profile: [] });
            return;
          }
          const response = await axios
            .get(
              `${import.meta.env.VITE_APP_IPFS_GATEWAY_URL}/${
                user.metadata.profileHash
              }`
            )
            .catch((error) => {
              console.log("fetch error", error);
              dispatch({ type: "error", payload: error.message });
            })
            .finally(() => {
              console.log("fetch finally");
            });

          // Dispatch an action to update the context state with fetched projects
          dispatch({ type: "initialized", tasks: response.data.profile });
        } else {
          dispatch({ type: "error", payload: "User not authenticated" });
        }
      } catch (error) {
        // Dispatch an action in case of an error
        dispatch({ type: "error", payload: error.message });
      }
    };
    fetchData();
  }, [user, isAuthenticated]);

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

function profileReducer(profile, action) {
  const saveIfNecessary = (userUpdateFunction, projects, profile, owned) => {
    if (userUpdateFunction)
      saveMetadata(projects, profile, owned).then((value) => {
        userUpdateFunction(
          value,
          import.meta.env.VITE_APP_DYNAMIC_ENVIRONMENT_ID
        );
      });
  };
  switch (action.type) {
    case "initialized":
      return action.profile;
    case "added":
      saveIfNecessary(action.userUpdateFunction, profile, action.payload);
      return [...profile, action.payload];
    case "deleted":
      saveIfNecessary(
        action.userUpdateFunction,
        profile.filter((profile) => profile.id !== action.id)
      );
      return profile.filter((profile) => profile.id !== profile.id);
    case "error":
      return { error: action.payload };
    default:
      return profile;
  }
}