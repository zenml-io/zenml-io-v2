---
title: "Automating Lightning Studio ML Pipelines For Fine Tuning LLM (s)"
slug: "automating-lightning-studio-ml-pipelines-for-fine-tuning-llm"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66e8207b77db4a356cbadcd9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-02-03T10:53:46.128Z"
  createdOn: "2024-09-16T12:11:39.302Z"
author: "hamza-tahir"
category: "llms"
tags:
  - "llm"
  - "lightning-ai"
date: "2024-10-09T00:00:00.000Z"
readingTime: 06 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/40392bd9/6981d352ce4b26d085d70402_6981d2b6acf92514df57e377_Blog_Lightning.avif"
seo:
  title: "Automating Lightning Studio ML Pipelines For Fine Tuning LLM (s) - ZenML Blog"
  description: "In the AI world, fine-tuning Large Language Models (LLMs) for specific tasks is becoming a critical competitive advantage. Combining Lightning AI Studios with ZenML can streamline and automate the LLM fine-tuning process, enabling rapid iteration and deployment of task-specific models. This approach allows for the creation and serving of multiple fine-tuned variants of a model, with minimal computational resources. However, scaling the process requires resource management, data preparation, hyperparameter optimization, version control, deployment and serving, and cost management. This blog post explores the growing complexity of LLM fine-tuning at scale and introduces a solution that combines the flexibility of Lightning Studios with the automation capabilities of ZenML."
  canonical: "https://www.zenml.io/blog/automating-lightning-studio-ml-pipelines-for-fine-tuning-llm"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/40392bd9/6981d352ce4b26d085d70402_6981d2b6acf92514df57e377_Blog_Lightning.avif"
  ogTitle: "Automating Lightning Studio ML Pipelines For Fine Tuning LLM (s) - ZenML Blog"
  ogDescription: "In the AI world, fine-tuning Large Language Models (LLMs) for specific tasks is becoming a critical competitive advantage. Combining Lightning AI Studios with ZenML can streamline and automate the LLM fine-tuning process, enabling rapid iteration and deployment of task-specific models. This approach allows for the creation and serving of multiple fine-tuned variants of a model, with minimal computational resources. However, scaling the process requires resource management, data preparation, hyperparameter optimization, version control, deployment and serving, and cost management. This blog post explores the growing complexity of LLM fine-tuning at scale and introduces a solution that combines the flexibility of Lightning Studios with the automation capabilities of ZenML."
---

In the fast-paced world of AI, the ability to efficiently fine-tune Large Language Models (LLMs) for specific tasks is becoming a critical competitive advantage. This post dives into how combining Lightning AI Studios with ZenML can streamline and automate your LLM fine-tuning process, enabling rapid iteration and deployment of task-specific models.

## The LLM Fine Tuning Challenge

As LLMs like [GPT-4o](https://platform.openai.com/docs/guides/fine-tuning), [Llama 3.1](https://huggingface.co/blog/mlabonne/sft-llama3), [Mistral](https://docs.mistral.ai/guides/finetuning/), etc. become more accessible, companies are increasingly looking to adapt these models for specialized tasks. This could range from customer service chatbots and content generation to specialized data analysis and decision support systems.

One of the most exciting developments in LLM fine-tuning is the ability to create and serve multiple fine-tuned variants of a model efficiently. With LoRA (Low-Rank Adaptation) and its many variants [[1](https://www.marktechpost.com/2024/02/29/uc-berkeley-researchers-unveil-lora-a-breakthrough-in-machine-learning-model-finetuning-with-optimized-learning-rates-for-superior-efficiency-and-performance/)][[2](https://venturebeat.com/ai/running-thousands-of-llms-on-one-gpu-is-now-possible-with-s-lora/)], you can generate small adapter weights that modify the behavior of the base model without changing its core parameters. This allows you to service each use case with its own fine-tuned model variant.

This approach has tremendous benefits:

<ol><li>Fine-tune models with minimal computational resources</li><li>Store and distribute only the adapter weights (typically a few MB) instead of entire models</li><li>Serve thousands of fine-tuned variants from a single base model (see <a href="https://github.com/predibase/lorax">LoRAX</a>)</li></ol>

## Generating A Fine Tuning LLM Flywheel

However, as organizations seek to leverage these models for specific use cases, a new challenge has emerged: the need to efficiently fine-tune and manage numerous LLM variants. The challenge lies in scaling this process. Fine-tuning a single LLM is manageable (in fact it’s easier than ever with tools like [axolotl](https://github.com/axolotl-ai-cloud/axolotl)), but what happens when you need to maintain and update dozens or even hundreds of fine-tuned models? Some key issues include:

<ol><li><strong>Resource Management</strong>: LLM fine-tuning is computationally intensive, often requiring specialized hardware like GPUs or TPUs.</li><li><strong>Data Preparation</strong>: Each fine-tuning task may require its own dataset, which needs to be collected, cleaned, and formatted appropriately.</li><li><strong>Hyperparameter Optimization</strong>: Finding the right hyperparameters for each fine-tuning task can be a time-consuming process.</li><li><strong>Version Control</strong>: Keeping track of different model versions, their training data, and performance metrics becomes increasingly complex.</li><li><strong>Deployment and Serving</strong>: Getting fine-tuned models into production efficiently and managing their lifecycle presents another set of challenges.</li><li><strong>Cost Management</strong>: With the computational resources required, costs can quickly spiral if not managed carefully.</li></ol>

### Setting up infrastructure is hard

As organizations scale up their LLM usage, these challenges compound. What's needed is not just a way to fine-tune models, but a comprehensive, automated pipeline for managing the entire process. These projects also face challenges in setting up and managing infrastructure. This process can be time-consuming and complex, especially when dealing with distributed training or scaling workloads. Data scientists working on the models shouldn’t have to worry about spinning up and maintaining compute instances or managing credentials for them. This is where ZenML and Lightning AI can help you! This blog post explores the growing complexity of LLM fine-tuning at scale and introduces a solution that combines the flexibility of Lightning Studios with the automation capabilities of ZenML.

### Lightning Studios: Your New ML Playground

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9b982d60/66e8580a9e2a50f0c71fa27a_66e8207a77db4a356cbadc11_66e818b42e154c9d9533ee77_Untitled_2520_11_.png" alt="A screenshot of a Lightning AI studio workspace. It showcases a VS Code instance. On the right you see the ability to change the Machine type to many different GPU configurations." />
</figure>

[Lightning AI](https://lightning.ai/), the brainchild of the [PyTorch Lightning](https://lightning.ai/docs/pytorch/stable/) crew, has dropped a bomb on the ML world with their Studios concept. Think of it as your personal, scalable ML lab in the cloud. Need to switch from CPU to multi-GPU setups on the fly? Lightning's got you covered.

Studios provide modular, cloud-based environments pre-configured with essential ML libraries. The key advantage is flexibility - you can easily scale from CPU-only setups to multi-GPU, multi-node configurations as your needs evolve. For LLM fine-tuning, this means you can:

<ol><li>Prototype and debug your data preperation scripts on CPU instances</li><li>Seamlessly switch to GPU instances for the actual training</li><li>Scale up to multi-GPU setups for larger models or datasets</li></ol>

### ZenML: Structuring and Automating ML Workflows

While Lightning Studios provide the environment, ZenML brings structure and automation to your ML pipelines. As an open-source MLOps framework, ZenML integrates seamlessly with Lightning AI, allowing you to define reproducible, scalable workflows for your fine-tuning tasks.

ZenML offers several key benefits when combined with Lightning AI:

<ol><li><strong>Faster Execution</strong>: Automatic packaging and upload of code to Lightning AI Studio.</li><li><strong>Reproducible Training</strong>: Consistent results by encapsulating Lightning AI configurations within ZenML pipelines.</li><li><strong>Quick Experimentation</strong>: Run experiments with different parameters and on different machines quickly using ZenML's configurable pipelines.</li><li><strong>Seamless Tracking</strong>: Track and compare model metrics, hyperparameters, and artifacts using ZenML's experiment tracking features.</li><li><strong>Managed Infrastructure</strong>: Access to Lightning AI's infrastructure, including GPUs, for running your pipelines.</li><li><strong>Built-in Distributed Training</strong>: Leverage Lightning AI's support for distributed training out of the box.</li></ol>

To prepare your environment for LLM fine-tuning with ZenML and Lightning Studios:

<ol><li>Install ZenML and the Lightning integration:</li></ol>

```shell
pip install zenml
zenml integration install lightning s3 aws -y
```

<ol start="2"><li>Clone the sample project:</li></ol>

```shell
git clone https://github.com/zenml-io/zenml-projects.git
cd zenml-projects/llm-finetuning-simple
pip install -r requirements.txt
```

<ol start="3"><li>Initialize and connect to a <a href="https://docs.zenml.io/getting-started/deploying-zenml">deployed ZenML server</a>:</li></ol>

```shell
zenml init
zenml connect --url <MYZENMLSERVERURL>
```

These steps install necessary tools, set up your project, and prepare ZenML for use with Lightning Studios. This foundation enables you to create reproducible ML pipelines, easily switch between local and cloud environments, and effectively track your experiments.

With this setup, you're ready to define your LLM fine-tuning pipeline and leverage the scalability of Lightning Studios for your training tasks.

#### Fine-tuning LLMs in 60 lines of code

While LLM fine-tuning can seem daunting, we can distill the core process into a concise, yet powerful script. Here's a condensed ZenML pipeline that captures the essence of LLM fine-tuning in just about 60 lines of code:

```python
import torch
from datasets import load_dataset, Dataset
from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, DataCollatorForLanguageModeling
from zenml import pipeline, step, log_model_metadata
from typing_extensions import Annotated
import argparse
from zenml.integrations.huggingface.materializers.huggingface_datasets_materializer import HFDatasetMaterializer

@step(output_materializers=HFDatasetMaterializer)
def prepare_data(base_model_id: str, dataset_name: str, dataset_size: int, max_length: int) -> Annotated[Dataset, "tokenized_dataset"]:
    tokenizer = AutoTokenizer.from_pretrained(base_model_id)
    tokenizer.pad_token = tokenizer.eos_token
    dataset = load_dataset(dataset_name, split=f"train[:{dataset_size}]")

    def tokenize_function(example):
        prompt = f"Question: {example['question']}\\nAnswer: {example['answers']['text'][0]}"
        return tokenizer(prompt, truncation=True, padding="max_length", max_length=max_length)

    tokenized_data = dataset.map(tokenize_function, remove_columns=dataset.column_names)
    log_model_metadata(metadata={"dataset_size": len(tokenized_data), "max_length": max_length})
    return tokenized_data

@step
def finetune(base_model_id: str, tokenized_dataset: Dataset, num_train_epochs: int, per_device_train_batch_size: int) -> None:
    torch.cuda.empty_cache()
    model = AutoModelForCausalLM.from_pretrained(
        base_model_id,
        device_map="auto",
        torch_dtype=torch.float32,  # Changed from float16 to float32
        low_cpu_mem_usage=True
    )
    tokenizer = AutoTokenizer.from_pretrained(base_model_id)
    tokenizer.pad_token = tokenizer.eos_token
    model.config.pad_token_id = tokenizer.pad_token_id

    training_args = TrainingArguments(
        output_dir="./results",
        num_train_epochs=num_train_epochs,
        per_device_train_batch_size=per_device_train_batch_size,
        gradient_accumulation_steps=8,
        logging_steps=10,
        save_strategy="epoch",
        learning_rate=2e-5,
        weight_decay=0.01,
        optim="adamw_torch",
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset,
        data_collator=DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False),
    )

    train_result = trainer.train()
    log_model_metadata(metadata={"metrics": {"train_loss": train_result.metrics.get("train_loss")}})
    trainer.save_model("finetuned_model")

@pipeline
def llm_finetune_pipeline(base_model_id: str):
    tokenized_dataset = prepare_data(base_model_id)
    finetune(base_model_id, tokenized_dataset)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', type=str, required=True, help='Path to the YAML config file')
    args = parser.parse_args()
    llm_finetune_pipeline.with_options(config_path=args.config)()
```

<aside>

You can see all the code from this blog in this [GitHub repository](https://github.com/zenml-io/zenml-projects/tree/main/llm-finetuning-simple).

</aside>

This script encapsulates the core components of LLM fine-tuning:

<ol><li><strong>Data Preparation</strong>: The <code>prepare_data</code> step loads and tokenizes the dataset, preparing it for training.</li><li><strong>Fine-tuning</strong>: The <code>finetune</code> step sets up the model, training arguments, and executes the fine-tuning process.</li><li><strong>Pipeline Definition</strong>: The <code>llm_finetune_pipeline</code> ties these steps together into a cohesive workflow.</li></ol>

While this script provides a solid foundation, in practice, you'll likely want to add more sophisticated error handling, logging, and potentially additional steps for evaluation and model deployment.

#### Leveraging PyTorch Lightning Checkpoints

ZenML's flexibility extends to integrating with popular deep learning frameworks like PyTorch Lightning. One powerful feature is the ability to link externally produced data as ZenML artifacts. This is particularly useful for managing model checkpoints produced during training.

Here's how we can modify our existing fine-tuning step to incorporate this feature:

```python
from zenml import step, link_folder_as_artifact
from transformers import AutoModelForCausalLM, AutoTokenizer, Trainer, TrainingArguments

@step
def finetune(base_model_id: str, tokenized_dataset: Dataset, num_train_epochs: int, per_device_train_batch_size: int) -> None:
    # ... (existing model and tokenizer setup)

    training_args = TrainingArguments(
        output_dir="./results",
        num_train_epochs=num_train_epochs,
        per_device_train_batch_size=per_device_train_batch_size,
        # ... (other training arguments)
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset,
        data_collator=DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False),
    )

    try:
        train_result = trainer.train()
        trainer.save_model("finetuned_model")
    finally:
        # Link the saved model and checkpoints as ZenML artifacts
        link_folder_as_artifact(
            folder_uri="./results",
            name="llm_fine_tuning_artifacts"
        )

    log_model_metadata(metadata={"metrics": {"train_loss": train_result.metrics.get("train_loss")}})
```

This approach allows you to leverage the Hugging Face Trainer's checkpoint saving capabilities while seamlessly integrating with ZenML's artifact management system. By using link_folder_as_artifact, you can treat the saved model and checkpoints as ZenML artifacts, making them easily accessible for future use, versioning, and tracking.

#### Streamlining Parameter Management with YAML

Rather than cluttering our command line with numerous parameters, we can leverage [a YAML configuration file](https://docs.zenml.io/how-to/use-configuration-files) to manage our fine-tuning settings. Here's an example `small_model.yaml`:

```YAML
model:
  name: llm-finetuning-distilgpt2-small
  description: "Fine-tune DistilGPT-2 on smaller computer."
  tags:
    - llm
    - finetuning
    - distilgpt2

parameters:
  base_model_id: distilgpt2

steps:
  prepare_data:
    parameters:
      dataset_name: squad
      dataset_size: 100
      max_length: 128

  finetune:
    parameters:
      num_train_epochs: 1
      per_device_train_batch_size: 4
```

This YAML file allows us to easily adjust parameters like the base model, dataset size, and training epochs without modifying our core script. To run the fine-tuning process with these parameters, we simply execute:

```shell
python run.py --config configs/config_small_cpu.yaml
```

#### Visualizing Results with ZenML

One of the key advantages of using ZenML is the ability to track and visualize your experiments. After running your fine-tuning pipeline, you can view the results in the ZenML dashboard:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5dba8303/66e8580a9e2a50f0c71fa274_66e8207a77db4a356cbadc0b_66e81bbdd4f3ff72906bb8d5_Untitled_2520_12_.png" alt="A screenshot of the ZenML directed acyclic graph visualizer, showcasing a LLM finetuning pipeline run" />
</figure>

This dashboard provides an overview of your pipeline runs, allowing you to compare different experiments and track your progress over time.

For ZenML Pro users, the Model section offers even more detailed metrics:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/243ad0b3/66e8580a9e2a50f0c71fa26c_66e8207a77db4a356cbadc14_66e81be57d11ed163379a615_Untitled_2520_13_.png" alt="A screenshot of the ZenML model control plane, with some metrics and metadata tracked for a finetuned LLM model." />
</figure>

These visualizations can be invaluable for understanding the performance of your fine-tuned models and making data-driven decisions about further improvements.

### Leveraging Lightning AI Studios + ZenML

To take full advantage of Lightning AI Studios' scalable compute resources, we can configure our ZenML stack to use Lightning as our orchestrator. Here's how to set it up:

<ol><li>First, register a Lightning orchestrator:</li></ol>

```shell
zenml integration install lightning s3
zenml orchestrator register lightning_orchestrator -f lightning \\
    --machine_type=CPU \\
    --user_id=<YOUR_LIGHTNING_USER_ID> \\
    --api_key=<YOUR_LIGHTNING_USER_KEY> \\
    --username=<YOUR_LIGHTNING_USERNAME> \\ # or --organization
    --teamspace=<YOUR_LIGHTNING_TEAMSPACE>
```

<ol start="2"><li>Next, set up a remote artifact store (in this case, using AWS S3).</li></ol>

```shell
zenml artifact-store register s3_store -f s3 --path=s3://yourpath
```

<ol start="3"><li>Finally, create and set your ZenML stack:</li></ol>

```shell
zenml stack register lightning_stack -o lightning_orchestrator -a s3_store
zenml stack set lightning_stack
```

With this configuration, you can now leverage Lightning AI Studios' resources for your fine-tuning tasks. To make the most of this setup, you can create a more detailed YAML configuration file that specifies different compute resources for different steps of your pipeline:

```YAML
settings:
  docker:
    requirements: requirements.txt
    python_package_installer: uv
    apt_packages:
      - git
    environment:
      PJRT_DEVICE: CUDA
      USE_TORCH_XLA: "false"
      MKL_SERVICE_FORCE_INTEL: "1"
      PYTORCH_CUDA_ALLOC_CONF: "expandable_segments"

model:
  name: llm-finetuning-gpt2-large
  description: "Fine-tune GPT-2 on larger GPU."
  tags:
    - llm
    - finetuning
    - gpt2-large

parameters:
  base_model_id: gpt2-large

steps:
  prepare_data:
    parameters:
      dataset_name: squad
      dataset_size: 1000
      max_length: 512

  finetune:
    parameters:
      num_train_epochs: 3
      per_device_train_batch_size: 8

    settings:
        orchestrator.lightning:
          machine_type: A10G
```

This configuration allows you to use CPU instances for data preparation and potentially evaluation steps, while leveraging powerful GPU instances (in this case, an A10G) for the compute-intensive fine-tuning step.

We can run it with:

```shell
python run.py --config configs/config_large_gpu.yaml
```

This will set off a run in the ZenML Dashboard using Lightning AI Studio as the orchestrator.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/4dc380b5/670503073fbd35e24d31c8fb_6705020c4946a0aac7f4b749_image_20_35_.png" alt="__wf_reserved_inherit" />
</figure>

You will now see a new studio spin up on your lightning studio account, which will execute the pipeline and then exit when the task finishes.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2773c59d/670503073fbd35e24d31c8e7_6705023a8576da228d2391b0_Screenshot_2024-10-07_at_09.05.27.webp" alt="__wf_reserved_inherit" />
</figure>

## Why This Matters: The Future of AI is Task-Specific

While general-purpose models like GPT-4 and Claude Opus are undoubtedly impressive, they often represent overkill for many specific tasks. These models come with significant computational and financial costs, making them impractical for many organizations to deploy at scale.

The future of AI lies not just in these massive, general-purpose models, but in the ability to rapidly create and deploy task-specific models that are more efficient and cost-effective. As highlighted in a recent [TechCrunch article](https://techcrunch.com/2023/10/23/zenml-empowers-companies-to-build-their-own-ai-stack-based-on-open-source-tools/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAALbCJPVW4ui4MfTEDK_DpmmC9ipON8UgaPiezD4yY2HniwyxiwhbNvjbu1nfVcuqJzuPIG3a35mDgnsnMozX5ZytDiS0D9A-o1jD3flwr6VCmCgjJCpFHPMcTV24Q8_WTQkZLpf_9fTxMDrPiylK3Db3ND9CVDJ8MQpsby7bQQLv), ZenML is betting on a future where companies build their own AI stacks using smaller, more efficient models tailored to their specific needs.

This approach offers several key advantages:

<ol><li><strong>Cost-Effectiveness</strong>: Smaller, task-specific models require less computational resources to run, reducing operational costs.</li><li><strong>Improved Performance</strong>: Models fine-tuned on domain-specific data often outperform general-purpose models on specialized tasks.</li><li><strong>Faster Iteration</strong>: Smaller models allow for quicker experimentation and iteration cycles, speeding up development.</li><li><strong>Data Privacy</strong>: By fine-tuning your own models, you maintain control over your training data, which is crucial for many industries with strict privacy requirements.</li></ol>

The combination of Lightning Studios and ZenML provides a powerful toolkit for automating LLM fine-tuning pipelines, positioning you to ride this wave of task-specific AI. This approach enables teams to:

<ol><li>Rapidly prototype and experiment with different fine-tuning strategies</li><li>Efficiently allocate computational resources across the pipeline</li><li>Maintain reproducibility and scalability in ML workflows</li><li>Easily manage and deploy multiple fine-tuned model variants</li></ol>

As we move towards more specialized AI applications, the ability to quickly fine-tune and deploy task-specific models becomes increasingly valuable. Whether you're building a specialized chatbot, a domain-specific text analyzer, or exploring novel AI applications, this automated pipeline approach provides the flexibility and efficiency needed to stay competitive in the rapidly evolving world of AI.

The future of AI isn't just about having the biggest model - it's about having the right model for the job. With Lightning AI Studios and ZenML, you can build and deploy those models faster and more efficiently than ever.