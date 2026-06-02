---
title: "Multi-Cloud LLM Infrastructure Evolution at Scale"
slug: "multi-cloud-llm-infrastructure-evolution-at-scale"
draft: false
llmopsTags:
  - "chatbot"
  - "summarization"
  - "question-answering"
  - "high-stakes-application"
  - "prompt-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "a2a"
  - "evals"
  - "monitoring"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "scaling"
  - "devops"
  - "orchestration"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
  - "amazon-aws"
  - "google-gcp"
industryTags: "tech"
company: "Slack"
summary: "Slack evolved their production LLM infrastructure through four distinct phases over three years (2023-2026) to serve AI features to millions of enterprise users. Starting with AWS SageMaker's managed infrastructure, they migrated to Amazon Bedrock for operational simplicity and faster model access, then adopted hybrid provisioned/on-demand capacity to optimize costs and upgrade flexibility, and finally expanded to a multi-cloud architecture incorporating Google Cloud Platform Vertex AI. This multi-cloud strategy addresses single-provider risk, enables best-of-breed model selection for specific features, provides dynamic workload orchestration, and delivers measurable improvements including ~10% quality gains for reasoning tasks and ~67% latency reduction for high-velocity workloads, while maintaining zero customer-facing incidents during major migrations."
link: "https://slack.engineering/slack-ai-the-path-to-multi-cloud/"
year: 2026
seo:
  title: "Slack: Multi-Cloud LLM Infrastructure Evolution at Scale - ZenML LLMOps Database"
  description: "Slack evolved their production LLM infrastructure through four distinct phases over three years (2023-2026) to serve AI features to millions of enterprise users. Starting with AWS SageMaker's managed infrastructure, they migrated to Amazon Bedrock for operational simplicity and faster model access, then adopted hybrid provisioned/on-demand capacity to optimize costs and upgrade flexibility, and finally expanded to a multi-cloud architecture incorporating Google Cloud Platform Vertex AI. This multi-cloud strategy addresses single-provider risk, enables best-of-breed model selection for specific features, provides dynamic workload orchestration, and delivers measurable improvements including ~10% quality gains for reasoning tasks and ~67% latency reduction for high-velocity workloads, while maintaining zero customer-facing incidents during major migrations."
  canonical: "https://www.zenml.io/llmops-database/multi-cloud-llm-infrastructure-evolution-at-scale"
  ogTitle: "Slack: Multi-Cloud LLM Infrastructure Evolution at Scale - ZenML LLMOps Database"
  ogDescription: "Slack evolved their production LLM infrastructure through four distinct phases over three years (2023-2026) to serve AI features to millions of enterprise users. Starting with AWS SageMaker's managed infrastructure, they migrated to Amazon Bedrock for operational simplicity and faster model access, then adopted hybrid provisioned/on-demand capacity to optimize costs and upgrade flexibility, and finally expanded to a multi-cloud architecture incorporating Google Cloud Platform Vertex AI. This multi-cloud strategy addresses single-provider risk, enables best-of-breed model selection for specific features, provides dynamic workload orchestration, and delivers measurable improvements including ~10% quality gains for reasoning tasks and ~67% latency reduction for high-velocity workloads, while maintaining zero customer-facing incidents during major migrations."
notion:
  pageId: "372f8dff-2538-807f-af40-f949e7eac260"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-01T11:10:00.000Z"
  lastEditedTime: "2026-06-01T11:10:00.000Z"
  publishedAt: "2026-06-02T07:04:01Z"
---

## Overview

Slack's journey to production-scale LLM infrastructure represents a comprehensive case study in enterprise LLMOps, spanning from early 2023 through mid-2026. The engineering blog post details how Slack evolved from basic managed ML infrastructure to a sophisticated multi-cloud orchestration platform serving millions of users across their AI-powered features including channel summaries, AI search, and daily recaps. The narrative is structured around four distinct architectural phases, each addressing specific operational, performance, and strategic challenges that emerged as their AI capabilities matured.

The case study provides valuable insights into real-world tradeoffs between operational complexity, cost efficiency, model quality, and system reliability. While the post is inherently promotional (being published on Slack's engineering blog), it offers substantive technical detail about infrastructure decisions, migration strategies, and the engineering discipline required to maintain enterprise-grade reliability while rapidly evolving the underlying technology stack.

## Phase 1: AWS SageMaker Foundation (Early 2023)

Slack's initial LLM deployment leveraged AWS SageMaker as the managed ML serving platform. The primary drivers for this choice were security requirements, FedRamp compliance, model availability, and operational control—all critical for an enterprise collaboration platform handling sensitive customer data. A particularly notable architectural decision was implementing a sophisticated "escrow virtual private cloud (VPC)" strategy that created a zero-knowledge environment where Slack's data remained completely private while the provider's proprietary model weights remained inaccessible to Slack's infrastructure.

To achieve global coverage and high availability, Slack deployed SageMaker containers across multiple AWS regions. This multi-region deployment introduced significant operational overhead including cross-region IAM role management, balanced routing logic across model endpoints, proactive capacity planning workflows, and custom auto-scaling implementations. The team had to build substantial infrastructure plumbing to make this architecture function reliably.

The operational reality of this phase revealed three significant challenges that the post characterizes as "taxes" on the engineering organization. First, scaling latency became a constraint—SageMaker container initialization times prevented instantaneous scaling in response to traffic spikes, requiring careful pre-provisioning. Second, hardware scarcity emerged as a persistent issue, with enterprise-grade Nvidia GPUs (specifically A100 Ampere architecture and emerging H100 Hopper architecture instances) frequently unavailable when needed. Third, these constraints forced over-provisioning to maintain service level agreements, resulting in significant idle capacity costs during off-peak hours.

Slack's mitigation strategies included leveraging AWS On-Demand Capacity Reservations (ODCR) and implementing proactive cron-based scaling that anticipated traffic patterns. While these techniques improved operational stability, they reinforced a fundamental tension: the engineering team was spending disproportionate effort on infrastructure management rather than model performance and feature development.

An additional strategic challenge emerged around model freshness. As AWS prioritized Amazon Bedrock (their purpose-built managed LLM service) over SageMaker for new model releases, Slack found themselves in a persistent "catch-up" cycle. Hosting Anthropic models through the escrow VPC architecture meant that model iterations and optimizations often appeared on Bedrock weeks or months before becoming available on SageMaker. For a product where cutting-edge model quality directly impacts competitive positioning, this lag became increasingly problematic.

## Phase 2: Migration to Amazon Bedrock (Mid-2024)

By mid-2024, AWS Bedrock had matured sufficiently to meet Slack's stringent requirements, achieving FedRamp Moderate compliance while maintaining the same security posture as their SageMaker deployment. The migration represented a strategic pivot driven by three primary advantages: operational simplicity through fully managed services, immediate access to the latest models upon public release, and infrastructure efficiency through Bedrock's flexible capacity models.

Bedrock introduced two distinct infrastructure options that Slack leveraged for different use cases. Provisioned Throughput (PT) provided dedicated, predictable capacity measured in "Model Units" (MUs) rather than raw GPU instances—an abstraction that allowed the team to focus on throughput guarantees rather than hardware management. Slack utilized PT for interactive, latency-sensitive features like channel summaries where consistent performance was critical. On-Demand (OD) infrastructure, conversely, offered elastic scaling without idle capacity costs, which Slack applied to bursty, scheduled workloads like their daily Recap feature.

The migration itself demonstrates impressive engineering discipline and risk management. Slack implemented a multi-stage strategy encompassing compliance verification (securing Legal, Security, and FedRamp approvals before routing production traffic), capacity planning (extensive load testing to map exact Model Unit requirements matching their SageMaker baseline across diverse traffic profiles), quality assurance (A/B testing and evaluation frameworks comparing outputs side-by-side for both quality and latency parity), and gradual rollout (feature flags enabling incremental traffic shifts with instant rollback capabilities).

The result was a "zero-incident migration"—no customer-facing disruptions despite completely replacing the backend infrastructure serving live production traffic. The post attributes this success to being "borderline obsessed with parity," running massive load tests and shadow requests to determine precise capacity requirements, and using feature flags for gradual traffic migration with immediate rollback capabilities. This establishes a core principle that pervades Slack's LLMOps philosophy: measure first, migrate gradually, and monitor continuously.

The operational benefits were substantial and immediate. Engineering efficiency improved dramatically as the team offloaded infrastructure burden, allowing focus on model performance and feature quality. Because Bedrock served as AWS's primary launchpad for new LLMs, Slack gained the ability to deliver model upgrades weeks or months earlier than previously possible, directly enhancing user experience. A concrete example cited is the rapid upgrade of AI Search features to new high-reasoning models, yielding more precise, context-aware answers. Architectural simplicity improved as the team moved from managing endpoint lifecycles, GPU instance coordination, and complex capacity reservations to simply requesting quota from AWS and serving traffic against provisioned Model Units.

This transition enabled a shift from reactive scaling (responding to capacity shortfalls) to strategic forecasting, projecting needs several weeks ahead to give account teams sufficient time to secure capacity. The zero-incident standard reinforced Slack's operational maturity and established credibility for future infrastructure evolution.

However, two efficiency gaps persisted even with Bedrock Provisioned Throughput. The over-provisioning cycle remained problematic—Slack's usage patterns closely track global workday patterns, with massive surges during US East and West Coast mornings when users rely heavily on AI summaries and search to catch up on activity. To ensure responsive performance during these peaks, the team had to maintain high baseline Model Units, resulting in significant underutilized capacity during APAC/EU mornings, between regional handoffs, and over weekends. Additionally, Provisioned Throughput commitments of one to six months created a commitment lock-in problem. In the rapidly evolving LLM landscape where state-of-the-art models can be superseded within weeks, these long-term commitments effectively slowed upgrade velocity—even when superior models became available, the team often chose to wait for existing commitments to expire before migrating.

## Phase 3: Hybrid Provisioned/On-Demand Strategy (2025-Early 2026)

Building on operational confidence with Bedrock and mature monitoring infrastructure, Slack moved to close the efficiency and quality gaps identified in Phase 2. Historical analysis revealed feature usage fluctuating with business hours, creating predictable idle capacity overnight and during regional troughs. Transitioning to on-demand infrastructure addressed the idle capacity problem while providing architectural agility to support highly variable workloads. For features exhibiting 10x variance between peak and off-peak hours, the efficiency gains were substantial.

More strategically, on-demand infrastructure removed the technical bottleneck of multi-month commitments. Freed from contractual lock-in, Slack regained the ability to migrate features to different models as soon as new, more performant options passed internal quality and metrics thresholds—reducing migration cycles from months to days. This dramatically accelerated their ability to incorporate model improvements into production features.

Rather than wholesale migration to on-demand, Slack implemented a hybrid routing strategy optimizing for both performance and cost efficiency. High-volume, latency-sensitive features remained on dedicated Provisioned Throughput capacity to ensure consistent, "snappy" user experience. Asynchronous, bursty workloads like nightly Recaps moved to on-demand capacity, eliminating costs for idle compute. To bridge these models, the team engineered a "spillover pattern"—if sudden surges pushed traffic beyond reserved PT limits, excess requests automatically spilled over to on-demand endpoints, ensuring no requests were dropped due to capacity ceilings.

This hybrid approach introduced new tradeoffs requiring careful engineering. Service level variability became a consideration, as on-demand operates on a shared-resource model with different uptime characteristics than dedicated infrastructure. Regional capacity orchestration became critical—success with on-demand relies on the cloud provider's ability to manage demand across their entire customer base, rather than having explicitly reserved hardware. This introduced concentration risk: over-reliance on a single provider's on-demand pool meant any service-wide disruption could impact multiple Slack AI features simultaneously.

To mitigate these risks, Slack built a more sophisticated AI platform abstraction implementing model hierarchies for every AI feature. This hierarchy enabled automatic fallback to different models if the primary model reached a degraded state (defined by metrics including elevated time-to-first-token latencies, throttling errors, or downward trends in customer feedback). If a specific model was underperforming or hitting limits in one region, the platform would reroute requests in real-time to another healthy endpoint, maintaining seamless user experience without visible failover.

While this internal fallback logic significantly increased service resilience, it highlighted two strategic gaps. First, regardless of internal failover sophistication within a single cloud provider, the infrastructure remained susceptible to provider-wide outages. Second, the fragmented and rapidly evolving AI landscape meant state-of-the-art models for specific tasks (summarization, reasoning, high-speed extraction) could change within weeks, and leading models were often exclusive to specific cloud providers. Single-vendor reliance potentially limited access to the highest-quality technology available. These realizations catalyzed the next evolution: true multi-cloud architecture.

## Phase 4: Multi-Cloud Expansion (Early 2026)

By early 2026, Slack officially expanded their infrastructure to include Google Cloud Platform (GCP) Vertex AI, not merely as failover redundancy but as a strategic engine for product innovation through broader access to state-of-the-art models. The multi-cloud decision was driven by four key factors, each addressing limitations of the single-provider approach.

Infrastructural redundancy and high availability became paramount for a mission-critical "Digital HQ" where uptime is the primary metric. While Slack continued relying on third-party LLM models for consistency and reliability, multi-cloud footprint eliminated provider-level large-scale infrastructural disruptions as a single point of failure. If an entire cloud ecosystem experienced regional or platform-wide disruption, traffic could reroute to a separate, healthy stack without service interruption.

Model-to-feature optimization enabled granular matching of specific model strengths to specific feature requirements, moving beyond "one-size-fits-all" LLM deployment. Expanding the catalog to include multiple models across providers delivered immediate measurable performance gains: approximately 10% improvement in quality metrics for complex reasoning tasks, and approximately 67% reduction in latency for high-velocity, low-token workloads. These are substantial improvements that directly enhance user experience.

Access to innovation addressed the velocity and exclusivity challenges of the AI landscape. Multi-cloud ensures Slack can integrate the latest breakthroughs regardless of hosting provider while maintaining compliance, privacy, and security standards. This flexibility is critical given how rapidly model capabilities evolve and the frequency of vendor-exclusive releases.

Dynamic workload orchestration extends beyond simple failover to sophisticated traffic shaping based on real-time telemetry. The system can route requests evaluating not just provider health, but which endpoint offers the optimal performance profile for a given workload at that exact moment. This transforms infrastructure from a static resource pool into a dynamic, intelligent routing layer.

The integration journey required massive cross-functional coordination. Building production-ready GCP integration involved tight synchronization across Security, Risk and Compliance, Trust and Integrity, AI Quality, Legal, and Cloud Provider teams to ensure data boundaries remained ironclad across both platforms. Technical challenges included solving cold start engineering hurdles by implementing secretless authentication and building an API normalization layer that translates disparate provider signals into unified language for application logic.

The core technical achievement was evolving their abstraction layer into an "Intelligent Routing Layer" ensuring users receive the fastest, highest-quality response available. If one model or provider exhibits degradation, the system instantly reroutes requests to better-performing alternatives, making underlying complexity completely invisible while maintaining seamless experience. This routing layer incorporates several sophisticated mechanisms.

Metric-driven model selection uses internal quality metrics to determine optimal models for each feature. If benchmarks show a specific LLM outperforms others for a particular use case (e.g., Recaps), the router directs traffic accordingly. Critically, the system always designates backup models for every feature—if the primary choice fails to meet performance or quality thresholds in real-time, the system knows exactly where to fail over.

Experimental rules and A/B testing capabilities fundamentally changed release velocity. When testing the latest LLMs for features like Recaps, after security and compliance verification, the team could route a percentage of traffic to new models with minimal code changes and rapid turnaround. This tightened the feedback loop from weeks to days, dramatically accelerating iteration cycles.

Automated circuit breaker and health monitoring moved beyond manual failovers to real-time automated resilience. The circuit breaker pattern acts as a continuous watchdog monitoring health signals at the endpoint level. If a specific provider or model exhibits distress signals—elevated time-to-first-token (TTFT), spike in 5xx error rates, or crossing latency p90 thresholds—the circuit "trips," automatically diverting traffic to healthy alternatives based on use case and complexity. Crucially, the breaker enters a partial-open state allowing controlled trickle traffic to the degraded endpoint. As the endpoint demonstrates sustained health, the system dynamically expands this trickle, incrementally ramping traffic until the breaker fully "closes" and normal operations resume. This ensures graceful recovery without overwhelming a stabilizing service.

The post acknowledges the significant operational complexity introduced by multi-cloud architecture. API and behavioral friction emerged as each provider has unique API patterns, proprietary error codes, and distinct rate-limiting behaviors. Slack built a robust normalization layer ensuring that different error conditions (e.g., "Rate Limit Exceeded" from one provider and "Throttling Exception" from another) are handled identically by application logic.

Operational monitoring complexity increased substantially—relying on native dashboards from each cloud would create blind spots. Slack built a unified monitoring stack integrating telemetry from multiple clouds into a single view, enabling on-call engineers to diagnose issues without pivoting between consoles. The attribution challenge made accurately tracking cost per feature significantly harder when workloads shift dynamically between clouds, requiring deep instrumentation across multiple billing systems to maintain financial transparency.

The on-call knowledge gap widened as engineers can no longer specialize in a single ecosystem. Supporting the platform effectively requires provider-agnostic expertise possessing deep knowledge of infrastructure patterns and networking nuances spanning multiple major cloud environments. This shift demands a broader skill set for effective troubleshooting and maintenance of the distributed, multi-vendor footprint.

## Critical Assessment and LLMOps Insights

While the post is promotional in nature, it offers substantial value as an LLMOps case study by providing concrete technical details, quantified outcomes, and honest acknowledgment of tradeoffs. Several aspects deserve critical consideration.

The zero-incident migration claims are impressive but represent best-case scenarios requiring significant investment in testing infrastructure, gradual rollout mechanisms, and monitoring. Organizations without Slack's engineering resources and mature DevOps culture should expect more friction in similar migrations. The emphasis on "borderline obsessed with parity" and extensive load testing reflects the level of discipline required to achieve these results.

The quantified improvements (~10% quality gains, ~67% latency reduction) are notable but lack detailed context about measurement methodologies, baseline comparisons, or whether these improvements are consistent across all features or represent cherry-picked examples. Without understanding the evaluation frameworks and statistical rigor, these numbers should be interpreted as directional rather than definitive.

The multi-cloud strategy addresses legitimate concerns around provider lock-in and single points of failure, but the operational complexity costs are substantial. The post acknowledges increased overhead in monitoring, cost attribution, API normalization, and engineering skill requirements. For many organizations, these costs may outweigh benefits, particularly if they lack Slack's scale, engineering maturity, or strict uptime requirements. Multi-cloud is not universally optimal—it's a tradeoff appropriate for specific contexts.

The architectural evolution reflects sound LLMOps principles: starting with managed services to defer undifferentiated infrastructure work, building abstraction layers to enable provider portability, implementing gradual migration strategies with rollback capabilities, establishing comprehensive monitoring and evaluation frameworks, and evolving architecture in response to operational experience rather than premature optimization.

The intelligent routing layer with circuit breakers, automated failover, model hierarchies, and real-time health monitoring represents sophisticated infrastructure that many organizations aspire to but few successfully implement. The capability to A/B test new models with minimal code changes and rapid iteration cycles is a significant competitive advantage that requires substantial platform investment to achieve.

The case study illustrates the tension between operational simplicity and strategic flexibility. Each phase traded some dimension of simplicity (SageMaker's control, Bedrock's single-provider consistency) for flexibility (faster model access, hybrid capacity models, multi-cloud redundancy). This reflects a mature understanding that there is no single "correct" architecture—only architectures appropriate to specific organizational contexts, scale, and priorities.

The emphasis on security, compliance, and data privacy (FedRamp compliance, escrow VPC, zero-knowledge environments) throughout the journey highlights that enterprise LLMOps differs fundamentally from consumer or research contexts. These constraints shape architecture decisions and complicate migrations in ways that purely technical performance considerations do not.

Overall, this case study provides valuable insights into the operational realities of running production LLM infrastructure at scale, the iterative nature of architectural evolution, and the engineering discipline required to maintain reliability while rapidly adopting new technologies. While the specific solutions are tailored to Slack's context (enterprise collaboration, global scale, strict compliance requirements), the principles and tradeoffs generalize to other organizations navigating similar LLMOps challenges.
