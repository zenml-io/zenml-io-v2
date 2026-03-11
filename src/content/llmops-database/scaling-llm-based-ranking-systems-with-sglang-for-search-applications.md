---
title: "Scaling LLM-Based Ranking Systems with Prefill-Only Optimization"
slug: "scaling-llm-based-ranking-systems-with-sglang-for-search-applications"
draft: false
llmopsTags:
  - "question-answering"
  - "classification"
  - "latency-optimization"
  - "model-optimization"
  - "token-optimization"
  - "pytorch"
  - "open-source"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "scalability"
  - "devops"
  - "microservices"
  - "cache"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn faced significant performance challenges when deploying LLM-based ranking systems for AI Job Search and AI People Search, where models needed to score hundreds of items per query within strict latency SLAs (sub-500ms P99). The ranking workload differs fundamentally from text generation—it requires only the prefill phase to score candidates, not iterative token generation. LinkedIn optimized SGLang, an open-source LLM serving system, through four optimization stages: implementing comprehensive batching (tokenization and batch preservation), creating a scoring-only fast path that eliminates unnecessary decode loops and CPU-GPU synchronization, introducing in-batch prefix caching to reuse shared query context, and addressing Python runtime bottlenecks through multi-process architecture. These optimizations delivered 2-3x throughput improvements on H100 GPUs while maintaining P99 latency under 500ms, enabling production-scale LLM ranking for millions of members."
link: "https://www.linkedin.com/blog/engineering/ai/scaling-llm-based-ranking-systems-with-sglang-at-linkedin"
year: 2026
seo:
  title: "LinkedIn: Scaling LLM-Based Ranking Systems with Prefill-Only Optimization - ZenML LLMOps Database"
  description: "LinkedIn faced significant performance challenges when deploying LLM-based ranking systems for AI Job Search and AI People Search, where models needed to score hundreds of items per query within strict latency SLAs (sub-500ms P99). The ranking workload differs fundamentally from text generation—it requires only the prefill phase to score candidates, not iterative token generation. LinkedIn optimized SGLang, an open-source LLM serving system, through four optimization stages: implementing comprehensive batching (tokenization and batch preservation), creating a scoring-only fast path that eliminates unnecessary decode loops and CPU-GPU synchronization, introducing in-batch prefix caching to reuse shared query context, and addressing Python runtime bottlenecks through multi-process architecture. These optimizations delivered 2-3x throughput improvements on H100 GPUs while maintaining P99 latency under 500ms, enabling production-scale LLM ranking for millions of members."
  canonical: "https://www.zenml.io/llmops-database/scaling-llm-based-ranking-systems-with-sglang-for-search-applications"
  ogTitle: "LinkedIn: Scaling LLM-Based Ranking Systems with Prefill-Only Optimization - ZenML LLMOps Database"
  ogDescription: "LinkedIn faced significant performance challenges when deploying LLM-based ranking systems for AI Job Search and AI People Search, where models needed to score hundreds of items per query within strict latency SLAs (sub-500ms P99). The ranking workload differs fundamentally from text generation—it requires only the prefill phase to score candidates, not iterative token generation. LinkedIn optimized SGLang, an open-source LLM serving system, through four optimization stages: implementing comprehensive batching (tokenization and batch preservation), creating a scoring-only fast path that eliminates unnecessary decode loops and CPU-GPU synchronization, introducing in-batch prefix caching to reuse shared query context, and addressing Python runtime bottlenecks through multi-process architecture. These optimizations delivered 2-3x throughput improvements on H100 GPUs while maintaining P99 latency under 500ms, enabling production-scale LLM ranking for millions of members."
notion:
  pageId: "310f8dff-2538-80a9-8863-ee7dd140ed65"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-02-23T08:45:00.000Z"
  lastEditedTime: "2026-03-11T14:10:00.000Z"
  publishedAt: "2026-03-11T14:15:30Z"
---

## Overview

LinkedIn's engineering blog post from February 2026 details their journey optimizing SGLang, an open-source LLM serving system, to support production-scale LLM-based ranking workloads. This case study centers on a unique LLMOps challenge: deploying large language models not for text generation, but for scoring and ranking hundreds or thousands of candidates in response to search queries. The work supported LinkedIn's AI Job Search and AI People Search features, serving millions of members with strict latency requirements.

The fundamental insight driving this work is that ranking represents a distinct class of LLM workload characterized by prefill-only inference patterns. Unlike chatbots or text generation systems that iteratively generate tokens, ranking models process prompts once to extract relevance scores from the final token's logits, then immediately terminate without any decode phase. This architectural distinction opened opportunities for dramatic optimization that wouldn't apply to generative workloads.

LinkedIn's ranking workload exhibits several defining characteristics that shaped their optimization strategy. Every prompt for a given query shares a common prefix containing system instructions, query text, and member context—only the item-specific suffix differs. Single queries can generate hundreds or thousands of scoring requests with high concurrency. The system operates under strict latency service-level agreements requiring P99 latency within a few hundred milliseconds under sustained production load. These constraints meant that optimizations designed for interactive, low-concurrency text generation would introduce unacceptable overhead.

The team approached this challenge systematically through four optimization stages, each exposing the next performance bottleneck in the stack. Their work draws from recent research publications (arXiv:2510.22101 and arXiv:2512.07846) and focuses on the engineering path from research prototypes to production deployment.

## Stage One: Comprehensive Batching

The optimization journey began with a fundamental observation: despite ranking's inherently batch-oriented nature, many parts of the serving stack processed requests serially. The team conducted end-to-end profiling to identify where batching existed and where it was missing, discovering that CPU-side serialization could eliminate GPU performance gains before inference even began.

The first critical bottleneck appeared in tokenization. Even when ranking requests arrived with many prompts, tokenization was performed sequentially one prompt at a time. For large inputs—approximately 2,000 tokens across 100 items—tokenization alone could consume hundreds of milliseconds of CPU time before the GPU became involved. The initial fix enabled in-request batch tokenization (contributed as PR #5141), allowing all prompts within a single request to be tokenized together using fast tokenizer batch APIs with parallel CPU execution.

However, this addressed only one batching scenario. While ranking requests often arrive with many items per query, other prefill-only workloads like embeddings tend to send steady streams of single-prompt requests that are difficult to batch at the source. This motivated implementation of an Async Dynamic Batch Tokenizer (PR #9382), which dynamically aggregates concurrently arriving single-prompt requests using Python's asyncio and tokenizes them in batches with a ThreadPoolExecutor. The mechanism uses configurable batch-size and timeout thresholds to balance latency and throughput while keeping the async event loop responsive. Without any client-side changes, this achieved dramatic performance improvements: for an Embedding-0.6B model with 500-token inputs at 500 QPS, P99 latency dropped from 4,583ms to 464ms—approximately 10x faster.

Even after implementing batch tokenization, profiling revealed another subtle issue: batch boundaries were not being preserved through the serving stack. If a request contained 50 prompts with total token count well within a single prefill threshold, all prompts should execute in one GPU forward pass. However, logs consistently showed multiple prefill batches for what should have been a single batch. The root cause was architectural: although prompts were tokenized as a batch, the tokenizer manager transmitted them individually over the ZMQ socket. By the time requests reached the scheduler, the original batch structure was lost, leading to fragmented execution with unnecessary extra forward passes.

The team fixed this by introducing an explicit "batch send" mechanism (PR #9436) that transmits entire tokenized batches as single ZMQ messages. This allowed the scheduler to see full batches and execute them in single GPU prefill passes. For a 0.6B model with 300-token inputs and batch size of 50, this change reduced average latency from 70.39ms to 41.12ms per request—a 41.5% reduction purely from preserving batch integrity through the execution pipeline.

## Stage Two: Scoring-Only Fast Path

With comprehensive batching in place, profiling revealed that significant time was still being spent on work that ranking doesn't require. Large parts of the inference path were optimized for generative workloads, not prefill-only ranking. The team recognized that scoring deserved a first-class execution path rather than being treated as a special case of generation. This led to introducing a dedicated scoring API in SGLang (PR #6460), providing a clean abstraction for ranking workloads and serving as the foundation for subsequent optimizations.

The breakthrough came from questioning the default execution path: why run a full decode and sampling loop when ranking only needs one forward pass through the prompt? In prefill-only ranking, there is no autoregressive generation—the model processes the prompt once and returns a relevance signal derived from the final token's logits. However, the default execution path still entered the full decode and sampling loop, adding unnecessary CPU work and memory traffic. The team introduced a scoring-optimized execution path in SGLang that runs identical prefill computation to generation (preserving accuracy) while skipping all token sampling, decode loops, and KV cache updates. This execution path extracts only the final token's logits required for relevance scoring and maintains exact semantic equivalence with the standard generation path.

Beyond skipping decode, profiling showed the GPU frequently stalling on CPU-side overhead driven by unnecessary per-token logprob extraction, fragmented GPU-to-CPU memory copies, and synchronization points that delayed kernel launches. The team tightened CPU-GPU interaction by skipping per-token log-probability extraction entirely when not needed, replacing many small memory copies with a single vectorized gather operation, and overlapping CPU post-processing with GPU execution wherever possible.

These changes were upstreamed to SGLang (PR #8840, PR #9748) and had dramatic effects. GPU profiling showed near-continuous kernel execution with synchronization gaps largely eliminated. This translated directly into end-to-end gains: on a 0.6B model with 300-token inputs at 100 QPS, P99 latency dropped from 6,220ms to 454ms (13.7x improvement) while throughput increased by approximately 25%. By the end of this stage, the scoring path was lean and purpose-built with no decode, no unnecessary CPU work, and minimal CPU-GPU synchronization overhead.

## Stage Three: In-Batch Prefix Caching

With decode removed and CPU-GPU coordination tightened, the next focus was eliminating redundant work in the scoring path: recomputing the same query-prefix KV (key-value) tensors for every item. In ranking workloads, all candidates share an identical query prefix, so repeatedly prefilling it and regenerating its KVs quickly dominates cost as batch sizes grow. Each item prompt differs only in its suffix, yet query KVs were being recomputed every time.

The team pursued two complementary approaches for query KV reuse: Multi-Item Scoring (MIS), which concatenates all items into a single sequence using item-aware attention masking (covered in an earlier blog post and upstreamed via PR #10979), and in-batch prefix caching, which preserves standard batched inputs while reusing query-prefix KV within a single forward pass. Both approaches amortize prefix work; the blog post focuses on in-batch prefix caching as the primary technical contribution.

SGLang's existing prefix cache avoids recomputation across requests but requires two forward passes—one to populate the cache and another to score items. For large ranking batches, this extra pass limits throughput. In-batch prefix caching removes that overhead by reusing query-prefix KV within a single forward pass. The mechanism works by computing the prefix KV once using the first prompt in the batch, then intercepting the forward pass between KV computation and attention so remaining items can reuse that KV directly.

Consider a batch with two prompts: Prompt A has tokens [1, 2, 3, 4, 5] and Prompt B has tokens [1, 2, 6, 7, 8]. The shared prefix [1, 2] produces identical hidden states and KV values. Instead of recomputing them for Prompt B, the system reuses the prefix KV from Prompt A, eliminating redundant work. Each item's suffix tokens still need correct attention behavior, so attention is computed as a merge of prefix attention (suffix tokens attend to shared prefix KV) and suffix attention (suffix tokens attend to themselves via standard causal attention). The two attention results are combined using log-sum-exp, ensuring numerical correctness and unchanged scoring semantics.

By moving KV reuse directly into the attention computation, in-batch prefix caching removes redundant prefix work entirely without changing model behavior or request structure. In production workloads, in-batch prefix caching and Multi-Item Scoring deliver similar amortization. On a pruned 0.4B model with approximately 60 query tokens and 145 item tokens, both approaches achieve similar throughput (Multi-Item Scoring at approximately 2,100 items/second versus in-batch prefix caching at approximately 2,200 items/second). The key difference is where the optimization lives: MIS pushes item separation and masking deep into optimized attention kernels causing tighter coupling with kernel implementations, while in-batch prefix caching operates at a higher level in the execution stack, preserves standard batched inputs, avoids concatenation, and doesn't require specialized kernel-level masking.

## Stage Four: Python Runtime Optimization

By this point, the GPU execution path was lean with no decode, minimal synchronization, reused KV, and well-coalesced batches. Profiling showed the next bottlenecks were no longer in CUDA kernels but in Python runtime behavior around the engine. Two issues stood out: periodic garbage collection stalls and Global Interpreter Lock (GIL) contention in the Python gRPC serving layer.

Under sustained load, Python's generational garbage collector occasionally scanned large numbers of long-lived objects, causing 100-300ms pauses every few seconds. Even infrequent stalls like these are unacceptable when targeting sub-500ms P99 latency. The team addressed this by warming the server so long-lived objects are fully initialized before serving traffic, freezing the heap using Python's gc.freeze() to exclude those objects from future garbage-collection scans, and adding operational hooks allowing the garbage collector to be safely frozen and unfrozen at runtime. These changes (PR #9241) eliminated periodic latency spikes without affecting correctness or long-running stability, restoring predictable tail latency under sustained load.

Even after stabilizing garbage collection behavior, the Python gRPC layer remained a throughput bottleneck. Request handling, deserialization, and preprocessing all contend for the GIL, effectively serializing work on a single CPU core per process. To remove this bottleneck, the team introduced a multi-process serving architecture where multiple gRPC servicer processes handle network I/O and request preprocessing while dedicated SGLang engine processes execute inference. Requests are passed between processes using efficient inter-process communication via ZMQ.

Removing gRPC-side GIL contention exposed the next limit in the system. For some deployments, especially those using aggressive context compression techniques like MixLM, input lengths became short enough that GPU prefill completed very quickly, shifting the bottleneck from GPU execution to CPU-side scheduling inside SGLang. At high request rates, a single scheduler process became CPU-bound, limiting how quickly batches could be prepared and dispatched despite available GPU capacity.

The team addressed this by introducing multi-process scheduler parallelization: running multiple SGLang scheduler processes per GPU (for example, 2 workers) with GPU memory partitioned across schedulers (approximately 50% per worker). Together, the gRPC servicer decoupling and scheduler parallelization allowed CPU-side work to scale with available cores while keeping the GPU fully utilized through pipelined batch preparation and execution. In production benchmarks, this delivered an additional approximately 40% throughput increase beyond what a single Python process could sustain.

## Production Results and Impact

The cumulative effect of these optimizations delivered significant production improvements measured on H100 GPUs under P99 latency constraints of 500ms or less. For text-based ranking using a 375M decoder-only ranker with 50 query tokens and 150 item tokens per batch of 50, throughput increased from 750 to 2,200 items per second per GPU (approximately 3x gain). For mixed-input embedding-based ranking using a 0.6B decoder-only ranker with 60 query tokens and 1 embedding plus 1 special token per item at batch size 50, throughput increased from 10,000 to 22,000 items per second per GPU (approximately 2.2x gain).

## LLMOps Lessons and Architectural Insights

This case study offers several important lessons for LLMOps practitioners deploying LLMs in production. The biggest takeaway is that optimization quality depends fundamentally on profiling depth and workload understanding. For prefill-only ranking, this meant focusing relentlessly on the true critical path and recognizing that CPU wins amplify GPU wins. Once the GPU execution path was efficient, CPU coordination and runtime behavior became the dominant factors shaping end-to-end latency.

The gains came in stages rather than from a single silver bullet: batching, scoring-only execution, KV reuse in attention, shared-prefix amortization, and finally removing Python runtime bottlenecks via multiprocessing. Each optimization exposed the next performance ceiling, illustrating the reality of LLM inference at scale as a marathon rather than a sprint. While these changes delivered major wins, the journey continues with fine-grained profiling, kernel-level tuning, and further trimming overheads in prefill and attention paths.

A natural question is whether a dedicated scoring path risks diverging from the main inference engine. The team's answer is no—while the ranking API is specialized, execution is treated as a prefill-only workload inside SGLang rather than a fork, removing only what ranking doesn't need while inheriting everything that still matters for performance and correctness. This approach maintains specialization without divergence.

At LinkedIn, these advancements power AI Job Search and AI People Search to deliver state-of-the-art LLM ranking to millions of members. Beyond LinkedIn, the team is committed to making prefill-only ranking a first-class citizen in the open-source ecosystem, having contributed significantly to SGLang with plans for continued development through the SGLang Prefill-Only Roadmap.

The case study demonstrates sophisticated LLMOps engineering across the full stack from tokenization and batching through GPU kernel optimization to Python runtime tuning. It highlights the importance of understanding workload characteristics, systematic profiling, and incremental optimization while maintaining production quality and contributing improvements back to open-source infrastructure. The work represents a mature approach to deploying LLMs at scale for non-generative workloads, with clear attention to latency SLAs, throughput optimization, and operational stability.
