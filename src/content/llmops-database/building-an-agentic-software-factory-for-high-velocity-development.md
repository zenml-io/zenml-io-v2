---
title: "Building an Agentic Software Factory for High-Velocity Development"
slug: "building-an-agentic-software-factory-for-high-velocity-development"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "classification"
  - "data-analysis"
  - "realtime-application"
  - "high-stakes-application"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "evals"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "devops"
  - "monitoring"
  - "reliability"
  - "scalability"
  - "documentation"
  - "orchestration"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI has reorganized much of its internal software development and knowledge work around Codex and ChatGPT Work, using long-running coding agents, role-specific skills, broad enterprise context, automated testing, agentic code review, monitored deployment, performance analysis, and incident-response assistance. The reported result is rapid adoption across engineering and non-engineering teams, substantially higher software-development throughput, and new feedback loops from production back into development. However, the account is largely based on internal interviews and company-reported observations rather than independently validated measurements; the same automation has created roughly 10x load on some development systems, raised questions about pull requests and human review, and has not eliminated the need for human approval, operational expertise, or on-call engineers."
link: "https://newsletter.pragmaticengineer.com/p/openai-software-factory"
year: 2026
seo:
  title: "OpenAI: Building an Agentic Software Factory for High-Velocity Development - ZenML LLMOps Database"
  description: "OpenAI has reorganized much of its internal software development and knowledge work around Codex and ChatGPT Work, using long-running coding agents, role-specific skills, broad enterprise context, automated testing, agentic code review, monitored deployment, performance analysis, and incident-response assistance. The reported result is rapid adoption across engineering and non-engineering teams, substantially higher software-development throughput, and new feedback loops from production back into development. However, the account is largely based on internal interviews and company-reported observations rather than independently validated measurements; the same automation has created roughly 10x load on some development systems, raised questions about pull requests and human review, and has not eliminated the need for human approval, operational expertise, or on-call engineers."
  canonical: "https://www.zenml.io/llmops-database/building-an-agentic-software-factory-for-high-velocity-development"
  ogTitle: "OpenAI: Building an Agentic Software Factory for High-Velocity Development - ZenML LLMOps Database"
  ogDescription: "OpenAI has reorganized much of its internal software development and knowledge work around Codex and ChatGPT Work, using long-running coding agents, role-specific skills, broad enterprise context, automated testing, agentic code review, monitored deployment, performance analysis, and incident-response assistance. The reported result is rapid adoption across engineering and non-engineering teams, substantially higher software-development throughput, and new feedback loops from production back into development. However, the account is largely based on internal interviews and company-reported observations rather than independently validated measurements; the same automation has created roughly 10x load on some development systems, raised questions about pull requests and human review, and has not eliminated the need for human approval, operational expertise, or on-call engineers."
notion:
  pageId: "3ddf8dff-2538-8071-a8d5-f83fd2afbed3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-16T12:05:00.000Z"
  lastEditedTime: "2026-09-16T12:05:00.000Z"
  publishedAt: "2026-09-16T19:52:25Z"
---

## Overview

OpenAI is using its own Codex coding-agent platform, together with ChatGPT Work, as a shared operating layer for software development and a growing amount of non-engineering work. The reported system goes beyond code completion: a human specifies an outcome, an agent gathers organizational context, changes code, runs tests, responds to CI failures, coordinates specialized reviews, supports deployment, builds monitoring dashboards, observes production behavior, and feeds detected regressions back into subsequent engineering work. The same harness is also used for internal productivity workflows such as research, document creation, spreadsheets, onboarding material, and integrations with company systems.

The case is notable because OpenAI describes the result as an “agentic software factory” rather than a single AI feature. Internal adoption reportedly rose rapidly after the Codex desktop application and ChatGPT Work became available, with non-engineering teams reaching approximately 90% weekly usage according to the source. Engineering throughput and pull-request volume also increased sharply, creating roughly 10x load on some development-infrastructure systems over approximately six months. These results are compelling but should be treated as company-reported evidence from an interview-based account, not as an independently controlled productivity study. The increased throughput has exposed new bottlenecks in CI/CD, code review, mobile release processes, CPU capacity, and operational oversight.

## Use case and adoption

OpenAI’s internal Codex deployment is described as more capable than the externally available product because it is connected to the company’s repositories, documentation, communications, observability systems, data platforms, and internal skills. The system is used by engineering, finance, recruiting, legal, marketing, and other groups. Adoption was initially surprising because the early desktop experience was oriented toward developers and displayed code directly, yet nontechnical employees used it for complex, multi-step work. Longer-running threads and a goal-setting capability appear to have been important adoption drivers: users can provide an objective and allow the agent to continue working for extended periods, sometimes for days, while delegating subtasks to additional agents.

The account also emphasizes an awareness gap. Employees often discover new workflows through colleagues rather than through formal training. Team-specific plugins and skills make the general-purpose system more useful by packaging role-specific processes and instructions. Additional capabilities, such as browser access, can be combined with these skills when a workflow requires interaction with external or internal applications. This approach illustrates a practical LLMOps pattern: adoption depends not only on model quality, but also on the harness, integrations, workflow abstractions, access controls, and examples that help users translate model capability into repeatable work.

OpenAI also embeds subject-matter experts with teams building ChatGPT Work. These experts help define what constitutes a good presentation, spreadsheet, report, or other artifact in a particular domain. This is a form of human evaluation and product-quality calibration. It acknowledges that a model may generate technically plausible output while still missing organizational standards, domain-specific taste, or the intended audience’s needs.

## Agentic software-factory architecture

The reported workflow starts with a human builder—an engineer or product manager—defining the desired outcome. Human judgment, prioritization, and specification remain central. The system then gives Codex access to source code and documentation, Git repositories and GitHub, Slack, Notion, Databricks, Datadog, internal logs, and internally maintained skills. OpenAI has reportedly moved documentation into source-code repositories to make it easier for agents to retrieve relevant context. New employees are directed to ask Codex questions during onboarding because the agent has access to a substantial amount of institutional knowledge.

After gathering context, Codex implements changes, builds the software, runs tests, and fixes failures. It creates or updates a pull request, while CI executes more comprehensive linters and tests. The agent can monitor the pull request, interpret CI feedback, revise the change, and continue until the checks are successful. This is an important distinction from simple code generation: the agent is embedded in a feedback loop involving execution, test results, repository state, and iterative correction.

A performance harness extends the loop beyond functional correctness. Problematic pull requests can be evaluated through a synthetic A/B framework to assess performance implications. The source describes a “Perf Factory” that monitors production alerts and dashboards, deduplicates signals, identifies likely latency regressions, investigates root causes, and proposes fixes. In effect, production behavior becomes an input to the development pipeline rather than an isolated operational concern.

## Agentic review and deployment

Instead of relying on one generic code-review agent, OpenAI reportedly launches multiple agents configured as domain specialists. Examples include agents focused on cloud infrastructure or security-related concerns. The value of specialization is not simply the label in the prompt; it depends on the context available to the agent, the relevant documentation, the scope of the review, and the instructions that focus its limited context on a particular risk area. The source itself is appropriately skeptical that a nominally specialized agent will necessarily produce a meaningfully different review unless these supporting conditions are present.

Changes are classified by risk. Higher-risk changes can receive additional automated reviews or mandatory human approval, while lower-risk changes may qualify for more automated handling, including auto-approval in selected areas. This is a risk-based governance model for LLM-assisted delivery. It attempts to preserve stronger controls where failures would be costly while removing human approval as a universal bottleneck for routine changes. The agents also continue responding to review comments and updating the pull request, turning review into an iterative machine-assisted process rather than a one-time recommendation.

Once a human approves a change, a separate deployment agent can be assigned responsibility for safely taking it to production. The agent is expected to understand the change, identify relevant success and failure signals, monitor feature-flagged or directly deployed behavior, and construct a dashboard for the particular rollout. This resembles a per-change autonomous SRE, although the source describes it as a long-term goal rather than a fully autonomous capability already operating without restrictions. The deployment workflow still includes a human approval gate, and the account does not claim that all production changes are automatically executed or universally safe.

## Observability, incidents, and feedback loops

Observability is treated as part of the agent workflow. OpenAI’s internal stack includes logs, metrics, traces, and wide-event data, while agents can create dashboards tailored to an individual change. This can improve monitoring granularity because the relevant signals are selected in relation to the change being deployed rather than only to a long-lived service dashboard. It also creates a machine-readable trail connecting a code change, its rollout, observed signals, and subsequent remediation.

Sevbot, described as an internal incident-response agent built on Codex, collects incident context, identifies possible mitigations, and answers engineers’ questions in a Slack channel. It does not independently execute mitigations in the current arrangement; an engineer must instruct it to apply a specific action. OpenAI’s intended direction is more autonomous handling of routine outages, with humans reviewing actions later, but on-call responsibility remains in place. This boundary is operationally significant: the system provides retrieval, diagnosis, and decision support while retaining human authorization for potentially consequential interventions.

## Scaling consequences and infrastructure pressure

The case demonstrates that LLM-based developer productivity can shift, rather than remove, system constraints. More agent-generated code leads to more commits, pull requests, builds, tests, reviews, deployments, and production observations. OpenAI reports that pull requests per engineer are growing at a high and accelerating rate, with some systems experiencing approximately ten times their previous load over six months. Version control, CI/CD, release systems, and observability infrastructure therefore become LLMOps capacity-planning concerns.

The company reportedly tends to acquire or use external capacity first and bring capabilities in-house later. It is also working through geographic infrastructure distribution, capacity planning, and CPU bottlenecks. The stated operating pattern is continual rebalancing: each increase in model or agent capability creates another downstream bottleneck. This is a reminder that production agent systems need capacity models covering not only inference, but also tool calls, repository operations, test execution, logs, dashboards, storage, network traffic, and human review queues.

Native mobile delivery remains a separate constraint. Agent-generated changes can be produced quickly, but iOS and Android releases still depend on external app-store approval processes that may take hours or days. Feature flags can reduce the need for immediate store releases, but they cannot eliminate all platform-level restrictions. Consequently, faster code generation does not automatically translate into faster user-visible delivery.

## Results and tradeoffs

The reported benefits include broad voluntary adoption, longer and more complex agent sessions, less dependence on traditional IDE workflows, faster creation of internal tools, more automated testing and review, more targeted production monitoring, and the ability for a small number of engineers to attempt substantial migrations or rewrites. The software-factory design also makes it feasible to apply multiple review perspectives to changes that would previously have been impractical for human specialists to inspect individually.

The tradeoffs are substantial. A shared harness has become a critical dependency: even relatively minor outages are noticed internally at the same time as, or before, automated alerts. Concentrating work in Codex and ChatGPT Work creates a large blast radius for availability problems, access-control errors, bad context, or regressions in agent behavior. Longer-running autonomy can reduce the amount of direct human coordination, but it increases the need for clear goals, bounded permissions, durable state, cancellation mechanisms, audit logs, and reliable intermediate validation.

High code volume can also overwhelm review and deployment systems if capacity and governance do not scale with it. Automated review is not equivalent to independent assurance, especially when multiple agents share the same context, model weaknesses, or flawed assumptions. Risk classification can reduce unnecessary review, but it introduces the possibility of misclassification. Likewise, an agent-generated dashboard may monitor the wrong signals or create false confidence if success criteria are underspecified.

Overall, OpenAI’s experience presents an advanced example of LLMs operating inside production engineering loops rather than merely assisting individual programmers. Its strongest lesson is architectural: useful autonomy comes from combining models with organizational context, specialized skills, executable tools, tests, observability, risk gates, and human authorization. Its less favorable lesson is that automation accelerates every connected stage, including failures, infrastructure load, and governance challenges. The reported outcomes support the potential of agentic software operations, but they do not establish that autonomous development is universally safer or more productive; those conclusions would require independent measurements of quality, reliability, cost, security, and long-term maintenance.
