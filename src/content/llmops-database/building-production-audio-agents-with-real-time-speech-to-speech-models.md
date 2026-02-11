---
title: "Building Production Audio Agents with Real-Time Speech-to-Speech Models"
slug: "building-production-audio-agents-with-real-time-speech-to-speech-models"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6964c609343f960ded08f8f1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-01-12T10:13:16.573Z"
  createdOn: "2026-01-12T09:59:37.061Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "realtime-application"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "few-shot"
  - "evals"
  - "system-prompts"
  - "guardrails"
  - "monitoring"
  - "orchestration"
  - "crewai"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI's solution architecture team presents their learnings on building practical audio agents using speech-to-speech models in production environments. The presentation addresses the evolution from slow, brittle chained architectures combining speech-to-text, LLM processing, and text-to-speech into unified real-time APIs that reduce latency and improve user experience. Key considerations include balancing trade-offs across latency, cost, accuracy, user experience, and integrations depending on use case requirements. The talk covers architectural patterns like tool delegation to specialized agents, prompt engineering for voice expressiveness, evaluation strategies including synthetic conversations, and asynchronous guardrails implementation. Examples from Lemonade and Tinder demonstrate successful production deployments focusing on evaluation frameworks and brand customization respectively."
link: "https://www.youtube.com/watch?v=-OXiljTJxQU"
year: 2025
seo:
  title: "OpenAI: Building Production Audio Agents with Real-Time Speech-to-Speech Models - ZenML LLMOps Database"
  description: "OpenAI's solution architecture team presents their learnings on building practical audio agents using speech-to-speech models in production environments. The presentation addresses the evolution from slow, brittle chained architectures combining speech-to-text, LLM processing, and text-to-speech into unified real-time APIs that reduce latency and improve user experience. Key considerations include balancing trade-offs across latency, cost, accuracy, user experience, and integrations depending on use case requirements. The talk covers architectural patterns like tool delegation to specialized agents, prompt engineering for voice expressiveness, evaluation strategies including synthetic conversations, and asynchronous guardrails implementation. Examples from Lemonade and Tinder demonstrate successful production deployments focusing on evaluation frameworks and brand customization respectively."
  canonical: "https://www.zenml.io/llmops-database/building-production-audio-agents-with-real-time-speech-to-speech-models"
  ogTitle: "OpenAI: Building Production Audio Agents with Real-Time Speech-to-Speech Models - ZenML LLMOps Database"
  ogDescription: "OpenAI's solution architecture team presents their learnings on building practical audio agents using speech-to-speech models in production environments. The presentation addresses the evolution from slow, brittle chained architectures combining speech-to-text, LLM processing, and text-to-speech into unified real-time APIs that reduce latency and improve user experience. Key considerations include balancing trade-offs across latency, cost, accuracy, user experience, and integrations depending on use case requirements. The talk covers architectural patterns like tool delegation to specialized agents, prompt engineering for voice expressiveness, evaluation strategies including synthetic conversations, and asynchronous guardrails implementation. Examples from Lemonade and Tinder demonstrate successful production deployments focusing on evaluation frameworks and brand customization respectively."
---

## Overview

This case study documents OpenAI's approach to building production-ready audio agents, presented by their solution architecture team. The presentation focuses on the maturation of speech-to-speech models and the operational patterns needed to deploy them successfully in production environments. The talk is particularly valuable because it addresses not just the capabilities of the models themselves but the entire operational infrastructure needed to build, evaluate, and maintain voice-based applications at scale. Two brief customer examples are mentioned: Lemonade, an AI-focused insurance company, and Tinder with their chat experience, though the bulk of the content focuses on general patterns and best practices.

## Evolution of Audio Models and Production Readiness

The presentation begins by contextualizing audio agents within the broader multimodal era of generative AI. While text-based applications have dominated the production landscape, and image generation and understanding have matured significantly, audio represents the newest frontier approaching production viability. The critical insight is that audio models have reached a "tipping point" where they are "good enough" to build high-quality production applications at scale. This represents a fundamental shift from even six months prior, when models were characterized as slow, robotic, and brittle.

The improvement in model performance is demonstrated through a compelling before-and-after comparison. The older models exhibited initial delays of several seconds, robotic voice quality, and brittleness in handling interruptions or context changes. When asked to write a haiku about whispers but then interrupted to change the topic to stars, the old model instead wrote about sand, demonstrating poor conversational control. In contrast, current models respond with minimal latency, expressive and emotional vocal qualities, and accurate handling of interruptions and context switching. This dramatic improvement in model capabilities forms the foundation for considering serious production deployments.

## Architectural Patterns: Chained vs Speech-to-Speech

A critical architectural decision in building audio agents involves choosing between two fundamental approaches. The traditional "chained approach" stitches together three separate models: an audio transcription model converts speech to text, an LLM provides the intelligence layer, and a text-to-speech model generates audio output. While this approach has been available for some time, it suffers from significant drawbacks in production environments. The latency compounds across the three model calls, making real-time conversational experiences difficult. Additionally, there is semantic lossiness as information is transformed between modalities, potentially losing nuance, tone, or contextual information that exists in the original audio.

The emerging pattern that OpenAI advocates for is the speech-to-speech architecture, embodied in their real-time API. This approach consolidates the three stages into a single unified model that handles transcription, intelligence processing, and speech generation in one pass. The architectural simplification provides multiple benefits for production systems: dramatically reduced latency enabling true conversational experiences, elimination of semantic lossiness by maintaining audio context throughout, and simplified operational complexity by managing a single model endpoint rather than orchestrating three separate services.

## Trade-offs Framework for Production Deployment

A particularly valuable contribution of this presentation is the structured framework for thinking about production trade-offs when deploying audio agents. OpenAI identifies five key dimensions that must be balanced: latency, cost, accuracy and intelligence, user experience, and integrations and tooling. The critical insight is that the optimal architecture and configuration varies significantly based on the specific use case and business requirements.

For consumer-facing applications, the trade-offs prioritize user experience and latency above all else. These applications need to feel fast and engaging, with minimal delay between user speech and model response. Expressiveness matters more than perfect accuracy—the goal is natural conversation rather than precise information retrieval. Cost optimization becomes less critical because the value is in user engagement and satisfaction. Integrations remain relatively simple since these applications typically don't need to connect to complex enterprise systems or telephony infrastructure. For these use cases, the real-time API's speech-to-speech architecture provides clear advantages.

Customer service applications present a fundamentally different set of trade-offs. Here, accuracy and intelligence become paramount—getting an order number wrong or triggering the wrong action like deletion instead of update creates real business problems and customer dissatisfaction. Integration complexity increases substantially as the system must connect to internal business systems, CRM platforms, and potentially telephony providers through protocols like SIP. User experience remains important but becomes secondary to correctness and reliability. Latency matters but teams may accept slightly higher latency to ensure better accuracy. In these scenarios, the chained architecture may actually be preferable despite higher latency, because it can provide more deterministic behavior and tighter control over each processing stage.

This framework represents sophisticated operational thinking about production AI systems. Rather than advocating for one architecture as universally superior, it recognizes that production requirements vary and that successful deployment requires matching technical capabilities to business needs.

## Multi-Agent Architecture Patterns

Beyond the basic model architecture, the presentation outlines patterns for building more complex agent systems. A key pattern involves using the real-time API as a "frontline agent" that handles straightforward interactions but can delegate to specialized backend agents for more complex tasks. In a customer service context, the audio interface handles the conversational interaction and can answer easy questions directly. For harder questions requiring deeper reasoning or specialized knowledge, the frontline agent makes tool calls to other agents running more capable models like O3 or O4 mini behind the scenes.

This delegation pattern provides several production benefits. It optimizes cost by using the real-time API for what it does best—natural conversational interaction—while routing complex reasoning tasks to models better suited for those tasks. It maintains low latency for the conversational flow because the frontend agent remains responsive while asynchronously calling backend services. It also provides architectural flexibility to evolve different parts of the system independently. The demonstration shows a customer returning a snowboard, where the frontline agent authenticates the user and captures intent, then delegates to a backend agent running O4 mini to evaluate return policy rules and make the final determination.

This multi-agent orchestration represents a mature approach to production LLM systems, recognizing that no single model optimally handles all tasks and that system-level design matters as much as individual model capabilities.

## Prompt Engineering for Voice Applications

Prompt engineering for audio agents introduces new dimensions beyond traditional text-based applications. While text prompts control what the model should do and the content it should generate, voice applications also require controlling how the model should sound. This includes specifying the demeanor, tone, enthusiasm level, pacing, and emotional expressiveness of the generated speech. The prompt can instruct the model to sound professional and calm, or energetic and enthusiastic, or empathetic and soothing depending on the use case.

OpenAI provides a playground interface where developers can experiment with different voices and sample prompts to understand the range of expressiveness available. This testing environment is presented as an essential tool for understanding the "ceiling" of performance achievable through prompt engineering. The implication is that significant variation in production performance can result purely from prompt quality, making experimentation and iteration on prompts a critical operational activity.

For more complex conversational flows, the presentation recommends structuring prompts with explicit conversation stages. Each stage includes an identifier, a description of what should happen, and specific instructions for user interaction. This structured approach helps the model maintain context and progress through multi-turn conversations in a controlled manner. The pattern mirrors best practices from text-based agent development but adapted for the specific requirements of voice interactions where conversational flow and natural transitions become more critical.

## Tool Use and Context Management

Tool integration in audio agents follows similar principles to text-based agents but with specific operational considerations. The fundamental recommendation is to start simple and avoid connecting too many tools to a single agent. Rather than giving one agent access to 10 or 20 different tools, the system should delegate different task types to specialized agents, each with a focused set of tools. This aligns with the multi-agent architecture pattern and helps maintain system reliability and debuggability in production.

Handoff patterns become particularly important in voice applications. When transitioning from one agent to another, maintaining conversational context is essential for user experience. A recommended pattern involves summarizing the conversation state before handoff and passing that summary to the receiving agent. This prevents the loss of context that could make the conversation feel disjointed or require users to repeat information. The operational complexity of managing this context serialization and transfer represents a key consideration for production voice systems.

The delegation pattern for tool use is explicitly supported in OpenAI's agents SDK, suggesting that this is becoming a standardized approach to production agent development. The SDK provides native support for having one agent invoke another, such as having the real-time API agent call O3 mini or O4 mini for specialized tasks. This standardization reduces the custom infrastructure code needed to implement these patterns in production.

## Evaluation Strategies for Voice Agents

The presentation provides a structured four-tier approach to evaluating audio agents in production. The foundation is observability—collecting comprehensive traces of agent behavior including the audio inputs and outputs, intermediate states, and all tool calls. Without this telemetry infrastructure, teams cannot effectively understand system behavior or diagnose issues. The emphasis on starting with observability reflects mature operational thinking, recognizing that measurement precedes optimization.

The second tier involves human evaluation and labeling. While this may seem unsophisticated compared to automated evaluation approaches, the presentation emphasizes that human labeling is the most effective approach teams have found when working with customers. Having humans listen to conversations, label quality and issues, and iterate on prompts based on those observations enables rapid improvement. This pragmatic acknowledgment that human evaluation remains essential even for cutting-edge AI systems reflects realistic production experience.

The third tier introduces transcription-based evaluation, which applies more traditional automated evaluation techniques. This includes using LLMs as judges to evaluate conversation quality against rubrics, testing function calling accuracy against business criteria, and validating that the agent follows specified conversational patterns. These evaluations operate on transcribed text rather than raw audio, making them easier to implement and scale. They can assess whether the agent provides correct information, follows policy, and exhibits appropriate behavior.

The fourth tier addresses audio-specific evaluation needs. While most evaluation requirements can be met through transcription-based approaches, certain aspects like tone, pacing, and intonation are difficult to assess from text alone. For these aspects, teams can use audio-capable models like GPT-4 Audio to analyze the generated speech and evaluate whether it matches desired characteristics. This specialized audio evaluation handles the gap between what text transcriptions capture and what actually matters for user experience in voice applications.

An advanced evaluation approach mentioned is synthetic conversation generation. This involves creating two real-time clients that converse with each other: one representing the production agent being tested, and another representing various customer personas. By simulating many conversations between these agents and then extracting evaluations from the transcripts or audio, teams can generate large-scale evaluation datasets without requiring extensive human testing. This synthetic approach enables testing of edge cases and rare scenarios that might not appear frequently in initial deployments.

## Guardrails Implementation

Given the speed of real-time API responses, guardrails require careful implementation to balance safety with latency requirements. The recommended approach runs guardrails asynchronously rather than blocking the response pipeline. This is possible because the text generation from the real-time API completes faster than the audio synthesis and playback, creating a window where guardrails can execute without adding user-perceived latency. The system generates text, initiates audio synthesis, runs guardrails on the generated text in parallel, and can intervene before problematic audio reaches the user if issues are detected.

The implementation provides control over guardrail frequency through a configurable debounce period. The example code shows guardrails executing every 100 characters of generated text, but this threshold can be adjusted based on specific safety requirements and latency constraints. More frequent guardrail checks provide tighter safety controls but increase computational overhead, while less frequent checks reduce overhead but allow more content to generate before intervention. This configurability enables teams to tune the safety-performance trade-off for their specific use case.

## Customer Examples and Learnings

While the presentation focuses primarily on general patterns and practices, two brief customer examples provide insight into successful production deployments. Lemonade, described as an AI-focused insurance company, succeeded by focusing early on evaluation infrastructure, guardrails, and feedback mechanisms. Critically, they recognized that their initial evaluation approaches were not fully scalable but proceeded anyway, discovering that even imperfect evaluation infrastructure enabled faster iteration and improvement. This finding validates the staged evaluation approach and emphasizes that some evaluation is far better than perfect evaluation delayed.

Tinder's implementation of their chat experience prioritized customization and brand realism. They invested significantly in ensuring the voice experience matched their brand identity and created authentic-feeling interactions for their users. This focus on the expressiveness and personality dimensions of voice rather than purely technical metrics led to better user experience outcomes. The example reinforces that production success for consumer-facing audio applications depends as much on qualitative experience factors as technical performance metrics.

## Production Maturity Assessment

The presentation concludes with a clear assertion that speech-to-speech technology has reached production viability. The announcement of a new real-time API snapshot during the conference with improved performance reinforces this message. The framing emphasizes a "first mover advantage" opportunity, suggesting that the technology has crossed the threshold of usability but broad adoption has not yet occurred. This represents OpenAI's assessment that the technology is de-risked enough for serious production deployments while still offering competitive advantage to early adopters.

However, taking a balanced view, several considerations suggest caution. The dramatic improvements shown in the six-month comparison indicate the technology is still evolving rapidly, which creates operational challenges around version management and potential regressions. The need for careful trade-off analysis, multi-agent architectures, specialized prompt engineering, multi-tier evaluation systems, and asynchronous guardrails all indicate significant operational complexity. Organizations considering production deployments need substantial LLMOps maturity to handle these requirements. The technology may be ready, but successful deployment requires sophisticated operational capabilities that many organizations are still developing.

The emphasis on starting simple, iterating based on human feedback, and gradually scaling complexity represents sound operational advice. Rather than attempting to build comprehensive solutions immediately, teams should begin with focused use cases where the trade-offs align well with audio agent capabilities, establish strong observability and evaluation foundations, and expand scope as they develop operational expertise with the technology.