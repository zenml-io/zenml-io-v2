/**
 * Ten ML framework examples for the TwoWorkspaces v2 Frameworks tab.
 *
 * Each example shows a real ZenML @step that imports a popular ML framework.
 * Code is trimmed-but-faithful to real ZenML usage patterns; every snippet is
 * representative of how that framework is used inside a @step.  The
 * `sourceCitation` field records the closest real example path or doc
 * reference so snippets can be verified against the SDK repo.
 *
 * References:
 *   zenml-io/zenml examples/mlops_starter/quickstart.ipynb
 *   zenml-io/zenml examples/llm_finetuning/run.py (pipelines/train.py)
 *   zenml-io/zenml examples/computer_vision/run.py (pipelines/)
 *   zenml-io/zenml docs.zenml.io/user-guide/starter-guide/track-ml-models
 */

export interface FrameworkMLExample {
  /** Stable slug — used for data-active-example attribute selectors. */
  id: string;
  /** Display name in the left-pane list. */
  name: string;
  /** 1–2 letter badge abbreviation. */
  badgeLetter: string;
  /** CSS color value for the badge background — framework brand color.
   *  Only used inside the 32×32 letter badge; never elsewhere. */
  badgeColor: string;
  /** CSS color for the badge letter text (white or dark for contrast). */
  badgeTextColor: string;
  /** Short descriptor shown under the name in the left list. */
  descriptor: string;
  /** Eyebrow in the right pane — e.g. "INSIDE THE @STEP". */
  eyebrow: string;
  /** Headline in the right pane — e.g. "Use PyTorch in any @step." */
  title: string;
  /** Body copy in the right pane (one sentence). */
  body: string;
  /** Content of the version chip: e.g. "torch 2.4.1 · CUDA 12.1". */
  versionChip: string;
  /** Filename shown in the code-card traffic-light header bar. */
  codeFilename: string;
  /** ~10-14 line trimmed Python excerpt showing the framework inside @step. */
  codeSource: string;
  /** Pills for the "WHAT ZENML GIVES YOU" row. */
  pills: ReadonlyArray<{ letter: string; label: string }>;
  /** Honest "good fit" line — when this framework + ZenML is the right call. */
  goodFit: string;
  /** Honest "trade-off" line — the real cost / caveat of the integration. */
  tradeOff: string;
  /** Path in the ZenML SDK repo this snippet was trimmed from. */
  sourceCitation: string;
}

/* ---------------------------------------------------------------------- */
/* Examples                                                                */
/* ---------------------------------------------------------------------- */

const PYTORCH: FrameworkMLExample = {
  id: "pytorch",
  name: "PyTorch",
  badgeLetter: "PT",
  badgeColor: "#EE4C2C",
  badgeTextColor: "#FFFFFF",
  descriptor: "deep learning · nn.Module · CUDA",
  eyebrow: "INSIDE THE @STEP",
  title: "Use PyTorch in any @step.",
  body: "Bring your own. ZenML wraps it, so you don't change your training loop.",
  versionChip: "torch 2.4.1 · CUDA 12.1",
  codeFilename: "training_pipeline.py",
  codeSource: [
    "import torch",
    "from zenml import step",
    "",
    "@step(enable_cache=False)",
    "def train_model(",
    "    X: torch.Tensor, y: torch.Tensor",
    ") -> torch.nn.Module:",
    "    model = torch.nn.Sequential(",
    "        torch.nn.Linear(784, 256), torch.nn.ReLU(),",
    "        torch.nn.Linear(256, 10),",
    "    )",
    "    return model  # auto-versioned by ZenML",
  ].join("\n"),
  pills: [
    { letter: "v", label: "automatic versioning" },
    { letter: "G", label: "GPU pinning" },
    { letter: "π", label: "any torch version" },
  ],
  goodFit: "Custom training loops and research code that changes often.",
  tradeOff: "Large CUDA images mean slower cold starts on remote stacks.",
  sourceCitation:
    "zenml-io/zenml: examples/mlops_starter — pattern mirrors quickstart.ipynb model_trainer step with torch substituted for sklearn",
};

const TENSORFLOW: FrameworkMLExample = {
  id: "tensorflow",
  name: "TensorFlow",
  badgeLetter: "TF",
  badgeColor: "#FF6F00",
  badgeTextColor: "#FFFFFF",
  descriptor: "keras · tf.data · SavedModel",
  eyebrow: "INSIDE THE @STEP",
  title: "Train Keras models in any @step.",
  body: "ZenML snapshots your SavedModel automatically. No boilerplate.",
  versionChip: "tensorflow 2.16.1 · Keras 3",
  codeFilename: "train_classifier.py",
  codeSource: [
    "import tensorflow as tf",
    "from zenml import step",
    "",
    "@step(enable_cache=False)",
    "def train_classifier(",
    "    X_train: tf.Tensor, y_train: tf.Tensor",
    ") -> tf.keras.Model:",
    "    model = tf.keras.Sequential([",
    "        tf.keras.layers.Dense(128, activation='relu'),",
    "        tf.keras.layers.Dense(10, activation='softmax'),",
    "    ])",
    "    return model  # saved as SavedModel artifact",
  ].join("\n"),
  pills: [
    { letter: "S", label: "SavedModel artifact" },
    { letter: "K", label: "Keras 3 support" },
    { letter: "c", label: "auto caching" },
  ],
  goodFit: "Production Keras models with a stable SavedModel format.",
  tradeOff: "Heavier dependency. Version pinning matters across environments.",
  sourceCitation:
    "zenml-io/zenml: docs.zenml.io/stacks-and-components/component-guide/artifact-stores — TensorFlow materializer pattern",
};

const SKLEARN: FrameworkMLExample = {
  id: "sklearn",
  name: "scikit-learn",
  badgeLetter: "sk",
  badgeColor: "#3490DC",
  badgeTextColor: "#FFFFFF",
  descriptor: "classical ML · pipelines · sklearn API",
  eyebrow: "INSIDE THE @STEP",
  title: "Fit any sklearn estimator in a @step.",
  body: "ZenML auto-pickles your model and registers it in the model registry.",
  versionChip: "scikit-learn 1.5.2",
  codeFilename: "pipelines/training.py",
  codeSource: [
    "import pandas as pd",
    "from sklearn.ensemble import RandomForestClassifier",
    "from typing_extensions import Annotated",
    "from zenml import ArtifactConfig, step",
    "",
    "@step",
    "def model_trainer(",
    "    dataset_trn: pd.DataFrame,",
    ") -> Annotated[RandomForestClassifier,",
    "               ArtifactConfig(is_model_artifact=True)]:",
    "    model = RandomForestClassifier()",
    "    model.fit(dataset_trn.drop('target', axis=1), dataset_trn['target'])",
    "    return model",
  ].join("\n"),
  pills: [
    { letter: "p", label: "pickle materializer" },
    { letter: "M", label: "model registry" },
    { letter: "A", label: "ArtifactConfig" },
  ],
  goodFit: "Tabular models where fast iteration beats raw scale.",
  tradeOff: "Pickled estimators are Python-version sensitive across envs.",
  sourceCitation:
    "zenml-io/zenml: examples/mlops_starter/quickstart.ipynb — model_trainer step (cell fccf1bd9)",
};

const PANDAS: FrameworkMLExample = {
  id: "pandas",
  name: "pandas",
  badgeLetter: "pd",
  badgeColor: "#130754",
  badgeTextColor: "#FFFFFF",
  descriptor: "DataFrames · ETL · feature prep",
  eyebrow: "INSIDE THE @STEP",
  title: "Return DataFrames from any @step.",
  body: "ZenML materializes your DataFrame as a versioned artifact. No manual saving.",
  versionChip: "pandas 2.2.2",
  codeFilename: "steps/data_loader.py",
  codeSource: [
    "import pandas as pd",
    "from sklearn.datasets import load_breast_cancer",
    "from typing_extensions import Annotated",
    "from zenml import step",
    "",
    "@step",
    "def data_loader(",
    "    random_state: int,",
    ") -> Annotated[pd.DataFrame, 'dataset']:",
    "    df = load_breast_cancer(as_frame=True).frame",
    "    df.reset_index(drop=True, inplace=True)",
    "    return df  # versioned DataFrame artifact",
  ].join("\n"),
  pills: [
    { letter: "d", label: "DataFrame artifact" },
    { letter: "v", label: "versioned by run" },
    { letter: "l", label: "lazy loading" },
  ],
  goodFit: "Feature prep and ETL when the dataset fits in memory.",
  tradeOff: "In-memory DataFrames strain on very large datasets.",
  sourceCitation:
    "zenml-io/zenml: examples/mlops_starter/quickstart.ipynb — data_loader_simplified step (cell 3cd974d1)",
};

const HUGGINGFACE: FrameworkMLExample = {
  id: "huggingface",
  name: "HuggingFace Transformers",
  badgeLetter: "HF",
  badgeColor: "#FFD21E",
  badgeTextColor: "#1A1A1A",
  descriptor: "LLMs · fine-tuning · tokenizers",
  eyebrow: "INSIDE THE @STEP",
  title: "Fine-tune any HF model in a @step.",
  body: "ZenML saves your model checkpoint as a versioned artifact on any cloud.",
  versionChip: "transformers 4.44.2 · PEFT 0.12",
  codeFilename: "steps/finetune.py",
  codeSource: [
    "from transformers import AutoModelForCausalLM",
    "from peft import get_peft_model, LoraConfig",
    "from zenml import step",
    "",
    "@step(enable_cache=False)",
    "def finetune_step(",
    "    base_model_name: str, datasets_dir: str",
    ") -> str:",
    "    model = AutoModelForCausalLM.from_pretrained(base_model_name)",
    "    model = get_peft_model(model, LoraConfig(r=16, lora_alpha=32))",
    "    # trainer.train(): ZenML tracks the checkpoint",
    "    return datasets_dir",
  ].join("\n"),
  pills: [
    { letter: "L", label: "LoRA / PEFT" },
    { letter: "c", label: "checkpoint artifact" },
    { letter: "R", label: "remote GPU stack" },
  ],
  goodFit: "Fine-tuning transformers and LLMs with PEFT or LoRA.",
  tradeOff: "Checkpoints are large. Budget artifact-store space and transfer.",
  sourceCitation:
    "zenml-io/zenml: examples/llm_finetuning/run.py — pipelines/train.py finetune step pattern",
};

const XGBOOST: FrameworkMLExample = {
  id: "xgboost",
  name: "XGBoost",
  badgeLetter: "XG",
  badgeColor: "#189ABB",
  badgeTextColor: "#FFFFFF",
  descriptor: "gradient boosting · tabular",
  eyebrow: "INSIDE THE @STEP",
  title: "Train XGBoost models in a @step.",
  body: "ZenML registers your Booster as a model artifact with full lineage.",
  versionChip: "xgboost 2.1.1",
  codeFilename: "steps/train_xgb.py",
  codeSource: [
    "import pandas as pd",
    "import xgboost as xgb",
    "from zenml import step",
    "",
    "@step",
    "def train_xgb_model(",
    "    df_train: pd.DataFrame, label_col: str = 'target'",
    ") -> xgb.Booster:",
    "    dtrain = xgb.DMatrix(",
    "        df_train.drop(columns=[label_col]), df_train[label_col]",
    "    )",
    "    return xgb.train({'max_depth': 6}, dtrain, num_boost_round=100)",
  ].join("\n"),
  pills: [
    { letter: "B", label: "Booster artifact" },
    { letter: "l", label: "full lineage" },
    { letter: "c", label: "cache-aware" },
  ],
  goodFit: "Strong tabular baselines with minimal tuning.",
  tradeOff: "Booster objects need the matching XGBoost version to reload.",
  sourceCitation:
    "zenml-io/zenml: docs.zenml.io/stacks-and-components/component-guide — XGBoost materializer",
};

const LIGHTGBM: FrameworkMLExample = {
  id: "lightgbm",
  name: "LightGBM",
  badgeLetter: "LG",
  badgeColor: "#2E7D32",
  badgeTextColor: "#FFFFFF",
  descriptor: "fast trees · GPU support",
  eyebrow: "INSIDE THE @STEP",
  title: "Run LightGBM training in a @step.",
  body: "ZenML saves your LGBMModel as an artifact and links it to the run.",
  versionChip: "lightgbm 4.5.0",
  codeFilename: "steps/train_lgbm.py",
  codeSource: [
    "import lightgbm as lgb",
    "import pandas as pd",
    "from zenml import step",
    "",
    "@step",
    "def train_lgbm(",
    "    df_train: pd.DataFrame, label: str = 'target'",
    ") -> lgb.LGBMClassifier:",
    "    clf = lgb.LGBMClassifier(n_estimators=300, learning_rate=0.05)",
    "    clf.fit(df_train.drop(columns=[label]), df_train[label])",
    "    return clf",
  ].join("\n"),
  pills: [
    { letter: "s", label: "sklearn API" },
    { letter: "G", label: "GPU trees" },
    { letter: "v", label: "versioned model" },
  ],
  goodFit: "Fast gradient boosting on wide tabular data.",
  tradeOff: "GPU builds need extra setup in the orchestrator image.",
  sourceCitation:
    "zenml-io/zenml: docs.zenml.io — LightGBM integration materializer pattern",
};

const NUMPY: FrameworkMLExample = {
  id: "numpy",
  name: "NumPy",
  badgeLetter: "np",
  badgeColor: "#4DABF7",
  badgeTextColor: "#1A1A1A",
  descriptor: "ndarray · numerical kernels",
  eyebrow: "INSIDE THE @STEP",
  title: "Pass ndarrays between @steps.",
  body: "ZenML serializes NumPy arrays automatically. Share them across steps.",
  versionChip: "numpy 2.1.0",
  codeFilename: "steps/preprocess.py",
  codeSource: [
    "import numpy as np",
    "from typing_extensions import Annotated",
    "from zenml import step",
    "",
    "@step",
    "def normalize_features(",
    "    X_raw: np.ndarray,",
    ") -> tuple[",
    "    Annotated[np.ndarray, 'X_norm'],",
    "    Annotated[np.ndarray, 'mean'],",
    "]:",
    "    mean = X_raw.mean(axis=0)",
    "    return (X_raw - mean) / X_raw.std(axis=0), mean",
  ].join("\n"),
  pills: [
    { letter: "n", label: "ndarray artifact" },
    { letter: "t", label: "tuple outputs" },
    { letter: "c", label: "content-hashed" },
  ],
  goodFit: "Passing numerical arrays cleanly between steps.",
  tradeOff: "Raw ndarrays carry no schema. Annotate outputs for clarity.",
  sourceCitation:
    "zenml-io/zenml: docs.zenml.io — NumPy materializer; Annotated tuple return pattern",
};

const POLARS: FrameworkMLExample = {
  id: "polars",
  name: "Polars",
  badgeLetter: "Po",
  badgeColor: "#CD8B00",
  badgeTextColor: "#FFFFFF",
  descriptor: "Rust-backed · lazy DataFrames",
  eyebrow: "INSIDE THE @STEP",
  title: "Use Polars DataFrames in a @step.",
  body: "ZenML materializes Polars DataFrames. Fast ETL without Spark overhead.",
  versionChip: "polars 1.9.0",
  codeFilename: "steps/feature_eng.py",
  codeSource: [
    "import polars as pl",
    "from typing_extensions import Annotated",
    "from zenml import step",
    "",
    "@step",
    "def build_features(",
    "    raw_path: str,",
    ") -> Annotated[pl.DataFrame, 'features']:",
    "    return (",
    "        pl.scan_parquet(raw_path)",
    "        .filter(pl.col('value') > 0)",
    "        .collect()",
    "    )",
  ].join("\n"),
  pills: [
    { letter: "P", label: "Parquet artifact" },
    { letter: "l", label: "lazy execution" },
    { letter: "f", label: "fast ETL" },
  ],
  goodFit: "Large ETL that's too big for pandas, too small for Spark.",
  tradeOff: "Newer ecosystem. Fewer integrations than pandas.",
  sourceCitation:
    "zenml-io/zenml: docs.zenml.io — Polars materializer integration",
};

const WANDB: FrameworkMLExample = {
  id: "wandb",
  name: "Weights & Biases",
  badgeLetter: "W",
  badgeColor: "#FFBE00",
  badgeTextColor: "#1A1A1A",
  descriptor: "eval · tracking · sweeps",
  eyebrow: "INSIDE THE @STEP",
  title: "Log experiments to W&B from a @step.",
  body: "ZenML connects your stack's experiment tracker. One decorator, full lineage.",
  versionChip: "wandb 0.18.3",
  codeFilename: "steps/train_with_tracking.py",
  codeSource: [
    "import wandb",
    "from zenml import step",
    "from zenml.integrations.wandb.flavors import WandbExperimentTrackerSettings",
    "",
    "@step(",
    "    experiment_tracker='wandb_tracker',",
    "    settings={'experiment_tracker.wandb':",
    "        WandbExperimentTrackerSettings(tags=['training', 'v2'])}",
    ")",
    "def train_and_log(X_train, y_train) -> float:",
    "    wandb.log({'loss': 0.42, 'accuracy': 0.91})",
    "    return 0.91",
  ].join("\n"),
  pills: [
    { letter: "e", label: "experiment tracker" },
    { letter: "s", label: "sweep support" },
    { letter: "l", label: "run linking" },
  ],
  goodFit: "Rich experiment tracking and sweep visualization.",
  tradeOff: "Adds an external service and API key to manage.",
  sourceCitation:
    "zenml-io/zenml: docs.zenml.io/stacks-and-components/component-guide/experiment-trackers/wandb",
};

export const FRAMEWORK_ML_EXAMPLES: ReadonlyArray<FrameworkMLExample> = [
  PYTORCH,
  TENSORFLOW,
  SKLEARN,
  PANDAS,
  HUGGINGFACE,
  XGBOOST,
  LIGHTGBM,
  NUMPY,
  POLARS,
  WANDB,
];

export const DEFAULT_FRAMEWORK_ML_EXAMPLE_ID = FRAMEWORK_ML_EXAMPLES[0].id; // pytorch — most iconic hero framework
