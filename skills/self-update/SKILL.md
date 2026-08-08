---
name: self-update
description: Update the installed Pi Flow package to the latest published version and resolve registry blockers that prevent the update.
disable-model-invocation: true
---

# Self-Update

Update the installed `@fernado03/pi-flow` OMP plugin to the latest version published on npm.

1. Read the installed version with `bash` using `omp plugin list`, and the latest published version using `npm view @fernado03/pi-flow version`. If they match, report already up to date and stop.
2. Install the resolved version with `omp plugin install @fernado03/pi-flow@<latest> --force`. Never install an older version than the installed one unless the user explicitly asks.
3. Verify with `omp plugin list` (shows the new version) and `omp plugin doctor` (all checks ok). Then tell the user to run `/reload-plugins` to refresh discovery in the current session; new sessions pick up the update automatically.
4. If the install fails, fix the cause at the source and retry. Never work around a failed install by copying files into the plugins directory by hand.

## Registry failures

`ConnectionRefused downloading package manifest` means the configured registry is unreachable, not that the package is missing. Check `registry=` overrides in `~/.npmrc`, the project `.npmrc`, and `bunfig.toml`; bun applies them to every install. A private registry that is offline (or a disconnected VPN) breaks all installs, including unrelated packages. Comment out the dead line or override the registry for one command, then retry against `https://registry.npmjs.org`.

A `404` means the version is not published on the registry that answered; confirm which registry responded before assuming the release is missing.

## Completion

Report the previous and new version, the registry that served the package, and any configuration left changed (such as a commented-out registry line the user may want to restore).
