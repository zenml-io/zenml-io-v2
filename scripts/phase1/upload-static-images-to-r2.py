#!/usr/bin/env python3
"""Upload all static images from the URL map to R2.

Reads url-map-static.json, finds local files in:
  1. design/migration/static-image-migration/downloads/
  2. design/webflow-export/extracted/images/
  3. design/webflow-export/extracted/ (for non-image files)
Then uploads each to R2 with the correct key.
"""

import json
import mimetypes
import os
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

import boto3
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")

DOWNLOADS_DIR = ROOT / "design/migration/static-image-migration/downloads"
WEBFLOW_IMAGES_DIR = ROOT / "design/webflow-export/extracted/images"
WEBFLOW_EXTRACTED_DIR = ROOT / "design/webflow-export/extracted"

s3 = boto3.client(
    "s3",
    endpoint_url=os.environ["R2_ENDPOINT"],
    aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
    region_name="auto",
)
BUCKET = os.environ["R2_BUCKET"]


def find_local_file(filename: str) -> Path | None:
    """Find a local file matching the given filename."""
    # Try downloads directory first
    candidate = DOWNLOADS_DIR / filename
    if candidate.exists():
        return candidate

    # Try webflow export images directory
    candidate = WEBFLOW_IMAGES_DIR / filename
    if candidate.exists():
        return candidate

    # Try broader webflow export
    for p in WEBFLOW_EXTRACTED_DIR.rglob(filename):
        return p

    # Some filenames in the URL map include Webflow hash prefix (e.g. "670e2f23..._airbus.svg")
    # but the local export might just have "airbus.svg"
    # Extract the base name after the Webflow hash prefix
    parts = filename.split("_", 1)
    if len(parts) == 2:
        base_name = parts[1]
        for search_dir in [DOWNLOADS_DIR, WEBFLOW_IMAGES_DIR]:
            candidate = search_dir / base_name
            if candidate.exists():
                return candidate
        for p in WEBFLOW_EXTRACTED_DIR.rglob(base_name):
            return p

    return None


def guess_content_type(filename: str) -> str:
    """Guess MIME type from filename."""
    ct, _ = mimetypes.guess_type(filename)
    if ct:
        return ct
    ext = Path(filename).suffix.lower()
    return {
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
        ".avif": "image/avif",
        ".json": "application/json",
        ".lottie": "application/json",
        ".pdf": "application/pdf",
    }.get(ext, "application/octet-stream")


def main():
    url_map_path = ROOT / "design/migration/static-image-migration/url-map-static.json"
    with open(url_map_path) as f:
        url_map = json.load(f)

    print(f"URL map has {len(url_map)} entries")

    # First check which already exist in R2
    existing_keys = set()
    paginator = s3.get_paginator("list_objects_v2")
    for page in paginator.paginate(Bucket=BUCKET):
        for obj in page.get("Contents", []):
            existing_keys.add(obj["Key"])
    print(f"Bucket has {len(existing_keys)} existing objects")

    uploaded = 0
    skipped = 0
    already_exists = 0
    missing_local = 0
    errors = []

    for webflow_url, r2_url in sorted(url_map.items()):
        parsed = urlparse(r2_url)
        r2_key = unquote(parsed.path.lstrip("/"))

        # Check if already in R2
        if r2_key in existing_keys:
            already_exists += 1
            continue

        # Extract filename from R2 key (last path segment)
        filename = r2_key.split("/")[-1]

        local_file = find_local_file(filename)
        if not local_file:
            missing_local += 1
            errors.append(f"MISSING LOCAL: {filename} (for key {r2_key})")
            continue

        content_type = guess_content_type(filename)
        try:
            s3.upload_file(
                str(local_file),
                BUCKET,
                r2_key,
                ExtraArgs={"ContentType": content_type},
            )
            uploaded += 1
            if uploaded % 10 == 0:
                print(f"  ... uploaded {uploaded} so far")
        except Exception as e:
            errors.append(f"UPLOAD ERROR: {r2_key} -> {e}")

    print(f"\n--- Results ---")
    print(f"Uploaded:       {uploaded}")
    print(f"Already in R2:  {already_exists}")
    print(f"Missing local:  {missing_local}")
    print(f"Total:          {uploaded + already_exists + missing_local}")

    if errors:
        print(f"\n--- Errors ({len(errors)}) ---")
        for err in errors:
            print(f"  {err}")

    return 0 if not errors else 1


if __name__ == "__main__":
    sys.exit(main())
