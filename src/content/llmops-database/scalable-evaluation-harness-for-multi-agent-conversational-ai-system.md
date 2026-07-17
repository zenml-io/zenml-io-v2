---
title: "Scalable Evaluation Harness for Multi-Agent Conversational AI System"
slug: "scalable-evaluation-harness-for-multi-agent-conversational-ai-system"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "latency-optimization"
  - "monitoring"
  - "databases"
  - "guardrails"
  - "orchestration"
  - "anthropic"
  - "google-gcp"
industryTags: "e-commerce"
company: "DoorDash"
summary: "DoorDash built a comprehensive evaluation harness for Ask DoorDash, their agentic ordering assistant, to address the challenge of assessing agent quality at scale beyond manual testing and employee feedback. The system includes rubric-based evaluation criteria, transcript builders that reconstruct sessions from OpenTelemetry traces, conversation simulators that generate repeatable test scenarios with fixtures, and calibrated LLM judges that automate grading against human-labeled standards. This infrastructure expanded quality monitoring from approximately 1 employee feedback per day to 2,000 auto-graded sessions daily, drove an 8-point improvement in agent quality scores (cutting error rates nearly in half) ahead of nationwide launch, and reduced comprehensive regression testing from over 6 hours to about 20 minutes, enabling faster iteration and de-risking major changes like a base-model migration that achieved 35% latency reduction while maintaining quality."
link: "https://careersatdoordash.com/blog/building-ask-doordash-part-three-evaluation/"
year: 2026
seo:
  title: "DoorDash: Scalable Evaluation Harness for Multi-Agent Conversational AI System - ZenML LLMOps Database"
  description: "DoorDash built a comprehensive evaluation harness for Ask DoorDash, their agentic ordering assistant, to address the challenge of assessing agent quality at scale beyond manual testing and employee feedback. The system includes rubric-based evaluation criteria, transcript builders that reconstruct sessions from OpenTelemetry traces, conversation simulators that generate repeatable test scenarios with fixtures, and calibrated LLM judges that automate grading against human-labeled standards. This infrastructure expanded quality monitoring from approximately 1 employee feedback per day to 2,000 auto-graded sessions daily, drove an 8-point improvement in agent quality scores (cutting error rates nearly in half) ahead of nationwide launch, and reduced comprehensive regression testing from over 6 hours to about 20 minutes, enabling faster iteration and de-risking major changes like a base-model migration that achieved 35% latency reduction while maintaining quality."
  canonical: "https://www.zenml.io/llmops-database/scalable-evaluation-harness-for-multi-agent-conversational-ai-system"
  ogTitle: "DoorDash: Scalable Evaluation Harness for Multi-Agent Conversational AI System - ZenML LLMOps Database"
  ogDescription: "DoorDash built a comprehensive evaluation harness for Ask DoorDash, their agentic ordering assistant, to address the challenge of assessing agent quality at scale beyond manual testing and employee feedback. The system includes rubric-based evaluation criteria, transcript builders that reconstruct sessions from OpenTelemetry traces, conversation simulators that generate repeatable test scenarios with fixtures, and calibrated LLM judges that automate grading against human-labeled standards. This infrastructure expanded quality monitoring from approximately 1 employee feedback per day to 2,000 auto-graded sessions daily, drove an 8-point improvement in agent quality scores (cutting error rates nearly in half) ahead of nationwide launch, and reduced comprehensive regression testing from over 6 hours to about 20 minutes, enabling faster iteration and de-risking major changes like a base-model migration that achieved 35% latency reduction while maintaining quality."
notion:
  pageId: "397f8dff-2538-8032-9206-eed38f8d10d8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:55:00.000Z"
  lastEditedTime: "2026-07-08T19:55:00.000Z"
  publishedAt: "2026-07-08T20:13:13Z"
---

## Overview

DoorDash's Ask DoorDash represents a sophisticated multi-agent conversational AI system designed to help users discover restaurants and shop for groceries through natural language conversations. This case study, published in June 2026, focuses specifically on the evaluation infrastructure built to support production deployment of this agentic system. The case illustrates a mature approach to LLMOps where evaluation is treated as a first-class component of the development and production lifecycle rather than an afterthought.

The core problem DoorDash faced was typical of production LLM systems: quality was initially assessed through sparse, biased signals—primarily employee feedback and manual testing that covered known scenarios but missed edge cases and systematic failure modes. The company recognized that to ship a trustworthy agent at scale, they needed to make quality observable, measurable, and actionable across thousands of sessions rather than dozens. The evaluation harness they built addresses this by creating infrastructure that works consistently across both offline development and online production environments.

## Architecture and System Design

Ask DoorDash uses a multi-agent architecture where an Orchestrator agent receives user messages and routes them to specialized domain agents like the Restaurant Discovery Agent or Grocery Shopping Agent. These domain agents either handle conversations directly or return control to the Orchestrator for rerouting. This architectural pattern is important because it shapes how evaluation is structured—different failure modes manifest at different layers, so evaluation must mirror the runtime architecture.

The evaluation system therefore assesses routing quality at the Orchestrator level, guardrails across the full flow, and task-specific capabilities at each domain agent. This multi-layered approach ensures that issues can be detected and diagnosed at the most appropriate level of abstraction rather than trying to assess everything through a single monolithic metric.

## Core Evaluation Components

### Rubric Design

The foundation of the evaluation system is a carefully designed rubric that translates the open-ended concept of "agent quality" into concrete, measurable criteria. DoorDash's approach balances specificity with generalizability—criteria must be specific enough to produce consistent grading but broad enough to accept different valid paths to success. This is critical because agentic systems rarely have one "right answer" to a user request.

The rubric is structured around multiple dimensions evaluated at different system layers. For guardrail evaluation across all agents, dimensions include communication quality (checking whether responses are brief and don't narrate internal reasoning) and trust and integrity (verifying the agent doesn't present false information or contradictions). For capability evaluation at the Restaurant Discovery Agent, dimensions include constraint satisfaction (ensuring recommendations meet explicit requirements like delivery time, budget, and dietary restrictions) and result diversity (avoiding near-duplicate suggestions). The Grocery Shopping Agent is evaluated on shopping execution (whether explicit modification requests are fulfilled) and item relevance to stated goals.

Each criterion is graded as a binary check, and individual checks aggregate into a session-level score. Importantly, each criterion includes an eligibility step—the judge first determines whether the criterion applies to the specific session before grading it. This prevents penalizing flows for not exhibiting features that aren't relevant to their scenario (for example, not marking down a recipe flow for missing reorder-specific steps).

For offline evaluation, DoorDash also employs checklist-style rubrics that are scenario-specific. For a test case like "vegetarian taco grocery list for two under $60," the checklist verifies that every item is a relevant ingredient for vegetarian tacos and the subtotal meets the budget constraint. These more precise checks provide lower-variance signals that make small sample sizes more useful during rapid iteration.

### Transcript Builder

The raw observability data comes from OpenTelemetry instrumentation, with each session becoming a trace stored in ClickHouse. While comprehensive, these traces are difficult to grade directly due to size, schema scaffolding, and evidence scattered across multiple spans and turns. The transcript builder addresses this through Python scripts that run over stored traces before evaluation.

The builder performs several crucial transformations: it reassembles scattered spans into coherent views, removes tokens that carry no quality signal (like structural JSON scaffolding), and trims oversized payloads. More sophisticated than simple filtering, the builder creates criterion-specific views—each evaluation criterion declares what evidence it depends on, and the builder provides only that slice to the judge. For example, a grounding check receives the agent's claim and the tool output supporting it, while a diversity check sees the recommendations and original request. A narration check looks at text the agent streamed during work. This scoping keeps judgments focused and reduces noise that could confuse the evaluator.

### Conversation Simulator

One of the fundamental challenges in evaluating agentic systems is that changes cannot be safely tested on real users, and past sessions cannot be replayed against a modified agent (since the modifications would change behavior). DoorDash's solution is a conversation simulator where an LLM plays the role of a simulated user, driving the agent through predefined scenarios.

Each scenario defines the opening request, the user's goal, and how they should react to questions or outcomes. When scenarios depend on external state—like prior order history, in-progress carts, or store inventory—the harness uses fixtures: recorded tool payloads that are returned instead of live API calls. This design pins every run to identical state, avoiding drift from catalog changes, store availability shifts, or test-account history modifications.

For example, the reorder scenario starts with "Reorder my usuals" and uses a fixture for the get_reorder_items tool that returns a specific recorded order history containing items like Meadow Gold Whole Milk, Oroweat Whole Wheat Bread, Hass Avocados, and Ben & Jerry's ice cream. Every run of this scenario sees exactly these items, making expected outcomes predictable and allowing the judge to grade against a known baseline consistently.

The practical impact of simulation is substantial. A comprehensive evaluation sweep covers approximately 50 scenarios with 8 trials each, producing 400 conversations. Without simulation, this would require a developer to manually chat with the agent for over 6 hours (at roughly 1 minute per conversation). The simulator reduces this to about 20 minutes, making comprehensive regression testing practical within normal development workflows rather than being relegated to infrequent, heavyweight test cycles.

### LLM-as-a-Judge

At the scale DoorDash operates—needing to grade thousands of sessions daily—human review as the primary evaluation mechanism is impractical. However, agent evaluation requires human-level judgment to assess whether a multi-turn conversation with hidden tool executions successfully helped the user. DoorDash's solution employs an LLM judge, but critically, one that is calibrated against human reviewers to ensure trustworthy verdicts.

The judge reads prepared transcripts (created by the transcript builder) and scores them against rubric criteria. Human review isn't eliminated but rather repositioned to where it provides maximum leverage: defining rubrics, labeling calibration sets, and auditing judge behavior. The company applied GEPA (presumably a prompt optimization algorithm) to refine the judge's decision boundaries. This iterative process proposes revisions to the judge prompt and retains changes that improve agreement with human labels on held-out sets.

Calibration is treated as an ongoing process rather than a one-time activity. As rubrics evolve—for instance when new capabilities are added—fresh labels are collected and the judge is recalibrated. The judge scores each criterion independently, receiving the criterion definition and relevant evidence, then returning a verdict with a brief rationale. This architecture enabled DoorDash to expand from approximately 1 employee-submitted feedback per day to 2,000 auto-graded sessions daily, fundamentally changing the signal-to-noise ratio in their quality monitoring.

An important design principle is that the same rubric and calibrated judge run in both offline (development) and online (production) environments. If these used separately tuned judges, scores could diverge in ways that are difficult to reconcile, undermining confidence in offline validation as a predictor of production performance.

## Platform Infrastructure

DoorDash emphasizes that building a scalable evaluation harness depends heavily on robust platform infrastructure—trace storage, real-time evaluation execution, UI-based judge development, and annotation workflows don't materialize automatically. They started with an embedded platform team that built these components alongside the Ask DoorDash evaluation harness, creating a tight feedback loop between platform development and evaluation design.

This close collaboration allowed infrastructure and evaluation requirements to evolve together, accelerating development. The work is now shaping a shared evaluation service that other DoorDash teams can adopt quickly while customizing for their specific use cases, representing a shift from bespoke solutions to reusable platform capabilities.

## From Detection to Action

The evaluation harness provides measurement, but DoorDash has built processes to convert measurements into improvements. When daily evaluation runs surface failures, they avoid anecdote-driven development by clustering failures into themes. The rubric provides a natural starting point—each failed session already carries the criterion it violated, so rubric criteria act as initial issue clusters. A grounding failure, missing substitution, and poor narration are different problems requiring separate investigation.

This clustering tells what is failing most often, but understanding why and how to fix it requires implementation context. DoorDash leverages AI coding agents that inspect failing traces, relevant code paths, recent changes, and prior investigations starting from a failure cluster. When fixes are clear, these agents can draft pull requests directly; for prompt or in-context learning changes, they produce diagnoses and proposed changes for human review.

These workflows are packaged as Agent Skills (referencing Claude's Agent Skills framework), where each skill defines a repeatable task like clustering failures or investigating failure modes. This makes workflows easier for other teams to adopt and easier to improve over time, since updates to a skill carry forward to future invocations rather than requiring patches to one-off investigations.

## Production Impact Examples

### Reducing Reasoning Leakage

Daily online scoring surfaced a spike in reasoning leakage where the grocery agent completed tasks but occasionally used system-oriented language in user-facing narration—terms like "reorder skill," tool names, or technical phrases like "fetch" and "in parallel." The response sounded like a coding agent rather than a shopping assistant.

Diagnosis pointed to prompt design issues. DoorDash consolidated the agent's communication rules and separated internal skill instructions from user-facing language. Offline validation using scenarios most prone to this failure mode showed an 11% reduction in leakage rate. A full evaluation sweep across hero scenarios found no attributable regressions, so the change shipped. Online monitoring confirmed a step-change improvement, demonstrating the closed-loop workflow from detection through validation to verified production impact.

### De-risking Base Model Migration

When Gemini 3.5 Flash was released in mid-May, DoorDash's agents were running on Claude Sonnet 4.6. Flash's benchmarks suggested an opportunity to reduce latency, but a base-model swap carries significant risk of behavior changes across the system. The offline evaluation harness was used to de-risk this migration.

Initial Flash runs through the harness showed sharp score drops. The evaluation surfaced concrete failure patterns, which were investigated using AI coding agents to form hypotheses and run experiments. The investigation revealed not a capability gap but a compatibility issue: Flash formatted some tool parameters differently than Sonnet and interpreted parts of the system prompt that had been implicitly tuned around Sonnet's conventions. The low scores reflected a system adapted to one model rather than weaknesses in the new model.

This diagnosis led to targeted fixes. Some were deterministic guards on tool inputs—Flash occasionally passed search queries as JSON objects like {"dishes": [...]} where the tool signature expected plain strings, so these were coerced into expected shapes. Other fixes were prompt updates that stated explicitly what Sonnet had inferred implicitly, such as using exact store names from data rather than embellishing beyond tool results.

After these adjustments, re-running the evaluation brought Flash to quality parity with Sonnet within the noise of the harness. The production migration proceeded, and monitoring confirmed the win: a 35% latency reduction with no loss in quality metrics. This demonstrates the harness working in both directions—turning production signals into fixes and de-risking deliberate system changes before rollout.

## Results and Metrics

The quantitative impact of the evaluation harness is substantial:

- Quality monitoring expanded from approximately 1 employee-submitted feedback per day to 2,000 auto-graded sessions daily, a roughly 2,000x increase in evaluation throughput
- Agent quality scores improved by 8 points ahead of nationwide launch, with error rates cut nearly in half
- Comprehensive regression testing time reduced from over 6 hours of manual work to about 20 minutes of automated execution
- Successfully validated a base-model migration achieving 35% latency reduction while maintaining quality parity

These metrics demonstrate that the evaluation harness is not merely a measurement tool but a capability multiplier that enables faster iteration, earlier detection of issues, and confidence to make substantial system changes.

## Lessons Learned and Design Principles

DoorDash shares several valuable lessons from building this system. First, judges need transcript views shaped for the specific question being asked—the raw trace often carries more information than a criterion needs, and better results come from removing irrelevant content while keeping the evidence the criterion actually depends on.

Second, the evaluation environment must be controlled or scores measure noise rather than agent performance. Upstream drift and agent non-determinism can both move results in ways that obscure whether changes actually helped. Fixtures freeze the upstream world and fixed scenarios keep task conditions stable, making metric movements more likely to reflect agent behavior rather than environmental shifts.

Third, offline results only matter if they carry to online performance. This is why using the same rubric and calibrated judge in both environments is essential—separately tuned judges can diverge in ways that are hard to reconcile, undermining confidence in offline validation.

Finally, DoorDash acknowledges that the evaluation system itself produces bug reports. A meaningful share of flagged failures are faults in the harness rather than agent issues, typically judge false positives or tracing gaps that provide incomplete views. Addressing these issues in parallel with agent improvements keeps the evaluation system trustworthy.

## Critical Assessment

While this case study presents an impressive evaluation infrastructure, it's worth noting that it comes from DoorDash's own engineering blog and naturally emphasizes successes. Several questions remain about edge cases and limitations. For instance, the reliance on LLM-as-judge introduces its own potential biases and failure modes that could drift over time, especially as the underlying models evolve. The calibration process with GEPA is mentioned but not detailed—understanding the size of calibration sets, frequency of recalibration, and how disagreements between human reviewers are resolved would provide a more complete picture.

The fixture-based approach to controlling evaluation environment is elegant but could mask issues that only manifest with real-time data drift or unexpected upstream states. While fixtures ensure reproducibility, they may not capture the full distribution of production scenarios. The balance between reproducible controlled testing and coverage of real-world variability is a tension that's acknowledged but not deeply explored.

The claimed 8-point improvement in quality scores is impressive, but without knowing the scale of the scoring system (is it 0-10? 0-100? what does 8 points represent in practical terms?) or having baseline metrics, it's difficult to assess the true magnitude of impact. Similarly, "cutting error rates nearly in half" is a strong claim, but the definition of what constitutes an error and how baseline error rates were measured isn't fully specified.

That said, the technical approach is sophisticated and the architectural decisions appear sound. The emphasis on criterion-specific transcript views, calibrated LLM judges, controlled simulation environments, and unified rubrics across development and production represents mature LLMOps practice. The integration with AI coding agents for failure investigation and the packaging of workflows as reusable Agent Skills suggests DoorDash is thinking systematically about how evaluation feeds into continuous improvement rather than treating it as a one-time validation gate.

The case study provides valuable insights into evaluation harness design for production agentic systems, demonstrating how investing in evaluation infrastructure can unlock faster iteration cycles and enable teams to make substantial changes with confidence.
