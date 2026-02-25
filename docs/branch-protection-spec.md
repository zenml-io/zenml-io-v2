# Branch Protection & Repo Governance Spec

## Context

The zenml-io/zenml-io-v2 repository (ZenML website, Astro static site on Cloudflare Pages) is transitioning from solo development to team collaboration. The repo is now **public** on GitHub Free. There are 12 collaborators: 3 admins, 9 writers.

This spec defines the branch protection rules, merge strategy, reviewer configuration, and CODEOWNERS setup.

## Decisions

### Who can push directly to main (bypass branch protection)

| User | GitHub handle | Bypass? |
|------|--------------|---------|
| Alex (you) | `strickvl` | **Yes** — direct push to main |
| Hamza | `htahir1` | **Yes** — direct push to main |
| Everyone else | — | **No** — must use PRs |

### Who can approve PRs

Two tiers based on what changed:

**Code changes** (components, layouts, islands, config, CSS, scripts, astro.config, etc.):
- `strickvl`, `htahir1`, `znegrin` (Zuri), `AlexejPenner` (Alexei)

**Content changes** (blog posts, marketing copy, content collection markdown):
- `strickvl`, `htahir1`, `znegrin` (Zuri), `AlexejPenner` (Alexei)
- Plus a new team member TBD (add to CODEOWNERS when they join)

> Note: Both tiers currently have the same reviewers. The CODEOWNERS split exists so that when the new content team member joins, they can be added to the content paths only without gaining code approval rights.

### Merge strategy

- **Squash merge only** — each PR becomes a single clean commit on main
- Disable merge commits and rebase merges

### Branch protection rules for `main`

| Rule | Setting |
|------|---------|
| Require pull request before merging | **Yes** |
| Required approving reviews | **1** |
| Dismiss stale reviews on new pushes | **Yes** |
| Require review from CODEOWNERS | **Yes** |
| Require status checks to pass | **Yes** |
| Required status check | `deploy` (the existing "Deploy to Cloudflare Pages" workflow job) |
| Require branches to be up to date | **Yes** |
| Block force pushes | **Yes** (everyone, including admins) |
| Block branch deletion | **Yes** |
| Bypass actors | `strickvl`, `htahir1` |
| Require linear history | **No** (squash merge already provides this) |

### Repo-level settings

| Setting | Value |
|---------|-------|
| Allow squash merge | **Yes** (only merge method enabled) |
| Allow merge commit | **No** |
| Allow rebase merge | **No** |
| Delete branch on merge | **Yes** |
| Allow auto-merge | **No** (keep off for now) |

### CODEOWNERS file (`.github/CODEOWNERS`)

```
# Default: code reviewers (components, layouts, config, islands, scripts)
* @strickvl @htahir1 @znegrin @AlexejPenner

# Content: blog posts, authors, tags, categories
/src/content/blog/ @strickvl @htahir1 @znegrin @AlexejPenner
/src/content/authors/ @strickvl @htahir1 @znegrin @AlexejPenner
/src/content/blog-categories/ @strickvl @htahir1 @znegrin @AlexejPenner
/src/content/blog-tags/ @strickvl @htahir1 @znegrin @AlexejPenner

# Content: LLMOps database entries
/src/content/llmops-database/ @strickvl @htahir1 @znegrin @AlexejPenner

# Content: marketing copy data files
/src/lib/homepage.ts @strickvl @htahir1 @znegrin @AlexejPenner

# Content: VS/compare pages, case studies, integrations
/src/content/compare/ @strickvl @htahir1 @znegrin @AlexejPenner
/src/content/case-studies/ @strickvl @htahir1 @znegrin @AlexejPenner
/src/content/integrations/ @strickvl @htahir1 @znegrin @AlexejPenner
```

> When the new content team member joins, add their handle to the `/src/content/` paths only.

### CI workflow

The existing `.github/workflows/deploy.yml` handles both PR checks and production deploys:

- **On PR**: builds the site + deploys a Cloudflare Pages **preview** (branch URL like `<branch>.zenml-io-v2.pages.dev`). The `--branch ${{ github.head_ref }}` flag ensures PRs never touch the production deployment.
- **On push to main**: builds + deploys to **production** (the `main` production branch in Cloudflare Pages).
- **No changes needed** to the workflow itself. The `deploy` job name becomes a required status check in branch protection.

Keep as a single workflow for now. Splitting into separate build-only (PR) and deploy (main) workflows can be revisited later if CI speed becomes an issue.

### Branching model

- Contributors create branches directly in the repo (not forks)
- Feature branches are ephemeral — auto-deleted after merge
- No staging or release branches — just `main`
- No PR template — freeform descriptions

### Additional quality gates

None for now. Only `pnpm build` success required. Link checking, Lighthouse, etc. can be added later.

### Releases & tags

No restrictions. Not using GitHub Releases for this website repo.

### Out of scope (not changing)

- AdamVPro remains an admin for repo settings but must go through PRs for code changes (branch protection applies — only strickvl and htahir1 are bypass actors)
- No GitHub Team plan — all features use GitHub Free (public repo)
- No additional protected branches beyond `main`

## Implementation Steps

1. **Repo settings**: Disable merge commits and rebase merges, enable delete-branch-on-merge
2. **Create `.github/CODEOWNERS`**: Per the file above
3. **Branch protection on `main`**: Apply all rules from the table above via GitHub API or UI
4. **Verify**: Test with a PR from a non-bypass contributor to confirm rules are enforced
