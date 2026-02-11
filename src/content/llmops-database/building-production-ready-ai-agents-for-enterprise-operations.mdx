---
title: "Building Production-Ready AI Agents for Enterprise Operations"
slug: "building-production-ready-ai-agents-for-enterprise-operations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed40726c5f624a0d71e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:45:55.191Z"
  createdOn: "2024-11-21T14:08:20.109Z"
llmopsTags:
  - "multi-agent-systems"
  - "langchain"
  - "anthropic"
  - "structured-output"
  - "customer-support"
  - "compliance"
industryTags: "finance"
company: "Parcha"
summary: "Parcha is developing AI agents to automate operations and compliance workflows in enterprises, particularly focusing on fintech operations. They tackled the challenge of moving from simple demos to production-grade systems by breaking down complex workflows into smaller, manageable agent components supervised by a master agent. Their approach combines existing company procedures with LLM capabilities, achieving 90% accuracy in testing before deployment while maintaining strict compliance requirements."
link: "https://www.youtube.com/watch?v=zCGWDWCTYkE"
year: 2023
seo:
  title: "Parcha: Building Production-Ready AI Agents for Enterprise Operations - ZenML LLMOps Database"
  description: "Parcha is developing AI agents to automate operations and compliance workflows in enterprises, particularly focusing on fintech operations. They tackled the challenge of moving from simple demos to production-grade systems by breaking down complex workflows into smaller, manageable agent components supervised by a master agent. Their approach combines existing company procedures with LLM capabilities, achieving 90% accuracy in testing before deployment while maintaining strict compliance requirements."
  canonical: "https://www.zenml.io/llmops-database/building-production-ready-ai-agents-for-enterprise-operations"
  ogTitle: "Parcha: Building Production-Ready AI Agents for Enterprise Operations - ZenML LLMOps Database"
  ogDescription: "Parcha is developing AI agents to automate operations and compliance workflows in enterprises, particularly focusing on fintech operations. They tackled the challenge of moving from simple demos to production-grade systems by breaking down complex workflows into smaller, manageable agent components supervised by a master agent. Their approach combines existing company procedures with LLM capabilities, achieving 90% accuracy in testing before deployment while maintaining strict compliance requirements."
---

## Overview

Parcha is an early-stage startup building AI agents that autonomously complete operations and compliance tasks for fintech companies. Founded by AJ Asver, a repeat founder who previously sold Scooper (a real-time search engine) to Google, and his co-founder Miguel (formerly of Twitter and Brex data science teams), the company emerged from their experience at Brex where they led the platform team responsible for automation. They identified the "last mile of automation"—tasks requiring human expertise and judgment—as an opportunity now solvable with modern LLM capabilities.

The company started in March 2023 and raised pre-seed and seed funding, with Initialized Capital as one of their seed investors. At the time of this interview, they were very early stage with a small team including a design lead who joined from another YC company.

## Problem Domain

Behind every fintech application lies an army of operations personnel handling manual workflows: customer onboarding, KYC (Know Your Customer) verification, risk checks on transactions, credit card underwriting, and compliance reviews. These tasks require following detailed Standard Operating Procedures (SOPs) that exist in Google Docs, Wikis, or Confluence pages—sometimes involving 10-30 procedural steps per workflow. Each step requires human judgment to interpret edge cases, verify documents, and make compliance decisions.

The scale challenge is significant: these manual reviews take hours per case, yet the volume fluctuates dramatically. Traditional automation couldn't handle the judgment-intensive aspects, creating a bottleneck that limited growth and increased costs for fintech companies.

## Technical Architecture

### Agent Design Philosophy

Parcha's approach differs fundamentally from general-purpose AI assistants. Rather than building agents that generate their own plans (like a personal assistant that might plan a party), they leverage existing human-written SOPs as the plan source. This makes agents "much more controllable and steerable" because they execute on pre-defined procedures rather than inventing approaches.

The key insight is that companies already have documented procedures for training human operators. These same documents—describing step-by-step processes for onboarding customers, verifying identities, checking state registrations—become the foundation for agent behavior. By skipping the plan-generation step, they reduce the failure modes associated with open-ended agent planning.

### Multi-Agent Architecture

The team discovered that single-agent architectures struggled with complex SOPs. When context windows grew to 2,000-3,000 tokens describing every possible scenario, agents became confused and prone to hallucination—described as "failing open for a high-risk compliance scenario" which is unacceptable.

Their solution was a hierarchical multi-agent system:

- **Worker Agents**: Specialized micro-agents that handle small parts of a procedure, each with access to specific tools
- **Supervisor Agent**: Orchestrates worker agents, treats them as tools (text-in, text-out), and synthesizes final recommendations
- **Tools**: Integrations that verify addresses, read state registration documents, verify identification, etc.

The supervisor doesn't need to know it's managing agents—from its perspective, it simply has access to tools that happen to be complex agents with their own tools. As AJ describes it: "before you know it it's agents all the way down."

This architecture enables scaling to arbitrary complexity and was described as something "at the bleeding edge"—when discussing with framework developers at LangChain and LlamaIndex, they hadn't encountered others doing similar implementations.

### LLM Selection: Claude over GPT

The team chose Claude (Anthropic) over OpenAI's models for several reasons:

- **Speed**: Agent workflows require multiple LLM calls per step, so latency compounds
- **Steerability**: Critical for following instructions precisely in compliance contexts
- **Stability**: Consistent behavior matters more than peak performance

They noted that GPT-3.5 was fast but not steerable, while GPT-4 was more steerable but had other tradeoffs. Claude provided the best balance for their agent workloads.

### Evolution from LangChain to Custom Implementation

Like many AI startups, Parcha initially built on LangChain for rapid prototyping. The framework enabled quick demo development but introduced significant complexity for production:

- Multiple abstraction layers made reasoning about behavior difficult
- Debugging became challenging when issues arose
- The flexibility designed for diverse use cases added overhead for their specific needs

The solution was aggressive simplification. Co-founder Miguel rewrote the entire agent codebase in a weekend, reducing it to approximately 500 lines of code. This enabled:

- Direct reasoning about system behavior
- Rapid bug identification and fixes
- Clear understanding of the execution path

They retained LangChain for LLM interface interoperability (easily swapping GPT-4 for Claude) and tooling infrastructure, but the core agent logic became custom code.

## Prompt Engineering Techniques

Several prompt engineering insights emerged from their production experience:

### Context Setting for IQ Improvement
Following techniques discussed by Andrej Karpathy, they set context at the beginning of prompts: "You are an expert at onboarding B2B customers on a fintech platform. You are really good at making compliance related decisions..." This statistically increases the likelihood of quality outputs—a counterintuitive finding given that we don't preface interactions with smart humans by telling them how smart they are.

### Structured Output for Plan Execution
Early implementations used comma-separated lists for agent plans. They discovered JSON formatting with explicit step tracking performed significantly better, giving agents more context about their current position in the execution flow.

### Customer-Editable Prompts
A strategic product decision: rather than Parcha achieving 99% accuracy internally, they aim for 90% accuracy then put editing tools in customers' hands. Operations staff who previously trained human teams on procedures become prompt engineers for agents. This mirrors their existing workflow—creating documents, training humans, iterating on procedures—but with faster feedback loops.

## Production Deployment Approach

### Gradual Trust Building
The initial product is a Chrome extension showing every step the agent takes with full reasoning. This transparency builds customer trust before autonomous operation. Interestingly, customers immediately ask for API endpoints for autonomous batch processing—surprising the team with their willingness to embrace the technology.

### Back-Testing Pipeline
Before production deployment, agents are tested against historical data. The target is 90% accuracy on back-testing before customer exposure. After that milestone, customers test in sandbox environments, find additional edge cases, and the team iterates.

### White-Glove Customer Engagement
Early customers receive intensive support—what AJ jokingly calls "agents handbuilt in California." This hands-on approach is intentional for bleeding-edge technology: deep customer understanding, shadowing operators doing manual reviews, iterating rapidly on discovered issues.

## Challenges and Lessons Learned

### Demo to Production Gap
The first demo showed an 8-step onboarding process with one or two integrations. Real customer SOPs proved far more complex with numerous edge cases and nuances. Bridging this gap required fundamental architectural changes (multi-agent systems) rather than incremental improvements.

### Whack-a-Mole Problem Solving
Debugging agent behavior resembles whack-a-mole: solving one issue may surface another. The team frames this as learning—each fix adds to collective understanding of LLM manipulation. High iteration velocity matters more than deep academic background; the co-founders learned applied LLM engineering through experimentation rather than prior AI research experience.

### Hallucination Risk Management
In compliance contexts, hallucination equals "failing open"—the worst possible outcome. This drove architectural decisions (simplified agents, smaller context windows, specialized worker agents) and deployment practices (extensive testing, sandbox environments, human verification).

## Engineering Culture Insights

The transcript reveals interesting perspectives on building with LLMs:

- **Dopamine-driven development**: The probabilistic nature of LLMs creates variable reward patterns (like slot machines) that engineers find addictive—the satisfaction when an agent finally does what you want
- **Creative problem-solving over credentials**: Ability to iterate quickly and try different approaches matters more than formal AI education
- **Velocity as core competency**: "The most important thing is your velocity—how quickly can you iterate through the failure to get to the promised land with this technology"

## Future Vision

Parcha envisions a progression from technical implementations by engineers to sales-led prompt engineering deployments, eventually reaching self-serve agent creation. The broader thesis is "hybrid workforces" where humans collaborate with "digital employees" handling operational drudgery, enabling thousand-fold more companies to exist with smaller teams serving larger customer bases.

The team acknowledges that general-purpose agents remain far harder than verticalized agents due to well-constrained problem spaces. Parcha's focus on fintech compliance represents a strategic choice of tractable complexity where current LLM capabilities can deliver production value.