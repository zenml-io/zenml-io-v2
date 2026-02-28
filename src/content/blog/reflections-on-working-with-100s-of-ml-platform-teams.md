---
title: "Reflections on working with 100s of ML Platform teams"
slug: "reflections-on-working-with-100s-of-ml-platform-teams"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "667a832d512e46399a60eb71"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-06-27T10:20:25.310Z"
  lastUpdated: "2024-06-27T10:20:25.310Z"
  createdOn: "2024-06-25T08:43:25.889Z"
author: "hamza-tahir"
category: "zenml"
tags:
  - "bitesize"
  - "tooling"
  - "mlops"
date: "2024-06-25T00:00:00.000Z"
readingTime: 4 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/52f2fd9a/667a832446fc9fa35895a2f7_post250624.png"
seo:
  title: "Reflections on working with 100s of ML Platform teams - ZenML Blog"
  description: "Exploring the evolution of MLOps practices in organizations, from manual processes to automated systems, covering aspects like data science workflows, experiment tracking, code management, and model monitoring."
  canonical: "https://www.zenml.io/blog/reflections-on-working-with-100s-of-ml-platform-teams"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/f94f4063/667a832446fc9fa35895a2f7_post250624.png"
  ogTitle: "Reflections on working with 100s of ML Platform teams - ZenML Blog"
  ogDescription: "Exploring the evolution of MLOps practices in organizations, from manual processes to automated systems, covering aspects like data science workflows, experiment tracking, code management, and model monitoring."
---

Having worked with numerous MLOps platform teams—those responsible for centrally standardizing internal ML functions within their companies—I have observed several common patterns in how MLOps adoption typically unfolds over time. Having seen [Uber write about the evolution of their ML platform](https://www.uber.com/en-DE/blog/from-predictive-to-generative-ai/) recently, it inspired me to write my thoughts on what I’ve seen out in the wild:

## 🧱 Throw-it-over-the-wall → Self-serve data science

Usually, teams start with one or two people who are good at the ops part, so they are tasked with deploying models individually. This often involves a lot of direct communication and knowledge transfer. This pattern often forms silos, and over time teams tend to break them and give more power to data scientists to own production. IMO, the earlier this is done, the better. But you’re going to need a central platform to enable this.

**Tools you could use**: [ZenML](https://zenml.io/), [AWS Sagemaker](https://aws.amazon.com/sagemaker/), [Google Vertex AI](https://cloud.google.com/vertex-ai/)

## 📈 Manual experiments → Centralized tracking

This is perhaps the simplest possible step a data science team can take to 10x their productivity → Add an experiment tracking tool into the mix and you go from non-centralized, manual experiment tracking and logs to a central place where metrics and metadata live.

**Tools you could use**: [MLflow](https://zenml.io/integrations/mlflow), [CometML](https://www.comet.com/site/), [Neptune](https://www.neptune.ai/)

## 🚝 Mono-repo → Shared internal library

It’s natural to start with one big repo and throw all data science-related code in it. However, as teams mature, they tend to abstract commonly used patterns into an internal (pip) library that is maintained by a central function and in another repo. Also, a repo per project or model can also be introduced at this point (see shared templates).

**Tools you could use**: Pip, Poetry

## 🪣 Manual merges → Automated CI/CD

I’ve often seen a CI pattern emerge quickly, even in smaller startups. However, a proper CI/CD system with integration tests and automated model deployments is still hard to reach for most people. This is usually the end state → However, writing a few GitHub workflows or Gitlab pipelines can get most teams starting very far in the process.

**Tools you could use**: [GitHub](https://github.com/), [Gitlab](https://gitlab.com/), [Circle CI](https://circleci.com/)

## 👉 Manually triggered scripts → Automated workflows

Bash scripts that are hastily thrown together to trigger a `train.py` are probably the starting point for most teams, but very quickly teams can outgrow these. It’s hard to maintain, intransparent, and flaky. A common pattern is to transition to ML pipelines, where steps are combined together to create workflows that are orchestrated locally or on the cloud.

**Tools you could use**: [Airflow](https://zenml.io/integrations/airflow), [ZenML](https://zenml.io), [Kubeflow](https://zenml.io/integrations/kubeflow)

## 🏠 Non-structured repos → Shared templates

The first repo tends to evolve organically and contains a whole bunch of stuff that will be pruned later. Ultimately, a shared pattern is introduced and a tool like cookie-cutter or copier can be used to distribute a single standard way of doing things. This makes onboarding new team members and projects way easier.

**Tools you could use**: [Cookiecutter](https://github.com/cookiecutter/cookiecutter), [Copier](https://copier.readthedocs.io/en/stable/)

## 🖲️ Non-reproducible artifacts → Lineage and provenance

At first, no artifacts are tracked in the ML processes, including the machine learning models. Then the models start getting tracked, along with experiments and metrics. This might be in the form of a model registry. The last step in this is to also track data artifacts alongside model artifacts, to see a complete lineage of how a ML model was developed.

**Tools you could use**: [DVC](https://dvc.org/), [LakeFS](https://lakefs.io/), [ZenML](https://zenml.io)

## 💻 Unmonitored deployments → Advanced model & data monitoring

Models are notoriously hard to monitor - Whether its watching for spikes in the inputs or seeing deviations in the outputs. Therefore, detecting things like data and concept drift is usually the last puzzle piece to fall as teams mature into full MLOps maturity. If you’re automatically detecting drift and taking action, you are in the top 1% of ML teams.

**Tools you could use**: [Evidently](https://zenml.io/integrations/evidently), [Great Expectations](https://www.zenml.io/integrations/great-expectations)

If you’re building your own MLOps standard at your workplace, let me know what I’ve missed over on [Slack](https://zenml.io/slack). Excited to learn more, specifically how the GenAI hyper has effected this development.