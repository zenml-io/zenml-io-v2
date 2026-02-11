---
title: "Scaling AI-Assisted Developer Tools and Agentic Workflows at Scale"
slug: "scaling-ai-assisted-developer-tools-and-agentic-workflows-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69316094919739ff85477e17"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:32:50.720Z"
  createdOn: "2025-12-04T10:21:08.030Z"
llmopsTags:
  - "code-generation"
  - "question-answering"
  - "summarization"
  - "chatbot"
  - "document-processing"
  - "regulatory-compliance"
  - "code-interpretation"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "reranking"
  - "multi-agent-systems"
  - "agent-based"
  - "cost-optimization"
  - "token-optimization"
  - "error-handling"
  - "latency-optimization"
  - "semantic-search"
  - "vector-search"
  - "mcp"
  - "few-shot"
  - "human-in-the-loop"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "cicd"
  - "orchestration"
  - "devops"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "pytorch"
  - "fastapi"
  - "langchain"
  - "chromadb"
  - "pinecone"
  - "postgresql"
  - "redis"
  - "cache"
  - "anthropic"
  - "amazon-aws"
industryTags: "tech"
company: "Slack"
summary: "Slack's Developer Experience team embarked on a multi-year journey to integrate generative AI into their internal development workflows, moving from experimental prototypes to production-grade AI assistants and agentic systems. Starting with Amazon SageMaker for initial experimentation, they transitioned to Amazon Bedrock for simplified infrastructure management, achieving a 98% cost reduction. The team rolled out AI coding assistants using Anthropic's Claude Code and Cursor integrated with Bedrock, resulting in 99% developer adoption and a 25% increase in pull request throughput. They then evolved their internal knowledge bot (Buddybot) into a sophisticated multi-agent system handling over 5,000 escalation requests monthly, using AWS Strands as an orchestration framework with Claude Code sub-agents, Temporal for workflow durability, and MCP servers for standardized tool access. The implementation demonstrates a pragmatic approach to LLMOps, prioritizing incremental deployment, security compliance (FedRAMP), observability through OpenTelemetry, and maintaining model agnosticism while scaling to millions of tokens per minute."
link: "https://www.youtube.com/watch?v=Zl4dRW31AoE"
year: 2025
seo:
  title: "Slack: Scaling AI-Assisted Developer Tools and Agentic Workflows at Scale - ZenML LLMOps Database"
  description: "Slack's Developer Experience team embarked on a multi-year journey to integrate generative AI into their internal development workflows, moving from experimental prototypes to production-grade AI assistants and agentic systems. Starting with Amazon SageMaker for initial experimentation, they transitioned to Amazon Bedrock for simplified infrastructure management, achieving a 98% cost reduction. The team rolled out AI coding assistants using Anthropic's Claude Code and Cursor integrated with Bedrock, resulting in 99% developer adoption and a 25% increase in pull request throughput. They then evolved their internal knowledge bot (Buddybot) into a sophisticated multi-agent system handling over 5,000 escalation requests monthly, using AWS Strands as an orchestration framework with Claude Code sub-agents, Temporal for workflow durability, and MCP servers for standardized tool access. The implementation demonstrates a pragmatic approach to LLMOps, prioritizing incremental deployment, security compliance (FedRAMP), observability through OpenTelemetry, and maintaining model agnosticism while scaling to millions of tokens per minute."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-assisted-developer-tools-and-agentic-workflows-at-scale"
  ogTitle: "Slack: Scaling AI-Assisted Developer Tools and Agentic Workflows at Scale - ZenML LLMOps Database"
  ogDescription: "Slack's Developer Experience team embarked on a multi-year journey to integrate generative AI into their internal development workflows, moving from experimental prototypes to production-grade AI assistants and agentic systems. Starting with Amazon SageMaker for initial experimentation, they transitioned to Amazon Bedrock for simplified infrastructure management, achieving a 98% cost reduction. The team rolled out AI coding assistants using Anthropic's Claude Code and Cursor integrated with Bedrock, resulting in 99% developer adoption and a 25% increase in pull request throughput. They then evolved their internal knowledge bot (Buddybot) into a sophisticated multi-agent system handling over 5,000 escalation requests monthly, using AWS Strands as an orchestration framework with Claude Code sub-agents, Temporal for workflow durability, and MCP servers for standardized tool access. The implementation demonstrates a pragmatic approach to LLMOps, prioritizing incremental deployment, security compliance (FedRAMP), observability through OpenTelemetry, and maintaining model agnosticism while scaling to millions of tokens per minute."
---

## Overview and Context

Slack's Developer Experience (DevEx) team, comprising 70-80 people responsible for supporting the entire Slack engineering organization and extending into Salesforce, undertook a comprehensive multi-year journey to integrate generative AI into their internal development workflows. The presentation, delivered at AWS re:Invent by Slack staff software engineer Shivani Bitti and AWS solutions architects, chronicles their evolution from experimental AI prototypes in 2023 to production-grade agentic systems handling thousands of requests monthly in 2025. The DevEx team's charter is to reduce friction in everyday engineering work, and their approach consistently involved building internally first, testing with smaller engineering teams, proving success, and then rolling out to broader audiences—a pattern that proved critical to their AI adoption success.

The journey represents a sophisticated case study in LLMOps because it demonstrates the full lifecycle of taking LLM-based systems from experimentation through production at significant scale, with detailed attention to infrastructure choices, cost optimization, security compliance, observability, and measuring real-world impact on developer productivity. The team's pragmatic approach of starting with high-impact use cases, avoiding analysis paralysis, and incrementally building capabilities while maintaining model agnosticism offers valuable lessons for organizations navigating similar transformations.

## Infrastructure Evolution and Platform Choices

Slack's infrastructure journey reflects thoughtful decision-making around trade-offs between control, cost, and operational complexity. In Q2 2023, they began with Amazon SageMaker, which provided maximum control and met their strict FedRAMP compliance requirements. This phase was primarily about learning and experimentation as generative AI was gaining momentum. They ran an internal hackathon in Q3 2023 where teams experimented with prototypes, including features like huddle summaries that eventually made it into the product. This exploratory phase proved the art of the possible but came with significant hidden costs in infrastructure maintenance and operational overhead.

The breakthrough came in Q1 2024 when Slack migrated to Amazon Bedrock, which had achieved FedRAMP compliance and provided access to the latest Anthropic models. This transition represented not just a technology change but a philosophical shift—Bedrock handled all LLM scaling and infrastructure maintenance, allowing the team to focus on building developer experiences rather than managing infrastructure. The migration yielded a remarkable 98% cost reduction, a figure that speaks to the inefficiencies inherent in managing custom model infrastructure at their earlier stage. Bedrock's unified platform provided built-in security, governance through guardrails, and the ability to scale from hundreds of thousands of tokens per minute to millions without infrastructure concerns.

The platform choice rationale centered on three key factors: unified platform benefits across AWS services, built-in security and compliance that met Slack's enterprise requirements (job zero for AWS according to the presenters), and massive scalability without infrastructure management burden. Bedrock also enabled model flexibility—while Anthropic models formed the foundation of their work, the platform didn't lock them into a single provider. This proved prescient as they later adopted AWS Strands for orchestration, maintaining their ability to experiment with different models and frameworks as the AI landscape evolved rapidly.

## AI Coding Assistants and Developer Productivity

By Q1 2025, responding to developer demand for coding assistance, Slack rolled out AI coding assistants using Cursor and Claude Code, both integrated with Amazon Bedrock. The Anthropic models that already formed the foundation of their infrastructure made this adoption straightforward. This represents a critical LLMOps decision point—rather than building custom coding assistants from scratch, they leveraged best-in-class tools that could integrate with their existing Bedrock infrastructure, accelerating time to value while maintaining security and governance standards.

The adoption metrics tell a compelling story, though it's important to note these come from the vendor side and warrant some skepticism. The team reports that 99% of their developers use some form of AI assistance, with consistent week-over-week adoption increases and sustained month-over-month usage. More concretely, they observed approximately 25% consistent month-over-month increases in pull request throughput across major repositories. These metrics were tracked through multiple data sources: OpenTelemetry metrics instrumented into all AI tooling to capture usage patterns and tool invocations, and GitHub source code analysis identifying pull requests and commits co-authored by AI (detected through AI signatures in the commits).

The measurement approach demonstrates mature thinking about LLMOps evaluation. Shivani Bitti emphasized that measuring AI impact on developer productivity is "one of the hardest problems" and that they needed to determine both what to measure and how to measure it. They established two foundational metric categories: AI adoption metrics (as a signal that tools relieve workflow pain) and impact on developer experience metrics using established frameworks like DORA and SPACE metrics. This multi-dimensional approach avoided the trap of relying on a single metric that might not capture the full picture.

Importantly, the team also tracked negative impacts. They observed increased peer review time as AI assistance enabled engineers to write more code, increasing the surface area for review and creating additional load for reviewers. This honest assessment—that AI is not perfect and introduces new challenges—demonstrates a balanced perspective often missing from vendor case studies. They're actively working to address this issue by exploring AI assistance for the review process itself, aiming to support developers across the entire development cycle rather than just code generation.

The team also collected qualitative feedback directly from developers, which they cite as "the most important metric." This confirms that the tools genuinely help developers rather than just moving metrics in favorable directions. The combination of quantitative metrics showing 99% adoption and 25% PR throughput increases with qualitative validation provides a more credible picture than either would alone, though readers should still approach vendor-reported metrics with appropriate skepticism.

## Knowledge Management and Escalation Handling

Beyond coding assistants, Slack developed Buddybot, an AI assistant initially designed to help engineers with documentation and knowledge search. This evolved into a sophisticated system handling escalation management—a critical pain point where users post questions in escalation channels that get routed to appropriate engineering teams. At scale, this was causing significant on-call fatigue for engineers. The AI-assisted escalation bot now handles over 5,000 escalation requests per month, representing substantial operational efficiency gains.

The initial Buddybot architecture (version 0) addressed the fundamental problem of engineers spending excessive time on escalations by leveraging knowledge scattered across different data sources—Slack messages and files, GitHub repositories containing technical designs and documentation, and other internal systems. The system employed hybrid search to gather relevant information across these data sources, then used re-ranking to identify the most accurate and relevant data before providing the top documents to the LLM along with the user query to generate accurate answers. This represents a fairly standard retrieval-augmented generation (RAG) pattern, but implemented at production scale with attention to ranking quality and multi-source knowledge integration.

However, this initial design encountered challenges around maintaining conversational history and executing external actions beyond simple retrieval and response. This limitation drove the evolution toward a more sophisticated agentic architecture, which represents the most technically interesting aspect of the case study from an LLMOps perspective.

## Evolution to Multi-Agent Architecture

The evolution of Buddybot into a production agentic system demonstrates sophisticated LLMOps practices around orchestration, durability, and tool integration. The architecture begins when a user sends a message in Slack, triggering an event that the backend receives and uses to start a Temporal workflow. Temporal, a durable execution framework, provides workflow orchestration that maintains conversational state across the entire escalation lifecycle until resolution. This architectural choice elegantly solves the problem of maintaining conversation context without requiring the application itself to manage state persistence—Temporal handles durability, automated retries, and state management in a database, so even if the backend fails, the workflow resumes where it left off.

The Temporal workflow invokes the main orchestrator agent built using AWS Strands with Anthropic's Claude model. This orchestrator agent decides which sub-agents to call based on the request. All sub-agents are built using Claude Code SDKs, creating a hybrid architecture where Strands handles orchestration while Claude Code sub-agents perform specialized tasks. This design pattern—which Strands calls "agents as tools"—abstracts the orchestrator from the specialized agents, allowing the orchestration layer to direct Claude Code sub-agents today while maintaining flexibility to point to different agents or models tomorrow.

The sub-agents access internal services through MCP (Model Context Protocol) servers, which provide standardized interfaces to Slack's internal tools and data sources built on AWS services. Slack built their own MCP servers and also learned from AWS examples, such as an MCP server for Amazon EKS. This standardization means agents don't need to manage different API patterns for different services—they interact through a consistent protocol. Once sub-agents complete their work, the orchestrator synthesizes and validates responses before sending them back to the Slack channel.

The architecture demonstrates several production-grade LLMOps capabilities. The orchestrator runs sub-agents in parallel for performance optimization. Token usage is carefully managed—the orchestrator summarizes each sub-agent response before sending the combined context to expensive LLMs for final synthesis, reducing token consumption. Security is addressed through remote MCP servers integrated with OAuth services and Uber proxy (Slack's networking system), ensuring the bot can safely access sensitive internal systems like GitHub with appropriate permissions. The Temporal integration provides granular visibility and traceability into all calls, which is essential for debugging and understanding agent behavior in production.

## Strategic Technology Choices and Model Agnosticism

A particularly interesting aspect of the case study is the reasoning behind choosing Strands as the orchestration framework when Claude Code sub-agents were already so powerful. The team explicitly asked themselves why they should look beyond Claude Code, which can create automations easily through its SDK and was meeting most of their needs. The decision reflects mature thinking about production LLMOps trade-offs.

Several factors drove the choice. First, while Claude Code is powerful, it can become expensive and less predictable depending on the task complexity. As systems move from exploration to production with usage scaling dramatically, cost becomes a significant consideration. Second, model agnosticism is critical given how early the industry is in this technology journey—they wanted to avoid lock-in to a single model or provider since no one knows what capabilities will emerge next. Third, they wanted the flexibility to use different models for different specialized tasks, perhaps using cheaper LLMs for simpler tasks rather than paying for expensive models across the board.

The most strategic reason relates to abstraction and control. Claude Code includes its own orchestrator with planning and thinking capabilities that can direct its sub-agents, but this means the entire agentic system is within Claude Code's control. By abstracting the orchestrator into Strands—an open-source, model-agnostic framework—they maintain control over the orchestration layer while still leveraging what Claude Code does best: specialized task execution. This allows the orchestrator to point to Claude Code sub-agents today but also to other agents or models tomorrow without restructuring the entire system. The goal is creating an agnostic agentic framework that future-proofs production deployments as the technology landscape evolves.

This architectural philosophy demonstrates sophisticated thinking about technical debt and lock-in in rapidly evolving AI systems. Rather than optimizing purely for short-term development velocity, they're making trade-offs that preserve flexibility and optionality as the technology matures. The use of open-source Strands rather than proprietary orchestration frameworks aligns with this philosophy, giving them transparency and control over the orchestration logic.

## Observability and Monitoring

The case study demonstrates strong attention to observability, which is essential for production LLMOps but often neglected in early implementations. The team instrumented all AI tooling with OpenTelemetry metrics, providing visibility into usage patterns, tool invocations, token consumption, and performance characteristics. When using AWS Agent Core (a service that handles runtime, identity, memory, and observability for agents), Strands automatically integrates with these observability capabilities, streaming metrics and traces of complex agentic workflows.

Bedrock itself provides native observability through CloudWatch logs, metrics, and alerts, which helped the team gain insights into LLM usage patterns and identify optimization opportunities. The Temporal workflow integration provides granular visibility into agent invocations, showing which sub-agents were called, what tools they used, and how long operations took. This multi-layer observability stack—from infrastructure metrics in Bedrock and CloudWatch, through agent orchestration traces in Temporal, to application-level metrics from OpenTelemetry—provides the comprehensive visibility needed to operate complex AI systems in production.

The importance of this observability infrastructure becomes clear when considering the complexity of debugging agentic systems. Unlike traditional software where execution paths are deterministic, agent behavior can vary based on LLM responses, tool availability, and dynamic planning. Having detailed traces of what agents decided to do, which tools they invoked, and what information they considered is essential for understanding failures, optimizing performance, and building confidence in system behavior.

## Security, Compliance, and Governance

Security and compliance were foundational considerations throughout Slack's journey, not afterthoughts added for production deployment. The initial choice of SageMaker was partly driven by FedRAMP compliance requirements, and the migration to Bedrock only occurred once it achieved FedRAMP compliance. This reflects the reality that enterprise organizations cannot compromise on security and compliance even when adopting cutting-edge AI capabilities.

Bedrock's built-in guardrails provided governance capabilities that aligned with Slack's security requirements. The MCP server integration with OAuth services and Uber proxy ensured that agents accessing sensitive internal systems did so with appropriate authentication and authorization. This is particularly important given that agents are making decisions about which systems to access and what operations to perform—without proper security controls, agentic systems could inadvertently expose sensitive data or perform unauthorized actions.

The case study doesn't detail specific guardrail implementations or security incidents, which is typical of vendor presentations but leaves some questions about the challenges encountered and how they were addressed. The emphasis on security being "job zero" suggests it was taken seriously, but readers implementing similar systems should anticipate spending significant effort on security architecture, access controls, prompt injection defenses, and audit logging beyond what's described here.

## Learnings and Operational Experience

The team shared several key learnings from their journey that reflect real operational experience with LLMOps. One significant challenge was "experimentation fatigue" with different LLMs and tools. The AI landscape changes so rapidly that constantly rolling out new competing internal features caused confusion for developers and maintenance overhead for the DevEx team. To combat this, they doubled down on a high-impact tech stack: Amazon Bedrock, Anthropic models, and specific tooling like Claude Code and Cursor. The goal was creating a seamless experience that maximizes throughput and reduces decision fatigue for developers.

This learning highlights a tension in LLMOps: the desire to experiment with new capabilities as they emerge versus the need for stability and coherence in production systems. Slack's approach of standardizing on a core stack while maintaining model agnosticism through architectural patterns like Strands orchestration represents a pragmatic middle ground—they can experiment at the infrastructure level without constantly changing developer-facing tools.

Another key insight is their incremental approach to agents. Rather than attempting to build a "super agent" that does everything, they're enhancing existing LLM-based workflows with agentic capabilities and exploring new use cases in DevOps and incident management. They explicitly avoided rushing into agent-to-agent (A2A) interactions, instead spending time learning fundamentals by building their first MCP server and understanding agent foundations before increasing complexity. This measured approach—shipping small increments rather than getting stuck in analysis paralysis—is consistently emphasized as critical to their success.

The team also noted that while Strands simplified much of their code by handling orchestration complexity and eliminating the need to maintain conversational history (delegated to Temporal), building reliable agents remains more complex than initial expectations. This honest assessment aligns with broader industry experience that agentic systems introduce new classes of challenges around reliability, predictability, and debugging that aren't present in traditional software or even simpler LLM integrations.

## Technical Integration Details

The technical stack demonstrates thoughtful integration across multiple AWS services and third-party tools. At the foundation is Amazon Bedrock providing managed access to foundation models with flexible hosting options (pay-as-you-go and reserved capacity). Agent Core handles runtime, identity, memory, and observability for agents, reducing undifferentiated heavy lifting. AWS Strands provides the orchestration framework with built-in guardrails, native observability, MCP integration, and support for multiple multi-agent patterns (swarm, graph, workflow, and agents-as-tools).

Temporal handles workflow durability and state management, providing critical infrastructure for maintaining conversation context across escalation lifecycles. Claude Code SDKs implement specialized sub-agents that perform specific tasks like triage and knowledge base retrieval. MCP servers provide standardized access to internal tools and data sources, with custom servers built by Slack and integration with their OAuth and networking infrastructure for secure access.

The integration with existing development tools like GitHub for metrics collection and Slack itself for interaction surfaces demonstrates how AI capabilities are embedded into existing workflows rather than requiring developers to adopt entirely new tools. The use of hybrid search and re-ranking for knowledge retrieval shows attention to information retrieval quality beyond basic similarity search. The parallel execution of sub-agents and token optimization through summarization reflect performance tuning for production scale.

## Future Direction and Roadmap

Looking ahead, Slack's vision extends beyond their current escalation bot to establishing fully automated agentic workflows across the entire development cycle. They plan to experiment with Strands use cases beyond escalation management and integrate more internal tools via MCP to make their agents more powerful. They're actively exploring Agent Core for deeper integration with AWS services and seeking native integration between Temporal and Strands for smoother execution and more granular retry mechanisms.

The long-term goal of fully automated agentic workflows spanning the complete development cycle is ambitious and reflects the potential they see in agent-based architectures. However, they're pursuing this incrementally rather than attempting a big-bang transformation. The roadmap suggests continued focus on expanding use cases, improving integration patterns, and enhancing the reliability and capabilities of their agent infrastructure.

One notable gap in the roadmap discussion is evaluation and testing strategies for agents. While they have strong observability for production behavior and metrics for measuring impact, the presentation doesn't detail how they test agent behavior before deployment, what evaluation frameworks they use, or how they ensure agent reliability as complexity increases. This is a common challenge in LLMOps that may warrant further attention as their systems become more sophisticated.

## Critical Assessment

The case study presents an impressive journey from experimentation to production-scale LLMOps, but several aspects warrant critical consideration. First, the metrics reported—99% adoption and 25% PR throughput increases—should be viewed with appropriate skepticism as they're self-reported by the vendor at a marketing event. The team does deserve credit for acknowledging negative impacts like increased review time, which adds credibility, but independent validation of productivity claims would strengthen confidence.

Second, the presentation focuses heavily on the technical infrastructure and architectural decisions while providing less detail on the challenges encountered, failed experiments, and iteration required to reach current capabilities. Real-world implementations inevitably involve false starts, unexpected behaviors, and difficult trade-offs that aren't fully captured here. Organizations attempting similar journeys should expect significant learning curves and iteration beyond what's presented.

Third, the security and governance discussion, while emphasizing importance, lacks specific details about threat models, security testing, prompt injection defenses, or audit requirements. The emphasis on FedRAMP compliance is meaningful, but implementation details would help readers understand the security engineering required for production agentic systems.

Fourth, the cost discussion mentions a 98% reduction when moving from SageMaker to Bedrock, which is dramatic but lacks context about absolute costs, usage patterns, or whether this reflects comparing managed infrastructure to self-managed infrastructure at their maturity level. The focus on cost optimization through token management and model choice is valuable, but total cost of ownership at their scale would provide helpful context.

Finally, the model agnosticism strategy through Strands orchestration is architecturally sound but remains largely theoretical—they're still primarily using Anthropic models. The flexibility is valuable for future optionality, but the practical benefits haven't yet been demonstrated through actual model switching in production. This doesn't diminish the architectural wisdom, but organizations should weigh the complexity of maintaining model agnosticism against their actual likelihood of switching models.

## Conclusion and Broader Implications

Despite these caveats, Slack's journey offers valuable lessons for organizations implementing production LLMOps. Their incremental approach, focus on measuring impact, attention to developer experience, and architectural decisions around model agnosticism and observability demonstrate mature thinking about AI systems in production. The evolution from managed model infrastructure (SageMaker) to managed service (Bedrock) to agentic architectures (Strands orchestration with Claude Code sub-agents) reflects a pragmatic path that balanced learning, capability, and operational complexity.

The emphasis on starting internally, proving value with small teams, and then scaling represents a sound adoption strategy that reduces risk and builds organizational capability. The multi-dimensional measurement approach combining adoption metrics, productivity metrics, and qualitative feedback provides a model for evaluating AI impact beyond simplistic measures. The integration with existing tools and workflows rather than requiring wholesale adoption of new platforms likely contributed to their high adoption rates.

The case study ultimately demonstrates that successful production LLMOps requires more than just LLM capabilities—it requires careful infrastructure choices, observability and monitoring, security and compliance architecture, workflow orchestration, and thoughtful measurement of impact. Organizations embarking on similar journeys can learn from Slack's measured approach, willingness to evolve their architecture as needs changed, and focus on delivering value to end users (internal developers in this case) rather than chasing every new AI capability as it emerges.