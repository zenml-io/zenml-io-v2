---
title: "Post-Training Open-Weight Models for Long-Horizon Legal Agent Tasks"
slug: "post-training-open-weight-models-for-long-horizon-legal-agent-tasks"
draft: false
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "classification"
  - "structured-output"
  - "high-stakes-application"
  - "reinforcement-learning"
  - "fine-tuning"
  - "few-shot"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "memory"
  - "cost-optimization"
  - "latency-optimization"
  - "semantic-search"
  - "prompt-engineering"
  - "evals"
  - "pytorch"
  - "vllm"
  - "nvidia"
  - "microsoft-azure"
industryTags: "legal"
company: "Harvey"
summary: "Harvey, a legal AI company, developed Tenet, a post-trained model based on Kimi K3, to improve performance on long-horizon, agentic legal tasks while optimizing for cost-efficiency. The problem addressed was the need for frontier legal intelligence using open-weight models that law firms could customize and own. Through collaboration with Fireworks and other partners, Harvey employed asynchronous reinforcement learning with group-sequence policy optimization (GSPO) on synthetic data, public legal data, and human expert data. The solution achieved nearly double the task completion rate on Legal Agent Benchmark (LAB) hold-out tasks compared to base Kimi K3, state-of-the-art performance on LAB Contracts, and significant cost reductions through efficient tool use and reasoning, demonstrating that specialized post-training can deliver both quality improvements and cost optimization for production legal AI systems."
link: "https://x.com/gabepereyra/status/2090453918547685537"
year: 2026
seo:
  title: "Harvey: Post-Training Open-Weight Models for Long-Horizon Legal Agent Tasks - ZenML LLMOps Database"
  description: "Harvey, a legal AI company, developed Tenet, a post-trained model based on Kimi K3, to improve performance on long-horizon, agentic legal tasks while optimizing for cost-efficiency. The problem addressed was the need for frontier legal intelligence using open-weight models that law firms could customize and own. Through collaboration with Fireworks and other partners, Harvey employed asynchronous reinforcement learning with group-sequence policy optimization (GSPO) on synthetic data, public legal data, and human expert data. The solution achieved nearly double the task completion rate on Legal Agent Benchmark (LAB) hold-out tasks compared to base Kimi K3, state-of-the-art performance on LAB Contracts, and significant cost reductions through efficient tool use and reasoning, demonstrating that specialized post-training can deliver both quality improvements and cost optimization for production legal AI systems."
  canonical: "https://www.zenml.io/llmops-database/post-training-open-weight-models-for-long-horizon-legal-agent-tasks"
  ogTitle: "Harvey: Post-Training Open-Weight Models for Long-Horizon Legal Agent Tasks - ZenML LLMOps Database"
  ogDescription: "Harvey, a legal AI company, developed Tenet, a post-trained model based on Kimi K3, to improve performance on long-horizon, agentic legal tasks while optimizing for cost-efficiency. The problem addressed was the need for frontier legal intelligence using open-weight models that law firms could customize and own. Through collaboration with Fireworks and other partners, Harvey employed asynchronous reinforcement learning with group-sequence policy optimization (GSPO) on synthetic data, public legal data, and human expert data. The solution achieved nearly double the task completion rate on Legal Agent Benchmark (LAB) hold-out tasks compared to base Kimi K3, state-of-the-art performance on LAB Contracts, and significant cost reductions through efficient tool use and reasoning, demonstrating that specialized post-training can deliver both quality improvements and cost optimization for production legal AI systems."
notion:
  pageId: "3c3f8dff-2538-8074-81a2-d54059c66577"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-21T06:39:00.000Z"
  lastEditedTime: "2026-08-21T06:41:00.000Z"
  publishedAt: "2026-08-21T07:26:09Z"
---

## Overview

Harvey is a legal AI company focused on building production-ready AI systems for law firms. This case study describes their comprehensive post-training effort to develop Tenet, a specialized legal AI model, along with several domain-specific capabilities. The work represents a significant LLMOps endeavor spanning six months and involving multiple research partners including Fireworks, Baseten, Applied Compute, Engram, NVIDIA, Mercor, and Snorkel AI.

The central challenge Harvey addresses is building frontier legal intelligence using open-weight models while creating systems that allow law firms to build their own specialized models and maintain ownership of their intelligence. This dual objective reflects both technical and business requirements—achieving competitive performance with open models while providing customization capabilities that proprietary models cannot offer.

Harvey's approach demonstrates sophisticated LLMOps practices across the entire lifecycle: environment design, data curation, distributed training infrastructure, continuous evaluation against multiple benchmarks, and productionization of research capabilities. The case study is particularly valuable because it provides detailed technical information about training methodology, infrastructure decisions, and rigorous evaluation practices across numerous legal benchmarks.

## Model Development and Training Infrastructure

Tenet is built by post-training Kimi K3, a large mixture-of-experts model, specifically for long-horizon legal work. The training was conducted in collaboration with Fireworks research and involved approximately 150 NVIDIA B300 GPUs over two months. This represents significant computational investment and demonstrates enterprise-scale LLMOps in practice.

The training methodology employs asynchronous reinforcement learning with group-sequence policy optimization (GSPO). The asynchronous architecture is particularly notable from an LLMOps perspective—a local orchestrator maintains a fleet of agent rollouts against rollout deployments while the trainer consumes finished groups with a hard staleness bound to manage off-policy concerns. After each optimizer step, new weights are hot-loaded into deployments in place, meaning deployments never restart and generation rarely stops. This architecture demonstrates sophisticated production ML engineering that maximizes GPU utilization and training efficiency.

Harvey uses a rank-64 LoRA (Low-Rank Adaptation) over the full Kimi K3 network, adapting all attention, MLP, and routed-expert weights—approximately 500,000 expert tensors. This parameter-efficient approach is a common LLMOps practice that reduces memory requirements and training costs while maintaining model quality. The optimizer employs AdamW, with each step consuming 8 task groups of 8 rollouts. Training data comprised approximately 1,750 agentic legal task environments, with each training epoch running 150 optimizer steps across more than 10,000 individual rollouts.

A critical LLMOps challenge Harvey addresses is alignment between training and inference. Because Kimi K3 is served in finite precision, the trainer recomputes log probabilities in a different numerical environment than the one that generated the rollout, which can destabilize RL. To solve this, the Fireworks training platform co-builds the trainer and rollout deployments at the kernel level to minimize numerical gaps through batch-invariant kernels. At the loop level, they adopt a token-in-token-out design with router replay to guarantee alignment. This represents deep systems engineering required for production-grade RL training.

## Data Strategy and Human-in-the-Loop

Data quality and composition are central to Harvey's approach. The training corpus combines synthetic data, publicly available legal data, and human expert data. Harvey emphasizes that human expert data is "a crucial component" and collaborated closely with Mercor and others to build and scale human expert datasets for review and remediation of synthetically-generated data. This hybrid approach—leveraging synthetic data for scale while grounding quality with human expertise—is increasingly common in production LLMOps.

Importantly, Harvey explicitly states they "did not use any customer data in any of our post-training efforts," addressing critical privacy and confidentiality concerns inherent to legal work. This constraint makes the human expert data pipeline even more important, as they cannot bootstrap from production usage data.

## Environment Design and Task Formulation

Harvey's environment design reflects careful consideration of how legal work actually functions in practice. Training environments share the structure of Legal Agent Benchmark (LAB) tasks, with each environment consisting of a task instruction written as a request from a partner, a client matter containing relevant documents, and an expert rubric outlining substantive points required in high-quality work product.

For each training rollout, the agent is initialized in a sandboxed workspace containing the task's client matter files and tools needed to search the matter, read documents, and draft work product. After completing work, the agent writes final deliverables to disk, ending the episode. This mirrors the actual workflow of legal professionals and ensures the model learns behaviors that transfer to real-world usage.

Task instructions are intentionally short (averaging around 50 words) and written as work requests rather than detailed specifications of expected output. Matter files mix key and peripheral documents with underlying legal issues embedded across multiple files, requiring the agent to build context and produce reviewable work product. A single rollout can span more than 1,000 turns and use hundreds of thousands of tokens, demonstrating the long-horizon nature of these tasks.

## Reward Modeling and LLM-as-a-Judge

Harvey employs LLM-as-a-judge for grading rollouts, a common but challenging practice in production LLMOps. Each rollout is graded via LLM-as-a-judge over the task's rubric. Reward is defined as a weighted sum of a granular term for the fraction of rubric criteria satisfied and a holistic term counting the number of underlying legal issues solved, plus a bonus for rollouts that score perfectly on all criteria.

Harvey ran ablations comparing candidate judge models against heavier frontier models for grading and converged on Kimi 2.6 as the optimal judge balancing quality and efficiency. This represents thoughtful evaluation of the evaluator—a meta-level LLMOps concern. The rubrics themselves are detailed, with an average task containing 50 rubric criteria and the largest tasks containing hundreds, each tied to specific deliverable files.

Reward shaping is used strategically throughout training. For the core Tenet model, Harvey incentivized efficient tool use and reasoning through reward shaping, preferring trajectories that reduce tokens consumed at inference time given equivalent performance. This allowed co-optimization for both cost and quality, gaining significant performance while keeping cost stable. This cost-awareness during training is an important LLMOps practice often overlooked in research contexts.

## Cost-Quality Tradeoffs and Optimization

A major finding emphasized throughout the case study is cost-efficiency. Harvey argues that post-training open models provides two opportunities for improving cost profile: open-weight models have cheaper per-token prices, and post-training can optimize for efficient inference through reward shaping. Their results show they achieved significant performance improvements while keeping cost stable or even reducing it through more efficient tool use.

On LAB hold-out tasks, Harvey demonstrates movement along the quality-cost Pareto frontier, achieving competitive quality with frontier models at substantially lower cost. For the Review Table capability specifically, the post-trained model improves answer quality by 3.6 points and citation quality by 12.1 points at roughly one-tenth the cost per cell compared to the strongest baselines. For the Firm Knowledge capability, memory-augmented approaches cut total tokens in completed trajectories by 58%, reducing cost per query by 90% while maintaining competitive quality.

This focus on inference cost optimization is critical for production deployment and represents mature LLMOps thinking. Many research efforts focus solely on quality metrics, but Harvey explicitly optimizes for the cost-quality tradeoff that determines commercial viability.

## Specialized Capabilities and Modular Architecture

Beyond the core Tenet model, Harvey developed several specialized capabilities through task-specific post-training. These capabilities are trained separately and deployed as tools and sub-agents that the main model can route to for specific tasks. This modular architecture is a sophisticated LLMOps pattern that allows specialized optimization while maintaining a coherent system.

**M&A Diligence** represents work on complex, document-intensive tasks requiring traversal of up to 80 million tokens of document context. Harvey partnered with Baseten research to extend their agent harness to include Recursive Language Models (RLMs), where a root agent holds each task's dataroom in a REPL environment, can search and slice it programmatically, and delegate research to sub-agents with their own context windows. Moving to the RLM harness with a GLM-5.2 orchestrator alone lifted criteria pass rate from baseline to 46.1%, and post-training GLM-5.2 within the RLM harness via self-distillation over high-coverage traces further improved pass rate to 60.1%. This demonstrates the value of co-designing harness primitives and model training—a key LLMOps insight.

**Review Table** focuses on structured data extraction at scale over up to 10,000 documents at a time, with each model response requiring good structure and accurate citations. Harvey partnered with Applied Compute to build a corpus of synthetic and public data targeting capability gaps of frontier models. They post-trained a GLM-5.2 model with reward shaping to encourage well-formatted, concise answers with precise citations. The model learned useful behaviors like abstaining when questions don't apply to a document and citing precise supporting evidence rather than padding citations. Harvey attributes these gains to training directly inside the Review Table production harness, where the model can learn to navigate retrieval context, schema constraints, and citation requirements during training. This production-harness training is an important LLMOps practice ensuring train-serve consistency.

**Firm Knowledge** addresses search and reasoning over a firm's accumulated knowledge, which can span approximately 100 million tokens. Harvey partnered with Engram to train a Qwen3.8-27B model that encodes firm knowledge into parametric memory and structured text notes. During training, the agent explores the knowledge base, consolidates features into 1 million tokens of structured knowledge, and internalizes the corpus through distillation and RL over self-generated data. This approach substantially improved ability to efficiently identify relevant law firm knowledge, improving criteria pass rate more than 15% and task completion rate by nearly 10% while cutting total tokens in completed trajectories by 58%. The model achieves what Harvey calls "intelligence-per-token" of 190.8 against 129.3 for the best frontier configuration—a useful metric for production efficiency.

## Evaluation and Benchmarking Rigor

Harvey demonstrates exceptional rigor in evaluation, testing across multiple legal benchmarks with careful attention to methodology consistency. The comprehensive evaluation includes LAB (Legal Agent Benchmark), LAB Contracts, APEX Agents, Redline Bench, APEX, PRBench, LegalBench, CUAD (Contract Understanding Atticus Dataset), and MAUD (Merger Agreement Understanding Dataset).

Tenet successfully completes almost twice as many held-out tasks on LAB and 20% more on LAB Contracts than base Kimi K3, increasing all-pass rate by 9 and 2 percentage points respectively. It achieves state-of-the-art performance on LAB Contracts and places second on LAB overall. Importantly, improvements generalize to benchmarks not seen during training, including Mercor's APEX Agents (Corporate Law) and Crosby's Redline Bench, demonstrating that learned behaviors transfer robustly.

The model also maintains strong performance on benchmarks testing legal knowledge rather than agentic capabilities, including APEX-v1, PRBench, LegalBench, CUAD, and MAUD. This is significant because it shows that agentic capabilities can be improved without degrading the base model's broader understanding of textbook legal concepts—a common concern with specialized fine-tuning.

Harvey provides detailed appendices documenting their evaluation methodology, including differences between their approach and other leaderboard implementations. For example, they note differences in harness implementation between their runs and those of Artificial Analysis (which uses the Stirrup harness and Gemini 3.1 Pro grader) and Vals (which runs on Valkyrie infrastructure with different caching strategies). This transparency about evaluation methodology is important for reproducibility and fair comparison.

For benchmarks like LegalBench designed for legacy completion models, Harvey addresses the challenge that modern chat models often provide additional context before or after responses without additional prompting. These responses fail standard exact-match grading. Harvey used structured outputs to standardize responses without providing additional substantive content beyond the LegalBench prompt—a practical LLMOps solution to benchmark compatibility.

For benchmarks like CUAD and MAUD that require log probabilities for their standard metrics (AUPR), which most closed-source models don't expose, Harvey reports alternative metrics (generative F1 and answer-matching accuracy respectively) and applies these consistently across all models for fair comparison.

## Production Integration and Deployment

Harvey indicates these capabilities are being incorporated into the Harvey product over time, suggesting ongoing work to bridge research and production. They acknowledge support from "Assistant, AI Platform, Review Table, Security" teams within Harvey for helping to bridge research and product, indicating organizational structure supporting research-to-production transitions.

The asynchronous training infrastructure with hot-loading of weights represents production-grade serving capabilities. The modular architecture with specialized capabilities deployed as tools and sub-agents suggests a sophisticated routing and orchestration system in production.

## Critical Assessment and Limitations

While Harvey provides extensive technical detail, several caveats are worth noting. Many results compare against base models or their own internal runs of other models, which may differ from optimized implementations of those models. The case study is written by Harvey's research team and naturally emphasizes positive results, though they do provide substantial methodological detail enabling independent verification.

Some results are described as "early research results" (particularly the M&A Diligence work with RLMs) with promises of forthcoming technical reports, suggesting this represents work in progress rather than fully validated production systems.

The claim that improvements generalize to unseen benchmarks is encouraging, but the benchmarks are all legal-domain tasks, so the degree of true out-of-distribution generalization is unclear. The paper doesn't discuss failure modes or areas where the approach struggles.

Harvey's approach requires significant computational resources (150 B300 GPUs for two months), partnership with multiple specialized AI companies, and substantial human expert data curation. This may not be accessible to smaller organizations, though Harvey's stated goal is to enable law firms to build their own specialized models.

## LLMOps Takeaways

This case study exemplifies mature LLMOps practices across multiple dimensions:

**Infrastructure**: Sophisticated asynchronous training architecture with hot-loading, kernel-level numerical alignment between training and serving, and efficient distributed training across 150+ GPUs.

**Data**: Hybrid approach combining synthetic data for scale with human expert review for quality, while respecting privacy constraints by avoiding customer data.

**Training**: Parameter-efficient fine-tuning with LoRA, reward shaping for inference cost optimization, and careful selection of judge models through ablation studies.

**Evaluation**: Rigorous benchmarking across multiple datasets with detailed methodology documentation and transparent reporting of differences from canonical implementations.

**Architecture**: Modular design with specialized capabilities as tools/sub-agents, co-design of harness primitives and model training, and training directly in production harnesses to ensure consistency.

**Cost Optimization**: Explicit focus on cost-quality tradeoffs, reward shaping for efficient tool use, and metrics like intelligence-per-token to measure production efficiency.

The work demonstrates that open-weight models can achieve competitive performance with frontier models through careful post-training while offering cost advantages and customization capabilities important for enterprise deployment. The technical depth and transparency in this case study make it a valuable reference for practitioners building production LLM systems for specialized domains.
