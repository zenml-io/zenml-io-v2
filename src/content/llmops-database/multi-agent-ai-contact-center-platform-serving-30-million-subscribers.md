---
title: "Multi-Agent AI Contact Center Platform Serving 30 Million Subscribers"
slug: "multi-agent-ai-contact-center-platform-serving-30-million-subscribers"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "classification"
  - "summarization"
  - "question-answering"
  - "rag"
  - "embeddings"
  - "fine-tuning"
  - "prompt-engineering"
  - "reranking"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "memory"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "vllm"
  - "monitoring"
  - "open-source"
  - "nvidia"
  - "hugging-face"
industryTags: "telecommunications"
company: "LG U+"
summary: "LG U+ built a comprehensive AI Contact Center platform to handle customer service for 30 million subscribers across 17 contact centers with 4,500 human agents processing 150,000 calls daily. The solution includes customer-facing chatbots and voice bots for self-service, real-time AI advisors that assist human agents during calls with transcription and knowledge retrieval, and post-call automation for summarization and QA. The platform resolved 8 million cases per year through self-service and reduced consulting time by 60% through real-time recommendations. The technical implementation involved building custom document parsers for complex Korean documents, domain-specific embedding models, multi-agent architectures with supervisor patterns, and a pipeline for fine-tuning small language models (600M to 4B parameters) to reduce costs while maintaining performance."
link: "https://www.youtube.com/watch?v=eaSINaHBVf0"
year: 2026
seo:
  title: "LG U+: Multi-Agent AI Contact Center Platform Serving 30 Million Subscribers - ZenML LLMOps Database"
  description: "LG U+ built a comprehensive AI Contact Center platform to handle customer service for 30 million subscribers across 17 contact centers with 4,500 human agents processing 150,000 calls daily. The solution includes customer-facing chatbots and voice bots for self-service, real-time AI advisors that assist human agents during calls with transcription and knowledge retrieval, and post-call automation for summarization and QA. The platform resolved 8 million cases per year through self-service and reduced consulting time by 60% through real-time recommendations. The technical implementation involved building custom document parsers for complex Korean documents, domain-specific embedding models, multi-agent architectures with supervisor patterns, and a pipeline for fine-tuning small language models (600M to 4B parameters) to reduce costs while maintaining performance."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-ai-contact-center-platform-serving-30-million-subscribers"
  ogTitle: "LG U+: Multi-Agent AI Contact Center Platform Serving 30 Million Subscribers - ZenML LLMOps Database"
  ogDescription: "LG U+ built a comprehensive AI Contact Center platform to handle customer service for 30 million subscribers across 17 contact centers with 4,500 human agents processing 150,000 calls daily. The solution includes customer-facing chatbots and voice bots for self-service, real-time AI advisors that assist human agents during calls with transcription and knowledge retrieval, and post-call automation for summarization and QA. The platform resolved 8 million cases per year through self-service and reduced consulting time by 60% through real-time recommendations. The technical implementation involved building custom document parsers for complex Korean documents, domain-specific embedding models, multi-agent architectures with supervisor patterns, and a pipeline for fine-tuning small language models (600M to 4B parameters) to reduce costs while maintaining performance."
notion:
  pageId: "3b5f8dff-2538-8000-9bee-d1b259bcb762"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:27:00.000Z"
  lastEditedTime: "2026-08-07T12:27:00.000Z"
  publishedAt: "2026-08-07T12:31:59Z"
---

## Overview

LG U+ operates as one of three major telecommunications companies in South Korea, serving over 30 million subscribers, which represents more than half of the country's population. This massive customer base generates substantial contact center traffic, with 17 contact centers nationwide employing 4,500 human agents who handle approximately 150,000 calls per day. The challenges facing the organization were significant: long wait times, quality consistency issues, and severe human agent burnout. To address these operational pressures, LG U+ developed a comprehensive AI Contact Center platform that integrates LLMs throughout the entire customer service journey.

The platform demonstrates end-to-end LLMOps implementation across three distinct phases of customer interaction: before customers reach human agents, during active calls, and after call completion. This holistic approach resulted in 8 million cases resolved annually through self-service channels and a 60% reduction in consultation time, representing the core business value of the initiative.

## Product Architecture and Use Cases

The platform's architecture spans multiple customer touchpoints. The front-door experience includes voice bots and chatbots designed to handle routine tasks like bill payments, data checks, and plan sign-ups through self-service before customers ever reach a human agent. When automated systems cannot resolve an issue, the call escalates to human agents who are supported by AI advisors.

The real-time AI advisor represents a particularly sophisticated LLMOps implementation. During active calls, the system performs three simultaneous functions: transcribing the conversation in real-time, searching the knowledge base for relevant answers, and pushing appropriate responses to the agent's screen. This eliminates the need for agents to place customers on hold while manually searching for information, accounting for most of the 60% time savings achieved.

Post-call automation handles summarization and data entry tasks. The AI advisor automatically drafts call summaries and populates CRM forms, requiring only human review and confirmation rather than manual composition. Additionally, an automated QA system evaluates call quality immediately upon completion, removing the need for QA managers to manually review every recording.

## Technical Challenges: Document Parsing

One of the most significant technical challenges involved parsing the knowledge base of approximately 30,000 documents, with tens to hundreds changing daily. These documents arrive in various formats including HTML, images, PDF, and PowerPoint. However, the format variety was not the primary challenge. The real difficulty lay in the document structure itself, which the team humorously characterized as legacy Korean operational documents with long company history.

These documents present extreme structural complexity, mixing flowcharts, tables, conditional logic, and free text on single pages, with critical customer information often embedded within diagrams rather than text. Generic PDF parsers failed completely on this content, producing unusable output. The team recognized that effective parsing required understanding page structure, not merely extracting characters.

Their solution was an agentic document parser built on a fine-tuned small multimodal LLM. Rather than the simplistic approach of running OCR and asking an LLM to clean up text, which discards layout information and leads to hallucinations as the model cannot see structure, their approach provides the model with two parallel inputs: the page as an image and the extracted text context. The text informs the model what words are present, while the image shows how they are arranged spatially. By forcing both inputs to agree, the approach eliminates the space for hallucinations. This dual-modality design proved effective for handling complex Korean document structures.

## Retrieval and Embedding Challenges

After solving document parsing, the next challenge involved finding the right documents during retrieval. The team started with off-the-shelf embedding models but discovered a critical lesson: high scores on public benchmarks like Hugging Face leaderboards do not guarantee good performance in specific domains. Public benchmarks excel at general English or Korean text but fail when confronted with domain-specific vocabulary, including telecom jargon, brand names, and abbreviations unique to the organization.

A concrete example illustrates the problem: within LG U+ contact centers, human agents use the acronym WFDN, which stands for "World Free Data with No extra charges," referring to a specific data plan. No public embedding model has encountered this term during training, meaning even the highest-scoring models on public benchmarks will never correctly map WFDN to the appropriate plan documentation. This domain-specific vocabulary gap caused significant retrieval performance degradation.

The solution involved building custom embedding and reranking models through a three-step process. First, they constructed ground truth datasets from real feedback by collecting queries where the retriever failed and consulting domain experts to identify correct answers. These failure cases became valuable training data. Second, they implemented hard negative mining, which proved to be a turning point. Training only on easy negatives leads models to learn superficial distinctions between obviously different documents. What sharpens model performance is exposure to hard negatives: documents that appear similar but carry different meanings. Third, they employed a two-stage domain fine-tuning process consisting of domain adaptive pre-training to learn domain vocabulary, followed by contrastive learning to pull correct pairs closer while pushing incorrect pairs farther apart in embedding space. The resulting custom model outperformed all frontier models tested within their specific domain.

## Multi-Agent Architecture

Even with effective retrieval, the team encountered another challenge: retrieval scores do not directly correspond to user expectations. When a customer asks about "5G plans," the system might retrieve highly relevant documents about LG U+'s 30+ different 5G plans, but simply returning the top 5 or 10 matching documents does not constitute a useful answer. What users actually want is the kind of response a senior consultant would provide following standard operating procedures: contextual recommendations based on the customer's specific situation rather than keyword matching.

This realization prompted the shift from "retriever best select" to "agent select," implementing a multi-agent system with memory, planning, and tool access. The architecture follows a supervisor pattern with a simple but powerful loop: reason, route, and respond. When a user query arrives, it lands at a central supervisor agent that does not attempt to answer directly. Instead, the supervisor reasons about the query by examining it, checking long-term memory for context, and determining what kind of question it represents. The supervisor then routes the query to the appropriate specialist agent. Specialist agents are organized by domain, such as mobile services and home services, with each owning a specific slice of knowledge. The specialist responds by selecting from available tools including RAG, web search, or specialized calculators, fetching necessary information and returning answers through the supervisor.

An important design decision involved determining agent domain boundaries. Rather than organizing agents according to internal team structures, they collected one month of real queries and used AI-driven taxonomy analysis to establish boundaries that match how users actually formulate questions. This user-centric approach ensures the agent structure aligns with actual usage patterns rather than organizational convenience.

## Cost Optimization Through Small Language Models

Operating a multi-agent system at scale revealed another significant challenge: frontier LLMs are expensive at scale. Even widely used models in the 10 billion to 30 billion parameter range consume substantial GPU resources once traffic grows, and local deployment does not mean free operation. The team needed to reduce costs without sacrificing performance or throughput.

Their strategy drew inspiration from recent research suggesting that small language models represent the future of agentic AI. The core insight was that in agentic workflows, most steps involve narrow, repetitive tasks such as routing, classification, formatting, and tool selection. These tasks do not require frontier model capabilities; they require specialized, efficient models. The approach identifies high-traffic tasks and delegates them to smaller models fine-tuned specifically for those tasks, ranging from 600 million to 4 billion parameters. The key principle is that model size should match task requirements, and a combination of well-tuned small models working together can outperform monolithic large models for many production scenarios.

## Small Language Model Fine-Tuning Pipeline

Implementing this strategy required confronting known issues with small language models, including weak instruction following, messy JSON output, and language mixing where models sometimes switch languages mid-response. These challenges indicated the need for both supervised fine-tuning and preference optimization.

The team built a comprehensive pipeline for developing small language models in production. They established an evaluation pipeline using Arize as the backbone for tracing and evaluation, beginning with ground truth datasets and defined metrics. Baseline performance was measured using prompt optimization algorithms including DSPy and Arize prompt playground. For training data, they collected golden trajectories from teacher models using Arize's CLI and applied data augmentation techniques.

For the training process itself, standard fine-tuning served as the default approach, with ORPO and DPO used for preference optimization. Notably, they found that reinforcement learning was not effective before supervised fine-tuning for their specific tasks. For serving, they tuned vLLM parameters and implemented multi-LoRA serving, which allows multiple adapters on the same base model, a crucial capability for maintaining many specialized models efficiently.

This pipeline forms a closed-loop system that enables continuous model improvement. The cycle consists of tracing, evaluation, feedback collection, improvement, re-evaluation, deployment, and repetition. The team refers to this not as "fiber coding" but as "fiber tuning," emphasizing the continuous refinement process. Through this approach, models improve naturally over time without requiring constant manual intervention.

## Observability and Evaluation

The implementation places heavy emphasis on observability and evaluation as core LLMOps practices. The platform integrates Arize for comprehensive tracing of every step in the agent workflow, not just final answers. This includes tracing chain-of-thought reasoning, tool calling decisions, and distributed document retrieval. The level of observability enables detailed diagnosis of system behavior and identification of improvement opportunities.

Evaluation-driven development serves as a foundational principle, recognizing that in an environment where new models and papers emerge weekly, the only way to move fast without breaking things is to make AI quality measurable. The feedback system combines simple user feedback mechanisms like thumbs up/down and comment boxes with structured input from domain experts, creating a rich dataset for continuous improvement.

## Production Architecture and Deployment

The production architecture supports real-time operation at massive scale, handling 150,000 calls daily across multiple contact centers. All three layers of the platform, customer-facing bots, real-time agent assistance, and post-call automation, run on the same underlying architecture, ensuring consistency and operational efficiency.

The deployment approach emphasizes starting simple: beginning with one simple agent, ensuring it works properly, establishing evaluation infrastructure, and then scaling to multi-agent systems. This incremental approach reduces risk and enables learning at each stage before increasing complexity.

## Lessons and Critical Insights

The presentation emphasized five key lessons learned through production deployment. While these principles may seem obvious in theory, the team noted they only truly understood their importance after experiencing the consequences of ignoring them, with each lesson costing time, money, or both before becoming internalized.

Evaluation-driven development emerged as the first critical lesson. The rapid pace of new model releases requires making AI quality measurable to enable improvement without breaking production systems. Second, feedback is everything. The recommendation is to build the simplest possible feedback mechanism for users and pair it with structured input from domain experts. Third, start simple by implementing one agent, getting it working with proper evaluation, then scaling to multi-agent systems. Fourth, observability requires tracing every step, not just final answers, including chain-of-thought reasoning, tool calling, and document retrieval.

The fifth lesson involves building self-evolving loops. The goal is not shipping one good model but creating a closed-loop system where both users and agents interactively improve the system over time through the cycle of tracing, evaluation, feedback, improvement, re-evaluation, deployment, and repetition. This loop transforms a one-time AI demonstration into a production system that improves weekly. All features at LG U+ are now developed under the design principle of self-evolving closed-loop systems.

## Critical Assessment

This case study presents a comprehensive real-world implementation of LLMOps at significant scale, offering valuable insights into practical challenges and solutions. The transparency about failures and learning curves adds credibility, as does the specific quantification of results showing 8 million cases resolved annually and 60% consultation time reduction.

However, several aspects deserve scrutiny. The presentation was delivered at an Arize conference, suggesting potential bias toward highlighting that vendor's tools. While Arize clearly plays a significant role in the observability and evaluation infrastructure, the degree to which it is essential versus one option among several is unclear. The custom embedding model performance claims of beating "every frontier model we tested" lack specific metrics, making independent verification impossible. These claims should be understood as domain-specific performance within LG U+'s particular use case rather than general superiority.

The cost savings claims from using small language models are presented conceptually but lack specific numbers comparing GPU costs, latency metrics, or detailed performance comparisons between small and large models for specific tasks. The economic case would be stronger with concrete data. Similarly, while the 60% consultation time reduction is impressive, understanding what portion comes from real-time retrieval versus other factors would provide better insight into the specific contribution of different system components.

The document parsing solution using multimodal LLMs is innovative, but the presentation does not address error rates, edge cases, or the cost of maintaining and updating the fine-tuned parsing models as document formats evolve. The multi-agent architecture appears well-designed, but production challenges around agent coordination, failure modes, and fallback mechanisms receive limited discussion.

Despite these caveats, the case study demonstrates sophisticated LLMOps practices including domain-specific fine-tuning, hard negative mining for embeddings, multi-agent architectures, comprehensive observability, and closed-loop improvement systems. The emphasis on evaluation-driven development, user feedback integration, and continuous improvement through automated pipelines represents mature LLMOps thinking. The technical depth around small language model optimization and the practical focus on cost-performance tradeoffs reflects real production concerns rather than research experimentation.
