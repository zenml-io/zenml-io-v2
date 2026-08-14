---
title: "Deep Research News Analysis Platform with Synthetic Data and Vector Search"
slug: "deep-research-news-analysis-platform-with-synthetic-data-and-vector-search"
draft: false
llmopsTags:
  - "question-answering"
  - "content-moderation"
  - "classification"
  - "summarization"
  - "fraud-detection"
  - "data-analysis"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "few-shot"
  - "reranking"
  - "token-optimization"
  - "error-handling"
  - "cost-optimization"
  - "qdrant"
  - "kubernetes"
  - "docker"
  - "scaling"
  - "databases"
  - "open-source"
  - "documentation"
  - "monitoring"
  - "microservices"
  - "orchestration"
  - "elasticsearch"
  - "spacy"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "hugging-face"
industryTags: "media-entertainment"
company: "AskNews"
summary: "AskNews built a production deep research system for news analysis that addresses the limitations of raw web scraping approaches used by competitors. The company processes 500,000 documents per day, converting raw news articles into grounded synthetic data that preserves context while removing journalistic narrative voice. Using Qdrant vector database with hybrid search, datetime indexing, and distributed deployment, they serve thousands of queries per minute across 200 million documents. The system demonstrates measurable superiority in external validation through Metaculus forecasting tournaments, where AskNews-powered bots consistently outperform those using Perplexity, Exa, and Gemini for real-world predictions."
link: "https://www.youtube.com/watch?v=mhsXLO5ZN8I"
year: 2026
seo:
  title: "AskNews: Deep Research News Analysis Platform with Synthetic Data and Vector Search - ZenML LLMOps Database"
  description: "AskNews built a production deep research system for news analysis that addresses the limitations of raw web scraping approaches used by competitors. The company processes 500,000 documents per day, converting raw news articles into grounded synthetic data that preserves context while removing journalistic narrative voice. Using Qdrant vector database with hybrid search, datetime indexing, and distributed deployment, they serve thousands of queries per minute across 200 million documents. The system demonstrates measurable superiority in external validation through Metaculus forecasting tournaments, where AskNews-powered bots consistently outperform those using Perplexity, Exa, and Gemini for real-world predictions."
  canonical: "https://www.zenml.io/llmops-database/deep-research-news-analysis-platform-with-synthetic-data-and-vector-search"
  ogTitle: "AskNews: Deep Research News Analysis Platform with Synthetic Data and Vector Search - ZenML LLMOps Database"
  ogDescription: "AskNews built a production deep research system for news analysis that addresses the limitations of raw web scraping approaches used by competitors. The company processes 500,000 documents per day, converting raw news articles into grounded synthetic data that preserves context while removing journalistic narrative voice. Using Qdrant vector database with hybrid search, datetime indexing, and distributed deployment, they serve thousands of queries per minute across 200 million documents. The system demonstrates measurable superiority in external validation through Metaculus forecasting tournaments, where AskNews-powered bots consistently outperform those using Perplexity, Exa, and Gemini for real-world predictions."
notion:
  pageId: "3b8f8dff-2538-80ca-8dc8-c78b4d68b092"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:08:00.000Z"
  lastEditedTime: "2026-08-10T15:08:00.000Z"
  publishedAt: "2026-08-10T15:24:06Z"
---

AskNews is a startup with a six-person team that has built a production-scale news analysis system leveraging LLMs and sophisticated information retrieval. The company positions itself as addressing fundamental problems with existing deep research tools from Claude, OpenAI, Gemini, DeepSeek, and Perplexity, which they characterize as producing unreliable outputs based on unlicensed web scraping.

## Overview and Problem Statement

The core product is what they call a "news sleuth" system that enables deep research capabilities over news content. The team describes deep research as essentially an iterative while loop: query the system, retrieve results, reason over them, build a new query, and repeat. While acknowledging this isn't fundamentally novel technology, they argue that execution quality depends heavily on document enrichment, search refinement, and metadata tagging to make the loop efficient and return answers quickly to users.

The company's critique of existing solutions centers on trustworthiness. They argue that systems blindly scraping HTML from the web without proper metadata tagging or provenance tracking produce unreliable outputs. The presentation uses the analogy of an intern blindly gathering information, asking whether you would trust a 100-page report from such a source. Their philosophy emphasizes building the foundation first before the visible interface.

## Synthetic Data Architecture

The core technical innovation is what they call "grounded synthetic news data." AskNews takes original news articles and removes the narrative voice, journalistic style, and original phrasing while preserving the context that LLMs need for reasoning, forecasting, and decision-making. The context they prioritize includes the classic journalism framework: who, what, why, where, and when. This translates to entities like people and organizations, temporal information like publish dates, location data including geocoordinates, and motivations.

The synthetic approach serves multiple purposes. For publishers, it protects intellectual property by stripping away the original expression that has value for LLM training, which is particularly relevant given lawsuits like the New York Times case against OpenAI. For AI developers, the synthetic representation is actually preferable because it's token-optimized and removes the problematic elements of raw HTML like ellipses, which the presenters suggest act as hallucination seeds. They characterize raw HTML as token-intense, poorly labeled, biased, and legally uncertain, while their synthetic data is trusted, token-optimized, enriched with extra context, and LLM-ready.

The company has signed over 1,000 publishers, including major outlets like Associated Press and Agence France-Presse. Their business model involves paying publishers for their content while providing a monetization path that doesn't require managing thousands of individual licenses with developers. This creates a sustainable data ecosystem that allows journalists to continue reporting from places like Gaza while developers access structured, licensed content without maintaining brittle HTML scrapers.

## Vector Database Evolution with Qdrant

A substantial portion of the presentation focuses on AskNews's evolution alongside Qdrant vector database over approximately two to three years. The company emphasizes that as a startup without massive Silicon Valley funding, having access to Qdrant's full feature set as it evolved was critical to their success.

Their journey through Qdrant versions illustrates increasingly sophisticated capabilities:

The initial deployment used sparse vectors and quantization, which they note worked effectively in production. As Qdrant evolved, they added multiple vectors of different types, enabling hybrid search across one, two, three, four, or even ten vectors. The presenters highlight this as a distinctive capability not easily found in other databases. Datetime indexing was added as a core component of context engineering for news analysis, enabling temporal filtering that's essential for news relevance.

Later versions brought phrase matching and keyword indexing, with the ability to store data on disk rather than entirely in RAM, which they explicitly note was important given their resource constraints as a startup. The metadata indexing capabilities grew substantially, enabling what they describe as true context engineering and deep research loops that produce trustworthy decisions.

At the scale of processing and upserting 500,000 documents per day while serving thousands of queries per minute, they needed distributed deployment, which became available in Qdrant version 1.7.4. The presentation expresses gratitude to the Qdrant team for making these features available.

## Production Query Flow and Performance

The practical query flow demonstrates the system's capabilities. A user might ask about measures to secure TikTok's algorithm under US management. The system formulates a search across 200 million documents using time filters, keywords, sparse and dense embeddings for hybrid search, and additional constraints like reporting voice, sentiment, and bias detection.

The goal is retrieving only 0.001% of the database with high relevance in under a second, which they characterize as "pretty awesome." The retrieved documents are highly enriched data structures that can be read and reasoned over. The system then responds if the loop is complete or continues iterating as needed.

They provide an interactive dashboard with a share link for public exploration, calling the interaction with news information "pretty magical" and noting they don't believe it was possible 14 to 15 months ago. Analysts use the system for tracking geopolitical shifts in Ukraine, the Israel-Gaza conflict, political changes across the Americas, financial trends, and technology evolution. The presenters emphasize that this requires excellent filtering and high-relevance retrieval.

## Beyond News: Wikipedia Integration

The company recently open-sourced a natural language index for Wikipedia built on Qdrant, timed to coincide with this presentation. They note that while an Elasticsearch solution exists, it doesn't provide the semantic search quality needed for natural language agent interaction.

They chunked eight million Wikipedia articles into 40 million chunks with careful structural considerations. Specifically, they structured the data in Qdrant to enable retrieval of neighboring chunks, reasoning that if you find the most relevant chunk, the surrounding context in neighboring chunks likely contains important related information. This structured approach with direct links is what they've prepared for users. The system runs on a laptop, which they find remarkable, and is available as a snapshot for download.

## Entity Extraction and Metadata Generation

Entity extraction is described as critical, particularly doing it in a balanced and diversified way. They released a Hugging Face model for this purpose that became one of the most downloaded models in the past year. The system extracts entities across 200 million documents and connects relationships between them. Understanding Trump's relationships to all co-occurring entities across potentially hundreds of documents exemplifies the context engineering that produces strong news analysis.

## Bias Detection and Model Analysis

The company has developed capabilities for understanding bias in both news sources and LLMs themselves. They conducted an analysis of DeepSeek's raw weights to determine if the model exhibits inherent bias toward the Chinese party. Their data scientist Ellen led this work, which concluded that the raw weights actually show Western bias, contrary to narratives suggesting Chinese government influence. The analysis found that DeepSeek discusses Tiananmen Square in an objective Western manner. They emphasize this is analysis of the raw weights, not the chat interface served through Chinese servers. The presenters stress the importance of understanding these distinctions rather than accepting prevailing narratives.

## External Validation and Performance Metrics

AskNews provides external validation through Metaculus, a forecasting platform where both humans and bots compete in quarterly tournaments with real money at stake. They've tracked performance for 12 months, and every quarter shows the same pattern: bots powered by AskNews and Qdrant win by successfully predicting real-time events, while bots using Perplexity and Exa perform poorly, and Gemini-powered bots rank at the bottom.

The company attributes this performance gap to their competitors' reliance on raw web scraping that dumps ellipses and other problematic content as hallucination seeds into context windows while costing more money. Over multiple tournaments, adoption grew as word spread, with only a few bots using AskNews in the first tournament but many more in recent competitions. This represents validation they don't control, which they emphasize as particularly meaningful.

## Infrastructure and Deployment

The system runs on Kubernetes, which they discussed in detail in a previous presentation with Demetrios from Vector Space on YouTube approximately two years ago. That earlier presentation covered the engineering architecture and Qdrant's role within their Kubernetes environment. The current production system handles massive scale: 500,000 document upserts per day and thousands of queries per minute across 200 million documents in a distributed Qdrant deployment.

## Critical Assessment

While the presentation makes compelling technical claims, several elements warrant balanced consideration. The company is clearly promoting their product and business model, so performance claims should be viewed accordingly. The Metaculus validation is interesting and represents external measurement, though the specific bot implementations and whether they use identical underlying models isn't fully detailed. The characterization of competitors as producing "trash" and "spew" is marketing rhetoric, though the underlying point about provenance and structured data has technical merit.

The synthetic data approach is genuinely interesting from both technical and legal perspectives, though the effectiveness claims would benefit from more detailed ablation studies. The publisher relationship model addresses real concerns about content licensing and sustainability, though the scalability and economic viability of paying 1,000+ publishers while serving developers remains to be proven long-term.

The technical architecture leveraging Qdrant's features appears sound and represents thoughtful use of modern vector database capabilities. The emphasis on metadata, temporal indexing, and hybrid search reflects solid information retrieval principles. The Wikipedia contribution as open source adds credibility and community value beyond their commercial product.

The bias analysis of DeepSeek is intriguing but represents a single study from a company with commercial interests in data quality narratives. Independent replication would strengthen these findings. Overall, the case study represents a serious production LLM application with measurable external validation, though as with any vendor presentation, claims should be balanced against the promotional context.
