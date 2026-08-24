---
title: "AI-Powered Content Moderation Platform for Real-Time Marketplace Safety"
slug: "ai-powered-content-moderation-platform-for-real-time-marketplace-safety"
draft: false
llmopsTags:
  - "content-moderation"
  - "fraud-detection"
  - "chatbot"
  - "prompt-engineering"
  - "model-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "fallback-strategies"
  - "evals"
  - "fastapi"
  - "monitoring"
  - "orchestration"
  - "microservices"
  - "scalability"
  - "reliability"
  - "openai"
  - "anthropic"
industryTags: "e-commerce"
company: "DoorDash"
summary: "DoorDash built SafeChat, an AI-powered safety system to moderate over 4 million daily messages exchanged between consumers, Dashers, and merchants in their marketplace. The solution employs a hybrid architecture with a fast, cheap internal classifier filtering obviously safe messages (90%+ of traffic) followed by LLM-based multi-axis scoring for nuanced content assessment. This pattern achieved a 50% reduction in verbal abuse incidents. DoorDash then generalized this approach into a content-agnostic moderation platform that allows teams to compose no-code workflows with backtesting capabilities, enabling diverse use cases from profile picture moderation to fraud detection without rebuilding infrastructure."
link: "https://www.infoq.com/presentations/doordash-llm-ai-moderation-platform/"
year: 2026
seo:
  title: "DoorDash: AI-Powered Content Moderation Platform for Real-Time Marketplace Safety - ZenML LLMOps Database"
  description: "DoorDash built SafeChat, an AI-powered safety system to moderate over 4 million daily messages exchanged between consumers, Dashers, and merchants in their marketplace. The solution employs a hybrid architecture with a fast, cheap internal classifier filtering obviously safe messages (90%+ of traffic) followed by LLM-based multi-axis scoring for nuanced content assessment. This pattern achieved a 50% reduction in verbal abuse incidents. DoorDash then generalized this approach into a content-agnostic moderation platform that allows teams to compose no-code workflows with backtesting capabilities, enabling diverse use cases from profile picture moderation to fraud detection without rebuilding infrastructure."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-content-moderation-platform-for-real-time-marketplace-safety"
  ogTitle: "DoorDash: AI-Powered Content Moderation Platform for Real-Time Marketplace Safety - ZenML LLMOps Database"
  ogDescription: "DoorDash built SafeChat, an AI-powered safety system to moderate over 4 million daily messages exchanged between consumers, Dashers, and merchants in their marketplace. The solution employs a hybrid architecture with a fast, cheap internal classifier filtering obviously safe messages (90%+ of traffic) followed by LLM-based multi-axis scoring for nuanced content assessment. This pattern achieved a 50% reduction in verbal abuse incidents. DoorDash then generalized this approach into a content-agnostic moderation platform that allows teams to compose no-code workflows with backtesting capabilities, enabling diverse use cases from profile picture moderation to fraud detection without rebuilding infrastructure."
notion:
  pageId: "3c6f8dff-2538-80fd-b30f-e9cd129e89f8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T08:59:00.000Z"
  lastEditedTime: "2026-08-24T08:59:00.000Z"
  publishedAt: "2026-08-24T09:19:47Z"
---

## Overview and Business Context

DoorDash operates a three-sided marketplace connecting consumers ordering food, Dashers delivering orders, and merchants preparing meals. These parties interact through multiple channels including in-app chat (4 million daily messages), voice calls (400,000+ daily), and image sharing (200,000+ daily images). Safety is a critical product metric for DoorDash, with both actual safety and perceived safety being equally important business objectives. A meaningful portion of safety incidents on the platform relate to verbal abuse occurring in these communication channels.

The challenge was particularly acute given the ephemeral nature of marketplace relationships—interactions typically last only 6-40 minutes, leaving no time to build trust. This meant the safety system needed to act immediately upon detecting unsafe content. For chat specifically, DoorDash required classification of every message as safe or unsafe within a fraction of a second to avoid disrupting the user experience, making this a challenging real-time LLM deployment problem at scale.

## Initial Architecture: The SafeChat System

### The Cost-Latency Problem

The initial business proposal was straightforward: use an LLM to classify each message as safe or unsafe before delivery. However, this approach faced two critical production constraints. First, LLM latency varied significantly, averaging 2-10 seconds per call—far too slow for real-time chat where sub-second response times were required. Second, the cost of calling an LLM 4 million times daily would be prohibitive. This forced the team to think strategically about LLM usage rather than applying it indiscriminately.

### Data-First Approach

Before building any production system, DoorDash spent several months instrumenting the chat system and analyzing historical data using a free moderation API. This unglamorous but critical step revealed that only a small single-digit percentage of messages were actually unsafe. This insight fundamentally shaped the architecture: if most messages are obviously safe, the system could use an aggressive, cheap filtering layer to handle the majority of traffic, reserving expensive LLM calls for the small percentage of ambiguous cases.

### Hybrid Two-Layer Architecture

The production SafeChat system employed a two-layer architecture that became the foundational pattern for all subsequent work:

**Layer 1: Fast Internal Classifier**
The first layer consisted of a small ML model trained on labeled data collected during the analysis phase and deployed on DoorDash's internal infrastructure. This model had three specific jobs: respond in under 100 milliseconds at the 90th percentile, incur no per-call costs beyond infrastructure expenses, and excel at identifying obviously safe content. Critically, this layer was not designed to be a final arbiter of safety—it functioned more like an airport metal detector, identifying content worthy of closer inspection rather than making definitive judgments. Messages the classifier couldn't confidently mark as safe (less than 10% of total traffic) were passed to the second layer.

**Layer 2: LLM Multi-Axis Scoring**
The second layer used LLM calls, but with a crucial design decision: instead of asking for a binary safe/unsafe classification, the system requested scores across multiple dimensions (threat level, profanity, sexual content, etc.). This approach proved superior because scores function as "knobs" rather than "flags," enabling graduated responses, threshold adjustments without model retraining, and the addition of new categories without rebuilding the pipeline. Asking for scores also aligned better with LLM capabilities—determining severity is more natural for LLMs than making absolute binary judgments where human annotators might disagree.

### Message Processing Pipeline

The complete pipeline worked as follows: incoming messages first underwent noise reduction (removing empty messages, image attachments routed to separate pipelines, and common pleasantries). The cleaned message passed through the fast internal classifier. If classified as safe, it was delivered immediately. If not, it proceeded to the LLM layer for multi-axis scoring. Based on the returned scores, the system took graduated actions ranging from censoring individual words (low severity) to blocking messages (medium severity) to canceling entire orders and warning offenders (high severity).

### Extension to Voice and Image

The same architectural pattern extended to voice and image moderation with domain-specific adaptations. For images, DoorDash used a commercial vision API as the cheap first layer, as image safety classification was already well-solved commercially. For voice, the technical constraint differed—by the time speech was transcribed and analyzed, the recipient had already heard it, making prevention impossible. The system could only respond reactively by hanging up calls upon detecting unsafe content and offering order cancellations.

## Production Results and Impact

After deploying SafeChat, DoorDash measured a roughly 50% reduction in safety incidents driven by verbal abuse. Importantly, this metric represented real reduction in human harm, not just model accuracy improvements. This tangible business impact validated the months spent understanding data before building the system and justified the architectural complexity of the hybrid approach.

## Evolution to a Content-Agnostic Platform

### The Generalization Insight

Following SafeChat's success, other DoorDash teams requested similar capabilities for diverse use cases: moderating Dasher and consumer profile pictures, name validation at signup, food reviews moderation, and even fraud detection in chat and phone calls. The team recognized that rebuilding SafeChat-like systems for each use case would result in significant duplication. The key insight was that teams didn't want SafeChat itself—they wanted the underlying pattern of "cheap then expensive then graduated action." This realization led to throwing away the SafeChat system (while retaining the learned models and data) and building a content-agnostic moderation platform.

### Platform Design Philosophy

The new platform separated concerns: it handled the technical orchestration (logging decisions, integrating with model providers, managing conditional step execution) while clients brought domain-specific business logic and meaning. Teams could configure moderation workflows through a UI without writing code, making the platform accessible to non-engineers and dramatically reducing time to production for new use cases.

### Building Blocks: Model Types

The platform provided three categories of models, each optimized for different use cases:

**Internal Models:** These are models trained, fine-tuned, and deployed on DoorDash's ML platform infrastructure. Teams can leverage labeled data to train custom models served via standardized APIs with predefined input/output schemas. The SafeChat classifier became one such internal model. These models are optimized for being cheap (no per-call costs) and fast (sub-100ms latency), ideal for high-volume filtering layers.

**External Models:** Rather than reinventing solved problems, the platform integrates with third-party vendors through one-time integrations. For example, image safety classification uses commercial APIs since the problem is already well-solved. Multiple teams can use the same external model with separate API keys for billing attribution.

**External Prompts:** The most flexible option uses DoorDash's LLM Gateway to integrate with any model from any vendor. Teams can select target models, define custom input/output schemas, and configure fallback and retry strategies declaratively. The gateway handles provider abstractions, allowing prompts to automatically fall back to alternative models when primary providers experience downtime. Retry logic handles cases where LLMs fail to produce properly structured JSON outputs, attempting multiple times before returning structured errors.

### Composing Moderation Agents

Teams create "moderation agents" by composing these building blocks into workflows. A moderation agent is essentially a directed graph where nodes represent model calls and edges represent conditional logic expressed through a UI-based condition builder. Conditions can reference outputs from previous steps using simple expressions (e.g., "if internal_model.unsafe_label > 0.5 then call_llm_prompt else take_action"). The platform supports arbitrarily complex workflows with multiple branches, though teams are encouraged to keep complexity manageable.

### Synchronous vs. Asynchronous Execution

The platform supports two execution modes based on use case requirements:

**Synchronous Agents:** These maintain an open HTTP connection while executing all workflow steps, allowing the system to gate decisions (like blocking unsafe chat messages before delivery). The downside is the need to cap latency for each step to meet overall response time requirements. DoorDash minimizes synchronous usage when possible.

**Asynchronous Agents:** These acknowledge moderation requests immediately and execute workflows in the background. Upon completion, results are published to a Kafka topic that clients subscribe to, enabling reactive responses. This mode offers more flexibility for complex, multi-step workflows without strict latency constraints and is the preferred pattern.

### Backtesting: Testing Before Trusting

A critical platform feature is built-in backtesting capability. Teams can test new moderation agents or individual workflow steps against historical datasets before production deployment. Human reviewers classify results as correct/incorrect or as true positives/negatives, and the platform calculates metrics to assess production readiness. This "test before trust" workflow is built into the platform rather than being an afterthought, reducing the risk of deploying undertested prompts or workflows.

## LLMOps Lessons and Best Practices

### The Economics of Hybrid Architectures

The case study demonstrates that LLMs in production don't have to be expensive if architected thoughtfully. By placing a cheap model in front of the expensive LLM layer, DoorDash reduced LLM calls by over 90%. The economics only work if the cheap layer successfully filters obvious cases, allowing the LLM to handle only genuinely ambiguous content. This requires upfront investment in data understanding and model training—work that LLMs might eventually do, but which teams must do manually first to achieve cost-effective production systems.

### Score Over Labels: A Key Design Principle

One of the most important architectural decisions was requesting scores rather than binary labels from LLMs. This principle applies broadly beyond content moderation. Binary classifications force systems into rigid "yes/no" decision making, while scores enable graduated responses, threshold tuning without model retraining, and addition of new categories without pipeline rebuilds. Scores also align better with how LLMs reason—they're better at assessing severity on a scale than making absolute binary judgments.

### Platform Over Point Solutions

The evolution from SafeChat to a general-purpose platform illustrates an important principle for production LLM systems: when multiple teams request similar capabilities, the underlying pattern is often more valuable than any specific implementation. Code generation has become cheap, but maintaining multiple similar systems remains expensive. Investing in platforms that expose patterns as composable building blocks pays dividends as LLM use cases proliferate across an organization.

### The Importance of Data Understanding

DoorDash's emphasis on spending months understanding data before building SafeChat represents a counter-cultural stance in an era where LLMs can quickly produce working prototypes. The team explicitly resisted pressure to "just add an LLM" without first characterizing the problem space. This upfront investment enabled informed architectural decisions (like the 90/10 split between layers) that shaped the entire system design. The lesson applies broadly: even with powerful LLMs, understanding your data distribution, edge cases, and domain-specific patterns remains essential for production success.

### Model Retraining as an Ongoing Process

The internal classifier required nine retraining cycles to maintain effectiveness. New patterns emerged through production feedback—safety agents reported messages that evaded detection, revealing gaps like handling abbreviations. Each retraining cycle incorporated new labeled data representing these blind spots. This iterative improvement process is characteristic of production ML systems but deserves emphasis in the LLM era where one-shot prompting can create the illusion that models are static artifacts rather than evolving systems requiring continuous refinement.

### Fallback and Resilience Patterns

The LLM Gateway's fallback and retry capabilities proved essential for production reliability. LLM providers experience outages and models sometimes fail to produce properly formatted outputs. Having declarative fallback chains (e.g., falling back from a specialized internal model to a commercial API to an LLM prompt) and retry logic for malformed responses significantly improved system reliability without requiring application-level code changes.

### Voice Moderation Constraints

The voice moderation challenge highlights an important technical constraint: real-time audio processing cannot prevent harm the way text moderation can, since words are heard before transcription and analysis complete. This forced a reactive rather than proactive approach. Organizations building similar systems must account for medium-specific constraints—some channels enable prevention while others only enable response and consequence management.

### Graduated Actions Based on Severity

The multi-axis scoring approach enabled nuanced, context-appropriate responses. Low-severity content (swearing) triggered censoring, medium-severity (insults) triggered blocking, high-severity (threats) triggered order cancellation with refunds, and very high severity triggered additional offender warnings and victim removal from the situation. This graduated response framework represents a more sophisticated approach than binary "allow/block" systems and was only possible because of the scoring architecture.

### Backtesting as First-Class Workflow

Making backtesting a built-in platform feature rather than an afterthought represents a mature approach to LLM deployment. The team found that around 1,000 examples hit a sweet spot—enough for statistical confidence but small enough that human reviewers would carefully label results rather than rushing through tedious work. This pragmatic balance between rigor and practicality reflects production realities where perfect evaluation is impossible but some validation is essential.

### Gray Areas and Domain Specificity

The fraud detection example illustrated that different domains have different amounts of ambiguity. Safety violations tend to be relatively clear-cut, while fraud can involve significant gray areas (is offering extra payment actually fraud or just a generous tip?). This domain-specific variation affects how much confidence teams should have in automated decisions and where human oversight remains necessary.

### The Platform's Scope and Boundaries

DoorDash deliberately separated the moderation platform from the underlying ML platform that handles model training and fine-tuning. This separation of concerns allowed each team to focus on their area of expertise—the ML platform team handles the specialized knowledge required for model lifecycle management, while the moderation platform team focuses on orchestration, integration, and workflow composition. This boundary definition is instructive for organizations building similar systems.

## Technical Architecture Considerations

The case study reveals several architectural patterns worth highlighting for production LLM systems:

The use of Kafka for asynchronous moderation results demonstrates integration with existing data infrastructure rather than building bespoke communication channels. This allows teams to react to moderation results using familiar patterns and tooling.

The standardized input/output schemas for internal models enable composability—any client can use any internal model following the contract without custom integration work. This contract-based approach scales as the number of models and clients grows.

The LLM Gateway abstraction layer provides a clean separation between the moderation platform and the constantly evolving landscape of LLM providers. Teams can switch providers, add fallbacks, or experiment with new models without changing application logic.

The no-code workflow builder democratizes access to sophisticated AI pipelines, allowing product teams and domain experts to compose moderation agents without engineering bottlenecks. This self-service capability significantly reduced time-to-production for new use cases.

## Broader Implications

This case study illustrates several broader themes relevant to production LLM deployments. First, cost optimization through architectural patterns rather than just model selection—the hybrid approach achieved order-of-magnitude cost reduction compared to LLM-only alternatives. Second, the importance of domain-specific understanding even when using general-purpose models—the months spent analyzing DoorDash's specific safety challenges informed every subsequent architectural decision. Third, the value of platforms that expose patterns rather than point solutions—generalizing SafeChat into a platform multiplied its impact across the organization. Fourth, the necessity of resilience patterns like fallbacks and retries given the still-maturing reliability of LLM infrastructure. Finally, the ongoing nature of production ML/LLM systems—retraining, threshold tuning, and gap filling remain continuous activities rather than one-time efforts.
