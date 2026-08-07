---
title: "VM-Based Agent Sandbox Infrastructure for Multi-Tenant AI Platform"
slug: "vm-based-agent-sandbox-infrastructure-for-multi-tenant-ai-platform"
draft: false
llmopsTags:
  - "chatbot"
  - "multi-modality"
  - "agent-based"
  - "multi-agent-systems"
  - "kubernetes"
  - "docker"
  - "security"
  - "orchestration"
  - "open-source"
  - "amazon-aws"
industryTags: "tech"
company: "Japan AI"
summary: "Japan AI, a company providing AI agent services to enterprise customers in the Japanese market, faced security and operational challenges with their initial SaaS-based sandbox solution for running customer AI agents. The problems included runtime limits, concurrency restrictions, lack of GPU support, data control concerns, and high costs. They migrated to a self-hosted VM-based sandbox infrastructure using Kata Containers on Kubernetes, leveraging open source technologies including containerD, KVM, Dragonfly, and Nydus for image distribution. This solution provided kernel-level isolation for untrusted code, eliminated the 24-hour runtime limits, removed concurrency ceilings, enabled GPU support, and maintained data control while keeping the same sandbox API for seamless migration. The implementation achieved warm container starts in approximately 1.4 seconds and demonstrated the viability of building production-grade agent sandboxes using cloud-native technologies."
link: "https://www.youtube.com/watch?v=aFX_6HL_i80"
year: 2026
seo:
  title: "Japan AI: VM-Based Agent Sandbox Infrastructure for Multi-Tenant AI Platform - ZenML LLMOps Database"
  description: "Japan AI, a company providing AI agent services to enterprise customers in the Japanese market, faced security and operational challenges with their initial SaaS-based sandbox solution for running customer AI agents. The problems included runtime limits, concurrency restrictions, lack of GPU support, data control concerns, and high costs. They migrated to a self-hosted VM-based sandbox infrastructure using Kata Containers on Kubernetes, leveraging open source technologies including containerD, KVM, Dragonfly, and Nydus for image distribution. This solution provided kernel-level isolation for untrusted code, eliminated the 24-hour runtime limits, removed concurrency ceilings, enabled GPU support, and maintained data control while keeping the same sandbox API for seamless migration. The implementation achieved warm container starts in approximately 1.4 seconds and demonstrated the viability of building production-grade agent sandboxes using cloud-native technologies."
  canonical: "https://www.zenml.io/llmops-database/vm-based-agent-sandbox-infrastructure-for-multi-tenant-ai-platform"
  ogTitle: "Japan AI: VM-Based Agent Sandbox Infrastructure for Multi-Tenant AI Platform - ZenML LLMOps Database"
  ogDescription: "Japan AI, a company providing AI agent services to enterprise customers in the Japanese market, faced security and operational challenges with their initial SaaS-based sandbox solution for running customer AI agents. The problems included runtime limits, concurrency restrictions, lack of GPU support, data control concerns, and high costs. They migrated to a self-hosted VM-based sandbox infrastructure using Kata Containers on Kubernetes, leveraging open source technologies including containerD, KVM, Dragonfly, and Nydus for image distribution. This solution provided kernel-level isolation for untrusted code, eliminated the 24-hour runtime limits, removed concurrency ceilings, enabled GPU support, and maintained data control while keeping the same sandbox API for seamless migration. The implementation achieved warm container starts in approximately 1.4 seconds and demonstrated the viability of building production-grade agent sandboxes using cloud-native technologies."
notion:
  pageId: "3b5f8dff-2538-80a2-8c0f-cef99b49488a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:14:00.000Z"
  lastEditedTime: "2026-08-07T12:14:00.000Z"
  publishedAt: "2026-08-07T13:06:12Z"
---

## Overview

Japan AI operates an AI agent platform serving enterprise customers in the Japanese market. Their platform is inherently multi-tenant, allowing each customer to create custom AI agents, design workflows, run their own program tools via MCP servers, and deliver web pages—all within the Japan AI infrastructure. This high degree of flexibility creates significant security and operational challenges, particularly around isolation and lifecycle management of AI agent workloads.

The platform requires strong security boundaries because AI agents frequently handle sensitive credentials for accessing external services like Slack, email, and Notion on behalf of users. Additionally, agents process prompts and context data from users that may contain unpredictable or potentially malicious inputs. From an operational perspective, the platform must handle arbitrary customer code that may contain bugs, infinite loops, or other issues requiring robust lifecycle management and cleanup mechanisms.

## Initial Approach and Challenges

Japan AI initially adopted a SaaS-based sandbox solution as a quick win to accelerate time to market. This decision allowed them to focus on core business logic rather than infrastructure concerns during the early stages. However, as their business grew and use cases diversified, they encountered several critical limitations with the SaaS sandbox approach:

- **Runtime Limits**: The SaaS sandbox imposed a 24-hour maximum runtime limit, which proved restrictive for certain long-running agent workflows
- **Concurrency Restrictions**: Built-in concurrency limits constrained their ability to scale with customer demand
- **No GPU Support**: The inability to leverage GPU acceleration limited performance for certain AI workloads
- **Data Residency Concerns**: Sensitive customer data was leaving their direct control, raising compliance and security questions
- **High Costs**: The economic model of the SaaS solution became increasingly expensive at scale
- **Limited Customization**: While client libraries could be modified, the underlying platform capabilities remained fixed and outside their control

## Architectural Requirements

Before building their own solution, the team carefully defined what a sandbox actually means in their context. They identified two fundamental requirements:

**Clear Lifecycle Management**: A sandbox must have a complete lifecycle encompassing creation, configuration, execution, observation, reset, and destruction. The team recognized that a pod is merely an object within this lifecycle, not the sandbox itself. This conceptual distinction proved important for their architecture.

**Strong Isolation with Separate Kernel**: While container-based isolation using namespaces and cgroups offers benefits like fast startup and high density, it shares the host kernel across all containers. For Japan AI's use case—running arbitrary, potentially untrusted code from multiple tenants—this shared kernel represented an unacceptable security risk. They determined that true isolation required each sandbox to have its own guest kernel, necessitating a VM-based approach.

## Technical Solution Architecture

The resulting architecture combines multiple open source technologies into an integrated stack:

**Runtime Layer**: At the top level, agent code runs against the agent sandbox API. This abstraction layer proved crucial for migration, as it allowed Japan AI to maintain API compatibility while completely changing the underlying implementation. The runtime connects to Kubernetes, which orchestrates the infrastructure below.

**Container and VM Infrastructure**: The core runtime stack consists of containerD for container management, Kata Containers for VM-based container execution, and KVM as the underlying hypervisor. Kata Containers, a project co-founded by one of the presenters nine years prior, provides the critical capability of VM-level isolation while maintaining standard container workflows. This means the same container images, the same Kubernetes APIs, and the same operational patterns work—only the runtime class differs.

**Kata Containers 4.0**: The solution leverages Kata Containers 4.0, released shortly before the presentation. This version introduced a fully Rust-based runtime with a built-in Rust VM monitor, consolidating what was previously multiple processes into a single process for both the shim and sandbox. This architectural simplification improved both manageability and performance.

**PVM Technology**: A particularly notable component is PVM (Page Table-based Virtual Machine), a KVM driver that enables running virtual machines on any EC2 instance, even those without nested virtualization support. This technology had already been proven in Ant Group's production environment for sales operations. According to the presenters, PVM performs faster than traditional nested virtualization and essentially "completes" Kata Containers by removing infrastructure constraints that previously limited where VM-based sandboxes could run.

**Image Distribution**: For the image layer, the solution incorporates Dragonfly for P2P image distribution and Nydus for lazy loading. Nydus is a sub-project of Dragonfly, which graduated from CNCF in the prior year. This combination enables near-zero second container startup times by pulling only metadata initially and fetching image data on-demand as needed. This lazy loading capability significantly accelerates sandbox initialization.

**Lifecycle Management**: The architecture includes comprehensive snapshotting and data collection mechanisms. When sandboxes are disposed of, the system captures necessary information for debugging and auditing while ensuring complete cleanup of sensitive data.

## Implementation and Migration

The demonstration project, called Exaudius, was built in approximately one week with assistance from code generation tools. While this was a proof-of-concept for the presentation rather than the production system, it illustrates the relative maturity and composability of the underlying open source components. The project included AWS setup scripts, OpenTofu for environment management, and test scripts using Python against the agent sandbox API.

The migration strategy emphasized API compatibility. By maintaining the same sandbox API surface, the agent code remained unaware of the infrastructure change. Japan AI built a provider abstraction layer that supported both SaaS and self-hosted backends, enabling them to run both sandbox types in parallel during migration. This gradual transition approach reduced risk and allowed for thorough validation before full cutover.

## Performance and Operational Characteristics

Initial performance testing showed warm container starts completing in approximately 1.4 seconds. While this represents overhead compared to pure container approaches, it's a reasonable tradeoff for kernel-level isolation in multi-tenant AI agent scenarios. The team acknowledged that more extensive long-term testing would be needed before declaring the solution production-ready.

The VM-based approach does consume more memory than containers and has longer startup times, but the team positioned these as engineering challenges to be solved rather than fundamental blockers. The use of technologies like Nydus for lazy loading and the optimizations in Kata 4.0 help mitigate these overheads.

## Outcomes and Benefits

The self-hosted sandbox solution addressed all the limitations of the prior SaaS approach:

- **No Runtime Limits**: The 24-hour constraint was eliminated entirely
- **Unlimited Concurrency**: Scaling became a matter of adding infrastructure rather than hitting platform limits
- **GPU Support**: The architecture can accommodate GPU-accelerated workloads
- **Data Control**: All customer data remains within Japan AI's infrastructure
- **Cost Optimization**: Direct infrastructure control provides better economics at scale
- **Enhanced Capabilities**: New features became possible, such as using pre-authenticated browsers for workflows requiring two-factor authentication

## Critical Assessment and Considerations

While the case study demonstrates a successful migration, several considerations warrant attention:

**Complexity vs. Control Tradeoff**: The move from SaaS to self-hosted represents a significant increase in operational complexity. The team now owns the entire stack from Kubernetes cluster management through hypervisor configuration. For organizations without strong infrastructure expertise, this responsibility could outweigh the benefits.

**Maturity and Production Readiness**: The presenters candidly acknowledged that long-term production validation remained incomplete at the time of presentation. The 1.4 second warm start metric is promising but represents initial testing rather than sustained production performance with real customer workloads.

**Open Source Dependency**: The solution relies heavily on multiple open source projects (Kata, Dragonfly, Nydus, Kubernetes). While this provides flexibility and avoids vendor lock-in, it also means the team must track and integrate updates across multiple upstream projects, manage compatibility matrices, and potentially contribute fixes or features themselves.

**PVM Adoption Risk**: While PVM technology was presented as production-proven at Ant Group, it represents a less mainstream approach than standard virtualization. Organizations considering this architecture should evaluate whether PVM's benefits justify potential supportability and debugging complexity versus alternatives.

**Development Timeline Claims**: The assertion that the demonstration system was built in one week with AI coding assistance, while impressive, should be interpreted carefully. This likely represents integration of existing components rather than development of core functionality, and the demonstration encountered terminal/WebSocket issues during the live demo, suggesting some technical rough edges remained.

## LLMOps Implications

From an LLMOps perspective, this case study illustrates several important principles:

**Security as a First-Order Concern**: Multi-tenant AI agent platforms require isolation at the kernel level, not just container level, when running arbitrary customer code. The security requirements stem from handling sensitive credentials and unpredictable user inputs in production AI systems.

**Lifecycle Management Complexity**: AI agents have complex lifecycles involving configuration, execution, observation, reset, and destruction. Production LLMOps infrastructure must handle all phases, including edge cases like infinite loops, crashes, and the need to preserve debugging information while ensuring complete cleanup.

**Infrastructure Flexibility Requirements**: As AI use cases evolve, platform requirements change rapidly. The initial SaaS solution couldn't adapt quickly enough to support emerging needs like GPU acceleration or extended runtime windows. Self-hosting provided the flexibility to iterate on infrastructure in lockstep with product requirements.

**Abstraction Layers Enable Migration**: The sandbox API abstraction proved critical for executing a major infrastructure migration without disrupting agent code. This separation of concerns is a best practice in production AI systems, allowing infrastructure and application layers to evolve independently.

**Performance vs. Security Tradeoffs**: The 1.4 second warm start overhead represents the cost of kernel-level isolation. In production LLMOps, understanding and accepting such tradeoffs based on specific security and operational requirements is essential.

The case study ultimately demonstrates that building production-grade, secure, multi-tenant infrastructure for AI agents is feasible using cloud-native open source technologies, but requires careful architectural planning, acceptance of operational complexity, and willingness to invest in infrastructure engineering capability.
