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
export const FALLBACK_STARS = 6200;

export type StarsSource = "github" | "cache" | "fallback";

export interface GithubStarsSnapshot {
  repo: typeof GITHUB_REPO_SLUG;
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
): GithubStarsSnapshot {
  const normalizedStars = normalizeStars(stars);
  return {
    repo: GITHUB_REPO_SLUG,
    stars: normalizedStars,
    formatted: formatStars(normalizedStars),
    source,
    asOf: asOf.toISOString(),
  };
}

export function fallbackStarsSnapshot(asOf = new Date()): GithubStarsSnapshot {
  return createStarsSnapshot(FALLBACK_STARS, "fallback", asOf);
}

export async function fetchGithubStarsFromGitHub({
  fetchImpl = fetch,
  token,
  timeoutMs = 2000,
  userAgent = "zenml-website",
}: {
  fetchImpl?: typeof fetch;
  token?: string;
  timeoutMs?: number;
  userAgent?: string;
} = {}): Promise<GithubStarsFetchResult> {
  const controller = new AbortController();
  const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": userAgent,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetchImpl(GITHUB_REPO_API_URL, {
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
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timeoutId);
  }
}
