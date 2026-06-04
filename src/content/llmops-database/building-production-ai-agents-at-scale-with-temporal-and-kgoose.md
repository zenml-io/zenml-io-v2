---
title: "Building Production AI Agents at Scale with Temporal and KGoose"
slug: "building-production-ai-agents-at-scale-with-temporal-and-kgoose"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "data-analysis"
  - "high-stakes-application"
  - "structured-output"
  - "regulatory-compliance"
  - "fraud-detection"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "harness-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "chunking"
  - "system-prompts"
  - "databases"
  - "monitoring"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "redis"
  - "cache"
  - "anthropic"
  - "openai"
  - "microsoft-azure"
industryTags: "finance"
company: "Block"
summary: "Block's Applied AI team built KGoose, an AI agent platform powering multiple customer-facing and internal products including Money Bot (Cash App financial assistant), Manager Bot (Square merchant assistant), and G2 (internal productivity platform). The team evolved from a simple synchronous chat API to a sophisticated asynchronous agent harness using Temporal workflows for orchestration, handling challenges like long-running sessions, LLM context limits, non-deterministic outputs, and compliance requirements. The platform now processes over 100 million weekly activities across Cash App and internal use cases, with 10,000+ concurrent workflows running at any time, demonstrating how to scale LLM-based agents from prototype to production while maintaining reliability, security, and operational flexibility."
link: "https://www.youtube.com/watch?v=u_E6prv5FWg"
year: 2026
seo:
  title: "Block: Building Production AI Agents at Scale with Temporal and KGoose - ZenML LLMOps Database"
  description: "Block's Applied AI team built KGoose, an AI agent platform powering multiple customer-facing and internal products including Money Bot (Cash App financial assistant), Manager Bot (Square merchant assistant), and G2 (internal productivity platform). The team evolved from a simple synchronous chat API to a sophisticated asynchronous agent harness using Temporal workflows for orchestration, handling challenges like long-running sessions, LLM context limits, non-deterministic outputs, and compliance requirements. The platform now processes over 100 million weekly activities across Cash App and internal use cases, with 10,000+ concurrent workflows running at any time, demonstrating how to scale LLM-based agents from prototype to production while maintaining reliability, security, and operational flexibility."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-agents-at-scale-with-temporal-and-kgoose"
  ogTitle: "Block: Building Production AI Agents at Scale with Temporal and KGoose - ZenML LLMOps Database"
  ogDescription: "Block's Applied AI team built KGoose, an AI agent platform powering multiple customer-facing and internal products including Money Bot (Cash App financial assistant), Manager Bot (Square merchant assistant), and G2 (internal productivity platform). The team evolved from a simple synchronous chat API to a sophisticated asynchronous agent harness using Temporal workflows for orchestration, handling challenges like long-running sessions, LLM context limits, non-deterministic outputs, and compliance requirements. The platform now processes over 100 million weekly activities across Cash App and internal use cases, with 10,000+ concurrent workflows running at any time, demonstrating how to scale LLM-based agents from prototype to production while maintaining reliability, security, and operational flexibility."
notion:
  pageId: "373f8dff-2538-80de-a355-e3e12972b003"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:21:00.000Z"
  lastEditedTime: "2026-06-02T07:21:00.000Z"
  publishedAt: "2026-06-04T08:40:31Z"
---

## Overview and Business Context

Block, the parent company of Square, Cash App, and Afterpay, has taken an AI-first approach to building products that help customers solve problems more efficiently. Catherine Zhang from Block's Applied AI team presented their journey building a production-scale AI agent platform called KGoose that powers multiple customer-facing applications including Money Bot (a financial assistant in Cash App for peer-to-peer payments), Manager Bot (a business partner for Square merchants that surfaces insights and suggestions), and G2 (an internal productivity platform). What makes this case study remarkable is that all these diverse products are powered by a single platform with a shared agent workflow built by a small team, demonstrating the power of well-architected LLMOps infrastructure.

The evolution of KGoose began about a year before the presentation, when Block was working on Goose, their open-source AI agent written in Rust that predated similar commercial offerings. As the local CLI and desktop experience gained traction internally, the Applied AI team envisioned bringing Goose's capabilities to customer-facing applications, leading to the creation of KGoose as a service with APIs that enable web applications to leverage AI agent capabilities.

## Architectural Evolution: From Synchronous to Asynchronous Orchestration

The KGoose platform evolved through three distinct versions, each addressing limitations discovered in production use. Version 1 implemented a simple query API where clients could send one message and receive a response from the LLM without any agent capabilities. This required clients to maintain message history themselves, creating operational burden and complexity.

Version 2 introduced DynamoDB for tracking chats and messages, implementing a synchronous stateful chat API where users would send a message and wait for the complete agent loop to finish. This version shifted the burden of persisting message history to the service and began handling tool calls server-side. However, production usage revealed significant problems: a single user input could trigger dozens of tool calls with long execution times, and the synchronous design meant frequent timeouts that degraded user experience.

Version 3 marked the critical transition to an asynchronous pattern powered by Temporal workflows. Clients submit inputs through the API and poll for outputs, allowing for much more robust handling of long-running agent operations. Temporal was a natural choice because it was already widely adopted at Block for over 100 services, including tier-zero critical features like payments and the Square ledger. The team trusted Temporal for its durability and reliability characteristics essential for long-running agent loops, though their use case proved unique within the organization and required solving novel problems.

## Core Workflow Design and Architecture

The Temporal agent workflow architecture maintains several key concepts: sessions contain multiple messages exchanged with the LLM, messages can be text, tool calls, or tool responses, and a task represents a message plus all subsequent tool calls needed to fulfill the intent. These data models are tracked in DynamoDB, providing fast access for API responses while Temporal handles orchestration.

The chat workflow interface includes a main start chat method that initiates the agent loop, update methods that push messages into the chat, signal methods for terminating and interrupting tasks, and query methods that expose internal workflow state. These workflow methods tightly couple with client-facing APIs. The V3 push messages API is synchronous in the sense that it guarantees a Temporal workflow will start operating on the message, even though actual processing happens asynchronously.

When a client calls V3 push messages with a message and configuration like model selection and enabled tools, the API server validates the request, persists session and task information to DynamoDB, checks if a Temporal workflow is already running for that session ID and starts one if needed, verifies the session isn't busy using a Temporal query to ensure only one task processes at a time, and finally calls the start task update method. Clients receive a session ID for polling updates and new messages through the V3 get messages API, which integrates directly with DynamoDB.

The agent loop itself runs in a while loop that begins with a workflow await blocking until three conditions are met: there's a task to process, any tool requests have been resolved, and the workflow hasn't been interrupted. These conditions are tracked through workflow state variables updated via update and signal methods. When conditions are satisfied, the loop fetches the latest messages from DynamoDB, calls the LLM via an activity, saves the response back to DynamoDB, checks if the LLM requested tool calls and processes them through MCP, and finally clears the current task ID if complete to signal readiness for another message.

The team organized their activities into two primary categories: chat activities handling state management like DynamoDB operations and tool call execution, and LLM activities handling all inference-related operations including actual LLM calls, system prompt construction, and model resolution. Activities are designed to represent atomic units of work that can be retried together, organized by usage patterns and configuration needs including different timeouts. This proved valuable for managing traffic to LLM providers, where they could throttle less important traffic using a rate-limited LLM activity instance running on a dedicated task queue with lower maximum activities per second settings.

## Design Principles: Separation of Concerns

Two fundamental design principles guided the implementation. The first is separating orchestration from data. The workflow state maintained by Temporal consists primarily of lightweight references and Boolean values: session ID, current task ID, tool requests, interrupted status, and LLM iteration count. These exist purely to orchestrate workflow execution, determining when to start new iterations or generate session titles. All substantial application data resides in DynamoDB, including complete message history with tool call inputs and outputs, complex structured UI outputs, and session metadata like titles and token usage.

This separation stems from several practical considerations. Production client-facing applications require serving data through APIs at low latency, and DynamoDB excels at this while Temporal queries would be slower. Streaming messages lacked native Temporal support at the time, requiring custom implementation with DynamoDB and Redis, though new workflow streaming features address this gap. Client-facing data needs explicit schemas that evolve over time and must be accessible outside the agent lifecycle, making storage outside workflows natural since data schema changes don't require workflow versioning. The decision ultimately reflects using each tool for its strengths: Temporal for durability, retries, and coordination, DynamoDB for fast and flexible data access.

The second principle emphasizes keeping workflows lean and activities complex. Workflows focus on orchestration while heavy logic, retries, and state management belong in activities. This separation critically impacts testability since activities representing core business logic can be tested in isolation with necessary dependencies in detail, while workflow tests require spinning up environments with fake Temporal services and registered workers, making them slower and harder to debug. Activities also benefit from Temporal's native retry policies and timeouts rather than requiring custom implementations. Most importantly for agentic development, versioning becomes simpler when changes stay at the activity level, avoiding frequent workflow versioning. Since AI development involves constantly changing requirements with much more frequent drastic changes than traditional software projects, this principle proves especially valuable.

## Production Challenges: Lifecycle Management

Operating long-running agent workflows in production revealed numerous challenges requiring sophisticated solutions. Supporting long-running sessions posed a fundamental question: chat sessions could theoretically live forever with workflows that never terminate, which might work from a cost perspective but introduces operational challenges around versioning and deprecating old logic. The opposite extreme of terminating workflow executions after every request and resuming on demand would work since session state persists in DynamoDB, but introduces latency from workflow rehydration and state initialization.

Block chose an inactivity-based lifecycle policy as a compromise. Workflows remain active while sessions are hot but terminate after one hour of inactivity, a threshold based on assumptions that most user sessions naturally conclude within that window. This balances responsiveness with operational flexibility. Implementation uses a detached cancellation scope starting at workflow beginning that wakes every 10 minutes, checking if an hour has passed since the last user interaction and signaling termination if so.

Graceful interruption presents another complexity since users can interrupt at any point, perhaps because tool calls take too long or they change their mind and want to ask a different question. The workflow checks interrupted flags at multiple points: before the LLM call, during the LLM call, before tool processing, and during processing, any of which can serve as exit points. The tricky part involves cleaning up message history to maintain validity for different LLM providers with varying expectations. For example, certain models don't allow conversations ending with assistant text, and a universal rule requires tool requests to be followed by corresponding tool responses. If interruption occurs mid-tool-call, the last message is an open tool request requiring a stubbed tool response to avoid errors on the next LLM call. If the LLM hasn't responded at interruption time, they add an assistant text interruption message. The goal is always leaving message history in a valid state so the flow can accept more input when users resume sessions.

## Human-in-the-Loop Patterns

KGoose implements two distinct patterns for human-in-the-loop interactions. Approval-gated executions treat human-driven actions like placing orders through APIs similarly to other tool calls, except the agent yields to the client for approval before execution. Once approved, the agent resumes control and invokes the underlying API. An alternative model has the agent return a structured recommendation with suggested payload rather than blocking on the tool call. The client and user decide whether and how to carry out the action, with the agent's responsibility changing from requesting approval to proposing actions for independent client execution. The client can optionally report outcomes back to the agent but isn't required to.

The latter pattern proves particularly valuable for product experiences presenting many actions without blocking, or for sensitive high-trust operations where simplifying authentication by avoiding direct agent execution capabilities is desirable. This flexibility in human-in-the-loop patterns reflects the platform's ability to adapt to diverse use case requirements across different Block products.

## Managing System Limits and Constraints

The platform must manage limits across three systems: Temporal history, LLMs, and DynamoDB. Temporal's event history has hard limits of 50 megabytes or 50,000 events before forcibly terminating workflow executions. Block uses Temporal's continue-as-new feature to carry over into fresh executions with the same workflow ID but different run ID. While Temporal's SDK provides an is-continue-as-new-suggested method, production experience revealed this was too conservative for their use case, with some turns adding 3.4 megabytes to event history, dangerously close to the four-megabyte continue-as-new threshold. This meant nearly every message triggered a new execution.

The team implemented custom thresholds for triggering continue-as-new but recognized the real problem: activities were passing full messages rather than references by ID. Future plans include rewriting activities to pass references and potentially using Temporal's new large payload storage with implicit references, though this was still early at the time. Another continue-as-new problem involved re-initializing state incorrectly, where the original message was being added back into message history during continuation, causing the agent to redo all work and sometimes infinitely continue-as-new. After fixing these issues, continue-as-new executions in production dropped to very small numbers.

LLM context limits presented another major constraint. Sessions were dying quickly from hitting context limits, prompting implementation of message compaction where subsets of messages get summarized and replaced with single summary messages at the end of each iteration. Context limits also occur from large tool responses, particularly problematic in Manager Bot where merchants might have catalogs with thousands of items. Even with successful tool calls, subsequent LLM calls would throw context limit exceeded exceptions, creating poor user experiences since message history appears immutable. The recovery strategy replaces oversized tool responses with error messages asking for more specific queries, hiding the original message for debugging while retrying the LLM call. The LLM can then adjust by requesting fewer rows or filtering data differently, enabling graceful recovery.

## Model Agnostic Architecture and Adaptation

A core value proposition of the platform is enabling model selection while keeping the agent loop model-agnostic, allowing models to be swapped based on use case requirements or user preferences. Sometimes specific use cases prefer certain models for fast, quality responses, but particular model versions lack capabilities like image support. Block built adapters to overcome such limitations, for example using a tool that invokes a separate vision-capable model to describe images as text, then swapping the image message with text before presenting to the main non-vision LLM model.

This technique of mutating message history internally while presenting different views to users versus LLMs is used extensively in the chat workflow. It allows presenting consistent interfaces to users while adapting underlying message representations to keep agent loops functioning successfully across diverse model capabilities and constraints.

## Guardrails and Validation Layers

Operating in the financial services domain with Square merchants and Cash App consumers means protecting financial data and PII while maintaining compliance with various policies. Block integrates guardrails at two points in the agent loop. For user inputs, they check for complaints or escalation requests using external models, firing these checks in parallel with LLM calls and waiting for approval before releasing actual LLM responses. For LLM outputs, they guard against sensitive PII exposure and out-of-band statements by checking with external guardrail services and substituting fallback text when violations occur.

Beyond external model-based guardrails, they implement internal common-sense checks for catching agent-specific nonsense outputs. Examples include tool calls with arguments wrapped in unexpected XML tags instead of JSON, or responses delivered in the wrong language like Chinese when the user asked in English. Even advanced models can respond with gibberish for no apparent reason, so regex-based checks provide best-effort protection against such issues.

## Handling Model Oddities and Failures

Tool doom loops represent another model oddity where the LLM issues a tool call with a valid response but inexplicably keeps requesting the same tool with identical arguments repeatedly. The workflow tracks cumulative tool call counts, and after passing thresholds, attempts to guide the LLM to stop by substituting valid tool responses with dummy responses politely asking for different behavior. However, this often proves insufficient as stubborn LLMs can continue doom loops for over 100 consecutive tool calls. Eventually the system must give up, terminate the task, and ask the user what to do next.

For system-level failures like LLM provider outages or rate limiting, the platform implements fallback strategies. Rather than failing all users, they attempt LLM calls on different models with the same request if another model can serve sufficiently good responses. Different LLMs express problems in different ways, making it crucial to categorize failures from LLM error messages into distinct failure types that inform the appropriate recovery approach. Activities categorize failures based on LLM error messages and throw typed errors, while workflows inspect error subtypes from Temporal activity failures and route to appropriate recovery strategies. This abstraction allows generic handling across different models and failure modes.

The complexity of production agent loops becomes evident when considering all the checks and recovery logic: after LLM calls and before and after tool calling, the system performs extensive validation and recovery even before optimizing agent performance, simply to maintain basic integrity of agent loops.

## Versioning and Non-Determinism

Rapid AI development creates significant challenges for maintaining workflow determinism. Agent loops can be extremely long-running, and idle workflows stay alive for at least an hour before terminating, meaning workflows from previous deployments remain active during any deployment. This makes clean version cutovers difficult and requires ensuring old workflows can replay history with old code paths. When workflows fail from non-determinism, they can no longer respond to queries and updates, rendering sessions inoperable from user perspectives.

Block uses patching with Get Version to roll out new changes without disrupting in-progress workflows. With constantly updating prompts, tools, and control flow in AI systems, the likelihood of introducing incompatible changes increases substantially. Get Version allows separating new and old treatments with version checks, where workflows record versions in event history on first execution and re-read versions on replay to take corresponding code paths, enabling old workflows to replay successfully.

Get Version pairs with replay testing in their workflow tests. They generate fixtures of recorded event histories using custom annotation helpers, then replay tests re-execute recorded histories using latest code to verify new code is determinism-safe against old executions. This helps prevent bad changes reaching production, though in practice testing every scenario in unit tests proves extremely difficult. An example involved rolling out continue-as-new handling without versioning changes since no new activity was added, only discovering the mistake after deployment because the scenario wasn't included in replay tests and is genuinely difficult to mimic in unit tests.

Non-determinism still occurs occasionally in production from such mistakes, affecting many running workflows simultaneously. Their solution involves a monitoring Temporal workflow that detects stuck workflows by inspecting event history. When stuck workflows are detected, they spin up separate chat workflows on the same session with different workflow IDs and call the cancel-last-message handler used for interruptions to clear message history and reset session state to idle. This works because session state lives in DynamoDB, allowing multiple workflows to operate on the same session simultaneously. The team accepts that while Get Version helps, sometimes throwing away workflow executions becomes necessary to minimize user experience impact.

## Multi-Product Platform Architecture

The chat workflow powers diverse products across Block in different ways. G2, their internal productivity platform, provides common workplace tools like Slack, Gmail, GitHub, and Linear. People build dynamic workflows each powered by different agents. Customizable dashboard widgets help with tasks like generating Slack channel summaries, visualizing PR counts across organizations, or sharing latest design repositories within teams. Each tile and automation stores instructions re-executed via Temporal schedules, with each tile refresh kicking off a chat workflow. A single page view can consist of tens of chat workflows running simultaneously, with multiple automations running while maintaining classic chat experiences for ad-hoc questions. G2 integrates notifications into automations, using the human-in-the-loop pattern to request approval before sending generated reports to teams.

Manager Bot for Square sellers also implements automations, allowing sellers to generate sales reports or review and approve time cards on schedules or triggers. These automations provide notifications via email or push notifications when completed. Money Bot in Cash App takes a different approach with personalized suggested actions displayed when users click the smiley icon. These suggestions are generated on the fly when the screen opens, with the client firing off chat workflows synchronously and waiting for single turns to complete before rendering suggestions. Clicking suggestions jumpstarts chat experiences with Money Bot. Though suggestions, insights, and automations across products are different flavors conceptually similar, all leverage the same underlying chat workflow infrastructure.

The chat workflow also serves as a unit of LLM inference for internal operations like subagents and memory extraction. Wrapper or parent Temporal flows observe both the chat workflow and session external state, extracting use-case-specific renderables from last message outputs.

## Scale and Performance

The evolution from basic agent loops to full production harnesses required addressing gaps between simple demonstrations and production user-facing products. Considerations like user abandonment, large tool responses, and unexpected LLM outputs required sophisticated handling. Since launching the chat workflow for the first use case over 10 months before the presentation, it evolved into a comprehensive agent harness with context management, session management, skills support, subagents, and guardrails, all assuming very stable Temporal infrastructure enabling long-running, durable agent operations.

The main workflow interface has remained largely stable since the beginning, with the team rarely thinking about Temporal day-to-day, which they consider a very good sign. From a scale perspective, weekly activity volume demonstrates impressive growth. Block isolates deployments to different namespaces for internal, Cash App, and Square use cases. Internal and Cash App use cases process over 100 million weekly activities in the 300 to 400 actions per second range. The Square use case was increasing with ramp-up of products like Manager Bot, with over 10,000 workflows running concurrently in each namespace at any given time.

## Observability and Future Directions

Looking forward, the team continues developing KGoose and the chat workflow into a comprehensive agent platform for current and future use cases, making integration easier through configuration-based approaches. While the presentation focused on infrastructure and reliability, they recognize that mature, successful agents that actually help users require ability to evaluate agent performance and iterate on the harness. This necessitates providing deeper observability into agent behavior for product teams. They're excited to continue collaborating with Temporal on new features like worker versioning and large payload storage, which address pain points mentioned throughout their journey.

## Critical Assessment and Balanced Perspective

While Block's presentation demonstrates impressive technical achievement and production scale, several caveats warrant consideration. The case study comes from Block itself presenting at a Temporal conference, naturally emphasizing successes and smooth integration with Temporal. The actual difficulty of achieving this architecture shouldn't be understated: the team encountered numerous complex failure modes only discoverable through extensive production usage, suggesting significant time investment in debugging and iteration.

The reliance on multiple external systems including DynamoDB, Redis, external guardrail services, and LLM providers creates complexity and potential points of failure not fully explored in the presentation. The message compaction approach to handling context limits, while pragmatic, could potentially lose important context depending on summarization quality. The admission that they "accept the fact that sometimes you just need to throw away workflow executions" regarding non-determinism issues suggests ongoing challenges with maintaining system consistency despite sophisticated versioning approaches.

The scale numbers are impressive but context matters: over 100 million weekly activities across internal and Cash App use cases doesn't specify how many actual end-user sessions or tasks this represents, making it difficult to assess true production impact. The team's acknowledgment that they're "not really at the point where we're optimizing agent performance yet" despite significant complexity investment raises questions about whether current architecture will support future optimization needs or require fundamental changes.

Nevertheless, this case study provides invaluable insights into real-world production LLMOps at scale, demonstrating both the power of well-designed orchestration infrastructure and the substantial engineering effort required to move from prototype to production-grade AI agent systems in regulated financial services environments.
