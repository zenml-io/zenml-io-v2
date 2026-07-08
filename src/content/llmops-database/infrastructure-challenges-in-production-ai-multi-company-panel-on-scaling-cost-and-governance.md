---
title: "Infrastructure Challenges in Production AI: Multi-Company Panel on Scaling, Cost, and Governance"
slug: "infrastructure-challenges-in-production-ai-multi-company-panel-on-scaling-cost-and-governance"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "embeddings"
  - "vector-search"
  - "prompt-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "evals"
  - "kubernetes"
  - "databases"
  - "monitoring"
  - "scaling"
  - "devops"
  - "orchestration"
  - "postgresql"
  - "mysql"
  - "sqlite"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "open-source"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "documentation"
  - "meta"
  - "google-gcp"
  - "microsoft-azure"
  - "amazon-aws"
  - "openai"
  - "anthropic"
  - "nvidia"
  - "databricks"
industryTags: "tech"
company: "Forge / Cockroach Labs / Doubleword / MESA"
summary: "This panel discussion from InfoQ Live brings together infrastructure experts from Forge, Cockroach Labs, Doubleword, and MESA to address the operational challenges of running AI systems at scale. The problem identified is that while building AI models has become relatively straightforward, maintaining production databases and infrastructure under constant AI-driven pressure has emerged as the critical bottleneck. The experts discuss solutions including distributed SQL databases, inference optimization, governance frameworks, and architectural evolution strategies. Key insights reveal that token costs are scaling 100x year-over-year rather than the predicted 10x, database layers have become the control plane for agentic AI, and traditional capacity planning approaches are obsolete in favor of bounded elasticity with guardrails."
link: "https://www.infoq.com/presentations/ai-infrastructure-scaling-architecture/"
year: 2026
seo:
  title: "Forge / Cockroach Labs / Doubleword / MESA: Infrastructure Challenges in Production AI: Multi-Company Panel on Scaling, Cost, and Governance - ZenML LLMOps Database"
  description: "This panel discussion from InfoQ Live brings together infrastructure experts from Forge, Cockroach Labs, Doubleword, and MESA to address the operational challenges of running AI systems at scale. The problem identified is that while building AI models has become relatively straightforward, maintaining production databases and infrastructure under constant AI-driven pressure has emerged as the critical bottleneck. The experts discuss solutions including distributed SQL databases, inference optimization, governance frameworks, and architectural evolution strategies. Key insights reveal that token costs are scaling 100x year-over-year rather than the predicted 10x, database layers have become the control plane for agentic AI, and traditional capacity planning approaches are obsolete in favor of bounded elasticity with guardrails."
  canonical: "https://www.zenml.io/llmops-database/infrastructure-challenges-in-production-ai-multi-company-panel-on-scaling-cost-and-governance"
  ogTitle: "Forge / Cockroach Labs / Doubleword / MESA: Infrastructure Challenges in Production AI: Multi-Company Panel on Scaling, Cost, and Governance - ZenML LLMOps Database"
  ogDescription: "This panel discussion from InfoQ Live brings together infrastructure experts from Forge, Cockroach Labs, Doubleword, and MESA to address the operational challenges of running AI systems at scale. The problem identified is that while building AI models has become relatively straightforward, maintaining production databases and infrastructure under constant AI-driven pressure has emerged as the critical bottleneck. The experts discuss solutions including distributed SQL databases, inference optimization, governance frameworks, and architectural evolution strategies. Key insights reveal that token costs are scaling 100x year-over-year rather than the predicted 10x, database layers have become the control plane for agentic AI, and traditional capacity planning approaches are obsolete in favor of bounded elasticity with guardrails."
notion:
  pageId: "397f8dff-2538-80d8-9ead-c087efe65946"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:56:00.000Z"
  lastEditedTime: "2026-07-08T19:56:00.000Z"
  publishedAt: "2026-07-08T20:13:27Z"
---

## Overview

This case study represents a comprehensive panel discussion from InfoQ Live (June 2026) featuring infrastructure practitioners from multiple companies addressing the operational realities of running AI systems at production scale. The panelists include Simerus Mahesh (Founding Engineer at Forge), Alex Infanzon (Senior Systems Engineer at Cockroach Labs), Meryem Arik (Co-Founder and CTO at Doubleword), and Luca Bianchi (CTIO at MESA), moderated by Renato Losio. The discussion moves beyond the well-solved problem of building AI models to focus on the far more challenging issues of maintaining reliable production infrastructure under the unique pressures created by AI workloads.

The panel's central thesis is that AI has fundamentally transformed not just the volume of infrastructure load, but its very nature. Organizations that successfully deployed traditional web applications are now experiencing infrastructure failures despite stable user counts, because AI agents and LLM-powered features create dramatically different usage patterns that can scale unpredictably and exponentially.

## Infrastructure Bottlenecks in Production AI

The panelists identify several unexpected infrastructure bottlenecks that differ significantly from traditional application challenges. Meryem Arik from Doubleword, an inference provider, discusses how token costs have become the dominant concern, with actual scaling proving far more aggressive than predicted. While the industry anticipated 10x annual growth in token consumption, actual usage has scaled closer to 100x year-over-year for most organizations. This represents a manifestation of Jevons Paradox at unprecedented speed - as AI capabilities become more accessible and cheaper per token, total consumption explodes exponentially.

The challenge extends beyond just token costs. Alex Infanzon from Cockroach Labs highlights that GPU constraints, while significant, are now joined by fundamental energy availability issues at data centers. Organizations planning new AI infrastructure must now consider data center locations based on available electrical power capacity, requiring years of advance planning. More critically, the legacy database layer has become a major cost and performance bottleneck, as traditional databases were never designed for the high-velocity, high-concurrency demands of agentic AI systems.

Luca Bianchi from MESA, working in highly regulated sectors, points to external system availability as the most unpredictable bottleneck. Unlike traditional database provisioning where scaling behavior and throttling limits are well-defined, AI endpoints can experience dramatic performance degradation within hours as different geographic regions wake up and begin consuming shared resources. He describes experiences where expected 30-second response times ballooned to 90-120 seconds simply due to increased U.S. usage during business hours, creating a "noisy neighbor" effect that's difficult to predict or mitigate.

Simerus Mahesh from Forge, focusing on AI security and governance, identifies compute as the primary bottleneck in companies operating their own data centers. The shift to autonomous agents has introduced new complications - unlike traditional request-response patterns, agents may spawn sub-agents that continue running even after parent processes terminate, following a process model rather than a thread model. This makes resource management and capacity planning significantly more complex and unpredictable.

## The Token Cost Crisis and ROI Measurement

A significant portion of the discussion centers on the explosive growth in token costs and the difficulty organizations face in measuring return on investment. The panel references Uber's public disclosure (May 2026) that they consumed their entire annual AI budget in just four months, spending between $200-500 per user. This budget exhaustion was triggered partly by well-intentioned but poorly designed incentive systems, including gamified leaderboards that encouraged maximum AI usage without consideration for cost.

Meryem Arik provides crucial context on token spending variability across organizations. She describes companies like NVIDIA where individual team members may consume $15,000 per month in tokens, yet this is considered acceptable because it drives genuine productivity gains and reduces hiring needs. The critical factor isn't the absolute spend but rather value capture - whether the token consumption delivers measurable business value. Other organizations spending just $200 per employee monthly may consider this excessive if they're not seeing corresponding productivity improvements.

Alex Infanzon emphasizes the difficulty of ROI measurement in AI contexts. Unlike traditional infrastructure where metrics are well-established, organizations struggle to determine whether their AI spending delivers value proportional to cost. This challenge is compounded by AI agents' tendency to be "eager to help" - they will retry operations, explore alternative approaches, and loop through problem-solving attempts, all of which consume tokens without necessarily improving outcomes.

The panel identifies governance and observability as critical requirements for managing token costs. Simerus Mahesh describes how Forge is building governance platforms that wrap around all agent deployments to track spending, usage patterns, and behavior. Native solutions can leverage existing telemetry - for example, Claude Code and Codex sessions store logs directly on the file system - but more robust solutions require dedicated observability infrastructure.

## Database as the New Control Plane

A recurring theme throughout the discussion is Alex Infanzon's assertion that "the database layer has become the control plane" for AI applications. This represents a fundamental architectural shift from traditional applications where databases simply stored and retrieved data. In AI-native architectures, particularly those using autonomous agents, databases now serve multiple critical functions:

The database stores comprehensive telemetry and usage metrics about agent behavior, including token consumption, memory usage, and execution traces. This enables organizations to generate reports on agent performance, track costs, and implement audit trails for security and compliance. More fundamentally, databases now store agent identity and metadata, making them responsible for identity management, access control, and permission revocation for AI agents operating across the system.

For agentic AI specifically, databases must maintain perfect consistency rather than eventual consistency. Agents making decisions based on stale or inconsistent data can trigger cascading failures across multi-agent systems, and rolling back autonomous actions is exponentially more difficult than reverting traditional database transactions. This requirement for strong consistency at global scale drives the need for distributed SQL solutions like CockroachDB that can provide single-digit millisecond latencies across multiple geographic regions while maintaining ACID guarantees.

The panel discusses how distributed SQL addresses these requirements through separation of compute and storage, allowing independent scaling of each layer. Geographic distribution enables local latency for region-specific agent workloads while maintaining a single logical database view. This becomes critical for international deployments where data locality and GDPR compliance intersect with the need for consistent global state.

## The Rollback Problem in Agentic Systems

The discussion reveals one of the most challenging aspects of production AI: the fundamental difficulty of rolling back AI-driven changes. In traditional applications, rollback means reverting to a previous deployment or restoring a database snapshot. With autonomous agents, rollback becomes a far more complex problem.

Simerus Mahesh explains that while rolling back simple changes like system prompts, model versions, or feature flags remains straightforward, rolling back autonomous agent actions that have already executed is extremely difficult or impossible. Agents don't just produce text outputs - they create files, modify configurations, open pull requests, call external APIs, update database state, trigger workflows in CI/CD systems like Jenkins, and initiate downstream processes across distributed systems.

The panel discusses how compensating for side effects replaces traditional rollback in agentic systems. Luca Bianchi notes that while conversation history is easily recovered, the reasoning process that led an agent to choose specific actions cannot be rolled back. This makes prevention more important than remediation - organizations must implement dry-run modes, approval gates for high-impact actions, feature flags, and idempotent operation design.

Alex Infanzon describes work with a large credit card provider that illustrates the cascading failure problem. When one agent acts on stale or incorrect data, it may trigger multiple downstream agents, each making their own decisions and triggering additional agents. The resulting cascade creates a complex web of incorrect state persisted across multiple systems. Cockroach Labs is partnering with DBOS (for workflow tracking and rollback capabilities) and Memori (for agent memory persistence and prompt optimization) to address these challenges. The solution involves storing complete agent workflow history in the database, enabling traceability and selective rollback of specific agent actions.

The Saga pattern is discussed as a potential approach, but the panel notes it requires comprehensive tracing of every agent action and the ability to define compensating transactions for each step. This is significantly more complex than traditional database transaction rollback because it involves reversing actions across heterogeneous systems with varying rollback capabilities.

## Capacity Planning and the Death of Traditional Autoscaling

The panel reaches consensus that traditional capacity planning approaches have become obsolete for AI workloads. Alex Infanzon articulates this clearly: while traditional applications could plan capacity based on expected user growth and known launch events, AI systems make this impossible. The same number of users can suddenly generate 10x the infrastructure load due to a prompt change, new tool integration, or increased context window.

Simerus Mahesh challenges the conventional wisdom that "if demand spikes, just autoscale." This approach worked when workload was human-driven and bounded by natural user behavior patterns. With AI agents, a single user action can trigger loops of model calls, tool executions, code runs in sandboxes, retries, database operations, and cloud API calls. If these loops are inefficient or misconfigured, autoscaling doesn't solve the problem - it amplifies it, transforming a configuration bug into a massive infrastructure bill or cascading outage.

The new paradigm emphasizes "bounded elasticity" - implementing hard limits around runtime execution, tool call counts, retry attempts, sandbox resources, and blast radius before enabling elastic scaling. Guardrails must constrain autonomous behavior first, then elasticity can safely accommodate legitimate demand fluctuations. This inverts the traditional approach where elasticity was primary and limits were afterthoughts.

Meryem Arik reinforces this by explaining how inference providers must solve the capacity planning problem that most organizations should avoid attempting themselves. The complexity of GPU capacity planning, cold start optimization, model swapping, and multi-model serving across shared infrastructure has become a full-time specialization. Organizations attempting self-hosted inference at scale find themselves building complete operations teams for infrastructure management rather than focusing on their core business.

The panel discusses how cloud providers are simultaneously imposing new constraints (soft and hard limits on model access through services like AWS Bedrock) while organizations struggle with unexpected cost explosions from unconstrained usage. This creates a challenging environment where teams face both artificial scarcity and uncontrolled spending simultaneously.

## Data Privacy, Security, and Governance in Production AI

Luca Bianchi provides extensive insight into the data privacy challenges facing regulated industries deploying AI systems. The degree of data reservation and security required varies dramatically based on customer sector, data sensitivity, and regulatory requirements, making one-size-fits-all solutions inadequate.

Many organizations initially chose self-hosted models to maintain complete data locality and control. However, this approach faces two significant challenges. First, hardware costs and scaling requirements remain unpredictable due to constantly evolving model capabilities and accuracy levels. Planning six months ahead requires committing to specific models and hardware configurations, but the landscape changes too rapidly for this to be practical. Second, self-hosting requires building and maintaining complete inference infrastructure, which has become too specialized for most organizations.

The solution Bianchi describes involves a hybrid approach: local models handle highly sensitive, non-anonymized data, while an anonymization layer strips sensitive information before sending requests to frontier models via external APIs. This balances data security, cost efficiency, and access to state-of-the-art capabilities while remaining adaptable to rapid technology changes.

Simerus Mahesh focuses on governance as a critical security layer for production AI. His team at Forge is building governance platforms to control what agents can access and what actions they can perform. Key concerns include preventing engineers from pasting production code or API keys into AI interfaces, monitoring data exfiltration risks, and maintaining audit trails of all AI interactions. The governance layer must track agent identity, implement role-based access control, and provide real-time monitoring of agent behavior.

The panel discusses how governance intersects with the rollback problem - preventing irreversible actions from occurring automatically is far more effective than attempting to undo them after the fact. This drives the need for approval gates on high-impact operations, dry-run modes for testing agent behavior, and comprehensive logging of all agent decisions and actions.

## Open Source Models and the Shifting Economics of AI

Meryem Arik, whose company Doubleword bet early on open-source model dominance, provides perspective on how open-source models have transformed production AI economics. Her company made two key predictions four years ago: that open-source models would necessarily win due to cost, performance, and privacy advantages, and that token cost would become a critical scaling issue. Both predictions have proven accurate, though the speed of change exceeded expectations.

The capability improvements in open-source models over the past 6-12 months have been dramatic. Models like GLM 5.2 now deliver performance comparable to proprietary alternatives at significantly lower cost and with better latency (when using optimized inference providers). This makes open-source models not just a cost-optimization strategy but a technical requirement for organizations operating at scale.

The economics of AI have fundamentally changed software business models. Arik notes that software companies traditionally enjoyed 70-80% margins because infrastructure costs were relatively minor. With AI workloads, infrastructure cost has become the dominant expense driver, fundamentally changing unit economics. This represents a new phenomenon in software businesses and requires rethinking traditional SaaS pricing and margin assumptions.

The panel discusses how Jevons Paradox manifests in AI: as per-token costs decrease, total consumption increases even faster, resulting in higher absolute spending. Organizations that successfully reduce per-token costs by switching to open-source models often find their total spending increases as they deploy AI to more use cases and users.

## SRE and Platform Engineering Challenges

The panel reaches strong consensus that Site Reliability Engineers (SREs) and on-call personnel bear the heaviest burden of production AI infrastructure challenges. Simerus Mahesh, drawing on extensive SRE experience, explains that AI workloads break the traditional correlation between user growth and infrastructure load.

Production systems can experience catastrophic failures even with stable user counts and request volumes because the work performed per request has changed dramatically. A modified prompt, new tool integration, or increased context window can increase per-request infrastructure demand 10x overnight. This means on-call teams face incidents triggered not by traffic spikes but by subtle application changes that fundamentally alter system behavior.

Request count metrics become misleading - a normal number of requests may be performing exponentially more work behind the scenes as agents run longer, invoke more tools, and create more state. The cost and behavior of workloads can change overnight without warning, leading to what Mahesh describes as "lack of sleep" for on-call personnel.

Alex Infanzon notes that database teams consistently face blame for performance issues until proven otherwise. When engineers change embedding schemas requiring migration of 40+ million rows, when security teams flag governance gaps requiring new audit trails, or when agent loops hammer databases at 2 AM, database administrators are inevitably involved in incident response. The data platform team becomes the nexus point where all AI infrastructure problems surface.

The discussion acknowledges that while databases are often blamed first, they're also becoming more intelligent to handle these challenges. Cockroach Labs is embedding AI capabilities directly into databases to monitor performance in real-time, automatically detect why writes are slowing or latency increasing, and take corrective action without human intervention. This represents the realization of Oracle's decades-old vision of autonomous databases, finally becoming practical through AI integration.

## Architectural Evolution for AI-Native Systems

Luca Bianchi provides the most forward-looking architectural guidance in the panel. His primary recommendation is to reconsider architecture in light of AI adoption rather than attempting to retrofit AI into existing systems. He specifically recommends "Evolutionary Architectures" by Neal Ford as essential reading for understanding how to build systems that can adapt to rapid technology change.

The key principle is expecting constant change - new databases with separated compute, new agents, new models, and new capabilities will emerge continuously. The challenge isn't predicting what will change but building architecture capable of evolving as new advances become available. This requires consciously designing for adaptability rather than optimizing for current state.

Database design is shifting from human-centric to agent-centric paradigms. Traditional database design, epitomized by books like Hernandez's "Database Design for Mere Mortals," focused on data structures that programmers could understand and humans could interpret. AI-native architectures must consider agents as primary data consumers, potentially requiring multiple specialized databases rather than enforcing artificial constraints based on human cognitive limitations.

Bianchi's approach involves segmenting workloads by sensitivity level - local models for highly sensitive data, anonymization layers for intermediate cases, and frontier models for general-purpose tasks. This architectural pattern balances security, cost, and capability while remaining adaptable to technology evolution.

## Practical Recommendations for Practitioners

The panel concludes with concrete actionable advice for practitioners:

**Luca Bianchi** recommends starting immediately with architectural reconsideration focused on evolution and adaptability. Reading "Evolutionary Architectures" provides foundational principles for building systems that can accommodate rapid change. The emphasis should be on building architecture that can incorporate new databases, models, and capabilities as they emerge rather than optimizing solely for current technology.

**Meryem Arik** urges practitioners to try modern open-source models if they haven't evaluated them in the past 6-12 months. Models like GLM 5.2 have made dramatic capability improvements, offer significantly lower costs, and provide excellent latency with proper inference providers. Organizations still exclusively using proprietary models may be overpaying substantially for comparable capabilities.

**Simerus Mahesh** recommends against attempting complete architecture redesign as a first step, given the complexity of migration at scale. Instead, he suggests selecting one critical production AI workflow and thoroughly tracing what happens when it executes - mapping model calls, tool invocations, database queries, and the complete execution path. Key questions to ask include: What's the maximum runtime? What's the maximum number of tool calls? What happens if dependencies slow down? What happens if model retries fail? The goal is identifying where the system is unbounded, then implementing specific guardrails around those areas as a foundation for further evolution.

**Alex Infanzon** emphasizes more rigorous evaluation of data infrastructure vendors. Rather than accepting benchmark results showing optimal performance under ideal conditions, organizations should demand demonstrations of behavior under failure conditions - network partitions, node failures, schema changes, regional outages, and software updates. AI agents will stress infrastructure in ways traditional workloads never did, and vendors must prove their systems maintain consistency and availability under these pressures. The shift from capacity planning for expected growth to planning for elasticity with proper bounds represents a fundamental change in infrastructure philosophy.

## Conclusion and Industry Implications

This panel discussion reveals that the production AI infrastructure challenge extends far beyond GPU availability or model selection. The fundamental nature of infrastructure load has changed, traditional approaches to capacity planning and autoscaling have become obsolete, databases have evolved into control planes requiring new architectural patterns, and the economics of software businesses have shifted as infrastructure costs dominate margins.

The rapid pace of change - with token costs scaling 100x rather than 10x annually, capabilities doubling every few months, and new architectural patterns emerging continuously - makes adaptability more valuable than optimization for current state. Organizations successfully operating AI at scale are those that have embraced bounded elasticity, implemented comprehensive governance, evolved their database architectures for strong consistency at global scale, and built systems designed for continuous evolution rather than stability.

The panel's emphasis on prevention over remediation, guardrails over unlimited scaling, and architectural evolution over point optimization provides a roadmap for organizations navigating the transition to AI-native infrastructure. The challenges are substantial, but the patterns for addressing them are beginning to emerge from practitioners operating at the frontier of production AI deployment.
