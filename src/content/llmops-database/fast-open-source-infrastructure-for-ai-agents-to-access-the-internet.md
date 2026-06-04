---
title: "Fast Open-Source Infrastructure for AI Agents to Access the Internet"
slug: "fast-open-source-infrastructure-for-ai-agents-to-access-the-internet"
draft: false
llmopsTags:
  - "realtime-application"
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "docker"
  - "orchestration"
  - "open-source"
industryTags: "tech"
company: "Kernel"
summary: "Kernel built fast, open-source browser infrastructure to enable AI agents to interact with the internet at scale. The primary challenge was that traditional infrastructure wasn't designed for AI-native workloads requiring massive concurrency and parallelism, with Chromium's 10-40 second boot times creating major bottlenecks when handling thousands of parallel requests. The company evolved through three infrastructure iterations: starting with Docker containers, then moving to Unikraft unikernels with snapshot-and-resume capabilities achieving sub-30ms browser provisioning, and finally implementing QEMU VMs with GPU passthrough for enhanced performance. Using Temporal to orchestrate stateful browser lifecycles that can run for minutes to days, Kernel achieved 6x faster cold starts compared to their Docker implementation and benchmarked nearly 4x faster end-to-end runtime than competitors."
link: "https://www.youtube.com/watch?v=ZqA3R18FTvw"
year: 2026
seo:
  title: "Kernel: Fast Open-Source Infrastructure for AI Agents to Access the Internet - ZenML LLMOps Database"
  description: "Kernel built fast, open-source browser infrastructure to enable AI agents to interact with the internet at scale. The primary challenge was that traditional infrastructure wasn't designed for AI-native workloads requiring massive concurrency and parallelism, with Chromium's 10-40 second boot times creating major bottlenecks when handling thousands of parallel requests. The company evolved through three infrastructure iterations: starting with Docker containers, then moving to Unikraft unikernels with snapshot-and-resume capabilities achieving sub-30ms browser provisioning, and finally implementing QEMU VMs with GPU passthrough for enhanced performance. Using Temporal to orchestrate stateful browser lifecycles that can run for minutes to days, Kernel achieved 6x faster cold starts compared to their Docker implementation and benchmarked nearly 4x faster end-to-end runtime than competitors."
  canonical: "https://www.zenml.io/llmops-database/fast-open-source-infrastructure-for-ai-agents-to-access-the-internet"
  ogTitle: "Kernel: Fast Open-Source Infrastructure for AI Agents to Access the Internet - ZenML LLMOps Database"
  ogDescription: "Kernel built fast, open-source browser infrastructure to enable AI agents to interact with the internet at scale. The primary challenge was that traditional infrastructure wasn't designed for AI-native workloads requiring massive concurrency and parallelism, with Chromium's 10-40 second boot times creating major bottlenecks when handling thousands of parallel requests. The company evolved through three infrastructure iterations: starting with Docker containers, then moving to Unikraft unikernels with snapshot-and-resume capabilities achieving sub-30ms browser provisioning, and finally implementing QEMU VMs with GPU passthrough for enhanced performance. Using Temporal to orchestrate stateful browser lifecycles that can run for minutes to days, Kernel achieved 6x faster cold starts compared to their Docker implementation and benchmarked nearly 4x faster end-to-end runtime than competitors."
notion:
  pageId: "373f8dff-2538-80cf-98c6-d3928b383ff2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:15:00.000Z"
  lastEditedTime: "2026-06-02T07:15:00.000Z"
  publishedAt: "2026-06-04T08:03:05Z"
---

## Overview

Kernel is an infrastructure company founded in early 2025 that focuses exclusively on building fast, open-source infrastructure for AI agents to access and interact with the internet. The company, led by co-founder and CEO Katherine Jew, provides sandboxed Chromium browsers accessible via API with provisioning times under 30 milliseconds. The case study represents a compelling example of how traditional infrastructure designed for human-speed interactions must fundamentally evolve to handle AI-native workloads, where agents operate at scales and concurrency levels never before seen.

The broader context for this work is captured in the dramatic shift happening across developer platforms. GitHub serves as a particularly striking example: in 2025, there were a billion commits total, but by early 2026, the platform was experiencing 275 million commits per week and was on pace for 14 billion commits in 2026 if the trend continued. This explosive growth caused GitHub's uptime to drop from their traditional "three nines" (99.9%) to approximately 84.68%, highlighting the infrastructure challenges that emerge when AI agents become significant users of platforms designed for human interaction patterns. This context underscores the fundamental infrastructure problem Kernel is solving: traditional platforms simply weren't architected for the level of scale, concurrency, and parallelism that AI agents demand.

## The Core Problem

The fundamental challenge Kernel addresses is that AI agents need to interact with the internet through browsers, but browser infrastructure at scale presents multiple compounding problems. Chromium, the open-source browser engine, has a significant technical limitation: it takes 10-40 seconds to boot up. While this delay is acceptable for occasional use cases like one-off CI/CD runs, it becomes a critical bottleneck when attempting to handle thousands of parallel agent requests.

The naive solution of maintaining warm pools of pre-booted browsers quickly becomes untenable. Managing warm pools at scale introduces significant complexity and cost-inefficiency. The problem is further compounded by the nature of agent workflows: browsers aren't just needed for quick interactions but increasingly run long-running workflows spanning minutes, hours, or even days. This creates a fundamental mismatch between traditional stateless infrastructure patterns and the inherently stateful, long-lived nature of agent-browser interactions.

## Technical Evolution: Three Infrastructure Iterations

Despite being a company of just over a year old at the time of the presentation, Kernel had already gone through three distinct infrastructure implementations, demonstrating both the difficulty of the problem and the rapid pace of learning required in this space.

### First Attempt: Docker Containers

The initial implementation took the most straightforward approach: running Chromium inside Docker containers. This is a common pattern that developers encounter when trying to build end-to-end CI/CD pipelines with browser automation. However, this approach revealed several critical limitations. First, getting Chromium running properly in Docker is technically finicky and requires careful configuration. More importantly, the fundamental cold start problem remained: each container still required 10-40 seconds to boot Chromium. At scale with thousands of parallel requests, these boot times created unacceptable latency. While warm pools could theoretically address this, the cost and complexity of maintaining enough warm containers to handle peak load, especially for long-running agent workflows, made this approach impractical.

### Second Iteration: Unikraft Unikernels

The company then pivoted to using Unikraft unikernels, which are essentially a fork of Firecracker. This implementation leveraged a critical capability of Firecracker: snapshot-and-resume functionality. This approach fundamentally decoupled the browser initialization time from the request-time latency experienced by customers.

The workflow works as follows: Kernel spins up browsers ahead of time, allowing them to fully initialize and eating the full 10-40 second boot cost during this preparatory phase. Once the browser is fully booted, they use Firecracker's snapshot capability to write the entire VM state to disk. When a customer makes an API request for a browser, Kernel wakes up the snapshotted VM from disk and resumes it, achieving browser provisioning in under 30 milliseconds. This represents a dramatic improvement over the Docker approach and makes real-time agent interactions practical.

The entire implementation is open-source, with Kernel publishing both their Docker-based and Unikraft unikernel-based kernel images for community use. This open-source approach not only benefits the broader ecosystem but also demonstrates confidence in their execution and operational capabilities as their competitive advantage rather than proprietary code.

### Third Iteration: QEMU VMs with GPU Passthrough

Despite the success of the Unikraft approach, Kernel identified two additional problems they wanted to solve, leading to a third infrastructure iteration using QEMU virtual machines.

The first issue was VM mobility. In the Unikraft unikernel implementation, VMs are pinned to specific host machines. When operating at scale, if a bare metal instance enters a bad state, there's no way to migrate those VMs elsewhere. This creates operational challenges and potential availability issues.

The second motivation was enabling GPU passthrough. Modern browsers leverage GPU acceleration for rendering, WebGL, and other graphics operations. When running locally, browsers have direct access to GPU hardware, providing a smooth, high-performance experience. However, in Kernel's cloud-based browser environment, Firecracker VMs simply weren't designed to support device passthrough. Firecracker was intentionally architected for stateless applications with specific security and isolation properties, whereas Kernel's use case involves fully stateful applications with very long-lived lifecycles.

To address these limitations, Kernel built a custom control plane called Hypeman that supports multiple virtualization technologies: cloud-hypervisor, QEMU, and Firecracker VMs. They use QEMU specifically for their GPU-accelerated browsers, as QEMU supports the device passthrough and memory hot-swapping capabilities needed for stateful, long-running browser workloads.

The performance results are impressive. Compared to the initial naive Docker implementation, the current infrastructure achieves 6x faster cold starts. When benchmarked against nearest competitors offering similar browser-as-a-service capabilities, Kernel's implementation runs nearly 4x faster end-to-end. The GPU acceleration capabilities were demonstrated with WebGL benchmarks showing buttery-smooth 60fps rendering compared to choppy 10fps on CPU-only instances, and even stress tests running Doom in the browser with smooth performance.

## The Role of Temporal in Managing Stateful Browser Lifecycles

Throughout all three infrastructure iterations, Kernel has relied on Temporal to orchestrate browser lifecycles. Temporal is a workflow orchestration platform that excels at managing long-running, stateful processes with complex lifecycle requirements, making it particularly well-suited for Kernel's use case.

Kernel uses Temporal to manage several critical aspects of their infrastructure. First, they use it to orchestrate their cold pool of browsers that are pre-initialized and snapshotted, decoupling browser boot time from customer request latency. Second, Temporal handles health checks on running browsers to ensure they remain in a good state throughout their potentially lengthy lifecycles. Third, and perhaps most impressively, Temporal enables browsers to be suspended and then woken back up days later, maintaining full state continuity. This capability is essential for AI agent workflows that may involve extended processes with long idle periods.

The stateful and potentially indefinite nature of browser lifecycles is fundamentally different from traditional request-response patterns. An agent might need a browser session that spans minutes, hours, or even days, with intermittent periods of activity. Temporal's durability guarantees and ability to handle long-running workflows with complex state management make this pattern practical at scale. Additionally, Temporal's fault tolerance means that even if infrastructure components fail, browser lifecycles can be recovered and resumed, which is critical for maintaining agent workflow continuity.

Importantly, Temporal's abstraction layer allowed Kernel to iterate through multiple infrastructure implementations without having to rewrite their lifecycle management logic. The same Temporal workflows could orchestrate Docker containers, Unikraft unikernels, and QEMU VMs, significantly reducing the friction of infrastructure evolution.

## LLMOps and Production Considerations

From an LLMOps perspective, this case study illustrates several important principles about building infrastructure for AI agents in production environments.

First, it demonstrates that AI workloads have fundamentally different scale and concurrency characteristics than human workloads. The GitHub example of going from a billion commits annually to potentially 14 billion in a single year represents the kind of explosive, non-linear growth that infrastructure must accommodate. Traditional scaling approaches designed for gradual, predictable growth are inadequate.

Second, the case highlights the importance of latency at the infrastructure layer. When building agent systems, every millisecond of delay compounds. If an agent needs to perform dozens or hundreds of browser interactions as part of a workflow, the difference between 30-second cold starts and 30-millisecond provisioning times is the difference between a system that's practical and one that isn't. This speaks to the broader LLMOps principle that infrastructure optimizations can be as important as model optimizations for end-user experience.

Third, the evolution from Docker to unikernels to QEMU VMs demonstrates the value of being willing to fundamentally rearchitect as requirements evolve. In the rapidly developing AI agent space, initial architectural choices may quickly prove inadequate. Organizations need to balance building for today's requirements while maintaining flexibility for tomorrow's, and Kernel's use of Temporal as a stable orchestration layer while swapping out the underlying compute substrate is a good pattern for managing this tension.

Fourth, the stateful, long-running nature of agent-browser interactions represents a shift from traditional stateless architectures. Much of modern cloud infrastructure is optimized for stateless, short-lived processes. AI agents, however, often require maintaining complex state over extended periods. This creates new challenges around state management, fault tolerance, and resource efficiency that infrastructure providers must address.

## Critical Assessment and Caveats

While Kernel's technical achievements are impressive, it's important to approach vendor-provided performance claims with appropriate skepticism. The presentation states they benchmark "nearly 4x faster end-to-end" than competitors, but the specific benchmarks, testing methodology, and competitor identity aren't detailed. Performance can vary significantly based on workload characteristics, and what's true for one use case may not generalize.

The GPU acceleration demonstrations, while visually compelling, are shown with synthetic workloads like WebGL benchmarks and gaming rather than real-world agent tasks. It remains to be seen how much GPU acceleration matters for typical agent-browser interactions, which may primarily involve text-based navigation, form filling, and data extraction rather than graphics-intensive rendering.

Additionally, as an early-stage company, Kernel's long-term operational track record is still being established. Building infrastructure at scale is as much about operational excellence, observability, debugging, and incident response as it is about architectural decisions. The presentation focuses on the technical architecture but doesn't address operational aspects like monitoring, alerting, capacity planning, or how they handle customer issues when browsers get into unexpected states.

The open-source strategy is commendable and benefits the community, but it also means that technical differentiation may erode over time as competitors can learn from and adapt Kernel's approaches. This places even more importance on operational excellence and ecosystem integration as competitive differentiators.

Finally, the case study is presented at a Temporal conference, which may introduce some confirmation bias in the emphasis on Temporal's role. While Temporal clearly plays an important part in their architecture, the presentation doesn't discuss alternative approaches or tradeoffs that were considered for orchestration and state management.

## Conclusion

Kernel's journey building fast infrastructure for AI agents to access the internet provides valuable insights into the infrastructure challenges of the AI-native era. Their rapid iteration through Docker, unikernels, and QEMU-based implementations demonstrates both the difficulty of the problem space and the importance of remaining architecturally flexible as requirements evolve. The use of Temporal as a stable orchestration layer managing stateful, long-running browser lifecycles represents a sound pattern for building reliable AI agent infrastructure. While vendor performance claims should be evaluated critically and real-world operational maturity takes time to develop, the fundamental approach of optimizing infrastructure specifically for AI agent workload patterns rather than trying to adapt human-centric infrastructure appears sound and necessary for the emerging AI agent ecosystem.
