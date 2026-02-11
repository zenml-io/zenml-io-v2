---
title: "Building Production Multi-Agent Research Systems with Claude"
slug: "building-production-multi-agent-research-systems-with-claude"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adced042ce598d81cd86f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:47.376Z"
  createdOn: "2025-12-23T18:18:21.239Z"
llmopsTags:
  - "question-answering"
  - "data-analysis"
  - "code-generation"
  - "summarization"
  - "healthcare"
  - "document-processing"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "agent-based"
  - "token-optimization"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "semantic-search"
  - "evals"
  - "mcp"
  - "monitoring"
  - "orchestration"
  - "devops"
  - "reliability"
  - "scalability"
  - "documentation"
  - "anthropic"
  - "google-gcp"
  - "amazon-aws"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic developed a production-grade multi-agent research system for their Claude Research feature that uses multiple LLM agents working in parallel to explore complex topics across web, Google Workspace, and integrated data sources. The system employs an orchestrator-worker pattern where a lead agent coordinates specialized subagents that search and filter information simultaneously, addressing challenges in agent coordination, evaluation, and reliability. Internal evaluations showed the multi-agent approach with Claude Opus 4 and Sonnet 4 outperformed single-agent Claude Opus 4 by 90.2% on research tasks, with token usage explaining 80% of performance variance, though the architecture consumes approximately 15× more tokens than standard chat interactions, requiring careful consideration of economic viability and deployment strategies."
link: "https://www.anthropic.com/engineering/multi-agent-research-system"
year: 2025
seo:
  title: "Anthropic: Building Production Multi-Agent Research Systems with Claude - ZenML LLMOps Database"
  description: "Anthropic developed a production-grade multi-agent research system for their Claude Research feature that uses multiple LLM agents working in parallel to explore complex topics across web, Google Workspace, and integrated data sources. The system employs an orchestrator-worker pattern where a lead agent coordinates specialized subagents that search and filter information simultaneously, addressing challenges in agent coordination, evaluation, and reliability. Internal evaluations showed the multi-agent approach with Claude Opus 4 and Sonnet 4 outperformed single-agent Claude Opus 4 by 90.2% on research tasks, with token usage explaining 80% of performance variance, though the architecture consumes approximately 15× more tokens than standard chat interactions, requiring careful consideration of economic viability and deployment strategies."
  canonical: "https://www.zenml.io/llmops-database/building-production-multi-agent-research-systems-with-claude"
  ogTitle: "Anthropic: Building Production Multi-Agent Research Systems with Claude - ZenML LLMOps Database"
  ogDescription: "Anthropic developed a production-grade multi-agent research system for their Claude Research feature that uses multiple LLM agents working in parallel to explore complex topics across web, Google Workspace, and integrated data sources. The system employs an orchestrator-worker pattern where a lead agent coordinates specialized subagents that search and filter information simultaneously, addressing challenges in agent coordination, evaluation, and reliability. Internal evaluations showed the multi-agent approach with Claude Opus 4 and Sonnet 4 outperformed single-agent Claude Opus 4 by 90.2% on research tasks, with token usage explaining 80% of performance variance, though the architecture consumes approximately 15× more tokens than standard chat interactions, requiring careful consideration of economic viability and deployment strategies."
---

## Overview

Anthropic built a production multi-agent research system powering their Claude Research feature, which enables Claude to autonomously search across web sources, Google Workspace, and various integrations to accomplish complex research tasks. This case study provides deep insights into the engineering challenges, architectural decisions, and operational practices required to take a multi-agent LLM system from prototype to production at scale. The system represents a sophisticated example of LLMOps in action, demonstrating how to coordinate multiple LLM agents, manage long-running stateful processes, implement effective evaluation frameworks, and ensure production reliability for non-deterministic AI systems.

The motivation for a multi-agent architecture stems from the nature of research tasks themselves. Research involves open-ended problems where the required steps cannot be predicted or hardcoded in advance. The process is inherently dynamic and path-dependent, requiring continuous updates based on discoveries and the flexibility to pivot or explore tangential connections as investigations unfold. Traditional linear, one-shot pipelines cannot handle these requirements. The team found that once AI models reach a sufficient intelligence threshold, multi-agent systems become essential for scaling performance, drawing an analogy to how human societies achieved exponential capability increases through collective intelligence and coordination rather than just individual intelligence improvements.

## Architecture and Design Decisions

The Research system implements an orchestrator-worker pattern where a lead agent analyzes user queries, develops research strategies, and spawns specialized subagents to explore different aspects simultaneously. This architecture represents a significant departure from traditional Retrieval Augmented Generation (RAG) approaches that use static retrieval of similar chunks. Instead, the multi-agent system performs dynamic multi-step search that adapts to new findings and analyzes results iteratively.

The complete workflow begins when a user submits a query to a LeadResearcher agent that enters an iterative research process. The lead agent thinks through its approach and saves the plan to external memory to persist context, which is critical because context windows can be truncated if they exceed 200,000 tokens. The lead agent then creates specialized subagents (the number varies based on query complexity) with specific research tasks. Each subagent independently performs searches, evaluates tool results using interleaved thinking, and returns findings to the lead researcher. The lead researcher synthesizes these results and decides whether more research is needed, potentially creating additional subagents or refining its strategy. Once sufficient information is gathered, the system exits the research loop and passes findings to a specialized CitationAgent that processes documents and the research report to identify specific locations for citations, ensuring all claims are properly attributed to sources.

The benefits of this multi-agent approach are substantial but come with tradeoffs. Subagents facilitate compression by operating in parallel with their own context windows, exploring different aspects simultaneously before condensing the most important tokens for the lead agent. Each subagent provides separation of concerns with distinct tools, prompts, and exploration trajectories, which reduces path dependency and enables thorough independent investigations. Internal evaluations showed the multi-agent system with Claude Opus 4 as the lead agent and Claude Sonnet 4 subagents outperformed single-agent Claude Opus 4 by 90.2% on internal research evaluations. The system excels particularly on breadth-first queries involving multiple independent directions—for example, when asked to identify all board members of Information Technology S&P 500 companies, the multi-agent system successfully decomposed this into subagent tasks while the single-agent system failed with slow sequential searches.

## Performance Analysis and Token Economics

A critical insight from Anthropic's analysis is that multi-agent systems work primarily because they spend enough tokens to solve problems. In their analysis of the BrowseComp evaluation (which tests browsing agents' ability to locate hard-to-find information), three factors explained 95% of performance variance: token usage alone explained 80% of variance, with the number of tool calls and model choice as the other two explanatory factors. This validates the architecture of distributing work across agents with separate context windows to add capacity for parallel reasoning. Notably, the latest Claude models act as large efficiency multipliers on token usage—upgrading to Claude Sonnet 4 provided a larger performance gain than doubling the token budget on Claude Sonnet 3.7.

However, the token economics present challenges. In Anthropic's data, agents typically use approximately 4× more tokens than chat interactions, and multi-agent systems use about 15× more tokens than chats. For economic viability, multi-agent systems require tasks where the value is high enough to justify the increased performance costs. Additionally, some domains are not well-suited for multi-agent systems today. Tasks that require all agents to share the same context or involve many dependencies between agents don't benefit as much. For instance, most coding tasks involve fewer truly parallelizable tasks than research, and current LLM agents struggle with real-time coordination and delegation to other agents. The sweet spot for multi-agent systems is valuable tasks involving heavy parallelization, information exceeding single context windows, and interfacing with numerous complex tools.

## Prompt Engineering Principles for Multi-Agent Systems

Prompt engineering emerged as the primary lever for improving multi-agent behavior, given the rapid growth in coordination complexity. The team developed eight key principles through their development process:

**Think like your agents:** Understanding prompt effects requires building an accurate mental model of agent behavior. Anthropic built simulations using their Console with exact prompts and tools from their system, watching agents work step-by-step. This immediately revealed failure modes like continuing when sufficient results were obtained, using overly verbose search queries, or selecting incorrect tools. Effective prompting relies on developing this mental model to make impactful changes obvious.

**Teach the orchestrator how to delegate:** The lead agent decomposes queries into subtasks and describes them to subagents. Each subagent needs an objective, output format, guidance on tools and sources, and clear task boundaries. Without detailed task descriptions, agents duplicate work, leave gaps, or fail to find necessary information. Early versions allowed simple instructions like "research the semiconductor shortage," but these proved too vague, leading subagents to misinterpret tasks or duplicate work. For instance, one subagent might explore the 2021 automotive chip crisis while two others duplicated work on current 2025 supply chains without effective division of labor.

**Scale effort to query complexity:** Agents struggle to judge appropriate effort, so the team embedded scaling rules in prompts. Simple fact-finding requires one agent with 3-10 tool calls, direct comparisons might need 2-4 subagents with 10-15 calls each, and complex research might use more than 10 subagents with clearly divided responsibilities. These explicit guidelines help the lead agent allocate resources efficiently and prevent overinvestment in simple queries.

**Tool design and selection are critical:** Agent-tool interfaces are as critical as human-computer interfaces, and using the right tool is often strictly necessary. An agent searching the web for context that only exists in Slack is doomed from the start. With Model Context Protocol (MCP) servers providing access to external tools, this problem compounds as agents encounter unseen tools with varying description quality. The team gave agents explicit heuristics: examine all available tools first, match tool usage to user intent, search the web for broad external exploration, and prefer specialized tools over generic ones. Bad tool descriptions can send agents down completely wrong paths.

**Let agents improve themselves:** The Claude 4 models proved to be excellent prompt engineers. When given a prompt and failure mode, they can diagnose why the agent is failing and suggest improvements. Anthropic created a tool-testing agent that attempts to use flawed MCP tools and then rewrites tool descriptions to avoid failures. By testing tools dozens of times, this agent found key nuances and bugs. This process for improving tool ergonomics resulted in a 40% decrease in task completion time for future agents using the new descriptions.

**Start wide, then narrow down:** Search strategy should mirror expert human research by exploring the landscape before drilling into specifics. Agents often default to overly long, specific queries that return few results. The team counteracted this by prompting agents to start with short, broad queries, evaluate what's available, then progressively narrow focus.

**Guide the thinking process:** Extended thinking mode, which leads Claude to output additional visible thinking tokens, serves as a controllable scratchpad. The lead agent uses thinking to plan its approach, assess which tools fit the task, determine query complexity and subagent count, and define each subagent's role. Testing showed extended thinking improved instruction-following, reasoning, and efficiency. Subagents also plan and use interleaved thinking after tool results to evaluate quality, identify gaps, and refine their next query.

**Parallel tool calling transforms speed and performance:** Complex research naturally involves exploring many sources. Early agents executed sequential searches, which was painfully slow. The team introduced two kinds of parallelization: (1) the lead agent spins up 3-5 subagents in parallel rather than serially, and (2) subagents use 3+ tools in parallel. These changes cut research time by up to 90% for complex queries, enabling Research to do more work in minutes instead of hours while covering more information than other systems.

The overall prompting strategy focuses on instilling good heuristics rather than rigid rules. The team studied how skilled humans approach research tasks and encoded these strategies—decomposing difficult questions, carefully evaluating source quality, adjusting search approaches based on new information, and recognizing when to focus on depth versus breadth. They also proactively mitigated unintended side effects by setting explicit guardrails to prevent agents from spiraling out of control, with focus on fast iteration loops with observability and test cases.

## Evaluation Framework

Effective evaluation proved essential but challenging for multi-agent systems. Traditional evaluations assume the AI follows the same steps each time, but multi-agent systems don't work this way. Even with identical starting points, agents might take completely different valid paths to reach goals. One agent might search three sources while another searches ten, or use different tools to find the same answer. Since the "correct" steps aren't always knowable in advance, evaluation must use flexible methods that judge whether agents achieved right outcomes while following reasonable processes.

**Start evaluating immediately with small samples:** In early development, changes tend to have dramatic impacts with abundant low-hanging fruit. A prompt tweak might boost success rates from 30% to 80%. With such large effect sizes, teams can spot changes with just a few test cases. Anthropic started with about 20 queries representing real usage patterns, which often clearly showed the impact of changes. This counters the common mistake of delaying evaluation until large test suites with hundreds of cases can be built—starting small with a few examples immediately is far better than delaying.

**LLM-as-judge evaluation scales when done well:** Research outputs are free-form text rarely having a single correct answer, making programmatic evaluation difficult. LLMs are a natural fit for grading outputs. Anthropic used an LLM judge evaluating outputs against rubric criteria: factual accuracy (do claims match sources?), citation accuracy (do cited sources match claims?), completeness (are all requested aspects covered?), source quality (primary sources over lower-quality secondary sources?), and tool efficiency (right tools used a reasonable number of times?). The team experimented with multiple judges for each component but found a single LLM call with a single prompt outputting scores from 0.0-1.0 and a pass-fail grade was most consistent and aligned with human judgments. This method was especially effective when test cases had clear answers, allowing the LLM judge to simply check correctness (e.g., did it accurately list the pharma companies with the top 3 largest R&D budgets?). Using LLMs as judges enabled scalable evaluation of hundreds of outputs.

**Human evaluation catches what automation misses:** Human testers find edge cases that evals miss, including hallucinated answers on unusual queries, system failures, or subtle source selection biases. Human testers noticed early agents consistently chose SEO-optimized content farms over authoritative but less highly-ranked sources like academic PDFs or personal blogs. Adding source quality heuristics to prompts helped resolve this. Even with automated evaluations, manual testing remains essential.

Multi-agent systems exhibit emergent behaviors arising without specific programming. Small changes to the lead agent can unpredictably change subagent behavior. Success requires understanding interaction patterns, not just individual agent behavior. The best prompts for these agents are not strict instructions but frameworks for collaboration that define division of labor, problem-solving approaches, and effort budgets.

## Production Reliability and Engineering Challenges

Taking multi-agent systems to production required addressing challenges distinct from traditional software engineering. In traditional software, bugs might break features, degrade performance, or cause outages. In agentic systems, minor changes cascade into large behavioral changes, making it remarkably difficult to write code for complex agents maintaining state in long-running processes.

**Agents are stateful and errors compound:** Agents run for long periods maintaining state across many tool calls, requiring durable code execution and error handling. Without effective mitigations, minor system failures can be catastrophic. When errors occur, restarts from the beginning are expensive and frustrating for users. Instead, Anthropic built systems that can resume from where agents were when errors occurred. They also leverage the model's intelligence for graceful handling—for instance, letting the agent know when a tool is failing and letting it adapt works surprisingly well. The approach combines the adaptability of AI agents with deterministic safeguards like retry logic and regular checkpoints.

**Debugging benefits from new approaches:** Agents make dynamic decisions and are non-deterministic between runs, even with identical prompts, making debugging harder. Users would report agents "not finding obvious information," but the reasons weren't immediately clear—were agents using bad search queries? Choosing poor sources? Hitting tool failures? Adding full production tracing enabled systematic diagnosis of why agents failed and fixing issues. Beyond standard observability, the team monitors agent decision patterns and interaction structures without monitoring individual conversation contents to maintain user privacy. This high-level observability helped diagnose root causes, discover unexpected behaviors, and fix common failures.

**Deployment needs careful coordination:** Agent systems are highly stateful webs of prompts, tools, and execution logic running almost continuously. When deploying updates, agents might be anywhere in their process, and well-meaning code changes can break existing agents. Updating every agent to new versions simultaneously isn't feasible. Instead, Anthropic uses rainbow deployments to avoid disrupting running agents by gradually shifting traffic from old to new versions while keeping both running simultaneously.

**Synchronous execution creates bottlenecks:** Currently, lead agents execute subagents synchronously, waiting for each set of subagents to complete before proceeding. This simplifies coordination but creates bottlenecks in information flow between agents. The lead agent can't steer subagents, subagents can't coordinate, and the entire system can be blocked waiting for a single subagent to finish. Asynchronous execution would enable additional parallelism with agents working concurrently and creating new subagents when needed, but this adds challenges in result coordination, state consistency, and error propagation across subagents. As models handle longer and more complex research tasks, the performance gains are expected to justify the complexity.

## Additional Production Considerations

The appendix provides several additional insights. For agents that mutate state over many turns, end-state evaluation proves more effective than turn-by-turn analysis. Instead of judging whether agents followed specific processes, evaluate whether they achieved correct final states. This acknowledges agents may find alternative paths to the same goal while ensuring intended outcomes. For complex workflows, break evaluation into discrete checkpoints where specific state changes should have occurred rather than validating every intermediate step.

For long-horizon conversation management, production agents often engage in conversations spanning hundreds of turns, requiring careful context management strategies. As conversations extend, standard context windows become insufficient, necessitating intelligent compression and memory mechanisms. Anthropic implemented patterns where agents summarize completed work phases and store essential information in external memory before proceeding to new tasks. When context limits approach, agents can spawn fresh subagents with clean contexts while maintaining continuity through careful handoffs and retrieve stored context like research plans from memory rather than losing previous work when reaching context limits.

For subagent outputs, implementing a filesystem pattern minimizes the "game of telephone" effect. Direct subagent outputs can bypass the main coordinator for certain result types, improving both fidelity and performance. Rather than requiring subagents to communicate everything through the lead agent, artifact systems allow specialized agents to create outputs that persist independently. Subagents call tools to store work in external systems, then pass lightweight references back to the coordinator. This prevents information loss during multi-stage processing and reduces token overhead from copying large outputs through conversation history. The pattern works particularly well for structured outputs like code, reports, or data visualizations where the subagent's specialized prompt produces better results than filtering through a general coordinator.

## Real-World Impact and Usage Patterns

Users have reported that Claude's multi-agent research helped them find business opportunities they hadn't considered, navigate complex healthcare options, resolve thorny technical bugs, and save up to days of work by uncovering research connections they wouldn't have found alone. An analysis of usage patterns using Clio embedding plots showed the most common use cases are: developing software systems across specialized domains (10%), developing and optimizing professional and technical content (8%), developing business growth and revenue generation strategies (8%), assisting with academic research and educational material development (7%), and researching and verifying information about people, places, or organizations (5%).

The journey from prototype to production proved that the last mile often becomes most of the journey. Codebases working on developer machines require significant engineering to become reliable production systems. The compound nature of errors in agentic systems means minor issues for traditional software can derail agents entirely—one step failing can cause agents to explore entirely different trajectories, leading to unpredictable outcomes. Despite these challenges, multi-agent systems have proven valuable for open-ended research tasks. Success requires careful engineering, comprehensive testing, detail-oriented prompt and tool design, robust operational practices, and tight collaboration between research, product, and engineering teams who deeply understand current agent capabilities.