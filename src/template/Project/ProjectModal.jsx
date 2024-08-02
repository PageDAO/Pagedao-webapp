import { Book, XCircle } from "lucide-react";
import { useContext } from "react";
import Modal from "react-modal";
//import CollaboratorsComponent from "../Forms/Collaborators.jsx";
import { useUserUpdateRequest, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { TasksContext, TasksDispatchContext } from "../Providers/TasksContext";

const customStyles = {
  content: {
    backgroundColor: "transparent",
    border: "none",
    bottom: "auto",
    left: "50%",
    marginRight: "-50%",
    maxHeight: "80%",
    maxWidth: "80%",
    padding: "0",
    right: "auto",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "#acacacbd",
    backdropFilter: "blur(5px)",
  },
};

Modal.setAppElement("#root");

// ToDo: Check if is a new project or an existing one and populates the form accordingly

function ProjectModal({ modalIsOpen, setIsOpen, type, itemID }) {
  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const { user } = useDynamicContext();
  const { updateUser } = useUserUpdateRequest();
  //const [collaborators, setCollaborators] = useState([{address: ''}]);

  let currentTask = [
    {
      id: itemID,
      text: "",
      title: "",
      description: "",
      items: [],
      done: true,
    },
  ];
  if (type === "changed") {
    currentTask = tasks.find((task) => task.id === itemID);
  }

  async function createProject(data) {
    dispatch({
      type: "added",
      id: itemID,
      text: data.project_name.value,
      title: data.project_name.value,
      description: data.description.value,
      nextItemID: 0,
      items: [],
      metadata: user.metadata,
      userUpdateFunction: updateUser,
    });
    closeModal();

    /*
        const newProject = {
            title: data.project_name.value,
            description: data.description.value,
            items: [],
        };
        */
  }

  function handleSubmit(event) {
    event.preventDefault();
    createProject(event.target);
    //  console.log(collaborators);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="New Project Modal"
    >
      <div className="p-8 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-8 inline-flex">
        <form onSubmit={handleSubmit}>
          <div className="flex-col justify-start items-start gap-6 flex ">
            <div className="self-stretch justify-between items-start inline-flex">
              <div className=" text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                <Book className="w-10 h-10 text-gray-400" />
                Create a new project
              </div>
              <div>
                <button onClick={closeModal}>
                  <XCircle className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
              <div className="self-stretch  flex-col justify-start items-start gap-8 flex">
                <div className="self-stretch  flex-col justify-start items-start gap-2 flex">
                  <div className="self-stretch isOpened rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch isOpened pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Project name
                        </div>
                      </div>
                      <div className="self-stretch isOpened justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 isOpened justify-start items-center gap-2.5 flex">
                          <input
                            className="p-4 text-black border-0 text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                            name="project_name"
                            type="text"
                            placeholder="Write your project name"
                            value={currentTask.title}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch isOpened rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch grow shrink basis-0 pl-4 pr-2 py-3 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Description
                        </div>
                      </div>
                      <div className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 isOpened justify-start items-center gap-2.5 flex">
                          <textarea
                            className="p-4 text-black text-base font-normal font-['DM Sans'] leading-snug w-full focus:outline-none"
                            name="description"
                            placeholder="Write a good description"
                            rows="5"
                            value={currentTask.description}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*                             <div
                                    className="self-stretch isOpened flex-col justify-start items-start gap-6 flex"
                                >
                                    <div
                                        className="self-stretch isOpened flex-col justify-start items-start gap-2 flex"
                                    >
                                        <div
                                            className="text-neutral-800 text-xl font-bold font-['DM Sans'] leading-7"
                                        >
                                            Collaborators
                                        </div>
                                        <div
                                            className="self-stretch text-neutral-800 text-sm font-normal font-['DM Sans'] leading-tight"
                                        >
                                            The following collaborators will have full permission to add,
                                            edit and modify anything within the project. Please add
                                            their address in the following.
                                        </div>
                                    </div>
                                    <div
                                        className="self-stretch isOpened flex-col justify-start items-start gap-4 flex"
                                    >
                                        <CollaboratorsComponent collaborators={collaborators}
                                                                setCollaborators={setCollaborators}/>
                                    </div>
    </div>*/}
              </div>
            </div>
          </div>
          <div className="self-stretch justify-center items-center gap-1 inline-flex">
            <button
              type="submit"
              className="px-8 py-3 bg-dao-primary rounded-lg text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug w-full"
            >
              {type === "added" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ProjectModal;
