---
title: "Transforming Agent Traces into Agent Simulations for Production Evaluation"
slug: "transforming-agent-traces-into-agent-simulations-for-production-evaluation"
draft: false
llmopsTags:
  - "poc"
  - "prompt-engineering"
  - "fine-tuning"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "docker"
  - "cicd"
  - "monitoring"
  - "orchestration"
  - "open-source"
  - "documentation"
industryTags: "tech"
company: "Snorkel AI"
summary: "Snorkel AI addresses the challenge of reliably evaluating and improving AI agents in production by developing a methodology that transforms production traces into repeatable simulation environments. While production traces help identify failures, they cannot effectively test different agent configurations in a controlled manner. Snorkel's solution involves creating company-specific benchmarks that mirror production environments including real tools, APIs, databases, and workflows, packaged as Docker containers following the Harbor format. This enables offline testing of multiple agent configurations with different metrics including cost, latency, and retry counts, while maintaining repeatability. The benchmark becomes part of the agent lifecycle through continuous integration pipelines, serving as evaluation datasets, release gates, and training data sources."
link: "https://www.youtube.com/watch?v=Ib5t2RLtxvM"
year: 2026
seo:
  title: "Snorkel AI: Transforming Agent Traces into Agent Simulations for Production Evaluation - ZenML LLMOps Database"
  description: "Snorkel AI addresses the challenge of reliably evaluating and improving AI agents in production by developing a methodology that transforms production traces into repeatable simulation environments. While production traces help identify failures, they cannot effectively test different agent configurations in a controlled manner. Snorkel's solution involves creating company-specific benchmarks that mirror production environments including real tools, APIs, databases, and workflows, packaged as Docker containers following the Harbor format. This enables offline testing of multiple agent configurations with different metrics including cost, latency, and retry counts, while maintaining repeatability. The benchmark becomes part of the agent lifecycle through continuous integration pipelines, serving as evaluation datasets, release gates, and training data sources."
  canonical: "https://www.zenml.io/llmops-database/transforming-agent-traces-into-agent-simulations-for-production-evaluation"
  ogTitle: "Snorkel AI: Transforming Agent Traces into Agent Simulations for Production Evaluation - ZenML LLMOps Database"
  ogDescription: "Snorkel AI addresses the challenge of reliably evaluating and improving AI agents in production by developing a methodology that transforms production traces into repeatable simulation environments. While production traces help identify failures, they cannot effectively test different agent configurations in a controlled manner. Snorkel's solution involves creating company-specific benchmarks that mirror production environments including real tools, APIs, databases, and workflows, packaged as Docker containers following the Harbor format. This enables offline testing of multiple agent configurations with different metrics including cost, latency, and retry counts, while maintaining repeatability. The benchmark becomes part of the agent lifecycle through continuous integration pipelines, serving as evaluation datasets, release gates, and training data sources."
notion:
  pageId: "3aaf8dff-2538-803a-93a2-e8f91f15273b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:01:00.000Z"
  lastEditedTime: "2026-07-27T12:01:00.000Z"
  publishedAt: "2026-07-27T12:05:40Z"
---

## Overview

Snorkel AI presents a comprehensive approach to agent evaluation that moves beyond simple production trace analysis to full simulation-based testing. As a data-as-a-service company specializing in benchmark construction, Snorkel runs millions of agent simulations per month and has developed benchmark construction as an engineering discipline. The presentation by Rustam, who leads Snorkel's AI platform team, outlines a methodology where production traces are systematically transformed into repeatable simulation environments that serve as private company-specific benchmarks.

The core thesis is that every company needs its own benchmark to reliably evaluate, release, and improve AI agents, and that this benchmark must be as close to production as possible while mimicking real tools, API services, policies, and workflows. Furthermore, the benchmark must be part of an ongoing agentic lifecycle, continuously populated with data from production traces rather than remaining static.

## The Problem with Trace-Only Evaluation

Traditional agent evaluation relies heavily on production traces, which show the input prompt, actions taken by the agent, and the final output. While traces are valuable for identifying failures in production, they have significant limitations for systematic agent improvement. The primary challenges include the inability to test different agent variants in controlled conditions, difficulties with repeatability due to changing database states and tool versions, and the complexity of running A/B testing at scale. Essentially, traces make it difficult to compare apples to apples when evaluating agent performance changes.

## The Simulation Solution

Snorkel's approach transforms production traces into repeatable offline experiments. This involves taking production traces, constructing tasks from them, and creating simulation benchmarks that can run with different agent configurations offline. The key advantage is the ability to compare agents across multiple dimensions beyond simple success rate, including cost per task, latency, number of retries, and other operational metrics. These simulations can run in parallel, enabling rapid iteration and experimentation.

## Private vs Public Benchmarks

The presentation makes a critical distinction between public and private benchmarks. Public benchmarks like SweepBench for GitHub issue resolution, TerminalBench for terminal agents, and other domain-specific benchmarks serve to orient teams and establish priors about model capabilities. However, they typically focus narrowly on pass rates and specific domains. Private company-specific benchmarks, by contrast, are essential for shipping agents to production because they incorporate company-specific use cases, tooling, policies, and the full production environment. The mantra presented is that public benchmarks help you orient, while private benchmarks help you ship.

Public benchmarks also tend to emphasize frontier capabilities and single metrics like pass rate, which makes sense for comparing new model releases. Production deployments, however, require optimization across multiple dimensions including cost, latency, and retry behavior, which necessitates more comprehensive evaluation frameworks.

## Full Stack Testing

A significant advantage of the simulation approach is the ability to test the complete agent stack rather than just evaluating model performance in isolation. Teams can experiment with different reasoning approaches, modify prompts, tune the agent's hardness and available skills, and adjust tool configurations. In production, what matters is not the underlying model but the entire system's performance, and simulation environments enable testing and configuring the full system while keeping the environment and evaluators consistent across experimental runs.

## The Benchmark Trifecta

Snorkel positions benchmarks as serving three complementary purposes in the agent development lifecycle. First, they enable initial agent development and release by verifying functionality, handling edge cases, selecting optimal models, and debugging traces. Second, they serve as release gates for agent changes, catching regressions and enabling iterative hardness improvements. Third, they become optimization tools for tuning cost and latency, and can even generate training data for error training. Snorkel provides examples on their website showing how they used simulation environments to fine-tune smaller planning models to match larger model performance on specific tasks.

## Anatomy of a Benchmark Task

A benchmark task consists of several components organized as files, commonly following the Harbor format developed by the team behind TerminalBench. The structure includes what the agent sees and interacts with such as instruction markdown files and the environment defined via Dockerfile or Docker Compose for multi-container setups. Components the agent doesn't see include the Oracle solution, which demonstrates that the task is solvable, and verifiers that evaluate agent performance. Metadata files round out the specification.

The key insight is that simulation environments, while seemingly straightforward as Dockerfiles and associated resources, provide repeatable ways of running agent experiments. This repeatability is fundamental to the methodology's value.

## Environment Construction

Building effective simulation environments presents a significant challenge because they must function as mini-production environments without the resource overhead of running full production systems for every experiment. The environment must match production's databases, API services, tools, and files closely enough that agents cannot detect they're in simulation. This includes handling database snapshots rather than full production databases, using sidecar containers for API services and MCP tools, and mocking services where appropriate.

An important pattern is the use of simulated users, since real users cannot be included in simulation tasks. These simulated users are effectively LLMs with specialized prompts and additional context that mimic human behavior and interactions with the system. Multi-step patterns enable handling long-horizon tasks that span hours by breaking them into intermediate steps with separate prompts and verifiers for each step, allowing early termination if the agent fails at an intermediate stage.

## Verification Approaches

Verification in simulation environments goes beyond traditional output verification. Because agents interact richly with simulated environments, verifiers analyze the final world state including database state, API responses, and user interactions, as well as traces and artifacts produced during execution. Multiple verification approaches are employed depending on the use case. Deterministic checks work well for final outputs and tool calls where correctness is easily determined. LLM-as-judge, harness-as-judge, or agent-as-judge approaches can evaluate trace quality, planning correctness, and other subjective factors. Subject matter experts review selected traces and outputs, particularly where discrepancies appear between agent behavior and verifier assessments, providing human oversight without requiring manual review of everything.

## Benchmark Quality Control

Snorkel acknowledges that benchmark tasks themselves can fail in various ways. Agents might attempt reward hacking by detecting simulation environments and exploiting them. Tasks might be too simple with overly broad verifiers, causing agents to pass incorrectly. Conversely, incorrect verifiers might cause agents to fail consistently. High variance in agent success rates across runs indicates instability. These edge cases must be caught during benchmark development, which Snorkel frames as its own engineering discipline requiring dedicated processes.

## Benchmark Development as Software Engineering

The presentation emphasizes treating benchmarks as software artifacts subject to standard engineering practices. This includes maintaining separate CI pipelines for benchmarks that verify obvious requirements like pinned dependencies, correct base images, and absence of missing fixtures. The pipeline runs Oracle solutions to ensure they pass and that verifiers fail when Oracle isn't run. Multiple agent runs on tasks verify solvability and calibrate difficulty, enabling tagging of tasks as simple, medium, or hard based on agent success rates. Tasks must be explicitly approved before inclusion in the benchmark suite.

## Agent Improvement Workflow

With simulation infrastructure in place, the agent improvement process becomes systematic. Teams establish baseline performance on their benchmark evaluation dataset, identify failure modes, change one variable, and rerun experiments. Tooling like Arize can record experiments for tracking and comparison. Once issues are fixed, the full benchmark suite is rerun before production release. This workflow helps teams avoid anti-patterns like accumulating prompt patches with instructions like "never do this" or "only do that." Instead, teams can fix issues in the appropriate location whether that's adjusting hardness to reduce context overload, adding procedures as skills, or implementing structured output schemas.

## The Production Feedback Loop

Once agents are deployed, Snorkel recommends establishing two parallel loops. The benchmark expansion loop takes observability traces, typically captured through systems like Arize, records failures, and uses them to build out the benchmark with new edge cases and scenarios. The experimentation loop uses simulation runners to test agent configurations on the expanded benchmark, records these experiments, and applies release gates before deploying configuration changes to production. The critical insight is that observability and experimentation must be connected as two sides of the same coin in the agent ops loop.

## Critical Assessment

While Snorkel's approach is methodologically sound and addresses real challenges in agent evaluation, several considerations warrant attention. The presentation comes from a company selling benchmarks as a service, which naturally emphasizes the importance and complexity of benchmark construction. Organizations should assess whether building this capability in-house versus purchasing it aligns with their strategic priorities and resource constraints.

The simulation approach requires significant engineering investment to maintain fidelity between simulation and production environments. As production systems evolve, simulation environments must be updated to maintain relevance, creating ongoing maintenance overhead. The Harbor format and Docker-based approach provide good abstractions, but teams must still invest in environment construction and maintenance.

The use of LLM-as-judge for verification introduces its own reliability considerations, as these verifiers may have biases or inconsistencies that affect evaluation quality. The recommendation to use subject matter experts for disagreement resolution partially addresses this but adds human costs to the process.

The multi-step pattern for long-horizon tasks represents a practical compromise but may not fully capture the complexity of truly long-running agent interactions that span days or involve asynchronous user interactions at unpredictable intervals. Simulation environments work best for tasks with clear boundaries and completion criteria.

Despite these considerations, the framework addresses fundamental challenges in agent evaluation and provides a structured path from ad-hoc testing to systematic agent ops. The emphasis on treating benchmarks as software artifacts with proper CI/CD practices, version control, and quality gates aligns with best practices from traditional software engineering and adapts them appropriately for the agent context.

## Technical Implementation Details

The Harbor format mentioned represents an emerging standard for agent evaluation tasks. The use of Docker containers provides isolation and reproducibility, though teams must carefully manage resource consumption when running hundreds or thousands of simulations in parallel. The presentation mentions running millions of agent simulations per month, suggesting significant infrastructure investment.

The integration with observability platforms like Arize enables the critical feedback loop from production to benchmark development. This integration point is essential for keeping benchmarks relevant as production workloads evolve and new edge cases emerge.

The mention of using simulation environments to generate training data for fine-tuning smaller models to match larger model performance represents an interesting application beyond pure evaluation. This positions benchmarks as multi-purpose assets that support evaluation, testing, and model improvement.

## Conclusion

Snorkel AI presents a mature approach to agent evaluation that acknowledges the limitations of trace-based analysis and provides a systematic alternative through simulation-based benchmarking. The methodology emphasizes company-specific benchmarks that mirror production environments, treat benchmarks as software artifacts with proper engineering practices, and integrate benchmark development into the continuous agent improvement lifecycle. While requiring significant engineering investment and careful maintenance, the approach addresses real challenges in deploying and improving AI agents at scale. The framework is particularly valuable for organizations moving beyond initial agent prototypes toward production deployment where reliability, cost optimization, and systematic improvement become critical concerns.
