import { spawnSync } from "node:child_process";

const probe = spawnSync("bun", ["--version"], { encoding: "utf8" });

if (probe.error) {
  console.error("Pi Flow tests require Bun, the runtime Oh My Pi already ships. Install it from https://bun.sh and run `npm test` again.");
  process.exit(1);
}

const version = String(probe.stdout ?? "").trim();
const major = version ? Number.parseInt(version.split(".")[0], 10) : Number.NaN;

if (!version || Number.isNaN(major) || major < 1) {
  console.error(`Pi Flow tests require Bun 1.x or newer, but found ${version || "no version"}.`);
  process.exit(1);
}

const result = spawnSync("bun", ["test"], { stdio: "inherit" });
process.exit(result.status ?? 1);
