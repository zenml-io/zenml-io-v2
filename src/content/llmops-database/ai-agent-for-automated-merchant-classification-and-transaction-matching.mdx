---
title: "AI Agent for Automated Merchant Classification and Transaction Matching"
slug: "ai-agent-for-automated-merchant-classification-and-transaction-matching"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "687628e72547ddd294d9e6f7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:14:01.774Z"
  createdOn: "2025-07-15T10:09:43.487Z"
llmopsTags:
  - "fraud-detection"
  - "classification"
  - "document-processing"
  - "structured-output"
  - "multi-modality"
  - "unstructured-data"
  - "realtime-application"
  - "regulatory-compliance"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "chunking"
  - "system-prompts"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "elasticsearch"
  - "cache"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built an AI agent using LLMs, embeddings, and RAG to automatically fix incorrect merchant classifications that previously required hours of manual intervention from customer support teams. The agent processes user requests to reclassify transactions in under 10 seconds, handling nearly 100% of requests compared to the previous 1.5-3% manual handling rate, while maintaining 99% accuracy according to LLM-based evaluation and reducing customer support costs from hundreds of dollars to cents per request."
link: "https://builders.ramp.com/post/fixing-merchant-classifications-with-ai"
year: 2025
seo:
  title: "Ramp: AI Agent for Automated Merchant Classification and Transaction Matching - ZenML LLMOps Database"
  description: "Ramp built an AI agent using LLMs, embeddings, and RAG to automatically fix incorrect merchant classifications that previously required hours of manual intervention from customer support teams. The agent processes user requests to reclassify transactions in under 10 seconds, handling nearly 100% of requests compared to the previous 1.5-3% manual handling rate, while maintaining 99% accuracy according to LLM-based evaluation and reducing customer support costs from hundreds of dollars to cents per request."
  canonical: "https://www.zenml.io/llmops-database/ai-agent-for-automated-merchant-classification-and-transaction-matching"
  ogTitle: "Ramp: AI Agent for Automated Merchant Classification and Transaction Matching - ZenML LLMOps Database"
  ogDescription: "Ramp built an AI agent using LLMs, embeddings, and RAG to automatically fix incorrect merchant classifications that previously required hours of manual intervention from customer support teams. The agent processes user requests to reclassify transactions in under 10 seconds, handling nearly 100% of requests compared to the previous 1.5-3% manual handling rate, while maintaining 99% accuracy according to LLM-based evaluation and reducing customer support costs from hundreds of dollars to cents per request."
---

This case study presents Ramp's implementation of an AI agent to solve merchant classification problems in their corporate card transaction processing system. Ramp is a financial technology company that provides corporate cards and expense management services, where accurate merchant classification is crucial for features like spending analysis, policy enforcement, and restricted fund management.

The core business problem stemmed from the inherent limitations of payment processor data. When customers make transactions using Ramp cards, payment processors like Stripe provide card acceptor information that includes cryptic merchant names (like "PTI*BRYANTPARKWV" for Bryant Park transactions), merchant category codes (MCCs), and location data that can be misleading or insufficient for accurate classification. This often led to incorrect merchant matches that frustrated customers - for example, a hotel being classified as entertainment rather than lodging, causing legitimate business expenses to be flagged as policy violations.

Previously, fixing these misclassifications required manual intervention from customer support, finance, and engineering teams, taking hours per request and only addressing 1.5-3% of reported issues. This approach was fundamentally unsustainable as transaction volume scaled, creating a classic LLMOps challenge of needing to automate complex decision-making processes that previously required human expertise and contextual understanding.

The technical architecture centers around an LLM-powered agent that combines multiple AI techniques to make intelligent merchant classification decisions. The system uses a multimodal RAG approach that pulls context from several sources: transaction card acceptor names and MCCs, extracted merchant information from receipt images using computer vision, user-provided transaction memos, and vector embeddings of related merchants. The embedding strategy is particularly sophisticated, using both transaction-level embeddings derived from card acceptor names and merchant embeddings from mapped transactions to identify similar merchants through vector similarity search.

The RAG implementation addresses a critical scalability challenge - providing the LLM with relevant context without overwhelming its context window. Rather than feeding all merchant data to the model, the system intelligently retrieves the top K most relevant merchants using two complementary strategies: vector embedding similarity based on transaction card acceptor names, and fuzzy name matching against the user's requested merchant name. This dual approach is necessary because card acceptor names can be vastly different from actual merchant names, and relying solely on embeddings might miss important matches.

The LLM's decision-making process involves mapping user requests to one of three actions: creating a new merchant, updating an existing merchant, or reassigning the transaction to a more appropriate existing merchant. The system demonstrates sophisticated reasoning capabilities, as evidenced by examples where the LLM correctly identifies corporate rebrands by leveraging its training knowledge, or validates user requests by cross-referencing MCCs with receipt line items to confirm transaction legitimacy.

Guardrails represent a critical LLMOps component in this system, designed to prevent the LLM from making inappropriate changes to merchant records. The system implements both pre-processing guardrails that limit available actions based on request nature and merchant importance, and post-processing guardrails that catch LLM hallucinations. A key technical detail is the requirement that the LLM always choose from a predefined set of actions and select target merchants only from the provided list, preventing the model from inventing non-existent merchants or taking unauthorized actions.

The evaluation strategy showcases a mature approach to LLMOps assessment that evolved through four phases as the system scaled. Initial manual review provided deep qualitative insights but wasn't scalable. The team then implemented proxy metrics like measuring follow-up request rates, operating under the assumption that satisfied users wouldn't submit additional correction requests. As volume increased, they implemented an "LLM as judge" evaluation system inspired by academic research, where a separate LLM evaluates whether the agent's actions constituted improvements or whether rejections were reasonable.

The evaluation results demonstrate strong performance metrics: fewer than 10% of transactions receive follow-up correction requests, only 25% of requests are rejected by the agent, and according to the LLM judge, 99% of transaction classifications are improved while two-thirds of rejections are deemed reasonable. The team acknowledges that some rejections occur due to user interface issues or misunderstanding of the tool's intended use, highlighting important user experience considerations in LLMOps deployments.

From a production deployment perspective, the system processes requests in under 10 seconds compared to the previous hours-long manual process, representing a significant improvement in customer experience. The cost reduction from hundreds of dollars to cents per request demonstrates the economic value of successful LLMOps implementation. The team also implemented shadow mode testing, where the agent determines what actions it would take without actually executing them, allowing for safe evaluation on customer transactions before full rollout.

The case study includes important technical details about handling LLM hallucinations and ensuring consistent behavior. When the LLM produces invalid responses, the system informs it of the error and requests a retry until a valid response is generated. This retry mechanism is crucial for maintaining system reliability in production environments where model outputs must conform to strict business requirements.

An interesting aspect of the user experience design involves handling rejected requests. Initially, users received no feedback when requests were rejected, causing confusion about whether requests failed or were denied. The team solved this by using a second LLM to rewrite the primary LLM's technical rejection reasoning into plain language explanations for users, demonstrating the importance of communication design in LLMOps systems.

The technical architecture also leverages OLAP (Online Analytical Processing) queries alongside the LLM and embedding components, suggesting a hybrid approach that combines traditional data processing with modern AI techniques. The multimodal capabilities include processing receipt images to extract merchant information, line items, and other contextual data that helps validate user requests and improve classification accuracy.

The case study describes successful extensions of the core RAG-plus-LLM architecture to related problems, including batch processing for reclassifying transactions within existing merchants and matching credit card statement transactions to Ramp merchants for customer onboarding. These extensions demonstrate the reusability and adaptability of well-designed LLMOps architectures across related business use cases.

The system's success in handling corporate rebranding scenarios showcases the value of LLM knowledge synthesis, where the model can recognize when companies have changed names or websites based on its training data, something that would be difficult to encode in traditional rule-based systems. However, the case study also highlights the ongoing challenges, noting that about one-third of rejections may not be reasonable, suggesting areas for continued improvement in the system's decision-making capabilities.

Overall, this case study represents a comprehensive example of production LLMOps implementation, covering the full spectrum from problem identification and technical architecture design through evaluation strategies and user experience considerations. The combination of multiple AI techniques, careful guardrail implementation, and thoughtful evaluation methodology provides a solid blueprint for similar applications in financial technology and beyond.