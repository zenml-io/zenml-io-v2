---
title: "AI Agents Accelerating GPU Kernel Engineering for LLM Infrastructure"
slug: "ai-agents-accelerating-gpu-kernel-engineering-for-llm-infrastructure"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "model-optimization"
  - "agent-based"
  - "multi-agent-systems"
  - "latency-optimization"
  - "cost-optimization"
  - "pytorch"
  - "triton"
  - "vllm"
  - "open-source"
  - "documentation"
  - "cicd"
  - "orchestration"
  - "devops"
  - "monitoring"
  - "meta"
  - "nvidia"
  - "hugging-face"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn faced the challenge of scaling GPU kernel development for their open-source Liger Kernel project, where creating, optimizing, and integrating custom Triton kernels required scarce deep expertise and took hours of manual engineering time per task. They built three agentic workflows (liger-kernel-dev, liger-autopatch, and liger-kernel-perf) that automate kernel creation, model integration, and performance optimization through a three-stage pipeline of understanding, acting, and verifying. These agents successfully shipped real contributions including new kernels with 1.9-3.2x speedups, model integrations requiring only human review, and a 3.35x performance optimization, while internally achieving a 10x encoder speedup and 64.7% GPU hour savings on training jobs through automated kernel generation and torch.compile integration."
link: "https://www.linkedin.com/blog/engineering/ai/ai-helping-build-better-ai-how-agents-accelerate-liger-kernel-engineering"
year: 2026
seo:
  title: "LinkedIn: AI Agents Accelerating GPU Kernel Engineering for LLM Infrastructure - ZenML LLMOps Database"
  description: "LinkedIn faced the challenge of scaling GPU kernel development for their open-source Liger Kernel project, where creating, optimizing, and integrating custom Triton kernels required scarce deep expertise and took hours of manual engineering time per task. They built three agentic workflows (liger-kernel-dev, liger-autopatch, and liger-kernel-perf) that automate kernel creation, model integration, and performance optimization through a three-stage pipeline of understanding, acting, and verifying. These agents successfully shipped real contributions including new kernels with 1.9-3.2x speedups, model integrations requiring only human review, and a 3.35x performance optimization, while internally achieving a 10x encoder speedup and 64.7% GPU hour savings on training jobs through automated kernel generation and torch.compile integration."
  canonical: "https://www.zenml.io/llmops-database/ai-agents-accelerating-gpu-kernel-engineering-for-llm-infrastructure"
  ogTitle: "LinkedIn: AI Agents Accelerating GPU Kernel Engineering for LLM Infrastructure - ZenML LLMOps Database"
  ogDescription: "LinkedIn faced the challenge of scaling GPU kernel development for their open-source Liger Kernel project, where creating, optimizing, and integrating custom Triton kernels required scarce deep expertise and took hours of manual engineering time per task. They built three agentic workflows (liger-kernel-dev, liger-autopatch, and liger-kernel-perf) that automate kernel creation, model integration, and performance optimization through a three-stage pipeline of understanding, acting, and verifying. These agents successfully shipped real contributions including new kernels with 1.9-3.2x speedups, model integrations requiring only human review, and a 3.35x performance optimization, while internally achieving a 10x encoder speedup and 64.7% GPU hour savings on training jobs through automated kernel generation and torch.compile integration."
notion:
  pageId: "34ef8dff-2538-81d5-aa36-c354ca45dbc0"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:07:43Z"
---

## Overview

LinkedIn's Engineering AI Infrastructure team developed a comprehensive approach to using AI agents to automate the complex engineering workflows involved in GPU kernel development for their Liger Kernel project. This case study represents a meta-application of LLMs: using AI agents to build and optimize the infrastructure that makes training and deploying LLMs more efficient. The work demonstrates how agentic workflows can encode domain expertise into repeatable processes that handle the heavy lifting of kernel engineering, a task that traditionally requires rare expertise in GPU programming, numerical computing, and hardware optimization.

Liger Kernel is LinkedIn's open-source collection of optimized GPU kernels that delivers 20% throughput improvements and 60% memory reduction across nearly 40 model architectures. The project has achieved significant adoption with over 7 million downloads and 100+ contributors, and integrates with major frameworks including HuggingFace Transformers, TRL, LLaMa-Factory, Flash Attention, PyTorch FSDP, and DeepSpeed. However, the bottleneck wasn't lack of ideas or community interest, but rather the scarcity of expert time needed to implement kernels correctly, integrate them with new models, and optimize their performance.

## The Core Problem and Agent-Based Solution

The fundamental challenge LinkedIn identified was that maintaining and extending Liger Kernel at scale created multiple engineering bottlenecks. Creating a new kernel requires implementing forward and backward passes in Triton, writing correctness tests, and validating numerical accuracy across precision modes. Optimizing an existing kernel demands profiling GPU utilization, diagnosing bottlenecks, and iterating without regressing correctness. Supporting a new model means understanding its architecture, identifying which components map to Liger kernels, and validating across multiple configurations. Each task consumes hours of expert time, and manual effort doesn't scale with the pace of model innovation.

LinkedIn's solution was to build agentic workflows that automate these engineering tasks by encoding Liger-specific domain knowledge into repeatable, agent-driven processes. These workflows are packaged as reusable agent skills that can be invoked with AI coding agents. The approach follows a consistent three-stage pipeline with human review checkpoints between stages:

**Understanding Stage:** The agent reads the input (source code, URL, natural language description), reasons about the problem, and produces a structured profile capturing all key decisions. Human review of the profile is required before proceeding.

**Acting Stage:** Using the confirmed profile and existing Liger code as reference, the agent generates or modifies necessary files, following project-specific conventions and patterns.

**Verification Stage:** The agent runs correctness checks, benchmarks, and generates reports. Hard failures block progress while soft failures are flagged for review.

This approach shifts the human role from writing code to verifying engineering decisions encoded in structured profiles, a fundamentally different interaction model than traditional code assistance.

## Three Production Agentic Workflows

LinkedIn built three distinct agentic workflows, each targeting a specific aspect of kernel engineering lifecycle:

### liger-kernel-dev: Triton Kernel Creation

This workflow converts PyTorch operations into optimized Triton kernels. The input flexibility is notable—it accepts PyTorch files, GitHub URLs, code snippets, paper references, or even natural language descriptions like "ReLU squared activation function."

The key design innovation is tier-based classification. During analysis, the agent classifies operations into three complexity tiers that drive all downstream decisions:

**Tier 1 (Element-wise):** Operations with no cross-dimension reductions, using one program per row. Examples include SwiGLU, GeGLU, and ReLU² activations.

**Tier 2 (Reduction):** Operations with cross-column reductions that may cache intermediates. Examples include RMSNorm, LayerNorm, and Softmax.

**Tier 3 (Fused/Complex):** Multi-pass operations with gradient-in-forward tricks. Examples include CrossEntropy and FusedLinearCE.

This classification determines tiling strategy, memory management, and backward pass approach. Critically, the agent uses existing Liger kernels of the same tier as reference implementations, ensuring generated code follows proven patterns rather than inventing potentially flawed new approaches.

From a confirmed profile, the agent generates up to 8 files: the Triton kernel implementation, a PyTorch nn.Module wrapper, a functional API, exports, parametrized unit tests, and benchmarks. The ReLU² kernel (PR #1171) demonstrates real production results: the agent analyzed the math, classified it as Tier 1, generated all files, and validated them. The resulting kernel achieved 1.9x forward speedup, 3.2x backward speedup, and 37.5% memory reduction versus PyTorch. This task would typically require days of expert time but needed only human review before merging.

### liger-autopatch: Model Integration

This workflow adds Liger optimization support for new HuggingFace Transformers models. Model integration presents architectural complexity because every model has subtle differences across multiple dimensions: normalization type (RMSNorm vs LayerNorm), casting behavior (Gemma's fp32 upcasting vs Llama's partial casting), MLP activation patterns (SwiGLU vs GeGLU), mixture-of-experts routing, vision encoder components, and RoPE variants. Incorrect handling of any element causes silent numerical divergence during training.

The key design decision is a structured decision matrix. The agent reads HuggingFace modeling_*.py source and resolves 12 architectural decisions including norm type and casting mode, RMSNorm offset, MLP activation pattern, dense vs MoE structure, vision components, and RoPE variant. The resulting model profile captures all decisions in a single document for human review before code generation.

From the confirmed profile, the agent generates or modifies up to 13 files: the lce_forward function, monkey-patch functions, exports, convergence tests across multiple configurations, and README entries.

LinkedIn provides two real production examples requiring only human review before merging:

**Nemotron (PR #1165):** A dense model with unique architecture where the agent correctly identified that RoPE/MLP/LayerNorm patching should be excluded due to non-standard implementations.

**Ministral (PR #1166):** A Mistral-family model with full optimization including RoPE, RMSNorm, SwiGLU, CrossEntropy, and FusedLinearCE. All validation checks passed on H100 hardware.

### liger-kernel-perf: Performance Optimization

This workflow optimizes existing kernels that already work correctly. Performance optimization requires GPU profiling expertise, understanding hardware-specific bottlenecks (register pressure, memory bandwidth, occupancy cliffs), and disciplined benchmarking that rejects changes regressing correctness.

The key design is an autonomous optimization loop with accumulated learning. The agent first profiles the kernel, detects GPU architecture (Ampere, Hopper, or Blackwell), and optionally runs NVIDIA NCU profiling to classify bottlenecks as memory-bound, compute-bound, or latency-bound. It generates versioned optimization variants (v0 baseline, v1-vN candidates), always starting with parameter tuning before moving to diagnosis-driven techniques like register pressure reduction or memory coalescing.

Each variant gets a lab notebook tracking hypothesis, changes, and results. The agent reads all prior notebooks before generating the next variant, enabling learning accumulation across iterations. Guardrails reject any variant regressing a non-target metric by more than 5%.

The fused_add_rms_norm backward kernel (PR #1187) demonstrates production impact. NCU profiling on H100 revealed severe GPU underutilization: 115 registers per thread, only 12.5% occupancy, with just 2 blocks running per SM. The agent diagnosed register pressure as the root cause (8 BLOCK_SIZE-wide vectors live simultaneously at peak) and applied four targeted optimizations: reordering dW before dX for register reuse, factoring the dX formula with precomputed scalars to reduce live vectors, deferring the dS_out load until freed registers were available, and adding num_stages=2 for Hopper software pipelining.

Results included 3.35x backward speedup at hidden dimension 16384, 59% full-pass speedup with no memory impact, and no regression across all 40 tests, with human effort limited to reviewing the optimization profile and final diff.

## Internal Production Impact: Kernel Selection with torch.compile

Beyond open-source workflows, LinkedIn applied agents to kernel engineering within their internal training infrastructure. They built a compiler-based kernel selection and replacement library extending torch.compile to avoid case-by-case model monkey patching. The system captures traced graphs via TorchDynamo, identifies fusible operations, retrieves the best kernel implementation from a registry with CI/CD benchmarking guaranteeing optimal selection, and replaces operations with optimized kernels via custom graph passes in torch fx. The graph pass itself is auto-generated by agent skills.

A notable production result involved generating a Triton kernel computing batched partitioned mean pooling in one GPU launch for an internal recommendation model. The kernel was auto-inserted via graph pass with dramatic results: encoder step time decreased from 400ms to 40ms (10x speedup), average training step time decreased from 1.12s to 0.39s (3x speedup), and 64.7% GPU hours were saved on end-to-end training jobs.

## Design Principles for Production-Ready Agentic Workflows

LinkedIn identified five critical design principles that differentiate workflows producing shippable code from those generating merely plausible-looking code:

**Structured Profiles as Intermediate Representations:** Rather than generating code directly, each workflow produces a structured profile capturing all key decisions. This forces explicit reasoning about architecture before code generation, provides clear verification artifacts for human reviewers, and creates specifications the generator can follow deterministically.

**Tier-Based Pattern Matching:** For kernel development, classifying operations into complexity tiers and using existing kernels as references ensures generated code follows established patterns. The agent applies proven patterns rather than inventing new ones.

**Verifiable Checkpoints:** The three-stage pipeline pauses between stages for review. Humans verify the agent's reasoning (the profile) rather than writing code, representing a fundamental shift from "agent helps me write code" to "I verify the agent's engineering decisions."

**Validation as First-Class Stage:** Beyond running tests, the validator implements structured retry logic classifying failures into hard gates (import errors, test failures) and soft gates (tolerance tuning), producing standardized reports after each attempt. After three failures, it stops and reports rather than generating increasingly wrong code.

**Template-Driven Consistency:** Workflows use detailed code templates encoding Liger's conventions, from alphabetical insertion in __init__.py to specific test parametrization patterns and benchmark script structure. Generated code looks like it was written by a Liger contributor because it follows the same templates.

## Future Vision and Lessons Learned

LinkedIn is building additional workflows to cover the remaining kernel engineering lifecycle steps: Create (kernel-dev) → Integrate (autopatch) → Optimize (kernel-perf) → Debug → Extend. The liger-debug workflow will systematically debug kernel numerical issues by bisecting numerical divergence against PyTorch reference implementations. The liger-chunked-loss workflow will accelerate post-training alignment research by generating chunked processing implementations with proper gradient accumulation for techniques like RLHF, DPO, and ORPO.

LinkedIn's key learnings emphasize that agents are force multipliers for open-source projects where the bottleneck is expert implementation time rather than ideas. These workflows encode domain knowledge once for reuse by anyone, including contributors who understand the math but not Triton.

Structured verification is non-negotiable—early iterations generated plausible-looking code failing convergence tests in subtle ways like wrong casting modes or incorrect stride computations. Explicit validation gates at every stage catch issues before review.

The profile is the product—the structured profile is more valuable than generated code. Getting the kernel profile classification, model profile architectural decisions, or optimization profile bottleneck diagnosis correct means the code almost writes itself.

Open source amplifies impact—these workflows ship with the Liger Kernel repository, enabling community members to run liger-autopatch for new model variants or liger-kernel-perf for new GPU architectures without deep profiling expertise.

## LLMOps and Production Considerations

This case study represents a sophisticated application of LLMs in production infrastructure development, with several notable LLMOps characteristics:

**Agent Architecture:** The workflows use AI coding agents with structured skill invocation patterns, representing a multi-agent or tool-augmented LLM approach rather than simple completion.

**Validation and Testing:** Each workflow includes comprehensive validation as a first-class stage with hard and soft failure classification, retry logic, and standardized reporting. This reflects production-grade testing practices essential for kernel code where numerical errors can be silent and catastrophic.

**Human-in-the-Loop Design:** The three-stage pipeline with mandatory review checkpoints between stages represents a thoughtful approach to human oversight. Rather than requiring code review, it requires decision verification at the profile stage, shifting human expertise to where it has highest leverage.

**Domain Knowledge Encoding:** The tier-based classification system, model decision matrix, and optimization profiling workflows represent successful encoding of domain expertise into agent behaviors. This is a key LLMOps pattern for specialized domains where general-purpose LLMs lack deep expertise.

**Continuous Integration:** The kernel registry with CI/CD benchmarking guaranteeing optimal kernel selection represents production-grade deployment practices, ensuring the agent-generated kernels don't just work but remain optimal as new variants are added.

**Performance Monitoring:** The structured profiling and benchmarking integrated into each workflow ensures generated code isn't just correct but performant, with guardrails preventing regressions.

The work demonstrates that agentic workflows can handle complex engineering tasks when properly designed with structured intermediate representations, validation gates, and accumulated learning patterns. The success metrics are compelling: real merged PRs with significant performance improvements, internal production deployments with 10x speedups and 64.7% resource savings, and open-source community adoption enabling contributors without deep expertise to contribute meaningfully.
