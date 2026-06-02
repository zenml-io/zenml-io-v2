---
title: "Real-time Clinical Audio Processing with Agentic Workflows"
slug: "real-time-clinical-audio-processing-with-agentic-workflows"
draft: false
llmopsTags:
  - "healthcare"
  - "speech-recognition"
  - "realtime-application"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "memory"
  - "error-handling"
  - "latency-optimization"
  - "monitoring"
  - "orchestration"
  - "microservices"
  - "api-gateway"
  - "open-source"
  - "reliability"
  - "scalability"
  - "openai"
industryTags: "healthcare"
company: "Abridge"
summary: "Abridge built a system for real-time clinical audio processing that records conversations between clinicians and patients, transcribing and analyzing them to drive healthcare products. The problem involved handling high-stakes healthcare data with strict durability and latency requirements, needing to process audio in real-time and make intelligent decisions about when to run specific products during ongoing conversations. The solution employed Temporal workflow orchestration as a harness for agentic workflows, combined with Kafka and Apache Flink for low-latency streaming audio processing. The system processes billions of actions per month across hundreds of healthcare systems, achieving sub-five-second latency requirements while maintaining durability and observability for protected health information."
link: "https://www.youtube.com/watch?v=ZybCTJLukyk"
year: 2026
seo:
  title: "Abridge: Real-time Clinical Audio Processing with Agentic Workflows - ZenML LLMOps Database"
  description: "Abridge built a system for real-time clinical audio processing that records conversations between clinicians and patients, transcribing and analyzing them to drive healthcare products. The problem involved handling high-stakes healthcare data with strict durability and latency requirements, needing to process audio in real-time and make intelligent decisions about when to run specific products during ongoing conversations. The solution employed Temporal workflow orchestration as a harness for agentic workflows, combined with Kafka and Apache Flink for low-latency streaming audio processing. The system processes billions of actions per month across hundreds of healthcare systems, achieving sub-five-second latency requirements while maintaining durability and observability for protected health information."
  canonical: "https://www.zenml.io/llmops-database/real-time-clinical-audio-processing-with-agentic-workflows"
  ogTitle: "Abridge: Real-time Clinical Audio Processing with Agentic Workflows - ZenML LLMOps Database"
  ogDescription: "Abridge built a system for real-time clinical audio processing that records conversations between clinicians and patients, transcribing and analyzing them to drive healthcare products. The problem involved handling high-stakes healthcare data with strict durability and latency requirements, needing to process audio in real-time and make intelligent decisions about when to run specific products during ongoing conversations. The solution employed Temporal workflow orchestration as a harness for agentic workflows, combined with Kafka and Apache Flink for low-latency streaming audio processing. The system processes billions of actions per month across hundreds of healthcare systems, achieving sub-five-second latency requirements while maintaining durability and observability for protected health information."
notion:
  pageId: "373f8dff-2538-80cf-9de4-ef16bc566ca3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:22:00.000Z"
  lastEditedTime: "2026-06-02T07:22:00.000Z"
  publishedAt: "2026-06-02T07:35:03Z"
---

## Overview

Abridge is a healthcare technology company that has built a sophisticated system for processing clinical conversations between healthcare providers and patients. The core product records these encounters, transcribes them in real-time, and uses LLM-based agents to drive various clinical products. The presentation by James Gibbons, a software engineer at Abridge, describes their evolution toward what they call "agentic ambient active listening" - a system that not only passively records and transcribes conversations but actively monitors them to trigger appropriate actions and products during the encounter itself.

The company operates at significant scale, processing billions of actions per month across hundreds of healthcare systems and providers. They integrate with several electronic health record systems and handle protected health information (PHI), making durability, reliability, and security paramount concerns. The technical architecture represents a mature approach to LLMOps, combining workflow orchestration, streaming data processing, and LLM-based agents to solve real-time clinical use cases.

## Technical Context and Evolution

Gibbons provided context for their architectural choices by describing his journey through various patterns for building distributed systems. He outlined the problems with synchronous microservice architectures, including poor observability, durability issues, and difficulty extending systems with new features. He also discussed attempts to solve these problems with message queues and Kafka topics, which improved durability but worsened observability and introduced new problems like poison records.

His experience with AWS Step Functions at a previous company provided a breakthrough in thinking about workflow orchestration, though Step Functions had limitations around defining workflows in infrastructure layer JSON rather than application code. This journey led him to Temporal at Abridge, where he found a more developer-friendly workflow orchestration solution that allowed workflows to be defined in code while providing built-in durability and observability.

At Abridge, the team initially fell into anti-patterns with Temporal, creating one-workflow-to-one-activity chains that essentially replicated synchronous microservice patterns and failed to leverage the benefits of workflow orchestration. They also had HTTP servers in the middle of workflow calls across namespaces, which created retry storms during outages. The team refactored to embrace a more workflow-centric architecture, consolidating logic into comprehensive encounter workflows and adopting Temporal Nexus to eliminate the HTTP layer between namespaces.

## Core Architecture: The Encounter Workflow

The fundamental abstraction in Abridge's system is the "encounter" - a single conversation between a clinician and a patient. Each encounter is represented as a Temporal workflow that orchestrates all the processing and products associated with that conversation. This encounter workflow is the backbone of their system and handles audio ingestion, transcription, and the execution of various clinical products.

The workflow receives signals every 30 seconds as audio chunks are uploaded during the conversation. Activities transcribe these audio chunks, and when the encounter completes, the workflow runs all the products they guarantee to deliver to customers. This consolidated workflow approach provides a clear view of the entire encounter lifecycle in one place, dramatically improving observability compared to their previous distributed microservice approach.

The use of Temporal Nexus has been particularly valuable for cross-namespace communication. Instead of making HTTP calls between namespaces with custom retry logic, they can now make a single execute Nexus workflow command, and the calling namespace handles all retry logic automatically. This has eliminated entire classes of operational problems and simplified their architecture.

## Streaming Audio Processing for Low Latency

A major evolution in Abridge's system was the move from 30-second audio chunk processing to streaming audio with 500-millisecond chunks. This change was driven by new product requirements that needed to operate during the conversation itself, with strict latency requirements - once something is said, the system needs to respond to the client within five seconds.

This streaming audio architecture is notably not built on Temporal. Gibbons explicitly stated that while they love Temporal, it's not well-suited for high-throughput streaming data use cases with large volumes of data moving rapidly. Instead, they use Kafka for the streaming audio pipeline because of its single-digit millisecond read and write performance. They ingest 500-millisecond audio chunks and post them to Kafka topics.

For the stateful stream processing required to accumulate audio chunks in windows and transcribe them, they employ Apache Flink. This is a sophisticated streaming architecture that handles the continuous flow of audio data. Once transcription is complete, the transcribed words are placed on another Kafka topic. A consumer reads from this topic and sends signals to the Temporal workflows that handle the agentic logic.

This hybrid architecture demonstrates mature thinking about LLMOps infrastructure - using the right tool for each part of the problem. Temporal excels at orchestrating durable, long-running workflows with complex logic and state management, while Kafka and Flink handle high-throughput streaming data processing. The two systems are integrated through signals, allowing the streaming pipeline to trigger workflow logic without forcing all data through Temporal's execution model.

## Agentic Workflows for Active Listening

The most innovative aspect of Abridge's system is what they call "agentic ambient active listening." The term breaks down into three components: ambient listening refers to their core capability of recording and transcribing conversations, active listening means running products and taking actions during the conversation rather than only after it completes, and agentic refers to using LLM-based agents to decide when to trigger these products.

The challenge they faced was that as the conversation accumulates and the transcript grows, they have product requirements to run various clinical tools, but they don't know in advance when these products should run. The solution was to place an agent in the workflow that continuously monitors the accumulating transcript and makes decisions about when to execute products.

The agentic active listening workflow receives signals as utterances come in from the streaming transcription pipeline. An agent within the workflow accumulates this conversational state and makes decisions based on the current state of the transcript plus enriched data about the patient and clinician. When the agent determines a product should run, it executes either as an activity or a child workflow within the Temporal system.

Gibbons emphasized that using Temporal as a harness for agentic workflows provides significant benefits. The workflow's inherent state management provides the agent with short-term memory out of the box - the agent can store information in workflow state like a dictionary and reference it to remember what products have already been executed, avoiding redundant operations. The durability guarantees mean that even if systems fail, the agent's state and decisions are preserved and can continue after recovery.

## LLM Integration and Agent Architecture

While the specific products built on this agentic system are not yet public, Gibbons provided a proof-of-concept example: an intelligent to-do list for clinicians. In the demo scenario, a clinician says during the conversation "I need to take your blood pressure." The agent recognizes this intent and adds "take patient's blood pressure" to a to-do list visible in the app. As the conversation continues, if the clinician forgets to actually take the blood pressure, they can glance at the app and see the reminder. When they finally measure it and say "120 over 80," the system checks off the item on the list.

This example illustrates the agent's capabilities: understanding clinical intent from natural language, maintaining state across the conversation, and recognizing when actions are completed. The underlying agent logic involves analyzing the transcript with enriched contextual data to make these determinations.

Abridge uses OpenAI for their LLM capabilities, and they've implemented streaming token generation to provide responsive user experiences. This is technically challenging in their multi-region deployment architecture. Their solution again leverages Temporal creatively: they have an activity that receives streaming tokens from OpenAI and sends signals to a workflow in a different namespace. That workflow micro-batches the tokens, and their API has a client connection that polls the workflow for tokens. While not true end-to-end streaming, this approach provides enough responsiveness to feel like streaming, and they smooth out any irregularities on the frontend.

This streaming token architecture was inspired by an example built by a Temporal team member, demonstrating how they leverage community patterns and open source examples to solve their problems. The use of cross-namespace workflows for token streaming shows sophisticated understanding of Temporal's capabilities and willingness to use it in creative ways beyond standard workflow patterns.

## Multi-Agent Communication and Future Vision

Abridge has also built a separate agent that clinicians can interact with through text-based chat. Gibbons described a future vision where multiple agents exist within workflows and communicate with each other via Temporal signals and queries. This would create an ecosystem of specialized agents, each handling different aspects of clinical workflow, coordinating through the workflow orchestration layer.

This multi-agent architecture represents forward-thinking LLMOps design. Rather than building monolithic agent systems, they're creating modular agents with specific responsibilities that can coordinate through well-defined interfaces. Temporal's signal and query mechanisms provide the communication primitives for this agent ecosystem, while the workflow execution model ensures that all agent interactions are durable and observable.

## Observability and Operational Considerations

A recurring theme throughout the presentation was the importance of observability in production LLM systems. Gibbons contrasted the difficulty of debugging distributed microservices - digging through logs, metrics, and tracing across multiple systems - with the Temporal UI where he can simply view a workflow and immediately see which activity is taking a long time or where a failure occurred.

This observability is particularly critical for healthcare applications where reliability is not just about user experience but patient safety. The ability to see the full history of an encounter workflow, understand what decisions were made and when, and debug issues quickly is essential for operating in this domain.

The durability guarantees of Temporal are equally important. In the synchronous microservice world, when a service goes down, there's a difficult choice: ignore the failure and return potentially incorrect data, or rely on users to retry. For Abridge, where clinicians put their phone down and trust the system to record an entire patient encounter, data loss is not acceptable. Temporal's durable execution model ensures that even if systems fail, the workflow state is preserved and processing continues from where it left off after recovery.

## Scale and Deployment

Abridge operates at substantial scale, processing billions of actions per month across hundreds of workflows. They're deployed across hundreds of healthcare systems and providers, integrating with several electronic health record systems. This multi-tenant, multi-region deployment adds complexity to their infrastructure, particularly around data locality requirements for protected health information.

The architecture they've built needs to handle variable load patterns - encounters starting and stopping throughout the day across different time zones and healthcare systems, with varying lengths and complexity. The combination of Temporal for workflow orchestration and Kafka/Flink for streaming handles this variability well, with Temporal providing reliable execution guarantees and the streaming infrastructure handling high-throughput data ingestion.

## Critical Assessment and Tradeoffs

The architecture Abridge has built represents mature thinking about production LLM systems, but it also comes with significant complexity and operational overhead. Gibbons was candid about the costs of their streaming audio architecture, explicitly stating that if durable audio isn't required, he wouldn't recommend this approach because it's very expensive and requires substantial maintenance.

The decision to use multiple specialized systems - Temporal for orchestration, Kafka for streaming, Flink for stateful stream processing, and OpenAI for LLM capabilities - creates a complex operational environment. Each system needs to be monitored, maintained, and scaled independently. The integration points between these systems are potential failure modes that need careful management.

However, these tradeoffs appear justified by their requirements. The five-second latency requirement for real-time products during conversations necessitates the streaming architecture. The need for absolute durability of patient encounter data justifies the complexity of the durable audio pipeline. The observability and reliability benefits of Temporal justify the investment in learning and operating that system.

One notable aspect is their pragmatic approach to choosing technologies. They didn't try to force all their requirements into a single system. They recognized that Temporal, despite being central to their architecture, wasn't the right tool for high-throughput streaming data. This kind of pragmatic tool selection is a hallmark of mature engineering organizations.

The agentic approach to deciding when to run products is elegant but raises questions about reliability and predictability. LLM-based agents can make mistakes or behave inconsistently. The presentation didn't discuss how they handle agent errors, validate agent decisions, or ensure consistent behavior across similar encounters. These are critical concerns for healthcare applications where mistakes could impact patient care.

## LLMOps Lessons and Patterns

Several LLMOps patterns emerge from Abridge's architecture that are applicable beyond their specific use case:

Workflow orchestration as an agent harness is a powerful pattern. Using a durable workflow system to host agent logic provides benefits like built-in state management, durability, observability, and the ability to coordinate multiple agents through signals and queries. This addresses many challenges of putting agents into production.

The hybrid architecture of workflow orchestration for complex logic combined with streaming systems for high-throughput data shows how to architect systems with mixed requirements. Not everything needs to flow through the workflow system - streaming data can be processed separately and trigger workflows at appropriate points.

Cross-namespace communication through Nexus demonstrates how to build modular systems while maintaining reliability guarantees. Rather than coupling namespaces with HTTP calls and custom retry logic, standardized workflow-to-workflow communication provides cleaner abstractions.

Streaming token generation through workflow polling is a creative solution to the challenge of integrating streaming LLM responses with multi-region architectures. While not true end-to-end streaming, micro-batching and polling can provide acceptable user experience with simpler operational characteristics.

The evolution from anti-patterns to mature patterns shows the learning curve of workflow orchestration systems. The initial one-workflow-one-activity pattern failed to leverage the benefits of the system. Consolidating related logic into cohesive workflows that model business processes rather than just wrapping individual operations is key to realizing the value.

## Healthcare Context and Compliance

Operating in healthcare adds layers of complexity beyond the technical challenges. Abridge handles protected health information, which requires strict security and compliance measures. Their multi-region deployment likely relates to data residency requirements. Integration with electronic health record systems requires handling various standards and vendor-specific interfaces.

The trust clinicians place in the system - literally putting their phone down and expecting the entire conversation to be captured reliably - creates high stakes for reliability. The durability guarantees of their architecture directly address this trust requirement. The observability provided by Temporal helps them quickly diagnose and resolve any issues that do occur, minimizing impact on clinicians and patients.

## Conclusion

Abridge's architecture represents a sophisticated approach to production LLM systems in healthcare. They've combined workflow orchestration, streaming data processing, and LLM-based agents to create a system that operates in real-time at scale while maintaining the durability and observability required for healthcare applications. The evolution of their architecture shows learning from anti-patterns and making pragmatic technology choices based on specific requirements rather than trying to fit all needs into a single system. While the complexity is significant, it appears justified by their domain requirements and scale of operation.
