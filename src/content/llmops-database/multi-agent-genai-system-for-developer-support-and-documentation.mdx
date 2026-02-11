---
title: "Multi-Agent GenAI System for Developer Support and Documentation"
slug: "multi-agent-genai-system-for-developer-support-and-documentation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "678a86a14a706d45fe350e24"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:55:24.778Z"
  createdOn: "2025-01-17T16:34:41.995Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "rag"
  - "prompt-engineering"
  - "error-handling"
  - "system-prompts"
  - "databases"
  - "redis"
  - "postgresql"
  - "elasticsearch"
  - "monitoring"
  - "serverless"
  - "guardrails"
  - "documentation"
  - "security"
  - "compliance"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "amazon-aws"
industryTags: "insurance"
company: "Northwestern Mutual"
summary: "Northwestern Mutual implemented a GenAI-powered developer support system to address challenges with their internal developer support chat system, which suffered from long response times and repetitive basic queries. Using Amazon Bedrock Agents, they developed a multi-agent system that could automatically handle common developer support requests, documentation queries, and user management tasks. The system went from pilot to production in just three months and successfully reduced support engineer workload while maintaining strict compliance with internal security and risk management requirements."
link: "https://www.youtube.com/watch?v=7pvEYLW1yZw"
year: 2023
seo:
  title: "Northwestern Mutual: Multi-Agent GenAI System for Developer Support and Documentation - ZenML LLMOps Database"
  description: "Northwestern Mutual implemented a GenAI-powered developer support system to address challenges with their internal developer support chat system, which suffered from long response times and repetitive basic queries. Using Amazon Bedrock Agents, they developed a multi-agent system that could automatically handle common developer support requests, documentation queries, and user management tasks. The system went from pilot to production in just three months and successfully reduced support engineer workload while maintaining strict compliance with internal security and risk management requirements."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-genai-system-for-developer-support-and-documentation"
  ogTitle: "Northwestern Mutual: Multi-Agent GenAI System for Developer Support and Documentation - ZenML LLMOps Database"
  ogDescription: "Northwestern Mutual implemented a GenAI-powered developer support system to address challenges with their internal developer support chat system, which suffered from long response times and repetitive basic queries. Using Amazon Bedrock Agents, they developed a multi-agent system that could automatically handle common developer support requests, documentation queries, and user management tasks. The system went from pilot to production in just three months and successfully reduced support engineer workload while maintaining strict compliance with internal security and risk management requirements."
---

## Overview

This case study comes from a presentation at AWS re:Invent featuring Northwestern Mutual, a financial services company providing financial planning, wealth management, and insurance products (life and long-term care). The presentation was delivered by Heiko Zuerker, a principal architect at the company, alongside AWS team members Michael Liu (product lead for Bedrock Agents) and Mark Roy (principal architect with Amazon Bedrock). The session focused on multi-agent collaboration patterns and included Northwestern Mutual as a real-world customer example of deploying agents in production within a regulated industry.

Northwestern Mutual's case study demonstrates a practical implementation of LLM-powered agents for internal developer support. When generative AI became widely available, the company immediately recognized its potential and fully embraced the technology, taking multiple use cases from experimentation into production. The specific use case discussed involves automating internal developer support that was previously handled through chat interfaces.

## The Problem

The existing internal developer support system had several pain points that made it a suitable candidate for AI automation:

- Long response times for support requests, especially problematic during weekends and holidays when engineers are less available
- High volume of basic questions that already had documentation available, but users weren't bothering to look it up
- Repetitive requests for tasks that could be easily automated, such as unlocking user accounts
- Poor user experience for both the developers seeking help and the support engineers handling requests
- Need to maintain support coverage while allowing engineers to focus on more complex issues

The company also had ambitious goals beyond this initial use case—they wanted to create a foundation for more complex business-facing applications, which presented additional challenges given their status as a regulated financial services company.

## Solution Architecture

Northwestern Mutual chose to build on Amazon Bedrock rather than creating their own solution from scratch. As one coworker quoted in the presentation noted, while there are many excellent tools and libraries for building generative AI applications, a year prior there was no choice but to build custom solutions. With managed services like Bedrock, simple RAG use cases can now be spun up in minutes versus hours or days. The company also benefited from their existing AWS infrastructure expertise, fine-grained access controls, built-in encryption, and HIPAA compliance—critical for a financial services company.

The solution follows a serverless, managed-services-first architecture with the explicit design goal of having no infrastructure to manage. The key components include:

**Message Queuing and State Management:**
- SQS (Simple Queue Service) for message queuing to ensure that if there are backend problems, messages are preserved and can be processed later
- DynamoDB for managing the state of escalated messages

**Orchestration Layer:**
The orchestration layer, written in Python and running on Lambda, handles the complex flow of processing incoming chat messages. The flow includes:

- Determining intent: Is the request within the bot's skillset? Is the user frustrated or asking to escalate to a human?
- Escalation handling: Routing to a support engineer when requests are outside the bot's capabilities or when users explicitly request human assistance
- Noise filtering: Ignoring non-actionable messages (like announcements posted to the support channel or simple greetings before the actual problem is stated)
- Agent selection and invocation: Routing to the appropriate specialized agent based on the request type
- Response evaluation: Analyzing agent responses before sending them to users to filter out unhelpful or hallucinated content

**Multi-Agent Architecture:**
The company implemented five distinct agents, each with a specific area of responsibility:

- Documentation agent: Provides access to relevant documentation
- User management agent: Handles tasks like unlocking user accounts
- Repository management agent: Manages code repository-related requests
- Pipeline failure analysis agent: Analyzes CI/CD pipeline failures
- Evaluator agent: Reviews responses from other agents to ensure helpfulness and accuracy

This multi-agent approach was adopted because, as Mark Roy emphasized in his presentation, keeping agents small and focused is a best practice. When too many actions are crammed into a single agent, the LLM becomes confused, prompts get longer, and performance degrades. The team found that spreading responsibilities across multiple specialized agents improved accuracy and reliability.

**Guardrails and Security:**
The solution relies heavily on Amazon Bedrock Guardrails for protection, including:

- Masking potentially PII information and other confidential data
- Handling cases where users accidentally post passwords in the chat
- Protection against malicious intent
- Filtering inappropriate content for the support context

**Cross-Region Inference:**
The team switched to cross-region inference to improve stability and performance. This feature allows the solution to leverage multiple AWS regions with minimal code changes (just updating the inference profile ID), adding significant reliability to the production system.

## Human-in-the-Loop Implementation

One of the most interesting aspects of this case study is how Northwestern Mutual addressed their strict internal rules about AI taking direct actions. In a regulated financial services environment, AI was not allowed to take any direct action on behalf of users—a significant constraint when building agents whose purpose is to automate tasks.

The solution they developed with their risk partners involves explicit confirmation before any action is executed. When an agent determines it needs to perform an action (like unlocking a user account), it responds with the exact action it plans to take and asks for explicit confirmation with a "yes" or "no" response. The team specifically limited acceptance to only "yes" or "no" rather than accepting variations like "yeah" or "sure" to eliminate ambiguity. This approach satisfied the compliance requirements while still enabling automation.

## Response Evaluation and Quality Control

The evaluator agent was described as "a really good addition" to the solution. Because LLMs can be overly helpful (sometimes to a fault), hallucinate, or simply provide unhelpful answers, having a dedicated agent to evaluate responses before they reach users significantly improved the user experience. The presentation showed examples of both positive and negative evaluations where inappropriate responses were filtered out.

The team explicitly stated they "over index on filtering out messages"—meaning they prefer to have a lower response rate from the bot if it means maintaining quality. As Heiko noted, once you lose users' trust, it's very hard to regain. A good user experience takes priority over maximizing automation coverage.

## Production Timeline and Results

The team started work in earnest in June and reached production by September—approximately a three-month timeline from serious development effort to deployment. The results achieved include:

- Support requests answered within minutes without support engineer engagement
- Support engineers now have time to focus on more complex issues
- Improved employee engagement (both for users getting faster answers and engineers doing more meaningful work)
- Foundation established for more complex business-facing applications

## Lessons Learned

The presentation included several practical lessons learned from the production deployment:

- **Data quality matters**: Well-curated documentation is essential for knowledge bases to work effectively. "Garbage in, garbage out" remains true for generative AI.
- **Cross-region inference from the start**: There's no excuse not to use this feature given how easy it is to implement and the stability benefits it provides.
- **Explainability**: Configure models to explain their decisions to make debugging significantly easier.
- **Limit agent actions**: Keep the number of actions assigned to each agent limited to prevent confusion (though the exact number has increased over time, from initially around 3-5 to now well past 10).
- **Filter aggressively**: Keep hallucinations and unhelpful responses away from users, even if it means lower overall response rates.
- **Observability is key**: Both for technical issues and for monitoring interactions between the LLM and users. Having feedback mechanisms ensures information remains accurate over time.
- **Adapt to changing user behavior**: The team had to add a pipeline failure analysis agent after observing changes in how users interacted with the system.

## Future Direction

The team expressed enthusiasm about Amazon Bedrock's new multi-agent collaboration feature (launched at re:Invent 2024). Their current orchestration layer is custom-built in Python running on Lambda, but they plan to migrate to Bedrock's native multi-agent collaboration capabilities. This migration is expected to simplify their codebase significantly by removing the need for custom orchestration logic.

They also mentioned "virtual agents"—not implemented in Amazon Bedrock but handled in prompts and code for special cases like escalations and message ignoring—which they plan to move into Bedrock Agents as part of this migration.

## Broader Context

The presentation also included demos from Mark Roy showing two primary patterns for multi-agent systems: (1) unified customer experience using router-based supervisors for intent classification and routing, and (2) automating complex processes using supervisor agents that plan and execute multi-step workflows across collaborators. While these demos were AWS examples (Octank Mortgage Assistant and Startup Advisor), they illustrated the patterns that Northwestern Mutual and similar organizations can leverage for their own implementations.