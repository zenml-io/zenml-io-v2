---
title: "MLOps pipelines as experiments with ZenML and Weights & Biases"
slug: "mlops-pipelines-as-experiments-with-zenml-and-weights-biases"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66f16285758b96705911e404"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-09-23T12:43:49.742Z"
  createdOn: "2024-09-23T12:43:49.742Z"
author: "hamza-tahir"
tags:
  - "mlops"
  - "zenml"
date: "2024-09-24T00:00:00.000Z"
readingTime: 4 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/6582c74b/66f16127938dfd2080b6afa2_hf-zenml.png"
---

Machine learning projects often require robust pipeline management and comprehensive experiment tracking. By combining ZenML and Weights & Biases (W&B), data scientists and ML engineers can streamline their workflows and gain valuable insights into their experiments. This post explores the benefits of this integration and provides a practical example.

## ZenML and Weights & Biases: An Overview

ZenML is an open-source MLOps framework for creating production-ready machine learning pipelines. It offers a structured approach to defining and managing ML workflows.

[Weights & Biases](https://wandb.ai/site) is a popular experiment tracking platform that provides tools for logging, visualizing, and comparing ML experiments.

Together, these tools offer a comprehensive solution for managing the ML lifecycle, from pipeline orchestration to detailed experiment analysis.

## Setting Up the Integration

To get started with the ZenML and W&B integration, follow these steps:

```shell
# Install ZenML with W&B integration
pip install "zenml[server]"
zenml integration install wandb -y

# Set up W&B credentials as a ZenML secret
zenml secret create wandb_secret \\
    --entity=<YOUR_WANDB_ENTITY> \\
    --project_name=<YOUR_WANDB_PROJECT> \\
    --api_key=<YOUR_WANDB_API_KEY>

# Register the W&B experiment tracker in your ZenML stack
zenml experiment-tracker register wandb_tracker \\
    --flavor=wandb \\
    --entity={{wandb_secret.entity}} \\
    --project_name={{wandb_secret.project_name}} \\
    --api_key={{wandb_secret.api_key}}

# Create and set a new stack with the W&B tracker
zenml stack register wandb_stack -e wandb_tracker -a default -o default --set
```

You should see the stack in your ZenML dashboard:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a5e53f26/66f16284758b96705911e338_66f161835f27ede8dc2a1011_image_20_33_.png" alt="ZenML stack configuration page for &#039;wandb_stack&#039; with ID a78aafb2-0f60-4068-881a-042b45165389. The stack includes three components: default Orchestrator (903db21b), wandb_experiment_tracker as Experiment Tracker (f120abaa), and default Artifact Store (f5e60f9d). A &#039;Set this stack&#039; option is available at the top." />
  <figcaption>A ZenML stack with a Weights &amp; Biases experiment tracker</figcaption>
</figure>

## Practical Example: Sentiment Analysis Pipeline

Let's implement a sentiment analysis pipeline using ZenML and W&B. This example demonstrates how to fine-tune a DistilBERT model on the IMDB dataset while tracking experiments with W&B.

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
        warmup_steps=500,
        weight_decay=0.01,
        logging_dir="./logs",
        evaluation_strategy="epoch",
        logging_steps=100,
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
    eval_results = trainer.evaluate()
    wandb.log({"final_evaluation": eval_results})

    return model

@pipeline(enable_cache=False)
def sentiment_analysis_pipeline():
    train_dataset, eval_dataset = prepare_data()
    model = train_model(train_dataset, eval_dataset)

if __name__ == "__main__":
    wandb_settings = WandbExperimentTrackerSettings(
        tags=["distilbert", "imdb", "sentiment-analysis"],
    )
    sentiment_analysis_pipeline.with_options(settings={"experiment_tracker": wandb_settings})()
```

This pipeline:

<ol><li>Prepares the IMDB dataset for sentiment analysis.</li><li>Fine-tunes a DistilBERT model on the prepared data.</li><li>Logs metrics and artifacts to W&amp;B throughout the training process.</li></ol>

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/8ef7dd2d/66f16285758b96705911e345_66f161defcf7e99f80518594_image_20_34_.png" alt="ZenML interface showing pipeline &#039;fine_tuning_pipeline-2024_09_20-12_16_02_686721&#039;. Left sidebar displays navigation options. Center shows pipeline graph with &#039;prepare_data&#039; step outputting to two datasets, feeding into &#039;train_model&#039; step, which outputs a distilbert model. Right panel shows run details including ID, completed status, author, start/end times, and duration of 55 seconds." />
  <figcaption>A simple finetuning pipeline with a W&amp;B experiment tracker on the ZenML dashboard</figcaption>
</figure>

## Analyzing Results in Weights & Biases

As the pipeline runs, W&B automatically creates experiment logs for each tracked step. The W&B dashboard provides access to:

<ol><li>Detailed metrics including accuracy, F1 score, precision, and recall.</li><li>Training progress visualizations.</li><li>System performance metrics.</li><li>Model architecture and hyperparameter information.</li></ol>

## Key Advantages of the ZenML-W&B Integration

<ol><li>Automated Experiment Tracking: ZenML pipelines seamlessly log metrics and artifacts to W&amp;B.</li><li>Improved Visibility: W&amp;B's interface allows for easy comparison of different pipeline runs.</li><li>Simplified Workflow: W&amp;B integration can be enabled in ZenML steps with minimal configuration.</li><li>Enhanced Collaboration: Automatic tagging and organization facilitate team coordination.</li><li>Customizable Tracking: ZenML's <code>WandbExperimentTrackerSettings</code> allow for tailored experiment tracking.</li></ol>

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/c788b09a/66f16285758b96705911e34c_66f16215a1307498d149d90e_wandb_results.png" alt="Weights &amp; Biases dashboard showing performance metrics for 6 fine-tuning pipeline runs. Left panel lists runs. Main area displays 6 line graphs: eval/accuracy, eval/recall, eval/steps_per_second, eval/samples_per_second, eval/precision, and eval/runtime. Each graph shows performance over 5 steps for multiple runs, with different colored lines representing different pipeline executions." />
</figure>

## Conclusion

The integration of ZenML and Weights & Biases offers significant benefits for ML practitioners:

<ul><li>Scalability: Effectively manage and track experiments as projects grow in complexity.</li><li>Reproducibility: ZenML's structured pipelines ensure consistent, version-controlled workflows.</li><li>Efficiency: Streamline the ML lifecycle from data preparation to model deployment.</li><li>Collaboration: Facilitate team collaboration through shared pipelines and experiment logs.</li><li>Insight: Gain comprehensive understanding of model performance and training processes.</li></ul>

By leveraging this integration, teams can focus on developing innovative ML solutions while maintaining best practices in experiment tracking and pipeline management. Consider implementing this approach in your next ML project to experience these benefits firsthand.

To learn more, check out the [full documentation.](https://docs.zenml.io/stack-components/experiment-trackers/wandb#weights-and-biases-ui)

