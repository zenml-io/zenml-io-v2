---
title: "New Features: Easy ML Infrastructure Deployment and More!"
slug: "new-zenml-features-ml-infrastructure-deployment"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66ab98b3858a8134491f3954"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-08-01T14:16:19.450Z"
  lastUpdated: "2024-08-01T14:16:19.450Z"
  createdOn: "2024-08-01T14:16:19.450Z"
author: "zenml-team"
category: "zenml-updates"
tags:
  - "release"
  - "release-notes"
date: "2024-08-01T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/bffeeb48/66ab987f4189493be8bc0881_zenml-release-0-63-min.png"
seo:
  title: "New Features: Easy ML Infrastructure Deployment and More! - ZenML Blog"
  description: "Recent releases of ZenML’s Python package have included a better way to deploy machine learning infrastructure or stacks, new annotation tool integrations, an upgrade of our Pydantic dependency and lots of documentation improvements."
  canonical: "https://www.zenml.io/blog/new-zenml-features-ml-infrastructure-deployment"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2185183d/66ab987f4189493be8bc0881_zenml-release-0-63-min.png"
  ogTitle: "New Features: Easy ML Infrastructure Deployment and More! - ZenML Blog"
  ogDescription: "Recent releases of ZenML’s Python package have included a better way to deploy machine learning infrastructure or stacks, new annotation tool integrations, an upgrade of our Pydantic dependency and lots of documentation improvements."
---

At ZenML, we're always working to make MLOps more accessible and streamlined for our users. In [our recent releases](https://github.com/zenml-io/zenml/releases) (0.58 through 0.63), we've introduced a host of new features and improvements that we're excited to share with you. From easy stack management to new annotator integrations and dashboard enhancements, these updates aim to simplify your MLOps workflow and provide a more intuitive user experience.

## Easy Stack Deployment using the 1-click deployment tool

One of the key highlights of our recent releases is the introduction of [an easy way to deploy a simple ZenML stack](https://docs.zenml.io/how-to/stack-deployment/deploy-a-cloud-stack) directly from the dashboard or the CLI.

With just a few clicks or a single command (`zenml stack deploy`), you can now set up the necessary infrastructure to run ZenML pipelines on the cloud. In the dashboard, simply navigate to the "Stacks" section and follow the guided process to deploy your stack.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7e7a0843/66ab98b3858a8134491f3945_66ab95cb7395de18755994b7_one-click-deployment-min.gif" alt="__wf_reserved_inherit" />
</figure>

If you like to see it in action and learn more about it, you can also watch [this 2-minute tutorial](https://www.youtube.com/watch?v=AME3YzfeXpc) or check out [our blog post](https://www.zenml.io/blog/easy-mlops-pipelines) about the 1-click deployment tool.

## Seamless Stack Registration using the Stack Wizard

Adding on top of the deployment tool, we have also implemented a new tool called the Stack Wizard, that gives our users the ability to [use their existing infrastructure to easily register a cloud stack](https://docs.zenml.io/how-to/stack-deployment/register-a-cloud-stack).

You can access the stack wizard through the CLI by using a single command (`zenml stack register -p YOUR_PROVIDER`), or through the dashboard by visiting the stacks section and clicking on `+New Stack`.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/da713a12/66a89907569a3536348350ad_66a898b846b4a6ca86777db5_wizard-steps.gif" alt="__wf_reserved_inherit" />
</figure>

Similar to the 1-click deployment, we have published [a 2-minute tutorial video](https://www.youtube.com/watch?v=diyt-Y7GLwY&t=20s) and [a blog post](https://www.zenml.io/blog/easy-mlops-pipelines-2-stack-wizard) about the Stack Wizard if you would like to learn more about it.

We believe the combination of these two features will greatly simplify the process of getting started with ZenML, especially for new users who may not be familiar with the intricacies of setting up a ZenML cloud stack.

## Upgrading to Pydantic v2

In release 0.60.0, we upgraded ZenML to use Pydantic v2, which brings performance improvements and new features, along with a significant set of integration updates. While this upgrade may introduce a few minor breaking changes, we believe the benefits outweigh the potential inconveniences. Be sure to check out [our detailed migration guide in the release notes](https://github.com/zenml-io/zenml/releases/tag/0.60.0).

## New Annotator Integrations

In release 0.58.0, we added support for three new annotator integrations:

<ul><li><a href="https://docs.zenml.io/stack-components/annotators/prodigy">Prodigy</a>: A powerful closed-source annotation tool for efficient data labeling.</li><li><a href="https://docs.zenml.io/stack-components/annotators/argilla">Argilla</a>: Works both locally and with cloud-based annotation instances.</li><li><a href="https://docs.zenml.io/stack-components/annotators/pigeon">Pigeon</a>: A lightweight annotator that works within Jupyter notebooks.</li></ul>

These integrations expand the range of annotation tools available to ZenML users, making it easier to find the right tool for your specific data labeling needs.

## Retry Configuration for Steps

Release 0.58.0 also introduced [a new retry configuration](https://docs.zenml.io/how-to/build-pipelines/retry-steps) for steps, allowing you to specify:

<ul><li><code>max_retries</code>: The maximum number of times a step should be retried in case of failure.</li><li><code>delay</code>: The initial delay in seconds before the first retry attempt.</li><li><code>backoff</code>: The factor by which the delay should be multiplied after each retry attempt.</li></ul>

This feature enhances the resilience of your pipelines by automatically retrying failed steps with customizable retry behavior.

## Dashboard Enhancements

We've made several improvements to the ZenML dashboard to enhance your user experience:

<ul><li><strong>Stacks</strong>: Navigate through your ZenML stacks and register new ones using the new <a href="https://www.zenml.io/blog/easy-mlops-pipelines">1-click deployment tool</a> and <a href="https://www.zenml.io/blog/easy-mlops-pipelines-2-stack-wizard">the stack wizard</a>.</li><li><strong>Breadcrumbs</strong>: Easily navigate and visualize the path of your Pipelines, Models, and Artifacts with our new breadcrumbs feature.</li><li><strong>Hugging Face Dataset Preview</strong>: <a href="https://www.zenml.io/blog/embedding-huggingface-datasets-visualizations-with-zenml">The updated Hugging Face integration</a> now supports automatic display of an embedded <code>datasets</code> preview pane in the dashboard when you return a <code>Dataset</code> from a step.</li></ul>

These enhancements aim to make the dashboard more intuitive and informative, allowing you to inspect and navigate your MLOps workflows more efficiently.

## Get Involved

We're always eager to hear your feedback and suggestions. Join [our Slack community](https://zenml.io/slack-invite) to share your thoughts on what we should build next, and keep an eye out for future releases as we continue to improve and expand ZenML's capabilities.

Thank you for being a part of the ZenML community, and happy MLOps! ❤️