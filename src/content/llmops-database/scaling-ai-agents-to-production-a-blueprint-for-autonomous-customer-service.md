---
title: "Scaling AI Agents to Production: A Blueprint for Autonomous Customer Service"
slug: "scaling-ai-agents-to-production-a-blueprint-for-autonomous-customer-service"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69315f557a279247f551fa0e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:32:46.064Z"
  createdOn: "2025-12-04T10:15:49.315Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "poc"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "monitoring"
  - "orchestration"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "serverless"
  - "security"
  - "open-source"
  - "amazon-aws"
industryTags: "automotive"
company: "Cox Automotive"
summary: "Cox Automotive, a dominant player in the automotive software industry with visibility into 5.1 trillion vehicle insights, faced the challenge of moving AI agents from prototype to production at scale. In response to an aggressive 5-week deadline set in summer 2024, the company launched five agentic AI products using Amazon Bedrock Agent Core and the Strands framework. The flagship product was a fully automated virtual assistant for dealership customer conversations that operates autonomously after hours without human oversight. By establishing foundational infrastructure with Agent Core, implementing comprehensive red teaming practices, designing both hard and soft guardrails, automating evaluation with LLM-as-judge techniques, and setting circuit breakers for cost and conversation limits, Cox Automotive successfully deployed three products to production beta, with dealers reporting that customers receive timely responses both during business hours and after hours."
link: "https://www.youtube.com/watch?v=ICA8-d_Nt9Q"
year: 2025
seo:
  title: "Cox Automotive: Scaling AI Agents to Production: A Blueprint for Autonomous Customer Service - ZenML LLMOps Database"
  description: "Cox Automotive, a dominant player in the automotive software industry with visibility into 5.1 trillion vehicle insights, faced the challenge of moving AI agents from prototype to production at scale. In response to an aggressive 5-week deadline set in summer 2024, the company launched five agentic AI products using Amazon Bedrock Agent Core and the Strands framework. The flagship product was a fully automated virtual assistant for dealership customer conversations that operates autonomously after hours without human oversight. By establishing foundational infrastructure with Agent Core, implementing comprehensive red teaming practices, designing both hard and soft guardrails, automating evaluation with LLM-as-judge techniques, and setting circuit breakers for cost and conversation limits, Cox Automotive successfully deployed three products to production beta, with dealers reporting that customers receive timely responses both during business hours and after hours."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-agents-to-production-a-blueprint-for-autonomous-customer-service"
  ogTitle: "Cox Automotive: Scaling AI Agents to Production: A Blueprint for Autonomous Customer Service - ZenML LLMOps Database"
  ogDescription: "Cox Automotive, a dominant player in the automotive software industry with visibility into 5.1 trillion vehicle insights, faced the challenge of moving AI agents from prototype to production at scale. In response to an aggressive 5-week deadline set in summer 2024, the company launched five agentic AI products using Amazon Bedrock Agent Core and the Strands framework. The flagship product was a fully automated virtual assistant for dealership customer conversations that operates autonomously after hours without human oversight. By establishing foundational infrastructure with Agent Core, implementing comprehensive red teaming practices, designing both hard and soft guardrails, automating evaluation with LLM-as-judge techniques, and setting circuit breakers for cost and conversation limits, Cox Automotive successfully deployed three products to production beta, with dealers reporting that customers receive timely responses both during business hours and after hours."
---

## Overview

Cox Automotive's agentic AI journey represents a compelling case study in rapidly scaling AI agents from experimentation to production deployment. The presentation, delivered by Ravi (AWS Solutions Architect), Brian Lloyd Newberry (Associate VP of Enterprise Architecture), and Tabari Gowen (Lead Architect), chronicles how Cox Automotive—a company that processes hundreds of millions of customer interactions and maintains 5.1 trillion vehicle insights across brands like AutoTrader, Kelley Blue Book, and Mannheim Auctions—successfully deployed multiple agentic AI systems to production in just five weeks during summer 2024.

The company's position as the dominant software provider in the automotive industry, serving dealer ERPs, CRMs, inventory management systems, and consumer portals, gave them unique visibility into the entire automotive ecosystem. This data foundation, combined with their existing experience running over 150 AI models in production, positioned them well for the leap into agentic AI. However, the transition from traditional predictive AI and even generative AI applications to fully autonomous agent systems presented significant operational challenges that required new LLMOps practices and infrastructure.

## The Production Challenge

The central problem Cox Automotive identified was the significant gap between experimenting with AI agents and successfully operating them at scale in production environments. As demonstrated in the opening poll of the presentation, while many organizations experiment with AI agents, very few successfully launch them to production at scale. Cox Automotive's previous success with a human-in-the-loop generative AI product called Predictive Insights—which helped dealers craft personalized customer messages and increased response rates by 50%—revealed a critical limitation: over half of dealership leads arrive after hours when no human is available to click the button and generate messages. This gap highlighted the need for fully autonomous agentic systems that could operate without human oversight while maintaining trust, safety, and brand reputation.

The technical challenges of production agentic AI systems are substantial. Unlike traditional applications, agents require scalable infrastructure for long-running workflows with complex orchestration, managed memory systems to maintain conversational context across sessions, secure access controls for both agents and the tools they use, mechanisms for tool discovery and inter-agent communication, and comprehensive observability for tracing non-deterministic behavior. These requirements create a complex operational landscape that most teams struggle to navigate when moving from prototype to production.

## Infrastructure Foundation: Amazon Bedrock Agent Core

Cox Automotive's solution centered on adopting Amazon Bedrock Agent Core as their foundational infrastructure, despite the platform not being fully released at the time of their development sprint. This decision—unusual for Cox Automotive, which typically avoids first-generation products—was made based on their close partnership with AWS and visibility into the product roadmap. Agent Core provided five fully managed services that addressed their core operational challenges:

The **Runtime** component offers secure, scalable, and serverless execution supporting multi-modal inputs up to 100MB with long-running sessions up to 8 hours. This flexibility allows the system to handle image inputs (such as technician photos of dashboard warning lights) alongside text, and to maintain context throughout lengthy diagnostic and repair workflows. The framework-agnostic nature of the runtime meant Cox Automotive could use any agent framework with any model, providing architectural flexibility.

The **Memory** service provides both short-term memory for storing conversational state and long-term memory to learn from customer interactions and adapt over time. Out-of-the-box strategies include user preferences, semantic facts, and summarization, with the ability to override these or bring custom strategies. This addresses the critical requirement that agents remember previous interactions when customers return weeks later for follow-up service.

The **Identity** component handles secure authentication and credential management, supporting OAuth and IAM out of the box. This was crucial for Cox Automotive's use case, where agents needed to access internal pricing and inventory systems and even log into legacy supplier web applications to place parts orders.

The **Gateway** converts existing APIs and Lambda functions into agent-ready MCP (Model Context Protocol) tools and provides built-in semantic search for intelligent tool discovery. This capability allowed Cox Automotive to leverage their existing systems without extensive re-architecting, dramatically accelerating their timeline.

The **Observability** service provides complete visibility into agent trajectory with out-of-the-box CloudWatch dashboards and integration with existing observability stacks via OpenTelemetry format. For Cox Automotive, this meant they could trace every diagnostic recommendation back to its source documents, essential for debugging and evaluation in production.

Additionally, Agent Core includes two special-purpose tools: a **Browser** component for complex web automation tasks (critical for interacting with legacy supplier systems) and a **Code Interpreter** for running ad-hoc complex calculations in any language within a secure sandbox (useful for pricing calculations and diagnostics).

## Agent Framework Selection: Strands

For the agent framework layer, Cox Automotive selected Strands, an AWS-backed open-source framework that runs natively on Agent Core. The decision-making process here illustrates important LLMOps principles around focus and velocity. BLN emphasized that new agentic frameworks emerge "every 2 or 3 days" and that the specific framework matters less than getting started and maintaining focus. Rather than having five teams each learn different frameworks, they standardized on Strands to concentrate learning and enable cross-team support.

The Strands framework simplifies agent development to three core activities: writing prompts (text), configuration (also primarily text), and attaching agents to models and tools. The framework leverages well-documented Python code, where the documentation itself serves as the tool description that the LLM uses to understand when and how to invoke tools. This approach democratizes agent development by reducing it to primarily a text-based configuration task rather than complex systems programming.

Importantly, the team experienced the value of this foundational architecture when mid-project guidance shifted from using Agent Squad to Strands. Because they had built on the stable Agent Core foundation, this migration took only two weeks rather than the several weeks it would typically require. This flexibility to evolve the tech stack without major re-architecting demonstrates a key LLMOps principle: building on stable, managed infrastructure layers that abstract away framework-specific concerns.

## Architecture Pattern: Orchestrator with Specialized Sub-Agents

The flagship product—a fully automated virtual assistant for dealership customer conversations—implements a multi-agent orchestration pattern. When a customer sends a message, an orchestrator agent analyzes the intent and routes it to one of several domain-specific sub-agents (sales, service, etc.). Each sub-agent understands its own domain and handles its portion of the conversation independently. Once sub-agents complete their work, the orchestrator aggregates the results and crafts a unified response to the customer, continuing this cycle throughout the conversation.

This architecture provides several advantages for production systems. Domain separation allows different teams to own and evolve different sub-agents independently, improving maintainability. Specialized agents can have different tool access, reducing the security surface area for any individual agent. The orchestrator pattern also provides a natural point for implementing cross-cutting concerns like guardrails, circuit breakers, and observability. The system operates autonomously end-to-end, handling the entire customer conversation lifecycle without human intervention, though with carefully designed handoff mechanisms when needed.

## Red Teaming as Core Practice

One of the most significant LLMOps practices Cox Automotive adopted was comprehensive red teaming—actively trying to make the system fail in various ways before it reaches customers. Tabari Gowen emphasized that red teaming is distinct from traditional testing: testing checks what works, while red teaming tries to break it. This practice cannot be left to the end of development but must be integrated throughout the development lifecycle.

Cox Automotive's red teaming efforts included attempting to prompt the agent to respond in foreign languages (when it should only respond in English), feeding unreadable characters to test input handling, attempting to extract system prompts or tool definitions through social engineering attacks, and testing edge cases in conversational flow. The team red teamed before alpha, before beta, and continues red teaming in production after every code deployment and after every prompt change. Each exploit is cataloged, fixed, and used to strengthen the system's resilience.

This practice proved essential because even with comprehensive red teaming, the non-deterministic nature of LLMs means unexpected behaviors will still emerge. The red teaming process builds organizational knowledge about failure modes and creates a systematic approach to hardening systems before customers encounter issues. It also provides concrete examples when stakeholders ask "how does this break?"—a question that inevitably arises with autonomous systems that represent brand reputation.

## Guardrails: Hard and Soft Approaches

Cox Automotive implemented a sophisticated two-tier guardrail strategy that distinguishes between completely blocking problematic interactions and gently steering conversations in desired directions. This nuanced approach recognizes that customer service applications require more sophistication than simple blocking mechanisms.

**Hard guardrails** sit at the infrastructure layer and prevent certain interactions from ever reaching the LLM. These can be configured using Amazon Bedrock Guardrails and respond with definitive statements like "I can't help with that," immediately terminating that line of conversation. Hard guardrails protect against prompt injection, inappropriate content, requests outside the agent's scope, and other security concerns.

**Soft guardrails** use the LLM itself but are configured through workflow design and prompt engineering to redirect conversations rather than block them. For example, when a customer asks about pricing negotiation (a sensitive topic the company didn't want the autonomous agent handling), the soft guardrail guides the agent to respond: "That's a great question for our finance team, let me schedule an appointment." This maintains helpfulness and customer satisfaction while staying within safe boundaries.

The soft guardrail approach recognizes that abrupt blocking creates poor customer experiences. By using the LLM's natural language capabilities to gracefully redirect, the system maintains conversational flow while enforcing business rules. This two-tier strategy requires careful design—hard guardrails for absolute boundaries, soft guardrails for nuanced steering—and represents a mature approach to production LLM safety.

## Automated Evaluation: LLM-as-Judge

Traditional testing approaches prove insufficient for production LLM systems due to their probabilistic nature. Manual review of conversations scales only to hundreds of interactions, but Cox Automotive needed to handle tens of thousands of daily transactions. Their solution was automated evaluation using the LLM-as-judge technique.

The process involves generating test conversations, running them through the agent system, and using a separate LLM to evaluate whether responses meet quality standards. The team tracks metrics that matter specifically for customer conversations: relevancy, completeness, and tone. This evaluation framework runs continuously, allowing the team to detect regressions or improvements over time as they modify prompts, change models, or update tools.

Critically, the team designs their evaluation framework around their worst-case scenarios—the interactions that keep them up at night. By encoding these concerns into automated evaluation metrics, they can quantitatively track whether their mitigations are effective. This represents a significant operational maturity: rather than hoping nothing goes wrong, they systematically measure the dimensions of quality that matter most for their business and can track these metrics across deployments.

The LLM-as-judge approach isn't perfect—the judge model has its own limitations and biases—but it provides scalable, automated quality assessment that would be impossible through manual review alone. Combined with traditional testing of deterministic components and red teaming for security, it forms part of a comprehensive quality assurance strategy for production LLM systems.

## Circuit Breakers: Cost and Turn Limits

Even with comprehensive testing, red teaming, guardrails, and evaluation, Cox Automotive recognized that LLMs remain probabilistic systems that will occasionally behave unexpectedly. Their solution was implementing circuit breakers—hard limits that automatically stop the agent when certain thresholds are exceeded.

The team identified two critical metrics for their circuit breakers: **cost limits** and **turn limits**. If a conversation reaches the P95 cost threshold, the agent automatically stops. Similarly, if a conversation exceeds a specific number of back-and-forth turns (around 20 in their example), the agent stops. In either case, the system gracefully hands off the conversation to a human at the dealership who can assess whether to continue.

These circuit breakers serve multiple purposes. They prevent runaway costs from unexpected agent behavior, protect against infinite loops or unproductive conversations, and ensure that complex edge cases receive human attention rather than potentially degrading customer experience. The thresholds are derived from production data analysis—understanding the P95 and P99 distributions of cost and conversation length under normal operation.

Importantly, Tabari emphasized setting these limits from day one rather than waiting for a cost explosion or customer complaint. The circuit breaker philosophy is about failing gracefully—when something goes wrong (and it will), the system should degrade to a safe state rather than continue potentially problematic behavior. This defensive approach to production operations reflects mature LLMOps thinking, recognizing that perfect reliability is impossible with current LLM technology.

## Data Separation and Session Management

Operating multi-tenant agentic systems at scale requires robust data isolation. Cox Automotive serves thousands of dealerships, each with their own customers, preferences, and brand requirements. Agent Core's session management capabilities ensure complete isolation between customer conversations, preventing data leakage between tenants—a critical requirement for both security and compliance.

The short-term memory maintains conversational context within a session, allowing the agent to reference earlier parts of the conversation. Long-term memory extracts patterns and preferences across sessions, enabling the agent to provide increasingly personalized service over time. For example, if a customer consistently prefers OEM parts over aftermarket alternatives, the long-term memory can capture this preference and influence future recommendations.

This memory architecture operates within the multi-tenant environment, associating memories with specific customers and dealerships while maintaining strict isolation. The managed nature of Agent Core's memory service meant Cox Automotive didn't need to build this complex infrastructure themselves—a significant accelerator for their aggressive timeline.

## Observability and Debugging

The non-deterministic nature of LLM-based agents makes comprehensive observability essential for production operations. Cox Automotive leverages Agent Core's observability capabilities to trace the complete execution path of every agent interaction. This includes which sub-agents were invoked, what tools each agent used, what data sources were consulted, and the reasoning chain that led to each decision.

This visibility serves multiple purposes in production. When a dealer reports an unexpected response, the team can trace back through the agent's decision-making process to identify where it diverged from expectations. When evaluating whether to approve a new feature, they can analyze patterns across thousands of interactions to understand typical agent behavior. When optimizing costs, they can identify which tools or sub-agents consume the most resources and make informed trade-offs.

The integration with CloudWatch provides out-of-the-box dashboards for monitoring agent health, performance, and usage patterns. The OpenTelemetry format allows integration with existing observability stacks, ensuring that agentic AI systems fit into established operational workflows rather than requiring entirely new processes. This observability foundation was essential for operating at scale with confidence despite the inherent unpredictability of LLM systems.

## Deployment Velocity and Organizational Learning

Perhaps the most remarkable aspect of Cox Automotive's approach was the compressed timeline: five products from conception to production beta in five weeks. This aggressive deadline, set by Chief Product Officer MJ in mid-July 2024 with a Labor Day launch target, created urgency and focus that proved essential for organizational learning.

BLN emphasized that "nobody's an expert" at building agentic AI systems—the technology has only existed in its current form for about a year. The compressed timeline forced the organization to make decisions and move forward rather than endlessly analyzing options. The philosophy of "start with crazy and work backwards" created permission to attempt things that would normally seem unreasonable.

Of the five projects, three reached production beta, one launched in a reduced capacity (automated price optimization with human approval rather than fully autonomous), and one was taken back to the drawing board. Importantly, the team views the "failed" project as generating valuable learning—understanding what doesn't work is as important as what does. The experience of rapidly deploying multiple systems built organizational muscle around agentic AI that will benefit future projects.

The team learned critical lessons about how agentic AI requires different thinking than traditional software. The non-deterministic nature means product teams must think differently about capabilities and requirements. "Agents have agency"—they can make unexpected choices within their guardrails, requiring a fundamentally different approach to product design than deterministic systems. This mindset shift proved as important as the technical implementation.

## Technical Stack and Ecosystem Integration

Cox Automotive's agentic infrastructure integrates with their existing AWS-centric architecture. The company completed a major cloud migration in 2018, consolidating from 50 data centers to 3 plus AWS regions East and West. They were early adopters of Amazon Bedrock, among the first customers running Bedrock models in production and first with access to Claude.

The Gateway component of Agent Core proved particularly valuable for ecosystem integration. It converts existing APIs and Lambda functions into agent-ready MCP tools, allowing the agents to interact with Cox Automotive's extensive portfolio of internal systems without requiring re-architecting. This includes dealer ERPs, CRMs, inventory management systems, pricing engines, and even legacy supplier web applications.

The browser automation capability handles interactions with systems that don't expose APIs, a common reality in enterprise environments with legacy suppliers. The code interpreter provides a secure sandbox for calculations, important for pricing and financial operations where accuracy is critical. Together, these capabilities allowed Cox Automotive to build sophisticated agentic workflows that span their entire technology ecosystem without requiring every component to be agent-native.

## Production Results and Business Impact

The flagship automated customer service assistant entered beta with positive dealer feedback. Dealers report that customers receive the answers they need both during business hours and after hours, directly addressing the original problem of over 50% of leads arriving when no human is available. The product is scheduled for full production launch in Q1 2025.

The automated price optimization agent is actively used in dealerships, shifting the interaction model from "nagging dealers to do work" to "agent does the work, dealer approves." This represents a subtle but important change—reducing friction by making the default action be the AI's recommendation rather than requiring active dealer effort.

While Cox Automotive didn't disclose specific metrics for these new agentic products, their earlier generative AI work provides context: Predictive Insights increased customer response rates by 50% and another generative AI product saved $750,000 annually by eliminating the need to purchase externally generated content. The agentic products build on this foundation while removing the human-in-the-loop bottleneck.

Beyond individual product metrics, the initiative built organizational capability around agentic AI. Five teams gained hands-on experience, established patterns emerged that can be replicated across the organization, and the company demonstrated the ability to move from concept to production in weeks rather than quarters. This operational tempo provides competitive advantage in a rapidly evolving technology landscape.

## Key LLMOps Principles and Recommendations

The Cox Automotive case study illustrates several essential LLMOps principles for production agentic systems:

**Foundation over frameworks**: Building on stable, managed infrastructure like Agent Core provides flexibility to evolve frameworks and tools without major re-architecting. The framework matters far less than getting started and maintaining focus. As demonstrated when the team migrated from Agent Squad to Strands in two weeks, the right foundation enables rapid adaptation.

**Comprehensive safety strategy**: Production agentic systems require layered safety mechanisms including red teaming throughout development, hard guardrails for absolute boundaries, soft guardrails for conversational steering, automated evaluation with LLM-as-judge, and circuit breakers for cost and conversation limits. No single mechanism suffices—defense in depth is essential.

**Observability as a first-class concern**: The non-deterministic nature of LLMs makes comprehensive tracing and monitoring essential rather than optional. Understanding what the agent did and why it made each decision is necessary for debugging, evaluation, and continuous improvement.

**Fail gracefully**: Circuit breakers and handoff mechanisms acknowledge that perfect reliability is impossible with current LLM technology. Systems should be designed to degrade to safe states (like human handoff) rather than continue potentially problematic behavior.

**Velocity enables learning**: The aggressive five-week timeline forced decisions and created learning opportunities that a more cautious approach would have delayed. In a rapidly evolving field where "nobody's an expert," moving quickly and learning from production data provides more value than prolonged analysis.

**Multi-agent orchestration for complexity**: The orchestrator pattern with specialized sub-agents provides natural boundaries for domain separation, security isolation, and organizational ownership. Complex agentic systems benefit from decomposition into focused agents rather than monolithic implementations.

**Test what works AND what breaks**: Traditional testing verifies correct behavior, but red teaming that actively tries to break the system is equally important for production readiness. Both perspectives are necessary for confidence in deployment.

**Design evaluation around worst cases**: Automated evaluation frameworks should measure the dimensions of quality that matter most for the specific business context and explicitly test the scenarios that represent the highest risk.

Cox Automotive's experience demonstrates that with the right infrastructure foundation, systematic safety practices, and organizational commitment to velocity, agentic AI systems can move from prototype to production at scale. Their "day one" philosophy—always treating it as the beginning rather than settling into comfortable patterns—drives continuous evolution in a rapidly changing technological landscape.