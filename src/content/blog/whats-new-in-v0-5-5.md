---
title: "What's New in v0.5.5"
slug: "whats-new-in-v0-5-5"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "653128649ca9b7e1acd8ebca"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T14:45:47.137Z"
  createdOn: "2023-10-19T13:00:20.597Z"
author: "alexej-penner"
category: "zenml"
tags:
  - "release-notes"
  - "zenml"
date: "2021-12-13T00:00:00.000Z"
readingTime: 2 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/efc0b231/653127f345bd911f23c96907_balloons-pixabay_0_5_5.jpg"
---

**Last updated:** November 3, 2022.

ZenML 0.5.5 is jam-packed with new features to take your ML pipelines to the next level. In this blog post we will highlight our three biggest new features: Kubeflow Pipelines, CLI support for our integrations and Standard Interfaces. That’s right, Standard Interfaces are back!

For a detailed look at what’s changed, give [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.5.5) a glance.

## Kubeflow Pipelines

We are super excited about our integration of Kubeflow Pipelines into ZenML. With just a few lines of code you can now spin up your very own local deployment of Kubeflow Pipelines. With Kubeflow Pipelines running on your machine or even in the cloud, you change where to run your code with just a few commands.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/469a8659/653127fe87a749428b39b2fc_kubeflow.png" alt="Kubeflow pipeline" />
</figure>

## CLI Support for Integrations

With release 0.5.5 we made [our integrations](https://zenml.io/integrations) into the first class citizens they should be. You can now easily list all integrations and see which integrations are active (by having all their requirements installed).

```bash
zenml integration list
```

But that’s not all! Installing requirements for our integrations is just as easy now. For example, this is how you would install all requirements to use our dash integration

```bash
zenml integration get-requirements dash
```

## Standard Interfaces

Standardization is a great way to keep code maintainable, easy to use and scalable across larger teams. With our Standard Interfaces we are making our steps, pipelines and artifacts even more powerful.

```bash
pipeline_instance = TrainingPipeline(
    datasource=PandasDatasource(),
    splitter=SklearnSplitter(),
    analyzer=PandasAnalyzer(),
    preprocessor=SklearnStandardScaler(),
    trainer=TensorflowBinaryClassifier(),
    evaluator=SklearnEvaluator()
).with_config('pipeline_config.yaml')

pipeline_instance.run()
```

Using a powerful set of standardized steps like this, it becomes easier than ever to hit the ground running when setting up a new pipeline. Check out how get started with our Standard Interfaces in our [docs](https://docs.zenml.io/)

## Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know what you think we should build next!

Keep your eyes open for future releases and make sure to vote on your favorite feature of our [roadmap](https://zenml.io/roadmap) to make sure it gets implemented as soon as possible.

[Image credit: Photo by [Stefan Nyffenegger](https://pixabay.com/images/id-2826093/) on [pixabay](https://pixabay.com/)]

