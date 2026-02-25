---
title: "Managing our community with a ZenML pipeline."
slug: "orbitcommunity"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b03e46ae419819a39cc3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-11-04T08:31:17.011Z"
  createdOn: "2023-10-12T08:37:18.033Z"
date: "2023-03-12"
originalDate: "2023-03-12T00:00:00.000Z"
category: "tabular-data"
tags:
  - "orbit"
image:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/59dd8b33/652803db8c929eabed912514_community.jpg"
description: "A project focusing on implementing a pipeline that offers insight into our community."
seoTitle: "Managing our community with a ZenML pipeline."
seoDescription: "A project focusing on implementing a pipeline that offers insight into our community."
readingTime: 3 minutes
seo:
  title: "ZenML - One AI Platform - From Pipelines to Agents"
  description: "An open-source foundation to ship reliable AI products at scale - on any cloud, anywhere."
  canonical: "https://www.zenml.io"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cb031609/695e2c1368a3480fb0daafc4_zenml-open-graph.png"
  ogTitle: "ZenML - One AI Platform - From Pipelines to Agents"
  ogDescription: "An open-source foundation to ship reliable AI products at scale - on any cloud, anywhere."
---

**Last updated**: March 13, 2023

## Introduction

Understanding the ZenML community has always been an important aspect of our journey. It allows us to tailor our framework to meet the needs of our users, identify areas for improvement, build relationships with our community, and make data-driven decisions.

In order to achieve these goals, we use [Orbit](https://orbit.love/). Orbit is a community-building platform that provides a powerful set of tools to help you understand and manage your community better. From comprehensive community insights to engagement metrics, it helps us to track the growth of our tool and take the necessary steps going into the future.

## Use Case

In this project, we are using the [Orbit API](https://api.orbit.love/reference/about-the-orbit-api) to detect members of our community who are either booming (highly active in the recent period) or churned(previously active, but recently inactive).

## Stack Components

In this initial version, you can run the project locally. However, it is much more ideal to run a pipeline such as the community_analysis_pipeline on a regular schedule. In order to achieve that, you have to [deploy ZenML](https://docs.zenml.io/platform-guide/set-up-your-mlops-platform/deploy-zenml) and set up a stack that supports [our scheduling feature](https://docs.zenml.io/user-guide/advanced-guide/schedule-pipeline-runs). Please check [our docs](https://docs.zenml.io/getting-started/introduction) for more information.

## Code

The codes to reproduce this project are open-source on GitHub. View the code [here](https://github.com/zenml-io/zenml-projects/tree/main/orbit-user-analysis).