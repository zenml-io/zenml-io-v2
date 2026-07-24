import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

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

function actionReferences(workflow: string): string[] {
  return [...workflow.matchAll(/^\s*uses:\s*([^\s#]+)(?:\s+#.*)?\s*$/gm)].map(
    ([, reference]) => reference,
  );
}

function expectArtifactGuards(workflow: string): void {
  expect(workflow).toContain("Reject unsafe Worker artifact");
  expect(workflow).toContain("(^/|(^|/)\\.\\.(/|$))");
  expect(workflow).toContain("contains a link or special file");
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
  it("only consumes successful same-repository PR artifacts", () => {
    expect(previewWorkflow).toContain("workflow_run:");
    expect(previewWorkflow).toContain(
      "github.event.workflow_run.conclusion == 'success'",
    );
    expect(previewWorkflow).toContain(
      "github.event.workflow_run.head_repository.full_name == github.repository",
    );
    expect(previewWorkflow).toContain(
      "github.event.workflow_run.event == 'pull_request'",
    );
    expect(previewWorkflow).toContain(
      "github.event.workflow_run.actor.login != 'dependabot[bot]'",
    );
    expect(previewWorkflow).toContain("actions/download-artifact@");
    expect(previewWorkflow).toContain("run-id:");
    expect(previewWorkflow).toContain("sha256sum --check worker-dist.sha256");
    expect(previewWorkflow).toContain(
      `group: worker-preview-pr-\${{ github.event.workflow_run.pull_requests[0].number }}`,
    );
    expect(previewWorkflow).toContain("cancel-in-progress: true");
    expect(previewWorkflow).toContain(
      'gh api "repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER" --jq .head.sha',
    );
    expect(previewWorkflow).toContain(
      "steps.current-pr-head.outputs.current == 'true'",
    );
  });

  it("does not execute branch-controlled build or package scripts", () => {
    expect(previewWorkflow).not.toContain("pnpm install");
    expect(previewWorkflow).not.toContain("pnpm build");
    expect(previewWorkflow).not.toContain("pnpm ");
    expect(previewWorkflow).toContain("npm install --global wrangler@4.110.0");
    expectArtifactGuards(previewWorkflow);
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
    expect(candidateWorkflow).toContain("inputs.source_run_id");
    expect(candidateWorkflow).toContain("inputs.source_commit");
    expect(candidateWorkflow).toContain("inputs.source_branch");
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
      '[[ "$SOURCE_BRANCH" =~ ^[A-Za-z0-9._/-]+$ ]]',
    );
    expect(activationWorkflow).toContain("grep -Fq --");
    expectNoRouteOrDnsMutation(activationWorkflow);
  });
});

describe("workflow action pinning", () => {
  it.each(
    [
      deployWorkflow,
      previewWorkflow,
      candidateWorkflow,
      activationWorkflow,
    ].flatMap(actionReferences),
  )("%s is pinned to an immutable revision", (reference) => {
    expect(reference).toMatch(
      /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+@[a-f0-9]{40}$/,
    );
  });
});
