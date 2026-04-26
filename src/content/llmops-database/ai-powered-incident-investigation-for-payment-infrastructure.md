---
title: "AI-Powered Incident Investigation for Payment Infrastructure"
slug: "ai-powered-incident-investigation-for-payment-infrastructure"
draft: false
llmopsTags:
  - "fraud-detection"
  - "realtime-application"
  - "high-stakes-application"
  - "rag"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "error-handling"
  - "latency-optimization"
  - "kubernetes"
  - "langchain"
  - "monitoring"
  - "devops"
  - "orchestration"
  - "reliability"
  - "open-source"
  - "amazon-aws"
industryTags: "finance"
company: "Razorpay"
summary: "Razorpay, a financial infrastructure company in India, faced a critical operational challenge where on-call engineers spent 20-40 minutes investigating production incidents by manually connecting information across six different monitoring systems including Grafana, Coralogix, Kubernetes, and AWS. They built the Razorpay Oncall Agent, a multi-agent AI system using LangGraph and LLMs with RAG-based context retrieval, which automates incident investigation by deploying specialist agents in parallel to analyze different system components. After three months in shadow mode, the system reduced Mean Time to Investigate (MTTI) by 80% from 30 minutes to 90 seconds, improved Mean Time to Resolve (MTTR) by 50-60%, and saved 6-8 hours of engineering time weekly while providing consistent investigation quality regardless of engineer experience level."
link: "https://engineering.razorpay.com/project-viveka-from-30-minute-investigations-to-90-second-ai-analysis-e49ec9db2638"
year: 2026
seo:
  title: "Razorpay: AI-Powered Incident Investigation for Payment Infrastructure - ZenML LLMOps Database"
  description: "Razorpay, a financial infrastructure company in India, faced a critical operational challenge where on-call engineers spent 20-40 minutes investigating production incidents by manually connecting information across six different monitoring systems including Grafana, Coralogix, Kubernetes, and AWS. They built the Razorpay Oncall Agent, a multi-agent AI system using LangGraph and LLMs with RAG-based context retrieval, which automates incident investigation by deploying specialist agents in parallel to analyze different system components. After three months in shadow mode, the system reduced Mean Time to Investigate (MTTI) by 80% from 30 minutes to 90 seconds, improved Mean Time to Resolve (MTTR) by 50-60%, and saved 6-8 hours of engineering time weekly while providing consistent investigation quality regardless of engineer experience level."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-incident-investigation-for-payment-infrastructure"
  ogTitle: "Razorpay: AI-Powered Incident Investigation for Payment Infrastructure - ZenML LLMOps Database"
  ogDescription: "Razorpay, a financial infrastructure company in India, faced a critical operational challenge where on-call engineers spent 20-40 minutes investigating production incidents by manually connecting information across six different monitoring systems including Grafana, Coralogix, Kubernetes, and AWS. They built the Razorpay Oncall Agent, a multi-agent AI system using LangGraph and LLMs with RAG-based context retrieval, which automates incident investigation by deploying specialist agents in parallel to analyze different system components. After three months in shadow mode, the system reduced Mean Time to Investigate (MTTI) by 80% from 30 minutes to 90 seconds, improved Mean Time to Resolve (MTTR) by 50-60%, and saved 6-8 hours of engineering time weekly while providing consistent investigation quality regardless of engineer experience level."
notion:
  pageId: "34ef8dff-2538-8154-823b-f7701160cce3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:01:09Z"
---

## Overview

Razorpay, which provides financial infrastructure services in India including payment processing, developed an AI-powered incident investigation system called Oncall Agent to address a critical operational bottleneck. The company's on-call engineers were spending 20-40 minutes per incident manually correlating information across six disconnected observability and infrastructure systems (Grafana for metrics, Coralogix for logs, Kubernetes for pod health, AWS for infrastructure, deployment history, and database health). With 15-20 incidents occurring weekly, this translated to 6-8 hours of repetitive investigative work. The quality of investigations was inconsistent, varying significantly based on the experience level of the engineer on call. The system was deployed in shadow mode in early 2026 and demonstrates a sophisticated application of multi-agent LLM systems to production operations.

## The Production Problem and Business Context

The case study opens with a vivid incident example: a 3 AM production alert where an engineer spent 32 minutes investigating before identifying a bad deployment as the root cause, during which time payment failures had already impacted customers for nearly 40 minutes. This illustrates the core problem that no single observability system could provide a holistic view. The investigation process required manually connecting dots across multiple disconnected tools, with the cognitive burden falling entirely on the on-call engineer.

Razorpay identifies a critical but often overlooked operational metric: Mean Time to Investigate (MTTI), the gap between detecting a problem and understanding what needs to be fixed. While the industry focuses on Mean Time to Detect (MTTD) and Mean Time to Resolve (MTTR), the MTTI phase was consuming the majority of incident response time. The company recognized that this investigative work was largely repetitive and pattern-based, making it a prime candidate for AI automation rather than requiring human creativity or judgment.

## Technical Architecture and LLMOps Implementation

The Oncall Agent is built as a multi-agent AI system using LangGraph, described as a framework for creating stateful workflows with conditional logic. The architecture uses LLMs as the reasoning engine and implements several key components working in orchestration.

At the center is a **Supervisor Agent** that acts as an incident commander. When it receives an alert from Zenduty (their alerting system), it creates an investigation strategy by querying two separate RAG (Retrieval-Augmented Generation) systems. One RAG stores application architecture and service dependencies, while another stores alert-specific diagnostic runbooks. This dual RAG approach is particularly noteworthy from an LLMOps perspective because it ensures investigations are grounded in Razorpay's specific infrastructure and institutional knowledge rather than relying on generic LLM responses. The contextual grounding tailors investigations to their particular services and known failure patterns.

The Supervisor then dispatches tasks to **Specialist Agents** that operate in parallel rather than sequentially. This design choice is significant for performance and mirrors how expert human teams actually divide investigative work. The specialist agents include a Kubernetes Agent checking pod health and recent deployments, a Coralogix Agent analyzing error logs, a PromQL Agent querying performance metrics, and an AWS Agent validating infrastructure health. Each specialist agent is domain-focused and completes its specific checks within 5-8 seconds, contributing to the overall 90-second investigation time.

As specialist agents complete their work, findings are stored in a **Memory** component as structured evidence. This includes what was checked, what was found, confidence levels, and supporting data. The Supervisor Agent then performs correlation across all evidence, builds an Incident Evidence Timeline that orders events by timestamp, scores multiple hypotheses based on temporal correlation and evidence strength, and selects the most likely root cause. This multi-hypothesis approach with scoring is more sophisticated than simple pattern matching and represents a thoughtful application of LLM reasoning capabilities.

## Production Deployment and Integration

The system integrates with Razorpay's existing incident response workflow through Slack. The on-call engineer still receives the 3 AM alert, but now it comes with a complete investigation already done, including citations, confidence scores, and recommended actions. This design choice preserves human oversight while eliminating the most time-consuming repetitive work. The engineer can review the AI's analysis and decide on remediation actions rather than spending 30 minutes gathering information.

The deployment strategy is notably cautious and appropriate for a critical production system. The case study indicates the system was running in "shadow mode" as of April 2026, meaning it performs investigations in parallel with human engineers but doesn't yet drive primary incident response decisions. This allows validation of accuracy and reliability before full production rollout. The company explicitly states they're targeting 80%+ accuracy and plan to roll out to production only after validating across hundreds of incident cases.

## Continuous Learning and Knowledge Management

A particularly sophisticated aspect of the LLMOps implementation is the continuous learning loop. Every investigated case gets stored back into the RAG systems, enriching future investigations with institutional knowledge. This creates a compounding effect where the system becomes more accurate over time as it encounters more incident patterns. This approach addresses one of the key challenges in production LLM systems: ensuring the knowledge base stays current with the evolving infrastructure and failure modes.

The system architecture appears to treat knowledge accumulation as a first-class concern rather than an afterthought. The dual RAG design (architecture/dependencies versus alert-specific runbooks) suggests careful thought about how different types of knowledge should be organized and retrieved for effective incident investigation.

## Measured Business Impact

After three months in shadow mode, Razorpay reports several quantified impacts. The MTTI reduction of 80% represents investigations completing in 90 seconds instead of 30 minutes, saving 25 minutes per incident. With 15-20 incidents weekly, this translates to the reported 6-8 hours of engineering time saved weekly. The 50-60% improvement in MTTR (Mean Time to Resolve) indicates that faster investigation directly accelerates resolution, reducing customer impact and revenue risk.

Beyond time savings, the company reports qualitative improvements in consistency across the team. Junior engineers now receive the same quality analysis as senior engineers, democratizing expertise. The case study notes that engineers report reduced on-call stress because they know the AI will handle initial investigation. The time savings allow the SRE team to shift focus from reactive investigation to proactive prevention work like improving monitoring and building resilience.

## Critical Assessment and Balanced Perspective

While the case study presents compelling results, several aspects warrant balanced consideration. The system is still in shadow mode as of the publication date (April 2026), meaning it hasn't yet proven itself as the primary investigation tool in production. The 80%+ accuracy target suggests current accuracy may be below that threshold, though the exact figure isn't disclosed.

The 90-second investigation time is impressive but represents best-case scenarios. The case study doesn't discuss failure modes, edge cases, or situations where the AI investigation provides incorrect or misleading analysis. In production incident response, false positives or confident but wrong analyses could potentially delay resolution rather than accelerate it.

The case study claims that specialist agents complete checks in 5-8 seconds each and operate in parallel, contributing to the overall 90-second timeline. However, real-world API latencies, rate limits from observability platforms, and LLM inference times can be variable. The consistency of this performance under different load conditions and incident types isn't discussed.

The continuous learning approach through RAG enrichment is architecturally sound, but the case study doesn't address how they prevent knowledge base pollution from incorrect analyses or how they handle evolving infrastructure that might invalidate historical incident patterns. Knowledge base maintenance and curation in production LLM systems is a significant operational challenge.

## Design Philosophy and Strategic Lessons

The case study articulates several design principles that reflect mature thinking about AI in operations. The authors emphasize augmentation over replacement, focusing on automating the most time-consuming investigative work while preserving human judgment for complex decisions. The specialization approach using multiple focused agents rather than one general-purpose agent mirrors how expert teams operate and appears more robust than trying to build a single AI that understands everything.

The decision to start with "painful, repetitive work" rather than complex edge cases demonstrates pragmatic prioritization. Automating the investigation pattern that engineers repeat dozens of times weekly delivers immediate value even if it doesn't handle every possible scenario. This 80/20 approach to automation is sensible for production systems.

The emphasis on continuous improvement through feedback loops shows understanding that AI systems become valuable over time through accumulating domain knowledge rather than being perfect out of the box. This compounding effect is positioned as the key to long-term value.

## LLMOps Maturity Indicators

Several aspects of the implementation suggest operational maturity in deploying LLMs to production. The use of structured evidence with confidence scores rather than free-text summaries enables better evaluation and debugging. The parallel specialist agent architecture with a supervisor orchestrator demonstrates sophisticated workflow design beyond simple prompt-response patterns. The dual RAG system with different knowledge stores shows thoughtful information architecture.

The shadow mode deployment strategy with explicit accuracy targets before production rollout reflects appropriate caution for a system that impacts incident response in a payment infrastructure company. The integration with existing tools (Zenduty, Slack) rather than requiring workflow changes shows pragmatic deployment thinking.

However, the case study lacks detail on several LLMOps operational concerns. There's no discussion of evaluation methodology, how they measure the 80%+ accuracy target, or what constitutes a correct investigation. Monitoring and observability for the AI system itself isn't covered. The cost economics of running multiple specialist agents with LLM inference for every incident aren't mentioned. Latency budgets, fallback mechanisms if the AI system is unavailable, and handling of novel incident types outside the training distribution aren't addressed.

## Conclusion and Future Trajectory

Razorpay's Oncall Agent represents a sophisticated application of multi-agent LLM systems to production incident response in a financial infrastructure context. The technical architecture with specialist agents, dual RAG systems, and evidence synthesis demonstrates thoughtful design. The measured impacts during shadow mode are substantial if the system maintains performance in full production deployment.

The case study's conclusion raises an important question about whether this represents the future of incident response. The authors argue that the complexity of distributed systems is growing faster than the ability to hire and train people who can understand them, positioning AI-assisted investigation as a necessity rather than a luxury. This framing is compelling but also somewhat self-serving given they're promoting their own system.

The most credible aspect is the focus on a specific, well-defined problem (automating repetitive investigation work) rather than claiming to replace SRE teams entirely. The system's value proposition is enabling engineers to focus on genuinely complex problems requiring creativity and judgment rather than spending time on mechanical information gathering. Whether this vision fully materializes will depend on performance in full production deployment, which as of April 2026 was still pending validation across hundreds of cases.
