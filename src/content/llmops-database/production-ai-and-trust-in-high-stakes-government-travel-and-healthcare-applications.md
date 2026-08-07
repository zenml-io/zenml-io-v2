---
title: "Production AI and Trust in High-Stakes Government, Travel, and Healthcare Applications"
slug: "production-ai-and-trust-in-high-stakes-government-travel-and-healthcare-applications"
draft: false
llmopsTags:
  - "healthcare"
  - "fraud-detection"
  - "customer-support"
  - "document-processing"
  - "chatbot"
  - "content-moderation"
  - "classification"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "memory"
  - "harness-engineering"
  - "prompt-engineering"
  - "embeddings"
  - "monitoring"
  - "guardrails"
  - "langchain"
  - "crewai"
  - "postgresql"
  - "redis"
  - "chromadb"
  - "pinecone"
  - "wandb"
  - "openai"
  - "anthropic"
industryTags: "government"
company: "Oracle / CA DMV / Tripadvisor"
summary: "This panel discussion brings together AI leaders from California DMV, Tripadvisor, and Oracle Health to explore the challenges of deploying LLM-based systems in production environments where failures have serious consequences. The panelists discuss how they ensure trust and reliability when deploying AI agents and GenAI applications that impact millions of users across government services, travel recommendations, and healthcare decisions. Key themes include the importance of human-in-the-loop processes, comprehensive testing frameworks, multi-layered monitoring strategies, and the challenges of maintaining explainability and trust when moving from single-agent systems to multi-agent workflows. The discussion reveals that while traditional software has mature SDLC processes with robust CICD pipelines, AI systems require fundamentally different approaches including qualitative feedback loops, extensive instrumentation, and transparency in reasoning to build and maintain user trust."
link: "https://www.youtube.com/watch?v=hXk-Ahocp04"
year: 2026
seo:
  title: "Oracle / CA DMV / Tripadvisor: Production AI and Trust in High-Stakes Government, Travel, and Healthcare Applications - ZenML LLMOps Database"
  description: "This panel discussion brings together AI leaders from California DMV, Tripadvisor, and Oracle Health to explore the challenges of deploying LLM-based systems in production environments where failures have serious consequences. The panelists discuss how they ensure trust and reliability when deploying AI agents and GenAI applications that impact millions of users across government services, travel recommendations, and healthcare decisions. Key themes include the importance of human-in-the-loop processes, comprehensive testing frameworks, multi-layered monitoring strategies, and the challenges of maintaining explainability and trust when moving from single-agent systems to multi-agent workflows. The discussion reveals that while traditional software has mature SDLC processes with robust CICD pipelines, AI systems require fundamentally different approaches including qualitative feedback loops, extensive instrumentation, and transparency in reasoning to build and maintain user trust."
  canonical: "https://www.zenml.io/llmops-database/production-ai-and-trust-in-high-stakes-government-travel-and-healthcare-applications"
  ogTitle: "Oracle / CA DMV / Tripadvisor: Production AI and Trust in High-Stakes Government, Travel, and Healthcare Applications - ZenML LLMOps Database"
  ogDescription: "This panel discussion brings together AI leaders from California DMV, Tripadvisor, and Oracle Health to explore the challenges of deploying LLM-based systems in production environments where failures have serious consequences. The panelists discuss how they ensure trust and reliability when deploying AI agents and GenAI applications that impact millions of users across government services, travel recommendations, and healthcare decisions. Key themes include the importance of human-in-the-loop processes, comprehensive testing frameworks, multi-layered monitoring strategies, and the challenges of maintaining explainability and trust when moving from single-agent systems to multi-agent workflows. The discussion reveals that while traditional software has mature SDLC processes with robust CICD pipelines, AI systems require fundamentally different approaches including qualitative feedback loops, extensive instrumentation, and transparency in reasoning to build and maintain user trust."
notion:
  pageId: "3b5f8dff-2538-804f-8fda-d109f91f384d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:27:00.000Z"
  lastEditedTime: "2026-08-07T12:27:00.000Z"
  publishedAt: "2026-08-07T13:09:39Z"
---

## Overview

This panel discussion features three organizations at the cutting edge of production AI deployment: the California Department of Motor Vehicles, Tripadvisor, and Oracle Health. Together, these organizations serve hundreds of millions of users and handle critical decisions affecting everything from travel recommendations to healthcare outcomes to government identity services. The central theme of the discussion is that when AI fails in these contexts, it is not merely a technical bug but a matter of trust, compliance, and in healthcare cases, potentially life and death.

The moderator sets the stage by noting that Claude's 99.3% uptime over 30 days would result in termination for any site reliability engineer, yet this level of reliability is currently accepted for LLM systems because of their novelty. The panelists, however, do not have this luxury given the critical nature of their applications.

## California DMV: Government Services and Identity Management

Ajay Gupta represents the California DMV, an organization that serves 70 million in-person customers and 13 million online customers annually, processing 75 million transactions and collecting $14 billion in revenue. The DMV has issued 34 million identities for California's 39 million residents. As a government entity, the DMV treats itself as a retail organization with a transformation agenda focused on reducing friction and the need for in-person visits, particularly for millennial populations who prefer digital services.

The DMV's AI journey began well before the current GenAI wave, with traditional AI and machine learning applications. Their first GenAI application launched in 2023, notably early for a state government organization. This initial use case was surprisingly practical: filtering out inappropriate content from custom license plate requests. Users get creative with mirror images, numbers, and multiple languages to bypass traditional filtering systems, and GenAI proved effective at catching these attempts.

Beyond license plates, the DMV uses AI defensively to combat AI-generated fraud. With the release of mobile driver's licenses and remote identity verification services, the organization faces sophisticated attempts to create fake identities using AI and machine learning. They counter these threats with their own AI-powered verification systems, creating an adversarial AI environment.

Current GenAI applications at the DMV include chatbots and knowledge base systems for service fulfillment, document processing and verification for uploaded materials, code generation and testing automation, and monitoring of security and infrastructure systems. The testing automation represents a newer initiative that shows the expanding scope of AI applications beyond customer-facing use cases.

## Tripadvisor: Travel Commerce at Scale

Rahul Totkar heads data and AI at Tripadvisor, a platform with 300 million monthly active users across 42 countries and 21 languages, with 2 billion reviews and opinions. Like the DMV, Tripadvisor has a long history with traditional AI applications including search, recommendations, auction systems, predictive models, and media buying.

The current focus at Tripadvisor centers on two major initiatives. First, agentic commerce represents a fundamental rethinking of how to match travel demand to supply using multi-agent systems and workflow-driven architectures. Second, the organization is building what they describe as a context graph with proper ontology and taxonomy to make their massive dataset available in near real-time across various storage formats including vector databases and graph databases with the highest quality, lowest latency, and maximum accuracy.

## Oracle Health: Clinical Decision Support

Anshu Trivedi leads GenAI initiatives at Oracle Health, which acquired Cerner in 2022, making it the second-largest electronic health record system in the United States after Epic. The charter involves creating a health data intelligence layer that makes patient care more affordable for providers and payers while improving efficiency by connecting the ecosystem across providers, payers, and pharmaceutical companies including drug discovery and clinical trials.

Oracle Health is building what they call a unified data layer and memory fabric that enables different agents to access consolidated patient information across the healthcare ecosystem. A key application is AI patient prioritization, a causal model that identifies patients at risk of acute hospitalization so they can be brought in preemptively, saving both health outcomes and insurance costs. This involves ranking patients, but the critical requirement is surfacing the reasoning behind rankings so that nurses and clinicians understand why certain patients are prioritized.

## Trust as a Central Challenge

All three panelists emphasize that trust takes years or decades to build but can be lost instantly. In Tripadvisor's case, a vegetarian user receiving a steakhouse recommendation or a parent traveling with children being suggested a nightclub as an activity destroys trust immediately. With multiple alternatives available, regaining that trust becomes nearly impossible.

For the DMV, trust is fundamental to their ability to operate. As a taxpayer-funded public entity, they are accountable to everyone, not just shareholders. Citizens may tolerate typical DMV service frustrations, but they never compromise on privacy expectations. The DMV is trusted with personal information and data, and this trust extends to the timely and accurate provision of data to employers, insurance companies, and law enforcement for road safety purposes. Privacy-preserving data sharing is essential, particularly given regulations like HIPAA that the health industry faces.

In healthcare, the stakes are literally life and death. Oracle Health's systems surface recommendations to care providers who must make clinical decisions. If the AI is not transparent about why it recommends certain actions, clinicians cannot trust it even if it meets compliance requirements. Compliance is described as the minimum bar; trust goes beyond to achieve the ultimate goal of better patient care.

## The SDLC Gap for AI Systems

A recurring theme in the discussion is that traditional software engineering has well-established software development lifecycle processes with robust CICD pipelines, testing frameworks, and rollback mechanisms. When launching AI products, especially with AI agents, these established processes are insufficient. The non-deterministic nature of LLMs and the complexity of multi-agent systems require fundamentally different approaches.

Tripadvisor has responded by building and instrumenting new processes and checks. Some are automated using custom harnesses and scaffolding around existing tooling. They rely heavily on Arize for observability and tracing. However, they still maintain human-in-the-loop validation at multiple points before pushing anything to production. While this delays deployment timelines, they consider it essential for maintaining trust and quality.

The DMV takes an even more conservative approach. For every automated service using AI and robotics, human-in-the-loop verification is mandatory. This is particularly important given the volume of paper they still process: 90 million pieces of outgoing mail and 11 million pieces of incoming mail annually. Automation is essential to handle this volume, but safeguards are equally critical.

## Testing and Validation Strategies

The DMV employs a multi-layered testing strategy. First, they leverage their unique position as a monopoly provider (acknowledged with some self-awareness). Because citizens have no alternative, the DMV can collect substantial data even from limited releases, enabling robust A/B testing and comparison against the status quo. Every new release, including new LLM models, undergoes verification against baseline performance.

Second, they implement secondary verification steps. In some cases, this involves sampling; in others, it is 100% verification as required by law. Explainability from LLMs is important, but it alone is not sufficient for critical decisions. For high-stakes scenarios like commercial driver's license approvals, human oversight is always present.

Third, the DMV conducts what-if analysis on production systems or production data before deployment to understand behavior proactively. They start small with limited populations and use cases before scaling up, creating a tiered rollout strategy that balances innovation with risk management.

## Comprehensive Monitoring and KPIs

Tripadvisor emphasizes the critical importance of clearly defined KPIs before launching any product, feature, or even server-side component. They distinguish between primary metrics, quarterly metrics, and secondary metrics for every aspect of deployment. This clarity provides direction for measurement and target-setting.

Once KPIs are established, they set up dashboards and monitors at multiple levels. Beyond top-level KPIs, they define system metrics and performance indicators, pushing data into various monitoring systems including log aggregation, Grafana dashboards for visualization, and Arize for specific AI monitoring capabilities. This elaborate monitoring ecosystem is considered mandatory for production AI.

Beyond quantitative metrics, Tripadvisor collects qualitative feedback through NPS scores, quality ratings, and thumbs up/thumbs down mechanisms on chat applications. For their recommendation systems suggesting activities, accommodations, and dining for trips, they provide explanations and mechanisms for users to indicate whether recommendations hit the mark. Since not all users leave feedback, they also conduct periodic surveys to understand how systems are performing.

The DMV similarly employs both proactive and reactive monitoring. Proactive measures include normal testing processes and what-if analysis. Reactive monitoring has two tiers: small-r reactive involves starting with limited populations and use cases; big-R reactive involves comprehensive monitoring through tools like Arize, Splunk, and Grafana. However, they note a challenge with having a plethora of technologies creating noise versus signal problems.

The worst type of reaction comes from the real world: customer reports through CSAT scores or actual complaints to the customer support center. While the DMV acknowledges having monopoly status, they emphasize caring deeply about customers getting what they need when they need it, making these complaints particularly expensive both in terms of perception and business impact.

## Explainability and Transparency Requirements

Oracle Health provides perhaps the clearest articulation of why explainability matters beyond compliance. When surfacing AI recommendations to nurses and care providers who must take actions, transparency in the reasoning is essential. If a system merely states that a patient needs a certain action without explaining the underlying factors, clinicians cannot make informed decisions.

Their AI patient prioritization system exemplifies this challenge. The system uses a causal model to rank patients by risk of acute hospitalization. However, if they rank some patients with critical care needs lower than others without explanation, it could have serious consequences. The system must surface that a patient has a specific allergy, is on a medication recommended by a specialist, and this combination violates certain triggers indicating potential attacks or fatalities if not addressed.

To achieve this transparency, Oracle Health defines traces showing all layers of information the AI uses to reach conclusions. When a nurse sees a next-best-action recommendation like following up with a specialist about medication, they can click through to see the reasoning: this step happened, then this step happened, revealing the medication-allergy interaction. Without this visibility, clinicians will not trust or act on the recommendations, rendering the AI useless regardless of its technical accuracy.

## The Multi-Agent Challenge

The discussion reveals significant challenges when moving from single-agent systems to multi-agent workflows. Anshu Trivedi identifies a critical problem: LLMs fundamentally want to please their users and optimize for their assigned goals. When multiple agents work together, each with its own cost-reward function, they may optimize for their individual goals at the expense of the overall objective.

In clinical trial matching, one agent might focus on zip codes and demographics while another examines clinical notes for biomarkers. If there is no correlation optimization ensuring that a trial site in a specific zip code matches the oncology trial requiring specific biomarkers, the system fails. The agents are not co-learning from each other, leading to suboptimal results.

This observation is leading Oracle Health toward developing a common memory layer and shared tracing mechanisms. The goal is for agents to share their reasoning with each other, enabling cross-learning so the coordinator in the agent harness can manage the overall workflow effectively. However, they acknowledge not yet having solved this problem, particularly for long-running jobs where some agents complete quickly while others take much longer. Retaining context and managing memory across these asynchronous workflows remains an active area of research.

This challenge echoes broader industry efforts, with OpenAI exploring hierarchical memory and the development of persistent memory systems with unique user identities. The transition from single LLM calls to single agents to teams of agents reveals increasingly complex orchestration and memory management requirements.

## Tools and Technologies in Production

The panel references several specific tools and platforms used in production environments. Arize emerges as a prominent choice for AI observability and tracing, mentioned by both Tripadvisor and the DMV. Grafana provides dashboard visualization for system metrics. Splunk serves log aggregation and analysis needs. The DMV also mentions using a variety of other tools, though the proliferation of technologies creates its own challenges in terms of managing signal-to-noise ratios.

For storage and data infrastructure, Tripadvisor is building systems supporting vector databases and graph databases with proper schema and formats optimized for LLM access. Oracle Health is developing what they consistently refer to as a unified memory fabric and data intelligence layer, enabling consistent access to patient information across their ecosystem.

## Conservative Deployment Approaches

A clear theme across all three organizations is conservative, measured deployment of AI systems despite pressure to move quickly. This contrasts with the broader industry narrative around rapid AI adoption. Tripadvisor acknowledges that human-in-the-loop processes delay their timelines but considers this essential for quality and trust. The DMV is explicit about not rushing to adopt automation just because it is technically possible, carefully evaluating data retention, usage, and privacy implications before deployment.

This conservative approach extends to rollout strategies. The DMV benefits from high transaction volumes that allow rapid data collection even from limited releases, enabling thorough testing before broader deployment. They always verify new releases including new LLM models against the status quo, using their existing services as a baseline for comparison.

## Balancing Innovation and Regulation

The panel highlights the unique challenges faced by regulated industries and government entities. The DMV must ensure privacy preservation while making data available to legitimate stakeholders. They must comply with legal requirements for certain verification processes, mandating 100% human review in some cases. Oracle Health operates in a healthcare environment with strict HIPAA compliance requirements, where meeting regulatory minimums is just the starting point.

These constraints shape how these organizations approach LLMOps differently from companies in less regulated industries. They cannot afford to adopt the "move fast and break things" mentality that might work for consumer applications with lower stakes. Their LLMOps practices must integrate regulatory compliance, audit trails, and explainability from the ground up rather than retrofitting these capabilities later.

## Organizational Accountability

The discussion touches on accountability structures. The DMV contrasts itself with private companies accountable to shareholders, noting their accountability to all taxpayers. This public sector accountability creates different risk calculations and decision-making processes. While private companies might accept certain failure rates in pursuit of competitive advantage, government entities face public scrutiny and political consequences for failures that undermine trust.

In healthcare, accountability extends to patient outcomes and safety. Oracle Health's systems assist clinical decision-making, creating shared accountability between the AI system and the healthcare providers using it. This is why transparency and explainability are non-negotiable: clinicians must be able to independently verify AI recommendations and understand the reasoning to maintain professional accountability for patient care.

## Lessons for LLMOps Practitioners

This panel discussion offers several important lessons for LLMOps practitioners. First, traditional SDLC processes are insufficient for AI systems, requiring new frameworks for testing, monitoring, and deployment. Second, trust in high-stakes environments requires going beyond technical accuracy to include explainability, transparency, and human oversight. Third, the transition from single-agent to multi-agent systems introduces new challenges around coordination, memory management, and goal alignment that current tools and practices have not fully solved.

Fourth, comprehensive monitoring must combine quantitative metrics, qualitative feedback, and real-world user responses to provide a complete picture of system performance. Fifth, conservative deployment strategies with human-in-the-loop validation may slow time-to-market but are essential for maintaining trust and avoiding costly failures. Finally, compliance and regulation should be viewed as minimum requirements rather than ultimate goals, with additional layers of transparency and quality assurance needed to achieve true trustworthiness in production AI systems.
