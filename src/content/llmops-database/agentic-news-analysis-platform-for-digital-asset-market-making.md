---
title: "Agentic News Analysis Platform for Digital Asset Market Making"
slug: "agentic-news-analysis-platform-for-digital-asset-market-making"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6936bb195f0ec74a277d76e0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:34:56.710Z"
  createdOn: "2025-12-08T11:48:41.224Z"
llmopsTags:
  - "fraud-detection"
  - "classification"
  - "realtime-application"
  - "high-stakes-application"
  - "unstructured-data"
  - "embeddings"
  - "prompt-engineering"
  - "fine-tuning"
  - "semantic-search"
  - "latency-optimization"
  - "cost-optimization"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "model-optimization"
  - "vllm"
  - "postgresql"
  - "elasticsearch"
  - "serverless"
  - "databases"
  - "monitoring"
  - "scaling"
  - "cache"
  - "amazon-aws"
  - "anthropic"
industryTags: "finance"
company: "FSI"
summary: "Digital asset market makers face the challenge of rapidly analyzing news events and social media posts to adjust trading strategies within seconds to avoid adverse selection and inventory risk. Traditional dictionary-based and statistical machine learning approaches proved too slow or required extensive labeled data. The solution involved building an agentic LLM-based platform on AWS that processes streaming news in near real-time, using fine-tuned embeddings for deduplication, reasoning models for sentiment analysis and impact assessment, and optimized inference infrastructure. Through progressive optimization from SageMaker JumpStart to VLLM to SGLNG, the team achieved 180 output tokens per second, enabling end-to-end latency under 10 seconds and doubling news processing capacity compared to initial deployment."
link: "https://www.youtube.com/watch?v=TCJPcVhlQns"
year: 2025
seo:
  title: "FSI: Agentic News Analysis Platform for Digital Asset Market Making - ZenML LLMOps Database"
  description: "Digital asset market makers face the challenge of rapidly analyzing news events and social media posts to adjust trading strategies within seconds to avoid adverse selection and inventory risk. Traditional dictionary-based and statistical machine learning approaches proved too slow or required extensive labeled data. The solution involved building an agentic LLM-based platform on AWS that processes streaming news in near real-time, using fine-tuned embeddings for deduplication, reasoning models for sentiment analysis and impact assessment, and optimized inference infrastructure. Through progressive optimization from SageMaker JumpStart to VLLM to SGLNG, the team achieved 180 output tokens per second, enabling end-to-end latency under 10 seconds and doubling news processing capacity compared to initial deployment."
  canonical: "https://www.zenml.io/llmops-database/agentic-news-analysis-platform-for-digital-asset-market-making"
  ogTitle: "FSI: Agentic News Analysis Platform for Digital Asset Market Making - ZenML LLMOps Database"
  ogDescription: "Digital asset market makers face the challenge of rapidly analyzing news events and social media posts to adjust trading strategies within seconds to avoid adverse selection and inventory risk. Traditional dictionary-based and statistical machine learning approaches proved too slow or required extensive labeled data. The solution involved building an agentic LLM-based platform on AWS that processes streaming news in near real-time, using fine-tuned embeddings for deduplication, reasoning models for sentiment analysis and impact assessment, and optimized inference infrastructure. Through progressive optimization from SageMaker JumpStart to VLLM to SGLNG, the team achieved 180 output tokens per second, enabling end-to-end latency under 10 seconds and doubling news processing capacity compared to initial deployment."
---

## Overview

This case study presents the development and deployment of an agentic news analysis platform for digital asset market makers, delivered as a presentation by David (AWS Solutions Architect) and Wes (independent researcher in digital asset market microstructure). The use case addresses a critical operational challenge in cryptocurrency market making: the need to rapidly interpret and react to market-moving news and social media posts within extremely tight time windows, often just seconds to minutes.

Market makers in digital assets face unique volatility challenges compared to traditional finance. They must maintain bid and ask orders to provide liquidity while managing inventory risk. When unexpected news breaks—such as Federal Reserve announcements, regulatory changes, or influential social media posts from figures like Elon Musk or Donald Trump—market makers need to quickly adjust their spreads to avoid adverse selection where only one side of their orders gets executed, forcing them to buy high and sell low. The challenge is particularly acute in crypto markets where news can be informal, ambiguous, and published across dozens of channels simultaneously.

## The Problem Domain

The presentation establishes the business context through a detailed explanation of market making operations. Market makers quote both buy and sell orders to ensure liquidity in exchanges, profiting from the spread between bid and ask prices. Their ideal scenario involves high-frequency, low-spread trading where both sides execute rapidly. However, they face significant risk when volatility spikes unexpectedly—if the market moves sharply upward, all their ask orders might get taken while bid orders remain unfilled, leaving them with depleted inventory that must be replenished at higher prices.

The challenge with news interpretation in digital assets is multifaceted. Unlike traditional financial announcements (such as FOMC meetings) which occur at scheduled times with numeric outcomes that are straightforward to interpret, cryptocurrency markets are heavily influenced by unpredictable social media activity. A tweet from Elon Musk mentioning "dogs" can send Dogecoin prices surging within minutes. These posts require contextual interpretation—they're not numeric, they're often ambiguous, and they appear without warning across multiple platforms. The presentation cites research from IG Group indicating that Trump's market-moving tweets typically impact markets for about 30 minutes, establishing the critical time window for response.

Manual human judgment is too slow for algorithmic trading systems that operate at millisecond speeds. The solution requires automated interpretation that can handle linguistic nuance, assess market impact, and generate actionable recommendations within seconds.

## Evolution of Technical Approaches

The case study traces the industry evolution through three generations of sentiment analysis techniques, providing context for why LLM-based approaches became necessary:

**Dictionary-based approaches** used industry sentiment lexicons with words like "bearish," "bullish," and "crash" in simple pattern matching algorithms. These failed to handle context—for example, "Massive Short liquidation event" would be incorrectly classified as negative when it actually signals positive market sentiment (short sellers being forced to buy, driving prices up).

**Statistical machine learning approaches** using models like Naive Bayes or FinBERT (BERT fine-tuned on financial corpora) with supervised learning on labeled datasets offered better generalization and context understanding. However, these required massive amounts of labeled training data, resulting in high costs and slow time-to-market for new model iterations.

**Large language model approaches** using transformer-based multimodal reasoning models enable context-aware analysis with minimal or zero fine-tuning. Models like Claude (referenced as "clock" in the transcript) and DeepSeek can reason about domain-specific events—such as whether a protocol exploit has cross-chain impact—without extensive retraining. This foundation enables the agentic architecture approach.

## Inference Optimization Journey

A critical component of the LLMOps implementation was the progressive optimization of inference performance. The presentation details a clear timeline of improvements from February to August 2025:

**February 2025 (Initial Deployment):** Using SageMaker JumpStart on P5EN instances, the team achieved 80 output tokens per second. This was deemed insufficient for the use case requirements.

**April 2025 (VLLM Integration):** Replacing the initial setup with VLLM enabled several optimizations including draft multi-token predictions, mixed precision, linear attention mechanisms, and distributed parallelism. This boosted performance to 140 output tokens per second—a 75% improvement but still not meeting targets.

**August 2025 (SGLNG Deployment):** The final migration to SGLNG with speculative decoding achieved 180 output tokens per second, representing a 125% improvement over the baseline. This optimization was critical because at 10,000 events per minute, every millisecond of inference latency compounds across the pipeline. Doubling throughput from 80 to 180 tokens per second meant the system could process twice as much news within the same time window, ultimately enabling end-to-end latency under 10 seconds—fast enough to act before adverse selection occurs.

The presentation emphasizes that these infrastructure optimizations were foundational to making the agentic approach viable in production. Without achieving sub-10-second latency, the entire system would be operationally irrelevant for its intended use case.

## System Architecture

The day-one production architecture demonstrates a comprehensive LLMOps pipeline built on AWS services:

**Ingestion Layer:** News streams are ingested via news streaming APIs and written directly to S3 buckets. S3 events trigger AWS Lambda functions that orchestrate the processing pipeline.

**Classification and Analysis:** Lambda functions invoke the DeepSeek model to perform classification across three dimensions: asset (which cryptocurrency is affected), urgency (how quickly action is needed), and sentiment (positive/negative market impact). These classifications along with other metadata are stored in both Aurora PostgreSQL (for structured storage and querying) and OpenSearch (for similarity search and retrieval).

**User Interface:** A CLI interface enables traders and business analysts to interact with the news corpus, querying the LLM (Claude) about recent events, such as "What has Trump announced in the last 10 hours?" or "What is Elon Musk saying on X recently?" This provides context and exploratory analysis capabilities beyond automated alerts.

## Deduplication Pipeline

The presentation highlights a subtle but critical challenge in crypto news processing: the same news item gets reported across 50+ sources—Twitter, Reddit, Discord, Telegram—within minutes. For example, "Ethereum upgrade delayed" appears simultaneously across all these channels. Processing every duplicate through the expensive LLM reasoning model would waste both money and time, degrading latency and burning unnecessary tokens.

To address this, the team implemented a sophisticated deduplication pipeline with the following stages:

**Embedding Calculation:** Lambda functions call the BGE-M3 embedding model to generate vector representations of incoming news articles.

**Similarity Check:** Embeddings are compared against recent news using cosine similarity. If similarity exceeds 0.75, the item is classified as a duplicate and inserted into a dedicated duplicates collection in OpenSearch, stopping further processing to avoid wasting LLM tokens.

**Unique Verification:** Items with similarity below 0.5 are considered likely unique and undergo further checking against the historical news corpus stored in OpenSearch to ensure they haven't appeared before in a slightly different form.

**Analysis and Prediction:** Only truly unique news items proceed to the expensive LLM-based analysis stage, where the system generates near real-time predictions including spread widening recommendations, asset impact assessments, and price movement probability estimates.

**Alert Generation:** Prediction reports are generated and sent to trader desk Slack channels, enabling human decision-makers to act on the recommendations.

## Embedding Model Fine-Tuning

The presentation provides compelling visual evidence of the importance of fine-tuning embedding models for domain-specific tasks. Generic embedding models perform poorly at crypto-specific duplicate detection because they lack the domain knowledge to recognize that different phrasings of the same cryptocurrency event are semantically identical.

The team created a dataset of thousands of query-document pairs from crypto news, labeled as either duplicates (positive pairs, shown as green dots in scatter plots) or non-duplicates (negative pairs, shown as red). They evaluated embedding quality by plotting similarity scores:

**Out-of-the-box BGE-M3** showed massive overlap between 0.5 and 0.75 similarity scores—a "muddy middle" where it was impossible to reliably distinguish duplicates from unique content. Green dots (duplicates that should score high) and red dots (non-duplicates that should score low) were intermixed.

**Fine-tuned BGE-M3** on the labeled crypto news dataset achieved clean separation, with green dots clustering above 0.6 and red dots below 0.3, eliminating the ambiguous middle zone. This fine-tuning used a relatively small model (560 million parameters) and required only thousands of labeled examples rather than millions.

This illustrates a key architectural principle articulated in the presentation: in agentic architectures, you fine-tune the specialized, smaller embedding models for specific tasks like deduplication, while using general reasoning models (like Claude or DeepSeek) with prompt engineering alone, avoiding costly LLM fine-tuning. This division of labor is more cost-effective and faster to deploy.

## Live Demonstration

The presentation includes a live demo showing the system processing real news streams. The interface displays two panels: the left shows incoming news being streamed and analyzed, while the right shows the trader desk Slack channel where alerts appear.

In the demo, the first news item—an SEC filing—is analyzed by the reasoning model and classified as routine regulatory paperwork with no market-moving information, so no alert is sent to traders. The system continues ingesting and analyzing news, filtering out routine items.

When a potentially impactful item appears—a message about Trump making hostile comments about China published on Telegram—the system immediately identifies it as high-impact news and sends an alert to the trader desk Slack channel. This enables traders to make decisions about whether to increase spreads to protect their portfolio from adverse selection.

The demo illustrates the human-in-the-loop approach: the system doesn't automatically execute trades but instead provides rapid, intelligent filtering and analysis to surface only actionable intelligence to human decision-makers who retain ultimate control.

## Agentic Architecture Principles

The presentation articulates several key principles of their agentic LLMOps approach that distinguish it from traditional machine learning pipelines:

**Hierarchical Task Decomposition:** Use general reasoning models like Claude for high-level decision-making and task orchestration, while specialized models (like fine-tuned embeddings) handle specific subtasks. This enables the system to reason about novel events it hasn't seen before rather than just matching patterns.

**Cost-Effective Specialization:** Fine-tune small, specialized models (like 560M parameter embedding models) for narrow tasks, while using large general models with prompt engineering alone. This avoids the expense and time required to fine-tune large language models.

**Bias Elimination Through Architecture:** Rather than trying to debias training data, teach the system how to reason about novel events through prompt engineering and architectural design. This enables the system to handle unprecedented situations—like a new type of social media influencer or a novel regulatory announcement—without retraining.

**Human-in-the-Loop as Non-Negotiable:** Despite automation, human oversight remains essential. However, the system enables 24/7 real-time coverage by handling the high-volume filtering and analysis, surfacing only actionable intelligence to humans. Trader feedback loops enable continuous system improvement over time without requiring model retraining for every iteration.

## Critical Assessment

While the case study presents impressive technical achievements, several aspects warrant balanced consideration:

**Performance Claims:** The inference optimization journey from 80 to 180 tokens per second represents genuine engineering achievement, but the presentation doesn't specify the model size, context length, or batch size used in these benchmarks. Different configurations could significantly impact these numbers, and without those details, it's difficult to assess whether similar performance is achievable in other contexts.

**End-to-End Latency:** The claim of "under 10 seconds" end-to-end latency is presented as the key threshold for avoiding adverse selection, but this seems relatively slow for algorithmic trading contexts where microseconds often matter. The presentation doesn't clarify whether this 10-second window is from news publication to alert delivery, or from alert delivery to trade execution. In highly competitive markets, even a 10-second delay might be too slow if other market participants react faster.

**Fine-Tuning Results:** The scatter plots showing improved embedding performance after fine-tuning are compelling, but the presentation doesn't provide quantitative metrics like precision, recall, or F1 scores at specific similarity thresholds. The visual improvement is clear, but operational metrics would help assess real-world performance.

**Deduplication Complexity:** The three-stage deduplication pipeline adds significant architectural complexity. While it addresses a real problem (avoiding redundant LLM calls), the presentation doesn't discuss the computational cost of embedding generation itself, or whether simpler approaches like content hashing or fuzzy matching were considered first.

**Model Selection:** The presentation mentions using DeepSeek for classification and Claude (referred to as "clock" in the transcript) for reasoning, but doesn't explain the rationale for using different models for different tasks, or whether this multi-model approach was benchmarked against single-model alternatives.

**Human-in-the-Loop Friction:** While the presentation emphasizes human-in-the-loop as "non-negotiable," it doesn't address the practical challenge of human decision-makers responding within the tight time windows discussed. If Trump's tweets impact markets for 30 minutes, and the system takes 10 seconds to alert, that leaves 20 minutes for a human to read, interpret, and act—which may be insufficient in fast-moving markets.

**Generalization Claims:** The presentation suggests the agentic architecture enables reasoning about "novel events" without retraining, but this capability depends heavily on prompt engineering quality and the reasoning model's inherent capabilities. The degree to which this actually works for truly unprecedented events (beyond the model's training data) remains somewhat uncertain.

## Production Deployment Considerations

The case study demonstrates several production LLMOps best practices:

**Infrastructure Evolution:** The willingness to replace infrastructure components (SageMaker JumpStart → VLLM → SGLNG) based on performance benchmarks shows pragmatic engineering rather than commitment to specific technologies. Each migration delivered measurable improvements aligned with business requirements.

**Layered Storage Strategy:** Using both Aurora PostgreSQL and OpenSearch for different access patterns (structured queries vs. similarity search) shows thoughtful data architecture rather than forcing everything into a single database.

**Event-Driven Architecture:** Using S3 event triggers and Lambda functions enables scalable, serverless processing that can handle variable news volumes without over-provisioning infrastructure.

**Observability:** The demo interface showing real-time processing with classification decisions visible suggests the system includes observability for monitoring and debugging, though details aren't provided.

**Iterative Deployment:** The timeline from February to August 2025 showing progressive optimization suggests an iterative deployment approach rather than attempting to achieve perfect performance before launch.

## Conclusion

This case study demonstrates a sophisticated implementation of LLMs in a production financial trading context with genuine technical depth. The combination of inference optimization, fine-tuned embeddings for deduplication, reasoning models for sentiment analysis, and human-in-the-loop design addresses real operational challenges in digital asset market making. The architectural principle of using specialized small models for narrow tasks while reserving large reasoning models for high-level decisions appears to be a sound and cost-effective approach.

However, the presentation's promotional context (an AWS conference talk) suggests some caution in accepting all claims at face value. The lack of detailed performance metrics, operational results, or comparative benchmarks makes it difficult to assess how much of the claimed performance advantage derives from the agentic architecture itself versus other factors like infrastructure choices or market-specific characteristics. Nevertheless, the technical approach, optimization journey, and architectural principles provide valuable insights for practitioners building LLM systems for time-sensitive, high-stakes production environments.