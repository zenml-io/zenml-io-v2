---
title: "Multimodal AI at Scale: Voice, Video, and Visual Generation for E-commerce and Enterprise Communication"
slug: "multimodal-ai-at-scale-voice-video-and-visual-generation-for-e-commerce-and-enterprise-communication"
draft: false
llmopsTags:
  - "customer-support"
  - "content-moderation"
  - "translation"
  - "speech-recognition"
  - "chatbot"
  - "caption-generation"
  - "multi-modality"
  - "realtime-application"
  - "prompt-engineering"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "few-shot"
  - "evals"
  - "multi-agent-systems"
  - "fine-tuning"
  - "vllm"
  - "fastapi"
  - "monitoring"
  - "google-gcp"
  - "nvidia"
industryTags: "tech"
company: "HeyGen / Elevenlabs / Photogen"
summary: "This panel discussion features three AI companies operating multimodal production systems at massive scale: PhotoRoom (20 million users processing 10 billion e-commerce images annually), ElevenLabs (voice AI serving major enterprises and creative studios), and HeyGen (40 million users generating 100+ million minutes of video). Each company addresses distinct production challenges: PhotoRoom ensures product fidelity for e-commerce imagery across 180 countries, ElevenLabs balances voice quality with sub-second latency for conversational agents, and HeyGen pioneered code-to-video generation for communication workflows. All three leverage Google's Gemini models alongside proprietary frontier models, employing sophisticated model orchestration, evaluation frameworks, and vertical specialization to maintain quality, cost-efficiency, and trust at global scale."
link: "https://www.youtube.com/watch?v=WgMx66iImXI&list=PLFZU5nT4APFA&index=56"
year: 2026
seo:
  title: "HeyGen / Elevenlabs / Photogen: Multimodal AI at Scale: Voice, Video, and Visual Generation for E-commerce and Enterprise Communication - ZenML LLMOps Database"
  description: "This panel discussion features three AI companies operating multimodal production systems at massive scale: PhotoRoom (20 million users processing 10 billion e-commerce images annually), ElevenLabs (voice AI serving major enterprises and creative studios), and HeyGen (40 million users generating 100+ million minutes of video). Each company addresses distinct production challenges: PhotoRoom ensures product fidelity for e-commerce imagery across 180 countries, ElevenLabs balances voice quality with sub-second latency for conversational agents, and HeyGen pioneered code-to-video generation for communication workflows. All three leverage Google's Gemini models alongside proprietary frontier models, employing sophisticated model orchestration, evaluation frameworks, and vertical specialization to maintain quality, cost-efficiency, and trust at global scale."
  canonical: "https://www.zenml.io/llmops-database/multimodal-ai-at-scale-voice-video-and-visual-generation-for-e-commerce-and-enterprise-communication"
  ogTitle: "HeyGen / Elevenlabs / Photogen: Multimodal AI at Scale: Voice, Video, and Visual Generation for E-commerce and Enterprise Communication - ZenML LLMOps Database"
  ogDescription: "This panel discussion features three AI companies operating multimodal production systems at massive scale: PhotoRoom (20 million users processing 10 billion e-commerce images annually), ElevenLabs (voice AI serving major enterprises and creative studios), and HeyGen (40 million users generating 100+ million minutes of video). Each company addresses distinct production challenges: PhotoRoom ensures product fidelity for e-commerce imagery across 180 countries, ElevenLabs balances voice quality with sub-second latency for conversational agents, and HeyGen pioneered code-to-video generation for communication workflows. All three leverage Google's Gemini models alongside proprietary frontier models, employing sophisticated model orchestration, evaluation frameworks, and vertical specialization to maintain quality, cost-efficiency, and trust at global scale."
notion:
  pageId: "398f8dff-2538-8077-89f9-e806419ae449"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T12:36:00.000Z"
  lastEditedTime: "2026-07-09T12:36:00.000Z"
  publishedAt: "2026-07-09T14:25:06Z"
---

This panel discussion provides a comprehensive look at how three AI companies have built and scaled multimodal production systems serving tens of millions of users globally. The companies represent different modalities but share common LLMOps challenges around model selection, inference optimization, quality assurance, and production reliability.

## Company Overview and Scale

**PhotoRoom** serves as the leading AI visual solution for e-commerce with 20 million active users processing approximately 10 billion generated images annually across 180 countries. Their customers range from Amazon and DoorDash to millions of small businesses selling online. The company's core challenge is maintaining 100% product fidelity while enabling creative generation capabilities, as mismatches between product images and actual products lead to expensive returns.

**ElevenLabs** has built voice AI technology that powers both creative workflows for major movie studios and agencies, as well as enterprise voice agent platforms processing tens of thousands of calls daily. Their technology serves use cases ranging from accessibility (voice cloning for ALS patients) to brand experiences requiring specific voice characteristics and emotional expressivity. They were named a Google partner of the year and have demonstrated the ability to scale to massive workloads, such as generating 50 years worth of player conversations with a cloned Darth Vader voice in Fortnite over just three weeks.

**HeyGen** operates an AI video platform with 40 million users generating 100 million minutes of video content, growing toward 200 million annual run rate. While initially known for talking avatar models, they have evolved into a comprehensive video communication platform supporting 170+ languages. Their focus is on business communication videos for training, marketing, and knowledge sharing rather than Hollywood-style cinematic content.

## Multimodal Production Challenges and Solutions

### Model Orchestration and Selection Strategy

All three companies employ sophisticated model orchestration strategies that balance general-purpose foundation models with specialized proprietary models. PhotoRoom articulated this as being part of a new category of "vertical expert" AI companies that make the most of generalist models while training frontier models for specific use cases in their domain. For PhotoRoom, this means best-in-class models for background removal and AI shadows that enable precise control over product presentation consistency.

The panelists emphasized that competition from large model providers like Google is actually beneficial for customers and that success comes from vertical integration and domain expertise. PhotoRoom's edge comes from understanding what images actually drive GMV (gross merchandise value) increases for e-commerce platforms. They provided a concrete example of increasing a large marketplace's GMV by 2% within two weeks through their e-commerce imaging expertise and integration with platforms like Shopify and direct marketplace connectors.

### Latency and Cost Optimization

Each company has developed distinct approaches to balancing quality, latency, and cost based on their specific use cases. PhotoRoom employs an internal inference team that runs optimized models on top of GCP, carefully routing requests between fast specialized models for simpler use cases and more powerful generalist models only when needed. They also implement user-based prioritization, ensuring enterprise customers receive priority while smaller business users experience slightly more patience-friendly response times during peak loads.

ElevenLabs faces the critical challenge that voice agents cannot have the 5-10 second response delays tolerable in chatbots. Their solution involves deep integration with enterprise systems and sophisticated model selection based on workflow requirements. For creative studio work where emotionality and directability matter most, they prioritize quality over speed. For high-volume enterprise call centers, they optimize for real-time response while maintaining voice quality. They leverage Google Gemini models as their most commonly recommended option for the combination of speed and accuracy in voice agent deployments.

HeyGen made a breakthrough discovery that fundamentally changed their architecture and approach to video generation. They found that Gemini Flash excels at what they call "visual coding" - using code to generate motion graphics and orchestrate video elements. This approach proved dramatically faster and more cost-effective than traditional generative video models. While models like Veil 3 cost approximately 24 cents per second of video generation, HeyGen's avatar models combined with code-based orchestration cost about 2 cents per second - one-tenth the cost. Moreover, code-based generation enables full video orchestration in under a minute, whereas parallelized generative approaches for a one-minute video can take 5-6 minutes.

### The Code-to-Video Innovation

HeyGen's code-based video generation approach represents a significant architectural innovation in multimodal AI production. They developed a framework called Hyperframes (HTML + frames, open-sourced and receiving 10,000 GitHub stars in two days) that converts HTML, CSS, and JavaScript into video frames. This approach leverages the insight that foundation models' neural networks contain massive amounts of visual information encoded as vectors, and these can be efficiently expressed through code rather than pixel-by-pixel generation.

The advantages of this approach extend beyond speed and cost. Code-based generation enables precise iteration and modification - when a user dislikes a specific segment of a generated video, they can modify just that code segment or ask the agent to adjust it, rather than regenerating the entire video. This level of control and editability is essential for business communication videos where users need consistent branding and specific messaging.

Their internal testing revealed that when they swapped in Gemini Flash for this visual coding task, the quality improvement was so dramatic that "every single generation was amazing," leading them to commit fully to the code-to-video architecture. They believe this approach represents the future of agentic video editing and creation, at least for communication-focused use cases rather than Hollywood cinematic applications.

## Production Infrastructure and Reliability

All three companies run production systems on Google Cloud Platform with different infrastructure patterns. PhotoRoom maintains an internal inference team focused on optimization and runs their own models on GCP infrastructure, giving them granular control over performance characteristics. ElevenLabs emphasized their close partnership with Google, noting that their CTO came from Google and they maintain a collaborative relationship that helped them become named partners of the year.

HeyGen openly acknowledged that "GCP sometimes is down" but praised Gemini Flash as "one of if not the best quality over cost and latency model" for their needs. They noted the critical importance of infrastructure reliability when processing hundreds of millions of minutes of video content.

The scale these companies operate at requires sophisticated infrastructure management. PhotoRoom processing 10 billion images annually across 180 countries requires geographic load balancing and regional optimization. ElevenLabs' demonstration of generating a day of audio in seconds requires substantial computational infrastructure and efficient resource allocation. HeyGen supporting 170+ languages with real-time translation and avatar generation demands globally distributed inference capabilities.

## Evaluation and Quality Assurance

HeyGen's VP of Engineering emphasized that evaluations (evals) are the only way to convince customers, especially those with extremely high standards like Apple, that their outputs meet requirements. He stressed that showing one impressive video is insufficient - systematic evaluation frameworks that demonstrate consistent quality across thousands of generations are essential for enterprise adoption. This evaluation-first approach proved critical in securing Apple as one of their largest enterprise customers.

PhotoRoom's approach to quality centers on product fidelity measurement and GMV impact tracking. Their evaluation framework ensures that generated product images maintain absolute fidelity to the actual products while optimizing for conversion. They measure success not just by image quality metrics but by actual business outcomes like marketplace GMV increases and reduction in product returns caused by image-product mismatches.

ElevenLabs focuses evaluation on voice quality, contextual understanding, and emotional expressivity. Their evaluation framework must validate that cloned voices maintain the unique characteristics that make voices recognizable and emotionally resonant. They also evaluate latency metrics to ensure voice agents can maintain natural conversational flow without the delays that frustrate users in traditional IVR systems.

## Multimodal Integration and Aha Moments

Each company described pivotal moments when multimodal capabilities unlocked new possibilities. PhotoRoom's initial attempt at text-prompted background generation in 2022 largely failed because users struggled with prompting. They pivoted to requiring inspiration images alongside text prompts, creating a true multimodal input approach. Their breakthrough Gemini-era feature was virtual model generation, where users provide a garment image, specify model characteristics through both images and text, and generate product photography with luxury brands now launching entire collections using PhotoRoom's virtual models.

ElevenLabs' defining moment came from a deeply emotional use case - cloning the voice of an ALS patient who had lost speech capability, enabling natural conversation between a mother and daughter. This demonstrated the profound impact of voice technology beyond commercial applications. Their Fortnite collaboration with Epic Games, powered by GCP, showed their ability to scale to consumer gaming workloads while maintaining the voice quality and low latency required for real-time character interactions.

HeyGen's breakthrough came from observing Gemini Flash's exceptional performance at visual coding. Within a week of this discovery, they made the strategic decision to completely rearchitect their video generation pipeline around code-based orchestration. This enabled them to offer their users comprehensive motion graphics, text overlays, and visual elements that users previously lacked the time or technical skills to create. They found these enhanced communication capabilities became table stakes for their users across training, knowledge sharing, and marketing use cases.

## The Role of Specialized Models

Despite leveraging foundation models extensively, all three companies maintain proprietary specialized models as core differentiators. PhotoRoom trains frontier models for background removal and AI shadow generation that outperform general-purpose models for e-commerce specific requirements. These specialized models enable the precise control over lighting, shadows, and product presentation that e-commerce platforms require for consistent brand experiences.

ElevenLabs maintains a library of over 11,000 voices and specialized models for voice cloning, voice generation from scratch, and emotional expression. Their depth in voice technology extends beyond what general-purpose multimodal models offer, providing the range and quality enterprises need when voice is central to their brand experience. They also developed "voice engine" technology that can handle voice orchestration on top of existing chat agents or integrations, allowing customers to leverage their existing infrastructure while upgrading the voice experience.

HeyGen's avatar models represent years of focused research on what makes avatars appear realistic, accurate, and natural. They note that research quality depends not just on data and algorithms but on researchers' eyes for quality - the human judgment required to label outputs as better or worse. This dedicated focus on avatar quality enables them to offer models that are one-tenth the cost of general-purpose video models while delivering superior results for their specific use case of talking avatars for business communication.

## Enterprise Deployment Patterns

The companies serve different enterprise deployment patterns but share common themes around customization, integration, and trust. PhotoRoom integrates directly with e-commerce platforms, marketplaces, and point-of-sale systems to fit seamlessly into existing merchant workflows. Their camera-to-Shopify pipeline represents the kind of vertical integration that creates real moats in the AI application layer.

ElevenLabs offers multiple deployment options including core APIs for builders, a voice agent platform with configurable models (including all Google Gemini models as frequently recommended options), and creative platforms for studio workflows. Their field deployment engineering team works closely with enterprises to integrate voice technology into support, training, sales, and marketing workflows. They emphasize that they are the only voice agent platform that is both certifiable and insurable, addressing enterprise security and compliance requirements.

HeyGen's enterprise customers like Apple require extremely high quality standards and extensive evaluation evidence before adoption. HeyGen has built internal workflows using their own technology - conducting weekly team standups via video rather than traditional meetings - demonstrating their conviction in video as a superior communication medium for business contexts. This internal adoption validates their thesis that video communication will expand beyond traditional use cases as creation becomes sufficiently easy and cost-effective.

## Cost Economics and Business Model Implications

The cost economics these companies have achieved enable new business models and use cases. PhotoRoom's efficiency allows millions of small businesses to access professional-grade product photography that was previously only economically viable for large retailers with dedicated photo studios. They noted that large e-commerce platforms are canceling plans to invest millions in new photo studios because PhotoRoom can generate full product listings from just five photos or a short video.

ElevenLabs' pricing enables use cases ranging from high-volume call centers to creative studios, with different price-performance tradeoffs for different workflows. Their work with nonprofits like Bridging Voices demonstrates that voice cloning has become economically accessible for accessibility applications that create profound human impact.

HeyGen's 2-cents-per-second video generation cost, combined with their rapid generation speed, makes it economically viable for individuals to create training videos, marketing content, and even daily team communications via video. This represents a fundamental shift where video creation moves from special-occasion content requiring dedicated teams to everyday communication medium accessible to all employees.

## Future Direction and Human-AI Collaboration

The panelists converged on a vision where humans become "directors" of AI agents rather than operators of tools. PhotoRoom's founder described how his frustration with spending time on visual tooling rather than storytelling inspired the company's creation. The future he envisions involves creators directing thousands of visual agents to produce personalized content at scale - 10,000 customers receiving 10,000 unique virtually try-on images, with humans serving as brand guardians who validate outputs and ensure consistency.

ElevenLabs emphasized that no technology could replace authentic human storytelling and creative direction, but multimodal AI dramatically expands what individual creators can accomplish. They position their team members as "managers" with agents working for them, freeing humans to focus on emotional resonance and creative decisions rather than technical execution.

HeyGen's vision centers on enabling users to focus exclusively on message and story while their technology handles execution. They believe communication video will expand dramatically as creation becomes effortless, with video replacing documents and presentations for many business communication scenarios. Their internal adoption of video standups demonstrates this shift already happening.

## Key Takeaways for LLMOps Practitioners

Several critical lessons emerge from these production deployments at scale. First, vertical specialization creates sustainable competitive moats even as foundation models rapidly improve. Understanding domain-specific quality requirements and building evaluation frameworks around business outcomes rather than just technical metrics proves essential for enterprise adoption.

Second, model orchestration strategy matters enormously for production economics. Intelligently routing requests between fast specialized models and powerful general-purpose models based on use case complexity enables better cost-performance tradeoffs than uniform approaches. The companies emphasized having internal teams focused specifically on inference optimization and pipeline efficiency.

Third, code generation represents an underutilized approach for certain multimodal outputs. HeyGen's success with code-to-video generation suggests practitioners should explore whether intermediate code representations might be more efficient than direct generation for their specific use cases, particularly when iteration and precise control matter.

Fourth, evaluation frameworks must address the specific trust requirements of your vertical. Product fidelity for e-commerce, emotional authenticity for voice, and professional polish for business video all require domain-specific evaluation approaches. Generic model benchmarks provide limited signal for production success.

Finally, global scale requires careful attention to infrastructure reliability, geographic distribution, cost management across different user tiers, and graceful degradation strategies. The companies' willingness to discuss production challenges candidly - including acknowledging occasional infrastructure downtime - reflects the operational maturity required for production multimodal AI systems.
