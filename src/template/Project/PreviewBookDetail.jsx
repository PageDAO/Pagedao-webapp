import { Link, useNavigate } from "react-router-dom";
import {
  useDynamicContext,
  useUserUpdateRequest,
} from "@dynamic-labs/sdk-react-core";
import { useWriteContract, useAccount } from "wagmi";
import { toHex, parseAbi, encodeFunctionData } from "viem";
import { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";

import { TasksContext, TasksDispatchContext } from "../Providers/TasksContext";
import { setClaimConditions } from "thirdweb/extensions/erc721";
import { createThirdwebClient, getContract } from "thirdweb";
import { polygon } from "thirdweb/chains";

const USDCPolygonAddress = "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359";

const createClaimParams = (
  contract,
  startTimeStamp,
  maxClaimableSupply,
  pricePerToken,
  currency
) => {
  const tx = setClaimConditions({
    contract,
    phases: [
      {
        maxClaimableSupply: maxClaimableSupply,
        maxClaimablePerWallet: maxClaimableSupply,
        currencyAddress: currency,
        price: pricePerToken,
        startTime: new Date(),
      },
    ],
  });
  let returnedData = (async function () {
    return await tx.data();
  })();
  return returnedData;
};

const createMerkleTree = (address) => {
  console.log("null merkle tree:", address);
  return [];
};

const lazyMintAbi = [
  {
    type: "function",
    name: "lazyMint",
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
    outputs: [],
    stateMutability: "nonpayable",
  },
];

const createLazyMintParams = (amount, baseURIForTokens, data) => {
  return encodeFunctionData({
    abi: lazyMintAbi,
    functionName: "lazyMint",
    args: [amount, baseURIForTokens, data],
  });
};

function PreviewBookDetail({ projectIndex, itemIndex }) {
  const { primaryWallet } = useDynamicContext();
  const { updateUser } = useUserUpdateRequest();

  const projects = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const {
    data: hash,
    status,
    failureReason,
    isPending,
    writeContract,
  } = useWriteContract();
  const [contractCreated, setContractCreated] = useState(false);
  const [contractAddress, setContractAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState({});
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  const wagmiAccount = useAccount();
  const client = createThirdwebClient({
    clientId: import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID,
  });

  // todo: do checks for created contracts (and related chains)
  // add a contracts object on the project object projects.contracts = { chainID, contractAddress, creationDate, creatorAddress, network }
  async function useHandlePublish() {
    const CreateNFT = () => {
      if (!contractAddress) return;

      console.log("publishing:", contractAddress);
      const contract = getContract({
        client: client,
        chain: polygon,
        address: contractAddress,
      });

      const multiCallAbi = [
        {
          type: "function",
          name: "multicall",
          inputs: [{ type: "bytes[]", name: "data" }],
          outputs: [{ type: "bytes[]", name: "results" }],
          stateMutability: "nonpayable",
        },
      ];

      const maxClaimableSupply = item.supply;
      const pricePerToken = item.contracts[0].price;
      const currency = USDCPolygonAddress;
      const metadataURI =
        "https://ipfs.nftbookbazaar.com/ipfs/" + item.itemMetadataURI + "?";

      setClaimConditions({
        contract,
        phases: [
          {
            maxClaimableSupply: maxClaimableSupply,
            maxClaimablePerWallet: maxClaimableSupply,
            currencyAddress: currency,
            price: pricePerToken,
            startTime: new Date(),
          },
        ],
      })
        .data()
        .then((data) => {
          const mintParams = createLazyMintParams(
            item.supply,
            metadataURI,
            "0x"
          );

          console.log("calling multicall", data, mintParams);
          const multicallResult = writeContract({
            address: contractAddress,
            abi: multiCallAbi,
            functionName: "multicall",
            args: [[data, mintParams]],
          });

          return multicallResult;
        });
    };
    function generateSalt(projects, projectIndex, itemIndex) {
      return (
        projects[projectIndex].id * 5000 +
        projects[projectIndex].items[itemIndex].id
      );
    }
    //todo: this should show a modal or switch page or something
    if (!contractCreated) {
      axios
        .post(`${import.meta.env.VITE_APP_BACKEND_API_URL}/deploy`, {
          project: project,
          creatorAddress: primaryWallet.address,
          contractMetadataHash: item.contracts[0].contractMetadataHash,
          royaltybps: 1000,
          contractSalt: generateSalt(projects, projectIndex, itemIndex), //projectIndex + 1 * 1400 + itemIndex + 1,
        })
        .then((response) => {
          console.log("response:", response.data.result);
          if (response.data.result !== "error") {
            setContractAddress(response.data.result);
            item.contracts[0].contractAddress = response.data.result;
            dispatch({
              type: "projectItemChanged",
              id: item.id,
              item: item,
              userUpdateFunction: updateUser,
            });

            CreateNFT();
          }
          // todo: save the contract address and published status to the project using the tasksdispatchcontext
        });
    } else {
      console.log(
        "contract created... trying to mint the nft and set claim conditions"
      );
      CreateNFT();
    }
  }

  useEffect(() => {
    if (
      primaryWallet &&
      projects &&
      projectIndex &&
      itemIndex &&
      projects.length > 0
    ) {
      const contractAddressTemp =
        projects[projectIndex].items[itemIndex].contracts[0].contractAddress;
      setIsLoading(false);
      setProject(projects[projectIndex]);
      setItem(projects[projectIndex].items[itemIndex]);
      if (contractAddressTemp) {
        setContractAddress(contractAddressTemp);
        setContractCreated(true);
      }
      console.log(item);
    }
  }, [projects, primaryWallet, project, projectIndex, itemIndex, item]);

  useEffect(() => {
    if (status === "error") {
      console.log("error minting:", failureReason);
    }
    if (status === "success") {
      console.log("successfully minted");
      // do the dispatch here!!!
      dispatch({
        type: "projectItemChanged",
        id: item.id,
        item: item,
        userUpdateFunction: updateUser,
      });
      //todo: set claim condition
      navigate("/book/publishing-done/" + projectIndex + "/" + itemIndex);
    }
  }, [status, navigate, projectIndex, itemIndex]);

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
              <iframe
                allowFullScreen
                className="rounded-lg flex-col justify-start items-center gap-4 w-full min-h-96 inline-flex"
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
                          Encrypted Book ID
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
                          <div className="flex-nowrap text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch grow shrink basis-0 justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug pt-8">
                            <p>
                              <span className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                                Type:
                              </span>{" "}
                              {item.type}
                            </p>
                            <p>
                              <span className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                                Genre:
                              </span>{" "}
                              {item.genre}
                            </p>
                            <p>
                              <span className="text-zinc-600 text-sm font-normal font-['DM Sans'] leading-tight">
                                Tags:
                              </span>{" "}
                              {item.tags}
                            </p>
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
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">
                            <strong>Supply:</strong> {item.supply}
                            <br />
                            <strong>Network:</strong> Polygon
                            <br />
                            <strong>Preview Pages:</strong> {item.previewPages}{" "}
                            of {item.pages}
                            <br />
                            <strong>Claim:</strong> $
                            {item && item.contracts && item.contracts[0].price}{" "}
                            USD (Public)
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
                                        px-8 py-3 bg-dao-primary rounded-lg w-full cursor-pointer"
                    disabled={isLoading || isPending}
                  >
                    {isPending
                      ? "Confirming..."
                      : isLoading
                      ? "..."
                      : status === "success"
                      ? "Published!"
                      : "Publish Now"}
                  </button>
                </div>
              </div>
              {status} {JSON.stringify(failureReason)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewBookDetail;
