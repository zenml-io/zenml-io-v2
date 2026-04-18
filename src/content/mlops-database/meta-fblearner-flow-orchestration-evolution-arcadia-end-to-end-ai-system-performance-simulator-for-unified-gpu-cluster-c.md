---
title: "Arcadia end-to-end AI system performance simulator for unified GPU cluster compute, network, and failure modeling"
slug: "meta-fblearner-flow-orchestration-evolution-arcadia-end-to-end-ai-system-performance-simulator-for-unified-gpu-cluster-c"
draft: false
mlopsTags:
  - "compute-management"
  - "monitoring"
  - "pipeline-orchestration"
  - "kubernetes"
  - "ray"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Meta"
companySlug: "meta"
platformName: "FBLearner Flow + orchestration evolution"
contentType: "blog"
summary: "Meta introduced Arcadia, an end-to-end AI system performance simulator designed to address the challenge of optimizing large-scale AI training clusters across compute, memory, and network dimensions simultaneously. Traditional approaches led to siloed optimization efforts where teams focused on individual performance pillars in isolation, creating organizational inefficiencies and suboptimal cluster utilization. Arcadia provides a unified simulation framework that models workload distribution, job scheduling, network topology, hardware specifications, and failure domains to deliver accurate performance predictions that align with real-world production measurements. By serving as a single source of truth across hardware, network, and AI systems teams, Arcadia enables data-driven decision-making for cluster design, maintenance optimization, job scheduling improvements, and debugging production events, ultimately maximizing the performance of every GPU within Meta's AI infrastructure."
link: "https://engineering.fb.com/2023/09/07/data-infrastructure/arcadia-end-to-end-ai-system-performance-simulator/"
year: 2023
seo:
  title: "Meta: Arcadia end-to-end AI system performance simulator for unified GPU cluster compute, network, and failure modeling - ZenML MLOps Database"
  description: "Meta introduced Arcadia, an end-to-end AI system performance simulator designed to address the challenge of optimizing large-scale AI training clusters across compute, memory, and network dimensions simultaneously. Traditional approaches led to siloed optimization efforts where teams focused on individual performance pillars in isolation, creating organizational inefficiencies and suboptimal cluster utilization. Arcadia provides a unified simulation framework that models workload distribution, job scheduling, network topology, hardware specifications, and failure domains to deliver accurate performance predictions that align with real-world production measurements. By serving as a single source of truth across hardware, network, and AI systems teams, Arcadia enables data-driven decision-making for cluster design, maintenance optimization, job scheduling improvements, and debugging production events, ultimately maximizing the performance of every GPU within Meta's AI infrastructure."
  canonical: "https://www.zenml.io/mlops-database/meta-fblearner-flow-orchestration-evolution-arcadia-end-to-end-ai-system-performance-simulator-for-unified-gpu-cluster-c"
  ogTitle: "Meta: Arcadia end-to-end AI system performance simulator for unified GPU cluster compute, network, and failure modeling - ZenML MLOps Database"
  ogDescription: "Meta introduced Arcadia, an end-to-end AI system performance simulator designed to address the challenge of optimizing large-scale AI training clusters across compute, memory, and network dimensions simultaneously. Traditional approaches led to siloed optimization efforts where teams focused on individual performance pillars in isolation, creating organizational inefficiencies and suboptimal cluster utilization. Arcadia provides a unified simulation framework that models workload distribution, job scheduling, network topology, hardware specifications, and failure domains to deliver accurate performance predictions that align with real-world production measurements. By serving as a single source of truth across hardware, network, and AI systems teams, Arcadia enables data-driven decision-making for cluster design, maintenance optimization, job scheduling improvements, and debugging production events, ultimately maximizing the performance of every GPU within Meta's AI infrastructure."
mlops:
  source: "sqlite"
  entryId: 158
  sourceUrl: "https://engineering.fb.com/2023/09/07/data-infrastructure/arcadia-end-to-end-ai-system-performance-simulator/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.615415"
  lastUpdated: "2026-04-14T19:55:35.976428"
---

## Problem Context

Meta faced fundamental challenges in optimizing their large-scale AI training infrastructure that stemmed from the complexity of managing multiple interdependent performance factors. The company operates massive distributed systems like the AI Research SuperCluster to support advancement across computer vision, natural language processing, speech, and generative AI. However, AI cluster performance is influenced by numerous variables spanning compute, memory, and network pillars, including model parameters, workload distribution, job scheduler logic, network topology, and hardware specifications.

The core problem was that teams were optimizing these pillars in isolation, leading to local performance improvements that failed to unlock the full potential of cluster-wide performance. Network engineers might optimize network parameters based on outdated assumptions about compute requirements, while ML researchers tuned model architectures without full visibility into network constraints. This siloed approach created several critical pain points:

**Organizational inefficiencies** emerged as multiple teams pursued the same goal of increasing cluster performance through disconnected efforts, unable to holistically prioritize improvements. The lack of a common framework meant teams operated with different assumptions and couldn't effectively coordinate optimization strategies.

**Workload complexity** presented another major challenge. Meta's training clusters serve diverse workloads ranging from memory-intensive to compute-intensive, latency-sensitive to highly parallelizable jobs. Tracking characteristics across multiple concurrent workloads was already difficult, but predicting future workload patterns and determining optimal configurations increased complexity by an order of magnitude.

**Operational awareness gaps** meant that infrastructure availability issues like component failures could trigger job rollbacks to previous checkpoints, losing training progress. Without comprehensive operational data at Meta's scale, these events led to significant performance losses that were difficult to anticipate or mitigate.

**Multi-layered system control** meant Meta controls the entire stack from physical networking to applications, creating numerous tunable parameters across network, compute, memory, application, and scheduling layers. Finding the right combination of parameters for optimal model performance required extensive iteration that significantly increased training time.

The emergence of large language models only amplified these challenges, as the scale and complexity of training infrastructure continued to grow. Meta needed a systemized approach that could simulate performance factors across compute, storage, and network collectively rather than treating them as independent optimization targets.

## Architecture & Design

Arcadia's architecture comprises three primary layers: inputs, core orchestration components, and outputs, with a critical feedback loop that distinguishes it from simpler analytical models.

**Input Layer** encompasses comprehensive system parameters that define the simulation environment. The system ingests long-range plans for AI systems and models, providing forward-looking visibility into future requirements. Network topology definitions and routing protocols capture the physical and logical structure of interconnections between compute resources. Data center floor plans provide spatial context for understanding physical constraints and failure domains. AI workload distributions reflect the actual usage patterns observed in production environments. Hardware specifications detail the compute, memory, and network characteristics of available resources. Critically, Arcadia also models failure domains to provide realistic assessments of system reliability and availability rather than assuming perfect uptime.

**Core Orchestration** centers around a sophisticated orchestrator that coordinates simulation of multiple subsystems. The job scheduling component models how workloads are allocated across available resources, capturing the logic and policies that govern real production schedulers. Compute and memory simulation tracks resource utilization and performance characteristics as jobs execute. Network behavior modeling operates at multiple levels of abstraction, from high-level bandwidth and latency characteristics down to packet-level simulation for users requiring detailed analysis of network hardware behaviors.

A particularly important component is the AI workload synthesizer, which learns from production distributions to generate representative synthetic workloads. This capability ensures simulations reflect real-world conditions rather than idealized scenarios, incorporating the heterogeneity and unpredictability of actual production traffic patterns.

**Output Layer** provides comprehensive metrics across multiple dimensions. AI training and inference performance metrics quantify end-to-end job completion times and model throughput. Resource utilization metrics reveal how efficiently compute, memory, and network resources are being used, exposing potential bottlenecks or underutilized capacity. Reliability and availability metrics assess the impact of failures and maintenance events on cluster performance.

**Feedback Loop** represents a critical architectural distinction from simpler roofline models. Arcadia models the bidirectional interaction between network and compute layers, capturing how network congestion affects compute efficiency and how compute patterns drive network traffic. This feedback mechanism enables accurate performance estimations that align with real-world production measurements rather than theoretical maximums.

The architecture supports multiple levels of simulation fidelity. Users focused solely on application-level behavior can run faster simulations by abstracting away lower-level details. Network engineers requiring deep insights into hardware behavior can leverage packet-level network simulation to extract granular performance data. This flexibility allows different stakeholders to use Arcadia for their specific purposes while maintaining a consistent underlying model.

## Technical Implementation

While the article does not expose detailed implementation specifics like programming languages or specific simulation frameworks, several key technical choices are evident from the system description.

Arcadia employs a **multi-fidelity simulation approach** where users can select the appropriate level of detail for their analysis. This suggests a modular architecture where components can operate at different abstraction levels. The packet-level network simulation capability indicates integration with detailed network simulation engines capable of modeling protocol behavior, congestion control, and routing decisions at a granular level.

The **workload synthesizer** represents a machine learning component that learns distribution patterns from production telemetry. This likely involves statistical modeling or generative techniques to create synthetic workload traces that preserve key characteristics of real traffic while allowing exploration of hypothetical scenarios.

The system maintains **integration with production monitoring** to validate simulation accuracy against real-world measurements. This feedback mechanism ensures Arcadia's predictions remain calibrated to actual infrastructure behavior rather than drifting into theoretical territory disconnected from operational reality.

**Future integration with Chakra** is explicitly mentioned, indicating Meta's commitment to open standards for representing ML workloads. Chakra is being developed through MLCommons as a graph-based representation of AI/ML workloads, suggesting Arcadia will support standardized workload descriptions that enable broader ecosystem integration and reproducibility.

The system's ability to model **failure domains and maintenance scenarios** indicates sophisticated discrete-event simulation capabilities that can inject faults, trigger rollbacks, and assess recovery behavior. This goes beyond steady-state performance modeling to capture the operational realities of large-scale infrastructure.

## Scale & Performance

While specific quantitative metrics are not extensively detailed in the article, the context reveals the massive scale Arcadia must handle. Meta operates infrastructure like the **AI Research SuperCluster**, representing some of the largest AI training environments in the world. The system must simulate clusters with potentially thousands of GPUs interconnected through complex network topologies.

The accuracy of Arcadia's predictions is emphasized through comparison with production measurements, indicating the simulation achieves sufficient fidelity to guide real design decisions. Unlike analytical roofline estimates that provide theoretical bounds, Arcadia's feedback loop modeling produces performance predictions that **align with real-world production measurements**, suggesting validation error rates low enough to trust for infrastructure investment decisions.

The flexibility in simulation fidelity allows performance tuning based on use case. Users focused on application-level analysis can achieve **faster simulation runs** by abstracting lower-level details, while detailed network analysis requires more computation but provides packet-level insights. This trade-off between simulation speed and fidelity enables the system to scale from quick what-if explorations to deep architectural analysis.

The workload synthesizer must process production distributions across **multiple use cases with diverse characteristics**, handling everything from memory-intensive computer vision workloads to compute-intensive LLM training to latency-sensitive inference serving. The ability to generate representative synthetic workloads at this scale demonstrates sophisticated statistical modeling capabilities.

## Trade-offs & Lessons

Arcadia embodies several important design trade-offs that offer lessons for practitioners building similar systems.

**Simulation fidelity versus speed** represents a fundamental trade-off. Arcadia addresses this by supporting multiple levels of detail rather than forcing a single granularity. Users can run fast simulations for broad exploration and detailed simulations for specific deep dives. This flexibility proved essential for supporting diverse stakeholders with different analytical needs.

**Comprehensiveness versus complexity** presents another challenge. Building a unified simulator that spans compute, memory, network, job scheduling, and failure modeling creates significant implementation complexity. The article suggests this investment is worthwhile because siloed optimization leads to organizational inefficiency and suboptimal results. However, maintaining accuracy across all these dimensions requires extensive validation and calibration against production systems.

**Accuracy versus generality** emerges in the workload modeling. Rather than trying to predict all possible future workloads, Arcadia learns from production distributions to generate representative synthetic traces. This grounds the simulation in real usage patterns while allowing exploration of hypothetical scenarios through controlled parameter variation.

**Single source of truth benefits** proved particularly valuable at Meta's scale. Establishing Arcadia as an agreed-upon framework across hardware, network, and AI systems teams reduced duplicative efforts and enabled coordinated optimization. The organizational alignment benefits may exceed the pure technical performance gains.

**Operational integration** distinguishes Arcadia from pure design-time tools. By incorporating failure modeling, maintenance simulation, and debugging capabilities, the system provides value throughout the infrastructure lifecycle rather than only during initial design. This operational focus reflects Meta's recognition that availability and reliability directly impact effective cluster performance.

**Future directions** reveal ongoing evolution. Meta is developing frameworks to optimize maintenance scheduling and job configurations using Arcadia insights. The planned topology and routing design framework would identify bottlenecks and suggest optimizations given known model characteristics. Integration with Chakra demonstrates commitment to open standards even for internal tooling.

The key insight for practitioners is that optimizing large-scale ML infrastructure requires holistic simulation that captures interactions between subsystems. Local optimization of individual components leaves significant performance on the table. Building unified simulation frameworks demands substantial investment but enables coordinated optimization that siloed approaches cannot achieve. The multi-fidelity design pattern allows such systems to serve diverse stakeholders without forcing everyone to operate at the same abstraction level.
