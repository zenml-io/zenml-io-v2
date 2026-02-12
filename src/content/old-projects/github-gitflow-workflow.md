---
title: "Use ZenML seamlessly with GitHub"
slug: "github-gitflow-workflow"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b03dc8ae915507616760"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-11-04T08:31:31.899Z"
  createdOn: "2023-10-12T08:37:17.855Z"
date: "2023-01-31"
originalDate: "2023-01-31T00:00:00.000Z"
category: "tabular-data"
tags:
  - "aws"
  - "kubeflow"
  - "mlflow"
  - "github"
  - "deepchecks"
image:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/c49c80e3/65280bf28613658724db46e5_github_integration.jpg"
description: "A GitHub workflow that automates CI/CD with continuous model training and continuous model deployment to production"
seoTitle: "Use ZenML seamlessly with GitHub"
seoDescription: "A GitHub workflow that automates CI/CD with continuous model training and continuous model deployment to production"
readingTime: 4 minutes
seo:
  title: "ZenML - One AI Platform - From Pipelines to Agents"
  description: "An open-source foundation to ship reliable AI products at scale - on any cloud, anywhere."
  canonical: "https://www.zenml.io"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/cb031609/695e2c1368a3480fb0daafc4_zenml-open-graph.png"
  ogTitle: "ZenML - One AI Platform - From Pipelines to Agents"
  ogDescription: "An open-source foundation to ship reliable AI products at scale - on any cloud, anywhere."
---

**Last updated**: February 1, 2023

## Introduction

This repository showcases how ZenML can be used for machine learning with a GitHub workflow that automates CI/CD with continuous model training and continuous model deployment to production. This allows data scientists to experiment with data processing and model training locally and then have code changes automatically tested and validated through the standard GitHub PR peer review process. Changes that pass the CI and code review are then deployed automatically to production.

This repository is also meant to be used as a template: you can fork it and easily adapt it to your own MLOps stack, infrastructure, code, and data.

Here's an architectural diagram of what this can look like:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/c6966280/6528ff340b917ed50c8d94d1_pipeline_architecture_a8a212e2f8.png" alt="" />
</figure>

## Use case

The pipeline implementations follow a set of best practices for MLOps summarized below:

<ul><li><strong>Experiment Tracking</strong>: All experiments are logged with an experiment tracker (MLflow), which allows for easy comparison of different runs and models and provides quick access to visualization and validation reports.</li><li><strong>Data and Model validation</strong>: The pipelines include a set of Deepchecks-powered steps that verify the integrity of the data and evaluate the model after training. The results are gathered, analyzed, and then a report is generated with a summary of the findings and a suggested course of action. This provides useful insights into the quality of the data and the performance of the model and helps to catch potential issues early on before the model is deployed to production.</li><li><strong>Pipeline Tracking</strong>: All pipeline runs and their artifacts are of course versioned and logged with ZenML. This enables features such as lineage tracking, provenance, caching, and reproducibility.</li><li><strong>Continuous Integration</strong>: All changes to the code are tested and validated automatically using GitHub Actions. Only changes that pass all tests are merged into the main branch. This applies not only to the code itself but also to the ML artifacts, such as the data and the model.</li><li><strong>Continuous Deployment</strong>: When a change is merged into the main branch, it is automatically deployed to production using ZenML and GitHub Actions. There are also additional checks in place to ensure that the model is not deployed if it is not fit for production or performs worse than the model currently deployed.</li><li><strong>Software Dependency Management</strong>: All software dependencies are managed in a way that guarantees full reproducibility and are automatically installed by ZenML in the pipeline runtime environments. Python package versions are frozen and pinned to ensure that the pipeline runs are fully reproducible.</li><li><strong>Reproducible Randomness</strong>: All randomness is controlled and seeded to ensure reproducibility and caching of the pipeline runs.</li></ul>

## Stack and Components

Locally, this project uses the following [Stack Components](https://docs.zenml.io/component-gallery/categories):

<ul><li><strong>Orchestrator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/orchestrators/local">Local Orchestrator</a>.</li><li><strong>Artifact Store</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/artifact-stores/local">Local Artifact Store</a></li><li><strong>Experiment Tracker</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/experiment-trackers/mlflow">MLflow</a></li><li><strong>Data Validator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/data-validators/deepchecks">Deepchecks</a>.</li><li><strong>Model Deployer</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/model-deployers/mlflow">MLflow</a></li></ul>

For the production stack, it uses:

<ul><li><strong>Artifact Store</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/artifact-stores/s3">S3</a><strong></strong></li><li><strong>Orchestrator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/orchestrators/kubeflow">Kubeflow</a><strong></strong></li><li><strong>Container Registry</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/container-registries/aws">AWS ECR</a><strong></strong></li><li><strong>Secrets Manager</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/secrets-managers/aws">AWS Secrets Manager</a><strong></strong></li><li><strong>Model Deployer</strong> - <a href="https://docs.zenml.io/v/0.40.2/user-guide/component-guide/model-deployers/kserve">kserve</a><strong></strong></li><li><strong>Data Validator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/data-validators/deepchecks">Deepchecks</a><strong></strong></li><li><strong>Experiment Tracker</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/experiment-trackers/mlflow">MLflow</a><strong></strong></li><li><strong>Image Builder</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/image-builders/local">Local</a></li></ul>

## Code

The code to reproduce this project is available at the open-source [ZenML Gitflow](https://github.com/zenml-io/zenml-gitflow) repository on GitHub. View the code [here](https://github.com/zenml-io/zenml-gitflow) and learn more about the project.

## Runs

The visualization for DAGs generated as part of this project can be viewed inside a demo version of the ZenML Dashboard.The following DAG shows the pipeline on the ZenML Dashboard:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a0bbf8d4/6528ff33364862915fc467af_gitflow_dag_88a28e0c14.png" alt="" />
</figure>

You can access and interact with the DAGs [here](https://demo.zenml.io/workspaces/default/stacks/4906f671-e531-49d2-ba95-67af668137ac/runs/98be2f2d-db8f-4a74-96e4-f70bec92bd66/dag) on a shared ZenML Dashboard.

