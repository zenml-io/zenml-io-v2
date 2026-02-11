---
title: "Building LinkedIn's First Production Agent: Hiring Assistant Platform and Architecture"
slug: "building-linkedin-s-first-production-agent-hiring-assistant-platform-and-architecture"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "695e11f86fa59c6f797de2e0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2026-01-07T07:57:51.486Z"
  createdOn: "2026-01-07T07:57:44.588Z"
llmopsTags:
  - "healthcare"
  - "question-answering"
  - "summarization"
  - "chatbot"
  - "classification"
  - "high-stakes-application"
  - "structured-output"
  - "agent-based"
  - "multi-agent-systems"
  - "rag"
  - "prompt-engineering"
  - "fine-tuning"
  - "embeddings"
  - "few-shot"
  - "semantic-search"
  - "instruction-tuning"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "chunking"
  - "system-prompts"
  - "langchain"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "microservices"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "spacy"
  - "microsoft-azure"
  - "openai"
  - "meta"
  - "hugging-face"
industryTags: "hr"
company: "LinkedIn"
summary: "LinkedIn evolved from simple GPT-based collaborative articles to sophisticated AI coaches and finally to production-ready agents, culminating in their Hiring Assistant product announced in October 2025. The company faced the challenge of moving from conversational assistants with prompt chains to task automation using agent-based architectures that could handle high-scale candidate evaluation while maintaining quality and enabling rapid iteration. They built a comprehensive agent platform with modular sub-agent architecture, centralized prompt management, LLM inference abstraction, messaging-based orchestration for resilience, and a skill registry for dynamic tool discovery. The solution enabled parallel development of agent components, independent quality evaluation, and the ability to serve both enterprise recruiters and SMB customers with variations of the same underlying platform, processing thousands of candidate evaluations at scale while maintaining the flexibility to iterate on product design."
link: "https://www.infoq.com/presentations/LinkedIn-agent-hiring-assistant/"
year: 2025
seo:
  title: "LinkedIn: Building LinkedIn's First Production Agent: Hiring Assistant Platform and Architecture - ZenML LLMOps Database"
  description: "LinkedIn evolved from simple GPT-based collaborative articles to sophisticated AI coaches and finally to production-ready agents, culminating in their Hiring Assistant product announced in October 2025. The company faced the challenge of moving from conversational assistants with prompt chains to task automation using agent-based architectures that could handle high-scale candidate evaluation while maintaining quality and enabling rapid iteration. They built a comprehensive agent platform with modular sub-agent architecture, centralized prompt management, LLM inference abstraction, messaging-based orchestration for resilience, and a skill registry for dynamic tool discovery. The solution enabled parallel development of agent components, independent quality evaluation, and the ability to serve both enterprise recruiters and SMB customers with variations of the same underlying platform, processing thousands of candidate evaluations at scale while maintaining the flexibility to iterate on product design."
  canonical: "https://www.zenml.io/llmops-database/building-linkedin-s-first-production-agent-hiring-assistant-platform-and-architecture"
  ogTitle: "LinkedIn: Building LinkedIn's First Production Agent: Hiring Assistant Platform and Architecture - ZenML LLMOps Database"
  ogDescription: "LinkedIn evolved from simple GPT-based collaborative articles to sophisticated AI coaches and finally to production-ready agents, culminating in their Hiring Assistant product announced in October 2025. The company faced the challenge of moving from conversational assistants with prompt chains to task automation using agent-based architectures that could handle high-scale candidate evaluation while maintaining quality and enabling rapid iteration. They built a comprehensive agent platform with modular sub-agent architecture, centralized prompt management, LLM inference abstraction, messaging-based orchestration for resilience, and a skill registry for dynamic tool discovery. The solution enabled parallel development of agent components, independent quality evaluation, and the ability to serve both enterprise recruiters and SMB customers with variations of the same underlying platform, processing thousands of candidate evaluations at scale while maintaining the flexibility to iterate on product design."
---

## Overview and Business Context

LinkedIn embarked on a multi-year journey to build production-ready LLM applications, starting with simple experiments in 2022-2023 and culminating in their first production agent, the Hiring Assistant, announced at their Talent Connect conference in October 2025. The case study presents a comprehensive view of how a major technology company scaled from prototype copilots to sophisticated multi-agent systems while building reusable platform infrastructure. The Hiring Assistant specifically targets professional recruiters who use LinkedIn's Recruiter tool, which has existed since 2008 and provides over 40 search filters for finding candidates. The product addresses the time-consuming cognitive task of reviewing potentially hundreds of candidates to determine which ones meet job qualifications.

The evolution followed three distinct eras: the collaborative articles era (simple GPT integration with no user input, offline processing), the coach era (conversational assistants with prompt chains, RAG, and online inference), and the agent era (task automation with prompt graphs, advanced RAG, skills abstraction, and human-in-the-loop workflows). This progression reflects a deliberate learning approach where each phase informed the architecture of the next.

## Architectural Evolution from Copilot to Agent

LinkedIn's AI-assisted search feature, released in the first half of 2024 as "Recruiter 2024," represented their copilot-era approach. This system allowed recruiters to use natural language to interact with the existing structured search interface. For example, a recruiter could say "find me accountants in New York with experience in bank reconciliation" and the system would translate this into the 40+ search facets that already existed in the product. However, this translation from open-ended natural language semantics to constrained logical structures resulted in significant information loss, which became a key lesson learned.

The copilot system initially used a single LLM block (prompt template, LLM, and RAG for few-shot examples) but evolved to a modular architecture with a manager/coordinator that routed requests to specialized sub-components. For instance, separate modules handled locations (understanding that "NY" could mean New York City, the metropolitan area, or the state), titles, companies, and other facets. This modular design enabled parallel development by multiple engineers and independent quality improvement of each component without side effects. However, the team recognized that errors could compound across stages - if each stage has 90% accuracy, two stages together only achieve 81% accuracy. The justification for modularity was that engineering each sub-component to very high quality would yield better overall results than a monolithic approach.

## Agent Architecture: Supervisor and Sub-Agents

The Hiring Assistant represents a fundamental shift to an agent-based architecture where the modular components are themselves sub-agents rather than simple LLM blocks. The system employs a supervisor agent that receives user input, determines intent, and routes requests to appropriate sub-agents with additional context. Each sub-agent can use skills (their term for tools) and return information back to the supervisor. This hierarchical design pattern was mentioned as similar to approaches discussed in other talks at the conference.

The intake agent handles the initial hiring intent from the user, which might include a job posting, notes about the candidate, or even a resume of an employee who is leaving. This agent generates a set of natural language qualifications rather than immediately translating to structured search filters. By preserving the semantic richness of natural language longer in the pipeline, the system can evaluate candidates against textual qualifications without the information loss that occurred in the copilot approach.

The sourcing agent reads the qualifications and uses skills to generate search queries that feed through LinkedIn's existing Recruiter Search index. Importantly, this agent can run multiple different queries in parallel and explore the search space in different ways, mimicking how human recruiters actually work through iterative refinement rather than running a single search.

The candidate evaluation component represents the highest scale part of the system. While intake scales with the number of recruiters, candidate evaluation scales with the number of candidates per job (potentially thousands of applicants or hundreds of search results). For each candidate, the system takes qualifications and the candidate's profile/resume and produces an evaluation showing whether evidence exists for each qualification, complete with citations showing where supporting evidence appears. This "receipts" approach provides transparency and explainability.

## Platform Infrastructure: Prompt Management

Rather than having developers manage prompts as simple strings, LinkedIn built a centralized prompt source of truth service that acts as a facade managing templates with placeholders, guardrail instructions for trust and responsible AI, namespacing, use case-based segregation, versioning, and backward compatibility checks. The system organizes prompts hierarchically with apps at the top level, namespaces within apps, use cases under those, and different versions beneath. This abstraction layer freed developers from repetitive work and provided version switching capabilities essential for rapid iteration.

## LLM Inference Abstraction

LinkedIn built an LLM inference service that abstracts away model choice while exposing the OpenAI chat completions API as a de facto standard. This proxy layer enables configuration-based switching between Azure OpenAI models and on-premises hosted open-source models that are further fine-tuned. Critically, having a single chokepoint for LLM inference enables centralized quota management (since LLMs are expensive and GPUs limited) and runtime moderation for trust, safety, and responsible AI purposes. The abstraction allows rapid model switching as new models emerge without requiring application code changes.

## Application Framework: LangChain and LangGraph Integration

LinkedIn selected LangChain and LangGraph as their application framework to enable prompt chaining, memory interaction, skill invocation, and LLM inference. Rather than having developers use these frameworks directly in inconsistent ways, they built adapters and helpers so developers get standardized patterns out of the box. The platform architecture is explicitly layered so that the lower-level platform components are separated from the LangChain/LangGraph adapters. This design allows switching to alternative frameworks relatively cheaply if a better option emerges, acknowledging the rapid pace of change in the space.

## Distributed Systems and Messaging

Scaling agentic workloads horizontally across many instances introduces classic distributed systems challenges (state consistency, traffic shifts, host outages, ephemeral failures) with the twist that everything is non-deterministic. LinkedIn solved this by modeling all communication between users and agents, and agents and agents, as messages. Each message combines structured data (like a job already available as JSON) and unstructured data (freeform text instructions). Notably, they explicitly avoid sending prompts in messages, as that proved problematic.

The messaging infrastructure leverages the same platform that powers LinkedIn messages. A messaging service persists messages to a database and attempts delivery through an agent orchestrator service. If online delivery fails, a nearline retry mechanism kicks in. Traffic shifts use a nearline retargeting service with local and aggregate queues. This allows them to piggyback on resilience mechanisms already proven for LinkedIn's messaging product. The orchestrator provides an RPC interface to developers while handling all messaging abstractions underneath, so developers don't implement messaging logic directly.

For execution concurrency, LinkedIn implements threads (similar to messaging threads) that enforce sequential First-In-First-Out delivery within a thread while allowing parallelism across threads. This provides a mechanism to balance sequential processing where context matters versus parallel processing where tasks are independent.

## Memory Architecture

Since LLMs are stateless, LinkedIn built a scoped and layered memory system. Working memory contains task context for a particular task, including conversation history. Long-term memory includes episodic memory (what happened in a given episode or session) and procedural memory (recording actions taken by the user). Critically, they introduced collective memory that can be scoped at different levels of granularity, such as what a particular recruiter does, what all recruiters in a company do, or what all tech recruiters do across companies.

Given limited context lengths, they employ three retrieval techniques: most recent N for conversations (since recent context is usually most relevant), summarization for older information (mimicking how human memory works with organic compaction), and semantic search via vector embeddings to retrieve the most contextually appropriate information. While they note that Llama 4's promise of huge context lengths might reduce the need for precise retrieval, they observe that longer contexts are slower, more expensive to process, and generally show more hallucinations.

## Skills Registry and Dynamic Tool Discovery

LinkedIn evolved from manually implementing tool calls in every LLM application to inverting the model with a centralized skill registry. Service owners, tool owners, and agent owners expose abstractions (predating but similar to Model Context Protocol) that get registered centrally. Developers can search for skills via text-based or embedding-based retrieval, and LangChain adapters enable dynamic loading of skills at runtime.

For LinkedIn's many gRPC services, they built automation where developers only write options and the rest automatically registers and works. At runtime, when given a task like "search for a mid-level engineer," the agent dynamically determines from the skill registry what tool is most appropriate, fills in arguments using the LLM, and executes. This approach gives agents incredible agency since all tools are potentially exposed rather than hardcoded, though developers can still control flows explicitly if desired. Security is enforced through LinkedIn's service principals system, where authorization to call endpoints is transitively applied to agents - an agent must have the appropriate service principal registered to call a skill's service principal.

## LLM Selection and Customization Strategy

LinkedIn articulates a clear strategy for LLM selection based on the development phase and scale requirements. For MVP development and rapid iteration, especially when the product interface is changing (like moving from structured search to natural language), they prefer state-of-the-art instruction-following models like GPT-4o to maximize agility. For high-scale components like candidate evaluation that scale with the number of candidates (orders of magnitude larger than recruiter-facing interactions), they use fine-tuned smaller LLMs.

This creates a tension: fine-tuning works best with well-defined problem statements optimized aggressively for quality, but what if the problem statement changes during development? LinkedIn addressed this through multitask instruction tuning in partnership with their core AI team. They take open-source LLMs and fine-tune them on LinkedIn's economic graph data (not the specific task) across multiple tasks to preserve instruction-following ability while improving understanding of job postings, member profiles, feed posts, and similar LinkedIn-specific data. The resulting model (called EON internally) outperforms similar-sized open-source models while still accepting different instructions, enabling product iteration.

LinkedIn presents a "model customization pyramid" showing techniques from bottom (least expensive/complex) to top (most expensive/complex). They advocate using Retrieval-Augmented Generation, prompt engineering, and cache-augmented generation as long as possible before moving to fine-tuning, distillation, or ground-up training. Notably, their domain-adapted models can still be further fine-tuned or distilled for specific tasks. They also acknowledge that job-related data is well-represented in public corpora like Common Crawl (which contains over 4 million identifiable job descriptions), so general-purpose LLMs already perform reasonably well in the jobs domain.

## Quality Assurance and Evaluation

The modular sub-agent architecture enables parallel development and independent quality evaluation of each component. LinkedIn follows a common quality playbook across all agent components: define human evaluation rubrics first, then transition as quickly as possible to LLM-driven automated evaluation. The critical insight is that automated evaluation is the bottleneck unlock for rapid iteration to improve quality. Moving to reference-free evaluation (not requiring correct reference outputs for every example) further accelerates iteration.

Each agent component has defined input and output formats that can be evaluated independently, even though internal steps may vary. This allows building up quality from the bottom, with multiple dimensions of productivity: developing agents in parallel, measuring quality in isolation, and then stitching components together for overall agent evaluation. The team emphasizes that while you can develop components in parallel initially, you must eventually integrate and evaluate the full system since errors can compound across stages in multi-step pipelines.

## Observability and Monitoring

Classic distributed systems observability with traces, events, and logs proves insufficient for non-deterministic agentic systems where various different flows occur constantly. LinkedIn built sophisticated aggregation capabilities that feed into industry-standard systems like OpenTelemetry to generate traces. Further processing generates analytics dashboards for developers. They support two distinct use cases: visualizing what happened in a single invocation during local debugging, and viewing aggregate behavior across many invocations in production. The inherent non-determinism of LLM-based systems makes observability critical for understanding behavior when things go wrong, since you're essentially "flying blind" without it.

## Deployment and Resilience Patterns

LinkedIn explicitly treats agents as production software requiring availability, resilience, and scale rather than prototypes. They emphasize building in trust, privacy, security, and responsible AI from the start. The messaging-based orchestration provides resilience through retry mechanisms, nearline delivery, and traffic shift handling. The distributed architecture with horizontal scaling handles capacity needs. The quota management at the LLM inference layer prevents resource exhaustion. The explicit handling of online, offline, and nearline inference modes addresses different latency and processing requirements.

The system includes explicit human-in-the-loop patterns where agents escalate to humans when they cannot complete tasks, wait for human responses, and then continue processing. This acknowledges that full automation is not always possible or desirable, especially in high-stakes domains like hiring.

## Platform Reusability

The shared agent platform foundation enabled LinkedIn to implement variations of the Hiring Assistant in parallel. They built a version targeted at small and medium businesses with different needs (such as help creating job descriptions or determining which candidate types to reach out to) alongside the enterprise recruiter version. This reuse demonstrates the value of the platform investment beyond a single product.

## UX and Product Design Lessons

LinkedIn learned that simply providing a text box and asking users to type freely creates too much cognitive overhead - users don't know what to type or whether it will work. They advocate for finer-grained controls where appropriate, such as clickable buttons for personalization filters alongside text editing capabilities. For asynchronous heavy work, they found that spinners and progress bars work well only for reasonably fast responses. For longer-running tasks, explicit async flows with estimated time to completion and notification-based alerts when tasks complete provide better user experience than leaving users waiting with indeterminate progress indicators.

## Architectural Adaptability and Future-Proofing

LinkedIn emphasizes that the AI/LLM space changes extremely rapidly, so architectural adaptability is crucial (illustrated metaphorically with "an elephant dancing"). Their layered architecture with lower-level platform components and framework adapters enables switching frameworks relatively cheaply. The skill registry's integration path for Model Context Protocol (which didn't exist when they built the system in 2024 but emerged later) demonstrates this adaptability. They advocate a "buy don't build" philosophy, only building components when they're simply not available, since investing heavily in custom stacks makes adopting new approaches difficult as the ecosystem evolves.

## Decision-Making Guidance

LinkedIn provides explicit guidance on key technical decisions. Use procedural code rather than LLMs for simple workflow automation unless you need reasoning capabilities - procedural code is more stable and faster. For LLM selection, use custom models only when you have quality, scale, or latency constraints; otherwise, use commercial cloud-hosted models since the maintenance overhead isn't worth it. Standardize common patterns, automate boilerplate, and democratize access so developers focus on building agents rather than infrastructure. Ensure robust evaluations since quality is critical for professional tools used in consequential domains like hiring.

The case study represents a comprehensive view of production LLMOps at scale within a major technology company, covering platform infrastructure, agent architecture, quality assurance, operational concerns, and product design considerations. LinkedIn's transparent sharing of their journey from simple GPT experiments to sophisticated multi-agent systems provides valuable guidance for organizations building similar capabilities.