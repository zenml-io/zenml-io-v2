/**
 * Five real ZenML pipeline examples — sourced from the canonical ZenML SDK
 * repo (https://github.com/zenml-io/zenml) under `examples/`. Every code
 * snippet here is a trimmed-but-faithful excerpt of a real example file
 * that ships in the SDK; full paths recorded in `sourceCitation` so we
 * can keep them in sync if ZenML rewrites an example.
 *
 * The five examples were chosen to span the breadth of ML pipeline use cases:
 *   1. quickstart       — canonical @step + @pipeline pair (sklearn)
 *   2. mlops_starter    — feature engineering → training (breast cancer)
 *   3. llm_finetuning   — PEFT finetune phi-2 on viggo dataset
 *   4. churn_inference  — deployed real-time inference (warm container)
 *   5. computer_vision  — YOLOv8 training on COCO subset
 *
 * Each example owns its own DAG (two steps + two inputs + one output) so
 * the right pane in TwoWorkspaces > Pipelines can swap data fully when a
 * row is clicked. The DAG shape is stylized — real pipelines have more
 * steps; we trim to the two most representative for the widget.
 */

export type PipelineStatus = "DONE" | "RUNNING" | "FAILED" | "QUEUED";
export type PipelineTarget =
  | "Local laptop"
  | "Kubernetes"
  | "Vertex AI"
  | "SageMaker"
  | "Airflow"
  | "Azure ML";

export type StepStatus = "done" | "running" | "queued";

export type PipelineStep = {
  /** Stable id within the DAG (matches an entry in `dag.steps`). */
  id: string;
  /** snake_case function name from the source. */
  name: string;
  /** Short human-readable duration label (e.g. "7s", "4m 5s"). */
  duration: string;
  status: StepStatus;
};

export type PipelineArtifact = {
  /** Source step id this artifact flows out of. */
  fromStep: string;
  /** Destination step id, or "output" for the final pipeline output. */
  toStep: string | "output";
  name: string;
  type: string;
};

export type PipelineOutput = {
  name: string;
  /** Combined framework + version label, e.g. "sklearn · v18". */
  framework: string;
};

export type PipelineDag = {
  steps: ReadonlyArray<PipelineStep>;
  artifacts: ReadonlyArray<PipelineArtifact>;
  output?: PipelineOutput;
};

export type FooterStatus = {
  label: string;
  /** Drives the colored dot + text on the footer strip. */
  color: "healthy" | "warning" | "error";
};

export type PipelineExample = {
  /** Stable URL/data slug — e.g. "quickstart". */
  id: string;
  /** Snake-case pipeline name (matches the @pipeline def). */
  rowLabel: string;
  /** Meta line under the row label — e.g. "v32 · 8 steps · 4m 12s". */
  rowSubtitle: string;
  rowStatusPill: PipelineStatus;
  /** Chip shown to the right of the row when this is NOT the active row
   *  (the active row gets the green DONE pill instead). */
  rowTargetChip?: string;
  /** Top-right chip in the right pane — e.g. "quickstart · run #218". */
  contextChip: string;
  /** Which target pill is highlighted on the segmented switcher. */
  activeTarget: PipelineTarget;
  /** Filename shown in the code-card titlebar. */
  codeFilename: string;
  /** ~12-line trimmed Python excerpt of the real example file. */
  codeSource: string;
  dag: PipelineDag;
  /** Bottom-of-right-pane meta strip. */
  footerMeta: string;
  footerStatus: FooterStatus;
  /** Path inside the ZenML SDK repo that this example was trimmed from.
   *  Used for verification, not displayed. */
  sourceCitation: string;
};

/* ---------------------------------------------------------------------- */
/* Examples                                                                */
/*                                                                         */
/*   Code excerpts trim only structural lines (imports collapsed, helper   */
/*   plumbing removed) so the on-screen Python still parses and the        */
/*   @step + @pipeline shapes match the real file. No new code is          */
/*   invented — every visible line comes from the linked source.           */
/* ---------------------------------------------------------------------- */

const QUICKSTART: PipelineExample = {
  id: "quickstart",
  rowLabel: "simple_pipeline",
  rowSubtitle: "v07 · 1 step · 2s",
  rowStatusPill: "DONE",
  contextChip: "simple_pipeline · run #7",
  activeTarget: "Local laptop",
  codeFilename: "quickstart.py",
  codeSource: [
    "from typing import Annotated",
    "from zenml import pipeline, step",
    "",
    "@step",
    "def simple_step(name: str = \"World\") -> Annotated[str, \"greeting\"]:",
    "    return f\"Hello, {name}! Welcome to ZenML!\"",
    "",
    "@pipeline",
    "def simple_pipeline(name: str = \"World\"):",
    "    return simple_step(name=name)",
  ].join("\n"),
  dag: {
    steps: [
      { id: "input", name: "name", duration: "—", status: "done" },
      { id: "simple_step", name: "simple_step", duration: "2s", status: "done" },
    ],
    artifacts: [
      { fromStep: "input", toStep: "simple_step", name: "name", type: "str" },
      { fromStep: "input", toStep: "simple_step", name: "default", type: "World" },
    ],
    output: { name: "greeting", framework: "str · v7" },
  },
  footerMeta: "local · default stack",
  footerStatus: { label: "healthy", color: "healthy" },
  sourceCitation: "zenml-io/zenml: examples/quickstart/quickstart.ipynb (cell 4)",
};

const MLOPS_STARTER: PipelineExample = {
  id: "mlops_starter",
  rowLabel: "training",
  rowSubtitle: "v32 · 4 steps · 4m 12s",
  rowStatusPill: "DONE",
  rowTargetChip: "Kubeflow",
  contextChip: "training · run #32",
  activeTarget: "Kubernetes",
  codeFilename: "pipelines/training.py",
  codeSource: [
    "from zenml import pipeline, step",
    "",
    "@step",
    "def data_loader(random_state: int) -> pd.DataFrame:",
    "    return load_breast_cancer(as_frame=True).frame",
    "",
    "@step",
    "def model_trainer(dataset_trn: pd.DataFrame) -> ClassifierMixin:",
    "    return SGDClassifier().fit(dataset_trn.drop(\"target\", axis=1), dataset_trn.target)",
    "",
    "@pipeline",
    "def training(model_type: str = \"sgd\"):",
    "    model_trainer(dataset_trn=data_loader(random_state=17))",
  ].join("\n"),
  dag: {
    steps: [
      { id: "data_loader", name: "data_loader", duration: "7s", status: "done" },
      { id: "model_trainer", name: "model_trainer", duration: "4m 5s", status: "done" },
    ],
    artifacts: [
      { fromStep: "data_loader", toStep: "model_trainer", name: "dataset_trn", type: "DataFrame" },
      { fromStep: "data_loader", toStep: "model_trainer", name: "dataset_tst", type: "DataFrame" },
    ],
    output: { name: "sklearn_classifier", framework: "sklearn · v32" },
  },
  footerMeta: "kubernetes-prod · 12 pods",
  footerStatus: { label: "healthy", color: "healthy" },
  sourceCitation: "zenml-io/zenml: examples/mlops_starter/quickstart.ipynb (data_loader + model_trainer + training pipeline)",
};

const LLM_FINETUNING: PipelineExample = {
  id: "llm_finetuning",
  rowLabel: "llm_peft_full_finetune",
  rowSubtitle: "v18 · 4 steps · 1h 12m",
  rowStatusPill: "DONE",
  rowTargetChip: "Vertex AI",
  contextChip: "llm_peft_full_finetune · run #18",
  activeTarget: "Vertex AI",
  codeFilename: "pipelines/train.py",
  codeSource: [
    "from zenml import pipeline",
    "from steps import prepare_data, finetune, evaluate_model, promote",
    "",
    "@pipeline",
    "def llm_peft_full_finetune(",
    "    base_model_name: str = \"microsoft/phi-2\",",
    "    dataset_name: str = \"gem/viggo\",",
    "):",
    "    datasets_dir = prepare_data(base_model_name, dataset_name)",
    "    ft_model_dir = finetune(base_model_name, datasets_dir)",
    "    evaluate_model(base_model_name, ft_model_dir, datasets_dir)",
    "    promote(ft_model_dir)",
  ].join("\n"),
  dag: {
    steps: [
      { id: "prepare_data", name: "prepare_data", duration: "3m 41s", status: "done" },
      { id: "finetune", name: "finetune", duration: "58m 22s", status: "done" },
    ],
    artifacts: [
      { fromStep: "prepare_data", toStep: "finetune", name: "datasets_dir", type: "Path" },
      { fromStep: "prepare_data", toStep: "finetune", name: "tokenizer", type: "PreTrainedTokenizer" },
    ],
    output: { name: "ft_model_dir", framework: "phi-2 · v18" },
  },
  footerMeta: "vertex-gcp · 1× A100 80GB",
  footerStatus: { label: "healthy", color: "healthy" },
  sourceCitation: "zenml-io/zenml: examples/llm_finetuning/run.py + pipelines/train.py (referenced in run.py:86)",
};

const CHURN_INFERENCE: PipelineExample = {
  id: "churn_inference",
  rowLabel: "churn_inference_pipeline",
  rowSubtitle: "v44 · 1 step · 87ms",
  rowStatusPill: "RUNNING",
  rowTargetChip: "SageMaker",
  contextChip: "churn_inference_pipeline · run #44",
  activeTarget: "SageMaker",
  codeFilename: "pipelines/inference_pipeline.py",
  codeSource: [
    "from zenml import pipeline",
    "from zenml.config import DeploymentSettings",
    "from steps.inference import predict_churn",
    "",
    "@pipeline(",
    "    on_init=init_model,",
    "    settings={\"deployment\": DeploymentSettings(",
    "        app_title=\"Churn Prediction API\",",
    "        dashboard_files_path=\"ui\",",
    "    )},",
    ")",
    "def churn_inference_pipeline(customer_features: Dict) -> Dict:",
    "    return predict_churn(customer_features=customer_features)",
  ].join("\n"),
  dag: {
    steps: [
      { id: "init_model", name: "init_model", duration: "warm", status: "done" },
      { id: "predict_churn", name: "predict_churn", duration: "87ms", status: "running" },
    ],
    artifacts: [
      { fromStep: "init_model", toStep: "predict_churn", name: "model", type: "RandomForest" },
      { fromStep: "init_model", toStep: "predict_churn", name: "customer", type: "Dict" },
    ],
    output: { name: "prediction", framework: "Dict · v44" },
  },
  footerMeta: "sagemaker-aws · 2 replicas",
  footerStatus: { label: "live", color: "healthy" },
  sourceCitation: "zenml-io/zenml: examples/deploying_ml_model/README.md (lines 99-115) + run.py (churn_inference_pipeline import)",
};

const COMPUTER_VISION: PipelineExample = {
  id: "computer_vision",
  rowLabel: "object_detection_training",
  rowSubtitle: "v12 · 3 steps · 18m 33s",
  rowStatusPill: "DONE",
  rowTargetChip: "Airflow",
  contextChip: "object_detection_training · run #12",
  activeTarget: "Airflow",
  codeFilename: "pipelines/training_pipeline.py",
  codeSource: [
    "from zenml import pipeline",
    "from steps import load_coco_dataset, train_yolo, fiftyone_analysis",
    "",
    "@pipeline",
    "def object_detection_training_pipeline(",
    "    max_samples: int = 50,",
    "    epochs: int = 1,",
    "    model_name: str = \"yolov8n.pt\",",
    "):",
    "    dataset = load_coco_dataset(max_samples=max_samples)",
    "    model = train_yolo(dataset=dataset, epochs=epochs, model_name=model_name)",
    "    fiftyone_analysis(dataset=dataset, model=model)",
  ].join("\n"),
  dag: {
    steps: [
      { id: "load_coco_dataset", name: "load_coco_dataset", duration: "1m 02s", status: "done" },
      { id: "train_yolo", name: "train_yolo", duration: "17m 14s", status: "done" },
    ],
    artifacts: [
      { fromStep: "load_coco_dataset", toStep: "train_yolo", name: "dataset", type: "FiftyOneDataset" },
      { fromStep: "load_coco_dataset", toStep: "train_yolo", name: "labels", type: "COCO80" },
    ],
    output: { name: "yolo-model", framework: "ultralytics · v12" },
  },
  footerMeta: "airflow · 4× T4 GPU",
  footerStatus: { label: "healthy", color: "healthy" },
  sourceCitation: "zenml-io/zenml: examples/computer_vision/run.py (lines 122-129) + README.md (lines 24-32, 109)",
};

export const PIPELINE_EXAMPLES: ReadonlyArray<PipelineExample> = [
  QUICKSTART,
  MLOPS_STARTER,
  LLM_FINETUNING,
  CHURN_INFERENCE,
  COMPUTER_VISION,
];

export const DEFAULT_PIPELINE_EXAMPLE_ID = PIPELINE_EXAMPLES[1].id; // mlops_starter — most representative "training pipeline" hero
