---
title: "Building an AI Tutor with Enhanced LLM Accuracy Through Knowledge Base Integration"
slug: "building-an-ai-tutor-with-enhanced-llm-accuracy-through-knowledge-base-integration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3a9f4136a25d0c71e5e9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:36:40.859Z"
  createdOn: "2024-11-21T13:50:23.473Z"
llmopsTags:
  - "embeddings"
  - "fine-tuning"
  - "guardrails"
  - "high-stakes-application"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "redis"
  - "reliability"
  - "scalability"
  - "semantic-search"
  - "system-prompts"
  - "vector-search"
industryTags: "education"
company: "Clipping"
summary: "Clipping developed an AI tutor called ClippingGPT to address the challenge of LLM hallucinations and accuracy in educational settings. By implementing embeddings and training the model on a specialized knowledge base, they created a system that outperformed GPT-4 by 26% on the Brazilian Diplomatic Career Examination. The solution focused on factual recall from a reliable proprietary knowledge base before generating responses, demonstrating how domain-specific knowledge integration can enhance LLM accuracy for educational applications."
link: "https://medium.com/@rafael_pinheiro/building-with-gpt-for-education-how-we-built-an-ai-tutor-that-aced-the-most-complex-exam-in-latam-19fabf8b746b"
year: 2023
seo:
  title: "Clipping: Building an AI Tutor with Enhanced LLM Accuracy Through Knowledge Base Integration - ZenML LLMOps Database"
  description: "Clipping developed an AI tutor called ClippingGPT to address the challenge of LLM hallucinations and accuracy in educational settings. By implementing embeddings and training the model on a specialized knowledge base, they created a system that outperformed GPT-4 by 26% on the Brazilian Diplomatic Career Examination. The solution focused on factual recall from a reliable proprietary knowledge base before generating responses, demonstrating how domain-specific knowledge integration can enhance LLM accuracy for educational applications."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-tutor-with-enhanced-llm-accuracy-through-knowledge-base-integration"
  ogTitle: "Clipping: Building an AI Tutor with Enhanced LLM Accuracy Through Knowledge Base Integration - ZenML LLMOps Database"
  ogDescription: "Clipping developed an AI tutor called ClippingGPT to address the challenge of LLM hallucinations and accuracy in educational settings. By implementing embeddings and training the model on a specialized knowledge base, they created a system that outperformed GPT-4 by 26% on the Brazilian Diplomatic Career Examination. The solution focused on factual recall from a reliable proprietary knowledge base before generating responses, demonstrating how domain-specific knowledge integration can enhance LLM accuracy for educational applications."
---

## Overview

Clipping is a Brazilian edtech startup that specializes in helping candidates prepare for highly competitive examinations, particularly the Brazilian Diplomatic Career Entrance Examination—widely considered one of the most challenging exams in Latin America. The company claims an average approval rate of 94% for its students and has been working with AI and conversational interfaces in education since 2018. In this case study, Clipping documents the development of ClippingGPT, an AI tutor built on top of GPT-4 that uses retrieval-augmented generation (RAG) to provide more accurate, domain-specific answers for exam preparation.

The core motivation behind this project was addressing the fundamental limitations of large language models (LLMs) in educational contexts. While much public discourse around AI in education focuses on concerns about cheating, Clipping argues that the more significant risk is misinformation during the learning process due to hallucinations, outdated content, and linguistic biases in LLMs. This is particularly acute for high-stakes examinations where accuracy is paramount.

## The Problem Space

The case study identifies three key limitations of using vanilla LLMs like GPT-4 in educational settings:

**Hallucinations:** LLMs are language models, not knowledge bases. They predict plausible-sounding text rather than verifying factual accuracy. OpenAI's own documentation acknowledges that GPT-4 "still is not fully reliable" and that "great care should be taken when using language model outputs, particularly in high-stakes contexts." The article notes that GPT-4 scored only 60% accuracy on the TruthfulQA benchmark designed to measure LLM truthfulness.

**Outdated Content:** GPT-4's training data largely cuts off in September 2021, making it unsuitable for examinations that require candidates to demonstrate knowledge of current events, particularly in areas like international politics. This is a critical limitation for the Diplomatic Career Entrance Examination, which heavily emphasizes contemporary geopolitical knowledge.

**Linguistic Bias:** GPT models generate more hallucinations in non-English languages due to the predominance of English in training datasets. Since the Brazilian diplomatic exam is conducted in Portuguese and tests knowledge rooted in non-English-language literature and sources, this bias significantly impacts performance. The case study provides an example of GPT-4 failing to accurately answer a straightforward question about Brazilian history.

## Technical Architecture

ClippingGPT implements a retrieval-augmented generation (RAG) architecture to address these limitations. The system is designed to perform factual recall from a reliable proprietary knowledge base before generating answers, thereby increasing the likelihood of consistent and correct responses.

### Embedding-Based Knowledge Retrieval

The team chose embeddings over fine-tuning as their primary technique. They explain this decision by noting that fine-tuning is better suited for teaching a model a particular style, while embeddings are more appropriate for teaching knowledge. Since their goal was specifically to avoid hallucinations and outdated content—fundamentally knowledge-related issues—embeddings were the natural choice.

The implementation follows a standard RAG pattern:

**Step 1 - Knowledge Base Preparation:**
- Documents are split into sections (chunks)
- Each chunk is transformed into an embedding using OpenAI's Embeddings API
- Embeddings are stored in Redis, which serves as the vector database

The case study notes an important operational consideration: when using Optical Character Recognition (OCR) for certain documents, data cleaning becomes critically important because key information such as dates and numbers can be compromised during processing.

**Step 2 - Query Processing:**
When a user submits a question, the system transforms the input into a vector using OpenAI's Embeddings API. It then calculates the distance between the user's query embedding and the embeddings of various document chunks, ranking chunks based on their relevance to identify where potential answers may be found.

**Step 3 - Context-Enhanced Generation:**
The most relevant chunks are incorporated as context into a message sent to GPT. This enriched query is then sent to OpenAI's Completion API, which generates and returns the answer.

## Evaluation Methodology

The team designed a rigorous evaluation methodology to validate their hypothesis that a smaller model trained on a specific knowledge base would outperform GPT-4 on the Brazilian diplomatic examination.

The evaluation process involved:
- Using GPT-4 to generate answers to the writing examination questions from the official 2022 exam
- Having specialized teachers grade these answers through blind grading (without knowing the answers were AI-generated)
- Training ClippingGPT on an external knowledge base and generating new answers to the same exam
- Repeating the blind grading process for ClippingGPT's answers
- Comparing final scores against both GPT-4's performance and scores of human candidates who passed the 2022 exam

This blind evaluation approach adds credibility to the results, though it's worth noting that the evaluation was conducted internally by the company developing the system, and the full methodology details (such as number of graders, inter-rater reliability, etc.) are not provided.

## Results and Analysis

ClippingGPT achieved a 23rd place finish among the top 35 approved candidates, with a score of 597.79—outperforming GPT-4 by 26%. GPT-4 alone scored 473.8, finishing in 177th place and failing to qualify among the approved candidates.

The performance comparison revealed interesting patterns across different subject areas:

**Largest Improvements (Geography and Brazil's History):** The biggest performance gaps were in subjects requiring mastery of very specific literature highlighting local and regional facts unlikely to be contained in GPT-4's training data. This suggests the RAG approach successfully addressed blind spots in specific topics, though the team acknowledges that hallucinations were not completely eliminated.

**Minimal Improvement (French and Spanish):** These language exams had the smallest variation between GPT-4 and ClippingGPT. The team explains this is because these particular exams focused on translation and summarization rather than external knowledge recall—no external knowledge augmentation was needed.

**Below-Average Performance (Portuguese Language):** Interestingly, both ClippingGPT and GPT-4 scored below the average of approved candidates on the Portuguese language examination. The expert grader noted that while the answers demonstrated impressive internal coherence of argumentation, they contained structural and grammatical deficiencies that compromised scores. The evaluation was based on conservative grammatical rules that even experts debate.

## Future Improvements and Limitations

The case study identifies several opportunities for further improvement:

- Tweaking model temperature (closer to 0) to reduce creative hallucinations
- Advanced prompt engineering with different prompts for each subject
- Chain of thought prompting techniques
- Implementation of methods like HyDE (Hypothetical Document Embeddings), DERA, and Reflexion to enhance retrieval and generation quality

It's important to approach these results with appropriate caution. While the 26% improvement over GPT-4 is notable, several factors warrant consideration: the evaluation was conducted by the company developing the system, the full grading methodology isn't detailed, and the comparison is against a single benchmark exam. Additionally, the claim of "outperforming GPT-4" specifically applies to this particular domain-specific examination rather than general capabilities.

## Production Considerations

From an LLMOps perspective, this case study illustrates several important production considerations:

**Data Quality:** The emphasis on proper data preprocessing and cleaning, especially for OCR-processed documents, highlights the importance of data pipeline quality in RAG systems.

**Infrastructure Choices:** The selection of Redis as a vector database reflects a practical production choice, balancing performance with operational simplicity.

**Evaluation Frameworks:** The blind grading methodology using domain experts represents a thoughtful approach to evaluating LLM systems where objective metrics may be insufficient.

**Domain Specificity:** The case demonstrates that domain-specific knowledge augmentation can provide significant value, suggesting that organizations should invest in curating high-quality knowledge bases rather than relying solely on general-purpose LLMs.

The case study represents a practical example of how educational technology companies can leverage RAG architectures to build more reliable AI tutoring systems, though users should maintain appropriate skepticism about claimed performance metrics until independently validated.