---
title: "Agentic System for Autonomous Code Monitoring and Maintenance"
slug: "agentic-system-for-autonomous-code-monitoring-and-maintenance"
draft: false
llmopsTags:
  - "code-generation"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "monitoring"
  - "docker"
  - "anthropic"
  - "openai"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built an agentic system to autonomously maintain their Ramp Sheets product by continuously monitoring production, triaging alerts, and proposing fixes without human intervention. The system evolved from nightly scheduled QA agents to a monitor-driven maintenance approach that generates over a thousand AI-powered monitors (one per 75 lines of code) that automatically detect issues, reproduce bugs in sandboxed environments, and create pull requests with fixes. In its first week of operation, the system caught 40 real bugs within minutes of occurrence, significantly reducing the observability burden on engineering teams while improving product quality and reducing downtime for customers."
link: "https://x.com/RampLabs/status/2036165188899012655"
year: 2026
seo:
  title: "Ramp: Agentic System for Autonomous Code Monitoring and Maintenance - ZenML LLMOps Database"
  description: "Ramp built an agentic system to autonomously maintain their Ramp Sheets product by continuously monitoring production, triaging alerts, and proposing fixes without human intervention. The system evolved from nightly scheduled QA agents to a monitor-driven maintenance approach that generates over a thousand AI-powered monitors (one per 75 lines of code) that automatically detect issues, reproduce bugs in sandboxed environments, and create pull requests with fixes. In its first week of operation, the system caught 40 real bugs within minutes of occurrence, significantly reducing the observability burden on engineering teams while improving product quality and reducing downtime for customers."
  canonical: "https://www.zenml.io/llmops-database/agentic-system-for-autonomous-code-monitoring-and-maintenance"
  ogTitle: "Ramp: Agentic System for Autonomous Code Monitoring and Maintenance - ZenML LLMOps Database"
  ogDescription: "Ramp built an agentic system to autonomously maintain their Ramp Sheets product by continuously monitoring production, triaging alerts, and proposing fixes without human intervention. The system evolved from nightly scheduled QA agents to a monitor-driven maintenance approach that generates over a thousand AI-powered monitors (one per 75 lines of code) that automatically detect issues, reproduce bugs in sandboxed environments, and create pull requests with fixes. In its first week of operation, the system caught 40 real bugs within minutes of occurrence, significantly reducing the observability burden on engineering teams while improving product quality and reducing downtime for customers."
notion:
  pageId: "390f8dff-2538-800c-9593-e1c1f525f3b1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-01T19:30:00.000Z"
  lastEditedTime: "2026-07-01T19:31:00.000Z"
  publishedAt: "2026-07-01T19:40:57Z"
---

## Overview

Ramp developed a sophisticated agentic system to autonomously maintain their Ramp Sheets product, representing an advanced application of LLMs in production operations. The system continuously monitors production code, triages alerts, and generates fixes without human intervention, though all code changes still require engineer review before merging. The scale of deployment is notable: the system operates using approximately one thousand AI-generated monitors covering every 75 lines of code in the codebase. This case study demonstrates the evolution of agentic LLM systems from scheduled batch operations to real-time, event-driven maintenance workflows.

The motivation behind building this system was threefold: agents provide cost-effective, infinitely patient, and easily parallelizable labor that makes exhaustive monitoring feasible at production scale; teams generally dislike owning observability work, and offloading this to agents allows faster shipping; and strong observability combined with automated QA leads to fewer bugs, less downtime, and better customer experiences. This case represents an ambitious attempt to shift traditional DevOps and SRE responsibilities to autonomous AI systems.

## Technical Architecture and Foundation

The maintenance system is built on top of Ramp Inspect, which is Ramp's internal background coding agent infrastructure. Each Inspect session creates a fully sandboxed development environment where the agent can make real API requests, run tests, and reproduce bugs end-to-end against live code. This interactivity is positioned as critical because subtle failure modes are rarely apparent from static code review alone. The sandboxed reproduction capability represents a key architectural decision that distinguishes this system from simpler log-analysis or static-code-review approaches.

The sandboxed environment enables agents to validate their hypotheses about bugs and verify that proposed fixes actually work before submitting them for human review. This verification loop is essential for maintaining confidence in the system's outputs and reducing the noise that would otherwise result from speculative fixes that don't actually address root causes.

## Evolution: Phase 1 - Scheduled Agentic Review

The first iteration of the self-maintenance system took the form of scheduled nightly audits. Every night, an agent would automatically spin up to run a comprehensive QA pass on Ramp Sheets with instructions to sanity-test core features, stress-test recently merged pull requests, and probe existing functionality for latent bugs. This design proved effective at surfacing several real production bugs daily.

Critically, this wasn't just a detection system but a system of action: when the agent identified a real issue, it would create a pull request to address the root cause. The text provides an example where an engineer shipped a feature with an unnoticed bug, and by morning the agent had caught the regression and pushed a fix. One specific bug mentioned was a race condition in Sheets' streaming architecture that the agent both detected and fixed.

However, this nightly agent approach had significant limitations. Without a specific mission or triggering context, the agent would progress down similar paths in its QA workflow each night, reading the same files, investigating the same features, and running the same tests. While effective at finding high-radius issues affecting broad functionality, this pattern struggled with narrow, situational bugs that only manifested under specific conditions.

Despite Ramp Sheets being extensively instrumented on Datadog, the unfocused QA agent couldn't effectively extract nuanced insights from telemetry data. The case study makes a notable claim about current model limitations: while frontier models are capable at a wide range of software engineering tasks, they cannot synthesize a large codebase with a large observability surface to determine what needs attention. The authors assert that prioritization at production scale requires intelligence surpassing any model available at the time of writing.

## Evolution: Phase 2 - Monitor-Driven Maintenance

The second iteration pivoted to using Datadog monitors to direct agents at specific production issues. This approach leverages traditional observability infrastructure to provide focus and context to the agentic system. The monitors watch metrics and log patterns, firing alerts on error rate spikes, latency regressions, or other deviations from expected behavior.

The monitor-driven system operates in two steps. First, on PR merge, an agent reads the code diff and generates monitors instrumenting the new code. This is a notable application of LLMs: using code understanding to automatically generate appropriate observability instrumentation. Second, when a monitor fires, a Datadog webhook triggers a new agent session with the alert context. The agent then reproduces the issue in its sandbox environment, develops and validates a fix, and notifies the team on Slack.

The case study emphasizes that agent-generated monitors are both specific and sophisticated. An example is provided of a composite monitor that combines signals from Ramp Sheets' backend and SSE (Server-Sent Events) queue, alerting when agent activity diverges from broadcasted event throughput. This demonstrates that the LLM can understand system architecture well enough to create monitors that correlate across multiple system components.

The results from this approach were impressive in terms of speed and granularity. In the first week, the system caught 40 real bugs, each within minutes of a user triggering the issue. One specific example involved a user uploading a spreadsheet with a unique type of embedded image that existing logic couldn't handle; the exception triggered a monitor and moments later the agent had alerted the team with a fix ready. Another case involved an internal user reporting a broken feature on Slack, but the system had already flagged and addressed the issue before the message arrived.

## Evolution: Phase 3 - Adding Triage to Filter Noise

The major weakness of the monitor-driven approach was noise. Auto-generated monitors had poorly tuned thresholds, causing routine user activity to trigger cascades of alerts, most being false positives. Additionally, monitors would fire repeatedly for the same issue, flooding communication channels with duplicate notifications.

To address this, the team added a triage step where on every alert, the agent first assesses the scope and validity of the problem. If it's a real issue, the agent pushes a fix and posts to Slack. If it's noise, the agent tunes or deletes the monitor. This represents a meta-level application of LLMs: using agents not just to respond to monitoring signals but to curate and maintain the monitoring infrastructure itself.

To prevent duplicate alerts, the system stores state directly on monitor objects. When an agent pushes a fix, it appends the PR link to the monitor description. Subsequent agents that encounter the same fired monitor see the link and stand down, avoiding redundant work. This is a pragmatic example of using the monitoring system itself as a lightweight state store for agent coordination.

## Scale and Impact

The system scaled Ramp Sheets from ten hand-written monitors to over a thousand in just a few weeks. The manual monitors were described as "broad-strokes," alerting on major issues like frontend crashes or API timeouts. In contrast, the AI-generated monitors are far more granular, described as creating "a tight mesh over the exact shape of the code" that detects whenever code behavior drifts from expected patterns.

The one-monitor-per-75-lines-of-code metric is striking and represents an unprecedented level of observability granularity. This would be impractical to maintain manually but becomes feasible with automated generation and maintenance.

## Model Selection and Performance

The case study provides interesting insights into model selection for different tasks within the agentic system. While GPT-5 models (presumably OpenAI's models, though it's worth noting that as of standard knowledge GPT-5 hasn't been officially released, suggesting either this is speculative naming or internal access) are described as "very thorough debuggers," Claude Opus 4.6 (again, a version designation that may represent future models beyond standard knowledge) was found to be a more accurate triage evaluator and specifically better at filtering out noisy alerts.

This differentiation suggests that different cognitive profiles are optimal for different stages of the maintenance workflow: thorough, systematic debugging versus quick, accurate classification of alert validity. This represents sophisticated LLMOps practice where model selection is matched to specific task requirements rather than using a single model for all operations.

## Key Learnings and Best Practices

The team distilled several important principles from their experience that represent valuable LLMOps insights:

**Detect everything, notify selectively**: The system should monitor every possible signal, but each alert reaching humans must be meaningful. Teams will ignore noisy monitors and noisy agents alike, so aggressive filtering is essential for maintaining trust and attention.

**Delegate broadly to agents**: The team learned to let agents scope out problems, judge impact, make changes, and filter noise. They assert agents are "very good at this" and will improve as models advance, representing confidence in current capabilities while acknowledging the trajectory of improvement.

**Sandboxed reproduction improves results**: The ability for agents to reproduce failures against live code and validate fixes before submission is positioned as essential. This pattern ensures issues are real and proposed fixes work in practice, not just theory.

**Model choice matters significantly**: As noted above, different models excel at different aspects of the workflow, and thoughtful model selection improves overall system performance.

**Tight observability breeds customer empathy**: An interesting human-organizational insight is that when every slow load or bad output fires a notification, the engineering team feels the product the same way users do, catching bugs that might not have been prioritized through traditional processes.

**Keep existing instrumentation**: The team recommends maintaining traditional hand-written monitors alongside auto-generated ones. Agent-generated monitors are powerful but opaque and not yet reliable enough to be the only line of defense. When critical issues occur, teams still want instrumentation they wrote and trust. The caveat is that "as models improve, that will change," suggesting the team sees this as a temporary limitation.

## Critical Assessment and Balanced Perspective

While this case study presents impressive results, several considerations warrant attention when evaluating these claims:

The text originates from Ramp itself and describes their internal tooling, so there's inherent incentive to present results favorably. The "40 real bugs in the first week" metric is compelling but lacks context about false positive rates, how many fixes actually worked correctly, and how many required rework. The case mentions the noise problem but doesn't quantify how much noise existed at various stages.

The claim that agents can effectively maintain monitors, triage alerts, and propose fixes represents ambitious automation of traditionally human-intensive SRE work. While the sandboxed reproduction environment provides verification, the ultimate reliability depends on human review, as acknowledged by "no code is merged without engineer review." This raises questions about whether the system truly reduces human burden or shifts it from proactive monitoring to reactive code review.

The assertion that current frontier models cannot "synthesize a large codebase with a large observability surface and determine what needs attention" is notable. This suggests the focused, monitor-driven approach was adopted not by choice but by necessity due to model limitations. As models improve in reasoning over large contexts, the architecture might need to evolve again.

The model versions mentioned (GPT-5, Opus 4.6) suggest either forward-looking development or access to unreleased models, which makes it difficult to assess reproducibility of these results with publicly available models.

The one-monitor-per-75-lines metric, while impressive, also raises concerns about maintainability complexity. If monitors are "opaque" and can themselves generate noise requiring agent triage, there's potential for emergent complexity where the system becomes difficult to reason about or debug when things go wrong at scale.

## LLMOps Maturity and Production Readiness

This case study represents a sophisticated level of LLMOps maturity. Key production-readiness factors include:

- **Infrastructure automation**: Full CI/CD integration where monitors are generated on PR merge and agents are triggered by webhooks
- **Sandboxed execution**: Isolated environments for safe agent operation without risking production systems
- **Human-in-the-loop**: Mandatory engineer review before code merge, maintaining safety controls
- **State management**: Using monitor descriptions as lightweight state stores for coordination
- **Multi-model orchestration**: Strategic use of different models for different tasks
- **Observability of the observability**: Meta-level monitoring where agents maintain the monitoring infrastructure itself
- **Feedback loops**: Agents that learn to tune thresholds based on false positive patterns

The system operates continuously at production scale, handling real user-impacting issues autonomously (up to the point of proposing fixes). This goes beyond experimental or batch processing applications to represent genuine production LLM operations.

## Broader Implications

This case study illustrates several important trends in LLMOps. First, the evolution from scheduled batch operations to event-driven, real-time agent activation shows maturation in how organizations deploy agentic systems. Second, the recognition that agents excel at grunt work like monitoring and triage suggests a redistribution of engineering effort toward higher-value activities. Third, the tight integration with existing observability infrastructure (Datadog) demonstrates that effective LLMOps often involves augmenting rather than replacing traditional tooling.

The concept of AI-generated, AI-maintained monitoring infrastructure represents a potential paradigm shift in observability. If successful at scale, this approach could dramatically change how teams instrument and maintain complex systems. However, the acknowledged limitations—opacity, noise, need for traditional backup monitoring—suggest this remains an emerging rather than fully mature pattern.

The case also highlights the importance of agent verification capabilities. The sandboxed environment where agents can reproduce issues and test fixes represents essential infrastructure for trustworthy autonomous operations. Without this capability, the system would likely generate too many speculative or incorrect fixes to be useful.

Overall, this represents an ambitious and apparently successful application of LLMs to production operations, with appropriate caveats about current limitations and the need for human oversight. The evolution across three architectural phases demonstrates iterative learning and refinement, which is realistic and credible. However, readers should approach specific performance claims with appropriate skepticism given the source's vested interest in demonstrating success.
