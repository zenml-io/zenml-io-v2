---
title: "AI-Powered Clinical Documentation and Data Infrastructure for Point-of-Care Transformation"
slug: "ai-powered-clinical-documentation-and-data-infrastructure-for-point-of-care-transformation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6936b69f24d5cb855516fa69"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:34:21.360Z"
  createdOn: "2025-12-08T11:29:35.937Z"
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "speech-recognition"
  - "summarization"
  - "structured-output"
  - "realtime-application"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "prompt-engineering"
  - "model-optimization"
  - "fine-tuning"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "system-prompts"
  - "evals"
  - "api-gateway"
  - "monitoring"
  - "databases"
  - "microservices"
  - "serverless"
  - "devops"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "amazon-aws"
industryTags: "healthcare"
company: "Veradigm"
summary: "Veradigm, a healthcare IT company, partnered with AWS to integrate generative AI into their Practice Fusion electronic health record (EHR) system to address clinician burnout caused by excessive documentation tasks. The solution leverages AWS HealthScribe for autonomous AI scribing that generates clinical notes from patient-clinician conversations, and AWS HealthLake as a FHIR-based data foundation to provide patient context at scale. The implementation resulted in clinicians saving approximately 2 hours per day on charting, 65% of users requiring no training to adopt the technology, and high satisfaction with note quality. The system processes 60 million patient visits annually and enables ambient documentation that allows clinicians to focus on patient care rather than typing, with a clear path toward zero-edit note generation."
link: "https://www.youtube.com/watch?v=xCsyVhGAdzM"
year: 2025
seo:
  title: "Veradigm: AI-Powered Clinical Documentation and Data Infrastructure for Point-of-Care Transformation - ZenML LLMOps Database"
  description: "Veradigm, a healthcare IT company, partnered with AWS to integrate generative AI into their Practice Fusion electronic health record (EHR) system to address clinician burnout caused by excessive documentation tasks. The solution leverages AWS HealthScribe for autonomous AI scribing that generates clinical notes from patient-clinician conversations, and AWS HealthLake as a FHIR-based data foundation to provide patient context at scale. The implementation resulted in clinicians saving approximately 2 hours per day on charting, 65% of users requiring no training to adopt the technology, and high satisfaction with note quality. The system processes 60 million patient visits annually and enables ambient documentation that allows clinicians to focus on patient care rather than typing, with a clear path toward zero-edit note generation."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-clinical-documentation-and-data-infrastructure-for-point-of-care-transformation"
  ogTitle: "Veradigm: AI-Powered Clinical Documentation and Data Infrastructure for Point-of-Care Transformation - ZenML LLMOps Database"
  ogDescription: "Veradigm, a healthcare IT company, partnered with AWS to integrate generative AI into their Practice Fusion electronic health record (EHR) system to address clinician burnout caused by excessive documentation tasks. The solution leverages AWS HealthScribe for autonomous AI scribing that generates clinical notes from patient-clinician conversations, and AWS HealthLake as a FHIR-based data foundation to provide patient context at scale. The implementation resulted in clinicians saving approximately 2 hours per day on charting, 65% of users requiring no training to adopt the technology, and high satisfaction with note quality. The system processes 60 million patient visits annually and enables ambient documentation that allows clinicians to focus on patient care rather than typing, with a clear path toward zero-edit note generation."
---

## Overview and Use Case

This case study presents Veradigm's implementation of AWS generative AI services to transform clinical documentation workflows within their Practice Fusion EHR platform. Practice Fusion serves approximately 5 million patient visits monthly (60 million annually) and primarily targets small independent ambulatory providers with 1-3 practitioners. The core problem addressed is clinician burnout driven by administrative overhead—research cited indicates that for every 1 hour spent with patients, clinicians spend 2 hours on clinical documentation and administrative tasks, including "pajama time" where physicians work on documentation after returning home.

Veradigm's solution architecture combines two AWS managed services: HealthScribe for AI-powered clinical note generation and HealthLake as a FHIR-compliant data foundation. The strategic decision to build rather than simply integrate third-party ambient scribe solutions reflects Veradigm's belief that ambient documentation needs to become an organic, integral part of the EHR experience rather than a bolt-on feature, positioning it as a foundation for broader AI capabilities.

## Technical Architecture and LLMOps Implementation

### AWS HealthScribe Integration

HealthScribe serves as the core generative AI service for clinical documentation. The service accepts audio from patient-clinician conversations and generates structured clinical notes in near real-time. The implementation operates through a straightforward API-driven architecture where clinicians tap a microphone button to start recording, HealthScribe processes the ambient conversation, and generates a structured note by the time the visit concludes.

From an LLMOps perspective, several key capabilities demonstrate production-grade implementation. HealthScribe performs real-time transcription during patient encounters, providing clinicians with live feedback that builds trust in the system. The service generates notes within seconds of visit completion, meeting the stringent latency requirements for clinical workflows. AWS has fine-tuned a purpose-built AI model specifically for point-of-care clinical conversations in 2025, enabling precise control over note verbosity, completeness, and hallucination reduction at both note and line levels.

The system supports multiple note templates including SOAP (Subjective, Objective, Assessment, Plan), GIRP, BIRP, and SIRP formats, which are critical for different clinical specialties and practice patterns. In 2025, AWS expanded specialty support to 18+ medical specialties, recognizing that a cardiologist's documentation needs differ significantly from a dermatologist's requirements. This specialty-specific customization is embedded in the model rather than requiring extensive prompt engineering by end users.

### Responsible AI and Safety Guardrails

A critical LLMOps consideration in healthcare is responsible AI implementation. HealthScribe addresses this through several mechanisms. Every generated note includes source attribution, meaning each statement in the clinical note links back to the original transcript segment. Veradigm's implementation displays the transcription side-by-side with the generated note, allowing clinicians to verify accuracy and identify potential hallucinations or errors. This transparency mechanism serves both as a trust-building feature and a risk mitigation strategy for patient safety.

AWS emphasizes that AI safety guardrails are mandatory rather than optional for healthcare AI agents. All notes are grounded in source data, reducing the risk of fabricated information entering patient records. The presenters acknowledge that while hallucination elimination is aspirational, the current approach provides clinicians with the tools to catch and correct issues before notes enter the permanent medical record.

### Patient Context Integration

A major 2025 enhancement to HealthScribe involves patient context integration, addressing a fundamental limitation of ambient scribes operating without historical patient data. Previously, brief follow-up visits could generate inadequate notes because the system lacked context—a patient saying "I'm doing great" provides little information without knowing they're following up from shoulder surgery. With patient context integration, customers can inject structured data from the EHR at the time of note generation, including patient demographics, problem lists, medications, and allergies. This eliminates redundant information capture during encounters and improves note quality by leveraging existing discrete data.

The implementation also includes patient-facing summary generation as an AI task. Rather than clinicians writing separate patient summaries, HealthScribe generates plain-language summaries that are comprehensible to non-medical audiences, automatically adjusting medical terminology and providing clear follow-up instructions. This reduces clinician workload while improving patient understanding and engagement.

### AWS HealthLake as Data Foundation

HealthLake provides the enterprise data infrastructure supporting AI agents with comprehensive patient context. The service implements FHIR (Fast Healthcare Interoperability Resources) as a common data model, solving the challenge of healthcare data existing in disparate formats across 500+ relational database tables, PDFs, HL7 messages, CCDAs, and unstructured clinical notes.

FHIR's RESTful API architecture provides standardized access patterns—for example, fetching a patient's family name uses a consistent URL search string regardless of the underlying data source. The data model is referential rather than relational, meaning observations link to encounters, encounters link to conditions, conditions link to patients, and patients link to practitioners and organizations. This graph-like structure enables AI agents to "walk" relationships and assemble comprehensive patient contexts without complex joins or data transformations.

From an LLMOps infrastructure perspective, HealthLake operates as a managed service with sub-second latency at scale, handling hundreds of terabytes of data. This performance characteristic is critical for real-time clinical workflows where practitioners expect immediate responses. The service maintains HIPAA compliance and follows healthcare regulatory requirements, reducing the operational burden on customers to manage security, compliance, and infrastructure scaling.

HealthLake includes integrated analytics capabilities through automatic transformation of FHIR data into Iceberg table formats, enabling analysis via AWS services like Redshift and Athena or third-party tools like Databricks and Snowflake. This dual-purpose architecture supports both operational queries from AI agents and analytical workloads for quality measurement and research.

### Deployment and Integration Strategy

Veradigm's deployment approach reflects pragmatic LLMOps principles for rapid iteration. The initial implementation built HealthScribe integration as a separate window application rather than deeply embedding it in the EHR interface. While this initially seemed suboptimal, user feedback revealed advantages—many clinicians use their phones as microphones during visits, and the separate window architecture accommodates this workflow pattern. The implementation releases every 2 weeks on the Practice Fusion platform, with HealthScribe updates arriving even more frequently from AWS, enabling rapid incorporation of new features.

The API-based integration strategy allowed a smaller-than-typical product team to deploy a production-ready ambient scribe solution quickly. This speed-to-market was essential for building an economic model and understanding actual usage patterns—encounter lengths, encounter frequency, user satisfaction, and infrastructure costs. These metrics inform both product development and pricing strategies, which are particularly important for generative AI features with non-trivial per-transaction costs.

### Economic and Usage Models

An important LLMOps consideration unique to generative AI is the economic model. Unlike traditional SaaS applications where infrastructure costs are relatively fixed, generative AI services incur real costs per inference. Veradigm explicitly needed to ship a product to understand actual usage patterns and build a viable economic model. The team collects data on how many encounters clinicians transcribe, encounter duration, note satisfaction, and feature utilization to optimize both cost and user experience.

The company's market positioning aims for an "80/20 solution"—meeting note quality expectations for the majority of use cases at the right price point while maintaining simplicity. This acknowledges that while some practitioners may prefer premium specialized scribes for niche use cases, the integrated EHR solution can serve most needs effectively. Veradigm continues to support third-party scribe partners on their platform, recognizing that a hybrid ecosystem serves different customer segments.

## Production Outcomes and Metrics

The production deployment demonstrates measurable impacts on clinician workflows. Users report saving approximately 2 hours per day on documentation tasks when using the system extensively. The 65% no-training adoption rate indicates successful UX design—most users can click to launch, hit record, and understand the workflow without watching training videos or reading documentation. This aligns with Veradigm's "live in 5" self-service philosophy for the Practice Fusion platform.

Qualitative feedback shows 4.6 out of 5 satisfaction ratings on reducing charting time while with patients, with users reporting they can complete 95% of notes immediately after patient encounters. Clinicians note that ambient AI enables better eye contact and attention to patients rather than typing during conversations, which secondary research correlates with improved patient satisfaction.

However, the case study also reveals ongoing challenges and areas for improvement. Users express diverse preferences for note style—some want bullet points while others prefer narratives, some want long notes while others want concise summaries, and pronoun preferences vary widely. These customization requirements drive continued feature development and model refinement.

The ultimate goal articulated by both AWS and Veradigm is "zero-edit" note generation—where clinicians review and submit notes without modifications. While not yet achieved, the trajectory suggests this is attainable in the near term as model capabilities improve and patient context integration becomes more sophisticated.

## Analytics and Continuous Improvement

A forward-looking LLMOps capability involves building analytics pipelines to compare AI-generated notes with final clinician-edited notes. This enables quantitative measurement of edit frequency, edit types (drug name corrections versus formatting changes), time spent on edits, and ultimately serves as a continuous feedback mechanism for model improvement. The ability to analyze every note at scale provides data density that few other software features can match, enabling rapid iteration on model performance and identification of edge cases or failure modes.

This analytics approach also serves as risk mitigation for patient safety, allowing systematic detection of patterns where the AI may consistently make certain types of errors. The presenters express excitement about eventually measuring zero-edit rates at scale, which would validate the technology's maturity and readiness for broader deployment.

## Future Architecture and AI Agent Ecosystem

Veradigm's longer-term architecture envisions HealthLake becoming not just a read store for AI agents but also a write destination for AI-generated inferences. The FHIR schema accommodates AI-generated observations, conditions, and other resources with appropriate tagging to indicate their provenance. This approach avoids forcing AI outputs into legacy relational schemas that were never designed for machine-generated inferences.

The architecture positions HealthLake as a source of record for AI data, with the traditional EHR able to read and selectively incorporate AI-generated content. This separation of concerns enables rapid AI innovation without requiring changes to core EHR systems, while maintaining flexibility about which AI outputs become part of the permanent medical record versus which serve as decision support.

The presenters emphasize that multiple AI agents—both first-party and third-party solutions—can read from and write to HealthLake, creating an ecosystem where different agents handle specific tasks like medical coding, prior authorization, clinical decision support, and documentation. The common FHIR data model ensures these agents can interoperate and build on each other's outputs.

## Critical Assessment and Tradeoffs

While the case study presents significant achievements, several considerations warrant balanced assessment. The economic viability of ambient AI at scale remains somewhat unclear—the presenters mention cost management and rate limiting, suggesting that unlimited usage could present financial challenges. The move to HealthLake is partly driven by cost reduction (5x cheaper than the previous solution), but the overall unit economics of AI-powered documentation versus traditional methods aren't fully disclosed.

The "zero-edit" goal, while compelling, may be more aspirational than immediately achievable given the diversity of clinician preferences and specialty-specific requirements. The 2-hour daily time savings is based on self-reported surveys from users who use the system extensively, which may represent best-case scenarios rather than average experiences across all user types.

The reliance on managed AWS services provides clear operational benefits but also creates vendor dependencies. Organizations adopting this architecture would need to consider multi-cloud portability strategies or accept AWS as their healthcare AI infrastructure provider. However, the use of FHIR as an open standard mitigates some lock-in concerns, as FHIR data is theoretically portable to other systems.

The case study also acknowledges ongoing challenges with unstructured data, multi-speaker scenarios, code-switching between languages (like "Spanglish"), and the complexity of healthcare ontologies. While HealthScribe addresses many of these issues, they remain inherent challenges in healthcare AI that require continuous refinement.

Overall, this implementation represents a mature, production-scale deployment of generative AI in healthcare with thoughtful attention to safety, compliance, user experience, and operational sustainability. The combination of purpose-built AI services, standardized data infrastructure, and pragmatic deployment strategies offers a model for healthcare AI that balances innovation with the conservative requirements of medical practice.