---
title: "Building and Optimizing a RAG-based Customer Service Chatbot"
slug: "building-and-optimizing-a-rag-based-customer-service-chatbot"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68272681ec60918b93a824a6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:08:23.783Z"
  createdOn: "2025-05-16T11:50:25.495Z"
llmopsTags:
  - "customer-support"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "structured-output"
  - "unstructured-data"
  - "rag"
  - "embeddings"
  - "chunking"
  - "semantic-search"
  - "vector-search"
  - "prompt-engineering"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "fastapi"
  - "elasticsearch"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "insurance"
company: "HDI"
summary: "HDI, a German insurance company, implemented a RAG-based chatbot system to help customer service agents quickly find and access information across multiple knowledge bases. The system processes complex insurance documents, including tables and multi-column layouts, using various chunking strategies and vector search optimizations. After 120 experiments to optimize performance, the production system now serves 800+ users across multiple business lines, handling 26 queries per second with 88% recall rate and 6ms query latency."
link: "https://www.youtube.com/watch?v=0wphTp29ZK0"
year: 2022
seo:
  title: "HDI: Building and Optimizing a RAG-based Customer Service Chatbot - ZenML LLMOps Database"
  description: "HDI, a German insurance company, implemented a RAG-based chatbot system to help customer service agents quickly find and access information across multiple knowledge bases. The system processes complex insurance documents, including tables and multi-column layouts, using various chunking strategies and vector search optimizations. After 120 experiments to optimize performance, the production system now serves 800+ users across multiple business lines, handling 26 queries per second with 88% recall rate and 6ms query latency."
  canonical: "https://www.zenml.io/llmops-database/building-and-optimizing-a-rag-based-customer-service-chatbot"
  ogTitle: "HDI: Building and Optimizing a RAG-based Customer Service Chatbot - ZenML LLMOps Database"
  ogDescription: "HDI, a German insurance company, implemented a RAG-based chatbot system to help customer service agents quickly find and access information across multiple knowledge bases. The system processes complex insurance documents, including tables and multi-column layouts, using various chunking strategies and vector search optimizations. After 120 experiments to optimize performance, the production system now serves 800+ users across multiple business lines, handling 26 queries per second with 88% recall rate and 6ms query latency."
---

## Summary

HDI is a German insurance company that built a production RAG (Retrieval-Augmented Generation) chatbot in collaboration with AWS Professional Services to help customer service agents quickly answer customer queries about insurance coverage. The project addressed a fundamental problem in insurance customer service: when customers call with questions like "Am I insured for this?", inexperienced agents struggle to find answers quickly because information is scattered across multiple SharePoints, databases, and documents—some exceeding 100 pages in length. Even experienced agents who might have bookmarks or memorized certain resources still face the challenge of navigating through lengthy documents to find specific information.

The solution consolidated all knowledge sources into a unified knowledge base accessible through a natural language chat interface, enabling agents to get precise answers without scrolling through extensive documentation. This case study is particularly valuable because it reflects real-world production learnings from a system that has been live for over a year.

## Architecture Overview

The team built a modular RAG architecture on AWS with several key components designed for flexibility and scalability. The architecture follows a typical RAG pattern with distinct ingestion and retrieval pipelines, but with notable customizations. The system was designed with a "Lego block" philosophy, allowing components to be swapped out as needed—for example, switching from Amazon Bedrock to OpenAI or a custom SageMaker endpoint.

Key architectural components include:
- A static web interface fronted by a load balancer
- An ingestion pipeline for processing and vectorizing documents
- OpenSearch as the vector store
- A feedback loop mechanism to capture positive and negative user feedback for continuous improvement
- Integration with external data sources outside HDI's core infrastructure

The team explicitly chose OpenSearch for its scalability (capable of storing billions of vectors and supporting thousands of queries per second), manageability as an AWS service, and alignment with their existing AWS infrastructure. However, they acknowledged that query latency was an area requiring optimization for their specific use case.

## The Experimentation Challenge

One of the most candid and valuable aspects of this case study is the team's discussion of the overwhelming number of hyperparameters and design decisions in RAG systems. They outlined how initial discussions about prompt engineering, LLM selection, and chunk size quickly expanded to include accuracy metrics, quantization, query rewriting, query expansion, guard rails, few-shot prompting, and evaluation approaches.

The team organized their experimentation across several key areas:

**Data Preparation and Ground Truth**: Before any optimization could begin, the team needed to establish ground truth datasets. This required engaging domain experts to create question-answer pairs that specified not just what answer was expected, but which documents (and which sections within those documents) contained the relevant information. This was particularly important given that some documents span 300+ pages with relevant information potentially on page 2 and page 300.

**Chunking Strategy**: The team experimented extensively with chunking approaches. They found that German language documents presented unique challenges due to compound words and abbreviations common in German corporate environments. Some embedding models couldn't handle these linguistic peculiarities effectively. The team used specialized chunking with markdown conversion, preserving document structure including headers (H1, H2, subheadings) and table headers within each chunk to maintain context.

**Embedding Models**: The choice of embedding model was complicated by language requirements. English-focused models like those from Cohere have limitations (e.g., 512 token input limits) that constrain options. The team considered training custom in-house models hosted on SageMaker endpoints to handle German-specific linguistic patterns.

**Vector Indexing with HNSW**: The team did deep optimization of OpenSearch's HNSW (Hierarchical Navigable Small World) algorithm parameters. They explained the algorithm using a library analogy: finding a book efficiently by following anchor points through levels until reaching the target. Key parameters they optimized included:
- M: The number of links/references each "book" (vector) has to neighboring vectors
- ef_construction: Controls how thoroughly the librarian (indexing process) searches when placing new items
- ef_search: The search-time equivalent affecting retrieval thoroughness

They noted the tradeoffs: higher values improve recall but increase latency and memory usage. They started with defaults prioritizing recall, then adjusted for faster response times as production requirements became clearer.

## Experimentation Process and Scale

The team conducted approximately 120 experiments before moving to MVP, a process that took around 3 months. They tracked custom metrics including document recall (which documents are relevant for answering a question) and passage recall (which specific parts within documents contain the answer). 

Their experimental results were visualized with candidates for MVP highlighted in green, organized across pre-processing and retriever categories. The team acknowledged that with approximately 30,000+ possible parameter combinations, they had to prioritize based on their use case rather than exhaustive testing. Their approach was to set a threshold (85% recall rate) and move to MVP once that was achieved, then continue iterative improvement with real user feedback.

One key insight from the Q&A session: the team noted that experiments haven't stopped—they've just shifted from large improvements to incremental percentage-point gains after the initial optimization phase.

## Document Parsing Challenges

A significant portion of the team's effort went into document parsing, particularly for complex PDFs. Challenges included:
- Multi-column layouts that switch between one and two columns within the same document
- Tables that span multiple pages, where headers need to be associated with data on subsequent pages
- Marketing tables with complex multi-row, multi-column structures
- Images and mixed content

The team used AWS Textract for layout recognition but acknowledged that table processing remains an unsolved challenge. They discussed various approaches: adding contextual information to each cell, treating cells individually, or summarizing table content.

## Hybrid Search and Reranking

The team implemented custom hybrid search combining vector and keyword-based approaches, along with custom Reciprocal Rank Fusion (RRF) for result merging. This was done approximately two years ago when OpenSearch's native hybrid search support was limited. They noted that newer versions of OpenSearch (2.19+) include improved RRF capabilities that would simplify this today.

Their retrieval pipeline also includes:
- Overfetching: Retrieving more documents than ultimately needed, then reranking
- Query expansion: Broadening queries to retrieve from different "edges"
- Guard rails: Preventing inappropriate content in outputs
- Few-shot prompting: Where appropriate for the use case

## Production Metrics and Feedback Loop

After over a year in production, the system demonstrates solid performance metrics:
- Query throughput: ~26 queries per second on peak days (with acknowledgment that weekends see minimal usage)
- Query latency: ~6 milliseconds for retrieval, with additional time for reranking and response generation
- Recall rate: 88%
- User base: Started with 350 users in one business line, scaled to 800 users across two business lines, with plans to reach 1,200 users by end of year

The feedback loop is a critical production component. Users can provide positive or negative feedback on answers, and negative feedback includes an optional text field for explanations. This feedback feeds back into the experimentation process for continuous improvement.

## Lessons Learned and Modern Recommendations

The team offered candid "hot takes" on what they would do differently if starting today:

**Start with a Baseline**: Use managed services like Amazon Bedrock Knowledge Bases to quickly establish a baseline. These handle ingestion out-of-the-box (files in S3, automatic chunking and embedding), providing a reference point to ensure custom optimizations are actually improvements.

**Leverage Modern Parsing Tools**: Amazon Bedrock Data Automation can convert PDFs and images to text, summarize content, and help create context-rich chunks—addressing many of the parsing challenges they struggled with manually.

**Accelerate Experimentation**: The open-source Flowtorch solution (linked in their presentation) can reduce experimentation timelines from months to hours by automating parameter sweeps.

**Establish KPIs Early**: Align all stakeholders (security, business, technical teams) on expectations and success metrics from the beginning. Create ground truth datasets early in the project.

## Broader Impact

The project served as a blueprint for RAG implementations across HDI. Other business lines have adopted the architecture, making modifications as needed ("putting some stuff here and there, removing some stuff") while maintaining the core modular design. This demonstrates the value of building flexible, well-documented architectures that can be adapted rather than rebuilt for each new use case.

## Technical Realism

This case study is notably honest about the complexities of production RAG systems. The speakers acknowledge:
- There's no universal answer for optimal chunk size—it requires experimentation per use case
- Table processing in documents remains an open challenge without a definitive solution
- Compliance and data security (can't store data on laptops) add real constraints to development workflows
- Production improvements after initial optimization become incremental rather than dramatic
- Some days have zero queries (weekends), highlighting the need for real usage patterns rather than synthetic benchmarks

The modular architecture and emphasis on continuous improvement through feedback loops reflect mature LLMOps practices that prioritize adaptability and long-term operational sustainability over initial launch.