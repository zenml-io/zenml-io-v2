---
title: "Empirically Optimizing a Documentation RAG Application"
slug: "empirically-optimizing-a-documentation-rag-application"
draft: false
llmopsTags:
  - "question-answering"
  - "document-processing"
  - "unstructured-data"
  - "classification"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "evals"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "postgresql"
  - "databases"
  - "spacy"
  - "open-source"
  - "documentation"
  - "openai"
  - "meta"
industryTags: "tech"
company: "Anyscale"
summary: "Anyscale built a retrieval-augmented generation application over its Ray documentation to address the limitations of general-purpose language models, which lacked current, product-specific context. The system used structured document chunking, embeddings, PostgreSQL with pgvector, cosine-similarity retrieval, and a language model to generate answers grounded in relevant documentation. Anyscale evaluated retrieval and generation separately, compared chunking, embedding, context-size, and model choices, and explored synthetic evaluation data and supervised model routing. The experiments found that retrieval materially improved answer quality, that larger context and multiple retrieved chunks helped up to the model context limit, and that a smaller embedding model could outperform a leaderboard-leading alternative on this workload. The approach was presented as an iterative engineering process rather than a universally optimal configuration, with human review still needed to validate automated evaluators and generated answers."
link: "https://www.youtube.com/watch?v=YO9jYy-HIRY"
year: 2023
seo:
  title: "Anyscale: Empirically Optimizing a Documentation RAG Application - ZenML LLMOps Database"
  description: "Anyscale built a retrieval-augmented generation application over its Ray documentation to address the limitations of general-purpose language models, which lacked current, product-specific context. The system used structured document chunking, embeddings, PostgreSQL with pgvector, cosine-similarity retrieval, and a language model to generate answers grounded in relevant documentation. Anyscale evaluated retrieval and generation separately, compared chunking, embedding, context-size, and model choices, and explored synthetic evaluation data and supervised model routing. The experiments found that retrieval materially improved answer quality, that larger context and multiple retrieved chunks helped up to the model context limit, and that a smaller embedding model could outperform a leaderboard-leading alternative on this workload. The approach was presented as an iterative engineering process rather than a universally optimal configuration, with human review still needed to validate automated evaluators and generated answers."
  canonical: "https://www.zenml.io/llmops-database/empirically-optimizing-a-documentation-rag-application"
  ogTitle: "Anyscale: Empirically Optimizing a Documentation RAG Application - ZenML LLMOps Database"
  ogDescription: "Anyscale built a retrieval-augmented generation application over its Ray documentation to address the limitations of general-purpose language models, which lacked current, product-specific context. The system used structured document chunking, embeddings, PostgreSQL with pgvector, cosine-similarity retrieval, and a language model to generate answers grounded in relevant documentation. Anyscale evaluated retrieval and generation separately, compared chunking, embedding, context-size, and model choices, and explored synthetic evaluation data and supervised model routing. The experiments found that retrieval materially improved answer quality, that larger context and multiple retrieved chunks helped up to the model context limit, and that a smaller embedding model could outperform a leaderboard-leading alternative on this workload. The approach was presented as an iterative engineering process rather than a universally optimal configuration, with human review still needed to validate automated evaluators and generated answers."
notion:
  pageId: "406f8dff-2538-819f-bfdb-d6de5604aa67"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-27T13:49:00.000Z"
  lastEditedTime: "2026-10-27T13:49:00.000Z"
  publishedAt: "2026-10-27T13:50:30Z"
---

## Overview

Anyscale developed a retrieval-augmented generation (RAG) application for answering questions about Ray documentation. The immediate problem was that a base language model could not reliably answer questions about a rapidly changing product: it either had little knowledge of Ray or relied on information that was outdated relative to the documentation. Instead of treating a general-purpose model as a complete product knowledge source, the application retrieved relevant passages from Anyscale's own documentation and supplied them as context to the model before generation.

The work also served as an internal exercise in operating an LLM application, rather than focusing only on infrastructure. Anyscale used a deliberately empirical process to compare document representation, retrieval, embedding, generation, evaluation, and routing choices. The results support the value of RAG for this documentation use case, but they do not establish universal best practices. Findings such as the preferred chunk size, embedding model, and number of retrieved chunks were dependent on the data and models tested, and the automated evaluation process remained a first-pass mechanism that required human validation.

## Problem and Use Case

Product documentation is a natural starting point for a RAG application because it contains organization-specific knowledge and users ask questions that are difficult for a generic model to answer accurately. A base model may lack knowledge of the product, misunderstand its APIs, or provide an answer based on an older version. Anyscale's documentation also included code snippets, making it important to preserve meaningful technical units rather than splitting text arbitrarily.

The quality of this type of system depends on at least two assets: the underlying documents and a representative collection of user questions. Good documentation gives the model useful source material, while realistic questions provide the data needed to test retrieval and answer quality. The project therefore treated documentation quality and evaluation data as part of the application itself, not merely as supporting resources.

## Architecture and Data Pipeline

The application followed a conventional RAG pipeline with separate indexing and query-time paths. During indexing, documentation was loaded from its source format and divided into chunks. Each chunk was converted into a vector representation by an embedding model and stored in a vector-capable database along with its text and source reference. At query time, the user question was embedded with the same embedding model, and the database returned the nearest chunks using a distance or similarity calculation. The retrieved text and original question were then placed in the language model prompt to produce a grounded answer.

Conceptually, the query path was:

```text
question -> query embedding -> vector search -> top-k documentation chunks
         -> question + retrieved text -> language model -> answer
```

Anyscale used PostgreSQL with the pgvector extension for the initial implementation. This choice allowed the team to reuse existing PostgreSQL expertise and machinery, including the possibility of combining vector search with conventional filters. The speakers noted that a dedicated vector database could become more appropriate at larger document volumes or when specialized features such as integrated reranking are needed. The practical recommendation was to begin with a system the team already understands, then assess alternatives as scale and feature requirements increase. The documentation corpus used for the experiments was described as relatively small, reportedly less than a gigabyte, so the tradeoff may not generalize to much larger deployments.

## Document Chunking and Retrieval

Naively splitting every document into fixed-size segments with a fixed overlap was treated as a useful baseline rather than a final design. Anyscale experimented with using the sections of HTML documents as chunk boundaries. This approach provided more precise citations because an answer could link to the relevant documentation section instead of an entire long page. It also reduced the likelihood of splitting between semantically related elements, such as the middle of a function or code example.

Chunking involved several competing objectives. Smaller chunks can make retrieval more precise and reduce irrelevant context, while larger chunks can preserve dependencies and complete code examples. For this documentation set, retrieval scores generally increased as chunk size increased before tapering off, while answer quality also improved but with diminishing returns. The presence of substantial code snippets was important: retaining a complete snippet could be more useful than retrieving a small fragment. The team also considered representing a larger document with multiple embeddings when a single chunk could not capture all relevant content.

The number of retrieved chunks was another tunable parameter. More chunks generally improved both retrieval and generation quality in the experiments, but only until the model's context window became a constraint. The tested configuration stopped at seven chunks because additional material would have been truncated under the context limits being respected. This illustrates a common LLMOps coupling: chunk size, top-k retrieval, prompt length, model context window, latency, and cost cannot be tuned independently. The experiments sometimes fixed earlier decisions before evaluating later components, although a broader joint search was also possible.

## Evaluation Strategy

Anyscale separated retrieval evaluation from generation evaluation to make failures easier to diagnose. For retrieval, each query had a known or “golden” source. A retrieval hit was recorded when that source appeared among the top-k returned chunks. This metric measured whether the search system found the relevant evidence without conflating the result with the language model's ability to use it.

For generation, the evaluation supplied the best source text directly and measured how well a language model answered the question from that source. This isolated the answer-generation capability from retrieval failures. The overall evaluation then ran a particular application configuration—covering chunking, embeddings, retrieval, and the base model—and asked an evaluator model to score the generated responses and provide reasoning.

The team used a dataset of more than 200 examples for the initial quality experiments. The examples were grounded in areas of Ray that the team understood well, allowing human reviewers to judge whether answers and evaluator rationales were sensible. GPT-4 was selected as the initial evaluator after comparing candidate evaluators, including Llama 7B and 70B models. The evaluation used a one-to-five score, although the team acknowledged that binary success/failure labels might have been easier to interpret. The evaluator was treated as a way to create an inexpensive feedback loop, not as an unquestionable source of truth. Human assessment was still required, particularly because an evaluator model can produce overly favorable or inconsistent judgments. The discussion also warned that an open model may favor answers from models similar to itself, making evaluator calibration important.

## Model, Embedding, and Cost Experiments

The application compared GPT-4, GPT-3.5 Turbo, Llama 7B, and Llama 70B for answer generation. GPT-4 produced the strongest quality results in the reported tests, while Llama 70B and GPT-3.5 Turbo were described as relatively close for this particular workload. No fine-tuning was applied to the tested embedding or generation models, so the comparison focused on prompting, retrieval, and model selection rather than task-specific parameter training.

Embedding models were also evaluated on the actual documentation question set rather than selected solely from a public leaderboard. Anyscale found that GTE-base, a comparatively small open-source embedding model, performed better for its use case than the leaderboard-leading alternative tested and also compared favorably with OpenAI's text embedding option. This is a useful operational lesson: benchmark rankings may not predict performance on a specific domain, and a smaller model can reduce serving cost or simplify deployment while meeting quality needs. The result should nevertheless be understood as workload-specific rather than evidence that GTE-base is generally superior.

Cost was considered alongside quality. GPT-4 was materially more expensive in the plotted comparison, while some less expensive models delivered quality that was relatively close on the tested questions. Rather than choosing one model globally, Anyscale explored routing queries to different models. The routing dataset contained approximately 1,800 labeled examples indicating which model was better for a given query. A supervised classifier, including a simple logistic classifier with a softmax output, was trained to make the routing decision. The motivation was to meet response-time expectations without invoking a large model for every request. The examples suggested that queries involving substantial code were more likely to benefit from GPT-4, although this kind of rule was learned from the specific dataset and should be revalidated as documentation and model behavior change.

## Bootstrapping Data and Operational Iteration

A major obstacle for new RAG systems is the absence of labeled user questions. Anyscale proposed generating candidate questions from documentation chunks with a strong model such as GPT-4. This can provide an initial evaluation or staging dataset, but the generated questions may be noisy, overly simple, or little more than restatements of the source. The suggested workflow was to filter implausible questions, prompt for more realistic and compositional queries, deploy an early version to staging, and then collect real user interactions for subsequent labeling.

The project emphasized iterative improvement. A first version can be used to make annotation easier: once the system retrieves a source, reviewers can check whether the evidence actually supports the answer rather than starting from a blank page. Evaluation results can also reveal weaknesses in the documentation itself. Incorrect answers may be caused by missing, ambiguous, or erroneous source material rather than by the model alone. Improving the underlying documents and links can therefore be as valuable as changing the prompt or model.

## Results and Tradeoffs

The reported experiments found a clear improvement when relevant context was added compared with generation without context. Retrieval quality and answer quality did not always move identically: retrieval could continue improving while generation gains tapered as chunks became larger or more numerous. Context-window limits imposed a practical ceiling, and larger windows were viewed as increasingly important for technical documentation and code-heavy answers.

The main tradeoffs were precision versus completeness in chunking, local simplicity versus specialized capability in database selection, quality versus cost in model choice, and automated scale versus human confidence in evaluation. PostgreSQL with pgvector was a pragmatic starting point, but dedicated vector systems may offer advantages at greater scale. Model routing can reduce cost and latency, but it introduces a classifier that must itself be evaluated and maintained. LLM-as-judge evaluation enables rapid experimentation, but it can encode evaluator bias and should not replace human review for important quality decisions.

Overall, the case demonstrates an LLMOps workflow for moving from a baseline model to a measurable RAG application: establish a representative corpus, preserve useful document structure, isolate retrieval and generation metrics, test components on the target workload, account for context and cost constraints, and continuously incorporate real user feedback. The approach was a working foundation for a production-oriented system, while the evidence presented was primarily empirical experimentation and early application development rather than a claim of universally validated production performance.
