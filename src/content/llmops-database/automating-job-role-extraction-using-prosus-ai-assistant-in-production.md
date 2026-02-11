---
title: "Automating Job Role Extraction Using Prosus AI Assistant in Production"
slug: "automating-job-role-extraction-using-prosus-ai-assistant-in-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3e36ca08d6db2f5934c3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:38:48.726Z"
  createdOn: "2024-11-21T14:05:42.167Z"
llmopsTags:
  - "classification"
  - "error-handling"
  - "langchain"
  - "microsoft-azure"
  - "monitoring"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "structured-output"
  - "system-prompts"
industryTags: "e-commerce"
company: "OLX"
summary: "OLX faced a challenge with unstructured job roles in their job listings platform, making it difficult for users to find relevant positions. They implemented a production solution using Prosus AI Assistant, a GenAI/LLM model, to automatically extract and standardize job roles from job listings. The system processes around 2,000 daily job updates, making approximately 4,000 API calls per day. Initial A/B testing showed positive uplift in most metrics, particularly in scenarios with fewer than 50 search results, though the high operational cost of ~15K per month has led them to consider transitioning to self-hosted models."
link: "https://tech.olx.com/extracting-job-roles-in-job-ads-a-journey-with-generative-ai-e8b8cf399659"
year: 2024
seo:
  title: "OLX: Automating Job Role Extraction Using Prosus AI Assistant in Production - ZenML LLMOps Database"
  description: "OLX faced a challenge with unstructured job roles in their job listings platform, making it difficult for users to find relevant positions. They implemented a production solution using Prosus AI Assistant, a GenAI/LLM model, to automatically extract and standardize job roles from job listings. The system processes around 2,000 daily job updates, making approximately 4,000 API calls per day. Initial A/B testing showed positive uplift in most metrics, particularly in scenarios with fewer than 50 search results, though the high operational cost of ~15K per month has led them to consider transitioning to self-hosted models."
  canonical: "https://www.zenml.io/llmops-database/automating-job-role-extraction-using-prosus-ai-assistant-in-production"
  ogTitle: "OLX: Automating Job Role Extraction Using Prosus AI Assistant in Production - ZenML LLMOps Database"
  ogDescription: "OLX faced a challenge with unstructured job roles in their job listings platform, making it difficult for users to find relevant positions. They implemented a production solution using Prosus AI Assistant, a GenAI/LLM model, to automatically extract and standardize job roles from job listings. The system processes around 2,000 daily job updates, making approximately 4,000 API calls per day. Initial A/B testing showed positive uplift in most metrics, particularly in scenarios with fewer than 50 search results, though the high operational cost of ~15K per month has led them to consider transitioning to self-hosted models."
---

## Overview

OLX, a global online marketplace, undertook a project to improve their job listings search experience by extracting structured job roles from unstructured job advertisement data. The core problem was that job roles were not clearly defined within their jobs taxonomies—instead, they were buried within ad titles and descriptions, making it difficult for job seekers to find relevant positions. This case study documents their journey from proof of concept through to production deployment, highlighting both the successes and the pragmatic cost considerations that come with using external LLM APIs at scale.

The solution leverages Prosus AI Assistant, an LLM service developed by Prosus (OLX's parent company, a global consumer internet group), which operates on top of OpenAI's infrastructure through a special agreement that includes enhanced privacy measures and a zero-day data retention policy. This case study is particularly instructive for teams considering the build-versus-buy decision for LLM capabilities in production systems.

## Technical Architecture and Pipeline Design

The job-role extraction system operates through a multi-stage pipeline that processes job advertisements to create structured, searchable job role data. The architecture integrates with OLX's existing infrastructure, particularly their search indexing system.

### Data Preprocessing

Before sending data to the LLM, the team implemented several preprocessing steps. They sampled 2,000 job ads for their proof of concept, accounting for uneven distribution across sub-categories to ensure representative coverage. The preprocessing pipeline includes text cleaning, trimming content to the first 200 words/tokens (to manage API costs and stay within token limits), and translation where necessary since the initial focus was on the Polish market.

### Search Keyword Analysis

A parallel analysis examined the most-searched keywords in the Jobs categories. Using the LLM, they categorized keywords into professions, job types, locations, and broader descriptors. This analysis revealed that approximately 60% of searched keywords relate to specific professions, validating the focus on job role extraction as a high-impact improvement area.

### Taxonomy Tree Generation

The team used a structured approach to generate normalized job-role taxonomies. This involved providing the LLM with up to 100 profession-related searched keywords and up to 50 job roles extracted from randomly selected job ads within each category. A carefully crafted prompt guided the model to produce hierarchical taxonomies considering both responsibilities and department structures. The prompt structure explicitly requested categorization with detailed instructions and specified output format requirements.

### Production Pipeline

The production implementation consists of two main operational modes:

- **Backfilling**: A comprehensive operation to process all existing ads retrospectively to extract and store job roles
- **Continuous Extraction**: Real-time processing of new and updated job ads to maintain current job-role data

A dedicated service subscribes to ad events and uses Prosus AI Assistant to extract job taxonomy information. The extracted job roles are then sent to AWS Kinesis, which feeds into the search team's indexing pipeline. The enriched data connects extracted job roles with other ad information like titles and parameters for search lookup.

## Prompt Engineering Practices

The team developed specific prompt engineering guidelines through their experimentation:

- **Specificity and Clarity**: Prompts are precisely defined to ensure the AI understands task nuances, avoiding ambiguity that could lead to inaccurate extractions
- **Context Provision**: Including job ad titles and descriptions significantly improved extraction accuracy
- **Token Limit Management**: Complex tasks are broken down strategically, and ad descriptions are trimmed to optimize API usage while maintaining effective communication
- **Balance of Specificity and Flexibility**: Prompts are specific enough for accurate results yet flexible enough to handle the diversity of job listings

The team also utilized the LangChain framework to streamline interactions with the LLM API, simplify outcome specifications, and chain tasks for enhanced efficiency.

## Resource Utilization and Scaling

In production, the system handles approximately 2,000 newly created or updated ads daily. The team made an architectural decision to break down the processing into two sub-tasks—job-role extraction and matching within the standardized tree—resulting in approximately 4,000 daily API requests to Prosus AI Assistant.

For taxonomy generation, the API request volume depends on the number of sub-categories and is only triggered when there are changes or updates to the category tree, which occurs at most a few times per month. This distinction between continuous extraction operations and periodic taxonomy regeneration is an important architectural consideration for managing costs and system complexity.

## Evaluation and Results

The team conducted A/B testing to evaluate the impact of the job-role extraction system, focusing on the retrieval stage of search (not yet integrated into search ranking). They acknowledged that significant results require time and designed their experiment with strategic segmentation, dividing results into low, medium, and high segments.

Key observations from the experiments include:
- Positive uplift in most metrics related to Successful Events (SE)
- A significant decrease in search extensions and keyword searches per user when results were fewer than 50, aligning with their hypothesis that improved role extraction would reduce the need for users to refine their searches
- While not all metrics reached statistical significance, observed patterns and confidence intervals indicated potential significance with additional data

The team was transparent about limitations—the impact currently resides only in the retrieval stage and is not yet integrated into search ranking, so improvements may not appear prominently in top results.

## Model Selection and Trade-offs

The decision to use Prosus AI Assistant over self-hosted LLMs was driven by several factors:

- **Accuracy**: Informal monitoring during annotation showed a low incidence of flaws when extracting job roles from descriptions, which aligns well with GenAI capabilities given that job ads predominantly focus on job-related content
- **Time-to-Market**: Using an existing API allowed for rapid deployment and immediate benefits
- **Privacy and Security**: Prosus's special agreement with OpenAI includes enhanced data handling measures and a zero-day data retention policy

The team acknowledged potential risks including slightly longer response times, dependency on external API availability, and questions about long-term viability. They positioned this as a strategic choice for rapid deployment while remaining open to exploring custom LLMs for future optimization.

## Cost Considerations and Future Direction

The case study provides valuable transparency about operational costs: approximately $15,000 per month for the Prosus AI Assistant service. This cost revelation prompted serious reflection on sustainability and efficiency for ongoing operations.

The team is now evaluating a pivot toward self-hosted models, which could offer:
- Lower long-term operational costs
- Ability to capture a broader range of information beyond just job roles
- More control over model fine-tuning and customization
- Independence from external API availability

This honest assessment of the economics of LLM operations is particularly valuable for teams planning production deployments. While external services can expedite exploration and proof-of-concept phases, long-term cost considerations often guide strategic decisions toward self-hosted alternatives.

## Handling System Evolution

A notable operational challenge is managing category evolution. As OLX's teams continuously improve job categories, changes can necessitate recreation of job-role taxonomies and potentially introduce inconsistencies between taxonomies created before and after sub-category changes.

The planned strategy involves implementing an automated process that detects changes in sub-categories and automatically regenerates necessary job-role taxonomies. This proactive approach ensures the extraction model remains aligned with the evolving job landscape without requiring manual intervention.

## Key Takeaways for LLMOps Practitioners

This case study illustrates several important LLMOps principles:
- The importance of preprocessing and token management for cost control
- Strategic task decomposition to optimize API usage
- The value of A/B testing for validating LLM-powered features in production
- Honest cost assessment and the build-versus-buy decision for long-term sustainability
- The need for automated systems to handle taxonomy and category evolution
- Leveraging frameworks like LangChain for efficient LLM interactions

The OLX team's transparency about both successes and challenges—including the significant monthly costs that are prompting reconsideration of their approach—provides realistic guidance for teams implementing similar LLM-powered extraction systems in production environments.