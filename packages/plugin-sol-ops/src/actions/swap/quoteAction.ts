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
import { DEFAULT_API_BASE_URL } from "../../constants";
import { getSwapTemplate } from "../../templates";

export const RequestQuoteSchema = z.object({
    sellToken: z.string().nullable(),
    buyToken: z.string().nullable(),
    sellTokenSymbol: z.string().nullable(),
    buyTokenSymbol: z.string().nullable(),
    sellAmount: z.string().nullable(),
});

export const getQuoteAction: Action = {
    name: "SWAP_QUOTE",
    similes: [],
    description: "Quote Swap token",
    suppressInitialMessage: true,

    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
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
            template: getSwapTemplate,
        });

        const content = await generateObject({
            runtime,
            context,
            modelClass: ModelClass.SMALL,
            schema: RequestQuoteSchema,
        });
        elizaLogger.info("check:", content.object);
        const { sellToken, buyToken, sellTokenSymbol, buyTokenSymbol, sellAmount } = content.object;


        const p_endpoint = `${DEFAULT_API_BASE_URL}/profile/${message.userId}`;
        const p_response = await fetch(p_endpoint);
        if (!p_response.ok) {
            return false;
        }

        const p_data = await p_response.json();
        if (!p_data || p_data.username == "") {
            return false;
        }

        const endpoint = `https://api.magpiefi.xyz/aggregator/quote?network=sonic&fromTokenAddress=${sellToken}&toTokenAddress=${buyToken}&fromAddress=${p_data.wallet}&toAddress=${p_data.wallet}&sellAmount=${sellAmount}&slippage=0.005&gasless=false`;

        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText} ${endpoint}`);
        }

        const data = await response.json();
        if (!data) {
            throw new Error(`Check tokens failed`);
        }

        console.error(`calling magpie to update data ${content.object}`);


        const formattedResponse = [
            "💱 Swap Details:",
            "────────────────",
            `📤 Sell: ${data.typedData.message.amountIn} ${sellTokenSymbol}`,
            `📥 Buy: ${data.typedData.message.amountOutMin} ${buyTokenSymbol}`,
            `📊 Rate: 1 ${sellTokenSymbol} = ${(data.typedData.message.amountOutMin / data.typedData.message.amountIn).toFixed(4)} ${buyTokenSymbol}`,
            "────────────────",
            `💫 Happy with the price? Type 'quote' to continue`,
        ].join("\n");

        callback({ text: formattedResponse });
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What's the price of 2 WETH in USDC.e",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Let me check the current exchange rate for WETH/USDC.e",
                    action: "SWAP_QUOTE",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Let me get the indicative price for 5 WETH to USDT",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "This is the quote",
                    action: "SWAP_QUOTE",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Get me a quote for 500 Sonic to USDT",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll fetch a firm quote for swapping 500 Sonic to USDT ",
                    action: "SWAP_QUOTE",
                },
            },
        ],

        [
            {
                user: "{{user1}}",
                content: {
                    text: "i want to swap 100 sonic to USDC.e",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll fetch a firm quote for swapping 100 Sonic to USDC.e ",
                    action: "SWAP_QUOTE",
                },
            },
        ],
    ],
};