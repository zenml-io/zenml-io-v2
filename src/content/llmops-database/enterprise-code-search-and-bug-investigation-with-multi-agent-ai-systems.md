---
title: "Enterprise Code Search and Bug Investigation with Multi-Agent AI Systems"
slug: "enterprise-code-search-and-bug-investigation-with-multi-agent-ai-systems"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "question-answering"
  - "summarization"
  - "document-processing"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "embeddings"
  - "rag"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "harness-engineering"
  - "memory"
  - "mcp"
  - "chunking"
  - "system-prompts"
  - "error-handling"
  - "langchain"
  - "postgresql"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "fastapi"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "google-gcp"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Wix"
summary: "Wix developed two interconnected AI systems to address the challenge of searching and understanding code across thousands of repositories and services in a large organization. The first system, OctoCode, is an MCP-based tool with 90,000 downloads and 5,000 weekly active users that helps developers search repositories, understand dependencies, and navigate complex codebases. The second system, Bilbo, is an enterprise service that orchestrates multiple AI agents to investigate bugs and perform deep research across the organization's technical stack, integrating with GitLab, databases, logs, documentation, and other internal systems. Both systems employ sophisticated prompt engineering, context management, sub-agent architectures, and custom tooling protocols to handle the complexity of enterprise-scale code search and investigation while managing token limits and maintaining response quality."
link: "https://www.youtube.com/watch?v=T3pJz1Nwt1Y"
year: 2026
seo:
  title: "Wix: Enterprise Code Search and Bug Investigation with Multi-Agent AI Systems - ZenML LLMOps Database"
  description: "Wix developed two interconnected AI systems to address the challenge of searching and understanding code across thousands of repositories and services in a large organization. The first system, OctoCode, is an MCP-based tool with 90,000 downloads and 5,000 weekly active users that helps developers search repositories, understand dependencies, and navigate complex codebases. The second system, Bilbo, is an enterprise service that orchestrates multiple AI agents to investigate bugs and perform deep research across the organization's technical stack, integrating with GitLab, databases, logs, documentation, and other internal systems. Both systems employ sophisticated prompt engineering, context management, sub-agent architectures, and custom tooling protocols to handle the complexity of enterprise-scale code search and investigation while managing token limits and maintaining response quality."
  canonical: "https://www.zenml.io/llmops-database/enterprise-code-search-and-bug-investigation-with-multi-agent-ai-systems"
  ogTitle: "Wix: Enterprise Code Search and Bug Investigation with Multi-Agent AI Systems - ZenML LLMOps Database"
  ogDescription: "Wix developed two interconnected AI systems to address the challenge of searching and understanding code across thousands of repositories and services in a large organization. The first system, OctoCode, is an MCP-based tool with 90,000 downloads and 5,000 weekly active users that helps developers search repositories, understand dependencies, and navigate complex codebases. The second system, Bilbo, is an enterprise service that orchestrates multiple AI agents to investigate bugs and perform deep research across the organization's technical stack, integrating with GitLab, databases, logs, documentation, and other internal systems. Both systems employ sophisticated prompt engineering, context management, sub-agent architectures, and custom tooling protocols to handle the complexity of enterprise-scale code search and investigation while managing token limits and maintaining response quality."
notion:
  pageId: "363f8dff-2538-8094-adf3-fb9391618111"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-17T13:14:00.000Z"
  lastEditedTime: "2026-05-17T13:14:00.000Z"
  publishedAt: "2026-05-17T15:38:25Z"
---

## Overview

This case study describes Wix's implementation of production AI systems for enterprise code search and automated bug investigation. The presentation covers two main systems developed over approximately 11 months: OctoCode, a developer-facing search tool, and Bilbo, an enterprise research service that orchestrates multiple AI agents to investigate bugs and technical issues across Wix's massive codebase and infrastructure.

The fundamental challenge addressed is that in large organizations with thousands of repositories, thousands of developers each using their own AI assistants, and millions of users, finding specific information becomes extremely difficult. Standard AI agents struggle with this complexity because they tend to find the first match, make textual connections without deeper understanding, and can get lost in extremely large contexts. The solution involved building custom agent architectures with sophisticated context management, specialized tooling protocols, and multi-agent orchestration.

## OctoCode: The Foundation

OctoCode began as a personal project to solve everyday questions developers face: which repository handles checkout, what happens if I change a user attribute, who owns what service, and similar organizational knowledge questions. The tool was built using MCP (Model Context Protocol) and has grown to approximately 90,000 downloads with 5,000 weekly active users and 4,500 weekly downloads as of the presentation.

The core philosophy behind OctoCode is that agents need to understand what to do through proper context. When agents start guessing, they rely on statistical token prediction with attention mechanisms, but good context leads to good results while poor context results in high token consumption and poor quality. The developer emphasized that context is everything, and the entire system is built around optimizing context at every stage.

## OctoCode Architecture and Design Principles

The general flow of OctoCode involves receiving a task and context, having the agent understand which tool to use, evaluating whether the returned data is relevant, and deciding whether to call another tool or finish. Several key enhancements were made to this basic flow:

The system allows agents to send multiple parallel calls within a single tool invocation, implements caching mechanisms, and enforces structured reasoning at every tool call. When calling a tool, the agent must explain why it's calling that tool and what its goal is. This forces the agent to think about multiple branches in parallel and approach problems from different angles.

A critical innovation is the response handling mechanism. When a tool returns a response, the system provides hints to the agent about what to do next based on the context, and enables pagination on data. This helps agents think about what they need from the data itself and prevents them from making assumptions. For example, if a search returns no results, the system can suggest the agent try searching semantically for something similar, eliminating the need for a separate vector database while achieving similar results.

## Prompt Engineering and Tool Design

Despite claims that prompt engineering is becoming less important, the developer found this to be false in practice. The description, schemas, and instruction fields in MCP are crucial for explaining to agents what to do. Each MCP bundle contains multiple tools with schemas defining inputs and outputs, plus descriptions that tell the agent when to use each tool.

At every tool call, the system forces the agent to add reasoning and the goal for calling that tool. This isn't just about making a tool available but asking the agent to explain to itself why it's taking this action. The system can also instruct the agent to check multiple things, encouraging parallel exploration of different solution paths.

Tool responses include two important features: hints about what to do next based on the context, and the ability to perform pagination on data. A concrete example: when searching across Wix for something related to billing that returns no results, the system provides a hint to try searching semantically for something similar rather than requiring a vector database.

## OctoCode Tool Ecosystem

OctoCode integrates multiple tool categories:

**GitLab Integration**: Comprehensive tools for searching repositories, understanding service relationships, finding real dependencies, and navigating the organizational structure. The focus is specifically on search rather than actions on Git itself.

**Local Tools**: Similar capabilities for local Linux environments, including LSP integration and package file analysis.

**Package Management**: Tools like npm integration that can quickly identify where a package's repository is located rather than requiring extensive GitLab searches that might hit rate limits.

**Skills System**: Pre-built workflows like pull request review that explain to the agent how to use OctoCode's tools to accomplish specific tasks. For example, the review skill can analyze a React pull request by fetching different parts with pagination and providing comprehensive reviews.

**Research Capabilities**: A research skill that can find and summarize the best repositories on a topic, which the developer personally uses for learning by examining trending repositories and their implementations.

**Brainstorming**: A skill that activates multiple agents that converse with each other to explore different perspectives on a problem.

## From OctoCode to Bilbo: Enterprise Scale

The lessons learned from OctoCode informed the development of Bilbo, named after a marketing discussion that moved away from the original name "cache." Bilbo serves as the research service for Wix's Gandalf system, which handles the workflow of identifying and fixing issues that the presenter's colleague Israel discussed earlier in the event.

Bilbo addresses organizational-level problems: thousands of services, thousands of developers each with their own AI assistants pushing code, and millions of users generating activity. Finding specific information in this environment requires sophisticated orchestration.

## Bilbo Architecture

Bilbo is designed to serve multiple user types:

- **Services**: Primarily Gandalf, which uses Bilbo for automated investigation
- **Human Users**: Through a custom UI for direct queries
- **Other Agents**: An API that allows other AI agents to interact with Bilbo's research capabilities

The high-level architecture involves a query or issue description entering the system, which flows to a Planner component. The Planner performs initial investigation and sends structured requests to a Research component, which then produces output. This is a simplified view of a more complex underlying system.

### The Planner Component

The Planner's role is to take a research request and break it down. It performs several critical functions:

- **Intent Understanding**: Determining what the request is actually asking for
- **Output Schema Definition**: Understanding what structure the output should take and any context received with the request
- **Initial Search**: Performing preliminary searches in documentation, with access to Jira (including analyzing images in tickets by sending them to vision models to understand context), and access to the memory system

The Planner then sends its structured output to the Research agent with the research goal, context, and all necessary information to begin intelligent searching.

### The Research Agent

The Research agent is described as a "full orchestrator" with multiple capabilities:

**Tool Access**: 
- OctoCode for code-to-code search
- Runtime systems that understand all services in Wix
- Grafana logs and errors
- Trino database access
- Jira documentation
- Experiments data
- Essentially everything the agent needs to investigate issues

**Sub-Agent Architecture**: The Research agent coordinates multiple helper agents that search in parallel across the organization. This architectural decision addresses two critical constraints:

- **Context Window Limitations**: Each sub-agent maintains its own focused context rather than overwhelming a single agent's context window
- **Latency and Quality**: Parallel execution improves speed while maintaining focused, high-quality contexts for each search domain

For example, a database-focused sub-agent has all database tools and fills its context primarily with database-related searches and results. When the main orchestrator needs specific information about a user or event, it can request just that information in the most refined form rather than having the sub-agent's entire search history pollute the main context.

**Adaptive Agents**: A particularly interesting feature is dynamic sub-agent creation. For very long searches that risk getting stuck or taking too much time, the system can create sub-agents with dynamic tool combinations. For instance, if a task requires Grafana, code search, and database access, instead of calling three separate helper agents, the system can spawn a single sub-agent with exactly those three tool sets.

### Unified Tool Protocol

A critical design decision was implementing a unified protocol across all tools in Bilbo. Rather than having agents learn different interaction patterns for different tools, every tool follows the same protocol:

- When calling a tool, the agent must explain why it's searching and what its goal is
- When the tool returns a response, it tells the agent what it can do next
- All tools support pagination and context-aware hints

This unified approach has several benefits:

- Agents don't need to understand how to use each individual tool differently
- The common language reduces the mathematical complexity of determining what to do next
- Improvements to the protocol benefit all tools simultaneously
- Developers using the same tools in their own agents benefit from improvements

The protocol mirrors the approach used in OctoCode, with reasoning requirements, parallel execution capabilities, hints, and pagination support built into every tool interaction.

## Memory and Learning System

Bilbo implements a sophisticated memory system using vector databases to enable learning from previous research:

**Process Flow**:
- When research completes and produces output, the system takes the query, plan, full schema of the planning, and output
- This information is sent to another LLM that organizes it properly, determining how to chunk the information and generate embeddings
- Everything is stored in a vector database (Wix uses Vectara)
- On the next similar request, this context is provided to the Planner as hints

**Benefits**:
- Each research task teaches subsequent research on related topics
- The system builds organizational knowledge over time
- Agents can leverage past successful investigations to improve future ones

**Self-Review Mechanism**: Beyond learning from results, the system asks agents to review their own performance:
- Which tools worked well and which didn't
- Which instructions were good and which were less effective
- This feedback drives continuous improvement of the system

## Model Selection Strategy

Bilbo uses different models for different components based on their specific requirements:

**Planner**: Benefits from a model that performs more reasoning and can thoroughly explore the problem space before passing work to the Research agent

**Research Agent**: Needs speed and efficiency to rapidly check multiple sources, so a faster model is preferred over one that does extensive reasoning at each step

**Compression Tasks**: For tasks like compressing context for an agent, a weaker/faster model is sufficient since the task doesn't require deep reasoning

This heterogeneous model approach optimizes for both cost and performance by matching model capabilities to task requirements.

## User Interface and Integration

Bilbo provides a custom UI for human users that displays the full research flow:

- Shows what the Planner sends to the Research agent (research goals, context, output schema requirements)
- Visualizes the tool calls being made during research
- Displays the final response in the requested format (different services may want different schemas, markdown, JSON, etc.)

Some services at Wix want responses in specific schemas, others prefer markdown or JSON format. The system adapts to these requirements through the output schema definition in the planning phase.

The interface allows users to ask questions ranging from code analysis (like explaining how React's box deep dive works with detailed markdown output) to bug investigation across the entire stack.

## Technical Challenges and Ongoing Work

Several areas present ongoing challenges:

**Database Queries**: Finding the specific data needed in large databases remains difficult. The system continues to improve its ability to formulate precise queries.

**Error Correlation**: Across many systems and services, identifying the specific relevant error requires sophisticated correlation capabilities that are actively being developed.

**Context Dream and Development**: A service initiative to allow teams and units to declare their context - their repositories, database tables, external dependencies, and tool usage patterns. This crowdsourced context helps agents understand team-specific information more effectively.

**Tradeoffs in Bug Resolution**: Not every bug has a single solution. Many bugs have multiple potential causes and multiple valid approaches to resolution. The system needs to understand when there are tradeoffs in the system and whether to explore multiple solution paths or run investigations multiple times to find issues.

**Non-Determinism**: The same question asked multiple times may not produce the same answer every time. Understanding how to handle this variability and when it's acceptable versus problematic is an ongoing area of investigation.

## LLMOps Lessons Learned

### Orchestration Agent Should Handle Output

An initial architecture had the Research agent delegate output formatting to another agent, but this failed. The agent doing the orchestration and understanding the full story from beginning to end must create the output. When output generation was delegated, the receiving agent didn't see anything in the story that could help it produce better output. Tools like Cursor and Claude follow this pattern where the agent you interact with produces the final response after delegating to sub-agents.

### Unified Protocols Are Critical

Using uniform protocols across all tools makes agents more effective. A common language for all tools reduces the mathematical complexity of determining next actions and makes the system more maintainable.

### Build Custom Solutions for Control

While using Claude Code or Codex seems attractive, several factors drove the decision to build internally:

**Vendor Risk**: Providers could wake up and decide to stop providing tokens to Wix or change their terms

**System Prompts**: External tools have their own system prompts that Wix cannot control

**Context Requirements**: Dealing with enormous amounts of context requires maximum flexibility to maintain high quality

**Customization Needs**: The ability to use multiple models within a flow, customize agent behavior, and implement custom protocols justified the development cost

**Cost Considerations**: There are real costs in maintainability and the engineering effort required, but these are traded for the flexibility needed to do things correctly

### Framework Selection Considerations

The team evaluated LangChain versus Google ADK and chose ADK, but this came with challenges:

**Documentation Gap**: Most Google ADK content is written for the Python SDK, not TypeScript, requiring significant translation effort and forking

**Compaction Improvements**: The team needed better compaction capabilities than what the SDK provided out of the box

**Parallel Tool Calls**: The TypeScript ADK calls MCP tool calls sequentially, but Bilbo's search protocol relies on calling multiple tools in parallel. This required forking and custom development.

**Stability Concerns**: LangChain had many versions that broke compatibility during the evaluation period (about four months prior), making it feel insufficiently mature for production needs

**Simplicity Requirements**: The team needed a relatively simple solution without a mesh of frameworks, and preferred a solution from a strong vendor (Google) that would maintain it

Even with the chosen framework, the team had to integrate the MCP client into the ADK and customize it to fit their needs.

### MCP Advantages

Using MCP rather than just tools provides a significant benefit: developers across Wix use the same tools in their agents. Any improvement made to an MCP tool is immediately available to both the internal Bilbo system and to individual developers. This creates a virtuous cycle where manual improvements benefit automated systems and vice versa, and issues are easier to fix because they're caught in multiple contexts.

### Context Engineering Remains Essential

Despite claims that prompt engineering and context engineering are becoming less important, the developer found these skills remain crucial. How you describe tasks, the simplicity with which you give AI operations to perform, and the structure of prompts all significantly impact results. Writing prompts with AI assistance but debugging them yourself is super important. Even differences between 1,000 character and 700 character system prompts matter at scale.

### Quality Metrics and Evaluation

The team is actively working on defining the right metrics:

**KPIs**: Measuring how many bugs were solved out of 1,000 that entered the pipeline

**Cost Considerations**: While everyone is currently celebrating abundant tokens, there is ultimately a price for these resources and a question of how much time to invest

**Right Metrics**: Determining what the correct measurements are for evaluating agent performance and system effectiveness

### Skills and Context Sharing

The system is working on integrating team-specific skills. Rather than having central skills that may not match how different teams work, teams with specific approaches can provide their own skills that get incorporated into the research process itself. This allows the system to leverage organizational knowledge about how different parts of Wix operate and solve problems.

### Human in the Loop

There's always a tradeoff with humans. When bugs can manifest in multiple ways and don't have single solutions, understanding when there are system tradeoffs and whether to pursue one approach versus another remains a challenge. The system needs to determine when to run investigations multiple times to explore different possibilities versus when to commit to a single path.

## Production Scale and Impact

The presentation mentions that OctoCode has achieved significant adoption with 90,000 downloads and 5,000 weekly active users over its 11-month lifespan. This demonstrates real production usage and validation of the approach. The Bilbo system serves as a critical component of Wix's automated bug investigation pipeline, though specific metrics on Bilbo's impact weren't provided in detail.

The systems represent a significant investment in LLMOps infrastructure, with custom framework implementations, forked SDKs, sophisticated orchestration patterns, and ongoing development of evaluation metrics and capabilities. The complexity of the implementation - from parallel agent orchestration to unified tool protocols to memory systems - illustrates the sophisticated engineering required to make LLMs work effectively at enterprise scale for complex code search and investigation tasks.

The case study emphasizes that success came primarily from learning from failures - iterating on what didn't work with users reporting issues and continuously improving based on real-world usage patterns. The presentation itself was created using OctoCode's skills, demonstrating the team's confidence in their own tooling.
