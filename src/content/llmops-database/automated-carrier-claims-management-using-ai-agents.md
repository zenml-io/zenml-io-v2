---
title: "Automated Carrier Claims Management Using AI Agents"
slug: "automated-carrier-claims-management-using-ai-agents"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "678e4cf9d8bb16a85053b9ba"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:56:05.147Z"
  createdOn: "2025-01-20T13:17:45.916Z"
llmopsTags:
  - "customer-support"
  - "document-processing"
  - "regulatory-compliance"
  - "multi-modality"
  - "structured-output"
  - "prompt-engineering"
  - "error-handling"
  - "fallback-strategies"
  - "system-prompts"
  - "human-in-the-loop"
  - "agent-based"
  - "fastapi"
  - "microservices"
  - "orchestration"
  - "microsoft-azure"
industryTags: "tech"
company: "FIEGE"
summary: "FIEGE, a major German logistics provider, implemented an AI agent system to handle carrier claims processing end-to-end, launched in September 2024. The system automatically processes claims from initial email receipt through resolution, handling multiple languages and document types. By implementing a controlled approach with sandboxed generative AI and templated responses, the system successfully processes 70-90% of claims automatically, resulting in eight-digit cost savings while maintaining high accuracy and reliability."
link: "https://www.youtube.com/watch?v=1LCanh63zrg"
year: 2025
seo:
  title: "FIEGE: Automated Carrier Claims Management Using AI Agents - ZenML LLMOps Database"
  description: "FIEGE, a major German logistics provider, implemented an AI agent system to handle carrier claims processing end-to-end, launched in September 2024. The system automatically processes claims from initial email receipt through resolution, handling multiple languages and document types. By implementing a controlled approach with sandboxed generative AI and templated responses, the system successfully processes 70-90% of claims automatically, resulting in eight-digit cost savings while maintaining high accuracy and reliability."
  canonical: "https://www.zenml.io/llmops-database/automated-carrier-claims-management-using-ai-agents"
  ogTitle: "FIEGE: Automated Carrier Claims Management Using AI Agents - ZenML LLMOps Database"
  ogDescription: "FIEGE, a major German logistics provider, implemented an AI agent system to handle carrier claims processing end-to-end, launched in September 2024. The system automatically processes claims from initial email receipt through resolution, handling multiple languages and document types. By implementing a controlled approach with sandboxed generative AI and templated responses, the system successfully processes 70-90% of claims automatically, resulting in eight-digit cost savings while maintaining high accuracy and reliability."
---

## Overview

This case study, presented by Big Picture (an IT development company with 15+ years of experience and 5 years focused on AI solutions), details a production AI agent system built for FIEGE, one of Germany's main logistics solution providers. FIEGE operates with approximately 22,000 employees and around €2 billion in annual turnover. The AI agent was deployed in September 2024 to handle carrier claims management—the process of finding lost parcels and demanding compensation from carriers.

The presentation was given as part of an "Agent Hour" session focused on understanding what constitutes a real AI agent versus simpler implementations like custom GPTs. The presenter explicitly challenged the narrative that "AI agents are coming in 2025," arguing that production-ready agents were already live in 2024, with the main current challenge being enterprise adoption.

## Problem Statement

The logistics industry faces significant operational costs in managing carrier claims, which traditionally requires human workers to read customer emails, communicate with carriers, verify contractual obligations, and process reimbursements. This multi-step process involves analyzing various document types (text, PDFs, images), communicating with multiple stakeholders in various European languages, and making decisions based on complex contractual rules.

## Technical Architecture and LLMOps Approach

### Sandboxed Generative AI Design

The core architectural principle behind this implementation is what the presenters call "sandboxing" the generative AI. Rather than allowing the LLM to freely generate responses end-to-end, the system constrains generative AI to specific tasks where it excels—classification, extraction, and assessment—while embedding these capabilities within deterministic workflows.

The presenter uses the metaphor of AI being "like a teenager"—it has great potential and can be very smart, but organizations still shouldn't let it run their business unsupervised. This philosophy directly shaped the technical architecture.

### Microsoft Azure Infrastructure

The solution is built on Microsoft Azure, utilizing:
- **Azure Logic Apps** for workflow orchestration
- **Azure Function Apps** for serverless compute

This infrastructure enables the deterministic process flows that contain and direct the LLM's capabilities, while maintaining the flexibility to swap components as needed.

### Template-Based Response Generation

A critical design decision was avoiding direct LLM-generated responses. Instead of letting the model "improvise" answers, the system uses templates—exactly as a human team would operate with policy-approved response templates. The LLM's role is to analyze incoming communications, extract relevant information, and select appropriate templates based on the analysis, but not to compose novel responses.

This approach directly addresses hallucination concerns. As the presenter noted, for "a funny chitchat on ChatGPT" improvisation might be acceptable, but for processing claims and reimbursements, it is "absolutely not" acceptable.

### Reasoning and Chain of Thought

The system employs reasoning capabilities (described as "thinking before answering") to improve results and make answers comprehensible for human users. Chain of Thought prompting is used both for accuracy and explainability—the latter being noted as important for AI Act compliance in Europe.

### Multilingual Processing

The model can understand and process emails in any European language, enabling FIEGE to handle claims from carriers across their European operations without language barriers.

### Confidence Thresholds and Human Handoff

A sophisticated confidence threshold mechanism determines when the AI can proceed autonomously versus when human intervention is required. The presenter described this as teaching the model to recognize "I can't really resolve the case right now, I need to ask my boss."

The implementation uses examples and counter-examples in prompting to train the model on self-assessment. Over time, through iteration and operational experience, these thresholds can be adjusted to optimize the balance between automation and human oversight. The presenter explicitly stated that the model is not expected to process 100% of cases alone correctly, and this acknowledgment is built into the system design.

When the AI cannot proceed, it fails gracefully and creates a ticket for human workers in their existing ticketing system (Jira was mentioned as an example), adding to their normal queue rather than requiring a separate workflow.

## The Three A's Framework

The presenter introduced a framework called "The Three A's" for understanding AI agent adoption challenges:

### Accuracy
Concerns about reliability and hallucination are addressed through:
- Sandboxing generative AI within deterministic boundaries
- Template-based response generation rather than free-form generation
- State-of-the-art prompting techniques with examples
- Chain of Thought for explainability

### Autonomy
The ability to accomplish tasks end-to-end without constant human checking is achieved through:
- Linear (and in reality, more complex multi-stakeholder) workflow processing
- Confidence thresholds for appropriate human handoff
- Multi-party communication capabilities (with customers, carriers, and internal systems)

### Acceptance
Both management and team acceptance is facilitated through:
- Integration with existing IT ecosystems rather than heavy migration
- Flexible architecture that isn't locked to one vendor
- Human-readable ticket generation in familiar tools
- Demonstrated business impact metrics

## Integration Philosophy

A key design principle emphasized is avoiding lock-in to any single ecosystem. The presenter noted that language models change "from months to months" rather than years, so the architecture maintains flexibility to swap models without requiring customers to change their processes.

Similarly, the system integrates with existing enterprise systems rather than requiring organizations to abandon tools like SAP. The AI agent uses the same systems the human team uses, making adoption significantly easier.

## PII and Data Security

During the Q&A, data privacy was addressed. The system is designed to prevent PII leakage through:
- Fragmented, limited access patterns (described as a "limited worker who cannot answer a question if it's not written you can answer this question")
- Validation against original email addresses to prevent social engineering attempts
- Data remaining within the customer's ERP systems rather than being extracted

## Results and Business Impact

The solution reportedly:
- Processes 70-90% of all claims fully automatically
- Responds to initial emails within 60 seconds (though they can optionally add delays "so it doesn't look like magic")
- Massively reduces support team workload
- Achieved eight-digit improvements in revenue and refund recovery
- Works end-to-end from first customer email to claim resolution

## Critical Assessment

While the results claimed are impressive, it's worth noting this presentation was given by the vendor (Big Picture) who built the solution, so the claims should be viewed with appropriate context. The eight-digit revenue improvement claim is notable but lacks specific quantification or independent verification.

That said, the technical approach described—sandboxing LLMs within deterministic workflows, using templates rather than free generation, implementing confidence thresholds for human handoff—represents genuinely sound LLMOps practices that address real concerns about reliability in production systems.

The system's ability to handle 70-90% of cases autonomously while gracefully escalating the remainder suggests a mature understanding of where current LLM capabilities excel and where human judgment remains necessary.

## Broader Applicability

The presenter identified several industries where similar approaches would be applicable:
- Customer support
- Accounting
- Insurance
- Banking
- Any claims-heavy processes

The core pattern of constraining LLM capabilities within structured workflows while leveraging their strengths in document understanding, classification, and multi-lingual processing appears broadly transferable to other domains requiring similar document-heavy, multi-party communication processes.