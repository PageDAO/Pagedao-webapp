import { atom, selector } from "recoil";
import axios from "axios";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

// Atom for posts state
export const projectsState = atom({
  key: "projectsState",
  default: selector({
    key: "projectsState/default",
    get: async () => {
      const { user, isAuthenticated } = useDynamicContext();
      if (isAuthenticated) {
        try {
          // Make a GET request to the API to fetch posts
          const response = await axios.get(
            `${import.meta.env.VITE_APP_IPFS_GATEWAY_URL}/${user.metadata.hash}`
          );
          return response.data;
        } catch (error) {
          // Throw an error if the API request fails
          throw error;
        }
      }
    },
  }),
});
