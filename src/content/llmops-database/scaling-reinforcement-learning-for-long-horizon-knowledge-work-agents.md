---
title: "Scaling Reinforcement Learning for Long-Horizon Knowledge-Work Agents"
slug: "scaling-reinforcement-learning-for-long-horizon-knowledge-work-agents"
draft: false
llmopsTags:
  - "document-processing"
  - "data-analysis"
  - "unstructured-data"
  - "reinforcement-learning"
  - "fine-tuning"
  - "agent-based"
  - "harness-engineering"
  - "mcp"
  - "evals"
  - "error-handling"
  - "fallback-strategies"
  - "latency-optimization"
  - "token-optimization"
  - "model-optimization"
  - "vllm"
  - "open-source"
  - "orchestration"
  - "scaling"
  - "reliability"
  - "scalability"
  - "hugging-face"
industryTags: "tech"
company: "Mercor"
summary: "Mercor and the SkyRL team developed and released an open recipe for reinforcement-learning post-training of large language models that operate across simulated professional-service environments. Using 1,928 expert-created tasks from the APEX-Agents dataset, Harbor-managed sandboxes, MCP and code tools, vLLM, Megatron, Ray, and SkyRL’s fully asynchronous training loop, they improved Pass@1 on a held-out 480-task benchmark from 16.11% to 27.29% for a 397B-parameter model, a reported 70% relative increase. The work emphasizes LLMOps fundamentals—reliable environment orchestration, harness debugging, exact token accounting, concurrency management, train/inference consistency, and staged de-risking—rather than treating the large training run as the primary engineering challenge. Results transferred partially to a different agent harness and to Terminal-Bench, although transfer was weaker for the larger model and the reported gains remain dependent on benchmark design, evaluator reliability, and substantial compute."
link: "https://www.mercor.com/blog/training-frontier-knowledge-work-agents-a-397b-rl-training-guide-with-skyrl/"
year: 2026
seo:
  title: "Mercor: Scaling Reinforcement Learning for Long-Horizon Knowledge-Work Agents - ZenML LLMOps Database"
  description: "Mercor and the SkyRL team developed and released an open recipe for reinforcement-learning post-training of large language models that operate across simulated professional-service environments. Using 1,928 expert-created tasks from the APEX-Agents dataset, Harbor-managed sandboxes, MCP and code tools, vLLM, Megatron, Ray, and SkyRL’s fully asynchronous training loop, they improved Pass@1 on a held-out 480-task benchmark from 16.11% to 27.29% for a 397B-parameter model, a reported 70% relative increase. The work emphasizes LLMOps fundamentals—reliable environment orchestration, harness debugging, exact token accounting, concurrency management, train/inference consistency, and staged de-risking—rather than treating the large training run as the primary engineering challenge. Results transferred partially to a different agent harness and to Terminal-Bench, although transfer was weaker for the larger model and the reported gains remain dependent on benchmark design, evaluator reliability, and substantial compute."
  canonical: "https://www.zenml.io/llmops-database/scaling-reinforcement-learning-for-long-horizon-knowledge-work-agents"
  ogTitle: "Mercor: Scaling Reinforcement Learning for Long-Horizon Knowledge-Work Agents - ZenML LLMOps Database"
  ogDescription: "Mercor and the SkyRL team developed and released an open recipe for reinforcement-learning post-training of large language models that operate across simulated professional-service environments. Using 1,928 expert-created tasks from the APEX-Agents dataset, Harbor-managed sandboxes, MCP and code tools, vLLM, Megatron, Ray, and SkyRL’s fully asynchronous training loop, they improved Pass@1 on a held-out 480-task benchmark from 16.11% to 27.29% for a 397B-parameter model, a reported 70% relative increase. The work emphasizes LLMOps fundamentals—reliable environment orchestration, harness debugging, exact token accounting, concurrency management, train/inference consistency, and staged de-risking—rather than treating the large training run as the primary engineering challenge. Results transferred partially to a different agent harness and to Terminal-Bench, although transfer was weaker for the larger model and the reported gains remain dependent on benchmark design, evaluator reliability, and substantial compute."
notion:
  pageId: "3d2f8dff-2538-80c2-a661-e333e79e18f8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-05T14:56:00.000Z"
  lastEditedTime: "2026-09-05T14:56:00.000Z"
  publishedAt: "2026-09-07T09:27:44Z"
---

## Overview

Mercor, working with the SkyRL team, presents an open-source recipe for post-training language models to perform long-horizon knowledge-work tasks. The target workload is not a single-turn question-answering application: an agent must inspect and manipulate a simulated company’s PDFs, spreadsheets, slides, email, chat, and filesystem while using tools and code over many turns. The practical contribution is therefore as much an LLMOps and distributed-systems account as it is an algorithm study. The team shows that the reliability of the environment, the correctness of the agent harness, token-level data flow, and rollout scheduling must be established before expensive reinforcement-learning runs are attempted.

The reported headline result is a Pass@1 increase from 16.11% to 27.29% on the held-out APEX-Agents benchmark for the 397B-parameter Qwen model, described as a 70% relative improvement. A smaller Qwen model was also post-trained, and the resulting models were evaluated under another agent harness and on Terminal-Bench 2.1. These results are promising, but they are not evidence that the same improvement will automatically appear in a production enterprise deployment: the training data, simulated environments, verifiers, model sizes, and high-end distributed infrastructure are specialized, while several comparisons are noisy and the larger model transferred less effectively across harnesses.

## Problem and use case

APEX-Agents is designed around professional-service work in management consulting, investment banking, and corporate law. Each task is placed in a simulated company world containing files and communication systems. Agents interact through MCP servers or code execution and are judged by task-specific verifiers. The benchmark contains 480 public held-out tasks. The training corpus contains 1,928 expert-created off-the-shelf tasks whose prompts and worlds do not appear in the benchmark, reducing—but not entirely eliminating the usual concerns about benchmark contamination and narrow task similarity.

The objective was to improve open-weight models on realistic, multi-step knowledge work without using supervised fine-tuning as a warm-up. The team focused on reinforcement learning because it stresses every layer of the system: tool invocation, environment lifecycle, reward generation, trajectory storage, asynchronous policy updates, long contexts, and distributed inference/training coordination. In this setting, a failed container or malformed tool response can waste GPU capacity and can also distort the reward distribution, making infrastructure failures part of the learning problem.

## Architecture and execution flow

Harbor provides the task format and rollout lifecycle. A task directory contains a prompt, configuration, and verifier. Mercor packages each simulated world as an image archive and pushes it to Amazon ECR. At rollout time, Modal starts a sandbox from the image. The sandbox contains the world’s filesystem and MCP servers for documents, PDFs, email, and chat. The agent loop runs on GPU-cluster infrastructure in the described setup, though the authors note it could run inside the sandbox, another container, or separate CPU nodes in the Ray cluster.

SkyRL supplies the asynchronous RL training loop, vLLM inference engines, and in-flight NCCL weight synchronization. Each rollout is a Ray task. Harbor drives environment startup, agent execution, verification, and teardown, while a custom Harbor `BaseAgent` implementation—an Archipelago-style agent—connects the model to MCP tools and code execution. The reward produced by the in-sandbox verifier is returned with the trajectory to the trainer. Megatron is used as the training backend. This division makes the system modular: Harbor owns environments and trials, SkyRL owns RL coordination, vLLM serves generation, Megatron performs training, and Ray schedules distributed work.

The released recipe is intentionally small and uses SkyRL and Harbor as installed dependencies rather than forks. It contains an entry point, a generator implementing SkyRL’s interface, the MCP/tool-calling agent and bookkeeping helpers, a Harbor trial configuration, and launch scripts containing the tuned training parameters. This is useful operationally because the integration surface is explicit, although reproducing the result still requires access to the models, sandbox providers, expert data, and a large distributed cluster.

## Reliability work before training

The most important operational lesson is to stabilize the environment before launching RL. The team added timeouts to downloads, MCP interactions, and teardown, since a single unbounded operation could consume the full rollout budget. At high concurrency, judge APIs encountered rate limits, so the implementation used multiple API keys and retries with backoff. MCP clients were isolated per process because sharing a Python process across hundreds of loops caused disconnects. Remaining errors were classified as retryable or terminal rather than allowing every failure to be handled identically.

The authors recommend running a full evaluation pass at the concurrency expected during training—roughly 300 to 600 rollouts in their setup—to drive non-model error rates close to zero. This is an LLMOps-style preflight check: it tests the production-like path, rather than merely checking that the model can generate text. The team also inspected traces and per-tool failure patterns to distinguish model limitations from harness defects. Missing Python packages caused agents to waste turns discovering the sandbox; a PowerPoint MCP tool returned `None` even after successful calls; and a PDF reader flattened two-dimensional tables into unusable one-dimensional text. The harness was patched, and agents were directed toward `pdfplumber` for difficult PDF layouts.

Additional controls included truncating tool results to a bounded token or character budget, prompting the model to retry after tool-call parsing failures, and nudging it to finish when it approached the context limit. These changes alone raised the unfine-tuned smaller model’s mean reward from 22.74% to 28.69%, according to the source. That comparison is particularly important: it indicates that better environment and harness engineering can produce gains comparable to an epoch of training, while avoiding the cost and risk of changing model weights.

## Token accounting and asynchronous training

The recipe emphasizes token-in-token-out, or TITO. In a multi-turn agent trajectory, the exact token IDs generated by the inference engine must be passed to the trainer. Reconstructing a string and re-tokenizing it can produce different token boundaries, especially around tool-call syntax. That creates a mismatch between what the policy actually generated and what the trainer believes it generated; it can also misalign later turns. Such errors may be silent and can make an ostensibly on-policy update partially off-policy.

The implementation chooses the most explicit of the approaches discussed: adapting the harness around completion-style interfaces and preserving token IDs directly. Returning token IDs from a chat-completions API is easier, but does not fully solve multi-turn alignment. A framework-level proxy is more convenient, but can hide behavior around retries and was described as forthcoming for SkyRL. This illustrates a production concern beyond model quality: trajectory provenance and exact representation must be observable and consistent across inference, storage, and optimization.

For long-horizon workloads, the team used fully asynchronous RL with in-flight weight updates to reduce the effect of rollout stragglers. They first tuned Megatron parallelism, CPU offloading, and dynamic micro-batching, including tensor, expert, pipeline, and context parallelism settings. They then divided the cluster between training and generation. The reported inference-to-training node ratios were 12:4 for the smaller runs and 12:8 for the 397B run. Rollout concurrency was constrained by both system capacity and algorithmic staleness: KV-cache capacity and trajectory length set the systems ceiling, while the allowed number of stale trajectories set the algorithmic ceiling. The selected concurrency values were 550 for the 35B runs and 300 for the 397B run, below the stated staleness bound of 1,024 trajectories.

The team also compared trainer and inference-engine log probabilities during early steps. This caught a correctness issue involving vLLM CPU offloading, GDN models, and in-flight weight updates. The reported log-probability difference remained small after correction, with the article identifying a difference below 0.03 as generally healthy. In production, this kind of consistency metric is as important as throughput: maximizing rollout rate with a broken or highly stale policy would produce misleading training data.

## Staged experimentation and model training

Before large-scale training, the team performed a synchronous overfitting run on 32 tasks with non-zero reward variance. The purpose was diagnostic, not benchmark performance. If the system could not learn a small task set, there was little reason to spend substantial compute on the complete dataset. File-diff-graded tasks initially failed to overfit, which led to improvements in file extraction and grading fidelity using a third-party diffing tool. This demonstrates how verifier quality can determine whether a task appears learnable.

Algorithm ablations were run on the smaller model, with epoch-one checkpoints evaluated over three passes of the 480 held-out tasks. The team tested token aggregation, policy-loss variants, a context-budget nudge, overlong filtering, and adaptive length penalties. Prompt-level aggregation improved the reported score by 3.9 points over token-level aggregation because trajectories ranged from roughly 2,000 to 128,000 tokens; otherwise, long trajectories could dominate the gradient. The chosen configuration combined DPPO, prompt-level aggregation, and the context nudge. Overlong filtering and adaptive length penalties did not provide useful gains in the reported experiments.

The 397B hero run used this configuration without curriculum learning or a length penalty. The source states that overall post-training moved both models by roughly 10 to 12 points, while individual algorithm choices generally mattered less than the quality of the expert data and the surrounding system. The larger model improved APEX-Agents Pass@1 from 16.11% to 27.29%. Because asynchronous training initially favors easier, faster-finishing tasks, the authors observed an initial decline in Pass@1 and Pass@16 curves; this is a reminder that online training dashboards need interpretation rather than simple monotonicity assumptions.

## Evaluation, transfer, and limitations

Evaluation was performed under the Archipelago MCP harness used for training and under OpenCode, a different code-oriented harness with no MCP servers. The improvement largely transferred, but the 35B model transferred better than the 397B model. The smaller model increasingly relied on code execution, whereas the larger model retained a preference for MCP. The models were also tested on Terminal-Bench 2.1 with the Terminus harness, where the source reports transfer to another agentic workload. HLE and GPQA were used to check for regressions in non-agentic reasoning; all reported differences fell within error bars, so the authors interpret them as no regression rather than a meaningful improvement.

The evidence should be read with appropriate caution. APEX-Agents is a specialized benchmark with expert-authored tasks, simulated tools, and custom verifiers, so success may not predict reliability in real organizations with ambiguous requirements, changing applications, sensitive data, and human review. Three evaluation passes reduce noise but do not eliminate it; the article notes single-pass variation of approximately one to three points. The reported system also depends on very large models, extensive GPU capacity, high rollout concurrency, sandbox providers, judge APIs, and careful engineering. Transfer to OpenCode and Terminal-Bench is encouraging, but the weaker transfer of the 397B model shows that model scale does not guarantee portability across scaffolds.

## LLMOps assessment

The case study’s strongest contribution is its operational methodology. It treats the agent environment, verifier, token pipeline, rollout scheduler, and observability signals as first-class components of model training. Timeouts, retries, failure classification, concurrency ceilings, log-probability comparisons, trace inspection, and staged overfitting are concrete controls that can prevent expensive but invalid experiments. Releasing the training script, model weights, evaluation traces, and task format also improves reproducibility and enables independent testing.

The main tradeoff is complexity. Fully asynchronous RL increases hardware utilization and reduces waiting on stragglers, but introduces policy staleness, train/inference mismatch, and harder-to-interpret dynamics. Exact TITO handling improves correctness but requires deeper integration with the agent harness. More capable environments increase task realism but multiply failure modes and infrastructure costs. Finally, reward improvements can reflect better harness behavior or verifier changes rather than broad reasoning gains. For teams adapting this approach to proprietary enterprise data, the practical lesson is to reproduce the preflight, observability, and evaluation discipline first, then assess whether RL adds value beyond harness fixes, better data, prompting, or supervised post-training.
