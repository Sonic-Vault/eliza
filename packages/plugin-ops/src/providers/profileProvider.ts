import type { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";
import type { Profile } from "../types";

const BASE_URL = "http://127.0.0.1:7000";

export class ProfileProvider implements Provider {
    async get(
        _lengthruntime: IAgentRuntime,
        message: Memory,
        _state?: State
    ): Promise<string> {
        try {
            const endpoint = `${BASE_URL}/profile/${message.userId}`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                return `if you unsure about the name of the user, you must ask user to login first, and execute GET_PROFILE action`;
            }

            const data: Profile = await response.json();
            if (!data || data.username == "") {
                return `if you unsure about the name of the user, you must ask user to login first, and execute GET_PROFILE action`;
            }

            return `
                Current User name is ${data.name}. 
                User X username is ${data.username}. 
                User wallet address is ${data.wallet}. 
                
                You can greet the user by the name or username`;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

}

export const profileProvider = new ProfileProvider();
