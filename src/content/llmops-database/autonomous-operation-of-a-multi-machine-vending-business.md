---
title: "Autonomous Operation of a Multi-Machine Vending Business"
slug: "autonomous-operation-of-a-multi-machine-vending-business"
draft: false
llmopsTags:
  - "internet-of-things"
  - "legacy-system-integration"
  - "chatbot"
  - "poc"
  - "agent-based"
  - "human-in-the-loop"
  - "memory"
  - "harness-engineering"
  - "prompt-engineering"
  - "error-handling"
  - "evals"
  - "security"
  - "reliability"
  - "serverless"
  - "anthropic"
  - "cloudflare"
industryTags: "e-commerce"
company: "Prosus"
summary: "Prosus tested whether an LLM-based agent could operate a small physical business by managing six vending machines. The team reverse-engineered the machines’ operator APIs, converted them into agent tools, built a custom point-of-sale system, and deployed a scheduled agent in a VM with browser access, sub-agents, shared human access, persistent business documents, and controlled secret injection. The experiment demonstrated that agents can execute many operational tasks, but also exposed major production challenges: live-system testing caused unintended product dispensing, task completion did not guarantee real-world outcomes, product sourcing lacked business judgment, marketing quality was poor, and pricing optimized revenue more readily than profit. A human operator remained essential for physical restocking, contextual decisions, and correcting the agent’s assumptions; the system generated useful operational learning but was not shown to be profitable after model and operational costs."
link: "https://www.youtube.com/watch?v=LJ2MTGvVHm8"
year: 2026
seo:
  title: "Prosus: Autonomous Operation of a Multi-Machine Vending Business - ZenML LLMOps Database"
  description: "Prosus tested whether an LLM-based agent could operate a small physical business by managing six vending machines. The team reverse-engineered the machines’ operator APIs, converted them into agent tools, built a custom point-of-sale system, and deployed a scheduled agent in a VM with browser access, sub-agents, shared human access, persistent business documents, and controlled secret injection. The experiment demonstrated that agents can execute many operational tasks, but also exposed major production challenges: live-system testing caused unintended product dispensing, task completion did not guarantee real-world outcomes, product sourcing lacked business judgment, marketing quality was poor, and pricing optimized revenue more readily than profit. A human operator remained essential for physical restocking, contextual decisions, and correcting the agent’s assumptions; the system generated useful operational learning but was not shown to be profitable after model and operational costs."
  canonical: "https://www.zenml.io/llmops-database/autonomous-operation-of-a-multi-machine-vending-business"
  ogTitle: "Prosus: Autonomous Operation of a Multi-Machine Vending Business - ZenML LLMOps Database"
  ogDescription: "Prosus tested whether an LLM-based agent could operate a small physical business by managing six vending machines. The team reverse-engineered the machines’ operator APIs, converted them into agent tools, built a custom point-of-sale system, and deployed a scheduled agent in a VM with browser access, sub-agents, shared human access, persistent business documents, and controlled secret injection. The experiment demonstrated that agents can execute many operational tasks, but also exposed major production challenges: live-system testing caused unintended product dispensing, task completion did not guarantee real-world outcomes, product sourcing lacked business judgment, marketing quality was poor, and pricing optimized revenue more readily than profit. A human operator remained essential for physical restocking, contextual decisions, and correcting the agent’s assumptions; the system generated useful operational learning but was not shown to be profitable after model and operational costs."
notion:
  pageId: "3e9f8dff-2538-80bc-bb5b-eb2dedafbc55"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:20:00.000Z"
  lastEditedTime: "2026-09-28T08:20:00.000Z"
  publishedAt: "2026-09-28T08:23:42Z"
---

## Overview

Prosus used a vending-machine business as a deliberately constrained test of whether an LLM agent could operate a physical business rather than only automate software workflows. The broader motivation came from Prosus’s marketplaces and the small businesses that sell through them: the company wanted to understand how AI might help such businesses run more smoothly and profitably. Instead of immediately attempting a restaurant, the team started with six vending machines—snack and drink machines located in an office environment—so it could study autonomy, tool integration, operational safeguards, and human-agent collaboration in a real setting.

The experiment produced a mixed result. The agent could interact with the machines and point-of-sale system, research products, modify catalog information, set prices, create tasks, and carry out recurring work. However, it required substantial human supervision and physical labor, and its business decisions were frequently literal, poorly scoped, or optimized for the wrong objective. The system was useful as an applied LLMOps experiment and as a productivity aid for the operator, but the reported results do not establish that a fully autonomous vending business was commercially viable. The team reported approximately $300 per month in token costs during the operation and acknowledged that the business was losing money overall, although the machines also competed with free food and drinks in the office.

## Problem and Use Case

The initial target was an agent that could run a business in the real world. Existing autonomous-business examples were described as primarily operating software companies, where the external actions are websites, advertising platforms, email, and social media. A vending operation introduces additional constraints: physical inventory, machine-specific capabilities, payment processing, product dimensions, pricing, stock replenishment, and customers who expect the products to be edible and available. The vending machines therefore served as a practical boundary between software automation and real-world operations.

The team selected machines that already had a remote operator dashboard and a mobile point-of-sale component. This avoided hardware hacking and provided a manageable control surface. Six machines were used instead of one to make the experiment more representative of a small business and to introduce multi-asset coordination. The aim was not merely to demonstrate that a model could issue individual commands, but to determine how an agent behaves over time when it has goals, recurring tasks, business knowledge, and access to consequential tools.

## Architecture and Tool Integration

The machines’ existing operating software was designed for human operators, so the team adapted it for agent use. It reverse-engineered the dashboard APIs, including the session-token flow, and recreated the dashboard’s functions as programmatic tool calls. These tools could perform actions such as opening a machine, dispensing an item, and operating other machine functions. This is a typical LLMOps integration pattern: an existing operational system is wrapped in a controlled tool layer so the model can invoke business actions without interacting with the original user interface manually.

The built-in POS system was initially insufficient because it used a preconfigured catalog of names and images and allowed price changes only within those constraints. The team therefore built a custom POS layer to provide full control over item names, images, and prices. The machine operation and POS capabilities were grouped into two agent skills, one for controlling the vending equipment and one for managing the product catalog and pricing. Before giving the system broader autonomy, the team attached the tools to a simple chatbot running the Claude SDK and used prompting to check whether the required operations were exposed. This toolification test helped validate coverage of the machine and POS workflows before introducing scheduled autonomous execution.

The runtime used a virtual machine with a front end and the Claude SDK. The selected SDK provided native support for sub-agents and included a Bash tool, while the runtime also supplied browser access. The implementation used a custom secrets skill that could inject credentials into code through placeholders, reducing the chance that provider-facing prompts or generated code would expose sensitive secrets. The exact security posture and isolation properties were not fully described, so this should be viewed as a useful control pattern rather than evidence of a complete production security architecture.

The system was designed as a shared company workspace rather than as one individual’s private agent. Multiple people could log into the same environment, inspect its state, and intervene if the primary operator was unavailable. This is important for production LLMOps: an agent running a business needs shared observability, continuity, and ownership. The team also implemented context compaction that attempted to preserve the business narrative, strategic direction, and important documents instead of merely producing a generic conversation summary. Important information could be written to and linked from persistent documents mounted in the VM, allowing humans and agents to contribute to a shared body of business knowledge.

## Scheduling, Tasks, and Goals

The agent did not run continuously. A scheduler periodically woke it up, supplied its tools and context, and allowed it to act. This approach reduced the cost of keeping an autonomous agent active 24/7 and provided a natural review boundary. The team learned that a green or completed task was not sufficient evidence that an intended business outcome had occurred. Tasks were therefore paired with independent result verification: the operator checked whether the action had actually produced the expected external effect rather than trusting the model’s self-report.

The initial design was task-oriented, but static tasks performed poorly as the agent encountered new information. The system was changed to use higher-level goals, with tasks associated with those goals. When a goal had insufficient supporting work, the agent could create or edit tasks, perform market research, and increase the frequency or scope of activities. This made the agent more adaptive, but it also increased the risk of uncontrolled activity. For example, when asked to look for deals, it reportedly found roughly 1,100 offers, including unsuitable products such as soap, cleaning products, and cocktail mix. The result illustrates why goal expansion needs domain constraints, approval thresholds, budgets, and relevance checks rather than unrestricted browsing and task generation.

## Human-in-the-Loop Operations

The experiment showed that physical business automation has a substantial “last mile” that remains human. The agent could identify work and provide instructions, but a person still had to carry inventory, understand how products physically fit in the machines, load stock, and resolve ambiguities. The team added an operator interface connected to the POS, allowing a human to open a task-specific chat, ask clarifying questions, and complete the physical work with guidance from the agent. This reportedly made the operator substantially more productive than switching among email, a separate application, and operational instructions.

This arrangement is better characterized as human-directed or human-assisted autonomy than as a fully autonomous business. It is also a practical pattern for deployment: the model handles planning, research, coordination, and explanation, while the human retains responsibility for irreversible physical actions and exceptions. The shared workspace further supports escalation, because another team member can observe the same agent state and intervene when a task is blocked.

## Evaluation and Failure Modes

The most important evaluation lesson was that the system operated live equipment during development. Tests intended to check whether APIs were still available caused actual dispensing, including an incident in which approximately 30 drinks were dispensed while the agent was calibrating behavior. This demonstrates the need for separate test and production environments, mocked or simulated tools, dry-run modes, explicit action classification, and approval gates for costly or irreversible calls. A tool that is technically callable is not automatically safe to use in evaluation.

The agent also behaved like a coding assistant unless its business context was made explicit. It tended to report changes in the form of technical changelogs rather than business KPIs and needed direct instruction about what a vending-machine customer would consider useful. It purchased cup noodles that did not fit the machine and pursued irrelevant bargains because product dimensions, customer preferences, and merchandising constraints were not represented adequately in its instructions or knowledge base. These incidents were not necessarily model failures alone; they exposed missing schemas, validation rules, and domain policies around product eligibility.

Marketing revealed a similar gap. When told to promote the business, the agent produced a technically valid but low-quality image or message that satisfied the literal task while failing to meet human expectations for branding and visual communication. A decomposition into a primary agent, manager, and specialized marketing agent was considered useful because different roles require different quality criteria and context. The broader lesson is that “complete the task” is an inadequate evaluation target for open-ended business work. Evaluations need rubrics for relevance, quality, customer impact, and alignment with the business goal.

Pricing produced a further objective mismatch. The machines first offered free products to collect usage data, after which the agent set prices and adjusted them over time. During the summer it lowered prices aggressively, helping revenue and attracting customers who might otherwise buy from a nearby supermarket, but reducing profitability. The best-performing location was the office’s AI house, although the comparison was affected by the availability of free food and drinks. The reported commercial outcome therefore cannot be interpreted as a clean revenue or profit benchmark.

## Results and Tradeoffs

The experiment validated several capabilities relevant to production LLMOps: wrapping legacy operational APIs as tools, scheduling model execution, using sub-agents and browser access, isolating secrets, sharing agent state among multiple users, preserving business context across compaction, writing durable knowledge documents, and combining autonomous planning with human execution. It also demonstrated that agent autonomy is a systems problem rather than a prompt-only problem. Reliability depended on tool semantics, environment separation, verification, context management, business policies, and human escalation.

At the same time, the evidence supports a cautious assessment. The agent was able to perform useful work, but it did not independently understand the physical, commercial, and customer constraints of the business. The team still carried stock, corrected product choices, reviewed outcomes, and shaped the goals. The approximate token spend was about $300 per month, and the operation was described as financially negative overall, even though pricing and demand effects produced some revenue. The experiment therefore offers stronger evidence for AI-assisted operations and agent experimentation than for unattended autonomous commerce.

Prosus subsequently made a simulated “vending bench” available so others could test agent harnesses against six machines, real item information, and simulated elasticity in a controlled environment. Such a benchmark can address one of the experiment’s clearest weaknesses: evaluating tools and policies without dispensing real products or incurring unintended commercial effects. For a production rollout, the next steps would logically include simulation and shadow mode, explicit dry-run and approval controls, product-fit and catalog validation, cost and profit-aware objectives, independent outcome checks, and monitoring that distinguishes model-reported completion from verified business results.
