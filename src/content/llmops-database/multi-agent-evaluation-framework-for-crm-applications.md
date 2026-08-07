---
title: "Multi-Agent Evaluation Framework for CRM Applications"
slug: "multi-agent-evaluation-framework-for-crm-applications"
draft: false
llmopsTags:
  - "customer-support"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "evals"
  - "agent-based"
  - "crewai"
  - "monitoring"
industryTags: "tech"
company: "Salesforce"
summary: "Salesforce's Agent Force product team addresses the challenge of evaluating multi-agent AI systems in production CRM environments, where traditional single-agent evaluation approaches prove insufficient. The team developed a three-layered evaluation framework that tests individual agents, agent interactions and handoffs, and end-to-end system outcomes. This framework enables teams to build trust in complex agent orchestrations by combining code-based evaluations, LLM-as-judge approaches, and human-in-the-loop validation. The approach has been applied to customer service, sales, and marketing agents, helping organizations validate agent behavior before deployment and monitor performance in production through comprehensive observability and trajectory analysis."
link: "https://www.youtube.com/watch?v=NB8Rexhq0zQ"
year: 2026
seo:
  title: "Salesforce: Multi-Agent Evaluation Framework for CRM Applications - ZenML LLMOps Database"
  description: "Salesforce's Agent Force product team addresses the challenge of evaluating multi-agent AI systems in production CRM environments, where traditional single-agent evaluation approaches prove insufficient. The team developed a three-layered evaluation framework that tests individual agents, agent interactions and handoffs, and end-to-end system outcomes. This framework enables teams to build trust in complex agent orchestrations by combining code-based evaluations, LLM-as-judge approaches, and human-in-the-loop validation. The approach has been applied to customer service, sales, and marketing agents, helping organizations validate agent behavior before deployment and monitor performance in production through comprehensive observability and trajectory analysis."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-evaluation-framework-for-crm-applications"
  ogTitle: "Salesforce: Multi-Agent Evaluation Framework for CRM Applications - ZenML LLMOps Database"
  ogDescription: "Salesforce's Agent Force product team addresses the challenge of evaluating multi-agent AI systems in production CRM environments, where traditional single-agent evaluation approaches prove insufficient. The team developed a three-layered evaluation framework that tests individual agents, agent interactions and handoffs, and end-to-end system outcomes. This framework enables teams to build trust in complex agent orchestrations by combining code-based evaluations, LLM-as-judge approaches, and human-in-the-loop validation. The approach has been applied to customer service, sales, and marketing agents, helping organizations validate agent behavior before deployment and monitor performance in production through comprehensive observability and trajectory analysis."
notion:
  pageId: "3b5f8dff-2538-80c9-8855-ed3077ea6084"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:27:00.000Z"
  lastEditedTime: "2026-08-07T12:27:00.000Z"
  publishedAt: "2026-08-07T12:41:15Z"
---

## Overview

Salesforce's Agent Force product team, represented by Manjit Singh, has developed a comprehensive approach to evaluating multi-agent AI systems in production CRM environments. The team focuses on the agent development lifecycle, particularly the testing and observability phases, working with customer service, sales, and marketing agents. The core challenge addressed is how to validate increasingly complex multi-agent systems before and after deployment, moving beyond single-agent evaluation paradigms that prove insufficient for orchestrated agent workflows.

The fundamental philosophy articulated by the team is that "you can live code but you can't live operate," emphasizing that building trust in AI systems requires rigorous evaluation frameworks. This becomes especially critical as organizations move from building single agents to creating fleets of specialized agents that work together to accomplish complex tasks.

## Evaluation Framework Foundations

The Salesforce team structures their evaluation approach around three core components that apply regardless of what is being evaluated. First is the evaluation framework itself, which defines the methodology and approach. Second is the test dataset, including strategies for sourcing test examples and building comprehensive test coverage. Third are the metrics used to assess performance and quality.

A critical distinction made is between evaluating the model layer versus the application layer. The team takes a model-agnostic stance, recommending that organizations not building foundation models should avoid spending significant effort on model evaluation. Instead, they suggest relying on public benchmarks and quickly switching models if performance is inadequate. The real evaluation complexity lies in the application layer where agents orchestrate models, memory systems, and tools both within and across platforms.

The team identifies two temporal categories for evaluations: offline evaluations conducted before production deployment and online evaluations running continuously in production through alerting and monitoring systems. However, they note this is just the beginning of the complexity.

## Evaluator Selection Strategy

A key insight is the spectrum of evaluation approaches, each with different cost and scalability characteristics. On one end are human evaluators, who provide high-quality judgments but are expensive, limited in availability, and subject to fatigue. On the other end are deterministic code-based evaluations that work well for scenarios with clear logical rules. In the middle are LLM-as-judge approaches using foundation models, which have become increasingly cost-effective with smaller models.

The team strongly advocates for a hybrid approach rather than relying on a single evaluation method. For deterministic scenarios like routing cases to specific users based on rules, code-based evaluations are sufficient and efficient. For qualitative assessments of generated content like document summaries, LLM-as-judge becomes necessary. Human evaluation remains essential, particularly for reviewing logs and error patterns to identify issues that automated systems might miss.

An important practice emphasized is the necessity of log review regardless of how sophisticated the automated evaluation framework becomes. The team positions this as essential for building successful AI systems, creating a cycle of examining logs, identifying patterns, and codifying those patterns into automated evaluations.

## Single-Agent Evaluation

For single-agent scenarios, the evaluation challenge is relatively straightforward. The agent receives an input and produces an output, which can be compared against an expected response to generate confidence scores. This traditional input-output paradigm enables teams to validate whether agents are ready for specific use cases.

However, even single-agent evaluation becomes more complex with conversational, multi-turn interactions. The team addresses a common question: should evaluation occur on every turn of a conversation or only on the complete interaction? Their answer is that both levels of evaluation are important. For multi-intent conversations, each intent needs validation, while overall conversation-level metrics capture whether the agent accomplished its goal.

For multi-turn agents, the team evaluates several critical metrics beyond simple response accuracy. These include whether the agent completed the job, escalation rates to human agents, and customer satisfaction scores. In customer support contexts, tracking whether issues were resolved without human escalation provides crucial business metrics.

The team recommends starting with 30 to 50 test cases at minimum and focusing on what they call the "accuracy trifecta metrics": cost, redundancy, and quality. From this foundation, test coverage can expand as the system matures.

## Multi-Agent Evaluation Challenges

The complexity increases dramatically with multi-agent systems, which the team describes as fleets of agents working together. Their reference architecture involves a super agent or orchestrator that decomposes complex tasks and distributes them to specialized agents running across different systems. These workflows can run for extended periods, sometimes hours, creating new failure modes and evaluation challenges.

The team identifies several failure patterns unique to multi-agent systems. Agents may get stuck in reasoning loops, consuming excessive tokens and time. Long-running tool calls can hang indefinitely. The failure probability compounds across the system because when multiple agents each have individual failure rates, the overall system failure probability is multiplicative rather than additive.

To illustrate these challenges, the team references examples from coding agents that can run for 40 minutes behind the scenes, orchestrating 10 different specialized agents to build applications. The evaluation question becomes not just whether the final code works, but whether the orchestration happened correctly, whether latency is acceptable, and where in the multi-agent workflow failures occurred.

## Three-Layered Evaluation Framework

To address multi-agent complexity, the Salesforce team developed a three-layered evaluation framework that provides structure for testing different aspects of the system.

**Layer One: Individual Agent Testing** focuses on each agent as a microservice. Each specialized agent needs unit testing to validate it performs its intended function correctly. This becomes especially important when different teams build different agents. For example, if a customer service team builds a support agent and a sales team builds a sales agent that will interact through handoffs, each team must validate their individual agent's behavior first.

The evaluation at this layer examines input-output pairs for each agent independently, similar to traditional unit testing. Teams validate accuracy, cost, redundancy, and quality metrics for each agent in isolation before considering interactions.

**Layer Two: Interaction and Handoff Testing** addresses challenges unique to multi-agent systems. This layer evaluates whether context is preserved correctly during handoffs between agents, whether permissions transfer appropriately, and whether the communication protocols between agents function correctly.

A concrete example provided is a flight booking scenario where a user provides complex requirements including destination, budget, and timeframe. As this request gets passed between agents, including potentially external third-party agents for specific airlines, all context must be preserved. If context is lost during handoffs, the system might book incorrect flights, leading to customer dissatisfaction and unclear responsibility attribution.

The team emphasizes visualizing multi-agent workflows by drawing them on whiteboards to map agent sequences and identify potential failure points. This visualization helps teams understand where errors originate, which is often not at the point of visible failure but earlier in the chain.

**Layer Three: System-Level Outcome Validation** evaluates end-to-end business outcomes and overall system behavior. This is where business metrics like containment rate in customer service or lead qualification success in sales are measured.

The team notes that agent monetization increasingly depends on outcome-based pricing, making this layer critical for business validation. For SDR agents, outcomes might include successfully qualifying leads that progress through the sales cycle. For customer service, outcomes include case closure rates without human escalation.

Before production deployment, teams must test these outcome metrics internally to build confidence. Without this validation, organizations lack the assurance needed to scale their multi-agent systems.

## Trajectory Analysis and State Management

An important concept for multi-agent evaluation is trajectory analysis, which the team describes using an air traffic controller metaphor. Just as air traffic controllers track multiple aircraft simultaneously, multi-agent systems require visibility into all running agents, their handoffs, and their current states.

The team predicts that vendor tools emerging in the market will provide control planes with comprehensive visibility into agent traces, enabling teams to follow execution paths and identify issues. This observability is essential for debugging and optimization.

For long-running multi-agent systems that operate for hours or days, state management becomes critical. The team describes using state machines to track progress, with some implementations using simplified file-based approaches for learning across sessions and tracking handoffs. However, they note that enterprise systems typically require more robust database-backed state management.

An additional complexity is that not all multi-agent interactions are sequential. While sequential workflows are easier to evaluate, many systems involve parallel agent execution, which requires different evaluation strategies. The team references various orchestration patterns available in frameworks like Google AI, including sequential racing and graph-based orchestrations, each requiring evaluation approaches matched to the orchestration pattern.

## Practical Implementation Guidance

For teams getting started with multi-agent evaluation, the Salesforce team recommends beginning with a single small workflow rather than attempting comprehensive coverage immediately. Teams should create specific test goals and leverage production traces as a source of realistic test data.

Even without access to extensive production data, teams can examine traces from internal systems and public examples from services like food delivery or banking to understand the types of questions users ask agents. This research helps teams make educated guesses about test scenarios that will cover realistic edge cases.

The recommended approach is a five-step iterative loop: create test datasets, run evaluations, examine error rates and failure patterns, identify edge cases, and refine the test suite. This continuous improvement cycle builds increasingly robust evaluation coverage over time.

## Organizational Considerations

The team addresses an important question about organizational responsibility for evaluation work. Rather than assigning evaluation to a single role like QA, PM, or engineering, they advocate for a team-based approach where responsibilities are distributed.

Product managers should deeply consider what success looks like for the product and articulate potential failure modes early in development. By defining success criteria and failure scenarios upfront, PMs enable engineers and data scientists to build appropriate evaluation frameworks and metrics.

The team observes that traditional role boundaries are blurring in AI development. Domain experts are becoming builders, while traditional builders are becoming enablers. This role compression creates overlap where QA, engineering, and product responsibilities intersect. The team suggests this transformation is necessary for successful AI product development and will lead to organizational restructuring with smaller teams leveraging AI capabilities.

## Critical Evaluation Considerations

Throughout the presentation, the team emphasizes several critical considerations for production multi-agent systems. The hybrid evaluation approach combining code-based, LLM-as-judge, and human evaluation is essential rather than optional. No single evaluation method provides sufficient coverage for the complexity of multi-agent systems.

The importance of observability and monitoring in production cannot be overstated. The team spends significant energy on observability phases of the agent development lifecycle, recognizing that evaluation doesn't end at deployment but continues through production monitoring.

Context preservation across agent handoffs represents a critical failure point that must be explicitly tested. As systems become more complex with multiple specialized agents, the surfaces for context loss multiply, making this a primary area of evaluation focus.

Finally, the team emphasizes that building trust in agent systems requires validation before scaling. Organizations cannot simply deploy multi-agent systems and hope they work; they must systematically evaluate individual agents, interactions, and outcomes to build the confidence necessary for production deployment and scaling.
