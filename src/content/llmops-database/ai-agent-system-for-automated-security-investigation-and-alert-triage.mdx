---
title: "AI Agent System for Automated Security Investigation and Alert Triage"
slug: "ai-agent-system-for-automated-security-investigation-and-alert-triage"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad8a69fb8ccf2e66322cb"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:20.271Z"
  createdOn: "2025-12-23T18:00:06.822Z"
llmopsTags:
  - "fraud-detection"
  - "content-moderation"
  - "classification"
  - "realtime-application"
  - "high-stakes-application"
  - "structured-output"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "token-optimization"
  - "error-handling"
  - "system-prompts"
  - "mcp"
  - "evals"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "crewai"
  - "anthropic"
  - "openai"
  - "meta"
  - "microsoft-azure"
industryTags: "tech"
company: "Slack"
summary: "Slack's Security Engineering team developed an AI agent system to automate the investigation of security alerts from their event ingestion pipeline that handles billions of events daily. The solution evolved from a single-prompt prototype to a multi-agent architecture with specialized personas (Director, domain Experts, and a Critic) that work together through structured output tasks to investigate security incidents. The system uses a \"knowledge pyramid\" approach where information flows upward from token-intensive data gathering to high-level decision making, allowing strategic use of different model tiers. Results include transformed on-call workflows from manual evidence gathering to supervision of agent teams, interactive verifiable reports, and emergent discovery capabilities where agents spontaneously identified security issues beyond the original alert scope, such as discovering credential exposures during unrelated investigations."
link: "https://slack.engineering/streamlining-security-investigations-with-agents/"
year: 2025
seo:
  title: "Slack: AI Agent System for Automated Security Investigation and Alert Triage - ZenML LLMOps Database"
  description: "Slack's Security Engineering team developed an AI agent system to automate the investigation of security alerts from their event ingestion pipeline that handles billions of events daily. The solution evolved from a single-prompt prototype to a multi-agent architecture with specialized personas (Director, domain Experts, and a Critic) that work together through structured output tasks to investigate security incidents. The system uses a \"knowledge pyramid\" approach where information flows upward from token-intensive data gathering to high-level decision making, allowing strategic use of different model tiers. Results include transformed on-call workflows from manual evidence gathering to supervision of agent teams, interactive verifiable reports, and emergent discovery capabilities where agents spontaneously identified security issues beyond the original alert scope, such as discovering credential exposures during unrelated investigations."
  canonical: "https://www.zenml.io/llmops-database/ai-agent-system-for-automated-security-investigation-and-alert-triage"
  ogTitle: "Slack: AI Agent System for Automated Security Investigation and Alert Triage - ZenML LLMOps Database"
  ogDescription: "Slack's Security Engineering team developed an AI agent system to automate the investigation of security alerts from their event ingestion pipeline that handles billions of events daily. The solution evolved from a single-prompt prototype to a multi-agent architecture with specialized personas (Director, domain Experts, and a Critic) that work together through structured output tasks to investigate security incidents. The system uses a \"knowledge pyramid\" approach where information flows upward from token-intensive data gathering to high-level decision making, allowing strategic use of different model tiers. Results include transformed on-call workflows from manual evidence gathering to supervision of agent teams, interactive verifiable reports, and emergent discovery capabilities where agents spontaneously identified security issues beyond the original alert scope, such as discovering credential exposures during unrelated investigations."
---

## Overview

Slack's Security Engineering team has built and deployed a sophisticated multi-agent LLM system designed to automate security investigation workflows. The team is responsible for protecting Slack's core infrastructure and services, processing billions of security events per day from diverse data sources. Their primary on-call responsibility involves reviewing alerts from their security detection system, which previously required significant manual effort to investigate. This case study provides detailed insight into their journey from initial prototype to production deployment, including architectural decisions, agent design patterns, and operational considerations for running LLMs in a high-stakes security environment.

## Problem Context and Initial Prototype

The security team faced a scaling challenge: with billions of daily security events and numerous alerts requiring investigation, manual triage and investigation became a bottleneck during on-call shifts. Each investigation required cross-referencing multiple data sources, understanding complex technical contexts, and making informed decisions about alert severity and required responses.

In May 2025, the team developed a rudimentary prototype that was essentially a 300-word prompt structured into five sections: Orientation (defining the AI's role as a security analyst), Manifest (listing available data sources), Methodology (investigation steps to follow), Formatting (report structure), and Classification (response categories). This prototype was implemented using a simple stdio-mode MCP (Model Context Protocol) server to safely expose a subset of their data sources through the tool call interface, with a repurposed coding agent CLI serving as the execution environment.

The prototype showed promise but suffered from high variability in performance. While it occasionally produced excellent, insightful results with impressive cross-referencing capabilities across data sources, it would sometimes jump to spurious conclusions without adequately questioning its own methods. The team recognized that prompts alone were insufficient guidelines for achieving the consistent, fine-grained control necessary for production use in a security context where reliability is paramount.

## Evolution to Multi-Agent Architecture

The breakthrough came when the team moved away from trying to accomplish everything in a single complex prompt and instead decomposed the investigation process into a sequence of discrete model invocations, each with a single, well-defined purpose and structured output format. This architectural decision was influenced by two academic papers: "Meta-Prompting: Enhancing Language Models with Task-Agnostic Scaffolding" from Stanford and OpenAI, and "Unleashing the Emergent Cognitive Synergy in Large Language Models" from Microsoft Research. While these papers described multi-persona approaches within single model invocations, Slack's team adapted this concept to use independent model invocations for each persona to maintain greater control.

The team also drew inspiration from security tabletop exercises, adapting their conventions to the application design. The resulting architecture features three categories of personas, each implemented as separate agent/task pairs with carefully defined structured outputs:

**Director Agent**: This agent serves as the Investigation Director, responsible for progressing the investigation from start to finish. The Director interrogates domain experts by formulating questions that become the experts' prompts. It uses a journaling tool for planning and organizing the investigation as it proceeds. The Director makes strategic decisions about which phase of investigation to pursue and which experts to consult.

**Expert Agents**: These are domain specialists, each with unique domain knowledge and access to specific data sources. Currently, the system includes four experts: Access (authentication, authorization, perimeter services), Cloud (infrastructure, compute, orchestration, networking), Code (source code analysis and configuration management), and Threat (threat analysis and intelligence). The experts' responsibility is to produce findings from their data sources in response to the Director's questions. Because experts work with complex data sources requiring many tool calls, they operate at the most token-intensive layer of the system.

**Critic Agent**: This "meta-expert" agent assesses and quantifies the quality of findings produced by domain experts using a defined rubric. The Critic annotates expert findings with its own analysis and assigns credibility scores to each finding. These annotated conclusions are passed back to the Director, closing the investigation loop. The weakly adversarial relationship between the Critic and the expert group helps mitigate hallucinations and variability in evidence interpretation. The Critic also inspects the tool calls and tool results used by experts to support their claims, adding another layer of verification.

## Structured Outputs and Control

A key technical decision was the adoption of structured outputs for each agent/task pair. Structured output is a feature that restricts a model to using a specific output format defined by a JSON schema, applied to the last output from the model invocation. This approach provides much more predictable behavior than prompt-based guidance. For example, where the initial prototype included vague guidance to "question your evidence" with mixed success, the structured output approach made this a separate, explicit task in the investigation flow with defined output requirements.

The team notes that structured outputs aren't "free" from an LLMOps perspective—if the output format is too complicated for the model, execution can fail. Structured outputs are also still subject to issues like cheating and hallucination, requiring careful schema design and validation. However, the tradeoff provided significantly more precise control at each step of the investigation process, which was essential for consistent production performance.

## Knowledge Pyramid Architecture

One of the most sophisticated aspects of Slack's LLMOps implementation is the "knowledge pyramid" design, which strategically manages token consumption and model selection across the agent hierarchy. At the bottom of the pyramid, domain experts generate investigation findings by interrogating complex data sources, requiring many tool calls and very token-intensive analysis of returned data. The Critic operates at the middle layer, reviewing expert findings by inspecting their claims, tool calls, and tool results—also incurring significant token overhead. However, the Critic then assembles a condensed investigation timeline that integrates only the most credible findings into a coherent narrative.

This condensed timeline is passed to the Director at the top of the pyramid, allowing the Director to work with highly distilled information rather than raw data. This architecture enables strategic use of different model tiers: lower-cost models for experts, medium-cost models for the Critic, and higher-cost, more capable models for the Director function. This is a sophisticated example of cost optimization in production LLM systems, matching model capability and cost to task requirements rather than using one-size-fits-all approaches.

## Investigation Flow and Phased Approach

The investigation process is broken into several phases, allowing the system to vary the structure of the investigation loop as proceedings advance. The Director persona is responsible for determining when to advance phases, and the system currently implements three phases (with the flexibility to add more):

**Discovery Phase**: Every investigation begins here. The goal is to ensure comprehensive coverage—every available data source is examined. The Director reviews the investigation state and generates questions that are broadcast to the entire expert team. This ensures no relevant information source is overlooked in the initial assessment.

**Director Decision**: This "meta-phase" occurs between other phases, where the Director decides whether to advance to the next investigation phase or continue in the current one. The task's prompt includes advice on when to advance, providing guardrails while still allowing model judgment.

**Trace Phase**: Once discovery has identified which experts can produce relevant findings, the Director transitions to trace mode. Here, the Director selects specific experts to question rather than broadcasting to all, allowing for deeper, focused investigation. The system also has flexibility to vary model invocation parameters by phase, potentially using different models or enhanced token budgets for certain phases.

**Conclude Phase**: When sufficient information has been gathered, the Director transitions to this final phase to produce the comprehensive investigation report.

This phased approach represents sophisticated orchestration logic in the application layer, demonstrating that effective LLMOps often requires careful coordination between model capabilities and traditional software engineering practices.

## Service Architecture for Production

Moving from prototype to production required building proper infrastructure. The team created a service architecture with three main components:

**Hub**: Provides the service API and interface to persistent storage. Beyond standard CRUD operations, the hub offers a metrics endpoint for visualizing system activity, token usage, and cost management. This observability is crucial for operating LLMs in production.

**Worker**: Investigation workers pull queued investigation tasks from the API. Investigations produce event streams that are streamed back to the hub through the API. Workers can be scaled horizontally to increase throughput as needed, providing operational flexibility.

**Dashboard**: A web-based interface for staff to interact with the service. Users can observe running investigations in real-time by consuming the event stream from the hub. The dashboard also provides management tools for viewing details of each model invocation, which the team describes as "invaluable when debugging the system." This emphasis on observability and debugging tools reflects mature LLMOps practices.

The architecture also supports integration with existing detection tools, allowing investigations to be triggered automatically, and provides capabilities for ad-hoc investigation launches. The ability to view and share past investigations supports organizational learning and review processes.

## Production Performance and Emergent Behavior

The case study includes a compelling example of emergent behavior that demonstrates both the system's capabilities and the challenges of operating LLMs in production. In one investigation, an alert was raised for a specific command sequence (a potential indicator of compromise). During the investigation, the agents independently discovered a separate credential exposure elsewhere in the process ancestry—an issue not directly related to the original alert.

Notably, the domain expert agent did not initially flag the credential exposure in its findings. Instead, the Critic agent noticed it during meta-analysis of the expert's work. The Director then pivoted the investigation to focus on this newly discovered issue. The final report highlighted both the need to mitigate the security issue and identified that the expert had failed to properly assess the risk, suggesting internal system improvement opportunities. This example demonstrates several important LLMOps considerations: the value of multi-agent verification, the potential for models to make "spontaneous and unprompted discoveries," and the continued need for human review and system refinement.

The team reports that this type of serendipitous discovery occurs regularly, with agents identifying weaknesses in IAM policies, problematic code, and other issues beyond the original investigation scope. This emergent behavior represents both a valuable capability and a challenge for evaluation—how do you systematically test for and measure unpredictable but valuable discoveries?

## Operational Impact and Human-in-the-Loop

The system has transformed the on-call workflow from engineers manually gathering evidence to supervising investigation teams. The reports generated are interactive and verifiable, showing how evidence was collected, interpreted, and judged—providing crucial transparency and auditability for security decisions. This shift represents a meaningful change in how security engineers spend their time, moving from low-level data gathering to higher-level analysis and decision-making.

The team acknowledges they are "still at an early phase" of their journey and plans to share more details in future posts, including topics like maintaining alignment during multi-persona investigations, using artifacts as communication channels between investigation participants, and human-agent collaboration patterns. This suggests ongoing iteration and refinement, which is characteristic of mature LLMOps practices where systems are continuously improved based on operational experience.

## Critical LLMOps Considerations and Balanced Assessment

This case study provides several valuable insights for LLMOps practitioners, while also raising important considerations:

**Strengths of the Approach**: The multi-agent architecture with structured outputs provides much greater control than single-prompt approaches. The knowledge pyramid design demonstrates sophisticated thinking about token economics and model selection. The phased investigation approach with clear transitions shows effective orchestration. The emphasis on observability, with real-time monitoring and detailed logging of model invocations, reflects mature operational practices. The adversarial Critic agent helps mitigate hallucinations and improves reliability.

**Challenges and Open Questions**: The case study is presented by Slack's engineering team, so naturally emphasizes successes. Important questions remain about failure modes: How often do investigations fail to reach useful conclusions? What happens when agents get stuck in loops or pursue unproductive paths? How is the system's performance formally evaluated? The example of the expert missing a credential exposure that the Critic caught is presented positively, but also suggests reliability concerns—what percentage of expert findings contain errors? The system's ability to make spontaneous discoveries is valuable but makes systematic evaluation challenging. How do you measure completeness and accuracy when the ground truth is not fully known in advance?

**Cost Considerations**: While the knowledge pyramid design optimizes token usage, the system still involves multiple model invocations with significant context for each investigation. Operating costs for processing billions of daily security events through this system could be substantial, though the case study doesn't provide specific metrics on cost per investigation or ROI calculations.

**Integration and Change Management**: The shift from manual investigation to supervising AI agents represents significant workflow change for security engineers. The success of such systems depends not just on technical performance but on user acceptance, trust-building, and effective handoff protocols between AI and human decision-makers.

**Structured Output Limitations**: The team's candid acknowledgment that structured outputs can fail if schemas are too complex, and remain subject to hallucinations, highlights that even sophisticated prompting and output control techniques don't eliminate fundamental LLM reliability challenges.

Overall, this case study represents a thoughtful, sophisticated application of LLMs to a production security use case, with clear attention to orchestration, cost optimization, observability, and verification. The multi-agent architecture with distinct roles and structured outputs demonstrates effective patterns for managing LLM complexity in high-stakes environments. However, the lack of quantitative performance metrics, failure mode analysis, and cost data means practitioners should view this as an architectural reference rather than validated proof of effectiveness. The team's acknowledgment that they're in early phases and continuing to refine the system suggests appropriate caution about declaring victory while still demonstrating meaningful progress in applying LLMs to real operational challenges.