---
title: "Real-Time Speech-to-Speech Voice Agent for Automotive Dealerships"
slug: "real-time-speech-to-speech-voice-agent-for-automotive-dealerships"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "realtime-application"
  - "prompt-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "serverless"
  - "docker"
  - "databases"
  - "redis"
  - "fastapi"
  - "monitoring"
  - "amazon-aws"
industryTags: "automotive"
company: "Loka"
summary: "Loka built a conversational AI voice agent for automotive dealerships using Amazon Nova 2 Sonic to address the latency and naturalness problems inherent in traditional three-step voice AI pipelines (speech-to-text, LLM processing, text-to-speech). By using native speech-to-speech models that process audio end-to-end, Loka achieved 87.0 speech reasoning accuracy on Big Bench Audio benchmarks, reduced time to first audio to 1.39 seconds, and lowered operational costs to approximately $0.27 per hour of input audio. Through iterative prompt engineering and systematic evaluation using LLM-as-judge methodology, they improved overall conversation quality scores from 2.7 to 3.8 out of 5.0, with the production system deployed on AWS using a serverless architecture built on LiveKit, Amazon ECS on Fargate, Amazon Bedrock, and other AWS services."
link: "https://aws.amazon.com/blogs/machine-learning/how-loka-built-a-natural-low-latency-voice-agent-with-amazon-nova-2-sonic/"
year: 2026
seo:
  title: "Loka: Real-Time Speech-to-Speech Voice Agent for Automotive Dealerships - ZenML LLMOps Database"
  description: "Loka built a conversational AI voice agent for automotive dealerships using Amazon Nova 2 Sonic to address the latency and naturalness problems inherent in traditional three-step voice AI pipelines (speech-to-text, LLM processing, text-to-speech). By using native speech-to-speech models that process audio end-to-end, Loka achieved 87.0 speech reasoning accuracy on Big Bench Audio benchmarks, reduced time to first audio to 1.39 seconds, and lowered operational costs to approximately $0.27 per hour of input audio. Through iterative prompt engineering and systematic evaluation using LLM-as-judge methodology, they improved overall conversation quality scores from 2.7 to 3.8 out of 5.0, with the production system deployed on AWS using a serverless architecture built on LiveKit, Amazon ECS on Fargate, Amazon Bedrock, and other AWS services."
  canonical: "https://www.zenml.io/llmops-database/real-time-speech-to-speech-voice-agent-for-automotive-dealerships"
  ogTitle: "Loka: Real-Time Speech-to-Speech Voice Agent for Automotive Dealerships - ZenML LLMOps Database"
  ogDescription: "Loka built a conversational AI voice agent for automotive dealerships using Amazon Nova 2 Sonic to address the latency and naturalness problems inherent in traditional three-step voice AI pipelines (speech-to-text, LLM processing, text-to-speech). By using native speech-to-speech models that process audio end-to-end, Loka achieved 87.0 speech reasoning accuracy on Big Bench Audio benchmarks, reduced time to first audio to 1.39 seconds, and lowered operational costs to approximately $0.27 per hour of input audio. Through iterative prompt engineering and systematic evaluation using LLM-as-judge methodology, they improved overall conversation quality scores from 2.7 to 3.8 out of 5.0, with the production system deployed on AWS using a serverless architecture built on LiveKit, Amazon ECS on Fargate, Amazon Bedrock, and other AWS services."
notion:
  pageId: "397f8dff-2538-80b3-8c57-f486c17862a3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:53:00.000Z"
  lastEditedTime: "2026-07-08T19:53:00.000Z"
  publishedAt: "2026-07-08T20:13:31Z"
---

## Overview

Loka, a company specializing in production-ready AI solutions, developed a real-time conversational voice agent for automotive dealerships using Amazon Nova 2 Sonic, a native speech-to-speech model. This case study exemplifies production LLMOps at scale, demonstrating how modern speech-to-speech architectures can overcome the fundamental limitations of traditional voice AI pipelines. The solution was deployed in production across automotive dealerships to handle customer inquiries, appointment scheduling, and inventory searches through natural voice interactions.

The core problem Loka addressed was the inherent latency and lack of naturalness in traditional voice assistants. Traditional systems use a three-step pipeline: speech-to-text conversion, LLM text processing, and text-to-speech synthesis. This architecture introduces compounding delays of 3-5 seconds per interaction and loses crucial contextual information like tone, hesitation, and urgency during the speech-to-text conversion. For automotive dealerships where customers expect immediate responses during sales conversations, these delays result in customer frustration, abandoned calls, and lost revenue.

## Technical Approach and Model Selection

Loka leveraged Amazon Nova 2 Sonic, a native speech-to-speech model that processes audio end-to-end without intermediate text conversion. This architectural choice represents a fundamental shift in how voice AI systems are built for production. Rather than orchestrating separate speech-to-text, LLM, and text-to-speech components, the unified model handles understanding, reasoning, and generation as a single process, preserving acoustic information throughout.

The team conducted rigorous benchmarking using Big Bench Audio to validate model selection. Amazon Nova 2 Sonic achieved a speech reasoning score of 87.0, outperforming Gemini 2.5 Flash Native Audio at 71.0 and GPT Realtime at 83.0. Beyond accuracy, latency was critical for production viability. Nova 2 Sonic achieved time to first audio of 1.39 seconds, enabling natural "barge-in" behavior where users can interrupt the agent conversationally. Cost efficiency was also measured at approximately $0.27 per hour of input audio, making the solution economically viable for deployment across thousands of dealership locations.

## Evaluation Infrastructure and LLM-as-Judge

A sophisticated evaluation pipeline was central to Loka's LLMOps practice. They implemented an automated LLM-as-judge system that scored conversations on five dimensions using a 1-5 scale: Response Appropriateness (relevance and contextual correctness), Intent Understanding (grasping user goals), Completeness (providing required information or actions), Error Recovery (handling mistakes gracefully), and Conversational Naturalness (flow, turn-taking, tone, and human-likeness).

Comparing Amazon Nova Sonic (baseline) to Amazon Nova 2 Sonic revealed measurable improvements. Response Appropriateness improved from 2.5 to 2.9, Intent Understanding from 2.9 to 3.0, Completeness from 1.8 to 2.5 (a significant +0.7 gain indicating better task completion), and Conversational Naturalness from 2.5 to 2.8. The overall judge score increased from 2.4 to 2.7. These metrics provided quantitative evidence of model capability improvements relevant to production use cases.

## Prompt Engineering as Code

Loka treated prompt engineering as a formal engineering discipline, iterating systematically based on measured performance. The baseline Nova 2 Sonic configuration scored 2.7 overall. After the first prompt refinement, the score rose to 3.1. The second iteration achieved 3.8 out of 5.0, representing substantial improvement through better turn discipline and repetition control. The agent learned when to speak, when to listen, and when to ask clarifying questions.

The prompt evolution involved several key technical improvements. Hardcoded dealership details were replaced with templatized variables like `{assistant_name}` and `{dealership_address}`, making the prompt reusable across multiple dealership deployments. The formatting shifted from numbered lists to bullet points under clearly labeled headings like "Tool Usage Rules," "Error Recovery," and "Conversation Endings," giving the model sharper behavioral boundaries and reducing instruction bleed between topics. Concrete behavior examples were added throughout, showing exactly how to acknowledge without echoing the caller. A pre-response checklist was introduced that prompts the model to self-audit before every reply.

Amazon Bedrock Prompt Management became the operational foundation for this lifecycle. It allowed the team to store each template version with a unique Amazon Resource Name (ARN) and promote changes from draft to production without modifying application code. When onboarding new dealerships, specific variables were injected at runtime through the Amazon Bedrock API, meaning the same core prompt served every client while remaining fully customizable. AWS IAM access controls restricted who could author, approve, or deploy prompt changes, bringing proper governance to what was previously an informal editing process. This transformed prompt engineering from a one-off task into a repeatable, auditable workflow that scaled with the number of dealerships and use cases.

## Edge Case Testing with Personas

Real-world validation required testing against edge cases mirroring actual dealership calls. Loka evaluated the system against five customer personas: Angry Customer, Busy Parent, Chatty Customer, Confused Customer, and Elderly Customer. The Busy Parent scenario scored perfect 5.0 across all dimensions, demonstrating the agent could handle interruptions, background noise, and time pressure flawlessly. The Angry Customer case scored 4.5 overall, with the agent remaining calm, empathetic, and solution-focused. The Confused Customer scenario also scored 4.5, with the agent patiently clarifying without condescension.

Two scenarios revealed opportunities for improvement. The Chatty Customer and Elderly Customer cases both scored 3.0 overall. When users provided long, meandering inputs, the agent struggled with structure. Completeness scores dropped to 2.5 and Error Recovery fell to 2.0 in these situations. These results identified clear areas for future prompt engineering work. Despite these gaps, the average edge-case score of 4.0 indicated strong real-world readiness. This persona-based testing approach represents best practice in LLMOps evaluation, moving beyond synthetic benchmarks to scenarios grounded in actual user behavior.

## Production Architecture

Loka designed a serverless, event-driven architecture for production deployment. LiveKit served as the transport layer, abstracting the complexities of WebRTC for web clients and Session Initiation Protocol (SIP) for phone calls. This allowed the engineering team to focus on agent logic rather than real-time communication protocols.

AWS Fargate provided the compute layer, with LiveKit Agents containerized on Amazon ECS. This enabled independent scaling of agent workers versus media servers, allowing resource optimization dynamically during peak dealership hours. Amazon RDS served as the persistent relational store for structured application data including dealership configurations, conversation history, and customer records. Given that real-time voice agents cannot tolerate database latency, Amazon ElastiCache handled room management and ephemeral session coordination across distributed tasks.

Amazon Bedrock provided direct API access to the Nova 2 Sonic model. Browser clients connected using WebRTC, while traditional phone calls entered through a SIP Trunk routed via Network Load Balancer for TCP/UDP media packet throughput. Observability came from Langfuse, self-hosted on AWS, which traced every agent decision and tool call. This observability data was fed back into the evaluation pipeline for continuous improvement, closing the LLMOps loop.

## Function-Based Tool Integration

The voice agent integrates with dealership backend operations through Python function-based tools, representing actions the assistant can perform during conversations. Common tools include inventory search, appointment booking, and customer data lookup. These tools act as the integration layer between Amazon Nova 2 Sonic and backend services. The model decides when a tool should be used based on conversation context, and the Python function executes the corresponding GraphQL query or mutation, returning structured data back to the agent for synthesis into the conversational response. This tool-calling pattern is essential for production LLM deployments, enabling the model to access real-time information and execute actions beyond its training data.

## Critical Assessment and Production Readiness

While this case study presents impressive results, several caveats deserve consideration. The evaluation metrics, though comprehensive, rely on LLM-as-judge methodology, which can introduce bias depending on the judge model's capabilities and prompt design. The relatively modest scores (3.8 out of 5.0 after optimization) suggest the system is production-ready but not flawless. The identified weaknesses with chatty and elderly customers, where error recovery dropped to 2.0, indicate potential production issues requiring ongoing monitoring and prompt refinement.

The cost figure of $0.27 per hour of input audio represents only the model inference cost and doesn't account for infrastructure expenses (Fargate containers, ElastiCache, RDS, networking), observability tooling (Langfuse), or the engineering effort required for continuous prompt optimization. Organizations considering this architecture should budget for the full operational cost of running production voice AI systems.

The case study's claim that the system is "driving revenue in production" for automotive dealerships is presented without specific business metrics like call completion rates, customer satisfaction scores, or cost savings compared to human agents. While the technical achievements are clear, the business impact would benefit from quantification.

Nevertheless, this case study demonstrates mature LLMOps practices: systematic model selection through benchmarking, rigorous evaluation infrastructure, prompt versioning and governance, persona-based testing, production-grade architecture with proper observability, and a feedback loop for continuous improvement. The architecture is genuinely serverless and scalable, with clear separation of concerns between transport (LiveKit), compute (ECS on Fargate), persistence (RDS), caching (ElastiCache), and model serving (Bedrock). The use of standardized tools like GraphQL for backend integration and IAM for access control shows enterprise-ready thinking.

The transition from Nova Sonic to Nova 2 Sonic and the iterative prompt improvements from baseline (2.7) to v1 (3.1) to v2 (3.8) exemplify continuous deployment practices essential to production LLMOps. The team didn't just deploy once; they established infrastructure for ongoing improvement based on measured performance.

## Broader Implications

This case study represents an important milestone in the maturation of conversational AI for production use. The shift from chained pipeline architectures (STT → LLM → TTS) to native speech-to-speech models has implications beyond automotive dealerships. Any industry requiring real-time, intelligent voice interactions—travel booking, healthcare scheduling, educational tutoring, customer support—can potentially benefit from this architectural pattern.

However, the technology remains in early stages, as evidenced by the modest absolute performance scores and identified weaknesses. Organizations deploying similar systems should invest in robust evaluation infrastructure, continuous prompt engineering, and comprehensive edge case testing rather than expecting out-of-the-box perfection. The LLMOps practices demonstrated by Loka—treating prompts as versioned code, using automated evaluation pipelines, implementing proper observability, and establishing feedback loops—are as important as the underlying model capabilities for achieving production success.
