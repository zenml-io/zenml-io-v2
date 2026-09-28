---
title: "Production AI Assistant for Incident Investigation and Remediation"
slug: "production-ai-assistant-for-incident-investigation-and-remediation"
draft: false
llmopsTags:
  - "code-generation"
  - "question-answering"
  - "realtime-application"
  - "high-stakes-application"
  - "prompt-engineering"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "memory"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "system-prompts"
  - "evals"
  - "monitoring"
  - "databases"
  - "postgresql"
  - "orchestration"
  - "guardrails"
  - "reliability"
  - "security"
  - "anthropic"
  - "openai"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built OCA, an AI on-call assistant that joins incident Slack channels, investigates likely causes using production-readonly tools and the application monorepo, posts interim and final findings, answers follow-up questions, and can ask a separate background agent to prepare pull requests. OCA is orchestrated with Temporal and operated with human review and narrowly scoped write access. In the four weeks described, it assisted with 575 of 1,220 incident-related merged pull requests; among incidents with merged fixes, OCA-assisted fixes were associated with 37% fewer engineers and approximately 50% less estimated engineer time, while responders rated it helpful 90% of the time. These results are based on internal activity estimates and coarse feedback, so they indicate promising operational impact rather than a controlled causal evaluation."
link: "https://builders.ramp.com/post/how-we-built-oca-our-ai-on-call-assistant"
year: 2026
seo:
  title: "Ramp: Production AI Assistant for Incident Investigation and Remediation - ZenML LLMOps Database"
  description: "Ramp built OCA, an AI on-call assistant that joins incident Slack channels, investigates likely causes using production-readonly tools and the application monorepo, posts interim and final findings, answers follow-up questions, and can ask a separate background agent to prepare pull requests. OCA is orchestrated with Temporal and operated with human review and narrowly scoped write access. In the four weeks described, it assisted with 575 of 1,220 incident-related merged pull requests; among incidents with merged fixes, OCA-assisted fixes were associated with 37% fewer engineers and approximately 50% less estimated engineer time, while responders rated it helpful 90% of the time. These results are based on internal activity estimates and coarse feedback, so they indicate promising operational impact rather than a controlled causal evaluation."
  canonical: "https://www.zenml.io/llmops-database/production-ai-assistant-for-incident-investigation-and-remediation"
  ogTitle: "Ramp: Production AI Assistant for Incident Investigation and Remediation - ZenML LLMOps Database"
  ogDescription: "Ramp built OCA, an AI on-call assistant that joins incident Slack channels, investigates likely causes using production-readonly tools and the application monorepo, posts interim and final findings, answers follow-up questions, and can ask a separate background agent to prepare pull requests. OCA is orchestrated with Temporal and operated with human review and narrowly scoped write access. In the four weeks described, it assisted with 575 of 1,220 incident-related merged pull requests; among incidents with merged fixes, OCA-assisted fixes were associated with 37% fewer engineers and approximately 50% less estimated engineer time, while responders rated it helpful 90% of the time. These results are based on internal activity estimates and coarse feedback, so they indicate promising operational impact rather than a controlled causal evaluation."
notion:
  pageId: "3e9f8dff-2538-80e2-874f-e56912f2fa7d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:12:00.000Z"
  lastEditedTime: "2026-09-28T08:13:00.000Z"
  publishedAt: "2026-09-28T08:25:51Z"
---

## Overview

Ramp built OCA (On-Call Assistant) to reduce the investigation burden on engineers responding to production incidents and customer escalations that require engineering support. When an incident is opened, incident.io creates a Slack channel and OCA joins automatically, starts an investigation thread, gathers evidence from the same systems available to human responders, and posts preliminary and completed findings. When a likely code-level remediation is apparent, OCA asks Inspect, Ramp’s background agent, to prepare a pull request for human review. The system is therefore not simply a chat interface: it is an event-triggered, tool-using production agent with workflow durability, staged communication, evaluation feedback, and explicit access controls.

The reported results are encouraging but should be interpreted cautiously. During the four weeks covered by the source, OCA assisted with 575 of the 1,220 pull requests merged to address incidents. For incidents that had merged fix pull requests, OCA-assisted fixes were associated with 37% fewer engineers and roughly 50% less estimated engineer time than other fixes. Responders rated OCA helpful 90% of the time. The comparison is based on engineer activity in incident Slack channels, and the helpfulness signal is a simple post-incident rating; the text does not establish a randomized comparison, account for incident severity, or demonstrate that OCA alone caused the reductions.

## Problem and production workflow

Incident response requires engineers to correlate timelines, logs, deployments, database state, code, and related incidents while communicating findings quickly to a group under pressure. OCA is designed to perform this investigation in the existing incident process rather than requiring responders to move to a separate application. It normally posts an interim update about five minutes after an incident opens and a finished report at approximately thirteen minutes. The interim report includes preliminary findings, a timeline, and links to incident resources. This staged approach addresses a practical tension: a model needs time to investigate thoroughly, but responders need useful information early and may otherwise rely on other fast-responding agents.

OCA can answer follow-up questions in Slack and has access to read-only operational systems used during investigation. It can request that Inspect open a pull request, but no triggered change is merged without a human. For a limited number of destructive actions, it can request explicit authorization through Slack buttons. The current design is consequently human-in-the-loop, with automation focused on evidence gathering, reasoning support, communication, and preparation of changes rather than unattended production modification.

## Agent architecture and orchestration

When an incident begins, Ramp launches Claude Code or Codex in a checkout of its application-backend monorepo. The selected coding-agent environment receives OCA’s instructions and investigation tools, allowing the model to inspect relevant code and query operational evidence. Ramp reports switching between Anthropic and OpenAI agents according to observed practical performance: it used Claude Code for Anthropic models such as Opus and Codex for OpenAI models such as GPT, and had most recently moved to GPT-6 Astra at the time of the article. The source also describes earlier use of Claude Opus models, including a transition to a model with a one-million-token context window. These model names and transitions describe a moving production configuration rather than a fixed benchmarked model choice.

Temporal manages the investigation workflow. This is important operational infrastructure for a long-running agent: the investigation can survive worker restarts and deployments instead of being tied to one fragile process. The agent runs in a repository checkout, uses custom investigation tools and command-line interfaces, and produces a transcript, tool-call record, evidence trail, Slack updates, and, when appropriate, a request for a remediation pull request. The architecture separates orchestration from model inference and keeps code-change execution behind a review boundary.

## Prompting, skills, and reasoning controls

Early investigations frequently stopped after finding a plausible explanation. Ramp found that asking the model to ground each claim and consult multiple independent sources of evidence improved behavior, but the results were initially too inconsistent for unsupervised investigation. The team therefore invested in prompts, reusable skills, hooks, and custom command-line tools, using the strongest available models and high reasoning-effort settings. The goal was not merely to produce a fluent incident summary, but to reduce confident explanations that were weakly supported or incomplete.

Ramp develops the prompting system through live, session-driven testing. OCA can run as a Claude Code custom subagent on a laptop pointed at an incident, allowing maintainers to inspect its transcript and tool calls. When an error is found, they identify the general class of failure and resume the session to test an instruction that helps the agent discover the problem itself. This is a practical prompt-engineering and debugging loop: the team treats model traces and evidence trails as artifacts for failure analysis, rather than only reviewing the final answer.

One concrete failure mode involves log query windows. If a query defaults to a one-hour lookback and the first returned error is from twenty minutes ago, an agent may incorrectly infer that the incident began twenty minutes earlier and connect it to a recent deployment. A longer query could show that the condition had existed much earlier. Ramp added instructions requiring the agent to question whether a query silently excluded relevant data and to state the time ranges queried in Datadog before moving on. This illustrates how domain-specific reasoning checks can be more valuable than generic requests to “be careful.”

## Just-in-time hooks and staged communication

Rather than placing every instruction in the initial system prompt, Ramp delivers some guidance at the point where the agent is about to perform a consequential action. Hooks can intercept an attempted Slack post and inject a requirement to load an on-call reasoning-traps skill and run self-check questions against the current findings. The first implementation strictly blocked actions until logs showed that the instruction had been followed, but agents sometimes rejected the instruction and repeatedly retried the blocked action.

The current design uses six one-shot hook detours. On successive attempts to post findings, the agent is prompted to cross-check its theory against production Postgres, apply the reasoning-traps checklist, perform a sanity check, perform a second check, review Slack posting rules, and verify whether a ready-made remediation plan exists. After the detours have fired, the post is allowed without requiring machine-verifiable proof that every instruction was followed. This is a tradeoff between safety and liveness: the hooks add structured friction before communication, but the system avoids an indefinitely blocked agent caused by brittle compliance checks.

OCA also uses a periodic hook to preserve progress visibility. Every ten minutes, the next tool-call response receives instructions that cause the agent to edit its interim Slack post with current theories. Ramp reports that reducing model effort from “max” to “high” improved speed without observed loss of quality, and uses the faster setting. The source does not provide latency distributions or an independent quality benchmark, so this remains an operational judgment supported by internal experience rather than a fully quantified optimization.

## Evaluation and improvement loop

After each incident, a responder labels OCA as “Helpful,” “Not helpful,” or “Didn’t read.” This is a coarse human-feedback signal, but Ramp uses it to compare models, reasoning-effort settings, and experimental features. An active Slack channel collects detailed reports, and maintainers spot-check investigations that responders flag as problematic. Requests from responders have led to concrete changes, such as adding links to related incidents early in the investigation.

Ramp is also experimenting with agent memory. OCA can write notes for future investigations, indexed by metadata such as monitor ID, team, service, or incident lead. The reported result is mixed: enabling memory did not produce a discernible change in responder ratings, but appeared to speed up investigations. That distinction matters operationally. A feature can improve efficiency without improving perceived usefulness, and the available evidence does not establish whether the speed effect is consistent or whether memory introduces stale or misleading context.

The reported adoption and outcome metrics provide useful production signals: volume of assisted fixes, engineer participation, estimated time, and responder ratings. However, they are not sufficient to verify correctness, safety, or causality. A stronger evaluation program would need incident-level severity and complexity controls, comparison against pre-OCA or matched incidents, measurement of false leads and missed causes, tracking of pull-request rework and rollback outcomes, and separate assessment of interim versus final reports. The source does not claim that such controls were in place.

## Results, controls, and tradeoffs

OCA’s central benefit is shortening the path from incident creation to an evidence-backed investigation and a reviewable code fix. Its integration with Slack reduces workflow switching, while Temporal supports durable execution and the interim-update mechanism makes long investigations more useful to humans. The reported association with fewer engineers and less estimated engineer time suggests that OCA may reduce coordination overhead, although confounding is possible: easier incidents may be more likely to receive useful OCA assistance, and engineer activity in Slack is only a proxy for total effort.

The principal risks are hallucinated or prematurely converged explanations, incomplete evidence gathering, incorrect temporal reasoning, excessive investigation latency, and unsafe changes. Ramp addresses these with high-capability models, domain-specific prompts, explicit evidence checks, just-in-time hooks, read-only access by default, human authorization for selected destructive actions, and mandatory human review before pull-request merges. These measures reduce risk but do not eliminate it; hook compliance is not proof of factual correctness, and a well-formed investigation can still be wrong.

Ramp’s longer-term goal is for OCA to handle routine incidents end to end, from incident creation through remediation without human involvement. The current deployment is a meaningful intermediate stage: it automates investigation and preparation while retaining people at consequential decision points. Moving toward greater autonomy would require stronger verification of evidence, clearer action policies, reliable rollback mechanisms, robust handling of stale memory and ambiguous incidents, and evaluation that measures operational safety as well as speed. Based on the source, OCA demonstrates a substantial production LLMOps effort, but its strongest claims should be read as internal early results and directional evidence rather than universally transferable performance guarantees.
