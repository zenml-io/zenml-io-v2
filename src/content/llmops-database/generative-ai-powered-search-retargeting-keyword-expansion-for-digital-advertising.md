---
title: "Generative AI-Powered Search Retargeting Keyword Expansion for Digital Advertising"
slug: "generative-ai-powered-search-retargeting-keyword-expansion-for-digital-advertising"
draft: false
llmopsTags:
  - "embeddings"
  - "semantic-search"
  - "prompt-engineering"
  - "guardrails"
  - "elasticsearch"
  - "databases"
  - "serverless"
  - "compliance"
  - "scalability"
  - "anthropic"
  - "meta"
  - "amazon-aws"
industryTags: "media-entertainment"
company: "Yahoo"
summary: "Yahoo enhanced their Search Retargeting (SRT) capabilities within their Demand-Side Platform (DSP) by replacing a legacy Word2Vec and locality-sensitive hashing approach with LLM-powered keyword expansion using Amazon Bedrock. The legacy system suffered from outdated vocabulary, limited semantic understanding, and phrase-based rather than entity-based searches that sometimes resulted in zero keyword expansion. By implementing Anthropic's Claude 3.5 Sonnet v2 through Amazon Bedrock, Yahoo achieved up to 600x increase in keyword expansion rates, 5x growth in addressable audience reach, and a fivefold improvement in median broad expansion ratio. The solution included guardrails using embedding-based similarity scoring and sensitive keyword filtering to maintain quality and compliance, launching in production in Q1 2025."
link: "https://aws.amazon.com/blogs/machine-learning/how-yahoo-enhances-search-retargeting-using-amazon-bedrock/"
year: 2026
seo:
  title: "Yahoo: Generative AI-Powered Search Retargeting Keyword Expansion for Digital Advertising - ZenML LLMOps Database"
  description: "Yahoo enhanced their Search Retargeting (SRT) capabilities within their Demand-Side Platform (DSP) by replacing a legacy Word2Vec and locality-sensitive hashing approach with LLM-powered keyword expansion using Amazon Bedrock. The legacy system suffered from outdated vocabulary, limited semantic understanding, and phrase-based rather than entity-based searches that sometimes resulted in zero keyword expansion. By implementing Anthropic's Claude 3.5 Sonnet v2 through Amazon Bedrock, Yahoo achieved up to 600x increase in keyword expansion rates, 5x growth in addressable audience reach, and a fivefold improvement in median broad expansion ratio. The solution included guardrails using embedding-based similarity scoring and sensitive keyword filtering to maintain quality and compliance, launching in production in Q1 2025."
  canonical: "https://www.zenml.io/llmops-database/generative-ai-powered-search-retargeting-keyword-expansion-for-digital-advertising"
  ogTitle: "Yahoo: Generative AI-Powered Search Retargeting Keyword Expansion for Digital Advertising - ZenML LLMOps Database"
  ogDescription: "Yahoo enhanced their Search Retargeting (SRT) capabilities within their Demand-Side Platform (DSP) by replacing a legacy Word2Vec and locality-sensitive hashing approach with LLM-powered keyword expansion using Amazon Bedrock. The legacy system suffered from outdated vocabulary, limited semantic understanding, and phrase-based rather than entity-based searches that sometimes resulted in zero keyword expansion. By implementing Anthropic's Claude 3.5 Sonnet v2 through Amazon Bedrock, Yahoo achieved up to 600x increase in keyword expansion rates, 5x growth in addressable audience reach, and a fivefold improvement in median broad expansion ratio. The solution included guardrails using embedding-based similarity scoring and sensitive keyword filtering to maintain quality and compliance, launching in production in Q1 2025."
notion:
  pageId: "3b4f8dff-2538-8093-948b-faf9b009b740"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:37:00.000Z"
  lastEditedTime: "2026-08-06T11:37:00.000Z"
  publishedAt: "2026-08-06T11:42:05Z"
---

## Overview

Yahoo's case study demonstrates a production LLMOps implementation for enhancing Search Retargeting (SRT) within their omnichannel Demand-Side Platform (DSP). The core business problem centered on connecting user search intent with relevant advertising experiences across channels. Search activity represents one of the strongest signals of user intent, making it critical for advertisers to reach audiences based on demonstrated interests and behaviors. The Yahoo DSP serves as the platform through which advertisers purchase ad inventory across multiple exchanges and channels, with audience segments being a fundamental concept—groups of users sharing specific interests, demographics, or behaviors that can be targeted collectively.

The legacy system relied on Word2Vec embedding models combined with locality-sensitive hashing (LSH) to expand advertiser-provided keywords. This multi-step process involved canonicalizing keywords, generating embeddings, indexing them, performing LSH searches, filtering sensitive terms, and ranking results. However, this approach had critical limitations including outdated vocabulary that didn't reflect current terminology, a focus on phrase-based rather than entity-based searches, reliance on syntactic rather than semantic similarity, and in some cases complete failure to generate any keyword expansions.

## Architecture Evolution

The original SRT workflow began with advertisers defining audience segments through target keyword sets, with this metadata stored in SQL databases. The backend system performed keyword expansion to generate semantically related terms, with both original and expanded keyword sets persisted in Amazon OpenSearch Service clusters. A separate Batch Scoring workflow evaluated Yahoo users' search histories against this segment metadata to determine segment membership and targeting eligibility.

The modernized architecture introduces Amazon Bedrock as the central component for generative AI-powered keyword expansion. The system maintains the overall workflow structure but replaces the Word2Vec + LSH expansion logic with LLM-based generation. This architectural decision reflects a pragmatic approach to LLMOps—rather than rebuilding the entire system, Yahoo integrated generative AI at the specific point where it could deliver maximum value while preserving existing data storage, user scoring, and targeting infrastructure.

## LLM Selection and Evaluation Process

Yahoo conducted a thorough model evaluation process using Amazon SageMaker Studio, prototyping and assessing several foundation models including Amazon Titan, Meta Llama, and Anthropic's Claude variants. This evaluation phase represents a critical LLMOps practice—systematic comparison of multiple models against domain-specific criteria before production deployment. The evaluation focused on two primary metrics: expansion ratio (how many related keywords the model could generate from seed keywords) and semantic similarity (how closely the expanded keywords related to the original intent).

Anthropic's Claude 3.5 Sonnet v2 emerged as the optimal choice, balancing expansion capabilities with semantic relevance. The performance improvements were substantial: median broad expansion ratio improved fivefold compared to the legacy LSH method, and maximum expansion ratio doubled even under strict similarity thresholds. In cases where the legacy system generated zero expansions, Claude frequently produced hundreds or thousands of relevant keywords. This represents a meaningful production outcome rather than just laboratory performance gains.

During evaluation, the team observed hallucination behaviors from the LLMs—a common challenge in production LLM deployments. Rather than accepting this limitation, they designed a verification mechanism into the production workflow. This reflects mature LLMOps practice: acknowledging model limitations and building system-level safeguards rather than expecting perfect model behavior.

## Guardrails and Quality Control

The production system implements a multi-layered guardrail strategy that addresses both semantic quality and policy compliance. After the LLM generates expanded keywords, each keyword is converted into an embedding representation and compared with embeddings of the original seed keywords. Keywords falling below a defined similarity threshold are filtered out, ensuring only semantically relevant terms are retained. This embedding-based verification step serves as a critical quality gate between raw LLM output and production use.

The similarity scoring approach uses cosine similarity between embeddings, with configurable thresholds that allow the system to balance expansion breadth against relevance precision. The case study indicates that even under strict similarity thresholds, the generative AI approach significantly outperformed the legacy system, suggesting robust semantic understanding from the Claude model.

Beyond semantic relevance, the system implements sensitive keyword filtering at two points in the pipeline: before LLM inference to avoid expanding undesirable seed terms, and after inference to remove any sensitive terms that may have been generated. This dual-stage filtering reflects the regulatory and brand safety requirements inherent in computational advertising. The case study mentions additional considerations including segment denylists, user privacy preferences, and policy compliance requirements, though specific implementation details are not provided.

This guardrailing architecture represents a production-ready approach to LLMOps: the system doesn't rely solely on the LLM's training to avoid problematic outputs, but instead implements explicit verification and filtering layers. This allows the organization to benefit from the LLM's generative capabilities while maintaining control over what ultimately reaches production advertising systems.

## Infrastructure and Deployment Considerations

Yahoo's selection of Amazon Bedrock as the deployment platform reflects several pragmatic LLMOps considerations. Amazon Bedrock provides serverless access to multiple foundation models without requiring the organization to build or manage model hosting infrastructure. This reduces operational overhead and allows engineering teams to focus on business logic and integration rather than model serving infrastructure.

The serverless nature of Amazon Bedrock means Yahoo doesn't need to provision GPU capacity, implement model loading and caching strategies, or handle scaling during traffic spikes. For a system processing keyword expansion for numerous advertiser campaigns, this operational simplicity represents significant value. The case study specifically mentions that Amazon Bedrock supports both batch and real-time inference options, providing flexibility in how the system processes keyword expansion workloads.

Model upgrades represent another operational consideration in production LLMOps. The case study notes that Amazon Bedrock's architecture makes switching to newer model versions a configuration change rather than a complex migration. This is particularly relevant given the rapid pace of foundation model improvement—the system can adopt Claude 3.5 Sonnet v3 or alternative models without significant engineering effort when performance improvements justify a change.

The production deployment launched in Q1 2025, indicating approximately 3-6 months from the time of the blog post (July 2026) to production. This timeline suggests a measured deployment approach rather than rushing generative AI into production, allowing for proper evaluation, guardrail development, and integration testing.

## Integration with Existing Systems

The case study demonstrates thoughtful integration of generative AI into existing production infrastructure rather than building entirely new systems. The keyword expansion enhancement slots into the established SRT workflow, consuming seed keywords from SQL databases, generating expansions via Amazon Bedrock, and persisting results to Amazon OpenSearch Service clusters. The downstream Batch Scoring workflow that evaluates user search histories against segment metadata remains unchanged.

This integration pattern reflects mature LLMOps practice: identifying specific workflow steps where generative AI delivers value and integrating at those points rather than attempting wholesale system replacement. The approach minimizes risk, reduces implementation complexity, and allows for gradual rollout and validation. The system maintains existing data flows, monitoring infrastructure, and operational procedures while enhancing a specific capability.

The use of Amazon OpenSearch Service for storing both original and expanded keyword sets indicates the system needs to support efficient retrieval and matching operations at scale. The case study mentions "large-scale distributed systems" and notes that one of the authors has experience with "Big Data ecosystems," suggesting the system processes substantial volumes of search queries and user data.

## Production Outcomes and Business Impact

The case study reports specific production metrics that demonstrate meaningful business impact. The up to 600x increase in keyword expansion rates and up to 5x growth in addressable audience reach represent substantial improvements in the system's core function—helping advertisers reach relevant users based on search behavior. These metrics are qualified with "up to," suggesting variability across different advertiser campaigns and keyword sets rather than uniform improvement.

From an advertiser perspective, the enhanced keyword expansion delivers broader and more precise audience reach. The LLM-powered expansion increases the candidate keyword pool while quality filtering maintains relevance, leading to campaigns that better align with user intent. The case study claims this translates to higher relevancy, stronger engagement, and improved conversion rates, though specific conversion improvement metrics are not provided.

The business value proposition combines scale (reaching more users) with precision (reaching more relevant users), which is the fundamental challenge in computational advertising. The semantic understanding capabilities of large language models appear well-suited to this domain, as understanding the relationship between "running shoes" and "marathon training gear" requires contextual knowledge beyond simple word embeddings.

## Technical Considerations and Limitations

While the case study presents a success story, it's important to note what information is not provided. There are no specific details about prompt engineering approaches used to elicit quality keyword expansions from Claude, though this is typically a critical factor in production LLM performance. The case study doesn't discuss inference latency or cost, both of which are important considerations for production deployment at scale. Processing keyword expansion for numerous advertiser campaigns could involve significant API costs and require attention to rate limiting and error handling.

The case study mentions that the system uses embeddings for similarity scoring but doesn't specify which embedding model is used or whether it's the same model that was used in the legacy Word2Vec approach. The choice of embedding model for verification could significantly impact the quality of the guardrail mechanism. Similarly, while the case study mentions configurable similarity thresholds, it doesn't provide guidance on how these thresholds were determined or how they might vary across different advertiser use cases.

The production deployment timeline (Q1 2025 launch reported in a July 2026 blog post) suggests the system has been in production for 15-18 months at the time of writing, which should provide substantial operational learnings. However, the case study doesn't discuss operational challenges encountered in production, model performance drift over time, or how the system handles edge cases and errors.

## LLMOps Maturity Indicators

This case study demonstrates several indicators of mature LLMOps practice. The systematic model evaluation across multiple foundation models using Amazon SageMaker Studio shows structured experimentation rather than ad-hoc model selection. The implementation of embedding-based verification as a guardrail mechanism indicates awareness of LLM limitations and proactive mitigation. The dual-stage sensitive keyword filtering reflects understanding of domain-specific requirements in production advertising systems.

The choice to integrate generative AI into an existing workflow rather than building greenfield demonstrates pragmatic engineering judgment. The use of managed services (Amazon Bedrock) rather than building custom model serving infrastructure shows appropriate build-versus-buy decisions for capabilities outside core competencies. The production deployment with specific business metrics indicates the system moved beyond proof-of-concept to deliver measurable value.

However, the case study reads somewhat as marketing content for AWS services, which is reasonable given it's published on the AWS blog. The lack of discussion about challenges, limitations, or tradeoffs makes it difficult to assess the full complexity of the production implementation. Real production LLM systems typically encounter issues with edge cases, cost management, latency requirements, and model behavior variability that aren't reflected in this narrative.

## Broader Implications for LLMOps

This case study illustrates several broader patterns relevant to production LLM deployments. First, it demonstrates that generative AI can deliver substantial value in narrow, well-defined tasks (keyword expansion) without requiring artificial general intelligence or perfect language understanding. The system doesn't need to understand advertising strategy or consumer psychology—it just needs to generate semantically related keywords, which is well within current LLM capabilities.

Second, the importance of domain-specific guardrails and verification mechanisms is evident. The embedding-based similarity scoring and sensitive keyword filtering are essential to making the system production-ready for the advertising domain. Generic LLM capabilities are necessary but not sufficient—production systems require additional layers tailored to domain requirements.

Third, the serverless deployment model through Amazon Bedrock represents an increasingly common pattern for LLMOps. Rather than building model serving infrastructure, organizations can access foundation models through managed APIs, reducing operational complexity and allowing faster iteration. This pattern is particularly appropriate for systems where model inference is not latency-critical and where batch processing is viable.

Finally, the case study demonstrates that production LLM systems can deliver measurable business value in established industries with existing infrastructure. The advertising technology space has decades of accumulated systems and data, yet generative AI found a clear integration point that substantially improved system performance. This suggests opportunities for similar enhancements across many production systems that involve language understanding or generation tasks.
