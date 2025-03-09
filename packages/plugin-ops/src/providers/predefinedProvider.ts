import type { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";

export class PredefinedProvider implements Provider {
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

            const isFound = this.isFound(content);
            if (!isFound) {
                return "";
            }

            return `
                Here is information about projects description, features, protocol mechanics etc: 

                ## Sonic Blockchain / Token: 
                Sonic is the highest-performing EVM L1, combining speed, incentives, and world-class infrastructure for DeFi. The chain provides 10,000 TPS and sub-second finality.

                Sonic delivers exceptional performance, enabling developers to scale their applications without limits while ensuring smooth user experiences.
                - 10,000 Transactions per Second
                - Sub-Second Finality
                - EVM Compatible
                - Solidity/Vyper Support

                The native token of Sonic is S, which is used for transaction fees, staking, running validators, and participating in governance. Users holding FTM can upgrade to S on a 1:1 basis.

                Furthermore, the Sonic Gateway provides developers and users with seamless access to vast liquidity through a secure bridge connected to Ethereum. With a unique fail-safe mechanism, it ensures your assets are protected in all circumstances.

                Sonic Tokenomics

                At Sonic launch, the total supply of S is 3.175 billion. As decided by multiple governance proposals, the additions below will gradually be implemented into the tokenomics of the S token.
                Airdrop

                An additional 6% of the 3.175 billion S will be minted six months after Sonic launches exclusively used for the airdrop program, rewarding both Fantom Opera and Sonic users and builders. The airdrop features an innovative burn mechanism that rewards active participation and gradually reduces the total supply of S tokens.
                Ongoing Funding

                Six months after Sonic launches, the network will mint additional S tokens to:

                    - Increase S adoption and global presence

                    - Grow the team and scale operations to drive increased adoption

                    - Implement robust marketing initiatives and DeFi onboarding campaigns

                To fund this program, an additional 1.5% of S (47,625,000 tokens) will be minted annually for six years, starting six months after the mainnet launch. 

                However, to guard against inflation, the network will burn newly minted tokens not used during the year, ensuring that 100% of all newly minted tokens from this initiative are allocated toward network growth rather than being held by the treasury for later use.

                For example, if Sonic Labs uses only 5,000,000 tokens in the first year, the network will burn the remaining 42,625,000 tokens.
                Block Rewards

                We are migrating block rewards from Fantom Opera to Sonic. As validators and stakers move to Sonic, Opera's block rewards will be reduced to zero, and the saved funds will be used to reward Sonic validators. The Sonic Foundation will maintain Opera validators for now.

                To achieve a 3.5% APR for Sonic without causing further inflation in the first four years, we're reallocating the remaining FTM block rewards from Opera to Sonic. These rewards are technically part of the initial 3.175 billion S supply, but the circulating supply at launch will be ~2.88 billion tokens. The annual difference of 70 million tokens will be distributed as validator rewards over the first four years, avoiding the need to mint new S tokens during this period for block rewards.

                As a result, Opera's APR dropped to zero upon Sonic's launch. To preserve value and avoid new inflationary rewards at Sonic's inception, we will not mint new tokens for block rewards during the initial four years, as stated. After that period, S block rewards will resume by minting new tokens at a rate of 1.75% per year to reward validators.

                Consensus in a decentralized system is not just a process but a cornerstone of the system. Its mechanism guarantees a consistent and secure blockchain among all participants and ensures the system's integrity and reliability. Consensus ensures that transactions are consistently and securely validated and added to the blockchain.

                It's a critical element for effectively thwarting attempts by malicious actors to manipulate the network or its data. Sonic uses Asynchronous Byzantine Fault Tolerance in combination with directed acyclic graphs to achieve consensus.
                Practical Byzantine Fault Tolerance

                Practical Byzantine Fault Tolerance (PBFT) is a consensus mechanism designed to enable decentralized systems to function correctly in the presence of malicious or faulty nodes. It is named after the Byzantine generals problem, which is an idea that illustrates the difficulties of achieving consensus in a decentralized system when some of the participants may be acting in bad faith.


                ============================================================================================================================================================

                ## Wagmi Project / token:

                At the heart of the WAGMI protocol lies a commitment to revolutionize decentralized finance (DeFi) by providing secure, robust, and innovative products that make DeFi more accessible and user-friendly. 

                Empowering Liquidity Management

                The WAGMI protocol operates as a limited TVL decentralized exchange where managing liquidity is paramount:

                    User-Friendly Interface: Users can easily navigate through various pools to find the best yields without compromising the security of their assets.

                    Sophisticated Strategies: Our advanced liquidity management strategy ensures meticulously chosen price ranges across all pools, promoting stability and growth.

                Continuous Adaptation and Optimization

                WAGMI is designed to respond dynamically to changing market conditions:

                    Market Monitoring: Constantly monitors market conditions to adapt strategies effectively.

                    Auto-Rebalance Mechanism: Fine-tunes strategy settings to ensure optimal rewards, even amidst market fluctuations.

                    Secure Positions: Maintains users' positions within predefined price bounds to safeguard investments.

                GMI: Gateway to Multi-Pools

                GMI introduces a dynamic and diversified ecosystem within the DeFi landscape:

                    Dynamic Pooling: GMI acts as a dynamic pool that houses multiple multi-pools, each consisting of several V3 pools.

                    Token Acquisition: Users can acquire GMI using any WLP token supported by the GMI system.

                    Fee Earnings: By holding GMI, users earn fees from all multi-pools within the GMI framework.

                Shared yield

                GMI not only serves as a diversification tool but also fosters a sense of collective success:

                    Yield Distribution: Yield generated from multi-pools within GMI are distributed among GMI holders based on their individual GMI share.

                    Collective Growth: The success of one contributes to the progress of the entire ecosystem, driving it forward.

                Leverage

                Wagmi provides a leverage facility built on concentrated liquidity technology, designed to cater to two main participant groups: liquidity providers and traders.

                Liquidity Providers (LPs):

                Wagmi enhances yields for Version 3 (V3) liquidity providers by mitigating impermanent loss. LPs can continue to earn yields even when their liquidity position is out of range.

                Traders:

                On Wagmi, traders can go long or short on any pair without the risk of forced, price-based liquidations. If a trader's position goes underwater, they are only required to pay premiums to LPs to maintain their position.
                Deployment History

                    Initial Launch on Zksync Era Mainnet: The initial implementation of the WAGMI protocol focused on introducing CLAMM capabilities. This foundational launch took place on the Zksync Era mainnet.

                    Fantom Opera: Shortly after the initial launch, the protocol was deployed on Fantom Opera.

                    Kava: The deployment on Kava introduced enhanced features, including advanced liquidity provision strategies and GMI mechanics.

                    Metis: The most recent update was on Metis, where the protocol was re-launched with a revamped user interface and expanded leverage capabilities.

                Future Plans

                    Expansion via Omni Layer: Looking forward, the WAGMI protocol is set to be deployed on additional blockchain networks through the omni layer. This expansion will facilitate greater decentralization and accessibility, aligning with the protocol's strategic goals.

                Unique features of WAGMI

                    Advanced Liquidity Provision Strategies: WAGMI employs advanced strategies for liquidity provision to optimize returns for users.

                    GMI Mechanics: The protocol introduces a system where users can acquire GMI tokens and benefit from profits shared among GMI holders from multi-pools within a larger GMI pool.

                    Automated Management and Rebalancing: WAGMI continuously monitors market conditions and employs an auto-rebalance mechanism to adjust strategy settings, aiming to ensure higher rewards at all times, irrespective of market shifts.

                    Leverage: The platform offers a general leverage facility, built on concentrated liquidity technology. This system caters to two main participant groups: liquidity providers and traders.

                    User-Friendly Liquidity Management: Users don't need to manually select pools for higher yields as the protocol manages liquidity and selects price ranges in pools to maximize yields, alongside diversifying funds among different pools for security.

                    Multi-Pool Structure: Within GMI, there are multiple multi-pools, and each multi-pool consists of multiple V3 pools, creating a nested structure of liquidity pools.

                    Cross-Blockchain Deployment: The protocol was initially deployed on the Zksync Era mainnet, then on Fantom Opera, and Kava with enhanced features. Our latest deployment was on Metis with revamped UI. Future deployments are planned on other blockchain networks via the omni layer for greater decentralization and accessibility.

                    Profit Sharing Among GMI Holders: Profits generated from all multi-pools within GMI are shared among GMI holders according to their share of GMI, serving as a diversification tool and incentive for users.

                    Wagmi Tokenomics

                    Total Token Supply

                    The total supply of Wagmi tokens is infinite, with an initial minting aimed at facilitating a 1:69 ratio migration for ICE token holders to WAGMI; post-migration, additional tokens are minted to acquire POL, incentivize leverage trading and GMI positions, as well as to build a strategy insurance fund.
                    Distribution of newly minted WAGMI:
                    1. Protocol Growth and Development (80%)

                        This portion (representing 80% of all new WAGMI tokens) is allocated to ensure protocol growth and development.

                        The uses include, but are not limited to:

                            Acquiring POL

                            Incentivizing leverage trading

                            Incentivizing GMI positions

                            Building a strategy insurance fund.

                    2. Operational Multisig (20%)

                        20% of the newly minted WAGMI tokens are dispatched to an operational multisig.

                        This fund controls the tokens to ensure the smooth running of protocol operations. The uses include, but are not limited to:

                            Salaries

                            Legal fund

                            Treasury building

                            Grants

                            Financing audits

                    Control of POL

                    POL will be managed via the main multisig on each chain. Any transactions on this multisig can only commence after a snapshot vote, accompanied by a detailed description outlining the purpose and reasoning behind the intended action.
                    Inflation and Rewards

                        The inflation rate isnt fixed. The protocols objective is to attain deflation as swiftly as possible.

                        Rewards are designed to offer a competitive APR for user liquidity.

                        These parameters are determined by various factors, including:

                            Target liquidity depth

                            Utilization rate

                            APR

                            Marketing requirements
                    
                `;
        } catch (error) {
            console.error("ProjectProvider error:", error);
            return `Error: ${error.message}`;
        }
    }

    private isFound(content: string): boolean {
        const patterns = [
            /\b(?:wagmi|sonic)/i,
        ];

        for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match) {
                return true;
            }
        }

        return null;
    }

}

export const predefinedProvider = new PredefinedProvider();
