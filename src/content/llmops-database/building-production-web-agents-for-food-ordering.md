---
title: "Building Production Web Agents for Food Ordering"
slug: "building-production-web-agents-for-food-ordering"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67bf447609efc4fd521bed7d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:01:54.659Z"
  createdOn: "2025-02-26T16:42:30.599Z"
llmopsTags:
  - "chatbot"
  - "code-interpretation"
  - "high-stakes-application"
  - "realtime-application"
  - "structured-output"
  - "multi-modality"
  - "prompt-engineering"
  - "error-handling"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "latency-optimization"
  - "monitoring"
  - "databases"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "microsoft-azure"
  - "openai"
industryTags: "e-commerce"
company: "iFood"
summary: "A team at Prosus built web agents to help automate food ordering processes across their e-commerce platforms. Rather than relying on APIs, they developed web agents that could interact directly with websites, handling complex tasks like searching, navigating menus, and placing orders. Through iterative development and optimization, they achieved an 80% success rate target for specific e-commerce tasks by implementing a modular architecture that separated planning and execution, combined with various operational modes for different scenarios."
link: "https://www.youtube.com/watch?v=QbxN_PN7kZc"
year: 2023
seo:
  title: "iFood: Building Production Web Agents for Food Ordering - ZenML LLMOps Database"
  description: "A team at Prosus built web agents to help automate food ordering processes across their e-commerce platforms. Rather than relying on APIs, they developed web agents that could interact directly with websites, handling complex tasks like searching, navigating menus, and placing orders. Through iterative development and optimization, they achieved an 80% success rate target for specific e-commerce tasks by implementing a modular architecture that separated planning and execution, combined with various operational modes for different scenarios."
  canonical: "https://www.zenml.io/llmops-database/building-production-web-agents-for-food-ordering"
  ogTitle: "iFood: Building Production Web Agents for Food Ordering - ZenML LLMOps Database"
  ogDescription: "A team at Prosus built web agents to help automate food ordering processes across their e-commerce platforms. Rather than relying on APIs, they developed web agents that could interact directly with websites, handling complex tasks like searching, navigating menus, and placing orders. Through iterative development and optimization, they achieved an 80% success rate target for specific e-commerce tasks by implementing a modular architecture that separated planning and execution, combined with various operational modes for different scenarios."
---

## Overview

This case study comes from a podcast discussion featuring the Prosus AI team, a large technology company that operates numerous e-commerce and consumer platforms including iFood (food delivery), OLX (classifieds marketplace), and others, collectively serving approximately two billion consumers worldwide. The discussion centers on their six-month journey building web agents for production use, specifically focusing on automating food ordering tasks. The conversation features insights from Kiara, an engineer who led the web agent development, along with other team members discussing the technical challenges and lessons learned.

## The Problem Space

Prosus recognized that a significant portion of e-commerce interactions happen through web interfaces rather than APIs. Their prediction that 10% of e-commerce transactions will be conducted by agents on behalf of consumers in the near future drove them to explore web agents as a critical capability. The fundamental challenge they faced was that most consumer-facing services—ordering food, booking flights, finding secondhand goods—don't have APIs designed for agent interaction. These experiences are built for human navigation through browsers, involving complex multi-step processes with dynamic content, popups, captchas, and interactive elements.

The team specifically tackled building an agent to help users order food, which sounds deceptively simple but involves understanding user context (dietary restrictions, location, time of day, local events), navigating multiple food platforms, advising on available options and promotions, and ultimately completing the ordering transaction.

## Evaluation of Existing Frameworks

The team extensively evaluated available web agent frameworks before building their own solution. They tested frameworks including Multion (described as "probably the most famous at the moment"), Web Voyager, Agent E, and various open-source projects from companies and research groups. Their findings were sobering:

The existing tools had significant limitations when applied to real-world production scenarios. Websites are built for humans, containing vast amounts of information not optimized for agent consumption. Dynamic content loading, enormous and changing DOM structures, and standard anti-bot measures like captchas all posed challenges. The Web Voyager benchmark, which many agents use for evaluation, showed that success rates varied dramatically between websites and tasks. Websites requiring many actions (like booking.com or Google Flights) proved particularly difficult because actions could trigger unexpected state changes—for example, selecting a departure airport might automatically change available destination options.

Critically, the team discovered that benchmark performance on datasets like Web Arena didn't translate to their actual use cases. Results were "super unpredictable"—the same task might succeed one time and fail the next. They frequently observed agents getting stuck in loops or simply not knowing what action to take next. Even multimodal vision models struggled with a fundamental challenge: understanding where on a webpage to click to execute a desired action, translating intent into specific coordinates.

## Building a Custom Framework

Given the limitations of existing tools, the team built their own web agent framework optimized for their specific use case. The architecture follows a planner-executor pattern, which represents an emerging best practice in agentic systems.

### Architecture Components

The core insight is that a web agent fundamentally mirrors API-based agents: it has access to information (screenshots, DOM content, browser state) and can take actions (clicking, typing, scrolling) which function as tools. However, the team made several key design decisions:

**Planner-Executor Separation**: They used distinct models for planning versus execution. Planning requires sophisticated reasoning to understand user intent and devise multi-step strategies—models like Claude's reasoning capabilities or similar were preferred here. Execution, by contrast, operates in a constrained action space and doesn't require deep reasoning; it needs reliable action selection and the ability to recognize task completion.

**Three Operational Modes**: The team implemented three modes to optimize for speed and reliability:
- **Traditional Mode**: Full screenshot capture and DOM loading, with the agent deciding each action. Used for unfamiliar pages or complex situations.
- **Fast Mode**: Skips screenshots for pages the agent has seen before. If the task is similar to previous successful runs, the agent knows where to click based on stored trajectories rather than visual analysis.
- **Reflex Mode**: Pure deterministic automation—essentially macros for completely predictable sequences. If part of a workflow can be automated without any agent reasoning, this mode handles it directly.

The system falls back gracefully: it attempts fast approaches first, and if those fail, progressively uses slower but more thorough methods.

### DOM Processing and Tool Design

A significant engineering effort went into DOM cleaning. Raw webpage DOMs contain enormous amounts of irrelevant information. The team filtered to only clickable elements and essential content, dramatically reducing the context the agent needed to process.

Tool design followed a principle of minimizing agent choices. They merged tools that were always used together—for example, combining "type text" and "press enter" into a single search tool, since you essentially never type without submitting. This reduced the decision space and improved reliability.

Scrolling proved particularly challenging. Long restaurant menus or product lists required sophisticated scrolling strategies to capture all relevant information. The team adopted and refined techniques from open-source frameworks but optimized them for their specific use case.

### Trajectory Learning and Simulation

A powerful aspect of web-based agents is the ability to simulate and explore. The team sent agents to explore websites like web crawlers, defining success states (e.g., "found the item" or "added to cart") and running tasks many times to learn successful trajectories. Out of 20 attempts at a given task, they would analyze which paths succeeded.

Successful trajectories were stored—including the path taken and page states encountered—creating a form of learned navigation expertise. This persistent memory allowed the agent to become "familiar" with websites over time, moving from exploration to expertise. The storage mechanism itself wasn't critical as long as it was privacy-compliant, but having this historical data dramatically improved performance on repeated interactions.

## Key Production Lessons

### Software Engineering Over Data Science

Perhaps the most important lesson, emphasized by Kiara, was approaching this as a software engineering problem rather than a data science one. This meant:

- Keeping systems modular with clear separation of responsibilities
- Maximizing deterministic components where possible
- Limiting LLM calls to only where truly necessary
- Having control over system behavior rather than delegating everything to agents

A concrete example: the team initially built an agent to query user databases for dietary restrictions. They realized this was unnecessary—the data could simply be pulled and added to context deterministically. This revelation simplified the system and increased reliability.

### Specificity in Instructions

The execution agent needed extremely detailed, broken-down instructions from the planner. The more thinking delegated to the planning phase, the better the executor performed. Instructions should specify each step clearly: "open the OLX page, then search in the bar for X, then..."

### Dynamic Tool Selection

Rather than giving the agent access to all possible tools at all times, the team dynamically limited available tools based on the current page and task context. If you only need certain interactions on a particular page, only those tools should be available.

### Platform-Specific Prompting

Instructions were loaded dynamically based on which platform the agent was interacting with. Different food delivery apps have different flows, and the agent's prompts adapted accordingly.

## Evaluation and Benchmarking

The team established representative e-commerce interaction tasks as their evaluation suite, then added variations to stress-test the system. Their target was 80% success rate, though they acknowledged this heavily depends on task complexity and website design.

They found that user behavior significantly impacted success—agents couldn't order food without an address, so the planning layer needed to ensure all required information was collected before attempting execution. Deterministic validation of prerequisites before agent execution proved essential.

## Looking Forward: Agent-Friendly Web Design

An interesting thread in the discussion touched on how websites might evolve to better serve agents. The team observed some websites beginning to add markdown descriptions of pages—making it much faster for agents to load and understand content, especially on e-commerce pages with many items. This represents a shift toward designing web experiences not just for humans but for the agents that will increasingly act on their behalf.

The team also noted that as platform owners (rather than pure outsiders), they have access to valuable data not displayed on websites—seller reputation, location data, supply/demand dynamics, reasonable price ranges. Integrating this rich marketplace context with web agent capabilities could create significantly more powerful AI-first commerce experiences, rather than just automating human-style browsing.

## Balanced Assessment

The case study provides valuable production insights, though it's worth noting some limitations. Success rates (targeting 80%) may still be insufficient for fully autonomous high-stakes transactions. The solution required substantial custom engineering despite the proliferation of web agent frameworks, suggesting the technology remains immature for production deployment. The team's access to platform-level data and their ability to customize agent behavior for specific websites they control represents advantages not available to general-purpose web agent projects.

Nevertheless, their methodical approach—evaluating existing tools honestly, understanding their limitations, building modular systems with appropriate determinism, and treating this as engineering rather than pure ML—offers a realistic template for organizations attempting to deploy web agents in production environments.