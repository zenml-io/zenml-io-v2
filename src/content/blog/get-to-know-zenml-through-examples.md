---
title: "Get to know ZenML through examples"
slug: "get-to-know-zenml-through-examples"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "652fdb32e7c939b1bf7667dd"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T14:44:54.559Z"
  createdOn: "2023-10-18T13:18:41.844Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "applied-zenml"
  - "evergreen"
  - "pipelines"
  - "tooling"
  - "zenml"
date: "2022-01-06T00:00:00.000Z"
readingTime: 2 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/72bbcb28/652fdaa72b544c2d44bc7263_cli.png"
---

**Last updated:** November 8, 2022.

As ZenML continues to grow, we’ll be [adding more features and integrations](https://github.com/zenml-io/zenml/releases). Alongside whatever new things get added to the codebase, we work hard to make [our documentation](https://docs.zenml.io/) a complete reference for anyone trying to get up to speed quickly. For those of you who prefer a more hands-on approach, [our examples](https://github.com/zenml-io/zenml/tree/main/examples) might be better suited.

Right now you can find the following small, practical ways to experiment with ZenML pipelines:

## Use Case / Workflow Guides

<ul><li><strong>class_based_api</strong>: All the code for the class-based API guide found in the <a href="https://docs.zenml.io/">docs</a>.</li><li><strong>functional_api</strong>: All the code for the functional API guide found in the <a href="https://docs.zenml.io/">docs</a>.</li><li><strong>caching</strong>: Using caching to skip data-intensive tasks and save costs.</li><li><strong>not_so_quickstart</strong>: Shows of the modularity of the pipelines with hot-swapping of TensorFlow, PyTorch, and scikit-learn trainers.</li><li><strong>quickstart</strong>: The official quickstart tutorial.</li><li><strong>standard_interfaces</strong>: Uses a collection of built-in and integrated standard interfaces to showcase their effect on the overall smoothness of the user experience.</li></ul>

## Orchestrators

<ul><li><strong>airflow_local</strong>: Running pipelines with Airflow locally.</li><li><strong>kubeflow</strong>: Shows how to orchestrate a pipeline a local Kubeflow stack.</li></ul>

## Visualization

<ul><li><strong>dag_visualizer</strong>: Visualizing a pipeline.</li><li><strong>lineage</strong>: Visualizing a pipeline run and showcasing artifact lineage.</li><li><strong>statistics</strong>: Automatically extract statistics using facets.</li></ul>

You don’t even need to clone our repository to get the goodness of examples! Use the series of commands that begin with zenml example to download and even run examples. (UPDATE: As of November 2022 we have lots more examples covering the integrations that have been written in the intervening period since this blog was written.)

Get the full list of examples available:

```bash
zenml example list
```

Pick an example to download into your current working directory:

```bash
zenml example pull quickstart
# at this point a `zenml_examples` dir would be created with the example(s) inside it
```

**

When you’re ready to run the example, simply type the following command. If there are any dependencies needed to be downloaded for the example to run, the CLI will prompt you to install them.

```bash
zenml example run quickstart
```

It’s that easy to get started with some examples of ZenML in action! Visit [our guides and walkthroughs](https://docs.zenml.io/) for longer examples showcasing some longer use cases.

The ZenML core team originally started discussing adding the example run command as a way of including test runs of our examples as part of our continuous integration that Github Actions invokes whenever merging to main. It was only later that we saw how it might also be a useful option for users to be able to run the examples with very little setup or configuration needs.

If you’re inspired by our examples to create your own, feel free to let us know by [creating an issue here](https://github.com/zenml-io/zenml/issues) on our GitHub or by reaching out to us [on Slack](https://zenml.io/slack-invite/).

