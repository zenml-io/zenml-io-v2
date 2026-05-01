---
title: "Building Stateful Learning Agents for Production SRE"
slug: "building-stateful-learning-agents-for-production-sre"
draft: false
llmopsTags:
  - "customer-support"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "monitoring"
  - "memory"
industryTags: "tech"
company: "Cleric"
summary: "Cleric, an AI-powered Site Reliability Engineering platform, addresses the fundamental limitation of stateless AI agents by building a learning agent that accumulates knowledge over time. The problem Cleric tackles is that most AI agents operate without memory or context from past interactions, limiting their effectiveness in complex production environments. Their solution centers on three core principles: making it easy for users to correct the agent through persistent memories and self-harvested skills, rewarding corrections with visibly better performance that persists and compounds across sessions, and continuously absorbing context from infrastructure, observability tools, and incident channels without requiring explicit user direction. Deployed to dozens of customers, Cleric has demonstrated that stateful agents that complete the full learning loop—acting, learning, and adapting—build user trust and deliver higher utility than stateless alternatives."
link: "https://www.youtube.com/watch?v=tKRel4kEpSI"
year: 2026
seo:
  title: "Cleric: Building Stateful Learning Agents for Production SRE - ZenML LLMOps Database"
  description: "Cleric, an AI-powered Site Reliability Engineering platform, addresses the fundamental limitation of stateless AI agents by building a learning agent that accumulates knowledge over time. The problem Cleric tackles is that most AI agents operate without memory or context from past interactions, limiting their effectiveness in complex production environments. Their solution centers on three core principles: making it easy for users to correct the agent through persistent memories and self-harvested skills, rewarding corrections with visibly better performance that persists and compounds across sessions, and continuously absorbing context from infrastructure, observability tools, and incident channels without requiring explicit user direction. Deployed to dozens of customers, Cleric has demonstrated that stateful agents that complete the full learning loop—acting, learning, and adapting—build user trust and deliver higher utility than stateless alternatives."
  canonical: "https://www.zenml.io/llmops-database/building-stateful-learning-agents-for-production-sre"
  ogTitle: "Cleric: Building Stateful Learning Agents for Production SRE - ZenML LLMOps Database"
  ogDescription: "Cleric, an AI-powered Site Reliability Engineering platform, addresses the fundamental limitation of stateless AI agents by building a learning agent that accumulates knowledge over time. The problem Cleric tackles is that most AI agents operate without memory or context from past interactions, limiting their effectiveness in complex production environments. Their solution centers on three core principles: making it easy for users to correct the agent through persistent memories and self-harvested skills, rewarding corrections with visibly better performance that persists and compounds across sessions, and continuously absorbing context from infrastructure, observability tools, and incident channels without requiring explicit user direction. Deployed to dozens of customers, Cleric has demonstrated that stateful agents that complete the full learning loop—acting, learning, and adapting—build user trust and deliver higher utility than stateless alternatives."
notion:
  pageId: "33df8dff-2538-80db-a63b-c1afd61c59f7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-09T17:52:00.000Z"
  lastEditedTime: "2026-04-09T17:52:00.000Z"
  publishedAt: "2026-04-09T18:00:27Z"
---

## Overview

Cleric has developed an AI Site Reliability Engineer agent that represents a significant evolution in production LLM deployment, moving from stateless to stateful architecture. The company's head of product presented lessons learned from building what they call a "learning agent" - an agent that accumulates knowledge and adapts based on experience rather than starting each session fresh. This case study is particularly valuable because it comes from a company that uses AI agents for every aspect of building their own agent product, giving them deep operational experience with the challenges of production LLM systems.

The fundamental problem Cleric addresses is the amnesia inherent in most current AI agent deployments. Traditional stateless agents behave like colleagues who show up to work every day with no memory of previous interactions, decisions, or learned procedures. For a Site Reliability Engineering context where incidents, infrastructure patterns, and team procedures build on each other over time, this lack of continuity severely limits agent effectiveness. Cleric's conviction is that as agent capabilities become commoditized, the next competitive differentiation will be in learning and self-learning capabilities.

## Core Architecture and Knowledge Domains

Cleric's learning agent architecture focuses on accumulating three types of knowledge that persist across sessions and compound over time. First, it builds a comprehensive model of the user's environment by connecting directly to infrastructure and observability tools. This environmental model forms the foundation for understanding system topology, dependencies, and normal versus anomalous behavior patterns. Second, the agent learns about team composition and working patterns by being embedded in alert channels where it can observe how different team members respond to incidents, what questions they ask, and what procedures they follow. Third, it accumulates knowledge about past outcomes and corrections, creating a growing library of what works and what doesn't in specific contexts.

The technical integration pattern involves connecting Cleric to multiple data sources simultaneously. Infrastructure connections provide real-time and historical data about system state, while observability tool integrations offer metrics, logs, and traces that contextualize incidents. By being placed directly in alert channels, the agent gains ambient access to ongoing incident response activities, learning from both explicit interactions and passive observation of team communications and historical channel data.

## Learning Through Correction: The First Principle

The first major LLMOps lesson Cleric emphasizes is making correction easy and visible. The reality acknowledged here is that wrong answers from LLM systems are inevitable, regardless of how sophisticated the underlying model or prompt engineering becomes. What differentiates successful production deployments is not perfect accuracy but rather the ability to learn from mistakes and visibly not repeat them. This is a refreshingly pragmatic approach that recognizes the current limitations of LLM technology while building operational patterns that improve over time.

Cleric implements several mechanisms to facilitate correction. The system proposes memories that persist across investigations, allowing users to confirm or modify the agent's understanding of specific patterns or facts. It employs what they call "self-harvesting skills" - essentially the agent identifying procedural patterns from user interactions and codifying them as reusable procedures. User ratings on agent messages provide an explicit quality signal that feeds back into the learning system. These aren't isolated features but rather components of a cohesive feedback system.

The visibility requirement is particularly important in Cleric's multi-user team environment. When one engineer corrects the agent during an incident investigation, that correction must apply to the next engineer who encounters a similar situation, potentially minutes or hours later. This creates a technical challenge around knowledge propagation and context relevance that goes beyond simple conversation history. The system must determine when a correction applies broadly versus when it's specific to a particular context, and it must surface learned knowledge appropriately so users can verify the agent is applying lessons correctly.

## Reward Systems and Trust Building

The second principle focuses on rewarding user corrections with demonstrably better performance. This addresses a critical failure mode in production LLM systems: users lose trust when they invest effort in teaching the system something that doesn't persist. From an LLMOps perspective, this highlights the importance of closing the feedback loop not just technically but in ways users can observe and verify.

Cleric breaks down successful correction handling into three components. Persistence means the agent applies learned knowledge in the same context where it was taught - if an engineer teaches the system how to perform a customer impact assessment after one outage, that exact procedure should be recalled and applied in the next similar incident. This requires robust context matching and retrieval mechanisms that can identify when situations are sufficiently similar to warrant applying stored procedures.

Compounding represents a more sophisticated level of learning where the agent generalizes knowledge to different but related contexts. The example given involves learning during a customer impact assessment procedure that certain patterns distinguish internal instances from production customer instances. A compounding effect would be the agent applying that distinction in an entirely different investigation context, such as automatically excluding internal instances when analyzing error rates for production customers. This suggests the system decomposes learned procedures into constituent concepts that can be recombined and applied across different scenarios.

Visibility refers to the agent showing its work - displaying what knowledge it's using and how that knowledge influences its actions and reasoning. This serves dual purposes from an LLMOps perspective. First, it allows users to identify when stored knowledge has become outdated or incorrect and needs updating. Second, it demonstrates the impact of user contributions, creating a positive reinforcement loop that encourages continued engagement with the teaching process. This is particularly important for sustaining user investment in improving the agent over time.

## Continuous Context Absorption

The third principle addresses a fundamental scaling limitation: relying solely on explicit user corrections creates a bottleneck that limits how much the agent can learn. Cleric's approach is to identify opportunities for the agent to sit in the path of real work automatically, absorbing environmental context continuously without requiring users to explicitly invoke the agent or provide structured feedback.

This ambient learning strategy has significant LLMOps implications. By being embedded in alert channels, the agent observes all incident response activities, not just those where it's explicitly asked to help. It can learn from observing experienced engineers investigating issues, from seeing which alerts prove to be false positives versus genuine problems, and from the collective knowledge embedded in channel history. The richer and more comprehensive the agent's model of the user's world becomes, the higher its utility in actual incident response.

However, this approach also introduces challenges around noise, relevance, and knowledge quality. Production environments generate enormous volumes of data, much of which may not be relevant for learning. The system must filter signal from noise, determine what patterns are worth encoding as knowledge versus transient conditions, and avoid learning from outdated or incorrect information that exists in legacy documentation or dead code. This is where the correction mechanisms from the first principle become essential - users must be able to identify and fix errors that creep in through ambient learning.

## The Complete Learning Loop

Cleric presents these three principles as components of a single integrated learning loop that distinguishes their approach from stateless agents. The loop begins with action - the agent performs work like investigating an incident, developing a feature, or fixing a bug. In traditional stateless systems, this is where the interaction ends. Cleric's innovation is completing the loop through operational memory that persists across sessions and compounds over time.

The interdependencies between the three principles are emphasized as critical. Making correction easy without visibly improving performance causes users to lose trust and stop investing in teaching the agent. Visibly improving performance but not learning ambiently limits learning to only what users explicitly direct, creating a bottleneck. Learning ambiently without allowing user corrections risks compounding errors as the agent absorbs outdated documentation, dead code, or deprecated procedures that exist in production environments.

This systems thinking approach to LLMOps is notable. Rather than treating individual features like memory, correction interfaces, or ambient observation as independent capabilities, Cleric frames them as mutually dependent components of a learning system. The warning about dead code and outdated documentation is particularly insightful - production environments are often littered with artifacts that would mislead an automated learning system, making human oversight and correction capabilities essential guardrails.

## Technical Implementation Considerations

While the presentation focuses on principles rather than detailed technical implementation, several LLMOps patterns can be inferred. The system appears to rely heavily on context engineering rather than fine-tuning, as explicitly confirmed in the Q&A section. This suggests extensive use of retrieval mechanisms, prompt engineering, and context assembly to incorporate learned knowledge into agent interactions. The decision to avoid fine-tuning likely reflects both practical considerations around deployment complexity and update latency, as well as recognition that foundation model capabilities are improving rapidly enough that context-based approaches remain viable.

The emphasis on showing the agent's work and making knowledge application visible suggests structured reasoning outputs, possibly using chain-of-thought or similar techniques where the agent explicitly references stored knowledge in its reasoning process. This would allow users to see not just what the agent knows but how it's applying that knowledge to current situations.

The self-harvesting of skills implies some form of automated procedure extraction from user interactions. This likely involves the agent identifying repeated patterns or explicit procedural language in how users conduct investigations, then proposing these as codified procedures that can be reused. This is a sophisticated capability that goes beyond simple conversation history, requiring the system to identify generalizable patterns from specific interactions.

## Deployment and Production Learnings

Cleric reports deployment to dozens of customers over months to years of operation. This production experience base lends credibility to their lessons learned and suggests these principles have been validated across different organizational contexts and infrastructure configurations. The challenges they highlight - trust erosion when corrections don't persist, the bottleneck of explicit-only learning, the risk of compounding errors from ambient learning - are presented as empirically observed failure modes rather than theoretical concerns.

The multi-tenant nature of the deployment, where different customer organizations each have their own infrastructure, teams, and procedures, creates interesting LLMOps challenges around knowledge isolation and personalization. Knowledge learned from one customer's incidents should presumably not leak to another customer's agent instance, requiring robust partitioning. Yet within a single customer organization, knowledge must be shared effectively across different team members and investigation sessions.

## Critical Assessment and Limitations

Several aspects of Cleric's approach warrant balanced consideration. First, the presentation comes from the company building the product, in what appears to be a conference or demo setting. The lack of specific metrics around learning effectiveness, user satisfaction improvements, or incident resolution time reductions means claims about the approach's success should be viewed as directional rather than definitively proven.

The emphasis on context engineering over fine-tuning, while pragmatic given current foundation model capabilities, may face scaling limitations. As the volume of learned knowledge grows, retrieving and assembling relevant context within token limits becomes increasingly challenging. The presentation doesn't address how they handle context window limitations or knowledge retrieval efficiency as the knowledge base grows.

The ambient learning approach, while potentially powerful, raises questions about knowledge quality control and potential bias amplification. If the agent learns primarily from observing experienced engineers, it may not capture diverse approaches or may encode organizational bad practices alongside good ones. The correction mechanisms help but require active user oversight, which may not catch all problematic learned patterns.

The claim that "agents that earn their place will be the ones that accumulate knowledge" represents a strong conviction that may or may not prove correct. It's possible that continued foundation model improvements or alternative approaches like better tool integration or more sophisticated reasoning capabilities could prove more valuable than learning from specific environments. The competitive landscape for AI SRE tools is still evolving.

## Future Trajectory and Industry Implications

Cleric's perspective on where agent capabilities are heading is notable. They assert that agent capabilities are becoming commoditized and that learning will be the next differentiation frontier. This reflects broader industry trends where foundation models provide increasingly sophisticated baseline capabilities, pushing differentiation toward application-layer innovations like memory, personalization, and continuous learning.

The prediction that foundation models will start releasing these features themselves is significant from an LLMOps perspective. If model providers incorporate better native memory and learning capabilities, applications like Cleric may need to evolve from building these capabilities themselves to orchestrating model-native features. This could either validate their approach or require significant architectural changes.

The statement that "these are the worst the models are ever going to be" reflects an optimistic view of continued model improvement. This suggests their architecture is designed to take advantage of better foundation models over time, with context engineering approaches that can benefit from improved reasoning, longer context windows, or better instruction following without requiring fundamental system redesigns.

## Synthesis and Broader LLMOps Lessons

This case study illustrates several important LLMOps principles that extend beyond the specific SRE domain. The recognition that wrong answers are inevitable but learning from corrections is achievable applies broadly to production LLM systems. The emphasis on closing feedback loops visibly and rewarding user investment in system improvement addresses human factors that often determine whether production AI systems succeed or fail regardless of technical sophistication.

The distinction between stateless and stateful agents represents an important architectural pattern in LLMOps. While much early focus in the field centered on prompt engineering, model selection, and inference optimization, this case demonstrates the importance of operational memory and knowledge accumulation for sustained production value. Systems that can learn from their deployment context and improve over time may deliver more value than technically sophisticated but static systems.

The interdependency between correction mechanisms, visible improvement, and ambient learning represents a systems approach to LLMOps that goes beyond optimizing individual components. This holistic perspective - where trust, learning, and error correction form a mutually reinforcing loop - offers a useful framework for thinking about production LLM systems in complex, evolving environments where perfect accuracy is impossible but continuous improvement is achievable.
