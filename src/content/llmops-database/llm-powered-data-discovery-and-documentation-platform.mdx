---
title: "LLM-Powered Data Discovery and Documentation Platform"
slug: "llm-powered-data-discovery-and-documentation-platform"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3dec27280fabc45bb155"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:37:18.006Z"
  createdOn: "2024-11-21T14:04:28.333Z"
llmopsTags:
  - "chatbot"
  - "data-analysis"
  - "data-integration"
  - "databases"
  - "document-processing"
  - "documentation"
  - "elasticsearch"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "system-prompts"
industryTags: "tech"
company: "Grab"
summary: "Grab faced challenges with data discovery across their 200,000+ tables in their data lake. They developed HubbleIQ, an LLM-powered chatbot integrated with their data discovery platform, to improve search capabilities and automate documentation generation. The solution included enhancing Elasticsearch, implementing GPT-4 for automated documentation generation, and creating a Slack-integrated chatbot. This resulted in documentation coverage increasing from 20% to 90% for frequently queried tables, with 73% of users reporting improved data discovery experience."
link: "https://engineering.grab.com/hubble-data-discovery"
year: 2024
seo:
  title: "Grab: LLM-Powered Data Discovery and Documentation Platform - ZenML LLMOps Database"
  description: "Grab faced challenges with data discovery across their 200,000+ tables in their data lake. They developed HubbleIQ, an LLM-powered chatbot integrated with their data discovery platform, to improve search capabilities and automate documentation generation. The solution included enhancing Elasticsearch, implementing GPT-4 for automated documentation generation, and creating a Slack-integrated chatbot. This resulted in documentation coverage increasing from 20% to 90% for frequently queried tables, with 73% of users reporting improved data discovery experience."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-data-discovery-and-documentation-platform"
  ogTitle: "Grab: LLM-Powered Data Discovery and Documentation Platform - ZenML LLMOps Database"
  ogDescription: "Grab faced challenges with data discovery across their 200,000+ tables in their data lake. They developed HubbleIQ, an LLM-powered chatbot integrated with their data discovery platform, to improve search capabilities and automate documentation generation. The solution included enhancing Elasticsearch, implementing GPT-4 for automated documentation generation, and creating a Slack-integrated chatbot. This resulted in documentation coverage increasing from 20% to 90% for frequently queried tables, with 73% of users reporting improved data discovery experience."
---

## Overview

Grab, the leading superapp platform in Southeast Asia, tackled a pervasive enterprise challenge: enabling efficient data discovery across a massive data lake containing over 200,000 tables, numerous Kafka streams, production databases, and ML features. Their internal data discovery tool, Hubble (built on the open-source DataHub platform), was primarily functioning as a reference tool rather than a true discovery platform. The team embarked on an LLM-powered transformation to reduce data discovery time from multiple days to seconds.

The case study demonstrates a thoughtful, phased approach to implementing LLM capabilities in production, starting with foundational improvements before deploying AI-powered features. This systematic methodology is particularly relevant for organizations looking to introduce LLM-based solutions into existing enterprise workflows.

## Problem Context and Business Drivers

The existing Elasticsearch-based search system had significant limitations. The monthly average click-through rate was only 82%, meaning 18% of user sessions ended without any dataset selection—a clear indicator that search results weren't meeting user needs. More critically, documentation coverage for the most frequently queried tables (P80 tables) stood at only 20%, making it difficult for users to understand datasets even when browsing the UI.

A user survey revealed that 51% of data consumers at Grab took multiple days to find required datasets. This inefficiency forced heavy reliance on tribal knowledge, with employees frequently turning to colleagues via Slack for data discovery assistance. The team categorized search queries into four types: exact search, partial search, inexact search, and semantic search. While vanilla Elasticsearch handled the first two categories well (accounting for 75% of searches), it struggled with inexact and semantic searches—the true "discovery" queries that required contextual understanding.

## Technical Architecture and Implementation

### Phase 1: Elasticsearch Optimization

Before introducing LLM capabilities, the team optimized their existing search infrastructure through careful analysis of user behavior and clickstream data. Key optimizations included:

- Tagging and boosting P80 (frequently queried) tables
- Boosting the most relevant schemas while deboosting deprecated tables
- Hiding irrelevant datasets like PowerBI dataset tables
- Adding relevant tags and boosting certified tables
- Simplifying the search UI to reduce clutter

These enhancements raised the click-through rate from 82% to 94%—a 12 percentage point improvement. This foundational work was crucial because it improved the baseline experience and freed the LLM solution to focus on the genuinely challenging semantic search cases that traditional search couldn't handle.

### Phase 2: LLM-Powered Documentation Generation

A key insight driving the project was that any LLM-based discovery system would require comprehensive, high-quality documentation to function effectively—analogous to how a new lead analyst joining the team would need extensive documentation to understand existing data assets. The team built a documentation generation engine using GPT-4 that creates documentation based on table schemas and sample data.

The prompt engineering process involved multiple iterations of feedback from data producers to refine the output quality. A "generate" button was added to the Hubble UI, enabling data producers to easily create documentation for their tables. For critical tables, the team proactively pre-populated documentation and notified data producers to review it. An "AI-generated" tag served as a transparency mechanism, visible to data consumers until a human producer reviewed and accepted or edited the content.

This approach resulted in documentation coverage for P80 tables increasing by 70 percentage points to approximately 90%. User feedback indicated that roughly 95% of users found the generated documentation useful, validating the quality of the GPT-4 outputs.

### Phase 3: HubbleIQ Chatbot Deployment

With the documentation foundation in place, the team built HubbleIQ, an LLM-based chatbot designed to serve as the equivalent of a Lead Data Analyst for data discovery. To accelerate time-to-market, they leveraged Glean, an enterprise search tool already in use at Grab, rather than building a custom RAG (Retrieval-Augmented Generation) system from scratch.

The integration involved three key steps:

- Connecting Hubble with Glean to make all documented data lake tables available on the Glean platform
- Using Glean Apps to create the HubbleIQ bot with a custom system prompt that could access all catalogued Hubble datasets
- Integrating the bot into Hubble search, displaying HubbleIQ results prominently for queries identified as likely semantic searches, followed by regular search results

The team also deployed HubbleIQ to Slack, meeting users where they naturally communicate. This integration allows data consumers to discover datasets without breaking their workflow. The roadmap includes adding the bot to analytics team "ask" channels, where it will serve as the first line of defense for answering contextual search queries before escalating to human experts.

## Production Considerations and Operational Practices

The case study reveals several mature LLMOps practices for production deployment:

**Transparency and Trust Mechanisms**: The use of "AI-generated" tags on documentation provides clear provenance information to users. This transparency approach acknowledges that LLM outputs require human verification while still delivering immediate value to data consumers.

**Human-in-the-Loop Workflows**: Rather than fully automating documentation, the system enables data producers to review, accept, or edit AI-generated content. This hybrid approach maintains data quality standards while dramatically reducing the documentation burden.

**Contextual Deployment Strategy**: Deploying HubbleIQ results only for queries identified as "likely semantic searches" shows thoughtful understanding of when LLM capabilities add value versus when traditional search suffices. This selective deployment prevents unnecessary API calls and ensures appropriate user expectations.

**Multi-Channel Distribution**: The progressive rollout across Hubble UI and Slack demonstrates consideration for user workflows and adoption patterns.

## Future Roadmap and Planned Improvements

The team outlined several sophisticated LLMOps enhancements planned for future iterations:

**Enhanced Documentation Generation**: Plans include enriching the generator with more context and enabling analysts to auto-update documentation based on Slack threads. This represents a move toward more automated documentation maintenance.

**Quality Evaluation with LLMs**: The team plans to develop an evaluator model using LLMs to assess documentation quality for both human and AI-written content. This meta-use of LLMs to evaluate LLM outputs is an emerging pattern in LLMOps.

**Agentic Workflows with Reflexion**: Perhaps most ambitiously, they plan to implement Reflexion, an agentic workflow that uses evaluator outputs to iteratively regenerate documentation until quality benchmarks are met or maximum retry limits are reached. This represents a move toward more autonomous AI systems with self-improvement capabilities.

**Conversational Follow-ups**: Future HubbleIQ enhancements will enable users to ask follow-up questions directly on the Hubble UI, with the system intelligently pulling additional metadata when users mention specific datasets—moving toward a more conversational discovery experience.

## Results and Impact Assessment

The measured outcomes provide concrete evidence of success:

- Documentation coverage for P80 tables increased from 20% to approximately 90%
- Search click-through rate improved from 82% to 94%
- Follow-up survey showed 73% of respondents found it easy to discover datasets, a 17 percentage point increase
- Hubble reached all-time high monthly active users

It's worth noting that these improvements resulted from the combined effect of Elasticsearch optimization, documentation generation, and HubbleIQ deployment—attributing specific impact to individual components is challenging. The case study also acknowledges that full vision achievement remains in progress, with ongoing reliance on data producers not yet completely eliminated.

## Critical Assessment

The case study presents a well-structured, pragmatic approach to LLM deployment in enterprise settings. The decision to leverage existing tools like Glean rather than building custom infrastructure shows practical judgment about build-versus-buy tradeoffs. The phased approach—improving foundations before adding LLM capabilities—reflects mature engineering thinking.

However, the case study lacks some details that would be valuable for LLMOps practitioners: specific latency metrics for LLM-powered queries, cost considerations for GPT-4 usage at scale, error handling strategies, and monitoring/observability approaches for the LLM components. The evaluation of documentation quality relies primarily on user feedback percentages rather than more rigorous assessment methods, though the planned evaluator model suggests awareness of this gap.

Overall, this case study illustrates how LLMs can be strategically deployed to solve genuine enterprise pain points when integrated thoughtfully with existing systems and processes.