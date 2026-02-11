---
title: "Productionizing LLM-Powered Data Governance with LangChain and LangSmith"
slug: "productionizing-llm-powered-data-governance-with-langchain-and-langsmith"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3de9caacd7efe9297fbe"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:36:32.233Z"
  createdOn: "2024-11-21T14:04:25.967Z"
llmopsTags:
  - "classification"
  - "compliance"
  - "data-cleaning"
  - "data-integration"
  - "error-handling"
  - "guardrails"
  - "langchain"
  - "latency-optimization"
  - "microsoft-azure"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "system-prompts"
industryTags: "tech"
company: "Grab"
summary: "Grab enhanced their LLM-powered data governance system (Metasense V2) by improving model performance and operational efficiency. The team tackled challenges in data classification by splitting complex tasks, optimizing prompts, and implementing LangChain and LangSmith frameworks. These improvements led to reduced misclassification rates, better collaboration between teams, and streamlined prompt experimentation and deployment processes while maintaining robust monitoring and safety measures."
link: "https://engineering.grab.com/metasense-v2"
year: 2024
seo:
  title: "Grab: Productionizing LLM-Powered Data Governance with LangChain and LangSmith - ZenML LLMOps Database"
  description: "Grab enhanced their LLM-powered data governance system (Metasense V2) by improving model performance and operational efficiency. The team tackled challenges in data classification by splitting complex tasks, optimizing prompts, and implementing LangChain and LangSmith frameworks. These improvements led to reduced misclassification rates, better collaboration between teams, and streamlined prompt experimentation and deployment processes while maintaining robust monitoring and safety measures."
  canonical: "https://www.zenml.io/llmops-database/productionizing-llm-powered-data-governance-with-langchain-and-langsmith"
  ogTitle: "Grab: Productionizing LLM-Powered Data Governance with LangChain and LangSmith - ZenML LLMOps Database"
  ogDescription: "Grab enhanced their LLM-powered data governance system (Metasense V2) by improving model performance and operational efficiency. The team tackled challenges in data classification by splitting complex tasks, optimizing prompts, and implementing LangChain and LangSmith frameworks. These improvements led to reduced misclassification rates, better collaboration between teams, and streamlined prompt experimentation and deployment processes while maintaining robust monitoring and safety measures."
---

## Overview

Grab, the leading superapp platform in Southeast Asia providing ride-hailing, food delivery, and various on-demand services, developed an LLM-powered system called Metasense to automate data governance and classification across their enterprise data lake. This case study documents the second iteration of the system (Metasense V2), focusing on improvements made after the initial rollout and the productionisation journey of an LLM-based classification system at enterprise scale.

The core problem Grab faced was the challenge of classifying data entities for governance purposes. Their internal metadata generation service, Gemini, relied on third-party data classification services that had restrictions on customisation and required significant resources to train custom models. The LLM-based approach offered a more affordable and flexible alternative that could scale across the organization.

## Initial System and Scale

The first version of the system was launched in early 2024 and initially scanned more than 20,000 data entries at an average rate of 300-400 entities per day. The system performed column-level tag classifications, which when combined with Grab's data privacy rules, determined sensitivity tiers of data entities. Since launch, the model has grown to cover the vast majority of Grab's data lake tables, significantly reducing manual classification workload.

It's worth noting that despite automation, the data pipeline still requires human verification from data owners to prevent misclassifications. This is a practical acknowledgment that critical ML workflows, especially in governance contexts, cannot entirely eliminate human oversight—a mature perspective on LLMOps that balances efficiency with risk management.

## Model Improvement Through Prompt Engineering

After deployment, the team accumulated substantial feedback from table owners and combined this with manual classifications from the Data Governance Office to create training and testing datasets for model improvements. This post-deployment data collection strategy is a key LLMOps practice that enables continuous model refinement.

The team identified several challenging edge cases that the initial model struggled with:

- Business email columns containing Personal Identifiable Information (PII) when individuals use personal email addresses with legal names
- Nested JSON structures occasionally containing personal names, phone numbers, and email addresses hidden among non-PII metadata
- Passenger communications mentioning legal names, phone numbers, and other PII despite most content being non-PII

The team hypothesized that the core issue was model capacity—when given high volumes of classification tasks simultaneously, the model's effectiveness degraded. The original prompt required the model to distinguish between 21 tags, with 13 of them aimed at differentiating types of non-PII data, which distracted from the primary task of identifying PII.

To address these capacity issues, the team implemented several prompt engineering strategies:

- **Task decomposition**: Split the model into two parts—one for PII tags and another for all other tag types. This follows the principle of breaking complex tasks into smaller, more manageable sub-tasks.
- **Tag reduction**: Reduced the number of tags from 21 to 8 for the PII classification portion by removing all non-PII tags, simplifying the differentiation task.
- **Prompt conciseness**: Reduced the word count in the prompt from 1,254 to 737 words, using clearer and more concise language while removing unnecessary detail.
- **Input chunking**: Tables with more than 150 columns are split into smaller tables, ensuring the LLM has sufficient capacity to focus on each column.

These improvements demonstrate practical prompt engineering techniques for production LLM systems, particularly the recognition that LLMs have limited attention capacity and that thoughtful task design can significantly improve accuracy.

## Tooling and Infrastructure: LangChain and LangSmith Adoption

A significant aspect of the Metasense V2 productionisation was the adoption of LangChain and LangSmith frameworks. This upgrade was motivated by the need to enable rapid experimentation with prompt versions and facilitate collaboration among a diverse team of data scientists and engineers.

**LangChain** was adopted to streamline the process from raw input to desired outcome by chaining interoperable components. The new backend leverages LangChain to construct an updated model supporting both PII and non-PII classification tasks.

**LangSmith** serves as the unified DevOps platform for the LLM workflow, enabling collaboration among product managers, data scientists, and software engineers. The integration provides several operational benefits:

- **Streamlined prompt optimization**: Data scientists can create, update, and evaluate prompts directly on the LangSmith user interface and save them in commit mode. For deployment, prompt identifiers in service configurations can be easily adjusted, enabling rapid iteration.
- **Transparent performance metrics**: LangSmith's evaluation capabilities allow the team to run evaluations on datasets and obtain performance metrics across multiple dimensions including accuracy, latency, and error rate.
- **Dataset management**: Managing evaluation datasets on LangSmith provides clear visibility into prompt performance across multiple custom metrics.

This tooling choice reflects a broader LLMOps trend toward specialized platforms that bridge the gap between experimentation and production deployment.

## Monitoring and Quality Assurance

The case study emphasizes ongoing quality assurance as a critical component of production LLM systems. Despite achieving "exceptionally low misclassification rates," the team has implemented several safety measures:

- **Periodic monitoring alerts**: Alerts are set up to monitor misclassification rates on a regular basis
- **Threshold-based alarms**: Internal alarms trigger if misclassification rates cross defined thresholds
- **Improvement protocols**: A model improvement protocol is established for responding to alarms

This approach demonstrates mature LLMOps thinking—acknowledging that even high-performing models can degrade over time and that proactive monitoring is essential for maintaining quality in perpetuity.

## Practical Considerations and Balanced Assessment

While the case study presents largely positive outcomes, there are several practical considerations worth noting:

The system still requires human verification, indicating that full automation of sensitive classification tasks remains challenging even with LLM improvements. This is a realistic acknowledgment that LLMs, while powerful, are not infallible for critical governance decisions.

The specific misclassification rates and accuracy improvements are not quantified in the case study, making it difficult to assess the precise impact of the improvements. Terms like "exceptionally low misclassification rates" are somewhat vague.

The adoption of LangChain and LangSmith represents a strategic choice toward third-party tooling for LLMOps, which offers benefits in collaboration and rapid deployment but also introduces dependencies on external platforms.

The approach of splitting complex classification tasks and reducing prompt length are practical techniques that other organizations can apply. The recognition that LLM capacity is limited and must be managed through thoughtful task design is a valuable insight for production LLM systems.

## Key LLMOps Lessons

The Metasense V2 case study offers several transferable lessons for LLMOps practitioners:

- Post-deployment data collection and user feedback are essential for continuous model improvement
- Model capacity management through task decomposition and prompt simplification can significantly improve classification accuracy
- Collaboration tooling like LangSmith can accelerate the experimentation-to-deployment cycle
- Monitoring and alerting infrastructure is essential even for well-performing LLM systems
- Human oversight remains important for high-stakes classification tasks, and systems should be designed to support rather than replace human judgment
- Input chunking strategies (such as splitting large tables) can help manage LLM context limitations

The system represents a practical example of LLM-powered automation at enterprise scale, with thoughtful attention to the operational challenges of deploying and maintaining LLM systems in production environments.