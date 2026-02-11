---
title: "Fine-Tuning LLMs for Multi-Agent Orchestration in Code Generation"
slug: "fine-tuning-llms-for-multi-agent-orchestration-in-code-generation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6931624f4d1677312e869ef8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:32:58.271Z"
  createdOn: "2025-12-04T10:28:31.156Z"
llmopsTags:
  - "code-generation"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "poc"
  - "fine-tuning"
  - "multi-agent-systems"
  - "agent-based"
  - "model-optimization"
  - "knowledge-distillation"
  - "instruction-tuning"
  - "few-shot"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "devops"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "pytorch"
  - "fastapi"
  - "amazon-aws"
  - "meta"
  - "openai"
  - "anthropic"
industryTags: "tech"
company: "Cosine"
summary: "Cosine, a company building enterprise coding agents, faced the challenge of deploying high-performance AI systems in highly constrained environments including on-premise and air-gapped deployments where large frontier models were not viable. They developed a multi-agent architecture using specialized orchestrator and worker models, leveraging model distillation, supervised fine-tuning, preference optimization, and reinforcement fine-tuning to create smaller models that could match or exceed the performance of much larger models. The result was a 31% performance increase on the SWE-bench Freelancer benchmark, 3X latency improvement, 60% reduction in GPU footprint, and 20% fewer errors in generated code, all while operating on as few as 4 H100 GPUs and maintaining full deployment flexibility across cloud, VPC, and on-premise environments."
link: "https://www.youtube.com/watch?v=GYaDjPwLDGo"
year: 2025
seo:
  title: "Cosine: Fine-Tuning LLMs for Multi-Agent Orchestration in Code Generation - ZenML LLMOps Database"
  description: "Cosine, a company building enterprise coding agents, faced the challenge of deploying high-performance AI systems in highly constrained environments including on-premise and air-gapped deployments where large frontier models were not viable. They developed a multi-agent architecture using specialized orchestrator and worker models, leveraging model distillation, supervised fine-tuning, preference optimization, and reinforcement fine-tuning to create smaller models that could match or exceed the performance of much larger models. The result was a 31% performance increase on the SWE-bench Freelancer benchmark, 3X latency improvement, 60% reduction in GPU footprint, and 20% fewer errors in generated code, all while operating on as few as 4 H100 GPUs and maintaining full deployment flexibility across cloud, VPC, and on-premise environments."
  canonical: "https://www.zenml.io/llmops-database/fine-tuning-llms-for-multi-agent-orchestration-in-code-generation"
  ogTitle: "Cosine: Fine-Tuning LLMs for Multi-Agent Orchestration in Code Generation - ZenML LLMOps Database"
  ogDescription: "Cosine, a company building enterprise coding agents, faced the challenge of deploying high-performance AI systems in highly constrained environments including on-premise and air-gapped deployments where large frontier models were not viable. They developed a multi-agent architecture using specialized orchestrator and worker models, leveraging model distillation, supervised fine-tuning, preference optimization, and reinforcement fine-tuning to create smaller models that could match or exceed the performance of much larger models. The result was a 31% performance increase on the SWE-bench Freelancer benchmark, 3X latency improvement, 60% reduction in GPU footprint, and 20% fewer errors in generated code, all while operating on as few as 4 H100 GPUs and maintaining full deployment flexibility across cloud, VPC, and on-premise environments."
---

## Overview

This case study presents a comprehensive exploration of multi-agent LLM systems in production, as presented by AWS's Generative AI Innovation Center team alongside Cosine, an enterprise coding agent company. The presentation, delivered by Hannah Marlow and Charlina Kashava from AWS, along with Alistair Pullin from Cosine, provides deep technical insights into deploying and optimizing multi-agent systems for production environments, particularly in highly constrained and regulated enterprise contexts.

Cosine builds cutting-edge coding agents specifically targeted at large enterprises in highly regulated spaces with large codebases and niche technology stacks. Their product is uniquely deployable across multiple environments: multi-tenant cloud, single-tenant VPC, and fully air-gapped on-premise hardware. The company specializes in post-training large language models to become effective coding agents, working across the spectrum from the largest frontier models to small, highly specialized models for the most constrained enterprise deployments.

## The Multi-Agent Architecture Problem

The fundamental challenge that drove Cosine's multi-agent approach was the intelligent shortcomings of small models in enterprise environments. In scenarios where larger models aren't viable—whether due to GPU scarcity, regulatory constraints, origin restrictions on certain models, or air-gapped deployment requirements—smaller models become the only option. However, smaller, cheaper-to-run LLMs often struggle with long-horizon tasks out of the box. The multi-agent architecture addresses this by using an orchestrator to break down complex, long-horizon tasks into smaller, manageable subtasks that specialized worker agents can complete effectively.

The architecture follows a common pattern where an orchestrator agent receives global tasks from users, breaks them down into subtasks, and delegates to specialized sub-agent workers. The orchestrator maintains full context and knowledge of what's happening across all agents, typically using a more competent generalist model. It can spin agents up and down dynamically and determines what's needed to accomplish the overall goal. The sub-agents, in contrast, only have information about their specific tasks, the specific context needed for those tasks, and the tools available to them (API calls, code execution environments, etc.).

## Production Deployment Challenges

The presentation highlighted several critical challenges that emerge when deploying multi-agent systems in production. Latency becomes a significant concern when making multiple calls to different models rather than a single monolithic model call. If every agent uses the same large model, end-to-end response times can become unacceptable. Cost scales similarly—using massive amounts of compute to run giant models for every subtask drives up operational expenses dramatically.

Error propagation represents another major risk in multi-agent systems. Using the analogy of the children's game "telephone," the speakers illustrated how errors cascade through the system. If a worker agent makes a mistake and that output feeds into downstream processes, the error propagates and compounds, potentially leading to complete system failures. The speakers noted that when things go wrong in multi-agent systems, "they go really wrong," with possibilities including doom loops where sub-agents get stuck or scenarios where the orchestrator becomes completely incoherent, making recovery extremely difficult.

Context management poses additional complexity. Without careful design, context can become polluted significantly, which degrades model performance, particularly in smaller models. Managing what information flows between agents, what the orchestrator needs to know, and how to maintain relevant information while filtering noise over long-running trajectories becomes critical.

## Customization Techniques for Production Optimization

The AWS team presented a framework for agent customization across four primary techniques, each addressing specific production challenges:

### Model Distillation

Model distillation emerged as a foundational technique for optimizing cost and latency when agents already perform well with large foundation models. The process involves using a "teacher" model—a large, capable foundation model that performs well on the target task—to generate outputs for representative examples. These teacher outputs become training data for a smaller "student" model, which learns to mimic the teacher's behavior through supervised fine-tuning. The student learns not just final answers but the teacher's reasoning patterns and output distributions.

This approach delivers substantial benefits: smaller models require less compute power and memory, significantly lowering operational costs and enabling deployment in resource-constrained environments. Distilled models execute faster, reducing response times and improving customer experience. For Cosine specifically, distillation proved essential because creating supervised fine-tuning datasets without it is extremely labor-intensive. Their earlier Genie 1 model required a team of five people working for three months to manually create trajectories and label problem solutions—an approach that doesn't scale.

### Supervised Fine-Tuning (SFT)

Supervised fine-tuning addresses situations where agents encounter domain-specific scenarios that foundation models don't handle well out-of-the-box. By training on input-output pairs that demonstrate desired behavior for specific use cases, models learn to handle domain patterns, terminology, and output requirements. In multi-agent systems, this becomes crucial because errors cascade—one agent's hallucination becomes the next agent's incorrect assumption. SFT reduces these errors by teaching each agent the specific patterns and constraints of its domain.

The presentation distinguished between full fine-tuning, which updates all model parameters for maximum customization but at higher computational cost, and parameter-efficient fine-tuning (PEFT) methods like LoRA (Low-Rank Adaptation), which update only a small fraction of parameters. PEFT methods are generally faster and less expensive, and critically for multi-agent systems, enable training multiple task-specific adapters that share the same base model. This allows customization of multiple specialized agents without multiplying infrastructure costs.

Full fine-tuning faces challenges including catastrophic forgetting—where models forget previously learned information when trained on new tasks—and requires orders of magnitude more data and computational power. For these reasons, the AWS team recommends trying parameter-efficient methods first.

### Preference Optimization

Preference optimization techniques like reinforcement learning with human feedback (RLHF) and direct preference optimization (DPO) address situations where correctness alone isn't sufficient. In multi-agent systems, the way agents present information matters tremendously. A research assistant might retrieve all correct facts but present them in verbose, unstructured paragraphs that downstream agents struggle to parse efficiently, leading to system-wide complications.

Rather than showing only correct examples, preference optimization trains on pairs of responses—preferred and non-preferred. Both responses might be factually accurate, but one might be better formatted, more concise, or better aligned with customer requirements. Through thousands of such examples, models learn to respond consistently across all agents, align to customer preferred styles and tones, and produce standardized formats that are predictable and easier to parse reliably.

### Reinforcement Fine-Tuning (RFT)

Reinforcement fine-tuning addresses tasks requiring sequential decisions where each choice affects subsequent options. Code generation provides an ideal example: the agent must determine what code to write first, which tools to use, how to organize the solution, and when something breaks, how to recognize the problem and pivot to a different approach. Simply showing thousands of examples of finished code doesn't teach the model how to actually generate code through the development process.

The presentation focused on Group Relative Policy Optimization (GRPO), described as the most common reinforcement fine-tuning technique used with customers. For each sample problem, the model generates multiple trajectories—several different attempts at solving the same problem. Each trajectory receives a grade from a reward function, and these grades calculate an "advantage term." The resulting spectrum of samples shows what worked well, what didn't work at all, and everything in between. This "group relative" aspect provides much more nuance than supervised fine-tuning's binary examples of correct outputs. The model learns not just "this is good, this is bad" but "this example is better than that one, and here's why" across the entire spectrum of generated trajectories.

## Cosine's Production Implementation

Cosine's implementation demonstrates these techniques in a real-world production system. Their product takes two main forms: a web interface where users can assign large tasks that complete asynchronously off-device, and a CLI product integrating with IDEs (similar to Claude Code or Gemini CLI) that allows developers to work collaboratively with the agent. The agent can access sandbox code execution environments, enabling iterative testing of solutions. The system uses custom scaffolding tightly coupled with the foundation models during post-training, which Cosine found cuts average trajectory length (the number of steps to arrive at a solution) by approximately 35%, reducing both task time and required compute.

### Training the Orchestrator

Cosine's orchestrator training process begins with a frontier model that has already been post-trained using reinforcement learning to become highly competent at software engineering and tightly coupled with their scaffolding. This creates a model that's state-of-the-art on most benchmarks. They then create a prompt and tool set for the orchestrator, defining tools like reading an agent's context, assigning tasks, and spinning down agents. Feeding this model software engineering problems generates trajectories, which they grade using verifiable rewards to identify which trajectories successfully solve problems. These successful trajectories become the supervised fine-tuning dataset for training the smaller orchestrator model.

The orchestrator never actually solves problems directly—it only coordinates. It calls sub-agents as tools (using standard LLM tool-calling patterns), and the tool response contains the worker's output: chains of thought and git diffs of changes made. The orchestrator evaluates these changes to determine if they're satisfactory. If not, it generates new subtasks, either for multiple agents or a single agent, providing follow-up instructions until the task is deemed complete.

### Training the Workers

For worker models, Cosine typically uses models customers are comfortable with, such as DeepSeek's GPT-OSS or Llama 3.3 70B. The training process begins with supervised fine-tuning to get the model into the "rough frame of mind" of a software engineering agent. They take trajectories from a smart model solving software engineering problems and distill these into the smaller model. While they've experimented with skipping SFT and going straight to reinforcement learning, they found that without the SFT step, they're beholden to the base intelligence of the starting model. If the model is already quite poor at the task, it requires extensive time in the RL environment to start learning and getting useful signals. The SFT step shortens this process significantly.

After SFT, they begin the actual reinforcement learning process: delivering software engineering problems to the model in an online setting, having it complete them, grading the results, converting grades into advantages and gradients, and updating model weights. This iterative process creates increasingly competent worker models.

### Architectural Innovation: Multi-LoRA Approach

For the most constrained environments, Cosine developed a multi-LoRA (Low-Rank Adaptation) approach that represents a significant architectural innovation. Rather than running separate orchestrator and worker models simultaneously, they use a single base model with different adapter "personalities" that can be swapped just-in-time. At one moment the base model functions as the orchestrator with one adapter loaded; then they swap adapters and it becomes a worker. This approach achieved a 60% reduction in GPU footprint for on-premise deployments—a dramatic improvement that makes deployment feasible in severely resource-constrained environments.

## Production Results and Performance

The quantitative results from Cosine's implementation are striking. On the SWE-bench Freelancer benchmark—which measures a coding agent's ability to do economically valuable work using real tasks from Upwork where humans were paid to complete them—the multi-agent system showed substantial improvements. Comparing the base Genie 2.1 Mini worker alone (without orchestrator) to the full multi-agent setting using a Llama 70B model, they achieved a 31% performance increase while using the same number of GPUs (just swapping LoRA adapters).

System-wide metrics demonstrated the production value of their approach: 3X improvement in latency relative to generic multi-agent frameworks like LangChain, 60% reduction in GPU footprint for on-premise deployments, and approximately 20% fewer errors in final generated code (because the orchestrator catches issues before returning results to users). The reinforcement learning process also became more stable with the orchestrator providing oversight.

Perhaps most impressively, their multi-agent system using a 70B model outperformed GPT-4's O3-high model on the Freelancer benchmark—demonstrating that properly trained smaller models in a multi-agent architecture can exceed the performance of much larger monolithic models. This is particularly significant for enterprises that cannot deploy or use frontier models due to regulatory, security, or infrastructure constraints.

## Deployment Flexibility and Enterprise Requirements

Cosine's ability to deploy across multiple environments represents a critical production capability. They support deployment through AWS Bedrock, inference through SageMaker, custom Kubernetes runtimes, and fully on-premise air-gapped hardware. This flexibility allows them to target highly regulated industries including finance, defense, healthcare, and advanced manufacturing, where data egress from customer VPCs may be prohibited.

The system maintains full auditability of all actions—a requirement for regulated industries. In multi-agent systems, understanding why things happened the way they did is essential for debugging, compliance, and system improvement. Cosine's architecture captures auditable trajectories for both orchestrator and all workers, allowing complete playback of exactly what happened and why the agents took the actions they did.

## Key Production Learnings

The presentation emphasized several critical learnings from deploying multi-agent LLMs in production. First, training orchestrator models and worker models represent fundamentally different disciplines. The orchestrator focuses on problem decomposition and delegation, while workers focus on ground-level execution like traversing codebases, using tools, and editing code. Cosine has begun experimenting with reinforcement learning of the entire system as a whole, where the orchestrator model receives software engineering tasks with agents available as tools in an online training scenario, with rewards or penalties applied to the complete system. This is challenging due to long time horizons but shows performance improvements.

The tight coupling of scaffolding with foundation models during training emerged as a crucial optimization. By training models specifically on the tools and patterns they'll use in production, Cosine achieved the 35% reduction in trajectory length, demonstrating that alignment between training and inference environments dramatically improves efficiency.

Reinforcement learning and real-world execution data solve numerous problems and provide huge performance drivers. While supervised fine-tuning gets models roughly to the desired baseline, reinforcement learning takes them the extra distance, particularly for smaller models where real-world execution data proves invaluable for driving better generalization that would otherwise be difficult to achieve.

The presentation concluded with practical recommendations for practitioners: start simple with techniques like prompt engineering and retrieval-augmented generation before moving to more complex approaches like fine-tuning. Be clear about what gaps you're trying to close, fail fast to iterate quickly, and remember that the best technique is the one that actually solves your business objectives rather than the latest state-of-the-art method announced in papers. Consider customization as a way to leverage proprietary data, but recognize that you need high-quality data aligned to the outcome you want to improve, not just high volumes of data. Design model architectures and training strategies around infrastructure and budget constraints, and understand that upfront investment in optimization leads to long-term cost of ownership benefits through optimized token consumption and reduced inference expenses.