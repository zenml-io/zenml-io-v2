---
title: "Multi-Agent AI Development Assistant for Clinical Trial Data Analysis"
slug: "multi-agent-ai-development-assistant-for-clinical-trial-data-analysis"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "683d7a64e7d4ae00b47557cf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:10:14.272Z"
  createdOn: "2025-06-02T10:18:12.236Z"
llmopsTags:
  - "healthcare"
  - "regulatory-compliance"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "system-prompts"
  - "chunking"
  - "error-handling"
  - "guardrails"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "documentation"
  - "amazon-aws"
industryTags: "healthcare"
company: "AstraZeneca"
summary: "AstraZeneca developed a \"Development Assistant\" - an interactive AI agent that enables researchers to query clinical trial data using natural language. The system evolved from a single-agent approach to a multi-agent architecture using Amazon Bedrock, allowing users across different R&D domains to access insights from their 3DP data platform. The solution went from concept to production MVP in six months, addressing the challenge of scaling AI initiatives beyond isolated proof-of-concepts while ensuring proper governance and user adoption through comprehensive change management practices."
link: "https://www.youtube.com/watch?v=yoeH_WwTE78"
year: 2025
seo:
  title: "AstraZeneca: Multi-Agent AI Development Assistant for Clinical Trial Data Analysis - ZenML LLMOps Database"
  description: "AstraZeneca developed a \"Development Assistant\" - an interactive AI agent that enables researchers to query clinical trial data using natural language. The system evolved from a single-agent approach to a multi-agent architecture using Amazon Bedrock, allowing users across different R&D domains to access insights from their 3DP data platform. The solution went from concept to production MVP in six months, addressing the challenge of scaling AI initiatives beyond isolated proof-of-concepts while ensuring proper governance and user adoption through comprehensive change management practices."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-ai-development-assistant-for-clinical-trial-data-analysis"
  ogTitle: "AstraZeneca: Multi-Agent AI Development Assistant for Clinical Trial Data Analysis - ZenML LLMOps Database"
  ogDescription: "AstraZeneca developed a \"Development Assistant\" - an interactive AI agent that enables researchers to query clinical trial data using natural language. The system evolved from a single-agent approach to a multi-agent architecture using Amazon Bedrock, allowing users across different R&D domains to access insights from their 3DP data platform. The solution went from concept to production MVP in six months, addressing the challenge of scaling AI initiatives beyond isolated proof-of-concepts while ensuring proper governance and user adoption through comprehensive change management practices."
---

## Overview

AstraZeneca, a global biopharmaceutical company, embarked on an ambitious initiative to leverage AI for accelerating drug development as part of their broader corporate goal to deliver 20 new medicines by 2030. The case study, presented by Rashali Goyle, Senior Director within R&D IT at AstraZeneca, describes the development and deployment of an interactive AI agent called "Development Assistant" designed to help users query and analyze clinical trial data using natural language.

The initiative represents an interesting example of LLMOps in a heavily regulated pharmaceutical environment, where data quality, accuracy, and governance are paramount. What makes this case study notable is the evolution from a simple proof-of-concept to a production multi-agent system, along with the organizational change management practices that accompanied the technical implementation.

## Problem Context

AstraZeneca faced several challenges that are common in large pharmaceutical organizations:

- Data siloed across different platforms and domains (clinical, regulatory, safety, quality)
- Multiple disconnected AI initiatives that were productive but isolated, reducing overall effectiveness
- Need to accelerate the drug development pipeline while maintaining quality and compliance
- Change fatigue among employees dealing with constant technology evolution
- Complex domain-specific terminology and acronyms that vary in meaning across different contexts

The company recognized that traditional BI tools and dashboard approaches, while functional, were not sufficient to unlock the full potential of their data assets for faster, deeper insights.

## Technical Solution

### Foundation: Drug Development Data Platform (3DP)

Rather than building from scratch, AstraZeneca strategically chose to build their AI solution on top of an existing platform called 3DP (Drug Development Data Platform). This decision was driven by several factors:

- The platform already had thousands of users, establishing trust and familiarity
- Security and privacy concerns had already been addressed
- The data products within 3DP were designed with FAIR principles (Findable, Accessible, Interoperable, Reusable), with particular emphasis on the "I" for interoperability
- The infrastructure was already extensible and connectable, reducing application development overhead

This approach of building on existing foundations rather than creating entirely new infrastructure is a pragmatic LLMOps practice that accelerated time-to-production.

### Initial Single-Agent Architecture

The first version of Development Assistant was built using a single-agent approach. The speaker demonstrated a simple use case: a data scientist asking "What are the top five countries with the most clinical trial sites? Visualize this in a pie chart." The system could:

- Accept natural language queries
- Display reasoning steps transparently to users
- Convert natural language to SQL queries
- Pull data from specific tables
- Generate visualizations (pie charts, etc.)
- Provide verifiable results traceable back to source data

The team intentionally exposed the reasoning steps and SQL queries to enable quality checks and verification—a critical feature for maintaining trust in a pharmaceutical context.

### Challenges and Augmentation Strategies

During initial deployment, the team identified key challenges:

**Controlled Vocabulary Issues**: Life sciences is notorious for acronyms and specialized terminology. The team discovered that augmenting the LLM with appropriate controlled vocabulary significantly improved output quality. For example, terms like "lymphoid leukemia" needed proper terminology mapping to retrieve accurate results.

**Metadata Quality**: Column labeling in their data products was often inadequate or inconsistent. Improving metadata descriptions became another augmentation strategy to help the LLM generate correct SQL queries.

These augmentation approaches—vocabulary enrichment and metadata enhancement—represent practical RAG-like techniques for improving LLM accuracy in domain-specific applications.

### Evolution to Multi-Agent Architecture

As AstraZeneca sought to expand Development Assistant beyond clinical trials to regulatory, quality, and other R&D domains, they encountered limitations with the single-agent approach:

- The volume of data across multiple domains was too large for a single agent to handle effectively
- Hallucinations increased and response accuracy decreased with larger data scope
- Performance bottlenecks emerged
- Complex cross-domain problems couldn't be solved correctly

The solution was migrating to Amazon Bedrock's multi-agent architecture, which introduced:

**Supervisor Agent**: A coordinating agent that receives user prompts and routes them to appropriate sub-agents based on the query context.

**Sub-Agents**: Specialized agents for different domains and functions:
- Terminology agent (processes domain-specific vocabulary)
- Clinical domain agent
- Regulatory domain agent
- Quality domain agent
- Other R&D domain agents

This architecture provides flexibility and scalability while addressing the critical issue that the same terminology can mean different things in different domains—the supervisor agent ensures queries are routed to the correct context.

The enhanced system can now provide not just data retrieval but also insights, recommendations, and summarizations. For example, a data science director could ask about screen failures in a study and receive both the raw data and analytical insights about potential issues.

## Production Operations and Guardrails

The team emphasized several LLMOps practices for maintaining production quality:

**Continuous Validation**: Subject matter experts (SMEs) from clinical and other domains actively validate the tool's outputs. These domain experts confirm that insights match how their personas would actually analyze the data and what conclusions they would draw.

**Sprint-Based Testing**: Rigorous testing occurs every sprint, with changes benchmarked against previous versions to ensure improvements don't introduce regressions.

**User Trust Building**: The tool is designed to be transparent and verifiable, with reasoning steps exposed to users. This is essential in pharmaceutical contexts where decisions can have significant patient safety implications.

**Business Integration**: Product managers from different business areas were enlisted to use the tool in their actual workflows, starting with small tasks and gradually expanding usage.

## Timeline and Results

The project achieved concept to production MVP in approximately six months, which the speaker noted was faster than typical AI initiatives at the company during a period when many projects were stuck in ideation or proof-of-concept phases. The key factors enabling this speed included:

- Building on existing trusted infrastructure (3DP)
- Strong collaboration with AWS
- Clear focus on value-driven use cases rather than technology for its own sake
- Commitment to reaching production rather than endless piloting

The tool is now in production and actively being expanded to additional domains in 2025.

## Organizational Change Management

A significant portion of the presentation focused on the human side of LLMOps—specifically addressing change fatigue. AstraZeneca implemented several practices:

**Multi-Stakeholder Alignment**: Collaboration across HR, legal, business groups, and AI accelerator teams to ensure consistent narratives and correct practices.

**Showcases and Spotlights**: Regular forums to demonstrate new technology to scientists and domain experts, with follow-up sessions to address adoption challenges.

**AI Accreditation Program**: A four-tier certification program driven from senior leadership, rewarding employees who complete AI-related curriculum. This creates structured pathways for upskilling across the organization.

**Lifelong Learning Culture**: Senior leaders are making AI learning part of their goals and daily routines, modeling the behavior expected throughout the organization.

## Critical Assessment

While the case study presents an impressive initiative, a few observations merit consideration:

The presentation is somewhat light on specific metrics or quantitative results—we hear that tasks that "normally take hours" are now faster, but precise efficiency gains aren't provided. Similarly, accuracy rates, hallucination frequencies, and user adoption numbers aren't disclosed.

The multi-agent architecture using Amazon Bedrock is presented as a solution to scalability challenges, but the complexity of managing multiple specialized agents in a production environment—including keeping them synchronized as data products evolve—isn't fully addressed.

The emphasis on change management suggests that user adoption remains an ongoing challenge, which is realistic but also indicates the tool's value proposition may not be immediately obvious to all potential users.

That said, the pragmatic approach of building on existing infrastructure, the transparency in reasoning steps, and the recognition that vocabulary and metadata augmentation are critical success factors all represent sound LLMOps practices that other organizations could learn from.

## Key Takeaways

The Development Assistant initiative at AstraZeneca demonstrates several LLMOps best practices:

- Leverage existing trusted platforms rather than building from scratch
- Invest in data quality (vocabulary, metadata) as foundational to LLM success
- Design for transparency and verifiability, especially in regulated industries
- Plan for scalability through multi-agent architectures as scope expands
- Pair technical deployment with organizational change management
- Move to production quickly to learn from real usage rather than endless piloting

The case represents a practical example of how pharmaceutical companies can apply LLMs to accelerate drug development while managing the unique challenges of heavily regulated, terminology-rich domains.