import type { Runtime } from "@astrojs/cloudflare";
import type { APIContext } from "astro";
import {
  createStarsSnapshot,
  fallbackStarsSnapshot,
  fetchGithubStarsFromGitHub,
  GITHUB_REPO_SLUG,
  type GithubStarsSnapshot,
} from "../../lib/githubStars";

export const prerender = false;

const CACHE_KEY_URL = "https://cache.local/api/github-stars";
const SOFT_TTL_SECONDS = 1800; // 30 minutes
const HARD_TTL_SECONDS = 86400; // 24 hours
const FALLBACK_TTL_SECONDS = 600; // 10 minutes
const STALE_WHILE_REVALIDATE_SECONDS = 86400;

const STANDARD_CACHE_CONTROL = `public, max-age=300, s-maxage=${SOFT_TTL_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATE_SECONDS}`;
const FALLBACK_CACHE_CONTROL = `public, max-age=60, s-maxage=${FALLBACK_TTL_SECONDS}, stale-while-revalidate=3600`;

type CloudflareRuntime = Runtime["runtime"];

interface CacheStorageWithDefault extends CacheStorage {
  default?: Cache;
}

function jsonResponse(
  snapshot: GithubStarsSnapshot,
  useFallbackCaching: boolean,
): Response {
  return new Response(JSON.stringify(snapshot), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": useFallbackCaching
        ? FALLBACK_CACHE_CONTROL
        : STANDARD_CACHE_CONTROL,
    },
  });
}

function getDefaultCache(): Cache | null {
  const cacheStorage = globalThis.caches as CacheStorageWithDefault | undefined;
  return cacheStorage?.default ?? null;
}

function getRuntime(context: APIContext): CloudflareRuntime | null {
  const locals = context.locals as Partial<Runtime>;
  return locals.runtime ?? null;
}

function getGithubToken(context: APIContext): string | undefined {
  const runtime = getRuntime(context);
  const env = runtime?.env as Record<string, unknown> | undefined;

  const primaryToken = env?.GITHUB_TOKEN;
  if (typeof primaryToken === "string" && primaryToken.trim()) {
    return primaryToken.trim();
  }

  const secondaryToken = env?.GITHUB_API_TOKEN;
  if (typeof secondaryToken === "string" && secondaryToken.trim()) {
    return secondaryToken.trim();
  }

  return undefined;
}

function isStarsSource(value: unknown): value is GithubStarsSnapshot["source"] {
  return value === "github" || value === "cache" || value === "fallback";
}

function isGithubStarsSnapshot(value: unknown): value is GithubStarsSnapshot {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;
  const stars = candidate.stars;
  const asOf = candidate.asOf;

  return (
    candidate.repo === GITHUB_REPO_SLUG &&
    typeof stars === "number" &&
    Number.isFinite(stars) &&
    stars >= 0 &&
    typeof candidate.formatted === "string" &&
    isStarsSource(candidate.source) &&
    typeof asOf === "string" &&
    Number.isFinite(Date.parse(asOf))
  );
}

function getSnapshotAgeSeconds(
  snapshot: GithubStarsSnapshot,
  now: Date,
): number {
  const snapshotTs = Date.parse(snapshot.asOf);
  if (!Number.isFinite(snapshotTs)) {
    return Number.POSITIVE_INFINITY;
  }

  const ageSeconds = Math.floor((now.getTime() - snapshotTs) / 1000);
  return Math.max(0, ageSeconds);
}

async function fetchLiveSnapshot(token?: string): Promise<GithubStarsSnapshot> {
  const result = await fetchGithubStarsFromGitHub({
    token,
    timeoutMs: 2000,
    userAgent: "zenml-website-github-stars-api",
  });

  if (result.ok) {
    return createStarsSnapshot(result.stars, "github");
  }

  return fallbackStarsSnapshot();
}

async function cacheSnapshot(
  cache: Cache,
  cacheKey: Request,
  snapshot: GithubStarsSnapshot,
): Promise<void> {
  const isFallback = snapshot.source === "fallback";
  const sMaxAge = isFallback ? FALLBACK_TTL_SECONDS : HARD_TTL_SECONDS;

  const cacheEntry = new Response(JSON.stringify(snapshot), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${sMaxAge}, s-maxage=${sMaxAge}`,
    },
  });

  await cache.put(cacheKey, cacheEntry);
}

async function refreshCache(
  cache: Cache,
  cacheKey: Request,
  token?: string,
): Promise<void> {
  try {
    const result = await fetchGithubStarsFromGitHub({
      token,
      timeoutMs: 2000,
      userAgent: "zenml-website-github-stars-api",
    });

    if (!result.ok) {
      // Keep last-known-good cached value during transient GitHub issues.
      return;
    }

    await cacheSnapshot(
      cache,
      cacheKey,
      createStarsSnapshot(result.stars, "github"),
    );
  } catch {
    // Silent refresh failure — caller will keep serving cached value.
  }
}

export async function GET(context: APIContext): Promise<Response> {
  const cache = getDefaultCache();
  const cacheKey = new Request(CACHE_KEY_URL);
  const githubToken = getGithubToken(context);

  if (cache) {
    const cached = await cache.match(cacheKey);
    if (cached) {
      try {
        const cachedPayload = (await cached.json()) as unknown;
        if (isGithubStarsSnapshot(cachedPayload)) {
          const isStale =
            getSnapshotAgeSeconds(cachedPayload, new Date()) > SOFT_TTL_SECONDS;
          if (isStale) {
            const runtime = getRuntime(context);
            runtime?.ctx.waitUntil(refreshCache(cache, cacheKey, githubToken));
          }

          const cachedResponse: GithubStarsSnapshot = {
            ...cachedPayload,
            source: "cache",
          };
          const cacheControlFallback = cachedPayload.source === "fallback";
          return jsonResponse(cachedResponse, cacheControlFallback);
        }
      } catch {
        // Malformed cache payload — ignore and rebuild below.
      }
    }
  }

  const liveSnapshot = await fetchLiveSnapshot(githubToken);
  if (cache) {
    await cacheSnapshot(cache, cacheKey, liveSnapshot);
  }

  return jsonResponse(liveSnapshot, liveSnapshot.source === "fallback");
}
