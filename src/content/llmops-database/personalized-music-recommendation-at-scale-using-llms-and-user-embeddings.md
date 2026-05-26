---
title: "Personalized Music Recommendation at Scale Using LLMs and User Embeddings"
slug: "personalized-music-recommendation-at-scale-using-llms-and-user-embeddings"
draft: false
llmopsTags:
  - "embeddings"
  - "fine-tuning"
  - "instruction-tuning"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "pytorch"
  - "open-source"
  - "scalability"
  - "meta"
  - "google-gcp"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify faced the challenge of transitioning from traditional siloed recommendation systems to a unified, steerable LLM-based approach that could serve 750 million users across a catalog of 100+ million tracks and millions of podcasts. The solution involved building foundational user embeddings using transformer models that compress user interaction history into vectors, developing semantic IDs to tokenize catalog content for LLM training, and creating soft tokens by projecting user embeddings into the LLM token space. This approach enabled personalized, steerable recommendations with natural language interaction capabilities through features like AI DJ, prompted playlists, and taste profiles. Early results showed positive metrics, with the system already deployed in production for podcast recommendations and expanding across other verticals."
link: "https://www.youtube.com/watch?v=5YSJEP0HWzM"
year: 2026
seo:
  title: "Spotify: Personalized Music Recommendation at Scale Using LLMs and User Embeddings - ZenML LLMOps Database"
  description: "Spotify faced the challenge of transitioning from traditional siloed recommendation systems to a unified, steerable LLM-based approach that could serve 750 million users across a catalog of 100+ million tracks and millions of podcasts. The solution involved building foundational user embeddings using transformer models that compress user interaction history into vectors, developing semantic IDs to tokenize catalog content for LLM training, and creating soft tokens by projecting user embeddings into the LLM token space. This approach enabled personalized, steerable recommendations with natural language interaction capabilities through features like AI DJ, prompted playlists, and taste profiles. Early results showed positive metrics, with the system already deployed in production for podcast recommendations and expanding across other verticals."
  canonical: "https://www.zenml.io/llmops-database/personalized-music-recommendation-at-scale-using-llms-and-user-embeddings"
  ogTitle: "Spotify: Personalized Music Recommendation at Scale Using LLMs and User Embeddings - ZenML LLMOps Database"
  ogDescription: "Spotify faced the challenge of transitioning from traditional siloed recommendation systems to a unified, steerable LLM-based approach that could serve 750 million users across a catalog of 100+ million tracks and millions of podcasts. The solution involved building foundational user embeddings using transformer models that compress user interaction history into vectors, developing semantic IDs to tokenize catalog content for LLM training, and creating soft tokens by projecting user embeddings into the LLM token space. This approach enabled personalized, steerable recommendations with natural language interaction capabilities through features like AI DJ, prompted playlists, and taste profiles. Early results showed positive metrics, with the system already deployed in production for podcast recommendations and expanding across other verticals."
notion:
  pageId: "365f8dff-2538-80c0-922f-df6b9d815341"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-19T13:31:00.000Z"
  lastEditedTime: "2026-05-19T13:31:00.000Z"
  publishedAt: "2026-05-19T13:35:29Z"
---

## Overview and Context

Spotify has undertaken a significant transformation in how they approach personalized recommendations by integrating LLMs into their production systems. The company operates at massive scale with approximately 750 million users across 184 markets, a catalog of over 100 million tracks, around 400,000 audiobooks, and millions of podcasts and video episodes. The technical challenge lies in how to leverage this enormous amount of user interaction data and content to build recommendations that are both accurate and steerable through natural language.

The presentation comes from the tech lead of the user representations team within Spotify's AI Foundation organization, which builds frontier foundational models used across the entire recommendation stack. Historically, Spotify has been using machine learning for recommendations since at least the mid-2010s, with products like Discover Weekly launching around 2015. However, they have been moving away from traditional recommendation systems toward a more unified LLM-based approach that offers users greater steerability and natural language interaction capabilities.

## The Traditional Recommendation System Architecture

The traditional recommendation system architecture that Spotify has been moving away from consists of a multi-stage pipeline. This begins with a massive catalog of millions of items, followed by candidate generation that reduces this to a few hundred candidates, and then ranking stages that further narrow down to the final recommendations. Different product teams maintained their own models for different surfaces like home shelf ranking, personalized playlists, search, podcasts, and ads. This siloed approach meant that some models were better than others, had different features, and lacked a unified approach to understanding users and content.

## Foundational User Modeling in Production

The first pillar of Spotify's LLM-based approach is foundational user modeling. The user representations team generates embeddings for over a billion users daily, representing not just monthly active users but the broader user base. This is characterized as a massive and expensive pipeline that runs continuously.

Spotify has evolved from generalized user representations using autoencoder models to transformer-based sequential models. The earlier autoencoder approach would compress all user features into a small vector and then reconstruct those features, with the compression-decompression process teaching the model to represent user interactions. This approach was fairly standard in the machine learning community and aligned with techniques used in NLP and computer vision.

The shift to transformer-based models represents a fundamental change in how user context is handled. The user's interaction history is treated as part of the prompt or context, similar to how context is used in traditional LLM applications. This context includes not just past interactions but also request context such as the query, product surface, and the item being recommended. By training transformers over the data of hundreds of millions of users, Spotify achieves cross-content modeling that embeds users, tracks, and episodes in the same embedding space.

The visualization shared demonstrates how users are positioned on a hypersphere alongside content, allowing the model to understand neighborhoods of related content and users. For example, one engineer's embedding was positioned very close to a technology podcast because their listening habits reflected interest in keeping up with the tech industry and companies like Anthropic. The model learns to create these semantically meaningful spaces where user vectors exist alongside content vectors, with different colors representing tracks versus episodes versus users.

## Catalog Understanding Through Semantic IDs

The second major pillar involves teaching LLMs about Spotify's catalog through a technique called semantic IDs. This approach was influenced by research from Google on YouTube recommendations and represents a critical innovation for making LLMs work effectively in recommendation contexts.

The challenge is that while Spotify has its own knowledge about content through trained vectors representing songs, artists, podcasts, and episodes, they also want to leverage world knowledge from open-weight LLMs like Llama or Qwen. Semantic IDs provide the bridge between these two knowledge sources. The technique works by taking a high-dimensional vector representing a piece of content and tokenizing it into a small number of tokens, typically four to six. This compression allows the LLM to be trained to understand these tokens in the same way it understands word tokens.

The tokenization is hierarchical in nature. For example, both Ariana Grande and Bruno Mars might share the first two semantic ID tokens because they are both pop artists, but their remaining tokens differ to capture their unique characteristics. This hierarchical structure allows the model to autoregressively generate the next artist, song, or episode a user might listen to, just as language models generate the next word in a sequence.

The continual pre-training or post-training process involves teaching the LLM to speak the language of semantic IDs using Spotify's interaction data. The training data includes user context such as demographic information, listening history tokenized into semantic IDs, and the target prediction of what the user listens to next. By converting Spotify URIs into semantic IDs, the model learns to attend to these tokens and predict future listening behavior.

One acknowledged challenge with this approach is catastrophic forgetting, where the model may lose some of its original capabilities during fine-tuning. However, Spotify has found that these models effectively combine world knowledge with platform-specific knowledge to create holistically useful recommendations.

## Personalization Through Soft Token Projection

The third pillar addresses a fundamental limitation: while the LLM can be trained on semantic IDs and understand content relationships, it cannot be trained on all 750 million plus users individually. Some level of collaborative filtering is needed where the model generalizes across users, but personalization remains critical.

Spotify's solution is to project user embeddings into the LLM's token space, creating what are called soft tokens. This technique takes the user representation vector generated by the foundational user modeling pipeline and projects it into a form that the LLM can consume as if it were a token in the prompt. The soft token is contextually unique for each user and gets inserted into the prompt when generating recommendations.

This approach allows the model to maintain personalization at scale without requiring individual training for each user. When the model generates a recommendation, it has access to the user-specific soft token that encodes that user's taste and listening history, enabling truly personalized outputs even though the underlying LLM was trained on aggregate patterns.

## Production Deployments and Products

Spotify has deployed this LLM-based recommendation approach across multiple production features. The AI DJ allows users to interact in natural language and receive personalized recommendations. Prompted playlists enable users to describe what they want in natural language, and the system generates custom playlists, with recent expansions to support podcasts as well.

The taste profile feature represents a particularly interesting LLMOps implementation. This feature exposes what Spotify knows about a user in text form and allows users to provide feedback, edit preferences, or indicate content they want more or less of. This user feedback is fed back into the generative model to improve personalization over time. The taste profile was initially launched in select markets with plans to expand throughout the year.

For podcast recommendations specifically, the next episode recommendation system is already fully productionized using this approach. Users receiving podcast recommendations are interacting with the LLM-based system in production, demonstrating that this is not merely experimental work but a deployed solution handling real traffic.

## LLMOps Challenges and Considerations

From an LLMOps perspective, several significant challenges emerge from this case study. The scale of generating embeddings for over a billion users daily represents a substantial computational and operational challenge. The pipeline is described as very expensive, indicating significant infrastructure requirements.

The daily batch processing requirement for user embeddings suggests a complex orchestration system that must reliably complete within time windows to keep user representations fresh. The integration of multiple model types—user embedding models, semantic ID tokenizers, and LLMs—requires careful versioning and dependency management to ensure consistency across the recommendation stack.

The continual pre-training approach for adapting open-weight LLMs with Spotify's data requires infrastructure for supervised fine-tuning and continual pre-training at scale. Managing catastrophic forgetting and monitoring model quality across these training runs adds operational complexity.

The soft token projection mechanism introduces another component that must be maintained and versioned appropriately. Changes to user embedding models would potentially require retraining or recalibrating the projection layers to ensure soft tokens remain meaningful in the LLM's token space.

## Evaluation and Metrics

The presentation mentions positive results on internal metrics for the LLM-based recommendation system, though specific metrics are not detailed. Given the scale and user base, even small improvements in engagement metrics would translate to significant business impact. The fact that the system is deployed in production for podcast recommendations suggests it has passed whatever quality bars Spotify maintains for production systems.

The evaluation challenge for recommendation systems enhanced with LLMs is particularly complex because traditional recommendation metrics may not fully capture the benefits of steerability and natural language interaction. User satisfaction with features like prompted playlists or the AI DJ requires different evaluation approaches than traditional click-through or listen-through rates.

## Architectural Trade-offs and Balanced Assessment

While the presentation naturally emphasizes the benefits of this approach, several trade-offs deserve consideration. The move to a unified model architecture from siloed team-specific models represents a significant organizational and technical challenge. Teams must coordinate around a shared infrastructure rather than optimizing their own models independently, which can slow iteration in some contexts even as it improves consistency.

The computational expense of generating user embeddings daily for a billion users is substantial and represents an ongoing operational cost. Traditional recommendation systems with simpler feature engineering might be more cost-effective even if less sophisticated. The business case must justify these infrastructure costs through improved user engagement and retention.

The semantic ID approach, while innovative, introduces complexity in debugging and interpretability. When a recommendation is wrong, understanding whether the issue lies in the user embedding, semantic ID tokenization, LLM training, or soft token projection requires sophisticated tooling and expertise. This contrasts with more traditional systems where feature attribution might be more straightforward.

The catastrophic forgetting issue with continual pre-training is acknowledged but not deeply explored. Managing the trade-off between adapting to Spotify-specific knowledge and retaining general world knowledge requires careful monitoring and potentially regular retraining from base models, adding to operational complexity.

The system's reliance on open-weight models like Llama provides flexibility and control compared to API-based approaches but requires Spotify to maintain expertise in LLM training, fine-tuning, and deployment. This represents a significant investment in specialized talent and infrastructure.

## Innovation and Industry Context

Spotify's approach represents a sophisticated integration of multiple modern ML techniques—transformer-based user modeling, semantic tokenization of content, and soft token personalization—into a cohesive production system. The hierarchical nature of semantic IDs is particularly elegant, allowing the model to learn both broad categories and specific nuances in an autoregressive framework.

The taste profile feature that allows users to see and influence what Spotify knows about them addresses growing concerns about transparency and user control in recommendation systems. The ability to feed user corrections back into the model creates a feedback loop that could improve personalization while respecting user agency.

The scale at which this operates—750 million users, 100+ million tracks, millions of podcasts—makes this one of the larger LLM-based recommendation deployments publicly discussed. The daily batch processing of embeddings at this scale presents engineering challenges that most organizations will not face.

## Conclusion on LLMOps Maturity

This case study demonstrates a mature approach to LLMOps for recommendation systems. The integration spans multiple model types and training paradigms, from unsupervised user embedding generation to continual pre-training of LLMs with domain-specific knowledge. The deployment across multiple production features with real user traffic shows this is not experimental but a core part of Spotify's infrastructure.

The team's willingness to discuss trade-offs like catastrophic forgetting and the acknowledged expense of the pipeline suggests a realistic understanding of the challenges involved. The focus on steerability and natural language interaction represents a bet that the future of recommendations involves more user agency and conversational interfaces rather than purely algorithmic curation.

From an LLMOps perspective, this represents a complex, multi-model system requiring careful orchestration, versioning, monitoring, and evaluation. The success in production demonstrates that such complexity can be managed at scale when there is sufficient business justification and engineering investment.
