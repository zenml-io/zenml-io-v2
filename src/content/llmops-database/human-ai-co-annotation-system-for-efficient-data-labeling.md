---
title: "Human-AI Co-Annotation System for Efficient Data Labeling"
slug: "human-ai-co-annotation-system-for-efficient-data-labeling"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6791ff843156ec1c8f7bde73"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:57:35.380Z"
  createdOn: "2025-01-23T08:36:20.068Z"
llmopsTags:
  - "data-cleaning"
  - "multi-modality"
  - "unstructured-data"
  - "data-analysis"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "wandb"
  - "fastapi"
  - "openai"
industryTags: "tech"
company: "Appen"
summary: "Appen developed a hybrid approach combining LLMs with human annotators to address the growing challenges in data annotation for AI models. They implemented a co-annotation engine that uses model uncertainty metrics to efficiently route annotation tasks between LLMs and human annotators. Using GPT-3.5 Turbo for initial annotations and entropy-based confidence scoring, they achieved 87% accuracy while reducing costs by 62% and annotation time by 63% compared to purely human annotation, demonstrating an effective balance between automation and human expertise."
link: "https://www.youtube.com/watch?v=ZLOHQLyJs58&list=PLlcxuf1qTrwBGJBE0nVbAs0fbNLHidJaN&index=6"
year: 2024
seo:
  title: "Appen: Human-AI Co-Annotation System for Efficient Data Labeling - ZenML LLMOps Database"
  description: "Appen developed a hybrid approach combining LLMs with human annotators to address the growing challenges in data annotation for AI models. They implemented a co-annotation engine that uses model uncertainty metrics to efficiently route annotation tasks between LLMs and human annotators. Using GPT-3.5 Turbo for initial annotations and entropy-based confidence scoring, they achieved 87% accuracy while reducing costs by 62% and annotation time by 63% compared to purely human annotation, demonstrating an effective balance between automation and human expertise."
  canonical: "https://www.zenml.io/llmops-database/human-ai-co-annotation-system-for-efficient-data-labeling"
  ogTitle: "Appen: Human-AI Co-Annotation System for Efficient Data Labeling - ZenML LLMOps Database"
  ogDescription: "Appen developed a hybrid approach combining LLMs with human annotators to address the growing challenges in data annotation for AI models. They implemented a co-annotation engine that uses model uncertainty metrics to efficiently route annotation tasks between LLMs and human annotators. Using GPT-3.5 Turbo for initial annotations and entropy-based confidence scoring, they achieved 87% accuracy while reducing costs by 62% and annotation time by 63% compared to purely human annotation, demonstrating an effective balance between automation and human expertise."
---

## Overview

This case study, presented by Jeff Leaport, an Applied AI Solutions Architect at Appen, explores how the company has developed strategies for combining human intelligence with large language models (LLMs) to improve annotation cost-effectiveness and quality. Appen is a company specializing in developing high-quality datasets for training AI and ML models, with a global crowd of over one million contributors across 235 languages. The presentation was delivered at an MLOps World event and provides both research insights into the current state of AI data annotation and a practical case study demonstrating the benefits of human-AI co-annotation.

The core thesis of the presentation is that while generative AI adoption has surged (177% increase in 2024), the percentage of AI projects making it to deployment has actually dropped by over 8% since 2021. Appen's research suggests that data management has become the biggest bottleneck, with a 10 percentage point increase in reported challenges from 2023 to 2024. This creates a compelling need for more efficient and scalable data annotation approaches that can meet the growing demands of generative AI development.

## The Data Challenge for LLM Development

The presentation draws an important distinction between the data requirements for traditional ML models versus LLMs and customized LLMs. Traditional AI/ML models (prediction, recommendation systems) rely on structured data with specific attributes. Large language models require massive-scale ingestion of diverse, unstructured data where quality and accuracy are exceptionally important. Customized LLMs (such as those used in RAG applications) often work with a mix of unstructured documents like PDFs, charts, and diagrams, where understanding context during labeling presents significant challenges.

Appen's survey data reveals that average data accuracy has dropped approximately 9 percentage points since 2021, potentially due to the increasing complexity of AI systems and their corresponding annotation requirements. These requirements demand domain-specific knowledge and expertise across large datasets, along with robust quality control mechanisms.

## LLM Capabilities and Limitations for Annotation

The presentation provides a balanced assessment of where LLMs excel and where they struggle in data annotation tasks. LLMs perform well on labeling well-structured text-based data, repetitive annotation tasks, sentiment analysis, keyword identification, and assigning predefined tags. However, they struggle with complex language involving ambiguity, nuance, context, or cultural references, tasks requiring deep domain knowledge, complex annotations requiring problem-solving or multi-step reasoning, and there are risks associated with recursively training models on their own generated data.

This nuanced understanding of LLM capabilities informs Appen's co-annotation strategy, which aims to leverage the strengths of both LLMs and human annotators.

## The Co-Annotation Architecture

Appen's human-AI co-annotation strategy is built around several key components. The workflow begins with a dataset to be labeled, ground truth data serving as few-shot examples, and business objectives that dictate annotation criteria. These elements feed into what Appen calls a "co-annotation engine," which routes work based on several factors including business goals, experimentation results, and model performance.

A critical innovation in this approach is the use of uncertainty quantification as a routing mechanism. Appen uses entropy as a metric for calculating LLM annotation performance. Predictions with low entropy (high confidence) can pass directly to output, while high entropy predictions are routed to human review. The presentation explicitly notes that self-reported confidence scores from models are not consistently reliable predictors of annotation quality, making external uncertainty measurement important.

For a practical example, the presentation describes an experiment with 1,000 utterances where GPT-3.5 Turbo was tasked with categorization using five different prompt variations. The uncertainty was measured by evaluating the variability across these different predictions. If all outputs agreed on a category, uncertainty was low; if outputs varied (e.g., returning different categories like "holidays," "violence," "sensitive targeting"), uncertainty was high. Accuracy was validated against ground truth labels annotated by subject matter experts, with exact category matches used as the success metric.

## Cost-Quality Tradeoff Analysis

The presentation provides concrete metrics on the cost-quality tradeoff. At a lower uncertainty threshold (less than 30%), the combined human-LLM approach achieved 87% accuracy, which is described as competitive with full human annotation at 95% while optimizing for cost and time. As the uncertainty threshold decreases, more data is flagged for human review, preserving accuracy but increasing costs.

The economic analysis is compelling: LLM annotation costs less than one cent per row while human annotation costs 45 cents per row. LLMs require approximately 8 seconds per annotation compared to 180 seconds for humans. Using the co-annotation approach, labor time decreased from 150 hours to 55 hours (a 63% reduction), and costs dropped from $450 to $169 (a 62% reduction).

The presentation emphasizes that tuning an appropriate uncertainty threshold is key for achieving acceptable accuracy while minimizing cost and time. This creates a configurable system where organizations can adjust their risk tolerance based on their specific quality requirements.

## Model Mate: Platform Integration

Appen has productized their co-annotation approach through a feature called "Model Mate" within their ADAP (AI Data Platform). This feature allows users to connect to one or multiple LLMs of their choice at any step in their annotation task design. The platform supports various data types including text, image, audio, video, and specialized formats like geospatial data.

Model Mate enables several use cases demonstrated in the presentation. For pre-annotation, on page load, task contents (queries, resulting content, images) are sent to a multimodal model to generate predictions that contributors can use as reference. For domain-specific assistance, the feature helps with complex tasks like science and math data annotation, including LaTeX formatting. For adversarial testing, it can generate random harmful topics for red teamers doing adversarial prompting to test model safety. For code review, it automates diff checking for code excerpts, saving significant SME time.

The integration is done through CML (presumably a configuration markup language) and allows for multiple models within a single job design, enabling sophisticated workflows where different models can serve different purposes.

## Case Study: US Electronics Company

The most concrete evidence of the approach's effectiveness comes from a case study with a "leading US electronics company" focused on search relevance data. The client needed to enhance the accuracy of their search relevance data with a scalable and cost-effective solution, targeting 95% balanced accuracy across different task components.

The implementation used Model Mate powered by GPT-4o (a multimodal LLM) to provide real-time suggestions by analyzing search queries, resulting product titles, and product images. Annotation guidelines were streamlined and provided to the model for context. Experienced contributors with search relevance backgrounds ensured quality and consistency.

The results showed significant improvements. There was a 3-4 percentage point increase across three different task components. When contributors had access to both LLM labels and explanations, accuracy rose to 94%, up from 90% without assistance. Importantly, when the LLM predictions were correct, contributors achieved higher accuracy rates, indicating the human-LLM agreement boosts quality. Perhaps most notably, when LLM labels were incorrect, human accuracy remained unaffected, countering common concerns about LLM errors degrading human annotation quality.

## Quality Assurance Recommendations

The presentation includes several quality assurance recommendations for production deployments. For units that don't meet the quality threshold, multiple judgments per unit should be collected to reach agreement. For units with high confidence (low entropy) that pass the threshold, at least a sample or subsample should be reviewed by humans to ensure consistency. Finalized annotation data can be fed back as ground truth or few-shot examples to improve model performance, creating a continuous improvement loop.

## Critical Assessment

While the presentation makes a strong case for human-AI co-annotation, it's worth noting some limitations. The specific accuracy figures and cost savings are from Appen's internal research and a single case study, so generalizability to other domains and use cases may vary. The presentation comes from a company selling annotation services, so there's an inherent incentive to present favorable results. The uncertainty-based routing approach, while principled, requires careful tuning and may not work equally well across all annotation tasks. The presentation also doesn't deeply address the infrastructure requirements, latency considerations, or potential failure modes of integrating LLMs into annotation workflows.

That said, the approach represents a pragmatic middle ground between fully automated and fully manual annotation, acknowledging both the capabilities and limitations of current LLM technology while providing concrete metrics on the cost-quality tradeoffs involved. The finding that human accuracy isn't degraded by incorrect LLM suggestions is particularly valuable for production deployments where LLM errors are inevitable.