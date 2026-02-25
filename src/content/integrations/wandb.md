---
title: "Weights & Biases"
slug: "wandb"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a902d77560c9f7f2ad"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-08T06:36:37.844Z"
  lastUpdated: "2024-10-08T06:36:37.844Z"
  createdOn: "2023-10-12T09:13:13.415Z"
integrationType: "experiment-tracker"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/d15ff444/66d869126dc9da65a47f4a58_wandb.png"
shortDescription: "Supercharge your ZenML pipelines with seamless Weights & Biases experiment tracking and visualization"
docsUrl: "https://docs.zenml.io/stack-components/experiment-trackers/wandb"
githubUrl: "https://docs.zenml.io/stack-components/experiment-trackers/wandb"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/f38cc2ca/66f1609c09b07cedd8e525e5_Integration_image__3_.png"
seo:
  title: "Integrate Weights & Biases with ZenML - Experiment Tracker Integrations"
  description: "Supercharge your ZenML pipelines with seamless Weights & Biases experiment tracking and visualization"
  canonical: "https://www.zenml.io/integrations/wandb"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/f38cc2ca/66f1609c09b07cedd8e525e5_Integration_image__3_.png"
  ogTitle: "Integrate Weights & Biases with ZenML - Experiment Tracker Integrations"
  ogDescription: "Supercharge your ZenML pipelines with seamless Weights & Biases experiment tracking and visualization"
overviewTitle: "Supercharge your ZenML pipelines with seamless Weights & Biases experiment tracking and visualization"
overviewDescription: "Integrate Weights & Biases with ZenML to track, log, and visualize your pipeline experiments effortlessly. This powerful combination enables you to leverage Weights & Biases' interactive UI and collaborative features while managing your end-to-end ML workflows with ZenML's pipelines."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamlessly log models, parameters, and metrics from ZenML pipeline steps</li><li id=\"\">Visualize and compare pipeline run results in the intuitive Weights &amp; Biases UI</li><li id=\"\">Share pipeline artifacts and performance with team members and stakeholders</li><li id=\"\">Maintain experiment tracking continuity as you transition to MLOps best practices with ZenML</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Comprehensive experiment tracking and logging</li><li id=\"\">Interactive visualization of models, datasets, and results</li><li id=\"\">Collaboration features for sharing and discussing ML experiments</li><li id=\"\">Integrations with popular ML frameworks and tools</li><li id=\"\">Powerful querying and comparison of runs across projects</li></ul><p id=\"\">‍</p><p id=\"\">‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">from typing import Tuple\nfrom zenml import pipeline, step\nfrom zenml.client import Client\nfrom zenml.integrations.wandb.flavors.wandb_experiment_tracker_flavor import (\n    WandbExperimentTrackerSettings,\n)\nfrom transformers import (\n    AutoModelForSequenceClassification,\n    AutoTokenizer,\n    Trainer,\n    TrainingArguments,\n    DistilBertForSequenceClassification,\n)\nfrom datasets import load_dataset, Dataset\nimport numpy as np\nfrom sklearn.metrics import accuracy_score, precision_recall_fscore_support\nimport wandb\n\n# Get the experiment tracker from the active stack\nexperiment_tracker = Client().active_stack.experiment_tracker\n\n\n@step\ndef prepare_data() -> Tuple[Dataset, Dataset]:\n    dataset = load_dataset(\"imdb\")\n    tokenizer = AutoTokenizer.from_pretrained(\"distilbert-base-uncased\")\n    def tokenize_function(examples):\n        return tokenizer(examples[\"text\"], padding=\"max_length\", truncation=True)\n    tokenized_datasets = dataset.map(tokenize_function, batched=True)\n    return (\n        tokenized_datasets[\"train\"].shuffle(seed=42).select(range(1000)),\n        tokenized_datasets[\"test\"].shuffle(seed=42).select(range(100)),\n    )\n\n\n@step(experiment_tracker=experiment_tracker.name)\ndef train_model(\n    train_dataset: Dataset, eval_dataset: Dataset\n) -> DistilBertForSequenceClassification:\n    model = AutoModelForSequenceClassification.from_pretrained(\n        \"distilbert-base-uncased\", num_labels=2\n    )\n    training_args = TrainingArguments(\n        output_dir=\"./results\",\n        num_train_epochs=3,\n        per_device_train_batch_size=16,\n        per_device_eval_batch_size=16,\n        report_to=[\"wandb\"],\n    )\n\n    def compute_metrics(eval_pred):\n        logits, labels = eval_pred\n        predictions = np.argmax(logits, axis=-1)\n        precision, recall, f1, _ = precision_recall_fscore_support(\n            labels, predictions, average=\"binary\"\n        )\n        acc = accuracy_score(labels, predictions)\n        return {\"accuracy\": acc, \"f1\": f1, \"precision\": precision, \"recall\": recall}\n\n    trainer = Trainer(\n        model=model,\n        args=training_args,\n        train_dataset=train_dataset,\n        eval_dataset=eval_dataset,\n        compute_metrics=compute_metrics,\n    )\n\n    trainer.train()\n\n    # Evaluate the model\n    eval_results = trainer.evaluate()\n    print(f\"Evaluation results: {eval_results}\")\n\n    # Log final evaluation results\n    wandb.log({\"final_evaluation\": eval_results})\n\n    return model\n\n\n@pipeline\ndef fine_tuning_pipeline():\n    train_dataset, eval_dataset = prepare_data()\n    model = train_model(train_dataset, eval_dataset)\n\n\nif __name__ == \"__main__\":\n    # Run the pipeline\n    wandb_settings = WandbExperimentTrackerSettings(\n        tags=[\"distilbert\", \"imdb\", \"sentiment-analysis\"],\n    )\n\n    fine_tuning_pipeline.with_options(settings={\"experiment_tracker\": wandb_settings})()</code></pre></div><p id=\"\">‍</p>"
documentationLinkText: "Read the full integration docs"
githubLinkText: "Read the documentation"
additionalResources:
  - label: "Weights & Biases official documentation"
    href: "https://docs.wandb.ai/"
  - label: "End-to-end example: Using wandb with ZenML"
    href: "https://docs.zenml.io/stack-components/experiment-trackers/wandb#full-code-example"
isUpdatedToNewFormat: true
---

<ul><li>Seamlessly log models, parameters, and metrics from ZenML pipeline steps</li><li>Visualize and compare pipeline run results in the intuitive Weights &amp; Biases UI</li><li>Share pipeline artifacts and performance with team members and stakeholders</li><li>Maintain experiment tracking continuity as you transition to MLOps best practices with ZenML</li></ul>

<ul><li>Comprehensive experiment tracking and logging</li><li>Interactive visualization of models, datasets, and results</li><li>Collaboration features for sharing and discussing ML experiments</li><li>Integrations with popular ML frameworks and tools</li><li>Powerful querying and comparison of runs across projects</li></ul>

```python
from typing import Tuple
from zenml import pipeline, step
from zenml.client import Client
from zenml.integrations.wandb.flavors.wandb_experiment_tracker_flavor import (
    WandbExperimentTrackerSettings,
)
from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
    Trainer,
    TrainingArguments,
    DistilBertForSequenceClassification,
)
from datasets import load_dataset, Dataset
import numpy as np
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
import wandb

# Get the experiment tracker from the active stack
experiment_tracker = Client().active_stack.experiment_tracker

@step
def prepare_data() -> Tuple[Dataset, Dataset]:
    dataset = load_dataset("imdb")
    tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
    def tokenize_function(examples):
        return tokenizer(examples["text"], padding="max_length", truncation=True)
    tokenized_datasets = dataset.map(tokenize_function, batched=True)
    return (
        tokenized_datasets["train"].shuffle(seed=42).select(range(1000)),
        tokenized_datasets["test"].shuffle(seed=42).select(range(100)),
    )

@step(experiment_tracker=experiment_tracker.name)
def train_model(
    train_dataset: Dataset, eval_dataset: Dataset
) -> DistilBertForSequenceClassification:
    model = AutoModelForSequenceClassification.from_pretrained(
        "distilbert-base-uncased", num_labels=2
    )
    training_args = TrainingArguments(
        output_dir="./results",
        num_train_epochs=3,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=16,
        report_to=["wandb"],
    )

    def compute_metrics(eval_pred):
        logits, labels = eval_pred
        predictions = np.argmax(logits, axis=-1)
        precision, recall, f1, _ = precision_recall_fscore_support(
            labels, predictions, average="binary"
        )
        acc = accuracy_score(labels, predictions)
        return {"accuracy": acc, "f1": f1, "precision": precision, "recall": recall}

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        compute_metrics=compute_metrics,
    )

    trainer.train()

    # Evaluate the model
    eval_results = trainer.evaluate()
    print(f"Evaluation results: {eval_results}")

    # Log final evaluation results
    wandb.log({"final_evaluation": eval_results})

    return model

@pipeline
def fine_tuning_pipeline():
    train_dataset, eval_dataset = prepare_data()
    model = train_model(train_dataset, eval_dataset)

if __name__ == "__main__":
    # Run the pipeline
    wandb_settings = WandbExperimentTrackerSettings(
        tags=["distilbert", "imdb", "sentiment-analysis"],
    )

    fine_tuning_pipeline.with_options(settings={"experiment_tracker": wandb_settings})()
```

This code snippet demonstrates how to enable Weights & Biases experiment tracking in a ZenML pipeline step using the @step decorator. Inside the step, the WandbCallback is used to log evaluation metrics during model training, and wandb.log is called to manually log a validation metric. The Weights & Biases experiment tracker is configured through the "wandb_tracker" stack component.