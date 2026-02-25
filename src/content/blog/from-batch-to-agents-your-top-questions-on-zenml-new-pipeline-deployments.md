---
title: "From Batch to Agents: Your Top Questions on ZenML's New Pipeline Deployments"
slug: "from-batch-to-agents-your-top-questions-on-zenml-new-pipeline-deployments"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6903390f56854d99c231a367"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-02-03T10:39:58.218Z"
  createdOn: "2025-10-30T10:08:15.583Z"
author: "alex-strick-van-linschoten"
category: "webinars"
tags:
  - "deployment"
  - "zenml"
  - "cloud"
  - "agents"
date: "2025-10-30T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/6cd28c91/6981cf64f4f7a9ede995c462_6981ce86395d516b0bf8fd89_webinar-blog-1.avif"
seo:
  title: "From Batch to Agents: Your Top Questions on ZenML's New Pipeline Deployments - ZenML Blog"
  description: "ZenML's new pipeline deployments feature lets you use the same pipeline syntax to run both batch ML training jobs and deploy real-time AI agents or inference APIs, with seamless local-to-cloud deployment via a unified deployer stack component."
  canonical: "https://www.zenml.io/blog/from-batch-to-agents-your-top-questions-on-zenml-new-pipeline-deployments"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/6cd28c91/6981cf64f4f7a9ede995c462_6981ce86395d516b0bf8fd89_webinar-blog-1.avif"
  ogTitle: "From Batch to Agents: Your Top Questions on ZenML's New Pipeline Deployments - ZenML Blog"
  ogDescription: "ZenML's new pipeline deployments feature lets you use the same pipeline syntax to run both batch ML training jobs and deploy real-time AI agents or inference APIs, with seamless local-to-cloud deployment via a unified deployer stack component."
---

We just hosted a webinar (which you can watch below!) to demo one of our most exciting new features: **pipeline deployments**. In the session, our co-founder and CTO, Hamza, shared a "spicy take" that's central to this feature: modern AI agents are, for all intents and purposes, just pipelines. They chain calls, version artifacts (like context), and demand the same robustness and observability as traditional ML workflows. The problem? Most MLOps tools were built for slow, multi-node *batch* jobs (like training), not for the **fast, low-latency, single-node requests** that a chatbot or real-time API needs.

This is the exact gap our new pipeline deployments feature is built to fill. It allows you to take the *exact same* ZenML pipeline syntax you already use for training and instantly wrap it as a high-performance, real-time service (using FastAPI under the hood). As we showed in the demo, this unified approach is a game-changer. It not only simplifies the long-standing challenge of serving classic ML models (like a churn predictor) but also provides a production-grade, observable path for deploying modern agentic workflows (like the weather agent we built). You write your logic once as a ZenML pipeline, and you can choose to run it as a batch job *or* deploy it as an API.

The real magic is in the developer experience, which is built around our new `deployer` stack component. You can start by deploying locally to get an instant API on your machine for testing—you can even bundle a static UI folder to create a full-stack app, just like a Gradio or Streamlit demo. When you're ready for production, you simply switch your stack to use a cloud deployer (like for **GCP Cloud Run**, **AWS**, or **Kubernetes**). ZenML then automatically containerizes your pipeline, pushes it to the cloud, and provisions the scalable, production-grade service for you, creating a seamless path from a local idea to a production-ready AI application.

<figure class="w-richtext-figure-type-video w-richtext-align-center" style="padding-bottom:33.723653395784545%" data-rt-type="video" data-rt-align="center" data-rt-max-width="" data-rt-max-height="33.723653395784545%" data-rt-dimensions="854:480" data-page-url="https://www.youtube.com/watch?v=q3deihA_9uY"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/q3deihA_9uY" title="The Unified AI Stack: Pipelines for Models and Agents"></iframe></figure>

The demo in the webinar was well-received, but the Q&A session afterward was even better. You asked fantastic, tough questions about how this all works in production, so we wanted to showcase some of that discussion here—it gets to the heart of *why* we built this feature and where it's headed.

### 🤖 How does this work for AI Agents (with memory, loops, etc.)?

A lot of your questions centered on agentic workflows: What about memory for chatbots? How do you handle multi-agent setups? What about dynamic loops?

Our "spicy take" is that an agent is just a pipeline. It's a workflow you need to version, observe, and manage. For things like **memory**, we're exposing session IDs so you can build multi-turn conversations just as you would in FastAPI. As for complex **multi-agent setups**, our philosophy is to manage the "outer loop" (productionization, observability, deployment) while letting you use specialized tools like LangGraph or CrewAI *inside* a ZenML step to handle the "inner loop" of agent-to-agent communication. We also (accidentally\!) "leaked" that true **dynamic pipelines**—with native `if` conditions and loops—are coming very soon, which will make building these agentic workflows even more powerful.

### ⚡ How does this scale? (And when should I use it vs. a batch pipeline?)

This was the most popular topic: How does this "single-node" strategy scale, and when should I use it?

The key is that we now support *both*. You still use traditional, multi-node **batch pipelines** for slow, heavy, asynchronous jobs like training or large-scale evaluation. But for **real-time inference or agent apps** where latency is critical, these new deployments run as a fast, single process inside the API.

When you're ready to scale, you just switch your stack. You can go from the local deployer to our cloud deployers (like **GCP Cloud Run**, **AWS**, or the upcoming **Kubernetes deployer**) with a single command. ZenML then automatically containerizes your code and configuration, pushing it to a service that handles auto-scaling, replicas, and resource management for you.

### 🚀 What about CI/CD, A/B Testing, and Versioning?

Many of you asked about the "Ops" in MLOps: "Can I automatically redeploy when I fine-tune a model?" or "How do I handle versioning and rollbacks?"

This is where the MLOps foundation of ZenML really shines. We've introduced a feature called **snapshots**, which allows you to version and roll back entire pipeline deployments. This fits perfectly into a CI/CD workflow. For example, you can have a flow that automatically fine-tunes a model, runs an evaluation pipeline (using tools like Ragas, which can also be a ZenML step), and then—if the evals pass—automatically deploys the new model as a new version of your live endpoint.

We hope this answers some of your deeper questions! The goal of pipeline deployments is to unify the full ML lifecycle, from batch training to real-time agentic applications, under one common framework.

The best way to understand it is to try it. You can `pip install zenml` to get started in seconds. And as always, please join our [Slack community](https://zenml.io/slack) to share your feedback and ask even more questions!