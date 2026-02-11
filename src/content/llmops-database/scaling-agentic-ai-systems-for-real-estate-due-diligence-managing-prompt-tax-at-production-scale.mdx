---
title: "Scaling Agentic AI Systems for Real Estate Due Diligence: Managing Prompt Tax at Production Scale"
slug: "scaling-agentic-ai-systems-for-real-estate-due-diligence-managing-prompt-tax-at-production-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68414a6b766909872fc337b8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:10:34.543Z"
  createdOn: "2025-06-05T07:42:35.935Z"
llmopsTags:
  - "document-processing"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "structured-output"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "fallback-strategies"
  - "system-prompts"
  - "monitoring"
  - "cicd"
  - "continuous-deployment"
  - "scaling"
  - "fastapi"
  - "openai"
  - "anthropic"
  - "google-gcp"
industryTags: "legal"
company: "Orbital"
summary: "Orbital, a real estate technology company, developed an agentic AI system called Orbital Co-pilot to automate legal due diligence for property transactions. The system processes hundreds of pages of legal documents to extract key information traditionally done manually by lawyers. Over 18 months, they scaled from zero to processing 20 billion tokens monthly and achieved multiple seven figures in annual recurring revenue. The presentation focuses on their concept of \"prompt tax\" - the hidden costs and complexities of continuously upgrading AI models in production, including prompt migration, regression risks, and the operational challenges of shipping at the AI frontier."
link: "https://www.youtube.com/watch?v=Bf71xMwd-Y0"
year: 2025
seo:
  title: "Orbital: Scaling Agentic AI Systems for Real Estate Due Diligence: Managing Prompt Tax at Production Scale - ZenML LLMOps Database"
  description: "Orbital, a real estate technology company, developed an agentic AI system called Orbital Co-pilot to automate legal due diligence for property transactions. The system processes hundreds of pages of legal documents to extract key information traditionally done manually by lawyers. Over 18 months, they scaled from zero to processing 20 billion tokens monthly and achieved multiple seven figures in annual recurring revenue. The presentation focuses on their concept of \"prompt tax\" - the hidden costs and complexities of continuously upgrading AI models in production, including prompt migration, regression risks, and the operational challenges of shipping at the AI frontier."
  canonical: "https://www.zenml.io/llmops-database/scaling-agentic-ai-systems-for-real-estate-due-diligence-managing-prompt-tax-at-production-scale"
  ogTitle: "Orbital: Scaling Agentic AI Systems for Real Estate Due Diligence: Managing Prompt Tax at Production Scale - ZenML LLMOps Database"
  ogDescription: "Orbital, a real estate technology company, developed an agentic AI system called Orbital Co-pilot to automate legal due diligence for property transactions. The system processes hundreds of pages of legal documents to extract key information traditionally done manually by lawyers. Over 18 months, they scaled from zero to processing 20 billion tokens monthly and achieved multiple seven figures in annual recurring revenue. The presentation focuses on their concept of \"prompt tax\" - the hidden costs and complexities of continuously upgrading AI models in production, including prompt migration, regression risks, and the operational challenges of shipping at the AI frontier."
---

## Overview

Orbital is a legal technology company with offices in New York and London, employing approximately 80 people (half in product engineering). The company's mission is to automate real estate due diligence to accelerate property transactions. Their CTO, Andrew Thompson, presented insights on what it takes to operate LLM-powered agentic systems at scale, introducing the concept of "prompt tax" - the hidden cost of maintaining and migrating prompts as AI models rapidly evolve.

The core product, Orbital Co-Pilot, was commercialized in January 2024. It functions as an agentic system that reads legal documents (deeds, leases, often 100+ pages) and extracts relevant information that real estate lawyers traditionally compiled manually. The system breaks down tasks into subtasks, each with its own agentic subsystem making multiple LLM calls to find specific information like lease dates, annual rent figures, and other key data points. The output includes citations that allow licensed lawyers to verify answers against source documents.

## Scale and Business Results

The presentation provides concrete metrics on the system's growth over 18 months:

- Token consumption grew from less than 1 billion tokens monthly to nearly 20 billion tokens monthly
- Revenue scaled from zero to multiple seven figures in annual recurring revenue
- The system now performs work equivalent to what was previously done manually by real estate lawyers

These figures represent significant production usage and demonstrate that the agentic approach has found product-market fit in the legal domain.

## Technical Architecture and Model Evolution

The team has navigated a complex journey through multiple LLM generations. They started with GPT-3.5 and progressively moved through what Thompson calls "system one models" (GPT-4 32K, GPT-4 Turbo, GPT-4o, GPT-4.1) and then to "system two" reasoning models (O1 Preview through O4 Mini and everything in between). GPT-4 32K is noted as a personal favorite due to its expanded context window enabling agentic capabilities for the first time, despite being "radically expensive."

The product architecture involves documents first being OCR'd (since legal documents often contain handwritten and typed text) before being structured for LLM processing. The agentic system creates a plan, breaks it into subtasks, and each subtask uses multiple LLM calls to achieve specific objectives like finding a lease date or current rent amount.

## Strategic Decisions in LLMOps

Three key strategic decisions shaped Orbital's approach:

**Prompting Over Fine-Tuning**: The team deliberately chose to optimize for prompting rather than fine-tuning models. This decision prioritized development speed - prompts can be pulled in real-time into the agentic system, allowing rapid iteration based on user feedback. This was especially valuable during the product-market fit phase and continues to enable shipping features "at a blistering pace."

**Heavy Reliance on Domain Experts**: Former private practice real estate lawyers with decades of experience are embedded in the product team. These domain experts write many of the prompts, effectively encoding their expertise into AI instructions. This represents an interesting organizational pattern where domain knowledge is transferred to AI systems through prompt authorship rather than traditional training or fine-tuning.

**Vibes Over Evals**: Perhaps the most candid and controversial admission is that Orbital has achieved substantial growth primarily through "vibes" - subjective human testing rather than rigorous automated evaluation systems. Domain experts test systems before release, sometimes logging results in spreadsheets, but there's no comprehensive objective evaluation framework. Thompson acknowledges this is somewhat surprising given the growth achieved and notes that a formal eval system is "always just within touching distance on the roadmap."

## Prompt Management at Scale

The company maintains two categories of prompts: agentic prompts (owned by AI engineers, dealing with tool selection and system-level behaviors) and domain-specific prompts (written by real estate lawyers, encoding domain expertise). The number of domain-specific prompts has grown from near zero to over 1,000 prompts - and Thompson notes that more prompts equals more "prompt tax."

This prompt proliferation creates a management challenge. Each new model release requires evaluating and potentially migrating all these prompts, which represents significant effort that compounds with system complexity.

## Model Migration Tactics

Thompson shares specific battle-tested tactics for migrating between model generations, particularly from system-one to system-two models:

**From Specific to Abstract**: System-one models often required explicit instructions on how to accomplish tasks. System-two models work better when given clear objectives and freedom to reason through approaches themselves. Migration involves stripping out procedural instructions and focusing on outcomes.

**Leaner Prompts**: System-one models often needed repeated instructions to follow them reliably. System-two models can work with less repetition, so prompts should be streamlined during migration.

**Unblocking the Model**: System-two models perform poorly with too many constraints. They prefer clear objectives with room to reason through permutations. Removing artificial constraints can improve performance.

**Leveraging Thought Tokens**: System-two models produce thought tokens that serve dual purposes - providing explainability for lawyers who want to understand reasoning on complex legal matters, and enabling debugging when outputs aren't working correctly.

**Using New Models for Migration**: An interesting hack is using system-two models themselves to help migrate prompts. The new model "knows itself" and can transform domain-specific prompts optimized for older models into versions optimized for itself, reducing manual migration effort.

## Progressive Deployment and Change Management

The presentation emphasizes the psychological and organizational challenges of model upgrades. Thompson identifies "change aversion bias" - heightened anxiety about new systems simply because they're unknown, even if objectively better. He describes a phenomenon of "poking the bear" where merely announcing a model change puts everyone on heightened alert to find issues, potentially generating more negative feedback than if the change happened silently.

The team uses feature flags for progressive rollout of model upgrades, similar to traditional software deployment practices. The strategy involves rolling out internally first, then to limited progressive users, gradually scaling to 50-100% while monitoring feedback. If feedback overwhelms internal capacity to respond, they dial back and iterate.

## Feedback Loop Infrastructure

A critical component of their LLMOps practice is a rapid feedback loop. Feedback comes through the product (likely thumbs up/down mechanisms), immediately routes to domain experts who evaluate it, determine what prompt changes are needed, make changes, and deploy to production. This cycle can complete in minutes or hours rather than the days or weeks typical of traditional bug-fix cycles.

## The Meta-Question: Will Vibes Scale?

Thompson honestly grapples with whether their vibes-based approach will scale as the product surface area increases. Currently the combination of domain expert testing and real-time user feedback with rapid response tooling is working well. However, he anticipates this may break down at some point.

The question of whether formal evals are the answer remains open. Thompson notes the complexity involved - for real estate legal, they must evaluate answer correctness, answer style, conciseness, and citation accuracy across all prompts and edge cases. Creating comprehensive evals for every edge case as product velocity grows may be "prohibitively expensive, prohibitively slow, and might even be a bit of an impossible task."

## The "Prompt Tax" Concept

The central concept Thompson introduces is "prompt tax" - distinct from technical debt. Technical debt typically involves shipping quickly with plans to fix later, and often those features get deleted or need fundamental rebuilding. Prompt tax involves the desire to upgrade to new models immediately (since they unlock new capabilities), but facing unknown consequences - unclear what will improve and what will break. The strategy becomes "buy now, pay later" - ship model upgrades aggressively, fix issues on the fly through progressive deployment, and accept that some prompt tax may never need to be paid if feared regressions don't materialize.

## Team Structure and Philosophy

The team structure embeds AI engineers alongside domain experts, software engineers, product managers, and designers under a tech lead. Thompson advocates for "product AI engineers" - professionals who understand both technical model capabilities and user problems, who can translate between what models can do and what products should do. This echoes a broader industry trend toward T-shaped AI practitioners.

The team created a mantra about "betting on the model" - don't build for current capabilities, anticipate where models will be in 3-12 months (smarter, cheaper, faster, more capable) and design products that grow with those models rather than stagnating at current limitations.

## Honest Reflections and Limitations

The presentation is notably candid about uncertainties and limitations. Thompson acknowledges they don't have a formal eval system despite its importance, that uncertainty is inherent in working with probabilistic systems, and that shipping requires bravery and accepting that some things will break. This honesty provides valuable insight into the real-world tensions between shipping speed and production reliability in LLMOps contexts.

The case study represents an interesting data point: significant commercial success is possible with vibes-based quality assurance, heavy reliance on domain experts, and rapid iteration on prompts - at least up to the scale of 20 billion tokens monthly and seven-figure ARR. Whether this approach hits a wall at larger scales remains an open question Thompson himself is watching.