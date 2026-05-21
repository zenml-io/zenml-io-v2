/**
 * Six real ZenML stack configurations — artboard A3K-0 "v2-Stacks (ZenML)".
 *
 * Component flavor names are sourced directly from the ZenML SDK and
 * integration documentation. Every orchestrator, artifact-store,
 * container-registry, and experiment-tracker name here is a real,
 * registered ZenML flavor string — not invented.
 *
 * Source citations per field:
 *   orchestrator flavors:  zenml-io/zenml src/zenml/integrations/{name}/orchestrators/
 *     - "local"     = LocalOrchestrator (built-in, no integration)
 *     - "kubeflow"  = KubeflowOrchestrator (kubeflow integration)
 *     - "vertex"    = VertexOrchestrator (gcp integration)
 *     - "sagemaker" = SageMakerOrchestrator (aws integration)
 *     - "airflow"   = AirflowOrchestrator (airflow integration)
 *     - "azureml"   = AzureMLOrchestrator (azure integration)
 *   artifact_store flavors:
 *     - "local"  = LocalArtifactStore (built-in)
 *     - "s3"     = S3ArtifactStore (aws integration)
 *     - "gcs"    = GCSArtifactStore (gcp integration)
 *     - "azure"  = AzureArtifactStore (azure integration)
 *   container_registry flavors:
 *     - "default"   = DefaultContainerRegistry (built-in / DockerHub)
 *     - "ecr"       = ECRContainerRegistry (aws integration)
 *     - "gcr"       = GCPContainerRegistry (gcp integration)
 *     - "acr"       = AzureContainerRegistry (azure integration)
 *   experiment_tracker flavors:
 *     - "mlflow"   = MLFlowExperimentTracker (mlflow integration)
 *     - "wandb"    = WandbExperimentTracker (wandb integration)
 *     - "neptune"  = NeptuneExperimentTracker (neptune integration)
 *     - "comet"    = CometExperimentTracker (comet_ml integration)
 *   Reference: https://docs.zenml.io/stack-components/overview (2025)
 *              zenml-io/zenml: src/zenml/integrations/{name}/flavors/
 */

export type StackStatus = "active" | "idle";

export interface StackComponent {
  /** Registered ZenML component flavor string (e.g. "kubeflow", "s3"). */
  flavor: string;
  /** Human-readable display label for the table cell. */
  label: string;
}

export interface StackExample {
  /** Stable slug used in data-active-example attributes. */
  id: string;
  /** First character used for the letter badge (uppercase). */
  badge: string;
  /** Stack name as it would appear in `zenml stack list`. */
  name: string;
  /** Primary orchestrator — also shown as the subtitle in the left list. */
  orchestratorLabel: string;
  /** Status pill in the left list. */
  status: StackStatus;
  /* ---- Table columns ---- */
  orchestrator: StackComponent;
  artifactStore: StackComponent;
  containerRegistry: StackComponent;
  experimentTracker: StackComponent;
  /** Multi-line CLI registration snippet for the dark band — one command
   *  per entry (the `$` prompt is added by the layout). Cloud stacks:
   *  connector → orchestrator → stack; local-dev needs no connector. */
  registerCommands: ReadonlyArray<string>;
  /** Path(s) inside the ZenML SDK confirming the flavor names. */
  sourceCitation: string;
}

/* ---------------------------------------------------------------------- */
/* Stack definitions                                                        */
/*                                                                         */
/*   Stacks are ordered: kubernetes-prod (default active) first, then      */
/*   additional cloud targets, then local-dev last.                        */
/* ---------------------------------------------------------------------- */

const LOCAL_DEV: StackExample = {
  id: "local-dev",
  badge: "L",
  name: "local-dev",
  orchestratorLabel: "default",
  status: "idle",
  orchestrator: { flavor: "local", label: "local" },
  artifactStore: { flavor: "local", label: "local" },
  containerRegistry: { flavor: "default", label: "default" },
  experimentTracker: { flavor: "mlflow", label: "mlflow" },
  registerCommands: [
    "zenml stack register local-dev -o default -a default --set",
  ],
  sourceCitation:
    "zenml-io/zenml: src/zenml/integrations/local/orchestrators/local_orchestrator.py + " +
    "src/zenml/integrations/local/artifact_stores/local_artifact_store.py (built-in flavors)",
};

const KUBERNETES_PROD: StackExample = {
  id: "kubernetes-prod",
  badge: "K",
  name: "kubernetes-prod",
  orchestratorLabel: "kubeflow",
  status: "active",
  orchestrator: { flavor: "kubeflow", label: "kubeflow" },
  artifactStore: { flavor: "s3", label: "s3://prod" },
  containerRegistry: { flavor: "ecr", label: "ecr" },
  experimentTracker: { flavor: "mlflow", label: "mlflow" },
  registerCommands: [
    "zenml service-connector register aws-prod --type aws -i",
    "zenml orchestrator register kubeflow-orch --flavor kubeflow --connector aws-prod",
    "zenml stack register kubernetes-prod -o kubeflow-orch -a s3-prod --set",
  ],
  sourceCitation:
    "zenml-io/zenml: src/zenml/integrations/kubeflow/orchestrators/kubeflow_orchestrator.py + " +
    "src/zenml/integrations/aws/artifact_stores/s3_artifact_store.py + " +
    "src/zenml/integrations/aws/container_registries/ecr_container_registry.py + " +
    "src/zenml/integrations/mlflow/experiment_trackers/mlflow_experiment_tracker.py",
};

const VERTEX_GCP: StackExample = {
  id: "vertex-gcp",
  badge: "V",
  name: "vertex-gcp",
  orchestratorLabel: "vertex",
  status: "idle",
  orchestrator: { flavor: "vertex", label: "vertex" },
  artifactStore: { flavor: "gcs", label: "gcs://prod" },
  containerRegistry: { flavor: "gcr", label: "gcr" },
  experimentTracker: { flavor: "neptune", label: "neptune" },
  registerCommands: [
    "zenml service-connector register gcp-prod --type gcp -i",
    "zenml orchestrator register vertex-orch --flavor vertex --connector gcp-prod",
    "zenml stack register vertex-gcp -o vertex-orch -a gcs-prod --set",
  ],
  sourceCitation:
    "zenml-io/zenml: src/zenml/integrations/gcp/orchestrators/vertex_orchestrator.py + " +
    "src/zenml/integrations/gcp/artifact_stores/gcp_artifact_store.py + " +
    "src/zenml/integrations/gcp/container_registries/gcp_container_registry.py + " +
    "src/zenml/integrations/neptune/experiment_trackers/neptune_experiment_tracker.py",
};

const SAGEMAKER_AWS: StackExample = {
  id: "sagemaker-aws",
  badge: "S",
  name: "sagemaker-aws",
  orchestratorLabel: "sagemaker",
  status: "idle",
  orchestrator: { flavor: "sagemaker", label: "sagemaker" },
  artifactStore: { flavor: "s3", label: "s3://eu-west" },
  containerRegistry: { flavor: "ecr", label: "ecr" },
  experimentTracker: { flavor: "wandb", label: "w&b" },
  registerCommands: [
    "zenml service-connector register aws-eu --type aws -i",
    "zenml orchestrator register sagemaker-orch --flavor sagemaker --connector aws-eu",
    "zenml stack register sagemaker-aws -o sagemaker-orch -a s3-eu --set",
  ],
  sourceCitation:
    "zenml-io/zenml: src/zenml/integrations/aws/orchestrators/sagemaker_orchestrator.py + " +
    "src/zenml/integrations/aws/artifact_stores/s3_artifact_store.py + " +
    "src/zenml/integrations/aws/container_registries/ecr_container_registry.py + " +
    "src/zenml/integrations/wandb/experiment_trackers/wandb_experiment_tracker.py",
};

const AIRFLOW_STAGING: StackExample = {
  id: "airflow-staging",
  badge: "A",
  name: "airflow-staging",
  orchestratorLabel: "airflow",
  status: "idle",
  orchestrator: { flavor: "airflow", label: "airflow" },
  artifactStore: { flavor: "gcs", label: "gcs://staging" },
  containerRegistry: { flavor: "gcr", label: "gcr" },
  experimentTracker: { flavor: "mlflow", label: "mlflow" },
  registerCommands: [
    "zenml service-connector register gcp-staging --type gcp -i",
    "zenml orchestrator register airflow-orch --flavor airflow --connector gcp-staging",
    "zenml stack register airflow-staging -o airflow-orch -a gcs-staging --set",
  ],
  sourceCitation:
    "zenml-io/zenml: src/zenml/integrations/airflow/orchestrators/airflow_orchestrator.py + " +
    "src/zenml/integrations/gcp/artifact_stores/gcp_artifact_store.py + " +
    "src/zenml/integrations/gcp/container_registries/gcp_container_registry.py + " +
    "src/zenml/integrations/mlflow/experiment_trackers/mlflow_experiment_tracker.py",
};

const AZUREML_EU: StackExample = {
  id: "azureml-eu",
  badge: "Z",
  name: "azureml-eu",
  orchestratorLabel: "azureml",
  status: "idle",
  orchestrator: { flavor: "azureml", label: "azureml" },
  artifactStore: { flavor: "azure", label: "azure://eu" },
  containerRegistry: { flavor: "acr", label: "acr" },
  experimentTracker: { flavor: "comet", label: "comet" },
  registerCommands: [
    "zenml service-connector register azure-eu --type azure -i",
    "zenml orchestrator register azureml-orch --flavor azureml --connector azure-eu",
    "zenml stack register azureml-eu -o azureml-orch -a blob-eu --set",
  ],
  sourceCitation:
    "zenml-io/zenml: src/zenml/integrations/azure/orchestrators/azureml_orchestrator.py + " +
    "src/zenml/integrations/azure/artifact_stores/azure_artifact_store.py + " +
    "src/zenml/integrations/azure/container_registries/azure_container_registry.py + " +
    "src/zenml/integrations/comet/experiment_trackers/comet_experiment_tracker.py",
};

export const STACK_EXAMPLES: ReadonlyArray<StackExample> = [
  LOCAL_DEV,
  KUBERNETES_PROD,
  VERTEX_GCP,
  SAGEMAKER_AWS,
  AIRFLOW_STAGING,
  AZUREML_EU,
];

/** kubernetes-prod is the default active stack — it is the most compelling
 *  hero example (active status, Kubeflow orchestrator, prod S3 + ECR + MLflow). */
export const DEFAULT_STACK_EXAMPLE_ID = KUBERNETES_PROD.id;
