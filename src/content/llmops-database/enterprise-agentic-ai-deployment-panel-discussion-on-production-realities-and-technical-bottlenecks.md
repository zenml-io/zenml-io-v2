---
title: "Enterprise Agentic AI Deployment: Panel Discussion on Production Realities and Technical Bottlenecks"
slug: "enterprise-agentic-ai-deployment-panel-discussion-on-production-realities-and-technical-bottlenecks"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908f2dad56db378b1eba614"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:56.258Z"
  createdOn: "2025-11-03T18:22:18.097Z"
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "code-generation"
  - "customer-support"
  - "high-stakes-application"
  - "rag"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "few-shot"
  - "error-handling"
  - "evals"
  - "crewai"
  - "security"
  - "guardrails"
  - "documentation"
  - "compliance"
  - "google-gcp"
industryTags: "tech"
company: "Various"
summary: "This panel discussion features leaders from Writer, You.com, Glean, and Google discussing the current state of deploying agentic AI systems in enterprise environments. The panelists address the gap between prototype development (which can now take 90 seconds) and production-ready systems that Fortune 500 companies can rely on. They identify key technical bottlenecks including data quality and governance issues, information retrieval challenges, function calling limitations, security vulnerabilities, and the difficulty of verifying agent actions. The consensus is that while every large enterprise has built some AI agents adding business value, they are far from having 50% of enterprise work handled by AI, with action agents for larger enterprises likely requiring several more years for major adoption."
link: "https://www.youtube.com/watch?v=2-LEFdSThY0"
year: 2025
seo:
  title: "Various: Enterprise Agentic AI Deployment: Panel Discussion on Production Realities and Technical Bottlenecks - ZenML LLMOps Database"
  description: "This panel discussion features leaders from Writer, You.com, Glean, and Google discussing the current state of deploying agentic AI systems in enterprise environments. The panelists address the gap between prototype development (which can now take 90 seconds) and production-ready systems that Fortune 500 companies can rely on. They identify key technical bottlenecks including data quality and governance issues, information retrieval challenges, function calling limitations, security vulnerabilities, and the difficulty of verifying agent actions. The consensus is that while every large enterprise has built some AI agents adding business value, they are far from having 50% of enterprise work handled by AI, with action agents for larger enterprises likely requiring several more years for major adoption."
  canonical: "https://www.zenml.io/llmops-database/enterprise-agentic-ai-deployment-panel-discussion-on-production-realities-and-technical-bottlenecks"
  ogTitle: "Various: Enterprise Agentic AI Deployment: Panel Discussion on Production Realities and Technical Bottlenecks - ZenML LLMOps Database"
  ogDescription: "This panel discussion features leaders from Writer, You.com, Glean, and Google discussing the current state of deploying agentic AI systems in enterprise environments. The panelists address the gap between prototype development (which can now take 90 seconds) and production-ready systems that Fortune 500 companies can rely on. They identify key technical bottlenecks including data quality and governance issues, information retrieval challenges, function calling limitations, security vulnerabilities, and the difficulty of verifying agent actions. The consensus is that while every large enterprise has built some AI agents adding business value, they are far from having 50% of enterprise work handled by AI, with action agents for larger enterprises likely requiring several more years for major adoption."
---

## Overview

This panel discussion brings together senior leaders from multiple AI companies to discuss the practical realities of deploying agentic AI systems in enterprise production environments. The panelists include May Habib from Writer, Richard Socher from You.com, Arvind Jain from Glean, and Burak Gokturk from Google. The conversation provides a balanced and sometimes sobering assessment of where enterprises actually are in their AI adoption journey, contrasting the hype around rapid prototyping capabilities with the complex operational realities of production deployments.

The discussion centers on a critical tension in the current AI landscape: while it's now possible to go from idea to working prototype in approximately 90 seconds without designers, engineers, or product managers, the reality of what has actually scaled beyond generic chatbots in enterprise settings is "very, very different," as Habib notes. This gap between prototype and production represents one of the central challenges in contemporary LLMOps.

## Current State of Enterprise Adoption

The panelists provide a nuanced picture of where Fortune 500 and Global 2000 companies currently stand with agentic AI deployment. Arvind Jain notes that readiness varies significantly from enterprise to enterprise, with some organizations more eager to experiment and more willing to forgo strict governance and oversight than others. He estimates that virtually every company in the Global 2000 or Fortune 500 has built at least a few agents that are adding some business value, but emphasizes that enterprises are "nowhere close" to having 50% of their work happening with AI.

Richard Socher observes that while large language models are becoming "incredibly smart" and there will "never be an AI winter again," there remains a significant gap between prototyping with the latest code generation capabilities and building systems that companies can actually rely on. The transition from prototype to production reality involves confronting numerous data problems, permission issues, and access control challenges that companies must resolve before knowledge agents can actually work effectively. He predicts that action agents for larger enterprises will probably take "another few years to really get major adoption."

Burak Gokturk from Google highlights that multi-agent systems are enabling capabilities that are "almost unimaginable," particularly in terms of completing tasks that might take a human 100 years in just one day or less. This brings significant opportunities especially in research areas, which exist across all enterprise functions. However, the gap between research capabilities and production deployment at scale remains substantial.

## Technical Bottlenecks and Challenges

### Data Quality and Governance Issues

One of the most significant themes throughout the discussion is that many of the bottlenecks to successful agent deployment are not actually AI problems per se, but rather enterprise data and governance challenges. Arvind Jain emphasizes this distinction, noting that companies are struggling with fundamental questions: Do they even have the right data? Has it been properly curated? Is there stale information that's no longer correct? In many cases, critical institutional knowledge exists only in people's minds rather than being documented in ways that AI systems can access.

The data governance challenge becomes particularly acute when dealing with sensitive enterprise information. Jain describes how information within businesses is often governed with complex permission structures, where specific departments can access certain information but not others. When introducing AI agents, the first critical consideration is whether the agent is running on behalf of a specific human and should therefore only have access to the information that particular human can access. Agent frameworks must be capable of enforcing these governance restrictions.

Interestingly, Jain reveals that the largest companies often express a deeper concern: they don't trust their own governance systems. These organizations have sensitive information with improperly configured permissions, and they're "scared" of what people might discover if AI makes everything easy to access. This means that AI systems need to go beyond simply respecting active governance mechanisms—they need to be contextually aware enough to understand what information an agent should not use even if it technically has access to it.

May Habib provides a concrete example from Writer's own experience: when connecting their action agent to their company's Google Drive, they first had to ensure there weren't Google Sheets containing salary information set to "anyone with this link can discover" permissions—exactly the kind of vulnerability that agentic AI would quickly exploit. She identifies a significant market opportunity for startups to productize security vulnerability discovery in preparation for agentic rollouts, noting that "no one has really solved that at scale."

### Information Retrieval and Search Challenges

Beyond governance, there's the technical challenge of bringing precisely the right information to agents so they can perform their tasks effectively. Richard Socher emphasizes that search plays a key role in bringing the right information to agents, and there's often significant information loss at this retrieval step. Burak Gokturk identifies personalization and retrieving the right information from memory or memory banks as a critical challenge, highlighting the importance of combining search and retrieval engines with large language models. The question of how to retrieve and use the most relevant information from extensive past contexts to provide effective personalization remains an area requiring significant work.

### Function Calling Limitations

Gokturk specifically highlights function calling as a current weakness across all large language models. When models are provided with many functions to call as options, they're "not super great" at choosing the right function for their task. This is particularly problematic in multi-agent systems where agents need to orchestrate complex sequences of function calls across different components and services.

### Security and Privacy at Scale

The security implications of agentic AI systems become exponentially more complex in multi-agent architectures. Gokturk describes how Google has built multi-agent systems with millions of calls required to make certain decisions, with each call carrying risks around security, privacy, ethics, and safety. Instead of managing risk for a single LLM call, organizations suddenly face exploding risk across potentially millions of component interactions. This necessitates a component-by-component approach where every single component level must be "as close to 100% as possible" in terms of security, privacy, and safety values.

Richard Socher offers an interesting long-term perspective on security: while he acknowledges short-term concerns around the decreasing cost of finding vulnerabilities through agentic AI, he's actually optimistic long-term. As the cost of running attacks becomes extremely low, every company will be able to run millions of attacks against itself to harden its systems. This self-inoculation approach could ultimately make systems much more secure than they are today.

### Accuracy, Verifiability, and Actions

Arvind Jain identifies agent accuracy as one of the key challenges, particularly when agents are taking mutative actions inside the enterprise that could "wreak havoc." While agent companies typically recommend putting humans in the loop and establishing guardrails to prevent autonomous actions before human confirmation, this significantly limits the value proposition of agentic systems. Jain calls for more academic and industry research on citations, verifiability, and methods to increase confidence in letting agents take actions autonomously.

## Workflow and Organizational Challenges

### Undocumented Workflows

May Habib identifies a critical bottleneck that hasn't received sufficient attention: for many enterprises, the workflows that agentic AI would excel at automating aren't actually written down. Collecting this workflow data represents a significant challenge because it's "nobody's job today" to document these processes. Someone must be assigned to put everything else aside and work cross-functionally to understand processes like how to triage an inbox or which ERP system out of 11 should handle a particular request. Creating these standard operating procedures (SOPs) that agentic AI can follow is essential but often overlooked work.

### Data Cycle Design

Richard Socher introduces the concept of "virtuous data cycles" as a critical consideration for companies building toward agentic AI. He argues that every company needs to evaluate which workflows are core to their business versus which are generic functions like marketing, sales, and service that could rely on external agent providers. For core functions (such as risk assessment for insurance companies), companies should build internal expertise and design their workflows to automatically collect clean training data as humans perform tasks.

Socher provides a concrete example: if service emails come in and random people answer them from their Gmail accounts, it will be difficult for AI to automate that workflow. However, if the company uses a CRM that captures how emails are assigned, stored, and ultimately resolved, that data can eventually enable agents to take over those workflows. This represents a fundamental shift in how companies should think about process design—not just for current efficiency, but for future AI enablement.

### Organizational Structure and Cross-Functional Work

Habib describes how building and scaling a generative AI company requires being in "constant 0 to 1 mode" regardless of size. At Writer, customer team members can now build working prototypes of features that go directly to engineering—a fundamental cross-functional change that increases productivity and leverage for every employee. However, this requires an organizational culture that can skip traditional steps and org chart levels, which represents a significant departure from traditional enterprise structures.

She advocates for choosing "greenfield opportunities" that can become rallying stories for what's possible when building agent-first and AI-first from the ground up. These initiatives avoid organizational politics and resistance while demonstrating the power of cross-functional, outcome-oriented thinking. Habib poses a provocative question: if you were building your company today, how would you build it? The answer would likely be "very different" from multi-hundred-year-old organizations that many AI vendors are working with.

## Emerging Roles and Skills

Richard Socher offers an insightful observation about how work will change: "all of us are going to become managers of AI." Most people currently are individual contributors, but managing turns out to be a distinct skill that must be learned. Effective managers know how to provide disambiguated, contextually aware training, how to evaluate performance, and when to trust someone to work independently. Socher predicts that everyone will need to go through these same learning steps with AI agents—learning to effectively delegate, supervise, and evaluate AI systems becomes a core competency for knowledge workers.

## Evaluation and Improvement Challenges

Burak Gokturk emphasizes that when building agents, organizations need robust mechanisms to determine whether they're actually improving their systems or not. Ground truth data is "super critical," as is the ability for agents to self-evaluate. Without proper evaluation infrastructure established from the outset, companies will modify their algorithms and agents without knowing whether the changes represent genuine improvements. This creates a significant bottleneck if not addressed properly from the beginning.

The evaluation challenge connects to the broader theme of verifiability that Jain raised. Without reliable methods to assess agent performance and the correctness of their actions, enterprises will continue to require human oversight for all significant decisions, fundamentally limiting the value that agentic systems can provide.

## The Code Generation and Reasoning Opportunity

Richard Socher identifies an area he believes is significantly underestimated in current research: the power of language models to program and run coding loops in much deeper ways inside the model itself. He specifically mentions SQL queries as a great example where "no one is really doing that at scale" at very deep inference times of the model. 

The typical pattern today involves taking large language models, asking them to write code, executing that code externally, getting output, and then potentially iterating. Socher suggests there's substantially more potential for deeper work in coding that happens within the model's inference process itself, rather than as a separate execution step. This represents an architectural shift in how we think about the relationship between language models and code execution.

## Infrastructure and Research Directions

Richard Socher notes that while it makes sense to work deeply within each of the different infrastructure layers of agentic AI that we know are needed, there's still significant work to be done. For You.com, the focus has been on search over public and some private data, but he sees opportunities across all the infrastructure layers that support production agentic systems.

The panelists collectively call for more academic research in several areas:

- **Verifiability and citations**: Methods to ensure agents can justify their decisions and actions with traceable reasoning
- **Self-evaluation capabilities**: Allowing agents to assess their own performance and confidence levels
- **Advanced function calling**: Improving models' ability to select appropriate functions from large option spaces
- **Contextual memory and retrieval**: Better mechanisms for personalization and retrieving relevant information from extensive context histories
- **Deep inference-time computation**: Exploring how models can execute more complex reasoning and coding loops internally rather than through external execution

## Balanced Assessment

While the panelists are clearly invested in the success of agentic AI (they represent companies building in this space), they provide a refreshingly honest assessment of current limitations. The consistent message across all speakers is that the gap between prototype and production is substantial, and the timeline for widespread enterprise adoption of truly autonomous agents is measured in years, not months.

The challenges they identify are multifaceted, spanning technical AI capabilities (function calling, reasoning, hallucinations), infrastructure and data engineering (retrieval, search, data quality), organizational factors (workflow documentation, cross-functional collaboration), and governance concerns (security, privacy, permissions). This comprehensive view suggests that solving the LLMOps challenges of production agentic AI requires coordinated progress across multiple dimensions simultaneously.

The discussion also reveals an important theme: many of the most significant bottlenecks are actually not AI model capabilities themselves, but rather the operational and organizational readiness of enterprises to effectively deploy these systems. Data governance, workflow documentation, permission structures, and organizational culture may be just as important as model accuracy and reasoning capabilities in determining the success of enterprise AI deployments.

The panelists' emphasis on greenfield opportunities, virtuous data cycles, and building from the ground up with AI-first principles suggests that retrofitting agentic AI onto existing enterprise processes and organizational structures may be substantially harder than building new capabilities designed for AI from the outset. This has implications for both how enterprises should approach AI adoption and where the most successful early implementations are likely to emerge.