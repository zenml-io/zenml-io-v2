---
title: "Automated Inventory Counting with Multimodal LLMs in Grocery Fulfillment"
slug: "automated-inventory-counting-with-multimodal-llms-in-grocery-fulfillment"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "692430fb59a7008f7b2269fc"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:28:29.433Z"
  createdOn: "2025-11-24T10:18:35.196Z"
llmopsTags:
  - "fraud-detection"
  - "classification"
  - "poc"
  - "multi-modality"
  - "fine-tuning"
  - "prompt-engineering"
  - "few-shot"
  - "embeddings"
  - "multi-agent-systems"
  - "evals"
  - "fastapi"
  - "monitoring"
  - "databases"
  - "open-source"
  - "google-gcp"
industryTags: "e-commerce"
company: "Picnic"
summary: "Picnic, an online grocery delivery company, implemented a multimodal LLM-based computer vision system to automate inventory counting in their automated warehouse. The manual stock counting process was time-consuming at scale, and traditional approaches like weighing scales proved unreliable due to measurement variance. The solution involved deploying camera setups to capture high-quality images of grocery totes, using Google Gemini's multimodal models with carefully crafted prompts and supply chain reference images to count products. Through fine-tuning, they achieved performance comparable to expensive pro-tier models using cost-effective flash models, deployed via a Fast API service with LiteLLM as a proxy layer for model interchangeability, and implemented continuous validation through selective manual checks."
link: "https://www.youtube.com/watch?v=bkJRzF9Lk9Q"
year: 2025
seo:
  title: "Picnic: Automated Inventory Counting with Multimodal LLMs in Grocery Fulfillment - ZenML LLMOps Database"
  description: "Picnic, an online grocery delivery company, implemented a multimodal LLM-based computer vision system to automate inventory counting in their automated warehouse. The manual stock counting process was time-consuming at scale, and traditional approaches like weighing scales proved unreliable due to measurement variance. The solution involved deploying camera setups to capture high-quality images of grocery totes, using Google Gemini's multimodal models with carefully crafted prompts and supply chain reference images to count products. Through fine-tuning, they achieved performance comparable to expensive pro-tier models using cost-effective flash models, deployed via a Fast API service with LiteLLM as a proxy layer for model interchangeability, and implemented continuous validation through selective manual checks."
  canonical: "https://www.zenml.io/llmops-database/automated-inventory-counting-with-multimodal-llms-in-grocery-fulfillment"
  ogTitle: "Picnic: Automated Inventory Counting with Multimodal LLMs in Grocery Fulfillment - ZenML LLMOps Database"
  ogDescription: "Picnic, an online grocery delivery company, implemented a multimodal LLM-based computer vision system to automate inventory counting in their automated warehouse. The manual stock counting process was time-consuming at scale, and traditional approaches like weighing scales proved unreliable due to measurement variance. The solution involved deploying camera setups to capture high-quality images of grocery totes, using Google Gemini's multimodal models with carefully crafted prompts and supply chain reference images to count products. Through fine-tuning, they achieved performance comparable to expensive pro-tier models using cost-effective flash models, deployed via a Fast API service with LiteLLM as a proxy layer for model interchangeability, and implemented continuous validation through selective manual checks."
---

## Overview

Picnic is an online grocery delivery company operating in the Netherlands, Germany, and France that virtualizes the supermarket experience through a mobile app while maintaining a physical, highly automated supply chain. The company operates one of Europe's most advanced automated warehouses in Utrecht, where instead of shoppers walking through aisles, totes containing products move to stationary workers who pick items. As an ML-focused organization, Picnic follows a "full-stack" ML engineering approach where engineers scope business problems, analyze feasibility, experiment with solutions, productionize models, and maintain ownership through monitoring.

The specific problem addressed in this case study was automated inventory counting in their fulfillment center. While theoretically simple (ordered quantity minus sold quantity equals stock), real-world complications like supplier discrepancies, damaged goods, and handling issues necessitated constant stock updates. Previously, shoppers were manually asked every few picks to count products remaining in totes—a quick task individually but time-consuming at Picnic's scale. The business case for automation was clear: free up human time while maintaining accuracy in inventory tracking, which directly impacts customer-facing stock availability promises.

## Problem Scoping and Alternative Approaches

The team evaluated multiple approaches before settling on multimodal LLMs. Initial consideration of weighing scales proved impractical—the installed scales had too much measurement deviation to reliably count individual products. Computer vision emerged as the preferred approach not only for stock counting but also for potential future capabilities including automatic freshness checking for produce, damage detection for packaging, and missing item verification during picking operations.

However, implementing computer vision required solving significant hardware challenges. Capturing high-quality images in an automated warehouse environment proved difficult due to fast-moving totes, limited lighting in camera placement locations, and the need for compact hardware. The team worked with industry partners and ultimately developed a pragmatic camera setup combining a small camera, flashlight, laser, and barcode scanner (for linking totes to expected products) that could capture sufficiently high-quality images for analysis.

## Dataset Creation and Evaluation Framework

Leveraging Picnic's ownership of their entire supply chain software stack provided a significant advantage in dataset creation. Since shoppers were already manually counting products, these human counts could serve as labels for thousands of images. The dataset included the captured images, associated product information from barcodes, manual counts, and importantly, corrected quantities—because review revealed that humans also made counting errors, and the team wanted the highest quality ground truth possible for model training.

A unique aspect of their data infrastructure was the systematic capture of "supply chain images"—standardized reference photos of each product as it appears in their supply chain. These reference images later proved critical to model performance, representing domain-specific context that dramatically improved accuracy.

The team established a comprehensive evaluation framework with multiple metrics beyond simple accuracy. While exact count accuracy was the primary metric (being off by even one item counts as failure), they implemented secondary metrics to understand model behavior more deeply. Mean Average Percentage Error (MAPE) was particularly important for low-stock situations, where being off by one item when zero or one remains has much greater business impact than the same error with five or six items. Root Mean Squared Error (RMSE) penalized larger errors more heavily, while Mean Signed Deviation (MSD) revealed systematic tendencies toward over-prediction or under-prediction, each with different business consequences (disappointed customers vs. unnecessary stock-outs).

## Data Split Strategy for LLM Development

An interesting technical decision involved train-test data splitting. The team noted that traditional 80-20 splits (80% training, 20% validation) are standard for deep neural networks, but research and tools like DSPy suggest that for LLM prompt optimization, an inverted 20-80 split is more appropriate (20% training, 80% validation). This reflects the different learning dynamics of in-context learning and prompt optimization compared to gradient-based training of neural networks. The team kept this consideration in mind during dataset creation, anticipating they would leverage LLMs for the solution.

## Model Selection Process

Rather than immediately beginning model development, the team conducted a structured model selection process weighing traditional computer vision approaches against multimodal LLMs. Traditional approaches like YOLO, DETR, and vision transformers typically excel when abundant labeled data is available and can achieve excellent performance with very low latency (multiple predictions per second) and straightforward self-hosting. However, their out-of-box performance without extensive training tends to be poor. The team tested several traditional models, and even those that theoretically should handle counting objects in containers struggled with their specific grocery inventory scenario.

Multimodal LLMs presented a contrasting profile. Based on impressive demos from major providers showing cognitively complex visual reasoning, the team expected strong performance including good zero-shot capabilities due to the general-purpose nature of these models. However, concerns existed around latency and self-hosting complexity—proprietary models couldn't be self-hosted at all, while large open-source models required substantial compute resources. The business requirements provided some flexibility here; while real-time inference wasn't necessary (totes could be rerouted based on counts), predictions still needed to complete within a reasonable timeframe, not minutes.

For LLM selection specifically, the team faced the challenge of rapidly evolving model landscape with new releases weekly and varying cost-performance tradeoffs. Rather than testing every model, they sought a benchmark that was sufficiently difficult, required multimodal understanding, and was regularly updated. They selected MMMU (Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark for Expert AGI), which focuses on advanced perception and reasoning across heterogeneous image types including charts, diagrams, and maps, and importantly includes human baselines for performance comparison.

A key insight from the MMMU benchmark was that proprietary models (red trend line) and open-source models (blue trend line) were converging rapidly, with only approximately nine months separating when the best proprietary model was surpassed by the best open-source model. This suggested that while starting with proprietary models might be practical, planning for eventual migration to open-source alternatives was strategically sound. The benchmark also enabled cost-effective model selection—while the absolute best models might solve the problem, using something like "GPT-5 with thinking mode on every image" wouldn't make business sense for counting grocery items.

## The Accountability Check Challenge

Initial deployment revealed a critical challenge: some images were fundamentally uncountable, even for humans. Products completely blocked by cardboard, items stacked on top of each other, or scenarios where inner products separated from their outer packaging created ambiguous situations. As a pragmatic solution, the team implemented an "accountability check" as a preprocessing step to determine whether an image was even countable before attempting to predict quantities.

They evaluated this accountability check using precision (of images the model marked as countable, how many truly were) and recall (of all truly countable images, how many did the model identify). Initially attempting to use the same LLM approach for accountability checking yielded poor results. Even with prompt engineering and prompt optimization techniques, performance remained inadequate.

Returning to first principles, the team embedded all incorrectly predicted images and performed clustering analysis to identify patterns in failure cases. This revealed specific categories of issues: cardboard obstructions, particular types of product stacking, and specific packaging types that consistently caused problems. Notably, these patterns could be captured through simple rule-based logic, which dramatically outperformed the LLM-based accountability check. This serves as an important reminder in the LLMOps context that traditional software engineering approaches like business rules can and should outperform ML solutions when applicable, and that starting with simpler solutions is often more pragmatic than immediately reaching for sophisticated models.

## Leveraging Domain-Specific Context for Performance

With accountability checking in place, the team focused on improving counting accuracy. The model was "often being distracted" by stickers in totes, reflections, and products positioned upside-down. While prompt engineering provided some improvements, the breakthrough came from recognizing that prompting fundamentally provides context to models, and Picnic possessed high-quality contextual information beyond what text prompts could convey.

The critical innovation was including the supply chain reference image alongside the tote image in the model input. This provided visual context of what the product should look like in standard conditions, enabling the model to better recognize items regardless of orientation, partial occlusion, or unusual positioning. Upon adding these reference images, accuracy "shot up" and all other metrics improved significantly. This highlights an important LLMOps principle: domain-specific context that organizations uniquely possess can provide dramatic performance improvements beyond generic prompt engineering techniques.

The speaker specifically noted that techniques like DSPy for automated prompt optimization, which might work well for customer service agents where adding role descriptions, tone of voice, and company-specific examples matters, didn't provide value for their counting task. Whether counting groceries or screwdrivers, the visual reasoning task remains fundamentally the same, making domain-specific visual context far more valuable than text prompt variations.

## Cost-Performance Optimization Through Fine-Tuning

Even with optimized prompts and reference images, a cost-performance gap remained. Using Google Gemini models as their provider, the team tested different tiers: Gemini 2.0 Flash (cheapest), Gemini 2.5 Flash (mid-tier), and Gemini 2.5 Pro (most expensive). Normalizing performance to make 2.0 Flash = 100, they found 2.5 Flash still didn't meet business requirements for accuracy, but 2.5 Pro (roughly 140 on their normalized scale) definitely solved the problem—except at a cost point that undermined the business case.

The solution was fine-tuning. By leveraging their high-quality labeled dataset to fine-tune the Gemini 2.5 Flash model, they achieved performance that outperformed the base 2.5 Pro model while maintaining Flash-tier pricing. The speaker acknowledged that fine-tuning the Pro model would likely surpass their fine-tuned Flash model, but for business purposes, achieving Pro-level performance at Flash-tier costs represented the pragmatic optimum.

This demonstrates a crucial LLMOps pattern: when foundation models are close but not quite sufficient for production requirements, fine-tuning mid-tier models can bridge the gap more cost-effectively than simply using larger base models. The investment in dataset quality earlier in the process directly enabled this fine-tuning approach.

## Production Architecture and Model Interchangeability

The production deployment consists of 16 camera setups distributed throughout the automated fulfillment center (AFC). The software architecture centers on a Fast API web service that receives images from cameras. Architecturally, the service immediately returns a response to unlock the camera, then processes the request asynchronously using background tasks—a common pattern for decoupling user-facing responsiveness from backend processing latency.

The processing pipeline collects all necessary context (the prompt template, the supply chain reference image, and the captured tote image) and routes requests through LiteLLM, an LLM proxy layer, which forwards to Google Gemini. The strategic decision to place LiteLLM between their service and the LLM provider reflects forward-thinking LLMOps planning. During development, the team frequently switched between models as new releases offered better performance or cost characteristics. The speaker specifically mentioned Grok becoming "47 times cheaper" within the same week while maintaining similar performance—exactly the type of opportunity that model interchangeability enables teams to quickly exploit.

Rather than hardcoding provider-specific API calls, the abstraction layer allows switching models or providers with minimal code changes. This architectural pattern acknowledges the rapidly evolving LLM landscape and plans for ongoing optimization as the foundation model ecosystem matures. It also positions Picnic to potentially migrate to open-source models as they close the nine-month gap identified in the MMMU benchmark analysis.

## Monitoring and Continuous Validation

Predictions are published to Snowflake for monitoring and analysis. The team implemented a clever validation strategy leveraging their existing manual counting infrastructure: while the vast majority of counts are now automated, a small percentage still request manual validation from shoppers. These validation counts are published as events to Snowflake, enabling continuous comparison of model performance against human ground truth in production.

This monitoring approach was motivated by real-world examples of production degradation. The speaker referenced a recent Anthropic paper describing summer performance degradation caused not by model changes but by infrastructure-level issues. Such incidents would significantly impact Picnic's operations, making continuous performance tracking essential. The selective validation approach balances comprehensive monitoring with operational efficiency—full manual validation would eliminate the automation benefits, while zero validation would leave the team blind to silent failures.

The control software that manages warehouse operations receives predictions and uses them for operational decisions, creating a tight feedback loop where model performance directly impacts physical operations. This integration means that model degradation would have immediate, visible consequences rather than silently accumulating errors in a less critical system.

## Key Learnings and LLMOps Principles

The presentation concluded with several key learnings that generalize beyond this specific use case:

**Leveraging unique context is more valuable than generic prompt optimization.** The supply chain reference images represented domain-specific context that Picnic uniquely possessed, providing dramatically more value than text prompt engineering. Organizations should inventory what unique contextual information they can provide to models beyond what generic prompt optimization techniques offer.

**Fine-tuning smaller models can outperform larger base models.** Rather than always reaching for the largest, most expensive models, teams should evaluate whether mid-tier models with task-specific fine-tuning can achieve required performance more cost-effectively. This requires investment in high-quality datasets but can fundamentally change the economics of LLM deployment.

**Proprietary models currently lead but open-source is catching up rapidly.** For visual reasoning tasks specifically, proprietary multimodal models have become very capable, but the gap with open-source alternatives is roughly nine months and closing. Architecture decisions should anticipate eventual migration to open-source alternatives as they mature.

**Plan for model interchangeability from the start.** Using abstraction layers like LiteLLM enables teams to rapidly take advantage of new model releases offering better performance or pricing without significant re-engineering. Given the pace of foundation model development, this architectural flexibility provides ongoing optimization opportunities.

**Traditional approaches can outperform ML for specific sub-problems.** The accountability check, initially attempted with LLMs, worked far better with simple rules derived from clustering analysis of failure cases. Teams should continuously evaluate whether simpler solutions suffice before applying more sophisticated approaches.

**Analyzing mistakes systematically reveals patterns amenable to simple fixes.** Rather than exclusively focusing on model improvement, examining failure cases can reveal addressable patterns through data quality improvements, rule-based preprocessing, or better context provision.

## Organizational Context

The case study provides useful context about Picnic's ML engineering culture that enabled this project. The team follows a "you build it, you own it" philosophy where ML engineers are involved from business problem scoping through production monitoring. This end-to-end ownership includes actively challenging whether ML is even appropriate—the speaker noted that often 80% of problems can be solved with business rules, making ML overkill.

Engineers work closely with business analysts during problem analysis, use tools like Marimo notebooks for experimentation (with another speaker presenting on this at the same conference), and deploy models via two patterns: batch/event-driven processing or web services using Fast API. The culture emphasizes high-quality code with type hints, docstrings, tests, and monitoring tooling, reflecting software engineering best practices applied to ML systems.

Picnic has built extensive in-house ML capabilities across their operations, including recommendations, demand forecasting, stop time estimation, staffing optimization, customer message classification, and more. This broad ML adoption provides infrastructure and expertise that individual projects like inventory counting can leverage, while the inventory counting system itself creates reusable infrastructure (camera setups, image processing pipelines, LLM integration patterns) that future projects can build upon.

The presentation represents a mature LLMOps implementation that thoughtfully balances cutting-edge capabilities (multimodal LLMs), pragmatic engineering (rule-based accountability checks), cost optimization (fine-tuning mid-tier models), and operational robustness (continuous validation, model interchangeability). The team demonstrated sophisticated understanding of when to use advanced techniques and when simpler approaches suffice, resulting in a production system that delivers business value while managing costs and operational risks.