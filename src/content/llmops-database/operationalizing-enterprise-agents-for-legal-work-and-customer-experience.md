---
title: "Operationalizing Enterprise Agents for Legal Work and Customer Experience"
slug: "operationalizing-enterprise-agents-for-legal-work-and-customer-experience"
draft: false
llmopsTags:
  - "customer-support"
  - "document-processing"
  - "classification"
  - "chatbot"
  - "high-stakes-application"
  - "realtime-application"
  - "unstructured-data"
  - "rag"
  - "fine-tuning"
  - "model-optimization"
  - "agent-based"
  - "memory"
  - "human-in-the-loop"
  - "latency-optimization"
  - "error-handling"
  - "evals"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "scalability"
  - "reliability"
  - "guardrails"
  - "security"
  - "compliance"
  - "openai"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Harvey / Sierra"
summary: "Harvey and Sierra illustrate two production approaches to enterprise GenAI: Harvey applies LLMs to high-volume legal workflows such as diligence, document extraction, drafting, and collaborative review, while Sierra deploys customer-service agents that retrieve business context and take actions across operational systems. Both companies have moved beyond basic retrieval-augmented question answering toward agent development lifecycles that combine model selection, workflow builders, tool and API calls, simulations, online supervision, human verification, and post-conversation analysis. The discussion emphasizes that enterprise trust depends less on perfect outputs than on predictable behavior, transparency, appropriate escalation, and measurable performance, while acknowledging ongoing tradeoffs around latency, model volatility, security, bespoke implementation, and the cost of forward-deployed customer teams."
link: "https://www.youtube.com/watch?v=Bj2BRrAiOy4"
year: 2026
seo:
  title: "Harvey / Sierra: Operationalizing Enterprise Agents for Legal Work and Customer Experience - ZenML LLMOps Database"
  description: "Harvey and Sierra illustrate two production approaches to enterprise GenAI: Harvey applies LLMs to high-volume legal workflows such as diligence, document extraction, drafting, and collaborative review, while Sierra deploys customer-service agents that retrieve business context and take actions across operational systems. Both companies have moved beyond basic retrieval-augmented question answering toward agent development lifecycles that combine model selection, workflow builders, tool and API calls, simulations, online supervision, human verification, and post-conversation analysis. The discussion emphasizes that enterprise trust depends less on perfect outputs than on predictable behavior, transparency, appropriate escalation, and measurable performance, while acknowledging ongoing tradeoffs around latency, model volatility, security, bespoke implementation, and the cost of forward-deployed customer teams."
  canonical: "https://www.zenml.io/llmops-database/operationalizing-enterprise-agents-for-legal-work-and-customer-experience"
  ogTitle: "Harvey / Sierra: Operationalizing Enterprise Agents for Legal Work and Customer Experience - ZenML LLMOps Database"
  ogDescription: "Harvey and Sierra illustrate two production approaches to enterprise GenAI: Harvey applies LLMs to high-volume legal workflows such as diligence, document extraction, drafting, and collaborative review, while Sierra deploys customer-service agents that retrieve business context and take actions across operational systems. Both companies have moved beyond basic retrieval-augmented question answering toward agent development lifecycles that combine model selection, workflow builders, tool and API calls, simulations, online supervision, human verification, and post-conversation analysis. The discussion emphasizes that enterprise trust depends less on perfect outputs than on predictable behavior, transparency, appropriate escalation, and measurable performance, while acknowledging ongoing tradeoffs around latency, model volatility, security, bespoke implementation, and the cost of forward-deployed customer teams."
notion:
  pageId: "3d1f8dff-2538-802c-ab6a-cfeb8536adc5"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-04T08:04:00.000Z"
  lastEditedTime: "2026-09-04T08:04:00.000Z"
  publishedAt: "2026-09-04T08:05:58Z"
---

## Overview
Harvey and Sierra demonstrate how enterprise AI products are being operationalized in two different but related environments. Harvey focuses on legal work, initially targeting transactional corporate workflows such as fund formation, acquisitions, venture financing, diligence, and contract analysis. Sierra builds customer-experience agents that operate across channels and business systems, helping companies resolve customer requests rather than merely answering questions. In both cases, the production challenge is not simply selecting a capable language model. It is assembling a dependable system around the model: supplying the right context, connecting tools and data, defining guardrails, evaluating behavior, managing human review, and adapting quickly as models and customer expectations change.

The companies describe a progression from early retrieval-augmented question answering to agents that perform multi-step work and take actions. Harvey has expanded from asking questions over a small set of files to extracting dozens of terms across thousands of documents, identifying low-confidence results for lawyer review, and supporting drafting and collaborative workflows. Sierra has progressed from conversational retrieval toward agents that can access product catalogs, policies, customer history, and operational APIs, then execute actions such as processing and shipping an order. The claims are based primarily on the companies’ own descriptions; the discussion provides useful operating practices but does not independently verify customer-impact metrics or comparative performance.

## Problem and Initial Product Wedges
Harvey selected transactional legal work as an initial wedge because it is high-volume, repetitive, document-heavy, and often context-complete. In a diligence exercise, for example, the relevant evidence may be contained largely in the target company’s contracts and related deal materials. Lawyers need to identify risks such as problematic supplier-agreement terms, compare them with the client’s preferences, and produce usable work product. This differs from a purely fact-based legal research task: transactional analysis can be preference-dependent and involves judgment about what constitutes an acceptable risk.

The early product reportedly concentrated on capabilities that were immediately useful with limited model intelligence: question answering over files, extraction from a small number of documents, and a connection to the SEC database for external reference. This was a pragmatic LLMOps strategy. Instead of attempting to automate all legal research or ingest every possible source of case law, the system focused on a bounded workflow where the available documents supplied much of the required context. That narrower scope reduced integration complexity and made it easier to demonstrate value while keeping lawyers involved in the process.

Sierra faced a different prioritization problem because customer experience spans potentially unlimited intents, channels, and business processes. Use cases are selected with reference to the customer’s operational goals, such as Sonos’s “time to music” metric. A high-value workflow might involve troubleshooting a speaker, answering a product question, or ordering replacement equipment. The agent must understand the request, retrieve applicable knowledge and policies, identify the customer and product context, call the correct business API, and communicate progress in a way that fits the situation. The value therefore depends on successful end-to-end resolution, not on the quality of an isolated generated response.

## Architecture and Agent Development Lifecycle
Both products treat the LLM as one component in a larger application architecture. Sierra explicitly frames its operating model as an agent development lifecycle analogous to the software development lifecycle. Product teams define goals and guardrails, provide context, configure tools, test the agent, release it, monitor live behavior, and use production data to determine what to improve next. Sierra supports no-code construction for business teams while also providing an SDK for more technical customization. This combination is intended to let customers prototype and deploy workflows without requiring every change to be implemented as bespoke engineering work.

Sierra agents are connected to enterprise knowledge and action systems. The required context can include product catalogs, policies, customer information, and historical interactions. Tool calls and API calls allow the agent to perform actions such as placing and shipping an order. The architecture must distinguish between conversational reasoning and authoritative system actions: the model may decide which tool is relevant, but the underlying business system should remain responsible for validating and executing the transaction. The discussion does not specify the exact integration protocols, data stores, or access-control implementation, so those details should not be inferred.

Harvey’s platform is described as an “IDE for lawyers,” with components corresponding to a document editor, spreadsheet-like analysis, and search over internal and external information. Its workflow builder combines deterministic patterns with probabilistic LLM operations. Customers can create workflows triggered by business events, such as receiving an email containing a credit agreement, followed by risk analysis and a resulting score. This compositional design lets customers discover use cases that the vendor may not have anticipated, after which particularly valuable patterns can be productized more deeply.

At larger scale, Harvey’s document-processing pipeline can extract approximately 70 terms from as many as 10,000 documents in a transaction. The output is not treated as uniformly reliable: confidence is used to identify cases that require associate inspection. The system therefore supports a risk-based human-in-the-loop process rather than presenting bulk extraction as fully autonomous legal judgment. Harvey also uses document-ingestion and document-processing infrastructure, including an external vendor for that part of the stack, while retaining tighter control over evaluation and domain-specific quality layers.

## Evaluation, Testing, and Production Controls
Sierra describes pre-release simulations in which customer-defined personas and scenarios exercise an agent. These scenarios can include ordinary requests as well as adversarial or irrelevant behavior, such as attempts to discuss sensitive topics unrelated to the company. The simulations can be rerun after agent changes, providing a form of regression testing. This is important for agents because a change to prompts, tools, policies, or models can improve one path while degrading another. Customer-specific scenarios also help align testing with the business’s actual users and risk profile.

Sierra supplements offline testing with online supervisory checks. During a live conversation, separate model-based checks analyze the user’s message and the agent’s proposed response while the main reasoning process is determining what to say or which tool to call. The company characterizes this as an average of roughly 20 inference calls per message, running in parallel where possible. A response is not sent unless the supervisor gives approval. This design can catch safety, policy, or quality problems before they reach the customer, but it introduces additional inference cost, system complexity, and potential latency. A supervisor model is also not automatically authoritative; its thresholds, failure modes, and false-positive behavior require their own evaluation.

After each conversation, Sierra performs further analysis of what happened, including sentiment and other quality signals. Teams can query large collections of conversations to find cases involving transfer to a human, worsening or improving sentiment, or other patterns that indicate where the agent is succeeding or needs improvement. This creates a feedback loop from production traces to product prioritization. It also supports a distinction between safety incidents and ordinary quality gaps: an agent can be safe but still fail to solve a customer’s problem efficiently or naturally.

Harvey places particular emphasis on domain-expert preference evaluation. Lawyers review alternative outputs using side-by-side and absolute rankings, with human preference treated as a strong indicator of customer happiness and retention. This acknowledges that generic benchmark scores may not reflect whether a legal output is useful, appropriately cautious, aligned with professional conventions, or easy to revise. Harvey also reports using online hallucination detection on production queries and publishing a legal evaluation benchmark. These practices increase transparency, although benchmark results and internal preference judgments should not be interpreted as proof of error-free legal advice.

## Model Operations and User Experience
The model layer is managed as a rapidly changing dependency. Teams build “model sense” by directly trying models on representative tasks and learning their strengths and weaknesses, rather than relying only on aggregate benchmark metrics. Model choice is task-specific. For voice customer service, transcription quality, synthesis quality, response latency, and accurate handling of details such as license plates or birth dates may matter differently from the requirements of a legal document-editing workflow. Safety classification may prioritize accuracy over speed, while a conversational response may need to prioritize low latency.

The product can compensate for model limitations through interaction design. In legal extraction, asking the user to confirm the intended terms or showing examples before processing can improve the result compared with a one-shot request. In customer service, the agent can provide a brief explanation when a longer backend operation is underway, but should avoid unnecessary disclosures of internal work for simple questions. These choices trade latency and transparency against conversational smoothness. The underlying principle is that a good agent manages user expectations and gives users meaningful opportunities to correct or verify it.

The companies also use controlled production experiments. Sierra describes testing alternative voices or models on a percentage of traffic, including a voice with a slight regional accent for a customer base where it improved engagement-related outcomes. Harvey tests new models against internal frameworks covering classification, response quality, and safety, then may expose a promising model to selected agents, design partners, or a portion of traffic before making it central to a workflow. This staged rollout is a sensible response to rapid model releases, but the discussion does not provide experimental design details, sample sizes, or independently validated effect sizes.

## Deployment Model and Customer Feedback
Forward-deployed personnel are a major part of both companies’ enterprise delivery strategy. Sierra uses customer-facing teams to understand business processes, prototype agents, and identify reusable patterns that can be brought back into the platform. Harvey uses forward-deployed lawyers who combine legal expertise with product knowledge, and adds engineers and product managers for enterprise customers requiring substantial integrations with legacy data, APIs, or internal systems. The companies stress that this model does not replace productization: customer experts help discover and configure solutions, while no-code builders, SDKs, and reusable platform capabilities are needed to scale.

Successful personnel in these roles are described as curious, commercially minded, technically or AI fluent, adaptable, and capable of building trust with customers. They need to determine which workflows deliver the greatest value rather than implementing every requested feature. The model creates a valuable feedback channel, but it also creates operational costs and a risk of one-off customization. A mature deployment motion therefore needs explicit mechanisms for converting field learnings into reusable connectors, templates, evaluation cases, and product features.

## Trust, Reliability, and Tradeoffs
The central trust principle is that the most trusted agent is not necessarily the one that is always right; it is the one that does not frequently surprise users. Both companies seek predictable behavior through guardrails, staged testing, verification, monitoring, and transparent access to outputs and quality signals. Harvey encourages users to participate in creating and checking work product rather than treating the model as an invisible authority. Sierra exposes conversation analytics so customers can inspect how the agent behaves across many interactions.

This approach resembles reliability engineering more than a promise of perfection. Agents are nondeterministic, so organizations need to define acceptable error bounds, distinguish severe safety or brand failures from minor quality deviations, and monitor service-level objectives such as latency and successful resolution. More checks can improve safety and confidence but may increase cost and response time. More context can improve grounding but raise privacy, access-control, and prompt-management requirements. More autonomy can reduce human workload but increases the consequences of incorrect tool selection or stale business data.

Roadmaps are consequently short and continuously revised. The companies favor large quarterly or even monthly bets over detailed long-range commitments, while tracking model-provider roadmaps to avoid investing heavily in capabilities likely to become commodity infrastructure. Memory and connectors are identified as important areas for enterprise continuity and context. At the same time, the case cautions against generic enterprise search as a durable product wedge: broad search across systems such as Slack, Salesforce, and call data may become standard platform functionality, making verticalized workflows, trusted execution, and superior user experience more defensible.

Overall, Harvey and Sierra’s operating lessons are consistent with production LLMOps: constrain the initial workflow, connect models to authoritative data and tools, evaluate with domain experts and realistic simulations, use online controls where risk justifies the overhead, expose evidence and quality signals, and continuously learn from real usage. The approach is promising for augmenting legal professionals and automating customer-service work, but it remains dependent on careful human oversight, customer-specific integration, disciplined experimentation, and honest measurement of quality, cost, latency, and failure rates.
