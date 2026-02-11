---
title: "Scaling Product Categorization from Manual Tagging to LLM-Based Classification"
slug: "scaling-product-categorization-from-manual-tagging-to-llm-based-classification"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69242f494fc9560d8135b7ab"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:28:13.727Z"
  createdOn: "2025-11-24T10:11:21.304Z"
llmopsTags:
  - "classification"
  - "structured-output"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "few-shot"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "evals"
  - "orchestration"
  - "scalability"
  - "reliability"
  - "openai"
  - "hugging-face"
industryTags: "e-commerce"
company: "GetYourGuide"
summary: "GetYourGuide, a global marketplace for travel experiences, evolved their product categorization system from manual tagging to an LLM-based solution to handle 250,000 products across 600 categories. The company progressed through rule-based systems and semantic NLP models before settling on a hybrid approach using OpenAI's GPT-4-mini with structured outputs, combined with embedding-based ranking and batch processing with early stopping. This solution processes one product-category pair at a time, incorporating reasoning and confidence fields to improve decision quality. The implementation resulted in significant improvements: Matthew's Correlation Coefficient increased substantially, 50 previously excluded categories were reintroduced, 295 new categories were enabled, and A/B testing showed a 1.3% increase in conversion rate, improved quote rate, and reduced bounce rate."
link: "https://www.youtube.com/watch?v=JOye06P5JZI"
year: 2025
seo:
  title: "GetYourGuide: Scaling Product Categorization from Manual Tagging to LLM-Based Classification - ZenML LLMOps Database"
  description: "GetYourGuide, a global marketplace for travel experiences, evolved their product categorization system from manual tagging to an LLM-based solution to handle 250,000 products across 600 categories. The company progressed through rule-based systems and semantic NLP models before settling on a hybrid approach using OpenAI's GPT-4-mini with structured outputs, combined with embedding-based ranking and batch processing with early stopping. This solution processes one product-category pair at a time, incorporating reasoning and confidence fields to improve decision quality. The implementation resulted in significant improvements: Matthew's Correlation Coefficient increased substantially, 50 previously excluded categories were reintroduced, 295 new categories were enabled, and A/B testing showed a 1.3% increase in conversion rate, improved quote rate, and reduced bounce rate."
  canonical: "https://www.zenml.io/llmops-database/scaling-product-categorization-from-manual-tagging-to-llm-based-classification"
  ogTitle: "GetYourGuide: Scaling Product Categorization from Manual Tagging to LLM-Based Classification - ZenML LLMOps Database"
  ogDescription: "GetYourGuide, a global marketplace for travel experiences, evolved their product categorization system from manual tagging to an LLM-based solution to handle 250,000 products across 600 categories. The company progressed through rule-based systems and semantic NLP models before settling on a hybrid approach using OpenAI's GPT-4-mini with structured outputs, combined with embedding-based ranking and batch processing with early stopping. This solution processes one product-category pair at a time, incorporating reasoning and confidence fields to improve decision quality. The implementation resulted in significant improvements: Matthew's Correlation Coefficient increased substantially, 50 previously excluded categories were reintroduced, 295 new categories were enabled, and A/B testing showed a 1.3% increase in conversion rate, improved quote rate, and reduced bounce rate."
---

## Overview

GetYourGuide, a global marketplace for travel experiences operating from Berlin, faced the challenge of categorizing approximately 250,000 products across 600 categories in a multilabel classification scenario where products can belong to multiple categories simultaneously. The company's data science team, represented by Ansar and Jean Paulo, presented their journey from manual categorization to a sophisticated LLM-based system that processes roughly 1,500 new or updated products daily while maintaining the entire catalog.

The business context is critical: categories drive customer discovery through Google search results (both paid and organic), on-site filtering, and search suggestions. When users search for specific experiences like "photo tour in Rome," they land on category pages that must display relevant products. The quality of categorization directly impacts user experience and conversion rates, making this a business-critical application of LLMs in production.

## Evolution of Approaches

The team's journey through multiple technical approaches provides valuable lessons about the tradeoffs in production ML systems. Initially, GetYourGuide launched in 2009 with **manual categorization**, which was fast to implement but slow, expensive, inconsistent, and not scalable. In 2019, they moved to a **rule-based system** that relied on supplier input (transportation types, theme tags) to automatically assign categories. While this reduced manual work to creating one rule per category, it introduced dependency on supplier data quality, potential gaming by suppliers, and difficulty in introducing new concepts requiring backfilling.

The team then implemented a **semantic NLP model using embeddings from Hugging Face** (approximately 1,000 dimensions) that compared category name vectors with product text vectors using angular similarity thresholds. Products were assigned to categories when the angle between vectors fell below a threshold (theta). This approach was fine-tuned on their own data and relied only on high-quality product texts visible to users. An A/B experiment showed business metrics remained stable during this transition, confirming they hadn't sacrificed quality for scalability. However, the system struggled with new categories because different categories required vastly different threshold angles, and there was heavy dependence on training data quality. Adding performance signals (click data from category pages) improved business metrics but only worked for products and categories with sufficient historical data.

## LLM Implementation Journey

The presentation offers particularly valuable insights into the **iterative experimentation process** with LLMs in production. The team's initial attempts with OpenAI encountered the common challenge of unpredictable free-text outputs. Even when OpenAI released JSON mode, the team found it "still broken" due to inconsistent formatting, unescaped quotes, dangling commas, and character skipping between calls. The breakthrough came with **OpenAI's structured outputs** (also called function calling or tool calls), which allowed them to define precise output schemas using Pydantic classes in Python, specifying exact field names, data types, and required fields. This represented what the presenters called their "turning point," moving the project from experimental to a "practical engineering challenge" where they could reliably iterate on prompts and schemas.

The team systematically explored different **prompt engineering strategies** to balance quality and cost:

- **Multiple products + all categories with GPT-4**: The task was too complex, with poor results and complicated output structure, likely overwhelming the model
- **One product + all categories with GPT-4**: Quality improved significantly, especially for fine-grained categories, but cost became prohibitive at scale
- **One product + all categories with GPT-4-mini**: Quality drop was too significant; the smaller model struggled with nuances across 600 categories, resulting in low precision and recall
- **Multiple products + one category with GPT-4/GPT-4-mini**: Results were reasonable but prompts became huge, and hallucinations became problematic when matching product IDs in the output back to inputs

The winning approach was **one product + one category using GPT-4-mini**, framed as a simple yes/no decision. Critically, they discovered that adding **reasoning and confidence fields** to the structured output schema significantly improved quality, even though they ultimately only used the yes/no decision in production. The reasoning field effectively implements a form of "thinking mode" that improves the final decision quality. The presenters emphasized that placing the reasoning *before* the decision in the output schema works better than the reverse order, as it encourages the model to think through the problem before committing to an answer.

## Production Architecture and Cost Optimization

The practical challenge was scaling this approach to 250,000 products × 600 categories = 150 million potential combinations. The team developed a sophisticated **hybrid architecture** with four key components:

**First, semantic vector pre-ranking**: Before invoking the LLM, they use OpenAI embeddings to rank all products by cosine similarity to each category. For example, when processing the "photography tours" category, photo-related products naturally rank higher. This prioritization determines which products get classified first for each category.

**Second, batch processing**: The team leverages **OpenAI's batch jobs API**, which offers 50% cost savings compared to standard API calls (making it one of the most cost-effective options at comparable quality levels). Requests are structured in batch files and processed with a 24-hour SLA, which was acceptable for their use case. The batch jobs run in parallel on OpenAI's infrastructure.

**Third, custom early stopping**: As batch results arrive, the system monitors the percentage of products being connected to each category. When this percentage drops below a custom threshold, processing stops for that category. This is particularly effective for niche categories that might only have 100 relevant products, preventing wasteful processing of the remaining products.

**Fourth, parallelization across categories**: Since each category can be processed independently, the system uses a round-robin approach to parallelize across all 600 categories. The only hard constraint is OpenAI's 24-hour batch SLA.

The entire system is orchestrated with **Apache Airflow**, which was crucial for fault tolerance. OpenAI batch jobs can fail for various reasons (either client-side issues like malformed characters or server-side OpenAI problems), and the response includes an error column that must be parsed and handled appropriately. Airflow's architecture also allows the system to avoid keeping compute resources running during the 24-hour wait periods, only spinning up when needed to check for results or handle errors.

The system is designed for **continuous operation**: when other teams create new categories, they automatically flow through the same process, and the 1,500 daily product updates or additions are processed automatically. This represents a mature production LLM system that handles the full lifecycle of categorization at scale.

## Evaluation and Business Impact

The team implemented rigorous **offline evaluation** using an independent model to create test sets for each category containing clear positive cases, clear negative cases, and edge cases. These were human-labeled by a specialized team to create ground truth data. For each category, they calculated metrics and performed both macro and micro averaging across multiple runs to identify outliers and investigate why certain categories performed better or worse.

The **qualitative improvements** were striking. For the "Rome photography tours" category, results shifted from showing an open-top panoramic bus (marginally useful for photos) to consistently showing photo-focused tours. For "Dubai air and helicopter tours," a skydiving experience was correctly excluded despite being aviation-related. Most impressively, for a scuba diving product that mentioned "if you swim and snorkel then scuba diving is your next exciting adventure," the LLM correctly determined it should *not* be categorized under snorkeling despite the keyword mention—something extremely difficult for vector-based systems.

**Quantitatively**, the Matthew's Correlation Coefficient (MCC) improved substantially, driven by significant recall improvements and slight precision gains simultaneously. Coverage expanded by 50 previously excluded categories (from the 325 that the vector-based approach could handle) and enabled 295 entirely new categories for more niche experiences. The expanded categorization capabilities had "quite positive business impact" according to the presenters.

The **A/B experiment** using GetYourGuide's internal framework showed statistically significant results: conversion rate increased by 1.3%, quote rate (users examining at least one product) increased proportionally, and bounce rate decreased significantly. These business metrics validate that the improved categorization translates directly to better user experience and revenue.

## Critical Assessment and Future Work

While the presenters understandably emphasize positive results, several aspects deserve balanced consideration. The dependence on **OpenAI's enterprise contract** and batch API creates vendor lock-in, and the 24-hour SLA, while acceptable for this use case, limits applicability to real-time scenarios. The cost structure (even at 50% discount for batch jobs) for 150 million potential combinations requires the semantic pre-ranking and early stopping optimizations, indicating this approach might not be economically viable without these mitigations.

The team's decision to use the **confidence field only during development** and not in production suggests either that confidence calibration wasn't reliable enough or that the simple yes/no decision was sufficiently accurate. An audience question about quantitative testing of the confidence field went largely unanswered, indicating this might be an area for future investigation.

The **one product, one category** approach, while successful, represents a significant computational investment. An audience member raised an interesting point about using graph RAG and ontological structures, noting that the category relationships (the historical category tree) are being ignored. The presenters acknowledged they're exploring category graphs to identify errors but noted the complexity of validating a 600×600 category relationship graph while simultaneously validating model outputs. This represents a potential area for significant optimization but also additional engineering complexity.

The team's **ongoing and planned improvements** include incorporating human-written category definitions as additional LLM context (already showing improvements for some categories), using alternative category titles for the LLM prompt (e.g., changing "flower farms and festivals" to "flower farms and flower festivals" to reduce confusion about general festivals), exploring better or cheaper LLMs beyond OpenAI, automating prompt optimization from incorrectly tagged examples, and potentially implementing model fine-tuning.

An important operational detail mentioned in Q&A: suppliers can report incorrect categorizations through GetYourGuide's system, which creates overrides and provides training data for model improvements. This feedback loop is essential for maintaining quality over time, though the presenters noted suppliers have reduced control compared to the previous system where they provided tagging input. However, suppliers still have "a little bit of leeway" through the product descriptions they write, which the LLM uses for categorization.

## LLMOps Lessons

This case study exemplifies several important LLMOps principles. The team's systematic experimentation with different prompt configurations and model sizes demonstrates the importance of **structured iteration** when productionizing LLMs. Their discovery that adding reasoning and confidence fields improves decision quality even when not directly used represents a practical finding about prompt engineering that others can replicate.

The **hybrid architecture combining embeddings with LLM calls** represents a pragmatic approach to cost optimization that maintains quality. Using cheaper, faster models (embeddings) for initial filtering before applying more expensive models (LLM classification) is a pattern applicable to many production scenarios. The early stopping mechanism based on business logic (percentage of connections per category) shows how domain knowledge can be integrated into LLM pipelines for efficiency.

The emphasis on **structured outputs** as the enabling technology for production deployment highlights a critical capability often overlooked in LLM discussions. Without reliable output formats, building automated systems around LLMs becomes extremely difficult. The team's experience with JSON mode being "still broken" despite initial promise serves as a cautionary tale about relying on early-stage features.

Finally, the **comprehensive evaluation approach** combining offline metrics (MCC, precision, recall) with online A/B testing of business metrics (conversion, quote rate, bounce rate) demonstrates mature ML operations. The offline evaluation infrastructure with human-labeled ground truth for each category, combined with micro/macro averaging and outlier analysis, represents the kind of rigorous testing required for production ML systems that impact revenue.

The case study demonstrates that successful LLMOps requires not just technical implementation but careful consideration of costs, quality tradeoffs, evaluation infrastructure, orchestration, error handling, and business impact measurement. GetYourGuide's journey from manual tagging to production LLMs took several iterations and years of evolution, reflecting the reality that deploying LLMs at scale is an engineering challenge requiring systematic problem-solving rather than simply calling an API.