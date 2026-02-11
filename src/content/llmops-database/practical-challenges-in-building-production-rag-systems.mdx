---
title: "Practical Challenges in Building Production RAG Systems"
slug: "practical-challenges-in-building-production-rag-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a31366ac90cdd4566ff32a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:32.501Z"
  createdOn: "2025-02-05T07:29:42.099Z"
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "summarization"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "chunking"
  - "vector-search"
  - "semantic-search"
  - "model-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "langchain"
  - "fastapi"
  - "openai"
industryTags: "tech"
company: "Prolego"
summary: "A detailed technical discussion between Prolego engineers about the practical challenges of implementing Retrieval Augmented Generation (RAG) systems in production. The conversation covers key challenges including document processing, chunking strategies, embedding techniques, and evaluation methods. The team shares real-world experiences about how RAG implementations differ from tutorial examples, particularly in handling complex document structures and different data formats."
link: "https://www.youtube.com/watch?v=Y9qn4XGH1TI"
seo:
  title: "Prolego: Practical Challenges in Building Production RAG Systems - ZenML LLMOps Database"
  description: "A detailed technical discussion between Prolego engineers about the practical challenges of implementing Retrieval Augmented Generation (RAG) systems in production. The conversation covers key challenges including document processing, chunking strategies, embedding techniques, and evaluation methods. The team shares real-world experiences about how RAG implementations differ from tutorial examples, particularly in handling complex document structures and different data formats."
  canonical: "https://www.zenml.io/llmops-database/practical-challenges-in-building-production-rag-systems"
  ogTitle: "Prolego: Practical Challenges in Building Production RAG Systems - ZenML LLMOps Database"
  ogDescription: "A detailed technical discussion between Prolego engineers about the practical challenges of implementing Retrieval Augmented Generation (RAG) systems in production. The conversation covers key challenges including document processing, chunking strategies, embedding techniques, and evaluation methods. The team shares real-world experiences about how RAG implementations differ from tutorial examples, particularly in handling complex document structures and different data formats."
---

## Overview

This case study is derived from a panel discussion at Prolego, a consulting firm specializing in generative AI solutions, featuring engineers Kevin DeWalt, Justin, Ben, and Cam who share their practical experiences building RAG (Retrieval Augmented Generation) applications for enterprise clients. The discussion serves as a valuable reality check against the proliferation of simplified RAG tutorials, highlighting the significant gap between demo projects and production-ready implementations.

The conversation opens with a practical demonstration of RAG using ChatGPT, where the host shows how asking a simple question like "Can I bring my small dog Charlie to work?" yields generic responses without context, but becomes useful when augmented with actual company policy documents. This illustrates the core value proposition of RAG: customizing general-purpose LLMs like GPT-4 with organization-specific data without requiring model fine-tuning.

## The Gap Between Tutorials and Production Reality

One of the central themes of the discussion is how dramatically real-world RAG implementations differ from the simplified examples found in online tutorials. The engineers emphasize that most tutorials work with clean, well-structured text documents and carefully crafted queries that conveniently demonstrate the happy path. In contrast, production environments present messy, heterogeneous data sources including PDFs, Word documents, SharePoint sites, PowerPoint presentations, wikis, and emails.

The team notes that this is "yet another example of why we won't be replacing data scientists and programmers with AI anytime" soon, acknowledging that the fundamental data engineering challenges remain core to successful RAG deployments.

## Document Parsing and Chunking Challenges

Perhaps the most surprising insight from the discussion is that the most challenging aspect of RAG is often the step that appears simplest in architecture diagrams: converting source documents into meaningful chunks. Justin explains that documents like policies, procedures, and regulations have inherent hierarchical structure with sections and subsections, and naive chunking approaches can lose critical context.

The team provides a concrete example: a policy might state "this rule always applies except in the following conditions" followed by a list of exceptions. If you chunk sentence by sentence or even paragraph by paragraph, you might capture only the exception without the context that it's an exception to a particular rule. Another example from life insurance applications involves statements like "patient does not have cancer, diabetes, heart disease" where missing the "does not have" qualifier would be catastrophic.

In terms of practical workflow, Ben describes spending "a couple of days" getting document parsing libraries operational, writing heuristics to capture different document elements, sorting elements by position on the page, and using font or color information to identify headings and structure. The goal is to create a flat representation suitable for machine learning operations while preserving hierarchical relationships through keys or metadata.

The engineers recommend using a flat dictionary or list structure where each element's key encodes the document hierarchy (e.g., filename + chapter + subsection + paragraph), allowing both efficient batch processing and the ability to map back to original document structure when needed.

## Embedding and Retrieval Complexity

The discussion reveals that the "most similar" retrieval step involves considerable nuance beyond simply computing cosine similarity between query and document embeddings. Context size presents challenges at multiple levels: both the embedding model's context window for generating meaningful embeddings, and the generative LLM's context window which limits how much retrieved information can be passed through.

Justin explains the chunking tradeoff clearly: too small (individual sentences) loses context and produces embeddings that don't capture meaning well; too large (entire documents) tries to squeeze too much information into a single embedding representation, degrading retrieval quality. Finding the "sweet spot" requires experimentation with chunk sizes, overlap windows, and techniques that combine subsection text with parent section context.

The team discusses various retrieval enhancement techniques:

- **Query expansion**: Having an LLM rephrase the user's query several different ways before retrieval, expanding the vocabulary and increasing the likelihood of matching relevant documents
- **Summarization**: Using LLMs to create document summaries, then calculating embeddings over summaries or summarizing retrieved documents before passing to the generative LLM to fit more relevant content within context limits
- **Hybrid approaches**: Combining embedding similarity with metadata filters, rules, or heuristics
- **Fine-tuning**: Training custom embedding models or adapter layers between query embeddings and the similarity search to improve matching for specific domains

Ben mentions a Salesforce research paper on iterative summarization that progressively condenses text while preserving named entities and key information, improving the signal-to-noise ratio of retrieved content.

## Evaluation Challenges

The team emphasizes that RAG evaluation is significantly more complex than traditional ML evaluation metrics. Justin uses an analogy of grading a student essay: you can check grammar (the easy part), but evaluating thoroughness, appropriate length, and factual correctness is much harder.

A key concept discussed is **faithfulness** as distinct from correctness. A system might produce a correct answer but not based on the retrieved context—particularly when using powerful models like GPT-4 that have extensive world knowledge. Faithfulness measures whether the generated response is actually derived from the provided context rather than the model's parametric knowledge. This distinction is crucial for enterprise deployments where answers must be traceable to authoritative source documents.

The engineers acknowledge that many LLM evaluations rely on multiple-choice formats that are easy to score but don't reflect real-world usage patterns. Ben explains that faithfulness evaluation requires LLMs to evaluate other LLMs, generating and assessing statements about the relationship between questions, answers, and context—there's no simple numeric metric that captures everything.

Another evaluation challenge is the distribution of query difficulty. An evaluation set with "easy" questions that reliably retrieve correct documents will show good metrics, but users in production may ask questions in unexpected ways, use different vocabulary, or pose genuinely harder questions that the system wasn't designed for.

## Practical Recommendations

The team offers several pragmatic insights for production RAG deployments:

- **Invest in retrieval**: The "R" in RAG is arguably the most important and most neglected component. Better retrieval through improved chunking, embedding strategies, and hybrid approaches pays dividends throughout the pipeline.

- **Embrace data engineering fundamentals**: Despite the AI hype, RAG success depends on classic data science practices: exploratory data analysis, understanding data quality, and careful preprocessing.

- **Consider user experience shortcuts**: Sometimes a two-minute conversation with users about how to phrase queries can eliminate edge cases that would require months of engineering to handle automatically. Similarly, a simple "reasonableness check" call to an LLM before full processing can filter out nonsensical or out-of-scope queries early.

- **Plan for iteration**: Different domains, document types, and use cases require different approaches. Techniques that work for sports data may fail for financial regulations. Budget time for experimentation and domain-specific tuning.

- **Be realistic about evaluation**: Accept that there's no simple area-under-the-curve metric for RAG systems. Evaluation requires multiple dimensions (faithfulness, correctness, relevance, completeness) and often requires LLM-based evaluation itself.

## Technical Architecture Insights

The canonical RAG architecture discussed involves splitting source documents into chunks, generating embeddings via an embedding model, storing embeddings in a searchable format, embedding user queries through the same model, finding similar document embeddings, converting those back to text, and including that text in the prompt sent to a generative LLM.

The team notes that while this architecture looks simple, each box in the diagram conceals significant complexity. The embedding models may be pre-trained and commoditized, but everything around them—parsing, chunking, retrieval logic, context assembly, and evaluation—requires substantial engineering judgment and domain expertise.

This discussion provides a valuable counterweight to the "RAG is easy" narrative, demonstrating that production RAG applications are fundamentally data engineering and systems design challenges that happen to involve LLMs, rather than LLM projects that require a bit of data handling.