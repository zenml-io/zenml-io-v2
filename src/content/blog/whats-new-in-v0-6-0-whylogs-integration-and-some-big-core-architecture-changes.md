---
title: "What's New in v0.6.0: whylogs integration and some big core architecture changes"
slug: "whats-new-in-v0-6-0-whylogs-integration-and-some-big-core-architecture-changes"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65315f40e292fecbae78387e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T14:49:41.597Z"
  createdOn: "2023-10-19T16:54:24.372Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "release-notes"
  - "zenml"
date: "2022-01-26T00:00:00.000Z"
readingTime: 3 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/b4ab48c6/65315f0d6116d9eb5fc2e60f_rusty-watson-4Kf97smL2eY-unsplash.jpg"
---

**Last updated:** November 3, 2022.

ZenML 0.6.0 is out now. We’ve made some big changes under the hood, but our biggest public-facing addition is our new integration to support all your data logging needs: [whylogs](https://github.com/whylabs/whylogs). Our core architecture was [thoroughly reworked](https://github.com/zenml-io/zenml/pull/305) and is now in a much better place to support our ongoing development needs.

Smaller changes that you’ll notice include extensive documentation additions, updates and fixes. For a detailed look at what’s changed, give [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.6.0) a glance.

## 📊 Whylogs logging

[Whylogs](https://github.com/whylabs/whylogs) is an open source library that analyzes your data and creates statistical summaries called whylogs profiles. Whylogs profiles can be visualized locally or uploaded to the WhyLabs platform where more comprehensive analysis can be carried out.

ZenML integrates seamlessly with Whylogs and [WhyLabs](https://whylabs.ai/). This example shows how easy it is to enhance steps in an existing ML pipeline with Whylogs profiling features. Changes to the user code are minimal while ZenML takes care of all aspects related to Whylogs session initialization, profile serialization, versioning and persistence and even uploading generated profiles to [Whylabs](https://whylabs.ai/).

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/5a5e9ae6/65315f14ad085808c86ccb7e_whylogs-visualizer.png" alt="Example of the visualizations you can make from Whylogs profiles" />
</figure>

With our WhylogsVisualizer, as described in [the associated example notes](https://docs.zenml.io/stacks-and-components/component-guide/data-validators/whylogs), you can visualize Whylogs profiles generated as part of a pipeline.

## ⛩ New Core Architecture

We implemented [some fundamental changes](https://github.com/zenml-io/zenml/pull/305) to the core architecture to solve some of the issues we previously had and provide a more extensible design to support quicker implementations of different stack components and integrations. The main change was to refactor the Repository, Stack and StackComponent architectures. These changes had a pretty wide impact so involved changes in many files throughout the codebase, especially in the CLI which makes calls to all these pieces.

We’ve already seen how it helps us move faster in building integrations and we hope it helps to make contributions as pain-free as possible!

## 🗒 Documentation and Example Updates

As the codebase and functionality of ZenML grows, we always want to make sure our documentation is clear, up-to-date and easy to use. We made a number of changes in this release that will improve your experience in this regard:

<ul><li>added a number of new explainers on key ZenML concepts and how to use them in your code, notably on <a href="https://docs.zenml.io/user-guide/advanced-guide/handle-custom-data-types">how to create a custom materializer</a> and <a href="https://docs.zenml.io/user-guide/starter-guide/fetch-runs-after-execution">how to fetch historic pipeline runs</a> using the StepContext</li><li>fixed a number of typos and broken links</li><li>added versioning to our API documentation so you can choose to view the reference appropriate to the version that you’re using. We now use mkdocs for this so you’ll notice a slight visual refresh as well.</li><li>added new examples highlighting specific use cases and integrations:</li><li>how to create a custom materializer (<a href="https://github.com/zenml-io/zenml/tree/0.6.0/examples/custom_materializer">example</a>)</li><li>how to fetch historical pipeline runs (<a href="https://github.com/zenml-io/zenml/tree/0.6.0/examples/fetch_historical_runs">example</a>)</li><li>how to use standard interfaces for common ML patterns (<a href="https://github.com/zenml-io/zenml/tree/0.6.0/examples/standard_interfaces">example</a>)</li><li>whylogs logging (<a href="https://github.com/zenml-io/zenml/tree/0.6.0/examples/whylogs">example</a>)</li></ul>

## ➕ Other updates, additions and fixes

As with most releases, we made a number of small but significant fixes and additions. The most import of these were that you can now access the metadata store via the step context. This enables a number of new possible workflows and pipeline patterns and we’re really excited to have this in the release.

We added in a markdown parser for the zenml example info … command, so now when you want to use our CLI to learn more about specific examples you will see beautifully parsed text and not markdown markup.

We improved a few of our error messages, too, like for when the return type of a step function doesn’t match the expected type, or if step is called twice. We hope this makes ZenML just that little bit easier to use.

## 🙌 Community Contributions

We received [a contribution](https://github.com/zenml-io/zenml/pull/317) from [Bhuwan Bhatt](https://github.com/bhattbhuwan13), in which he fixed a documentation error. Thank you, Bhuwan!

## Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know what you think we should build next!

Keep your eyes open for future releases and make sure to vote on your favorite feature of our [roadmap](https://zenml.io/roadmap) to make sure it gets implemented as soon as possible.

[Image credit: Photo by [Rusty Watson](https://unsplash.com/@rustyct1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)]

