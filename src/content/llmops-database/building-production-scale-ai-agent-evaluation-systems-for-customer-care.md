---
title: "Building Production-Scale AI Agent Evaluation Systems for Customer Care"
slug: "building-production-scale-ai-agent-evaluation-systems-for-customer-care"
draft: false
llmopsTags:
  - "customer-support"
  - "multi-modality"
  - "high-stakes-application"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "mcp"
  - "rag"
  - "fine-tuning"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "evals"
  - "langchain"
  - "llama-index"
  - "monitoring"
  - "documentation"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Lyft"
summary: "Lyft's data science and machine learning team developed a comprehensive evaluation system for their AI Assist customer care agents that handle 270,000 AI interactions monthly across rider and driver support scenarios. The problem was scaling multiple AI agents in production without rigorous evaluation frameworks, which initially led to a 90% offline pass rate that didn't translate to production performance. Their solution involved building an offline evaluation simulator using LangGraph and LangSmith with task-specific LLM judges, rubric-based evaluation criteria, and continuous monitoring pipelines. This approach enabled them to ship seven production AI agents with a 65% deflection rate and 35% resolution rate while maintaining high quality standards, with resolution rates climbing from 10% to 35% since starting the journey in 2024."
link: "https://www.youtube.com/watch?v=UVeeNW_z068"
year: 2024
seo:
  title: "Lyft: Building Production-Scale AI Agent Evaluation Systems for Customer Care - ZenML LLMOps Database"
  description: "Lyft's data science and machine learning team developed a comprehensive evaluation system for their AI Assist customer care agents that handle 270,000 AI interactions monthly across rider and driver support scenarios. The problem was scaling multiple AI agents in production without rigorous evaluation frameworks, which initially led to a 90% offline pass rate that didn't translate to production performance. Their solution involved building an offline evaluation simulator using LangGraph and LangSmith with task-specific LLM judges, rubric-based evaluation criteria, and continuous monitoring pipelines. This approach enabled them to ship seven production AI agents with a 65% deflection rate and 35% resolution rate while maintaining high quality standards, with resolution rates climbing from 10% to 35% since starting the journey in 2024."
  canonical: "https://www.zenml.io/llmops-database/building-production-scale-ai-agent-evaluation-systems-for-customer-care"
  ogTitle: "Lyft: Building Production-Scale AI Agent Evaluation Systems for Customer Care - ZenML LLMOps Database"
  ogDescription: "Lyft's data science and machine learning team developed a comprehensive evaluation system for their AI Assist customer care agents that handle 270,000 AI interactions monthly across rider and driver support scenarios. The problem was scaling multiple AI agents in production without rigorous evaluation frameworks, which initially led to a 90% offline pass rate that didn't translate to production performance. Their solution involved building an offline evaluation simulator using LangGraph and LangSmith with task-specific LLM judges, rubric-based evaluation criteria, and continuous monitoring pipelines. This approach enabled them to ship seven production AI agents with a 65% deflection rate and 35% resolution rate while maintaining high quality standards, with resolution rates climbing from 10% to 35% since starting the journey in 2024."
notion:
  pageId: "384f8dff-2538-80e2-a058-cb45351a92b6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-19T09:18:00.000Z"
  lastEditedTime: "2026-06-19T09:18:00.000Z"
  publishedAt: "2026-06-19T11:08:05Z"
---

## Overview

Lyft's AI Assist represents a mature production deployment of multiple AI agents handling customer care at significant scale. The platform serves approximately 270,000 AI interactions per month supporting 79 million trips monthly. The data science and machine learning team responsible for safety and customer care has built seven distinct AI agents deployed in production, focusing not just on deflection but on genuine end-to-end issue resolution. The team maintains a strict definition of success, aiming for a 35% AI resolution rate where issues are fully resolved rather than simply blocking customers from reaching human support. This case study focuses primarily on how Lyft built and operates their evaluation infrastructure to enable scaling these agents reliably in production.

The journey began in 2024 with deterministic logic-based chatbots, but the introduction of LLMs fundamentally transformed their capabilities. The evolution from simple rule-based systems to sophisticated LLM-powered agents was enabled by developing rigorous evaluation frameworks. Without this evaluation infrastructure, the team acknowledges they would not have been able to ship the volume and complexity of agents they currently operate. The presentation candidly addresses the common practice of shipping agents without proper evaluation, with the speaker admitting to being "literally guilty" of this himself, emphasizing that evaluation is something teams "always forget about, but really shouldn't."

## Agent Use Cases and Complexity

The AI agents deployed span both rider and driver-facing scenarios. On the rider side, agents handle charge disputes and unpleasant experience reports, such as when drivers smoke in vehicles. On the driver side, agents process damage claims, handle compliance status inquiries, and manage tax-related issues. Two particularly complex agents demonstrate the technical sophistication achieved:

A multi-modal driver-side agent processes damage claim photos uploaded by drivers and returns claim decisions within approximately 15 minutes. This agent demonstrates integration of vision capabilities with decision-making workflows.

A rider-side agent implements over 80 automation rules and refund logic in the backend, contextually explaining refund decisions based on rider situations and inputs. This agent showcases complex rule processing combined with natural language generation to provide personalized explanations.

The complexity of these agents, particularly the contextual reasoning required to apply numerous business rules while maintaining conversational quality, underscores why robust evaluation became critical for the team.

## Technical Architecture Foundation

The core architecture leverages LangChain for orchestration, LangGraph for agent workflow management, and LangSmith for observability and evaluation. The system also incorporates Model Context Protocol servers for integrating external data and services. While the presentation focuses primarily on evaluation rather than the agent architecture itself, this stack provides the foundation enabling both the agents and their evaluation pipelines.

## Evaluation Philosophy and ML Engineering Parallels

The team's approach to AI agent evaluation draws heavily from traditional machine learning engineering practices. The speaker, having spent their entire career in data science and machine learning, applies the same rigor to AI agent evaluation as to classical ML model development. In traditional ML workflows, practitioners develop models in notebooks, train on large datasets with ground truth labels, run offline evaluations, and use these results as quality gates before deployment. The team argues this approach should transfer to AI engineering rather than treating agent deployment differently.

The offline evaluation serves explicitly as a quality gate preventing the use of actual users as test data. While this might be acceptable for startups with minimal customer bases, at Lyft's scale this approach would be unacceptable. Once agents reach production, continuous monitoring and online evaluation complement the offline processes, incorporating LangSmith traces and human-in-the-loop feedback to drive ongoing improvements.

## Offline Evaluation Pipeline Architecture

The offline evaluation system represents the core innovation enabling Lyft's agent scaling. Taking inspiration from Tau Bench, a public benchmark published by Sierra AI that major LLM labs use for evaluation, Lyft built a lightweight simulator for generating synthetic interaction trajectories. The architecture consists of two primary components: the actual LangGraph agent being evaluated and an LLM user that role-plays customer behavior.

The simulator operates through a configuration-driven approach using YAML files specifying user intents, support scenarios, and mocked state of the world. In offline environments, the system doesn't make actual network calls to MCP servers; instead, MCP outputs are mocked based on configuration file values. When an agent calls a tool during offline evaluation, the system returns predefined mock responses from the configuration.

This configuration-based approach generates permutations across different combinations of variables including state of the world, user intent, and user persona. The goal is creating a diverse dataset approximating production data distribution, ensuring offline evaluation serves as a reliable proxy for production performance. The critical insight here is that offline evaluation quality directly determines its predictive value for production behavior.

## Evaluation Methods and LLM Judges

For evaluating the generated trajectories, Lyft employs two primary approaches: LLM-as-judge and code assertions. Code assertions involve simple Python scripts checking the end state of the world to determine whether specific success or failure conditions are met. LLM judges, however, required more sophisticated development.

The team initially experimented with generic pre-built LLM judges common in observability platforms, including metrics like toxicity scores, response helpfulness, conversation conciseness, tone appropriateness, and naturalness. These typically produce scalar metrics on a zero-to-one scale. However, the team found critical limitations with this approach: a helpfulness score of 0.4 versus 0.7 provides no actionable insight. What does the difference mean? How should teams improve their agents based on these numbers? What product insights do they provide?

Lyft developed a strongly opinionated stance on LLM judge design: judges should be framed around specific tasks the AI agent must perform. Each task should have clearly defined success and failure criteria. Rather than generic helpfulness scores, they created task-specific evaluation rubrics.

One example provided is an "educational rubric break" where the agent must educate users about Lyft policies regarding rider charges or other support scenarios. By defining precise success criteria through rubrics, when interactions fail evaluation, the team can quickly identify common failure modes. This transforms evaluation from opaque numerical scores into actionable product insights. Engineering teams can then respond with specific interventions: tweaking prompts, modifying tools, adjusting control flow logic, and iterating to verify improvements.

## Building Trust in LLM Judges

A significant challenge the team confronted was establishing trust in LLM judges themselves. Simply defining rubrics and prompts doesn't guarantee the judge performs correctly. The team's approach treats LLM judge development as analogous to training traditional machine learning models. They collect human-labeled ground truth from domain experts who score interactions based on defined rubrics. Through an iterative loop of adjusting prompts and reasoning approaches, they measure agreement between LLM judge outputs and human judgments. Once alignment reaches acceptable levels, the team gains confidence the LLM judge reflects human expert evaluation.

This approach represents a pragmatic middle ground between fully automated evaluation and pure human judgment. It requires upfront investment in collecting expert labels and tuning judge prompts, but yields scalable evaluation infrastructure aligned with human quality standards.

## Simulator Realism and User Verbatim Challenges

A critical lesson emerged from the disconnect between simulator behavior and actual production usage patterns. When using off-the-shelf Claude or OpenAI models to simulate users, the LLMs behaved as "nice, helpful assistants," explaining issues clearly and politely to the AI agent. The first agent tested achieved a 90% pass rate in offline evaluation, suggesting readiness for production launch.

Production deployment delivered a "rude awakening." Real users rarely behave like helpful LLM assistants. Production verbatim data typically consists of one or two-word messages from impatient users who don't carefully explain their situations. This represents a fundamental distribution shift between evaluation and production data that severely undermined the predictive value of offline testing.

The team is actively addressing this through two approaches. First, they are exploring fine-tuning custom LLM user simulators on real-world Lyft user verbatim data, training models to communicate like actual Lyft customers rather than polite assistants. This technique is grounded in recent research, including work from Microsoft on training LLM users with real conversational data. While this approach may reduce benchmark pass rates, it creates more realistic evaluation conditions that better predict production performance.

Second, the team collaborates with UX researchers to define clear user personas capturing behavioral patterns of different customer segments. These personas ground the LLM user models, making their behavior more representative of actual Lyft customer interactions.

## LangSmith Integration for Evaluation Workflow

LangSmith serves as the operational backbone for managing Lyft's evaluation workflows, providing several critical capabilities:

Tracing functionality captures detailed trajectories from both offline simulations and online production runs. These traces serve multiple purposes: they provide training data for future model development and offer an interface for operations teams performing manual annotation. The ability to inspect full interaction trajectories proves essential for debugging agent behavior and understanding failure modes.

The evaluator setup in LangSmith hosts the LLM judges used for both offline simulation and production monitoring. Having consistent evaluation logic across offline testing and production creates continuity in quality metrics and enables direct comparison between environments.

Automation capabilities enable workflow orchestration, particularly for handling failed interactions. When traces fail LLM judge criteria, automations route them to annotation queues where operations teams manually label examples. Engineers then analyze these labeled failure cases to identify systematic problems informing agent improvements. This creates a continuous feedback loop from production failures back to agent development.

The annotation queue functionality deserves particular emphasis as it bridges automated evaluation and human judgment. By automatically filtering to cases failing automated checks, the system focuses human attention on the most problematic interactions where deeper analysis provides maximum value.

## Evaluation Harness and Agent Harness Concepts

The presentation distinguishes between agent harness and evaluation harness as complementary infrastructure components. The agent harness encompasses everything surrounding the core LLM model: the RAG pipeline, tool definitions, graph structure, system prompts, and control flow logic. Much of Lyft's engineering effort focused on agent harness optimization, managing context, and orchestrating model interactions.

The evaluation harness, by contrast, manages evaluation execution itself. While Lyft initially ran their offline simulator as lightweight scripts, they recognize value in developing more structured evaluation harness infrastructure. An evaluation harness provides systematic management of evaluation runs, version control for evaluation configurations, comparison across evaluation iterations, and potentially parallelization of evaluation workloads.

This conceptual separation reflects maturation in how the team thinks about their infrastructure, moving from ad-hoc evaluation scripts toward more systematic evaluation engineering.

## Future Directions and Model Training

Looking forward, the team identifies model training as a significant frontier they haven't yet extensively pursued. To date, their traces and evaluation data primarily fed product insights driving harness improvements rather than updating model weights through fine-tuning or continued pre-training. Training a custom LLM specifically for AI Assist represents an active area of investigation that would "close the loop" on their evaluation pipeline.

The rationale for custom model training connects to their broader evaluation learnings: just as using generic LLM users created distribution mismatch with production data, using generic foundation models may miss opportunities for specialization to Lyft's specific customer care domain, user population, and support workflows. Custom training could encode domain knowledge, align with Lyft-specific conversational patterns, and optimize for the particular tasks their agents must perform.

This future direction also reflects confidence in their evaluation infrastructure. Training custom models requires robust evaluation to measure whether training improves performance on relevant metrics. Having invested in comprehensive evaluation capabilities, the team now has the foundation to rigorously assess custom model development efforts.

## Critical Assessment and Balanced Perspective

While this case study presents an impressive evaluation infrastructure, several considerations warrant balanced assessment:

The presentation primarily comes from the team building the system, so reported metrics like 65% deflection rate and 35% resolution rate should be understood as self-reported figures. The team does maintain a commendably strict definition of resolution requiring full issue resolution rather than just deflection, lending credibility to their metrics.

The acknowledgment that their first agent showed 90% offline success but struggled in production demonstrates appropriate transparency about failure modes and learning processes. This honesty about mistakes is more credible than claiming flawless execution.

The ongoing challenges with simulator realism highlight a fundamental limitation of offline evaluation: it requires approximating production distributions, and getting this approximation right proves difficult. Even with sophisticated simulation approaches, distribution shift between evaluation and production remains a risk requiring continuous monitoring and calibration.

The reliance on LLM-as-judge introduces its own evaluation challenge: how do you evaluate your evaluators? The team's approach of comparing judge outputs against human expert labels provides one answer, but this requires ongoing investment in collecting human labels and monitoring judge-human agreement over time as agents and customer interactions evolve.

The emphasis on task-specific rubrics rather than generic metrics represents a thoughtful maturation in evaluation thinking, but also increases evaluation development costs. Each new task or agent capability potentially requires custom rubric development and judge tuning. This doesn't scale as easily as applying generic pre-built evaluators, though the team argues the actionability justifies the investment.

The technical stack relying heavily on LangChain, LangGraph, and LangSmith creates ecosystem dependencies. While these tools clearly provide value for Lyft's use case, organizations should consider vendor lock-in and ecosystem maturity when adopting similar approaches.

## LLMOps Maturity Indicators

This case study demonstrates several indicators of production LLMOps maturity. The team treats evaluation as essential infrastructure rather than an afterthought, investing significantly in evaluation tooling before scaling agent deployment. The parallel between traditional ML engineering practices and AI agent development reflects disciplined engineering culture translating established practices to new domains rather than treating LLMs as requiring entirely novel approaches.

The separation of offline evaluation as a quality gate from online monitoring for continuous improvement shows understanding of different evaluation needs across the development lifecycle. The automation of failure analysis pipelines, routing failed interactions to human review, represents operationalization of the evaluation feedback loop rather than manual ad-hoc analysis.

The team's roadmap progression from deterministic logic to LLM agents, from generic to task-specific evaluation, and toward custom model training reflects systematic capability building rather than chasing trends. Each phase builds on lessons from previous phases, with evaluation infrastructure enabling each subsequent advance.

The transparency about shipping agents without evaluation initially, the production failures from simulator-reality mismatch, and the ongoing work to improve user simulation demonstrates a learning organization comfortable discussing mistakes while continuously improving their practices. This cultural aspect often proves as important as technical infrastructure for successful LLMOps.

Overall, Lyft's AI Assist evaluation infrastructure represents a comprehensive approach to production AI agent quality management, adapting traditional ML engineering discipline to conversational AI challenges while maintaining the pragmatism to acknowledge limitations and iterate toward better solutions.
