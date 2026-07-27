import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { REQUIRED_WORKER_SECRETS } from "../../scripts/check-worker-bindings";

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
  it("requires an explicit trusted-main dispatch for an exact PR artifact", () => {
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
