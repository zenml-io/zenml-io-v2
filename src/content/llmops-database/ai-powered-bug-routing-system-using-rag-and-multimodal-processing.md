---
title: "AI-Powered Bug Routing System Using RAG and Multimodal Processing"
slug: "ai-powered-bug-routing-system-using-rag-and-multimodal-processing"
draft: false
llmopsTags:
  - "classification"
  - "customer-support"
  - "multi-modality"
  - "rag"
  - "prompt-engineering"
  - "embeddings"
  - "vector-search"
  - "human-in-the-loop"
  - "kubernetes"
  - "elasticsearch"
  - "anthropic"
  - "amazon-aws"
industryTags: "tech"
company: "Miro"
summary: "Miro, serving over 95 million users globally, faced significant challenges with bug routing across nearly 100 engineering teams, resulting in an estimated 42 years of cumulative lost productivity annually due to misrouting and repeated reassignments. To address this, Miro partnered with AWS to develop BugManager, an AI-powered bug triaging solution built on Amazon Bedrock. The system uses RAG with Amazon Bedrock Knowledge Bases to enrich bug reports with context from multiple sources (Jira tickets, GitHub PRs, Confluence docs), multimodal processing with Amazon Nova Pro to parse screenshots and videos, and Anthropic's Claude Sonnet 4 for classification across approximately 100 teams. The solution achieved 75% top-1 accuracy (70% improvement over their previous fine-tuned NLP model), 95% top-3 accuracy, six times fewer team reassignments, and five times shorter median time-to-resolution, reducing resolution time from days to hours."
link: "https://aws.amazon.com/blogs/machine-learning/how-miro-uses-amazon-bedrock-to-boost-software-bug-routing-accuracy-and-improve-time-to-resolution-from-days-to-hours/"
year: 2026
seo:
  title: "Miro: AI-Powered Bug Routing System Using RAG and Multimodal Processing - ZenML LLMOps Database"
  description: "Miro, serving over 95 million users globally, faced significant challenges with bug routing across nearly 100 engineering teams, resulting in an estimated 42 years of cumulative lost productivity annually due to misrouting and repeated reassignments. To address this, Miro partnered with AWS to develop BugManager, an AI-powered bug triaging solution built on Amazon Bedrock. The system uses RAG with Amazon Bedrock Knowledge Bases to enrich bug reports with context from multiple sources (Jira tickets, GitHub PRs, Confluence docs), multimodal processing with Amazon Nova Pro to parse screenshots and videos, and Anthropic's Claude Sonnet 4 for classification across approximately 100 teams. The solution achieved 75% top-1 accuracy (70% improvement over their previous fine-tuned NLP model), 95% top-3 accuracy, six times fewer team reassignments, and five times shorter median time-to-resolution, reducing resolution time from days to hours."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-bug-routing-system-using-rag-and-multimodal-processing"
  ogTitle: "Miro: AI-Powered Bug Routing System Using RAG and Multimodal Processing - ZenML LLMOps Database"
  ogDescription: "Miro, serving over 95 million users globally, faced significant challenges with bug routing across nearly 100 engineering teams, resulting in an estimated 42 years of cumulative lost productivity annually due to misrouting and repeated reassignments. To address this, Miro partnered with AWS to develop BugManager, an AI-powered bug triaging solution built on Amazon Bedrock. The system uses RAG with Amazon Bedrock Knowledge Bases to enrich bug reports with context from multiple sources (Jira tickets, GitHub PRs, Confluence docs), multimodal processing with Amazon Nova Pro to parse screenshots and videos, and Anthropic's Claude Sonnet 4 for classification across approximately 100 teams. The solution achieved 75% top-1 accuracy (70% improvement over their previous fine-tuned NLP model), 95% top-3 accuracy, six times fewer team reassignments, and five times shorter median time-to-resolution, reducing resolution time from days to hours."
notion:
  pageId: "35df8dff-2538-8046-923f-f61a274a9f1f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:33:00.000Z"
  lastEditedTime: "2026-05-11T20:33:00.000Z"
  publishedAt: "2026-05-11T20:39:14Z"
---

## Overview

Miro, an AI-powered innovation workspace serving over 95 million users globally, implemented BugManager, a production LLM-powered system for automated bug triaging and routing. The case study provides detailed insights into building and deploying a complex RAG-based classification system that operates at scale in a dynamic organizational environment. The problem space is particularly challenging: Miro's engineering organization consists of nearly 100 teams, creating a multi-class classification problem where bug reports must be accurately routed to the correct team for resolution. Prior to BugManager, a significant percentage of bugs missed internal resolution SLAs primarily due to misrouting and repeated reassignments between teams, resulting in an estimated 42 years of cumulative lost productivity annually from delays and redundant investigation efforts.

The company had previously attempted to solve this problem using traditional approaches, including a fine-tuned GPT model, but experienced quickly degrading performance. Traditional NLP-based text classifiers and fine-tuned LLM classifiers faced severe limitations in Miro's dynamic environment where teams merge, new teams form, products evolve, and team responsibilities continuously change. These models required retraining when organizational changes occurred and depended on labeled data that might not exist for new structures. This experience led Miro to pursue a more adaptable, zero-training approach using prompt-based LLM classification combined with RAG for context retrieval.

## Architecture and Infrastructure

BugManager runs as a Python microservice deployed on Amazon Elastic Kubernetes Service (Amazon EKS), providing production-grade scalability and reliability. The system is built primarily on Amazon Bedrock, a fully managed service offering multiple foundation models through a single API. The architecture integrates several key AWS services: Amazon Bedrock Knowledge Bases for RAG implementation, Amazon Nova Pro for multimodal processing, Anthropic's Claude Sonnet 4 for classification and analysis, Amazon OpenSearch Serverless as the vector store, and Amazon S3 for storage. The system interfaces with Miro's existing tools through Slack for user interaction and Jira for ticket management.

The deployment on Kubernetes reflects production-readiness considerations around scalability, resource management, and operational stability. The microservice architecture allows the system to handle multiple concurrent bug reports while maintaining reasonable latency—the average classification latency is 53 seconds, which proved practical when deployed in production. This latency includes multiple LLM calls, RAG retrieval operations, and multimodal processing, indicating thoughtful optimization of the end-to-end pipeline.

## Multimodal Processing Pipeline

One of the sophisticated aspects of BugManager is its handling of multimodal inputs. Bug reports often include not just text but screenshots, product page images, and screen recording videos that demonstrate how to reproduce the bug. The system uses Amazon Nova Pro's image and video understanding capabilities to parse these media attachments into text descriptions. However, the implementation goes beyond simple image-to-text conversion. The team recognized that LLMs lack context awareness by default and cannot meaningfully interpret a screenshot without understanding what product or feature is being shown.

To address this, BugManager implements a two-stage approach: first, it runs RAG based on the bug text description to retrieve information about the specific feature likely depicted in the media asset, drawing from Miro's internal product documentation stored in Amazon Bedrock Knowledge Bases. This context is then provided to Amazon Nova Pro along with the image or video, enabling more specific and useful extraction of information from the attachment. After parsing, the text description of the media attachment is appended to the original bug text and passed to subsequent steps. This context-aware multimodal processing represents a practical solution to a real production challenge and demonstrates thoughtful prompt engineering beyond basic image captioning.

## RAG Implementation and Knowledge Base Management

The RAG implementation in BugManager is comprehensive and leverages multiple heterogeneous data sources. Amazon Bedrock Knowledge Bases provides the fully managed infrastructure for implementing the entire RAG workflow—from ingestion to retrieval and prompt augmentation—without requiring custom integrations. The system indexes several critical data sources: Confluence documentation, Miro help center articles, previously resolved Jira tickets, GitHub README files, and Backstage documents (technical documentation and software catalog). This diversity of sources is essential for providing the LLM with comprehensive context about both technical implementation details and organizational structure.

The knowledge base uses Amazon OpenSearch Serverless as the vector store, providing serverless operation without infrastructure management overhead. The system leverages both the S3 connector and Confluence connector as data sources, demonstrating integration with both structured and semi-structured data repositories. A critical production consideration addressed in the implementation is keeping the knowledge base current with organizational changes. Amazon Bedrock Knowledge Bases supports incremental re-syncs, which the team uses to keep documentation up to date in a cost-effective manner—only modified documents are re-embedded and re-indexed rather than processing the entire corpus on each update.

The knowledge base serves multiple purposes in the workflow: it provides context for parsing media attachments, enriches bug descriptions with relevant historical information and product documentation during classification, and supplies code-level context for the optional root cause analysis feature. This multi-purpose use of the same knowledge infrastructure demonstrates efficient architectural design.

## Classification Prompt Engineering

The core classification logic relies on sophisticated prompt engineering rather than model fine-tuning. The prompt provided to Anthropic's Claude Sonnet 4 includes the enriched bug description (augmented with RAG context), the enriched attachment description if available, and crucially, detailed descriptions of all approximately 100 Miro software teams. These team descriptions are centrally curated and versioned in Backstage, backed by GitHub, making them living documents that can be updated whenever organizational structures or responsibilities change.

The classification prompt instructs the model to analyze bug reports across multiple dimensions: affected systems or components, technical keywords and terminology, error messages or stack traces, user impact and behavior, and related capabilities, features, or functionality. The model must then compare these details against each team's responsibilities and select the most appropriate teams based on direct ownership of affected components, required technical expertise, historical handling of similar issues, and cross-cutting concerns and dependencies. The prompt uses XML tags for structured output parsing (`<team>`, `<confidence>`, `<rationale>`), which provides robust extraction of classification results.

The system returns up to five likely team options ranked by confidence (HIGH, MEDIUM, LOW), with each choice accompanied by a comprehensive rationale explaining the routing decision. This multi-option output with explanations proved critical for user acceptance and trust—a significant improvement over the previous fine-tuned NLP solution that only returned a single team without explanation. The top-1 accuracy of over 75% represents a 70% improvement versus the existing internal solution, while the top-3 accuracy of 95% enables effective human-in-the-loop decision-making when paired with the ranked options.

An important technical detail is the use of Anthropic Claude's extended thinking capability, which resulted in additional accuracy gains of 7-9% beyond the base model. Extended thinking allows the model to engage in more deliberate reasoning before providing answers, which appears particularly valuable for complex classification tasks requiring consideration of multiple factors and organizational context.

The prompt-based approach provides significant operational advantages over fine-tuned models. When team responsibilities change, the system can incorporate updates immediately by simply updating the respective team descriptions (markdown files written in English) without requiring model retraining, labeled data collection, or deployment of updated model artifacts. This adaptability is essential in Miro's dynamic organizational environment and represents a key architectural decision that enables sustainable long-term operation.

## Root Cause Analysis Feature

Beyond classification, BugManager offers an optional root cause analysis capability that provides deeper insights into reported bugs. This feature uses Amazon Bedrock Knowledge Bases to retrieve relevant sections from Miro's entire GitHub code base. The system provides Claude Sonnet 4 (with extended thinking enabled) with the bug description, previously retrieved context, the selected software team, and the retrieved code sections. The LLM then generates a set of hypotheses for the root cause of the observed bug, relieving software engineers of initial research work and accelerating time-to-resolution.

This feature demonstrates an evolution beyond simple classification toward providing actionable insights that directly support developer workflows. By grounding the analysis in actual code rather than just documentation, the system can offer more specific and technically accurate hypotheses. The optional nature of this feature suggests thoughtful consideration of latency and cost trade-offs—users can opt in when they need deeper analysis rather than running expensive code retrieval and analysis on every bug report.

## Production Workflow and Human-in-the-Loop

BugManager integrates seamlessly into Miro's existing development workflows through a Slack-based interface. Users post bug reports into a dedicated Slack channel, potentially including text and media attachments. The system processes the report through its full pipeline and returns classification results to Slack as a response to the initial message. Critically, users can review the routing results and make changes to the default choice if needed, implementing effective human-in-the-loop oversight. After user confirmation or modification, a Jira ticket is automatically created with the original bug description, supporting documentation retrieved from the knowledge bases, root cause analysis results if generated, and assignment to the selected team.

This workflow design reflects several production best practices: integration with tools developers already use daily (Slack and Jira), transparent AI decision-making with explanations to build trust, human oversight to catch edge cases and model errors, and automation of downstream ticket creation to reduce manual work. The approach balances automation with control, allowing BugManager to handle the heavy lifting of analysis and classification while keeping humans in the decision loop for final routing decisions.

## Production Results and Impact

BugManager has successfully routed thousands of bugs and support requests in production, delivering measurable business impact. The system achieved a six-fold reduction in team reassignments for customer support requests—a direct measure of routing accuracy that translates to reduced developer frustration and context-switching. More dramatically, the solution delivered a five-fold improvement in median time-to-resolution, transforming what once took days into an hours-long process. The case study claims that BugManager is projected to save years of cumulative waiting and investigation time annually, though it's worth noting that such projections should be validated against actual long-term data.

These production results demonstrate that the system operates reliably at scale and delivers tangible value. The combination of high accuracy (75% top-1, 95% top-3) with reasonable latency (53 seconds average) has enabled widespread adoption across Miro's engineering organization. The 70% accuracy improvement over the previous fine-tuned model validates the architectural decision to pursue a RAG-based, prompt-driven approach rather than continuing to invest in fine-tuning approaches that degraded quickly as the organization evolved.

## Critical Assessment and LLMOps Considerations

While the case study presents impressive results, several considerations merit balanced assessment. The claimed 42 years of cumulative lost productivity annually from misrouting issues is a striking figure that would benefit from transparency around the calculation methodology. Similarly, the projection of years of time saved should be validated with longitudinal data as the system continues operating. The case study is published by AWS on their blog, which naturally emphasizes the capabilities of AWS services, so claims should be evaluated with appropriate skepticism.

That said, the technical implementation demonstrates several LLMOps best practices worth emulating. The system addresses real production challenges like handling dynamic organizational structures, processing multimodal inputs with context awareness, managing multiple heterogeneous knowledge sources, and balancing automation with human oversight. The choice to deploy on Kubernetes reflects production-readiness thinking around scalability and reliability. The use of managed services like Amazon Bedrock and Amazon Bedrock Knowledge Bases reduces operational overhead compared to managing embedding models, vector databases, and model serving infrastructure directly.

The prompt engineering approach offers genuine advantages for this use case: immediate incorporation of organizational changes, no requirement for labeled training data, transparent decision-making with rationales, and the ability to leverage the latest model capabilities without retraining. However, this approach also has trade-offs: potentially higher inference costs compared to smaller fine-tuned models, dependence on external API availability, and less control over model behavior compared to self-hosted solutions. The 53-second average latency, while acceptable for this asynchronous workflow, would be problematic for more time-sensitive applications.

The incremental re-sync capability of Amazon Bedrock Knowledge Bases is valuable for maintaining current context, but the case study doesn't detail the refresh cadence or how the system handles potential inconsistencies during updates. The multimodal processing pipeline is sophisticated but represents additional complexity and cost compared to text-only approaches. The extended thinking feature of Claude provided measurable accuracy improvements (7-9%), but this capability likely increases both latency and cost per inference.

Overall, BugManager represents a well-architected LLM production system that thoughtfully addresses real operational challenges in software engineering. The combination of RAG, multimodal processing, prompt engineering, and human-in-the-loop design demonstrates mature LLMOps thinking. The measurable production results—particularly the improvements in reassignment rates and time-to-resolution—provide evidence of real business value, though the full cost-benefit analysis including inference costs and development effort would provide additional context for evaluating the solution's overall success.
