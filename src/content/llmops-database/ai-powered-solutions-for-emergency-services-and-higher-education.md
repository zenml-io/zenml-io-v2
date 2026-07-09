---
title: "AI-Powered Solutions for Emergency Services and Higher Education"
slug: "ai-powered-solutions-for-emergency-services-and-higher-education"
draft: false
llmopsTags:
  - "customer-support"
  - "healthcare"
  - "high-stakes-application"
  - "chatbot"
  - "question-answering"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "fallback-strategies"
  - "system-prompts"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "microservices"
  - "orchestration"
  - "serverless"
  - "google-gcp"
industryTags: "telecommunications"
company: "Viiz / Strategic Education"
summary: "Viiz Communications and Strategic Education partnered with Insight and Google Cloud to deploy production AI systems in high-stakes environments. Viiz addressed the staffing crisis in 911 emergency communication centers by implementing conversational AI agents that handle non-emergency calls, which constitute 60% of the 600 million annual 911-related calls. The solution achieved 98.8% accuracy in call routing and reduced non-emergency call times by 6%, while incorporating a safety valve mechanism that escalates to human operators when AI confidence drops below critical thresholds. Strategic Education modernized their educational technology infrastructure by migrating to Google Cloud Platform with standardized golden pathways, implementing agentic AI for course registration and email assistance to serve 150,000 online students globally. Both organizations emphasized the critical importance of data orchestration, architectural planning, and building cloud-ready systems before deploying AI agents in production."
link: "https://www.youtube.com/watch?v=Z_LxVvF8oo4&list=PLFZU5nT4APFA&index=57"
year: 2026
seo:
  title: "Viiz / Strategic Education: AI-Powered Solutions for Emergency Services and Higher Education - ZenML LLMOps Database"
  description: "Viiz Communications and Strategic Education partnered with Insight and Google Cloud to deploy production AI systems in high-stakes environments. Viiz addressed the staffing crisis in 911 emergency communication centers by implementing conversational AI agents that handle non-emergency calls, which constitute 60% of the 600 million annual 911-related calls. The solution achieved 98.8% accuracy in call routing and reduced non-emergency call times by 6%, while incorporating a safety valve mechanism that escalates to human operators when AI confidence drops below critical thresholds. Strategic Education modernized their educational technology infrastructure by migrating to Google Cloud Platform with standardized golden pathways, implementing agentic AI for course registration and email assistance to serve 150,000 online students globally. Both organizations emphasized the critical importance of data orchestration, architectural planning, and building cloud-ready systems before deploying AI agents in production."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-solutions-for-emergency-services-and-higher-education"
  ogTitle: "Viiz / Strategic Education: AI-Powered Solutions for Emergency Services and Higher Education - ZenML LLMOps Database"
  ogDescription: "Viiz Communications and Strategic Education partnered with Insight and Google Cloud to deploy production AI systems in high-stakes environments. Viiz addressed the staffing crisis in 911 emergency communication centers by implementing conversational AI agents that handle non-emergency calls, which constitute 60% of the 600 million annual 911-related calls. The solution achieved 98.8% accuracy in call routing and reduced non-emergency call times by 6%, while incorporating a safety valve mechanism that escalates to human operators when AI confidence drops below critical thresholds. Strategic Education modernized their educational technology infrastructure by migrating to Google Cloud Platform with standardized golden pathways, implementing agentic AI for course registration and email assistance to serve 150,000 online students globally. Both organizations emphasized the critical importance of data orchestration, architectural planning, and building cloud-ready systems before deploying AI agents in production."
notion:
  pageId: "398f8dff-2538-80ec-83e6-fe908b055389"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T12:36:00.000Z"
  lastEditedTime: "2026-07-09T12:37:00.000Z"
  publishedAt: "2026-07-09T14:23:47Z"
---

## Overview

This case study presents two distinct but complementary implementations of conversational AI in production environments with significantly different risk profiles. Viiz Communications deployed AI agents for emergency services handling, while Strategic Education implemented agentic workflows for online higher education. Both organizations worked with Insight as their implementation partner and leveraged Google Cloud Platform infrastructure, particularly what was referred to as Customer Engagement Suite (now rebranded as Gemini Enterprise for Customer Experience).

## Viiz Communications: Emergency Services Context

Viiz Communications provides operator services, directory assistance for major telecommunications companies, and emergency services including overflow calls for 911 centers and in-person emergency devices. The company faced a critical challenge in the emergency communications space: approximately 600 million calls arrive at 911 emergency communication centers annually, with 40% being actual emergencies and 60% being non-emergency inquiries about weather, school closures, and other routine information. These centers operate chronically understaffed at 30-40% below optimal levels, creating a staffing crisis that cannot be solved through policy or process changes alone.

The emergency services industry has historically avoided AI deployment due to the zero-tolerance nature of the work. In retail, a bot failure results in a coupon or discount; in emergency services, failures are potentially life-and-safety issues. This created a significant barrier to AI adoption that required innovative architectural approaches to overcome.

## Strategic Education: Online Learning Context

Strategic Education operates as one of the largest online education providers in America, running Capella University and Strayer University in the United States, plus additional universities in Australia and New Zealand. The organization serves approximately 150,000 students globally in online higher education programs. Beyond enrolled students, the company handles hundreds of thousands of prospects, applicants, and inquiries monthly at the upper funnel of their enrollment process.

The organization had accumulated significant digital footprint data by virtue of their wholly online business model but faced operational bottlenecks from legacy systems, older chatbots built on earlier Dialogflow implementations, and manual processes that created friction in the student experience. The lack of data orchestration across systems meant that despite having data gravity on Google Cloud Platform, they could not effectively deploy sophisticated agentic frameworks without modernization.

## Technical Architecture: Safety-First Design for Emergency Services

The Viiz implementation represents one of the most interesting LLMOps architectures discussed in the case study due to its "defense in depth" approach necessitated by the zero-tolerance environment. The core innovation was a safety valve mechanism that operates as a parallel deterministic flow alongside the generative AI conversational agents.

The architecture prioritizes using playbooks and conversational AI with generative capabilities through the Customer Engagement Suite (Gemini Enterprise for Customer Experience). However, the critical design element is the confidence threshold monitoring. When the AI system's confidence level drops below a specified threshold (described as "three 9s" level, suggesting 99.9% confidence requirements), the system automatically escalates to a deterministic flow that routes the call to a trained human telecommunicator.

This design addresses a specific population segment challenge: some callers don't believe they need emergency services and call non-emergency lines, but may actually be experiencing genuine emergencies like heart attacks. The generative AI should not be attempting to provide health advice in these edge cases. The deterministic fallback immediately prioritizes these calls to human queues, preventing the system from trying to generate responses about medical symptoms when immediate human intervention is required.

The intent-matching capability using playbooks exceeded initial expectations dramatically. The team expected 70% accuracy as a good outcome but achieved 98.8% accuracy in production. This high accuracy in intent classification proved essential for appropriately routing calls between the AI agent handling routine inquiries and human operators handling genuine emergencies.

## Technical Architecture: Golden Pathways for Education Platform

Strategic Education took a fundamentally different but equally deliberate architectural approach. Rather than immediately migrating legacy applications to Google Cloud Platform, the team invested 14 weeks designing what they called "golden pathways" - standardized infrastructure patterns using GKE (Google Kubernetes Engine), Cloud Run, and other Google Cloud services.

The philosophy was to make applications cloud-ready rather than simply lift-and-shift legacy systems to a new hosting environment. This involved deliberate re-architecting, retiring, and replacing systems in a meaningful way. While this approach took longer initially to establish patterns and standards, it created templates that accelerated subsequent application migrations and modernizations.

The emphasis on data orchestration proved critical. The organization recognized that sophisticated agentic frameworks require properly contextualized data. The team focused on getting knowledge sources assembled and orchestrated meaningfully, building proper context around data rather than simply having raw data in a data lake. This data foundation work was positioned as prerequisite infrastructure before attempting to deploy AI agents.

## Production Deployments and Pilot Implementations

Strategic Education deployed two initial pilots to demonstrate value before broader rollout. The first was a course registration agent designed to help students find appropriate courses or select courses between semesters with minimal friction and maximum self-service capability. The second was an agent email assist pilot. These pilots were deliberately chosen as high-value use cases where friction reduction would be immediately measurable and valuable.

The pilots served to convince executive stakeholders of the technology's viability. By demonstrating how 150,000 students could increasingly self-serve rather than requiring phone calls and manual processes, the business case became clear. The organization noted that college-age students prefer self-service interactions over speaking with people, making conversational AI alignment with user preferences a key adoption driver.

## Operational Outcomes and Production Metrics

For Viiz Communications, the production deployment delivered measurable operational improvements that addressed the core staffing crisis. The 6% reduction in non-emergency call times might seem modest, but in the context of handling 360 million non-emergency calls annually out of 600 million total calls, this represents substantial time savings that compound across the system.

More importantly, by offloading non-emergency calls to AI agents, trained human telecommunicators could remain focused on actual emergencies. This reduced emergency call answer times because humans were available and properly queued. The system created a dual benefit: non-emergency callers received faster service from AI agents without waiting in queues, while emergency callers reached human operators more quickly.

The 98.8% accuracy in intent classification exceeded expectations by a significant margin and provided confidence that the system could appropriately distinguish between routine inquiries and situations requiring immediate human attention. This accuracy level was essential for maintaining the zero-tolerance safety requirements of the emergency services context.

## Human Impact and Change Management

An interesting dimension of both implementations was the attention to impact on human workers. For Viiz, the change reduced context switching for human telecommunicators. Previously, call center staff would alternate between someone needing CPR instructions and someone asking about garbage collection schedules. This constant context switching created significant stress and contributed to retention problems.

By allowing the AI to handle routine non-emergency inquiries, human workers could maintain focus on emergency situations. This focus created measurable positive impact on mental health and began addressing retention challenges. The insight here was that organizations might be adequately staffed if tasks are properly allocated - the mission creep of handling routine inquiries alongside emergencies created the perception of understaffing.

For Strategic Education, the change management challenge involved what they termed "cognitive reinvestment" - moving people from routine tasks to higher-value work. The organization acknowledged that change creates anxiety and required deliberate effort to educate the workforce on the paradigm shift toward multimodal interactions spanning text, voice, video, and conversational chat across the student lifecycle from lead through graduation.

## Technology Stack and Platform Evolution

The case study reveals interesting details about Google Cloud's conversational AI platform evolution. The underlying technology started as Dialogflow, evolved into Conversational AI and CCAI (Contact Center AI), was rebranded as Customer Engagement Suite, and has now been positioned as Gemini Enterprise for Customer Experience. This represents tried and trusted AI technology that has been in production use for some time, not bleeding-edge experimental technology.

The technical stack for Strategic Education emphasized GKE and Cloud Run as core components of their golden pathways, suggesting a containerized microservices architecture approach. The emphasis on having data gravity already established on Google Cloud Platform before beginning the AI implementation proved advantageous, avoiding the complexity of simultaneous cloud migration and AI deployment.

## Multimodal Future and Evolution Path

Both organizations identified multimodality as a critical evolution path for their AI systems. The ability to seamlessly transition between text, voice, and video represents the next frontier. For emergency services, this means callers could potentially provide visual context through video while maintaining voice communication, adding information that helps human operators assess situations.

For education, multimodality aligns with how modern students want to learn and interact - listening to podcasts, switching to ebooks, returning to podcasts based on context and location. The same applies to administrative interactions from initial inquiry through enrollment and course selection. Students want to switch between conversational chat, mobile interactions, voice automation, and traditional interfaces based on their current situation.

## Partnership Model and Implementation Approach

A significant theme throughout the case study was the importance of the partnership model with Insight as the implementation partner. Both organizations emphasized moving beyond vendor relationships to true partnerships. Strategic Education experienced a "false start" with an initial partner that didn't work out before finding the right fit with Insight.

The value Insight provided went beyond technical implementation to include thought leadership, teaching the internal teams how to approach the migration and modernization, and bringing specialized skills that internal teams lacked. For Viiz, this meant combining their deep call center expertise with Insight's AI capabilities. For Strategic Education, it meant having expertise to guide the cloud-native architecture and AI strategy decisions.

The partnership quality showed in how internal teams began requesting Insight involvement in additional workstreams beyond the original infrastructure migration project, indicating genuine value delivery that built trust and expanded scope organically.

## Critical Success Factors and Lessons Learned

Both organizations emphasized data quality and proper architecture as the foundation for successful AI deployment. The advice to others stuck in "pilot purgatory" was consistent: get the data right first. This means not just having raw data in data lakes, but properly orchestrating knowledge sources, building appropriate context, and normalizing data before attempting to deploy agentic AI workflows.

The architectural work cannot be skipped or rushed. While spending time on golden pathways, frameworks, and architectural standards may seem like it delays initial deployment, it accelerates subsequent work and prevents the need to reconcile technical debt later. The discipline to pause and build the platform correctly rather than immediately starting migrations proved critical.

For high-stakes environments like emergency services, the key lesson was the necessity of hybrid approaches that combine generative AI capabilities with deterministic fallbacks. Pure generative AI systems, no matter how accurate, cannot meet zero-tolerance requirements. The safety valve architecture that monitors confidence and provides guaranteed escalation paths to human operators represents an essential pattern for deploying AI in life-safety contexts.

## Balanced Assessment and Considerations

While the outcomes presented are impressive, the case study represents success stories and should be evaluated with appropriate context. The 98.8% accuracy for intent matching in emergency services is genuinely remarkable, but the case study doesn't detail how this accuracy was measured, what the error cases looked like, or how the system performs across diverse populations with different communication styles or languages.

The 6% reduction in call times for non-emergency calls is meaningful at scale but relatively modest, suggesting there may be limits to efficiency gains from AI in conversational contexts. The real value appears to be in call routing and workload distribution rather than dramatic time savings per interaction.

For Strategic Education, the case study focuses heavily on infrastructure and pilot implementations but provides limited detail on actual production adoption metrics, student satisfaction, or quantified business outcomes from the course registration and email assist agents. The emphasis on data orchestration and golden pathways is architecturally sound, but the actual AI agent capabilities deployed remain somewhat vague in the presentation.

Both organizations are clearly still in relatively early stages of AI deployment, with significant work remaining to realize the full vision of multimodal, seamlessly integrated agentic systems. The success to date validates the architectural approaches but doesn't represent complete transformations of these businesses through AI.

The partnership emphasis, while genuine, should also be viewed in context of this being a presentation at what appears to be a Google Cloud event with Insight as a featured implementation partner. The business relationships naturally influence how success is framed and presented, though the technical substance and operational outcomes described appear credible and meaningful.
