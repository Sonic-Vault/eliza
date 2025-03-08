import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type State,
    type HandlerCallback,
    elizaLogger,
    composeContext,
    ModelClass,
    generateObject,
    MemoryManager,
} from "@elizaos/core";
import { Chains } from "../types";
import { VT_MEMORY, PROJECT_CATEGORIES } from "../constants";
import { z } from "zod";
import { getProjectsTemplate } from "../templates";

export const RequestProjectSchema = z.object({
    chain: z.string().nullable(),
    category: z.string().nullable(),
});

export interface Project {
    name: string;
    description: string;
    website: string;
    logo_uri: string;
    symbol: string;
    decimals: number;
    address: string;
    category: string;
}

export const getProjectAction: Action = {
    name: "GET_PROJECTS",
    similes: ["GET_TOKENS"],
    description: "Check list of projects",
    suppressInitialMessage: true,

    validate: async (runtime: IAgentRuntime) => {
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: Record<string, unknown>,
        callback: HandlerCallback
    ) => {
        const supportedChains = Object.keys(Chains).join(" | ");
        const categories = PROJECT_CATEGORIES.join(" | ");

        const localState = !state
            ? await runtime.composeState(message, { supportedChains, categories })
            : await runtime.updateRecentMessageState(state);

        const context = composeContext({
            state: localState,
            template: getProjectsTemplate,
        });

        const content = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.SMALL,
            schema: RequestProjectSchema,
        });
        elizaLogger.info("check:", content.object);
        const { chain, category } = content.object;

        const endpoint = `http://127.0.0.1:7000/projects`;

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || data.length === 0) {
            throw new Error(`No projects data found for ${chain} ${category}`);
        }

        const availableProjects = data
            .map((project) => project.name.toLowerCase());

        await storeProjectsToMemory(runtime, message, availableProjects);

        callback({ text: formatProject(data) });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What's the tokens in educhain?",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Let me check the projects on educhain.",
                    action: "GET_PROJECTS",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "arbitrum projects",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll help you check the projects",
                    action: "GET_PROJECTS",
                },
            },
            {
                user: "{{user1}}",
                content: {
                    text: "recent tokens",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Let me get recent tokens.",
                    action: "GET_PROJECTS",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "educhain",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll check projects on educhain.",
                    action: "GET_PROJECTS",
                },
            },
        ],
    ],
};

function formatProject(projects: Project[]): string {
    const formattedOutput = projects
        .map((project) => {
            const description =
                project.description || "No description available";
            return `Name: ${project.name.toLowerCase()}\nCategory: ${project.category}\nDescription: ${description}\n\n`;
        })
        .join("");

    return formattedOutput
}

export const storeProjectsToMemory = async (
    runtime: IAgentRuntime,
    message: Memory,
    projects: string[]
) => {
    const memory: Memory = {
        roomId: message.roomId,
        userId: message.userId,
        agentId: runtime.agentId,
        content: {
            text: JSON.stringify(projects),
            type: VT_MEMORY.project.type,
        },
    };

    const memoryManager = new MemoryManager({
        runtime,
        tableName: VT_MEMORY.project.tableName,
    });

    await memoryManager.createMemory(memory);
};