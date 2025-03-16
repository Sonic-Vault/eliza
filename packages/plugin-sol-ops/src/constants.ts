import { Chains, type TokenMetadata } from "./types";

export const DEFAULT_API_BASE_URL = "https://rust.sonicvault.tech";

export const VT_MEMORY = {
    project: {
        tableName: "vt_projects",
        type: "project",
    },
    quote: {
        tableName: "vt_quotes",
        type: "quote",
    },
};

export const PROJECT_CATEGORIES: string[] = ["l1", "a16z", "alameda", "stablecoin", "dex", "cex", "pantera", "defi", "dwf", "meme", "coinbase", "dragonfly", "nft", "lst", "binance", "ai", "depin", "governance", "l2", "l3", "paradigm", "elon", "launchpad", "gaming", "rwa"];

export const CHAIN_NAMES: Record<number, string> = {
    [Chains.base]: "Base",
    [Chains.arbitrum]: "Arbitrum",
    [Chains.educhain]: "Educhain",
} as const;

export const CHAIN_EXPLORERS: Record<number, string> = {
    [Chains.base]: "https://basescan.org",
    [Chains.arbitrum]: "https://arbiscan.io",
    [Chains.educhain]: "https://educhain.blockscout.com",
} as const;

export const NATIVE_TOKEN_ADDRESS =
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const NATIVE_TOKENS: Record<number, TokenMetadata> = {
    [Chains.base]: {
        chainId: Chains.base,
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
        address: NATIVE_TOKEN_ADDRESS,
        type: "NATIVE",
        logoURI:
            "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
    },
    [Chains.arbitrum]: {
        chainId: Chains.arbitrum,
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
        address: NATIVE_TOKEN_ADDRESS,
        type: "NATIVE",
        logoURI:
            "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
    },
    [Chains.educhain]: {
        chainId: Chains.educhain,
        name: "Educhain",
        symbol: "EDU",
        decimals: 18,
        address: NATIVE_TOKEN_ADDRESS,
        type: "NATIVE",
        logoURI:
            "",
    },
};
