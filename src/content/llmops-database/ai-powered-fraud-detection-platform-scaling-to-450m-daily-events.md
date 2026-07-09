---
title: "AI-Powered Fraud Detection Platform Scaling to 450M+ Daily Events"
slug: "ai-powered-fraud-detection-platform-scaling-to-450m-daily-events"
draft: false
llmopsTags:
  - "fraud-detection"
  - "realtime-application"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "agent-based"
  - "system-prompts"
  - "mcp"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "databases"
  - "api-gateway"
  - "monitoring"
  - "cicd"
  - "scaling"
  - "microservices"
  - "devops"
  - "orchestration"
  - "security"
  - "guardrails"
  - "postgresql"
  - "pytorch"
  - "scalability"
  - "amazon-aws"
industryTags: "finance"
company: "Nubank"
summary: "Nubank's DefenseIO team addressed the challenge of scaling fraud detection across 450+ million daily events for over 131 million customers across Latin America. The team evolved their fraud detection platform from hard-coded, engineer-dependent policies to a declarative, configuration-driven system, and most recently began integrating AI agents through custom MCP servers and prompt engineering. By creating a DefenseIO agent plugin that combines prompts with Model Context Protocol integration, they enabled business analysts and fraud teams to create and modify fraud detection rules using natural language through AI interfaces like Cursor, reducing rule deployment time from 3-5 weeks to 1-2 days while scaling from 20 to over 300 production policies. The system now handles 500 million events daily with 5 million requests per minute, though the team acknowledges ongoing challenges around security, scalability, and quality assurance as they expand their AI-driven approach."
link: "https://www.youtube.com/watch?v=w11pQcGT-u4"
year: 2026
seo:
  title: "Nubank: AI-Powered Fraud Detection Platform Scaling to 450M+ Daily Events - ZenML LLMOps Database"
  description: "Nubank's DefenseIO team addressed the challenge of scaling fraud detection across 450+ million daily events for over 131 million customers across Latin America. The team evolved their fraud detection platform from hard-coded, engineer-dependent policies to a declarative, configuration-driven system, and most recently began integrating AI agents through custom MCP servers and prompt engineering. By creating a DefenseIO agent plugin that combines prompts with Model Context Protocol integration, they enabled business analysts and fraud teams to create and modify fraud detection rules using natural language through AI interfaces like Cursor, reducing rule deployment time from 3-5 weeks to 1-2 days while scaling from 20 to over 300 production policies. The system now handles 500 million events daily with 5 million requests per minute, though the team acknowledges ongoing challenges around security, scalability, and quality assurance as they expand their AI-driven approach."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-fraud-detection-platform-scaling-to-450m-daily-events"
  ogTitle: "Nubank: AI-Powered Fraud Detection Platform Scaling to 450M+ Daily Events - ZenML LLMOps Database"
  ogDescription: "Nubank's DefenseIO team addressed the challenge of scaling fraud detection across 450+ million daily events for over 131 million customers across Latin America. The team evolved their fraud detection platform from hard-coded, engineer-dependent policies to a declarative, configuration-driven system, and most recently began integrating AI agents through custom MCP servers and prompt engineering. By creating a DefenseIO agent plugin that combines prompts with Model Context Protocol integration, they enabled business analysts and fraud teams to create and modify fraud detection rules using natural language through AI interfaces like Cursor, reducing rule deployment time from 3-5 weeks to 1-2 days while scaling from 20 to over 300 production policies. The system now handles 500 million events daily with 5 million requests per minute, though the team acknowledges ongoing challenges around security, scalability, and quality assurance as they expand their AI-driven approach."
notion:
  pageId: "397f8dff-2538-802f-9948-ec5fcf86aec4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:03:00.000Z"
  lastEditedTime: "2026-07-08T20:13:00.000Z"
  publishedAt: "2026-07-08T20:19:08Z"
---

## Overview

Nubank's DefenseIO team has undertaken an ambitious transformation of their fraud detection infrastructure to incorporate AI agents and LLM-powered tooling while maintaining strict control and security standards. As one of the world's largest digital financial platforms serving over 131 million customers across Brazil, Mexico, Colombia, and the expanding US market, Nubank processes approximately 500 million events daily with peak loads of 5 million requests per minute, generating 100 terabytes of logs per day. The DefenseIO team, consisting of eight engineers, four ML engineers, four data scientists, and a product manager, operates the Defense Platform - a centralized fraud detection engine that serves not only the fraud business unit but also various product teams across the bank including card issuing, lending, and e-commerce.

The presentation delivered by team members Jairo and Daniel chronicles a three-phase evolution: from decentralized, code-embedded fraud logic to a centralized code-centric infrastructure, then to a declarative policy-driven ecosystem, and finally to their current AI-augmented approach. This case study is particularly notable because it represents a measured, production-grade approach to integrating LLMs into critical financial infrastructure rather than a greenfield AI-native build.

## Technical Architecture Evolution

The original architecture required each business unit to maintain its own fraud logic embedded directly into product services, leading to duplicated policies, inconsistent implementations, and coordination challenges that couldn't scale with Nubank's rapid growth. The first major transformation centralized fraud detection using a Clojure-based infrastructure built from scratch. This architecture featured a flow orchestrator that directed transactions into either a main production flow or a shadow flow for testing, a shared codebase where policies were defined in code, and action managers for live interventions like challenges, delays, and warnings as well as backstage actions like report generation. All decisions and results were stored in their ETL for analysis and feature engineering.

However, this code-centric approach still required significant engineering involvement for every policy change, with business analysts and fraud teams dependent on engineers to translate analytical models into production code. This created a bottleneck that limited iteration speed and autonomy for domain experts.

The second architecture iteration introduced a declarative ecosystem centered around a custom Domain-Specific Language for policies. Key additions included a policy engine service that executes the DSL, a policy registry database where policies exist as entities rather than code, a feature registry cataloging all available features across Nubank's systems, and a configuration manager enabling real-time threshold and parameter adjustments without deployment cycles. Critically, all of these components were accessible through a user interface, allowing fraud teams to create and modify policies themselves. This transformation reduced policy deployment time from 3-5 weeks to 1-2 days and enabled scaling from approximately 20 policies to over 300 policies in production, while the number of defense builders grew from around 10 to over 50.

## AI Integration Strategy and LLMOps Implementation

The current phase focuses on adapting this mature platform to what the team calls the "new AI era" while maintaining the control, security, and reliability required for production financial systems. The team's approach is notably conservative and pragmatic, explicitly rejecting a fully autonomous agent model in favor of constrained AI-assisted tooling.

The DefenseIO team made a deliberate architectural decision to continue their declarative growth strategy rather than allowing AI agents to generate code directly. Their reasoning centers on control and predictability: they want to ensure that AI-generated policies follow established rules and predefined action sets rather than risking hallucinations or unexpected behaviors that could impact millions of customers. The declarative approach also provides token optimization benefits, as configuration changes require less context and fewer tokens than generating full code implementations.

The core LLMOps innovation is the DefenseIO Agent Plugin, which combines carefully engineered prompts with a custom Model Context Protocol server. The MCP architecture is particularly significant as it represents a production implementation of agent tooling that maintains security boundaries and authentication while providing AI interfaces with structured access to platform capabilities.

The agent plugin provides several key capabilities through what they call "skills." First, it automates onboarding and environment setup that previously required users to navigate through five different documentation articles covering authentication, environment configuration, and operational steps. This eliminates a significant friction point and ensures consistent setup procedures regardless of which AI interface a user employs. Second, and more critically, the MCP server exposes tools that enable AI interfaces to interact directly with Nubank's platform capabilities while maintaining security controls.

The MCP server itself runs as a service on AWS and integrates with Nubank's authentication provider, enabling internal users to leverage their existing identity and access management when interacting through AI tools. This architecture preserves the security model even as the interface layer becomes more flexible. The exposed tools allow users to query available features from the feature registry, create new versions of policies using natural language descriptions that get translated into the policy DSL, and edit configurations to optimize rule behavior without touching code.

The team explicitly supports multiple AI interfaces rather than building a proprietary solution, mentioning compatibility with tools like Cursor and other developer-focused AI coding assistants. This multi-interface approach reflects a pragmatic understanding that different users will have different preferred tooling, and the MCP standard provides a way to support this heterogeneity without duplicating implementation effort.

## Domain Segregation and Role Optimization

An important aspect of the AI integration strategy involves clear domain segregation between business analysts and engineers. The team wants business analysts to focus exclusively on rule logic, optimization, and behavioral analysis using the AI-assisted interfaces to create and refine policies more quickly. Engineers, meanwhile, should focus on data infrastructure, feature engineering, and optimizing data pipelines to handle the massive volumes Nubank processes. This separation of concerns is enabled by the declarative platform architecture, where the policy DSL abstracts away implementation details from business logic.

This role specialization represents a mature LLMOps pattern where AI tooling enhances productivity within well-defined domains rather than attempting to replace human expertise across the entire stack. Business analysts can leverage AI to express fraud detection logic more naturally and iterate more quickly, while engineers maintain the robust infrastructure and data systems that make rapid iteration possible.

## Testing and Validation Infrastructure

The DefenseIO platform incorporates a sophisticated shadow mode testing infrastructure that predates but complements their AI integration efforts. Shadow mode allows the team to run experimental policies and models against live production traffic asynchronously without impacting customer experience. Transactions flow through both production and shadow paths, with shadow results logged to the ETL for validation against performance and business metrics. Only after thorough validation are defenses promoted to production.

This testing infrastructure becomes even more critical with AI-generated policies, where the need to validate behavior before customer impact is paramount. The shadow mode approach allows the team to maintain what they describe as a "safe and conservative posture" while learning from production data patterns. It's a concrete example of how LLMOps practices must integrate with existing reliability engineering patterns in production financial systems.

The platform currently runs approximately 400 policies and models using around 300 features, with about 100 internal customers interacting with the platform daily. The decision pipeline takes transaction inputs along with enriched features like customer transaction history and past fraud reports, runs them through policies that apply thresholds and business rules to generate decision scores, and triggers both live actions that users experience immediately and backstage actions for analyst review.

## Operational Challenges and Trade-offs

The team candidly acknowledges three major ongoing challenges with their AI integration approach, providing valuable insight into the real-world complexities of LLMOps in regulated financial services.

Security remains the foremost concern, particularly around authentication and authorization for AI-generated actions. The team wrestles with fundamental questions about accountability: when a policy is created or modified through an AI interface, who is responsible? How do they ensure they can identify whether an agent or a person made a change? How do they maintain audit trails and the ability to revoke access when policies behave unexpectedly? The consequences of inadequate security controls are severe - a single malicious or erroneous rule could block millions of customers from conducting transactions. Their solution involves maintaining strong authentication through their existing identity provider integration, but this remains an area of active concern as they scale AI-assisted policy creation.

Scalability presents a second significant challenge operating at multiple levels. While the declarative configuration approach provides better scalability characteristics than code generation, the team questions how the system will perform as transaction volumes grow from hundreds of millions to potentially billions of daily events across expanding global markets. More subtly, they face a scalability challenge around policy proliferation - as AI tooling makes policy creation faster and easier, what happens when customers create thousands of rules daily? How do they manage the computational cost of evaluating an ever-growing policy set against millions of transactions per minute while maintaining sub-second response times required for real-time fraud detection?

Quality assurance represents the third critical challenge. With global operations impacting over 131 million customers, policy errors have massive blast radius. The team emphasizes extensive measurement of rule behavior, business impact, and operational impact. As a regulated financial institution, they must ensure transactions meet specific time windows for processing and response. The quality of AI-generated rules must meet the same stringent standards as engineer-written code, requiring robust validation frameworks that can assess not just functional correctness but business effectiveness and operational efficiency.

## Technical Stack and Infrastructure

The underlying technical stack reflects Nubank's distinctive technology choices. The platform uses Clojure, a functional programming language that compiles to Java, for core services. Data storage leverages Datomic layered over AWS DynamoDB, providing a functional database with powerful temporal query capabilities. Asynchronous communication between services uses Apache Kafka, a standard choice for high-throughput event streaming. Machine learning models are implemented in Python, reflecting the standard ML ecosystem. Observability infrastructure incorporates various tools for monitoring both system health and ML model performance.

The infrastructure employs a global sharding strategy where services are replicated across shards, with each customer assigned to a specific shard. This approach ensures quality of service across the customer base and provides a scaling model where bottlenecks are addressed by adding shards rather than vertically scaling individual services. Every service maintains copies across shards, providing isolation and fault tolerance.

## Production Maturity and Practical Realism

What distinguishes this case study is its grounded pragmatism about AI integration in critical financial infrastructure. The team is not claiming to have solved all problems or achieved dramatic transformation through AI. Instead, they're systematically adapting an existing, battle-tested system to incorporate AI tooling where it provides clear value while maintaining the reliability, security, and control that financial services demand.

The presentation notably calls for discussion with others facing similar challenges, acknowledging that their approach is evolving and that the broader community is collectively working through these problems. This humility and openness to learning stands in contrast to many vendor case studies that present polished success stories without acknowledging ongoing challenges.

The AI integration is relatively nascent - the team is implementing MCP servers and testing AI-assisted policy creation but not yet reporting quantitative results from production use at scale. This represents an honest snapshot of LLMOps in progress rather than a retrospective of completed transformation. The value proposition centers on improving iteration speed and autonomy for domain experts rather than wholesale automation or dramatic cost reduction.

## Architectural Patterns and Broader Applicability

Several architectural patterns emerge that have applicability beyond fraud detection. The evolution from code to declarative configuration to AI-assisted configuration represents a maturity curve that many production ML systems may follow. The use of shadow mode testing for validating changes before production impact is a critical reliability pattern for high-stakes systems. The integration of AI tooling through standardized protocols like MCP while maintaining existing authentication and authorization boundaries demonstrates how to add AI capabilities without compromising security models. The explicit domain segregation between business logic experts and infrastructure engineers shows how to leverage AI to enhance rather than replace human expertise.

The DefenseIO platform also demonstrates how policy engines and DSLs can serve as abstraction layers that enable both human-configured and AI-assisted rule generation while maintaining consistent execution semantics and operational characteristics. This architectural pattern may prove valuable for other domains where business experts need to create complex logic but shouldn't be writing production code.

The team's approach to unified interfaces - supporting multiple AI clients through a standardized MCP server rather than building a proprietary AI interface - reflects an emerging pattern for enterprise LLMOps where standardization and interoperability may prove more valuable than custom AI experiences.

## Balanced Assessment

From an LLMOps perspective, this case study illustrates both the promise and pragmatic challenges of integrating AI into production systems serving hundreds of millions of users. The measured approach prioritizing control and reliability over rapid AI adoption seems appropriate for financial services infrastructure. However, several aspects warrant critical consideration.

The quantitative impact of the AI integration remains unclear from the presentation. While the team demonstrates clear architectural thinking about how AI tooling should integrate with their platform, they don't provide metrics on productivity improvements, reduction in errors, or acceleration of rule development from AI-assisted policy creation compared to their existing declarative UI-based approach. This may reflect the early stage of deployment or the difficulty of measuring such impacts, but it leaves the business case for the AI investment somewhat undefined.

The choice to use MCP and support multiple AI interfaces is architecturally sound but introduces complexity around ensuring consistent behavior across different LLM backends and AI tools. The quality and reliability of policy generation will depend significantly on prompt engineering quality and the underlying LLM's capabilities, creating potential variability that may be challenging to control in a production environment where consistency is critical.

The security challenges the team identifies are fundamental and not yet fully resolved. The question of accountability for AI-generated policies, the ability to audit and explain automated decisions, and the risk of rapid policy proliferation creating unmanageable complexity are all significant concerns that the presentation acknowledges but doesn't claim to have solved. These represent real open problems in LLMOps for regulated industries.

The scalability question around policy proliferation is particularly acute. If AI tooling reduces the barrier to creating policies from days to minutes, there's a real risk of an explosion in policy count that could negatively impact system performance and create a maintenance nightmare. The team will need robust governance mechanisms to prevent AI-enabled productivity from creating new scalability and manageability problems.

Overall, this case study demonstrates sophisticated thinking about how to integrate AI capabilities into production financial infrastructure in a controlled, measured way. It represents LLMOps engineering maturity focused on practical enhancement of existing workflows rather than revolutionary transformation. The candid discussion of ongoing challenges provides valuable insight into the real complexities of deploying AI in high-stakes, regulated environments where reliability and security cannot be compromised for the sake of innovation.
