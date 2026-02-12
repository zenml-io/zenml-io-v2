---
title: "What's New in v0.12.0: Serverless Inferencing on Kubernetes with KServe"
slug: "whats-new-in-v0-12-0-serverless-inferencing-on-kubernetes-with-kserve"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "653160ebf64e0712ee31e7af"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T10:02:10.770Z"
  createdOn: "2023-10-19T17:01:31.605Z"
author: "dickson-neoh-tze-how"
category: "zenml"
tags:
  - "release-notes"
  - "zenml"
date: "2022-08-02T00:00:00.000Z"
readingTime: 4 Mins Read
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/e4bf995c/6531607cdf2ffe3e385a287d_zero-twelve-zero-release.jpg"
---

**Last updated:** October 17, 2022.

The 0.12.0 release contains our [KServe](https://github.com/kserve/kserve) integration. KServe opens the door to highly scalable, simple, pluggable production ML serving.

We’ve been working on minor bug fixes and improving our [docs page](https://docs.zenml.io/) to improve your experience with ZenML.

We also added functionality to specify hardware resources on a step level to control the amount of memory, CPUs, and GPUs that each ZenML step has access to.

We’ve also added functionality to determine if secrets are shared with other ZenML Secrets Managers using the same backend.

As always, we’ve also included various bug fixes and lots of improvements to the documentation and our examples.

For a detailed look at what’s changed, give [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.12.0) a glance.

## 🌪 KServe Integration

The spotlight in this release is the ZenML Kserve integration. This integration lets you define pipeline steps to scale up your model by serving your ML models on Kubernetes using any of your favorite ML frameworks like TensorFlow, XGBoost, Scikit-Learn, PyTorch from within ZenML!

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/2dee5bfb/6531608430affa9dc797aa4f_kserve.png" alt="KServe" />
</figure>

## 📌 Specify Resources Per Step

Some steps of your machine learning pipeline might be more resource-intensive and require special hardware to execute. In this release, you can now specify the resources (such as the amount of memory, CPU, and GPU) to allocate on a step level in your pipeline.

To allocate resources to a specific step in your pipeline, simply specify resource_configuration in the step decorator:

```bash
from zenml.steps import step, ResourceConfiguration
@step(resource_configuration=ResourceConfiguration(cpu_count=8, gpu_count=2))
def training_step(...) -> ...:
    # train a model
```

**

This currently works on KubeflowOrchestrator and VertexOrchestrator, but will be extended in the upcoming weeks to support the KubernetesOrchestrator.

## 🤫 Scoped Secrets

The majority of Secrets Managers use a single global scope in the back-end they are connected to. This means all secrets that are configured and visible through a Secrets Manager instance are also visible in all other instances. Furthermore, secrets configured directly in the back-end through means other than ZenML are also visible and can be managed in all ZenML Secrets Managers connected to that same back-end.

This has a number of disadvantages:

<ul><li>There is only one global shared namespace for secret names. Two secrets with the same name and different values cannot be configured at the same time for different purposes (e.g. different ZenML projects or components).</li><li>There is no clear separation between secrets managed by ZenML and those that are used for other purposes</li></ul>

In this release, we’ve added support for scoped secrets in our AWS, GCP, and Vault Secrets Managers. These updated Secrets Managers allow you to configure a scope that determines if secrets are shared with other ZenML Secrets Managers using the same backend.

## ➕ Other Updates, Additions, and Fixes

The latest release includes several smaller features and updates to existing functionality:

<ul><li>Fix Links on the examples by @safoinme in https://github.com/zenml-io/zenml/pull/782</li><li>Fix broken links in source code by @schustmi in https://github.com/zenml-io/zenml/pull/784</li><li>Invalidating artifact/metadata store if there is a change in one of them by @bcdurak in https://github.com/zenml-io/zenml/pull/719</li><li>Fixed broken link in README by @htahir1 in https://github.com/zenml-io/zenml/pull/785</li><li>Embed Cheat Sheet in a separate docs page by @fa9r in https://github.com/zenml-io/zenml/pull/790</li><li>Add data validation documentation by @stefannica in https://github.com/zenml-io/zenml/pull/789</li><li>Add local path for mlflow experiment tracker by @schustmi in https://github.com/zenml-io/zenml/pull/786</li><li>Improve Docker build logs. by @fa9r in https://github.com/zenml-io/zenml/pull/793</li><li>Allow standard library types in steps by @stefannica in https://github.com/zenml-io/zenml/pull/799</li><li>Added small description by @AlexejPenner in https://github.com/zenml-io/zenml/pull/801</li><li>Replace the restriction to use Repository inside step with a warning by @stefannica in https://github.com/zenml-io/zenml/pull/792</li><li>Adjust quickstart to data validators by @fa9r in https://github.com/zenml-io/zenml/pull/797</li><li>Add utility function to deprecate pydantic attributes by @schustmi in https://github.com/zenml-io/zenml/pull/778</li><li>Fix the mismatch KFP version between Kubeflow and GCP integration by @safoinme in https://github.com/zenml-io/zenml/pull/796</li><li>Made mlflow more verbose by @htahir1 in https://github.com/zenml-io/zenml/pull/802</li><li>Fix links by @dnth in https://github.com/zenml-io/zenml/pull/798</li><li>KServe model deployer integration by @stefannica in https://github.com/zenml-io/zenml/pull/655</li><li>retrieve pipeline requirement within running step by @safoinme in https://github.com/zenml-io/zenml/pull/805</li><li>Fix --decouple_stores error message by @strickvl in https://github.com/zenml-io/zenml/pull/814</li><li>Support subscripted generic step output types by @fa9r in https://github.com/zenml-io/zenml/pull/806</li><li>Allow empty kubeconfig when using local kubeflow orchestrator by @schustmi in https://github.com/zenml-io/zenml/pull/809</li><li>fix the secret register command in kserve docs page by @safoinme in https://github.com/zenml-io/zenml/pull/815</li><li>Annotation example (+ stack component update) by @strickvl in https://github.com/zenml-io/zenml/pull/813</li><li>Per-step resource configuration by @schustmi in https://github.com/zenml-io/zenml/pull/794</li><li>Scoped secrets by @stefannica in https://github.com/zenml-io/zenml/pull/803</li><li>Adjust examples and docs to new pipeline and step fetching syntax by @fa9r in https://github.com/zenml-io/zenml/pull/795</li></ul>

## 👩💻 Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know if you have an idea for a feature or something you’d like to contribute to the framework.

We have a [new home for our roadmap](https://zenml.io/roadmap) where you can vote on your favorite upcoming feature or propose new ideas for what the core team should work on. You can vote without needing to log in, so please do let us know what you want us to build!

