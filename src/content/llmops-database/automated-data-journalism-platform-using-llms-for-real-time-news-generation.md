---
title: "Automated Data Journalism Platform Using LLMs for Real-time News Generation"
slug: "automated-data-journalism-platform-using-llms-for-real-time-news-generation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6777fbd6d956e4e3aa913b20"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:51:47.592Z"
  createdOn: "2025-01-03T15:01:42.020Z"
llmopsTags:
  - "data-analysis"
  - "structured-output"
  - "data-integration"
  - "visualization"
  - "realtime-application"
  - "prompt-engineering"
  - "error-handling"
  - "system-prompts"
  - "fastapi"
  - "cicd"
  - "documentation"
  - "guardrails"
  - "openai"
industryTags: "media-entertainment"
company: "Realtime"
summary: "Realtime built an automated data journalism platform that uses LLMs to generate news stories from continuously updated datasets and news articles. The system processes raw data sources, performs statistical analysis, and employs GPT-4 Turbo to generate contextual summaries and headlines. The platform successfully automates routine data journalism tasks while maintaining transparency about AI usage and implementing safeguards against common LLM pitfalls."
link: "https://generative-ai-newsroom.com/we-built-a-news-site-powered-by-llms-and-public-data-heres-what-we-learned-aba6c52a7ee4"
year: 2024
seo:
  title: "Realtime: Automated Data Journalism Platform Using LLMs for Real-time News Generation - ZenML LLMOps Database"
  description: "Realtime built an automated data journalism platform that uses LLMs to generate news stories from continuously updated datasets and news articles. The system processes raw data sources, performs statistical analysis, and employs GPT-4 Turbo to generate contextual summaries and headlines. The platform successfully automates routine data journalism tasks while maintaining transparency about AI usage and implementing safeguards against common LLM pitfalls."
  canonical: "https://www.zenml.io/llmops-database/automated-data-journalism-platform-using-llms-for-real-time-news-generation"
  ogTitle: "Realtime: Automated Data Journalism Platform Using LLMs for Real-time News Generation - ZenML LLMOps Database"
  ogDescription: "Realtime built an automated data journalism platform that uses LLMs to generate news stories from continuously updated datasets and news articles. The system processes raw data sources, performs statistical analysis, and employs GPT-4 Turbo to generate contextual summaries and headlines. The platform successfully automates routine data journalism tasks while maintaining transparency about AI usage and implementing safeguards against common LLM pitfalls."
---

## Overview

Realtime is a news site that leverages large language models (LLMs) and public data to automate the creation of data-driven journalism. The project aims to solve a fundamental challenge in modern journalism: the growing volume and velocity of data makes it increasingly difficult for data journalists to keep up with meaningful updates across important datasets like economic indicators, political polls, environmental metrics, and sports odds. Rather than replacing journalists, the stated goal is to automate rote analytical work so human reporters can focus on deeper investigative pieces.

The case study is notable for its transparency about both the capabilities and limitations of LLMs in a production setting. The authors explicitly acknowledge that "LLMs are fallible and still in their infancy" and detail the extensive work required to reduce errors through careful prompting and data preparation. This balanced perspective makes it a valuable reference for understanding real-world LLMOps challenges in content generation applications.

## System Architecture and Data Pipeline

The foundation of Realtime's system is a robust data ingestion pipeline that continuously monitors multiple data sources for updates. Since most data providers don't offer push notifications when new data is published, the team built a polling system that regularly queries sources and performs a diff operation to identify new information. This pipeline runs on a distributed cloud platform and can be configured per-data-feed to avoid unnecessary update checks.

A key architectural decision was ensuring that the data pipeline normalizes all incoming data into a consistent format, regardless of the original source structure. This standardization is crucial for enabling the downstream LLM processing to work consistently across diverse data types. The system also integrates with a newswire service (NewsAPI) to retrieve recent articles relevant to each dataset, providing contextual information for the generated stories.

## LLM Integration and Prompt Engineering

The core LLM component uses GPT-4 Turbo from OpenAI to generate headlines, subheadings, and descriptive text based on data updates. The prompt construction is dynamic and incorporates three main inputs: dataset metadata (title, description, and contextual information), latest data features (quantitative summaries of recent changes), and recent related news articles.

One of the most significant operational lessons the team shares is the value of multi-stage LLM calls rather than attempting to accomplish everything in a single prompt. Breaking tasks into multiple sequential calls showed "significant performance improvements" compared to asking the model to handle multiple responsibilities simultaneously. The trade-off is increased API costs, but tools like DSPy from Stanford are noted as helping to build more efficient multi-stage pipelines.

The team developed a custom annotation system where the LLM adds markup to its generated text. This markup allows references to specific data points or news articles to be rendered as interactive elements on the website, enabling readers to verify claims against source material. This is a clever approach to building transparency into the output format itself.

A crucial prompt engineering challenge was preventing the LLM from making false causal claims. The authors note that "the LLM really wanted to make exciting headlines that had a clear cause and effect narrative" - a tendency that could lead to misleading journalism. They addressed this through explicit prompt instructions forbidding statements like "data went up X% because of news story Y" when no causal relationship has been established. Additional LLM calls serve as guardrails against predictable error types including causation misattribution, mathematical errors (confusing percent change with percentage point change), and semantic confusion.

## Data Format Optimization

An interesting operational insight concerns the format used to pass data to the LLM. The team found that human-readable formats like YAML outperform more syntactically dense formats like JSON for LLM consumption. The additional characters in JSON (curly braces, quotation marks, etc.) represent "extra noise for the LLM" that doesn't aid comprehension. This suggests that optimizing prompt content for human readability also benefits LLM processing, which has implications for how production systems should serialize data for LLM contexts.

## Structured Output Generation

The system leverages LLMs' ability to generate structured data in defined formats. For headline generation, the model returns a JSON object with specific fields including headline, subhead, featured dataset ID, relevant timespan, and annotated summary text. This structured approach enables programmatic integration with the visualization layer (built on Vega and Vega-Lite) and story ranking algorithms.

The ranking system that determines homepage placement considers relative magnitude of data changes, recency of updates, and volume of related news headlines - a hybrid approach that blends statistical significance with news relevance.

## Cost Management Considerations

Cost emerged as a significant operational concern. While individual API calls are relatively inexpensive, costs compound at scale. The team made a critical architectural decision to ensure that LLM costs remain invariant to website traffic - meaning generation happens on data updates, not user requests. This decouples compute costs from audience size, which is essential for sustainable operations.

The authors express optimism that costs will decrease due to competitive pressure in the LLM market, and note that open-source models offer cheaper alternatives but currently cannot match proprietary model accuracy. This reflects a common LLMOps trade-off between cost and quality.

## Transparency and Editorial Standards

A notable aspect of Realtime's approach is their commitment to transparency about AI-generated content. They advocate treating readers with respect by clearly indicating when text is AI-generated and providing mechanisms for readers to verify accuracy - specifically by displaying data visualizations alongside generated text and linking to source news articles.

The system also includes a style guide enforcement step where generated text is passed back through the LLM to check for wording inconsistencies and errors that don't follow from the input data. This self-review pattern represents a form of automated quality assurance.

## Limitations and Honest Assessment

The case study is refreshingly candid about limitations. The authors explicitly state they've "taken pains in our prompting and data preparation to reduce errors, but we readily acknowledge that mistakes happen." They frame the project as an ongoing learning experience in a field where "very few people are truly experts."

The core insight that "garbage in, garbage out" still applies is emphasized - the utility of the system derives substantially from the work done to curate clean, consistently updating datasets and news feeds. The LLM layer, while powerful, is only as good as its inputs.

## Production Lessons Summary

The ten lessons shared cover practical LLMOps territory: the importance of transparency with users about AI usage, the foundational role of data quality, the benefits of breaking complex tasks into multiple LLM calls, cost management strategies, data format optimization (preferring human-readable formats like YAML), constraining LLM output to prevent hallucination and logical fallacies, customizing tone through creative prompting, leveraging structured output capabilities, knowledge sharing in a nascent field, and the value of experimentation.

Overall, this case study provides a grounded perspective on deploying LLMs for automated content generation, acknowledging both genuine utility and real limitations while sharing operational lessons that transfer to other production LLM applications.