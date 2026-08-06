---
title: "Evolution of Base Models from Web-Scale Pre-training to RL-Ready Priors"
slug: "evolution-of-base-models-from-web-scale-pre-training-to-rl-ready-priors"
draft: false
llmopsTags:
  - "code-generation"
  - "question-answering"
  - "chatbot"
  - "reinforcement-learning"
  - "rlhf"
  - "fine-tuning"
  - "few-shot"
  - "instruction-tuning"
  - "agent-based"
  - "token-optimization"
  - "pytorch"
  - "tensorflow"
  - "openai"
  - "meta"
  - "google-gcp"
  - "nvidia"
industryTags: "research-academia"
company: "Arcee AI"
summary: "This presentation by the pre-training lead at Arcee AI examines the fundamental shift in how base language models are conceptualized and trained, moving from the traditional paradigm of massive web-scale pre-training to a new approach where supervised learning serves primarily as preparation for reinforcement learning. The speaker explores how training data compositions have dramatically changed, with web text dropping from 85% to as low as 15% of training mixes while code and synthetic data have become dominant. The presentation discusses two contrasting approaches seen in recent models: avoiding synthetic data entirely versus heavily incorporating post-training data into pre-training, and argues that base models should now be viewed as building priors for reasoning and agentic behaviors rather than simply accumulating general knowledge."
link: "https://www.youtube.com/watch?v=xbPriQWXtWM"
year: 2026
seo:
  title: "Arcee AI: Evolution of Base Models from Web-Scale Pre-training to RL-Ready Priors - ZenML LLMOps Database"
  description: "This presentation by the pre-training lead at Arcee AI examines the fundamental shift in how base language models are conceptualized and trained, moving from the traditional paradigm of massive web-scale pre-training to a new approach where supervised learning serves primarily as preparation for reinforcement learning. The speaker explores how training data compositions have dramatically changed, with web text dropping from 85% to as low as 15% of training mixes while code and synthetic data have become dominant. The presentation discusses two contrasting approaches seen in recent models: avoiding synthetic data entirely versus heavily incorporating post-training data into pre-training, and argues that base models should now be viewed as building priors for reasoning and agentic behaviors rather than simply accumulating general knowledge."
  canonical: "https://www.zenml.io/llmops-database/evolution-of-base-models-from-web-scale-pre-training-to-rl-ready-priors"
  ogTitle: "Arcee AI: Evolution of Base Models from Web-Scale Pre-training to RL-Ready Priors - ZenML LLMOps Database"
  ogDescription: "This presentation by the pre-training lead at Arcee AI examines the fundamental shift in how base language models are conceptualized and trained, moving from the traditional paradigm of massive web-scale pre-training to a new approach where supervised learning serves primarily as preparation for reinforcement learning. The speaker explores how training data compositions have dramatically changed, with web text dropping from 85% to as low as 15% of training mixes while code and synthetic data have become dominant. The presentation discusses two contrasting approaches seen in recent models: avoiding synthetic data entirely versus heavily incorporating post-training data into pre-training, and argues that base models should now be viewed as building priors for reasoning and agentic behaviors rather than simply accumulating general knowledge."
notion:
  pageId: "3b4f8dff-2538-800f-9814-f6da659bf04e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:32:00.000Z"
  lastEditedTime: "2026-08-06T11:32:00.000Z"
  publishedAt: "2026-08-06T11:45:15Z"
---

## Overview

This presentation from Arcee AI's pre-training lead provides a comprehensive examination of how the fundamental approach to training large language models has evolved, with significant implications for LLMOps and production deployments. The speaker presents a thesis that the traditional concept of the base model has fundamentally changed, moving from an artifact that primarily captures general web knowledge to one that serves as a foundation specifically optimized for downstream reinforcement learning and agentic applications.

The presentation draws on examples from multiple models including GPT-3, Llama 3, DeepSeek R1, OpenAI's o1, GLM series, and Arcee AI's own models to illustrate how training paradigms have shifted. This represents critical knowledge for teams operating LLMs in production, as the characteristics and capabilities of base models directly impact what can be achieved through fine-tuning and deployment.

## Historical Context and Traditional Paradigm

The speaker begins by outlining the traditional base model training approach exemplified by GPT-3, where pre-training was the dominant phase consuming the bulk of compute budget. In this paradigm, models were trained primarily on web-scale text data, with Common Crawl and similar web scrapes comprising up to 85% of the training mixture. The goal was to have the model accumulate broad world knowledge and build useful representations through next token prediction on data that reflected "the entirety of human knowledge." Additional high-quality sources like Wikipedia and books rounded out the mix.

In this traditional framework, post-training served primarily to shape the model's output format, helping it adapt to chat templates and question-answer formats to surface the knowledge accumulated during pre-training. Reinforcement learning was described as merely "a cherry on top," adjusting interaction flavor rather than conferring fundamental new capabilities or knowledge. The quality and scale of pre-training essentially determined the ceiling of what could be achieved with the model.

## The Paradigm Shift: Reasoning Models and RL Dominance

A fundamental shift occurred with the release of OpenAI's o1 model and particularly with DeepSeek's R1 in January 2025, which democratized understanding of how to build reasoning models. These developments revealed that reinforcement learning could dramatically improve model performance on various tasks, going far beyond simple interaction shaping. The speaker highlights specific examples like competitive math performance on AIME and the emergence of capabilities like Claude's coding agent, where models could learn to interact with software environments end-to-end through RL.

This shift raises a critical question for production LLM systems: is the standard web-knowledge-focused base model still the optimal starting point for large-scale reinforcement learning that powers modern reasoning and agentic models? The speaker presents evidence that the answer is increasingly "no," with major implications for how teams should think about model selection and training.

## Dramatic Changes in Training Data Composition

The presentation provides concrete evidence of how training data mixes have evolved by comparing several recent models. In the MAI Thinking 1 model, which notably avoided all synthetic data, web text has dropped to just 15% of the training mix from the historical 85% seen in GPT-3. This represents a dramatic rebalancing even while maintaining a commitment to human-generated data.

More dramatically, code data has gone from being absent in GPT-3's explicitly categorized training data to becoming the dominant subset in modern pre-training recipes. This reflects the reality that code and STEM abilities have become central to real-world use cases for production LLMs. The speaker notes that Llama 3 allocated 50% of tokens to general knowledge, showing this trend was already underway before the reasoning model revolution.

The speaker contrasts two distinct approaches visible in recent research. MAI Thinking 1 explicitly avoids synthetic data, attempting to filter web scrapes to exclude content from other language models and maintaining reliance on human knowledge as the bootstrap for model representations. However, NeMo Tron 3 Ultra takes the opposite approach, heavily incorporating synthetic data and pulling post-training data back into the pre-training phase. In NeMo Tron's recipe, the top three data categories are labeled with an SFT prefix, indicating question-and-answer chat format data that would traditionally only appear in post-training. By including this from the beginning, the model learns the shape of downstream conversations and expected tasks from the very start of pre-training.

## The Role and Implementation of Synthetic Data

The presentation addresses the controversial topic of synthetic data with nuance. While acknowledging concerns about model collapse when synthetic data is blindly incorporated, the speaker presents evidence of successful large-scale deployment. Arcee AI's own Trinity Lodge model utilized web-scale synthetic data primarily through rephrasing, where seed data items are upsampled by generating synthetic variations. This exposes the model to the same information presented in multiple ways.

The Kimikay2 model represents an even larger-scale success with synthetic data broadly used across the entire pre-training dataset. The speaker references early examples from Swallow Code and Swallow Math datasets. The benefits of synthetic data extend beyond simply generating more tokens to include cleaning existing data, achieving higher quality, and shaping tokens to resemble instruct or agentic tasks early in pre-training. This allows models to learn task representations from the very beginning rather than having to adapt to dramatically different distributions during post-training.

For production teams, this has implications for data strategy. The ability to generate high-quality synthetic data that properly represents downstream tasks becomes a potential competitive advantage, though it requires careful execution to avoid quality degradation.

## Mixture of Experts and Load Balancing Considerations

The presentation touches on important technical considerations for Mixture of Experts architectures in production. One of the biggest challenges in training MoE models is load balancing, where experts can over-specialize during training. Load balancing objectives aim to achieve broadly equal utilization of experts within batches or sequences.

The MAI Thinking 1 report illustrated a common pitfall: when the data distribution seen in post-training differs dramatically from pre-training, it can cause massive load imbalances. MAI addressed this by significantly increasing the load balancing coefficient during supervised fine-tuning stages. However, the speaker argues this is suboptimal, as ideally models should learn stable representations from early on without requiring dramatic intervention late in training.

This provides additional motivation for incorporating post-training-like data early in pre-training, particularly for MoE architectures. For teams deploying MoE models in production, understanding how the base model was trained relative to the distribution it will encounter in deployment becomes critical for predicting performance and stability.

## Mid-Training and Context Length Evolution

The presentation discusses the emergence of mid-training as an additional training phase, where models are exposed to the distribution they'll encounter during post-training and RL at longer context lengths. This helps prepare models for agentic traces and other long-context applications. However, the speaker notes that many models are now training with much longer contexts directly in pre-training, suggesting that these datasets could be pulled back into the initial mix for more stable representation learning from the beginning.

This evolution reflects the production reality that modern LLM applications often require handling long contexts for tasks like code generation, document analysis, and multi-turn agentic interactions. Teams deploying LLMs need to ensure their chosen base models were trained with appropriate context lengths for their use cases.

## Reconceptualizing the Training Paradigm

The speaker proposes that the traditional categorization of pre-training, mid-training, post-training, and RL is becoming muddy and less useful. Instead, there are two broad paradigms that build modern LMs: supervised learning through next token prediction and reinforcement learning. RL is becoming increasingly important, with compute allocations shifting dramatically.

The head of Xiaomi's Mimo Labs is quoted discussing roughly equal compute allocation between pre-training and post-training in their final model. Even more extreme, Composer 2.5 received much more RL compute than supervised learning compute. When RL dominates the compute budget to this extent, it fundamentally changes how we should think about supervised learning. Rather than being the primary phase that determines model capabilities, supervised learning becomes specifically a way to prepare the model and build useful representations for the subsequent RL phase.

This has profound implications for production teams. Understanding that base models are increasingly optimized as priors for RL rather than as general knowledge repositories helps explain their strengths and limitations. It also suggests that for certain use cases requiring broad general knowledge without sophisticated reasoning, older-style base models might actually be more suitable.

## Supervised Learning as Preparation for RL

The presentation cites research showing how supervised learning affects reinforcement learning outcomes. The key finding is that base models need exposure to the atomic skills required during RL, and models can learn to extrapolate from these atomic skills during RL if the environment has sufficient difficulty. The speaker includes the classic AlphaGo graph showing RL eventually overtaking supervised learning, noting uncertainty about whether language models will follow this pattern given the complexity of human language distribution.

However, the trend toward diminished supervised learning and increased RL continues. This makes the conceptualization of base models as collections of atomic skills for RL increasingly valuable. For production systems, this means evaluating base models not just on their immediate capabilities but on their potential to learn specific downstream tasks through RL or fine-tuning.

## Novel Data and Test-Time Compute

Some laboratories are introducing genuinely novel data during supervised learning that models wouldn't naturally encounter, such as chain-of-thought reasoning traces that don't resemble typical human output. The speaker references Ziya 1's approach of warming models up to test-time compute schemes during supervised fine-tuning or even pre-training.

This represents forward-thinking preparation for emerging inference patterns. As test-time compute becomes more important for production applications, having base models that were trained with awareness of these patterns could provide significant advantages in deployment performance and efficiency.

## Implications for Production LLM Operations

For teams operating LLMs in production, this presentation highlights several critical considerations. First, the choice of base model should account for its training paradigm and whether it aligns with the intended use case. Models trained as priors for RL and reasoning may excel at agentic tasks but potentially underperform at broad knowledge retrieval compared to traditional web-trained models.

Second, understanding the data composition and training approach provides insight into what fine-tuning or RL will be most effective. Models that already incorporate instruction-format data and synthetic rephrasing during pre-training may require different fine-tuning approaches than traditional base models.

Third, the increasing importance of RL in overall compute budgets suggests that production teams may need to invest more heavily in RL infrastructure and expertise rather than focusing primarily on supervised fine-tuning. The atomic skills framework suggests that targeted RL can achieve capabilities that would be difficult or impossible through supervised learning alone.

Fourth, for MoE deployments, teams should investigate whether base models were trained with data distributions similar to production use to avoid load balancing issues that could impact performance and efficiency.

## Critical Assessment and Balanced Perspective

While the presentation provides valuable insights into training paradigm evolution, several points warrant careful consideration. The speaker works for Arcee AI and naturally highlights approaches aligned with their work, including heavy use of synthetic data. The contrasting example of MAI Thinking 1 successfully avoiding synthetic data demonstrates that multiple approaches remain viable.

The dramatic claims about base models being "dead" are somewhat overstated, as the speaker acknowledges. Base models remain critically important; their role and optimal training approach have evolved rather than disappeared. Production teams should avoid over-rotating based on current trends, as the field continues to evolve rapidly.

The focus on reasoning and agentic applications reflects current market excitement but may not represent all production use cases. Many practical applications still benefit from traditional strengths like broad knowledge coverage and strong language understanding without requiring sophisticated reasoning chains.

The presentation also doesn't deeply address important operational concerns like model stability, reproducibility, and deployment efficiency. The shift toward complex RL-heavy training pipelines may introduce new operational challenges that aren't fully explored here.

## Conclusion

This presentation provides valuable perspective on how base model training has evolved from web-scale knowledge accumulation to targeted preparation for reinforcement learning and agentic applications. The dramatic shifts in data composition, with web text declining and code and synthetic data rising, reflect changing production requirements. Understanding these trends helps teams make informed decisions about model selection, fine-tuning strategies, and infrastructure investments. However, the field remains in flux, and teams should maintain flexibility rather than assuming current trends represent permanent paradigm shifts. The fundamental insight that base models increasingly serve as priors for downstream RL rather than final products themselves has significant implications for how we approach LLMOps and production deployments.
