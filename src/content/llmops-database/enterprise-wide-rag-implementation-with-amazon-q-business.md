---
title: "Enterprise-Wide RAG Implementation with Amazon Q Business"
slug: "enterprise-wide-rag-implementation-with-amazon-q-business"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "677ffdcf3efdeee4bfd82dfc"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:54:49.667Z"
  createdOn: "2025-01-09T16:48:15.331Z"
llmopsTags:
  - "question-answering"
  - "regulatory-compliance"
  - "legacy-system-integration"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "error-handling"
  - "human-in-the-loop"
  - "system-prompts"
  - "fastapi"
  - "postgresql"
  - "elasticsearch"
  - "redis"
  - "langchain"
  - "chromadb"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "amazon-aws"
  - "microsoft-azure"
  - "anthropic"
industryTags: "finance"
company: "Principal Financial"
summary: "Principal Financial implemented Amazon Q Business to address challenges with scattered enterprise knowledge and inefficient search capabilities across multiple repositories. The solution integrated QnABot on AWS with Amazon Q Business to enable natural language querying of over 9,000 pages of work instructions. The implementation resulted in 84% accuracy in document retrieval, with 97% of queries receiving positive feedback and users reporting 50% reduction in some workloads. The project demonstrated successful scaling from proof-of-concept to enterprise-wide deployment while maintaining strict governance and security requirements."
link: "https://www.youtube.com/watch?v=aCBox2j75Vc&list=PL2yQDdvlhXf_AG2Tt0CK-d4-eY6PgjKFr&index=13"
year: 2024
seo:
  title: "Principal Financial: Enterprise-Wide RAG Implementation with Amazon Q Business - ZenML LLMOps Database"
  description: "Principal Financial implemented Amazon Q Business to address challenges with scattered enterprise knowledge and inefficient search capabilities across multiple repositories. The solution integrated QnABot on AWS with Amazon Q Business to enable natural language querying of over 9,000 pages of work instructions. The implementation resulted in 84% accuracy in document retrieval, with 97% of queries receiving positive feedback and users reporting 50% reduction in some workloads. The project demonstrated successful scaling from proof-of-concept to enterprise-wide deployment while maintaining strict governance and security requirements."
  canonical: "https://www.zenml.io/llmops-database/enterprise-wide-rag-implementation-with-amazon-q-business"
  ogTitle: "Principal Financial: Enterprise-Wide RAG Implementation with Amazon Q Business - ZenML LLMOps Database"
  ogDescription: "Principal Financial implemented Amazon Q Business to address challenges with scattered enterprise knowledge and inefficient search capabilities across multiple repositories. The solution integrated QnABot on AWS with Amazon Q Business to enable natural language querying of over 9,000 pages of work instructions. The implementation resulted in 84% accuracy in document retrieval, with 97% of queries receiving positive feedback and users reporting 50% reduction in some workloads. The project demonstrated successful scaling from proof-of-concept to enterprise-wide deployment while maintaining strict governance and security requirements."
---

## Overview

Principal Financial Group, a 145-year-old financial services company serving over 68 million customers across 80+ markets worldwide, embarked on a journey to implement an enterprise-scale generative AI assistant using Amazon Q Business. The presentation was delivered at AWS re:Invent 2024 by Alicia Trent (AWS Worldwide Head of Go to Market for Amazon Q Business) and Nicki from Principal Financial, providing both the vendor perspective and a detailed customer implementation story.

The core business problem centered on knowledge fragmentation across the enterprise. With over 19,000 employees and decades of accumulated documentation, Principal faced significant operational challenges. Their first large-scale use case focused on a team of 300+ employees who processed more than 680,000 individual customer cases in 2023 alone. For each case, employees had to search through over 9,000 pages of work instructions to find correct answers. The training period to become fully efficient in this role was an astonishing 1.5 years, highlighting the severity of the knowledge management problem.

## Technical Architecture Evolution

Principal's journey began in September 2023, before Amazon Q Business was publicly announced. Their initial architecture leveraged QnABot on AWS as the core conversational platform, paired with the Amazon Lex web UI for a branded interface. The first iteration used Amazon Kendra for retrieval from S3 buckets and Anthropic Claude on Amazon Bedrock for summarization. This initial RAG implementation was deployed within three months of ideation (early December 2023).

However, the team quickly discovered that managing the complete stack—hyperparameter tuning, architecture maintenance, user access control, data management, and prompt engineering—proved extremely challenging for their small team. When Amazon Q Business was announced, Principal was already in contact with the Q team and was able to rapidly integrate their platform with the new service, literally shifting overnight in the first week of January 2024.

The production architecture integrates multiple AWS services in a sophisticated pipeline. QnABot on AWS handles intent routing through Amazon OpenSearch and Lex. Authentication flows through CloudFront integrated with their identity provider. Amazon Q Business serves as the core retrieval and generation engine, lifting the burden of managing AI/ML and data retrieval integrations. The system includes numerous Lambda functions for custom processing and a comprehensive logging pipeline using Kinesis Firehose to push conversation data into OpenSearch, with backups to S3 for integration with Athena and QuickSight for analytics.

## Data Challenges and Metadata Engineering

One of the most technically interesting aspects of this case study is Principal's approach to solving data quality and retrieval accuracy challenges. Their 145-year-old company had legacy systems with data organized for human consumption, not machine retrieval. Documents were logically linked for human navigation but existed as flat objects when ingested into a retrieval system.

A specific technical challenge arose with ASPX pages in SharePoint lists. These pages require server-side rendering because their content is dynamically generated on page load. The SharePoint connector initially couldn't index these pages, leading Principal to file a feature request that was implemented within a month. This troubleshooting process yielded a valuable insight: they now have new use case teams print pages to PDF and attach them to chats for initial experimentation, allowing users to test data readiness and practice prompt writing before spinning up data connectors.

The company faced severe issues with over-summarization. Information that users needed was often on a single page, but the system was summarizing content from multiple pages (sometimes 2, 3, 5, or even 8 pages), leading to incorrect policies and procedures being returned. Similar terminology across different business concepts (e.g., "member groups" vs. "individual members") caused confusion in retrieval results.

Their solution involved extensive metadata engineering. Using document enrichment through Amazon Q Business, at index time they extract page contents, send them to Bedrock, and generate custom metadata including keywords, expanded and collapsed acronyms, and custom summaries. This metadata is stored in DynamoDB and attached to files during the tuning process. The relevance tuning feature in Q Business allowed them to weight specific metadata fields appropriately.

## Quantitative Evaluation Methodology

Principal developed a rigorous quantitative evaluation methodology for measuring retrieval accuracy. They created a "golden truth" or labeled dataset against which they could test the system. Their approach involved programmatically running prompts and evaluating outputs and document relevance while systematically modifying metadata tuning features.

Results demonstrated the impact of their optimization efforts. Before any tuning, they achieved 67% accuracy in returning the correct document. Through metadata enrichment and relevance tuning, they improved to 84% accuracy. Notably, some configuration combinations resulted in accuracy as low as 43%, demonstrating both the sensitivity of the system to tuning parameters and the importance of systematic testing. The implementation of a "Top-K" feature (selecting to return only one document for this use case) combined with metadata tuning was key to achieving their best results.

The presenter emphasized that building this labeled dataset was time-consuming and recommended that organizations start building their golden truth datasets immediately if they don't have them yet.

## User Feedback and Analytics Pipeline

A comprehensive feedback workflow was implemented allowing users to rate answers as good or bad, evaluate document relevance, and provide free-text feedback. Every conversation is logged with the prompt, response, and related metadata. This data flows through Kinesis Firehose into OpenSearch and is backed up to S3 for analytics through Athena and QuickSight.

The analytics cover topics, intents, sentiment, prompt length and detail, and various other metrics. A key finding was the correlation between prompt quality and feedback: more complex, well-written prompts were more likely to receive positive feedback, while shorter, less detailed prompts correlated with negative or no feedback. This insight drove their emphasis on user education and prompt engineering training.

## User Adoption and Training

Principal discovered that users were treating the AI assistant like a search engine (asking "what is X") rather than as an AI assistant capable of more sophisticated interactions. They launched a skill development site providing on-demand training for prompt engineering and generative AI concepts. They also enhanced their demos to show "the art of the possible" rather than simply providing a tool and expecting users to figure it out.

The importance of champions emerged as a critical success factor. Principal identified a subset of users who knew their roles well and were open to experimentation, let them experiment freely, kept them informed, and these users became advocates for their business units.

## AI Governance Framework

The case study highlights an important distinction between data governance and AI governance. While Principal had a robust data governance program addressing quality, integrity, security, and usability of data throughout its lifecycle, they needed to develop a new AI governance framework with a broader scope covering ethical use, regulatory compliance, and bias considerations.

A specific governance question arose around monitoring user prompts and responses. There were concerns about impacting user trust if employees knew their queries were being monitored (e.g., performance review discussions). The governance decision was that monitoring is crucial for regulatory observability and bias detection, and also necessary for proving ROI. The critical factor is storing this information securely.

## Production Results

At the time of the presentation, approximately 800 users had access to the platform with 600 active in the last 90 days. Qualitatively, many users reported at least 50% reduction in workload for some tasks. Tens of thousands of queries had been processed with over 97% receiving positive or neutral acceptance, and only 3% returning negative feedback.

Users leverage the platform for basic analytics, customer feedback mapping, customer journey analysis, rewriting communications in various tones, and generating insights from internal data. Employees reported improvements in "one contact resolution" by helping them respond to customers using clear, confident language.

## Key Design Principles and Lessons Learned

Principal maintains a firm "human in the loop" philosophy. They explicitly state they are not replacing employees with AI but augmenting employee capabilities. Customers do not directly interact with the AI; the assistant helps employees respond to customer requests. The presenter noted they don't believe it's possible to reach 100% accuracy in any metric with this technology, which informs their decision to always have human oversight.

Key lessons from the implementation include: legacy systems will likely require strategic partnerships and custom solutions; metadata quality is absolutely crucial in RAG implementations; quantitative measurement of retrieval accuracy requires a labeled dataset or golden truth that should be built early; user education is critical for maximizing system effectiveness; AI governance is essential as you move from proof of concept to production; and starting small with willing experimenters creates champions who drive broader adoption.

## Amazon Q Business Platform Capabilities

The presentation also covered Amazon Q Business platform features that enabled Principal's implementation. The platform uses retrieval-augmented generation (RAG) to ingest data from over 40 out-of-the-box connectors (SharePoint, Confluence, Jira, ServiceNow, Smartsheet, etc.) in various formats (PDF, Excel, Word, PowerPoint, HTML, ASPX). It automatically respects document-level permissions from source systems, ensuring users only access information they're authorized to see.

Guardrails features allow blocking specific words or topics, and enabling verbatim responses for sensitive topics that shouldn't be processed through the LLM. Index boosting and relevance tuning allow prioritizing document types, folders, tags, or recency. The platform provides source citations with snippets for transparency and trust. Q Apps enables creating lightweight applications for repetitive workflows using natural language, and the system supports 50+ actions for updating tickets and other productivity tasks without leaving the interface.

The deployment model emphasizes ubiquity—AWS found that making Q Business available via browser extensions, Slack, and Teams increased usage 10-15x compared to web-only access.