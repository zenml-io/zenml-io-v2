---
title: "Enhanced Agentic RAG for On-Call Engineering Support"
slug: "enhanced-agentic-rag-for-on-call-engineering-support"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "683d38fb620a268544b8d464"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:10:29.273Z"
  createdOn: "2025-06-02T05:39:07.121Z"
llmopsTags:
  - "customer-support"
  - "document-processing"
  - "question-answering"
  - "chatbot"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "agent-based"
  - "chunking"
  - "reranking"
  - "langchain"
  - "monitoring"
  - "api-gateway"
  - "databases"
  - "elasticsearch"
  - "open-source"
  - "documentation"
  - "google-gcp"
industryTags: "tech"
company: "Uber"
summary: "Uber developed Genie, an internal on-call copilot that uses an enhanced agentic RAG (EAg-RAG) architecture to provide real-time support for engineering security and privacy queries through Slack. The system addressed significant accuracy issues in traditional RAG approaches by implementing LLM-powered agents for query optimization, source identification, and context refinement, along with enriched document processing that improved table extraction and metadata enhancement. The enhanced system achieved a 27% relative improvement in acceptable answers and a 60% relative reduction in incorrect advice, enabling deployment across critical security and privacy channels while reducing the support load on subject matter experts and on-call engineers."
link: "https://www.uber.com/en-NL/blog/enhanced-agentic-rag/"
year: 2025
seo:
  title: "Uber: Enhanced Agentic RAG for On-Call Engineering Support - ZenML LLMOps Database"
  description: "Uber developed Genie, an internal on-call copilot that uses an enhanced agentic RAG (EAg-RAG) architecture to provide real-time support for engineering security and privacy queries through Slack. The system addressed significant accuracy issues in traditional RAG approaches by implementing LLM-powered agents for query optimization, source identification, and context refinement, along with enriched document processing that improved table extraction and metadata enhancement. The enhanced system achieved a 27% relative improvement in acceptable answers and a 60% relative reduction in incorrect advice, enabling deployment across critical security and privacy channels while reducing the support load on subject matter experts and on-call engineers."
  canonical: "https://www.zenml.io/llmops-database/enhanced-agentic-rag-for-on-call-engineering-support"
  ogTitle: "Uber: Enhanced Agentic RAG for On-Call Engineering Support - ZenML LLMOps Database"
  ogDescription: "Uber developed Genie, an internal on-call copilot that uses an enhanced agentic RAG (EAg-RAG) architecture to provide real-time support for engineering security and privacy queries through Slack. The system addressed significant accuracy issues in traditional RAG approaches by implementing LLM-powered agents for query optimization, source identification, and context refinement, along with enriched document processing that improved table extraction and metadata enhancement. The enhanced system achieved a 27% relative improvement in acceptable answers and a 60% relative reduction in incorrect advice, enabling deployment across critical security and privacy channels while reducing the support load on subject matter experts and on-call engineers."
---

## Summary

Uber's case study describes the development and improvement of "Genie," an internal on-call copilot designed to support thousands of engineering queries across Slack channels. The system focuses specifically on the engineering security and privacy domain, where accuracy is critical to avoid providing incorrect guidance. The initial deployment using traditional RAG architecture failed to meet quality standards when evaluated against a curated test set of 100+ queries, prompting the team to develop an Enhanced Agentic RAG (EAg-RAG) architecture that claims to have achieved significantly improved response quality.

The project represents a practical example of taking an LLM-powered application from an initial prototype to a production-ready system capable of handling domain-specific queries with near-human precision. The case study offers valuable insights into the challenges of document processing, retrieval quality, evaluation automation, and the operationalization of agentic AI workflows.

## Problem Context

Genie was initially designed as a configurable framework allowing domain teams to deploy LLM-powered Slack bots overnight. The system integrated with various internal knowledge sources including engineering wikis, PDF documents stored in Terrablob, Google Docs, and custom documents. While the ML infrastructure was sophisticated, the quality of responses for domain-specific queries was insufficient for production deployment.

When tested against a golden set of 100+ queries curated by subject matter experts (SMEs), the system revealed significant gaps. Many answers were incomplete, inaccurate, or failed to retrieve relevant information from the knowledge base. The specific domain—engineering security and privacy—demanded high accuracy to avoid the risk of providing incorrect advice that could have security implications. This created a clear mandate: the system needed substantial improvements before rollout across critical Slack channels.

## Document Processing Challenges and Solutions

One of the most operationally relevant aspects of this case study is the detailed treatment of document processing challenges. The team discovered that existing PDF loaders (including SimpleDirectoryLoader from LlamaIndex and PyPDFLoader from LangChain) often failed to correctly capture structured text and formatting such as bullet points and complex tables. Many of the policy documents contained tables spanning multiple pages with nested cells, and when processed with traditional loaders, the extracted text lost its original formatting. Table cells became isolated text fragments disconnected from their row and column context, creating downstream problems for chunking, embedding, and retrieval.

The team experimented with several state-of-the-art PDF loaders including PdfPlumber, PyMuPDF, and LlamaParse, but found no universal solution that worked across all policy documents. This led to a strategic decision to transition from PDFs to Google Docs using HTML formatting for more accurate text extraction. Google Docs also offered built-in access control, which was crucial for security-sensitive applications where access control metadata needed to be indexed and used during answer generation.

Even with HTML formatting, traditional document loaders like html2text and LangChain's Markdownify had room for improvement, particularly with table formatting. To address this, the team built a custom Google document loader using the Google Python API, extracting paragraphs, tables, and table of contents recursively. For tables and structured text like bullet points, they integrated an LLM-powered enrichment process that prompted the LLM to convert extracted table contents into properly formatted markdown tables. They also enriched metadata with identifiers to distinguish table-containing text chunks, ensuring they remained intact during chunking.

The team added two-line summaries and keywords from each table to improve semantic search relevancy. Beyond standard metadata attributes like title, URL, and IDs, they introduced custom attributes including document summaries, FAQs, and relevant keywords. These enriched metadata served dual purposes: refining extracted context during pre/post-processing steps and directly enhancing retrieval accuracy.

## Agentic RAG Architecture

The core architectural innovation described is the Enhanced Agentic RAG (EAg-RAG) approach, which introduces LLM-powered agents to perform pre-requisite and post-requisite steps for more accurate retrieval and answer generation.

In the pre-processing step, two agents are employed: Query Optimizer and Source Identifier. The Query Optimizer refines queries that lack context or are ambiguous, and breaks down complex queries into multiple simpler queries for better retrieval. The Source Identifier then processes the optimized query to narrow down the subset of policy documents most likely to contain relevant answers. Both agents use document list artifacts (titles, summaries, and FAQs) fetched from an offline store as context, with few-shot examples provided to improve in-context learning for the Source Identifier.

The retrieval step employs a hybrid approach, introducing a BM25-based retriever alongside traditional vector search. The BM25 retriever fetches relevant document chunks using enriched metadata including summaries, FAQs, and keywords. The final retrieval output is the union of results from both methods.

The Post-Processor Agent performs de-duplication of retrieved document chunks and structures the context based on the positional order of chunks within original documents. Finally, the original user query, optimized auxiliary queries, and post-processed context are passed to the answer-generating LLM with specific instructions for answer construction.

## Evaluation and Testing Infrastructure

A significant operational challenge was the high SME involvement required for evaluation, which often took weeks. To address this, the team implemented an LLM-as-Judge framework for automated batch evaluation. This approach uses an LLM to assess chatbot responses within a given context, producing structured scores, correctness labels, and AI-generated reasoning and feedback.

The evaluation process consists of three stages: a one-time manual SME review where SMEs provide high-quality responses or feedback on chatbot-generated answers, batch execution where the chatbot generates responses based on its current version, and LLM evaluation where the LLM-as-Judge module evaluates responses using the user query, SME response, and evaluation instructions as context along with additional content retrieved from source documents.

The LLM-as-Judge module scores responses on a 0-5 scale and provides reasoning for evaluations, enabling feedback to be incorporated into future experiments. Integrating additional documents from the knowledge base enhances the LLM's domain awareness, improving evaluation reliability for complex domain-specific topics. This automation reduced experiment evaluation time from weeks to minutes, enabling faster iteration cycles.

## Technical Stack and Implementation

The team built most components of the agentic RAG framework using Langfx, described as Uber's internal LangChain-based service within Michelangelo (Uber's ML platform). For agent development and workflow orchestration, they used LangGraph, which they describe as a scalable yet developer-friendly framework for agentic AI workflows. While the current implementation follows a sequential flow, integrating with LangGraph allows for future expansion into more complex agentic frameworks.

The system integrates with multiple knowledge sources and uses vector storage for embeddings. Artifacts like document lists and FAQs from the enrichment process are saved in an offline feature store for later use in answer generation.

## Results and Impact

The case study reports that the improvements resulted in a 27% relative increase in the percentage of acceptable answers and a 60% relative reduction in incorrect advice. These metrics enabled the copilot to scale across multiple security and privacy help channels. The team reports a measurable reduction in support load for on-call engineers and SMEs, allowing them to focus on more complex tasks.

An interesting secondary effect noted is that demonstrating how better-quality source documentation improves bot performance has encouraged teams to maintain more accurate and useful internal documentation. The enhancements have been designed as configurable components within the Michelangelo Genie framework, making them adoptable by other domain teams across Uber.

## Critical Assessment

While the reported improvements are substantial, several aspects warrant critical consideration. The metrics are reported as relative improvements without absolute baseline figures, making it difficult to assess the actual performance levels achieved. The claim of "near-human precision" in the title is aspirational language that should be viewed cautiously—the actual evaluation framework compares against SME-provided responses, which is a proxy for human-level quality but not necessarily equivalent.

The transition from PDFs to Google Docs represents a pragmatic solution but may not be universally applicable for organizations with different document management practices. The reliance on Google Docs for access control is noted as a benefit, though the implementation details of how this access control is enforced during RAG are not fully elaborated.

The LLM-as-Judge approach, while enabling faster iteration, introduces its own potential biases and limitations. The framework's reliability for domain-specific complex topics is claimed to be enhanced by including additional documents, but this adds complexity and computational cost to the evaluation process.

## Future Directions

The case study outlines several planned improvements including extending document enrichment to support multi-modal content including images, implementing iterative Chain-of-RAG approaches for multi-hop reasoning queries, introducing a self-critique agent after answer generation to dynamically refine responses and reduce hallucinations, and allowing LLM-powered agents to choose tools dynamically based on query type and complexity.

These planned enhancements suggest an evolution toward more sophisticated agentic architectures with tool use and self-refinement capabilities, reflecting broader trends in the LLMOps space toward more autonomous and capable AI systems.