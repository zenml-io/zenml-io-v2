---
title: "AI-Powered Fraud Detection at National Payment Infrastructure Scale"
slug: "ai-powered-fraud-detection-at-national-payment-infrastructure-scale"
draft: false
llmopsTags:
  - "fraud-detection"
  - "regulatory-compliance"
  - "realtime-application"
  - "fine-tuning"
  - "latency-optimization"
  - "kubernetes"
  - "open-source"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "microservices"
  - "scaling"
  - "devops"
  - "redis"
  - "cache"
industryTags: "finance"
company: "NPCI"
summary: "NPCI, India's national payment infrastructure operator, faced the challenge of scaling fraud detection capabilities alongside their massive UPI payment system, which processes 24 billion transactions monthly generating 2 terabytes of daily data. To address this, they built a comprehensive AI platform using a four-layer architecture built entirely on open-source technologies, incorporating streaming data pipelines with Kafka, object storage, and query layers to enable real-time fraud detection models that respond within 20 milliseconds. The solution also includes domain-specialized language models fine-tuned for India's financial ecosystem supporting all local languages, capable of understanding transaction patterns and handling customer disputes, while the entire platform leverages CNCF and Linux Foundation projects to create a diverse, resilient infrastructure without single points of failure."
link: "https://www.youtube.com/watch?v=ibIa0dw3AGg"
year: 2026
seo:
  title: "NPCI: AI-Powered Fraud Detection at National Payment Infrastructure Scale - ZenML LLMOps Database"
  description: "NPCI, India's national payment infrastructure operator, faced the challenge of scaling fraud detection capabilities alongside their massive UPI payment system, which processes 24 billion transactions monthly generating 2 terabytes of daily data. To address this, they built a comprehensive AI platform using a four-layer architecture built entirely on open-source technologies, incorporating streaming data pipelines with Kafka, object storage, and query layers to enable real-time fraud detection models that respond within 20 milliseconds. The solution also includes domain-specialized language models fine-tuned for India's financial ecosystem supporting all local languages, capable of understanding transaction patterns and handling customer disputes, while the entire platform leverages CNCF and Linux Foundation projects to create a diverse, resilient infrastructure without single points of failure."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-fraud-detection-at-national-payment-infrastructure-scale"
  ogTitle: "NPCI: AI-Powered Fraud Detection at National Payment Infrastructure Scale - ZenML LLMOps Database"
  ogDescription: "NPCI, India's national payment infrastructure operator, faced the challenge of scaling fraud detection capabilities alongside their massive UPI payment system, which processes 24 billion transactions monthly generating 2 terabytes of daily data. To address this, they built a comprehensive AI platform using a four-layer architecture built entirely on open-source technologies, incorporating streaming data pipelines with Kafka, object storage, and query layers to enable real-time fraud detection models that respond within 20 milliseconds. The solution also includes domain-specialized language models fine-tuned for India's financial ecosystem supporting all local languages, capable of understanding transaction patterns and handling customer disputes, while the entire platform leverages CNCF and Linux Foundation projects to create a diverse, resilient infrastructure without single points of failure."
notion:
  pageId: "397f8dff-2538-80d0-b59f-f8de9a975cb7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:54:00.000Z"
  lastEditedTime: "2026-07-08T19:54:00.000Z"
  publishedAt: "2026-07-08T20:13:29Z"
---

## Overview

NPCI operates India's Unified Payments Interface (UPI), a critical national payment infrastructure that has grown to handle 24 billion transactions per month as of 2026, processing approximately 285 billion rupees monthly. The organization, established in 2008 as a not-for-profit entity backed by India's financial regulator and major banks, has built this entire infrastructure using 100% open-source technologies. The system handles approximately 240,000 requests per second with a guaranteed P99 latency of 100 milliseconds in an active-active architecture. As the payment volume scaled dramatically from reaching their first billion transactions in 2019 to current levels, NPCI faced a fundamental challenge: how to scale their fraud detection and prevention capabilities proportionally without creating bottlenecks or single points of failure.

The case study presents an interesting perspective on LLMOps at scale because it combines traditional machine learning fraud detection systems with more recent advances in domain-specialized large language models. NPCI established their AI team in 2019, positioning themselves ahead of the broader AI hype cycle, and has since evolved their approach to incorporate generative AI capabilities alongside their existing ML infrastructure. The organization's commitment to open source extends not only to consumption but also to contribution, with recent efforts to open-source their enhancements and custom-built solutions back to the community.

## Technical Architecture and Platform Approach

NPCI approached the scaling challenge by building a comprehensive AI platform designed around three core principles: enabling efficient training and inferencing, ensuring data accessibility across the organization, and creating infrastructure diversity to eliminate single points of failure. The architecture follows a four-layer design that provides extensive abstraction while maintaining operational efficiency.

The first layer consists of the underlying infrastructure itself, which runs on open-source components. The second layer comprises custom drivers that interface with this infrastructure. The third layer contains platform tools that standardize operations, management, and control mechanisms. The fourth and topmost layer is an ecosystem layer that handles repository management, discoverability, metadata availability, and other organizational concerns. This layered approach has proven critical to their ability to rapidly onboard new models and make them production-ready without extensive reconfiguration.

The technology stack draws heavily from Cloud Native Computing Foundation (CNCF) and Linux Foundation projects, with only a minimal footprint of proprietary licensed software. This architectural decision reflects both a philosophical commitment to open source and a practical recognition that open-source technologies provide the flexibility needed for national-scale infrastructure customization. The emphasis on abstraction layers allows NPCI to swap out components, upgrade systems, and adapt to new technologies without disrupting the production payment flow.

## Real-Time Fraud Detection Models

Every UPI transaction processed through NPCI's infrastructure passes through AI-powered fraud detection systems that operate in real-time. These models must respond within a strict 20-millisecond service-level agreement, making them among the most latency-sensitive production ML deployments described in public case studies. The models analyze transaction patterns and can either decline suspicious transactions outright or provide feedback to banks, allowing them to make informed decisions about whether to proceed.

The 20-millisecond latency requirement is particularly challenging given the scale of operations. With 240,000 requests per second and 24 billion transactions monthly, the fraud detection system must maintain consistent performance under extreme load while ensuring high accuracy to avoid both false positives (which frustrate legitimate users) and false negatives (which allow fraud). The case study does not provide specific metrics on model accuracy, precision, or recall, nor does it detail the false positive and false negative rates, which would be valuable for assessing the real-world performance of these systems. While the claim of 20-millisecond response times is impressive, the lack of specificity about what percentage of transactions meet this SLA or whether this represents mean, median, or worst-case latency leaves some questions about the actual production performance characteristics.

The fraud models themselves have been open-sourced by NPCI, reflecting their commitment to contributing back to the community. This is a notable decision given that fraud detection models often represent competitive advantages and contain sensitive logic. The open-sourcing suggests either that NPCI's advantage lies more in their data and operational expertise than in proprietary algorithms, or that they believe transparency and community improvement will ultimately benefit the ecosystem more than secrecy.

## Data Platform and Infrastructure

The scale of data generated by UPI presents significant engineering challenges. The system produces approximately 2 terabytes of transactional data daily, not counting other operational and analytical data streams. To manage this volume, NPCI built a relatively straightforward but effective data platform architecture centered around streaming and batch processing patterns.

At the foundation, all backend systems write events to Kafka streams, creating a unified event log that serves as the source of truth for the platform. From Kafka, the data flows through two parallel processing paths: stream processing for real-time use cases like fraud detection, and batch processing for analytical and training workloads. Both processing paths perform transformations and aggregations as needed before writing results to object storage, using either Ceph or MinIO as the storage backend.

On top of the object storage layer, NPCI built a query layer that simplifies data access and enables further transformations. This query layer is exposed through Apache Superset, providing a self-service analytics interface that democratizes data access across the organization. Product teams, business analysts, engineers, and support staff can all explore data, build visualizations, and perform analyses without requiring deep technical expertise or custom code.

Importantly, this same data repository architecture extends to support the model lifecycle. Training data, feature stores, model artifacts, and inference results all flow through the same fundamental infrastructure, creating consistency and reducing operational complexity. This unified approach contrasts with organizations that build separate infrastructure for analytics and ML, often creating data silos and integration challenges.

The architecture described is pragmatic and well-suited to the use case, though it represents a relatively conventional approach to data platform design rather than cutting-edge innovation. The emphasis on simplicity and proven technologies makes sense for critical infrastructure where reliability trumps novelty. However, the case study does not address several important operational questions: how they handle data governance and access control across such a democratized platform, how they manage schema evolution and breaking changes in streaming data, or how they ensure data quality and validation at the scale they operate.

## Domain-Specialized Language Models

In addition to traditional ML fraud models, NPCI has developed domain-specialized language models fine-tuned specifically for India's financial ecosystem. These models represent the more recent LLMOps aspect of their work and demonstrate an evolution beyond pure transaction-based fraud detection into more sophisticated natural language understanding capabilities.

The domain-specialized models support all of India's languages, reflecting the country's linguistic diversity and the need for inclusive financial infrastructure. They are designed to understand day-to-day transaction language, including the informal ways people describe payments, and can handle customer concerns and disputes through conversational interfaces. This suggests the models serve multiple purposes: potentially assisting customer service operations, helping users understand their transaction history, and possibly even detecting fraud patterns that emerge through unusual communication patterns rather than just transaction metadata.

Fine-tuning for domain specialization makes considerable sense in the financial context, where generic language models often lack understanding of specific terminology, regulatory concepts, and local payment patterns. However, the case study provides limited technical detail about how these models were built, what base models were used, what fine-tuning approaches were employed, or how they are deployed in production. Questions remain about the scale of fine-tuning data required, the computational resources needed for training and inference, and how model performance is evaluated in production.

The multilingual capability is particularly noteworthy and challenging. India has 22 officially recognized languages plus hundreds of dialects, and financial inclusion requires serving users in their preferred language. Developing, fine-tuning, and maintaining models across this linguistic landscape represents significant engineering effort. The case study does not detail whether they use separate models per language, multilingual models, or some hybrid approach, nor how they ensure consistent quality across languages.

One aspect that requires careful consideration is the potential gap between capability claims and demonstrated production use. While the case study states these models "understand your day-to-day transactions" and allow users to "directly interface with that," there is limited evidence provided about the scale of deployment, user adoption, or measured effectiveness. In the context of a presentation promoting open-source contributions and digital public infrastructure, there may be a tendency to present capabilities in their best light. A balanced assessment would benefit from more specific metrics: how many queries do these models handle daily, what are the accuracy rates for different tasks, how often do they provide incorrect or unhelpful responses, and what fallback mechanisms exist when the models fail?

## Open Source Contributions and Ecosystem Building

NPCI has transitioned from being primarily a consumer of open-source technologies to actively contributing back to the community. They have open-sourced several significant projects that emerged from their production infrastructure needs. Dronex, announced just prior to this presentation in 2026, provides a complete tokenization infrastructure capable of supporting 10,000 transactions per second, designed to reduce entry barriers for tokenizing digital assets in India. Falcon serves as an orchestrator for managing the entire lifecycle of blockchain networks. These contributions, along with the fraud detection models and other enhancements they have made to existing open-source projects, represent a meaningful give-back to the ecosystem that supported their infrastructure development.

This approach to open source aligns with the principles of digital public infrastructure, where foundational technologies are treated as public goods rather than proprietary assets. By open-sourcing components like tokenization infrastructure, NPCI potentially enables smaller players to build payment and financial services without needing to replicate the substantial engineering investment NPCI has made. This can accelerate innovation in the broader ecosystem while also benefiting NPCI through community improvements and contributions to their code.

However, the sustainability and governance of these open-source projects remain unclear from the case study. Open-sourcing code is valuable, but maintaining high-quality open-source projects requires ongoing investment in documentation, community management, issue triage, and compatibility maintenance. Whether NPCI has committed the resources necessary for these projects to thrive as independent open-source efforts, or whether they represent point-in-time code dumps, significantly impacts their ultimate value to the community.

## LLMOps Maturity and Production Considerations

From an LLMOps perspective, NPCI demonstrates several mature practices alongside areas where more detail would strengthen the case study's credibility. On the positive side, they have built comprehensive infrastructure for model deployment, established strict latency requirements, and integrated AI capabilities into critical production systems handling enormous scale. The platform approach with clear abstraction layers, unified data infrastructure, and self-service capabilities reflects sophisticated thinking about how to operationalize AI at organizational scale.

The integration of models into the transaction flow with 20-millisecond SLA requirements demonstrates a commitment to treating AI as core infrastructure rather than experimental add-ons. This is genuine production LLMOps, where model failures have immediate business impact and user-facing consequences. The active-active architecture and emphasis on eliminating single points of failure suggest they have thought carefully about resilience and disaster recovery for their AI systems.

However, several critical LLMOps practices receive little or no coverage in the case study. There is no discussion of model monitoring, performance degradation detection, or automated retraining pipelines. How do they detect when fraud patterns shift and models need updating? What mechanisms exist to identify and mitigate model drift? How do they handle the cold-start problem when deploying new model versions? These operational questions are central to production LLMOps but remain unaddressed.

Similarly, the case study does not cover testing and validation practices. How do they test models before production deployment? What staged rollout or canary deployment practices do they employ? How do they validate that new model versions actually improve fraud detection without increasing false positives? For the language models, how do they evaluate generation quality, factual accuracy, and safety across multiple languages? These are complex problems without simple solutions, and the absence of detail makes it difficult to assess the maturity of their LLMOps practices beyond infrastructure.

The governance and compliance aspects of operating AI at this scale also receive minimal attention. How do they ensure models comply with financial regulations? What explainability mechanisms exist for fraud detection decisions, particularly when those decisions block legitimate transactions? How do they handle bias and fairness across India's diverse population? These questions become increasingly important as AI systems make consequential decisions about people's access to financial services.

## Balanced Assessment and Trade-offs

NPCI's case study presents an impressive example of AI and LLMOps at national infrastructure scale, demonstrating that open-source technologies can support critical systems with extreme performance requirements. The commitment to open source, both in consumption and contribution, is commendable and aligns well with the digital public infrastructure mission. The platform approach and architectural decisions reflect mature engineering thinking about scalability, resilience, and organizational enablement.

However, the case study is clearly positioned as advocacy for open source and promotion of NPCI's contributions rather than a technical deep-dive or critical examination of challenges faced. The presentation format naturally emphasizes successes and capabilities while glossing over difficulties, failures, and ongoing challenges. For a balanced assessment, several caveats deserve consideration.

First, performance claims like the 20-millisecond fraud detection latency and 100-millisecond P99 latency for transactions are presented without supporting evidence or context about measurement methodology. These are impressive numbers if accurate, but without knowing how they are measured, what percentage of requests actually meet these targets, or how performance varies across different conditions, it is difficult to validate the claims.

Second, the capabilities of the domain-specialized language models are described in fairly broad terms without specific use cases, adoption metrics, or performance characteristics. There is a risk that these represent emerging capabilities that are not yet deployed at scale rather than proven production systems. The presentation does not clearly distinguish between what is currently in production, what is in pilot testing, and what represents future direction.

Third, while the architecture and platform are described as enabling rapid model onboarding and development, there is little discussion of the challenges encountered, failed approaches, or trade-offs made. Every system at this scale faces difficult technical decisions with pros and cons, but the presentation naturally focuses on the positive outcomes. This makes it harder to learn from their experience and understand which approaches are fundamental to their success versus which might have alternatives that could work equally well or better.

Fourth, the open-source contribution aspect, while positive, raises questions about the strategic rationale. Why open-source fraud detection models that could help fraudsters understand detection mechanisms? Why give away tokenization infrastructure that could represent a competitive advantage? The answers might be perfectly sound—perhaps transparency improves trust, or community improvement provides greater value than secrecy—but the case study does not explore this reasoning.

Finally, the emphasis on open source as the foundation for success should be understood in context. Open source provides tremendous value in terms of cost, flexibility, and community support, but NPCI's success fundamentally derives from their data, operational expertise, and the engineering talent to customize and integrate open-source components effectively. Many organizations using the same open-source tools do not achieve NPCI's scale or performance, suggesting that the technology stack itself is necessary but not sufficient. The case study could more explicitly acknowledge the importance of organizational capability, investment, and expertise alongside technology choices.

## Conclusion

NPCI's journey to building AI-powered fraud detection and domain-specialized language models at national payment infrastructure scale represents a significant LLMOps achievement. They have demonstrated that open-source technologies can support critical infrastructure with demanding performance requirements, built a platform approach that enables organizational agility in AI development, and contributed meaningfully back to the open-source community. The integration of real-time fraud detection with 20-millisecond latency requirements into transaction processing at 240,000 requests per second shows genuine production LLMOps at impressive scale.

The domain-specialized language models for India's multilingual financial ecosystem represent an evolution beyond traditional ML toward more sophisticated natural language capabilities, though the production deployment and effectiveness of these models receive less detailed coverage. The data platform architecture, while not particularly novel, appears well-suited to their needs and has enabled the democratization of data access across the organization.

From an LLMOps learning perspective, the case study is valuable primarily for its architectural approach and scale characteristics rather than detailed operational practices. It demonstrates that careful infrastructure design, platform thinking, and commitment to eliminating single points of failure can enable AI at national scale. However, the presentation format and promotional context mean that critical operational details about monitoring, testing, validation, governance, and the challenges encountered receive less attention than would be ideal for a comprehensive LLMOps case study. Teams looking to learn from NPCI's experience should focus on the high-level architectural patterns and scaling strategies while recognizing that substantial additional operational sophistication beyond what is described would be necessary to actually replicate their success.
