---
title: "Building Scout: A Natural Language Interface for Venture Capital Sourcing Using Deep Agents"
slug: "building-scout-a-natural-language-interface-for-venture-capital-sourcing-using-deep-agents"
draft: false
llmopsTags:
  - "question-answering"
  - "data-analysis"
  - "chatbot"
  - "prompt-engineering"
  - "embeddings"
  - "agent-based"
  - "semantic-search"
  - "few-shot"
  - "evals"
  - "harness-engineering"
  - "langchain"
  - "llama-index"
  - "monitoring"
  - "api-gateway"
  - "anthropic"
  - "openai"
industryTags: "finance"
company: "Harmonic"
summary: "Harmonic, a real-time database tracking 37 million companies and 200 million people in the startup ecosystem, built Scout, a natural language interface powered by deep agents that enables venture capitalists to perform complex research and analysis tasks. The company migrated from a complex query-parsing graph architecture (Scout 1.0) that required extensive maintenance to a simpler deep agent architecture using frontier models with approximately 50 tools. This transition resulted in a 4x improvement in retention from week one to week four, with users describing Scout as their \"secret weapon\" and receiving exceptional qualitative feedback about the product becoming indispensable to their workflow."
link: "https://www.youtube.com/watch?v=pGdZBK___jM"
year: 2026
seo:
  title: "Harmonic: Building Scout: A Natural Language Interface for Venture Capital Sourcing Using Deep Agents - ZenML LLMOps Database"
  description: "Harmonic, a real-time database tracking 37 million companies and 200 million people in the startup ecosystem, built Scout, a natural language interface powered by deep agents that enables venture capitalists to perform complex research and analysis tasks. The company migrated from a complex query-parsing graph architecture (Scout 1.0) that required extensive maintenance to a simpler deep agent architecture using frontier models with approximately 50 tools. This transition resulted in a 4x improvement in retention from week one to week four, with users describing Scout as their \"secret weapon\" and receiving exceptional qualitative feedback about the product becoming indispensable to their workflow."
  canonical: "https://www.zenml.io/llmops-database/building-scout-a-natural-language-interface-for-venture-capital-sourcing-using-deep-agents"
  ogTitle: "Harmonic: Building Scout: A Natural Language Interface for Venture Capital Sourcing Using Deep Agents - ZenML LLMOps Database"
  ogDescription: "Harmonic, a real-time database tracking 37 million companies and 200 million people in the startup ecosystem, built Scout, a natural language interface powered by deep agents that enables venture capitalists to perform complex research and analysis tasks. The company migrated from a complex query-parsing graph architecture (Scout 1.0) that required extensive maintenance to a simpler deep agent architecture using frontier models with approximately 50 tools. This transition resulted in a 4x improvement in retention from week one to week four, with users describing Scout as their \"secret weapon\" and receiving exceptional qualitative feedback about the product becoming indispensable to their workflow."
notion:
  pageId: "3b5f8dff-2538-8094-af7a-fe058fa99939"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T20:04:00.000Z"
  lastEditedTime: "2026-08-07T20:04:00.000Z"
  publishedAt: "2026-08-07T20:08:08Z"
---

## Overview

Harmonic operates a comprehensive real-time database of the startup ecosystem, tracking 37 million companies, 200 million people, and 220,000 investors, with data continuously expanding. Nine out of the top ten current venture capital firms rely on Harmonic for their sourcing needs. Scout represents Harmonic's natural language interface layer that sits atop this extensive database, enabling users to interact with the ecosystem through conversational queries rather than traditional search interfaces.

The Scout product demonstrates a sophisticated evolution in LLMOps practices, showcasing how companies can successfully transition from complex, highly-engineered agent architectures to simpler, more maintainable systems that leverage the improved capabilities of frontier language models. The case study provides valuable insights into the practical challenges of building production-grade agent systems, particularly around context management, UX integration, and maintaining model awareness of application state.

## Technical Architecture Evolution

### Scout 1.0: The Complex Graph Approach

The initial version of Scout represented what was considered cutting-edge technology approximately 18 months prior to this presentation, though it quickly became outdated as the field advanced. This first iteration employed a sophisticated query parsing graph built on LangGraph that attempted to decompose natural language queries into structured database operations.

The architecture worked by taking a natural language query such as "show me all the fintech SaaS companies in New York that have raised money in the last two months" and routing different components through specialized processing paths. The semantic portion of the query would be extracted and processed against embeddings to understand concepts like "fintech SaaS." Location-based filters would be routed to location handling nodes, while funding criteria would be directed to temporal filtering components. All of these would ultimately connect to Harmonic's custom search language.

Each node in this LangGraph implementation contained its own dedicated model with corresponding evaluation suites. The team invested substantial effort tweaking each node to ensure it passed its specific evaluations, resulting in a system that required extensive ongoing maintenance. While this approach worked, it represented a significant engineering burden and created a brittle system that needed constant attention as models and requirements evolved.

### Scout 2.0: The Deep Agents Transition

As language models improved and agent frameworks matured, Harmonic made a strategic decision to migrate to a dramatically simpler architecture based on Deep Agents. The new graph structure reduced complexity substantially, centering around a straightforward tool calling loop. The core components became just the model, the tools, and middleware layers that execute before and after model calls and before and after the complete agent loop.

This simplified architecture relies on frontier models paired with approximately 50 different tools that connect into Harmonic's ecosystem. These tools span various capabilities including searching entities, web search integration through Tavily, enrichment operations by ID or URL, and user CRM interactions such as adding companies to lists and manipulating those lists. The remarkable finding was that frontier models, when given access to even 50 different tools, demonstrated strong capability in selecting the appropriate tool and executing complex, multi-step composite tasks.

The architectural philosophy shifted from trying to carefully orchestrate every aspect of query processing through custom nodes to trusting the frontier model's capabilities to reason about tool selection and task decomposition. This represents a broader trend in LLMOps where advances in base model capabilities enable simpler production architectures.

## Deep Agents Framework Selection

Harmonic chose the Deep Agents framework as their harness for several technical reasons that directly addressed their production requirements. The framework provides sophisticated context management capabilities that become critical when dealing with complex, long-running interactions. When the messages list grows too long, Deep Agents automatically performs compaction to enable effectively infinite continuation of conversations.

A particularly important feature is tool call eviction. When a tool call returns massive amounts of data, such as a company search returning thousands of results with nested team member information and funding details, Deep Agents moves this data into a file system abstraction and returns a pointer instead of cluttering the messages list with potentially tens of thousands of lines. The model receives instructions on how to retrieve chunks of this data progressively rather than having it all present in context simultaneously.

The framework also provides skills and custom middleware capabilities that allow Harmonic to inject prompt information at runtime rather than including it in every single call, improving efficiency. The file system abstractions enable arbitrary reading and writing of different artifacts within the agent, creating a shared space for coordination between different components of the system.

From a practical deployment perspective, Harmonic was already using LangSmith for observability and monitoring with their previous Scout 1.0 implementation. The Deep Agents framework integrated seamlessly into their existing LangSmith deployment, allowing them to swap out the underlying agent implementation while maintaining the same user-facing chat interface. This enabled incremental A/B testing and gradual migration of users from the old system to the new one without disrupting the user experience.

## Context Management and the Harness Contract

One of the most sophisticated aspects of Harmonic's implementation involves understanding and working with how the harness manages context and maintains what they describe as a contract with the model. The model always receives a list of messages containing assistant messages, human messages, and tool messages. Every model invocation involves passing in this messages list and streaming back the response.

The harness's responsibility is to manage this messages list, removing content when necessary to avoid hitting context window limits or experiencing context rot where too much information degrades model performance. Everything in the messages list remains visible to the model, while content that the harness offloads exists in the agent's purview but may not be directly available to the model at every call.

The critical aspect of the contract is that anything the harness removes from the messages list must be made accessible to the model through tools. When a large file gets evicted from the messages list, the harness returns a pointer indicating the file path and provides tools to read chunks incrementally. This implements a pattern of progressive disclosure where the model sees a lightweight one-line summary of what exists in various tools and can choose to build up context in manageable chunks as needed for the specific task at hand.

This context management system creates three distinct layers: the messages list that is directly visible to the model, the harness-managed space that contains offloaded content accessible through tools, and critically, anything outside these two layers is completely invisible to the model. This third point becomes essential when designing user interfaces that integrate with the agent system.

## Product Design and UX Integration Challenges

Harmonic's presentation provides exceptional insight into the practical challenges of building user-facing products on top of agent systems, a topic often overlooked in purely technical discussions of LLMOps. The core tension they identified is that agents and models excel at code-like interactions such as tool calling, structured JSON, XML formatting, and file system operations, while end users, particularly non-technical venture capitalists, want intuitive visual interfaces without exposure to these technical primitives.

The team had to navigate how to leverage the full power of their capable harness and frontier model while building a product that feels natural and interactive without compromising the agent's effectiveness. They identified a fundamental tension between giving the model agency to reason and act freely versus building a UX with rich, predictable, and deterministically rendered elements.

### The Visualization Use Case: Wrong and Right Approaches

One of the most popular emergent use cases in Scout involved users requesting visualizations such as charts or market map graphics of industries. Initially, users would ask for these visualizations and the model would attempt to output SVG code or HTML and CSS, which actually looked surprisingly good. Harmonic decided to turn this into a proper product feature, but this required careful architectural thinking.

The wrong approach, which they initially tried, involved creating a tool called something like "render visualization" that would accept data as arguments and return a simple success message. The front-end would intercept this tool call and render the visualization based on the data. The problem was that the agent had no awareness of what actually rendered because it only received a generic success response. When users would follow up with questions like "why is that company on the left-hand side," the model couldn't answer because the rendered output existed completely outside the harness's purview and the model had no way to build progressive context about it.

The correct approach kept the visualization entirely within the messages list, which works well because visualizations are typically small enough that context window size isn't an issue. Harmonic prompts the agent to wrap HTML visualization code in specific XML delimiters. The front-end intercepts these delimited sections in the assistant's output and renders the graphics in real time. Crucially, the model retains full visibility into what it generated. When users ask "why is that company on the left," the model knows exactly why because it made that decision. Users can request modifications like "regenerate this and move these three things to the right and change the background color," and the model has complete agency to make those changes because everything lives in its visible context.

### The Search Results Challenge: Scaling to Thousands of Results

A more complex challenge arose with company searches, which represent a core use case for Harmonic. A query like "find fintech companies in New York" might return tens of thousands of results, each with nested information about team members, funding rounds, and other details. The system needed to render these results in the front-end interface while ensuring the agent maintained awareness of what users could see.

The naive approach, which Harmonic admits they initially implemented, involved triggering a search that the front-end would intercept and render side-by-side with the conversation, but with no information flowing back to the model. Users would see results and follow up with questions like "tell me more about the CEO of the second company," but the model would have no context about what "the second company" referred to because it never received information about the search results.

A better approach created a tool that returns an identifier for the search along with metadata like result count and status. The front-end renders results as they arrive, but the model receives the search ID and has access to additional tools for exploring the artifact. It can call functions like "get search status" or "fetch the first 10 results" or "fetch the second batch of results," building up context progressively as needed to answer user questions.

The optimal Deep Agents-native approach leverages the file system as shared storage between the agent, the front-end, and any other deterministic processes. The main agent has built-in file system tools including read, ls, cd, and grep operations. When a search is triggered, Harmonic spawns a second specialized search agent that mounts to the same file system. This search agent executes the query, potentially running custom evaluations to rank and sort results, and continuously writes output to the shared file system.

The main agent can arbitrarily inspect this output and check status because it has file system access. The front-end connects to the same file system through an exposed API, rendering results directly as they're written. This creates harmony where the front-end displays results as they arrive, potentially tens of thousands of ranked and annotated entries, while the user can ask questions like "draft outreach emails for the top five companies" and the main agent can read the necessary chunks from the file system to complete the task.

## Heuristic for Proper Agent Design

Harmonic offers a valuable heuristic for detecting when an implementation might be fighting against the model's natural behavior. If developers find themselves adding prompts that say things like "trust that this is being rendered" or "the user will see this after you call this tool, believe me, don't include it in your response," this serves as a warning sign that something is invisible to the model or that the architecture could better align with first principles of context flow between the harness and model.

This heuristic reflects a mature understanding that effective agent systems work with the model's capabilities and limitations rather than trying to force behaviors through increasingly complex prompting. When the architecture properly respects the harness contract and ensures the model has progressive visibility into artifacts shown to users, these kinds of corrective prompts become unnecessary.

## Results and Impact

The migration from Scout 1.0 to Scout 2.0 delivered substantial measurable improvements. Retention from week one to week four increased by a factor of four, representing a dramatic improvement in user engagement and product stickiness. While retention metrics are important, Harmonic emphasizes the exceptional qualitative feedback they received.

Users aren't providing lukewarm praise like "it's pretty good, we enjoyed using it, we'll probably use it again." Instead, they're reporting that Scout has become indispensable to their workflow. One user stated that after talking to colleagues from other firms, they believe "everyone's secret weapon is becoming Scout." Another user described it as "like my heaven," indicating a level of satisfaction that goes beyond mere utility to genuine enthusiasm about the product.

This qualitative feedback suggests that the technical improvements in architecture translated into real user experience improvements. The simplification of the underlying system, counterintuitively, appears to have enhanced the product's capabilities by allowing frontier models to leverage their full reasoning abilities rather than being constrained by overly prescriptive graph structures.

## Critical Assessment and Broader Lessons

While the results Harmonic reports are impressive, it's important to contextualize some of the claims. The 4x improvement in retention is substantial, but the presentation doesn't provide absolute retention numbers or detail other factors that might have changed between Scout 1.0 and 2.0 beyond the architectural shift. User interface improvements, feature additions, or changes in pricing or onboarding could potentially contribute to retention improvements alongside the agent architecture changes.

The qualitative feedback, while enthusiastic, comes from an unknown sample size and may be subject to selection bias where particularly satisfied users are more likely to provide feedback. The claim that nine out of ten top VCs use Harmonic is impressive but isn't independently verified in the presentation.

Nevertheless, the technical insights Harmonic provides appear sound and align with broader trends in LLMOps. The observation that frontier models can effectively handle 50+ tools without extensive orchestration represents an important practical finding. Many teams building agent systems underestimate modern models' tool selection capabilities and over-engineer their orchestration layers.

The deep exploration of context management and the harness contract provides genuinely valuable guidance for teams building production agent systems. The specific patterns around visualization and search result handling offer concrete examples that other teams can adapt to their own domains. The file system abstraction approach for coordinating between multiple agents and the front-end represents a sophisticated pattern that addresses real scalability challenges.

The emphasis on maintaining model visibility into user-facing artifacts is particularly important. Many teams building agent-powered applications struggle with exactly this problem, creating beautiful user interfaces that inadvertently make the agent less capable by hiding information. Harmonic's framework for thinking about this problem in terms of the harness contract and progressive disclosure provides a useful mental model.

The migration path from Scout 1.0 to 2.0 also demonstrates mature LLMOps practices. By maintaining their existing LangSmith deployment and enabling A/B testing, they reduced risk and could validate improvements before full rollout. This incremental approach to deploying significant architectural changes represents best practice for production systems.

The use of Deep Agents as a framework represents one approach among several valid options in the ecosystem. While Harmonic found it well-suited to their needs, particularly the context management and file system abstractions, other teams might find different frameworks or custom implementations better suited to their specific requirements. The principles Harmonic articulates around context management and model visibility apply regardless of the specific framework choice.

## Architectural Patterns and LLMOps Maturity

This case study exemplifies a maturing understanding of LLMOps where the field is moving from complex, highly-engineered solutions toward architectures that leverage improved model capabilities with simpler orchestration. The Scout 1.0 to 2.0 transition mirrors a broader industry pattern where early agent systems involved extensive custom logic and carefully orchestrated graphs, while newer implementations trust frontier models to handle more of the reasoning and planning with appropriate tool access.

The detailed attention to how the agent harness manages context and maintains contracts with the model shows sophisticated understanding of production agent systems. Many teams building agentic applications struggle with exactly the issues Harmonic addresses around context window management, progressive disclosure, and coordinating state between the agent and user interface.

The integration of evaluation throughout their process, including maintaining evaluations for individual nodes in Scout 1.0 and conducting A/B testing during the migration to Scout 2.0, demonstrates mature MLOps practices applied to the LLM domain. While the presentation doesn't detail specific evaluation metrics or methodologies, the emphasis on measurement and iterative improvement aligns with production best practices.

The use of LangSmith for observability and the ability to maintain that observability through an architectural migration shows the value of investing in proper monitoring infrastructure. Having visibility into agent behavior, tool calls, and conversation flows is essential for debugging, optimization, and understanding how users interact with agent systems in production.

Overall, Harmonic's experience with Scout provides a comprehensive view of practical LLMOps challenges and solutions for building production agent systems, particularly those serving non-technical users who need sophisticated capabilities wrapped in intuitive interfaces.
