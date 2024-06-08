import { useContext, useState, useMemo, useEffect } from "react";
import {
  TasksContext,
  TasksDispatchContext,
} from "../Providers/TasksContext.js";
import { numberToHex } from "viem";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import SimplePreviewDetailTwo from "./SimplePreviewDetailTwo.jsx";

function SimplePreviewDetail({ projectIndex, itemIndex }) {
  const { primaryWallet } = useDynamicContext();
  const projects = useContext(TasksContext);
  const project = projects[projectIndex];
  const [contractsExist, setContractsExist] = useState(false);
  const [item, setItem] = useState(null);
  const [contractSalt, setContractSalt] = useState(
    numberToHex(projectIndex + 1 * 1000 + itemIndex + 1)
  );
  const [activeContract, setActiveContract] = useState(null);
  const [isCreatingContract, setIsCreatingContract] = useState(false);

  useMemo(() => {
    if (project) {
      setItem(project.items[itemIndex]);
    }
    if (project && project.contracts && project.contracts.length > 0) {
      setContractsExist(true);
    }
  }, [project, itemIndex]);

  useEffect(() => {
    console.log("contracts exist", contractsExist);
    console.log("active contract", activeContract);
  }, [activeContract, contractsExist]);

  function beginActions() {
    console.log("beginning actions");
    setIsCreatingContract(true);
  }

  return (
    <>
      {projectIndex} - {itemIndex} - {contractSalt} 
      {item.name} - {item.description} 
      <hr />
      {contractsExist ? "Contracts exist" : "No contracts exist"}
      <button onClick={beginActions}>Log projects</button>
      <SimplePreviewDetailTwo
        project={project}
        creatorAddress={primaryWallet.address}
        contractSalt={contractSalt}
        contractMetadataHash={item.contractMetadataHash}
        royaltybps={1000}
      />
      <hr />
    </>
  );
}

export default SimplePreviewDetail;
