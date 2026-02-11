---
title: "Sign Language Detection with YOLOv5"
slug: "sign-language-yolov5"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b03dcc216fbbb8062725"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-11-04T08:32:11.632Z"
  createdOn: "2023-10-12T08:37:17.200Z"
date: "2022-11-12"
originalDate: "2022-11-12T00:00:00.000Z"
category: "computer-vision"
tags:
  - "mlflow"
image:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/acd484aa/6528f6aca4f0bf8967550cca_hands.jpg"
description: "One of AI's biggest potentials is to help improve and augment the quality of life, especially for people with disabilities. In this project, we show how ZenML empowers users to build, track and deploy a computer vision pipeline using the most popular tools in the industry. You will learn how to train a YOLOv5 model on Vertex AI, track experiments with MLflow, and deploy a BentoML bundle to the Vertex AI  endpoint."
seoTitle: "Sign Language Detection with YOLOv5"
seoDescription: "One of AI's biggest potentials is to help improve and augment the quality of life, especially for people with disabilities. In this project, we show how ZenML empowers users to build, track and deploy a computer vision pipeline using the most popular tools in the industry. You will learn how to train a YOLOv5 model on Vertex AI, track experiments with MLflow, and deploy a BentoML bundle to the Vertex AI  endpoint."
readingTime: 8 minutes
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

In this project, we show how ZenML empowers users to build, track and deploy a computer vision pipeline using the most popular tools in the industry. You will learn how to train a YOLOv5 model on Vertex AI, track experiments with MLflow, and deploy a BentoML bundle to the Vertex AI endpoint.We will construct a pipeline for this project which loads the data, trains a model, and trains a model remotely in VertexAI.

## Use case

This project can be used anywhere you need to create a pipeline to train object detection models and deploy them at scale on Vertex AI.

## Stack and Components

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/4bf41e9b/6528fff9361caf2da13c5269_sign_language_yolo_21d0838e82.png" alt="" />
</figure>

This project uses the following [Stack Components](https://docs.zenml.io/user-guide/component-guide):

<ul><li><strong>Orchestrator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/orchestrators/local">Local Orchestrator</a>.</li><li><strong>Artifact Store</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/artifact-stores/gcp">Google Cloud Storage</a>.</li><li><strong>Container Registry</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/container-registries/gcp">Google Container Registry</a>.</li><li><strong>Step Operator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/step-operators/vertex">VertexAI</a>.</li><li><strong>Experiment Tracker</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/experiment-trackers/mlflow">MLflow</a>.</li></ul>

## Run

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/f65aa76b/6528fff946ce104b29f47bf0_sign_language_dag_f363209bca.png" alt="" />
</figure>

## Code

The codes to reproduce this project are open-source [ZenML Project](https://github.com/zenml-io/zenfiles) repository on GitHub. View the code [here](https://github.com/zenml-io/zenml-projects/tree/main/sign-language-detection-yolov5).