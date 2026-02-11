---
title: "AI-Powered Marketing Compliance Automation System"
slug: "ai-powered-marketing-compliance-automation-system"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "681768c95a9b54c7f770b333"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:07:25.750Z"
  createdOn: "2025-05-04T13:16:57.288Z"
llmopsTags:
  - "content-moderation"
  - "regulatory-compliance"
  - "document-processing"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "documentation"
  - "compliance"
  - "guardrails"
  - "openai"
industryTags: "finance"
company: "Remitly"
summary: "Remitly, a global financial services company operating in 170 countries, developed an AI-based system to streamline their marketing compliance review process. The system analyzes marketing content against regulatory guidelines and internal policies, providing real-time feedback to marketers before legal review. The initial implementation focused on English text content, achieving 95% accuracy and 97% recall in identifying compliance issues, reducing the back-and-forth between marketing and legal teams, and significantly improving time-to-market for marketing materials."
link: "https://www.youtube.com/watch?v=LI1h4QXT_To"
seo:
  title: "Remitly: AI-Powered Marketing Compliance Automation System - ZenML LLMOps Database"
  description: "Remitly, a global financial services company operating in 170 countries, developed an AI-based system to streamline their marketing compliance review process. The system analyzes marketing content against regulatory guidelines and internal policies, providing real-time feedback to marketers before legal review. The initial implementation focused on English text content, achieving 95% accuracy and 97% recall in identifying compliance issues, reducing the back-and-forth between marketing and legal teams, and significantly improving time-to-market for marketing materials."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-marketing-compliance-automation-system"
  ogTitle: "Remitly: AI-Powered Marketing Compliance Automation System - ZenML LLMOps Database"
  ogDescription: "Remitly, a global financial services company operating in 170 countries, developed an AI-based system to streamline their marketing compliance review process. The system analyzes marketing content against regulatory guidelines and internal policies, providing real-time feedback to marketers before legal review. The initial implementation focused on English text content, achieving 95% accuracy and 97% recall in identifying compliance issues, reducing the back-and-forth between marketing and legal teams, and significantly improving time-to-market for marketing materials."
---

## Overview

Remitly is an international money transfer company with a significant global footprint, operating in 170 countries with approximately 8 million active customers and $15 million in quarterly send volume. A key characteristic of their operations is that they communicate with customers in over 18 languages across various channels including paid advertisements (TV, Facebook, Google), email communications, push notifications, and SMS. This presentation, given by Krishna, Director of Product for Remitly's marketing platform, details how they developed a generative AI system to streamline marketing compliance review.

## The Problem Context

Operating in the heavily regulated money transmission industry presents unique challenges for Remitly's marketing operations. Each of the 170 countries where they operate has distinct regulations governing what can and cannot be communicated in marketing materials, with strict guidelines to prevent misleading customers. The company had developed internal compliance guidelines that distill regulations from all these jurisdictions along with internally-developed best practices.

The legacy workflow for ensuring marketing compliance was manual and iterative. The creative team would develop content (images, videos, audio, or plain text) and submit it to the legal team for review. Legal would provide feedback through various channels—Google Docs comments, Slides annotations, Slack messages, or meetings. The creative team would then revise the materials based on this feedback and resubmit. This cycle typically repeated 2-4 times before final approval, at which point the marketing team could deploy the content.

This process created two significant operational challenges. First, the extended review cycles meant slower time-to-market for marketing communications, impacting both customer acquisition campaigns and existing customer engagement. Second, the constant back-and-forth forced marketers to context-switch between current projects and addressing feedback on previously submitted work, leading to both inefficiency and job dissatisfaction.

## Solution Architecture

The team built an AI-powered compliance checking tool with a straightforward user experience: marketers upload content, the system performs analysis to identify issues, and then provides structured guidance. This guidance includes the specific text that violates guidelines, which guideline is being violated, and suggested revisions to achieve compliance. Marketers can then iterate on their content using this feedback until they are confident all issues are resolved before submitting to legal for final approval.

Under the hood, the system combines three key components. First, the company's compliance guidelines stored in Confluence pages and documents—these represent the distilled knowledge of regulations across countries plus internal best practices. Second, prompts engineered by the development team to instruct the AI system on how to analyze content. Third, the AI system itself that processes both the prompts and guidelines to perform analysis on submitted marketing content.

The types of compliance checks the system performs include:

- **Claims verification**: Checking whether statements made in marketing content are factually accurate and supportable (for example, verifying that claimed statistics like send volume figures are correct)
- **Disclaimer checking**: Ensuring required disclaimers are present in the content
- **Intellectual property review**: Identifying potential IP infringement or verifying that proper approvals exist for any third-party IP used
- **Spelling and grammar**: Basic quality checks on the text

The presenter noted these are representative examples rather than an exhaustive list of all checks performed by the system.

## Development Process and Technical Challenges

The project required 15 days of actual development effort, but this was spread across 3 months due to the challenges encountered. The team achieved 95% accuracy and approximately 97% recall in identifying compliance issues—solid metrics for a compliance automation use case, though it should be noted these are self-reported figures that would benefit from independent validation in a production setting.

### Training Data Collection

The most significant challenge was obtaining structured training data. Because the previous workflow involved feedback delivered through varied channels (Google Docs comments, Slack messages, verbal feedback in meetings), there was no existing corpus of structured examples mapping content to compliance issues. The team spent considerable time in the initial phase creating this training dataset, structured as pairs of marketing content and corresponding legal feedback identifying guideline violations. This corpus served dual purposes: training the model and evaluating its performance.

This challenge highlights a common pattern in enterprise LLMOps—organizations often have valuable institutional knowledge scattered across unstructured channels, and significant effort is required to formalize this knowledge into training data suitable for AI systems.

### Evaluation Methodology

The team employed both quantitative and qualitative evaluation approaches. On the quantitative side, they tracked precision and recall metrics. On the qualitative side, they gathered usability feedback from marketers during beta testing, which led to iterations on how results were presented—both the language used and the structure of the output. The team went through multiple model iterations before releasing even to beta testers, suggesting a careful approach to validation before production deployment.

### Precision-Recall Tradeoff

A technical challenge mentioned was balancing precision and recall. This is a classic machine learning tradeoff that's particularly important in compliance contexts. High precision ensures that when the system flags an issue, it's genuinely a problem (avoiding alert fatigue from false positives). High recall ensures the system catches all actual issues (critical for compliance where missed violations could have regulatory consequences). The 95%/97% figures suggest the team ultimately optimized more toward recall, which is appropriate for a compliance use case where missing issues is more costly than over-flagging.

## Current Status and Limitations

At the time of the presentation, the system was being rolled out to the full marketing team, with training underway to encourage adoption as part of their standard workflow before submitting to legal. The current scope is limited to English text only—a pragmatic starting point given that Remitly operates in 18+ languages.

## Roadmap and Future Development

The team has an ambitious roadmap for expanding the system's capabilities:

- **Multi-modal content support**: Extending beyond text to analyze audio, images, and video. This addresses a current workflow gap where marketers must first validate text, then create visual content. The presenter acknowledged this introduces additional complexity—for example, checking font sizes of disclaimers in images requires different capabilities than text analysis.

- **Multi-language support**: Expanding beyond English to cover the other 17+ languages in which Remitly communicates with customers.

- **Native tool integration**: Rather than requiring marketers to use a separate compliance tool, the vision is to integrate compliance checking directly into creative tools like Adobe and Figma. This would eliminate context-switching between creation and compliance checking, making compliance a seamless part of the creative workflow rather than an additional step.

## Expected Outcomes

The envisioned future state transforms the compliance workflow significantly. Creative teams would develop materials with continuous access to compliance guidance, iterating until satisfied before submitting to legal. The legal review would then become more of a "rubber stamp" quality check rather than the intensive multi-round review process it is today. The expected benefits include dramatically reduced review time (potentially down to minutes), reduced effort for both creative and legal teams, and faster time-to-market for marketing campaigns.

## LLMOps Considerations and Assessment

This case study illustrates several important LLMOps patterns for organizations deploying generative AI in regulated industries:

The approach of using internal compliance guidelines stored in documentation systems (Confluence) as the knowledge base for the AI system suggests a RAG (Retrieval Augmented Generation) or similar architecture, though the technical details weren't explicitly shared. This is a sensible approach for compliance use cases where the rules change and need to be maintainable without retraining models.

The emphasis on self-service tooling represents a pragmatic approach to AI deployment—augmenting human capabilities rather than replacing human judgment. Marketers still make final decisions based on AI guidance, and legal review remains as a final check. This human-in-the-loop pattern is particularly appropriate for compliance contexts where accountability matters.

The 3-month timeline with 15 days of active development time is realistic for an MVP in this space, though the ongoing effort needed for multi-modal support, multi-language expansion, and tool integration represents a much larger commitment. Organizations considering similar projects should plan for significant ongoing investment beyond the initial proof of concept.

One area that could use more elaboration is the monitoring and feedback loop in production. How does the system learn from cases where marketers disagree with its assessments? How are the underlying guidelines kept current as regulations change? These operational concerns are critical for maintaining accuracy over time but weren't addressed in the presentation.

Overall, this represents a solid example of applying generative AI to a well-defined internal workflow problem, with appropriate scoping (starting with English text only) and realistic metrics. The compliance domain is well-suited to AI augmentation given its rules-based nature, and the self-service model appropriately keeps humans accountable for final decisions.