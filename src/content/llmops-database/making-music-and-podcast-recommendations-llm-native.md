---
title: "Making Music and Podcast Recommendations LLM-Native"
slug: "making-music-and-podcast-recommendations-llm-native"
draft: false
llmopsTags:
  - "structured-output"
  - "realtime-application"
  - "embeddings"
  - "fine-tuning"
  - "instruction-tuning"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "evals"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify developed a generative personalization platform, internally called the Large Taste Model, to move beyond ranked recommendations toward interactive, explainable, and user-steerable experiences across music, podcasts, audiobooks, and other content. The system adapts open-weight LLMs to Spotify’s catalog by representing content as discrete semantic IDs, training the model through staged domain grounding and multitask instruction tuning, and using beam-search inference to generate catalog entities and explanations. Spotify reports production use across experiences such as DJ, prompted playlists, taste profiles, and podcast discovery, with approximately one in four US premium subscribers interacting with the system daily and reported gains on several recommendation surfaces; it also uses grounded LLM judges alongside human and behavioral evaluations to assess recommendation relevance and explanation quality."
link: "https://www.youtube.com/watch?v=2LRIAfng7eA"
year: 2026
seo:
  title: "Spotify: Making Music and Podcast Recommendations LLM-Native - ZenML LLMOps Database"
  description: "Spotify developed a generative personalization platform, internally called the Large Taste Model, to move beyond ranked recommendations toward interactive, explainable, and user-steerable experiences across music, podcasts, audiobooks, and other content. The system adapts open-weight LLMs to Spotify’s catalog by representing content as discrete semantic IDs, training the model through staged domain grounding and multitask instruction tuning, and using beam-search inference to generate catalog entities and explanations. Spotify reports production use across experiences such as DJ, prompted playlists, taste profiles, and podcast discovery, with approximately one in four US premium subscribers interacting with the system daily and reported gains on several recommendation surfaces; it also uses grounded LLM judges alongside human and behavioral evaluations to assess recommendation relevance and explanation quality."
  canonical: "https://www.zenml.io/llmops-database/making-music-and-podcast-recommendations-llm-native"
  ogTitle: "Spotify: Making Music and Podcast Recommendations LLM-Native - ZenML LLMOps Database"
  ogDescription: "Spotify developed a generative personalization platform, internally called the Large Taste Model, to move beyond ranked recommendations toward interactive, explainable, and user-steerable experiences across music, podcasts, audiobooks, and other content. The system adapts open-weight LLMs to Spotify’s catalog by representing content as discrete semantic IDs, training the model through staged domain grounding and multitask instruction tuning, and using beam-search inference to generate catalog entities and explanations. Spotify reports production use across experiences such as DJ, prompted playlists, taste profiles, and podcast discovery, with approximately one in four US premium subscribers interacting with the system daily and reported gains on several recommendation surfaces; it also uses grounded LLM judges alongside human and behavioral evaluations to assess recommendation relevance and explanation quality."
notion:
  pageId: "3f4f8dff-2538-8047-8c0e-e76dfc2c149c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:26:00.000Z"
  lastEditedTime: "2026-10-09T08:26:00.000Z"
  publishedAt: "2026-10-09T08:54:13Z"
---

## Overview

Spotify is applying large language models to personalization at the scale of a global audio platform with roughly 760 million monthly active users, 184 markets, and a catalog containing more than 100 million music tracks alongside podcasts, videos, and audiobooks. The operational goal is not simply to predict which catalog item a user may click or play. Spotify is moving toward “generative personalization”: a system that can reason about a user, interpret natural-language intent, select or generate a suitable experience, explain its choices, and allow the user to steer recommendations interactively.

The central platform is called the Large Taste Model. Spotify describes it as a shared system that understands historical user interactions and catalog content, combines prediction with reasoning, and supports promptable experiences. It is used in products including Spotify DJ, prompted playlists, taste profiles, podcast discovery, and an announced personal-podcast experience. Spotify reports that about one in four US premium subscribers interact with the system daily, and that deploying it on existing surfaces such as autoplay and podcast discovery produced gains. These are company-reported results rather than independently verified benchmarks, and the presentation does not provide detailed absolute lift values, experiment duration, or statistical significance.

## Problem and product shift

Spotify’s earlier personalization stack evolved from human-curated playlists into large-scale recommendation systems. Curators created playlists for particular tastes, and recommendation algorithms later learned from creation, listening, ordering, and other interaction signals. Discover Weekly, launched in 2014, is presented as an example of this earlier recommendation phase. Traditional systems generally produce a ranked list of catalog entities, leaving the product layer to construct the surrounding experience.

Generative personalization changes the target. Spotify wants the system to interpret requests such as creating a playlist for a run, finding bands playing in San Francisco that evening, or helping a listener explore a new genre. The system may need to account for multiple phases of an activity, distinguish shared-device behavior from an individual’s preferences, and communicate why a podcast or song was selected. The intended transition is from personalization as “guessing” to personalization as reasoning, and from opaque ranking pipelines to personalization that is transparent and steerable by the listener.

Examples described include DJ, where the listener can influence the direction of a personalized session; prompted playlists, where natural-language requests shape the generated playlist experience; and taste profiles, where Spotify presents an interpretable profile that users can edit. The taste-profile example also illustrates a production data problem: shared devices can create misleading signals, such as children’s Disney music being attributed to an adult listener. Users can correct the profile and express aspirations, such as learning about a new genre or language. A personal-podcast experience is intended to generate a recurring daily brief, extending the system from recommendation and orchestration into content generation.

## Catalog grounding and model architecture

A core design decision is to teach an open-weight LLM to represent Spotify catalog entities directly. Spotify starts with existing content embeddings, such as podcast-episode embeddings, and applies quantization to convert them into discrete semantic IDs. These IDs are added as special tokens to the vocabulary of an open-weight LLM, with Qwen given as an example and Llama used to validate that the training findings were not specific to one backbone.

The resulting model can receive natural language together with a user’s listening history represented through semantic IDs. It can then produce both a semantic ID corresponding to a relevant catalog item and a natural-language explanation of the recommendation. This is different from asking a general-purpose model to name content from its parametric knowledge: catalog entities are explicitly introduced into the model’s representational space, allowing generated outputs to refer to Spotify items.

Spotify describes the training method as NEO, a four-stage paradigm. The first stage, semantic foundation, constructs meaningful semantic-ID tokens and adds them to the open-weight model vocabulary. The second stage, domain grounding, aligns the semantic-ID embeddings with the original language embedding space. Spotify learns bidirectional mappings between semantic IDs and text, including combinations of the two, while freezing the pretrained LLM backbone. Only the new semantic-ID embeddings are trained at this point. Freezing the original model is intended to preserve the pretrained model’s language and world-knowledge capabilities and reduce catastrophic forgetting.

The third stage, capability induction, unfreezes the model and applies multitask instruction tuning to Spotify-specific tasks. The examples include next-item recommendation and retrieval, along with other capabilities needed by the platform. Spotify uses either full-parameter fine-tuning or LoRA fine-tuning in this phase. An optional fourth stage supports post-training methods such as reinforcement-learning fine-tuning. The staged approach separates catalog grounding from behavior learning, which gives Spotify a way to add domain representations without immediately overwriting the general language model.

## Training findings and inference operations

Spotify’s ablations indicate that multitask training did not consistently harm individual task performance. The multitask model matched or exceeded single-task variants across the evaluated tasks, with especially notable benefits for audiobook recommendation. Spotify attributes this to cross-learning from better-established content types such as podcasts, which may help with newer or colder-start catalog entities.

Removing the frozen-backbone domain-grounding stage or combining it directly with capability induction degraded performance. Replacing the pretrained backbone with a randomly initialized model produced the largest performance drop in the reported comparisons. Continuous pretraining during domain grounding caused relatively little degradation on task-specific metrics, but it effectively eliminated the pretrained model’s natural-language and world-knowledge capabilities. The frozen-backbone procedure retained those capabilities while learning the semantic IDs. The same general findings were reported with both Qwen and Llama, although the evidence described is limited to Spotify’s own ablation setup.

At inference time, Spotify evaluated beam search with and without constrained decoding and compared it with top-p sampling. The model generated valid semantic IDs 98% of the time even without constrained decoding. Constrained decoding adds latency but is useful when the system must restrict outputs to a class of content, such as new releases. Top-p sampling substantially reduced accuracy, so Spotify selected beam search despite its greater latency. This reflects a practical production tradeoff: recommendation validity and relevance were prioritized over the lower-latency or more varied behavior that sampling might provide.

## Evaluation and quality controls

Spotify argues that traditional offline recommendation metrics are insufficient for generative and explanatory systems. Interaction metrics can indicate whether users played or engaged with an item, but they do not fully establish whether the recommendation fits the user’s intent, whether the explanation is accurate, or whether the system has interpreted an ambiguous request correctly.

The company uses LLM judges, but emphasizes that these evaluators must be grounded in meaningful data rather than treated as generic authorities. For podcast recommendation evaluation, Spotify creates textual user profiles summarizing listening history and supplies them to the judge. The reported agreement between the judge and human preferences was 75%. For search evaluation, the judge can receive behavioral evidence from similar queries and the user’s previous interactions. This improved overall alignment by 5% and, for ambiguous queries, by 91% in the reported experiment.

Spotify also uses grounded LLM judges to scale Cranfield-style evaluation collections. Candidate items from multiple sources are pooled and ranked by humans, but manual ranking is expensive. After investing in grounding, Spotify reports an agreement value of 0.87 between the LLM judge and human system rankings. These results support using model-based evaluation to expand coverage, but they do not eliminate the need for human review: the quality of the judge depends on the profiles, behavioral evidence, prompts, and ranking data used to ground it. The reported metrics also do not specify all dataset sizes, confidence intervals, or how well they transfer across markets and content types.

## Production results and tradeoffs

The system is described as running in production and supporting low-latency, tool-free inference at industrial scale. Spotify reports improvements on autoplay, podcast discovery, and user interaction with DJ messages, as well as substantial online gains in podcast discovery designed to move users beyond habitual listening patterns. The presentation does not disclose the exact lift values, latency targets, infrastructure costs, failure rates, or safeguards used for incorrect recommendations and generated explanations, so the magnitude and operational economics of the gains cannot be assessed fully from the available information.

The architecture offers several production advantages. A common model can support retrieval, recommendation, explanation, and natural-language steering instead of requiring a separate narrowly designed model for each experience. Semantic IDs provide a direct interface between the LLM and the catalog, while staged training helps preserve general language abilities. Multitask training may also transfer knowledge from mature domains to newer content types. Constrained decoding gives the serving system a mechanism for enforcing output classes when validity requirements are strict.

There are corresponding risks and costs. Beam search and constrained decoding can increase serving latency, and generating semantic IDs does not by itself guarantee that an item is appropriate, available, fresh, licensed, or suitable for a particular market. Explanations require separate accuracy evaluation because a fluent rationale may not faithfully represent the actual decision process. User-editable taste profiles improve control but introduce additional state and preference-management requirements. Finally, LLM judges can make evaluation cheaper and broader, but they can also inherit biases from their grounding data or agree with human rankings for the wrong reasons. Spotify’s emphasis on behavioral grounding, human alignment, ablations, and online testing is therefore an important part of the LLMOps design, not merely an evaluation add-on.
