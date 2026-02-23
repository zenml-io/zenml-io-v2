---
title: "Multi-Agent Architecture for Automated Advertising Media Planning"
slug: "multi-agent-architecture-for-automated-advertising-media-planning"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6999c019f65cf7d1c5ec0f04"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-23T08:20:13.599Z"
  lastUpdated: "2026-02-23T08:20:13.599Z"
  createdOn: "2026-02-21T14:24:25.214Z"
llmopsTags:
  - "customer-support"
  - "structured-output"
  - "classification"
  - "data-analysis"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "few-shot"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "system-prompts"
  - "postgresql"
  - "cache"
  - "fastapi"
  - "monitoring"
  - "orchestration"
  - "databases"
  - "microservices"
  - "guardrails"
  - "documentation"
  - "google-gcp"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify faced a structural problem where multiple advertising buying channels (Direct, Self-Serve, Programmatic) relied on consolidated backend services but implemented fragmented, channel-specific workflow logic, creating duplicated decision-making and technical debt. To address this, they built \"Ads AI,\" a multi-agent system using Google's Agent Development Kit (ADK) and Vertex AI that transforms media planning from a manual 15-30 minute process requiring 20+ form fields into a conversational interface that generates optimized, data-driven media plans in 5-10 seconds using 1-3 natural language messages. The system decomposes media planning into specialized agents (RouterAgent, GoalResolverAgent, AudienceResolverAgent, BudgetAgent, ScheduleAgent, and MediaPlannerAgent) that execute in parallel, leverage historical campaign performance data via function calling tools, and produce recommendations based on cost optimization, delivery rates, and budget matching heuristics."
link: "https://engineering.atspotify.com/2026/2/our-multi-agent-architecture-for-smarter-advertising"
year: 2026
---

## Overview

Spotify's Ads AI platform represents a sophisticated production deployment of a multi-agent LLM system designed to solve a concrete business problem: the fragmentation of decision logic across multiple advertising buying channels. While the source material positions this as an innovative breakthrough, it's important to recognize that this case study reflects Spotify's specific context and challenges, and the claims about performance improvements should be understood within that framework.

The fundamental problem Spotify faced was not a lack of backend consolidation—they had already unified their services—but rather a proliferation of workflow logic scattered across different channels (Direct, Self-Serve, Programmatic) and surfaces (Spotify Ads Manager, Salesforce, Slack, internal tools). Each implementation encoded similar decisions about budget allocation, inventory selection, and campaign optimization in slightly different ways, leading to drift over time and maintenance burden. The traditional approach of building a new service with deterministic state machines didn't fit the combinatorial nature of advertising workflows, which depend on user context, inventory availability, business priorities, and advertiser goals.

## Architecture and Design Decisions

Spotify chose a multi-agent architecture as their solution, leveraging Google's Agent Development Kit (ADK) version 0.2.0 and Vertex AI with Gemini 2.5 Pro as the underlying LLM. The architecture decomposes media planning into specialized agents, each with focused responsibilities, optimized prompts, and the ability to execute in parallel where dependencies permit.

The agent hierarchy includes a **RouterAgent** that performs initial triage of incoming messages to determine what information is present (goals, audience criteria, budget, schedule). This routing step is explicitly designed to prevent unnecessary LLM calls by enabling conditional agent execution—only the agents needed for missing or incomplete information are invoked. Following the router, specialized **resolution agents** handle specific extraction tasks: GoalResolverAgent maps user intent to campaign objectives and searches for ad categories, AudienceResolverAgent extracts targeting criteria from a predefined taxonomy, BudgetAgent parses various currency formats and converts to micro-units, and ScheduleAgent handles date parsing including relative date expressions.

The **MediaPlannerAgent** serves as the optimization core, taking all resolved information and generating ad set recommendations using a heuristics-based engine backed by historical performance data. The optimization rules include minimizing cost metrics (CPM, CPC, CPI) relative to historical medians, targeting high delivery rates (close to 100%), matching budget ranges and campaign durations to proven performers, scoring based on demographic and interest overlap, ensuring diversity in format/goal combinations, and scaling the number of recommendations based on budget size (from 1 recommendation for budgets under €1,000 to 4-5 recommendations for budgets over €15,000).

The technology stack integrates several components: Google ADK 0.2.0 provides agent orchestration, session management, and tool integration; Vertex AI (Gemini 2.5 Pro) powers natural language understanding and generation; gRPC serves as the API layer for high-performance, strongly-typed service communication; Google Cloud handles persistent session storage across conversations; PostgreSQL with an in-memory cache stores historical campaign performance data; and Spotify's internal Apollo framework manages service lifecycle, configuration, and observability.

## LLMOps Implementation Details

### Tool Integration and Function Calling

A critical aspect of Spotify's LLMOps implementation is the use of function calling to ground agent outputs in real data. They leverage Google ADK's FunctionTool to give agents access to actual advertising data through tools like `search_geo_targets`, `search_ad_categories`, and `get_historical_performance`. The tools are defined with schema annotations that provide the LLM with structured information about parameters, enabling the model to construct appropriate tool calls based on natural language input.

The historical performance data integration is particularly noteworthy from an LLMOps perspective. Rather than allowing the LLM to hallucinate recommendations, the MediaPlannerAgent uses real performance data from thousands of past campaigns to inform its suggestions. The team made a deliberate architectural choice to use an in-memory cache for this data to minimize latency, accepting the tradeoff of increased memory usage in exchange for faster response times. This reflects a production-oriented optimization decision where user experience considerations drove infrastructure choices.

### Prompt Engineering as Software Engineering

Spotify explicitly treats prompt engineering as a software engineering discipline, emphasizing version control, testing, and iteration. They discovered that small changes in prompt wording can dramatically affect output consistency, leading them to adopt several practices: being explicit about output format requirements, providing concrete examples within prompts, and building guardrails at both the prompt and parsing layers.

The prompt engineering for the MediaPlannerAgent specifically includes strict guardrails to ensure consistent, parseable output. The team recognized that getting LLMs to produce reliable, structured responses is challenging and requires careful constraint specification. While the source text doesn't provide the exact prompts (which is typical for proprietary systems), they emphasize the importance of this work as foundational to the system's reliability.

### Testing and Evaluation

The case study reveals a shift in how Spotify thinks about testing for agentic systems. Traditional unit and integration tests remain important, but they've added a layer of behavioral evaluation—assessing what the agent decided and why, rather than just whether code paths execute correctly. This represents a meaningful evolution in testing philosophy for LLM-based systems, though the specific testing methodologies and metrics aren't detailed in the source material.

The multi-agent architecture provides testability benefits by allowing individual agents to be tested and improved in isolation. Each agent has a focused responsibility, which theoretically makes it easier to validate behavior and iterate on improvements. However, the document doesn't provide concrete details about test coverage, evaluation datasets, or success criteria beyond the high-level performance metrics.

### Observability and Safety

Observability for the agentic platform differs from traditional service monitoring. While traditional metrics like p95 latency and error budgets remain relevant, Spotify emphasizes the need to understand "what did the agent decide and why?" This suggests they've implemented logging and tracing that captures agent reasoning chains, tool calls, and decision paths—though specific implementation details aren't provided.

Safety is framed as "guardrails on semi-autonomous decisions" rather than just input validation. This is an important conceptual shift for production LLM systems, acknowledging that agents operate with some degree of autonomy and require boundaries on their decision-making authority. The document doesn't elaborate on what specific safety mechanisms are in place, what failure modes they're designed to prevent, or how they handle edge cases where agents might make inappropriate recommendations.

### Session Management and State

The architecture includes persistent session storage via Google Cloud, enabling multi-turn conversations where users can refine media plans iteratively. This stateful design is essential for the conversational interface but introduces LLMOps challenges around session lifecycle management, state serialization, and handling concurrent sessions. The document doesn't detail how they manage session expiration, handle session failures, or prevent state corruption.

## Performance and Latency Considerations

Spotify reports agent response latency of 3-5 seconds with parallel execution, with a latency breakdown showing that parallel agent execution is a key optimization. The multi-agent architecture explicitly enables parallelization—independent agents that don't have data dependencies can run simultaneously rather than sequentially. This is contrasted with a hypothetical single-agent approach that would have a massive prompt and couldn't parallelize, though the document doesn't provide comparative benchmarks.

The choice of synchronous responses over streaming is noted as a simplicity tradeoff. Streaming would provide better user experience for longer operations by showing incremental progress, but the team opted for synchronous responses initially to reduce implementation complexity. This is a pragmatic LLMOps decision that prioritizes getting a working system into production over perfect user experience, with streaming identified as future work.

## Design Tradeoffs and Critical Assessment

The document explicitly discusses several architectural tradeoffs:

**Single vs. Multi-Agent:** A single agent could theoretically handle all media planning tasks, but would have a massive prompt, couldn't parallelize work, and would be difficult to maintain. Multi-agent adds orchestration complexity but improves latency and maintainability. This is presented as clearly favoring multi-agent, though it's worth noting that multi-agent systems introduce coordination overhead, potential for inconsistency between agents, and more complex debugging when things go wrong.

**In-Memory vs. Database Cache:** The in-memory cache for historical data minimizes latency at the cost of memory usage. The team considers this acceptable because campaign performance data is bounded and refreshed periodically. However, this design choice means that the system may require significant memory resources and could face challenges if the dataset grows substantially or if multiple instances need synchronized cache updates.

**Synchronous vs. Streaming:** Synchronous responses simplify implementation but sacrifice real-time feedback. For media planning where users expect quick turnarounds, this may be acceptable, but for more complex scenarios, the lack of streaming could feel unresponsive.

From a critical LLMOps perspective, several aspects warrant scrutiny:

**Evaluation Rigor:** While the document reports dramatic improvements (15-30 minutes reduced to 5-10 seconds, 20+ form fields reduced to 1-3 messages), it doesn't describe how these metrics were collected, whether they represent controlled experiments or observational data, or what the variance is. The claim that the system uses "historical performance from thousands of campaigns" for optimization is compelling, but there's no discussion of how they validate that the recommendations actually perform better in practice, or whether there's A/B testing comparing AI-generated plans to human-generated plans.

**Hallucination Mitigation:** The document emphasizes grounding agent outputs through tools that access real data, which is a sound approach. However, it doesn't discuss failure modes—what happens when the LLM misinterprets data from tools, constructs invalid tool calls, or makes recommendations that are technically feasible but strategically poor? The heuristics-based optimization in MediaPlannerAgent is described in high-level terms, but complex edge cases aren't addressed.

**Prompt Brittleness:** The emphasis on prompt engineering "as software engineering" is commendable, but prompts remain fundamentally more brittle than traditional code. Small model updates from Vertex AI could potentially break carefully engineered prompts, and the document doesn't mention strategies for handling model versioning, regression testing across model updates, or fallback mechanisms.

**Cost and Scalability:** There's no discussion of LLM API costs, request volume, or how the system scales with increased usage. For a production system at Spotify's scale, these are material considerations. The 3-5 second latency suggests substantial computational work, and the parallel agent architecture implies multiple LLM calls per user interaction, which could become expensive at scale.

## Lessons and Future Directions

Spotify identifies three key learnings that resonate with broader LLMOps practices:

**Prompt engineering is software engineering:** Version control, testing, and iteration are essential. Treat prompts as first-class code artifacts with explicit output format requirements, concrete examples, and layered guardrails.

**Agent boundaries matter:** Drawing appropriate boundaries between agents is crucial. Too many agents increases latency and coordination overhead; too few creates monolithic, hard-to-maintain prompts. Their rule of thumb is "one agent per distinct skill or data source," which provides a reasonable heuristic though it may not generalize to all domains.

**Tools enable grounding:** LLMs are powerful but prone to hallucination. Providing agents with tools that access real data grounds their outputs in reality, with the LLM reasoning about what to do while tools provide accurate data to work with.

Future work includes streaming responses, better support for multi-turn refinement, A/B testing integration to automatically test AI-recommended plans against baselines, expanded agent capabilities (creative suggestions, competitive analysis, cross-campaign optimization), and domain-specific model fine-tuning for advertising terminology. The mention of A/B testing as future work is somewhat surprising—ideally, a production system making business-critical recommendations would have integrated A/B testing from the start to validate that the AI recommendations actually improve outcomes.

## Conclusion and Broader Implications

Spotify's Ads AI represents a substantial production deployment of multi-agent LLM technology addressing a real business problem. The architectural choices—specialized agents, parallel execution, tool integration, session management—reflect thoughtful LLMOps engineering. The system demonstrates how agentic approaches can consolidate fragmented decision logic and provide a unified "intent layer" that orchestrates existing APIs.

However, several aspects of the case study warrant balanced assessment. The performance claims are impressive but lack detailed validation methodology. The emphasis on grounding and guardrails is appropriate, but specific safety mechanisms and failure handling aren't described. The treatment of prompt engineering as software engineering is commendable, but doesn't fully address the inherent brittleness of prompt-based systems. The lack of discussion around costs, scalability limits, and production incident handling leaves important LLMOps questions unanswered.

This case study is valuable as a real-world example of multi-agent architecture in production, demonstrating that complex workflows can be successfully decomposed into specialized agents that leverage historical data and existing service infrastructure. It also illustrates the shift in mindset required for agentic systems—from traditional API design to "APIs designed as tools for agents," from conventional testing to behavioral evaluation, and from standard observability to decision-trace logging. Organizations considering similar approaches should recognize both the potential benefits (reduced cognitive load, data-driven decisions, faster iteration) and the challenges (prompt maintenance, evaluation complexity, coordination overhead) that come with production LLM systems at scale.