#!/usr/bin/env -S uv run --python 3.12 --with boto3 --with python-dotenv
# /// script
# dependencies = ["boto3", "python-dotenv"]
# ///
"""Upload the 2 remaining images that couldn't be matched by filename in local export.

The issue: Webflow URLs use `{hash}_{filename}` but local exports only have `{filename}`.
The previous fallback search tried appending the hash-prefixed name, missing the match.
"""

import json
import mimetypes
import os
import re
from hashlib import sha256
from pathlib import Path

from dotenv import load_dotenv
import boto3

ROOT = Path(__file__).resolve().parent.parent.parent
load_dotenv(ROOT / ".env")

SITE_ID = "64a817a2e7e2208272d1ce30"
R2_DOMAIN = "pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev"
IMAGES_DIR = ROOT / "design" / "webflow-export" / "extracted" / "images"

# The 2 remaining images: (webflow_url, local_filename)
REMAINING = [
    (
        f"https://cdn.prod.website-files.com/{SITE_ID}/64b9920cd04b7c4c0340ce50_og-img-0625.jpg",
        "og-img-0625.jpg",
    ),
    (
        f"https://cdn.prod.website-files.com/{SITE_ID}/677dca3d6a4a17a9f9e3ec41_whitepaper00.png",
        "whitepaper00.png",
    ),
]


def main():
    s3 = boto3.client(
        "s3",
        endpoint_url=f"https://{os.environ['CLOUDFLARE_ACCOUNT_ID']}.r2.cloudflarestorage.com",
        aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
        region_name="auto",
    )
    bucket = os.environ.get("R2_BUCKET", "zenml-assets")

    # Load existing URL map
    url_map_path = ROOT / "design" / "migration" / "static-image-migration" / "url-map-static.json"
    url_map = json.loads(url_map_path.read_text())

    for webflow_url, local_name in REMAINING:
        local_path = IMAGES_DIR / local_name
        if not local_path.exists():
            print(f"  ✗ NOT FOUND: {local_name}")
            continue

        # Use the full Webflow URL (with hash prefix) for the R2 key hash
        url_filename = webflow_url.rstrip("/").split("/")[-1]
        hash_prefix = sha256(webflow_url.encode()).hexdigest()[:8]
        r2_key = f"webflow/{SITE_ID}/{hash_prefix}/{url_filename}"
        r2_url = f"https://{R2_DOMAIN}/{r2_key}"

        content_type, _ = mimetypes.guess_type(str(local_path))
        extra = {"ContentType": content_type} if content_type else {}

        try:
            s3.upload_file(str(local_path), bucket, r2_key, ExtraArgs=extra)
            url_map[webflow_url] = r2_url
            print(f"  ✓ {r2_key}")
        except Exception as e:
            print(f"  ✗ UPLOAD FAIL: {webflow_url} — {e}")

    # Save updated URL map
    url_map_path.write_text(json.dumps(url_map, indent=2))
    print(f"\n  URL map now has {len(url_map)} entries")

    # Rewrite template literals and direct URLs in src/lib/*.ts
    print("\n✏️  Rewriting remaining references in source files...")
    rewritten_files = 0

    for ts_file in sorted((ROOT / "src" / "lib").glob("*.ts")):
        content = ts_file.read_text(encoding="utf-8")
        original = content

        for webflow_url, _ in REMAINING:
            url_filename = webflow_url.rstrip("/").split("/")[-1]
            r2_url = url_map.get(webflow_url)
            if not r2_url:
                continue

            # Replace template literal pattern: ${WEBFLOW_CDN}/hash_filename
            template_pattern = f"${{WEBFLOW_CDN}}/{url_filename}"
            if template_pattern in content:
                content = content.replace(template_pattern, r2_url)

            # Replace direct URL references
            if webflow_url in content:
                content = content.replace(webflow_url, r2_url)

        # Remove orphaned WEBFLOW_CDN constant if no more references
        if "${WEBFLOW_CDN}" not in content and "WEBFLOW_CDN" in original:
            content = re.sub(
                r'^const WEBFLOW_CDN = "https://cdn\.prod\.website-files\.com/[^"]+";?\s*\n',
                "",
                content,
                flags=re.MULTILINE,
            )

        if content != original:
            ts_file.write_text(content, encoding="utf-8")
            rewritten_files += 1
            print(f"  ✓ {ts_file.relative_to(ROOT)}")

    print(f"\n✅ Done! Rewrote {rewritten_files} files")


if __name__ == "__main__":
    main()
