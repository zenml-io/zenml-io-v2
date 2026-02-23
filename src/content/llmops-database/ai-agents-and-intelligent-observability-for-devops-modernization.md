---
title: "AI Agents and Intelligent Observability for DevOps Modernization"
slug: "ai-agents-and-intelligent-observability-for-devops-modernization"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "699c0be374102b1a846a33f0"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-23T08:21:37.938Z"
  lastUpdated: "2026-02-23T08:21:37.938Z"
  createdOn: "2026-02-23T08:12:19.709Z"
llmopsTags:
  - "customer-support"
  - "code-generation"
  - "summarization"
  - "chatbot"
  - "data-analysis"
  - "realtime-application"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "evals"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "cicd"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "langchain"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "amazon-aws"
industryTags: "tech"
company: "HRS Group / Netflix / Harness"
summary: "This panel discussion brings together engineering leaders from HRS Group, Netflix, and Harness to explore how AI is transforming DevOps and SRE practices. The panelists address the challenge of teams spending excessive time on reactive monitoring, alert triage, and incident response, often wading through thousands of logs and ambiguous signals. The solution involves integrating AI agents and generative models into CI/CD pipelines, observability workflows, and incident management to enable predictive analysis, intelligent rollouts, automated summarization, and faster root cause analysis. Results include dramatically reduced mean time to resolution (from hours to minutes), elimination of low-level toil, improved context-aware decision making, and the ability to move from reactive monitoring to proactive, machine-speed remediation while maintaining human accountability for critical business decisions."
link: "https://www.infoq.com/presentations/devops-modernization-ai-agents"
year: 2026
---

## Overview

This panel discussion from InfoQ Live (February 2026) features engineering leaders from multiple organizations discussing the practical application of AI and LLM technologies in production DevOps and SRE environments. The panelists include Patrick Debois (co-creator of DevOps movement, now at Tessl), Mallika Rao (platform engineering leader at Netflix), Olalekan Elesin (VP of Engineering at HRS Group and AWS Machine Learning Hero), and Martin Reynolds (Field CTO at Harness). Together they provide a comprehensive view of how organizations are moving beyond traditional monitoring toward AI-augmented incident response, deployment automation, and intelligent observability.

The discussion is grounded in real production experiences rather than theoretical promises, with panelists offering balanced perspectives on both the capabilities and limitations of AI in operational contexts. A recurring theme is that while AI agents and LLMs can significantly accelerate certain workflows, they require solid operational foundations, rich context, and clear boundaries around human accountability.

## Core Problems Being Addressed

The panelists identify several critical pain points in modern DevOps practices where human attention is being wasted. First is the overwhelming volume of alerts and monitoring signals that teams must triage, often numbering in the thousands per day. Engineers spend enormous amounts of time answering basic questions like "Is this signal real?", "Is it new?", "Is it customer impacting?" This triage burden represents not just investigation time but the cognitive tax of uncertainty—the ambiguity around what is actually happening in complex distributed systems.

Second is the challenge of incident response, particularly the 3 a.m. pages that require engineers to dig through logs, trace distributed transactions, and correlate events across multiple services. As Mallika Rao explains, in large-scale distributed systems at Netflix, small mistakes can have massive customer impact, making rapid and accurate diagnosis critical. The traditional approach of manually sifting through logs and metrics is both time-consuming and error-prone, especially under pressure.

Third is the communication and documentation burden that accompanies outages. When significant incidents occur, there's not just the technical remediation work but also the need to summarize what happened, communicate status to stakeholders, document timelines, and produce post-mortems. These activities, while essential, consume significant engineering time that could be better spent on prevention and improvement.

## AI and LLM Integration Approaches

The panelists describe several distinct ways AI is being integrated into production operations. Martin Reynolds discusses Harness's implementation of continuous verification using machine learning to establish baseline behaviors for applications. The system learns what "good" looks like during deployments—which errors are expected, what metrics normally appear—and only alerts when deviations from this learned baseline occur. This ML-based approach differs from generative AI but represents an important foundation layer that reduces false positives and eliminates the need for engineers to babysit deployments.

On the generative AI side, the panelists emphasize using LLMs for context synthesis and explanation rather than just pattern recognition. Patrick Debois notes that while traditional ML/AIOps was good at time series analysis and predictions, it lacked the ability to explain findings. GenAI fills this gap by providing natural language explanations, correlating disparate data sources, and building hypotheses about root causes. The combination of predictive ML with explanatory GenAI creates a more powerful operational toolkit.

A concrete example comes from Olalekan Elesin, who describes his workflow for handling production failures. He treats AI agents like junior engineers, providing them with logs from CloudWatch, context about the codebase, and instructions to identify the root cause. The AI analyzes thousands of log lines, identifies the failure point, suggests fixes in the application code, and can even create pull requests with the proposed changes. What might have taken 5-15 hours of manual debugging can be completed in minutes. Critically, this isn't blind automation—the senior engineer reviews the AI's reasoning and proposed fix before approving.

## Context Engineering and Model Context Protocol

A major theme throughout the discussion is the importance of context for effective AI assistance. The panelists consistently emphasize that AI agents can only be as good as the information they have access to. Martin Reynolds articulates this clearly: to get the most out of AI, organizations need solid fundamentals in place—up-to-date documentation, clear service dependencies, well-maintained runbooks, standardized deployment processes, and comprehensive observability. This is the same information you'd provide to onboard a new human engineer.

Olalekan Elesin discusses the practical implementation of context engineering using Model Context Protocol (MCP) servers. These can connect to various data sources—code repositories, documentation systems like Confluence, and observability platforms—to provide rich context to the LLM. When investigating an incident, the AI first builds understanding of the repository structure, then pulls relevant documentation, and finally accesses time-series event data from monitoring systems. This multi-source context enables much more accurate diagnosis than simply feeding raw logs to an LLM.

The panelists note that modern LLMs with million-token context windows have shifted the focus from retrieval-augmented generation (RAG) to what Elesin calls "context engineering"—deliberately structuring and providing comprehensive context upfront rather than retrieving snippets on demand. Patrick Debois adds that this context shouldn't be siloed in operations but should be shared with development teams, allowing operational knowledge to "shift left" into the coding phase through IDE-integrated agents that have access to runbooks and operational standards.

## Agentic Workflows for Incident Management

Mallika Rao shares valuable lessons from Netflix's implementation of AI-driven analysis for canary rollouts in distributed systems. The initial approach used ML models to flag elevated risk based on subtle metric shifts across regions during deployments. However, they discovered the model consistently missed failures that only appeared in shadow canaries—environments where traffic patterns and downstream dependencies didn't fully mirror production. The issue wasn't the model's accuracy but an assumption mismatch about what constituted representative production conditions.

This experience led to a critical insight about trust in AI systems: trust comes from explanation, not just accuracy. The breakthrough came when they changed the operating model to make AI recommendations visible before taking any automated actions. The system was required to cite specific signals and provide reasoning. Engineers could explain what the AI was doing, which built organizational confidence. This represents a maturity model for AI adoption—start with explanation and recommendation, build trust through transparency, and only then move to automation for well-understood scenarios.

The panelists describe a four-phase approach to AI in incident management, drawing from Google's internal SRE practices: alert paging, mitigation, root cause analysis, and post-mortem. AI can participate in all four phases but shouldn't necessarily own all of them. For paging, agents can deduplicate alerts, route intelligently, and enrich notifications with context. For mitigation, they can execute well-defined, reversible, policy-governed actions in known scenarios. For root cause analysis, they can synthesize timelines, correlate events, and propose hypotheses. For post-mortems, they can draft initial reports, pull relevant metrics, and suggest follow-up actions. However, the panelists are unanimous that accountability and final decisions must remain with humans.

## Trust, Governance, and Human-in-the-Loop

The discussion delves deeply into when AI should act autonomously versus when humans must remain in the loop. Patrick Debois frames this as a risk management question that predates AI—even with traditional DevOps automation, teams had to decide whether to automatically reboot systems or restore databases. The decision depends on how predictable the procedure is, how well-known the states are, and what the blast radius of a wrong decision would be. For AI, the same principles apply: if it's a known state with reliable automation and acceptable failure mitigation, autonomous action may be appropriate.

Martin Reynolds emphasizes that the machine can correlate, summarize, suggest remediation from runbooks, and potentially execute safe actions like scaling up resources, rolling back deployments, or toggling feature flags—actions that are reversible and bounded. Humans should own decisions with customer or business impact, SLA/SLO tradeoffs, irreversible changes (like data migrations), destructive operations, and escalation decisions. The human provides accountability and interprets nuanced business context that may not be codified in any system.

Mallika Rao adds that the most valuable human contribution during incidents is decision-making under uncertainty with incomplete information. When a high-traffic system experiences slowly creeping latency across multiple services, AI can quickly correlate configuration changes, partial rollouts, or downstream queue buildups. But the machine cannot decide the mission-critical tradeoff: Do we roll back and risk losing an important fix? Do we shed load from certain regions? Do we accept short-term degradation for more recovery time? These value-laden decisions require human judgment about customer promises, business priorities, and risk tolerance.

The panelists describe a maturity progression for AI trust: start with read-only access where AI provides recommendations, then move to deterministic workflows where AI triggers known-good automations, and finally to more autonomous action for well-proven scenarios. This mirrors traditional DevOps practice where humans approve changes many times before removing themselves from the loop. Critical is that even autonomous AI actions should provide detailed explanations—for example, when fixing a security vulnerability via automated PR, the commit message should explain what was changed and why, enabling meaningful human review.

## Practical Implementation Guidance

For teams starting their AI journey in DevOps, the panelists offer concrete, actionable advice. Olalekan Elesin recommends beginning by identifying what you'd ask a junior engineer to do—tasks that are time-consuming but not necessarily complex. A practical first project: take logs from a recent incident, place them in a markdown file, provide them to an LLM in your IDE along with code context, and ask it to explain what happened and why. This simple exercise can demonstrate value immediately while building familiarity with the technology.

Mallika Rao suggests picking one painful operational workflow and making it explainable before automating it. For instance, choose a recent incident and use AI to auto-generate timeline summaries, correlate deploys with logs, and tag relevant signals. Focus on automating understanding before automating actions. This builds organizational trust because stakeholders can see AI explaining what it sees before being allowed to act on that information.

Martin Reynolds advises finding your personal frustration—the task that causes you the most pain—and solving for that first. Once you've proven AI can help with your specific problem, then consider how to codify that solution and make it work reliably at scale. He also emphasizes getting observability basics correct: comprehensive logging, distributed tracing across services, correlation IDs that follow requests through your system. Without these fundamentals, AI has insufficient data to provide valuable insights.

Patrick Debois takes a different angle, recommending that engineers spend time with conversational AI tools like Claude or ChatGPT outside their IDE first, learning how to ask effective questions, provide context, and refine outputs through iteration. These tools learn from how you interact with them, and developing skill in prompt engineering and context provision translates directly to more effective use of AI in production workflows. Understanding how to correct and guide AI responses is foundational before embedding it into critical operational processes.

## Organizational Change and Stakeholder Buy-In

The panelists address the organizational challenges of AI adoption, recognizing this is as much a people and process problem as a technical one. Olalekan Elesin emphasizes starting with the pain point that matters most to business stakeholders. He recommends using AI itself to help craft an adoption strategy—providing organizational context to an LLM and asking it to outline what's needed to gain stakeholder buy-in, then refining that output with specific business context. The key is working backwards from customer value and demonstrating concrete outcomes through proof-of-concepts rather than pitching abstract capabilities.

Mallika Rao echoes this outcome-focused approach: instead of leading with "we're building an AI strategy for DevOps," start with a concrete problem like "we're reducing mean time to understand incidents" or "we're preventing unsafe rollbacks." Skeptics buy in when AI is tied to metrics they already care about—customer impact minutes, mean time to resolution, deployment frequency and safety. The conversation shifts from "why should we do this" to "how should we do this" when framed around existing pain points.

Patrick Debois adds historical perspective from the DevOps movement: solutions don't sell unless people feel the pain. If leadership doesn't perceive downtime as problematic or thinks current incident response is acceptable, AI-driven improvements won't resonate. However, competitive pressure matters—in two years, competitors using AI for operations may deliver better service and reliability. For domains where this matters, tapping into felt pain is critical for gaining attention and resources.

The panelists recommend structuring an AI strategy around three components from Richard Rumelt's framework: diagnosis (what pain exists that's relevant to customers and business), guiding policies (what principles will govern AI use), and coherent actions (specific initiatives backed by proof-of-concepts). Engaging the stakeholders who feel the pain most acutely, demonstrating value through small wins, and maintaining transparency about AI decision-making all contribute to sustainable organizational adoption.

## Technical Considerations and Limitations

Throughout the discussion, the panelists maintain a balanced view of AI capabilities and limitations. They note that modern LLMs have become remarkably powerful, with context windows expanding from thousands to millions of tokens, enabling comprehensive analysis of entire codebases, log files, and operational documentation. However, this doesn't mean AI can compensate for poor operational practices or lack of documentation. If your infrastructure is managed by poorly documented bash scripts and tribal knowledge, AI won't magically solve those problems—it will simply struggle with the same lack of context that human engineers face.

The panelists also acknowledge that LLMs aren't necessarily good at time series analysis or traditional anomaly detection—that remains the domain of classical ML and statistical methods. The value of GenAI lies in synthesis, explanation, correlation across disparate data sources, and natural language interaction. The most powerful operational AI combines predictive ML for anomaly detection with generative AI for contextual explanation and remediation guidance.

There's also discussion of determinism and safety. Patrick Debois notes that while GenAI responses may have some variability, the automated actions taken in response can and should be deterministic. Workflows should be designed so that given certain validated criteria, the system cannot take an incorrect action. This layered approach—probabilistic analysis feeding into deterministic, bounded actions—provides safety guardrails around AI autonomy.

## Future Directions and Industry Trends

The panelists reference several emerging patterns and technologies shaping the future of AI in operations. The Model Context Protocol (MCP) is mentioned as an important standardization effort, allowing AI agents to connect to various enterprise data sources through a common interface. This reduces integration friction and enables richer context for operational AI.

There's discussion of AI agents participating in real-time incident war rooms, listening to Slack conversations, summarizing discussions, and making hypotheses based on the dialog combined with system telemetry. This enables engineers joining an incident response late to catch up instantly and ensures no information is lost in the chaos of a major outage.

The concept of "shift left" for operational knowledge is highlighted—using operational context (runbooks, SLOs, deployment standards) to inform development-time AI assistants. This means operational concerns are surfaced during coding, not just during incidents, potentially preventing issues before they reach production.

The panelists also discuss the evolution from AIOps (focused on predictive analytics and anomaly detection) to what might be called "Intelligent Operations" where GenAI provides the contextual layer that was missing. The combination enables systems that both predict problems and explain them, both detect anomalies and suggest remediations, both automate routine tasks and explain why those actions were taken.

## Key Takeaways for LLMOps Practitioners

For teams implementing LLMs in production operations, several critical lessons emerge from this discussion. First, context is paramount—AI agents need comprehensive information about your systems, processes, and standards to be effective. Second, trust is earned through transparency and explanation, not just accuracy. Third, humans must remain accountable for business-impacting decisions even as AI handles more tactical execution. Fourth, starting small with felt pain points and demonstrating concrete value is more effective than comprehensive strategy documents. Fifth, the fundamentals of good DevOps practice—documentation, observability, testing—remain essential prerequisites for AI augmentation rather than being replaced by it.

The panelists make clear that this is not about replacing SRE and DevOps engineers but about amplifying their capabilities, removing toil, and enabling them to focus on higher-value work like system design, capacity planning, and continuous improvement. AI handles the data wrangling, log analysis, and pattern matching at machine speed while humans provide judgment, accountability, and strategic direction. This human-AI collaboration, when implemented thoughtfully with proper guardrails and context, represents the next evolution in operational excellence.