---
title: "Easy ML infrastructure for cloud MLOps pipelines"
slug: "easy-mlops-pipelines-2-stack-wizard"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66a89907569a3536348350c7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-07-30T07:44:09.170Z"
  lastUpdated: "2024-07-30T07:44:09.170Z"
  createdOn: "2024-07-30T07:40:55.909Z"
author: "zenml-team"
category: "zenml-updates"
tags:
  - "sagemaker"
  - "stacks"
  - "aws"
date: "2024-07-30T00:00:00.000Z"
readingTime: 8 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/bf750f71/66a897670e183fb455727490_wizard-deployments-min.png"
seo:
  title: "Easy ML infrastructure for cloud MLOps pipelines - ZenML Blog"
  description: "Now you can easily connect AWS, GCP, and Azure cloud providers with ZenML directly with an easy wizard in the dashboard."
  canonical: "https://www.zenml.io/blog/easy-mlops-pipelines-2-stack-wizard"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9cd53ee4/66a897670e183fb455727490_wizard-deployments-min.png"
  ogTitle: "Easy ML infrastructure for cloud MLOps pipelines - ZenML Blog"
  ogDescription: "Now you can easily connect AWS, GCP, and Azure cloud providers with ZenML directly with an easy wizard in the dashboard."
---

ZenML [0.63.0](https://github.com/zenml-io/zenml/releases) brings with it another feature that makes connecting your existing AWS, GCP, and Azure cloud resources into an MLOps stack super simple. We’re calling it the [easy stack registration wizard](https://docs.zenml.io/how-to/stack-deployment/register-a-cloud-stack). This wizard allows you can **utilize existing cloud infrastructure** and register it back to ZenML.

Here is [Baris Can Durak](https://www.linkedin.com/in/bcdurak/) with a 2-minute video showcasing the new feature in action:

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:75%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="75%" data-rt-dimensions="640:480" data-page-url="https://www.youtube.com/watch?v=diyt-Y7GLwY"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/diyt-Y7GLwY" title="Easier MLOps Stacks 2: Easy MLOps Stack Registration Wizard"></iframe></figure>

## ☁️ Recalling the challenges of registering MLOps cloud stacks

In order to run a machine learning pipeline on one of the major cloud providers, users have to register a ZenML stack. [The stack consists o](https://docs.zenml.io/user-guide/production-guide/understand-stacks)f, at minimum:

<ul><li><a href="https://docs.zenml.io/stack-components/orchestrators">an <code>orchestrator</code></a>, the configuration of the service that executes the pipeline (e.g. GCP <a href="https://cloud.google.com/vertex-ai/docs/pipelines/introduction">Vertex AI Pipelines</a>/<a href="https://v1-9-branch.kubeflow.org/docs/components/pipelines/">Kubeflow Pipelines</a>)</li><li><a href="https://docs.zenml.io/stack-components/artifact-stores">an <code>artifact store</code></a>, the place where the output data of the pipeline is stored &nbsp;(e.g. a S3 bucket)</li><li><a href="https://docs.zenml.io/stack-components/container-registries">a <code>container registry</code></a>, the place where the Docker images that encapsulate the environment of the pipeline are stored &nbsp;(e.g. <a href="https://azure.microsoft.com/en-us/products/container-storage">Azure Container Storage</a>)</li></ul>

As we [recently](https://www.zenml.io/blog/easy-mlops-pipelines) discussed, connecting your cloud provider to ZenML can be a hassle. You have to individually register all the stack components, and then connect them in a [stack](https://docs.zenml.io/user-guide/production-guide/understand-stacks). You have to figure out permissions and accounts, which can be a bit cumbersome.

In principle, registering the stack is a few lines of CLI code with ZenML (See [this step-by-step guide in the ZenML docs](https://docs.zenml.io/how-to/popular-integrations/aws-guide)). However, we heard [again and again](https://zenml.slack.com/archives/C01FWQ5D0TT/p1719315671958489) from our community that registering stacks and components was one of the most difficult parts of the journey in the ZenML experience.

<ul><li>Registration is a <strong>multi-faceted process</strong>, with the service connector registration followed by stack components, and finally the stacks themselves.</li><li>Along the way, things tend to fail, largely with <strong>local CLI setups and cloud permissions.</strong></li><li>It can be <strong>overwhelming</strong> to dive into cloud concepts, especially for teams who do not have the necessary resources/time in-house.</li></ul>

A few weeks ago, we made deploying stack infrastructure a lot easier with the [1-click deployment experience](https://www.zenml.io/blog/easy-mlops-pipelines) in [version 0.61.0](https://github.com/zenml-io/zenml/releases/tag/0.61.0) onwards. However, the feature was for users who wanted to deploy infrastructure from scratch. What if you already have the existing infrastructure (e.g. [A Google Cloud Storage Bucket](https://cloud.google.com/storage/docs/creating-buckets), or an existing [GCP artifact registry](https://cloud.google.com/artifact-registry))? Enter the stack registration wizard.

# 🧙♂️ Easy Stack Registration Wizard

This feature is for users who have **existing infrastructure deployed**, and who simply need an easier way to connect that infrastructure to ZenML.

Here is how it works:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9c0ad609/66a89907569a3536348350b5_66a897d4281f27085c952267_easy-stack-registration-steps-min.png" alt="Flowchart showing ZenML&#039;s cloud resource management process: input credentials, scan resources, select resources, and auto-register stack." />
</figure>

This flow makes it super trivial to just point to the right services and defaults to sane configuration options. You can simply select what sort of orchestration service you want to use, what bucket to utilize for the artifacts and the container registry you’d like to use. All the rest is created automatically by ZenML.

## How to use it

📢 Note that this feature is only available in a deployed version of ZenML (not in a local scenario via `zenml up`). Learn how to deploy ZenML [here](https://docs.zenml.io/getting-started/deploying-zenml).

To register a stack with the wizard, you can [deploy](https://docs.zenml.io/getting-started/deploying-zenml) and [connect](https://docs.zenml.io/how-to/connecting-to-zenml) to ZenML, and then use:

```
zenml stack register -p aws
```

This will launch a CLI flow that will guide you through registering a stack.

If you’d rather use the dashboard, you can do so by clicking on the `Stacks` section, and then clicking on “Create Stack”:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/da713a12/66a89907569a3536348350ad_66a898b846b4a6ca86777db5_wizard-steps.gif" alt="__wf_reserved_inherit" />
</figure>

## 🤸What’s next?

We think this feature will make life a lot easier for new and existing users of ZenML. All three cloud providers are supported. If you’d like even more stack options, just let us know [on Slack](https://zenml.io/slack) so we can prioritize.

## 🦫 Try it now

Try these features today! In order to get access, simply [update to the 0.63.0 version:](https://github.com/zenml-io/zenml/releases/tag/0.63.0)

```
pip install zenml>=0.63.0
```

The full docs are available [here.](https://docs.zenml.io/how-to/stack-deployment/register-a-cloud-stack) As always, feedback is appreciated!

## ❓FAQ

### Why should I use ZenML with AWS/Azure/GCP Cloud MLOps cloud platforms?

An MLOps pipeline is an end-to-end workflow that orchestrates the steps involved in building, deploying, and monitoring machine learning models. ZenML provides an ML platform that makes it easy to define MLOps pipelines locally and deploy them to various cloud services like [AWS Sagemaker Pipelines](https://docs.zenml.io/stack-components/orchestrators/sagemaker), [Azure ML pipelines](https://learn.microsoft.com/en-us/azure/machine-learning/concept-ml-pipelines?view=azureml-api-2), and [GCP Vertex AI Pipelines](https://docs.zenml.io/stack-components/orchestrators/vertex) with just a few clicks, as described above. Using ZenML and the Cloud services together, [you can significantly accelerate ML development.](https://www.zenml.io/case-study/adeo-leroy-merlin)

### How can ZenML's stack wizard accelerate ML platform setup?

Setting up the right infrastructure for MLOps development can be tricky for those with limited infrastructure resources internally. ZenML’s stack wizard is one of the easiest ways to register a simple MLOps stack without having to worry about the underlying infrastructure. This allows machine learning teams to quickly set up an MLOps pipeline and [iterate fast](https://www.zenml.io/blog/iterate-fast).

### Which cloud providers are supported by the stack wizard?

ZenML provides a cloud-agnostic MLOps platform that allows you to easily deploy and run ML pipelines on AWS, Azure, and GCP. With ZenML, you can define your pipeline once and then deploy it to your cloud provider of choice with minimal configuration. You can also deploy in a completely cloud-native way using the [Kubernetes Orchestrator](https://docs.zenml.io/stack-components/orchestrators/kubernetes).

