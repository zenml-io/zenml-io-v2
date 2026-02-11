---
title: "Automated Evaluation Framework for LLM-Powered Features"
slug: "automated-evaluation-framework-for-llm-powered-features"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f405ccde8495fec161250"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:41:55.242Z"
  createdOn: "2024-11-21T14:14:52.672Z"
llmopsTags:
  - "cost-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "guardrails"
  - "human-in-the-loop"
  - "latency-optimization"
  - "microsoft-azure"
  - "monitoring"
  - "prompt-engineering"
  - "question-answering"
  - "reliability"
  - "scalability"
  - "summarization"
  - "wandb"
industryTags: "tech"
company: "Slack"
summary: "Slack's machine learning team developed a comprehensive evaluation framework for their LLM-powered features, including message summarization and natural language search. They implemented a three-tiered evaluation approach using golden sets, validation sets, and A/B testing, combined with automated quality metrics to assess various aspects like hallucination detection and system integration. This framework enabled rapid prototyping and continuous improvement of their generative AI products while maintaining quality standards."
link: "https://www.youtube.com/watch?v=F5t2XJaSpVY"
year: 2024
seo:
  title: "Slack: Automated Evaluation Framework for LLM-Powered Features - ZenML LLMOps Database"
  description: "Slack's machine learning team developed a comprehensive evaluation framework for their LLM-powered features, including message summarization and natural language search. They implemented a three-tiered evaluation approach using golden sets, validation sets, and A/B testing, combined with automated quality metrics to assess various aspects like hallucination detection and system integration. This framework enabled rapid prototyping and continuous improvement of their generative AI products while maintaining quality standards."
  canonical: "https://www.zenml.io/llmops-database/automated-evaluation-framework-for-llm-powered-features"
  ogTitle: "Slack: Automated Evaluation Framework for LLM-Powered Features - ZenML LLMOps Database"
  ogDescription: "Slack's machine learning team developed a comprehensive evaluation framework for their LLM-powered features, including message summarization and natural language search. They implemented a three-tiered evaluation approach using golden sets, validation sets, and A/B testing, combined with automated quality metrics to assess various aspects like hallucination detection and system integration. This framework enabled rapid prototyping and continuous improvement of their generative AI products while maintaining quality standards."
---

## Overview

This case study comes from a presentation by Austin, a Staff Software Engineer on Slack's machine learning modeling team, discussing how they evaluate and improve their generative AI products in production. The presentation was part of an MLOps community event and focuses on the critical challenge of measuring LLM output quality at enterprise scale. The core thesis is that without proper measurement of LLM outputs, it becomes nearly impossible to systematically improve them—a fundamental LLMOps principle.

Slack is building generative AI capabilities around two primary use cases: message summarization (allowing users to get summaries of channels, threads, or time periods) and natural language search (a question-answer system where users can ask questions in the search bar and receive LLM-generated responses). These are production systems used by millions of users, making reliable evaluation absolutely essential.

## The Evaluation Challenge

Austin articulates why evaluating LLM outputs is fundamentally difficult, which represents one of the core challenges in LLMOps today. The team has identified several key obstacles:

**Subjectivity in Quality**: What constitutes a "good" summary varies significantly between users. Some users prefer short, concise bullet-point summaries, while others want comprehensive coverage that eliminates the need to read original messages. Both approaches could be considered correct, making traditional binary evaluation metrics insufficient. This subjectivity extends to question-answering as well, where user expectations and context play crucial roles.

**Objective Quality Dimensions**: Beyond subjectivity, there are measurable quality aspects that need evaluation, including accuracy (is the information correct?), coherence (does it flow well with proper grammar?), and relevance (does the response actually address the user's query?). These represent more tractable problems but still require careful metric design.

**Scale Requirements**: Each user experience is unique and random—you cannot simply develop ten examples, evaluate against those, and consider the job done. This creates a catch-22 situation where without proper evaluation at scale, teams cannot confidently drive incremental improvements to their products.

## Breaking Down Quality Metrics

A key insight from Slack's approach is decomposing broad quality concepts into smaller, more specific and measurable sub-problems. The presentation emphasizes that research has shown more specific evaluation measures lead to better evaluation outcomes. Rather than trying to capture "hallucinations" as a monolithic category, they break it into subcategories relevant to their specific products:

**Extrinsic Hallucinations**: Detecting when the LLM generates text that goes beyond the provided context, pulling from its underlying knowledge base when it should only be using supplied information. This is particularly important for summarization where the model should only reflect what was actually said in the messages.

**Citation Accuracy**: In question-answer systems, the model might provide a correct answer but cite the wrong message or reference. This prevents users from being able to verify information or explore further—a subtle but important quality dimension.

**Slack-Specific Formatting**: The team has developed metrics for integration with the broader Slack ecosystem, including checking for correctly formatted user IDs, channel IDs, and message IDs. This ensures that LLM outputs can properly link to and integrate with other Slack features.

## Technical Approaches to Evaluation

Slack employs multiple technical approaches to implement their quality metrics at different scales:

**LLM-as-Judge**: Using large language models as evaluators is a common approach, but Austin notes the practical challenge that these models require significant compute resources. This can limit the scale at which evaluation can be performed. They use sampling techniques to get representative quality scores without evaluating every single output.

**Natural Language Inference (NLI) Modeling**: For higher-scale evaluation needs, they employ NLI models to answer specific quality questions. These models are typically smaller and faster than full LLMs, allowing them to run evaluations at production scale. This is a practical trade-off between evaluation sophistication and computational efficiency.

**Composite Quality Scores**: Individual metrics are combined to generate either composite scores or broken-down quality scores for different generative products. This allows teams to understand overall quality while still being able to diagnose specific problem areas.

## Staged Evaluation Process

A particularly valuable aspect of Slack's LLMOps practice is their staged evaluation approach, which provides gates at different points in the development cycle:

**Golden Set Evaluation**: A very small sample of Slack messages where engineers can see both the underlying data and resulting outputs (summaries or responses). This enables rapid prototyping and debugging. The ability to inspect raw data makes this invaluable for development, though the small size limits statistical significance.

**Validation Set Evaluation**: A much larger sample, typically 100-500 examples, that is more representative of production traffic. Engineers cannot see the underlying data at this stage (likely for privacy reasons), but rely on automated quality metrics to understand whether changes are driving improvements. This stage provides more confidence before moving to production.

**A/B Testing**: The final evaluation stage uses their quality metrics during live experiments to understand whether changes drive actual product improvements. This is the ultimate test of whether automated metrics correlate with real user value.

This staged approach creates what Austin describes as a "stage gate" system that enables "failing fast"—teams can quickly prototype many different approaches and only push forward those that show promise according to their quality metrics. This is a key principle in production ML systems where experimentation velocity matters.

## Practical Results

The presentation includes a concrete example of their evaluation framework in action. When introducing extractive summarization as a preprocessing technique for handling extremely large context sizes, the team was able to use their automated quality metrics to demonstrate measurable impacts. Specifically, they showed improvements in format capabilities and overall user experience, though Austin also notes they identified quality trade-offs in some dimensions. This kind of nuanced, multi-dimensional quality assessment is what enables informed product decisions.

## Key Takeaways and Broader Context

Austin emphasizes two main takeaways: First, evaluation is essential for driving incremental improvements—without measurement, improvement is guesswork. Second, standardizing the development cycle with built-in prototyping and fail-fast capabilities enables teams to build progressively better products.

The presentation also connects to a broader community survey on LLM evaluation practices, highlighting that this is an active area of learning across the industry. The moderator emphasizes the importance of "thinking in systems, not in models"—evaluation shouldn't just focus on model outputs in isolation but on whether the complete system drives value for users.

This case study represents a mature approach to LLMOps evaluation that balances theoretical rigor with practical constraints. The staged evaluation process, the decomposition of quality into specific measurable dimensions, and the use of multiple evaluation techniques at different scales all represent patterns that other organizations building LLM products can learn from. However, it's worth noting that the specific metrics and thresholds are not disclosed, and the actual effectiveness of their automated metrics in predicting user satisfaction is not quantitatively demonstrated in this presentation.