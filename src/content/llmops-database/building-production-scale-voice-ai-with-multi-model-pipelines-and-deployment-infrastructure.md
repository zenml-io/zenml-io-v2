---
title: "Building Production-Scale Voice AI with Multi-Model Pipelines and Deployment Infrastructure"
slug: "building-production-scale-voice-ai-with-multi-model-pipelines-and-deployment-infrastructure"
draft: false
llmopsTags:
  - "customer-support"
  - "translation"
  - "speech-recognition"
  - "content-moderation"
  - "healthcare"
  - "chatbot"
  - "realtime-application"
  - "multi-modality"
  - "caption-generation"
  - "fine-tuning"
  - "model-optimization"
  - "knowledge-distillation"
  - "latency-optimization"
  - "few-shot"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "evals"
  - "fastapi"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "pytorch"
  - "tensorflow"
  - "openai"
  - "google-gcp"
  - "meta"
  - "anthropic"
  - "microsoft-azure"
  - "nvidia"
  - "hugging-face"
industryTags: "tech"
company: "ElevenLabs"
summary: "ElevenLabs, founded by Mati and his co-founder from Poland, built frontier voice AI models to solve audio generation, transcription, and translation problems at scale. Starting in 2022 with text-to-speech models trained on modest compute budgets, they evolved a cascaded architecture combining speech-to-text, LLMs, and text-to-speech models to power applications from audiobook narration to real-time voice agents. By focusing on product-led growth, staying close to users through Discord communities, and building deployment infrastructure for enterprise customers, they scaled from under $2M to over $430M ARR in 36 months with a team of 450 people, serving use cases ranging from content localization to customer support automation while maintaining quality, reliability, and emotional expressiveness in voice outputs."
link: "https://www.youtube.com/watch?v=TnL10oBZc6U"
year: 2026
seo:
  title: "ElevenLabs: Building Production-Scale Voice AI with Multi-Model Pipelines and Deployment Infrastructure - ZenML LLMOps Database"
  description: "ElevenLabs, founded by Mati and his co-founder from Poland, built frontier voice AI models to solve audio generation, transcription, and translation problems at scale. Starting in 2022 with text-to-speech models trained on modest compute budgets, they evolved a cascaded architecture combining speech-to-text, LLMs, and text-to-speech models to power applications from audiobook narration to real-time voice agents. By focusing on product-led growth, staying close to users through Discord communities, and building deployment infrastructure for enterprise customers, they scaled from under $2M to over $430M ARR in 36 months with a team of 450 people, serving use cases ranging from content localization to customer support automation while maintaining quality, reliability, and emotional expressiveness in voice outputs."
  canonical: "https://www.zenml.io/llmops-database/building-production-scale-voice-ai-with-multi-model-pipelines-and-deployment-infrastructure"
  ogTitle: "ElevenLabs: Building Production-Scale Voice AI with Multi-Model Pipelines and Deployment Infrastructure - ZenML LLMOps Database"
  ogDescription: "ElevenLabs, founded by Mati and his co-founder from Poland, built frontier voice AI models to solve audio generation, transcription, and translation problems at scale. Starting in 2022 with text-to-speech models trained on modest compute budgets, they evolved a cascaded architecture combining speech-to-text, LLMs, and text-to-speech models to power applications from audiobook narration to real-time voice agents. By focusing on product-led growth, staying close to users through Discord communities, and building deployment infrastructure for enterprise customers, they scaled from under $2M to over $430M ARR in 36 months with a team of 450 people, serving use cases ranging from content localization to customer support automation while maintaining quality, reliability, and emotional expressiveness in voice outputs."
notion:
  pageId: "34df8dff-2538-809d-82c7-fc2bea64726d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-25T13:55:00.000Z"
  lastEditedTime: "2026-04-25T13:55:00.000Z"
  publishedAt: "2026-04-26T09:56:21Z"
---

## Overview

ElevenLabs represents a comprehensive case study in building and deploying frontier AI models at production scale, specifically in the audio and voice domain. The company was founded to solve the problem of poor voice-over and dubbing quality, particularly for non-English content. The founders, both from Poland and previously at Google and Palantir, identified a specific pain point where Polish dubbed content used a single monotone voice for all characters regardless of gender or emotion. This led them to pursue AI-powered dubbing that could preserve voice characteristics, intonation, and emotions across languages.

The company's journey illustrates critical LLMOps principles including model architecture decisions, deployment strategies, user feedback loops, enterprise platform development, and the operational challenges of scaling AI systems from research prototypes to production services handling hundreds of millions in revenue.

## Technical Architecture Evolution

ElevenLabs' technical evolution demonstrates sophisticated thinking about model architecture in production settings. The core insight was recognizing that AI dubbing requires three distinct model components working together: speech-to-text transcription to understand the original audio, language models for translation and reasoning, and text-to-speech for regenerating audio in the target language with preserved characteristics. This cascaded architecture became foundational to their approach.

In 2022, when the company started, they faced a critical decision about which component to focus on first. Rather than attempting to solve the entire dubbing pipeline simultaneously, they concentrated on text-to-speech as the highest-value, most tractable problem. At the time, existing models couldn't replicate voices with the same characteristics and couldn't make audio sound natural with appropriate emotional delivery. The breakthrough came from applying transformer concepts and emerging diffusion techniques to audio, allowing models to understand context across longer text passages and deliver appropriate emotional tone rather than reading sentences in isolation.

The initial models were relatively small by today's standards, in the hundreds of millions of parameters, trained on compute budgets in the tens to low hundreds of thousands of dollars obtained through accelerator programs like NVIDIA Inception. This modest resource requirement allowed rapid iteration and experimentation. The team drew inspiration from open source work, particularly the Tortoise TTS model created by James Betker as a side project, which demonstrated human-like delivery on short fragments but had severe limitations in generation speed and stability on longer content.

By 2023, they expanded their model suite to include multilingual capabilities, voice cloning allowing users to recreate their own voices, and a voice marketplace where people could contribute voices for others to use. This required significant infrastructure for managing voice datasets, handling user-generated content, and ensuring quality control across different languages and accents.

The 2024 breakthrough came in AI localization when all three model components finally worked together reliably. This enabled high-profile demonstrations like dubbing Javier Milei's UN speech from Argentinian Spanish to English while preserving his distinctive delivery style, and similar work with Lex Fridman's interviews of world leaders. These demonstrations validated the cascaded approach and showed that the quality threshold for production use had been reached.

In 2025, real-time voice agents became viable as latency optimizations allowed the cascaded pipeline to operate with acceptable response times. This opened entirely new use cases in customer support, sales, and interactive applications where conversational AI needed to feel natural and responsive.

## Cascaded vs. Fused Architectures

A central LLMOps consideration discussed extensively is the architectural choice between cascaded models and fused omni-models. In cascaded architectures, separate models handle speech-to-text, language reasoning, and text-to-speech, with explicit handoffs between stages. In fused approaches, a single model handles the entire pipeline end-to-end, potentially processing audio tokens directly without intermediate text representations.

The cascaded approach offers several production advantages. Each component can be optimized independently, making debugging and improvement more tractable. When something fails in production, teams can isolate which stage caused the problem. Reliability is higher because the intelligence layer can use state-of-the-art language models that are constantly improving, and tool calling integration for tasks like database lookups or payment processing is more straightforward when there's an explicit text reasoning stage.

However, cascaded architectures introduce latency at each handoff point and lose information. When speech is transcribed to text, prosody, emotion, and speaker characteristics disappear unless explicitly captured as metadata. ElevenLabs addressed this by developing emotion detection in the transcription stage, passing emotional state as parameters to the language model, which then guides the text-to-speech generation to match the appropriate tone. This required creating custom labeled datasets over the past year to train models that could reliably detect whether speech was peppy, sad, stressed, or other emotional states.

Fused models promise lower latency, with response times around 300 milliseconds, and can preserve audio characteristics throughout the pipeline. But they sacrifice reliability and controllability. When a fused model generates problematic output, it's difficult to determine what went wrong or apply guardrails at intermediate stages. For enterprise use cases where reliability matters more than minimal latency, such as financial transactions or healthcare interactions, cascaded architectures are preferable. For use cases like companion AI where low latency and emotional continuity matter more than perfect reliability, fused models may be better suited.

ElevenLabs is actively researching both approaches, anticipating that future systems might dynamically switch between architectures depending on context. For instance, an airline booking agent might use a fused model for general information queries where speed matters, then switch to a cascaded architecture when the user needs to authenticate and make a payment where reliability and security are paramount.

## Deployment and Platform Engineering

The deployment strategy evolved from product-led growth focused on creators and developers to a hybrid model where over 50% of revenue comes from enterprise deployments. This required building substantial deployment infrastructure and what they call a "deployment engineering" team that works alongside enterprise customers to integrate AI capabilities into existing systems.

Enterprise deployments involve far more than just model APIs. Customers need the entire knowledge base of their business encoded and accessible, integration with existing tools like Salesforce and ServiceNow for data retrieval, multi-channel support for phone, chat, WhatsApp, and email, authentication and security frameworks, and comprehensive evaluation and monitoring systems to ensure the AI is working correctly and improving over time.

The evaluation and monitoring infrastructure is particularly critical for production LLM systems. ElevenLabs emphasizes domain-specific tests, such as verifying that an airline booking agent correctly checks seat availability or that a healthcare agent uses proper medical nomenclature. These tests run continuously against production traffic, with teams tracking whether customers are left satisfied and whether the system meets latency and quality targets. This monitoring feeds back into model improvement cycles, creating a flywheel where production usage generates data that improves models, which improves products, which generates more usage.

Pricing and packaging required careful consideration. The company adopted a value-based pricing strategy rather than cost-based, aiming to capture approximately one-tenth of the value delivered to customers. For self-serve users, this meant consumption-based pricing that scales with usage while providing access to the same state-of-the-art models available to enterprise customers, with differences mainly in concurrency limits and compliance features. This democratization of access was intentional, allowing individual developers and one-person projects to build with the same capabilities as major corporations.

## Operational Practices and Culture

Several operational practices enabled rapid scaling with a relatively lean team. The company organized into small teams of fewer than 10 people, each with significant ownership and autonomy to make independent decisions. Speed of learning and iteration was prioritized over process and consensus-building. This structure allowed simultaneous innovation across multiple fronts including foundational model research, transcription, translation, text-to-speech, conversational AI, music generation, and various platform capabilities.

The early decision to run the company on Discord, later migrated to Slack, reflected a philosophy of staying close to users and maintaining tight feedback loops. The community became a source of use case discovery, revealing applications the founders hadn't anticipated and providing rapid validation of whether new capabilities met real needs. This product-led growth motion was essential for understanding what quality thresholds mattered and what features to prioritize.

User feedback directly informed research priorities. When early customers expressed interest in dubbing but also asked for simpler voice-over corrections and narration capabilities, the team pivoted from trying to solve the entire dubbing pipeline to focusing on text-to-speech excellence. This pragmatism about finding the highest-value solvable problem rather than the most ambitious moonshot enabled faster time to market and revenue generation that funded further research.

## Research and Model Development

The model development process balanced open source inspiration, academic paper insights, and proprietary innovation. The team systematically reviewed what was available in open source versus closed source, examined recent academic papers for techniques that might apply to audio even if developed for other domains, and identified gaps where new architectural approaches could advance the state of the art.

Key innovations included keeping voice parameters more abstracted rather than hard-coding characteristics like gender, accent, and age, allowing models to learn richer representations. Applying context-aware techniques from language modeling to audio generation enabled models to understand that a sentence should be delivered happily or as dialogue based on surrounding context rather than treating each sentence in isolation. The development of controllability mechanisms allowed creators to direct performances with instructions like "redeliver this more dramatically while slowing down," which was essential for professional adoption in studios and content creation.

The research roadmap explicitly balanced multiple time horizons. Short-term work focused on shipping production features customers needed immediately. Medium-term research targeted 2-3 year breakthroughs in conversational models and multi-modal fusion. Longer-term exploration considered 5-year horizons where they aim to remain at the frontier of audio AI research, potentially expanding beyond voice to visual avatars and other interactive modalities.

Compute management became increasingly important as models scaled. While early experiments cost tens of thousands of dollars, production models now require significantly more resources. The team noted that necessity can drive innovation, and having constrained compute sometimes forces more creative solutions than unlimited resources would. They also mentioned that as models become more incremental in improvement, the focus shifts from pure model capability to understanding and solving specific customer problems with tailored tooling.

## Safety, Security, and Ethics

Operating at the frontier of voice AI raised significant safety and ethical considerations. Voice cloning technology can be misused for fraud and scams, requiring robust safeguards. ElevenLabs built safety into their models at multiple levels: content tracing to identify who generated what audio and take action against abuse, pre-generation moderation to prevent fraud before harmful content is created, and watermarking systems that can identify AI-generated audio.

They advocate strongly against using voice for authentication, arguing it's fundamentally insecure given the state of voice cloning technology. Instead, they recommend multi-factor authentication and other verification methods. Interestingly, they also worked with charities that used voice agents defensively, detecting likely scammers by IP address and routing them to voice agents designed to waste their time, a form of counter-offensive against abuse.

The company takes a clear stance on geopolitical issues, choosing to be Western-allied and working with governments and companies in Western nations and their allies. This included significant work with the Ukrainian government during the war, helping them build citizen services accessible via voice agents through the DIA app, enabling people to access government services, educational content, and information when traditional infrastructure was disrupted. This required navigating complex questions about deploying AI in conflict zones while providing genuine humanitarian value.

On the question of IP and content rights, particularly for creative industries, ElevenLabs emphasizes a middle-to-middle approach rather than end-to-end automation. Their tools are designed for iterative refinement where creators start with a vision, use AI to generate initial content, refine it, and iterate until achieving their desired result. This positions AI as augmenting rather than replacing creative work. They also created a voice marketplace where people can license their voices, ensuring appropriate compensation when their voice characteristics are used by others.

## Competitive Dynamics and Ecosystem Collaboration

The case study reveals a nuanced approach to competition and collaboration. Rather than viewing other voice AI companies as pure competitors, the leadership actively collaborated, shared insights, and cross-invested as angel investors. This ecosystem mindset recognizes that the frontier is vast enough for multiple approaches and that collaboration often advances the entire field faster than zero-sum competition.

The discussion of open source models from China highlights both technical and strategic considerations. Chinese labs have produced strong audio models optimized for their languages and use cases, sometimes with different approaches to IP rights and data usage than Western companies. ElevenLabs aims to compete by providing better service, stronger safety guarantees, and trusted brand relationships while also building into their models protections against distillation attacks where competitors try to extract IP by querying APIs.

The broader open source ecosystem is viewed as essential for enabling innovation, allowing researchers and developers to fine-tune models for specific domains and use cases. ElevenLabs hopes Western open source models remain competitive with or superior to Chinese alternatives, enabling a vibrant ecosystem of builders who need access to model weights for specialized applications.

## On-Device and Future Directions

Recent breakthroughs enabled on-device deployment of ElevenLabs models, though with important quality tradeoffs. By constraining to a single language, they achieved models small enough to run on consumer devices. However, on-device versions currently only handle text-to-speech generation, lacking the full transcription, emotion detection, and real-time interaction capabilities of cloud-based systems. The quality gap means on-device is viable for some use cases but not yet a full replacement for cloud deployment.

Looking forward, the company sees three to five major platforms emerging as the go-to solutions for conversational AI, analogous to how a few cloud providers dominate compute infrastructure. They aim to be one of these platforms, providing not just models but comprehensive tooling for businesses to deploy AI in customer support, sales, marketing, internal training, and other domains. The boundary between platform and application is expected to blur as AI makes it easier to create custom applications on top of platforms, with ElevenLabs providing modular building blocks that developers and businesses can assemble for their specific needs.

The vision extends beyond pure business applications to social impact, having already helped nearly 10,000 people who lost their voices due to ALS, throat cancer, and other conditions by synthesizing their voices for communication. This demonstrates how frontier AI capabilities can be directed toward humanitarian applications alongside commercial ones.

## Key Takeaways for LLMOps

This case study illustrates several critical LLMOps principles for production AI systems. Architectural decisions between cascaded and fused approaches have profound implications for reliability, latency, and debuggability that vary by use case. Staying extremely close to users and maintaining rapid feedback loops is essential for understanding what quality thresholds matter and what features deliver value. Small, autonomous teams with clear ownership can innovate faster than large hierarchical organizations, especially when shipping is prioritized over process. Value-based pricing aligned with customer outcomes is more sustainable than cost-based pricing, particularly as model costs decrease over time.

Production AI requires far more than just good models, including evaluation frameworks, monitoring systems, integration tooling, and deployment engineering to bridge from general capabilities to specific customer problems. Safety and ethics must be built into models and systems from the start rather than added as afterthoughts. Collaboration and ecosystem thinking can advance the frontier faster than pure competition, especially in nascent technology spaces. The path from research breakthrough to production deployment often takes 12-24 months as quality reaches acceptable thresholds and supporting infrastructure is built.

Finally, the case demonstrates that operating at the frontier requires simultaneously pushing research boundaries, solving immediate customer problems, and building platform infrastructure for the future. Success at scale comes from balancing all three rather than focusing exclusively on any single dimension.
