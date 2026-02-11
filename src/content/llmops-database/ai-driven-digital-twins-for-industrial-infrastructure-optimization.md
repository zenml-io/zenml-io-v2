---
title: "AI-Driven Digital Twins for Industrial Infrastructure Optimization"
slug: "ai-driven-digital-twins-for-industrial-infrastructure-optimization"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "681356ec317b14d3a0876475"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:07:11.647Z"
  createdOn: "2025-05-01T11:11:40.340Z"
llmopsTags:
  - "high-stakes-application"
  - "internet-of-things"
  - "legacy-system-integration"
  - "model-optimization"
  - "token-optimization"
  - "human-in-the-loop"
  - "latency-optimization"
  - "error-handling"
  - "monitoring"
  - "reliability"
  - "security"
  - "compliance"
  - "guardrails"
  - "microsoft-azure"
industryTags: "energy"
company: "Geminus"
summary: "Geminus addresses the challenge of optimizing large industrial machinery operations by combining traditional ML models with high-fidelity simulations to create fast, trustworthy digital twins. Their solution reduces model development time from 24 months to just days, while building operator trust through probabilistic approaches and uncertainty bounds. The system provides optimization advice through existing control systems, ensuring safety and reliability while significantly improving machine performance."
link: "https://the-stack-overflow-podcast.simplecast.com/episodes/were-not-replacing-you-were-with-you-where-ai-meets-infrastructure/transcript"
year: 2025
seo:
  title: "Geminus: AI-Driven Digital Twins for Industrial Infrastructure Optimization - ZenML LLMOps Database"
  description: "Geminus addresses the challenge of optimizing large industrial machinery operations by combining traditional ML models with high-fidelity simulations to create fast, trustworthy digital twins. Their solution reduces model development time from 24 months to just days, while building operator trust through probabilistic approaches and uncertainty bounds. The system provides optimization advice through existing control systems, ensuring safety and reliability while significantly improving machine performance."
  canonical: "https://www.zenml.io/llmops-database/ai-driven-digital-twins-for-industrial-infrastructure-optimization"
  ogTitle: "Geminus: AI-Driven Digital Twins for Industrial Infrastructure Optimization - ZenML LLMOps Database"
  ogDescription: "Geminus addresses the challenge of optimizing large industrial machinery operations by combining traditional ML models with high-fidelity simulations to create fast, trustworthy digital twins. Their solution reduces model development time from 24 months to just days, while building operator trust through probabilistic approaches and uncertainty bounds. The system provides optimization advice through existing control systems, ensuring safety and reliability while significantly improving machine performance."
---

## Overview

Geminus is a company focused on bringing artificial intelligence to industrial infrastructure and machinery—one of the most conservative technology adoption spaces. The company was founded by Greg Fallon (CEO, with a background in mechanical engineering simulation at Ansys and product leadership at Autodesk) and Karthik Duraisamy (a professor at University of Michigan, formerly Stanford). Their core innovation lies in creating AI-driven digital twins that can optimize the operation of large physical systems like power plants, oil refineries, natural gas fields, and electrical grids.

The fundamental problem Geminus addresses is that traditional machine learning approaches to industrial optimization have failed for several interconnected reasons: industrial machines lack sufficient sensors, sensors drift and fail, creating unreliable data; model development cycles of 12-24 months are too slow; and operators with decades of experience distrust black-box AI recommendations, especially in high-risk environments where mistakes can cause physical harm or catastrophic failures.

## Technical Architecture and ML/AI Approach

The Geminus approach is built on a foundation of physics-based simulation combined with machine learning, rather than relying solely on operational sensor data. This is a significant departure from standard industrial ML approaches.

**Synthetic Data Generation**: The company uses high-fidelity physics simulators (often third-party tools like Ansys, or customer-owned simulation tools) to generate synthetic training data. These simulators solve differential equations—both ordinary and partial differential equations depending on the physics involved—to model machine behavior. The input to these simulators comes from two sources: spatial/physical data from CAD and mechanical drawings, and operating conditions known by process engineers. This approach sidesteps the unreliable sensor data problem that plagues traditional industrial ML.

**Multi-Fidelity Data Blending**: One of Geminus's key innovations is their training methodology that blends multiple data streams of varying fidelity. They tag data streams based on their relative fidelity to one another and their cost to generate, then use proprietary algorithms to train models on this multi-fidelity data. This allows them to combine expensive high-fidelity simulation data with cheaper, lower-fidelity data sources effectively.

**Model Architecture**: The company uses traditional neural networks rather than large language models for the core optimization tasks. The training methodology is the key differentiator, not exotic model architectures. The models are tuned to be probabilistic, providing uncertainty bounds that operators can see and interpret. This probabilistic approach mimics physical reality where deterministic answers don't exist, and critically builds operator trust.

**Systems Approach with Connected Models**: For large infrastructure systems, Geminus takes a systems approach where multiple ML models communicate with each other. This is necessary because a field of natural gas wells might have hundreds or thousands of individual wells, each with its own control strategies. Training a single monolithic model would be computationally untenable. Instead, they use proprietary algorithms connecting separate models together, which compresses training time from potentially a year down to hours or days.

## Deployment and MLOps Considerations

**Edge and Air-Gapped Deployment**: This is where Geminus faces some of its most significant LLMOps/MLOps challenges. Many critical infrastructure systems are air-gapped for security reasons, meaning inference engines must run locally rather than in the cloud. The company is native on Azure, but must frequently deploy models to edge hardware that can be 10-15 years old. This requires model simplification and potentially quantization to fit on older chips. The trade-off is that processing moves from milliseconds to seconds, but this is typically acceptable for the use cases.

**Model Lifecycle Management**: The CEO explicitly mentions that once you have a model, maintaining its lifecycle is "the hard part." They reference the evolution from ML ops to AI ops workflows, acknowledging the operational complexity of keeping models current and effective over time. This is a significant MLOps challenge that the interview touches on but doesn't fully elaborate.

**Integration with Existing Control Systems**: A deliberate architectural choice is that Geminus doesn't try to replace existing control systems. Instead, their AI agents provide advice to control systems that have built-in guardrails developed over 50 years. The control system essentially asks "what should I do?" and the AI agent makes recommendations, but the control system only executes if the recommendation falls within established safety parameters. This approach leverages existing trust and safety infrastructure rather than trying to replace it.

## LLM Usage and Agentic Workflows

This is where the case study becomes particularly relevant to LLMOps. Geminus is currently evolving their architecture to incorporate LLMs as agents:

**Agents Directing Computational Science**: They are using traditional LLMs as agents to direct data science and simulation work (which they call "computational science"). This is an orchestration layer that helps manage larger, more complex model workflows. The expectation is that this will allow them to build bigger models faster and derive more data from them.

**Explicit Boundaries on LLM Usage**: Importantly, the CEO explicitly states why LLMs are NOT used for direct machine control recommendations: "that's the exact reason why no one is using LLMs to make recommendations to change big machines that if they break could hurt you." The non-deterministic nature of generative models makes them unsuitable for safety-critical control decisions. This is a crucial architectural decision that separates the agentic coordination layer (where LLMs add value) from the deterministic optimization layer (where traditional probabilistic ML models with uncertainty bounds are required).

## Building Operator Trust

A substantial portion of the discussion focuses on the human factors of deploying AI in industrial settings. Operators who have spent decades becoming qualified to run complex machinery are understandably resistant to black-box recommendations.

Geminus addresses this through several mechanisms: providing uncertainty bounds through probabilistic modeling, using data from trusted engineering processes (physics simulations), showing operators how small changes affect outcomes in sensible ways, and explicitly framing the AI as collaborative ("We're not replacing you; we're with you"). The dramatic performance improvements from the AI serve as proof points that gradually build trust.

## Security Considerations

The interview touches on security for AI systems connected to critical infrastructure. Multiple layers of protection include: control system guardrails, air-gapping of critical systems, and matching air-gapped deployment for the AI systems themselves. The CEO acknowledges risk exists but emphasizes the layered approach to mitigation.

## Future Directions

The company's roadmap extends to increasingly ambitious applications: connecting entire energy networks together, creating country-scale infrastructure digital twins for planning purposes (such as electrical grid planning for electrification), and eventually replacing physics simulators themselves with large AI models (though this is described as 5-10 years away and an active research area). Quantum computing is mentioned as a potential future accelerator for training, though the CEO expresses skepticism about near-term timelines.

## Critical Assessment

It's worth noting that this is a podcast interview with the CEO, so claims should be viewed with appropriate skepticism. The compression of development cycles from "12-24 months" to "days" is a significant claim that would benefit from independent verification. Similarly, claims of "dramatic" performance improvements are not quantified. The technical approach of combining physics simulation with ML training is well-established in academic literature (physics-informed neural networks, hybrid modeling), so Geminus appears to be commercializing and operationalizing research rather than inventing entirely new techniques. The candid acknowledgment of LLM limitations for safety-critical control is refreshing and suggests a mature understanding of AI capabilities and boundaries.