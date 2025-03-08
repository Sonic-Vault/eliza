export enum Chains {
    arbitrum = 42161,
    base = 8453,
    educhain = 41923,
}

export interface TokenMetadata {
    chainId: number;
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI?: string;
    type: string;
}

export interface Profile {
    id: string;
    user_id: string;
    name: string;
    username: string;
    wallet: string;
}