---
title: "Scaling Agent Evaluation from Afterthought to Default Practice"
slug: "scaling-agent-evaluation-from-afterthought-to-default-practice"
draft: false
llmopsTags:
  - "customer-support"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "evals"
  - "monitoring"
  - "orchestration"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "documentation"
  - "anthropic"
  - "microsoft-azure"
industryTags: "tech"
company: "Uber"
summary: "Uber's Agent Platform team faced a critical challenge: while teams had access to evaluation tooling, they weren't using it effectively to drive product insights or ensure quality before production deployment. The problem wasn't a lack of tools but rather adoption barriers including missing observability foundations, complex evaluation setup processes, stale datasets, and engineering-focused workflows that excluded product and design stakeholders. The solution involved making tracing the default in all deployments, automatically generating evaluators from agent configurations and traces, implementing continuous evaluation with proactive alerting, creating human-in-the-loop dataset update workflows, and building UI-friendly evaluation interfaces accessible to non-engineers. This resulted in teams discovering critical issues like unintended intent recognition in their voice booking agent, with conversational designers now updating evaluators weekly, and evaluation evolving from a launch gate into an engine for continuous improvement across Uber's rapidly scaling agent ecosystem."
link: "https://www.youtube.com/watch?v=vJh126DQzEc"
year: 2026
seo:
  title: "Uber: Scaling Agent Evaluation from Afterthought to Default Practice - ZenML LLMOps Database"
  description: "Uber's Agent Platform team faced a critical challenge: while teams had access to evaluation tooling, they weren't using it effectively to drive product insights or ensure quality before production deployment. The problem wasn't a lack of tools but rather adoption barriers including missing observability foundations, complex evaluation setup processes, stale datasets, and engineering-focused workflows that excluded product and design stakeholders. The solution involved making tracing the default in all deployments, automatically generating evaluators from agent configurations and traces, implementing continuous evaluation with proactive alerting, creating human-in-the-loop dataset update workflows, and building UI-friendly evaluation interfaces accessible to non-engineers. This resulted in teams discovering critical issues like unintended intent recognition in their voice booking agent, with conversational designers now updating evaluators weekly, and evaluation evolving from a launch gate into an engine for continuous improvement across Uber's rapidly scaling agent ecosystem."
  canonical: "https://www.zenml.io/llmops-database/scaling-agent-evaluation-from-afterthought-to-default-practice"
  ogTitle: "Uber: Scaling Agent Evaluation from Afterthought to Default Practice - ZenML LLMOps Database"
  ogDescription: "Uber's Agent Platform team faced a critical challenge: while teams had access to evaluation tooling, they weren't using it effectively to drive product insights or ensure quality before production deployment. The problem wasn't a lack of tools but rather adoption barriers including missing observability foundations, complex evaluation setup processes, stale datasets, and engineering-focused workflows that excluded product and design stakeholders. The solution involved making tracing the default in all deployments, automatically generating evaluators from agent configurations and traces, implementing continuous evaluation with proactive alerting, creating human-in-the-loop dataset update workflows, and building UI-friendly evaluation interfaces accessible to non-engineers. This resulted in teams discovering critical issues like unintended intent recognition in their voice booking agent, with conversational designers now updating evaluators weekly, and evaluation evolving from a launch gate into an engine for continuous improvement across Uber's rapidly scaling agent ecosystem."
notion:
  pageId: "3b5f8dff-2538-809b-9437-d641b93c03b9"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:22:00.000Z"
  lastEditedTime: "2026-08-07T12:22:00.000Z"
  publishedAt: "2026-08-07T12:41:34Z"
---

## Overview

Uber's Agent Platform team operates at massive scale, supporting AI agents that serve 200 million consumers, 10 million earners, 1.5 million merchants across over 70 countries. When AI fails in this context, it's not just a metric but directly impacts someone's income or ride experience. The team is responsible for enabling internal and external teams to ship agents daily, from simple productivity tools to customer-facing voice booking systems. The central challenge they addressed was the gap between having evaluation tooling available and teams actually using it to drive meaningful product insights and quality improvements.

The case study reveals a critical insight: the problem with agent evaluation at scale wasn't tooling availability but rather adoption barriers and workflow integration. Teams were building agents first and thinking about evaluation as an afterthought, not because they didn't care about quality, but because when chasing product-market fit and trying to make agents work, it was genuinely difficult to invest deeply in evaluation infrastructure and practices.

## Platform Architecture and Capabilities

The Uber Agent Platform provides a comprehensive suite of foundational capabilities designed to take teams from weekend prototypes to production-ready agents at scale. The platform includes several key components:

- **Model Gateway**: Provides access to various language models with built-in AI guardrails to ensure safe usage
- **AI Registry**: Enables easy access to reusable components including skills and agents, promoting component sharing across teams
- **SDK**: Wraps generalized frameworks to make agent development accessible out of the box while maintaining flexibility
- **Managed Agent Solution**: Handles containerization, identity preservation, and scaling as agents improve
- **Low-Code Agent Builders**: Enables teams without coding expertise to build agents and get started quickly
- **Evaluation Platform**: The critical differentiator between prototypes and production agents

The platform serves a diverse range of customers from operations teams building their first personal productivity agents to help with onboarding, to internal teams creating debugging agents for pipeline failure analysis, to external-facing teams building customer interaction agents for ride booking and other consumer experiences. Despite different levels of technical sophistication, all teams want the same outcomes: speed and quality.

## The Evaluation Challenge

The platform team observed a consistent pattern across all agent builders: teams had access to evaluation platforms, including both custom-built solutions and off-the-shelf tools from vendors like Arize, but there was a significant gap between having tools and actually using them to drive product insights. Several specific barriers emerged:

**Observability Foundation Issues**: Teams lacked a standard way to observe their agents, and when they did set up observability, it typically happened only after agents went live. This created a fundamental problem because observability is the foundation for understanding agent behavior. Teams had disparate logs, often storing only inputs and outputs while missing the complete trajectory of agent actions. When debugging real problems, teams scrambled for answers because they lacked true understanding of what was happening with their agents.

**Path to Insight Friction**: Even with observability in place, the path from data to actionable insights was too complex. Teams had to figure out what datasets to create, which evaluators to write, how often to run them, and where to surface results. This friction was consistent across all types of agent builders.

**Dataset Management**: For teams without datasets, there was paralysis around where to start and how to build the right dataset. For teams that had datasets, when asked when they last updated them, the answers revealed serious staleness problems. Having signals from non-updated datasets can be worse than having no signal at all, as it provides false confidence.

**Engineering-Centric Workflows**: Unlike traditional software engineering where testing is engineering-focused, agent development showed that subject matter expertise lies with product owners, designers, and operations teams closest to customers. However, evaluation platforms were built with engineering-first interfaces and workflows, creating a barrier for the people best positioned to define quality.

## Solutions: Making Evaluation the Default

The platform team's approach centered on removing friction and making evaluation a default part of the workflow rather than something teams had to opt into.

**Observability as Default**: They flipped the script by making observability automatic. With the managed agent solution, as soon as teams press deploy for the first time, they get tracing enabled by default in every environment. Arize spaces are automatically set up with appropriate permissions, eliminating the need for teams to configure something so fundamental. For teams building on code-first SDKs, a config-driven approach enables tracing with just two lines of code change.

**Automatic Evaluator Generation**: Instead of requiring teams to figure out what evaluators to create, the platform automatically generates specific evaluators based on context it already has about the agent, including agent configuration and traces. These evaluators run continuously, and results are surfaced directly in Slack where teams are already working. This solved a critical cold-start problem. Teams that had never heard of "LLM as judge" concepts immediately understood when they received an alert saying their tools contradicted each other 30% of the time, enabling them to lean in and improve their agents.

**Dataset Lifecycle Automation**: For teams without datasets, the platform automatically collects failure cases and creates initial datasets for offline runs, moving teams beyond just "vibing" with their agents. For teams with existing datasets, automated processes collect failures, route them for human annotation, and automatically push annotated examples into offline datasets, making dataset updates a regular occurrence rather than a sticky-note reminder. For teams with complex multi-turn conversational agents, instead of using brittle simulators, the platform pulls the context of the agent along with actual traces so simulations are grounded in real customer experiences.

**UI and Human-Accessible Evaluation**: To bridge the gap between engineers and domain experts, the team made evaluations UI-friendly and accessible to non-technical stakeholders. Integration with Arize allowed teams to visualize their evaluators for the first time. Engineers could shift responsibility for maintaining evaluators to product and design teams who had the domain expertise to define quality. As coding agents became popular, the team leaned heavily into creating skills that made it simple for anyone to interact with their coding agent to understand traces and manage the entire evaluation lifecycle, even without understanding technical details.

## Changing the Questions

Beyond tooling improvements, a critical shift involved rethinking how teams thought about evaluation. The team realized that despite improving onboarding and making evaluation simpler, quality still wasn't improving because evaluation was being used merely as a launch gate. Teams asked "did you hit 90%?" and if yes, they launched, often optimizing for creating datasets that hit the metric rather than learning from evaluation.

The team had deep, sometimes uncomfortable discussions with agent teams about evaluation ownership, processes, and accountability. They brought in industry experts and colleagues from other organizations including Arize to learn what was working in the fast-moving space. They reframed evaluation around different questions:

- Do you trust what your evaluations are telling you?
- If your evaluations regressed in a recent push, would you stop that push?
- How is evaluation changing your roadmap? Have you learned something through evaluation that's actually changing what you're building and why?
- When did you last update your dataset? If it was months ago, it's definitely giving wrong signals
- Could you test a new model like Claude 4.8 in your agent within 24 hours, or would it be a backlog item because it takes too long?

These questions shifted the conversation from compliance to continuous improvement and genuine quality assurance.

## Real Production Impact: Voice Booking Agent

The voice booking agent for riders provides a concrete example of these practices in action. This team is building a voice agent that helps users directly book Uber rides using voice interaction. They had invested in comprehensive offline evaluations that made sense based on their understanding of the problem.

When they went to production, a real scenario occurred: a mother booking a ride to the airport had her child say "I want pizza too" in the background. The agent picked up this utterance and started rerouting to the nearest pizza place. This failure mode would never have been caught by offline evaluations because it wasn't a scenario the team anticipated.

However, the issue was detected because the average turns per session spiked from 4-5 turns to 15-20 turns. This spike triggered an alert, and the team immediately identified the problem and implemented a no-op response for non-booking intents. Critically, this wasn't detected and resolved by an engineer but by a conversational designer who now takes insights from production and updates evaluators and datasets every week. This represents the evolution from evaluation as an engineering afterthought to evaluation as a default practice owned by the people closest to understanding customer needs.

## The Evolution and Future of Evaluation

The presentation describes an evolution at Uber from evaluation as an afterthought, through removing friction and making it default, toward a future where evaluation becomes the engine driving autonomous improvement. The future vision involves:

- Agent builders create V1 and test it with limited users
- Traces automatically capture insights about customer wants and agent behavior
- Failures provide input for agent insights about what should be improved
- Long-running evaluation harnesses run through insights and provide suggestions for agent improvements
- The system automatically creates new agent versions, runs them against offline evaluations, and presents results to builders
- Builders receive concrete proposals: "here's another version that addresses these five issues, here's the results, do you want to deploy it?"

Uber is already building toward this with an evaluation co-pilot that lives on top of rich data including agent configuration, product requirements documents, engineering requirements documents, traces, and evaluation results. Rather than being reactive, this co-pilot proactively helps agent builders understand exactly what's happening in real time before issues escalate to becoming newsworthy incidents.

## Critical Insights and Balanced Assessment

Several important insights emerge from this case study that warrant balanced consideration:

**Organizational Change Over Tooling**: The fundamental insight is that tooling wasn't the real challenge. Many teams already had access to evaluation platforms. The real challenge was making evaluation a default with appropriate workflows and changing how teams thought about evaluation's role. This suggests that organizations adopting LLMOps practices should invest as much in organizational change management and workflow design as in tool selection.

**Context-Specific Automation**: The automatic generation of evaluators based on agent configuration and traces is powerful, but the case study doesn't deeply explore the limitations of this approach. What types of quality issues can be automatically detected versus those requiring human-defined evaluators? How do teams balance automatically generated evaluations with custom quality definitions?

**The Launch Gate Problem**: The observation that teams were optimizing datasets to hit launch metrics rather than genuinely assessing quality is crucial. This mirrors problems in traditional software testing where test coverage becomes a metric to game rather than a genuine quality signal. The solution of changing the questions teams ask is compelling, but sustaining this cultural shift requires ongoing organizational commitment.

**Multi-Stakeholder Ownership**: Making evaluation accessible to product managers, designers, and operations teams is valuable, but also introduces coordination challenges. The case study presents this as purely positive, but questions remain about how conflicts are resolved when different stakeholders have different quality definitions, or how technical debt is managed when non-engineers make evaluation decisions that have technical implications.

**Production-First Detection**: The voice booking example demonstrates the limitations of offline evaluation and the necessity of production monitoring. However, this also means accepting that some failure modes will only be discovered after real users are affected. The case study doesn't extensively discuss the risk management strategies around this reality or how the team decides what types of agents can safely be deployed with primarily production-based learning.

**Scale and Resources**: Uber operates at massive scale with dedicated platform teams, the ability to integrate with vendors like Arize, and resources to build custom tooling. The approaches described may not translate directly to smaller organizations with fewer resources, though the principles around making evaluation default and accessible are likely universal.

**Dataset Staleness**: The emphasis on continuously updated datasets grounded in production failures is important, but also raises questions about dataset drift and whether models are being evaluated against evolving real-world distributions versus static quality definitions. This is presented as unambiguously good, but could also lead to evaluation targets that shift in ways that make it harder to measure long-term quality trends.

The case study represents a mature approach to LLMOps at scale, demonstrating that successful deployment of LLM-based agents requires as much focus on organizational practices, workflow integration, and multi-stakeholder collaboration as on technical tooling. The emphasis on making quality assurance accessible to non-engineers and on evaluation as a continuous learning engine rather than a launch gate represents sophisticated thinking about how AI development differs from traditional software engineering.
