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
import { z } from "zod";
import { VT_MEMORY } from "../constants";
import { getSingleProjectTemplate } from "../templates";

export const RequestSingleProjectSchema = z.object({
    chain: z.string().nullable(),
    name: z.string().nullable(),
});

export interface DetailProject {
    name: string;
    tvl: number;
    sentiment: string;
    whitepaper_summary: string;
    github_activity: GithubActivity;
    address: Address;
}

export interface GithubActivity {
    commits_last_30_days: number;
    contributors: number;
    repo_url: string;
}

export interface Address {
    mainnet: string;
    testnet: string;
}

export const getSingleProjectAction: Action = {
    name: "GET_SINGLE_PROJECT",
    similes: ["GET_SINGLE_TOKEN"],
    description: "Check single project summary",
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

        const latestProjects = await retrieveLatestProjects(
            runtime,
            message
        );
        elizaLogger.info("projects:", latestProjects);
        const localState = !state
            ? await runtime.composeState(message, { supportedChains, projects: latestProjects.join(" | ") })
            : await runtime.updateRecentMessageState(state);

        const context = composeContext({
            state: localState,
            template: getSingleProjectTemplate,
        });

        const content = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.SMALL,
            schema: RequestSingleProjectSchema,
        });
        elizaLogger.info("check:", content.object);
        const { chain, name } = content.object;

        const endpoint = `http://127.0.0.1:7000/projects/${chain}/${name}`;

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || data.length === 0) {
            throw new Error(`No projects data found for ${chain} ${name}`);
        }

        callback({ text: formatSingleProject(data) });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Need info about Aave in arbitrum?",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Let me check Aave project.",
                    action: "GET_SINGLE_PROJECT",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What is sailfish?",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll help you check the sailfish project",
                    action: "GET_SINGLE_PROJECT",
                },
            },
            {
                user: "{{user1}}",
                content: {
                    text: "is TinyTap is good",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll help you check the tinytap project",
                    action: "GET_SINGLE_PROJECT",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "aave is not safe?",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll check aave project.",
                    action: "GET_SINGLE_PROJECT",
                },
            },
        ],
    ],
};

function formatSingleProject(project: DetailProject): string {

    const formattedResponse = [
        "💱 Project Details:",
        "────────────────",
        `📤 Name: ${project.name}`,
        `📥 TVL: ${project.tvl}`,
        `📊 Sentiment: ${project.sentiment}`,
        `🔗 WP Summary: ${project.whitepaper_summary}`,
        "────────────────",
        `📤 Github`,
        `📥 Commit last 30 days: ${project.github_activity.commits_last_30_days}`,
        `📊 Contributors: ${project.github_activity.contributors}`,
        `🔗 Repo URL: ${project.github_activity.repo_url}`,
        "────────────────",
        `📥 Mainnet: ${project.address.mainnet}`,
        `📥 Testnet: ${project.address.testnet}`,
    ].join("\n");

    return formattedResponse;
}

export const retrieveLatestProjects = async (
    runtime: IAgentRuntime,
    message: Memory
): Promise<string[]> => {
    const memoryManager = new MemoryManager({
        runtime,
        tableName: VT_MEMORY.project.tableName,
    });

    try {
        const memories = await memoryManager.getMemories({
            roomId: message.roomId,
            count: 1,
            start: 0,
            end: Date.now(),
        });

        if (memories?.[0]) {
            return JSON.parse(memories[0].content.text) as string[];
        }
        return [];
    } catch (error) {
        elizaLogger.error(`Failed to retrieve quote: ${error.message}`);
        return [];
    }
};