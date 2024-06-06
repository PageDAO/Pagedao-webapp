import { createContext, useContext, useReducer, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import axios from 'axios';

// Creating a Context
const ProjectsContext = createContext(null);

// Initial state for the context
const initialState = { projects: [], error: null };

// Reducer function to handle state changes
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      // Update state with fetched projects and clear any existing error
      return { projects: action.payload, error: null };
    case 'FETCH_ERROR':
      // Update state with an error and an empty array of projects
      console.log("fetch error", action.payload);
      return { projects: [], error: action.payload };
    default:
      // Return current state if the action type doesn't match
      return state;
  }
};

// Context Provider component
export const ProjectsProvider = ({ children }) => {
  // useReducer hook to manage state and dispatch actions
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated} = useDynamicContext();
  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
        // Make a GET request to the API
        const response = await axios.get(`${import.meta.env.VITE_APP_IPFS_GATEWAY_URL}/${user.metadata.hash}`);

        // Dispatch an action to update the context state with fetched projects
        dispatch({ type: 'FETCH_PROJECTS', payload: response.data });
        } else {
          dispatch({ type: 'FETCH_ERROR', pyload: "User not authenticated"});
        }
      } catch (error) {
        // Dispatch an action in case of an error
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, [user, isAuthenticated]); // dependency array that should run the effect when the hash changes

  // Providing the context value to its descendants
  return (
    <ProjectsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Custom hook to conveniently consume the context
export const useProjectsContext = () => {
  const value = useContext(ProjectsContext);

  if (!value) {
    throw new Error('🗣️ useProjectsContext hook used without ProjectsContext!');
  }

  return value;
};