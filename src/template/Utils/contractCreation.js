import { hexToNumber, encodeAbiParameters } from "viem";

const createInitializeContractParams = (
  project,
  creatorAddress,
  contractMetadataHash,
  royaltybps,
  platformFeeBps,
  platformFeeRecipient
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
      creatorAddress,
      project.name,
      project.name?.substring(0, 4),
      contractMetadataHash,
      [
        "0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81",
        "0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8",
      ],
      creatorAddress,
      creatorAddress,
      hexToNumber(royaltybps),
      hexToNumber(platformFeeBps),
      platformFeeRecipient,
    ]
  );
};

const deployProxyAbi = [
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "address", name: "deployedProxy" }],
    name: "deployProxyByImplementation",
    inputs: [
      { type: "address", name: "_implementation" },
      { type: "bytes", name: "_data" },
      { type: "bytes32", name: "_salt" },
    ],
  },
];

const contractConfig = {
  platformFeeRecipient: "0x71fB35B457F5eB74e42660b1A5429a123f29997C",
  erc721implementationAddress: "0x6F6010fB5da6f757D5b1822Aadf1D3B806D6546d",
  proxyDeployerAddress: "0x76F948E5F13B9A84A81E5681df8682BBf524805E",
  platformFeeBps: 500,
};

export {
  createInitializeContractParams,
  deployProxyAbi,
  contractConfig,
};
