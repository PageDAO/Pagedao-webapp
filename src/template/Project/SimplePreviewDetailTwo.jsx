

import { useState } from "react";
import axios from "axios";
import { useSignMessage } from "wagmi";

const createContract = async (params) => {
  // post to axios
  // should use the JWT token to authenticate
  const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_API_URL}/deploy`, params);
  return response.data;
};

const SimplePreviewDetailTwo = (args) => {
  const project = args.project;
  const creatorAddress = args.creatorAddress;
  const contractMetadataHash = args.contractMetadataHash;
  const royaltybps = args.royaltybps;
  const contractSalt = args.contractSalt;
  const [createResult, setCreateResult] = useState(null);
  const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage();
   
  return (
    <div>
      {/* Your component JSX here */}
      <button
        onClick={async () => {
          console.log("trying to write contract");
          //what if i called the backend api for this?
          /*
          const result = await createContract({
            project,
            creatorAddress,
            contractMetadataHash,
            royaltybps,
            contractSalt,
          });*/
          const message = "you rock";
          signMessage({message});
        }}  
      >
        Deploy
      </button>
    </div>
  );
};

export default SimplePreviewDetailTwo;
