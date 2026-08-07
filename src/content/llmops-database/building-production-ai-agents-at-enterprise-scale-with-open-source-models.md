---
title: "Building Production AI Agents at Enterprise Scale with Open Source Models"
slug: "building-production-ai-agents-at-enterprise-scale-with-open-source-models"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "fine-tuning"
  - "prompt-engineering"
  - "reinforcement-learning"
  - "few-shot"
  - "latency-optimization"
  - "model-optimization"
  - "error-handling"
  - "multi-agent-systems"
  - "agent-based"
  - "evals"
  - "human-in-the-loop"
  - "open-source"
  - "documentation"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "anthropic"
  - "openai"
  - "meta"
industryTags: "tech"
company: "Decagon"
summary: "Decagon builds AI agents for customer support and enterprise operations, focusing on productizing AI capabilities for large enterprises rather than relying on forward-deployed consulting models. The company evolved from initially using frontier models from OpenAI and Anthropic to primarily running 90% of workflows on fine-tuned open source models to optimize for latency, cost, and performance. By building an internal research team and model factory approach, Decagon creates specialized models for specific tasks within their conversational agents, achieving better performance than general-purpose frontier models while reducing costs and latency. The solution has expanded beyond customer support to sales, operations, and other business processes, with customers seeing rapid deployment cycles and the ability to self-iterate on agent capabilities through a glass-box product approach."
link: "https://www.youtube.com/watch?v=cO1f2wOxSH4&t=661s"
year: 2026
seo:
  title: "Decagon: Building Production AI Agents at Enterprise Scale with Open Source Models - ZenML LLMOps Database"
  description: "Decagon builds AI agents for customer support and enterprise operations, focusing on productizing AI capabilities for large enterprises rather than relying on forward-deployed consulting models. The company evolved from initially using frontier models from OpenAI and Anthropic to primarily running 90% of workflows on fine-tuned open source models to optimize for latency, cost, and performance. By building an internal research team and model factory approach, Decagon creates specialized models for specific tasks within their conversational agents, achieving better performance than general-purpose frontier models while reducing costs and latency. The solution has expanded beyond customer support to sales, operations, and other business processes, with customers seeing rapid deployment cycles and the ability to self-iterate on agent capabilities through a glass-box product approach."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-agents-at-enterprise-scale-with-open-source-models"
  ogTitle: "Decagon: Building Production AI Agents at Enterprise Scale with Open Source Models - ZenML LLMOps Database"
  ogDescription: "Decagon builds AI agents for customer support and enterprise operations, focusing on productizing AI capabilities for large enterprises rather than relying on forward-deployed consulting models. The company evolved from initially using frontier models from OpenAI and Anthropic to primarily running 90% of workflows on fine-tuned open source models to optimize for latency, cost, and performance. By building an internal research team and model factory approach, Decagon creates specialized models for specific tasks within their conversational agents, achieving better performance than general-purpose frontier models while reducing costs and latency. The solution has expanded beyond customer support to sales, operations, and other business processes, with customers seeing rapid deployment cycles and the ability to self-iterate on agent capabilities through a glass-box product approach."
notion:
  pageId: "3b5f8dff-2538-80db-a93f-db5e8b89d899"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:48:00.000Z"
  lastEditedTime: "2026-08-07T12:48:00.000Z"
  publishedAt: "2026-08-07T13:06:41Z"
---

## Overview

Decagon represents a sophisticated case study in building production AI agents at enterprise scale. The company creates AI agents primarily for customer support but has expanded into broader business process automation including sales, operations, and proactive customer engagement. The founders discuss their evolution from a frontier model-dependent startup to an organization running 90% of workflows on fine-tuned open source models, establishing Decagon Labs as an internal model factory.

## Model Selection and Evolution Journey

Decagon's journey illustrates a common pattern in production LLM deployments. Initially, the company used frontier models from OpenAI and Anthropic because the primary goal was simply getting something working and delivering value. The founders acknowledge that when starting out, using frontier models makes sense because they want maximum capability out of the box without needing to invest in customization.

The inflection point came when Decagon began working with larger enterprises handling millions of customers and launched voice agents. At this stage, latency became a critical factor that frontier models couldn't adequately address. The company needed to deliver not just good responses but fast responses, particularly for voice interactions where latency is immediately perceptible to users.

This drove the transition to smaller models about a year ago. The challenge was that while frontier labs do offer small models, Decagon found they couldn't control them sufficiently for their needs. Most small models out of the box weren't good enough at the specific tasks required, necessitating fine-tuning and customization, which led naturally to open source models.

## Fine-Tuning Strategy and Task Decomposition

A crucial insight from Decagon's approach is how they decompose the agent's work into discrete tasks. Rather than using one large model for everything, they recognize that their agent needs to do many things simultaneously during conversations - identifying topics, detecting bad actors, routing requests, executing procedures. Each individual task doesn't require the full intelligence of a frontier model that can do math, coding, and countless other capabilities.

By fine-tuning smaller open source models to be really good at specific tasks, Decagon achieves performance that matches or exceeds large frontier models on those narrow domains. The founders push back against the common framing of this as a trade-off between intelligence and cost. They argue it's a false dichotomy because fine-tuned smaller models, while less general-purpose, actually outperform large state-of-the-art models on the specific tasks they're optimized for. This means they get all three benefits: better performance, lower cost, and faster inference.

## Building Decagon Labs as a Model Factory

The decision to invest in an internal research team and establish what became Decagon Labs reflects the ongoing nature of model work in production. The founders emphasize that fine-tuning isn't a one-time activity. They constantly train new models and deprecate old ones as the open source frontier advances and new capabilities emerge. As frontier and open source models improve, new use cases become possible, and tasks that previously required custom models can now be handled by newer base models.

Decagon Labs operates as a model factory designed to compress the time between a new model release and having a useful fine-tuned model deployed to their specific tasks. This continuous model development cycle is necessary because the model landscape changes so quickly.

## Evaluation Philosophy and End-to-End Testing

Decagon's evaluation approach reflects sophisticated LLMOps thinking. Rather than relying on public benchmark datasets or simply monitoring loss curves during training, they build custom evaluations specific to their use case. Critically, they evaluate the entire system end-to-end rather than individual models in isolation. The question isn't whether a specific model is good at a specific task, but whether that model working in concert with all their other models delivers the end customer outcome they care about.

This customer-outcome-focused evaluation is tightly coupled to their use case and requires significant internal tooling. The team found that because their evaluation needs are so specific, they need to build most of the infrastructure for training and evaluating models internally. They only outsource generic tasks like labeled data acquisition and measuring data set diversity, where vendors can provide common capabilities across companies.

## Infrastructure and Deployment Considerations

The conversation reveals several important infrastructure decisions. Regarding cost, the founders note that while token economics is a hot topic in the broader AI community, it's not their primary concern. Performance and latency drive their decisions, with cost coming as a beneficial side effect. This makes sense for a growth-stage company where the priority is product excellence and market growth rather than margin optimization.

Interestingly, they note that over time they've actually increased the number of tokens per conversation because they're doing more model calls to improve quality through additional checks and parallelization. This decision would be different if they were solely optimizing for cost.

The team maintains relationships with both open source and frontier models. The remaining 10% of workflows still use frontier models, primarily for new projects, experimental products, or auxiliary tasks that require broad, open-ended exploratory capabilities rather than well-defined paths. A specific example is their Duet Autopilot product, which reviews millions of conversations, finds trends, creates variants of the primary model, and tests which variants perform better. This type of meta-work on the agent system itself benefits from the broad intelligence of frontier models.

## Product Evolution: From Customer Support to Business Process Agents

Decagon's product evolution demonstrates how LLM capabilities enable expanding use cases. Initially focused purely on customer support because that's what models could reliably handle, they've expanded to sales, operational workflows, and proactive customer engagement as models improved.

The key insight is that Decagon didn't build an agent specifically for customer support but rather an agent that follows business processes well. Customer support, sales lead qualification, and operational workflows all reduce to agents following business processes. This architectural decision to build flexibly from the start enabled expansion as model capabilities improved.

The specific capability that unlocked this expansion was improved instruction following. Earlier models required very tight, specific guidance with limited deviation. As models became smarter, Decagon could give broader guidance and trust models to interpret instructions like a human would and fill in reasonable gaps. Customer support can follow tight paths, but sales qualification requires open-ended discovery questions where conversations naturally diverge, requiring models to improvise appropriately.

## Agent Operating Procedures and Productization

A fascinating technical detail is Decagon's development of Agent Operating Procedures. Initially, the team wrote business logic and procedures in code, which required significant forward-deployed engineering work. They productized this by creating a format for writing procedures in plain text that the AI could understand and execute. This dramatically reduced the engineering effort needed for each new customer deployment.

This evolution exemplifies the core LLMOps pattern of identifying repetitive work in deployment and productizing it into the core platform. The founders emphasize that every forward-deployed engineer contribution should feed back into core product rather than creating one-off customer customizations.

## Duet and Duet Autopilot: Meta-Agents for Agent Development

Duet represents an advanced application of LLMs to the LLMOps workflow itself. Rather than having engineers manually write agent operating procedures, create integrations and tools, write tests, and monitor conversations, Duet is a separate agent that does all of this automatically. Given transcripts and documentation, Duet figures out the best procedures, writes corresponding tests and simulations, monitors live conversations, identifies trends in performance issues, and drafts improvements.

Duet Autopilot extends this further by reviewing millions of conversations, finding trends, creating variants of the primary model, and testing which variants perform better. This meta-level automation of the model improvement cycle represents a sophisticated approach where LLMs help build and improve other LLMs.

Both products became possible only with the improvement of reasoning models from Anthropic and OpenAI. While these models are primarily marketed for coding use cases, they proved equally valuable for the complex, open-ended task of improving AI agents.

## Forward-Deployed Model and Productization Philosophy

Decagon employs forward-deployed engineers and agent PMs, but with a specific philosophy distinct from traditional consulting models. The founders draw a clear line between Palantir-style forward deployment and what they're building. Their forward-deployed team exists to understand customer needs and workflows, but the output must always contribute to core product rather than building one-off solutions.

The memorable phrase used internally is that forward-deployed engineers should eat pain and excrete product. Every pain point encountered in customer deployments should be analyzed for whether it can be productized so the next ten customers get the solution automatically. Agent Operating Procedures themselves emerged from this process, when the team recognized that writing procedures in code was taking too much forward-deployed engineering time.

This approach enables Decagon to maintain the scaling properties of a traditional tech company rather than becoming a consulting firm. The founders are explicit that very few companies can execute Palantir's model, and most companies attempting heavy forward deployment will eventually need to reckon with whether they have a scalable product.

## International Expansion and Language Handling

Decagon's early international expansion illustrates two AI-specific trends. First, top-down pressure exists across geographies because executives have experienced tools like ChatGPT and see AI adoption as imperative. Customer support and coding are obvious first use cases for most enterprises. Second, language barriers that might have previously slowed international expansion are dramatically reduced because LLMs handle multilingual scenarios much more easily than traditional software.

That said, the founders note that international expansion still requires substantial investment in local presence, data residency compliance, and understanding local competitors who know their markets better. They only invest heavily in markets where they've naturally acquired customers through their US operations first.

## Enterprise Sales and Deployment Process

A significant part of Decagon's success comes from deeply understanding enterprise deployment challenges beyond just product quality. When selling to large regulated enterprises, especially in financial services, a critical question is not just will this work but can we actually deploy it. Decagon invested in mapping out the deployment journey in granular detail, so they can walk enterprises through the path from initial meeting to full production deployment.

This includes understanding model risk processes, testing protocols, initial rollout strategies, issue detection and remediation, and compliance requirements. For large enterprises, this process expertise is as important as the technology itself. The founders note this aspect is often overlooked by tech companies selling to enterprise.

One customer mentioned switching from Sierra to Decagon specifically because Sierra felt like a black box requiring forward-deployed engineers for everything, creating drag on iteration speed. With Decagon's glass-box approach and productized platform, they were able to build seven new conversation journeys in a month compared to three in a year with their previous provider.

## Data Residency, Compliance, and Governance

While not deeply detailed in the conversation, the founders mention several enterprise requirements that shape their LLMOps approach including data residency requirements for different geographies, model risk governance processes, security reviews, and compliance monitoring. They've built tooling for compliance teams to monitor agent behavior, which represents infrastructure beyond just the AI models themselves that's necessary for enterprise deployment.

## Cost Economics and Token Usage

The discussion of token economics reveals an interesting perspective for growth-stage companies. While cost is discussed extensively in the AI community, Decagon's priority hierarchy puts performance and latency first, with cost as a beneficial side effect rather than a primary driver. This changes once a company moves to fine-tuned open source models - at that point the cost advantages are substantial but weren't the motivation for the transition.

The founders note that their token bills are very large and have actually grown over time as they do more model calls per conversation to improve quality. For a growth-stage company, this makes sense because customers care about agent performance, not the underlying costs. Eventually, once market leadership is established, cost optimization becomes more important, but it's not the current priority.

## Team Structure and Research Investment

Decagon maintains an expensive research team specifically for taking open source models and tuning them for their use cases. This represents a significant organizational investment that not all application layer companies make. The decision reflects the belief that owning model customization provides competitive advantage through better latency, cost, and performance.

For enterprises considering similar investments, the founders note that post-training open source models is non-trivial. It requires obtaining quality training data, building custom evaluations and benchmarks specific to your use case, and having expertise in the training process itself. They expect enterprises will eventually build similar capabilities but it will take longer than people think. Until use cases solidify and reach production scale, the effort investment isn't justified.

## Hiring and Tooling for Productivity

When asked about bottlenecks, the founders immediately cite hiring rather than model capabilities. Even as sophisticated users of AI coding tools, they and competitors are hiring aggressively. The reasoning is that everyone has access to these productivity tools, so if competitors use them to build three times as much, you need to match that pace, which still requires hiring.

This suggests that while AI tools increase per-person productivity, they don't reduce headcount needs for ambitious companies because the competitive bar for what must be built rises proportionally.

## Cultural Aspects and Work Approach

While not strictly LLMOps, the conversation touches on Decagon's culture of working intensively and maintaining high accountability. The founders view this less as exceptional grinding and more as the natural outcome of ambitious people working on important problems. They emphasize cross-functional collaboration with engineers on sales calls, salespeople debugging product, and agent PMs spanning the entire spectrum of work.

This cross-functional approach seems important for their LLMOps success because the tight feedback loop between customer needs, product capabilities, and technical implementation requires people who understand multiple domains and can work across traditional boundaries.

## Long-Term View on AI and Software

The founders push back against the narrative that frontier labs will be the last startups and applications are just thin wrappers. Even if AGI emerges, they argue that agents will still need software infrastructure - places to store work, pull information from, and reason about things. Human beings are in some sense already AGI, yet we've still needed databases, CRMs, and various software tools.

They distinguish between SaaS companies built solely for humans to do work, which might face challenges, and infrastructure software that provides capabilities agents will need. Application layer companies might evolve into labs for specific verticals, where the primary product becomes models excellent at specific task domains.

On the job displacement question, the founders note that customer support sees more latent demand than supply. When support becomes cheaper through automation, companies typically expand access rather than simply cutting staff. They made support more prominent, available to free users, and accessible on every page because the unit economics improved. The pattern seems to be that AI kills specific jobs but not careers, as humans move to higher-value work while mundane, repeatable tasks get automated.

## Technical Maturity and Production Readiness

Throughout the conversation, several markers indicate Decagon's technical maturity in production LLM deployment including custom evaluation frameworks tied to business outcomes, continuous model training and deprecation cycles, end-to-end system testing rather than isolated model testing, sophisticated understanding of latency optimization techniques, and clear principles for when to use frontier versus open source versus fine-tuned models.

The case study demonstrates that building production AI agents at enterprise scale requires substantially more than just API calls to frontier models. It involves building internal research capabilities, creating custom evaluation infrastructure, developing domain-specific fine-tuned models, and constructing software layers around models to handle business logic, testing, compliance, and monitoring.
