---
title: "Auto-Moderating Car Dealer Reviews with GenAI"
slug: "auto-moderating-car-dealer-reviews-with-genai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b201f565b2390841e3837"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:49:52.089Z"
  createdOn: "2024-12-12T17:40:47.786Z"
llmopsTags:
  - "content-moderation"
  - "regulatory-compliance"
  - "structured-output"
  - "prompt-engineering"
  - "model-optimization"
  - "error-handling"
  - "monitoring"
  - "databases"
  - "documentation"
  - "security"
  - "compliance"
  - "openai"
  - "databricks"
  - "amazon-aws"
industryTags: "automotive"
company: "Edmunds"
summary: "Edmunds transformed their dealer review moderation process from a manual system taking up to 72 hours to an automated GenAI solution using GPT-4 through Databricks Model Serving. The solution processes over 300 daily dealer quality-of-service reviews, reducing moderation time from days to minutes and requiring only two moderators instead of a larger team. The implementation included careful prompt engineering and integration with Databricks Unity Catalog for improved data governance."
link: "https://www.databricks.com/customers/edmunds/gen-ai"
year: 2024
seo:
  title: "Edmunds: Auto-Moderating Car Dealer Reviews with GenAI - ZenML LLMOps Database"
  description: "Edmunds transformed their dealer review moderation process from a manual system taking up to 72 hours to an automated GenAI solution using GPT-4 through Databricks Model Serving. The solution processes over 300 daily dealer quality-of-service reviews, reducing moderation time from days to minutes and requiring only two moderators instead of a larger team. The implementation included careful prompt engineering and integration with Databricks Unity Catalog for improved data governance."
  canonical: "https://www.zenml.io/llmops-database/auto-moderating-car-dealer-reviews-with-genai"
  ogTitle: "Edmunds: Auto-Moderating Car Dealer Reviews with GenAI - ZenML LLMOps Database"
  ogDescription: "Edmunds transformed their dealer review moderation process from a manual system taking up to 72 hours to an automated GenAI solution using GPT-4 through Databricks Model Serving. The solution processes over 300 daily dealer quality-of-service reviews, reducing moderation time from days to minutes and requiring only two moderators instead of a larger team. The implementation included careful prompt engineering and integration with Databricks Unity Catalog for improved data governance."
---

## Overview

Edmunds is a well-established online car shopping platform that provides consumers with reviews, pricing information, and dealer quality assessments to help them make informed vehicle purchasing decisions. The company processes over 300 daily reviews covering both vehicle quality and dealer service quality. This case study focuses on how Edmunds implemented generative AI to automate their dealer review moderation process, moving from a manual, time-intensive workflow to an LLM-powered solution running on the Databricks Data Intelligence Platform.

## The Problem

The core challenge Edmunds faced was the manual moderation of dealer service reviews before publication. With hundreds of reviews submitted daily, the manual process created significant bottlenecks. According to Suresh Narasimhan, Technical Consultant on the API platform team at Edmunds, moderators had to manually comb through all reviews to assess their quality and appropriateness, with turnaround times reaching up to 72 hours. This delay meant prospective car buyers weren't getting timely access to dealer quality information when making purchasing decisions.

Beyond the time constraints, the moderation task itself was complex. Reviews needed to be assessed specifically for "dealer quality of service" content, and moderators had to identify ambiguous reviews that might not clearly fit the intended category. The rules governing what constituted an acceptable review were nuanced and difficult to codify in traditional rule-based systems.

Additionally, Edmunds faced significant data governance overhead. Staff Engineer Sam Shuster noted that their use of IAM roles for data access governance resulted in coarse access controls with substantial operational overhead. The team also lacked visibility into pipeline dependencies without extensive searches through GitLab and Slack, making it difficult to understand the impact of changes across their data infrastructure.

## Initial Approaches and Challenges

Before arriving at their current solution, the Edmunds team experimented with several approaches that are instructive for understanding common LLMOps challenges:

The team first attempted to fine-tune an off-the-shelf model to handle the moderation task. Narasimhan reported that "the results were not great" because the moderation rules were too complex, and even fine-tuning could not deliver the accuracy they needed. This is a common finding in production LLM deployments—fine-tuning is not always the silver bullet it might appear to be, especially for tasks requiring nuanced rule application across many edge cases.

Following the fine-tuning approach, they experimented with prompt engineering using off-the-shelf models. While this showed more promise, they encountered a significant operational challenge: it was difficult to compare outputs across different models. Without a unified environment for model experimentation, switching between providers and evaluating relative performance became cumbersome. This highlights an important LLMOps consideration—the tooling for model comparison and evaluation is often as important as the models themselves.

## The Production Solution

Edmunds ultimately settled on a solution using GPT-4 accessed through Databricks Model Serving endpoints with extensive custom prompting. This architecture choice reflects several LLMOps best practices:

**Unified Model Serving Layer**: Databricks Model Serving consolidates access to widely-used third-party LLM providers alongside custom-served models within a single environment. This allowed Edmunds to easily switch between commercially available models and compare results to determine which performed best for their specific use case. The unified interface also simplified permission management and rate limiting—critical operational concerns for production LLM deployments.

**Prompt Engineering Over Fine-Tuning**: Rather than continuing to invest in fine-tuning, which had proven ineffective for their complex rule set, Edmunds captured all moderation rules within custom prompts. This approach proved more flexible for handling edge cases. The prompts direct the model to accept or reject reviews, delivering decisions in seconds rather than the hours previously required.

**API-Based Architecture**: By calling GPT-4 through Databricks Model Serving endpoints, Edmunds created a clean separation between their application logic and the underlying model. This architecture facilitates model upgrades, A/B testing, and fallback mechanisms—all important considerations for production LLM systems.

## Data Governance and Infrastructure

A significant portion of this case study focuses on the data governance improvements Edmunds achieved by migrating to Databricks Unity Catalog. While not directly an LLMOps concern, this infrastructure work enabled and supported their GenAI implementation:

The team migrated from their existing workspaces to Unity Catalog to address data governance challenges. Because they used external tables for most of their important pipelines, they created metadata sync scripts to keep tables synchronized with Unity Catalog without having to manage the actual data synchronization themselves. This migration was rolled out gradually, with core pipelines migrated first and other teams adopting the new Unity Catalog cluster policies over the course of a year.

Unity Catalog provided several improvements relevant to their LLM-powered workflows:

- **Fine-grained access control**: The ability to manage table and S3 access more like a traditional database enabled much more granular permissions than their previous IAM-based approach. For LLM applications processing user-generated content, appropriate access controls are essential.

- **Documented lineage**: Having programmatically queryable lineage means fewer incidents caused by pipeline changes breaking downstream jobs. This is particularly important when LLM-powered features depend on specific data inputs.

- **Account-level metastore**: Centralized metadata management simplifies operations and provides better visibility into data assets used across the organization, including those feeding LLM applications.

## Results and Metrics

The case study reports several concrete outcomes:

- **Time savings**: The team estimates 3-5 hours saved per week through auto-moderation of dealer reviews.
- **Staffing efficiency**: Only two moderators are now needed to handle 300+ daily reviews, freeing resources for other tasks.
- **Speed improvements**: Reviews can now be analyzed and published in minutes rather than the previous three-day turnaround.

The Unity Catalog migration also delivered benefits including improved auditing, compliance, security, reduced operational overhead, and better data discovery. From a security perspective, data access control was simplified while actually delivering better access controls—an important consideration for systems processing user-generated content.

## Critical Assessment

While the case study presents impressive results, a few observations warrant mention:

The source is a Databricks customer story, so it naturally emphasizes the benefits of the Databricks platform. The specific contribution of Databricks Model Serving versus simply using the OpenAI API directly isn't entirely clear from the technical details provided. The main stated benefit—easier model switching and comparison—is valuable but not unique to Databricks.

The decision to use GPT-4 with extensive custom prompts rather than fine-tuning is pragmatic but comes with operational considerations not discussed, such as prompt version control, prompt testing and validation, and the ongoing cost of sending detailed system prompts with every API call.

The 3-5 hours per week savings, while meaningful, represents a relatively modest efficiency gain. The more significant impact appears to be the speed improvement from days to seconds, which directly affects the user experience for car shoppers seeking timely dealer reviews.

## Future Directions

Greg Rokita, VP of Technology at Edmunds, indicates that generative AI will continue to influence the business with Databricks playing an ongoing role. He frames Databricks as unifying data warehousing and AI/ML on a "single timeline that includes both historical information and forecasts." Following the success of this initial implementation, Edmunds plans to expand their AI-driven approach across all their reviews, suggesting the dealer review moderation project served as a successful proof of concept for broader LLM adoption.

This case study demonstrates a common pattern in enterprise LLM adoption: starting with a focused, well-defined use case (content moderation), iterating through multiple approaches (fine-tuning, then prompt engineering), leveraging a unified platform for model experimentation and serving, and planning expansion to additional use cases based on initial success.