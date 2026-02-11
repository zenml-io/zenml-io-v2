---
title: "Building and Deploying AI Agents for Account Qualification"
slug: "building-and-deploying-ai-agents-for-account-qualification"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3fd663391a0790c5f308"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:34:29.173Z"
  createdOn: "2024-11-21T14:12:38.675Z"
llmopsTags:
  - "multi-agent-systems"
  - "openai"
  - "poc"
  - "prompt-engineering"
industryTags: "tech"
company: "Unify"
summary: "Unify developed an AI agent system for automating account qualification in sales processes, using LangGraph for agent orchestration and LangSmith for experimentation and tracing. They evolved their agent architecture through multiple iterations, focusing on improving planning, reflection, and execution capabilities while optimizing for speed and user experience. The final system features real-time progress visualization and parallel tool execution, demonstrating practical solutions to common challenges in deploying LLM-based agents in production."
link: "https://blog.langchain.dev/unify-launches-agents-for-account-qualification-using-langgraph-and-langsmith/"
year: 2024
seo:
  title: "Unify: Building and Deploying AI Agents for Account Qualification - ZenML LLMOps Database"
  description: "Unify developed an AI agent system for automating account qualification in sales processes, using LangGraph for agent orchestration and LangSmith for experimentation and tracing. They evolved their agent architecture through multiple iterations, focusing on improving planning, reflection, and execution capabilities while optimizing for speed and user experience. The final system features real-time progress visualization and parallel tool execution, demonstrating practical solutions to common challenges in deploying LLM-based agents in production."
  canonical: "https://www.zenml.io/llmops-database/building-and-deploying-ai-agents-for-account-qualification"
  ogTitle: "Unify: Building and Deploying AI Agents for Account Qualification - ZenML LLMOps Database"
  ogDescription: "Unify developed an AI agent system for automating account qualification in sales processes, using LangGraph for agent orchestration and LangSmith for experimentation and tracing. They evolved their agent architecture through multiple iterations, focusing on improving planning, reflection, and execution capabilities while optimizing for speed and user experience. The final system features real-time progress visualization and parallel tool execution, demonstrating practical solutions to common challenges in deploying LLM-based agents in production."
---

## Summary

Unify is a company focused on reinventing how go-to-market (GTM) teams work using generative AI. In October 2024, they launched a new "Agents" feature as part of a broader automation suite called "Plays." The primary use case for these agents is account qualification—the task of determining whether a company fits a user's ideal customer profile (ICP) for sales targeting. This case study provides a detailed look at the engineering journey Unify undertook to build, iterate, and deploy these agents in production, using LangGraph as the agent orchestration framework and LangSmith for experimentation, tracing, and evaluation.

The case study is particularly valuable because it documents the iterative development process from a minimal viable agent (v0) through increasingly sophisticated versions, providing concrete insights into the challenges and trade-offs involved in building production-grade LLM-powered agents.

## The Problem Space

Account qualification is a research-intensive task that traditionally requires human sales development representatives (SDRs) to manually investigate companies by searching the web, visiting websites, navigating pages, and synthesizing information to answer qualification questions. Example qualification questions include:

- For an HR software company: "Are there any HR job postings on this company's careers page?" or "Do any job postings mention a competitor's software?"
- For an AI infrastructure company: "Does this company mention using LLMs anywhere on their website?" or "Do job postings mention open source LLMs?"

The goal was to automate this research process using AI agents that can perform web searches, scrape pages, navigate between pages, and reason about the gathered information to produce qualified/not-qualified decisions.

## Technical Architecture and Iteration

### Agent v0: The Barebones Approach

The initial implementation was intentionally minimal—a simple agent without even a dedicated prompt, relying purely on LangGraph's framework for the state machine and basic LLM tool calling. The team notes this actually "worked reasonably well for a lot of simple tasks," but it produced inconsistent results and made it difficult to analyze the reasoning behind answers. This highlights an important LLMOps lesson: simple approaches can get you surprisingly far, but lack the reliability and interpretability needed for production systems.

### Agent v1: Plan and Reflect Architecture

The next iteration introduced a more sophisticated structure with an initial "plan" step followed by a "reflect" step. This plan-reflect-tools loop represents a common agentic pattern where the model first plans its approach, then iterates between reflection and tool execution.

A significant finding at this stage was model selection for the planning step. The team found that mainstream models like GPT-4o did not produce comprehensive plans without very specific prompting. OpenAI's o1-preview model stood out because it generated plans with:

- Very detailed step-by-step instructions
- Potential pitfalls and mistakes to avoid
- Expansions of user questions even when phrased poorly

However, o1-preview's major drawback is speed—it can take 30-45 seconds to respond, significantly impacting overall agent runtime. This presents a classic LLMOps trade-off between capability and latency.

For the reflection step, the team found that models like GPT-4o and Claude 3.5 Sonnet worked fairly well. They identified that the most important characteristic of the reflection model is "honesty about what it does not yet know" to appropriately choose next steps—an interesting observation about model selection criteria that goes beyond simple capability benchmarks.

### Agent v2: Speed and UX Optimization

The latest iteration maintains the plan-reflect-tools architecture but focuses heavily on speed optimization and user experience improvements.

**Speed Optimizations:**

The team achieved significant speed improvements by parallelizing tool calls. For example, allowing the agent to scrape multiple web pages simultaneously rather than sequentially. This is particularly impactful since each webpage can take several seconds to load. The team notes this mirrors human behavior—quickly opening multiple search results in new tabs simultaneously.

**Infrastructure Changes for Real-Time UX:**

The original implementation used a simple synchronous prediction endpoint that held requests open while the agent ran. To support longer runtimes and real-time progress visualization, the team converted to an asynchronous architecture:

- An endpoint that starts agent execution and returns an ID
- A polling mechanism for clients to check progress
- Hooks integrated into the agent graph and tools to log progress to the database
- Frontend polling that displays newly completed steps in real-time

This architectural change represents a common pattern in production LLM systems where long-running operations require asynchronous processing and progressive disclosure of results.

## Experimentation and Evaluation with LangSmith

The team heavily leveraged LangSmith for their experimentation and evaluation workflows. Key capabilities they utilized include:

**Versioned Datasets:** The team emphasizes that constructing "an extensive and representative set of test cases" and labeling them is critical. They note using the agent itself for first-pass labeling before manually correcting labels—a practical approach to bootstrapping evaluation datasets.

**Experiment Comparison:** LangSmith allowed them to run new agent versions against hundreds of examples and quickly compare performance against previous versions with "very little in-house ML infra work." This is a significant advantage for teams without dedicated ML platform resources.

**Tracing:** The team already used LangSmith for tracing in another feature called "Smart Snippets," and found the tracing capabilities "excellent" for debugging agent behavior.

## Key Learnings and Practical Insights

### Embrace Experimentation

The team notes that the agent research space is "super green" with no definitive state-of-the-art architectures yet. This means teams must rely on systematic experimentation and evaluation cycles rather than simply implementing established best practices. This is an honest assessment of the current state of agentic AI development.

### "Think of Agents as Summer Interns"

This mental model proved useful for developing agent UX. When an intern makes mistakes, you don't just revise instructions and send them off again—you ask to see their work to identify where they went wrong. This led to their step-by-step visibility UX where users can observe agent decision-making, identify mistakes, and provide targeted guidance.

### Model Selection Trade-offs

The experience with o1-preview illustrates real production trade-offs. Despite being "a step up from other models" for planning with "valuable content rather than filler," its 30-45 second response times create significant bottlenecks. The team notes that as they scale, o1 "will likely become a bottleneck"—indicating they're actively investigating how to replicate o1's planning quality with faster models.

### User Empowerment Challenges

The team identifies a significant UX challenge: helping users iterate when LLM results are only partially correct. Many users have limited exposure to LLMs or prompting strategies and struggle to make progress without causing regressions on already-correct examples. The team sees the intersection of UX and LLMs as "ripe for disruption."

## Critical Assessment

It's worth noting that this case study comes from a guest blog post on LangChain's blog, so there is inherent promotional interest in LangChain's tools (LangGraph and LangSmith). The positive assessment of these tools should be considered in that context.

The case study is light on quantitative results—there are no concrete metrics on accuracy improvements between agent versions, latency figures beyond the o1-preview observation, or user adoption data. While the qualitative insights are valuable, production deployment claims would benefit from more concrete evidence.

Additionally, the use of o1-preview for every planning step may not be economically viable at scale given both latency and token costs, suggesting this architecture may evolve significantly as the system scales.

## Conclusion

This case study provides a practical window into building production agents for a specific, well-defined use case. The iterative approach from minimal implementation to sophisticated plan-reflect-tools architecture, combined with systematic evaluation using LangSmith, represents a thoughtful engineering process. The emphasis on UX—particularly real-time visibility into agent reasoning—and the honest acknowledgment of trade-offs (especially around o1-preview's speed) make this a useful reference for teams building similar systems.