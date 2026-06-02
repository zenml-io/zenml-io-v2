---
title: "Panel Discussion on AI Agents in Production: Security, Evaluation, and Infrastructure"
slug: "panel-discussion-on-ai-agents-in-production-security-evaluation-and-infrastructure"
draft: false
llmopsTags:
  - "healthcare"
  - "poc"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "fine-tuning"
  - "multi-agent-systems"
  - "agent-based"
  - "memory"
  - "evals"
  - "monitoring"
  - "databases"
  - "microservices"
  - "security"
  - "guardrails"
  - "langchain"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "postgresql"
  - "mysql"
  - "sqlite"
  - "redis"
  - "cache"
  - "anthropic"
  - "openai"
  - "meta"
  - "microsoft-azure"
industryTags: "tech"
company: "Zenity / Hetz / aidoc / Band / MongoDB"
summary: "This panel discussion brings together practitioners from multiple companies to discuss the challenges and best practices of deploying AI agents in production environments. The panelists, representing companies like aidoc (medical AI), Zenity (AI agent security), Band (agent communication infrastructure), and MongoDB (data layer for AI applications), share insights on critical topics including context management as the key success factor, the evolution of data science roles in the AI-native era, security considerations for non-deterministic agents, evaluation frameworks for high-stakes applications, and infrastructure patterns for multi-agent systems. The discussion emphasizes that context is king, that deterministic safeguards must supplement prompt-based controls, and that production AI systems require sophisticated evaluation pipelines consuming 20-30% of development effort."
link: "https://www.youtube.com/watch?v=BQ6aIRYYwh4"
year: 2026
seo:
  title: "Zenity / Hetz / aidoc / Band / MongoDB: Panel Discussion on AI Agents in Production: Security, Evaluation, and Infrastructure - ZenML LLMOps Database"
  description: "This panel discussion brings together practitioners from multiple companies to discuss the challenges and best practices of deploying AI agents in production environments. The panelists, representing companies like aidoc (medical AI), Zenity (AI agent security), Band (agent communication infrastructure), and MongoDB (data layer for AI applications), share insights on critical topics including context management as the key success factor, the evolution of data science roles in the AI-native era, security considerations for non-deterministic agents, evaluation frameworks for high-stakes applications, and infrastructure patterns for multi-agent systems. The discussion emphasizes that context is king, that deterministic safeguards must supplement prompt-based controls, and that production AI systems require sophisticated evaluation pipelines consuming 20-30% of development effort."
  canonical: "https://www.zenml.io/llmops-database/panel-discussion-on-ai-agents-in-production-security-evaluation-and-infrastructure"
  ogTitle: "Zenity / Hetz / aidoc / Band / MongoDB: Panel Discussion on AI Agents in Production: Security, Evaluation, and Infrastructure - ZenML LLMOps Database"
  ogDescription: "This panel discussion brings together practitioners from multiple companies to discuss the challenges and best practices of deploying AI agents in production environments. The panelists, representing companies like aidoc (medical AI), Zenity (AI agent security), Band (agent communication infrastructure), and MongoDB (data layer for AI applications), share insights on critical topics including context management as the key success factor, the evolution of data science roles in the AI-native era, security considerations for non-deterministic agents, evaluation frameworks for high-stakes applications, and infrastructure patterns for multi-agent systems. The discussion emphasizes that context is king, that deterministic safeguards must supplement prompt-based controls, and that production AI systems require sophisticated evaluation pipelines consuming 20-30% of development effort."
notion:
  pageId: "373f8dff-2538-80e3-bda9-ffba393f5a0b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:23:00.000Z"
  lastEditedTime: "2026-06-02T07:23:00.000Z"
  publishedAt: "2026-06-02T07:35:27Z"
---

## Overview

This panel discussion provides a comprehensive look at the state of deploying AI agents in production across multiple industries and use cases. The conversation features practitioners from distinct domains: Guy from Hetz venture capital fund (with extensive data and AI leadership experience at Neurallic), Gal from Zenity (focusing on AI agent security), Eidan from aidoc (leading AI development for medical imaging in over 1,700 hospitals worldwide with $500M in total funding), Vlad from Band (building communication infrastructure for autonomous agents), and Roi from MongoDB (working on data layer solutions for AI applications). The discussion reveals common patterns and challenges across different deployment scenarios while highlighting domain-specific considerations.

## Context as the Primary Success Factor

The panel opens with Guy emphasizing that across all AI applications, whether proprietary models, open-weight models, or API-based solutions, the single most important factor for success is context. This observation holds true across benchmarks and real-world user interactions. Context, while a broad term that different practitioners interpret differently, ultimately comes down to how well organizations can translate their institutional knowledge and human expertise into forms that AI models can leverage. Given that all current models are statistical and non-deterministic rather than fully deterministic, success depends heavily on bringing the right organizational and domain knowledge to bear on each problem. The solutions that achieve both adoption and actual success are those that invest most heavily in their context management infrastructure.

The discussion draws parallels to traditional data science, where the quality of input data directly determined output quality. In the LLM era, this principle remains valid but manifests differently. The data and context feeding into agents becomes the critical variable, and organizations must apply rigorous engineering practices to manage it effectively.

## Evolution of Data Roles in the AI Era

Guy provides insights into how data science and data engineering roles are transforming in AI-native companies. While chief data officers and data engineering teams were prominent fixtures three to four years ago, there has been a significant shift. These roles still exist, but the practical reality is that most engineers today, regardless of their original training, are becoming AI engineers in one form or another. The boundaries between data engineering teams, traditional engineering teams, and AI engineering teams are increasingly blurred, with many companies finding that everyone does a bit of everything.

Classical data science and research roles remain critical in companies working on very deep technical solutions, such as those developing computer vision systems, training frontier models, building distilled models, or working with physical and mathematical models. These organizations require the deep statistical and mathematical expertise that PhD-level data scientists provide. However, for many companies, what used to require a data scientist with deep understanding of how to build classifiers manually has become more automated. The role has evolved toward what might be called applied engineers who ensure data is organized appropriately for models, manage data pipelines with significant automation, and handle the practical aspects of getting models to work with organizational data. The need for deep mathematical and statistical expertise to hand-craft every solution has diminished, and this trend appears likely to continue.

## Security and Deterministic Safeguards for Non-Deterministic Agents

Gal from Zenity provides detailed guidance on securing AI agents in production, starting with the fundamental observation that agents are inherently non-deterministic. This is both their strength and their security challenge. Unlike traditional software where developers can enumerate and reason about all execution flows, agents can generate their own execution paths. They receive a set of tools and can combine them in ways developers never anticipated. Agents function like highly diligent and creative employees who can sometimes become confused or be confused by external inputs.

The core security principle Gal advocates is introducing determinism and setting clear boundaries wherever possible. For permissions, traditional applications might grant database access for all customer data, trusting the code to properly filter by the relevant customer. With agents, this trust is misplaced because the agent might decide to access or learn from another customer's data to provide the best answer in a given execution. Therefore, permissions must be far more restrictive, granting agents only the exact access they need for each specific execution flow. For example, database permissions should be scoped to read only the specific customer's data required in that particular execution, ensuring that even if the agent makes unexpected decisions, deterministic controls prevent unauthorized access.

Gal is explicit that prompt-based controls and system instructions telling agents what not to do simply do not work as security mechanisms. Organizations should not rely on these as genuine defense layers. Instead, the emphasis must be on deterministic protection mechanisms and very clear boundaries on what agents can do.

For organizations already running agents in production without having prioritized security from the start, Gal recommends a minimum viable security approach. First, audit what agents can actually do and whether they truly need all the capabilities they have been granted. Organizations often connect agents to Model Context Protocol servers, provide various tools, or use frameworks that come with built-in capabilities like terminal code execution. Teams should verify they actually need all these capabilities and remove those that are unnecessary, reducing the attack surface. Second, consider where agents are running. Because their behavior cannot be fully predicted, the execution environment should be as isolated as possible, ideally in sandboxes that limit impact, potentially resetting between executions to neutralize any persistence-based threats.

Third, implement comprehensive monitoring and observability. The security maxim that you cannot protect what you cannot see applies equally to agents. Most frameworks provide tracing capabilities out of the box, and teams should use these to generate detailed traces of everything agents do in production. This enables both incident response when something suspicious occurs and continuous improvement of agent protections. Organizations can also add hooks and similar mechanisms that inject deterministic behavior into otherwise non-deterministic systems.

## High-Stakes Medical AI: Evaluation Frameworks and Production Safety

Eidan from aidoc describes their approach to deploying AI in one of the highest-stakes environments imaginable: medical imaging analysis in hospitals. Aidoc develops proprietary frontier models that analyze both medical images and text to identify medical issues that physicians tend to miss. The system is deployed in approximately 2,000 hospitals globally and has raised $500 million in total funding.

The company employs roughly four layers of protection to ensure model safety. The first layer operates during development and before release, with 20-30% of development effort for each new version dedicated solely to evaluation. This includes both standardized test sets that have been reviewed by multiple radiologists, providing consistent baselines for comparison across versions, and fresh snapshots of production data from hundreds of hospitals to check for data drift and ensure accuracy on current real-world data. Evaluation focuses on metrics that matter to both the company and physicians, such as false negatives and false positives, and is conducted at the individual hospital level. Even if a model shows overall improvement, if degradation is detected at specific hospitals, teams investigate and implement mitigation strategies before release.

The second layer involves continuous monitoring after release through a dedicated AI operations center staffed by data scientists and analysts. This team monitors models in production and essentially configures the harness controlling model behavior. They manage the context models receive, adapt to data drift, and adjust configurable parameters or thresholds. Before any model release, the algorithmic team conducts a handover to the operations team, developing specific tools and dashboards for monitoring that model and identifying significant drift patterns.

The third layer is infrastructure for evaluation at scale. Aidoc performs evaluations on tens of millions of scans weekly, requiring substantial infrastructure to build appropriate datasets, make them accessible to all analysts in the company, and perform automated annotation using both external LLMs and proprietary company models. This infrastructure is developed in-house specifically for their evaluation needs.

The fourth layer provides analytics directly to customers, giving hospitals transparency into model accuracy, changes, increases, and decreases. This allows customers to perform their own oversight on the system's performance.

When asked why aidoc invests the enormous effort of tens or hundreds of millions of dollars into training proprietary models rather than using existing closed-source frontier models, Eidan explains it comes down to data modality and accuracy requirements. Medical imaging data is fundamentally different from internet data, so while generic frontier models might perform adequately on some specific examples, training on large amounts of proprietary medical data achieves entirely different orders of magnitude in accuracy. Medical problems are often extremely rare, with some conditions appearing in only 10% or less of data. The accuracy requirements are extreme, with false positive rates needing to be 0.1% or even lower, while simultaneously avoiding false negatives. With such rare conditions, without massive amounts of proprietary data, the model would not even encounter these problems during training. Aidoc's ability to tackle these rare medical problems and show them to models during training exists only because their proprietary dataset contains these problems in sufficient quantity. The company began training their frontier model three years ago when GPT demonstrated the viability of unsupervised learning for creating models that could address a wide range of problems. This shift enabled them to increase their output from developing approximately three algorithms per year to 15 algorithms in the past year alone, a five-fold acceleration.

## Multi-Agent Communication and Infrastructure

Vlad from Band discusses the infrastructure challenges of multi-agent systems, starting by clarifying what constitutes a true multi-agent system. The term is used broadly, but typically refers to two architectures. The first is a pipeline or graph where each agent represents a node, and the system follows execution or graph traversal patterns. The second, where most of the industry is heading, involves an orchestrator that delegates tasks to sub-agents.

Vlad draws an analogy to software development: the orchestrator with delegation resembles a process with a thread pool that delegates tasks. The agent runs as a thread, completes its work, dies, and the context is not preserved. Band is focused on the target state: autonomous agents that run continuously, are always operational, are written in different frameworks and languages, use different harnesses, and need to communicate with each other in a fully bidirectional manner. Anyone who has experienced opening two separate sessions of coding assistants like Codex or Claude, writing code in one session, then asking the second session to act on that code and manually copying and pasting between them, has effectively served as the communication layer between two agents. Band believes the future lies in autonomous agents communicating directly with each other.

Using software architecture terminology, this describes a distributed microservices system where each service is non-deterministic. The problems to solve are classic distributed systems challenges: real-time discovery of services that are up or down, distributed tracing, and similar concerns. The industry currently addresses this with various approaches. Examining the internals of solutions like OpenAI's Swarm reveals sophisticated patterns like message watching and routing, but these systems often connect to communication platforms designed for humans like WhatsApp, Telegram, and Discord. Connecting bots to these platforms sometimes requires specific configuration because they may block bot-to-bot communication.

Beyond these infrastructure challenges, organizations face additional problems when running hundreds of agents in production. How do you assign identity to an agent and map that identity to an employee? When agents run in different environments, how do you perform KPI management and prompting? Do you want to trace across all agents and start aggregating logs centrally, building that mechanism yourself? Band's philosophy is that these concerns should not be left to individual developers who use LangGraph, LangChain, or other frameworks. Developers should not need to understand how to implement federation when an agent crashes, how to handle retries without blocking other agents, or how to manage multi-participant conversations between Claude and other models. Band builds this as a product so developers do not need to SSH into terminals to connect to agents running in their systems.

## Data Layer and Context Management with MongoDB

Roi from MongoDB discusses best practices for context management from the data infrastructure perspective. He emphasizes that organizations need a data layer to make context accessible to LLMs, and this layer must be extremely flexible because many organizations still do not fully know where they are heading with their AI initiatives. There are debates about memory architecture (short-term versus long-term), and many different infrastructure approaches exist, with some favoring file systems and others preferring different architectures.

The goal should be to have the simplest possible infrastructure that provides all the tools needed for memory management, including fast querying capabilities for vector search, text search, or standard database queries, all depending on the use case. Many applications need to maintain state beyond just retrieval. The wisdom lies in combining these capabilities into a single infrastructure. Just as organizations would not want developers to work across 10 different systems, agents should not be forced to access multiple disparate systems either.

The data layer needs to provide all minimal essential capabilities including security, monitoring, and event-driven reactivity. In many architectures, the database serves as the connecting thread and communication mechanism between services. One service writes to the database, and another service or agent reacts to that change. These capabilities are critical in production infrastructure today.

Roi observes that both startups and established companies entering the AI space sometimes focus too much on short-term needs and fail to look further ahead at where their systems will develop. While the space is evolving rapidly and can be difficult to track, organizations should maintain flexibility to move in whatever direction the AI landscape takes them as they deploy systems to production.

## RAG and Vector Databases: When and Why

The discussion addresses when retrieval augmented generation and vector databases become necessary, particularly given that context windows are growing and some voices question whether RAG remains essential. Roi clarifies that vector search is ultimately just another tool. While it is tempting to view vectors as a universal solution, this is incorrect. A craftsman with a hammer sees every problem as a nail, and similarly, vector search should not be treated as a panacea.

Vector search is extremely powerful when semantic similarity search is needed within very large datasets. However, it remains just one tool that agents might use to accomplish their work. Organizations want agents to be autonomous, secure, and well-equipped, and vector search is one very powerful tool that has undeniably advanced the field significantly. But sometimes finding the right information requires having the LLM construct the appropriate query to search data, perhaps to locate specific insurance claims or other structured information. Vector search would return an answer in such cases, but it might not be relevant. If the context provided to the agent is wrong, the agent will do poor work, and because the agent is non-deterministic, this creates a compounding effect of errors building on errors.

The panel concludes with the recognition that production AI systems require sophisticated infrastructure that balances flexibility with deterministic controls, extensive evaluation frameworks that consume significant development resources, and careful consideration of when different tools like vector search are appropriate versus when structured queries or other approaches better serve the use case.
