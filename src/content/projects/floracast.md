---
title: "FloraCast"
slug: "floracast"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68a58036109816ab84e012c9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T08:34:18.968Z"
  lastUpdated: "2025-08-26T08:34:06.721Z"
  createdOn: "2025-08-20T07:58:46.187Z"
description: "A production-ready MLOps pipeline for time series forecasting using ZenML and Darts, featuring TFT-based training and scheduled batch inference."
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/floracast"
mainImageLink: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/49.jpg"
previewImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/4f28a128/68a58035109816ab84e01281_architecture.png"
tags:
  - "time-series"
  - "forecasting"
  - "predictions"
tools:
  - "zenml"
  - "darts"
  - "pytorch"
  - "pandas"
createdAt: "2025-08-20T07:58:44.644Z"
updatedAt: "2025-08-26T08:33:55.402Z"
projectId: "floracast"
seo:
  title: "FloraCast"
  description: "A production-ready MLOps pipeline for time series forecasting using ZenML and Darts, featuring TFT-based training and scheduled batch inference."
  canonical: "https://www.zenml.io/projects/floracast"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/4f28a128/68a58035109816ab84e01281_architecture.png"
  ogTitle: "FloraCast"
  ogDescription: "A production-ready MLOps pipeline for time series forecasting using ZenML and Darts, featuring TFT-based training and scheduled batch inference."
---

#### Training Pipeline

Loads and preprocesses data, trains a TFT model, and evaluates it with SMAPE.

#### Batch Inference Pipeline

Loads the production model and generates future forecasts, exporting predictions to CSV.#### Stack Components

<ul><li><strong>Orchestrator:</strong> default</li><li><strong>Artifact Store:</strong> default</li></ul>FloraCast is an end-to-end forecasting solution that demonstrates how to
build production-grade time series prediction workflows with ZenML and Darts.
It provides reproducible training, automatic model versioning, and scheduled
batch inference with rich visualizations to support demand and sales forecasting
use cases in retail, e-commerce, and supply chain.

### What It Does

<ul>
<li>
<p>Trains advanced forecasting models (Temporal Fusion Transformer by default; ExponentialSmoothing fallback)</p>
</li>
<li>
<p>Evaluates models with SMAPE and produces clear visual reports</p>
</li>
<li>
<p>Registers and promotes the best-performing models using ZenML's Model Control Plane</p>
</li>
<li>
<p>Runs automated batch inference to generate future forecasts on a schedule</p>
</li>
</ul>

### How It Works

<ul>
<li>
<p>Ingests ecommerce sales data and converts it into Darts TimeSeries objects</p>
</li>
<li>
<p>Applies standardized preprocessing, including train/validation split and frequency alignment</p>
</li>
<li>
<p>Trains a configurable TFT model and computes evaluation metrics</p>
</li>
<li>
<p>Stores artifacts with custom materializers, including timeseries visualizations</p>
</li>
<li>
<p>Loads the production model for batch inference and exports predictions to CSV</p>
</li>
</ul>

### Architecture

The architecture connects data ingestion, preprocessing, model training, evaluation,
and scheduled batch inference through ZenML pipelines, leveraging the Model Control
Plane for lineage, versioning, and promotion.