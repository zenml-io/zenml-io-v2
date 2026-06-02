---
title: "Building Self-Learning AI Agents for Site Reliability Engineering, Visual Asset Review, and Software Development"
slug: "building-self-learning-ai-agents-for-site-reliability-engineering-visual-asset-review-and-software-development"
draft: false
llmopsTags:
  - "code-generation"
  - "content-moderation"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "evals"
  - "memory"
  - "harness-engineering"
  - "error-handling"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "cicd"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Cleric / Puntt / Tanagram"
summary: "This case study presents three different production implementations of LLM-based agents: Cleric's self-learning SRE agent that automates on-call incident response, Puntt's visual asset review system for marketing materials compliance, and Tanagram's software factory approach for AI-assisted development. Cleric addresses the challenge of building trust in autonomous incident response by focusing on domain learning through initial system mapping, expert knowledge integration, and learning from past investigations. Puntt tackles the problem of automating brand and regulatory compliance review of visual assets at 95% accuracy for enterprise clients by combining traditional computer vision with LLMs. Tanagram demonstrates how to industrialize software production with agents through foundations optimization, self-verification patterns, evaluation frameworks, cloud-based skills, and thread-based collaboration. All three cases emphasize moving beyond basic LLM capabilities to build reliable, production-grade agent systems."
link: "https://www.youtube.com/watch?v=iD50gwoce5w"
year: 2026
seo:
  title: "Cleric / Puntt / Tanagram: Building Self-Learning AI Agents for Site Reliability Engineering, Visual Asset Review, and Software Development - ZenML LLMOps Database"
  description: "This case study presents three different production implementations of LLM-based agents: Cleric's self-learning SRE agent that automates on-call incident response, Puntt's visual asset review system for marketing materials compliance, and Tanagram's software factory approach for AI-assisted development. Cleric addresses the challenge of building trust in autonomous incident response by focusing on domain learning through initial system mapping, expert knowledge integration, and learning from past investigations. Puntt tackles the problem of automating brand and regulatory compliance review of visual assets at 95% accuracy for enterprise clients by combining traditional computer vision with LLMs. Tanagram demonstrates how to industrialize software production with agents through foundations optimization, self-verification patterns, evaluation frameworks, cloud-based skills, and thread-based collaboration. All three cases emphasize moving beyond basic LLM capabilities to build reliable, production-grade agent systems."
  canonical: "https://www.zenml.io/llmops-database/building-self-learning-ai-agents-for-site-reliability-engineering-visual-asset-review-and-software-development"
  ogTitle: "Cleric / Puntt / Tanagram: Building Self-Learning AI Agents for Site Reliability Engineering, Visual Asset Review, and Software Development - ZenML LLMOps Database"
  ogDescription: "This case study presents three different production implementations of LLM-based agents: Cleric's self-learning SRE agent that automates on-call incident response, Puntt's visual asset review system for marketing materials compliance, and Tanagram's software factory approach for AI-assisted development. Cleric addresses the challenge of building trust in autonomous incident response by focusing on domain learning through initial system mapping, expert knowledge integration, and learning from past investigations. Puntt tackles the problem of automating brand and regulatory compliance review of visual assets at 95% accuracy for enterprise clients by combining traditional computer vision with LLMs. Tanagram demonstrates how to industrialize software production with agents through foundations optimization, self-verification patterns, evaluation frameworks, cloud-based skills, and thread-based collaboration. All three cases emphasize moving beyond basic LLM capabilities to build reliable, production-grade agent systems."
notion:
  pageId: "373f8dff-2538-802e-88b5-cb91f9681930"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:24:00.000Z"
  lastEditedTime: "2026-06-02T07:25:00.000Z"
  publishedAt: "2026-06-02T07:36:26Z"
---

## Overview

This case study presents insights from three different companies building production LLM agent systems, each addressing fundamentally different challenges but sharing common themes around reliability, trust, and operationalization of AI in production environments. The presentations come from practitioners who have been building these systems for multiple years and have moved beyond proof-of-concept to handling real production workloads.

**Cleric** builds a self-learning AI agent for site reliability engineering that aims to automate on-call incident response. Their mission is to free engineers from having to be on call by building an agent that can investigate and resolve infrastructure issues autonomously.

**Puntt** has developed LLM agents that review visual assets for large enterprises, focusing on brand consistency, quality control, and regulatory compliance for marketing materials and packaging. They work with major brands like Nestle and Danone.

**Tanagram** is building what they call a software factory, using agents to accelerate software development at scale. Their team of five engineers ships approximately 40 pull requests per day while maintaining high quality standards.

## Cleric: Self-Learning SRE Agent

### The Trust Problem

Cleric's central challenge is building and maintaining trust in autonomous incident response. They present a compelling example of how agents can fail even when performing most tasks correctly. In their scenario, an alert triggers for Kafka consumer lag spiking to 4,000 messages over two minutes. The agent successfully identifies it as a problem, correctly determines it relates to a Kafka failure, properly navigates to the right systems among 20 different options, and pulls relevant information. However, it then recommends scaling the consumers because of the backlog—which would be wrong. An experienced engineer would know this alert happens every day at the exact same time because the analytics team runs a cron job, and it should be ignored. Despite getting everything else right, this final mistake erodes trust in the system.

This example illustrates a fundamental LLMOps challenge: trust is built slowly through many successful interactions but can be destroyed quickly by a single significant failure, especially when that failure occurs in a critical production context.

### Strategic Focus on Domain Learning

After building their system for approximately two and a half years, Cleric has observed that what was once difficult has become commoditized. Foundation models have improved dramatically, integrations that once took weeks can now be built quickly with tools like Model Context Protocol, agent SDKs are readily available, and evaluation frameworks are accessible. A working demo of most agent systems can now be built in a weekend. This commoditization led them to identify domain learning as the critical differentiator—the hard problem that will distinguish successful production agent systems from demonstrations.

Their key insight is that competing with foundation model labs on public knowledge is a losing strategy. If an agent's differentiation comes from learning publicly available information, that advantage will be short-lived as Anthropic, OpenAI, and other labs will inevitably incorporate that knowledge into model weights. Instead, they focus on private knowledge—the information that lives within teams, the tacit understanding that experienced employees develop over time, the context that explains why a two-year veteran makes different decisions than someone on their first day.

### Three-Phase Learning Framework

Cleric models their agent's learning process on how human engineers onboard at a company, implementing three distinct learning phases:

**Initial Mapping and Homework:** When a new engineer joins, they explore independently—getting laptop access, reading documentation, understanding systems—to build a mental model of the environment. Similarly, Cleric's agent performs upfront mapping of the infrastructure landscape. This serves two critical purposes. First, it dramatically reduces wasted effort during incident response. When an alert fires for the "event processor" service, an agent without this mapping would need to search every system to locate it, generating hundreds of tool calls and consuming massive context. With mapping complete, the agent immediately knows where to look. Second, and more importantly for production reliability, it prevents distraction. Agents are prone to chasing red herrings, investigating every suspicious signal they encounter. By limiting the agent's search space to relevant systems, the initial mapping improves accuracy and focus during high-pressure incidents.

**Expert Knowledge Integration:** Humans learn by identifying experts and engaging in knowledge exchange through one-on-ones and consultations. Cleric implements this through interactive learning where engineers provide feedback to the agent. For example, when the agent suggests scaling consumers for the daily analytics backlog, an engineer can respond: "Don't scale, that's the daily analytics backfill, don't worry about it." The agent should remember and incorporate this feedback. However, a significant nuance has emerged: humans are sometimes wrong. Cleric has experienced cases where they receive a one-out-of-five review for a recommendation, then fifteen minutes later receive a correction: "Sorry, you were right, five out of five." This creates a troubling scenario—what happens when someone gives negative feedback but doesn't bother to correct it later? The agent might learn it did something wrong when it was actually correct. The solution is careful scoping of these learned rules to specific contexts and not treating user feedback as absolute truth that must always be followed.

**Learning from Past Work:** This is identified as the most important phase. Every time an engineer does work, they make mistakes and learn from them, continuously improving. For Cleric, this means reusing prior investigations. When the agent encounters a similar alert to one it handled last week, it should leverage that experience. However, the critical principle here is treating past work as hypothesis rather than fact. If the agent learned that last week's alert was caused by the analytics team's 5:00 PM cron job, it should not assume this is automatically true today. Instead, it should verify: did the analytics team actually run the job at this time, and is that why this problem happened? If verification succeeds, the agent has saved significant time and quickly identified the root cause. If verification fails, it's just a hypothesis that didn't pan out, and the agent moves on to other investigation paths. This approach provides the agent with better decision-making capabilities rather than forcing rigid behaviors based on historical patterns that may no longer apply.

### Measuring Success

Cleric emphasizes the importance of defining concrete success metrics for learning systems. Their primary metric is time-to-resolution: if an investigation with no memory takes eight minutes but with memory takes ninety seconds, the learning is working. If it takes sixteen minutes with memory, the agent has likely learned incorrect or misleading information, signaling a problem with the learning mechanism that needs investigation. This simple metric provides clear feedback on whether the domain learning system is actually improving agent performance or degrading it.

### Architectural Considerations

While the presentation doesn't dive deeply into technical architecture, several LLMOps implications emerge. The agent needs access to approximately 20 different infrastructure systems, requiring robust integration patterns. It operates in a Kubernetes environment monitoring services like Kafka, suggesting significant complexity in tool orchestration. The system must balance autonomous action with human oversight, particularly in high-stakes production environments where incorrect actions could cause outages or data loss. The learning mechanism requires some form of memory storage and retrieval system that can persist knowledge across incidents while maintaining appropriate scope and context boundaries.

## Puntt: Visual Asset Review Agents

### The Problem Space

Puntt addresses a massive but often invisible market: manual review of marketing assets and packaging. Large enterprises like Nestle and Danone produce thousands of marketing materials—advertisements on social media, product packaging, promotional materials—and every single one requires review for brand consistency, quality control, and regulatory compliance. This process involves teams of people reviewing assets manually, taking weeks and costing substantial money. A single mistake that makes it to production can trigger expensive recalls, particularly for regulatory violations.

The problem appears deceptively simple: take brand rules and regulatory requirements, then review marketing materials against them. Many people, when presented with this challenge, believe they can solve it easily. The reality is far more complex.

### The Failure of Naive Approaches

Puntt uses a simplified version of this problem in AI engineering interviews. Candidates receive a set of guidelines and 10-20 assets to review, finding all problems. Most candidates take what Puntt calls the "naive baseline approach"—feeding images and rules directly to a vision-language model and expecting accurate results.

This fails for a fundamental reason: LLMs, even with vision capabilities, are poor at the precise visual analysis required for asset review. Marketing compliance depends on details that foundation models struggle with: exact color values (not approximate shades), precise layout measurements, specific spatial relationships, exact text content and positioning. Vision-language models provide approximate, inconsistent interpretations where precision is paramount. The standard approach leaves too much to the LLM and produces unreliable results that cannot meet the 95% accuracy threshold required for enterprise deployment. This is not a 60% accurate system; errors in regulatory compliance can trigger multi-million dollar recalls.

### Hybrid Architecture: Traditional CV + LLMs

Puntt's production solution combines traditional computer vision and machine learning techniques with large language models in a multi-stage pipeline. This represents a pragmatic LLMOps pattern: recognizing what LLMs do well, acknowledging what they do poorly, and building scaffolding to compensate for weaknesses.

**Deterministic Processing Stage:** The first stage employs pre-ChatGPT computer vision and machine learning techniques as specialized tools:

- **Optical Character Recognition (OCR):** Rather than relying on vision-language models to extract text, especially handwritten text, rotated text, or text in various languages, they use dedicated OCR systems that provide deterministic, accurate text extraction. This is particularly critical for detecting copy errors in multi-paragraph documents where even a single typo must be identified with pixel-perfect precision.

- **Layout Analysis:** Dedicated tools analyze document structure and format—tables, charts, paragraphs, images, icons—providing precise structural understanding that vision models often miss or misinterpret.

- **Color Analysis and Clustering:** Traditional computer vision algorithms perform precise color measurements and clustering, providing exact color values rather than approximate descriptions.

- **Coordinate Extraction:** Systems that can identify the precise XY coordinates of specific phrases or elements, critical for pinpointing issues in complex documents.

These tools run in parallel, each producing specialized outputs with high confidence in their specific domains. The system builds the most accurate interpretation possible using deterministic methods before involving any LLM.

**Reconciliation with LLM:** The outputs from various traditional CV tools may conflict or disagree. An OCR system might extract text, while layout analysis identifies that text as part of a specific chart, and color analysis provides information about the background. A large language model serves as the reconciliation layer, combining these specialized outputs into a coherent, high-confidence representation of the asset. This might involve using overlapping bounding boxes to determine which text belongs to which layout element, or incorporating visual language model understanding alongside the metadata from traditional tools. The LLM's strength in reasoning about ambiguous relationships complements the precision of deterministic tools.

**Review Agent:** Only after establishing a high-confidence interpretation of the asset does Puntt's review agent perform the actual compliance work. This agent ingests the processed representation, identifies relevant guidelines, determines violations, and proposes solutions. The agent might identify that a color needs to change to match brand standards, a layout element needs to move, or a required disclaimer is missing.

**Structured Output for Designers:** The final output is not just a list of problems but includes precise XY coordinates for each issue and timestamps for video content. This allows the system to place exact pins on the asset showing designers exactly where each problem exists—this pixel has the wrong shade of blue, this logo is in the wrong position, this icon is not approved. This visual feedback format matches how designers naturally work and significantly accelerates remediation.

### LLMOps Implications

Puntt's architecture demonstrates several important LLMOps patterns for production systems:

**Tool Orchestration:** The system coordinates multiple specialized tools, each with different latency characteristics, output formats, and error modes. This requires robust pipeline orchestration, error handling, and monitoring.

**Quality Thresholds:** The 95% accuracy requirement for enterprise deployment means the system must implement rigorous evaluation, likely with human review samples, ongoing accuracy monitoring, and mechanisms to flag low-confidence predictions for human review.

**Scalability Considerations:** Processing thousands of assets with multiple CV tools per asset requires significant computational resources. The architecture must handle batch processing, optimize tool execution, and manage costs.

**Model Selection Strategy:** Different foundation models excel at different aspects of visual understanding. Puntt likely experiments across GPT-4 Vision, Claude Sonnet, Gemini, and specialized vision models, potentially routing different tasks to different models based on their strengths.

**Feedback Loop:** When human reviewers correct agent mistakes, this feedback should improve the system. Whether through fine-tuning, few-shot examples, or updated rules, the system needs mechanisms to incorporate corrections.

**Explainability:** For regulatory compliance, being able to explain why the system flagged a specific issue is crucial. The hybrid architecture provides this naturally—the system can point to specific CV tool outputs that triggered each finding.

## Tanagram: Software Factory Patterns

### Industrializing Software Production

Tanagram approaches LLMOps from the perspective of software development itself, asking: as coding agents transition from tab completion to autonomous implementation, how do we move from "vibes-based" adoption to industrialized production? The company was co-founded by an engineer with many years at Stripe, where experience with large-scale engineering complexity shaped their thinking. Their team of five engineers maintains a pace of approximately 40 pull requests per day while maintaining quality, using what they call a software factory approach.

The core premise is that teams face a choice: give into the vibes by installing Cursor, Windsurf, and other tools, running multiple Claude instances, and seeing what happens; or buckle down and industrialize software production by implementing serious guardrails and frameworks. Tanagram advocates for the latter, presenting five key building blocks they've found useful.

### Building Block 1: Hyper-Optimized Foundations

The foundation consists of linters, type checkers, and tests—boring but essential. The critical insight is that these must be extremely reliable and extremely fast because agents run them hundreds of times per day. Slow or flaky foundations create compounding delays and confusion.

Tanagram built a harness to run all three checks locally in parallel, completing within 15 seconds. They track these metrics in PostHog with alerts when performance degrades, treating check performance as a critical production metric. They actively use Claude to maintain these standards: asking it to run checks without cache to get accurate timing, directing it to identify performance regressions, and instructing it to catch issues and suggest improvements.

In one concrete example, they directed Claude to test multiple proposals for optimizing their checks, commit the ones that didn't break anything, and resulted in meaningful speedups. This shipped an improvement where linting dropped from 10 to 5 seconds, type checking from 13 to 9.6 seconds, and test suite from 15 to 13.8 seconds. These appear modest, but multiplied across hundreds of daily agent runs in CI, they compound significantly. This demonstrates a meta-pattern: using agents to optimize the environment in which agents operate.

### Building Block 2: Self-Verification Patterns

Self-verification asks: how can you push agents to verify their own work end-to-end rather than relying solely on unit tests or partial verification? This requires creative thinking about what verification means in different contexts.

Tanagram provides an example from their product called Lore, which collects agent session transcripts. They discovered a bug where Claude Code sessions weren't uploading. Rather than writing mocks or unit tests, they had an agent run their entire stack, launch Claude in a tmux session, actually type commands into Claude, watch logs on the computer, and curl their development API to verify the flow worked end-to-end. This is a complete integration test orchestrated by an agent, verifying the real behavior rather than a mocked approximation.

Another example involves their CLI tool distributed as an npm package with auto-update functionality. When this broke, they debugged by having an agent literally commit changes, push to the repository, merge to main, let CI deploy the new version to npm, run the CLI locally, and verify it picked up the new version. They instructed the agent to automatically merge PRs to main until the issue was fixed. This demonstrates thinking outside traditional constraints: agents aren't limited to writing code in isolation; they can push changes, check package registries, run terminal commands, and orchestrate complex verification flows across multiple systems.

The self-verification building block pushes developers to think creatively about what constitutes real verification rather than accepting the limitations of traditional testing approaches.

### Building Block 3: Evaluation with Self-Improvement

Tanagram emphasizes that evaluation without self-improvement is just a fancy spreadsheet. They use a tool called BitFab (noting this isn't meant as a plug, though they're friends with the team) that includes built-in self-improvement mechanisms. The pattern they call "hill climbing" or what some call "auto research" involves using labeled evaluation data to iteratively improve code until results get better.

The key principle is that an evaluation tool should allow iterating on code using labeled data, providing a feedback loop that enables continuous improvement rather than just measurement. This reflects a broader LLMOps pattern: evaluation systems for agents need tight integration with development workflows, enabling rapid iteration based on eval results rather than treating evaluation as a separate, disconnected process.

### Building Block 4: Cloud Skills

Cloud skills represent plain-English prompts deployed as complete services. Tanagram demonstrates this with a Slack automation that digests and posts daily merged PRs. The implementation required no code—just five sentences in a prompt deployed to run in the cloud.

They highlight several tools enabling this pattern: OpenClaw for obvious reasons, Zo.computer which provides a persistent cloud computer with storage and server capabilities that can be triggered via text or email, and Valet which allows deploying sentences as cloud-based skills. Tanagram uses several of these small automations as deployed Claude skills.

This building block represents a shift in how we think about automation. Rather than writing traditional services with code, infrastructure, and deployment pipelines, certain classes of automation can be described in natural language and deployed directly. This reduces the barrier for operational automation, allows non-engineers to deploy useful tools, and enables rapid experimentation. The LLMOps implications include managing these deployed prompts, versioning them, monitoring their behavior, and handling failures when natural language instructions prove ambiguous or incomplete.

### Building Block 5: Thread-Based Collaboration

Tanagram's product Lore captures agent session transcripts, which they describe as "threads." They include these threads in pull request context, providing information about why features were implemented in specific ways, what approaches were tried and abandoned, what directions engineers provided or deliberately didn't provide to let agents figure out solutions. This context proves valuable for debugging and understanding implementation decisions.

Threads also enable team collaboration. When different team members work on related features or research different aspects of a problem, they can fork threads and continue conversations. In one example, a team member researched different open source strategies, and later that evening another team member forked that thread to continue the exploration, comparing options and introducing additional considerations. This creates a collaborative workspace where agent-assisted work becomes shareable and forkable, similar to how code itself is shared and forked.

The LLMOps implications here involve managing and indexing large volumes of agent transcripts, making them searchable and retrievable, determining what context is relevant for different tasks, and building interfaces that make thread exploration natural for developers. As agents become central to software development, the conversations and explorations they facilitate become artifacts worth capturing, organizing, and leveraging across teams.

### Production Metrics and Monitoring

While Tanagram focuses on building blocks rather than detailed metrics, the implicit theme is treating agent-assisted development as a production system. The PostHog monitoring of foundation check performance, the evaluation with self-improvement loops, the capturing of threads for analysis—all reflect thinking about software factories as systems to be measured, monitored, and continuously improved.

## Cross-Cutting Themes and LLMOps Lessons

### Trust as the Central Challenge

All three cases emphasize trust as fundamental. Cleric explicitly frames their entire learning strategy around building and maintaining trust after seeing how a single mistake destroys confidence. Puntt's 95% accuracy requirement stems from the need for enterprise customers to trust the system with regulatory compliance. Tanagram's emphasis on foundations, self-verification, and evaluation all serve to make agent output trustworthy enough to ship to production at high velocity.

### Hybrid Architectures: LLMs + Traditional Systems

Puntt's combination of computer vision with LLMs and Cleric's approach of giving agents tools for deterministic queries rather than leaving everything to model interpretation demonstrate a crucial pattern: production LLM systems often achieve reliability by combining LLM strengths (reasoning, ambiguity handling, natural language understanding) with traditional systems' strengths (precision, determinism, speed). Pure LLM solutions may work for demos but rarely meet production requirements.

### Learning and Adaptation

All three systems implement learning mechanisms, though with different approaches. Cleric builds explicit domain learning into their agent architecture. Puntt's system likely improves through feedback on flagged issues. Tanagram's evaluation with self-improvement enables their software factory to continuously enhance performance. This reflects a shift from static AI systems to adaptive ones that improve with use.

### Operational Complexity

These production systems involve significant operational complexity: orchestrating multiple tools and models, managing context across long-running investigations or review processes, handling failures gracefully, monitoring performance and accuracy, managing costs, and providing visibility into agent decision-making. None of these cases suggest that deploying LLM agents is simple; rather, they demonstrate the engineering discipline required to make them reliable.

### Human-Agent Collaboration

Rather than full automation, all three cases show agents working alongside humans. Cleric's agents receive feedback from engineers. Puntt's system produces outputs for designers to act upon. Tanagram's threads enable developers to collaborate with and through agents. The most successful production implementations seem to enhance human capabilities rather than attempting complete replacement.

### Context is Everything

Private knowledge, domain-specific understanding, and organizational context emerge as critical. Cleric's insight that competing on public knowledge is futile and the focus must be on private, team-specific knowledge captures a broader truth: generic LLM capabilities commoditize quickly, and differentiation comes from deeply understanding specific contexts, domains, and use cases.

These three cases collectively paint a picture of LLMOps maturity: moving beyond demos and proofs-of-concept to systems that reliably operate in production, handle edge cases, maintain trust through consistent performance, and provide measurable business value while managing the significant complexity that production agent systems entail.
