# Preview Worker release controls

This guide moves one reviewed website build onto the isolated
`zenml-io-v2-worker-preview` Worker without exposing it to visitors. Upload,
activation, and routing are separate actions. Completing one never authorizes
the next.

The preview Worker has no `workers.dev` address, no version preview URL, no
custom domain, and no Worker route. Activating a version changes what the
Worker would serve if it received traffic, but it does not send traffic to the
Worker.

## Hard boundaries

The three preview workflows:

- run only from trusted `main`;
- share one lock, so they cannot change the preview Worker concurrently;
- use only the `worker-preview` GitHub environment;
- target only `zenml-io-v2-worker-preview`;
- never receive the Worker-routes token;
- never change DNS, Pages, Access, custom domains, or production;
- never print secret values.

The Cloudflare Workers token is account-scoped because Cloudflare does not
offer per-Worker script permissions. The fixed Worker name, trusted workflow
code, environment branch policy, and absence of route authority are therefore
security controls, not conveniences.

## Required GitHub gate before merge

Before merging these credentialed workflows, verify the `worker-preview`
environment:

1. Deployment branches and tags is set to **Selected branches and tags**.
2. Its only branch rule is exactly `main`.
3. It has no tag or pull-request rule.
4. Its secret names are exactly:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_WORKERS_PREVIEW_TOKEN`
   - `WORKERS_PREVIEW_SEGMENT_FORMS_WRITE_KEY`
   - `WORKERS_PREVIEW_TURNSTILE_SECRET_KEY`
5. Reading or changing the policy did not start a workflow.

Pause if any item differs. Changing this GitHub policy is a separate external
mutation and requires its own approval.

## Build a new eligible artifact

After the upload and activation workflows exist on `main`:

1. Reconcile the Astro 5 migration PR with current `main`.
2. Keep both the trusted manual
   `.github/workflows/upload-worker-preview.yml` and the reviewed producer
   snapshot `.github/trusted/worker-artifact-workflow.yml` during conflict
   resolution. The snapshot must remain byte-identical to
   `.github/workflows/deploy.yml`.
   Do not restore the feature branch's older automatic `workflow_run`
   uploader.
3. Run the complete PR CI workflow.
4. Download its `worker-dist` artifact.
5. Record:
   - pull request number;
   - source run ID;
   - source branch;
   - source commit;
   - tested merge commit from the artifact manifest and current pull request;
   - `worker-dist.tar.gz` SHA-256 from both the checksum file and an
     independent computation;
   - manifest source branch, commit, run ID, and required binding names.
6. Confirm the PR head, CI run, checksum, and manifest all agree. The current
   pull request `merge_commit_sha` must still equal the manifest
   `build_commit`. Any later merge to `main` recomputes that test merge and
   invalidates the artifact, so rerun CI and record the new values.

Any earlier artifact becomes historical evidence only. Do not upload it.

## Before every Cloudflare mutation

Pause and capture a timestamped read-only snapshot:

1. The candidate PR head and successful CI run still match the recorded
   identifiers.
2. The preview Worker exists.
3. Its `workers.dev` endpoint and version preview URLs are disabled.
4. It has no custom domain and no Worker route.
5. `astro-workers-staging.zenml.io` still reaches retained Pages through
   Cloudflare Access.
6. `zenml.io` redirects normally and `www.zenml.io` serves the production
   site.
7. `cloud.zenml.io`, `staging.cloud.zenml.io`, and the recorded platform-service
   hostnames match their baseline.

Stop on any unexplained difference. Do not repair drift during the same
action.

## Upload one inactive version

Open **Actions → Upload Exact Preview Worker Version → Run workflow** and
select `main`.

Enter the six recorded values:

- PR number;
- source run ID;
- source branch;
- source commit;
- artifact SHA-256;
- explicit self-review confirmation.

The workflow re-reads the run and pull request from GitHub, downloads only that
run's artifact, verifies that its tested merge commit used the immutable
reviewed artifact workflow,
checks its checksum and manifest, rejects unsafe archive or Wrangler
configuration, confirms the preview Worker is private and route-less, and
uploads one inactive version with the two non-production form secrets.

The upload does not deploy the version. Its summary records the version ID and
provenance. The workflow also preserves partial upload metadata even when a
later verification step fails, because Cloudflare may already have accepted the
inactive version.

### Pause and verify after upload

1. The workflow completed successfully.
2. Its recorded version ID exists on
   `zenml-io-v2-worker-preview`.
3. The version message contains the exact source branch, commit, run ID, and
   artifact SHA-256.
4. Its secret binding names include `TURNSTILE_SECRET_KEY` and
   `SEGMENT_FORMS_WRITE_KEY`; do not read or record their values.
5. The active deployment is unchanged.
6. Public Worker endpoints, custom domains, and routes remain absent.
7. Production, retained Pages, staging Access, and platform-service baselines
   remain unchanged.

If upload or verification fails, assume the upload may have happened, inspect
the Worker read-only, leave any new version inactive, and stop. Do not delete
it or upload a replacement during the same approval.

## Activate the exact preview version

Activation is a second mutation. Start it only after the upload evidence has
been reviewed and separately approved.

Open **Actions → Activate Exact Preview Worker Version → Run workflow** and
select `main`.

Enter the six values recorded by the upload:

- version ID;
- source run ID;
- source branch;
- source commit;
- artifact SHA-256;
- explicit self-review confirmation.

The workflow inspects that exact version, verifies its provenance and secret
binding names, saves the current deployment metadata, and deploys only that
version at 100 percent on the preview Worker. It then confirms the Worker still
has no public endpoint.

### Pause and verify after activation

1. The workflow completed successfully.
2. Its retained artifact contains the pre-activation deployment and inspected
   version metadata.
3. The newest preview deployment contains only the approved version at
   100 percent.
4. The preview Worker remains without public endpoints, custom domains, or
   routes.
5. Production, retained Pages, staging Access, and platform-service baselines
   remain unchanged.

At this point the new site code is active inside an unreachable Worker. There
is still no browser URL for it. Attaching only
`astro-workers-staging.zenml.io/*` is the next separate mutation and requires a
fresh before-state, exact route review, explicit approval, and immediate
after-state verification. That future route workflow must use the same
`zenml-io-worker-preview` concurrency group so GitHub cannot interleave route
attachment with upload or activation.

## Rollback boundaries

- **Failed inactive upload:** no traffic changed. Leave the version inactive
  and stop.
- **Failed or bad activation before a route exists:** the version may already
  be active even if the run failed. Inspect the Worker read-only, keep the
  route absent, and stop. The inert bootstrap version is not an accepted
  serving fallback.
- **Problem after the staging route is later attached:** remove only the exact
  recorded staging route to restore retained Pages. Do not edit DNS or delete
  Pages.
- **Production:** these workflows cannot change it. Production cutover and
  rollback use separate controls and approvals.
