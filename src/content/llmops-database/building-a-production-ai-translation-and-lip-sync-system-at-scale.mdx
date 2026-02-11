---
title: "Building a Production AI Translation and Lip-Sync System at Scale"
slug: "building-a-production-ai-translation-and-lip-sync-system-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "682728fd12dcb1df9cebbb2d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:08:28.495Z"
  createdOn: "2025-05-16T12:01:01.888Z"
llmopsTags:
  - "translation"
  - "speech-recognition"
  - "multi-modality"
  - "content-moderation"
  - "regulatory-compliance"
  - "model-optimization"
  - "error-handling"
  - "latency-optimization"
  - "human-in-the-loop"
  - "monitoring"
  - "microservices"
  - "scaling"
  - "reliability"
  - "guardrails"
  - "meta"
industryTags: "media-entertainment"
company: "Meta"
summary: "Meta developed an AI-powered system for automatically translating and lip-syncing video content across multiple languages. The system combines Meta's Seamless universal translator model with custom lip-syncing technology to create natural-looking translated videos while preserving the original speaker's voice characteristics and emotions. The solution includes comprehensive safety measures, complex model orchestration, and handles challenges like background noise and timing alignment. Early alpha testing shows 90% eligibility rates for submitted content and meaningful increases in content impressions due to expanded language accessibility."
link: "https://www.youtube.com/watch?v=qic02rpH6xA"
year: 2023
seo:
  title: "Meta: Building a Production AI Translation and Lip-Sync System at Scale - ZenML LLMOps Database"
  description: "Meta developed an AI-powered system for automatically translating and lip-syncing video content across multiple languages. The system combines Meta's Seamless universal translator model with custom lip-syncing technology to create natural-looking translated videos while preserving the original speaker's voice characteristics and emotions. The solution includes comprehensive safety measures, complex model orchestration, and handles challenges like background noise and timing alignment. Early alpha testing shows 90% eligibility rates for submitted content and meaningful increases in content impressions due to expanded language accessibility."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-ai-translation-and-lip-sync-system-at-scale"
  ogTitle: "Meta: Building a Production AI Translation and Lip-Sync System at Scale - ZenML LLMOps Database"
  ogDescription: "Meta developed an AI-powered system for automatically translating and lip-syncing video content across multiple languages. The system combines Meta's Seamless universal translator model with custom lip-syncing technology to create natural-looking translated videos while preserving the original speaker's voice characteristics and emotions. The solution includes comprehensive safety measures, complex model orchestration, and handles challenges like background noise and timing alignment. Early alpha testing shows 90% eligibility rates for submitted content and meaningful increases in content impressions due to expanded language accessibility."
---

## Overview

Meta has developed an AI-powered translation and lip-syncing system for video content, specifically targeting Reels on their platform. This case study, presented by multiple Meta engineers (Jordi, Amisha, and Shavan), provides a detailed look at how they built and deployed a complex multimodal AI pipeline that can take a video in one language, translate the audio to another language while preserving the speaker's voice characteristics, and generate lip-synced video frames that match the translated audio. The feature was announced at Meta Connect approximately one month before this presentation and is currently in alpha testing with a limited number of creators.

The system represents a significant production ML challenge: it requires orchestrating 10+ different AI models, processing at massive scale (potentially billions of videos), maintaining quality across diverse content types, and implementing robust safety measures to prevent misuse.

## End-to-End Pipeline Architecture

The overall system architecture follows a distributed workflow pattern. When a creator uploads content (in this case, a Reel) to Meta's platform, it is first stored in their distributed storage system called "Oil" (specifically designed for media handling). A translation request is then placed into a queue, and AI-enabled worker processes pick up these commands, download the media, perform the translation and lip-sync processing, and upload the results back to distributed storage.

On the consumption side, the system performs language-based content delivery. If a user's device is set to Spanish, they receive the Spanish translated version; if set to English, they receive the English original. This requires changes to Meta's playback stack to consider additional signals like language settings and optimize prefetch for a responsive user experience regardless of user location and language preferences.

## Audio Translation Pipeline

The audio translation pipeline sits at the core of the system and utilizes Meta's Seamless model, described as a "universal translator model" that was released the previous year. The Seamless model currently supports six languages and is designed to maintain prosody, emotions, and tone during translation to avoid robotic-sounding output.

### Pre-Processing Stage

The audio pipeline comprises multiple stages utilizing over 10 models:

**Audio Decoding**: Raw audio is decoded to PCM signals for processing.

**Eligibility Checks**: Before processing, content undergoes eligibility verification. This includes language identification (using a dedicated model) to ensure the source language is supported—for example, English to Hindi translation would fail since Hindi is not currently supported, while English to Spanish passes. Speech presence detection uses audio classifier models to verify there is significant speech content to translate.

**Sentence Splitting**: The Seamless model performs better on smaller audio segments, so the pipeline includes a sentence splitting stage. Rather than arbitrarily cutting audio (which could impact translation quality if splits occur mid-sentence), they use automatic speech recognition (ASR) to detect punctuation and sentence boundaries, combined with voice activity detection (VAD) to identify natural pauses. Based on these signals, audio is segmented at appropriate boundaries.

### Translation Stage

The pre-processed audio segments are passed to the Seamless model for translation.

### Post-Processing Stage

This stage addresses two significant challenges:

**Alignment and Time Stretching**: Different languages have varying verbosity levels. The example given is "I am going to the store" (6 words in English) translating to "voy a la tienda" (4 words in Spanish). Without adjustment, translated audio would be shorter and cause sync issues with the video. Meta developed a time stretching algorithm that speeds up or slows down translated audio as needed while ensuring the output doesn't sound rushed or unnaturally slow.

**Background Noise Handling**: The Seamless model was trained on clean audio data and doesn't perform well with noisy input. The team developed in-house algorithms to extract background noise during pre-processing and reintegrate it during post-processing, ensuring the final output sounds natural with ambient sounds preserved.

After post-processing, the translated audio is muxed with the original video and prepared for delivery.

## Video Lip-Sync Pipeline

The lip-sync component addresses a critical user experience issue: without lip synchronization, viewing translated content is "jarring" because the visual and audio elements don't match. Unlike traditional movie dubbing where humans carefully craft translations to match lip movements (sometimes sacrificing semantic accuracy), Meta needed to translate content at scale within minutes.

### Key Processing Steps

The workflow involves:

- Pre-processing translated audio and original video for frame conversion and async alignment
- Running the lip-sync model, which is described as "generalized" but further improved through one-shot training per user and language
- Generating lip-synced video frames
- Muxing lip-synced video with translated audio (including ambient sound matching)
- Preparing for optimal delivery via their ABR (adaptive bitrate) system

### Production Challenges

The team encountered significant challenges taking the model to production:

**Interface Design**: To avoid quality degradation, decoded and uncompressed frames are passed between models. This required careful interface and workflow design to avoid out-of-memory issues.

**Network Constraints**: Unlike lab experiments, network is a shared resource in production. Sending uncompressed frames over the network would cause bottlenecks, necessitating the development of streaming interfaces.

**Content Variability**: The original model was trained on short, clean voice samples, but production involves billions of videos with varying content lengths, background noises, edits, skin tones, and facial characteristics. This required deploying auxiliary models to complement the main model.

## Quality Evaluation Challenges

Measuring translation quality proved to be one of the most significant challenges. The team needed to assess multiple dimensions:

- Translation accuracy (correctness of translations)
- Expressivity (how well the system imitates the original speaker's rhythm)
- Voice similarity
- Lip-sync accuracy (whether lip movements match the target language)

Both reference-based and referenceless metrics correlated poorly with human perception, leading the team to invest heavily in subjective evaluation through human ratings. These ratings are inherently subjective, requiring complex statistical methods to remove variance and bias for consistent results between model iterations.

The team relies on subject matter expertise to analyze human ratings and create hypotheses for each model iteration to guide model development and tuning. The presenters acknowledge this approach is time-consuming and difficult to scale, and they identify measuring model quality as "a huge challenge and an open research problem."

## Safety and Integrity Measures

Meta emphasizes that safety and integrity were built into the system from inception, not added as an afterthought.

### Proactive Measures

- **Red Teaming**: Exercises were conducted to understand how the model responds to various inputs and when it produces critical errors or toxic output
- **Toxicity Detection**: They use a system referred to as "Minto" to detect and mitigate toxic translations during inference time
- **Watermarking**: Visual watermarks inform users that content is AI-generated, serving as a transparency indicator
- **Provenance Metadata**: An emerging industry standard that provides information about AI modifications to media, protecting against manipulation when content is shared off-platform

### Reactive Measures

- User controls for deleting bad translations
- Feedback mechanisms for users to report issues

## Production Results and Metrics

The feature is currently in alpha stage with limited creator access. While detailed metrics are not shared due to the early stage, the team reports:

- **Eligibility Rate**: 90% of media submitted for translation and lip-sync was successfully processed
- **Impressions**: Meaningful increase in impressions, attributed to content being available in more languages and accessible to more users
- **Creator Feedback**: Generally positive reception from the limited alpha creators

## Future Roadmap

The team outlined several planned improvements:

**Platform Development**: Building a robust platform to onboard new use cases faster and iterate on existing ones more quickly, creating a foundation for future media AI applications.

**Performance Optimization**: Reducing the time users wait for translation results.

**Better System Integration**: Improved integration with monitoring and experimentation systems.

**Feature Expansion**:
- Additional language support (input and output)
- Support for Reels with music tracks (most uploaded Reels contain music)
- Multiple speaker support (translating multiple voices in a single video with individual voice characteristics preserved)
- Overall quality improvements (translation accuracy, sentiment transfer, noise reduction)

## Key LLMOps Takeaways

This case study highlights several important LLMOps considerations:

The complexity of multimodal AI pipelines in production cannot be understated. Orchestrating 10+ models with dependencies, managing memory constraints, and handling network bandwidth in shared infrastructure requires careful system design.

The gap between model performance in controlled environments versus production reality is significant. Models trained on clean, short samples face billions of videos with diverse characteristics, requiring supplementary models and algorithms to maintain quality.

Quality evaluation remains a fundamental challenge. When subjective human perception doesn't correlate with objective metrics, teams must invest in expensive human evaluation processes while acknowledging these don't scale well.

Safety must be built in from the beginning, not bolted on later. The combination of proactive (red teaming, real-time toxicity detection) and reactive (user controls, feedback) measures demonstrates a comprehensive approach.

Finally, the emphasis on "platformism" indicates strategic thinking about building reusable infrastructure for AI capabilities rather than one-off solutions, enabling faster iteration and new use case development.