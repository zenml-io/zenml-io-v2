---
title: "Large Bank LLMOps Implementation: Lessons from Deutsche Bank and Others"
slug: "large-bank-llmops-implementation-lessons-from-deutsche-bank-and-others"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f405de531d1c2ecb89d5b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:44:34.279Z"
  createdOn: "2024-11-21T14:14:53.073Z"
llmopsTags:
  - "compliance"
  - "data-analysis"
  - "document-processing"
  - "documentation"
  - "error-handling"
  - "google-gcp"
  - "guardrails"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "microservices"
  - "monitoring"
  - "prompt-engineering"
  - "rag"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
industryTags: "finance"
company: "Various"
summary: "A discussion between banking technology leaders about their implementation of generative AI, focusing on practical applications, regulatory challenges, and strategic considerations. Deutsche Bank's CTO and other banking executives share their experiences in implementing gen AI across document processing, risk modeling, research analysis, and compliance use cases, while emphasizing the importance of responsible deployment and regulatory compliance."
link: "https://www.youtube.com/watch?v=D-cy_fmbNRI"
year: 2023
seo:
  title: "Various: Large Bank LLMOps Implementation: Lessons from Deutsche Bank and Others - ZenML LLMOps Database"
  description: "A discussion between banking technology leaders about their implementation of generative AI, focusing on practical applications, regulatory challenges, and strategic considerations. Deutsche Bank's CTO and other banking executives share their experiences in implementing gen AI across document processing, risk modeling, research analysis, and compliance use cases, while emphasizing the importance of responsible deployment and regulatory compliance."
  canonical: "https://www.zenml.io/llmops-database/large-bank-llmops-implementation-lessons-from-deutsche-bank-and-others"
  ogTitle: "Various: Large Bank LLMOps Implementation: Lessons from Deutsche Bank and Others - ZenML LLMOps Database"
  ogDescription: "A discussion between banking technology leaders about their implementation of generative AI, focusing on practical applications, regulatory challenges, and strategic considerations. Deutsche Bank's CTO and other banking executives share their experiences in implementing gen AI across document processing, risk modeling, research analysis, and compliance use cases, while emphasizing the importance of responsible deployment and regulatory compliance."
---

## Overview

This case study is derived from a panel discussion at a Google Cloud event featuring technology leaders from two major financial institutions: Bernd Leukert, Chief Technology Officer at Deutsche Bank, and Dean Conwell, Chief Information Officer at Discover Financial Services. The discussion, moderated by Manoj B from Google's Financial Services and Insurance practice, provides insights into how large regulated banks are approaching the production deployment of generative AI technologies, the challenges they face, and their strategies for successful implementation.

Both organizations represent significant scale in financial services, with Deutsche Bank operating as a multinational institution with complex regulatory requirements across jurisdictions, and Discover as a major US-based financial services company. Their experiences offer practical lessons for enterprises navigating the transition from proof-of-concept to production-ready generative AI systems.

## Deutsche Bank's LLMOps Journey

Deutsche Bank's generative AI journey began with a strategic decision in 2020 when evaluating cloud partners. The bank selected Google Cloud specifically because of its integrated AI capabilities within the platform itself, rather than having AI as an adjacent or separate offering. This architectural decision has proven prescient as generative AI has matured.

### Document Processing at Scale

The most prominent production use case discussed is document processing using Google's Document AI service. Deutsche Bank receives hundreds of thousands of unstructured documents daily from customers. The traditional approach involved human operators receiving documents, processing them through OCR tools with "more or less success," and then driving subsequent actions. This manual workflow was inefficient and error-prone.

The bank has taken Google's base Document AI service and customized it for banking requirements by adding necessary controls. A key architectural principle they introduced is the "concept of one" - ensuring there is one service for one dedicated use case, avoiding the historical pattern of redundant and duplicative capabilities across various business lines within the bank. This service-oriented architecture approach is critical for maintaining consistency and governance across the enterprise.

### Research Report Automation

A second major use case involves the bank's research department, which produces reports for customers on topics like inflation and interest rates. The head of research reported that analysts spend approximately 80% of their time on data collection and only 20% on actual analysis and report writing. By automating the data collection phase using generative AI for content aggregation, the bank can either produce significantly more research output or enable analysts to focus on higher-value analytical work.

This use case is particularly relevant given what Leukert describes as market dynamics at "an all-time high" - the ability to produce ad-hoc research reports responding to recent events provides competitive advantage. The hypothesis presented is that market volatility and surprises will not slow down, making faster advisory capabilities increasingly valuable.

### Engineering Productivity

Deutsche Bank is evaluating generative AI for software development productivity, including code generation, test coverage improvement, and test automation. This aligns with broader industry trends - the panel referenced that 41% of code on GitHub is now AI-generated, a statistic that emerged within approximately 10 months despite GitHub being founded in 2008.

### Risk Model Enhancement

The bank is actively engaged with its Chief Risk Office to explore how risk models can be expanded using generative AI capabilities. With cloud infrastructure removing previous constraints on compute power, the vision is that banks will need to manage risks at a much more detailed level than historically possible, preparing for "unknown things that happen in future."

## Discover Financial Services' Implementation Approach

Discover has taken a deliberately methodical approach to generative AI adoption, with Conwell describing himself as "painfully patient" in moving projects to production.

### Governance Structure

Discover established a Center of Excellence (CoE) and Advisory Group for generative AI. The governance structure includes horizontal collaboration across business partners, strategy team, risk partners, and technology partners. Crucially, they have chosen to govern generative AI initiatives under their existing Model Risk Management framework, providing a familiar and rigorous control environment.

The organization is in the process of adding business and HR representatives to the framework, recognizing that generative AI impacts workforce planning and skills development, not just technology operations.

### Production Deployments

Discover's first production deployment was for compliance purposes - specifically monitoring state regulation changes that affect their products across all US states. This use case demonstrates a pattern of starting with internal, back-office applications where the risk profile is more manageable than customer-facing applications.

Additional initiatives in various stages include:
- A co-pilot implementation currently in pilot
- An engineering productivity solution being prepared for deployment in GitLab
- A RAG (Retrieval Augmented Generation) implementation for procedure summarization
- Evaluation of credit letter analysis for underwriting
- Marketing content generation use cases (though these are expected to take longer to reach production)

### Executive Sponsorship

Conwell emphasized that top-down sponsorship is critical for 2024, noting that this is "the year that POCs move into production." The CEO of Discover has begun requesting monthly updates on generative AI initiatives. This executive attention creates both opportunity and accountability for the technology organization.

## Operational and Governance Considerations

### Regulatory Engagement

Both banks emphasized the importance of proactive regulatory engagement. Discover is communicating with regulators about current activities and future plans, with formal detailed updates scheduled. The approach includes transparency about governance structures, the decision to use existing model risk management frameworks, and commitments to avoid customer-facing applications initially.

However, significant concern was expressed about regulatory uncertainty. Conwell mentioned hearing about potentially 300 pieces of legislation related to generative AI coming across industries. The fear is that even well-governed implementations could be impacted if another institution makes a significant mistake, triggering horizontal reviews and prescriptive requirements that slow the entire industry.

### Cost Management and FinOps

An interesting operational insight emerged around cost management. Conwell noted that organizations need "finops for gen AI" similar to cloud financial operations. The concern is proliferation of generative AI capabilities through SaaS providers and tools without proper cost visibility and ROI measurement. Until customer benefit, revenue benefit, or expense efficiency can be demonstrated, careful cost management is essential.

### Human-in-the-Loop Principles

Deutsche Bank has adopted a principle of "augmenting human capabilities, not replacing the human being." This means enabling people to work faster and be better prepared, while maintaining human accountability for decisions. Leukert drew a parallel to autonomous vehicles, suggesting that "agent bankers" who independently handle transactions are far in the future given accountability requirements.

### Data Residency and Geopolitical Considerations

A unique challenge for multinational institutions like Deutsche Bank is navigating data residency requirements across jurisdictions. Leukert expressed concern that geopolitical trends toward de-risking and reduced globalization could constrain the effectiveness of generative AI, as models benefit from broad data access but regulatory requirements may limit data to specific jurisdictions.

## Workforce and Skills Implications

Both leaders acknowledged significant workforce implications. Deutsche Bank conducted a study with a management consulting firm that concluded at least one-third of roles will change in certain ways or disappear entirely, with new roles emerging. This is described as a massive impact compared to other technology trends.

Conwell leads future-of-work initiatives for Discover's technology and operations group (since 2018) and emphasized the need to start conversations with employees about generative AI, including how to use it in current roles and how to upskill and reskill for new opportunities. The philosophy expressed is that good employees who understand company culture are preferable to external hires, so conscious upskilling efforts are warranted.

## Challenges and Risk Factors

The panel identified several key challenges for production deployment:

The traditional business case approach does not apply cleanly to generative AI - organizations don't know outcomes in advance, creating tension around who commits to projected savings. Deutsche Bank addressed this by grounding efforts in real business problems, applying capabilities in pilots, and measuring what is actually achievable.

Trust is foundational to banking, and any incident - whether a biased chatbot decision, discrimination, or hallucination affecting customers - could immediately constrain adoption across the entire industry. The interconnected nature of regulatory response means one institution's failure affects all participants.

The rapid pace of change creates organizational challenges. Leukert noted that capabilities impossible nine months ago are now possible, and this acceleration is "not a normal thing in an organization" - particularly for banks that historically move deliberately.

## Technology Platform Considerations

Both banks are engaged in broader cloud migration initiatives with Google Cloud, which provides context for their generative AI work. Moving distributed compute and structured data to cloud platforms creates advantages for AI/ML workloads by removing compute constraints and enabling model training and inference at scale.

The mention of Vertex AI (referenced as "Vortex AI" in the transcript) and Gemini indicates use of Google's enterprise AI platform, which provides managed infrastructure for model deployment, monitoring, and governance - key components of production LLMOps.

## Future Outlook

Looking ahead 2-3 years, both leaders expect significant impact but within practical adoption constraints. The anticipated evolution includes movement from back-office efficiency toward customer-facing applications, with marketing, customer journey enhancement, and revenue-generating capabilities becoming viable as governance frameworks mature and regulatory clarity improves.

Conwell suggested that organizations too far behind in adoption risk becoming acquisition targets, as those achieving financial benefits from generative AI will have stronger balance sheets and income statements. This competitive pressure creates urgency while the regulatory environment counsels caution.

The overall message is that generative AI is not optional for financial services - software vendors are universally embedding AI capabilities, making familiarity essential for educated evaluation of vendor claims. The question is not whether to adopt, but how to adopt responsibly while maintaining the trust that underpins banking relationships.