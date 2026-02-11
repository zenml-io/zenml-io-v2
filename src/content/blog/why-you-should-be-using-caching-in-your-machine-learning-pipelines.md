---
title: "Why you should be using caching in your machine learning pipelines"
slug: "why-you-should-be-using-caching-in-your-machine-learning-pipelines"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65316704812d7c102185be39"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-08-21T12:32:08.204Z"
  lastUpdated: "2024-08-21T12:28:02.939Z"
  createdOn: "2023-10-19T17:27:32.216Z"
author: "alex-strick-van-linschoten"
category: "mlops"
tags:
  - "mlops"
  - "evergreen"
  - "pipelines"
  - "zenml"
date: "2021-12-07T00:00:00.000Z"
readingTime: 4 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/d81579c9/653166dabbf330ebefbc01fb_juliana-kozoski-X3-IypGOGSE-unsplash.jpg"
seo:
  title: "Why you should be using caching in your machine learning pipelines - ZenML Blog"
  description: "Use caches to save time in your training cycles, and potentially to save some money as well!"
  canonical: "https://www.zenml.io/blog/why-you-should-be-using-caching-in-your-machine-learning-pipelines"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/8e56ae7e/653166dabbf330ebefbc01fb_juliana-kozoski-X3-IypGOGSE-unsplash.jpg"
  ogTitle: "Why you should be using caching in your machine learning pipelines - ZenML Blog"
  ogDescription: "Use caches to save time in your training cycles, and potentially to save some money as well!"
---

**Last updated:** November 3, 2022.

Data is the lifeblood that feeds machine learning models. The process of developing those models requires data in different forms. During the early lifecycle stages of any particular model, particularly when experimenting with different approaches, this data will get used repeatedly.

Machine learning model development is extremely iterative in this way. Data scientists are constantly repeating steps in slightly different combinations. Given that data often is imported or transformed in the course of these steps, it would be good to find a way to minimize wasted work. Luckily, we can use caching to save the day.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/890d1650/65316615bedf282f8b5a0aa3_caching-trio.png" alt="Caching in machine learning workflows via the distracted boyfriend meme" />
</figure>

If we organize the steps of our model training smartly, we can ensure that the data outputs and inputs along the way are cached. A good way to think about splitting up the steps is to use the image of [pipelines](https://blog.zenml.io/tag/pipelines/) and the steps that are executed. For each step, data is passed in, and (potentially) gets returned. We can cache the data at these entry and exit points. If we rerun the pipeline we will only rerun an individual step if something has changed in the implementation, otherwise we can just use the cached output value.

## Benefits of Caching

I hope some of the benefits of caching are clear to you now.

<ul><li><strong>🔁 Iteration Efficiency</strong> - When experimenting, it really pays to have a high frequency of iteration. You learn when and how to course correct earlier and more often. Caching brings you closer to that by making the costs of frequent iteration much lower.</li><li><strong>💪 Increased Productivity</strong> - The speed-up in iteration frequency will help you solve problems faster, making stakeholders happier and giving you a greater feeling of agency in your machine learning work.</li><li><strong>🌳 Environmental Friendliness</strong> - Caching saves you the <a href="https://machinelearning.piyasaa.com/greening-ai-rebooting-the-environmental-harms-of-machine/">needless repeated computation steps</a> which mean you use up and waste less energy. It all adds up!</li><li><strong>＄ Reduced Costs</strong> - Your bottom-line will thank you! Not only do you save the planet, but your monthly cloud bills might be lower on account of your skipping those repeated steps.</li></ul>

## Get caching for free with ZenML pipelines

ZenML takes care of caching the artifacts that either come in or are output from the steps of your machine learning pipeline. ZenML builds on [the concept of a Metadata Store](https://docs.zenml.io/v/0.13.2/mlops-stacks/metadata-stores) and currently we use [MLMetadataStore](https://www.tensorflow.org/tfx/guide/mlmd) to power this functionality. This foundational practice of building pipelines made up of steps - with some kind of way to track the metadata around these steps - is necessary for caching to work.

These things are often made clearer with an actual example, so let’s jump into the [MNIST dataset](https://github.com/tensorflow/datasets/blob/master/tensorflow_datasets/image_classification/mnist.py). (Follow the steps in our [examples directory](https://github.com/zenml-io/zenml/tree/main/examples/) to get this running on your local machine.)

On the first run, we can visualize the steps of the pipeline as having all completed. None are cached yet, as you would expect.

```bash
# Initialize a pipeline run
run_1 = mnist_pipeline(
    importer=importer_mnist(),
    normalizer=normalizer(),
    trainer=tf_trainer(config=TrainerConfig(epochs=1)),
    evaluator=tf_evaluator(),
)

# Run the pipeline
run_1.run()
```

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e2fe0433/653166142630c5a779ffaddb_run1.png" alt="First run of our pipeline" />
</figure>

*Here’s what the pipeline lineage tracking visualizer looks like*

When we run the pipeline again, you can see that most of the steps have been cached, aside from the trainer step which is different because we change the code slightly so that it will run for two epochs:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/c0d78de6/6531661499881fa5af1c09e0_run2.png" alt="The second run" />
</figure>

*Here’s what the pipeline lineage tracking visualizer looks like*

In this case, caching does save us some time even though the steps weren’t extraordinarily compute-intensive to start with.

Step Run1 Execution (s) Run2 Execution (s) Speed Increase importer_mnist 1.165 0.018 **64x **normalizer 1.581 0.018 **87x**

Think how much time it will save you in your complex feature engineering pipelines!

Caching is turned on by default. The cache for that particular step’s artifact is then invalidated whenever the code signature for the step changes, or when caching is manually disabled by setting the @step decorator’s enable_cache parameter to False. We compare the two steps with a simple hashing function to see whether any changes have taken place.

## Plug

If you like the thoughts here, we’d love to hear your feedback on ZenML. It is [open-source](https://github.com/zenml-io/zenml) and we are looking for early adopters and [contributors](https://github.com/zenml-io/zenml)! And if you find it is the right order of abstraction for you/your data scientists, then let us know as well via [our Slack](http://zenml.io/slack-invite) — looking forward to hearing from you!

[Photo by [Juliana Kozoski](https://unsplash.com/@jkozoski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/pipes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)]

