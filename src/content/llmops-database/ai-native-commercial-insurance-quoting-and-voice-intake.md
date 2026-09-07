---
title: "AI-Native Commercial Insurance Quoting and Voice Intake"
slug: "ai-native-commercial-insurance-quoting-and-voice-intake"
draft: false
llmopsTags:
  - "document-processing"
  - "structured-output"
  - "realtime-application"
  - "data-integration"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "fallback-strategies"
  - "evals"
  - "monitoring"
  - "databases"
  - "reliability"
  - "scalability"
industryTags: "insurance"
company: "Harper"
summary: "Harper is building an AI-native commercial insurance brokerage intended to compress quoting and application workflows that traditionally take weeks into a day or two across more than 160 carriers. Its production system combines centralized customer and communications data, automated quote parsing, operator-built internal applications, and voice agents that collect insurance applications across multiple industry verticals and coverage lines. The company reports rapid deployment of voice intake for general liability, cyber, workers’ compensation, and property, with phone-number-based prefill from its CRM reducing repetitive questioning. The operation is still early and visibly dependent on manual monitoring: parsing failures caused incorrect fee displays, pending applications required active recovery, and voice calls were being treated as an R&D workload rather than a fully validated production channel. The case demonstrates the potential of LLM-enabled workflow automation in insurance, while also highlighting the need for reliable extraction, observability, human review, conversion tracking, and clear operational ownership."
link: "https://www.youtube.com/watch?v=5tjNU_hsERk"
year: 2025
seo:
  title: "Harper: AI-Native Commercial Insurance Quoting and Voice Intake - ZenML LLMOps Database"
  description: "Harper is building an AI-native commercial insurance brokerage intended to compress quoting and application workflows that traditionally take weeks into a day or two across more than 160 carriers. Its production system combines centralized customer and communications data, automated quote parsing, operator-built internal applications, and voice agents that collect insurance applications across multiple industry verticals and coverage lines. The company reports rapid deployment of voice intake for general liability, cyber, workers’ compensation, and property, with phone-number-based prefill from its CRM reducing repetitive questioning. The operation is still early and visibly dependent on manual monitoring: parsing failures caused incorrect fee displays, pending applications required active recovery, and voice calls were being treated as an R&D workload rather than a fully validated production channel. The case demonstrates the potential of LLM-enabled workflow automation in insurance, while also highlighting the need for reliable extraction, observability, human review, conversion tracking, and clear operational ownership."
  canonical: "https://www.zenml.io/llmops-database/ai-native-commercial-insurance-quoting-and-voice-intake"
  ogTitle: "Harper: AI-Native Commercial Insurance Quoting and Voice Intake - ZenML LLMOps Database"
  ogDescription: "Harper is building an AI-native commercial insurance brokerage intended to compress quoting and application workflows that traditionally take weeks into a day or two across more than 160 carriers. Its production system combines centralized customer and communications data, automated quote parsing, operator-built internal applications, and voice agents that collect insurance applications across multiple industry verticals and coverage lines. The company reports rapid deployment of voice intake for general liability, cyber, workers’ compensation, and property, with phone-number-based prefill from its CRM reducing repetitive questioning. The operation is still early and visibly dependent on manual monitoring: parsing failures caused incorrect fee displays, pending applications required active recovery, and voice calls were being treated as an R&D workload rather than a fully validated production channel. The case demonstrates the potential of LLM-enabled workflow automation in insurance, while also highlighting the need for reliable extraction, observability, human review, conversion tracking, and clear operational ownership."
notion:
  pageId: "3d1f8dff-2538-809f-8960-e91063b38481"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-04T08:02:00.000Z"
  lastEditedTime: "2026-09-04T08:02:00.000Z"
  publishedAt: "2026-09-07T09:27:33Z"
---

## Overview

Harper is an AI-native commercial insurance startup using software and AI agents to operate a brokerage rather than merely sell tools to existing brokers. Its core proposition is to capture demand from businesses that need insurance, gather the necessary underwriting information, obtain quotes from more than 160 carriers, and help customers bind coverage substantially faster than a traditional broker. The stated target is to move from a process that can take weeks to one that produces quotes in roughly a day or two, with some leads receiving instant quotes.

The most prominent LLMOps initiative is a voice-agent intake system. The company deployed voice agents across several insurance verticals and expanded them to handle general applications as well as cyber, workers’ compensation, and property coverage. The system was being tested with real customer calls and was expected to take on more verticals quickly. Harper also uses AI-assisted internal tooling so operations staff can build applications for their own workflows, while centralized email, phone, and text data is intended to reduce tribal knowledge. These capabilities create significant leverage, but the operating model remains experimental: the company explicitly treated the voice channel as an R&D budget, encouraged high-volume testing, and relied on close human supervision to determine whether it worked.

## Problem and Operating Context

Commercial insurance is a demand-capture business in which nearly every business may require coverage, but converting that demand involves collecting structured information, matching a customer to appropriate coverage, requesting carrier quotes, comparing terms, and following up until payment and binding are complete. The company identified speed and operational throughput as the main constraints rather than a lack of prospective customers.

The observed workflow included construction contractors, retail businesses, smoke shops, consultants, and other commercial accounts. Operators considered different coverage opportunities based on the business type, such as inland marine coverage for contractors’ tools and equipment, professional liability for higher-revenue accounts, and workers’ compensation where a business had employees and payroll. This indicates that the AI system is not simply answering generic questions: it is being applied to a domain workflow in which industry classification, coverage selection, eligibility, quote retrieval, and customer follow-up all affect the outcome.

A central management concern was the leaking funnel. The team tracked the number of leads, quotes, applications, payments, and bound policies, but pending cases could easily become invisible or lose ownership. One reviewed lead had been paid for, received an instant quote, and indicated an intention to pay, yet the application and payment status still required manual investigation. The company’s leadership viewed this type of operational gap as a threat to scale because increasing lead volume without reliable recovery processes would increase losses rather than revenue.

## System and Workflow

The production workflow appears to combine several layers rather than a single autonomous model. Customer interactions from email, telephone, and text are routed into a central knowledge and operations environment. A CRM, referred to internally as Big Brother, stores existing customer information. When a caller supplies a phone number, the voice workflow can use that identifier to retrieve and prefill company information and other application fields, avoiding several minutes of repetitive data collection.

The voice agents conduct intake conversations for supported business categories and insurance lines. The stated expansion covered retail, smoke shops, and consultants, in addition to previously supported categories. Each vertical could accept a general application and gather information for cyber, workers’ compensation, and property coverage. The intended end state was end-to-end voice intake, with the agent collecting information that would otherwise be gathered by a sales or operations employee and passing it into the downstream application and quoting process.

After intake, quote-related data must be parsed and presented to customers and operators. A change to the parsing implementation made parts of the process more synchronous, and higher volume appeared to create congestion or processing failures. In one incident, quote line items were not extracted correctly, so an operator had to enter premiums manually. The resulting customer-facing representation displayed a total as if it were entirely fees and taxes, rather than clearly showing the relevant coverage and premium. Although the underlying quote amount may have been available, the presentation defect created a material conversion and trust risk.

The organization also uses AI-assisted development and internal application building. Engineering is moving toward a software-factory model, while operations staff are encouraged to create tools for problems they understand directly. Cursor was used as an AI coding and assistance environment, and Granola was described as processing meeting or spoken context and producing reports when explicitly directed to listen for a topic. These tools are not themselves the customer-facing insurance agents, but they support the broader LLMOps operating model by shortening the path from an observed operational problem to an internal software change.

## Evaluation and Observability

The company was actively reconsidering which metrics should define system quality. First-pass rate was being used as an initial measure of intake quality, but the team recognized that it was insufficient by itself. A better evaluation view would combine whether an intake produces a usable quote, how many follow-ups are required, how quickly carrier responses arrive, and whether the resulting quote converts into an application, payment, and bound policy.

This is an important distinction for an insurance agent. A voice model can complete a conversation fluently while still collecting incomplete, ambiguous, or unusable underwriting information. Likewise, a parser can extract a numeric value while assigning it to the wrong field. Useful production evaluation therefore needs to follow the full business outcome rather than only model-level measures such as call completion or first-pass extraction.

The observed monitoring process was highly manual. Team members reviewed quote counts, application states, call outcomes, pending items, and payment commitments throughout the day. Voice-agent calls were marked as experimental, and the company wanted a large volume of real interactions to generate a meaningful signal. That approach can accelerate learning, but it requires safeguards: calls need clear experiment labels, failures need to be traceable to a model, prompt, integration, or business-rule cause, and human operators need a reliable queue for correction and recovery.

Useful operational metrics suggested by the workflow include quote turnaround time, quote retrieval rate, follow-up count per account, application completion rate, parsing exception rate, voice-agent abandonment rate, successful handoff rate, payment completion, bind rate, and the share of cases requiring manual intervention. These metrics should be segmented by vertical, coverage line, carrier, and agent version. The source describes the need for such measurement but does not establish stable benchmarks or independently verified performance improvements.

## Results and Tradeoffs

Harper reports that voice agents were deployed live in a matter of days and extended across multiple industries and coverage types within a short period. The claimed benefit is greater intake capacity without a proportional increase in sales headcount. Phone-based CRM prefill also removes repetitive questions, and instant quoting can shorten the path from a paid lead to a customer decision. The company’s rapid deployment model allows it to test new verticals quickly and decide from real interaction data whether a workflow is viable.

However, these results should be interpreted as early operational evidence rather than a completed production validation. The system experienced parsing problems under volume, produced misleading quote displays, and had dozens of paid or otherwise active items whose recovery status was not immediately clear. Voice calls could be dropped, and the organization was still determining how to handle failures and incomplete applications. The high-touch founder monitoring described in the operating model may temporarily compensate for system weaknesses, but it is not itself a scalable control mechanism.

There are also insurance-specific risks. Incorrectly collected or displayed coverage information can affect customer trust, eligibility decisions, compliance obligations, and the suitability of a policy. A voice agent should not be treated as authoritative merely because it can complete an intake conversation. Human review remains important for ambiguous answers, unusual risks, coverage exclusions, pricing discrepancies, and cases outside the agent’s tested verticals. Any automation that initiates outreach or purchases leads at scale also needs controls for cost, consent, call quality, and unwanted customer contact.

## LLMOps Assessment

The case is strongest as an example of rapid, feedback-driven deployment: the company identifies a bottleneck, puts an AI workflow in front of real traffic, labels it as experimental, watches failures closely, and expands when it sees useful signal. It also shows that LLMOps in a vertical business includes much more than selecting a model. Data synchronization, CRM retrieval, structured extraction, quote parsing, workflow state, experiment labeling, human escalation, and business KPI design are all part of the system.

The main gap is the distance between agent capability and dependable operating control. To mature the platform, Harper would need versioned prompts and agent configurations, regression tests using representative calls and applications, field-level extraction validation, confidence thresholds, replayable traces, queue-based exception handling, and clear ownership for every pending account. Customer-visible quotes should be validated before delivery, with coverage and premium fields checked against source documents or carrier responses. Release decisions should be based on conversion and error-cost tradeoffs by vertical, not only on how many calls the agent can handle.

Overall, Harper demonstrates a credible use of GenAI for commercial insurance intake and workflow acceleration, with promising early signs of speed and capacity. The evidence also shows why production success depends on disciplined evaluation and operational systems around the model. The company’s ability to scale will depend less on deploying more voice agents than on making their outputs accurate, explainable, recoverable, and consistently connected to the final insurance outcome.
