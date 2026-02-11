---
title: "Hybrid RAG for Technical Training Knowledge Assistant in Mining Operations"
slug: "hybrid-rag-for-technical-training-knowledge-assistant-in-mining-operations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6915cda2772c9e9864dad6a0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:27:28.582Z"
  createdOn: "2025-11-13T12:22:58.720Z"
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "classification"
  - "multi-modality"
  - "high-stakes-application"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "reranking"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "evals"
  - "chunking"
  - "model-optimization"
  - "elasticsearch"
  - "docker"
  - "kubernetes"
  - "fastapi"
  - "pytorch"
  - "tensorflow"
  - "databases"
  - "serverless"
  - "orchestration"
  - "monitoring"
  - "scaling"
  - "microservices"
  - "open-source"
  - "guardrails"
  - "cache"
  - "amazon-aws"
industryTags: "energy"
company: "Rio Tinto"
summary: "Rio Tinto Aluminium faced challenges in providing technical experts in refining and smelting sectors with quick and accurate access to vast amounts of specialized institutional knowledge during their internal training programs. They developed a generative AI-powered knowledge assistant using hybrid RAG (retrieval augmented generation) on Amazon Bedrock, combining both vector search and knowledge graph databases to enable more accurate, contextually rich responses. The hybrid system significantly outperformed traditional vector-only RAG across all metrics, particularly in context quality and entity recall, showing over 53% reduction in standard deviation while maintaining high mean scores, and leveraging 11-17 technical documents per query compared to 2-3 for vector-only approaches, ultimately streamlining how employees find and utilize critical business information."
link: "https://www.youtube.com/watch?v=M8EbEnqgoFY"
year: 2025
seo:
  title: "Rio Tinto: Hybrid RAG for Technical Training Knowledge Assistant in Mining Operations - ZenML LLMOps Database"
  description: "Rio Tinto Aluminium faced challenges in providing technical experts in refining and smelting sectors with quick and accurate access to vast amounts of specialized institutional knowledge during their internal training programs. They developed a generative AI-powered knowledge assistant using hybrid RAG (retrieval augmented generation) on Amazon Bedrock, combining both vector search and knowledge graph databases to enable more accurate, contextually rich responses. The hybrid system significantly outperformed traditional vector-only RAG across all metrics, particularly in context quality and entity recall, showing over 53% reduction in standard deviation while maintaining high mean scores, and leveraging 11-17 technical documents per query compared to 2-3 for vector-only approaches, ultimately streamlining how employees find and utilize critical business information."
  canonical: "https://www.zenml.io/llmops-database/hybrid-rag-for-technical-training-knowledge-assistant-in-mining-operations"
  ogTitle: "Rio Tinto: Hybrid RAG for Technical Training Knowledge Assistant in Mining Operations - ZenML LLMOps Database"
  ogDescription: "Rio Tinto Aluminium faced challenges in providing technical experts in refining and smelting sectors with quick and accurate access to vast amounts of specialized institutional knowledge during their internal training programs. They developed a generative AI-powered knowledge assistant using hybrid RAG (retrieval augmented generation) on Amazon Bedrock, combining both vector search and knowledge graph databases to enable more accurate, contextually rich responses. The hybrid system significantly outperformed traditional vector-only RAG across all metrics, particularly in context quality and entity recall, showing over 53% reduction in standard deviation while maintaining high mean scores, and leveraging 11-17 technical documents per query compared to 2-3 for vector-only approaches, ultimately streamlining how employees find and utilize critical business information."
---

## Overview and Business Context

Rio Tinto is a global mining and materials company operating in 35 countries with nearly 52,000 employees, producing iron ore, copper, aluminium, and critical minerals. Rio Tinto Aluminium Pacific operates a fully integrated aluminum supply chain in Australia, from bauxite mining through alumina refining to aluminum smelting. The company has strategically implemented AI across their value chain for operational excellence, including a flex system for energy optimization, AI purity initiatives for metal quality enhancement, and specialized tools for ore body analysis.

The specific use case presented focuses on Rio Tinto Aluminium's internal technical training programs for employees in the refining and smelting sectors. Technical experts faced critical challenges in accessing vast amounts of specialized knowledge quickly and accurately when needed. To address this, they developed a generative AI-powered knowledge assistant that provides employees with instant access to institutional knowledge, fundamentally streamlining how the business finds and utilizes critical information.

## The Problem with Traditional RAG Approaches

The presentation provides substantial context on the limitations of traditional vector-only RAG implementations. While RAG has become an industry standard for addressing LLM limitations like hallucinations and lack of domain knowledge, conventional RAG implementations typically rely on a single data source—generally a vector database—which comes with significant limitations.

Vector search alone has several key weaknesses. During the vector embedding process, trade-offs dilute the precision of semantic representations, as embeddings effectively represent the average meaning of all words within each chunk. This makes it difficult to capture nuance and specific details within text. Additionally, when working with confined context windows, related pieces of information may need to be split apart to fit, leading to loss of context. As datasets grow, computational costs for processing high-dimensional vector embeddings increase substantially. Vector databases also exhibit rigidity, requiring re-embedding and reindexing when new data is added, which creates scalability challenges.

Critically, vectors lack understanding of what's inside and around them—they cannot provide context for things represented in text or how information fits into broader context. While useful for finding similarity between words through similarity calculations, they fundamentally cannot represent relationships and connections the way humans understand them.

## The Hybrid RAG Solution Architecture

Rio Tinto's solution combines vector search, knowledge graphs, and LLMs into a hybrid RAG approach that leverages the benefits of data accuracy and structured knowledge while removing LLM limitations around hallucinations and lack of domain-specific knowledge. The implementation uses Amazon Bedrock's Knowledge Bases, which is a fully managed RAG capability supporting hybrid RAG out of the box, automating the end-to-end workflow including ingestion, retrieval, and prompt augmentation.

The hybrid search system consists of four main components: the knowledge graph, a vector indexing system, a retrieval system, and generative AI models. The knowledge graph stores data in a graph format where information is captured as connected entities and relationships. Alongside it, the vector database identifies and understands those entities and relationships through semantic embeddings, enabling similarity search for graph data. The retrieval system leverages both components, combining graph traversal with semantic search to find the most relevant information. Finally, the generative model takes the retrieved context to create coherent and meaningful responses.

The overall architecture is constructed in two primary layers. The first is a data ingestion layer with two Lambda functions. The first Lambda function handles raw document processing and context extraction. The second Lambda function performs two critical tasks: building and maintaining the knowledge graph by establishing data connections, and generating semantic embeddings to power vector search capabilities. These Lambda functions leverage three main components—the generative model for text embedding, the vector indices, and the knowledge graph as data storage. Built on serverless technology, this entire pipeline scales automatically as workload demands change.

The second layer is the hybrid text generation system, which runs on Amazon ECS to ensure reliable performance. It performs three main functions: vector similarity search operations, graph-based context retrieval, and text generation. The system is also enhanced using Amazon Bedrock's Knowledge Base service, providing an additional vector-based RAG approach for more flexible user interactions.

## Data Ingestion and Processing Pipeline

The data ingestion layer employs a sophisticated approach to document processing. For rich formatted documents, the system first converts them into images using vision capabilities from Amazon Bedrock's multimodal models, extracting comprehensive information from text, tables, and visual context, transforming everything into structured text. The system then performs semantic chunking on the extracted text—a critical design decision that preserves meaningful content by breaking text into coherent and logical units, offering better contextual understanding and increasing overall retrieval accuracy compared to simpler chunking approaches.

Next, the system uses a specialized model to analyze each chunk, performing entity recognition and relationship extraction to produce the knowledge graph. An embedding model vectorizes the text representation of each graph element and stores the vectors in the vector database. This dual-structure approach captures both semantic meaning and structural relationships, creating a robust knowledge foundation for the hybrid search capability.

## Retrieval and Text Generation Process

The text generation process begins when a user submits a technical question. The system performs two initial operations: analyzing and reformulating the query within its conversational context to align with the specific domain knowledge structure, and searching the vector database to identify the most semantically relevant matches.

The system then processes entity data to determine relevance. Starting with entities discovered from the vector search results, it traverses the graph database to gather three main pieces of context: the entities' content summaries, the original documents where entities were first identified, and the relationships between entities. In the graph database, each entity node is connected to others through various relationships. The system queries these connections to map out "first-degree relationships"—the direct connections between entities.

A crucial aspect of the system is its intelligent relevance scoring mechanism. The system determines source entities' relevance scores through a smart ranking process. First, it locates target entities through first-degree relationships. Then it computes the vector similarity score between each target entity and the user query. For each source entity, it produces a relevance score by summing the vector similarity values of all related target entities. Similarly, each first-degree relationship receives a relevance score calculated by computing the vector similarity score with the user query.

This contextual weighting is particularly effective because instead of treating all information equally, the system prioritizes context based on its relevance to the specific user question. This intelligent weighting ensures that responses are both comprehensive and precisely focused on user intent. For example, when a user asks "how to fine-tune our foundation model in Amazon Bedrock," the system gives higher priority to relevant entities like foundation models and their relationships with Amazon Titan models, while giving lower priority to less relevant information like technical API details and cross-regional infrastructure.

For relationship data processing, the system follows similar steps: extracting the relationship summary along with its original context, calculating relevance scores (which can be optimized by referencing scores already obtained from the initial vector query), and identifying all connected nodes to retrieve their corresponding entity summaries.

## Prompt Construction and Response Generation

For final response generation, the system creates an augmented prompt by combining three key elements: context extracted from the databases prioritized by relevance score, the refined user query, and the session chat history. This combination allows the system to generate responses that are both comprehensive and contextually precise, with all information retrieved coming with source citations to improve transparency and minimize hallucinations.

## Technical Design Decisions and Implementation Details

Several key technical decisions underpin the system design. Rio Tinto chose Amazon's Titan text embedding model for two primary reasons: it is specifically designed for RAG applications, and it provides strong multilingual support that aligns with their feature expansion plans. The search infrastructure combines Amazon OpenSearch Service with Facebook AI Similarity Search (FAISS), creating an efficient vector search solution using Amazon Titan's normalized embeddings.

The reranking system is highly adaptable, allowing easy adjustment of search radius based on larger structure. Importantly, within a fixed search radius, text generation is deterministic, ensuring consistent text retrieval for identical queries—a critical property for production systems. The system implements clear domain knowledge separation in both storage types, improving access control and search precision.

To boost system performance, a smart caching approach works on multiple levels, storing both frequently accessed system data and common user question-answer pairs, significantly reducing response time and creating a smoother user experience.

## Evaluation and Performance Metrics

Rio Tinto conducted rigorous evaluation of their hybrid RAG system compared to traditional vector-only RAG. In a demonstration using typical questions from an alumina refinery (about flocculant preparation processes, downstream impacts, and monitoring protocols), the hybrid system provided substantially more detailed information across multiple dimensions including process details, troubleshooting, critical controls, and equipment specifications.

A key distinction lies in technical depth: the vector RAG typically draws from 2-3 sources while the hybrid RAG leverages 11-17 technical documents per query, providing far richer context. For operational teams, this translates to enhanced process control, quality standards, equipment specifications, and better problem-solving protocols.

The system was also evaluated at scale using the "LLM as a judge" technique across 100 industry-specific questions. The results showed that the hybrid system significantly outperformed the vector-only counterpart across all metrics, especially in context quality and context entity recall. Density distribution graphs showed that hybrid scores cluster tightly in the higher range while vector RAG results spread more widely across the lower range, demonstrating not just better performance but remarkable consistency.

The stability of the hybrid system was particularly impressive, showing over 53% reduction in standard deviation for metrics like context precision and context entity recall while maintaining high mean scores across all measurements. This demonstrates that the hybrid system delivers greater reliability when handling complex industrial questions—a critical requirement for production deployment in high-stakes operational environments.

## Production Considerations and Tradeoffs

While the presentation is delivered by AWS and Rio Tinto representatives and naturally emphasizes the benefits of their approach, several production realities and tradeoffs should be considered. The hybrid RAG system is inherently more complex than vector-only approaches, requiring maintenance of two separate data stores (vector database and knowledge graph), more sophisticated ingestion pipelines, and more complex retrieval logic. This added complexity brings operational overhead in terms of system maintenance, monitoring, and debugging.

The system's deterministic behavior within a fixed search radius is valuable for consistency but may also limit adaptability in certain scenarios. The reliance on semantic chunking and entity extraction means the system's performance is heavily dependent on the quality of these upstream processes—if entity recognition fails or chunking is suboptimal, downstream retrieval quality will suffer.

The use of Amazon ECS for the retrieval system and Lambda functions for ingestion represents specific architectural choices that work well for Rio Tinto's scale and requirements, but other organizations might need different deployment approaches. The caching strategy, while improving performance, introduces additional complexity around cache invalidation and ensuring users receive up-to-date information when underlying documents change.

The evaluation using "LLM as a judge" over 100 questions is a reasonable approach but has known limitations—the judge LLM itself may have biases, and the quality of evaluation depends heavily on how evaluation criteria are defined. The presentation doesn't detail whether human evaluation was also conducted or how the 100 test questions were selected to ensure they were representative of actual usage patterns.

## Broader Context and Recommendations

The presentation positions hybrid RAG as unlocking the true potential of LLMs by combining the best of vector search (semantic similarity, filling relational gaps, enhancing context structure) and graph databases (explicit relationships, structured knowledge). The speakers recommend starting with separate knowledge bases for each domain to ensure good fit for outputs and to make it easier to apply guardrails against intellectual property concerns.

Using in-built Titan text embedding models ensures multimodal embeddings out of the box and multilingual support from the start, avoiding the need to restart when adding more language support. For organizations wanting to start immediately, Amazon OpenSearch Serverless and Amazon Neptune provide vector and graph database capabilities out of the box, enabling rapid development of hybrid RAG solutions.

The Rio Tinto case study demonstrates a mature, production-grade implementation of hybrid RAG for a specific enterprise use case—technical training and knowledge access in complex industrial operations. The system addresses real limitations of vector-only RAG while accepting the tradeoffs of increased complexity in exchange for significantly improved accuracy, consistency, and contextual richness. The rigorous evaluation approach and focus on deterministic behavior and caching for production performance show attention to operational requirements beyond just proof-of-concept functionality.