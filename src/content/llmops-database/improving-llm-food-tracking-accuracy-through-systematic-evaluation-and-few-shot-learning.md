---
title: "Improving LLM Food Tracking Accuracy through Systematic Evaluation and Few-Shot Learning"
slug: "improving-llm-food-tracking-accuracy-through-systematic-evaluation-and-few-shot-learning"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "681767a8d400f6751b916956"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:07:29.152Z"
  createdOn: "2025-05-04T13:12:08.630Z"
llmopsTags:
  - "structured-output"
  - "data-analysis"
  - "few-shot"
  - "prompt-engineering"
  - "error-handling"
  - "system-prompts"
  - "fastapi"
  - "wandb"
  - "google-gcp"
  - "openai"
industryTags: "tech"
company: "Taralli"
summary: "A case study of Taralli's food tracking application that initially used a naive approach with GPT-4-mini for calorie and nutrient estimation, resulting in significant accuracy issues. Through the implementation of systematic evaluation methods, creation of a golden dataset, and optimization using DSPy's BootstrapFewShotWithRandomSearch technique, they improved accuracy from 17% to 76% while maintaining reasonable response times with Gemini 2.5 Flash."
link: "https://duarteocarmo.com/blog/evals-are-all-you-need"
year: 2025
seo:
  title: "Taralli: Improving LLM Food Tracking Accuracy through Systematic Evaluation and Few-Shot Learning - ZenML LLMOps Database"
  description: "A case study of Taralli's food tracking application that initially used a naive approach with GPT-4-mini for calorie and nutrient estimation, resulting in significant accuracy issues. Through the implementation of systematic evaluation methods, creation of a golden dataset, and optimization using DSPy's BootstrapFewShotWithRandomSearch technique, they improved accuracy from 17% to 76% while maintaining reasonable response times with Gemini 2.5 Flash."
  canonical: "https://www.zenml.io/llmops-database/improving-llm-food-tracking-accuracy-through-systematic-evaluation-and-few-shot-learning"
  ogTitle: "Taralli: Improving LLM Food Tracking Accuracy through Systematic Evaluation and Few-Shot Learning - ZenML LLMOps Database"
  ogDescription: "A case study of Taralli's food tracking application that initially used a naive approach with GPT-4-mini for calorie and nutrient estimation, resulting in significant accuracy issues. Through the implementation of systematic evaluation methods, creation of a golden dataset, and optimization using DSPy's BootstrapFewShotWithRandomSearch technique, they improved accuracy from 17% to 76% while maintaining reasonable response times with Gemini 2.5 Flash."
---

## Overview

This case study documents the development journey of Taralli, a calorie tracking application that uses LLMs to analyze user-provided food descriptions and return nutritional information. The case study is a practical example of how to systematically improve LLM-based production systems through evaluation-driven development. Written by an independent developer, the post provides valuable insights into the realities of shipping LLM-powered features and the importance of post-deployment iteration.

The core problem was straightforward but common in LLM applications: the initial system worked well enough to validate the product concept, but failed in predictable ways once exposed to real user inputs. The author's journey from a 17% accuracy rate to 76% demonstrates a pragmatic approach to LLMOps that prioritizes getting something working first, then systematically improving it based on real-world data.

## Initial System Architecture

The first implementation followed a deliberately simple approach that the author advocates for when validating new LLM-powered features. The system consisted of a single API endpoint that took a user's food description as a string, passed it to GPT-4o-mini with structured outputs, and returned a JSON response conforming to a Pydantic model.

The Pydantic schema was well-designed, capturing food items with their nutritional breakdown including name, quantity, calories, macronutrients (carbs, fat, protein, fiber), and food group classifications (dairy, meat and alternatives, grain, fruit, vegetable). This structured output approach ensured consistent response formatting from the LLM, with the author noting that format compliance was nearly 100%.

However, the semantic accuracy of the outputs proved problematic. The most significant failure mode was quantity misinterpretation. When users provided inputs like "100g of peanut butter," the model would set quantity to 100 and calories to 588 per unit, resulting in a wildly incorrect total of 58,800 calories. The expected behavior was to set the name to "100g of peanut butter" with quantity of 1, treating the measurement as part of the food item description rather than a multiplier.

## Observability and Data Collection

A critical LLMOps practice demonstrated in this case study is the importance of production logging from day one. The author used W&B Weave (Weights & Biases' tracing and evaluation tool) with a simple decorator to log every input-output pair from the food analysis system. This decision was made even before the app launched, with users explicitly informed that their inputs would be logged.

This observability infrastructure proved invaluable for identifying failure modes. By reviewing production data, the author could systematically identify categories of errors—wrong food groups, incorrect quantities, and other semantic misunderstandings. This real-world data became the foundation for building a golden dataset for evaluation.

The logging approach exemplifies a key principle: you cannot improve what you cannot measure. Having access to actual user inputs, rather than synthetic test cases, meant the golden dataset would reflect real usage patterns and edge cases that might not have been anticipated during initial development.

## Golden Dataset Creation

The author built a golden dataset by collecting problematic examples from production logs and creating corrected reference outputs. This process involved using more capable models (OpenAI's o3 and Google's Gemini 2.5 Pro) to help generate accurate nutritional analyses, with human review and editing to ensure correctness.

To facilitate this process, the author built a custom visualizer tool for viewing and editing dataset entries—described as "200% vibe coded," suggesting a quickly-built internal tool. This infrastructure investment in tooling for dataset curation is often overlooked but can significantly accelerate the evaluation and improvement cycle.

The golden dataset was then split into training and validation sets, following standard machine learning practice. This separation ensures that performance improvements can be validated on data not seen during optimization, reducing the risk of overfitting to specific examples.

## Evaluation Metric Design

The evaluation metric was designed based on observed failure modes rather than theoretical correctness criteria. The author identified two primary categories of errors: incorrect calorie totals and missing or incorrect food groups. The metric reflects these priorities:

A prediction is considered correct if it meets two conditions: the total calculated calories are within 10% of the golden reference, and there is at least some overlap between predicted and expected food groups. Both conditions must be true for a positive evaluation.

This metric design represents a pragmatic tradeoff. The 10% tolerance for calories acknowledges that nutritional data has inherent variability and users likely care more about approximate accuracy than precision. The food group overlap requirement ensures basic categorical correctness without being overly strict about exact matches.

The author explicitly notes that the metric could be more refined, but this simple approach was sufficient to drive meaningful improvements. This is an important lesson in LLMOps: perfect metrics are less important than having some metric that correlates with user value and can guide iteration.

## Baseline Evaluation

With the golden dataset and metric in place, the author established baselines for the existing production system. The GPT-4o-mini implementation scored only 17.24% on the validation set—a sobering but not surprising result given the observed failure modes.

As an additional baseline, the author tested Gemini 2.5 Flash with a zero-shot approach using DSPy's `dspy.Predict` signature. This achieved 25% accuracy—better than the production system but still far from acceptable. These baselines provided clear targets for improvement and demonstrated that simply switching models was not sufficient to solve the problem.

The evaluation code used concurrent execution with ThreadPoolExecutor to parallelize metric computation across examples, a practical consideration for larger evaluation sets.

## Prompt Optimization with DSPy

DSPy (Declarative Self-improving Python) is a framework for programmatically optimizing LLM prompts and pipelines. The author applied DSPy's `BootstrapFewShotWithRandomSearch` optimizer, which automatically selects optimal few-shot examples from the training set to include in the prompt.

The optimization process configured parameters for maximum labeled demonstrations (16) and number of candidate programs to evaluate (16). After running the optimizer on the training set and evaluating on the validation set, accuracy jumped from 25% (zero-shot) to 75.9%—a dramatic improvement achieved through automated example selection.

The resulting optimized prompt is essentially a few-shot prompt with carefully selected examples that demonstrate the desired behavior for handling quantities, food group classification, and nutritional calculations. The author provides the full prompt in the original post, showing how DSPy transforms a simple signature into an effective few-shot prompt.

The author honestly acknowledges the tradeoffs: the optimized prompt includes several few-shot examples, which increases token count and can impact response latency. However, using the relatively fast Gemini 2.5 Flash model mitigates this concern for their use case.

## Production Integration

The optimized DSPy program was serialized to JSON and integrated into the FastAPI application. The integration code demonstrates several production-ready patterns:

The classifier is loaded once at application startup and configured with async support (`dspy.asyncify`), avoiding the overhead of reinitializing the model for each request. The async max workers parameter (4) controls concurrency for parallel LLM calls if needed.

The endpoint maintains W&B Weave logging through the `@weave.op()` decorator, ensuring that the new system's outputs are captured for ongoing monitoring and future golden dataset expansion. The API includes authentication via API key headers and proper error handling with type validation.

The new endpoint was deployed alongside the existing system as `/calories-v2`, allowing for a gradual rollout and comparison between old and new implementations.

## The Flywheel Effect

One of the most valuable insights from this case study is the emphasis on creating a sustainable improvement cycle. The author describes a flywheel effect where user interactions generate new data, which can be reviewed and added to the golden dataset, which enables prompt re-optimization, which improves user experience, which drives more usage.

This continuous improvement mindset is central to effective LLMOps. Unlike traditional software where bugs are fixed and features are shipped, LLM-powered systems benefit from ongoing evaluation and refinement as the nature of inputs and edge cases evolves with user behavior.

## Lessons and Critical Assessment

The case study offers several valuable lessons for LLMOps practitioners. The author's philosophy of shipping early ("just put it out there") to validate before optimizing is pragmatic, though it does require being comfortable with initial quality issues reaching users.

The evaluation-driven approach demonstrated here is sound. Having concrete metrics, golden datasets, and systematic evaluation infrastructure transforms LLM improvement from guesswork to engineering. The 17% to 76% improvement is significant and achieved through relatively straightforward techniques.

However, it's worth noting some limitations. A 76% accuracy rate, while much improved, still means roughly one in four predictions may be problematic. For a calorie tracking app, this might be acceptable, but the threshold for "good enough" varies significantly by application domain. The author acknowledges "still room for improvement," suggesting this is a work in progress rather than a finished solution.

The golden dataset approach also requires careful consideration of dataset quality and coverage. With only 29 validation examples mentioned in the evaluation output, the dataset is relatively small, and performance on this set may not fully represent behavior on the long tail of real-world inputs.

The case study provides an honest and practical look at improving LLM-powered features through systematic evaluation and optimization, making it a valuable reference for developers facing similar challenges in production LLM applications.