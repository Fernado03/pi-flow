import assert from "node:assert/strict";
import test from "node:test";

import piFlow, { isPiFlowState } from "../extensions/index.ts";

const STATE_TYPE = "pi-flow-mode";
const MARKER =
	"You are operating on a piece of work assigned to you by the main agent.";
const PREFERENCE =
	"Pi Flow is enabled for this session: prefer the smallest suitable Pi Flow workflow " +
	"and load at most one matching Pi Flow skill via skill:// when the task fits one. " +
	"For trivial requests, implement directly without workflow ceremony. " +
	"Verify observable behavior before reporting completion. " +
	"The user can disable this preference with /pi-flow off.";

function createExtension() {
	const handlers = new Map();
	const commands = new Map();
	const entries = [];

	piFlow({
		on(event, handler) {
			handlers.set(event, handler);
		},
		registerCommand(name, command) {
			commands.set(name, command);
		},
		async appendEntry(customType, data) {
			entries.push({ type: "custom", customType, data });
		},
	});

	return {
		entries,
		emit(event, payload, context) {
			return handlers.get(event)(payload, context);
		},
		runCommand(args, context) {
			return commands.get("pi-flow").handler(args, context);
		},
	};
}

function createContext({ hasUI = false, entries = [] } = {}) {
	const statuses = {};
	return {
		hasUI,
		sessionManager: {
			getBranch() {
				return entries;
			},
		},
		ui: {
			notify() {},
			setStatus(key, value) {
				statuses[key] = value;
			},
		},
		statuses,
	};
}

async function resetBridge() {
	const topLevel = createExtension();
	await topLevel.emit("session_start", {}, createContext({ hasUI: true }));
}

test("isPiFlowState accepts valid states", () => {
	assert.equal(isPiFlowState({ enabled: true }), true);
	assert.equal(isPiFlowState({ enabled: false }), true);
	assert.equal(isPiFlowState({ enabled: true, extra: "ignored" }), true);
});

test("isPiFlowState rejects malformed states", () => {
	const malformed = [
		null,
		undefined,
		"on",
		42,
		true,
		{ enabled: "yes" },
		{ enabled: 1 },
		{},
		[],
		{ enabled: null },
	];
	for (const value of malformed) {
		assert.equal(isPiFlowState(value), false, JSON.stringify(value));
	}
});

test("malformed persisted state never flips the bridge or crashes", async () => {
	const malformed = [{ enabled: "yes" }, null, { enabled: 1 }];
	for (const data of malformed) {
		const extension = createExtension();
		const context = createContext({
			hasUI: true,
			entries: [{ type: "custom", customType: STATE_TYPE, data }],
		});
		await extension.emit("session_start", {}, context);
		assert.equal(context.statuses["pi-flow"], "Pi Flow: off");
		assert.equal(
			await extension.emit(
				"before_agent_start",
				{ systemPrompt: MARKER },
				createContext(),
			),
			undefined,
		);
	}
});

test("valid enabled persisted state turns the bridge on", async () => {
	await resetBridge();
	const extension = createExtension();
	const context = createContext({
		hasUI: true,
		entries: [{ type: "custom", customType: STATE_TYPE, data: { enabled: true } }],
	});
	await extension.emit("session_start", {}, context);
	assert.equal(context.statuses["pi-flow"], "Pi Flow: on");
	assert.deepEqual(
		await extension.emit(
			"before_agent_start",
			{ systemPrompt: MARKER },
			createContext(),
		),
		{ systemPrompt: [MARKER, PREFERENCE] },
	);
});

test("valid disabled persisted state keeps the bridge off", async () => {
	await resetBridge();
	const extension = createExtension();
	const context = createContext({
		hasUI: true,
		entries: [{ type: "custom", customType: STATE_TYPE, data: { enabled: false } }],
	});
	await extension.emit("session_start", {}, context);
	assert.equal(context.statuses["pi-flow"], "Pi Flow: off");
	assert.equal(
		await extension.emit(
			"before_agent_start",
			{ systemPrompt: MARKER },
			createContext(),
		),
		undefined,
	);
});
