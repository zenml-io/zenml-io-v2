#!/usr/bin/env python3
"""Fix all missing homepage images.

For SVGs blocked on Webflow CDN (403): use equivalent local export files.
For brevo/cross_screen_media: download the actual format from Webflow.
"""

import hashlib
import mimetypes
import os
import sys
import tempfile
from pathlib import Path

import boto3
import requests
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")

IMAGES_DIR = ROOT / "design/webflow-export/extracted/images"

s3 = boto3.client(
    "s3",
    endpoint_url=os.environ["R2_ENDPOINT"],
    aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
    region_name="auto",
)
BUCKET = os.environ["R2_BUCKET"]
SITE_ID = "64a817a2e7e2208272d1ce30"

# Map: (hash_prefix, expected_filename) -> local_file_path
# These are the R2 keys homepage.ts expects -> local export file to use as source
LOCAL_SUBSTITUTIONS = {
    ("6a2ae7e3", "670e2f23d254a9be9e02e50f_airbus.svg"): "66e826c67966c0e639be6591_airbus.svg",
    ("5f1b0e8a", "670e2f23b0b89bea22ecee3c_axa-min.svg"): "66c84308916684f0d07b57ff_axa-min.svg",
    ("e8e86576", "670e2f2398fcad5e2e8f2775_bundeswehr.svg"): "bundeswehr.svg",
    ("4f6e5fe1", "670e2f2349aab64d5e4eeeb3_enel-min.svg"): "66c84308b1e802ab9a246134_enel-min.svg",
    ("60b5e34d", "670e2f23ee3f2feee5e7e7e2_jetbrains-min.svg"): "jetbrains-min.svg",
    ("db4b0c5a", "670e2f2331d7f8f62e12458e_koble.svg"): "koble.svg",
    ("d28fbdf4", "670e2f23e2b3ba3756fae38e_leroy_merlin_logo-min.svg"): "65ddeac9b83eea2954b5a561_leroy_merlin_logo-min.svg",
    ("e3f9dafd", "670e2f233c0e2ef03c2dc810_rivian-min.svg"): "66e9897d1b1dc28e560c0c07_rivian-min.svg",
}

# These need to be downloaded from Webflow CDN (different format than homepage.ts expects)
WEBFLOW_DOWNLOADS = [
    {
        "webflow_url": f"https://cdn.prod.website-files.com/{SITE_ID}/652d3e5d29d36f927c2bb623_brevo.webp",
        "r2_hash": "a0f2ee23",
        "r2_filename": "670e2f2398fcad5e2e8f2779_brevo.svg",
        "note": "brevo - SVG not available, downloading webp. Will need homepage.ts URL update.",
    },
    {
        "webflow_url": f"https://cdn.prod.website-files.com/{SITE_ID}/68d6a84a1761cbf9538efefa_cross-screen-media.png",
        "r2_hash": "9f8b5324",
        "r2_filename": "670e2f23e2b3ba3756fae394_cross_screen_media.svg",
        "note": "cross_screen_media - SVG not available, downloading PNG. Will need homepage.ts URL update.",
    },
]


def guess_content_type(filename: str) -> str:
    ct, _ = mimetypes.guess_type(filename)
    if ct:
        return ct
    ext = Path(filename).suffix.lower()
    return {".svg": "image/svg+xml", ".webp": "image/webp", ".avif": "image/avif"}.get(
        ext, "application/octet-stream"
    )


def upload_local(r2_key: str, local_path: Path) -> bool:
    """Upload a local file to R2."""
    ct = guess_content_type(local_path.name)
    try:
        s3.upload_file(str(local_path), BUCKET, r2_key, ExtraArgs={"ContentType": ct})
        print(f"  Uploaded: {r2_key} ({local_path.stat().st_size} bytes, {ct})")
        return True
    except Exception as e:
        print(f"  ERROR uploading {r2_key}: {e}")
        return False


def upload_from_url(r2_key: str, url: str, content_type: str | None = None) -> bool:
    """Download from URL and upload to R2."""
    try:
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
    except Exception as e:
        print(f"  ERROR downloading {url}: {e}")
        return False

    if not content_type:
        content_type = guess_content_type(url.split("/")[-1])

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(resp.content)
        tmp_path = tmp.name

    try:
        s3.upload_file(tmp_path, BUCKET, r2_key, ExtraArgs={"ContentType": content_type})
        print(f"  Uploaded: {r2_key} ({len(resp.content)} bytes, {content_type})")
        return True
    except Exception as e:
        print(f"  ERROR uploading {r2_key}: {e}")
        return False
    finally:
        os.unlink(tmp_path)


def main():
    uploaded = 0
    errors = 0

    # 1. Upload local SVG substitutions
    print("=== Uploading local SVG substitutions ===")
    for (hash_prefix, expected_name), local_name in LOCAL_SUBSTITUTIONS.items():
        r2_key = f"webflow/{SITE_ID}/{hash_prefix}/{expected_name}"

        # Check if already exists
        try:
            s3.head_object(Bucket=BUCKET, Key=r2_key)
            print(f"  SKIP (exists): {expected_name}")
            uploaded += 1
            continue
        except:
            pass

        local_path = IMAGES_DIR / local_name
        if not local_path.exists():
            print(f"  ERROR: Local file not found: {local_name}")
            errors += 1
            continue

        if upload_local(r2_key, local_path):
            uploaded += 1
        else:
            errors += 1

    # 2. Handle brevo and cross_screen_media
    # These don't have SVG versions, so we download what's available
    # and upload with the actual filename (not the .svg the code expects)
    print("\n=== Handling brevo and cross_screen_media (non-SVG) ===")
    for item in WEBFLOW_DOWNLOADS:
        print(f"  Note: {item['note']}")
        webflow_filename = item["webflow_url"].split("/")[-1]
        r2_key = f"webflow/{SITE_ID}/{item['r2_hash']}/{webflow_filename}"

        # Check if already exists
        try:
            s3.head_object(Bucket=BUCKET, Key=r2_key)
            print(f"  SKIP (exists): {webflow_filename}")
            uploaded += 1
            continue
        except:
            pass

        if upload_from_url(r2_key, item["webflow_url"]):
            uploaded += 1
            print(f"  -> Update homepage.ts: change '{item['r2_filename']}' to '{webflow_filename}'")
        else:
            errors += 1

    print(f"\n--- Summary ---")
    print(f"Uploaded: {uploaded}")
    print(f"Errors: {errors}")
    return 0 if errors == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
