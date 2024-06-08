import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
//import PreviewBookDetail from "./PreviewBookDetail.jsx";
//import SimplePreviewDetail from "./SimplePreviewDetail.jsx";
//import ThirdwebTest from "./ThirdwebConnector.jsx";
import { useParams } from "react-router-dom";
import SimplePreviewDetailTwo from "./SimplePreviewDetailTwo.jsx";
import { useContext, useState, useEffect } from "react";
import { TasksContext } from "../Providers/TasksContext";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { polygon } from "viem/chains";
import { useAccount } from "wagmi";

import {
  numberToHex,
} from "viem";
import PreviewBookDetail from "./PreviewBookDetail.jsx";

function AccountInfo() {
  const { address, isConnected, chain } = useAccount();

  return (
    <div>
      <p>wagmi connected: {isConnected ? "true" : "false"}</p>
      <p>wagmi address: {address}</p>
      <p>wagmi network: {chain?.id}</p>
    </div>
  );
}
function PreviewBook() {
  const params = useParams();
  const projects = useContext(TasksContext);
  const { primaryWallet, walletConnector } = useDynamicContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (projects && projects.length > 0 && primaryWallet) {
      primaryWallet.connector.getSigner().then((signer) => {
        if (signer.account)       setIsLoading(false);
      });
    }
  }, [projects, primaryWallet]);
  // todo: replace SimplePreviewDetail with PreviewBookDetail
  return (
    <>
      <TopNav />
      <AccountInfo />
      {isLoading ? (
        "Loading..."
      ) : (
        <SimplePreviewDetailTwo
          project={projects[params.projectIndex]}
          creatorAddress={primaryWallet.address}
          contractMetadataHash={
            projects[params.projectIndex].items[params.itemIndex]
              .contractMetadataURI
          }
          royaltybps={1000}
          contractSalt={numberToHex(
            params.projectIndex + 1 * 3000 + params.itemIndex + 3
          )}
        />
      )}
      <PreviewBookDetail projectIndex={params.projectIndex} itemIndex={params.itemIndex}/>
      <Footer />
    </>
  );
}

export default PreviewBook;
