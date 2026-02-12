---
title: "Supercharge Open Source ML Workflows with ZenML And Skypilot"
slug: "supercharge-open-source-ml-workflows-with-zenml-and-skypilot"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66d1eb96fae93438864b6b25"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-02T12:17:16.743Z"
  lastUpdated: "2024-08-30T16:13:33.252Z"
  createdOn: "2024-08-30T15:56:06.934Z"
author: "hamza-tahir"
category: "tutorials"
tags:
  - "mlops"
  - "zenml"
  - "skypilot"
date: "2024-08-30T00:00:00.000Z"
readingTime: 5 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/5c4b3ab8/66d1eb64268497ccabeea28c_zenml-skypilot.png"
seo:
  title: "Supercharge Open Source ML Workflows with ZenML And Skypilot - ZenML Blog"
  description: "The combination of ZenML and SkyPilot offers a robust solution for managing ML workflows."
  canonical: "https://www.zenml.io/blog/supercharge-open-source-ml-workflows-with-zenml-and-skypilot"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/5c4b3ab8/66d1eb64268497ccabeea28c_zenml-skypilot.png"
  ogTitle: "Supercharge Open Source ML Workflows with ZenML And Skypilot - ZenML Blog"
  ogDescription: "The combination of ZenML and SkyPilot offers a robust solution for managing ML workflows."
---

Whether you're an ML engineer focusing on infrastructure or a data scientist diving into model development, the combination of ZenML and [SkyPilot](https://skypilot.readthedocs.io/) offers a robust solution for managing ML workflows. This [integration](https://docs.zenml.io/how-to/popular-integrations/skypilot) bridges the gap between rapid experimentation and scalable cloud execution.

Best part? Both tools are free and open source!

## Why ZenML + SkyPilot?

SkyPilot brings its own set of powerful capabilities to the world of MLOps/LLMOps. As an open-source orchestration framework, SkyPilot excels in cloud-agnostic workloads, allowing users to run AI jobs on any cloud with minimal code changes. It offers intelligent cloud selection based on cost and availability, automatic spot instance handling for cost savings, and efficient management of cloud storage. SkyPilot's ability to easily launch, scale, and manage cloud resources makes it an ideal complement to ZenML's MLOps functionalities. 

ZenML is an open source MLOps framework, that also abstracts away infrastructure complexity for cloud-agnostic ML workloads, but has less of a focus on the actual orchestration itself. Rather, it focuses on observability, reproducibility, and emphasizes the production stage of ML development. 

Therefore, both products have clear synergies. Here are the advantages of using both together:

<ol><li><strong>Python-Centric Workflows</strong>: Define pipelines in Python, even within notebooks, instead of YAML.</li><li><strong>Abstracted Orchestration</strong>: Hide infrastructure details, focusing on ML logic.</li><li><strong>Flexible Execution</strong>: Switch between local and cloud runs with minimal changes.</li><li><strong>Comprehensive Tracking</strong>: Automatically version code, metadata, and data.</li><li><strong>Automated Containerization</strong>: Simplify dependency management and reproducibility.</li></ol>

## Implementation Example

A good example to see the difference from good-old plain Skypilot, would be to take the [quickstart training example](https://skypilot.readthedocs.io/en/latest/getting-started/tutorial.html), and see how it would work with ZenML.

First, install the required packages:

```
pip install "zenml[server]" "zenml[skypilot]" torch transformers datasets
zenml integration install huggingface -y
# run zenml login on a deployed server
zenml login
```

Now, start writing your workflows. Here's a multi-step pipeline for fine-tuning a BERT model on the [GLUE MRPC dataset](https://huggingface.co/datasets/nyu-mll/glue):

```
from zenml import pipeline, step
from transformers import AutoModelForSequenceClassification, AutoTokenizer, Trainer, TrainingArguments, BertForSequenceClassification
from typing import Tuple
import datasets

@step(enable_cache=False)
def load_data() -> datasets.DatasetDict:
    dataset = datasets.load_dataset("glue", "mrpc")
    return dataset

@step
def preprocess_data(dataset: datasets.DatasetDict) -> Tuple[datasets.Dataset, datasets.Dataset]:
    tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
    
    def tokenize_function(examples):
        return tokenizer(examples["sentence1"], examples["sentence2"], truncation=True, padding="max_length")
    
    tokenized_datasets = dataset.map(tokenize_function, batched=True)
    return tokenized_datasets["train"], tokenized_datasets["validation"]

@step
def train_model(train_dataset: datasets.Dataset, eval_dataset: datasets.Dataset) -> BertForSequenceClassification:
    model = AutoModelForSequenceClassification.from_pretrained("bert-base-cased", num_labels=2)
    
    training_args = TrainingArguments(
        output_dir="./results",
        num_train_epochs=3,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=16,
        warmup_steps=500,
        weight_decay=0.01,
        logging_dir='./logs',
    )
    
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset
    )
    
    trainer.train()
    return model

@step
def evaluate_model(model: BertForSequenceClassification, eval_dataset: datasets.Dataset) -> dict:
    trainer = Trainer(model=model)
    results = trainer.evaluate(eval_dataset)
    return results

@pipeline
def glue_fine_tuning_pipeline():
    dataset = load_data()
    train_dataset, eval_dataset = preprocess_data(dataset)
    model = train_model(train_dataset, eval_dataset)
    results = evaluate_model(model, eval_dataset)

if __name__ == "__main__":
    glue_fine_tuning_pipeline()
```

## Running the Pipeline

1. Local Execution:

```
glue_fine_tuning_pipeline()
```

2. SkyPilot Execution:

```
from zenml.config import DockerSettings
from zenml.integrations.skypilot.flavors import SkypilotOrchestratorSettings

docker_settings = DockerSettings(
        required_integrations=["huggingface"],
    requirements=["torch", "transformers", "datasets"],
)
skypilot_settings = SkypilotOrchestratorSettings(
    instance_type="p3.2xlarge",
    use_spot=True,
    region="us-west-2"
)

glue_fine_tuning_pipeline.with_options(
    config_path="config.yaml",
    settings={
        "docker": docker_settings,
        "orchestrator.vm_aws": skypilot_settings
    }
)()
```

This demonstrates the ease of transitioning from local to cloud execution without altering the core pipeline logic. In both cases, this is how it will show up on the dashboard:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/37cc2e56/66d1eb96fae93438864b6a7a_66d1ea95d96236f53db1c500_pipeline1.png" alt="ML pipeline diagram with code for training model step" />
</figure>

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/d79db552/66d1eb96fae93438864b6a88_66d1eaa41ac762c654d78869_pipeline2.png" alt="ML pipeline diagram with details of preprocess_data output" />
</figure>

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/164d7ff4/66d1eb96fae93438864b6a85_66d1eabc4427e9c56d35f759_pipeline3.png" alt="ML pipeline diagram with run details and overview" />
</figure>

Notice how much more shared, collaborative, and observable this run is, vs. having it run ad-hoc. This is the power of having a shared MLOps framework.

## MLOps Platform Perspective: Enhancing Team Productivity at Scale

Integrating ZenML with SkyPilot offers significant advantages for scaling ML operations across larger data science organizations:

<ol><li><strong>Resource Optimization</strong>: Centralized tracking of cloud resource usage across all ML projects enables better allocation and cost management.</li><li><strong>Standardization</strong>: Enforce consistent workflows and best practices across diverse teams and projects.</li><li><strong>Collaboration</strong>: Improved visibility into model development processes and results fosters knowledge sharing and reduces redundant work.</li><li><strong>Unified Interface</strong>: A single platform for managing ML experiments, models, and deployments streamlines operations.</li><li><strong>Scalability</strong>: Seamlessly transition from experimentation to production-scale workflows without changing tools.</li></ol>

Instead of fragmented tooling and ad-hoc scripts, ZenML provides a centralized interface that tracks experiments, models, and metrics. This comprehensive view enables data science leaders to make informed decisions about resource allocation and project priorities, while the underlying SkyPilot integration ensures efficient use of cloud resources.

## Key Advantages

<ol><li><strong>Clear Separation of Concerns</strong>: Isolated steps improve maintainability and reusability.</li><li><strong>Flexible Resource Configuration</strong>: Adjust cloud resources via simple ZenML settings.</li><li><strong>Version Control</strong>: Automatic tracking of data, code, and model versions.</li><li><strong>Cost Optimization</strong>: Leverage SkyPilot's spot instance and multi-region pricing features.</li><li><strong>Reproducibility</strong>: Containerized environments ensure consistent execution across different environments.</li></ol>

## Conclusion

The ZenML + SkyPilot integration offers a powerful solution for ML teams, from individual contributors to large-scale data science operations. It combines the simplicity of ZenML's pipeline abstraction with the efficiency of SkyPilot's cloud orchestration. This approach maintains agility throughout the ML lifecycle while providing the structure necessary for scaling ML operations.

By abstracting infrastructure complexities, this integration allows data scientists and ML engineers to focus on model development and experimentation. Simultaneously, it gives MLOps teams the tools to standardize practices, optimize resources, and foster collaboration across the organization. The seamless transition between local and cloud environments, coupled with comprehensive versioning and tracking, makes this an invaluable asset for modern ML workflows in organizations of any size.

Try out ZenML with Skypilot today with the [starter guide](https://docs.zenml.io/user-guide/starter-guide), and let us know on [Slack](https://zenml.io/slack) how it went!