---
title: "Credit Scorer: EU AI Act Compliant MLOps"
slug: "credit-scorer-eu-ai-act-compliant-mlops"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "683087f8d0f8fa28cf89b729"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T08:34:18.968Z"
  lastUpdated: "2025-08-26T08:34:06.725Z"
  createdOn: "2025-05-23T14:36:40.771Z"
description: "An end-to-end credit scoring workflow that automatically generates the technical evidence required by the EU AI Act."
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/credit-scorer"
mainImageLink: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/11.jpg"
previewImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/0a28edcf/683087f7d0f8fa28cf89b6f1_compliance-dashboard.png"
tags:
  - "eu-ai-act"
  - "compliance"
  - "credit-scoring"
  - "financial-services"
  - "risk-management"
  - "fairness"
  - "classification"
  - "data-governance"
tools:
  - "zenml"
  - "lightgbm"
  - "whylogs"
  - "modal"
  - "streamlit"
  - "slack"
  - "pandas"
  - "scikit-learn"
createdAt: "2025-05-23T14:36:38.921Z"
updatedAt: "2025-08-26T08:34:03.677Z"
projectId: "credit-scorer"
seo:
  title: "Credit Scorer: EU AI Act Compliant MLOps"
  description: "An end-to-end credit scoring workflow that automatically generates the technical evidence required by the EU AI Act."
  canonical: "https://www.zenml.io/projects/credit-scorer-eu-ai-act-compliant-mlops"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/0a28edcf/683087f7d0f8fa28cf89b6f1_compliance-dashboard.png"
  ogTitle: "Credit Scorer: EU AI Act Compliant MLOps"
  ogDescription: "An end-to-end credit scoring workflow that automatically generates the technical evidence required by the EU AI Act."
---

#### Feature Engineering Pipeline

Pipeline that ingests raw credit data, profiles quality with WhyLogs, applies cleaning and encoding, and stores versioned feature sets. Addresses EU AI Act Articles 10 and 12.

#### Training Pipeline

Pipeline that trains LightGBM models with bias-aware techniques, evaluates performance across demographic groups, and conducts comprehensive risk assessment. Addresses Articles 9, 11, and 15.

#### Deployment Pipeline

Pipeline that implements human oversight gates, deploys models to Modal, generates SBOM and Annex IV documentation, and sets up post-market monitoring. Addresses Articles 14, 17, and 18.#### Stack Components

<ul><li><strong>Orchestrator:</strong> default</li><li><strong>Artifact Store:</strong> aws-zenml-dev</li></ul>Credit Scorer is a production-ready credit scoring system that demonstrates full EU AI Act compliance for high-risk AI systems. Built with comprehensive MLOps pipelines, it automatically generates all required technical documentation, ensures robust risk management, and maintains complete audit trails with versioned artifacts.

### What It Does

Credit Scorer transforms loan application data into compliant credit scoring predictions while automatically generating all EU AI Act compliance artifacts. It processes sensitive financial data through automated pipelines that ensure data quality, fairness across demographic groups, and comprehensive documentation for regulatory inspection.

### How It Works

<ul>
<li>Ingests credit application data with SHA-256 provenance tracking and WhyLogs profiling</li>
<li>Engineers features with automated preprocessing and sensitive attribute handling</li>
<li>Trains LightGBM models with bias-aware techniques and class imbalance handling</li>
<li>Evaluates performance with accuracy, AUC, and fairness metrics across protected groups</li>
<li>Implements human oversight gates with Slack-based approval workflows</li>
<li>Deploys models as Modal API services with integrated monitoring</li>
<li>Generates complete Annex IV documentation and Software Bill of Materials (SBOM)</li>
<li>Provides real-time compliance dashboards for stakeholders and auditors</li>
</ul>