---
title: "ZenML Support Agent"
slug: "zenml-support-agent"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67e0ee8eaf15c25c4ca3f2ab"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T08:34:18.968Z"
  lastUpdated: "2025-08-26T08:34:06.759Z"
  createdOn: "2025-03-24T05:33:02.199Z"
description: "A production-ready agent that can help you with your ZenML questions."
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/zenml-support-agent"
mainImageLink: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/8.jpg"
previewImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f37c859f/67e242f59689b76ff161aaad_image.jpeg"
tags:
  - "natural-language-processing"
  - "llm-agents"
  - "conversational-ai"
  - "rag"
  - "vector-stores"
  - "production-mlops"
tools:
  - "zenml"
  - "langchain"
  - "llama-index"
  - "faiss"
  - "openai"
createdAt: "2025-03-24T11:03:00.932Z"
updatedAt: "2025-08-26T08:34:00.179Z"
projectId: "zenml-support-agent"
seo:
  title: "ZenML Support Agent"
  description: "A production-ready agent that can help you with your ZenML questions."
  canonical: "https://www.zenml.io/projects/zenml-support-agent"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f37c859f/67e242f59689b76ff161aaad_image.jpeg"
  ogTitle: "ZenML Support Agent"
  ogDescription: "A production-ready agent that can help you with your ZenML questions."
---

#### Agent Creation Pipeline

Pipeline that handles data ingestion, vector store construction, and agent creation.#### Stack Components

<ul><li><strong>Orchestrator:</strong> local</li><li><strong>Artifact Store:</strong> local</li><li><strong>Step Operator:</strong> local</li></ul>The ZenML Support Agent is an intelligent assistant that provides instant, accurate answers to ZenML-related questions through a production-ready RAG architecture.

### What It Does

This agent serves as a knowledge base companion that understands natural language questions about ZenML, its features, and best practices. It saves users time by quickly retrieving relevant information from across multiple knowledge sources and providing context-aware responses that consider the broader ZenML ecosystem.

### How It Works

<ul>
<li>Ingests data from ZenML documentation, example READMEs, and release notes</li>
<li>Processes content using a custom scraper for maximum flexibility</li>
<li>Creates vector embeddings using FAISS for efficient similarity search</li>
<li>Splits documents into manageable chunks for precise retrieval</li>
<li>Leverages LangChain's ConversationalChatAgent with customized prompts</li>
<li>Integrates with ZenML Pro for version management and model promotion</li>
<li>Updates automatically as ZenML documentation evolves</li>
</ul>