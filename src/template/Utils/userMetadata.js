import { pinToIPFS } from "./pinToIPFS";
import axios from "axios";

const updateUserMetadata = async (newMetadata, oldMetadata, userUpdateFunction) => {
  const metadata = { ...user.metadata };
  Object.keys(newMetadata).forEach((key) => {
    const metadataURI = saveMetadata(newMetadata[key]);
    metadata[key] = metadataURI;
  });
  userUpdateFunction({ metadata: metadata });
};

const fetchMetadata = async (ipfsMetadataHash) => {
  const emptyProject = { projects: [] };
  if (!ipfsMetadataHash) return emptyProject;
  const ipfsGateway = import.meta.env.VITE_APP_IPFS_GATEWAY_URL;
  const response = await axios.get(`${ipfsGateway}/${ipfsMetadataHash}`);
  const metadata = response.data;
  return metadata;
};

const saveMetadata = async (metadata) => {
  // take the metadata json and make it a File
  const file = new File([JSON.stringify(metadata)], "userMetadata.json", {
    type: "application/json",
  });
  return pinToIPFS(file, "userMetadata.json", import.meta.env.VITE_APP_IPFS_API_URL);
};

export { fetchMetadata, updateUserMetadata };
