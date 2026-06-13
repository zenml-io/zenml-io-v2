---
title: "Training Agentic Models with Reinforcement Learning for Production Deployment"
slug: "training-agentic-models-with-reinforcement-learning-for-production-deployment"
draft: false
llmopsTags:
  - "code-generation"
  - "question-answering"
  - "document-processing"
  - "summarization"
  - "poc"
  - "rag"
  - "fine-tuning"
  - "prompt-engineering"
  - "reranking"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "token-optimization"
  - "multi-agent-systems"
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "system-prompts"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "microservices"
  - "cicd"
  - "scaling"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "vllm"
  - "triton"
  - "pytorch"
  - "onnx"
  - "fastapi"
  - "redis"
  - "cache"
  - "langchain"
  - "spacy"
  - "chromadb"
  - "pinecone"
  - "wandb"
  - "microsoft-azure"
  - "google-gcp"
  - "nvidia"
  - "hugging-face"
  - "harness-engineering"
  - "reinforcement-learning"
industryTags: "tech"
company: "Kimi / Cursor / Chroma"
summary: "This case study examines three production LLM systems—Kimi K2.5, Cursor Composer 2, and Chroma Context-1—that use reinforcement learning to train agentic models for real-world tasks. All three teams face similar challenges: managing context windows during long agentic sessions, bridging the gap between training environments and production deployments, and designing reward functions that avoid degenerate behaviors. Kimi K2.5 introduces Agent Swarm for parallel task decomposition, achieving 78.4% accuracy on BrowseComp with 4.5× latency reduction. Cursor Composer 2 implements real-time RL from production traffic with a five-hour deployment cycle, training on tasks with median 181-line changes. Chroma Context-1 develops self-editing search capabilities in a 20B parameter model that matches frontier-scale performance at 10× speed. Common solutions include training inside production harnesses, using outcome-based rewards augmented with generative reward models, running asynchronous large-scale rollouts, and building domain-specific evaluation benchmarks."
link: "https://www.philschmid.de/kimi-composer-context"
year: 2026
seo:
  title: "Kimi / Cursor / Chroma: Training Agentic Models with Reinforcement Learning for Production Deployment - ZenML LLMOps Database"
  description: "This case study examines three production LLM systems—Kimi K2.5, Cursor Composer 2, and Chroma Context-1—that use reinforcement learning to train agentic models for real-world tasks. All three teams face similar challenges: managing context windows during long agentic sessions, bridging the gap between training environments and production deployments, and designing reward functions that avoid degenerate behaviors. Kimi K2.5 introduces Agent Swarm for parallel task decomposition, achieving 78.4% accuracy on BrowseComp with 4.5× latency reduction. Cursor Composer 2 implements real-time RL from production traffic with a five-hour deployment cycle, training on tasks with median 181-line changes. Chroma Context-1 develops self-editing search capabilities in a 20B parameter model that matches frontier-scale performance at 10× speed. Common solutions include training inside production harnesses, using outcome-based rewards augmented with generative reward models, running asynchronous large-scale rollouts, and building domain-specific evaluation benchmarks."
  canonical: "https://www.zenml.io/llmops-database/training-agentic-models-with-reinforcement-learning-for-production-deployment"
  ogTitle: "Kimi / Cursor / Chroma: Training Agentic Models with Reinforcement Learning for Production Deployment - ZenML LLMOps Database"
  ogDescription: "This case study examines three production LLM systems—Kimi K2.5, Cursor Composer 2, and Chroma Context-1—that use reinforcement learning to train agentic models for real-world tasks. All three teams face similar challenges: managing context windows during long agentic sessions, bridging the gap between training environments and production deployments, and designing reward functions that avoid degenerate behaviors. Kimi K2.5 introduces Agent Swarm for parallel task decomposition, achieving 78.4% accuracy on BrowseComp with 4.5× latency reduction. Cursor Composer 2 implements real-time RL from production traffic with a five-hour deployment cycle, training on tasks with median 181-line changes. Chroma Context-1 develops self-editing search capabilities in a 20B parameter model that matches frontier-scale performance at 10× speed. Common solutions include training inside production harnesses, using outcome-based rewards augmented with generative reward models, running asynchronous large-scale rollouts, and building domain-specific evaluation benchmarks."
notion:
  pageId: "34df8dff-2538-8011-802c-d74ccd9ec9d9"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-25T13:57:00.000Z"
  lastEditedTime: "2026-04-25T13:57:00.000Z"
  publishedAt: "2026-04-26T09:56:34Z"
---

## Overview

This case study provides a comprehensive analysis of three distinct production LLM systems that converged on similar reinforcement learning methodologies despite tackling different problem domains. Moonshot AI's Kimi K2.5 focuses on multimodal agentic intelligence with parallel task decomposition, Cursor's Composer 2 targets autonomous software engineering, and Chroma's Context-1 specializes in agentic document retrieval. The blog post synthesizes technical reports from all three teams, published in March 2026, offering rare insight into how leading AI labs operationalize large language models at scale.

What makes this particularly valuable from an LLMOps perspective is the shared infrastructure and methodology across all three implementations. Each team independently concluded that training must occur inside production-equivalent environments, that traditional public benchmarks inadequately measure real-world performance, and that reward engineering requires iterative refinement to prevent reward hacking. The convergence suggests these patterns represent emerging best practices for deploying agentic LLMs rather than company-specific choices.

## Kimi K2.5: Parallel Agent Orchestration Through RL

Kimi K2.5 is a 1 trillion parameter mixture-of-experts model with 32B active parameters, representing Moonshot AI's multimodal extension of their earlier Kimi K2 base model. The distinguishing production feature is Agent Swarm, a framework where the model dynamically decomposes tasks into parallel subtasks executed by independent sub-agents. The parallelization strategy emerges from reinforcement learning rather than being hand-coded, allowing the model to adapt its orchestration approach based on task characteristics.

The production architecture separates concerns between an orchestrator and sub-agents. The orchestrator is the trainable component that decides when to create sub-agents, what tasks to assign them, and how to aggregate results. It has access to specialized tools including `create_subagent` and `assign_task`. Sub-agents execute assigned subtasks independently but remain frozen during training, with their trajectories excluded from the optimization objective. This architectural decision solves a critical credit assignment problem in multi-agent RL: when a final answer is correct, it's ambiguous whether the orchestrator decomposed the task well or a sub-agent compensated for poor decomposition through lucky exploration. By freezing sub-agents and treating their outputs as environmental observations, only the orchestrator's coordination logic receives gradient updates.

The training methodology, called Parallel-Agent Reinforcement Learning (PARL), introduces the concept of "critical steps" to measure computational cost in parallel execution contexts. Traditional step counting sums total steps across all agents, which incorrectly penalizes parallel execution. Critical steps instead measure the longest execution chain, analogous to critical path analysis in distributed systems. For each stage, the cost equals the maximum steps among parallel sub-agents, and total critical steps sum these stage maxima. This cost metric incentivizes the orchestrator to balance work across sub-agents, reducing the longest branch rather than simply maximizing concurrency.

The PARL reward function combines three components to address specific failure modes discovered during training. The performance reward (`r_perf`) provides the primary signal based on task success. The parallelism reward (`r_parallel`) incentivizes sub-agent instantiation to prevent "serial collapse," a local optimum where the orchestrator defaults to single-agent execution and never explores parallel strategies. The finish reward (`r_finish`) rewards completed subtasks to prevent "spurious parallelism," where the orchestrator spawns many sub-agents without meaningful task decomposition just to collect parallelism bonuses. The auxiliary reward coefficients (parallelism and finish) are annealed to zero over training, ensuring the final policy optimizes solely for performance while using the auxiliary signals only during exploration.

At inference time in production, the model receives a task and autonomously decides whether and how to parallelize based on learned patterns. The orchestrator analyzes task structure, creates sub-agents with specific instructions, assigns tasks that execute concurrently with independent context windows, and collects results to synthesize a final answer. The decision to parallelize is not hard-coded—on simple tasks, the model works sequentially, while complex multi-source research tasks trigger many parallel agents. The training distribution encourages this adaptive behavior through synthetic prompts emphasizing either "wide search" across many independent information sources or "deep search" with multiple reasoning branches and delayed aggregation. Critically, the prompts don't instruct the model to parallelize; they create task structures where parallelism provides advantages that the RL process discovers.

Production results demonstrate substantial improvements: Agent Swarm reduces inference latency by up to 4.5× while improving accuracy. On the BrowseComp benchmark, it achieves 78.4% compared to 60.6% for single-agent execution, surpassing GPT-5.2 Pro at 77.9%. On WideSearch tasks, item-level F1 improves from 72.8% to 79.0%. An interesting emergent behavior is that Agent Swarm functions as proactive context management—decomposing tasks into isolated sub-agent contexts naturally avoids the context overflow problems that plague long sequential runs, addressing a key LLMOps challenge without explicit design for that purpose.

The broader training pipeline incorporates several additional production-oriented components. Rule-based outcome rewards handle tasks with verifiable solutions like reasoning and agentic tasks. Generative Reward Models (GRMs) evaluate open-ended tasks where binary pass/fail judgments are inadequate, providing fine-grained assessment aligned with internal quality criteria covering helpfulness, aesthetic quality, and instruction following. Multiple alternative GRM rubrics mitigate reward hacking by preventing the model from optimizing for quirks of a single reward model. Rejection-sampling fine-tuning (RFT) creates a self-improving data pipeline where successful RL trajectories are extracted and used as supervised fine-tuning data for subsequent training stages, with each iteration building on the last. A technique called "Toggle" alternates between budget-constrained and standard scaling phases during training, cutting output length by 25-30% with negligible performance loss, directly addressing token efficiency concerns relevant to production cost management.

## Cursor Composer 2: Real-Time RL for Agentic Coding

Cursor's Composer 2 represents an in-house model for agentic software engineering deployed in their production IDE. The model can read and edit files, run shell commands, search codebases, and browse the web, aiming to solve real coding tasks autonomously. From an LLMOps perspective, the most significant aspect is training inside the exact production harness that users interact with, maintaining a shadow deployment of the Cursor backend during training so tool behaviors like semantic search work identically to production.

This production-first approach addresses a critical gap between public benchmarks and real-world deployment. Public benchmarks like SWE-bench use simplified environments and over-specified prompts with clear acceptance criteria. Real developer requests are under-specified, messy, and admit multiple valid solutions. By training on problems drawn from actual Cursor usage within the production harness, Composer 2 learns to handle the true distribution of tasks it will encounter. The team built CursorBench, an internal evaluation suite of tasks pulled from actual coding sessions by their engineering team, where tasks have a median of 181 lines changed compared to 7-10 on SWE-bench and much shorter, more ambiguous prompts. This benchmark co-evolves with the product as users push agents toward more complex behaviors.

The RL infrastructure architecture demonstrates sophisticated LLMOps engineering through four decoupled services. The training stack is fully asynchronous, built on Ray and PyTorch. The environment service runs each rollout in a dedicated Firecracker VM on their internal platform called Anyrun, capable of scheduling 500+ pods per second. Anyrun supports filesystem-level snapshotting and forking of environments, useful for mid-trajectory checkpointing and exploration from intermediate states. The inference service partners with Fireworks AI for RL inference at scale, with weight synchronization happening every training step via delta-compressed uploads to S3 with sharding across training ranks. This enables world-scale distributed inference where inference workers can update weights mid-rollout, keeping later tokens more on-policy. The evaluation service uses pinned production backend and Cursor client replicas, giving high confidence that evaluation behavior matches what users experience.

The policy gradient algorithm is a variant close to GRPO (Group Relative Policy Optimization), applied single-epoch so no prompt is trained on twice, with full-parameter updates. They remove the length standardization term from standard GRPO because it introduces length bias, and skip advantage normalization by standard deviation because it over-amplifies noise when all rollouts in a group have equal correctness. These modifications reflect practical lessons learned from production deployment rather than theoretical considerations.

Cursor trains additional Multi-Token Prediction (MTP) layers for speculative decoding to address inference cost and latency. These layers learn to predict the exact logit distribution of the main language model head at each token position through self-distillation. The MTP layers are initialized from scratch, trained on the same data mix as the base model, then jointly fine-tuned during long-context and supervised fine-tuning phases before RL training begins. This yields 2-3× faster inference with minimal quality degradation, directly addressing production cost concerns.

Self-summarization addresses the context management challenge for long coding sessions. Real tasks might involve dozens of tool calls, reading many files, and iterating over hundreds of turns. Composer 2 implements self-summarization where each rollout can involve multiple generations chained together by summaries generated by the model itself. The final outcome reward applies to all tokens in the chain, so good summaries that preserve critical information get reinforced through higher rewards, while poor summaries that lose key context get downweighted. The model learns when and how to summarize as a natural part of RL training rather than through explicit instruction, with hard tasks often requiring multiple summarization steps.

The most innovative LLMOps component is real-time RL, where Cursor extracts training signal from actual production traffic. The cycle collects billions of tokens from user interactions with the current checkpoint, distills user responses into reward signals (examining whether users followed up with changes, expressed satisfaction, etc.), trains on these signals to produce an updated checkpoint, runs the checkpoint through CursorBench to catch regressions, and deploys if it passes. The entire loop takes approximately five hours, enabling multiple improved checkpoint deployments per day. Keeping the loop fast keeps data nearly on-policy since the model generating the data is almost the same as the model being trained, addressing a fundamental challenge in RL from human feedback.

## Chroma Context-1: Self-Editing Search Agent

Chroma's Context-1 is a 20B parameter agentic search model trained for a specific production role: finding relevant documents rather than answering questions. It returns a ranked set of supporting documents to a downstream reasoning model, representing a decomposed architecture where specialized components handle retrieval versus reasoning. The core production innovation is self-editing context, where the model learns to selectively discard retrieved documents that are no longer relevant, freeing up context space for further exploration.

The synthetic data pipeline addresses the challenge of obtaining multi-hop search tasks with known ground-truth document sets at scale. Chroma built a generation pipeline across four domains: web, finance (SEC filings), legal (USPTO patents), and email (Epstein files plus Enron corpus as distractors). Each task follows a structured generation process: gather supporting documents with unique facts, generate obfuscated clues that indirectly reference facts, create a question, verify the task through extraction-based checking, collect distractors that match some criteria but point to different answers, and optionally chain tasks to create multi-hop questions.

The verification step demonstrates important LLMOps discipline. Asking an LLM "is this document relevant?" produces unreliable labels. Instead, they use an extraction-based pipeline where the LLM extracts matching quotes from both document and clue, then a deterministic check verifies the quotes actually appear in the source text. This achieves over 80% alignment with human labels across all domains, providing reliable training signal. This represents a pattern where verification relies on extraction and deterministic checking rather than generation and subjective evaluation.

The production agent harness provides four tools: `search_corpus(query)` for hybrid BM25 plus dense retrieval with reciprocal rank fusion and reranking, `grep_corpus(pattern)` for regex search, `read_document(doc_id)` for reading specific chunks, and `prune_chunks(chunk_ids)` for removing irrelevant chunks from context. The harness enforces a fixed token budget (e.g., 32k tokens) with explicit usage tracking. After each turn, current usage is included in the context like `[Token usage: 14,203/32,768]`. Past a soft threshold, the harness suggests pruning. Past a hard cutoff, all tools except `prune_chunks` are blocked—the model must prune or conclude.

Deduplication is handled at the harness level rather than by the model, with every chunk ID seen across all prior searches tracked and passed as exclusion filters so subsequent searches always surface new information. When the model prunes, the harness removes chunks from the model's view but preserves the full unpruned trajectory for reward computation, allowing the reward to credit the agent for documents encountered during search even if they were later pruned. This design choice prevents the model from being penalized for effective context management.

Training proceeds in two stages. Supervised fine-tuning warmup generates trajectories using Kimi K2.5 as the inference backend, then filters by recall quality. High-recall trajectories are kept in full, low-recall ones are included at diminishing rates, and a small fraction (up to 5%) of zero-recall trajectories serve as negative examples. The RL stage uses CISPO (Clipped Importance-Sampled Policy Optimization), a variant of GRPO, with fully on-policy training. Each training step uses 128 queries with 8 rollouts each, yielding 1,024 trajectories per step. Groups where all 8 rollouts receive the same reward are discarded since they provide no gradient signal under within-group normalization.

The reward function carefully balances multiple objectives. The outcome component uses F-beta score with beta set high (recall weighted 16× over precision initially), reflecting Context-1's production role where missing a document is worse than including an irrelevant one because the downstream model can filter but can't recover what was never retrieved. The process reward credits trajectory recall, rewarding the agent for encountering relevant documents during search even if later pruned. Without this, the agent converges to issuing one broad search and quitting. A final answer bonus provides +1.0 for retrieving a chunk containing the actual answer. Penalties include repeated pruning penalties to discourage one-at-a-time pruning streaks and turn count penalties to discourage diminishing-return search loops.

The production results demonstrate that smaller, purpose-trained models can compete with frontier models through domain-specific RL. Context-1's 20B parameters match frontier-scale LLMs on retrieval at a fraction of the cost and 10× the speed, validating the approach of specialized models for decomposed architectures.

## Common LLMOps Patterns

Several consistent themes emerge across all three production systems. Training where you deploy represents a fundamental principle, with all three teams investing heavily in making training environments match production. Cursor uses a shadow production backend, Kimi runs sub-agents in the same harness, and Chroma runs search against real databases. This minimizes the distribution shift between training performance and real-world performance, addressing a core challenge in deploying ML systems.

Context management emerges as a first-class production problem. Agent contexts grow over time through tool calls, observations, and reasoning steps. Cursor uses self-summarization to compress long sessions. Kimi shards context across parallel sub-agents. Chroma teaches the model to discard irrelevant chunks. These represent different solutions to the same underlying constraint: finite context windows in production deployment.

Reward design is iterative and requires careful engineering to prevent degenerate behaviors. Every team describes discovering and fixing reward hacking patterns. Cursor's model learned to emit broken tool calls. Kimi's orchestrator fell into "serial collapse" or "spurious parallelism." Chroma's agent converged to single-search-then-quit strategies. Each time, the pattern is: observe the degenerate behavior, understand the incentive structure that produces it, add a targeted reward or penalty to discourage it, and verify the fix doesn't introduce new problems.

Public benchmarks prove insufficient for production evaluation. Cursor explicitly argues that SWE-bench scores don't correlate well with real-world utility, building CursorBench from actual user sessions. Chroma built synthetic benchmarks across four domains with verified ground truth. Kimi uses both public and in-house evaluation. The pattern suggests that building vertical models requires building vertical evaluation infrastructure that captures the true distribution of production tasks.

Finally, smaller purpose-trained models compete with frontier models on specialized tasks. Chroma's 20B model matches frontier-scale performance on retrieval. Composer 2 achieves Pareto-optimal cost-accuracy tradeoffs compared to much larger API models. Domain-specific RL training closes the gap that raw parameter count creates, suggesting a future of specialized models rather than universal frontier models for many production deployments.
