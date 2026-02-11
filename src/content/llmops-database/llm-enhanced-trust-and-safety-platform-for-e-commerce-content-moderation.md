---
title: "LLM-Enhanced Trust and Safety Platform for E-commerce Content Moderation"
slug: "llm-enhanced-trust-and-safety-platform-for-e-commerce-content-moderation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f414c68e9a3a6d294a5cf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:38:57.394Z"
  createdOn: "2024-11-21T14:18:52.796Z"
llmopsTags:
  - "cache"
  - "compliance"
  - "content-moderation"
  - "databases"
  - "error-handling"
  - "fallback-strategies"
  - "few-shot"
  - "fraud-detection"
  - "guardrails"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "microservices"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
industryTags: "e-commerce"
company: "Whatnot"
summary: "Whatnot, a live shopping marketplace, implemented LLMs to enhance their trust and safety operations by moving beyond traditional rule-based systems. They developed a sophisticated system combining LLMs with their existing rule engine to detect scams, moderate content, and enforce platform policies. The system achieved over 95% detection rate of scam attempts with 96% precision by analyzing conversational context and user behavior patterns, while maintaining a human-in-the-loop approach for final decisions."
link: "https://medium.com/whatnot-engineering/how-whatnot-utilizes-generative-ai-to-enhance-trust-and-safety-c7968eb6315e"
year: 2023
seo:
  title: "Whatnot: LLM-Enhanced Trust and Safety Platform for E-commerce Content Moderation - ZenML LLMOps Database"
  description: "Whatnot, a live shopping marketplace, implemented LLMs to enhance their trust and safety operations by moving beyond traditional rule-based systems. They developed a sophisticated system combining LLMs with their existing rule engine to detect scams, moderate content, and enforce platform policies. The system achieved over 95% detection rate of scam attempts with 96% precision by analyzing conversational context and user behavior patterns, while maintaining a human-in-the-loop approach for final decisions."
  canonical: "https://www.zenml.io/llmops-database/llm-enhanced-trust-and-safety-platform-for-e-commerce-content-moderation"
  ogTitle: "Whatnot: LLM-Enhanced Trust and Safety Platform for E-commerce Content Moderation - ZenML LLMOps Database"
  ogDescription: "Whatnot, a live shopping marketplace, implemented LLMs to enhance their trust and safety operations by moving beyond traditional rule-based systems. They developed a sophisticated system combining LLMs with their existing rule engine to detect scams, moderate content, and enforce platform policies. The system achieved over 95% detection rate of scam attempts with 96% precision by analyzing conversational context and user behavior patterns, while maintaining a human-in-the-loop approach for final decisions."
---

## Overview

Whatnot is a livestream shopping platform and marketplace that has grown rapidly to become one of the fastest-growing marketplaces globally. As the platform expanded, maintaining trust and safety became increasingly critical. The engineering team needed to address challenges in multimodal content moderation, fulfillment issues, bidding irregularities, and general fraud protection. This case study focuses primarily on how they integrated Large Language Models into their trust and safety infrastructure to detect scams and other policy violations more effectively than their previous rule-based and single-message ML approaches.

## The Problem: Limitations of Traditional Approaches

Before adopting LLMs, Whatnot relied on a centralized rule engine as the foundation of their trust and safety platform. This rule engine was effective for data-related enforcements like managing shipping delays, processing refunds, and handling cancellations. It could efficiently analyze event data, ML model outputs, user interactions, and system logs to identify potential violations. However, the rule engine had fundamental limitations: it operated on distinct scalar values and struggled with ambiguous scenarios requiring contextual understanding.

The platform also used traditional ML models to assess individual messages in isolation for content moderation. While these models ensured each message met community guidelines before publication, they failed to capture the broader context necessary for detecting sophisticated fraud patterns. Scam attempts on the platform typically followed a pattern: starting with innocuous direct messages about products or giveaway notifications, building confidence through pleasant exchanges, and eventually attempting to move conversations off-platform. Analyzing individual messages in isolation yielded low precision because each message by itself might appear benign.

## The Solution: LLM-Enhanced Rule Engine ("Rule Engine++")

Whatnot's approach was to augment their existing rule engine with LLM capabilities rather than replacing it entirely. This hybrid architecture leverages the strengths of both systems: the rule engine's efficiency with structured data and the LLM's ability to understand conversational context and nuance.

### Scam Detection Use Case

The primary use case detailed is scam detection in direct messaging. Fraudsters target new users who are unfamiliar with platform policies, using social engineering tactics that unfold over multiple messages. The engineering team recognized that while individual messages might not be strong indicators of fraud, the overall conversation pattern reveals clear malicious intent.

The system works by first using traditional user signals (messaging patterns, account age) as qualifiers to determine which accounts warrant LLM analysis. Once an account is flagged based on these heuristics, the system retrieves the conversation history and runs it through the LLM for contextual analysis.

### Prompt Engineering and Output Structure

The case study provides a detailed example of their prompt structure. The prompt includes:

- The user ID under investigation
- Direct messages sent by the user
- Full interaction history between users (formatted with timestamps, sender IDs, and messages separated by delimiters)
- Known scam patterns documented for the platform

The LLM is instructed to assess whether the conversation indicates a scam attempt and return a structured JSON response containing two fields: a `scam_likelihood` score (ranging from 0 to 1) and an `explanation` field providing reasoning for the assessment. This structured output format is crucial for integration with downstream systems.

A sample output demonstrates the LLM's ability to identify multiple scam indicators: requesting card details, manipulating recipients to send money, claiming urgent need for funds, and citing payment failures. The explanation field provides human-readable reasoning that can be reviewed by operations teams.

### Integration with Rule Engine

The LLM output serves as an additional signal fed into the existing rule engine rather than making enforcement decisions directly. The rule engine combines the scam likelihood score with other factors in compound conditions, such as:

`scam_likelihood > 0.6 and account_age &lt; X days and message_frequency > Y and lifetime_orders &lt; Z`

This approach maintains the principle that LLMs serve as "cognitive partners" rather than decision-makers. The human-in-the-loop philosophy ensures that LLMs enhance evaluations rather than autonomously enforcing actions.

### Enforcement Actions

When the combined signals pass the rule engine thresholds, the system takes temporary action to disable certain features on the account and notifies the operations team. Crucially, the LLM output (both likelihood and explanation) is passed along to human reviewers for investigation, enabling informed decision-making about final user actions.

## System Architecture

The trust and safety LLM stack is organized into three phases:

**Gather Phase**: This phase involves curating data from multiple sources including events, user data, order history, and ML model outputs. The work includes data identification, filtering, annotation, and formatting to prepare inputs for LLM analysis.

**Evaluate Phase**: LLMs are orchestrated to provide insights on the curated data. The system combines raw data (previous trust and safety actions, account age, etc.) with LLM-derived insights (scam likelihood, spam likelihood, etc.) and passes these as scalar values to the rule engine. The rule engine then recommends next steps based on an enforcement matrix. Currently, the team relies on zero-shot and few-shot learning approaches for predictions, though they mention investing in fine-tuning for related use cases like customer support.

**Enforce Phase**: Three possible outcomes exist: close (no violation detected with high confidence), act (violation found with high confidence), or escalate (uncertain cases requiring human review). The rule engine considers multiple factors including previous violations and account age to recommend specific actions like warnings or suspensions. Confirmed actions trigger user notifications and product access changes via Kafka messaging.

## Results and Performance

The team reports impressive results from their LLM-enhanced scam detection:

- Over 95% of scam attempts are proactively detected within minutes
- 96% precision in scam identification
- High recall (specific number not provided)

These metrics suggest the system is both accurate (high precision) and comprehensive (high recall), though independent verification of these claims is not available.

## Handling Adversarial Adaptation

The case study acknowledges that fraud detection is an ongoing battle, with bad actors continuously adapting their tactics. One specific adaptation mentioned is embedding text in images rather than text messages to evade text-based analysis. Whatnot addressed this by adding OCR (Optical Character Recognition) to message attachments, extracting text from images to include as additional LLM input.

The team notes that LLMs have "surpassed expectations" in adapting to different messaging patterns. This adaptability is a key advantage over rule-based systems that require manual updates for each new fraud tactic. The approach has expanded beyond scam detection to enforce policies around off-platform transactions and harassment.

## Technical Considerations and Learnings

Several important LLMOps considerations emerge from this case study:

**Hybrid Architecture**: Rather than replacing existing systems, LLMs augment the rule engine. This allows gradual adoption and maintains fallback capabilities.

**Structured Outputs**: Requiring JSON-formatted responses enables seamless integration with downstream systems and rule engines. This is a practical pattern for production LLM deployments.

**Human-in-the-Loop**: The explicit philosophy of LLMs as "cognitive partners" rather than autonomous decision-makers reflects mature thinking about AI governance in high-stakes applications.

**Multimodal Expansion**: The addition of OCR for image-based text demonstrates the need for multimodal capabilities in real-world content moderation scenarios.

**Confidence Thresholds**: Using likelihood scores with configurable thresholds allows for tuning the tradeoff between precision and recall based on business requirements.

## Future Direction

The team expresses excitement about a future where the rule engine and enforcement logic could merge into a unified generative AI system. They are also investing in fine-tuning for related use cases like customer support, suggesting a gradual expansion of LLM capabilities across their trust and safety operations.

## Critical Assessment

While the reported metrics are impressive, several caveats should be noted. The 95% detection rate and 96% precision figures are self-reported without external validation. The actual volume of scam attempts and false positive rates are not disclosed. Additionally, the long-term maintenance burden of prompt engineering versus fine-tuned models remains to be seen. The case study represents an early-stage deployment (2023), and production stability over time is not addressed. Nevertheless, the architectural patterns and integration strategies presented offer valuable insights for teams implementing LLMs in trust and safety applications.