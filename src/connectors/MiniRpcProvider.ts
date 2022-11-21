import { RequestError } from './utils/RequestError';

interface BatchItem {
    request: { jsonrpc: '2.0'; id: number; method: string; params: unknown }
    resolve: (result: any) => void
    reject: (error: Error) => void
}

export class MiniRpcProvider {
    public readonly isMetaMask: boolean = false;
    public readonly chainId: number;
    public readonly url: string;
    public readonly host: string;
    public readonly path: string;
    public readonly batchWaitTimeMs: number;
    private nextId = 1;
    private batchTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private batch: Array<BatchItem> = [];

    constructor(chainId: number, url: string, batchWaitTimeMs?: number) {
        this.chainId = chainId;
        this.url = url;
        this.batchWaitTimeMs = batchWaitTimeMs ?? 50
        const parsedUrl = new URL(url);
        this.host = parsedUrl.host;
        this.path = parsedUrl.pathname;
    }

    public readonly request = async (
        method: string | { method: string; params: Array<unknown> },
        params?: Array<unknown> | Record<string, unknown>
    ): Promise<unknown> => {
        if (typeof method !== "string") {
            return this.request(method.method, method.params);
        }
        else if (method === "eth_chainId") {
            return `0x${this.chainId.toString(16)}`;
        }
        const promise = new Promise((resolve, reject) => {
            this.batch.push(
                {
                    request: {
                        jsonrpc: "2.0",
                        id: this.nextId++,
                        method,
                        params,
                    },
                    resolve,
                    reject,
                }
            )
        })
        this.batchTimeoutId = this.batchTimeoutId ?? setTimeout(this.clearBatch, this.batchWaitTimeMs);
        return promise;
    }

    public readonly sendAsync = (
        request: {
            jsonrpc: "2.0";
            id: number | string | null;
            method: string;
            params?: Array<unknown> | Record<string, unknown>
        },
        callback: (error: any, response: any) => void
    ): void => {
        this.request(request.method, request.params)
            .then((result) => callback(null, { jsonrpc: '2.0', id: request.id, result }))
            .catch((error) => callback(error, null))
    }

    public readonly clearBatch = async () => {
        console.debug("Clearing batch", this.batch);
        const batch = this.batch;
        this.batch = [];
        this.batchTimeoutId = null;
        let response: Response;
        try {
            response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "content-type" : "application/json",
                    accept: "application/json"
                },
                body: JSON.stringify(batch.map((item) => item.request))
            })
        } catch (error) {
            batch.forEach(({ reject }) => reject(new Error("Failed to send batch call")));
            return;
        }
        if (!response.ok) {
            batch.forEach(({ reject }) => reject(new RequestError(`${response.status} : ${response.statusText}`, -32000)))
            return
        }
        let json;
        try {
            json = await response.json();
        } catch (error) {
            batch.forEach(({ reject }) => reject(new Error("Failed to parse JSON response")));
            return;
        }
        const byKey = batch.reduce<{ [id: number]: BatchItem }>((memo, current) => {
            memo[current.request.id] = current;
            return memo;
        }, {})
        for (const result of json) {
            const {
                resolve,
                reject,
                request: { method }
            } = byKey[result.id]

            if ('error' in result) {
                reject(new RequestError(result?.error?.message, result?.error?.code, result?.error?.data))
              } else if ('result' in result && resolve) {
                resolve(result.result)
              } else {
                reject(new RequestError(`Received unexpected JSON-RPC response to ${method} request.`, -32000, result))
              }
        }
    }
}