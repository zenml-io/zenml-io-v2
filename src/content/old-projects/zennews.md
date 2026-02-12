---
title: "Summarize Articles with ZenNews"
slug: "zennews"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b03ecd5ef92c301f508c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-11-04T08:31:08.356Z"
  createdOn: "2023-10-12T08:37:18.258Z"
date: "2023-02-23"
originalDate: "2023-02-23T00:00:00.000Z"
category: "natural-language-processing"
tags:
  - "discord"
  - "gcp"
image:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/4b18b0d3/6528090ff92d76d934a67376_news.jpg"
description: "A tool powered by ZenML that can automate the summarization of news sources."
seoTitle: "Summarize Articles with ZenNews"
seoDescription: "A tool powered by ZenML that can automate the summarization of news sources."
readingTime: 4 minutes
seo:
  title: "ZenML - One AI Platform - From Pipelines to Agents"
  description: "An open-source foundation to ship reliable AI products at scale - on any cloud, anywhere."
  canonical: "https://www.zenml.io"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cb031609/695e2c1368a3480fb0daafc4_zenml-open-graph.png"
  ogTitle: "ZenML - One AI Platform - From Pipelines to Agents"
  ogDescription: "An open-source foundation to ship reliable AI products at scale - on any cloud, anywhere."
---

**Last updated**: February 24, 2023

## Introduction

This project focuses on ZenNews, a tool powered by ZenML that can automate the summarization of news sources. At its core, it utilizes a simple pipeline with three steps. In the correct order, these steps collect articles from news sources, generate summaries of them, and report the results.The tool also comes equipped with a CLI application. By simply using the command zennews, users can run their summarization pipeline with their desired configuration.

## Use case

ZenNews can be used to distill complex or lengthy content into easily digestible chunks that can be scanned and absorbed quickly, allowing you to keep up with the news without being overwhelmed.

## Stack and Components

This project uses the following two stacks:**Default Local Stack**:

<ul><li><strong>Orchestrator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/orchestrators/local">Local Orchestrator</a>.</li><li><strong>Artifact Store</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/artifact-stores/local">Local Artifact Store</a>.</li></ul>

**Remote Stack with Scheduled Pipelines**:

<ul><li><strong>Orchestrator</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/orchestrators/vertex">Vertex Orchestrator</a>.</li><li><strong>Artifact Store</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/artifact-stores/gcp">GCS Artifact Store</a>.</li><li><strong>Secret Manager</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/secrets-managers/gcp">GCP Secrets Manager</a>.</li><li><strong>Container Registry</strong> - <a href="https://docs.zenml.io/user-guide/component-guide/container-registries/gcp">GCP Container Registry</a>.</li><li><strong>Alerter</strong> - <a href="https://github.com/zenml-io/zenml-projects/blob/main/zen-news-summarization/src/zennews/alerter/discord_alerter.py">Discord Alerter (part of the zennews package)</a>.<br /></li></ul>

Keep in mind that the project can run on any remote stack as long as the corresponding orchestrator supports scheduling (via cron expressions like Vertex).

## Code

The code to reproduce this project are on the open-source [ZenML Project](https://github.com/zenml-io/zenml-projects) repository on GitHub. View the code [here](https://github.com/zenml-io/zenfiles/tree/main/zen-news-summarization).

