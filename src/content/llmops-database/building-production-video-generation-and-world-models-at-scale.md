---
title: "Building Production Video Generation and World Models at Scale"
slug: "building-production-video-generation-and-world-models-at-scale"
draft: false
llmopsTags:
  - "multi-modality"
  - "content-moderation"
  - "poc"
  - "prompt-engineering"
  - "few-shot"
  - "model-optimization"
  - "knowledge-distillation"
  - "latency-optimization"
  - "cost-optimization"
  - "agent-based"
  - "harness-engineering"
  - "memory"
  - "llama-index"
  - "pytorch"
  - "vllm"
  - "nvidia"
  - "meta"
  - "google-gcp"
industryTags: "tech"
company: "xAI"
summary: "This case study chronicles the journey of Eden Ha, who led video and multimodal model development at xAI, building production-ready image generation, video generation, and world models from scratch in just three months. The challenge was to create competitive generative media capabilities without existing infrastructure, data pipelines, or trained models, while managing massive compute resources and storage costs. The solution involved leveraging strong engineering talent, building on previous experience from NVIDIA's Cosmos project, implementing efficient iteration cycles, and critically recognizing that most visual intelligence gains come from language models rather than the video models themselves. This led to innovations like prompt rewriting with large language models, video extension with full historical context, reference-based video generation, and ultimately the development of video agents that orchestrate multiple tools. The results included the successful launch of Grok Imagine 0.9 with audio-video joint generation, state-of-the-art video extension capabilities, and pioneering work toward real-time interactive world models that point toward a future of generative UIs and AI-controlled interfaces."
link: "https://www.youtube.com/watch?v=jPtQlILfkhA"
year: 2025
seo:
  title: "xAI: Building Production Video Generation and World Models at Scale - ZenML LLMOps Database"
  description: "This case study chronicles the journey of Eden Ha, who led video and multimodal model development at xAI, building production-ready image generation, video generation, and world models from scratch in just three months. The challenge was to create competitive generative media capabilities without existing infrastructure, data pipelines, or trained models, while managing massive compute resources and storage costs. The solution involved leveraging strong engineering talent, building on previous experience from NVIDIA's Cosmos project, implementing efficient iteration cycles, and critically recognizing that most visual intelligence gains come from language models rather than the video models themselves. This led to innovations like prompt rewriting with large language models, video extension with full historical context, reference-based video generation, and ultimately the development of video agents that orchestrate multiple tools. The results included the successful launch of Grok Imagine 0.9 with audio-video joint generation, state-of-the-art video extension capabilities, and pioneering work toward real-time interactive world models that point toward a future of generative UIs and AI-controlled interfaces."
  canonical: "https://www.zenml.io/llmops-database/building-production-video-generation-and-world-models-at-scale"
  ogTitle: "xAI: Building Production Video Generation and World Models at Scale - ZenML LLMOps Database"
  ogDescription: "This case study chronicles the journey of Eden Ha, who led video and multimodal model development at xAI, building production-ready image generation, video generation, and world models from scratch in just three months. The challenge was to create competitive generative media capabilities without existing infrastructure, data pipelines, or trained models, while managing massive compute resources and storage costs. The solution involved leveraging strong engineering talent, building on previous experience from NVIDIA's Cosmos project, implementing efficient iteration cycles, and critically recognizing that most visual intelligence gains come from language models rather than the video models themselves. This led to innovations like prompt rewriting with large language models, video extension with full historical context, reference-based video generation, and ultimately the development of video agents that orchestrate multiple tools. The results included the successful launch of Grok Imagine 0.9 with audio-video joint generation, state-of-the-art video extension capabilities, and pioneering work toward real-time interactive world models that point toward a future of generative UIs and AI-controlled interfaces."
notion:
  pageId: "377f8dff-2538-805c-80c3-cd99a2781940"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-06T05:30:00.000Z"
  lastEditedTime: "2026-06-06T05:30:00.000Z"
  publishedAt: "2026-06-06T05:37:21Z"
---

## Overview

This case study provides deep insights into the production deployment of large-scale video generation models at xAI, shared by Eden Ha who previously worked on NVIDIA's Cosmos project and then led video and multimodal model development at xAI from mid-2025 through early 2026. The narrative spans the complete lifecycle from zero-to-one team formation through production deployment of state-of-the-art generative media capabilities, with particular emphasis on the critical role of language models in visual intelligence and the emerging paradigm of video agents.

## Team Formation and Development Philosophy

The team started with no infrastructure, no data pipelines, and no trained models, yet shipped the first production model (Grok Imagine 0.9) within three months. This rapid development was attributed to several key factors. First, the team was deliberately kept small to minimize communication overhead, typically having just one synchronization meeting per day with the rest of the time dedicated to building. Second, xAI's culture emphasized three core principles: move fast, build, and no goal is too ambitious, combined with first-principles thinking to determine what was actually possible given physical constraints like data acquisition speed, model training iteration time, and GPU availability.

A critical insight from the case study is that iteration speed emerged as the most important factor in model development success. The faster a team can cycle through acquiring new data, designing new algorithms, training models at smaller scale, and evaluating results, the faster they can develop high-quality models. This high iteration velocity also provides a larger buffer for errors and more opportunities to spot bugs. Interestingly, many of the biggest improvements to model quality came not from novel algorithms but from finding and fixing small bugs in data pipelines and model training pipelines.

## Infrastructure and Cost Considerations

The infrastructure requirements for training video models are substantial and comparable to medium-to-large scale language models. Storage alone presents significant challenges: storing a billion videos at approximately 5 megabytes per video requires around 5 petabytes of storage, which costs approximately $100,000 per month on standard cloud storage. This doesn't account for the additional storage needed for compressed continuous features from the video autoencoder (VAE), which is comparable in size to the raw videos themselves. Even more expensive is data egress, with the cost to download 5 petabytes of data from cloud providers running around $230,000.

The team had to heavily optimize their systems to avoid becoming IO-bound during training, as constantly loading large video files can bottleneck GPU utilization. GPU costs for training these models are comparable to medium-sized language models, as the models themselves range from around 20 billion parameters for dense architectures to potentially 100+ billion total parameters for mixture-of-experts approaches. The training dataset sizes are also comparable to language models, with tens of trillions of visual tokens processed during training.

## The Critical Role of Language Models in Visual Intelligence

One of the most significant and somewhat counterintuitive findings from this work is that the majority of improvements in video generation quality come from language models rather than from the video diffusion models themselves. This insight has profound implications for how teams should allocate their resources and attention when building production visual generation systems.

The core mechanism behind this phenomenon is the prompt rewriter or prompt upsampler component. In the Cosmos architecture, this component used Llama or Mixtral and was actually larger than the 7 billion parameter video diffusion model itself. The prompt rewriter takes simple user instructions like "a cat" and expands them into extremely detailed descriptions that the video model can work with. This is necessary because video diffusion models are trained on synthetic text-video pairs where videos are described in exhaustive detail—detailed enough that a blind person could reconstruct the video from the description alone. When users provide simple prompts, the video model interprets them literally: "a cat" might generate just a static cat on a white background because the user didn't specify movement or environment.

This architecture means that the "thinking process" for video generation actually happens in the language model component. When users generate images with systems like GPT-4 and notice it takes several minutes, much of that time is spent in the language model thinking and planning, not in pixel generation. The language model can now do much more than simple prompt expansion—it can function as an agentic model that fetches today's news online, processes information, and organizes layouts before generating images.

## Data Pipeline and Synthetic Pair Generation

The foundation of any video generation model is high-quality paired data of language descriptions and videos. However, videos on the internet don't naturally come with accurate descriptions. A YouTube video might have a title like "I'm so happy today" while showing a scenic mountain landscape with no correlation to the text. This necessitates a complex synthetic data generation pipeline.

The first step requires a Vision Language Model (VLM) to caption videos. This creates a bootstrapping problem: how do you get a VLM if you don't have one to begin with? The initial solution involves human labelers who describe videos in exhaustive detail, capturing all objects, characters, interactions, and dialogues such that someone who cannot see the video could reconstruct it mentally from the text description. This same principle applies whether working with images or videos.

An important training technique is to include a small percentage of unlabeled data during model training, where the model is instructed to generate video without any text instruction. This helps the model learn to generalize beyond the specific patterns in the labeled dataset.

## Compression and Tokenization Architecture

Training diffusion models directly on raw pixels is computationally infeasible. A 1000x1000 pixel image contains 1 million pixels, which would be an impossible context length for transformer models to handle. The solution is to train a tokenizer or compressor (typically a VAE) that maps images or videos to a compressed latent space and back. This compression is patch-based, following the Vision Transformer (ViT) approach where patches of pixels (commonly 16x16) are mapped to fixed-length vectors in continuous latent space.

For video, there are different compression strategies with important tradeoffs. The most naive approach is spatial-only compression, compressing each frame independently without temporal compression. A more sophisticated approach includes temporal compression, where multiple frames (e.g., 4 frames) are compressed into a single token. Temporal compression can achieve much higher compression ratios because consecutive video frames are highly redundant. For example, a compression scheme might use 8x8 spatial compression with 4x temporal compression, reducing context length by a factor of 256.

However, temporal compression creates challenges for real-time and interactive applications. For a model to respond immediately to user input, it needs to generate frames continuously. With 4x temporal compression, there's an inherent lag because the model must generate 4 frames as a unit before any can be displayed. This makes frame-by-frame compression more suitable for interactive applications like world models, despite the 4x increase in context length.

## Training Process and Model Architecture

After preparing compressed latent tokens and language tokens, the actual training of the diffusion transformer is quite standard and similar to language model training. The key difference is the denoising process: the model learns to remove noise from visual tokens rather than predict the next token. During training, random noise is added to visual tokens and the model learns to remove it. During inference, the model iteratively removes noise starting from 100% noise.

An important architectural principle is to train an image model first before bootstrapping a video model from it. Image models are cheaper to train and provide much denser connections between language and visual content. Training on a billion images provides a billion language-to-image mappings, whereas training on a billion videos is far more expensive and may not expose the model to sufficient language tokens to understand human intention well. By first training a strong image model that understands language-vision alignment, teams can then extend to video with better sample efficiency.

## Inference Optimization and Step Distillation

While training costs are substantial, inference optimization is critical for production deployment. The biggest gains come from step distillation, which is different from knowledge distillation in language models. Traditional diffusion models might require 100 steps, while flow matching models need similar numbers and older diffusion models needed up to 1000 steps to generate high-quality outputs.

Step distillation works by training a "student" model that generates outputs in fewer steps to match the outputs of a "teacher" model that uses the full 100 steps. The intuition for why this works is that the teacher model is trying to model the extremely complex distribution of images and videos on the internet, while the student model only needs to model the much simpler distribution of the teacher model's outputs. Production models often run in just 4-8 steps after distillation, and for simpler tasks like image-to-image translation, they can run in a single step.

Other distillation approaches include consistency models and distribution matching distillation, which incorporates GANs. GANs were actually the original "one-step distillation" approach, training a discriminator to judge whether generated images look real without requiring the model to reconstruct exact ground truth images. Combining consistency models, distribution matching, and GAN techniques enables the creation of few-step models suitable for production deployment.

## Audio-Video Joint Generation

Grok Imagine 0.9 was the first audio-video joint generation model deployed at large scale. This presented unique challenges around modality alignment. While text-to-video alignment and even audio generation in language models were somewhat established, VLMs typically couldn't understand audio, and language models couldn't sing or generate music well despite handling speech reasonably.

The fundamental challenge is that audio has both discrete and continuous components. Speech is somewhat discrete and can be modeled with text tokens plus characteristics, making it amenable to ASR techniques. Music, however, is highly continuous and cannot be effectively modeled as discrete language tokens.

A critical requirement for audio-video generation is precise time-based alignment. The model must know exactly which audio tokens correspond to which video frames at each timestep. This type of fine-grained temporal alignment doesn't exist for most other modality pairs—text-to-image and text-to-video are only loosely aligned, with descriptions capturing general content but not frame-by-frame details. Designing the model to be temporally aware required careful architectural choices, a capability notably absent in most language models.

## Video Extension and Long-Horizon Generation

Video extension emerged as a critical stepping stone toward full world models. Traditional video generation models take a prompt or initial frame and generate a short clip, then stop. Some creators attempted to chain generations by using the last frame of one video as the first frame of the next, but this degrades quickly and lacks context about what happened previously. Some models like Runway's Gen-3 included one second of context from the previous generation, which was better but still degraded over multiple extensions and lacked long-range memory of earlier content.

The xAI team built video extension with full historical context of all previously generated videos. This means the model knows who has spoken, what objects have appeared, and all relevant context needed to generate the next coherent segment. The naive approach of putting all previous video tokens into context would cause context length to explode—5 seconds of video in Cosmos is around 50-60k tokens, so 50 seconds would be 500k+ tokens.

The solution involved selective context management, similar to emerging techniques in language model agents. The most recent history (e.g., the last second) is included at full resolution, while earlier history is compressed. Some approaches use heuristics like the FramePack paper's approach where context size is fixed and earlier frames are progressively downsampled. More sophisticated approaches aim to make the model automatically aware of which historical contexts to select, though this remains an active area of research.

## Reference-Based Video Generation

To address long-context challenges while maintaining character and object consistency, the team developed reference-based video generation. Users can upload up to seven reference images of characters, objects, or scenes, and the video model generates content that maintains consistency with these references. This approach solves many long-context problems by allowing the model to selectively reference specific visual elements without maintaining full temporal context.

For example, when generating a long-form movie autoregressively in 10-second segments, if a character reappears after being absent for a while, the model can look back to where that character first appeared and bring that reference forward without processing all the intervening frames. This represents an intermediate solution toward fully automatic context selection, where models will eventually learn which parts of history to reference without explicit human guidance.

## The Evolution Toward Video Agents

A key insight that emerged from this work is that video generation is evolving from monolithic models to agentic systems that orchestrate multiple tools. This mirrors the evolution in code generation from simple autocompletion to sophisticated systems like Devin and Claude Code that autonomously complete complex tasks.

Current video agents can take requests like "generate a one-minute video" and iteratively call different tools to accomplish this, even though no single video model can generate one-minute videos directly. The agent might generate multiple clips, perform video editing operations (removal, addition, replacement, transfer), and use tools like ffmpeg to stitch segments together. Initially, users can interact with these systems in an assisted mode, but as model capabilities increase, they will handle increasingly complex requests fully autonomously.

The video agent paradigm solves several important problems. First, language models are better at prompting AI models than humans are—they understand how to craft effective prompts for different specialized models. Second, agents can incorporate deterministic tools alongside generative models, enabling precise operations like adding text overlays at specific timestamps that pure generative models might not handle reliably. Third, agents can iteratively refine outputs, similar to how human creators generate initial content then edit extensively to achieve production quality.

An important observation is that professional creators don't just use raw model outputs—they take generated videos into editing tools and refine them extensively. Video agents automate this professional workflow, potentially using image and video editing tools, ffmpeg for composition, and various generative AI technologies as a coordinated toolkit.

## Future Vision: Generative UIs and Real-Time World Models

The ultimate vision articulated in this case study is for real-time, interactive, long-horizon world models that enable entirely new interaction paradigms. Examples include Flipbook, which generates web browser UIs in real-time, allowing users to explore imaginary information spaces, and NeuroOS, which simulates operating systems with playable games like Doom running entirely through video generation.

The key insight is that as inference costs decrease (approximately 2x per year in raw compute, but 100-1000x per year when accounting for model improvements), generative UIs become economically viable. Instead of the traditional pipeline of user intention → code → compilation → pixels, generative UIs go directly from user intention → pixels via diffusion models. This enables maximum customization—users could view their email as a TikTok-style swipeable interface or modify Instagram to remove the like button.

The prediction is that powerful language models and reasoning systems will run on the backend, while diffusion models serve as the frontend rendering layer, providing maximum input/output bandwidth by leveraging human visual processing capabilities combined with voice interaction. This represents the highest-bandwidth human-AI interface possible before neural interfaces become viable.

For this vision to work, world models must be real-time (responding in milliseconds to hundreds of milliseconds depending on application), interactive (responding to keyboard, mouse, voice, and other inputs), and long-horizon (generating content for minutes or hours, not just seconds). Current models fall short on all three dimensions, but incremental progress through video extension, reference-based generation, and real-time frame-by-frame generation is building toward this future.

## LLMOps Lessons and Production Challenges

Several critical LLMOps lessons emerge from this case study. First, iteration speed trumps almost everything else in model development. Teams should optimize relentlessly for how many train-evaluate cycles they can complete per day, as this provides more opportunities to find bugs and test hypotheses. Strong infrastructure that enables rapid experimentation is more valuable than sophisticated algorithms.

Second, most gains come from mundane bug fixes rather than algorithmic innovations. This suggests that production ML teams should invest heavily in observability, testing, and debugging capabilities rather than only focusing on novel architectures.

Third, the separation of concerns between language models (for reasoning and planning) and diffusion models (for rendering) enables more effective scaling than trying to build monolithic end-to-end systems. This architectural pattern of specialized models orchestrated by language model agents appears to be a general principle applicable beyond video generation.

Fourth, context management is a first-order concern for production systems, whether in language models or video models. Heuristic approaches to pruning context, compressing history, and selectively retrieving relevant information are currently necessary but should eventually be absorbed into the models themselves through training.

Fifth, synthetic data generation and prompt rewriting are critical infrastructure components that deserve significant investment. The quality of training data pairs and the sophistication of prompt expansion directly determine model capabilities.

Finally, the economics of production deployment require careful consideration of storage costs, data transfer costs, and inference costs, not just GPU training costs. For video models, storage and egress can actually exceed training costs at scale, making on-premises infrastructure increasingly attractive for large-scale deployments.
