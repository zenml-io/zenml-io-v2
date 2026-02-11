---
title: "Building a Centralized AI-Powered Developer Support System Using RAG"
slug: "building-a-centralized-ai-powered-developer-support-system-using-rag"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6851362ea3482ed5a5bbb373"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:11:53.406Z"
  createdOn: "2025-06-17T09:32:30.156Z"
llmopsTags:
  - "question-answering"
  - "document-processing"
  - "customer-support"
  - "rag"
  - "embeddings"
  - "vector-search"
  - "chunking"
  - "semantic-search"
  - "reranking"
  - "langchain"
  - "elasticsearch"
  - "databases"
  - "api-gateway"
  - "monitoring"
  - "cicd"
  - "serverless"
  - "amazon-aws"
industryTags: "tech"
company: "Adobe"
summary: "Adobe faced challenges with developers struggling to efficiently find relevant information across vast collections of wiki pages, software guidelines, and troubleshooting guides. The company developed \"Unified Support,\" a centralized AI-powered system using Amazon Bedrock Knowledge Bases and vector search capabilities to help thousands of internal developers get immediate answers to technical questions. By implementing a RAG-based solution with metadata filtering and optimized chunking strategies, Adobe achieved a 20% increase in retrieval accuracy compared to their existing solution, significantly improving developer productivity while reducing support costs."
link: "https://aws.amazon.com/blogs/machine-learning/adobe-enhances-developer-productivity-using-amazon-bedrock-knowledge-bases?tag=soumet-20"
year: 2025
seo:
  title: "Adobe: Building a Centralized AI-Powered Developer Support System Using RAG - ZenML LLMOps Database"
  description: "Adobe faced challenges with developers struggling to efficiently find relevant information across vast collections of wiki pages, software guidelines, and troubleshooting guides. The company developed \"Unified Support,\" a centralized AI-powered system using Amazon Bedrock Knowledge Bases and vector search capabilities to help thousands of internal developers get immediate answers to technical questions. By implementing a RAG-based solution with metadata filtering and optimized chunking strategies, Adobe achieved a 20% increase in retrieval accuracy compared to their existing solution, significantly improving developer productivity while reducing support costs."
  canonical: "https://www.zenml.io/llmops-database/building-a-centralized-ai-powered-developer-support-system-using-rag"
  ogTitle: "Adobe: Building a Centralized AI-Powered Developer Support System Using RAG - ZenML LLMOps Database"
  ogDescription: "Adobe faced challenges with developers struggling to efficiently find relevant information across vast collections of wiki pages, software guidelines, and troubleshooting guides. The company developed \"Unified Support,\" a centralized AI-powered system using Amazon Bedrock Knowledge Bases and vector search capabilities to help thousands of internal developers get immediate answers to technical questions. By implementing a RAG-based solution with metadata filtering and optimized chunking strategies, Adobe achieved a 20% increase in retrieval accuracy compared to their existing solution, significantly improving developer productivity while reducing support costs."
---

## Case Study Overview

Adobe, a leading provider of creative software tools, implemented an AI-powered developer support system called "Unified Support" to address significant challenges their internal development teams faced in accessing relevant technical information. With thousands of internal developers working across various domains including CI/CD pipeline management, software deployment, and troubleshooting, Adobe recognized that developers were spending excessive time searching through fragmented wiki pages, software guidelines, and troubleshooting documentation. This inefficiency not only reduced developer productivity but also increased support costs across the organization.

The initiative represents a substantial LLMOps implementation, moving from a prototype phase to a production-ready system that serves thousands of developers. Adobe partnered with AWS Generative AI Innovation Center to build a scalable, automated solution using Amazon Bedrock Knowledge Bases as the core infrastructure, demonstrating how enterprises can successfully deploy RAG (Retrieval-Augmented Generation) systems at scale in production environments.

## Technical Architecture and Implementation

The production system architecture centers around Amazon Bedrock Knowledge Bases, which serves as the backbone for document indexing and retrieval. The system follows a comprehensive data pipeline that begins with data ingestion from Amazon S3 buckets containing various types of technical documentation, including issue resolutions, wiki pages, and development guidelines.

The chunking strategy proved critical to the system's performance. After extensive experimentation, Adobe implemented a fixed-size chunking approach with 400-token chunks and 20% overlap. This configuration emerged as optimal after testing multiple strategies including longer 1,000-token chunks, hierarchical chunking with parent-child relationships (1,500-token parents with 300-token children), and semantic chunking with similarity thresholds. The evaluation process revealed that fixed-size 400-token chunking consistently delivered the highest accuracy across different retrieval sizes.

For vectorization, the system leverages Amazon Titan V2 embedding model on Amazon Bedrock, generating 1,024-dimension numerical vectors that capture semantic meaning of each chunk. These vectors are stored in Amazon OpenSearch Serverless vector database, creating a searchable repository optimized for similarity-based retrieval operations.

## Multi-Tenancy and Metadata Filtering

A particularly sophisticated aspect of Adobe's LLMOps implementation is the multi-tenancy approach achieved through metadata filtering. Recognizing that developers often need domain-specific information or may have queries spanning multiple technical areas, Adobe implemented a metadata-driven filtering system that enables precise retrieval across complex, multi-domain knowledge sources.

Each source document is accompanied by a corresponding metadata file using a `.metadata.json` suffix, containing attributes such as domain classification, year, and document type. This metadata structure enables developers to fine-tune their searches and retrieve not just semantically relevant information, but a well-defined subset based on specific criteria like project domains or documentation types.

The metadata filtering capability addresses a common challenge in enterprise LLMOps deployments where generic retrieval systems may return semantically similar but contextually inappropriate results. By enabling this level of granular control, Adobe ensures that developers receive highly relevant answers specific to their particular technical domain or project context.

## Runtime Operations and API Integration

The production system operates through Amazon Bedrock Knowledge Bases Retrieve API, demonstrating robust LLMOps practices for API-driven retrieval systems. When developers pose questions, the system automatically vectorizes queries using the same embedding model used during data ingestion, ensuring consistency in semantic representation.

The retrieval process performs similarity searches against the vector database, ranks results based on semantic similarity scores, and presents the most relevant information to users. The system supports configurable parameters including the number of results returned and filtering criteria, allowing for flexible deployment across different use cases within Adobe's development organization.

Adobe also implemented integration with the langchain-aws package, providing developers with programmatic access to the knowledge base through familiar Python interfaces. This integration approach demonstrates how enterprise LLMOps deployments can provide multiple access patterns to accommodate different developer workflows and integration requirements.

## Evaluation Framework and Performance Optimization

Adobe's approach to evaluation represents sophisticated LLMOps practices for measuring and optimizing production AI systems. The team implemented a comprehensive evaluation framework using the open-source Ragas model evaluation framework, extending it with custom metrics specifically designed for their use case.

The evaluation strategy employed two complementary metrics: document relevance and Mean Reciprocal rank (MRR). Document relevance provides qualitative assessment using an LLM as an impartial judge to evaluate how effectively retrieved information addresses developer queries, scoring results on a 1-10 scale. MRR offers quantitative evaluation by measuring how well the system ranks the first relevant item for each query, with scores closer to 1 indicating that relevant results consistently appear at the top of search results.

This dual-metric approach provides comprehensive insights into system performance from both content quality and ranking effectiveness perspectives. The evaluation process revealed that MRR serves as a more sensitive metric for assessing the impact of different chunking strategies, particularly when varying the number of retrieved chunks from 1 to 5.

## Production Deployment and Scalability Considerations

The system demonstrates mature LLMOps practices through its emphasis on scalable, automated deployment capabilities. Adobe designed the solution as a reusable blueprint that can accommodate large-scale data ingestion of various document types while offering flexible configurations for different deployment scenarios.

Key scalability features include configurable embedding model selection, adjustable chunk size parameters, and automated document synchronization mechanisms that handle updates to the knowledge base without manual intervention. This infrastructure design enables the system to support thousands of developers simultaneously while maintaining consistent performance and accuracy.

The automated deployment approach addresses common challenges in enterprise LLMOps where manual configuration and maintenance can become bottlenecks as systems scale. By creating reusable deployment patterns, Adobe ensures that the solution can be extended to additional teams and use cases without requiring extensive custom development work.

## Performance Results and Business Impact

The production deployment achieved significant measurable improvements over Adobe's existing solution. The 20% increase in retrieval accuracy represents substantial progress in a domain where precision directly impacts developer productivity and support costs. This improvement was validated through rigorous testing against Adobe's ground truth data, providing confidence in the system's production readiness.

Beyond accuracy improvements, the system delivers enhanced developer experience through reduced time spent searching for information and more relevant results for complex, multi-domain queries. The metadata filtering capabilities enable developers to narrow searches effectively, addressing the common challenge of information overload in large-scale technical documentation repositories.

The business impact extends to reduced support costs as developers can self-serve answers to technical questions rather than requiring human support intervention. This efficiency gain is particularly valuable in large organizations where developer support requests can represent significant operational overhead.

## Key LLMOps Lessons and Best Practices

Adobe's implementation demonstrates several critical LLMOps best practices for enterprise RAG deployments. The extensive experimentation with chunking strategies highlights the importance of empirical evaluation rather than assuming optimal configurations. The finding that simpler fixed-size chunking outperformed more sophisticated hierarchical and semantic approaches underscores the value of systematic testing in production environments.

The metadata filtering approach represents an advanced technique for handling multi-domain enterprise knowledge bases, addressing the challenge of maintaining semantic relevance while enabling precise contextual filtering. This capability is particularly valuable for large organizations with diverse technical domains and varying information needs across different teams.

The comprehensive evaluation framework using both qualitative and quantitative metrics provides a model for rigorous performance assessment in production LLMOps deployments. The combination of LLM-based relevance scoring and traditional ranking metrics offers balanced insights into system performance that purely technical metrics might miss.

While the case study presents impressive results, it's important to note that the 20% accuracy improvement, while significant, represents incremental rather than transformational performance gains. The success appears to stem from systematic engineering and optimization rather than breakthrough techniques, suggesting that successful enterprise LLMOps deployments require disciplined execution of established best practices rather than relying solely on cutting-edge innovations.