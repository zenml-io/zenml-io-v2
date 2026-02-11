---
title: "Automated News Analysis and Bias Detection Platform"
slug: "automated-news-analysis-and-bias-detection-platform"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68135e944935ae183e125da4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:06:54.522Z"
  createdOn: "2025-05-01T11:44:20.502Z"
llmopsTags:
  - "question-answering"
  - "translation"
  - "content-moderation"
  - "classification"
  - "regulatory-compliance"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "error-handling"
  - "chunking"
  - "langchain"
  - "fastapi"
  - "elasticsearch"
  - "redis"
  - "open-source"
  - "meta"
  - "openai"
industryTags: "media-entertainment"
company: "AskNews"
summary: "AskNews developed a news analysis platform that processes 500,000 articles daily across multiple languages, using LLMs to extract facts, analyze bias, and identify contradictions between sources. The system employs edge computing with open-source models like Llama for cost-effective processing, builds knowledge graphs for complex querying, and provides programmatic APIs for automated news analysis. The platform helps users understand global perspectives on news topics while maintaining journalistic standards and transparency."
link: "https://www.youtube.com/watch?v=sPkeUlBR9RY"
year: 2024
seo:
  title: "AskNews: Automated News Analysis and Bias Detection Platform - ZenML LLMOps Database"
  description: "AskNews developed a news analysis platform that processes 500,000 articles daily across multiple languages, using LLMs to extract facts, analyze bias, and identify contradictions between sources. The system employs edge computing with open-source models like Llama for cost-effective processing, builds knowledge graphs for complex querying, and provides programmatic APIs for automated news analysis. The platform helps users understand global perspectives on news topics while maintaining journalistic standards and transparency."
  canonical: "https://www.zenml.io/llmops-database/automated-news-analysis-and-bias-detection-platform"
  ogTitle: "AskNews: Automated News Analysis and Bias Detection Platform - ZenML LLMOps Database"
  ogDescription: "AskNews developed a news analysis platform that processes 500,000 articles daily across multiple languages, using LLMs to extract facts, analyze bias, and identify contradictions between sources. The system employs edge computing with open-source models like Llama for cost-effective processing, builds knowledge graphs for complex querying, and provides programmatic APIs for automated news analysis. The platform helps users understand global perspectives on news topics while maintaining journalistic standards and transparency."
---

## Overview

AskNews is a news intelligence platform developed by Emergent Methods, founded by Robert Caulk, who has an academic background in computational mechanics and machine learning. The platform represents a compelling case study in applying LLMs to the challenge of news analysis at scale, with a particular focus on reducing bias, enhancing diversity of perspectives, and making global news accessible across language barriers.

The company was founded in the wake of ChatGPT's emergence, with the explicit goal of leveraging new AI capabilities to solve long-standing problems in news consumption and analysis. Caulk brings both technical expertise and a personal connection to journalism—his father was an editor at the Rocky Mountain News for 20 years—which informs the platform's emphasis on journalistic standards and ethics.

## Technical Architecture and LLM Operations

### Edge Processing with Open-Source Models

One of the most distinctive aspects of AskNews's architecture is their use of edge computing with open-source LLMs. Rather than routing all processing through cloud-based APIs like OpenAI, they deploy models like Llama 2 and Llama 3.1 at the "edge"—meaning the point where articles are ingested. This architectural decision has several important implications for their LLMOps strategy:

- **Cost efficiency**: Running inference through OpenAI for 500,000 articles daily would be prohibitively expensive. By using open-source models, they can process at scale without per-token costs.
- **Transparency and auditability**: Open-source models allow them to demonstrate that their entity extraction and bias detection is itself unbiased, which is crucial for their credibility as a news platform.
- **Model upgradeability**: Caulk describes how they "rise with the tide" as open-source models improve, having migrated from Llama 2 to Llama 3.1, with plans to adopt future versions.

### Metadata Extraction Pipeline

At the edge, their LLMs perform structured extraction on each article to capture:

- Key people and entities mentioned
- Important facts and claims
- Locations (with geocoordinates assigned)
- Source origin (which is noted as surprisingly difficult since sources don't always explicitly state their country of origin)
- Attribution and evidence chains
- Whether statements are allegations versus verified facts
- Reporting voice (sensational vs. objective)
- Subjective vs. factual content

This metadata extraction transforms unstructured news articles into structured data that can be queried, filtered, and compared. The ability to distinguish between facts, analysis, and opinion within articles is a key differentiator from traditional news aggregation.

### Embedding and Clustering

After enrichment, articles are converted to embeddings—vector representations of their semantic content. With 500,000 articles processed daily, this creates a massive vector space that enables:

- Semantic similarity comparisons between articles
- Automatic clustering of articles about the same topics/events
- Identification of related coverage across languages and sources

The clustering approach groups semantically similar articles together (e.g., all coverage of "Russia-Ukraine" or "Israel-Palestine" into topic clusters), which then enables cross-source analysis within each cluster.

### Knowledge Graph Construction

Beyond simple clustering, AskNews builds a knowledge graph by extracting relationships between entities. This graph captures connections like "person X has relationship Y with organization Z" across all ingested articles. The graph serves as the foundation for their "graph chat" capability in the News Plunker analyst tool, where users can query not just individual articles but the interconnected web of entities and relationships across global news coverage.

### Tiered LLM Usage

The architecture employs a tiered approach to LLM usage that balances cost, capability, and transparency:

- **Open-source models at the edge**: Handle the high-volume extraction and enrichment tasks
- **Higher-capability models for synthesis**: For complex queries that require reasoning across hundreds of sources, they leverage more powerful (potentially closed-source) models like GPT-4

This hybrid approach acknowledges that while transparency is paramount for the data processing layer, users may want to use different models for their analytical queries.

## Diversity Enforcement and Bias Handling

A core philosophical principle of AskNews is what Caulk calls "algorithmic enforcement of diversity." This is not about demographic diversity but rather ensuring that news synthesis includes perspectives from multiple countries, languages, and political orientations. Within each topic cluster, they actively sample from different source countries—France, Russia, Ukraine, Mexico, etc.—to ensure the meta-narrative isn't dominated by any single perspective.

Importantly, the platform deliberately avoids pre-labeling sources with political leanings (unlike competitors such as Ground News). Caulk argues that labeling Fox News as "right-leaning" a priori prevents users from recognizing when that outlet might produce a balanced report. Instead, bias is detected at the article level based on the content itself—its reporting voice, use of sensational language, and subjective framing.

The platform even includes sources like RT (Russian state media), not because it's reliable, but because transparency about what different sources are claiming is itself valuable. Often, these sources surface in the "contradictions" analysis, showing where they diverge from other coverage.

## Product Interfaces and Use Cases

### AskNews.app
The consumer-facing interface allows users to query global news and receive synthesized summaries with citations back to original sources. Users can explore topics, identify contradictions between sources, and "talk to the news" through natural language queries.

### News Plunker
An analyst-focused tool that allows users to:

- Build custom knowledge graphs focused on specific topics
- Query those graphs through "graph chat"
- Access licensed content (from paid content partnerships)
- Create custom alerts with natural language specifications

### Programmatic API
Partners like the University of Texas Autonomy Lab use the API to align and detect misinformation. Their system takes Reddit posts and queries AskNews to find diversified sources related to the claim, enabling assessment of whether the post aligns with or contradicts established reporting.

### Real-World Customers

Key customer segments include:

- **Security risk analysts**: Companies like Riley Risk use the platform for global security monitoring, providing feedback that drives feature development like customizable alerts
- **Forecasters**: The Metaculus prediction platform uses AskNews to help resolve forecasts by fact-checking whether predicted events have occurred
- **Journalists**: For research, story discovery, and identifying contradictions that might indicate newsworthy angles
- **"News geeks"**: Individual users who want an algorithmically-enforced diverse perspective rather than relying on single outlets

## Multilingual Processing

Approximately 60% of AskNews's processing is devoted to non-English languages. The platform maintains a transparency dashboard showing real-time statistics on language distribution and source coverage. This multilingual capability is presented as a major differentiator, as it allows analysts to access distilled information from sources they couldn't otherwise read.

The translation process is viewed as a form of transformation that adds value while also potentially addressing some copyright concerns—translated and distilled content, often reduced to single sentences per article, is distinct from simply republishing original content.

## Copyright and Licensing Approach

AskNews navigates the contentious copyright landscape through several mechanisms:

- **Citation as core practice**: Every piece of surfaced information links back to original sources, encouraging click-through rather than replacement
- **Licensed content tier**: The paid analyst tool includes licensed sources, with revenue shared back to publishers
- **Transformation argument**: Translation, distillation, and synthesis transform original content sufficiently that it constitutes fair use in many interpretations
- **Open web focus**: Primary content comes from openly accessible sources

## Transparency and Trust

The platform embeds transparency at multiple levels:

- Open-source models that can be audited
- A transparency dashboard showing real-time processing statistics
- Clear citation of sources for all synthesized content
- No hidden editorial decisions—the synthesis is algorithmic, with human editors only ensuring journalistic standards

## Future Development

Upcoming features include natural language alerts that can be customized and shared to WhatsApp or Telegram groups—particularly valuable for NGOs monitoring fast-moving crises who need immediate, translated, and distilled updates pushed to their coordination channels.

## Validation and Results

An interesting validation moment came during the 2024 US presidential election, when AskNews's bot predicted a Trump victory based on signals about underestimated Republican turnout, while Caulk personally expected a Democratic win based on mainstream media consumption. The bot's correct prediction demonstrated the value of algorithmically-enforced diversity in cutting through potentially biased reporting.

The company operates with a team of approximately 5 people but claims to function at the level of a 20-person company due to AI augmentation of their own workflows—a practical demonstration of the productivity gains possible when AI is deeply integrated into operations.