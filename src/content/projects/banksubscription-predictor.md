---
title: "BankSubscription Predictor"
slug: "banksubscription-predictor"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6852c9bd1f6437f51bf90d63"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T08:34:18.968Z"
  lastUpdated: "2025-08-26T08:34:06.630Z"
  createdOn: "2025-06-18T14:14:21.453Z"
description: "Predict bank clients most likely to subscribe to term deposits using machine learning."
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/bank_subscription_prediction"
mainImageLink: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/46.jpg"
tags:
  - "classification"
  - "banking"
  - "marketing"
  - "xgboost"
  - "feature-selection"
  - "imbalanced-data"
tools:
  - "zenml"
  - "xgboost"
  - "plotly"
  - "pandas"
  - "scikit-learn"
  - "matplotlib"
createdAt: "2025-06-18T14:14:21.300Z"
updatedAt: "2025-08-26T08:33:51.601Z"
projectId: "bank-subscription-prediction"
seo:
  title: "BankSubscription Predictor"
  description: "Predict bank clients most likely to subscribe to term deposits using machine learning."
  canonical: "https://www.zenml.io/projects/banksubscription-predictor"
  ogTitle: "BankSubscription Predictor"
  ogDescription: "Predict bank clients most likely to subscribe to term deposits using machine learning."
---

#### Model Training Pipeline

Trains an XGBoost classifier to predict term deposit subscriptions.#### Stack Components

<ul><li><strong>Orchestrator:</strong> local</li><li><strong>Artifact Store:</strong> local</li></ul>A comprehensive MLOps solution for predicting which bank clients are most likely to subscribe to term deposits, enabling more effective marketing campaigns.

### What It Does

This project helps financial institutions optimize their marketing efforts by identifying prospects with the highest subscription probability. The solution implements a complete machine learning workflow from data processing to model training and evaluation.

### How It Works

<ul>
<li>Processes banking campaign data with features like customer demographics, past interactions, and economic indicators</li>
<li>Handles imbalanced data with appropriate sampling techniques</li>
<li>Uses XGBoost for classification with feature importance analysis</li>
<li>Evaluates models on metrics optimized for unbalanced classification</li>
<li>Deploys the model with a ZenML pipeline for continuous training and inference</li>
</ul>