---
title: "LLM-Based Dasher Support Automation with RAG and Quality Controls"
slug: "llm-based-dasher-support-automation-with-rag-and-quality-controls"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bc7b24a5a1644f11ad7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-01T11:07:45.646Z"
  lastUpdated: "2025-11-26T06:44:43.435Z"
  createdOn: "2024-11-21T13:55:19.697Z"
llmopsTags:
  - "api-gateway"
  - "compliance"
  - "customer-support"
  - "documentation"
  - "embeddings"
  - "error-handling"
  - "guardrails"
  - "human-in-the-loop"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "rag"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "structured-output"
  - "system-prompts"
  - "vector-search"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash implemented an LLM-based chatbot system to improve their Dasher support automation, replacing a traditional flow-based system. The solution uses RAG (Retrieval Augmented Generation) to leverage their knowledge base, along with sophisticated quality control systems including LLM Guardrail for real-time response validation and LLM Judge for quality monitoring. The system successfully handles thousands of support requests daily while achieving a 90% reduction in hallucinations and 99% reduction in compliance issues."
link: "https://careersatdoordash.com/blog/large-language-modules-based-dasher-support-automation/"
year: 2024
seo:
  title: "Doordash: LLM-Based Dasher Support Automation with RAG and Quality Controls - ZenML LLMOps Database"
  description: "DoorDash implemented an LLM-based chatbot system to improve their Dasher support automation, replacing a traditional flow-based system. The solution uses RAG (Retrieval Augmented Generation) to leverage their knowledge base, along with sophisticated quality control systems including LLM Guardrail for real-time response validation and LLM Judge for quality monitoring. The system successfully handles thousands of support requests daily while achieving a 90% reduction in hallucinations and 99% reduction in compliance issues."
  canonical: "https://www.zenml.io/llmops-database/llm-based-dasher-support-automation-with-rag-and-quality-controls"
  ogTitle: "Doordash: LLM-Based Dasher Support Automation with RAG and Quality Controls - ZenML LLMOps Database"
  ogDescription: "DoorDash implemented an LLM-based chatbot system to improve their Dasher support automation, replacing a traditional flow-based system. The solution uses RAG (Retrieval Augmented Generation) to leverage their knowledge base, along with sophisticated quality control systems including LLM Guardrail for real-time response validation and LLM Judge for quality monitoring. The system successfully handles thousands of support requests daily while achieving a 90% reduction in hallucinations and 99% reduction in compliance issues."
---

## Overview

Doordash, the food delivery platform, developed an LLM-based support automation system to assist their independent delivery contractors known as "Dashers." The case study presents a comprehensive approach to deploying LLMs in a production customer support environment, addressing the significant operational challenges that arise when using generative AI at scale for real-world user interactions.

The existing automated support system at Doordash relied on pre-built resolution paths (flow-based systems), which could only handle a limited subset of Dasher issues. While the company maintained a knowledge base of support articles, three key problems limited their usefulness: difficulty finding relevant articles, time required to locate useful information within articles, and the fact that articles were only available in English despite many Dashers preferring other languages. These constraints made the use case ideal for a RAG (Retrieval Augmented Generation) system.

## Technical Architecture

The RAG system follows a multi-step process designed to handle the complexity of multi-turn conversations. When a Dasher presents an issue to the chatbot, the system first condenses the entire conversation to identify the core problem—this is critical because user issues often span multiple messages and follow-up questions. Using this summary, the system searches historical data for similar cases that were previously resolved using knowledge base articles. Each identified issue corresponds to a specific article that gets integrated into the prompt template, enabling the chatbot to generate contextually appropriate responses.

The architecture consists of three main components: the RAG system itself, an LLM Guardrail for online response validation, and an LLM Judge for quality monitoring and improvement.

## Challenges Identified in Production LLM Usage

The Doordash team identified several key challenges when working with LLMs in production that are instructive for anyone deploying similar systems:

**Groundedness and Relevance**: The LLM RAG chatbot occasionally generated responses that diverged from intended context. These responses sounded natural and legitimate, making it difficult for users to recognize inaccuracies. The team attributes this to outdated or incorrect Doordash-related information that may have been included during the LLM's training phase from public sources like Quora, Reddit, and Twitter.

**Context Summarization Accuracy**: Before retrieving relevant information, the system must accurately understand and summarize the Dasher's issue. In multi-turn conversations, the issue evolves as dialogue progresses, and the quality of this summarization directly affects retrieval results.

**Language Consistency**: Because LLMs primarily train on English data, they occasionally ignore instructions to respond in other languages, particularly when the prompt itself is in English. This issue diminishes with larger models but remains a production concern.

**Action-Response Consistency**: The LLM can perform actions through API calls, but these function calls must be consistent with the response text shown to users.

**Latency**: Response times vary from sub-second to tens of seconds depending on model choice and prompt size, with larger prompts generally leading to slower responses.

## LLM Guardrail System

The Guardrail system is an online monitoring tool that evaluates each LLM output to ensure accuracy and compliance. A primary focus is detecting hallucinations where LLM-generated responses are unrelated or only partially related to knowledge base articles.

Initially, the team tested a more sophisticated guardrail model but found that increased response times and heavy token usage made it prohibitively expensive. This is a crucial LLMOps lesson about balancing quality controls with cost and latency constraints. The solution was a two-tier approach:

**First Layer - Shallow Check**: A cost-effective semantic similarity comparison developed in-house that employs a sliding window technique to measure similarities between LLM responses and relevant article segments. If a response closely matches an article, it's less likely to be a hallucination.

**Second Layer - LLM-Powered Evaluator**: If the shallow check flags a response, a prompt is constructed that includes the initial response, relevant knowledge base articles, and conversation history. This is passed to an evaluation model that assesses whether the response is grounded in the provided information and offers a rationale for debugging purposes.

A response must pass all guardrail tests before being shown to the end user. The team acknowledges that the guardrail's latency is a notable drawback due to the end-to-end process of generating a response, applying the guardrail, and potentially retrying with a new guardrail check. Their pragmatic solution is to strategically default to human agents for problematic responses to ensure quality user experience while maintaining automation levels.

The reported results are significant: the guardrail system reduced overall hallucinations by 90% and cut down potentially severe compliance issues by 99%. These are strong metrics, though it's worth noting these are self-reported and the methodology for measuring these improvements isn't detailed.

## LLM Judge Quality Monitoring

The team developed an LLM Judge system because standard metrics like Dasher feedback, human engagement rate, and delivery speed don't provide actionable feedback for improving the chatbot. They manually reviewed thousands of chat transcripts to develop an iteration pipeline for monitoring LLM quality.

Quality aspects are categorized into five areas: retrieval correctness, response accuracy, grammar and language accuracy, coherence to context, and relevance to the Dasher's request. For each aspect, monitors were built either by prompting a more sophisticated LLM or creating rules-based regular expression metrics.

The process involves prompting LLM Judge with open-ended questions, processing and summarizing answers into common issues, and then building high-frequency issues into prompts or rules for ongoing monitoring. This creates a feedback loop for continuous improvement. Beyond automated evaluation, a dedicated human team reviews random transcript samples, with continuous calibration between human review and automated systems to ensure effective coverage.

## Quality Improvement Pipeline

The system faces several quality challenges including insufficient knowledge base content, inaccurate retrieval, model hallucination, and suboptimal prompts. Human support agents play a crucial role as subject matter experts, reviewing LLM responses and guiding automated process enhancements.

**Knowledge Base Improvements**: The knowledge base serves as the foundational truth for LLM responses, so complete and accurately phrased articles are essential. The LLM Judge evaluation enables thorough reviews and updates to eliminate misleading terminology. The team is developing a developer-friendly KB management portal to streamline the update process.

**Retrieval Improvements**: Effective retrieval involves query contextualization (simplifying queries to a single, concise prompt while providing context through conversation history) and article retrieval (selecting an optimal embedding model from available choices within their vector store).

**Prompt Improvements**: The team follows several principles for prompt refinement: breaking down complex prompts into smaller, manageable parts with parallel processing where feasible; avoiding negative language in prompts because models typically struggle with these; clearly outlining desired actions with illustrative examples; and implementing chain-of-thought prompting to encourage the model to display reasoning, aiding in identification and correction of logic errors and hallucinations.

## Regression Prevention and Testing

To maintain prompt quality and model performance, the team uses Promptfoo, an open-source evaluation tool described as akin to unit testing in software development. This tool enables quick prompt refinement and model response evaluation. A suite of predefined tests is triggered by any prompt changes, blocking any failing prompts from deployment. Newly identified issues are systematically added to Promptfoo test suites, ensuring continuous improvement and preventing model performance regression.

This approach represents a mature LLMOps practice of treating prompt engineering with the same rigor as traditional software development, with version control, testing, and regression prevention.

## Results and Future Directions

The system now autonomously assists thousands of Dashers daily, streamlining basic support requests while allowing human representatives to focus on complex problems. The team positions this as a shift from traditional flow-based systems, acknowledging the inherent uncertainty in LLM-based approaches.

Looking forward, the team recognizes that complex support scenarios will still require human expertise. They plan to continue developing precise quality assessment methods to narrow the performance gap between ideal experience and automated systems. They acknowledge that as foundational models, ontology, and RAG systems improve over time, the efficacy of LLM-driven solutions will also improve, and continuous data collection and analysis remain vital for guiding enhancements.

## Assessment

This case study provides a relatively thorough look at production LLM deployment challenges and solutions. The two-tier guardrail approach represents a pragmatic balance between quality and cost/latency constraints. The emphasis on continuous quality monitoring through LLM Judge and the integration of human review creates a robust feedback loop. The use of Promptfoo for regression testing demonstrates mature software engineering practices applied to prompt management.

While the reported metrics (90% hallucination reduction, 99% compliance issue reduction) are impressive, the case study doesn't detail the baseline measurements or methodology. The focus on Dasher support represents a relatively constrained domain with a finite knowledge base, which may have contributed to the system's success. The emphasis on defaulting to human agents when quality cannot be assured shows appropriate caution in production LLM deployment.