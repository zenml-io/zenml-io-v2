---
title: "Enterprise LLM Implementation Panel: Lessons from Box, Glean, Tyace, Security AI and Citibank"
slug: "enterprise-llm-implementation-panel-lessons-from-box-glean-tyace-security-ai-and-citibank"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f405cb13e06b4b1ee8c3d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:43:01.026Z"
  createdOn: "2024-11-21T14:14:52.709Z"
llmopsTags:
  - "compliance"
  - "cost-optimization"
  - "databases"
  - "devops"
  - "document-processing"
  - "error-handling"
  - "fallback-strategies"
  - "fine-tuning"
  - "guardrails"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "latency-optimization"
  - "microsoft-azure"
  - "model-optimization"
  - "monitoring"
  - "openai"
  - "orchestration"
  - "poc"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "semantic-search"
  - "structured-output"
  - "unstructured-data"
industryTags: "tech"
company: "Various"
summary: "A panel discussion featuring leaders from multiple enterprises sharing their experiences implementing LLMs in production. The discussion covers key challenges including data privacy, security, cost management, and enterprise integration. Speakers from Box discuss content management challenges, Glean covers enterprise search implementations, Tyace shares content generation experiences, Security AI addresses data safety, and Citibank provides CIO perspective on enterprise-wide AI deployment. The panel emphasizes the importance of proper data governance, security controls, and the need for systematic approach to move from POCs to production."
link: "https://www.youtube.com/watch?v=HxAsJ0qqxJU"
year: 2023
seo:
  title: "Various: Enterprise LLM Implementation Panel: Lessons from Box, Glean, Tyace, Security AI and Citibank - ZenML LLMOps Database"
  description: "A panel discussion featuring leaders from multiple enterprises sharing their experiences implementing LLMs in production. The discussion covers key challenges including data privacy, security, cost management, and enterprise integration. Speakers from Box discuss content management challenges, Glean covers enterprise search implementations, Tyace shares content generation experiences, Security AI addresses data safety, and Citibank provides CIO perspective on enterprise-wide AI deployment. The panel emphasizes the importance of proper data governance, security controls, and the need for systematic approach to move from POCs to production."
  canonical: "https://www.zenml.io/llmops-database/enterprise-llm-implementation-panel-lessons-from-box-glean-tyace-security-ai-and-citibank"
  ogTitle: "Various: Enterprise LLM Implementation Panel: Lessons from Box, Glean, Tyace, Security AI and Citibank - ZenML LLMOps Database"
  ogDescription: "A panel discussion featuring leaders from multiple enterprises sharing their experiences implementing LLMs in production. The discussion covers key challenges including data privacy, security, cost management, and enterprise integration. Speakers from Box discuss content management challenges, Glean covers enterprise search implementations, Tyace shares content generation experiences, Security AI addresses data safety, and Citibank provides CIO perspective on enterprise-wide AI deployment. The panel emphasizes the importance of proper data governance, security controls, and the need for systematic approach to move from POCs to production."
---

## Overview

This case study captures insights from a Google Cloud conference panel discussion featuring executives from multiple companies—Box, Glean, Typeface, Security AI, and Citibank—sharing their experiences implementing generative AI applications in enterprise production environments. The panel, moderated by Ali Arsen Johny from Google Cloud's AIML Partner Engineering team, offers a rare multi-perspective view of the challenges and solutions in moving LLM applications from proof-of-concept to production scale.

The session reveals an interesting industry snapshot: when the audience was polled, approximately 90% had conducted POCs with generative AI, but only about 20% had moved applications into production. This gap between experimentation and deployment forms the central theme of the discussion, with each panelist addressing specific challenges their organizations face in bridging this divide.

## Common Application Areas and Maturity Model

The panel identifies several common application areas for generative AI in enterprises: chatbots and virtual agents, content generation, code generation and assistance, explanation and data augmentation, and search and information retrieval. The moderator presents a maturity model for enterprise AI adoption that progresses through several stages:

- **Level 0**: Data hygiene and quality (foundation)
- **Level 1**: Prompting and serving models, prompt engineering
- **Level 2**: Retrieval Augmented Generation (RAG)
- **Level 3**: Fine-tuning for domain-specific areas (retail, financial services, healthcare)
- **Level 4**: Grounding with search APIs (external Google search or enterprise search)
- **Level 5**: Orchestration of LLMs and agents, multi-agent systems
- **Level 6**: Full LLMOps pipelines with monitoring and model management

This framework provides useful context for understanding where different organizations are in their AI journey and what capabilities they need to develop.

## Box: Enterprise Content Management and AI Security

Ben Kus, CTO of Box, represents the perspective of an enterprise content management platform serving over 100,000 customers. Box specializes in unstructured content—contracts, presentations, sales materials—and sees tremendous opportunity in applying LLMs directly to this content type.

Box identifies three key challenges they've observed:

**Enterprise Security Concerns**: Many enterprises are fundamentally scared of AI, particularly regarding access control. Kus raises the critical question of what happens when an AI model has access to sensitive data (employee PII, M&A deals, financial results) and a user without proper permissions asks a question. Box's solution involves ensuring AI always respects enterprise-grade security and permissions, with model isolation to prevent unauthorized data leakage.

**User Uncertainty**: Even after several years of AI development, many enterprise customers don't know what to do with AI capabilities. Kus shares an anecdote about a Fortune 100 CIO who responded to the standard "what do you want to solve with AI?" question with complete uncertainty. The solution is to lower barriers to getting started—making it as simple as clicking a button to ask questions of a document, allowing users to discover capabilities through experimentation.

**Cost Management**: AI inference is characterized as "probably the most expensive thing that you can do" in computing. Box's philosophy is to incorporate AI into products in ways that make it easy for customers to get started without cost being a barrier to adoption.

In terms of success stories, Box observes that users with complex tasks benefit most from AI—lawyers, financial researchers, and anyone who must analyze long and complex documents. The AI helps with understanding content, answering questions, finding information, and synthesizing data.

## Glean: Permissions-Aware RAG for Enterprise Search

Arvin Jan, founder and CEO of Glean, presents a deep dive into building an AI-powered work assistant that connects with all company information and knowledge. Glean's platform enables employees to find answers using conversational interfaces, connecting to hundreds of enterprise applications including Box, Google Drive, Jira, Confluence, and GitHub.

Glean addresses three major LLMOps challenges:

**Enterprise Data Access**: Models are trained on public information but lack access to enterprise knowledge. Glean solves this through a powerful search and RAG technology that connects to enterprise systems via pre-built integrations, indexes the content, and brings relevant information to models to answer user questions.

**Governance and Permissions**: Unlike the public web where all information is available to everyone, enterprise information is typically accessible only to specific users and groups. Glean builds a fully permissions-aware search index and RAG platform. When indexing content from enterprise systems, Glean also captures access control information (users and groups with permissions). When a user queries the system, their identity is used to retrieve only authorized content, preventing unauthorized knowledge leakage.

**Data Quality and Freshness**: Beyond model hallucinations, the bigger challenge with RAG is ensuring the right data reaches the model. Glean works on filtering out-of-date information, removing low-quality content, prioritizing fresh and up-to-date information with high engagement, identifying content from subject matter experts, and contextualizing results based on user role (engineer vs. marketer).

Glean shares two production success stories with quantified results:

- A global software company with 10,000+ employees deployed Glean across engineering teams, connecting Jira, Confluence, GitHub, and Google Drive. Developers use it for troubleshooting and getting context on projects, reportedly saving 40 engineering years in the first year of deployment.
- A large telecommunications company deployed Glean across 50,000+ customer care agents, connecting knowledge articles and internal information. Agents use Glean to get AI-suggested responses to customer questions, resulting in 47% faster case resolution—estimated to represent tens to hundreds of millions of dollars in call center savings.

## Typeface: Personalized Content Generation at Scale

Vall Su, Chief Product Officer at Typeface, presents a generative AI application platform for creating personalized content at scale, designed for non-technical end users.

Typeface identifies three key learnings from 18 months of building their solution:

**The Blank Canvas Problem**: End users often don't know what prompts to type. While AI practitioners have mastered prompt engineering, average enterprise users don't know where to start. Typeface addresses this with "magic prompts"—users provide keywords, and Typeface generates optimal prompts. This is a critical consideration for any LLMOps deployment: the maturity model of the builders may be far ahead of the average user.

**Enterprise Context for Grounding**: Creating great content is only the first step. The next level involves understanding who the content is for, what channels it targets, and what brand voice it should embody. Typeface integrates with Digital Asset Management Systems, audience platforms, and brand kits to ground output in enterprise context—ensuring content matches company voice, audience segments, geographies, and channels.

**Governance and Responsible AI**: When scaling solutions across an organization, governance becomes critical. Typeface has built six layers of trust into their solution, starting with selecting robust foundation models (in this case, from Google) and building additional safeguards on top.

Typeface shares two customer success stories:

- A Fortune 500 insurance provider selling employee benefits used Typeface to create personalized pet insurance marketing. Based on psychographic research showing that images featuring a customer's own pet type increase response rates, they personalized images dynamically (e.g., a dog with a hard hat for Home Depot employees). Estimated impact: 2-5% sales improvement.
- A consumer electronics manufacturer with appliances across multiple product lines (TVs, soundbars, washer/dryers) used Typeface to unify their brand voice across different internal teams and create localized content for 90 different geographies. What previously took weeks (or was never done at all) is now achievable at scale.

## Security AI: Data Pipeline Governance and Regulatory Compliance

Rahan Jalil, CEO of Security AI, addresses the foundational challenges of using enterprise data safely with any generative models on Google Cloud—whether first-party, commercial, or open-source offerings.

Security AI provides a pipeline framework that:

- Picks up data from various applications
- Enforces security, privacy, and governance controls inline
- Removes sensitive information automatically
- Integrates with vector databases and Vertex AI search
- Enables building chatbots, APIs, and website integrations safely

Three key challenges Security AI addresses:

**Understanding Unstructured Data**: While structured data has been used for BI and ETL for years, unstructured data is a "whole new ball game." Before going from POC to production, organizations need a handle on data quality, lineage, entitlements, and security controls. Security AI provides a Knowledge Graph that helps organizations understand what they can and cannot do with their data.

**Model Selection and Flexibility**: Organizations need to select the most appropriate model from the Model Garden for specific use cases, considering both efficacy and cost. Security AI enables flexible generative pipeline building that allows easy model selection and data integration.

**Regulatory Compliance**: Unlike GDPR which took about two decades to emerge, AI regulations (EU AI Act, NIST AI RMF, and approximately 20 others) have arrived almost immediately. Organizations need to demonstrate safe and responsible AI use to boards, executives, and customers. This compliance must be embedded in the pipeline itself for production deployments.

Use cases highlighted include:

- Customer onboarding for financial institutions involving contracts, board materials, and KYC requirements processed with proper legal compliance
- HIPAA-compliant data cleaning for healthcare applications before model training
- Cross-application knowledge bases for developers combining Jira, Confluence, and GitHub data

## Citibank: Enterprise-Scale AI Transformation

Shadman Zafer, a CoCIO for Citibank, provides a consumer perspective on implementing these technologies at a global financial institution. His insights focus on organizational transformation rather than specific technical implementations.

**Safety and Soundness First**: For a global bank, safety and customer protection are paramount concerns. Every CIO introducing new technology must balance excitement about possibilities with risk management.

**Lab to Factory Floor**: Zafer critiques the approach of setting up isolated AI labs with small teams of experts. Citibank initially followed this approach for several months but has since pivoted to taking "AI out of the lab" to "truly get it on a factory floor." They have deployed one of the world's largest co-pilot implementations (tens of thousands of users), recognizing that AI benefits across the entire portfolio of 10,000-20,000 projects rather than just a few specialized use cases.

**Talent Development**: Beyond hiring AI experts, Citibank created an "AI expert manufacturing factory"—an apprenticeship program that trains existing employees who want to become AI experts. This internal talent pipeline has proven highly effective.

**Organizational Redesign**: Citibank approaches AI as a transformational technology comparable to the internet in 1994—something that will "sustainably change how we work for decades to come." This requires breaking departmental boundaries. For example, with generative AI, a data analytics team could directly generate personalized marketing campaigns that previously required coordination between separate departments. Citibank actively redesigns departments and processes rather than simply automating existing workflows.

**Marathon Mindset**: Rather than focusing on one cool project, Citibank views AI adoption as a 20-30 year marathon requiring organizational transformation, continuous training, and broad deployment across the enterprise.

## Key Themes Across the Panel

Several LLMOps themes emerge consistently across all panelists:

- **Permissions and Security**: Every speaker emphasizes the critical importance of maintaining access controls when AI systems access enterprise data.
- **RAG as Foundation**: Retrieval Augmented Generation appears as the standard architecture pattern for grounding LLM outputs in enterprise context.
- **Data Quality**: "Garbage in, garbage out" applies more than ever—understanding data quality, freshness, and relevance is essential.
- **User Accessibility**: Solutions must account for users who aren't prompt engineering experts.
- **Governance and Compliance**: As regulations proliferate, embedding compliance into AI pipelines becomes essential for production deployment.
- **Quantified Results**: Production deployments should measure impact—whether in engineering years saved, case resolution time, or sales lift.

The panel provides a practical, multi-industry perspective on the operational realities of moving generative AI from experimental projects to production systems at enterprise scale.