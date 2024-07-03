import { Book, XCircle } from "lucide-react";
import { useContext } from "react";
import Modal from "react-modal";
import { useUserUpdateRequest } from "@dynamic-labs/sdk-react-core";
import { TasksContext, TasksDispatchContext } from "../Providers/TasksContext";
import * as Progress from "@radix-ui/react-progress";
import {
  ReaderIcon,
  DrawingPinIcon,
  CubeIcon,
  IdCardIcon,
  CheckCircledIcon,
  MixIcon,
} from "@radix-ui/react-icons";

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

function ItemCreationModal({ modalIsOpen, setIsOpen, stepProgress }) {
  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const { updateUser } = useUserUpdateRequest();

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
      contentLabel="Item Creation Progress"
    >
      <div className="p-8 bg-neutral-100 rounded-lg w-full flex-col justify-start items-start gap-8 inline-flex">
        <div className="flex-col justify-start items-start gap-6 flex ">
          <div className="self-stretch justify-between items-start inline-flex">
            <div className=" text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
              <Book className="w-10 h-10 text-gray-400" />
              Creating item
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
                        {stepProgress.message}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch justify-center items-center gap-1 inline-flex">
          <Progress.Root className="ProgressRoot" value={stepProgress.value}>
            <Progress.Indicator
              className="ProgressIndicator"
              style={{
                transform: `translateX(-${100 - stepProgress.value}%)`,
              }}
            />
          </Progress.Root>
        </div>
        <div className="self-stretch justify-center items-center gap-1 inline-flex">
          <button
            disabled={true}
            className="px-8 py-3 bg-dao-primary rounded-lg text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug w-full"
          >
            Preview Item
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ItemCreationModal;
