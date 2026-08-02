# Cloudflare Worker Release Runbook

## Current boundary

The accepted Astro 5 Worker serves `www.zenml.io/*`. Cloudflare Pages remains
available beneath that route as the deeper fallback. No release workflow
attaches or removes a route, changes a custom domain, edits DNS, changes Access,
or removes Pages.

The release controls now have six paths:

1. `Website CI and Worker Artifact` builds once without credentials, validates
   that output, and publishes the exact archive plus checksum and provenance.
2. `Release Worker to Production` runs after a successful same-repository
   `push` to the current `main`. It downloads that exact artifact, uploads it
   inactive, verifies the accepted Worker topology and bindings, records the
   previous version, adds the candidate to the deployment at 0 percent, and
   smoke-tests that exact version through Cloudflare's version-override header.
   Only after that preflight passes does it activate the candidate at 100
   percent and run public production smoke tests. A failed preflight or
   post-activation check restores and verifies the previous version before
   leaving the workflow failed.
3. `Upload Exact Preview Worker Version` is manually dispatched from `main`
   after explicit review. It consumes either one successful same-repository PR
   artifact or the successful `push` artifact for the exact current `main`
   commit, then uploads an inactive, unreachable version to
   `zenml-io-v2-worker-preview`.
4. `Upload Worker Production Candidate` is manually dispatched from `main` with
   an exact successful CI run, branch, and commit. It uploads an inactive
   version to `zenml-io-v2-worker` with public preview URLs disabled. This is a
   retained pre-cutover control and intentionally rejects the current live
   route topology.
5. `Activate Exact Worker Version` is manually dispatched from `main` with an
   exact version ID and matching provenance. It is also a retained pre-cutover
   control and intentionally refuses to activate a routed Worker.
6. `Publish Worker PR Preview` consumes successful same-repository,
   non-draft PR artifacts from trusted `main` and publishes stable public
   aliases on the separate, route-less `zenml-io-v2-pr-preview` Worker. It
   never rebuilds the artifact or receives production, route, DNS, or Pages
   authority. See `docs/worker-pr-preview-runbook.md`.

The automatic release is the normal post-cutover production path. The manual
candidate and activation workflows are not post-cutover escape hatches until a
separate reviewed change adapts their route predicates. PR previews are
review-only public versions on a dedicated Worker; they cannot promote a branch
artifact to production. Explicitly approved branch-built production promotion
remains a separate follow-up.

The Astro 6 private-preview and protected-staging checkpoints were accepted on
2026-07-29. The artifact manifest now sets `production_release_eligible` to
`true`, so each exact successful current-`main` artifact may continue into the
trusted automatic production release. Changing this gate again requires a
separate reviewed PR.

## Automatic current-main release

`Release Worker to Production` is triggered by the completed
`Website CI and Worker Artifact` workflow, not by pull requests directly. It
continues only when the source run:

- succeeded;
- came from a same-repository `push` to `main`;
- still matches the current `main` commit; and
- used the current trusted artifact workflow.

If `main` advances before release preflight, the older run is skipped. The
newer main build contains it and becomes the release candidate.

The run also requires `production_release_eligible: true` in the exact artifact
manifest. A false flag is an intentional pause, not a failed release.

The full workflow holds the `zenml-io-worker-production` concurrency lock. Its
upload job uses the `worker-candidate` environment. Its activation job uses the
`production` environment and therefore retains any protection configured
there. Neither job executes repository package scripts with Cloudflare
credentials.

Before upload, the workflow requires:

- one active Worker version at 100 percent;
- exactly the accepted `www.zenml.io/*` production route pattern;
- no production ownership of the protected
  `astro-workers-staging.zenml.io/*` route, which belongs to the preview
  Worker;
- disabled `workers.dev` and version preview endpoints;
- no Worker custom domains; and
- both required production form secrets.

It then uploads the already-validated archive as an inactive version and proves
that upload did not change the active deployment or routes. Immediately before
activation it rechecks the candidate provenance, bindings, previous deployment,
routes, endpoint privacy, and custom-domain state.

Immediately before exact-version activation, the workflow rechecks that the
source commit is still the live `main`. It first creates a deployment with the
accepted previous version at 100 percent and the exact candidate at 0 percent.
Normal visitors therefore continue to receive the previous version. Requests
carrying Cloudflare's exact-version override then verify a source-commit marker
embedded in the exact validated candidate homepage. The marker is part of the
checksummed Worker artifact, so it changes for every source commit, including
content-only releases. The workflow retries the overridden homepage and its
marker together for a bounded convergence window because Cloudflare can briefly
ignore a version override after a deployment changes. An ignored override
returns the accepted previous homepage, which lacks the candidate marker, so it
cannot produce a false pass. Retry requests use distinct query strings so a
stale edge response cannot satisfy every retry from cache.

After the zero-traffic preflight passes, the workflow rechecks that the accepted
100/0 deployment is still present. It then promotes the candidate to 100
percent, verifies the exact deployment and unchanged routes, and checks
representative pages, the newly merged Dagster article, API behavior, redirects,
404 behavior, and sampled production assets. The apex redirect is recorded
separately because it is zone-level behavior, not behavior of the released
Worker version.

A failed post-activation check first inspects the live active version. Its
inline rollback restores the previous version with bounded retries only when
the exact candidate is active or present at 0 percent beside the previous
version at 100 percent. It accepts an already-restored previous version and
refuses to replace any unknown version or percentage combination. A separate
recovery job applies the same rule after a failed or timed-out activation job.
The release stays failed for investigation. A manual cancellation of the whole
workflow or loss of the GitHub runner can also cancel the recovery job, so an
operator must verify the active version after either event. Workflow artifacts
retain candidate, deployment, preflight, smoke, and recovery evidence for 30
days.

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

- `worker-dist.tar.gz`, preserving Astro 6's repo-relative `dist/` tree and
  `.wrangler/deploy/config.json`;
- `worker-dist.sha256`;
- `worker-manifest.json`, recording the source and build commits, branch, event,
  run ID and attempt, artifact digest, lockfile digest, the
  `astro-cloudflare-v6` contract marker, and separate digests for the generated
  and redirect Wrangler configurations.

Credentialed workflows verify the checksum and provenance, reject absolute or
parent-traversing archive paths, reject links and special files, verify both
configuration digests, and accept only the reviewed generated Wrangler
configuration shape. The generated config points to `dist/server/entry.mjs`
and serves assets from `dist/client`. Before publishing the artifact, the
credential-free CI job copies only the artifact tree to a clean directory and
runs Wrangler's upload dry-run. This proves that later jobs can upload it
without the repository, `node_modules`, a rebuild, or branch-controlled package
scripts.

The production-candidate workflow also requires the source commit's CI workflow
file to match the trusted `main` definition. Credentialed consumers install
Wrangler 4.110.0 themselves, derive a minimal upload config beside the generated
server entrypoint, and do not execute branch-controlled package scripts.

Astro 6 local preview uses `astro preview`. The dedicated Worker runtime check
still starts the generated `dist/server/wrangler.json` directly because it must
exercise bindings, APIs, redirects, headers, assets, and 404 behavior in the
same Worker layout that release jobs upload.

## Runtime toolchain

Local development and CI use Node 22.23.1. The package engine allows Node
22.12.0 or newer within Node 22, which is Astro 6's supported Node line, while
`.nvmrc` and both artifact workflow definitions pin 22.23.1 for repeatability.
Wrangler remains pinned to 4.110.0. The site declares only the four Worker
environment variables it reads in `src/cloudflare-workers.d.ts`. This avoids
loading Worker DOM globals into browser-side source while keeping
`cloudflare:workers` imports typed.

## Preview inspection

Before dispatching `Upload Exact Preview Worker Version`, compare and enter:

- source PR number for an open same-repository PR artifact, or leave it empty
  only for an exact current-`main` push artifact;
- exact source branch and commit;
- successful source CI run ID;
- artifact SHA-256 from that exact run;
- explicit self-review confirmation.

For a PR artifact, the workflow requires the PR to remain open at the recorded
head and tested merge commit. For a `main` artifact, the source branch must be
exactly `main`, and the source commit, manifest build commit, trusted uploader
dispatch commit, and live `main` tip must all remain identical. A later merge
to `main` invalidates the earlier artifact.

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

## Retained manual exact-version activation

This workflow is the retained pre-cutover control, not the normal post-cutover
release path. Before dispatching it, independently compare:

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

This activates a version inside the Worker service but does not attach or remove
a production route. Because U4 has already attached `www.zenml.io/*`, the
workflow's empty-route predicate now refuses the live topology. Do not use it as
a post-cutover escape hatch. The automatic release workflow is the reviewed
post-cutover version-promotion path.

## Rollback classes

- **Before activation:** no rollback is needed. Leave the candidate inactive.
- **Version-specific failure:** the automatic release first restores the
  recorded previous version inline, then a separate recovery job reconciles the
  active deployment if activation failed or timed out. Recovery restores only
  when the exact candidate is active; it never replaces an unknown version.
  After whole-workflow cancellation or runner loss, manually verify the active
  version and deploy the recorded previous version at 100 percent if necessary.
- **Worker service or routing failure:** remove the exact
  `www.zenml.io/*` Worker route to restore the already-verified Pages fallback.
  Follow the U4 release record and verify the before-state first. Do not
  improvise DNS changes or touch any other `zenml.io` subdomain.

Never toggle the live route merely to prove rollback. Rehearse that behavior on
equivalent staging and use the production rollback only when cutover criteria
fail.
