---
title: "Teaching AI Agents to Use Semantic Search Tools Effectively Through Knowledge Agent Training"
slug: "teaching-ai-agents-to-use-semantic-search-tools-effectively-through-knowledge-agent-training"
draft: false
llmopsTags:
  - "question-answering"
  - "document-processing"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "fine-tuning"
  - "prompt-engineering"
  - "reinforcement-learning"
  - "few-shot"
  - "agent-based"
  - "harness-engineering"
  - "multi-agent-systems"
  - "langchain"
  - "openai"
  - "databricks"
industryTags: "tech"
company: "Mixedbread AI"
summary: "Mixedbread AI identified a critical \"knowledge gap\" where LLM reasoning capabilities have advanced exponentially while retrieval quality has stagnated, creating a bottleneck in production AI systems. Their solution involved building a custom search agent trained specifically to use semantic search tools effectively, moving beyond keyword-based queries that agents typically generate due to their training on code search and web tools. Through supervised fine-tuning with a teacher model followed by on-policy reinforcement learning with custom retrieval and trajectory rewards, they developed an agent that achieved an NDCG@10 of 0.4 on the OBELICS Congress benchmark (significantly outperforming GPT-4's 0.18) and 93.4% accuracy on Snowflake's MatchQA benchmark when paired with Gemini 3.5 Flash."
link: "https://www.youtube.com/watch?v=1IdzkRVmWAA&list=PLcfpQ4tk2k0V1LNigteMgExP1rb4Hy8wn&index=75"
year: 2026
seo:
  title: "Mixedbread AI: Teaching AI Agents to Use Semantic Search Tools Effectively Through Knowledge Agent Training - ZenML LLMOps Database"
  description: "Mixedbread AI identified a critical \"knowledge gap\" where LLM reasoning capabilities have advanced exponentially while retrieval quality has stagnated, creating a bottleneck in production AI systems. Their solution involved building a custom search agent trained specifically to use semantic search tools effectively, moving beyond keyword-based queries that agents typically generate due to their training on code search and web tools. Through supervised fine-tuning with a teacher model followed by on-policy reinforcement learning with custom retrieval and trajectory rewards, they developed an agent that achieved an NDCG@10 of 0.4 on the OBELICS Congress benchmark (significantly outperforming GPT-4's 0.18) and 93.4% accuracy on Snowflake's MatchQA benchmark when paired with Gemini 3.5 Flash."
  canonical: "https://www.zenml.io/llmops-database/teaching-ai-agents-to-use-semantic-search-tools-effectively-through-knowledge-agent-training"
  ogTitle: "Mixedbread AI: Teaching AI Agents to Use Semantic Search Tools Effectively Through Knowledge Agent Training - ZenML LLMOps Database"
  ogDescription: "Mixedbread AI identified a critical \"knowledge gap\" where LLM reasoning capabilities have advanced exponentially while retrieval quality has stagnated, creating a bottleneck in production AI systems. Their solution involved building a custom search agent trained specifically to use semantic search tools effectively, moving beyond keyword-based queries that agents typically generate due to their training on code search and web tools. Through supervised fine-tuning with a teacher model followed by on-policy reinforcement learning with custom retrieval and trajectory rewards, they developed an agent that achieved an NDCG@10 of 0.4 on the OBELICS Congress benchmark (significantly outperforming GPT-4's 0.18) and 93.4% accuracy on Snowflake's MatchQA benchmark when paired with Gemini 3.5 Flash."
notion:
  pageId: "38ef8dff-2538-80c3-a383-ebca8a6e4dc3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-29T14:59:00.000Z"
  lastEditedTime: "2026-06-29T14:59:00.000Z"
  publishedAt: "2026-07-01T19:42:39Z"
---

## Overview

Mixedbread AI has developed a specialized approach to address what they term the "knowledge gap" - the growing disparity between rapidly advancing LLM reasoning capabilities and the relatively stagnant state of retrieval technology. This case study presents their work on building and training knowledge agents that can effectively use modern semantic search tools in production environments, particularly for knowledge work beyond code search in domains like legal and finance.

The core premise is that while LLMs have evolved dramatically in reasoning ability from GPT-3.5 to GPT-4.5, search technology has only improved incrementally over the past two decades. Since retrieval tools serve as the primary access pattern for LLMs to acquire knowledge, this gap creates a fundamental bottleneck in production AI systems. The Mixedbread team validated this hypothesis empirically using real-world benchmarks.

## Problem Identification and Validation

Mixedbread AI quantified the knowledge gap using two complex benchmarks. BrowseComp Plus, a browsing benchmark created by OpenAI, contains complex queries over a corpus of 100,000 documents designed to simulate real-world deep search tasks. OfficeQA Pro, created by Databricks, uses 100 years of US Treasury documents to test complex question answering capabilities.

The critical insight came from comparing Oracle performance (the theoretical maximum if models received perfect documents) against actual performance with real retrieval systems. For BrowseComp Plus, Oracle performance reached 93%, but GPT-4 with default tools achieved only 84% - a 9-point gap. For OfficeQA Pro, Oracle performance was 64%, while actual performance dropped to 56% - an 8-point gap. This demonstrates that the bottleneck is not reasoning capability but rather access to the right knowledge.

When Mixedbread replaced default search with their own latent interaction-based search tool, they recovered most of this performance gap. The difference between Oracle and GPT-4.5 with Mixedbread search dropped to just 3 points on BrowseComp Plus, and they nearly closed the gap completely on OfficeQA Pro. This validated that better search infrastructure could dramatically improve production LLM system performance.

## Root Cause Analysis: Why Agents Write Poor Queries

The team discovered that existing agents generate ineffective search queries for semantic systems, often producing gibberish-like keyword strings. An example they found was "senator woman questions billionaires not a company then okay thank you staff will check hearing" - essentially a concatenation of keywords rather than a coherent semantic query.

They identified three root causes for this behavior. First, most LLMs are primarily trained for coding tasks and optimized for code base exploration using tools like grep, which seeks regular expressions. This training bias causes models to generate as many potential keyword matches as possible. Second, models are trained to use web tools that are optimized for humans, leading them to mimic human-like keyword-based query patterns. Third, benchmark bias plays a role - most existing retrieval benchmarks like BEIR and Nano-BEIR use what they call "caveman style queries" that are entity-based and structurally favor BM25 over semantic search.

The result is that agents essentially guess at keywords to maximize overlap between queries and documents rather than leveraging the full power of modern semantic search tools. This represents a fundamental mismatch between how agents are trained to query and how advanced retrieval systems are designed to work.

## Solution Architecture: The Search Agent Harness

Mixedbread AI designed a custom search agent with specific goals: precision, speed, and cost-effectiveness, while working beyond code search to support general knowledge work. The architecture is built entirely on the Mixedbread platform and consists of a carefully designed harness with four main search tools.

The overview search tool performs wide semantic search, returning up to 50 retrieved chunks but showing only summaries of chunk contents. This provides the agent with a broad view of the corpus without overwhelming context windows. The main semantic search tool returns the full payload of the top 10 retrieved chunks for deep investigation. A filter chunks tool allows sorting and finding based on metadata facets. Finally, a grep tool is available for exact keyword matching when needed.

The agent loop itself is intentionally simple and short to maintain speed, but supports extensive exploration through a maximum of four search rounds. Within each round, the agent can execute parallel searches to investigate multiple aspects simultaneously. The agent initially receives the user query, results from an initial semantic search on that query, and hints about available metadata facets. This corpus preview enables informed search planning.

The agent splits its search intent into a maximum of four queries covering separate aspects, selecting the best tool for each. Results are deduplicated before being returned to avoid redundant context consumption. As soon as the agent has sufficient evidence, it submits its ranking of all relevant chunks. This architecture encourages better semantic query formulation through several mechanisms.

## Training the Agent to Use Search Properly

Five key design principles encourage better semantic queries and tool use. First, goal framing requires the agent to articulate what evidence it needs before writing queries. Second, distinct tools allow the agent to use semantic search only when exploring aspects and grep only for exact keyword matching. Third, task framing is critical - rather than instructing the agent to "write a search query," they frame it as "write one concise sentence describing what you want to find." This prevents the agent from falling into BM25-style keyword patterns.

Fourth, they provide examples in prompts showing good queries and how to divide input queries into different exploratory aspects. Fifth, providing initial semantic search results helps the agent understand corpus language and identify where to dig deeper.

The training process involved two main phases. First, supervised fine-tuning with a larger teacher LLM to establish baseline behavior. Second, on-policy reinforcement learning with a custom search reward function designed specifically to optimize retrieval performance. They deliberately chose a small LLM for the agent to maintain speed while focusing optimization on search strategy, tool choice, query quality, exploration patterns, and efficiency.

## Custom Reward Function Design

The reinforcement learning approach relied on a sophisticated composite reward function combining retrieval rewards and trajectory rewards. The retrieval reward component uses standard retrieval metrics, specifically NDCG, calculated on the agent's final ranked list. This is augmented with LLM-based retrieval judging using multiple rubrics: whether results are relevant to the query, whether all chunks are relevant, and whether the ranking itself is plausible.

The trajectory reward uses an LLM judge to assess the search process itself, not just final results. Rubrics evaluate whether queries are formulated as natural sentences rather than keyword strings, whether the amount of exploration is appropriate (neither too much nor too little), and overall efficiency. This dual reward structure allows the system to optimize both what the agent retrieves and how it conducts the search process.

An example trajectory shows the agent receiving an initial search and metadata hints, then executing four parallel searches in the first round, followed by a simple grep tool in the second round. The queries demonstrate the intended behavior - semantic search queries are full sentences describing information needs, while grep queries appropriately use keyword patterns. For instance, given a long rambling query from the OBELICS Congress benchmark, the agent reformulates semantic searches as coherent sentences rather than keyword concatenations.

## Production Results and Benchmarking

While the fully trained agent was not yet released at the time of this presentation, Mixedbread AI shared intermediate results demonstrating significant progress. On the OBELICS Congress benchmark, their agent achieved an NDCG@10 of 0.4, representing a substantial improvement over the GPT-4 multi-hop agent which achieved 0.18 in the original benchmark paper. This more than doubles the retrieval quality on this complex government document benchmark.

Their beta version agent, deployed in production as Mixedbread Agentic Search, achieved top-one ranking on the Snowflake MatchQA benchmark with 93.4% accuracy when providing Gemini 3.5 Flash with their agent as a search tool. Importantly, they note this performance was achieved with significantly less computational effort than comparable systems using other search agents. The MatchQA leaderboard provides public verification of these results.

## LLMOps Considerations and Production Deployment

This case study illustrates several important LLMOps principles for production systems. First, the identification and quantification of bottlenecks through systematic benchmarking with Oracle comparisons demonstrates rigorous performance analysis methodology. Rather than assuming reasoning is the limiting factor, they empirically validated that retrieval quality constrained end-to-end system performance.

Second, the architecture reflects production-oriented design decisions prioritizing speed, cost, and precision. The deliberate choice of a small LLM for the agent, constrained search rounds, and parallel execution capabilities all reflect real-world operational constraints rather than purely maximizing benchmark performance.

Third, the custom reward function design for reinforcement learning shows sophisticated thinking about what behaviors to optimize in production retrieval systems. Rather than relying solely on standard retrieval metrics, they incorporated trajectory rewards to optimize the search process itself, including query quality and exploration efficiency. The use of LLM judges with explicit rubrics provides interpretable feedback signals during training.

Fourth, the approach demonstrates architectural thinking about tool design for LLM agents. Rather than simply providing generic search access, they carefully designed multiple specialized tools (overview search, main semantic search, filter chunks, grep) with different characteristics and use cases. The harness encourages appropriate tool selection through its structure and prompting strategy.

Fifth, the system addresses the common production challenge of bridging the gap between how models are trained (primarily on code) and how they need to behave in domain-specific applications (legal, finance, etc.). The training approach specifically counteracts inappropriate behavioral patterns learned from pre-training.

## Critical Assessment and Considerations

While the results are impressive, several considerations warrant attention. The benchmarks used, while complex, may not fully represent all production retrieval scenarios. The OBELICS Congress benchmark focuses on government documents, and MatchQA on structured data - generalization to other domains remains to be validated.

The reliance on LLM judges for both retrieval quality and trajectory assessment introduces potential biases and limitations inherent in those judge models. The rubrics used for judging are not fully detailed in the presentation, making it difficult to assess potential edge cases or failure modes. Additionally, LLM judges add computational cost and latency, though this may be acceptable during training if not used at inference time.

The comparison to GPT-4 with "default tools" is somewhat vague - the specific retrieval implementation being compared against is not fully specified, making it difficult to assess the true magnitude of improvement versus potentially suboptimal baselines. Similarly, while they claim "way less effort" on MatchQA compared to other systems, the specific computational and cost metrics are not provided.

The training data and methodology for the supervised fine-tuning phase are not detailed. The quality and diversity of the teacher model's outputs would significantly impact the final agent's capabilities. The on-policy reinforcement learning approach is computationally expensive, and the presentation does not discuss training time, data requirements, or how many iterations were needed to achieve reported results.

The architecture limits agents to four search rounds with parallel searches within rounds. While this constraint supports speed and cost objectives, it may limit performance on extremely complex queries requiring deeper investigation. The presentation does not discuss failure cases or scenarios where this constraint proves limiting.

Finally, as a company building and promoting their own search platform, Mixedbread AI has inherent incentives to demonstrate the value of their approach. The benchmarks chosen and baselines selected may favor their methodology. Independent validation and comparison with other state-of-the-art agentic retrieval systems would strengthen the claims.

## Broader Implications for LLMOps

This work highlights an important insight for practitioners building production LLM systems: the retrieval layer often represents a more significant bottleneck than reasoning capabilities, particularly as foundation models continue to improve. Organizations investing heavily in model selection and prompt engineering while using basic retrieval implementations may be missing the highest-impact optimization opportunity.

The approach demonstrates the value of specialization in production AI systems. Rather than relying on general-purpose models to handle all aspects of a task, designing specialized components (in this case, a small dedicated search agent) can achieve better performance at lower cost than using larger general models for everything.

The mismatch between model training distributions (heavily weighted toward code) and production use cases (knowledge work in various domains) represents an ongoing challenge in LLMOps. This case study shows that targeted fine-tuning and reinforcement learning can effectively adapt model behavior, but it requires careful analysis of why models behave inappropriately before designing interventions.

The emphasis on trajectory optimization, not just final results, reflects mature thinking about production systems. How an agent conducts a search process affects not just quality but also latency, cost, and debuggability. Optimizing the process itself rather than just end metrics leads to more robust and efficient production systems.

Overall, this case study illustrates the complexity of deploying effective LLM-powered retrieval systems in production and the value of purpose-built training approaches that address the specific behavioral patterns needed for different tool types and use cases.
