#!/usr/bin/env bash
# Reject a shell command line when it contains a protected git operation.
set -euo pipefail

command_line="$*"
if [[ -z "$command_line" && ! -t 0 ]]; then
  command_line="$(cat)"
fi

patterns=(
  'git[[:space:]]+push([[:space:]]|$)'
  'git[[:space:]]+reset[[:space:]]+--hard([[:space:]]|$)'
  'git[[:space:]]+clean([[:space:]]+[^;&|[:space:]]+)*[[:space:]]+(-f|--force)([[:space:]]|$)'
  'git[[:space:]]+branch[[:space:]]+-D([[:space:]]|$)'
  'git[[:space:]]+checkout[[:space:]]+\.([[:space:]]|$)'
  'git[[:space:]]+restore[[:space:]]+\.([[:space:]]|$)'
  'push[[:space:]]+--force([[:space:]]|$)'
  'reset[[:space:]]+--hard([[:space:]]|$)'
)

for pattern in "${patterns[@]}"; do
  if [[ "$command_line" =~ $pattern ]]; then
    printf "BLOCKED: %q matches protected git operation %q.\n" "$command_line" "$pattern" >&2
    exit 2
  fi
done
exit 0
