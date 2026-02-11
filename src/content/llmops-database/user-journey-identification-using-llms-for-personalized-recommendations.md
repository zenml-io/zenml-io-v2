---
title: "User Journey Identification Using LLMs for Personalized Recommendations"
slug: "user-journey-identification-using-llms-for-personalized-recommendations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69009f16287a891652a24309"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:22:10.138Z"
  createdOn: "2025-10-28T10:46:46.470Z"
llmopsTags:
  - "content-moderation"
  - "classification"
  - "summarization"
  - "question-answering"
  - "embeddings"
  - "prompt-engineering"
  - "fine-tuning"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "pytorch"
  - "langchain"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "openai"
  - "meta"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest sought to evolve from a simple content recommendation platform to an inspiration-to-realization platform by understanding users' underlying, long-term goals through identifying \"user journeys\" - sequences of interactions centered on particular interests and intents. To address the challenge of limited training data, Pinterest built a hybrid system that dynamically extracts keywords from user activities, performs hierarchical clustering to identify journey candidates, and then applies specialized models for journey ranking, stage prediction, naming, and expansion. The team leveraged pretrained foundation models and increasingly incorporated LLMs for tasks like journey naming, expansion, and relevance evaluation. Initial experiments with journey-aware notifications demonstrated substantial improvements, including an 88% higher email click rate and 32% higher push open rate compared to interest-based notifications, along with a 23% increase in positive user feedback."
link: "https://medium.com/pinterest-engineering/identify-user-journeys-at-pinterest-b517f6275b42"
year: 2025
seo:
  title: "Pinterest: User Journey Identification Using LLMs for Personalized Recommendations - ZenML LLMOps Database"
  description: "Pinterest sought to evolve from a simple content recommendation platform to an inspiration-to-realization platform by understanding users' underlying, long-term goals through identifying \"user journeys\" - sequences of interactions centered on particular interests and intents. To address the challenge of limited training data, Pinterest built a hybrid system that dynamically extracts keywords from user activities, performs hierarchical clustering to identify journey candidates, and then applies specialized models for journey ranking, stage prediction, naming, and expansion. The team leveraged pretrained foundation models and increasingly incorporated LLMs for tasks like journey naming, expansion, and relevance evaluation. Initial experiments with journey-aware notifications demonstrated substantial improvements, including an 88% higher email click rate and 32% higher push open rate compared to interest-based notifications, along with a 23% increase in positive user feedback."
  canonical: "https://www.zenml.io/llmops-database/user-journey-identification-using-llms-for-personalized-recommendations"
  ogTitle: "Pinterest: User Journey Identification Using LLMs for Personalized Recommendations - ZenML LLMOps Database"
  ogDescription: "Pinterest sought to evolve from a simple content recommendation platform to an inspiration-to-realization platform by understanding users' underlying, long-term goals through identifying \"user journeys\" - sequences of interactions centered on particular interests and intents. To address the challenge of limited training data, Pinterest built a hybrid system that dynamically extracts keywords from user activities, performs hierarchical clustering to identify journey candidates, and then applies specialized models for journey ranking, stage prediction, naming, and expansion. The team leveraged pretrained foundation models and increasingly incorporated LLMs for tasks like journey naming, expansion, and relevance evaluation. Initial experiments with journey-aware notifications demonstrated substantial improvements, including an 88% higher email click rate and 32% higher push open rate compared to interest-based notifications, along with a 23% increase in positive user feedback."
---

## Overview

Pinterest Engineering developed a sophisticated user journey identification system that represents a compelling case study in practical LLMOps deployment. The initiative aimed to transform Pinterest from a simple content discovery platform into an "inspiration-to-realization" platform by understanding not just users' immediate interests but their underlying, long-term goals. The system defines a "journey" as the intersection of a user's interests, intent, and context at a specific point in time, with examples including planning a wedding, renovating a home, or learning a new skill. Users can have multiple, sometimes overlapping journeys occurring simultaneously.

The technical challenge was particularly interesting because Pinterest was building a new product category without substantial training data, which shaped their entire engineering philosophy and approach to LLMOps. Rather than attempting to build everything from scratch, the team adopted a pragmatic, incremental strategy that balanced the power of modern LLMs with the constraints of a production environment serving hundreds of millions of users.

## System Design Philosophy and Constraints

Pinterest's approach to this LLMOps challenge was guided by several key principles that reflect real-world constraints often faced in production ML systems. The team explicitly acknowledged they were building without large amounts of training data, which led to four core tenets: being lean by minimizing new component development where no data exists, starting small with only a few hundred human-annotated examples, leveraging pretrained foundation models like their existing SearchSage for keyword embeddings to maximize cost efficiency, and designing for extensibility to support more complex models as data collection scales.

This philosophy is particularly notable because it represents a pragmatic middle ground between traditional ML approaches and pure LLM-based solutions. The team made an architectural decision early on to choose dynamic keyword extraction over a predefined journey taxonomy. While a fixed taxonomy would offer consistency, they recognized it would risk overlapping with existing systems, require significant maintenance, and be slow to adapt to emerging trends. The dynamic approach offered greater flexibility, personalization, and adaptability while leveraging existing infrastructure.

## Core Architecture and Pipeline

The production system architecture centers on a streaming-based inference pipeline that allows both full inference when algorithms change and daily incremental inference for recently active users to ensure journeys respond quickly to new activities. The pipeline extracts keywords from multiple data sources including user search history, activity history (Pin closeups, repins, clickthroughs), and user boards. These keywords, along with associated metadata, are embedded using pretrained text embeddings and then subjected to hierarchical clustering to form journey clusters, with each cluster representing a journey candidate.

The streaming architecture is particularly well-suited to this use case because it enables the system to maintain fresh, personalized journeys without the overhead of constantly reprocessing all users. This represents a thoughtful trade-off between freshness and computational efficiency - a common challenge in production LLMOps scenarios where inference costs can quickly spiral if not carefully managed.

## LLM Integration Patterns

Pinterest's use of LLMs in this system demonstrates a multi-faceted approach that evolves from traditional ML to increasingly LLM-centric solutions. In the initial production deployment, journey naming used a ranking model to select the most relevant keyword from each cluster as the journey name, balancing personalization with simplicity. However, the team was simultaneously working on scaling LLM-based journey name generation, which they note promises "highly personalized and adaptable names."

For journey expansion - generating new journey recommendations based on users' past or ongoing journeys - the team explicitly balanced the predictive power of LLMs with serving efficiency. Their approach is instructive: in the initial stage, they focused on creating non-personalized related journeys based on given input journeys. Since the total number of journeys is limited, they could use LLMs to generate this data offline and store it in a key-value store for efficient online serving. For personalized recommendations, they apply the journey ranking model online to rank these pre-generated related journeys for each user. This demonstrates a sophisticated understanding of when to pay LLM inference costs (offline, for bounded generation tasks) versus when to use lighter-weight models (online, for ranking tasks).

## Evaluation and Quality Assurance

One of the most interesting aspects of Pinterest's LLMOps approach is their use of LLMs for relevance evaluation. Recognizing that human evaluation is costly and sometimes inconsistent, they leverage LLMs to assess the relevance of predicted user journeys. By providing user features and engagement history to an LLM and asking it to generate a 5-level relevance score with explanations, they created a scalable evaluation pipeline. Critically, they validated that LLM judgments closely correlate with human assessments in their use case before relying on this approach - a best practice that demonstrates appropriate skepticism about LLM capabilities.

This meta-application of LLMs (using LLMs to evaluate LLM outputs or ML system outputs) is becoming increasingly common in production LLMOps but requires careful validation to ensure the evaluator LLM's biases don't propagate through the system. Pinterest's validation against human judgments shows responsible deployment practices.

## Ranking and Diversification

The journey ranking component uses a point-wise ranking model with labels derived from user email feedback and human annotation. The model incorporates user features, engagement features (frequency of user engagement through search and Pin actions), and recency features. This represents a traditional ML approach that provides an "immediate baseline" - again showing the team's pragmatic philosophy of not over-relying on LLMs where simpler approaches suffice.

To prevent monotony in recommendations, Pinterest implements a post-ranking diversification step that applies penalties to journeys similar to those ranked higher, using pretrained keyword embeddings to measure similarity. The penalty is applied using a multiplicative decay formula where the score is updated based on the number of similar journeys ranked higher and a tunable penalty hyperparameter (typically 0.95). This demonstrates how traditional information retrieval techniques can complement LLM-based systems to improve user experience.

## Journey Stage Prediction

The system classifies journeys into two categories: "Situational" journeys with engagement limited to shorter timeframes and "Evergreen" journeys with consistent engagement over extended periods. For situational journeys, the system predicts whether they're ongoing or ended, primarily using time since last engagement. While the initial approach was relatively simple, the team notes that future improvements will incorporate user feedback and supervised models for more accurate classification. This staged approach - starting simple and adding complexity as data accumulates - is emblematic of their overall philosophy.

## Evolution to Full LLM Inference

The case study describes ongoing work to consolidate multiple system components into a single LLM-based approach. The team identifies several benefits of this evolution: simplification by replacing keyword extraction, clustering, journey naming, and stage prediction with a single LLM; and quality improvement through the LLM's advanced capability to understand user behavior.

Their implementation approach for this LLM-centric system is particularly instructive from an LLMOps perspective. They first tuned prompts and used GPT to generate ground truth labels for fine-tuning Qwen (an open-source LLM), enabling them to scale in-house LLM inference while maintaining competitive relevance. This demonstrates a common pattern: use powerful commercial LLMs (GPT) for data generation and labeling, then fine-tune smaller, more cost-effective models (Qwen) that can be deployed at scale. The team then utilized Ray batch inference to improve efficiency and scalability, implementing both full inference for all users and incremental inference for recently active users to reduce overall inference costs. All generated journeys pass through safety checks to ensure they meet Pinterest's safety standards - a critical production consideration often overlooked in research contexts.

## Production Results and Impact

The initial deployment of journey-aware notifications demonstrated significant measurable impact. Compared to existing interest-based notifications, journey-aware notifications showed an 88% higher email click rate and a 32% higher push open rate, with user surveys revealing a 23% increase in positive feedback rate. These results, from Pinterest's internal data covering April-May 2025, validate the approach and justify the engineering investment.

However, it's worth noting that the case study presents these results from Pinterest's own metrics without independent validation. While the improvements are substantial, they represent a comparison against Pinterest's previous interest-based system rather than against a broader set of baselines or industry benchmarks. The results should be understood as demonstrating that understanding user journeys provides value over simpler interest-based approaches in Pinterest's specific context.

## LLMOps Tradeoffs and Considerations

This case study illustrates several key tradeoffs in production LLMOps. First, the tension between LLM power and operational efficiency: Pinterest chose to use LLMs selectively, pre-generating certain outputs offline and storing them in key-value stores rather than performing all inference in real-time. This reduces latency and cost but sacrifices some degree of personalization and adaptability.

Second, the balance between model sophistication and interpretability: while moving toward full LLM-based inference offers potential quality improvements, the team maintained traditional ML components for ranking and stage prediction where simpler models provide adequate performance and clearer interpretability. This hybrid approach allows them to understand and debug system behavior more effectively than a pure black-box LLM approach would.

Third, the choice between commercial and open-source models: by using GPT for label generation and then fine-tuning Qwen for production inference, Pinterest gained the benefits of cutting-edge model performance while maintaining control over costs and deployment. This two-stage approach is increasingly common in production LLMOps but requires significant ML infrastructure and expertise to execute effectively.

Fourth, the streaming architecture enables timely updates without constant full reprocessing, representing a thoughtful infrastructure choice that balances freshness with computational efficiency. The ability to run both full inference and incremental inference provides operational flexibility that's crucial for iterating on models and algorithms without disrupting service.

## Safety and Governance

The case study briefly mentions that all generated journeys pass through safety checks, which is critical for a platform like Pinterest that serves diverse global audiences. However, the case study doesn't detail what these safety checks entail or how they're implemented. In production LLMOps, safety layers might include content filtering, bias detection, appropriateness checks for different user segments, and compliance with various regulatory requirements. The fact that Pinterest explicitly calls out safety checks suggests they're taking responsible deployment seriously, though more details would be valuable for understanding their approach.

## Infrastructure and Tooling

The use of Ray for batch inference is a notable technical choice that reflects the growing maturity of the LLMOps tooling ecosystem. Ray provides distributed computing capabilities that are well-suited to the embarrassingly parallel nature of batch inference across many users. The streaming system architecture for the overall pipeline enables the continuous updating pattern that's essential for keeping recommendations fresh.

The reliance on pretrained embeddings (SearchSage) throughout the system demonstrates how foundation models can serve as building blocks for more complex systems. Rather than training embeddings from scratch for this use case, Pinterest leveraged existing internal assets, reducing development time and data requirements. This represents good engineering practice in the LLMOps domain - understanding which components can be reused and which require custom development.

## Broader Implications

Pinterest's approach offers several lessons for practitioners deploying LLMs in production. The incremental adoption strategy - starting with traditional ML augmented by pretrained embeddings, then selectively incorporating LLMs for specific tasks, and eventually moving toward more comprehensive LLM-based solutions - provides a roadmap for organizations that need to balance innovation with operational stability. The explicit focus on cost efficiency through offline generation, model distillation (GPT to Qwen), and selective inference demonstrates that production LLMOps requires careful attention to economics, not just model performance.

The validation of LLM-based evaluation against human judgments shows appropriate scientific rigor, while the use of LLMs to generate training data illustrates how these models can bootstrap their own improvement. The streaming architecture and incremental inference patterns represent infrastructure considerations that are often overlooked in discussions of LLM deployment but are crucial for real-world systems serving hundreds of millions of users. Overall, Pinterest's user journey identification system represents a mature, thoughtful approach to production LLMOps that balances multiple competing constraints while delivering measurable business value.