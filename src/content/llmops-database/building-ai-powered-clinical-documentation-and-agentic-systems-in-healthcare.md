---
title: "Building AI-Powered Clinical Documentation and Agentic Systems in Healthcare"
slug: "building-ai-powered-clinical-documentation-and-agentic-systems-in-healthcare"
draft: false
llmopsTags:
  - "healthcare"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "structured-output"
  - "unstructured-data"
  - "document-processing"
  - "summarization"
  - "question-answering"
  - "chatbot"
  - "prompt-engineering"
  - "few-shot"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "langchain"
  - "monitoring"
  - "databases"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "documentation"
  - "meta"
  - "google-gcp"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "healthcare"
company: "Abridge"
summary: "Abridge, a clinical intelligence platform, developed an AI system to transform unstructured patient-clinician conversations into clinical documentation, addressing the significant burden of documentation that causes physician burnout. The company processes over 100 million conversations annually across 250 major U.S. health systems, using LLM-based tools to generate clinical notes and provide agentic assistance to clinicians. Through significant investment in evaluation infrastructure, including migration to LangGraph and LangSmith, implementation of both reference-free and reference-based judges, and rigorous testing processes including AB testing in healthcare settings, Abridge reduced their release cycle from 1-2 months to just days while maintaining the extremely high quality and safety standards required in healthcare."
link: "https://www.youtube.com/watch?v=mxweSHetuN8"
year: 2026
seo:
  title: "Abridge: Building AI-Powered Clinical Documentation and Agentic Systems in Healthcare - ZenML LLMOps Database"
  description: "Abridge, a clinical intelligence platform, developed an AI system to transform unstructured patient-clinician conversations into clinical documentation, addressing the significant burden of documentation that causes physician burnout. The company processes over 100 million conversations annually across 250 major U.S. health systems, using LLM-based tools to generate clinical notes and provide agentic assistance to clinicians. Through significant investment in evaluation infrastructure, including migration to LangGraph and LangSmith, implementation of both reference-free and reference-based judges, and rigorous testing processes including AB testing in healthcare settings, Abridge reduced their release cycle from 1-2 months to just days while maintaining the extremely high quality and safety standards required in healthcare."
  canonical: "https://www.zenml.io/llmops-database/building-ai-powered-clinical-documentation-and-agentic-systems-in-healthcare"
  ogTitle: "Abridge: Building AI-Powered Clinical Documentation and Agentic Systems in Healthcare - ZenML LLMOps Database"
  ogDescription: "Abridge, a clinical intelligence platform, developed an AI system to transform unstructured patient-clinician conversations into clinical documentation, addressing the significant burden of documentation that causes physician burnout. The company processes over 100 million conversations annually across 250 major U.S. health systems, using LLM-based tools to generate clinical notes and provide agentic assistance to clinicians. Through significant investment in evaluation infrastructure, including migration to LangGraph and LangSmith, implementation of both reference-free and reference-based judges, and rigorous testing processes including AB testing in healthcare settings, Abridge reduced their release cycle from 1-2 months to just days while maintaining the extremely high quality and safety standards required in healthcare."
notion:
  pageId: "3aaf8dff-2538-8060-926e-cd68110091c1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:06:00.000Z"
  lastEditedTime: "2026-07-27T12:06:00.000Z"
  publishedAt: "2026-08-06T11:49:18Z"
---

## Overview

Abridge has built a clinical intelligence platform that captures and transforms the unstructured data from patient-clinician conversations into actionable clinical documentation and decision support tools. Operating at significant scale with over 100 million conversations processed annually across 250 of the largest U.S. health systems including Mayo Clinic, Kaiser Permanente, and Johns Hopkins, Abridge represents a compelling case study in deploying LLMs in highly regulated, high-stakes production environments. The company's core value proposition addresses a critical pain point in healthcare: physicians spending 10-20 hours in after-hours "pajama time" on documentation, contributing to severe burnout in an industry facing a massive doctor shortage. Beyond time savings, Abridge is expanding into revenue optimization for health systems and clinical decision support that could directly impact patient outcomes.

The case study demonstrates sophisticated LLMOps practices developed under extreme constraints. The regulatory environment requires strict HIPAA compliance and careful handling of protected health information (PHI), while the high stakes mean that errors in medication labeling, dosages, or attribution can have serious patient safety and legal implications. Enterprise buyers in healthcare make vendor selection decisions based heavily on security and trust, and the company operates under the principle that "trust is earned in drops, but lost in buckets" - meaning a single poor model release could destroy hard-won customer relationships. This creates an environment where velocity cannot come at the expense of quality, forcing the development of sophisticated evaluation and deployment infrastructure.

## Core Product: Clinical Note Generation

The foundational product transforms recorded patient-clinician conversations into clinical charts or notes that become part of the patient's longitudinal record and serve as the basis for billing. This is fundamentally different from simple meeting summarization because the output has legal, financial, and medical significance. The complexity of this task stems from several factors that make evaluation particularly challenging.

Misattribution errors carry severe consequences - there's a critical difference between a patient reporting a symptom and a doctor diagnosing and billing for a condition. Getting this wrong can result in upcoding or downcoding violations with serious financial and legal ramifications. Hallucinations or confabulations where the system invents medication orders or incorrect dosages create direct patient safety risks. The subjective nature of clinical documentation, which varies by specialty and individual clinician preference, adds another layer of difficulty to evaluation. Notes must be accurate, complete, compliant with billing requirements, and stylistically appropriate.

## Evolution of the Evaluation Infrastructure

Before implementing their current evaluation system, Abridge's release process took 1-2 months and involved clinicians manually annotating data, third-party labelers, and multiple custom tools that didn't integrate well. This slow release cycle was the primary bottleneck preventing the team from addressing known model issues and quality problems identified through user feedback.

The transformation involved changes at three levels: platform selection, evaluation methodology, and operational processes. From a platform perspective, Abridge migrated to LangGraph and LangSmith after determining their custom-built tools weren't scaling to meet their use cases. LangGraph provided unified datasets, annotation, tracing, and evaluation capabilities in a single system, while critically offering self-hosting options and the access controls and auditability required for enterprise healthcare security requirements. LangSmith became their evaluation platform, offering customization and visibility across different altitudes - from debugging individual patient encounters to tracking performance across model releases.

## Judge-Based Evaluation System

Abridge developed a sophisticated judge-based evaluation framework to assess model outputs across multiple dimensions. The team organized their backlog of known model issues, prioritized by both prevalence and severity, into aggregate pillars including accuracy, compliance, style, and completeness. For each pillar, they created specialized judges to evaluate specific aspects of model performance.

The initial judge creation process was cumbersome and labor-intensive. A clinician with subject matter expertise would design an annotation guide, label encounters according to that guide, and then an engineer would iterate on prompts to calibrate the judge to match the clinician labels. This manual process was time-consuming and didn't scale well. The team subsequently moved to an automated prompt optimization (APO) framework that takes the annotation guide and labeled encounters as input and automatically generates calibrated judges, significantly reducing turnaround times.

A critical design decision was implementing both reference-free and reference-based judges as complementary evaluation layers. Reference-free judges generalize across all encounters, examining the conversation audio/transcript and the generated note without needing a gold standard comparison. This enables both offline evaluation during development and continuous online monitoring in production. However, these judges have limitations in capturing encounter-specific nuances and the inherent subjectivity of clinical documentation, which varies significantly by specialty and individual clinician practice patterns.

Reference-based judges address these limitations by comparing generated notes against gold standard examples, with specialization down to the medical specialty level. This dual approach provides high confidence in model outputs while enabling both rapid iteration during development and continuous quality monitoring in production.

## Data Quality and Annotation Practices

Given that evaluation infrastructure is only as good as the underlying data, Abridge implemented several practices to ensure annotation quality. They verify that annotations match the expected outputs of their LLM judges to ensure alignment. Crucially, they require free-text explanations from annotators not just when there are issues or inconsistencies, but also when things appear correct. This serves dual purposes: it enables debugging when problems arise, but more importantly, it ensures annotators are actually paying attention rather than clicking through mechanically.

The team explicitly defines what level of expertise is required upfront for each annotation task. Some evaluations require board-certified physicians, others need specialists in particular areas, and being explicit about these requirements has improved data quality. This attention to expertise matching is particularly important in healthcare where subtle clinical distinctions can have major implications.

## Multi-Stage Deployment Process

Even with sophisticated offline evaluation, Abridge maintains a rigorous multi-stage deployment process before releasing model updates to production. Offline evaluations happen first using the automated judge framework, providing quick initial feedback. The team then backtests against historical encounters, which is also a rapid process with their current infrastructure.

The AB testing stage is particularly noteworthy given the healthcare context. Initially, the speaker didn't believe AB testing would be possible in enterprise healthcare settings. However, by building trust with customers over time, Abridge secured explicit buy-in from partner health systems willing to participate in silent releases without advance notification. These early adopter partners, representing the first 10-15% of customers in a rollout, agreed to be part of the innovation process. This is described as a privilege requiring careful stewardship of trust, but it provides invaluable production signal: actual clinician editing behavior, ratings, and qualitative feedback that surfaces immediately if there are serious issues.

Only after passing through offline evaluation, backtesting, and AB testing does a model proceed to full release, followed by continuous online monitoring. This process, which previously took 1-2 months, now completes in days, enabling rapid iteration while maintaining the high quality bar required by the healthcare environment. Users report they can feel the improvements when new models ship, suggesting the faster iteration hasn't compromised quality.

## Agentic System: Abridge Assistant

Building on the clinical note generation foundation, Abridge developed a more sophisticated agentic assistant to help clinicians make optimal decisions with appropriate context at the right moment. This addresses a fundamental problem in healthcare technology: most clinical tools fail on adoption because doctors are extremely time-constrained, running back-to-back 15-minute appointments without time to context-switch between tools. Many existing tools also force trade-offs between security and usability.

Abridge's approach was to build a unified agent that persists across the entire clinical workflow - before, during, and after patient visits. Rather than implementing separate features in different places, they created a single agent with composable capabilities that can be invoked as needed. These capabilities include searching patient context across multiple systems of record, performing actions like editing notes or placing medication and imaging orders, and providing clinical decision support by searching validated medical literature and evidence.

Having a singular agent architecture allows the system to call the right tool at the right time while delivering a coherent user experience. This architectural decision also simplifies the LLMOps challenges by consolidating evaluation and monitoring rather than having to track multiple disparate systems.

## Product Principles for Agentic Systems

The product design for the assistant follows three key principles shaped by the healthcare context. First, the system aims to be "like air conditioning" - operating in the background to improve the environment without demanding active attention unless something truly important requires it. This respects clinician time and attention constraints.

Second is agency - ensuring clinicians maintain control. In healthcare, it's critical that physicians know they're making the final decisions. The system can suggest actions, but the clinician remains in control with full access to the underlying data and reasoning. This is both a regulatory requirement and essential for user trust and adoption.

Third is responsiveness, which manifests in multiple ways. When clinicians explicitly provide feedback, the system must learn and improve quickly. But the system also learns implicitly from clinician behavior - if a clinician consistently makes the same edits to notes, the system learns their style preferences and automatically applies them to future notes. Given patient context, the system can proactively suggest questions the clinician might ask during specific moments of a visit to improve care quality.

## Evaluation Challenges for Agentic Systems

While the agentic system uses similar underlying evaluation machinery as the core notes product, the complexity increased significantly because it's no longer a single-step model but a multi-step agentic system with tool use and dynamic behavior. The evaluation criteria expanded to cover several dimensions: clinical quality measuring accuracy, safety ensuring the agent doesn't recommend actions that could harm patients, boundary and adversarial testing to verify the agent doesn't answer questions outside its training scope or intended use, and tool selection evaluation to ensure the agent picks appropriate tools and behaves as a clinician would expect.

This multi-dimensional evaluation for agentic systems represents the next frontier of complexity in their LLMOps practice, requiring evaluation not just of individual outputs but of multi-turn interactions, tool selection decisions, and contextual appropriateness across diverse clinical scenarios.

## Data Network Effects and Continuous Improvement

Abridge's scale creates significant data network effects that enable continuous improvement. With explicit data rights from customers, they de-identify the 100+ million annual conversations and learn from multiple signals: edits clinicians make to generated notes, queries posed to the Abridge AI agent, and other interaction patterns. This feeds back into model improvement through both LLM-based and human evaluation, creating a virtuous cycle where the product compounds in value over time.

This continuous learning loop is a hallmark of mature LLMOps practice, but it requires careful attention to data rights, privacy protection through de-identification, and systematic processes for incorporating feedback into model updates. The fact that Abridge can do this while maintaining HIPAA compliance and the trust of major health systems demonstrates sophisticated data governance alongside technical capabilities.

## Broader Implications and Trade-offs

The case study illustrates important trade-offs in LLMOps for regulated industries. The evaluation infrastructure investment was substantial - building automated judge generation, implementing dual reference-free and reference-based evaluation, establishing rigorous annotation processes, and securing AB testing partnerships all required significant upfront effort. However, this investment paid dividends by accelerating the release cycle by roughly 10x while maintaining or improving quality.

The choice to use LangGraph and LangSmith rather than continuing with custom-built tools represents a build-versus-buy decision that many teams face. While custom tools offer maximum flexibility, the operational burden of maintaining them can become prohibitive as the team and use cases scale. The migration to established platforms provided unified workflows and features like tracing and access controls that would have been expensive to build in-house.

The multi-stage deployment process with offline evaluation, backtesting, AB testing, and continuous monitoring represents significant operational overhead compared to more rapid deployment approaches possible in lower-stakes domains. However, the healthcare context makes this necessary - the consequences of errors are too severe to rely on rapid iteration and rollback strategies common in consumer applications. The ability to compress this process from months to days while maintaining rigor represents an optimal balance for this environment.

The relationship-building required to enable AB testing in healthcare demonstrates that LLMOps success in regulated industries isn't purely technical - it requires earning customer trust through consistent quality delivery, transparent communication about intentions and processes, and demonstrating the value of innovation. The "trust earned in drops, lost in buckets" principle shapes technical decisions about evaluation rigor and deployment processes.

## Key Takeaways for LLMOps Practitioners

The case study offers several lessons for teams deploying LLMs in production, particularly in high-stakes environments. First, velocity and quality aren't necessarily in opposition if the right evaluation infrastructure is built upfront. By investing in automated judge generation, comprehensive testing processes, and monitoring, teams can actually accelerate iteration while improving quality and deepening understanding of model behavior.

Second, evaluation strategies should match the specific requirements of the domain. The dual approach of reference-free judges for coverage and continuous monitoring combined with reference-based judges for specificity and nuance is particularly well-suited to healthcare but could apply to other domains with similar characteristics of high variation and subjectivity.

Third, data quality deserves constant attention as the foundation of all evaluation work. Practices like requiring explanations from annotators and explicitly matching expertise to task requirements may seem like overhead but prevent garbage-in-garbage-out problems that would undermine the entire evaluation system.

Fourth, in regulated industries, deployment processes must be designed for the specific constraints of the domain rather than adopting practices from consumer tech. The AB testing approach that Abridge developed specifically for healthcare enterprise customers wouldn't work without the relationship foundation they built.

Finally, the progression from a core product (clinical note generation) to more sophisticated agentic systems represents a common pattern in LLM applications, but each step up in complexity requires corresponding advances in evaluation capabilities. The evaluation framework that worked for single-step note generation needed significant extension to handle the multi-step, tool-using agentic assistant.
