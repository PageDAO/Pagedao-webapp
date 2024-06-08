import { Link } from "react-router-dom";
import {
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import {
  useWriteContract,
  useAccount,
} from "wagmi";
import {
  parseAbi,
  encodeFunctionData,
} from "viem";
import { useEffect, useState, useContext } from "react";

import { TasksContext, TasksDispatchContext } from "../Providers/TasksContext";

const USDCPolygonAddress = "0xD4F1ff97298F6793839Fae27E759DA45ace057C3";

const createClaimParams = (
  startTimeStamp,
  maxClaimableSupply,
  supplyClaimed,
  quantityLimitPerWallet,
  merkletree,
  pricePerToken,
  currency,
  metadataURI,
  resetClaimEligibility
) => {
  return encodeFunctionData({
    abi: {
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "startTimestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "maxClaimableSupply",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "supplyClaimed",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "quantityLimitPerWallet",
              type: "uint256",
            },
            { internalType: "bytes32", name: "merkleRoot", type: "bytes32" },
            {
              internalType: "uint256",
              name: "pricePerToken",
              type: "uint256",
            },
            { internalType: "address", name: "currency", type: "address" },
            { internalType: "string", name: "metadata", type: "string" },
          ],
          internalType: "struct IClaimCondition.ClaimCondition[]",
          name: "_conditions",
          type: "tuple[]",
        },
        {
          internalType: "bool",
          name: "_resetClaimEligibility",
          type: "bool",
        },
      ],
      name: "setClaimConditions",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    args: [
      [
        startTimeStamp,
        maxClaimableSupply,
        supplyClaimed,
        quantityLimitPerWallet,
        merkletree,
        pricePerToken,
        currency,
        metadataURI,
      ],
      resetClaimEligibility,
    ],
  });
};

const createMerkleTree = (address) => {
  console.log("null merkle tree:", address);
  return [];
};

const createLazyMintParams = (amount, baseURIForTokens, data) => {
  return encodeFunctionData({
    abi: {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_baseURIForTokens",
          type: "string",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "lazyMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    args: [amount, baseURIForTokens, data],
    name: "lazyMint",
  });
};

function PreviewBookDetail({ projectIndex, itemIndex }) {
  const { primaryWallet } = useDynamicContext();
  const projects = useContext(TasksContext);
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [contractCreated, setContractCreted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState({});
  const [item, setItem] = useState({});

  const wagmiAccount = useAccount();

  // todo: do checks for created contracts (and related chains)
  // add a contracts object on the project object projects.contracts = { chainID, contractAddress, creationDate, creatorAddress, network }
  function useHandlePublish() {
    // todo: check if the contract exists -- add the ability to save contract address to the project/item

    const CreateNFT = () => {
      const multiCallAbi = parseAbi(
        "function multicall(bytes[] calldata data) external returns (bytes[] memory results)"
      );

      const startTimeStamp = new Date();
      const maxClaimableSupply = item.supply;
      const supplyClaimed = 0;
      const quantityLimitPerWallet = 1;
      const pricePerToken = 10;
      const currency = USDCPolygonAddress;
      const metadataURI = item.contractMetadataURI;
      const resetClaimEligibility = false;

      // set up the claim parameters + merkle tree (figure out how to do that?)
      const claimParams = createClaimParams(
        startTimeStamp,
        maxClaimableSupply,
        supplyClaimed,
        quantityLimitPerWallet,
        createMerkleTree(primaryWallet.address),
        pricePerToken,
        currency,
        metadataURI,
        resetClaimEligibility
      );

      const mintParams = createLazyMintParams();

      const { lazyMintResult } = useWriteContract({
        address: item.contractAddress,
        abi: multiCallAbi,
        functionName: "multicall",
        args: [[claimParams, mintParams]],
      });
      return lazyMintResult;
    };

    const result = CreateNFT();
  }

  useEffect(() => {
    if (
      primaryWallet &&
      projects &&
      projectIndex &&
      itemIndex &&
      projects.length > 0
    ) {
      setIsLoading(false);
      setProject(projects[projectIndex]);
      setItem(projects[projectIndex].items[itemIndex]);
      const project = projects[projectIndex];

      console.log("project", project);

    }
  }, [projects, primaryWallet, project, projectIndex, itemIndex, item]);

  return (
    <>
      <div className="px-52 py-10 bg-dao-primary w-full">
        <div className="container mx-auto justify-center items-end gap-10 inline-flex ">
          <div className="grow shrink basis-0 text-center text-neutral-50 text-4xl font-bold font-['Arvo'] leading-10">
            Preview your book
          </div>
        </div>
      </div>
      <div className="bg-dao-primary w-full">
        <div className="container mx-auto justify-center flex w-full">
          <div className="w-1/2 p-8 bg-neutral-50 rounded-lg flex-col justify-start items-start gap-6  mb-20">
            {item.interactiveURL && (
              <iframe allowFullScreen
                className="flex-col justify-start items-center gap-4 w-full min-h-96 inline-flex"
                src={`https://ipfs.nftbookbazaar.com/ipfs/${item.interactiveURL}`}
              />
            )}
            <div className="self-stretch flex-col justify-start items-start gap-12 flex">
              <div className="self-stretch flex-col justify-start items-start gap-8 flex">
                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                  <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                    Content
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-2 flex">
                    <div className="self-stretch pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-neutral-500 text-sm font-normal font-['DM Sans'] leading-tight">
                          Encrypted Book file
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-start gap-1 flex">
                          <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                            <div className="text-gray-500 text-base font-normal font-['DM Sans'] leading-snug">
                              {item.encryptedfile}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                  <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                    Information & Metadata
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch pr-2 pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Item name
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch grow shrink basis-0 pr-2 pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Description
                        </div>
                      </div>
                      <div className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                  <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                    Distribution and Pricing
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch pr-2 pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Supply
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">
                            20
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch rounded-lg flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch pr-2 pb-3 rounded-lg flex-col justify-start items-start gap-1 flex">
                      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                        <div className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                          Details
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">
                            Network: Polygon
                            <br />
                            Preview Pages: {item.previewPages}
                            <br />
                            Total Pages: {item.pages}
                            <br />
                            Claim: No whitelist
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="justify-center items-center gap-1 flex">
                  <Link
                    to={`/book/edit/${projectIndex}/${itemIndex}`}
                    className="text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug
                                        px-8 py-3 rounded-lg border border-neutral-800"
                  >
                    Back to edit
                  </Link>
                </div>
                <div className="grow shrink basis-0 justify-center items-center gap-1 flex">
                  <button
                    onClick={useHandlePublish}
                    className="text-neutral-50 text-center text-base font-bold font-['DM Sans'] leading-snug
                                        px-8 py-3 bg-dao-primary rounded-lg w-full"
                    disabled={isLoading || isPending}
                  >
                    {isPending ? "Confirming..." : isLoading ? "..." : "Publish Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewBookDetail;
