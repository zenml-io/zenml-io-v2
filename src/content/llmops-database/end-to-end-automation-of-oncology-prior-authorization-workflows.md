---
title: "End-to-End Automation of Oncology Prior Authorization Workflows"
slug: "end-to-end-automation-of-oncology-prior-authorization-workflows"
draft: false
llmopsTags:
  - "healthcare"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "document-processing"
  - "question-answering"
  - "classification"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "semantic-search"
  - "embeddings"
  - "human-in-the-loop"
  - "error-handling"
  - "agent-based"
  - "orchestration"
  - "databases"
industryTags: "healthcare"
company: "Risa Labs"
summary: "Trisca, a healthcare automation company, developed a multi-agent LLM system to automate oncology prior authorization workflows for cancer drugs, eliminating human review for a significant portion of orders. The system uses four specialized agents (EV, Auth, Necessity, and Submission) to handle patient eligibility verification, authorization determination, clinical reasoning, and submission to payers. The solution combines deterministic rules with LLM-based extraction, multi-source evidence reconciliation, a patient medical knowledge graph, and self-healing RPA automations. By integrating multiple data sources including insurance portals, authorization letters, and clinical notes, and applying confidence scoring to LLM outputs, the system achieves \"no-touch\" processing for orders that can be confidently processed without human intervention while escalating uncertain cases for clinical review."
link: "https://www.youtube.com/watch?v=_cVfz88_j7A"
year: 2026
seo:
  title: "Risa Labs: End-to-End Automation of Oncology Prior Authorization Workflows - ZenML LLMOps Database"
  description: "Trisca, a healthcare automation company, developed a multi-agent LLM system to automate oncology prior authorization workflows for cancer drugs, eliminating human review for a significant portion of orders. The system uses four specialized agents (EV, Auth, Necessity, and Submission) to handle patient eligibility verification, authorization determination, clinical reasoning, and submission to payers. The solution combines deterministic rules with LLM-based extraction, multi-source evidence reconciliation, a patient medical knowledge graph, and self-healing RPA automations. By integrating multiple data sources including insurance portals, authorization letters, and clinical notes, and applying confidence scoring to LLM outputs, the system achieves \"no-touch\" processing for orders that can be confidently processed without human intervention while escalating uncertain cases for clinical review."
  canonical: "https://www.zenml.io/llmops-database/end-to-end-automation-of-oncology-prior-authorization-workflows"
  ogTitle: "Risa Labs: End-to-End Automation of Oncology Prior Authorization Workflows - ZenML LLMOps Database"
  ogDescription: "Trisca, a healthcare automation company, developed a multi-agent LLM system to automate oncology prior authorization workflows for cancer drugs, eliminating human review for a significant portion of orders. The system uses four specialized agents (EV, Auth, Necessity, and Submission) to handle patient eligibility verification, authorization determination, clinical reasoning, and submission to payers. The solution combines deterministic rules with LLM-based extraction, multi-source evidence reconciliation, a patient medical knowledge graph, and self-healing RPA automations. By integrating multiple data sources including insurance portals, authorization letters, and clinical notes, and applying confidence scoring to LLM outputs, the system achieves \"no-touch\" processing for orders that can be confidently processed without human intervention while escalating uncertain cases for clinical review."
notion:
  pageId: "3a5f8dff-2538-80ea-8dfe-f02a3696d249"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-22T07:23:00.000Z"
  lastEditedTime: "2026-07-22T07:23:00.000Z"
  publishedAt: "2026-07-22T07:39:57Z"
---

## Overview

Trisca has built a sophisticated multi-agent LLM system to automate prior authorization workflows for oncology drugs, addressing one of the most administratively complex areas in healthcare. The speaker, Anant Shankar, an AI engineer at Trisca, presents a production system designed to process cancer drug authorization requests from intake through submission with minimal human intervention. The core challenge was building sufficient confidence into the system to identify which orders could proceed directly to submission versus which required human clinical review.

The prior authorization workflow traditionally involves multiple steps: intake of daily orders, eligibility and benefits verification, determination of which drugs require authorization, and finally submission to payers. Each drug can fall into one of three pathways: no authorization required, authorization already on file, or authorization required. While Trisca had previously automated portions of this workflow, all orders still required human review before submission. The goal of this project was to confidently identify and fully process a subset of orders with zero human touch while maintaining accuracy and regulatory compliance.

## Multi-Agent Architecture

The system employs four specialized agents, each handling distinct aspects of the authorization pipeline:

**EV Agent (Eligibility and Benefits Verification):** This agent fetches patient data and determines whether patients are eligible to proceed based on their insurance coverage and available benefits. The agent must navigate a fragmented landscape where insurance details are scattered across dozens of portals, APIs, and documents.

**Auth Agent:** This agent determines the authorization status of each drug, categorizing them as no authorization required, authorization on file, or authorization required. This classification is critical for routing orders appropriately through the system.

**Necessity Agent:** Described as the clinical brain of the system, this agent handles cases where authorization is required by performing clinical reasoning to determine whether the requested drugs are medically appropriate based on patient vitals and medical history.

**Submission Agent:** This agent handles the final submission of approved authorizations back to payers through their various portal and API integrations.

## Unified Data Integration Layer

A significant LLMOps challenge addressed in this system is the heterogeneity of data sources. Insurance information exists across numerous payer portals, APIs, and document formats, each with different structures and access methods. Trisca built a unified service layer that connects to different payer sources and normalizes the output into a consistent format for downstream processing.

The architecture includes a coverage orchestrator that intelligently routes patients through either API-based data retrieval or RPA-based portal automation depending on the payer. After fetching data through either pathway, results are standardized into a fixed coverage result format, which then feeds into a deterministic decision engine. This engine can immediately flag cases with inactive coverage, preventing them from proceeding further in the pipeline without any human review required.

## LLM-Driven RPA Configuration and Self-Healing

One of the more innovative LLMOps applications in this system is the use of LLMs to generate RPA configurations. Rather than manually building custom integrations for each insurance portal, which would be time-consuming and difficult to scale, Trisca created a repository of both custom and popular actions required for portal automation. An LLM-based configuration generator uses this repository to automatically build the configuration needed to automate interactions with new portals, significantly reducing development time.

Recognizing that RPA automations are inherently fragile and prone to breaking when portal interfaces change, the team implemented a self-healing loop. This mechanism identifies automation failures during production runtime and attempts to mitigate them automatically, preventing cascading failures and improving system reliability. This represents a sophisticated approach to production resilience for LLM-augmented automation systems.

## Multi-Source Evidence Reconciliation

Initial attempts to use simple LLM extraction pipelines on patient notes to categorize drug authorization status proved insufficient. The notes often lacked complete information, and the indeterministic nature of LLM extraction meant outputs couldn't be blindly trusted without human verification. This would improve efficiency but wouldn't eliminate human review, which was the ultimate goal.

To address this, Trisca implemented a multi-source evidence reconciliation strategy. For drugs with authorization on file, the system leverages authorization letters from previous patient interactions. By cross-referencing information from both patient notes and historical authorization letters, the system can identify cases where both sources concur, enabling high-confidence determinations.

For drugs that don't require authorization, the team built a payer rule knowledge base implemented as a SQL database. This knowledge base is populated through multiple channels: portal checks that identify which drugs specific payers don't require authorization for on a monthly basis, LLM extraction from policy documents that contain this information in unstructured form, and historical organizational data about how specific payers treat specific drugs. The LLM extraction for building this knowledge base is configurable, allowing it to adapt to different document types and formats. This enables extraction of drug-wise constraints that specify how different payers handle authorization requirements over specific time periods.

The reconciliation of evidence from multiple sources is a key LLMOps pattern demonstrated here. By requiring agreement between independent data sources before making high-confidence determinations, the system addresses the inherent uncertainty in single-source LLM extraction while building the confidence needed to eliminate human review for certain order types.

## Medical Necessity Agent and Clinical Reasoning

The most technically sophisticated component is the medical necessity agent, which performs clinical reasoning to determine whether drugs requiring authorization are medically appropriate for specific patients. This agent has been the subject of a publication by the team, indicating the depth of work invested in this component.

For each new order, the agent processes three types of information: patient notes containing clinical history and current status, policy criteria specifying the medical conditions that must be met for drug authorization, and a patient medical graph. This medical graph is a structured representation of biomarkers extracted from patient data, providing a queryable knowledge base of patient-specific medical information.

The workflow involves querying the patient medical graph based on criteria from the authorization policy to determine which relevant biomarkers exist and what the patient's medical condition indicates. This information, combined with the patient notes and policy criteria, is passed to an LLM that generates answered questionnaires with both supportive and contradictory facts. The inclusion of contradictory evidence is particularly noteworthy from an LLMOps perspective, as it provides transparency into conflicting information rather than presenting only confirming evidence.

Each determination includes a confidence score, and only cases with sufficient confidence and relevant information proceed without human review. Cases lacking adequate information or with lower confidence scores are escalated for human clinical review. This confidence-based routing is essential for maintaining safety and regulatory compliance while maximizing automation.

The team notes that while initially built for prior authorization, the medical necessity agent has been generalized to answer clinical questions across multiple workflows, demonstrating successful abstraction and reuse of LLM components across the organization.

## Incremental No-Touch Expansion

The system architecture reveals a deliberate strategy of incrementally expanding no-touch processing through successive filtering stages. Orders first pass through eligibility verification, where ineligible cases are immediately flagged. Eligible orders then go through authorization status determination, where drugs that don't require authorization or have existing authorization can enable complete order processing without human review if all drugs in an order fall into these categories.

Orders with drugs requiring authorization proceed to medical necessity validation, and those passing with high confidence continue to automated submission. At each stage, cases failing deterministic checks or confidence thresholds are routed to human review. This staged approach allows the system to maximize automation while maintaining safety guardrails, with the no-touch percentage growing as confidence mechanisms improve across each agent.

## Production Deployment Considerations

Several aspects of this case study reflect mature LLMOps practices for production deployment. The system includes configurable controls at multiple points, allowing operators to adjust thresholds and routing logic as needed. If issues arise, plugs can be added to route certain case types to human review, providing operational flexibility and risk management.

The use of deterministic checks alongside LLM-based reasoning reflects a pragmatic hybrid approach. Rules handle cases where logic is clear and unchanging, while LLMs address scenarios requiring interpretation, reasoning, or extraction from unstructured data. This combination optimizes for both reliability and flexibility.

The emphasis on confidence scoring throughout the system addresses one of the fundamental challenges in production LLM deployment: knowing when to trust model outputs. Rather than treating all LLM determinations as equally reliable, the system quantifies confidence and uses those scores for routing decisions, enabling automated processing only for high-confidence cases.

The self-healing RPA component demonstrates awareness of production realities. Automated systems interacting with external interfaces will experience failures, and building automatic recovery mechanisms into the system architecture reflects production-grade thinking about reliability and operational burden.

## Scalability and Generalization

The architectural decisions made in this system support scalability in multiple dimensions. The LLM-driven RPA configuration generation enables scaling to new payer portals without linear increases in development effort. The modular agent architecture allows individual components to be improved, replaced, or extended independently. The generalization of the medical necessity agent to support multiple workflows demonstrates successful abstraction that enables organizational scaling of LLM capabilities.

The use of a SQL-based payer rule knowledge base rather than purely LLM-based retrieval for authorization requirements reflects a pragmatic choice to use structured databases where data structure permits, reserving LLMs for unstructured content processing and reasoning tasks where they provide unique value.

## Challenges and Limitations

While the presentation focuses on the successful deployment, several challenges are acknowledged. The fragmented nature of insurance data across portals and documents creates significant integration complexity. The fragility of RPA automations, even with self-healing capabilities, represents an ongoing maintenance concern. The indeterministic nature of LLM extraction required the development of multi-source reconciliation strategies to achieve sufficient confidence for no-touch processing.

The system doesn't attempt to eliminate all human review, instead focusing on confidently identifying subsets of orders that can be fully automated. This reflects a realistic understanding that in high-stakes healthcare scenarios, some cases will always require clinical judgment beyond what current LLM systems can reliably provide.

## Assessment

This case study demonstrates sophisticated production deployment of LLMs in a high-stakes healthcare domain. The multi-agent architecture, confidence-based routing, multi-source evidence reconciliation, and self-healing automation represent mature LLMOps practices. The incremental approach to expanding no-touch processing shows pragmatic risk management while the generalization of components across workflows demonstrates organizational value beyond the initial use case.

The emphasis on confidence scoring and multi-source validation addresses legitimate concerns about reliability in healthcare applications. However, the presentation is clearly from the development team and lacks external validation of accuracy rates, error analysis, or clinical outcomes. The actual percentage of orders achieving no-touch processing and the accuracy of automated determinations compared to human review are not quantified, making it difficult to assess the system's real-world impact.

The combination of deterministic rules, LLM extraction, knowledge graphs, and clinical reasoning represents a thoughtful hybrid approach rather than attempting to solve all problems purely with LLMs. The architectural complexity, however, suggests significant engineering investment and ongoing maintenance requirements that may not be feasible for all organizations.
