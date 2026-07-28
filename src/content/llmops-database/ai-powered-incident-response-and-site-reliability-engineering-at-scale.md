---
title: "AI-Powered Incident Response and Site Reliability Engineering at Scale"
slug: "ai-powered-incident-response-and-site-reliability-engineering-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "high-stakes-application"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "memory"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "evals"
  - "langchain"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "elasticsearch"
  - "anthropic"
  - "openai"
  - "meta"
industryTags: "tech"
company: "Langchain / Traversal"
summary: "Traversal builds autonomous AI agents for Site Reliability Engineering (SRE) that troubleshoot production incidents and answer operational questions across large-scale distributed systems. The company addresses the challenge of analyzing petabyte-scale telemetry data from thousands of microservices to identify root causes of production incidents, traditionally requiring large war rooms with dozens of engineers. Their solution uses a multi-agent architecture built around a \"production world model\" that indexes and relates telemetry data (logs, metrics, traces) with non-telemetry sources (code, documentation, Slack conversations) to enable intelligent search and reasoning. The system achieves time-to-first-insight under two minutes while handling investigation trajectories that span millions of tokens, delivering autonomous incident RCA capabilities that work across customer environments producing petabytes of data daily."
link: "https://www.youtube.com/watch?v=U5PkKt_uJys"
year: 2024
seo:
  title: "Langchain / Traversal: AI-Powered Incident Response and Site Reliability Engineering at Scale - ZenML LLMOps Database"
  description: "Traversal builds autonomous AI agents for Site Reliability Engineering (SRE) that troubleshoot production incidents and answer operational questions across large-scale distributed systems. The company addresses the challenge of analyzing petabyte-scale telemetry data from thousands of microservices to identify root causes of production incidents, traditionally requiring large war rooms with dozens of engineers. Their solution uses a multi-agent architecture built around a \"production world model\" that indexes and relates telemetry data (logs, metrics, traces) with non-telemetry sources (code, documentation, Slack conversations) to enable intelligent search and reasoning. The system achieves time-to-first-insight under two minutes while handling investigation trajectories that span millions of tokens, delivering autonomous incident RCA capabilities that work across customer environments producing petabytes of data daily."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-incident-response-and-site-reliability-engineering-at-scale"
  ogTitle: "Langchain / Traversal: AI-Powered Incident Response and Site Reliability Engineering at Scale - ZenML LLMOps Database"
  ogDescription: "Traversal builds autonomous AI agents for Site Reliability Engineering (SRE) that troubleshoot production incidents and answer operational questions across large-scale distributed systems. The company addresses the challenge of analyzing petabyte-scale telemetry data from thousands of microservices to identify root causes of production incidents, traditionally requiring large war rooms with dozens of engineers. Their solution uses a multi-agent architecture built around a \"production world model\" that indexes and relates telemetry data (logs, metrics, traces) with non-telemetry sources (code, documentation, Slack conversations) to enable intelligent search and reasoning. The system achieves time-to-first-insight under two minutes while handling investigation trajectories that span millions of tokens, delivering autonomous incident RCA capabilities that work across customer environments producing petabytes of data daily."
notion:
  pageId: "3aaf8dff-2538-80b6-9e2c-e90c642f4511"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T11:59:00.000Z"
  lastEditedTime: "2026-07-27T12:00:00.000Z"
  publishedAt: "2026-07-27T12:05:58Z"
---

## Overview

Traversal was founded by researchers from MIT and professors from Columbia and Cornell who specialized in causal machine learning and reinforcement learning. In January 2024, they identified site reliability engineering and incident response as an ideal domain for applying agentic AI systems. The company builds autonomous agents that troubleshoot production incidents and answer operational questions for large-scale enterprises, working with customers who produce approximately a petabyte of telemetry data per day and operate thousands of microservices.

The fundamental problem Traversal addresses is the traditional incident response workflow where 50-60 engineers gather in war rooms trying to manually piece together context about production failures. This process is inefficient because humans are demonstrably poor at troubleshooting complex distributed systems at scale, and the volume of data makes manual investigation increasingly impractical as systems grow.

## Technical Challenges in Building Production SRE Agents

Building AI agents for SRE proved significantly harder than the founders initially expected, for several converging reasons. First, troubleshooting occurs during high-stress situations where errors have severe consequences, creating very low tolerance for incorrect results. Second, there is virtually no quality labeled training data for this domain—LLMs are not inherently trained on the types of telemetry data required for incident investigation. Third, collecting human-labeled data through observation is counterproductive because human troubleshooting workflows are themselves inefficient and error-prone.

The scale dimension presents another critical challenge. Enterprise customers produce roughly a petabyte of data daily, and attempting to ingest this volume directly into LLM context windows would be both technically infeasible and economically prohibitive—a single investigation could cost what the team colorfully describes as "the GDP of a small country." The system must return actionable insights within two minutes or users become frustrated, yet investigations may continue analyzing data for over an hour. This creates a unique constraint: agents must balance offline pre-computation with online real-time querying while handling extremely high-cardinality, rapidly-changing data.

## The Production World Model

Central to Traversal's architecture is what they call the "production world model," which serves as an AI-optimized representation of how systems actually work in production. This model is conceptually similar to the deep wiki concept from Cognition AI, but extends beyond code to encompass the full operational environment.

The production world model is built by ingesting and indexing multiple data sources including telemetry streams (logs, metrics, traces), application code from repositories, internal documentation, and organizational knowledge from sources like Slack conversations. The system continuously processes these streams to build a rich knowledge representation of how components connect and interact. This happens as a form of continuous offline computation, with agents running 24/7 to keep the model updated.

Critically, Traversal separates the production world model from user-specific memory and the knowledge bank. The production world model focuses on learning the actual system relationships from data, deliberately keeping it separate from human input to avoid corruption by potentially incorrect tribal knowledge. The knowledge bank, by contrast, stores user-provided documentation and preferences. User memory captures individual interaction patterns and learned preferences from how specific users interact with the agents. This separation allows the LLM to discover connections in the system that individual humans may not know about, while still incorporating human expertise where appropriate.

## Search Architecture and Data Structures

Search represents a fundamental challenge given the scale and diversity of data. Traversal's approach involves building multiple data structures that exist on a continuum from fully offline (pre-computed, searchable at scale but lower granularity) to fully online (live queries to systems like Datadog, high granularity but limited searchability).

A key insight is that search strategy must adapt based on data cardinality. High-cardinality, rapidly-changing data like session IDs and correlation IDs requires different indexing and query patterns than lower-cardinality, more stable data like service names. For stable entities, the system can invest in fuzzy matching and rich external knowledge representation during the offline phase. For rapidly-changing identifiers, the system must maintain efficient online query capabilities.

The company moved from attempting to push all data through generic vector databases or RAG approaches to deliberately re-indexing observability data to make it fundamentally more searchable by agents. This involves owning critical components of the data pipeline rather than relying solely on the query APIs provided by existing observability platforms, which were not designed with AI agent access patterns in mind.

Query pattern optimization also addresses the fragmentation problem—different systems use inconsistent naming conventions, and understanding these mappings requires deep system context. The production world model helps bridge these inconsistencies by learning how entities relate across fragmented sources.

## Agent Architecture and Orchestration

Traversal's architecture has evolved significantly from workflow-oriented approaches focused narrowly on incident RCA toward a more flexible agent-first design. The system now features one core agent that orchestrates multiple specialized sub-agents as needed. This allows handling diverse query types beyond just incident investigation, including general operational questions.

The core agent operates within a well-defined harness that provides essential capabilities including file system access for context management, code generation and execution in sandboxed environments, and integration with various observability platforms. File systems prove particularly valuable for managing context within finite LLM context windows. The agents use file systems to provide summaries that help them assess relevance before drilling down into details, leveraging the fact that models are highly proficient at grep-like operations over file structures.

Investigation trajectories can extend to five million tokens, more than twice the length of the entire Harry Potter series. Managing context and execution over these extremely long-running agents requires sophisticated approaches to intermediate state management and the ability to generate and execute code to manipulate that state.

The system employs what might be described as programmatic swarm behavior for the needle-in-haystack search problem. When investigating incidents, multiple hypotheses are pursued in parallel, with sub-agents drilling down into specific areas. However, the team cautions against prematurely splitting systems into complex multi-agent architectures. For most use cases, starting with a simple agent loop with good tools and skills is more effective. Sub-agents become valuable when thrashing behavior emerges—when the main agent over-indexes on particular data sources, wrapping that capability in a sub-agent can improve behavior despite increased latency.

## Agent Autonomy and User Interaction Evolution

The product has evolved through distinct levels of autonomy, analogous to self-driving car levels from L0 to L5. L0 represents fully manual troubleshooting. L1 introduces runbooks with rules-based execution. L2 brings LLMs to handle painful sub-tasks like writing complex queries or generating postmortems while humans remain in control. L3 involves building agents for specific teams with limited scope (e.g., 10-20 microservices for a database team).

The critical jump occurs between L3 and L4, which represents troubleshooting across entire production environments with thousands of services and petabytes of data. This is where DIY approaches typically fail because the problem transforms from primarily an AI challenge into equally a data engineering challenge. Successfully building L4 requires fundamental rethinking of how telemetry data is stored, indexed, and queried at scale—work that Traversal estimates requires about two years of intensive development.

L5 represents fully autonomous production management. Currently, Traversal is moving toward what they call "proactive agents" that decide autonomously when to engage rather than waiting for manual triggers or simple rules. The system now monitors various channels and contexts (incident channels, alert channels, UI interactions) and surfaces insights when it has something valuable to contribute. This requires an outer agent harness that determines when to invoke the core troubleshooting agent.

The primary product interface is Slack, where the agent participates in incident channels and responds to queries. The system tracks time-to-first-insight (target: under two minutes) and time-to-last-insight (potentially over an hour as investigations deepen), reflecting the dual need for rapid initial value and comprehensive eventual analysis.

## Model Selection and Cost Optimization

Traversal has evolved from having strong model preferences to adopting what they describe as "strong opinions loosely held," with loyalty primarily to evaluation results rather than specific vendors. They began as heavy OpenAI users, shifted to Anthropic, and now continuously evaluate new model releases including open-source options.

Cost has emerged as a significant operational constraint in ways it was not during earlier development. With investigation trajectories reaching five million tokens and adoption scaling rapidly, inference costs have grown from a non-issue to an economic constraint that threatens to exhaust venture funding if not managed carefully. This mirrors broader industry trends where initial adoption leads to unexpectedly high costs once usage scales.

The team now explicitly balances accuracy and performance against cost when selecting models for different components. They face tension around investing in open-source model infrastructure—such investments could be wasted if closed-source models continue improving while becoming cheaper, yet open-source offers potential cost advantages at current scale.

This experience led to product development focus on cost controls including LLM gateway capabilities with spending limits and usage management. There is recognition that sophisticated credit and access control systems may be needed, potentially with intelligent recommendation systems that allocate token budgets based on user productivity—giving unlimited access to 10x engineers while constraining novices until they demonstrate competence.

## Evaluation Strategy

Evaluation of these agents is extremely challenging. With trajectories extending to millions of tokens, manual inspection of where agents break down becomes impractical. Failures can stem from multiple sources: logical reasoning errors, tool failures and timeouts, or engineering issues in the infrastructure.

A key advantage for Traversal is that incident RCA outcomes are verifiable—the final output can be compared against what human engineers eventually determined in the war room. However, the manual effort required to perform this evaluation is substantial. The team increasingly relies on tools for agent observability that can automatically triage long trajectories to identify common failure patterns, whether logical or engineering-related.

An important strategic insight is to evaluate on the hardest possible tasks. If the system performs well on the most difficult scenarios (production incidents), performance tends to generalize to easier tasks like daily operational questions where obtaining quality evaluation data is harder. This parallels how the broader field evaluates on math and science reasoning with the expectation that capabilities generalize. By focusing evaluation investment on incidents, which are both the hardest problems and have the best ground truth data, Traversal achieves better overall system quality than if they optimized for easier but harder-to-evaluate use cases.

## Impact on Engineering Organization

The adoption of coding agents like Claude Code and Cursor has substantially impacted Traversal's engineering practices. Individual engineers can ship significantly more work. This created a need to restructure codebases to be "agent-friendly," which in practice means cleaning up technical debt and implementing better development practices that were sometimes sacrificed during rapid startup iteration.

The increased velocity from coding agents has enabled non-traditional contributors to participate more deeply. Product managers can now ship code directly and participate in technical implementation rather than just specification. This breaks down traditional boundaries and enables more collaborative product development where diverse perspectives contribute directly to implementation.

## Broader Domain Applicability

While Traversal currently focuses on SRE and incident response, they identify the underlying problem—finding needles in haystacks within time-series data—as ubiquitous across domains including security operations, network troubleshooting, product analytics, and business intelligence. In all these areas, teams analyze spikes or anomalies in one metric by searching through millions of other metrics and events to find causal relationships.

The fundamental data types remain consistent across these domains: time-series metrics, structured logs with timestamps, change events, and code. The production world model and associated data processing infrastructure, designed to handle telemetry at scale, could theoretically extend to these adjacent problem spaces. Security represents the most natural next domain given similar data characteristics and workflow patterns.

## Key Takeaways for Agent Builders

For organizations considering building similar internal agent capabilities, Traversal offers several cautions. Many engineering teams attempt DIY approaches after seeing demonstrations, and most companies initially try building solutions internally before recognizing the complexity. The L0-L5 autonomy framework provides useful guidance on where DIY approaches remain viable versus where they break down.

Teams can often successfully build L3-level agents with limited scope operating over 10-20 microservices with clever engineering. The gap to L4—troubleshooting across entire production environments with thousands of services and petabytes of data—represents where DIY approaches typically fail. At that scale, the challenge becomes equally about data engineering as AI engineering, requiring fundamental rethinking of data storage, indexing, and query architectures co-designed with the agent harness.

For those building agents generally, starting with simple agent loops with good tools and skills is more effective than prematurely creating complex multi-agent architectures. File system-based context management proves valuable for working within context limits while maintaining agent productivity. Swarms and sub-agents have specific applicability, particularly for parallel hypothesis testing in search problems, but should be adopted based on demonstrated need rather than architectural preference.

The case study demonstrates the maturation of LLM-based agents from experimental systems to production-critical infrastructure handling some of the most complex and high-stakes operational challenges in large-scale distributed systems.
