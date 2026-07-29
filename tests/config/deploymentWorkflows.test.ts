import { execFileSync } from "node:child_process";
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { REQUIRED_WORKER_SECRETS } from "../../scripts/check-worker-bindings";

interface WorkflowStep {
  "continue-on-error"?: boolean;
  env?: Record<string, string>;
  name: string;
  run?: string;
}

interface ProductionWorkflow {
  jobs: Record<
    string,
    {
      steps: WorkflowStep[];
    }
  >;
}

const deployWorkflow = readFileSync(".github/workflows/deploy.yml", "utf8");
const previewWorkflow = readFileSync(
  ".github/workflows/upload-worker-preview.yml",
  "utf8",
);
const candidateWorkflow = readFileSync(
  ".github/workflows/upload-worker-candidate.yml",
  "utf8",
);
const activationWorkflow = readFileSync(
  ".github/workflows/activate-worker.yml",
  "utf8",
);
const releaseWorkflow = readFileSync(
  ".github/workflows/release-worker.yml",
  "utf8",
);
const candidateWorkflowConfig = parse(candidateWorkflow) as ProductionWorkflow;
const activationWorkflowConfig = parse(
  activationWorkflow,
) as ProductionWorkflow;
const releaseWorkflowConfig = parse(releaseWorkflow) as ProductionWorkflow;
const candidateSteps = candidateWorkflowConfig.jobs["upload-candidate"].steps;
const activationSteps = activationWorkflowConfig.jobs.activate.steps;
const releaseUploadSteps = releaseWorkflowConfig.jobs.upload.steps;
const releaseActivationSteps = releaseWorkflowConfig.jobs.activate.steps;
const releaseRecoverySteps = releaseWorkflowConfig.jobs.recover.steps;
const allWorkflows = readdirSync(".github/workflows")
  .filter((filename) => filename.endsWith(".yml"))
  .map(
    (filename) =>
      [
        filename,
        readFileSync(join(".github/workflows", filename), "utf8"),
      ] as const,
  );

function actionReferences(workflow: string): string[] {
  return [...workflow.matchAll(/^\s*uses:\s*([^\s#]+)(?:\s+#.*)?\s*$/gm)].map(
    ([, reference]) => reference,
  );
}

function expectArtifactGuards(workflow: string): void {
  expect(workflow).toContain("Reject unsafe Worker artifact");
  expect(workflow).toContain("(^/|(^|/)\\.\\.(/|$))");
  expect(workflow).toContain("contains a link or special file");
  expect(workflow).toContain(
    'tar -tzf worker-dist.tar.gz > "$RUNNER_TEMP/archive-paths.txt"',
  );
  expect(workflow).toContain(
    "grep -Eq '(^/|(^|/)\\.\\.(/|$))' \"$RUNNER_TEMP/archive-paths.txt\"",
  );
  expect(workflow).toContain(
    'tar -tvzf worker-dist.tar.gz > "$RUNNER_TEMP/archive-members.txt"',
  );
  expect(workflow).toContain('done < "$RUNNER_TEMP/archive-members.txt"');
  expect(workflow).not.toContain("tar -tzf worker-dist.tar.gz |");
  expect(workflow).toContain("(.route == null)");
  expect(workflow).toContain("(.routes == null)");
  expect(workflow).toContain("(.build == null)");
  expect(workflow).toContain("keys - [");
  expect(workflow).toContain(".artifact_sha256 == $artifact_sha256");
}

function expectNoRouteOrDnsMutation(workflow: string): void {
  expect(workflow).not.toContain("wrangler deploy ");
  expect(workflow).not.toContain("wrangler route");
  expect(workflow).not.toContain("wrangler routes");
  expect(workflow).not.toContain("wrangler dns");
  expect(workflow).not.toContain("cloudflare/wrangler-action@");
}

function workflowStep(steps: WorkflowStep[], name: string): WorkflowStep {
  const step = steps.find((candidate) => candidate.name === name);
  expect(step, `missing workflow step: ${name}`).toBeDefined();
  return step as WorkflowStep;
}

function withTemporaryHarness<T>(
  prefix: string,
  run: (directory: string, binDirectory: string) => T,
): T {
  const directory = mkdtempSync(join(tmpdir(), prefix));
  const binDirectory = join(directory, "bin");
  mkdirSync(binDirectory);
  try {
    return run(directory, binDirectory);
  } finally {
    rmSync(directory, { force: true, recursive: true });
  }
}

function executeReleaseTrap(
  shouldFail: boolean,
  activeVersion = "22222222-2222-2222-2222-222222222222",
  deploymentReadFailures = 0,
  rollbackDeployFailures = 0,
  operatorVersionAfterDeployAttempt = "",
): {
  deploymentReadCalls: number;
  error: unknown;
  stderr: string;
  wranglerCalls: string[];
} {
  const releaseStep = workflowStep(
    releaseActivationSteps,
    "Activate, smoke-test, and roll back on failure",
  );
  const run = releaseStep.run ?? "";
  const functionsStart = run.indexOf("active_version() {");
  const functionsEnd = run.indexOf("trap rollback_previous_version ERR");
  expect(functionsStart).toBeGreaterThan(-1);
  expect(functionsEnd).toBeGreaterThan(functionsStart);
  const functions = run.slice(functionsStart, functionsEnd);

  return withTemporaryHarness(
    "worker-release-rollback-",
    (harnessDirectory, binDirectory) => {
      const activeVersionFile = join(harnessDirectory, "active-version.txt");
      const callsFile = join(harnessDirectory, "wrangler-calls.txt");
      writeFileSync(activeVersionFile, `${activeVersion}\n`);
      writeFileSync(callsFile, "");
      writeFileSync(
        join(binDirectory, "wrangler"),
        `#!/usr/bin/env bash
set -euo pipefail
printf '%s\\n' "$*" >> "$WRANGLER_CALLS_FILE"
if [ "$1 $2" = "deployments list" ]; then
  read_calls="$(grep -c '^deployments list ' "$WRANGLER_CALLS_FILE" || true)"
  if [ "$read_calls" -le "$DEPLOYMENT_READ_FAILURES" ]; then
    exit 1
  fi
  version_id="$(cat "$ACTIVE_VERSION_FILE")"
  printf '[{"created_on":"2026-07-29T00:00:00Z","versions":[{"version_id":"%s","percentage":100}]}]\\n' "$version_id"
  exit 0
fi
if [ "$1 $2" = "versions deploy" ]; then
  deploy_calls="$(grep -c '^versions deploy ' "$WRANGLER_CALLS_FILE" || true)"
  if
    [ -n "$OPERATOR_VERSION_AFTER_DEPLOY_ATTEMPT" ] &&
    [ "$deploy_calls" -eq 1 ]
  then
    printf '%s\\n' "$OPERATOR_VERSION_AFTER_DEPLOY_ATTEMPT" \
      > "$ACTIVE_VERSION_FILE"
  fi
  if [ "$deploy_calls" -le "$ROLLBACK_DEPLOY_FAILURES" ]; then
    exit 1
  fi
  printf '%s\\n' "$PREVIOUS_VERSION_ID" > "$ACTIVE_VERSION_FILE"
  exit 0
fi
exit 2
`,
      );
      chmodSync(join(binDirectory, "wrangler"), 0o755);
      writeFileSync(
        join(binDirectory, "curl"),
        "#!/usr/bin/env bash\nprintf '200\\n'\n",
      );
      chmodSync(join(binDirectory, "curl"), 0o755);
      writeFileSync(
        join(binDirectory, "sleep"),
        "#!/usr/bin/env bash\nexit 0\n",
      );
      chmodSync(join(binDirectory, "sleep"), 0o755);

      const script = `
set -Eeuo pipefail
worker_name="zenml-io-v2-worker"
activation_attempted=true
${functions}
trap rollback_previous_version ERR
${shouldFail ? "false" : ":"}
`;
      let error: unknown;
      let stderr = "";
      try {
        execFileSync("bash", ["-c", script], {
          env: {
            ...process.env,
            ACTIVE_VERSION_FILE: activeVersionFile,
            CANDIDATE_VERSION_ID: "22222222-2222-2222-2222-222222222222",
            DEPLOYMENT_READ_FAILURES: String(deploymentReadFailures),
            OPERATOR_VERSION_AFTER_DEPLOY_ATTEMPT:
              operatorVersionAfterDeployAttempt,
            PATH: `${binDirectory}:${process.env.PATH ?? ""}`,
            PREVIOUS_VERSION_ID: "11111111-1111-1111-1111-111111111111",
            ROLLBACK_DEPLOY_FAILURES: String(rollbackDeployFailures),
            RUNNER_TEMP: harnessDirectory,
            WRANGLER_CALLS_FILE: callsFile,
          },
          stdio: ["ignore", "pipe", "pipe"],
        });
      } catch (caught) {
        error = caught;
        const commandError = caught as { stderr?: Buffer | string };
        stderr = commandError.stderr?.toString() ?? "";
      }
      const wranglerCalls = readFileSync(callsFile, "utf8")
        .trim()
        .split("\n")
        .filter(Boolean);
      const deploymentReadCalls = wranglerCalls.filter((call) =>
        call.startsWith("deployments list "),
      ).length;
      return { deploymentReadCalls, error, stderr, wranglerCalls };
    },
  );
}

function executeStatusRetry(): { curlCalls: number; error: unknown } {
  const releaseStep = workflowStep(
    releaseActivationSteps,
    "Activate, smoke-test, and roll back on failure",
  );
  const run = releaseStep.run ?? "";
  const functionStart = run.indexOf("expect_status() {");
  const functionEnd = run.indexOf('expect_status 200 "https://www.zenml.io/"');
  expect(functionStart).toBeGreaterThan(-1);
  expect(functionEnd).toBeGreaterThan(functionStart);
  const expectStatusFunction = run.slice(functionStart, functionEnd);

  return withTemporaryHarness(
    "worker-release-smoke-",
    (harnessDirectory, binDirectory) => {
      const callsFile = join(harnessDirectory, "curl-calls.txt");
      writeFileSync(callsFile, "0\n");
      writeFileSync(
        join(binDirectory, "curl"),
        `#!/usr/bin/env bash
set -euo pipefail
calls="$(cat "$CURL_CALLS_FILE")"
calls=$((calls + 1))
printf '%s\\n' "$calls" > "$CURL_CALLS_FILE"
if [ "$calls" -eq 1 ]; then
  exit 7
fi
printf '200\\n'
`,
      );
      chmodSync(join(binDirectory, "curl"), 0o755);

      let error: unknown;
      try {
        execFileSync(
          "bash",
          [
            "-c",
            `set -Eeuo pipefail
${expectStatusFunction}
expect_status 200 "https://www.zenml.io/" retry-test
`,
          ],
          {
            env: {
              ...process.env,
              CURL_CALLS_FILE: callsFile,
              PATH: `${binDirectory}:${process.env.PATH ?? ""}`,
              RUNNER_TEMP: harnessDirectory,
            },
            stdio: ["ignore", "pipe", "pipe"],
          },
        );
      } catch (caught) {
        error = caught;
      }
      const curlCalls = Number.parseInt(readFileSync(callsFile, "utf8"), 10);
      return { curlCalls, error };
    },
  );
}

function executeRecovery(
  initialVersion: string,
  deployFailures: number,
  homeStatus: number,
  deploymentReadFailures = 0,
  operatorVersionAfterDeployAttempt = "",
  finalVerification: {
    activeVersion?: string;
    readFails?: boolean;
  } = {},
): {
  deployCalls: number;
  deploymentReadCalls: number;
  error: unknown;
  stderr: string;
} {
  const recoveryStep = workflowStep(
    releaseRecoverySteps,
    "Reconcile and recover previous version",
  );
  const run = recoveryStep.run ?? "";
  return withTemporaryHarness(
    "worker-recovery-",
    (harnessDirectory, binDirectory) => {
      const activeVersionFile = join(harnessDirectory, "active-version.txt");
      const deployCallsFile = join(harnessDirectory, "deploy-calls.txt");
      const deploymentReadCallsFile = join(
        harnessDirectory,
        "deployment-read-calls.txt",
      );
      const failDeploymentReadsFile = join(
        harnessDirectory,
        "fail-deployment-reads",
      );
      writeFileSync(activeVersionFile, `${initialVersion}\n`);
      writeFileSync(deployCallsFile, "0\n");
      writeFileSync(deploymentReadCallsFile, "0\n");
      writeFileSync(
        join(binDirectory, "wrangler"),
        `#!/usr/bin/env bash
set -euo pipefail
if [ "$1 $2" = "deployments list" ]; then
  calls="$(cat "$DEPLOYMENT_READ_CALLS_FILE")"
  calls=$((calls + 1))
  printf '%s\\n' "$calls" > "$DEPLOYMENT_READ_CALLS_FILE"
  if [ -f "$FAIL_DEPLOYMENT_READS_FILE" ]; then
    exit 1
  fi
  if [ "$calls" -le "$DEPLOYMENT_READ_FAILURES" ]; then
    exit 1
  fi
  active_version="$(cat "$ACTIVE_VERSION_FILE")"
  printf '[{"created_on":"2026-07-29T00:00:00Z","versions":[{"version_id":"%s","percentage":100}]}]\\n' "$active_version"
  exit 0
fi
if [ "$1 $2" = "versions deploy" ]; then
  calls="$(cat "$DEPLOY_CALLS_FILE")"
  calls=$((calls + 1))
  printf '%s\\n' "$calls" > "$DEPLOY_CALLS_FILE"
  if
    [ -n "$OPERATOR_VERSION_AFTER_DEPLOY_ATTEMPT" ] &&
    [ "$calls" -eq 1 ]
  then
    printf '%s\\n' "$OPERATOR_VERSION_AFTER_DEPLOY_ATTEMPT" \
      > "$ACTIVE_VERSION_FILE"
  fi
  if [ "$calls" -le "$DEPLOY_FAILURES" ]; then
    exit 1
  fi
  printf '%s\\n' "$PREVIOUS_VERSION_ID" > "$ACTIVE_VERSION_FILE"
  exit 0
fi
exit 2
`,
      );
      chmodSync(join(binDirectory, "wrangler"), 0o755);
      writeFileSync(
        join(binDirectory, "curl"),
        `#!/usr/bin/env bash
set -euo pipefail
if [ -n "$FINAL_ACTIVE_VERSION" ]; then
  printf '%s\\n' "$FINAL_ACTIVE_VERSION" > "$ACTIVE_VERSION_FILE"
fi
if [ "$FINAL_DEPLOYMENT_READ_FAILS" = "true" ]; then
  touch "$FAIL_DEPLOYMENT_READS_FILE"
fi
printf '%s\\n' "$RECOVERY_HOME_STATUS"
`,
      );
      chmodSync(join(binDirectory, "curl"), 0o755);
      writeFileSync(
        join(binDirectory, "sleep"),
        "#!/usr/bin/env bash\nexit 0\n",
      );
      chmodSync(join(binDirectory, "sleep"), 0o755);

      let error: unknown;
      let stderr = "";
      try {
        execFileSync("bash", ["-c", run], {
          env: {
            ...process.env,
            ACTIVE_VERSION_FILE: activeVersionFile,
            CANDIDATE_VERSION_ID: "22222222-2222-2222-2222-222222222222",
            DEPLOY_CALLS_FILE: deployCallsFile,
            DEPLOY_FAILURES: String(deployFailures),
            DEPLOYMENT_READ_CALLS_FILE: deploymentReadCallsFile,
            DEPLOYMENT_READ_FAILURES: String(deploymentReadFailures),
            FAIL_DEPLOYMENT_READS_FILE: failDeploymentReadsFile,
            FINAL_ACTIVE_VERSION: finalVerification.activeVersion ?? "",
            FINAL_DEPLOYMENT_READ_FAILS: String(
              finalVerification.readFails ?? false,
            ),
            OPERATOR_VERSION_AFTER_DEPLOY_ATTEMPT:
              operatorVersionAfterDeployAttempt,
            PATH: `${binDirectory}:${process.env.PATH ?? ""}`,
            PREVIOUS_VERSION_ID: "11111111-1111-1111-1111-111111111111",
            RECOVERY_HOME_STATUS: String(homeStatus),
            RUNNER_TEMP: harnessDirectory,
            WORKER_NAME: "zenml-io-v2-worker",
          },
          stdio: ["ignore", "pipe", "pipe"],
        });
      } catch (caught) {
        error = caught;
        const commandError = caught as { stderr?: Buffer | string };
        stderr = commandError.stderr?.toString() ?? "";
      }
      const deployCalls = Number.parseInt(
        readFileSync(deployCallsFile, "utf8"),
        10,
      );
      const deploymentReadCalls = Number.parseInt(
        readFileSync(deploymentReadCallsFile, "utf8"),
        10,
      );
      return { deployCalls, deploymentReadCalls, error, stderr };
    },
  );
}

function jqProgramReadingFrom(run: string, source: string): string {
  const destination = `' ${source} > /dev/null`;
  const destinationIndex = run.indexOf(destination);
  expect(destinationIndex, `missing jq source for ${source}`).toBeGreaterThan(
    -1,
  );
  const commandPrefix = run.slice(0, destinationIndex);
  const commandIndex = commandPrefix.lastIndexOf("jq -e");
  expect(commandIndex, `missing jq command for ${source}`).toBeGreaterThan(-1);
  const programStart = commandPrefix.indexOf("'", commandIndex);
  expect(programStart, `missing jq program for ${source}`).toBeGreaterThan(-1);
  return commandPrefix.slice(programStart + 1);
}

function expectJqResult(
  program: string,
  input: unknown,
  succeeds: boolean,
  args: string[] = [],
): void {
  const execute = () =>
    execFileSync("jq", ["-e", ...args, program], {
      input: JSON.stringify(input),
      stdio: ["pipe", "pipe", "pipe"],
    });

  if (succeeds) {
    expect(execute).not.toThrow();
  } else {
    expect(execute).toThrow();
  }
}

function expectPrivateWorkerPredicates(
  run: string,
  sources: {
    domains: string;
    routes: string;
    subdomain: string;
  },
): void {
  const subdomainProgram = jqProgramReadingFrom(run, sources.subdomain);
  const routesProgram = jqProgramReadingFrom(run, sources.routes);
  const domainsProgram = jqProgramReadingFrom(run, sources.domains);
  const workerArgs = ["--arg", "worker", "zenml-io-v2-worker"];

  expectJqResult(
    subdomainProgram,
    {
      result: { enabled: false, previews_enabled: false },
      success: true,
    },
    true,
  );
  expectJqResult(
    subdomainProgram,
    {
      result: { enabled: true, previews_enabled: false },
      success: true,
    },
    false,
  );

  expectJqResult(
    routesProgram,
    {
      result: [{ id: "zenml-io-v2-worker", routes: [] }],
      success: true,
    },
    true,
    workerArgs,
  );
  expectJqResult(
    routesProgram,
    {
      result: [
        {
          id: "zenml-io-v2-worker",
          routes: ["www.zenml.io/*"],
        },
      ],
      success: true,
    },
    false,
    workerArgs,
  );

  expectJqResult(
    domainsProgram,
    {
      result: [],
      result_info: { total_count: 0 },
      success: true,
    },
    true,
    workerArgs,
  );
  expectJqResult(
    domainsProgram,
    {
      result: [
        {
          hostname: "www.zenml.io",
          service: "zenml-io-v2-worker",
        },
      ],
      result_info: { total_count: 1 },
      success: true,
    },
    false,
    workerArgs,
  );
}

function expectAcceptedWorkerRoutePredicate(run: string, source: string): void {
  const program = jqProgramReadingFrom(run, source);
  const acceptedRoutes = ["www.zenml.io/*", "astro-workers-staging.zenml.io/*"];
  const workerArgs = [
    "--arg",
    "worker",
    "zenml-io-v2-worker",
    "--argjson",
    "accepted_routes",
    JSON.stringify(acceptedRoutes),
  ];

  expectJqResult(
    program,
    {
      result: [
        {
          id: "zenml-io-v2-worker",
          routes: acceptedRoutes,
        },
      ],
      success: true,
    },
    true,
    workerArgs,
  );
  expectJqResult(
    program,
    {
      result: [
        {
          id: "zenml-io-v2-worker",
          routes: acceptedRoutes.map((pattern) => ({
            pattern,
            script: "zenml-io-v2-worker",
          })),
        },
      ],
      success: true,
    },
    true,
    workerArgs,
  );
  expectJqResult(
    program,
    {
      result: [
        {
          id: "zenml-io-v2-worker",
          routes: acceptedRoutes.map((pattern) => ({
            pattern,
            script: "another-worker",
          })),
        },
      ],
      success: true,
    },
    false,
    workerArgs,
  );
  expectJqResult(
    program,
    {
      result: [
        {
          id: "zenml-io-v2-worker",
          routes: ["www.zenml.io/*"],
        },
      ],
      success: true,
    },
    false,
    workerArgs,
  );
  expectJqResult(
    program,
    {
      result: [
        {
          id: "zenml-io-v2-worker",
          routes: [...acceptedRoutes, "unexpected.zenml.io/*"],
        },
      ],
      success: true,
    },
    false,
    workerArgs,
  );
}

function expectSecretBindingPredicate(program: string): void {
  expectJqResult(
    program,
    {
      resources: {
        bindings: [
          { name: "TURNSTILE_SECRET_KEY", type: "secret_text" },
          { name: "SEGMENT_FORMS_WRITE_KEY", type: "secret_text" },
        ],
      },
    },
    true,
  );
  expectJqResult(
    program,
    {
      resources: {
        bindings: [{ name: "TURNSTILE_SECRET_KEY", type: "secret_text" }],
      },
    },
    false,
  );
  expectJqResult(
    program,
    {
      resources: {
        bindings: [
          { name: "TURNSTILE_SECRET_KEY", type: "secret_text" },
          { name: "SEGMENT_FORMS_WRITE_KEY", type: "plain_text" },
        ],
      },
    },
    false,
  );
}

describe("credential-free Worker artifact workflow", () => {
  it("keeps Repo checks as the required gate", () => {
    expect(deployWorkflow).toContain("name: Repo checks");
    expect(deployWorkflow).toContain("permissions:\n      contents: read");
    expect(deployWorkflow).toContain("timeout-minutes: 30");
    expect(deployWorkflow).toContain("pnpm check:worker");
  });

  it("builds once and publishes the exact validated artifact", () => {
    expect(deployWorkflow.match(/run:\s*pnpm build/g)).toHaveLength(1);
    expect(deployWorkflow).toContain("worker-dist.tar.gz");
    expect(deployWorkflow).toContain("worker-dist.sha256");
    expect(deployWorkflow).toContain("worker-manifest.json");
    expect(deployWorkflow).toContain("actions/upload-artifact@");
  });

  it("has no Cloudflare credentials or deployment command", () => {
    expect(deployWorkflow).not.toContain("${{ secrets.");
    expect(deployWorkflow).not.toContain("wrangler versions upload");
    expect(deployWorkflow).not.toContain("wrangler versions deploy");
    expect(deployWorkflow).not.toContain("wrangler pages deploy");
  });
});

describe("trusted Worker preview uploader", () => {
  it("requires an explicit trusted-main dispatch for an exact eligible artifact", () => {
    expect(previewWorkflow).toContain("workflow_dispatch:");
    expect(previewWorkflow).not.toContain("workflow_run:");
    expect(previewWorkflow).not.toContain("pull_request:");
    expect(previewWorkflow).not.toContain("push:");
    expect(previewWorkflow).toContain("github.ref == 'refs/heads/main'");
    expect(previewWorkflow).toContain("inputs.pr_number");
    expect(previewWorkflow).toContain("inputs.source_run_id");
    expect(previewWorkflow).toContain("inputs.source_branch");
    expect(previewWorkflow).toContain("inputs.source_commit");
    expect(previewWorkflow).toContain("inputs.artifact_sha256");
    expect(previewWorkflow).toContain("inputs.self_reviewed");
    expect(previewWorkflow).toContain("actions/download-artifact@");
    expect(previewWorkflow).toContain(".head.sha == $commit");
    expect(previewWorkflow).toContain("$commit == $trusted_commit");
    expect(previewWorkflow).toContain("cancel-in-progress: false");
  });

  it("does not execute branch-controlled build or package scripts", () => {
    expect(previewWorkflow).not.toContain("pnpm install");
    expect(previewWorkflow).not.toContain("pnpm build");
    expect(previewWorkflow).not.toContain("pnpm ");
    expect(previewWorkflow).toContain("npm install --global wrangler@4.110.0");
    expect(previewWorkflow).toContain("Reject an unsafe Worker artifact");
    expect(previewWorkflow).toContain(".preview_urls == false");
    expect(previewWorkflow).toContain("sha256sum --check");
  });

  it("uses isolated preview credentials and never activates a version", () => {
    expect(previewWorkflow).toContain(
      "secrets.CLOUDFLARE_WORKERS_PREVIEW_TOKEN",
    );
    expect(previewWorkflow).toContain(
      "secrets.WORKERS_PREVIEW_TURNSTILE_SECRET_KEY",
    );
    expect(previewWorkflow).toContain(
      "secrets.WORKERS_PREVIEW_SEGMENT_FORMS_WRITE_KEY",
    );
    expect(previewWorkflow).toContain("zenml-io-v2-worker-preview");
    expect(previewWorkflow).toContain("wrangler versions upload");
    expect(previewWorkflow).toContain("WRANGLER_OUTPUT_FILE_PATH");
    expect(previewWorkflow).not.toContain("--preview-alias");
    expect(previewWorkflow).not.toContain("wrangler versions deploy");
    expectNoRouteOrDnsMutation(previewWorkflow);
    expect(previewWorkflow).not.toContain(
      "secrets.CLOUDFLARE_WORKERS_PRODUCTION_TOKEN",
    );
  });
});

describe("trusted production candidate uploader", () => {
  it("is manual, main-defined, and tied to an exact successful CI run", () => {
    expect(candidateWorkflow).toContain("workflow_dispatch:");
    expect(candidateWorkflow).not.toContain("pull_request:");
    expect(candidateWorkflow).not.toContain("push:");
    expect(candidateWorkflow).toContain("github.ref == 'refs/heads/main'");
    expect(candidateWorkflow).toContain("timeout-minutes: 15");
    expect(candidateWorkflow).toContain("group: zenml-io-worker-production");
    expect(candidateWorkflow).toContain("cancel-in-progress: false");
    expect(candidateWorkflow).toContain("inputs.source_run_id");
    expect(candidateWorkflow).toContain("inputs.source_commit");
    expect(candidateWorkflow).toContain("inputs.source_branch");
    expect(candidateWorkflow).toContain(
      ".head_repository.full_name == $repository",
    );
    expect(candidateWorkflow).toContain(
      'git check-ref-format --branch "$SOURCE_BRANCH"',
    );
    expect(candidateWorkflow).toContain("actions/download-artifact@");
    expect(candidateWorkflow).toContain("sha256sum --check worker-dist.sha256");
    expect(candidateWorkflow).toContain(
      '.path == ".github/workflows/deploy.yml"',
    );
    expect(candidateWorkflow).toContain(
      "contents/.github/workflows/deploy.yml?ref=$SOURCE_COMMIT",
    );
    expect(candidateWorkflow).toContain(
      'source_workflow_blob" != "$trusted_workflow_blob',
    );
  });

  it("uploads an inactive version with public previews disabled", () => {
    expect(candidateWorkflow).toContain(
      "secrets.CLOUDFLARE_WORKERS_PRODUCTION_TOKEN",
    );
    expect(candidateWorkflow).toContain("wrangler versions upload");
    expect(candidateWorkflow).toContain("WRANGLER_OUTPUT_FILE_PATH");
    expect(candidateWorkflow).toContain(".preview_urls = false");
    expect(candidateWorkflow).toContain("--strict");
    expect(candidateWorkflow).not.toContain("wrangler versions deploy");
    expect(candidateWorkflow).not.toContain("wrangler pages deploy");
    expectNoRouteOrDnsMutation(candidateWorkflow);
  });

  it("rejects empty production secrets before creating or uploading a secrets file", () => {
    const guardStep = workflowStep(
      candidateSteps,
      "Verify required production secrets",
    );
    const uploadStep = workflowStep(
      candidateSteps,
      "Upload inactive production candidate",
    );
    const guardIndex = candidateSteps.indexOf(guardStep);
    const uploadStepIndex = candidateSteps.indexOf(uploadStep);
    const inStepGuardIndex =
      uploadStep.run?.indexOf(
        'if [ -z "$SEGMENT_FORMS_WRITE_KEY" ] || [ -z "$TURNSTILE_SECRET_KEY" ]',
      ) ?? -1;
    const secretsFileIndex =
      uploadStep.run?.indexOf(
        'secrets_file="$RUNNER_TEMP/worker-production-secrets.env"',
      ) ?? -1;
    const uploadIndex =
      uploadStep.run?.indexOf("wrangler versions upload") ?? -1;

    expect(guardStep.env).toMatchObject({
      SEGMENT_FORMS_WRITE_KEY: "$" + "{{ secrets.SEGMENT_FORMS_WRITE_KEY }}",
      TURNSTILE_SECRET_KEY: "$" + "{{ secrets.TURNSTILE_SECRET_KEY }}",
    });
    expect(guardStep.run).toContain(
      'if [ -z "$SEGMENT_FORMS_WRITE_KEY" ] || [ -z "$TURNSTILE_SECRET_KEY" ]',
    );
    expect(guardIndex).toBeLessThan(uploadStepIndex);
    expect(inStepGuardIndex).toBeGreaterThan(-1);
    expect(secretsFileIndex).toBeGreaterThan(inStepGuardIndex);
    expect(uploadIndex).toBeGreaterThan(secretsFileIndex);
  });

  it("records candidate identity before post-upload verification", () => {
    const outputIndex = candidateWorkflow.indexOf(
      'echo "version_id=$version_id"',
    );
    const viewIndex = candidateWorkflow.indexOf("wrangler versions view");
    const preserveIndex = candidateWorkflow.indexOf(
      "Preserve candidate upload metadata",
    );

    expect(outputIndex).toBeGreaterThan(-1);
    expect(viewIndex).toBeGreaterThan(outputIndex);
    expect(preserveIndex).toBeGreaterThan(viewIndex);
    expect(candidateWorkflow).toContain("candidate-identity.json");
    expect(candidateWorkflow).toContain("if: always()");
    expect(candidateWorkflow).toContain("if-no-files-found: warn");
  });

  it("proves candidate upload leaves deployment and endpoints private", () => {
    const captureIndex = candidateWorkflow.indexOf(
      "Capture production deployment and private endpoint state",
    );
    const uploadIndex = candidateWorkflow.indexOf(
      "\n      - name: Upload inactive production candidate",
      captureIndex,
    );
    const verifyIndex = candidateWorkflow.indexOf(
      "Verify upload preserved deployment and private endpoints",
    );

    expect(captureIndex).toBeGreaterThan(-1);
    expect(uploadIndex).toBeGreaterThan(captureIndex);
    expect(verifyIndex).toBeGreaterThan(uploadIndex);
    expect(candidateWorkflow).toContain("id: capture_baseline");
    expect(candidateWorkflow).toContain(
      "if: always() && steps.capture_baseline.outcome == 'success'",
    );
    expect(candidateWorkflow).toContain(
      "The active production deployment changed during candidate upload.",
    );
    expect(candidateWorkflow).toContain(
      ".result.enabled == false and .result.previews_enabled == false",
    );
  });

  it("executes candidate privacy and secret-binding predicates against rejecting states", () => {
    const captureStep = workflowStep(
      candidateSteps,
      "Capture production deployment and private endpoint state",
    );
    const uploadStep = workflowStep(
      candidateSteps,
      "Upload inactive production candidate",
    );
    const verifyStep = workflowStep(
      candidateSteps,
      "Verify upload preserved deployment and private endpoints",
    );

    expectPrivateWorkerPredicates(captureStep.run ?? "", {
      subdomain: '"$RUNNER_TEMP/worker-subdomain-before-upload.json"',
      routes: '"$RUNNER_TEMP/workers-before-upload.json"',
      domains: '"$RUNNER_TEMP/worker-domains-before-upload.json"',
    });
    expectSecretBindingPredicate(
      jqProgramReadingFrom(uploadStep.run ?? "", "version-metadata.json"),
    );
    expectPrivateWorkerPredicates(verifyStep.run ?? "", {
      subdomain: '"$RUNNER_TEMP/worker-subdomain-after-upload.json"',
      routes: '"$RUNNER_TEMP/workers-after-upload.json"',
      domains: '"$RUNNER_TEMP/worker-domains-after-upload.json"',
    });
  });

  it("keeps required binding names aligned with the shared contract", () => {
    for (const secret of REQUIRED_WORKER_SECRETS) {
      expect(previewWorkflow).toContain(`index("${secret}")`);
      expect(candidateWorkflow).toContain(`index("${secret}")`);
      expect(activationWorkflow).toContain(`index("${secret}")`);
    }
  });

  it("does not execute branch-controlled package scripts with production secrets", () => {
    expect(candidateWorkflow).not.toContain("pnpm ");
    expect(candidateWorkflow).not.toContain("pnpm install");
    expect(candidateWorkflow).not.toContain("pnpm build");
    expect(candidateWorkflow).toContain(
      "npm install --global wrangler@4.110.0",
    );
    expectArtifactGuards(candidateWorkflow);
  });
});

describe("trusted production activation workflow", () => {
  it("can only be dispatched manually from trusted main workflow code", () => {
    expect(activationWorkflow).toContain("workflow_dispatch:");
    expect(activationWorkflow).not.toContain("pull_request:");
    expect(activationWorkflow).not.toContain("push:");
    expect(activationWorkflow).toContain("github.ref == 'refs/heads/main'");
  });

  it("serializes production activation behind its environment", () => {
    expect(activationWorkflow).toContain("environment: production");
    expect(activationWorkflow).toContain("timeout-minutes: 15");
    expect(activationWorkflow).toContain("group: zenml-io-worker-production");
    expect(activationWorkflow).toContain("cancel-in-progress: false");
    expect(activationWorkflow).toContain(
      "secrets.CLOUDFLARE_WORKERS_PRODUCTION_TOKEN",
    );
  });

  it("checks exact version provenance and bindings before activation", () => {
    const viewIndex = activationWorkflow.indexOf("wrangler versions view");
    const bindingIndex = activationWorkflow.indexOf(
      "Verify required secret bindings",
    );
    const deployIndex = activationWorkflow.indexOf("wrangler versions deploy");

    expect(activationWorkflow).toContain("inputs.version_id");
    expect(activationWorkflow).toContain("inputs.source_commit");
    expect(activationWorkflow).toContain("inputs.source_branch");
    expect(activationWorkflow).toContain("inputs.artifact_sha256");
    expect(viewIndex).toBeGreaterThan(-1);
    expect(bindingIndex).toBeGreaterThan(viewIndex);
    expect(deployIndex).toBeGreaterThan(bindingIndex);
    expect(activationWorkflow).toContain('"$VERSION_ID@100%"');
    expect(activationWorkflow).toContain("--yes");
    expect(activationWorkflow).toContain(
      'git check-ref-format --branch "$SOURCE_BRANCH"',
    );
    expect(activationWorkflow).toContain("grep -Fq --");
    expect(activationWorkflow).toContain(
      "worker-subdomain-before-activation.json",
    );
    expect(activationWorkflow).toContain("workers-before-activation.json");
    expect(activationWorkflow).toContain(
      "worker-domains-before-activation.json",
    );
    expect(activationWorkflow).toContain(
      "worker-subdomain-after-activation.json",
    );
    expect(activationWorkflow).toContain("workers-after-activation.json");
    expect(activationWorkflow).toContain(
      "worker-domains-after-activation.json",
    );
    expectNoRouteOrDnsMutation(activationWorkflow);
  });

  it("executes activation privacy and secret-binding predicates against rejecting states", () => {
    const bindingStep = workflowStep(
      activationSteps,
      "Verify required secret bindings",
    );
    const activateStep = workflowStep(
      activationSteps,
      "Activate exact Worker version",
    );
    const verifyStep = workflowStep(
      activationSteps,
      "Verify exact production activation",
    );

    expectSecretBindingPredicate(
      jqProgramReadingFrom(bindingStep.run ?? "", "version-metadata.json"),
    );
    expectPrivateWorkerPredicates(activateStep.run ?? "", {
      subdomain: "worker-subdomain-before-activation.json",
      routes: "workers-before-activation.json",
      domains: "worker-domains-before-activation.json",
    });
    expectPrivateWorkerPredicates(verifyStep.run ?? "", {
      subdomain: "worker-subdomain-after-activation.json",
      routes: "workers-after-activation.json",
      domains: "worker-domains-after-activation.json",
    });
  });

  it("reconciles and preserves the exact post-activation deployment", () => {
    const deployIndex = activationWorkflow.indexOf("wrangler versions deploy");
    const verifyIndex = activationWorkflow.indexOf(
      "Verify exact production activation",
    );
    const preserveIndex = activationWorkflow.indexOf(
      "Preserve post-activation deployment metadata",
    );

    expect(verifyIndex).toBeGreaterThan(deployIndex);
    expect(preserveIndex).toBeGreaterThan(verifyIndex);
    expect(activationWorkflow).toContain("id: activate");
    expect(activationWorkflow).toContain(
      "if: always() && steps.activate.outcome != 'skipped'",
    );
    expect(activationWorkflow).toContain("max_by(.created_on) as $latest");
    expect(activationWorkflow).toContain(
      "$latest.versions[0].version_id == $version",
    );
    expect(activationWorkflow).toContain(
      "$latest.versions[0].percentage == 100",
    );
    expect(activationWorkflow).toContain("if: always()");
    expect(activationWorkflow).toContain("deployments-after.json");
  });

  it("executes the exact deployment predicate against split or wrong versions", () => {
    const verifyStep = workflowStep(
      activationSteps,
      "Verify exact production activation",
    );
    const program = jqProgramReadingFrom(
      verifyStep.run ?? "",
      "deployments-after.json",
    );
    const version = "11111111-1111-1111-1111-111111111111";
    const args = ["--arg", "version", version];
    const exactDeployment = [
      {
        created_on: "2026-07-27T10:00:00Z",
        versions: [{ percentage: 100, version_id: version }],
      },
    ];

    expectJqResult(program, exactDeployment, true, args);
    expectJqResult(
      program,
      [
        {
          ...exactDeployment[0],
          versions: [{ percentage: 50, version_id: version }],
        },
      ],
      false,
      args,
    );
    expectJqResult(
      program,
      [
        {
          ...exactDeployment[0],
          versions: [
            {
              percentage: 100,
              version_id: "22222222-2222-2222-2222-222222222222",
            },
          ],
        },
      ],
      false,
      args,
    );
  });
});

describe("automatic post-cutover production release", () => {
  it("runs only after successful current-main artifact CI", () => {
    expect(releaseWorkflow).toContain("workflow_run:");
    expect(releaseWorkflow).toContain(
      'workflows: ["Website CI and Worker Artifact"]',
    );
    expect(releaseWorkflow).toContain("types: [completed]");
    expect(releaseWorkflow).toContain("branches: [main]");
    expect(releaseWorkflow).toContain(
      "github.event.workflow_run.conclusion == 'success'",
    );
    expect(releaseWorkflow).toContain(
      "github.event.workflow_run.event == 'push'",
    );
    expect(releaseWorkflow).toContain(
      "github.event.workflow_run.head_branch == 'main'",
    );
    expect(releaseWorkflow).toContain(
      "github.event.workflow_run.head_repository.full_name == github.repository",
    );
    expect(releaseWorkflow).toContain("git/ref/heads/main");
    expect(releaseWorkflow).toContain("eligible=false");
  });

  it("serializes the complete release and promotes the exact CI artifact without rebuilding", () => {
    expect(releaseWorkflow).toContain("'zenml-io-worker-production'");
    expect(releaseWorkflow).toContain("cancel-in-progress: false");
    expect(releaseWorkflow).toContain(
      "format('zenml-io-worker-ineligible-{0}', github.run_id)",
    );
    expect(releaseWorkflow).toContain("actions/download-artifact@");
    expect(releaseWorkflow).toContain(
      "run-id: $" + "{{ github.event.workflow_run.id }}",
    );
    expect(releaseWorkflow).toContain("sha256sum --check worker-dist.sha256");
    expect(releaseWorkflow).toContain("wrangler versions upload");
    expect(releaseWorkflow).toContain("wrangler versions deploy");
    expect(releaseWorkflow).not.toContain("pnpm install");
    expect(releaseWorkflow).not.toContain("pnpm build");
    expect(releaseWorkflow).not.toContain("wrangler pages deploy");
    expectNoRouteOrDnsMutation(releaseWorkflow);
  });

  it("requires the accepted route topology and private Worker endpoints", () => {
    expect(releaseWorkflow).toContain("astro-workers-staging.zenml.io/*");
    expect(releaseWorkflow).toContain("www.zenml.io/*");
    expect(releaseWorkflow).toContain(
      ".result.enabled == false and .result.previews_enabled == false",
    );
    expect(releaseWorkflow).toContain("result_info.total_count == 0");
    expect(releaseWorkflow).toContain("Unexpected Worker route topology");

    const baselineStep = workflowStep(
      releaseUploadSteps,
      "Capture accepted production baseline",
    );
    const preservedUploadStep = workflowStep(
      releaseUploadSteps,
      "Verify inactive upload preserved production",
    );
    const activationBaselineStep = workflowStep(
      releaseActivationSteps,
      "Reverify exact candidate and production baseline",
    );
    const releaseStep = workflowStep(
      releaseActivationSteps,
      "Activate, smoke-test, and roll back on failure",
    );

    expectAcceptedWorkerRoutePredicate(
      baselineStep.run ?? "",
      '"$RUNNER_TEMP/workers-before-upload.json"',
    );
    expectAcceptedWorkerRoutePredicate(
      preservedUploadStep.run ?? "",
      '"$RUNNER_TEMP/workers-after-upload.json"',
    );
    expectAcceptedWorkerRoutePredicate(
      activationBaselineStep.run ?? "",
      '"$RUNNER_TEMP/workers-before-activation.json"',
    );
    expectAcceptedWorkerRoutePredicate(
      releaseStep.run ?? "",
      '"$RUNNER_TEMP/workers-after-activation.json"',
    );

    const subdomainProgram = jqProgramReadingFrom(
      preservedUploadStep.run ?? "",
      '"$RUNNER_TEMP/worker-subdomain-after-upload.json"',
    );
    expectJqResult(
      subdomainProgram,
      {
        result: { enabled: false, previews_enabled: false },
        success: true,
      },
      true,
    );
    expectJqResult(
      subdomainProgram,
      {
        result: { enabled: false, previews_enabled: true },
        success: true,
      },
      false,
    );
  });

  it("verifies bindings and exact version provenance before activation", () => {
    for (const secret of REQUIRED_WORKER_SECRETS) {
      expect(releaseWorkflow).toContain(`index("${secret}")`);
    }
    expect(releaseWorkflow).toContain("wrangler versions view");
    expect(releaseWorkflow).toContain("source_commit=$SOURCE_COMMIT");
    expect(releaseWorkflow).toContain("source_run_id=$SOURCE_RUN_ID");
    expect(releaseWorkflow).toContain("artifact_sha256=$artifact_sha256");
    expect(releaseWorkflow).toContain('"$CANDIDATE_VERSION_ID@100%"');

    const uploadStep = workflowStep(
      releaseUploadSteps,
      "Upload inactive production version",
    );
    const activationBaselineStep = workflowStep(
      releaseActivationSteps,
      "Reverify exact candidate and production baseline",
    );
    expectSecretBindingPredicate(
      jqProgramReadingFrom(uploadStep.run ?? "", "version-metadata.json"),
    );
    expectSecretBindingPredicate(
      jqProgramReadingFrom(
        activationBaselineStep.run ?? "",
        '"$RUNNER_TEMP/candidate-version.json"',
      ),
    );
  });

  it("rechecks live main and the exact production baseline immediately before activation", () => {
    const releaseStep = workflowStep(
      releaseActivationSteps,
      "Activate, smoke-test, and roll back on failure",
    );
    const run = releaseStep.run ?? "";
    const liveMainCheck = run.indexOf("git/ref/heads/main");
    const activation = run.indexOf(
      'wrangler versions deploy "$CANDIDATE_VERSION_ID@100%"',
    );
    const liveBaselineCheck = run.indexOf(
      '"$RUNNER_TEMP/deployments-immediately-before-activation.json"',
    );
    const activationAttempted = run.indexOf("activation_attempted=true");
    expect(releaseStep.env?.GH_TOKEN).toBe("$" + "{{ github.token }}");
    expect(liveMainCheck).toBeGreaterThan(-1);
    expect(liveBaselineCheck).toBeGreaterThan(liveMainCheck);
    expect(activationAttempted).toBeGreaterThan(liveBaselineCheck);
    expect(activation).toBeGreaterThan(liveMainCheck);
    expect(activation).toBeGreaterThan(activationAttempted);
    expect(run).toMatch(
      /timeout 90s \\\n\s+wrangler versions deploy "\$CANDIDATE_VERSION_ID@100%"/,
    );
    expect(run).toContain(
      "Production baseline changed before activation; refusing to overwrite it.",
    );
  });

  it("bounds activation deployment reads and retries post-activation verification", () => {
    const baselineStep = workflowStep(
      releaseActivationSteps,
      "Reverify exact candidate and production baseline",
    );
    const releaseStep = workflowStep(
      releaseActivationSteps,
      "Activate, smoke-test, and roll back on failure",
    );
    const run = releaseStep.run ?? "";
    const activeVersionFunction = run.slice(
      run.indexOf("active_version() {"),
      run.indexOf("verify_deployment() {"),
    );
    const verifyDeploymentFunction = run.slice(
      run.indexOf("verify_deployment() {"),
      run.indexOf("rollback_previous_version() {"),
    );

    expect(baselineStep.run).toContain("timeout 60s wrangler deployments list");
    expect(activeVersionFunction).toContain(
      "timeout 60s wrangler deployments list",
    );
    expect(activeVersionFunction).toContain("for attempt in 1 2 3");
    expect(activeVersionFunction).toContain("($latest.versions | length) == 1");
    expect(activeVersionFunction).toContain(
      "$latest.versions[0].percentage == 100",
    );
    expect(verifyDeploymentFunction).toContain("for attempt in 1 2 3");
    expect(verifyDeploymentFunction).toContain(
      "Active version did not converge",
    );
  });

  it("smoke-tests production and restores the previous version on failure", () => {
    expect(releaseWorkflow).toContain("/blog/dagster-alternatives");
    expect(releaseWorkflow).toContain("/api/github-stars");
    expect(releaseWorkflow).toContain("/api/forms/demo-request");
    expect(releaseWorkflow).toContain("rollback_previous_version");
    expect(releaseWorkflow).toContain('"$PREVIOUS_VERSION_ID@100%"');
    expect(releaseWorkflow).toContain("Rollback verification failed");
    expect(releaseWorkflow).toContain("Automatic rollback completed");
    expect(releaseWorkflow).toContain(
      "Recover previous production version after failed activation",
    );
    expect(releaseWorkflow).toContain("needs.activate.result != 'success'");
    const recoveryStep = workflowStep(
      releaseRecoverySteps,
      "Reconcile and recover previous version",
    );
    expect(recoveryStep.run).toContain(
      'wrangler versions deploy "$PREVIOUS_VERSION_ID@100%"',
    );
    expect(recoveryStep.run).toContain("for attempt in 1 2 3");
    expect(recoveryStep.run).toContain("timeout 90s");
    expect(recoveryStep.run).toContain(
      'current_version" != "$CANDIDATE_VERSION_ID',
    );
    expect(recoveryStep.run).toContain(
      "An unknown production version is active; recovery will not replace it.",
    );
    const recoveryRun = recoveryStep.run ?? "";
    const homepageVerification = recoveryRun.indexOf(
      'if [ "$home_status" != "200" ]',
    );
    const finalControlPlaneRead = recoveryRun.indexOf(
      'final_version="$(active_version)"',
      homepageVerification,
    );
    const finalVersionComparison = recoveryRun.indexOf(
      'if [ "$final_version" != "$PREVIOUS_VERSION_ID" ]',
      finalControlPlaneRead,
    );
    const recoverySuccess = recoveryRun.indexOf(
      "Recovered and verified the previous production Worker version.",
      finalVersionComparison,
    );
    expect(homepageVerification).toBeGreaterThan(-1);
    expect(finalControlPlaneRead).toBeGreaterThan(homepageVerification);
    expect(finalVersionComparison).toBeGreaterThan(finalControlPlaneRead);
    expect(recoverySuccess).toBeGreaterThan(finalVersionComparison);
    expect(
      recoveryRun.slice(finalControlPlaneRead, recoverySuccess),
    ).not.toContain("wrangler versions deploy");
    expect(
      workflowStep(
        releaseActivationSteps,
        "Preserve activation and smoke evidence",
      )["continue-on-error"],
    ).toBe(true);
  });

  it("reverifies the exact candidate after every production smoke check and before disarming rollback", () => {
    const releaseStep = workflowStep(
      releaseActivationSteps,
      "Activate, smoke-test, and roll back on failure",
    );
    const run = releaseStep.run ?? "";
    const lastAssetSmoke = run.indexOf(
      `expect_status 200 "https://www.zenml.io\${asset_path}" asset`,
    );
    const apexSmoke = run.indexOf('expect_status 301 "https://zenml.io/" apex');
    const finalCandidateOutput = run.indexOf(
      '"$RUNNER_TEMP/deployments-after-smoke.json"',
    );
    const finalCandidateVerification = run.lastIndexOf(
      "verify_deployment",
      finalCandidateOutput,
    );
    const trapRemoval = run.indexOf("trap - ERR", finalCandidateOutput);
    const successSummary = run.indexOf(
      "## Automatic production Worker release",
    );

    expect(lastAssetSmoke).toBeGreaterThan(-1);
    expect(apexSmoke).toBeGreaterThan(lastAssetSmoke);
    expect(finalCandidateVerification).toBeGreaterThan(apexSmoke);
    expect(finalCandidateOutput).toBeGreaterThan(finalCandidateVerification);
    expect(trapRemoval).toBeGreaterThan(finalCandidateVerification);
    expect(successSummary).toBeGreaterThan(trapRemoval);
    expect(
      run.slice(finalCandidateVerification, trapRemoval).trimEnd(),
    ).toMatch(
      /verify_deployment \\\n\s+"\$CANDIDATE_VERSION_ID" \\\n\s+"\$RUNNER_TEMP\/deployments-after-smoke\.json"$/,
    );
  });

  it("executes rollback after a post-activation failure and not after success", () => {
    const failedRelease = executeReleaseTrap(true);
    expect(failedRelease.error).toBeDefined();
    expect(failedRelease.wranglerCalls).toContain(
      "versions deploy 11111111-1111-1111-1111-111111111111@100% --name zenml-io-v2-worker --yes",
    );
    expect(failedRelease.wranglerCalls).toContain(
      "deployments list --name zenml-io-v2-worker --json",
    );

    const successfulRelease = executeReleaseTrap(false);
    expect(successfulRelease.error).toBeUndefined();
    expect(successfulRelease.wranglerCalls).toEqual([]);

    const unknownVersionRelease = executeReleaseTrap(
      true,
      "33333333-3333-3333-3333-333333333333",
    );
    expect(unknownVersionRelease.error).toBeDefined();
    expect(unknownVersionRelease.wranglerCalls).toContain(
      "deployments list --name zenml-io-v2-worker --json",
    );
    expect(
      unknownVersionRelease.wranglerCalls.some((call) =>
        call.startsWith("versions deploy "),
      ),
    ).toBe(false);
    expect(unknownVersionRelease.stderr).toContain(
      "An unknown production version is active; inline rollback will not replace it.",
    );

    const transientReadFailure = executeReleaseTrap(
      true,
      "22222222-2222-2222-2222-222222222222",
      1,
    );
    expect(transientReadFailure.error).toBeDefined();
    expect(transientReadFailure.deploymentReadCalls).toBeGreaterThanOrEqual(3);
    expect(
      transientReadFailure.wranglerCalls.some((call) =>
        call.startsWith("versions deploy "),
      ),
    ).toBe(true);

    const exhaustedReadFailure = executeReleaseTrap(
      true,
      "22222222-2222-2222-2222-222222222222",
      3,
    );
    expect(exhaustedReadFailure.error).toBeDefined();
    expect(exhaustedReadFailure.deploymentReadCalls).toBe(3);
    expect(
      exhaustedReadFailure.wranglerCalls.some((call) =>
        call.startsWith("versions deploy "),
      ),
    ).toBe(false);
    expect(exhaustedReadFailure.stderr).toContain(
      "Could not read the active production version from the Cloudflare control plane; inline rollback will not act.",
    );

    const operatorVersion = "33333333-3333-3333-3333-333333333333";
    const operatorReleaseDuringRetry = executeReleaseTrap(
      true,
      "22222222-2222-2222-2222-222222222222",
      0,
      1,
      operatorVersion,
    );
    expect(operatorReleaseDuringRetry.error).toBeDefined();
    expect(
      operatorReleaseDuringRetry.wranglerCalls.filter((call) =>
        call.startsWith("versions deploy "),
      ),
    ).toHaveLength(1);
    expect(operatorReleaseDuringRetry.stderr).toContain(
      "An unknown production version is active; inline rollback will not replace it.",
    );
  });

  it("retries a transient curl failure instead of triggering rollback", () => {
    const result = executeStatusRetry();
    expect(result.error).toBeUndefined();
    expect(result.curlCalls).toBe(2);
  });

  it("executes recovery reconciliation and fails closed when recovery cannot complete", () => {
    const previousVersion = "11111111-1111-1111-1111-111111111111";
    const candidateVersion = "22222222-2222-2222-2222-222222222222";
    const unknownVersion = "33333333-3333-3333-3333-333333333333";

    const alreadyRecovered = executeRecovery(previousVersion, 0, 200);
    expect(alreadyRecovered.error).toBeUndefined();
    expect(alreadyRecovered.deployCalls).toBe(0);

    const transientFailure = executeRecovery(candidateVersion, 1, 200);
    expect(transientFailure.error).toBeUndefined();
    expect(transientFailure.deployCalls).toBe(2);

    const exhaustedRecovery = executeRecovery(candidateVersion, 3, 200);
    expect(exhaustedRecovery.error).toBeDefined();
    expect(exhaustedRecovery.deployCalls).toBe(3);

    const unknownActiveVersion = executeRecovery(unknownVersion, 0, 200);
    expect(unknownActiveVersion.error).toBeDefined();
    expect(unknownActiveVersion.deployCalls).toBe(0);
    expect(unknownActiveVersion.stderr).toContain(
      "An unknown production version is active; recovery will not replace it.",
    );

    const unhealthyPreviousVersion = executeRecovery(previousVersion, 0, 503);
    expect(unhealthyPreviousVersion.error).toBeDefined();
    expect(unhealthyPreviousVersion.deployCalls).toBe(0);

    const transientReadFailure = executeRecovery(candidateVersion, 0, 200, 1);
    expect(transientReadFailure.error).toBeUndefined();
    expect(transientReadFailure.deploymentReadCalls).toBeGreaterThanOrEqual(3);
    expect(transientReadFailure.deployCalls).toBe(1);

    const exhaustedReadFailure = executeRecovery(candidateVersion, 0, 200, 3);
    expect(exhaustedReadFailure.error).toBeDefined();
    expect(exhaustedReadFailure.deploymentReadCalls).toBe(3);
    expect(exhaustedReadFailure.deployCalls).toBe(0);
    expect(exhaustedReadFailure.stderr).toContain(
      "Could not read the active production version from the Cloudflare control plane; recovery will not act.",
    );

    const operatorReleaseDuringRetry = executeRecovery(
      candidateVersion,
      1,
      200,
      0,
      unknownVersion,
    );
    expect(operatorReleaseDuringRetry.error).toBeDefined();
    expect(operatorReleaseDuringRetry.deployCalls).toBe(1);
    expect(operatorReleaseDuringRetry.stderr).toContain(
      "An unknown production version is active; recovery will not replace it.",
    );

    const candidateDuringHomepageCheck = executeRecovery(
      previousVersion,
      0,
      200,
      0,
      "",
      { activeVersion: candidateVersion },
    );
    expect(candidateDuringHomepageCheck.error).toBeDefined();
    expect(candidateDuringHomepageCheck.deployCalls).toBe(0);
    expect(candidateDuringHomepageCheck.stderr).toContain(
      "Active production version changed during recovery verification; recovery did not complete.",
    );

    const finalReadFailure = executeRecovery(previousVersion, 0, 200, 0, "", {
      readFails: true,
    });
    expect(finalReadFailure.error).toBeDefined();
    expect(finalReadFailure.deployCalls).toBe(0);
    expect(finalReadFailure.deploymentReadCalls).toBe(4);
    expect(finalReadFailure.stderr).toContain(
      "Could not read the active production version after homepage verification; recovery did not complete.",
    );
  });
});

describe("workflow action pinning", () => {
  it.each(
    allWorkflows.flatMap(([filename, workflow]) =>
      actionReferences(workflow).map((reference) => [filename, reference]),
    ),
  )("%s pins %s to an immutable revision", (_filename, reference) => {
    expect(reference).toMatch(
      /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+@[a-f0-9]{40}$/,
    );
  });
});
