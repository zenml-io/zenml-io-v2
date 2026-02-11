---
title: "Automated Product Attribute Extraction and Title Standardization Using Agentic AI"
slug: "automated-product-attribute-extraction-and-title-standardization-using-agentic-ai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad9ac91ce3499084cdd57"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:19.169Z"
  createdOn: "2025-12-23T18:04:28.716Z"
llmopsTags:
  - "classification"
  - "data-cleaning"
  - "data-integration"
  - "structured-output"
  - "multi-modality"
  - "prompt-engineering"
  - "knowledge-distillation"
  - "fine-tuning"
  - "human-in-the-loop"
  - "agent-based"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "multi-agent-systems"
  - "openai"
industryTags: "e-commerce"
company: "Delivery Hero"
summary: "Delivery Hero Quick Commerce faced significant challenges managing vast product catalogs across multiple platforms and regions, where manual verification of product attributes was time-consuming, costly, and error-prone. They implemented an agentic AI system using Large Language Models to automatically extract 22 predefined product attributes from vendor-provided titles and images, then generate standardized product titles conforming to their format. Using a predefined agent architecture with two sequential LLM components, optimized through prompt engineering, Teacher/Student knowledge distillation for the title generation step, and confidence scoring for quality control, the system achieved significant improvements in efficiency, accuracy, data quality, and customer satisfaction while maintaining cost-effectiveness and predictability."
link: "https://tech.deliveryhero.com/blog/how-delivery-hero-uses-agentic-ai-for-building-a-product-knowledge-base/"
year: 2025
seo:
  title: "Delivery Hero: Automated Product Attribute Extraction and Title Standardization Using Agentic AI - ZenML LLMOps Database"
  description: "Delivery Hero Quick Commerce faced significant challenges managing vast product catalogs across multiple platforms and regions, where manual verification of product attributes was time-consuming, costly, and error-prone. They implemented an agentic AI system using Large Language Models to automatically extract 22 predefined product attributes from vendor-provided titles and images, then generate standardized product titles conforming to their format. Using a predefined agent architecture with two sequential LLM components, optimized through prompt engineering, Teacher/Student knowledge distillation for the title generation step, and confidence scoring for quality control, the system achieved significant improvements in efficiency, accuracy, data quality, and customer satisfaction while maintaining cost-effectiveness and predictability."
  canonical: "https://www.zenml.io/llmops-database/automated-product-attribute-extraction-and-title-standardization-using-agentic-ai"
  ogTitle: "Delivery Hero: Automated Product Attribute Extraction and Title Standardization Using Agentic AI - ZenML LLMOps Database"
  ogDescription: "Delivery Hero Quick Commerce faced significant challenges managing vast product catalogs across multiple platforms and regions, where manual verification of product attributes was time-consuming, costly, and error-prone. They implemented an agentic AI system using Large Language Models to automatically extract 22 predefined product attributes from vendor-provided titles and images, then generate standardized product titles conforming to their format. Using a predefined agent architecture with two sequential LLM components, optimized through prompt engineering, Teacher/Student knowledge distillation for the title generation step, and confidence scoring for quality control, the system achieved significant improvements in efficiency, accuracy, data quality, and customer satisfaction while maintaining cost-effectiveness and predictability."
---

## Overview and Business Context

Delivery Hero Quick Commerce operates in the fast-paced quick commerce sector, managing extensive product catalogs spanning multiple geographical regions and platforms. The company confronted a fundamental challenge common to large-scale e-commerce operations: ensuring accurate, consistent, and detailed product information across their entire catalog. Historically, the process of verifying product attributes such as brand, flavor, volume, and specific features relied heavily on manual processes. While this approach could work for small-scale operations, it fundamentally failed to scale with their business needs. The manual verification was not only time-consuming and expensive but also inherently prone to human error, creating inconsistencies that cascaded through their operations affecting inventory management, search relevance, and ultimately customer satisfaction.

The business imperative for structured product attributes extended beyond simple data cleanliness. Structured attributes unlock three critical capabilities: enhanced search functionality allowing users to precisely filter products (such as "Show me all vanilla-flavored ice creams from Ben & Jerry's"), smarter recommendation systems that can suggest relevant items based on shared attributes with previously viewed or purchased products, and deeper analytics that reveal trends in popular brands, flavors, and sizes to inform merchandising strategies and data-driven business decisions. These capabilities directly translate to improved customer experiences and operational efficiency.

## Technical Architecture and Design Decisions

The technical foundation of Delivery Hero's solution leverages recent advancements in multimodal Large Language Models capable of understanding both text and images. The company faced an additional complexity beyond simple attribute extraction: vendor-provided product titles often lacked crucial attributes or failed to adhere to Delivery Hero's standardized format, with different vendors using varying structures that created catalog inconsistencies. This required a solution that could both extract attributes and restructure titles into a consistent format.

When evaluating architectural approaches, the team considered three patterns for LLM-based services: single-turn LLM queries suitable for simpler tasks like summarization but insufficient for their multi-step requirements, predefined agents where multiple LLM calls are orchestrated in a predetermined sequence with each step feeding into the next, and dynamically orchestrated agents where the system uses LLMs to direct its own process with potential loops or path changes based on intermediate results.

The team's decision to adopt a predefined agents approach rather than dynamically orchestrated agents reflects a careful consideration of production requirements. Their priorities centered on efficiency, cost-effectiveness, predictability, and debuggability for a core cataloging process. The two-step task structure—first extract attributes, then use those attributes to generate a standardized title—naturally mapped to a predefined sequential approach. The comparison they documented reveals key operational considerations: predefined agents offer lower and fixed costs with fewer LLM calls, lower and consistent latency, higher predictability, and easier debugging following a set path, though with lower flexibility and no self-correction capabilities. Dynamically orchestrated agents, conversely, provide higher flexibility with dynamic path adjustment and self-correction through looping or revisiting steps, but at the cost of higher and variable expenses, increased latency, lower predictability, and more challenging debugging due to unpredictable trajectories.

Importantly, the team acknowledges this as a pragmatic rather than dogmatic choice. They recognize that dynamically orchestrated agents might be appropriate for specific scenarios where maximum accuracy is critical and higher latency and cost can be justified, leaving the door open for future exploration of that pattern for use cases that demand it.

## Implementation Details

The production system consists of two core LLM components orchestrated sequentially. The first component handles attribute extraction, receiving vendor product titles and images as inputs and extracting a comprehensive set of 22 predefined attribute types including brand, flavor, volume, and other relevant characteristics. The second component performs title generation, taking the extracted attributes and generating a new product title conforming to Delivery Hero QC's standardized format.

## Optimization Strategies

The team implemented multiple optimization strategies to balance performance, accuracy, and operational costs. Prompt engineering received significant attention, with the team meticulously crafting concise and unambiguous prompts for both the attribute extraction and title generation steps. This optimization served multiple purposes: removing redundant or confusing instructions reduced token usage which directly lowered operational costs and latency, while simultaneously minimizing the chance of the LLM misunderstanding the task, thereby improving accuracy.

Knowledge distillation through a Teacher/Student fine-tuning paradigm represents a sophisticated optimization particularly for the title generation step. Initially, guiding the LLM to produce standardized titles required providing numerous examples of their format within the prompt itself. While effective, this approach led to lengthy prompts that increased both processing time and costs. The knowledge distillation strategy implemented a two-stage process: first, a powerful "teacher" LLM such as GPT-4o was used with detailed prompts containing many examples to create a large dataset of high-quality, correctly formatted titles based on diverse inputs. This generated dataset effectively encapsulated the teacher model's expertise in title standardization. Subsequently, this dataset was used to fine-tune a smaller, more efficient "student" LLM such as GPT-4o-mini. Evaluations demonstrated that after a few training cycles, the fine-tuned student model could replicate the teacher's output quality but with much shorter and more efficient prompts. This knowledge transfer method significantly reduced operational costs and latency for the title generation component by effectively transferring the larger model's capabilities to a more streamlined student model.

## Quality Control and Human-in-the-Loop

Confidence scoring provides a critical quality control mechanism in the production system. The implementation processes output logits from the LLMs and converts them into probability scores, effectively quantifying the model's confidence in its generated attributes and titles. Outputs falling below a predefined confidence threshold are automatically flagged and routed for human review. This establishes a crucial human-in-the-loop system ensuring that edge cases or potentially uncertain predictions receive manual verification, maintaining quality standards while still achieving significant automation benefits.

## Production Considerations and Critical Assessment

From an LLMOps perspective, this case study demonstrates several production best practices. The system addresses key operational concerns including cost management through model selection and prompt optimization, latency control through architectural choices favoring predictability, quality assurance through confidence scoring and human review, and scalability through automation of previously manual processes.

However, readers should approach some aspects with appropriate critical perspective. The case study, being published on Delivery Hero's own technology blog, naturally emphasizes successes while providing limited discussion of challenges encountered, failure modes, or iterations required to reach the current state. The claimed improvements in efficiency, accuracy, data quality, and customer satisfaction are presented without specific metrics or quantitative validation, making it difficult to assess the magnitude of impact. The comparison between predefined and dynamically orchestrated agents, while useful, presents a somewhat simplified view that may not capture the full complexity of production trade-offs in all scenarios.

The knowledge distillation approach using Teacher/Student fine-tuning is particularly noteworthy from an LLMOps standpoint, representing a practical strategy for reducing operational costs in production while maintaining quality. The statement that "after a few training cycles" the student model could replicate teacher performance raises questions about how "a few" is defined, what metrics were used for evaluation, and how performance was validated across the full distribution of product types and edge cases. The fine-tuning process itself requires infrastructure for dataset creation, model training, evaluation, and deployment that the case study doesn't detail.

The confidence scoring mechanism for quality control demonstrates thoughtful production design, but the case study doesn't discuss how confidence thresholds were determined, what proportion of outputs fall below threshold requiring human review, how the human review process is structured, or how feedback from human reviewers is incorporated back into the system for continuous improvement. The operational costs saved through automation must be balanced against the costs of maintaining the human review process for flagged outputs.

The choice of a predefined agent architecture over dynamically orchestrated agents reflects mature production thinking, prioritizing operational predictability and debuggability over theoretical maximum performance. However, the case study doesn't discuss monitoring and observability practices, how they detect and respond to model drift or degradation in production, or how they handle updates to the system as product catalogs, vendor behaviors, or business requirements evolve.

The use of multimodal models processing both text and images represents an important technical choice, though the case study provides limited detail about how image processing contributes to attribute extraction beyond text alone, what types of products benefit most from multimodal processing, or how the system handles cases where images are missing, low quality, or potentially misleading.

## Broader LLMOps Implications

This case study exemplifies several important patterns in production LLM systems. The sequential composition of LLM components to handle multi-step tasks, the strategic use of model size variants (GPT-4o as teacher, GPT-4o-mini as student) to optimize the cost-performance trade-off, the emphasis on prompt engineering as a primary optimization lever, and the implementation of confidence-based quality gates with human review all represent emerging best practices in LLMOps.

The transparency about architectural trade-offs, particularly the explicit comparison between predefined and dynamically orchestrated agents with acknowledgment that different patterns may be appropriate for different scenarios, provides valuable perspective for practitioners facing similar decisions. The recognition that maximizing accuracy isn't always the primary objective—sometimes efficiency, cost, and predictability take precedence—reflects production maturity.

The knowledge distillation approach demonstrates how organizations can leverage powerful but expensive models to train more efficient models for production deployment, an increasingly important pattern as LLM costs remain a significant operational consideration. This pattern also provides a pathway for capturing and preserving domain-specific knowledge in model weights rather than relying solely on prompt engineering.

From a production operations perspective, the system addresses fundamental LLMOps concerns around cost management, latency control, quality assurance, and scalability. The confidence scoring mechanism provides a practical approach to balancing automation benefits with quality requirements, though the effectiveness depends heavily on implementation details not fully disclosed in the case study.

The application domain—product catalog management—represents a practical use case where LLMs can provide clear business value through automation of previously manual tasks, with relatively well-defined success criteria and constrained output spaces that make the problem more tractable than fully open-ended generation tasks. The structured nature of product attributes and standardized title formats provides natural evaluation targets and quality metrics, though the case study doesn't detail how these metrics are implemented in production monitoring.