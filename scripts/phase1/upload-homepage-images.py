#!/usr/bin/env python3
"""Download and upload missing homepage images to R2.

These are images referenced in src/lib/homepage.ts via ${R2}/hash/filename
that were never uploaded to the R2 bucket.
"""

import hashlib
import mimetypes
import os
import sys
import tempfile
from pathlib import Path
from urllib.parse import quote, unquote

import boto3
import requests
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")

s3 = boto3.client(
    "s3",
    endpoint_url=os.environ["R2_ENDPOINT"],
    aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
    region_name="auto",
)
BUCKET = os.environ["R2_BUCKET"]
SITE_ID = "64a817a2e7e2208272d1ce30"
WEBFLOW_CDN = f"https://cdn.prod.website-files.com/{SITE_ID}"

# Missing images: (hash_prefix, filename) pairs from homepage.ts
# These are the R2 keys that don't exist in the bucket
MISSING_IMAGES = [
    # Logo cloud SVGs
    ("6a2ae7e3", "670e2f23d254a9be9e02e50f_airbus.svg"),
    ("5f1b0e8a", "670e2f23b0b89bea22ecee3c_axa-min.svg"),
    ("e8e86576", "670e2f2398fcad5e2e8f2775_bundeswehr.svg"),
    ("4f6e5fe1", "670e2f2349aab64d5e4eeeb3_enel-min.svg"),
    ("60b5e34d", "670e2f23ee3f2feee5e7e7e2_jetbrains-min.svg"),
    ("db4b0c5a", "670e2f2331d7f8f62e12458e_koble.svg"),
    ("d28fbdf4", "670e2f23e2b3ba3756fae38e_leroy_merlin_logo-min.svg"),
    ("e3f9dafd", "670e2f233c0e2ef03c2dc810_rivian-min.svg"),
    # Feature tab AVIFs
    ("70e94eb1", "68d1536e3bb1899a400a8dec_tab01.avif"),
    ("6a1e96df", "68d273e1d31e42957153098b_tab02.avif"),
    ("ba122f13", "68d122c72dcdb1f17db0ea87_tab03.avif"),
    ("7d0c3d45", "694a97d1ae458c9398b52aef_tab04.avif"),
    ("2e5d2f96", "68d15caa8322157742ada8fd_tab05.avif"),
    # Customer story logos
    ("a0f2ee23", "670e2f2398fcad5e2e8f2779_brevo.svg"),
    ("9f8b5324", "670e2f23e2b3ba3756fae394_cross_screen_media.svg"),
    # Why ZenML section
    ("68b844a2", "66c7398e738654118d4024fb_why-zenml-min.png"),
    ("8978f34c", "66c73e7cfd15ae9889f59705_why-zenml-mobile-min.webp"),
    # Compliance badges
    ("f7e1dfa3", "67ae0f84d539a001cc441a43_soc2type2_zenml.png"),
    ("f62e5def", "66e9546d3b19094bf950273a_iso_certified.webp"),
    # Model control plane
    ("4ab5ef16", "66e9556fd34d2791885b0c5f_model_control_plane_01.png"),
]


def guess_content_type(filename: str) -> str:
    ct, _ = mimetypes.guess_type(filename)
    if ct:
        return ct
    ext = Path(filename).suffix.lower()
    return {
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
        ".avif": "image/avif",
    }.get(ext, "application/octet-stream")


def main():
    uploaded = 0
    errors = []

    for hash_prefix, filename in MISSING_IMAGES:
        r2_key = f"webflow/{SITE_ID}/{hash_prefix}/{filename}"
        webflow_url = f"{WEBFLOW_CDN}/{filename}"

        # Check if already in R2
        try:
            s3.head_object(Bucket=BUCKET, Key=r2_key)
            print(f"  SKIP (exists): {filename}")
            continue
        except:
            pass

        # Download from Webflow CDN
        print(f"  Downloading: {filename}...")
        try:
            resp = requests.get(webflow_url, timeout=30)
            resp.raise_for_status()
        except Exception as e:
            errors.append(f"DOWNLOAD FAILED: {filename} -> {e}")
            # Also try the local webflow export
            local_paths = [
                ROOT / "design/webflow-export/extracted/images" / filename,
                ROOT / "design/migration/static-image-migration/downloads" / filename,
            ]
            found_local = None
            for lp in local_paths:
                if lp.exists():
                    found_local = lp
                    break
            if found_local:
                print(f"    Using local: {found_local.name}")
                content_type = guess_content_type(filename)
                try:
                    s3.upload_file(
                        str(found_local),
                        BUCKET,
                        r2_key,
                        ExtraArgs={"ContentType": content_type},
                    )
                    uploaded += 1
                    print(f"    Uploaded from local: {r2_key}")
                    continue
                except Exception as e2:
                    errors.append(f"LOCAL UPLOAD FAILED: {filename} -> {e2}")
            continue

        # Upload to R2
        content_type = guess_content_type(filename)
        with tempfile.NamedTemporaryFile(delete=False, suffix=Path(filename).suffix) as tmp:
            tmp.write(resp.content)
            tmp_path = tmp.name

        try:
            s3.upload_file(
                tmp_path,
                BUCKET,
                r2_key,
                ExtraArgs={"ContentType": content_type},
            )
            uploaded += 1
            print(f"    Uploaded: {r2_key} ({len(resp.content)} bytes)")
        except Exception as e:
            errors.append(f"UPLOAD FAILED: {filename} -> {e}")
        finally:
            os.unlink(tmp_path)

    print(f"\n--- Results ---")
    print(f"Uploaded: {uploaded}/{len(MISSING_IMAGES)}")
    if errors:
        print(f"\n--- Errors ({len(errors)}) ---")
        for err in errors:
            print(f"  {err}")
    return 0 if not errors else 1


if __name__ == "__main__":
    sys.exit(main())
