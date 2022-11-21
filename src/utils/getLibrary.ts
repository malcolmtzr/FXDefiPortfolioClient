import { Web3Provider, Network } from "@ethersproject/providers";

class CustomWeb3Provider extends Web3Provider {
    private detectNetworkResult: Promise<Network> | null = null;

    async detectNetwork(): Promise<Network> {
        return this.detectNetworkResult ?? (this.detectNetworkResult = this._uncachedDetectNetwork());
    }
}

export default function getLibrary(provider: any): Web3Provider {
    const library = new CustomWeb3Provider(
        provider,
        typeof provider.chainId === "number" ? 
        provider.chainId : typeof provider.chainId === "string" ? 
        parseInt(provider.chainId) : "any"
    )
    library.pollingInterval = 15000;
    return library;
}