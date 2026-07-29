# Cloudflare Worker PR previews
## Purpose

`Publish Worker PR Preview` gives each eligible pull request a stable public
preview of its exact CI-validated Cloudflare Worker artifact. It is separate
from:

- the production Worker `zenml-io-v2-worker`;
- the private migration Worker `zenml-io-v2-worker-preview`; and
- the retained Cloudflare Pages project.

The dedicated service is named `zenml-io-v2-pr-preview`. It has no route,
custom domain, production secret, production-release token, DNS authority, or
Pages authority. Only version preview URLs are public.

## What runs

The workflow has three entry points:

1. A successful `Website CI and Worker Artifact` pull-request run starts an
   automatic preview attempt.
2. A reviewed manual dispatch can publish an exact successful PR run and is the
   only path allowed to create the dedicated Worker on the first pilot.
3. Closing a same-repository pull request replaces its alias with a small
   `410 Gone` Worker version so the old site is no longer exposed.

Draft pull requests, fork pull requests, failed CI runs, closed pull requests,
stale heads, stale test merges, and artifacts built by an untrusted workflow
definition fail closed before upload.

GitHub's `workflow_run.pull_requests` list is not reliable enough to identify
the source PR. The workflow instead reads the completed CI run, queries the
open same-repository PR for that exact branch and head SHA, requires exactly
one non-draft match, and then verifies its current test-merge commit against
the artifact manifest.

## Stable aliases and concurrent PRs

Each open PR uses the immutable alias `pr-<number>`. Cloudflare maps that alias
to a URL with this shape:

```text
https://pr-<number>-zenml-io-v2-pr-preview.<account-subdomain>.workers.dev
```

A new successful commit updates only that PR's alias. Other PR aliases still
point to their own versions. Per-PR publish and retirement queues prevent a new
publish event from discarding a pending close event. A publish that was already
running when the PR closed rechecks the PR after upload and replaces its own
alias with a tombstone. Several aliases can remain available at the same time.

The workflow creates the sticky PR marker before uploading, then records the
URL, source branch, source commit, and CI run after verification. This means a
later failure cannot hide an alias from the retirement job. When the PR closes,
the same alias returns `410 Gone` and the comment is marked retired. Historical
Worker versions remain Cloudflare account history; the retirement path prevents
their PR aliases from continuing to serve the site.

## Trust boundary

The branch-controlled CI job never receives Cloudflare credentials. It builds,
tests, and packages the artifact once.

The credentialed workflow runs from the version committed to the default
branch. Before upload it:

- re-reads the successful CI run and exact open PR;
- verifies same-repository ownership, non-draft state, branch, head SHA, and
  current test-merge commit;
- excludes Dependabot PRs from the credentialed preview path;
- downloads rather than rebuilds the `worker-dist` artifact;
- verifies both recorded checksums and manifest provenance;
- compares the source build workflow blob with
  `.github/trusted/worker-artifact-workflow.yml`;
- rejects unsafe archive paths, links, and special files;
- allowlists the generated Astro 6 Worker configuration;
- rewrites only the fixed Worker name and explicit preview endpoint settings;
- dry-runs the exact configuration before upload;
- rechecks the CI run and PR immediately before the privileged upload; and
- proves that the dedicated Worker has no route or custom domain and that its
  latest version has no secret bindings and its active deployment did not
  change.

The upload uses `wrangler versions upload`, not `wrangler deploy`. Each preview
is an inactive version addressed through its preview alias. The workflow does
not bind any secret to PR-controlled code. Preview forms therefore validate in
the browser and Worker, but they do not forward submissions to Segment or call
Turnstile.

## Required GitHub environment

Create the `worker-pr-preview` environment only after the workflow PR has been
reviewed.

Configure:

1. Deployment branches and tags: **Selected branches and tags**.
2. The only branch rule: exactly `main`.
3. No tag or pull-request deployment rule.
4. Exactly these secret names:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_WORKERS_PR_PREVIEW_TOKEN`

The Cloudflare token needs account-scoped **Workers Scripts: Edit** for the
ZenML account. Do not give this environment the Worker-routes token, production
Worker token, DNS permissions, Pages permissions, or form secrets.

Cloudflare does not offer per-Worker script-edit tokens. The trusted
default-branch workflow, fixed Worker name, selected-`main` environment policy,
and absence of route credentials are therefore enforcement controls.

## First pilot and bootstrap

GitHub only executes a new `workflow_run` or `workflow_dispatch` workflow after
its definition exists on the default branch. The PR that introduces this
workflow cannot publish its own preview through that workflow.

After merging the reviewed workflow:

1. Pause and confirm production, retained Pages, private migration Worker,
   staging hostname, and platform-service hostnames match their recorded
   baselines.
2. Create or reuse one harmless same-repository, non-draft pilot PR based on
   current `main`.
3. Wait for its complete `Website CI and Worker Artifact` run to pass.
4. Open **Actions → Publish Worker PR Preview → Run workflow** on `main`.
5. Enter that open PR number, exact source branch, and exact CI run ID.
6. Check `allow_bootstrap` only after confirming
   `zenml-io-v2-pr-preview` does not already exist.
7. Check `self_reviewed`.

That run uploads the exact pilot artifact and intentionally enables public
version previews only for the new dedicated Worker. It must finish with:

- `workers.dev` disabled;
- version previews enabled;
- no Worker route;
- no custom domain;
- no active-deployment change;
- no secret bindings;
- a working homepage;
- a `404` response for an unknown path; and
- one sticky preview comment on the pilot PR.

Stop if the run reports that the Worker already exists with different endpoint
settings or topology. Do not repair drift during the same run.

## Manual acceptance

For the pilot URL, check:

- homepage, navigation, pricing, blog, Kitaru, and LLMOps pages;
- representative assets and image optimization;
- Pagefind search;
- hydrated Preact islands;
- `/api/github-stars`;
- redirects, headers, and a real `404`;
- desktop and narrow browser widths;
- keyboard navigation and visible focus; and
- browser console and network errors.

Forms are deliberately non-operational in hosted PR previews. Client-side and
Worker-side validation can be tested, but a successful response does not send
data to Segment. Do not enter real user data or treat the preview as an
end-to-end form test.

## Prove multiple PR isolation

After the first pilot is accepted:

1. Create or reuse a second eligible same-repository PR.
2. Let both PRs complete CI and publish previews.
3. Confirm both `pr-<number>` URLs remain accessible and show their respective
   commits.
4. Push a harmless update to one PR.
5. Confirm only its alias and sticky comment advance.
6. Close the pilot PR and verify only its URL changes to `410 Gone`; the second
   PR preview must remain available.

Stop automatic use if aliases collide, another PR changes, a preview acquires a
route or custom domain, production changes, or retirement affects another
alias.

## Failure and rollback

- Before bootstrap, closing the implementation PR leaves Cloudflare unchanged.
- A failed automatic upload leaves production unchanged. Inspect the evidence
  artifact before retrying.
- If bootstrap produces unexpected exposure or topology, disable preview URLs
  only on `zenml-io-v2-pr-preview`, disable the automatic GitHub workflow, and
  stop.
- Never change `www.zenml.io/*`, `astro-workers-staging.zenml.io/*`, DNS,
  retained Pages, the private migration Worker, or production deployment
  percentages as part of PR-preview recovery.
