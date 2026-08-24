---
title: "Agentic AI for Healthcare Insurance Claims Processing with X12 Harness"
slug: "agentic-ai-for-healthcare-insurance-claims-processing-with-x12-harness"
draft: false
llmopsTags:
  - "healthcare"
  - "classification"
  - "document-processing"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "memory"
  - "prompt-engineering"
  - "error-handling"
  - "cost-optimization"
  - "evals"
  - "databases"
  - "guardrails"
  - "documentation"
  - "anthropic"
industryTags: "healthcare"
company: "Onlay"
summary: "Onlay has developed an agentic AI system to automate healthcare insurance claims processing workflows, addressing the complex multi-step patient journey from eligibility verification through to payment. The solution employs an execution layer that enables LLM agents to take actions across multiple systems including database queries, phone calls, web portals, EHRs, and desktop interfaces, while grounding all operations in the X12 EDI standard to ensure structured, verifiable transactions. By combining multimodal processing capabilities with memory systems at the partner, organization, and user levels, and implementing strict guardrails through X12 validation, the system aims to reduce insurance interaction costs and improve patient experience while maintaining safety and reliability in production healthcare environments."
link: "https://www.youtube.com/watch?v=UyyOoJmuATU"
year: 2026
seo:
  title: "Onlay: Agentic AI for Healthcare Insurance Claims Processing with X12 Harness - ZenML LLMOps Database"
  description: "Onlay has developed an agentic AI system to automate healthcare insurance claims processing workflows, addressing the complex multi-step patient journey from eligibility verification through to payment. The solution employs an execution layer that enables LLM agents to take actions across multiple systems including database queries, phone calls, web portals, EHRs, and desktop interfaces, while grounding all operations in the X12 EDI standard to ensure structured, verifiable transactions. By combining multimodal processing capabilities with memory systems at the partner, organization, and user levels, and implementing strict guardrails through X12 validation, the system aims to reduce insurance interaction costs and improve patient experience while maintaining safety and reliability in production healthcare environments."
  canonical: "https://www.zenml.io/llmops-database/agentic-ai-for-healthcare-insurance-claims-processing-with-x12-harness"
  ogTitle: "Onlay: Agentic AI for Healthcare Insurance Claims Processing with X12 Harness - ZenML LLMOps Database"
  ogDescription: "Onlay has developed an agentic AI system to automate healthcare insurance claims processing workflows, addressing the complex multi-step patient journey from eligibility verification through to payment. The solution employs an execution layer that enables LLM agents to take actions across multiple systems including database queries, phone calls, web portals, EHRs, and desktop interfaces, while grounding all operations in the X12 EDI standard to ensure structured, verifiable transactions. By combining multimodal processing capabilities with memory systems at the partner, organization, and user levels, and implementing strict guardrails through X12 validation, the system aims to reduce insurance interaction costs and improve patient experience while maintaining safety and reliability in production healthcare environments."
notion:
  pageId: "3c6f8dff-2538-8074-b0b5-d8ef967c7be3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T09:11:00.000Z"
  lastEditedTime: "2026-08-24T09:11:00.000Z"
  publishedAt: "2026-08-24T09:15:50Z"
---

## Overview

Onlay has built a sophisticated agentic AI system specifically designed to handle the complex workflow of healthcare insurance claims processing. The presentation provides insights into how they've approached production deployment of LLM-based agents in a highly regulated, high-stakes environment where errors can have significant financial and patient care implications. The speaker, presenting at what appears to be a healthcare technology conference with an audience that includes both healthcare professionals and technical practitioners actively running AI models in production, emphasizes two fundamental goals: driving down insurance interaction costs and improving patient experience.

The system represents an evolution toward what they call an "agentic execution layer," where models don't just reason and generate text but actively take actions across multiple systems. This positions the work at the frontier of LLMOps challenges, particularly around reliability, safety, and operational constraints in healthcare settings.

## The Agentic Execution Layer Architecture

At the core of Onlay's approach is an agentic execution layer that gives LLM agents the ability to perform actions rather than just provide information. The system supports a wide range of action types including database queries with schema discovery, code querying and analysis, making insurance transactions, initiating phone calls, interacting with web portals, interfacing with electronic health records, and controlling desktop interfaces through multimodal vision capabilities.

This execution layer is distinguished by its write capabilities, meaning the agent can actually modify state in various systems rather than just reading information. When interfacing with practice management systems or using desktop automation, the system creates user logs at minimum, and in many cases makes actual transactional changes. This creates significant LLMOps challenges around testing, validation, and rollback capabilities.

The memory architecture is a critical component of the agentic system. Unlike consumer-facing coding assistants like Claude Code or GitHub Copilux that write to local desktop memory, Onlay implements memory in a database to maintain logical separation appropriate for enterprise healthcare environments. The memory system operates at three levels: partner-level memory capturing organizational patterns, organizational memory for specific healthcare entities, and user-level memory that learns individual user patterns and preferences.

## The X12 Harness Concept

A distinctive aspect of Onlay's LLMOps approach is what they term the "X12 harness." X12 is the Electronic Data Interchange standard used throughout the healthcare insurance industry to structure communications between providers and payers. The speaker argues that LLMs actually thrive when confined to structured formats with clear, limited values they can predict, and X12 provides exactly this kind of constraint.

Every interaction in the insurance claims lifecycle has a corresponding X12 transaction type: eligibility requests are 270 transactions, claim submissions follow specific formats, claim status inquiries have their own structure, and so forth through the entire workflow from patient scheduling through final payment deposit. By grounding the agentic reasoning in X12 standards, the system creates a contract between what it's trying to communicate and what insurance companies expect to receive.

The X12 harness serves multiple LLMOps purposes. First, it provides validation and rejection capabilities at each step. When the agent reasons through a multi-step workflow that might involve 50 different operations, each with multimodal context and potential for error propagation, having strict X12 guardrails allows immediate rejection of malformed or incorrect outputs. This prevents error cascading through the system.

Second, X12 provides a public, standardized schema. Unlike custom schemas that agents might hallucinate or that require extensive documentation for human engineers, X12 transactions are publicly documented industry standards. This dramatically simplifies both the agent's task and the onboarding of new human engineers who can reference these standards rather than learning proprietary formats.

Third, the X12 grounding addresses the concept of "multimodal boiling down." In complex workflows, there's a temptation to extract findings from images or documents at early stages to reduce costs and complexity in downstream processing. However, this can lose context that might be relevant to procedures or decisions that weren't anticipated by the upstream extraction model. By maintaining X12 structure throughout, the system preserves the relationships between different data modalities and workflow steps.

## Production Challenges and Tradeoffs

The presentation offers candid insights into the practical challenges of running agentic AI systems in production healthcare environments. A key challenge is the tension between pure agentic reasoning and hardcoded workflows. If every decision goes through a 50-step multimodal reasoning process, costs explode and latency becomes unacceptable for users. But if everything is hardcoded, the codebase becomes unmanageable and requires massive engineering teams to maintain.

Onlay's approach strikes a balance using their memory systems. By observing that users in multi-site health organizations tend to perform similar tasks day after day, the system can learn patterns and shortcuts. If a user mentions certain keywords and their history shows they typically perform eligibility checks in a particular context, the system can make informed assumptions about intent. However, this introduces bias concerns that represent a genuine LLMOps challenge. If the system steers a user toward repeating yesterday's action when they actually want to do something different, the personalization becomes a hindrance. The solution requires careful design to ensure users can always break out of assumed patterns.

Model versioning and upgrading presents another nuanced challenge highlighted in the talk. When new models are released with improved capabilities or more parameters, it's tempting to simply swap them in assuming better benchmark performance translates to better production performance. The speaker emphasizes this is a trap. A model that scores higher on standard evaluations may actually perform worse in the specific context of how the system has been designed. The tools, harness, memory systems, and validation logic are all tuned to particular model behaviors. Introducing a new model requires comprehensive re-evaluation and re-tuning of the entire system rather than a simple replacement.

The cost-effectiveness consideration runs throughout the LLMOps approach. Using overpowered, expensive models for routine operations that must be performed thousands of times daily creates economic challenges that could eliminate any cost savings from automation. The system must intelligently route different operations to appropriately-sized models based on complexity and risk.

## Multimodal Processing in Healthcare Context

The system handles multiple modalities essential to healthcare claims processing. Medical images like X-rays or CBCTs don't just contain anatomical information but serve as evidence for insurance claims. The presentation argues against premature reduction of images to extracted findings, as this can lose context relevant to downstream decisions about procedures or claims justification.

Desktop automation represents another multimodal challenge. Insurance portal interfaces, practice management systems, and other healthcare software sometimes have visual elements like buttons or layouts that are only interpretable through vision capabilities. The system apparently includes desktop use functionality to interact with these interfaces, which requires multimodal models that can understand visual interfaces and take actions based on visual context.

## Insurance Transaction Reliability and Ground Truth

A sophisticated aspect of the LLMOps approach involves recognizing that there is no single ground truth when dealing with insurance companies. Different communication channels with the same payer may provide contradictory information. The phone system, web portal, X12 API, and FHIR endpoint might all be operated by different teams or even different contracted companies, each with their own data sources and potential inconsistencies.

The system must handle scenarios where all channels agree but are collectively wrong. The example given is all systems reporting a patient as covered, leading to treatment, only for the subsequent claim to be denied because the patient wasn't actually covered during that timeframe. The LLMOps approach treats all information from insurance companies as provisional and creates internal X12 representations that are considered "correct until downstream evidence proves otherwise."

Over time, the system learns idiosyncrasies of different payers, discovering which systems tend to be more reliable than others. This learned knowledge becomes part of the operational intelligence that guides routing and validation decisions. This represents a form of continuous learning and adaptation that goes beyond static model deployment.

## The Full Claims Lifecycle Integration

The system addresses the complete patient journey from an insurance perspective. This begins even before the patient arrives for an appointment, with eligibility verification and prior authorization processes. During treatment, insurance considerations influence which procedures are candidates based on coverage. Documentation generation, including evidence like diagnostic images, feeds into claim preparation. The claim submission itself represents a sealed contract, essentially an invoice for services rendered. Post-submission involves status tracking, appeals processing if necessary, and ultimately payment reconciliation when funds arrive in the provider's bank account.

Each of these stages involves different systems, data formats, and LLM capabilities. The agentic execution layer must coordinate across all of them while maintaining the X12 grounding that provides structure and validation throughout.

## Evaluation and Skepticism Philosophy

The presentation concludes with a philosophy statement that's particularly relevant to LLMOps practice. While the speaker describes being "fully AI pilled" in terms of belief in the technology's potential, they strongly advocate for being "AI skeptical" in deployment. Language models make mistakes, but more accurately, system designers make mistakes in how they set up and deploy models. Models can be set up to fail through poor system design, inadequate validation, or mismatched expectations.

This skepticism manifests in conservative, incremental introduction of models appropriately sized to their tasks. Evaluation systems must be comprehensive, covering not just model accuracy but entire system behavior including tool use, memory retrieval, validation logic, and multi-step reasoning chains. The harness concept encompasses not just the technical infrastructure but the entire evaluation and testing framework that ensures safe production operation.

The presentation emphasizes that in healthcare specifically, where errors have serious consequences and costs compound quickly, this conservative approach is essential. The goal isn't to showcase the most advanced AI capabilities but to reliably reduce costs and improve patient experience through careful, validated deployment of appropriately-scoped AI agents operating within well-defined guardrails.
