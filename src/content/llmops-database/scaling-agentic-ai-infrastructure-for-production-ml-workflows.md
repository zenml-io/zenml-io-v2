---
title: "Scaling Agentic AI Infrastructure for Production ML Workflows"
slug: "scaling-agentic-ai-infrastructure-for-production-ml-workflows"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "memory"
  - "human-in-the-loop"
  - "model-optimization"
  - "latency-optimization"
  - "kubernetes"
  - "pytorch"
  - "tensorflow"
  - "guardrails"
  - "monitoring"
  - "meta"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn's AI platforms team developed an agentic platform to automate complex machine learning tasks including migrating 400+ TensorFlow models to PyTorch, optimizing cluster performance, and conducting autonomous research experiments. The platform uses code-based agents that run iterative experiments over hours or days, launching hundreds of jobs autonomously. To support this scale, LinkedIn built specialized infrastructure including a warm GPU pool with low-latency job launching, restricted execution environments for untrusted agent-generated code, and robust checkpointing systems. The implementation resulted in 100% growth in cluster experiments over six months, demonstrating the potential for agents to dramatically increase experimentation velocity and model improvement opportunities."
link: "https://www.youtube.com/watch?v=FJUrsZn1BSI"
year: 2026
seo:
  title: "LinkedIn: Scaling Agentic AI Infrastructure for Production ML Workflows - ZenML LLMOps Database"
  description: "LinkedIn's AI platforms team developed an agentic platform to automate complex machine learning tasks including migrating 400+ TensorFlow models to PyTorch, optimizing cluster performance, and conducting autonomous research experiments. The platform uses code-based agents that run iterative experiments over hours or days, launching hundreds of jobs autonomously. To support this scale, LinkedIn built specialized infrastructure including a warm GPU pool with low-latency job launching, restricted execution environments for untrusted agent-generated code, and robust checkpointing systems. The implementation resulted in 100% growth in cluster experiments over six months, demonstrating the potential for agents to dramatically increase experimentation velocity and model improvement opportunities."
  canonical: "https://www.zenml.io/llmops-database/scaling-agentic-ai-infrastructure-for-production-ml-workflows"
  ogTitle: "LinkedIn: Scaling Agentic AI Infrastructure for Production ML Workflows - ZenML LLMOps Database"
  ogDescription: "LinkedIn's AI platforms team developed an agentic platform to automate complex machine learning tasks including migrating 400+ TensorFlow models to PyTorch, optimizing cluster performance, and conducting autonomous research experiments. The platform uses code-based agents that run iterative experiments over hours or days, launching hundreds of jobs autonomously. To support this scale, LinkedIn built specialized infrastructure including a warm GPU pool with low-latency job launching, restricted execution environments for untrusted agent-generated code, and robust checkpointing systems. The implementation resulted in 100% growth in cluster experiments over six months, demonstrating the potential for agents to dramatically increase experimentation velocity and model improvement opportunities."
notion:
  pageId: "3c1f8dff-2538-8072-b843-f3707092edea"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:02:00.000Z"
  lastEditedTime: "2026-08-19T09:02:00.000Z"
  publishedAt: "2026-08-19T09:13:10Z"
---

## Overview

LinkedIn's AI platforms team has deployed a production agentic platform to address the challenges of scaling machine learning experimentation and optimization across their infrastructure. The platform supports several autonomous agents that handle complex, time-intensive tasks that traditionally required significant human engineering effort. This case study provides valuable insights into the architectural shifts required when moving from traditional ML workflows to agent-driven experimentation at scale.

The presentation focuses on three primary agents in production, each delivering measurable business value. The first is a model generation agent that automates the migration of LinkedIn's 400+ production TensorFlow models to PyTorch. The second is a performance optimization agent that autonomously identifies and optimizes underutilized jobs in their cluster. The third is an autonomous research agent that enables engineers to define objectives and have the system conduct architectural sweeps and hyperparameter tuning experiments automatically.

## Production Agents and Use Cases

### Model Generation Agent

The model generation agent tackles one of the most challenging infrastructure migration tasks: converting hundreds of production models from one framework to another. LinkedIn operates over 400 production models written in TensorFlow, and the team is migrating them to PyTorch. What makes this particularly complex is that these production models have been fine-tuned by human engineers over months or even years. The agent must not only perform the code translation but ensure that the newly generated PyTorch models perform on par with or better than the existing production implementations. This requirement demonstrates a sophisticated evaluation challenge where the agent must understand performance characteristics and potentially explore optimizations during the migration process.

### Performance Optimization Agent

The performance optimization agent continuously monitors LinkedIn's compute cluster, identifying jobs with low utilization. Once identified, the agent profiles and benchmarks these jobs, drawing upon a knowledge base that the team has accumulated over years of operational experience. The agent then generates optimizations and creates pull requests for different teams to review. This workflow demonstrates a practical implementation of human-in-the-loop agent systems, where the agent does the heavy analytical and code generation work, but human engineers retain approval authority over changes to production systems.

### Autonomous Research Agent

The autonomous research agent represents perhaps the most open-ended of the three systems. Engineers can define an objective, and the agent will autonomously conduct architectural sweeps or hyperparameter tuning to optimize for that objective. This shifts the engineer's role from implementing and running experiments to defining goals and evaluating results, potentially dramatically increasing the number of experiments that can be conducted.

## Agent Lifecycle and Architecture

All three agents share a fundamental lifecycle that runs autonomously over extended periods. The process begins with an engineer writing a hypothesis or defining an objective. The agent then forms its own hypothesis, generates code to test it, executes that code on LinkedIn's GPU infrastructure, and evaluates the outcome. This loop can run continuously for hours or even days without human intervention. The ability to operate autonomously over such timeframes distinguishes these agents from simpler automation and represents a significant operational challenge from an infrastructure perspective.

LinkedIn has adopted a code-based approach rather than relying solely on natural language prompts. The team found that natural language prompts tend to perform poorly when agents run for extended periods. Instead, each stage of the agent workflow is defined in code with explicit responsibilities. Critically, scorers and evaluators are also defined in code rather than being left to the agent's discretion. This design decision helps prevent reward hacking and ensures agents don't diverge from their intended objectives. This represents a pragmatic recognition that while LLMs are powerful, they require structured guardrails for reliable long-running operations.

## Infrastructure Shifts and Challenges

The introduction of agents into production infrastructure has driven several fundamental architectural shifts that are worth examining critically.

### User Experience Shift

Traditionally, LinkedIn's ML infrastructure team focused heavily on creating rich abstractions to help engineers write machine learning pipelines, training loops, and data access patterns. While these abstractions remain important, their role has shifted since the actual code using these abstractions is now often generated by LLMs. Users have redirected their focus toward creating agentic workflows and establishing appropriate guardrails to prevent agents from deviating from their assigned tasks. This represents a significant paradigm shift in how platform teams think about their users and what value they provide.

### Compute Pattern Changes

Traditional engineer-driven workflows typically involved launching a limited number of long-running jobs. A few minutes of delay in job startup was easily amortized over a training run that might last hours or days. Agents, however, exhibit dramatically different compute patterns. They can launch hundreds of jobs within very short time periods, with individual jobs ranging from minutes to days in duration. This creates entirely different load patterns and performance requirements for the control plane and scheduling infrastructure.

### Trust and Security Model

There's an inherent trust in code written by human engineers, but agent-generated code requires a different security posture. LinkedIn runs agent-generated code in highly restricted environments with no egress network access, no access to credentials, and all communication routed through proxies using the agent's own identity. This zero-trust approach to agent-generated code is prudent, though it adds complexity to the infrastructure. Treating agent-generated code as untrusted by default, even when the agent itself is built and operated by LinkedIn, demonstrates appropriate security consciousness for this new operational paradigm.

## Specialized Infrastructure Components

To support these agent workloads effectively, LinkedIn built specialized infrastructure components that address the unique requirements of agentic workflows.

### Custom Control Plane

The existing control plane, designed with multiple layers of abstraction for traditional ML workflows, became a bottleneck when agents began launching large numbers of jobs. The team built a customized control plane that maintains a warm pool of GPU pods to enable very low-latency job launches. This warm pool architecture trades some resource efficiency for dramatically reduced job startup latency, which is critical when agents need to iterate rapidly through many short experiments.

The warm pool runs in a highly restricted mode consistent with the zero-trust security model for agent-generated code: no egress network access, read-only access to data, and operation in an unprivileged mode. This demonstrates how security constraints must be built into the infrastructure layer rather than relying on agent behavior.

### Checkpointing and Recovery

Given that agents can run for hours or days, robust checkpointing and restoration capabilities are essential. The platform includes systems that allow agents to autonomously recover from failures without human intervention. This is particularly important for long-running experiments where failures might otherwise require restarting from the beginning, wasting significant compute resources and time.

### Memory and Knowledge Sharing

The platform includes an ecosystem for managing agent memory and enabling agents to share learnings. Agents of the same type can share knowledge with each other, and different types of agents can also exchange information. This inter-agent knowledge sharing could accelerate learning across the agent population, though the presentation doesn't provide details on how this is implemented or what safeguards exist to prevent propagation of incorrect learnings.

### Human-in-the-Loop Integration

The platform includes notification systems for human-in-the-loop interactions, as demonstrated by the performance optimization agent creating pull requests for human review. This design acknowledges that while agents can automate much of the experimental work, critical decisions should still involve human judgment.

## Evaluation and Validation

A recurring theme throughout the case study is the emphasis on evaluation. The model generation agent must ensure new models perform as well as existing production models. Scorers and evaluators are defined in code to prevent reward hacking. The team mentions they are "continuously investing in our evaluations so that our experiments can turn to real production value." This focus on evaluation is appropriate and necessary when dealing with autonomous systems that can generate large volumes of outputs. Without robust evaluation, increased experimentation velocity could simply produce more low-quality results rather than valuable improvements.

However, the presentation doesn't provide specific details about evaluation methodologies, metrics, or how they ensure evaluations themselves don't become bottlenecks as experiment volume grows. The claim that agents can ensure new models perform "on par or better" than human-tuned models is significant but would benefit from more detail about how this is measured and validated.

## Results and Impact

The quantified impact mentioned is that the number of experiments in the cluster has grown by 100% over the last six months. This demonstrates that the infrastructure successfully enables increased experimentation velocity. However, it's important to note that increased experiment volume is an input metric rather than an output metric. The ultimate value comes from whether these experiments lead to actual production improvements.

The team's stated goal is to "take more shots at the goal" with the hypothesis that more experiments will lead to more model improvements and ultimately better member experience and business value. This is a reasonable hypothesis, but it assumes that the quality of experiments generated by agents is comparable to human-generated experiments, or that the volume increase more than compensates for any quality difference. The presentation doesn't provide data on how many agent-generated experiments actually result in production deployments compared to traditional human-driven experimentation.

## Future Directions

The team is investing in several areas for future development. They are exploring specialized small language models for specific tasks, which could offer better cost-performance tradeoffs than general-purpose LLMs for well-defined agent responsibilities. They are also investigating GPU sharing techniques to improve utilization as GPUs grow larger but not all tasks scale to utilize full GPU capacity. This is particularly relevant for agentic workloads that launch many smaller jobs.

## Critical Assessment

This case study presents a sophisticated implementation of agentic AI for production ML operations. Several aspects are particularly noteworthy:

The code-based approach to agent definition rather than purely prompt-based agents shows pragmatic engineering judgment. Natural language prompts may be more flexible, but code provides more reliable guardrails for long-running production systems.

The security model treating agent-generated code as untrusted is the right approach, even though it adds complexity. As agents become more capable and autonomous, this defensive posture will be increasingly important.

The focus on infrastructure adaptation to support new agent workload patterns demonstrates that deploying agents at scale requires rethinking infrastructure assumptions, not just adding LLMs to existing systems.

However, several aspects warrant scrutiny:

The presentation focuses heavily on implementation details and input metrics rather than outcome metrics. While 100% growth in experiments is impressive, the business case depends on whether these experiments deliver proportional or greater value compared to traditional approaches.

There's limited discussion of failure modes, debugging, or how to diagnose problems when agents produce poor results. With hundreds of autonomous jobs running, observability and debugging become critical challenges.

The claim that agents can match or exceed human-tuned models that took months or years to optimize is significant but needs more validation detail. It's unclear whether this is aspirational or already demonstrated at scale.

The presentation doesn't address cost considerations. Running hundreds of GPU jobs to enable agent experimentation presumably has significant compute costs. Understanding the cost-benefit tradeoff would strengthen the business case.

Overall, this case study demonstrates that LinkedIn has made substantial investment in building production infrastructure for agentic AI, with thoughtful attention to security, scalability, and reliability. The architectural patterns they've developed—warm pools, code-based agent definition, robust checkpointing, and zero-trust execution—provide valuable lessons for others building similar systems. However, the ultimate success of the platform will depend on whether the increased experimentation volume translates to proportional improvements in production model quality and business outcomes, which is an open question based on the information provided.
