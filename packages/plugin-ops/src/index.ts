import type { Plugin } from "@elizaos/core"
import { getProjectAction } from "./actions/projectAction"
import { getLoginAction } from "./actions/loginAction"
import { getSingleProjectAction } from "./actions/singleProjectAction"
import { geBalanceAction } from "./actions/balanceAction"
import { getTransferAction } from "./actions/transferAction"
import { getQuoteAction } from "./actions/swap/quoteAction"
import { ProjectProvider } from "./providers/projectProvider"
import { ProfileProvider } from "./providers/profileProvider"
import { SwapTokenProvider } from "./providers/swapTokenProvider"
import { PredefinedProvider } from "./providers/predefinedProvider"

export const OpsPlugin: Plugin = {
	name: "Ops",
	description: "Web3 ops",
	actions: [getTransferAction, geBalanceAction, getLoginAction, getQuoteAction],
	evaluators: [],
	providers: [new ProfileProvider(), new SwapTokenProvider(), new PredefinedProvider()],
}

export default OpsPlugin
