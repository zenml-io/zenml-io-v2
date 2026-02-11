---
title: "Building a Production RAG-Based Slackbot for Developer Support"
slug: "building-a-production-rag-based-slackbot-for-developer-support"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "674f1f455699e281171c2ff9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:47:20.014Z"
  createdOn: "2024-12-03T15:09:57.573Z"
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "docker"
  - "cicd"
  - "fastapi"
  - "redis"
  - "elasticsearch"
  - "openai"
  - "google-gcp"
industryTags: "tech"
company: "Vespa"
summary: "Vespa developed an intelligent Slackbot to handle increasing support queries in their community Slack channel. The solution combines RAG (Retrieval-Augmented Generation) with Vespa's search capabilities and OpenAI, leveraging both past conversations and documentation. The bot features user consent management, feedback mechanisms, and automated user anonymization, while continuously learning from new interactions to improve response quality."
link: "https://blog.vespa.ai/a-new-bot/"
year: 2024
seo:
  title: "Vespa: Building a Production RAG-Based Slackbot for Developer Support - ZenML LLMOps Database"
  description: "Vespa developed an intelligent Slackbot to handle increasing support queries in their community Slack channel. The solution combines RAG (Retrieval-Augmented Generation) with Vespa's search capabilities and OpenAI, leveraging both past conversations and documentation. The bot features user consent management, feedback mechanisms, and automated user anonymization, while continuously learning from new interactions to improve response quality."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-rag-based-slackbot-for-developer-support"
  ogTitle: "Vespa: Building a Production RAG-Based Slackbot for Developer Support - ZenML LLMOps Database"
  ogDescription: "Vespa developed an intelligent Slackbot to handle increasing support queries in their community Slack channel. The solution combines RAG (Retrieval-Augmented Generation) with Vespa's search capabilities and OpenAI, leveraging both past conversations and documentation. The bot features user consent management, feedback mechanisms, and automated user anonymization, while continuously learning from new interactions to improve response quality."
---

## Overview

This case study documents a summer internship project at Vespa.ai where two NTNU students built an intelligent Slackbot to handle the growing volume of community questions. The project represents a practical implementation of Retrieval-Augmented Generation (RAG) in a production setting, combining Vespa's search infrastructure with OpenAI's language models to create a self-improving community support tool.

The context for this project stems from Vespa.ai's significant growth in late 2023, when Docker pulls of the vespaengine/vespa image surged from 2 million to 11 million in just a few months. This growth led to a corresponding increase in questions on their community Slack channel, creating an opportunity to leverage the accumulated knowledge in past conversations as a foundation for automated responses.

## Technical Architecture

The solution architecture centers on a Slackbot built in Kotlin using the Slack SDK for Java, integrated with a Vespa application for document storage and retrieval, and OpenAI for generating natural language summaries from retrieved context.

### Slackbot Implementation

The Slackbot operates on two primary event handlers. The `AppMentionEvent` handler triggers when users invoke the bot with `@Vespa Bot &lt;question>`, initiating the RAG pipeline to generate answers. The `MessageEvent` handler captures all messages (with user consent) for indexing into the Vespa application, enabling the system to continuously expand its knowledge base.

The bot can run in two modes: Socket Mode for development (where the bot connects to Slack's API) and HTTP Server mode for production deployment (requiring a public IP endpoint). The implementation includes slash commands for help functionality and reaction handling for gathering user feedback through 👍 and 👎 emoji responses.

### Vespa Schema and Document Model

The Vespa application schema defines a `slack_message` document type with fields for `message_id`, `thread_id`, and `text`. The design captures the hierarchical nature of Slack conversations, where messages belong to threads, enabling grouped retrieval of contextually related messages.

A key feature is the synthesized `text_embedding` field, a 384-dimensional float tensor that Vespa automatically generates using an embedded model when documents are inserted or updated. This embedding enables semantic similarity search alongside traditional keyword-based retrieval. The schema uses angular distance metric for vector comparison, which is appropriate for normalized embeddings.

### Hybrid Ranking Strategy

The ranking approach combines semantic search with classical information retrieval, implementing what the team calls a "hybrid2" rank profile. The first-phase ranking expression weights semantic similarity at 70% and scaled BM25 at 30%, reflecting a preference for conceptual similarity while still leveraging exact term matching.

The semantic component uses cosine distance between the query embedding and document embeddings. The BM25 component is normalized through an arctangent-based scaling function that maps the unbounded BM25 scores to a -1 to 1 range, making the two signals comparable. This normalization is crucial for combining different ranking signals effectively.

An additional ranking factor incorporates the ratio of positive to negative reactions (👍 vs 👎), providing a form of implicit human feedback that biases the system toward historically helpful responses. This represents a lightweight form of reinforcement learning from human feedback (RLHF) without requiring explicit training.

### Integration with Existing Documentation Search

Rather than creating a standalone application, the Slackbot extends Vespa's existing Documentation Search backend (search.vespa.ai), which already provides RAG capabilities over documentation, sample apps, and blog posts. This integration allows the bot to potentially draw on both conversational history and official documentation when answering questions.

The existing system breaks down all documentation into paragraphs, retrieves relevant ones based on queries, and sends them to OpenAI for summarization. The Slack message corpus adds another layer of practical, user-generated knowledge to this foundation.

## LLMOps Considerations

### Data Privacy and Consent

The implementation includes several user-centric privacy controls required for production deployment. Users must explicitly consent to having their questions sent to OpenAI, acknowledging the third-party data sharing involved in LLM inference. Additionally, users can opt into having their messages indexed to improve the bot's capabilities. User anonymization is implemented to protect privacy in the stored conversation data.

### Continuous Learning Architecture

The system is designed to improve over time through continuous indexing of new messages. As users interact with the Slack channel, their messages (with consent) are fed into Vespa, expanding the knowledge base. This represents a form of continuous data collection that enhances retrieval quality without requiring model retraining.

The feedback mechanism through emoji reactions provides a signal for ranking adjustments, though the blog does not detail whether this feedback is used for more sophisticated model improvement beyond the ranking modifications.

### Infrastructure and Deployment

The deployment utilizes Google Cloud Platform (GCP) with Terraform for infrastructure as code (IaC). The team used SpaceLift for managing Terraform state and simplifying the deployment process. This reflects standard DevOps practices for LLM application deployment, ensuring reproducible infrastructure and manageable state across environments.

The transition from Socket Mode (development) to HTTP Server mode (production) represents a common pattern in bot development, where local development uses simpler connection methods while production requires proper endpoint exposure and availability.

## Limitations and Considerations

It's worth noting that this case study is primarily a learning narrative from summer interns, so the depth of production hardening and long-term operational insights is limited. The blog focuses more on the development journey than on production metrics, monitoring strategies, or lessons learned from actual usage.

The hybrid ranking weights (70% semantic, 30% BM25) appear to be chosen somewhat arbitrarily, and the blog does not discuss how these were tuned or evaluated. Similarly, the 384-dimensional embedding model choice is not justified beyond following Vespa's documentation patterns.

The consent and anonymization mechanisms are mentioned but not detailed, leaving questions about implementation specifics and compliance considerations for handling user data in a production LLM pipeline.

## Technical Stack Summary

The complete technical stack includes:
- **Language/Framework**: Kotlin with Gradle, using Slack SDK for Java
- **Search/Retrieval**: Vespa with custom schemas and hybrid ranking
- **Embeddings**: 384-dimensional vectors generated by Vespa's embedding component
- **LLM Integration**: OpenAI for response generation/summarization
- **Infrastructure**: GCP with Terraform for IaC
- **CI/CD**: SpaceLift for Terraform state management
- **Deployment Modes**: Socket Mode (development), HTTP Server (production)

This project demonstrates a practical approach to building RAG-powered applications with production considerations including user consent, feedback collection, and cloud deployment, representing valuable LLMOps patterns for community support automation.