---
title: "Hugging Face"
slug: "huggingface"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66f15a3697f4dcfa37da078a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-04-13T14:23:06.098Z"
  lastUpdated: "2025-04-13T08:47:47.813Z"
  createdOn: "2024-09-23T12:08:22.432Z"
integrationType: "modeling"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/4a909b44/66f15a47230d547766de53f9_66d86795fb809547dcae5c99_huggingface-p-130x130q80.png"
shortDescription: "Accelerate NLP and Computer Vision with Hugging Face Models in ZenML Pipelines"
docsUrl: "https://docs.zenml.io/how-to/pipeline-development/training-with-gpus/accelerate-distributed-training"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/llm_finetuning"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/a71646c2/66f1599e1983557cdabc4786_image__32_.png"
relatedBlogPosts:
  - "huggingface-to-sagemaker"
  - "productionalizing-nlp-models-with-zenml"
  - "embedding-huggingface-datasets-visualizations-with-zenml"
seo:
  title: "Integrate Hugging Face with ZenML - Modeling Integrations"
  description: "Accelerate NLP and Computer Vision with Hugging Face Models in ZenML Pipelines"
  canonical: "https://www.zenml.io/integrations/huggingface"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/a71646c2/66f1599e1983557cdabc4786_image__32_.png"
  ogTitle: "Integrate Hugging Face with ZenML - Modeling Integrations"
  ogDescription: "Accelerate NLP and Computer Vision with Hugging Face Models in ZenML Pipelines"
---

<ul><li><strong>Seamless Integration of Hugging Face Models<br /></strong>Effortlessly incorporate Hugging Face pre-trained models into ZenML pipeline steps for NLP and computer vision tasks.</li><li><strong>Access to Extensive Model Hub<br /></strong>Tap into Hugging Face's vast collection of state-of-the-art models, covering a wide range of architectures and domains.</li><li><strong>Modular Pipeline Structure<br /></strong>Organize your NLP workflows into distinct steps for data preparation and model training, enhancing reusability and maintainability.</li><li><strong>Reproducible Model Tracking<br /></strong>Track and version Hugging Face models used in your pipelines, ensuring reproducibility and ease of collaboration.</li></ul>

<ul><li>Extensive library of pre-trained models for NLP and computer vision</li><li>Works with the <a href="https://huggingface.co/docs/datasets/en/index">Datasets</a> library for efficient data handling</li><li>Return any model with the <a href="https://huggingface.co/docs/transformers/en/index">transformers library</a> and have it tracked natively</li><li>Integrated with the <a href="https://huggingface.co/docs/accelerate/en/index">Accelerate</a> library to orchestrate multi-node, multi-gpu workflows</li><li>Support for GenAI-specific toolsets like <a href="https://github.com/zenml-io/zenml-projects/tree/main/llm-lora-finetuning">PEFT and LoRA fine-tuning.</a></li></ul>

```python
from typing import Tuple
from zenml import pipeline, step
from zenml.integrations.huggingface.steps import run_with_accelerate
from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
    Trainer,
    TrainingArguments,
    DistilBertForSequenceClassification,
)
from datasets import load_dataset, Dataset

@step
def prepare_data() -> Tuple[Dataset, Dataset]:  # Return any Huggingface dataset
    dataset = load_dataset("imdb")
    tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
    def tokenize_function(examples):
        return tokenizer(examples["text"], padding="max_length", truncation=True)
    tokenized_datasets = dataset.map(tokenize_function, batched=True)
    return (
        tokenized_datasets["train"].shuffle(seed=42).select(range(1000)),
        tokenized_datasets["test"].shuffle(seed=42).select(range(100)),
    )

@run_with_accelerate(num_processes=4, multi_gpu=True)  #  Distribute workload with accelerate
@step(enable_cache=False) 
def train_model(
    train_dataset: Dataset, eval_dataset: Dataset
) -> DistilBertForSequenceClassification:
    model = AutoModelForSequenceClassification.from_pretrained(
        "distilbert-base-uncased", num_labels=2
    )
    training_args = TrainingArguments(
        output_dir="./results",
        num_train_epochs=3,
        )
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
    )
    trainer.train()
    return model                                         # Return any HF model to track it

@pipeline
def fine_tuning_pipeline():
    train_dataset, eval_dataset = prepare_data()
    model = train_model(train_dataset, eval_dataset)

if __name__ == "__main__":
    fine_tuning_pipeline()
```

This example demonstrates how to fine-tune a Hugging Face model within a ZenML pipeline for sentiment analysis on the IMDB dataset. The pipeline consists of two main steps:

<ol><li><strong>Data Preparation</strong>: The <code>prepare_data</code> step loads the IMDB dataset, tokenizes it using a DistilBERT tokenizer, and returns subsets of the train and test data.</li><li><strong>Model Training</strong>: The <code>train_model</code> step initializes a DistilBERT model, sets up training arguments, and fine-tunes the model on the prepared data. It also includes evaluation and model saving functionality. This runs with the <code>accelerate</code> library to distribute over 4 GPUs.</li></ol>

The `fine_tuning_pipeline` function combines these steps into a cohesive workflow. This structure allows for easy modification and extension of the pipeline for different NLP tasks or models.

