---
title: "Voice AI Agent Development and Production Challenges"
slug: "voice-ai-agent-development-and-production-challenges"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67d7f84eba25e79fea9b82e5"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:03:49.582Z"
  createdOn: "2025-03-17T10:24:14.309Z"
llmopsTags:
  - "speech-recognition"
  - "chatbot"
  - "customer-support"
  - "healthcare"
  - "realtime-application"
  - "prompt-engineering"
  - "rag"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "fastapi"
  - "monitoring"
  - "google-gcp"
  - "openai"
  - "amazon-aws"
industryTags: "tech"
company: "Various (Canonical, Prosus, DeepMind)"
summary: "Panel discussion with experts from various companies exploring the challenges and solutions in deploying voice AI agents in production. The discussion covers key aspects of voice AI development including real-time response handling, emotional intelligence, cultural adaptation, and user retention. Experts shared experiences from e-commerce, healthcare, and tech sectors, highlighting the importance of proper testing, prompt engineering, and understanding user interaction patterns for successful voice AI deployments."
link: "https://www.youtube.com/watch?v=QgsOiNm2pZs"
year: 2023
seo:
  title: "Various (Canonical, Prosus, DeepMind): Voice AI Agent Development and Production Challenges - ZenML LLMOps Database"
  description: "Panel discussion with experts from various companies exploring the challenges and solutions in deploying voice AI agents in production. The discussion covers key aspects of voice AI development including real-time response handling, emotional intelligence, cultural adaptation, and user retention. Experts shared experiences from e-commerce, healthcare, and tech sectors, highlighting the importance of proper testing, prompt engineering, and understanding user interaction patterns for successful voice AI deployments."
  canonical: "https://www.zenml.io/llmops-database/voice-ai-agent-development-and-production-challenges"
  ogTitle: "Various (Canonical, Prosus, DeepMind): Voice AI Agent Development and Production Challenges - ZenML LLMOps Database"
  ogDescription: "Panel discussion with experts from various companies exploring the challenges and solutions in deploying voice AI agents in production. The discussion covers key aspects of voice AI development including real-time response handling, emotional intelligence, cultural adaptation, and user retention. Experts shared experiences from e-commerce, healthcare, and tech sectors, highlighting the importance of proper testing, prompt engineering, and understanding user interaction patterns for successful voice AI deployments."
---

## Overview

This case study is derived from a panel discussion on voice AI agents featuring practitioners from multiple organizations: Kiara from Prosus (a global technology company with approximately one billion customers across e-commerce, food delivery, fintech, and classifieds), Monica from Google's speech synthesis group (with 14+ years experience), Rex (a solopreneur with background at Amazon Alexa), and Tom from Canonical (which builds observability tools for voice AI agents). The discussion provides valuable insights into the operational challenges of deploying voice AI agents in production environments, drawing from real-world experiences across various industries including e-commerce, edtech, and healthcare.

## The Fundamental Challenge: Voice is Different from Text

A central theme throughout the discussion is that voice AI agents present fundamentally different challenges compared to text-based LLM applications. As Rex noted, LLMs are already challenging due to their non-deterministic nature, making testing and enforcing predictability difficult. Voice adds multiple additional layers of complexity on top of this foundation.

Kiara shared a concrete example from Prosus's work building an e-commerce agent that could browse the web and perform tasks for users. When they attempted to use the same text prompts that worked for their text-based agent with OpenAI's real-time API for voice, it "failed miserably." The key insight is that with text, everything is nicely structured and visible, allowing for significant control. Voice interactions lack this structure and introduce entirely new dimensions of user experience that must be carefully managed.

## Latency and Tool Calling Challenges

One of the most significant production challenges discussed was latency management. Users become frustrated if the agent doesn't respond immediately, which has major implications for tool calling in LLM-powered agents. When an agent needs to perform an action or retrieve information, the traditional approach of waiting for the tool to complete before responding simply doesn't work in voice contexts.

The Prosus team developed several strategies to address this:

- **Minimizing tool call duration**: Tool calls need to be as short as possible because users require constant feedback during the interaction.
- **Leveraging streaming events**: Using WebSocket or WebRTC connections to provide real-time updates to users. For example, when starting a web search, the agent can inform the user that it's beginning and allow them to interrupt or interact during the process.
- **Asynchronous processing for slow operations**: For particularly slow processes like completing a purchase, the agent informs the user upfront, allows them to disconnect, and follows up via SMS when complete.

This represents a significant departure from typical LLM application architectures where tool calls can happen synchronously without immediate user feedback requirements.

## Handling User Input Ambiguity

The panelists identified user input handling as a critical operational concern. Voice input can be vague and difficult to interpret, especially when dealing with postal addresses, names, and spelling. A key observation was that current voice AI systems lack self-awareness about their limitations—they don't recognize when they've misheard or misunderstood input.

Production strategies to address this include:

- **Avoiding flows that require spelling**: Letters are particularly problematic for current models to both speak and understand. Practitioners need to design around this limitation rather than expecting the models to handle it.
- **User authentication via phone number**: Recognizing users through their phone number rather than having them spell out identifying information.
- **Structured input collection**: Breaking down complex tasks into structured components and using the agent to fill in required fields while explicitly asking users about missing information.
- **Leveraging other input modalities**: Having users enter sensitive or complex data through an application interface rather than voice.

## Testing and Evaluation Strategies

Testing emerged as a major topic, with panelists acknowledging that voice agents behave completely differently in production compared to controlled development environments. The gap between demo quality and production quality is substantial.

Kiara described Prosus's approach to building robust test sets:

- **Synthetic test data generation**: Using OpenAI's real-time API to simulate different interaction scenarios with varied languages, emotions, and speaking styles.
- **Environmental variation**: Testing with different types of background noise, reflecting real-world conditions like a food delivery driver in traffic in São Paulo.
- **Dialect and language coverage**: Ensuring testing covers regional variations, as models are typically trained primarily on English and may perform poorly with other languages or dialects.
- **Emotional variation**: Testing how agents handle users in different emotional states, including anger or frustration.

Tom from Canonical emphasized the importance of observability in production, noting that his company helps builders "see what's happening in production when real humans are interacting with their agents." This reflects the broader challenge that controlled testing cannot fully replicate the unpredictability of real user interactions—as Tom colorfully quoted, "Everybody's got a plan until they get punched in the face."

## Voice Quality and Emotional Responsiveness

Monica from Google brought a unique perspective on the technical challenges of voice synthesis and emotional responsiveness. She highlighted that achieving a natural-sounding voice is only the beginning—production agents must also interpret and respond to emotional nuances in user speech.

The challenge extends beyond simple empathy. As Rex noted, while prompts typically include instructions to be "empathetic," true emotional responsiveness requires a range of appropriate responses. Sometimes empathy isn't the right response; the agent needs to match the emotional context of the conversation appropriately.

Monica raised an important point about the "uncanny valley" in voice AI—users are currently uncertain about whether they're talking to humans or AI, and there's often reluctance to engage fully. She suggested this will change over time but represents a current barrier to adoption.

## Product Definition and Scope Management

A recurring theme was the importance of clear product definition before building voice agents. Monica emphasized being "eternally frustrated with very vague product definitions" because voice is so complex that trying to build a comprehensive solution often leads to failure.

The recommended approach is to:

- **Define a strong MVP and stick to it**: Don't add extras until the core experience is solid.
- **Match voice characteristics to the use case**: Rather than asking "what's the most natural-sounding voice," ask "what's the most appropriate voice for this application."
- **Be risk-averse with emotional tone**: In cases of doubt, design products that err on the side of safety and positive user impact.
- **Consider the deployment environment**: Voice selection should account for factors like background noise in the environment where the voice will be used.

## Retention and Multi-Session Interactions

Rex raised an advanced challenge that goes beyond single-call optimization: building voice agents for repeat dialogue. Creating agents that users want to call back represents a much harder problem than optimizing individual conversations. This requires developing something akin to a relationship—the agent needs to remember context across sessions and provide compelling enough experiences that users want to return.

This represents a frontier challenge in voice AI operations, as current systems are primarily optimized for single-session interactions.

## Real-World Application Example

Rex shared a concrete example of a production voice AI application: an avatar-based system for prostate cancer surgery recovery support. The system used:

- **Retrieval-Augmented Generation (RAG)**: Built over curated medical documents about the recovery process.
- **Hayden**: An avatar platform for the visual interface.
- **24/7 availability**: Patients could access the system at any time for questions about their two to three year recovery process.
- **Appropriate escalation**: Questions outside the documentation scope triggered handoff to schedule human appointments.

This example illustrates how voice AI can provide meaningful value in healthcare contexts where access to human specialists is limited.

## Platform and Tool Ecosystem

The discussion referenced several tools and platforms relevant to voice AI operations:

- **OpenAI Real-time API**: Used for building conversational voice agents with real-time streaming capabilities.
- **Vapi**: Mentioned as a no-code platform for exploring voice AI.
- **Hume and Sesame**: Referenced as companies working on emotional expressiveness in voice AI.
- **WebSocket and WebRTC**: Protocols for handling real-time streaming and interruption handling.
- **Canonical**: Observability platform specifically for voice AI agents.

The ecosystem reflects the specialized tooling required for voice AI applications, which differs significantly from text-based LLM application stacks.

## Key Takeaways for LLMOps Practitioners

The panel discussion reveals that voice AI agents require specialized operational considerations beyond standard LLM deployment practices. Success requires attention to latency at every step of the pipeline, careful management of tool calling patterns, robust testing across languages and emotional states, and clear product scoping. The technology is described as exciting but immature—significant craftsmanship is required to move from prototype to production-ready systems. The panelists encourage experimentation while acknowledging that the field is rapidly evolving and best practices are still being established.