---
title: "Building Durable AI Systems at Enterprise Scale Through Three Layers of Discipline"
slug: "building-durable-ai-systems-at-enterprise-scale-through-three-layers-of-discipline"
draft: false
llmopsTags:
  - "healthcare"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "cost-optimization"
  - "system-prompts"
  - "mcp"
  - "evals"
  - "fallback-strategies"
  - "monitoring"
  - "cicd"
  - "devops"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "crewai"
industryTags: "healthcare"
company: "CVS Health"
summary: "CVS Health faced the common challenge of moving AI initiatives from impressive demos to production systems that deliver measurable value. Their engineering and architecture teams identified that the constraint was never model capability but rather the discipline and infrastructure surrounding the models. They developed a three-layer framework encompassing personal productivity tools, cross-team collaboration and process improvements, and validation and observability systems. This approach enabled dramatic improvements including shipping a four-week feature in a day and a half, completing a legacy rewrite in one month instead of six to nine months, and teams consistently running at higher than traditional velocity averages. The framework emphasizes evaluation harnesses, cost-per-outcome economics, and measurable business KPIs, particularly important for their regulated healthcare environment where failures carry asymmetric risks."
link: "https://www.youtube.com/watch?v=QouXw0aWlrw"
year: 2026
seo:
  title: "CVS Health: Building Durable AI Systems at Enterprise Scale Through Three Layers of Discipline - ZenML LLMOps Database"
  description: "CVS Health faced the common challenge of moving AI initiatives from impressive demos to production systems that deliver measurable value. Their engineering and architecture teams identified that the constraint was never model capability but rather the discipline and infrastructure surrounding the models. They developed a three-layer framework encompassing personal productivity tools, cross-team collaboration and process improvements, and validation and observability systems. This approach enabled dramatic improvements including shipping a four-week feature in a day and a half, completing a legacy rewrite in one month instead of six to nine months, and teams consistently running at higher than traditional velocity averages. The framework emphasizes evaluation harnesses, cost-per-outcome economics, and measurable business KPIs, particularly important for their regulated healthcare environment where failures carry asymmetric risks."
  canonical: "https://www.zenml.io/llmops-database/building-durable-ai-systems-at-enterprise-scale-through-three-layers-of-discipline"
  ogTitle: "CVS Health: Building Durable AI Systems at Enterprise Scale Through Three Layers of Discipline - ZenML LLMOps Database"
  ogDescription: "CVS Health faced the common challenge of moving AI initiatives from impressive demos to production systems that deliver measurable value. Their engineering and architecture teams identified that the constraint was never model capability but rather the discipline and infrastructure surrounding the models. They developed a three-layer framework encompassing personal productivity tools, cross-team collaboration and process improvements, and validation and observability systems. This approach enabled dramatic improvements including shipping a four-week feature in a day and a half, completing a legacy rewrite in one month instead of six to nine months, and teams consistently running at higher than traditional velocity averages. The framework emphasizes evaluation harnesses, cost-per-outcome economics, and measurable business KPIs, particularly important for their regulated healthcare environment where failures carry asymmetric risks."
notion:
  pageId: "3b5f8dff-2538-8092-ac9f-d3056b832925"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:25:00.000Z"
  lastEditedTime: "2026-08-07T12:25:00.000Z"
  publishedAt: "2026-08-07T13:25:03Z"
---

## Company and Use Case Overview

CVS Health's architecture and AI enablement teams, led by Matt Turner (Lead Director of Architecture) and Logan Kur (Executive Director of Engineering and AI Enablement), present a comprehensive framework for moving AI systems from demo to durable production deployment in a regulated healthcare environment. The organization spent several years iterating on approaches to operationalize AI systems, experiencing both failures and successes that informed their current practices. Their primary challenge mirrored what many organizations face: numerous AI pilots and impressive demos that never materialized into production systems delivering measurable value. The team observed a critical insight early in their journey: model capability was never the bottleneck. Instead, the surrounding discipline, infrastructure, and organizational practices determined success or failure.

The results they achieved demonstrate the effectiveness of their approach. One team shipped a feature that would traditionally require four weeks in just a day and a half from idea to production. A legacy system rewrite that would typically consume six to nine months was completed in one month. Multiple teams consistently operated at velocities higher than their traditional averages, while others maintained their existing pace, indicating sustainable rather than temporary gains.

## The Three-Layer Discipline Framework

CVS Health's approach centers on recognizing three distinct but interconnected layers of discipline within an AI-native software development lifecycle, each with its own failure modes, metrics, and requirements for success.

### Layer One: Personal Productivity

The first layer focuses on individual developer productivity, typically where most organizations begin and, critically, where many remain stuck. This layer involves coding tools and AI assistants that make individual engineers faster. CVS Health implemented several key practices at this layer.

They developed and deployed MCP servers that connect directly to tooling infrastructure including source control and ticketing systems. These integrations reduce friction between developers and their work by providing AI systems with direct access to organizational context and workflows.

One of their most significant innovations at this layer is a custom skill called Clarify. This tool addresses a fundamental challenge in software development: ensuring alignment of intent between engineering, product, and other stakeholders before any code is written. Clarify operates as part of a spec-driven development approach where the specification becomes the source of truth rather than just a prompt. These specs include structured requirements, edge cases, acceptance criteria, and educational context. The AI agent executes from this specification, but importantly, the process forces the engineer to deeply understand what is being built before construction begins. The spec serves both the agent and the human engineer.

A critical insight from their work at this layer is that well-formed specs compound over time. As the library of specifications grows, new features become faster to scaffold and easier to validate, creating a flywheel effect. This requires upfront investment but produces accelerating returns. The team has experimented with building prototypes live in stakeholder meetings, validating ideas in real-time before committing to full development. This capability transforms the economics of validation and reduces wasted effort on features that don't serve actual needs.

The failure modes at Layer One are instructive. Coding without understanding represents a primary risk, where engineers deploy code they don't fully comprehend or approve code without reviewing the underlying spec and intent. The responsibility for understanding what the agent builds, not just verifying that it compiles, remains firmly with the engineer. Test validation presents another critical failure point. AI systems can generate tests that confirm their own output, creating an illusion of coverage without actual validation. Human validation of both tests and their intent remains essential.

Task scope emerges as another failure mode. When too much context or complexity is provided, agents lose coherence, and humans lose confidence in the output. Breaking work into smaller, executable chunks that AI can consume becomes necessary. Interestingly, AI can assist in this decomposition process. While multi-agent workflows can tackle larger projects, they introduce their own complexities that require careful orchestration.

Tool sprawl represents the final major failure mode at this layer. When every team selects different tools, practices don't transfer across the organization, and gains don't compound. The goal isn't standardization for its own sake but rather creating conditions where learning and practice accumulate across teams and time.

### Layer Two: Collaboration and Process

Once individuals move faster, the constraint shifts to team coordination and cross-team alignment. Layer Two addresses the organizational and process challenges that emerge when individual velocity increases.

A foundational requirement at this layer is documentation of tribal knowledge. Everything residing in people's heads must be externalized and documented for AI systems to access and leverage. This includes system intent, design decisions, contracts, and dependencies. The documentation must be accessible to both humans and agents.

Specifications at Layer Two serve a different function than at Layer One. They become durable shared artifacts that align engineering, product, and design teams in real time. Gaps are identified and addressed before they become rework. Importantly, CVS Health emphasizes that specs should not aim for perfection but rather be good enough to enable rapid iteration. Keeping work in small chunks facilitates fast iteration cycles.

Explicit dependency mapping becomes critical at this layer. If an agent doesn't understand what its changes will break, it will break those things. Dependency maps provide both humans and agents with clear pictures of system connections before changes are made. Skipping this discipline results in spending more time cleaning up failures than was saved through AI acceleration.

A significant shift at Layer Two involves fewer handoffs and more parallel work. AI compresses the distance between roles, and traditional boundaries between product, design, and engineering begin to blur. The concept of everyone becoming builders rather than maintaining strict role separations emerges from this compression.

The failure modes at Layer Two reflect organizational rather than technical constraints. Undocumented systems hit a ceiling quickly. If system knowledge exists only in human memory, AI cannot access it, and all gains from Layer One evaporate the moment an agent needs unavailable information. Individual velocity that outpaces cross-team alignment creates new bottlenecks. Features built in hours can stall for weeks because validation processes, user feedback loops, or downstream teams cannot keep pace.

A critical insight is that AI doesn't automatically fix how teams plan and depend on each other. Silos don't disappear simply because AI is introduced. Instead, AI amplifies existing patterns, both positive and negative. If coordination is already painful, moving faster on each side simply causes collisions to happen sooner. Organizations must deliberately address coordination and communication patterns rather than assuming AI will solve these challenges.

### Layer Three: Validation and Observability

Higher levels of autonomy represent the goal for most AI implementations, but CVS Health emphasizes that autonomy must be earned through demonstrated reliability and comprehensive observability. Layer Three provides the foundation for safe, autonomous operation.

Test coverage forms the first pillar, but not coverage for its own sake. The organization focuses on deterministic, human-validated tests that catch real failures. AI can help write tests and surface what tests should exist, but humans must remain in the loop to validate that tests verify the right behaviors. This addresses the common anti-pattern of managers demanding 100% coverage regardless of test quality.

Production observability focuses on understanding what a deployment changed in terms of behavior, not just code. As code review shifts from examining individual lines to assessing behavioral intent, observability systems must capture and expose behavioral changes. Canary rollouts, error rate dashboards, and rollback capabilities enable teams to move fast without operating blind.

Evaluation of agent outputs represents a unique challenge at this layer. While deterministic pipelines can catch failures in traditional code, agentic workflows with non-deterministic agents require non-deterministic checks alongside them. The question shifts from whether code compiles to whether the output actually accomplished the intended goal.

User validation represents a frequently skipped discipline. Shipping faster only matters if what's shipped addresses actual user needs and wants. Speed without fast feedback loops from users generates waste rather than value. CVS Health emphasizes building user validation into the development cycle rather than treating it as a post-deployment afterthought.

The failure modes at Layer Three are consequential. Without good monitoring and observability, the dramatic increase in development volume from Layers One and Two creates bottlenecks throughout the system. Teams may want to automate pull requests but lack the observability to do so safely. The autonomy ceiling is set by maturity and discipline, not by enthusiasm or executive mandate.

In regulated healthcare environments, the stakes are particularly high. Undetected failures don't just create UX bugs; they become compliance events with notification obligations. Explainability, audit trails, and the ability to account for system behavior aren't optional. When something goes wrong and the organization cannot explain why, the problem transcends technical concerns and becomes regulatory. The asymmetry of consequences in regulated environments means that false positives and false negatives carry dramatically different costs, and exposing protected data isn't a bug to patch but a breach with legal implications.

## Enterprise Durability: Evals, Economics, and Outcomes

Beyond the three-layer framework for development velocity, CVS Health identifies three disciplines that separate demos from durable ROI: evaluations, economics, and outcomes. These disciplines are typically skipped not because teams are unaware of them but because they don't feel urgent until something goes wrong, at which point teams are rebuilding under pressure.

### Evaluations

CVS Health positions evaluations as equivalent to unit tests in software engineering. Teams wouldn't ship code without tests, and they shouldn't ship agents without evaluation harnesses. Evaluations must exist before the agent, not after. The harness includes golden data sets, regression suites, and continuous monitoring in production.

Evaluations answer two critical questions: Is it good enough? And is it still good enough? The second question proves more challenging because models drift, data drifts, and users drift. Without the ability to track how evaluation scores change over time, particularly over 30-day windows, organizations cannot determine if their agents still reliably perform their intended functions in production. Building the evaluation harness before building the agent makes the agent easier to evolve rather than harder. This eval-first, agent-second approach transforms interesting demos into systems with known behavioral characteristics in cases that matter.

### Economics

Token economics matter, but CVS Health argues that cost per token represents the wrong unit of measurement. The correct unit is cost per outcome. A cheaper model that creates more retries, more rework, more escalations, or more review burden is more expensive at the workflow level. Organizations may save pennies on inference costs while adding dollars to cleanup processes.

The right economic questions involve per-feature ceilings, fallback paths, and observability on spend. These prepare organizations for finance conversations before they become urgent. The economic discipline answers whether the organization can afford a solution at enterprise scale, not just at pilot scale. This distinction proves critical because many solutions that appear economically viable in pilots become unsustainable when scaled to full production workloads.

### Outcomes

Organizations should tie AI spend to business KPIs from day one, not after 90 days of operation. Relevant metrics include cost per transaction, cycle time, error rate, and time to resolution. If you cannot draw a line from the model to a KPI on a whiteboard in a single attempt, you don't yet have ROI. This clarity matters because demos aren't the same as deployment, and deployment isn't the same as durability.

The discipline requires defining success metrics in business terms before building anything. Relevant metrics might include cycle time, throughput, documentation turnaround time, or error rate against a rubric. If you cannot write the metric down in one sentence before starting, you won't be able to defend the investment after finishing. The metric must exist before the model.

Cost tracking should focus on cost per outcome rather than cost per model. This means tying spend to the workflow metric the initiative is supposed to move, such as cost per resolved inquiry, cost per processed document, or cost per completed task. These straightforward, immediate ROI metrics enable justification and represent the only numbers that reveal whether investments are paying off. Making finance a partner early in the process rather than when bills arrive becomes essential.

## Lessons from a Year of Production Operation

CVS Health's lessons from over a year of running production AI systems focus entirely on the systems around models rather than model selection itself. These lessons provide pragmatic guidance for organizations building durable AI capabilities.

Data remains the foundation. Poor data hygiene compounds at scale. A messy column that a human analyst can navigate around becomes a confident wrong answer when an agent touches it. Cleanup work that organizations have deferred for years suddenly becomes critical path work because if data isn't ready, AI isn't ready for production.

The model will consume the stack. Every year, layers built the previous year as scaffolding, orchestration, retrieval, or routing become single API calls in the next year. Even within weeks, capabilities emerge as model features. Organizations should build what survives: data, workflow design, evaluations, and trust fabric. They should stop building plumbing that models will obsolete and start building what models will never provide independently.

Picking the right problems proves critical and has humbled the CVS Health team repeatedly. AI often represents a small part of a larger workflow, and automating one step just moves the bottleneck rather than removing it. They observed examples where Team A's agent running 24/7 buried Team B in downstream tasks, making the overall process faster in one place but slower overall. The lesson is to automate systems, not individual steps. While automating low-hanging fruit is tempting, it simply shifts bottlenecks elsewhere. Taking a step back, sitting down with teams, understanding complete workflows, and then prioritizing automation yields better results.

Quality in, quality out. Good prompts, relevant context, and clean source material haven't stopped mattering. They matter more because models amplify whatever they're fed, including noise. Organizations should bake ROI measurements into intake processes. If use cases don't have ROI mapped out, they're not ready for production and definitely not ready to scale.

Explainability is non-negotiable for moving from interesting capability to deployable system. Organizations must build this bridge or remain on the demo side of the divide. If you cannot explain the decisions and actions of agents, you cannot improve them. In regulatory environments, explainability becomes mandatory.

Governance should be built as a practice, not a checkbox or one-time approval. Without active governance, organizations experience duplicated work across teams, siloed wins that never compound, and unclear data boundaries that surface later as incidents. The thread running through all these lessons is that the model represents the cheap part. The discipline around the model is what costs organizations and what pays them.

## Regulated Environment Considerations

In regulated environments, failure modes are asymmetric. A bug in a consumer application might cost a retry, but the same failure in a regulated workflow can trigger a regulatory event with notification obligations. Guardrails aren't just a layer; they become the architecture.

CVS Health implements guardrails in two complementary layers: mechanical and text-based. Both are necessary; either alone creates a false sense of security.

Mechanical guardrails are deterministic and code-enforced. They combine deterministic checkpoints with non-deterministic evaluations and implement hard checks on any data that shouldn't leave the system. Service accounts are scoped down to only what agents strictly need. If an agent hallucinates and attempts something inappropriate, it shouldn't have had access in the first place. Audit trails capture every action, making systems defensible when questions arise. Fallback paths to human review trigger the moment confidence drops. Mechanical guardrails define what agents are physically allowed to do in production.

Text-based guardrails consist of documented constraints: what agents must do, what they may do, what they should do, and what they should not do. Everything is written down rather than assumed. BDD-style acceptance criteria enable reviewers to evaluate intent rather than just code diffs. Layered review examines intent first and implementation second. Human-in-the-loop checkpoints engage where regulatory stakes are high, but human-in-the-loop only counts if the loop is designed, specifying which human, at what step, with what evidence, and with what authority. Explainability is built in at every output, traceable to a rule or source. Text-based guardrails define what agents are trying to do and whether that can be determined.

The asymmetry that organizations must internalize when operating in regulated spaces is that false positives and false negatives carry different costs, often regulatory ones. Exposing protected data isn't a cost; it's a breach. Audit trails aren't optional nice-to-haves but requirements. Explainability isn't just good engineering; it's how trust is maintained with practitioners who must use systems. Governance enables scaling because without it, every new use case starts from zero. In unregulated environments, teams can move fast and fix what breaks. In regulated environments, what breaks cannot always be fixed, requiring different design approaches.

## Final Implementation Guidance

CVS Health's final guidance emphasizes pragmatic implementation over ambitious but unrealistic goals. Organizations should pick one workflow at each layer rather than trying to boil the ocean. Three concrete bets beat thirty weak pilots every time.

Success metrics must be defined in business terms before building, focusing on measures like cycle time, throughput, documentation turnaround time, or error rate against a rubric rather than subjective assessments like whether users liked something. If you cannot write the metric down in one sentence before starting, you won't be able to defend the investment after finishing. The metric exists before the model, always.

Organizations should build evaluation harnesses before building agents. In regulated environments, this isn't a nice-to-have but how the right to deploy to production is earned. The harness transforms interesting demos into systems with known behavioral characteristics. Building evaluation first makes agents easier to evolve, not harder. The sequence must be eval first, agent second, never the reverse.

Cost tracking should focus on cost per outcome rather than cost per model, tying spend to the workflow metric the initiative is supposed to move, such as cost per resolved inquiry, cost per processed document, or cost per completed task. These straightforward, immediate ROI metrics enable justification and represent the only numbers that reveal whether investments are paying off. Finance should be made a partner in this conversation early, not when bills arrive.

When coding agents change development velocity, they change what review means. This same shift impacts every layer of the organization. When agents produce work at machine speed, review becomes the new bottleneck. The question organizations should take away isn't whether they can automate something but whether they should automate it, how they will know if it's working, and how they will stop it if it isn't.

Durable AI ROI comes from matching the right use case to the right layer and then measuring the right outcome with the right discipline. This framework, developed through years of iteration, failure, and learning at CVS Health, provides a roadmap for organizations seeking to move beyond impressive demos to production systems that deliver sustained business value in regulated environments.
