---
title: "Training Specialized Legal AI Models with Synthetic Data and KV Cache Compaction"
slug: "training-specialized-legal-ai-models-with-synthetic-data-and-kv-cache-compaction"
draft: false
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "data-analysis"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "fine-tuning"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "reinforcement-learning"
  - "rlhf"
  - "model-optimization"
  - "semantic-search"
  - "vector-search"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "harness-engineering"
  - "memory"
  - "chunking"
  - "evals"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "pytorch"
  - "langchain"
  - "llama-index"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "openai"
  - "anthropic"
  - "meta"
  - "nvidia"
  - "hugging-face"
industryTags: "legal"
company: "Harvey / Baseten"
summary: "Harvey, a legal AI company, partnered with Baseten's training team to develop specialized models for legal tasks like due diligence data room analysis. The core challenge was that frontier models failed at exhaustive document review and struggled with context windows far smaller than typical legal data rooms (50-100 million tokens vs 250K-1M token limits). The solution involved training open-source models using synthetic legal data to ensure proper associate-level work patterns, exploring KV cache compaction strategies to handle massive context requirements, and developing specialized legal reasoning capabilities. This approach allows Harvey to offer both general-purpose frontier models for unstructured tasks and specialized models for high-value, structured legal workflows while maintaining cost efficiency and client data security."
link: "https://www.youtube.com/watch?v=TU8kwE7z1qY"
year: 2026
seo:
  title: "Harvey / Baseten: Training Specialized Legal AI Models with Synthetic Data and KV Cache Compaction - ZenML LLMOps Database"
  description: "Harvey, a legal AI company, partnered with Baseten's training team to develop specialized models for legal tasks like due diligence data room analysis. The core challenge was that frontier models failed at exhaustive document review and struggled with context windows far smaller than typical legal data rooms (50-100 million tokens vs 250K-1M token limits). The solution involved training open-source models using synthetic legal data to ensure proper associate-level work patterns, exploring KV cache compaction strategies to handle massive context requirements, and developing specialized legal reasoning capabilities. This approach allows Harvey to offer both general-purpose frontier models for unstructured tasks and specialized models for high-value, structured legal workflows while maintaining cost efficiency and client data security."
  canonical: "https://www.zenml.io/llmops-database/training-specialized-legal-ai-models-with-synthetic-data-and-kv-cache-compaction"
  ogTitle: "Harvey / Baseten: Training Specialized Legal AI Models with Synthetic Data and KV Cache Compaction - ZenML LLMOps Database"
  ogDescription: "Harvey, a legal AI company, partnered with Baseten's training team to develop specialized models for legal tasks like due diligence data room analysis. The core challenge was that frontier models failed at exhaustive document review and struggled with context windows far smaller than typical legal data rooms (50-100 million tokens vs 250K-1M token limits). The solution involved training open-source models using synthetic legal data to ensure proper associate-level work patterns, exploring KV cache compaction strategies to handle massive context requirements, and developing specialized legal reasoning capabilities. This approach allows Harvey to offer both general-purpose frontier models for unstructured tasks and specialized models for high-value, structured legal workflows while maintaining cost efficiency and client data security."
notion:
  pageId: "3a6f8dff-2538-80ee-a093-f4e47bc3d98a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T08:27:00.000Z"
  lastEditedTime: "2026-07-23T08:27:00.000Z"
  publishedAt: "2026-07-23T08:59:25Z"
---

## Overview

This case study focuses on Harvey, a legal AI company, and their collaboration with Baseten's training team to develop specialized language models for legal workflows. Harvey represents a sophisticated example of deploying LLMs in a highly regulated, complex production environment where both accuracy and explainability are paramount. The discussion centers on the technical challenges of adapting large language models to legal work, particularly around exhaustive document analysis, context window limitations, and the need for domain specialization.

## Core Production Challenges

Harvey's production environment reveals fundamental limitations in off-the-shelf frontier models when applied to legal work. The primary issue identified is that standard models fail at exhaustive document review, a critical requirement for legal associates. When analyzing data rooms, models would often skip documents and produce incomplete results, despite appearing to function correctly. This behavior emerged through trajectory analysis, where Harvey discovered that agents were performing graph-based searches rather than systematic document review. In legal contexts, this approach is unacceptable - an associate who admits to not reading every document would face termination. This highlights a key LLMOps insight: model behavior that seems efficient in general contexts can be catastrophically inadequate in specialized domains.

The scale challenges are particularly acute in legal applications. Harvey deals with data rooms containing 50-100 million tokens, while frontier models typically have context windows between 250K and 1 million tokens. This represents a 50-100x gap between what legal workflows require and what current architecture can handle. The problem isn't just about fitting data into context windows - it's about enabling exhaustive search across massive document collections while maintaining the systematic, verifiable approach that legal work demands.

## Synthetic Data Strategy

Harvey has developed a multi-tiered data strategy to address the fundamental challenge that most legal data belongs to clients and cannot be used for training. The breakthrough came when models became capable enough to generate high-quality synthetic data. Harvey now creates realistic synthetic data rooms and client matters using frontier models, augmented by their internal legal team and external providers like Mercor. This approach has proven surprisingly effective for model improvement through iterative refinement.

The synthetic data strategy extends beyond simple generation. Harvey envisions a second tier where they take synthetic data and trained models to law firms for feedback, allowing firms to encode their expertise without exposing client data. This solves a critical problem: the best legal talent resides at law firms, not at technology companies, but client confidentiality prevents traditional data collection. The third tier would involve helping law firms and specific clients work together to encode their relationships into models, requiring buy-in from both parties since it involves actual client data.

## KV Cache Compaction and Context Management

The discussion reveals significant technical work on KV cache compaction as a solution to context limitations. Baseten's team expresses strong optimism about neural KV cache compaction over token-based approaches. The argument is that when trying to compress maximum information into minimal space, tokens are inherently inefficient compared to semantic latent spaces. They believe that systems like Codex and potentially other frontier models use neural KV cache compaction rather than token-based compression, which explains why these agents can maintain coherent state across very long sessions.

The team discusses compaction as no longer an afterthought for overflow situations but a core component of the harness strategy for any agentic task exceeding context windows. Companies like Cursor with Composer, Applied Compute, and others are successfully employing long-horizon reinforcement learning with compaction in the loop, where models learn novel shorthand strategies to maximize token efficiency. However, neural compaction introduces interpretability challenges, which are particularly problematic for legal applications. The proposed solution is to ensure losslessness and develop probing mechanisms to verify information retention.

Looking forward, the team discusses models managing their own context windows through RL training. Rather than compaction firing automatically when approaching context limits, they envision models learning when to compress, what to discard, and how to use compaction as a strategic tool. This represents a shift from heuristic-based context management to learned, adaptive strategies.

The team believes that with current hardware and model sizes, it's very difficult to push vanilla attention past a million tokens. This explains the investment in alternative approaches like linear attention and gated DeltaNets, though these haven't solved the problem effectively. The shift has been toward using harness setups, compaction, or sub-agents to avoid polluting the main agent's context window. This explains the growth in systems like Claude Code that can spin up sub-agents and write their own harness on the fly. With effective compaction, particularly neural KV cache compaction that can store information more efficiently than tokens, the team speculates that reaching a billion token effective context window might be achievable.

## Training Approaches and Long-Horizon RL

The technical discussion reveals significant uncertainty about whether GRPO (Group Relative Policy Optimization), popularized by DeepSeek, can scale to very long horizons, especially with multiple compaction stages. The consensus is that long-horizon credit assignment becomes extremely difficult with GRPO. Baseten speculates that frontier labs are using different approaches: OpenAI likely uses large-scale brute force, while Anthropic has hinted at moving away from GRPO toward PPO and value models.

The team frames the core technical challenges as two independent but necessary problems: achieving effective compaction and assigning rewards across very long rollouts. Both must be solved to enable trainable long-horizon agents. This is particularly relevant for legal workflows where tasks can span days or weeks of equivalent agent time.

## Model Specialization vs. Generalization

Harvey's production strategy involves thoughtful model routing based on task characteristics. For general use cases where the shape of work is unpredictable, they continue using frontier models like GPT-4 variants, where they still observe capability gaps compared to open-source alternatives. However, for structured, high-value tasks with predictable patterns - like merger due diligence with known workflow shapes - Harvey is investing in specialized model training.

The team articulates an important insight about legal versus coding domains: coding tasks continuously increase in complexity as codebases grow, requiring persistent frontier capabilities. Legal work, while complex, often has more structural predictability. When working on a merger, the distribution of tasks is relatively known. This predictability creates opportunities for specialization that may not exist in other domains.

Harvey's production architecture increasingly involves intelligent model routing. Some tasks require frontier models, others are intelligence-saturated and should optimize for cost, and agentic systems can route appropriately. They've demonstrated that open-source models can successfully call frontier models when encountering difficult subtasks, creating a tiered architecture rather than a binary choice. This multi-model approach also addresses security concerns, as large regulated customers like banks, private equity firms, insurance companies, and major law firms increasingly want to own their own models and control where data flows.

## Continual Learning and Personalization

The discussion explores continual learning not as a general problem of updating models with six months of internet data, but as domain-specific knowledge accumulation. Baseten focuses on enabling models doing specific tasks to continuously ingest real-world deployment information, similar to how humans learn on the job. The roadmap involves three stages: achieving longer context windows through compaction, training models to self-manage their context and compaction decisions, and developing mechanisms to transfer compressed representations into model weights.

Baseten has explored hyper-networks that convert compressed KV caches into LoRA adapters that merge into the base model. This involves concepts like dreaming and self-study, requiring careful reward definition. The vision is models deployed in specific instances that accumulate knowledge at appropriate compression and abstraction levels while continuing to learn from task performance. The team acknowledges this is an unsolved problem requiring significant research attention, particularly around determining what information should be retained at different compression levels.

The team discusses specialization granularity over time. Initially, companies like Harvey train models for broad legal reasoning. The next phase involves on-premises or secure deployments with firm-specific adapters encoding organizational knowledge, document locations, and workflow patterns. Eventually, they envision team-specific and even person-specific models. The mechanisms for transferring information from context to weights exist but remain somewhat janky, analogous to how reasoning capabilities in early extended thinking models worked but required significant refinement.

The discussion emphasizes that humans operate with information at different levels of compression and accessibility - from deeply embedded knowledge to working memory. Current LLM systems lack effective mechanisms for this middle ground between perfectly lossless KV cache information and ultra-compressed weight information. Developing this capability is seen as crucial for practical continual learning in production systems.

## Training Data and Model Intelligence

An important insight emerges from Harvey's experiments with legal case law. When they attempted mid-training on long-tail case law (cases not publicly prominent), they found that simply training on the cases or providing them in context didn't replicate the model's strong performance on Supreme Court cases. The hypothesis is that frontier models interpolate not just over Supreme Court cases themselves but over the extensive internet discourse analyzing these cases in detail. This suggests that training creates unique synthesis unavailable through retrieval alone, challenging assumptions about RAG sufficiency for domain adaptation.

Regarding the distillation debate, Baseten's view is that open-source model intelligence is not primarily driven by distillation from frontier models, contrary to some public perception. They believe distillation serves as a tool for warm-starting and cost reduction, but that scaling current open-source recipes (like Nemotron or recent Chinese models) to frontier model sizes would yield comparable intelligence. They don't believe OpenAI and Anthropic have fundamentally different recipes, just tail-end optimizations and greater resources. This suggests the recipe has stabilized, with progress increasingly about data aggregation and parameter scaling rather than algorithmic breakthroughs.

This assessment leads to optimism about open-source trajectories. Even if the gap between open-source and closed-source models doesn't shrink, parallel progress lines are exciting because the absolute capabilities of open-source models enable economically valuable specialized applications. The team notes the dramatic improvement comparing models like GLM 5.2 or Nemotron to open-source options from six months prior, particularly for agentic tasks with long running times.

## Deployment and Practical Constraints

Harvey's production environment faces significant non-technical challenges that fundamentally shape their LLMOps strategy. Deploying into large regulated institutions like banks, law firms, insurance companies, and private equity firms involves extensive security concerns and data governance requirements. These customers increasingly want to own their models and control data flows, creating demand for specialized, on-premises deployments rather than shared frontier model APIs.

The cost dynamics have surprised Harvey's team. While a year ago it seemed like model costs were declining and token usage was relatively stable, both usage and costs have skyrocketed. This has strategic implications: even if frontier models achieve Nobel Prize-level intelligence, they'll be too expensive to run on every task. Harvey frames this as analogous to running a large company - you don't staff it with 100,000 Nobel Prize winners; you create a specialized hierarchy where expensive expertise is reserved for high-value decisions. Their production strategy mirrors this with mixed deployments of frontier models for critical tasks, open-source models for routine work, and specialized models for domain-specific workflows.

Harvey emphasizes that many business problems aren't about intelligence at all. No Nobel Prize winner runs a company because running organizations involves coordination, regulatory compliance, infrastructure management, and countless other challenges orthogonal to raw intelligence. This insight shapes their deployment philosophy: even with superintelligent models, practical deployment into large enterprises requires modular, safe, verifiable systems that can be integrated slowly and carefully.

## Infrastructure and Engineering Acceleration

On the engineering side, the team reports significant productivity gains from model assistance. Every new model iteration lowers the barrier from idea to experiment. Goal loops, which are AI systems that monitor and manage distributed training runs, have been transformative. Previously, researchers would launch large Slurm scripts overnight only to discover failures in the morning. Goal loops babysit runs, restart failures, and maintain progress autonomously, dramatically accelerating research iteration.

However, the team notes a critical limitation: models haven't significantly improved at generating the right research questions. They can take fuzzy problems and propose semantically relevant approaches, but their value function over potential solutions remains inferior to human researchers. The abstraction level has improved - researchers can now describe high-level problems rather than specific sub-experiments - but models don't independently generate novel research directions. For example, researchers can now say "I want to compress KV caches in a forward pass, what architecture would work?" and get useful proposals, but models wouldn't independently suggest this research direction.

The team is still seeing ongoing improvements in abstraction levels for engineering tasks. They can increasingly describe problems at higher semantic levels and have models fill in implementation details. This creates a virtuous cycle where engineers focus on progressively higher-level decisions while models handle more of the mechanical work.

## Recursive Self-Improvement and Future Directions

The conversation reveals skepticism about imminent recursive self-improvement (RSI) in research contexts. The team distinguishes between different task types: mathematical research might achieve RSI because environments are fully simulatable, but knowledge work faces fundamental constraints. The data labs can collect consists of problem-solution pairs with implementation steps, not open-ended research across months or years without solution hints. The feedback loops are too long for effective RL training at scales needed for breakthrough capabilities.

The analogy to AutoResearch is instructive: these systems work well when metrics are clearly defined and not easily hackable, but defining such metrics requires already understanding the problem and solution space. For truly open-ended problems - like starting a billion-dollar business - the real-world feedback loop is simply too long for practical learning. The ceiling for RL training is fundamentally limited by the actual time required to complete tasks in the real world.

For deployment friction, even highly intelligent agents face practical barriers. Large banks cannot trust fully autonomous systems with core operations regardless of capability. Regulatory requirements, coordination across humans, and organizational inertia create deployment timelines measured in decades. The notion that Nobel Prize-level intelligence alone solves business problems is challenged - running companies involves countless non-intelligence problems around coordination, regulation, and infrastructure.

Harvey expects RSI to emerge domain-specifically rather than generally. They're most optimistic about mathematics due to environment simulability. For legal and other knowledge work, the biggest barriers are deployment safety, organizational change management, and cost. The transformation of large enterprises to hybrid human-AI operations is framed as a 10-year process, not because intelligence is lacking, but because integration complexity spans far beyond model capabilities. As models become more capable, everyone's productivity accelerates in parallel, maintaining competitive dynamics rather than creating winner-take-all scenarios.

## Ecosystem and Open Source

The collaboration between Harvey and multiple research teams highlights emerging LLMOps ecosystem dynamics. Harvey works with various providers, each approaching similar problems from different technical angles. For example, Baseten focuses on KV cache compaction while Engram explores efficient data compression for firm-wide search. Both address information compression but with completely different implementations.

The team expresses enthusiasm about open-source enabling this ecosystem approach. Synthetic data allows Harvey to share datasets with multiple providers for parallel experimentation without compromising client confidentiality. This enables comparative evaluation across different technical approaches - testing which methods excel at specific subtasks and integrating successful techniques into product features. This modular approach to building production systems - composing specialized techniques from different providers - wouldn't be possible with purely proprietary development.

This represents a shift from the 2021-2023 period of concentrated, secretive research at major labs back toward collaborative, transparent progress. The team notes that even re-implementations of the same techniques prove valuable - researchers examining five open-source implementations can identify the critical commonalities versus experimental variations. This collaborative dynamic feels more similar to the pre-2021 research culture and may accelerate progress through parallel exploration of the solution space rather than serial development within individual labs.

Harvey's internal systems increasingly reflect this composability. They don't envision a single giant model solving everything, but rather systems that compose multiple models, tools, and techniques. Even frontier labs build models that call sub-agents and use tools, reinforcing this architectural direction. For Harvey, the interesting challenge becomes orchestrating these components effectively for customer value while managing the practical constraints of cost, latency, security, and regulatory compliance.
