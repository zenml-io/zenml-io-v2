---
title: "Orchestrate Production ZenML Pipelines with Amazon SageMaker"
slug: "orchestrate-production-zenml-pipelines-with-amazon-sagemaker"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66f158051c1ea676c67b60d3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-09-23T11:59:01.842Z"
  createdOn: "2024-09-23T11:59:01.842Z"
author: "zenml-team"
tags:
  - "zenml"
  - "pipeline"
  - "orchestrators"
  - "sagemaker"
date: "2024-09-24T00:00:00.000Z"
readingTime: 3 mins
---

In the ever-evolving landscape of machine learning operations (MLOps), efficient pipeline management is crucial for successful ML projects. Today, we're excited to introduce a powerful integration that combines the flexibility of ZenML with the robustness of Amazon SageMaker Pipelines. This collaboration enables you to streamline your ML workflows by running ZenML pipelines as Amazon SageMaker Pipelines, a serverless ML orchestrator from AWS.

## Unleashing the Power of SageMaker Pipelines for ZenML

By leveraging this integration, you can take advantage of SageMaker's scalability, robustness, and built-in features to manage your ML pipelines efficiently in production environments. Let's explore the key features and benefits of this integration:

### ZenML Integration Features

<ol><li><strong>Seamless Execution</strong>: Run your ZenML pipelines as SageMaker Pipelines with minimal configuration changes.</li><li><strong>Effortless Scaling</strong>: Leverage SageMaker's serverless infrastructure to scale your pipeline execution effortlessly.</li><li><strong>Enhanced Monitoring</strong>: Track and monitor your pipeline runs using SageMaker's intuitive user interface.</li><li><strong>Resource Customization</strong>: Easily customize instance types and resources for your entire pipeline or individual steps.</li><li><strong>Stack Component Integration</strong>: Seamlessly use other AWS stack components like S3 for storage and ECR for container management.</li></ol>

### SageMaker Pipelines Advantages

<ol><li><strong>Serverless Orchestration</strong>: Enjoy the benefits of serverless, scalable orchestration for your ML workflows.</li><li><strong>Built-in Capabilities</strong>: Utilize SageMaker's built-in data processing and model training capabilities.</li><li><strong>Visual Pipeline Management</strong>: Monitor and observe your pipelines through a comprehensive visual interface.</li><li><strong>AWS Ecosystem Integration</strong>: Seamlessly integrate with other AWS services for end-to-end ML solutions.</li></ol>

## Getting Started

Let's walk through the process of setting up and using the ZenML SageMaker Pipelines integration:

### Step 1: Register a New SageMaker Orchestrator

First, you'll need to register a new SageMaker orchestrator with ZenML:

```shell
zenml orchestrator register <ORCHESTRATOR_NAME> \
    --flavor=sagemaker \
    --execution_role=<YOUR_IAM_ROLE_ARN>
```

### Step 2: Authenticate the SageMaker Orchestrator

You have three options for authentication:

<ul><li><strong>Service Connector (Recommended)</strong>:</li></ul>

```shell
zenml orchestrator connect <ORCHESTRATOR_NAME> --connector <CONNECTOR_NAME>
```

<ul><li><strong>Explicit Authentication</strong>:</li></ul>

```shell
zenml orchestrator register <ORCHESTRATOR_NAME> \
    --flavor=sagemaker \
    --execution_role=<YOUR_IAM_ROLE_ARN> \
    --aws_access_key_id=...
    --aws_secret_access_key=...
    --region=...
```

<ul><li><strong>Implicit Authentication</strong>: No additional steps needed; auth settings will be used from the running environment implicitly.</li></ul>

### Step 3: Update Your Stack

Update your ZenML stack to use the new SageMaker orchestrator:

```shell
zenml stack update -o <ORCHESTRATOR_NAME
```

## Implementing a SageMaker Pipeline

Now, let's look at how to implement a ZenML pipeline that runs on SageMaker:

```python
from zenml import step, pipeline
from zenml.integrations.aws.flavors.sagemaker_orchestrator_flavor import (
    SagemakerOrchestratorSettings,
)

@step
def preprocess_data() -> int:
    return 1

@step
def train_model(data: int) -> str:
    return str(data)

@pipeline(
    settings={
        "orchestrator.sagemaker": SagemakerOrchestratorSettings(
            instance_type="ml.m5.large",
            volume_size_in_gb=30,
        ),
    }
)
def ml_pipeline():
    input_data = preprocess_data()
    train_model(input_data)

if __name__ == "__main__":
    ml_pipeline()
```

This example demonstrates how to configure ZenML steps to run on SageMaker Pipelines. It showcases customizing instance types and resources for the entire pipeline. The `preprocess_data` step and `train_model` step will both run on the specified `ml.m5.large` instance with a 30GB volume.

## Visualizing Your Pipeline

Once your pipeline is running on SageMaker, you can visualize and monitor it using the SageMaker UI:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/25ac8516/66f158051c1ea676c67b60c2_66e13e0735069705b5b930d6_image_20_5_.png" alt="__wf_reserved_inherit" />
  <figcaption>ZenML Pipeline  executed as a Sagemaker Pipeline</figcaption>
</figure>

## Conclusion

The integration of ZenML with Amazon SageMaker Pipelines offers a powerful solution for managing ML workflows in production environments. By combining ZenML's flexibility with SageMaker's robust infrastructure, you can streamline your ML pipeline development and execution processes.

To learn more about this integration, check out the following resources:

<ul><li><a href="https://docs.zenml.io/stack-components/orchestrators/sagemaker">Read the full SageMaker Pipelines integration documentation</a></li><li><a href="https://aws.amazon.com/sagemaker/pipelines/">Learn more about Amazon SageMaker Pipelines</a></li></ul>

Start leveraging the power of ZenML and Amazon SageMaker Pipelines today to take your ML workflows to the next level!

