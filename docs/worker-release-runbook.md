# Cloudflare Worker Release Runbook

## Current boundary

Cloudflare Pages remains the live production origin. The Worker workflows
prepare, inspect, upload, and optionally activate immutable Worker versions, but
none of them attaches a route, changes a custom domain, edits DNS, or removes
the Pages fallback.

U3 has four separate actions:

1. `Website CI and Worker Artifact` builds once without credentials, validates
   that output, and publishes the exact archive plus checksum and provenance.
2. `Upload Exact Preview Worker Version` is manually dispatched from `main`
   after explicit review. It consumes one successful same-repository PR
   artifact and uploads an inactive, unreachable version to
   `zenml-io-v2-worker-preview`.
3. `Upload Worker Production Candidate` is manually dispatched from `main` with
   an exact successful CI run, branch, and commit. It uploads an inactive
   version to `zenml-io-v2-worker` with public preview URLs disabled.
4. `Activate Exact Worker Version` is manually dispatched from `main` with an
   exact version ID and matching provenance. It changes the active version of
   the currently unrouted Worker. Do not run it until activation is separately
   approved.

Production route attachment and the Pages-to-Workers cutover belong to U4, not
this runbook step.

## GitHub environments and secret names

Create these GitHub environments. Values stay in GitHub or Cloudflare and must
never be committed.

### `worker-preview`

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_WORKERS_PREVIEW_TOKEN`
- `WORKERS_PREVIEW_TURNSTILE_SECRET_KEY`
- `WORKERS_PREVIEW_SEGMENT_FORMS_WRITE_KEY`

The Turnstile and Segment values must be synthetic or dedicated
non-production resources. Do not copy production form secrets into this
environment.

### `worker-candidate`

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_WORKERS_PRODUCTION_TOKEN`
- `TURNSTILE_SECRET_KEY`
- `SEGMENT_FORMS_WRITE_KEY`

### `production`

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_WORKERS_PRODUCTION_TOKEN`

GitHub Free for a public repository is the assumed control plane. A mandatory
second reviewer is not required. The manual workflows require the operator to
confirm explicit self-review of the exact identifiers.

## Cloudflare token limitation

Cloudflare uses the same `Workers Scripts Write` permission for uploading a
version and creating a deployment. It does not offer a token permission that
allows `versions upload` while forbidding `versions deploy` for the same
account. The token should have `Workers Scripts Write` for the selected account
and should not have Workers Routes or DNS write permissions.

The upload-versus-activation boundary is therefore enforced by:

- separate GitHub environments and secret names;
- trusted default-branch workflow definitions;
- no Cloudflare credentials in the branch-controlled build job;
- separate preview and production Worker names;
- event and `main` guards;
- exact run, commit, branch, checksum, version, and binding checks;
- no `versions deploy` command in either upload workflow;
- no route or DNS command in any U3 workflow.

This is a workflow control, not a cryptographic Cloudflare capability boundary.
Treat anyone who can read or change the production token as able to activate a
Worker version directly.

## Artifact contract

The `worker-dist` Actions artifact contains:

- `worker-dist.tar.gz`, including hidden output such as `.assetsignore`;
- `worker-dist.sha256`;
- `worker-manifest.json`, recording the source and build commits, branch, event,
  run ID and attempt, artifact digest, and lockfile digest;
- `wrangler.jsonc`, with names and required binding metadata but no secret
  values.

Credentialed workflows verify the checksum and provenance, reject absolute or
parent-traversing archive paths, reject links and special files, and accept only
the reviewed Wrangler configuration shape. The production-candidate workflow
also requires the source commit's CI workflow file to match the trusted `main`
definition. They install Wrangler 4.110.0 themselves and do not execute
branch-controlled package scripts.

Astro 5 is previewed and tested through Wrangler because adapter 12 does not
provide the required `astro preview` behavior. Revisit this in the Astro 6
checkpoint, where the plan expects the supported Astro preview path.

## Preview inspection

Before dispatching `Upload Exact Preview Worker Version`, compare and enter:

- source PR number;
- exact source branch and current PR-head commit;
- successful source CI run ID;
- artifact SHA-256 from that exact run;
- explicit self-review confirmation.

After it succeeds, record:

- Worker version ID;
- the binding guard result.

The job summary contains the public identifiers. The preview uses a different
Worker and different external secrets from production. Public Worker endpoints
remain disabled, and the workflow rejects a stale CI artifact when its source
commit is no longer the PR head.
Do not treat a preview pass as permission to upload or activate a production
candidate.

## Production candidate upload

From the Actions page, choose `Upload Worker Production Candidate` on `main`
and enter:

- `source_run_id`: the successful `Website CI and Worker Artifact` run;
- `source_commit`: that run's exact head commit;
- `source_branch`: that run's exact head branch;
- `self_reviewed`: checked only after comparing all three values.

The workflow queries GitHub for the run, downloads its exact artifact, repeats
the integrity and configuration checks, uploads with both production form
bindings, then inspects the returned version metadata. It does not activate the
version. Public preview URLs are disabled so an inactive version containing
production bindings is not exposed as a candidate URL.

Record the version ID, source identifiers, artifact digest, operator, timestamp,
and binding guard result. Stop here unless exact-version activation has separate
approval.

## Exact-version activation

Before dispatching `Activate Exact Worker Version`, independently compare:

- the candidate version ID;
- source commit and branch;
- source CI run ID and successful checks;
- artifact SHA-256;
- both required secret bindings;
- the current and previous Worker deployment metadata;
- the initiating operator and explicit self-review.

The workflow re-reads the exact version metadata, verifies provenance and
bindings, saves the pre-activation deployment state, and confirms the Worker
still has no `workers.dev` endpoint, version preview URL, route, or custom
domain. It repeats those exposure checks after activation. If any exposure is
present, the workflow fails closed before changing the active version.

After those checks, it runs:

```text
wrangler versions deploy "<version-id>@100%" --name zenml-io-v2-worker --yes
```

This activates a version inside the Worker service. It still does not attach the
production zone route. U4 must separately verify Pages fallback, rehearse route
rollback on equivalent staging, approve the maintenance window, and attach the
route.

This U3 activation workflow is deliberately pre-cutover-only. Once U4 attaches
a production route or custom domain, it will refuse to activate another version.
U4 must define the separately reviewed post-cutover version rollback procedure
before the route is attached.

## Rollback classes

- **Before activation:** no rollback is needed. Leave the candidate inactive.
- **After version activation but before route attachment:** deploy the recorded
  previous Worker version if needed. Production traffic still reaches Pages.
- **After U4 route attachment:** remove the exact Worker route to restore the
  already-verified Pages fallback, or deploy the recorded previous Worker
  version when the failure is version-specific. Follow the U4 release record;
  do not improvise DNS changes.

Never toggle the live route merely to prove rollback. Rehearse that behavior on
equivalent staging and use the production rollback only when cutover criteria
fail.
