---
title: "Evolution from Centralized to Federated Generative AI Governance"
slug: "evolution-from-centralized-to-federated-generative-ai-governance"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6911f642d9228e6dae6daba3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:26:58.425Z"
  createdOn: "2025-11-10T14:27:14.460Z"
llmopsTags:
  - "healthcare"
  - "fraud-detection"
  - "document-processing"
  - "summarization"
  - "translation"
  - "question-answering"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "rag"
  - "prompt-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "human-in-the-loop"
  - "evals"
  - "api-gateway"
  - "monitoring"
  - "databases"
  - "guardrails"
  - "compliance"
  - "security"
  - "orchestration"
  - "devops"
  - "microservices"
  - "serverless"
  - "documentation"
  - "scaling"
  - "amazon-aws"
  - "anthropic"
industryTags: "finance"
company: "Pictet AM"
summary: "Pictet Asset Management faced the challenge of governing a rapidly proliferating landscape of generative AI use cases across marketing, compliance, investment research, and sales functions while maintaining regulatory compliance in the financial services industry. They initially implemented a centralized governance approach using a single AWS account with Amazon Bedrock, featuring a custom \"Gov API\" to track all LLM interactions. However, this architecture encountered resource limitations, cost allocation difficulties, and operational bottlenecks as the number of use cases scaled. The company pivoted to a federated model with decentralized execution but centralized governance, allowing individual teams to manage their own Bedrock services while maintaining cross-account monitoring and standardized guardrails. This evolution enabled better scalability, clearer cost ownership, and faster team iteration while preserving compliance and oversight capabilities."
link: "https://www.youtube.com/watch?v=SIlPwOv3mGs"
year: 2025
seo:
  title: "Pictet AM: Evolution from Centralized to Federated Generative AI Governance - ZenML LLMOps Database"
  description: "Pictet Asset Management faced the challenge of governing a rapidly proliferating landscape of generative AI use cases across marketing, compliance, investment research, and sales functions while maintaining regulatory compliance in the financial services industry. They initially implemented a centralized governance approach using a single AWS account with Amazon Bedrock, featuring a custom \"Gov API\" to track all LLM interactions. However, this architecture encountered resource limitations, cost allocation difficulties, and operational bottlenecks as the number of use cases scaled. The company pivoted to a federated model with decentralized execution but centralized governance, allowing individual teams to manage their own Bedrock services while maintaining cross-account monitoring and standardized guardrails. This evolution enabled better scalability, clearer cost ownership, and faster team iteration while preserving compliance and oversight capabilities."
  canonical: "https://www.zenml.io/llmops-database/evolution-from-centralized-to-federated-generative-ai-governance"
  ogTitle: "Pictet AM: Evolution from Centralized to Federated Generative AI Governance - ZenML LLMOps Database"
  ogDescription: "Pictet Asset Management faced the challenge of governing a rapidly proliferating landscape of generative AI use cases across marketing, compliance, investment research, and sales functions while maintaining regulatory compliance in the financial services industry. They initially implemented a centralized governance approach using a single AWS account with Amazon Bedrock, featuring a custom \"Gov API\" to track all LLM interactions. However, this architecture encountered resource limitations, cost allocation difficulties, and operational bottlenecks as the number of use cases scaled. The company pivoted to a federated model with decentralized execution but centralized governance, allowing individual teams to manage their own Bedrock services while maintaining cross-account monitoring and standardized guardrails. This evolution enabled better scalability, clearer cost ownership, and faster team iteration while preserving compliance and oversight capabilities."
---

## Overview

Pictet Asset Management, a global financial services firm with over 1,000 employees across offices in Japan, America, and Europe, embarked on an 18-month journey to build production-ready generative AI capabilities while maintaining strict governance and compliance standards. This case study, presented jointly by Pictet's Pieter Benoit Carton and AWS Solutions Architect GMO Fondino, chronicles the evolution of their LLMOps approach from an initial centralized architecture through a critical pivot to a federated model with centralized governance. The presentation offers rare transparency into the operational realities and architectural trade-offs faced when scaling generative AI from proof-of-concept to production in a heavily regulated industry.

The context for this journey is important: Pictet AM experienced a rapid explosion of generative AI use cases across diverse business functions. These included translation services for publications from English to Japanese, sales assistant tools that retrieve product information and insights for customer interactions, RFP (Request for Proposal) automation solutions in Japan to accelerate response times, investment research platforms that analyze both external data and internal analyst reports to inform investment decisions, and a citizen developer platform that provided business analysts and financial professionals with Python development capabilities enhanced by LLM access. This diversity of use cases—spanning marketing, compliance, sales, investment research, and development—created significant governance challenges that required careful architectural considerations.

## Governance Framework and Requirements

The governance framework at Pictet AM was built on four foundational pillars that shaped their entire LLMOps approach. First, industry scrutiny and regulatory compliance were paramount. As a regulated financial institution subject to oversight from FINMA, FCA, and the EU AI Act, Pictet must demonstrate accountability and transparency in all AI-driven decisions. The disclosure of AI usage has transitioned from exception to norm, and failure to provide clear explanations for AI-based decisions risks significant reputational damage and loss of client confidence. This regulatory environment fundamentally constrains architectural choices and operational procedures.

Second, data protection and confidentiality presented complex challenges. The organization needed to carefully consider which data could be used for AI projects, what confidentiality and sensitivity classifications applied, and crucially, which data could safely be sent to LLM services. Even though AWS runs services within its own network providing certain security guarantees, additional considerations around GDPR, data residency requirements, and sector-specific regulations applied. The principle that emerged was clear: AI must never compromise confidence, compliance, or auditability.

Third, cost management required proactive attention. Beyond the obvious direct costs of LLM API calls, hidden costs in data storage, network traffic, and compute resources needed careful tracking. The presentation highlighted a concrete example where a small proof-of-concept project escalated from approximately $100 per day to $2,000 per day overnight, demonstrating how quickly costs can spiral without proper controls. This underscored the need for finance teams to forecast expenses and implement early cost control mechanisms before projects reach production scale.

Fourth, ongoing oversight through testing, consistency validation, reliability monitoring, and prompt auditing was essential. Internal governance structures including business risk committees and information security teams needed to analyze every project for appropriate data usage and risk exposure. This multi-layered review process created operational overhead that architectural decisions needed to accommodate.

## Initial Architecture: Centralized Governance

Pictet's initial approach to managing generative AI governance was to implement a fully centralized architecture. The rationale was compelling: with multiple teams operating in separate AWS accounts without coordinated governance, there was no silver bullet for governing multi-account Bedrock services effectively. Implementing governance controls individually in every account would be cumbersome and inconsistent. The promise of centralization was attractive—common security guardrails, unified compliance validation, simplified implementation through managed services, consolidated cost visibility, and automatic compliance for any team using the platform.

The technical implementation centered on a dedicated AWS account that provided both Bedrock services and a development environment. Teams accessed this central account to use SageMaker, create agents, develop workloads, test solutions, and eventually deploy to their client accounts. The critical innovation was what they called the "Gov API"—essentially a Lambda function exposed through API Gateway that intercepted every interaction with LLM services. This API tracked all calls, captured comprehensive metadata including which team was making requests, which models were being used (Claude, Titan, or others), what prompts were being submitted, and what projects the usage supported. All this information was logged to S3, creating a centralized audit trail for data leak protection, compliance reviews, and usage analysis.

The gateway enforcement mechanism was crucial: before any team could move a workload to production, Pictet's AI platform team conducted code reviews to ensure the Gov API was properly integrated. This gave the central team visibility into all production LLM usage across the organization. On paper, this architecture appeared to solve the governance challenge elegantly while maintaining strict oversight.

## Reality Check: Limitations of Centralization

As Pictet notes candidly, reality diverged from the theoretical benefits as the platform scaled. The first major constraint was resource limitations, specifically AWS service quotas. While managing two proof-of-concept projects with a single centralized Bedrock account was feasible, adding more projects quickly exhausted available quotas. Teams began competing for the same limited resources. While AWS allowed quota increases and eventually introduced cross-region inference profiles (which distribute calls across multiple regions to manage quotas more effectively), these solutions merely postponed rather than solved the fundamental problem.

The operational bottleneck proved equally challenging. As the central team became responsible for managing everything, they found themselves with access to every project and account, creating an overwhelming support burden. Responding to requests from multiple teams became increasingly difficult, and the team's role shifted from enablement to becoming a constraint on velocity. The very governance mechanism designed to ensure compliance was slowing innovation.

Cost allocation emerged as a surprisingly complex problem in the centralized model. While tracking costs for one or two teams was manageable, distributing expenses across five, six, or seven teams proved difficult. Different models have different pricing structures, token costs vary, and call patterns differ significantly across use cases. AWS tagging mechanisms, which work well for many resource types, cannot tag individual LLM API calls, making granular cost attribution nearly impossible. The finance team struggled to accurately allocate expenses to the correct projects and teams, creating overhead and reducing accountability.

The turning point came with the introduction of knowledge bases—a managed RAG service that transforms documents into vector embeddings stored in a vector database for retrieval. Multiple teams wanted to use this capability, but knowledge bases need to connect to S3 buckets where source documents are stored. When these buckets resided in team-specific AWS accounts rather than the central governance account, complex cross-account IAM roles and permissions were required. Managing one cross-account connection was straightforward, but as multiple teams requested this capability, the role and responsibility boundaries became blurred. The central team found themselves deeply entangled in account-specific configurations that should have been team responsibilities.

## Architectural Evolution: Federated with Centralized Governance

Faced with these operational realities, Pictet returned to first principles and asked what they truly needed: empowering teams while maintaining strong governance, enabling teams to manage their own Bedrock services and own their costs, and allowing rapid iteration while ensuring compliance. The solution was a shift to what they term "decentralized approach with centralized governance"—a federated model where execution is distributed but oversight remains unified.

In this evolved architecture, each consumer AWS account manages its own Bedrock services independently. Teams provision their own resources, manage their own quotas (eliminating competition with other teams), and own their costs directly. However, Pictet's central AI platform team maintains cross-account IAM roles that provide read-only monitoring access to all accounts. This allows them to continue gathering logs, tracking model usage, monitoring knowledge base implementations, and auditing data connections centrally while eliminating the operational burden of day-to-day service management.

The shared responsibility model became explicit and clear. The central AI platform team focuses on onboarding new teams with standardized processes, providing reference implementations of guardrails that can be consistently applied, sharing knowledge and best practices from earlier implementations, offering centralized data leak protection mechanisms, and developing lateral MLOps tools that benefit multiple teams. Individual teams, meanwhile, are fully autonomous in enabling services, configuring their environments, and managing their specific use cases within the guardrail framework.

This represents a fundamental shift in the central team's role from providing AI services to overseeing AI usage—from being in the critical path of every implementation to being an enabler and governance layer. The presenter notes honestly that this transition is still underway and they remain in the implementation phase, acknowledging uncertainty about whether this model will ultimately prove sustainable or require further evolution.

## LLMOps Principles and Lessons

Throughout the presentation, several broader LLMOps principles emerged that extend beyond Pictet's specific architecture. AWS's perspective, as articulated by GMO Fondino, emphasized three foundational areas: speed, customization, and scale. Moving quickly requires identifying relevant, powerful, and viable use cases (both internal efficiency improvements and external customer-facing applications), involving the right stakeholders early (builders, business analysts, decision makers, security, compliance), maintaining clear roadmaps, and treating data as a differentiator. The accessibility of generative AI to non-specialist profiles—business analysts, developers, security teams, marketing—contrasts with traditional ML's requirement for data scientists, but this democratization necessitates proper training and security-conscious development practices.

Customization demands architectural flexibility because large language models evolve continuously, becoming faster, more accurate, and cheaper. Organizations must be prepared to experiment, test, and switch between models and tools for different use cases. Security must be foundational rather than added later, with considerations including encryption at rest and in transit, VPC isolation, and data residency. The often-overlooked reality is that foundational models and data only create value when supported by appropriate tools and services to integrate them effectively.

Scaling to production requires clear metrics defined from the outset: how will return on investment be measured, and what ongoing monitoring metrics will track performance and cost? Optimization must be continuous—as models evolve, applications must adapt through ongoing testing and validation. Compliance and governance structures must be in place with responsible use policies. Finally, generative AI must integrate into the broader technology ecosystem with infrastructure that supports growth rather than constrains it.

The financial services industry has evolved from relatively simple use cases like document summarization and compliance investigations to more sophisticated applications like investment research platforms that analyze complex data relationships. This increasing sophistication amplifies the importance of mature LLMOps practices.

## Critical Assessment and Trade-offs

This case study offers valuable transparency about the real operational challenges of LLMOps at scale, though it's important to evaluate the claims and approach with some critical perspective. The presentation is jointly delivered by AWS and a customer, which introduces potential bias toward AWS services and architectural patterns. However, the honest discussion of failures and architectural pivots suggests genuine experience rather than polished marketing.

The centralized governance approach that initially failed is a common pattern in enterprise LLMOps—it appears to offer control and visibility but often creates bottlenecks precisely as the presenter describes. The pivot to federated architecture acknowledges that different organizational units have different velocity requirements and that enabling autonomy within guardrails is more sustainable than central control. However, this approach has its own risks: enforcement of standardized guardrails across autonomous teams requires cultural buy-in and cannot rely solely on technical controls. The case study doesn't deeply explore how they ensure teams actually implement the recommended guardrails or what happens when teams deviate.

The custom "Gov API" represents thoughtful engineering to solve prompt logging and audit requirements, but it also introduces a potential single point of failure and performance bottleneck. While the presentation mentions this API continues in the federated model, it's unclear whether it remains mandatory or becomes optional, which would affect its utility for comprehensive audit trails. The inability to use AWS tagging for cost allocation at the API call level is a genuine limitation that affects many organizations, and their acknowledgment of manual cost allocation overhead is realistic.

The knowledge base cross-account access problem that triggered their architectural rethink is interesting because it highlights how managed services can create unexpected operational complexity. While AWS Knowledge Bases abstract away vector database management, they introduce IAM complexity in multi-account environments. The trade-off between managed service convenience and architectural flexibility is a recurring theme in LLMOps that this case study illustrates well.

The presenter's acknowledgment that they're still implementing the federated model and may need to evolve further demonstrates appropriate humility. The statement that "change is inevitable" and "you need to be able to adapt quickly" reflects the reality that LLMOps best practices are still emerging and no architecture is final. This is honest but also means the case study presents an in-progress solution rather than validated success.

## Operational Considerations

Several operational aspects deserve attention. The code review requirement before production deployment in the centralized model ensured Gov API integration but created review burden. It's unclear whether this continues in the federated model or how compliance is verified when teams are autonomous. The cross-account IAM roles for monitoring in the federated architecture require careful permission management—too much access reintroduces centralization problems, too little access undermines governance visibility.

The cost explosion example ($100 to $2,000 per day) illustrates the importance of quota limits and budget alerts, but the presentation doesn't detail what specific mechanisms they implemented beyond visibility. Effective cost management requires not just monitoring but automated controls like spending limits, alert thresholds, and potentially circuit breakers that pause expensive operations.

The data leak protection mentioned as a centralized service is critical but underspecified. It's unclear whether this involves real-time prompt filtering, post-hoc analysis of logged prompts, or both. The technical implementation details and false positive rates would be valuable context for assessing this approach's viability.

## Conclusion and Broader Implications

Pictet Asset Management's LLMOps journey represents a microcosm of challenges facing enterprise AI adoption in regulated industries. Their experience validates several important principles: governance architecture must evolve as usage scales, centralized control often becomes a bottleneck, federated autonomy with centralized oversight offers better scalability, cost allocation requires purpose-built mechanisms beyond standard cloud billing, and operational reality trumps theoretical architectural elegance. The presenter's final message—that success requires adaptation, change is inevitable, and balance between control and velocity is essential—reflects mature understanding of LLMOps challenges.

For organizations beginning similar journeys, this case study suggests starting with simpler governance mechanisms that can scale rather than comprehensive centralized control that may need to be unwound. It also highlights the importance of designing for cost allocation from the beginning rather than treating it as an afterthought. The specific AWS services used (Bedrock, Lambda, API Gateway, S3, SageMaker, Knowledge Bases) are less important than the architectural patterns and governance principles that could apply across cloud providers. The honest discussion of what didn't work makes this case study more valuable than typical success-only narratives, though the lack of quantitative metrics (adoption rates, cost savings, time-to-production improvements) limits full assessment of the outcomes. Overall, this represents a valuable contribution to understanding real-world LLMOps implementation challenges in enterprise financial services environments.