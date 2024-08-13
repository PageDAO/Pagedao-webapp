import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../Layout/TopNav.jsx";
import Footer from "../Layout/Footer.jsx";
import axios from "axios";
import * as ethers from "ethers";
import { Chat } from "@orbisclub/components";
import "@orbisclub/components/dist/index.modern.css";

//todo: check wallet balance of usdc before allowing purchase
//if they need usdc, pop up the pay modal to load up with the amount
//try to hook into the callback of that completion (definitely possible)
//then call approve on usdc for the nft contract address
//then call the claim function on the nft contract address
import * as Toast from "@radix-ui/react-toast";
import {
  useDynamicContext,
  getAuthToken,
  DynamicConnectButton,
} from "@dynamic-labs/sdk-react-core";
import { parseAbi, toHex, encodeFunctionData, encodeAbiParameters } from "viem";
import { polygon } from "viem/chains";
import {
  useDisconnect,
  useSwitchChain,
  useWalletClient,
  useAccount,
} from "wagmi";
import { claimTo } from "thirdweb/extensions/erc721";
import { viemAdapter } from "thirdweb/adapters/viem";
import {
  createThirdwebClient,
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";
import {
  useSetActiveWallet,
  useActiveWallet,
  useSendTransaction,
  TransactionButton,
} from "thirdweb/react";
import { createWalletAdapter } from "thirdweb/wallets";
import { polygon as twPolygon } from "thirdweb/chains";
import { pdfjs, PDFViewer } from "@recogito/recogito-react-pdf";
//import PDFViewerCustom  from "../Viewer/PDFViewer.jsx"; // doing a ghetto monkeypatch of the recogito viewer
import { ClipboardIcon } from "@radix-ui/react-icons";

//const PDFViewer = new PDFViewerCustom();
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.js",
  import.meta.url
);

function ItemView() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const timerRef = React.useRef(0);
  const [item, setItem] = React.useState(null);
  const [secretDocument, setSecretDocument] = React.useState(null);
  const [docContents, setDocContents] = React.useState(null);
  const USDCPolygonAddress = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

  const { userId, projectId, itemId } = useParams();
  const { user, primaryWallet } = useDynamicContext();
  const dynamicJwtToken = getAuthToken();

  const { data: walletClient } = useWalletClient(); // from wagmi
  const { disconnectAsync } = useDisconnect(); // from wagmi
  const { switchChainAsync } = useSwitchChain(); // from wagmi
  const setActiveWallet = useSetActiveWallet(); // from thirdweb/react
  const wagmiAccount = useAccount(); // from wagmi
  const [contract, setContract] = React.useState(null);

  const client = createThirdwebClient({
    clientId: import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID,
  });

  useEffect(() => {
    const setActive = async () => {
      const client = createThirdwebClient({
        clientId: import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID,
      });
      if (walletClient) {
        walletClient.chain.rpcUrls.default = `https://137.rpc.thirdweb.com/${
          import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID
        }`;

        // adapt the walletClient to a thirdweb account
        const adaptedAccount = viemAdapter.walletClient.fromViem({
          walletClient: walletClient, // accounts for wagmi/viem version mismatches
        });
        // create the thirdweb wallet with the adapted account
        const thirdwebWallet = createWalletAdapter({
          client,
          adaptedAccount,
          chain: twPolygon, //defineChain(await walletClient.getChainId()),
          onDisconnect: async () => {
            await disconnectAsync();
          },
          switchChain: async (chain) => {
            await switchChainAsync({ chainId: chain.id });
          },
        });
        setActiveWallet(thirdwebWallet);
      }
    };
    setActive();
  }, [walletClient, disconnectAsync, switchChainAsync, setActiveWallet]);

  // handle disconnecting from wagmi
  const thirdwebWallet = useActiveWallet();
  useEffect(() => {
    const disconnectIfNeeded = async () => {
      if (thirdwebWallet && wagmiAccount.status === "disconnected") {
        await thirdwebWallet.disconnect();
      }
    };
    disconnectIfNeeded();
  }, [wagmiAccount, thirdwebWallet]);

  const claimParams = [
    { type: "address" },
    { type: "uint256" },
    { type: "address" },
    { type: "uint256" },
    {
      type: "tuple",
      components: [
        { name: "proof", type: "bytes32[]" },
        { name: "quantityLimitPerWallet", type: "uint256" },
        { name: "pricePerToken", type: "uint256" },
        { name: "currency", type: "address" },
      ],
    },
    { type: "bytes" },
  ];

  const claimAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_receiver",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_quantity",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_currency",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_pricePerToken",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "bytes32[]",
              name: "proof",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "quantityLimitPerWallet",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "pricePerToken",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "currency",
              type: "address",
            },
          ],
          internalType: "struct IDrop.AllowlistProof",
          name: "_allowlistProof",
          type: "tuple",
        },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "claim",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];

  const multiCallAbi = [
    {
      type: "function",
      name: "multicall",
      inputs: [{ type: "bytes[]", name: "data" }],
      outputs: [{ type: "bytes[]", name: "results" }],
      stateMutability: "nonpayable",
    },
  ];

  const retrieveSecretDocument = () => {
    const queryURL = `${
      import.meta.env.VITE_APP_BACKEND_API_URL
    }/retrieve?userid=${userId}&projectid=${projectId}&itemid=${itemId}`;
    console.log("fetch projects queryURL: ", queryURL);

    axios
      .get(queryURL, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${dynamicJwtToken}`,
          Accept: "application/pdf",
        },
      })
      .then((response) => {
        setDocContents(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  // retrieve the project information from the backend
  React.useMemo(() => {
    const fetchData = async () => {
      try {
        axios
          .get(
            `${
              import.meta.env.VITE_APP_BACKEND_API_URL
            }/usermetadata?userid=${userId}`
          )
          .then((result) => {
            const project = result.data.metadata.tasks.find(
              (project) => project.id == projectId
            );
            console.log("found project:", project);
            const items = project.items.filter((item) => item.id == itemId);
            console.log("found items:", items);
            console.log(item);

            const contractAddress = items[0].contracts[0].contractAddress;
            console.log("found contractAddress: ", contractAddress);

            setContract(
              getContract({
                client: client,
                chain: twPolygon,
                address: contractAddress,
              })
            );
            setItem(items[0]);
            retrieveSecretDocument();
          });
      } catch (error) {
        console.error("Error fetching project data", error);
      }
    };
    if (!item) fetchData();
  }, [item, userId, itemId, projectId, client, dynamicJwtToken]);

  /*
  React.useEffect(() => {
    if (account && account.address && contract)
      sendTx(claimTo({ contract: contract, to: account.address, quantity: 1 }));
  }, [account, contract, sendTx]);
/*  
  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
*/
  //todo: query the user's projects and items from the backend - use a reducer?

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <TopNav item={item} />
      <Toast.Provider>
        <div className="w-full bg-neutral-100">
          {docContents && (
            <>
              <PDFViewer
                url={docContents}
                mode="paginated"
                debug={false}
                scale={1}
                config={{
                  relationVocabulary: ["located_at", "observed_at"],
                  debug: false,
                  scale: 0.5
                }}
                onAnnotationCreate={(annotation) => {
                  console.log("Annotation created", annotation);
                }}
                onAnnotationUpdate={(annotation) => {
                  console.log("Annotation updated", annotation);
                }}
                onAnnotationDelete={(annotation) => {
                  console.log("Annotation deleted", annotation);
                }}
                onSelection={(selection) => {
                  console.log("Selection", selection);
                }}
              />
            </>
          )}
          {item ? (
            <iframe
              allowFullScreen
              className="flex-col justify-start items-center gap-4 w-full min-h-96 inline-flex"
              src={`https://ipfs.nftbookbazaar.com/ipfs/${item.interactiveURL}`}
            />
          ) : (
            <div className="spinner-container flex-col justify-start items-center gap-4 w-full min-h-96 inline-flex">
              <div className="spinner"></div>
            </div>
          )}
        </div>
        <div className="flex-row w-full p-8">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {item && item.type && item.type.toUpperCase()}
          </h2>
          <h1 className="title-font text-2xl font-bold mb-3">
            {item && item.name}
          </h1>
          <p className="leading-relaxed text-lg mb-3">
            {item && item.description}
          </p>
          {item &&
            item.tags &&
            item.tags.split(",").map((tag) => (
              <div
                key={tag}
                className="px-2 py-1 mb-10 mr-4 space-x-4 bg-amber-200 rounded-lg justify-center items-center inline-flex text-neutral-800 text-sm font-normal font-['DM Sans'] leading-tight"
              >
                {tag}
              </div>
            ))}
          <br />
          {primaryWallet && walletClient && walletClient.account ? (
            <>
              <TransactionButton
                unstyled
                className="px-8 py-3 bg-dao-primary rounded-lg text-center text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug cursor-pointer"
                transaction={() => {
                  return claimTo({
                    contract: contract,
                    to: walletClient.account.address,
                    quantity: 1,
                  });
                }}
                onTransactionConfirmed={(receipt) => {
                  setToastMessage("🎉 Purchase Completed");
                  //somehow reload the item?
                  retrieveSecretDocument();
                  console.log("Transaction confirmed", receipt.transactionHash);
                }}
                onError={(error) => {
                  setToastMessage("Error claiming NFT: " + error.message);
                }}
              >
                Purchase for ${item && item.contracts[0].price} USDC
              </TransactionButton>
            </>
          ) : (
            <DynamicConnectButton buttonClassName="px-8 py-3 bg-dao-primary rounded-lg text-center text-neutral-50 text-base font-bold font-['DM Sans'] leading-snug cursor-pointer">
              Connect to Purchase
            </DynamicConnectButton>
          )}
          <div className="flex items-center flex-wrap">
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 border-r-2 border-gray-200">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              1.2K
            </span>
            {item && (
              <span
                className="text-gray-400 inline-flex items-center leading-none text-sm mr-3 border-r-2 cursor-pointer"
                onClick={() => {
                  setToastMessage("Copied contract address to clipboard");
                  navigator.clipboard.writeText(
                    item.contracts[0].contractAddress
                  );
                  setToastMessage("Copied contract address to clipboard");
                }}
              >
                <ClipboardIcon />
                <span className="px-2">
                  {item.contracts[0].contractAddress}
                </span>
              </span>
            )}
            <span className="text-gray-400 inline-flex items-center leading-none text-sm border-r-2 pr-2">
              <svg
                fill="currentColor"
                height="21px"
                width="21px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 481.6 481.6"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8
		c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5
		l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9
		l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1
		c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8
		c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5
		c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z"
                  />
                </g>
              </svg>
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm pl-2">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
              6
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-8 p-8 content-start">
          <div className="flex-col w-1/2">
            <Chat
              context={
                "kjzl6cwe1jw148bp0x6c5y4yyo1o5wjjkwsumffljbmble86mw6sw66pt3x116w:" +
                userId +
                "/" +
                projectId +
                "/" +
                itemId
              }
              theme={
                "kjzl6cwe1jw1466j084jwed9ka4usj2brrxrwv4iv01y93v6wpiozgq7twu9jml"
              }
            ></Chat>
          </div>
        </div>
        <div className="w-full bg-neutral-100">
          <div className="container mx-auto py-10 flex justify-between gap-4">
            <div className="flex-col justify-start items-start gap-8 inline-flex w-full">
              <Toast.Root
                className="ToastRoot"
                open={open}
                onOpenChange={setOpen}
              >
                <Toast.Title className="ToastTitle">{toastMessage}</Toast.Title>
                <Toast.Description asChild></Toast.Description>
                <Toast.Action className="ToastAction" asChild altText="undo">
                  <button className="Button small green">Undo</button>
                </Toast.Action>
              </Toast.Root>
              <Toast.Viewport className="ToastViewport" />
            </div>
          </div>
        </div>
      </Toast.Provider>
      <Footer />
    </>
  );
}

export default ItemView;
