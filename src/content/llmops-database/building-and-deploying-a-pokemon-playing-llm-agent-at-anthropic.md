---
title: "Building and Deploying a Pokemon-Playing LLM Agent at Anthropic"
slug: "building-and-deploying-a-pokemon-playing-llm-agent-at-anthropic"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67c9b26162e62d414abf69f9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:02:13.804Z"
  createdOn: "2025-03-06T14:34:09.346Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "chatbot"
  - "fine-tuning"
  - "prompt-engineering"
  - "agent-based"
  - "system-prompts"
  - "human-in-the-loop"
  - "langchain"
  - "fastapi"
  - "documentation"
  - "anthropic"
industryTags: "tech"
company: "Anthropic"
summary: "David Hershey from Anthropic developed a side project that evolved into a significant demonstration of LLM agent capabilities, where Claude (Anthropic's LLM) plays Pokemon through an agent framework. The system processes screen information, makes decisions, and executes actions, demonstrating long-horizon decision making and learning. The project not only served as an engaging public demonstration but also provided valuable insights into model capabilities and improvements across different versions."
link: "https://www.youtube.com/watch?v=nRHeGJwVP18"
year: 2023
seo:
  title: "Anthropic: Building and Deploying a Pokemon-Playing LLM Agent at Anthropic - ZenML LLMOps Database"
  description: "David Hershey from Anthropic developed a side project that evolved into a significant demonstration of LLM agent capabilities, where Claude (Anthropic's LLM) plays Pokemon through an agent framework. The system processes screen information, makes decisions, and executes actions, demonstrating long-horizon decision making and learning. The project not only served as an engaging public demonstration but also provided valuable insights into model capabilities and improvements across different versions."
  canonical: "https://www.zenml.io/llmops-database/building-and-deploying-a-pokemon-playing-llm-agent-at-anthropic"
  ogTitle: "Anthropic: Building and Deploying a Pokemon-Playing LLM Agent at Anthropic - ZenML LLMOps Database"
  ogDescription: "David Hershey from Anthropic developed a side project that evolved into a significant demonstration of LLM agent capabilities, where Claude (Anthropic's LLM) plays Pokemon through an agent framework. The system processes screen information, makes decisions, and executes actions, demonstrating long-horizon decision making and learning. The project not only served as an engaging public demonstration but also provided valuable insights into model capabilities and improvements across different versions."
---

## Overview

This case study comes from a podcast conversation between Demetrios and David Hershey, who works on the Applied team at Anthropic. The discussion covers two main topics: the "Claude Plays Pokemon" project as an example of building and evaluating autonomous agents, and broader insights about fine-tuning, prompting, and the evolution of agent capabilities in production LLM systems.

## The Claude Plays Pokemon Project

### Origins and Motivation

David Hershey developed the Pokemon-playing agent as a side project that began in June 2024. The project emerged from a practical need: while working with Anthropic customers building agents, Hershey wanted a personal playground to deeply understand agent development. He chose Pokemon specifically because it would be engaging enough to sustain long-term iteration—a key insight about maintaining motivation during complex technical projects.

The project started when another Anthropic employee had experimented with hooking up Claude to Pokemon, inspiring Hershey to build out his own agent frameworks. Since then, he has continuously iterated on the system with each new model release, tracking progress and improvements over time.

### Technical Architecture

The agent architecture is notably simple, with Hershey mentioning that he has actually stripped out complexity over time rather than adding it. The core components include:

**System Prompt**: A straightforward prompt telling the model it is playing Pokemon.

**Tool Access**: The agent has access to three primary tools:
- **Button Press Tool**: Allows the model to press standard game controls (A, B, Start, Select, directional buttons)
- **Knowledge Base Tool**: A self-managed persistent memory system embedded in the prompt that the model can add to, edit, and reference. This addresses the critical challenge of maintaining coherent behavior over thousands of actions.
- **Navigator Tool**: A simplified navigation helper that lets the model point to a location on screen and automatically moves the character there. This compensates for the model's limited spatial reasoning about the difference between current position and desired destination.

**Perception System**: After each button press, the agent receives a screenshot of the game state plus a structured dump of game data read directly from the emulator (current location, etc.). This combination of visual and structured data provides the model with the information needed to make decisions.

### Context Management and Long-Horizon Coherence

One of the most interesting LLMOps challenges in this project is managing context over extremely long interactions. At the time of the podcast recording, the agent had taken over 16,000 actions in just three days of public operation, with each action roughly corresponding to a screenshot and decision cycle.

The solution involves an accordion-style summarization approach: the agent takes approximately 30 actions, then the system generates a summary of that interaction block. This continues iteratively, compressing older information while maintaining the essential context needed for coherent play.

The knowledge base serves as a longer-horizon memory system, allowing the model to persist information like "Electric is super effective against water" across these summarization boundaries. Importantly, the model has full control over this knowledge base—it decides what to store and how to organize it.

### Model Progression as Evaluation

The Pokemon project unexpectedly became a valuable internal evaluation tool at Anthropic. Traditional benchmarks like MMLU and GPQA typically test single prompt-response pairs, but they fail to capture a model's ability to take in new information, try different approaches, and make meaningful progress over extended periods.

Pokemon provides a natural evaluation framework for these long-horizon capabilities. Progress markers like beating gym leaders serve as concrete milestones that emerge after hours of coherent decision-making. The project revealed significant differences between model versions:

- **Sonnet 3.5 (June 2024)**: Could perform basic actions, got out of the starting house, meandered around
- **Sonnet 3.5 New (October 2024)**: Made more progress, got a starter Pokemon, advanced further but still struggled
- **Current Model (early 2025)**: Reached the breakthrough point where meaningful, sustained progress became possible

The improvement wasn't obvious from standard benchmarks but was immediately apparent in this applied context—a lesson about the gap between benchmark performance and real-world capability.

## Broader LLMOps Insights on Fine-Tuning

The conversation pivots to discuss fine-tuning in production, where Hershey leads a team at Anthropic. His perspective is notably cautious despite his role specifically involving fine-tuning work.

### The Case Against Premature Fine-Tuning

Hershey strongly advocates exhausting prompting approaches before considering fine-tuning. He notes that many teams believe they've reached the limits of prompting when they haven't actually pushed far enough. The rapid iteration cycle of prompting (minutes) compared to training (weeks) makes it the more efficient approach for most use cases.

There's a "mysterious promise of fine-tuning" that can trap teams: the assumption that feeding data into the machine learning system will automatically improve results. In practice, Hershey reports seeing models get worse more often than better when training on average datasets. The process of identifying what data will actually impact desired behavior is genuinely difficult and not obvious.

### When Fine-Tuning Makes Sense

Hershey identifies three categories where fine-tuning can be appropriate:

**Cost Optimization (with caveats)**: Training smaller models to match larger model capabilities can work, but comes with a significant caveat. Model development moves so quickly that a cheaper, smarter model often arrives within months simply through waiting. The developer time invested in fine-tuning could have been spent elsewhere while the problem solved itself. This works best when the math clearly favors investment—saving millions of dollars for a smaller upfront cost—but requires honest assessment of opportunity costs.

**Format and Data Understanding**: Simpler fine-tuning tasks like teaching models to follow specific output formats, understand particular input data structures, or perform classification on domain-specific text tend to have better success rates. These are cases where the model's general capabilities are sufficient but need calibration to specific data patterns.

**Research-Level Capability Enhancement**: Actually making a strong model meaningfully better at a task is extremely difficult—essentially a research project rather than an engineering one. This is why research labs hire talented people specifically for this work. Unless an organization truly needs that last 5% improvement for competitive differentiation, this approach is rarely worth the investment.

## Agent Evolution and Reliability Thresholds

The discussion explores how agent capabilities are evolving and what drives their adoption. A key insight is the concept of reliability thresholds: there's a dramatic difference between agents that mostly work but occasionally fail (requiring human verification of everything) versus agents that work reliably enough that users can trust their output.

Coding agents exemplify this transition. With the updated Sonnet 3.5 release in October 2024, coding agents reached a tipping point where they went from "cute to play with" to genuinely useful. The difference isn't just incremental improvement—it's categorical. When an agent fails occasionally, users must fully understand the context to diagnose problems, often negating time savings. When reliability crosses a threshold, the entire user experience transforms.

Hershey predicts this pattern will repeat across different domains: a model releases, someone building an agent in a specific category discovers it suddenly works, and that category explodes in adoption within weeks. He speculates that legal workflows, accounting, and spreadsheet manipulation could be future candidates, but admits that even with insider knowledge, predicting exactly which capabilities will cross the threshold with which model is very difficult.

### Prompt Brittleness Across Model Versions

An interesting operational challenge emerges from model upgrades: prompts often need significant revision when moving to new models. With Pokemon, the most common change when testing new models was deleting prompt content—removing band-aids that compensated for previous limitations that no longer exist.

This reflects how improvements often come in unexpected small capabilities rather than obvious large ones. A model might not learn physics overnight, but it might get slightly better at clicking specific cells in a spreadsheet—a minor benchmark improvement that enables entirely new workflows.

## Infrastructure Simplification

The conversation concludes with observations about how LLMOps has simplified compared to traditional MLOps. The managed API approach—where labs handle training, inference, scaling, and serving—eliminates enormous operational complexity. Organizations that embrace this rather than building internal infrastructure can move much faster.

Token-based pricing represents a fundamental shift from GPU-based cost structures. Pay-per-use, on-demand access to inference removes the need to manage GPU clusters, optimize serving infrastructure, or handle scaling. For most use cases, this managed approach is far more practical than self-hosting.

The skills that remain relevant from traditional ML backgrounds include experimental rigor, dataset construction, systematic evaluation, and understanding how to iterate effectively on stochastic systems. The gradient descent has been outsourced, but the discipline around experimentation remains essential.