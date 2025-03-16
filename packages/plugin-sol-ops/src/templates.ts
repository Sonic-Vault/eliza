export const getProjectsTemplate = `
    Look at the recent conversation and extract the information about chain and category

    Extract the following information, input only newest information:
    - chain: The single blockchain network where project or tokens is available (e.g., ethereum, optimism, arbitrum, base, educhain)
    - category: The single category of projects or tokens that users wants  (e.g., L1, L2, DeFi, AI, Meme, RWA, DePin, Gaming, NFT)

    Return in JSON format:
    { "chain": "{{supportedChains}}", "category": "{{categories}}" }

    Examples:
    "What's are meme projects on base that interesting?" -> { chain: "base", category: "meme" }
    "Any good project on base or educhain?" -> { chain: "base", category: "" }
    "rwa and ai tokens is trending, do you have any suggestion which projects?" { chain: "", category: "rwa" }

    Notes:
    - If the chain is not specified, assume it's empty "".
    - If you are unsure, just return "" for the missing fields.

    Recent conversation:
    {{recentMessages}} 
`

export const getSingleProjectTemplate = `
    Look at the recent conversation and extract the information about chain and project name

    Extract the following information, input only newest information:
    - chain: The single blockchain network where project or tokens is available (e.g., ethereum, optimism, arbitrum, base, educhain)
    - name: The name or address of projects or tokens that users wants  (e.g., Sailfish, Aave, ThrustPad, Doge, Bitcoin, Sonic)

    Return in JSON format:
    { "chain": "{{supportedChains}}", "name": "{{projects}}" }

    Examples:
    "Tell me about Thrustpad?" -> { chain: "educhain", name: "Thrustpad" }
    "Any info about open campus on educhain?" -> { chain: "educhain", name: "open campus" }
    "Aave summary?" { chain: "", name: "aave" }

    Notes:
    - If the chain is not specified, assume it's arbitrum.
    - If you are unsure, just return "" for the missing fields.

    Recent conversation:
    {{recentMessages}} 
`

export const getTransferTemplate = `
    Look at the recent conversation and extract the information about recipient address and transfer amount

    Extract the following information, input only newest information:
    - recipient: The recipient address to transfer (ethereum compatible address)
    - amount: How much user want to transfer (numeric value only)

    Return in JSON format:
    { "recipient": "<address as string>", "amount": "<amount as string>" }

    Examples:
    "Transfer 0.0001 S to 0xe6Ee3c5D9467a61A675AEAb5aB1C4E8a413e240C ?" -> { "recipient": "0xe6Ee3c5D9467a61A675AEAb5aB1C4E8a413e240C", "amount": "0.0001" }
    "send to 0x102f1f556cD9C3D5f820E6920A8931657c5Da21B, amount 0.00001 " -> { "recipient": "0x102f1f556cD9C3D5f820E6920A8931657c5Da21B", "amount": "0.00001" }

    Notes:
    - If the recipient is not specified, assume it's empty string
    - If you are unsure, just return "" for the missing fields.

    Recent conversation:
    {{recentMessages}} 
`
export const getSwapTemplate = `Look at the recent conversation and extract the swap quote details. 

Dont extract to array json, just single object from most recent message

Extract:
- Which token the user wants to sell in contract address (sellToken)
- Which token the user wants to buy in contract address (buyToken)
- Which token the user wants to sell in symbol (sellTokenSymbol)
- Which token the user wants to buy in symbol (buyTokenSymbol)
- How much they want to sell (sellAmount) If amount is not specified, return null for sellAmount

make sure you know corresponding contract address with its token name or symbol

For example:
"I want to convert 5 WETH to USDT" -> { "sellToken": "0x50c42deacd8fc9773493ed674b675be577f2634b", "buyToken": "0x6047828dc181963ba44974801ff68e538da5eaf9", "sellTokenSymbol": "WETH", "buyTokenSymbol": "USDT", "sellAmount": "5" }
"Convert 100 Sonic to USDC.e" -> { "sellToken": "0x0000000000000000000000000000000000000000", "buyToken": "0x29219dd400f2bf60e5a23d13be72b486d4038894", "sellTokenSymbol": "S", "buyTokenSymbol": "USDC.e", "sellAmount": "100" }
"How much Shadow can I get for 100 USDC.e?" -> { "sellToken": "0x29219dd400f2bf60e5a23d13be72b486d4038894", "buyToken": "0x3333b97138d4b086720b5ae8a7844b1345a33333", "sellTokenSymbol": "SHADOW", "buyTokenSymbol": "USDC.e", "sellAmount": "100" }
"WETH/USDT price?" -> { "sellToken": "0x50c42deacd8fc9773493ed674b675be577f2634b", "buyToken": "0x6047828dc181963ba44974801ff68e538da5eaf9", "sellTokenSymbol": "WETH", "buyTokenSymbol": "USDT", "sellAmount": null }

Return in JSON format:
{
    "sellToken": "<contract address>",
    "buyToken": "<contract address>",
    "sellTokenSymbol": "<token symbol>",
    "buyTokenSymbol": "<token symbol>",
    "sellAmount": "<amount as string>"
}

Recent conversation:
{{recentMessages}}`;