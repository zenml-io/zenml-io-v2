---
title: "Building a Unified GenAI Platform for Hundreds of Production Use Cases"
slug: "building-a-unified-genai-platform-for-hundreds-of-production-use-cases"
draft: false
llmopsTags:
  - "chatbot"
  - "data-analysis"
  - "content-moderation"
  - "classification"
  - "poc"
  - "caption-generation"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "fallback-strategies"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "mcp"
  - "vllm"
  - "api-gateway"
  - "monitoring"
  - "databases"
  - "cicd"
  - "scaling"
  - "microservices"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "langchain"
  - "postgresql"
  - "openai"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Karrot"
summary: "Karrot, a local community marketplace platform, faced challenges scaling from initial LLM experimentation to hundreds of GenAI use cases across their organization. The main problems included fragmented account management with proliferating API keys, experimentation bottlenecks requiring engineering support for every prompt iteration, and inconsistent reliability patterns. They solved this by building three integrated platforms: LLM Router (a unified API gateway for centralized access and cost management), Prompt Studio (a no-code platform for prompt development, evaluation, and deployment), and KarrotChat (an internal agent platform for discovering and using AI capabilities). The result was democratized AI development where non-technical teams could independently build and deploy GenAI features, company-wide knowledge sharing through reusable prompts and agents, and reliable production services handling hundreds of millions of requests with sophisticated fallback mechanisms."
link: "https://medium.com/daangn/karrots-genai-platform-5cf6e813838e"
year: 2025
seo:
  title: "Karrot: Building a Unified GenAI Platform for Hundreds of Production Use Cases - ZenML LLMOps Database"
  description: "Karrot, a local community marketplace platform, faced challenges scaling from initial LLM experimentation to hundreds of GenAI use cases across their organization. The main problems included fragmented account management with proliferating API keys, experimentation bottlenecks requiring engineering support for every prompt iteration, and inconsistent reliability patterns. They solved this by building three integrated platforms: LLM Router (a unified API gateway for centralized access and cost management), Prompt Studio (a no-code platform for prompt development, evaluation, and deployment), and KarrotChat (an internal agent platform for discovering and using AI capabilities). The result was democratized AI development where non-technical teams could independently build and deploy GenAI features, company-wide knowledge sharing through reusable prompts and agents, and reliable production services handling hundreds of millions of requests with sophisticated fallback mechanisms."
  canonical: "https://www.zenml.io/llmops-database/building-a-unified-genai-platform-for-hundreds-of-production-use-cases"
  ogTitle: "Karrot: Building a Unified GenAI Platform for Hundreds of Production Use Cases - ZenML LLMOps Database"
  ogDescription: "Karrot, a local community marketplace platform, faced challenges scaling from initial LLM experimentation to hundreds of GenAI use cases across their organization. The main problems included fragmented account management with proliferating API keys, experimentation bottlenecks requiring engineering support for every prompt iteration, and inconsistent reliability patterns. They solved this by building three integrated platforms: LLM Router (a unified API gateway for centralized access and cost management), Prompt Studio (a no-code platform for prompt development, evaluation, and deployment), and KarrotChat (an internal agent platform for discovering and using AI capabilities). The result was democratized AI development where non-technical teams could independently build and deploy GenAI features, company-wide knowledge sharing through reusable prompts and agents, and reliable production services handling hundreds of millions of requests with sophisticated fallback mechanisms."
notion:
  pageId: "34ef8dff-2538-816a-94d0-c0d9cb8a0292"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:03:13Z"
---

## Overview

Karrot is a local community marketplace platform that underwent a dramatic transformation in their GenAI adoption between early 2024 and late 2025. The case study, published in December 2025, chronicles their journey from initial LLM experimentation to operating hundreds of production GenAI use cases across products and internal data pipelines. This represents a mature LLMOps implementation addressing the full lifecycle challenges of running LLMs at scale in production environments.

The company built three core platforms to enable this scale: LLM Router (API gateway), Prompt Studio (prompt management and development platform), and KarrotChat (internal agent platform). While the architecture might appear complex, each component evolved to solve specific operational pain points that emerged as they scaled their AI adoption. This case study is particularly valuable because it demonstrates the practical challenges organizations face when moving from experimentation to production-scale LLM operations, and the infrastructure investments required to support democratized AI development across an organization.

## The Evolution: From Experimentation to Scale

Karrot's journey began in early 2024 with initial LLM experimentation, documented in their earlier blog post "Using LLMs at Karrot." By late 2025, they had transformed this into a comprehensive platform supporting diverse use cases ranging from user-facing features like AI Writing Assistance, AI Photo Studio, Dream Home, and AI Try-on to internal tools like DANA (Data Analysis Agent). This evolution reveals the maturation path many organizations follow: initial proof-of-concepts give way to operational challenges that require systematic platform solutions.

The scale they achieved is noteworthy—the platform handles hundreds of millions of requests, supporting multiple production services with dependencies on shared infrastructure. This necessitated significant investments in reliability, observability, and security rather than treating these as afterthoughts.

## LLM Router: Solving the API Gateway Problem

### The Account Management Challenge

As Karrot's teams independently adopted LLMs, they faced a classic distributed systems problem: proliferating credentials and fragmented resource management. Each team provisioned their own accounts and API keys across multiple providers (OpenAI, Anthropic, Google, and self-hosted models). This created several operational problems that would be familiar to any organization scaling AI adoption.

The provisioning process itself became a bottleneck, with account and API key setup creating friction for teams wanting to adopt AI capabilities. Security concerns emerged as numerous keys circulated across the organization with unclear tracking of which team used which credentials for what purpose. Rate limits created uneven availability because API providers enforce per-account limits—some teams hit their limits while others had excess capacity. Cost visibility fragmented across multiple accounts and providers, making it time-consuming to understand total AI spend.

### The Gateway Solution

LLM Router was built as a centralized API gateway to funnel all AI API calls through a single entry point. This architectural decision enabled several improvements. The core concept is straightforward: API keys and accounts are managed centrally by LLM Router, while individual services authenticate with only a service ID rather than managing separate credentials.

This eliminated the provisioning overhead entirely—most previously issued keys were recalled, and teams could access any supported API immediately without setup. Operations became centralized, with the infrastructure team taking over unified account management, rate limit monitoring, and quota adjustments. This freed product teams to focus on building features rather than managing infrastructure. Cost visibility improved dramatically because every request through LLM Router is attributed to its originating service, feeding into Karrot's infrastructure cost management platform for at-a-glance visibility into which services consume which models at what cost.

### Multi-Provider Abstraction

A critical design decision was standardizing on the OpenAI interface for all models regardless of provider. Whether calling Claude 4.5 Sonnet from Anthropic or GPT-5.2 from OpenAI, developers use the same OpenAI SDK and simply change the model name. LLM Router handles provider-specific translation internally.

This abstraction layer provides significant operational benefits. When new models launch, they're added to LLM Router once and teams can immediately use them by specifying the new model name—zero code changes required on the client side. This approach supports OpenAI, Google, Anthropic, and even self-hosted models via vLLM under a unified interface.

From a critical LLMOps perspective, this abstraction enables model flexibility and reduces vendor lock-in, which are important considerations for production systems. However, it's worth noting that this approach may not expose provider-specific features or optimizations, potentially creating a lowest-common-denominator effect. The case study doesn't discuss how they handle features unique to specific providers or whether this has limited their ability to leverage provider-specific capabilities.

## Prompt Studio: Democratizing AI Development

### The Experimentation Bottleneck

Early in Karrot's LLM journey, every AI-powered feature required code. Validating even simple ideas like "Can this prompt solve this problem?" required engineering support. Since determining the right approach, crafting effective prompts, and selecting appropriate models varies by use case and requires iteration, this created a significant bottleneck. When every iteration required an engineer, rapid experimentation became impossible.

### No-Code Development Platform

Prompt Studio is Karrot's web-based platform for creating and testing AI features without writing code. The workflow is straightforward: enter a prompt, select a model, click run. If results don't match expectations, revise and run again—iterating toward desired behavior. The platform supports all models from OpenAI, Google, and Anthropic, plus internally-hosted models, allowing users to switch freely between them to compare outputs and find the best fit.

This democratized AI development, enabling product managers and non-engineering roles to build AI features independently and iterate as quickly as needed. From an LLMOps perspective, this represents a significant shift in the development model—moving from engineering-gatekept experimentation to self-service development while maintaining centralized infrastructure and governance.

### Systematic Evaluation

Recognizing that a few successful examples don't guarantee consistent quality across diverse inputs, Prompt Studio includes an Evaluation feature for systematic testing. Users can upload test sets containing hundreds to thousands of examples, generate results in batch, and measure performance quantitatively. This answers the critical question: "How well does this prompt perform across varied scenarios?"

This evaluation capability is essential for production LLMOps. While the case study doesn't detail the specific metrics they use or whether they support custom evaluation criteria, the presence of systematic batch evaluation indicates a mature approach to quality assurance. However, the description is somewhat light on details about evaluation methodologies, whether they support automated regression testing, or how they handle evaluation dataset management over time.

### Deployment and Version Management

When a prompt is production-ready, deployment follows a decoupled architecture. Engineers integrate the Prompt Studio API only once; after that, teams can ship prompt improvements directly from the UI without code changes. Multiple versions coexist within a single project, making it easy to compare iterations and roll back if needed. Selecting which version serves production traffic is a single click.

This architecture enables end-to-end ownership where anyone can continuously test and improve AI features without engineering dependencies. Features like AI Writing Assistance shipped quickly through Prompt Studio and continue to evolve independently. From a critical perspective, this is a powerful pattern for agility, though the case study doesn't discuss important operational concerns like how they handle versioning conflicts, whether they have approval workflows for production changes, or how they manage the risk of non-technical users deploying changes that could impact production services.

### Knowledge Repository

An interesting emergent property: Prompt Studio has become the repository of AI knowledge across Karrot. Teams can reference how others structure their prompts, and best practices naturally accumulate. This organic knowledge sharing represents a valuable cultural outcome beyond the technical capabilities, turning the platform into a centralized hub where collective AI expertise lives.

### Reliability Mechanisms

Prompt Studio implements multiple layers of resilience to ensure high availability when depending on external AI services. These mechanisms address rate limits, latency spikes, and service disruptions:

**Retry logic** handles transient failures with automatic retries using exponential backoff—a standard pattern for API reliability.

**Region fallback** automatically retries the same model in a different region when rate limits or errors occur. For example, if Gemini 2.5 Flash fails in us-central1, it retries in the global region. This geographical redundancy helps route around provider-level issues in specific regions.

**Model fallback** switches to a pre-configured alternative model from a different provider when all retries fail. If Google's Gemini 2.5 Flash is unavailable across all regions, requests route to OpenAI's GPT-5. This cross-provider failover is sophisticated and provides genuine resilience, though it assumes that different models can serve as functional substitutes, which may not always be true depending on the use case.

**Circuit breaker** patterns activate during sustained outages. When a model continuously fails, the circuit breaker blocks requests to that model immediately, routing directly to fallback. It periodically health-checks the blocked model and restores traffic when it recovers. This fail-fast pattern minimizes latency during sustained provider outages.

These layered safeguards are critical for production LLMOps at scale. However, from a critical perspective, the case study doesn't discuss several important considerations: How do they handle semantic consistency when falling back to different models? What happens if the fallback model has different input/output characteristics? How do they prevent cascading failures if the fallback model also experiences issues? How do they balance cost versus reliability when automatically failing over to potentially more expensive models?

### Beyond Text: Multi-Modal Capabilities

Prompt Studio extended beyond text generation to support image and video generation models like OpenAI's GPT-Image and Sora, and Google's NanoBanana. Teams use these through the same workflow: select a model, test prompts, deploy when ready. This unified approach enabled rapid prototyping and launching of campaigns and features like Karrot AI Photo Studio, Dream Home, and AI Try-on.

The multi-modal support demonstrates architectural flexibility, though the case study doesn't detail whether the evaluation and reliability mechanisms work equally well for these different modalities or if they required separate infrastructure considerations.

### Agents and MCP Ecosystem

Prompt Studio includes support for AI Agents—systems that use tools and execute multi-step workflows autonomously. Agents receive a task along with available tools, then autonomously select and invoke tools as needed.

**MCP Hub** serves as a registry for discovering and sharing internally-developed MCPs (Model Context Protocol tools). When someone registers a useful MCP, anyone at Karrot can find and use it. The hub hosts tools for querying internal data, fetching documents, and more. This represents early adoption of the Model Context Protocol standard for tool integration, which is noteworthy.

**Agent Builder** enables combining tools from the MCP Hub to create Agents without code. Users write task instructions, select a model and MCPs, and Prompt Studio handles the orchestration loop automatically. Every Agent execution is captured as a Trace, enabling step-by-step debugging with visibility into why the LLM called specific tools and what the tool responses were.

The agent tracing capability is important for production LLMOps, as agent debugging can be challenging. However, the case study doesn't discuss how they handle agent reliability, cost management (agents can make many more API calls than simple prompts), or safety considerations around autonomous tool execution.

## KarrotChat: Internal Agent Platform

KarrotChat serves as the consumption layer where users interact with capabilities built in Prompt Studio. Teams can discover and interact with Agents, select any supported model for direct conversation, and enable MCPs from the hub with a toggle. Useful conversations can be shared across teams.

### DANA: Data Analysis Agent Case Study

DANA (Data Analyst of NA Product team) exemplifies the practical value of combining domain expertise, AI, and tool access. Karrot accumulates rich analytical data in BigQuery, but performing analysis previously required knowing which tables hold what information, understanding column meanings, performing appropriate joins, and writing BigQuery SQL. This knowledge lived with a small group of specialists.

DANA combines the BigQuery MCP, detailed documentation of the data model, and carefully crafted prompts. Now team members can ask questions in natural language and perform sophisticated analysis without understanding the underlying schema. For example, asking "Give me daily post counts for the past week" results in DANA finding the right table, running the query, and returning the answer. Deeper questions like "Which category was the most popular over the past 10 days?" involve joining tables, aggregating data, and surfacing insights.

The case study claims DANA has become part of the team's daily workflow and measurably boosted productivity. While no specific metrics are provided (which would strengthen the case), the concept demonstrates how agents can democratize specialized knowledge. From a critical perspective, important questions remain: How do they handle data access controls and privacy? What happens when DANA generates incorrect SQL? How do they validate the correctness of analytical results? How do they prevent prompt injection attacks that could lead to unauthorized data access?

The case study notes that internal Agents like DANA are multiplying, spreading knowledge that once lived with specialists across the organization. This represents a significant cultural and operational shift, though it also raises questions about skill atrophy and dependency on AI systems.

## Platform Architecture and Operations

The three platforms work together as an integrated system. LLM Router provides the foundational infrastructure layer with unified access, cost management, and multi-provider support. Prompt Studio builds on this to provide development, evaluation, deployment, and reliability capabilities. KarrotChat provides the consumption layer for discovering and using the capabilities built in the other platforms.

The case study emphasizes that with multiple services depending on shared infrastructure, they invest heavily in reliability, observability, and security. The platform handles hundreds of millions of requests, making stability and security critical. However, the case study is light on observability details—what metrics they track, how they monitor model performance drift, how they handle debugging across the stack, or what their incident response processes look like.

## Cultural and Organizational Aspects

The platform evolved in alignment with Karrot's core values: autonomy, rapid experimentation, and transparent knowledge sharing. Teams adopt AI independently while the platform provides company-wide visibility and governance. Effective prompts and Agents naturally propagate across the organization.

This cultural foundation enabled Karrot to adapt quickly to the GenAI era. The decentralized development model with centralized infrastructure and governance represents a mature approach to platform thinking. However, from a critical perspective, there are risks: How do they prevent quality issues when non-technical users deploy production changes? How do they manage the proliferation of similar but slightly different prompts solving the same problems? How do they deprecate outdated approaches?

## Technology Stack

The case study mentions several specific technologies:
- **Model Providers**: OpenAI (GPT-5.2, GPT-Image, Sora), Anthropic (Claude 4.5 Sonnet), Google (Gemini 2.5 Flash, NanoBanana)
- **Self-Hosting**: vLLM for hosting models internally
- **Data Infrastructure**: BigQuery for analytical data
- **Standards**: Model Context Protocol (MCP) for tool integration
- **API Standard**: OpenAI SDK as the unified interface

The use of vLLM for self-hosting alongside cloud providers suggests a hybrid approach, potentially for cost optimization or specific use cases requiring on-premises deployment. The adoption of MCP indicates forward-looking thinking about tool standardization.

## Critical Assessment

**Strengths of the approach:**
- Comprehensive platform thinking addressing the full LLMOps lifecycle
- Democratization of AI development while maintaining centralized governance
- Sophisticated multi-layer reliability mechanisms
- Multi-provider abstraction reducing vendor lock-in
- Integration of evaluation into the development workflow
- Early adoption of agent patterns and tool standardization (MCP)

**Areas where the case study lacks detail or raises concerns:**
- Limited discussion of evaluation methodologies, metrics, and regression testing
- No mention of approval workflows or governance for production deployments by non-technical users
- Unclear how they handle semantic consistency when falling back between different models
- Limited information on observability, monitoring, and debugging practices
- No discussion of cost control mechanisms for agents (which can be expensive)
- Security and data access controls for agents with database access are not detailed
- Missing details on how they validate correctness of AI-generated outputs, especially for critical use cases like data analysis
- No metrics provided for claimed productivity improvements
- Unclear how they manage prompt proliferation and knowledge management at scale

**Potential risks:**
- The no-code deployment model could enable production issues if quality gates are insufficient
- Model fallback assumes substitutability that may not hold for all use cases
- Agent autonomy raises safety and cost concerns not fully addressed
- Democratization may lead to inconsistent approaches across teams without strong governance

## Conclusion

Karrot's GenAI platform represents a mature LLMOps implementation addressing real operational challenges at scale. The three-platform architecture (LLM Router, Prompt Studio, KarrotChat) demonstrates thoughtful separation of concerns while maintaining integration. The emphasis on democratization and knowledge sharing aligns with modern platform engineering principles.

However, the case study reads somewhat like a product announcement, emphasizing capabilities and success stories while glossing over important operational details, failure modes, and governance mechanisms. Organizations looking to replicate this approach should consider the missing elements around evaluation rigor, deployment governance, observability, and safety mechanisms, particularly for autonomous agents with data access.

The scale achieved—hundreds of use cases and hundreds of millions of requests—suggests the architecture is fundamentally sound for production use. The cultural alignment around autonomy and knowledge sharing appears to be a key success factor beyond the technical implementation. The LLM Infrastructure team's role in bringing new advances to the platform first, enabling every product team to build on them, represents a sustainable model for scaling AI adoption across an organization.
