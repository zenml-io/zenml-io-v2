---
title: "Semantic Search for AI Agents at Scale: Retrieval and Ranking for LinkedIn's Hiring Assistant"
slug: "semantic-search-for-ai-agents-at-scale-retrieval-and-ranking-for-linkedins-hiring-assistant"
draft: false
llmopsTags:
  - "question-answering"
  - "classification"
  - "summarization"
  - "embeddings"
  - "semantic-search"
  - "prompt-engineering"
  - "few-shot"
  - "reranking"
  - "model-optimization"
  - "token-optimization"
  - "a2a"
  - "vllm"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "open-source"
  - "documentation"
industryTags: "hr"
company: "LinkedIn"
summary: "LinkedIn developed a semantic search system for their Hiring Assistant product to match recruiter queries expressed in natural language with qualified candidates from over 1.3 billion member profiles. The challenge was that traditional keyword and faceted search approaches failed to deliver both quality matches and sufficient coverage—keyword search returned zero results for nearly half of queries, while faceted search surfaced many unqualified profiles. LinkedIn's solution centered on MUSE (Member Understanding Semantic Embeddings), combining LLM-based supervision for relevance judgments with dual-tower embedding models optimized via Matryoshka embeddings for both billion-scale approximate nearest neighbor (ANN) retrieval and downstream ranking. The system achieved significant improvements in online A/B tests: +2.7% highly relevant rate, +4.1% InMail sends per recruiter seat, and became the highest-quality sourcing strategy while maintaining 96% query coverage and 76% retrieval pool utilization."
link: "https://www.linkedin.com/blog/engineering/ai/semantic-search-for-ai-agents-at-scale-retrieval-and-ranking-for-linkedins-hiring-assistant?utm_source=substack&utm_medium=email"
year: 2026
seo:
  title: "LinkedIn: Semantic Search for AI Agents at Scale: Retrieval and Ranking for LinkedIn's Hiring Assistant - ZenML LLMOps Database"
  description: "LinkedIn developed a semantic search system for their Hiring Assistant product to match recruiter queries expressed in natural language with qualified candidates from over 1.3 billion member profiles. The challenge was that traditional keyword and faceted search approaches failed to deliver both quality matches and sufficient coverage—keyword search returned zero results for nearly half of queries, while faceted search surfaced many unqualified profiles. LinkedIn's solution centered on MUSE (Member Understanding Semantic Embeddings), combining LLM-based supervision for relevance judgments with dual-tower embedding models optimized via Matryoshka embeddings for both billion-scale approximate nearest neighbor (ANN) retrieval and downstream ranking. The system achieved significant improvements in online A/B tests: +2.7% highly relevant rate, +4.1% InMail sends per recruiter seat, and became the highest-quality sourcing strategy while maintaining 96% query coverage and 76% retrieval pool utilization."
  canonical: "https://www.zenml.io/llmops-database/semantic-search-for-ai-agents-at-scale-retrieval-and-ranking-for-linkedins-hiring-assistant"
  ogTitle: "LinkedIn: Semantic Search for AI Agents at Scale: Retrieval and Ranking for LinkedIn's Hiring Assistant - ZenML LLMOps Database"
  ogDescription: "LinkedIn developed a semantic search system for their Hiring Assistant product to match recruiter queries expressed in natural language with qualified candidates from over 1.3 billion member profiles. The challenge was that traditional keyword and faceted search approaches failed to deliver both quality matches and sufficient coverage—keyword search returned zero results for nearly half of queries, while faceted search surfaced many unqualified profiles. LinkedIn's solution centered on MUSE (Member Understanding Semantic Embeddings), combining LLM-based supervision for relevance judgments with dual-tower embedding models optimized via Matryoshka embeddings for both billion-scale approximate nearest neighbor (ANN) retrieval and downstream ranking. The system achieved significant improvements in online A/B tests: +2.7% highly relevant rate, +4.1% InMail sends per recruiter seat, and became the highest-quality sourcing strategy while maintaining 96% query coverage and 76% retrieval pool utilization."
notion:
  pageId: "380f8dff-2538-800f-9ad3-f969186e24f2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-15T07:24:00.000Z"
  lastEditedTime: "2026-06-15T07:24:00.000Z"
  publishedAt: "2026-06-19T09:23:01Z"
---

## Overview

LinkedIn's Hiring Assistant represents a sophisticated production LLMOps deployment tackling the challenge of semantic candidate search at unprecedented scale. The system must match natural language recruiter queries—often full paragraphs describing complex qualification requirements—against more than 1.3 billion member profiles in real-time. This case study demonstrates a mature end-to-end LLMOps architecture that combines multiple LLMs in orchestrated roles: query understanding, embedding-based retrieval, ranking, and candidate evaluation.

The core innovation is MUSE (Member Understanding Semantic Embeddings), which distills complex multi-step LLM reasoning about candidate-role fit into a computationally efficient vector similarity operation. The system represents a noteworthy example of how organizations can move beyond simple RAG patterns to build sophisticated multi-stage retrieval and ranking pipelines that balance quality, coverage, latency, and responsible AI constraints at billion-user scale.

## The Problem and System Architecture

Before MUSE, LinkedIn faced a classic quality-versus-coverage dilemma. Faceted search (structured filters) achieved near-universal query coverage but surfaced many irrelevant candidates. Boolean keyword search offered better precision but returned zero results for approximately 50% of queries because qualifications are expressed in myriad ways that don't reduce to simple keyword matching. Neither approach could handle the shift from structured filters to free-text natural language queries that describe nuanced requirements like "cross-functional leadership experience" or "domain expertise in pediatric care."

The Hiring Assistant orchestrates multiple retrieval strategies in parallel, including faceted search, boolean search, semantic retrieval via MUSE, recruiter-personalized recommendations, and lookalike candidate search. Each strategy independently surfaces up to hundreds of candidate profiles. These outputs are blended and re-ranked by a second-stage ranker (L2), then scrutinized by an automated LLM-based candidate evaluation system before recruiters see final results.

The semantic search flow proceeds through five stages. First, a recruiter describes requirements in natural language. Second, a prompt-engineered proprietary LLM parses this free text into structured role details (title, seniority, location) and a list of qualifications through query understanding. Third, the MUSE query model encodes these into a single vector, and approximate nearest neighbor (ANN) search scans over 1 billion+ pre-computed profile embeddings to find closest matches, with attribute-based matching post-filters applied. Fourth, semantic retrieval results are merged with other strategies and the L2 ranker re-orders the combined pool, optimizing for engagement while using MUSE embeddings as input features. Fifth, an LLM guard evaluates each candidate's fit and generates natural-language explanations of why they match the role.

## Constitutional AI and the MUSE Teacher System

A critical LLMOps innovation is LinkedIn's approach to supervision and evaluation alignment. Rather than relying on engagement signals or manually labeled data alone, the team built what amounts to a "constitutional AI" system where product policy defines what "qualified" means. This policy enforces two pillars: relevance based strictly on experience, skills, and role fit; and adherence to LinkedIn and Microsoft's Responsible AI Principles promoting fairness, inclusion, transparency, and user control.

The Expert Judge is a prompt-engineered state-of-the-art proprietary LLM that serves as the reference implementation of this constitutional definition. It plays dual roles: as the gold-standard evaluator in offline evaluation cascades, and as the high-quality teacher generating seed labels. The same prompt-encoded constitution governs both evaluation and training, ensuring alignment between what the system optimizes for and how it's measured. This constitution evolved from a single qualification-match dimension to multi-dimensional scoring covering title, seniority, industry, hard skills, and education, with each expansion feeding back into teacher supervision.

However, the Expert Judge operates at costs and latencies that cap it at hundreds of thousands of labels, while representative embedding training requires millions. To bridge this gap, LinkedIn built the MUSE Teacher: an open-weight reasoning model, prompt-engineered (notably without fine-tuning in its current form) to replicate the Expert Judge's qualification-match judgments at scale. The team evaluated multiple open-weight reasoning and text-generation models under identical conditions, using weighted Cohen's Kappa as the primary selection metric to measure alignment with human annotators while adjusting for chance agreement and disagreement severity.

A key finding was that models producing explicit chain-of-thought reasoning before final judgments were systematically more accurate than those jumping straight to answers, even at comparable parameter counts. Some open-weight models outperformed proprietary ones on this metric. The MUSE Teacher prompt was refined over multiple iterations driven by manual failure mode inspection, yielding a +24% Kappa improvement. The most impactful changes included adding role details as context, including worked examples of overqualified versus underqualified candidates, introducing a scratchpad forcing structured reasoning, and encoding constitutional constraints directly into the prompt. The teacher pipeline is designed to swap in stronger models as they emerge, representing a pragmatic approach to LLMOps where supervision systems evolve alongside capabilities.

Interestingly, high-confidence MUSE Teacher predictions were often more reliable than human annotations—roughly four out of five times when disagreements occurred. Humans consistently won on common-sense inference (e.g., "MS Word experience" implied by role) and arithmetic (years-of-experience calculations), but models excelled at comprehending entire technical contexts. This finding challenges conventional wisdom about treating human labels as ground truth ceilings rather than noisy signals.

## Embedding Architecture: Dual-Tower with Matryoshka Design

MUSE uses a dual-tower Siamese architecture where a single shared LLM encodes both queries and profiles into the same embedding space. The dual-tower design is driven by a serving constraint: at query time, only the query embedding is computed online via a hosted vLLM endpoint (under 100ms at p95), while profile embeddings are pre-computed and indexed offline over 1 billion+ documents. Weight sharing across towers simplifies training and deployment while encouraging alignment between query and profile representations, yet still supports asymmetric inputs through different prompt templates for each side.

A key engineering decision was implementing Matryoshka embeddings—vectors that can be truncated to different dimensionalities depending on the client task, all from a single training run. The name comes from Russian nesting dolls: the full 4096-dimensional embedding contains a useful 2048-dimensional embedding inside it, which contains a useful 1024-dimensional one, and so on. Each truncation level is explicitly optimized during training through a weighted sum of contrastive losses computed at each level [512, 1024, 2048, 4096].

This design addresses the computational asymmetry between retrieval and ranking. Retrieval needs to scan over 1 billion+ profiles via an ANN index, so LinkedIn uses 2048-dimensional truncations—small enough for fast approximate search, large enough to capture qualification-level semantics. Ranking scores only the top N candidates returned by retrieval, so the full 4096 dimensions serve as input features to the L2 ranker, providing maximum fidelity where it can be afforded.

Matryoshka training encourages the model to front-load coarser signals—title, seniority, location—into lower dimensions and reserve higher dimensions for fine-grained qualification reasoning. These structured attributes are most consistently represented in both queries and profiles used for training, so when constrained to fewer dimensions the model likely prioritizes them first. Evaluation confirms this: retrieval metrics degrade gracefully as dimensions decrease, with the sharpest drop below 1024 where nuanced qualification resolution is lost.

All supervision comes from MUSE Teacher labels—not engagement signals. The base model already clusters semantically related texts, but its notion of similarity is generic: two software engineers land near each other regardless of qualification fit. Fine-tuning on teacher labels reorganizes the geometry so that proximity reflects qualification match as defined by product policy, effectively baking the teacher's multi-step reasoning into a single cosine similarity operation. The training loss is a Matryoshka-equipped InfoNCE with listwise batches that group all positives alongside hard and easy negatives per query together for complete ranking signal per update.

## Billion-Scale Production Infrastructure

Meeting production requirements—recruiters expect results reflecting the latest member data, and every model version needs end-to-end validation before shipping—required solving several interconnected infrastructure problems at unprecedented scale. MUSE's serving infrastructure follows a Lambda architecture with a batch layer and a speed layer feeding a shared serving layer. Offline inference and data pipelines are orchestrated across distributed GPU nodes, with scheduling, data preparation, and batch inference each handled by purpose-built frameworks.

The batch layer handles bootstrap: full LLM inference over 1 billion+ member profiles, producing both the 2048-dimensional embeddings for the IVFPQ ANN search index (integrated with ABM + inverted index in Galene) and the full 4096-dimensional embeddings pushed to a key-value store (Venice) for the ranking model. This is a one-time, full-corpus computation running whenever a new model version is deployed. On a weekly cadence, both the Venice store and the ANN index are rebuilt from scratch, serving as a backfill that ensures all embeddings reflect the latest profile state and recovers any gaps from daily inference failures or missed change data capture (CDC) events.

The speed layer keeps embeddings fresh between weekly rebuilds. A daily scheduled job detects new or updated member profiles via CDC and infers their embeddings. Both layers write to date-partitioned Apache Iceberg tables—the single source of truth for delta updates, time-aware training features (preventing look-ahead bias), and atomic member deletions for regulatory compliance.

Serving 2048-dimensional Matryoshka embeddings over a billion-member index required scaling the IVFPQ pipeline well beyond its previous operating point—both offline (training/indexing) and online (query serving). The existing pipeline had only been tested at 10x fewer documents and significantly smaller embedding dimensions. The team introduced several step-function improvements: adopting bisecting k-means for centroid initialization (which parallelizes more efficiently than standard k-means), optimizing Spark parallelism to achieve two orders-of-magnitude reductions in index training time, and training centroids on a representative subsample of the corpus to enable faster iteration before committing to full-corpus index builds.

For online serving, the primary tuning lever is nprobe—the number of IVFPQ clusters explored per query—which trades recall for latency and must be set high enough that sufficient candidates survive ABM post-filters. To cut wasted computation, the team introduced inline filtering that skips distance calculation for filtered documents entirely, making latency scale with the number of returned results rather than nprobe. A final optimization decouples the pipeline into two phases—inverted index scanning followed by forward index fetching—allowing each to scale independently.

## Integration with Ranking and Cascading Evaluation

MUSE embeddings serve double duty: powering L1 retrieval and feeding the L2 ranker as input features, ensuring the same relevance signal that surfaces a candidate also influences how that candidate is scored. The L2 Ranker is a DCNv2 architecture optimized on engagement labels with over 100 features. Integrating MUSE's full 4096-dimensional embeddings required a deliberate recipe: downprojection layers (linear + LayerNorm + GeLU) adapt the embeddings to the ranker's feature space, Hadamard crossing captures multiplicative query-candidate interactions richer than cosine similarity, and skip connections preserve direct access to the original representations.

In ablation studies, MUSE query and member embeddings emerged as the most influential feature group in the entire model—the relevance signal not only survives the transition from retrieval to ranking but becomes the ranker's strongest predictor of engagement. This represents a noteworthy architectural pattern for LLMOps: using embeddings as a bridge between retrieval and ranking stages, allowing a single learned representation to influence multiple decision points in the pipeline.

Iterating on embeddings at this scale requires a principled evaluation cascade where each stage trades off speed against fidelity to production. Stage 1 is PyTorch training evaluation using standard retrieval metrics—Recall@k, MAP@k, NDCG@k—on held-out data, completing in hours as the fast-feedback loop for modeling hypotheses before anything touches infrastructure.

Stage 2 is offline Expert Judge replay of production queries. To evaluate the impact of a promising embedding model, LinkedIn leveraged the replay system built for recruiter search evaluation. Production queries are sampled, and queries from all sourcing strategies are replayed end-to-end—query understanding, retrieval, ABM filtering, and ranking—with Expert Judge assessing the relevance of returned candidates. The replay runs with the candidate model as the variant and the production system as the control. Metrics are tracked at every pipeline stage—retrieval (Highly Relevant Rate or HRR, Facepalm Rate, and liquidity), post-ranking (relevance metrics plus candidate share), and post-candidate evaluation (what recruiters actually see). Crucially, this stage proved to be a reliable proxy for production: HRR and Facepalm trends observed in replay consistently predicted the direction of online improvements.

Stage 3 is online evaluation—the final gate consisting of a controlled A/B test on live traffic tracking relevance quality (post-LLM Guard HRR and Eval Pass Rate), engagement (InMail Sends and Accepts per seat), and sourcing throughput (candidates sourced, Viewed Contact Rate). This multi-stage evaluation cascade represents LLMOps best practice: fast iteration loops for model development, high-fidelity offline replay that correlates with production, and conservative online testing before full rollout.

## Results and Surprising Findings

In Expert Judge replays, MUSE-powered semantic retrieval delivered the best of both worlds as a single sourcing strategy, replacing an earlier engagement-optimized system that fused a sister organization's embeddings in retrieval and vanilla open-weight LLM embeddings in the L2 ranker as strong baselines. Its liquidity—approximately 76% average utilization of the retrieval pool at 96% query coverage—matched the prior high-liquidity faceted strategies and was 2.1x higher than the prior high-quality Boolean strategy. Its quality also matched the high-quality strategy, with pre-L2 HRR approximately 1% higher in absolute value (and 8% higher than the engagement-optimized EBR). After the MUSE-featured L2 Ranker, the full stack drove pre-LLM Guard HRR up +4% and Facepalm rate down −5%, while semantic retrieval's candidate share rose from 18% to 31%, confirming improved retrieval-ranker consistency.

The online pattern confirmed the design intent: the system surfaces a tighter, higher-quality candidate pool rather than optimizing for volume. A two-week A/B test validated this in production with relative gains: post-LLM Guard HRR +2.7%, InMail Sends per seat +4.1%, Eval Pass Rate trending +3.8%, with candidates sourced per seat down approximately 4%—fewer but better. InMail Accepts per seat trended +1.8%. These gains represent a step-function improvement in the quality of semantic search results for Hiring Assistant.

The team surfaced several surprising findings. Beyond the observation about high-confidence LLMs outperforming human annotators on knowledge-intensive labeling, they found that contrastive post-training alignment beats model size for embedding tasks. Alignment between the base model's post-training objective and the downstream task matters more than raw parameter count. Models post-trained with contrastive objectives on large-scale text pairs—where the training signal is already "place semantically related texts close together"—adapt to retrieval far more effectively than models stronger at generation but lacking that alignment. Tokenization also plays a role: models with tokenizers optimized for long, structured texts encode inputs (resumes, qualification lists) more faithfully.

Another insight was that approximate retrieval and post-filtering compound each other's losses. ANN search trades recall for speed, and post-filters then discard more candidates after retrieval—the two losses multiply. ABM + EBR spends limited retrieval slots on candidates that get filtered out, while strong matches that an exact search would find are never scored. According to LinkedIn's estimates, exhaustive kNN with pre-filters over the same query understanding would yield approximately 30% more candidates at the same relevance—a gap motivating their next infrastructure investment as part of a broader effort to reshape LinkedIn's search stack.

## Critical LLMOps Observations

This case study demonstrates several critical LLMOps patterns worth highlighting. First, the constitutional AI approach to supervision—encoding product policy and responsible AI principles directly into the prompt that generates training labels—ensures alignment between what the system optimizes for and what the product values. This is superior to naive engagement-based supervision which can perpetuate biases or optimize for the wrong outcomes.

Second, the multi-stage LLM orchestration shows sophisticated understanding of where different model types add value: proprietary LLMs for query understanding and high-quality evaluation, open-weight reasoning models for scalable supervision, and fine-tuned embeddings for efficient retrieval. This heterogeneous approach is more pragmatic than attempting to solve all problems with a single model type.

Third, the Matryoshka embedding architecture elegantly solves the tension between retrieval (needs speed over billions of documents) and ranking (needs fidelity over hundreds of candidates) without training separate models. This represents thoughtful co-design of model architecture and serving constraints.

Fourth, the Lambda architecture with CDC-driven delta inference shows mature thinking about freshness versus cost tradeoffs. Weekly full rebuilds provide a backstop while daily CDC updates keep most profiles current, with Iceberg tables providing time-aware features that prevent look-ahead bias in training—a subtle but important detail for model quality.

Fifth, the cascading evaluation framework with correlation analysis between offline replay and online metrics demonstrates disciplined experimentation practice. Too many organizations skip the intermediate replay stage and go directly from offline metrics to online A/B tests, losing the ability to debug why models that look good offline fail in production.

Finally, the finding that approximate retrieval and post-filtering losses compound highlights a common anti-pattern in production search systems. Many teams bolt filters onto retrieval systems without accounting for how this interaction degrades overall recall, leading to suboptimal architecture choices. LinkedIn's transparency about this gap and their plan to address it through infrastructure investment shows honest assessment of system limitations.
