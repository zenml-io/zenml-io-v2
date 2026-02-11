---
title: "Multi-LLM Orchestration for Product Matching at Scale"
slug: "multi-llm-orchestration-for-product-matching-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad8e6328ed57785794a98"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:18.825Z"
  createdOn: "2025-12-23T18:01:10.345Z"
llmopsTags:
  - "classification"
  - "data-analysis"
  - "high-stakes-application"
  - "prompt-engineering"
  - "embeddings"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "cost-optimization"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "latency-optimization"
  - "error-handling"
  - "orchestration"
  - "databases"
  - "open-source"
  - "documentation"
  - "reliability"
  - "scalability"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "openai"
industryTags: "e-commerce"
company: "Mercado Libre"
summary: "Mercado Libre tackled the classic e-commerce product-matching challenge where sellers create listings with inconsistent titles, attributes, and identifiers, making it difficult to identify identical products across the platform. The team developed a sophisticated multi-LLM orchestration system that evolved from a simple 2-node architecture to a complex 7-node pipeline, incorporating adaptive prompts, context-aware decision-making, and collaborative consensus mechanisms. Through systematic iteration and careful orchestration alongside existing ML models and embedding systems, they achieved human-level performance with 95% precision and over 50% recall at a cost-effective rate of less than $0.001 per request, enabling scalable autonomous product matching across millions of items for critical use cases including pricing, personalization, and inventory optimization."
link: "https://medium.com/mercadolibre-tech/tale-of-a-prompt-development-c133081bca1e"
year: 2025
seo:
  title: "Mercado Libre: Multi-LLM Orchestration for Product Matching at Scale - ZenML LLMOps Database"
  description: "Mercado Libre tackled the classic e-commerce product-matching challenge where sellers create listings with inconsistent titles, attributes, and identifiers, making it difficult to identify identical products across the platform. The team developed a sophisticated multi-LLM orchestration system that evolved from a simple 2-node architecture to a complex 7-node pipeline, incorporating adaptive prompts, context-aware decision-making, and collaborative consensus mechanisms. Through systematic iteration and careful orchestration alongside existing ML models and embedding systems, they achieved human-level performance with 95% precision and over 50% recall at a cost-effective rate of less than $0.001 per request, enabling scalable autonomous product matching across millions of items for critical use cases including pricing, personalization, and inventory optimization."
  canonical: "https://www.zenml.io/llmops-database/multi-llm-orchestration-for-product-matching-at-scale"
  ogTitle: "Mercado Libre: Multi-LLM Orchestration for Product Matching at Scale - ZenML LLMOps Database"
  ogDescription: "Mercado Libre tackled the classic e-commerce product-matching challenge where sellers create listings with inconsistent titles, attributes, and identifiers, making it difficult to identify identical products across the platform. The team developed a sophisticated multi-LLM orchestration system that evolved from a simple 2-node architecture to a complex 7-node pipeline, incorporating adaptive prompts, context-aware decision-making, and collaborative consensus mechanisms. Through systematic iteration and careful orchestration alongside existing ML models and embedding systems, they achieved human-level performance with 95% precision and over 50% recall at a cost-effective rate of less than $0.001 per request, enabling scalable autonomous product matching across millions of items for critical use cases including pricing, personalization, and inventory optimization."
---

## Overview and Business Context

Mercado Libre, a major Latin American e-commerce platform, faced the classic product-matching challenge that plagues e-commerce operations at scale. The problem stems from the inherent inconsistency in how sellers, competitors, and providers create product listings: photos taken from different angles, titles with creative variations, attributes described inconsistently, and even standardized identifiers like EAN codes that vary wildly. The company needed an automated system to cut through this noise and determine whether products are truly identical, a capability critical to multiple high-value use cases including store personalization, relevant ad display, search result diversification, inventory optimization, and pricing or promotion recommendations.

The stakes were particularly high for pricing use cases. As the team notes, wrong product matches could be extremely costly when used to inform competitive pricing decisions. Their prior experience with pricing strategies had shown that pure machine learning wasn't yet accurate enough to operate autonomously in these high-stakes scenarios, despite deploying sophisticated ML models that combined advanced NLP techniques, multiple embeddings for images and text, and attribute enrichment developed over years.

## Existing System Architecture

Before introducing LLMs, Mercado Libre operated a multi-stage pipeline that was already quite sophisticated but still required human oversight in critical scenarios. The existing approach included:

- Selecting target items requiring matching
- Using different open-source embedding models to encode item features
- Deploying Approximate Nearest Neighbors (ANN) algorithms to identify potential matching candidates quickly
- Processing candidates through a machine learning model to calculate match probabilities
- Conducting human oversight for sensitive products and use cases

Behind the scenes, this system incorporated vector databases, data preprocessing pipelines, and a network of APIs streamlining each step. However, the ML model, despite its sophistication, couldn't achieve the accuracy needed to fully automate the process, particularly for high-stakes applications like pricing.

## LLM Integration Approach

Drawing from extensive prior experience with LLMs at Mercado Libre (referenced through their published lessons learned and methodology connecting GenAI with CRISP-DM), the team approached this challenge using systematic prompt engineering. Their initial three-step LLM pipeline produced disappointing results with only 38% precision and 13% recall, significantly below their existing ML model's performance. However, after several days of prompt refinement, they achieved 65% precision and 79% recall, indicating the direction was promising, especially as models continued improving and costs declined.

Critically, the solution had to stay within tight cost thresholds to be truly scalable given the need to evaluate millions of items and matches. This cost constraint shaped every design decision throughout the development process.

## Systematic Development Methodology

The team followed an iterative approach based on methodology from Jurafsky & Martin's "Speech and Language Processing" playbook. The process involved running prompts on sample training examples, identifying failure cases, modifying prompts to address issues, and generalizing to prevent overfitting while ensuring broader applicability.

They started strategically with small datasets: 50, 500, and 5,000 human-labeled examples. The rationale for small samples was that true improvement comes from scrutinizing individual failures to identify patterns and make generalizations. By examining each failure in detail, patterns emerged that could be systematically addressed. Throughout iterations, they tweaked prompts, adjusted flows, and split or merged tasks as needed.

## Complexity Dimensions

The project's complexity unfolded across three main dimensions that had to be optimized simultaneously:

- **Designing LLM nodes and their interactions**: How multiple LLM components would orchestrate together
- **Crafting and refining prompts**: The actual prompt engineering for each node
- **Selecting appropriate models and providers**: Choosing which LLMs and which providers to use for each task

The team leveraged Mercado Libre's in-house LLM orchestration system called "Verdi" (referenced as an OpenAI partnership), which enabled rapid iteration and production of multiple experimental versions daily. This infrastructure proved critical to the iterative development approach.

## Key LLMOps Insights and Learnings

Through their extensive experimentation, the team discovered several important lessons for production LLM systems:

**Trial and error as core strategy**: Breaking down tasks into structured, human-like steps and allowing models space to reason significantly improved performance. This suggests that mimicking human cognitive processes in task decomposition yields better results than trying to have a single model solve everything at once.

**Incremental improvement methodology**: Rather than adjusting every component simultaneously, they worked systematically, focusing on one aspect at a time. This isolation approach allowed them to identify precisely which changes led to better or worse outcomes, a critical discipline for production systems where causality can be difficult to establish.

**Model consistency challenges**: An interesting finding was that simpler models run twice outperformed complex models in reliability. This counter-intuitive result highlights that for production systems, consistency and reliability may matter more than raw capability, especially when you can compensate through architecture (running models multiple times or in sequence).

**Variable effectiveness of prompting approaches**: Automated prompting tools proved less useful than initially expected. However, explicitly asking LLMs for feedback (meta-prompting like "Here's my prompt and the error I'm getting; what should I change?") returned surprisingly valuable suggestions. This suggests that LLMs can serve as effective debugging partners in prompt development.

**Reflection mechanisms**: Encouraging models to explain or justify their responses improved both their internal reasoning and the team's ability to understand how models arrived at conclusions. Reflection benefited not just performance but also interpretability and communication of LLM outputs, important for building trust in production systems.

**Power-first optimization approach**: Testing initially with more powerful models proved effective. Once achieving good results, they could scale down carefully until meeting cost requirements. This resulted in greater confidence and overall efficiency compared to starting with cheaper models and trying to scale up.

**Sensitive case benchmarking**: Identifying challenging or sensitive examples provided valuable benchmarks for detecting overfitting and ensuring genuine improvements in generalization rather than just fitting to the training set.

## Evolution of System Architecture

The system evolved dramatically from initial to final configuration:

The initial system used a 2-node configuration with basic prompts and a single model/provider. The final production system deployed a sophisticated 7-node architecture with multiple improvements including adaptive prompts that could adjust based on context, context-aware decision-making processes, and collaborative consensus mechanisms between nodes where multiple LLM components could validate each other's outputs.

The diagram in the article illustrates various LLM configurations with different colors representing distinct models and providers, showing the heterogeneous nature of their final architecture. This wasn't a simple linear pipeline but rather an orchestrated system where different specialized models handled different aspects of the matching decision.

## Performance and Cost Optimization

The development trajectory was explicitly non-linear, as evidenced by performance graphs showing a "roller coaster" pattern rather than steady improvement. Some days brought significant progress while others involved trade-offs where improving one metric like precision came at the cost of recall. These trade-offs forced reconsideration of even small changes. At times, days of work led to dead ends requiring full rollbacks.

Despite these challenges, the exhaustive iterative process yielded remarkable results. The team achieved their ambitious target: 95% precision and at least 50% recall, with a cost of less than $0.001 per request. This cost threshold was necessary for ROI-effective scalability across millions of items. The achievement demonstrated that carefully crafted prompts and strategic model selection could deliver both high performance and economic viability at scale, reaching human-level performance with greater reliability, consistency, and cost-effectiveness than human review.

## Cost Management Lessons

The team encountered critical lessons about managing costs in production AI services. Token counts and input processing methods vary widely among providers, with some assessing tokens pixel-by-pixel while others enforce strict character limits, leading to unexpected costs during experimentation. Midway through testing, they had to implement specific controls to maintain budget discipline. This experience served as a reminder that GenAI services, like any on-demand solution, require robust safeguards to scale to production without incurring costly errors. The explicit mention of this challenge is valuable for other teams building production LLM systems, as cost overruns during experimentation and production can quickly undermine project viability.

## System Integration and Holistic Architecture

A critical insight from this case study is that success didn't come from LLMs alone but from orchestrating multiple components together. The final system integrated embeddings, ML models, vector databases with fast retrieval, and LLMs working in concert. The team explicitly noted that real breakthroughs come from bringing together multiple smart components, each doing what it does best, rather than expecting a single technology to solve everything. This holistic view represents a mature LLMOps perspective that recognizes LLMs as powerful tools within a larger system rather than complete solutions in themselves.

The existing infrastructure—including open-source embedding models, ANN algorithms for candidate retrieval, and vector databases—provided a foundation that LLMs could enhance rather than replace. The LLMs served as the final decision-making layer that could handle the nuanced, context-dependent judgments that previous ML models struggled with, particularly in edge cases and sensitive scenarios.

## Production Deployment and Impact

The solution enabled fully autonomous operation for product matching at scale, removing the human-in-the-loop requirement that had previously limited scalability, particularly for pricing applications. This automation unlocked the ability to process millions of items and matches economically, enabling new use cases that weren't viable with manual review.

The team indicates ongoing exploration of additional manual processes at Mercado Libre where similar approaches could be applied, suggesting this represents a template for future automation initiatives. They also mention deeper dives into image and video generation and reimagining marketing processes, indicating that this product-matching solution serves as a foundation for broader GenAI adoption across the company.

## Critical Assessment and Balanced Perspective

While the case study presents impressive results, several considerations warrant mention for a balanced assessment. The article is written by Mercado Libre team members and presents their work in a positive light, which is natural but means claimed results should be viewed as self-reported. The 95% precision and 50% recall metrics are strong, though the specific evaluation methodology and dataset characteristics aren't detailed. The article doesn't discuss false positive or false negative costs in detail, which would be important for fully understanding the business impact.

The cost figure of less than $0.001 per request is impressive but depends on specific provider pricing, token counts, and model selection that may change over time. The architecture's complexity (7 nodes with multiple models and providers) introduces operational complexity, monitoring challenges, and potential points of failure that aren't discussed in detail. Managing such a system in production likely requires sophisticated orchestration, monitoring, and debugging capabilities.

The non-linear development path with frequent rollbacks and trade-offs illustrates that this wasn't a straightforward engineering effort but rather required significant experimentation and expertise. Teams attempting similar solutions should budget time and resources accordingly. The reliance on Mercado Libre's proprietary "Verdi" orchestration system suggests that organizations without similar infrastructure might face additional challenges in replicating this approach.

Nevertheless, the case study provides valuable insights into real-world LLMOps challenges and solutions, particularly around multi-model orchestration, cost optimization, iterative development methodology, and the integration of LLMs into existing ML pipelines. The transparency about challenges, failed experiments, and cost management issues makes this a particularly useful reference for practitioners building production LLM systems.