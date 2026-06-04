---
title: "AI-Driven DDoS Protection System Using Temporal Workflow Orchestration"
slug: "ai-driven-ddos-protection-system-using-temporal-workflow-orchestration"
draft: false
llmopsTags:
  - "fraud-detection"
  - "realtime-application"
  - "high-stakes-application"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "latency-optimization"
  - "error-handling"
  - "multi-agent-systems"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "cicd"
  - "scaling"
  - "orchestration"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "anthropic"
industryTags: "tech"
company: "Salesforce"
summary: "Salesforce built DREAM (DDoS Response and Mitigation), a next-generation distributed denial-of-service protection system that uses AI agents to detect attack patterns in real-time and orchestrate defense workflows across global cloud regions. The system addresses the challenge of protecting millions of customers on shared infrastructure against increasingly sophisticated attacks that have grown 70-80 times in volume and complexity over two years. By leveraging Temporal for workflow orchestration and AI for traffic analysis, Salesforce achieved 10x faster time-to-mitigation, 15x faster analysis cycles, and 3x improvement in end-to-end resolution while maintaining zero downtime across several months of production operation. The platform processes traffic at both Layer 7 (application) and Layer 3/4 (network) levels, combining AI-driven inference with decision layers to classify traffic into good, bad, and unknown actors, enabling subsecond detection, mitigation, and remediation."
link: "https://www.youtube.com/watch?v=mq8p5Yw_RGA"
year: 2026
seo:
  title: "Salesforce: AI-Driven DDoS Protection System Using Temporal Workflow Orchestration - ZenML LLMOps Database"
  description: "Salesforce built DREAM (DDoS Response and Mitigation), a next-generation distributed denial-of-service protection system that uses AI agents to detect attack patterns in real-time and orchestrate defense workflows across global cloud regions. The system addresses the challenge of protecting millions of customers on shared infrastructure against increasingly sophisticated attacks that have grown 70-80 times in volume and complexity over two years. By leveraging Temporal for workflow orchestration and AI for traffic analysis, Salesforce achieved 10x faster time-to-mitigation, 15x faster analysis cycles, and 3x improvement in end-to-end resolution while maintaining zero downtime across several months of production operation. The platform processes traffic at both Layer 7 (application) and Layer 3/4 (network) levels, combining AI-driven inference with decision layers to classify traffic into good, bad, and unknown actors, enabling subsecond detection, mitigation, and remediation."
  canonical: "https://www.zenml.io/llmops-database/ai-driven-ddos-protection-system-using-temporal-workflow-orchestration"
  ogTitle: "Salesforce: AI-Driven DDoS Protection System Using Temporal Workflow Orchestration - ZenML LLMOps Database"
  ogDescription: "Salesforce built DREAM (DDoS Response and Mitigation), a next-generation distributed denial-of-service protection system that uses AI agents to detect attack patterns in real-time and orchestrate defense workflows across global cloud regions. The system addresses the challenge of protecting millions of customers on shared infrastructure against increasingly sophisticated attacks that have grown 70-80 times in volume and complexity over two years. By leveraging Temporal for workflow orchestration and AI for traffic analysis, Salesforce achieved 10x faster time-to-mitigation, 15x faster analysis cycles, and 3x improvement in end-to-end resolution while maintaining zero downtime across several months of production operation. The platform processes traffic at both Layer 7 (application) and Layer 3/4 (network) levels, combining AI-driven inference with decision layers to classify traffic into good, bad, and unknown actors, enabling subsecond detection, mitigation, and remediation."
notion:
  pageId: "373f8dff-2538-805d-8142-fea1d23042da"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:18:00.000Z"
  lastEditedTime: "2026-06-02T07:18:00.000Z"
  publishedAt: "2026-06-04T08:26:53Z"
---

## Overview and Business Context

Salesforce's DREAM (DDoS Response and Mitigation) platform represents a sophisticated application of AI in production for critical network security infrastructure. The platform was developed by Salesforce's network security engineering team to address the escalating threat of distributed denial-of-service attacks targeting their multi-tenant cloud infrastructure serving millions of customers globally. The business imperative was particularly acute because attacks typically target individual customers but can impact entire shared infrastructure segments, creating cascading effects across multiple tenants.

The security team faced a dramatic evolution in the threat landscape, with sophisticated attacks increasing by 70-80 times over a two-year period in both volume and complexity. The barrier to creating sophisticated attack tools has lowered significantly with the advent of AI coding assistants, enabling attackers to generate complex automated attacks at machine speeds within hours. This asymmetry demanded a fundamental shift from human-speed defense to machine-speed autonomous protection, requiring subsecond detection, mitigation, and remediation capabilities.

The core mission was real-time detection and protection rather than forensic analysis. The team emphasized that forensic analysis after an attack occurs represents failure in their mission. Their strict requirement was to respond within seconds while operating across Salesforce's distributed cloud infrastructure spanning multiple public cloud vendors including AWS and GCP, unified through their Hyperforce abstraction layer.

## AI and LLM Usage in Production

The DREAM platform employs AI at two distinct levels in production. The first level is AI-driven inference for traffic analysis, which operates on both Layer 7 (application layer) and Layer 3/4 (network layer) traffic features. At Layer 7, the system analyzes actual connections, headers, and request bodies. In parallel, it examines Layer 3/4 features including IP addresses combined with historical traffic patterns. These AI inference engines emit quantitative numerical data representing the likelihood of certain traffic patterns being attack traffic.

The second level is the AI decision layer, which translates quantitative data from the inference layer into actionable insights. This layer performs threat assessment by combining signals from the AI inference level and running them through machine learning algorithms to produce specific mitigation strategies. The output is a classification of actors (which can be IP addresses, connection headers, or other identifiers) into three categories: good, bad, and unknown. Different policies are applied to each category, with the goal of filtering bad traffic while maintaining optimal customer experience even for impacted customers.

The architecture deliberately separates inference from decision-making, creating a clear boundary between pattern recognition and action. This separation allows the system to maintain both speed and accuracy, as the inference layer can process traffic patterns rapidly while the decision layer ensures appropriate responses based on multiple signal combinations.

## LLMOps and Production Deployment Architecture

The DREAM platform is built on Temporal as its core orchestration engine. The team evaluated three options during architecture design: building everything from scratch, stitching existing tools together (using Kafka for queues, Airflow for scheduling, Zookeeper for distributed locks), or adopting Temporal. They selected Temporal because it provided all their strict requirements out of the box, enabling them to focus on business logic from day one rather than reimplementing solved computer science problems.

Their requirements included task execution across distributed cloud infrastructure, fault tolerance, concurrency control with distributed locks, and comprehensive visibility for monitoring distributed systems. Temporal's architecture allowed them to structure code cleanly using workflows for deterministic execution flow control and activities for external interactions including LLM calls, notifications to PagerDuty and Slack, and mitigation actions at the cloud edge.

The deployment architecture separates the DREAM API Response and Mitigation layer (containing DDoS detection, AI-driven inference, and mitigation logic) from the DREAM Temporal Integration layer (handling interaction with Temporal clusters and external systems). Within the integration layer, they maintain separate workers for workflows and activities, running in different Kubernetes pods with different resource allocations. Workflow workers are lightweight, controlling execution flow, while activity workers are computationally intensive, handling CPU-intensive tasks with dedicated process pools. This separation enables independent scaling and resource optimization.

Salesforce operates Temporal as an internal service provided by their platform team, offering temporal clusters available to all internal teams. The DREAM platform leverages this temporal-as-a-service infrastructure, with separate queues for workflow and activity workers to ensure fault isolation and appropriate resource allocation.

## AI-Assisted Development Practices

Beyond AI in production, the team extensively used AI for development of the platform itself. Their experience revealed both benefits and significant pitfalls. They characterized AI-generated code as appearing like a beautiful garden at first glance, but containing subtle landmines that function as time bombs in production code.

One critical example involved the difference between Python's asyncio.gather and Temporal's workflow.wait. While asyncio.gather is standard Python and commonly suggested by AI coding assistants, it uses Python sets which are unordered, creating nondeterministic behavior. This nondeterminism violates Temporal's core promise of durability through deterministic replay. When workflows crash and need to replay, nondeterministic code prevents reliable recovery, causing runtime errors. AI tools initially suggested standard Python patterns without understanding Temporal's specific requirements.

The solution was providing extensive context to AI models about how Temporal SDKs are written and how determinism guarantees are maintained. By feeding the AI tools documentation and examples from Temporal's well-written SDK code, they achieved much smoother development. The lesson was to teach AI rather than just prompt it, providing architectural context specific to their framework.

This AI-assisted approach enabled dramatic development velocity, converting 100,000 lines of legacy code to a Temporal-based system within a single quarter at 10x the speed of traditional development with minimal bugs. Their development philosophy became "humans ideate, AI creates, and Temporal operates."

## Production Challenges and Solutions

Despite development efficiency gains, the team encountered expensive lessons when deploying to production. Two major issues emerged: the timeout trap and the 2MB wall. These challenges stemmed from using Temporal inappropriately as a data warehouse rather than as an orchestration coordinator.

The 2MB wall issue arose from passing extensive context between workflows and activities. Each workflow-to-activity call involves actual network communication via gRPC, not just function calls. Because their number-crunching operations involved substantial data movement, they repeatedly hit gRPC's 4MB limit and the 2MB per-parameter limit. This caused immediate, loud failures with clear error messages.

The timeout trap was more subtle and harder to diagnose. As workflow history grew due to context bloat, certain corner cases caused problems during workflow replay. When workers maintain hot sticky cache, replays happen in milliseconds. However, when sticky cache misses occur (such as after worker restarts), workflows must replay from the beginning by loading entire history. Bloated histories combined with gRPC communication overhead caused replays to exceed default timeout deadlines of 5-10 seconds. This primarily affected long-running workflows and only manifested under specific conditions, making it challenging to identify during testing.

The solutions involved two patterns. First, they implemented S3 offload for large data, storing context externally rather than bloating Temporal's internal history. Second, they used Temporal's continue-as-new feature to prune history size. They monitor history size and trigger continue-as-new when approaching the 2MB threshold. Continue-as-new preserves the workflow ID while creating a fresh history, effectively resetting the replay burden while maintaining workflow continuity.

## Operational Results and Impact

The production deployment achieved substantial operational improvements across multiple metrics. Time-to-mitigation improved 10x compared to their previous system, meaning they protect customers 10x faster from the moment an attack is detected until mitigation is deployed. This represents the most critical metric for DDoS protection, as each second of delay can impact customer availability.

Analysis cycle performance improved 15x over the previous system. This acceleration in number-crunching and data analysis provides additional headroom for implementing even more sophisticated analysis algorithms and mitigation strategies, creating a virtuous cycle of continuous improvement.

End-to-end resolution showed 3x improvement, which is particularly noteworthy because it includes human-in-the-loop validation. The team maintains humans in the loop as a critical safeguard against false positive blocks or inappropriate mitigations. Temporal's architecture enabled them to provide richer context to human reviewers, accelerating their decision-making through better evidence presentation and validation workflows.

The system has maintained zero downtime across several months of production operation despite ongoing development and deployment activities. This reliability record demonstrates both Temporal's fault tolerance capabilities and the robustness of their architecture design.

## Critical Design Principles and Trade-offs

The team emphasized simplicity as a core design principle. They structured the architecture into clear layers with well-defined responsibilities, avoiding complexity that would impede understanding and maintenance. The separation between AI inference and AI decision-making, and between workflow workers and activity workers, reflects this commitment to clarity.

Their choice to separate workflows from activities along resource boundaries represents a deliberate trade-off. While this adds deployment complexity (managing separate worker pools), it provides critical operational benefits through independent scaling, fault isolation, and appropriate resource allocation for different computational profiles. Activity workers handling synchronous CPU-intensive tasks with dedicated process pools exemplify this optimization strategy.

The decision to rely on external storage for large data rather than passing it through Temporal represents another key trade-off. While this adds dependency on external systems (S3), it preserves Temporal's core strengths in orchestration rather than forcing it to serve as a data pipeline. This architectural decision aligns with using the right tool for each specific purpose.

The human-in-the-loop design choice trades some automation speed for accuracy and safety. In a domain where false positives can block legitimate customer traffic, maintaining human oversight for critical decisions represents a prudent balance between speed and correctness. The 3x improvement in end-to-end resolution despite human involvement demonstrates that automation can accelerate human decision-making even when humans retain final authority.

## Architectural Patterns and Technical Details

The end-to-end flow demonstrates sophisticated workflow orchestration. Detection signals trigger API calls to the DREAM Temporal integration layer, which schedules workflows in the Temporal cluster. Workflow workers pull tasks and determine execution flow, scheduling activities back to the cluster. Activity workers then pull activity tasks and perform actual work including AI inference calls, external notifications, and mitigation deployment at the cloud edge.

The mitigation deployment programs cloud infrastructure at the edge to apply policies based on actor classification. This edge deployment ensures that malicious traffic is blocked as close to the source as possible, minimizing resource consumption and protecting shared infrastructure tenants.

The platform's visibility and monitoring capabilities leverage Temporal's built-in observability. The team emphasized that managing distributed systems requires measurement, quoting the principle that "if you can't measure it, you can't manage it." Temporal's visibility into workflow execution across distributed infrastructure proved essential for operating the system at global scale.

The system handles both synchronous and asynchronous activities appropriately for different use cases. Synchronous activities with dedicated process pools handle computationally intensive tasks, while asynchronous activities manage longer-running operations and external integrations.

## Broader Implications for LLMOps

This case study demonstrates several important patterns for LLM and AI operations in production. First, it shows the value of separating inference from decision-making, creating clear boundaries between pattern recognition and action. This separation enables independent optimization and clearer reasoning about system behavior.

Second, it illustrates the importance of choosing appropriate infrastructure for AI workloads. Temporal excels at orchestration but isn't designed as a data warehouse. Recognizing this distinction and using external storage appropriately prevents architectural mismatches that cause production issues.

Third, the experience with AI-assisted development reveals both opportunities and risks. AI tools can dramatically accelerate development when provided with appropriate framework-specific context, but they can introduce subtle bugs when applying general patterns to specialized frameworks. Teaching AI through context rather than just prompting emerges as a critical practice.

Fourth, the case demonstrates that machine-speed problems require machine-speed solutions. The evolution of attacks from human-generated to AI-generated necessitated corresponding evolution in defense from human-operated to autonomous AI-driven protection. This pattern likely applies to many domains beyond security where threat and defense co-evolve.

Finally, the system shows how to balance automation with human oversight. Rather than pursuing full automation, they designed workflows that accelerate human decision-making through better context and evidence, achieving dramatic improvements while maintaining human judgment for critical decisions. This hybrid approach may represent a sustainable pattern for many high-stakes AI applications.
