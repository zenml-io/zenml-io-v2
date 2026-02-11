---
title: "Multi-modal LLM Platform for Catalog Attribute Extraction at Scale"
slug: "multi-modal-llm-platform-for-catalog-attribute-extraction-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ada3ffccde60ce1a201a1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:20.281Z"
  createdOn: "2025-12-23T18:06:55.027Z"
llmopsTags:
  - "classification"
  - "structured-output"
  - "multi-modality"
  - "data-cleaning"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "multi-agent-systems"
  - "fastapi"
  - "databases"
  - "monitoring"
  - "orchestration"
  - "documentation"
  - "openai"
  - "anthropic"
industryTags: "e-commerce"
company: "Instacart"
summary: "Instacart faced significant challenges in extracting structured product attributes (flavor, size, dietary claims, etc.) from millions of SKUs using traditional SQL-based rules and text-only machine learning models. These approaches suffered from low quality, high development overhead, and inability to process image data. To address these limitations, Instacart built PARSE (Product Attribute Recognition System for E-commerce), a self-serve multi-modal LLM platform that enables teams to extract attributes from both text and images with minimal engineering effort. The platform reduced attribute extraction development time from weeks to days, achieved 10% higher recall through multi-modal reasoning compared to text-only approaches, and delivered 95% accuracy on simpler attributes with just one day of effort versus one week with traditional methods."
link: "https://tech.instacart.com/multi-modal-catalog-attribute-extraction-platform-at-instacart-b9228754a527"
year: 2025
seo:
  title: "Instacart: Multi-modal LLM Platform for Catalog Attribute Extraction at Scale - ZenML LLMOps Database"
  description: "Instacart faced significant challenges in extracting structured product attributes (flavor, size, dietary claims, etc.) from millions of SKUs using traditional SQL-based rules and text-only machine learning models. These approaches suffered from low quality, high development overhead, and inability to process image data. To address these limitations, Instacart built PARSE (Product Attribute Recognition System for E-commerce), a self-serve multi-modal LLM platform that enables teams to extract attributes from both text and images with minimal engineering effort. The platform reduced attribute extraction development time from weeks to days, achieved 10% higher recall through multi-modal reasoning compared to text-only approaches, and delivered 95% accuracy on simpler attributes with just one day of effort versus one week with traditional methods."
  canonical: "https://www.zenml.io/llmops-database/multi-modal-llm-platform-for-catalog-attribute-extraction-at-scale"
  ogTitle: "Instacart: Multi-modal LLM Platform for Catalog Attribute Extraction at Scale - ZenML LLMOps Database"
  ogDescription: "Instacart faced significant challenges in extracting structured product attributes (flavor, size, dietary claims, etc.) from millions of SKUs using traditional SQL-based rules and text-only machine learning models. These approaches suffered from low quality, high development overhead, and inability to process image data. To address these limitations, Instacart built PARSE (Product Attribute Recognition System for E-commerce), a self-serve multi-modal LLM platform that enables teams to extract attributes from both text and images with minimal engineering effort. The platform reduced attribute extraction development time from weeks to days, achieved 10% higher recall through multi-modal reasoning compared to text-only approaches, and delivered 95% accuracy on simpler attributes with just one day of effort versus one week with traditional methods."
---

## Overview and Business Context

Instacart built PARSE (Product Attribute Recognition System for E-commerce), a production-scale multi-modal LLM platform designed to extract structured product attributes from millions of SKUs in their e-commerce catalog. The system addresses critical product discovery and personalization needs by extracting attributes such as flavor, size, fat content, dietary claims (organic, low sugar, gluten-free), and other structured metadata that power search refinement, product variations, and badge displays across the Instacart shopping experience.

The business motivation for PARSE stems from the fundamental challenge of maintaining high-quality, high-coverage attribute data at scale. With millions of products across thousands of categories, Instacart's previous approaches using SQL-based rules and traditional machine learning models faced significant limitations: low quality for complex attributes requiring contextual understanding, high development overhead requiring separate models and datasets for each attribute, slow iteration cycles taking weeks for new attributes, and complete inability to extract information from product images where text descriptions were incomplete.

## Technical Architecture and Platform Components

PARSE implements a comprehensive end-to-end platform with four main components that orchestrate the entire attribute extraction workflow from data retrieval through production deployment and quality monitoring.

The **Platform UI** serves as the self-service configuration layer where teams define extraction tasks without writing custom code. Users configure the attribute name, type (string, dictionary, number, boolean), and description, select the LLM extraction algorithm and parameters, provide SQL queries to fetch product data from the database, and optionally supply few-shot examples to guide the LLM. All configurations are versioned for change tracking and rollback capabilities. Once configured, a backend orchestration layer executes the SQL queries to fetch product data and routes it along with parameters to the extraction pipeline.

The **ML Extraction Endpoint** represents the core inference component responsible for executing LLM-based attribute extraction for each product. The system constructs extraction prompts by injecting product features and attribute definitions into templates, then applies the selected extraction algorithm. Critically, the endpoint supports multiple extraction strategies to balance cost and accuracy tradeoffs. These include single LLM extraction with one model, LLM cascade approaches that route products through progressively more powerful models based on confidence thresholds, and multi-modal extraction that processes both text and image inputs.

For confidence estimation, PARSE implements a self-verification technique inspired by academic literature. After initial extraction, the system queries the LLM with a second scoring prompt that poses an entailment task, asking whether the extracted value is correct given the product features and attribute definition. By specifically requesting "yes" or "no" as the first output token, the system can extract logits from that token and compute the probability of "yes" as a confidence score. This confidence metric proves essential for downstream quality control, enabling human review prioritization for low-confidence extractions.

The **Quality Screening** component provides a comprehensive evaluation framework operating in both development and production modes. During development, teams submit small product samples for quality assessment to determine if configurations require further iteration. The component offers a human evaluation interface where auditors label gold-standard attribute values and compute quality metrics. To accelerate evaluation, PARSE incorporates LLM-as-a-judge auto-evaluation capabilities alongside human review.

In production mode, quality screening implements continuous monitoring and human-in-the-loop correction. The system periodically samples extraction results from new products and routes them to human auditors or LLM evaluation to detect quality degradation. Additionally, PARSE runs proactive error detection by identifying extracted values with low confidence scores and routing them to human auditors for review and correction. This human-in-the-loop approach ensures production quality while focusing expensive human review on cases where the model expresses uncertainty. Final validated extraction results flow into Instacart's catalog data pipeline for ingestion.

The **Catalog Data Pipeline Integration** ensures extracted attributes flow seamlessly into production systems powering customer-facing features. This final component ingests validated attributes into the product catalog where they immediately become available for search refinement, product variation selection, badge displays, and other personalization features.

## Multi-modal Reasoning and Quality Improvements

One of PARSE's most significant technical advances is its ability to reason across multiple information sources through multi-modal LLM capabilities. This enables flexible extraction strategies that adapt to available data, dramatically improving both accuracy and coverage compared to text-only approaches.

Instacart's experience demonstrates that multi-modal reasoning addresses real production challenges where information is inconsistently distributed across text and images. For example, extracting sheet count from household products often requires reading packaging images where "80 sheets" appears visibly on the product but the accompanying text description lacks this detail entirely. Traditional text-only systems, whether rule-based or ML-based, consistently miss these cases, while PARSE's multi-modal LLM extracts the value directly from the image.

Conversely, other cases require reasoning over textual descriptions where information is stated implicitly rather than explicitly. A product description reading "3 boxes of 124 tissues" doesn't directly state total sheet count, but the LLM can extract pack count and sheets per pack, perform multiplication, and output the correct total. This logical deduction from unstructured text was previously challenging for traditional approaches lacking reasoning capabilities.

In many scenarios, the LLM cross-references both text and image sources, using details from one modality to verify or supplement the other, making extraction even more reliable. Quantitative experiments on sheet count extraction validate these improvements. Text-only LLMs delivered significant gains in both recall and precision over legacy SQL approaches due to their contextual reasoning abilities. Multi-modal LLMs further increased recall by 10% over text-only models by incorporating image-based cues and cross-referencing both sources. This demonstrates PARSE's ability to intelligently adapt to available information sources for optimal extraction quality.

## Cost Optimization Through LLM Cascading

Given the scale of Instacart's catalog with millions of products, cost management is critical for sustainable LLM deployment. PARSE addresses this through multiple strategies, with LLM cascading being a key production technique.

The cascade approach routes products through progressively more powerful and expensive models based on confidence thresholds. Simpler extraction cases are handled by cheaper, less powerful models, while complex cases requiring advanced reasoning are escalated to more capable models. This strategy balances cost and accuracy by avoiding unnecessary use of expensive models for straightforward extractions.

Instacart's experience reveals that attribute complexity significantly impacts the cost-accuracy tradeoff. For simpler attributes like the "organic" claim with straightforward definitions, cheaper less-powerful LLMs deliver similar quality to premium models at 70% cost reduction. However, for difficult attributes like "low sugar" with complex guidelines, less powerful models suffer a 60% accuracy drop, necessitating more capable models despite higher costs. This emphasizes the importance of attribute-specific model selection to balance cost and quality effectively.

The article outlines additional cost reduction techniques under active exploration. Multi-attribute extraction batches multiple attributes in a single prompt to avoid sending identical product information repeatedly for different attributes. Similarly, multi-product batching includes multiple products in one prompt to avoid repeating attribute guidelines across products. LLM approximation through caching stores previous extraction results and retrieves them for similar products rather than reprocessing redundant queries. This requires defining similarity functions to determine when two products share attribute values, potentially leveraging existing duplicate product detection work.

## Prompt Engineering and Development Velocity

PARSE dramatically accelerates attribute extraction development through its self-service platform design and LLM capabilities. The system reduced development time from weeks to days, with different attributes requiring varying levels of prompt tuning effort.

For simpler attributes like organic claims with straightforward definitions, initial prompts achieved 95% accuracy with just one day of effort compared to one week with traditional methods. The PARSE UI's ease of use enabled rapid configuration and testing without custom code development. For more complex attributes like low sugar claims with intricate guidelines, multiple prompt iterations are necessary to achieve high quality. However, PARSE still reduced iteration time to just three days due to the platform's streamlined workflow for testing prompt variations and evaluating results.

This development velocity improvement stems from LLMs' zero-shot and few-shot learning capabilities, which eliminate the need for extensive labeled dataset creation, model training, and pipeline development required by traditional ML approaches. Teams can configure new attributes through the UI, provide a handful of examples if needed, and rapidly iterate on prompts while evaluating quality metrics through the integrated evaluation framework.

Instacart recognizes that human-driven prompt iteration remains a bottleneck and is exploring automatic prompt tuning techniques. Research directions include using LLMs themselves as optimizers to generate better prompts, applying evolutionary algorithms for efficient prompt optimization, and optimizing prompts for multi-stage LLM pipelines. These techniques could further scale the attribute creation process by automating prompt engineering.

## Production Monitoring and Quality Assurance

PARSE implements comprehensive production monitoring and quality assurance mechanisms essential for maintaining reliable attribute extraction at scale. The quality screening component's production mode provides continuous oversight through periodic sampling and proactive error detection.

Periodic sampling creates representative subsets from extraction results on new products and routes them to human auditors or LLM evaluation. This monitoring detects quality degradation requiring intervention, ensuring the system maintains performance as the product catalog evolves. Proactive error detection leverages the confidence scores generated during extraction to identify potentially incorrect values. Products with low confidence scores are flagged for human review and correction, focusing expensive human labor on cases where the model expresses uncertainty rather than reviewing all extractions indiscriminately.

This human-in-the-loop approach balances automation with quality assurance, enabling PARSE to operate autonomously while maintaining high accuracy through targeted human oversight. The versioned configuration management also supports operational reliability by tracking changes, identifying contributors, and enabling rollback when issues arise.

## Evaluation Methodologies

PARSE implements multiple evaluation approaches suited to different operational phases. During development, teams use small product samples for quality assessment to determine if configurations require further iteration. Human evaluation interfaces enable auditors to label gold-standard values and compute precision, recall, and other quality metrics.

To accelerate evaluation beyond purely human annotation, PARSE incorporates LLM-as-a-judge techniques where one LLM evaluates another's output. This auto-evaluation approach speeds up iteration cycles during development while providing directional quality signals. In production, the system combines periodic human evaluation of sampled results with LLM-based evaluation to monitor ongoing performance.

The confidence scoring mechanism also serves as an implicit evaluation signal, enabling prioritization of uncertain extractions for human review. This self-assessment capability through confidence estimation represents an important LLMOps pattern for production systems where exhaustive human evaluation is infeasible at scale.

## Deployment and Integration Patterns

PARSE demonstrates a mature deployment architecture integrating LLM capabilities into existing data infrastructure. The platform operates in two distinct modes: development mode for experimentation and configuration, and production mode for automated catalog-wide extraction.

During development, teams iteratively configure extraction tasks through the UI, testing different models, prompts, and input sources against sample products. Once a working configuration achieves desired quality, it can be promoted to production where it runs automatically across the catalog. This clear separation between experimentation and production deployment enables safe iteration while maintaining production stability.

The backend orchestration layer coordinates workflow execution, fetching product data via SQL queries, routing it through the ML extraction endpoint, applying quality screening, and ingesting validated results into the catalog data pipeline. This end-to-end automation eliminates manual intervention for production extractions while providing the necessary control points for quality assurance.

The integration with Instacart's existing catalog data pipeline ensures extracted attributes immediately become available for downstream systems powering customer-facing features. This tight integration demonstrates how LLM capabilities can be embedded into existing data workflows rather than requiring wholesale infrastructure replacement.

## Critical Assessment and Balanced Perspective

While the article presents impressive results, several aspects deserve critical evaluation. The claimed development time reductions (weeks to days, one week to one day) are significant but lack detailed baseline comparisons. It's unclear whether the traditional approach timelines include comparable quality validation efforts or represent initial development only.

The 10% recall improvement from multi-modal over text-only approaches is meaningful but relatively modest given the additional complexity and cost of processing images. This suggests multi-modal capabilities provide incremental rather than transformative benefits, most valuable for specific attribute types where image information is frequently present and text descriptions are incomplete.

The article doesn't disclose which specific LLM models are used, making it difficult to assess reproducibility or evaluate the cost figures mentioned. The 70% cost reduction for simpler attributes using cheaper models is impressive, but without absolute cost figures or model specifications, it's hard to contextualize these savings.

The confidence scoring approach using self-verification is well-grounded in research but represents a relatively simple technique. More sophisticated uncertainty quantification methods exist, and it's unclear whether Instacart evaluated alternatives or found this sufficient for their needs.

The human-in-the-loop quality assurance is essential but creates ongoing operational overhead not fully addressed in the article. The scalability of this approach depends on the volume of low-confidence extractions requiring review, which isn't quantified. If a significant percentage of extractions require human review, the system's automation benefits may be limited.

The future work section on cost reduction techniques (multi-attribute extraction, multi-product batching, LLM approximation) represents standard optimization approaches but hasn't been implemented yet. The article's results therefore represent the current system without these optimizations, suggesting further cost improvements are needed for sustainable production operation.

Similarly, the automatic prompt tuning work is acknowledged as future exploration rather than current capability. The current system still requires human prompt engineering, which remains a bottleneck for scaling to hundreds or thousands of attributes.

Despite these considerations, PARSE represents a sophisticated production LLMOps system addressing real e-commerce challenges. The platform architecture with self-service configuration, multiple extraction algorithms, confidence scoring, and integrated quality assurance demonstrates mature LLM productionization. The quantitative improvements in development velocity and extraction quality validate the approach's effectiveness, even if some claimed benefits require cautious interpretation.

The case study illustrates important LLMOps patterns including cascade routing for cost optimization, self-verification for confidence estimation, LLM-as-a-judge for evaluation, human-in-the-loop quality assurance, and clear separation between development and production modes. These represent valuable lessons for organizations building production LLM systems at scale.