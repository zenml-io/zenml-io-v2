---
title: "Scaling AI Product Development with Rigorous Evaluation and Observability"
slug: "scaling-ai-product-development-with-rigorous-evaluation-and-observability"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68762eb2365570ac16907c74"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:14:14.283Z"
  createdOn: "2025-07-15T10:34:26.718Z"
llmopsTags:
  - "document-processing"
  - "content-moderation"
  - "question-answering"
  - "summarization"
  - "chatbot"
  - "data-analysis"
  - "structured-output"
  - "multi-modality"
  - "unstructured-data"
  - "realtime-application"
  - "poc"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "cost-optimization"
  - "chunking"
  - "system-prompts"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "sqlite"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "langchain"
  - "llama-index"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "wandb"
  - "openai"
  - "anthropic"
  - "meta"
  - "google-gcp"
  - "amazon-aws"
  - "microsoft-azure"
  - "hugging-face"
  - "nvidia"
industryTags: "tech"
company: "Notion"
summary: "Notion AI, serving over 100 million users with multiple AI features including meeting notes, enterprise search, and deep research tools, demonstrates how rigorous evaluation and observability practices are essential for scaling AI product development. The company uses Brain Trust as their evaluation platform to manage the complexity of supporting multilingual workspaces, rapid model switching, and maintaining product polish while building at the speed of AI industry innovation. Their approach emphasizes that 90% of AI development time should be spent on evaluation and observability rather than prompting, with specialized data specialists creating targeted datasets and custom LLM-as-a-judge scoring functions to ensure consistent quality across their diverse AI product suite."
link: "https://www.youtube.com/watch?v=6YdPI9YbjbI"
year: 2025
seo:
  title: "Notion: Scaling AI Product Development with Rigorous Evaluation and Observability - ZenML LLMOps Database"
  description: "Notion AI, serving over 100 million users with multiple AI features including meeting notes, enterprise search, and deep research tools, demonstrates how rigorous evaluation and observability practices are essential for scaling AI product development. The company uses Brain Trust as their evaluation platform to manage the complexity of supporting multilingual workspaces, rapid model switching, and maintaining product polish while building at the speed of AI industry innovation. Their approach emphasizes that 90% of AI development time should be spent on evaluation and observability rather than prompting, with specialized data specialists creating targeted datasets and custom LLM-as-a-judge scoring functions to ensure consistent quality across their diverse AI product suite."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-product-development-with-rigorous-evaluation-and-observability"
  ogTitle: "Notion: Scaling AI Product Development with Rigorous Evaluation and Observability - ZenML LLMOps Database"
  ogDescription: "Notion AI, serving over 100 million users with multiple AI features including meeting notes, enterprise search, and deep research tools, demonstrates how rigorous evaluation and observability practices are essential for scaling AI product development. The company uses Brain Trust as their evaluation platform to manage the complexity of supporting multilingual workspaces, rapid model switching, and maintaining product polish while building at the speed of AI industry innovation. Their approach emphasizes that 90% of AI development time should be spent on evaluation and observability rather than prompting, with specialized data specialists creating targeted datasets and custom LLM-as-a-judge scoring functions to ensure consistent quality across their diverse AI product suite."
---

## Overview

Notion AI represents a comprehensive case study in scaling AI product development for a connected workspace platform serving over 100 million users. Led by Sarah, the head of Notion AI, the company has built a sophisticated suite of AI features including meeting notes with speech-to-text transcription, enterprise search capabilities, and deep research tools with agentic capabilities. What makes this case study particularly compelling is Notion's approach to maintaining product polish and reliability while operating at the rapid pace of AI industry innovation.

The core philosophy driving Notion's AI development is that rigorous evaluation and observability form the foundation of successful AI products. As Sarah emphasizes, the team spends approximately 10% of their time on prompting and 90% on evaluation, iteration, and observability. This distribution reflects a mature understanding that the real challenge in AI product development lies not in getting something to work once, but in ensuring it works consistently and reliably for diverse user scenarios.

## Technical Architecture and Infrastructure

Notion's AI infrastructure is built for rapid model switching and experimentation. The company partners with multiple foundation model providers while also fine-tuning their own models. A key technical achievement is their ability to integrate new models into production within less than a day of release, which requires sophisticated evaluation infrastructure to ensure no regressions occur during model transitions.

The company uses Brain Trust as their primary evaluation platform, which has become integral to their development workflow. Brain Trust provides them with the ability to create targeted datasets, implement custom scoring functions, and maintain observability across their production AI systems. This platform choice reflects their need for a solution that can handle the scale and complexity of their operations while supporting both technical and non-technical team members.

Their architecture supports modular prompt management, where different prompts can be assigned to different models based on performance characteristics. For example, when a new model like Nano is released, they can quickly evaluate which high-frequency, low-reasoning tasks it performs well on and switch those specific prompts to the more cost-effective model while maintaining performance standards.

## Evaluation Methodology

Notion has developed a sophisticated evaluation methodology centered around custom LLM-as-a-judge systems. Unlike generic evaluation approaches, they create specific evaluation prompts for individual elements in their datasets. Instead of having a single prompt that judges everything generically, they write targeted prompts that specify exactly what each output should contain, how it should be formatted, and what rules it should follow.

This approach is particularly effective for their search evaluation system, where the underlying index is constantly changing. Rather than maintaining static golden datasets that quickly become outdated, they create evaluation prompts that specify criteria like "the first result should be the most recent element about the Q1 offsite." This allows their evaluation system to remain current and accurate even as their knowledge base evolves.

The company employs specialized data specialists who function as a hybrid between product managers, data analysts, and data annotators. These specialists are responsible for creating handcrafted datasets from logs and production usage, ensuring that evaluation data is structured properly and reflects real-world usage patterns. This role is crucial for maintaining the quality and relevance of their evaluation systems.

## Multilingual Challenges and Solutions

One of the most significant challenges Notion faces is supporting a user base where 60% of enterprise users are non-English speakers, while 100% of their AI engineering team speaks English. This creates a fundamental disconnect that requires rigorous evaluation to bridge. Their solution involves creating specialized evaluation datasets for multilingual scenarios and implementing scoring functions that can assess language-switching contexts.

For example, they maintain datasets that test scenarios where users might ask questions in Japanese but expect responses in English, or vice versa. These evaluation scenarios are curated based on real usage patterns from enterprise customers like Toyota, where multilingual workflows are common. The evaluation system helps them ensure that their AI products work correctly across different language contexts without requiring the engineering team to have native proficiency in all supported languages.

## Production Observability and Feedback Loops

Notion's production observability system is designed to capture and utilize user feedback effectively. They implement thumbs up/down feedback mechanisms and use this data to create targeted evaluation datasets. However, they've learned that thumbs up data is not particularly useful for evaluation purposes, as there's no consistency in what makes users approve of responses. Thumbs down data, conversely, provides valuable signals about functionality that needs improvement.

Their observability system tracks not just user feedback but also comprehensive metrics about model performance, cost, latency, and token usage. This data feeds into their evaluation pipelines and helps inform decisions about model selection and prompt optimization. The system is designed to support both reactive debugging of specific issues and proactive monitoring of overall system health.

## Model Selection and Cost Optimization

The company has developed sophisticated processes for model selection and cost optimization. When new models are released, they run comprehensive evaluations across their existing prompt library to identify which prompts perform well with the new model. This allows them to optimize costs by using more efficient models for appropriate tasks while maintaining quality standards.

Their modular infrastructure means they can make granular decisions about model assignments. For instance, if a high-frequency feature like database autofill would cost millions of dollars more to run on a premium model during an outage, they have predetermined fallback mechanisms that automatically switch to cost-effective alternatives without compromising critical functionality.

## Human-in-the-Loop Processes

Notion implements comprehensive human-in-the-loop processes that involve multiple stakeholders beyond just engineers. Product managers, designers, and data specialists all participate in the evaluation process through the Brain Trust platform. This collaborative approach ensures that evaluation criteria align with user needs and business objectives, not just technical performance metrics.

The company has developed workflows where human evaluators can review AI outputs, provide annotations, and contribute to dataset creation. These human insights are particularly valuable for establishing ground truth in complex scenarios and for calibrating their LLM-as-a-judge systems. The human evaluation process is designed to be scalable and efficient, allowing subject matter experts to focus on the most challenging or ambiguous cases.

## Scaling Challenges and Solutions

As Notion's AI products have evolved from simple content generation to complex agentic workflows, they've had to adapt their evaluation and observability practices accordingly. Their latest products, including the deep research tool, represent a shift from workflow-based AI to reasoning-capable agents that can select appropriate tools and spend variable amounts of time on different tasks.

This evolution has required more sophisticated evaluation approaches that can assess not just final outputs but also the reasoning processes and tool selection decisions made by their AI systems. They've developed evaluation frameworks that can trace through multi-step agent workflows and assess performance at each stage of the process.

## Lessons Learned and Best Practices

Several key lessons emerge from Notion's approach to LLMOps. First, the importance of investing heavily in evaluation infrastructure from the beginning rather than treating it as an afterthought. Second, the value of custom, targeted evaluation approaches over generic scoring methods. Third, the critical role of human expertise in creating meaningful evaluation criteria and datasets.

The company has learned that evaluation criteria must be regularly updated and refined based on real usage patterns and user feedback. They've also discovered that having non-technical stakeholders actively participate in the evaluation process leads to better alignment between technical performance and user satisfaction.

## Future Directions and Innovations

Notion continues to innovate in their LLMOps practices, exploring automated prompt optimization and more sophisticated evaluation methodologies. They're investigating ways to automatically generate evaluation datasets and improve the calibration of their LLM-as-a-judge systems. The company is also working on better integration between their offline evaluation processes and online production monitoring to create more seamless feedback loops.

Their approach to LLMOps represents a mature understanding of the challenges involved in scaling AI products for millions of users while maintaining quality and reliability. The emphasis on evaluation, observability, and human-in-the-loop processes provides a valuable framework for other organizations looking to implement similar practices in their own AI product development efforts.