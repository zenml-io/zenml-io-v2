---
title: "Production Evaluation and Data Foundations for Go-to-Market Agents"
slug: "production-evaluation-and-data-foundations-for-go-to-market-agents-3e9f8dff"
draft: false
llmopsTags:
  - "data-analysis"
  - "data-integration"
  - "classification"
  - "question-answering"
  - "structured-output"
  - "unstructured-data"
  - "poc"
  - "agent-based"
  - "evals"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "few-shot"
  - "langchain"
  - "databases"
  - "monitoring"
  - "orchestration"
  - "cicd"
  - "guardrails"
  - "reliability"
  - "scaling"
  - "scalability"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Clay"
summary: "Clay operates production go-to-market agents that research companies, use first-party and third-party data, find prospects, and build or analyze workflows. Claygent handles high-volume web and internal-data research, while Sculptor helps users construct workflows and perform longer-running search and data tasks. As usage grew to more than 300 million Claygent runs per month and over 100,000 weekly Sculptor messages, Clay developed a layered evaluation program spanning deterministic checks, structured assertions, LLM judges, multi-turn tests, online behavioral metrics, human review, and production-trace analysis. The company is also consolidating traces and operational data in a data lake with guarded agent access, separate development and serving compute, CLI/API tools, and shadow deployments. These measures are intended to make prompt and agent changes safer, although the company acknowledges that production drift, evaluator bias, and the reliability of self-improving loops remain unresolved risks."
link: "https://www.youtube.com/watch?v=Uny6LpmjraI"
year: 2023
seo:
  title: "Clay: Production Evaluation and Data Foundations for Go-to-Market Agents - ZenML LLMOps Database"
  description: "Clay operates production go-to-market agents that research companies, use first-party and third-party data, find prospects, and build or analyze workflows. Claygent handles high-volume web and internal-data research, while Sculptor helps users construct workflows and perform longer-running search and data tasks. As usage grew to more than 300 million Claygent runs per month and over 100,000 weekly Sculptor messages, Clay developed a layered evaluation program spanning deterministic checks, structured assertions, LLM judges, multi-turn tests, online behavioral metrics, human review, and production-trace analysis. The company is also consolidating traces and operational data in a data lake with guarded agent access, separate development and serving compute, CLI/API tools, and shadow deployments. These measures are intended to make prompt and agent changes safer, although the company acknowledges that production drift, evaluator bias, and the reliability of self-improving loops remain unresolved risks."
  canonical: "https://www.zenml.io/llmops-database/production-evaluation-and-data-foundations-for-go-to-market-agents-3e9f8dff"
  ogTitle: "Clay: Production Evaluation and Data Foundations for Go-to-Market Agents - ZenML LLMOps Database"
  ogDescription: "Clay operates production go-to-market agents that research companies, use first-party and third-party data, find prospects, and build or analyze workflows. Claygent handles high-volume web and internal-data research, while Sculptor helps users construct workflows and perform longer-running search and data tasks. As usage grew to more than 300 million Claygent runs per month and over 100,000 weekly Sculptor messages, Clay developed a layered evaluation program spanning deterministic checks, structured assertions, LLM judges, multi-turn tests, online behavioral metrics, human review, and production-trace analysis. The company is also consolidating traces and operational data in a data lake with guarded agent access, separate development and serving compute, CLI/API tools, and shadow deployments. These measures are intended to make prompt and agent changes safer, although the company acknowledges that production drift, evaluator bias, and the reliability of self-improving loops remain unresolved risks."
notion:
  pageId: "3e9f8dff-2538-8067-90aa-e13e2240336e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:17:00.000Z"
  lastEditedTime: "2026-09-28T08:17:00.000Z"
  publishedAt: "2026-09-28T08:24:31Z"
---

## Overview

Clay is building a production platform for go-to-market work in which agents research companies, qualify prospects, search a company and contact database, construct workflows, and analyze business data. Its principal agents have different responsibilities: Claygent is focused on research, including public-web search and access to internal datasets, while Sculptor is a go-to-market engineering agent that builds and orchestrates workflows and is increasingly a primary interface for using Clay. The production challenge is not simply generating a useful answer once; it is making long-running, tool-using agents dependable across a very large and changing set of customer tasks.

Clay reports more than 300 million Claygent runs per month and more than 100,000 messages to Sculptor each week. At that scale, engineers cannot inspect every trace or rely on informal conversations with individual users to identify regressions. The company has therefore made evaluation a central part of its agent-development process, connecting local tests, CI and staging checks, production telemetry, support feedback, human review, and a broader data platform. The approach provides useful safeguards for iterative development, but the reported usage figures are scale indicators rather than independent evidence that every workflow is accurate or that the agents consistently deliver business value.

## Production Use Case and Architecture

Claygent performs web research and can search first-party data supplied by a customer. Its high execution volume creates a large trace stream and makes exhaustive manual review impractical. Sculptor operates at a more involved level: it can help users build workflows, analyze data, and perform search-oriented tasks using Clay’s companies and contacts database. These tasks may require multiple tool calls, intermediate decisions, and extended execution rather than a single model response. Consequently, evaluation must consider both the final result and the path the agent took to produce it.

Clay is also making its product capabilities available through a command-line interface and public API, with the stated goal that actions available in the web interface should also be accessible to agents. Sculptor uses the same tools exposed to external agents. This shared-tool strategy creates a feedback loop: failures in tool invocation or agent trajectories can reveal whether the problem is in the agent harness, the underlying tool, or the interface between them. Improving those components can benefit both internal agents and external users, although shared tools also create a common failure surface that needs consistent compatibility and access controls.

The longer-term data architecture is moving toward a data lake that combines first-party and third-party data, including operational traces and analytics previously distributed across systems such as LangChain, Snowflake, Postgres, and ClickHouse. The intended design treats agents as first-class users of the data platform. Agents can use skills and CLI capabilities to work with the unified data foundation, build data models in a controlled environment, and run larger analyses. The system separates development and serving compute so experiments do not directly consume or destabilize production resources. Clay also describes guarded shadow builds in which agents can create and deploy new data models on S3 before those changes are treated as production serving paths.

## Evaluation Strategy

Clay’s evaluation program is deliberately layered. Local evaluations are designed to be inexpensive and fast enough for command-line development. CI and staging evaluations are intended to resemble the production harness as closely as possible, including the relevant runtime capabilities. This distinction is practical: a lightweight local test can provide rapid feedback, while a staging test must expose failures that only appear when the agent has its real tools, virtual file system, or other production-like dependencies.

Evaluations are versioned and persisted rather than treated as ephemeral experiments. Clay uses LangChain to store evaluation results and is developing reusable harnesses that can span different parts of the product. A new product area can supply its own test cases and evaluators, including custom LLM judges, while reusing the surrounding execution and reporting infrastructure. This supports a common quality process without requiring every product team to rebuild the entire harness.

The evaluation coverage includes several complementary classes:

- Deterministic offline tests use goldens for simple behavior and structured checks for outputs whose exact formatting should not matter. For example, a query can be checked for required semantic components without failing merely because keywords or nodes appear in a different order. This reduces the risk that noisy, overly rigid tests will be ignored by developers.
- Trajectory and tool assertions check whether an agent used the appropriate evidence or tool. If an agent answers a pricing question, the evaluation can assert that it actually read the pricing source instead of producing an unsupported answer.
- LLM-as-a-judge evaluations handle cases where correctness is difficult to encode with exact rules. These tests provide broader qualitative coverage but introduce judge-model bias and require calibration.
- Multi-turn evaluations exercise conversations and longer tasks. Clay found deterministic scripted user turns more useful in its development process than a simulated user controlled by another agent. The simulated approach can resemble real interaction, but it adds another noisy system that must itself be maintained and evaluated.
- Objective online metrics include latency and cost, along with product behavior such as whether users move from chat into other product surfaces, become stuck, or abandon the interaction.
- Online evaluators use signals such as user satisfaction or NPS-like feedback and evidence that users are correcting, challenging, or redirecting the agent. Production traces are analyzed in bulk with LangChain facilities, and humans manually inspect selected traces.

This combination avoids treating any single metric as a complete definition of quality. Exact tests are repeatable but narrow; LLM judges cover more nuanced behavior but may be inconsistent; user behavior is valuable but can be ambiguous; and manual review is informative but expensive. The stated purpose is to let automated coding and agent-development systems make prompt or implementation changes while the evaluation suite catches changes likely to harm production.

## Feedback Loops and Drift Management

A particularly important part of the design is the feedback path from production back into offline evaluation. Clay is incorporating examples from online evaluators, high-signal customer-support tickets, human-annotated goldens, use-case classifiers, and use-case tagging. These sources are intended to keep the test set aligned with what customers actually do rather than only with scenarios selected during internal development and bug bashing.

The company identifies several unresolved drift modes. Data drift occurs when production tasks differ from the use cases covered in the test suite. Judge drift occurs when a model or model family has biases that cause optimization toward its preferences rather than toward customer outcomes. Evaluation-set overfitting can also cause prompts or agent behavior to mirror a small collection of examples without generalizing. These risks mean that a rising internal score should not automatically be interpreted as improved production quality. Diverse test sources, periodic human review, multiple evaluation methods, and monitoring for changes in task distribution are necessary counterweights, though the material does not claim that Clay has solved these problems.

## Results and Tradeoffs

The concrete results described are adoption and operating scale: Claygent runs at more than 300 million executions per month, and Sculptor receives more than 100,000 messages per week. Sculptor has moved from a new product toward a primary way users interact with Clay, increasing the need for reliable end-to-end behavior. Clay also reports that newer large-context models, sub-agents, and goal-oriented harnesses make it more practical to analyze thousands of examples and automate longer-running data tasks. These claims indicate increased operational ambition and a more mature evaluation process, but no accuracy, latency improvement, cost reduction, or customer-retention measurement is supplied, so the business impact cannot be quantified from the available evidence.

The architecture has several advantages. Versioned evaluations make changes reproducible; production-like staging reduces environment mismatch; structured assertions reduce false failures; online signals expose problems that offline tests miss; and common API, CLI, and agent tools can create useful learning loops. The data-lake direction may also simplify analysis by bringing traces, product analytics, and first-party data into a common platform.

There are corresponding costs and risks. Running evaluations across long-running agents can be expensive, and LLM judges add both latency and uncertainty. Deterministic multi-turn tests are easier to control but may omit realistic user behavior. Giving agents broad access to unified data and the ability to create models or run large computations requires strong permissions, isolation, auditing, and resource controls; the described guardrails and separated compute address some of this but do not establish complete governance. Finally, a self-iterating loop can amplify flawed labels, biased judges, or misleading user signals. Clay’s approach is best understood as an evolving LLMOps control system for high-volume agent products, not as proof that autonomous go-to-market workflows are uniformly reliable.
