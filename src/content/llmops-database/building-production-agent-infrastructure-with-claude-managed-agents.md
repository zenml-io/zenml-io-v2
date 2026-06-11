---
title: "Building Production Agent Infrastructure with Claude Managed Agents"
slug: "building-production-agent-infrastructure-with-claude-managed-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "memory"
  - "human-in-the-loop"
  - "error-handling"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "serverless"
  - "orchestration"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
  - "cloudflare"
industryTags: "tech"
company: "Anthropic / Various"
summary: "Anthropic introduced Claude Managed Agents, a platform designed to address the infrastructure bottlenecks that prevent organizations from deploying increasingly capable AI agents at scale. The platform tackles key challenges including context management, memory, reliability, security, and observability that developers face when building production agent systems. By providing composable primitives for agent definition, sandboxed execution environments, session management, and event streaming, along with advanced features like multi-agent orchestration, outcomes-based iteration, persistent memory, and self-hosted sandboxes, Claude Managed Agents enables developers to build sophisticated agentic applications without managing the underlying infrastructure complexity. Partners including Cloudflare, Daytona, Modal, and Vercel contributed specialized sandboxing solutions to support diverse deployment scenarios."
link: "https://www.youtube.com/watch?v=zenIB7XLZxQ"
year: 2026
seo:
  title: "Anthropic / Various: Building Production Agent Infrastructure with Claude Managed Agents - ZenML LLMOps Database"
  description: "Anthropic introduced Claude Managed Agents, a platform designed to address the infrastructure bottlenecks that prevent organizations from deploying increasingly capable AI agents at scale. The platform tackles key challenges including context management, memory, reliability, security, and observability that developers face when building production agent systems. By providing composable primitives for agent definition, sandboxed execution environments, session management, and event streaming, along with advanced features like multi-agent orchestration, outcomes-based iteration, persistent memory, and self-hosted sandboxes, Claude Managed Agents enables developers to build sophisticated agentic applications without managing the underlying infrastructure complexity. Partners including Cloudflare, Daytona, Modal, and Vercel contributed specialized sandboxing solutions to support diverse deployment scenarios."
  canonical: "https://www.zenml.io/llmops-database/building-production-agent-infrastructure-with-claude-managed-agents"
  ogTitle: "Anthropic / Various: Building Production Agent Infrastructure with Claude Managed Agents - ZenML LLMOps Database"
  ogDescription: "Anthropic introduced Claude Managed Agents, a platform designed to address the infrastructure bottlenecks that prevent organizations from deploying increasingly capable AI agents at scale. The platform tackles key challenges including context management, memory, reliability, security, and observability that developers face when building production agent systems. By providing composable primitives for agent definition, sandboxed execution environments, session management, and event streaming, along with advanced features like multi-agent orchestration, outcomes-based iteration, persistent memory, and self-hosted sandboxes, Claude Managed Agents enables developers to build sophisticated agentic applications without managing the underlying infrastructure complexity. Partners including Cloudflare, Daytona, Modal, and Vercel contributed specialized sandboxing solutions to support diverse deployment scenarios."
notion:
  pageId: "37cf8dff-2538-805a-8c30-f7932ee2d57f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T11:43:00.000Z"
  lastEditedTime: "2026-06-11T11:43:00.000Z"
  publishedAt: "2026-06-11T12:13:40Z"
---

## Overview

This case study presents Anthropic's Claude Managed Agents platform, a comprehensive infrastructure solution for deploying and managing AI agents in production environments. The platform emerged from Anthropic's observation that as model capabilities have rapidly improved from Claude 3 through Opus 4 to Opus 4.7, the primary bottleneck preventing organizations from leveraging these advances has shifted from model intelligence to the surrounding infrastructure and operational concerns.

The presentation was delivered by Michael and Harrison, both members of technical staff at Anthropic working on the Claude Managed Agents team, along with partners from Cloudflare, Daytona, Modal, and Vercel. The case study illustrates how infrastructure complexity grows exponentially as agents become more capable and autonomous, necessitating platform-level solutions for problems that were previously manageable with simpler prompt-and-response patterns.

## The Evolution of Agent Capabilities

The team traced the rapid progression of agent capabilities over recent years. With Claude 3, agents could handle simple, short tasks like generating test functions, but required significant human steering and approval for each tool use. The introduction of Opus 4 and Claude Code enabled agents to drive entire features and create pull requests, though still with substantial human guidance throughout the process. With Opus 4.7, the capabilities leaped forward dramatically—developers reported clearing entire backlogs and waking up to merge-ready pull requests. Looking forward, the team anticipates agents accomplishing quarters worth of work within hours, such as executing complete merger and acquisition pipelines with swarms of coordinated agent teams.

This progression reveals a fundamental shift: as agents move from simple task execution to complex, long-running workflows, the infrastructure requirements change from basic prompt-plus-tool-use patterns to comprehensive task completion frameworks and agent infrastructure pipelines. The increasing autonomy and scope of agent work means they need access to more systems, credentials, and resources, creating new challenges around identity management, security, observability, and reliability.

## Core Infrastructure Challenges

Through research and conversations with developers building production agent systems, Anthropic identified three critical sticking points that Claude Managed Agents was designed to address.

First, context management and memory proved to be foundational but challenging primitives. When implemented correctly, these capabilities enable agents to perform remarkably well, but poor implementations can completely undermine agent effectiveness. The complexity lies in determining what information to retain, how to structure it for retrieval, and how to maintain context across sessions while managing token limits and costs.

Second, infrastructure concerns emerged as the number one barrier preventing developers from scaling with improved model intelligence. Production agent deployments require robust reliability to handle failures and retries gracefully, scalability to accommodate variable workloads, security to protect sensitive data and credentials, and acceptable latency for interactive experiences. These concerns multiply as agents become more autonomous and long-running, requiring sophisticated orchestration, resource management, and error handling.

Third, observability is essential for assessing and improving agent performance. Without visibility into what agents are doing and why, developers cannot determine whether agents are succeeding at their tasks or identify opportunities for optimization. Traditional logging and monitoring approaches designed for deterministic software often fall short for non-deterministic agent behaviors, requiring new paradigms for understanding agent decision-making and task progression.

## Platform Architecture and Core Primitives

Claude Managed Agents provides a composable set of primitives that developers can use to build agent applications without managing the underlying complexity. The platform is built around four key concepts: agents, environments, sessions, and event streams.

An agent is defined as a bundle of configuration that establishes the agent's identity and capabilities. This includes the system prompt that shapes the agent's behavior and goals, the specific model to use, the skills and tools the agent can access, permissions governing what resources the agent can interact with, and generally the complete identity of the entity taking actions. This declarative approach to agent definition separates configuration from execution, enabling versioning, testing, and iteration on agent behavior independently from the infrastructure.

Environments provide the sandboxed execution context where agents actually run. Giving agents access to a computer-like environment enables them to execute code, install packages, and interact with systems in ways that pure language model interactions cannot support. Each environment includes configurable network allow lists to control egress traffic for security, pre-installed packages to support specific use cases, and isolation boundaries to prevent interference between concurrent agent sessions.

Sessions represent individual instances of agent work. When a developer or end user kicks off a session, they ask the agent to complete some piece of work and then return when ready. Sessions have lifecycles that move through states like idle, running, and completed, with error recovery mechanisms to handle failures. The session abstraction enables asynchronous agent work that may span extended periods, with the ability to pause, resume, and even fork sessions to explore multiple approaches.

Event streams provide the observability layer for understanding what happens during a session. Every session produces a log of events capturing interactions between users and Claude as well as internal agent actions. Events are categorized into domains to clarify their meaning and enable selective processing.

User events represent inputs from end users or the platform to Claude Managed Agent sessions, including text messages, images, and documents sent to the agent, interruptions when users need to steer agents back on course, tool results for custom tools executed on the client side, confirmations for human-in-the-loop controls when tools require approval, and outcome definitions specifying goals for the agent to achieve.

Agent events capture everything Claude does during execution, including responding to users with messages, executing tools, and coordinating with other agents in multi-agent scenarios. These events provide visibility into the agent's reasoning and decision-making process.

Session events track the overall lifecycle, including status changes as sessions transition between states, error recovery information when Claude encounters problems, and outcome processing details when agents are working toward defined goals.

Span events make it easy to understand timing and duration of activities, such as when Claude begins writing a lengthy response or when long-running tool executions start and complete. This temporal information is crucial for performance optimization and user experience.

## Demonstration: Pascal Grocery Analytics Agent

The team demonstrated these concepts through Pascal, a fictitious agent responsible for analyzing grocery shopping habits. The demonstration showcased the integration between a custom application dashboard and Claude Managed Agents via the event stream API.

When the user clicked an "Analyze" button in the application dashboard, the system kicked off an agent session. The console view displayed the real-time event stream, showing tool runs, agent events, and other activities as they occurred. The right panel showed the agent definition, including the system prompt, model selection, and MCP tool configuration. The environment configuration displayed networking settings and installed packages within the container.

Because all this information is exposed via API, the custom application could surface agent activities directly in its own interface. Claude analyzed the data and returned insights, identifying that bananas were particularly popular among shoppers and that Sunday was the busiest shopping day to avoid for those wanting to skip crowds.

The demonstration then showed the agent performing predictive analysis, building probabilistic models of shopper behavior for future planning. To improve the agent over time, the user clicked an "Ask Claude" button, which triggered Claude to read the transcript of its own session and offer optimization suggestions. In this case, Claude identified that a Python script had run for over 20 seconds and suggested opportunities to optimize that runtime for better user experience.

This demonstration illustrated several LLMOps capabilities: the clean separation between agent definition and execution, real-time observability through event streams, integration patterns for embedding agents in custom applications, self-improvement through session analysis, and the importance of performance monitoring for production deployments.

## Developer Experience and Getting Started

Recognizing that developer experience is crucial for adoption, Anthropic provided multiple pathways for getting started with Claude Managed Agents. For developers using Claude Code, the tool ships with a built-in Claude API skill that understands managed agents and can assist with integration. A command-line interface enables seamless interaction with agents and sessions for those who prefer terminal-based workflows. For developers who want to see concrete examples, Anthropic provides cookbooks with copy-paste-ready code demonstrating integration patterns.

This multi-modal approach to developer onboarding reflects an understanding that different developers have different preferences and that reducing friction to getting started is essential for platform adoption.

## Advanced Features

Beyond the core primitives, Claude Managed Agents includes several advanced features designed to unlock more sophisticated use cases.

Multi-agent orchestration allows Claude to spawn other agent threads with independent context windows to delegate specialized work. Claude can pass messages back and forth between these spawned agents, enabling parallel work and specialization. This capability is essential for complex workflows that benefit from divide-and-conquer approaches, where different sub-agents handle different aspects of a larger task.

Outcomes provide a mechanism for defining rubrics or goal sets that Claude iteratively works toward. After completing an initial pass at a task, Claude triggers outcome grading and continues iterating in a loop until satisfied with the quality of its outputs. This outcomes-based approach shifts the interaction model from conversational back-and-forth to specification-driven task completion, where users define what success looks like and let the agent determine how to achieve it.

Memory enables Claude to improve over time by reading from and writing to long-lived memory stores. Each session can leverage learnings from previous sessions, making every interaction potentially better than the last. This persistent memory is crucial for agents that serve recurring needs or work within specific domains where domain knowledge accumulates over time.

Dreaming, announced as a research preview, allows Claude to reflect on and codify learnings from thousands of sessions simultaneously. This meta-learning capability enables agents to synthesize patterns across many interactions, produce new memories, edit existing ones, and ensure the quality of the memory store. The ability to learn at scale from aggregated experience represents a significant step toward agents that continuously improve through deployment.

## Self-Hosted Sandboxes

One of the major announcements covered in the presentation was self-hosted sandboxes, which address a critical need for enterprises with strict security and compliance requirements. This feature gives organizations the option to bring their own compute infrastructure to Claude, running agent tools within their own virtual private cloud rather than on Anthropic's infrastructure.

Self-hosted sandboxes enable organizations to keep private files, services, and packages within their own security perimeter. Organizations control network policies, audit logs, and the provisioning and idling of sandboxes. Claude Managed Agents simply sends signals when new sandboxes need to be provisioned because an agent needs to do work, but the actual execution happens on customer-controlled infrastructure.

Anthropic partnered with Cloudflare, Daytona, Modal, and Vercel to support self-hosted sandboxes out of the box, recognizing that organizations have diverse infrastructure preferences and existing relationships with compute providers. Each partner brings different strengths and architectural approaches to sandboxing.

Vercel built their infrastructure on a unified foundation they call fluid compute, where builds, sandboxes, and functions all run on the same primitive. This enables feature reuse, such as firewall capabilities for filtering traffic and injecting secrets that work consistently across different workload types. The flexibility of this approach means the same primitive can be called from a function into a sandbox and vice versa.

Modal focuses on scale and speed, with a custom scheduler capable of spinning up hundreds of thousands of sandboxes within minutes. Operating in every major cloud region, Modal provides low-latency access for geographically distributed use cases. The platform was designed around flexibility, with capabilities for persistent volumes, custom images, and notably GPU sandboxes for AI workloads that require accelerated compute.

Daytona was built from the ground up around the principle that agents need what humans need. While early sandboxing focused primarily on code execution, Daytona recognized that agents would require different sizes and specifications of CPU, RAM, and memory, different operating systems, and both CPUs and GPUs—essentially everything humans need to get their jobs done. The difference is that agents require these capabilities at extreme speed and scale, with operations like pausing, resuming, and forking to enable agents to explore multiple potential outcomes.

Cloudflare takes a bet on two different sandboxing primitives. Micro VMs provide everything a developer has, enabling agents to run CLI tools, compile code, and perform any developer activity. But Cloudflare also offers isolates, a different sandboxing technology designed for massive scale. As the price of intelligence drops and more agents run at high capability levels, Cloudflare anticipates compute constraints becoming binding. Isolates spin up in milliseconds and enable multiple tenants to run in a single process while maintaining isolation, providing a more lightweight alternative to micro VMs for workloads where full VM capabilities aren't required.

The diversity of these approaches reflects the breadth of use cases for production agents, from development automation to account management to research and analytics. Organizations can choose the sandboxing approach that best fits their security posture, performance requirements, and cost constraints.

## MCP Tunnels

The other major feature announcement was MCP Tunnels, currently in research preview. This capability addresses the challenge of exposing private MCP servers directly to Claude via managed agents without exposing anything over the public internet.

Many organizations have internal services and data that agents need to access but that cannot be exposed publicly for security reasons. MCP Tunnels provides a secure tunnel mechanism where organizations expose a basic proxy layer to Anthropic's MCP Tunnels service, enabling their network infrastructure to speak directly with Claude through the tunnel. This approach maintains security boundaries while providing agents with access to the tools and data they need to accomplish their work.

The combination of self-hosted sandboxes and MCP Tunnels gives organizations fine-grained control over where computation happens and how agents access resources, addressing two of the most significant barriers to production agent deployment in enterprise environments.

## Partner Perspectives on Production Agent Challenges

The panel discussion with partners provided valuable insights into the challenges of running agents at scale and how assumptions break when the traffic source shifts from humans to agents.

Authentication and authorization emerge as particularly thorny problems. If a human user has permission to perform an action, should an agent acting on their behalf automatically inherit that permission? Should there be distinctions between human and agent permissions? When an agent creates another agent that creates additional resources, how should identity and permissions propagate down the chain? These questions don't have universal answers and require careful thought about security models.

Storage and state management become more complex with agents. The ability to pause a task and resume it later requires preserving execution state in ways that traditional request-response APIs don't address. As Akshat from Modal noted, the design space for persistent storage in agent contexts is vast, with opportunities for sub-agents to fork off from current state, time travel to visit previous states, and agents to reify their own code by updating deployed endpoints based on what works in practice.

Network egress filtering and data access controls take on new importance when agents operate autonomously. Organizations need to ensure agents only access appropriate data and services, with audit trails for accountability. Getting every service to speak the same authentication language and understand agent identities remains a significant integration challenge.

Mike from Cloudflare emphasized that while infrastructure scaling has challenges, security concerns often present the biggest barrier to production deployment. It's relatively easy to spin up internal agent platforms where employees can experiment, but deploying agents that handle customer data or production systems requires robust security at every layer.

Luke from Vercel highlighted how resume-ability of tasks and the shift from synchronous to asynchronous work patterns require rethinking many assumptions. Agents excel at executing plans autonomously but lack the human ability to collaborate and pivot when plans need to change. The current harnesses for agent work are still largely single-player, and the industry needs to develop better patterns for agent collaboration.

Yvan from Daytona described the concept of continuous learning that some customers are implementing: agents process new data daily, weekly, or monthly, running reinforcement learning on that data so that models become progressively more intelligent over time. This creates a flywheel effect where deployed agents generate data that improves subsequent versions.

The panel also discussed use cases that became possible only recently. The idea of a "human emulator"—an agent that can accomplish any task a digital knowledge worker can—becomes realistic when agents have access to sandboxes where they can install applications, access legacy systems, and work through desktop interfaces when APIs aren't available. This vastly expands the scope of automatable work.

## Implications for LLMOps Practice

Claude Managed Agents represents a significant development in LLMOps tooling because it addresses the full stack of concerns for production agent deployment. Several themes emerge that have broad implications for the field.

The platform demonstrates that as models become more capable, infrastructure becomes the binding constraint rather than model intelligence. This suggests that LLMOps tooling and practices will become increasingly critical competitive differentiators, similar to how DevOps practices and tooling became essential for web application development.

The emphasis on composable primitives rather than monolithic frameworks reflects a maturation of the space. Developers have diverse use cases and existing architectures, so providing building blocks that can be assembled in different ways proves more valuable than prescriptive end-to-end solutions. This modularity also enables the ecosystem of partners to contribute specialized capabilities where they have unique strengths.

The event stream architecture provides a model for observability in non-deterministic systems. By categorizing events into domains and making them available for real-time streaming and retrospective analysis, the platform enables both operational monitoring and continuous improvement. The demonstration of Claude analyzing its own session transcript to identify optimization opportunities hints at future capabilities where systems become self-optimizing.

The shift toward outcome-oriented agent interactions, where users specify goals rather than steps, requires new evaluation frameworks. Traditional testing approaches that verify specific behaviors give way to outcome-based evaluation that assesses whether goals were achieved, even if the path to achievement differs from expectations. This aligns with the outcomes feature but also represents a broader shift in how we think about correctness in AI systems.

Security and identity management emerge as first-class concerns requiring platform-level solutions. The questions raised by partners about permission inheritance, egress filtering, and cross-service authentication indicate that these challenges require industry-wide standards and protocols rather than point solutions. The work on MCP Tunnels and integration with identity providers represents steps toward those standards.

The partnership model with infrastructure providers acknowledges that no single company can address all deployment contexts. By building integration points and working with partners who have different strengths, Anthropic enables broader adoption while focusing on their core competencies around model capabilities and agent orchestration.

## Critical Perspective and Limitations

While Claude Managed Agents addresses real infrastructure challenges, several considerations warrant attention. The platform is a product offering from Anthropic, and the presentation naturally emphasizes capabilities and benefits while giving less attention to limitations or tradeoffs.

The reliance on Anthropic's platform creates vendor lock-in concerns. While the composable primitives and event stream APIs theoretically enable migration to other platforms, significant integration work ties applications to Claude-specific capabilities. Organizations adopting Claude Managed Agents should consider exit strategies and abstraction layers that could enable multi-provider approaches.

The rapid pace of capability improvements creates both opportunities and challenges. Features like dreaming and outcomes-based iteration are in research preview, indicating they may not be production-ready for all use cases. Organizations building on these features should have fallback approaches if capabilities change or prove less reliable than anticipated.

Security and privacy concerns remain even with self-hosted sandboxes and MCP Tunnels. Organizations are still sending prompts, context, and potentially sensitive data to Anthropic's models. While self-hosted sandboxes keep execution within organizational boundaries, the coordination and model inference still involve Anthropic's infrastructure. For highly regulated industries or situations involving particularly sensitive data, additional safeguards may be necessary.

The complexity of multi-agent orchestration, persistent memory, and outcomes-based evaluation introduces new failure modes. When a single agent misbehaves, the impact is contained, but when agent swarms coordinate or when memories persist across sessions, errors can compound. The platform provides observability tools, but developing expertise in debugging these complex interactions will take time and experience.

Cost considerations weren't discussed in the presentation. Running agents with sandboxed environments, persistent memory, and potentially large context windows could become expensive at scale. Organizations should model costs carefully and implement monitoring to prevent runaway expenses from agents that execute longer than expected or spawn excessive sub-agents.

The partner testimonials, while providing valuable technical perspectives, should be understood as representing companies with commercial relationships with Anthropic. Their enthusiasm for the platform is genuine but also serves their business interests in promoting their sandboxing solutions.

Despite these considerations, Claude Managed Agents represents a meaningful contribution to production AI infrastructure. The challenges it addresses—context management, infrastructure complexity, observability—are real barriers that many organizations face. By providing platform-level solutions rather than requiring every team to build their own infrastructure, Anthropic enables developers to focus on application-level concerns while leveraging battle-tested primitives for the underlying complexity.
