---
title: "From RAGs to riches - The LLMOps pipelines you didn’t know you needed "
slug: "from-rag-to-riches-the-llmops-pipelines-you-didnt-know-you-needed"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65fbf4e6ba06eefad1ed09ea"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-04-18T14:21:04.437Z"
  lastUpdated: "2024-04-18T14:19:44.761Z"
  createdOn: "2024-03-21T08:50:46.234Z"
author: "hamza-tahir"
category: "tutorials"
tags:
  - "llm"
  - "thought-leadership"
date: "2024-03-21T00:00:00.000Z"
readingTime: 8 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/dbf8d0cb/65fbf4b2d292e9741e3d0da4_LLMs-min.png"
seo:
  title: "From RAGs to riches - The LLMOps pipelines you didn’t know you needed - ZenML Blog"
  description: "Taking large language models (LLMs) into production is no small task. It's a complex process, often misunderstood, and something we’d like to delve into today."
  canonical: "https://www.zenml.io/blog/from-rag-to-riches-the-llmops-pipelines-you-didnt-know-you-needed"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/95efd684/65fbf4b2d292e9741e3d0da4_LLMs-min.png"
  ogTitle: "From RAGs to riches - The LLMOps pipelines you didn’t know you needed  - ZenML Blog"
  ogDescription: "Taking large language models (LLMs) into production is no small task. It's a complex process, often misunderstood, and something we’d like to delve into today."
---

Taking large language models (LLMs) into production is no small task. It's a complex process, often misunderstood, and something we’d like to delve into today.

A common misunderstanding is that the task of productionalizing LLMs is just about deploying an app like [Langchain](https://www.langchain.com/)/[LLamaindex](https://www.llamaindex.ai/)/[Haystack](https://haystack.deepset.ai/). This perspective skips over the crucial details - the bit-by-bit construction of the LLMOps machine.

The LLMOps jigsaw puzzle, much like MLOps, consists of varied pieces. Central to these is the creation of accurate, high-quality Retrieval-Augmented Generation (RAG) applications. To churn out reliable RAG applications consistently, your workflows need to be automated, observable, and repeatable.

To help you grasp what's required, let’s break down the setup of an LLMOps system into four essential steps. We can then focus on how a RAG application will evolve.

## Step 1: Basic RAG

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/330f1fb1/65fbf7034da4a51e732a79ae_01_basic-rag.png" alt="__wf_reserved_inherit" />
  <figcaption>Step 1: A basic RAG setup</figcaption>
</figure>

The first step is setting up a basic Retrieval Augmented Generation (RAG) architecture like so. We have the following puzzle pieces:

<ol><li><strong>Application:</strong> This is typically a deployed service that uses a chain orchestrator framework like Langchain or a similar proprietary codebase. It often appears as a chatbot or a similar tool.</li><li><strong>Embeddings Service:</strong> This service processes raw data and produces embeddings, which are essentially vectors that numerically represent our documents.</li><li><strong>Vector Database:</strong> This is a continuously updated database that stores our proprietary data, which is also embedded in the same space. This database is used to retrieve documents that closely match the query.</li><li>The <strong>LLM:</strong> The large language model that will be used as the central “intelligence” piece in all this. We’ll give it the query and the retrieved documents at runtime.</li></ol>

### Pipeline Spotlight: Indexing your data

The journey to establish an effective LLMOps system begins with setting up an indexing pipeline. The purpose of this pipeline is to load data from proprietary sources and index it in a vector database. Given the rapid changes your data can undergo, your application needs to stay updated with the most current information.

This pipeline needs to:

<ul><li>Run in an automated manner.</li><li>Track metadata of different collections ingested in the vector database.</li><li>Store configuration of variables and hyperparameters such as chunking and embedding parameters that will be important to iterate upon as this system develops.</li></ul>

## Step 2: RAG + Two-Stage Retrieval

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/231a1dd4/65fbf72130d8cd3e852e147f_02_rag-two-stage-retrieval.png" alt="__wf_reserved_inherit" />
  <figcaption>Step 2: RAG + Two-stage retrieval with a reranker model</figcaption>
</figure>

The next evolution of the system is to add [reranking](https://www.pinecone.io/learn/series/rag/rerankers/). A reranking model is a kind of model that produces a similarity score when provided with a pair of a query and documents. This score is utilized to reorganize the documents based on their relevance to our query. A reranker can also be a simple model such as a Random Forest. You can train a simple ML model on proprietary data to act as a reranker.

### Pipeline Spotlight: Training our reranker

While you can use off-the-shelf rerankers such as the one [Cohere offers](https://cohere.com/rerank), if you are concerned with data security and increased accuracy, you might want to create a training pipeline that regularly updates our reranker over time.

The pipeline needs to:

<ul><li>Train (finetune) the reranker model to make it more accurate (here is a <a href="https://github.com/FlagOpen/FlagEmbedding/tree/master/examples/reranker">good example</a>)</li><li>Evaluate the reranker with key metrics to understand if it is improving accuracy at all</li><li>Potentially adding a deployment mechanism that exposes the reranking service as an API.</li></ul>

The biggest drawback of adding a reranker is that it can be quite slow - we need to experiment with different methods to see what is an acceptable SLA for our RAG system.

## Step 3: Fine-Tuning Embeddings

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/20315e9e/65fbf72f31cf9a313651465f_03_finetune-embeddings-rag.png" alt="__wf_reserved_inherit" />
  <figcaption>Step 3: Adding finetuned embeddings to improve the accuracy of the RAG system</figcaption>
</figure>

[Fine-tuning embeddings](https://betterprogramming.pub/fine-tuning-your-embedding-model-to-maximize-relevance-retrieval-in-rag-pipeline-2ea3fa231149) is a strategic move between basic RAG and fine-tuning the LLM itself. Doing this delivers significant improvements in retrieval. Similar to training a reranker, you might fall into the trap

### Pipeline Spotlight: Finetuning embeddings

The process of fine-tuning embeddings is a bit more involved than standard training, as it may require the generation of synthetic data. A great starting point for fine-tuning is the [Sentence Transformers embeddings model by HuggingFace](https://www.sbert.net/).

The pipeline should:

<ul><li>Possibly generate and store a synthetic dataset (some people utilize proprietary language models for this)</li><li>Train (fine-tune) the embedding model to enhance its accuracy (here's a <a href="https://github.com/run-llama/finetune-embedding">good example</a>)</li><li>Assess the performance of our embedding service compared to standard alternatives such as <a href="https://platform.openai.com/docs/guides/embeddings">OpenAI text-embedding-3-large</a>.</li></ul>

## Step 4: LLM Fine-Tuning (or Pretraining)

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/f9f95279/65fbf73fa4571ab9e52bf457_04_llm-finetuning.png" alt="__wf_reserved_inherit" />
  <figcaption>Step 4: Finetuning an opensource LLM for particular use-cases where base foundational models don’t work</figcaption>
</figure>

The final step involves fine-tuning or pretraining the LLM itself. This is the most technically complex but can yield results specific to your domain or data. Databricks has a great visualization that showcases this in a slightly similar way:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/edcafc68/65fbf86152fd7a3bbd7a163c_databricks-mosaic-llm__1_.png" alt="__wf_reserved_inherit" />
  <figcaption>Source: Databricks Mosaic product page</figcaption>
</figure>

However, techniques like [QLoRA](https://neurips.cc/virtual/2023/oral/73855) (which can be executed on a single GPU) indicate a push towards ensuring that cutting-edge AI is not just the domain of those with access to vast computational resources. We’re going to be talking more about finetuning, but you can see some of the work going on behind the scenes in our [LLM finetuning example](https://github.com/zenml-io/zenml-projects/tree/main/llm-finetuning) and our [LoRA finetuning project](https://github.com/zenml-io/zenml-projects/tree/main/llm-lora-finetuning).

### Pipeline Spotlight: Finetuning a LLM

Finetuning a LLM may itself be decomposed into several pipelines like so:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/39c93086/65fbffd0c48e3bcdc6b30a18_finetuning_llms__1_.png" alt="__wf_reserved_inherit" />
  <figcaption>Pipelines needed to finetune LLMs by ZenML</figcaption>
</figure>

However, focusing solely on the training aspect, the pipeline should:

<ul><li>Run on infrastructure that supports large GPUs, which are currently scarce.</li><li>Be able to be warm-started, i.e., to recover from sporadic failures and resume training from a checkpoint.</li><li>Possess the capability to merge various adapters, especially if parameter-efficient techniques are adopted.</li></ul>

Here we are at the end of this stage, with a fully developed LLMOps system. However, this doesn't conclude our journey. There are additional components to LLMOps, such as evaluation and guardrails, that we have not addressed in this document. Notably, we need to instrument these pipelines and applications in a manner that allows for control in a production environment.

Stay tuned here, as we will delve deeper into more aspects of LLMOps in the upcoming weeks, focusing on areas that are rarely discussed!

If you’re anywhere on the gradient of Step 1 to Step 4 as described here, ZenML might be a good fit for you. ZenML is an open-source MLOps (read: LLMOps) framework that allows you to architect your LLM RAG systems in production by building portable ML pipelines. We’re going to be publishing a detailed guide with more information soon - so stay tuned! However, you can already get started building your first MLOps pipelines with [ZenML Cloud today](https://cloud.zenml.io).

