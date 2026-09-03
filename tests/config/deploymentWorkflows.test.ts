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
  if?: string;
  name: string;
  run?: string;
}

interface ProductionWorkflow {
  concurrency?: {
    "cancel-in-progress": boolean;
    group: string;
  };
  jobs: Record<
    string,
    {
      env?: Record<string, string>;
      environment?: string;
      if?: string;
      outputs?: Record<string, string>;
      permissions?: Record<string, string>;
      steps: WorkflowStep[];
    }
  >;
  on?: Record<string, unknown>;
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
const prPreviewWorkflow = readFileSync(
  ".github/workflows/publish-pr-preview.yml",
  "utf8",
);
const trustedArtifactWorkflow = readFileSync(
  ".github/trusted/worker-artifact-workflow.yml",
  "utf8",
);
const workerConfig = JSON.parse(readFileSync("wrangler.jsonc", "utf8")) as {
  compatibility_flags: string[];
};
const expectedCompatibilityFlags = `[${workerConfig.compatibility_flags
  .map((flag) => JSON.stringify(flag))
  .join(", ")}]`;
const prPreviewWorkflowConfig = parse(prPreviewWorkflow) as ProductionWorkflow;
const deployWorkflowConfig = parse(deployWorkflow) as ProductionWorkflow;
const candidateWorkflowConfig = parse(candidateWorkflow) as ProductionWorkflow;
const activationWorkflowConfig = parse(
  activationWorkflow,
) as ProductionWorkflow;
const releaseWorkflowConfig = parse(releaseWorkflow) as ProductionWorkflow;
const candidateSteps = candidateWorkflowConfig.jobs["upload-candidate"].steps;
const deploySteps = deployWorkflowConfig.jobs["repo-check"].steps;
const activationSteps = activationWorkflowConfig.jobs.activate.steps;
const releaseUploadSteps = releaseWorkflowConfig.jobs.upload.steps;
const releaseActivationSteps = releaseWorkflowConfig.jobs.activate.steps;
const releaseRecoverySteps = releaseWorkflowConfig.jobs.recover.steps;
const prPreviewPublishSteps = prPreviewWorkflowConfig.jobs.publish.steps;
const prPreviewRetireSteps = prPreviewWorkflowConfig.jobs.retire.steps;
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

describe("Worker compatibility contract", () => {
  it("keeps the branch-controlled and trusted artifact producers byte-identical", () => {
    expect(trustedArtifactWorkflow).toBe(deployWorkflow);
  });

  it.each([
    ["artifact producer", deployWorkflow],
    ["trusted artifact producer", trustedArtifactWorkflow],
    ["private preview uploader", previewWorkflow],
    ["production candidate uploader", candidateWorkflow],
    ["automatic release", releaseWorkflow],
    ["PR preview publisher", prPreviewWorkflow],
  ])("keeps the %s aligned with the source Worker config", (_, workflow) => {
    expect(workflow).toContain(
      `.compatibility_flags == ${expectedCompatibilityFlags}`,
    );
  });
});

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
  expect(workflow).toContain("dist/server/wrangler.json");
  expect(workflow).toContain(".wrangler/deploy/config.json");
  expect(workflow).toContain(".generated_config_sha256");
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
  if [ "$version_id" = "preflight" ]; then
    printf '[{"created_on":"2026-07-29T00:00:00Z","versions":[{"version_id":"%s","percentage":100},{"version_id":"%s","percentage":0}]}]\\n' \
      "$PREVIOUS_VERSION_ID" "$CANDIDATE_VERSION_ID"
  else
    printf '[{"created_on":"2026-07-29T00:00:00Z","versions":[{"version_id":"%s","percentage":100}]}]\\n' "$version_id"
  fi
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

function executeStatusRetry(): {
  curlArgs: string[];
  curlCalls: number;
  error: unknown;
} {
  const releaseStep = workflowStep(
    releaseActivationSteps,
    "Activate, smoke-test, and roll back on failure",
  );
  const run = releaseStep.run ?? "";
  const functionStart = run.indexOf("expect_status() {");
  const functionEnd = run.indexOf("rollback_previous_version() {");
  expect(functionStart).toBeGreaterThan(-1);
  expect(functionEnd).toBeGreaterThan(functionStart);
  const expectStatusFunction = run.slice(functionStart, functionEnd);

  return withTemporaryHarness(
    "worker-release-smoke-",
    (harnessDirectory, binDirectory) => {
      const callsFile = join(harnessDirectory, "curl-calls.txt");
      const argsFile = join(harnessDirectory, "curl-args.txt");
      writeFileSync(callsFile, "0\n");
      writeFileSync(argsFile, "");
      writeFileSync(
        join(binDirectory, "curl"),
        `#!/usr/bin/env bash
set -euo pipefail
calls="$(cat "$CURL_CALLS_FILE")"
calls=$((calls + 1))
printf '%s\\n' "$calls" > "$CURL_CALLS_FILE"
printf '%s\\n' "$*" >> "$CURL_ARGS_FILE"
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
worker_name="zenml-io-v2-worker"
expect_status 200 "https://www.zenml.io/" retry-test "22222222-2222-2222-2222-222222222222"
`,
          ],
          {
            env: {
              ...process.env,
              CURL_ARGS_FILE: argsFile,
              CURL_CALLS_FILE: callsFile,
              GITHUB_RUN_ID: "12345",
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
      const curlArgs = readFileSync(argsFile, "utf8").trim().split("\n");
      return { curlArgs, curlCalls, error };
    },
  );
}

function executeCandidateHomeCheck(markerAfterCall: number): {
  curlCalls: number;
  error: unknown;
} {
  const releaseStep = workflowStep(
    releaseActivationSteps,
    "Activate, smoke-test, and roll back on failure",
  );
  const run = releaseStep.run ?? "";
  const functionStart = run.indexOf("expect_status() {");
  const functionEnd = run.indexOf("rollback_previous_version() {");
  expect(functionStart).toBeGreaterThan(-1);
  expect(functionEnd).toBeGreaterThan(functionStart);
  const verificationFunctions = run.slice(functionStart, functionEnd);

  return withTemporaryHarness(
    "worker-release-candidate-home-",
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
output_file=""
while [ "$#" -gt 0 ]; do
  case "$1" in
    --output)
      output_file="$2"
      shift 2
      ;;
    *)
      shift
      ;;
  esac
done
if [ "$calls" -ge "$CURL_MARKER_AFTER_CALL" ]; then
  printf '<!-- worker-release-marker:%s:%s:%s -->\\n' \
    "$SOURCE_COMMIT" "$SOURCE_RUN_ID" "$SOURCE_RUN_ATTEMPT" > "$output_file"
else
  printf '<html>old release</html>\\n' > "$output_file"
fi
printf '200\\n'
`,
      );
      writeFileSync(
        join(binDirectory, "sleep"),
        "#!/usr/bin/env bash\nexit 0\n",
      );
      chmodSync(join(binDirectory, "curl"), 0o755);
      chmodSync(join(binDirectory, "sleep"), 0o755);

      let error: unknown;
      try {
        execFileSync(
          "bash",
          [
            "-c",
            `set -Eeuo pipefail
${verificationFunctions}
worker_name="zenml-io-v2-worker"
expect_candidate_home
`,
          ],
          {
            env: {
              ...process.env,
              CANDIDATE_VERSION_ID: "22222222-2222-2222-2222-222222222222",
              CURL_CALLS_FILE: callsFile,
              CURL_MARKER_AFTER_CALL: String(markerAfterCall),
              GITHUB_RUN_ID: "12345",
              PATH: `${binDirectory}:${process.env.PATH ?? ""}`,
              RUNNER_TEMP: harnessDirectory,
              SOURCE_COMMIT: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
              SOURCE_RUN_ATTEMPT: "1",
              SOURCE_RUN_ID: "12345",
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

function executeCandidateAssetCheck(
  statusAfterCall: number,
  phase: "preflight" | "active" = "preflight",
): {
  curlArgs: string[];
  curlCalls: number;
  error: unknown;
} {
  const releaseStep = workflowStep(
    releaseActivationSteps,
    "Activate, smoke-test, and roll back on failure",
  );
  const run = releaseStep.run ?? "";
  const functionStart = run.indexOf("expect_status() {");
  const functionEnd = run.indexOf("rollback_previous_version() {");
  expect(functionStart).toBeGreaterThan(-1);
  expect(functionEnd).toBeGreaterThan(functionStart);
  const verificationFunctions = run.slice(functionStart, functionEnd);

  return withTemporaryHarness(
    "worker-release-candidate-asset-",
    (harnessDirectory, binDirectory) => {
      const callsFile = join(harnessDirectory, "curl-calls.txt");
      const argsFile = join(harnessDirectory, "curl-args.txt");
      writeFileSync(callsFile, "0\n");
      writeFileSync(argsFile, "");
      writeFileSync(
        join(binDirectory, "curl"),
        `#!/usr/bin/env bash
set -euo pipefail
calls="$(cat "$CURL_CALLS_FILE")"
calls=$((calls + 1))
printf '%s\\n' "$calls" > "$CURL_CALLS_FILE"
printf '%s\\n' "$*" >> "$CURL_ARGS_FILE"
if [ "$calls" -ge "$CURL_ASSET_STATUS_AFTER_CALL" ]; then
  printf '200\\n'
else
  printf '404\\n'
fi
`,
      );
      writeFileSync(
        join(binDirectory, "sleep"),
        "#!/usr/bin/env bash\nexit 0\n",
      );
      chmodSync(join(binDirectory, "curl"), 0o755);
      chmodSync(join(binDirectory, "sleep"), 0o755);

      let error: unknown;
      try {
        execFileSync(
          "bash",
          [
            "-c",
            `set -Eeuo pipefail
${verificationFunctions}
worker_name="zenml-io-v2-worker"
expect_candidate_assets "${phase === "preflight" ? "22222222-2222-2222-2222-222222222222" : ""}" ${phase}
`,
          ],
          {
            env: {
              ...process.env,
              CANDIDATE_ASSET_PATHS_JSON: '["/_astro/candidate.js"]',
              CANDIDATE_VERSION_ID: "22222222-2222-2222-2222-222222222222",
              CURL_ARGS_FILE: argsFile,
              CURL_ASSET_STATUS_AFTER_CALL: String(statusAfterCall),
              CURL_CALLS_FILE: callsFile,
              GITHUB_RUN_ID: "12345",
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
      const curlArgs = readFileSync(argsFile, "utf8")
        .trim()
        .split("\n")
        .filter(Boolean);
      return { curlArgs, curlCalls, error };
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
  if [ "$active_version" = "preflight" ]; then
    printf '[{"created_on":"2026-07-29T00:00:00Z","versions":[{"version_id":"%s","percentage":100},{"version_id":"%s","percentage":0}]}]\\n' \
      "$PREVIOUS_VERSION_ID" "$CANDIDATE_VERSION_ID"
  else
    printf '[{"created_on":"2026-07-29T00:00:00Z","versions":[{"version_id":"%s","percentage":100}]}]\\n' "$active_version"
  fi
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
  const sourceIndex = run.indexOf(`${source} > /dev/null`);
  expect(sourceIndex, `missing jq source for ${source}`).toBeGreaterThan(-1);
  const commandPrefix = run.slice(0, sourceIndex);
  const commandIndex = commandPrefix.lastIndexOf("jq -e");
  expect(commandIndex, `missing jq command for ${source}`).toBeGreaterThan(-1);
  const programEnd = commandPrefix.lastIndexOf("'");
  expect(programEnd, `missing jq program end for ${source}`).toBeGreaterThan(
    commandIndex,
  );
  const programStart = commandPrefix.lastIndexOf("'", programEnd - 1);
  expect(programStart, `missing jq program for ${source}`).toBeGreaterThan(
    commandIndex,
  );
  return commandPrefix.slice(programStart + 1, programEnd);
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
  const acceptedRoutes = ["www.zenml.io/*"];
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
          routes: ["www.zenml.io/*", "astro-workers-staging.zenml.io/*"],
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

  it("has no Cloudflare credentials or state-changing deployment command", () => {
    expect(deployWorkflow).not.toContain("${{ secrets.");
    expect(deployWorkflow).toContain("wrangler versions upload");
    expect(deployWorkflow).toContain("--dry-run");
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
    expect(candidateWorkflow).toContain("preview_urls: false");
    expect(candidateWorkflow).toContain("--dry-run");
    expect(candidateWorkflow).toContain("--strict");
    expect(candidateWorkflow).not.toContain("wrangler versions deploy");
    expect(candidateWorkflow).not.toContain("wrangler pages deploy");
    expectNoRouteOrDnsMutation(candidateWorkflow);
  });

  it("accepts only eligible Astro 6 or 7 artifacts with exact provenance", () => {
    const provenanceStep = workflowStep(
      candidateSteps,
      "Verify artifact provenance and checksum",
    );
    const program = jqProgramReadingFrom(
      provenanceStep.run ?? "",
      "worker-manifest.json",
    );
    const args = [
      "--arg",
      "artifact_sha256",
      "artifact-sha",
      "--arg",
      "branch",
      "main",
      "--arg",
      "commit",
      "source-commit",
      "--arg",
      "run_id",
      "12345",
    ];
    const manifest = {
      artifact_contract: "astro-cloudflare-v6",
      artifact_sha256: "artifact-sha",
      production_release_eligible: true,
      run_id: "12345",
      source_branch: "main",
      source_commit: "source-commit",
    };

    expectJqResult(program, manifest, true, args);
    expectJqResult(
      program,
      { ...manifest, artifact_contract: "astro-cloudflare-v7" },
      true,
      args,
    );
    expectJqResult(
      program,
      { ...manifest, production_release_eligible: false },
      false,
      args,
    );
    expectJqResult(
      program,
      { ...manifest, artifact_contract: "astro-cloudflare-v8" },
      false,
      args,
    );
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
  it("labels only reviewed Astro 6 or 7 artifacts and enables the accepted production release", () => {
    const packageStep = workflowStep(
      deploySteps,
      "Package the validated Worker artifact",
    );
    const packageRun = packageStep.run ?? "";
    const caseStart = packageRun.indexOf('case "$astro_major" in');
    const caseEnd = packageRun.indexOf("esac", caseStart);

    expect(caseStart).toBeGreaterThan(-1);
    expect(caseEnd).toBeGreaterThan(caseStart);
    const caseProgram = packageRun.slice(caseStart, caseEnd + "esac".length);
    const artifactContractFor = (astroMajor: string): string =>
      execFileSync(
        "bash",
        [
          "-c",
          `set -euo pipefail\n${caseProgram}\nprintf '%s' "$artifact_contract"`,
        ],
        {
          encoding: "utf8",
          env: { ...process.env, astro_major: astroMajor },
          stdio: ["ignore", "pipe", "pipe"],
        },
      );

    expect(artifactContractFor("6")).toBe("astro-cloudflare-v6");
    expect(artifactContractFor("7")).toBe("astro-cloudflare-v7");
    expect(() => artifactContractFor("8")).toThrow();

    expect(deployWorkflow).toContain('astro_major="$(');
    expect(deployWorkflow).toContain("node -p");
    expect(deployWorkflow).toContain("node_modules/astro/package.json");
    expect(deployWorkflow).toContain("6|7)");
    expect(deployWorkflow).toContain(
      'artifact_contract="astro-cloudflare-v$' + '{astro_major}"',
    );
    expect(deployWorkflow).toContain("Unsupported Astro major");
    expect(deployWorkflow).toContain(
      '--arg artifact_contract "$artifact_contract"',
    );
    expect(deployWorkflow).toContain(
      '--argjson production_release_eligible "$production_release_eligible"',
    );
    const eligibilityStart = packageRun.indexOf(
      "production_release_eligible=false",
    );
    const eligibilityEnd = packageRun.indexOf("jq -n", eligibilityStart);
    const eligibilityProgram = packageRun.slice(
      eligibilityStart,
      eligibilityEnd,
    );
    const productionEligibilityFor = (
      eventName: string,
      sourceBranch: string,
      sourceCommit: string,
      buildCommit: string,
    ): string =>
      execFileSync(
        "bash",
        [
          "-c",
          `set -euo pipefail\n${eligibilityProgram}\nprintf '%s' "$production_release_eligible"`,
        ],
        {
          encoding: "utf8",
          env: {
            ...process.env,
            BUILD_COMMIT: buildCommit,
            EVENT_NAME: eventName,
            SOURCE_BRANCH: sourceBranch,
            SOURCE_COMMIT: sourceCommit,
          },
          stdio: ["ignore", "pipe", "pipe"],
        },
      );
    const commit = "a".repeat(40);
    expect(productionEligibilityFor("push", "main", commit, commit)).toBe(
      "true",
    );
    expect(
      productionEligibilityFor("pull_request", "feature", commit, commit),
    ).toBe("false");
    expect(productionEligibilityFor("push", "feature", commit, commit)).toBe(
      "false",
    );
    expect(
      productionEligibilityFor("push", "main", commit, "b".repeat(40)),
    ).toBe("false");
    expect(deployWorkflow).not.toContain(
      '--arg artifact_contract "astro-cloudflare-v6"',
    );
    for (const workflow of [deployWorkflow, prPreviewWorkflow]) {
      expect(workflow).toContain(
        '($artifact_contract == "astro-cloudflare-v6") and',
      );
      expect(workflow).toContain(
        '($artifact_contract == "astro-cloudflare-v7") and',
      );
      expect(workflow).toContain('.compatibility_flags == ["nodejs_compat"]');
      expect(workflow).toContain(
        '.compatibility_flags == ["nodejs_compat", "disable_nodejs_process_v2"]',
      );
    }
    expect(prPreviewWorkflow).toContain(
      'artifact_contract="$(jq -r .artifact_contract worker-manifest.json)"',
    );

    for (const workflow of [
      previewWorkflow,
      candidateWorkflow,
      releaseWorkflow,
      prPreviewWorkflow,
    ]) {
      expect(workflow).toMatch(
        /\(\.artifact_contract == "astro-cloudflare-v6" or\s+\.artifact_contract == "astro-cloudflare-v7"\)/,
      );
      expect(workflow).not.toMatch(/astro-cloudflare-v(?:[0-5]|[89]|\d{2,})/);
    }
  });

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
    expect(releaseWorkflow).toContain(".production_release_eligible == true");
    expect(deployWorkflow).toContain(
      '--argjson production_release_eligible "$production_release_eligible"',
    );
    expect(releaseWorkflow).not.toContain("ACCEPTED_PREVIOUS_VERSION_ID");
    expect(releaseWorkflow).not.toContain(
      "Production is not on the accepted Astro 6 rollback version.",
    );
    expect(releaseWorkflow).toContain(
      'echo "previous_version_id=$previous_version_id" >> "$GITHUB_OUTPUT"',
    );
  });

  it("captures only a trusted single-version production baseline", () => {
    const baselineStep = workflowStep(
      releaseUploadSteps,
      "Capture accepted production baseline",
    );
    const baselineRun = baselineStep.run ?? "";
    const programStart = baselineRun.indexOf(
      "jq -er '\n",
      baselineRun.indexOf('previous_version_id="$('),
    );
    const programEnd = baselineRun.indexOf(
      '\' "$RUNNER_TEMP/deployments-before-upload.json"',
      programStart,
    );
    expect(programStart).toBeGreaterThan(-1);
    expect(programEnd).toBeGreaterThan(programStart);
    const deploymentProgram = baselineRun.slice(programStart + 8, programEnd);
    const versionId = "11111111-1111-1111-1111-111111111111";
    const newerVersionId = "22222222-2222-2222-2222-222222222222";
    const selectBaseline = (deployments: unknown): string =>
      execFileSync("jq", ["-er", deploymentProgram], {
        encoding: "utf8",
        input: JSON.stringify(deployments),
        stdio: ["pipe", "pipe", "pipe"],
      }).trim();

    expect(
      selectBaseline([
        {
          created_on: "2026-08-02T00:00:00Z",
          versions: [{ percentage: 100, version_id: versionId }],
        },
        {
          created_on: "2026-08-03T00:00:00Z",
          versions: [{ percentage: 100, version_id: newerVersionId }],
        },
      ]),
    ).toBe(newerVersionId);
    expect(() =>
      selectBaseline([
        {
          created_on: "2026-08-03T00:00:00Z",
          versions: [
            { percentage: 100, version_id: versionId },
            { percentage: 0, version_id: newerVersionId },
          ],
        },
      ]),
    ).toThrow();
    expect(() =>
      selectBaseline([
        {
          created_on: "2026-08-03T00:00:00Z",
          versions: [{ percentage: 50, version_id: versionId }],
        },
      ]),
    ).toThrow();

    expect(baselineStep.env?.GH_TOKEN).toBe("$" + "{{ github.token }}");
    expect(baselineRun).toContain(
      'wrangler versions view "$previous_version_id"',
    );
    expect(baselineRun).toContain(
      '.annotations["workers/tag"] == "automatic-main-release"',
    );
    expect(baselineRun).toContain(
      '"repos/$GITHUB_REPOSITORY/actions/runs/$previous_source_run_id/attempts/$previous_source_run_attempt"',
    );
    const metadataProgram = jqProgramReadingFrom(
      baselineRun,
      '"$RUNNER_TEMP/previous-version-metadata.json"',
    );
    const trustedMetadata = {
      annotations: {
        "workers/message": `source_commit=${"a".repeat(40)} source_branch=main source_run_id=123 source_run_attempt=1 artifact_sha256=${"b".repeat(64)}`,
        "workers/tag": "automatic-main-release",
      },
      resources: {
        bindings: REQUIRED_WORKER_SECRETS.map((name) => ({
          name,
          type: "secret_text",
        })),
      },
    };
    expectJqResult(metadataProgram, trustedMetadata, true);
    expectJqResult(
      metadataProgram,
      {
        ...trustedMetadata,
        annotations: {
          ...trustedMetadata.annotations,
          "workers/tag": "manual-release",
        },
      },
      false,
    );
    expectJqResult(
      metadataProgram,
      {
        ...trustedMetadata,
        resources: { bindings: trustedMetadata.resources.bindings.slice(0, 1) },
      },
      false,
    );
    expectJqResult(
      metadataProgram,
      {
        ...trustedMetadata,
        annotations: {
          ...trustedMetadata.annotations,
          "workers/message":
            "source_commit=untrusted source_branch=main source_run_id=123",
        },
      },
      false,
    );

    const sourceRunProgram = jqProgramReadingFrom(
      baselineRun,
      '"$RUNNER_TEMP/previous-source-run.json"',
    );
    const sourceCommit = "a".repeat(40);
    const trustedSourceRun = {
      conclusion: "success",
      event: "push",
      head_branch: "main",
      head_repository: { full_name: "zenml-io/zenml-io-v2" },
      head_sha: sourceCommit,
      name: "Website CI and Worker Artifact",
      path: ".github/workflows/deploy.yml",
      run_attempt: 1,
    };
    const sourceRunArgs = [
      "--arg",
      "commit",
      sourceCommit,
      "--arg",
      "repository",
      "zenml-io/zenml-io-v2",
      "--arg",
      "run_attempt",
      "1",
    ];
    expectJqResult(sourceRunProgram, trustedSourceRun, true, sourceRunArgs);
    expectJqResult(
      sourceRunProgram,
      { ...trustedSourceRun, conclusion: "failure" },
      false,
      sourceRunArgs,
    );
    expectJqResult(
      sourceRunProgram,
      { ...trustedSourceRun, head_branch: "feature" },
      false,
      sourceRunArgs,
    );
    expectJqResult(
      sourceRunProgram,
      {
        ...trustedSourceRun,
        head_repository: { full_name: "fork/zenml-io-v2" },
      },
      false,
      sourceRunArgs,
    );
    expectJqResult(
      sourceRunProgram,
      { ...trustedSourceRun, head_sha: "c".repeat(40) },
      false,
      sourceRunArgs,
    );
    expectJqResult(
      sourceRunProgram,
      { ...trustedSourceRun, run_attempt: 2 },
      false,
      sourceRunArgs,
    );
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

  it("rejects a stale main artifact immediately before the privileged upload", () => {
    const uploadStep = workflowStep(
      releaseUploadSteps,
      "Upload inactive production version",
    );
    const uploadProgram = uploadStep.run ?? "";

    expect(uploadStep.env?.GH_TOKEN).toBe("$" + "{{ github.token }}");
    expect(uploadProgram).toContain(
      'gh api "repos/$GITHUB_REPOSITORY/git/ref/heads/main" --jq .object.sha',
    );
    expect(uploadProgram).toContain(
      'if [ "$live_main_commit" != "$SOURCE_COMMIT" ]',
    );
    expect(uploadProgram.indexOf("live_main_commit=")).toBeLessThan(
      uploadProgram.lastIndexOf("wrangler versions upload"),
    );
  });

  it("requires the accepted route topology and private Worker endpoints", () => {
    expect(releaseWorkflow).toContain("www.zenml.io/*");
    expect(releaseWorkflow).not.toContain("astro-workers-staging.zenml.io/*");
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
    const zeroTrafficPreflight = run.indexOf(
      'wrangler versions deploy "$PREVIOUS_VERSION_ID@100%" "$CANDIDATE_VERSION_ID@0%"',
    );
    const candidateHome = run.indexOf(
      'expect_candidate_home "$CANDIDATE_VERSION_ID" preflight preflight-home',
    );
    const finalPreflightCheck = run.indexOf(
      '"$RUNNER_TEMP/deployments-immediately-before-promotion.json"',
    );
    const liveBaselineCheck = run.indexOf(
      '"$RUNNER_TEMP/deployments-immediately-before-activation.json"',
    );
    const activationAttempted = run.indexOf("activation_attempted=true");
    expect(releaseStep.env?.GH_TOKEN).toBe("$" + "{{ github.token }}");
    expect(liveMainCheck).toBeGreaterThan(-1);
    expect(liveBaselineCheck).toBeGreaterThan(liveMainCheck);
    expect(activationAttempted).toBeGreaterThan(liveBaselineCheck);
    expect(zeroTrafficPreflight).toBeGreaterThan(activationAttempted);
    expect(candidateHome).toBeGreaterThan(zeroTrafficPreflight);
    expect(finalPreflightCheck).toBeGreaterThan(candidateHome);
    expect(activation).toBeGreaterThan(finalPreflightCheck);
    expect(activation).toBeGreaterThan(liveMainCheck);
    expect(activation).toBeGreaterThan(activationAttempted);
    expect(run).toMatch(
      /timeout 90s \\\n\s+wrangler versions deploy "\$CANDIDATE_VERSION_ID@100%"/,
    );
    expect(run).toContain(
      "Production baseline changed before activation; refusing to overwrite it.",
    );
  });

  it("proves the version override reached the exact checksummed candidate artifact before promotion", () => {
    const uploadStep = workflowStep(
      releaseUploadSteps,
      "Upload inactive production version",
    );
    const releaseStep = workflowStep(
      releaseActivationSteps,
      "Activate, smoke-test, and roll back on failure",
    );
    const uploadProgram = uploadStep.run ?? "";
    const releaseProgram = releaseStep.run ?? "";

    expect(deployWorkflow).toContain("- name: Stamp exact release marker");
    expect(deployWorkflow).toContain(
      'release_marker="worker-release-marker:$SOURCE_COMMIT:$RUN_ID:$RUN_ATTEMPT"',
    );
    expect(deployWorkflow).toContain(
      "printf '\\n<!-- %s -->\\n' \"$release_marker\" >> dist/client/index.html",
    );
    expect(deployWorkflow).toContain(
      'grep -Fq -- "$release_marker" dist/client/index.html',
    );
    expect(deployWorkflow.indexOf("Stamp exact release marker")).toBeLessThan(
      deployWorkflow.indexOf("Smoke test built site output"),
    );
    expect(releaseWorkflowConfig.jobs.upload.outputs).toHaveProperty(
      "candidate_asset_paths",
    );
    expect(uploadProgram).toContain(
      'release_marker="worker-release-marker:$SOURCE_COMMIT:$SOURCE_RUN_ID:$source_run_attempt"',
    );
    expect(uploadProgram).toContain(
      'grep -Fq -- "$release_marker" dist/client/index.html',
    );
    expect(uploadProgram).toContain("source_run_attempt");
    expect(releaseWorkflowConfig.jobs.activate.env).toHaveProperty(
      "CANDIDATE_ASSET_PATHS_JSON",
    );
    expect(releaseWorkflowConfig.jobs.activate.env).toHaveProperty(
      "SOURCE_RUN_ATTEMPT",
    );
    expect(releaseProgram).toContain("expect_candidate_home() {");
    expect(releaseProgram).toContain(
      'local expected_marker="worker-release-marker:$SOURCE_COMMIT:$SOURCE_RUN_ID:$SOURCE_RUN_ATTEMPT"',
    );
    expect(releaseProgram).toContain("for attempt in $(seq 1 12); do");
    expect(releaseProgram).toContain(
      '"https://www.zenml.io/?__worker_$' + '{phase}_marker_attempt=$attempt"',
    );
    expect(releaseProgram).toContain('"$label" "$version_override" 1 0');
    expect(releaseProgram).toContain('grep -Fq -- "$expected_marker"');
    expect(releaseProgram).toContain(
      "The $" +
        "{phase} homepage did not converge to the candidate release marker.",
    );
    expect(releaseProgram).toContain("expect_candidate_assets() {");
    expect(releaseProgram).toContain(
      `"https://www.zenml.io\${asset_path}?__worker_\${phase}_candidate_asset=\${GITHUB_RUN_ID}-\${attempt}-\${asset_index}"`,
    );
    expect(releaseProgram).toContain(
      'Cloudflare-Workers-Version-Overrides: $worker_name=\\"$version_override\\"',
    );
    expect(releaseProgram).toContain(
      "The $" + "{phase} candidate assets did not converge.",
    );
    expect(
      releaseProgram.lastIndexOf("expect_candidate_assets"),
    ).toBeGreaterThan(releaseProgram.lastIndexOf("expect_candidate_home"));
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
      "Previous production version is serving 100 percent with the candidate held at 0 percent.",
    );
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
    expect(recoveryStep.run).toContain('[ "$current_state" != "candidate" ]');
    expect(recoveryStep.run).toContain(
      "An unknown production version is active; recovery will not replace it.",
    );
    const recoveryRun = recoveryStep.run ?? "";
    const homepageVerification = recoveryRun.indexOf(
      'if [ "$home_status" != "200" ]',
    );
    const finalControlPlaneRead = recoveryRun.indexOf(
      'final_state="$(deployment_state)"',
      homepageVerification,
    );
    const finalVersionComparison = recoveryRun.indexOf(
      'if [ "$final_state" != "previous" ]',
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
    const activeHomepageSmoke = run.indexOf(
      'expect_candidate_home "" active home',
    );
    const activeAssetSmoke = run.indexOf('expect_candidate_assets "" active');
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

    expect(activeHomepageSmoke).toBeGreaterThan(-1);
    expect(activeAssetSmoke).toBeGreaterThan(activeHomepageSmoke);
    expect(apexSmoke).toBeGreaterThan(activeAssetSmoke);
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

    const preflightRelease = executeReleaseTrap(true, "preflight");
    expect(preflightRelease.error).toBeDefined();
    expect(preflightRelease.wranglerCalls).toContain(
      "versions deploy 11111111-1111-1111-1111-111111111111@100% --name zenml-io-v2-worker --yes",
    );

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
      "Could not read the production deployment from the Cloudflare control plane; inline rollback will not act.",
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
    expect(result.curlArgs).toEqual([
      expect.stringContaining(
        'Cloudflare-Workers-Version-Overrides: zenml-io-v2-worker="22222222-2222-2222-2222-222222222222"',
      ),
      expect.stringContaining(
        'Cloudflare-Workers-Version-Overrides: zenml-io-v2-worker="22222222-2222-2222-2222-222222222222"',
      ),
    ]);
    expect(result.curlArgs[0]).toContain("__worker_smoke=12345-1");
    expect(result.curlArgs[1]).toContain("__worker_smoke=12345-2");
  });

  it("retries a stale 200 homepage only until it carries the candidate marker", () => {
    const converged = executeCandidateHomeCheck(2);
    expect(converged.error).toBeUndefined();
    expect(converged.curlCalls).toBe(2);

    const exhausted = executeCandidateHomeCheck(13);
    expect(exhausted.error).toBeDefined();
    expect(exhausted.curlCalls).toBe(12);
  });

  it("retries candidate assets before promotion and fails closed when they stay unavailable", () => {
    const converged = executeCandidateAssetCheck(2);
    expect(converged.error).toBeUndefined();
    expect(converged.curlCalls).toBe(2);

    const exhausted = executeCandidateAssetCheck(13);
    expect(exhausted.error).toBeDefined();
    expect(exhausted.curlCalls).toBe(12);
  });

  it("retries public candidate assets after activation without reusing cached 404 URLs", () => {
    const converged = executeCandidateAssetCheck(3, "active");
    expect(converged.error).toBeUndefined();
    expect(converged.curlCalls).toBe(3);
    expect(converged.curlArgs).toHaveLength(3);
    expect(converged.curlArgs[0]).toContain(
      "__worker_active_candidate_asset=12345-1-0",
    );
    expect(converged.curlArgs[1]).toContain(
      "__worker_active_candidate_asset=12345-2-0",
    );
    expect(converged.curlArgs[2]).toContain(
      "__worker_active_candidate_asset=12345-3-0",
    );
    expect(
      converged.curlArgs.some((args) =>
        args.includes("Cloudflare-Workers-Version-Overrides"),
      ),
    ).toBe(false);

    const exhausted = executeCandidateAssetCheck(13, "active");
    expect(exhausted.error).toBeDefined();
    expect(exhausted.curlCalls).toBe(12);
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

    const preflightRecovery = executeRecovery("preflight", 0, 200);
    expect(preflightRecovery.error).toBeUndefined();
    expect(preflightRecovery.deployCalls).toBe(1);

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
      "Could not read the production deployment from the Cloudflare control plane; recovery will not act.",
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
      "Could not read the production deployment after homepage verification; recovery did not complete.",
    );
  }, 60_000);
});

describe("automatic pull-request Worker previews", () => {
  it("parses as one publish job and one guarded retirement job", () => {
    expect(Object.keys(prPreviewWorkflowConfig.jobs).sort()).toEqual([
      "publish",
      "retire",
    ]);
    expect(Object.keys(prPreviewWorkflowConfig.on ?? {}).sort()).toEqual([
      "pull_request_target",
      "workflow_dispatch",
      "workflow_run",
    ]);
    expect(prPreviewWorkflowConfig.concurrency?.["cancel-in-progress"]).toBe(
      false,
    );
    expect(prPreviewWorkflowConfig.concurrency?.group).toContain(
      "zenml-io-worker-pr-preview-",
    );
    expect(prPreviewWorkflowConfig.concurrency?.group).toContain(
      "github.event_name == 'pull_request_target' && 'retire' || 'publish'",
    );
    expect(prPreviewWorkflowConfig.concurrency?.group).toContain(
      "github.event.pull_request.head.ref",
    );
    expect(prPreviewWorkflowConfig.concurrency?.group).toContain(
      "github.event.workflow_run.head_branch",
    );
    expect(prPreviewWorkflowConfig.concurrency?.group).toContain(
      "inputs.source_branch",
    );
    expect(prPreviewWorkflowConfig.jobs.publish.environment).toBe(
      "worker-pr-preview",
    );
    expect(prPreviewWorkflowConfig.jobs.retire.environment).toBe(
      "worker-pr-preview",
    );
    expect(prPreviewWorkflowConfig.jobs.publish.permissions).toEqual({
      actions: "read",
      contents: "read",
      "pull-requests": "write",
    });
    expect(prPreviewWorkflowConfig.jobs.retire.permissions).toEqual({
      contents: "read",
      "pull-requests": "write",
    });
    expect(prPreviewWorkflowConfig.jobs.publish.if).toContain(
      "github.ref == 'refs/heads/main'",
    );
    expect(prPreviewWorkflowConfig.jobs.retire.if).toContain(
      "github.event.pull_request.head.repo.full_name == github.repository",
    );
  });

  it("publishes only exact successful same-repository PR artifacts from trusted main", () => {
    expect(prPreviewWorkflow).toContain("workflow_run:");
    expect(prPreviewWorkflow).toContain(
      'workflows: ["Website CI and Worker Artifact"]',
    );
    expect(prPreviewWorkflow).toContain("types: [completed]");
    expect(prPreviewWorkflow).toContain("workflow_dispatch:");
    expect(prPreviewWorkflow).toContain("pull_request_target:");
    expect(prPreviewWorkflow).toContain("types: [closed]");
    expect(prPreviewWorkflow).toContain(
      ".head_repository.full_name == $repository",
    );
    expect(prPreviewWorkflow).toContain('.event == "pull_request"');
    expect(prPreviewWorkflow).toContain('.conclusion == "success"');
    expect(prPreviewWorkflow).toContain('.state == "open"');
    expect(prPreviewWorkflow).toContain(".draft == false");
    expect(prPreviewWorkflow).toContain('.user.login != "dependabot[bot]"');
    expect(prPreviewWorkflow).toContain(".merge_commit_sha == $build_commit");
    expect(prPreviewWorkflow).toContain(
      ".github/trusted/worker-artifact-workflow.yml",
    );
  });

  it("resolves the PR from the completed source run before fetching it directly", () => {
    const resolutionStep = workflowStep(
      prPreviewPublishSteps,
      "Resolve one current eligible pull request",
    );
    const selector = resolutionStep.env?.SOURCE_PR_NUMBER_SELECTOR;
    const resolutionRun = resolutionStep.run ?? "";
    const branch = "feat/kitaru-landing-terminal";
    const commit = "a".repeat(40);
    const selectorArgs = ["--arg", "branch", branch, "--arg", "commit", commit];
    const sourceRun = {
      pull_requests: [
        {
          head: { ref: branch, sha: commit },
          number: 296,
        },
      ],
    };

    expect(selector).toBeDefined();
    expect(
      execFileSync("jq", ["-er", ...selectorArgs, selector ?? ""], {
        input: JSON.stringify(sourceRun),
        stdio: ["pipe", "pipe", "pipe"],
      })
        .toString()
        .trim(),
    ).toBe("296");
    expectJqResult(selector ?? "", { pull_requests: [] }, true, selectorArgs);
    expectJqResult(
      selector ?? "",
      {
        pull_requests: [
          {
            head: { ref: branch, sha: "b".repeat(40) },
            number: 296,
          },
        ],
      },
      true,
      selectorArgs,
    );
    expectJqResult(
      selector ?? "",
      {
        pull_requests: [
          { head: { ref: branch, sha: commit }, number: 296 },
          { head: { ref: branch, sha: commit }, number: 297 },
        ],
      },
      false,
      selectorArgs,
    );
    expect(resolutionRun).toContain('"$SOURCE_PR_NUMBER_SELECTOR"');
    expect(resolutionRun).toContain('if [ -z "$pr_number" ]; then');
    expect(resolutionRun).toContain('if [ -n "$INPUT_PR_NUMBER" ]; then');
    expect(resolutionRun).toContain(
      '"repos/$GITHUB_REPOSITORY/pulls/$pr_number"',
    );
    expect(resolutionRun).toContain('"repos/$GITHUB_REPOSITORY/pulls"');
    expect(resolutionRun).toContain("source-pr-candidates.json");
  });

  it("uploads the exact validated artifact to one route-less dedicated Worker with a stable per-PR alias", () => {
    expect(prPreviewWorkflow).toContain("WORKER_NAME: zenml-io-v2-pr-preview");
    expect(prPreviewWorkflow).toContain("actions/download-artifact@");
    expect(prPreviewWorkflow).toContain("sha256sum --check");
    expectArtifactGuards(prPreviewWorkflow);
    expect(prPreviewWorkflow).toContain("preview_urls: true");
    expect(prPreviewWorkflow).toContain("workers_dev: false");
    expect(prPreviewWorkflow).toContain('--preview-alias "pr-$PR_NUMBER"');
    expect(prPreviewWorkflow).toMatch(
      /wrangler versions upload[\s\S]*?--config dist\/server\/upload-wrangler\.json[\s\S]*?--strict[\s\S]*?--preview-alias "pr-\$PR_NUMBER"/,
    );
    expect(prPreviewWorkflow).toContain(
      'preview_url="https://pr-$PR_NUMBER-$WORKER_NAME.$workers_subdomain.workers.dev"',
    );
    expect(prPreviewWorkflow).not.toContain("pnpm build");
    expect(prPreviewWorkflow).not.toContain("actions/checkout@");
    expect(prPreviewWorkflow).not.toContain("wrangler deploy ");
    expect(prPreviewWorkflow).not.toContain("wrangler pages deploy");
    expectNoRouteOrDnsMutation(prPreviewWorkflow);
  });

  it("keeps credentials and secret bindings out of PR-controlled preview code", () => {
    expect(prPreviewWorkflow).toContain("environment: worker-pr-preview");
    expect(prPreviewWorkflow).toContain("CLOUDFLARE_WORKERS_PR_PREVIEW_TOKEN");
    expect(prPreviewWorkflow).not.toContain(
      "PR_PREVIEW_SEGMENT_FORMS_WRITE_KEY",
    );
    expect(prPreviewWorkflow).not.toContain("PR_PREVIEW_TURNSTILE_SECRET_KEY");
    expect(prPreviewWorkflow).not.toContain("--secrets-file");
    expect(prPreviewWorkflow).toContain(
      '[.resources.bindings[]? | select(.type == "secret_text")] == []',
    );
    const baselineRun =
      workflowStep(prPreviewPublishSteps, "Verify dedicated Worker baseline")
        .run ?? "";
    expect(baselineRun).toContain("wrangler versions list");
    expect(baselineRun).toContain("wrangler versions view");
    expect(baselineRun).toContain(
      '[.resources.bindings[]? | select(.type == "secret_text")] == []',
    );
    expect(prPreviewWorkflow).not.toContain(
      "CLOUDFLARE_WORKERS_PRODUCTION_TOKEN",
    );
    expect(prPreviewWorkflow).not.toContain("CLOUDFLARE_WORKERS_ROUTES_TOKEN");
    expect(prPreviewWorkflow).not.toContain(
      "SEGMENT_FORMS_WRITE_KEY: $" + "{{ secrets.SEGMENT_FORMS_WRITE_KEY }}",
    );
    expect(prPreviewWorkflow).not.toContain(
      "TURNSTILE_SECRET_KEY: $" + "{{ secrets.TURNSTILE_SECRET_KEY }}",
    );
  });

  it("serializes mutations, preserves deployments, posts a sticky URL, and retires closed PR aliases", () => {
    expect(prPreviewWorkflow).toContain("github.event.pull_request.head.ref");
    expect(prPreviewWorkflow).toContain(
      "github.event.workflow_run.head_branch",
    );
    expect(prPreviewWorkflow).toContain(
      "github.event_name == 'pull_request_target' && 'retire' || 'publish'",
    );
    expect(prPreviewWorkflow).toContain("inputs.source_branch");
    expect(prPreviewWorkflow).toContain("cancel-in-progress: false");
    expect(prPreviewWorkflow).toContain(
      "The active PR-preview deployment changed",
    );
    expect(prPreviewWorkflow).toContain("<!-- zenml-worker-pr-preview -->");
    expect(prPreviewWorkflow).toContain('.user.login == "github-actions[bot]"');
    expect(prPreviewWorkflow).toContain("--paginate");
    expect(prPreviewWorkflow).toContain("Record preview retirement marker");
    expect(prPreviewWorkflow).toContain(
      "Multiple PR-preview marker comments exist",
    );
    expect(prPreviewWorkflow).toContain("PR preview retired");
    expect(prPreviewWorkflow).toContain('--preview-alias "pr-$PR_NUMBER"');
    expect(prPreviewWorkflow).toContain("return new Response");
    expect(prPreviewWorkflow).toContain("status: 410");
  });

  it("allows bounded propagation time before failing retirement verification", () => {
    const verifyRetiredRun =
      workflowStep(
        prPreviewRetireSteps,
        "Verify the alias is retired without deployment changes",
      ).run ?? "";
    expect(verifyRetiredRun).toContain("for attempt in {1..10}");
    expect(verifyRetiredRun).toContain(
      'if [ "$retired_status" = "410" ]; then',
    );
    expect(verifyRetiredRun).toContain('if [ "$attempt" -lt 10 ]; then');
    expect(verifyRetiredRun).toContain("sleep 3");
    expect(verifyRetiredRun).toContain(
      "PR preview alias did not retire after 10 attempts",
    );
    expect(verifyRetiredRun).toContain(
      'if [ "$retired_status" != "410" ]; then',
    );
  });

  it("cannot let an in-flight publish resurrect a closed PR alias", () => {
    const uploadIndex = prPreviewPublishSteps.findIndex(
      (step) => step.name === "Upload exact version with stable PR alias",
    );
    const closeCheckIndex = prPreviewPublishSteps.findIndex(
      (step) => step.name === "Retire alias if the PR closed during upload",
    );
    const verifyIndex = prPreviewPublishSteps.findIndex(
      (step) => step.name === "Verify isolated public preview",
    );
    expect(uploadIndex).toBeGreaterThan(-1);
    expect(closeCheckIndex).toBeGreaterThan(uploadIndex);
    expect(verifyIndex).toBeGreaterThan(closeCheckIndex);

    const uploadRun = prPreviewPublishSteps[uploadIndex].run ?? "";
    const closeCheckRun = prPreviewPublishSteps[closeCheckIndex].run ?? "";
    const closeCheck = prPreviewPublishSteps[closeCheckIndex];
    const verify = prPreviewPublishSteps[verifyIndex];
    expect(uploadRun).toMatch(
      /set \+e\n\s*wrangler versions upload[\s\S]*?upload_status=\$\?\n\s*set -e\n\s*echo "upload_attempted=true" >> "\$GITHUB_OUTPUT"\n\s*if \[ "\$upload_status" -ne 0 \]; then\n\s*exit "\$upload_status"/,
    );
    expect(closeCheck.if).toBe(
      "always() && steps.upload.outputs.upload_attempted == 'true'",
    );
    expect(verify.if).toBe("steps.upload.outcome == 'success'");
    expect(closeCheckRun).toContain(
      'gh api "repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER" --jq .state',
    );
    expect(closeCheckRun).toContain('--preview-alias "pr-$PR_NUMBER"');
    expect(closeCheckRun).toContain("--strict");
    expect(closeCheckRun).toContain("status: 410");
    expect(closeCheckRun).toContain("exit 1");
  });

  it("keys manual and automatic publishes by the same verified source branch", () => {
    expect(prPreviewWorkflow).toContain("source_branch:");
    expect(prPreviewWorkflow).toContain(
      "INPUT_SOURCE_BRANCH: $" + "{{ inputs.source_branch }}",
    );
    expect(prPreviewWorkflow).toContain(
      '[ -n "$INPUT_SOURCE_BRANCH" ] && [ "$INPUT_SOURCE_BRANCH" != "$source_branch" ]',
    );
    expect(prPreviewWorkflow).toContain(
      "The supplied source branch does not own this exact CI run.",
    );
  });

  it("records retirement before upload and fails closed on comment lookup errors", () => {
    const markerIndex = prPreviewPublishSteps.findIndex(
      (step) => step.name === "Record preview retirement marker",
    );
    const uploadIndex = prPreviewPublishSteps.findIndex(
      (step) => step.name === "Upload exact version with stable PR alias",
    );
    expect(markerIndex).toBeGreaterThan(-1);
    expect(uploadIndex).toBeGreaterThan(markerIndex);

    const markerRun = prPreviewPublishSteps[markerIndex].run ?? "";
    const retirementCheckRun =
      workflowStep(prPreviewRetireSteps, "Check whether this PR had a preview")
        .run ?? "";
    for (const run of [markerRun, retirementCheckRun]) {
      expect(run).toContain("gh api");
      expect(run).toContain("--paginate");
      expect(run).toContain('> "$RUNNER_TEMP/pr-preview-comment-ids.txt"');
      expect(run).toContain(
        'mapfile -t comment_ids < "$RUNNER_TEMP/pr-preview-comment-ids.txt"',
      );
      expect(run).not.toContain("< <(");
    }
  });

  it("uses strict mode on every state-changing preview-alias upload", () => {
    const publishRun =
      workflowStep(
        prPreviewPublishSteps,
        "Upload exact version with stable PR alias",
      ).run ?? "";
    const retireRun =
      workflowStep(
        prPreviewRetireSteps,
        "Replace the closed PR alias with a tombstone",
      ).run ?? "";
    expect(publishRun).toMatch(
      /wrangler versions upload \\\n\s+--config dist\/server\/upload-wrangler\.json \\\n\s+--strict \\\n\s+--preview-alias "pr-\$PR_NUMBER"/,
    );
    expect(retireRun).toMatch(
      /wrangler versions upload \\\n\s+--config "\$retire_dir\/wrangler\.json" \\\n\s+--strict \\\n\s+--preview-alias "pr-\$PR_NUMBER"/,
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
