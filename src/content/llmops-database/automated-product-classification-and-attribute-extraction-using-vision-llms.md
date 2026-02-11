---
title: "Automated Product Classification and Attribute Extraction Using Vision LLMs"
slug: "automated-product-classification-and-attribute-extraction-using-vision-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67920041c7e4f643d88483a3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:57:33.041Z"
  createdOn: "2025-01-23T08:39:29.860Z"
llmopsTags:
  - "classification"
  - "structured-output"
  - "multi-modality"
  - "fine-tuning"
  - "prompt-engineering"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "kubernetes"
  - "triton"
  - "fastapi"
  - "wandb"
  - "cicd"
  - "monitoring"
  - "cache"
  - "scaling"
  - "google-gcp"
  - "hugging-face"
industryTags: "e-commerce"
company: "Shopify"
summary: "Shopify tackled the challenge of automatically understanding and categorizing millions of products across their platform by implementing a multi-step Vision LLM solution. The system extracts structured product information including categories and attributes from product images and descriptions, enabling better search, tax calculation, and recommendations. Through careful fine-tuning, evaluation, and cost optimization, they scaled the solution to handle tens of millions of predictions daily while maintaining high accuracy and managing hallucinations."
link: "https://www.youtube.com/watch?v=DNPLu3qNUN8&list=PLlcxuf1qTrwDDRUmXJA-x-uqp-qutke_x&index=20"
seo:
  title: "Shopify: Automated Product Classification and Attribute Extraction Using Vision LLMs - ZenML LLMOps Database"
  description: "Shopify tackled the challenge of automatically understanding and categorizing millions of products across their platform by implementing a multi-step Vision LLM solution. The system extracts structured product information including categories and attributes from product images and descriptions, enabling better search, tax calculation, and recommendations. Through careful fine-tuning, evaluation, and cost optimization, they scaled the solution to handle tens of millions of predictions daily while maintaining high accuracy and managing hallucinations."
  canonical: "https://www.zenml.io/llmops-database/automated-product-classification-and-attribute-extraction-using-vision-llms"
  ogTitle: "Shopify: Automated Product Classification and Attribute Extraction Using Vision LLMs - ZenML LLMOps Database"
  ogDescription: "Shopify tackled the challenge of automatically understanding and categorizing millions of products across their platform by implementing a multi-step Vision LLM solution. The system extracts structured product information including categories and attributes from product images and descriptions, enabling better search, tax calculation, and recommendations. Through careful fine-tuning, evaluation, and cost optimization, they scaled the solution to handle tens of millions of predictions daily while maintaining high accuracy and managing hallucinations."
---

## Overview

This case study presents Shopify's journey to build a production-grade system for automatically extracting structured product information from merchant listings using vision LLMs. The speaker, a machine learning engineer at Shopify, walks through the complete lifecycle from problem identification through production deployment, highlighting the practical challenges of running LLMs at massive scale in an e-commerce context.

Shopify provides tools for entrepreneurs to build e-commerce businesses, including online stores, point-of-sale systems, shipping, taxes, and checkout. At the heart of every Shopify merchant's business is their product catalog, but Shopify's flexible product detail page allows merchants to describe products however they want—creating a significant data quality challenge. Merchants can label products with any text, categorize them arbitrarily, and organize their stores according to their own preferences. While this flexibility is valuable for merchants, it creates a critical problem for Shopify: they don't actually know what merchants are selling in a structured way.

## The Business Problem

Structured product data is essential for multiple Shopify functions. Tax calculation is perhaps the most critical example—tax rates vary not just by jurisdiction but by product category, and getting this wrong has real financial and legal consequences. Beyond taxes, search relevancy, discovery, and recommendation systems all depend on understanding what products actually are. The speaker notes that while they could simply ask merchants to categorize their products using a standardized list, merchants typically ignore such requests because it creates friction in their workflow.

The core challenge then becomes: how do you automatically extract high-quality structured information from unstructured product data (images, titles, descriptions) at a scale of tens of millions of products per day, while keeping costs manageable?

## The Shopify Product Taxonomy

Before any machine learning could be applied, Shopify needed to define the universe of possible product categories and attributes. Looking at merchant-provided product types revealed tens of millions of unique values—an unworkable foundation for classification. Shopify built the Shopify Product Taxonomy, a structured hierarchy of approximately 12,000 categories, each with a defined set of relevant attributes. For example, a smartwatch category has specific attributes like band color, while a t-shirt has attributes like sleeve length and neck cut. Each attribute has a finite set of controlled values. This taxonomy is now open source, allowing community contributions via pull requests, though an internal team maintains governance.

## The Two-Step Vision LLM Approach

The system uses a two-step approach with vision models. In the first step, the model receives the product image and text (title, description) and predicts the product category, along with additional metadata like a simplified product description and image description. The simplified description is particularly valuable because merchants often include non-product information (like return policies) in descriptions, which adds noise to search relevance.

The second step predicts attributes. This requires two calls because attributes are category-dependent—the attributes relevant to a smartwatch (band material, display type) differ entirely from those for a screwdriver. Only after knowing the category can the system inject the appropriate attribute prompts into the model.

Both steps require structured JSON output, which presents hallucination challenges. The speaker noted that the model occasionally predicts category paths that don't actually exist in the taxonomy (e.g., predicting "Apparel and Accessories > Watches > Smartwatch" when smartwatches actually belong under "Jewelry"). They experimented with grammar enforcement during inference (selectively masking logits) but found this hurt performance more than it helped. Instead, they implemented post-hoc correction using fuzzy index lookup to match predicted categories to the nearest valid taxonomy entry. This correction is needed less than 2% of the time.

## Building the Training Dataset

Fine-tuning required training data, which Shopify initially lacked. For categories, some merchants had previously provided category information through various mechanisms, but the quality was often poor. Shopify used LLMs (GPT, Claude, Gemini) to correct and validate these merchant-provided labels, essentially asking the models "Do you think this is correct? If not, what should it be?"

For attributes, which had no existing labels, they generated synthetic data using multiple LLMs and took the intersection of their predictions, operating on the assumption that agreement across models indicates higher quality. They then sampled this data for human annotation to build confidence intervals on quality. The final golden dataset was stored as a private repository on Hugging Face.

The speaker made an important point about training data distribution: they intentionally do not match real-world distribution. In e-commerce, perhaps 50 categories dominate most sales while thousands of categories represent a long tail. Training on real-world distribution would optimize for common products at the expense of rare ones. Instead, they enforce a uniform distribution across categories, accepting that this creates training-inference skew but prioritizing consistent performance across the full taxonomy.

## Fine-Tuning Infrastructure

Shopify uses Sky Pilot for cluster management, which is a YAML-based declarative system that can spin up training clusters on demand. A key advantage is that Sky Pilot isn't limited to one cloud provider—it can search across GCP, AWS, Azure, and even on-premises Kubernetes clusters to find the cheapest option meeting the specified requirements. For this project, they typically requested clusters with 4 A100-80GB GPUs.

Additional infrastructure includes Hugging Face for artifact storage and Weights and Biases for experiment tracking. The fine-tuning approach follows standard supervised fine-tuning with question-answer pairs mapping product inputs to expected structured outputs.

## Evaluation at Scale

With an evaluation dataset of approximately 2 million records, even evaluation becomes computationally expensive. Shopify uses Ray with actor pools for parallelization, combined with SG Lang as an inference framework that supports batching. They compute standard classification metrics (precision, recall) as well as hierarchical variants appropriate for the taxonomy structure.

The fine-tuned model showed clear improvements over the baseline (a classical multilayer perceptron that was previously in production for category prediction). However, the speaker candidly noted that model quality wasn't the only consideration—when presenting to leadership, the immediate question was about cost, not accuracy.

## Cost Optimization for Production

Running LLMs at scale on tens of millions of products daily is expensive. If cost were no object, they could simply use GPT-4 for everything, but economics demanded optimization. Cost reduction came from multiple angles:

On the engineering side, they added caching layers and implemented careful business logic around when to trigger predictions. Rather than making prediction requests for every minor product change, they built intelligence about when predictions actually need to be refreshed.

On the inference side, they optimized for two distinct modes: real-time low-latency inference for the merchant admin UI, and high-throughput batch processing for API and bulk operations. For real-time serving, they tested multiple inference frameworks (TensorRT-LLM, LM Deploy, SG Lang, vLLM) and currently use LM Deploy on their Kubernetes cluster. The speaker emphasized that they constantly re-evaluate this stack as the field evolves rapidly.

For high-throughput batch processing, they built a data pipeline with Kafka for input/output, orchestrated by Google Cloud Dataflow. They experimented with loading models directly inside Dataflow workers but found it more efficient to keep models in the Kubernetes cluster with LM Deploy. The key optimization for throughput is maximizing batch size—deploying only one model instance per GPU (even for smaller models) and passing the largest possible batch size using continuous batching.

They also use Triton for serving, primarily for its batching capabilities which are critical for throughput-sensitive workloads. The speaker acknowledged this is an "ever-chasing game" of requirements: multimodality support, in-flight batching, speculative decoding, support for latest model architectures (like Llama 3.2). They maintain a checklist of requirements and select whatever solution currently satisfies the most while offering the best price-to-throughput ratio.

## Production Deployment and Feedback Loops

The system is now live and serves multiple internal consumers: search and recommendation systems, tax calculation, and legal compliance. Merchants see predictions in real-time as they create products and can accept, correct, or delete predictions. This feedback is valuable but requires careful handling—merchant corrections don't automatically flow into training data.

The speaker gave examples of why automatic incorporation is problematic: a merchant might correct a shoe prediction to "sock" (which is clearly valid), but for sensitive categories like firearms versus airsoft versus toy guns, more scrutiny is needed. Even something as seemingly simple as color lacks unanimous agreement—surveys would likely show plurality but not majority agreement on many colors.

Merchant feedback goes into a queue for sampling and review by vetted human annotators. Both human and LLM-based vetting occur before any feedback influences the model. Separately, Shopify maintains a continuous process of human evaluation where internal annotators assess prediction quality on an ongoing basis.

## Team and Timeline

The prototype and initial model development was done by a single engineer. Once the concept was proven and productionization began, the core team expanded to four people working for approximately three months. This was supported by sister teams (infrastructure team managing clusters, etc.) and integration work with consumer teams (search, tax).

## Key Takeaways

This case study illustrates several important LLMOps lessons: the importance of defining structured ontologies before ML can be applied; the value of multi-model agreement and human validation for generating synthetic training data; the critical role of cost optimization in making LLM applications viable at scale; the need for different serving architectures for latency-sensitive versus throughput-sensitive use cases; and the complexity of incorporating user feedback into model training, especially for a multi-tenant platform where individual merchant corrections may not reflect ground truth.