---
title: "NBA Three-Pointer Predictor"
slug: "nba-three-pointer-predictor"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b03dc597a48dc0ce2d11"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-11-04T08:31:39.761Z"
  createdOn: "2023-10-12T08:37:17.748Z"
date: "2022-12-08"
originalDate: "2022-12-08T00:00:00.000Z"
category: "tabular-data"
tags:
  - "mlflow"
  - "kubeflow"
  - "evidently"
  - "discord"
  - "skilearn"
  - "aws"
image:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/3e632016/6528f080e4171f39a00f722d_nba.jpg"
description: "Predict the number of three-pointers in the next NBA match."
seoTitle: "NBA Three-Pointer Predictor"
seoDescription: "Predict the number of three-pointers in the next NBA match."
readingTime: 5 minutes
seo:
  title: "ZenML - One AI Platform - From Pipelines to Agents"
  description: "An open-source foundation to ship reliable AI products at scale - on any cloud, anywhere."
  canonical: "https://www.zenml.io"
  ogImage: "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30/695e2c1368a3480fb0daafc4_zenml-open-graph.png"
  ogTitle: "ZenML - One AI Platform - From Pipelines to Agents"
  ogDescription: "An open-source foundation to ship reliable AI products at scale - on any cloud, anywhere."
---

**Last updated**: February 1, 2023

## Introduction

This project showcases how to use [Scikit-learn](https://scikit-learn.org/) to construct a model that can predict the number of 3-pointer shots in the next NBA game. In addition, we show how to use [Evidently](https://www.evidentlyai.com/) as a data validation tool to detect drift in training and testing data, [MLflow](https://mlflow.org/) for tracking experiments, and [Kubeflow Pipelines](https://www.kubeflow.org/) to schedule and repeat pipeline runs. We also include an [alerter](https://docs.zenml.io/user-guide/component-guide/alerters) as a component to send notifications on [Discord](https://discord.com/).We will construct 3 pipelines for this project:

<ul><li><strong>Data Validation</strong> - Check for train-test data drift using Evidently.</li><li><strong>Training</strong> - Train models with Scikit-learn and track experiments using MLflow.</li><li><strong>Inference</strong> - Run inference on new data and posts notification on Discord.</li></ul>

## Use case

This project structure including the stack and components can be used on occasions you need to construct ML pipelines for tabular data ML problems.

## Stack and Components

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e4a9ee15/6528ff808c8705e9743859e6_nba_af08a47da1.png" alt="" />
</figure>

This project uses the following [Stack Components](https://docs.zenml.io/user-guide/component-guide):

<ul><li><strong>Orchestrator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/orchestrators/kubeflow">Kubeflow Pipelines</a>.</li><li><strong>Artifact Store</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/artifact-stores/s3">Amazon S3</a>.</li><li><strong>Container Registry</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/container-registries/aws">Amazon Elastic Container Registry</a>.</li><li><strong>Secret Manager</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/secrets-managers/aws">AWS Secret Manager</a>.</li><li><strong>Experiment Tracker</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/experiment-trackers/mlflow">MLflow</a>.</li><li><strong>Data Validator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/data-validators/evidently">Evidently</a>.</li><li><strong>Alerter</strong> - <a href="https://discord.com/">Discord</a>.</li></ul>

## Code

The codes to reproduce this project are open-source [ZenML Project](https://github.com/zenml-io/zenml-projects) repository on GitHub. View the code [here](https://github.com/zenml-io/zenfiles/tree/main/nba-pipeline).

## Runs

All pipelines were run remotely on with a Kubeflow orchestrator. The DAGs are shown on the Kubeflow central dashboard and the ZenML Dashboard.The following DAG shows the drift detection pipeline on the ZenML Dashboard:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/85757356/6528ff80364862915fc4cb8a_drift_pipeline_9af1edeb54.png" alt="" />
</figure>

The following DAG shows the training pipeline on the ZenML Dashboard:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/89470d42/6528ff80e4171f39a0222788_training_pipeline_ef6296c4a5.png" alt="" />
</figure>

The following DAG shows the inference pipeline on the ZenML Dashboard:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/a13c1537/6528ff809ec9911fddbae460_inference_pipeline_40822f81e2.png" alt="" />
</figure>

## Additional resources

This [blog post](https://blog.zenml.io/zenhack-three-pointer-prediction/) writes in detail about the motivation and implementation of this project.We showcased this project in a live discussion with Ben Epstein from MLOps Community. Watch it [here](https://www.youtube.com/watch?v=Ne-dt9tu11g&ab_channel=MLOps.community).