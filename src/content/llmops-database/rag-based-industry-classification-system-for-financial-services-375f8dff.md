---
title: "RAG-Based Industry Classification System for Financial Services"
slug: "rag-based-industry-classification-system-for-financial-services-375f8dff"
draft: false
llmopsTags:
  - "classification"
  - "structured-output"
  - "data-cleaning"
  - "data-integration"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "reranking"
  - "databases"
  - "monitoring"
  - "guardrails"
  - "compliance"
industryTags: "finance"
company: "Ramp"
summary: "Ramp, a financial services company, faced challenges with industry classification of their customers due to reliance on a homegrown taxonomy that resulted in inconsistent, overly broad, and non-auditable categorizations across teams. The company built an in-house Retrieval-Augmented Generation (RAG) model to migrate to the standardized NAICS (North American Industry Classification System) taxonomy. The solution involved a two-stage RAG pipeline with optimized embeddings for recommendation generation and a dual-prompt LLM system for final prediction selection. The deployed system achieved accuracy improvements of 60% in recommendation retrieval and 5-15% in final prediction accuracy, while providing full ownership, auditability, and interpretability of classification decisions. This enabled consistent cross-team collaboration, improved compliance capabilities, and more precise customer understanding across sales, risk, and analytics functions."
link: "https://builders.ramp.com/post/industry_classification"
year: 2025
seo:
  title: "Ramp: RAG-Based Industry Classification System for Financial Services - ZenML LLMOps Database"
  description: "Ramp, a financial services company, faced challenges with industry classification of their customers due to reliance on a homegrown taxonomy that resulted in inconsistent, overly broad, and non-auditable categorizations across teams. The company built an in-house Retrieval-Augmented Generation (RAG) model to migrate to the standardized NAICS (North American Industry Classification System) taxonomy. The solution involved a two-stage RAG pipeline with optimized embeddings for recommendation generation and a dual-prompt LLM system for final prediction selection. The deployed system achieved accuracy improvements of 60% in recommendation retrieval and 5-15% in final prediction accuracy, while providing full ownership, auditability, and interpretability of classification decisions. This enabled consistent cross-team collaboration, improved compliance capabilities, and more precise customer understanding across sales, risk, and analytics functions."
  canonical: "https://www.zenml.io/llmops-database/rag-based-industry-classification-system-for-financial-services-375f8dff"
  ogTitle: "Ramp: RAG-Based Industry Classification System for Financial Services - ZenML LLMOps Database"
  ogDescription: "Ramp, a financial services company, faced challenges with industry classification of their customers due to reliance on a homegrown taxonomy that resulted in inconsistent, overly broad, and non-auditable categorizations across teams. The company built an in-house Retrieval-Augmented Generation (RAG) model to migrate to the standardized NAICS (North American Industry Classification System) taxonomy. The solution involved a two-stage RAG pipeline with optimized embeddings for recommendation generation and a dual-prompt LLM system for final prediction selection. The deployed system achieved accuracy improvements of 60% in recommendation retrieval and 5-15% in final prediction accuracy, while providing full ownership, auditability, and interpretability of classification decisions. This enabled consistent cross-team collaboration, improved compliance capabilities, and more precise customer understanding across sales, risk, and analytics functions."
notion:
  pageId: "375f8dff-2538-80a7-8874-e3b0619ea85b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-04T08:05:00.000Z"
  lastEditedTime: "2026-06-04T08:05:00.000Z"
  publishedAt: "2026-06-04T08:36:57Z"
---

## Overview

Ramp, a financial services platform focused on helping customers save time and money, implemented a production RAG-based system to solve a critical data quality and operational challenge: industry classification of their business customers. The case study presents a comprehensive example of building and deploying an LLM-powered system from scratch, with particular emphasis on systematic optimization, production architecture considerations, and measurable business impact.

The core business problem stemmed from Ramp's reliance on a homegrown industry taxonomy cobbled together from third-party data, sales-entered information, and customer self-reporting. This system created multiple sources of truth across the organization, with different teams using incompatible taxonomies (homegrown categories, SIC codes, NAICS codes) that required complex many-to-many translation layers. The consequences were significant: the Risk and Sales teams couldn't establish quick feedback loops on targeting and segmentation, classifications were often incorrect or overly generic (like categorizing diverse businesses all as "Professional Services"), similar businesses received different classifications, and the system lacked auditability. For example, WizeHire, a hiring platform, was broadly classified as "Professional Services" alongside law firms, dating apps, and consulting firms, making it difficult to understand specific customer needs or profile credit risk accurately.

## Strategic Solution Design

Ramp's solution was to standardize on NAICS (North American Industry Classification System), a six-digit hierarchical taxonomy used across North America, replacing the older SIC system and their homegrown approach. This standardization would enable internal consistency while facilitating communication with external partners already using NAICS. The hierarchical nature of NAICS codes proved particularly valuable, allowing teams to choose appropriate granularity levels - from broad categories down to specific six-digit codes. Under the new system, WizeHire would be classified as "561311 - Employment Placement Agencies," with clear rollup categories for different analytical purposes.

The critical challenge was building a classification model capable of predicting six-digit NAICS codes for all Ramp businesses. While third-party solutions existed, Ramp determined that their unique needs with complex, proprietary data justified building an in-house model. They chose a RAG architecture specifically for its ability to constrain LLM outputs to a valid knowledge base domain - essentially converting an open-ended generation problem into a multiple-choice question where all choices are valid NAICS codes.

## Technical Architecture and LLMOps Implementation

The RAG system architecture consists of three primary stages operating in a production environment. First, the system calculates text embeddings of both the query (business information) and the knowledge base (NAICS code descriptions). Second, it computes similarity scores to generate recommendations from the knowledge base. Third, an LLM makes final predictions from the filtered recommendations. This multi-stage design required careful consideration of production infrastructure, data flow, and monitoring capabilities.

The production architecture integrates several key components. Internal services handle embeddings for new businesses and LLM prompt evaluations. Knowledge base embeddings are pre-computed and stored in ClickHouse, enabling fast retrieval of recommendations through similarity score calculations. Intermediate results are logged via Kafka, providing diagnostic capabilities for pathological cases and enabling prompt iteration. This architecture reflects thoughtful LLMOps practices around observability, data management, and system modularity.

## Evaluation Strategy and Metrics

The case study demonstrates sophisticated thinking about evaluation for multi-stage systems. Rather than using a single end-to-end metric, Ramp decomposed the problem and identified metrics for each stage, ensuring metrics wouldn't interfere with each other while remaining aligned with overall system goals.

For the recommendation generation stage, they selected accuracy at k (acc@k) as the primary metric, measuring how often the correct NAICS code appears in the top k recommendations. This metric represents a performance ceiling for the full system - if the correct code isn't among recommendations, the LLM cannot select it. This framing shows clear understanding of how retrieval quality bounds downstream performance in RAG systems.

For the prediction selection stage, they defined a custom fuzzy-accuracy metric that accounts for NAICS's hierarchical structure. Rather than treating all incorrect predictions equally, predictions correct for part of the hierarchy receive partial credit. For instance, if the correct code is 123456, a prediction of 123499 (matching the first four digits) scores better than 999999 (completely wrong). This custom metric reflects domain expertise and recognition that partial correctness has business value - a somewhat wrong industry classification is better than a completely wrong one for most downstream use cases.

## Hyperparameter Optimization and Model Development

The recommendation generation stage involved optimizing multiple hyperparameters through systematic experimentation. Key parameters included which knowledge base field to embed, which query field to embed, the embedding model selection, and the number of recommendations to generate. Each parameter presented tradeoffs - for example, certain business attributes might be more informative but have higher missing rates, while different embedding models have varying resource requirements that don't necessarily correlate with performance on Ramp's specific data.

The team profiled performance across different configurations, creating acc@k curves to identify optimal settings. They explicitly avoided naive optimization that would maximize acc@k without considering downstream LLM performance (which would lead to recommending the entire knowledge base). Through this systematic optimization, they achieved up to 60% improvement in acc@k. Importantly, they identified economical embedding models suitable for production deployment without sacrificing performance compared to larger models - a critical consideration for cost management in production LLM systems.

The prediction selection stage similarly involved optimizing multiple hyperparameters: the number of recommendations to include, which fields to include in prompts (for both business descriptions and knowledge base entries), prompt variations, number of prompts, and structured output schema design. Again, tradeoffs were carefully considered. More recommendations give the LLM better chances of finding the correct code but increase context size and potentially degrade performance if the model cannot focus on relevant options. Likewise, longer or more descriptive information helps the LLM understand businesses and NAICS codes better but significantly increases context size.

## Advanced Prompting Strategy

Ramp implemented a sophisticated two-prompt system to balance competing considerations. The first prompt includes many recommendations without the most specific descriptions, asking the LLM to return a small list of the most relevant codes. The second prompt then asks the LLM to choose the best single code from this filtered list, providing more detailed context for each remaining option. This staged approach gets "the best of both worlds" - comprehensive initial coverage with focused final decision-making. Through optimization of these parameters, they achieved 5-15% improvement in fuzzy accuracy.

The use of structured output is notable, constraining the LLM to return predictions in a specific format that can be reliably parsed and validated. This is a production-critical consideration that prevents parsing failures and enables systematic validation of outputs.

## Guardrails and Reliability

While RAG systems inherently constrain LLM outputs to the knowledge base domain, Ramp implemented additional guardrails. They validate that output NAICS codes from each LLM prompt are valid codes that actually exist. Interestingly, they discovered cases where the LLM correctly predicted codes not present in the recommendations (a form of "positive hallucination"), so their validation focuses on filtering out just "bad" hallucinations rather than all hallucinations. This nuanced approach shows sophisticated understanding of LLM behavior and willingness to leverage beneficial emergent capabilities while protecting against harmful ones.

## Observability and Iteration

The logging of all intermediate steps through Kafka provides crucial observability for a production system. This enables the team to pinpoint where issues arise - whether in retrieval or re-ranking stages - and make targeted improvements. The ability to diagnose pathological cases and iterate on prompts represents operational maturity in LLMOps practices. The team can analyze failures systematically rather than treating the system as a black box.

The case study also highlights requesting LLM justifications to clarify reasoning behind predictions. This interpretability capability serves multiple purposes: building user trust, debugging incorrect predictions, identifying systematic biases or errors, and potentially improving the system through analysis of reasoning patterns.

## Production Benefits and Control

Since deployment, Ramp has realized several key benefits beyond accuracy improvements. Full ownership and control over the algorithm allows them to make adjustments across dozens of hyperparameters to address concerns as they emerge. They can tune for different priorities: performance degradation, latency requirements, or cost sensitivity. This flexibility would be impossible with a third-party solution where they'd be constrained by the vendor's roadmap, pricing, and iteration speed.

The auditability and interpretability of the model's decisions addresses compliance requirements and builds stakeholder confidence. The ability to examine intermediate steps and LLM reasoning provides transparency lacking in their previous system.

## Measured Impact

The case study provides concrete examples of improvement. Businesses previously classified inconsistently despite similarity (three similar businesses categorized differently in the homegrown system) are now correctly grouped under the same NAICS code. Conversely, businesses previously lumped into overly broad categories are now distinguished with more descriptive, specific NAICS codes. For instance, businesses all categorized as generic "Professional Services" are now properly differentiated into their specific industry segments.

The stakeholder quotes, while promotional in nature, reflect genuine improvement in data quality and operational capabilities: enabling industry exclusion requirements for compliance, supporting business diversification efforts, and providing the nuanced understanding necessary for sophisticated customer segmentation and risk profiling.

## Critical Assessment

While the case study presents a clear success story, certain aspects deserve balanced consideration. The claimed improvements (60% in acc@k, 5-15% in fuzzy accuracy) lack context about baseline performance - we don't know if they went from 30% to 90% or 85% to 95%, which would have very different business implications. The case study doesn't discuss failure modes, error rates, or cases where the system still struggles, which would provide more complete understanding.

The cost comparison with third-party solutions is mentioned but not quantified. Building and maintaining an in-house system requires significant engineering investment, ongoing maintenance, and specialized expertise. Whether this represents better total cost of ownership compared to third-party solutions depends on factors not fully explored in the case study.

The two-prompt strategy is elegant but implies two LLM calls per classification, doubling inference costs and latency compared to single-prompt approaches. The case study doesn't discuss whether they explored or benchmarked against single-prompt alternatives with optimized context management.

The handling of data sparsity and non-uniform distribution (mentioned as challenges) isn't fully addressed in the solution description. How does the system perform for rare or unusual business types with limited training examples? What strategies handle businesses that don't fit neatly into NAICS categories?

## LLMOps Maturity Demonstrated

Overall, this case study demonstrates substantial LLMOps maturity. The systematic approach to evaluation with stage-specific metrics, comprehensive hyperparameter optimization, thoughtful production architecture with appropriate infrastructure choices (ClickHouse for fast retrieval, Kafka for logging), implementation of guardrails and validation, and focus on observability and iteration all represent production-grade LLM deployment practices. The two-stage prompting strategy shows sophisticated prompt engineering going beyond basic approaches.

The migration from a heterogeneous, unauditable system to a standardized, interpretable one addresses real organizational challenges around data quality, cross-functional collaboration, and compliance. The business impact - enabling better customer understanding, risk assessment, and regulatory compliance - justifies the engineering investment in building a custom solution rather than relying on off-the-shelf alternatives.
