---
title: "Agent-First AI Development Platform with Multi-Surface Orchestration"
slug: "agent-first-ai-development-platform-with-multi-surface-orchestration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69306ad493d5cea7dce2e87d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:32:35.444Z"
  createdOn: "2025-12-03T16:52:36.550Z"
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "poc"
  - "data-analysis"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "instruction-tuning"
  - "few-shot"
  - "evals"
  - "docker"
  - "kubernetes"
  - "cicd"
  - "monitoring"
  - "documentation"
  - "open-source"
  - "google-gcp"
  - "anthropic"
industryTags: "tech"
company: "Google Deepmind"
summary: "Google DeepMind launched Anti-gravity, an agent-first AI development platform designed to handle increasingly complex, long-running software development tasks powered by Gemini 3 Pro. The platform addresses the challenge of managing AI agents operating across multiple surfaces (editor, browser, and agent manager) by introducing \"artifacts\" - dynamic representations that help organize agent outputs and enable asynchronous feedback. The solution emerged from close collaboration between product and research teams at DeepMind, creating a feedback loop where internal dogfooding identified model gaps and drove improvements. Initial launch experienced capacity constraints due to high demand, but users who accessed the product reported significant workflow improvements from the multi-surface agent orchestration approach."
link: "https://www.youtube.com/watch?v=HN-F-OQe6j0"
year: 2025
seo:
  title: "Google Deepmind: Agent-First AI Development Platform with Multi-Surface Orchestration - ZenML LLMOps Database"
  description: "Google DeepMind launched Anti-gravity, an agent-first AI development platform designed to handle increasingly complex, long-running software development tasks powered by Gemini 3 Pro. The platform addresses the challenge of managing AI agents operating across multiple surfaces (editor, browser, and agent manager) by introducing \"artifacts\" - dynamic representations that help organize agent outputs and enable asynchronous feedback. The solution emerged from close collaboration between product and research teams at DeepMind, creating a feedback loop where internal dogfooding identified model gaps and drove improvements. Initial launch experienced capacity constraints due to high demand, but users who accessed the product reported significant workflow improvements from the multi-surface agent orchestration approach."
  canonical: "https://www.zenml.io/llmops-database/agent-first-ai-development-platform-with-multi-surface-orchestration"
  ogTitle: "Google Deepmind: Agent-First AI Development Platform with Multi-Surface Orchestration - ZenML LLMOps Database"
  ogDescription: "Google DeepMind launched Anti-gravity, an agent-first AI development platform designed to handle increasingly complex, long-running software development tasks powered by Gemini 3 Pro. The platform addresses the challenge of managing AI agents operating across multiple surfaces (editor, browser, and agent manager) by introducing \"artifacts\" - dynamic representations that help organize agent outputs and enable asynchronous feedback. The solution emerged from close collaboration between product and research teams at DeepMind, creating a feedback loop where internal dogfooding identified model gaps and drove improvements. Initial launch experienced capacity constraints due to high demand, but users who accessed the product reported significant workflow improvements from the multi-surface agent orchestration approach."
---

## Overview

Google DeepMind introduced Anti-gravity, an agent-first AI development platform that represents a significant evolution in how LLMs are deployed for software development workflows. The presentation, delivered by Kevin How (product engineering lead) at an AI Engineering conference, focuses on the production deployment challenges and solutions for running increasingly capable AI agents that can operate autonomously across multiple surfaces and handle longer-running, more complex tasks. This case study is particularly interesting from an LLMOps perspective because it emerged from a tight integration between research and product teams within DeepMind, where the platform was built specifically to leverage the capabilities of Gemini 3 Pro (sometimes referred to as "Nano Banana" in the transcript) and to create a feedback loop that would improve both the underlying models and the product itself.

The context for this launch is important: Anti-gravity was released alongside Gemini 3 Pro, and the team experienced immediate capacity constraints due to unexpected demand, which the presenter acknowledges with humor but also indicates the operational challenges of deploying LLM-powered products at scale. The platform represents what the team considers the next paradigm shift in AI-assisted development, moving from autocomplete to chat to fully orchestrated agent systems.

## Architectural Components and Multi-Surface Design

Anti-gravity's architecture consists of three interconnected surfaces that agents can operate across, representing a departure from traditional IDE-centric approaches. The first surface is the AI editor, which the team openly acknowledges is a VS Code fork. This editor includes standard features like "lightning fast autocomplete" and an agent sidebar that mirrors the central agent manager. The second surface is an agent-controlled Chrome browser, which provides agents with authenticated access to web resources and the ability to interact with web applications through clicking, scrolling, JavaScript execution, and DOM manipulation. The third and most novel surface is the agent manager, which serves as a central control hub positioned "one level higher than just looking at your code."

The multi-surface architecture addresses a fundamental LLMOps challenge: as models become more capable and tasks become longer-running and more complex, developers need new interaction patterns beyond synchronous chat interfaces. The team designed the system so that at any given time there is one agent manager window, with the ability to quickly switch between the agent manager and the editor using keyboard shortcuts (Command/Control-E) with sub-100 millisecond latency. This architectural decision reflects a bet on model improvement trajectories - the team explicitly states they expect users to spend more time in the agent manager as models continue to improve.

## Computer Use and Browser Integration

One of the most significant LLMOps innovations in Anti-gravity is the deep integration of computer use capabilities through the agent-controlled browser. This represents a close collaboration between the Anti-gravity product team and DeepMind's computer use research team, who sit "a couple tens of feet away" from each other. The browser integration serves two distinct purposes in production: context retrieval and verification.

For context retrieval, the browser provides agents with authenticated access to resources that extend beyond code repositories - Google Docs, GitHub dashboards, bug tracking systems, and other institutional knowledge sources. This addresses the "how to build it" problem in software development, as opposed to just the "build it" problem that pure code generation solves. The presenter emphasizes that there is "richness in context" and "institutional knowledge" that agents need access to for more sophisticated development tasks.

For verification, the browser enables agents to actually test web applications and generate screen recordings of their interactions. The presenter demonstrates this with a flight tracker application, where the agent made code changes and then provided a screen recording showing the blue circle cursor moving around and interacting with the UI. This recording becomes both a verification artifact for the developer and an input that the agent can use to iterate further, since Gemini 3 Pro has strong multimodal capabilities. This creates a verification loop that goes beyond traditional code diffs.

The computer use implementation required significant LLMOps work to identify and address gaps on both sides of the product-research boundary. The product team had to improve their "agent harness" and tooling, while the research team had to address issues with capability gaps and data distribution mismatches. This bidirectional feedback represents a key aspect of how DeepMind approaches LLMOps - treating the model training and product development as tightly coupled processes rather than separated concerns.

## Artifacts: A New Primitive for Agent Orchestration

The most conceptually interesting LLMOps innovation in Anti-gravity is the introduction of "artifacts" as a first-class primitive for agent orchestration. An artifact is defined as "something that the agent generates that is a dynamic representation of information for you and your use case," with the key property being dynamicism. This seemingly simple concept addresses several fundamental challenges in deploying long-running agents in production.

Artifacts serve multiple purposes in the system. They provide organization and self-reflection capabilities for agents, allowing them to structure their work in ways that are more interpretable than raw chain-of-thought logs. They enable communication between agents and humans through richer media than text - including markdown plans, task lists, architecture diagrams (Mermaid), images, and screen recordings. They facilitate communication across agents, whether browser sub-agents or different conversation threads. And they serve as memory, allowing agents to store derived knowledge that shouldn't need to be recomputed.

The agent dynamically decides several properties of artifacts at runtime: whether to generate an artifact at all (small tasks like changing a title don't need them), what type of artifact to generate (from a potentially infinite set), who should see it (sub-agents, other conversations, memory bank), and whether to send notifications about it. This dynamic decision-making represents a significant bet on model capabilities - the system trusts the LLM to make appropriate metacognitive decisions about how to structure its own outputs.

The most common artifact types in practice are implementation plans and walkthroughs. When starting a task, the agent typically generates a plan artifact that resembles a product requirements document (PRD), including a feedback section with open questions. The model can decide whether to auto-continue if there are no blocking questions, or to wait for human input if the task is underspecified. This represents a more sophisticated interaction pattern than simple approval gates - the agent is making intelligent decisions about when it needs clarification.

At the end of tasks, the agent generates walkthrough artifacts that explain what was done and provide evidence of correctness. Rather than simply showing code diffs, these walkthroughs might include screen recordings, architecture diagrams, or other rich media that demonstrate the agent's work. This addresses a key challenge in LLMOps: how to make agent behavior interpretable and verifiable for human supervisors.

## Feedback Mechanisms and Iteration Patterns

Anti-gravity implements several feedback mechanisms that allow developers to guide agents during task execution without interrupting the agent's work. The system takes inspiration from collaboration tools like Google Docs and GitHub, implementing a commenting system that works across different artifact types. Developers can highlight text in markdown artifacts and leave comments, or use a "Figma-style" drag-and-drop interface to leave comments on images and UI mockups. These comments are batched and sent to the agent, which is instrumented to "naturally take your comments into consideration without interrupting that task execution loop."

This asynchronous feedback pattern represents an important LLMOps design decision. Rather than forcing synchronous interaction (which is appropriate for short tasks) or no interaction (which risks agents going off in wrong directions on long tasks), the system enables ongoing guidance that respects both human attention and agent autonomy. The notification system surfaces items that require human attention - like terminal commands that shouldn't auto-execute - while allowing other work to proceed in parallel.

The artifact system also enables iteration in image space, which the team sees as particularly valuable for design work. Rather than starting with text descriptions, developers can begin with image mockups, leave comments directly on the visual representation, and have the agent update both the design and the implementation. Because Gemini 3 Pro has strong multimodal capabilities, the agent can understand and act on visual feedback in ways that text-only models cannot.

## Multimodal Capabilities and Image Generation

The integration of image generation capabilities represents another area where DeepMind's full-stack approach to LLMOps shows clear benefits. The team launched with support for "Nano Banana Pro" (an image generation model) on the same day it was released internally, after "pulling an all-nighter" for the Gemini launch. The presenter emphasizes that "the anti-gravity editor is this place where any sort of new capability can be represented inside of our product," indicating a system designed for rapid integration of new model capabilities.

The multimodal focus reflects a recognition that software development is inherently multimodal - developers work with text, images, screenshots, architecture diagrams, and running applications. The presenter argues that design workflows in particular will change significantly, with iteration happening in image space rather than starting from text descriptions. This represents a bet on how generative AI capabilities will reshape workflows, rather than simply automating existing text-centric processes.

From an LLMOps perspective, the multimodal integration required careful instrumentation of the agent to understand when and how to use different modalities. The agent needs to decide whether to generate images for mockups, when to take screenshots for verification, and how to incorporate visual information into its reasoning. These are not trivial decisions, and the presenter acknowledges that initial versions had gaps that required collaboration between product and research teams to address.

## Parallelism and Multi-Agent Orchestration

Anti-gravity is designed to handle parallel task execution, which the presenter sees as increasingly important as models improve. The agent manager interface is "built to optimize the UI of artifacts" and can handle multiple projects or multiple parallel tasks within the same project - for example, iterating on design mockups while simultaneously researching APIs and building out application code.

The inbox feature in the agent manager serves as a central point for managing parallel work. It surfaces items requiring attention across multiple concurrent tasks, with OS-level notifications ensuring developers don't need to constantly check on agent progress. This represents a solution to the "multi-threading across many tasks at once" problem that emerges when agents can handle longer-running work.

The parallel orchestration capability is enabled by the artifact system, which provides a structured way to review and provide feedback across multiple concurrent streams of work. Rather than trying to follow multiple conversation threads simultaneously, developers can review artifacts from different tasks and provide batched feedback through the commenting system. This is a clear example of how the LLMOps infrastructure (the artifact system and agent manager) enables new capabilities that wouldn't be possible with simpler chat-based interfaces.

## The Research-Product Flywheel

Perhaps the most significant LLMOps insight from this case study is DeepMind's approach to creating a tight feedback loop between research and product development. The presenter repeatedly emphasizes that "anti-gravity will be the most advanced product on the market because we are building it for ourselves. We are our own users." This dogfooding approach means that Google engineers and DeepMind researchers use Anti-gravity internally, providing direct feedback on model gaps and product issues.

This creates what the presenter calls a "research and product flywheel." Product engineers can identify specific capability gaps - slow inference, poor artifact generation, issues with computer use - and communicate these directly to research teams working on the underlying models. Research teams can see "at a very very real level what are the gaps in the model" through actual usage of a "full stack product" rather than through artificial evaluation benchmarks. The presenter guarantees that "whatever that frontier provides, we will provide in anti-gravity for the rest of the world. These are the same product."

The bidirectional nature of this feedback is crucial. It's not just researchers improving models based on product feedback, but also product teams improving their "agent harness" and tooling based on research insights. The computer use integration is cited as a specific example where both sides identified gaps and worked together to address them, rather than treating the model API as a fixed interface.

This approach to LLMOps represents a significant competitive advantage for companies that can integrate research and product development. The presenter argues that "eval just simply can't give you" the insights that come from full-stack usage by actual developers working on real tasks. However, this approach also requires organizational structures that support close collaboration between research and product teams, which may not be feasible for all organizations deploying LLMs in production.

## Model Capabilities and Product Design

A key theme throughout the presentation is that product capabilities are fundamentally constrained by model capabilities, and that product design should anticipate and exploit new model capabilities as they emerge. The presenter identifies four categories of improvements in Gemini 3 Pro that shaped Anti-gravity's design: intelligence and reasoning (better instruction following, more nuanced tool use, longer-running tasks), extended time horizons (tasks can run longer, models can "think for longer"), multimodal capabilities (understanding and generating images, videos, etc.), and better tool use.

This model-first perspective on product design is both a strength and a potential weakness. On one hand, it allows DeepMind to build products that showcase cutting-edge capabilities and push the boundaries of what's possible. On the other hand, it creates dependencies on specific model capabilities that may not be reproducible by users who don't have access to the latest Google models.

The presenter acknowledges this by describing product paradigm shifts that followed model capability improvements: autocomplete enabled by models good at short-form completion, chat enabled by reinforcement learning from human feedback (RLHF), and now agents enabled by models with better reasoning and tool use. The implication is that Anti-gravity represents the "next step function" and that future paradigm shifts will require further model improvements.

## Capacity Challenges and Operational Realities

The presenter openly acknowledges that Anti-gravity "ran out of capacity" after launch, leading to error messages that have been "tormenting" him. He apologizes "on behalf of the anti-gravity team" for the "global chip shortage" and asks users to "adopt a TPU" to help. While presented humorously, this reflects real LLMOps challenges around capacity planning, infrastructure scaling, and managing user expectations when deploying LLM-powered products.

The capacity issues are particularly interesting because they occurred despite Anti-gravity being launched by a major tech company with substantial compute resources. This suggests that demand for capable agent systems exceeded even Google's expectations, or that the computational requirements for running Gemini 3 Pro with computer use capabilities are substantial enough to create bottlenecks even at Google's scale.

The presenter's mention of wanting to "turn off pager duty a bit more" indicates that the launch involved operational incidents and on-call responses, which is a common reality of deploying complex LLM systems in production. The fact that this is mentioned in the presentation suggests a level of transparency about operational challenges that is not always present in product announcements.

## Critical Assessment and Trade-offs

While the presenter is enthusiastic about Anti-gravity's capabilities, there are several aspects of this LLMOps deployment that warrant critical examination. First, the tight coupling between Anti-gravity and Google's internal models means that the product's capabilities are not easily reproducible by teams using other LLMs. The presenter explicitly states that DeepMind's access to Gemini "for a couple of months" before release allowed them to shape the product around specific model strengths and gaps. This creates a competitive moat but also raises questions about how well the agent-first paradigm works with models that don't have the same capabilities.

Second, the artifact system represents a significant bet on model metacognitive capabilities - the ability to decide when and what types of artifacts to generate, who should see them, and when to send notifications. While Gemini 3 Pro may handle these decisions well, the presenter acknowledges that "artifacts were not good on the initial versions" and required "a little bit of plumbing" and work with the research team. This suggests that other teams trying to implement similar systems with different models might struggle.

Third, the multi-surface architecture and agent manager introduce additional complexity into the development workflow. While the presenter argues this complexity is justified by the capabilities it enables, there's an inherent tension between the simplicity of traditional IDEs and the orchestration overhead of managing agents across multiple surfaces. The fact that the team provides a quick "escape hatch" (Command/Control-E) back to the editor suggests they recognize that not all tasks benefit from the agent-first approach.

Fourth, the verification approach through screen recordings and visual artifacts assumes that visual inspection is an effective way to validate agent work. While this may be true for UI development, it's less clear how well this applies to backend systems, infrastructure work, or other areas where visual representations are less natural. The case study focuses heavily on web development use cases, which may not be representative of all software development workflows.

Finally, the research-product flywheel, while powerful, creates a potential feedback loop where the product increasingly optimizes for internal users (Google engineers and DeepMind researchers) who may have different needs and priorities than external developers. The presenter doesn't address how they balance internal dogfooding with external user feedback, or whether there are concerns about the product becoming too specialized for Google's internal workflows.

## Conclusion and Future Directions

Anti-gravity represents an ambitious attempt to build an agent-first development platform that takes full advantage of advances in LLM capabilities, particularly multimodal understanding, tool use, and longer-context reasoning. The introduction of artifacts as a first-class primitive for agent orchestration is conceptually interesting and addresses real challenges in making long-running agent behavior interpretable and controllable. The tight integration between research and product development at DeepMind creates a powerful feedback loop that drives improvements on both sides.

However, the case study also reveals tensions and trade-offs inherent in deploying sophisticated LLM systems in production: capacity constraints even at Google's scale, the complexity of multi-surface orchestration, dependencies on cutting-edge model capabilities that may not be widely available, and the challenges of designing interaction patterns for tasks that run asynchronously over extended periods. The presenter's candor about capacity issues and operational challenges provides valuable transparency about the realities of LLMOps at scale, even for well-resourced organizations.