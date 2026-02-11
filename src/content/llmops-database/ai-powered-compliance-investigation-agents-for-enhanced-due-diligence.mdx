---
title: "AI-Powered Compliance Investigation Agents for Enhanced Due Diligence"
slug: "ai-powered-compliance-investigation-agents-for-enhanced-due-diligence"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693fb69ea567fafde72af8b8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:36:46.053Z"
  createdOn: "2025-12-15T07:19:58.137Z"
llmopsTags:
  - "fraud-detection"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "document-processing"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "fine-tuning"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "few-shot"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "databases"
  - "amazon-aws"
  - "anthropic"
industryTags: "finance"
company: "Stripe"
summary: "Stripe developed an LLM-powered AI research agent system to address the scalability challenges of enhanced due diligence (EDD) compliance reviews in financial services. The manual review process was resource-intensive, with compliance analysts spending significant time navigating fragmented data sources across different jurisdictions rather than performing high-value analysis. Stripe built a React-based agent system using Amazon Bedrock that orchestrates autonomous investigations across multiple data sources, pre-fetches analysis before reviewers open cases, and provides comprehensive audit trails. The solution maintains human oversight for final decision-making while enabling agents to handle data gathering and initial research. This resulted in a 26% reduction in average handling time for compliance reviews, with agents achieving 96% helpfulness ratings from reviewers, allowing Stripe to scale compliance operations alongside explosive business growth without proportionally increasing headcount."
link: "https://www.youtube.com/watch?v=pq0_T9MFnDo"
year: 2025
seo:
  title: "Stripe: AI-Powered Compliance Investigation Agents for Enhanced Due Diligence - ZenML LLMOps Database"
  description: "Stripe developed an LLM-powered AI research agent system to address the scalability challenges of enhanced due diligence (EDD) compliance reviews in financial services. The manual review process was resource-intensive, with compliance analysts spending significant time navigating fragmented data sources across different jurisdictions rather than performing high-value analysis. Stripe built a React-based agent system using Amazon Bedrock that orchestrates autonomous investigations across multiple data sources, pre-fetches analysis before reviewers open cases, and provides comprehensive audit trails. The solution maintains human oversight for final decision-making while enabling agents to handle data gathering and initial research. This resulted in a 26% reduction in average handling time for compliance reviews, with agents achieving 96% helpfulness ratings from reviewers, allowing Stripe to scale compliance operations alongside explosive business growth without proportionally increasing headcount."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-compliance-investigation-agents-for-enhanced-due-diligence"
  ogTitle: "Stripe: AI-Powered Compliance Investigation Agents for Enhanced Due Diligence - ZenML LLMOps Database"
  ogDescription: "Stripe developed an LLM-powered AI research agent system to address the scalability challenges of enhanced due diligence (EDD) compliance reviews in financial services. The manual review process was resource-intensive, with compliance analysts spending significant time navigating fragmented data sources across different jurisdictions rather than performing high-value analysis. Stripe built a React-based agent system using Amazon Bedrock that orchestrates autonomous investigations across multiple data sources, pre-fetches analysis before reviewers open cases, and provides comprehensive audit trails. The solution maintains human oversight for final decision-making while enabling agents to handle data gathering and initial research. This resulted in a 26% reduction in average handling time for compliance reviews, with agents achieving 96% helpfulness ratings from reviewers, allowing Stripe to scale compliance operations alongside explosive business growth without proportionally increasing headcount."
---

## Overview

Stripe's compliance team faced a classic LLMOps challenge: how to deploy AI agents at scale in a highly regulated environment where accuracy, auditability, and human oversight are non-negotiable. This case study, presented by Hassan Tariq (AWS Principal Solutions Architect), Chrissy, and Christopher from Stripe, demonstrates a mature approach to building production agent systems that balance automation with regulatory requirements.

Stripe processes $1.4 trillion in payment volume annually (38% year-over-year growth, representing 1.38% of global GDP) and operates across 135+ currencies with 59s uptime. The company handles over 500 million requests per day. This massive scale requires compliance operations that can grow without becoming a bottleneck, particularly for enhanced due diligence (EDD) reviews mandated by financial crime regulations.

The business context is significant: enterprises globally spend approximately $206 billion annually on financial crime compliance operations, with North America alone accounting for $61 billion. Compliance demands are increasing by up to 35% year-over-year according to European compliance teams. Research from Experian suggests that up to one-third of compliance tasks could be automated, potentially returning 8-12 hours per week to compliance analysts for strategic work.

## The Compliance Challenge

Stripe's compliance operations encompass two critical dimensions: ecosystem integrity (KYC/KYB and AML to prevent platform abuse by bad actors) and user protection (GDPR privacy, UDAAP fairness). The enhanced due diligence review process was particularly problematic. Manual reviews required expert analysts to act as "navigators" rather than analysts, spending valuable time locating and gathering information across fragmented systems instead of making high-value risk assessments.

The scalability challenge was compounded by jurisdiction complexity. Analysts would switch between reviewing entities in California (relatively straightforward) to complex corporate structures in UAE or Singapore, each requiring completely different mindsets, risk thresholds, and regulatory frameworks. This constant context-switching created cognitive overload and introduced error risk. The definition of "safe business" and ownership transparency requirements vary dramatically across high-risk versus low-risk jurisdictions, forcing analysts to apply ever-shifting rule sets.

Simply scaling the workforce linearly with complexity was not viable from either a cost or speed perspective. Stripe needed a solution that could handle the heavy lifting of investigation while maintaining the quality bar required for regulatory compliance.

## Solution Architecture

Stripe built an LLM-powered autonomous investigation agent system with several key architectural decisions that reflect mature LLMOps thinking:

**React Agent Framework with Rails**: Rather than attempting full end-to-end automation (which Christopher describes as an unrealistic "fairytale"), Stripe decomposed the complex compliance workflow into a directed acyclic graph (DAG). This DAG provides "rails" for the agents, ensuring they spend appropriate time on regulatory-required investigation areas rather than rabbit-holing on irrelevant topics. The team discovered that breaking workflows into bite-sized tasks was essential for fitting work within the agent's working memory and making quality evaluation tractable.

The React (Reason + Act) agent pattern involves a thought-action-observation loop where the agent receives a query, thinks about approach, calls tools (actions), receives observations from those tools, and iterates until reaching a final answer. This pattern is particularly well-suited to compliance investigations where the agent may need multiple database queries or API calls to gather complete information. However, Christopher notes a practical constraint: the iterative loop creates quadratically growing prompt costs as context accumulates with each turn (1+2+3+4... tokens).

**Amazon Bedrock as LLM Provider**: Stripe chose Amazon Bedrock for several strategic reasons. First, it provides standardized privacy and security vetting across multiple model vendors—critical for a regulated financial services company. Rather than separately vetting each new LLM provider through security review, Stripe vets AWS once and gains access to multiple models through Bedrock's unified interface. Second, Bedrock offers prompt caching, which addresses the quadratic cost problem by avoiding re-reading accumulated context on each agent turn, converting the cost profile from quadratic to more linear. Third, Bedrock provides fine-tuning capabilities, which Stripe views as important not primarily for performance improvement but for controlling deprecation schedules—allowing them to focus on adding new capabilities rather than constantly updating prompts for vendor model deprecations.

**Internal LLM Proxy Service**: Stripe built an internal proxy service that sits between their applications and Bedrock. This proxy solves the "noisy neighbor" problem where one team's testing or scaling could crowd out bandwidth for production compliance workloads. The proxy enables bandwidth allocation, authorization controls, routing use cases to appropriate models based on sensitivity, and model fallback configuration if providers experience issues. This reflects a mature understanding that multi-tenant LLM infrastructure requires traffic management similar to traditional API gateway patterns.

**Custom Agent Service**: Perhaps most interesting from an infrastructure perspective, Stripe discovered they needed a completely separate agent service distinct from their traditional ML inference system. Traditional ML inference is compute-bound (waiting for GPU/CPU computation), has short consistent latencies, deterministic control flow, and expensive hardware that teams want to minimize. Agents are the opposite: network-bound (waiting for LLM API responses), require long timeouts (potentially 5-10 minutes for deep investigations), have non-deterministic control flow depending on what the agent discovers, and need many lightweight threads to handle concurrent waiting rather than expensive compute. The team stood up an initial monolithic agent service in approximately one month, demonstrating that specialized infrastructure doesn't require multi-quarter efforts.

The agent service evolved through several phases: Q1 saw the initial monolith with synchronous predict-style API; Q2 added evaluation capabilities, tracing for debugging, and a no-code UI for agent creation; Q3 addressed capacity limits by allowing each use case to spin up dedicated services (solving noisy neighbor at the agent service level); Q4 added stateful streaming APIs for chat-style interactions. Stripe now runs over 100 agents across the company, though Christopher notes with some skepticism that this might be high—suggesting most use cases could work with shallow React agents, deep React agents, and perhaps to-do list agents that spawn sub-agents, with the proliferation potentially reflecting prompts baked into specialized agents rather than true architectural diversity.

**Orchestration and Human-in-the-Loop Design**: The review tooling orchestrates the DAG workflow, triggering agents to pre-fetch research before reviewers even open cases. As reviewers progress and new context becomes available, the orchestration can trigger deeper investigations. Critically, humans remain in complete control—agents assist but reviewers make all final decisions. This design addresses both regulatory requirements and practical adoption challenges (if agents are only helpful 30-80% of the time, reviewers will stop using them and the system provides zero value despite its complexity).

**Tool Calling and Data Integration**: Christopher emphasizes that tool calling capability is the primary value proposition of agents for this use case. Agents can call internal Stripe compliance tooling, databases, APIs, and potentially MCP (Model Context Protocol) clients. The ability to dynamically fetch relevant information from the right sources based on investigation context is what makes agents superior to static LLM calls.

## LLMOps Operational Considerations

**Quality Assurance and Evaluation**: Stripe implements rigorous human-based QA despite the trend toward LLM-as-judge evaluation patterns. Given the regulatory sensitivity, the team insists that everything must pass human quality bars. While Christopher acknowledges LLM judges could potentially help fail obviously bad models quickly, humans remain essential for determining if quality is sufficient for production deployment. The team works closely with operations teams to understand what human reviewers struggle with, iterating prompts extensively to reach the 96% helpfulness threshold that drives actual adoption.

**Auditability and Compliance**: Every agent interaction produces complete audit trails showing what the agent found, how it found it, what tool calls it made, and what results those tools returned. This auditability is essential for regulatory review. The system records every decision and rationale as compliance-grade evidence.

**Cost Management**: Prompt caching emerged as critical for cost control given the quadratic token cost growth in iterative agent loops. The team actively monitors costs and makes architectural decisions (like fine-tuning for version control) with cost implications in mind.

**Telemetry and Monitoring**: The review tooling includes telemetry allowing reviewers to rate agent helpfulness. This feedback loop is essential for understanding whether the system provides value and where improvements are needed. The 96% helpfulness rating demonstrates successful alignment with user needs.

**Incremental Deployment**: Rather than attempting to automate entire reviews, Stripe started with specific questions that agents could reliably answer. They achieved initial production deployment by end of Q2, then scaled to more questions in Q3, and moved to more complex context-dependent investigations in Q4. This phased approach allowed them to prove value incrementally while building confidence with stakeholders.

## Results and Impact

The initial deployment achieved a 26% reduction in average handling time for compliance reviews, with reviewers rating the agent assistance as helpful 96% of the time. Importantly, Christopher emphasizes this is "just scratching the surface"—the 26% comes primarily from pre-fetching research on initial questions before reviews begin. As the orchestration deepens and agents leverage context developed during reviews, the team expects substantially larger efficiency gains.

These efficiency improvements allow Stripe to scale compliance operations alongside business growth (38% year-over-year) without proportionally scaling compliance headcount. The system also provides consistency—every case goes through the same rigorous investigation steps with no data sources missed.

The human-in-the-loop design means outcomes carry appropriate weight. Compliance analysts focus on the "why" (strategic analysis and judgment calls) while agents handle the "what and how" (data gathering, initial analysis, documentation). Analysts can now review more cases and focus on complex decision-making rather than information retrieval.

## Lessons Learned and Future Directions

The team identifies several key lessons learned that reflect mature LLMOps thinking:

**Don't automate everything immediately**: The natural instinct to have agents replace entire workflows is unrealistic. Incremental approaches using agents as tools for human experts are more tractable and provable.

**Task decomposition is critical**: Breaking complex workflows into bite-sized tasks that fit in agent working memory and are easy to evaluate is essential for moving beyond demos to production systems.

**Infrastructure matters**: Building specialized agent infrastructure distinct from ML inference systems was necessary. It doesn't have to take long—Stripe stood up initial capability in a month.

**Tool calling is the key value**: The ability to dynamically call appropriate tools based on investigation needs is what makes agents useful compared to static LLM interactions.

**Rails prevent wasted effort**: Without orchestration guardrails, agents will spend time on low-value activities and miss required investigation areas.

Future directions include expanding DAG orchestration to deeper parts of the review workflow, potentially implementing reinforcement learning (since answers are verifiable, enabling end-to-end training loops), fine-tuning for version control and deprecation management, and streamlining evaluation processes (while maintaining human oversight for production quality gates). The team believes the current 26% efficiency gain can grow substantially as they tackle more complex, context-dependent investigation tasks.

## Balanced Assessment

While the results are impressive, several aspects warrant balanced consideration. The 96% helpfulness rating is strong but comes after extensive prompt iteration and close collaboration with operations teams—this level of polish requires significant investment. The claim of standing up agent infrastructure in a month, while impressive, likely reflects Stripe's substantial engineering resources and may not generalize to smaller organizations. The proliferation to 100+ agents across Stripe might indicate some inefficiency, as Christopher himself suggests many use cases could likely share common agent patterns rather than requiring specialized implementations.

The reliance on human evaluation for quality gates, while appropriate for regulatory compliance, creates scalability challenges for the evaluation process itself as the number of questions and use cases grows. The future plans around reinforcement learning and LLM-based evaluation suggest the team recognizes these limitations.

The case study represents vendor content (AWS promoting Bedrock adoption) but the technical details appear credible and the challenges discussed are genuine issues in production agent deployment. The emphasis on human-in-the-loop design, audit trails, and incremental deployment reflects real-world regulatory constraints rather than pure marketing. Overall, this represents a mature, thoughtful approach to deploying LLM agents in a highly regulated production environment where mistakes carry significant consequences.