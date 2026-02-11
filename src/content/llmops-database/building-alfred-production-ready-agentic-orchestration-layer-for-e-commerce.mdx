---
title: "Building Alfred: Production-Ready Agentic Orchestration Layer for E-commerce"
slug: "building-alfred-production-ready-agentic-orchestration-layer-for-e-commerce"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "692d5e152996fdfbd5b6981a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:30:32.791Z"
  createdOn: "2025-12-01T09:21:25.808Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "healthcare"
  - "regulatory-compliance"
  - "structured-output"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "mcp"
  - "evals"
  - "error-handling"
  - "system-prompts"
  - "kubernetes"
  - "fastapi"
  - "docker"
  - "postgresql"
  - "langchain"
  - "monitoring"
  - "cicd"
  - "microservices"
  - "api-gateway"
  - "orchestration"
  - "open-source"
  - "security"
  - "guardrails"
  - "databases"
  - "cache"
  - "scalability"
  - "reliability"
  - "google-gcp"
  - "openai"
industryTags: "e-commerce"
company: "Loblaws"
summary: "Loblaws Digital, the technology arm of one of Canada's largest retail companies, developed Alfred—a production-ready orchestration layer for running agentic AI workflows across their e-commerce, pharmacy, and loyalty platforms. The system addresses the challenge of moving agent prototypes into production at enterprise scale by providing a reusable template-based architecture built on LangGraph, FastAPI, and Google Cloud Platform components. Alfred enables teams across the organization to quickly deploy conversational commerce applications and agentic workflows (such as recipe-based shopping) while handling critical enterprise requirements including security, privacy, PII masking, observability, and integration with 50+ platform APIs through their Model Context Protocol (MCP) ecosystem."
link: "https://www.youtube.com/watch?v=Sx7-hok2dtk"
year: 2025
seo:
  title: "Loblaws: Building Alfred: Production-Ready Agentic Orchestration Layer for E-commerce - ZenML LLMOps Database"
  description: "Loblaws Digital, the technology arm of one of Canada's largest retail companies, developed Alfred—a production-ready orchestration layer for running agentic AI workflows across their e-commerce, pharmacy, and loyalty platforms. The system addresses the challenge of moving agent prototypes into production at enterprise scale by providing a reusable template-based architecture built on LangGraph, FastAPI, and Google Cloud Platform components. Alfred enables teams across the organization to quickly deploy conversational commerce applications and agentic workflows (such as recipe-based shopping) while handling critical enterprise requirements including security, privacy, PII masking, observability, and integration with 50+ platform APIs through their Model Context Protocol (MCP) ecosystem."
  canonical: "https://www.zenml.io/llmops-database/building-alfred-production-ready-agentic-orchestration-layer-for-e-commerce"
  ogTitle: "Loblaws: Building Alfred: Production-Ready Agentic Orchestration Layer for E-commerce - ZenML LLMOps Database"
  ogDescription: "Loblaws Digital, the technology arm of one of Canada's largest retail companies, developed Alfred—a production-ready orchestration layer for running agentic AI workflows across their e-commerce, pharmacy, and loyalty platforms. The system addresses the challenge of moving agent prototypes into production at enterprise scale by providing a reusable template-based architecture built on LangGraph, FastAPI, and Google Cloud Platform components. Alfred enables teams across the organization to quickly deploy conversational commerce applications and agentic workflows (such as recipe-based shopping) while handling critical enterprise requirements including security, privacy, PII masking, observability, and integration with 50+ platform APIs through their Model Context Protocol (MCP) ecosystem."
---

## Overview and Company Context

Loblaws is one of Canada's largest retail companies with a massive footprint—within 10 minutes of virtually every Canadian, there's a Loblaws-owned store. Loblaws Digital supports a diverse portfolio of applications including retail and grocery stores, Shoppers (pharmacy retail chain), PC Optimum (loyalty program), PC Express (online grocery pickup and delivery), Joe Fresh (fashion brand), and various other e-commerce platforms. The organization has over 500 colleagues across 50+ teams working on different domains.

The case study centers on Alfred, an agentic orchestration layer developed by MFA Sudat (staff ML platform engineer) and his team at Loblaws Digital. The speaker has been at the company for over seven years and previously built their internal recommendations platform in 2023, which still powers recommendations across all their apps. In early 2025, they launched an AI-based curated product collections feature for e-commerce users, and most recently became a core contributor to Alfred and their Model Context Protocol (MCP) ecosystem.

## The Problem: Enterprise Agentic Commerce Challenges

The team identified several core challenges when implementing agentic AI systems in an enterprise e-commerce environment:

**Conversational commerce complexity**: Building chat-based commerce where users can converse with the system, view recommendations, add items to cart, and complete purchases requires sophisticated orchestration. **Agentic workflows**: Use cases like starting with a recipe and having an agent find all ingredients, shop for them, and proceed to checkout require complex multi-step coordination. **Production deployment gap**: While agents are relatively easy to prototype, running them reliably in production is significantly harder due to cloud infrastructure requirements, database management, privacy concerns, and security requirements. **Enterprise system integration**: The agentic applications need to coordinate with 50+ platform APIs with hundreds of endpoints across different services (cart, customer, catalog, pricing, recommendations, inventory, etc.). **Organizational scaling**: Across a large organization with many teams interested in building similar agentic applications, there was a need for a standardized starting point and best practices.

## The Solution: Alfred Architecture

Alfred was designed as a production-ready orchestration layer capable of running any agentic workflows across different use cases—not just e-commerce, but also loyalty programs, healthcare, and other domains. The core philosophy is to apply reusable patterns that can scale across all applications.

### Technology Stack

Alfred is built using what the team calls "battle tested tools" from both open source and Google Cloud Platform:

**Open source components**: LangGraph for orchestration, LangChain for agent workflows, FastAPI for the API layer, and LiteLLM for model abstraction. **GCP components**: Google Kubernetes Engine (GKE) for container orchestration, AlloyDB Postgres as the managed PostgreSQL database for checkpointing and state management. **Observability**: Langfuse for prompt management and observability, along with traditional monitoring solutions like Grafana and Prometheus. **Model providers**: The system abstracts multiple model providers through LiteLLM, including OpenAI and Gemini models.

### High-Level Architecture

Each Alfred application consists of several layers. At the core is a FastAPI microservice running on Google Kubernetes Engine. This FastAPI application serves as the gateway to the agentic system, handling orchestration using LangGraph, abstracting models through LiteLLM (supporting both OpenAI and Gemini providers), and integrating with Langfuse for prompt management and observability. The backend uses AlloyDB Postgres for scaling their database needs, particularly for conversation checkpointing and state management.

The architecture follows a clear separation of concerns. Front-end applications (mobile and web) communicate with a Backend-for-Frontend (BFF) layer, which in turn communicates with the Alfred microservice. The Alfred application has access to a foundation layer consisting of three main components: MCP servers exposing tools, a pluggable chat UI for testing, and an agent utilities package covering common functionalities, logging, and observability.

Below this sits three additional layers: an observability layer with Langfuse, metrics backend, and log sinks; an LLM layer powered by LiteLLM as a gateway to different model providers; and a data layer containing vector databases and checkpointing databases in Postgres, all managed through GCP components.

### Template-Based Approach

One of Alfred's key innovations is its template-based deployment approach. The team uses a Python library called Copier for templating. Any team wanting to build an agentic application can use Copier to start their own repository from the Alfred template stored in GitLab. The template includes:

**Barebone project structure** with all necessary components for an agentic application. **MCP integration** for tool calling. **Checkpointing capabilities** for conversation state management. **CI/CD pipelines** ready to deploy. **Pluggable chat UI** for testing conversational flows. **Testing frameworks** and configurations.

When teams start from the template, they go through a questionnaire that allows them to select different configurations such as which backend to use, which models to use, and other application-specific settings. This significantly reduces the time to production for new agentic applications.

### Agent Configuration and Execution

Agents in Alfred are configured through YAML files where teams can define agents, their connections with different tools, and connections with other agents. The system builds an execution graph for agent workflows based on these configurations. A typical Alfred application includes an orchestrator agent whose job is to route requests to specialized agents based on the task complexity. Simple tasks like follow-up prompts or summaries can be routed to smaller, faster models (like Gemini 2.5 Flash), while complex reasoning tasks are routed to more powerful models (like OpenAI's reasoning models).

### Security and Privacy

Enterprise-grade security and privacy are fundamental to Alfred's design. The system implements PII (Personally Identifiable Information) masking at two levels: all messages going to LLM providers are checked to ensure no PII is present, and data is also masked and encrypted on the observability side. The team takes encryption seriously, ensuring all data at rest and in transit is properly secured. Token validation and other security patterns are standardized across all Alfred applications.

## Model Context Protocol (MCP) Ecosystem

One of the most sophisticated aspects of Alfred is its comprehensive MCP ecosystem, which the team considers a foundation for great agentic applications. The MCP serves as a gateway to platform APIs across the enterprise.

### Why MCP?

In a large e-commerce company, there are many platform APIs (what Loblaws calls their "Helios platform") including cart, customer, catalog, pricing, recommendations, and inventory services. For agents to perform reliably, they cannot simply call individual endpoints randomly. The team carefully considered how to break down tasks and workflows, combining multiple operations into single, task-oriented tools. This abstraction is critical for agent performance.

For example, in the recipe use case, when a user discusses dinner ideas with the LLM and decides on shrimp pasta, a single tool can handle finding all the ingredients for that specific recipe. The LLM identifies the ingredients and offloads the task to the tool, which then orchestrates calls to multiple platform APIs (catalog, pricing, inventory) to return a complete list of products necessary for the recipe.

### MCP Benefits

**Massive reusability**: Tools can be reused across different agentic applications without any code changes. When new tools are introduced to the MCP, Alfred applications can readily access them without modifications. **Rich UI components**: The MCP provides rich content for the UI side through new protocols like AGUI, MCUI, and Apps SDK. These allow the MCP to return not just data but UI components (product lists, store lists, recommendation carousels) directly to the chat interface. This makes UI rendering consistent and reusable across different applications. **Task-oriented abstraction**: Low-level API endpoints are grouped into higher-level, task-oriented tools that align better with how agents think about workflows.

The team evaluated different approaches for building their MCP ecosystem. They initially looked at OpenAPI to MCP conversion tools but found that one-to-one API translations don't work well for agentic systems. They ultimately settled on FastMCP, which they describe as a widely-used standard that has provided excellent results.

## Testing and Development Experience

A notable feature of Alfred is the pluggable chat UI that comes with every FastAPI microservice. The team recognized that conversational commerce applications are difficult to test with traditional tools like Postman or Swagger UI. Instead, each Alfred application includes a UI-based testing solution that mimics natural conversational flow similar to standard chat applications.

The implementation is remarkably simple from a developer perspective. Using a Python package called "agent UI," developers can start a test chat UI and mount it to their FastAPI application using Radio with just a few lines of code. This allows teams to test complex conversational flows, tool calling, and multi-turn interactions in a realistic environment before deploying to production.

The testing UI demonstrates sophisticated capabilities. In one example shown, a user asks to "find me milk under 10," and the agent calls a search tool in the catalog search MCP, returning milk products from different brands and providers at various price points. The interface makes it easy to see tool calls, responses, and conversation flow.

## Use Cases and Workflows

The presentation highlighted several concrete use cases demonstrating Alfred's capabilities:

### Recipe-Based Shopping

This is perhaps the most sophisticated workflow demonstrated. The user engages in conversation about pasta recipes, and the system provides recipe suggestions. The user selects a store (for example, a downtown Lakeshore location), and then the LLM calls MCP tools to identify all products necessary to make the selected recipe (shrimp pasta). The system returns a structured list with pasta, shrimp, butter, and other ingredients, which the user can add to their cart. 

Currently, the checkout flow transitions users to the main e-commerce application for completion, though the team notes that fully agentic checkout within the conversational interface is a planned next step as agentic commerce capabilities mature across their stack.

### Conversational Product Discovery

Users can engage in natural language conversations to discover products, with the system making intelligent recommendations based on constraints (price, brand preferences, dietary restrictions, etc.). The agents leverage the catalog, pricing, and inventory MCP tools to provide real-time, contextually relevant results.

## Observability and Monitoring

The team has implemented comprehensive observability across multiple dimensions, though they acknowledge they don't yet have a single centralized solution covering everything:

### Langfuse Integration

Langfuse serves as the primary LLM observability platform. It tracks execution graphs, prompts, responses, token usage, and other LLM-specific metrics. All data is masked and protected according to their privacy requirements. The team uses Langfuse for application monitoring and to ensure agents behave as expected. An example shown demonstrated tracking a ReAct agent's execution, visualizing the graph structure and seeing each step's prompts and responses.

### Traditional Monitoring

For traditional API metrics, they use existing monitoring solutions including Grafana and Prometheus. These track standard metrics like request rates, error rates, and infrastructure health.

### MCP Server Monitoring

The MCP servers have their own dedicated dashboards monitoring successful tool calls and other service-specific metrics.

### Key Metrics

The team focuses on several critical metrics:

**Latency**: This is particularly important because they want LLM responses to be fast enough that users don't abandon conversations. Slow response times directly impact user experience in conversational commerce. **Success rate**: Standard success/failure metrics across the agent workflows and tool calls. **Cost**: This is a major focus area with sophisticated tracking. They monitor costs across different model providers and can set budgets per team and per project. They also implement rate limits as a fallback to ensure costs stay within requirements. Cost optimization is ongoing through various strategies including token usage optimization, orchestration pattern refinement (reducing unnecessary nodes), and intelligent model selection (routing simple tasks to lighter, cheaper models).

### Cost Management Strategy

The cost management approach is particularly nuanced. Budgets are set at the team level and project level through LiteLLM, which manages different model providers. They also set up alerts for budget thresholds. The orchestrator agent plays a key role in cost optimization by routing requests to appropriate models—simple tasks go to lightweight models like Gemini 2.5 Flash, while complex reasoning tasks are routed to more expensive OpenAI models. Follow-up prompts and simple summaries are often handled by flash models, significantly reducing costs without impacting quality.

The team also mentioned exploring prompt compression techniques as another avenue for cost optimization, though specific implementation details weren't provided in the presentation.

## Evaluation and Quality Assurance

Ensuring quality and type safety in nondeterministic agentic systems is a significant challenge that the team addresses through systematic evaluation:

### Evaluation Sets

For each agentic workflow, they create evaluation sets that mimic the workflow using a sequence of prompts. Taking the recipe example, they replay the complete prompt sequence (discussing recipes, selecting a store, finding ingredients, adding to cart) and verify that the system consistently returns appropriate responses.

### Prompt Engineering and Management

Significant effort goes into fine-tuning several aspects: tool descriptions must be precise and clear, tool parameter descriptions need to be comprehensive, system prompts require careful crafting, and overall prompt management becomes critical. The team leverages Langfuse's prompt management capabilities to iterate on different prompt versions, replay evaluation sets against each version, and validate results before updating production prompts.

This iterative approach allows them to systematically improve agent behavior while maintaining quality standards across the nondeterministic system.

## Production Deployment and Operations

Alfred applications are deployed through automated CI/CD pipelines included in the template. Each application runs on Google Kubernetes Engine, benefiting from Kubernetes' orchestration capabilities for scaling, health checking, and rolling updates.

The standardized architecture means that operational knowledge transfers across teams. When issues arise, the common foundation makes debugging more straightforward. The standard schema for BFF systems to communicate with Alfred microservices ensures consistent integration patterns.

All Alfred applications follow the same security patterns, observability configurations, and operational best practices, reducing the cognitive load on teams and making it easier to support applications across the organization.

## Organizational Impact and Adoption

The template-based approach has significantly accelerated agentic AI adoption across Loblaws Digital. Multiple teams can now start building agentic applications without needing deep expertise in all the underlying technologies. The reusable MCP ecosystem means teams benefit from tools and integrations built by other teams, creating a virtuous cycle of capability expansion.

The standardization also facilitates knowledge sharing and cross-team collaboration. Engineers can move between projects with reduced ramp-up time since the fundamental architecture remains consistent.

## Technical Tradeoffs and Considerations

While the presentation is promotional in nature (being a conference talk about their internal system), several technical tradeoffs and limitations are apparent:

**Complexity**: The architecture involves many components (LangGraph, FastAPI, LiteLLM, Langfuse, MCP servers, AlloyDB, GKE, etc.), which increases operational complexity and requires teams to understand multiple technologies. **GCP Lock-in**: The heavy reliance on GCP-specific services (GKE, AlloyDB) creates vendor lock-in, though the use of open-source components for core logic provides some portability. **Observability fragmentation**: The team acknowledged they don't have a unified observability solution, requiring teams to look at multiple dashboards (Grafana/Prometheus for infrastructure, dedicated MCP dashboards, and Langfuse for LLM metrics). **Checkout limitations**: The recipe-to-checkout workflow currently requires transitioning users to the main e-commerce app rather than completing checkout in the conversational interface, indicating some workflows aren't yet fully agentic. **Evaluation approach**: While they have evaluation sets, there's no mention of automated feedback loops or self-improvement mechanisms, suggesting evaluation is still largely manual and iterative.

## Future Directions

The team mentioned several areas for future development:

**Fully agentic checkout**: Completing the entire purchase flow within the conversational interface without transitioning to the traditional e-commerce app. **Expanded use cases**: Extending Alfred beyond e-commerce to loyalty programs, healthcare applications, and other domains within the Loblaws ecosystem. **Enhanced observability**: Potentially consolidating their observability stack into a more unified solution. **Feedback loops**: Though not explicitly mentioned as planned, the Q&A question about adding feedback loops for agents to self-improve suggests this is an area of interest.

Overall, Alfred represents a sophisticated production LLMOps platform that addresses real enterprise challenges in deploying agentic AI systems at scale, with thoughtful consideration of security, privacy, observability, cost management, and developer experience.