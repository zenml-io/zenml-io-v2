---
title: "AI-Assisted Product Attribute Extraction for E-commerce Content Creation"
slug: "ai-assisted-product-attribute-extraction-for-e-commerce-content-creation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69088ee984da9d8e5ec1faa7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:19.198Z"
  createdOn: "2025-11-03T11:15:53.712Z"
llmopsTags:
  - "content-moderation"
  - "classification"
  - "multi-modality"
  - "structured-output"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "cost-optimization"
  - "multi-agent-systems"
  - "error-handling"
  - "api-gateway"
  - "microservices"
  - "monitoring"
  - "fastapi"
  - "openai"
industryTags: "e-commerce"
company: "Zalando"
summary: "Zalando developed a Content Creation Copilot to automate product attribute extraction during the onboarding process, addressing data quality issues and time-to-market delays. The manual content enrichment process previously accounted for 25% of production timelines with error rates that needed improvement. By implementing an LLM-based solution using OpenAI's GPT models (initially GPT-4 Turbo, later GPT-4o) with custom prompt engineering and a translation layer for Zalando-specific attribute codes, the system now enriches approximately 50,000 attributes weekly with 75% accuracy. The solution integrates multiple AI services through an aggregator architecture, auto-suggests attributes in the content creation workflow, and allows copywriters to maintain final decision authority while significantly improving efficiency and data coverage."
link: "https://engineering.zalando.com/posts/2024/09/content-creation-copilot-ai-assited-product-onboarding.html"
year: 2025
seo:
  title: "Zalando: AI-Assisted Product Attribute Extraction for E-commerce Content Creation - ZenML LLMOps Database"
  description: "Zalando developed a Content Creation Copilot to automate product attribute extraction during the onboarding process, addressing data quality issues and time-to-market delays. The manual content enrichment process previously accounted for 25% of production timelines with error rates that needed improvement. By implementing an LLM-based solution using OpenAI's GPT models (initially GPT-4 Turbo, later GPT-4o) with custom prompt engineering and a translation layer for Zalando-specific attribute codes, the system now enriches approximately 50,000 attributes weekly with 75% accuracy. The solution integrates multiple AI services through an aggregator architecture, auto-suggests attributes in the content creation workflow, and allows copywriters to maintain final decision authority while significantly improving efficiency and data coverage."
  canonical: "https://www.zenml.io/llmops-database/ai-assisted-product-attribute-extraction-for-e-commerce-content-creation"
  ogTitle: "Zalando: AI-Assisted Product Attribute Extraction for E-commerce Content Creation - ZenML LLMOps Database"
  ogDescription: "Zalando developed a Content Creation Copilot to automate product attribute extraction during the onboarding process, addressing data quality issues and time-to-market delays. The manual content enrichment process previously accounted for 25% of production timelines with error rates that needed improvement. By implementing an LLM-based solution using OpenAI's GPT models (initially GPT-4 Turbo, later GPT-4o) with custom prompt engineering and a translation layer for Zalando-specific attribute codes, the system now enriches approximately 50,000 attributes weekly with 75% accuracy. The solution integrates multiple AI services through an aggregator architecture, auto-suggests attributes in the content creation workflow, and allows copywriters to maintain final decision authority while significantly improving efficiency and data coverage."
---

## Overview

Zalando, a major European e-commerce fashion platform operating across 25 markets, implemented an LLM-based Content Creation Copilot to address inefficiencies in their product onboarding workflow. The case study provides valuable insights into deploying multimodal LLMs in a production environment with complex domain-specific requirements, multilingual considerations, and cost constraints. The system extracts product attributes from images to assist content creation teams, representing a practical example of human-in-the-loop AI deployment in an enterprise setting.

The use case emerged from analysis showing that manual content enrichment contributed approximately 25% to overall production timelines, with consistent quality assurance issues creating opportunities for error reduction. While Zalando already employed machine learning extensively for products already onboarded to the platform (feature extraction, similarity searches, product understanding, and search functionality), the content creation stage remained largely manual. Copywriters were responsible for enriching attributes and performing their own quality assurance to maintain the four-eyes principle before articles were published to the shop.

## Business Context and Problem Statement

The core challenge Zalando faced was scaling high-quality content creation across a massive product catalog while maintaining rapid time-to-online (TTO) metrics. The manual process created bottlenecks that delayed customer access to new products and resulted in inconsistent attribute coverage across the catalog. Quality assurance processes consistently identified opportunities to reduce error rates, making this an ideal candidate for AI augmentation.

The business impact extends beyond operational efficiency to customer experience: improved attribute completeness and correctness directly enhance Product Detail Pages (PDPs), enable better search and discovery, and help customers make more informed purchasing decisions. The team identified generating attributes from product images as the highest-impact intervention point, though this presented immediate technical challenges around model selection, data quality assurance, and architectural flexibility.

## Model Selection and Evaluation

The LLMOps journey began with a proof-of-concept phase that demonstrates sound engineering practice. Before committing to technical design, the team evaluated multiple models on a large sample from their catalog assortment, measuring accuracy through domain expert review. This human evaluation approach, while resource-intensive, was appropriate given the domain-specific nature of fashion attributes and the direct customer impact of incorrect suggestions.

After thorough analysis and testing, the team selected OpenAI's GPT-4 Turbo model as it provided the optimal balance between accuracy and information coverage. Notably, when GPT-4o was announced during development, the team performed another comparative evaluation through human inspection. GPT-4o not only improved accuracy but also delivered faster response times and proved more cost-effective—a critical consideration for production deployment at scale. This model transition highlights an important LLMOps challenge: the rapidly evolving landscape of available models requires architectures that support easy model swapping and comparison.

The team's observation that they could "easily integrate different suggestion sources/models within the copilot" and their stated goal to "automate this process" represents mature thinking about LLMOps. Rather than hardcoding dependencies on a single model provider, they built for flexibility, recognizing that model selection would be an ongoing optimization problem rather than a one-time decision.

## Architecture and System Design

The production system architecture demonstrates thoughtful integration of multiple components with clear separation of concerns. The workflow involves four main components working in concert:

The Content Creation Tool serves as the user-facing interface where photographers upload images, which generates image URLs sent to downstream services. This tool also receives generated attribute suggestions and presents them within the copywriting workflow with visual indicators (purple dots) showing which attributes were auto-suggested, maintaining transparency about AI involvement.

Article Masterdata acts as the source of truth for product metadata, including attributes and attribute sets that define which types of attributes are optional versus mandatory for each article type. This connection ensures that AI suggestions remain consistent with Zalando's product taxonomy and business rules.

The Prompt Generator represents a critical architectural component that bridges Zalando's internal data structures with the OpenAI API. It generates prompts based on attributes and attribute sets from Article Masterdata, combining these with image URLs before sending requests to the LLM. This separation of prompt construction from the content creation interface allows for iterative prompt refinement without frontend changes.

OpenAI's GPT models process the prompts and return suggestions, which flow back through the system to the Content Creation Tool. This architecture, while seemingly straightforward, required substantial engineering to handle the complexities described in the challenges section.

The team describes building an "aggregator service" designed to integrate multiple AI services and leverage various data sources including brand data dumps, partner contributions, and images. This aggregator pattern is an LLMOps best practice that enables A/B testing of different models, ensemble approaches, and gradual migration between providers without disrupting user workflows.

## Prompt Engineering and Domain Adaptation

Prompt engineering emerged as a critical success factor, particularly given the specialized fashion domain knowledge required. The team invested significant effort in crafting prompts to ensure optimal accuracy of suggested attributes. They created custom guidelines as part of prompts for complex product attributes, providing additional hints to help the model distinguish between similar but distinct categories (for example, differentiating between "V-neck" and "Low cut V-neck collar" types).

An interesting observation from the case study is that GPT-4o handles general attributes like "V-necks" or "round necks" for necklines correctly but can be less precise with more fashion-specific terminology like "deep scoop necks." The team noted this issue is more noticeable with balanced datasets (equal samples per attribute) compared to unbalanced ones reflecting real-world distributions. This suggests the model's training data may underrepresent niche fashion terminology, a common challenge when applying general-purpose LLMs to specialized domains.

The team's solution involved content creation experts actively contributing to prompt development—a valuable example of domain expert involvement in LLMOps. This collaborative approach to prompt engineering helps bridge the gap between AI capabilities and domain-specific requirements while building user trust and adoption.

## Translation Layer and Attribute Code Mapping

Operating across 25 European markets with different languages created a substantial technical challenge: Zalando stores article attributes as internal attribute codes rather than human-readable text. For example, the `assortment_type` attribute uses values like `assortment_type_7312` and `assortment_type_7841` rather than their semantic meanings ("Petite" and "Tall"). Since LLMs cannot reasonably be expected to understand arbitrary internal codes, the team built a translation layer.

The solution involves retrieving English translations of possible attribute values before generating prompts, allowing the LLM to work with human-readable concepts. When the model returns suggestions in natural language, the system translates them back into the corresponding attribute codes that Zalando's systems expect. This translation layer also serves a filtering function, discarding any output from OpenAI that isn't compatible with Zalando's APIs or relevant to the business context.

This architectural pattern—wrapping LLM interactions in domain-specific translation layers—is broadly applicable to enterprise LLMOps scenarios where internal data representations differ from natural language. It allows organizations to leverage general-purpose LLMs without requiring the models to learn proprietary encodings or taxonomies.

## Controlled Rollout and Filtering Logic

The architecture enabled a controlled rollout where products or attributes could be easily included or excluded with minimal effort. This operational flexibility is crucial for production LLM deployments, allowing teams to gradually expand coverage while monitoring quality metrics and gathering user feedback.

The team implemented intelligent filtering based on product categories, recognizing that some attributes shouldn't be populated for certain article types according to internal guidelines, and that prediction accuracy for these attributes was often poor. They introduced a mapping layer between product categories and relevant information that should be shown to customers, preventing inappropriate suggestions and improving overall system precision.

For cost optimization purposes, they stopped generating suggestions for some unsupported attribute sets, demonstrating the practical trade-offs required when operating LLMs at scale. Not every use case justifies the computational and financial cost of LLM inference, and the team's willingness to exclude low-value scenarios shows mature cost management.

## Image Selection and Input Optimization

An interesting LLMOps consideration emerged around optimizing input quality while balancing cost efficiency. Since the system processes images to extract attributes, the number and type of images sent to the model directly impacts both accuracy and costs (given that multimodal LLM APIs typically charge based on image and text inputs).

The team discovered that certain image types performed better than others, with product-only front images delivering the best results, followed closely by front images featuring products worn by models. This finding allowed them to optimize their image selection strategy, sending only the most informative images to reduce costs while maintaining or improving accuracy. This represents thoughtful input engineering—an often-overlooked aspect of LLMOps that can significantly impact both performance and economics.

## Cost Management and Optimization

Infrastructure costs for suggestion generation initially exceeded expectations, prompting several optimization efforts. Beyond the migration from GPT-4 Turbo to GPT-4o (which offered better performance at lower cost), the team stopped generating suggestions for unsupported attribute sets and optimized image selection as described above.

The case study provides concrete production metrics: the system enriches approximately 50,000 attributes weekly. While the text doesn't specify exact cost figures, the emphasis on cost reduction efforts reflects the reality that operating LLMs at production scale requires continuous optimization. The team's multi-pronged approach to cost management—model selection, input optimization, and selective feature enablement—demonstrates mature operational thinking.

It's worth noting that cost management in LLMOps extends beyond per-request pricing to include the infrastructure for prompt generation, translation layers, aggregation services, and monitoring systems. While these supporting components aren't detailed in the case study, they represent non-trivial engineering investment.

## User Experience and Human-in-the-Loop Design

The user interface design embodies human-in-the-loop principles, positioning AI as an assistant rather than autonomous decision-maker. Attributes suggested by the system are pre-filled and marked with purple indicators, making users aware of AI involvement while maintaining human authority over final decisions. This transparency is critical for building trust and ensuring that domain experts remain engaged in quality assurance.

The team explicitly states that "the user interface clearly shows what suggestions come from which source, leaving the final decision in the hands of the human." This provenance tracking becomes increasingly important as the system integrates multiple AI services through the aggregator architecture—users need to understand not just that a suggestion came from AI, but which specific source or model generated it.

By involving users early in product development, the team achieved smooth adoption with content creation experts actively contributing to prompt development. This collaborative approach turns potential resistance into engagement, leveraging human expertise to continuously improve system performance while ensuring users feel ownership over the tools they use daily.

## Performance Metrics and Evaluation

The system achieves approximately 75% accuracy, a metric that warrants careful interpretation. In the context of assisted content creation, this means that three-quarters of AI suggestions are correct, substantially reducing the manual effort required while still necessitating human review. For a copilot system where humans maintain final authority, this accuracy level appears reasonable—high enough to provide value but not so high that users might develop over-reliance on automation.

The case study notes that accuracy varies by product category, with niche categories performing worse than mainstream ones. This aligns with the observation about fashion-specific terminology being less reliably handled by the model. The team identifies improving accuracy for niche categories as a priority for future work, acknowledging that current performance isn't uniform across the catalog.

With approximately 50,000 attributes enriched weekly, the system operates at meaningful production scale. The text indicates improvements in both data quality and attribute coverage, though specific baseline comparisons or A/B testing results aren't provided. The claim that the manual process previously contributed 25% to production timelines suggests substantial potential impact, though the actual time savings achieved post-deployment aren't quantified.

## Critical Assessment and Limitations

While the case study presents encouraging results, several aspects merit balanced consideration. The 75% accuracy figure, while respectable for a copilot system, leaves substantial room for improvement. For attributes directly impacting customer experience in PDPs, even a 25% error rate could propagate incorrect information at scale if human review isn't consistently thorough. The system's design appropriately addresses this by maintaining human oversight, but the operational reality of whether copywriters carefully review all suggestions or develop automation bias isn't discussed.

The challenges with niche fashion terminology and less common attributes represent a fundamental limitation of applying general-purpose LLMs to specialized domains. While prompt engineering and custom guidelines help, they may not fully bridge the gap without fine-tuning or retrieval-augmented generation approaches incorporating Zalando's historical product data. The case study mentions leveraging "brand data dumps, partner contributions, and images" through the aggregator service, but doesn't detail how this structured data is integrated with LLM outputs—a missed opportunity for technical depth.

Cost discussions remain relatively abstract without specific figures or cost-benefit analyses. While the migration to GPT-4o and optimization efforts clearly reduced expenses, understanding the total cost of ownership (including engineering time, infrastructure, API costs, and human review) versus the value created would strengthen the business case. The claim that adoption was "very smooth" would benefit from supporting evidence such as user satisfaction metrics or productivity measurements.

The evaluation methodology relies heavily on human inspection and domain expert review, which is appropriate but potentially subjective and resource-intensive. The text doesn't describe systematic approaches to evaluation such as holdout test sets with ground truth labels, inter-rater reliability measures, or automated quality metrics. As the system scales, more scalable evaluation approaches will likely become necessary.

## Broader LLMOps Patterns and Lessons

This case study exemplifies several important LLMOps patterns worth highlighting. The architecture prioritizes flexibility and composability, designing systems that can easily swap models, integrate multiple sources, and adjust filtering logic without major refactoring. This architectural thinking recognizes that LLM technology evolves rapidly, and production systems must adapt without complete rewrites.

The translation layer pattern addresses a common enterprise challenge: bridging the gap between LLM-friendly natural language and internal data representations. Many organizations face similar needs to map between proprietary codes, domain-specific taxonomies, and the natural language interfaces that LLMs expect. Zalando's solution provides a reusable template for this integration pattern.

The controlled rollout approach with granular feature flags demonstrates operational maturity, allowing gradual expansion while monitoring quality and gathering feedback. Combined with the human-in-the-loop interface design, this creates a risk-managed deployment strategy appropriate for systems directly impacting customer experience.

The emphasis on prompt engineering as a collaborative activity between technical teams and domain experts reflects an emerging best practice in LLMOps. Effective prompts require both technical understanding of LLM behavior and deep domain knowledge—bringing these perspectives together yields better results than either in isolation.

The cost optimization journey illustrates that initial LLM deployments may exceed cost expectations, requiring iterative refinement through model selection, input optimization, and selective feature enablement. Organizations should budget not just for API costs but for the engineering effort required to optimize these deployments over time.

## Future Directions

The team outlines several future directions that build on the established architecture. They plan to improve accuracy for niche categories, expand attribute coverage beyond regular product attributes, and tackle new use cases including image description with informative tags (enabling content performance analytics and better-targeted advertising) and generating suggestions for free text attributes with translations.

These extensions leverage the flexible aggregator architecture and translation layer infrastructure already built, demonstrating the value of investing in robust foundational components that support multiple use cases. The progression from structured attribute extraction to free text generation and multilingual support represents a natural evolution path for LLM applications in content creation.

## Conclusion

Zalando's Content Creation Copilot represents a thoughtfully executed LLM deployment addressing real operational challenges in e-commerce content creation. The system demonstrates important LLMOps principles including flexible architecture design, systematic model evaluation and selection, human-in-the-loop interfaces, controlled rollout strategies, and continuous optimization of costs and performance.

While the case study could benefit from more detailed performance metrics, cost analyses, and discussion of evaluation methodologies, it provides valuable insights into the practical challenges of deploying multimodal LLMs in production. The 75% accuracy level and 50,000 weekly attributes enriched indicate meaningful scale and impact, though the full business value realization depends on how effectively human reviewers catch the remaining errors and whether time-to-market improvements materialize as expected.

The architectural decisions around translation layers, aggregator services, and model swappability position Zalando well for the evolving LLM landscape, allowing them to continuously improve as models advance and costs decrease. The collaborative approach involving domain experts in prompt engineering and system development likely contributed significantly to adoption success and ongoing improvement.

As with any vendor case study (in this case, implicitly promoting OpenAI's models), readers should maintain healthy skepticism about claimed results while recognizing the genuine engineering challenges and solutions described. The transparency about limitations—niche category accuracy issues, cost challenges, and the need for continued human oversight—lends credibility to the overall narrative and provides honest insights for others pursuing similar deployments.