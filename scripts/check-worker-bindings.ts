import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const REQUIRED_WORKER_SECRETS = [
  "TURNSTILE_SECRET_KEY",
  "SEGMENT_FORMS_WRITE_KEY",
] as const;

type VersionBinding = {
  name?: unknown;
  type?: unknown;
};

type VersionMetadata = {
  resources?: {
    bindings?: VersionBinding[];
  };
};

export function findMissingRequiredSecrets(metadata: unknown): string[] {
  const bindings = (metadata as VersionMetadata | null)?.resources?.bindings;
  if (!Array.isArray(bindings)) {
    return [...REQUIRED_WORKER_SECRETS];
  }

  const secretNames = new Set(
    bindings
      .filter((binding) => binding?.type === "secret_text")
      .map((binding) => binding.name)
      .filter((name): name is string => typeof name === "string"),
  );

  return REQUIRED_WORKER_SECRETS.filter((name) => !secretNames.has(name));
}

function main(): void {
  const metadataPath = process.argv[2];
  if (!metadataPath) {
    console.error(
      "Usage: pnpm check:worker-bindings -- <wrangler-version-metadata.json>",
    );
    process.exit(1);
  }

  let metadata: unknown;
  try {
    metadata = JSON.parse(readFileSync(metadataPath, "utf8")) as unknown;
  } catch (error) {
    console.error(
      `Could not read Worker version metadata: ${(error as Error).message}`,
    );
    process.exit(1);
  }

  const missing = findMissingRequiredSecrets(metadata);
  if (missing.length > 0) {
    console.error(
      `Worker version is missing required secret bindings: ${missing.join(", ")}`,
    );
    process.exit(1);
  }

  console.log(
    `Worker version metadata contains ${REQUIRED_WORKER_SECRETS.length} required secret bindings.`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
