---
title: "Industrializing Agentic Coding Model Development with a Reproducible Model Factory"
slug: "industrializing-agentic-coding-model-development-with-a-reproducible-model-factory"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "classification"
  - "data-analysis"
  - "data-cleaning"
  - "structured-output"
  - "unstructured-data"
  - "fine-tuning"
  - "instruction-tuning"
  - "prompt-engineering"
  - "model-optimization"
  - "knowledge-distillation"
  - "reinforcement-learning"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "system-prompts"
  - "evals"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "scaling"
  - "orchestration"
  - "open-source"
  - "reliability"
  - "scalability"
  - "vllm"
  - "pytorch"
  - "cache"
  - "nvidia"
industryTags: "tech"
company: "Poolside"
summary: "Poolside developed the LAGUNA M.1 and XS.2 Mixture-of-Experts models for long-horizon, agentic software engineering, using an integrated Model Factory that treats data, training, evaluation, inference, and deployment as versioned, composable production systems. The platform combines Dagster asset lineage, Kubernetes-based scheduling, custom distributed training and inference infrastructure, synthetic-data pipelines, verifiable-reward reinforcement learning, automated evaluations, and quantization. Poolside reports that XS.2 was taken from training start to release in five weeks and achieved competitive results on SWE-bench, SWE-bench Multilingual, SWE-Bench Pro, and Terminal-Bench 2.0, although the comparisons are partly based on self-reported or externally published scores and the benchmark environments required substantial patching to address reliability and reward-hacking concerns."
link: "https://poolside.ai/assets/laguna/laguna-m1-xs2-technical-report.pdf"
year: 2026
seo:
  title: "Poolside: Industrializing Agentic Coding Model Development with a Reproducible Model Factory - ZenML LLMOps Database"
  description: "Poolside developed the LAGUNA M.1 and XS.2 Mixture-of-Experts models for long-horizon, agentic software engineering, using an integrated Model Factory that treats data, training, evaluation, inference, and deployment as versioned, composable production systems. The platform combines Dagster asset lineage, Kubernetes-based scheduling, custom distributed training and inference infrastructure, synthetic-data pipelines, verifiable-reward reinforcement learning, automated evaluations, and quantization. Poolside reports that XS.2 was taken from training start to release in five weeks and achieved competitive results on SWE-bench, SWE-bench Multilingual, SWE-Bench Pro, and Terminal-Bench 2.0, although the comparisons are partly based on self-reported or externally published scores and the benchmark environments required substantial patching to address reliability and reward-hacking concerns."
  canonical: "https://www.zenml.io/llmops-database/industrializing-agentic-coding-model-development-with-a-reproducible-model-factory"
  ogTitle: "Poolside: Industrializing Agentic Coding Model Development with a Reproducible Model Factory - ZenML LLMOps Database"
  ogDescription: "Poolside developed the LAGUNA M.1 and XS.2 Mixture-of-Experts models for long-horizon, agentic software engineering, using an integrated Model Factory that treats data, training, evaluation, inference, and deployment as versioned, composable production systems. The platform combines Dagster asset lineage, Kubernetes-based scheduling, custom distributed training and inference infrastructure, synthetic-data pipelines, verifiable-reward reinforcement learning, automated evaluations, and quantization. Poolside reports that XS.2 was taken from training start to release in five weeks and achieved competitive results on SWE-bench, SWE-bench Multilingual, SWE-Bench Pro, and Terminal-Bench 2.0, although the comparisons are partly based on self-reported or externally published scores and the benchmark environments required substantial patching to address reliability and reward-hacking concerns."
notion:
  pageId: "3fbf8dff-2538-81d0-8a8b-cdaf65782905"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-16T11:06:00.000Z"
  lastEditedTime: "2026-10-16T11:06:00.000Z"
  publishedAt: "2026-10-20T14:47:20Z"
---

## Overview

Poolside’s LAGUNA M.1 and LAGUNA XS.2 are foundation models intended for long-horizon, multi-step software engineering rather than only single-turn code completion. The central LLMOps contribution is the surrounding Model Factory: an internal, industrialized system in which data preparation, model training, post-training, evaluation, inference, and artifact management share versioned components and lineage. Poolside reports that XS.2 progressed from the start of training to delivery in five weeks, because lessons from M.1 could be transferred through configuration changes and reusable infrastructure rather than rebuilt as a separate research project.

The resulting system is closer to a continuously operated model-development and deployment platform than to a one-off training pipeline. Experiments are represented as code and registered as assets; models and checkpoints can be traced to their data and training runs; the same inference stack serves evaluations, reinforcement-learning rollouts, internal users, and customer-facing traffic; and the production agent harness is also used during post-training. Poolside reports competitive benchmark results, but these should be interpreted cautiously: many baselines use published numbers from other providers, agentic benchmarks are infrastructure-sensitive, and Poolside modified task images and verifiers to address dependency failures, data leakage, and reward-hacking risks.

## Problem and operating model

Poolside was addressing the operational difficulty of developing large MoE models while rapidly incorporating research findings. At this scale, the bottleneck is not only model architecture. Teams must coordinate data versions, ablations, distributed jobs, checkpoints, hardware failures, inference capacity, evaluation environments, and post-training trajectories. Manual bookkeeping makes experiments difficult to reproduce and makes successful research slow to promote into a usable model.

The Model Factory addresses this by maintaining a common codebase and shared components for research and production. Every input and configuration is committed to a repository, assigned a run identifier, and stored as a persistent asset with dependencies. Dagster acts as the control plane for the asset DAG, exposing what a run produces and what it depends on. This creates bidirectional lineage: a model checkpoint and its evaluation can be traced back to a training run, while a pre-training token can be traced through filtering, deduplication, synthesis, and source data. Poolside also uses agents through this control plane to design or run ablations, monitor jobs, investigate failures, and analyze experiment results.

This design improves reproducibility and iteration speed, but it also creates a substantial platform-maintenance burden. A single research-and-production codebase requires strict interface discipline, and the claimed five-week turnaround depends on significant internal investment in schedulers, data services, distributed kernels, evaluators, and operational recovery mechanisms.

## Training and data platform

LAGUNA M.1 contains 225.8 billion total parameters with 23.4 billion active per token, while XS.2 contains 33.4 billion total parameters with 3 billion active. XS.2 uses 8 of 256 routed experts per token plus a shared expert, interleaved sliding-window and global attention, grouped-query attention, and rotary positional encodings. The models were trained from scratch on more than 30 trillion tokens drawn from web, code, educational, academic, mathematical, and synthetic sources. XS.2 used 2,048 NVIDIA H200 GPUs for pre-training; M.1 used 6,144.

The data pipeline uses Spark for processing, with intermediate results registered as Dagster assets. Poolside reports throughput on the order of 2 x 10^13 tokens per day. Web data is parsed from raw HTML, language-filtered, deduplicated, scored, ranked, and sampled rather than simply accepted or rejected through rigid rules. Propella supplies multiple document-quality signals, including information density, educational value, integrity, and commercial bias. The stated approach removes high-confidence noise while retaining lower-quality material that may contribute long-tail diversity.

Synthetic data accounts for approximately 13% of the XS.2 pre-training mix. The Hive framework expresses generation as configurable pipelines composed of seed data, metadata, generators, filters, validators, and post-processing. Its dynamic loops can combine orchestrators, generators, judges, and execution-based verifiers. This supports rephrasing, cross-domain conversion, multi-stage synthesis, and multi-turn rollout generation. The report emphasizes that generation complexity should match teacher-model capability and that metadata and validation are needed to control grounding, quality, and diversity; these are important safeguards against blindly scaling synthetic content.

AutoMixer optimizes the pre-training mixture using roughly 60 proxy models per ablation, each approximately 0.5 billion parameters and trained on about 60 billion tokens. Surrogate models predict capability-specific outcomes from mixture proportions, after which the mixture is optimized under constraints and regularization toward a baseline. In a smaller 3-billion-parameter experiment, Poolside reports large gains on coding and mathematics targets, but also modest regressions on several commonsense benchmarks. This is a useful example of an explicit capability tradeoff rather than evidence that data optimization improves every dimension simultaneously.

## Distributed training and reliability

Titan is Poolside’s PyTorch-based training library and the common training entry point for pre-training, supervised fine-tuning, and reinforcement learning. It composes data, fully sharded, tensor, expert, and pipeline parallelism, with communication and computation overlap. Distributed Muon optimization assigns orthogonalization work across ranks and reportedly reduced optimizer overhead to below 1% of training-step time during M.1 pre-training. MoE dispatch and combine operations are fused with grouped GEMM kernels to overlap NVLink movement with expert computation.

Jobs run on Kubernetes across multiple node pools. Poolside replaced an earlier Volcano-based arrangement with an in-house batch scheduler because node-level eviction and reliance on etcd produced excessive churn and placement latency. The custom scheduler makes reclaim decisions per job, mirrors cluster topology into FoundationDB, and uses sticky pod respawn to preserve locality and caches. Poolside reports consistently sub-minute placement, which supports hyperparameter sweeps, canaries, backfill, and automated recovery.

Reliability is treated as an LLMOps feature rather than an afterthought. Pre-flight checks stress-test nodes, while in-flight recovery detects hangs, NCCL failures, and lost workers and resumes from checkpoints. Cross-replica hash checks compare model weights to detect silent data corruption and distributed implementation bugs. The report describes a defective machine that produced corrupted arithmetic and a separate checkpointing cast error, both detected through these controls. Training data is streamed through the internal Blender service, checkpoints are stored primarily in S3, and restart reads are optimized by broadcasting from one replica over RDMA rather than having every rank independently fetch the object.

## Post-training and production alignment

Post-training consists of mid-training, supervised fine-tuning, and online reinforcement learning. Mid-training uses approximately 60 billion tokens across general chat, reasoning, and coding-and-agent trajectories. SFT is heavily weighted toward agentic coding, including trajectories generated from repository-level tasks and terminal environments. Poolside converts public Git commits into verifiable tasks by requiring the gold patch to pass tests and an empty solution to fail, then filters for repository quality and diversity.

The RL system is particularly relevant to production LLMOps because the policy interacts with the same tool API, chat template, orchestration layer, and execution environment used by the shipped agent. Rollouts run in ephemeral containers with repository tests, shell assertions, or exact-answer math verifiers supplying rewards. The reward design is intentionally narrow: positive reward comes from a binary task verifier, while parsing failures, premature termination, and tool errors receive small penalties. Tasks are bucketed by prior pass rate so that training emphasizes difficult but still learnable examples.

Atlas, built on vLLM, serves automated evaluations, internal inference, customer traffic, and RL rollout generation. An Envoy-based proxy and custom orchestrator manage deployments, session routing, and KV-cache utilization. Trainer and inference pools synchronize weights through NCCL point-to-point transfers over GPUDirect RDMA, with asynchronous fan-out and refreshes every two optimizer steps. KV caches are reset on weight updates, in-flight steps are blocked from straddling versions, and trajectory staleness is capped at ten optimizer steps. These controls reduce discrepancies between the policy used to generate data and the policy being optimized.

Poolside also found that token-level consistency matters in multi-turn RL. A token-in, token-out API preserves token IDs across interactions, while a rendering assertion checks that the production chat template exactly reproduces the rollout prefix. The team modified vLLM reasoning and tool parsers to handle prior reasoning blocks and streamed deltas that cross reasoning, content, and tool-call boundaries. This illustrates a practical deployment lesson: seemingly minor template or streaming-parser differences can invalidate post-training behavior even when model weights are unchanged.

## Quantization and evaluation

XS.2 was trained in BF16 and quantized for lower-memory deployment. Poolside evaluated FP8, INT4, NVFP4, and FP8 KV-cache configurations using LLM Compressor and vLLM integrations. FP8 uses SpinQuant rotations and dynamic activation scaling; INT4 uses AWQ, with the final layers kept at INT8 because residual-stream outliers increased deeper in the network. NVFP4 required quantization-aware distillation to recover quality. The report states that final schemes caused only marginal degradation, but intermediate schemes harmed agentic coding more than conventional single-turn benchmarks. This supports evaluating compressed models with the actual tool-use and formatting workloads they will serve.

Evaluations are automatically scheduled against in-flight checkpoints through Atlas and use the same code-execution infrastructure as data generation and RL. Poolside reports XS.2 scores of 69.9 on SWE-bench Verified, 57.7 on SWE-bench Multilingual, 46.3 on SWE-Bench Pro, and 35.7 on Terminal-Bench 2.0; M.1 scores are 74.6, 63.1, 49.2, and 45.8 respectively. XS.2 weights were released under Apache 2.0.

These results are promising but not conclusive evidence of general production superiority. Runs were averaged over four trials because agentic benchmarks are noisy, and Poolside used its own harness, sandbox allocations, and patched benchmark environments. The report identifies leaked git history and web-search-based reference solutions as reward-hacking risks, removes such leaks, fixes dependency and verifier problems, and applies a post-hoc reward-hack review. Comparisons also mix internally measured results with scores reported by other model providers. Independent reproduction with unchanged benchmark definitions, matched harnesses, and real customer workloads would be needed to validate the broader claims.

## Results and tradeoffs

The principal outcome is an integrated operating model for foundation-model development: versioned lineage, self-service experimentation, automated scheduling, failure recovery, execution-grounded evaluation, production-aligned RL, and a serving layer shared across development and use. The approach appears to have enabled rapid transfer from M.1 to XS.2 and made the smaller model deployable across more constrained hardware configurations.

The tradeoffs are substantial. The system requires specialized engineering across GPU scheduling, distributed optimization, data curation, model serving, sandboxing, and benchmark maintenance. Synthetic-data pipelines and automated judges introduce their own biases and failure modes. Optimizing mixtures for coding can reduce commonsense performance, and benchmark-specific reward optimization can overstate real-world utility. Nevertheless, the case demonstrates how LLMOps can turn model research into a repeatable production process: the model, data, evaluator, serving runtime, and agent harness are managed as one continuously tested system rather than as disconnected research artifacts.
