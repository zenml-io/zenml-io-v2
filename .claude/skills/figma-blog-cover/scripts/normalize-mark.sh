#!/usr/bin/env bash
# normalize-mark.sh — run the monorepo's contract normalizer on one chosen candidate SVG.
#
# Usage: scripts/normalize-mark.sh <raw.svg> <slug> [--no-monorepo] [--force]
#
# Resolves the monorepo, in order: $ZENML_FRONTEND_MONOREPO env var, then
# ZENML_FRONTEND_MONOREPO from <repo>/.env, then <repo>/../zenml-frontend-monorepo.
# Fails with a clear message naming ZENML_FRONTEND_MONOREPO if it isn't there. Runs
#   node <monorepo>/shared/hashi/scripts/normalize-service-logo.mjs <raw.svg> <slug> \
#     --force --out-dir .cache/marks/<slug> --preview .cache/marks/<slug>/<slug>.preview.png
# (always --force on the normalizer's own out-dir write: that dir is this skill's scratch cache,
# re-running the same slug against a different candidate is the normal workflow, not a collision).
# Prints the normalizer's JSON verbatim, then, unless --no-monorepo, copies the normalized SVG to
#   <monorepo>/shared/hashi/assets/service-logos/<slug>.svg
# refusing to overwrite an existing file there unless THIS script's own --force is passed (distinct
# from the normalizer's --force above, which only ever touches the scratch cache).
#
# Does not touch Figma. See references/add-mark.md for the full sub-flow this is one step of.
set -uo pipefail

if [[ $# -lt 2 ]]; then
  echo "usage: normalize-mark.sh <raw.svg> <slug> [--no-monorepo] [--force]" >&2
  exit 2
fi
RAW="$1"
SLUG="$2"
shift 2

NO_MONOREPO=0
FORCE=0
for arg in "$@"; do
  case "$arg" in
    --no-monorepo) NO_MONOREPO=1 ;;
    --force) FORCE=1 ;;
    *)
      echo "unknown flag: $arg" >&2
      exit 2
      ;;
  esac
done

if [[ -z "$RAW" || -z "$SLUG" ]]; then
  echo "usage: normalize-mark.sh <raw.svg> <slug> [--no-monorepo] [--force]" >&2
  exit 2
fi
if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "slug \"$SLUG\" must match ^[a-z0-9][a-z0-9-]*\$ (the normalizer's own gate)" >&2
  exit 2
fi
if [[ ! -f "$RAW" ]]; then
  echo "raw SVG not found: $RAW" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO="$(cd "$SKILL_DIR/../../.." && pwd)"

MONOREPO="${ZENML_FRONTEND_MONOREPO:-}"
if [[ -z "$MONOREPO" && -f "$REPO/.env" ]]; then
  MONOREPO="$(grep -m1 '^ZENML_FRONTEND_MONOREPO=' "$REPO/.env" | cut -d'=' -f2- | sed -E 's/^"(.*)"$/\1/; s/^'"'"'(.*)'"'"'$/\1/')"
fi
if [[ -z "$MONOREPO" ]]; then
  MONOREPO="$REPO/../zenml-frontend-monorepo"
fi
NORMALIZER="$MONOREPO/shared/hashi/scripts/normalize-service-logo.mjs"

if [[ ! -d "$MONOREPO" ]]; then
  echo "monorepo not found at: $MONOREPO" >&2
  echo "set ZENML_FRONTEND_MONOREPO (env var or in .env) to the monorepo checkout; the normalizer lives there, so the checkout is required (--no-monorepo only skips the asset copy)" >&2
  exit 1
fi
if [[ ! -f "$NORMALIZER" ]]; then
  echo "normalizer script not found: $NORMALIZER" >&2
  echo "set ZENML_FRONTEND_MONOREPO (env var or in .env) to the correct monorepo path" >&2
  exit 1
fi

OUT_DIR="$REPO/.cache/marks/$SLUG"
PREVIEW="$OUT_DIR/$SLUG.preview.png"
mkdir -p "$OUT_DIR"

JSON_OUT="$(node "$NORMALIZER" "$RAW" "$SLUG" --force --out-dir "$OUT_DIR" --preview "$PREVIEW")"
STATUS=$?
if [[ "$STATUS" -ne 0 ]]; then
  exit "$STATUS"
fi
echo "$JSON_OUT"

NORMALIZED="$OUT_DIR/$SLUG.svg"
if [[ ! -f "$NORMALIZED" ]]; then
  echo "normalizer reported success but $NORMALIZED is missing — do not trust this run" >&2
  exit 1
fi
if [[ ! -f "$PREVIEW" ]]; then
  echo "normalizer reported success but preview $PREVIEW is missing — do not trust this run" >&2
  exit 1
fi

if [[ "$NO_MONOREPO" -eq 1 ]]; then
  echo "--no-monorepo: normalized SVG left at $NORMALIZED, monorepo assets untouched" >&2
  exit 0
fi

DEST_DIR="$MONOREPO/shared/hashi/assets/service-logos"
DEST="$DEST_DIR/$SLUG.svg"
mkdir -p "$DEST_DIR"
if [[ -f "$DEST" && "$FORCE" -eq 0 ]]; then
  echo "$DEST already exists — pass --force to overwrite it" >&2
  exit 1
fi
cp "$NORMALIZED" "$DEST"
echo "copied to $DEST" >&2
