#!/usr/bin/env -S uv run --python 3.12 --with boto3
# /// script
# dependencies = ["boto3"]
# ///
"""
Phase 1G: Upload to R2 + URL Mapping (boto3 version)

Uploads all downloaded Webflow assets to Cloudflare R2 using boto3
(Python AWS SDK) which is much faster than spawning individual Wrangler CLI commands.

Features:
- S3-compatible boto3 client for R2
- Automatic multipart uploads for large files
- Parallel uploads with ThreadPoolExecutor
- Resume support via manifest
- URL map generation

Usage:
    uv run scripts/phase1/upload-to-r2-boto3.py --run-id=2026-02-11T0626Z

Or:
    chmod +x scripts/phase1/upload-to-r2-boto3.py
    ./scripts/phase1/upload-to-r2-boto3.py --run-id=2026-02-11T0626Z

Environment variables:
    CLOUDFLARE_ACCOUNT_ID - Your Cloudflare account ID
    R2_ACCESS_KEY_ID - R2 Access Key ID
    R2_SECRET_ACCESS_KEY - R2 Secret Access Key
"""

import argparse
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from hashlib import sha256
from pathlib import Path
from typing import Dict, List, Optional

try:
    import boto3
    from botocore.exceptions import ClientError
except ImportError:
    print("Error: boto3 is not installed. Install it with: pip install boto3")
    sys.exit(1)


class R2Uploader:
    def __init__(
        self,
        run_id: str,
        run_dir: Path,
        bucket: str,
        account_id: str,
        access_key_id: str,
        secret_access_key: str,
        r2_domain: str,
        site_id: str,
        concurrency: int = 10,
    ):
        self.run_id = run_id
        self.run_dir = run_dir
        self.bucket = bucket
        self.account_id = account_id
        self.r2_domain = r2_domain
        self.site_id = site_id
        self.concurrency = concurrency

        # Create boto3 S3 client configured for R2
        self.s3 = boto3.client(
            "s3",
            endpoint_url=f"https://{account_id}.r2.cloudflarestorage.com",
            aws_access_key_id=access_key_id,
            aws_secret_access_key=secret_access_key,
            region_name="auto",  # Required by boto3, not used by R2
        )

        # Paths
        self.r2_dir = run_dir / "r2"
        self.manifest_path = self.r2_dir / "upload-manifest.json"
        self.url_map_path = self.r2_dir / "url-map.json"
        self.log_path = self.r2_dir / "upload.log"

        # State
        self.manifest: Dict = {
            "runId": run_id,
            "bucket": bucket,
            "r2Domain": r2_domain,
            "startedAt": datetime.utcnow().isoformat() + "Z",
            "stats": {"total": 0, "success": 0, "failed": 0, "skipped": 0},
            "entries": [],
        }
        self.url_map: Dict[str, str] = {}
        self.log_buffer: List[str] = []
        self.stats = {"total": 0, "success": 0, "failed": 0, "skipped": 0}

    def log(self, message: str):
        timestamp = datetime.utcnow().isoformat() + "Z"
        log_line = f"[{timestamp}] {message}"
        print(log_line, flush=True)
        self.log_buffer.append(log_line)

    def sha256_hash(self, s: str) -> str:
        return sha256(s.encode()).hexdigest()

    def get_r2_key(self, original_url: str, filename: str) -> str:
        """Generate R2 key: webflow/{siteId}/{hash-prefix}/{filename}"""
        hash_val = self.sha256_hash(original_url)
        prefix = hash_val[:8]
        return f"webflow/{self.site_id}/{prefix}/{filename}"

    def get_r2_url(self, r2_key: str) -> str:
        """Generate public R2 URL"""
        return f"https://{self.r2_domain}/{r2_key}"

    def load_existing_manifest(self):
        """Load existing manifest for resume support"""
        if not self.manifest_path.exists():
            return

        try:
            with open(self.manifest_path, "r") as f:
                self.manifest = json.load(f)
                self.stats = self.manifest["stats"]

            # Rebuild URL map from successful entries
            for entry in self.manifest["entries"]:
                if entry["status"] == "success":
                    self.url_map[entry["originalUrl"]] = entry["r2Url"]

            self.log(f"✓ Loaded existing manifest with {len(self.manifest['entries'])} entries")
        except Exception as e:
            self.log(f"⚠️  Could not load existing manifest: {e}")

    def save_manifest(self):
        """Save manifest to disk"""
        self.manifest["stats"] = self.stats
        with open(self.manifest_path, "w") as f:
            json.dump(self.manifest, f, indent=2)

    def save_url_map(self):
        """Save URL map to disk"""
        with open(self.url_map_path, "w") as f:
            # Create a snapshot to avoid race conditions during iteration
            json.dump(dict(self.url_map), f, indent=2)

    def save_log(self):
        """Save log to disk"""
        with open(self.log_path, "w") as f:
            f.write("\n".join(self.log_buffer) + "\n")

    def object_exists(self, r2_key: str) -> bool:
        """Check if object exists in R2"""
        try:
            self.s3.head_object(Bucket=self.bucket, Key=r2_key)
            return True
        except ClientError as e:
            if e.response["Error"]["Code"] == "404":
                return False
            raise

    def upload_file(self, local_path: Path, r2_key: str, content_type: str) -> bool:
        """Upload a single file to R2"""
        try:
            self.s3.upload_file(
                str(local_path),
                self.bucket,
                r2_key,
                ExtraArgs={"ContentType": content_type} if content_type else {},
            )
            return True
        except Exception as e:
            self.log(f"   ❌ Upload failed for {r2_key}: {e}")
            return False

    def process_asset(self, entry: Dict) -> Dict:
        """Process a single asset upload"""
        original_url = entry["originalUrl"]
        local_path = Path(entry["localPath"])
        filename = local_path.name
        r2_key = self.get_r2_key(original_url, filename)
        r2_url = self.get_r2_url(r2_key)

        # Check if already uploaded successfully
        existing = next(
            (e for e in self.manifest["entries"] if e["originalUrl"] == original_url),
            None,
        )

        if existing and existing["status"] == "success":
            # Verify it still exists in R2
            if self.object_exists(r2_key):
                self.stats["skipped"] += 1
                self.url_map[original_url] = r2_url
                return existing

        # Upload to R2
        success = self.upload_file(local_path, r2_key, entry.get("contentType", ""))

        if not success:
            self.stats["failed"] += 1
            return {
                "originalUrl": original_url,
                "r2Key": r2_key,
                "r2Url": r2_url,
                "localPath": str(local_path),
                "size": entry["size"],
                "sha256": entry["sha256"],
                "contentType": entry.get("contentType", ""),
                "status": "failed",
                "failureReason": "Upload to R2 failed",
            }

        self.stats["success"] += 1
        self.url_map[original_url] = r2_url

        return {
            "originalUrl": original_url,
            "r2Key": r2_key,
            "r2Url": r2_url,
            "localPath": str(local_path),
            "size": entry["size"],
            "sha256": entry["sha256"],
            "contentType": entry.get("contentType", ""),
            "status": "success",
            "uploadedAt": datetime.utcnow().isoformat() + "Z",
        }

    def run(self):
        self.log("🚀 Starting R2 upload (boto3)")
        self.log(f"   Run ID: {self.run_id}")
        self.log(f"   Bucket: {self.bucket}")
        self.log(f"   R2 Domain: {self.r2_domain}")
        self.log(f"   Concurrency: {self.concurrency}")

        # Load download manifest
        download_manifest_path = self.run_dir / "assets" / "download-manifest.json"
        if not download_manifest_path.exists():
            raise FileNotFoundError(f"Download manifest not found: {download_manifest_path}")

        with open(download_manifest_path, "r") as f:
            download_manifest = json.load(f)

        # Get successful downloads only
        successful_assets = [e for e in download_manifest["entries"] if e["status"] == "success"]
        self.stats["total"] = len(successful_assets)

        self.log(f"   Total assets to upload: {self.stats['total']}")
        self.log("")

        # Create R2 directory
        self.r2_dir.mkdir(parents=True, exist_ok=True)

        # Load existing manifest if present
        self.load_existing_manifest()

        # Upload assets in parallel
        self.log(f"📤 Uploading with {self.concurrency} parallel workers")
        self.log("")

        completed = 0
        batch_size = 50  # Save progress every 50 files

        with ThreadPoolExecutor(max_workers=self.concurrency) as executor:
            # Submit all upload tasks
            future_to_entry = {
                executor.submit(self.process_asset, entry): entry
                for entry in successful_assets
            }

            # Process completed uploads
            for future in as_completed(future_to_entry):
                result = future.result()

                # Update or add entry in manifest
                existing_idx = next(
                    (
                        i
                        for i, e in enumerate(self.manifest["entries"])
                        if e["originalUrl"] == result["originalUrl"]
                    ),
                    None,
                )

                if existing_idx is not None:
                    self.manifest["entries"][existing_idx] = result
                else:
                    self.manifest["entries"].append(result)

                completed += 1

                # Log progress and save periodically
                if completed % batch_size == 0 or completed == self.stats["total"]:
                    progress = (completed / self.stats["total"]) * 100
                    self.log(
                        f"   Progress: {progress:.1f}% ({completed}/{self.stats['total']}) "
                        f"[Success: {self.stats['success']}, Skipped: {self.stats['skipped']}, Failed: {self.stats['failed']}]"
                    )
                    self.save_manifest()
                    self.save_url_map()

        # Final save
        self.manifest["completedAt"] = datetime.utcnow().isoformat() + "Z"
        self.save_manifest()
        self.save_url_map()
        self.save_log()

        self.log("")
        self.log("✅ R2 upload complete!")
        self.log(f"   Total: {self.stats['total']}")
        self.log(f"   Success: {self.stats['success']}")
        self.log(f"   Skipped: {self.stats['skipped']}")
        self.log(f"   Failed: {self.stats['failed']}")

        if self.stats["failed"] > 0:
            failed_entries = [e for e in self.manifest["entries"] if e["status"] == "failed"]
            self.log("")
            self.log("❌ Failed uploads:")
            for entry in failed_entries[:10]:
                self.log(f"   - {entry['originalUrl']}")
            if len(failed_entries) > 10:
                self.log(f"   ... and {len(failed_entries) - 10} more")

        success_rate = (self.stats["success"] / self.stats["total"]) * 100
        self.log("")
        self.log(f"📊 Success rate: {success_rate:.1f}%")
        self.log(f"🗺️  URL map entries: {len(self.url_map)}")


def main():
    parser = argparse.ArgumentParser(description="Upload assets to Cloudflare R2 using boto3")
    parser.add_argument("--run-id", required=True, help="Run ID (e.g., 2026-02-11T0626Z)")
    parser.add_argument("--bucket", default="zenml-assets", help="R2 bucket name")
    parser.add_argument(
        "--r2-domain",
        default="pub-41d587b95acb4b579d9280542922084b.r2.dev",
        help="R2 public domain",
    )
    parser.add_argument("--concurrency", type=int, default=10, help="Parallel upload workers")
    args = parser.parse_args()

    # Get credentials from environment
    account_id = os.getenv("CLOUDFLARE_ACCOUNT_ID")
    access_key_id = os.getenv("R2_ACCESS_KEY_ID")
    secret_access_key = os.getenv("R2_SECRET_ACCESS_KEY")

    if not all([account_id, access_key_id, secret_access_key]):
        print("Error: Missing required environment variables:")
        print("  CLOUDFLARE_ACCOUNT_ID")
        print("  R2_ACCESS_KEY_ID")
        print("  R2_SECRET_ACCESS_KEY")
        sys.exit(1)

    # Set up paths
    run_dir = Path.cwd() / "design" / "migration" / "phase1" / "runs" / args.run_id
    site_id = "64a817a2e7e2208272d1ce30"

    # Create uploader and run
    uploader = R2Uploader(
        run_id=args.run_id,
        run_dir=run_dir,
        bucket=args.bucket,
        account_id=account_id,
        access_key_id=access_key_id,
        secret_access_key=secret_access_key,
        r2_domain=args.r2_domain,
        site_id=site_id,
        concurrency=args.concurrency,
    )

    try:
        uploader.run()
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        import traceback

        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
