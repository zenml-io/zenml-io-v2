#!/usr/bin/env -S uv run --python 3.12 --with boto3 --with python-dotenv
# /// script
# dependencies = ["boto3", "python-dotenv"]
# ///
"""Upload the 24 images that failed CDN download — using local Webflow export copies."""

import json
import mimetypes
import os
import re
import sys
from hashlib import sha256
from pathlib import Path

from dotenv import load_dotenv
import boto3

ROOT = Path(__file__).resolve().parent.parent.parent
load_dotenv(ROOT / ".env")

SITE_ID = "64a817a2e7e2208272d1ce30"
R2_DOMAIN = "pub-41d587b95acb4b579d9280542922084b.r2.dev"
IMAGES_DIR = ROOT / "design" / "webflow-export" / "extracted" / "images"

s3 = boto3.client(
    "s3",
    endpoint_url=f"https://{os.environ['CLOUDFLARE_ACCOUNT_ID']}.r2.cloudflarestorage.com",
    aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
    region_name="auto",
)
bucket = os.environ.get("R2_BUCKET", "zenml-assets")

# Load URL map from first run
url_map_path = ROOT / "design" / "migration" / "static-image-migration" / "url-map-static.json"
url_map = json.loads(url_map_path.read_text())

FAILED_URLS = [
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/652d14664e7b1ba97d692b8a_cloud_main-1.webp",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/677dca3d6a4a17a9f9e3ec41_whitepaper00.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/cross-screen-media-flow.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/cross-screen-media-markets.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/cross-screen-media-time.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/cross-screen-media-workflow.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/cross-screen-media.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/cross-screen-media-metrics.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/jetbrains-before_after.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/jetbrains-min.svg",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/jetbrains-stack.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/jetbrains-summary.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/jetbrains-timeline.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/mundvetter.jpeg",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/same-pipeline-code.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/soc2type2_zenml.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/tab_bg.avif",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/vlad_jetbrains.jpg",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/zenml-before_after.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/zenml-enterprise-level-ml.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/zenml-code-changes.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/zenml-scripts-vs-steps.png",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/zuiver.svg",
    "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/zuiver_deployment_time_reduction.png",
]


def find_local_file(filename: str) -> Path | None:
    """Find the image in the local Webflow export images dir."""
    direct = IMAGES_DIR / filename
    if direct.exists():
        return direct
    # Try with hash prefix (e.g., 652d14664e7b1ba97d692b8a_cloud_main-1.webp)
    for f in IMAGES_DIR.iterdir():
        if f.name.endswith("_" + filename):
            return f
    return None


def main():
    success = 0
    skipped = 0
    failed = 0

    for url in FAILED_URLS:
        filename = url.rstrip("/").split("/")[-1]
        local_path = find_local_file(filename)

        if not local_path:
            print(f"  SKIP {filename} (not found locally)")
            skipped += 1
            continue

        hash_prefix = sha256(url.encode()).hexdigest()[:8]
        r2_key = f"webflow/{SITE_ID}/{hash_prefix}/{filename}"
        r2_url = f"https://{R2_DOMAIN}/{r2_key}"

        content_type, _ = mimetypes.guess_type(str(local_path))
        extra = {"ContentType": content_type} if content_type else {}

        try:
            s3.upload_file(str(local_path), bucket, r2_key, ExtraArgs=extra)
            url_map[url] = r2_url
            success += 1
            print(f"  ✓ {r2_key}")
        except Exception as e:
            print(f"  ✗ {filename}: {e}")
            failed += 1

    # Save updated URL map
    url_map_path.write_text(json.dumps(url_map, indent=2))
    print(f"\nUploaded: {success}, Skipped: {skipped}, Failed: {failed}")
    print(f"URL map now has {len(url_map)} entries")

    # Now rewrite remaining Webflow CDN URLs in source files
    print("\n✏️  Rewriting remaining URLs in source files...")
    extensions = {".md", ".mdx", ".astro", ".ts", ".tsx"}
    src_dir = ROOT / "src"
    rewritten_files = 0

    cdn_pattern = re.compile(
        r"https://cdn\.prod\.website-files\.com/64a817a2e7e2208272d1ce30/[^\s\"')\]}>]+"
    )

    for path in src_dir.rglob("*"):
        if path.suffix not in extensions or not path.is_file():
            continue
        content = path.read_text(encoding="utf-8")
        original = content

        for old_url, new_url in url_map.items():
            if old_url in content:
                content = content.replace(old_url, new_url)

        if content != original:
            path.write_text(content, encoding="utf-8")
            rewritten_files += 1
            print(f"  ✓ {path.relative_to(ROOT)}")

    print(f"\n✅ Done! Rewrote {rewritten_files} additional files")


if __name__ == "__main__":
    main()
