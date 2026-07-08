---
title: "GenPage: End-to-End Generative Homepage Construction with Transformers"
slug: "genpage-end-to-end-generative-homepage-construction-with-transformers"
draft: false
llmopsTags:
  - "content-moderation"
  - "realtime-application"
  - "structured-output"
  - "reinforcement-learning"
  - "rlhf"
  - "embeddings"
  - "prompt-engineering"
  - "token-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "pytorch"
  - "tensorflow"
  - "monitoring"
industryTags: "media-entertainment"
company: "Netflix"
summary: "Netflix developed GenPage, a single generative transformer model that constructs the entire Netflix homepage autoregressively by treating user context as a prompt and generating rows and entities as a response. This approach replaces a complex multi-stage recommender pipeline with end-to-end modeling, enabling whole-page optimization through reinforcement learning. In online A/B testing against a mature production system, GenPage achieved statistically significant improvements on core user engagement metrics while reducing end-to-end serving latency by 20%, demonstrating that generative models can deliver both quality and efficiency gains in production recommender systems."
link: "https://netflixtechblog.com/genpage-towards-end-to-end-generative-homepage-construction-at-netflix-77146fba8a08"
year: 2026
seo:
  title: "Netflix: GenPage: End-to-End Generative Homepage Construction with Transformers - ZenML LLMOps Database"
  description: "Netflix developed GenPage, a single generative transformer model that constructs the entire Netflix homepage autoregressively by treating user context as a prompt and generating rows and entities as a response. This approach replaces a complex multi-stage recommender pipeline with end-to-end modeling, enabling whole-page optimization through reinforcement learning. In online A/B testing against a mature production system, GenPage achieved statistically significant improvements on core user engagement metrics while reducing end-to-end serving latency by 20%, demonstrating that generative models can deliver both quality and efficiency gains in production recommender systems."
  canonical: "https://www.zenml.io/llmops-database/genpage-end-to-end-generative-homepage-construction-with-transformers"
  ogTitle: "Netflix: GenPage: End-to-End Generative Homepage Construction with Transformers - ZenML LLMOps Database"
  ogDescription: "Netflix developed GenPage, a single generative transformer model that constructs the entire Netflix homepage autoregressively by treating user context as a prompt and generating rows and entities as a response. This approach replaces a complex multi-stage recommender pipeline with end-to-end modeling, enabling whole-page optimization through reinforcement learning. In online A/B testing against a mature production system, GenPage achieved statistically significant improvements on core user engagement metrics while reducing end-to-end serving latency by 20%, demonstrating that generative models can deliver both quality and efficiency gains in production recommender systems."
notion:
  pageId: "397f8dff-2538-8021-bffd-eb1dd8e022ed"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:57:00.000Z"
  lastEditedTime: "2026-07-08T19:57:00.000Z"
  publishedAt: "2026-07-08T20:12:46Z"
---

## Overview

Netflix's GenPage represents a fundamental rethinking of how production recommender systems can be architected by applying the LLM paradigm to homepage construction. The Netflix homepage is a complex, two-dimensional personalized layout consisting of multiple recommendation rows with entities (movies, shows, games, live events) within each row. Traditionally, this requires a multi-stage pipeline with separate components for candidate generation and ranking at both row and entity levels. GenPage collapses this entire stack into a single generative transformer that autoregressively generates the complete homepage in response to a user context prompt.

The system was published in June 2026 and represents one of the first large-scale deployments of generative transformers for structured recommendation in production. Unlike previous generative recommenders such as TIGER, HSTU, and OneRec that generate flat ranked lists, GenPage generates the full two-dimensional structure including rows, entities, and layout together. This shift was motivated by several production goals: eliminating the complexity of maintaining multiple models with misaligned objectives, enabling whole-page optimization through reinforcement learning to capture interactions between rows and entities, achieving better scaling behavior through standard transformer architectures, and gaining flexibility to support new content types and layouts without architectural redesigns.

## Data Representation and Tokenization

A critical design decision in GenPage is the use of domain-specific tokenization rather than generic text tokenizers. The system represents both user context and the generated homepage as sequences of discrete tokens. This custom tokenization approach provides two key advantages for production deployment: computational efficiency through dramatically reduced sequence length (a user action that would require 16 tokens with GPT-5 tokenizer compresses to just 4 domain-specific tokens), and product control through direct mapping between tokens and product concepts, making it straightforward to enforce business rules.

The tokenization scheme divides data into context tokens and page tokens. Context tokens encode user engagement history (action type, entity ID, timestamp, duration for events like plays, add-to-list, thumbs-up, trailer views), user profile attributes (language, profile type), and request context (time of day, day of week, device). For data sources too long to include directly, such as full impression history, the system uses summarized versions—a pragmatic compromise that the authors acknowledge still introduces a form of prompt engineering into an otherwise end-to-end pipeline.

Page tokens represent each entity and each row as a single token, with the homepage serialized in layout order (left to right, top to bottom). The vocabulary is updated daily to incorporate newly added entities and rows. This one-token-per-entity design greatly simplifies downstream tasks like constrained decoding and business rule enforcement, though it limits the ability to represent more complex multi-token entities without modifications.

For paginated recommendations, where the homepage is generated incrementally in response to user interactions, the system appends page tokens from previously generated rows to the prompt along with real-time user engagement signals, allowing the model to condition on both long-term preferences and immediate in-session behavior.

## Model Architecture and Training Recipe

GenPage uses a standard decoder-only transformer architecture, mirroring modern LLMs. One architectural detail is that input embedding and output projection weights are untied, providing flexibility to adapt to different training objectives. The training pipeline follows the LLM recipe: pretraining followed by post-training, with two alternative post-training approaches explored.

Pretraining uses next-token prediction on homepage impressions that received positive feedback in production, teaching the model the relationship between user contexts and successful homepages. Unlike LLM pretraining on raw text, this more closely resembles supervised fine-tuning with prompt-response pairs, but the authors call it pretraining because the model is trained from scratch. Recommender systems have an abundance of user feedback data, so data scarcity is not an issue. However, pretraining on production-served pages mainly teaches imitation of the existing system rather than directly optimizing reward magnitude.

For post-training, the first approach is weighted binary classification (WBC). This turns generation into token-level value prediction: given context and tokens generated so far, the model estimates the value of generating each possible next token. An internal reward system processes user feedback and assigns scalar rewards to every impressed entity (e.g., binge-watched content receives higher reward than briefly viewed content, abandoned content receives negative reward). Row-level rewards are derived by aggregating entity rewards. From each reward, a binary label is derived from its sign and a weight from its magnitude, optimizing weighted binary cross-entropy loss on the corresponding token logit. This provides clear token-level credit assignment, making it easier to optimize than page-level objectives. At inference, the model scores candidate next tokens, greedily selects the highest-value token, and repeats autoregressively.

The second post-training approach is reinforcement learning (RL), which treats page generation as sequential decision-making and directly optimizes page-level reward. This enables whole-page optimization accounting for interactions across rows and entities (diversity, stopping power, page-level constraints), test-time reasoning capabilities analogous to LLM applications, and natural support for multi-token entity representations where WBC's per-token labeling becomes ambiguous. Following the RLHF recipe from LLMs, they train a reward model (distinct from the reward system) that predicts page-level reward for generated pages without showing them to users. The RL algorithm is Dr. GRPO, a variant addressing biases in the training objective, with prompts from production user requests, policy and reference models initialized from the pretrained checkpoint, and both format rewards (business rules like row structure) and outcome rewards (predicted from the reward model). A KL penalty keeps the policy close to the pretrained checkpoint to prevent reward hacking, since the reward model is most reliable on pages similar to those the production policy generates.

## Production Challenges and Solutions

Bringing GenPage to production at Netflix scale required solving several industry-specific challenges beyond standard LLM deployment concerns.

For cold start handling with new entities lacking interaction data, the system uses two strategies. Context injection adds metadata about new or time-sensitive entities directly into context tokens, providing semantic and temporal information. Semantic embedding fusion represents each entity as a combination of its ID embedding (learned from interaction data) and a content-based embedding derived from metadata like synopses, cast, transcripts, genres, and video content. During training, entity ID tokens are randomly replaced with a generic fallback token with small probability, forcing the model to learn recommendations from content-based embeddings alone. This ensures new entities have meaningful representations in the same latent space as established entities as soon as content metadata is available, even before any user interaction data exists.

Multi-cadence incremental training addresses the conflict between the prohibitive cost of daily full retraining and the need for model freshness. The system operates on a cyclic schedule: periodic large-scale pretraining and post-training passes on broad historical windows, with daily incremental updates between these passes that continue post-training from the previous day's checkpoint using a mix of the latest day's data and sampled past data. This prevents both overfitting to recent data and catastrophic forgetting of historical patterns. New tokens (entities, rows) are initialized using fallback tokens of their type, and during training, a small percentage of known tokens are randomly replaced with fallback tokens to teach graceful handling of unknowns.

Enforcing business rules is critical for production deployment. Netflix homepages must satisfy structural constraints (organized as a list of rows) and product logic (deduplication, row pinning, category consistency like ensuring Comedy row entities are comedies). While training signals can encourage rule adherence, they cannot guarantee it. The system enforces rules at inference time through constrained decoding: at each generation step, a mask of eligible tokens is computed based on applicable business rules and applied to output logits, allowing only compliant tokens. The custom tokenization where each entity and row is a single token makes this straightforward, avoiding the complex multi-token bookkeeping required for constrained decoding over text vocabularies.

Hybrid row decoding balances inference efficiency with contextual conditioning. While autoregressive generation ensures each token conditions on full preceding context, generating every entity token one at a time is expensive. The system leverages homepage structure by autoregressively generating only the first few entities in each row (which receive most user attention and strongly shape perceived quality), then obtaining logits for all eligible entities in a single forward pass and selecting top-scoring remaining entities, subject to business-rule constraints. This preserves autoregressive conditioning where it matters most while avoiding latency and cost of token-by-token decoding for entire long rows.

## Experimental Results and Insights

The offline experiments yielded several important insights for LLMOps practitioners. Pretraining via next-token prediction before WBC post-training provided substantial improvements across loss reduction, row AUC lift, and entity AUC lift metrics. While the absolute numbers appear small, they represent significant improvements in the production regime—an Entity AUC lift from 0.91 to 0.92 means misranking rate drops from 9% to 8%, a magnitude rarely observed from single changes on mature systems.

Model scaling experiments showed both pretraining and WBC post-training losses decrease in power-law fashion as model size scales from ~120M to ~900M parameters, mirroring LLM scaling trends and confirming the generative approach scales favorably with capacity. However, the most striking finding came from comparing model scaling with context enrichment. While scaling from 120M to 900M parameters reduced WBC loss by roughly 1.3%, progressively enriching the user context through adding new data sources and refining tokenization reduced loss by approximately 6.9%. In several cases, a single well-designed context addition delivered larger improvement than the entire ~7.5× model capacity scaling. This suggests that in their current regime, personalization quality is bottlenecked first by information and representation available to the model rather than capacity, with context enrichment dominating until saturation before model capacity becomes the primary driver.

RL post-training experiments showed the policy consistently improved page-level reward over the pretrained checkpoint, and interestingly, homepage diversity (measured via pairwise embedding distance among entities) also increased despite not being part of the RL objective. This suggests the RL-trained policy optimizes the page holistically rather than myopically optimizing each token in isolation, providing evidence for the value of page-level optimization.

## Online A/B Testing and Production Impact

The online A/B test represented a rigorous evaluation against Netflix's mature, highly optimized multi-stage production homepage recommender. GenPage decoded over existing production row and entity candidate sets to help handle business rules. Multiple GenPage variants differing in training-data configurations all delivered statistically significant improvements (p < 0.001) on the core user engagement metric used for launch decisions, with the robustness across configurations suggesting the gain stems from the fundamental approach rather than specific tuning choices.

Contrary to common assumptions about generative model latency, GenPage reduced end-to-end serving latency by 20% compared to baseline. This came from replacing multiple ranking stages and heavy feature computation with a single transformer on raw tokenized inputs, eliminating substantial serving complexity and computational overhead. Custom tokenization and hybrid row decoding further reduced decoding steps. The authors note this 20% reduction was achieved without exhausting available optimizations, providing headroom that can be reinvested in capacity or richer prompts.

The system also demonstrated strong responsiveness to in-session signals, with latest in-session actions quickly influencing subsequent recommendations and fading back to long-term preferences after a day or two. This emerges naturally from the generative formulation without the extensive manual feature engineering used in the production stack.

However, the deployment revealed unintended shifts in the distribution of impressed entity categories (new vs. established titles, TV shows vs. movies). The authors view these shifts as not necessarily negative but warranting investigation. They hypothesize this reflects GenPage personalizing more precisely than the production stack, consistent with increased homepage impression efficiency (users engaging with fewer impressions). This sharper personalization appears to surface components like the reward system that aren't yet fully aligned with the new generative paradigm, highlighting the importance of holistic system alignment when introducing fundamentally new architectures.

## LLMOps Lessons and Future Directions

From an LLMOps perspective, GenPage demonstrates several important principles for deploying generative models in production recommender systems. The shift from text tokenizers to domain-specific tokenization shows how adapting core LLM techniques to domain requirements can unlock both efficiency and control benefits critical for production deployment. The multi-cadence incremental training strategy provides a practical template for keeping large models fresh at industry scale without prohibitive retraining costs.

The constrained decoding approach illustrates how custom tokenization enables elegant enforcement of business rules that would be complex or intractable with generic text vocabularies. The hybrid row decoding strategy shows how understanding the structure of the problem domain allows intelligent trade-offs between full autoregressive conditioning and inference efficiency.

The comparison between model scaling and context enrichment offers an important lesson: before investing heavily in model capacity, ensure the model has access to rich, well-represented information. The finding that prompt enrichment dominated capacity scaling in their regime suggests many production systems may be information-bottlenecked before they are capacity-bottlenecked.

The authors acknowledge several limitations and future directions. Long context still relies on handcrafted summarization rather than end-to-end learning to compress long data sources. Broader LLM capabilities like language understanding, multimodality, and reasoning have not yet been incorporated, though they suggest hybrid tokenization combining domain-specific tokens with generic text tokens could bridge this gap while retaining structured control. The vision is that many advances from the LLM ecosystem will transfer naturally to recommender systems, with the boundary between LLMs and recommenders increasingly blurring. GenPage represents an early but substantial step toward simpler recommender systems that align more directly with user satisfaction through end-to-end generative modeling.
