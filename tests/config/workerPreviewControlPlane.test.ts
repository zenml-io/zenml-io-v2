import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

interface WorkflowStep {
  env?: Record<string, string>;
  if?: string;
  id?: string;
  name: string;
  run?: string;
  uses?: string;
  with?: Record<string, string | number>;
}

interface BootstrapWorkflow {
  concurrency: {
    "cancel-in-progress": boolean;
    group: string;
  };
  env: {
    WORKER_NAME: string;
  };
  jobs: {
    bootstrap: {
      environment: string;
      if: string;
      steps: WorkflowStep[];
      "timeout-minutes": number;
    };
  };
  on: {
    workflow_dispatch: {
      inputs: {
        self_reviewed: {
          required: boolean;
          type: string;
        };
      };
    };
  };
  permissions: Record<string, never>;
}

interface ManualPreviewWorkflow {
  concurrency: {
    "cancel-in-progress": boolean;
    group: string;
  };
  env: {
    SOURCE_RUN_PREDICATE: string;
    STAGING_ROUTE: string;
    WORKER_NAME: string;
  };
  jobs: Record<
    string,
    {
      environment: string;
      if: string;
      permissions: Record<string, string>;
      steps: WorkflowStep[];
      "timeout-minutes": number;
    }
  >;
  on: {
    workflow_dispatch: {
      inputs: Record<
        string,
        {
          required: boolean;
          type: string;
        }
      >;
    };
  };
  permissions: Record<string, never>;
}

const bootstrapWorkflowText = readFileSync(
  ".github/workflows/bootstrap-worker-preview.yml",
  "utf8",
);
const bootstrapWorkflow = parse(bootstrapWorkflowText) as BootstrapWorkflow;
const bootstrapJob = bootstrapWorkflow.jobs.bootstrap;
const steps = Object.fromEntries(
  bootstrapJob.steps.map((step) => [step.name, step]),
);

function step(name: string): WorkflowStep {
  const workflowStep = steps[name];
  expect(workflowStep, `missing workflow step: ${name}`).toBeDefined();
  return workflowStep;
}

function jqProgramWritingTo(run: string, filename: string): string {
  const destination = `' "$RUNNER_TEMP/${filename}" > /dev/null`;
  const destinationIndex = run.indexOf(destination);
  expect(
    destinationIndex,
    `missing jq destination for ${filename}`,
  ).toBeGreaterThan(-1);
  const commandPrefix = run.slice(0, destinationIndex);
  const commandIndex = commandPrefix.lastIndexOf("jq -e");
  expect(commandIndex, `missing jq command for ${filename}`).toBeGreaterThan(
    -1,
  );
  const programStart = commandPrefix.indexOf("'", commandIndex);
  expect(programStart, `missing jq program for ${filename}`).toBeGreaterThan(
    -1,
  );
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

describe("preview Worker bootstrap workflow", () => {
  it("is a self-reviewed manual action restricted to trusted main", () => {
    expect(Object.keys(bootstrapWorkflow.on)).toEqual(["workflow_dispatch"]);
    expect(
      bootstrapWorkflow.on.workflow_dispatch.inputs.self_reviewed,
    ).toMatchObject({
      required: true,
      type: "boolean",
    });
    expect(bootstrapWorkflow.permissions).toEqual({});
    expect(bootstrapJob.if).toBe("github.ref == 'refs/heads/main'");
    expect(bootstrapJob.environment).toBe("worker-preview");
    expect(bootstrapJob["timeout-minutes"]).toBe(10);
    expect(step("Require explicit self-review").if).toBe(
      "inputs.self_reviewed != true",
    );
  });

  it("serializes every preview mutation behind the shared lock", () => {
    expect(bootstrapWorkflow.concurrency).toEqual({
      group: "zenml-io-worker-preview",
      "cancel-in-progress": false,
    });
  });

  it("targets only the fixed preview Worker and refuses an existing Worker", () => {
    const refusalStep = step("Refuse to overwrite an existing Worker");

    expect(bootstrapWorkflow.env.WORKER_NAME).toBe(
      "zenml-io-v2-worker-preview",
    );
    expect(
      bootstrapWorkflowText.match(/zenml-io-v2-worker-preview/g),
    ).toHaveLength(1);
    expect(refusalStep.run).toContain(
      "/accounts/$CLOUDFLARE_ACCOUNT_ID/workers/scripts/$WORKER_NAME",
    );
    expect(refusalStep.run).toContain("404) ;;");
    expect(refusalStep.run).toContain(
      "Preview Worker already exists; refusing to overwrite it.",
    );
    expect(refusalStep.run).toContain(
      "Could not prove the preview Worker is absent",
    );
  });

  it("uses a pinned Wrangler to deploy only an inert private placeholder", () => {
    const preparationStep = step("Prepare inert private placeholder");
    const deployStep = step(
      "Create the route-less Worker with its inert first deployment",
    );
    const disableStep = step(
      "Reassert that public Worker endpoints are disabled",
    );

    expect(step("Install pinned Wrangler").run).toBe(
      "npm install --global wrangler@4.110.0",
    );
    expect(preparationStep.run).toContain('--arg name "$WORKER_NAME"');
    expect(preparationStep.run).toContain("name: $name");
    expect(preparationStep.run).toContain("workers_dev: false");
    expect(preparationStep.run).toContain("preview_urls: false");
    expect(preparationStep.run).toContain("status: 503");
    expect(deployStep.run).toContain("wrangler deploy");
    expect(deployStep.run).toContain("--strict");
    expect(deployStep.run).not.toContain("wrangler versions upload");
    expect(disableStep.run).toContain(
      '\'{"enabled":false,"previews_enabled":false}\'',
    );
    expect(bootstrapWorkflowText).not.toContain("wrangler versions deploy");

    const stepNames = bootstrapJob.steps.map(({ name }) => name);
    expect(stepNames.indexOf(deployStep.name)).toBeLessThan(
      stepNames.indexOf(disableStep.name),
    );
  });

  it("verifies the Worker stays unreachable and has no wider authority", () => {
    const verificationStep = step(
      "Verify the Worker is private, route-less, domain-less, and recorded",
    );

    expect(verificationStep.if).toBe(
      "$" + "{{ always() && steps.deploy.outcome != 'skipped' }}",
    );
    expect(verificationStep.run).toContain(
      "/workers/scripts/$WORKER_NAME/subdomain",
    );
    expect(verificationStep.run).toContain(
      ".result.enabled == false and .result.previews_enabled == false",
    );
    expect(verificationStep.run).toContain('has("routes")');
    expect(verificationStep.run).toContain(".routes == null");
    expect(verificationStep.run).toContain(".routes | type");
    expect(verificationStep.run).toContain(".routes | length");
    expect(verificationStep.run).not.toContain(".routes // []");
    expect(verificationStep.run).toContain("/workers/domains");
    expect(verificationStep.run).toContain(
      "select(.service == $worker)] | length == 0",
    );
    expect(verificationStep.run).toContain("wrangler versions list");
    expect(verificationStep.run).toContain("wrangler deployments list");
    expect(verificationStep.run).toContain(".[0].percentage == 100");
    expect(bootstrapWorkflowText).toContain(
      "secrets.CLOUDFLARE_WORKERS_PREVIEW_TOKEN",
    );
    expect(bootstrapWorkflowText).not.toContain(
      "secrets.CLOUDFLARE_WORKERS_PRODUCTION_TOKEN",
    );
    expect(bootstrapWorkflowText).not.toContain("TURNSTILE_SECRET_KEY");
    expect(bootstrapWorkflowText).not.toContain("SEGMENT_FORMS_WRITE_KEY");
    expect(bootstrapWorkflowText).not.toContain("wrangler routes");
    expect(bootstrapWorkflowText).not.toContain("wrangler dns");
    expect(bootstrapWorkflowText).not.toContain("wrangler pages");
    expect(bootstrapWorkflowText).not.toContain("wrangler delete");
    expect(bootstrapWorkflowText).not.toContain('"route":');
    expect(bootstrapWorkflowText).not.toContain('"routes":');
    expect(bootstrapWorkflowText).not.toContain('"domain":');
    expect(bootstrapWorkflowText).not.toContain('"domains":');
  });

  it("bounds every direct Cloudflare request and the complete job", () => {
    const curlSteps = bootstrapJob.steps.filter(({ run }) =>
      run?.includes("curl"),
    );

    expect(curlSteps.length).toBeGreaterThan(0);
    for (const curlStep of curlSteps) {
      expect(curlStep.run).toContain("--connect-timeout 10");
      expect(curlStep.run).toContain("--max-time 30");
    }
  });
});

const uploadWorkflowText = readFileSync(
  ".github/workflows/upload-worker-preview.yml",
  "utf8",
);
const artifactWorkflowText = readFileSync(
  ".github/workflows/deploy.yml",
  "utf8",
);
const trustedArtifactWorkflowText = readFileSync(
  ".github/trusted/worker-artifact-workflow.yml",
  "utf8",
);
const uploadWorkflow = parse(uploadWorkflowText) as ManualPreviewWorkflow;
const uploadJob = uploadWorkflow.jobs.upload;
const uploadSteps = Object.fromEntries(
  uploadJob.steps.map((workflowStep) => [workflowStep.name, workflowStep]),
);

function uploadStep(name: string): WorkflowStep {
  const workflowStep = uploadSteps[name];
  expect(workflowStep, `missing upload workflow step: ${name}`).toBeDefined();
  return workflowStep;
}

function expectReviewedArtifactWorkflowGuard(run: string | undefined): void {
  expect(run).toContain(
    "contents/.github/workflows/deploy.yml?ref=$build_commit",
  );
  expect(run).toContain(
    "contents/.github/trusted/worker-artifact-workflow.yml?ref=$GITHUB_SHA",
  );
  expect(run).not.toContain(
    "contents/.github/trusted/worker-artifact-workflow.yml?ref=main",
  );
  expect(run).toContain(
    'if [ "$source_workflow_blob" != "$trusted_workflow_blob" ]; then',
  );
}

describe("preview Worker upload workflow", () => {
  it("is a self-reviewed trusted-main action with exact source inputs", () => {
    expect(Object.keys(uploadWorkflow.on)).toEqual(["workflow_dispatch"]);
    expect(
      Object.keys(uploadWorkflow.on.workflow_dispatch.inputs).sort(),
    ).toEqual([
      "artifact_sha256",
      "pr_number",
      "self_reviewed",
      "source_branch",
      "source_commit",
      "source_run_id",
    ]);
    expect(
      uploadWorkflow.on.workflow_dispatch.inputs.self_reviewed,
    ).toMatchObject({
      required: true,
      type: "boolean",
    });
    expect(uploadWorkflow.on.workflow_dispatch.inputs.pr_number).toMatchObject({
      required: false,
      type: "string",
    });
    expect(uploadWorkflow.permissions).toEqual({});
    expect(uploadJob.if).toBe("github.ref == 'refs/heads/main'");
    expect(uploadJob.environment).toBe("worker-preview");
    expect(uploadJob.permissions).toEqual({
      actions: "read",
      contents: "read",
      "pull-requests": "read",
    });
    expect(uploadJob["timeout-minutes"]).toBe(15);
    expect(uploadWorkflow.concurrency).toEqual({
      group: "zenml-io-worker-preview",
      "cancel-in-progress": false,
    });
  });

  it("validates an exact same-repository PR or current-main run", () => {
    const validationStep = uploadStep("Validate dispatch identifiers");
    const sourceStep = uploadStep(
      "Verify the exact source run and source state",
    );

    expect(validationStep.run).toContain(
      '[[ -z "$PR_NUMBER" || "$PR_NUMBER" =~ ^[0-9]+$ ]]',
    );
    expect(validationStep.run).toContain('[[ "$SOURCE_RUN_ID" =~ ^[0-9]+$ ]]');
    expect(validationStep.run).toContain(
      '[[ "$SOURCE_COMMIT" =~ ^[0-9a-f]{40}$ ]]',
    );
    expect(validationStep.run).toContain(
      'git check-ref-format --branch "$SOURCE_BRANCH"',
    );
    expect(validationStep.run).toContain(
      '[[ "$ARTIFACT_SHA256" =~ ^[0-9a-f]{64}$ ]]',
    );
    expect(sourceStep.run).toContain(
      "repos/$GITHUB_REPOSITORY/actions/runs/$SOURCE_RUN_ID",
    );
    expect(sourceStep.run).toContain('"$SOURCE_RUN_PREDICATE"');
    expect(sourceStep.run).toContain(
      '--arg path ".github/workflows/deploy.yml"',
    );
    expect(uploadWorkflow.env.SOURCE_RUN_PREDICATE).toContain(".path == $path");
    expect(uploadWorkflow.env.SOURCE_RUN_PREDICATE).toContain(
      ".head_repository.full_name == $repository",
    );
    expect(uploadWorkflow.env.SOURCE_RUN_PREDICATE).toContain(
      '$branch == "main"',
    );
    expect(uploadWorkflow.env.SOURCE_RUN_PREDICATE).toContain(
      "$commit == $trusted_commit",
    );
    expect(uploadWorkflow.env.SOURCE_RUN_PREDICATE).toContain(
      "$commit == $live_main_commit",
    );
    expect(uploadWorkflow.env.SOURCE_RUN_PREDICATE).toContain(
      '.event == "push"',
    );
    expect(uploadWorkflow.env.SOURCE_RUN_PREDICATE).toContain(
      '.event == "pull_request"',
    );
    expect(sourceStep.run).toContain(
      "repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER",
    );
    expect(sourceStep.run).toContain(".head.repo.full_name == $repository");
    expect(sourceStep.run).toContain(".head.sha == $commit");
    expect(sourceStep.run).not.toContain("contents/.github/workflows/");

    for (const workflowStep of uploadJob.steps) {
      expect(workflowStep.run ?? "").not.toContain("${{ inputs.");
    }
  });

  it("pins the reviewed artifact producer without enabling it on main", () => {
    // Keep the inactive trusted copy byte-identical to the reviewed producer.
    const gitBlobSha = createHash("sha1")
      .update(
        `blob ${Buffer.byteLength(trustedArtifactWorkflowText)}\0${trustedArtifactWorkflowText}`,
      )
      .digest("hex");

    expect(gitBlobSha).toBe("713fbaf5160a1a3b710ccb89b2a4a3837cad9a21");
    expect(trustedArtifactWorkflowText).toBe(artifactWorkflowText);
    expect(trustedArtifactWorkflowText).toContain(
      "name: Website CI and Worker Artifact",
    );
    expect(trustedArtifactWorkflowText).toContain(
      "Package the validated Worker artifact",
    );
    expect(trustedArtifactWorkflowText).toContain(
      "Publish the validated Worker artifact",
    );
    expect(trustedArtifactWorkflowText).not.toContain(
      "cloudflare/wrangler-action@",
    );
    expect(trustedArtifactWorkflowText).not.toContain("CLOUDFLARE_API_TOKEN");
  });

  it("downloads and verifies only the named run artifact", () => {
    const downloadStep = uploadStep("Download the exact CI artifact");
    const provenanceStep = uploadStep(
      "Verify artifact provenance and checksum",
    );
    const safetyStep = uploadStep("Reject an unsafe Worker artifact");

    expect(downloadStep.uses).toBe(
      "actions/download-artifact@d3f86a106a0bac45b974a628896c90dbdf5c8093",
    );
    expect(downloadStep.with).toMatchObject({
      name: "worker-dist",
      path: "candidate",
      "run-id": "$" + "{{ inputs.source_run_id }}",
    });
    expect(provenanceStep.run).toContain(
      'printf "%s  worker-dist.tar.gz\\n" "$ARTIFACT_SHA256"',
    );
    expect(provenanceStep.run).toContain("sha256sum --check");
    expect(provenanceStep.run).toContain(
      ".artifact_sha256 == $artifact_sha256",
    );
    expect(provenanceStep.run).toContain(".source_branch == $branch");
    expect(provenanceStep.run).toContain(".source_commit == $commit");
    expect(provenanceStep.run).toContain(".run_id == $run_id");
    expect(provenanceStep.run).toContain(
      'source_event="$(< "$RUNNER_TEMP/source-event")"',
    );
    expect(provenanceStep.run).toContain(".event_name == $source_event");
    expect(provenanceStep.run).toContain(
      'build_commit="$(< "$RUNNER_TEMP/build-commit")"',
    );
    expect(provenanceStep.run).toContain(".build_commit == $build_commit");
    expectReviewedArtifactWorkflowGuard(provenanceStep.run);
    expect(safetyStep.run).toContain("tar -tzf worker-dist.tar.gz");
    expect(safetyStep.run).toContain("tar -tvzf worker-dist.tar.gz");
    expect(safetyStep.run).toContain(
      "grep -Eq '(^/|(^|/)\\.\\.(/|$))' \"$RUNNER_TEMP/archive-paths.txt\"",
    );
    expect(safetyStep.run).not.toContain("tar -tzf worker-dist.tar.gz |");
    expect(safetyStep.run).toContain("dist/server/wrangler.json");
    expect(safetyStep.run).toContain("dist/server/entry.mjs");
    expect(safetyStep.run).toContain(".wrangler/deploy/config.json");
    expect(provenanceStep.run).toMatch(
      /\(\.artifact_contract == "astro-cloudflare-v6" or\s+\.artifact_contract == "astro-cloudflare-v7"\)/,
    );
  });

  it("uploads one private inactive version to only the fixed preview Worker", () => {
    const workerStep = uploadStep(
      "Verify the preview Worker has only the protected staging route",
    );
    const configStep = uploadStep("Prepare trusted preview configuration");
    const captureDeploymentStep = uploadStep(
      "Capture active deployment before upload",
    );
    const uploadVersionStep = uploadStep("Upload one inactive preview version");
    const verifyVersionStep = uploadStep(
      "Verify uploaded version provenance and bindings",
    );

    expect(uploadWorkflow.env.WORKER_NAME).toBe("zenml-io-v2-worker-preview");
    expect(uploadWorkflow.env.STAGING_ROUTE).toBe(
      "astro-workers-staging.zenml.io/*",
    );
    expect(
      uploadWorkflowText.match(/zenml-io-v2-worker-preview/g),
    ).toHaveLength(1);
    expect(workerStep.run).toContain(
      'worker_url="$api_base/workers/scripts/$WORKER_NAME"',
    );
    expect(workerStep.run).toContain('"$worker_url/subdomain"');
    expect(workerStep.run).toContain(
      ".result.enabled == false and .result.previews_enabled == false",
    );
    expect(workerStep.run).toContain('has("routes")');
    expect(workerStep.run).toContain(
      "/workers/domains?service=$WORKER_NAME&per_page=100",
    );
    expect(workerStep.run).toContain(".result_info.total_count == 0");
    expect(configStep.run).toContain("name: env.WORKER_NAME");
    expect(configStep.run).toContain("workers_dev: false");
    expect(configStep.run).toContain("preview_urls: false");
    expect(configStep.run).toContain(".generated_config_sha256");
    expect(configStep.run).toContain("compatibility_flags");
    expect(configStep.run).toContain("rules");
    expect(uploadWorkflowText).not.toContain("preview_urls: true");
    expect(captureDeploymentStep.run).toContain("wrangler deployments list");
    expect(captureDeploymentStep.run).toContain(
      "deployments-before-upload.json",
    );
    expect(uploadVersionStep.run).toContain("wrangler versions upload");
    expect(uploadVersionStep.run).toContain("--dry-run");
    expect(uploadVersionStep.run).toContain("source-run-before-upload.json");
    expect(uploadVersionStep.run).toContain("source-pr-before-upload.json");
    expect(uploadVersionStep.run).toContain(".head.sha == $commit");
    expect(uploadVersionStep.run).toContain(
      ".merge_commit_sha == $build_commit",
    );
    expect(uploadVersionStep.run).toContain(
      'build_commit="$(< "$RUNNER_TEMP/build-commit")"',
    );
    expect(uploadVersionStep.run).not.toContain(
      'jq -er .merge_commit_sha "$RUNNER_TEMP/source-pr-before-upload.json"',
    );
    expectReviewedArtifactWorkflowGuard(uploadVersionStep.run);
    const trustedWorkflowIndex =
      uploadVersionStep.run?.indexOf(
        "contents/.github/trusted/worker-artifact-workflow.yml?ref=$GITHUB_SHA",
      ) ?? -1;
    const prHeadRecheckIndex =
      uploadVersionStep.run?.indexOf(
        "repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER",
      ) ?? -1;
    const liveMainRecheckIndex =
      uploadVersionStep.run?.lastIndexOf(
        "repos/$GITHUB_REPOSITORY/git/ref/heads/main",
      ) ?? -1;
    const uploadIndex =
      uploadVersionStep.run?.lastIndexOf("wrangler versions upload") ?? -1;
    expect(trustedWorkflowIndex).toBeGreaterThan(-1);
    expect(prHeadRecheckIndex).toBeGreaterThan(trustedWorkflowIndex);
    expect(liveMainRecheckIndex).toBeGreaterThan(prHeadRecheckIndex);
    expect(uploadIndex).toBeGreaterThan(liveMainRecheckIndex);
    expect(uploadIndex).toBeGreaterThan(prHeadRecheckIndex);
    expect(uploadVersionStep.run).toContain("--secrets-file");
    expect(uploadVersionStep.run).not.toContain("--preview-alias");
    expect(uploadWorkflowText).not.toContain("--preview-alias");
    expect(uploadVersionStep.run).not.toContain("wrangler versions deploy");
    expect(uploadVersionStep.env).toMatchObject({
      SEGMENT_FORMS_WRITE_KEY:
        "$" + "{{ secrets.WORKERS_PREVIEW_SEGMENT_FORMS_WRITE_KEY }}",
      TURNSTILE_SECRET_KEY:
        "$" + "{{ secrets.WORKERS_PREVIEW_TURNSTILE_SECRET_KEY }}",
    });
    expect(verifyVersionStep.run).toContain('select(.type == "secret_text")');
    expect(verifyVersionStep.run).toContain("TURNSTILE_SECRET_KEY");
    expect(verifyVersionStep.run).toContain("SEGMENT_FORMS_WRITE_KEY");
    expect(verifyVersionStep.run).toContain("deployments-after-upload.json");
    expect(verifyVersionStep.run).toContain(
      "deployments-before-upload.canonical.json",
    );
    expect(verifyVersionStep.run).toContain("cmp");
    expect(uploadWorkflowText).not.toContain(
      "secrets.CLOUDFLARE_WORKERS_PRODUCTION_TOKEN",
    );
    expect(uploadWorkflowText).not.toContain("wrangler routes");
    expect(uploadWorkflowText).not.toContain("wrangler dns");
    expect(uploadWorkflowText).not.toContain("wrangler pages");
    expect(uploadWorkflowText).not.toContain("wrangler delete");
    const preserveStep = uploadStep("Preserve preview upload metadata");
    expect(preserveStep.if).toBe("always()");
    expect(preserveStep.uses).toBe(
      "actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02",
    );
    expect(preserveStep.with).toMatchObject({
      "if-no-files-found": "warn",
    });
    expect(String(preserveStep.with?.path)).toContain(
      "candidate/upload-result.json",
    );
  });

  it("accepts only exact open-PR or current-main source runs", () => {
    const sourceStep = uploadStep(
      "Verify the exact source run and source state",
    );
    const uploadVersionStep = uploadStep("Upload one inactive preview version");
    const program = uploadWorkflow.env.SOURCE_RUN_PREDICATE;
    expect(sourceStep.run).toContain('"$SOURCE_RUN_PREDICATE"');
    expect(uploadVersionStep.run).toContain('"$SOURCE_RUN_PREDICATE"');
    const repository = "zenml-io/zenml-io-v2";
    const prCommit = "a".repeat(40);
    const mainCommit = "b".repeat(40);
    const commonArgs = [
      "--arg",
      "path",
      ".github/workflows/deploy.yml",
      "--arg",
      "repository",
      repository,
    ];
    const sourceRunArgs = (
      branch: string,
      commit: string,
      pr: string,
      trustedCommit = mainCommit,
      liveMainCommit = mainCommit,
    ) => [
      ...commonArgs,
      "--arg",
      "branch",
      branch,
      "--arg",
      "commit",
      commit,
      "--arg",
      "live_main_commit",
      liveMainCommit,
      "--arg",
      "pr",
      pr,
      "--arg",
      "trusted_commit",
      trustedCommit,
    ];
    const pullRequestRun = {
      conclusion: "success",
      event: "pull_request",
      head_branch: "feat/astro5-workers-runtime",
      head_repository: { full_name: repository },
      head_sha: prCommit,
      path: ".github/workflows/deploy.yml",
      pull_requests: [{ number: 171 }],
    };
    const pushRun = {
      conclusion: "success",
      event: "push",
      head_branch: "main",
      head_repository: { full_name: repository },
      head_sha: mainCommit,
      path: ".github/workflows/deploy.yml",
      pull_requests: [],
    };

    expectJqResult(
      program,
      pullRequestRun,
      true,
      sourceRunArgs("feat/astro5-workers-runtime", prCommit, "171"),
    );
    expectJqResult(
      program,
      pushRun,
      true,
      sourceRunArgs("main", mainCommit, ""),
    );
    expectJqResult(
      program,
      { ...pushRun, head_branch: "feature" },
      false,
      sourceRunArgs("feature", mainCommit, ""),
    );
    expectJqResult(
      program,
      pushRun,
      false,
      sourceRunArgs("main", mainCommit, "", "c".repeat(40)),
    );
    expectJqResult(
      program,
      pushRun,
      false,
      sourceRunArgs("main", mainCommit, "", mainCommit, "c".repeat(40)),
    );
    expectJqResult(
      program,
      { ...pushRun, conclusion: "failure" },
      false,
      sourceRunArgs("main", mainCommit, ""),
    );
    expectJqResult(
      program,
      { ...pullRequestRun, conclusion: "cancelled" },
      false,
      sourceRunArgs("feat/astro5-workers-runtime", prCommit, "171"),
    );
    expectJqResult(
      program,
      pullRequestRun,
      false,
      sourceRunArgs("feat/astro5-workers-runtime", prCommit, ""),
    );
    expectJqResult(
      program,
      pushRun,
      false,
      sourceRunArgs("main", mainCommit, "171"),
    );
    expectJqResult(
      program,
      { ...pullRequestRun, pull_requests: [{ number: 999 }] },
      false,
      sourceRunArgs("feat/astro5-workers-runtime", prCommit, "171"),
    );
    expectJqResult(
      program,
      { ...pushRun, path: ".github/workflows/other.yml" },
      false,
      sourceRunArgs("main", mainCommit, ""),
    );
    expectJqResult(
      program,
      {
        ...pushRun,
        head_repository: { full_name: "attacker/zenml-io-v2" },
      },
      false,
      sourceRunArgs("main", mainCommit, ""),
    );
  });

  it("executes the workflow privacy predicates against safe and public states", () => {
    const workerStep = uploadStep(
      "Verify the preview Worker has only the protected staging route",
    );
    const run = workerStep.run ?? "";
    const subdomainProgram = jqProgramWritingTo(run, "worker-subdomain.json");
    const routesProgram = jqProgramWritingTo(run, "workers-before-upload.json");
    const domainsProgram = jqProgramWritingTo(run, "worker-domains.json");
    const workerArgs = [
      "--arg",
      "route",
      "astro-workers-staging.zenml.io/*",
      "--arg",
      "worker",
      "zenml-io-v2-worker-preview",
    ];

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
        result: [
          {
            id: "zenml-io-v2-worker-preview",
            routes: [
              {
                pattern: "astro-workers-staging.zenml.io/*",
                script: "zenml-io-v2-worker-preview",
              },
            ],
          },
        ],
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
            id: "zenml-io-v2-worker-preview",
            routes: ["astro-workers-staging.zenml.io/*"],
          },
        ],
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
            id: "zenml-io-v2-worker-preview",
            routes: [],
          },
        ],
        success: true,
      },
      false,
      workerArgs,
    );
    for (const routes of [
      [
        {
          pattern: "www.zenml.io/*",
          script: "zenml-io-v2-worker-preview",
        },
      ],
      [
        {
          pattern: "astro-workers-staging.zenml.io/*",
          script: "zenml-io-v2-worker",
        },
      ],
      [
        {
          pattern: "astro-workers-staging.zenml.io/*",
          script: "zenml-io-v2-worker-preview",
        },
        {
          pattern: "extra.zenml.io/*",
          script: "zenml-io-v2-worker-preview",
        },
      ],
    ]) {
      expectJqResult(
        routesProgram,
        {
          result: [{ id: "zenml-io-v2-worker-preview", routes }],
          success: true,
        },
        false,
        workerArgs,
      );
    }

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
            hostname: "preview.example.com",
            service: "zenml-io-v2-worker-preview",
          },
        ],
        result_info: { total_count: 1 },
        success: true,
      },
      false,
      workerArgs,
    );
  });

  it("executes the final PR merge-commit guard against current and stale states", () => {
    const uploadVersionStep = uploadStep("Upload one inactive preview version");
    const program = jqProgramWritingTo(
      uploadVersionStep.run ?? "",
      "source-pr-before-upload.json",
    );
    const commit = "a".repeat(40);
    const buildCommit = "b".repeat(40);
    const args = [
      "--arg",
      "branch",
      "feat/astro5-workers-runtime",
      "--arg",
      "build_commit",
      buildCommit,
      "--arg",
      "commit",
      commit,
      "--arg",
      "repository",
      "zenml-io/zenml-io-v2",
    ];
    const currentPullRequest = {
      state: "open",
      head: {
        ref: "feat/astro5-workers-runtime",
        repo: { full_name: "zenml-io/zenml-io-v2" },
        sha: commit,
      },
      merge_commit_sha: buildCommit,
    };

    expectJqResult(program, currentPullRequest, true, args);
    expectJqResult(
      program,
      { ...currentPullRequest, merge_commit_sha: "c".repeat(40) },
      false,
      args,
    );
    expectJqResult(
      program,
      { ...currentPullRequest, state: "closed" },
      false,
      args,
    );
  });
});

const activationWorkflowText = readFileSync(
  ".github/workflows/activate-worker-preview.yml",
  "utf8",
);
const activationWorkflow = parse(
  activationWorkflowText,
) as ManualPreviewWorkflow;
const activationJob = activationWorkflow.jobs.activate;
const activationSteps = Object.fromEntries(
  activationJob.steps.map((workflowStep) => [workflowStep.name, workflowStep]),
);

function activationStep(name: string): WorkflowStep {
  const workflowStep = activationSteps[name];
  expect(
    workflowStep,
    `missing activation workflow step: ${name}`,
  ).toBeDefined();
  return workflowStep;
}

describe("preview Worker activation workflow", () => {
  it("is a self-reviewed trusted-main action with exact version inputs", () => {
    expect(Object.keys(activationWorkflow.on)).toEqual(["workflow_dispatch"]);
    expect(
      Object.keys(activationWorkflow.on.workflow_dispatch.inputs).sort(),
    ).toEqual([
      "artifact_sha256",
      "self_reviewed",
      "source_branch",
      "source_commit",
      "source_run_id",
      "version_id",
    ]);
    expect(activationWorkflow.permissions).toEqual({});
    expect(activationJob.if).toBe("github.ref == 'refs/heads/main'");
    expect(activationJob.environment).toBe("worker-preview");
    expect(activationJob.permissions).toEqual({ contents: "read" });
    expect(activationJob["timeout-minutes"]).toBe(15);
    expect(activationWorkflow.concurrency).toEqual({
      group: "zenml-io-worker-preview",
      "cancel-in-progress": false,
    });
  });

  it("validates inputs and inspects exact private-version provenance", () => {
    const validationStep = activationStep("Validate activation identifiers");
    const workerStep = activationStep(
      "Verify the preview Worker has only the protected staging route",
    );
    const inspectStep = activationStep("Inspect the exact preview version");
    const provenanceStep = activationStep(
      "Verify exact version provenance and bindings",
    );

    expect(validationStep.run).toContain('[[ "$VERSION_ID" =~ ^[0-9a-f]{8}-');
    expect(validationStep.run).toContain(
      '[[ "$SOURCE_COMMIT" =~ ^[0-9a-f]{40}$ ]]',
    );
    expect(validationStep.run).toContain(
      'git check-ref-format --branch "$SOURCE_BRANCH"',
    );
    expect(workerStep.run).toContain(
      ".result.enabled == false and .result.previews_enabled == false",
    );
    expect(workerStep.run).toContain('has("routes")');
    expect(activationWorkflow.env.STAGING_ROUTE).toBe(
      "astro-workers-staging.zenml.io/*",
    );
    expect(workerStep.run).toContain(
      "/workers/domains?service=$WORKER_NAME&per_page=100",
    );
    expect(workerStep.run).toContain(".result_info.total_count == 0");
    expect(inspectStep.run).toContain('wrangler versions view "$VERSION_ID"');
    expect(inspectStep.run).toContain('--name "$WORKER_NAME"');
    expect(provenanceStep.run).toContain('select(.type == "secret_text")');
    expect(provenanceStep.run).toContain("source_commit=$SOURCE_COMMIT");
    expect(provenanceStep.run).toContain("source_branch=$SOURCE_BRANCH");
    expect(provenanceStep.run).toContain("source_run_id=$SOURCE_RUN_ID");
    expect(provenanceStep.run).toContain("artifact_sha256=$ARTIFACT_SHA256");

    for (const workflowStep of activationJob.steps) {
      expect(workflowStep.run ?? "").not.toContain("${{ inputs.");
    }
  });

  it("preserves the old deployment before activating only the exact version", () => {
    const captureStep = activationStep("Capture pre-activation deployment");
    const preserveStep = activationStep(
      "Preserve pre-activation deployment metadata",
    );
    const activateStep = activationStep("Activate exact preview version");
    const verifyStep = activationStep(
      "Verify exact activation and private endpoints",
    );

    expect(captureStep.run).toContain("wrangler deployments list");
    expect(preserveStep.uses).toBe(
      "actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02",
    );
    expect(activateStep.run).toContain(
      'wrangler versions deploy "$VERSION_ID@100%"',
    );
    expect(activateStep.run).toContain("worker-subdomain-before-deploy.json");
    expect(activateStep.run).toContain("workers-before-deploy.json");
    expect(activateStep.run).toContain("worker-domains-before-deploy.json");
    expect(activateStep.run).toContain(
      "/workers/domains?service=$WORKER_NAME&per_page=100",
    );
    expect(activateStep.run).toContain('--name "$WORKER_NAME"');
    expect(verifyStep.run).toContain("wrangler deployments list");
    expect(verifyStep.run).toContain("max_by(.created_on) as $latest");
    expect(verifyStep.run).toContain(
      "$latest.versions[0].version_id == $version",
    );
    expect(verifyStep.run).toContain("$latest.versions[0].percentage == 100");
    expect(verifyStep.run).toContain(
      ".result.enabled == false and .result.previews_enabled == false",
    );
    expect(verifyStep.run).toContain("workers-after-activation.json");
    expect(verifyStep.run).toContain("worker-domains-after-activation.json");
    expect(activationWorkflowText).not.toContain(
      "secrets.CLOUDFLARE_WORKERS_PRODUCTION_TOKEN",
    );
    expect(activationWorkflowText).not.toContain("wrangler routes");
    expect(activationWorkflowText).not.toContain("wrangler dns");
    expect(activationWorkflowText).not.toContain("wrangler pages");
    expect(activationWorkflowText).not.toContain("wrangler delete");
  });

  it("requires the exact protected staging route throughout activation", () => {
    const routeChecks = [
      [
        activationStep(
          "Verify the preview Worker has only the protected staging route",
        ),
        "workers-before-activation.json",
      ],
      [
        activationStep("Activate exact preview version"),
        "workers-before-deploy.json",
      ],
      [
        activationStep("Verify exact activation and private endpoints"),
        "workers-after-activation.json",
      ],
    ] as const;
    const args = [
      "--arg",
      "route",
      "astro-workers-staging.zenml.io/*",
      "--arg",
      "worker",
      "zenml-io-v2-worker-preview",
    ];
    const acceptedWorker = {
      id: "zenml-io-v2-worker-preview",
      routes: [
        {
          pattern: "astro-workers-staging.zenml.io/*",
          script: "zenml-io-v2-worker-preview",
        },
      ],
    };
    const rejectedWorkers = [
      { ...acceptedWorker, routes: [] },
      {
        ...acceptedWorker,
        routes: [
          {
            pattern: "astro-workers-staging.zenml.io/*",
            script: "zenml-io-v2-worker",
          },
        ],
      },
      {
        ...acceptedWorker,
        routes: [
          {
            pattern: "www.zenml.io/*",
            script: "zenml-io-v2-worker-preview",
          },
        ],
      },
      {
        ...acceptedWorker,
        routes: [
          ...acceptedWorker.routes,
          {
            pattern: "extra.zenml.io/*",
            script: "zenml-io-v2-worker-preview",
          },
        ],
      },
    ];

    for (const [workflowStep, filename] of routeChecks) {
      const program = jqProgramWritingTo(workflowStep.run ?? "", filename);
      expectJqResult(
        program,
        { result: [acceptedWorker], success: true },
        true,
        args,
      );
      expectJqResult(
        program,
        {
          result: [
            {
              ...acceptedWorker,
              routes: ["astro-workers-staging.zenml.io/*"],
            },
          ],
          success: true,
        },
        true,
        args,
      );
      for (const worker of rejectedWorkers) {
        expectJqResult(
          program,
          { result: [worker], success: true },
          false,
          args,
        );
      }
    }
  });

  it("accepts only the newest exact 100-percent deployment", () => {
    const verifyStep = activationStep(
      "Verify exact activation and private endpoints",
    );
    const filterMatch = verifyStep.run?.match(
      /jq -e --arg version "\$VERSION_ID" '([\s\S]*?)'\s+"\$RUNNER_TEMP\/deployments-after\.json"/,
    );
    expect(
      filterMatch,
      "missing activation deployment jq program",
    ).toBeTruthy();
    const filter = filterMatch?.[1] ?? "";
    const deployments = JSON.stringify([
      {
        created_on: "2026-07-26T10:00:00.000Z",
        versions: [
          {
            percentage: 100,
            version_id: "00000000-0000-0000-0000-000000000000",
          },
        ],
      },
      {
        created_on: "2026-07-27T10:00:00.000Z",
        versions: [
          {
            percentage: 100,
            version_id: "11111111-1111-1111-1111-111111111111",
          },
        ],
      },
    ]);
    expect(
      execFileSync(
        "jq",
        [
          "-e",
          "--arg",
          "version",
          "11111111-1111-1111-1111-111111111111",
          filter,
        ],
        { input: deployments },
      ).toString(),
    ).toBe("true\n");
    expect(() =>
      execFileSync(
        "jq",
        [
          "-e",
          "--arg",
          "version",
          "00000000-0000-0000-0000-000000000000",
          filter,
        ],
        { input: deployments, stdio: ["pipe", "pipe", "pipe"] },
      ),
    ).toThrow();

    for (const rejected of [
      [],
      [
        {
          created_on: "2026-07-27T10:00:00.000Z",
          versions: [
            {
              percentage: 50,
              version_id: "11111111-1111-1111-1111-111111111111",
            },
            {
              percentage: 50,
              version_id: "22222222-2222-2222-2222-222222222222",
            },
          ],
        },
      ],
      [
        {
          created_on: "2026-07-27T10:00:00.000Z",
          versions: [
            {
              percentage: 99,
              version_id: "11111111-1111-1111-1111-111111111111",
            },
          ],
        },
      ],
    ]) {
      expect(() =>
        execFileSync(
          "jq",
          [
            "-e",
            "--arg",
            "version",
            "11111111-1111-1111-1111-111111111111",
            filter,
          ],
          {
            input: JSON.stringify(rejected),
            stdio: ["pipe", "pipe", "pipe"],
          },
        ),
      ).toThrow();
    }
  });
});
