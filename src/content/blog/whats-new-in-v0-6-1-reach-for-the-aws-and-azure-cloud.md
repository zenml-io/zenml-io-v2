---
title: "What's New in v0.6.1: Reach for the AWS and Azure Cloud! ☁️"
slug: "whats-new-in-v0-6-1-reach-for-the-aws-and-azure-cloud"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65315a4f9943d576e6369468"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T10:21:07.363Z"
  createdOn: "2023-10-19T16:33:19.042Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "release-notes"
  - "zenml"
date: "2022-02-07T00:00:00.000Z"
readingTime: 2 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/7589acf4/65315a4350c7d3830935e53a_ankush-minda-4Xy08NbMBLM-unsplash.jpg"
---

**Last updated:** November 3, 2022.

ZenML 0.6.1 is out and it’s all about Cloud storage ☁️! We have improved your ability to work with AWS services and added a brand-new Azure integration! Run your pipelines on AWS and Azure now and let us know how it went [on our Slack](https://zenml.io/slack-invite/).

Smaller changes that you’ll notice include much-awaited updates and fixes, including the first iterations of scheduling pipelines and tracking more reproducibility-relevant data in the metadata store. For a detailed look at what’s changed, give [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.6.1) a glance.

## ☁️ Cloud Integrations: AWS and Azure

You can now use [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/) and [AWS’ S3](https://aws.amazon.com/s3?tag=soumet-20) as your [artifact store](https://docs.zenml.io/v/0.13.2/mlops-stacks/artifact-stores) for ZenML pipelines. We implemented all the relevant fileio methods to enable this. If you prefer to use Amazon’s AWS or Microsoft’s Azure, we hope these new integrations will be the start of more options for you when using ZenML.

To learn more, check out [the new documentation page](https://docs.zenml.io/) we just included to guide you in deploying your pipelines to AWS, GCP and/or Azure.

## 🛠 Stack and Integration Improvements

Some significant improvements behind the scenes, though some of these are the first in a series of wider improvements to specific areas:

<ul><li>All orchestrators now have the ability to configure Schedule objects (with the exception of the local orchestrator). This is the first part of our implementation of scheduled pipelines in ZenML. Watch this space for more!</li><li>You can now attach custom properties to your pipeline so that they are tracked within the ZenML Metadata Store.</li><li>Our MLFlow Tracking integration now works well with Kubeflow as well as scheduled pipelines. (You might have had issues when trying to use those two together in the previous release.)</li></ul>

## 🗒 Documentation Updates

As the codebase and functionality of ZenML grows, we always want to make sure [our documentation](https://docs.zenml.io/) is clear, up-to-date and easy to use. We made a number of changes in this release that will improve your experience in this regard:

<ul><li>Ensure <em>quickstart</em> example code is identical across everywhere it is referenced.</li><li>Fix MLFlow Tracking, lineage, statistics and airflow_local examples.</li><li>Various spelling and typo corrections.</li></ul>

## ➕ Other updates, additions and fixes

<ul><li>If you’re using ZenML in coordination with mypy in your own codebase, we added the relevant file that will mark it as a ‘typed’ package. You’re welcome! We saved you from some mypy errors 😄.</li><li>We improved the error message if your ZenML is missing inside a Kubeflow container entrypoint.</li><li>We now prevent access to the repository during step execution. This stops bad things from happening inadvertently.</li><li>The materializer registry now can detect sub-classes of defined types.</li><li>Our computation of the hashes of steps and materialisers (relied on by our caching behavior as well as other things) now works in notebooks rather than just in code executed from files.</li><li>We improved some error messages to help you better understand what’s going on when things go wrong.</li></ul>

## Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know what you think we should build next!

Keep your eyes open for future releases and make sure to vote on your favorite feature of our [roadmap](https://zenml.io/roadmap) to make sure it gets implemented as soon as possible.

[Image credit: Photo by [Ankush Minda](https://unsplash.com/@an_ku_sh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)]

