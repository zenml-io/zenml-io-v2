---
title: "Building an Evaluation-First Development Strategy for AI Service Agents"
slug: "building-an-evaluation-first-development-strategy-for-ai-service-agents"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "699c0b4add3214d2c0cd4565"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-23T08:21:17.776Z"
  lastUpdated: "2026-02-23T08:21:17.776Z"
  createdOn: "2026-02-23T08:09:46.188Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "question-answering"
  - "chatbot"
  - "high-stakes-application"
  - "rag"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "human-in-the-loop"
  - "error-handling"
  - "semantic-search"
  - "langchain"
  - "cicd"
  - "devops"
  - "continuous-integration"
  - "continuous-deployment"
  - "documentation"
  - "monitoring"
  - "orchestration"
  - "open-source"
  - "postgresql"
  - "microsoft-azure"
  - "openai"
industryTags: "tech"
company: "Monday"
summary: "Monday Service built an AI-native Enterprise Service Management platform featuring customizable, role-based AI agents to automate customer service across IT, HR, and Legal departments. The team embedded evaluation into their development cycle from Day 0, creating a dual-layered approach with offline \"safety net\" evaluations for regression testing and online \"monitor\" evaluations for real-time production quality. This eval-driven development framework, built on LangGraph agents with LangSmith and Vitest integration, achieved 8.7x faster evaluation feedback loops (from 162 seconds to 18 seconds), comprehensive testing across hundreds of examples in minutes, real-time end-to-end quality monitoring on production traces using multi-turn evaluators, and GitOps-style CI/CD deployment with evaluations managed as version-controlled code."
link: "https://blog.langchain.com/customers-monday/"
year: 2026
---

## Overview

Monday Service developed an AI-native Enterprise Service Management (ESM) platform designed to automate and resolve inquiries across service departments including IT, HR, and Legal. The core innovation is their "AI service workforce"—a collection of customizable, role-based AI agents built to handle the ticket load previously managed by human representatives. Rather than treating evaluation as an afterthought or last-mile quality check, the Monday team made a strategic decision to embed evaluations into their development cycle from Day 0, creating what they describe as an "evals-driven development framework."

The use case centers on LangGraph-based ReAct agents that are highly autonomous and designed to handle complex, multi-step reasoning chains. This autonomy introduces a significant LLMOps challenge: because each step in the reasoning chain depends on the previous one, even minor deviations in prompts or tool-call results can cascade into substantially different—and potentially incorrect—outcomes. The team recognized early that traditional software testing approaches would be insufficient for managing this type of non-deterministic, multi-turn agent behavior in production.

## The Dual-Layered Evaluation Architecture

Through research into agent evaluation best practices, the Monday team developed a two-pillar approach that addresses different aspects of AI quality assurance:

### Pillar A: Offline Evaluations - "The Safety Net"

The offline evaluation layer functions similarly to unit testing in traditional software development. It runs the agent against curated "golden datasets" to verify both core logic and specific edge cases. This layer is designed to ensure that prompt tweaks or code changes don't inadvertently break the agent's ability to handle various tasks that previously worked correctly.

The team started with a practical, incremental approach to building their evaluation coverage. Rather than attempting to design a perfect coverage strategy upfront, they constructed a small dataset of approximately 30 real, sanitized IT tickets from their internal help desk. These tickets covered common request categories including access and identity management (IDP, SSO, software access), VPN and connectivity issues, and device/OS support (updates, performance, hardware issues).

For their initial evaluation suite, the team implemented intentionally simple checks. These included deterministic "smoke" checks covering runtime health (ensuring the agent ran without crashes or timeouts), output shape validation (confirming responses matched expected schema/format), state and persistence verification (thread/session creation and proper database persistence), and basic tool sanity checks (confirming necessary tools were invoked with appropriate inputs and completed without errors). They also incorporated an LLM-as-judge approach, starting with an off-the-shelf evaluator from OpenEvals (Correctness) that compared agent responses to reference outputs from the same resolved-ticket dataset.

Once this baseline was established, the team expanded with smaller, use-case-specific datasets to probe more nuanced behaviors. As these behaviors became more complex, they moved from a single correctness score to a comprehensive set of checks including KB grounding and citations (verifying every factual claim traces back to provided knowledge base content using LangSmith's prebuilt hallucination and answer relevance checks), conflict handling (ensuring the agent asks for clarification or picks the latest applicable policy when policies vary by region or time), guardrails (verifying the agent refuses when required and avoids revealing internal tool names or prompt content using prebuilt toxicity and conciseness checks), KB usage timing (ensuring the knowledge base is fetched at a reasonable point in the conversation flow using AgentEvals' Trajectory LLM-as-judge), and guardrail ordering (confirming safety/policy guardrails run at the right stage before producing final answers, also using trajectory checks).

### Implementation Framework: LangSmith + Vitest

To implement the offline evaluation layer, Monday utilized the LangSmith Vitest integration. This approach provides the power of a battle-tested testing framework (Vitest) while maintaining seamless integration with the LangSmith ecosystem. With this setup, every CI run is automatically logged as a distinct experiment in the LangSmith platform, and each test suite functions as a dataset. This visibility allows the team to drill down into specific runs and see exactly where the agent diverged from ground truth, making it straightforward to verify the impact of code changes before they reach production.

### The Performance Bottleneck and Solution

Initially, the offline evaluations ran serially, creating a major bottleneck in the development loop. The standard cycle of eval (fail) → fix → re-eval (pass) became time-consuming enough that it threatened to compromise either testing depth or development pace. The team recognized that sustaining high-velocity shipping without regressions required evaluation processes fast enough to ensure a frictionless iteration loop.

The solution involved optimizing their Vitest and LangSmith integration to achieve massive speed increases by distributing load across local workers and remote API calls. The key was a hybrid approach that parallelized test files to maximize CPU usage while running LLM evaluations concurrently to handle I/O-bound latency.

For CPU-bound parallelism, they leveraged Vitest's pool:'forks' to distribute workload across multiple cores. By assigning each dataset shard to a separate test file, multiple worker processes could run in parallel without competing for CPU. This setup ensured that even as datasets grew, they could be processed quickly by distributing shards across available cores.

For I/O-bound concurrency, they used ls.describe.concurrent within each test file to maximize throughput. Since LLM evaluations have high latency, concurrency allowed them to overlap the latency by firing off dozens of evaluations simultaneously, ensuring the test runner never sat idle.

The core evaluation function implements a two-tiered validation in a single pass: deterministic baseline checks with hard assertions to ensure the agent adheres to response schema and maintains state persistence (via checkpointer/storage), and LLM-as-a-judge semantic grading against the golden dataset using open-source libraries like OpenEvals and AgentEvals to score dimensions like correctness and groundedness.

The results were impressive. Benchmarking on a MacBook Pro 16-inch with Apple M3 Pro and 36 GB RAM showed that parallel + concurrent execution completed in 18.60 seconds (8.7x faster than sequential), concurrent-only execution took 39.30 seconds (4.1x faster), and sequential execution took 162.35 seconds as the baseline. This enabled comprehensive feedback over hundreds of examples in minutes rather than hours.

### Pillar B: Online Evaluations - "The Monitor"

While offline evaluations catch regressions in controlled sandboxes, they are essentially static snapshots of synthetic or sanitized examples. To capture the unpredictability of production, Monday needed online evaluations running on real production traces in real-time.

Since their agents handle complex, multi-turn dialogues, success is often not defined by a single response but by the entire conversation trajectory. This required an evaluation strategy accounting for how the agent guides users toward resolution over several turns. The team found a fit in LangSmith's Multi-Turn Evaluator, which leverages LLM-as-a-judge to score end-to-end threads. Instead of evaluating individual runs in isolation, they could use custom prompts to grade entire conversation trajectories, measuring high-level outcomes like user satisfaction, tone, and goal resolution.

The LangSmith platform made the multi-turn setup intuitive, allowing them to define custom inactivity windows to pinpoint exactly when a session should be considered "complete" and ready for evaluation, and easily apply sampling rates to balance data volume with LLM costs.

### Evaluations as Code (EaC)

As Monday moved from prototype to production, they wanted to manage their "judges" (evaluation prompts) with the same standards applied to production code: version control, peer reviews, and automated CI/CD pipelines. To achieve this, they moved the source of truth into their repository, defining judges as structured TypeScript objects.

This approach unlocked two critical capabilities. First, they could leverage AI IDEs like Cursor and Claude Code to refine complex prompts directly within their primary workspace. Second, it felt natural to write offline evaluations for their judges to ensure accuracy before they touched production traffic. The migration was facilitated by LangChain's IDE integrations, including the Documentation MCP for pulling library context into the editor and the LangSmith MCP for fetching runs and feedback directly.

### Deployment Pipeline

To close the loop, Monday built a custom CLI command (yarn eval deploy) that runs in their CI/CD pipeline, ensuring their repository remains the absolute source of truth for evaluation infrastructure. When they merge a PR, their synchronization engine performs a three-step reconciliation loop: syncing prompts (pushing TypeScript definitions to the LangSmith Prompt Registry), reconciling rules (comparing local evaluation definitions against active production ones and updating or creating them automatically), and pruning (identifying and deleting "zombie" evaluations/prompts from the LangSmith platform if they're no longer present in the codebase).

## Critical LLMOps Considerations and Tradeoffs

While this case study presents an impressive implementation of evaluation-driven development, it's worth considering some of the inherent tradeoffs and challenges that may not be fully explored in the promotional content.

The reliance on LLM-as-judge evaluations introduces its own quality control challenges. The team is essentially using LLMs to evaluate LLMs, which means their evaluation quality is bounded by the capabilities and potential biases of the judge models. While they mention writing "offline evaluations for our judges," the depth and coverage of these meta-evaluations isn't detailed. There's a risk of creating a recursive quality problem where unreliable judges give false confidence in agent performance.

The 8.7x speed improvement is impressive, but it's achieved through aggressive parallelization and concurrency that likely incurs significant infrastructure and API costs. Running dozens of LLM evaluations concurrently for hundreds of examples means substantial token consumption. The case study doesn't discuss the cost implications of this approach or how they balance evaluation thoroughness against operational expenses, particularly for the online multi-turn evaluations running on production traffic.

The team's approach of starting with ~30 sanitized IT tickets as their golden dataset raises questions about coverage and representativeness. While they mention expanding with "smaller, use-case-specific datasets," production service management encompasses enormous variability in user queries, edge cases, and failure modes. It's unclear how they ensure their evaluation datasets remain representative as the product evolves and encounters new types of production traffic.

The evaluations-as-code approach with GitOps-style deployment is architecturally sound, but it creates tight coupling to the LangSmith ecosystem. The custom synchronization engine with its three-step reconciliation loop adds operational complexity and potential failure modes. If the reconciliation process has bugs or the LangSmith API changes, there's risk of evaluation drift or orphaned configurations.

The multi-turn evaluation strategy is well-suited for conversational agents, but defining when a session is "complete" based on "custom inactivity windows" is inherently heuristic. Real customer service interactions don't always follow tidy patterns—users may abandon conversations, return hours later, or have multiple interleaved issues. The case study doesn't discuss how they handle these ambiguous cases or what percentage of production conversations fit cleanly into their evaluation framework.

Finally, while the team mentions tracking business signals like "Automated Resolution and Containment rates," the connection between their technical evaluation metrics (groundedness, correctness, trajectory checks) and actual business outcomes isn't thoroughly explored. High scores on LLM-as-judge evaluations don't necessarily translate to customer satisfaction or reduced support costs. The case study would benefit from more discussion of how they validate that their evaluation framework actually correlates with real-world success.

Despite these considerations, Monday's approach represents a sophisticated and thoughtful implementation of evaluation-driven development for production AI agents. Their dual-layered evaluation strategy, combining offline regression testing with online production monitoring, addresses real challenges in deploying autonomous agents at scale. The investment in developer experience through parallelization and the infrastructure-as-code approach demonstrates mature LLMOps practices that many teams could learn from, even if they might implement them differently based on their own constraints and ecosystem choices.