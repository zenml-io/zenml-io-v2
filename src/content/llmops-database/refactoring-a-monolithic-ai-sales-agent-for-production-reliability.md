---
title: "Refactoring a Monolithic AI Sales Agent for Production Reliability"
slug: "refactoring-a-monolithic-ai-sales-agent-for-production-reliability"
draft: false
llmopsTags:
  - "customer-support"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "multi-agent-systems"
  - "cost-optimization"
  - "error-handling"
  - "latency-optimization"
  - "token-optimization"
  - "orchestration"
  - "monitoring"
  - "open-source"
  - "documentation"
  - "microservices"
  - "scaling"
  - "google-gcp"
industryTags: "tech"
company: "Google"
summary: "Google's AI Agent Clinic tackled the challenge of transforming \"Titanium,\" a brittle sales research agent that worked locally but failed in production due to monolithic architecture, hardcoded data, and lack of observability. The team rebuilt the agent using Google's Agent Development Kit (ADK), decomposing it into orchestrated sub-agents, implementing Pydantic-based structured outputs, replacing hardcoded case studies with a dynamic RAG pipeline powered by Vector Search, integrating OpenTelemetry observability, and adding cost optimization through built-in retry mechanisms. The refactored system emerged as a production-ready, scalable, and observable AI agent capable of autonomous research and personalized email generation without the fragility of the original prototype."
link: "https://developers.googleblog.com/production-ready-ai-agents-5-lessons-from-refactoring-a-monolith/"
year: 2026
seo:
  title: "Google: Refactoring a Monolithic AI Sales Agent for Production Reliability - ZenML LLMOps Database"
  description: "Google's AI Agent Clinic tackled the challenge of transforming \"Titanium,\" a brittle sales research agent that worked locally but failed in production due to monolithic architecture, hardcoded data, and lack of observability. The team rebuilt the agent using Google's Agent Development Kit (ADK), decomposing it into orchestrated sub-agents, implementing Pydantic-based structured outputs, replacing hardcoded case studies with a dynamic RAG pipeline powered by Vector Search, integrating OpenTelemetry observability, and adding cost optimization through built-in retry mechanisms. The refactored system emerged as a production-ready, scalable, and observable AI agent capable of autonomous research and personalized email generation without the fragility of the original prototype."
  canonical: "https://www.zenml.io/llmops-database/refactoring-a-monolithic-ai-sales-agent-for-production-reliability"
  ogTitle: "Google: Refactoring a Monolithic AI Sales Agent for Production Reliability - ZenML LLMOps Database"
  ogDescription: "Google's AI Agent Clinic tackled the challenge of transforming \"Titanium,\" a brittle sales research agent that worked locally but failed in production due to monolithic architecture, hardcoded data, and lack of observability. The team rebuilt the agent using Google's Agent Development Kit (ADK), decomposing it into orchestrated sub-agents, implementing Pydantic-based structured outputs, replacing hardcoded case studies with a dynamic RAG pipeline powered by Vector Search, integrating OpenTelemetry observability, and adding cost optimization through built-in retry mechanisms. The refactored system emerged as a production-ready, scalable, and observable AI agent capable of autonomous research and personalized email generation without the fragility of the original prototype."
notion:
  pageId: "3b5f8dff-2538-80a6-9312-c794d34e787f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T13:12:00.000Z"
  lastEditedTime: "2026-08-07T13:12:00.000Z"
  publishedAt: "2026-08-07T13:23:11Z"
---

## Overview

This case study documents Google's "AI Agent Clinic" initiative, specifically Episode 1, which focused on refactoring a sales research AI agent called "Titanium." The case presents a valuable production LLMOps narrative because it explicitly contrasts prototype-level AI development with production-grade engineering, highlighting the operational, architectural, and observability challenges that emerge when moving LLM-based systems from local development to real-world deployment.

The original Titanium agent was designed to research target companies and generate personalized outreach emails by analyzing case studies. While functionally operational in prototype form, it suffered from critical production readiness issues including monolithic architecture, brittle execution patterns, hardcoded knowledge bases, lack of observability, and potential cost runaway scenarios. The case study walks through five major refactoring lessons that collectively transformed this fragile prototype into a production-ready system.

It's worth noting that this content comes from Google and specifically promotes their Agent Development Kit (ADK) and Google Cloud services. While the technical patterns discussed are generally sound and represent genuine LLMOps challenges, readers should maintain appropriate skepticism about the seamlessness of the solutions presented and recognize that alternative tooling and approaches exist in the broader ecosystem.

## The Original Problem: Prototype Fragility

Titanium's initial implementation exhibited several characteristics common to early-stage AI agent development. The agent ran as a monolithic Python script built around a massive linear for-loop that sequentially executed research tasks, case study retrieval, and email drafting. This architecture created several failure modes: if any sub-task encountered an API timeout, rate limit, or model hallucination, the entire process would stall and fail silently without meaningful error reporting or recovery mechanisms.

The knowledge base consisted of only twelve case studies hardcoded directly into the Python file, meaning the agent's context was artificially constrained and couldn't scale or update without developer intervention and code redeployment. Output formatting relied on extensive prompt engineering to coerce JSON responses from the LLM, resulting in bloated prompts, wasted tokens, fragile parsing logic, and no structural guarantees on the returned data.

Perhaps most critically for production operations, the system lacked observability infrastructure. When failures occurred, operators had no visibility into which component failed, why it failed, or what the execution flow looked like leading up to the failure. This "black box" characteristic is particularly problematic for LLM-based systems where non-deterministic behavior and subtle context issues can cause difficult-to-reproduce failures.

## Solution Architecture: Orchestrated Sub-Agents

The first major refactoring decision involved decomposing the monolithic script into specialized sub-agents orchestrated through Google's Agent Development Kit. The team implemented a SequentialAgent pipeline pattern that broke the workflow into distinct nodes: Company Researcher, Search Planner, Case Study Researcher, Selector, and Email Drafter. Each sub-agent has a narrow, well-defined responsibility rather than attempting to handle the entire workflow in a single massive prompt.

This architectural pattern aligns with established microservices principles applied to the AI agent domain. By creating separation of concerns, each component can be developed, tested, and debugged independently. More importantly for production reliability, failures can be isolated to specific components rather than cascading through the entire system. The orchestration layer (ADK in this case) handles coordination, state management between agents, and provides retry logic at the component level.

From an LLMOps perspective, this decomposition offers several operational advantages. Individual sub-agents can be monitored separately with distinct performance metrics. Prompt engineering becomes more focused since each agent has a specific task rather than juggling multiple concerns. The system also becomes more maintainable since improvements to one component (for example, enhancing the Search Planner's query generation) don't require refactoring unrelated components.

However, this pattern does introduce complexity. Orchestration frameworks add another dependency and potential failure point. State management between agents requires careful design to avoid data inconsistency. The team doesn't explicitly discuss how they handle partial failures—for instance, if the Case Study Researcher succeeds but the Email Drafter fails, does the system retry from the beginning or resume from the failure point? These are important production considerations that the promotional content doesn't fully address.

## Structured Outputs via Pydantic

The second major refactoring addressed output formatting through Pydantic schema validation. The original approach embedded extensive JSON formatting instructions directly in prompts, describing the exact structure the model should return. This technique is common in early LLM applications but creates several problems: prompts become bloated with schema descriptions consuming valuable context window space, parsing requires custom string manipulation logic that's fragile to minor formatting variations, and there's no runtime guarantee that the model will actually conform to the requested structure.

The refactored solution uses Pydantic BaseModel classes as explicit schema definitions that ADK injects into the model request. The framework leverages Structured Outputs functionality (likely referring to OpenAI-style structured output modes or similar constrained decoding approaches) to force the model to conform to the schema at generation time rather than relying on prompt instructions and hope.

This represents a significant maturation in LLMOps practice. By moving the "contract" from natural language prompting to typed Python objects with runtime validation, the system gains type safety, automatic validation, and cleaner code. The example shows a CompanyIntel class with typed fields for company name and pain points list, replacing verbose prompt instructions.

From a production operations perspective, this eliminates an entire class of parsing errors and makes the system more predictable. Structured outputs also typically reduce token consumption since schema information can be encoded more efficiently than natural language descriptions. The approach enables better testing since you can validate outputs against schemas programmatically rather than manually inspecting generated text.

That said, structured outputs have limitations. They work well for extractive tasks and structured data but can constrain creative generation tasks where you want the model to have formatting flexibility. The case study doesn't discuss whether Structured Outputs cover all their use cases or if some components still rely on free-form generation. Additionally, structured output support varies across model providers and versions, potentially creating vendor lock-in concerns.

## Dynamic RAG Pipeline with Vector Search

The third refactoring replaced the hardcoded twelve-case-study knowledge base with a dynamic Retrieval-Augmented Generation (RAG) pipeline. The new architecture includes an asynchronous web crawler built with Playwright that autonomously scrapes Google Cloud's customer success website, extracting case studies and indexing them into Google Cloud Vector Search. During execution, the Case Study Researcher sub-agent performs hybrid search queries against this vector database to retrieve relevant case studies based on the target company's characteristics.

The team specifically notes they're using "Hybrid Search," which combines semantic vector similarity with keyword-based exact matching. This is an important LLMOps detail because pure vector search can sometimes miss documents containing specific technical terms or product names if the embedding space doesn't capture those distinctions well. Hybrid approaches provide a useful balance between semantic understanding and precision recall.

This transformation represents the shift from prototype to production RAG systems. Hardcoded context is fine for demonstrations but fundamentally doesn't scale. Production systems need mechanisms to ingest, update, and query knowledge bases dynamically. The asynchronous crawler architecture means the knowledge base can refresh without manual intervention, though the case study doesn't specify the refresh cadence or how they handle versioning and consistency.

From an operational perspective, this introduces significant new infrastructure requirements. Vector databases need to be provisioned, monitored, and maintained. Embedding generation requires compute resources and may add latency to the ingestion pipeline. The crawler needs to handle website changes, rate limiting, and parsing errors robustly. Search quality becomes a critical operational metric requiring ongoing evaluation and tuning.

The case study doesn't deeply explore some important production RAG considerations. How do they handle chunking strategy for case studies? What embedding model are they using and how was it selected? How do they evaluate retrieval quality? What's the latency profile of the vector search queries? Are there caching strategies to avoid repeated embeddings of identical queries? These are all critical LLMOps concerns that production RAG systems must address, though they're beyond the scope of this refactoring narrative.

One should also note the tight integration with Google Cloud Vector Search. While this is understandable given the source, production teams should evaluate whether this creates acceptable vendor lock-in or whether maintaining compatibility with alternative vector stores (Pinecone, Weaviate, Qdrant, etc.) would provide operational flexibility.

## Observability with OpenTelemetry

The fourth major improvement addressed the "black box" problem through comprehensive observability infrastructure. The refactored system integrates OpenTelemetry, an open-source observability framework that ADK supports natively. The framework automatically emits distributed traces capturing the full execution flow across all sub-agents, including model requests, token consumption, tool executions, and latencies.

The implementation appears remarkably simple in the presented code snippet—a single function call to configure_telemetry with a project ID and streaming flag. ADK handles the instrumentation automatically, which is a significant developer experience advantage compared to manually instrumenting every component.

Beyond the standard OpenTelemetry backend, the team built a custom Server-Sent Events (SSE) streaming application that serves as a live telemetry dashboard, providing real-time visibility into agent execution. This addresses a critical operational need: the ability to observe what an AI agent is doing while it's running, not just after it completes or fails.

From an LLMOps perspective, observability is indeed non-negotiable for production AI systems. LLMs introduce non-deterministic behavior, and multi-step agent workflows create complex execution paths that are impossible to debug without detailed telemetry. The ability to trace a specific request through the entire pipeline, see which sub-agents were invoked, what prompts were sent, what responses were received, and where time was spent is essential for both debugging and optimization.

Distributed tracing also enables critical operational capabilities like identifying performance bottlenecks (is the vector search slow or is it the LLM generation?), understanding cost attribution (which components consume the most tokens?), debugging quality issues (did retrieval return irrelevant documents or did the LLM misinterpret good context?), and establishing performance baselines for regression detection.

However, the case study presents an optimistic view of observability implementation. Production observability requires thoughtful instrumentation of custom business logic beyond what frameworks provide automatically. Trace data volume can become substantial, requiring sampling strategies and storage management. Making telemetry actionable requires building dashboards, alerts, and runbooks. The SSE streaming dashboard sounds useful but introduces additional infrastructure to maintain and secure.

Additionally, observability for LLM systems has unique challenges. How do you effectively trace and debug prompt chains? How do you correlate traces with specific prompt versions when you're iterating rapidly? How do you handle PII in traces when prompts and responses might contain sensitive information? These are areas where LLMOps tooling is still maturing.

## Cost Optimization and Circuit Breakers

The fifth refactoring lesson addresses cost control, a critical concern for production LLM systems. Agentic loops present particular risk because errors can trigger retry logic that repeatedly invokes expensive model APIs. Without strict boundaries, a misbehaving agent can burn through token budgets in minutes, potentially costing hundreds or thousands of dollars.

The solution leverages ADK's built-in orchestration capabilities, which include exponential backoffs, timeout boundaries, and configurable retry loops. Rather than implementing custom try-catch logic throughout the codebase, these protections come "for free" from the framework.

This represents sound engineering practice: leveraging framework-provided reliability patterns rather than reimplementing them. Exponential backoff is a well-established pattern for handling transient failures in distributed systems, and timeout boundaries prevent indefinite waiting on stuck operations. Configurable retry limits ensure that persistent failures don't result in infinite loops.

From an LLMOps perspective, cost management is one of the most important operational concerns teams face when moving to production. Token-based pricing means that usage directly translates to cost, and unlike traditional compute where costs scale relatively linearly with load, agentic systems can exhibit unpredictable cost behavior based on execution paths taken.

Production LLM systems need multiple layers of cost protection. Circuit breakers prevent runaway individual requests. Rate limiting controls overall throughput. Budget alerts notify operators of anomalous spending. Usage attribution tracks costs to specific users or workflows. Caching reduces redundant API calls for identical inputs.

The case study presents ADK's built-in cost controls as sufficient, but production teams typically need additional safeguards. How do you set appropriate retry limits—too low and you get false failures, too high and you risk cost overruns? How do you handle partial completion in multi-step workflows—do you cache intermediate results to avoid redoing expensive operations? How do you test cost behavior under various failure scenarios before production deployment?

Additionally, cost optimization extends beyond just retry logic. Prompt engineering to reduce token consumption, selecting appropriately-sized models for different tasks, implementing response streaming to improve perceived latency without increasing costs, and using batch processing where real-time isn't required all contribute to cost-effective LLM operations.

## Production Deployment Considerations

While the case study focuses on refactoring the agent architecture, several production deployment aspects receive minimal or no coverage. The team doesn't discuss deployment infrastructure—are these agents running on Kubernetes, Cloud Run, Cloud Functions, or another platform? How are they handling scaling and load balancing? What's the deployment process for updating agents?

Authentication and authorization are not mentioned. How do users interact with Titanium? Is there API authentication? How are customer data and generated outputs secured? These are critical production concerns, particularly for an agent that processes company information and generates outreach emails.

Testing strategy is largely absent from the narrative. How do they validate that the refactored agent produces correct outputs? Are there integration tests for the full pipeline? How do they test retrieval quality? Do they use LLM-as-a-judge evaluation approaches or human review? Production AI systems require comprehensive testing strategies that go beyond traditional software testing.

Data management and privacy also receive no mention. Where are customer inputs stored? How long are they retained? How is PII handled in prompts and traces? What happens to generated emails—are they logged, and if so, how is that data secured?

The case study presents the refactoring as straightforward and successful, but production AI deployments typically involve significant ongoing operational effort. Monitoring model performance degradation over time, managing prompt drift as user needs evolve, handling model API changes and deprecations, and continuously optimizing costs all require dedicated attention.

## Critical Assessment

This case study provides valuable insights into the architectural patterns needed to move AI agents from prototype to production, covering genuine LLMOps challenges around orchestration, structured outputs, dynamic knowledge retrieval, observability, and cost control. The technical patterns discussed—decomposing monoliths into specialized components, using typed schemas instead of prompt-based formatting, implementing RAG with vector search, instrumenting with OpenTelemetry, and adding circuit breakers—are all sound engineering practices.

However, readers should maintain appropriate skepticism given the promotional context. The case study is published by Google to showcase ADK and Google Cloud services, and accordingly presents solutions as seamless and complete when production reality is typically messier. The single-line observability configuration and automatic cost optimization suggestions make implementation sound trivial when production observability and cost management actually require significant ongoing effort.

Alternative approaches exist throughout. The orchestration layer could be LangChain, CrewAI, AutoGen, or custom code rather than ADK. Vector search could use Pinecone, Weaviate, or other providers rather than Google Cloud Vector Search. Observability could leverage LangSmith, Weights & Biases, or other LLMOps platforms in addition to or instead of raw OpenTelemetry.

The case study also doesn't discuss failure cases, operational incidents, or limitations discovered. How well does hybrid search actually perform? What retrieval quality issues emerged and how were they addressed? What cost overruns occurred during development? These real-world complications would provide valuable learning but are absent from the narrative.

Despite these limitations, the case study effectively illustrates the operational maturity gap between prototype and production AI agents. The five lessons—orchestrated sub-agents, structured outputs, dynamic RAG, observability, and cost optimization—collectively represent a reasonable checklist for production readiness. Teams building similar systems will likely encounter these same challenges, even if their tooling choices differ from Google's stack.

The emphasis on observability deserves particular recognition. Too many AI projects treat monitoring as an afterthought, then struggle with debugging and optimization in production. Making observability a first-class concern from the beginning, as this refactoring does, sets a positive example for LLMOps practitioners.

Overall, this case study contributes useful technical patterns to the LLMOps discourse while requiring readers to look beyond the promotional framing to extract the substantive operational insights.
