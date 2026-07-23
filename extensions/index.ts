import type { ExtensionAPI, ExtensionContext } from "@oh-my-pi/pi-coding-agent";

const STATE_TYPE = "pi-flow-mode";
const STATUS_KEY = "pi-flow";

const PREFERENCE =
	"Pi Flow is enabled for this session: prefer the smallest suitable Pi Flow workflow " +
	"and load at most one matching Pi Flow skill via skill:// when the task fits one. " +
	"For trivial requests, implement directly without workflow ceremony. " +
	"Verify observable behavior before reporting completion. " +
	"The user can disable this preference with /pi-flow off.";

interface PiFlowState {
	enabled: boolean;
}

function readPersistedState(ctx: ExtensionContext): PiFlowState | undefined {
	let latest: PiFlowState | undefined;
	for (const entry of ctx.sessionManager.getBranch()) {
		if (entry.type === "custom" && entry.customType === STATE_TYPE) {
			latest = entry.data as PiFlowState;
		}
	}
	return latest;
}

export default function piFlow(pi: ExtensionAPI) {
	let enabled = false;

	const renderStatus = () => `Pi Flow: ${enabled ? "on" : "off"}`;

	const applyStatus = (ctx: ExtensionContext) => {
		if (ctx.hasUI) ctx.ui.setStatus(STATUS_KEY, renderStatus());
	};

	pi.on("session_start", async (_event, ctx) => {
		enabled = readPersistedState(ctx)?.enabled ?? false;
		applyStatus(ctx);
	});

	pi.on("session_branch", async (_event, ctx) => {
		enabled = readPersistedState(ctx)?.enabled ?? false;
		applyStatus(ctx);
	});

	pi.on("session_tree", async (_event, ctx) => {
		enabled = readPersistedState(ctx)?.enabled ?? false;
		applyStatus(ctx);
	});

	pi.registerCommand("pi-flow", {
		description: "Toggle Pi Flow workflow preference for this session",
		handler: async (args, ctx) => {
			const action = args.trim().toLowerCase();
			if (action === "on") {
				enabled = true;
				await pi.appendEntry(STATE_TYPE, { enabled } satisfies PiFlowState);
				applyStatus(ctx);
				ctx.ui.notify("Pi Flow on — preferring Pi Flow workflows this session.", "info");
				return;
			}
			if (action === "off") {
				enabled = false;
				await pi.appendEntry(STATE_TYPE, { enabled } satisfies PiFlowState);
				applyStatus(ctx);
				ctx.ui.notify("Pi Flow off — back to normal skill selection.", "info");
				return;
			}
			if (action === "status" || action === "") {
				ctx.ui.notify(`${renderStatus()} — use /pi-flow on or /pi-flow off.`, "info");
				return;
			}
			ctx.ui.notify(`Unknown action '${args.trim()}'. Use /pi-flow on|off|status.`, "warning");
		},
	});

	pi.on("before_agent_start", async () => {
		if (!enabled) return;
		return { systemPrompt: [PREFERENCE] };
	});
}
