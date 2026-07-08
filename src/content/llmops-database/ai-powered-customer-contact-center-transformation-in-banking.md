---
title: "AI-Powered Customer Contact Center Transformation in Banking"
slug: "ai-powered-customer-contact-center-transformation-in-banking"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "fraud-detection"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "devops"
  - "orchestration"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
industryTags: "finance"
company: "Fifth Third Bank"
summary: "Fifth Third Bank, the ninth largest bank in the United States following a merger with Comerica Bank, faced a challenge of handling approximately 175,000 calls per week to human agents in their consumer call center, many of which could be addressed through self-service channels. The bank embarked on a three-year transformation journey to migrate from a legacy contact center platform to Amazon Connect, implementing AI-powered chatbots, conversational analytics, and agent assist capabilities across messaging and voice channels. Through this implementation, combined with process improvements and a domain-driven architecture approach, the bank reduced weekly call volume to between 120,000-130,000 calls, improved self-service capabilities, and is now developing agentic AI experiences that can perform actions on behalf of customers rather than simply directing them to self-service tools."
link: "https://www.youtube.com/watch?v=6rs3xhVKN38"
year: 2026
seo:
  title: "Fifth Third Bank: AI-Powered Customer Contact Center Transformation in Banking - ZenML LLMOps Database"
  description: "Fifth Third Bank, the ninth largest bank in the United States following a merger with Comerica Bank, faced a challenge of handling approximately 175,000 calls per week to human agents in their consumer call center, many of which could be addressed through self-service channels. The bank embarked on a three-year transformation journey to migrate from a legacy contact center platform to Amazon Connect, implementing AI-powered chatbots, conversational analytics, and agent assist capabilities across messaging and voice channels. Through this implementation, combined with process improvements and a domain-driven architecture approach, the bank reduced weekly call volume to between 120,000-130,000 calls, improved self-service capabilities, and is now developing agentic AI experiences that can perform actions on behalf of customers rather than simply directing them to self-service tools."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-customer-contact-center-transformation-in-banking"
  ogTitle: "Fifth Third Bank: AI-Powered Customer Contact Center Transformation in Banking - ZenML LLMOps Database"
  ogDescription: "Fifth Third Bank, the ninth largest bank in the United States following a merger with Comerica Bank, faced a challenge of handling approximately 175,000 calls per week to human agents in their consumer call center, many of which could be addressed through self-service channels. The bank embarked on a three-year transformation journey to migrate from a legacy contact center platform to Amazon Connect, implementing AI-powered chatbots, conversational analytics, and agent assist capabilities across messaging and voice channels. Through this implementation, combined with process improvements and a domain-driven architecture approach, the bank reduced weekly call volume to between 120,000-130,000 calls, improved self-service capabilities, and is now developing agentic AI experiences that can perform actions on behalf of customers rather than simply directing them to self-service tools."
notion:
  pageId: "397f8dff-2538-807d-8fe2-e03506dc0472"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:05:00.000Z"
  lastEditedTime: "2026-07-08T20:05:00.000Z"
  publishedAt: "2026-07-08T20:08:28Z"
---

## Overview

Fifth Third Bank provides a comprehensive case study of AI and LLM deployment in production banking environments, specifically focused on customer experience and contact center operations. As the ninth largest bank in the United States following their merger with Comerica Bank, Fifth Third serves multiple lines of business including consumer banking, commercial banking, wealth and asset management, and mortgage services. Their AI transformation focuses on three pillars, with the primary emphasis on AI for customer experience in their consumer business segment.

The case study is particularly valuable because it covers a complete three-year transformation journey from 2023 through 2026, demonstrating the evolution of AI capabilities in a highly regulated financial services environment. Michelle Graham, Senior Director of Data Engineering, and Kevin Anderson, Product Manager on the AI Transformation team, provide insights into both the technical implementation and organizational change management aspects of deploying LLMs and AI agents in production at scale.

## Problem Statement and Initial Assessment

Three years ago, Fifth Third Bank identified a critical inefficiency in their customer contact channels. The bank was receiving approximately 175,000 calls per week to human agents in their consumer call center. Through their customer channel value stream analysis, they discovered that many of these contacts could potentially be addressed through self-service channels, but customers either were not aware of these options or found them inadequate for their needs.

The bank's mobile app had already been recognized for excellence, ranking number one by J.D. Power, which provided a strong foundation for digital customer interactions. However, the disconnect between the quality of the mobile app and the continued high volume of calls to human agents suggested that customers were not being effectively guided to or served by self-service options within digital channels.

The initial analysis involved asking fundamental questions: How might they avoid the need for contacts altogether? How could they enable better self-service? How could AI be leveraged to improve the experience? And foundationally, how could they improve underlying processes that were creating friction? Importantly, the team discovered that in many cases, they had inadvertently created the problem themselves by not making capabilities available across all channels, effectively forcing customers to call.

## Technical Architecture and Platform Migration

A critical technical decision in Fifth Third's AI transformation was the migration to Amazon Connect as their unified contact center platform. Prior to this migration, the bank operated with fragmented systems: their messaging platform, consumer contact center, and collections and mortgage contact centers were all on disparate systems. This fragmentation created several challenges including lost traceability when calls transferred between systems, inconsistent customer experiences across different lines of business, and limited analytics capabilities.

The selection of Amazon Connect was driven by several strategic factors. AWS was already Fifth Third's cloud provider, creating natural alignment. Amazon Connect provided a unified platform that could handle both messaging and voice channels, which was essential for creating consistent experiences. The platform's native AI and automation capabilities, particularly for agent assist functionality, were crucial for the bank's AI strategy. Additionally, the centralized analytics capabilities provided visibility that was previously impossible with their fragmented systems.

Underpinning the contact center transformation was a fundamental shift to domain-driven design and domain architecture. This architectural approach proved critical for scaling AI capabilities across multiple channels. The bank recognized that customers want to interact through different channels phone, chatbot, mobile banking, online banking and they needed to provide the same capabilities seamlessly across all these touchpoints. By building centralized APIs following domain-driven principles, they could build a capability once and deploy it across multiple channels.

A concrete example of this approach involved dispute status inquiries. Analysis revealed that the bank was receiving approximately 13,000 calls per month from customers simply asking for the status of their disputes. The team built a centralized API for dispute statuses and initially integrated it into their messaging platform. They then extended this same API to their IVR phone system and to both mobile and online banking platforms. This demonstrates the build once, use multiple times principle that has become core to their AI scaling strategy.

## LLM and AI Implementation in Production

The implementation timeline shows a phased approach to deploying AI and LLM capabilities in production. In 2025, the bank migrated their messaging platform to Amazon Connect and subsequently launched AI Agent Assist within the messaging platform. This agent assist capability provides real-time support to human representatives during customer interactions, improving both the efficiency and quality of service delivery.

The migration of the messaging platform was completed in approximately four months, which bank executives initially thought was impossible. This rapid deployment was achieved through close cross-functional collaboration between product teams, engineering teams, Amazon partners, and critically, compliance, governance, and risk partners. The speed of execution required operating in an agile manner with quick prototyping and iteration cycles, something that became more feasible with modern AI tooling.

In 2026, the bank is executing on multiple fronts. They are migrating their first voice-based call center to Amazon Connect Customer, specifically starting with their collections call center. This center was selected because it had lower volume compared to their main consumer call center, and they were already undergoing another platform modernization, making it efficient to couple the migrations together and deliver complete value to that team.

Simultaneously, the bank is investing heavily in building what they term agentic experiences. This represents a significant evolution in their AI capabilities. Their current messaging chatbot, named Genie, primarily operates by directing customers to the appropriate location in the mobile app where they can complete tasks themselves. The agentic version they are developing will be able to perform actions on behalf of customers. For example, instead of directing a customer to the money transfer screen, the agentic Genie will be able to execute the transfer directly within the conversation. Beyond transactional capabilities, they are building out knowledge bases so that Genie can answer questions dynamically, creating a truly conversational back-and-forth experience similar to what customers experience with general-purpose LLMs like ChatGPT or Microsoft Copilot.

The technology enabling this agentic transformation was noted as not even being available six to eight months prior to the presentation in 2026, highlighting the rapid pace of evolution in AI capabilities and the need for adaptive planning even while building foundational systems. The bank plans to release these agentic capabilities initially in the messaging channel, then progressively add more capabilities over time, eventually extending the same AI agent-powered interactions to their phone channels and migrating their consumer IVR to Amazon Connect Customer.

## Operational Considerations and Risk Management

Operating AI and LLMs in production in a highly regulated banking environment requires extensive governance and risk management frameworks. Fifth Third has established an AI Council that sits at the core of their organization. Any initiative, project, or new tool involving AI must go through this cross-functional team, which includes representatives from compliance, legal, risk, and model risk management (MRM). This council evaluates whether proposed initiatives fit within the bank's approved AI pillars or represent new territory requiring additional scrutiny.

This shift-left approach, where risk and compliance partners are involved before technology work begins, has been identified as a key accelerator rather than a bottleneck. By leaning in with business, risk, and security partners early in the process, the bank avoids costly rework and ensures that deployed systems meet regulatory requirements from the outset.

The bank's approach to risk management extends to their current work on agentic AI. They are proactively engaging with MRM risk partners, sharing their plans before they begin building, so that these partners feel they are on the journey together rather than being presented with a fait accompli that they must retroactively assess.

Continuous monitoring is emphasized as essential for all AI initiatives. Given the rapidly evolving nature of AI capabilities and the regulated environment in which the bank operates, ongoing validation that systems continue to meet requirements is as important as initial approval.

## Employee Training and Change Management

A significant learning from Fifth Third's journey relates to employee training and change management. When AI Agent Assist was first launched in late 2025 to help human representatives service customers, the representatives were initially apprehensive about the technology. The bank invested in training, then conducted additional training sessions, and maintained ongoing dialogue with representatives. Over time, this resulted in measurable improvements in two key areas: the representatives' ability to handle customer interactions effectively, and their satisfaction with the AI tool itself.

This experience underscores that deploying AI in production is not solely a technical challenge. The human agents who work alongside AI systems need support, training, and ongoing engagement to become effective users of these capabilities. The bank's commitment to iterative training and maintaining open communication channels with frontline employees proved essential for realizing the value of their AI investments.

## Process Improvement and AI Integration

One of the most important principles articulated by Fifth Third is the danger of treating AI as a silver bullet to fix broken processes. Rather than simply layering AI on top of existing processes, the bank emphasizes understanding and improving the underlying process first. Their most successful initiatives have paired Lean Six Sigma green or black belts with AI engineers to analyze processes together. This combination allows them to identify improvements that can be achieved through traditional process optimization techniques as well as opportunities where AI and automation add genuine value.

This approach has been applied across various areas including quality assurance, quality control, and disputes. By mapping out processes thoroughly before applying AI, they avoid automating inefficiency and instead create genuinely improved customer experiences. In some cases, process improvements were as simple as clarifying website wording or fixing clunky back-end processes. In other cases, AI provided the capability to enable self-service where it previously wasn't feasible.

The bank's initial analysis of the 175,000 weekly calls included categorizing the reasons customers were calling and determining appropriate interventions for each category. This disciplined approach to problem decomposition before solution implementation reflects mature operational practices that complement their AI capabilities.

## Results and Business Impact

The quantifiable results of Fifth Third's AI transformation are substantial. Over the three-year journey, the bank reduced weekly call volume to human agents from 175,000 to between 120,000 and 130,000 calls, representing a reduction of approximately 30-45,000 calls per week depending on seasonal factors. This aligns with the broader industry trend mentioned at the session opening, where customers saved 12 billion minutes through AI-enabled customer experiences in 2025 and 2026, up from 6 billion minutes in 2024.

Beyond call deflection, the bank has achieved improvements across the four main buckets of AI value in customer experience that were outlined: reimagined self-service experiences with natural language IVR; AI-enabled agent assistance that provides context and next best actions to human representatives; conversational analytics that allows analysis of 100% of interactions rather than just a 5-10% sample; and improved opportunities for transitioning from service to sales by combining contact center data with customer data platforms and CRM systems.

The domain-driven architecture approach has enabled faster time to market for new features and capabilities, as evidenced by the dispute status example where a single API deployment unlocked capabilities across multiple channels simultaneously. This architectural foundation positions the bank well for future AI capabilities, particularly as they move toward more dynamic, agentic interactions.

## Technology Stack and Partnerships

The case study highlights Amazon Connect as the core platform, providing unified contact center capabilities across messaging and voice channels. AWS serves as the overall cloud provider, creating ecosystem alignment. The specific AI capabilities mentioned include AI Agent Assist, conversational analytics, and the emerging agentic AI experiences being developed in partnership with Amazon.

The bank leverages domain-driven design principles with centralized APIs that expose capabilities across channels. While specific LLM models are not detailed in the presentation, the references to building knowledge bases and creating conversational experiences similar to ChatGPT and Copilot suggest they are implementing modern large language models, likely through Amazon Bedrock or similar AWS AI services.

The technology selection emphasizes platforms over point solutions, choosing Amazon Connect specifically because it could consolidate their fragmented contact center landscape while providing a foundation for future AI capabilities. The decision to standardize on their existing cloud provider AWS rather than introducing a new vendor reflects a platform consolidation strategy that reduces complexity.

## Critical Assessment and Balanced Perspective

While the case study presents an impressive transformation journey with measurable results, several considerations warrant balanced assessment. The presentation is delivered at an AWS Financial Services Symposium and includes an AWS solutions architect, which naturally creates some promotional context. The close partnership with Amazon is frequently emphasized, which is understandable given the venue but means the presentation may not fully explore challenges or limitations encountered.

The four-month migration timeline for the messaging platform is presented as remarkably fast even executives were skeptical but without details on what scope tradeoffs or technical debt might have been incurred to achieve that speed. Rapid migrations can sometimes leave optimization opportunities or edge cases to be addressed post-launch.

The discussion of agentic AI is forward-looking, describing capabilities being developed rather than fully deployed and proven in production. While the vision is compelling of AI agents that can perform banking transactions on behalf of customers the reality of implementing this securely, compliantly, and reliably in a regulated banking environment may present challenges not fully addressed in the presentation.

The emphasis on governance and risk management is appropriate for a bank, but the presentation does not detail specific challenges encountered in getting risk approval for AI initiatives or instances where proposed AI applications were rejected or significantly modified due to compliance concerns. In a highly regulated industry, such friction almost certainly exists, and understanding how it was navigated would provide valuable lessons.

The employee training discussion, while important, focuses on the eventual success after multiple training iterations but does not quantify the resistance encountered, how many representatives struggled to adopt the technology, or what specific training approaches proved most effective versus less effective.

That said, the case study demonstrates several genuinely strong practices: the discipline of process improvement before AI application; the shift-left approach to engaging risk and compliance partners; the domain-driven architecture enabling multi-channel deployment; and the commitment to iterative development and continuous monitoring. The measurable call reduction results provide concrete validation of business impact, not just technology deployment.

## Future Trajectory and Scalability

The bank's roadmap demonstrates a clear progression from basic AI capabilities toward more sophisticated agentic experiences. The phased approach starting with messaging, extending to collections call centers, and eventually to consumer IVR reflects pragmatic risk management, testing capabilities in smaller or more controlled environments before scaling to the highest-volume use cases.

The build-once-deploy-everywhere principle enabled by their domain architecture positions them well for rapid scaling as new AI capabilities become available. The observation that enabling technologies for their current agentic AI work did not exist just six to eight months earlier suggests they are staying current with the rapidly evolving AI landscape and are positioned to incorporate new capabilities as they emerge.

The cross-functional collaboration culture, characterized as similar to Amazon's two-pizza teams, appears to enable rapid prototyping and iteration. The calculus for prototyping speed has dramatically changed with modern AI tooling, allowing product and engineering teams to validate use cases and iterate quickly to determine if requirements are met. This agility is essential given the pace of AI advancement and evolving customer expectations shaped by consumer AI experiences.

The case study represents a solid example of enterprise LLMOps in a regulated industry, balancing innovation with appropriate governance, focusing on genuine business problems rather than technology for its own sake, and building architectural foundations that enable scaling as AI capabilities continue to advance.
