---
title: "From Simple RAG to Multi-Agent Architecture for Document Data Extraction"
slug: "from-simple-rag-to-multi-agent-architecture-for-document-data-extraction"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "684a93ede99f4a521486b83c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-06-18T07:54:35.675Z"
  lastUpdated: "2025-06-12T08:49:09.316Z"
  createdOn: "2025-06-12T08:46:37.521Z"
llmopsTags:
  - "document-processing"
  - "data-analysis"
  - "data-cleaning"
  - "unstructured-data"
  - "high-stakes-application"
  - "structured-output"
  - "multi-agent-systems"
  - "rag"
  - "prompt-engineering"
  - "chunking"
  - "error-handling"
  - "fallback-strategies"
  - "agent-based"
  - "langchain"
  - "monitoring"
  - "orchestration"
  - "open-source"
industryTags: "tech"
company: "Box"
summary: "Box evolved their document data extraction system from a simple single-model approach to a sophisticated multi-agent architecture to handle enterprise-scale unstructured data processing. The initial straightforward approach of preprocessing documents and feeding them to an LLM worked well for basic use cases but failed when customers presented complex challenges like 300-page documents, poor OCR quality, hundreds of extraction fields, and confidence scoring requirements. By redesigning the system using an agentic approach with specialized sub-agents for different tasks, Box achieved better accuracy, easier system evolution, and improved maintainability while processing millions of pages for enterprise customers."
link: "https://www.youtube.com/watch?v=uNBIaANTJJw"
year: 2025
seo:
  title: "Box: From Simple RAG to Multi-Agent Architecture for Document Data Extraction - ZenML LLMOps Database"
  description: "Box evolved their document data extraction system from a simple single-model approach to a sophisticated multi-agent architecture to handle enterprise-scale unstructured data processing. The initial straightforward approach of preprocessing documents and feeding them to an LLM worked well for basic use cases but failed when customers presented complex challenges like 300-page documents, poor OCR quality, hundreds of extraction fields, and confidence scoring requirements. By redesigning the system using an agentic approach with specialized sub-agents for different tasks, Box achieved better accuracy, easier system evolution, and improved maintainability while processing millions of pages for enterprise customers."
  canonical: "https://www.zenml.io/llmops-database/from-simple-rag-to-multi-agent-architecture-for-document-data-extraction"
  ogTitle: "Box: From Simple RAG to Multi-Agent Architecture for Document Data Extraction - ZenML LLMOps Database"
  ogDescription: "Box evolved their document data extraction system from a simple single-model approach to a sophisticated multi-agent architecture to handle enterprise-scale unstructured data processing. The initial straightforward approach of preprocessing documents and feeding them to an LLM worked well for basic use cases but failed when customers presented complex challenges like 300-page documents, poor OCR quality, hundreds of extraction fields, and confidence scoring requirements. By redesigning the system using an agentic approach with specialized sub-agents for different tasks, Box achieved better accuracy, easier system evolution, and improved maintainability while processing millions of pages for enterprise customers."
---

## Case Study Overview

Box, a B2B unstructured data platform serving over 115,000 companies including Fortune 500 enterprises, presents a compelling case study of how LLMOps practices evolved from simple single-model implementations to sophisticated multi-agent architectures in production. The company, trusted with over an exabyte of customer data, became one of the first AI solutions deployed across many large enterprises, positioning them uniquely to understand the operational challenges of running LLMs at enterprise scale.

Ben Kuss from Box shared their journey of building agent architectures specifically around document data extraction, a use case that initially appeared to be the least "agentic" among their AI offerings but ultimately demonstrated the most significant benefits from adopting multi-agent approaches. This case study is particularly valuable because it illustrates the practical evolution from proof-of-concept to production-ready systems, highlighting the gap between initial AI success and enterprise-grade deployment requirements.

## Initial Architecture and Early Success

Box began their document data extraction journey with what appeared to be a straightforward implementation. Their initial architecture followed a linear pipeline approach: document ingestion, field specification, preprocessing (including OCR), and direct LLM inference for structured data extraction. This approach leveraged the fundamental capabilities of large language models to understand and extract structured information from unstructured documents.

The early results were remarkably promising. Box successfully processed 10 million pages for their first customer deployment, leading the team to believe they had achieved a comprehensive solution for document data extraction. The simplicity and elegance of the approach - essentially asking an LLM to extract specific fields from documents - seemed to validate the power of generative AI for this use case.

However, this initial success masked several critical limitations that would only emerge as the system encountered more diverse and challenging real-world scenarios. The linear architecture, while effective for controlled use cases, lacked the flexibility and robust error handling required for enterprise-scale deployment across diverse document types and extraction requirements.

## Production Challenges and the "Trough of Disillusionment"

As Box expanded their offering and encouraged customers to "give us any data," they encountered a series of production challenges that revealed the limitations of their initial approach. These challenges represent common LLMOps issues that many organizations face when scaling from prototype to production:

**Context Window Limitations**: Customers presented documents exceeding 300 pages, far beyond the context windows available at the time. This required Box to develop more sophisticated document chunking and enterprise RAG approaches to handle large documents while maintaining extraction accuracy across the entire document.

**OCR Quality Issues**: The system struggled with documents where text was crossed out, handwritten annotations were present, or multiple languages were used. These real-world document variations highlighted the brittleness of relying solely on OCR preprocessing without intelligent handling of edge cases.

**Scale of Extraction Requirements**: While the initial system handled extracting 20 fields effectively, customers requested extraction of 200-500 different pieces of information from single documents. This overwhelmed the attention mechanisms of the models and required more sophisticated approaches to field grouping and extraction orchestration.

**Confidence and Reliability**: Enterprise customers demanded confidence scores and reliability metrics that generative AI models don't naturally provide. Box implemented "LLM-as-a-judge" approaches but found that simply telling customers when the system thought it was wrong without providing actionable alternatives was insufficient for production use.

These challenges led Box to what they describe as their "trough of disillusionment" with generative AI - the point where the initial elegance and promise of the technology met the harsh realities of production deployment. The engineering team's natural response was to add more preprocessing, better error handling, and incremental improvements, but these approaches didn't address the fundamental architectural limitations.

## Multi-Agent Architecture Redesign

Inspired by Andrew Ng's deep learning coursework and recognizing the limitations of their linear approach, Box completely rearchitected their system using a multi-agent framework. This decision was initially met with skepticism, as document data extraction didn't seem like a natural fit for agentic approaches compared to more interactive use cases like chatbots.

The new architecture decomposed the extraction problem into specialized sub-agents, each responsible for specific aspects of the extraction pipeline:

**Document Analysis Agent**: Responsible for understanding document structure, identifying relevant sections, and determining the appropriate extraction strategy based on document type and complexity.

**Field Grouping Agent**: Rather than using heuristic-based field grouping, this agent intelligently groups related fields (such as customer information and customer addresses) to maintain semantic relationships during extraction.

**Extraction Orchestration Agent**: Decides which models and techniques to use for different parts of the extraction process, potentially combining OCR text analysis with image-based processing for complex documents.

**Quality Assurance Agent**: Provides not just confidence scoring but actionable feedback for re-extraction attempts, implementing retry logic with different approaches when initial extraction quality is insufficient.

**Specialized Document Type Agents**: As the system matured, Box developed specialized agents for specific document types (lease documents, contracts, etc.) that could apply domain-specific extraction logic.

This multi-agent approach provided several key advantages over the monolithic architecture. The system became more maintainable because each agent could be developed, tested, and updated independently. The abstraction allowed engineers to think about the problem more naturally - as a team of specialists working together rather than a single complex system trying to handle all edge cases.

## Production Benefits and Operational Improvements

The multi-agent architecture delivered significant operational benefits that extend beyond pure technical performance. The modular design made the system much easier to evolve and adapt to new requirements. When customers encountered extraction issues with specific document types, Box could develop targeted solutions by adding new specialized agents or updating existing ones without rebuilding the entire pipeline.

The cleaner abstraction also improved the development process. Engineers could focus on individual problems in isolation, making debugging and optimization more straightforward. The system became more resilient because failures in one agent didn't necessarily cascade to others, and the orchestration layer could implement sophisticated retry and fallback strategies.

From a customer perspective, the system could handle a much broader range of document types and extraction requirements. The intelligent field grouping and dynamic model selection resulted in higher accuracy, while the quality feedback loops enabled the system to self-correct and improve extraction quality iteratively.

## Organizational and Cultural Impact

An unexpected but significant benefit of adopting multi-agent architectures was the impact on Box's engineering culture and customer relationships. By building their own agent-based systems, Box's engineers developed deep understanding of agentic workflows and the patterns that make them successful. This knowledge proved valuable as many of their enterprise customers began building their own LangGraph-powered or similar agent systems that integrated with Box's APIs.

The engineering team's experience with agent architectures enabled them to design better APIs and integration points for customer-built agents. They could anticipate the needs of customers building agentic workflows and provide more suitable tools and interfaces. This created a virtuous cycle where Box's internal agent expertise improved their ability to serve customers who were also adopting agent-based approaches.

## Technical Architecture Considerations

The evolution from single-model to multi-agent architecture illustrates several important LLMOps principles. The initial approach optimized for simplicity and directness but lacked the flexibility needed for production deployment. The multi-agent approach traded some simplicity for much greater adaptability and maintainability.

The case study demonstrates the importance of abstraction in LLMOps systems. By thinking about document extraction as a collaborative process between specialized agents rather than a single complex operation, Box created a system that was easier to understand, debug, and extend. This abstraction also made it easier to incorporate new models, techniques, and capabilities as they became available.

The quality feedback loops and retry mechanisms built into the multi-agent system represent sophisticated production practices. Rather than simply reporting confidence scores, the system actively attempts to improve extraction quality through different approaches and model combinations. This proactive approach to quality management is essential for enterprise deployment.

## Lessons for LLMOps Practice

Box's experience offers several key insights for organizations building production LLM systems. The most significant lesson is the recommendation to "build agentic early" - don't wait until you encounter the limitations of simpler approaches before considering more sophisticated architectures.

The case study also highlights the importance of thinking beyond initial proof-of-concept success. The early results with simple document extraction were impressive but didn't predict the challenges that would emerge with diverse, real-world deployment. Planning for production complexity from the beginning, rather than treating it as an afterthought, can save significant rework later.

The multi-agent approach's benefits extend beyond technical performance to include organizational and cultural advantages. Teams that build agent-based systems develop intuitions about AI workflows that benefit both internal development and customer relationships. This suggests that the choice of architecture has implications beyond immediate technical requirements.

## Critical Assessment

While Box's success story is compelling, it's important to note that the case study comes from a single speaker at a conference and may naturally emphasize positive outcomes. The transition from simple to complex architectures undoubtedly involved significant engineering investment, and the trade-offs between system complexity and operational benefits may vary for different organizations and use cases.

The specific benefits of multi-agent architectures may depend heavily on the nature of the problem domain. Document data extraction, with its natural decomposition into subtasks like OCR, field grouping, and quality assessment, may be particularly well-suited to agent-based approaches. Other use cases might not benefit as clearly from this architectural pattern.

Additionally, while the case study mentions processing millions of pages and serving Fortune 500 customers, specific performance metrics, cost comparisons, or detailed failure analysis are not provided. The operational complexity of managing multi-agent systems in production - including monitoring, debugging, and performance optimization - is not extensively discussed.

Despite these limitations, Box's experience provides valuable insights into the evolution of production LLM systems and demonstrates how thoughtful architectural choices can address the gap between prototype success and enterprise-ready deployment. The case study serves as a practical example of LLMOps principles in action, showing how organizations can build more robust and maintainable AI systems through careful design and engineering practices.