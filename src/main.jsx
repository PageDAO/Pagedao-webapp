import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {DynamicContextProvider,} from "@dynamic-labs/sdk-react-core";
import {EthersExtension} from "@dynamic-labs/ethers-v5";

import walletLogo from './assets/logo-dynamic.svg';

import {EthereumWalletConnectors} from "@dynamic-labs/ethereum";
import {AlgorandWalletConnectors} from "@dynamic-labs/algorand";
import {SolanaWalletConnectors} from "@dynamic-labs/solana";
import {FlowWalletConnectors} from "@dynamic-labs/flow";
import {StarknetWalletConnectors} from "@dynamic-labs/starknet";
import {CosmosWalletConnectors} from "@dynamic-labs/cosmos";
import {MagicWalletConnectors} from "@dynamic-labs/magic";
import {BloctoEvmWalletConnectors} from "@dynamic-labs/blocto-evm";

const evmNetworks = [
    {
        blockExplorerUrls: ['https://etherscan.io/'],
        chainId: 1,
        chainName: 'Ethereum Mainnet',
        iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
        name: 'Ethereum',
        nativeCurrency: {
            decimals: 18,
            name: 'Ether',
            symbol: 'ETH',
        },
        networkId: 1,

        rpcUrls: ['https://mainnet.infura.io/v3/'],
        vanityName: 'ETH Mainnet',
    },
    {
        blockExplorerUrls: ['https://polygonscan.com/'],
        chainId: 137,
        chainName: 'Matic Mainnet',
        iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
        name: 'Polygon',
        nativeCurrency: {
            decimals: 18,
            name: 'MATIC',
            symbol: 'MATIC',
        },
        networkId: 137,
        rpcUrls: ['https://polygon-rpc.com'],
        vanityName: 'Polygon',
    },
    {
        blockExplorerUrls: ['https://mintscan.io/osmosis/'],
        chainId: 403,
        lcdUrl: "https://lcd.osmosis.zone",
        chainName: 'osmosis-1',
        iconUrls: ["https://app.dynamic.xyz/assets/networks/osmosis.svg"],
        name: 'Osmosis',
        nativeCurrency: {
            decimals: 18,
            name: 'OSMO',
            symbol: 'OSMO',
            denom: 'uosmo'
        },
        networkId: 403,
        rpcUrls: ['https://rpc.osmosis.zone'],
        vanityName: 'Osmosis',
    }
];

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <DynamicContextProvider
            settings={{
                // Find your environment id at https://app.dynamic.xyz/dashboard/developer
                environmentId: "07ee2707-6b23-4905-a7d5-f6d7331cd531",
                walletConnectorExtensions: [EthersExtension],
                walletConnectors: [
                    EthereumWalletConnectors,
                    AlgorandWalletConnectors,
                    SolanaWalletConnectors,
                    FlowWalletConnectors,
                    StarknetWalletConnectors,
                    CosmosWalletConnectors,
                    MagicWalletConnectors,
                    BloctoEvmWalletConnectors,
                ],
                evmNetworks,
                appLogoUrl: walletLogo,
            }}
        >
            <App/>
        </DynamicContextProvider>
    </React.StrictMode>,
)
