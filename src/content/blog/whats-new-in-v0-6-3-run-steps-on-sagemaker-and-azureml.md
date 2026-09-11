---
title: "What's New in v0.6.3: Run Steps on Sagemaker and AzureML ☁️"
slug: "whats-new-in-v0-6-3-run-steps-on-sagemaker-and-azureml"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65315fa671fc9da731ab72a8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T10:15:40.722Z"
  createdOn: "2023-10-19T16:56:06.037Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "release-notes"
  - "zenml"
date: "2022-03-14T00:00:00.000Z"
readingTime: 3 Mins Read
mainImage:
  url: "https://assets.zenml.io/content/blog/whats-new-in-v0-6-3-run-steps-on-sagemaker-and-azureml/68d59445/whats-new-in-v0-6-3-run-steps-on-sagemaker-and-azureml-cover.avif"
seo:
  ogImage: "https://assets.zenml.io/content/blog/whats-new-in-v0-6-3-run-steps-on-sagemaker-and-azureml/c3640def/whats-new-in-v0-6-3-run-steps-on-sagemaker-and-azureml-cover.jpg"
---

**Last updated:** November 3, 2022.

With ZenML 0.6.3, you can now run your ZenML steps on Sagemaker and AzureML! It’s normal to have certain steps that require specific hardware on which to run model training, for example, and this latest release gives you the power to switch out hardware for individual steps to support this.

We added a new Tensorboard visualization that you can make use of when using our Kubeflow Pipelines integration. We handle the background processes needed to spin up this interactive web interface that you can use to visualize your model’s performance over time.

Behind the scenes we gave our integration testing suite a massive upgrade, fixed a number of smaller bugs and made documentation updates. For a detailed look at what’s changed, give [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.6.3) a glance.

## ☁️ Run Your Steps on Sagemaker and AzureML

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/beb027cf/65315f56f7e61ff7b180417b_zen-in-the-clouds.gif" alt="Running your steps on cloud hardware provided by Sagemaker and AzureML" />
</figure>

As your pipelines become more mature and complex, you might want to use specialized hardware for certain steps of your pipeline. A clear example is wanting to run your training step on GPU machines that get spun up automagically without you having to worry too much about that deployment. Amazon’s [Sagemaker](https://aws.amazon.com/sagemaker) and Microsoft’s [AzureML](https://ml.azure.com/) both offer custom hardware on which you can run your steps.

The code required to add this to your pipeline and step definition is as minimal as can be. Simply add the following like above the step that you’d like to run on your cloud hardware:

```bash
@step(custom_step_operator='sagemaker') # or azureml
```

Sagemaker and AzureML offers specialized compute instances to run your training jobs and offer a beautiful UI to track and manage your models and logs. All you have to do is configure your ZenML stack with the relevant parameters and you’re good to go. You’ll have to set up the infrastructure with credentials; check out [our documentation](https://docs.zenml.io/) for a guide how to do that.

To get going with this, checkout the [two examples](https://docs.zenml.io/stacks-and-components/component-guide/step-operators) we created, configure your stack and add that line mentioned above.

We’ll be publishing more about this use case in the coming days, so stay tuned for that!

## 📊 visualize Your Model History with Tensorboard

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cd0820b2/65315f56f86103b0fb7b8760_tensorboard.png" alt="Visualizing model history with Tensorboard" />
</figure>

[Tensorboard](https://www.tensorflow.org/tensorboard/) is a way to visualize your machine learning models and training outputs. In this release we added a custom visualization for Kubeflow which allows you to see the entire history of a model logged by a step.

Behind the scenes, we implemented a TensorboardService which tracks and manages locally running Tensorboard daemons. This interactive UI runs in the background and works even while your pipeline is running. To use this feature, the easiest way is to click the ‘Start Tensorboard’ button inside the Kubeflow UI.

This new functionality has also been integrated into [our Kubeflow example](https://docs.zenml.io/stacks-and-components/component-guide/orchestrators/kubeflow) from previous releases.

## 💻 User Experience Improvements

If you ever need a reminder of the function of a particular stack, there’s a new explain command that works for all stack components (orchestrator, container registry and so on). Typing zenml orchestrator explain will output the relevant parts of the documentation that explain some basics about the orchestrator component.

We added functionality to output whether a step is being executed from a cached version or is actually being executed for the first time. We also improved error messages when provisioning local Kubeflow resources with a non-local container registry.

## ➕ Other Updates, Additions and Fixes

Our test suite was thoroughly reimagined and reworked to get the most out of Github Actions. Alexej blogged about this for the ZenML blog here: “[How we made our integration tests delightful by optimizing the way our GitHub Actions run our test suite](https://blog.zenml.io/github-actions-in-action/)”. We also completed the implementation of all integration tests such that they run on our test suite.

We enabled the use of generic step inputs and outputs as part of your pipeline.

Finally, we made a number of under-the-hood dependency changes that you probably won’t notice, but that either reduce the overall size of ZenML or fix some old or deprecated packages. Notably, ZenML no longer supports Python 3.6.

## 🙌 Community Contributions

We received [a contribution](https://github.com/zenml-io/zenml/pull/438) from [Ben](https://github.com/pafpixel), in which he fixed a typo in our documentation. Thank you, Ben!

## Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know what you think we should build next!

Keep your eyes open for future releases and make sure to vote on your favorite feature of our [roadmap](https://zenml.io/roadmap) to make sure it gets implemented as soon as possible.

[Photo by [Eyestetix Studio](https://unsplash.com/@eyestetix?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)]

