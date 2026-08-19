---
title: "Scaling Reinforcement Learning for AI Coding Agents"
slug: "scaling-reinforcement-learning-for-ai-coding-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "reinforcement-learning"
  - "agent-based"
  - "harness-engineering"
  - "model-optimization"
  - "pytorch"
  - "scalability"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Cognition"
summary: "Cognition, the company behind Devin (the AI software engineer) and Windsurf, undertook an ambitious research program to build production-ready coding agents through increasingly complex reinforcement learning training runs. Starting with a modest 32 H200 GPUs and a small team, they progressed through four major projects: Kevin 32B for CUDA kernel optimization, Swee Grab for file search, and Sweep v1.6 and v1.7 for end-to-end software engineering tasks. The company tackled significant technical challenges including multi-turn agentic training, parallel tool calling, asynchronous RL for throughput optimization, and entropy collapse. Their latest model, Sweep 1.7, achieves frontier-level performance on benchmarks like SWE-bench Pro while being considerably smaller and cheaper than competing models, demonstrating that careful execution of RL techniques can squeeze exceptional performance from smaller models."
link: "https://www.youtube.com/watch?v=z--bPNOvoi0"
year: 2026
seo:
  title: "Cognition: Scaling Reinforcement Learning for AI Coding Agents - ZenML LLMOps Database"
  description: "Cognition, the company behind Devin (the AI software engineer) and Windsurf, undertook an ambitious research program to build production-ready coding agents through increasingly complex reinforcement learning training runs. Starting with a modest 32 H200 GPUs and a small team, they progressed through four major projects: Kevin 32B for CUDA kernel optimization, Swee Grab for file search, and Sweep v1.6 and v1.7 for end-to-end software engineering tasks. The company tackled significant technical challenges including multi-turn agentic training, parallel tool calling, asynchronous RL for throughput optimization, and entropy collapse. Their latest model, Sweep 1.7, achieves frontier-level performance on benchmarks like SWE-bench Pro while being considerably smaller and cheaper than competing models, demonstrating that careful execution of RL techniques can squeeze exceptional performance from smaller models."
  canonical: "https://www.zenml.io/llmops-database/scaling-reinforcement-learning-for-ai-coding-agents"
  ogTitle: "Cognition: Scaling Reinforcement Learning for AI Coding Agents - ZenML LLMOps Database"
  ogDescription: "Cognition, the company behind Devin (the AI software engineer) and Windsurf, undertook an ambitious research program to build production-ready coding agents through increasingly complex reinforcement learning training runs. Starting with a modest 32 H200 GPUs and a small team, they progressed through four major projects: Kevin 32B for CUDA kernel optimization, Swee Grab for file search, and Sweep v1.6 and v1.7 for end-to-end software engineering tasks. The company tackled significant technical challenges including multi-turn agentic training, parallel tool calling, asynchronous RL for throughput optimization, and entropy collapse. Their latest model, Sweep 1.7, achieves frontier-level performance on benchmarks like SWE-bench Pro while being considerably smaller and cheaper than competing models, demonstrating that careful execution of RL techniques can squeeze exceptional performance from smaller models."
notion:
  pageId: "3c1f8dff-2538-8049-916c-dff81176e0ac"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:04:00.000Z"
  lastEditedTime: "2026-08-19T09:04:00.000Z"
  publishedAt: "2026-08-19T09:12:52Z"
---

Cognition's research program represents a comprehensive case study in scaling AI coding agents from experimental prototypes to production-ready systems. The company, known for building Devin (marketed as the world's first AI software engineer) and Windsurf (acquired approximately a year before this presentation), embarked on a journey to systematically scale reinforcement learning for coding tasks through four increasingly ambitious training runs.

The presentation, delivered by Silas, a founding team member and research lead at Cognition, provides detailed insights into how they approached problem selection, compute allocation, team scaling, and the resolution of fundamental LLMOps challenges. This case study is particularly valuable because it demonstrates the practical realities of building production LLM systems rather than just presenting polished final results.

**Kevin 32B: Humble Beginnings with Targeted Problem Solving**

The first project, Kevin 32B, was launched with extremely limited resources: a few interns and just 32 H200 GPUs. The strategic decision here was to pick a very targeted, verifiable problem rather than attempting something overly ambitious. They selected KernelBench, a recently released benchmark for writing CUDA GPU kernels with coding models. The task involves taking a Python PyTorch function and writing a CUDA kernel to speed it up, which provides clear, measurable outcomes.

The team implemented GRPO (Group Relative Policy Optimization) and explored multi-turn agentic training, which at the time was still relatively novel. The results showed that multi-turn training outperformed single-turn approaches, and they achieved state-of-the-art performance on the benchmark compared to GPT-4, which held that position at the time. This was accomplished with just a Qwen 32B base model, demonstrating that careful problem selection and focused optimization could achieve impressive results even with limited compute.

A particularly interesting aspect of this project was their discovery of novel training stability indicators. They identified what they called the "not okay ratio" - the base model had a quirk where it would start its chain of thought with the word "okay," but as training progressed and the model became unstable, it would become more desperate in its language, using phrases like "okay okay I mean" or "okay, holy crap I need to get this code optimized." This ratio served as an early warning signal for eventual training divergence, illustrating the importance of monitoring not just standard metrics but emergent behavioral patterns during training.

**Swee Grab: Building Production-Ready Components**

After Kevin 32B, the team became more ambitious and wanted to build a genuinely useful agent that could be deployed in their products. They identified file finding as a critical subproblem in coding agents - users often need to locate relevant files in a codebase to answer questions or make changes. The task was structured around queries like "how does VS Code efficiently implement file watching?" with the objective being to return the list of relevant files.

This problem had several attractive properties for an LLMOps context: it was clean and verifiable (using F1 score against ground truth file lists), fast to evaluate, and directly applicable to their product needs. They built their own evaluation suite called the Code Search Eval and trained an agent using RL that achieved state-of-the-art performance compared to Claude Sonnet 3.5, which was competitive at the time.

A critical production consideration was inference speed. They deployed the model on Cerebras chips, achieving approximately 3,000 tokens per second with the Cerebras mini variant. This extreme speed was essential for the user experience in Windsurf, their IDE product. The model was successfully shipped to production in Windsurf, demonstrating the full LLMOps lifecycle from training to deployment.

The major technical innovation in Swee Grab was parallel tool calling. Most base models and competing systems at the time would execute tool calls sequentially, one at a time. Anthropic's Claude Sonnet had just started implementing parallel tool calling with typically one to three concurrent calls. Cognition optimized aggressively for end-to-end latency, training their model to execute up to eight tool calls simultaneously. The training data shows a strong correlation: as the reward increased during training, so did the number of parallel tool calls per turn, indicating the model learned that parallelism was valuable for task completion.

**Sweep v1.6 and v1.7: Frontier Coding Models**

The progression to Sweep v1.6 and v1.7 represented a shift toward building complete, frontier-level coding models capable of handling end-to-end software engineering tasks. While the company released multiple versions (v1, v1.5, v1.6, v1.7), the presentation focuses on v1.6 and v1.7 as representative of their latest work. These models were evaluated on realistic coding benchmarks like SWE-bench Pro, which measures performance on real-world software engineering problems.

Sweep v1.6 matched the performance of Claude Opus 3.5 on these benchmarks, a significant achievement given the resource constraints. The training dynamics revealed that on their internal evaluation set of verifiable software engineering tasks, the model improved from 52% to 68% solve rate during a single RL training run. Equally importantly, the model learned to think for longer when needed - average thinking tokens roughly doubled from 4,000 to around 8,000 during training, suggesting the model discovered that more deliberation improved outcomes on complex tasks.

However, this progress was far from smooth. The team encountered numerous training collapses and stability issues. The presentation shows examples where the model would train successfully for perhaps 200 steps before collapsing. The team would diagnose the root cause, implement algorithmic improvements, and restart training. Interestingly, the training trajectory would follow almost the exact same path up to the previous collapse point, then continue further with the improved stability. This iterative process of extending the stable training horizon from 200 to 300 to even longer runs demonstrates the practical challenge of training large-scale RL systems.

**Asynchronous RL and Compute Utilization**

A major innovation introduced during the Sweep projects was asynchronous RL, designed to maximize throughput as rollouts became longer and more expensive. The fundamental architecture separates the trainer from the rollout workers. Rollout workers generate experience by running the model on tasks and send batches of groups (experience tuples) to a data buffer. The trainer consumes from this buffer as it fills and sends weight updates back to the rollout workers after each training step.

This architecture introduces a critical concept called staleness - the number of training steps by which the inference policy lags behind the training policy. When a rollout worker receives a weight update, it may take time to complete its current rollout and send the batch back to the trainer. Meanwhile, the trainer may have completed several more training steps, meaning the received batch was generated by an outdated policy.

The ability to tolerate staleness is directly related to training stability. Early in their research, the algorithms were fragile and could barely handle any staleness. Over time, algorithmic improvements allowed them to tolerate much higher average staleness, which in turn enabled full utilization of their inference engines. The presentation shows a comparison of two training runs where the improved algorithm (shown in black) tolerates significantly higher staleness, directly translating to better compute utilization and faster overall training.

**Sweep 1.7: Maximizing Efficiency and Global Distribution**

Sweep 1.7, their latest model released earlier in 2026, is based on the Qwen 2.5 base model (the presentation refers to it phonetically, but this is the 2.7 trillion parameter variant). The model's performance is presented in the now-standard two-dimensional format plotting cost versus performance on benchmarks. What stands out is the model's efficiency for its size class - it competes with much larger frontier models while being substantially cheaper to run.

The team specifically positioned Sweep 1.7 against concerns that RL was hitting a plateau and that all future progress would come from pre-training larger models. They wanted to demonstrate that with careful optimization, smaller models could still be pushed much further. The primary bottleneck they encountered was entropy collapse.

In RL for LLMs, diversity in generated rollouts is essential for discovering new, better behaviors. This diversity is quantified by entropy measures over the model's output distribution. Typically, entropy decreases over the course of training as the model becomes more confident and deterministic. Eventually, entropy collapses to very low levels, at which point the model stops exploring and RL improvements plateau. Cognition battled with this limitation because they couldn't extract further improvements once entropy collapsed.

Through extensive tuning of their RL recipe - details of which are available in their technical report - they achieved a training configuration with almost imperceptible entropy decline. While entropy still decreases over time, the rate is dramatically slower, allowing them to push performance much further before hitting the exploration ceiling. This is a critical LLMOps insight: the limiting factor in model improvement isn't always data or compute, but algorithmic properties like exploration-exploitation balance.

**Distributed Training Across Continents**

Perhaps the most striking operational achievement is Sweep 1.7's training run, which operated across four countries and three continents: the United States, Canada, Malaysia, and Australia. This wasn't a deliberate choice for its own sake, but a pragmatic response to the challenge of securing large contiguous compute clusters on reasonable timelines. While it's possible to reserve massive clusters many months in advance, Cognition found it more practical to aggregate smaller compute slices from various locations.

This global distribution was only possible because of their asynchronous RL architecture. The training cluster was located in the United States, while rollout clusters were scattered globally. The communication pattern is sparse and efficient: rollout clusters send training batches (essentially just tokens and rewards) to the training cluster, and the training cluster sends weight updates (model parameters) back to the rollout clusters. Because both types of communication are relatively infrequent and bandwidth-efficient compared to synchronous training approaches, global distribution becomes feasible despite network latency.

This represents a significant LLMOps innovation - the ability to opportunistically utilize distributed compute resources across continents, rather than being constrained to single-datacenter or single-region clusters. It demonstrates how architectural choices in the training algorithm can directly enable operational flexibility.

**Philosophy and Critical Assessment**

The presentation concludes with a philosophical reflection: the team's belief is that progress in research doesn't require complex ideas or fancy techniques, but rather executing simple things with care. This is both humble and, to some degree, strategic positioning. While it's true that their core techniques (GRPO, asynchronous training, parallel tool calling) are conceptually straightforward, the actual execution required solving numerous subtle problems: training instability, entropy collapse, staleness tolerance, global distribution, and production deployment at scale.

From a critical LLMOps perspective, this case study demonstrates several important points. First, the progression from narrow, verifiable tasks (kernel optimization, file search) to broad capabilities (full software engineering) represents a sound productization strategy. Each step validated core capabilities before expanding scope. Second, the emphasis on production metrics like inference speed and cost efficiency, not just benchmark performance, shows mature LLMOps thinking. Third, the transparency about failures, collapses, and iterative debugging is valuable - most case studies present only polished successes.

However, there are some claims that warrant balanced assessment. The characterization of Devin as "the world's first AI software engineer" is marketing language rather than technical precision - many organizations were building coding agents simultaneously. The benchmark results, while impressive, should be contextualized within the rapidly evolving landscape where performance claims can become outdated quickly. The presentation doesn't deeply discuss failure modes, safety considerations, or the reliability of these agents in production, which are critical LLMOps concerns.

The resource scaling is notable but not fully transparent - moving from 32 GPUs to training across continents represents an enormous increase in resources that isn't quantified. The ability to achieve this scaling suggests significant funding and organizational growth that contextualizes the achievements. Additionally, while the philosophy emphasizes simplicity, the actual system involves complex distributed infrastructure, careful algorithmic tuning, and substantial engineering effort - suggesting the simplicity is more in concept than execution.

Overall, this case study provides valuable insights into the practical challenges of building production LLM systems, particularly for coding agents where verifiable rewards enable RL training. The progression from experiments to production deployment, the innovative solutions for training stability and distributed compute, and the focus on efficiency metrics all represent meaningful contributions to the LLMOps field.
