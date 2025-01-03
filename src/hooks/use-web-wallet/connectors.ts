/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";

import { LatticeConnector } from "@web3-react/lattice-connector";
import { FrameConnector } from "@web3-react/frame-connector";

import { FortmaticConnector } from "@web3-react/fortmatic-connector";

import { PortisConnector } from "@web3-react/portis-connector";
import { TorusConnector } from "@web3-react/torus-connector";

import { networks, rpcUrls } from "utils/configs";
const supportedChainIds: number[] = Object.keys(networks).map((key) => parseInt(key));

const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({ supportedChainIds });

export const network = new NetworkConnector({
    urls: rpcUrls,
    defaultChainId: supportedChainIds[0],
});

export const walletconnect = new WalletConnectConnector({
    rpc: rpcUrls,
    qrcode: true,
});

export const walletlink = new WalletLinkConnector({
    url: rpcUrls[97],
    appName: "TotemFi App",
    supportedChainIds,
});

export const ledger = new LedgerConnector({
    chainId: supportedChainIds[0],
    url: rpcUrls[97],
    pollingInterval: POLLING_INTERVAL,
});

export const lattice = new LatticeConnector({
    chainId: 4,
    appName: "TotemFi App",
    url: rpcUrls[97],
});

// export const frame = new FrameConnector({ supportedChainIds });

// export const fortmatic = new FortmaticConnector({
//     apiKey: process.env.REACT_APP_FORTMATIC_API_KEY as string,
//     chainId: supportedChainIds[0],
// });

// export const portis = new PortisConnector({
//     dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
//     networks: supportedChainIds,
// });

export const torus = new TorusConnector({ chainId: supportedChainIds[0] });
