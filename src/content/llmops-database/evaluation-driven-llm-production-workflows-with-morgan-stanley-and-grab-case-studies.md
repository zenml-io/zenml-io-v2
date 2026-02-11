---
title: "Evaluation-Driven LLM Production Workflows with Morgan Stanley and Grab Case Studies"
slug: "evaluation-driven-llm-production-workflows-with-morgan-stanley-and-grab-case-studies"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6847fa600e9c72b1ea72c321"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:11:00.538Z"
  createdOn: "2025-06-10T09:26:56.903Z"
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "classification"
  - "structured-output"
  - "multi-modality"
  - "unstructured-data"
  - "high-stakes-application"
  - "rag"
  - "embeddings"
  - "fine-tuning"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "instruction-tuning"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "cicd"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "elasticsearch"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "wandb"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI's applied evaluation team presented best practices for implementing LLMs in production through two case studies: Morgan Stanley's internal document search system for financial advisors and Grab's computer vision system for Southeast Asian mapping. Both companies started with simple evaluation frameworks using just 5 initial test cases, then progressively scaled their evaluation systems while maintaining CI/CD integration. Morgan Stanley improved their RAG system's document recall from 20% to 80% through iterative evaluation and optimization, while Grab developed sophisticated vision fine-tuning capabilities for recognizing road signs and lane counts in Southeast Asian contexts. The key insight was that effective evaluation systems enable rapid iteration cycles and clear communication between teams and external partners like OpenAI for model improvement."
link: "https://www.youtube.com/watch?v=9haxoY4qMNA"
year: 2025
seo:
  title: "OpenAI: Evaluation-Driven LLM Production Workflows with Morgan Stanley and Grab Case Studies - ZenML LLMOps Database"
  description: "OpenAI's applied evaluation team presented best practices for implementing LLMs in production through two case studies: Morgan Stanley's internal document search system for financial advisors and Grab's computer vision system for Southeast Asian mapping. Both companies started with simple evaluation frameworks using just 5 initial test cases, then progressively scaled their evaluation systems while maintaining CI/CD integration. Morgan Stanley improved their RAG system's document recall from 20% to 80% through iterative evaluation and optimization, while Grab developed sophisticated vision fine-tuning capabilities for recognizing road signs and lane counts in Southeast Asian contexts. The key insight was that effective evaluation systems enable rapid iteration cycles and clear communication between teams and external partners like OpenAI for model improvement."
  canonical: "https://www.zenml.io/llmops-database/evaluation-driven-llm-production-workflows-with-morgan-stanley-and-grab-case-studies"
  ogTitle: "OpenAI: Evaluation-Driven LLM Production Workflows with Morgan Stanley and Grab Case Studies - ZenML LLMOps Database"
  ogDescription: "OpenAI's applied evaluation team presented best practices for implementing LLMs in production through two case studies: Morgan Stanley's internal document search system for financial advisors and Grab's computer vision system for Southeast Asian mapping. Both companies started with simple evaluation frameworks using just 5 initial test cases, then progressively scaled their evaluation systems while maintaining CI/CD integration. Morgan Stanley improved their RAG system's document recall from 20% to 80% through iterative evaluation and optimization, while Grab developed sophisticated vision fine-tuning capabilities for recognizing road signs and lane counts in Southeast Asian contexts. The key insight was that effective evaluation systems enable rapid iteration cycles and clear communication between teams and external partners like OpenAI for model improvement."
---

This case study presents OpenAI's perspective on evaluation-driven LLMOps practices through two detailed customer implementations, featuring Jim from OpenAI's model customization team discussing real-world deployment patterns and evaluation strategies.

**Morgan Stanley Internal Document Search System**

Morgan Stanley implemented one of OpenAI's early partnership cases involving an internal chat application designed to search and summarize their proprietary financial documents for analysts and advisors. The system needed to provide up-to-date market intelligence by querying Morgan Stanley's extensive document corpus and delivering relevant insights to support client advisory services.

The technical implementation centered around a retrieval-augmented generation (RAG) architecture, but the company initially struggled with document recall issues. The evaluation approach began with what the speaker termed "vibes-based" assessment using just five carefully selected prototype examples. These weren't generic user stories but specific, concrete scenarios like comparing the investment outlook between two major companies (Disney and Comcast were mentioned as an example). Each test case included the expected document types to be retrieved, the analytical insights financial advisors would seek, and the appropriate response length and detail level.

The evaluation methodology followed a progressive scaling pattern: starting with prototype examples, moving to real user behavior observation, then implementing limited rollouts with simple thumbs up/down feedback mechanisms. This feedback wasn't used as the final evaluation metric but rather as an efficient sampling method to identify problematic cases for deeper analysis. The team found that users sometimes gave negative feedback due to misunderstanding the product's intended use rather than actual model failures, making human review of flagged cases essential.

Through this evaluation process, they quickly identified that document recall was the primary bottleneck rather than the language model's summarization capabilities. The team pivoted to focus on retrieval optimization, experimenting with different embedding strategies, chunk sizes, and retrieval methods. They tested various approaches including full document embedding versus paragraph-level embedding, and optimized the balance between retrieving complete documents versus specific relevant passages with sufficient context.

The technical iteration cycle achieved daily deployment and testing cadence once the evaluation infrastructure was established. The team used both human labeling for smaller, curated datasets and automated recall metrics for the retrieval components. Morgan Stanley's success metrics showed improvement in document corpus utilization from 20% to 80%, with the final system achieving 98% adoption among advisor teams.

**Grab Southeast Asian Mapping and Computer Vision**

Grab's implementation represented a more sophisticated evaluation framework applied to computer vision tasks for improving mapping accuracy across Southeast Asia. The company identified significant gaps in existing mapping providers' coverage of the region's unique transportation infrastructure, including scooter-only paths, walking-only streets, and dynamic construction zones affecting routing algorithms.

The technical challenge involved processing visual data from delivery drivers and ride-share operators to extract structured metadata about road conditions. This included lane count detection, speed limit sign recognition, traffic control device identification, and real-time construction status updates. The system needed to handle partially occluded road signs and distinguish lane counts in complex traffic scenarios where simple line-counting algorithms failed.

Grab's evaluation approach was notably more mature than Morgan Stanley's initial framework, reflecting their prior machine learning experience. They developed comprehensive test suites that could effectively communicate model performance gaps both internally and to OpenAI's research teams. This evaluation capability enabled collaborative development of new fine-tuning methodologies, particularly for vision tasks that weren't previously supported in OpenAI's fine-tuning pipeline.

The technical implementation involved structured data extraction from images, with the model outputting JSON-formatted metadata about road characteristics. A key innovation was the development of vision fine-tuning capabilities that allowed optimization of the token generation process from images. This involved balancing between high-fidelity image processing (more tokens, higher cost, risk of overfitting) versus lower-resolution processing (fewer tokens, lower cost, better generalization).

Grab's case demonstrated the power of strong evaluation frameworks for driving product roadmaps and research priorities. Their ability to clearly articulate model limitations through systematic evaluation enabled OpenAI to prioritize developing vision fine-tuning capabilities and optimize image processing parameters. The company achieved significant improvements in lane count accuracy and sign localization while reducing operational costs by automating previously manual image labeling processes.

**OpenAI's Evaluation Platform and Tools**

The presentation also covered OpenAI's evolving evaluation infrastructure, including their logging dashboard that captures all API interactions for later evaluation. The platform provides functionality to compare model performance across different versions using existing traffic patterns, automated grading using LLM-as-judge approaches, and integrated fine-tuning workflows.

The evaluation platform includes several key features: comprehensive request logging with metadata and tool call tracking, multi-model comparison capabilities for testing model upgrades on existing traffic, and automated evaluation using generalized grading prompts. The LLM-as-judge functionality uses reasoning models to assess response quality, providing both scores and detailed explanations for their evaluations. The speaker noted that these automated graders often catch inconsistencies that human evaluators initially miss, though alignment with human judgment remains important for long-term reliability.

**Key LLMOps Insights and Best Practices**

The case studies reveal several critical LLMOps patterns: starting with simple, concrete evaluation examples rather than comprehensive test suites, using feedback mechanisms for efficient problem identification rather than final metrics, maintaining human oversight for error analysis and pattern recognition, and integrating evaluation systems into CI/CD pipelines for continuous monitoring.

The progression from prototype to production follows a consistent pattern: begin with 3-5 specific demonstration scenarios that capture core value propositions, implement basic feedback collection during limited rollouts, use feedback for targeted problem identification rather than general quality assessment, and scale evaluation sophistication only after addressing fundamental issues.

Both cases emphasized that effective evaluation systems serve multiple purposes beyond quality assurance: they enable clear communication between teams, facilitate external partnerships and research collaboration, guide product development priorities, and support rapid iteration cycles. The ability to articulate specific model limitations through systematic evaluation proved crucial for both companies' success in optimizing their LLM-powered systems.