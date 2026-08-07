---
title: "Building an Internal AI Platform with Self-Hosted LLMs for Customer Support and Operations"
slug: "building-an-internal-ai-platform-with-self-hosted-llms-for-customer-support-and-operations"
draft: false
llmopsTags:
  - "customer-support"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "model-optimization"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "harness-engineering"
  - "evals"
  - "vllm"
  - "load-balancing"
  - "guardrails"
  - "monitoring"
  - "devops"
  - "scalability"
  - "reliability"
  - "compliance"
  - "security"
  - "google-gcp"
  - "nvidia"
industryTags: "tech"
company: "Tabby"
summary: "Tabby, a technology company operating in Saudi Arabia and UAE, built an internal AI platform to support autonomous AI agents for customer support and operational tasks while maintaining compliance and data security. The solution involved developing a unified AI agent builder running entirely on self-hosted infrastructure, deploying multiple open-source LLMs including RedPajama-5 and Gemma 4 on Nvidia GPU clusters, and creating custom routing and evaluation systems. After a year of implementation, the platform successfully powers customer support agents that can access tools, formulate responses, and suggest actions to human operators while maintaining human-in-the-loop oversight, all while achieving significant cost efficiency through quantization and intelligent resource management."
link: "https://www.youtube.com/watch?v=XFaATtithO0"
year: 2026
seo:
  title: "Tabby: Building an Internal AI Platform with Self-Hosted LLMs for Customer Support and Operations - ZenML LLMOps Database"
  description: "Tabby, a technology company operating in Saudi Arabia and UAE, built an internal AI platform to support autonomous AI agents for customer support and operational tasks while maintaining compliance and data security. The solution involved developing a unified AI agent builder running entirely on self-hosted infrastructure, deploying multiple open-source LLMs including RedPajama-5 and Gemma 4 on Nvidia GPU clusters, and creating custom routing and evaluation systems. After a year of implementation, the platform successfully powers customer support agents that can access tools, formulate responses, and suggest actions to human operators while maintaining human-in-the-loop oversight, all while achieving significant cost efficiency through quantization and intelligent resource management."
  canonical: "https://www.zenml.io/llmops-database/building-an-internal-ai-platform-with-self-hosted-llms-for-customer-support-and-operations"
  ogTitle: "Tabby: Building an Internal AI Platform with Self-Hosted LLMs for Customer Support and Operations - ZenML LLMOps Database"
  ogDescription: "Tabby, a technology company operating in Saudi Arabia and UAE, built an internal AI platform to support autonomous AI agents for customer support and operational tasks while maintaining compliance and data security. The solution involved developing a unified AI agent builder running entirely on self-hosted infrastructure, deploying multiple open-source LLMs including RedPajama-5 and Gemma 4 on Nvidia GPU clusters, and creating custom routing and evaluation systems. After a year of implementation, the platform successfully powers customer support agents that can access tools, formulate responses, and suggest actions to human operators while maintaining human-in-the-loop oversight, all while achieving significant cost efficiency through quantization and intelligent resource management."
notion:
  pageId: "3b5f8dff-2538-80b2-9663-f33aa509fdca"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:22:00.000Z"
  lastEditedTime: "2026-08-07T12:22:00.000Z"
  publishedAt: "2026-08-07T12:31:49Z"
---

## Overview

Tabby is a technology company that has embarked on a comprehensive AI adoption journey focused on building an internal AI platform to power autonomous agents across customer support and operational workflows. The presentation covers their year-long experience deploying AI agents in production, with particular emphasis on their customer support use case. The company operates in both Saudi Arabia and UAE regions with data center infrastructure in both locations.

The case study is particularly noteworthy for its emphasis on self-hosted, on-premises infrastructure driven by compliance and data security requirements. The speakers, Ace (Head of AI Platform) and Yevgeny (Engineering Manager), outline a philosophy centered on centralized platform development to avoid what they term "model zoo" - the chaotic situation where different teams independently adopt various AI models without coordination, potentially creating security vulnerabilities and operational inefficiencies.

## Strategic Approach to AI Adoption

Tabby identifies three primary drivers for AI adoption: operational optimization to reduce costs and improve efficiency on repetitive tasks, accelerating software development cycles, and building AI-powered product features. The company explicitly distinguishes between AI assistants (conversational, copy-paste interactions) and AI agents (autonomous task execution), positioning their work firmly in the agentic paradigm which they claim is several times more efficient.

However, the presentation acknowledges significant challenges in enterprise AI adoption including infrastructure requirements, security concerns, handling personally identifiable information, compliance mandates, and the risk of uncontrolled proliferation of AI tools across the organization. Their solution to these challenges is a centralized AI platform that provides unified tooling while enforcing security and compliance boundaries.

## AI Platform Architecture

The core of Tabby's solution is an internal AI platform comprising several key components. At the heart is an AI agent builder - a fully internal tool that enables teams across the organization to construct, test, and deploy AI agents. This builder provides capabilities for creating agents and defining the tools that agents can access. The platform runs entirely on internal models without access to production data, which is a critical compliance requirement.

The flagship use case is a customer support agent that operates in a ReAct loop pattern - reasoning about customer questions, retrieving relevant data through approved tools, formulating responses, and suggesting both answers and actions to human customer support representatives. This agent demonstrates the practical implementation of their agentic philosophy while maintaining what the speakers emphasize as a critical principle: AI agents cannot and should not possess responsibility, which must always remain with humans.

## Evolution of Agent Capabilities

The customer support agent has evolved significantly from its initial implementation. The original version had limited capabilities and was tested only on small sets of questions. Through what the speakers call "agentic transformation," the system now incorporates a skills-based architecture allowing the agent to handle different topics and act as different types of specialists depending on the task context.

The evolution of tool access is particularly notable. Initially, the agent had only read-only access to tools for retrieving information. The current version can suggest actions to customer support agents, though always with human review and approval before execution. This phased approach to expanding agent autonomy demonstrates a measured risk management strategy while progressively unlocking more value.

## Evaluation Infrastructure

One of the most emphasized aspects of the presentation is the importance of rigorous evaluation. The speakers position evaluation as critically underestimated in the industry, stating that without proper evaluation, there can be no guarantee that agents will work correctly in production. Their approach involves mandatory evaluation processes enforced by the platform itself.

When teams build agents using the platform, they are required to run evaluations on thousands of examples to verify proper functioning before deployment. This evaluation-first culture is embedded in the platform design rather than being optional or recommended. The emphasis suggests that early iterations without comprehensive evaluation led to production issues that necessitated this systematic approach.

For engineering teams specifically, Tabby has established an internal knowledge base containing information about how their products work. This knowledge base is accessible to agents and helps them answer questions about development and analysis tasks. Importantly, this knowledge base does not have access to production data but maintains sufficient product knowledge to be useful.

## Infrastructure and Model Deployment

The infrastructure journey began with deploying RedPajama-2 on Nvidia V100 GPUs. After evaluating multiple models, frameworks, and hardware configurations, the team selected vLLM as their inference framework based on throughput, latency, and stability characteristics. The initial deployment was straightforward - one server, one model, one framework.

As AI adoption grew across the organization, Tabby expanded to newer Nvidia GPU generations including H100 and H300 servers deployed across data centers in Saudi Arabia and UAE, maintaining similar infrastructure in both regions for redundancy and regional data compliance.

## Model Selection Strategy

Tabby currently runs two primary production models, each optimized for different use case characteristics. RedPajama-5 with 397 billion parameters is deployed for tasks requiring strong reasoning capabilities, where model size and sophistication matter more than speed. Gemma 4 with 31 billion parameters serves use cases where speed is the critical factor.

This dual-model strategy reflects a pragmatic approach to the accuracy-latency tradeoff, allowing different workloads to be routed to appropriate models rather than using a one-size-fits-all approach. The speakers note that Google's release of Gemma 4 provided a compelling option for latency-sensitive applications.

## Quantization and Resource Efficiency

Quantization emerges as a transformative technology in the presentation, fundamentally changing the economics of self-hosting LLMs. The speakers note that one or two years prior, fitting a large model required eight GPUs. With modern quantization techniques from Nvidia, the same eight GPUs can now run eight separate model instances - a dramatic shift in resource utilization.

With H100 and H300 servers and quantization, they can run eight models on eight GPUs, while smaller models like Gemma can run multiple instances on a single GPU. This efficiency gain makes self-hosting economically competitive with cloud API services while maintaining the compliance and security benefits of on-premises deployment.

## Deployment Architecture Decisions

In a notable architectural choice, Tabby explicitly decided against using Kubernetes for their LLM deployment despite it being a common expectation for production AI systems. Their rationale centers on minimizing layers between the serving framework and hardware. Bare metal deployment provides optimal performance by eliminating the overhead and complexity of container orchestration.

Instead, they use Ansible for configuration management and service deployment, combined with a small custom Python library for orchestration. The speakers claim this approach delivers deployment times 80% faster than alternatives, though they clarify this metric applies to installation speed rather than downloading models or configuring frameworks. They acknowledge that as their fleet grows significantly larger, Kubernetes might become necessary, indicating this is a pragmatic decision based on current scale rather than an ideological position.

## Custom Routing Layer

A particularly sophisticated component of the infrastructure is a custom-built router for managing traffic across models and infrastructure. The decision to build rather than buy or use open-source routing solutions stems from the belief that generic solutions cannot understand Tabby's specific traffic patterns and requirements.

The router implements four critical functions. First is intelligent model selection, choosing the appropriate model for each request and automatically failing over to alternative servers if one is down or experiencing high latency. This ensures consistent SLA adherence and low latency. Second is sticky sessions, ensuring that conversations remain on the same provider and region to maintain context and avoid losing conversation state when switching between servers.

Third, the router enforces per-team and per-agent resource limits. In a multi-team environment with diverse workloads, this prevents any single team or agent from monopolizing GPU resources. Fourth is traffic prioritization, isolating real-time services from background tasks to ensure latency-sensitive applications receive preferential treatment.

This custom routing layer represents significant engineering investment but appears essential for managing the complex, multi-model, multi-region infrastructure at scale while maintaining performance guarantees.

## Benchmarking Philosophy

Tabby's approach to benchmarking reflects hard-won lessons about the gap between synthetic benchmarks and production reality. The speakers bluntly state that synthetic benchmarks "lie" and that only real production use cases reveal actual performance characteristics and help optimize configuration.

Their benchmarking process involves creating golden datasets based on actual production usage patterns for each use case. Different task types have different critical metrics - for real-time applications, they measure time to first token; for read-write tasks, they measure wall time and throughput. Across all tasks, accuracy is measured against their curated evaluation datasets.

The presentation includes an example showing how changing quantization settings produces different performance results, reinforcing the importance of measuring on real workloads rather than relying on theoretical performance numbers. They maintain a systematic benchmarking practice that feeds into decision-making about model selection, framework configuration, and hardware choices.

## Compliance and Security Posture

Compliance is positioned as a desired goal rather than merely a constraint, particularly given the regulatory environment in Saudi Arabia. The company uses only fine-tuned versions of open-source models without external API dependencies or data egress. This self-contained approach ensures data sovereignty and regulatory compliance.

The internal infrastructure operates without access to production PII data, creating a security boundary between AI systems and sensitive customer information. The platform includes built-in guardrails that enforce security and compliance policies, preventing teams from inadvertently creating non-compliant agents.

## Critical Assessment and Limitations

While the presentation makes confident claims about efficiency gains from agentic approaches ("several times more efficient"), specific quantitative results are largely absent. There are no detailed metrics on cost savings, productivity improvements, customer satisfaction changes, or other business outcomes that would substantiate the claimed benefits.

The emphasis on compliance and security is appropriate for their regulatory environment, but the presentation does not address potential limitations of their approach. Self-hosting large models requires significant capital investment in GPU infrastructure and substantial engineering effort to build and maintain custom routing and orchestration systems. Whether this approach is more cost-effective than using commercial API services with appropriate security controls is left unexplored.

The human-in-the-loop requirement for the customer support agent, while prudent from a risk management perspective, may limit the efficiency gains compared to fully autonomous systems. The presentation does not quantify what portion of agent-generated responses require modification by human operators or how much time the review process adds to resolution workflows.

The decision to avoid Kubernetes is pragmatic at current scale but may create technical debt if the infrastructure needs to scale significantly. The custom Python library and Ansible-based deployment may become maintenance burdens as team composition changes.

The presentation mentions that production experience comes primarily from their UI operations, with limited production data from their Saudi Arabia operations, suggesting the case study may not represent fully mature, scaled deployment across all business units.

## Lessons and Principles

Several important principles emerge from Tabby's experience. The emphasis on centralized platforms over decentralized AI adoption reflects concern about security and operational chaos. The requirement for rigorous evaluation embedded in the platform design addresses a common gap in AI deployments. The human-in-the-loop principle for responsibility-bearing decisions provides a template for responsible agent deployment.

The infrastructure choices - bare metal deployment, custom routing, benchmarking on production workloads - demonstrate sophistication in production engineering even if they increase implementation complexity. The multi-model strategy optimizing for different use case requirements shows maturity beyond simple model selection.

The quantization focus as an economic enabler for self-hosting is particularly relevant for organizations considering on-premises LLM deployment. The dramatic improvement in GPU utilization through quantization may indeed shift the cost calculus for compliance-driven organizations that previously found self-hosting prohibitively expensive.

Overall, this case study provides valuable insights into building production AI agent systems in compliance-constrained environments, though it would benefit from more concrete metrics on outcomes and a more balanced discussion of tradeoffs in their architectural choices.
