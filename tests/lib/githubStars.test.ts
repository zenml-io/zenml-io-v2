import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchGithubStarsFromGitHub } from "../../src/lib/githubStars";

afterEach(() => {
  vi.useRealTimers();
});

describe("fetchGithubStarsFromGitHub", () => {
  it("returns the fallback result when fetch ignores the abort signal", async () => {
    vi.useFakeTimers();
    const requestSignals: AbortSignal[] = [];
    const fetchImpl = vi.fn<typeof fetch>(async (_input, init) => {
      requestSignals.push(init?.signal as AbortSignal);
      return await new Promise<Response>(() => {});
    });

    const resultPromise = fetchGithubStarsFromGitHub({
      fetchImpl,
      timeoutMs: 2_000,
    });
    await vi.advanceTimersByTimeAsync(2_000);

    await expect(resultPromise).resolves.toEqual({ ok: false });
    expect(requestSignals[0]?.aborted).toBe(true);
  });

  it("returns the fallback result when a GitHub response body stalls", async () => {
    vi.useFakeTimers();
    const requestSignals: AbortSignal[] = [];
    const response = {
      ok: true,
      status: 200,
      json: async () => await new Promise<unknown>(() => {}),
    } as Response;
    const fetchImpl = vi.fn<typeof fetch>(async (_input, init) => {
      requestSignals.push(init?.signal as AbortSignal);
      return response;
    });

    const resultPromise = fetchGithubStarsFromGitHub({
      fetchImpl,
      timeoutMs: 2_000,
    });
    await vi.advanceTimersByTimeAsync(2_000);

    await expect(resultPromise).resolves.toEqual({ ok: false });
    expect(requestSignals[0]?.aborted).toBe(true);
  });
});
