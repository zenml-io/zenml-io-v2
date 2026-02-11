---
title: "RAG-Based Industry Classification System for Customer Segmentation"
slug: "rag-based-industry-classification-system-for-customer-segmentation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6876289bd551121dda0f0099"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:14:36.727Z"
  createdOn: "2025-07-15T10:08:27.724Z"
llmopsTags:
  - "classification"
  - "customer-support"
  - "fraud-detection"
  - "regulatory-compliance"
  - "data-analysis"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "few-shot"
  - "system-prompts"
  - "error-handling"
  - "chunking"
  - "databases"
  - "guardrails"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "fastapi"
  - "cache"
industryTags: "finance"
company: "Ramp"
summary: "Ramp faced challenges with inconsistent industry classification across teams using homegrown taxonomies that were inaccurate, too generic, and not auditable. They solved this by building an in-house RAG (Retrieval-Augmented Generation) system that migrated all industry classification to standardized NAICS codes, featuring a two-stage process with embedding-based retrieval and LLM-based selection. The system improved data quality, enabled consistent cross-team communication, and provided interpretable results with full control over the classification process."
link: "https://builders.ramp.com/post/industry_classification"
year: 2025
seo:
  title: "Ramp: RAG-Based Industry Classification System for Customer Segmentation - ZenML LLMOps Database"
  description: "Ramp faced challenges with inconsistent industry classification across teams using homegrown taxonomies that were inaccurate, too generic, and not auditable. They solved this by building an in-house RAG (Retrieval-Augmented Generation) system that migrated all industry classification to standardized NAICS codes, featuring a two-stage process with embedding-based retrieval and LLM-based selection. The system improved data quality, enabled consistent cross-team communication, and provided interpretable results with full control over the classification process."
  canonical: "https://www.zenml.io/llmops-database/rag-based-industry-classification-system-for-customer-segmentation"
  ogTitle: "Ramp: RAG-Based Industry Classification System for Customer Segmentation - ZenML LLMOps Database"
  ogDescription: "Ramp faced challenges with inconsistent industry classification across teams using homegrown taxonomies that were inaccurate, too generic, and not auditable. They solved this by building an in-house RAG (Retrieval-Augmented Generation) system that migrated all industry classification to standardized NAICS codes, featuring a two-stage process with embedding-based retrieval and LLM-based selection. The system improved data quality, enabled consistent cross-team communication, and provided interpretable results with full control over the classification process."
---

## Company Overview and Use Case

Ramp is a financial technology company focused on helping businesses save time and money through corporate expense management and financial automation. The company faced a critical challenge in accurately classifying their customers by industry, which was essential for multiple business functions including compliance, portfolio monitoring, sales targeting, and product analytics. The existing system relied on a patchwork of homegrown taxonomies that created inconsistencies, inaccuracies, and multiple sources of truth across different teams.

The core problem stemmed from Ramp's previous reliance on a non-standard industry classification system that stitched together third-party data, sales-entered information, and customer self-reporting. This homegrown approach suffered from four key issues: obviously incorrect categories, overly generic classifications that provided little value, inconsistent categorization of similar businesses, and lack of auditability or interpretability. For example, WizeHire, a hiring platform, was classified broadly as "Professional Services" - a category so generic it could encompass law firms, dating apps, and consulting firms, making it difficult for sales, marketing, and risk teams to understand and serve the customer effectively.

## Technical Architecture and Implementation

Ramp's solution involved building an in-house RAG (Retrieval-Augmented Generation) system to migrate all industry classification to standardized NAICS (North American Industry Classification System) codes. The RAG architecture consists of three main stages: calculating text embeddings of queries and knowledge base, computing similarity scores to generate recommendations, and using an LLM to make final predictions from filtered recommendations.

The system architecture includes several key components working in concert. Internal services handle embeddings for new businesses and LLM prompt evaluations, while knowledge base embeddings are pre-computed and stored in ClickHouse for fast retrieval using similarity scores. Intermediate results are logged using Kafka to enable diagnosis of pathological cases and prompt iteration. The entire system is designed to constrain LLM outputs to the domain of valid NAICS codes, essentially transforming an open-ended generation problem into a multiple-choice selection task.

## Evaluation and Optimization Strategy

The development team adopted a sophisticated evaluation approach by breaking the multi-stage system into two components with distinct metrics. For the first stage (generating recommendations), they used accuracy at k (acc@k) as the primary metric, measuring how often the correct NAICS code appears in the top k recommendations. This metric represents a performance ceiling for the full system since the LLM cannot select a code that isn't in the recommendations.

For the second stage (final prediction selection), they developed a custom fuzzy-accuracy metric that accounts for the hierarchical nature of NAICS codes. This metric ensures that predictions correct for part of the hierarchy are scored better than completely incorrect predictions. For instance, if the correct code is 123456, a prediction of 123499 receives a better score than 999999 because the first four digits are correct.

The optimization process involved extensive hyperparameter tuning across multiple dimensions. For the recommendation generation stage, they optimized the knowledge base field to embed, query field to embed, embedding model selection, and number of recommendations. They found that optimizations in this stage led to performance improvements of up to 60% in acc@k metrics, while also identifying economical embedding models suitable for production use without sacrificing performance compared to larger models.

## LLM Integration and Prompt Engineering

The second stage of the RAG system involves sophisticated prompt engineering to select final predictions from recommendations. The team implemented a two-prompt system to balance comprehensiveness with focus. In the first prompt, they include many recommendations without the most specific descriptions, asking the LLM to return a small list of the most relevant codes. The second prompt then asks the LLM to choose the best option while providing more detailed context for each code.

This two-stage prompting approach addresses the inherent tension between providing comprehensive options and maintaining LLM focus. Including more recommendations gives the LLM better chances of finding the correct code but increases context size and can degrade performance if the model becomes overwhelmed. The team found that this approach yielded 5-15% improvements in fuzzy accuracy across different parameter configurations.

The system incorporates multiple safeguards against hallucinations and errors. While the RAG framework inherently constrains outputs to valid NAICS codes, they've implemented additional guardrails to filter out invalid predictions. Interestingly, they discovered that the LLM sometimes correctly predicts codes not present in the recommendations, so their validation focuses on filtering "bad" hallucinations while preserving beneficial ones.

## Production Deployment and Monitoring

The production system demonstrates sophisticated LLMOps practices with comprehensive logging and monitoring capabilities. All intermediate results are captured through Kafka, enabling detailed diagnosis of issues and continuous improvement of the system. This logging architecture allows the team to pinpoint whether problems originate in the retrieval stage or the re-ranking stage, facilitating targeted optimizations.

The system provides full ownership and control over the classification algorithm, allowing real-time adjustments to dozens of hyperparameters based on emerging concerns. This flexibility stands in stark contrast to third-party solutions where users are constrained by vendor roadmaps, pricing structures, and iteration speeds. The team can adjust the model dynamically based on performance degradation, latency requirements, or cost sensitivity concerns.

The production architecture leverages ClickHouse for high-performance similarity search operations, demonstrating the integration of specialized databases optimized for vector operations. The pre-computation of knowledge base embeddings and efficient retrieval mechanisms enable the system to operate at production scale while maintaining acceptable latency characteristics.

## Business Impact and Results

The implementation has delivered significant improvements in data quality and operational efficiency. The system successfully addresses the previous inconsistencies where similar businesses were classified into different categories and overly broad categories provided insufficient granularity. For example, three similar businesses that were previously scattered across different homegrown categories are now correctly unified under a single NAICS code, while previously over-generalized categories have been appropriately subdivided into more descriptive classifications.

The hierarchical nature of NAICS codes provides teams with flexibility to choose appropriate granularity levels for different use cases. A business like WizeHire can be precisely classified as "561311 - Employment Placement Agencies" while still allowing roll-up to broader categories as needed. This flexibility enables different teams to work with the same underlying data at different levels of detail.

Stakeholder feedback has been overwhelmingly positive, with teams expressing enthusiasm about the improved data quality and customer understanding. Comments from affected stakeholders highlight the significance of this improvement for business operations, with some noting they had waited years for this capability and others emphasizing its importance for satisfying industry exclusion requirements and driving business success.

## Technical Challenges and Lessons Learned

The case study reveals several important considerations for implementing RAG systems in production environments. The team discovered that optimization of the retrieval stage can yield substantial performance improvements, with their efforts resulting in up to 60% gains in recommendation accuracy. This finding underscores the importance of not treating RAG as a black box but rather optimizing each component systematically.

The development process highlighted the complexity of evaluation metrics for multi-stage systems. The team's approach of developing stage-specific metrics that align with overall system goals while avoiding interference demonstrates mature MLOps practices. Their custom fuzzy-accuracy metric for hierarchical classification problems could serve as a template for similar applications.

The two-prompt approach represents an innovative solution to the context window limitations that plague many LLM applications. By separating broad filtering from detailed selection, the system maximizes both coverage and precision while managing computational costs. This architecture pattern could be applicable to other domains where comprehensive search needs to be balanced with detailed analysis.

## Broader Implications for LLMOps

This case study exemplifies several key principles of successful LLMOps implementation. The emphasis on comprehensive logging and monitoring enables continuous improvement and rapid problem diagnosis. The modular architecture allows for component-level optimization and troubleshooting, which is crucial for maintaining complex AI systems in production.

The integration of specialized infrastructure components like ClickHouse for vector similarity search demonstrates the importance of choosing appropriate tools for each component of an AI system. The pre-computation strategy for knowledge base embeddings shows how careful system design can optimize for production performance requirements.

The case also illustrates the value of building in-house capabilities when business requirements demand specific functionality, control, and interpretability. While third-party solutions might offer quick deployment, the investment in building internal capabilities provides long-term flexibility and alignment with business needs that may not be available through external providers.