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
} from "@elizaos/core";
import { z } from "zod";
import { DEFAULT_API_BASE_URL } from "../constants";
import { getTransferTemplate } from "../templates";

export const RequestTransferSchema = z.object({
    recipient: z.string().nullable(),
    amount: z.string().nullable(),
});

export const getTransferAction: Action = {
    name: "TRANSFER_TOKEN",
    similes: [],
    description: "Transfer token",
    suppressInitialMessage: true,

    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        const content = typeof message.content === 'string'
            ? message.content
            : message.content?.text;

        if (!content) return false;

        const hasRecipient = /0x[a-fA-F0-9]{40}/.test(content);

        return hasRecipient;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: Record<string, unknown>,
        callback: HandlerCallback
    ) => {
        const localState = !state
            ? await runtime.composeState(message, {})
            : await runtime.updateRecentMessageState(state);

        const context = composeContext({
            state: localState,
            template: getTransferTemplate,
        });

        const content = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.SMALL,
            schema: RequestTransferSchema,
        });
        elizaLogger.info("check:", content.object);
        const { recipient, amount } = content.object;

        const endpoint = `${DEFAULT_API_BASE_URL}/transfer`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: message.userId, recipient, amount })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data) {
            throw new Error(`Transfer failed`);
        }

        if (data.trx != "0x") {
            callback({
                text: `TRANSFER SUCCESS!! to: ${recipient}, amount: ${amount}. Tx: ${data.trx}`,
                url: data.trx
            });
        } else {
            callback({
                text: `TRANSFER FAILED!! to: ${recipient}, amount: ${amount}.`
            });
        }


        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Transfer 0.0001 S to 0xe6Ee3c5D9467a61A675AEAb5aB1C4E8a413e240C ",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "TRANSFER SUCCESS!! ...",
                    action: "TRANSFER_TOKEN",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "send to 0x102f1f556cD9C3D5f820E6920A8931657c5Da21B, amount 0.00001",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Ok, transfer success",
                    action: "TRANSFER_TOKEN",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "transfer recipient 0x102f1f556cD9C3D5f820E6920A8931657c5Da21B, amount 0.00001",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "transfer success",
                    action: "TRANSFER_TOKEN",
                },
            },
        ],
    ],
};