---
title: "Hyper-Personalized Merchandising Through Hybrid LLM and Deep Learning Systems"
slug: "hyper-personalized-merchandising-through-hybrid-llm-and-deep-learning-systems"
draft: false
llmopsTags:
  - "customer-support"
  - "content-moderation"
  - "question-answering"
  - "classification"
  - "summarization"
  - "chatbot"
  - "data-analysis"
  - "structured-output"
  - "multi-modality"
  - "realtime-application"
  - "poc"
  - "rag"
  - "embeddings"
  - "fine-tuning"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "evals"
  - "reranking"
  - "langchain"
  - "llama-index"
  - "pinecone"
  - "chromadb"
  - "qdrant"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "openai"
  - "anthropic"
  - "meta"
  - "google-gcp"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash faced the challenge of personalizing experiences across a massive, diverse catalog spanning restaurants, grocery, retail, and other local commerce categories for millions of users with rapidly shifting intents. Traditional collaborative filtering and deep learning approaches could not adapt quickly enough to short-lived, high-context moments like Black Friday or individual life events. DoorDash developed a hybrid architecture that leverages LLMs for product understanding, consumer profile generation in natural language, and content blueprint creation, while maintaining traditional deep learning models for efficient last-mile ranking and retrieval. This approach enables the platform to serve dynamic, moment-aware personalization that adapts to real-time user intent while managing latency and cost constraints. The system uses GEPA optimization within DSPy for compound AI system tuning, combines offline LLM processing with online signal blending, and evaluates performance through quantitative metrics, LLM-as-judge, and human feedback."
link: "https://www.infoq.com/presentations/llm-personalization/"
year: 2026
seo:
  title: "Doordash: Hyper-Personalized Merchandising Through Hybrid LLM and Deep Learning Systems - ZenML LLMOps Database"
  description: "DoorDash faced the challenge of personalizing experiences across a massive, diverse catalog spanning restaurants, grocery, retail, and other local commerce categories for millions of users with rapidly shifting intents. Traditional collaborative filtering and deep learning approaches could not adapt quickly enough to short-lived, high-context moments like Black Friday or individual life events. DoorDash developed a hybrid architecture that leverages LLMs for product understanding, consumer profile generation in natural language, and content blueprint creation, while maintaining traditional deep learning models for efficient last-mile ranking and retrieval. This approach enables the platform to serve dynamic, moment-aware personalization that adapts to real-time user intent while managing latency and cost constraints. The system uses GEPA optimization within DSPy for compound AI system tuning, combines offline LLM processing with online signal blending, and evaluates performance through quantitative metrics, LLM-as-judge, and human feedback."
  canonical: "https://www.zenml.io/llmops-database/hyper-personalized-merchandising-through-hybrid-llm-and-deep-learning-systems"
  ogTitle: "Doordash: Hyper-Personalized Merchandising Through Hybrid LLM and Deep Learning Systems - ZenML LLMOps Database"
  ogDescription: "DoorDash faced the challenge of personalizing experiences across a massive, diverse catalog spanning restaurants, grocery, retail, and other local commerce categories for millions of users with rapidly shifting intents. Traditional collaborative filtering and deep learning approaches could not adapt quickly enough to short-lived, high-context moments like Black Friday or individual life events. DoorDash developed a hybrid architecture that leverages LLMs for product understanding, consumer profile generation in natural language, and content blueprint creation, while maintaining traditional deep learning models for efficient last-mile ranking and retrieval. This approach enables the platform to serve dynamic, moment-aware personalization that adapts to real-time user intent while managing latency and cost constraints. The system uses GEPA optimization within DSPy for compound AI system tuning, combines offline LLM processing with online signal blending, and evaluates performance through quantitative metrics, LLM-as-judge, and human feedback."
notion:
  pageId: "34df8dff-2538-8048-838f-fe557745a35e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-25T13:53:00.000Z"
  lastEditedTime: "2026-04-25T13:53:00.000Z"
  publishedAt: "2026-04-26T09:56:20Z"
---

## Overview and Business Context

DoorDash is evolving from a restaurant delivery platform into a comprehensive local commerce platform serving millions of users across restaurants, grocery, convenience, alcohol, flowers, pets, electronics, and other retail categories. This expansion created a fundamental challenge: how to help users discover relevant items across a massive, diverse catalog while adapting to rapidly shifting user intents and short-lived contextual moments. The presenters, Sudeep Das (Head of ML and AI for New Business Verticals) and Pradeep Muthukrishnan (Head of Growth for New Business Verticals), shared their journey of reimagining personalization by weaving LLMs into their existing deep learning infrastructure.

The core problem DoorDash faced was catalog abundance combined with dynamic user intent. Traditional personalization systems excel at collaborative filtering—learning that "people like you like X"—but struggle with moment-aware personalization that understands "you need X now." Classic deep learning-based recommender systems learn primarily from engagement data within the app and can take significant time to adapt to new merchant onboarding or rapid shifts in user interest during events like Black Friday or personal moments like birthdays or flu seasons.

## The Hybrid Architecture Philosophy

DoorDash's solution centers on a hybrid architecture that strategically divides responsibilities between LLMs and traditional deep learning models based on their respective strengths. The fundamental insight is that LLMs excel at tasks requiring world knowledge, generalization to new items, natural language understanding and generation, and interpreting messy behavioral patterns into coherent narratives. Traditional deep learning models, particularly two-tower embeddings and multi-task learning (MTML) rankers, remain superior for last-mile optimization under tight latency constraints, learning from engagement signals, and maximizing concrete metrics like click-through rate (CTR) and conversion rate (CVR).

This division of labor is not just a technical optimization but a principled approach to managing the tradeoffs between expressiveness, latency, and cost. The presenters emphasized that "don't throw away your deep learning models" and stressed that both paradigms need to work in unison for delivering end-to-end consumer experiences.

## Product Understanding Layer

The first pillar of the architecture is rich product understanding, which has undergone a significant transformation from human-centric to AI-driven processes. DoorDash highlighted a specific extraction task that previously took 28 days now completes in 2 days through automation. For products ranging from headphones to grocery items, the system needs to extract attributes like brand, color, form factor (over-ear vs. earbud), allergens, flavors, and whether items are noise-canceling.

The product understanding pipeline employs multiple LLM techniques. They started with vanilla LLMs which provided the "80 of the 80/20" but couldn't meet DoorDash's precision requirements, particularly for safety-critical attributes like allergens where errors could have serious health consequences. To achieve production-grade accuracy, they implemented fine-tuning on domain-specific data and grounded the LLMs using RAG (Retrieval Augmented Generation) with their ontology, taxonomy, and product catalog.

For small merchants who often provide abbreviated spreadsheets that even humans struggle to decipher, DoorDash built agentic processes that search Google, scrape merchant websites, and aggregate information from multiple sources. An LLM then reasons over this aggregated context to extract accurate product attributes. This has enabled automated onboarding of small merchants that was previously a purely human-driven bottleneck. The extracted attributes serve dual purposes: helping consumers discover products and helping Dashers (delivery drivers) identify the exact items and variants during in-store shopping.

## Consumer Profiles as Natural Language Narratives

The second pillar is deep consumer understanding through what DoorDash calls "consumer profiles." The evolution they described moves from early 2000s-era feature vectors (attempting to capture everything about user behavior in massive, ever-expanding vectors) to 2010-2015 era embeddings (more compact but still limited to in-app engagement) to current LLM-generated natural language narratives that incorporate world knowledge and provide inherent explainability.

Consumer profiles are organized into memory blocks covering dietary habits, household information, category preferences, item and brand preferences, and taxonomy preferences. These profiles are expressed in plain English, which provides several advantages. First, natural language is sufficiently expressive to capture nuanced preferences that would be difficult to encode in structured formats. Second, these profiles become explainable—the system can articulate back to users why specific recommendations are being made, which has demonstrated measurable impact on engagement. Third, profiles become shared primitives used across multiple use cases including homepage personalization, search ranking, notification targeting, and agent-based shopping assistance.

An example profile snippet for a user named Alice might read: "Alice tends to purchase last-minute electronics, but also has shown interest in premium over-ear, noise-canceling headphones like Apple AirPods Max, Bose QC Ultra, Beats, and Bowers & Wilkins." From these narratives, the system also extracts structured facets (like "electronics taste: premium" or "preferred form factor: over-ear") to enable efficient retrieval and targeting without requiring full narrative processing in latency-sensitive paths.

The profile generation and update strategy balances comprehensiveness with cost. Initial profiles are created by providing LLMs with a year's worth of user behavior including purchased items, search queries, and substitution preferences when items are unavailable. Different memory blocks are updated on different cadences based on how frequently those preferences typically change. Updates are delta-based rather than regenerating from scratch, incorporating recency weighting to emphasize recent interactions. The system avoids calling LLMs synchronously for real-time profile updates; instead, real-time intent is approximated through embeddings and batch-updated to profiles periodically.

## Hyper-Personalized Content Generation

The third major component is using LLMs to generate hyper-personalized merchandising content. Every week, for each consumer and for different use cases (both evergreen like "grocery stock-up" or "nightly snacks" and event-driven like Black Friday or back-to-school), the system asks LLMs to generate "content blueprints." These blueprints specify what carousels to show a user and how to populate them.

For example, for Alice during Black Friday, knowing her interest in premium noise-canceling headphones and recent browsing of specific models, the system generates carousel configurations focused on electronics deals with emphasis on headphones, while maintaining variety by including TVs and video games that align with her broader interests. The LLM outputs carousel themes and search queries to populate them, incorporating constraints around price sensitivity (which may vary by category—price-sensitive for electronics but not for grocery), preferred merchants, and brands.

Critically, DoorDash chose simple search as the primitive for populating carousels, which proved sufficiently expressive for their use cases while remaining tractable. The search queries can incorporate semantic constraints, lexical matching, and embedding-based retrieval. This design choice reflects a broader pattern in their architecture: finding the right level of abstraction that balances expressiveness with operational simplicity.

## Offline vs. Online Processing Strategy

A key architectural decision is the clear separation between offline and online processing. LLMs are expensive and high-latency, making them unsuitable for synchronous serving paths. DoorDash generates most personalized content offline: consumer profiles are updated on cadences ranging from daily to weekly depending on the memory block, and carousel configurations with 40-50 item ideas per consumer are pre-generated weekly.

What happens online is the real-time population of these pre-generated carousels. This must happen online because it needs to respect current inventory availability, active deals and promotions, and the user's evolved intent since carousel generation. If a user changes their delivery address, available merchants and items change. If they've been searching for TVs in the current session despite the offline system focusing on headphones, the online system needs to adapt.

The real-time adaptation layer blends long-term profiles with session-based signals. When a user opens the app, the Feed Service (orchestration layer) calls DoorDash Brain, which maintains consumer profiles and tracks evolving intent through embeddings. For homepage rendering, the system fetches pre-generated carousel configurations, then executes 10-20 embedding-based retrievals per carousel, expanding based on real-time intent signals. This might result in 20-30 total retrieval operations combining semantic search, lexical search, and embedding lookups against item-level indices.

The retrieved candidates then pass through traditional ranking models—two-tower embeddings and MTML rankers—that encode fine-grained item preferences particularly important for repeat purchase categories like grocery. This final ranking step is where deep learning's ability to optimize concrete engagement metrics under tight latency budgets proves essential. The presenters stressed that "don't let your LLMs do the last mile ranking"—LLMs should focus on content ideation while deep learning models handle precise optimization.

## Evaluation and Optimization with GEPA

Evaluating hyper-personalized systems presents unique challenges. Traditional cohort-level merchandising involved perhaps 30 use cases and 100 carousels that human reviewers could manually assess. With per-consumer personalization generating 50 unique carousels per user with different copy and items, manual evaluation becomes infeasible and "you can't just go based off vibes."

DoorDash evaluates across three axes that form the reward function for their optimization approach. First, quantitative metrics measure predicted engagement—does the carousel match what the user is likely to click on? When experiments are already running, actual online engagement data provides ground truth. Second, they employ LLM-as-judge techniques where LLMs evaluate the quality of other LLM-generated content based on rubrics. Third, and particularly valuable for their optimization approach, they collect human annotated feedback through both dedicated annotators and internal dogfooding.

The human feedback is deliberately open-ended and textual rather than just numeric scores. Reviewers might comment on specific carousels or rate overall homepage experiences, providing rich qualitative signals. This textual feedback feeds into GEPA (Genetic-Pareto optimization) within the DSPy framework. GEPA treats the compound AI system as having multiple parameters that can be optimized: prompts and templates, search term generation logic, profile generation scope (ensuring important user history isn't missed), and ranking objectives including exploration vs. exploitation balance.

Unlike traditional convex optimization, GEPA uses evolutionary biology-inspired mutations and hill climbing to navigate the parameter space. The presenters acknowledged this is fundamentally different from the tight optimization loops of traditional ML, representing a tradeoff in the emerging LLMOps landscape. The system optimizes prompts to ensure diversity (preventing a page of only headphones), adjusts search term generation to balance relevance and variety, and refines profile generation to capture important historical signals like a Bose headphone purchase six months ago.

## Agentic Systems and Future Directions

While the main presentation focused on the hybrid personalization architecture, the Q&A revealed that DoorDash is developing multiple agentic systems. Consumer-facing agents help with tasks like planning a taco night party, understanding dietary restrictions of guests, and finding appropriate products. These agents leverage the same consumer profile primitives via RAG, grounding the agent's context with personal preferences so it knows, for example, that a user prefers organic chicken thighs.

The catalog building process has become heavily agentic, automating what were previously manual spreadsheet-based workflows. In-store shopping assistance for Dashers is another area where agents help identify exact product variants in physical stores. The presenters noted that prompt optimization and RAG-based grounding techniques from their personalization work transfer directly to these agentic use cases, though they're being cautious to validate core functionality before fully embracing agentic merchandising across the entire app.

## LLMOps Patterns and Operational Lessons

Several operational patterns emerged from DoorDash's experience deploying LLMs at scale. First, they invest in shared primitives—consumer profiles, product graphs, and evaluation frameworks—that serve multiple use cases rather than building bespoke systems for each application. This approach improves cost-effectiveness and enables faster development of new features built on proven foundations.

Second, they treat the integration of LLMs and deep learning as product work, not just infrastructure work. The end-to-end consumer experience is what matters, not the technical sophistication of individual components in isolation. This product-centric view influences prioritization and success criteria.

Third, they recommend starting with real experiments that can demonstrate ROI quickly rather than launching large infrastructure projects. Building generic frameworks too early can lead to over-engineering. Instead, solve specific problems first, then extract generalizable patterns once you understand the problem space better. This iterative approach has helped them avoid common pitfalls they've observed at other companies.

Fourth, they're explicit about latency and cost constraints driving architectural decisions. LLMs stay out of the serving path for latency reasons, and batch processing is preferred wherever real-time is not strictly necessary. The careful offline/online split reflects hard-won understanding of where the costs and benefits lie.

## Technical Tradeoffs and Challenges

The case study surfaced several important tradeoffs inherent in production LLM systems. The pigeonhole effect—where recommendations create feedback loops that reinforce existing preferences—remains a challenge even with LLMs. While LLMs can leverage world knowledge to suggest adjacent categories (Thai food for someone who likes Indian and Mexican, for example), exploration strategies remain critical. The presenters acknowledged this as an underexplored area where LLMs might enable more intelligent guided exploration than classical bandit algorithms.

The cost-latency-quality triangle appears repeatedly in their design choices. Fine-tuning improves quality but increases development and maintenance costs. RAG provides grounding but adds latency. Agentic workflows that search external sources and aggregate information provide better product understanding but are more expensive. Each decision involves carefully weighing these tradeoffs against product requirements.

Evaluation complexity grows significantly with personalization granularity. Moving from cohort-level merchandising to per-consumer personalization exponentially increases the space of possible experiences, making comprehensive human evaluation impossible. The combination of quantitative metrics, LLM-as-judge, and human feedback represents a pragmatic compromise, but the presenters were transparent that this remains an evolving challenge.

The integration of real-time signals while maintaining low latency requires sophisticated engineering. Blending long-term profile narratives with session-based embeddings, performing 20-30 retrievals, and running final ranking models within acceptable latency budgets demands careful optimization. The use of embeddings to approximate real-time intent rather than calling LLMs synchronously reflects the practical constraints of production systems.

## Broader Implications for LLMOps

DoorDash's architecture illustrates a maturing pattern in LLMOps: hybrid systems that strategically combine LLMs with traditional ML rather than wholesale replacement. The division of responsibilities—LLMs for understanding, generalization, and content generation; deep learning for optimization and ranking—may represent a stable equilibrium for many applications where latency and cost matter.

The emphasis on shared primitives, particularly natural language consumer profiles that serve multiple downstream use cases, suggests that LLM-native abstractions can provide better composability than previous generations of ML systems. The explainability inherent in natural language representations provides both user-facing benefits and operational advantages for debugging and system understanding.

The evaluation challenge they face—moving from human-evaluable cohort merchandising to hyper-personalized experiences requiring LLM-as-judge and compound optimization techniques—previews challenges that other organizations will encounter as they scale personalized LLM applications. Their three-axis evaluation approach and use of GEPA for optimization represents one solution pattern, though the presenters acknowledged ongoing evolution in this space.

Finally, their recommendation to start with targeted experiments and extract generalizations later, rather than building large infrastructure projects upfront, reflects hard lessons about the pace of change in the LLM landscape. What works today may be superseded quickly, so maintaining flexibility while delivering concrete value becomes essential for sustainable LLMOps practices.
