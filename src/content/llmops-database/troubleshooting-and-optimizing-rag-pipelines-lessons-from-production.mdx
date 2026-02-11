---
title: "Troubleshooting and Optimizing RAG Pipelines: Lessons from Production"
slug: "troubleshooting-and-optimizing-rag-pipelines-lessons-from-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d0ac894da657c42b752"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:42:33.867Z"
  createdOn: "2024-11-21T14:00:42.204Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "databases"
  - "document-processing"
  - "embeddings"
  - "fine-tuning"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "rag"
  - "regulatory-compliance"
  - "reliability"
  - "reranking"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "structured-output"
  - "vector-search"
industryTags: "insurance"
company: "Lemonade"
summary: "A comprehensive analysis of common challenges and solutions in implementing RAG (Retrieval Augmented Generation) pipelines at Lemonade, an insurance technology company. The case study covers issues ranging from missing content and retrieval problems to reranking challenges, providing practical solutions including data cleaning, prompt engineering, hyperparameter tuning, and advanced retrieval strategies."
link: "https://www.youtube.com/watch?v=XGJOU2sysjg"
year: 2024
seo:
  title: "Lemonade: Troubleshooting and Optimizing RAG Pipelines: Lessons from Production - ZenML LLMOps Database"
  description: "A comprehensive analysis of common challenges and solutions in implementing RAG (Retrieval Augmented Generation) pipelines at Lemonade, an insurance technology company. The case study covers issues ranging from missing content and retrieval problems to reranking challenges, providing practical solutions including data cleaning, prompt engineering, hyperparameter tuning, and advanced retrieval strategies."
  canonical: "https://www.zenml.io/llmops-database/troubleshooting-and-optimizing-rag-pipelines-lessons-from-production"
  ogTitle: "Lemonade: Troubleshooting and Optimizing RAG Pipelines: Lessons from Production - ZenML LLMOps Database"
  ogDescription: "A comprehensive analysis of common challenges and solutions in implementing RAG (Retrieval Augmented Generation) pipelines at Lemonade, an insurance technology company. The case study covers issues ranging from missing content and retrieval problems to reranking challenges, providing practical solutions including data cleaning, prompt engineering, hyperparameter tuning, and advanced retrieval strategies."
---

## Overview

This case study comes from a presentation by a team lead at Lemonade, a technology-oriented insurance company that sells five insurance products to millions of customers worldwide. What makes Lemonade particularly interesting from an LLMOps perspective is their long-standing commitment to automation and chat-based interfaces. Since 2015, well before the current wave of generative AI, the company has used chat interfaces as the primary means of customer interaction for support and claims submission. Today, 50% of insurance claims submitted to Lemonade are handled fully automatically, with the presenter showing an example of a customer receiving claim approval and reimbursement within just two seconds.

The presentation focuses on practical lessons learned from building and maintaining RAG (Retrieval Augmented Generation) pipelines in production, combining research insights with real-world operational experience. The speaker also hosts a podcast called "TES" for LLM developers, suggesting deep involvement in the broader LLM community.

## RAG Pipeline Architecture

The presenter outlines a high-level RAG pipeline flowchart that serves as the foundation for discussing various pain points. The pipeline is divided into two main stages:

**Index Stage (Offline):** This involves taking the knowledge base, passing documents through a chunker to create chunks, processing each chunk through an LLM for tasks like summarization, generating embeddings, and storing everything in a vector database.

**Query Stage (Online):** When a user asks a question, it goes through query rewriting/embedding, then the retriever fetches the top-k most relevant documents from the vector database. A re-ranker then selects the top-n most relevant from those k documents, and finally a generator/composer LLM writes the final response.

This distinction between the index and query stages is important because different pain points manifest at different stages, and solutions often target one stage or the other specifically.

## Pain Point 1: Missing Content

The first major issue discussed is when the relevant content simply doesn't exist in the knowledge base or vector database. This typically leads to two outcomes: hallucinations (the LLM invents an answer) or, in better cases, the model admits it doesn't know the answer.

**Solutions for Missing Content:**

The presenter recommends data cleaning as a first step. Real-world data often contains contradictions, noise, XML tags from web scraping, and other irrelevant content. Tools mentioned include "Unstructured" which provides out-of-the-box data cleaning capabilities, and "Lilac" which offers more NLP-focused and classic approaches.

Prompt engineering solutions include adding explicit instructions like "if you don't know, say you don't know" to cover some edge cases. Another approach is implementing a "critic" - an additional LLM call that examines the generated answer, the context, and the user's question to determine whether the answer is actually grounded in the context and addresses the question. This provides a confidence score for whether the response is informative, preventing the system from returning nonsense to customers.

The final solution category involves better document processing tools. When dealing with complex documents like PDFs containing tables, standard parsers often fail. Tools like Mathpix and GCP's Document AI help with better extraction of content from complex file formats, which prevents downstream issues in the pipeline.

## Pain Points 2 & 3: Retriever and Re-ranker Failures

Two closely related issues are when the retriever doesn't return the relevant document in the top-k results, or when the re-ranker doesn't include it in the final top-n selection.

To clarify the terminology: if you have 1,000 documents in your database, the retriever's job is to return the top-k most relevant (e.g., 10), and the re-ranker's job is to narrow those down to the top-n (e.g., 1). The specific numbers depend on the application.

**Detecting These Issues:**

The presenter emphasizes that you need a proper evaluation dataset - a list of queries where you know which documents should be retrieved. You can then run just the retriever to verify that the expected documents appear in its top-k results.

**Solutions for Retriever Issues:**

Hyperparameter tuning is recommended, specifically mentioning LlamaIndex's "param tuner" CLI tool that performs grid search optimization on both chunk size and the k value for retrieval automatically.

Fine-tuning the embedding model is another solution. The presenter notes that while fine-tuning LLMs can be intimidating (requiring knowledge of libraries like LoRA and QLoRA, GPUs, and significant resources), fine-tuning embedding models is generally much simpler and can be a good solution when the retriever isn't performing well due to domain-specific language.

Processing/preprocessing strategies include summarizing chunks before embedding. Documents can also be transformed to different semantic spaces - for example, if users ask questions but your documents are in "answer space," you can use techniques like HyDE (Hypothetical Document Embeddings) where you ask an LLM to hallucinate documents that could answer the user's question, then use the language of those hypothetical documents for the actual retrieval.

More advanced retrieval strategies mentioned include RAR (though not fully expanded), knowledge graphs, and sub-query decomposition. The sub-query approach is particularly useful for complex queries - for example, "What are the opening hours of your branch closest to New York?" contains two sub-queries: finding the closest branch to New York, and then finding its opening hours. Breaking these apart can significantly improve retrieval performance.

**Solutions for Re-ranker Issues:**

Two main approaches are suggested. First, increasing the top-n value - either by using LLMs that can handle more context (like Gemini with its 2 million token context window) or by adjusting the product to show multiple recommendations instead of just one (more of a product decision than a data science one).

The presenter particularly recommends LLM-based rankers for their flexibility and power. These work by passing the retrieved documents to an LLM with specific rules that help it determine the correct ranking.

## Pain Point 4: Answer Not Extracted Properly

This occurs when retrieval and re-ranking succeed, but the final LLM response doesn't properly answer the user's question. Common causes include:

- Too much information in the context (top-n too large)
- Contradictory information in the retrieved documents
- High complexity tasks

**Solutions:**

For contradictions and noise, cleaning the data remains the primary solution. Compression techniques can help when there's too much context - this can mean summarizing chunks during the offline indexing phase to reduce context size that the LLM needs to process at query time.

For high-complexity tasks, the recommendation is to split complex tasks into sub-tasks rather than expecting the LLM to handle everything in one pass.

## Pain Point 5: Wrong Output Format

This is described as solvable in 99.9% of cases. It occurs when you want structured output like tables or lists, but the LLM doesn't comply properly - adding extra text, producing malformed JSON, etc.

**Solutions:**

Using API features like JSON mode in OpenAI or function calling provides structured output guarantees. Using XML tags in prompts and providing examples can also help. The presenter mentions Langchain's capabilities, which include built-in retry mechanisms for handling parsing failures.

## Pain Point 6: Incorrect Specificity

This is a bidirectional problem. Sometimes the system gives overly general answers to specific questions (e.g., asking about opening hours for a specific branch but getting a generic answer about how hours vary by location). Other times, specific answers are given to general questions.

**Solutions:**

A "contextualizer" adds an additional step before the final composition. This step examines what the user wants, looks at the retrieved documents, decides which parts are relevant, and removes the rest before passing to the final generator.

Supporting follow-up questions is also recommended as a product-level solution to help users refine their queries.

## Key Takeaways and Best Practices

The presenter concludes with three main takeaways for LLMOps practitioners:

**Profiling First:** Before jumping to solutions, understand where the problem actually originates in the pipeline. The presenter shares an example where the team had various ideas about what was wrong (maybe the prompt, maybe the data), but the first step should always be identifying the actual source of incorrect answers.

**Iterate:** Try different solutions, see what works, and make incremental progress rather than attempting to fix everything at once.

**Data is King:** When something isn't working, the first instinct should always be to examine the data and find ways to improve it. This is consistently the highest-impact intervention.

The presentation reflects real production experience at scale, dealing with millions of customers in a high-stakes domain (insurance claims). The combination of practical solutions, specific tool recommendations, and emphasis on systematic debugging makes this a valuable resource for teams building production RAG systems. The fact that Lemonade has been using chat interfaces since 2015 and now handles half of their claims automatically speaks to the maturity of their approach and the importance of the lessons shared.