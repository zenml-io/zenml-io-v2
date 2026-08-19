---
title: "Memory Harnesses for Long-Running Research Agents on Local Models"
slug: "memory-harnesses-for-long-running-research-agents-on-local-models"
draft: false
llmopsTags:
  - "poc"
  - "question-answering"
  - "document-processing"
  - "memory"
  - "agent-based"
  - "harness-engineering"
  - "rag"
  - "token-optimization"
  - "evals"
  - "semantic-search"
  - "vector-search"
  - "open-source"
industryTags: "research-academia"
company: "Sakana"
summary: "Sakana AI developed a memory harness system to address context degradation in long-horizon agentic tasks running on local models. The problem tackled was context rot, where models contradict themselves, forget completed tasks, or drift from original questions during extended operations. The solution involved designing a write-manage-read memory loop with different recall policies, tested on local models including Qwen 27B and DeepSeek V4 Flash running on Apple M3 Ultra hardware. Results showed that ranked recall policies outperformed baseline approaches on benchmarks like XBench, achieving better accuracy while reducing token costs, demonstrating that structured memory management is essential for cost-effective long-horizon agent performance on local infrastructure."
link: "https://www.youtube.com/watch?v=R3-anFK1YM8"
year: 2026
seo:
  title: "Sakana: Memory Harnesses for Long-Running Research Agents on Local Models - ZenML LLMOps Database"
  description: "Sakana AI developed a memory harness system to address context degradation in long-horizon agentic tasks running on local models. The problem tackled was context rot, where models contradict themselves, forget completed tasks, or drift from original questions during extended operations. The solution involved designing a write-manage-read memory loop with different recall policies, tested on local models including Qwen 27B and DeepSeek V4 Flash running on Apple M3 Ultra hardware. Results showed that ranked recall policies outperformed baseline approaches on benchmarks like XBench, achieving better accuracy while reducing token costs, demonstrating that structured memory management is essential for cost-effective long-horizon agent performance on local infrastructure."
  canonical: "https://www.zenml.io/llmops-database/memory-harnesses-for-long-running-research-agents-on-local-models"
  ogTitle: "Sakana: Memory Harnesses for Long-Running Research Agents on Local Models - ZenML LLMOps Database"
  ogDescription: "Sakana AI developed a memory harness system to address context degradation in long-horizon agentic tasks running on local models. The problem tackled was context rot, where models contradict themselves, forget completed tasks, or drift from original questions during extended operations. The solution involved designing a write-manage-read memory loop with different recall policies, tested on local models including Qwen 27B and DeepSeek V4 Flash running on Apple M3 Ultra hardware. Results showed that ranked recall policies outperformed baseline approaches on benchmarks like XBench, achieving better accuracy while reducing token costs, demonstrating that structured memory management is essential for cost-effective long-horizon agent performance on local infrastructure."
notion:
  pageId: "3c1f8dff-2538-80fd-89d1-f2221a819453"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T08:54:00.000Z"
  lastEditedTime: "2026-08-19T08:54:00.000Z"
  publishedAt: "2026-08-19T09:14:49Z"
---

## Overview

Sakana AI, a Tokyo-based research organization, conducted experiments to address a critical challenge in production LLM deployments: context degradation in long-running research agents. The research, presented by Stefania Druga, focused specifically on building memory harnesses for agentic systems running entirely on local hardware rather than cloud-based APIs. This work addresses an increasingly important production concern as organizations shift toward local model deployment for cost control and data sovereignty.

The motivation stems from industry trends showing convergence between increasing demand for long-horizon task capabilities and decreasing frequency of new model releases. This creates pressure to maximize the capabilities of existing models through better infrastructure and operational practices rather than waiting for more capable base models.

## Problem Context and Business Drivers

The core technical problem addressed is context rot, which manifests in several ways during long-running agent operations. Models begin contradicting themselves across extended conversations, forget tasks they have already completed and attempt to redo work, and drift away from original user questions as context windows fill up. These issues become critical when agents must operate over extended time horizons spanning hundreds or thousands of interaction steps.

The business context was illustrated through a recent example from Coinbase, which reduced AI spending while increasing AI usage by transitioning to more local model deployments combined with better operational practices including improved routing, caching, context cleanliness, and usage visibility. This demonstrates the production viability of local model deployments when properly architected.

## Technical Infrastructure

The experimental infrastructure ran entirely on consumer-grade Apple hardware, specifically an M3 Ultra with 96 GB RAM and 28 CPU cores. Two primary models were deployed: Qwen 27B quantized to 4-bit precision and DeepSeek V4 Flash. Both models represent the emerging class of capable local models that can handle agentic tasks and tool use when properly supported.

The infrastructure approach emphasized complete control over the evaluation pipeline. Evaluations ran continuously for multiple days on the local machine, which required physical cooling solutions as the hardware sustained high utilization. Remote control capabilities allowed monitoring from mobile devices, demonstrating operational flexibility. However, significant constraints existed: the local models only supported serial execution without batch query capabilities, substantially extending evaluation times compared to cloud-based alternatives.

## Memory Harness Architecture

The memory harness design follows a fundamental write-manage-read loop pattern, conceptualizing memory not as a passive database but as an active control loop around the model. The architecture consists of several key components working together.

At the foundation, research agents were designed with zero durable internal memory, forcing all memory functionality to originate from the harness itself. This design choice enabled clean experimental control by eliminating confounding variables from model-internal state management.

The harness maintains a core component consisting of traces that are always shown to the agent across interactions. This provides consistent state visibility without relying on the model's inherent context retention.

A recall block implements different retrieval modes being tested experimentally. This component determines what historical information gets surfaced to the agent at each decision point.

An archival block tracks information across different sessions, providing longer-term memory persistence beyond individual conversation threads.

## Recall Policy Ladder

The experimental design tested multiple recall policies arranged in a ladder from simplest to most sophisticated. Each policy represents a different approach to determining what information from memory should be surfaced to the agent.

The baseline condition uses no recall whatsoever, providing a control for measuring memory system impact.

Vector-based retrieval-augmented generation serves as the first memory-enabled approach, relying purely on similarity matching to surface relevant context without additional structure.

A decisions ledger approach tracks what decisions the agent makes at every turn and implements prioritization logic to surface the most relevant decision history.

An oracle condition provides ground truth for evaluation purposes. For each loop iteration, the oracle supplies the objectively correct memory that should be retrieved based on the task requirements. Critically, while the oracle provides correct information, it does not force the model to use it correctly, allowing measurement of how effectively the model leverages provided memory.

The model itself remains fixed across all experimental conditions, with only the recall block variables changing. This isolates the impact of memory retrieval policy from other confounding factors.

## Experimental Results: Literature Review Tasks

Initial experiments focused on literature review tasks where agents needed to process large corpora of scientific papers. A specific test case involved papers containing major scientific claims, such as a Nature publication claiming discovery of 742,000 promising materials, which was later retracted. The retraction existed as a small needle in a much larger haystack of citations and headlines.

For these tasks where all relevant papers and information fit within the model's context window, the memory harness provided no additional capability beyond baseline performance. Memory-enabled and memory-disabled conditions achieved equivalent accuracy, with memory only adding cost overhead. This demonstrates an important principle: when task-relevant context fits within the window, external memory systems provide no value and represent pure overhead.

## Experimental Results: Long-Horizon Tasks

Performance characteristics changed dramatically when testing tasks exceeding context window capacity. Experiments used the XBench benchmark, an established evaluation suite for long-horizon memory tasks. These tasks involve information scattered across hundreds of interaction steps with queries occurring far beyond the context window from relevant information.

A representative example involves asking a question at step 500 where the correct answer resides at step 124, placing it completely outside the accessible context window. The model must rely entirely on the memory harness to retrieve the appropriate historical information.

Results across different recall policies showed clear differentiation. The ranked recall ledger approach achieved the highest performance, outperforming both the no-memory baseline and simpler gating approaches that merely determine whether memory should be used without sophisticated retrieval logic.

Over 68 questions with multiple cells and random seeds, the ranked-only ledger consistently performed best. Interestingly, the oracle condition did not achieve maximum performance despite providing ground truth memory. Analysis revealed that providing correct memory does not guarantee correct usage—the model can still retrieve wrong information from the provided memory, choose to ignore it, or become confused by the additional context. This highlights the importance of not just memory retrieval but memory integration into the reasoning process.

Ablation studies tested various alternative configurations including arbitrary examples, wrong steps, and most recent steps. The ranked policy for recall remained the best-performing approach across these ablations, demonstrating robustness of the design.

## Cross-Model and Cross-Benchmark Validation

The memory harness approach generalized across multiple models beyond just Qwen 27B. DeepSeek V4 Flash showed similar benefits from structured recall policies, suggesting the approach is not model-specific but addresses fundamental architectural requirements for long-horizon agents.

Validation extended to additional benchmarks beyond XBench, including Spider V2, demonstrating that the performance benefits are not benchmark-specific but reflect genuine capability improvements for long-horizon reasoning tasks.

## Cost and Efficiency Implications

Beyond accuracy improvements, structured memory policies demonstrated significant cost advantages. Bad memory proved expensive because it consumes more tokens and can misdirect the agent down incorrect solution paths, compounding both computational and quality costs.

Well-designed recall policies save tokens by surfacing only relevant information rather than dumping entire memory contents into context. This reduces both inference costs and latency while improving accuracy, representing a rare win-win-win optimization.

The findings suggest treating recall policy as a first-class metric in production LLM systems, comparable in importance to traditional metrics like accuracy, latency, and cost. Organizations should consider what types of memories to store, how to rank them for retrieval, how to design recall functions, and what information survives across multiple sessions and runs.

## Memory Technique Landscape

The research positions itself within a broader ecosystem of memory techniques for LLM systems. Over 30 runnable cookbooks for memory techniques exist in open-source repositories, reflecting the diversity of approaches being explored.

Memory systems span multiple dimensions including short-term versus long-term storage, different cognitive architectures, and integration of evaluation results into memory management. The solution landscape ranges from simple filesystem-based retrieval to training dedicated memory models, representing a spectrum from unstructured to highly structured approaches.

This breadth suggests memory management for production LLM systems remains an active research area with substantial room for innovation and optimization.

## Local Model Deployment Considerations

The focus on local models reflects emerging production trends toward on-premise deployment for cost control and data sovereignty. Local models like GLM and DeepSeek V4 Flash are crossing capability thresholds for practical agentic tasks and tool use, making local deployment increasingly viable.

However, significant operational challenges remain. RAM represents a continuing bottleneck even on high-end consumer hardware. Batch processing capabilities lag behind cloud APIs, forcing serial execution that substantially extends evaluation times. Multi-day evaluation runs with physical cooling requirements demonstrate the operational overhead of local deployment.

Despite these costs, local deployment provides complete control over data, computation traces, and evaluation processes. This level of sovereignty proves valuable for certain use cases, particularly in regulated industries, sensitive research contexts, or organizations prioritizing data locality.

## Production Implications and Best Practices

Several production-oriented lessons emerge from this research. First, context fitting analysis should precede memory system deployment. For tasks where relevant information fits in context, memory systems add only cost without capability benefits.

Second, recall policy design deserves first-class engineering attention comparable to prompt engineering or model selection. The choice of retrieval logic substantially impacts both accuracy and cost.

Third, structured approaches to memory management outperform naive similarity-based retrieval for complex long-horizon tasks. Ranking mechanisms, decision ledgers, and other structural elements provide meaningful advantages.

Fourth, providing correct information to models does not guarantee correct usage. Memory integration and reasoning capabilities matter as much as retrieval accuracy, suggesting opportunities for prompt engineering and architecture refinement around memory utilization.

Fifth, local model deployment with proper infrastructure can achieve production-viable performance for agentic tasks, though with operational trade-offs around batch processing, cooling, and evaluation latency.

## Research Context and Organizational Positioning

This work connects to Sakana AI's broader focus on sovereign AI capabilities, particularly important in the Japanese context where data locality and independence from foreign cloud providers carry strategic significance. The research demonstrates that sovereignty need not sacrifice capability when proper engineering practices support local deployment.

The experimental approach emphasizes reproducibility and control, with complete visibility into every pipeline stage from data through computation to evaluation. This methodological rigor provides confidence in findings while illustrating practical considerations for organizations attempting similar local deployments.

## Limitations and Future Directions

Several limitations should be noted when interpreting these results. The experiments ran on specific hardware with particular resource constraints that may not generalize to all deployment scenarios. The models tested represent a snapshot of capabilities that continue evolving rapidly.

Serial execution limitations substantially extended evaluation times, potentially limiting the practical applicability for organizations requiring rapid iteration. The cooling requirements for sustained operation suggest thermal management deserves consideration in production deployment planning.

Future research directions include exploring additional memory architectures, investigating hybrid local-cloud approaches that balance sovereignty with operational efficiency, and developing more sophisticated metrics for memory quality beyond simple accuracy measures. The integration of evaluation results into memory management represents another promising avenue for improving long-horizon agent performance.

The work establishes memory harness design as a critical component of production LLM systems, particularly for long-horizon agentic tasks, while demonstrating the viability of local deployment when properly architected and managed.
