---
title: "RAG-Based Industry Classification System for Financial Services"
slug: "rag-based-industry-classification-system-for-financial-services"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "690a10d93978db50f61b8785"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:25:48.240Z"
  createdOn: "2025-11-04T14:42:33.502Z"
llmopsTags:
  - "classification"
  - "data-cleaning"
  - "data-integration"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "error-handling"
  - "system-prompts"
  - "evals"
  - "databases"
  - "monitoring"
  - "guardrails"
  - "documentation"
  - "cache"
industryTags: "finance"
company: "Ramp"
summary: "Ramp, a financial services company, replaced their fragmented homegrown industry classification system with a standardized NAICS-based taxonomy powered by an in-house RAG model. The old system relied on stitched-together third-party data and multiple non-auditable sources of truth, leading to inconsistent, overly broad, and sometimes incorrect business categorizations. By building a custom RAG system that combines embeddings-based retrieval with LLM-based re-ranking, Ramp achieved significant improvements in classification accuracy (up to 60% in retrieval metrics and 5-15% in final prediction accuracy), gained full control over the model's behavior and costs, and enabled consistent cross-team usage of industry data for compliance, risk assessment, sales targeting, and product analytics."
link: "https://engineering.ramp.com/post/industry_classification"
year: 2025
seo:
  title: "Ramp: RAG-Based Industry Classification System for Financial Services - ZenML LLMOps Database"
  description: "Ramp, a financial services company, replaced their fragmented homegrown industry classification system with a standardized NAICS-based taxonomy powered by an in-house RAG model. The old system relied on stitched-together third-party data and multiple non-auditable sources of truth, leading to inconsistent, overly broad, and sometimes incorrect business categorizations. By building a custom RAG system that combines embeddings-based retrieval with LLM-based re-ranking, Ramp achieved significant improvements in classification accuracy (up to 60% in retrieval metrics and 5-15% in final prediction accuracy), gained full control over the model's behavior and costs, and enabled consistent cross-team usage of industry data for compliance, risk assessment, sales targeting, and product analytics."
  canonical: "https://www.zenml.io/llmops-database/rag-based-industry-classification-system-for-financial-services"
  ogTitle: "Ramp: RAG-Based Industry Classification System for Financial Services - ZenML LLMOps Database"
  ogDescription: "Ramp, a financial services company, replaced their fragmented homegrown industry classification system with a standardized NAICS-based taxonomy powered by an in-house RAG model. The old system relied on stitched-together third-party data and multiple non-auditable sources of truth, leading to inconsistent, overly broad, and sometimes incorrect business categorizations. By building a custom RAG system that combines embeddings-based retrieval with LLM-based re-ranking, Ramp achieved significant improvements in classification accuracy (up to 60% in retrieval metrics and 5-15% in final prediction accuracy), gained full control over the model's behavior and costs, and enabled consistent cross-team usage of industry data for compliance, risk assessment, sales targeting, and product analytics."
---

## Overview

Ramp, a financial services company focused on saving customers time and money, faced a critical data infrastructure challenge: their industry classification system was fragmented, inconsistent, and non-auditable. The case study describes how they migrated from a homegrown taxonomy to a standardized NAICS-based system powered by an in-house Retrieval-Augmented Generation (RAG) model. This is a production LLMOps case study that demonstrates careful system design, rigorous evaluation methodology, and thoughtful operational considerations for deploying LLMs in a business-critical context.

The business need for accurate industry classification at Ramp is multifaceted, cutting across compliance requirements, portfolio monitoring, sales targeting, and product analytics. When different teams use different taxonomies or when classifications are inconsistent, it creates friction in decision-making and makes external partner communication difficult. The old system suffered from four key problems: obviously incorrect categories, overly generic classifications, inconsistent categorization of similar businesses, and lack of auditability or interpretability. For instance, WizeHire, a hiring platform, was classified as "Professional Services"—a category so broad it included law firms, dating apps, and consulting firms, making it unhelpful for risk profiling or sales targeting.

## Technical Architecture and Design Decisions

Ramp chose to build a custom RAG system rather than rely on third-party solutions, citing their unique needs with complex data and the desire for full control over the model's behavior, iteration speed, and costs. The RAG architecture consists of three main stages: calculating text embeddings of queries (businesses) and a knowledge base (NAICS codes), computing similarity scores to generate recommendations, and using an LLM to make a final prediction from the filtered recommendations.

A key architectural benefit highlighted is the ability to constrain LLM outputs to valid NAICS codes from the knowledge base, effectively transforming an open-ended generation problem into a multiple-choice question. This is an important LLMOps pattern for production systems where output validity is critical. The system design includes several production-ready components: internal services handle embeddings and LLM prompt evaluations, pre-computed knowledge base embeddings are stored in ClickHouse for fast similarity-based retrieval, and intermediate results are logged via Kafka for diagnostics and iteration.

The system also implements guardrails to handle edge cases. While the RAG framework constrains outputs, the team validates that LLM-generated NAICS codes are valid to filter out "bad" hallucinations. Interestingly, they note that some hallucinations are actually beneficial—cases where the LLM predicts the correct code despite it not being in the recommendations—demonstrating a nuanced understanding of LLM behavior in production.

## Evaluation and Metrics Strategy

One of the strongest aspects of this case study from an LLMOps perspective is the thoughtful approach to metrics and evaluation. The team recognized that their multi-stage system required stage-specific metrics that align with the overall goal without interfering with each other. For the first stage (recommendation generation), they used accuracy at k (acc@k): how often the correct NAICS code appears in the top k recommendations. This represents a ceiling on full system performance, since the LLM cannot select a code that isn't recommended.

For the second stage (final prediction selection), they defined a custom fuzzy-accuracy metric that accounts for the hierarchical nature of NAICS codes. Since NAICS codes are hierarchical (six digits, where leading digits represent broader categories), a prediction of "123499" when the correct answer is "123456" should score better than a completely wrong prediction like "999999" because the first four digits are correct. This custom metric reflects domain knowledge and business requirements, which is a hallmark of mature LLMOps practice.

The team profiled performance across different configurations and created acc@k curves to visualize tradeoffs. They achieved up to 60% improvement in acc@k through optimizations in the retrieval stage and identified economical embedding models that performed comparably to larger models without the resource requirements. For the LLM stage, hyperparameter optimization yielded 5-15% improvements in fuzzy accuracy. These concrete metrics provide evidence of iterative improvement, though the case study would benefit from absolute baseline comparisons to fully assess the claims.

## Hyperparameter Search and Optimization

The case study details extensive hyperparameter tuning across both stages of the RAG pipeline. For the recommendation generation stage, considerations included which business and knowledge base fields to embed, which embedding model to use, and how many recommendations to generate. The team notes important tradeoffs: certain business attributes may be more informative but have higher missing rates, and different embedding models have varying resource requirements that don't necessarily correlate with performance on their specific data.

For the LLM prediction stage, hyperparameters included the number of recommendations to include in the prompt, which fields to include (for both businesses and NAICS codes), prompt variations, number of prompts to use, and structured output schema design. Again, tradeoffs are carefully considered: more recommendations give the LLM a better chance of finding the correct code but increase context size and may degrade performance if the model cannot focus on relevant information. Similarly, longer descriptions help the LLM understand better but significantly increase context size.

The team ultimately chose a two-prompt system to balance these tradeoffs. The first prompt includes many recommendations with less detailed descriptions, asking the LLM to return a short list of most relevant codes. The second prompt then asks the LLM to select the best code from this narrowed list with more detailed context. This staged approach is a sophisticated LLMOps pattern that manages context window constraints while maintaining high accuracy. The system also requests justifications from the LLM to enable auditability and interpretability—critical for a production system handling compliance and risk decisions.

## Production Deployment and Operations

From an operational perspective, the case study demonstrates several LLMOps best practices. The logging of intermediate results via Kafka enables diagnostics of pathological cases and supports iterative prompt improvement. The use of ClickHouse for fast similarity-based retrieval of recommendations suggests attention to latency requirements for online serving. The team emphasizes their ability to "adjust the model on the fly" in response to performance degradation, latency requirements, or cost sensitivity, and notes they can pinpoint where issues arise (retrieval vs. re-ranking) due to their logging infrastructure.

The ownership and control benefits are heavily emphasized: the ability to tune any of dozens of hyperparameters, audit and interpret decisions, and iterate at their own speed rather than being dependent on a third-party vendor's roadmap. While these are legitimate benefits, it's worth noting that building and maintaining in-house systems also carries significant ongoing engineering and operational costs that aren't discussed in detail. The case study presents this as an unambiguous win, but in reality, the build vs. buy decision involves tradeoffs that depend on team size, expertise, and resources.

## Business Impact and Results

The case study provides qualitative evidence of impact through before-and-after examples and stakeholder quotes. Examples show cases where similar businesses (like three different talent recruitment companies) were classified into different categories in the old system but are now correctly grouped under the same NAICS code. Conversely, three businesses in very different industries that were all lumped into "Professional Services" are now properly differentiated. Stakeholder testimonials emphasize improved data quality, satisfaction of industry exclusion requirements for compliance, and enabling business diversification.

However, from a rigorous LLMOps evaluation perspective, the case study lacks some quantitative details. While percentage improvements in intermediate metrics (acc@k and fuzzy accuracy) are provided, absolute accuracy numbers and baseline comparisons to the old system or third-party alternatives are not shared. There's no discussion of error rates, false positive/negative tradeoffs, or how the system performs across different business types or industries. Production metrics like latency, throughput, cost per prediction, or monitoring approaches are not detailed. These omissions may be due to competitive sensitivity but limit the ability to fully assess the claims.

## Critical Assessment and Tradeoffs

While the case study presents an impressive technical implementation, a balanced assessment should acknowledge several considerations. First, the decision to build in-house rather than use third-party solutions is presented as clearly superior due to Ramp's "unique needs," but many companies overestimate their uniqueness and underestimate the total cost of ownership for custom systems. The case study doesn't discuss the engineering resources required to build, deploy, and maintain this system, or compare the development timeline and costs to alternatives.

Second, the RAG approach is well-suited to this classification task because the output space is constrained (valid NAICS codes) and the knowledge base is stable and well-defined. However, the case study doesn't discuss how the system handles edge cases like emerging industries that may not fit neatly into existing NAICS codes, or how it's maintained as the NAICS taxonomy evolves. The two-prompt approach is clever but increases inference costs and latency compared to single-prompt systems.

Third, while the custom fuzzy-accuracy metric is thoughtful, it introduces subjective weighting decisions about how much to credit partial matches at different levels of the hierarchy. The case study doesn't explain how these weights were determined or validated. Additionally, the emphasis on LLM justifications for auditability is positive, but there's no discussion of whether these explanations are faithful (truly reflecting the model's reasoning) or merely plausible-sounding post-hoc rationalizations, which is a known issue with LLM explanations.

## LLMOps Maturity Indicators

Despite these caveats, the case study demonstrates several markers of mature LLMOps practice. The stage-specific evaluation metrics that align with business goals, the systematic hyperparameter search with visualization of tradeoffs, the logging infrastructure for debugging and iteration, the guardrails for handling hallucinations, and the use of structured outputs all suggest a thoughtful production deployment. The two-prompt staged approach shows sophistication in managing LLM context limitations while maintaining performance.

The migration from a fragmented legacy system to a standardized, auditable, and controllable ML-powered solution addresses real business needs across multiple teams. The case study effectively illustrates how RAG can be applied to structured classification problems, not just open-ended question-answering, and demonstrates the value of constraining LLM outputs to valid choices from a knowledge base. For teams considering similar industry classification or taxonomy mapping problems, this case study offers a valuable reference architecture, though implementers should carefully weigh the build vs. buy tradeoffs based on their specific context, resources, and requirements.