import assert from "node:assert/strict";
import test from "node:test";

import piFlow from "../extensions/index.ts";

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
	return {
		hasUI,
		sessionManager: {
			getBranch() {
				return entries;
			},
		},
		ui: {
			notify() {},
			setStatus() {},
		},
	};
}

async function resetBridge() {
	const topLevel = createExtension();
	await topLevel.emit("session_start", {}, createContext({ hasUI: true }));
}

test("parent /pi-flow on enables a marked child without persisting child state", async () => {
	await resetBridge();
	const parent = createExtension();
	const child = createExtension();

	await parent.runCommand("on", createContext({ hasUI: true }));
	await child.emit("session_start", {}, createContext());

	const base = `prefix\n${MARKER}`;
	const result = await child.emit(
		"before_agent_start",
		{ systemPrompt: base },
		createContext(),
	);
	assert.deepEqual(result, { systemPrompt: [base, PREFERENCE] });
	assert.equal(result.systemPrompt.filter((prompt) => prompt === PREFERENCE).length, 1);
	assert.deepEqual(child.entries, []);
});

test("enabled top-level prompts preserve their base and append PREFERENCE once", async () => {
	await resetBridge();
	const topLevel = createExtension();
	const context = createContext({ hasUI: true });

	await topLevel.runCommand("on", context);
	const first = await topLevel.emit(
		"before_agent_start",
		{ systemPrompt: "core prompt" },
		context,
	);
	assert.deepEqual(first, { systemPrompt: ["core prompt", PREFERENCE] });

	const second = await topLevel.emit(
		"before_agent_start",
		{ systemPrompt: first.systemPrompt },
		context,
	);
	assert.deepEqual(second, first);
	assert.equal(second.systemPrompt.filter((prompt) => prompt === PREFERENCE).length, 1);
});

test("parent /pi-flow off disables a marked child", async () => {
	await resetBridge();
	const parent = createExtension();
	const child = createExtension();

	await parent.runCommand("on", createContext({ hasUI: true }));
	await parent.runCommand("off", createContext({ hasUI: true }));

	assert.equal(
		await child.emit("before_agent_start", { systemPrompt: MARKER }, createContext()),
		undefined,
	);
});

test("an unmarked headless prompt does not inherit parent state", async () => {
	await resetBridge();
	const parent = createExtension();
	const headless = createExtension();

	await parent.runCommand("on", createContext({ hasUI: true }));

	assert.equal(
		await headless.emit(
			"before_agent_start",
			{ systemPrompt: "Unrelated headless request" },
			createContext(),
		),
		undefined,
	);
});

test("headless child session_start cannot reset the parent bridge", async () => {
	await resetBridge();
	const parent = createExtension();
	const child = createExtension();

	await parent.runCommand("on", createContext({ hasUI: true }));
	await child.emit("session_start", {}, createContext());

	assert.deepEqual(
		await child.emit("before_agent_start", { systemPrompt: MARKER }, createContext()),
		{ systemPrompt: [MARKER, PREFERENCE] },
	);
});

test("interactive top-level session_start without state resets the bridge off", async () => {
	await resetBridge();
	const parent = createExtension();
	const nextTopLevel = createExtension();
	const child = createExtension();

	await parent.runCommand("on", createContext({ hasUI: true }));
	await nextTopLevel.emit("session_start", {}, createContext({ hasUI: true }));

	assert.equal(
		await child.emit("before_agent_start", { systemPrompt: MARKER }, createContext()),
		undefined,
	);
});
