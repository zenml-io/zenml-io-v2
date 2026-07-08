---
title: "Teaching LLM Agents to Use Semantic Search: Closing the Knowledge Gap with Agentic Retrieval"
slug: "teaching-llm-agents-to-use-semantic-search-closing-the-knowledge-gap-with-agentic-retrieval"
draft: false
llmopsTags:
  - "question-answering"
  - "document-processing"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "prompt-engineering"
  - "fine-tuning"
  - "reinforcement-learning"
  - "few-shot"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "reranking"
  - "langchain"
  - "openai"
  - "databricks"
industryTags: "tech"
company: "MixedBread"
summary: "Mixbread identified a growing gap between the exponentially improving reasoning capabilities of LLMs and the slowly evolving quality of retrieval systems, which they termed the \"knowledge gap.\" When testing benchmarks like BrowseCorp Plus and Office QA Pro, they found that models like GPT-4.5 performed 8-9% worse than Oracle performance (theoretical maximum if given the right documents), indicating that retrieval was the bottleneck rather than reasoning. To address this, Mixbread developed a specialized search agent with a four-tool harness including semantic search, overview search, filtered search, and grep-based keyword matching. They trained a small, efficient LLM using supervised fine-tuning with a teacher model followed by on-policy reinforcement learning with custom retrieval and trajectory rewards. Their beta version achieved top position on the Snowflake MatchQA benchmark with 93.4% accuracy, and their intermediate trained agent reached an NDCG@10 of 0.4 on the Oblique Congress benchmark, more than doubling the previous best performance of 0.18."
link: "https://www.youtube.com/watch?v=1IdzkRVmWAA"
year: 2026
seo:
  title: "MixedBread: Teaching LLM Agents to Use Semantic Search: Closing the Knowledge Gap with Agentic Retrieval - ZenML LLMOps Database"
  description: "Mixbread identified a growing gap between the exponentially improving reasoning capabilities of LLMs and the slowly evolving quality of retrieval systems, which they termed the \"knowledge gap.\" When testing benchmarks like BrowseCorp Plus and Office QA Pro, they found that models like GPT-4.5 performed 8-9% worse than Oracle performance (theoretical maximum if given the right documents), indicating that retrieval was the bottleneck rather than reasoning. To address this, Mixbread developed a specialized search agent with a four-tool harness including semantic search, overview search, filtered search, and grep-based keyword matching. They trained a small, efficient LLM using supervised fine-tuning with a teacher model followed by on-policy reinforcement learning with custom retrieval and trajectory rewards. Their beta version achieved top position on the Snowflake MatchQA benchmark with 93.4% accuracy, and their intermediate trained agent reached an NDCG@10 of 0.4 on the Oblique Congress benchmark, more than doubling the previous best performance of 0.18."
  canonical: "https://www.zenml.io/llmops-database/teaching-llm-agents-to-use-semantic-search-closing-the-knowledge-gap-with-agentic-retrieval"
  ogTitle: "MixedBread: Teaching LLM Agents to Use Semantic Search: Closing the Knowledge Gap with Agentic Retrieval - ZenML LLMOps Database"
  ogDescription: "Mixbread identified a growing gap between the exponentially improving reasoning capabilities of LLMs and the slowly evolving quality of retrieval systems, which they termed the \"knowledge gap.\" When testing benchmarks like BrowseCorp Plus and Office QA Pro, they found that models like GPT-4.5 performed 8-9% worse than Oracle performance (theoretical maximum if given the right documents), indicating that retrieval was the bottleneck rather than reasoning. To address this, Mixbread developed a specialized search agent with a four-tool harness including semantic search, overview search, filtered search, and grep-based keyword matching. They trained a small, efficient LLM using supervised fine-tuning with a teacher model followed by on-policy reinforcement learning with custom retrieval and trajectory rewards. Their beta version achieved top position on the Snowflake MatchQA benchmark with 93.4% accuracy, and their intermediate trained agent reached an NDCG@10 of 0.4 on the Oblique Congress benchmark, more than doubling the previous best performance of 0.18."
notion:
  pageId: "397f8dff-2538-8009-a3c2-eb7be6854a88"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:01:00.000Z"
  lastEditedTime: "2026-07-08T20:01:00.000Z"
  publishedAt: "2026-07-08T20:10:03Z"
---

## Overview

Mixbread, a company specializing in search and retrieval technologies, has developed a sophisticated approach to addressing what they identify as the "knowledge gap" in LLM applications. This case study presents their work on building specialized search agents that can effectively use powerful semantic search tools, moving beyond the limitations of existing LLM agents that are primarily optimized for code search and web browsing with keyword-based retrieval.

The fundamental insight driving this work is that while LLM reasoning capabilities have improved exponentially from GPT-3.5 to GPT-4.5, retrieval systems have evolved much more slowly over the past 20 years. Since retrieval serves as the primary access pattern for LLMs to obtain the right knowledge for tasks in domains like legal work, finance, and other knowledge-intensive applications, this gap represents a critical bottleneck in production LLM systems.

## Problem Definition and Benchmark Evidence

Mixbread validated their hypothesis about the knowledge gap using two real-world benchmarks. BrowseCorp Plus, created by OpenAI, is a browsing benchmark with complex queries over a corpus of 100,000 documents designed to simulate deep search tasks. Office QA Pro, created by Databricks, contains questions over approximately 100 years of US Treasury documents. The key methodology involved comparing Oracle performance (the theoretical maximum if the model receives the correct documents) against actual performance when models must retrieve documents from a noisy corpus using their default tools.

The results were striking. For BrowseCorp Plus, the Oracle performance was 93%, but GPT-4.5 with default tools achieved only 84% - a 9-point gap. For Office QA Pro, the Oracle performance was 64%, while actual performance was 56% - an 8-point gap. This demonstrated empirically that the bottleneck was not reasoning capability but rather access to the right knowledge through effective retrieval.

Interestingly, when they replaced the default search tools with Mixbread's latent interaction-based search, they could recover most of this performance gap. For BrowseCorp Plus, the difference between Oracle and GPT-4.5 with Mixbread dropped to just 3 points, and for Office QA Pro, they nearly closed the gap entirely. This proved that better search tooling could substantially improve end-to-end performance.

## Root Cause Analysis of Poor Search Queries

A critical discovery was that LLMs generate poorly structured queries for semantic search systems. An example query from their benchmarking was "senator woman questions billionaires not a company then okay thank you staff will check hearing" - essentially gibberish for a semantic search system expecting natural language questions. Mixbread identified three root causes for this behavior:

The models are primarily trained for coding tasks and optimized for code base exploration using tools like grep, which work on regular expression matching. This trains them to write multiple keywords they expect to find in documents rather than semantic descriptions. Second, models are trained to use web search tools optimized for human interaction, leading them to mimic human keyword-stacking query patterns. Third, there is benchmark bias - most existing retrieval benchmarks like BEIR and Nano-BEIR use "caveman-style" entity-based queries that structurally favor BM25 keyword matching, reinforcing this query generation pattern.

The result is that agents try to guess keywords to maximize overlap between queries and documents rather than leveraging the semantic understanding capabilities of modern neural search systems. This fundamentally limits their ability to use powerful search tools properly.

## Production System Architecture

Mixbread built their search agent entirely on their own platform, designing a harness with four distinct search tools that enable different retrieval strategies:

The overview search tool performs wide semantic search returning up to 50 retrieved chunks, but shows only summaries of chunk contents rather than full payloads. This gives the agent a broad view of the corpus without overwhelming the context window. The main semantic search tool returns full payloads of the top 10 retrieved chunks for deeper examination. A filter chunks tool allows sorting and finding chunks based on metadata facets. Finally, a grep tool handles exact keyword matching when needed.

The agent loop design balances exploration capability with speed requirements. The maximum is four search rounds, but within each round the agent can execute parallel searches. This allows thorough corpus exploration while maintaining tight latency constraints for production deployment. 

Initially, the agent receives the user query along with results from an initial semantic search on that query plus hints about available metadata facets. This preview of the corpus helps the agent plan its search strategy. It then splits its search intent into up to four queries covering separate aspects of the information need, selecting the best tool for each query. Results are returned with deduplication to avoid showing the same chunk multiple times and filling the context unnecessarily. As soon as the agent has sufficient evidence to answer the user query, it submits its ranking of all relevant chunks.

## Training Methodology for Better Query Generation

A key design goal was using a small, efficient LLM to keep the agent fast and cost-effective in production. The training approach had two phases: supervised fine-tuning with a larger teacher LLM, followed by on-policy reinforcement learning with a custom search reward function.

The custom reward combines retrieval rewards and trajectory rewards. The retrieval reward is based on standard metrics like NDCG (Normalized Discounted Cumulative Gain) computed on the agent's final ranked list. It also incorporates LLM-based retrieval judging using rubrics to determine if results are relevant to the query, if all chunks are relevant, and if the ranking is plausible.

The trajectory reward uses an LLM judge to evaluate the search process itself, improving tool choice, query quality, and efficiency. Rubrics check whether queries are formulated as natural sentences rather than keyword strings, whether the exploration is sufficient (not too much or too little), and overall trajectory quality. This combination of outcome-based and process-based rewards helps the agent learn not just to find good results, but to do so efficiently using appropriate search strategies.

## Prompt Engineering for Semantic Query Generation

The harness incorporates several prompt engineering techniques specifically designed to encourage better semantic queries and tool usage. First is goal framing - the agent must articulate what evidence it needs before writing the query, forcing it to think about information needs rather than keyword matching. 

The availability of different specialized tools allows the agent to use semantic search only when exploring aspects and concepts, while reserving grep for exact keyword matching scenarios. This tool variety creates natural decision points that improve search strategy.

A subtle but important technique is how the task of query writing is framed. Rather than instructing "write a search query" (which triggers learned patterns of keyword generation), the prompt instructs the agent to "write one concise sentence describing what you want to find." This reframing tricks the model into avoiding BM25-style query patterns and generating more natural semantic queries.

The prompt also includes examples showing good queries and demonstrating how to divide an input query into different aspects for exploring the corpus. Finally, providing the original query's semantic search results in the initial context helps the agent understand the corpus language and identify where to dig deeper into specific aspects.

## Production Results and Benchmarking

While the fully trained agent was not yet released at the time of this presentation, Mixbread shared intermediate results demonstrating substantial improvements. On the Oblique Congress benchmark, their trained agent achieved an NDCG@10 of 0.4, compared to 0.18 for the GPT multi-hop agent that performed best in the original benchmark paper - more than doubling performance.

Their beta version already in production, called Mixbread Agentic Search, achieved top position on the Snowflake MatchQA benchmark with 93.4% accuracy when used as the search tool for Gemini 3.5 Flash. Notably, this performance was achieved with significantly less computational effort than comparable systems using other search agents, demonstrating the efficiency gains from their approach.

These production results validate their hypothesis that the knowledge gap can be substantially closed by teaching agents to use powerful semantic search tools effectively, rather than relying solely on improvements in model reasoning capabilities.

## LLMOps Considerations and Trade-offs

This case study illustrates several important LLMOps considerations for production retrieval systems. The choice to use a small, specialized LLM for the search agent rather than a large general-purpose model reflects production constraints around latency and cost. Training this smaller model specifically for search tasks using reinforcement learning with domain-specific rewards represents a practical approach to getting good performance from compact models.

The four-round limit with parallel search capability demonstrates careful system design balancing exploration thoroughness against latency requirements. Too few rounds might miss important information, while unlimited rounds would make the system too slow for production use. The parallel search capability within rounds provides a middle ground, allowing broader exploration without additional latency.

The decision to show only summaries in the overview search tool while providing full payloads in the main semantic search reflects careful context window management. With LLM context as a limited resource, especially when using smaller models, this design maximizes the agent's ability to understand corpus coverage without exhausting context capacity.

The combination of retrieval metrics and LLM-based judging in the reward function represents a pragmatic approach to evaluation. Pure metrics like NDCG capture ranking quality but may miss nuances, while LLM judges can assess relevance and ranking plausibility in ways closer to human judgment. Using both provides more robust training signal.

However, several claims should be viewed with appropriate skepticism. The presentation comes from Mixbread promoting their own platform, so the dramatic performance improvements should be verified through independent benchmarking. The comparison baselines are somewhat dated - GPT-4.5 with "default tools" may not represent the current state of the art in agentic retrieval systems. The characterization of all existing benchmarks as biased toward BM25 may be overstated, as many modern benchmarks do incorporate semantic search evaluation.

The generalization of these results across different domains and use cases remains to be demonstrated. Performance on specific benchmarks like Office QA Pro and Oblique Congress, while impressive, may not translate directly to all production scenarios. The reliance on their own platform for all components means the approach may not be easily reproducible or adaptable by organizations using different infrastructure.

The training methodology involving reinforcement learning with custom rewards adds complexity to the MLOps pipeline. Maintaining the teacher model, implementing the reward functions with LLM judges, and managing the on-policy RL training process all create operational overhead compared to simpler approaches. Organizations would need to weigh these operational costs against the performance benefits for their specific use cases.

Overall, this case study represents a thoughtful approach to a real production problem - the gap between LLM reasoning capabilities and retrieval quality. The combination of careful system design, specialized training, and prompt engineering to encourage better search behavior offers valuable lessons for LLMOps practitioners building retrieval-augmented generation systems. The focus on efficiency and practical deployment considerations, including the use of smaller models and careful context management, demonstrates production-oriented thinking rather than purely research-focused optimization.
