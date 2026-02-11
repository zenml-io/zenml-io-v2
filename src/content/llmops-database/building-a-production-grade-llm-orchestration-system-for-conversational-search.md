---
title: "Building a Production-Grade LLM Orchestration System for Conversational Search"
slug: "building-a-production-grade-llm-orchestration-system-for-conversational-search"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed490aed4e78243923e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:39:44.447Z"
  createdOn: "2024-11-21T14:08:20.908Z"
llmopsTags:
  - "anthropic"
  - "databricks"
  - "fine-tuning"
  - "latency-optimization"
  - "meta"
  - "microservices"
  - "monitoring"
  - "multi-modality"
  - "openai"
  - "orchestration"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "system-prompts"
  - "translation"
industryTags: "tech"
company: "Perplexity"
summary: "Perplexity has built a conversational search engine that combines LLMs with various tools and knowledge sources. They tackled key challenges in LLM orchestration including latency optimization, hallucination prevention, and reliable tool integration. Through careful engineering and prompt management, they reduced query latency from 6-7 seconds to near-instant responses while maintaining high quality results. The system uses multiple specialized LLMs working together with search indices, tools like Wolfram Alpha, and custom embeddings to deliver personalized, accurate responses at scale."
link: "https://www.youtube.com/watch?v=HzGiVzYbf2I"
year: 2023
seo:
  title: "Perplexity: Building a Production-Grade LLM Orchestration System for Conversational Search - ZenML LLMOps Database"
  description: "Perplexity has built a conversational search engine that combines LLMs with various tools and knowledge sources. They tackled key challenges in LLM orchestration including latency optimization, hallucination prevention, and reliable tool integration. Through careful engineering and prompt management, they reduced query latency from 6-7 seconds to near-instant responses while maintaining high quality results. The system uses multiple specialized LLMs working together with search indices, tools like Wolfram Alpha, and custom embeddings to deliver personalized, accurate responses at scale."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-grade-llm-orchestration-system-for-conversational-search"
  ogTitle: "Perplexity: Building a Production-Grade LLM Orchestration System for Conversational Search - ZenML LLMOps Database"
  ogDescription: "Perplexity has built a conversational search engine that combines LLMs with various tools and knowledge sources. They tackled key challenges in LLM orchestration including latency optimization, hallucination prevention, and reliable tool integration. Through careful engineering and prompt management, they reduced query latency from 6-7 seconds to near-instant responses while maintaining high quality results. The system uses multiple specialized LLMs working together with search indices, tools like Wolfram Alpha, and custom embeddings to deliver personalized, accurate responses at scale."
---

## Overview

Perplexity AI is a conversational search engine founded by Arvin Srinivas (CEO), Dennis Yarats (formerly Meta, Cora, Bing, NYU), Johnny Ho (former world #1 programmer), and Andy Konwinski (DataBricks co-founder, UC Berkeley). The company's mission is to be "the world's most knowledge-centered company," providing users with instant, accurate answers to any question through a combination of LLMs, search indexes, and various tools. This case study, presented by the CEO at a conference, offers valuable insights into how Perplexity approaches LLMOps challenges in building a production-grade AI search product.

The core product is described as the "most functional and well-executed version of retrieval-augmented generation (RAG)," combining LLMs with live search indexes to provide up-to-date, conversational answers with citations. This addresses the fundamental limitation of LLMs having knowledge cutoffs while retaining their reasoning and natural language capabilities.

## Technical Architecture and LLM Orchestration

One of the most significant LLMOps insights from this case study is the concept of "orchestration" - managing multiple LLMs and tools together to achieve results impossible with any single component. The CEO uses the analogy of "playing an orchestra" to describe this approach, referencing the Steve Jobs metaphor about orchestrating components rather than writing every line of code.

The Perplexity system employs multiple specialized LLMs working in concert:

- A query classification LLM that determines the type of query being asked
- A query reformulation LLM that expands a single user query into multiple sub-queries to improve search recall
- A summarization LLM that synthesizes information from multiple sources
- A follow-up question generation LLM that suggests relevant next questions for users
- The main conversational LLM that provides the final answer

This multi-LLM architecture is a sophisticated approach to production AI systems, where different models are optimized for different tasks rather than relying on a single general-purpose model for everything.

## Tool Integration

Perplexity heavily emphasizes "tool use" as a core architectural principle. The CEO cites Oriol Vinyals (VP of Research at DeepMind) saying that "the end game is not to predict the next word at a time" but rather to connect LLMs with tools like search engines, Python interpreters, and specialized knowledge systems.

Key tool integrations mentioned include:

- Search indexes (Elasticsearch and vector databases)
- Wolfram Alpha for mathematical and scientific queries, enabling better math learning experiences
- Rendering libraries for LaTeX, images, and other visual content
- Database plugins for structured data access

The CEO notes that Google's Bard improvements (30% better on word and math problems) came from adding an "implicit code interpreter on the back end," validating the importance of tool integration for production LLM systems.

## Infrastructure and Technology Stack

Perplexity's technology stack includes:

- **Backend infrastructure**: Kubernetes for orchestration
- **Frontend**: React, Next.js
- **Mobile**: Swift UI for iOS, native Android
- **Vector database**: Quadrant (they mention not using Pinecone or Weaviate yet)
- **Search**: Elasticsearch
- **Embeddings**: Custom-trained embeddings rather than OpenAI's, as they found they don't need OpenAI's market lead on embeddings
- **LLM providers**: OpenAI (GPT-3.5 Turbo, GPT-4) and Anthropic (Claude, Claude Instant)

A critical architectural decision was to avoid high-level tooling libraries like LangChain or Dust. The CEO strongly recommends building end-to-end engineering in-house, stating: "There's just so many latency optimizations you'll miss out on if you rely on these tooling libraries." This philosophy of controlling all parts of the stack themselves has been key to their performance achievements.

## Latency Optimization

Latency was a major challenge that the team solved through rigorous engineering. Initially, queries took 5-7 seconds - so slow that an investor jokingly suggested they call it "submit a job" rather than "submit a query." Through end-to-end optimization, they reduced this dramatically, with users now frequently commenting on how fast the system is.

The specific optimizations aren't detailed, but the emphasis on avoiding abstraction layers and controlling the full stack suggests they achieved gains through:

- Parallel execution of independent operations
- Careful management of embedding dimensions in vector databases
- Efficient orchestration of multiple LLM calls
- Custom infrastructure tuning

## Handling Hallucinations and Quality Assurance

The CEO acknowledges that when "chaining things together" with multiple tools, there are many ways things can fail - "if just one part has to go wrong and everything breaks." Their approach to quality includes:

- **Rigorous evaluation frameworks**: They mention having a 14-year-old intern who set up AI evals for the team
- **Benchmarking**: Running evaluations whenever prompts or search indexes change
- **Prompt version control**: Maintaining discipline around prompt management
- **Prompt migrations**: Careful processes when switching between models
- **Dog-fooding**: The team uses their own product extensively, with the CEO stating he no longer uses Google
- **Learning from user feedback**: Anecdotal complaints teach them how to fix issues that end up improving many things

The CEO candidly admits their approach includes "tested in production and see how it goes," acknowledging the practical reality of production AI systems while maintaining quality through the evaluation frameworks mentioned.

## Model Selection Strategy

For choosing foundation models, the CEO offers practical guidance based on their evaluations:

- **GPT-4**: Best for reasoning and logic tasks
- **GPT-3.5 Turbo**: Good for most summarization and language pre-processing tasks
- **Claude Instant**: Comparable to GPT-3.5 but not as strong on coding
- **Smaller models (MPT)**: Used with fine-tuning for specific tasks
- **Falcon and other open models**: Being tested but not yet matching proprietary model capabilities and speed

The recommendation is pragmatic: stick with OpenAI and Anthropic models for now rather than "trying to be adventurous" with less proven alternatives.

## Personalization Through "Prompt Engineering"

Perplexity introduced an innovative approach to personalization they call "AI Profiles," which Amjad Masad (founder of Replit) calls "presentation layer prompting." Instead of Web 2.0 style topic selection, users write natural language descriptions of themselves, their interests, and preferences. This information is "pre-loaded as a prompt" for all interactions.

Examples from their Discord community show practical uses: users setting language preferences (e.g., ensuring Dutch queries return Dutch responses) or specifying technical backgrounds to get appropriately detailed answers. The CEO frames this as users becoming "programmers in natural language," writing code that controls how the AI serves them.

This approach to personalization represents a shift in how AI systems can be customized without requiring per-query prompt engineering from users.

## The "Not Just a Wrapper" Argument

The CEO addresses the common criticism that products like Perplexity are "LLM wrappers." While acknowledging heavy reliance on OpenAI models, he argues that building such a product involves substantial engineering beyond model access:

- Query classification and reformulation systems
- Multi-query search expansion for higher recall
- Follow-up question generation
- Result summarization and synthesis
- Tool integration and orchestration
- Latency optimization
- Scale reliability for "tens of hundreds of thousands of users every minute"

The orchestration work - making all these components work together seamlessly and reliably - is where much of the engineering value lies.

## Team Philosophy and Scaling

Perplexity operates with a notably small team, which the CEO presents as intentional: "You can do a lot with less. In fact, you can probably only do a lot with less." He expresses concern that scaling to 50 people would make them slower.

This philosophy aligns with their technical approach of building custom solutions rather than using abstraction layers - a small team can maintain deep understanding of the entire system when they control all parts of the stack.

## Production Considerations

Several production-focused insights emerge from the discussion:

- **Citation transparency**: Truth is a "first party characteristic" with citations provided for all answers, addressing trust and verification needs
- **Multi-platform deployment**: iOS app, Android app, Chrome extension, and web interface
- **Subscription model**: Pro tier offering more co-pilot uses and GPT-4 access per day
- **Continuous shipping**: Regular feature releases to pro subscribers

The emphasis on reliability at scale, combined with the evaluation frameworks and dog-fooding culture, suggests a mature approach to production AI operations despite the company's relatively young age.