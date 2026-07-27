import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

interface WorkflowStep {
  env?: Record<string, string>;
  if?: string;
  name: string;
  run?: string;
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
