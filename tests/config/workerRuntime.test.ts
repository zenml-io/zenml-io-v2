import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  findMissingRequiredSecrets,
  REQUIRED_WORKER_SECRETS,
} from "../../scripts/check-worker-bindings";

type WranglerConfig = {
  name?: string;
  main?: string;
  compatibility_date?: string;
  compatibility_flags?: string[];
  workers_dev?: boolean;
  preview_urls?: boolean;
  routes?: unknown[];
  route?: unknown;
  assets?: {
    directory?: string;
    binding?: string;
    html_handling?: string;
    not_found_handling?: string;
    run_worker_first?: boolean | string[];
  };
  secrets?: {
    required?: string[];
  };
};

const config = JSON.parse(
  readFileSync("wrangler.jsonc", "utf8"),
) as WranglerConfig;

describe("Astro 5 Worker configuration", () => {
  it("runs the generated adapter entrypoint with the live compatibility settings", () => {
    expect(config).toMatchObject({
      name: "zenml-io-v2-worker",
      main: "dist/_worker.js/index.js",
      compatibility_date: "2026-02-10",
      compatibility_flags: ["nodejs_compat"],
      workers_dev: false,
      preview_urls: false,
    });
    expect(config.route).toBeUndefined();
    expect(config.routes).toBeUndefined();
  });

  it("serves static output before the Worker except for API routes", () => {
    expect(config.assets).toEqual({
      directory: "./dist",
      binding: "ASSETS",
      html_handling: "drop-trailing-slash",
      not_found_handling: "404-page",
      run_worker_first: ["/api/*"],
    });
  });

  it("declares the production form secrets without values", () => {
    expect(REQUIRED_WORKER_SECRETS).toEqual([
      "TURNSTILE_SECRET_KEY",
      "SEGMENT_FORMS_WRITE_KEY",
    ]);
    expect(config.secrets?.required).toEqual(REQUIRED_WORKER_SECRETS);
  });
});

describe("Worker version binding guard", () => {
  it("accepts version metadata containing both required secret bindings", () => {
    expect(
      findMissingRequiredSecrets({
        resources: {
          bindings: REQUIRED_WORKER_SECRETS.map((name) => ({
            name,
            type: "secret_text",
          })),
        },
      }),
    ).toEqual([]);
  });

  it.each(REQUIRED_WORKER_SECRETS)(
    "rejects metadata when %s is absent",
    (missingSecret) => {
      expect(
        findMissingRequiredSecrets({
          resources: {
            bindings: REQUIRED_WORKER_SECRETS.filter(
              (name) => name !== missingSecret,
            ).map((name) => ({ name, type: "secret_text" })),
          },
        }),
      ).toEqual([missingSecret]);
    },
  );

  it("rejects a required binding with the wrong type", () => {
    expect(
      findMissingRequiredSecrets({
        resources: {
          bindings: [
            { name: "TURNSTILE_SECRET_KEY", type: "secret_text" },
            { name: "SEGMENT_FORMS_WRITE_KEY", type: "plain_text" },
          ],
        },
      }),
    ).toEqual(["SEGMENT_FORMS_WRITE_KEY"]);
  });
});
