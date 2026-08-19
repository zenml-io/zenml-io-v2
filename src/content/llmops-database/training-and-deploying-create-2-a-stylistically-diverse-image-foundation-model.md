---
title: "Training and Deploying Create 2: A Stylistically Diverse Image Foundation Model"
slug: "training-and-deploying-create-2-a-stylistically-diverse-image-foundation-model"
draft: false
llmopsTags:
  - "content-moderation"
  - "caption-generation"
  - "fine-tuning"
  - "prompt-engineering"
  - "reinforcement-learning"
  - "rlhf"
  - "embeddings"
  - "semantic-search"
  - "pytorch"
  - "spacy"
  - "chromadb"
  - "pinecone"
  - "openai"
  - "meta"
  - "hugging-face"
industryTags: "media-entertainment"
company: "Krea"
summary: "Krea developed and open-sourced Create 2, an image foundation model designed to prioritize stylistic diversity and faster generation over the mode-collapsed outputs of competitors. The team addressed the challenge of creative professionals needing diverse visual exploration tools rather than consistently safe but homogeneous results. Their solution involved a comprehensive LLMOps pipeline including custom data curation with 30-40 in-house classifiers, multi-stage training from low to high resolution, vision-language model captioning, sparse autoencoder-based filtering, preference optimization, and reinforcement learning. The medium variant was successfully open-sourced and demonstrates strong world knowledge and stylistic range while maintaining fast iteration speeds for creative workflows."
link: "https://www.youtube.com/watch?v=-tviRdpmHvs"
year: 2026
seo:
  title: "Krea: Training and Deploying Create 2: A Stylistically Diverse Image Foundation Model - ZenML LLMOps Database"
  description: "Krea developed and open-sourced Create 2, an image foundation model designed to prioritize stylistic diversity and faster generation over the mode-collapsed outputs of competitors. The team addressed the challenge of creative professionals needing diverse visual exploration tools rather than consistently safe but homogeneous results. Their solution involved a comprehensive LLMOps pipeline including custom data curation with 30-40 in-house classifiers, multi-stage training from low to high resolution, vision-language model captioning, sparse autoencoder-based filtering, preference optimization, and reinforcement learning. The medium variant was successfully open-sourced and demonstrates strong world knowledge and stylistic range while maintaining fast iteration speeds for creative workflows."
  canonical: "https://www.zenml.io/llmops-database/training-and-deploying-create-2-a-stylistically-diverse-image-foundation-model"
  ogTitle: "Krea: Training and Deploying Create 2: A Stylistically Diverse Image Foundation Model - ZenML LLMOps Database"
  ogDescription: "Krea developed and open-sourced Create 2, an image foundation model designed to prioritize stylistic diversity and faster generation over the mode-collapsed outputs of competitors. The team addressed the challenge of creative professionals needing diverse visual exploration tools rather than consistently safe but homogeneous results. Their solution involved a comprehensive LLMOps pipeline including custom data curation with 30-40 in-house classifiers, multi-stage training from low to high resolution, vision-language model captioning, sparse autoencoder-based filtering, preference optimization, and reinforcement learning. The medium variant was successfully open-sourced and demonstrates strong world knowledge and stylistic range while maintaining fast iteration speeds for creative workflows."
notion:
  pageId: "3c1f8dff-2538-8094-a4d9-d36b53e4137e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T08:51:00.000Z"
  lastEditedTime: "2026-08-19T08:51:00.000Z"
  publishedAt: "2026-08-19T09:16:27Z"
---

## Overview

Krea recently trained and open-sourced the medium variant of Create 2, their image foundation model focused on delivering stylistic diversity for creative professionals. The presentation provides detailed insights into the research perspective of training a production-grade diffusion model, with a focus on the data curation pipeline, training methodology, and operational considerations that distinguish their approach from competitors.

The core challenge Krea identified was that existing production-grade models from major labs prioritize consistency and reliability at the expense of creative diversity. Models can take up to one or two minutes to generate outputs, and while these outputs are generally acceptable with minimal flaws, they suffer from significant mode collapse. The tendency to render the most statistically average, safe versions of concepts means creative professionals exploring visual ideas find these tools limiting. Krea positioned Create 2 to serve creative studios and professionals who need to iterate quickly through different visual possibilities rather than receive a single polished but predictable result.

## Data Curation: The Foundation of Model Quality

The team emphasized repeatedly throughout the presentation that data quality is paramount once the architecture is locked in. Most of the engineering effort after architecture selection goes into data curation rather than model tuning. For Create 2, this meant processing datasets ranging from two to ten billion images with careful attention to preserving stylistic diversity rather than filtering aggressively based on conventional aesthetic or quality scores.

The data curation strategy involved identifying and addressing several categories of problematic data. Bad data was defined as duplicated samples, overrepresented concepts, samples where vision-language models consistently failed to capture important aspects, images with inappropriate resolution-to-content ratios, and any AI-generated images. The team was particularly adamant about avoiding synthetic data and distillation from other AI models, noting that while this provides a shortcut to good performance, it creates sticky biases that push outputs toward recognizable AI aesthetics that undermine the goal of stylistic diversity.

Krea developed a sophisticated captioning pipeline that serves as a critical component of their LLMOps infrastructure. The pipeline begins with OCR extraction to capture all visible text in images, as text rendering capability is important for downstream applications. Optional metadata is added when available, such as identifying famous people. A vision-language model then generates detailed captions that sufficiently capture all relevant aspects of the image. These captions can subsequently be rewritten into different formats such as JSON prompts or other structured representations to feed the model during training.

An illustrative example of the subtlety required in data curation involved images of paintings hanging on white walls. The vision-language model would consistently describe the painting's content but fail to mention that it was framed and hung on a white wall. This omission caused the trained model to always generate paintings in this context when users simply wanted the painting itself. Rather than accept this bias, the team designed specific filters to remove or undersample such images despite them being technically valid training data.

## Filtering and Deduplication Infrastructure

Given the scale of data involved, Krea implemented a multi-stage filtering approach that balanced thoroughness with computational efficiency. Initial deduplication used hash-based solutions including perceptual hashing and MD5 hashes to handle billions of images efficiently. Once the dataset was reduced to a more manageable size, embedding-based deduplication methods using SSCD and SigLip were applied for semantic deduplication and near-duplicate removal.

A particularly innovative aspect of their filtering infrastructure involved using large vision-language models to design high-quality classifiers, then distilling these down to SigLip-sized models that could be run efficiently over billion-image datasets. For example, they would prompt a large vision-language model to learn whether an image appeared AI-generated, then distill this classification capability into a much smaller, more efficient classifier. This approach mirrors techniques used in LLM data curation, such as those employed by FineWeb, which use large language models to develop taxonomies and classifiers for judging text quality, then distill these to approximately 500 million parameter models that can run efficiently over pre-training corpora.

The team also employed sparse autoencoders as an unsupervised tagging system for filtering. By training sparse autoencoders on vision models, they could feed images and receive sparse feature activations corresponding to concepts like specific objects, black and white processing, blurriness, watermarks, signatures, or border artifacts. This provided an off-the-shelf tagging mechanism that could identify images with undesirable characteristics for targeted filtering or rebalancing without requiring supervised annotation.

For world knowledge coverage, Krea adopted an approach inspired by the original CLIP paper. They computed PageRank scores for all Wikipedia articles and identified concepts in the top 90th percentile as important for the model to understand. Plain text search and embedding search were used to ensure these high-importance concepts had adequate representation in the training dataset. This systematic approach to world knowledge coverage distinguishes their model from competitors that may have gaps in representing culturally or historically significant concepts.

By the end of the data curation process, Krea had developed between 30 and 40 custom in-house classifiers, heuristics, and filters. This extensive filtering infrastructure underscores the operational complexity of preparing production-quality training data for foundation models.

## Training Pipeline: From Low Resolution to Production

The training methodology follows a progression inspired by practices common in large language model development. The pipeline moves through low-resolution to high-resolution pre-training, mid-training with curated domain-specific data, supervised fine-tuning, preference optimization, and reinforcement learning. Each stage serves a distinct purpose in shaping the model's capabilities and output distribution.

Pre-training begins at low resolution, specifically 256x256 pixels, where the model learns fundamental text-to-image capabilities and semantic understanding. At this stage, the model learns what objects look like and how they relate to textual descriptions. Training then progressively scales up to 1K resolution, allowing the model to learn structure, detail, and high-frequency information that can only be captured at higher resolutions. This multi-resolution approach is computationally efficient and pedagogically sound, teaching concepts in order of increasing complexity.

The technical foundation relies on latent diffusion models, which use an autoencoder to spatially compress images before generation occurs in a compressed latent space. This approach is more efficient than operating directly on raw pixels because most production models use diffusion transformers or variants with quadratic time complexity. Operating in a compressed latent space significantly reduces computational costs while maintaining generation quality.

Following pre-training, mid-training and supervised fine-tuning mold the general-purpose pre-trained model into something aligned with downstream use cases. Just as pre-trained language models are essentially autocomplete engines that require additional training to become useful chat assistants or tool-using agents, pre-trained diffusion models require additional shaping. Krea curated large-scale datasets in specific domains including illustration, graphic design, photography, and cinematics to guide the model toward the output distributions they wanted to serve.

Preference optimization follows supervised fine-tuning, collecting paired comparisons where human annotators indicate preferences between generated outputs. This stage allows the team to become more opinionated about the desired model behavior, polishing the outputs to better align with user preferences. The approach mirrors the preference learning used in language model development.

Reinforcement learning represents the final major training stage, now standard practice in both language and diffusion models. Krea uses a method inspired by Group Relative Policy Optimization where the model generates images that are sent to reward servers providing feedback. This feedback loop teaches the model to improve specific capabilities like text rendering quality and anatomical structure accuracy.

## Prompt Expansion and Distribution Alignment

An almost essential component of production-grade diffusion models is a prompt expander, a small language model that takes user prompts and outputs detailed, verbose prompts. Longer, more detailed prompts tend to be more in-distribution with the model's training data, producing better results. This creates a user experience challenge where casual users can provide simple prompts while the system internally expands these into the detailed prompts that yield high-quality generations.

The team noted an interesting architectural evolution where the overall system now combines an autoregressive decoder for prompt expansion with an encoder transformer for diffusion generation. This reversal of the traditional encoder-decoder pattern creates a pipeline reminiscent of DALL-E 2, where an initial model generates conditioning information that feeds into the diffusion model.

## Infrastructure and Iteration Speed

Throughout the presentation, the importance of infrastructure for fast iteration was emphasized repeatedly. The team prioritizes methods with low hyperparameter counts to reduce tuning burden, efficiency to enable rapid experimentation, and simplicity to maintain scalability. A deliberate strategy involves borrowing heavily from language model research to reuse kernels, research insights, and established practices rather than reinventing solutions.

The emphasis on iteration speed reflects a mature LLMOps perspective where research velocity directly impacts product quality. With architecture largely fixed and data dominating quality outcomes, the ability to rapidly test different data curation strategies, filtering approaches, and training configurations becomes the primary lever for improvement.

## Operational Challenges and Tradeoffs

The presentation candidly acknowledged several operational challenges. Vision-language models used for captioning sometimes consistently fail to capture important image aspects, requiring manual intervention to design filters addressing these systematic failures. The team had to balance aggressive filtering for quality against preserving stylistic diversity, avoiding the temptation to oversample conventionally attractive images at the expense of less common aesthetic styles.

The decision to completely avoid AI-generated training data represents a significant operational commitment. While synthetic data provides shortcuts to good performance, the team views it as creating long-term technical debt that locks models into recognizable AI aesthetics. This philosophical stance requires more effort in data curation but preserves the model's ability to capture genuine stylistic diversity from human-created content.

The scale of filtering infrastructure, requiring 30-40 custom classifiers, indicates substantial engineering investment beyond the core model training. Each classifier must be efficient enough to run over billions of images while accurate enough to improve rather than degrade data quality. The distillation approach from large vision-language models to efficient classifiers represents a practical solution to this operational constraint.

## Future Directions and Research Opportunities

The presentation concluded with observations about future research directions. The team aims to simplify the technology stack by eliminating separate VAEs and text encoders in favor of training a single clean transformer. This architectural simplification would reduce operational complexity and potentially improve end-to-end optimization.

Advances in vision-language models create new opportunities for conditional generation. Bounding boxes, which were expensive to generate when latent diffusion models were first introduced, can now be produced reliably for every image. Scene graphs, explored in academic research, represent another structured way to describe images that could serve as conditioning information. The question of what textual representations best capture image content for generation purposes remains an active research area that could significantly impact future model capabilities.

The team views image generation progress as closely coupled to vision-language model progress, suggesting that improvements in one domain directly enable improvements in the other. This perspective positions their work within a broader ecosystem of multimodal AI development rather than as an isolated image generation problem.

## LLMOps Maturity and Lessons

The Create 2 development demonstrates several hallmarks of mature LLMOps practices. The systematic approach to data curation with dozens of custom filters reflects operational sophistication beyond initial research prototypes. The multi-stage training pipeline with clear purposes for each stage shows thoughtful process design. The distillation of large models to efficient classifiers for data filtering represents practical engineering addressing real computational constraints.

The emphasis on iteration speed, simplicity, and borrowing established practices from language model development shows strategic thinking about research productivity. The decision to invest heavily in data quality rather than architectural novelty reflects hard-won lessons about what actually drives production model quality.

The candid discussion of failures, such as vision-language models missing important image aspects, demonstrates operational maturity in acknowledging that production systems require extensive engineering to handle edge cases and systematic failures. The team's willingness to design specific filters for specific problems rather than hoping for universal solutions shows pragmatic engineering judgment.

Overall, the Create 2 case study illustrates that deploying image foundation models in production requires extensive LLMOps infrastructure spanning data curation, multi-stage training pipelines, preference learning, reinforcement learning, and prompt engineering. The operational complexity rivals or exceeds that of large language model deployment, with unique challenges around visual understanding, stylistic diversity preservation, and multimodal data quality assessment.
