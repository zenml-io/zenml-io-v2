---
title: "Product Attribute Normalization and Sorting Using DSPy for Large-Scale E-commerce"
slug: "product-attribute-normalization-and-sorting-using-dspy-for-large-scale-e-commerce"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68e3763a03a0f0ca50c67d0c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:21:24.596Z"
  createdOn: "2025-10-06T07:56:42.366Z"
llmopsTags:
  - "classification"
  - "translation"
  - "data-cleaning"
  - "data-integration"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "model-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "evals"
  - "databases"
  - "mistral"
  - "open-source"
  - "openai"
industryTags: "e-commerce"
company: "Zoro UK"
summary: "Zoro UK, an e-commerce subsidiary of Grainger with 3.5 million products from 300+ suppliers, faced challenges normalizing and sorting product attributes across 75,000 different attribute types. Using DSPy (a framework for optimizing LLM prompts programmatically), they built a production system that automatically determines whether attributes require alpha-numeric sorting or semantic sorting. The solution employs a two-tier architecture: Mistral 8B for initial classification and GPT-4 for complex semantic sorting tasks. The DSPy approach eliminated manual prompt engineering, provided LLM-agnostic compatibility, and enabled automated prompt optimization using genetic algorithm-like iterations, resulting in improved product discoverability and search experience for their 1 million monthly active users."
link: "https://www.youtube.com/watch?v=_vGKSc1tekE"
year: 2025
seo:
  title: "Zoro UK: Product Attribute Normalization and Sorting Using DSPy for Large-Scale E-commerce - ZenML LLMOps Database"
  description: "Zoro UK, an e-commerce subsidiary of Grainger with 3.5 million products from 300+ suppliers, faced challenges normalizing and sorting product attributes across 75,000 different attribute types. Using DSPy (a framework for optimizing LLM prompts programmatically), they built a production system that automatically determines whether attributes require alpha-numeric sorting or semantic sorting. The solution employs a two-tier architecture: Mistral 8B for initial classification and GPT-4 for complex semantic sorting tasks. The DSPy approach eliminated manual prompt engineering, provided LLM-agnostic compatibility, and enabled automated prompt optimization using genetic algorithm-like iterations, resulting in improved product discoverability and search experience for their 1 million monthly active users."
  canonical: "https://www.zenml.io/llmops-database/product-attribute-normalization-and-sorting-using-dspy-for-large-scale-e-commerce"
  ogTitle: "Zoro UK: Product Attribute Normalization and Sorting Using DSPy for Large-Scale E-commerce - ZenML LLMOps Database"
  ogDescription: "Zoro UK, an e-commerce subsidiary of Grainger with 3.5 million products from 300+ suppliers, faced challenges normalizing and sorting product attributes across 75,000 different attribute types. Using DSPy (a framework for optimizing LLM prompts programmatically), they built a production system that automatically determines whether attributes require alpha-numeric sorting or semantic sorting. The solution employs a two-tier architecture: Mistral 8B for initial classification and GPT-4 for complex semantic sorting tasks. The DSPy approach eliminated manual prompt engineering, provided LLM-agnostic compatibility, and enabled automated prompt optimization using genetic algorithm-like iterations, resulting in improved product discoverability and search experience for their 1 million monthly active users."
---

## Overview

This case study presents the production implementation of DSPy (Demonstrate-Search-Predict framework) at Zoro UK, an e-commerce company that is a wholly-owned subsidiary of the US-based multinational Grainger. The speaker, a lead technical architect with a masters in AI who has been with the company for approximately 8 years since its founding, describes how they leveraged DSPy to solve critical product data normalization challenges. Zoro UK operates a substantial e-commerce platform with approximately 1 million monthly active users and manages a catalog of 3.5 million products sourced from over 300 suppliers.

The case study is particularly valuable because it combines both a personal project (Sanskrit text translation) that served as a learning vehicle and a production implementation at scale in an enterprise e-commerce context. The speaker provides candid insights into both the technical approach and the practical challenges of deploying LLM-based solutions in production environments.

## The Core Business Problem

The fundamental challenge facing Zoro UK relates to the inconsistency and lack of standardization in product attributes across their massive catalog. With products coming from 300+ different suppliers, the same attribute can be represented in vastly different formats. The speaker provides the concrete example of "function length" as a product attribute, which exists across approximately 2,500 products. Different suppliers might represent the same measurement as "25.4 mm" (all in one string), "25.4" with "mm" in a separate field, or "2 in" using imperial units. This inconsistency makes it extremely difficult to normalize data or provide good user experiences in search and filtering interfaces.

The company maintains over 75,000 different product attributes across their catalog, making manual normalization humanly intractable at scale. The business impact is significant because proper attribute normalization and sorting directly affects product discoverability. The speaker references Amazon's RAM filtering as an example of the desired experience—where products are organized in logical order (8GB, 16GB, etc.) allowing customers to easily navigate and compare options. Without proper sorting, the user experience degrades significantly, potentially impacting conversion rates and customer satisfaction.

## Introduction to DSPy Framework

Before diving into the production implementation, the speaker provides context on DSPy itself, outlining the eight-step methodology that the framework prescribes:

- **Define the task**: Clearly articulate what problem you're trying to solve with the LLM
- **Decide the pipeline**: Map out inputs, outputs, and the transformation pathway between them
- **Get examples ready**: Collect sample data representing the tasks you want the system to perform
- **Define your data**: Establish the dataset of defined examples that will be used
- **Define the metric**: This is emphasized as the most critical component—the quality of your metric directly determines the quality of your outcomes and evaluations
- **Zero-shot evaluation**: Run examples through the pipeline without any optimization to establish a baseline
- **Compile your optimizer**: Configure the optimization strategy for your specific task
- **Iterate**: Continuously refine with better metrics, examples, and configurations

The speaker emphasizes that the metric definition is "the most important part" where "everything about how you define the DSPy pipeline comes into picture." This foreshadows the challenges they would encounter in production implementation.

## Learning Case: Sanskrit Translation

To illustrate DSPy capabilities, the speaker first describes a personal project involving Sanskrit text translation for their website sanskritam.com, which collects Sanskrit scriptures. The challenge was obtaining translations for verses, with the additional goal of providing word-level translations inspired by quran.com's hover-to-translate functionality.

The speaker conducted three different evaluation approaches:

**Zero-shot evaluation**: Simply providing a Sanskrit verse with a prompt requesting translation, without any examples or optimization. This baseline achieved 51.7% accuracy against their defined metric.

**Few-shot evaluation**: Including 3-4 example verse-translation pairs in the prompt before presenting the new verse to translate. This approach achieved 70.0% accuracy, representing a substantial 18.3 percentage point improvement.

**MIPRO optimization**: Using DSPy's MIPRO (Multi-Prompt Instruction Proposal Optimizer) which automatically optimizes both the number of examples provided to the LLM and the prompt structure itself. With just 10 iterations (limited due to computational costs, as each iteration involves LLM calls), this achieved 71.5% accuracy, a modest 1.5 percentage point improvement over few-shot.

The speaker acknowledges that with more optimization iterations, MIPRO would likely show greater improvements, but computational costs constrained experimentation. This translation system was successfully deployed to add translations and explanations to verses on the Sanskrit website. Importantly, the speaker mentions using cosine similarity as the evaluation metric for this use case, acknowledging that more sophisticated metrics could be employed but finding this sufficient for the specific application.

## Production Implementation at Zoro UK

The production architecture for the product attribute normalization system demonstrates a pragmatic, cost-effective approach to deploying LLMs at scale:

### Architecture Components

The system begins with MongoDB as the primary database, which stores all product information including the problematic attributes. A scheduled sorting job periodically extracts all attribute values for a particular attribute type (like "function length") across the relevant products, aggregating similar attributes together.

These aggregated attributes are then sent to an "NLM Sort Service" (Natural Language Model Sort Service) which implements a two-tier decision architecture:

**Tier 1 - Classification with Mistral 8B**: The first decision point uses the smaller Mistral 8B model to determine whether a given attribute can be sorted alpha-numerically or requires semantic/logical sorting. For attributes like screw dimensions (e.g., "25.4mm", "2 in"), alpha-numeric sorting may be sufficient after unit normalization. However, for attributes like clothing sizes ("S", "M", "L", "XL"), alpha-numeric sorting would fail to capture the logical ordering.

**Tier 2 - Semantic Sorting with GPT-4**: When Mistral 8B determines that alpha-numeric sorting is insufficient, the request is routed to OpenAI's GPT-4, which performs semantic understanding and logical sorting of the attribute values. This two-tier approach optimizes costs by reserving the more expensive and capable GPT-4 for only the cases that require its advanced reasoning capabilities.

**Fallback to Python**: If alpha-numeric sorting is deemed sufficient, the system bypasses LLMs entirely and uses Python-based string sorting, which is essentially free computationally and extremely fast.

Once sorting is completed, the normalized and ordered attribute values are stored back into MongoDB, from which they are served to the front-end application for display in search filters and product comparison interfaces.

### DSPy-Specific Implementation Details

The speaker emphasizes several key advantages of using DSPy in this production context:

**Elimination of manual prompt engineering**: Rather than crafting and iteratively refining prompts by hand (a time-consuming and expertise-dependent process), DSPy automates prompt optimization. The framework programmatically explores the prompt space to find effective formulations.

**LLM agnosticism**: The team started with Mistral 8B for all use cases. When performance was insufficient for certain attribute types, they were able to switch to GPT-4 with minimal code changes—just recompiling the DSPy program with a different model configuration. This flexibility is crucial for production systems that need to balance cost, latency, and accuracy across diverse use cases.

**Multiple optimization strategies**: The framework supports various optimization approaches (zero-shot, few-shot, MIPRO, etc.), allowing teams to experiment and select the most appropriate strategy for each specific task.

**Trainer-student model paradigm**: DSPy supports using a larger, more capable LLM as a "trainer" that generates examples and feedback for fine-tuning or optimizing a smaller LLM. Crucially, this training only happens during the compilation phase, not in production inference, making it economically viable to leverage expensive models for optimization while deploying cheaper models for serving.

## Key Learnings and LLMOps Insights

The speaker shares several important lessons learned from production deployment:

### Metric Definition as Critical Bottleneck

The most challenging aspect of implementing DSPy is "figuring out what the metric needs to be." This isn't unique to DSPy but is central to any LLMOps implementation. The speaker describes a progression of metric complexity:

- **Simple string matching**: At the simplest level, metrics can be binary checks like "do these two strings match?"
- **Semantic similarity for text**: For more nuanced evaluation, techniques like cosine similarity between embeddings can assess whether generated text semantically matches expected output
- **LLM-as-judge**: At the most advanced level, another LLM or even another DSPy program can serve as an evaluator, essentially using AI to judge AI outputs

The choice of metric fundamentally determines what the optimization process optimizes for, making this a critical design decision that requires domain expertise and careful consideration of business objectives.

### DSPy is Not Neural Network Training

The speaker makes an important conceptual clarification that helps frame how to think about DSPy: "it's not really like a neural network." While both involve optimization and the term "tuning" is used, DSPy doesn't adjust neural network weights. Instead, the speaker frames it more like genetic algorithms—you have a population of candidate solutions (different prompt formulations, example selections, etc.), an optimization objective (your metric), and you iterate to find the best-fit solution through systematic exploration rather than gradient descent.

This mental model is important for practitioners because it sets appropriate expectations about how the system behaves, what kinds of debugging are possible, and how to approach troubleshooting when results are suboptimal.

### Community and Resources

The speaker highlights the DSPy Discord channel as "pretty resourceful," noting that Omar (presumably Omar Khattab, one of DSPy's creators at Stanford) actively participates and answers questions. This underscores the importance of community support in adopting emerging LLMOps frameworks. The speaker also mentions open-sourcing their Sanskrit translator on GitHub and curating an "awesome DSPy resources" list, contributing back to the community that supported their learning.

### Practical Deployment Considerations

While the speaker doesn't extensively discuss operational concerns like monitoring, error handling, or system reliability, several practical aspects emerge from the architecture description:

**Cost optimization through tiering**: The two-tier architecture (Mistral 8B → GPT-4 → Python fallback) represents a sophisticated approach to managing LLM inference costs at scale. By classifying requests and routing to the most cost-effective solution, the system avoids unnecessary use of expensive models.

**Batch processing approach**: The system uses scheduled jobs to process attribute sorting rather than real-time inference, which is appropriate for this use case where attribute normalization doesn't need immediate updates. This batch approach allows for better resource utilization and cost management.

**Separation of compilation and inference**: The emphasis on optimization happening during compilation rather than production inference is a key architectural principle that enables using expensive models for optimization while keeping inference costs manageable.

## Critical Assessment

While this case study offers valuable insights into production DSPy deployment, several aspects warrant balanced consideration:

**Limited quantitative results**: The speaker doesn't provide specific metrics for the production implementation at Zoro UK—no accuracy numbers, user satisfaction improvements, or business impact metrics are shared. While the Sanskrit translation example includes concrete numbers (51.7% → 70.0% → 71.5%), the production use case remains qualitatively described.

**Computational cost considerations**: The speaker acknowledges limiting MIPRO optimization to just 10 iterations due to costs but doesn't provide specifics on actual costs, latency requirements, or how these constraints influenced architectural decisions in production.

**Scalability questions**: While the system handles 3.5 million products and 75,000 attributes, the speaker doesn't detail how long sorting jobs take, how frequently they run, whether all attributes are processed or just a subset, or how the system handles new products and attributes arriving continuously.

**Error handling and edge cases**: There's no discussion of what happens when the system makes mistakes, how errors are detected and corrected, whether there's human-in-the-loop review, or how accuracy is monitored over time in production.

**Metric definition details**: While the speaker emphasizes metric definition as critical, they don't share details about what metric was actually used for the production sorting task, how it was validated, or how they determined it was appropriate.

**Alternative approaches not discussed**: The case study doesn't compare DSPy to alternative solutions like traditional NLP approaches, rule-based systems, or direct prompt engineering with LLMs, making it difficult to assess whether DSPy was uniquely suited to this problem or simply one viable approach among several.

## Significance for LLMOps Practice

Despite these limitations, this case study contributes several important insights to LLMOps practice:

**Framework-based prompt optimization**: It demonstrates that frameworks like DSPy can move prompt engineering from an art to a more systematic engineering discipline, with programmatic optimization replacing manual iteration.

**Hybrid architectures for cost management**: The multi-tier routing approach (small model → large model → classical computation) provides a practical pattern for managing costs while maintaining quality at scale.

**LLM agnosticism as a design principle**: Building systems that can swap underlying models with minimal code changes provides important flexibility as the LLM landscape evolves rapidly.

**Practical compromise between optimal and deployable**: The speaker's decision to limit optimization iterations due to cost, use "good enough" metrics like cosine similarity, and accept imperfect but useful results reflects the real-world tradeoffs inherent in production LLM systems.

The case study ultimately presents a pragmatic, production-grade implementation of emerging LLMOps frameworks in a real e-commerce context, offering both inspiration and cautionary lessons for practitioners building similar systems. The speaker's transparency about challenges and limitations, combined with practical architectural details, makes this a valuable contribution to the growing body of LLMOps knowledge, even if some claims about effectiveness would benefit from more rigorous quantitative validation.