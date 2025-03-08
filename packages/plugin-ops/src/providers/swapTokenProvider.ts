import type { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";
import { Chains } from "../types";
import { PROJECT_CATEGORIES } from "../constants";

interface Token {
    name: string;
    symbol: string;
    address: string;
    usdPrice: string;
}

export class SwapTokenProvider implements Provider {
    async get(
        _lengthruntime: IAgentRuntime,
        message: Memory,
        _state?: State
    ): Promise<string> {
        try {
            const content =
                typeof message.content === "string"
                    ? message.content
                    : message.content?.text;

            if (!content) {
                throw new Error("No message content provided");
            }

            const found = this.keywordFound(content);
            if (!found) {
                return "";
            }

            const endpoint = `https://api.magpiefi.xyz/token-manager/tokens`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    exact: false,
                    networkNames: ["sonic"],
                    offset: 0,
                    searchValue: ""
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }

            const data = await response.json();
            if (!data) {
                throw new Error(`Check tokens failed`);
            }

            console.error("calling magpie to update data");

            return `
                Here available tokens to swaps with current price data
                
                ${formatTokens(data)}
                
                `;
        } catch (error) {
            console.error("ProjectProvider error:", error);
            return `Error: ${error.message}`;
        }
    }

    private keywordFound(content: string): boolean {
        const patterns = [
            /\b(?:swap|rate|exchange|check|price|buy|sell)/i,
        ];

        for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match) {
                return true;
            }
        }

        return false;
    }

}

function formatTokens(tokens: Token[]): string {
    const formattedOutput = tokens
        .map((token) => {
            return `
            Name: ${token.name.toLowerCase()}\n
            Symbol: ${token.symbol}\n
            Contract Address: ${token.address}\n
            Price: ${token.usdPrice} USD\n
            -----------------------------------\n\n
            `;
        })
        .join("");

    return formattedOutput
}

export const swapTokenProvider = new SwapTokenProvider();
