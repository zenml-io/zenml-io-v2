---
title: "Scaling AI Agents for Financial Advisory Services with Compliance and Observability"
slug: "scaling-ai-agents-for-financial-advisory-services-with-compliance-and-observability"
draft: false
llmopsTags:
  - "healthcare"
  - "fraud-detection"
  - "customer-support"
  - "document-processing"
  - "classification"
  - "summarization"
  - "chatbot"
  - "high-stakes-application"
  - "structured-output"
  - "regulatory-compliance"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "latency-optimization"
  - "evals"
  - "human-in-the-loop"
  - "error-handling"
  - "fallback-strategies"
  - "monitoring"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
  - "google-gcp"
  - "amazon-aws"
industryTags: "finance"
company: "Range"
summary: "Range, an AI-powered wealth management platform, built multiple production AI agents using the Mastra framework to provide automated financial advisory services at a fraction of the cost of traditional human advisors. The company faced significant challenges around regulatory compliance, reliability, latency, and observability when deploying over 15 agents in production. Their solutions included building custom logging and tracing systems to meet SEC regulations, implementing resilient language model failover mechanisms to handle provider outages, and developing a post-generation analysis system using LLM-as-a-judge to evaluate financial advice quality across metrics like grounding, compliance, and sentiment. The flagship agent Rye outperforms human financial advisors on certification exams, achieving significantly higher pass rates while providing services including tax planning, investment advice, and document parsing workflows."
link: "https://www.youtube.com/watch?v=5eoGrvoLG1Q"
year: 2025
seo:
  title: "Range: Scaling AI Agents for Financial Advisory Services with Compliance and Observability - ZenML LLMOps Database"
  description: "Range, an AI-powered wealth management platform, built multiple production AI agents using the Mastra framework to provide automated financial advisory services at a fraction of the cost of traditional human advisors. The company faced significant challenges around regulatory compliance, reliability, latency, and observability when deploying over 15 agents in production. Their solutions included building custom logging and tracing systems to meet SEC regulations, implementing resilient language model failover mechanisms to handle provider outages, and developing a post-generation analysis system using LLM-as-a-judge to evaluate financial advice quality across metrics like grounding, compliance, and sentiment. The flagship agent Rye outperforms human financial advisors on certification exams, achieving significantly higher pass rates while providing services including tax planning, investment advice, and document parsing workflows."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-agents-for-financial-advisory-services-with-compliance-and-observability"
  ogTitle: "Range: Scaling AI Agents for Financial Advisory Services with Compliance and Observability - ZenML LLMOps Database"
  ogDescription: "Range, an AI-powered wealth management platform, built multiple production AI agents using the Mastra framework to provide automated financial advisory services at a fraction of the cost of traditional human advisors. The company faced significant challenges around regulatory compliance, reliability, latency, and observability when deploying over 15 agents in production. Their solutions included building custom logging and tracing systems to meet SEC regulations, implementing resilient language model failover mechanisms to handle provider outages, and developing a post-generation analysis system using LLM-as-a-judge to evaluate financial advice quality across metrics like grounding, compliance, and sentiment. The flagship agent Rye outperforms human financial advisors on certification exams, achieving significantly higher pass rates while providing services including tax planning, investment advice, and document parsing workflows."
notion:
  pageId: "373f8dff-2538-8025-b8ec-fb113252c3f4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:24:00.000Z"
  lastEditedTime: "2026-06-02T07:28:00.000Z"
  publishedAt: "2026-06-04T08:03:25Z"
---

## Overview

Range is an AI-powered wealth management platform that positions itself as an alternative to traditional financial advisors, offering comprehensive services including investments, taxes, cash flow management, and retirement planning at a significantly lower cost point. The company has been building on the Mastra framework since April 2025, and by the time of this presentation had deployed over 15 distinct AI agents in production. As an SEC-registered investment advisor, Range operates under strict regulatory requirements that significantly shaped their LLMOps implementation.

The flagship AI agent, called Rye, provides high-quality financial advice using technology originally built for human advisors within the company. Range benchmarked Rye against various financial advising certifications and exams, claiming it passes with "flying colors" while typical human financial advisors pass with approximately 70% scores. Users can ask Rye complex questions like creating tax plans for 2026 or requesting tax-saving strategies. The agent executes tax projections using Range's internally built tax projection system, which has codified all 50 state tax codes as well as federal tax regulations.

Beyond the flagship advisory agent, Range deployed multiple other specialized agents including onboarding agents that handle document parsing workflows and user data collection, internal agents to help their team of in-house financial advisors work more efficiently, and support diagnostic agents to assist their customer service staff. This multi-agent ecosystem required sophisticated LLMOps practices to maintain reliability, compliance, and performance at scale.

## Technical Architecture and Framework Choices

Range's journey with the Mastra framework began in early 2025, during a period when the framework was still maturing. The speaker mentions installing alpha branches that lived in their codebase "a little bit too long" to access features like containers and execution context sharing between different steps and tools. In the early days of their implementation, they faced a fundamental architectural choice between workflows and agents.

The team over-indexed on workflows initially, primarily driven by latency concerns and the need for predictable execution paths. The key insight shared was that choosing the right abstraction matters tremendously. While agents have received significant attention in the AI community, workflows are often the more appropriate choice for certain use cases. Range uses workflows extensively for document parsing, which follows a deterministic four-step process involving pre-processing documents, classifying them, extracting information, and validating the extraction results. This structured approach provides better latency characteristics and more predictable behavior than an agentic approach would offer.

Conversely, Range employs agents when tasks are open-ended and for applications where ultra-low latency is not critical. The company found significant success with the tool-calling pattern, giving agents access to numerous tools. These tools were originally built for human advisors before AI implementation, and wiring them up to AI agents proved straightforward. The composability of workflows and agents within Mastra emerged as a key advantage, allowing the team to combine both abstractions as needed for different parts of their system.

## Compliance, Logging, and Auditability

As an SEC-registered investment advisor, Range faces rigorous regulatory requirements around data retention, auditability, and record-keeping. This compliance mandate became one of the three major pillars of their LLMOps strategy and drove significant architectural decisions. The company needed comprehensive logging capabilities that captured every aspect of agent execution, including all metadata and thinking traces across every single tool call.

Range implemented custom logging infrastructure that hooks into Mastra and AI SDK lifecycle events. Their logging system captures sub-agent execution details, recording when each step starts and completes, when tool calls begin and end, and collecting metrics around latency, successes, failures, and token usage. This granular logging serves dual purposes: meeting regulatory requirements for auditability and enabling detailed debugging and performance analysis.

The archiving component of their compliance infrastructure ensures that all agent interactions and decisions are preserved according to regulatory policies. This creates a complete audit trail showing exactly what information the agent accessed, what reasoning it employed, and what recommendations it provided to users. While Range's compliance needs are particularly stringent due to financial services regulations, the speaker noted that what compliance fundamentally solves for is explainability. The infrastructure they built to pinpoint exactly why an agent made a specific response has broader applicability beyond regulated industries.

The team built their own tracing visualization system internally, though the speaker noted that Mastra has since released metrics and logging capabilities in their studio product that could serve similar purposes. These traces provide a visual representation of the execution flow, showing how data moves through the system and where time is spent during agent operations.

## Reliability and Resilient Language Models

Reliability emerged as the second critical pillar of Range's LLMOps strategy. The speaker emphasized that nothing undermines user trust more than having an agent fail while discussing complex financial topics. This concern became particularly acute as the team observed frequent capacity constraints and outages across various LLM providers. The speaker noted that Claude Code experiences daily outages or performance degradation around 9:00 AM, illustrating the widespread nature of provider reliability challenges.

To address these reliability concerns, Range built what they call the "resilient language model" system. This infrastructure enables sophisticated failover strategies across multiple dimensions. The system can fail over from Anthropic's API to AWS Bedrock, or from one model to another (for example, from Claude Opus to Gemini Pro). The implementation goes beyond simple failover, incorporating learnings about cascading failures.

One key insight was that naive failover strategies can backfire. When Anthropic's API experiences issues, many users simultaneously fail over to Bedrock, which can overwhelm that service as well, creating cascading outages. Range's resilient language model system provides granular control over failover behavior, allowing the team to implement more sophisticated strategies that account for these dynamics. This might include load balancing across multiple backup options, implementing exponential backoff, or routing different types of requests to different providers based on their reliability characteristics for specific workload patterns.

The resilient language model abstraction represents a critical piece of production LLMOps infrastructure that likely required significant engineering effort but delivers substantial value in maintaining service availability. By abstracting away provider-specific details and building a unified interface with intelligent failover, Range protected their user experience from the volatility inherent in the current LLM provider ecosystem.

## Observability and Monitoring

The third pillar of Range's LLMOps strategy focused on observability, which proved essential for understanding agent performance in production. The complexity of nested agent executions and workflow steps means that without detailed tracing, it becomes nearly impossible to diagnose issues or understand system behavior. Range needed visibility not just into top-level agent responses but into every sub-agent execution and individual step within workflows.

Their observability implementation leverages hooks provided by Mastra and AI SDK around various aspects of the execution lifecycle. The system tracks metrics including latency at various granularities (overall request, individual steps, specific tool calls), success and failure rates broken down by agent type and operation, and token usage patterns that inform both cost management and performance optimization. This metrics infrastructure enables the team to identify performance bottlenecks, detect degradation over time, and make data-driven decisions about architectural improvements.

The observability infrastructure integrates tightly with the logging and compliance systems, creating a unified view of agent behavior. This integration proved valuable for debugging production issues, as the team can correlate metrics anomalies with detailed execution traces to understand root causes. The speaker emphasized that this level of observability became critical as Range scaled to over 15 agents in production, each with different performance characteristics and quality requirements.

## Post-Generation Analysis and LLM-as-Judge

One of the most sophisticated aspects of Range's LLMOps implementation is their post-generation analysis system, which uses LLM-as-a-judge techniques to evaluate agent outputs after generation. The speaker noted spending extensive time over the past year thinking about how to measure whether AI financial advice is good, highlighting this as a critical but challenging problem.

The post-generation analysis system operates asynchronously after the agent generates a response, evaluating it across multiple dimensions. Mastra's architecture enables kicking off this evaluation process in the background without blocking the user experience. The system checks several categories of quality and compliance metrics:

Grounding rate analysis examines whether the AI agent actually used the data it retrieved during its workflow execution in the final response. This helps detect situations where the agent might hallucinate information rather than relying on retrieved facts. User sentiment analysis identifies emotional signals in the conversation, detecting when users are angry, frustrated, or using profane language, which might indicate service problems or opportunities for human escalation.

Missing data and correction detection monitors for situations where users correct the agent, such as stating that their income is actually $100,000 when the agent said it was $50,000. These corrections provide valuable signals about data quality issues or retrieval problems that need investigation. Compliance and policy checks verify that responses meet regulatory requirements, including fiduciary standards, duty of care, duty of loyalty, and proper disclosure language. For example, certain types of financial advice must include disclaimers like "past performance is not indicative of future gains."

The longer version of this system, revealed during the Q&A, includes a pipeline that anyone across the company can plug into with specific policies. Each of Range's 15-plus agents has a different definition of what "good" looks like. A piece of financial advice generating a tax projection requires different evaluation criteria than a summary of investment news. The system provides live visibility into how each agent is performing against its specific quality metrics in real-time.

This post-generation analysis approach represents a sophisticated application of LLM-as-judge techniques in production. Rather than relying solely on pre-deployment evaluation, Range continuously assesses production outputs, enabling ongoing monitoring of agent quality and early detection of degradation. The asynchronous nature means this comprehensive evaluation doesn't impact user-facing latency.

## Model and Technology Evolution

Range's LLMOps practices evolved significantly as foundation models improved and the Mastra framework matured. Early in their journey, when building primarily with Mastra workflows, the team actually trained their own custom models to inject at specific points in workflows. This fine-tuning effort aimed to optimize for latency and performance within the constraints of available models at the time. Range hired a dedicated machine learning engineer to build and scale this custom model training infrastructure.

However, as the team migrated more workflows to agentic architectures and as foundation models became more capable, these custom models became unnecessary. The speaker referenced the "bitter lesson" in AI research, the observation that general methods that scale with compute tend to outperform approaches that rely on human knowledge or customization. The capabilities of newer foundation models essentially "ate" the scaffolding and optimizations Range had built, allowing them to simplify their architecture while maintaining or improving performance.

The speaker expressed enthusiasm about this evolution, noting that operating at the AI engineering level of the stack is significantly easier than the ML engineering level. Rather than training and maintaining custom models, the team can now rely on increasingly capable foundation models accessed through standard APIs. This shift allowed Range to reallocate engineering resources from model training to building better product experiences and improving their LLMOps infrastructure.

Another example of model evolution eating custom infrastructure came in their document parsing workflows. Initially, Range's onboarding agents used a multi-step pipeline: first applying OCR to uploaded documents, then passing the text to AWS Textract, taking that extracted text and passing it to an LLM, and finally using structured outputs to format the information appropriately. As models improved, they found they could skip the OCR step entirely in many cases, having the LLM work directly with document images. This simplification reduced system complexity, eliminated potential error points, and improved overall reliability.

## Team Structure and Engineering Culture

Range operates with a team of approximately 25 technical staff, and the speaker (who serves as Chief AI Architect) emphasized that everyone on the engineering team is effectively an AI engineer. Rather than creating specialized roles, Range expects all engineers to build on their internal AI platform and contribute to the agent ecosystem. This democratized approach to AI development extends beyond the engineering team.

Notably, Range developed internal developer tooling that enables non-technical staff to contribute code. Product managers and designers at Range now push code live to production, leveraging AI coding tools to bridge the gap between domain expertise and implementation. This represents an interesting evolution in organizational structure, where AI coding assistants enable subject matter experts to directly implement their ideas rather than going through traditional engineering handoffs.

When hiring, Range has not specifically targeted people with "AI engineer" backgrounds, partly because it remains an emerging role without a large talent pool. The company employs one dedicated machine learning specialist who historically focused on custom model training and optimization, though that role's focus has shifted as the company moved away from custom models. Otherwise, the team consists of generalist full-stack engineers, primarily working in TypeScript.

The choice of TypeScript proved advantageous for AI-assisted development, as the language's extensive representation in training data makes AI coding tools particularly effective. The speaker noted that generalist engineers can "do a lot of damage" (in a positive sense) with the combination of TypeScript and modern AI coding tools. This suggests that technical stack choices should consider not just traditional engineering criteria but also how well-supported the stack is by AI development tools.

## Performance and Latency Optimization

Throughout the presentation, latency emerged as a recurring concern shaping architectural decisions. The speaker identified speed as a "superpower" and emphasized that Range wanted to deliver state-of-the-art intelligence with very low latency. This performance requirement influenced the initial preference for workflows over agents, as workflows offered more predictable and optimizable execution paths.

The tool-calling architecture contributes to performance in interesting ways. By reusing tools originally built for human advisors, Range benefits from years of optimization applied to those underlying systems. The tax projection system that Rye uses, for example, had already been optimized for performance before being exposed to AI agents. This suggests a valuable pattern: investing in robust, performant backend systems pays dividends when those systems become tools for AI agents.

The metrics infrastructure tracking latency at various granularities enables ongoing optimization. By understanding where time is spent in agent execution—whether in LLM calls, tool execution, or orchestration overhead—the team can focus optimization efforts where they'll have the greatest impact. The resilient language model system also contributes to performance by enabling the team to route requests to providers based not just on availability but potentially on latency characteristics for specific request types.

## Lessons and Balanced Assessment

Range's case study provides valuable insights into production LLMOps at scale, particularly in a heavily regulated industry. Several key lessons emerge that warrant critical examination:

The emphasis on compliance and explainability reflects genuine regulatory requirements but also highlights a broader principle applicable beyond finance. Understanding why an AI system made a particular decision proves valuable across domains, whether for debugging, building user trust, or meeting governance requirements. Range's investment in comprehensive logging, tracing, and post-generation analysis creates this explainability, though it requires significant engineering effort.

The resilient language model pattern addresses a real problem in the current LLM ecosystem but also represents operational overhead that might decrease as providers mature. Organizations must balance the engineering investment in sophisticated failover against simpler approaches like retry logic and graceful degradation. Range's experience with cascading failures when naive failover strategies concentrate load on backup providers offers a valuable cautionary tale.

The evolution from custom models to foundation models illustrates rapid change in the field, where engineering investments can become obsolete as capabilities advance. While Range's speaker frames this positively, organizations should consider that investments in LLMOps infrastructure, evaluation frameworks, and observability may prove more durable than investments in custom models or prompt engineering techniques that could be superseded by next-generation models.

The claim that Rye significantly outperforms human financial advisors on certification exams should be interpreted carefully. Exam performance measures knowledge recall and application in test settings, which differs from the full scope of human advisor capabilities including relationship-building, understanding unstated client concerns, and navigating complex emotional dimensions of financial planning. The automated, lower-cost model clearly offers value, but exam performance alone may not fully validate equivalence to human advisors.

The team structure where all engineers work on AI and non-technical staff contribute code represents an interesting organizational experiment. While AI coding tools clearly enable this approach, questions remain about code quality, maintainability, and whether this scales as systems grow more complex. The success likely depends on robust review processes, comprehensive testing, and the relatively high baseline technical literacy among Range's product and design staff.

The reliance on Mastra, while enabling rapid development, creates framework dependency risk. As an emerging framework, Mastra's long-term trajectory remains uncertain. Range's deep integration with Mastra's primitives means migration to alternative frameworks would require substantial effort. Organizations should weigh the productivity benefits of opinionated frameworks against the flexibility of lower-level abstractions.

Overall, Range's implementation demonstrates sophisticated LLMOps practices addressing real production challenges. The three-pillar approach of compliance/auditability, reliability, and observability provides a useful framework for others building production agent systems. The post-generation analysis system represents particularly innovative work in continuous evaluation. However, the significant engineering investment required suggests this approach may be most appropriate for organizations with substantial resources and strong regulatory or quality requirements rather than a universal template for all agent deployments.
