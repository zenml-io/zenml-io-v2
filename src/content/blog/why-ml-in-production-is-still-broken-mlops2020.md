---
title: "Why ML in production is (still) broken - [#MLOps2020]"
slug: "why-ml-in-production-is-still-broken-mlops2020"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65316e3962a576cf7c43f654"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-11-19T15:03:49.284Z"
  lastUpdated: "2024-11-19T12:22:44.596Z"
  createdOn: "2023-10-19T17:58:17.237Z"
author: "hamza-tahir"
category: "mlops"
tags:
  - "mlops"
  - "legacy"
  - "bigger-picture"
  - "devops"
date: "2020-06-26T00:00:00.000Z"
readingTime: 5 Mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/79950cfa/65316d2bc051413294285f1e_mlopsworldthumbnail.png"
seo:
  title: "Why ML in production is (still) broken - [#MLOps2020] - ZenML Blog"
  description: "The MLOps movement and associated new tooling is starting to help tackle the very real technical debt problems associated with machine learning in production."
  canonical: "https://www.zenml.io/blog/why-ml-in-production-is-still-broken-mlops2020"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/79950cfa/65316d2bc051413294285f1e_mlopsworldthumbnail.png"
  ogTitle: "Why ML in production is (still) broken - [#MLOps2020] - ZenML Blog"
  ogDescription: "The MLOps movement and associated new tooling is starting to help tackle the very real technical debt problems associated with machine learning in production."
---

**Last updated:** November 3, 2022.

Just a few days ago, I was able to share my thoughts on the state of Machine Learning in production, and why it’s (still) broken, on the MLOps World 2020. Read on for a writeup of my presentation, or checkout the recording of the talk on Youtube.

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://www.youtube.com/embed/PhlS_tnHZsg" frameBorder="0" allowfullscreen=""></iframe></figure>

## From research to production

By now, chances are you’ve read the famous paper about [hidden technical debt by Sculley et al. from 2015](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf). As a field, we have accepted that the actual share of Machine Learning is only a fraction of the work going into successful ML projects. The resulting complexity, especially in the transition to “live” environments, lead to large amounts of failed ML projects never reaching production.

Figures on the scope of the problem vary. [Forbes](https://www.forbes.com/sites/enriquedans/2019/07/21/stop-experimenting-with-machine-learning-and-start-actually-usingit/#:~:text=Stop%20Experimenting%20With%20Machine%20Learning%20And%20Start%20Actually%20Using%20It,-Enrique%20DansSenior&text=It%20turns%20out%20there's%20a,never%20make%20it%20into%20production.) and [Venturebeat](https://venturebeat.com/2019/07/19/why-do-87-of-data-science-projects-never-make-it-into-production/) talk about 87%, [Gartner](https://www.gartner.com/en/newsroom/press-releases/2018-02-13-gartner-says-nearly-half-of-cios-are-planning-to-deploy-artificial-intelligence) claims 85%. Less important than a precise figure is the fundamental fact behind them: Getting ML projects from research to production is hard.

A crucial factor for ML models crashing and burning in production is that ML systems are inherently more complex than more traditional applications. For the latter, code is the only thing that affects the behavior of a system. For the former, code and data combined affects how the system behaves. Unfortunately, data is notoriously hard to wrangle with, and can change in unexpected ways - leading to ML teams naturally accumulating dangerous technical debt as they solve short-term problems.

Managing technical debt is a well-understood paradigm of “traditional” software engineering. We manage dependencies and code through explicit versioning to ensure their impact on a system stays within a defined scope. Following established practises like writing tests and abstractions, continuous refactoring and documentation will always have an immediate positive impact on ML projects.

This is, in large, due to technical debt. However, it won’t solve the source of a large portion of technical debt of ML: Data directly affects the behavior of the system. When data changes, your models AND your architecture need to adapt.

## Accumulation of technical debt

On the path from first explorations to production systems projects accumulate technical debt. Let’s take a look at an exemplary progression. Each step of your maturing project incentivizes you to solve a different problem.

<ol><li>You start out explorative in jupyter notebooks, and eventually end up with a first well-performing model. </li></ol>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/ca417d49/673c8305f98e598c5f1b00bf_65316dd1ee3ecd7e95972fc7_download_20_16_.png" alt="" />
</figure>

<ol><li>That model needs to be deployed, right? To preserve speed and keep complexity low you wrap it in a Flask-based API container, pass on the API endpoint, done. </li></ol>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/80ad3145/673c8305f98e598c5f1b00b8_65316dd811b1c834ddc928aa_download_20_17_.png" alt="" />
</figure>

<ol><li>But wait, actually your data will change over time. You’re not just doing a one-of batch inference, so your deployment needs to be connected to the newly incoming data. New data might change in its structure, so you’re also adding monitoring for input and output distributions. </li></ol>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/1d18b326/673c8305f98e598c5f1b00bb_65316de57293f44f2b0eca20_download_20_18_.png" alt="" />
</figure>

<ol><li>The team, on top of that, will also start to refactor its codebase, because your needs have by far outgrown what you can do in Jupyter Notebooks. </li></ol>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/1837bc3c/673c8305f98e598c5f1b00ae_65316ded441013e9d6663585_download_20_19_.png" alt="" />
</figure>

<ol><li>By now you’re also facing the challenge to orchestrate all that preprocessing and training across resources. That beefy VM you were running your code on simply doesn’t cut it anymore. </li></ol>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6559157e/673c8305f98e598c5f1b00b2_65316dfd20324e8180276bf9_download_20_20_.png" alt="" />
</figure>

As you progress you’re further dividing your codebase in more granular functions - splitting and preprocessing is separated, eval becomes semi-automated, your ETLs become standardized, and metadata plays a decisive role for your architecture.

The resulting architecture is grown into a state of complexity that can’t be deployed by new team members. Changes impact your entire codebase. Your deploys get less frequent by the day. Eventually, you’re facing either costly rewrites or disproportionate efforts of maintenance.

Worst of it all? You did everything right at each step of the way. Ad-hoc necessities and spontaneous fires dictated the incentives for your engineering decisions. Unfortunately, these incentives are misaligned with the actual incentive of building a production-ready system.

## There is hope

The picture is not as bleak as it was a few years ago. There are solutions popping up everywhere. The FAANGs (plus Uber) of the world are sharing their experiences openly.

The industry is quickly converging on agreed upon components that are integral to a production ML system. A state-of-the-art high level architectural diagram for a production ML system can be pictured now clearly below:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/164971e4/673c8305f98e598c5f1b00b5_65316e08ee3ecd7e95975f17_download_20_21_.png" alt="" />
</figure>

To avoid train-serve drift, ML companies increasingly centralize their data in feature stores. Next to classical database systems (MySQL, Postgres, DynamoDB) and key-value stores ([HiveDB](https://github.com/hivedb)) there are also a number of proprietary systems are entering the market with powerful feature level automations. The people behind [Uber’s Michaelangelo](https://eng.uber.com/michelangelo-machine-learning-platform/) now raised $20 million for [Tecton](https://techcrunch.com/2020/04/28/tecton-ai-emerges-from-stealth-with-20m-series-a-to-build-operational-machine-learning-platform/), and [Logical Clocks](https://www.hopsworks.ai/) is doubling down on their feature store.

In the middle layers there are more tools than ever before. Some range from solving individual steps like distributed data manipulation ([Apache Beam](https://beam.apache.org/), [Spark](https://spark.apache.org/mllib/)), training (see [spaCy](https://spacy.io/), [Ray](https://github.com/ray-project/ray)) and monitoring (see [Prometheus](https://prometheus.io/)).

At the orchestration layer, the industry is now looking to solutions such as [Airflow](https://airflow.apache.org/) and [Kubeflow](https://www.kubeflow.org/), which gain steam every year. Individual pain points like complex model deployments now have solutions such as [Seldon](https://www.seldon.io/) and [Cortex](https://www.cortex.dev/). Finally, there are many great metadata tracking tools from easy-to-use ones like [Weights&Biases](https://www.wandb.com/) or [Comet ML](https://www.comet.ml/site/) to more complex ones like the [TensorFlow ML Metadata](https://www.tensorflow.org/tfx/guide/mlmd) project.

## ZenML

Despite the ever growing MLOps landscape, there is still plenty of room for improvement. In particular, it is still challenging to comprehend, interconnect and maintain relevant tooling in a reliable production environment.

This is where [ZenML](https://zenml.io/) comes in. Built as an end-to-end MLOps framework, it provides developers easy interfaces to production-ready data manipulation, training, serving, experiment tracking and orchestration layers. In addition, we put a focus on standardization, automation and comparability of ML pipelines.

To read more about ZenML head over to our [website ](https://zenml.io/)for more details. If you want to start using ZenML for your own ML production environment, [contact us](https://zenml.io/book-a-demo)!

