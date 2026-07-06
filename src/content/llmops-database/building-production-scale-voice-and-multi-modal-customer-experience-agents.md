---
title: "Building Production-Scale Voice and Multi-Modal Customer Experience Agents"
slug: "building-production-scale-voice-and-multi-modal-customer-experience-agents"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "classification"
  - "summarization"
  - "multi-modality"
  - "realtime-application"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "token-optimization"
  - "error-handling"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "memory"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "system-prompts"
  - "mcp"
  - "a2a"
  - "evals"
  - "fine-tuning"
  - "reranking"
  - "rag"
  - "embeddings"
  - "reinforcement-learning"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "langchain"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "meta"
industryTags: "tech"
company: "Sierra"
summary: "Sierra has built an enterprise agent platform serving most of the Fortune 20 companies, focusing on customer experience across sales, service, and loyalty touchpoints. The platform addresses the challenge of building reliable, low-latency conversational agents that can handle complex customer interactions across voice and chat modalities in dozens of languages. Sierra's approach combines a constellation of 10-15 models per conversation turn, custom infrastructure for sensitive operations like payments (achieving PCI DSS level one certification), and a no-code journey builder that compiles to their Agent SDK. The company has achieved notable success with outcome-based pricing models where agents earn commissions on sales, demonstrating measurable business value through improved resolution rates, conversion rates, and customer satisfaction metrics across retail, airline, and other enterprise verticals."
link: "https://www.youtube.com/watch?v=uCKhOmth2ms"
year: 2026
seo:
  title: "Sierra: Building Production-Scale Voice and Multi-Modal Customer Experience Agents - ZenML LLMOps Database"
  description: "Sierra has built an enterprise agent platform serving most of the Fortune 20 companies, focusing on customer experience across sales, service, and loyalty touchpoints. The platform addresses the challenge of building reliable, low-latency conversational agents that can handle complex customer interactions across voice and chat modalities in dozens of languages. Sierra's approach combines a constellation of 10-15 models per conversation turn, custom infrastructure for sensitive operations like payments (achieving PCI DSS level one certification), and a no-code journey builder that compiles to their Agent SDK. The company has achieved notable success with outcome-based pricing models where agents earn commissions on sales, demonstrating measurable business value through improved resolution rates, conversion rates, and customer satisfaction metrics across retail, airline, and other enterprise verticals."
  canonical: "https://www.zenml.io/llmops-database/building-production-scale-voice-and-multi-modal-customer-experience-agents"
  ogTitle: "Sierra: Building Production-Scale Voice and Multi-Modal Customer Experience Agents - ZenML LLMOps Database"
  ogDescription: "Sierra has built an enterprise agent platform serving most of the Fortune 20 companies, focusing on customer experience across sales, service, and loyalty touchpoints. The platform addresses the challenge of building reliable, low-latency conversational agents that can handle complex customer interactions across voice and chat modalities in dozens of languages. Sierra's approach combines a constellation of 10-15 models per conversation turn, custom infrastructure for sensitive operations like payments (achieving PCI DSS level one certification), and a no-code journey builder that compiles to their Agent SDK. The company has achieved notable success with outcome-based pricing models where agents earn commissions on sales, demonstrating measurable business value through improved resolution rates, conversion rates, and customer satisfaction metrics across retail, airline, and other enterprise verticals."
notion:
  pageId: "390f8dff-2538-8088-9604-c109162efb0f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-01T10:28:00.000Z"
  lastEditedTime: "2026-07-01T10:28:00.000Z"
  publishedAt: "2026-07-06T07:20:25Z"
---

## Overview

Sierra operates a comprehensive agent platform that powers customer experience agents for most of the Fortune 20 and approximately 40-50% of the Fortune 50-100 companies. While initially perceived as focused on customer support, Sierra's vision spans the full customer engagement lifecycle including browsing, sales, booking, service, and loyalty interactions. The platform represents a sophisticated LLMOps implementation addressing the unique challenges of building agents that interact with millions of customers across voice and chat channels in production environments where latency, reliability, and security are paramount.

The company's approach to LLMOps is particularly instructive because it deals with real-world enterprise constraints including strict governance requirements, multi-language support, sensitive payment processing, and the need to deliver measurable business outcomes. Sierra has pioneered outcome-based pricing where agents can earn commissions on sales, fundamentally aligning their incentives with customer success and demonstrating confidence in their production system reliability.

## Platform Architecture and Agent Building

Sierra's platform consists of three main sections: Analyze, Build, and Release. The Build section features a no-code layer called "journeys" that has become the primary development interface over the past 18 months, largely replacing direct code-based development. Journeys use a declarative DSL that maps to how operations teams naturally think about customer interactions, compiled deterministically and isomorphically to the underlying Agent SDK code. This means code can transition to no-code and back while maintaining equivalence, allowing enterprises to work in Git-based workflows when needed.

The journeys abstraction deliberately balances human intuition with model capabilities. Sierra consciously decides when to reframe problems into structures models already understand well (like file systems for coding agents) versus investing in teaching models their proprietary abstractions. Their rule of thumb is to meet models on their turf 80% of the time, reserving custom training for truly special cases where their domain-specific approach provides significant value.

A key innovation is Ghostwriter, an agent similar to coding assistants but specifically expert in building Sierra agents using the journeys product. Ghostwriter can take natural language descriptions of desired agent behavior and generate appropriate journey configurations, significantly lowering the learning curve for non-technical users. The system benefits from teaching models abstractions they're already familiar with, though Sierra has had to carefully tune Ghostwriter to work with their DSL which is not in standard training data.

## Agent OS and Model Orchestration

At the foundation sits Agent OS, a sophisticated orchestration layer that manages what Sierra calls a "constellation of models." For a typical conversation turn, approximately 10-15 different model invocations occur. This breaks down roughly into a couple of frontier model calls for primary reasoning, several classifier models for specific tasks, and various speculative execution calls particularly for voice scenarios to maintain low latency.

The architecture prioritizes parallelism extensively. Knowledge retrieval often happens speculatively before determining if answers are needed. Classification and response generation can occur simultaneously. For voice, transcription employs ensemble methods running multiple models in parallel, with sophisticated logic to select the best output. A concrete example: one transcription model excels with thick UK accents but hallucinates during silence more than others, so Sierra runs two models in parallel with conditional logic about which to trust based on whether silence is detected.

Sierra maintains a modular approach across the entire voice pipeline, multi-homing providers for transcription, synthesis, and native voice-to-voice models. This modularity proves essential not just for quality but for operational resilience, particularly during high-volume events like Black Friday when capacity constraints with any single provider could be catastrophic. The architecture allows selecting different models by language, customer, or use case, and enables continuous evaluation of new providers against their benchmarks.

## Voice Agent Production Challenges

Voice represents perhaps Sierra's most technically sophisticated LLMOps challenge, with the majority of their conversations happening over voice channels. The key constraint is latency: responses must come within 1-2 seconds or users perceive the agent as having disappeared. This drives extensive parallelization across what Sierra describes as three simultaneous activities: thinking, listening, and talking. The agent thinks about potential responses while listening, listens for interruptions while talking, and maintains multiple parallel inference streams.

One significant unlock was implementing "progress indicators" where agents naturally say things like "Hold on a minute, I'm just pulling up your account" to maintain conversational flow during longer operations. This seemingly simple feature required sophisticated orchestration to determine when such interjections are appropriate and how to generate them without adding unacceptable latency.

Sierra has production agents running on native voice-to-voice models, but these remain a fraction of overall traffic. Voice-to-voice models currently work best for English, are nearly an order of magnitude more expensive, and have less reliable tool calling and instruction following compared to text-based reasoning chains. Sierra uses them selectively for cases where journeys are simpler and naturalism particularly matters, while maintaining their speech-to-text and text-to-speech pipeline for complex multilingual scenarios requiring robust reasoning.

The platform must handle approximately 60 languages with high quality. Languages like Hungarian can have 20% word error rates with individual transcription models, driving Sierra's investment in ensemble methods that combine multiple providers to achieve better accuracy than any single model. Their MuBench multilingual transcription benchmark emerged from this work and helps evaluate new providers systematically.

## Context Engineering and Prompt Management

Sierra emphasizes "context engineering" as fundamental to agent quality, defining it as showing agents everything they need but nothing more. Their approach has evolved as models improved: early Agent SDK versions required spoon-feeding exactly the right context at the right time through flow-based orchestration. Modern versions allow more flexible reasoning where prerequisites can be expressed declaratively (like "to call this tool you need their email") and the agent handles the specifics.

A critical concept is progressive disclosure: bringing information into the prompt only when relevant, but then being careful about removing it. Prompt compaction must be non-lossy because incoherence between different parts of the prompt causes hallucinations. Sierra's debugging experience shows that apparent model failures almost always trace to prompt inconsistencies rather than model limitations.

The platform takes a pragmatic approach to prompt caching, treating it as a nice-to-have for cost and speed but never sacrificing quality to maintain cache validity. This stance is enabled by their outcome-based pricing model where conversation value far exceeds inference costs, allowing quality to consistently take priority over optimization.

## Specialized Infrastructure for Security and Compliance

Sierra built completely isolated infrastructure for payment processing to achieve PCI DSS level one certification, making them the only voice payments platform at launch that doesn't require transferring to another system. This separate cluster ensures payment information never reaches external LLMs since no major LLM provider has appropriate PCI certification.

The investment in payment infrastructure reflects Sierra's belief in "agentic commerce" potentially exceeding e-commerce in scale. They envision personal agents like ChatGPT or Claude negotiating directly with brand agents for purchases, subscriptions, and reservations. Supporting this future requires not just payment capability but proper authentication and identity management since memory and personalization require confirming user identity before accessing sensitive information.

## Evaluation and Continuous Improvement

Sierra has developed comprehensive evaluation infrastructure spanning both internal Agent OS components and customer-facing agents. The centerpiece for customers is "simulations" that enable testing against diverse personas, languages, voice conditions like background noise, and adversarial scenarios. Good simulations prove essential for teams making frequent changes while ensuring no regression across the high-dimensional space of production scenarios.

The company has published multiple benchmarks in their "Tao cinematic universe": TaoBench for general agentic capabilities, TaoVoice for voice-specific evaluation, TaoKnowledge for retrieval, and MuBench for multilingual transcription. These benchmarks primarily help evaluate providers rather than customer agents, but also force principled first-principles thinking about what good looks like.

For continuous learning, Sierra has built "monitors" that run on every conversation, flagging issues for review or automatically generating improvement suggestions. Their Explorer agent analyzes conversation data like a long-running research assistant, answering questions about resolution rate drops or conversion optimization. Explorer can run daily automations asking the same questions proactively, then partner with Ghostwriter to suggest fixes that customers review before deployment.

The current workflow keeps humans in the loop for all changes, though Sierra anticipates near-future scenarios where high-confidence fixes (like correcting obvious knowledge article contradictions verified against website data) might proceed with FYI rather than approval. The confidence level for autonomous improvements will increase gradually as customer comfort grows.

## Agent Data Platform and Memory

The Agent Data Platform integrates structured customer data from CDPs and internal systems with real-time conversational context. The insight is that LLMs excel at in-the-moment empathy but lack deeper understanding of individual customer preferences and history. Traditional recommender systems and ML models handle those aspects well, so combining both produces superior results.

Memory operates at three levels: explicit saving during conversation turns, configuration by agent builders about what matters (like always remembering birthdays), and automatic capture of customer-expressed preferences. Authentication is critical since memory access requires confirming user identity; different memories have different sensitivity levels (greeting by name versus discussing account details).

The retrieval problem for individual customer memory remains simpler than knowledge base retrieval since memory is typically three orders of magnitude smaller, making the specific storage structure (vector store, knowledge graph, etc.) less critical. Memory integration has measurably improved resolution rates through personalization like greeting by name, remembering previous calls, and acknowledging past frustrations.

## Model Development and Fine-Tuning

Sierra maintains a sizable research team tightly integrated with product teams, flexing that muscle selectively when hitting limits of available models. Knowledge retrieval and reranking represents a clear example where building in-house models made sense because they were pushing state-of-the-art and could directly improve customer outcomes.

The principle is to avoid training when frontier model improvements will naturally solve problems within months, but to invest when truly differentiated on domain expertise. Sierra doesn't compete with multi-million dollar training runs producing GPT-5 class models, instead focusing on going deep with specific industries and processes where their customer insight creates defensible advantage.

While customer-specific model training isn't common, the Agent Data Platform does use ML models for customer-specific strategies around recommendations and orchestration. The focus is on post-training and fine-tuning rather than training from scratch.

## Multi-Agent Architecture Philosophy

Sierra takes a notably skeptical stance on multi-agent systems, arguing they're often misapplied. Poor reasons for multi-agent design include organizational boundaries (shipping your org chart) or developer comfort rather than technical necessity. Splitting triage agents from task agents typically deprives each of crucial context, destroying value.

The right case for multiple agents is when jobs are truly separable with no valuable context sharing. But with proper context engineering that exposes only relevant information to appropriate parts of the system, monolithic agents generally perform better. Sierra describes themselves as "monolith loyalists" for this reason, building single agents representing entire brands rather than fragmented systems.

Agents do call other agents when appropriate, using standard API calls as the most common integration pattern. Sierra supports MCP (Model Context Protocol) and agent-to-agent protocols, allowing their agents to act as both MCP clients and servers. This enables integrations like ChatGPT apps where Sierra agents like Redfin's home search can be at-referenced from ChatGPT.

## Operational Model and Governance

Sierra's enterprise focus with Fortune 20 customers drives sophisticated governance and release management. The platform supports workspaces for experimentation separate from production, review and approval workflows, and change management procedures that large organizations require. Many customers have CI/CD pipelines that require Git integration, which Sierra supports by exposing the underlying code representation of journeys.

The outcome-based pricing model fundamentally shapes operations. By getting paid for actual results like sales conversions or successful resolutions rather than API calls or seats, incentives align perfectly with customer success. This pricing works best for high-value outcomes where even small percentage improvements in agent quality deliver substantial revenue impact.

Pricing necessarily becomes customer-specific since outcome value varies dramatically: troubleshooting complex device setup over 20 conversation turns differs from simple balance checks. Rather than engineering perfect per-outcome pricing, Sierra aims for simple fair agreements recognizing that goodwill and trust over contract terms matter more for retention and expansion. The power of aligned incentives outweighs precision in valuation.

## Platform Extensibility and Integration

Customers can extend the platform through tools and packages that integrate with the journeys system. Engineering teams often build complementary agents or systems that interface with Sierra agents via APIs. The platform supports streaming APIs and complex integrations through the code layer when no-code abstractions prove limiting.

For longer-running background tasks that don't face voice latency constraints, customers can invoke separate agents or internal systems, with the Sierra agent waiting for responses. This supports use cases like document generation where process time is acceptable because results aren't needed immediately.

The modular architecture extends to cloud and model flexibility. Customers often have specific requirements about which clouds or models they can use, and Sierra's multi-provider approach meets them on their terms. This isn't optional for serving Fortune 20 companies with stringent compliance requirements.

## Development Workflows and Team Structure

Development primarily happens through operations teams and customer experience managers rather than engineers, enabled by the no-code journeys interface and Ghostwriter assistance. These domain experts have the deepest understanding of ideal customer experiences and can directly implement their knowledge without technical intermediaries.

Engineering teams remain involved for complex integrations, CI/CD pipelines, and sophisticated tooling. The platform's ability to support both no-code and code-based development means different customers and use cases can use appropriate abstraction levels. Some customers have hundreds of developers building on the platform through Git workflows.

Sierra has developed an "AI-native interview" process where candidates build complete products over a few hours using coding agents, revealing how they think about scope, agency, and what's possible. This process surfaces candidates with the right mindset: high agency, customer intuition, technical depth, strong communication, intensity, and leadership ability to direct activity toward correct outcomes.

The forward-deployed model has team members working deeply with individual customers, building trust, discovering value, and delivering solutions. This enterprise sales approach combined with consumer-grade end-user requirements creates unique constraints that require both customer obsession and product craftsmanship.

## Future Directions

Sierra is investing ahead of market readiness in several areas. The payment infrastructure represents multi-year investment in a future where "agentic commerce" exceeds e-commerce. They anticipate personal agents conducting most commercial interactions, with brands needing agent-first experiences just as they needed web-first and mobile-first strategies in previous platform shifts.

Voice-to-voice models will likely dominate in 18-24 months once they support more languages reliably, cost drops, and reasoning improves. The current modular architecture positions Sierra to adopt these advances without architectural overhaul.

Generative UI shows promise in verticals like retail for product discovery, while multimodal experiences combining voice and text input prove valuable for airlines where spelling complex names while on the phone improves accuracy. The right modality and interface depends heavily on vertical and use case specifics.

The platform continues evolving toward more autonomous improvement where high-confidence fixes proceed without explicit approval, though governance requirements mean human oversight will remain important for enterprise customers managing billion-dollar relationships through these agents. The balance between automation and control will shift gradually as trust and confidence grow based on demonstrated reliability.
