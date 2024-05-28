import { Link, useParams } from "react-router-dom";
import PdfModal from "../PdfModal/PdfModal";
import {
  useDynamicContext,
  useUserUpdateRequest,
  getNetwork,
} from "@dynamic-labs/sdk-react-core";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
} from "wagmi";
import {
  parseAbi,
  numberToHex,
  encodeAbiParameters,
  encodeFunctionData,
} from "viem";
import { Button, useEffect } from "react";
import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { viemAdapter } from "thirdweb/adapters/viem";
import {
  useSetActiveWallet,
  PayEmbed,
  ConnectButton,
  TransactionButton,
  useActiveWallet,
  MediaRenderer,
  useReadContract,
} from "thirdweb/react";
import { createWalletAdapter } from "thirdweb/wallets";
import { claimTo, getNFT } from "thirdweb/extensions/erc1155";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useWalletClient,
} from "wagmi";
import { polygon } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_APP_THIRDWEB_CLIENT_ID,
});

const contract = getContract({
  address: "0x638263e3eAa3917a53630e61B1fBa685308024fa",
  chain: polygon,
  client,
});

function PreviewBookDetail() {
  const { user, primaryWallet } = useDynamicContext();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [contractCreated, setContractCreted] = useState(false);

  const { projectIndex, itemIndex } = useParams();

  const wagmiAccount = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnectAsync } = useDisconnect();
  // This is how to set a wagmi account in the thirdweb context to use with all the thirdweb components including Pay
  const { data: walletClient } = useWalletClient();
  const { switchChainAsync } = useSwitchChain();
  const setActiveWallet = useSetActiveWallet();
  useEffect(() => {
    const setActive = async () => {
      if (walletClient) {
        const adaptedAccount = viemAdapter.walletClient.fromViem({
          walletClient: walletClient, // accounts for wagmi/viem version mismatches
        });
        const w = createWalletAdapter({
          adaptedAccount,
          chain: defineChain(await walletClient.getChainId()),
          client,
          onDisconnect: async () => {
            await disconnectAsync();
          },
          switchChain: async (chain) => {
            await switchChainAsync({ chainId: chain.id });
          },
        });
        setActiveWallet(w);
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


  //todo: retrieve all the data from the user.metadata field and IPFS link
  const userProjects = user.metadata
  // get it ready to be minted.
  const project = userProjects[projectIndex];
  const item = project.items[itemIndex];
  const pdfPreview = item.pdfPreview;

  const USDCPolygonAddress = "0xD4F1ff97298F6793839Fae27E759DA45ace057C3";
  const platformFeeRecipient = "71fB35B457F5eB74e42660b1A5429a123f29997C"; // pagedao minter proceeds multisig wallet
  const erc721implementationAddress =
    "0x6F6010fB5da6f757D5b1822Aadf1D3B806D6546d";
  const proxyDeployerAddress = "0x76F948E5F13B9A84A81E5681df8682BBf524805E";
  const abiParamsForInitializeContract = createInitializeParams(
    primaryWallet.address,
    contractMetadataHash,
    numberToHex(1000),
    numberToHex(100)
  );
  // need a better salt value, like something from the user fields? using a ghetto math thing for salt
  const contractSalt = numberToHex(projectIndex * 1000 + itemIndex);
  const deployProxyAbi = parseAbi(
    `function deployProxyByImplementation(
          address _implementation,
          bytes memory _data,
          bytes32 _salt
      ) public override returns (address deployedProxy)`
  );

  const contractMetadataHash = item.contractMetadataURI; // await pinToIPFS(contractMetadata);

  // construct the tx request here - doublecheck if abiParamsForInitializeContract should have the function encoded
  const { data } = useSimulateContract({
    address: proxyDeployerAddress,
    abi: deployProxyAbi,
    functionName: "deployProxyByImplementation",
    args: [
      erc721implementationAddress,
      abiParamsForInitializeContract,
      contractSalt,
    ],
  });

  const useHandlePublish = (initState) => {
    // todo: how to handle multiple chains?
    // create the contract metadata - should also upload image?
    // todo: use the Project or item name to create the name + description

    const hash = writeContract(data?.request);
    const { isSuccess } = useWaitForTransactionReceipt({
      hash,
    });

    // somehow wait
    useEffect(() => {
      if (isSuccess) {
        item.contractAddress = data;
        const result = handleNFTCreation(item.contractAddress);
        console.log(result);
        onCompleted(isSuccess);
      }
    }, [isSuccess]);

    const onCompleted = async (data) => {
      console.log("Completed creating contract:", data);

      // todo: update the project with the contract address - save the project

      // todo: create the NFT
    };
  };

  function handleNFTCreation() {
    const multiCallAbi = parseAbi(
      `function multicall(bytes[] calldata data) external returns (bytes[] memory results)`
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
  }

  // okay, screw merkle roots for now. just create a dummy one
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

  const createInitializeParams = (
    user,
    project,
    contractMetadataHash,
    royaltybps,
    platformFeeBps
  ) => {
    return encodeAbiParameters(
      [
        { name: "_defaultAdmin", type: "address" },
        { name: "_name", type: "string" },
        { name: "_symbol", type: "string" },
        { name: "_contractURI", type: "string" },
        { name: "_trustedForwarders", type: "address[]" },
        { name: "_saleRecipient", type: "address" },
        { name: "_royaltyRecipient", type: "address" },
        { name: "_royaltyBps", type: "uint128" },
        { name: "_platformFeeBps", type: "uint128" },
        { name: "_platformFeeRecipient", type: "address" },
      ],
      [
        user.wallet?.address,
        project.name,
        project.name.toUpperCase().substring(0, 4),
        contractMetadataHash,
        [
          "c82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81",
          "86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8",
        ],
        user.wallet?.address,
        user.wallet?.address,
        {
          type: "BigNumber",
          hex: royaltybps,
        },
        {
          type: "BigNumber",
          hex: platformFeeBps,
        },
        platformFeeRecipient,
      ]
    );
  };
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
            <div className="flex-col justify-start items-start gap-4 flex">
              <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                Cover
              </div>
              <div className="relative bg-neutral-50 rounded-lg">
                <div className="flex-col justify-start items-center gap-4 inline-flex">
                  <div className="relative">
                    <PdfModal data={pdfPreview} />
                  </div>
                </div>
              </div>
            </div>
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
                          Book file
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-center gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-start gap-1 flex">
                          <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                            <div className="text-gray-500 text-base font-normal font-['DM Sans'] leading-snug">
                              filename.pdf
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
                          Book name
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">
                            ${item.name}
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
                            ${item.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex-col justify-start items-start gap-4 flex">
                  <div className="text-neutral-800 text-2xl font-bold font-['Arvo'] leading-normal">
                    Selling offer
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
                          Network
                        </div>
                      </div>
                      <div className="self-stretch justify-start items-start gap-1 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-base font-normal font-['DM Sans'] leading-snug">
                            Polygon
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
                    to="/book/add"
                    className="text-neutral-800 text-base font-bold font-['DM Sans'] leading-snug
                                        px-8 py-3 rounded-lg border border-neutral-800"
                  >
                    Back to edit
                  </Link>
                </div>
                <div className="grow shrink basis-0 justify-center items-center gap-1 flex">
                  <Button
                    onClick={useHandlePublish}
                    className="text-neutral-50 text-center text-base font-bold font-['DM Sans'] leading-snug
                                        px-8 py-3 bg-dao-primary rounded-lg w-full"
                    disabled={isPending}
                  >
                    {isPending ? "Confirming..." : "Publish Now"}
                  </Button>
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
