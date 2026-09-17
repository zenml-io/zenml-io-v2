---
title: "Running Agent Evaluations Against Real Staging Dependencies"
slug: "running-agent-evaluations-against-real-staging-dependencies"
draft: false
llmopsTags:
  - "chatbot"
  - "structured-output"
  - "evals"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "error-handling"
  - "cost-optimization"
  - "kubernetes"
  - "microservices"
  - "monitoring"
  - "databases"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
industryTags: "tech"
company: "Monday"
summary: "Monday built an evaluation platform for its AI products that tests agents against a real, isolated pre-production environment rather than relying solely on mocks. The approach connects locally executed or CI-run agent code to Monday’s Kubernetes-based staging services, allowing evaluations to exercise authentication, permissions, databases, integrations, queues, and other production-like dependencies without deploying a new agent version. Monday combines deterministic checks, LLM-as-a-judge assessments, offline datasets, online production-trace evaluations, and CI gating to measure goal completion, correctness, tool selection, trajectory, groundedness, and scope adherence. The company reports faster developer iteration and substantially lower environment-maintenance overhead, while acknowledging tradeoffs around staging isolation, evaluator reliability, sanitized data, and the need to build confidence in semantic scores."
link: "https://www.youtube.com/watch?v=CmKoAEHKQW0"
year: 2026
seo:
  title: "Monday: Running Agent Evaluations Against Real Staging Dependencies - ZenML LLMOps Database"
  description: "Monday built an evaluation platform for its AI products that tests agents against a real, isolated pre-production environment rather than relying solely on mocks. The approach connects locally executed or CI-run agent code to Monday’s Kubernetes-based staging services, allowing evaluations to exercise authentication, permissions, databases, integrations, queues, and other production-like dependencies without deploying a new agent version. Monday combines deterministic checks, LLM-as-a-judge assessments, offline datasets, online production-trace evaluations, and CI gating to measure goal completion, correctness, tool selection, trajectory, groundedness, and scope adherence. The company reports faster developer iteration and substantially lower environment-maintenance overhead, while acknowledging tradeoffs around staging isolation, evaluator reliability, sanitized data, and the need to build confidence in semantic scores."
  canonical: "https://www.zenml.io/llmops-database/running-agent-evaluations-against-real-staging-dependencies"
  ogTitle: "Monday: Running Agent Evaluations Against Real Staging Dependencies - ZenML LLMOps Database"
  ogDescription: "Monday built an evaluation platform for its AI products that tests agents against a real, isolated pre-production environment rather than relying solely on mocks. The approach connects locally executed or CI-run agent code to Monday’s Kubernetes-based staging services, allowing evaluations to exercise authentication, permissions, databases, integrations, queues, and other production-like dependencies without deploying a new agent version. Monday combines deterministic checks, LLM-as-a-judge assessments, offline datasets, online production-trace evaluations, and CI gating to measure goal completion, correctness, tool selection, trajectory, groundedness, and scope adherence. The company reports faster developer iteration and substantially lower environment-maintenance overhead, while acknowledging tradeoffs around staging isolation, evaluator reliability, sanitized data, and the need to build confidence in semantic scores."
notion:
  pageId: "3ddf8dff-2538-80c1-9a9e-c9841d219f67"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-16T19:50:00.000Z"
  lastEditedTime: "2026-09-16T19:51:00.000Z"
  publishedAt: "2026-09-16T19:52:45Z"
---

## Overview

Monday operates a broad portfolio of AI products inside a large work-management platform, including user-defined agents, AI workflows, app-building capabilities, Sidekick, and AI blocks. These products run alongside hundreds of builders, more than 700 microservices, customer data, permissions, authentication, feature flags, internal APIs, and third-party integrations. The central LLMOps problem is therefore not simply whether a language model produces a plausible answer. An agent must complete the user’s goal through the correct tools, operate within its permissions, process all relevant records, preserve state across downstream actions, and remain grounded in the available evidence.

Monday’s solution is to evaluate agent changes against a real pre-production or staging environment. Developers can run locally changed agent code, or execute it in CI, while routing its dependencies to an existing Kubernetes-based staging cluster. The approach avoids deploying a separate agent version for every evaluation, yet exposes the code to realistic services, data shapes, authentication, permissions, queues, databases, and integrations. Monday combines this execution model with curated offline datasets, production-trace-based online evaluations, deterministic assertions, semantic judges, experiment tracking, and optional CI gates. The evidence presented suggests meaningful improvements in iteration speed and infrastructure cost, although the results are primarily operational claims rather than independently verified benchmarks.

## Problem and Production Context

Monday describes an agent as a system rather than an isolated LLM call. A test begins with a user task, after which the agent selects tools, invokes underlying services, processes returned information, and produces an outcome. Each part can change independently: the model, system prompt, agent code, tool definitions, configuration, dependency behavior, or data. A final response that sounds correct can conceal a production failure.

One example involved an agent asked to process approximately 600 items. The individual tool calls worked and the final answer appeared confident, but the agent processed only about 500 items. A check limited to the textual answer could have passed this run, while a goal-completion or completeness check should identify it as a failure. Monday also evaluates whether an agent selected the required tools, followed instructions, stayed within scope and permissions, collected necessary information, and made claims supported by available evidence.

The platform serves more than two million users and over 250,000 accounts, according to the case study. The exact scale makes isolated local replicas difficult: agent behavior depends on existing product logic and enterprise controls, not only on model inference. A local environment previously required developers to run a very large collection of services and databases. Monday reports that maintaining this environment involved more than 100,000 vCPUs in aggregate across the setup, roughly 30 minutes of daily developer maintenance, and approximately $500 per developer per month. These figures are company-reported and are presented as context for the decision to reuse staging rather than as an audited cost analysis.

## Real Dependencies Instead of Mocks

Mocks remain useful for focused unit or component tests, but Monday found them insufficient for broad agent behavior. Mock-based evaluations can drift from production service contracts, fail to represent the scale and messiness of real data, and omit stateful downstream effects. They also tend to hide interactions among authentication, tenant isolation, feature flags, workspace context, permissions, internal services, and third-party integrations.

The preferred offline setup runs away from production but remains connected to realistic pre-production dependencies. This distinction is important: “offline” refers to the evaluation workflow and its controlled test data, not necessarily to a disconnected or fully simulated execution environment. Staging already contains much of the service topology and enterprise behavior required by the agents. Monday can therefore test a changed agent against those dependencies without creating and maintaining a separate complete environment for each repository or evaluation run.

The connectivity layer described in the case study allows a process running on a developer machine, CI runner, or evaluation runner to behave as though it were deployed in the cluster. It provides access to cluster-side services, environment variables, secrets, and data, while supporting multiple concurrent sessions without collisions. The existing command can be wrapped rather than rewritten; the demonstration uses a command conceptually similar to `mir exec --config ... npm run evals`. The same general mechanism is used from CI, where an evaluation command can be added as a GitHub Actions step.

This design reduces deployment and iteration latency, but it is not free of operational concerns. A shared staging environment needs tenant and session isolation, appropriate access controls, stable test data, capacity management, and safeguards against destructive actions. The case study states that Monday uses staging isolation, but it does not provide detailed concurrency limits, rollback procedures, or failure-containment measurements. Those would be important for teams adopting the pattern at similar scale.

## Evaluation Design

Monday maintains datasets containing tasks and expected behavior for each AI product. Dataset construction involves domain subject-matter expertise: teams decide which use cases matter, what the agent must accomplish, and which behaviors are unacceptable. The evaluation infrastructure supports both small focused tests and complex end-to-end workflows, such as creating work artifacts, retrieving data, and interacting with external integrations.

The evaluation signals are intentionally mixed. Deterministic checks cover properties that can be asserted directly, including whether all items were processed, whether required tools were called, whether the output has the expected structure, whether a threshold was met, and whether the agent stayed within defined operational boundaries. Semantic properties are evaluated with an LLM judge, including whether the agent understood the goal, whether the response is complete, whether the answer is correct despite nondeterministic wording, and whether claims are grounded in the evidence available to the agent.

The system reports several dimensions rather than one undifferentiated score. Examples include goal completion, agent correctness, tool precision, trajectory quality, completeness, groundedness, latency, and possible tool-loop behavior. Product teams can add custom evaluators and metrics on top of common infrastructure. This is appropriate because “good” differs across Monday’s products: an app-building agent, a workflow agent, and a user-defined general-purpose agent do not share identical success criteria.

The case study gives a model-upgrade example in which an existing model configuration was compared with a newer model version. The agent was executed on the same cases and the results were compared across deterministic and semantic dimensions. In the demonstration, the newer model produced roughly a ten-percentage-point decline in goal completion and a similar decline in agent correctness. The evaluation exposed the regression before release and provided information about tool calls, tokens, and failing cases. The figures are reported as an illustrative run, not as a general benchmark for the model.

## Offline and Online Feedback Loops

Offline evaluations run controlled tasks against sanitized or synthetic data in the pre-production environment. They can be launched from developer tooling, an internal conversational interface, or the continuous integration process. A run can cover all cases, a selected case, or a category relevant to the change. Results are sent to an experiment and observability system where teams can inspect inputs, reference outputs, actual outputs, per-metric scores, and failure details.

Monday also evaluates production traces through an online evaluation track. These evaluations measure real prompts and user behavior, which contain more variation than curated offline cases. Repeated or important production failure modes can be converted into new offline test cases, creating a feedback loop between observed usage and regression testing. This is a strong LLMOps practice because the offline suite evolves from real behavior rather than remaining a static collection of synthetic examples.

The company uses different evaluation modes in pull requests, including observe-only and blocking behavior depending on the product and severity of the change. This allows teams to introduce semantic checks before treating them as release gates. Product managers and other “builders” can experiment with prompts or model choices through internal tooling, while engineers remain involved when changes affect more complex system behavior. The combination of self-service evaluation and CI enforcement aims to shorten the path from an idea to evidence-backed release decisions.

## Safety, Data, and Resilience

Monday describes an AI gateway that applies protections to prompts and traces in both production and development workflows. These include masking personally identifiable information and security checks such as prompt-injection investigation. Offline datasets are sanitized and intended not to contain customer data, which is especially important when testing preview models or sharing evaluation artifacts across teams.

The architecture also supports chaos testing for degraded dependencies. Failures can be injected at the evaluation-session level so an agent’s handling of service degradation can be tested without intentionally breaking the shared environment for other users. This enables tests of resilience, although the material does not specify which failure modes, recovery objectives, or business-impact scenarios are covered.

## Results and Tradeoffs

Monday reports that moving from local replicas to staging-connected execution reduced developer setup and iteration from hours to minutes. Because the organization already operated a staging environment, the incremental infrastructure cost was described as low compared with maintaining a complete local environment per developer. The company also avoided an estimated month of work that would have been needed to create dedicated evaluation environments for repositories or accounts, choosing instead to reuse existing staging capabilities and add the connectivity layer.

The approach improves production fidelity, but realistic dependencies introduce complexity that mocks avoid. Tests may be slower, shared staging can become a bottleneck, and nondeterministic service responses can make results harder to reproduce. LLM judges can also be inconsistent or overconfident, so evaluator quality, calibration, reference examples, and human review matter. Monday explicitly identified developer skepticism about semantic scores as an adoption barrier and added manual verification of automatic outputs to increase confidence.

Overall, the case demonstrates a pragmatic LLMOps architecture: retain inexpensive deterministic unit tests, add end-to-end agent evaluations against real pre-production dependencies, track semantic and operational metrics, feed production failures back into offline datasets, and gradually promote useful checks into CI gates. Its strongest lesson is that agent quality cannot be assessed reliably from the final response alone. Its main limitation is that the reported benefits and evaluation scores come from the operating company, with limited detail on statistical significance, false-positive rates, evaluator agreement, staging isolation guarantees, or long-term maintenance costs.
