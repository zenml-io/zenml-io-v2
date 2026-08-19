---
title: "Building Context-Aware Consumer AI at Scale with Agentic Recommendations"
slug: "building-context-aware-consumer-ai-at-scale-with-agentic-recommendations"
draft: false
llmopsTags:
  - "question-answering"
  - "summarization"
  - "classification"
  - "content-moderation"
  - "data-analysis"
  - "structured-output"
  - "multi-modality"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "few-shot"
  - "reranking"
  - "prompt-engineering"
  - "memory"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "mcp"
  - "evals"
  - "langchain"
  - "pytorch"
  - "tensorflow"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "open-source"
  - "google-gcp"
  - "openai"
industryTags: "e-commerce"
company: "DoorDash"
summary: "DoorDash transformed their recommendation systems from legacy one-shot predictions to a sophisticated agentic platform to support multi-state shopping experiences like grocery planning. The company developed language-native consumer memory blocks to replace traditional embeddings, implemented semantic IDs (RQ-VAE) for granular catalog representation, built grounded search systems for intent understanding, and modernized ranking with LLM-generated relevance labels. These innovations enabled dramatic improvements across key metrics: 10% lift in mean reciprocal rank (MRR) from graph-based memory, 13% accuracy improvement on long-tail query intent, and 2.2% conversion rate increase from improved relevance. The system culminates in multi-turn agentic shopping assistants that leverage all these primitives, evaluated through comprehensive trajectory-based rubrics and agentic harness engineering."
link: "https://www.infoq.com/presentations/ai-agentic-recommendations-semantic-ids/"
year: 2026
seo:
  title: "DoorDash: Building Context-Aware Consumer AI at Scale with Agentic Recommendations - ZenML LLMOps Database"
  description: "DoorDash transformed their recommendation systems from legacy one-shot predictions to a sophisticated agentic platform to support multi-state shopping experiences like grocery planning. The company developed language-native consumer memory blocks to replace traditional embeddings, implemented semantic IDs (RQ-VAE) for granular catalog representation, built grounded search systems for intent understanding, and modernized ranking with LLM-generated relevance labels. These innovations enabled dramatic improvements across key metrics: 10% lift in mean reciprocal rank (MRR) from graph-based memory, 13% accuracy improvement on long-tail query intent, and 2.2% conversion rate increase from improved relevance. The system culminates in multi-turn agentic shopping assistants that leverage all these primitives, evaluated through comprehensive trajectory-based rubrics and agentic harness engineering."
  canonical: "https://www.zenml.io/llmops-database/building-context-aware-consumer-ai-at-scale-with-agentic-recommendations"
  ogTitle: "DoorDash: Building Context-Aware Consumer AI at Scale with Agentic Recommendations - ZenML LLMOps Database"
  ogDescription: "DoorDash transformed their recommendation systems from legacy one-shot predictions to a sophisticated agentic platform to support multi-state shopping experiences like grocery planning. The company developed language-native consumer memory blocks to replace traditional embeddings, implemented semantic IDs (RQ-VAE) for granular catalog representation, built grounded search systems for intent understanding, and modernized ranking with LLM-generated relevance labels. These innovations enabled dramatic improvements across key metrics: 10% lift in mean reciprocal rank (MRR) from graph-based memory, 13% accuracy improvement on long-tail query intent, and 2.2% conversion rate increase from improved relevance. The system culminates in multi-turn agentic shopping assistants that leverage all these primitives, evaluated through comprehensive trajectory-based rubrics and agentic harness engineering."
notion:
  pageId: "3c1f8dff-2538-80e3-841a-f9067f9d93fc"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:06:00.000Z"
  lastEditedTime: "2026-08-19T09:06:00.000Z"
  publishedAt: "2026-08-19T09:12:01Z"
---

## Overview

DoorDash, traditionally known as a restaurant delivery platform, has been expanding into local commerce delivery including grocery, convenience, alcohol, retail, and flowers. Sudeep Das, Head of AI for New Verticals at DoorDash, presented a comprehensive case study on how the company is transforming their ML and AI systems from traditional one-shot prediction models to sophisticated agentic recommendation platforms. The fundamental challenge is that grocery shopping, unlike restaurant ordering, involves multi-state planning, reasoning, and back-and-forth about preferences—requirements that legacy personalization systems cannot adequately address. DoorDash has built several interconnected production systems leveraging LLMs and generative AI to create context-aware shopping experiences at scale across their 55 million SKU catalog.

## Consumer Memory: Language-Native User Understanding

The first major innovation DoorDash implemented was replacing traditional numerical embeddings with language-native consumer memory representations. Traditional ML systems compress user behavior into dense vector embeddings—arrays of numbers that encode shopping and clicking history. While effective for classical ML models, these embeddings are incomprehensible to LLMs and agents that operate in natural language. DoorDash shifted to semantic, language-native snippets that describe consumers in ways that other LLMs and agents can understand and reason about.

The memory system operates across three timescales. Long-term memory captures persistent patterns like dietary preferences and brand affinities that have been learned over extended platform usage. Real-time context tracks session-specific information, such as "shopping for a party of 16 today versus normally shopping for a household of 2." Stated preferences captured during agentic conversations (like "I just got a pet") can be recorded and relegated back into long-term memory, creating a living, breathing system that also supports memory erasure when circumstances change (like recovering from an allergy).

The long-term memory is structured into well-composed, versioned memory blocks covering different aspects of consumer behavior: dietary narratives, dining patterns, brand affinities, taxonomic preferences, store preferences, and cross-cutting patterns like wine pairings. A typical memory block might state: "Strong affinity for organic produce, prefers premium brands in fresh categories. Weekly bulk shopper. For packaged goods, price range is X to Y. Average basket size is Z." These blocks are strictly versioned to enable time travel comparisons and A/B testing, which is critical because DoorDash runs prompt optimization techniques like GEPA to enhance memory blocks and needs to validate whether new versions outperform old ones.

DoorDash has implemented three primary downstream applications for these memory blocks. First, they generate personalized carousels and merchandising experiences. Importantly, this is done offline in batch mode to avoid expensive live LLM inference—blueprints are created by interrogating memory blocks, then hydrated in real-time against a Milvus vector database with rankers ordering items on the fly. This enables highly contextual experiences like automatically creating Black Friday carousels tuned to individual price sensitivities and browsing history (e.g., noise-canceling headphones at specific price points).

Second, memory blocks power agentic recommendations, where shopping agents interrogate the memory to understand preferences like "when Sudeep says chicken, it must be chicken thighs, organic, from Mary's brand." Third, and perhaps most impactfully, these memory chunks are embedded back into traditional ML layers, providing semantic understanding that didn't exist before. The system can now infer that someone interested in organic, plant-forward products might also like premium single-origin beans—moving from understanding "what" consumers buy to "why" they buy it.

DoorDash implemented asymmetric two-tower embeddings for this purpose, adding instruction text on the consumer side: "Given this consumer's preferences and brand affinities, retrieve items that match." This asymmetry teaches the model to focus not just on consumer similarity but on relevance connections between consumers and items. These memory embeddings can then be used for retrieval, generative retrieval, and as features in multitask ranking models.

Beyond flat embeddings, DoorDash built graph-based representations of memory blocks, connecting consumers to household size, cuisine preferences, taxonomies, keywords, and brands in a complex graph structure. Using GraphSAGE, a deep learning-based graph model, they added this graph understanding to their recommendation stack and observed 10% lifts in mean reciprocal rank (MRR) during A/B testing. The key insight is that memory serves as a semantic matching primitive beyond just agent context—it enables substitution understanding, cross-item preferences, and pairing recommendations, all expressible in natural language and usable across downstream models. DoorDash found that no single encoding wins; combining old-school embeddings, memory embeddings, and graph embeddings produces compounding improvements.

## Semantic IDs: Moving Beyond Random SKUs and Coarse Taxonomies

Traditional e-commerce systems rely on SKU IDs (essentially random social security numbers for items) and taxonomies (coarse hierarchical classifications). These representations fail for several critical use cases: substitution when items are out of stock, cold start for new catalog items, and training LLMs to speak the catalog natively. DoorDash adopted semantic IDs (SIDs), a technique pioneered by Google, Spotify, and YouTube, and applied it to e-commerce with their 55 million SKU catalog.

Semantic IDs are tuples of numbers (typically 3-4 integers) that encode semantic similarity. For example, Frank's RedHot cayenne pepper sauce and Sriracha might share prefixes [237, 483, X, Y], where 237 represents the coarse cluster of all sauces/condiments, 483 represents hot sauces specifically, and the final numbers differentiate Thai chili versus cayenne varieties. A barbecue sauce might be [237, 12, X, 8], where 12 differentiates it as barbecue rather than hot sauce, and 8 might indicate sweetness. Completely unrelated items like basketballs have entirely different ID sequences.

The learning process uses iterative residual quantization through RQ-VAE (Residual Quantization Variational Autoencoder). Using a geographical analogy: starting with a world map, you cluster the entire population into coarse groups (countries), calculate residuals from cluster centers, re-cluster the residuals into finer groups (states), and continue iterating down to neighborhoods, streets, and house numbers—effectively creating postal codes for items. The technical implementation uses autoencoders to learn compressed embeddings from larger LLM-generated embeddings, progressively refining through residual learning.

The impact is substantial. The "hot sauce" taxonomy node previously contained thousands of undifferentiated items. After applying semantic IDs and clustering, DoorDash discovered 327 subclusters that no human taxonomist would have time to create—bottom-up learned from how items are expressed in text. This enables highly granular substitution: when a favorite sauce is out of stock, the system can find alternatives in the immediate semantic neighborhood rather than across all hot sauces. Similarly, for personalization, the system can now understand preferences like "champagne, but only brut (dry), not sweet"—granularity impossible with taxonomy nodes alone.

DoorDash leveraged semantic IDs for query reformulation in production. When a user searches for "sriracha," the system locates sriracha in the semantic space, examines neighboring clusters, and uses an LLM to name these clusters, producing suggestions like "chili garlic sauce," "sambal oelek," and "gochujang"—all semantically related within the hot sauce family. This differs from previous approaches based purely on co-search patterns. Crucially, the suggestions are conditioned by business vertical: searching "cream" in grocery yields "heavy cream" and "full cream," while in alcohol it suggests "strawberry cream liqueur" and "peach cream liqueur," as the semantic meaning differs by context.

The system enables more granular recommendations by understanding subcategories. Previously, knowing "Sudeep likes champagne" led to recommending all champagnes. Now, understanding "Sudeep likes only brut champagne" targets the specific subcluster. DoorDash added semantic ID features to existing rankers and observed huge uplifts in personalization quality. Additional benefits include cheaper cold start (new items in the same semantic cluster can immediately target appropriate consumers) and faster retrieval (retrieving four-number tuples versus high-dimensional embeddings).

Looking forward, DoorDash is following YouTube and Spotify's approach of training small language models to natively speak these semantic IDs. Instead of asking an LLM to recommend a product name and then searching for it (a two-hop process), the model directly outputs the semantic ID (a four-number tuple) representing the recommendation. This enables the LLM to speak the catalog natively. Additionally, memory blocks are being encoded with semantic IDs, creating highly refined future recommendations that understand granular preference nuances.

## Grounded Intent Understanding: Solving Ambiguous Queries

Understanding consumer intent is critical for serving relevant results, but traditional approaches have significant limitations. Classical ML classifiers trained for intent categories suffer from winner-takes-all behavior due to softmax functions—they push all probability to a single answer even when multiple intents are valid. The example given is "wildflower" in Phoenix, Arizona, which could mean wildflower bouquets or the Wildflower Bites restaurant chain. Context matters: in San Francisco (no Wildflower restaurant), the user likely means actual flowers; in Phoenix at 8 PM, they probably mean the restaurant.

Ungrounded LLMs hallucinate on ambiguous queries. "450 North" seems like a plausible restaurant name (resembling an address), so an LLM without grounding incorrectly predicts "restaurant" when it's actually a craft ale store. "Better Chew" sounds pet-related due to "chew," leading to "pet product" predictions, but it's actually Better Chew Farms (grocery). Even humans would struggle without grounding in the actual catalog.

DoorDash's solution fuses classical and LLM approaches while grounding in reality. The system first performs semantic retrieval against the DoorDash catalog. If results are found, it extracts matching items; if the catalog search fails, it falls back to agentic web search. The LLM then reasons over the union of catalog results and web search results. For "Better Chew," semantic catalog retrieval returns "Better Chew Farms," "Chews," "Ultra Chewy," and similar items. Fuzzy refinement filters approximate nearest neighbors to keep only the best matches. For "450 North," nothing matched the catalog, triggering web search which discovered it's a hazy IPA craft brew from a brewery, correctly routing to alcohol.

The system then applies business rules, popularity priors, and historical click data in a disambiguation layer. This grounded agentic search approach can determine that "wildflower" in Phoenix at 8 PM most likely refers to the restaurant. DoorDash platformized this grounded search infrastructure, enabling it to solve other problems requiring grounded retrieval beyond just intent classification, while providing flexibility in search provider choice (not locked into Gemini). On long-tail queries—those with limited engagement history—this approach achieved a 13% improvement in intent accuracy, a substantial gain in a notoriously difficult problem space.

## Relevance Refinement: LLM-Generated Labels for Ranking and Retrieval

Search ranking systems often suffer from popularity bias and lexical matching issues. Searching "organic almond milk" might surface dairy milk at the top because it's extremely popular and "milk" lexically matches, even though it's irrelevant to the organic and almond requirements. Similarly, "almond bites" might appear due to lexical "almond" matching despite being off-intent. Only "organic almond milk" is truly relevant. This problem perpetuates because users sometimes click on tangentially related items (searching "bananas" but clicking "apples" because they needed apples too), causing systems to learn that apples are relevant for banana queries.

DoorDash defined a three-tier relevance taxonomy: exact relevant (organic almond milk for the query), moderately relevant (oat milk or other plant-based milks), and not relevant (dairy milk). The challenge was creating labeled training data at scale. Human annotation for millions of queries and billions of items would be prohibitively expensive and time-consuming. Behavioral signals (clicks) are unreliable due to the popularity bias problem.

DoorDash implemented a tiered LLM labeling approach. They started with 600,000 query-item pairs annotated by humans, which contained many mistakes. A large, expensive LLM (initially Gemini 4.0, with migration to open-source Qwen models) audited and reevaluated these annotations to create clean three-tier relevance labels. They applied a query-to-taxonomy model to handle conflicts where different taxonomy items polluted results. The refined dataset then served as a teacher to train a much cheaper student model (open-source), scaling the labeled pairs to 100 million+ with 98% two-class accuracy and 89% three-class accuracy—quality impossible to achieve through human annotation alone at this scale and cost.

With this massive labeled dataset, DoorDash trained a relevance head in their deep learning ranking model that predicts relevance labels. This head can be tuned to adjust the tradeoff between semantic relevance and engagement (popularity). For the "organic almond milk" query, the relevance head learned to demote popular but irrelevant dairy milk. The business impact was significant: conversion rate increased by 1% and gross order value (GOV) by 0.5%, which at DoorDash's scale represents substantial revenue.

DoorDash also applied the labeled data to improve retrieval using supervised contrastive loss (SupCon) and circle loss in a two-stage "Mine and Refine" approach. They mine medium and not-relevant labels, then refine in a second stage to filter out polluting results. These loss functions are specifically designed for clean separation of the three relevance tiers. Out-of-the-box large embeddings (Qwen3, multilingual-e5-large) improved NDCG (the offline retrieval quality metric) by approximately 5%. DoorDash's custom method using specialized losses achieved 17% NDCG improvement, a dramatic difference. Deploying the improved retrieval system alone yielded a 1.2% conversion rate increase. Combined with the ranking improvements, the total conversion lift from relevance refinement was 2.2%.

## Foundation Model and Agentic Infrastructure

DoorDash is working toward a unified foundation model that incorporates all these primitives: consumer semantic IDs, item semantic IDs, memory blocks, and behavioral sequences. This model learns to predict next actions from consumer behavior sequences and can be deployed across homepage, cart recommendations, search, store pages, and other surfaces. The vision is to create an internal foundation model that natively understands DoorDash's catalog and consumers at a semantic level.

The agentic shopping assistant represents the convergence of all these technologies. In a hackathon prototype progressing toward production, users can provide complex multi-turn instructions like "order groceries for the week: coffee beans, milk, chicken breast, two steaks." The agent interrogates memory blocks to determine the user's preferred grocery store (e.g., Metropolitan Market for this consumer). When the user says "chicken breast," memory blocks specify this consumer prefers a specific brand and type. Shopping sessions typically run 10-20 turns, with users refining requests ("add fruits"), adding constraints ("keep it under $25"), and the agent re-reasoning over its plan.

All the previously discussed technologies integrate seamlessly: intent understanding routes the request to the grocery agent rather than restaurant agent; memory identifies the preferred store and product specifics (decaf coffee beans); semantic IDs enable in-stock substitutions when favorite items are unavailable; improved search surfaces clean, relevant candidates for LLM reasoning. The architecture exposes agentic tools via MCP (Model Context Protocol), with session memory and agentic memory working harmoniously.

## Evaluation and Agentic Harness Engineering

Evaluating agentic systems presents unique challenges. Shopping journeys are multi-turn long trajectories where quality depends on the entire conversation flow, not isolated turns. When system changes are made (modifying tool calls, prompt engineering, etc.), rigorous A/B testing is required between configurations. DoorDash developed a multi-dimensional rubric with three key dimensions: communication (is the agent's communication helpful?), shopping execution (did it successfully satisfy the shopping mission?), and personalization (did it understand preferences like "only decaf coffee"?).

Rather than evaluating individual turns, DoorDash feeds entire transcripts—including consumer utterances, system responses, and tool calls—through a system that breaks them into different views for AI graders to assess. Critically, they found binary classification (good/bad) works far better with LLMs than graded scoring. The evaluation infrastructure includes three LLM components: user simulators (generate realistic shopping scenarios), transcript builders (create conversation logs), and rubric graders (assess quality across the three dimensions).

The most innovative aspect is agentic harness engineering. A coding agent sits outside the evaluation box, examining generated transcripts and automatically improving the system through GEPA-style optimization loops. It fixes broken tool calls, refines prompts, and iteratively enhances the agent's performance. This represents an emerging paradigm where coding agents serve as the harness that continuously improves production agentic systems based on evaluation feedback.

## Production Considerations and Tradeoffs

Throughout the presentation, several production-oriented decisions emerged. DoorDash carefully balances live LLM inference costs with offline batch processing. Carousel generation uses offline LLM blueprint creation with real-time hydration against vector databases, avoiding expensive per-user live inference. The semantic ID labeling process uses expensive LLMs (Gemini 4.0) as teachers to train cheap open-source student models (Qwen), enabling massive scale at manageable cost. Retrieval uses compact semantic ID tuples (four numbers) rather than high-dimensional embeddings for efficiency.

Versioning is pervasive: memory blocks are strictly versioned to enable time travel comparisons and A/B testing, critical for prompt optimization validation. The relevance head in ranking models is tunable, allowing operators to adjust the tradeoff between semantic relevance and engagement-driven popularity. DoorDash emphasizes that no single approach wins—combining traditional embeddings, memory embeddings, and graph embeddings produces compounding improvements, suggesting a hybrid architecture integrating classical ML with generative AI rather than wholesale replacement.

The grounded search platform demonstrates infrastructure reusability: built initially for intent understanding, it's now a platform solving multiple grounded retrieval problems while providing flexibility in LLM provider selection. The company's willingness to A/B test aggressively and report concrete business metrics (conversion rates, GOV, MRR) rather than just offline metrics reflects production maturity. The trajectory from hackathon prototype to production for the agentic assistant shows pragmatic development progression.

Overall, DoorDash's approach represents sophisticated LLMOps at scale, integrating multiple production LLM systems (memory generation, semantic ID learning, intent classification, relevance labeling, agentic assistance, automated evaluation) into a cohesive architecture that demonstrably improves business outcomes while carefully managing computational costs and evaluation rigor.
