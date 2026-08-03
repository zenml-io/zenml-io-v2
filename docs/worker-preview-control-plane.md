# Preview Worker release controls

This guide moves one reviewed website build onto the protected staging Worker.
Upload and activation are separate actions. Completing upload never authorizes
activation.

The preview Worker has no `workers.dev` address, no version preview URL, no
custom domain, and exactly one Worker route:
`astro-workers-staging.zenml.io/*`. Cloudflare Access protects that hostname.
Uploading a version leaves staging traffic on the current version. Activating
a version changes what authenticated staging visitors receive.

## Hard boundaries

The upload and activation workflows:

- run only from trusted `main`;
- share one lock, so they cannot change the preview Worker concurrently;
- use only the `worker-preview` GitHub environment;
- target only `zenml-io-v2-worker-preview`;
- never receive the Worker-routes token and cannot change the fixed staging
  route;
- never change DNS, Pages, Access, custom domains, or production;
- never print secret values.

The Cloudflare Workers token is account-scoped because Cloudflare does not
offer per-Worker script permissions. The fixed Worker name, exact staging-route
guard, trusted workflow code, environment branch policy, and absence of route
mutation authority are therefore security controls, not conveniences.

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

1. Choose one eligible source:
   - an open same-repository pull request at its exact current head; or
   - the successful `push` CI run for the exact current `main` commit.
2. For a pull request, reconcile the Astro 5 migration PR with current `main`.
3. Keep both the trusted manual
   `.github/workflows/upload-worker-preview.yml` and the reviewed producer
   snapshot `.github/trusted/worker-artifact-workflow.yml` during conflict
   resolution. The snapshot must remain byte-identical to
   `.github/workflows/deploy.yml`.
   Do not restore the feature branch's older automatic `workflow_run`
   uploader.
4. Run the complete CI workflow for the chosen source.
5. Download its `worker-dist` artifact.
6. Record:
   - pull request number for a pull-request artifact, or leave it empty for an
     exact current-`main` artifact;
   - source run ID;
   - source branch;
   - source commit;
   - tested merge commit from the artifact manifest and current pull request,
     or the exact current `main` commit for a `main` artifact;
   - `worker-dist.tar.gz` SHA-256 from both the checksum file and an
     independent computation;
   - manifest source branch, commit, run ID, and required binding names.
7. Confirm the source state, CI run, checksum, and manifest all agree:
   - For a pull request, its current `merge_commit_sha` must equal the manifest
     `build_commit`. A later merge to `main` recomputes that test merge and
     invalidates the artifact.
   - For `main`, the source branch must be exactly `main`, and the source commit,
     manifest build commit, and trusted uploader dispatch commit must all be
     identical to the live `main` tip. A later `main` commit invalidates the
     earlier artifact.

Any earlier artifact becomes historical evidence only. Do not upload it.

## Before every Cloudflare mutation

Pause and capture a timestamped read-only snapshot:

1. The chosen source and successful CI run still match the recorded
   identifiers. For a pull request, recheck its open head and tested merge
   commit. For `main`, recheck that the artifact commit is still the exact
   trusted uploader dispatch commit and live `main` tip.
2. The preview Worker exists.
3. Its `workers.dev` endpoint and version preview URLs are disabled.
4. It has no custom domain and owns exactly
   `astro-workers-staging.zenml.io/*`, with no other route.
5. An unauthenticated request to `astro-workers-staging.zenml.io` receives the
   expected Cloudflare Access 302 login redirect and challenge header.
6. `zenml.io` redirects normally and `www.zenml.io` serves the production
   site.
7. `cloud.zenml.io`, `staging.cloud.zenml.io`, and the recorded platform-service
   hostnames match their baseline.

Stop on any unexplained difference. Do not repair drift during the same
action.

## Upload one inactive version

Open **Actions → Upload Exact Preview Worker Version → Run workflow** and
select `main`.

Enter the recorded values:

- PR number for a pull-request artifact, or leave it empty for an exact
  current-`main` artifact;
- source run ID;
- source branch;
- source commit;
- artifact SHA-256;
- explicit self-review confirmation.

The workflow re-reads the run and, when applicable, the pull request from
GitHub. It downloads only that run's artifact and verifies that its tested
build commit used the immutable reviewed artifact workflow. A `main` artifact
is accepted only when its branch and commit exactly match the trusted uploader
dispatch commit and the live `main` tip. It then
checks its checksum and manifest, rejects unsafe archive or Wrangler
configuration, confirms the preview Worker has only the protected staging
route, rechecks the anonymous Access challenge, and uploads one inactive
version with the two non-production form secrets.

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
6. Public Worker endpoints and custom domains remain absent, and the exact
   staging route is unchanged.
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
binding names, saves the current deployment metadata, and rechecks the exact
route plus anonymous Access challenge immediately before deploying only that
version at 100 percent. It then confirms the route and Access protection remain
unchanged.

### Pause and verify after activation

1. The workflow completed successfully.
2. Its retained artifact contains the pre-activation deployment and inspected
   version metadata.
3. The newest preview deployment contains only the approved version at
   100 percent.
4. The preview Worker remains without public Worker endpoints or custom
   domains and still owns only the exact protected staging route.
5. Production, retained Pages, staging Access, and platform-service baselines
   remain unchanged.

At this point the new site code is active on the Access-protected staging URL.
Pause for manual browser, content, form, API, redirect, header, 404, island,
visual, and accessibility checks before any production-enablement work.

## Rollback boundaries

- **Failed inactive upload:** no traffic changed. Leave the version inactive
  and stop.
- **Failed or bad activation:** the version may already be active even if the
  run failed. Inspect the Worker read-only. If staging is unhealthy, restore
  only the recorded accepted Astro 6 staging version at 100 percent. Preserve
  the exact staging route, DNS, Access application, and retained Pages
  fallback. Stop after verifying the restored deployment and Access challenge.
- **Production:** these workflows cannot change it. Production cutover and
  rollback use separate controls and approvals.
