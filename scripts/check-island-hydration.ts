/**
 * check-island-hydration.ts — proves the Preact islands in dist/client actually hydrate.
 *
 * Run via: pnpm check:islands (after pnpm build — it reads dist/client)
 * Exits with code 1 (failing CI) if any island fails to become interactive.
 *
 * Why this exists
 * ---------------
 * `pnpm build` proves the site compiles. `pnpm smoke:dist` proves the
 * <astro-island> markup and its component bundle are present on disk. Neither
 * proves an island actually *runs*: it can ship perfect markup and still be
 * inert (a broken import, a throw during hydration, a dropped client:* directive,
 * a framework upgrade that changes the hydration contract). That failure mode is
 * invisible — the site looks right and is silently dead — and it passes a fully
 * green CI. This script is the only thing that catches it.
 *
 * It matters most for the Astro 5 -> 7 migration (issue #128). Dependabot PRs get
 * no preview deploy (GitHub withholds secrets from bot-triggered runs, so the
 * Cloudflare deploy step skips itself and still reports green), so without this
 * there is nothing to click and nothing to trust.
 *
 * How it works
 * ------------
 * 1. Serves dist/client over a throwaway node:http server on an ephemeral port.
 *    Astro is configured with `build.format: "file"`, so /foo maps to
 *    dist/client/foo.html.
 * 2. Drives it with the `playwright` dep we already have (deliberately NOT
 *    @playwright/test — no second test runner, no config file, no new dependency).
 * 3. Runs each check in a fresh browser context, then asserts on the DOM.
 *
 * Why a hand-rolled server rather than an existing one:
 * - The generated Worker runtime is covered separately by `pnpm check:worker`.
 *   This check deliberately serves only static output so it isolates client-side
 *   hydration from Worker startup, bindings, redirects, and API behavior.
 * - An off-the-shelf static server gets two things wrong that matter here; both are
 *   documented at their point of use below (the .js MIME type, and the fact that
 *   /llmops-database exists as both a file and a directory).
 *
 * The critical primitive is `astro-island[...]:not([ssr])`. Astro's island runtime
 * removes the `ssr` attribute once hydration finishes. A click on an un-hydrated
 * island is silently discarded — no listener is attached yet — and retrying the
 * assertion cannot recover it. Every check MUST wait on that selector before
 * interacting. This is what makes the script deterministic without a test runner's
 * retry machinery.
 *
 * What is intentionally NOT checked
 * ---------------------------------
 * - ProTestimonialCarousel: client:visible plus a 4s autoplay that mutates the very
 *   transform we would assert on. Gratuitously timing-sensitive.
 * - BlogSearch: client:media="(min-width: 640px)", so it does not hydrate at all
 *   below that viewport, plus a fetch-on-focus.
 * - RoiCalculator: its three range inputs have no id, name or aria-label, so a test
 *   would have to select them positionally — brittle, for a low-traffic page.
 * All three are still covered structurally by the island manifest in
 * check-dist-smoke.ts. Please do not "helpfully" add them back here.
 *
 * LlmopsIndex, MlopsIndex, IntegrationsIndex, and BlogIndex (#249) are four
 * separate thin wrappers around the same shared FilterIndex engine
 * (src/components/islands/filter-index/), not near-duplicates of each other
 * the way the old LLMOpsFilter/MLOpsFilter pair was — each wires its own
 * data source, facet fields and (for Integrations) a DOM-visibility search
 * mode, so each gets its own real-interaction check below; a bug in one
 * page's wiring would not be caught by testing another. CategoryBar/TagCloud
 * (the blog index's former header/footer chrome) turned out to be shared
 * across the rest of the blog surface (post pages, plus the category/tag/
 * author hub pages) — they stay in place there, only retired from the
 * index; see their doc comments.
 * - Of the remaining /product/kitaru islands, TwoDoors covers the interactive
 *   contract that has regressed. The others have nothing better to assert on:
 *   Hero's sole interaction is a clipboard write (permission-gated in
 *   headless), KitaruGrain is a WebGL shader, and ScenarioStrip's only state
 *   is a decorative hover-linked highlight — a progressive enhancement we
 *   accept going untested rather than asserting on hover-driven class flips.
 *
 * - Console errors and pageerror are NOT failure triggers. Pagefind's wasm load,
 *   the aborted third-party requests and image 404s all produce noise; failing on
 *   it guarantees false positives. An island that throws during hydration fails its
 *   assertion anyway. Page errors are captured and appended to the failure message
 *   as a diagnostic only.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { extname, resolve, sep } from "node:path";
import type { Browser, Page } from "playwright";
import { chromium } from "playwright";

const DIST = resolve("dist/client");
const NAV_TIMEOUT = 20_000;
const ACTION_TIMEOUT = 10_000;

// ── Static server over dist/client ─────────────────────────────────

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  // Islands hydrate via an ES *module* import. Browsers enforce strict MIME on
  // module scripts, so serving .js as octet-stream breaks ALL hydration with an
  // error that looks nothing like an island bug. This mapping is mandatory.
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".wasm": "application/wasm",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

/** Map a URL pathname to a file in dist/client, honouring Astro's file format. */
function resolveDistFile(pathname: string): string | null {
  let relativePath: string;

  try {
    relativePath = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  relativePath = relativePath.replace(/^\/+/, "").replace(/\/+$/, "");
  const target = resolve(
    DIST,
    relativePath === "" ? "index.html" : relativePath,
  );

  // Path-traversal guard.
  if (target !== DIST && !target.startsWith(DIST + sep)) {
    return null;
  }

  // Two candidates, in this order: the literal path (assets — /_astro/*.js,
  // /llmops-index.json) then + ".html" (pages, per build.format: "file").
  //
  // isFile() is not optional. /llmops-database exists BOTH as llmops-database.html
  // AND as a llmops-database/ directory, so an existsSync-only check would resolve
  // the literal path to the directory and serve garbage — and the LLMOps check would
  // fail for a reason that has nothing to do with hydration. This, plus the .js MIME
  // mapping above, is why an off-the-shelf static server does not work here.
  for (const candidate of [target, `${target}.html`]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

interface StaticServer {
  baseUrl: string;
  /** Pathnames the server could not resolve. Printed on failure, so a bad path
   *  mapping cannot masquerade as a hydration bug. */
  missing: string[];
  close: () => Promise<void>;
}

function startStaticServer(): Promise<StaticServer> {
  const missing: string[] = [];

  const server = createServer((request, response) => {
    const { pathname } = new URL(request.url ?? "/", "http://127.0.0.1");
    const file = resolveDistFile(pathname);

    if (file === null) {
      missing.push(pathname);
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type":
        MIME[extname(file).toLowerCase()] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(readFileSync(file));
  });

  return new Promise((ready) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as AddressInfo;

      ready({
        baseUrl: `http://127.0.0.1:${port}`,
        missing,
        close: () =>
          new Promise((done) => {
            // Without this, keep-alive sockets leave close() pending forever.
            server.closeAllConnections();
            server.close(() => done());
          }),
      });
    });
  });
}

// ── Island selectors ───────────────────────────────────────────────

/** Bundle hashes change every build, so match on the stable name prefix. */
const island = (name: string) =>
  `astro-island[component-url^="/_astro/${name}."]`;

/** Astro drops the `ssr` attribute once the island has finished hydrating. */
const hydrated = (name: string) => `${island(name)}:not([ssr])`;

/**
 * Seed a dismissed cookie choice. The consent banner is position:fixed at the
 * bottom with z-index 9998, so if it renders it will intercept clicks on anything
 * beneath it — surfacing as "element intercepts pointer events" and looking exactly
 * like a broken island. Every check seeds this EXCEPT the CookieConsent one, which
 * needs a virgin localStorage to see the banner at all.
 */
function seedCookieConsent() {
  localStorage.setItem(
    "cookie_consent",
    JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
    }),
  );
}

// ── Checks ─────────────────────────────────────────────────────────

interface IslandCheck {
  name: string;
  route: string;
  /**
   * The island this check is for. The runner waits for it to finish hydrating
   * before calling assert(), so no individual check has to remember to — see the
   * :not([ssr]) note in the header. Forgetting that wait is the one mistake that
   * reintroduces an unfixable flake, so it is enforced here rather than trusted
   * to each check body.
   */
  island: string;
  /** False only for the CookieConsent check, which needs a virgin localStorage. */
  seedConsent: boolean;
  /** `root` is the selector for this island's hydrated <astro-island> wrapper. */
  assert: (page: Page, root: string) => Promise<void>;
}

const CHECKS: IslandCheck[] = [
  {
    name: "CookieConsent shows its banner and persists a choice",
    route: "/",
    island: "CookieConsent",
    seedConsent: false,
    async assert(page) {
      // This island renders null server-side; `visible` only flips inside a
      // useEffect. So the mere existence of this button proves Preact hydrated —
      // it cannot be present in the raw HTML. Presence IS the assertion.
      const accept = page.getByRole("button", { name: "Accept all" });
      await accept.click();
      await accept.waitFor({ state: "hidden" });

      const stored = await page.evaluate(() =>
        localStorage.getItem("cookie_consent"),
      );

      if (stored === null) {
        throw new Error(
          'clicking "Accept all" did not write cookie_consent to localStorage',
        );
      }
    },
  },
  {
    name: "FeatureTabsSlider switches tab on click",
    route: "/",
    island: "FeatureTabsSlider",
    seedConsent: true,
    async assert(page) {
      // SSR ships defaultIndex=3. The context forces reduced motion, and the
      // component guards BOTH its progress animation and its 9s autoplay timer
      // behind prefersReducedMotion — so the selected tab is frozen until we click.
      await page.waitForSelector('#adv-tab-3[aria-selected="true"]');

      await page.locator("#adv-tab-0").click();

      // Only an onClick handler can flip these. Autoplay is disabled, so nothing else can.
      await page.waitForSelector('#adv-tab-0[aria-selected="true"]');
      await page.waitForSelector('#adv-tab-3[aria-selected="false"]');
    },
  },
  {
    name: "LlmopsIndex loads its index and applies an industry facet",
    route: "/llmops-database",
    island: "LlmopsIndex",
    seedConsent: true,
    async assert(page, root) {
      // The SSR payload is only "Loading LLMOps database...". #llmops-search exists
      // solely after the island's /llmops-index.json fetch resolves, so this wait
      // proves the fetch landed and was served with a usable JSON content-type.
      await page.waitForSelector("#llmops-search", { timeout: NAV_TIMEOUT });

      const status = `${root} output[aria-live="polite"]`;
      const before = (await page.locator(status).innerText()).trim();

      // Deliberately NOT the search box: typing there triggers a 200ms debounce and
      // an async Pagefind wasm load. An industry facet is a pure synchronous
      // setState, so it is deterministic.
      await page
        .locator(`${root} aside button[aria-pressed="false"]:not([disabled])`)
        .first()
        .click();

      await page.waitForSelector(`${root} aside button[aria-pressed="true"]`);

      // The facet actually re-filtered, not just toggled its own styling.
      await page.waitForFunction(
        (args: { selector: string; before: string }) => {
          const element = document.querySelector<HTMLElement>(args.selector);
          return element !== null && element.innerText.trim() !== args.before;
        },
        { selector: status, before },
      );
    },
  },
  {
    name: "MlopsIndex loads its index and applies an industry facet",
    route: "/mlops-database",
    island: "MlopsIndex",
    seedConsent: true,
    async assert(page, root) {
      // Same shape as the LlmopsIndex check above — MlopsIndex is a separate
      // wiring of the same FilterIndex engine (its own data URL, its own
      // facet field names), so a broken prop on this page specifically would
      // not be caught by the LLMOps check.
      await page.waitForSelector("#mlops-search", { timeout: NAV_TIMEOUT });

      const status = `${root} output[aria-live="polite"]`;
      const before = (await page.locator(status).innerText()).trim();

      await page
        .locator(`${root} aside button[aria-pressed="false"]:not([disabled])`)
        .first()
        .click();

      await page.waitForSelector(`${root} aside button[aria-pressed="true"]`);

      await page.waitForFunction(
        (args: { selector: string; before: string }) => {
          const element = document.querySelector<HTMLElement>(args.selector);
          return element !== null && element.innerText.trim() !== args.before;
        },
        { selector: status, before },
      );
    },
  },
  {
    name: "IntegrationsIndex applies a type facet and a search query",
    route: "/integrations",
    island: "IntegrationsIndex",
    seedConsent: true,
    async assert(page, root) {
      // IntegrationsIndex is the "control" flavor of FilterIndex: the card
      // grid is plain Astro-rendered markup (see ControlFilterIndex's
      // TSDoc), and the island only toggles `display` on [data-slug] cards
      // by a shared attribute — there is no aria-live result count to read,
      // so the assertion is the visible-card count itself.
      const cardCount = () => page.locator("[data-slug]:visible").count();

      const before = await cardCount();
      if (before === 0) {
        throw new Error("no [data-slug] cards were visible before filtering");
      }

      await page
        .locator(`${root} aside button[aria-pressed="false"]:not([disabled])`)
        .first()
        .click();

      await page.waitForFunction(
        (n: number) =>
          document.querySelectorAll('[data-slug]:not([style*="display: none"])')
            .length !== n,
        before,
      );

      const afterFacet = await cardCount();
      if (afterFacet === 0 || afterFacet >= before) {
        throw new Error(
          `expected the type facet to narrow the grid below ${before} visible cards, got ${afterFacet}`,
        );
      }

      // A real query, not the facet: proves the search box is wired to the
      // same matching logic, independent of the facet click above. Clear
      // the facet first so the query is the only active filter.
      await page
        .locator(`${root} aside button[aria-pressed="true"]`)
        .first()
        .click();
      // Desktop-sized viewport (the default here), so the sidebar's search
      // box — not the mobile controls row's duplicate — is the visible one.
      await page
        .locator(`${root} #integrations-search-desktop`)
        .fill("kubernetes");

      await page.waitForFunction(() => {
        const card = document.querySelector('[data-slug="kubernetes"]');
        return card !== null && getComputedStyle(card).display !== "none";
      });

      const searchVisibleCount = await cardCount();
      if (searchVisibleCount !== 1) {
        throw new Error(
          `expected exactly 1 visible card for the "kubernetes" query, got ${searchVisibleCount}`,
        );
      }
    },
  },
  {
    name: "BlogIndex loads its index, applies a category facet, and searches",
    route: "/blog",
    island: "BlogIndex",
    seedConsent: true,
    async assert(page, root) {
      // Same DataFilterIndex shape as LlmopsIndex/MlopsIndex, fetching
      // /blog/search-index.json instead of a *-index.json endpoint.
      await page.waitForSelector("#blog-search", { timeout: NAV_TIMEOUT });

      const status = `${root} output[aria-live="polite"]`;
      const before = (await page.locator(status).innerText()).trim();

      await page
        .locator(`${root} aside button[aria-pressed="false"]:not([disabled])`)
        .first()
        .click();

      await page.waitForSelector(`${root} aside button[aria-pressed="true"]`);

      await page.waitForFunction(
        (args: { selector: string; before: string }) => {
          const element = document.querySelector<HTMLElement>(args.selector);
          return element !== null && element.innerText.trim() !== args.before;
        },
        { selector: status, before },
      );

      // A search interaction, independent of the facet click above: clear
      // the facet, then search for a string no post title/excerpt contains.
      // A real word risks matching most posts and leaving the count
      // unchanged (a false pass); a guaranteed-zero query deterministically
      // proves the search box re-filters (and exercises the zero-results
      // empty state as a bonus).
      await page
        .locator(`${root} aside button[aria-pressed="true"]`)
        .first()
        .click();

      const afterClear = (await page.locator(status).innerText()).trim();
      await page.locator("#blog-search").fill("zzzznonexistentqueryzzzz");

      await page.waitForFunction(
        (args: { selector: string; before: string }) => {
          const element = document.querySelector<HTMLElement>(args.selector);
          return element !== null && element.innerText.trim() !== args.before;
        },
        { selector: status, before: afterClear },
      );
    },
  },
  {
    name: "ContactForm validates client-side instead of doing a native POST",
    route: "/signup-for-demo",
    island: "ContactForm",
    seedConsent: true,
    async assert(page, root) {
      // The form is <form noValidate method="POST" action="/api/forms/...">.
      // Un-hydrated, this submit does a native POST and navigates away. Hydrated,
      // handleSubmit calls preventDefault() and renders inline errors. Two outcomes
      // that cannot be confused for one another.
      await page.locator(`${root} button[type="submit"]`).click();

      await page
        .getByText("Full name is required", { exact: true })
        .waitFor({ state: "visible" });

      const { pathname } = new URL(page.url());

      if (pathname !== "/signup-for-demo") {
        throw new Error(
          `the form did a native POST navigation (now at ${pathname}) — preventDefault() never ran`,
        );
      }
    },
  },
  {
    name: "TwoDoors switches its importer tab on click",
    route: "/product/kitaru#two-doors",
    island: "TwoDoors",
    seedConsent: true,
    async assert(page) {
      // Every island on /product/kitaru is client:visible, so nothing hydrates
      // until it scrolls into view — the #two-doors hash lands the section in
      // the viewport on load, which is what arms the runner's hydration gate.
      // SSR ships the first importer tab selected; only an onClick can move it.
      const tab = (id: string) => `#two-doors-import-tab-${id}`;
      await page.waitForSelector(`${tab("langfuse")}[aria-selected="true"]`);

      await page.locator(tab("phoenix")).click();

      await page.waitForSelector(`${tab("phoenix")}[aria-selected="true"]`);
      const panelContent = await page.textContent("#two-doors-import-panel");
      if (!panelContent?.includes("phoenix-traces.jsonl")) {
        throw new Error(
          "clicking Arize Phoenix tab did not update the import panel content",
        );
      }

      await page.locator(tab("phoenix")).press("ArrowRight");
      await page.waitForSelector(
        `${tab("kitaru-jsonl")}[aria-selected="true"]:focus`,
      );
    },
  },
];

// ── Runner ─────────────────────────────────────────────────────────

/** One attempt in a fresh, hermetic context. Returns null on success. */
async function attempt(
  browser: Browser,
  baseUrl: string,
  spec: IslandCheck,
): Promise<string | null> {
  const context = await browser.newContext({
    // Disables FeatureTabsSlider's 9s autoplay at the source.
    reducedMotion: "reduce",
  });

  // Hermetic: nothing leaves the machine. Kills the Cloudflare Turnstile widget,
  // the third-party analytics tag and assets.zenml.io images. None are load-bearing
  // for hydration, and all three are potential CI flakes. (Aborting Turnstile is
  // safe: handleSubmit calls validateForm before ever touching window.turnstile.)
  await context.route("**/*", (route) =>
    route.request().url().startsWith(baseUrl)
      ? route.continue()
      : route.abort(),
  );

  if (spec.seedConsent) {
    await context.addInitScript(seedCookieConsent);
  }

  const page = await context.newPage();
  page.setDefaultTimeout(ACTION_TIMEOUT);

  // Diagnostic only — never a failure on its own. See the header comment.
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  try {
    await page.goto(`${baseUrl}${spec.route}`, {
      waitUntil: "domcontentloaded",
      timeout: NAV_TIMEOUT,
    });

    // THE gate. Astro removes the `ssr` attribute once the island has hydrated, and
    // a click dispatched before that is silently discarded — no listener exists yet,
    // and no retry can recover it. Doing this here rather than in each assert() means
    // a new check cannot forget it. If this times out, the island never came alive:
    // that IS the failure this script exists to report.
    await page.waitForSelector(hydrated(spec.island), { timeout: NAV_TIMEOUT });

    await spec.assert(page, island(spec.island));
    return null;
  } catch (error) {
    const message = (error as Error).message.split("\n")[0];
    return pageErrors.length > 0
      ? `${message} [page error: ${pageErrors[0]}]`
      : message;
  } finally {
    await context.close();
  }
}

async function check(): Promise<number> {
  if (!existsSync(DIST)) {
    console.error("✗ dist/client not found");
    console.error("  Fix: run `pnpm build` before `pnpm check:islands`.");
    return 1;
  }

  const server = await startStaticServer();
  let browser: Browser;

  try {
    browser = await chromium.launch({ channel: "chromium-headless-shell" });
  } catch (error) {
    await server.close();
    console.error(
      `✗ could not launch Chromium: ${(error as Error).message.split("\n")[0]}`,
    );
    console.error("  Fix: run `pnpm exec playwright install chromium`.");
    return 1;
  }

  console.log(
    `Checking island hydration against ${server.baseUrl} (dist/client)`,
  );

  const violations: string[] = [];

  for (const spec of CHECKS) {
    // Retry once, in a fresh context — the cheapest possible stand-in for a test
    // runner's retries. The gates above make a genuine flake unlikely; this just
    // absorbs a transient browser hiccup.
    let failure = await attempt(browser, server.baseUrl, spec);

    if (failure !== null) {
      failure = await attempt(browser, server.baseUrl, spec);
    }

    if (failure === null) {
      console.log(`  ✓ ${spec.route} — ${spec.name}`);
    } else {
      console.log(`  ✗ ${spec.route} — ${spec.name}`);
      violations.push(`${spec.route} — ${spec.name}: ${failure}`);
    }
  }

  await browser.close();
  await server.close();

  if (violations.length > 0) {
    console.error("");

    for (const violation of violations) {
      console.error(`  ${violation}`);
    }

    const unresolved = [...new Set(server.missing)];

    if (unresolved.length > 0) {
      console.error(
        `\n  Requests the dist server could not resolve: ${unresolved.join(", ")}`,
      );
    }

    console.error(`\n✗ ${violations.length} island check(s) failed`);
    console.error(
      "  Fix: open the route with `pnpm dev`, look for a hydration error in the browser",
    );
    console.error(
      "       console, and confirm the component still carries its `client:*` directive.",
    );
    return 1;
  }

  console.log(
    `\n✓ ${CHECKS.length} island checks passed — the Preact islands hydrate`,
  );
  return 0;
}

process.exit(await check());
