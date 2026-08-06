---
title: "AI-Powered Image Enhancement for Food Delivery Marketplace"
slug: "ai-powered-image-enhancement-for-food-delivery-marketplace"
draft: false
llmopsTags:
  - "content-moderation"
  - "classification"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "monitoring"
  - "guardrails"
industryTags: "e-commerce"
company: "Uber"
summary: "Uber Eats faced a significant challenge with inconsistent photo quality across their marketplace, particularly for smaller independent merchants who lacked the time, knowledge, and budget for professional food photography. This quality gap impacted user experience and conversion rates across their $90 billion annual run rate platform operating in 10,000 cities globally. The team developed a sophisticated multi-agent system using multimodal LLMs for image understanding, routing, enhancement, and quality assurance. The solution balanced authenticity with quality improvement through a series of specialized agents that could route images for enhancement, generate image-specific editing prompts, iteratively improve images based on feedback, and validate outputs against multi-dimensional quality criteria. The system incorporated continuous learning loops including automated drift detection, human-in-the-loop labeling for alignment, config-driven auto-tuning, internal dogfooding feedback, and production metrics monitoring, ultimately improving conversion rates while maintaining marketplace diversity and merchant brand authenticity."
link: "https://www.youtube.com/watch?v=31GUkCBD-Uc"
year: 2026
seo:
  title: "Uber: AI-Powered Image Enhancement for Food Delivery Marketplace - ZenML LLMOps Database"
  description: "Uber Eats faced a significant challenge with inconsistent photo quality across their marketplace, particularly for smaller independent merchants who lacked the time, knowledge, and budget for professional food photography. This quality gap impacted user experience and conversion rates across their $90 billion annual run rate platform operating in 10,000 cities globally. The team developed a sophisticated multi-agent system using multimodal LLMs for image understanding, routing, enhancement, and quality assurance. The solution balanced authenticity with quality improvement through a series of specialized agents that could route images for enhancement, generate image-specific editing prompts, iteratively improve images based on feedback, and validate outputs against multi-dimensional quality criteria. The system incorporated continuous learning loops including automated drift detection, human-in-the-loop labeling for alignment, config-driven auto-tuning, internal dogfooding feedback, and production metrics monitoring, ultimately improving conversion rates while maintaining marketplace diversity and merchant brand authenticity."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-image-enhancement-for-food-delivery-marketplace"
  ogTitle: "Uber: AI-Powered Image Enhancement for Food Delivery Marketplace - ZenML LLMOps Database"
  ogDescription: "Uber Eats faced a significant challenge with inconsistent photo quality across their marketplace, particularly for smaller independent merchants who lacked the time, knowledge, and budget for professional food photography. This quality gap impacted user experience and conversion rates across their $90 billion annual run rate platform operating in 10,000 cities globally. The team developed a sophisticated multi-agent system using multimodal LLMs for image understanding, routing, enhancement, and quality assurance. The solution balanced authenticity with quality improvement through a series of specialized agents that could route images for enhancement, generate image-specific editing prompts, iteratively improve images based on feedback, and validate outputs against multi-dimensional quality criteria. The system incorporated continuous learning loops including automated drift detection, human-in-the-loop labeling for alignment, config-driven auto-tuning, internal dogfooding feedback, and production metrics monitoring, ultimately improving conversion rates while maintaining marketplace diversity and merchant brand authenticity."
notion:
  pageId: "3aaf8dff-2538-8008-ad0f-f4110cb9691b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T11:59:00.000Z"
  lastEditedTime: "2026-07-27T11:59:00.000Z"
  publishedAt: "2026-08-06T11:49:11Z"
---

## Overview

Uber's computer vision team presented a production-scale LLMOps case study focused on improving visual content quality for their Uber Eats marketplace. With a $90 billion annual run rate, millions of items added monthly, 20% year-over-year growth, and operations across 10,000 cities globally, the delivery marketplace represents a significant portion of Uber's business. The challenge centered on addressing poor-quality food photography from smaller independent merchants who faced barriers including lack of time, technical know-how, and the high costs of professional photoshoots. The team needed to thread a delicate needle: improve image quality at scale while preserving authenticity, maintaining merchant brand identity, avoiding AI-generated aesthetics that consumers distrust, and preventing marketplace homogenization.

The solution architecture represents a sophisticated multi-agent orchestration system that leverages multimodal LLMs for understanding, routing, editing, and quality assurance. The design philosophy explicitly balanced the spectrum between deterministic, rules-based systems with high control but brittleness, and highly agentic systems with creativity but potential safety concerns. The team opted for a middle ground that provided agents with significant autonomy while maintaining strict guardrails and safety mechanisms.

## System Architecture and Agent Design

The production system consists of several specialized agents working in an orchestrated pipeline. The first component is an image understanding and routing agent that leverages multimodal capabilities to analyze incoming images. This agent examines the photograph along with text descriptions and metadata, generates a detailed description of what it observes, and produces structured output that feeds into a routing decision. The router determines whether an image should be enhanced or skipped based on quality assessment criteria. Images that pass quality thresholds retain their originals, while those requiring enhancement proceed to the next stage.

The image editing agent operates in an iterative feedback loop rather than a single-pass system. It receives guidance from a QA agent that provides multi-dimensional assessment across criteria like plating, faithfulness to the original, and color accuracy. The editing agent can self-correct and refine its outputs across multiple iterations. If after several loops the image still fails quality gates, the system rejects the enhancement and retains the original, taking a coverage hit rather than risking degraded quality or inauthentic results.

A critical architectural decision involved logging everything in a flat JSON structure rather than nested hierarchies. This flat schema proved invaluable for both technical and non-technical team members to diagnose individual cases and perform aggregate analysis. The team emphasized that robust logging infrastructure must be established from the beginning, as it forms the foundation for optimization and self-learning loops. Uber uses an internal observability platform for this purpose.

## Routing Agent Evaluation and Performance

The routing agent functions as a classifier with specific pass/fail criteria derived from structured output grading against a rubric. Evaluation follows traditional classification metrics using confusion matrices to measure precision and recall across true positives, false negatives, false positives, and true negatives. For this use case, recall serves as the primary guardrail metric because the team prioritized ensuring no poor-quality images slip through the system unenhanced.

The team illustrated failure modes that highlight the importance of routing accuracy. Precision failures occur when high-quality images like an excellent cheeseburger photo get incorrectly flagged for enhancement, resulting in unnecessary compute costs for zero quality lift and potential risk of degrading already excellent imagery. Recall failures present even greater risks, such as an image showing six chicken wings for a menu item described as eight pieces passing through without enhancement, creating opportunities for hallucination during editing where the model might attempt to add the missing wings to match the description, violating the faithfulness principle.

The routing architecture supports sophistication beyond binary classification. The system can route images to lower-latency smaller models for cost savings and improved user experience when appropriate, trading off some quality. This approach transforms the evaluation framework from a simple 2x2 confusion matrix to an n-by-n matrix where each cell indicates correct routing to specific processing branches.

## Human Alignment and Cold Start

The team treats human labels as the golden source of truth for model alignment. The initial model development process involves collecting a representative dataset spanning different geographic regions, dish types, and image quality levels. Human labelers receive objective guidelines designed to minimize subjective biases and noise. The team tunes agents by comparing agent outputs against this golden dataset, iterating until guardrail metrics are met before shipping to production.

This human alignment philosophy extends beyond initial training. The team emphasized that static offline models inevitably encounter long-tail edge cases where they continue to fail. A production system requires mechanisms for prompts, agents, and the overall system to evolve over time. Every component in their architecture includes auto-tuning capabilities to address online drift.

## Continuous Learning and Drift Management

The drift management system operates through automated continuous learning loops that require no human intervention during execution, though observability and quick rollback capabilities remain in place. Production data gets sampled at regular cadence and sent to human labelers using the same objective guidelines established during initial training. The system compares agent outputs against human labels to detect mismatches.

When mismatches occur, an umbrella diagnosis agent localizes the issue and triggers the auto-tuning pipeline. This diagnosis layer represents a key architectural abstraction that can accept feedback from multiple sources including drift detection, internal dogfooding, merchant feedback, and production metrics. The diagnoser reflects on which specific agent or agents within the overall system require optimization and routes configuration updates appropriately.

The auto-tuning process itself consists of two sub-agents working in concert. The reflect agent examines mismatches to remove noise, identify systemic issues, and generate structured feedback. The synthesize agent consumes this feedback along with the current agent configuration to generate updated configs. The updated agent gets benchmarked against the golden dataset, and if it passes guardrail metrics, it registers as the new version in the agent store for pickup during the next production run. This config-driven approach enables rapid iteration without code changes.

## Image Enhancement and Iterative Refinement

The enhancement process follows a three-step iterative workflow. First, a prompt generation agent creates image-specific editing instructions based on the multimodal description and directives from the routing agent, identifying what specifically needs improvement for that particular image. Second, the image enhancement occurs based on these tailored prompts. Third, a multi-dimensional QA gate evaluates the result across criteria including plating, faithfulness, colors, and other quality dimensions.

The system implements a pass-at-K evaluation metric, measuring the pass rate at the Kth iteration. This reflects the iterative nature of the enhancement where failed attempts receive feedback that gets incorporated into subsequent iterations. The team showed an example where sweet potato fries initially failed due to incorrect portion size and unrealistic plating, but passed on the second iteration after incorporating QA feedback. The expectation is that pass rates increase with more iterations due to accumulated feedback, though the system imposes iteration limits to prevent runaway compute costs.

## Multi-Dimensional Quality Assessment

For the generation and enhancement evaluation, the team employs pairwise comparison between input and output images to determine whether the output represents an improvement. While the specific rubric details remain proprietary, the assessment framework requires alignment across product, design, policy, and legal stakeholders. Key evaluation dimensions include faithfulness to the original, completeness of elements, naturalness of appearance, and realism of the scene.

The team illustrated various failure modes that their quality gates detect. Faithfulness failures include adding elements not present in the original, such as shrimp appearing in an enhanced image. Completeness failures involve removing elements that should remain, like sauce at the bottom of sushi. The system also detects reward hacking behaviors where agents make overly conservative edits that technically differ from the input but provide no meaningful quality improvement, such as swapping one generic ceramic bowl for another. Object coherence and physics plausibility failures sometimes stem from limitations in frontier foundation models that leak into the applied use case, which the team coordinates with model providers to address.

Multimodality proves essential for certain quality checks. For example, when an image shows what might be wontons but the count cannot be verified visually, the system returns an unsure verdict and rejects the enhancement in production rather than risk hallucination or mislabeling.

## Final Quality Gates and Swiss Cheese Model

Before publishing to production, images pass through a final post-processing and publish-ready QA step. This gate performs policy checks and holistic quality assessment. While this introduces some redundancy with earlier QA stages, the team deliberately adopts a Swiss cheese model approach where multiple defensive layers reduce the probability of failures reaching production. The final gate captures issues that should have been caught upstream while also performing broader quality and policy validation.

## Production Feedback Loops and Continuous Improvement

Beyond the model-level drift detection loop, the system incorporates multiple feedback mechanisms from production usage. Uber's dogfooding culture means internal users test features before public release and provide structured feedback. Once live, the platform captures thumbs up/down signals along with free-form feedback from merchants, design teams, and other product teams across Uber.

This feedback flows into the same diagnoser abstraction that handles drift detection, creating a unified framework for continuous improvement from diverse signal sources. The diagnoser can trigger updates to one or multiple agents based on the nature of the feedback. Before deployment, the system replays known good and bad examples to benchmark the updated configuration against established metrics.

## Production Metrics and Segmentation Analysis

In production, the team tracks a comprehensive set of marketplace quality and health metrics. Conversion serves as a key indicator, measuring improvements in users adding items to cart, completing purchases, and order fulfillment. The production scale provides rich data for segmentation analysis across geographic regions, device types, dish categories, and other dimensions. This granular visibility enables targeted tuning for specific segments where improvements or regressions occur, allowing the team to optimize different parts of the marketplace independently while monitoring global metrics.

## Balancing Autonomy and Control

Throughout the presentation, the team emphasized the philosophical and practical balance between agent autonomy and system control. The use case demands creativity and agency to handle the long-tail distribution of image quality issues across a global marketplace, but unconstrained creativity risks violating authenticity, faithfulness, brand preservation, and policy requirements. The multi-layered architecture with routing decisions, iterative refinement, multi-dimensional quality gates, and the Swiss cheese defensive model represents their approach to threading this needle.

The continuous learning system exemplifies this balance. While agents automatically tune themselves based on drift detection and feedback without human intervention for each update, the team maintains observability over guardrail metrics and quick rollback capabilities. The config-driven architecture enables rapid iteration while the benchmarking against golden datasets before deployment ensures changes meet quality bars.

## Scale and Cost Considerations

Operating at the scale of millions of items added monthly across 10,000 cities globally requires careful attention to cost efficiency. The routing agent's role in selectively enhancing images rather than processing everything addresses this directly. The ability to route to smaller, lower-latency models when appropriate trades quality for cost and user experience improvements where the tradeoff makes sense. The iteration limits on the enhancement loop prevent runaway costs from difficult-to-improve images, instead taking coverage hits by retaining originals.

The logging and observability infrastructure, while essential for continuous improvement, also requires careful design at this scale. The flat JSON structure choice over nested hierarchies suggests optimization for query performance and analytical accessibility rather than hierarchical complexity.

## Critical Assessment

While the presentation demonstrates sophisticated LLMOps practices, several aspects warrant balanced consideration. The team claims their continuous learning system operates without human in the loop for config updates, but human labelers remain essential for generating the ground truth labels that drive drift detection and benchmarking. This represents human involvement at a different layer rather than true elimination of human dependency.

The proprietary nature of their quality rubric and specific prompt engineering techniques limits reproducibility and independent verification of their results. While understandable from a competitive perspective, this prevents external validation of their claimed improvements and balancing of authenticity versus quality.

The conversion improvements are mentioned but not quantified in the presentation, making it difficult to assess the magnitude of impact. Similarly, the cost implications of the iterative enhancement loop, multiple quality gates, and continuous learning infrastructure are not discussed, leaving questions about the economic viability of this approach for organizations with smaller scale or tighter margins.

The team's emphasis on avoiding AI-generated appearance while using generative AI for image enhancement represents an interesting tension. The degree to which they successfully navigate this paradox, and whether consumers truly cannot detect the enhancements, remains an open question not fully addressed by the technical architecture alone.

Finally, the reliance on frontier foundation models for image editing means that limitations and failures in those underlying models propagate through the system. While the team coordinates with providers on these issues, this dependency introduces risks outside their direct control that could impact their service quality and reliability.
