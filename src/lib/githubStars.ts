/**
 * Shared GitHub stars helpers for first-party rendering.
 *
 * Keeps star-count constants, formatting, and GitHub fetch logic
 * in one place so UI and API routes stay consistent.
 */

export const GITHUB_REPO = { owner: "zenml-io", name: "zenml" } as const;
export const GITHUB_REPO_SLUG =
  `${GITHUB_REPO.owner}/${GITHUB_REPO.name}` as const;
export const GITHUB_REPO_URL =
  `https://github.com/${GITHUB_REPO_SLUG}` as const;
export const GITHUB_REPO_API_URL =
  `https://api.github.com/repos/${GITHUB_REPO_SLUG}` as const;

/**
 * Stable fallback shown whenever live GitHub data is unavailable.
 * Keep this in sync with recent known stargazer count.
 */
export const FALLBACK_STARS = 5556;

// Kitaru repo — shown on Kitaru surfaces (public repo, live count).
export const KITARU_GITHUB_REPO = {
  owner: "zenml-io",
  name: "kitaru",
} as const;
export const KITARU_GITHUB_REPO_SLUG =
  `${KITARU_GITHUB_REPO.owner}/${KITARU_GITHUB_REPO.name}` as const;
export const KITARU_GITHUB_REPO_URL =
  `https://github.com/${KITARU_GITHUB_REPO_SLUG}` as const;
export const KITARU_GITHUB_REPO_API_URL =
  `https://api.github.com/repos/${KITARU_GITHUB_REPO_SLUG}` as const;
export const KITARU_FALLBACK_STARS = 235;

export type StarsRepoKey = "zenml" | "kitaru";

export interface StarsRepoConfig {
  key: StarsRepoKey;
  slug: string;
  url: string;
  apiUrl: string;
  fallbackStars: number;
}

const STARS_REPOS: Record<StarsRepoKey, StarsRepoConfig> = {
  zenml: {
    key: "zenml",
    slug: GITHUB_REPO_SLUG,
    url: GITHUB_REPO_URL,
    apiUrl: GITHUB_REPO_API_URL,
    fallbackStars: FALLBACK_STARS,
  },
  kitaru: {
    key: "kitaru",
    slug: KITARU_GITHUB_REPO_SLUG,
    url: KITARU_GITHUB_REPO_URL,
    apiUrl: KITARU_GITHUB_REPO_API_URL,
    fallbackStars: KITARU_FALLBACK_STARS,
  },
};

/** Resolve a repo key (e.g. from a query param) to its config; defaults to zenml. */
export function resolveStarsRepo(key: unknown): StarsRepoConfig {
  return key === "kitaru" ? STARS_REPOS.kitaru : STARS_REPOS.zenml;
}

export type StarsSource = "github" | "cache" | "fallback";

export interface GithubStarsSnapshot {
  repo: string;
  stars: number;
  formatted: string;
  source: StarsSource;
  asOf: string;
}

export type GithubStarsFetchResult =
  | { ok: true; stars: number }
  | { ok: false; status?: number };

function normalizeStars(value: number): number {
  return Math.max(0, Math.floor(value));
}

function readStargazersCount(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;
  const count = (payload as Record<string, unknown>).stargazers_count;
  if (typeof count !== "number" || !Number.isFinite(count)) return null;
  return normalizeStars(count);
}

export function formatStars(stars: number): string {
  return new Intl.NumberFormat("en-US").format(normalizeStars(stars));
}

export function createStarsSnapshot(
  stars: number,
  source: StarsSource,
  asOf = new Date(),
  repo: string = GITHUB_REPO_SLUG,
): GithubStarsSnapshot {
  const normalizedStars = normalizeStars(stars);
  return {
    repo,
    stars: normalizedStars,
    formatted: formatStars(normalizedStars),
    source,
    asOf: asOf.toISOString(),
  };
}

export function fallbackStarsSnapshot(
  asOf = new Date(),
  stars: number = FALLBACK_STARS,
  repo: string = GITHUB_REPO_SLUG,
): GithubStarsSnapshot {
  return createStarsSnapshot(stars, "fallback", asOf, repo);
}

export async function fetchGithubStarsFromGitHub({
  fetchImpl = fetch,
  token,
  timeoutMs = 2000,
  userAgent = "zenml-website",
  apiUrl = GITHUB_REPO_API_URL,
}: {
  fetchImpl?: typeof fetch;
  token?: string;
  timeoutMs?: number;
  userAgent?: string;
  apiUrl?: string;
} = {}): Promise<GithubStarsFetchResult> {
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": userAgent,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return await Promise.race([
      (async (): Promise<GithubStarsFetchResult> => {
        const response = await fetchImpl(apiUrl, {
          headers,
          signal: controller.signal,
        });

        if (!response.ok) {
          return { ok: false, status: response.status };
        }

        const payload = await response.json();
        const stars = readStargazersCount(payload);
        if (stars === null) {
          return { ok: false, status: response.status };
        }

        return { ok: true, stars };
      })(),
      new Promise<GithubStarsFetchResult>((resolveTimeout) => {
        timeoutId = setTimeout(() => {
          controller.abort();
          resolveTimeout({ ok: false });
        }, timeoutMs);
      }),
    ]);
  } catch {
    return { ok: false };
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }
}
