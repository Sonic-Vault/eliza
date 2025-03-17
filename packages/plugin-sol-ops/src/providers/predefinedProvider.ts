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

                ## Sonic SVM Token ($SONIC): 
                With a total supply of 2,400,000,000 $SONIC, the token allocation is designed to ensure long-term ecosystem growth, community engagement, and network security. 15% of $SONIC will enter circulation at TGE , driving early adoption and incentivizing key ecosystem participants.
 
                57% of $SONIC will be allocated to the Sonic SVM Community, including tokens reserved for Ecosystem & Community, Initial Claims, and Sonic HyperGrid Rewards.
                Ecosystem & Community (30%)

                30% of $SONIC tokens are allocated to the Sonic SVM Ecosystem & Community, reserved for ecosystem development. This includes grants for game studios and dApp developers building within the Sonic SVM ecosystem. Grants will be awarded upon achieving specific development milestones that drive network growth and user engagement.
                Initial Claims (7%)

                7% of $SONIC is reserved for exclusive airdrops, rewarding top contributors from the Sonic AVS delegation, Sonic Odyssey, SonicX, HyperFuse Observer Node holders**,** and early supporters of Mirror World and World Store.
                Sonic HyperGrid Rewards (20%)

                20% of $SONIC tokens are reserved for Sonic HyperGrid Rewards, allocated as follows:
                Validator Rewards: 10% of $SONIC is allocated to Sonic HyperGrid validators for securing the network and maintaining blockchain performance, ensuring stability and decentralization.
                Observation Node Rewards: 10% of $SONIC is allocated to HyperFuse Guardian Nodes, with 9% reserved for node operators and 1% designated for Node Referral Rewards.
                Early supporters (8%)

                8% of $SONIC tokens are allocated to early supporters who backed our vision in the early stages, providing initial funding and helping shape the foundation of our project. Tokens will be subject to a 12-month cliff, followed by a 24-month linear vesting schedule. Tokens will remain locked and unstakable until fully vested.
                Investors (15%)

                15% of $SONIC tokens are allocated to investors, subject to a 12-month cliff, followed by a 24-month linear vesting schedule. Tokens will remain locked and unstakable until fully vested.
                Foundation (20%)

                20% of $SONIC tokens are reserved for the Foundation, including Team Members and Advisors from Engineering, Product, Community & Marketing, Business Development, Strategy, and other key workstreams. Tokens will be subject to an 18-month cliff followed by a 36-month linear vesting schedule, during which they will remain locked and unstakable.

                ## Sonic Token Utility

                The $SONIC token serves multiple purposes within the Sonic ecosystem:
                Utility token on Sonic SVM - with 10+ major games live, millions of users onboarded through testnet, supporting SonicX and the TikTok applayer.
                Payment Currency: $SONIC Sonic will be used within platforms and applications built on top of the rollup as a form of payment - redemption or access to dollar-valuable goods and services via the spending or holding of the token.
                Staking Rewards: Users can stake $SONIC to contribute to network security and ecosystem growth. In return, stakers receive rewards, further incentivizing participation in the network.
                Governance Voting: $SONIC or $VeSONIC tokens enable users to participate in important community governance decisions, fostering engagement and collective decision-making.
                Sonic HyperGrid, where $SONIC would be the currency powering the multi-SVM ecosystem - mention injective SVM launch, and more to come which will use the $SONIC token:
                Sonic Hypergrid Validators are required to stake Sonic, and are compensated in both emitted veSonic and surplus fees generated from estimating and collecting SOL to ultimately submit transactions
                Validator Delegation for Rewards: Users can delegate $SONIC to validators, increasing the staked amount to enhance the HyperGrid Shared Sequencer Network’s (HSSN) reward pool. Delegators earn rewards in return for their contributions.

                ## Sonic Roadmap
                Phase 1: Network Genesis (Q4/2024 - Q1/2025)
                HyperGrid Network Genesis: Launch of the HyperGrid Shared State Network, enabling the creation of interconnected SVM networks for seamless interoperability.
                Sonic SVM Genesis: Official genesis of the Sonic SVM network, laying the foundation for scalable onchain gaming.
                HyperFuse Network Security: Deployment of a decentralized node collective to secure HyperGrid operations with maximum accuracy and integrity.
                $SONIC TGE: Official Token Generation Event for $SONIC, unlocking its full ecosystem potential.

                Phase 2: Mainnet Alpha Launch (Q1/2025)
                Sonic Mainnet-Alpha: Official deployment of the Sonic SVM Mainnet-Alpha with key services including Bridges, DEX, Oracles, and NFT Programs.
                Sonic X - TikTok App Layer: Launch of native Android and iOS apps to support high-quality games and digital asset distribution.
                Sonic Bridge: Integration of the official Token Bridge supporting assets like SOL, sSOL, sonicSOL, and stablecoins (USDC/T).
                HSSN Validator Onboarding: Activation of all HSSN validators to secure and operate the network.

                Phase 3: Ecosystem Expansion (Q2/2025)
                HyperGrid Optimistic Rollup Stack: Integration of new SVMs on the HyperGrid Optimistic Rollup Stack, enhancing scalability.
                Grid v2 Deployment: Testnet release of Sonic Grid v2, followed by Mainnet integration for upgraded network performance.
                $SONIC Staking & Rewards: Introduction of $SONIC staking programs, enabling holders to stake and delegate with HSSN validators for rewards. A slashing mechanism will be implemented to ensure network security.
                RUSH ECS Growth: Expansion of the Rush ECS framework with new SDK clients to support more onchain games and use cases.

                Bridging
                    https://bridge.sonic.game/
                    https://www.usenexus.org/

                Wallet supported:
                    OKX Wallet
                    Bybit wallet
                    Backpack
                    Phantom
                    Nightly

                List of exchange
                    Contract Address: SonicxvLud67EceaEzCLRnMTBqzYUUYNr93DBkBdDES

                Jupiter, OKX, Bybit, KuCoin. Bitget, Gate, Mexc, Backpack, Trubit, Hashkey, BingX
                Docs: https://docs.sonic.game/

                `;
        } catch (error) {
            console.error("ProjectProvider error:", error);
            return `Error: ${error.message}`;
        }
    }

    private isFound(content: string): boolean {
        const patterns = [
            /\b(?:token|sonic)/i,
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
