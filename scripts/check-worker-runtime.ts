import { type ChildProcess, spawn } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { resolve } from "node:path";

const CLIENT_DIR = resolve("dist/client");
const SERVER_CONFIG_PATH = resolve("dist/server/wrangler.json");
const WRANGLER_STATE_DIR = resolve(".wrangler");
const TEST_ENV_PATH = resolve(WRANGLER_STATE_DIR, "runtime-check.env");
const START_TIMEOUT_MS = 30_000;
const REQUEST_TIMEOUT_MS = 10_000;
const COLD_START_REQUEST_TIMEOUT_MS = 30_000;
const TRANSIENT_RETRY_ATTEMPTS = 3;
const TRANSIENT_RETRY_DELAY_MS = 500;

type CheckResult = {
  name: string;
  ok: boolean;
  detail?: string;
};

async function reservePort(): Promise<number> {
  const server = createServer();

  return await new Promise((resolvePort, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Could not reserve a local port"));
        return;
      }

      const { port } = address;
      server.close((error) => {
        if (error) reject(error);
        else resolvePort(port);
      });
    });
  });
}

function startWrangler(port: number): {
  child: ChildProcess;
  output: () => string;
} {
  mkdirSync(WRANGLER_STATE_DIR, { recursive: true });
  writeFileSync(
    TEST_ENV_PATH,
    [
      "TURNSTILE_SECRET_KEY=worker-runtime-test-turnstile",
      "SEGMENT_FORMS_WRITE_KEY=worker-runtime-test-segment",
      "",
    ].join("\n"),
    { mode: 0o600 },
  );

  const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
  const child = spawn(
    command,
    [
      "exec",
      "wrangler",
      "dev",
      "--config",
      SERVER_CONFIG_PATH,
      "--env-file",
      TEST_ENV_PATH,
      "--ip",
      "127.0.0.1",
      "--port",
      String(port),
      "--log-level",
      "warn",
      "--show-interactive-dev-session=false",
    ],
    {
      env: {
        ...process.env,
        CI: "1",
        NO_COLOR: "1",
        WRANGLER_LOG_PATH: resolve(
          WRANGLER_STATE_DIR,
          "runtime-check-wrangler.log",
        ),
        WRANGLER_SEND_METRICS: "false",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  let captured = "";
  const capture = (chunk: Buffer) => {
    captured = `${captured}${chunk.toString()}`.slice(-20_000);
  };
  child.stdout?.on("data", capture);
  child.stderr?.on("data", capture);

  return { child, output: () => captured };
}

async function waitForWorker(
  child: ChildProcess,
  baseUrl: string,
  output: () => string,
): Promise<void> {
  const deadline = Date.now() + START_TIMEOUT_MS;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(
        `Wrangler exited before the runtime was ready.\n${output()}`,
      );
    }

    try {
      const response = await fetch(baseUrl, {
        signal: AbortSignal.timeout(1_000),
      });
      await response.body?.cancel();
      return;
    } catch {
      await sleep(200);
    }
  }

  throw new Error(`Timed out waiting for Wrangler at ${baseUrl}.\n${output()}`);
}

async function stopWrangler(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null) return;

  child.kill("SIGTERM");
  let forceKillTimeout: NodeJS.Timeout | undefined;
  await Promise.race([
    new Promise<void>((resolveExit) =>
      child.once("exit", () => {
        if (forceKillTimeout) clearTimeout(forceKillTimeout);
        resolveExit();
      }),
    ),
    new Promise<void>((resolveTimeout) => {
      forceKillTimeout = setTimeout(resolveTimeout, 5_000);
    }),
  ]);

  if (child.exitCode === null) {
    child.kill("SIGKILL");
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolveWait) => setTimeout(resolveWait, ms));
}

async function request(
  baseUrl: string,
  pathname: string,
  init?: RequestInit,
  timeoutMs = REQUEST_TIMEOUT_MS,
): Promise<Response> {
  // workerd's local socket can drop mid-request ("Network connection lost"),
  // surfacing either as a thrown "fetch failed" or as a spurious 5xx that has
  // nothing to do with the endpoint. Both get a few attempts; the final
  // attempt's 5xx response or thrown error still surfaces, so deterministic
  // failures keep failing the gate. Timeouts fail immediately — they already
  // waited timeoutMs. No check expects a 5xx, so retrying them is safe.
  for (let attempt = 1; ; attempt += 1) {
    const signal = AbortSignal.timeout(timeoutMs);

    try {
      const response = await fetch(`${baseUrl}${pathname}`, {
        ...init,
        redirect: init?.redirect ?? "manual",
        signal,
      });
      if (response.status < 500 || attempt === TRANSIENT_RETRY_ATTEMPTS) {
        return response;
      }
      await response.body?.cancel();
    } catch (error) {
      if (signal.aborted) {
        throw new Error(
          `Timed out requesting ${pathname} from the Worker after ${timeoutMs}ms`,
          { cause: error },
        );
      }
      if (attempt === TRANSIENT_RETRY_ATTEMPTS) {
        throw new Error(
          `Network failure requesting ${pathname} after ${TRANSIENT_RETRY_ATTEMPTS} attempts`,
          { cause: error },
        );
      }
    }

    await sleep(TRANSIENT_RETRY_DELAY_MS);
  }
}

function check(
  results: CheckResult[],
  name: string,
  condition: boolean,
  detail?: string,
): void {
  results.push({ name, ok: condition, detail });
}

async function runChecks(baseUrl: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  const kitaru = await request(
    baseUrl,
    "/product/kitaru",
    undefined,
    COLD_START_REQUEST_TIMEOUT_MS,
  );
  const kitaruHtml = await kitaru.text();
  check(results, "Kitaru page returns 200", kitaru.status === 200);
  check(
    results,
    "Kitaru page preserves identity markers",
    kitaruHtml.includes('data-app="kitaru"') &&
      kitaruHtml.includes('id="kitaru-main"'),
  );
  check(
    results,
    "Static page receives security headers",
    kitaru.headers.get("x-content-type-options") === "nosniff" &&
      kitaru.headers.get("x-frame-options") === "DENY" &&
      kitaru.headers
        .get("content-security-policy-report-only")
        ?.includes("report-uri /api/csp-report") === true,
  );

  const trailingSlash = await request(baseUrl, "/product/kitaru/");
  check(
    results,
    "Trailing slash redirects to the canonical file-format URL",
    [301, 302, 307, 308].includes(trailingSlash.status) &&
      new URL(trailingSlash.headers.get("location") ?? "/", baseUrl)
        .pathname === "/product/kitaru",
    `status ${trailingSlash.status}, location ${trailingSlash.headers.get("location")}`,
  );

  for (const pathname of ["/plans", "/plans/"]) {
    const redirect = await request(baseUrl, pathname);
    check(
      results,
      `${pathname} preserves its redirect`,
      redirect.status === 301 &&
        new URL(redirect.headers.get("location") ?? "/", baseUrl).pathname ===
          "/pricing",
      `status ${redirect.status}, location ${redirect.headers.get("location")}`,
    );
  }

  // The static /blog/page/N pagination route was retired for client-side
  // pagination (#249) — public/_redirects enumerates every page number that
  // was ever built (2 through the highest at retirement) rather than a
  // splat, since a splat's behavior under the Workers _redirects engine (as
  // opposed to native Cloudflare Pages) wasn't a known quantity. Spot-check
  // the first and last enumerated entries end-to-end through the built
  // Worker, not just that _redirects parsing works in general. The query
  // string is asserted too: the redirect target carries ?page=N so saved
  // links keep their approximate position, and a target that silently
  // collapses back to page 1 must fail here.
  for (const [pathname, page] of [
    ["/blog/page/2", "2"],
    ["/blog/page/2/", "2"],
    ["/blog/page/18", "18"],
    ["/blog/page/18/", "18"],
  ] as const) {
    const redirect = await request(baseUrl, pathname);
    const location = new URL(redirect.headers.get("location") ?? "/", baseUrl);
    check(
      results,
      `${pathname} redirects to /blog?page=${page}`,
      redirect.status === 301 &&
        location.pathname === "/blog" &&
        location.search === `?page=${page}`,
      `status ${redirect.status}, location ${redirect.headers.get("location")}`,
    );
  }

  const notFound = await request(baseUrl, "/worker-runtime-missing-page");
  const notFoundHtml = await notFound.text();
  check(
    results,
    "Unknown route returns the generated 404 page",
    notFound.status === 404 &&
      notFoundHtml.includes("<html") &&
      notFoundHtml.includes("404"),
    `status ${notFound.status}`,
  );

  for (const pathname of [
    "/_worker.js/index.js",
    "/_routes.json",
    "/_headers",
    "/_redirects",
  ]) {
    const controlFile = await request(baseUrl, pathname);
    check(
      results,
      `${pathname} is not exposed as a static asset`,
      controlFile.status === 404,
      `status ${controlFile.status}`,
    );
    await controlFile.body?.cancel();
  }

  const assetPath = kitaruHtml.match(
    /component-url="(\/_astro\/[^"]+\.js)"/,
  )?.[1];
  if (assetPath) {
    const asset = await request(baseUrl, assetPath);
    check(
      results,
      "Hydration bundle is served as JavaScript",
      asset.status === 200 &&
        asset.headers.get("content-type")?.includes("javascript") === true,
      `status ${asset.status}, content-type ${asset.headers.get("content-type")}`,
    );
    await asset.body?.cancel();
  } else {
    check(results, "Kitaru page links a hydration bundle", false);
  }

  const formGet = await request(baseUrl, "/api/forms/demo-request");
  check(
    results,
    "Forms API executes in the Worker",
    formGet.status === 405 &&
      formGet.headers.get("content-type")?.includes("application/json") ===
        true,
    `status ${formGet.status}`,
  );
  await formGet.body?.cancel();

  const unverifiedForm = await request(baseUrl, "/api/forms/demo-request", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      fullName: "Runtime Check",
      email: "runtime-check@example.com",
      privacy: "on",
    }),
  });
  check(
    results,
    "Form without a Turnstile token is rejected before external side effects",
    unverifiedForm.status === 403,
    `status ${unverifiedForm.status}`,
  );
  await unverifiedForm.body?.cancel();

  const csp = await request(baseUrl, "/api/csp-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "csp-report": {
        "document-uri": "https://www.zenml.io/product/kitaru?private=removed",
        "violated-directive": "script-src",
      },
    }),
  });
  const cspFailureBody = csp.status === 204 ? "" : await csp.text();
  check(
    results,
    "CSP report API accepts a valid report",
    csp.status === 204,
    `status ${csp.status}${cspFailureBody ? `, body ${cspFailureBody.slice(0, 500)}` : ""}`,
  );
  if (csp.status === 204) await csp.body?.cancel();

  const malformedCsp = await request(baseUrl, "/api/csp-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{not-json",
  });
  check(
    results,
    "Malformed CSP report does not take down the Worker",
    malformedCsp.status === 204,
    `status ${malformedCsp.status}`,
  );
  await malformedCsp.body?.cancel();

  return results;
}

async function main(): Promise<void> {
  if (
    !existsSync(resolve("dist/server/entry.mjs")) ||
    !existsSync(SERVER_CONFIG_PATH) ||
    !existsSync(resolve(CLIENT_DIR, "index.html"))
  ) {
    console.error(
      "Worker build output is missing. Run pnpm build before pnpm check:worker.",
    );
    process.exit(1);
  }

  const port = await reservePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const { child, output } = startWrangler(port);

  try {
    await waitForWorker(child, baseUrl, output);
    console.log(`Checking Astro Worker runtime at ${baseUrl}`);

    const results = await runChecks(baseUrl);
    for (const result of results) {
      console.log(`  ${result.ok ? "✓" : "✗"} ${result.name}`);
      if (!result.ok && result.detail) {
        console.log(`    ${result.detail}`);
      }
    }

    const failures = results.filter((result) => !result.ok);
    if (failures.length > 0) {
      console.error(`\n✗ ${failures.length} Worker runtime check(s) failed`);
      process.exitCode = 1;
    } else {
      console.log(`\n✓ ${results.length} Worker runtime checks passed`);
    }
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;
  } finally {
    await stopWrangler(child);
    rmSync(TEST_ENV_PATH, { force: true });
  }
}

void main();
