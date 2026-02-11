---
title: "Implementing Product Comparison and Discovery Features with LLMs at Scale"
slug: "implementing-product-comparison-and-discovery-features-with-llms-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "679c8bb2d82401d6875f1403"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:06.091Z"
  createdOn: "2025-01-31T08:37:06.093Z"
llmopsTags:
  - "question-answering"
  - "structured-output"
  - "chatbot"
  - "prompt-engineering"
  - "rag"
  - "error-handling"
  - "human-in-the-loop"
  - "monitoring"
  - "fastapi"
  - "amazon-aws"
  - "anthropic"
  - "openai"
industryTags: "e-commerce"
company: "idealo"
summary: "idealo, a major European price comparison platform, implemented LLM-powered features to enhance product comparison and discovery. They developed two key applications: an intelligent product comparison tool that extracts and compares relevant attributes from extensive product specifications, and a guided product finder that helps users navigate complex product categories. The company focused on using LLMs as language interfaces rather than knowledge bases, relying on proprietary data to prevent hallucinations. They implemented thorough evaluation frameworks and A/B testing to measure business impact."
link: "https://www.youtube.com/watch?v=q8a9hDwXLCI"
year: 2023
seo:
  title: "idealo: Implementing Product Comparison and Discovery Features with LLMs at Scale - ZenML LLMOps Database"
  description: "idealo, a major European price comparison platform, implemented LLM-powered features to enhance product comparison and discovery. They developed two key applications: an intelligent product comparison tool that extracts and compares relevant attributes from extensive product specifications, and a guided product finder that helps users navigate complex product categories. The company focused on using LLMs as language interfaces rather than knowledge bases, relying on proprietary data to prevent hallucinations. They implemented thorough evaluation frameworks and A/B testing to measure business impact."
  canonical: "https://www.zenml.io/llmops-database/implementing-product-comparison-and-discovery-features-with-llms-at-scale"
  ogTitle: "idealo: Implementing Product Comparison and Discovery Features with LLMs at Scale - ZenML LLMOps Database"
  ogDescription: "idealo, a major European price comparison platform, implemented LLM-powered features to enhance product comparison and discovery. They developed two key applications: an intelligent product comparison tool that extracts and compares relevant attributes from extensive product specifications, and a guided product finder that helps users navigate complex product categories. The company focused on using LLMs as language interfaces rather than knowledge bases, relying on proprietary data to prevent hallucinations. They implemented thorough evaluation frameworks and A/B testing to measure business impact."
---

## Overview

This case study comes from a conference presentation by Christopher, the lead machine learning engineer at idealo, a major European price comparison website operating in six countries with Germany as its largest market. The platform aggregates over 4 million products and 500 million offers from more than 50,000 shops, ranging from major marketplaces like Amazon and eBay to local retailers. The presentation focuses on practical lessons learned from integrating large language models into production product development, offering three key learnings distilled from their experience.

The speaker provides valuable context by positioning generative AI within the technology hype cycle, arguing that as of the presentation, the industry has moved past the peak of inflated expectations and is entering the "trough of disillusionment" where organizations are realizing that creating genuine business value from generative AI is harder than initially anticipated. This honest assessment sets the stage for practical, grounded advice rather than hype-driven recommendations.

## Key Learning 1: Focus on User Needs and LLM Strengths

The first and perhaps most fundamental lesson emphasizes the importance of starting with user problems rather than technology capabilities. When ChatGPT emerged, there was significant pressure from management to "do something" with AI, and the obvious answer seemed to be building a shopping chatbot assistant. However, after prototyping and user testing, the team discovered that their users didn't actually want a chat interface—they didn't want to type, didn't want to read lengthy text responses, and had short attention spans that made conversational interfaces suboptimal.

This experience reinforced the importance of mapping LLM capabilities to genuine user needs rather than forcing technology into products. The team developed a structured approach where they:

- Identified core LLM abilities (language understanding, summarization, converting natural language to structured formats)
- Mapped these abilities to specific user problems and opportunities
- Prioritized use cases based on three dimensions: degree of LLM leverage, potential business impact, and feasibility/visibility

The emphasis on rapid prototyping is notable. The team used tools like AWS Bedrock's playground environment for quick experimentation, enabling even product managers to test concepts without coding. Once feasibility was established through quick prototypes, they moved to MVP development and aggressive user testing, including showing prototypes to conference attendees for immediate feedback.

### Production Example: Product Comparison Tables

One successful production application addresses the user need to quickly compare similar products. On a product page for an Apple iPad, users face a daunting task: comparing 60-70 product attributes between multiple product versions is cognitively overwhelming and causes users to leave the site. The LLM-powered solution:

- Extracts the most relevant 6-7 attributes from the full list of 70+ specifications for a specific comparison context
- Intelligently selects attributes that matter for the particular products being compared (e.g., weight for tablets, which might not be obvious but is actually relevant to users)
- Highlights differences and understands value judgments (e.g., lower weight is preferable for tablets, higher camera resolution is better)

This approach leverages the LLM's language understanding and world knowledge about product preferences without requiring a manually maintained rule-based system that would be difficult to scale and maintain across millions of products.

## Key Learning 2: Treat LLMs as Language Interfaces, Not Knowledge Databases

This architectural insight is crucial for production reliability. Rather than relying on the LLM's general world knowledge (which can lead to hallucinations), idealo treats LLMs as language interfaces that operate on their proprietary data. The speaker draws a parallel to ChatGPT's SearchGPT feature, where the model generates answers based on retrieved web search results rather than its parametric knowledge.

This approach directly addresses trust and hallucination concerns. Users don't yet trust AI systems for important purchasing decisions where real money is at stake, and convincing hallucinations could severely damage that trust.

### Production Example: Guided Product Finder

The team developed a guided shopping experience for category pages (demonstrated with tumble dryers). The problem: users face an overwhelming list of filters (manufacturer, energy efficiency, various specifications) and don't know how to begin narrowing down results. Paradoxically, idealo has excellent expert content ("Ratgeber") at the bottom of these pages, but users rarely scroll down to find it.

The solution uses LLMs as an interface to this expert content, creating an interactive question-and-answer flow that guides users through product selection. The prompting architecture involves multiple chained prompts:

- **Next Consideration Prompt**: Takes the expert content as context and determines what question should be asked next to narrow down results (e.g., "What type of tumble dryer are you looking for?")
- **Filter Mapping Prompt**: Translates the conceptual answer (e.g., "dryer type") to the actual filter options available on the page (e.g., "product_type" filter with specific values)
- **Question Generation Prompt**: Creates user-friendly questions and answer options based on the mapped filters

This RAG-like pattern (using proprietary data as context rather than relying on world knowledge) significantly reduces hallucination risk while leveraging the LLM's natural language generation capabilities.

## Key Learning 3: Evaluation is Critical and Often Neglected

The speaker emphasizes that evaluation should be established as a first principle before significant development effort begins, not as an afterthought. This is particularly challenging with generative AI because outputs are often "fuzzy"—how do you measure the quality of a generated question or the relevance of answer options?

The team has found that evaluation consistently becomes the bottleneck when scaling prototypes to production. They recommend investing as much development effort into evaluation frameworks as into the solution itself.

### Evaluation Techniques

The presentation outlines several evaluation approaches used at idealo:

- **Rule-based evaluation**: For structured outputs like product comparison tables, simple rules can verify that actual product values appear correctly in the generated comparison
- **Traditional ML metrics**: For tasks resembling named entity recognition, precision and recall metrics remain applicable
- **LLM-as-Judge**: For fuzzier outputs like the product finder, they use another LLM to evaluate the primary model's outputs, prompting it to assess quality, relevance, instruction-following, and hallucination

The speaker is notably candid about the limitations of LLM-as-Judge approaches, quoting external research that it "works to some degree but is definitely not a silver bullet." Significant effort is required to tune evaluation prompts to make them genuinely useful.

An example evaluation prompt structure was shared for the product comparison use case, where the evaluator LLM receives:
- All product attributes used to create the comparison table
- The original prompt used to generate the table
- Instructions to identify severe errors and explain potential corrections

### Hallucination Testing and Model Selection

During development of the product comparison feature, the team conducted extensive manual review of hundreds of examples to build confidence in hallucination rates. This process also revealed meaningful differences between models—Claude 2 had notable hallucination issues, but Claude 2.1 showed measurable improvement that matched community reports, demonstrating the value of systematic evaluation.

While they acknowledge there's "no guarantee" of zero hallucinations, the combination of grounding in proprietary data and extensive testing has given them high confidence levels for production deployment.

## Production Infrastructure and Practices

Several production-oriented practices emerge from the presentation:

- **AWS Bedrock** is the primary platform for LLM access, though they note similar capabilities exist with OpenAI and other providers
- **Structured output formats** are described as essential (would have been a "fourth key learning")—all LLM outputs use JSON or XML schemas for downstream integration
- **JSON Mode and strict schema enforcement** are used with OpenAI models, while Anthropic's Claude is noted as slightly behind on strict schema adherence but "almost 100% accurate"
- **A/B testing** is used to measure production impact, with features deployed to variants while control groups see the original experience, measuring business KPIs including bounce rate and conversion rates
- **Live production deployment**: The guided product finder is actively deployed in an A/B test on idealo's German website

## Balanced Assessment

The presentation offers a refreshingly honest view of LLM deployment challenges. The speaker explicitly acknowledges that creating business value from generative AI is "a lot harder than a lot of people thought" and positions their learnings as ways to accelerate the journey from hype to productivity.

Key strengths of their approach include the emphasis on user validation before committing to solutions, the pragmatic RAG-like architecture that mitigates hallucination risk, and the acknowledgment that evaluation frameworks require substantial investment.

Areas that could use more detail include specific metrics on business impact (referenced as being measured but not shared), infrastructure costs and latency considerations for production LLM calls, and the team structure and organizational support required for these initiatives.

The case study demonstrates mature LLMOps thinking: focus on measurable user value, architect for reliability by constraining the LLM's scope, and invest heavily in evaluation infrastructure to enable confident iteration and deployment.