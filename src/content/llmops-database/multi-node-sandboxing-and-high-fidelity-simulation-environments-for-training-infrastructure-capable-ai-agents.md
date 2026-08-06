---
title: "Multi-Node Sandboxing and High-Fidelity Simulation Environments for Training Infrastructure-Capable AI Agents"
slug: "multi-node-sandboxing-and-high-fidelity-simulation-environments-for-training-infrastructure-capable-ai-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "reinforcement-learning"
  - "agent-based"
  - "multi-agent-systems"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "orchestration"
  - "serverless"
  - "devops"
  - "scaling"
  - "postgresql"
  - "amazon-aws"
  - "google-gcp"
  - "microsoft-azure"
industryTags: "tech"
company: "Emulated"
summary: "Emulated is a data lab focused on increasing the reliability and autonomy of AI agents by addressing critical gaps in how models handle complex infrastructure operations. The company identified that while AI agents excel at application-layer tasks, they struggle with infrastructure complexities like distributed systems, MVCC conflicts, network failures, and long-horizon system ownership. Their solution involves creating high-fidelity simulation environments that go beyond traditional single-node sandboxes to include multi-node systems with real cloud resources, complete organizational context (tickets, postmortems, customer conversations), and infrastructure challenges that only appear at scale. These environments enable agents to learn the full scope of software engineering work—from customer conversations and performance testing to managing distributed clusters and reasoning about operational blast radius—rather than just producing code diffs. The approach represents a fundamental shift in post-training infrastructure, moving from containerized single-node benchmarks to complex multi-node sandboxes that provision real infrastructure resources."
link: "https://www.youtube.com/watch?v=zkX03APVj0M"
year: 2026
seo:
  title: "Emulated: Multi-Node Sandboxing and High-Fidelity Simulation Environments for Training Infrastructure-Capable AI Agents - ZenML LLMOps Database"
  description: "Emulated is a data lab focused on increasing the reliability and autonomy of AI agents by addressing critical gaps in how models handle complex infrastructure operations. The company identified that while AI agents excel at application-layer tasks, they struggle with infrastructure complexities like distributed systems, MVCC conflicts, network failures, and long-horizon system ownership. Their solution involves creating high-fidelity simulation environments that go beyond traditional single-node sandboxes to include multi-node systems with real cloud resources, complete organizational context (tickets, postmortems, customer conversations), and infrastructure challenges that only appear at scale. These environments enable agents to learn the full scope of software engineering work—from customer conversations and performance testing to managing distributed clusters and reasoning about operational blast radius—rather than just producing code diffs. The approach represents a fundamental shift in post-training infrastructure, moving from containerized single-node benchmarks to complex multi-node sandboxes that provision real infrastructure resources."
  canonical: "https://www.zenml.io/llmops-database/multi-node-sandboxing-and-high-fidelity-simulation-environments-for-training-infrastructure-capable-ai-agents"
  ogTitle: "Emulated: Multi-Node Sandboxing and High-Fidelity Simulation Environments for Training Infrastructure-Capable AI Agents - ZenML LLMOps Database"
  ogDescription: "Emulated is a data lab focused on increasing the reliability and autonomy of AI agents by addressing critical gaps in how models handle complex infrastructure operations. The company identified that while AI agents excel at application-layer tasks, they struggle with infrastructure complexities like distributed systems, MVCC conflicts, network failures, and long-horizon system ownership. Their solution involves creating high-fidelity simulation environments that go beyond traditional single-node sandboxes to include multi-node systems with real cloud resources, complete organizational context (tickets, postmortems, customer conversations), and infrastructure challenges that only appear at scale. These environments enable agents to learn the full scope of software engineering work—from customer conversations and performance testing to managing distributed clusters and reasoning about operational blast radius—rather than just producing code diffs. The approach represents a fundamental shift in post-training infrastructure, moving from containerized single-node benchmarks to complex multi-node sandboxes that provision real infrastructure resources."
notion:
  pageId: "3b4f8dff-2538-800e-b433-efd6841298ca"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:33:00.000Z"
  lastEditedTime: "2026-08-06T11:33:00.000Z"
  publishedAt: "2026-08-06T11:44:56Z"
---

## Overview

Emulated represents an important evolution in how AI agents are trained for production infrastructure work. The company, founded by Joseph and Sid—engineers with backgrounds in network infrastructure, distributed databases, and sandbox infrastructure—addresses a fundamental capability gap they observed: while modern AI agents perform well on application-layer tasks, they consistently struggle with the complexities of operating and building mission-critical infrastructure systems at scale.

The core thesis behind Emulated's work is that the model capability gap is fundamentally a data gap. The founders argue that model capability has never regressed when high-quality data is introduced, suggesting that current limitations stem from inadequate training environments rather than architectural constraints. Their analysis of existing benchmarks like SweBench Pro, Terminal Bench, Frontier Code, and Deep Sweep reveals that these evaluations only operate within code bases, having agents produce thousand-line pull requests over 50-100 turns. However, these benchmarks miss the broader work that human engineers actually perform: understanding customer problems, trying different approaches, performance testing, and owning underlying infrastructure over months and years.

## The Problem: Limitations of Current Training Approaches

The presentation makes a compelling case that current AI agent training environments are fundamentally insufficient for producing agents capable of handling real-world infrastructure operations. Traditional single-node sandbox environments, while useful, can only simulate a limited subset of the challenges that infrastructure engineers face in production. These environments typically focus on code generation and modification tasks within a repository but fail to capture the full complexity of operating distributed systems at scale.

The founders highlight several critical issues that only appear in real production environments: network failures between distributed nodes, data corruption issues like MVCC conflicts that can lead to catastrophic failures (referencing a DynamoDB outage), clock skew problems, and the need to reason about operational blast radius while serving live traffic. These issues cannot be adequately simulated in standard containerized single-node environments that dominate current post-training pipelines.

## The Solution: High-Fidelity Multi-Node Simulation

Emulated's approach involves creating what they describe as putting "software engineering companies into containerized environments." These environments include comprehensive organizational context such as projects, incidents, customer conversations, tickets, and postmortems. The agents must navigate not just code changes but the entire lifecycle of infrastructure work.

A concrete example they provide involves an etcd consensus cluster that a typical production service might rely on. In traditional environments, agents would primarily operate on the source code itself—the small component in the larger system. However, Emulated's environments encompass everything surrounding that code: understanding tickets and projects that may be out of date, incorporating postmortems about past incidents and how customers were affected, managing rolling deployments through potentially complicated and conflicting deployment systems, and handling unforeseen problems during migrations such as failing nodes and stale deprecated nodes. Throughout all of this, the agent must maintain service availability and monitor the system, reasoning through problems in real-time just as a human engineer would.

This represents what they call a "full end-to-end infrastructure task" that goes far beyond what current benchmarks measure. The environments can be made increasingly long-horizon by requiring multiple deployments instead of just one, but the founders argue this still isn't enough to close the capability gap.

## Evolution to Multi-Node Sandboxes with Real Infrastructure

A critical insight from the presentation is that single-node sandboxes, despite their utility, hit fundamental limitations. The founders explain that standard post-training pipelines are "kind of boring" and homogeneous—everything runs in containerized single sandboxes. Real infrastructure doesn't work this way, and even sophisticated techniques like deterministic simulation for network failures don't adequately represent what engineers encounter when building AWS-scale services.

The progression they describe for a typical cloud service illustrates why multi-node sandboxes become necessary. Starting with a shiny piece of software that services a single customer well (perhaps running on a developer's machine), infrastructure engineers quickly need to think about resource provisioning. This is where single-node sandboxes break down—you cannot adequately simulate services like EC2 or Cloud Run within a single container. Real infrastructure requires provisioning hosts, VPCs, subnets, and security groups, all exposed through APIs that customers interact with.

Beyond basic provisioning, production services require throttling, authentication, authorization, audit trails, software deployment systems with gradual rollouts and rollback capabilities, health monitoring with awareness of network partitions, configuration management that can change settings on the fly, DNS and certificate management, admin consoles, telemetry, billing systems, and much more. The presentation emphasizes that "beyond a certain threshold, there is a critical mass at which sandboxing on a single node can only get you so far."

This led Emulated to envision multi-node sandboxes with access to real infrastructure and real cloud resources—essentially putting "a cloud in a box" or what could be termed a "cloud box." This approach fundamentally changes the nature of post-training pipelines, though the speakers acknowledge they didn't have time to fully explore the implications during their presentation.

## Impact on Post-Training Infrastructure

The shift to multi-node sandboxes with real infrastructure has significant implications for post-training pipelines. One particularly intriguing possibility they mention is putting a post-training pipeline itself inside the sandbox, which opens up interesting opportunities related to model training and what they cryptically refer to as "RSI" (likely recursive self-improvement).

However, this approach introduces substantial practical challenges. Spinning up the entire stack for something like AWS Lambda takes hours—how does this fit into post-training rollouts? Cost management becomes critical when provisioning real cloud resources at scale. Even with real resources, a sim-to-real gap still exists because you need live customer traffic and problems that only appear at certain scales to truly replicate production conditions.

## Technical Approach and Domain Expertise

The founders emphasize that their background in network infrastructure, distributed databases, and sandbox infrastructure informs their approach. They argue that domain expertise is crucial for creating high-quality training data, especially given the "boutique nature of data nowadays." They're starting with infrastructure because it aligns with their expertise and because infrastructure companies present clearer problem statements than companies still seeking product-market fit.

For infrastructure and developer tools companies like Supabase, Modal, Vercel, or cloud providers, engineers understand what users want: low latency, low cost, reliability. This clarity makes it easier to define meaningful tasks and evaluation criteria. The founders also note that lessons learned from going deep in the infrastructure domain should translate horizontally to other domains.

## Critical Assessment and Open Questions

While Emulated's vision is compelling, several important caveats and questions emerge. The presentation is essentially a pitch for their approach and company, so claims about effectiveness should be viewed with appropriate skepticism until validated by independent evaluation. The founders don't provide concrete results, metrics, or comparisons showing that agents trained in their high-fidelity environments actually perform better on real-world infrastructure tasks than agents trained with traditional methods.

The practical challenges they acknowledge—hours to spin up environments, cost management, and the persistent sim-to-real gap—are non-trivial. It's unclear how these trade-offs play out in practice. Training agents in environments that take hours to initialize could dramatically slow iteration cycles and increase costs to potentially prohibitive levels. The economic viability of this approach at scale remains an open question.

The relationship between environment fidelity and agent capability also deserves scrutiny. While it's intuitive that higher-fidelity environments should produce more capable agents, there may be diminishing returns or alternative approaches (like better prompting strategies, different architectures, or synthetic data generation) that could achieve similar results more efficiently.

That said, the core observation that current benchmarks and training environments fail to capture the full complexity of real infrastructure work appears sound. The gap between producing a code diff and owning a system over months or years is real, and addressing it likely requires more sophisticated training environments. Whether Emulated's specific approach of multi-node sandboxes with real cloud resources is the optimal solution remains to be seen, but it represents a thought-provoking direction for the field.

## Broader Implications for LLMOps

The work has several important implications for the broader LLMOps community. First, it highlights the importance of evaluation environments that match the complexity of intended deployment contexts. If we want agents to handle production infrastructure, we need to train and evaluate them in conditions that approximate production complexity.

Second, it suggests that post-training infrastructure may need to become significantly more sophisticated and heterogeneous. The era of homogeneous single-container environments may be giving way to diverse, multi-node systems that can provision real resources. This has implications for companies building post-training infrastructure and platforms.

Third, the emphasis on long-horizon tasks and full system ownership represents an important expansion of what we expect from AI agents. Moving beyond narrow task completion to broader responsibility over time requires different training paradigms and evaluation methodologies.

Finally, the domain expertise requirement—that high-quality training data for infrastructure agents requires deep infrastructure knowledge—has implications for how companies approach agent development. Generic approaches may be insufficient for specialized domains, suggesting a role for boutique data labs with deep vertical expertise.

The presentation concludes with the founders expressing interest in sharing these challenges with the community and recruiting engineers with distributed systems expertise and opinions on topics like Kubernetes auto-scaling and rolling deployments. Their openness about sharing "organizational secrets" suggests confidence in the execution challenge—that understanding the approach doesn't make it easy to replicate, and that the complexity lies in implementation rather than the high-level concept.
