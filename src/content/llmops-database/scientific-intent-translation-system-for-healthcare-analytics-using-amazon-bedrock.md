---
title: "Scientific Intent Translation System for Healthcare Analytics Using Amazon Bedrock"
slug: "scientific-intent-translation-system-for-healthcare-analytics-using-amazon-bedrock"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a8c104330d6923ca9325f1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:58.584Z"
  createdOn: "2025-02-09T14:51:48.655Z"
llmopsTags:
  - "healthcare"
  - "regulatory-compliance"
  - "data-analysis"
  - "rag"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "human-in-the-loop"
  - "kubernetes"
  - "microservices"
  - "guardrails"
  - "fastapi"
  - "amazon-aws"
  - "anthropic"
industryTags: "healthcare"
company: "Aetion"
summary: "Aetion developed a Measures Assistant to help healthcare professionals translate complex scientific queries into actionable analytics measures using generative AI. By implementing Amazon Bedrock with Claude 3 Haiku and a custom RAG system, they created a production system that allows users to express scientific intent in natural language and receive immediate guidance on implementing complex healthcare data analyses. This reduced the time required to implement measures from days to minutes while maintaining high accuracy and security standards."
link: "https://aws.amazon.com/blogs/machine-learning/how-aetion-is-using-generative-ai-and-amazon-bedrock-to-translate-scientific-intent-to-results?tag=soumet-20"
year: 2025
seo:
  title: "Aetion: Scientific Intent Translation System for Healthcare Analytics Using Amazon Bedrock - ZenML LLMOps Database"
  description: "Aetion developed a Measures Assistant to help healthcare professionals translate complex scientific queries into actionable analytics measures using generative AI. By implementing Amazon Bedrock with Claude 3 Haiku and a custom RAG system, they created a production system that allows users to express scientific intent in natural language and receive immediate guidance on implementing complex healthcare data analyses. This reduced the time required to implement measures from days to minutes while maintaining high accuracy and security standards."
  canonical: "https://www.zenml.io/llmops-database/scientific-intent-translation-system-for-healthcare-analytics-using-amazon-bedrock"
  ogTitle: "Aetion: Scientific Intent Translation System for Healthcare Analytics Using Amazon Bedrock - ZenML LLMOps Database"
  ogDescription: "Aetion developed a Measures Assistant to help healthcare professionals translate complex scientific queries into actionable analytics measures using generative AI. By implementing Amazon Bedrock with Claude 3 Haiku and a custom RAG system, they created a production system that allows users to express scientific intent in natural language and receive immediate guidance on implementing complex healthcare data analyses. This reduced the time required to implement measures from days to minutes while maintaining high accuracy and security standards."
---

# Aetion Measures Assistant: LLMOps Case Study

## Company and Use Case Overview

Aetion is a healthcare software and services company specializing in generating real-world evidence (RWE) on the safety, effectiveness, and value of medications and clinical interventions. The company serves major biopharma companies, regulatory agencies (including FDA and EMA), payors, and health technology assessment customers across the US, Canada, Europe, and Japan. Their core platform, the Aetion Evidence Platform (AEP), is a longitudinal analytic engine capable of applying causal inference and statistical methods to hundreds of millions of patient journeys.

The challenge Aetion faced was bridging the gap between scientific intent expressed in natural language and the technical implementation of complex patient variables in real-world data. Scientists, epidemiologists, and biostatisticians need to capture complex, clinically relevant patient variables that often involve sequences of events, combinations of occurrences and non-occurrences, and detailed numeric calculations. Previously, translating questions like "I want to find patients with a diagnosis of diabetes and a subsequent metformin fill" into working algorithms required specialized expertise and could take days.

## The Measures Assistant Solution

Aetion developed "Measures Assistant" as part of their AetionAI suite, embedded within their Substantiate application. This feature enables users to express scientific intent in natural language and receive instructions on how to implement complex patient variables using AEP's Measures system. Measures are described as "logical building blocks used to flexibly capture complex patient variables," and they can be chained together to address nuanced research questions.

The solution architecture demonstrates thoughtful LLMOps practices. Measures Assistant is deployed as a microservice in a Kubernetes on AWS environment and accessed through a REST API. This containerized, microservices approach provides scalability and maintainability benefits typical of production ML systems. All data transmission is encrypted using TLS 1.2, addressing the security requirements essential in healthcare applications where patient data sensitivity is paramount.

## LLM Selection and Integration

Aetion chose Amazon Bedrock as their foundation for working with large language models. According to the case study, the decision was based on Bedrock's "vast model selection from multiple providers, security posture, extensibility, and ease of use." This reflects a common pattern in enterprise LLMOps where managed services are preferred over self-hosted solutions to reduce operational burden and leverage built-in security features.

For the specific model, Aetion selected Anthropic's Claude 3 Haiku, noting it was "more efficient in runtime and cost than available alternatives." This model choice reflects practical production considerations where latency and cost per request matter significantly for user-facing applications. Haiku's positioning as the fastest and most compact model in the Claude 3 family makes it suitable for interactive applications requiring quick responses.

## Prompt Engineering and Knowledge Management

The prompt engineering approach used in Measures Assistant is sophisticated and demonstrates production-grade practices. The prompt template contains several key components:

- A general definition of the task the LLM is performing
- Extracts from AEP documentation describing each Measure type, including input/output types and usage instructions
- In-context learning examples that include semantically relevant solved questions and answers
- Behavioral rules conditioning the LLM's responses, including handling of unrelated questions, data security, and restrictions on generating invalid AEP settings

The system uses a hybrid static-dynamic template approach. Static portions contain fixed instructions covering a broad range of well-defined behaviors. Dynamic portions select questions and answers from a local knowledge base based on semantic proximity to the user's query. This is described as modeling "a small-scale, optimized, in-process knowledge base for a Retrieval Augmented Generation (RAG) pattern."

## Embedding and Retrieval System

For semantic search within the knowledge base, Aetion fine-tuned Mixedbread's mxbai-embed-large-v1 Sentence Transformer to generate embeddings for their question-and-answer pairs and user questions. Similarity between questions is calculated using cosine similarity between embedding vectors. The decision to fine-tune an existing embedding model rather than using it off-the-shelf suggests Aetion invested in optimizing retrieval quality for their specific domain vocabulary and use cases.

This approach represents a pragmatic middle ground between pure RAG systems that rely on external vector databases and fully fine-tuned models. By maintaining a local, optimized knowledge base with pre-computed embeddings, Aetion can achieve fast retrieval while keeping the system architecture simpler than a full vector database deployment.

## Guardrails and Quality Control

The case study emphasizes the importance of guardrails in ensuring response quality. Aetion maintains a local knowledge base created by scientific experts, and this information is incorporated into responses as guardrails. According to the text, "These guardrails make sure the service returns valid instructions to the user, and compensates for logical reasoning errors that the core model might exhibit." This acknowledgment that LLMs can exhibit logical reasoning errors and need domain-specific constraints demonstrates mature LLMOps thinking.

Notably, the generation and maintenance of the question-and-answer pool involves a human-in-the-loop process. Subject matter experts continuously test Measures Assistant, and the resulting question-answer pairs are used to refine the system. This continuous improvement cycle, combining automated systems with expert human oversight, is essential for maintaining quality in production LLM applications, particularly in regulated industries like healthcare.

## Architecture and Security Considerations

The deployment on Kubernetes provides containerized infrastructure benefits including scalability, fault tolerance, and easier deployment management. The REST API interface enables clean integration with the existing Substantiate application. The emphasis on TLS 1.2 encryption for both user-provided prompts and requests to Amazon Bedrock reflects the healthcare industry's stringent security and compliance requirements.

The case study mentions that Amazon Bedrock's security posture was a factor in the platform selection, which aligns with healthcare organizations' needs to maintain HIPAA compliance and protect sensitive patient data. By using a managed service with enterprise security features, Aetion can leverage AWS's compliance certifications rather than building and maintaining these capabilities internally.

## Claimed Outcomes and Critical Assessment

The reported outcomes indicate that users can now turn natural language questions into measures "in a matter of minutes as opposed to days, without the need of support staff and specialized training." This represents a significant claimed improvement in efficiency, though it's worth noting this is from an AWS blog post that naturally highlights positive results.

Some aspects not fully addressed in the case study include specific accuracy metrics, how edge cases or ambiguous queries are handled, the volume of queries processed in production, and how model updates or changes are managed. The continuous refinement process with human experts suggests ongoing maintenance requirements that organizations considering similar implementations should factor into their planning.

## Future Directions

Aetion indicates they are continuing to refine the knowledge base and expand generative AI capabilities across their product suite. This suggests an evolving LLMOps practice where the initial deployment serves as a foundation for broader AI integration. The approach of starting with a focused use case (Measures translation) before expanding demonstrates a measured adoption strategy that allows teams to build expertise and infrastructure incrementally.

The case study represents a practical example of LLM deployment in healthcare analytics, combining managed LLM services, custom knowledge bases, embedding-based retrieval, and human-in-the-loop quality assurance to create a production system that bridges the gap between domain experts and complex technical systems.