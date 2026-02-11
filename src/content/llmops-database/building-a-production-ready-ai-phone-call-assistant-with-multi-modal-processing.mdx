---
title: "Building a Production-Ready AI Phone Call Assistant with Multi-Modal Processing"
slug: "building-a-production-ready-ai-phone-call-assistant-with-multi-modal-processing"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed5a33d5354ed9a6969"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:39:52.233Z"
  createdOn: "2024-11-21T14:08:21.392Z"
llmopsTags:
  - "customer-support"
  - "error-handling"
  - "fallback-strategies"
  - "google-gcp"
  - "latency-optimization"
  - "microservices"
  - "monitoring"
  - "multi-agent-systems"
  - "multi-modality"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "speech-recognition"
industryTags: "tech"
company: "RealChar"
summary: "RealChar is developing an AI assistant that can handle customer service phone calls on behalf of users, addressing the frustration of long wait times and tedious interactions. The system uses a complex architecture combining traditional ML and generative AI, running multiple models in parallel through an event bus system, with fallback mechanisms for reliability. The solution draws inspiration from self-driving car systems, implementing real-time processing of multiple input streams and maintaining millisecond-level observability."
link: "https://www.youtube.com/watch?v=GzxSARsAiNE"
year: 2023
seo:
  title: "RealChar: Building a Production-Ready AI Phone Call Assistant with Multi-Modal Processing - ZenML LLMOps Database"
  description: "RealChar is developing an AI assistant that can handle customer service phone calls on behalf of users, addressing the frustration of long wait times and tedious interactions. The system uses a complex architecture combining traditional ML and generative AI, running multiple models in parallel through an event bus system, with fallback mechanisms for reliability. The solution draws inspiration from self-driving car systems, implementing real-time processing of multiple input streams and maintaining millisecond-level observability."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-ready-ai-phone-call-assistant-with-multi-modal-processing"
  ogTitle: "RealChar: Building a Production-Ready AI Phone Call Assistant with Multi-Modal Processing - ZenML LLMOps Database"
  ogDescription: "RealChar is developing an AI assistant that can handle customer service phone calls on behalf of users, addressing the frustration of long wait times and tedious interactions. The system uses a complex architecture combining traditional ML and generative AI, running multiple models in parallel through an event bus system, with fallback mechanisms for reliability. The solution draws inspiration from self-driving car systems, implementing real-time processing of multiple input streams and maintaining millisecond-level observability."
---

## Overview

RealChar is a startup building Revia, a consumer-facing AI assistant that makes phone calls on behalf of users to handle customer service interactions. The company was founded by Sean, who brings extensive experience from Google Assistant (specifically the Google Duplex project) and the self-driving car industry at Waymo. The podcast interview reveals deep technical insights into how they're applying robotics and autonomous vehicle engineering principles to build reliable AI agents for real-time phone conversations.

The core value proposition is compelling: consumers are increasingly forced to deal with corporate AI systems designed to make it difficult to complete simple tasks like canceling subscriptions or getting support. RealChar flips this dynamic by giving consumers their own AI to fight back against these systems. As the host puts it, "if I'm going to have to deal with these shitty chat bots then I might as well have my own chat bot that can deal with them."

## Technical Architecture: Robotics-Inspired Design

The most distinctive aspect of RealChar's approach is applying self-driving car engineering principles to LLM-powered applications. Sean explains that everything in their system runs in parallel, similar to how robotics systems operate on clock cycles.

### Parallel Processing with Event Bus Architecture

The system uses an event bus pattern for communication between components. Every event occurring in millisecond intervals gets published to a unified event bus. Downstream systems subscribe to events they can handle, process them, and publish responses back. This creates a decoupled architecture where:

- Audio streams, text streams, and other data types are processed simultaneously
- Different ML models can subscribe to relevant events without blocking each other
- Systems can operate on their own clock cycles (processing data at defined frequencies like every 100 milliseconds)
- The critical path for audio processing cannot be slowed down by other system components

This is particularly important for voice applications where even half-second delays are immediately noticeable to users, unlike text applications where latency is more forgiving.

### Multimodal Input Handling

Phone calls are more complex than pure audio processing. The system must handle:

- Audio streams via WebSocket or WebRTC
- DTMF tones (button presses for navigating phone menus)
- Incoming text messages (e.g., verification codes sent during calls)
- Understanding context from multiple simultaneous input channels

Sean draws a parallel to self-driving cars, which are also inherently multimodal systems combining LiDAR, camera data, and audio (for detecting sirens). The perception models must understand any type of data format on the fly.

## LLM Integration Challenges and Solutions

### Latency Management

Real-time voice conversation presents severe latency constraints that many LLM applications don't face. Sean shares specific benchmarks from their internal testing:

- GPT-4 Turbo: First token latency of 800ms to 1 second typically, with spikes up to 3-4 seconds occurring about 20% of the time
- GPT-4o at launch: 300-500ms first token latency, though this degraded as traffic increased

These latencies are "way too slow for real-time conversation." Unlike text applications where users tolerate delays, audio applications expose any latency immediately. Half a second of lag creates an obviously broken user experience.

### Multi-Tier Fallback Systems

To handle the unpredictability of LLM response times, RealChar implements a sophisticated fallback mechanism inspired by self-driving car safety systems:

- Priority-based model selection: There's a preferred model for certain requests, with automatic fallback to faster alternatives when needed
- Real-time latency thresholds: If any request exceeds defined thresholds, the system automatically triggers fallback mechanisms
- The system can recover from slow or failed LLM responses similar to how self-driving cars have mechanisms to safely handle sensor or model failures

This isn't a simple gateway routing pattern. The combination of task type, identified intent, and real-time performance metrics all influence routing decisions. Some requests may be held, some forwarded immediately, and some trigger alternative actions like button presses.

### Combining Generative AI with Traditional ML

The system uses both generative AI and traditional ML models working in parallel:

- Traditional NLP for intent classification and signal generation (faster, more deterministic)
- Generative AI models for natural language understanding and response generation
- Context enhancement similar to RAG, but gathering context from real-time multimodal inputs rather than vector databases
- Validation layers to reduce hallucination on task-critical operations

The goal is to have sufficient signals and context before engaging the generative AI models, reducing the chance of irrelevant or incorrect responses.

## Simulation and Testing Environment

A key lesson from self-driving cars is the importance of virtual simulation environments for testing. RealChar has built a controlled testing environment that serves multiple purposes:

### Synthetic Data Generation

- Virtual phone conversations with recorded or simulated humans on the other end
- Controlled scenarios that don't spam real businesses or harm real users
- Ability to generate training data at scale

### Reliability Testing and Debugging

- Millisecond-level tracing of every request and decision
- Ability to detect exactly what happened at any moment when something breaks
- Identification of whether failures are due to:
  - Generative AI model issues
  - Traditional ML model decisions
  - Third-party API outages (like OpenAI going down)
  - Network or latency problems

### Progressive Capability Building

Sean uses a self-driving car analogy: "What is the first thing you're trying to do? You're trying to ask a self-driving car to start, drive in a straight line, then stop." Similarly, they started with simple tasks like making phone calls, saying hello, and hanging up, then progressively building capability.

## Observability and Human-in-the-Loop

The system provides real-time observability with the ability for humans to take over control, similar to autopilot systems:

- Real-time monitoring of AI behavior during phone calls
- Ability for users to supervise and intervene when the AI makes wrong decisions
- "Grab the steering wheel" capability when needed, then re-engage AI control

This requires low-level WebSocket handling for audio processing, which they've built in-house. The audio processing component is particularly challenging because streaming audio has much stricter requirements than text streaming.

## Production Challenges and Honest Assessment

Sean is refreshingly candid about the current state of the technology and the challenges of productionizing LLM-based agents:

### Non-Deterministic Behavior

The non-deterministic nature of generative AI creates ongoing challenges:

- Inconsistent responses between calls
- Behavior changes when providers update models ("it works yesterday but why it's not working today")
- The need for constant monitoring and adaptation

### The Demo vs. Production Gap

Sean directly addresses a common pattern: "It's very easy to create a really appealing demo with your AI agent that works only 1% of the time." Making something work 90% of the time requires 90% of the engineering effort. This honesty about the gap between impressive demos and reliable production systems is notable.

### Current Capabilities

Using the self-driving analogy, Sean estimates they can "drive straight for 15 miles" - meaning basic functionality works, but complex scenarios like highway driving or detours (complex phone call routing, unexpected questions) aren't fully solved yet.

## Business Model Considerations

The subscription pricing model (flat fee for unlimited phone calls) reflects a deliberate decision about customer experience. Sean explicitly considered the tension between customer engagement and API costs, ultimately prioritizing "ease of mind" over usage-based pricing that might discourage engagement.

This reveals an interesting LLMOps consideration: how token economics affect product design. RealChar manages this by:

- Calculating internal token consumption per phone call
- Finding optimizations to reduce costs while maintaining quality
- Passing savings to customers through flat pricing rather than usage-based billing

## Key Takeaways for LLMOps Practitioners

The case study offers several valuable lessons:

- **Robotics engineering patterns transfer well**: Event-driven parallel processing, clock-cycle-based execution, and simulation environments are applicable beyond physical systems
- **Audio has stricter requirements than text**: Latency tolerance is measured in hundreds of milliseconds, not seconds
- **Multi-tier fallback is essential**: No single LLM provider is reliable enough for real-time applications
- **Combine GenAI with traditional ML**: Use faster, more deterministic models for signal generation and routing, reserving LLMs for tasks that truly need them
- **Build simulation environments early**: Testing in controlled virtual environments is crucial before exposing AI to real users
- **Be honest about limitations**: The gap between demos and production is substantial; managing expectations is important

The product represents an ambitious attempt to bring self-driving car engineering rigor to consumer AI applications, acknowledging that reliable AI agents are still years away from handling all scenarios perfectly.