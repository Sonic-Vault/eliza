import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type State,
    type HandlerCallback,
    elizaLogger,
} from "@elizaos/core";
import type { Profile } from "../types";

const BASE_URL = "http://127.0.0.1:7000";

export const getLoginAction: Action = {
    name: "GET_PROFILE",
    similes: ["GET_PROFILE"],
    description: "Check user profile",
    suppressInitialMessage: true,

    validate: async (_runtime: IAgentRuntime, message: Memory) => {

        const endpoint = `${BASE_URL}/profile/${message.userId}`;

        const response = await fetch(endpoint);
        if (!response.ok) {
            return true;
        }

        const data: Profile = await response.json();
        if (!data || data.username == "") {
            elizaLogger.info("profile:", data);
            return true;
        }

        return false;
    },
    handler: async (
        _runtime: IAgentRuntime,
        message: Memory,
        _state: State,
        _options: Record<string, unknown>,
        callback: HandlerCallback
    ) => {

        const endpoint = `${BASE_URL}/login/${message.userId}`;

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.text();
        if (!data) {
            throw new Error(`No login url found`);
        }

        callback({ text: "Gm, good to see you! please login with your twitter account", url: data });
        return true;
    },
    examples: [],
};
