import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

import piFlow from "../extensions/index.ts";

const STATE_TYPE = "pi-flow-mode";
const STATUS_KEY = "pi-flow";
const MARKER =
	"You are operating on a piece of work assigned to you by the main agent.";
const PREFERENCE =
	"Pi Flow is enabled for this session: prefer the smallest suitable Pi Flow workflow " +
	"and load at most one matching Pi Flow skill via skill:// when the task fits one. " +
	"For trivial requests, implement directly without workflow ceremony. " +
	"Verify observable behavior before reporting completion. " +
	"The user can disable this preference with /pi-flow off.";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

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

function collectCompatFiles() {
	const files = [];
	const skillsRoot = resolve(root, "compat", "pi", "skills");
	for (const entry of readdirSync(skillsRoot, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const skill = resolve(skillsRoot, entry.name, "SKILL.md");
		if (existsSync(skill)) files.push(skill);
	}
	const promptsRoot = resolve(root, "compat", "pi", "prompts");
	for (const entry of readdirSync(promptsRoot, { withFileTypes: true })) {
		if (entry.isFile() && entry.name.endsWith(".md")) {
			files.push(resolve(promptsRoot, entry.name));
		}
	}
	return files;
}

test("lifecycle smoke: events, command, and marked headless agent do not crash", async () => {
	await resetBridge();
	const extension = createExtension();
	const entries = [
		{ type: "custom", customType: STATE_TYPE, data: { enabled: true } },
		{ type: "custom", customType: STATE_TYPE, data: { enabled: false } },
		{ type: "custom", customType: STATE_TYPE, data: { enabled: "yes" } },
		{ type: "custom", customType: STATE_TYPE, data: null },
		{ type: "custom", customType: STATE_TYPE, data: { enabled: 1 } },
	];
	const context = createContext({ hasUI: true, entries });

	await extension.emit("session_start", {}, context);
	await extension.emit("session_branch", {}, context);
	await extension.emit("session_tree", {}, context);

	assert.equal(context.statuses[STATUS_KEY], "Pi Flow: off");

	await extension.runCommand("on", context);
	assert.equal(context.statuses[STATUS_KEY], "Pi Flow: on");

	await extension.runCommand("off", context);
	assert.equal(context.statuses[STATUS_KEY], "Pi Flow: off");

	await extension.runCommand("on", context);
	assert.deepEqual(
		await extension.emit(
			"before_agent_start",
			{ systemPrompt: MARKER },
			createContext(),
		),
		{ systemPrompt: [MARKER, PREFERENCE] },
	);

	await extension.runCommand("off", context);
	assert.equal(
		await extension.emit(
			"before_agent_start",
			{ systemPrompt: MARKER },
			createContext(),
		),
		undefined,
	);
});

test("published files resolve under the repo root", () => {
	const manifest = JSON.parse(
		readFileSync(resolve(root, "package.json"), "utf8"),
	);

	assert.ok(
		Array.isArray(manifest.files) && manifest.files.length > 0,
		"package.json files must be a non-empty array",
	);
	for (const entry of manifest.files) {
		assert.ok(
			existsSync(resolve(root, entry)),
			`package.json files entry missing: ${entry}`,
		);
	}

	const extensionPath = manifest.omp?.extensions?.[0];
	assert.ok(extensionPath, "omp.extensions[0] must be defined");
	assert.ok(
		existsSync(resolve(root, extensionPath)),
		`omp.extensions entry missing: ${extensionPath}`,
	);

	const skillsPath = manifest.pi?.skills?.[0];
	assert.ok(skillsPath, "pi.skills[0] must be defined");
	assert.ok(
		statSync(resolve(root, skillsPath)).isDirectory(),
		`pi.skills entry must be a directory: ${skillsPath}`,
	);

	const promptsPath = manifest.pi?.prompts?.[0];
	assert.ok(promptsPath, "pi.prompts[0] must be defined");
	assert.ok(
		statSync(resolve(root, promptsPath)).isDirectory(),
		`pi.prompts entry must be a directory: ${promptsPath}`,
	);
});

test("compat metadata contains no non-portable paths", () => {
	const patterns = [
		{ name: "absolute /home/ path", regex: /\/home\// },
		{ name: "absolute /Users/ path", regex: /\/Users\// },
		{ name: "Windows drive-letter path", regex: /[A-Za-z]:\\/ },
		{ name: "backslash path separator", regex: /\\/ },
	];

	const files = collectCompatFiles();
	assert.ok(
		files.length > 0,
		"expected at least one compat file to inspect",
	);

	for (const file of files) {
		const text = readFileSync(file, "utf8");
		const rel = relative(root, file);
		for (const { name, regex } of patterns) {
			assert.doesNotMatch(
				text,
				regex,
				`${rel} matches forbidden ${name} pattern ${regex}`,
			);
		}
	}
});

