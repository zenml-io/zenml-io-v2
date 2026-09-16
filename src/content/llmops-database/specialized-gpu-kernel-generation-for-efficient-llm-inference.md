---
title: "Specialized GPU Kernel Generation for Efficient LLM Inference"
slug: "specialized-gpu-kernel-generation-for-efficient-llm-inference"
draft: false
llmopsTags:
  - "code-generation"
  - "agent-based"
  - "harness-engineering"
  - "memory"
  - "semantic-search"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "triton"
  - "vllm"
  - "databricks"
  - "nvidia"
industryTags: "tech"
company: "Databricks"
summary: "Databricks developed Proteus, an agent-assisted harness that generates and evaluates GPU kernels specialized to the runtime shapes of production inference workloads. Rather than relying exclusively on generic kernels, the system proposes Triton implementations, validates them against a controlled reference, benchmarks only verified candidates, and uses trusted results plus selectively retrieved lessons to guide further iterations. In experiments on parts of Qwen 3.5 122B running on NVIDIA B200 GPUs, Databricks reports individual-kernel speedups of 1.8–5.2× over the best available kernels in vLLM, including shape-specific gains for a packed Gated DeltaNet decode operation. The results are promising but apply primarily to selected kernels and shapes, not necessarily to end-to-end model latency or all serving workloads; the case also shows that reliable validation and context management are more difficult and operationally important than generating candidate code."
link: "https://www.databricks.com/blog/achieving-extreme-efficiency-through-specialized-gpu-kernel-generation"
year: 2026
seo:
  title: "Databricks: Specialized GPU Kernel Generation for Efficient LLM Inference - ZenML LLMOps Database"
  description: "Databricks developed Proteus, an agent-assisted harness that generates and evaluates GPU kernels specialized to the runtime shapes of production inference workloads. Rather than relying exclusively on generic kernels, the system proposes Triton implementations, validates them against a controlled reference, benchmarks only verified candidates, and uses trusted results plus selectively retrieved lessons to guide further iterations. In experiments on parts of Qwen 3.5 122B running on NVIDIA B200 GPUs, Databricks reports individual-kernel speedups of 1.8–5.2× over the best available kernels in vLLM, including shape-specific gains for a packed Gated DeltaNet decode operation. The results are promising but apply primarily to selected kernels and shapes, not necessarily to end-to-end model latency or all serving workloads; the case also shows that reliable validation and context management are more difficult and operationally important than generating candidate code."
  canonical: "https://www.zenml.io/llmops-database/specialized-gpu-kernel-generation-for-efficient-llm-inference"
  ogTitle: "Databricks: Specialized GPU Kernel Generation for Efficient LLM Inference - ZenML LLMOps Database"
  ogDescription: "Databricks developed Proteus, an agent-assisted harness that generates and evaluates GPU kernels specialized to the runtime shapes of production inference workloads. Rather than relying exclusively on generic kernels, the system proposes Triton implementations, validates them against a controlled reference, benchmarks only verified candidates, and uses trusted results plus selectively retrieved lessons to guide further iterations. In experiments on parts of Qwen 3.5 122B running on NVIDIA B200 GPUs, Databricks reports individual-kernel speedups of 1.8–5.2× over the best available kernels in vLLM, including shape-specific gains for a packed Gated DeltaNet decode operation. The results are promising but apply primarily to selected kernels and shapes, not necessarily to end-to-end model latency or all serving workloads; the case also shows that reliable validation and context management are more difficult and operationally important than generating candidate code."
notion:
  pageId: "3d4f8dff-2538-803b-a4b1-c1a54bde0b9a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-07T08:11:00.000Z"
  lastEditedTime: "2026-09-07T08:11:00.000Z"
  publishedAt: "2026-09-16T19:52:21Z"
---

## Overview

Databricks built Proteus to explore whether agentic code generation can produce GPU kernels tailored to the exact shapes encountered during large-language-model inference. The motivating observation is that inference operation shapes are determined by both static model dimensions and dynamic request properties such as token counts, so one generic kernel may be inefficient across models and serving conditions. Proteus uses an iterative proposal-and-test loop: an agent generates a candidate kernel, the harness checks that it implements the intended operation, builds and validates it against a controlled reference, measures successful candidates on real GPUs, and retains useful results as parents for later attempts.

The source reports that Proteus generated kernels for portions of Qwen 3.5 122B on NVIDIA B200 GPUs that were 1.8–5.2× faster than the best available kernels in vLLM. A more detailed packed-decode example on the Gated DeltaNet path produced shape-specific improvements, including a candidate with 1.6× speedup for a particular serving-decode shape and a measured latency of 0.018 ms versus a 0.025 ms baseline in the described benchmark. These are kernel-level and shape-specific measurements. The text does not establish equivalent end-to-end throughput, latency, cost, or production availability for the complete Qwen serving stack, so the results should be treated as an engineering experiment and optimization milestone rather than proof of a universal inference improvement.

## Problem and production context

Conventional production inference systems commonly use generic, hand-written or library-provided kernels that support many models and input shapes. This broad applicability simplifies deployment, but it can leave performance on the table when a workload repeatedly exercises a narrower set of shapes. In a matrix multiplication, for example, some dimensions come from the model while other dimensions vary with the request's token count. The same issue occurs in decode paths, where batch size, key and value dimensions, packing layout, and state indexing affect the useful implementation strategy.

Proteus treats kernel implementation as a search problem. The language model is not being used to answer end-user questions; it is being used as an engineering agent that writes low-level GPU programs. That makes the surrounding operational controls central to the LLMOps design. A generated kernel can compile yet implement the wrong semantics, appear fast because it reused state from a previous run, optimize only visible test inputs, or exploit an unfair comparison between different launch strategies. Consequently, the system must govern what the model proposes, how proposals are tested, what information is returned to the model, and which results are permitted to influence subsequent generations.

## Proteus harness and execution loop

The harness separates proposal, verification, measurement, and iteration. Agents produce candidate kernels, after which Proteus performs static checks and builds, compares the output with a controlled reference implementation, and benchmarks only candidates that pass correctness validation. The best verified candidates become measured parents for later modifications. This is an important distinction from asking an agent to time and judge its own code: the harness supplies the authoritative correctness and performance signals.

The described packed Gated DeltaNet decode workflow used a Triton backend on NVIDIA B200 GPUs. The operation updates recurrent state and writes decode output from packed QKV inputs, gate parameters, and state indices. Proteus first validated the task contract and measured a reference implementation. It then generated candidates, checked and built them, verified their outputs, benchmarked passing candidates, and remeasured promising winners before using them as the basis for more search. A safe initial candidate reproduced the packed-decode structure but was slower than the reference; it was retained as a measured parent rather than incorrectly labeled a performance win.

The search then split into shape-specific paths instead of forcing one implementation to serve every configuration. A Batch-1 repair path reached 1.5× on its target shape. On a serving-decode path, one candidate recorded the lowest measured kernel latency at 0.018 ms, while another achieved the best reported shape speedup of 1.6×. The latter specialized for Batch=4, Key=128, and Value=128 and processed the value dimension in 64-wide chunks. The specialization makes the result potentially useful as a safe component for that known shape, but it also means the implementation is not presented as a universal replacement. Later C++ attempts encountered generation and build failures, illustrating that language flexibility and branch management remain unresolved parts of the workflow.

## Evaluation integrity and reward-hacking controls

The case places unusual emphasis on the evaluator, because an optimization agent will optimize the score it receives. Databricks describes several failure modes that could create misleading gains. A candidate might reuse compiled code from an earlier attempt, record launches in a CUDA graph while the baseline launches them separately, or perform well only on visible test sizes. These outcomes can satisfy a benchmark literally while violating the intended comparison.

Proteus addresses this by timing both candidate and baseline in the same manner, using multiple timers such as CUDA event timing, wall-clock timing, and CUPTI timing when cross-checking is needed. The harness clears compiled state that should not persist, keeps setup and teardown ordering consistent, and remeasures winners before allowing them to seed another round. Hidden test sizes are retained so candidates cannot simply fit the visible test set. Automated consistency checks also flag theoretically implausible speedups, including gains greater than 100× that conflict with physical bandwidth or compute limits. These controls do not prove that every benchmark is representative of production, but they reduce obvious measurement asymmetries and make reported improvements more credible.

Validation is therefore a real-GPU systems problem rather than a prompt-engineering detail. Candidate generation can be parallelized, but correctness and performance checks need isolation, repeated measurement, controlled state, and access to the target hardware. The source's central operational lesson is that the loop advances at the speed at which it can trust a kernel, not at the speed at which an LLM can write one.

## Context management and agent memory

Proteus also treats prompt context as an optimization and cost-management problem. A large prompt can include the current best kernel, recent failures, profiler hints, and previous notes, but every additional token adds model cost and may introduce stale or contradictory guidance. A small prompt reduces cost and drift but causes the agent to revisit failed approaches. The team therefore explored a knowledge layer that stores lessons from prior modifications and retrieves them for related attempts.

The useful unit of memory is neither an unconstrained transcript nor a vague optimization principle. A high-value lesson connects a situation to an action and is scoped to clarify where it applies. For example, a recommendation tied to a particular input size or operation may be actionable for a related run but unsafe for another GPU, shape, or kernel. General statements such as making better use of on-chip memory provide little direct guidance, while overly specific notes can be misapplied. The improved design retrieves concise, high-trust takeaways and closely related failure notes using hierarchical tag filtering combined with hybrid keyword and semantic search. More expensive reorganization and distillation of the lesson store are placed in background jobs rather than synchronous, multi-hop traversal during every generation attempt.

This change shifted the apparent token-cost bottleneck. In the initial design, much of the model context was spent fetching and routing knowledge, without reliably improving the next candidate. In the revised design, most tokens were reported to be spent on candidate generation instead. That is an LLMOps-relevant tradeoff: retrieval quality, context size, and memory maintenance affect both optimization quality and the economics of the autonomous loop.

## Results, limitations, and production implications

The reported outcome is a collection of specialized kernels for parts of Qwen 3.5 122B's Gated DeltaNet path, with individual-kernel speedups ranging from 1.8× to 5.2× relative to the comparison point described by Databricks. The detailed example demonstrates why the full evolution trace matters: semantic failures were discarded, correct but slower implementations were measured without being promoted as wins, and successful kernels remained attached to the shapes for which they had been validated.

The evidence has important limits. The headline range concerns selected kernels rather than a complete model-serving system. Shape-specific optimization can require dispatch logic, artifact lifecycle management, coverage decisions, and retesting when model versions, drivers, GPUs, or workload distributions change; those production integration details are not specified in the source. Likewise, the benchmark controls improve fairness but do not by themselves show that the tested shapes represent a sustained production traffic mix. The comparison with vLLM is described as a kernel-level baseline, and the text does not provide a full cost-per-token or end-to-end service result.

Databricks' planned direction is to give the agent more autonomy over kernel structure, language choice, and the decision to abandon a dead design, while retaining the evolutionary loop as the trusted channel for memory and evaluation. In that model, the agent proposes code, the knowledge layer supplies a small amount of scoped guidance, and the checker returns correctness and timing results that the agent is not allowed to fabricate. This division preserves the benefits of LLM-based exploration while keeping acceptance criteria outside the model's control. For production LLMOps, the broader lesson is that autonomous optimization requires reproducible evaluation, explicit protection against metric gaming, disciplined context management, and a clear boundary between generated artifacts and trusted deployment evidence.
