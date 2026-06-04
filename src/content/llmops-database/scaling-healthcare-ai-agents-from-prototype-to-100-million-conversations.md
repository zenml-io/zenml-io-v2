---
title: "Scaling Healthcare AI Agents from Prototype to 100 Million Conversations"
slug: "scaling-healthcare-ai-agents-from-prototype-to-100-million-conversations"
draft: false
llmopsTags:
  - "healthcare"
  - "chatbot"
  - "question-answering"
  - "prompt-engineering"
  - "fine-tuning"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "multi-agent-systems"
  - "monitoring"
  - "scalability"
  - "reliability"
  - "kubernetes"
  - "microservices"
  - "openai"
  - "google-gcp"
industryTags: "healthcare"
company: "Hyro"
summary: "Hyro, a company building AI agents for the American healthcare industry, evolved from a deterministic, rules-based conversational system to a hybrid architecture that strategically incorporates LLMs while maintaining reliability and control. Facing the challenge of scaling from 20 agents to 2000 across 50 major healthcare systems serving approximately 100 million patients, they transformed from a project-based approach to a platform-based product. By building a flexible but opinionated platform with modular skills, they reduced time-to-deployment from months to days. When LLMs emerged, rather than adopting an end-to-end speech-to-speech approach, they chose a layered stack architecture that integrates multiple specialized models at critical points while maintaining deterministic control through their computational graph, achieving both conversational fluidity and 100% reliability for mission-critical tasks like appointment scheduling."
link: "https://www.youtube.com/watch?v=LzKXDYFDFRo"
year: 2026
seo:
  title: "Hyro: Scaling Healthcare AI Agents from Prototype to 100 Million Conversations - ZenML LLMOps Database"
  description: "Hyro, a company building AI agents for the American healthcare industry, evolved from a deterministic, rules-based conversational system to a hybrid architecture that strategically incorporates LLMs while maintaining reliability and control. Facing the challenge of scaling from 20 agents to 2000 across 50 major healthcare systems serving approximately 100 million patients, they transformed from a project-based approach to a platform-based product. By building a flexible but opinionated platform with modular skills, they reduced time-to-deployment from months to days. When LLMs emerged, rather than adopting an end-to-end speech-to-speech approach, they chose a layered stack architecture that integrates multiple specialized models at critical points while maintaining deterministic control through their computational graph, achieving both conversational fluidity and 100% reliability for mission-critical tasks like appointment scheduling."
  canonical: "https://www.zenml.io/llmops-database/scaling-healthcare-ai-agents-from-prototype-to-100-million-conversations"
  ogTitle: "Hyro: Scaling Healthcare AI Agents from Prototype to 100 Million Conversations - ZenML LLMOps Database"
  ogDescription: "Hyro, a company building AI agents for the American healthcare industry, evolved from a deterministic, rules-based conversational system to a hybrid architecture that strategically incorporates LLMs while maintaining reliability and control. Facing the challenge of scaling from 20 agents to 2000 across 50 major healthcare systems serving approximately 100 million patients, they transformed from a project-based approach to a platform-based product. By building a flexible but opinionated platform with modular skills, they reduced time-to-deployment from months to days. When LLMs emerged, rather than adopting an end-to-end speech-to-speech approach, they chose a layered stack architecture that integrates multiple specialized models at critical points while maintaining deterministic control through their computational graph, achieving both conversational fluidity and 100% reliability for mission-critical tasks like appointment scheduling."
notion:
  pageId: "373f8dff-2538-8017-8451-c2d402859310"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:31:00.000Z"
  lastEditedTime: "2026-06-02T07:31:00.000Z"
  publishedAt: "2026-06-04T08:27:06Z"
---

## Overview

Hyro is a company that has spent eight years building AI agents specifically for the American healthcare industry, with the goal of improving user experience in healthcare contact centers. They serve approximately 50 major healthcare systems covering around 100 million people, processing roughly 100 million calls over the past two years in production. The presentation discusses their technical and product evolution from a deterministic, linguistics-based system to a sophisticated hybrid architecture that strategically incorporates large language models while maintaining the reliability and control essential for healthcare applications.

## Early Architecture: Pre-LLM Foundation (2018)

The company's journey began in 2018 when building conversational agents required extensive manual work with conversation trees and scripts, with deployment times stretching to months or even a year. Hyro made several foundational architectural decisions during this period that would continue to influence their approach even as LLMs emerged.

Their first major decision was to rely on classical linguistics rather than machine learning models. They hired linguists to join their development team and built their system on syntactic parsing to decompose every sentence into its grammatical components and understand user intent. This decision was driven by two factors: first, the models available at the time were not sufficiently capable for their complex tasks; second, they needed to reach production quickly and couldn't afford the time required to train and maintain models.

They developed a knowledge graph that centralized all customer information with entities and relationships between them. To connect user intent with this knowledge graph, they built their own query language that could efficiently extract information from the graph during conversations and connect it to user responses. Over time, they realized that simply extracting answers from the graph was insufficient, and they needed to control the conversation flow. They developed what they call a capabilities graph, which acts as the managing brain of the conversation, understanding both user intent and how to direct the conversation flow to fill in missing information needed to achieve goals like scheduling appointments.

The underlying philosophy was achieving deterministic control. They wanted to know exactly why a given input produced a specific output. This required building a system where every process had a clear, transparent path over the graph.

## Platform Evolution: Scaling Challenges

With a working product and initial customers in production, Hyro faced the challenge of scaling. They identified both product and technical problems. On the product side, they had customers across many different domains, from ticket sales to flights to finding doctors and apartments. This resulted in agents that were generic and suitable for all customers but didn't provide true value. They made the difficult decision to focus exclusively on healthcare, parting ways with paying customers and discarding significant production code. This vertical specialization allowed them to build much more accurate and relevant products.

They also decided to split their product into separate voice and web offerings rather than building a single product for both channels. While this increased architectural complexity and maintenance burden, it allowed them to deepen their expertise in each channel since what works for web doesn't always work for voice and vice versa.

On the technical side, as they looked at their operations with 20 agents, they realized they were operating like a project company rather than a product company. Their code was duplicated, customer-specific, and time-to-deployment was taking too long. They needed to transform their approach fundamentally.

## Platform Architecture: Building for Scale

They reconceptualized their AI agent as a product and built a platform for agent construction. This platform needed to be opinionated, incorporating Hyro's accumulated knowledge about what works best in conversations, while also being flexible enough to serve 50 different healthcare customers with unique needs.

They decomposed their system into key entities. The most important was the skill, which defines where a conversation begins and ends. Like contact center specialists who excel at specific tasks like scheduling appointments with doctors or renewing prescriptions, each Hyro skill concentrates specific business logic. On top of skills, they built building blocks, which are smaller sub-flows that can be assembled and connected as needed, along with integrations that enable real-time communication with customer information systems.

This created a technology stack comparable to Lego blocks. It completely freed developers from writing code to build agents. The development cycle transformed: developers now write flows and infrastructure, product teams decide which points in those flows to expose for customer configuration, and solutions architects use a UI to assemble agents according to customer requests.

This platform approach is highly opinionated, building on everything Hyro already knows how to do well, while being flexible and allowing customers to fine-tune what they want. The result was transformative: time-to-deployment dropped from months to days, knowledge sharing became possible across all customers since learnings from one could immediately benefit all others, and development focus shifted from writing customer-specific code to writing flows that could be given to everyone.

However, this introduced a new challenge: the agent quality became dependent on configuration quality. Even if the research and development team built amazing new skills, if they weren't configured and connected correctly, the agent wouldn't perform optimally. Despite this tradeoff, the platform provided visibility by exposing all events, allowing them to show customers analytics about what their users actually want and discuss, while also helping Hyro develop their product by understanding what works and what doesn't.

## LLM Integration: Strategic Hybrid Approach

When LLMs emerged, they disrupted the landscape. Customer expectations shifted from comparing AI agents to old phone systems to comparing them to ChatGPT, with expectations for understanding sarcasm, speed, and human-like interaction. This created a challenge: how to leverage LLM capabilities without losing what they had built or compromising product quality.

Two main approaches were on the table. The first was an end-to-end speech-to-speech model approach, which felt like the future but seemed too risky for healthcare, comparable to driving an autonomous car without brakes. The second approach, which they chose, was a stack architecture.

Their hybrid stack begins with speech-to-text listening to users and ends with text-to-speech giving the agent voice. In the middle sits the same computational graph previously described, but now at critical points in the process, it queries language models. Some of these models they now train themselves with their team of linguists who now include data scientists. These models help the graph make decisions during the flow, better understand users, and generate optimal responses.

## Reliability Architecture: Mission-Critical Operations

This architecture enables them to address one of the most fundamental challenges of operating at scale: reliability. In healthcare, conversation quality is irrelevant if the conversation isn't 100% reliable. A patient in Atlanta scheduling a cardiology appointment shouldn't be affected if a Seattle hospital went live that day and servers are struggling with load. She needs her answer immediately.

Their chosen architecture allows them to develop resilience and reserve capacity for every part of the flow. Their speech-to-text is deployed both on-premise and in the cloud, so if a user calls and the on-premise connection isn't working, they immediately fall back to the cloud without the user experiencing any impact. Beyond providing customers with a wide range of voices, this also allows seamless switching between providers without affecting conversations.

For generating empathetic responses, they might use OpenAI, but in case of timeout or other errors, they have prompts ready to run on Gemini. The conversation doesn't stop, the thought process isn't interrupted, they simply switch engines mid-motion. If all else fails, the entire operation is deployed across multiple regions, so in the hypothetical scenario where an entire region goes down, customers aren't affected and no one is impacted.

This architecture prevents them from relying on any single black box or single provider, ensuring that if one is down, they don't go down. They can continue serving 100 million users and sleep well at night. The architecture provides not just reliability but also control.

## Appointment Scheduling: Multi-Model Orchestration

They illustrate their approach through appointment scheduling, one of the most essential tasks for their agents. On the surface, this seems simple, but in practice it's a very complex conversation with many variables and significant understanding challenges. Users say things like "I can only come during lunch break" or "I need my appointment after my MRI."

When LLMs arrived, this seemed like an excellent use case because they could suddenly conduct fluid, conversational dialogues with high comprehension capabilities that weren't possible before. However, they quickly encountered a familiar problem: hallucinations. The conversation would be flowing and users would be satisfied, but occasionally the model would hallucinate a time that didn't exist in the system and send a patient to a clinic when no doctor was present. This irresponsibility was something they couldn't allow.

At that point, they made what they describe as either a brave or cautious decision, depending on perspective, and chose not to integrate models into the flow for production. They deployed with a flow that was perhaps less conversational and a bit more guided, but it was 100% reliable. Simultaneously, this allowed them to deliver real value to customers, schedule thousands of appointments, and collect real data from the field about how users actually talk to agents when scheduling appointments.

Today, with improved technology and their own progress, they could return to this problem backed by an enormous dataset of interactions. They decided that instead of one model managing the conversation, they would use five models, each with a very specific role along the way. Today, this means they can deliver a conversation that is both highly conversational and 100% reliable. Moreover, it's what they call explainable: if a customer asks why the agent said something specific in one conversation out of thousands that day, they don't need to guess. The logic is still managed within their architecture, and they can present it to customers transparently on their platform.

## Trade-offs and Challenges

The presenters emphasize being honest about the trade-offs of their chosen approach. First, they have a lot of code. Maintaining such a large system with so many connections and ensuring it doesn't become a monolithic monster that no one can maintain or modify is not easy.

However, their truly major challenge that they confront daily is latency. In voice conversations, they have a very limited time budget for how long users will wait on the line while they're thinking before simply hanging up. In their architecture, part of this budget is automatically consumed by system needs because every hop from speech-to-text to text-to-speech consumes precious time before they've even started talking.

They could solve this in easy ways by asking users to wait or playing music while the agent thinks, but that's not the standard they set for themselves. They aim to deliver truly smooth, flowing conversations to customers and are willing to work hard to achieve this.

About a year ago, they started a major company-wide project to improve latency. They discovered that some proprietary capabilities discussed earlier were still in the system and could now be built differently. They worked, modified, deleted, and reduced until they could introduce a change to the system that could save almost a second of response time, and they were ready to celebrate. But simultaneously, another major feature entered the system that was amazing and everyone was excited about, but it was also very heavy. When Monday arrived and queues opened in the United States, all their monitors went off because not only had they not improved latency, it had actually gotten much worse.

At that moment, they realized that latency isn't a one-time project but a genuine mindset shift. On one hand, they'll always want to incorporate the smartest capabilities and develop more complex features, but on the other hand, it's important to remember that every such feature has a latency price in their architecture. This requires creativity and thinking about latency at every development stage, finding solutions, and sometimes painfully saying no to certain features, or more accurately, not yet.

## Evolution and Decision-Making Philosophy

Looking back at where they started, the early system was very accurate for its time and is what brought them to present this talk today. Today their system looks completely different and relies on many components. All the decisions they made along the way, some easy, some difficult, some brave, are what brought them to where they are today.

Every decision they made, like taking only the healthcare vertical and building the platform that constructs agents or deciding to take a stack approach instead of speech-to-speech, brought them to this point where they can manage so many conversations in production. They emphasize that what's important to take from this discussion is that never stopping asking themselves throughout the journey what they want to do, where their product needs to be, and whether there are new technological developments that are more suitable is what built them as a product company.

For those in the audience building AI agent demos today, what they do to build it and the decisions they make along the way will ultimately affect how they meet users in the wild in production. They should think deeply about each decision, not how it affects things now but how it will affect things four years from now. At the same time, they note that you and your product are a living organism and you can change your mind. If something that suited you three years ago no longer suits you today, change it and pivot.

Building the first percentage, the amazing, explosive demo that everyone talks about, is the easy part. The hard part is the remaining 99%, where you actually meet the challenges of the real world. The presentation aims to help the audience understand this reality of bringing AI agents to production at scale.
