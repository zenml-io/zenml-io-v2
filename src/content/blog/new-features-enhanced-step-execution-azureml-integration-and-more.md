---
title: "New Features: Enhanced Step Execution, AzureML Integration and More!"
slug: "new-features-enhanced-step-execution-azureml-integration-and-more"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66d06449378f17d2ad529a3a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-08-29T12:22:09.307Z"
  lastUpdated: "2024-08-29T12:21:58.463Z"
  createdOn: "2024-08-29T12:06:33.665Z"
author: "zenml-team"
category: "zenml-updates"
tags:
  - "azure"
  - "azureml"
  - "release"
  - "model-control-plane"
  - "huggingface"
  - "llm"
  - "pipeline"
  - "pipelines"
date: "2024-08-28T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/b17656ee/66d06268f0a162b990a94132_zenml-release_2.png"
seo:
  title: "New Features: Enhanced Step Execution, AzureML Integration and More! - ZenML Blog"
  description: "ZenML's latest release 0.65.0 enhances MLOps workflows with single-step pipeline execution, AzureML SDK v2 integration, and dynamic model versioning. The update also introduces a new quickstart experience, improved logging, and better artifact handling. These features aim to streamline ML development, improve cloud integration, and boost efficiency for data science teams across local and cloud environments."
  canonical: "https://www.zenml.io/blog/new-features-enhanced-step-execution-azureml-integration-and-more"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/b17656ee/66d06268f0a162b990a94132_zenml-release_2.png"
  ogTitle: "New Features: Enhanced Step Execution, AzureML Integration and More! - ZenML Blog"
  ogDescription: "ZenML's latest release 0.65.0 enhances MLOps workflows with single-step pipeline execution, AzureML SDK v2 integration, and dynamic model versioning. The update also introduces a new quickstart experience, improved logging, and better artifact handling. These features aim to streamline ML development, improve cloud integration, and boost efficiency for data science teams across local and cloud environments."
---

We're thrilled to announce the release of ZenML 0.65.0, bringing significant enhancements to simplify your MLOps workflows and improve cloud integration. Let's explore the key features of this update:

## New Quickstart Experience

Our revamped quickstart demonstrates how ZenML streamlines the transition from local machine learning workflows to cloud-scale operations. This new experience helps users understand and leverage ZenML's capabilities more effectively, bridging the gap between development and production environments.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/20869132/66d06449378f17d2ad529a1e_66d063dd9f99201e24254763_Overview_20_1_.png" alt="__wf_reserved_inherit" />
</figure>

Try it out using [Google Colab without installation](https://colab.research.google.com/github/zenml-io/zenml/blob/main/examples/quickstart/quickstart.ipynb) now!

## Single-Step Execution as ZenML Pipeline

ZenML now allows you to run individual steps on your active stack by simply calling them as you would with normal Python functions. This feature enhances flexibility and simplifies debugging by internally creating a pipeline with just your selected step and running it on the active stack. You can find a [code example](https://docs.zenml.io/how-to/run-remote-steps-and-pipelines-from-notebooks/run-a-single-step-from-a-notebook) in our documentation.

## AzureML Integration Upgrade

We've updated our AzureML Step Operator to work with SDK v2 and utilize Service Connectors. This upgrade significantly improves our Azure integration, offering users more robust and up-to-date cloud capabilities for their ML workflows.

## Enhanced Logging and Model Versioning

Improving traceability, we've added timestamps to log messages. Additionally, we now support templated names for Model Versions, allowing the use of `&#123;date&#125;` and `&#123;time&#125;` placeholders. This dynamic versioning enhances model management and tracking capabilities.

## Accelerate Integration as Python Decorator

The `run_with_accelerate` step wrapper can now be used as a Python Decorator on top of ZenML steps. This integration simplifies the process of accelerating your ML workflows, making it easier to optimize performance.

You can find [further technical details and code snippets](https://docs.zenml.io/how-to/training-with-gpus/accelerate-distributed-training) in out documentation.

## Improved Artifact Handling

We've fixed an issue with loading artifacts from artifact stores outside of the current active artifact store, enhancing flexibility in managing and accessing your ML artifacts across different environments.

## Conclusion

This release marks a significant step forward in our mission to streamline MLOps workflows and enhance cloud integration. By introducing single-step execution, upgrading AzureML support, improving logging and model versioning, and enhancing artifact handling, we're empowering data science teams to work more efficiently across various environments.

We encourage you to update to ZenML 0.65.0 and explore these new features. As always, we welcome your feedback and look forward to seeing how these improvements accelerate your ML projects.

For a complete list of changes and improvements, please check out [our full release notes on GitHub](https://github.com/zenml-io/zenml/releases/tag/0.65.0).

Happy coding with ZenML!