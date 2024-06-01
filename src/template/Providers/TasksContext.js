import { createContext, useReducer, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { pinToIPFS } from "../Utils";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export async function saveMetadata(tasks) {
  const file = new File([JSON.stringify({'tasks':tasks})], "userMetadata.json", {
    type: "application/json",
  });
  const metadataHash = await pinToIPFS(
    file,
    "userMetadata.json",
    import.meta.env.VITE_APP_IPFS_API_URL
  );
  return { metadata: { hash: metadataHash } };
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const { user, isAuthenticated } = useDynamicContext();
  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          // Make a GET request to the API
          console.log("fetching", user.metadata);
          if (user.metadata.hash === undefined) {
            dispatch({ type: "initialized", tasks: [] });
            return;
          }
          const response = await axios
            .get(
              `${import.meta.env.VITE_APP_IPFS_GATEWAY_URL}/${
                user.metadata.hash
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
          dispatch({ type: "initialized", tasks: response.data.tasks });
        } else {
          dispatch({ type: "error", payload: "User not authenticated" });
        }
      } catch (error) {
        // Dispatch an action in case of an error
        dispatch({ type: "error", payload: error.message });
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, [user, isAuthenticated]); // dependency array that should run the effect when the hash changes

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "initialized": {
      return action.tasks && action.tasks.length>0 ? [...action.tasks] : [];
    }
    case "added": {
        const newTasks = [
            ...tasks,
            {
              id: action.id,
              text: action.text,
              title: action.title,
              description: action.description,
              items: action.items,
              done: false,
            },
          ];
      if (action.userUpdateFunction)
        saveMetadata(newTasks).then((value)=>{action.userUpdateFunction(value, import.meta.env.VITE_APP_DYNAMIC_ENVIRONMENT_ID)});
      return newTasks;
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      console.log(action.type, action); //throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [];
/*
const noninitialTasks = [
  {
    id: 0,
    text: "Philosopher’s Path",
    title: "Philosopher’s Path --",
    description: "the only way is up",
    items: [{ name: "pre-drop", description: "best philosopher pre-drop" }],
    done: true,
  },
  {
    id: 1,
    text: "Visit the temple",
    title: "Visit the temple --",
    description: "travel is fun",
    items: [],
    done: false,
  },
  {
    id: 2,
    text: "Drink matcha",
    title: "Drink matcha --",
    description: "kava matcha watcha go",
    items: [],
    done: false,
  },
];
*/