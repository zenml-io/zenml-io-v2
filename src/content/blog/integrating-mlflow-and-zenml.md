---
title: "Completing the ML Platform: Integrating MLflow and ZenML"
slug: "integrating-mlflow-and-zenml"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6704fe45f2ea78fcfbd6fedf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-10-08T09:42:15.931Z"
  createdOn: "2024-10-08T09:41:25.360Z"
author: "hamza-tahir"
tags:
  - "mlops"
  - "mlflow"
  - "zenml"
date: "2024-10-08T00:00:00.000Z"
readingTime: 6 mins
---

In the world of machine learning, two critical challenges often arise: managing the end-to-end ML lifecycle and tracking experiments effectively. Enter ZenML and [MLflow](https://mlflow.org/) – two powerful tools that, when combined, create a robust ecosystem for developing, deploying, and maintaining ML projects. Let's explore why using these tools together can significantly enhance your ML workflows.

## Understanding the Roles: ZenML vs MLflow

Before we dive into their synergy, it's crucial to understand the distinct roles that ZenML and MLflow play in the ML ecosystem.

### ZenML: Your MLOps Framework

ZenML is an extensible, open-source MLOps framework designed to create production-ready machine learning pipelines. It focuses on:

<ol><li><strong>Pipeline Management</strong>: ZenML allows you to define your ML workflows as a series of interconnected steps, making complex processes more manageable.</li><li><strong>Reproducibility</strong>: By versioning your pipelines and their components, ZenML ensures that your workflows are reproducible across different environments.</li><li><strong>Infrastructure Abstraction</strong>: ZenML provides a layer of abstraction over various MLOps tools and infrastructure, allowing you to switch between different stack components easily.</li></ol>

### MLflow: Your Experiment Tracking and Model Management Tool

MLflow, on the other hand, is primarily an experiment tracking and model management platform. Its key features include:

<ol><li><strong>Experiment Tracking</strong>: MLflow allows you to log parameters, code versions, metrics, and artifacts for each of your ML runs.</li><li><strong>Model Packaging</strong>: It provides a standard format for packaging ML models that can be used in a variety of downstream tools.</li><li><strong>Model Registry</strong>: MLflow offers a centralized model store, versioning, and stage transitions to manage the full lifecycle of an MLflow Model.</li></ol>

While both ZenML and MLflow offer model management capabilities, they approach it differently:

<ul><li>ZenML's <a href="https://docs.zenml.io/how-to/use-the-model-control-plane">Model concept</a> is a high-level abstraction that includes not just the model files, but also associated artifacts, pipelines, and business logic. It's designed to give a holistic view of your ML product.</li><li>MLflow's <a href="https://mlflow.org/docs/latest/model-registry.html#concepts">model management</a> is more focused on the technical aspects of model versioning, packaging, and deployment. It's designed to track the lifecycle of the model files themselves.</li></ul>

## The Power of Integration: Why Use ZenML and MLflow Together?

By integrating ZenML and MLflow, you can leverage the strengths of both systems:

<ol><li>Use ZenML for overall pipeline management and high-level model tracking.</li><li>Use MLflow for detailed experiment tracking and technical model lifecycle management within your ZenML pipelines.</li></ol>

This combination provides a comprehensive solution for managing your entire ML workflow, from data preparation to model deployment, while maintaining detailed records of your experiments and model versions.

<ul><li><strong>End-to-End ML Lifecycle Management<br /></strong>ZenML handles the overall structure and flow of your ML pipelines, while MLflow takes care of the detailed tracking within each step. This combination provides a comprehensive view of your ML lifecycle.</li></ul>

```python
from zenml import pipeline, step
import mlflow

@step(experiment_tracker="mlflow_tracker")
def train_model():
    mlflow.tensorflow.autolog()
    
    # Your model training code here
    
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_metric("accuracy", 0.95)

@pipeline
def ml_pipeline():
    train_model()

ml_pipeline()
```

In this example, ZenML manages the overall pipeline structure, while MLflow automatically logs details about the model training process.

<ul start="2"><li><strong>Seamless Experiment Tracking<br /></strong>ZenML's integration with MLflow allows you to automatically create MLflow experiments for each pipeline run. This means you can leverage MLflow's powerful UI to visualize and compare results from different pipeline runs, all within the context of your ZenML workflows.</li></ul>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/0415c0ec/6704fe45f2ea78fcfbd6fe8c_6704f8e8333835e7439bd2ab_mlflow_screenshot.png" alt="__wf_reserved_inherit" />
</figure>

<ul start="3"><li><strong>Flexibility in Deployment Scenarios<br /></strong>ZenML's MLflow integration supports various deployment scenarios, from local development to remote servers. This flexibility allows you to start with a simple setup and scale as your project grows.</li></ul>

```bash
zenml experiment-tracker register mlflow_experiment_tracker --flavor=mlflow
zenml stack register custom_stack -e mlflow_experiment_tracker ... --set
```

For a remote setup with authentication:

```bash
zenml secret create mlflow_secret \
   --username=<USERNAME> \
   --password=<PASSWORD>
   
zenml experiment-tracker register mlflow \
   --flavor=mlflow \
   --tracking_username={{mlflow_secret.username}} \
   --tracking_password={{mlflow_secret.password}} \
   ...
```

<ul start="4"><li><strong>Enhanced Reproducibility<br /></strong>While ZenML ensures reproducibility at the pipeline level, MLflow adds an extra layer by tracking the specific parameters, metrics, and artifacts for each run. This combination makes it easier to reproduce and debug specific experiments within your larger ML workflow.Here's a more detailed example:</li></ul>

```python
from zenml import pipeline, step
import mlflow

@step(experiment_tracker="mlflow_tracker")
def train_model(learning_rate: float, num_epochs: int):
    mlflow.log_param("learning_rate", learning_rate)
    mlflow.log_param("num_epochs", num_epochs)

    # Your model training code here
    accuracy = 0.95  # placeholder for actual accuracy

    mlflow.log_metric("accuracy", accuracy)

    return accuracy

@pipeline
def reproducible_pipeline(learning_rate: float = 0.01, num_epochs: int = 10):
    accuracy = train_model(learning_rate, num_epochs)
    print(f"Model trained with accuracy: {accuracy}")

# Run the pipeline multiple times with different parameters
reproducible_pipeline()
reproducible_pipeline(learning_rate=0.001, num_epochs=20)
```

In this example, ZenML ensures that the entire pipeline is versioned and reproducible, while MLflow tracks the specific hyperparameters and results for each run. This allows you to easily compare different experiments and reproduce specific results when needed.**       **

<ul><li><strong> Model Registry and Deployment Integration<br /></strong>ZenML's integration with MLflow extends to the MLflow Model Registry, providing a seamless connection between experiment tracking, model versioning, and deployment. This integration allows you to:<ul><li>Register models from your ZenML pipelines directly to the MLflow Model Registry</li><li>Use registered models in your deployment pipelines</li><li>Keep track of model lineage from experiment to production</li></ul></li></ul>

Here's an example that demonstrates the workflow:

```python
from zenml import pipeline, step
from zenml.integrations.mlflow.steps import mlflow_register_model_step
from zenml.integrations.mlflow.model_deployers import MLFlowModelDeployer

@step
def train_and_log_model():
    # Train your model here
    model = ...

    # Log the model to MLflow
    mlflow.sklearn.log_model(model, "model")
    return model

@pipeline
def train_register_deploy_pipeline():
    model = train_and_log_model()

    # Register the model in MLflow Model Registry
    registered_model = mlflow_register_model_step(
        model=model,
        name="my-awesome-model",
        version="1.0.0"
    )

    # Deploy the registered model
    MLFlowModelDeployer().deploy_model(
        name="my-awesome-model-deployment",
        model=registered_model,
        config=MLFlowDeploymentConfig(...)
    )

# Run the pipeline
train_register_deploy_pipeline()
```

This example showcases how ZenML integrates the entire workflow:

<ol><li>The model is trained and logged to MLflow within a ZenML step.</li><li>The trained model is registered in the MLflow Model Registry using a ZenML-provided step.</li><li>The registered model is then deployed using ZenML's MLflow Model Deployer.</li></ol>

This integration provides several benefits:

<ul><li>Automatic versioning and tracking of models from experiment to production</li><li>Easy promotion of models through different stages (e.g., staging, production)</li><li>Simplified deployment process using registered models</li><li>Clear lineage tracking from experiment runs to deployed models</li></ul>

By leveraging ZenML's abstractions for experiment tracking, model registry, and model deployment - all integrated with MLflow - you get a cohesive and manageable ML lifecycle. This setup allows for easier collaboration, model governance, and transition from experimentation to production.

## Conclusion: A Match Made in ML Heaven

The integration of ZenML and MLflow offers a comprehensive solution for managing your ML workflows. ZenML provides the structure and reproducibility for your overall ML pipelines, while MLflow offers detailed experiment tracking and model management within those pipelines.

By using these tools together, you can enjoy the benefits of structured, reproducible ML pipelines with the added advantage of detailed experiment tracking and easy model management. This combination allows you to focus on what really matters – developing and improving your ML models – while the tools take care of the complexities of MLOps.

Whether you're a solo data scientist or part of a large ML team, the ZenML-MLflow integration offers a scalable, flexible, and powerful solution for your ML projects. Give it a try in your next project and experience the benefits of this dynamic duo for yourself!

