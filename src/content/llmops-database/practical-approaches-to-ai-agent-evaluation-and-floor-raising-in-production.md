---
title: "Practical Approaches to AI Agent Evaluation and Floor Raising in Production"
slug: "practical-approaches-to-ai-agent-evaluation-and-floor-raising-in-production"
draft: false
llmopsTags:
  - "healthcare"
  - "fraud-detection"
  - "customer-support"
  - "code-generation"
  - "prompt-engineering"
  - "agent-based"
  - "evals"
  - "error-handling"
  - "monitoring"
  - "open-source"
  - "documentation"
  - "openai"
  - "anthropic"
  - "meta"
industryTags: "tech"
company: "Raindrop"
summary: "Raindrop's CTO presents practical lessons from observing real-world AI agent deployments across finance, healthcare, and defense sectors. The talk challenges conventional evaluation approaches inherited from the chatbot era, arguing that static benchmark-style evaluations don't scale for modern agentic systems. Instead, the company advocates for \"raising the floor\" by focusing on preventing critical failures rather than maximizing ceiling capabilities. Their solution involves production monitoring similar to Sentry, treating evaluations as code-based tests rather than cloud-managed prompts, and using deterministic signals to trigger agent-based investigation rather than asking agents to detect anomalies directly. The approach emphasizes understanding when issues started and how many users they affect, with different strategies for high-volume versus low-volume deployments."
link: "https://www.youtube.com/watch?v=jHMiYtjoJfA"
year: 2026
seo:
  title: "Raindrop: Practical Approaches to AI Agent Evaluation and Floor Raising in Production - ZenML LLMOps Database"
  description: "Raindrop's CTO presents practical lessons from observing real-world AI agent deployments across finance, healthcare, and defense sectors. The talk challenges conventional evaluation approaches inherited from the chatbot era, arguing that static benchmark-style evaluations don't scale for modern agentic systems. Instead, the company advocates for \"raising the floor\" by focusing on preventing critical failures rather than maximizing ceiling capabilities. Their solution involves production monitoring similar to Sentry, treating evaluations as code-based tests rather than cloud-managed prompts, and using deterministic signals to trigger agent-based investigation rather than asking agents to detect anomalies directly. The approach emphasizes understanding when issues started and how many users they affect, with different strategies for high-volume versus low-volume deployments."
  canonical: "https://www.zenml.io/llmops-database/practical-approaches-to-ai-agent-evaluation-and-floor-raising-in-production"
  ogTitle: "Raindrop: Practical Approaches to AI Agent Evaluation and Floor Raising in Production - ZenML LLMOps Database"
  ogDescription: "Raindrop's CTO presents practical lessons from observing real-world AI agent deployments across finance, healthcare, and defense sectors. The talk challenges conventional evaluation approaches inherited from the chatbot era, arguing that static benchmark-style evaluations don't scale for modern agentic systems. Instead, the company advocates for \"raising the floor\" by focusing on preventing critical failures rather than maximizing ceiling capabilities. Their solution involves production monitoring similar to Sentry, treating evaluations as code-based tests rather than cloud-managed prompts, and using deterministic signals to trigger agent-based investigation rather than asking agents to detect anomalies directly. The approach emphasizes understanding when issues started and how many users they affect, with different strategies for high-volume versus low-volume deployments."
notion:
  pageId: "3c1f8dff-2538-80e9-be71-d3deb5e4ce05"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T08:52:00.000Z"
  lastEditedTime: "2026-08-19T08:52:00.000Z"
  publishedAt: "2026-08-19T09:15:00Z"
---

## Overview

Raindrop is a production monitoring and evaluation platform for AI agents, founded by a team that also maintains Workshop, an open-source tracing tool. The company's position provides visibility into how leading AI companies and Fortune 100 organizations are actually deploying and maintaining agent systems in production. This presentation from their CTO offers a critical perspective on the gap between academic and industry discourse around AI evaluation versus what actually works at scale in production environments.

The fundamental thesis challenges the prevailing "eval discourse" that dominates online conversations about AI systems. The speaker argues that most evaluation advice is stuck in what they call the "chatbot era" when systems were primarily next-token prediction models with limited flexibility. In that simpler time, evaluation could focus on fact-checking and verifying that systems returned correct answers to well-understood questions. However, modern agentic systems that operate autonomously, use tools, and explore creative solutions in unpredictable ways require fundamentally different approaches.

## The Ceiling vs Floor Framework

Central to Raindrop's philosophy is distinguishing between "benchmark maxing" and "floor raising." The ceiling represents the best possible capabilities an agent might demonstrate—emergent behaviors and impressive capabilities that exceed expectations. The floor represents the worst possible outcomes: recommending competitors, deleting data, sending inappropriate emails, or other trust-breaking failures. While model labs focus heavily on pushing the ceiling higher through benchmarks, companies deploying agents in production must prioritize raising the floor to maintain user trust and prevent catastrophic outcomes.

This distinction reflects different responsibilities and tools available to labs versus downstream companies. Labs create general-purpose models and measure progress through benchmarks. Companies embedding these models into products must handle domain-specific knowledge, data schemas, access patterns, and real user consequences when things fail. The speaker notes that labs and companies use the same language around "evals" but mean completely different things, creating confusion in the industry.

## The Limitations of Traditional Evaluation Approaches

The presentation strongly criticizes what's termed "big eval"—the industry push toward creating large static evaluation datasets similar to academic benchmarks. The speaker observes that very few production teams actually maintain thousand-item evaluation datasets, and those who do find them brittle. These evaluations break whenever models change, when tool configurations shift, or when switching between different agent frameworks. For instance, evaluations designed to verify specific tool-calling patterns might become useless when migrating from one agent harness to another.

The fundamental problem is that the AI landscape continues changing rapidly. Investing months in comprehensive static evaluation sets creates technical debt that slows teams down rather than providing safety. The speaker provocatively asks whether teams actually delay production model upgrades by two weeks to update their evaluation sets—implying most don't, which reveals these evaluations as "theater" rather than practical safety measures.

Traditional prompt playgrounds and cloud-managed prompt systems have largely fallen out of favor. The speaker notes that very few companies still use managed prompt services where prompts are stored and tested in the cloud separate from code. Modern agents are too complex—the "prompt" is really the entire system including all code, tool configurations, and the agent harness itself. This complexity means evaluations should look much more like software tests than prompt validation.

## Code-Based Testing Approaches

Raindrop advocates for treating agent evaluations as code, specifically as unit tests and end-to-end tests that run locally. The speaker references Vercel's "Vitest evals" package as an exemplary approach—essentially the standard Vitest testing framework with syntactic sugar for AI-specific concerns. OpenAI internally calls similar approaches "macro evals." Regardless of terminology, the key insight is that evaluations should be version-controlled code that runs in development environments, not separate systems.

This approach scales better because it integrates with existing software development workflows. When code changes, tests run. When tests fail, developers investigate. The same mental models and tooling that work for traditional software apply to agent systems. This contrasts sharply with separate evaluation platforms that require context-switching and don't integrate with continuous integration pipelines.

## Production Monitoring and Issue Detection

Beyond offline evaluation, Raindrop's core product focuses on production monitoring, positioning itself as "Sentry for agents." The system detects critical issues in production agents, verifies that fixes work without unexpected side effects, and simulates changes before production deployment based on past behavior. This approach recognizes that comprehensive offline testing cannot catch all problems—production monitoring is essential.

Three key principles guide their issue detection philosophy:

**Understanding issue context requires two critical pieces of information:** when the issue started and what percentage of users it affects. Knowing when an issue started helps teams correlate it with recent changes—model updates, configuration changes, or downstream dependency modifications. The percentage of users affected determines prioritization. An issue affecting three users versus 100,000 users demands radically different response urgency. Agents inherently have infinite potential failure modes given their stochastic, exploratory nature, so triage based on impact is essential.

**Clustering is not sufficient for issue identification.** A naive approach to agent monitoring involves clustering all traces to identify patterns. While useful for one-off analysis, clustering doesn't scale for ongoing production monitoring. Clusters are difficult to track reliably over time—a problem known in research as temporal clustering. Cluster boundaries lack semantic meaning specific to the product, leading to over-general categories like "price issues" that might encompass multiple unrelated problems with different root causes. This differs from traditional software telemetry, where teams don't simply cluster all logs but instead define specific error categories and track them over time.

**Code-mode classifiers scale better than clustering.** Instead of unsupervised clustering, Raindrop advocates writing explicit classifiers in code that run against traces. These classifiers can execute in sandboxes at production scale. This approach relates to the broader "code mode" concept gaining traction through initiatives like Model Context Protocol. Writing classifiers as code provides precise control over issue definitions, version control for evolving classifications, and clear boundaries that reflect product-specific semantics.

## Agents Investigating Anomalies, Not Detecting Them

A particularly nuanced insight addresses the role of AI agents in the monitoring system itself. The guidance is counterintuitive: don't ask agents to find anomalies, but rather have them investigate anomalies already detected through deterministic means. Agents perform poorly at anomaly detection—they struggle to reliably identify what's unusual in high-dimensional trace data. However, they excel at investigating specific anomalies once surfaced.

The recommended workflow uses deterministic signals like keyword frequency spikes to identify potential issues. A spike in particular keywords doesn't necessarily indicate a problem, but provides a concrete, tractable signal for agent investigation. The agent can then examine traces associated with the spike, understand context, and determine whether the anomaly represents an actual issue. This hybrid approach combines the reliability of deterministic detection with the flexibility of agent-based analysis.

## Scale-Dependent Strategies

The presentation emphasizes that appropriate strategies vary dramatically based on user scale. For products with millions of users generating tens or hundreds of millions of messages daily, experimentation and A/B testing become valuable tools. Teams can run experiments on small samples, particularly free-tier users, to evaluate changes before full rollout. Statistical significance becomes achievable with large sample sizes.

Conversely, for products with five to ten users—common in enterprise internal tools—experimentation makes no sense. These deployments often involve high-stakes decisions like providing critical information to executives. They require correctness despite low volume. The monitoring and evaluation strategy must emphasize different things: perhaps more intensive review of individual interactions, closer collaboration with the small user base, and different risk tolerances.

## The Open Source Workshop Tool

Raindrop maintains Workshop as an open-source tracing tool used by thousands of developers. Workshop's distinctive feature is that it enables self-healing loops—when the tool lacks a needed capability, agents using it can extend it. This meta-level capability where agents modify their own tooling represents an interesting approach to the extensibility problem common in agent frameworks.

The company also maintains howtoeval.com, described as a "no-bullshit guide" to what actually works in agent evaluation. This resource represents their attempt to distill practical lessons from working with production deployments into accessible guidance for the broader community.

## Real-World Deployment Context

The talk references agents being deployed across finance, healthcare, and defense—domains where failures carry significant consequences. The speaker notes that a year prior, agents barely existed as a category. The rapid evolution from simple chatbots to autonomous agents exploring their environments with tools has outpaced the evolution of evaluation and monitoring practices. Most public discourse still reflects chatbot-era thinking about simple question-answer validation.

Examples of floor-level failures mentioned include recommending competitors, deleting data, and sending inappropriate emails when agents have broader access than intended. The speaker references concerning issues like AI psychophancy that have already emerged in production systems. These represent the types of trust-breaking failures that prevent broader adoption and create societal concerns.

## Deployment Patterns and User Expertise

An important dimension for evaluation strategy is whether users are domain experts in what the agent does. The distinction between augmentation and replacement matters significantly. Tools like GitHub Copilot or Cursor tab-complete operate in augmentation mode—users are engineers who can recognize and correct mistakes. If the suggestion is wrong, users simply delete it.

In contrast, tools like Devin or hypothetical AI doctors operate more in replacement mode. Users may lack expertise to identify mistakes. The responsibility distribution shifts dramatically—how much does the system need to guarantee correctness versus relying on user judgment? This affects appropriate testing strategies, risk tolerance, and the types of guardrails needed.

Interestingly, even code-generation agents show different risk profiles. Claude Code CLI or similar tools that interact directly with engineers leave significant responsibility to users—if something fails, it might be a configuration issue on the user's end. But fully autonomous coding agents must handle more edge cases internally since they operate with less supervision.

## The Continual Learning Gap

The presentation opens by noting the irony that the talk track is titled "continual learning" but real-world production systems rarely implement continual learning. Labs and production systems don't widely deploy true continual learning loops where models update based on production feedback. This represents another gap between research discourse and production reality.

The absence of continual learning in production likely reflects both technical challenges and risk management concerns. Updating models based on production data creates feedback loops that could amplify biases or drift in unpredictable directions. The legal and compliance implications of models learning from user interactions remain murky in many domains. Most production systems therefore use static models, updated through explicit retraining rather than continuous adaptation.

## Philosophical Approach to Production AI

Throughout the presentation, Raindrop's philosophy emphasizes practical reality over aspirational best practices. The company tries to be "very honest" with themselves and customers about what works versus what doesn't, avoiding selling approaches that fail in practice even if they sound impressive. This pragmatism reflects the challenges of the current AI production landscape where best practices are still emerging and changing rapidly.

The emphasis on dialogue and learning from practitioners building agents reflects recognition that standardized solutions don't exist yet. Different products, scales, and domains require different approaches. The gap between what works at small scale versus massive scale is particularly pronounced. What makes sense for an internal enterprise tool with ten users bears little resemblance to what makes sense for a consumer product with millions of users.

The presentation concludes by inviting direct conversation rather than formal Q&A, suggesting the speaker values peer-to-peer knowledge sharing over one-directional knowledge transfer. This aligns with the broader theme that the field is still figuring out production AI together rather than applying established wisdom.
