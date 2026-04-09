---
title: "Next-Generation Feed Ranking with LLMs and Sequential Transformers"
slug: "next-generation-feed-ranking-with-llms-and-sequential-transformers"
draft: false
llmopsTags:
  - "content-moderation"
  - "question-answering"
  - "classification"
  - "embeddings"
  - "fine-tuning"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "pytorch"
  - "monitoring"
  - "databases"
  - "scaling"
  - "microservices"
  - "orchestration"
  - "open-source"
  - "cache"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn rebuilt its Feed recommendation system to serve 1.3 billion professionals with more relevant, personalized content. The previous system relied on multiple heterogeneous retrieval sources and independent impression-based ranking, creating engineering complexity and missing sequential engagement patterns. LinkedIn developed a hybrid solution combining LLM-based unified retrieval with a Generative Recommender (GR) sequential ranking model powered by transformers. The LLM-based retrieval replaced multiple separate systems with a single dual-encoder architecture generating rich embeddings that capture semantic relationships and professional context, while the GR model treats user interaction history as ordered sequences rather than independent events. The system required significant production engineering including custom GPU infrastructure, optimized CUDA kernels, and specialized attention mechanisms to serve predictions at scale with sub-second latency. The result is a more engaging, personalized Feed that surfaces relevant content from both connections and the broader professional network while maintaining responsible AI principles through regular auditing for fairness."
link: "https://www.linkedin.com/blog/engineering/feed/engineering-the-next-generation-of-linkedins-feed?utm_source=substack&utm_medium=email"
year: 2026
seo:
  title: "LinkedIn: Next-Generation Feed Ranking with LLMs and Sequential Transformers - ZenML LLMOps Database"
  description: "LinkedIn rebuilt its Feed recommendation system to serve 1.3 billion professionals with more relevant, personalized content. The previous system relied on multiple heterogeneous retrieval sources and independent impression-based ranking, creating engineering complexity and missing sequential engagement patterns. LinkedIn developed a hybrid solution combining LLM-based unified retrieval with a Generative Recommender (GR) sequential ranking model powered by transformers. The LLM-based retrieval replaced multiple separate systems with a single dual-encoder architecture generating rich embeddings that capture semantic relationships and professional context, while the GR model treats user interaction history as ordered sequences rather than independent events. The system required significant production engineering including custom GPU infrastructure, optimized CUDA kernels, and specialized attention mechanisms to serve predictions at scale with sub-second latency. The result is a more engaging, personalized Feed that surfaces relevant content from both connections and the broader professional network while maintaining responsible AI principles through regular auditing for fairness."
  canonical: "https://www.zenml.io/llmops-database/next-generation-feed-ranking-with-llms-and-sequential-transformers"
  ogTitle: "LinkedIn: Next-Generation Feed Ranking with LLMs and Sequential Transformers - ZenML LLMOps Database"
  ogDescription: "LinkedIn rebuilt its Feed recommendation system to serve 1.3 billion professionals with more relevant, personalized content. The previous system relied on multiple heterogeneous retrieval sources and independent impression-based ranking, creating engineering complexity and missing sequential engagement patterns. LinkedIn developed a hybrid solution combining LLM-based unified retrieval with a Generative Recommender (GR) sequential ranking model powered by transformers. The LLM-based retrieval replaced multiple separate systems with a single dual-encoder architecture generating rich embeddings that capture semantic relationships and professional context, while the GR model treats user interaction history as ordered sequences rather than independent events. The system required significant production engineering including custom GPU infrastructure, optimized CUDA kernels, and specialized attention mechanisms to serve predictions at scale with sub-second latency. The result is a more engaging, personalized Feed that surfaces relevant content from both connections and the broader professional network while maintaining responsible AI principles through regular auditing for fairness."
notion:
  pageId: "325f8dff-2538-80d0-8a63-c48a0aab0539"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-16T08:39:00.000Z"
  lastEditedTime: "2026-04-09T17:37:00.000Z"
  publishedAt: "2026-04-09T17:56:40Z"
---

## Overview

LinkedIn's engineering blog post describes a comprehensive rebuild of their Feed recommendation system to better serve over 1.3 billion professionals. This case study represents a significant production deployment of LLM technology in a large-scale recommendation context, moving beyond traditional collaborative filtering and embedding approaches to leverage the semantic understanding and world knowledge inherent in large language models. The article was published in March 2026 and describes a system that has been rolled out to production.

The Feed serves as LinkedIn's primary content discovery mechanism where members engage with posts from their network, followed creators, and suggested content from the broader LinkedIn ecosystem. The challenge involves delivering personalized content at massive scale while balancing freshness, relevance, and diversity. The traditional architecture suffered from complexity stemming from multiple heterogeneous retrieval sources and ranking models that treated each impression independently, missing the temporal patterns in how professionals consume content over time.

## Business Problem and Technical Challenges

LinkedIn faced several interconnected challenges with their previous Feed architecture. The retrieval layer relied on multiple specialized sources including chronological network feeds, trending content by geography and industry, collaborative filtering based on similar users, and several embedding-based systems. Each source maintained separate infrastructure, index structures, and optimization strategies. This heterogeneity created substantial maintenance overhead and made holistic optimization difficult since each system had different biases and quality profiles.

On the ranking side, traditional models evaluated each impression independently by predicting engagement likelihood given a member and post. This approach missed fundamental patterns in how users engage with content over time. Professional interests evolve, learning journeys unfold sequentially, and current interests are best predicted by understanding trajectories rather than isolated preferences. For newer members with limited interaction history (cold-start scenarios), the traditional approach struggled to make quality recommendations quickly.

Additionally, serving at LinkedIn's scale presented economic and engineering constraints. The system must evaluate millions of posts in real-time while maintaining sub-second latency for billions of feed requests. Moving to more sophisticated models like transformers that require GPU resources raised questions about cost-per-inference viability at their scale.

## Solution Architecture: Hybrid Retrieval and Ranking

LinkedIn converged on what they describe as a "hybrid complementary relevance solution" with two primary components: unified retrieval through fine-tuned LLMs and sequential ranking via transformer-based Generative Recommender models, all efficiently utilizing their GPU fleet.

### Unified Retrieval with LLM Embeddings

The retrieval innovation centers on replacing multiple heterogeneous retrieval sources with a single system powered by LLM-generated embeddings. The key insight is that LLM embeddings can capture semantic relationships and professional context that go far beyond keyword matching or shallow collaborative filtering.

**Dual Encoder Architecture**: LinkedIn implemented a dual encoder system where a shared LLM processes both member and content (item) representations. The LLM generates embeddings for members and posts that are compared via cosine similarity. The critical advantage is that LLMs bring world knowledge from their massive pretraining corpus. For example, if a member is interested in "electrical engineering" and engages with posts about "small modular reactors," traditional systems might miss this connection. The LLM understands these topics are semantically related because it knows electrical engineers work on power grid optimization, renewable energy integration, and infrastructure challenges. This proves especially powerful for cold-start scenarios where new members have only profile information without engagement history.

**Prompt Engineering for Structured Data**: A significant engineering challenge involved converting structured data into text prompts that LLMs can process effectively. LinkedIn built a "prompt library" that transforms features into templated sequences. For posts, prompts include format, author information (name, headline, company, industry), engagement counts, article metadata, and post text. For members, prompts incorporate profile information, skills, work history, education, and crucially a chronologically ordered sequence of previously engaged posts (member engagement history).

A critical discovery involved handling numerical features like engagement counts. Initially, raw counts were passed directly (e.g., "views:12345"), resulting in poor performance with near-zero correlation (-0.004) between item popularity and embedding similarity scores. This was problematic since popularity is a strong relevance signal. LinkedIn's solution was to convert continuous numerical values into percentile buckets wrapped in special tokens, transforming "views:12345" into "<view_percentile>71</view_percentile>". This approach ensures most percentiles tokenize as one or two tokens, aligning with how tokenizers work. The correlation between popularity features and embedding similarity jumped 30x, and recall@10 improved by 15%. This same strategy was applied to other numerical features including engagement rates, recency signals, and affinity scores.

**Training Strategy**: The model was distilled and fine-tuned using millions of member-to-item pairs from Feed engagement data. Training employed InfoNCE loss with sophisticated negative sampling. Each positive member-item pair is contrasted against two types of negatives: easy negatives (randomly sampled posts not shown to the member) and hard negatives (posts that were impressed but received no engagement). Adding just two hard negatives per member improved recall by +3.6%, demonstrating the value of challenging contrastive examples.

Another important finding related to what interaction history to include. Initially, all impressed posts (both engaged and scrolled past) were included, which hurt performance and was computationally expensive since GPU compute scales quadratically with context length. Filtering to include only posts with positive engagement resulted in 37% reduction in per-sequence memory footprint, ability to process 40% more training sequences per batch, and 2.6× faster training iteration. The positives-only approach with the same context budget used less GPU memory while achieving better recall.

**Production Serving Architecture**: The system maintains three nearline pipelines running continuously. First, prompt generation captures real-time activity on LinkedIn including post creations, updates, and member activities. When posts are published or gain engagement, item prompts update to reflect new state. When members update profiles or engage with content, member prompts update to reflect evolving interests. Prompts are pushed to key-value stores for online access and sent to nearline stream processors. Second, embedding generation feeds fresh prompts through LLM inference servers running on GPU clusters. Updates are batched in configurable time windows, trading GPU efficiency against embedding freshness. For new posts, embeddings are generated in near-real time; for existing posts gaining engagement, embeddings are dynamically refreshed. Third, GPU-accelerated indexing ingests item embeddings into specialized indexes optimized for exhaustive nearest neighbor search on GPUs. When members open their Feed, the system fetches member embeddings and runs k-nearest-neighbor search against this index, retrieving top candidates in sub-50ms despite millions of posts.

This architecture achieves both sub-second retrieval latency serving thousands of queries per second and maintains embeddings fresh enough to capture trending content within minutes. The decoupling of nearline pipelines allows each stage to optimize independently for latency-throughput tradeoffs while keeping end-to-end freshness.

### Sequential Ranking with Generative Recommender

While retrieval determines which posts reach ranking, ranking determines what members actually see. LinkedIn built a Generative Recommender (GR) model that treats feed interaction history as a sequence rather than evaluating impressions independently.

**Transformer Architecture**: The GR model uses transformer architecture with causal attention, processing posts chronologically alongside actions on each post. Rich features are captured including viewer information (profile, headline, company, industry), content embeddings, engagement signals, and post metadata. Member actions (long dwells, likes, comments, shares) are embedded and interleaved with post representations, creating unified sequences capturing both what was seen and how engagement occurred.

These interleaved post-action pairs flow through multiple transformer layers with causal attention, where each position can only attend to previous positions, mimicking temporal flow. The transformer's self-attention mechanism allows the model to weigh different history parts based on relevance. Recent posts might matter more for immediate interests, but posts from weeks ago about specific technologies might suddenly become relevant if recent activity suggests renewed interest.

**Late Fusion Strategy**: After transformer layers, LinkedIn employs "late fusion" where transformer output is concatenated with per-timestep context features like device type, member profile embeddings, and aggregated count/affinity features. This fused representation is processed by a Multi-gate Mixture-of-Experts (MMoE) prediction head with shared DCNv2 experts gated per task. Because transformers already capture feature interactions through self-attention, the head's bottleneck shifts to task-specific routing with passive tasks (click, skip, long-dwell) and active tasks (like, comment, share) getting specialized gating while sharing sequential representations.

Although sequential recommenders may work without count features in some scenarios, LinkedIn found them still very effective. Count features help keep sequence length under control and effectively capture viewer affinity to other actors. Including these features in the sequence pathway would inflate computational cost without clear benefit, so fusing them after sequence processing provides both rich sequential understanding and important contextual signals.

The sequential approach is particularly valuable for understanding member trajectories. When a member engages with machine learning content on Monday, distributed systems content on Tuesday, and opens LinkedIn on Wednesday, traditional models see three independent decisions while the sequential model understands the learning journey trajectory. For newer members, every interaction immediately shapes the Feed, helping discover relevant content faster than conventional approaches.

## Production Engineering at Scale

Deploying these sophisticated models at LinkedIn's scale required substantial infrastructure innovation. The historical ranking models ran on CPUs, but transformers with self-attention scaling quadratically with sequence length and billions of parameters require high-bandwidth GPU memory.

### Training Optimizations

Training sequential models on millions of member histories, each containing hundreds or thousands of interactions, creates enormous computational demands. LinkedIn invested in several training infrastructure optimizations:

- A custom C++ data loader eliminates Python multiprocessing overhead by fusing padding, batching, and packing operations at native code level, substantially reducing training step time
- Custom CUDA kernels for multi-label AUC computation drop metric calculation from significant bottleneck to negligible overhead
- Fused optimizer implementations reduce gradient descent step time by eliminating redundant GPU synchronizations
- Parallelized evaluation across all checkpoints simultaneously rather than serially, fully utilizing GPU memory and substantially reducing pipeline time

These optimizations make the difference between "interesting research idea" and "production-grade system," enabling practical training times and rapid iteration cycles.

### Serving Optimizations

The sequential architecture presents serving challenges since processing 1,000+ historical interactions through multiple transformer layers requires substantially more computation than traditional point-wise ranking models. Meeting sub-second latency requirements demanded custom infrastructure:

- Disaggregated architecture separating CPU-bound feature processing from GPU-heavy model inference
- Shared context batching approach computing history representation once, then scoring all candidates in parallel using custom attention masks
- Custom attention kernels optimized for LinkedIn's specific use case
- PyTorch-native inference serving stack with I/O and compute optimizations through zero-copy data movement, columnar layouts, and SIMD vectorization, enabling thousands of operations per second
- GRMIS (Generative Recommender Multi-Item Scoring), a custom Flash Attention variant natively supporting their attention pattern, delivering an additional 2× speedup over PyTorch's standard scaled dot-product attention

LinkedIn emphasizes that the bottleneck is rarely the model architecture itself but rather everything around it. On the training side, they focused on optimizing scaffolding before scaling compute. On the serving side, they looked for problem-specific invariants before reaching for generic compression. The key insight is investing in infrastructure that accelerates iteration, with production efficiency coming from specialization rather than generic solutions.

## Responsible AI Considerations

Throughout the case study, LinkedIn emphasizes their commitment to responsible AI. They note that ranking models rely on professional signals and engagement patterns, never demographic attributes. The systems are regularly and rigorously audited to ensure posts from different creators compete on equal footing and that the scrolling experience is consistent across audiences. This demonstrates attention to fairness and equity as critical LLMOps concerns when deploying recommendation systems at scale.

## Results and Impact

While the post doesn't provide extensive quantitative metrics on final production performance, several intermediate results demonstrate significant improvements:

- Recall@10 improved by 15% from better numerical feature encoding
- Adding two hard negatives per member improved recall by +3.6%
- The positives-only training approach achieved 37% reduction in per-sequence memory, 40% more training sequences per batch, and 2.6× faster training iteration
- Correlation between popularity features and embedding similarity jumped 30x with percentile bucketing
- Sub-50ms retrieval latency despite searching millions of posts
- 2× speedup from custom Flash Attention variant (GRMIS)

Beyond metrics, the impact includes substantial reduction in engineering complexity by replacing multiple heterogeneous retrieval sources with a unified embedding-based approach. Teams can now iterate on retrieval quality through better prompts, training objectives, or model architectures rather than optimizing disparate systems independently. This simplification also benefits ranking since it receives coherent candidate sets all selected through semantic similarity, making ranking's job easier and optimizations more effective.

For members, the system delivers more engaging, personalized, and timely Feed experiences. Content from outside immediate networks becomes discoverable when relevant to professional interests. The Feed adapts quickly to evolving interests, feeling responsive to current mindset. Trending conversations reach members while still relevant, with new posts visible within minutes of gaining traction.

## Key LLMOps Insights

This case study offers several valuable lessons for deploying LLMs in production recommendation systems:

**LLMs for Semantic Understanding**: LLM embeddings generalize beyond observed behavior by leveraging world knowledge, proving especially critical for cold-start users and sparse content niches where collaborative filtering and keyword matching fall short.

**Prompt Engineering for Structured Data**: Converting structured features into effective prompts requires careful design. Raw numerical features tokenize poorly; converting to percentile buckets with special tokens gives models stable, learnable vocabulary for magnitude.

**Training Data Quality Over Quantity**: Hard negatives matter more than easy ones, and curated positive-only training signals beat including all impressed content. When single changes improve signal quality and reduce compute cost, gains compound multiplicatively.

**Freshness Through Decoupling**: Nearline pipelines (prompt generation, embedding inference, index updates) allow each stage to optimize independently for latency-throughput tradeoffs while keeping end-to-end systems fresh within minutes.

**Sequential Modeling for Recommendations**: Treating interactions as ordered sequences rather than independent events captures trajectory, not just preference. This is especially high-leverage for sparse users where sequential models extract more signal from fewer interactions.

**Late Fusion for Efficiency**: Not every feature benefits from full self-attention. Injecting count and affinity signals after transformers avoids quadratic cost inflation on features whose value comes from independent signal strength rather than sequential interaction.

**Infrastructure Specialization**: The bottleneck is rarely model architecture but rather surrounding infrastructure. Optimize scaffolding before scaling compute on training side. Look for problem-specific invariants before generic compression on serving side. Invest in infrastructure that accelerates iteration; production efficiency comes from specialization.

**GPU Economics at Scale**: Making sophisticated models economically viable at scale requires custom optimizations including CUDA kernels, fused operations, parallelized evaluation, disaggregated architectures, and custom attention mechanisms. These investments ensure every professional gets state-of-the-art experiences regardless of engagement level.

This comprehensive case study demonstrates LinkedIn's successful deployment of LLMs and transformers in production for large-scale content recommendation, with careful attention to both model quality and production engineering necessary to serve billions of users with sophisticated AI.
