import type { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";
import { Chains } from "../types";
import { PROJECT_CATEGORIES } from "../constants";

export class ProjectProvider implements Provider {
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

            const keywordIdentifier = this.extractKeyword(content);
            if (!keywordIdentifier) {
                return "";
            }

            const supportedChains = Object.keys(Chains).join(" , ");
            const categories = PROJECT_CATEGORIES.join(" , ");

            return `
                Supported chains are ${supportedChains}
                
                Supported category are ${categories}`;
        } catch (error) {
            console.error("ProjectProvider error:", error);
            return `Error: ${error.message}`;
        }
    }

    private extractKeyword(content: string): string | null {
        const patterns = [
            /\b(?:token|project|tokens|projects|category|categories|ecosystem|eco|coins|in)/i,
        ];

        for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match) {
                const token = match[1] || match[0];
                return token.replace(/[$#]/g, "").toLowerCase().trim();
            }
        }

        return null;
    }

}

export const projectProvider = new ProjectProvider();
