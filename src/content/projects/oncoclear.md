---
title: "OncoClear"
slug: "oncoclear"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68011591ffd74fdbbe5de095"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T08:34:18.968Z"
  lastUpdated: "2025-08-26T08:34:06.623Z"
  createdOn: "2025-04-17T14:52:01.445Z"
description: "A production-ready MLOps pipeline for accurate breast cancer classification using machine learning."
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/oncoclear"
mainImageLink: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/10.jpg"
previewImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e6ac1bed/68011591ffd74fdbbe5de06b_pipeline_overview.png"
tags:
  - "healthcare"
  - "classification"
  - "scikit-learn"
  - "model-deployment"
  - "fastapi"
tools:
  - "zenml"
  - "scikit-learn"
  - "pandas"
  - "fastapi"
  - "docker"
createdAt: "2025-04-17T14:52:00.368Z"
updatedAt: "2025-08-26T08:33:52.698Z"
projectId: "oncoclear"
seo:
  title: "OncoClear"
  description: "A production-ready MLOps pipeline for accurate breast cancer classification using machine learning."
  canonical: "https://www.zenml.io/projects/oncoclear"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e6ac1bed/68011591ffd74fdbbe5de06b_pipeline_overview.png"
  ogTitle: "OncoClear"
  ogDescription: "A production-ready MLOps pipeline for accurate breast cancer classification using machine learning."
---

#### Feature Engineering Pipeline

Pipeline that loads the Wisconsin Breast Cancer diagnostic dataset, performs preprocessing, and splits data into training and testing sets.

#### Training Pipeline

Pipeline that trains classification models (SGD and Random Forest) and evaluates them on test data, promoting the best performer to production.

#### Inference Pipeline

Pipeline that uses the production model to generate predictions on new data, leveraging the same preprocessing as during training.

#### Deployment Pipeline

Pipeline that deploys the production model as a FastAPI service, making it accessible via REST API with interactive Swagger documentation.#### Stack Components

<ul><li><strong>Orchestrator:</strong> default</li><li><strong>Artifact Store:</strong> default</li><li><strong>Step Operator:</strong> default</li></ul>OncoClear is an end-to-end MLOps solution that transforms raw diagnostic measurements into reliable cancer classification predictions. Built with ZenML's robust framework, it delivers enterprise-grade machine learning pipelines that can be deployed in both development and production environments.

### What It Does

OncoClear delivers production-ready breast cancer classification through comprehensive MLOps pipelines. It processes medical diagnostic data with automatic model versioning, comparison, and promotion workflows, ensuring only the highest-performing models reach production.

### How It Works

<ul>
<li>Loads and processes the Wisconsin Breast Cancer diagnostic dataset through automated cleaning</li>
<li>Engineers features optimized for medical diagnostic classification tasks</li>
<li>Trains multiple classification models (SGD and Random Forest) with comparative evaluation</li>
<li>Evaluates models using accuracy, precision, recall, and F1 score metrics</li>
<li>Promotes best-performing models to production automatically</li>
<li>Deploys models as containerized FastAPI services for real-time prediction</li>
<li>Provides clean API documentation for easy integration into healthcare systems</li>
</ul>