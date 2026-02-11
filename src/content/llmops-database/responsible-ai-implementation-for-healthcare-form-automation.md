---
title: "Responsible AI Implementation for Healthcare Form Automation"
slug: "responsible-ai-implementation-for-healthcare-form-automation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f414ca0bdd6540ca56f55"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:45:03.354Z"
  createdOn: "2024-11-21T14:18:52.498Z"
llmopsTags:
  - "compliance"
  - "document-processing"
  - "error-handling"
  - "fallback-strategies"
  - "google-gcp"
  - "guardrails"
  - "healthcare"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "monitoring"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
industryTags: "healthcare"
company: "WellSky"
summary: "WellSky, serving over 2,000 hospitals and handling 100 million forms annually, partnered with Google Cloud to address clinical documentation burden and clinician burnout. They developed an AI-powered solution focusing on form automation, implementing a comprehensive responsible AI framework with emphasis on evidence citation, governance, and technical foundations. The project aimed to reduce \"pajama time\" - where 75% of nurses complete documentation after hours - while ensuring patient safety through careful AI deployment."
link: "https://www.youtube.com/watch?v=78bnQExza3s"
year: 2024
seo:
  title: "WellSky: Responsible AI Implementation for Healthcare Form Automation - ZenML LLMOps Database"
  description: "WellSky, serving over 2,000 hospitals and handling 100 million forms annually, partnered with Google Cloud to address clinical documentation burden and clinician burnout. They developed an AI-powered solution focusing on form automation, implementing a comprehensive responsible AI framework with emphasis on evidence citation, governance, and technical foundations. The project aimed to reduce \"pajama time\" - where 75% of nurses complete documentation after hours - while ensuring patient safety through careful AI deployment."
  canonical: "https://www.zenml.io/llmops-database/responsible-ai-implementation-for-healthcare-form-automation"
  ogTitle: "WellSky: Responsible AI Implementation for Healthcare Form Automation - ZenML LLMOps Database"
  ogDescription: "WellSky, serving over 2,000 hospitals and handling 100 million forms annually, partnered with Google Cloud to address clinical documentation burden and clinician burnout. They developed an AI-powered solution focusing on form automation, implementing a comprehensive responsible AI framework with emphasis on evidence citation, governance, and technical foundations. The project aimed to reduce \"pajama time\" - where 75% of nurses complete documentation after hours - while ensuring patient safety through careful AI deployment."
---

## Overview

WellSky is a healthcare technology company that bridges the gap across the care continuum—from acute to post-acute to community care. The company serves more than 2,000 hospitals and 130,000 providers, processing over 100 million forms annually through their systems. Their core focus is on home-based healthcare, including home health, hospice, and personal care services, where clinicians visit patients directly at their homes.

The case study was presented as a panel discussion featuring Joel Doy (CTO of WellSky), Balky (Chief Architect of WellSky), and a product manager from Google's MedLM team, highlighting the collaborative nature of their partnership with Google Cloud.

## The Problem: "Pajama Time" and Clinical Burnout

WellSky identified a critical pain point in their user base that they termed "pajama time." A survey conducted approximately six months prior to the presentation revealed that about 75% of their home health nurses were spending time after work hours—when they should be with their families—completing clinical assessments and documentation from patient visits during the day.

This documentation burden is a significant driver of burnout and turnover in the healthcare industry. The problems stem from several factors:

- Systems that are not optimized for care delivery
- Excessive form-filling requirements with every patient visit
- Shortage of nurses and clinicians, particularly post-COVID
- High attrition rates in the nursing workforce
- Quality of care issues arising from errors when information from PDFs or faxes is manually transcribed incorrectly

The challenge was clear: how could WellSky leverage generative AI to allow clinicians to spend more time with patients and less time with administrative systems, while maintaining or improving the quality of care?

## Partnership with Google Cloud

WellSky's partnership with Google evolved from an initial focus on data center migration (approximately four years prior) to exploring generative AI capabilities. The interest in GenAI was sparked by the emergence of ChatGPT about 18 months before the presentation, prompting WellSky's leadership—including their CEO Bill Miller—to explore how this fundamental technology shift could help patients and providers.

The choice of Google as a partner was driven by several factors:

- Existing partnership infrastructure already in place
- Access to healthcare-specific models (MedPalm and MedPalm 2, pre-Gemini)
- Advanced services layered on top of basic models through Vertex AI
- Strong emphasis on responsible AI, with involvement from Bakul Patel who has experience with FDA's decision support frameworks
- Trust in Google's healthcare AI approach, which the speakers noted had not exhibited the concerning issues seen in some of Google's consumer-facing generative products

## Technical Approach and LLMOps Implementation

WellSky's approach to building their AI-powered solution was methodical and focused on establishing sustainable foundations for future AI development. They created a small cross-functional incubation team comprising senior developers, a product manager, a clinician, and legal, security, and compliance personnel.

### Governance Framework

The team established a comprehensive governance framework with policies, practices, and guidelines for governing the use, development, and deployment of AI across WellSky applications. This included:

- A registry of all applicable AI use cases across the organization
- A documented list of known risks and corresponding risk mitigation plans
- Security and privacy access controls applied to both applications and development tooling
- Check-ins throughout the development lifecycle, ensuring responsible AI is considered from the beginning rather than as a final checkpoint
- Incident management and escalation procedures for abnormal events detected in production

### Technical Foundation and Building Blocks

The technical workstream focused on learning the AI capabilities available in Google's Vertex AI platform, including document AI services, while emphasizing solutions to responsible AI risks. Key elements included:

- Bi-weekly calls with Google's product team (including product managers with clinical backgrounds) to evaluate use cases for realistic risks and develop mitigation plans
- Creation of reusable building blocks that encapsulate responsibility patterns, enabling broader development teams to accelerate delivery of similar use cases
- Tooling for system evolution, recognizing the rapidly changing nature of the AI landscape and the need to incorporate newer models, new prompting techniques, and additional context data without breaking existing functionality
- Production monitoring capabilities for auditing and detecting abnormal events requiring action

### Grounding and Evidence Citation

A particularly notable aspect of WellSky's implementation is their approach to grounding—addressing the risk of hallucinated outputs, especially in ambient conversation settings. They made evidence citations a ground requirement, refusing to launch any feature without it. For document extraction or transcript-based content, every piece of AI-generated output must be accompanied by evidence linking back to the source material. This approach mirrors Google's own health search functionality, which provides evidence linking to search results alongside generative answers.

### UI/UX Design for Responsible AI

The productization workstream addressed the user experience implications of responsible AI, including:

- New design patterns that make it obvious to end users where AI is being applied and how it works (transparency)
- Making AI assistance optional to avoid forcing users into potentially disruptive experiences
- Supporting progressive rollout strategies, allowing customers to start with power users before expanding to all users

## Key Learnings and Production Considerations

The WellSky team shared several critical lessons from their implementation journey:

Responsible AI adoption can initially feel overwhelming. The most practical approach is to start with use cases that have fewer applicable risks and expand the scope over time as the organization develops confidence and capabilities.

Client readiness for generative AI adoption varies significantly. With thousands of customers ranging from progressive early adopters to more conservative organizations, WellSky needed to gather feedback from across this spectrum. The UI/UX design must account for these varying comfort levels and organizational readiness.

Successful adoption requires AI assistance to be optional. Forcing AI on end users creates disruptive experiences and can undermine adoption. Customers often prefer rolling out features to power users first before broader deployment.

Perhaps most importantly, the team emphasized that there is no AI strategy without an API or data strategy. WellSky found significant value in Google Cloud's native integration between the Vertex AI platform and database services like BigQuery, as well as healthcare-specific services like FHIR stores. This seamless integration between AI capabilities and underlying data infrastructure proved essential for their implementation.

## Production Operations Considerations

The case study reveals several mature LLMOps practices:

- Monitoring and auditing infrastructure for detecting abnormal events in production
- Incident management procedures for responding to issues
- Tooling designed to support model updates and prompt engineering changes without system disruption
- Integration with existing healthcare data infrastructure (FHIR, BigQuery)
- A governance framework that spans the entire development and deployment lifecycle

While specific metrics on production performance were not shared, the structured approach to building reusable components and establishing governance frameworks suggests WellSky is positioning themselves for scaled AI deployment across their product portfolio, not just a single use case.

## Critical Assessment

While the presentation highlights the thoughtful approach WellSky took to implementing generative AI, a few caveats are worth noting. The presentation was made in a partnership context with Google, so there is inherent promotional motivation. Specific quantitative outcomes (reduction in documentation time, error rates, user satisfaction) were not provided—the solution appears to still be in early stages or limited rollout.

The emphasis on responsible AI governance and evidence citation requirements suggests strong awareness of the risks inherent in healthcare AI, though the actual effectiveness of these controls in preventing harmful outputs remains to be demonstrated through broader deployment. The admission that client readiness varies widely also suggests potential challenges in achieving widespread adoption.

Overall, this case study represents a thoughtful approach to deploying LLMs in a high-stakes healthcare environment, with particular attention to governance, grounding, and operational considerations that are essential for responsible production deployment.