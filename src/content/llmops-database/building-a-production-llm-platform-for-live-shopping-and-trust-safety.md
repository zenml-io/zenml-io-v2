---
title: "Building a Production LLM Platform for Live Shopping and Trust & Safety"
slug: "building-a-production-llm-platform-for-live-shopping-and-trust-safety"
draft: false
llmopsTags:
  - "customer-support"
  - "content-moderation"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "fallback-strategies"
  - "guardrails"
  - "monitoring"
  - "api-gateway"
  - "orchestration"
  - "cicd"
  - "microservices"
  - "devops"
  - "documentation"
  - "reliability"
  - "scalability"
  - "cache"
industryTags: "e-commerce"
company: "Whatnot"
summary: "Whatnot, a live shopping platform, built an enterprise LLM platform to support product and operational workflows across trust & safety, customer support, and seller assistance. The company recognized that while calling LLM APIs is straightforward, the real challenge lies in building reliable infrastructure around them to enable fast iteration, ensure trustworthy outputs, and maintain high availability. Their solution centered on three strategic pillars: velocity (self-serve prompt experimentation and tool catalogs), trust (LLM-as-judge evaluation and calibration workflows), and reliability (multi-provider support, fallbacks, and observability). By leveraging existing data infrastructure and consolidating tooling in a unified platform, Whatnot enabled non-technical teams to iterate on prompts and enabled production use cases like helping trust reviewers process harassment reports in minutes rather than hours."
link: "https://medium.com/whatnot-engineering/the-model-is-the-easy-part-building-the-llm-platform-at-whatnot-ec8730fa9bdf"
year: 2026
seo:
  title: "Whatnot: Building a Production LLM Platform for Live Shopping and Trust & Safety - ZenML LLMOps Database"
  description: "Whatnot, a live shopping platform, built an enterprise LLM platform to support product and operational workflows across trust & safety, customer support, and seller assistance. The company recognized that while calling LLM APIs is straightforward, the real challenge lies in building reliable infrastructure around them to enable fast iteration, ensure trustworthy outputs, and maintain high availability. Their solution centered on three strategic pillars: velocity (self-serve prompt experimentation and tool catalogs), trust (LLM-as-judge evaluation and calibration workflows), and reliability (multi-provider support, fallbacks, and observability). By leveraging existing data infrastructure and consolidating tooling in a unified platform, Whatnot enabled non-technical teams to iterate on prompts and enabled production use cases like helping trust reviewers process harassment reports in minutes rather than hours."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-llm-platform-for-live-shopping-and-trust-safety"
  ogTitle: "Whatnot: Building a Production LLM Platform for Live Shopping and Trust & Safety - ZenML LLMOps Database"
  ogDescription: "Whatnot, a live shopping platform, built an enterprise LLM platform to support product and operational workflows across trust & safety, customer support, and seller assistance. The company recognized that while calling LLM APIs is straightforward, the real challenge lies in building reliable infrastructure around them to enable fast iteration, ensure trustworthy outputs, and maintain high availability. Their solution centered on three strategic pillars: velocity (self-serve prompt experimentation and tool catalogs), trust (LLM-as-judge evaluation and calibration workflows), and reliability (multi-provider support, fallbacks, and observability). By leveraging existing data infrastructure and consolidating tooling in a unified platform, Whatnot enabled non-technical teams to iterate on prompts and enabled production use cases like helping trust reviewers process harassment reports in minutes rather than hours."
notion:
  pageId: "348f8dff-2538-80c1-a7fe-d4b4ff654422"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-20T06:46:00.000Z"
  lastEditedTime: "2026-04-20T06:46:00.000Z"
  publishedAt: "2026-04-26T13:11:07Z"
---

## Overview

Whatnot is a live shopping platform that built an internal LLM platform to support production workflows across multiple business functions including trust & safety, customer support, and seller operations. The case study, published in April 2026, provides a detailed account of how the company approached building production LLM infrastructure from an LLMOps perspective. The authors explicitly draw a parallel to the classic 2015 "Hidden Technical Debt in Machine Learning Systems" paper, noting that just as ML models were once "a tiny box" surrounded by complex infrastructure, LLM API calls are now an even smaller component within a larger operational ecosystem.

The central thesis is straightforward but important: **"the model is the easy part."** The harder challenges involve managing non-deterministic outputs, enabling fast iteration cycles, building trustworthy evaluation systems, and ensuring reliability at scale. Whatnot's approach is notable for emphasizing democratization—enabling product managers, operations leads, and policy experts to contribute directly to LLM system improvements without requiring engineering intervention for every change.

## Strategic Framework: Three Pillars

The Whatnot team organized their LLM platform around three self-reinforcing pillars: **velocity**, **reliability**, and **trust**. These aren't independent goals but rather mutually reinforcing capabilities. Reliability makes teams willing to depend on the platform in production. Production usage generates the data and feedback loops needed to build trust. Trust enables teams to move with velocity because they can confidently assess whether changes actually improve outcomes.

### Foundation: Existing Infrastructure

A critical success factor mentioned explicitly is that Whatnot had already invested heavily in foundational platform work before building the LLM platform. This included a modern data stack, scaling investments, shared tooling, and internal platform primitives. Importantly, much of Whatnot's business logic is consolidated in a single codebase rather than fragmented across many microservices, which made exposing existing capabilities through the LLM platform significantly easier. The authors note that teams operating across many languages, microservices, and ownership boundaries would face much greater challenges following a similar path—this is a valuable cautionary note about the organizational prerequisites for this approach.

## Velocity: Democratizing LLM Iteration

The velocity pillar focuses on lowering barriers to contribution and tightening iteration loops. The key insight is that LLMs have a fundamentally different accessibility profile compared to traditional ML. With traditional ML, contributing improvements typically requires specialized expertise and workflows. With LLMs, if someone can explain a task clearly, critique an answer, or describe desired behavior, they're much closer to making a meaningful contribution. This matters because many high-leverage improvements come from refining prompts, adjusting examples, attaching appropriate tools, or improving evaluation—tasks where domain experts (PMs, ops leads, policy experts) often have better intuition than engineers.

### Prompt Experimentation Framework

Whatnot built a self-serve prompt experimentation system that integrates with their standard product experimentation framework. The platform allows non-engineers to test prompt variants directly without writing code, updating SDKs, or waiting for deployments. However, self-serve doesn't mean ungoverned—experiments still run through the same guardrails used in their app product flows.

A particularly clever innovation is **post-exposure logging**. In many LLM features, two prompt variants produce identical outputs most of the time. Standard A/B frameworks count all cases as exposures, even when the user experience didn't change, which dilutes statistical signal and makes it harder to detect genuine improvements. Whatnot's approach only counts an exposure when the two prompt variants produce different outputs. This focuses measurement on cases where the experiment could actually matter, making prompt iteration "10x+ faster" according to the authors. The case study references similar approaches from DoorDash and Spotify, positioning this as an emerging best practice rather than a novel invention.

This is a genuinely valuable contribution to LLMOps practice, though readers should note the claimed "10x" speedup is likely domain-specific and dependent on the proportion of identical outputs between variants. The approach makes most sense when prompt changes affect only a subset of inputs—which is common in production systems.

### Tool Catalog and Function Calling

The second major velocity enabler is a centralized tool registry. Many LLM workflows quickly evolve beyond "just prompting" to require access to live data or action-taking capabilities (looking up orders, fetching shipment details, checking refund eligibility, updating tickets). The challenge isn't whether models can call functions—it's whether teams can expose those functions in a reusable, understandable, and safe-to-test way.

Whatnot's solution is a shared tool catalog: engineers define tools once in Python, register them in the catalog, and they automatically become available to prompt authors. From the catalog interface, PMs and engineers can browse available tools, inspect schemas, understand functionality, and attach them to prompts without writing custom agent loops or managing access control manually. This is essentially treating tools as first-class platform primitives rather than one-off implementations tied to specific features.

This approach has clear advantages for organizational scaling—preventing redundant tool implementations and making capabilities discoverable—but the case study doesn't discuss potential challenges like versioning, schema evolution, or managing breaking changes when tool implementations are updated.

## Trust: Evaluation and Measurement

The trust pillar focuses on enabling teams to judge system performance with "clear eyes" through inspection, measurement, and repeated review of real outputs. The authors explicitly warn against false confidence: a few strong examples can make a system appear better than it is, and fluent answers can hide weak underlying behavior. Their philosophy emphasizes staying "close to the data" as the only way to know whether a system is working and improving.

### Evaluation Strategy

Whatnot supports both deterministic and non-deterministic evaluation. Deterministic checks (valid JSON, correct tool calls, required fields) are described as "table stakes"—necessary but insufficient. These checks only validate mechanical requirements, not whether the system did the right thing for users.

The higher-leverage work involves **LLM-as-a-judge** evaluation combined with calibration workflows that let domain experts teach the evaluator directly. LLM judges can score open-ended responses against rubrics in ways much closer to human review, replacing brittle rules, similarity metrics, and manual spot-checking that don't scale. Importantly, once a judge is aligned through calibration, it becomes more than an offline scoring tool—teams can attach it to production use cases, monitor agreement over time, and catch degradation before it becomes product drift.

The case study describes a calibration workflow where users annotate data to build judges that can be repurposed for both backtesting and online evaluation. Evaluation rubrics are owned by product teams closest to the use case, who can clearly define what "good" means in their specific context. This is a sensible distribution of responsibility, though it does require product teams to develop evaluation expertise.

An interesting additional capability mentioned is using data mining to automatically surface weird, rare, or high-value examples for human review, ensuring evaluation sets evolve with the product rather than freezing in time. This addresses a common failure mode in ML systems where evaluation datasets become stale and stop representing actual production distribution.

### Critical Perspective on Evaluation

While the evaluation approach described is sophisticated, readers should note that LLM-as-a-judge has well-documented limitations including position bias, length bias, and difficulty with nuanced distinctions. The case study doesn't discuss how Whatnot addresses these issues or validates judge reliability. Additionally, the effectiveness of this approach depends heavily on the quality of calibration—if domain experts provide inconsistent or biased annotations, the judge will inherit those problems. The case study would be stronger with discussion of inter-annotator agreement, judge validation procedures, or examples of how they've caught and corrected judge miscalibration.

## Reliability: Production-Grade Infrastructure

The reliability pillar treats the LLM platform as production infrastructure rather than a demo or prototype. Teams building on the platform need high availability, predictable performance, and confidence that provider issues won't immediately break their products.

### Technical Primitives

Whatnot's reliability strategy includes:

- **Multi-provider support**: Not being locked into a single LLM provider
- **Fallback behavior by default**: Automatic failover when providers have issues
- **Observability**: Monitoring and debugging capabilities
- **Platform primitives**: Caching, rate limiting, and guardrails

The goal is that teams shipping on the platform "inherit a more reliable system by default" rather than having to assemble reliability mechanisms from scratch. This is sound platform thinking—centralizing reliability concerns allows individual teams to focus on their specific use cases.

However, the case study provides limited technical detail about how these primitives are implemented. For example:

- How does provider routing work? Is it manual, automatic based on latency, or intelligent based on task type?
- What caching strategies are used? Request-level, semantic similarity-based?
- How are guardrails implemented and configured? Are they prompt-based, model-based, or rule-based?
- What observability tools and metrics are prioritized?

These details would be valuable for teams attempting to replicate this approach.

## Architecture

The high-level architecture diagram shows:

- **Platform UI**: Self-serve interface for prompt experimentation and tool catalog browsing
- **Core LLM Service**: Central service handling LLM requests
- **Shared Middleware**: Common functionality like logging, authentication, rate limiting
- **Provider Routing**: Directing requests to appropriate LLM providers
- **Integration with broader company tooling ecosystem**: Data stack, analytics, experimentation framework

This architecture is relatively conventional for internal LLM platforms, with the key differentiator being tight integration with existing company infrastructure rather than any particularly novel architectural pattern.

## Production Use Cases

The case study mentions several concrete production applications:

- **Trust & Safety**: Helping reviewers process harassment reports in minutes instead of hours
- **Customer Support**: Giving agents the right context to resolve buyer issues on the first try
- **Seller Assistance**: Enabling sellers to get clear policy answers without filing tickets

These use cases span operational efficiency, customer experience, and self-service enablement. However, the case study doesn't provide quantitative results for any of these applications—no metrics on time savings, resolution rates, accuracy improvements, or user satisfaction. This is a significant gap for readers trying to assess the actual business impact of the platform.

## Team and Organizational Considerations

The case study emphasizes that the platform was built "quickly, and with a small team" by leveraging existing foundations. This is presented as a success story, but readers should consider the prerequisites: years of prior infrastructure investment, consolidated business logic in a single codebase, and an established modern data stack. Organizations without these foundations would face substantially different challenges.

The democratization aspect—enabling PMs, ops leads, and policy experts to contribute—is genuinely valuable but also carries risks not discussed in the case study. Self-serve access to production LLM systems raises questions about governance, quality control, and unintended consequences. How does Whatnot prevent well-intentioned but poorly-conceived prompt changes from degrading user experience? What approval processes exist? How is rollback handled?

## Critical Assessment

**Strengths:**

- Strong conceptual framework organizing LLMOps around velocity, trust, and reliability
- Practical innovations like post-exposure logging for prompt experiments
- Democratization focus enabling non-technical contributors
- Integration of evaluation deeply into the platform rather than treating it as an afterthought
- Honest acknowledgment that existing infrastructure was a critical prerequisite

**Weaknesses and Missing Information:**

- Limited quantitative results demonstrating business impact
- Insufficient technical detail on reliability primitives (caching, rate limiting, guardrails, provider routing)
- No discussion of failure modes, challenges encountered, or lessons learned from mistakes
- Missing information on governance, approval processes, and risk management for self-serve access
- Lack of detail on LLM-as-a-judge validation and calibration quality assurance
- No discussion of costs, both infrastructure costs and engineering investment required
- Unclear what "small team" means quantitatively and what skills/roles were required

**Applicability:**

This approach is most applicable to:

- Organizations with consolidated technical architectures rather than highly fragmented microservices
- Companies with existing modern data stacks and experimentation frameworks
- Use cases where domain experts can meaningfully define and evaluate quality
- Situations where prompt/configuration iteration is more important than model customization

It may be less applicable to:

- Organizations needing heavy model customization or fine-tuning
- Highly distributed architectures with many ownership boundaries
- Use cases where evaluation criteria are extremely subjective or context-dependent
- Resource-constrained environments without existing infrastructure foundations

## Conclusion

This case study provides valuable insights into building production LLM infrastructure at a mid-to-large scale technology company. The three-pillar framework (velocity, trust, reliability) is conceptually sound and the specific implementations—particularly post-exposure logging and centralized tool catalogs—offer concrete patterns other organizations can adopt.

However, readers should approach the case study with appropriate skepticism. It's a promotional piece from Whatnot's engineering blog, and while it doesn't make obviously inflated claims, it presents an idealized view without discussing challenges, failures, or tradeoffs. The lack of quantitative results is particularly notable—we don't see metrics on experimentation velocity improvements beyond the claimed "10x," no evaluation accuracy numbers, no reliability SLAs, and no business impact measurements for the production use cases mentioned.

The case study is most valuable as a framework and set of patterns to consider rather than a blueprint to follow precisely. Organizations should carefully assess whether they have the prerequisite infrastructure investments and organizational characteristics that enabled Whatnot's approach before attempting to replicate it.
