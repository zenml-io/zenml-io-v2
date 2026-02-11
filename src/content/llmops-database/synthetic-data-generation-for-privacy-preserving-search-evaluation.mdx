---
title: "Synthetic Data Generation for Privacy-Preserving Search Evaluation"
slug: "synthetic-data-generation-for-privacy-preserving-search-evaluation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adb95328ed5778579b53c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:47.628Z"
  createdOn: "2025-12-23T18:12:37.492Z"
llmopsTags:
  - "question-answering"
  - "data-analysis"
  - "prompt-engineering"
  - "semantic-search"
  - "evals"
  - "elasticsearch"
  - "docker"
  - "fastapi"
  - "openai"
industryTags: "tech"
company: "Canva"
summary: "Canva faced the challenge of evaluating and improving their private design search functionality for 200M monthly active users while maintaining strict privacy constraints that prevented viewing actual user designs or queries. The company developed a novel solution using GPT-4o to generate entirely synthetic but realistic test datasets, including design content, titles, and queries at various difficulty levels. This LLM-powered approach enabled engineers to run reproducible offline evaluations in under 10 minutes using local testcontainers, achieving 300x faster iteration cycles compared to traditional A/B testing while maintaining strong correlation with online experiment results, all without compromising user privacy."
link: "https://www.canva.dev/blog/engineering/how-to-improve-search-without-looking-at-queries-or-results/"
year: 2025
seo:
  title: "Canva: Synthetic Data Generation for Privacy-Preserving Search Evaluation - ZenML LLMOps Database"
  description: "Canva faced the challenge of evaluating and improving their private design search functionality for 200M monthly active users while maintaining strict privacy constraints that prevented viewing actual user designs or queries. The company developed a novel solution using GPT-4o to generate entirely synthetic but realistic test datasets, including design content, titles, and queries at various difficulty levels. This LLM-powered approach enabled engineers to run reproducible offline evaluations in under 10 minutes using local testcontainers, achieving 300x faster iteration cycles compared to traditional A/B testing while maintaining strong correlation with online experiment results, all without compromising user privacy."
  canonical: "https://www.zenml.io/llmops-database/synthetic-data-generation-for-privacy-preserving-search-evaluation"
  ogTitle: "Canva: Synthetic Data Generation for Privacy-Preserving Search Evaluation - ZenML LLMOps Database"
  ogDescription: "Canva faced the challenge of evaluating and improving their private design search functionality for 200M monthly active users while maintaining strict privacy constraints that prevented viewing actual user designs or queries. The company developed a novel solution using GPT-4o to generate entirely synthetic but realistic test datasets, including design content, titles, and queries at various difficulty levels. This LLM-powered approach enabled engineers to run reproducible offline evaluations in under 10 minutes using local testcontainers, achieving 300x faster iteration cycles compared to traditional A/B testing while maintaining strong correlation with online experiment results, all without compromising user privacy."
---

## Overview and Business Context

Canva's case study presents a compelling example of using LLMs in production not for end-user features, but for engineering infrastructure and evaluation pipelines. As of October 2024, Canva serves 200 million monthly active users who collectively maintain over 30 billion designs on the platform, with nearly 300 new designs created every second. In this high-growth environment, the ability for users to effectively search and re-find their private designs becomes increasingly critical. However, Canva's strong privacy principles—rooted in their core value of "Be a Good Human"—strictly prohibit engineers from viewing user-created content, creating a fundamental challenge for search quality evaluation.

The traditional approach to evaluating search engines relies on sampling real user queries, having human judges label the relevance of query-result pairs, and computing recall and precision metrics. This methodology, standard in public search domains like web or product search, was completely unavailable to Canva due to privacy constraints. Engineers were limited to rudimentary offline testing on a handful of queries in their own accounts before progressing changes to online A/B experiments. This approach suffered from limited statistical power, risk of exposing users to poor search behavior, and slow iteration cycles that could take days to weeks per experiment.

## The LLM-Powered Solution Architecture

Canva's solution leverages GPT-4o as the primary generative engine for creating entirely synthetic evaluation datasets. The system operates in multiple stages, each carefully designed to produce realistic test cases while respecting privacy boundaries.

### Synthetic Design Generation

The generation pipeline begins by seeding GPT-4o with realistic design topics. The system samples design types (documents, presentations, Instagram posts, etc.) from distributions matching real Canva usage patterns. For each test case, GPT-4o first brainstorms multiple potential titles for a design of the specified type and topic. After selecting one title, a second prompt instructs the model to generate corresponding text content for the design. Importantly, while privacy constraints prevent viewing actual user content, Canva can calculate aggregate statistics about design characteristics in a privacy-preserving manner. This enables them to generate designs with realistic text lengths, a critical factor since longer content increases the probability of query-content matches and affects retrieval likelihood.

### Query Generation with Difficulty Levels

Once relevant designs are created, the system generates test queries using a hybrid approach combining programmatic techniques and GPT-4o rewriting. Easy queries might be created by directly sampling words from design titles or content. The system then systematically increases query difficulty through various transformations: introducing misspellings, replacing words with synonyms, or having GPT-4o reword the query entirely. This stratified approach to difficulty levels allows engineers to evaluate search performance across a spectrum of query complexity, from straightforward exact matches to challenging semantic searches.

### Recall vs. Precision Test Cases

The system generates two distinct types of test cases. For recall evaluation, each test case consists of a single query paired with one relevant design—the design the user is attempting to re-find. This simple structure measures whether the search system can successfully retrieve the target design. For precision evaluation, the system creates more complex scenarios by generating additional non-relevant designs that share some but not all query terms. GPT-4o generates designs containing partial query matches or creates variations of the relevant design (templates, drafts) with modified attributes like older timestamps or fewer access counts. Generic unrelated designs are also added to create realistic corpus sizes. This allows measurement of the relevant design's rank relative to other retrieved results.

## Production Infrastructure and Evaluation Pipeline

The evaluation infrastructure demonstrates sophisticated LLMOps engineering beyond just LLM integration. Canva built a local evaluation environment using Testcontainers, capitalizing on existing infrastructure used for integration testing. The system runs complete replicas of production search components locally, including externally supported containers for Elasticsearch and internal service-oriented RPC containers configured identically to production. Machine learning models supporting the search pipeline also run locally, enabling engineers to experiment with different model variants.

For each test case, the system creates minimal required state—populating only the design data needed by the search index rather than generating full Canva designs. The local search pipeline processes test queries against this state, and an evaluation module calculates recall and precision metrics. This entire workflow completes in under 10 minutes for over 1,000 test cases, a remarkable achievement that enables more than 300 offline evaluations in the 2-3 day period required for a single online interleaving experiment.

## Visualization and Developer Experience

Canva built custom visualization tooling using Streamlit that launches immediately after evaluation completion. The tool provides side-by-side comparison of aggregated recall and precision metrics across different configurations, performance segmentation by query types and difficulty levels, and detailed output for individual queries to enable precise debugging. This self-service capability allows engineers to independently evaluate changes, make rapid informed decisions, and iterate without blocking other team members.

## LLM Challenges and Pragmatic Solutions

The case study candidly discusses several issues encountered with GPT-4o instruction following, offering valuable insights for practitioners. The model refused to create very long titles (12-15 words as requested), consistently producing shorter alternatives (9-10 words). Rather than viewing this purely as a limitation, the team reconsidered whether such long titles are realistic, potentially treating the LLM's behavior as signal about natural document characteristics. GPT-4o also exhibited repetitions and hallucinations when instructed to generate multiple distinct misspellings of words, and struggled to strictly adhere to constraints for non-relevant design title generation, sometimes including instruction text in outputs or failing to incorporate all specified words.

Critically, Canva's architecture mitigates these LLM issues by treating dataset generation as a one-time upfront process. Once created, the static evaluation dataset is shared among engineers and reused repeatedly, producing deterministic, reproducible results without latency concerns. This design choice maximizes LLM strengths (scalable text generation) while eliminating runtime issues (latency, non-determinism, API costs).

## Impact and Validation

The system delivers on its core objectives remarkably well. Evaluations complete in under 10 minutes, providing completely reproducible results that engineers can confidently interpret as reflections of production behavior. The 300x speedup in iteration cycles compared to online experimentation represents transformative productivity gains. Importantly, Canva validated that offline evaluation results show robust alignment with online experiment outcomes, demonstrating positive correlation for both improvements and regressions. This validation is crucial—offline evaluation only provides value if it accurately predicts production performance.

The local debugging functionality offers additional value by allowing engineers to trace test cases through each pipeline component, far more efficiently than previous approaches relying on production logs. Engineers can now independently and objectively evaluate code changes locally without privacy violations or mutual blocking.

## Critical Assessment and Broader Implications

This case study exemplifies mature LLMOps thinking that extends beyond deploying LLMs for end-user features. By applying generative AI to engineering infrastructure, Canva solved a problem that would otherwise be intractable given their privacy constraints. The approach demonstrates thoughtful engineering: using LLMs where they excel (text generation at scale), mitigating their weaknesses through architectural choices (static datasets), and validating that synthetic data correlates with real-world outcomes.

However, the case study presents results from Canva's perspective and understandably emphasizes successes. Some questions remain about generalization and limitations. The validation of offline-online correlation is described as "robust" but without detailed quantitative metrics. How precisely do offline improvements translate to online gains? Are there categories of changes where correlation breaks down? The system focuses specifically on re-finding tasks in private search—how well would this synthetic approach transfer to other search scenarios like discovery or collaborative search contexts?

The LLM challenges section honestly discusses instruction-following failures, but the solutions appear largely manual and iterative (adjusting prompts, reconsidering requirements). As synthetic datasets scale and diversify, maintaining quality and realism may require more systematic approaches to prompt engineering, validation, and quality control. The team mentions plans to expand datasets with "sophisticated collaboration graphs" and enable engineer self-service for synthetic data needs, suggesting ongoing engineering investment will be necessary.

The reliance on GPT-4o also introduces dependencies on external model providers, with associated costs, API changes, and potential future pricing or access modifications. While the static dataset approach minimizes runtime dependencies, regenerating or expanding datasets requires continued API access.

Overall, this case study provides a valuable blueprint for privacy-preserving evaluation using LLMs, demonstrating how generative AI can solve previously intractable problems in ML infrastructure. The careful validation, honest discussion of limitations, and focus on developer productivity and reproducibility reflect mature LLMOps practices that extend well beyond simple LLM API integration.