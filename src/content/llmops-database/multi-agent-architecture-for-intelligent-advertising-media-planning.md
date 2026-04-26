---
title: "Multi-Agent Architecture for Intelligent Advertising Media Planning"
slug: "multi-agent-architecture-for-intelligent-advertising-media-planning"
draft: false
llmopsTags:
  - "customer-support"
  - "structured-output"
  - "classification"
  - "data-analysis"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "agent-based"
  - "few-shot"
  - "latency-optimization"
  - "cost-optimization"
  - "system-prompts"
  - "orchestration"
  - "cache"
  - "postgresql"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "databases"
  - "documentation"
  - "google-gcp"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify faced a structural problem where multiple advertising buying channels (Direct, Self-Serve, Programmatic) had fragmented workflow logic despite a consolidated backend, leading to duplicated decision-making and tech debt. They built Ads AI, a multi-agent system using Google's Agent Development Kit (ADK) and Vertex AI's Gemini 2.5 Pro to create a unified decision layer that transforms natural language campaign requirements into optimized media plans. The solution reduced media plan creation time from 15-30 minutes to 5-10 seconds, leveraging historical performance data from thousands of campaigns through specialized agents working in parallel, with each agent handling distinct aspects like goal resolution, audience targeting, budget allocation, and schedule planning."
link: "https://engineering.atspotify.com/2026/02/our-multi-agent-architecture-for-smarter-advertising"
year: 2026
seo:
  title: "Spotify: Multi-Agent Architecture for Intelligent Advertising Media Planning - ZenML LLMOps Database"
  description: "Spotify faced a structural problem where multiple advertising buying channels (Direct, Self-Serve, Programmatic) had fragmented workflow logic despite a consolidated backend, leading to duplicated decision-making and tech debt. They built Ads AI, a multi-agent system using Google's Agent Development Kit (ADK) and Vertex AI's Gemini 2.5 Pro to create a unified decision layer that transforms natural language campaign requirements into optimized media plans. The solution reduced media plan creation time from 15-30 minutes to 5-10 seconds, leveraging historical performance data from thousands of campaigns through specialized agents working in parallel, with each agent handling distinct aspects like goal resolution, audience targeting, budget allocation, and schedule planning."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-architecture-for-intelligent-advertising-media-planning"
  ogTitle: "Spotify: Multi-Agent Architecture for Intelligent Advertising Media Planning - ZenML LLMOps Database"
  ogDescription: "Spotify faced a structural problem where multiple advertising buying channels (Direct, Self-Serve, Programmatic) had fragmented workflow logic despite a consolidated backend, leading to duplicated decision-making and tech debt. They built Ads AI, a multi-agent system using Google's Agent Development Kit (ADK) and Vertex AI's Gemini 2.5 Pro to create a unified decision layer that transforms natural language campaign requirements into optimized media plans. The solution reduced media plan creation time from 15-30 minutes to 5-10 seconds, leveraging historical performance data from thousands of campaigns through specialized agents working in parallel, with each agent handling distinct aspects like goal resolution, audience targeting, budget allocation, and schedule planning."
notion:
  pageId: "34ef8dff-2538-8136-8bcc-efdba720ecf6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:00:46Z"
---

## Overview and Business Context

Spotify's Ads AI platform represents a sophisticated production deployment of multi-agent LLM systems designed to solve a fundamental workflow fragmentation problem in their advertising business. The company operates multiple advertising buying channels—Direct, Self-Serve, and Programmatic—all built on top of a consolidated backend infrastructure. However, while the technical infrastructure was unified, the decision-making logic for campaign planning, budget allocation, inventory selection, and optimization had become fragmented across channels and surfaces (Spotify Ads Manager, Salesforce, Slack, internal tools). Each channel implemented its own version of essentially the same planning and optimization decisions, leading to workflow drift, duplicated logic, and mounting technical debt.

The core insight driving this initiative was that Spotify didn't need another backend service with hard-coded workflows; they needed a "unified, programmable decision layer" that could understand advertiser goals, reason over shared signals, and orchestrate existing Ads APIs consistently across all channels and surfaces. Traditional approaches—building more deterministic workflows per channel or creating a giant rules engine—were rejected as unsuitable for the probabilistic, constantly changing nature of advertising logic. This led Spotify to adopt an agentic architecture where campaign planning and management became a set of modular agents consuming the same signals, optimizing jointly for advertiser goals and business constraints, and using existing services as tools rather than reimplementing capabilities.

Media Planning was selected as the initial proving ground because it's where all the complexity converges: sales, advertisers, inventory, pacing, and ad products all collide, and getting decisions right early in the lifecycle benefits everything downstream (booking, trafficking, delivery, optimization).

## Technical Architecture and Implementation

Spotify built their multi-agent system on top of Google's Agent Development Kit (ADK) version 0.2.0, which provides agent orchestration, session management, and tool integration capabilities. The LLM backend is powered by Vertex AI using Gemini 2.5 Pro for natural language understanding and generation. The architecture uses gRPC for high-performance, strongly-typed service communication between components, with Google Cloud providing persistent session storage to maintain conversational state across interactions. Historical campaign performance data is stored in PostgreSQL with an in-memory cache layer to minimize latency during agent decision-making. The entire service runs on Spotify's Apollo framework, which handles service lifecycle, configuration, and observability.

The system employs a multi-agent architecture where specialized AI agents handle distinct aspects of media planning, offering several architectural advantages: separation of concerns with focused responsibilities and optimized prompts per agent, parallel execution where independent agents can run simultaneously, individual testability and improvement in isolation, and flexibility to add new capabilities as new agents. This design choice explicitly trades some architectural complexity for improved latency, maintainability, and the ability to avoid monolithic prompts.

## Agent Design and Orchestration

The agent architecture consists of a routing layer and specialized resolution agents working in concert. The **RouterAgent** serves as a traffic controller, analyzing incoming user messages to determine what information is already present versus what needs to be resolved. This fast routing step prevents unnecessary LLM calls and enables conditional agent execution, optimizing overall system performance.

Specialized resolution agents each have focused responsibilities. The **GoalResolverAgent** maps user intent to specific campaign objectives (REACH, CLICKS, APP_INSTALLS, etc.) and searches for appropriate ad categories from Spotify's taxonomy. The **AudienceResolverAgent** extracts targeting criteria including interests from predefined taxonomies, geographic targets, age ranges, and gender specifications. The **BudgetAgent** handles parsing of various budget formats ($5000, 5k, €10,000) and converts them to micro-units for internal processing. The **ScheduleAgent** manages date parsing including relative date expressions like "next month" or "30 days."

The **MediaPlannerAgent** represents the optimization core of the system. It takes all resolved information from other agents and generates optimized ad set recommendations using a heuristics-based engine backed by historical performance data from thousands of previous campaigns. The optimization logic implements multiple weighted rules: minimizing cost metrics (CPM, CPC, CPI) relative to historical medians, targeting campaigns with delivery rates close to 100%, finding historically successful campaigns with similar budget ranges, matching campaign durations to proven performers, scoring based on demographic and interest overlap, ensuring diversity by recommending unique format/goal combinations, and dynamically scaling the number of recommendations based on budget size (€0-1,000 yields 1 recommendation, €1,000-5,000 yields 2, €5,000-15,000 yields 3, and €15,000+ yields 4-5 recommendations).

## Tool Integration and Function Calling

Spotify leverages Google ADK's FunctionTool mechanism to give agents access to real data sources, effectively grounding LLM reasoning in factual information. Tools are implemented as Python functions decorated with schema annotations that provide the LLM with structured information about parameters, types, and descriptions. For example, the `search_ad_categories` tool allows agents to search Spotify's ad category taxonomy based on keywords, while `get_historical_campaign_performance` queries the performance database based on targeting criteria, budget, duration, and other parameters.

This tool-based approach addresses a critical LLMOps challenge: LLMs can hallucinate information, but by providing agents with tools that access real data (geographic targets, ad categories, historical performance), the system grounds outputs in reality. As the engineering team notes, "The LLM reasons about _what_ to do; tools provide _accurate data_ to work with." This separation of reasoning (LLM) from facts (tools) is a key architectural pattern for production LLM systems.

## Prompt Engineering and Output Consistency

Getting LLMs to produce consistent, parseable output emerged as a significant operational challenge. Spotify developed strict prompt guardrails to ensure reliability. Their approach treats prompt engineering as software engineering, with version control, testing, and iteration. Small changes in prompt wording can dramatically affect output consistency, so they learned to be explicit about output format requirements, provide concrete examples within prompts, and build guardrails at both the prompt level and the parsing layer.

The prompt engineering strategy includes specific instructions about output formats, structured response templates, and examples that demonstrate the expected behavior. This reflects a mature understanding that in production LLM systems, prompt quality and consistency are as critical as code quality in traditional software systems.

## Performance and Latency Optimization

The system achieves impressive performance metrics with agent response latency of approximately 3-5 seconds end-to-end, a critical achievement for an interactive conversational interface. This is accomplished through several optimizations. Parallel execution of independent agents is a key strategy—since agents like GoalResolver, AudienceResolver, BudgetAgent, and ScheduleAgent have no dependencies on each other, they can execute simultaneously rather than sequentially. The RouterAgent's conditional execution prevents unnecessary LLM calls by quickly determining which agents actually need to run based on the available information.

The in-memory cache for historical campaign performance data represents an interesting tradeoff decision. Spotify chose to sacrifice memory for latency, keeping frequently accessed performance data in memory rather than hitting the database for every agent request. This tradeoff is justified because campaign performance data has bounded size and is refreshed periodically, making memory usage predictable. The alternative would be lower memory consumption but higher latency from database queries.

The team explicitly considered synchronous versus streaming responses and opted for synchronous initially for implementation simplicity, though they acknowledge streaming would provide better user experience for longer operations—a common pattern in production LLM deployments where teams iterate from simple to sophisticated UX patterns.

## Observability and System Monitoring

Implementing an agentic system forces a different observability model compared to traditional microservices. As the Spotify team notes, observability becomes about "what did the agent decide and why?" rather than just traditional metrics like p95 latencies and error budgets. This requires new instrumentation to track agent decision paths, tool invocations, intermediate reasoning steps, and why particular recommendations were made.

The system integrates with Spotify's Apollo service framework, which provides standard service lifecycle management, configuration, and observability capabilities. However, the agentic nature requires additional monitoring dimensions: which agents were invoked for each request, what tools they called, how long each agent took, and the quality of the final recommendations compared to historical baselines.

## Testing and Evaluation

The multi-agent architecture enables a layered testing strategy. Individual agents can be tested and improved in isolation, with focused test cases for each agent's specific responsibility. This modularity makes it easier to validate that the GoalResolverAgent correctly maps natural language intents to campaign objectives, or that the BudgetAgent properly parses various currency and number formats.

However, the team also emphasizes that "testing as behavioral evaluation" becomes critical—it's not sufficient to only run unit and integration tests. They need to evaluate whether the complete multi-agent system produces good media plans, whether the recommendations are actually backed by strong historical performance data, and whether the conversational flow handles refinement requests appropriately. This reflects a mature understanding that LLM systems require evaluation methodologies beyond traditional software testing.

## Safety and Guardrails

The text describes safety as "guardrails on semi-autonomous decisions, not just input validation." This is an important production consideration for agentic systems: the agents are making real business decisions about how to allocate potentially large advertising budgets. The system needs multiple layers of protection: prompt-level guardrails that constrain what the LLM can output, parsing-level validation that ensures outputs conform to expected schemas, business logic constraints that enforce hard rules (budget limits, allowed targeting combinations), and tool-level access controls that restrict what data and operations agents can access.

The use of strongly-typed gRPC APIs and schema annotations on function tools provides structural safety—agents can only invoke tools with properly formatted parameters, and the system can validate inputs and outputs at each step. This is complemented by explicit prompt instructions about output formats and constraints.

## Production Trade-offs and Design Decisions

The case study explicitly discusses several key production trade-offs that reflect mature LLMOps thinking. The choice between single versus multi-agent architecture acknowledges that a single agent could theoretically handle everything but would require a massive prompt, couldn't parallelize work, and would be harder to maintain and improve. The multi-agent approach adds orchestration complexity but delivers better latency through parallelization and better maintainability through separation of concerns.

The in-memory versus database cache decision for historical data prioritizes latency over memory efficiency, justified by the bounded nature of the data set. The synchronous versus streaming response pattern starts simple (synchronous) with a clear path to sophistication (streaming) as the product matures—a pragmatic approach to production rollout.

The decision to use ADK's built-in orchestration rather than building custom agent coordination logic represents a build-versus-buy decision in favor of leveraging Google's infrastructure, allowing the team to focus on domain-specific agent logic rather than plumbing.

## Integration with Existing Systems

A critical aspect of this implementation is that the agents use existing Ads services as tools rather than reimplementing capabilities from scratch. This "APIs designed as tools for agents" approach means the agent layer sits on top of Spotify's consolidated backend, providing a unified decision layer without requiring wholesale replacement of existing systems. Agents can call forecasting services, inventory management APIs, audience targeting services, and other existing capabilities through the function calling mechanism.

This integration strategy is particularly important for organizations with existing service ecosystems—rather than requiring a complete rewrite, the agentic layer can orchestrate and optimize use of existing capabilities while adding natural language understanding and intelligent decision-making on top.

## Results and Business Impact

The system delivers dramatic improvements in user experience and efficiency. Media plan creation time dropped from 15-30 minutes of manual work to 5-10 seconds with the agentic system. Required user inputs decreased from 20+ form fields to 1-3 natural language messages. Critically, the system leverages optimization data from thousands of historical campaigns, replacing human intuition with data-driven recommendations.

The impact goes beyond speed: reduced cognitive load for advertisers who can describe campaigns in natural language, data-driven decisions where every recommendation is backed by historical performance, faster iteration as advertisers can refine plans by continuing the conversation, and democratized expertise where optimization knowledge that previously resided in expert planners' heads is now embedded in the system.

## Key Learnings for LLMOps

Spotify's engineering team distilled several critical learnings from this production deployment. First, **prompt engineering is software engineering**—treating prompts as code with version control, testing, and iteration is essential for production reliability. Small changes in prompt wording can dramatically affect output consistency, requiring the same rigor as traditional software development.

Second, **agent boundaries matter** for system architecture. Drawing the right boundaries between agents is crucial—too many agents increases latency and coordination overhead, while too few creates monolithic, hard-to-maintain prompts. Their rule of thumb is one agent per distinct skill or data source, a practical heuristic for agent decomposition.

Third, **tools enable grounding** and are essential for production reliability. By providing agents with tools that access real data rather than relying on LLM knowledge alone, they ground outputs in reality and dramatically reduce hallucination risk. This separation of reasoning (LLM) from facts (tools) is a fundamental pattern for trustworthy production LLM systems.

## Future Evolution

The team outlines several directions for continued evolution of the platform. Implementing streaming responses using server-sent events would provide real-time feedback as agents process requests, improving perceived responsiveness. Better support for multi-turn refinement would enable more sophisticated conversational flows where users iterate on plans through multiple exchanges. A/B testing integration would allow automated testing of AI-recommended plans against baselines to validate and improve recommendation quality over time.

Expanding agent capabilities to include creative suggestions, competitive analysis, and cross-campaign optimization would broaden the scope of intelligent automation. Domain-specific model fine-tuning for advertising terminology could improve understanding of industry-specific concepts and jargon, though the current approach with general-purpose Gemini models appears to work well with proper prompting and tools.

## Broader Implications for LLMOps

This case study demonstrates several important patterns for production LLM systems. The multi-agent architecture with specialized agents and parallel execution shows how to decompose complex problems while maintaining performance. The tool-based grounding approach addresses reliability and hallucination concerns. The emphasis on prompt engineering rigor, behavioral evaluation, and new observability models reflects the operational maturity required for production deployment.

The integration strategy—using an agent layer to orchestrate existing services rather than replacing them—offers a practical path for organizations with established infrastructure. The explicit discussion of trade-offs (single vs. multi-agent, caching strategies, synchronous vs. streaming) demonstrates thoughtful engineering decision-making appropriate for production systems.

However, readers should note that this is a first-party account from Spotify's engineering team, presenting their solution in a positive light. The claimed performance improvements are impressive but represent Spotify's internal metrics. The challenges of maintaining prompt quality at scale, handling edge cases in natural language understanding, and ensuring recommendation quality across diverse advertiser needs are touched on but not explored in depth. The long-term operational costs of maintaining multiple specialized agents, updating prompts as products evolve, and managing the additional complexity of the agentic layer versus traditional workflows remain to be seen. Nevertheless, the case provides valuable insights into practical patterns for building production multi-agent LLM systems in enterprise contexts.
