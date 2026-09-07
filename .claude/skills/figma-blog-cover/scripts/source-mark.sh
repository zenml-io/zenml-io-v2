#!/usr/bin/env bash
# source-mark.sh — try the automatic mark sources, in order, for one slug.
#
# Usage: scripts/source-mark.sh <slug> [<display name>]
#
# Order (references/add-mark.md has the full rationale):
#   1. Iconify logos:  https://api.iconify.design/logos/<slug>.svg
#                       https://api.iconify.design/logos/<slug>-icon.svg
#   2. Iconify devicon / selfhst: https://api.iconify.design/devicon/<slug>.svg
#                                 https://api.iconify.design/selfhst/<slug>.svg
#   3. SVGL search:     https://api.svgl.app?search=<display name>
#                        — only entries whose .route (never .wordmark) matches by title
#   4. LobeHub -color:  https://unpkg.com/@lobehub/icons-static-svg@latest/icons/<slug>-color.svg
#                        and, if the slug has hyphens, the hyphen-stripped variant too — LobeHub
#                        often drops them (e.g. pydantic-ai -> pydanticai-color.svg is the real hit;
#                        pydantic-ai-color.svg 404s). Verified live 2026-09-07.
#
# Step 5 (the brand's own site / GitHub org) is NOT automated here — it needs judgement about
# which file in a repo tree is the icon mark, not the wordmark. This script exits 0 either way;
# an empty candidates table means "fall back to step 5 by hand", not an error.
#
# Every candidate that returns a plausible SVG body is saved to
#   .cache/marks/<slug>/candidates/<source-tag>.svg
# and rendered to a same-named .png next to it via render-svg.ts, so the agent can look at the
# table below and open the PNGs before picking one — never pick blind on a URL matching by name.
#
# The Iconify + LobeHub fetches (steps 1, 2, 4 — independent of each other and of SVGL) run as
# background curl jobs (--max-time 8) and are waited on together, then every SVG that came back
# is rendered in ONE render-svg.ts invocation instead of one process per candidate. SVGL (step 3)
# depends on a prior search response and stays sequential.
set -uo pipefail

SLUG="${1:-}"
DISPLAY="${2:-}"
if [[ -z "$SLUG" ]]; then
  echo "usage: source-mark.sh <slug> [<display name>]" >&2
  exit 2
fi
if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "slug \"$SLUG\" must match ^[a-z0-9][a-z0-9-]*\$ (the normalizer's own gate — fix it now, not after sourcing)" >&2
  exit 2
fi
[[ -z "$DISPLAY" ]] && DISPLAY="${SLUG//-/ }"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO="$(cd "$SKILL_DIR/../../.." && pwd)"
CACHE_DIR="$REPO/.cache/marks/$SLUG/candidates"
mkdir -p "$CACHE_DIR"
RENDER="$SCRIPT_DIR/render-svg.ts"

ROWS=()  # each entry: "label|status|bytes|svg_path"

# fetch <url> <out.svg> -> prints an http status, or "200(not-svg)" when the body isn't one, or
# "000" on a curl/network failure. Only leaves a file behind on a real 200 SVG body.
fetch() {
  local url="$1" out="$2" code
  code="$(curl -sSL -o "$out" -w '%{http_code}' --max-time 15 "$url" 2>/dev/null)" || code="000"
  if [[ "$code" == "200" ]]; then
    if ! head -c 300 "$out" 2>/dev/null | grep -qi '<svg'; then
      code="200(not-svg)"
      rm -f "$out"
    fi
  else
    rm -f "$out"
  fi
  echo "$code"
}

try_source() {
  local label="$1" url="$2" tag="$3"
  local svg="$CACHE_DIR/${tag}.svg"
  local png="$CACHE_DIR/${tag}.png"
  local code bytes
  code="$(fetch "$url" "$svg")"
  if [[ "$code" == "200" ]]; then
    bytes="$(wc -c < "$svg" | tr -d ' ')"
    if (cd "$REPO" && pnpm exec tsx "$RENDER" "$svg" "$png" >/dev/null 2>&1); then
      ROWS+=("$label|ok|$bytes|$svg")
    else
      ROWS+=("$label|render-failed|$bytes|$svg")
    fi
  else
    ROWS+=("$label|$code|-|-")
  fi
}

# fetch_bg: same 200/not-svg/000 classification as fetch(), but a shorter timeout (parallel calls,
# a single slow one shouldn't hold up the batch) and the result written to $3 instead of echoed —
# this runs in a background subshell, so stdout isn't the parent shell's to read.
fetch_bg() {
  local url="$1" out="$2" statusfile="$3" code
  code="$(curl -sSL -o "$out" -w '%{http_code}' --max-time 8 "$url" 2>/dev/null)" || code="000"
  if [[ "$code" == "200" ]]; then
    if ! head -c 300 "$out" 2>/dev/null | grep -qi '<svg'; then
      code="200(not-svg)"
      rm -f "$out"
    fi
  else
    rm -f "$out"
  fi
  echo "$code" > "$statusfile"
}

BG_LABELS=()
BG_SVGS=()
BG_STATUS_FILES=()
BG_PIDS=()

# add_bg_source: launch one fetch_bg in the background and remember it for the wait/collect pass below.
add_bg_source() {
  local label="$1" url="$2" tag="$3"
  local svg="$CACHE_DIR/${tag}.svg"
  local statusfile="$CACHE_DIR/${tag}.status"
  BG_LABELS+=("$label")
  BG_SVGS+=("$svg")
  BG_STATUS_FILES+=("$statusfile")
  fetch_bg "$url" "$svg" "$statusfile" &
  BG_PIDS+=("$!")
}

# 1. Iconify logos (icon mark; -icon suffix is the common "just the mark, no wordmark" variant)
add_bg_source "iconify:logos/$SLUG" "https://api.iconify.design/logos/$SLUG.svg" "iconify-logos"
add_bg_source "iconify:logos/$SLUG-icon" "https://api.iconify.design/logos/$SLUG-icon.svg" "iconify-logos-icon"

# 2. Iconify devicon / selfhst
add_bg_source "iconify:devicon/$SLUG" "https://api.iconify.design/devicon/$SLUG.svg" "iconify-devicon"
add_bg_source "iconify:selfhst/$SLUG" "https://api.iconify.design/selfhst/$SLUG.svg" "iconify-selfhst"

# 4. LobeHub -color (slug as given, then hyphens stripped) — launched here (not after SVGL) so it
# runs in parallel with the Iconify fetches above; the printed table order is unaffected.
add_bg_source "lobehub:$SLUG-color" "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/$SLUG-color.svg" "lobehub"
STRIPPED="${SLUG//-/}"
if [[ "$STRIPPED" != "$SLUG" ]]; then
  add_bg_source "lobehub:$STRIPPED-color" "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/$STRIPPED-color.svg" "lobehub-stripped"
fi

if [[ "${#BG_PIDS[@]}" -gt 0 ]]; then
  wait "${BG_PIDS[@]}"
fi

# Render every candidate that came back as a real SVG in ONE render-svg.ts call (multi-file mode)
# instead of one process per candidate.
BG_TO_RENDER=()
for i in "${!BG_LABELS[@]}"; do
  bg_code="$(cat "${BG_STATUS_FILES[$i]}" 2>/dev/null || echo "000")"
  [[ "$bg_code" == "200" ]] && BG_TO_RENDER+=("${BG_SVGS[$i]}")
done
if [[ "${#BG_TO_RENDER[@]}" -gt 0 ]]; then
  # Clear any stale marker from a previous run first — if the batch call below crashes outright
  # (no JSON at all), a leftover marker must not be mistaken for a fresh "ok".
  for svg_to_render in "${BG_TO_RENDER[@]}"; do
    rm -f "${svg_to_render%.svg}.rendered"
  done
  RENDER_JSON_FILE="$CACHE_DIR/.render-batch.json"
  (cd "$REPO" && pnpm exec tsx "$RENDER" "${BG_TO_RENDER[@]}" > "$RENDER_JSON_FILE" 2>/dev/null) || true
  # Drop one ".rendered" marker per svg that actually rendered — bash 3.2 (macOS default) has no
  # associative arrays, so this is the simplest way to look up a batch-render result by path below.
  node -e '
    const fs = require("fs");
    let data;
    try { data = JSON.parse(fs.readFileSync(process.argv[1], "utf8")); } catch { process.exit(0); }
    const rows = Array.isArray(data) ? data : [data];
    for (const r of rows) {
      if (!r || !r.in) continue;
      const marker = r.in.replace(/\.svg$/i, ".rendered");
      if (r.error) { try { fs.unlinkSync(marker); } catch {} }
      else fs.writeFileSync(marker, "ok");
    }
  ' "$RENDER_JSON_FILE" 2>/dev/null || true
fi

for i in "${!BG_LABELS[@]}"; do
  bg_label="${BG_LABELS[$i]}"
  bg_svg="${BG_SVGS[$i]}"
  bg_code="$(cat "${BG_STATUS_FILES[$i]}" 2>/dev/null || echo "000")"
  if [[ "$bg_code" == "200" ]]; then
    bg_bytes="$(wc -c < "$bg_svg" 2>/dev/null | tr -d ' ')"
    if [[ -f "${bg_svg%.svg}.rendered" ]]; then
      ROWS+=("$bg_label|ok|$bg_bytes|$bg_svg")
    else
      ROWS+=("$bg_label|render-failed|$bg_bytes|$bg_svg")
    fi
  else
    ROWS+=("$bg_label|$bg_code|-|-")
  fi
done

# 3. SVGL search — filter to entries whose title plausibly matches, take .route (icon), never .wordmark
SVGL_JSON="$CACHE_DIR/svgl-search.json"
SVGL_QUERY="$(printf '%s' "$DISPLAY" | sed 's/ /%20/g')"
curl -sS --max-time 15 "https://api.svgl.app?search=$SVGL_QUERY" -o "$SVGL_JSON" 2>/dev/null || true
if [[ -s "$SVGL_JSON" ]]; then
  # node, not jq: jq isn't guaranteed on every machine this skill runs on, node is (pnpm project).
  SVGL_URLS="$(node -e '
    const fs = require("fs");
    let data;
    try { data = JSON.parse(fs.readFileSync(process.argv[1], "utf8")); } catch { process.exit(0); }
    if (!Array.isArray(data)) process.exit(0); // {"error": "..."} shape — no hits
    const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const target = norm(process.argv[2]);
    for (const entry of data) {
      const t = norm(entry && entry.title || "");
      if (!t) continue;
      if (t === target || t.includes(target) || target.includes(t)) {
        const route = entry.route;
        const url = typeof route === "string" ? route : route && (route.light || route.dark);
        if (url) console.log(url);
      }
    }
  ' "$SVGL_JSON" "$SLUG" 2>/dev/null || true)"
  i=0
  while IFS= read -r u; do
    [[ -z "$u" ]] && continue
    i=$((i + 1))
    try_source "svgl:$u" "$u" "svgl-$i"
  done <<< "$SVGL_URLS"
  [[ "$i" -eq 0 ]] && ROWS+=("svgl:search \"$DISPLAY\"|no-match|-|-")
else
  ROWS+=("svgl:search \"$DISPLAY\"|no-response|-|-")
fi

printf '%-34s %-16s %8s  %s\n' "source" "status" "bytes" "svg"
FOUND=0
for row in "${ROWS[@]}"; do
  IFS='|' read -r label status bytes svg <<< "$row"
  printf '%-34s %-16s %8s  %s\n' "$label" "$status" "$bytes" "$svg"
  [[ "$status" == "ok" ]] && FOUND=$((FOUND + 1))
done

echo
if [[ "$FOUND" -eq 0 ]]; then
  echo "No automatic candidate found for \"$SLUG\" — fall back to the brand's own site / GitHub org (references/add-mark.md, sourcing step 5)."
else
  echo "$FOUND candidate(s) saved under $CACHE_DIR — open the .png files, pick one, then run normalize-mark.sh on its .svg."
fi
exit 0
