---
title: "Optimizing LLM Server Startup Times for Preemptable GPU Infrastructure"
slug: "optimizing-llm-server-startup-times-for-preemptable-gpu-infrastructure"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed41c34367dbf302ef6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:37:39.121Z"
  createdOn: "2024-11-21T14:08:20.648Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "cost-optimization"
  - "devops"
  - "google-gcp"
  - "kubernetes"
  - "latency-optimization"
  - "model-optimization"
  - "orchestration"
  - "pytorch"
  - "reliability"
  - "scalability"
  - "scaling"
  - "triton"
industryTags: "tech"
company: "Replit"
summary: "Replit faced challenges with running LLM inference on expensive GPU infrastructure and implemented a solution using preemptable cloud GPUs to reduce costs by two-thirds. The key challenge was reducing server startup time from 18 minutes to under 2 minutes to handle preemption events, which they achieved through container optimization, GKE image streaming, and improved model loading processes."
link: "https://www.youtube.com/watch?v=ofcJIrhadfc"
year: 2023
seo:
  title: "Replit: Optimizing LLM Server Startup Times for Preemptable GPU Infrastructure - ZenML LLMOps Database"
  description: "Replit faced challenges with running LLM inference on expensive GPU infrastructure and implemented a solution using preemptable cloud GPUs to reduce costs by two-thirds. The key challenge was reducing server startup time from 18 minutes to under 2 minutes to handle preemption events, which they achieved through container optimization, GKE image streaming, and improved model loading processes."
  canonical: "https://www.zenml.io/llmops-database/optimizing-llm-server-startup-times-for-preemptable-gpu-infrastructure"
  ogTitle: "Replit: Optimizing LLM Server Startup Times for Preemptable GPU Infrastructure - ZenML LLMOps Database"
  ogDescription: "Replit faced challenges with running LLM inference on expensive GPU infrastructure and implemented a solution using preemptable cloud GPUs to reduce costs by two-thirds. The key challenge was reducing server startup time from 18 minutes to under 2 minutes to handle preemption events, which they achieved through container optimization, GKE image streaming, and improved model loading processes."
---

## Overview

This case study comes from a lightning talk by Bradley Halloran, an engineer at Replit (and notably, formerly employee number seven at YouTube). Replit is a web-based integrated development environment (IDE) that leverages LLMs extensively for features like code completion, code transformation, code explanation, and debugging assistance. The company has invested significantly in self-training and hosting their own models, with at least one model being open-sourced on Hugging Face.

The core challenge Replit faced was economic: serving large language models at low latency requires high-end GPUs like the NVIDIA A100 (with H100 testing mentioned), but these are expensive. On Google Cloud, an A100 costs approximately $3,000 per month at on-demand pricing, compared to about $1,000 per month for spot (preemptable) pricing. This represents a potential cost reduction of two-thirds—a significant savings at scale.

## The Preemptable GPU Challenge

The fundamental tension in using preemptable instances for production LLM serving is that these instances come with significant reliability challenges. Google's own documentation explicitly advises against running "highly available services" on spot nodes. The specific challenges include:

- **Frequent preemptions**: Node preemptions occur regularly and are visible as a "steady stream" in logs
- **Stockouts**: Entire availability zones can run out of resources entirely
- **Only 15 seconds of warning**: When a node is about to be terminated, you get just 15 seconds of notification
- **Kubernetes features don't work as expected**: Pod Disruption Budgets, for example, don't function on spot nodes
- **Generally worse guarantees**: The "best effort" nature means you cannot rely on consistent availability

Despite these challenges, Replit pursued this approach and was able to maintain uptime while cutting costs significantly.

## Strategy Overview

Replit addressed the preemptable instance challenges through three main strategies:

- Spreading workloads across as many availability zones as possible to reduce risk
- Maintaining techniques for falling back to more expensive on-demand nodes, and using committed use discounts for baseline capacity
- Speeding up server startup time to be highly dynamic and reactive when nodes appear and disappear

The lightning talk focused primarily on the third strategy: dramatically reducing server startup time.

## The Startup Time Problem

When Bradley's team analyzed their LLM serving infrastructure, they found that total server startup took approximately 18 minutes:

- About 2 minutes for the node to come online and install GPU drivers
- About 11 minutes for application containers to start
- About 5 minutes for the model to load weights and become healthy for serving

This 18-minute startup time was untenable for a system where nodes could disappear with only 15 seconds of warning. The goal was to dramatically reduce this time to enable rapid scaling and recovery.

## Optimization 1: Container Size Reduction

The first optimization targeted the container images themselves. The team was able to shave approximately 10 gigabytes from the compressed container size through several techniques:

- **Removing pip cache**: By default, pip maintains a cache of downloaded packages. This is unnecessary in production containers where packages won't be reinstalled.
- **Removing dev/test dependencies**: PyTorch was included as a dev/test dependency, and installing PyTorch also brings in CUDA libraries, which are approximately 2 gigabytes in size.
- **Using slim base images**: Switching to slim base images reduced unnecessary OS-level dependencies.
- **Trimming Triton Inference Server**: Replit uses NVIDIA's Triton Inference Server to serve their models. By default, Triton includes support for multiple frameworks (TensorFlow, PyTorch, ONNX). Since they were serving a single model with a single framework, they removed support for the unused frameworks.
- **Build artifact cleanup**: General housekeeping to remove artifacts left by the build process.

While these optimizations saved about 10GB of container size, the actual time savings were relatively modest—only about 1-2 minutes off the 18-minute total.

## Optimization 2: GKE Image Streaming

The breakthrough for container startup time came from enabling GKE (Google Kubernetes Engine) Image Streaming. Google describes this feature as reducing "image pull time from minutes to seconds," and that's exactly what Replit experienced.

Image streaming works by streaming file contents in the background as they are read, rather than downloading the entire container image before starting. This approach is particularly effective when containers don't need every file immediately at startup—which was the case for Replit's LLM serving containers.

An additional benefit is that image streaming applies at the node level, so Kubernetes system containers also started booting faster, contributing to the overall startup time reduction.

## Optimization 3: Model Loading and Storage

The next major bottleneck was loading the actual model weights. For context, a 3-billion parameter model might be approximately 12GB on disk. The team's initial setup was fetching models from Google Cloud Storage (GCS) onto a remotely attached spinning disk.

The obvious first fix was to switch to locally attached NVMe SSDs—the fastest storage option available. Surprisingly, this change showed no improvement. With at least a gigabit network interface and faster disk speeds, they expected much better performance, but transfer speeds remained around 50 megabytes per second.

After extensive investigation, they discovered the problem was in the container image they were using for the gsutil tool (Google's rsync equivalent for GCS). Switching from an Alpine-based container image to a Debian slim-based image quintupled the transfer speed—a 5x improvement.

The root cause was a fascinating bug/feature: the gsutil code contained a comment explaining that multi-processing was disabled on Alpine because it would cause hangs. This was not documented anywhere except in the source code repository itself. The Alpine image was silently running in single-process mode, severely limiting download throughput.

With this fix, model loading time dropped from approximately 4 minutes to under 30 seconds.

## Results

Through these combined optimizations, Replit reduced their LLM server startup time from 18 minutes to approximately 2 minutes (and sometimes well under that). This dramatic improvement enabled them to successfully run their LLM serving infrastructure on preemptable GPU instances, achieving:

- **Two-thirds cost reduction**: Moving from ~$3,000/month to ~$1,000/month per A100 GPU
- **Maintained uptime**: Despite the inherent unreliability of spot instances
- **Rapid scaling and recovery**: Nodes can now come online quickly enough to handle the dynamics of preemptable infrastructure

## Technical Lessons and Observations

This case study offers several valuable lessons for LLMOps practitioners:

The first lesson is that infrastructure optimization for LLM serving often involves unglamorous but impactful work. Container size reduction, storage configuration, and tooling choices can have dramatic effects on operational efficiency.

The second lesson is the importance of understanding the entire stack. The gsutil multiprocessing bug was hidden deep in the source code and not documented. This kind of issue requires patience and willingness to dig into dependencies.

The third lesson is that cloud provider features like image streaming can provide substantial benefits with relatively low implementation effort. It's worth staying current with cloud provider capabilities.

Finally, the case study demonstrates that running production workloads on preemptable instances is possible with the right engineering investment, despite cloud providers' own warnings against it. The key is building systems that are resilient to frequent disruptions and can recover quickly.

## Tools and Technologies Referenced

The talk mentions several specific tools and technologies:

- **NVIDIA A100 and H100 GPUs**: The hardware being used for inference
- **NVIDIA Triton Inference Server**: The inference serving platform
- **Google Kubernetes Engine (GKE)**: The orchestration platform
- **GKE Image Streaming**: The feature enabling fast container startup
- **Google Cloud Storage (GCS)**: For model weight storage
- **gsutil**: Google's tool for transferring data from GCS
- **Hugging Face**: Where Replit's open-source model is hosted
- **Local NVMe SSDs**: For fast local storage

This case study provides a practical, real-world example of the infrastructure engineering required to operate LLMs cost-effectively at scale, with concrete numbers and specific technical solutions that other teams can learn from.