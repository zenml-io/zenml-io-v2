---
title: "Implementing Question-Answering Over Sales Conversations with Deal Me at Gong"
slug: "implementing-question-answering-over-sales-conversations-with-deal-me-at-gong"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3de2090aafd80ff7d222"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:40:47.077Z"
  createdOn: "2024-11-21T14:04:18.898Z"
llmopsTags:
  - "cost-optimization"
  - "data-analysis"
  - "databases"
  - "devops"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "structured-output"
industryTags: "tech"
company: "Gong"
summary: "Gong developed \"Deal Me\", a natural language question-answering feature for sales conversations that allows users to query vast amounts of sales interaction data. The system processes thousands of emails and calls per deal, providing quick responses within 5 seconds. After initial deployment, they discovered that 70% of user queries matched existing structured features, leading to a hybrid approach combining direct LLM-based QA with guided navigation to pre-computed insights."
link: "https://www.youtube.com/watch?v=qv6b9Lx_6MU"
year: 2023
seo:
  title: "Gong: Implementing Question-Answering Over Sales Conversations with Deal Me at Gong - ZenML LLMOps Database"
  description: "Gong developed \"Deal Me\", a natural language question-answering feature for sales conversations that allows users to query vast amounts of sales interaction data. The system processes thousands of emails and calls per deal, providing quick responses within 5 seconds. After initial deployment, they discovered that 70% of user queries matched existing structured features, leading to a hybrid approach combining direct LLM-based QA with guided navigation to pre-computed insights."
  canonical: "https://www.zenml.io/llmops-database/implementing-question-answering-over-sales-conversations-with-deal-me-at-gong"
  ogTitle: "Gong: Implementing Question-Answering Over Sales Conversations with Deal Me at Gong - ZenML LLMOps Database"
  ogDescription: "Gong developed \"Deal Me\", a natural language question-answering feature for sales conversations that allows users to query vast amounts of sales interaction data. The system processes thousands of emails and calls per deal, providing quick responses within 5 seconds. After initial deployment, they discovered that 70% of user queries matched existing structured features, leading to a hybrid approach combining direct LLM-based QA with guided navigation to pre-computed insights."
---

## Overview

Gong is a revenue intelligence platform that serves sales teams by aggregating and analyzing all the data that flows through B2B sales deals. The core value proposition is that salespeople typically spend 80% of their time on non-selling activities—searching for leads on LinkedIn, preparing for meetings, summarizing calls, sending follow-up emails, updating CRMs, and reporting to managers. By automating and streamlining these activities, Gong aims to increase productive selling time significantly.

The platform serves users across the entire sales organization hierarchy: from SDRs (Sales Development Representatives) who identify leads, to account executives who run deals, to managers who coach their teams, and up to executives who need aggregate insights on sales performance and deal health.

This case study focuses on a feature called "Ask Me" (referred to as "D Me" in the presentation), which is a natural language Q&A system built on top of Gong's deal intelligence product. The feature was developed by Gong's Speech and NLP research team, starting approximately 18 months before the presentation (around early 2023), inspired by the initial ChatGPT experience.

## The Problem Space

B2B enterprise sales deals are fundamentally different from consumer transactions. A single deal can:

- Involve dozens of people from both the selling and buying organizations
- Span many months of sales activity
- Generate hundreds of emails and thousands of call transcripts
- Include complex pricing negotiations with frequent changes
- Require tracking multiple decision-makers and stakeholders

Simply aggregating all this information in one place was already a differentiator for Gong compared to competitors. However, the challenge was extracting actionable insights from this massive corpus of unstructured data. When a sales manager wants to review a deal with their representative in a weekly one-on-one meeting, they previously had to either listen to recordings or wait for verbal summaries. The Ask Me feature aimed to let managers (and sellers) get immediate answers to any question about a deal.

## Technical Architecture and Challenges

### Data Unification Pipeline

The first major technical challenge was unifying all deal data into a format that could be fed to an LLM. This required creating a unified schema that could represent:

- Call transcripts and recordings
- Email threads
- CRM metadata (deal stage, pricing, contacts)
- Meeting notes and summaries

This was described as the first time Gong needed to build a unified API to bring all these different data types together into a single queryable format.

### Context Length Optimization

A critical trade-off emerged around context length. Longer context provides richer, more nuanced answers, but models (especially circa 2023) struggled with very long contexts, often "losing" information in the middle of long documents. The team experimented extensively with different chunking strategies.

Their current optimal approach operates at approximately the conversation level—feeding the query plus one conversation (or a batch of emails) at a time, rather than trying to stuff entire deal histories into single prompts. This granular approach improved accuracy while keeping context manageable.

### Prompt Engineering and Templating

The system uses sophisticated prompt engineering beyond naive question-forwarding:

- Metadata injection: Deal context, user role, and deal stage are added to prompts
- Chain-of-thought reasoning: Multi-step processing to improve answer quality
- Query rewriting: The user's question is potentially reformulated with additional context

### Aggregation Pipeline

Since answers may need to synthesize information from multiple sources (calls, emails, metadata), the system implements an aggregation chain:

- Individual sources are queried separately
- Results are collected and merged
- A final synthesis step produces the coherent answer

This parallel processing architecture was necessary to meet latency requirements.

### Latency Requirements

The team set a target of approximately 5 seconds for end-to-end response time. This constraint was described as "very limiting" and required careful optimization of:

- Which sources to query (can't query everything)
- Parallel vs. sequential processing decisions
- Model selection (speed vs. quality tradeoffs)

### Hallucination Mitigation

A significant focus was placed on preventing hallucinations, which are particularly problematic in a sales context. The example given was a manager asking "What happened when Michael Jordan joined the deal?"—if no such person exists in the deal, the system should not fabricate an answer.

The solution involved adding a validation layer after generation that verifies claims against source data before returning responses.

### Citation and Explainability

A critical feature that was NOT in v1 but was added in v2 (based on customer demand) was the ability to trace answers back to their source. The current system:

- Returns the specific location in a call or email that supports each claim
- Allows users to click through to the exact transcript segment
- Enables listening to the actual audio clip
- Provides transparency that builds trust in the system's answers

This explainability feature was described as "very, very, very important" to customers.

### Cost Management at Scale

With approximately 4,000 customer companies, each containing thousands of users who might make multiple queries per day, costs quickly became a critical concern. The presentation explicitly mentioned reaching "very, very high" cost figures that couldn't be disclosed. Cost optimization became a major workstream.

### Retrieval Improvements with HyDE

The team implemented HyDE (Hypothetical Document Embeddings) to improve retrieval quality. This technique:

- Generates hypothetical answers to queries
- Uses these to improve similarity matching
- Can work bidirectionally (hypothetical questions for documents, hypothetical answers for queries)

This was described as one of the approaches that "really worked" for bringing queries and relevant content closer together in embedding space.

### Model Version Management

A significant operational challenge emerged around model versioning. The team noted that prompts that worked well on a June version of GPT-3.5 might not work on a November version. This necessitated building:

- Comprehensive QA and testing infrastructure
- Continuous evaluation pipelines
- The ability to quickly adapt to new model versions
- Ongoing balancing of model size, quality, and cost

## Key Learning: Query Analysis Revealed Product Gaps

Perhaps the most valuable insight from the deployment came from analyzing actual user queries at scale. The team discovered that approximately 70% of questions users asked were for information that Gong already provided through specialized, purpose-built features with:

- Higher accuracy (fine-tuned models instead of general LLMs)
- Better UX (visualizations, tables, interactive elements vs. plain text)
- Lower cost (no LLM inference required)

Common queries included:
- "What are the pains/challenges the customer mentioned?"
- "Summarize pricing discussions"
- "What's the probability of closing this deal?"
- "What are the risks in this deal?"

This led to a pivot in the product strategy. Instead of treating Ask Me purely as a free-form Q&A system, the current version implements intelligent routing:

- The system identifies when a query matches an existing specialized feature
- Users are directed to those features for the 70% of queries that match
- Only the 30% of truly novel queries get the full LLM-based treatment

This approach:
- Dramatically reduces costs
- Provides better user experience for common queries
- Exposes users to parts of the platform they didn't know existed
- Reserves LLM resources for cases where they add unique value

## Lessons and Recommendations

The presenter concluded with key takeaways for building AI products:

- **Strong data infrastructure first**: Before building LLM features, ensure you have robust pipelines to collect, unify, and access all relevant data
- **Ship fast, iterate on data**: Rather than trying to anticipate customer needs a priori, launch quickly and analyze actual usage patterns
- **Customer discovery through LLMs**: In the AI era, customers often don't know what they want until they experience it, making early deployment and observation essential
- **Don't assume LLMs are the final answer**: Purpose-built features often outperform general LLM solutions for common use cases

The case study represents a mature perspective on LLM deployment, moving past initial hype to a pragmatic understanding of where LLMs add value versus where traditional approaches remain superior.