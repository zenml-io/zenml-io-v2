---
title: "Healthcare Voice Scheduling Agent with Progressive Authentication and Latency Masking"
slug: "healthcare-voice-scheduling-agent-with-progressive-authentication-and-latency-masking"
draft: false
llmopsTags:
  - "healthcare"
  - "customer-support"
  - "question-answering"
  - "chatbot"
  - "realtime-application"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "structured-output"
  - "unstructured-data"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "memory"
  - "latency-optimization"
  - "fallback-strategies"
  - "chunking"
  - "system-prompts"
  - "human-in-the-loop"
  - "error-handling"
  - "agent-based"
  - "evals"
  - "serverless"
  - "monitoring"
  - "databases"
  - "microservices"
  - "orchestration"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
industryTags: "healthcare"
company: "Natera"
summary: "Natera replaced a container-based voice scheduling workflow with a production voice agent for mobile phlebotomy appointments, using Amazon Bedrock AgentCore Runtime and Memory, Amazon Bedrock foundation models, retrieval-augmented generation, and integrations with telephony, identity, vendor, and scheduling services. The architecture uses a dual-WebSocket bridge, event-driven filler responses to mask backend delays, and progressive authentication to control access to patient context. AWS reports 100% tool-calling and parameter accuracy across 500 simulated calls, over 90% accuracy for general patient inquiries, a 6.8-second median perceived latency, and a per-call cost below USD 0.01 in the stated evaluation. In an early four-week production comparison, the system handled 4,744 calls, reduced calls ending within 30 seconds from 22% to 12%, and slightly improved verification completion, although the reported metrics are vendor-published and should be independently validated under representative clinical operating conditions."
link: "https://aws.amazon.com/blogs/machine-learning/nateras-intelligent-appointment-scheduling-with-amazon-bedrock-agentcore/"
year: 2026
seo:
  title: "Natera: Healthcare Voice Scheduling Agent with Progressive Authentication and Latency Masking - ZenML LLMOps Database"
  description: "Natera replaced a container-based voice scheduling workflow with a production voice agent for mobile phlebotomy appointments, using Amazon Bedrock AgentCore Runtime and Memory, Amazon Bedrock foundation models, retrieval-augmented generation, and integrations with telephony, identity, vendor, and scheduling services. The architecture uses a dual-WebSocket bridge, event-driven filler responses to mask backend delays, and progressive authentication to control access to patient context. AWS reports 100% tool-calling and parameter accuracy across 500 simulated calls, over 90% accuracy for general patient inquiries, a 6.8-second median perceived latency, and a per-call cost below USD 0.01 in the stated evaluation. In an early four-week production comparison, the system handled 4,744 calls, reduced calls ending within 30 seconds from 22% to 12%, and slightly improved verification completion, although the reported metrics are vendor-published and should be independently validated under representative clinical operating conditions."
  canonical: "https://www.zenml.io/llmops-database/healthcare-voice-scheduling-agent-with-progressive-authentication-and-latency-masking"
  ogTitle: "Natera: Healthcare Voice Scheduling Agent with Progressive Authentication and Latency Masking - ZenML LLMOps Database"
  ogDescription: "Natera replaced a container-based voice scheduling workflow with a production voice agent for mobile phlebotomy appointments, using Amazon Bedrock AgentCore Runtime and Memory, Amazon Bedrock foundation models, retrieval-augmented generation, and integrations with telephony, identity, vendor, and scheduling services. The architecture uses a dual-WebSocket bridge, event-driven filler responses to mask backend delays, and progressive authentication to control access to patient context. AWS reports 100% tool-calling and parameter accuracy across 500 simulated calls, over 90% accuracy for general patient inquiries, a 6.8-second median perceived latency, and a per-call cost below USD 0.01 in the stated evaluation. In an early four-week production comparison, the system handled 4,744 calls, reduced calls ending within 30 seconds from 22% to 12%, and slightly improved verification completion, although the reported metrics are vendor-published and should be independently validated under representative clinical operating conditions."
notion:
  pageId: "3e9f8dff-2538-8060-b7a4-d8c3b2713f49"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:17:00.000Z"
  lastEditedTime: "2026-09-28T08:17:00.000Z"
  publishedAt: "2026-09-28T08:24:28Z"
---

## Overview

Natera, a diagnostics company operating a mobile phlebotomy service, built a voice agent that lets oncology and other patients schedule home blood draws through a telephone conversation. The previous workflow used a third-party AI voice and orchestration provider connected through Twilio and hosted on Amazon ECS. It could support scheduling, but Natera wanted better accuracy, scalability, conversational continuity, and operational visibility for a workflow involving identity verification, SMS codes, multiple appointment vendors, patient-specific information, and fallback to human staff.

The replacement system runs its orchestration on Amazon Bedrock AgentCore Runtime and uses AgentCore Memory, Amazon Bedrock foundation models, Bedrock Guardrails, and Bedrock Knowledge Bases. Its central production design choices are a dual-WebSocket bridge between Twilio and a real-time voice-processing service, parallel contextual filler generation while backend tools run, and progressive trust that moves from an unauthenticated phone-based session to a verified patient session. The source reports strong validation results—100% tool-calling accuracy across 500 end-to-end simulations, 6.8-second median perceived latency, and a cost below USD 0.01 per completed call—but these figures come from the AWS/Natera account and should be treated as implementation-specific rather than universal benchmarks.

## Problem and use case

Patients call, authenticate, provide a service location and three preferred dates, and wait while Natera coordinates availability with phlebotomists and third-party vendors. The system must retrieve order and product information, provide relevant preparation or process information, submit an appointment request, and confirm the resulting appointment. It also needs to handle questions about blood draws, preparation, and insurance, while avoiding medical advice or unsupported interpretation of test results.

This is not a simple single-turn chatbot. It combines real-time audio streaming, relatively slow external APIs, sensitive patient information, multiple workflow states, and potentially risky outcomes if the wrong patient or appointment is selected. Natera selected a custom AgentCore architecture rather than a prebuilt scheduling agent because its vendor coordination and telephony requirements were more specialized than the standard Epic or Cerner workflows referenced in the source.

## Architecture and migration

The agent maintains one WebSocket connection with Twilio for bidirectional call media and a second connection with a real-time voice-processing API. AgentCore Runtime acts as the orchestration layer: it passes audio and generated responses between the two channels, intercepts model-generated tool calls, executes business operations, and returns results to the conversation. This decouples the telephony provider from the model or voice-processing service, allowing either side to be changed independently. The flexibility comes at the cost of additional concurrent connection, lifecycle, and state-management complexity.

Natera migrated from Amazon ECS to the managed AgentCore Runtime environment. The team first separated voice and business orchestration logic from container-specific health checks, scaling policies, manifests, and HTTP server initialization. It then adapted the entry point to the AgentCore invocation handler and moved session state out of container-local memory into AgentCore Memory. Because ECS tasks could remain alive while AgentCore microVMs are scoped to an invocation, the team had to manage WebSocket connections within the runtime context and redesign state around durable actor identifiers. The migration reduced responsibility for container scaling, health checks, and deployment infrastructure, but it did not eliminate application-level lifecycle or distributed-state concerns.

## Conversational latency and model orchestration

A significant production insight was that perceived delay was driven primarily by external tools rather than raw LLM inference. Authentication averaged about 2.5 seconds and scheduling about 4 seconds in the measurements described. The team exported AgentCore traces to CloudWatch Logs over two weeks, calculated per-tool latency distributions, used the P50 as a baseline, and triggered a filler request approximately one second before that baseline. For example, a filler might start around 1.5 seconds into authentication or 3 seconds into scheduling.

The filler prompt supplies the tool name, the patient’s last utterance, and the current workflow step, and requires one short sentence under 15 words. It tells the model to acknowledge the wait without promising an outcome. A response such as “I’m checking availability with your local provider” is generated in parallel with the backend operation and injected into the voice stream only when the operation has not already completed. This event-driven approach avoids unnecessary filler for fast calls and reduces dead air for slower ones. It improves user experience without proving that the underlying APIs are faster; indeed, the source says one vendor API accounted for 70% of perceived latency.

The pattern introduces risks that require controls. Filler text must not imply that an appointment is confirmed, disclose sensitive information, or conflict with a later tool result. Timing thresholds are also workload-dependent: P50-based calibration may leave silence for tail-latency calls, while aggressive repeated fillers could sound unnatural or interrupt the user. The implementation therefore depends on careful prompt constraints, cancellation behavior, trace analysis, and testing of overlapping audio and tool events.

## Identity, memory, and progressive trust

The call begins in a low-trust session. Natera hashes the caller’s phone number with SHA-256 and uses the hash as an actor ID, allowing the system to retain early conversational context without immediately exposing patient data. After collecting personal identifiers and completing verification against Natera’s identity service, the agent creates a second session keyed to the verified patient ID. It transfers the earlier conversation history into the authenticated session and marks the original session as merged and unavailable for future retrieval.

This memory handoff allows a natural conversation rather than forcing the patient to repeat information after authentication. It also makes authorization an explicit state transition. General interaction can occur with limited identity confidence, while appointment confirmation and access to sensitive history require full verification. Tool availability is gated by authentication, and the source states that the agent is technically restricted from retrieving another patient’s data or accessing personal information for an unverified caller.

AgentCore Memory stores short-term session information and longer-term activity such as appointment preferences and prior interactions, with Amazon DynamoDB described as the durable backing store. An event pipeline using Amazon MSK and AWS Lambda summarizes activity from web, SMS, email, and call channels into memory. This can improve personalization, but it also expands the data-governance surface: retention, actor-ID collisions, session merging, deletion, access auditing, and incorrect event association require explicit operational controls. The source describes the design and security intent but does not provide independent audit results or error rates for memory retrieval and identity matching.

## Retrieval-augmented generation and safety

For patient questions outside predefined scheduling prompts, Natera stores FAQs, procedure guides, and policy information in Amazon S3 and uses Amazon Bedrock Knowledge Bases for retrieval. Amazon Titan Text Embeddings V2 produces document and query vectors. A hierarchical chunking strategy represents sections, paragraphs, and sentences to better match questions at different levels of specificity. The source reports more than 90% response accuracy on 200 representative patient inquiries during development, but it does not define the full scoring rubric, confidence intervals, or the distribution of difficult and ambiguous questions.

Bedrock Guardrails and workflow controls are used to limit unsafe behavior. The agent is not intended to provide diagnosis, medical advice, or result interpretation beyond verified tool outputs. Distress, emergency language, profanity, and selected flagged terms trigger human escalation. SMS is withheld until communication preferences are verified and verbal consent is obtained. The system also uses output-level controls to prevent reading sensitive identifiers aloud, while tool access remains constrained by authentication.

The source describes hallucination detection, similarity scoring, relevancy evaluation, deterministic verdicts, repetition detection, and out-of-context checks around RAG responses. These mechanisms are useful defense layers, but they should not be treated as a guarantee of correctness. In a regulated healthcare workflow, retrieval quality, document freshness, policy versioning, abstention behavior, escalation coverage, and human review remain important. The voice-processing service and other components must also satisfy the organization’s data-processing and HIPAA obligations; the stated architecture uses HIPAA-eligible AWS services under a BAA, while Natera was still exploring options to keep all audio processing within the BAA boundary.

## Evaluation, observability, and production results

AgentCore traces capture agent-loop iterations, tool selection, parameters, model timing, memory retrieval, and session-level events. This makes it possible to distinguish model latency from vendor API latency and to compare expected versus actual tool calls. During four months of development and testing, Natera ran 500 end-to-end call simulations. The reported orchestrator routed every scenario to the expected specialized agent and supplied correctly structured parameters, producing 100% tool-calling and parameter accuracy in that test set. The system reported a 6.8-second median end-to-end perceived latency, including voice processing, with 6.2 seconds attributed to the Bedrock portion, and a total completed-call cost below USD 0.01 under the stated measurement method.

The post also reports production operation for inbound mobile-phlebotomy scheduling. Across a four-week reporting window, AgentCore handled 4,744 calls, a 5.5% increase over the prior system. Calls shorter than 30 seconds fell from 22% to 12%, suggesting fewer early abandons or transfers. Verification completion rose from 64% to 66%. Survey response rates increased from 1.09% to 1.60%, while promoter and detractor shares remained broadly stable. Average duration for resolved interactions increased from 79 to 101 seconds, consistent with keeping patients in the workflow longer, though longer calls are not by themselves evidence of better clinical or operational outcomes.

These results should be interpreted with appropriate limits. The simulation sample and 200-question RAG dataset may not represent production diversity, accent variation, rare names, tail latency, adversarial prompts, or failure conditions. The production comparison does not establish causality without more information about call mix, seasonality, routing changes, staffing, and statistical significance. Cost also depends on model usage, audio processing, tool volume, storage, and vendor pricing. Nonetheless, the combination of per-step traces, scenario testing, and production behavior metrics illustrates a credible LLMOps feedback loop.

## Operational lessons and tradeoffs

Testing with diverse inputs exposed voice-recognition failures for uncommon ethnic names. Natera added a spelling-helper tool when recognition confidence was low, demonstrating why representative user testing is necessary beyond happy-path tool-call tests. The progressive-authentication design also had to be planned before implementation because changing actor IDs and memory handoff semantics later would be substantially harder.

The architecture is well suited to long-running, regulated voice workflows that need flexible telephony, vendor coordination, durable context, and detailed tracing. AgentCore Runtime reduces infrastructure management, while AgentCore Memory and managed retrieval reduce the need to operate separate state and vector-search services. Conversely, the dual-WebSocket bridge, parallel filler loop, session merge process, and multiple security boundaries increase engineering and testing burden. For simple text Q&A or single-turn agents, direct model integration would likely be easier to operate.

Overall, the case demonstrates production-oriented LLMOps rather than merely a model integration: traces drive latency tuning, tool calls are evaluated against expected actions, memory and identity are modeled as explicit lifecycle states, retrieval is tested against a labeled inquiry set, and guardrails are combined with escalation and authorization controls. The strongest evidence is operational—the system is reported to be handling live calls—but the published metrics remain claims from the implementation team and should be supplemented with independent safety, fairness, reliability, and clinical-governance evaluation as the system expands to additional patient workflows.
