---
title: "Collaborative Prompt Engineering Platform for Production LLM Development"
slug: "collaborative-prompt-engineering-platform-for-production-llm-development"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67b2f8bf7e4c28d7ec4d1e3e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:00:41.251Z"
  createdOn: "2025-02-17T08:52:15.444Z"
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "structured-output"
  - "prompt-engineering"
  - "system-prompts"
  - "error-handling"
  - "human-in-the-loop"
  - "kubernetes"
  - "docker"
  - "langchain"
  - "microservices"
  - "cicd"
  - "databases"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn developed a collaborative prompt engineering platform using Jupyter Notebooks to bridge the gap between technical and non-technical teams in developing LLM-powered features. The platform enabled rapid prototyping and testing of prompts, with built-in access to test data and external APIs, leading to successful deployment of features like AccountIQ which reduced company research time from two hours to five minutes. The solution addressed challenges in LLM configuration management, prompt template handling, and cross-functional collaboration while maintaining production-grade quality."
link: "https://www.linkedin.com/blog/engineering/product-design/building-collaborative-prompt-engineering-playgrounds-using-jupyter-notebook"
year: 2025
seo:
  title: "LinkedIn: Collaborative Prompt Engineering Platform for Production LLM Development - ZenML LLMOps Database"
  description: "LinkedIn developed a collaborative prompt engineering platform using Jupyter Notebooks to bridge the gap between technical and non-technical teams in developing LLM-powered features. The platform enabled rapid prototyping and testing of prompts, with built-in access to test data and external APIs, leading to successful deployment of features like AccountIQ which reduced company research time from two hours to five minutes. The solution addressed challenges in LLM configuration management, prompt template handling, and cross-functional collaboration while maintaining production-grade quality."
  canonical: "https://www.zenml.io/llmops-database/collaborative-prompt-engineering-platform-for-production-llm-development"
  ogTitle: "LinkedIn: Collaborative Prompt Engineering Platform for Production LLM Development - ZenML LLMOps Database"
  ogDescription: "LinkedIn developed a collaborative prompt engineering platform using Jupyter Notebooks to bridge the gap between technical and non-technical teams in developing LLM-powered features. The platform enabled rapid prototyping and testing of prompts, with built-in access to test data and external APIs, leading to successful deployment of features like AccountIQ which reduced company research time from two hours to five minutes. The solution addressed challenges in LLM configuration management, prompt template handling, and cross-functional collaboration while maintaining production-grade quality."
---

## Overview

LinkedIn's engineering team developed a collaborative prompt engineering framework to support the creation and iteration of LLM-powered features within LinkedIn Sales Navigator. The primary use case highlighted is AccountIQ, a feature that automates company research for sales professionals, reducing the time required from approximately two hours of manual research to just five minutes. This case study focuses on the operational and collaboration challenges of developing production-ready LLM features and how LinkedIn addressed them through an innovative approach using Jupyter Notebooks as collaborative prompt engineering playgrounds.

The core problem LinkedIn faced was the disconnect between rapid technical prototyping by engineers and the domain expertise held by non-technical team members such as sales specialists and product managers. For LLM-based features to be effective, prompt engineering requires tight feedback loops and real-time collaboration between these groups. Traditional development workflows were too slow and created barriers for non-technical contributors who needed to influence prompt design and testing.

## Technical Architecture

LinkedIn's solution centers on a Python backend service that powers all LLM-based features in Sales Navigator. The architecture uses LangChain as the orchestration framework to manage the flow of operations including data fetching, transformation, prompt preparation, and LLM invocation. All prompts are managed as Jinja templates, which support placeholders for dynamic value injection based on context.

Each use case within the system is mapped to a specific chain in LangChain. These chains accept input parameters as dictionaries of strings and generate responses. The service exposes a gRPC endpoint that accepts input parameters along with metadata such as use-case identifiers. When invoked, the corresponding chain executes and returns the generated response. For example, the AccountIQ feature for generating revenue insights takes input parameters like company name, website, description, and other attributes, and uses the LLM along with external tools like Bing Search API to generate specific insights about the company's revenue situation.

## Prompt Management and Template System

A critical aspect of the LLMOps approach here is the management of prompt templates. LinkedIn stores prompts as Jinja templates that support placeholder values which are dynamically computed and replaced based on context. For AccountIQ, the context includes company name, description, industry, website, company posts, and data from external sources like public SEC information.

This templating approach allows prompts to be tested against different companies without manual value replacement, which would be impractical at scale. When testing prompts, users can specify a target company and the system automatically loads the appropriate templates, fetches the required data, and populates the placeholders.

The case study also emphasizes that prompt engineering often requires testing not just individual prompts in isolation, but entire chains of prompts working together. LangChain provides the orchestration framework to handle these multi-prompt workflows, ensuring that the testing environment accurately reflects production behavior.

## Jupyter Notebook Integration

The central innovation in this case study is the use of Jupyter Notebooks as collaborative prompt engineering playgrounds. LinkedIn added support to launch Jupyter Notebooks directly from their Python code repository. Users can clone the repository, build the code, and launch notebooks in a browser or IDE with a single command.

These notebooks have full access to all Python code and libraries in the repository, with dependencies managed and resolved automatically during build. This means that users can access the chains, invoke them with test data, and observe responses all from within the notebook environment. Crucially, the chains behave identically on local machines as they do in production environments, ensuring that prompt engineering work accurately reflects real-world behavior.

Engineers set up notebooks for specific use cases, save them to the code repository, and make them available to the broader team. Other team members can then use those notebooks, modify prompt files (Jinja templates) or code, run the chains, and observe the effects of their changes immediately. Both notebooks and test data files reside in the same code repository, ensuring that changes require code reviews before being merged, maintaining quality control.

## Test Data Management

High-quality test data is essential for effective prompt engineering. LinkedIn emphasizes that test datasets should be representative of real-world scenarios and diverse in nature. For AccountIQ, this means test data should include comprehensive company information (name, description, industry, website, posts) and represent a mix of companies across different industries, sizes, countries, and ownership structures (public vs. private).

The team has implemented several approaches to test data management. Engineers can query data from LinkedIn's data lake using Trino and have created custom magic commands (like `%%sql` for Trino SQL queries) to simplify common tasks. Test data collection is not a one-time task; the data is sampled regularly to maintain freshness.

The case study also addresses the challenge of external data sources. Some LLM operations require real-time data from external sources based on dynamic LLM outputs. For example, AccountIQ uses Bing Search APIs to perform web searches for specific company information. Since the search queries are generated dynamically by the LLM, results cannot be pre-cached and must be accessed in real-time. The framework automates this process during prompt engineering sessions.

LinkedIn also notes that they have implemented privacy-enhancing processes and techniques to protect against personal information appearing in test datasets, acknowledging the sensitivity of the data involved.

## Containerized Development Environment

To make the prompt engineering playgrounds accessible to all team members regardless of technical background, LinkedIn leverages containerization through their internal remote development platform. With just a few commands, team members can launch remote build containers with code repositories pre-fetched and pre-built. They can connect to these containers via terminal or IDEs like VS Code or IntelliJ, launch the notebooks, and immediately begin working on prompts.

Any changes made to prompt files can be committed to the internal GitHub repository, versioned, and deployed to production through the standard deployment pipeline. Since the containers run on internal servers, other company employees can access the notebooks remotely when connected to the company VPN. This has enabled LinkedIn's Sales team members to directly access the prompt engineering playground, facilitating live prompt engineering sessions where engineers can observe how end users tweak prompts and interact with the system.

## Continuous Feedback and Improvement

The case study describes a continuous feedback loop enabled by this architecture. As users interact with the production features, LinkedIn samples real usage data through tracking. This data helps the team understand actual usage patterns and allows them to update test datasets accordingly. This feedback loop supports continuous improvement of the features over time.

The approach enables cross-functional teams to collaborate on prompt iteration within days rather than weeks, with changes visible interactively and instantly. This builds confidence early in the development cycle and involves internal users in testing and providing feedback on direction. As feedback comes in, engineers can focus on optimizing prompt structure, orchestration of multiple prompts, and integration with production products for subsequent testing stages.

## LLMOps Considerations and Challenges

The case study acknowledges several inherent challenges in developing production LLM features. LLMs are non-deterministic by nature and generate varied content, making quality control at scale extremely challenging. This requires innovative approaches to validation, iteration, and quality control that differ significantly from traditional software development.

The team had to address the complexity of LLM configurations, including the need to support different model providers (OpenAI, internal models, open-source models like Llama) while ensuring everyone on the team uses the same baseline configuration for valid output comparisons. The notebook-based approach helps standardize these configurations across the team.

## Results and Assessment

LinkedIn claims that AccountIQ achieved significant product-market fit and demonstrates the potential of LLM-driven enhancements. The headline metric is reducing company research time from two hours to five minutes. However, the case study is primarily focused on the development methodology rather than detailed production metrics.

The collaborative prompt engineering approach appears to have successfully broken down barriers between technical and non-technical team members, enabling rapid experimentation and speeding up product development. The framework provides a reusable solution for engineers to set up custom prompt engineering playgrounds for various use cases, suggesting organizational learning and efficiency gains beyond the initial AccountIQ implementation.

It's worth noting that this case study comes directly from LinkedIn's engineering blog and naturally presents their approach in a positive light. While the technical architecture and collaboration approach described are sound and address real challenges in LLMOps, independent validation of the claimed benefits would strengthen the case. The approach does align with industry best practices for collaborative AI development and addresses genuine pain points in cross-functional LLM feature development.