import { ChainId } from "../constants/ChainIds";
import { DHOBYGHAUT_ENDPOINT, FXCORE_ENDPOINT, WALLETCONNECT_BRIDGE_URL } from "../constants/Endpoints";
import { NetworkConnector } from "./NetworkConnector";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import getLibrary from "../utils/getLibrary";

let networkLibrary: Web3Provider | undefined;

const NETWORK_URLS: { [chainId in ChainId]: string } = {
    [ChainId.DHOBYGHAUT]: DHOBYGHAUT_ENDPOINT,
    [ChainId.FXCORE]: FXCORE_ENDPOINT
};

const SUPPORTED_CHAIN_IDS = [ChainId.DHOBYGHAUT, ChainId.FXCORE];

export const network = new NetworkConnector(
    {
        urls: NETWORK_URLS,
        defaultChainId: ChainId.FXCORE
    }
);

export const injected = new InjectedConnector(
    {
        supportedChainIds: SUPPORTED_CHAIN_IDS
    }
);

export function getNetworkLibrary(): Web3Provider {
    return (networkLibrary = networkLibrary ?? getLibrary(network.getProvider()))
}

export const walletConnect = new WalletConnectConnector(
    {
        supportedChainIds: SUPPORTED_CHAIN_IDS,
        rpc: NETWORK_URLS,
        bridge: WALLETCONNECT_BRIDGE_URL,
        qrcode: true,
        //pollingInterval: 15000
    }
)