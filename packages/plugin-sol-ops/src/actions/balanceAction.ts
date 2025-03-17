import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type State,
    type HandlerCallback,
} from "@elizaos/core";
import { DEFAULT_API_BASE_URL } from "../constants";

export const geBalanceAction: Action = {
    name: "GET_BALANCE",
    similes: ["GET_BALANCE"],
    description: "Check my balance",
    suppressInitialMessage: true,

    validate: async (_runtime: IAgentRuntime) => {
        return true;
    },
    handler: async (
        _runtime: IAgentRuntime,
        message: Memory,
        _state: State,
        _options: Record<string, unknown>,
        callback: HandlerCallback
    ) => {

        const endpoint = `${DEFAULT_API_BASE_URL}/balance/${message.userId}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.balance) {
            throw new Error(`No balance found for ${message.userId}`);
        }

        callback({ text: `Your wallet balance is ${data.balance} SONIC` });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What is my wallet balance?",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "You balance is 0.1 SONIC.",
                    action: "GET_BALANCE",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "my balance?",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "You balance is 0.1 SONIC.",
                    action: "GET_BALANCE",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "how much i have?",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "You balance is 0.1 SONIC.",
                    action: "GET_BALANCE",
                },
            },
        ],
    ],
};
