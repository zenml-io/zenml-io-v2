---
title: "Financial Transaction Categorization at Scale Using LLMs and Custom Embeddings"
slug: "financial-transaction-categorization-at-scale-using-llms-and-custom-embeddings"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adb7c6cacaedd2105ad23"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:47.624Z"
  createdOn: "2025-12-23T18:12:12.796Z"
llmopsTags:
  - "fraud-detection"
  - "classification"
  - "data-analysis"
  - "data-cleaning"
  - "structured-output"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "embeddings"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "semantic-search"
  - "fine-tuning"
  - "latency-optimization"
  - "cost-optimization"
  - "few-shot"
  - "model-optimization"
  - "pytorch"
  - "tensorflow"
  - "fastapi"
  - "monitoring"
  - "orchestration"
  - "openai"
  - "google-gcp"
  - "anthropic"
industryTags: "finance"
company: "Mercado Libre"
summary: "Mercado Libre (MELI) faced the challenge of categorizing millions of financial transactions across Latin America in multiple languages and formats as Open Finance unlocked access to customer financial data. Starting with a brittle regex-based system in 2021 that achieved only 60% accuracy and was difficult to maintain, they evolved through three generations: first implementing GPT-3.5 Turbo in 2023 to achieve 80% accuracy with 75% cost reduction, then transitioning to GPT-4o-mini in 2024, and finally developing custom BERT-based semantic embeddings trained on regional financial text to reach 90% accuracy with an additional 30% cost reduction. This evolution enabled them to scale from processing tens of millions of transactions per quarter to tens of millions per week, while enabling near real-time categorization that powers personalized financial insights across their ecosystem."
link: "https://medium.com/mercadolibre-tech/la-nueva-babel-financiera-ense%C3%B1ar-a-la-ia-a-hablar-dinero-en-latinoam%C3%A9rica-4605235e3aac"
year: 2025
seo:
  title: "Mercado Libre: Financial Transaction Categorization at Scale Using LLMs and Custom Embeddings - ZenML LLMOps Database"
  description: "Mercado Libre (MELI) faced the challenge of categorizing millions of financial transactions across Latin America in multiple languages and formats as Open Finance unlocked access to customer financial data. Starting with a brittle regex-based system in 2021 that achieved only 60% accuracy and was difficult to maintain, they evolved through three generations: first implementing GPT-3.5 Turbo in 2023 to achieve 80% accuracy with 75% cost reduction, then transitioning to GPT-4o-mini in 2024, and finally developing custom BERT-based semantic embeddings trained on regional financial text to reach 90% accuracy with an additional 30% cost reduction. This evolution enabled them to scale from processing tens of millions of transactions per quarter to tens of millions per week, while enabling near real-time categorization that powers personalized financial insights across their ecosystem."
  canonical: "https://www.zenml.io/llmops-database/financial-transaction-categorization-at-scale-using-llms-and-custom-embeddings"
  ogTitle: "Mercado Libre: Financial Transaction Categorization at Scale Using LLMs and Custom Embeddings - ZenML LLMOps Database"
  ogDescription: "Mercado Libre (MELI) faced the challenge of categorizing millions of financial transactions across Latin America in multiple languages and formats as Open Finance unlocked access to customer financial data. Starting with a brittle regex-based system in 2021 that achieved only 60% accuracy and was difficult to maintain, they evolved through three generations: first implementing GPT-3.5 Turbo in 2023 to achieve 80% accuracy with 75% cost reduction, then transitioning to GPT-4o-mini in 2024, and finally developing custom BERT-based semantic embeddings trained on regional financial text to reach 90% accuracy with an additional 30% cost reduction. This evolution enabled them to scale from processing tens of millions of transactions per quarter to tens of millions per week, while enabling near real-time categorization that powers personalized financial insights across their ecosystem."
---

## Overview

Mercado Libre (MELI), one of Latin America's largest e-commerce and fintech platforms, embarked on a multi-year journey to transform financial transaction categorization from a manual, rule-based process into an AI-powered semantic engine capable of processing hundreds of millions of transactions weekly. The use case emerged from the evolution of Open Finance in Latin America, particularly Brazil's Phase 4 implementation, which unlocked access to customer financial data across institutions. The challenge wasn't just accessing this data but interpreting scattered, multilingual transaction records written in different formats and local dialects across countries like Brazil, Colombia, Mexico, and Chile. MELI's solution demonstrates a pragmatic evolution through three distinct architectural generations, each addressing specific production challenges around accuracy, cost, latency, and scale.

## The Initial Approach: Regex-Based Rules (2021)

MELI's first attempt at financial data enrichment relied heavily on handcrafted regular expressions tailored for each country, supplemented by Merchant Category Codes (MCC). This approach represented the pre-GenAI state of the art but suffered from fundamental limitations in production environments. The regex system achieved approximately 60% accuracy, required hundreds of lines of code for even simple categories like "Digital Subscriptions," and created significant technical debt as each new service (Spotify, Netflix, etc.) required manual pattern updates. The system was particularly fragile when dealing with linguistic nuances across Latin American Spanish and Portuguese dialects, struggling with regional variations like 'birreria' versus 'cervecería'. Most critically, this approach created classification errors such as categorizing a gas station ("Posto de Gasolina") as educational services based on MCC misreporting. The team managed to deploy only a single model focused on Brazilian Portuguese debit transactions, which appeared in Mercado Pago's "Seu Dinheiro" feature. However, the unsustainable maintenance burden and inability to scale made it clear that a fundamentally different approach was needed.

## Second Generation: LLM-Assisted with Human Validation (2023-2024)

The emergence of GPT-3.5 Turbo in March 2023 represented a watershed moment for MELI's financial enrichment infrastructure. The availability of a cost-efficient LLM with a public API enabled them to pivot from regex to a hybrid system that combined LLM predictions with human validation workflows. This architecture achieved over 80% accuracy while reducing operational costs by 75% and scaling throughput from tens of millions of transactions per quarter to tens of millions per week. The technical implementation required significant LLMOps engineering beyond simply calling an API. MELI developed batch processing strategies before official batch APIs were available, optimizing for API usage patterns by carefully managing parameters like temperature and context windows. They built their solution on top of MELI's core infrastructure including Fury (their internal framework) and DataMesh, ensuring proper orchestration of large-scale enrichment workflows.

A critical production consideration was the human-in-the-loop validation system. MELI explicitly recognized that in a regulated financial environment dealing with sensitive customer data, AI decisions couldn't operate as black boxes. They implemented a continuous validation process where GenAI-generated categorizations went through expert human review, creating feedback loops that improved semantic patterns over time. This approach balanced the speed of AI with the need for precision, traceability, and control in decisions impacting millions of users. The prompt engineering component involved crafting clear instructions that could handle the complexity of LATAM financial contexts, though the article doesn't provide specific prompt examples beyond showing a conceptual diagram of the prompt-based labeling workflow.

When GPT-4o-mini launched in July 2024, MELI's model-agnostic architecture proved its value. They could efficiently integrate the new model, which offered 60% cost savings over GPT-3.5 Turbo with stronger performance, without requiring fundamental system redesign. This architecture also allowed experimentation with other LLM providers like Gemini and Claude, demonstrating good LLMOps practices around avoiding vendor lock-in and maintaining flexibility as the AI landscape evolved.

However, despite these advances, the team recognized that querying external LLM APIs for hundreds of millions of weekly transactions presented long-term challenges around both latency and cost at their scale. This realization drove the third architectural evolution.

## Third Generation: Custom Semantic Embeddings (2024-2025)

The most sophisticated phase of MELI's LLMOps journey involved distilling the semantic intelligence of large language models into lighter, faster, and more cost-effective custom embeddings. Rather than querying GPT-4o-mini for every transaction in production, they developed their own semantic embeddings by fine-tuning BERT-style (Bidirectional Encoder Representations from Transformers) models on regional financial text. These embeddings capture deep relationships between words and concepts in numerical format, enabling the system to recognize that "delivery" and "fast food" share semantic context even with different surface forms, or that "Mercado Livre" (Brazil) and "Mercado Libre" (Mexico) represent the same entity despite language differences.

The results of this approach were significant from both accuracy and operational perspectives. Global categorization accuracy improved from 80% to 90%, while operational costs decreased by an additional 30% beyond the savings already achieved with LLMs. The system can now respond in near real-time (NRT) to millions of transactions, automatically distinguishing restaurants from grocery stores and pinpointing exact spending categories with high precision. The technical architecture shows a "Semantic Categorization" engine that uses these LLM-trained embeddings as a core component, enabling precise categorization without the latency and cost of API calls for every inference.

From an LLMOps perspective, this evolution demonstrates a sophisticated understanding of when to use foundation models versus when to distill their capabilities into specialized models. MELI used the expensive, powerful LLMs to establish ground truth, validate semantic patterns, and train domain-specific embeddings, but then deployed the lighter embeddings for production inference. This architectural pattern balances the need for cutting-edge AI capabilities with the practical constraints of cost, latency, and scale in production systems serving millions of users.

## LLMOps Challenges and Considerations

Throughout their journey, MELI confronted several critical LLMOps challenges that the article addresses with varying degrees of specificity. On the cost optimization front, they moved from a 75% reduction when transitioning from regex to GPT-3.5, to an additional 60% savings with GPT-4o-mini, to a final 30% reduction with custom embeddings, representing a compound optimization strategy across multiple dimensions. Batch processing emerged as a key technique for managing API costs before official batch APIs existed, though implementation details aren't fully specified.

Scalability improvements were dramatic, with the system evolving from processing tens of millions of transactions per quarter to tens of millions per week. The final architecture enables near real-time response, suggesting sophisticated infrastructure for high-throughput inference. Model evaluation and quality assurance relied heavily on human-in-the-loop validation, with accuracy metrics serving as the primary success criterion (60% → 80% → 90% across three generations). The article emphasizes that every GenAI decision goes through continuous validation combining LLM power with expert human feedback, ensuring precision and traceability.

Data privacy and ethics receive explicit emphasis, with MELI noting that user privacy, ethical AI, and robust security standards are foundational principles. They operate in a highly regulated financial environment where data handling must comply with Open Finance regulations across multiple jurisdictions. The article stresses that financial data sharing occurs only with proper user permissions and authorized third parties, though specific technical implementations of privacy-preserving techniques aren't detailed.

The multilingual and regional adaptation challenge represents a distinctive aspect of this use case. MELI operates across Latin America with different languages (Spanish, Portuguese), regional dialects, and country-specific financial contexts. Their custom embeddings were specifically trained on regional financial text to handle these variations, demonstrating domain and geographic specialization beyond general-purpose models.

## Production Infrastructure and Integration

MELI built their LLM-powered enrichment system on top of existing data infrastructure including Fury (their internal framework) and DataMesh (their data ownership and governance platform). This integration ensured that the AI capabilities could plug into established workflows for data processing, orchestration, and governance. The architecture evolved to be model-agnostic, allowing experimentation with different LLM providers (OpenAI, Google, Anthropic) without requiring fundamental redesign.

The system operates at impressive scale, processing hundreds of millions of transactions with semantic categorization that feeds into downstream use cases across the MELI ecosystem. The article hints at future applications including credit modeling, personalization engines, and conversational financial advisors that could answer natural language questions about spending patterns, subscription costs, and optimization opportunities.

## Critical Assessment and Limitations

While the case study presents an impressive technical evolution, several aspects warrant balanced consideration. The article is promotional in nature, published on Medium by MELI's tech team, and positions their approach very favorably. The dramatic accuracy improvements (60% → 80% → 90%) and cost reductions are presented without detailed methodology for measurement or comparison to alternative approaches. There's limited discussion of failure modes, edge cases, or categories where the system still struggles.

The human-in-the-loop validation process is emphasized for quality and compliance, but specific details about the validation workflow, sample rates, inter-annotator agreement, and how feedback actually improves models aren't provided. The claim of "near real-time" response needs context around actual latency requirements and whether all transactions are processed synchronously or if some enrichment happens asynchronously.

The custom embeddings approach is presented as a clear win, but the article doesn't discuss the training data requirements, fine-tuning methodology, model architecture details, or how they maintain and update these embeddings as financial patterns evolve. There's no mention of A/B testing frameworks, gradual rollout strategies, or monitoring systems to detect model degradation in production.

Despite these limitations in technical depth, the case study provides valuable insights into pragmatic LLMOps at scale in a regulated financial environment. The three-generation evolution demonstrates thoughtful iteration based on production constraints, and the emphasis on human validation and ethical considerations reflects mature thinking about AI in sensitive domains.

## Broader Implications

MELI's journey illustrates several important patterns for LLMOps practitioners. First, the evolution from rule-based systems to LLMs to custom embeddings shows that LLMOps isn't always about using the biggest model but rather about finding the right tool for production constraints. Second, the human-in-the-loop approach demonstrates that in regulated domains, AI augmentation rather than full automation may be the appropriate production strategy. Third, the model-agnostic architecture and willingness to switch between providers (GPT-3.5 to GPT-4o-mini, experimentation with Gemini and Claude) shows good engineering practices around flexibility and avoiding lock-in.

The case study also highlights the importance of domain specialization. General-purpose LLMs provided a foundation, but achieving 90% accuracy on Latin American financial transactions required custom embeddings trained on regional financial text. This investment in domain-specific models, while more resource-intensive upfront, paid dividends in accuracy, cost, and latency for a high-volume production use case.

Finally, MELI's work points toward a future where financial transaction data becomes the foundation for conversational AI interfaces and personalized financial guidance. The semantic engine they've built enables potential applications from credit risk assessment to budget optimization to natural language financial Q&A. Whether these future applications materialize as described remains to be seen, but the foundational infrastructure for semantic understanding of financial data at scale represents a significant LLMOps achievement in the LATAM fintech ecosystem.