---
title: "Building General Purpose AI Agents with Agent Harnesses and Tool Runtimes"
slug: "building-general-purpose-ai-agents-with-agent-harnesses-and-tool-runtimes"
draft: false
llmopsTags:
  - "code-generation"
  - "customer-support"
  - "poc"
  - "data-analysis"
  - "document-processing"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "rag"
  - "few-shot"
  - "error-handling"
  - "token-optimization"
  - "langchain"
  - "docker"
  - "kubernetes"
  - "open-source"
  - "security"
  - "guardrails"
  - "databases"
  - "orchestration"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "anthropic"
  - "openai"
  - "microsoft-azure"
  - "google-gcp"
  - "harness-engineering"
industryTags: "tech"
company: "Langchain / Arcade"
summary: "LangChain and Arcade collaborated to demonstrate how general-purpose AI agents can be built for enterprise deployment by combining two critical components: an agent harness (like LangChain's Deep Agents) that provides the scaffolding for LLM-powered agents to interact with file systems and execute code, and a secure tool runtime (like Arcade) that handles authentication, authorization, and integration with over 8,000 third-party services. The solution addresses the gap between single-user coding agents running locally and multi-user enterprise agents that require proper security controls, delegated authorization, and the ability to perform actions as specific users across multiple services. The approach enables organizations to deploy agents that can handle complex workflows like flight booking, email management, and LinkedIn recruiting while maintaining enterprise-grade security and compliance requirements."
link: "https://www.youtube.com/watch?v=OYK1-vCbSMU"
year: 2026
seo:
  title: "Langchain / Arcade: Building General Purpose AI Agents with Agent Harnesses and Tool Runtimes - ZenML LLMOps Database"
  description: "LangChain and Arcade collaborated to demonstrate how general-purpose AI agents can be built for enterprise deployment by combining two critical components: an agent harness (like LangChain's Deep Agents) that provides the scaffolding for LLM-powered agents to interact with file systems and execute code, and a secure tool runtime (like Arcade) that handles authentication, authorization, and integration with over 8,000 third-party services. The solution addresses the gap between single-user coding agents running locally and multi-user enterprise agents that require proper security controls, delegated authorization, and the ability to perform actions as specific users across multiple services. The approach enables organizations to deploy agents that can handle complex workflows like flight booking, email management, and LinkedIn recruiting while maintaining enterprise-grade security and compliance requirements."
  canonical: "https://www.zenml.io/llmops-database/building-general-purpose-ai-agents-with-agent-harnesses-and-tool-runtimes"
  ogTitle: "Langchain / Arcade: Building General Purpose AI Agents with Agent Harnesses and Tool Runtimes - ZenML LLMOps Database"
  ogDescription: "LangChain and Arcade collaborated to demonstrate how general-purpose AI agents can be built for enterprise deployment by combining two critical components: an agent harness (like LangChain's Deep Agents) that provides the scaffolding for LLM-powered agents to interact with file systems and execute code, and a secure tool runtime (like Arcade) that handles authentication, authorization, and integration with over 8,000 third-party services. The solution addresses the gap between single-user coding agents running locally and multi-user enterprise agents that require proper security controls, delegated authorization, and the ability to perform actions as specific users across multiple services. The approach enables organizations to deploy agents that can handle complex workflows like flight booking, email management, and LinkedIn recruiting while maintaining enterprise-grade security and compliance requirements."
notion:
  pageId: "33df8dff-2538-8092-a593-c5610c2de0ed"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-09T17:53:00.000Z"
  lastEditedTime: "2026-04-09T17:53:00.000Z"
  publishedAt: "2026-04-09T18:00:36Z"
---

## Overview

This case study presents a comprehensive framework for building and deploying general-purpose AI agents in production environments, drawing from the collaborative work between LangChain and Arcade. Harrison Chase, co-founder and CEO of LangChain, and Sam Parr, CTO and co-founder of Arcade, presented their approach to creating agents that move beyond single-user coding assistants to become enterprise-ready systems capable of serving entire organizations. The fundamental thesis is that coding agents serve as the foundation for general-purpose agents because they establish patterns around file system interaction, workspace management, and iterative task execution that can be extended to broader applications.

The presentation delineates two critical architectural components that must work together: the agent harness, which provides the scaffolding and environment for the LLM to operate, and the tool runtime, which handles the complex challenges of multi-user authentication, authorization, and third-party service integration. This separation of concerns allows for specialized optimization of each layer while maintaining clean interfaces between them.

## Agent Harness Architecture

The agent harness represents more than just an LLM running in a loop calling tools. It encompasses the complete scaffolding that enables an agent to interact meaningfully with its environment. LangChain's Deep Agents implementation exemplifies this approach by providing batteries-included functionality that goes well beyond basic agent frameworks.

At the core of the agent harness is the file system abstraction. Deep Agents implements six primary file system operations: list, read, write, edit, glob, and grep. This design choice reflects lessons learned from successful coding agents like Claude Code, which relies heavily on file system interactions. However, Deep Agents introduces a critical innovation through pluggable backends. Unlike traditional coding agents that operate directly against the local file system, Deep Agents can use either a real file system or a virtual file system backed by a database. This abstraction serves multiple purposes: it enables agents to run in remote sandboxed environments, it provides better control over agent operations, and it allows agent definitions themselves to be stored as files within the system.

The representation of agents as files proves particularly powerful. An agent can be defined through an agent.md file containing instructions, skill definitions, and an mcp.json configuration file. This file-based approach means that agents can introspect and modify their own definitions, creating a pathway for agents to evolve and adapt based on their experiences. The Agent Builder product leverages this capability to allow users to create and modify agents through natural language conversation, with the system translating those conversations into modifications of the underlying agent definition files.

Planning capabilities are embedded directly into the agent harness. Deep Agents includes a planning tool that prompts the LLM to generate a plan, placing that plan into the context window. While the plan might not be persisted to disk in all implementations, the act of planning serves to structure the agent's thinking and inform subsequent generations. This approach balances the need for structured planning against the risk of agents becoming rigidly bound to outdated plans.

Sub-agents represent another critical harness feature, enabling context isolation and parallel execution. When a main agent spawns a sub-agent, that sub-agent receives only the specific task at hand without access to the broader context of the main agent's work. The sub-agent's intermediate steps and reasoning remain invisible to the main agent, which sees only the final result. This isolation serves several purposes: it prevents context window bloat, it enables parallel execution of multiple focused tasks, and it creates clearer boundaries for error handling. However, this isolation also introduces communication challenges. The main agent must be specific in its instructions to sub-agents, and sub-agents must return appropriately formatted results. Communication breakdowns in either direction can cause the overall system to fail.

Skills provide a mechanism for packaging instructions and tools together in a discoverable way. Most coding agent implementations support skills, and Deep Agents follows this pattern. Skills allow agents to incrementally expand their capabilities without requiring modifications to the core harness.

Context management emerges as a crucial operational concern in production agents. Deep Agents implements several strategies for preventing context window overflow. When tools return large results, the system offloads those results to files, showing the agent only the first 100 lines along with information about where to find the complete data. This approach gives the agent control over how much detail it examines while preventing automatic context window saturation. 

The compaction mechanism activates when the context approaches the model's limits. Rather than simply truncating history, Deep Agents saves all original messages to the file system where they remain accessible if needed. The system provides agents with the ability to trigger compaction manually, furthering the philosophy of giving LLMs more direct control over their own context management.

Human-in-the-loop capabilities integrate deeply into the harness through LangGraph's infrastructure. Deep Agents exposes configuration options that allow system designers to specify which tools should interrupt for approval before execution. This becomes particularly important for tools with write operations or other potentially destructive actions.

Deep Agents builds on top of LangGraph, which itself evolved from the original LangChain framework. LangChain began as an agent framework focused on abstractions and integrations. LangGraph emerged as a lower-level runtime providing infrastructural capabilities like durable execution, streaming, human-in-the-loop controls, and persistence. Deep Agents sits atop this stack as the agent harness layer with batteries-included features specifically designed for production agent deployment.

## Tool Runtime and Enterprise Security

While the agent harness handles the local computational environment, the tool runtime addresses the fundamentally different challenge of secure, multi-user access to external services. Arcade's tool runtime exemplifies the infrastructure needed to deploy agents in enterprise environments where security, compliance, and proper authorization become paramount concerns.

The core problem stems from the limitations of traditional authentication patterns when applied to agents. Service tokens represent one common but flawed approach. A service token typically suffers from either being over-privileged, creating unacceptable security risks that prevent enterprise adoption, or being under-privileged, rendering the agent insufficiently useful. User tokens present different but equally serious problems. Storing user tokens in environment variables for local MCP servers creates credential exposure risks. Even when properly secured, user tokens grant excessive privileges when handed directly to agents.

Arcade's solution centers on delegated agent authorization. Rather than giving an agent a user's full token for a service, the system maintains a subset of permissions specifically authorized for that agent, for that user, at that particular time. This approach mirrors the security model enterprises have successfully used for web applications with OAuth and identity providers, but extends it to handle agents as intermediaries between users and services.

The implementation requires careful attention to both authentication and authorization layers. Authentication confirms user identity, often through integration with enterprise single sign-on systems. Authorization determines which specific actions the agent can perform on behalf of that user. Critically, these operate as separate gates. A user might successfully authenticate to the agent system but still lack authorization to access certain data or perform certain operations.

The delegated authorization model allows extremely granular control. Tool definitions in Arcade specify exact permission scopes required for each operation. Before executing any tool, the runtime verifies that the current user has explicitly granted those specific permissions to the agent. This creates an audit trail showing exactly which user authorized which agent to perform which action at which time.

Contextual access control extends this model to integrate with existing enterprise systems. Organizations often have established role-based access control systems, personally identifiable information handling policies, or legacy Kerberos authentication. Arcade's pre- and post-execution hooks allow these existing systems to be incorporated into the agent authorization flow without requiring wholesale replacement of enterprise infrastructure.

Secret management receives special treatment in the tool runtime. Rather than expecting developers to place secrets in environment variables, the system provides a structured secret store. Tool definitions reference secrets by name, and those secrets can be scoped to organizations, projects, or individual users. The runtime injects secrets at execution time without exposing them in the agent's context.

The distinction between acting for a user versus acting as a user proves significant. When an agent sends an email, for example, acting as the user means the email appears to come from that user rather than from a generic bot account. This preserves normal organizational workflows and audit trails while enabling automation.

Arcade's architecture includes a registry for managing the complex web of tools, services, and authorizations. With over 8,000 tools available, discovery and management become non-trivial challenges. The registry tracks which tools exist, which permissions they require, which users have authorized which agents for which tools, and how to revoke access when needed.

The gateway functionality deserves particular attention as it represents a practical solution to a common deployment challenge. Organizations often need to combine multiple MCP servers into a unified interface. Arcade's gateway allows administrators to select specific tools from various sources, configure them appropriately, and serve them as a single MCP server endpoint. This composed endpoint can then be referenced by agent harnesses like Deep Agents, Claude Code, or other compatible systems.

## Integration and Production Deployment

The integration between LangChain's Deep Agents and Arcade's tool runtime demonstrates how these components work together in production. Deep Agents can reference Arcade's gateway through a simple URL configuration, gaining immediate access to thousands of tools with proper security controls. The agent harness remains responsible for planning, file system operations, context management, and orchestration. The tool runtime handles authentication, authorization, secret injection, and actual tool execution.

Agent Builder represents the productization of this integrated approach. Rather than requiring users to write code or configure complex systems, Agent Builder provides a conversational interface for creating and evolving agents. The system leverages the file-based agent representation to translate natural language conversations into agent modifications. Users can create specialized agents from templates, including email assistants, LinkedIn recruiters, and social media managers.

The email assistant exemplifies a practical production deployment. Rather than checking email directly, users interact with an agent that processes emails on their behalf. The agent has access to email reading and writing tools through Arcade's runtime, ensuring proper authorization while maintaining the ability to act as the user. Human-in-the-loop controls prevent the agent from sending emails without approval, balancing automation with oversight.

Event-triggered agents represent an important pattern for production deployments. Rather than requiring users to actively engage with agents, these systems run continuously in the background, monitoring for relevant events and taking action when appropriate. When agents encounter situations requiring human input, they push notifications to users rather than waiting for users to check on them. This ambient computing model aligns with how people actually want to work with automated systems.

The concept of agent identity versus user identity emerges as a significant architectural question. Some agent deployments use pass-through credentials, where the agent always operates with the credentials of the current user. Other deployments give agents their own identities, complete with their own credentials and memory. The latter approach enables agents to maintain persistent state and capabilities independent of any single user, though it introduces new questions about how to manage agent permissions and behavior.

## Operational Considerations and Challenges

Production deployment of agents surfaces numerous operational challenges beyond the core technical architecture. Model quality directly impacts agent effectiveness. While the infrastructure supports various LLM providers, agents require models sophisticated enough to effectively use the tools available to them. OpenAI and Anthropic models currently provide the best performance for complex agent tasks. Open-source alternatives show promise but generally exhibit degraded performance when compared to frontier models.

Deployment topology varies based on organizational requirements. Some enterprises require complete on-premises deployment within their own VPCs for data governance reasons. The Deep Agents and Arcade architecture supports this deployment model, though organizations must ensure their chosen LLM provider also meets their data residency requirements.

Permission management in practice proves complex. The presentation highlighted a real-world scenario where a manager needed to execute an Ansible playbook that required permissions belonging to a team member on vacation. Traditional service tokens fail in this scenario because they lack the specific permissions. User tokens fail because the required user isn't available. The solution requires step-up authorization flows that allow temporary delegation of specific permissions with proper audit trails. Implementing these flows requires careful integration with enterprise identity systems and entitlement management.

Revocation represents another critical operational requirement. When employees leave organizations or when compromises are detected, all tokens and authorizations associated with that identity must be immediately revocable. This requires the tool runtime to check authorization status on every operation rather than caching decisions.

Security boundaries between the harness and runtime serve important purposes. The harness controls what the agent can do within its local environment, including file system operations and code execution. The runtime controls what the agent can do in the external world. Neither layer can bypass the security controls of the other, creating defense in depth.

## Performance and Reliability Patterns

Context window management emerges as a critical performance consideration. Naive agent implementations quickly exhaust available context through verbose tool outputs and accumulated history. The strategies implemented in Deep Agents demonstrate several patterns for managing this constraint. Offloading large results to files keeps them available without consuming context. Compaction preserves history in accessible storage while freeing context for new information. Giving agents explicit control over their context through tool access to history files enables more sophisticated context management strategies.

Sub-agent parallelization offers significant performance benefits for complex tasks. By spawning multiple focused sub-agents to work on independent subtasks, the system can leverage concurrent execution. However, this requires careful orchestration to avoid resource contention and to properly aggregate results.

The file system abstraction enables several reliability patterns. By virtualizing the file system through database backing, the system can provide durability guarantees, snapshots, and rollback capabilities that wouldn't exist with direct file system access. This becomes particularly valuable when agents make mistakes or when debugging unexpected behavior.

## Ecosystem and Standardization

The presentation references the Model Context Protocol extensively as an emerging standard for tool integration. MCP servers provide a standardized interface for exposing tools to agents, enabling interoperability across different agent harnesses. However, MCP alone doesn't solve the enterprise authorization challenges that Arcade's runtime addresses. The combination of MCP for tool interface standardization and Arcade's runtime for security and multi-user support represents a more complete solution.

Skills represent another standardization effort, providing a common format for packaging tools and instructions together. The widespread adoption of skills across different coding agent implementations suggests this pattern addresses real needs in agent development.

The convergence toward similar architectural patterns across multiple agent implementations indicates emerging best practices. File system access, code execution, planning tools, sub-agents, and context management strategies appear consistently across successful agent systems. This convergence reduces the risk of building on these patterns while suggesting areas where differentiation matters less.

## Evolution and Future Directions

The progression from LangChain to LangGraph to Deep Agents illustrates the evolution of understanding about what agents need in production. Initial frameworks focused on abstractions and making it easy to experiment. Runtime infrastructure emerged to address durability, streaming, and state management. Agent harnesses represent the next layer, providing opinionated but flexible implementations of common patterns.

The distinction between coding agents and general-purpose agents continues to blur. The core insight that coding agents establish patterns applicable to broader agent applications appears validated by implementations like Agent Builder. File systems, workspaces, code execution, and tool calling form a foundation that generalizes beyond software development tasks.

The question of agent identity versus user identity remains unsettled. Different use cases appear to benefit from different approaches. Pass-through credentials work well for personal productivity agents that simply automate user actions. Agent identities make more sense for autonomous systems that maintain long-running state and operate semi-independently. The infrastructure must support both models.

Interface design for agent interaction represents an ongoing area of exploration. While developers may be comfortable with terminal interfaces, broader adoption requires more accessible interfaces. The conversational approach used in Agent Builder and similar systems shows promise, though questions remain about the right modalities for different types of agent interactions.

The integration of multiple MCP servers through gateway patterns suggests a future where organizations curate collections of tools tailored to their specific needs and security requirements. Rather than agents having access to all possible tools, organizations can compose specific tool sets that balance capability with risk.

Ambient computing patterns, where agents run continuously in the background and push relevant information or requests to users, appear increasingly important for practical deployments. This requires robust event handling, proper notification systems, and clear user interfaces for managing agent activity and responding to agent requests.

The challenges around model quality and open-source alternatives highlight an ongoing dependency on frontier model providers. While the infrastructure supports various models, the agent capabilities remain constrained by model quality. Continued improvement in open-source models could significantly impact deployment patterns and total cost of ownership for production agent systems.
