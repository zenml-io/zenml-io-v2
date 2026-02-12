#!/usr/bin/env -S uv run --python 3.12 --with boto3 --with python-dotenv
# /// script
# dependencies = ["boto3", "python-dotenv"]
# ///
"""
Migrate non-CMS static images from Webflow CDN to Cloudflare R2.

Phase 1 only migrated CMS-referenced images. This script handles the
remaining ~95 images referenced in:
  - src/content/ (case-studies, feature-pages, vs-pages, old-projects)
  - src/lib/ (marketing data modules)
  - src/pages/ (hardcoded .astro pages)

Pipeline: scan → download → upload to R2 → rewrite URLs in source files.

Usage:
    uv run scripts/phase1/migrate-static-images.py [--dry-run]

Environment variables (from .env):
    CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
"""

import json
import mimetypes
import os
import re
import sys
import tempfile
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    print("Error: python-dotenv not installed")
    sys.exit(1)

try:
    import boto3
    from botocore.exceptions import ClientError
except ImportError:
    print("Error: boto3 not installed")
    sys.exit(1)

# ── Configuration ────────────────────────────────────────────────────

ROOT = Path(__file__).resolve().parent.parent.parent
SITE_ID = "64a817a2e7e2208272d1ce30"
R2_DOMAIN = "pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev"
WEBFLOW_CDN_PATTERN = re.compile(
    r'https://cdn\.prod\.website-files\.com/64a817a2e7e2208272d1ce30/[^\s"\')\]}>]+'
)
SRC_DIR = ROOT / "src"
OUTPUT_DIR = ROOT / "design" / "migration" / "static-image-migration"


def sha256_hash(s: str) -> str:
    return sha256(s.encode()).hexdigest()


def get_r2_key(original_url: str) -> str:
    """Generate R2 key matching Phase 1 convention: webflow/{siteId}/{hash8}/{filename}"""
    # Extract filename from URL (last path segment, URL-decoded)
    filename = original_url.rstrip("/").split("/")[-1]
    # URL-decode percent-encoded chars for the filename stored in R2
    filename = urllib.request.unquote(filename)
    hash_prefix = sha256_hash(original_url)[:8]
    return f"webflow/{SITE_ID}/{hash_prefix}/{filename}"


def get_r2_url(r2_key: str) -> str:
    return f"https://{R2_DOMAIN}/{r2_key}"


# ── Step 1: Scan ─────────────────────────────────────────────────────

def scan_for_urls() -> dict[str, list[str]]:
    """Scan src/ for Webflow CDN URLs. Returns {url: [files_referencing_it]}."""
    url_to_files: dict[str, list[str]] = {}
    extensions = {".md", ".mdx", ".astro", ".ts", ".tsx"}

    for path in SRC_DIR.rglob("*"):
        if path.suffix not in extensions or not path.is_file():
            continue
        try:
            content = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        for match in WEBFLOW_CDN_PATTERN.finditer(content):
            url = match.group(0)
            # Skip the bare site ID URL (no actual file)
            if url == f"https://cdn.prod.website-files.com/{SITE_ID}":
                continue
            rel_path = str(path.relative_to(ROOT))
            url_to_files.setdefault(url, []).append(rel_path)

    return url_to_files


# ── Step 2: Download ─────────────────────────────────────────────────

def download_image(url: str, dest_dir: Path) -> tuple[str, Path | None, str]:
    """Download a single image. Returns (url, local_path|None, error_msg)."""
    filename = urllib.request.unquote(url.rstrip("/").split("/")[-1])
    local_path = dest_dir / filename

    if local_path.exists():
        return (url, local_path, "")

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "ZenML-Migration/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            local_path.write_bytes(resp.read())
        return (url, local_path, "")
    except Exception as e:
        return (url, None, str(e))


# ── Step 3: Upload to R2 ────────────────────────────────────────────

def upload_to_r2(s3_client, bucket: str, local_path: Path, r2_key: str) -> bool:
    """Upload a single file to R2."""
    content_type, _ = mimetypes.guess_type(str(local_path))
    extra_args = {}
    if content_type:
        extra_args["ContentType"] = content_type

    try:
        s3_client.upload_file(str(local_path), bucket, r2_key, ExtraArgs=extra_args)
        return True
    except Exception as e:
        print(f"  ✗ Upload failed for {r2_key}: {e}")
        return False


# ── Step 4: Rewrite URLs ────────────────────────────────────────────

def rewrite_urls(url_map: dict[str, str], url_to_files: dict[str, list[str]]):
    """Replace Webflow CDN URLs with R2 URLs in all affected files."""
    # Collect all unique files that need rewriting
    files_to_rewrite: dict[str, set[str]] = {}
    for url, files in url_to_files.items():
        if url not in url_map:
            continue
        for f in files:
            files_to_rewrite.setdefault(f, set()).add(url)

    rewritten = 0
    for rel_path, urls in sorted(files_to_rewrite.items()):
        full_path = ROOT / rel_path
        content = full_path.read_text(encoding="utf-8")
        original = content

        for old_url in urls:
            new_url = url_map[old_url]
            content = content.replace(old_url, new_url)

        if content != original:
            full_path.write_text(content, encoding="utf-8")
            rewritten += 1
            print(f"  ✓ Rewrote {len(urls)} URL(s) in {rel_path}")

    return rewritten


# ── Main ─────────────────────────────────────────────────────────────

def main():
    dry_run = "--dry-run" in sys.argv

    # Load environment
    load_dotenv(ROOT / ".env")
    account_id = os.environ.get("CLOUDFLARE_ACCOUNT_ID", "")
    access_key = os.environ.get("R2_ACCESS_KEY_ID", "")
    secret_key = os.environ.get("R2_SECRET_ACCESS_KEY", "")
    bucket = os.environ.get("R2_BUCKET", "zenml-assets")

    if not dry_run and not all([account_id, access_key, secret_key]):
        print("Error: Missing R2 credentials in .env")
        sys.exit(1)

    # Step 1: Scan
    print("📂 Scanning src/ for Webflow CDN URLs...")
    url_to_files = scan_for_urls()
    unique_urls = sorted(url_to_files.keys())
    print(f"   Found {len(unique_urls)} unique URLs across {sum(len(v) for v in url_to_files.values())} references in {len(set(f for files in url_to_files.values() for f in files))} files")

    if dry_run:
        print("\n🔍 DRY RUN — would process these URLs:")
        for url in unique_urls:
            r2_key = get_r2_key(url)
            print(f"  {url}")
            print(f"    → {get_r2_url(r2_key)}")
            print(f"    referenced in: {', '.join(url_to_files[url])}")
        print(f"\n✅ Dry run complete. {len(unique_urls)} images would be migrated.")
        return

    # Ensure output dir
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Step 2: Download
    print("\n⬇️  Downloading images...")
    download_dir = OUTPUT_DIR / "downloads"
    download_dir.mkdir(parents=True, exist_ok=True)

    downloaded: dict[str, Path] = {}
    failed_downloads: list[str] = []

    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {
            pool.submit(download_image, url, download_dir): url
            for url in unique_urls
        }
        for future in as_completed(futures):
            url, local_path, error = future.result()
            if local_path:
                downloaded[url] = local_path
                print(f"  ✓ {local_path.name}")
            else:
                failed_downloads.append(url)
                print(f"  ✗ FAILED: {url} — {error}")

    print(f"   Downloaded: {len(downloaded)}, Failed: {len(failed_downloads)}")

    if failed_downloads:
        print("\n⚠️  Failed downloads:")
        for url in failed_downloads:
            print(f"  - {url}")

    # Step 3: Upload to R2
    print("\n⬆️  Uploading to R2...")
    s3 = boto3.client(
        "s3",
        endpoint_url=f"https://{account_id}.r2.cloudflarestorage.com",
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name="auto",
    )

    url_map: dict[str, str] = {}
    upload_success = 0
    upload_failed = 0

    for url, local_path in sorted(downloaded.items()):
        r2_key = get_r2_key(url)
        r2_url = get_r2_url(r2_key)

        if upload_to_r2(s3, bucket, local_path, r2_key):
            url_map[url] = r2_url
            upload_success += 1
            print(f"  ✓ {r2_key}")
        else:
            upload_failed += 1

    print(f"   Uploaded: {upload_success}, Failed: {upload_failed}")

    # Save URL map
    map_path = OUTPUT_DIR / "url-map-static.json"
    with open(map_path, "w") as f:
        json.dump(url_map, f, indent=2)
    print(f"\n💾 URL map saved to {map_path.relative_to(ROOT)}")

    # Step 4: Rewrite URLs in source files
    print("\n✏️  Rewriting URLs in source files...")
    rewritten = rewrite_urls(url_map, url_to_files)
    print(f"   Rewrote URLs in {rewritten} files")

    # Summary
    print(f"\n{'='*60}")
    print(f"✅ Static image migration complete!")
    print(f"   Scanned:    {len(unique_urls)} unique URLs")
    print(f"   Downloaded: {len(downloaded)}")
    print(f"   Uploaded:   {upload_success}")
    print(f"   Rewrites:   {rewritten} files")
    if failed_downloads:
        print(f"   ⚠️  Failed:  {len(failed_downloads)} downloads")
    if upload_failed:
        print(f"   ⚠️  Failed:  {upload_failed} uploads")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
