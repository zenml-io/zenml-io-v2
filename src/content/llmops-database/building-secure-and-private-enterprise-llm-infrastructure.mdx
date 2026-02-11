---
title: "Building Secure and Private Enterprise LLM Infrastructure"
slug: "building-secure-and-private-enterprise-llm-infrastructure"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f4034ebc20b1c13211c9b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:39:51.738Z"
  createdOn: "2024-11-21T14:14:12.289Z"
llmopsTags:
  - "aws"
  - "compliance"
  - "cost-optimization"
  - "databases"
  - "error-handling"
  - "fallback-strategies"
  - "guardrails"
  - "latency-optimization"
  - "legacy-system-integration"
  - "load-balancing"
  - "microsoft"
  - "monitoring"
  - "rag"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "serverless"
  - "system-prompts"
industryTags: "tech"
company: "Slack"
summary: "Slack implemented AI features by developing a secure architecture that ensures customer data privacy and compliance. They used AWS SageMaker to host LLMs in their VPC, implemented RAG instead of fine-tuning models, and maintained strict data access controls. The solution resulted in 90% of AI-adopting users reporting increased productivity while maintaining enterprise-grade security and compliance requirements."
link: "https://slack.engineering/how-we-built-slack-ai-to-be-secure-and-private/"
year: 2024
seo:
  title: "Slack: Building Secure and Private Enterprise LLM Infrastructure - ZenML LLMOps Database"
  description: "Slack implemented AI features by developing a secure architecture that ensures customer data privacy and compliance. They used AWS SageMaker to host LLMs in their VPC, implemented RAG instead of fine-tuning models, and maintained strict data access controls. The solution resulted in 90% of AI-adopting users reporting increased productivity while maintaining enterprise-grade security and compliance requirements."
  canonical: "https://www.zenml.io/llmops-database/building-secure-and-private-enterprise-llm-infrastructure"
  ogTitle: "Slack: Building Secure and Private Enterprise LLM Infrastructure - ZenML LLMOps Database"
  ogDescription: "Slack implemented AI features by developing a secure architecture that ensures customer data privacy and compliance. They used AWS SageMaker to host LLMs in their VPC, implemented RAG instead of fine-tuning models, and maintained strict data access controls. The solution resulted in 90% of AI-adopting users reporting increased productivity while maintaining enterprise-grade security and compliance requirements."
---

## Overview

Slack, the enterprise collaboration platform owned by Salesforce, embarked on building AI-powered features (collectively called "Slack AI") that leverage large language models while adhering to their stringent data security and privacy requirements. The case study, published in April 2024, provides insights into how Slack approached the architectural and operational challenges of deploying LLMs in a production environment that serves enterprise customers with strict compliance needs.

Slack positions itself as a "conservative technologist" that takes a rigorous approach to adopting new infrastructure categories. Their experience with machine learning dates back to 2016, but the rapid advancement of commercially available LLMs presented both an opportunity and a challenge: how to deliver AI features that address user pain points (information overload, difficulty finding content) while maintaining their reputation for data stewardship.

## Core Principles Driving Architecture

Before diving into implementation, Slack established four guiding principles specifically for their AI implementation:

- Customer data never leaves Slack's trust boundary
- They do not train LLMs on customer data
- Slack AI only operates on data the user can already see
- Slack AI upholds all enterprise-grade security and compliance requirements

These principles shaped every subsequent architectural decision and represent a thoughtful approach to LLMOps in enterprise contexts where data governance is paramount.

## Infrastructure and Hosting Strategy

One of the most significant LLMOps decisions Slack made was around model hosting. The standard industry approach of calling hosted foundational model services directly was incompatible with their requirements, particularly their FedRAMP Moderate authorization which prohibits sending customer data outside their trust boundary.

Slack found a creative solution through AWS, which acts as a "trusted broker" between foundational model providers and customers. This arrangement allows Slack to host closed-source LLMs in an escrow VPC, meaning they control the data lifecycle while using top-tier commercial models. This is an important pattern for enterprises that want access to leading foundational models but cannot send data to third-party APIs.

The case study notes that most foundational models are closed-source since "their models are their secret sauce," making traditional self-hosting difficult. The AWS escrow approach allows Slack to guarantee that model providers have no access to customer data while still leveraging advanced model capabilities. This represents a pragmatic middle ground in the LLMOps landscape between fully self-hosted open-source models and direct API calls to model providers.

## Retrieval Augmented Generation (RAG) Architecture

A cornerstone of Slack AI's architecture is the use of Retrieval Augmented Generation (RAG) rather than fine-tuning or training models on customer data. This decision was driven by privacy considerations: Slack has long-standing principles that data should not leak across workspaces and that customers should have choice around data practices. Given what they describe as the "young state" of generative AI, they felt they couldn't make strong enough guarantees about these practices if they trained models on customer data.

With RAG, all context needed to perform a task is included within each request, making interactions stateless. For example, when summarizing a channel, Slack sends the LLM a prompt containing the messages to be summarized along with instructions. This statelessness provides both privacy benefits (no data retention by the model) and product benefits (results are grounded in company-specific knowledge rather than the public internet).

However, the case study acknowledges RAG's operational challenges:

- Model selection is constrained by context window requirements—models need large enough context windows to accommodate all relevant data
- Latency increases with context size as models need to process more data
- Channel summarization can involve substantial amounts of data

Slack evaluated multiple models to find one with a large context window and acceptable latency for their summarization and search use cases. They also combined prompt tuning with chaining traditional ML models to generative models to improve results. The article notes optimism that RAG is becoming "easier and faster with each iteration of models" as context windows grow and models improve at synthesizing information across large contexts.

## Access Control and Authorization

Slack implemented a critical constraint that AI features can only access data the requesting user can already see. This means Slack AI's search never surfaces results that standard search wouldn't show, and summaries never include content the user couldn't read in the channel directly.

Implementation leverages the requesting user's Access Control List (ACLs) when fetching data and reuses existing libraries that fetch data for display in channels or search results. While the team notes this wasn't technically difficult, it required an explicit architectural choice to build on top of existing core feature sets rather than creating separate data access paths.

An additional privacy measure ensures that only the user who invokes Slack AI can see the AI-generated output, reinforcing the principle of minimal data exposure.

## Compliance Integration

Slack AI integrates with the platform's existing enterprise compliance and security offerings, following a "least data" principle: storing only data needed to complete tasks, and only for necessary durations.

Where possible, outputs are ephemeral—conversation summaries and search answers generate point-in-time responses that aren't stored on disk. For cases where persistence is necessary, Slack built special support to maintain awareness of the relationship between derived content (like summaries) and source messages.

A notable example is Data Loss Protection (DLP) integration: if a message is tombstoned due to DLP policies, any summaries derived from that message are automatically invalidated. This extends existing administrative controls to AI-generated content seamlessly.

Other compliance capabilities mentioned include:
- Encryption Key Management
- International Data Residency
- FedRAMP Moderate authorization

## Model Evaluation and Prompt Engineering

The case study mentions that Slack engaged in "prompt tuning" and evaluation of multiple models, though specific details are not provided. The authors note that this is just the beginning of their story, promising future content on "how we build prompts, evaluate models, or handle spiky demand."

This suggests an ongoing operational practice around model evaluation and prompt engineering that is typical of mature LLMOps environments, though the specifics remain undisclosed in this particular article.

## Results and Claimed Benefits

Slack reports that 90% of users who adopted AI features reported higher productivity compared to those who didn't. While this is a strong claim, the case study doesn't provide detailed methodology for this finding, so it should be interpreted as a general indicator of user satisfaction rather than a rigorous measure of productivity gains.

## Critical Assessment

The case study presents a thoughtful, privacy-first approach to LLMOps that will resonate with enterprises facing similar constraints. However, several aspects deserve critical consideration:

The AWS escrow VPC arrangement, while creative, still relies on trust in AWS as the broker. Organizations with stricter requirements may need to evaluate whether this meets their specific compliance needs.

The decision to use RAG exclusively rather than any form of fine-tuning trades off potential quality improvements for privacy guarantees. As the generative AI industry matures, this trade-off may shift.

The claimed 90% productivity improvement lacks methodological transparency, making it difficult to assess its validity or generalizability.

The case study is notably vague on specific model choices, prompt engineering practices, and evaluation methodologies—likely for competitive reasons, but limiting its utility as a technical reference.

Despite these caveats, Slack's approach represents a mature pattern for enterprise LLMOps that prioritizes trust and compliance while still delivering AI capabilities. Their emphasis on reusing existing infrastructure (ACLs, compliance systems) rather than building parallel systems is a pragmatic approach that other organizations could learn from.