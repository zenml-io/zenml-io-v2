---
title: "AI Agents for ML Experiment Orchestration: Reducing Friction in Machine Learning Workflows"
slug: "ai-agents-for-ml-experiment-orchestration-reducing-friction-in-machine-learning-workflows"
draft: false
llmopsTags:
  - "data-analysis"
  - "agent-based"
  - "multi-agent-systems"
  - "mcp"
  - "error-handling"
  - "cost-optimization"
  - "human-in-the-loop"
  - "api-gateway"
  - "orchestration"
  - "scaling"
  - "open-source"
  - "documentation"
  - "amazon-aws"
industryTags: "media-entertainment"
company: "Teads"
summary: "Teads, a digital advertising technology company, enhanced their ML experiment platform \"Datakinator\" by integrating AI agents through MCP (Model Context Protocol) to automate the configuration and orchestration of machine learning experiments. The platform, which already orchestrated hyperparameter tuning, feature selection, and model training at scale using cloud GPUs, was made significantly more accessible by allowing data scientists to use AI agents to handle tedious tasks like parameter selection and feature configuration. After enriching the agent with context tools for probing datasets and error retrieval, the system enabled autonomous experimentation that corrected its own failures. Within 48 hours of release, over 200 experiments were launched, leading to 5-10% uplift in offline metrics across multiple models and approximately $1M in direct margin gains, despite temporary cloud cost spikes that were subsequently managed with cost estimation controls."
link: "https://medium.com/teads-engineering/we-let-ai-agents-orchestrate-our-ml-experiments-fc8606816fde"
year: 2026
seo:
  title: "Teads: AI Agents for ML Experiment Orchestration: Reducing Friction in Machine Learning Workflows - ZenML LLMOps Database"
  description: "Teads, a digital advertising technology company, enhanced their ML experiment platform \"Datakinator\" by integrating AI agents through MCP (Model Context Protocol) to automate the configuration and orchestration of machine learning experiments. The platform, which already orchestrated hyperparameter tuning, feature selection, and model training at scale using cloud GPUs, was made significantly more accessible by allowing data scientists to use AI agents to handle tedious tasks like parameter selection and feature configuration. After enriching the agent with context tools for probing datasets and error retrieval, the system enabled autonomous experimentation that corrected its own failures. Within 48 hours of release, over 200 experiments were launched, leading to 5-10% uplift in offline metrics across multiple models and approximately $1M in direct margin gains, despite temporary cloud cost spikes that were subsequently managed with cost estimation controls."
  canonical: "https://www.zenml.io/llmops-database/ai-agents-for-ml-experiment-orchestration-reducing-friction-in-machine-learning-workflows"
  ogTitle: "Teads: AI Agents for ML Experiment Orchestration: Reducing Friction in Machine Learning Workflows - ZenML LLMOps Database"
  ogDescription: "Teads, a digital advertising technology company, enhanced their ML experiment platform \"Datakinator\" by integrating AI agents through MCP (Model Context Protocol) to automate the configuration and orchestration of machine learning experiments. The platform, which already orchestrated hyperparameter tuning, feature selection, and model training at scale using cloud GPUs, was made significantly more accessible by allowing data scientists to use AI agents to handle tedious tasks like parameter selection and feature configuration. After enriching the agent with context tools for probing datasets and error retrieval, the system enabled autonomous experimentation that corrected its own failures. Within 48 hours of release, over 200 experiments were launched, leading to 5-10% uplift in offline metrics across multiple models and approximately $1M in direct margin gains, despite temporary cloud cost spikes that were subsequently managed with cost estimation controls."
notion:
  pageId: "348f8dff-2538-805b-b068-d20fcbd958c6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-20T06:48:00.000Z"
  lastEditedTime: "2026-04-20T06:48:00.000Z"
  publishedAt: "2026-04-20T06:51:30Z"
---

## Overview

Teads, a digital advertising technology company, developed a case study around enhancing their machine learning experimentation platform called "Datakinator" with AI agent capabilities. The implementation demonstrates a practical application of LLMs in production for automating and streamlining ML workflows, specifically focusing on reducing friction in the experiment configuration and orchestration process. While the case study presents impressive claimed results—including approximately $1M in margin gains—it's important to note that this comes from a company blog post and should be evaluated with appropriate skepticism regarding the exact attribution of value and the generalizability of results.

The fundamental problem Teads addressed was making their sophisticated ML experimentation platform more accessible and reducing the cognitive overhead for data scientists. Datakinator was already a mature platform capable of orchestrating complex ML workflows including hyperparameter optimization, feature selection, and distributed model training across hundreds of GPUs, but the configuration process remained tedious and error-prone despite having a user interface.

## The Datakinator Platform Foundation

Before diving into the LLMOps aspects, it's important to understand the existing infrastructure that the AI agents were built upon. Datakinator serves as an orchestration layer for ML experiments, managing the entire lifecycle from data processing through training to evaluation. The platform handles varying complexity levels—from simple single training runs to complex hyperparameter tuning workflows involving forward feature selection, grid search, and successive halving algorithms.

The platform leverages cloud infrastructure extensively, with the ability to provision hundreds of GPUs dynamically without performance degradation. This scalability foundation was critical to the eventual success of the agent-driven approach, as it meant the infrastructure could handle the explosive growth in experiment volume once friction was reduced.

The evolution of Datakinator itself provides interesting context. Initially, it required users to work through Scala notebooks on the cloud, which introduced significant friction—15-minute startup times and the need to repeatedly restart notebooks for long-running experiments. This resulted in only a few hundred experiments annually. The addition of a UI increased adoption to over 3,000 experiments per year, demonstrating that reducing friction at each stage had exponential effects on usage and value extraction.

## LLM Integration Architecture

The AI agent integration was implemented through the Model Context Protocol (MCP), a framework for connecting LLMs to external tools and data sources. Teads embedded their existing API into an MCP server, exposing relevant routes to the agent. The initial implementation is described as taking "less than an hour" with a coding agent, though this timeline should be viewed skeptically as it likely represents the initial proof-of-concept rather than a production-ready system.

The architecture represents a classic tool-use pattern where the LLM acts as an orchestration layer that can invoke API endpoints to perform actions. The key insight from Teads' implementation was that simply exposing the existing API wasn't sufficient—the agents needed additional context tools to be effective.

## Iteration Process and Context Engineering

The first iteration of the agent system exposed the core API routes and demonstrated basic functionality. Users could describe what they wanted in natural language, and the agent could translate this into API calls to configure and launch experiments. However, this initial version exhibited several failure modes typical of production LLM systems: using incorrect dates, referencing features that didn't exist in specific datasets, and making configuration errors that a human with domain knowledge would avoid.

This led to a critical second iteration focused on what might be called "context engineering." Teads enriched the MCP with additional tools specifically designed to help the agent gather necessary context before taking actions. These included:

- Dataset probing capabilities allowing the agent to explore available features and their properties
- Error retrieval functionality to examine failures from previous runs
- Access to feature metadata and documentation
- Contextual information about model configurations and requirements

This represents a sophisticated approach to agent design that goes beyond simple API wrapping. The system was designed to enable the agent to perform reconnaissance and gather information before making decisions, mimicking how a human data scientist would explore the available options before configuring an experiment.

The improvement in capabilities after adding context tools was significant. The agent became capable of autonomous error correction—it could detect failed runs, diagnose the issue by retrieving error information, archive the failed attempt, correct the configuration, and relaunch the experiment. This closed-loop capability is a hallmark of more advanced agent systems and demonstrates genuine autonomous operation rather than simple command execution.

## Cost Management and Guardrails

An interesting aspect of the production deployment was the emergence of cost management as a critical concern. When the enhanced agent system was released to data scientists, adoption was immediate and enthusiastic. Within 48 hours, over 200 experiments were launched, representing a dramatic increase in platform utilization. Given that Datakinator can provision hundreds of GPUs for experiments, this surge in usage predictably caused cloud costs to spike significantly.

Teads' response demonstrates practical LLMOps thinking around guardrails and safety mechanisms. They added a cost estimation tool to the agent's toolkit, requiring the agent to calculate expected costs before launching expensive experiments and obtain explicit permission from users. For experiments exceeding certain thresholds, the agent was programmed to refuse execution entirely. This represents a production-grade consideration often missing from proof-of-concept agent systems—economic guardrails are as important as technical ones.

The cost spike itself is worth examining critically. While the case study frames this as a manageable side effect of success, it represents a real operational challenge. Organizations implementing similar systems need to carefully consider the economic implications of dramatically reducing friction in resource-intensive operations. The fact that costs spiked before guardrails were implemented suggests the initial deployment may have been somewhat rushed, though this is speculation.

## Results and Business Impact

Teads claims several significant outcomes from the agent-enhanced system. The most concrete metric is the increase in experiment volume—from approximately 3,000 experiments per year with the UI to over 200 experiments in just 48 hours after agent deployment, suggesting a potential annualized rate many times higher if sustained. This represents a dramatic reduction in friction for launching experiments.

More significantly, they claim to have discovered 5-10% uplifts in offline metrics across multiple models, particularly for "less optimized" models that were in a "good enough" state. The case study attributes this to the reduced friction enabling exploration of feature combinations and parameter settings that were previously not worth the manual effort. This framing is plausible—there's often a long tail of potential improvements that aren't pursued because the juice isn't worth the squeeze in terms of data scientist time.

The claimed $1M in "direct margin gain" should be viewed with healthy skepticism. Attribution of business value to specific technical improvements is notoriously difficult, especially in complex systems like advertising optimization. The case study doesn't provide detailed methodology for how this value was calculated or isolated from other factors. It's possible this represents a theoretical calculation based on the offline metric improvements applied to their total transaction volume, which may or may not translate to actual realized gains.

That said, the directionality of the impact is likely real even if the exact numbers are inflated. Reducing friction in ML experimentation almost certainly leads to discovering improvements that wouldn't have been found otherwise, and in a high-volume business like digital advertising, even small percentage improvements can translate to meaningful revenue impacts.

## Technical Evaluation and Tradeoffs

From an LLMOps perspective, several aspects of this implementation are noteworthy. The use of MCP as an integration layer is a pragmatic choice that leverages existing standards rather than building custom infrastructure. This likely contributed to the rapid initial implementation, though it also means the system is constrained by MCP's capabilities and limitations.

The emphasis on context tools represents sophisticated thinking about agent design. Many production agent systems fail because they're essentially LLMs with function calling bolted on, without careful consideration of what information the agent needs to make good decisions. Teads' approach of iteratively adding tools based on observed failure modes is a practical methodology that others could learn from.

However, several questions remain unanswered in the case study. What LLM model is being used? How is prompt engineering handled? What's the error rate of agent-launched experiments compared to human-configured ones? How do data scientists review and approve agent suggestions before execution? The lack of these technical details makes it difficult to fully evaluate the implementation or reproduce similar results.

The reliance on a proprietary platform (Datakinator) also means this approach isn't directly transferable. Organizations would need comparable infrastructure—API-driven ML orchestration with significant existing automation—for a similar implementation to make sense. This isn't a pattern that would work for teams doing ad-hoc experimentation without mature MLOps foundations.

## Workflow Integration and User Experience

The case study emphasizes how agent integration removed "final layers of friction" from ML workflows, enabling data scientists to focus on architecture and strategy rather than configuration details. This framing positions the agents as automation tools rather than replacement for human expertise—the humans still make strategic decisions while the agents handle tactical execution.

This is probably the most sustainable and realistic framing for production AI agents in technical workflows. Rather than replacing data scientists, the system amplifies their productivity by eliminating tedious tasks. The described workflow seems to be: data scientist articulates intent in natural language, agent translates to API calls while gathering necessary context, agent proposes configuration (potentially with cost estimate), human approves, agent executes and monitors.

The claim that adoption was immediate and enthusiastic ("data scientists fell in love with it") should be taken with a grain of salt given the marketing nature of the blog post. However, the dramatic increase in usage provides some objective evidence that the system was well-received and seen as valuable by users.

## Production Operations and Reliability

One aspect notably absent from the case study is discussion of production operations, monitoring, and reliability. How often do agent-configured experiments fail compared to baseline? How are failures handled? What monitoring and alerting is in place? How is the agent's performance tracked over time?

The mention of the agent being able to detect and correct its own failures is promising from a reliability standpoint, but this capability also has risks. Autonomous retry loops without proper guardrails could lead to runaway resource consumption or repeated failures that burn through budget without human intervention.

The cost management guardrails described suggest Teads learned some of these lessons the hard way during initial deployment. The evolution from "it worked great" to "costs spiked" to "we added cost controls" is a common pattern in production AI systems and demonstrates the importance of comprehensive guardrails beyond just technical correctness.

## Broader Implications and Generalization

This case study represents an interesting data point in the evolution of LLMOps practices, specifically around using LLMs to orchestrate other ML systems. The pattern of using agents to wrap existing APIs and automate complex workflows is likely to become more common as organizations seek to extract more value from their ML investments.

However, several factors limit the generalizability of these results. First, Teads had mature MLOps infrastructure already in place—the agents were automating an already-automated system, not replacing manual processes. Second, the domain (ML experimentation) is relatively well-structured with clear APIs and defined workflows, making it more amenable to agent automation than less structured tasks. Third, the scale of Teads' operations means the ROI calculation works even with substantial agent development costs and some operational overhead.

Organizations considering similar implementations should carefully evaluate whether they have the prerequisite infrastructure and scale to make this pattern worthwhile. For smaller teams or less mature ML practices, the overhead of building and maintaining agent systems might outweigh the benefits.

## Critical Assessment

The case study is ultimately a marketing piece from Teads Engineering, which means the narrative is inevitably selective and emphasizes successes while downplaying challenges. The claimed $1M ROI figure is particularly suspect without more detailed methodology. The timeline of implementation ("less than an hour" for initial integration) is almost certainly simplified.

That said, the core technical approach appears sound and the general pattern of using LLM agents to reduce friction in ML workflows is credible and likely effective when properly implemented. The emphasis on iterative development, context engineering, and guardrails demonstrates practical production thinking rather than pure hype.

The case study would be significantly more valuable with additional technical details: specific LLM models used, failure rates, prompt engineering approaches, evaluation methodologies, and more granular metrics on experiment success rates and resource utilization. Without these details, it's difficult to separate genuine innovation from marketing narrative.

From an LLMOps perspective, this represents a useful pattern for organizations with mature ML infrastructure looking to increase utilization and reduce friction. The key insights—that simple API wrapping isn't enough, that context tools are critical, and that cost/resource guardrails are essential—are broadly applicable lessons for production agent systems.
