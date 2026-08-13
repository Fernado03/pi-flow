import { existsSync, readdirSync, readFileSync, writeFileSync, statSync, mkdirSync, rmSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const errors = [];

function report(path, message) {
  errors.push(`${relative(root, path) || "."}: ${message}`);
}

// Generated files are compared line-ending-agnostically so a Windows checkout
// that converts LF to CRLF (git core.autocrlf=true) does not report identical
// generated content as stale. Normalizing both sides to LF before comparing
// keeps `--check` portable without weakening genuine-drift detection.
export function normalizeLineEndings(text) {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

export function contentMatches(actual, expected) {
  return normalizeLineEndings(actual) === normalizeLineEndings(expected);
}

function filesIn(directory) {
  if (!existsSync(directory)) return [];
  const entries = readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : entry.isFile() ? [path] : [];
  });
}

function readText(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    report(path, `cannot read file (${error.message})`);
    return "";
  }
}

function frontmatter(path) {
  const text = readText(path);
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!match) {
    report(path, "missing YAML frontmatter delimited by ---");
    return null;
  }

  const fields = new Map();
  const lines = match[1].split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const field = /^([A-Za-z][\w-]*):(?:\s*(.*))?$/.exec(lines[index]);
    if (!field) continue;
    let value = field[2].trim();
    if (value === ">" || value === "|") {
      const block = [];
      while (/^\s+/.test(lines[index + 1] ?? "")) block.push(lines[++index].trim());
      value = value === ">" ? block.join(" ") : block.join("\n");
    }
    fields.set(field[1], value.replace(/^(["'])(.*)\1$/, "$2"));
  }
  return { raw: match[0], fields, body: text.slice(match[0].length) };
}

function validSkillName(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

const translationContract = `# Original Pi Translation Contract

This adapter maps the canonical OMP skill to the original Pi contract (badlogic/pi-mono@9b3a205).

## Translations

- **task batch** → optional original-Pi \`subagent\` extension or direct/sequential work
- **ask** → normal conversational question
- **lsp** → available language-aware navigation/compiler checks or targeted read/bash
- **todo** → markdown checklist
- **glob/grep** → targeted read/bash search
- **browser** → installed browser extension or manual scenario
- **skill://** → load named installed skill

## Source

Canonical skill: \`../../../../skills/<name>/SKILL.md\`

Read the canonical skill file for the complete skill definition. This adapter only provides the translation layer for original Pi compatibility.
`;

function generateSkillAdapter(skillName, metadata) {
  const fields = metadata.fields;
  const name = fields.get("name");
  const description = fields.get("description");
  const disableModelInvocation = fields.get("disable-model-invocation");
  const disableLine = disableModelInvocation === "true" ? "disable-model-invocation: true" : "";
  const frontmatterLines = [
    "---",
    `name: ${name}`,
    `description: ${description}`,
    disableLine,
    "---",
  ].filter(Boolean);
  return `${frontmatterLines.join("\n")}\n\n${translationContract.replace("<name>", skillName)}`;
}

function generatePromptWrapper(skillName, description) {
  const frontmatterLines = [
    "---",
    `description: ${description}`,
    "---",
    "",
    "Locate the installed `@fernado03/pi-flow` package root: check `~/.pi/agent/npm/node_modules/@fernado03/pi-flow`, then `.pi/npm/node_modules/@fernado03/pi-flow`, then wherever it was installed or linked (find it if needed).",
    `Read \`compat/pi/skills/${skillName}/SKILL.md\` inside that root and follow it.`,
    "Apply the loaded skill to $ARGUMENTS.",
  ];
  return frontmatterLines.join("\n");
}

function discoverSkills() {
  const skillsDir = resolve(root, "skills");
  const skills = new Map();
  if (!existsSync(skillsDir)) return skills;

  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    const path = resolve(skillsDir, entry.name);
    if (!entry.isDirectory()) continue;

    const skillFile = resolve(path, "SKILL.md");
    if (!existsSync(skillFile)) continue;

    const metadata = frontmatter(skillFile);
    if (!metadata) continue;

    const name = metadata.fields.get("name");
    const description = metadata.fields.get("description");
    if (!name || !validSkillName(name) || !description) continue;

    skills.set(name, { path: skillFile, metadata });
  }
  return skills;
}

function discoverCommands(skills) {
  const commandsDir = resolve(root, "commands");
  const prompts = new Map();
  if (!existsSync(commandsDir)) return prompts;

  for (const path of filesIn(commandsDir)) {
    const text = readText(path);
    const references = [...text.matchAll(/skill:\/\/([^\s`]+)/g)];
    if (references.length !== 1) continue;

    const skillName = /^(?<name>[a-z0-9]+(?:-[a-z0-9]+)*)(?:\/SKILL\.md)?$/.exec(references[0][1])?.groups?.name;
    if (!skillName || !skills.has(skillName)) continue;

    const metadata = frontmatter(path);
    if (!metadata) continue;

    const description = metadata.fields.get("description");
    if (!description) continue;

    const commandBasename = relative(commandsDir, path).slice(0, -3);
    prompts.set(commandBasename, { skillName, description });
  }
  return prompts;
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function removeDirContents(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) rmSync(path, { recursive: true, force: true });
    else rmSync(path, { force: true });
  }
}

function writeIfDifferent(path, content) {
  if (checkOnly) return;
  const existing = existsSync(path) ? readFileSync(path, "utf8") : null;
  if (existing === null || !contentMatches(existing, content)) {
    writeFileSync(path, content, "utf8");
  }
}

function checkFile(path, expectedContent, label) {
  if (!existsSync(path)) {
    report(path, `${label}: missing generated file`);
    return false;
  }
  const actual = readFileSync(path, "utf8");
  if (!contentMatches(actual, expectedContent)) {
    report(path, `${label}: stale or modified generated file`);
    return false;
  }
  return true;
}

function main() {
  const skills = discoverSkills();
  const prompts = discoverCommands(skills);

  const compatSkillsDir = resolve(root, "compat/pi/skills");
  const compatPromptsDir = resolve(root, "compat/pi/prompts");

  if (!checkOnly) {
    ensureDir(compatSkillsDir);
    ensureDir(compatPromptsDir);
    removeDirContents(compatSkillsDir);
    removeDirContents(compatPromptsDir);
  }

  let skillCount = 0;
  let promptCount = 0;

  for (const [skillName, { metadata }] of skills) {
    const adapter = generateSkillAdapter(skillName, metadata);
    const skillDir = resolve(compatSkillsDir, skillName);
    const skillFile = resolve(skillDir, "SKILL.md");

    if (checkOnly) {
      checkFile(skillFile, adapter, `skill ${skillName}`);
    } else {
      ensureDir(skillDir);
      writeFileSync(skillFile, adapter, "utf8");
      skillCount++;
    }
  }

  for (const [commandBasename, { skillName, description }] of prompts) {
    const wrapper = generatePromptWrapper(skillName, description);
    const promptFile = resolve(compatPromptsDir, `${commandBasename}.md`);

    if (checkOnly) {
      checkFile(promptFile, wrapper, `prompt ${commandBasename}`);
    } else {
      writeFileSync(promptFile, wrapper, "utf8");
      promptCount++;
    }
  }

  if (checkOnly) {
    const expectedSkills = new Set(skills.keys());
    const expectedPrompts = new Set(prompts.keys());

    if (existsSync(compatSkillsDir)) {
      for (const entry of readdirSync(compatSkillsDir, { withFileTypes: true })) {
        if (entry.isDirectory() && !expectedSkills.has(entry.name)) {
          report(resolve(compatSkillsDir, entry.name), `skill ${entry.name}: extra generated directory`);
        }
      }
    }
    if (existsSync(compatPromptsDir)) {
      for (const entry of readdirSync(compatPromptsDir, { withFileTypes: true })) {
        if (entry.isFile() && entry.name.endsWith(".md")) {
          const name = entry.name.slice(0, -3);
          if (!expectedPrompts.has(name)) {
            report(resolve(compatPromptsDir, entry.name), `prompt ${name}: extra generated file`);
          }
        }
      }
    }

    if (errors.length) {
      console.error(`Pi Compat check failed with ${errors.length} violation${errors.length === 1 ? "" : "s"}:`);
      for (const error of errors) console.error(`- ${error}`);
      process.exitCode = 1;
    } else {
      console.log("Pi Compat package check passed.");
    }
  } else {
    console.log(`Generated ${skillCount} skill adapters and ${promptCount} prompt wrappers in compat/pi`);
  }
}

if (import.meta.main) main();