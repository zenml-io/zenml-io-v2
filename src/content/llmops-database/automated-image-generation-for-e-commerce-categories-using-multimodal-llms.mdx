---
title: "Automated Image Generation for E-commerce Categories Using Multimodal LLMs"
slug: "automated-image-generation-for-e-commerce-categories-using-multimodal-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad78935fa6a8eda213d6f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:18.957Z"
  createdOn: "2025-12-23T17:55:21.296Z"
llmopsTags:
  - "content-moderation"
  - "multi-modality"
  - "structured-output"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "evals"
industryTags: "e-commerce"
company: "Ebay"
summary: "eBay developed an automated image generation system to replace manual curation of category and theme images across thousands of categories. The system leverages multimodal LLMs to process item data, simplify titles, generate image prompts, and create category-representative images through text-to-image models. A novel automated evaluation framework uses a rubric-based approach to assess image quality across fidelity, clarity, and style adherence, with an iterative refinement loop that regenerates images until quality thresholds are met. Human evaluation showed 88% of automatically generated and approved images were suitable for production use, demonstrating the system's ability to scale visual content creation while maintaining brand standards and reducing manual effort."
link: "https://www.linkedin.com/pulse/enhancing-ebays-visual-shopping-experience-automated-image-galsurkar-9pgle/"
year: 2025
seo:
  title: "Ebay: Automated Image Generation for E-commerce Categories Using Multimodal LLMs - ZenML LLMOps Database"
  description: "eBay developed an automated image generation system to replace manual curation of category and theme images across thousands of categories. The system leverages multimodal LLMs to process item data, simplify titles, generate image prompts, and create category-representative images through text-to-image models. A novel automated evaluation framework uses a rubric-based approach to assess image quality across fidelity, clarity, and style adherence, with an iterative refinement loop that regenerates images until quality thresholds are met. Human evaluation showed 88% of automatically generated and approved images were suitable for production use, demonstrating the system's ability to scale visual content creation while maintaining brand standards and reducing manual effort."
  canonical: "https://www.zenml.io/llmops-database/automated-image-generation-for-e-commerce-categories-using-multimodal-llms"
  ogTitle: "Ebay: Automated Image Generation for E-commerce Categories Using Multimodal LLMs - ZenML LLMOps Database"
  ogDescription: "eBay developed an automated image generation system to replace manual curation of category and theme images across thousands of categories. The system leverages multimodal LLMs to process item data, simplify titles, generate image prompts, and create category-representative images through text-to-image models. A novel automated evaluation framework uses a rubric-based approach to assess image quality across fidelity, clarity, and style adherence, with an iterative refinement loop that regenerates images until quality thresholds are met. Human evaluation showed 88% of automatically generated and approved images were suitable for production use, demonstrating the system's ability to scale visual content creation while maintaining brand standards and reducing manual effort."
---

## Overview

eBay developed and deployed a sophisticated multimodal LLM-powered system to automate the generation of category and theme-specific images at scale. The platform faced a fundamental visual merchandising challenge: while individual product listings contained seller-uploaded images, category pages were represented only by plain text breadcrumbs, creating a less engaging browsing experience. Manual image curation by designers was time-intensive, resource-demanding, and couldn't adapt quickly to emerging trends or scale across eBay's thousands of categories. This case study demonstrates a comprehensive LLMOps implementation that combines multiple LLM components in production, including text processing, prompt generation, image synthesis, and automated quality evaluation with iterative refinement.

## Business Context and Problem Definition

The challenge eBay faced represents a common problem in large-scale e-commerce platforms: how to create consistent, high-quality visual content that accurately represents diverse categories while maintaining brand standards. Each category in eBay's taxonomy needed representative imagery to enhance user engagement and guide shoppers visually through their journey. The traditional approach required human designers to manually craft images for each category, which created bottlenecks in production velocity, limited the ability to refresh content based on trends, and made it economically infeasible to provide images for the long tail of categories. The team needed a solution that could generate contextually relevant, visually appealing images automatically while maintaining quality standards comparable to human-curated content.

## Technical Architecture and Pipeline Design

The production system consists of three major integrated components working in sequence: data preprocessing, initial image generation, and automated quality assessment. This architecture reflects mature LLMOps thinking by separating concerns and creating modular components that can be independently optimized and monitored.

### Data Preprocessing Stage

The preprocessing stage addresses a fundamental challenge in working with e-commerce data: item titles contain valuable contextual information but also include extraneous details that can confuse downstream models. eBay's approach starts by sampling popular items from each category, using click-through rate as a popularity signal. This behavioral data provides ground truth about which items actually resonate with users in each category context. The system then applies LLMs to simplify these titles by removing non-visual elements such as brand names, sizing information, model numbers, and other metadata that don't contribute to visual representation. This simplification step demonstrates thoughtful prompt engineering and data curation—the team recognized that feeding raw, noisy item data directly into image generation would produce suboptimal results. By using LLMs to extract essential visual themes while filtering noise, they create cleaner inputs for downstream components.

### Initial Image Generation

The image generation stage employs a two-step LLM workflow. First, an LLM takes the category name and simplified item titles as input and generates detailed image prompts. These prompts are structured to follow product photography best practices, emphasizing minimalism, professional aesthetics, and clear subject focus. The prompt generation step is critical from an LLMOps perspective—rather than having the system generate images directly from category names, the team inserts an intermediate prompt engineering layer that provides more control and consistency. The structured prompts specify subject matter, style, background, and compositional elements, essentially translating business requirements into technical specifications for the vision model.

These LLM-generated prompts are then passed to what the team describes as a "Large Vision Model" (presumably a text-to-image foundation model) that produces the actual category images. This architecture separates prompt creation from image synthesis, which offers several operational advantages: prompts can be logged and analyzed independently, the prompt generation model can be updated without changing the image model, and the same prompts can be regenerated with different image models as technology evolves.

### Automated Quality Assessment Framework

The most innovative aspect of eBay's LLMOps implementation is the automated evaluation and refinement system. The team recognized a fundamental challenge with generative models: their non-deterministic nature means the same prompt can produce varying quality outputs, some containing distortions, unexpected elements, or stylistic inconsistencies. Rather than relying on human review at scale, they built a multimodal LLM-based evaluation framework that automatically assesses each generated image.

The evaluation system applies a rubric-based approach with three primary criteria: fidelity to the prompt (alignment between the generated image and the specifications provided), detail sharpness and clarity (technical image quality metrics), and adherence to product photography style (consistency with eBay's brand guidelines). The evaluator is implemented as a multimodal LLM that can process both the image and its generating prompt, scoring the image across these dimensions. Images meeting or exceeding predefined thresholds are approved for use, while those falling short are rejected.

The team developed this rubric through empirical observation of failure modes in initial trials. Common problematic variations included distorted objects (warped laptops, "melting" sunglasses), unexpected random elements (flowers or leaves appearing inappropriately), dark or shadowy backgrounds, and blurred or incomplete details. By cataloging these failure patterns, they created targeted evaluation criteria that work within the multimodal LLM's detection capabilities. This pragmatic approach—designing evaluation criteria based on observable model limitations—demonstrates mature thinking about what can realistically be automated versus what requires human oversight.

## Iterative Refinement and Feedback Loop

When an image fails evaluation, the system doesn't simply discard it and move on. Instead, it implements a sophisticated feedback loop that represents the "Ops" in LLMOps—automated operational improvement. The multimodal LLM analyzes the failed image alongside its original prompt and the evaluation results, then generates an enhanced prompt designed to address the identified deficiencies. This improved prompt is fed back into the image generation model to produce a new candidate image, which undergoes evaluation again. The cycle continues until either an image passes all quality criteria or the system reaches a predefined retry limit to prevent infinite loops.

This iterative refinement approach is particularly noteworthy from an LLMOps perspective. The system essentially learns from its failures in real-time, using the evaluator's feedback to improve its prompts dynamically. This creates a self-correcting production pipeline that can handle edge cases and model variability without human intervention. The retry limit serves as an important safety mechanism, ensuring the system fails gracefully rather than consuming unlimited compute resources on problematic categories.

## Production Deployment and Evaluation

The team conducted human evaluation on a sample of generated images that had passed the automated rubric threshold. This validation step is critical for calibrating automated systems—even sophisticated AI evaluators need to be benchmarked against human judgment to ensure they're making appropriate decisions. The results showed that 88% of automatically approved images were confirmed by human evaluators as suitable for production use on eBay. This precision metric provides quantifiable validation of the system's effectiveness while also revealing areas for improvement.

The team transparently acknowledges both false positives (images that passed automated evaluation but didn't meet human standards) and false negatives (suitable images incorrectly rejected). This honest assessment reflects mature engineering practices—recognizing that even successful systems have limitations and areas for ongoing optimization. The plan to use feedback from misclassified images to refine the evaluation rubric demonstrates a continuous improvement mindset essential for production LLM systems.

## LLMOps Considerations and Operational Maturity

Several aspects of this implementation demonstrate sophisticated LLMOps practices. The modular pipeline architecture allows independent scaling and optimization of each component. Data preprocessing, prompt generation, image synthesis, and evaluation can each be monitored, debugged, and improved separately. The system incorporates multiple LLM touchpoints—text simplification, prompt generation, and quality evaluation—each serving a distinct purpose in the workflow.

The automated evaluation framework represents a key LLMOps pattern: using LLMs to monitor and validate other LLM outputs. Rather than requiring human review at scale, the team built an AI system that can assess quality automatically while still being periodically calibrated against human judgment. The rubric-based approach provides interpretability and debuggability—when the system rejects an image, the scores across specific criteria explain why, rather than providing an opaque binary decision.

The iterative refinement loop demonstrates operational resilience. By automatically attempting to fix failures rather than simply flagging them for human attention, the system achieves higher throughput and reduces operational burden. The retry limit mechanism shows awareness of edge cases and resource constraints, preventing runaway processes while still allowing multiple improvement attempts.

## Responsible AI Integration

The team explicitly mentions that their work was guided by eBay's Responsible AI principles, ensuring safe and responsible development and evaluation of generative capabilities. While the case study doesn't detail specific responsible AI measures, the emphasis on quality assessment and human validation suggests attention to preventing harmful or inappropriate content from reaching production. The automated evaluation framework itself can be viewed as a governance mechanism, systematically filtering outputs that don't meet standards before they're deployed.

The team's acknowledgment of model limitations and non-deterministic behavior, along with their systematic approach to identifying and addressing failure modes, reflects responsible engineering practices. Rather than claiming perfection, they've built a system that recognizes its constraints and implements appropriate safeguards.

## Scalability and Business Impact

The system successfully addresses eBay's original scalability challenge. By automating image generation and evaluation, the platform can now create category images across thousands of categories without proportionally scaling the design team. The ability to rapidly refresh images allows eBay to respond to seasonal trends, emerging product categories, and changing merchandising priorities with minimal latency. The 88% human-approval rate suggests the system achieves quality comparable to manual curation while operating at machine scale and speed.

The case study notes that this approach enables "efficient creation of category and thematic-specific images, enabling rapid updates, improved merchandising flexibility, and consistency across the platform." These business outcomes—speed, flexibility, and consistency—directly result from the LLMOps architecture implemented. The modular pipeline, automated quality control, and iterative refinement collectively create a system that balances quality with velocity.

## Technical Challenges and Future Directions

The team identifies ongoing challenges including refining the evaluation rubric based on feedback from both correctly classified and misclassified images. This iterative improvement of the evaluator itself represents a meta-level of LLMOps—not just operating LLM systems in production, but continuously improving those operational systems based on production data. The acknowledgment that some suitable images are currently rejected (false negatives) suggests opportunities to increase recall without sacrificing precision.

The case study doesn't detail specific technical implementations such as which LLM models are used for text processing versus evaluation, what text-to-image model generates the images, or how the system handles edge cases like extremely niche categories. However, the architectural patterns and operational approaches described provide valuable insights regardless of specific model choices.

## Critical Assessment

While the case study presents impressive results, it's important to note that it comes from eBay itself and focuses primarily on successes. The 88% precision rate, while strong, means 12% of automatically approved images still required rejection by humans, suggesting the automated evaluator has room for improvement. The study doesn't discuss computational costs, latency, or resource requirements of running multiple LLM calls per image (simplification, prompt generation, evaluation, and potentially multiple refinement iterations). These operational costs could be significant at eBay's scale.

The reliance on click-through rate for selecting representative items introduces potential bias—popular items may not fully represent category diversity, particularly for emerging or niche subcategories. The system's ability to handle edge cases, unusual category combinations, or rapidly evolving trends isn't fully explored. Additionally, while the team mentions Responsible AI principles, the study doesn't detail specific safeguards against generating biased, inappropriate, or misleading imagery.

The iterative refinement loop, while innovative, could potentially amplify biases if the evaluator consistently rejects certain types of valid images, causing the system to converge toward a narrow aesthetic. Monitoring for such convergence and ensuring diversity in generated images would be important operational considerations not discussed in detail.

## Conclusion and LLMOps Lessons

eBay's automated image generation system demonstrates mature LLMOps practices including modular pipeline design, automated quality evaluation, iterative refinement with feedback loops, and continuous improvement based on production performance. The system successfully balances automation with quality control, achieving production-grade results while dramatically reducing manual effort. The explicit separation of prompt engineering from image generation, the use of LLMs for quality assessment, and the self-correcting refinement loop represent patterns applicable beyond e-commerce image generation to many production LLM applications. The transparent discussion of limitations and ongoing improvement efforts reflects engineering maturity and realistic expectations about AI capabilities in production environments.