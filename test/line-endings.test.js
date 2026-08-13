import assert from "node:assert/strict";
import test from "node:test";

import { contentMatches, normalizeLineEndings } from "../scripts/build-pi-compat.js";

const CRLF_CONTENT = "line one\r\nline two\r\nline three\r\n";
const LF_CONTENT = "line one\nline two\nline three\n";

test("normalizeLineEndings maps CRLF and lone CR to LF", () => {
	assert.equal(normalizeLineEndings(CRLF_CONTENT), LF_CONTENT);
	assert.equal(
		normalizeLineEndings("alpha\rbeta\ngamma\r\n"),
		"alpha\nbeta\ngamma\n",
	);
	assert.equal(normalizeLineEndings(LF_CONTENT), LF_CONTENT);
});

test("contentMatches accepts LF vs CRLF variants of identical content", () => {
	assert.equal(contentMatches(CRLF_CONTENT, LF_CONTENT), true);
	assert.equal(contentMatches(LF_CONTENT, CRLF_CONTENT), true);
});

test("contentMatches rejects genuinely different content", () => {
	const expected = "Canonical skill: `../../../../skills/example/SKILL.md`";
	const changed = "Canonical skill: `../../../../skills/other/SKILL.md`";
	assert.equal(contentMatches(changed, expected), false);
	assert.equal(contentMatches(expected, changed), false);
});
