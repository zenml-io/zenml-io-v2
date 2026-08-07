---
title: "Building Verifiers and Evaluation Infrastructure for Long-Horizon AI Agent Tasks"
slug: "building-verifiers-and-evaluation-infrastructure-for-long-horizon-ai-agent-tasks"
draft: false
llmopsTags:
  - "code-generation"
  - "high-stakes-application"
  - "data-analysis"
  - "regulatory-compliance"
  - "reinforcement-learning"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "evals"
  - "databases"
  - "monitoring"
  - "cicd"
  - "devops"
  - "continuous-integration"
  - "continuous-deployment"
  - "openai"
  - "anthropic"
  - "meta"
industryTags: "finance"
company: "Theta Software"
summary: "Theta Software presents their approach to developing evaluation infrastructure for long-horizon AI agent tasks, particularly in finance domains. The company addresses the challenge of measuring and training AI agents on complex, multi-step tasks that can take models hundreds of thousands of tokens to complete and correspond to tasks that take humans many hours. Their solution involves sophisticated judge models and rubric-based verification systems that can evaluate agent performance across complex environments involving multiple tools and state changes. They report creating finance-domain tasks averaging 15 hours of human completion time, where frontier models still struggle significantly despite improvements in other benchmarks, highlighting gaps in existing evaluation methodologies."
link: "https://www.youtube.com/watch?v=2aS7aKoXn64"
year: 2026
seo:
  title: "Theta Software: Building Verifiers and Evaluation Infrastructure for Long-Horizon AI Agent Tasks - ZenML LLMOps Database"
  description: "Theta Software presents their approach to developing evaluation infrastructure for long-horizon AI agent tasks, particularly in finance domains. The company addresses the challenge of measuring and training AI agents on complex, multi-step tasks that can take models hundreds of thousands of tokens to complete and correspond to tasks that take humans many hours. Their solution involves sophisticated judge models and rubric-based verification systems that can evaluate agent performance across complex environments involving multiple tools and state changes. They report creating finance-domain tasks averaging 15 hours of human completion time, where frontier models still struggle significantly despite improvements in other benchmarks, highlighting gaps in existing evaluation methodologies."
  canonical: "https://www.zenml.io/llmops-database/building-verifiers-and-evaluation-infrastructure-for-long-horizon-ai-agent-tasks"
  ogTitle: "Theta Software: Building Verifiers and Evaluation Infrastructure for Long-Horizon AI Agent Tasks - ZenML LLMOps Database"
  ogDescription: "Theta Software presents their approach to developing evaluation infrastructure for long-horizon AI agent tasks, particularly in finance domains. The company addresses the challenge of measuring and training AI agents on complex, multi-step tasks that can take models hundreds of thousands of tokens to complete and correspond to tasks that take humans many hours. Their solution involves sophisticated judge models and rubric-based verification systems that can evaluate agent performance across complex environments involving multiple tools and state changes. They report creating finance-domain tasks averaging 15 hours of human completion time, where frontier models still struggle significantly despite improvements in other benchmarks, highlighting gaps in existing evaluation methodologies."
notion:
  pageId: "3b4f8dff-2538-80dc-aa96-f077061116d7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:39:00.000Z"
  lastEditedTime: "2026-08-06T11:39:00.000Z"
  publishedAt: "2026-08-07T13:07:57Z"
---

Theta Software, founded by a CTO and CEO with prior experience at Deep Silken working on ternary models research, presents a comprehensive framework for evaluating and training AI agents on long-horizon tasks in production environments. The presentation focuses heavily on the operational challenges of deploying LLMs as autonomous agents that can work over extended periods and complex task sequences.

## Overview and Problem Context

The core challenge Theta addresses is the rapidly expanding horizon at which AI agents can work autonomously. As model capabilities improve, what constitutes a "long horizon" task continues to evolve. The company emphasizes that long-horizon capability is fundamentally a scalar metric rather than a binary category, making it difficult to establish fixed definitions that remain relevant over time. They identify two primary approaches to measuring task horizon: human-referenced metrics based on how long tasks take human experts, and model-referenced metrics based on token consumption, step counts, and tool calls.

The human-referenced approach uses benchmarks that establish thresholds for success rates. For instance, if a model reaches a 16-hour threshold at 50% success rate, it can achieve tasks that take humans 16 hours with that probability. However, this methodology has significant weaknesses. Different expert quality levels can drastically affect time estimates, and as tasks move toward requiring top 10%, 1%, or 0.1% human expertise, measurements become increasingly noisy. Additionally, tasks that are tedious for humans but algorithmically straightforward for models create mismatches between human time and model difficulty.

The model-referenced approach using tokens, steps, and tool calls provides clearer signals about technical frontiers and model capabilities around coherence and compaction over long trajectories. However, these metrics are highly variable across different models and harnesses. A task requiring 500,000 tokens for GPT models may require substantially different token counts for Claude models, making cross-model comparisons challenging without controlled experiments.

## Environment Complexity and Multi-Tool Coordination

Theta identifies environment complexity as a critical dimension beyond simple horizon length. They distinguish between tasks requiring coordination across multiple tools versus those that can be parallelized. Modern long-horizon tasks increasingly require agents to coordinate information across diverse toolsets including Grafana for observability, GitHub for CI/CD, AWS CloudWatch for logging, and various databases. The complexity isn't just in the number of tools but in how information must flow between them.

A key insight is the distinction between parallelizable complexity and sequential complexity. Tasks that can be decomposed into independent subtasks, such as analyzing different files in a codebase using multiple sub-agents working in parallel, don't necessarily represent true long-horizon difficulty. In contrast, sequential complexity arises when earlier decisions cascade through the task. For example, misreading a dashboard or making a bad query early in a debugging workflow can have major consequences for all downstream steps, creating genuine long-horizon challenges that test agent coherence and error recovery.

## State Changes and Environment Dynamics

The degree to which environments change throughout task execution represents another critical complexity dimension. Theta emphasizes that meaningful long-horizon tasks can't simply be artificially lengthened by chaining unrelated independent tasks together. Instead, earlier decisions must influence later ones through environment state changes. This requires careful environment design where agent actions produce observable state modifications that affect subsequent decision-making.

The concrete example provided involves a software deployment failure scenario where an agent must sift through CI/CD logs on GitHub, examine CloudWatch logs, identify root causes, apply code changes, open a pull request, and verify successful redeployment. Each step changes the environment state in ways that inform subsequent actions, creating genuine sequential dependencies that test agent capabilities beyond simple task completion.

## Ambiguity and Exploration

Theta identifies ambiguity in initial task specifications as essential for measuring model capabilities in realistic scenarios. Rather than providing complete information upfront, tasks should mirror real human work where information is incomplete and exploration is necessary. This includes ambiguous instructions and artifacts that require agents to discover relevant context through interaction with the environment. The trade-off is that increased ambiguity expands the solution space dramatically, creating many valid paths to task completion and making standardized evaluation substantially harder.

## Judge Models and Verification Infrastructure

The central LLMOps challenge Theta addresses is building robust verification systems for complex agent tasks. As environments become more sophisticated and trajectories longer, traditional deterministic verifiers become impractical or impossible for many economically valuable software and finance domain tasks. The company advocates for judge models or critic models that can evaluate both final environment states and agent trajectories with nuance.

Judge models serve multiple purposes in their system. First, they determine correctness and assign reward signals for reinforcement learning training. Second, they examine trajectories to detect reward hacking behaviors such as sandbox escapes or accessing privileged information about hidden test suites. Third, they enable partial credit assignment and more granular feedback than binary pass/fail metrics.

## Judges as Agents

A critical architectural decision is treating judges themselves as agents with similar environmental access to the agents being evaluated. When an agent completes a deployment task involving GitHub and AWS, the judge needs to inspect GitHub logs and CloudWatch metrics to verify success, not just examine the tool calls the agent made. This requires judges to have read access to the same tools and environments, with careful safeguards to prevent accidental mutations to environment state after agent execution.

This agent-based judge architecture becomes necessary as trajectories grow too long to simply stuff into a context window for evaluation. Theta employs sophisticated trajectory processing including storing trajectories in queryable databases, using sub-agents to enrich information, parsing trajectories into distinct phases, and adding metadata to make critical steps discoverable. This enables judges to efficiently locate failure points and verify correctness without processing entire multi-hundred-thousand-token trajectories linearly.

## Rubric Design and Learnability

The density and quality of reward signals from rubrics directly impacts training effectiveness. Theta cautions against overloading rubrics with excessive detail, particularly for frontier problems where models aren't yet capable and judges struggle to apply complex rubrics consistently. They emphasize extensive quality assurance on judge performance to ensure rubrics are being applied correctly before investing significant compute on training.

Emerging patterns in their rubric design include hybrid approaches combining deterministic verifiers with judge models, where deterministic components generate artifacts for judges to evaluate. They also employ dynamic evaluation-time rubrics that provide partial credit by assuming certain intermediate steps are correct even when they aren't, similar to grading exams by giving credit for correct methodology despite earlier errors. This helps assign credit more accurately across long multi-step trajectories.

## Quality Assurance for Verification

Theta implements multiple test types for each rubric they produce. Beyond basic tests like gold standard validation and no-op variance checking, their QA processes focus on coverage and expert agreement. As AI becomes involved in rubric creation and verification itself, and as tasks become more long-horizon, rigorous testing becomes increasingly critical to ensure evaluation reliability.

## Critique of Existing Benchmarks

The presentation includes a pointed critique of existing finance domain benchmarks including GDP Valer, ToolBench, and Apex Agents. Theta identifies several fundamental flaws in these widely-used evaluation sets. First, average human hours per task fall far below what frontier models can already handle according to established benchmarks, meaning these aren't genuinely long-horizon by current standards. Second, these benchmarks show concerning saturation with models achieving high pass rates, suggesting they no longer effectively discriminate capabilities. For instance, Apex Agents shows 57% of tasks solved 100% of the time at pass-at-one, indicating substantial ceiling effects.

Third, these benchmarks lack breadth within finance domains. GDP Valer focuses narrowly on Excel tasks while Apex Agents concentrates on investment banking scenarios, leaving important areas like credit, debt, and risk modeling underrepresented. This narrow coverage limits learnability and generalization. Fourth, the reward signals provided are insufficiently granular for effective training. Theta's own rubrics include 20 different criteria with 10 sub-criteria each, providing far more detailed feedback than existing benchmarks specify.

## Theta's Finance Domain Data

Theta presents statistics on their own finance domain evaluation data to contrast with existing benchmarks. Their tasks average 15 hours of human completion time across a 50-task sample set, substantially exceeding the benchmarks they critique. These tasks require significant model execution time and token consumption. Critically, across all finance sub-domains they cover, frontier models still struggle significantly, with mean performance scores notably different from the high saturation rates seen in existing benchmarks. This suggests their evaluation methodology successfully identifies genuine capability gaps that existing benchmarks miss.

## Production Implications and Trade-offs

The presentation reveals several important LLMOps considerations for organizations deploying long-horizon agent systems. The infrastructure required extends far beyond simple API calls to include sophisticated environment management, multi-tool orchestration, state tracking, trajectory storage and analysis, and judge model deployment. The computational costs are substantial both for agent execution across long horizons and for judge-based evaluation that may itself require agentic processing of complex environments.

Organizations must balance competing objectives around task ambiguity and solution space size versus evaluation standardization and reliability. More realistic tasks with greater ambiguity better measure true capabilities but make evaluation harder and more expensive. The choice of evaluation metrics has profound implications for what gets optimized during training, requiring careful thought about whether human-time equivalence, token efficiency, or other measures best align with business objectives.

The emphasis on judge model reliability highlights that evaluation infrastructure can become a bottleneck as critical as model capabilities themselves. Poor judges that inconsistently apply rubrics waste training compute and may introduce systematic biases. This suggests organizations need to invest significantly in evaluation infrastructure development and QA, not just model training.

## Technical Frontier Considerations

Theta's work illuminates how the technical frontier of agentic AI involves dimensions beyond raw model intelligence. Environment design, tool coordination, verification methodology, and training signal quality all significantly impact what capabilities can be realized in production. The diverging paths of human and agent work patterns suggest that benchmarks overly focused on human-equivalent performance may miss important aspects of what makes agent deployment successful or challenging in practice.

The presentation demonstrates that production LLMOps for sophisticated agent systems requires extensive infrastructure engineering around evaluation and verification, not just model serving and inference optimization. The judge-as-agent architecture, queryable trajectory databases, dynamic rubrics, and multi-tool environment management represent substantial engineering investments necessary to make long-horizon agent systems trainable and deployable at scale.
