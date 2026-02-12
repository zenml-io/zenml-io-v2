---
title: "What's New in v0.5.4"
slug: "whats-new-in-v0-5-4"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65311c6774c6c442fce501a5"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2023-10-19T12:09:11.976Z"
  lastUpdated: "2023-10-19T12:09:11.976Z"
  createdOn: "2023-10-19T12:09:11.976Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "release-notes"
  - "zenml"
date: "2021-12-06T00:00:00.000Z"
readingTime: 1 Min Read
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/28462a9f/65311c318d6ee23a889a8a5e_luca-upper-Z-4kOr93RCI-unsplash.jpg"
seo:
  title: "What's New in v0.5.4 - ZenML Blog"
  description: "Release notes for the new version of ZenML."
  canonical: "https://www.zenml.io/blog/whats-new-in-v0-5-4"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/72c2e367/65311c318d6ee23a889a8a5e_luca-upper-Z-4kOr93RCI-unsplash.jpg"
  ogTitle: "What's New in v0.5.4 - ZenML Blog"
  ogDescription: "Release notes for the new version of ZenML."
---

**Last updated:** November 3, 2022.

ZenML 0.5.4 adds visualizations for your native ZenML pipelines as well as several bugfixes and updates to our documentation (init docstrings galore!). We removed a dependency we no longer needed, which will make your pip installs much faster! For a detailed look at what’s changed, give [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.5.4) a glance. This blog post will cover the big change we’re introducing in the new version.

## Pipeline Lineage Tracking & Visualization

The [statistics visualizations from the last release](https://blog.zenml.io/zero-five-three-release/) got us all inspired to add a few more useful ways of seeing what’s going on in your pipelines. It’s not uncommon for pipelines to be made up of many steps, and those steps can interact and intersect with one another in often complex patterns. We’ve built a way for you to inspect what’s going on with your ZenML pipeline:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/4cac363e/65311c3e6c4d6e63305dc144_zenml_lineage.gif" alt="Here&#039;s what the pipeline lineage tracking visualizer looks like" />
</figure>

*Here’s what the pipeline lineage tracking visualizer looks like*

You can see in this animated diagram that each of the steps and artifacts of the pipeline are represented as circles or squares respectively. We included a way to get a quick sense of the status of these elements through color: red shapes means that a step has failed, while blue and green show success. (Orange means your step is still running in the orchestrator).

We’re also really excited that you can see whether a particular step or artifact is cached or not. (Watch this space for a blog coming soon on the benefits of caching!) On the right-hand side of the chart, you can view metadata about the particular step or artifact, including information about the step’s lineage and so on.

## Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know what you think we should build next!

Keep your eyes open for future releases and make sure to vote on your favorite feature of our [roadmap](https://zenml.io/roadmap) to make sure it gets implemented as soon as possible.

[Image credit: Photo by [Luca Upper](https://unsplash.com/@lucaupper?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)]

