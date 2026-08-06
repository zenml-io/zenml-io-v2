---
title: "Building Verifiable AI for Financial Services with Deterministic Substrates"
slug: "building-verifiable-ai-for-financial-services-with-deterministic-substrates"
draft: false
llmopsTags:
  - "regulatory-compliance"
  - "document-processing"
  - "structured-output"
  - "high-stakes-application"
  - "data-analysis"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "token-optimization"
  - "cost-optimization"
  - "databases"
  - "anthropic"
industryTags: "finance"
company: "Kepler"
summary: "Kepler addresses the fundamental challenge of making AI-generated financial work products verifiable and trustworthy in an industry where numerical accuracy is critical and regulatory requirements demand audit trails. Traditional LLM approaches that rely on citations and evaluations fall short because they cannot guarantee deterministic, numerically accurate outputs. Kepler's solution combines LLMs with deterministic computation through three core principles: atomic provenance (models reference but never manipulate numbers directly), scope determinism (models decide what to compute but never perform the computation), and derivation chains (tracking the full lineage of calculated values). This architecture allows the platform to generate financial models, DCF analyses, and consolidated financial statements in seconds while maintaining full traceability and numerical accuracy, enabling customers to reclaim analyst time from repetitive tasks while ensuring regulatory compliance."
link: "https://www.youtube.com/watch?v=Tt2kX2sgQio"
year: 2026
seo:
  title: "Kepler: Building Verifiable AI for Financial Services with Deterministic Substrates - ZenML LLMOps Database"
  description: "Kepler addresses the fundamental challenge of making AI-generated financial work products verifiable and trustworthy in an industry where numerical accuracy is critical and regulatory requirements demand audit trails. Traditional LLM approaches that rely on citations and evaluations fall short because they cannot guarantee deterministic, numerically accurate outputs. Kepler's solution combines LLMs with deterministic computation through three core principles: atomic provenance (models reference but never manipulate numbers directly), scope determinism (models decide what to compute but never perform the computation), and derivation chains (tracking the full lineage of calculated values). This architecture allows the platform to generate financial models, DCF analyses, and consolidated financial statements in seconds while maintaining full traceability and numerical accuracy, enabling customers to reclaim analyst time from repetitive tasks while ensuring regulatory compliance."
  canonical: "https://www.zenml.io/llmops-database/building-verifiable-ai-for-financial-services-with-deterministic-substrates"
  ogTitle: "Kepler: Building Verifiable AI for Financial Services with Deterministic Substrates - ZenML LLMOps Database"
  ogDescription: "Kepler addresses the fundamental challenge of making AI-generated financial work products verifiable and trustworthy in an industry where numerical accuracy is critical and regulatory requirements demand audit trails. Traditional LLM approaches that rely on citations and evaluations fall short because they cannot guarantee deterministic, numerically accurate outputs. Kepler's solution combines LLMs with deterministic computation through three core principles: atomic provenance (models reference but never manipulate numbers directly), scope determinism (models decide what to compute but never perform the computation), and derivation chains (tracking the full lineage of calculated values). This architecture allows the platform to generate financial models, DCF analyses, and consolidated financial statements in seconds while maintaining full traceability and numerical accuracy, enabling customers to reclaim analyst time from repetitive tasks while ensuring regulatory compliance."
notion:
  pageId: "3b4f8dff-2538-8045-abbd-f97b37e2fb44"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:29:00.000Z"
  lastEditedTime: "2026-08-06T11:29:00.000Z"
  publishedAt: "2026-08-06T11:46:55Z"
---

## Overview

Kepler has developed a production AI system specifically designed for financial services that addresses one of the most critical challenges in deploying LLMs for high-stakes work: verifiability and numerical accuracy. The company was founded by Venu Ganesh, who previously led compute platforms at Palantir and served as head of business engineering at Citadel. The case study was featured in what Anthropic claims is their only customer case study to date, highlighting the technical significance of Kepler's approach to productionizing LLMs in regulated environments.

The fundamental problem Kepler tackles is the gap between AI's ability to generate content rapidly and the inability to reliably verify that content in domains where accuracy is non-negotiable. In financial services, this manifests as analysts working extremely long hours because while AI can produce confident-sounding financial models, DCF analyses, or investment memos, there has been no reliable way to trust these outputs without extensive manual verification. The regulatory environment compounds this challenge, as agencies like the SEC and OCC require that trading decisions be justifiable and backed by verifiable sources of information.

## The Core Technical Problem

The presentation makes a critical distinction between AI's current capabilities and what's needed for production use in finance. The speaker argues that traditional evaluation-based approaches are fundamentally insufficient because they attempt to use non-deterministic LLMs to evaluate other non-deterministic systems. As probability machines, LLMs cannot be "eval'd" into deterministic behavior. Even fine-tuned models that achieve 94% accuracy on extraction tasks are unsuitable for trading decisions, because a wrong number in the unfortunate 6% of cases is still catastrophically wrong.

The challenge extends beyond simple accuracy to the nature of financial work itself. Finance is unique in that two people can have identical information yet reach opposite conclusions, with one party going long and another shorting the same stock. Verification in this context doesn't mean achieving ground truth, but rather ensuring that outputs respect the specific rules, assumptions, and methodologies of individual organizations. Different desks within the same hedge fund may have opposing views on the same security using the same verification mechanisms but different investment philosophies.

## The Three-Pillar Architecture

Kepler's production system is built on three core technical principles that work together to enable verifiable AI outputs:

### Atomic Provenance

The first pillar involves a strict separation between the LLM's role in identifying information and its ability to manipulate that information. When the model encounters a numerical value, it does not extract or write that number directly. Instead, it generates a reference to where that number exists. The actual extraction and persistence of numerical data is handled by deterministic systems optimized for that purpose, such as databases and specialized parsers.

This approach addresses a fundamental mismatch between what LLMs are good at and what the task requires. The model excels at understanding context and identifying relevant information but is poorly suited for precise numerical operations. By having the model write references rather than values, Kepler ensures that the model never has the opportunity to hallucinate or misrepresent numerical data. Every number that enters the system passes through a deterministic validation check, and any value that cannot be independently verified is stripped out before it reaches end users.

The provenance ledger tracks every extraction operation, creating an immutable record of where each data point originated. This goes beyond simple citation to create a complete audit trail that satisfies regulatory requirements while enabling debugging and verification workflows.

### Scope Determinism

The second pillar involves a clear division of labor between what the LLM decides and what it computes. The model is responsible for reasoning and planning, determining what calculations need to be performed and which data sources to consult. However, the model never performs mathematical operations itself. This represents a fundamental architectural choice: rather than running simple arithmetic like "1 + 1" through a multi-billion parameter model, Kepler delegates all computation to deterministic code.

The speaker frames this as using the right tool for the right job. Intelligence has become commoditized, with models like GLM 52 demonstrating capabilities comparable to earlier flagship models, but that doesn't mean every task should be routed through the neural network. When a model determines that it needs to calculate a metric like net margin, it identifies the required components but hands off the actual calculation to deterministic code that can guarantee numerical precision.

This architecture also provides cost benefits beyond accuracy. By reducing the scope of what the model handles, token consumption decreases dramatically. The speaker critiques the industry trend of "token maxing," noting the perverse incentive structure where employees are rewarded for spending more on vendor services rather than optimizing for efficiency and correctness.

### Derivation Chains

The third pillar addresses the challenge of complex financial metrics that don't exist directly in source documents. Ratios like gross margin, EBITDA adjustments, and enterprise value calculations are derived from multiple underlying data points, and different organizations calculate these metrics using different methodologies and assumptions.

Kepler's derivation chains track the complete lineage of how calculated values are produced. This is analogous to the chain of reasoning an analyst uses when making a trading decision, but codified in a way that can be replayed, audited, and verified. The system maintains a record of which data points were used, which transformations were applied, and which organizational rules governed the calculation.

This capability is essential for reconciliation and debugging. When a derived metric differs from expectations, the derivation chain allows users to trace back through each step to understand where the divergence occurred. It also enables the codification of firm-specific methodologies, ensuring that AI-generated outputs align with established practices rather than generic industry conventions.

## Production Capabilities and Constraints

The combined effect of these three pillars is a system that knows which data points it's permitted to produce and which it must never attempt. The model can extract structured information from XBRL filings, reference numerical data from financial documents, and orchestrate complex calculations, but it cannot hallucinate rows in financial models or invent data points from unstructured prose without deterministic validation.

This enables several production use cases that were previously infeasible. The system can consolidate financial statements in seconds with every number tied back to its source document. It can generate DCF models in organization-specific formats while ensuring that the model won't hallucinate the existence of rows or assumptions that shouldn't be present. Customers use the platform to analyze historical investment memoranda, audit internal rate of return calculations across years of deals, and automate the repetitive tasks that traditionally consume analyst time.

The speaker emphasizes that the work product itself serves as proof of correctness. In software engineering, commit histories, code reviews, and test results provide a permanent record of how code evolved and whether it meets specifications. Financial work products need similar treatment, and Kepler's architecture provides that by making the provenance and derivation information intrinsic to the outputs.

## Generalization Beyond Finance

While Kepler focuses on financial services, the speaker argues that the architectural principles generalize to any domain where verifiability matters. Legal technology companies working on case law research could use similar preprocessing to ensure that case citations are extracted deterministically rather than hallucinated by generative models. Drug discovery applications could apply the same principles to ensure that chemical compounds and formulations extracted from NIH papers are accurate and traceable.

The speaker draws an analogy to the early days of e-commerce, suggesting that the AI industry is in a "pre-SSL" phase. The total addressable market is enormous, but widespread adoption is blocked by the lack of trust mechanisms. Just as few people were willing to enter credit card numbers on websites before SSL provided security guarantees, enterprises won't deploy AI for mission-critical work without verifiability guarantees.

## Customer Adoption and Value

Customer feedback reveals that the primary value proposition centers on analyst productivity rather than replacing portfolio managers. The dream of fully autonomous AI portfolio managers exists, but portfolio managers themselves want AI analysts who can handle repetitive, time-consuming tasks. The most valued capabilities include automatically processing earnings call transcripts, generating initial versions of financial models by consolidating data from multiple filings, and performing comparative analyses across historical documents.

These tasks currently consume significant time from analysts who may earn $600,000 to $700,000 annually. The ability to automate this work without sacrificing accuracy or introducing regulatory risk represents substantial value both in cost savings and in allowing skilled analysts to focus on higher-value activities like interpretation and strategy.

## Technical Tradeoffs and Industry Context

The presentation offers a critical perspective on several industry trends. The focus on retrieval-augmented generation is characterized as helpful but insufficient, with the speaker noting that major labs are building their own RAG-based products because the technology itself provides limited defensibility. The critique of evaluations as a path to reliability is particularly pointed, arguing that stacking probabilistic systems on top of each other cannot produce deterministic outcomes.

The speaker also challenges the emerging culture around token consumption, questioning why organizations would reward employees for maximizing spending on API calls rather than optimizing for outcomes. This critique positions Kepler's architecture as addressing both technical and economic inefficiencies in how LLMs are currently deployed in production.

The comparison to historical optimization trends in cloud data platforms like Snowflake and Databricks suggests that the AI industry is approaching a similar inflection point where ROI and cost optimization will become central concerns. Organizations will increasingly demand to understand what value they're receiving for their AI spending and will seek architectures that use expensive model inference only where it provides unique value.

## Future Directions

Looking ahead, the speaker identifies personalization as the next frontier. Once basic verifiability problems are solved, the challenge becomes encoding organization-specific ontologies, investment processes, and analytical frameworks into AI systems. Rather than generic financial analysis, the goal is AI that can operate according to the specific methodologies and philosophies of individual firms, desks, or even individual analysts.

The vision extends to systems that can mine historical commit histories, code reviews, and decision records to build representations of organizational knowledge and reasoning patterns. This would enable AI systems that not only produce verifiable outputs but also align with the unique approaches that differentiate successful financial institutions from their competitors.

The case study represents a significant contribution to understanding how LLMs can be productionized in high-stakes, regulated environments. By acknowledging the fundamental limitations of probabilistic models and designing around them rather than attempting to eval or fine-tune away the problems, Kepler demonstrates a pragmatic approach to building AI systems that organizations can actually trust with mission-critical work.
