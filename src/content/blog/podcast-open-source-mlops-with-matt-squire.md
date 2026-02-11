---
title: "Podcast: Open-Source MLOps with Matt Squire"
slug: "podcast-open-source-mlops-with-matt-squire"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "653127a8c78303ac754da9a9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-08-21T12:32:08.204Z"
  lastUpdated: "2024-08-21T12:28:17.977Z"
  createdOn: "2023-10-19T12:57:12.664Z"
author: "alex-strick-van-linschoten"
category: "podcast"
tags:
  - "bigger-picture"
  - "education"
  - "evergreen"
  - "machine-learning"
  - "mlops"
  - "podcast"
  - "tooling"
date: "2022-03-31T00:00:00.000Z"
readingTime: 2 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/d264f6f7/653127504e74889dfd6afcfb_matt-squire-profile.jpeg"
seo:
  title: "Podcast: Open-Source MLOps with Matt Squire - ZenML Blog"
  description: "This week I spoke with Matt Squire, the CTO and co-founder of Fuzzy Labs, where they help partner organizations think through how best to productionise their machine learning workflows."
  canonical: "https://www.zenml.io/blog/podcast-open-source-mlops-with-matt-squire"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/4af5c9e0/653127504e74889dfd6afcfb_matt-squire-profile.jpeg"
  ogTitle: "Podcast: Open-Source MLOps with Matt Squire - ZenML Blog"
  ogDescription: "This week I spoke with Matt Squire, the CTO and co-founder of Fuzzy Labs, where they help partner organizations think through how best to productionise their machine learning workflows."
---

**Last updated:** October 17, 2022.

This week I spoke with [Matt Squire](https://www.linkedin.com/in/matt-squire-a19896125/), the CTO and co-founder of [Fuzzy Labs](https://www.fuzzylabs.ai/), where they help partner organizations think through how best to productionize their machine learning workflows.

Matt and FuzzyLabs are also behind the ‘[Awesome Open Source MLOps](https://github.com/fuzzylabs/awesome-open-mlops)’ GitHub repo where you can find all the options for an open-source MLOps stack of your dreams.

Matt has been an enthusiastic early supporter of the work we do at ZenML so it was really amazing to get to talk to him and get his take based on the many experiences he’s had seeing how machine learning is done out in the field.

In this clip, Matt talks through the components that would make up his ideal MLOps stack:

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://share.descript.com/embed/7QxoXz3v8ZN" frameBorder="0" allowfullscreen=""></iframe></figure>

Matt has also recently been writing a series of blog posts about ZenML over at the Fuzzy Labs Blog:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/350c658a/6531275840b0d68e5ae25459_blogposts.png" alt="Fuzzy Lab blog posts" />
</figure>

Only the [first](https://www.fuzzylabs.ai/blog-post/the-road-to-zen-part-1-getting-started-pipelines) [two](https://www.fuzzylabs.ai/blog-post/the-road-to-zen-running-experiments) parts are out, but they cover the basics of running ZenML pipelines as well as experiment tracking with MLflow. Towards the end of the first one, Matt lays out the case for why a tool like ZenML is important in a machine learning workflow:

> “The first is reproducibility. By writing really clear, modular pipelines, we can efficiently re-run a pipeline many times over. ZenML not only encourages this clear programming style, it also helps us to capture pipeline dependencies, which we’ve done by adding a special PIP requirements file (pipeline-requirements.txt). […] The pipeline that we’ve written can be run on any data scientist’s machine, and it will always do the same thing, produce the same model. It can also run using a dedicated model training environment, like KubeFlow, which you might do if you wanted more compute power than your own machine has. You don’t need to modify your pipeline in any way to do this; ZenML figures out how to run the pipeline in whatever target environment you’re using. The notion of writing a pipeline once and running it anywhere is one of the unique things about ZenML. It means your pipelines are decoupled from your infrastructure, which in turn enables a data scientist to focus just on the pipeline, without worrying about what infrastructure it will run on.”

We encourage you to [visit the Fuzzy Labs Blog](https://www.fuzzylabs.ai/blog) and read the full series along with the other articles that they have there.

As always, full show notes and links are available on [our dedicated podcast page](https://podcast.zenml.io/).

<iframe src="https://player.fireside.fm/v2/vA-gqsEV+UsZ0ZY4P?theme=dark" width="740" height="200" frameBorder="0" scrolling="no"></iframe>

[Subscribe to Pipeline Conversations](https://podcast.zenml.io/subscribe)* with* *your favorite podcast player *[here](https://podcast.zenml.io/subscribe)*.*

