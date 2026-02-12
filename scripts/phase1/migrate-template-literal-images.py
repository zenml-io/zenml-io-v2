#!/usr/bin/env -S uv run --python 3.12 --with boto3 --with python-dotenv
# /// script
# dependencies = ["boto3", "python-dotenv"]
# ///
"""
Migrate images referenced via WEBFLOW_CDN template literals in src/lib/*.ts.

These use patterns like: `${WEBFLOW_CDN}/abc123_image.webp`
which the URL-regex-based scanner can't match (URL is split across constant + template).

This script resolves the template literals, downloads, uploads to R2,
and rewrites the template to a full R2 URL string.
"""

import json
import mimetypes
import os
import re
import sys
import urllib.request
from hashlib import sha256
from pathlib import Path

from dotenv import load_dotenv
import boto3

ROOT = Path(__file__).resolve().parent.parent.parent
load_dotenv(ROOT / ".env")

SITE_ID = "64a817a2e7e2208272d1ce30"
WEBFLOW_CDN_BASE = f"https://cdn.prod.website-files.com/{SITE_ID}"
R2_DOMAIN = "pub-41d587b95acb4b579d9280542922084b.r2.dev"
IMAGES_DIR = ROOT / "design" / "webflow-export" / "extracted" / "images"
DOWNLOAD_DIR = ROOT / "design" / "migration" / "static-image-migration" / "downloads"

# Load existing URL map
URL_MAP_PATH = ROOT / "design" / "migration" / "static-image-migration" / "url-map-static.json"

# Pattern to find ${WEBFLOW_CDN}/path template literals
TEMPLATE_PATTERN = re.compile(r'\$\{WEBFLOW_CDN\}/([^\s`"\']+)')

# Files to process
LIB_DIR = ROOT / "src" / "lib"


def sha256_hash(s: str) -> str:
    return sha256(s.encode()).hexdigest()


def get_r2_key(original_url: str) -> str:
    filename = original_url.rstrip("/").split("/")[-1]
    filename = urllib.request.unquote(filename)
    hash_prefix = sha256_hash(original_url)[:8]
    return f"webflow/{SITE_ID}/{hash_prefix}/{filename}"


def get_r2_url(r2_key: str) -> str:
    return f"https://{R2_DOMAIN}/{r2_key}"


def download_image(url: str, dest_dir: Path) -> Path | None:
    """Download from CDN, falling back to local Webflow export."""
    filename = urllib.request.unquote(url.rstrip("/").split("/")[-1])
    local_path = dest_dir / filename

    if local_path.exists():
        return local_path

    # Try CDN download first
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "ZenML-Migration/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            local_path.write_bytes(resp.read())
        return local_path
    except Exception:
        pass

    # Fallback to local Webflow export
    export_path = IMAGES_DIR / filename
    if export_path.exists():
        return export_path

    # Try with hash prefix
    for f in IMAGES_DIR.iterdir():
        if f.name.endswith("_" + filename):
            return f

    return None


def main():
    s3 = boto3.client(
        "s3",
        endpoint_url=f"https://{os.environ['CLOUDFLARE_ACCOUNT_ID']}.r2.cloudflarestorage.com",
        aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
        region_name="auto",
    )
    bucket = os.environ.get("R2_BUCKET", "zenml-assets")

    url_map = json.loads(URL_MAP_PATH.read_text()) if URL_MAP_PATH.exists() else {}
    DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

    # Step 1: Find all template literal image references
    print("📂 Scanning src/lib/*.ts for WEBFLOW_CDN template literals...")
    file_references: dict[Path, list[tuple[str, str]]] = {}  # file -> [(path_suffix, full_url)]

    for ts_file in sorted(LIB_DIR.glob("*.ts")):
        content = ts_file.read_text(encoding="utf-8")
        if "WEBFLOW_CDN" not in content:
            continue

        matches = TEMPLATE_PATTERN.findall(content)
        if matches:
            pairs = [(m, f"{WEBFLOW_CDN_BASE}/{m}") for m in matches]
            file_references[ts_file] = pairs
            print(f"  {ts_file.name}: {len(matches)} image references")

    all_urls = set()
    for pairs in file_references.values():
        for _, url in pairs:
            all_urls.add(url)

    print(f"\n  Total unique URLs: {len(all_urls)}")

    # Step 2: Download + Upload
    print("\n⬇️⬆️ Download + Upload to R2...")
    new_mappings = 0
    for url in sorted(all_urls):
        if url in url_map:
            continue  # Already migrated

        local_path = download_image(url, DOWNLOAD_DIR)
        if not local_path:
            print(f"  ✗ NOT FOUND: {url}")
            continue

        r2_key = get_r2_key(url)
        r2_url = get_r2_url(r2_key)

        content_type, _ = mimetypes.guess_type(str(local_path))
        extra = {"ContentType": content_type} if content_type else {}

        try:
            s3.upload_file(str(local_path), bucket, r2_key, ExtraArgs=extra)
            url_map[url] = r2_url
            new_mappings += 1
            print(f"  ✓ {r2_key}")
        except Exception as e:
            print(f"  ✗ UPLOAD FAIL: {url} — {e}")

    print(f"\n  New uploads: {new_mappings}")

    # Save updated URL map
    URL_MAP_PATH.write_text(json.dumps(url_map, indent=2))

    # Step 3: Rewrite template literals to full R2 URLs
    print("\n✏️  Rewriting template literals in source files...")
    rewritten_files = 0

    for ts_file, pairs in sorted(file_references.items()):
        content = ts_file.read_text(encoding="utf-8")
        original = content

        for path_suffix, full_url in pairs:
            if full_url not in url_map:
                continue
            r2_url = url_map[full_url]
            # Replace `${WEBFLOW_CDN}/path` with just the R2 URL (keep backtick context)
            old_pattern = f"${{WEBFLOW_CDN}}/{path_suffix}"
            content = content.replace(old_pattern, r2_url)

        if content != original:
            # Remove the now-unused WEBFLOW_CDN constant if no more references
            if "${WEBFLOW_CDN}" not in content:
                # Remove the const line
                content = re.sub(
                    r'^const WEBFLOW_CDN = "https://cdn\.prod\.website-files\.com/[^"]+";?\s*\n',
                    "",
                    content,
                    flags=re.MULTILINE,
                )

            ts_file.write_text(content, encoding="utf-8")
            rewritten_files += 1
            print(f"  ✓ {ts_file.relative_to(ROOT)}")

    print(f"\n✅ Done! Rewrote {rewritten_files} files, {new_mappings} new R2 uploads")
    print(f"   URL map has {len(url_map)} total entries")


if __name__ == "__main__":
    main()
