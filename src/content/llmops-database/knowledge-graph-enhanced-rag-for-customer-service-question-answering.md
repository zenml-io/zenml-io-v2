---
title: "Knowledge Graph-Enhanced RAG for Customer Service Question Answering"
slug: "knowledge-graph-enhanced-rag-for-customer-service-question-answering"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adbdb58519648e4b0463e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:50.304Z"
  createdOn: "2025-12-23T18:13:47.076Z"
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "knowledge-distillation"
  - "qdrant"
  - "pytorch"
  - "fastapi"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "Linkedin"
summary: "LinkedIn's customer service team faced challenges with retrieving relevant past issue tickets to resolve customer inquiries efficiently. Traditional text-based retrieval-augmented generation (RAG) approaches treated historical tickets as plain text, losing crucial structural information and inter-issue relationships. LinkedIn developed a novel system that integrates RAG with knowledge graphs, constructing tree-structured representations of issue tickets while maintaining explicit and implicit connections between issues. The system uses GPT-4 for parsing and answer generation, E5 embeddings for semantic retrieval, and converts user queries into graph database queries for precise subgraph extraction. Deployed across multiple product lines, the system achieved a 77.6% improvement in MRR, a 0.32 increase in BLEU score, and reduced median issue resolution time by 28.6% over six months of production use."
link: "https://arxiv.org/html/2404.17723"
year: 2024
seo:
  title: "Linkedin: Knowledge Graph-Enhanced RAG for Customer Service Question Answering - ZenML LLMOps Database"
  description: "LinkedIn's customer service team faced challenges with retrieving relevant past issue tickets to resolve customer inquiries efficiently. Traditional text-based retrieval-augmented generation (RAG) approaches treated historical tickets as plain text, losing crucial structural information and inter-issue relationships. LinkedIn developed a novel system that integrates RAG with knowledge graphs, constructing tree-structured representations of issue tickets while maintaining explicit and implicit connections between issues. The system uses GPT-4 for parsing and answer generation, E5 embeddings for semantic retrieval, and converts user queries into graph database queries for precise subgraph extraction. Deployed across multiple product lines, the system achieved a 77.6% improvement in MRR, a 0.32 increase in BLEU score, and reduced median issue resolution time by 28.6% over six months of production use."
  canonical: "https://www.zenml.io/llmops-database/knowledge-graph-enhanced-rag-for-customer-service-question-answering"
  ogTitle: "Linkedin: Knowledge Graph-Enhanced RAG for Customer Service Question Answering - ZenML LLMOps Database"
  ogDescription: "LinkedIn's customer service team faced challenges with retrieving relevant past issue tickets to resolve customer inquiries efficiently. Traditional text-based retrieval-augmented generation (RAG) approaches treated historical tickets as plain text, losing crucial structural information and inter-issue relationships. LinkedIn developed a novel system that integrates RAG with knowledge graphs, constructing tree-structured representations of issue tickets while maintaining explicit and implicit connections between issues. The system uses GPT-4 for parsing and answer generation, E5 embeddings for semantic retrieval, and converts user queries into graph database queries for precise subgraph extraction. Deployed across multiple product lines, the system achieved a 77.6% improvement in MRR, a 0.32 increase in BLEU score, and reduced median issue resolution time by 28.6% over six months of production use."
---

## Overview and Context

LinkedIn deployed a production LLM system for customer service question answering that addresses fundamental limitations in traditional RAG approaches. The system serves LinkedIn's customer service team across multiple product lines and has been operational for approximately six months as of the 2024 publication date. The core innovation lies in replacing flat text-based retrieval with a knowledge graph structure that preserves both the internal structure of individual issue tickets and the relationships between different issues.

The problem space centers on customer service technical support, where representatives need to quickly find and reference past issues similar to current customer inquiries. With over 1 billion LinkedIn members and a complex product ecosystem, the volume and variety of customer service tickets created a challenging retrieval and synthesis problem. Traditional approaches that chunk historical tickets into fixed-length text segments for embedding-based retrieval suffered from two critical issues: loss of structural information about issue components (like problem description, reproduction steps, and solutions), and fragmentation of logically connected content across chunk boundaries.

## System Architecture and LLMOps Implementation

The production system operates in two distinct phases that exemplify modern LLMOps practices: an offline knowledge graph construction phase and an online retrieval and question-answering phase.

### Knowledge Graph Construction Phase

The offline construction phase transforms historical issue tracking tickets (specifically Jira tickets) into a comprehensive knowledge graph. This dual-level architecture separates intra-issue structure from inter-issue relationships. Each ticket is parsed into a tree structure where nodes represent distinct sections like Summary, Description, Priority, Steps to Reproduce, and Fix Solution. The system employs a hybrid parsing methodology that balances deterministic rule-based extraction with LLM-powered flexible parsing. Rule-based extraction handles well-defined fields like code sections identified through keywords, while GPT-4 parses more complex unstructured text guided by a YAML template that defines the expected ticket structure.

The LLM-based parsing represents a sophisticated production use case where the model receives the unparsed text portions along with the structural template and generates structured tree representations. This approach demonstrates prompt engineering at scale, where the template serves as a form of structured output specification that guides the LLM to produce consistent graph representations across thousands of tickets.

Inter-ticket connections are established through both explicit and implicit relationships. Explicit connections derive from metadata fields in Jira, such as "cloned from," "related to," or "caused by" relationships that issue trackers naturally capture. Implicit connections use semantic similarity between ticket titles, computing cosine similarity between E5 embeddings and applying a threshold to identify semantically related issues. This hybrid connection strategy creates a rich network that captures both documented relationships and discovered semantic similarities.

For production retrieval, the system generates embeddings for text-rich nodes using pre-trained models (BERT and E5), storing these in a vector database (Qdrant). The node-level embedding generation solves the chunking problem elegantly: since each node represents a cohesive section of a ticket, the text typically fits within embedding model context length constraints. When lengthy text requires segmentation, the semantic coherence within a single section ensures that chunks remain meaningful, avoiding the cross-topic fragmentation that plagues traditional chunking approaches.

### Retrieval and Question Answering Phase

The online serving phase demonstrates sophisticated orchestration of multiple LLM capabilities. When a user submits a query, the system first uses GPT-4 to perform entity extraction and intent detection. The LLM parses the query into key-value pairs where keys correspond to node types in the graph template (like "issue summary" or "issue description") and values contain the extracted information. Simultaneously, the system identifies the user's intent—what aspects of historical issues they seek, such as "fix solution" or "steps to reproduce." This structured query understanding, guided by the same YAML template used in construction, ensures alignment between query parsing and graph structure.

The retrieval process operates in two stages that balance semantic search with structured query capabilities. First, embedding-based retrieval identifies the top K most relevant historical tickets by computing cosine similarities between query entity values and corresponding graph nodes. The scoring aggregates similarities across multiple entity matches, implementing a weighted retrieval where tickets matching multiple query aspects rank higher. This node-level matching that aggregates to ticket-level scores represents a more nuanced retrieval strategy than simple document-level embedding similarity.

Second, the system reformulates the user's natural language query to reference specific ticket IDs retrieved in the first stage, then uses GPT-4 to translate this reformulated query into Cypher (Neo4j's graph query language). This LLM-to-graph-query translation represents an advanced production pattern where the model serves as a natural language interface to structured data stores. The generated Cypher queries can traverse graph relationships to extract not just individual nodes but entire subgraphs spanning multiple tickets when necessary. For example, a query about reproducing an issue might generate Cypher that follows HAS_DESCRIPTION and HAS_STEPS_TO_REPRODUCE relationships to extract the relevant sections.

The answer generation phase uses GPT-4 as a decoder, combining the retrieved subgraph data with the original query to synthesize responses. The system implements a fallback mechanism crucial for production reliability: if Cypher query execution fails or encounters issues, the system reverts to traditional text-based retrieval, ensuring service continuity even when the more sophisticated graph-based approach encounters edge cases.

## Production Deployment and Operational Considerations

The deployment strategy reveals mature LLMOps practices. LinkedIn rolled out the system to their customer service team with a randomized controlled trial design, splitting representatives into tool-using and non-tool-using groups to measure real-world impact. This A/B testing approach at the user group level, rather than request level, accounts for learning effects and workflow integration that per-request experiments might miss.

The system processes queries across multiple LinkedIn product lines, indicating successful generalization of the graph template and parsing logic. The six-month production runtime provides substantial operational learning, though the paper doesn't detail specific reliability metrics, model drift monitoring, or update cadences that would complete the LLMOps picture.

The choice of GPT-4 as the primary LLM indicates a reliance on external model APIs for critical production functionality. This introduces dependencies on OpenAI's service availability and pricing, though the paper doesn't discuss cost optimization strategies, caching approaches, or considerations around fine-tuning smaller models for specific subtasks. The use of E5 embeddings similarly represents a dependency on open-source models that could be updated or customized based on domain-specific performance requirements.

## Evaluation and Results

The evaluation demonstrates rigorous measurement across both retrieval and generation quality. For retrieval, the system achieved dramatic improvements: 77.6% increase in Mean Reciprocal Rank (from 0.522 to 0.927), perfect recall at K=3 (from 0.640 to 1.000), and substantial NDCG improvements. These metrics indicate that relevant historical issues now consistently appear in top positions rather than being buried in result lists.

Generation quality metrics show similar improvements: BLEU scores increased from 0.057 to 0.377, METEOR from 0.279 to 0.613, and ROUGE from 0.183 to 0.546. These standard NLG metrics suggest that generated answers more closely match ground truth solutions, though the paper acknowledges these were measured against a curated "golden" dataset of typical queries and authoritative solutions.

The production impact measurement provides the most compelling validation: median issue resolution time decreased by 28.6%, from 7 hours to 5 hours. Mean resolution time dropped from 40 hours to 15 hours, and 90th percentile time decreased from 87 to 47 hours. These real-world efficiency gains demonstrate that improved retrieval and answer quality translate to meaningful operational impact.

## Technical Trade-offs and Limitations

While the paper presents impressive results, several LLMOps considerations deserve scrutiny. The system's reliance on GPT-4 for multiple critical functions—query parsing, ticket parsing, and answer generation—creates potential latency, cost, and reliability concerns. Each query requires multiple LLM calls: entity extraction, intent detection, query reformulation, and answer synthesis. The paper doesn't discuss prompt optimization, caching strategies, or latency budgets that production systems typically require.

The knowledge graph construction phase, while offline, still requires processing potentially thousands of historical tickets through GPT-4. The paper doesn't address update frequency, incremental graph updates, or handling of new ticket structures that might not conform to the template. In production customer service environments where new issue patterns emerge continuously, static graph construction could lead to degraded performance over time.

The evaluation methodology, while showing strong improvements, was conducted on a curated dataset that may not fully represent the long tail of unusual queries or edge cases that production systems encounter. The six-month deployment provides some confidence in real-world robustness, but the paper lacks discussion of failure modes, error analysis, or monitoring approaches that would reveal how the system handles distribution shift or unexpected query patterns.

The fallback to traditional text-based retrieval when graph queries fail represents good engineering practice for production reliability, but the paper doesn't quantify fallback frequency or analyze cases where the graph-based approach proves inadequate. Understanding these failure modes would provide valuable insights for practitioners implementing similar systems.

## Future Directions and Operational Maturity

The authors identify several future research directions that align with LLMOps concerns. Automated graph template extraction would reduce manual configuration and improve system adaptability to new domains or issue tracking systems. This addresses a key operational pain point: the current approach requires domain expertise to define the YAML template that guides both parsing and querying.

Dynamic knowledge graph updates based on user queries represent an interesting online learning direction. As customer service representatives interact with the system, their queries and the solutions they ultimately apply could provide training signal for improving retrieval or identifying gaps in the historical knowledge base. This feedback loop could enable continuous improvement beyond the initial offline graph construction.

The system's applicability beyond customer service remains unexplored but promising. Any domain with structured historical documents and query patterns could potentially benefit from the knowledge graph-enhanced RAG approach. Technical documentation, legal case research, medical case histories, or software bug tracking represent natural extension points where the preservation of document structure and inter-document relationships would provide similar benefits.

From an LLMOps perspective, the system demonstrates several mature practices: clear separation of offline and online phases, fallback mechanisms for reliability, rigorous evaluation across multiple metrics, and real-world deployment with impact measurement. However, the paper leaves open questions about cost management, latency optimization, model monitoring, and handling of evolving data distributions that would complete the production system picture. The reliance on proprietary models (GPT-4) versus the possibility of fine-tuned open-source alternatives represents a strategic decision point that the paper doesn't explore but that production teams would need to consider based on their specific requirements for cost, latency, data privacy, and customization.