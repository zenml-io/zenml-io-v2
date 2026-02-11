---
title: "Building Deep Research: A Production AI Research Assistant Agent"
slug: "building-deep-research-a-production-ai-research-assistant-agent"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67b5fc7718f2b415cb32b8f3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:00:46.826Z"
  createdOn: "2025-02-19T15:44:55.531Z"
llmopsTags:
  - "question-answering"
  - "document-processing"
  - "unstructured-data"
  - "realtime-application"
  - "rag"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "system-prompts"
  - "fastapi"
  - "langchain"
  - "monitoring"
  - "orchestration"
  - "google-gcp"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "Google Deepmind"
summary: "Google Deepmind developed Deep Research, a feature that acts as an AI research assistant using Gemini to help users learn about any topic in depth. The system takes a query, browses the web for about 5 minutes, and outputs a comprehensive research report that users can review and ask follow-up questions about. The system uses iterative planning, transparent research processes, and a sophisticated orchestration backend to manage long-running autonomous research tasks."
link: "https://www.youtube.com/watch?v=3HWOzuHp7VI"
year: 2024
seo:
  title: "Google Deepmind: Building Deep Research: A Production AI Research Assistant Agent - ZenML LLMOps Database"
  description: "Google Deepmind developed Deep Research, a feature that acts as an AI research assistant using Gemini to help users learn about any topic in depth. The system takes a query, browses the web for about 5 minutes, and outputs a comprehensive research report that users can review and ask follow-up questions about. The system uses iterative planning, transparent research processes, and a sophisticated orchestration backend to manage long-running autonomous research tasks."
  canonical: "https://www.zenml.io/llmops-database/building-deep-research-a-production-ai-research-assistant-agent"
  ogTitle: "Google Deepmind: Building Deep Research: A Production AI Research Assistant Agent - ZenML LLMOps Database"
  ogDescription: "Google Deepmind developed Deep Research, a feature that acts as an AI research assistant using Gemini to help users learn about any topic in depth. The system takes a query, browses the web for about 5 minutes, and outputs a comprehensive research report that users can review and ask follow-up questions about. The system uses iterative planning, transparent research processes, and a sophisticated orchestration backend to manage long-running autonomous research tasks."
---

## Overview

Google DeepMind's Deep Research is one of the first production agentic systems that autonomously conducts multi-minute web research on behalf of users. The product, built on Gemini 1.5 Pro with specialized post-training, represents a significant departure from traditional synchronous AI interactions. This case study comes from a podcast conversation with the PM and Tech Lead of the Deep Research team, providing rare insight into the engineering decisions, evaluation strategies, and operational challenges of deploying a long-running AI agent at scale.

Deep Research addresses a common user pain point: queries that have multiple facets and traditionally require opening 50-60 browser tabs over a weekend of research. Rather than returning instant answers, the system takes approximately 5 minutes to browse the web, synthesize information from multiple sources, and produce a comprehensive research report with citations.

## Technical Architecture and Agentic Design

### Research Planning and User Steering

One of the key architectural decisions was implementing an "editable Chain of Thought" approach. Before the agent begins its work, it produces a research plan that the user can review and modify. This serves multiple purposes: it provides transparency about what the agent will do, gives users an opportunity to steer the research direction, and helps users understand topics they might not know enough about to specify precisely.

The team deliberately chose to present a proposed plan rather than asking users direct follow-up questions. This design decision stemmed from the observation that users often don't know what questions to ask. By presenting what the agent would do by default, users gain insight into the topic's facets while having the opportunity to refine the approach.

In practice, the team found that most users simply hit "start" without editing the plan—similar to Google's "I'm Feeling Lucky" button. However, the transparency mechanism still provides value by helping users understand why they receive the report they get.

### Iterative Planning and Tool Use

The agent primarily uses two tools: search and deep browsing within specific web pages. The execution follows a sophisticated pattern:

- The model first determines which substeps from the research plan can be parallelized
- Initial exploration tends to be breadth-first, covering all different aspects in the research plan
- As information is gathered, the agent reads outputs from previous steps and grounds its next decisions on that information
- For example, if one search reveals that the EU Commission banned certain additives, the agent might then specifically check whether the FDA has similar restrictions

This iterative planning capability was one of the hardest technical challenges. The team emphasized doing this in a generalizable way without requiring domain-specific training for each type of query or use case. They achieved this through careful post-training that balanced learning new behaviors without losing pre-training knowledge—essentially avoiding overfitting.

### HTML Processing and Context Management

The system processes web content through both raw HTML and markdown transformation. While newer generation models are increasingly capable of native HTML understanding, markdown conversion helps reduce noise from JavaScript, CSS, and extraneous markup. The decision of which representation to use depends on the specific content and access method—for embedded snippets that are inherently HTML, the system preserves that format.

Currently, the system does not use vision capabilities despite models improving significantly at visual question answering. The tradeoff between added latency from rendering and the value gained doesn't favor vision for most queries—the cases where vision would help represent a small portion of the tail distribution.

### Long Context and RAG Hybrid Approach

Deep Research leverages Gemini's million-to-two-million token context window, keeping all browsed content in context across conversation turns. This enables fast follow-up responses when information has already been collected. However, the team also implements RAG as a fallback when context limits are exceeded.

The decision framework for context versus RAG involves several considerations:

- RAG using cosine distance/dot product similarity struggles with queries that have multiple different attributes
- Newer generation models maintain performance even as context grows, unlike earlier models that showed decline with longer contexts
- A practical rule of thumb: recent research tasks stay in context (for complex comparisons and follow-ups), while older content (10+ turns ago) can move to RAG since users are less likely to need complex reasoning across current and distant historical content

## Evaluation Challenges

The team described evaluation as one of their most significant challenges. The high entropy of the output space—comprehensive text reports that vary significantly based on queries—makes automated evaluation difficult.

### Automated Metrics

The team tracks distributional metrics across a development set:

- Time spent on planning
- Number of iterative steps during browsing
- Research plan length and number of steps
- Other behavioral statistics that can be automatically computed

When a new model version shows large distribution changes in these metrics, it serves as an early signal that something has changed (for better or worse).

### Human Evaluation

Despite the existence of auto-raters, the team relies heavily on human evaluation. They defined specific attributes they care about in collaboration with product leadership: comprehensiveness, completeness, and groundedness.

The PM noted candidly: "Sometimes you just have to have your PM review examples."

### Use Case Ontology

Rather than organizing evaluations around verticals like travel or shopping, the team developed an ontology based on underlying research behavior types:

- Broad but shallow queries (e.g., shopping, finding summer camps)—users want many options explored with TLDR summaries of each
- Specific and deep queries—users want thorough understanding of a focused topic
- Various midpoints on this spectrum
- Compound queries that combine multiple ontology types (e.g., wedding planning that requires researching venues, caterers, and planners)

This ontology-based approach to evaluation ensures coverage across different user needs without over-optimizing for any single vertical.

## Operational Infrastructure

### Asynchronous Execution Platform

Deep Research required building a new asynchronous execution platform—a significant departure from Google's typically synchronous chat interactions. Key capabilities include:

- Users can close their browser or computer and receive notifications when research completes
- The system maintains state across long-running jobs (5-10+ minutes)
- Retry logic handles failures without losing progress
- The platform is designed to be flexible enough for future jobs that might take hours or even days

The team didn't reveal a public name for this orchestration system, but noted it differs from traditional workflow engines like Apache Airflow or AWS Step Functions because those are designed for static execution graphs, while agentic systems require dynamic adaptation based on the agent's decisions.

### Latency Considerations

The team discovered a counterintuitive finding about latency: users actually value the time the agent spends working. This contradicts typical Google product metrics where improved latency correlates with higher satisfaction and retention.

Initially, the team was very concerned about the 5-minute execution time. They even built two versions—a "hardcore mode" taking 15 minutes and a shipped version taking 5 minutes—with a hard cap to prevent exceeding 10 minutes. However, users have responded positively to longer execution times, perceiving them as evidence of thorough work.

From an engineering perspective, the latency budget represents a tradeoff between exploration (being more complete) and verification (checking things the model might already know). The optimal balance likely varies by query type—some queries demand higher verification (e.g., historical financial data) while others allow more latitude.

## Post-Training and Model Specialization

Deep Research runs on a specialized version of Gemini 1.5 Pro that has undergone specific post-training. This explains why the feature couldn't simply toggle to using Gemini 2.0 Flash—the post-training work is model-specific.

The team noted they don't have special API access that external developers lack, but emphasized that significant effort goes into:

- Defining the research plan abstraction and presentation
- Post-training to ensure consistent, reliable execution of the planning and browsing behaviors
- Data augmentation techniques for efficient training
- Balancing new behavioral training against preserving pre-training knowledge

## Future Directions

The team discussed several areas for future development:

- **Personalization**: Reports should adapt based on user expertise level (high schooler vs. PhD)
- **Multimodal output**: Reports could include charts, maps, and interactive elements rather than just text
- **Private data integration**: Many valuable sources are behind authentication or within personal document collections
- **Interactive mid-execution steering**: Allowing users to chat with and redirect the agent while it's still researching, similar to how Devon handles long-running coding tasks
- **Thinking models integration**: Newer reasoning models unlock better analytical capabilities and inherent self-critique during action selection

The team expressed particular interest in thinking models not just for better reasoning, but for their potential to better balance internal knowledge use versus grounding in external sources—a key tension in research agents.

## Cross-Team Learning

The Deep Research team noted learning from the Notebook LM team, particularly their approach of picking a focused problem and doing it exceptionally well rather than trying to build a general platform. They share learnings about extracting optimal performance from Gemini models, especially for the "last mile" of product development where subtle model behaviors significantly impact user experience.

This case study illustrates how building production agentic systems requires innovations across multiple dimensions: novel UX patterns for transparency and steering, sophisticated orchestration for long-running async execution, careful evaluation strategies that go beyond benchmarks, and thoughtful engineering of the context management and tool use layer.