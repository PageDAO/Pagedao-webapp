import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import walletLogo from "./assets/logo-dynamic.svg";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
//import { AlgorandWalletConnectors } from "@dynamic-labs/algorand";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
//import { FlowWalletConnectors } from "@dynamic-labs/flow";
//import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { CosmosWalletConnectors } from "@dynamic-labs/cosmos";
//import { MagicWalletConnectors } from "@dynamic-labs/magic";
//import { BloctoEvmWalletConnectors } from "@dynamic-labs/blocto-evm";

import { reservoirChains } from "@reservoir0x/reservoir-sdk";
import {
  ReservoirKitProvider,
  CartProvider,
  lightTheme,
} from "@reservoir0x/reservoir-kit-ui";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import {
  mainnet,
  polygon,
  base,
  optimism,
  moonbeam,
  evmos,
  zora,
} from "viem/chains";
import { MetaMaskWallet, pubkeyToAddress } from "secretjs";
import {} from "viem/accounts";
import axios from "axios";
import { TasksProvider } from "./template/Providers/TasksContext";
import { ThirdwebProvider } from "thirdweb/react";

// todo: refactor this into some kind of API context (or add to TasksContext)
const marketplaceFee = "5"; // 5% fee on marketplace sales to polygon minter proceeds wallet - should be queried from osmosis daodao api
const platformFee = "5"; // 5% fee on primary sales to polygon minter proceeds wallet - should be queried from osmosis daodao api

const evmNetworks = [
  {
    blockExplorerUrls: ["https://etherscan.io/"],
    chainId: 1,
    chainName: "Ethereum Mainnet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
    name: "Ethereum",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 1,

    rpcUrls: ["https://mainnet.infura.io/v3/"],
    vanityName: "ETH Mainnet",
  },
  {
    blockExplorerUrls: ["https://bscscan.com/"],
    chainId: 56,
    chainName: "Binance Smart Chain Mainnet",
    iconUrls: ["https://icons.llamao.fi/icons/chains/rsz_binance.jpg"],
    name: "Binance Smart Chain",
    nativeCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "BNB",
    },
    networkId: 56,
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    vanityName: "BSC Mainnet",
  },
  {
    blockExplorerUrls: ["https://polygonscan.com/"],
    chainId: 137,
    chainName: "Matic Mainnet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
    name: "Polygon",
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    networkId: 137,
    rpcUrls: ["https://polygon-rpc.com"],
    vanityName: "Polygon",
  },
  {
    blockExplorerUrls: ["https://optimisticscan.io/"],
    chainId: 10,
    chainName: "optimism",
    iconUrls: ["https://icons.llamao.fi/icons/chains/rsz_optimism.jpg"],
    name: "Optimism",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 10,
    rpcUrls: ["https://mainnet.optimism.io"],
    vanityName: "Optimism",
  },
  {
    blockExplorerUrls: ["https://basescan.io/"],
    chainId: 8453,
    chainName: "base",
    iconUrls: ["https://icons.llamao.fi/icons/chains/rsz_base.jpg"],
    name: "Base",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 8453,
    rpcUrls: ["https://base.drpc.org"],
    vanityName: "Base",
  },
  {
    blockExplorerUrls: ["https://explorer.degen.tips"],
    chainId: 666666666,
    chainName: "degen",
    iconUrls: ["https://basescan.org/token/images/degentips_32.png"],
    name: "Degen",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 666666666,
    rpcUrls: ["https://rpc.degen.tips"],
    vanityName: "Degen",
  },
  {
    blockExplorerUrls: ["https://escan.live"],
    chainId: 9001,
    chainName: "evmos",
    iconUrls: ["https://icons.llamao.fi/icons/chains/rsz_evmos.jpg"],
    name: "Evmos",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 9001,
    rpcUrls: ["https://evmos-mainnet.public.blastapi.io"],
    vanityName: "Evmos",
  },
  {
    blockExplorerUrls: ["https://moonscan.io"],
    chainId: 1284,
    chainName: "Moonbeam",
    iconUrls: ["https://icons.llamao.fi/icons/chains/rsz_moonbeam.jpg"],
    name: "Moonbeam",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    networkId: 1284,
    rpcUrls: ["https://rpc.api.moonbeam.network"],
    vanityName: "Moonbeam",
  },
];

const degenChain = evmNetworks[5];

const config = createConfig({
  chains: [
    mainnet,
    polygon,
    moonbeam,
    optimism,
    base,
    evmos,
    degenChain,
    zora,
    evmos,
  ],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http("https://polygon-mainnet.g.alchemy.com/v2/f5LpbJ2eyEurydCMDameDYSJmLa8pPyS"),
    [moonbeam.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [evmos.id]: http(),
    [degenChain.id]: http(),
    [zora.id]: http(),
    [evmos.id]: http(),
  },
});

const queryClient = new QueryClient();

const reservoirPolygon = reservoirChains.polygon;
reservoirPolygon.chainIcon = "https://app.dynamic.xyz/assets/networks/polygon.svg";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        // StealthLeo environment id: 07ee2707-6b23-4905-a7d5-f6d7331cd531
        // indefatigable environment id: 74bd1bf3-bdd5-43ba-8ea3-e744ebfaaaf2
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: import.meta.env.VITE_APP_DYNAMIC_ENVIRONMENT_ID,
        walletConnectorExtensions: [EthersExtension],
        walletConnectors: [
          EthereumWalletConnectors,
          SolanaWalletConnectors,
          CosmosWalletConnectors,
        ],
        evmNetworks,
        appLogoUrl: walletLogo,
        events: {
          onEmbeddedWalletCreated: (jwtVerifiedCredential) => {
            console.log('onEmbeddedWalletCreated', jwtVerifiedCredential);
          },
          onSignedMessage: ({ signatureHash, signedMessage }) => {
            console.log(
              `onSignedMessage was called: ${signatureHash}, ${signedMessage}`
            );
          },
          onAuthSuccess: async (args) => {
            console.log("onAuthSuccess was called", args);
            // set the current wallet to polygon
            // set up the user's secretjs metamask wallet if it doesn't exist on the userAdditionalAddresses
            const additionalAddresses =
              await args.primaryWallet.connector.getAdditionalAddresses(
                args.primaryWallet.address
              );
            console.log("additional addresses:", additionalAddresses);
            if (
              additionalAddresses.length > 0 &&
              additionalAddresses[0].substring(5) == "secret"
            )
              return;

            // get new generated public key from api
            const axiosconfig = {
              headers: { "Content-Type": "application/json" },
            };
            axios
              .post(
                `${import.meta.env.VITE_APP_BACKEND_API_URL}/auth`,
                {
                  data: { userid: args.user.userId },
                },
                axiosconfig
              )
              .then((response) => {
                console.log(response);
                const ethAddress = response.data.address;
                const pubKey = response.data.publicKey.substring(2);

                localStorage.setItem(`secretjs_${ethAddress}_pubkey`, pubKey);
                MetaMaskWallet.create(null, ethAddress).then(
                  (secretjsWallet) => {
                    // let's add this to the user's wallet collection (and above, check if it exists)
                    args.primaryWallet.connector
                      .setAdditionalAddresses(args.primaryWallet.address, [
                        secretjsWallet.address, pubkeyToAddress(pubKey, "osmo")
                      ])
                      .then((result) => {
                        console.log(secretjsWallet, result);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                );
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector suppressChainMismatchError>
            <ThirdwebProvider clientId={import.meta.env.VITE_APP_THIRDWEB_CLIENTID} autoConnect={true}> 
            <ReservoirKitProvider
              options={{
                apiKey: import.meta.env.VITE_APP_RESERVOIR_API_KEY,
                chains: [
                  {
                    chainId: 137,
                    ...reservoirPolygon,
                    active: true,
                  },
                ],
                source: "pagedao.org",
                disablePoweredByReservoir: false,
                preferDisplayFiatTotal: true,
                marketplaceFees: [
                  `${import.meta.env.VITE_APP_POLYGON_FEE_ADDRESS}:${marketplaceFee}`,
                ], // 5% fee to polygon minter wallet - should be queried from osmosis daodao api
              }}
              theme={lightTheme}
            >
              <CartProvider>
              <TasksProvider options={{
                'platformFee': platformFee,
                'marketplaceFee': marketplaceFee
              }}>
                <App />
              </TasksProvider>
              </CartProvider>
            </ReservoirKitProvider>
            </ThirdwebProvider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  </React.StrictMode>
);
