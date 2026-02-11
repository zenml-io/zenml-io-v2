---
title: "Multimodal Feature Stores and Research-Engineering Collaboration"
slug: "multimodal-feature-stores-and-research-engineering-collaboration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed4c4b8462758af0221"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:39:10.932Z"
  createdOn: "2024-11-21T14:08:20.912Z"
llmopsTags:
  - "cache"
  - "content-moderation"
  - "databases"
  - "devops"
  - "docker"
  - "documentation"
  - "embeddings"
  - "hugging-face"
  - "latency-optimization"
  - "model-optimization"
  - "multi-modality"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "unstructured-data"
  - "vector-search"
industryTags: "media-entertainment"
company: "Runway"
summary: "Runway, a leader in generative AI for creative tools, developed a novel approach to managing multimodal training data through what they call a \"multimodal feature store\". This system enables efficient storage and retrieval of diverse data types (video, images, text) along with their computed features and embeddings, facilitating large-scale distributed training while maintaining researcher productivity. The solution addresses challenges in data management, feature computation, and the research-to-production pipeline, while fostering better collaboration between researchers and engineers."
link: "https://www.youtube.com/watch?v=wBYMiEuOJTQ"
year: 2024
seo:
  title: "Runway: Multimodal Feature Stores and Research-Engineering Collaboration - ZenML LLMOps Database"
  description: "Runway, a leader in generative AI for creative tools, developed a novel approach to managing multimodal training data through what they call a \"multimodal feature store\". This system enables efficient storage and retrieval of diverse data types (video, images, text) along with their computed features and embeddings, facilitating large-scale distributed training while maintaining researcher productivity. The solution addresses challenges in data management, feature computation, and the research-to-production pipeline, while fostering better collaboration between researchers and engineers."
  canonical: "https://www.zenml.io/llmops-database/multimodal-feature-stores-and-research-engineering-collaboration"
  ogTitle: "Runway: Multimodal Feature Stores and Research-Engineering Collaboration - ZenML LLMOps Database"
  ogDescription: "Runway, a leader in generative AI for creative tools, developed a novel approach to managing multimodal training data through what they call a \"multimodal feature store\". This system enables efficient storage and retrieval of diverse data types (video, images, text) along with their computed features and embeddings, facilitating large-scale distributed training while maintaining researcher productivity. The solution addresses challenges in data management, feature computation, and the research-to-production pipeline, while fostering better collaboration between researchers and engineers."
---

## Overview

This case study comes from a podcast conversation with Ethan Rosenthal, a member of technical staff at Runway, a generative AI company that was one of the creators of Stable Diffusion and pioneered video generation models. Rosenthal previously worked at Square/Block on language models before joining Runway in January 2024. The discussion centers on the unique infrastructure challenges of training and serving multimodal AI models at scale, with a particular focus on what Rosenthal calls "multimodal feature stores."

Runway is known for products that generate video from text prompts, animate images into video, and provide creative tools like AI-powered green screen removal. Their products run entirely in the browser, which presents additional infrastructure challenges. The company was founded by creatives and emphasizes user experience, offering tools that go beyond simple prompting to leverage full computer capabilities for creative work.

## The Multimodal Feature Store Concept

Rosenthal introduces the concept of a "multimodal feature store" as a novel infrastructure pattern for generative AI training. Traditional feature stores, as used in tabular machine learning for applications like fraud detection, focus heavily on low-latency inference serving and maintaining parity between training and inference features. They handle streaming aggregations of events, such as computing the percentage of blocked payments from a merchant in the last 60 seconds.

The multimodal feature store inverts these priorities. For generative AI workloads, inference is relatively simple—you're typically just passing a prompt, an image, or some combination of modalities. The complexity shifts entirely to the training side, where you need to manage massive datasets containing videos, images, audio, text, and various computed features derived from these raw inputs.

The key challenge is that videos are extremely large, slow to decode, and slow to download. A training dataset might include not just raw videos but also metadata like resolution and dimensions, computed features like depth maps, and various embedding representations. This creates high variance between columns in the dataset—one column might contain full videos while another contains simple integer values for pixel counts.

## Searchability and Semantic Querying

One of the primary benefits of a multimodal feature store is enabling searchability over unstructured data. With tabular data in a data warehouse like Snowflake, you can write SQL queries to segment data and answer analytics questions. With multimodal data, semantic queries like "find all images with cats" require a more complex pipeline: compute vector embeddings for all images, then run nearest neighbor search.

This means the feature store needs to support vector search as a first-class operation. Researchers might want to ensure semantic diversity in training data, find specific subsets for fine-tuning, or explore the dataset in ways that require understanding the content semantically rather than just matching metadata fields. The feature store becomes the canonical place where embeddings and other computed features live, enabling downstream researchers to query and filter data for experiments.

## Feature Engineering for Multimodal Models

Rosenthal explains that modern generative AI models are not monolithic—they consist of multiple component models working together. He uses Runway's Gen-1 video-to-video model as an example: it includes a diffusion model, a CLIP model for converting text and images to embeddings, and a Midas model for depth estimation.

When training such systems, there are two approaches: compute these features on-the-fly during training, or pre-compute and store them in the feature store. Pre-computation enables researchers to experiment with different configurations—for example, trying different embedding models beyond CLIP—without repeatedly computing expensive features. The feature store becomes a repository of pre-computed features that researchers can mix and match for different experiments.

This is analogous to feature engineering in traditional ML, like normalizing features before model input. The difference is that the "features" being computed are complex artifacts like embeddings and depth maps rather than simple aggregations.

## Large-Scale Distributed Training

The most critical requirement for a multimodal feature store is supporting large-scale distributed training. Modern AI training jobs run on many machines, each with multiple GPUs, each GPU potentially having multiple data loader workers. This creates massive parallelization of requests to the training dataset.

For small datasets (like the text data Rosenthal worked with at Square), you can simply download the entire dataset to each machine. But for video and image data, this is completely intractable. Instead, you need to stream batches of data, downloading only the portions relevant to the current training step on each machine.

In an ideal architecture, the feature store supports both querying/storage and performant batch retrieval during training. You should be able to query for specific rows and columns (e.g., only the CLIP embeddings, not all embedding types) and have the system distribute data appropriately across machines. This avoids the overhead of creating separate training datasets as an intermediate step before training begins.

## Bridging Researchers and Engineers

A significant portion of the discussion focuses on organizational and workflow challenges in productionizing research. Rosenthal observes that many ML tools create a "wall" between researchers and engineers: researchers iterate in flexible environments, then must serialize their models and hand off scripts to be productionized. This prevents code reuse and makes it difficult to apply software engineering best practices.

At Square, they used a single codebase for both training and inference with shared internal libraries. While this limits researcher flexibility (modifications must not break other jobs), the benefits outweigh the costs: code reuse, DRY principles, the ability to write tests, and proper CI/CD. The alternative—researchers handing off one-off scripts—means reinventing models from scratch each time and losing the benefits of conventional software engineering.

The key enabler is providing examples rather than empty repositories. If a codebase already has tests, CI/CD, and Docker configurations, researchers can add to it rather than building from scratch. Rosenthal emphasizes empathy for researchers—he wrote "hideous" MATLAB code in grad school—but believes some software engineering practices are applicable to research environments.

## Infrastructure Philosophy

Rosenthal advocates strongly for keeping researchers as close to their normal development workflow as possible. Many cloud training tools require writing custom YAML files, using domain-specific languages, or rewriting code to fit the tool's paradigm. This creates friction and leads to engineers building "weird YAML transpilers" to handle custom logic.

The ideal experience: write code in your preferred IDE on your laptop in a shared codebase, hit "run," and have it execute on cloud GPUs with low latency. This requires excellent caching of Docker builds and abstractions that hide cloud complexity. Rosenthal mentions Modal and Bowplan as companies doing this well, and describes a CLI tool at Square that packaged code into Docker containers and shipped them to cloud GPUs (though caching was suboptimal).

He also advocates replacing YAML with Python code using Pydantic models for configuration. This gives type hints, validation, and the full expressiveness of Python rather than forcing engineers to build custom YAML parsers.

## Team Structure and Culture

Runway uses the title "member of technical staff" for all technical roles, reflecting a philosophy of fuzzy team boundaries. Rosenthal sits on the "ML Acceleration" team, positioned between backend engineering and research. Their focus is speeding up research: faster experimentation, better training scaling, and more efficient GPU utilization for inference.

The team doesn't have formal quarterly KPIs—Rosenthal notes that as a startup with fast-changing priorities, rigid goals don't make sense. The general orientation is toward maximizing researcher velocity and optimizing expensive GPU resources ("gpus are very expensive... you want to use them as much as possible").

## Key Takeaways

The multimodal feature store represents a rethinking of ML infrastructure for the generative AI era. Unlike traditional feature stores optimized for low-latency serving, these systems prioritize:

- Storage and retrieval of diverse, large data types (video, images, embeddings)
- Semantic search via vector databases
- Pre-computation and caching of expensive derived features
- Efficient streaming for distributed training workloads
- Enabling researchers to experiment with different feature combinations

The organizational insights are equally valuable: shared codebases between research and production, Python-first configuration, Docker-based abstractions that hide cloud complexity, and team structures that blur boundaries between researchers and engineers. Rosenthal's framing of "researcher enablement" rather than just "ML engineering" reflects a mature understanding of how to scale AI development organizations.