import { createContext, useReducer, useEffect } from "react";
import { useDynamicContext, useUserUpdateRequest } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { pinToIPFS } from "../Utils";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export async function saveMetadata(tasks, metadata) {
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
  return { metadata: {...metadata, hash: metadataHash} };
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const { user, isAuthenticated } = useDynamicContext();
  const { updateUser } = useUserUpdateRequest();
  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          // Make a GET request to the API
          console.log("user", user);
          console.log("fetching", user.metadata);
          if (user.metadata.hash === undefined) {
            dispatch({ type: "initialized", tasks: [], userUpdateFunction: updateUser, metadata: user.metadata });
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
  const saveIfNecessary = (userUpdateFunction, newTasks, metadata) => {
    if (userUpdateFunction)
      saveMetadata(newTasks, metadata).then((value) => {
        userUpdateFunction(
          value,
          import.meta.env.VITE_APP_DYNAMIC_ENVIRONMENT_ID
        );
      });
  };
  switch (action.type) {
    case "initialized": {
      //saveIfNecessary(action.userUpdateFunction, structuredClone(action.tasks), action.metadata);
      return action.tasks && action.tasks.length > 0 ? structuredClone(action.tasks) : [];
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
          nextItemID: 0,
          done: false,
        },
      ];
      saveIfNecessary(action.userUpdateFunction, newTasks, action.metadata);
      return newTasks;
    }
    case "changed": {
      const newTasks = tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
      saveIfNecessary(action.userUpdateFunction, newTasks, action.metadata);
      return newTasks;
    }
    case "deleted": {
      const newTasks = tasks.filter((t) => t.id !== action.id);
      saveIfNecessary(action.userUpdateFunction, newTasks, action.metadata);
      return newTasks;
    }
    case "projectItemAdded": {
      console.log("projectItemAdded called:", action);
      const newTasks = tasks.map((p) => {
        if (p.id === action.id) {
          p.nextItemID = p.nextItemID + 1;
          return {
            ...p,
            items: [...p.items, action.item],
          };
        } else {
          return p;
        }
      });
      saveIfNecessary(action.userUpdateFunction, newTasks, action.metadata);
      return newTasks;
    }
    case "projectItemChanged": {
      const newTasks = tasks.map((p) => {
        if (p.id === action.id) {
          return {
            ...p,
            items: p.items.map((i) => {
              if (i.id === action.item.id) {
                return action.item;
              } else {
                return i;
              }
            }),
          };
        } else {
          return p;
        }
      });
      saveIfNecessary(action.userUpdateFunction, newTasks, action.metadata);
      return newTasks;
    }
    default: {
      console.log(action.type, action); //throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [];
