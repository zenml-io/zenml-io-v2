---
title: "Building a Public AI Agent Workspace for Organizational Learning"
slug: "building-a-public-ai-agent-workspace-for-organizational-learning"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "data-analysis"
  - "prompt-engineering"
  - "agent-based"
  - "memory"
  - "human-in-the-loop"
  - "cicd"
  - "databases"
  - "anthropic"
industryTags: "e-commerce"
company: "Shopify"
summary: "Shopify developed River, an AI coding agent that operates exclusively in public Slack channels rather than private workspaces. The constraint of public-only operation was designed to create a \"Lehrwerkstatt\" (teaching workshop) environment where employees learn from observing each other's interactions with the agent. Over 5,938 employees used River across 4,450 channels in a 30-day period, with River authoring approximately one in eight merged pull requests. The public nature of interactions led to knowledge diffusion across the organization, with prompt patterns and debugging techniques spreading organically. The agent's merge rate improved from 36% to 77% over two months through collective learning and iterative refinement of River's skills and instructions by teams across the company."
link: "https://x.com/tobi/status/2053121182044451016"
year: 2026
seo:
  title: "Shopify: Building a Public AI Agent Workspace for Organizational Learning - ZenML LLMOps Database"
  description: "Shopify developed River, an AI coding agent that operates exclusively in public Slack channels rather than private workspaces. The constraint of public-only operation was designed to create a \"Lehrwerkstatt\" (teaching workshop) environment where employees learn from observing each other's interactions with the agent. Over 5,938 employees used River across 4,450 channels in a 30-day period, with River authoring approximately one in eight merged pull requests. The public nature of interactions led to knowledge diffusion across the organization, with prompt patterns and debugging techniques spreading organically. The agent's merge rate improved from 36% to 77% over two months through collective learning and iterative refinement of River's skills and instructions by teams across the company."
  canonical: "https://www.zenml.io/llmops-database/building-a-public-ai-agent-workspace-for-organizational-learning"
  ogTitle: "Shopify: Building a Public AI Agent Workspace for Organizational Learning - ZenML LLMOps Database"
  ogDescription: "Shopify developed River, an AI coding agent that operates exclusively in public Slack channels rather than private workspaces. The constraint of public-only operation was designed to create a \"Lehrwerkstatt\" (teaching workshop) environment where employees learn from observing each other's interactions with the agent. Over 5,938 employees used River across 4,450 channels in a 30-day period, with River authoring approximately one in eight merged pull requests. The public nature of interactions led to knowledge diffusion across the organization, with prompt patterns and debugging techniques spreading organically. The agent's merge rate improved from 36% to 77% over two months through collective learning and iterative refinement of River's skills and instructions by teams across the company."
notion:
  pageId: "35cf8dff-2538-8080-a303-d604504bca4e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-10T05:57:00.000Z"
  lastEditedTime: "2026-05-10T05:58:00.000Z"
  publishedAt: "2026-05-10T06:03:53Z"
---

## Overview and Context

Shopify built River, an AI coding agent that represents a distinctive approach to deploying LLMs in production environments. The case study, written by Tobi Lütke (Shopify's founder), describes how the company deliberately designed River to operate only in public Slack channels, creating what they call a "Lehrwerkstatt" (teaching workshop) at scale. This constraint was intended to transform the typical private AI assistant model into a transparent, collaborative learning environment where the entire organization could benefit from and contribute to the agent's effectiveness.

The scale of deployment is substantial: in a single 30-day period, 5,938 Shopify employees engaged with River across 4,450 different Slack channels. River opened 1,870 pull requests in just one week in Shopify's main monorepo, representing approximately one in eight merged pull requests. This indicates that River is not a peripheral tool but rather a core contributor integrated into the company's primary development workflow.

## Core Design Philosophy: Public-Only Operation

The most distinctive aspect of River's LLMOps implementation is the architectural decision to restrict the agent to public channels only. River explicitly declines to respond to direct messages and instead suggests users create public channels for collaboration. This represents a fundamental departure from the typical AI assistant paradigm, where tools like ChatGPT, Claude, and Cursor operate in private windows between the user and the tool.

This design choice has significant implications for LLMOps. While many organizations worry about information leakage or prefer to keep AI interactions private for various reasons, Shopify deliberately optimized for organizational transparency and knowledge diffusion. The CEO himself works with River in a channel called `#tobi-working-with-river`, with over 100 people who observe, react to threads, add context, pick up work, assist with reviews, and importantly, learn by watching. This creates a multiplier effect where a single interaction between one person and the agent becomes a learning opportunity for dozens or hundreds of others.

## Technical Capabilities and Integration

River possesses a comprehensive set of capabilities that position it as a full-fledged development team member rather than a simple chatbot. The agent can:

- Read code across the codebase
- Run tests
- Write code
- Open pull requests
- Query the company's data warehouse
- Examine production traces
- Execute various other development tasks

The integration with Shopify's monorepo is particularly noteworthy. River operates at the scale of opening 1,870 pull requests per week, which suggests robust integration with version control systems, testing infrastructure, and code review processes. The fact that approximately 12.5% of merged PRs are authored by River indicates that the agent's code quality meets production standards at a meaningful success rate.

River operates within Slack, leveraging the company's existing communication infrastructure rather than requiring developers to adopt new tools or contexts. Users interact with River by mentioning her in channels, using natural language similar to how they would communicate with human teammates. This reduces cognitive overhead and allows the agent to fit seamlessly into existing workflows.

## Knowledge Architecture: Skills, Zones, and Memory

The case study reveals several important LLMOps patterns in how River's knowledge is structured and maintained. River has what the text describes as "skills" that can be written and shared across teams. For example, when someone creates a skill teaching River about the company's checkout data warehouse, that skill gets reused by twelve other teams. This suggests a modular knowledge architecture where domain-specific capabilities can be developed, tested, and distributed across the organization.

Each channel can "pre-load the zones, skills, and instructions its team needs, written by the people closest to the work." This indicates a context-aware system where River's behavior can be customized per team or project while maintaining a shared foundation. The ability for teams to write their own instructions represents a form of in-context learning or prompt engineering at organizational scale, allowing subject matter experts to directly shape the agent's behavior without requiring centralized AI team intervention.

River also maintains a memory system that is "constantly learning and un-learning critical information about the company and the best way to do work." This suggests some form of dynamic knowledge base that evolves based on usage patterns and feedback. The "un-learning" aspect is particularly interesting from an LLMOps perspective, as it indicates mechanisms for deprecating outdated information—a critical challenge in production LLM systems where stale knowledge can lead to incorrect outputs.

## Continuous Improvement Through Collective Intelligence

One of the most striking results described is the improvement in River's merge rate from 36% to 77% over a two-month period. Crucially, Lütke emphasizes that this improvement came not from retraining a model or switching to a better foundation model, but rather from organizational learning and refinement. People watched River work, identified where it got stuck, and documented what it should have known, effectively crowdsourcing the improvement of the agent's performance.

This represents a powerful LLMOps pattern: using human-in-the-loop feedback at scale to improve agent performance without requiring expensive model retraining. The public nature of all interactions means that when one person identifies a failure mode and helps River improve, that improvement is visible to everyone and becomes part of the shared knowledge base. This creates a virtuous cycle where "every team's accumulated taste flows into the agent" and "the agent gets better at being Shopify."

From a traditional MLOps perspective, this is analogous to continuous training with human feedback, but implemented through organizational processes rather than automated pipelines. The system leverages the distributed expertise of thousands of employees to refine prompts, add contextual knowledge, and improve interaction patterns. This crowdsourced approach to agent improvement may be more sustainable and context-specific than relying solely on centralized AI teams to optimize performance.

## Knowledge Diffusion and Organizational Learning

The case study emphasizes how River's public operation creates unexpected benefits for organizational knowledge sharing. A support engineer watches a backend engineer in another channel get River to construct the right log query, then applies the same technique the next day. New hires scroll through existing River channels to see how senior people scope requests before sending their first one. Best prompt patterns spread organically across the organization.

This addresses a common LLMOps challenge: the gap between how AI tools are used by expert users versus novice users. In typical private AI assistant deployments, effective prompt engineering techniques remain siloed with the individuals who discover them. Shopify's approach treats every interaction as potential training material for other humans, creating what amounts to a constantly updating, searchable curriculum of effective AI collaboration patterns.

The searchability of all River interactions means that common questions and solutions become discoverable artifacts. As Lütke notes, "The next person who has the same question does not have to ask it." This reduces redundant queries to the agent and accelerates onboarding, as new employees can learn effective interaction patterns from historical conversations rather than starting from scratch.

## Critical Assessment and Potential Concerns

While the case study presents an enthusiastic view of River's success, several aspects warrant balanced consideration:

**Privacy and Psychological Safety**: The requirement for all work to be public may create pressure or discomfort for some employees. People might hesitate to ask questions they perceive as basic, potentially limiting the tool's accessibility. The text acknowledges this: "Asking for help feels different when the whole company can see the question." While Lütke reports this discomfort was overcome, the impact on different personality types and seniority levels isn't fully explored.

**Attribution and Contribution Metrics**: With River authoring 12.5% of merged PRs, questions arise about how engineering productivity is measured and attributed. If performance reviews or team metrics rely on commit counts or PR authorship, the presence of a prolific AI agent could distort traditional measurements. The case study doesn't address how Shopify handles these attribution challenges.

**Code Quality and Technical Debt**: While the 77% merge rate is impressive, the case study doesn't discuss what happens with the 23% of PRs that aren't merged, or whether River-authored code requires more review time or subsequent refactoring. The long-term maintainability of AI-generated code at this scale remains an open question.

**Selective Reporting**: As a public statement from the company's CEO, this case study naturally emphasizes successes. We don't learn about failures, abandoned approaches, or significant challenges encountered during development and deployment. The improvement from 36% to 77% merge rate is presented positively, but it also means River initially succeeded less than 40% of the time—a potentially frustrating experience that isn't deeply explored.

**Model Dependencies**: The case study doesn't reveal which underlying LLM(s) River uses, how model selection decisions are made, or how the system handles model updates or outages. These are critical LLMOps concerns for any production system at this scale.

## Organizational and Cultural Implications

River's design reflects and reinforces specific cultural values at Shopify. The emphasis on transparency, the concept of "constant learner" as a core value, and the willingness to conduct work in the open are prerequisites for this approach to succeed. Organizations with different cultural norms around privacy, hierarchy, or knowledge sharing might find the public-only constraint problematic.

Lütke frames the speed of organizations as "determined by the speed of its lowest-bandwidth communication channel." Public Slack conversations with River represent high-bandwidth communication that is fast, searchable, teachable, and compound in value. This architectural choice treats communication infrastructure and knowledge diffusion as first-order concerns rather than afterthoughts, which is relatively unusual in LLMOps implementations that typically focus on task completion rather than organizational learning.

## Production Deployment Considerations

Running an agent at this scale across 4,450+ channels with nearly 6,000 active users presents significant infrastructure challenges that the case study doesn't detail:

- **Concurrency and Rate Limiting**: How does River handle simultaneous requests across thousands of channels? What happens when many users need assistance during critical incidents or deadlines?

- **Cost Management**: Operating an AI agent that opens 1,870 PRs per week and handles continuous conversations across thousands of channels likely incurs substantial API costs if using external LLM providers, or significant infrastructure costs if self-hosted. The economics aren't discussed.

- **Reliability and Uptime**: When River is authoring one in eight merged PRs, it becomes critical infrastructure. The case study doesn't address service level objectives, failover mechanisms, or how the organization handles River downtime.

- **Security and Access Control**: While all interactions are public within the company, there must be boundaries around what code or data River can access. The security model and permission system aren't described.

## Comparative Positioning in the LLMOps Landscape

River differs from other prominent AI coding assistants in instructive ways. GitHub Copilot operates in the IDE with private suggestions. Cursor provides a private chat interface alongside code. Anthropic's Claude and OpenAI's ChatGPT are general-purpose assistants with private conversations. Devin and similar autonomous coding agents typically work on isolated tasks.

River's public-Slack-only model represents a different point in the design space, optimizing for organizational learning and knowledge sharing over individual productivity or privacy. This makes it more analogous to pair programming or mob programming practices elevated to organizational scale, where the learning benefits of observation are considered as valuable as the code produced.

## Future Directions and Open Questions

The case study raises intriguing questions about the evolution of LLMOps practices:

- **Scaling Limits**: How does the public-only model scale beyond Shopify's size? At what point does the volume of River interactions become noise rather than signal?

- **Knowledge Curation**: As the corpus of River interactions grows, how is valuable knowledge distinguished from routine or outdated exchanges? Is there active curation or does search suffice?

- **Cross-Organizational Patterns**: Could aspects of River's approach (skills, public learning) be packaged for use by other organizations, or are they too culturally and contextually specific to Shopify?

- **Agent Collaboration**: The text hints at River becoming a "teammate" but doesn't explore whether multiple instances of River (or different agents) collaborate with each other, which could be a natural evolution.

## Conclusion

Shopify's River represents a thoughtful LLMOps implementation that prioritizes organizational learning and knowledge diffusion alongside individual productivity. The public-only constraint is a bold design choice that creates emergent benefits in knowledge sharing, collective intelligence, and continuous improvement. The scale of deployment—nearly 6,000 users generating 1,870 PRs per week—demonstrates that this approach can work in production at a substantial organization.

However, the case study is ultimately a promotional narrative from company leadership. While the results are impressive, questions remain about failure modes, costs, infrastructure, and whether this model would succeed in organizations with different cultures or constraints. The improvement from 36% to 77% merge rate through collective refinement is perhaps the most compelling LLMOps insight: production AI systems may benefit more from organizational processes that enable continuous human feedback than from periodic model upgrades.

The "Lehrwerkstatt" concept—using AI agents as vehicles for organizational learning rather than just productivity tools—offers a valuable framing for thinking about LLMOps beyond narrow metrics of task completion. Whether this approach becomes widely adopted or remains distinctive to Shopify's culture will be an interesting question as the field evolves.
