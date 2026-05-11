---
title: "Building Production Coding Agents with Pi Framework for Sales Process Automation"
slug: "building-production-coding-agents-with-pi-framework-for-sales-process-automation"
draft: false
llmopsTags:
  - "customer-support"
  - "document-processing"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "system-prompts"
  - "memory"
  - "open-source"
  - "security"
  - "databases"
  - "nvidia"
industryTags: "tech"
company: "Tavon"
summary: "Tavon, a small European company building agents for organizations, developed a production-grade sales automation system using the Pi agent framework and OpenClaw. The system automates the processing of requests for proposals (RFPs) by monitoring email inboxes, routing messages to customer-specific agents, and generating draft responses. Each customer has a dedicated agent with customized behavior defined through agent configuration files and customer-specific parameters. The agents use CLI-based tools to access CRM and ERP systems, execute tasks in secure sandboxed environments, and leverage session management to maintain conversation context across multiple interactions, ultimately reducing manual effort in the sales process while keeping human users in the loop for final approval."
link: "https://www.youtube.com/watch?v=vAIDdLKB6-w"
year: 2026
seo:
  title: "Tavon: Building Production Coding Agents with Pi Framework for Sales Process Automation - ZenML LLMOps Database"
  description: "Tavon, a small European company building agents for organizations, developed a production-grade sales automation system using the Pi agent framework and OpenClaw. The system automates the processing of requests for proposals (RFPs) by monitoring email inboxes, routing messages to customer-specific agents, and generating draft responses. Each customer has a dedicated agent with customized behavior defined through agent configuration files and customer-specific parameters. The agents use CLI-based tools to access CRM and ERP systems, execute tasks in secure sandboxed environments, and leverage session management to maintain conversation context across multiple interactions, ultimately reducing manual effort in the sales process while keeping human users in the loop for final approval."
  canonical: "https://www.zenml.io/llmops-database/building-production-coding-agents-with-pi-framework-for-sales-process-automation"
  ogTitle: "Tavon: Building Production Coding Agents with Pi Framework for Sales Process Automation - ZenML LLMOps Database"
  ogDescription: "Tavon, a small European company building agents for organizations, developed a production-grade sales automation system using the Pi agent framework and OpenClaw. The system automates the processing of requests for proposals (RFPs) by monitoring email inboxes, routing messages to customer-specific agents, and generating draft responses. Each customer has a dedicated agent with customized behavior defined through agent configuration files and customer-specific parameters. The agents use CLI-based tools to access CRM and ERP systems, execute tasks in secure sandboxed environments, and leverage session management to maintain conversation context across multiple interactions, ultimately reducing manual effort in the sales process while keeping human users in the loop for final approval."
notion:
  pageId: "35df8dff-2538-8086-8353-e7ebac7e3471"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:31:00.000Z"
  lastEditedTime: "2026-05-11T20:31:00.000Z"
  publishedAt: "2026-05-11T20:41:20Z"
---

## Overview

Tavon is a small European company focused on building agent-based systems for organizations. The presentation discusses their journey from exploring the Pi agent framework through OpenClaw to building production systems using coding agents. The speaker emphasizes that this is an emerging field in rapid evolution, with patterns still being discovered and no authoritative resources yet established. The core use case presented involves automating sales processes, specifically handling requests for proposals for a client that sells parts, using a multi-agent architecture built on the Pi framework.

## Technical Foundation: Understanding Pi and Agent Architecture

The Pi framework, developed by Mario who is joining Anthropic, represents a minimal, open-source foundation for building agents. The speaker emphasizes that at its core, an agent is simply an LLM that runs tools in a loop. The basic pattern involves providing the agent with goals, context information, and enabling it to make tool calls iteratively until it achieves its objectives. This simplicity is both the framework's strength and what makes it an excellent learning tool for those wanting to understand how production agent systems work under the hood.

The Pi framework is structured around several core packages that are used in OpenClaw: agent core (the fundamental agent class), the coding agent extension, a unified LLM abstraction layer, and a terminal UI interface. The framework provides comprehensive event systems that allow developers to monitor and intervene in agent operations, which proves critical for production deployments where observability and control are essential.

## Coding Agents vs. Core Agents

The presentation makes an important distinction between two types of agents. Core agents are traditional LLM agents that execute tool calls in loops, suitable for many business automation tasks. Coding agents extend this concept by adding a runtime environment with shell access, typically Bash. This seemingly small addition creates powerful new capabilities, as demonstrated by Anthropic's Claude desktop application, which bundles coding agent functionality into an accessible product.

The speaker provides an example where someone sent a voice message to OpenClaw, which at the time had no specific voice message handling capability. However, because it had access to command-line tools like ffmpeg, the coding agent could dynamically compose existing tools to solve the problem. This demonstrates emergent behavior where the agent's capabilities extend beyond explicitly programmed functions through creative tool composition. The speaker notes this pattern of using simple CLI tools is particularly effective because current LLMs are quite proficient at working with command-line interfaces.

## Production Architecture: The Sales Automation System

Tavon's production system for sales process automation demonstrates how coding agent concepts can be applied to real business problems. The system addresses the challenge of handling incoming RFPs for a parts supplier. The architecture follows a gateway pattern with multi-agent orchestration, showing sophisticated LLMOps practices.

The system begins by monitoring an email inbox for incoming RFP requests. A gateway component performs initial triage and routing, directing messages to appropriate specialized agents. The key architectural decision involves creating one agent per customer, which allows for deep customization while maintaining manageable system complexity. Each customer-specific agent is configured through two primary files: an agent configuration file that defines the general harness, role, and instructions for how to use various systems and respond to different scenarios, and a customer-specific configuration file that captures unique attributes like special discounts, access rights, particular requirements, or communication preferences.

This per-customer agent pattern demonstrates an emerging LLMOps best practice: using configuration-driven agent behavior rather than attempting to create one monolithic agent that handles all variations. It allows the system to scale across diverse customer requirements while keeping individual agent logic manageable and maintainable.

## Session Management and Context Persistence

A critical LLMOps consideration in the Tavon system is session management. The architecture creates and reuses sessions for each case, enabling continuity across multiple interactions. When an email arrives that relates to an existing case, the system retrieves the associated session, providing the agent with full historical context. This session-based approach prevents information loss and allows agents to maintain coherent long-running interactions, which is essential for complex sales processes that may involve multiple back-and-forth communications.

The use of sessions also enables better monitoring and debugging in production. Each session maintains a complete trace of agent actions, tool calls, and results, providing observability into what the agent did and why. This audit trail becomes invaluable for troubleshooting issues, improving prompts, and understanding agent behavior patterns across different scenarios.

## Tool Integration Strategy: Making Systems Accessible to Agents

The Tavon team made a deliberate architectural choice to expose backend systems through CLI tools rather than building custom APIs or direct integrations. The system includes CLI-based tools for accessing their CRM and ERP systems, retrieving customer information, checking inventory, and other operations needed to respond to RFPs. This "make it easy for coding agents" principle reflects an emerging architectural pattern where systems are designed around agent capabilities rather than forcing agents to adapt to complex existing interfaces.

The speaker provides context for this approach by referencing the Unix philosophy articulated by Ken Thompson: "write programs that do one thing and do one thing well." By creating small, focused CLI tools, each handling a specific operation, the system provides agents with composable building blocks they can combine to solve complex problems. This modularity also makes the system more maintainable, as individual tools can be updated or replaced without affecting the entire agent system.

The Claude desktop application's approach to Excel integration serves as a reference example. Rather than building direct Excel integration, it uses a set of small tools including pandas, openpyxl, and LibreOffice utilities, packaging them into an Excel "skill." This demonstrates how coding agents can present sophisticated capabilities to end users while internally relying on simple, well-understood tools.

## Extension Mechanism and UI Interaction

Pi provides an extension API that allows developers to add capabilities to agents. The speaker focuses particularly on session events and UI interaction extensions. In their CRM lead qualifier demonstration, they show how extensions can add custom commands and interact with users through UI elements like selection prompts and dropdowns. While the current Pi extension framework is designed primarily for terminal interfaces suitable for developer tools like coding assistants, the speaker demonstrates how similar patterns could extend to web interfaces.

This extension mechanism represents important LLMOps infrastructure, as it provides a standardized way to add capabilities without modifying core agent logic. Extensions can inject behavior at key points in the agent lifecycle, such as before tool calls, allowing for implementation of authorization checks, validation logic, rate limiting, or other enterprise requirements. The event-driven architecture enables subscribing to agent events to provide feedback, update UIs, or trigger auxiliary processes.

## Human-in-the-Loop Design

A notable aspect of the Tavon sales system is its human-in-the-loop architecture. Rather than having agents send emails automatically, the system generates draft responses that appear in the user's email client. Users can review, edit, and approve these drafts before sending. This design reflects mature LLMOps thinking that recognizes current LLM limitations and the importance of human judgment, particularly in customer-facing communications with business consequences.

The speaker notes that this approach keeps users in their familiar email environment rather than requiring them to learn a new interface. The administrative dashboard shown serves primarily for monitoring and troubleshooting, while day-to-day work happens where users already spend their time. This attention to user experience and workflow integration demonstrates understanding that successful LLMOps extends beyond technical implementation to consider how agents fit into existing business processes.

## Multi-Agent Coordination and OpenClaw Architecture

The speaker provides insight into how OpenClaw builds on Pi's foundation to support production multi-agent systems. While Pi provides excellent session support and core agent functionality, OpenClaw adds its own plugin mechanism tailored to production requirements including multi-channel routing, provider orchestration for working with multiple LLM providers, sub-agent management for hierarchical agent systems, and gateway support for request routing and load management.

OpenClaw's function for embedding Pi agents creates sessions and streams information back to coordinators, enabling the complex orchestration seen in the Tavon sales system. This layered architecture, where OpenClaw provides production infrastructure on top of Pi's core agent mechanics, represents a pattern likely to emerge across the industry as teams build production-ready systems on flexible agent frameworks.

## Security and Sandboxing Considerations

The speaker acknowledges that security and sandboxing remain evolving concerns for coding agents with shell access. They mention that the team ensures data security and uses their own sandboxing approach, though details are limited. Importantly, they reference Nvidia's announcement around OpenClaw and their "open shell" policy as a promising direction for securing agents. The acknowledgment that they are "just on the steps of getting there" with sandbox security reflects the broader industry reality that many operational aspects of production coding agents remain works in progress.

This honest assessment of security maturity stands in contrast to vendor presentations that might gloss over such concerns. For LLMOps practitioners, it highlights the importance of careful risk assessment when deploying coding agents, particularly in systems with access to sensitive data or critical business operations.

## Observability and Debugging

The demonstration of the system's operation shows extensive logging and event tracking. When a draft email is generated, the system provides visibility into all the tool calls the agent made, the results it received, and the reasoning steps it followed. This level of observability is essential for production LLMOps, enabling teams to debug issues, understand unexpected behaviors, identify patterns that could be optimized, and provide evidence for compliance and auditing requirements.

The session-based architecture naturally provides structured logs organized by case, making it easier to trace issues back through the system. Each email thread maintains its associated agent session, creating a clear mapping between business objects and technical execution traces. This design demonstrates mature thinking about production operability beyond just getting agents to work.

## Development Philosophy and Emerging Patterns

Throughout the presentation, the speaker emphasizes that the field lacks established patterns and best practices. The advice to "make it easy for coding agents" represents one emerging architectural principle, but the speaker notes this is intentionally broad. The encouragement to experiment, tinker with Pi, and discover what works reflects the current state of the field where practitioners are still establishing foundations.

The speaker's observation that they could give the same talk in a few weeks and it would be different captures the rapid evolution in this space. This context is important for evaluating the case study: while Tavon has built a functional production system, they position it as an exploration and learning experience rather than a definitive approach. For organizations considering similar implementations, this suggests the value of maintaining flexibility and expecting significant evolution in tools, patterns, and best practices.

## Tool Composition and Agent Capabilities

The sales automation system demonstrates sophisticated tool composition. Agents make multiple sequential calls to different backend systems, gathering information from the CRM about the customer, checking the ERP for product availability and pricing, and retrieving historical data from previous interactions. The agent synthesizes this information to generate contextually appropriate responses. This multi-step reasoning with tool use represents the core value proposition of coding agents for business automation: the ability to execute complex workflows that would traditionally require custom code for each scenario.

The system's ability to associate incoming emails with existing cases and retrieve relevant sessions shows practical implementation of retrieval and context management. While not explicitly described as RAG, the system performs similar functions in retrieving relevant historical context and injecting it into agent prompts to inform responses.

## Practical Recommendations and Takeaways

The speaker offers clear recommendations for practitioners interested in coding agents. The emphasis on Pi as a minimal framework perfect for learning reflects the value of understanding fundamental patterns before adopting higher-level abstractions. The encouragement to simply ask Pi to build what you want demonstrates confidence in the current capabilities of coding agents for many tasks, at least for initial prototypes and learning.

The case study ultimately presents coding agents as a fundamental building block for future software systems rather than a specialized tool for niche applications. This represents a significant claim about the trajectory of software development, though one that the speaker acknowledges remains to be fully validated as patterns mature and more production systems are deployed.

## Assessment and Balanced Perspective

While the presentation showcases real production deployment and thoughtful architecture, several factors warrant consideration. The system is described as built for "a client" with limited details about scale, complexity of actual RFPs handled, accuracy of generated responses, or business outcomes achieved. The demonstration shows a single example case, making it difficult to assess how well the system handles edge cases, ambiguous requests, or situations requiring nuanced business judgment.

The human-in-the-loop design, while prudent, also limits the automation value compared to systems that could operate fully autonomously. The extent to which draft emails require human editing, how often agents fail to produce usable drafts, and what percentage of time savings users actually experience remain unclear. The speaker's acknowledgment that security and sandboxing are still evolving concerns raises questions about deployment environments and what types of data the system can safely access.

Nevertheless, the case study provides valuable insight into practical considerations for deploying coding agents in business contexts: the per-customer agent pattern for managing complexity, CLI-based tool integration as an agent-friendly architecture, session management for context persistence, and human-in-the-loop for risk management. These represent genuine LLMOps engineering decisions rather than marketing claims, offering useful lessons for practitioners building similar systems.
