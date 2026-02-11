---
title: "Predicting Customer Satisfaction About A Product"
slug: "customer-satisfaction"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b03ecc216fbbb80628f0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-11-04T08:30:58.459Z"
  createdOn: "2023-10-12T08:37:18.655Z"
date: "2022-11-01"
originalDate: "2022-11-01T00:00:00.000Z"
category: "tabular-data"
tags:
  - "mlflow"
  - "kubeflow"
  - "evidently"
image:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/c6e08a5f/6528052e86f0ee0b11729b0f_satisfaction.jpg"
description: "Predicting how a customer will feel about a product before they even ordered it"
seoTitle: "Predicting Customer Satisfaction About A Product"
seoDescription: "Predicting how a customer will feel about a product before they even ordered it"
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

For a given customer's historical data, we are tasked to predict the review score for the next order or purchase. We will be using the [Brazilian E-Commerce Public Dataset](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce) by Olist. This dataset has information on 100,000 orders from 2016 to 2018 made at multiple marketplaces in Brazil. Its features allow viewing charges from various dimensions: from order status, price, payment, freight performance to customer location, product attributes, and finally, reviews written by customers. The objective here is to predict the customer satisfaction score for a given order based on features like order status, price, payment, etc. In order to achieve this in a real-world scenario, we will be using ZenML to build a production-ready pipeline to predict the customer satisfaction score for the next order or purchase.

## Use cases

This project structure including the stack and components can be used on occasions you need to construct ML pipelines for tabular data ML problems.

## Stack and Components

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/aec5c4c2/6528fc92ab8f44dc6a80d5cb_customer_satisfaction_9404527b5e.png" alt="" />
</figure>

This project uses the following [Stack Components](https://docs.zenml.io/user-guide/component-guide):

<ul><li><strong>Orchestrator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/orchestrators/local">Local Orchestrator</a>.</li><li><strong>Artifact Store</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/artifact-stores/local">Local Artifact Store</a>.</li><li><strong>Experiment Tracker</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/experiment-trackers/mlflow">MLflow</a>.</li><li><strong>Model Deployer</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/model-deployers/mlflow">MLflow</a>.</li></ul>

## Code

The codes to reproduce this project are open-source on GitHub. View the code [here](https://github.com/zenml-io/zenml-projects/tree/main/customer-satisfaction).

## Runs

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/8c3a553d/6528fc927f404ba1fd8b0f1a_Screen_Shot_2023_02_01_at_13_41_06_28c77ee286.png" alt="" />
</figure>

## Additional Resources

The detailed write-up of this project is in the following [blog](https://blog.zenml.io/customer_satisfaction/).

