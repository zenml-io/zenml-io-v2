---
title: "Building a RAG-Based Documentation Chatbot: Lessons from Fiddler's LLMOps Journey"
slug: "building-a-rag-based-documentation-chatbot-lessons-from-fiddler-s-llmops-journey"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bbe39669800599ae908"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:35:27.722Z"
  createdOn: "2024-11-21T13:55:10.660Z"
llmopsTags:
  - "chatbot"
  - "chunking"
  - "databases"
  - "document-processing"
  - "documentation"
  - "embeddings"
  - "error-handling"
  - "guardrails"
  - "langchain"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "reliability"
  - "scalability"
  - "semantic-search"
  - "system-prompts"
  - "wandb"
industryTags: "tech"
company: "Fiddler"
summary: "Fiddler AI developed a documentation chatbot using OpenAI's GPT-3.5 and Retrieval-Augmented Generation (RAG) to help users find answers in their documentation. The project showcases practical implementation of LLMOps principles including continuous evaluation, monitoring of chatbot responses and user prompts, and iterative improvement of the knowledge base. Through this implementation, they identified and documented key lessons in areas like efficient tool selection, query processing, document management, and hallucination reduction."
link: "https://www.fiddler.ai/resources/10-lessons-from-developing-an-ai-chatbot-using-retrieval-augmented-generation"
year: 2023
seo:
  title: "Fiddler: Building a RAG-Based Documentation Chatbot: Lessons from Fiddler's LLMOps Journey - ZenML LLMOps Database"
  description: "Fiddler AI developed a documentation chatbot using OpenAI's GPT-3.5 and Retrieval-Augmented Generation (RAG) to help users find answers in their documentation. The project showcases practical implementation of LLMOps principles including continuous evaluation, monitoring of chatbot responses and user prompts, and iterative improvement of the knowledge base. Through this implementation, they identified and documented key lessons in areas like efficient tool selection, query processing, document management, and hallucination reduction."
  canonical: "https://www.zenml.io/llmops-database/building-a-rag-based-documentation-chatbot-lessons-from-fiddler-s-llmops-journey"
  ogTitle: "Fiddler: Building a RAG-Based Documentation Chatbot: Lessons from Fiddler's LLMOps Journey - ZenML LLMOps Database"
  ogDescription: "Fiddler AI developed a documentation chatbot using OpenAI's GPT-3.5 and Retrieval-Augmented Generation (RAG) to help users find answers in their documentation. The project showcases practical implementation of LLMOps principles including continuous evaluation, monitoring of chatbot responses and user prompts, and iterative improvement of the knowledge base. Through this implementation, they identified and documented key lessons in areas like efficient tool selection, query processing, document management, and hallucination reduction."
---

## Overview

Fiddler, an AI observability company, developed their own RAG-based documentation chatbot to help users easily find answers from their product documentation. This case study, presented as a guide sharing "10 Lessons" from their development experience, provides practical insights into deploying LLMs in production for conversational AI applications. The chatbot was built using OpenAI's GPT-3.5 augmented with Retrieval-Augmented Generation (RAG), and was monitored using Fiddler's own LLM Observability solutions. While this is a vendor-produced guide that naturally promotes their observability tools, it contains substantive technical lessons applicable to anyone building RAG-based chatbot systems.

## Technical Architecture and Tooling

The chatbot's architecture combines the generative capabilities of GPT-3.5 with the precision of information retrieval through RAG. This approach allows the chatbot to access and integrate external knowledge sources (Fiddler's documentation) to provide accurate and contextually relevant responses rather than relying solely on the LLM's training data.

### LangChain Integration

A significant portion of the development leveraged LangChain as the foundational framework. The case study describes LangChain as a "Swiss Army knife" for chatbot developers, providing essential functionality that would otherwise require extensive custom development. Key benefits included:

- Simplified integration of external knowledge sources into the chatbot pipeline
- Built-in support for preprocessing user questions before retrieval
- Maintenance of chat memory for coherent conversational experiences across sessions
- Flexibility to adapt to evolving project needs, whether tweaking retrieval mechanisms or experimenting with different prompt designs

The use of LangChain allowed developers to focus on refining chatbot capabilities rather than building infrastructure from scratch. The case study notes that single lines of LangChain code can replace significant amounts of manual coding for common functions.

## Query Processing Challenges

One of the most substantial technical challenges discussed involves processing user queries effectively. Natural language presents significant complexity because users can ask about the same topic in myriad ways using diverse structures, synonyms, and colloquial expressions.

A particularly challenging issue arises from pronouns and referential expressions like "this," "that," or "the aforementioned point." These work naturally in human conversations where both parties share contextual understanding, but require sophisticated processing for chatbots. The solution involves multi-layered query processing strategies:

- Basic preprocessing including tokenization and normalization
- Advanced techniques like context tracking and referential resolution
- Integration of machine learning models trained on diverse datasets to better predict user intent
- Understanding of domain-specific user patterns and jargon

LangChain's question generator template enables processing questions with another LLM to resolve ambiguities before retrieval, though the case study notes that sometimes the original unprocessed query retrieves more relevant documents than processed versions.

## Document Management and Chunking Strategies

The case study dedicates significant attention to document management strategies, particularly addressing the context window limitations inherent to LLMs. Since models can only process limited amounts of text at once, strategic filtering of documents based on query relevance becomes essential.

The concept of "chunking" involves breaking large documents into smaller, manageable parts that fit within context window constraints. However, effective chunking requires more than simple division:

- Each chunk should contain metadata or continuity statements linking it to other parts of the original document
- When chunks are converted to embeddings, related content should be positioned closer together in the embedding space
- This proximity ensures the chatbot can retrieve all relevant parts of a document in response to a query

The case study provides a concrete example of a long document called "Customer Churn Prediction" that was chunked with "slugs" (presumably identifiers or connection markers) serving as connectors between chunks.

An important note acknowledges that OpenAI's developer day updates significantly increased context window length, potentially reducing the need for chunking in some scenarios. This observation highlights the rapidly evolving nature of LLMOps practices.

## Multiple Retrieval Strategies

Rather than relying on a single search query, the chatbot employs multiple retrievals to find comprehensive and relevant information. This approach addresses several scenarios:

- Original user queries without preprocessing may sometimes retrieve more relevant documents than processed versions, so both should be tried
- Complex or multi-faceted queries may require retrieval from multiple perspectives
- Different interpretations of queries may lead to different relevant document sets

Synthesizing information from multiple retrievals requires additional strategies:

- Ranking algorithms that assess relevance of each retrieved document to the user's query
- Natural language processing techniques to identify common or complementary themes among retrieved documents
- Strategic evaluation and integration of information to form coherent responses

## Prompt Engineering as Iterative Process

The case study emphasizes that prompt engineering is not a one-time activity but an ongoing, iterative process. With new prompt building techniques emerging regularly, an approach tailored to domain-specific use cases becomes essential.

Key aspects of their prompt engineering approach include:

- Designing initial prompt templates based on best practices and theoretical understanding
- Gathering data from real user interactions to understand prompt performance
- Evaluating whether user queries are being understood correctly and whether relevant information is being retrieved
- Experimenting with different strategies such as varying prompt verbosity, incorporating context from previous interactions, and explicitly guiding the model to prioritize certain information types

The case study includes examples showing how prompts evolved over time with additional instructions to generate more accurate and helpful responses.

## Human Feedback Integration

User feedback emerges as a critical component for continuous improvement. The case study makes an interesting observation about feedback patterns: users tend to provide more detailed feedback when dissatisfied, creating potential bias toward negative experiences while overlooking areas of good performance.

To address this challenge, the implementation includes multiple feedback mechanisms:

- Simple, quick feedback options like thumbs up/thumbs down buttons accompanying every response
- Optional comment boxes for users willing to provide more detailed feedback
- Anonymous feedback options to encourage candid responses

Making the feedback process intuitive and unobtrusive is emphasized as critical for encouraging participation.

## Data Management Beyond Basic Storage

Effective data management extends beyond merely storing queries and responses. The case study emphasizes storing embeddings—not just of queries and responses, but also of the documents used in generating responses. This comprehensive approach enables:

- Tracking how well chatbot responses align with user queries and source documents
- Identifying underperformance areas such as failed retrieval or misinterpreted intent
- Understanding which documents are referenced most frequently and how they relate to various queries
- Developing features that suggest related questions or topics based on embedding similarity

This stored repository of embeddings enables innovative features like nudging users toward frequently asked questions or related topics, keeping them engaged and providing additional value.

## Hallucination Reduction

Dealing with hallucinations—instances where the chatbot generates incorrect or misleading information confidently—represents one of the most challenging aspects of the project. The case study describes a manual, iterative approach to mitigation:

- Close monitoring of chatbot responses
- Identifying specific instances of hallucination
- Understanding underlying causes

A notable example involved the chatbot interpreting "LLM" as "local linear model" instead of "large language model" when asked about LLMs. This highlighted gaps in the knowledge base and context understanding. The solution involved adding "caveats"—additional clarifying information—to the knowledge repository. Enriching the documentation with detailed information about LLMs and LLMOps significantly improved response accuracy.

## UI/UX Considerations

The case study makes an important point that often gets overlooked in technical implementations: the user interface and experience play a pivotal role in building user trust, regardless of backend sophistication.

A key lesson involved shifting from static, block-format responses to streaming responses delivered in real-time. This seemingly small change—making it appear as if the chatbot is typing responses—created a more dynamic and engaging experience that significantly enhanced user perception of natural conversation and increased trust.

Additional UI/UX principles emphasized include simplicity and clarity of interface design, responsive design across devices, and personalization based on user preferences or past interactions.

## Conversational Memory

Implementing conversational memory allows the chatbot to remember and summarize previous parts of conversations. This capability makes interactions more natural and adds personalization and context awareness crucial for user engagement.

A concrete example illustrates this: when a user asks about "Dashboards in Fiddler" and follows up with "how can I use them?", the chatbot must understand that "them" refers to the previously mentioned dashboards. Without conversational memory, the chatbot would struggle with this reference.

The summarization capability extends this further, providing quick recaps in multi-turn conversations, especially valuable when conversations are resumed after breaks or when dealing with complex subjects.

## Critical Assessment

While this case study provides substantial practical value and technical depth, it should be noted that it originates from Fiddler, a company selling LLM observability solutions. The case study naturally positions their observability tools as essential for this type of development without providing comparative analysis with alternative approaches. The lessons shared appear technically sound and practically applicable, but readers should be aware of the promotional context while extracting value from the specific implementation details and patterns described.

The case study also acknowledges the rapidly evolving nature of the field, particularly noting how OpenAI's context window expansions may have changed the relevance of certain strategies like aggressive document chunking since the original development work was completed.