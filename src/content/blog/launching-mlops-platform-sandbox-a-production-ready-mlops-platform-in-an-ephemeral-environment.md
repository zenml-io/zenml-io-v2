---
title: "Launching MLOps Platform Sandbox: A Production-Ready MLOps Platform in an Ephemeral Environment"
slug: "launching-mlops-platform-sandbox-a-production-ready-mlops-platform-in-an-ephemeral-environment"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6530ae8e8d403fea685e33e2"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T09:43:49.551Z"
  createdOn: "2023-10-19T04:20:30.487Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "evergreen"
  - "mlops"
  - "sandbox"
  - "tooling"
  - "zenml"
date: "2023-05-31T00:00:00.000Z"
readingTime: 4 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/09e3e5c8/653267fe56e423c5b451b1fb_Group_9309.png"
---

**Last updated:** June 1st, 2023

We are excited to launch the MLOps Platform Sandbox, a one-click deployment platform for an ephemeral MLOps stack that you can use to run production-ready MLOps pipelines in the cloud. The MLOps Platform Sandbox allows you to create a sandbox with a stack made up of [ZenML](https://zenml.io/), [Kubeflow](https://www.kubeflow.org/), [MLflow](https://mlflow.org/), and [Minio](https://min.io/) Bucket. The Sandbox comes with pre-built example pipelines that you can run and try out. It provides a seamless experience for you to experiment with these tools without worrying about infrastructure setup and management.

## Simplifying MLOps Platform Deployment

The goal of [ZenML](https://www.zenml.io/) is to give ML and MLOps Engineers the ability to pick and choose their preferred infrastructure and tooling to build a platform that fulfills their company’s needs. However, deploying ZenML and a rudimentary MLOps platform can be time-consuming for new users. The MLOps Platform Sandbox bridges this gap by providing a one-click deployment platform for a pre-built ephemeral MLOps stack, simplifying the deployment process.

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://www.youtube-nocookie.com/embed/4oGF_utgJtE" frameBorder="0" allowfullscreen=""></iframe></figure>

You can sign up with Github and create a sandbox. After a few minutes, you’ll receive credentials for Kubeflow, Minio, MLflow, and ZenML. You can then use commands like zenml connect and zenml stack set to set your stacks and python run.py to run the pipelines. The sandbox is deleted after 8 hours, and you can choose from a repository of pre-built pipelines to run.

## Why ZenML On Kubeflow / MLflow / Minio?

Using ZenML with Kubeflow, MLflow, and Minio is a representative stack as it includes a production-ready orchestrator, an object storage component for data versioning, and a popular experiment tracking tool in machine learning. ZenML’s stack recipe system is designed to allow you to easily swap out components and infrastructure based on your company’s needs.

Our [Stack Recipes](https://github.com/zenml-io/mlops-stacks) allow you to take the next step after using the sandbox. These recipes are designed to be customizable, allowing you to easily swap out components and infrastructure based on your company’s requirements. You can replace Kubeflow with Vertex AI Pipelines or Sagemaker Pipelines, use S3 or GCS storage instead of Minio, and choose Weights and Biases or Neptune over MLflow.

## How to Use the Sandbox

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/223bed55/6530ae30534b0af06e727d5d_zenml_sandbox_step_3_commands.png" alt="Screenshot of the MLOps Platform Sandbox" />
</figure>

The Sandbox provides you with pre-built pipelines that you can easily re-run or modify to suit your needs, if you follow the steps on screen. Using these pre-built pipelines makes it incredibly easy to reproduce results and experiment with powerful tools integrated into the ZenML framework. By leveraging the MLOps Platform Sandbox, you can quickly explore the capabilities of a unified MLOps platform in the context of real ML pipelines without the hassle of setting up and managing your own infrastructure.

After you have run the pipelines, you can open the ZenML dashboard to see their status:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/ed475f01/6530ae31bf5dfd68f80ff70d_zenml_sandbox_zenml.png" alt="Sandbox pipelines running on ZenML" />
</figure>

You can also check the corresponding stack components to see the various services used. For example, Kubeflow would show you a similar DAG as ZenML running on a Kubernetes cluster:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/0242089f/6530ae32a9b001c04cade09c_zenml_sandbox_kubeflow.png" alt="Sandbox pipelines running on Kubeflow" />
</figure>

Minio will show you the versioned artifacts:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/7aa38d9e/6530ae31d25c27f91f999d88_zenml_sandbox_minio.png" alt="Sandbox pipelines running on Minio" />
</figure>

And MLflow will show you the experiment metadata tracked as the pipeline ran through:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/30a06cc1/6530ae30dd17f8cd1a19bee2_zenml_sandbox_mlflow.png" alt="Sandbox pipelines running on MLflow" />
</figure>

If you want to run your own custom code inside your sandbox, there are a few more steps you’ll have to do, all of which is [described in our dedicated documentation page](https://docs.zenml.io/user-guide/advanced-guide/sandbox).

## What To Do After Your Sandbox Expires

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/7725856d/6530ae31534b0af06e727de8_blupus_waiting.jpeg" alt="Blupus waits as sandbox expires" />
</figure>

Once you have experimented with the MLOps Platform Sandbox and gained a better understanding of how the ZenML frameworks work, you may want to deploy your own MLOps stack tailored to your specific needs. To help you with this process, ZenML offers [Stack Recipes](https://github.com/zenml-io/mlops-stacks), which provide a starting point for deploying various MLOps stacks on different cloud providers and with different components. Our documentation also includes [a guide to the specific steps to follow](https://docs.zenml.io/platform-guide/set-up-your-mlops-platform/deploy-and-set-up-a-cloud-stack/deploy-a-stack-post-sandbox) for when your sandbox has expired and you want to create your own MLOps stack.

If you would like to extend your sandbox, you can request an extension by [filling in the form here](https://zenml.io/extend-sandbox). We will get back to you as soon as possible, but please be sure to fill in the form in good time to allow us to review your request.

## Try out the Sandbox!

MLOps Platform Sandbox provides an easy-to-use platform for users to experiment with ZenML, Kubeflow, and MLflow without having to worry about infrastructure setup and management.

To try the MLOps Platform Sandbox, visit [https://sandbox.zenml.io](https://sandbox.zenml.io/). To learn more about ZenML, join our [Slack community](https://zenml.io/slack) and check out our [GitHub](https://github.com/zenml-io/zenml) repository.

