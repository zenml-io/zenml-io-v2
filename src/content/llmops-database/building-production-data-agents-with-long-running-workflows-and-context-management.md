---
title: "Building Production Data Agents with Long-Running Workflows and Context Management"
slug: "building-production-data-agents-with-long-running-workflows-and-context-management"
draft: false
llmopsTags:
  - "data-analysis"
  - "code-generation"
  - "question-answering"
  - "chatbot"
  - "data-cleaning"
  - "data-integration"
  - "visualization"
  - "structured-output"
  - "high-stakes-application"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "few-shot"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "langchain"
  - "postgresql"
  - "fastapi"
  - "monitoring"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "orchestration"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "microsoft-azure"
industryTags: "tech"
company: "Hex"
summary: "Hex, a data analytics platform, evolved from single-shot text-to-SQL features to sophisticated multi-agent systems that assist users in complex data analysis workflows. The company built custom orchestration infrastructure to support notebook agents, conversational threads agents, and semantic modeling agents that operate across entire projects rather than individual cells. Key challenges included managing extensive tool sets (approaching 100,000 tokens), implementing context harvesting pipelines, building evaluation frameworks for long-horizon tasks, and transitioning from early GPT-3.5 Turbo implementations to modern models like Claude Opus 4.6 and GPT-5.4. The agents now handle complex iterative data science workflows, with internal users experiencing breakthrough moments when the technology shifted from cell-level to project-level AI capabilities, though significant challenges remain in verification, evaluation, and managing conflicting context at different organizational levels."
link: "https://www.youtube.com/watch?v=Xyh1EqcjGME"
year: 2026
seo:
  title: "Hex: Building Production Data Agents with Long-Running Workflows and Context Management - ZenML LLMOps Database"
  description: "Hex, a data analytics platform, evolved from single-shot text-to-SQL features to sophisticated multi-agent systems that assist users in complex data analysis workflows. The company built custom orchestration infrastructure to support notebook agents, conversational threads agents, and semantic modeling agents that operate across entire projects rather than individual cells. Key challenges included managing extensive tool sets (approaching 100,000 tokens), implementing context harvesting pipelines, building evaluation frameworks for long-horizon tasks, and transitioning from early GPT-3.5 Turbo implementations to modern models like Claude Opus 4.6 and GPT-5.4. The agents now handle complex iterative data science workflows, with internal users experiencing breakthrough moments when the technology shifted from cell-level to project-level AI capabilities, though significant challenges remain in verification, evaluation, and managing conflicting context at different organizational levels."
  canonical: "https://www.zenml.io/llmops-database/building-production-data-agents-with-long-running-workflows-and-context-management"
  ogTitle: "Hex: Building Production Data Agents with Long-Running Workflows and Context Management - ZenML LLMOps Database"
  ogDescription: "Hex, a data analytics platform, evolved from single-shot text-to-SQL features to sophisticated multi-agent systems that assist users in complex data analysis workflows. The company built custom orchestration infrastructure to support notebook agents, conversational threads agents, and semantic modeling agents that operate across entire projects rather than individual cells. Key challenges included managing extensive tool sets (approaching 100,000 tokens), implementing context harvesting pipelines, building evaluation frameworks for long-horizon tasks, and transitioning from early GPT-3.5 Turbo implementations to modern models like Claude Opus 4.6 and GPT-5.4. The agents now handle complex iterative data science workflows, with internal users experiencing breakthrough moments when the technology shifted from cell-level to project-level AI capabilities, though significant challenges remain in verification, evaluation, and managing conflicting context at different organizational levels."
notion:
  pageId: "34df8dff-2538-803d-926e-c11a371cfb68"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-25T14:00:00.000Z"
  lastEditedTime: "2026-04-25T14:00:00.000Z"
  publishedAt: "2026-04-26T10:00:25Z"
---

## Overview

Hex is a collaborative data analytics platform centered around a notebook interface that allows users to construct analyses using SQL, Python, text, and visualizations. The company has been at the forefront of shipping data agents since before most teams were considering agentic workflows. The journey from their first text-to-SQL features to sophisticated multi-agent systems provides rich insights into the practical challenges of deploying LLMs in production for iterative, high-stakes analytical work.

The case study comes from an interview with Izzy Miller, an AI engineer at Hex who transitioned from a marketing and developer relations role to AI engineering, enabled by increasingly capable models. The conversation reveals both the technical architecture and the organizational learnings from deploying multiple production agent systems that serve both technical data practitioners and business stakeholders.

## Evolution from Single-Shot to Agentic Workflows

Hex's AI journey began with single-shot text-to-SQL features scoped to individual cells within their notebook interface. Running on GPT-3.5 Turbo, these early features impressed users at the time but quickly revealed fundamental limitations. The single-shot approach proved particularly problematic in data analytics, which is inherently iterative—users get an answer, find it interesting, and want to follow up with increasingly refined questions.

The team recognized that models needed more context, not just from individual cells but from entire projects. However, early attempts to expand scope failed because the models simply weren't capable enough. The team had to wait for model capabilities to catch up to their vision. The breakthrough moment came when they realized the trajectory of model improvements meant they had a "high horsepower beast driving 25 in a school zone"—the technology was ready for more ambitious applications.

When they finally released the notebook agent internally with a sidebar interface that could access all the same tools as human users across the entire notebook, the response was immediate and enthusiastic. Employees recognized this as a transformative capability. The agent could work for 20 minutes on complex questions, building comprehensive reports that addressed not just the primary question but relevant sub-questions that emerged during analysis.

## Multi-Agent Architecture and Unification

Hex developed several distinct agents to serve different use cases and user personas. The Notebook Agent is designed for technical users comfortable with SQL and Python. It operates within the notebook, creating cells that users can follow along with in real-time and later use to build reports or applications. The agent can write SQL cells, Python cells, create charts, and perform all the actions available to human users of the platform. The Threads Agent provides a more conversational, abstracted interface resembling a chatbot conversation, designed for self-serve users who want to ask questions and get answers without seeing code. It produces interactive data artifacts but hides the technical implementation details. The Semantic Modeling Agent focuses on writing semantic model documentation but notably implements sophisticated context harvesting, reading artifacts from across the Hex workspace to inform model creation. The Chat with App Agent provides a threads-like experience for users interacting with data applications built on top of notebooks.

An interesting architectural evolution emerged as these agents matured. Initially built as completely separate systems, user expectations quickly created pressure for feature parity. Users questioned why the threads agent couldn't write Python when the notebook agent could, or why the semantic modeling agent could read other projects but the notebook agent couldn't. This led to a significant refactoring effort to unify capabilities across agents, organizing tools, prompts, and skills into modular capability bundles that can be shared across different agent implementations.

## Custom Orchestration Infrastructure

Hex made a deliberate decision to build their own orchestration system rather than adopting off-the-shelf frameworks. This choice was driven by the need to move rapidly in a fast-changing landscape and maintain intimate control over agent behavior. The core agent loop follows the standard pattern of an LLM running in a loop calling tools, but the differentiation lies in context harvesting pipelines and numerous fine-grained behavioral controls.

A major infrastructure milestone came when the team migrated from their original single-shot oriented system to a proper long-running workflow orchestration framework based on Temporal. This migration was challenging, requiring maintenance of two systems simultaneously, but proved essential for supporting the expanded agent capabilities and multiple agent types. The new infrastructure enabled agents to run for extended periods on complex tasks without architectural constraints.

## Tool Management and Simplification

The notebook agent's tool set has grown to nearly 100,000 tokens worth of tools, which the team acknowledges is excessive. This explosion came partly from normalizing operations with separate create, update, and delete tools for each entity type and partly from the temptation to provide specialized tools for a complex power user product that doesn't operate at the command-line level.

To manage this complexity, Hex implemented tool search and retrieval, allowing the agent to find relevant tools from the large set rather than presenting everything in context. They've also worked to consolidate tools where possible, for example merging create, update, and delete chart operations into a single unified chart tool without sacrificing performance on evaluations.

An interesting design choice involves ephemeral versus visible code execution. While the agent runs in an IPython kernel-like environment and could execute arbitrary Python, making all code visible as notebook cells serves important purposes. Visible cells allow users to follow along, verify work, and reuse the analysis. However, this creates trade-offs. For exploratory work like checking if a package is installed or running quick SQL queries to understand data structure, the team introduced ephemeral execution tools.

The ephemeral SQL query tool proved particularly valuable. Data questions often require preliminary investigation such as checking table structures, understanding data formats, and exploring join relationships before writing the primary query. Rather than error-driven debugging where the agent writes a query, gets an error, and refines iteratively creating messy notebook artifacts, the agent can run small investigative queries invisibly, then write a correct primary query on the first attempt.

This approach has unintended consequences. Modern models, especially GPT-5 series, can become overly thorough, running 50 ephemeral SQL queries before starting real work if they encounter a complex or ambiguous question. The team constantly balances efficiency against user experience, fighting cases where the agent runs secret queries and simply tells users the answer without showing charts or proof.

## Context Management: Static, Dynamic, and Organizational Levels

Hex conceptualizes context in two primary categories: static and dynamic. Static context includes tool descriptions, behavioral guidance, and system prompts. Dynamic context encompasses information harvested from the user's workspace including notebooks, threads, conversations, semantic models, data connections, and other artifacts.

The context harvesting pipeline represents a core architectural component. The semantic modeling agent pioneered reading artifacts from across the workspace, and this capability has been rolled out as a first-class feature across all agents. The team faces a significant information architectural challenge in laying out the graph of all available context such as warehouse metadata, semantic models, user statements in threads, and admin guidance and determining how it should be synthesized.

Behind the scenes, Hex has developed a context agent that helps synthesize information from these diverse sources. This raises complex questions about context hierarchy and conflict resolution. The team distinguishes between user-level memory like ChatGPT remembering personal details and organizational knowledge that should inform all users' work.

User-level memory creates particular concerns for data teams. If a user asks a question, gets a wrong answer, and tells the agent that a metric is defined differently, that correction might be stored in memory. But what if the user was wrong, or the definition changed? This creates conflicting layers of context that can cause serious problems. When agents encounter contradictory information, they don't handle it gracefully. Claude Sonnet 4.6, for example, can spend 30 minutes in a crazy collapse mode trying to reconcile conflicting guidance rather than making progress.

The team is carefully considering how to implement memory systems that allow users to teach agents while preserving data team governance. They use guides similar to skills files that provide progressive disclosure where the agent can see available guides and retrieve them as needed during execution. Admins and data teams provide strong governance through semantic models and guides, but allowing too much user-level override risks creating chaos.

## Model Selection and API Feature Adoption

Hex strives to use the smartest, most capable models available, currently focusing on Claude Opus 4.6 and GPT-5.4. Data analytics requires general intelligence rather than narrow domain expertise, so raw model capability is paramount. However, comparing models proves more nuanced than simple rankings might suggest.

The new generation of models introduces various configuration parameters including effort levels, juice settings, and other knobs that significantly impact performance and latency. GPT-5.4 might perform slightly better but take twice as long. Turning down the effort setting might halve the latency but reduce quality. Sometimes low-effort settings cause the model to spiral into confusion, while high-effort settings make it answer simple questions instantly, making it difficult to predict optimal configurations.

The team tests new model features carefully. The million-token context window, for example, helps in theory but hurts at the margins because models exhibit weird behavior at the extreme ends of such large windows. Through evaluation, Hex determined that compacting context early while maintaining access to the million-token model allows them to compact at 300,000 tokens instead of 200,000, optimizing the trade-off.

API providers increasingly encourage adoption of proprietary features with the promise of being in distribution for model training. The labs suggest that using features like the Claude Code agent SDK or OpenAI's stateful server-side execution will yield better results because models are trained on those patterns. The team expresses uncertainty about these claims, wondering whether custom tools for domain-specific operations like building charts immediately push them out of distribution anyway. The team remains cautious about lock-in, seeking quantitative evidence that being more in distribution provides sufficient benefit to justify reduced control.

## Observability and Privacy-Preserving Analysis

Hex built custom observability tools for internal use while developing the Context Studio for exposing insights to customers. There is an ongoing debate internally about whether these should eventually converge so the team uses similar tools to what they provide users, but they currently diverge for practical reasons.

Internal observability provides full access to all data from development and internal usage, enabling deep introspection of agent behavior. For production customer usage, Hex implements privacy-preserving observability inspired by Anthropic's approach. Rather than accessing raw conversation data, they use LLM-as-a-judge systems to identify and cluster issues, flagging potential problems for human review.

This system surfaces clusters of similar issues, types of failures, and how they shift over time. Admins see high-level patterns including questions being asked, types of answers generated, and potential confusion points without compromising user privacy. When the system detects something that might have gone wrong such as conflicts with semantic models or agent confusion, it flags these for data team attention.

The observability system feeds into a continuous improvement loop. Users work in Hex, creating an exhaust of artifacts and interactions. This exhaust surfaces to data teams through the Context Studio, allowing them to notice mistakes, improve guides and semantic models, and refine warehouse context. The feedback loop drives incremental improvement without requiring data teams to manually review every conversation.

## Evaluation Philosophy and Practice

Hex maintains strong opinions about evaluation, born from extensive experience with both internal and public benchmarks. The team argues that most evaluation sets are poorly constructed unless actively maintained. Common problems include bad or incorrect ground truth, problematic grading logic, unrepresentative questions, and conflating different types of difficulty.

A popular data benchmark, for example, primarily tests whether agents correctly handle the esoteric rule that empty arrays should be treated the same as nulls, making it more of a needle-in-haystack context retrieval test than a genuine analytical reasoning evaluation. Many benchmarks conflate SQL syntax knowledge with the actual analytical and scientific reasoning required for good data work.

Hex's evaluation philosophy emphasizes several principles. They prefer evaluation sets small enough to hold in mind with 30 to 50 examples for difficult cases, running multiple repetitions rather than creating hundreds of variants. This allows them to understand exactly why specific models fail on specific questions and craft targeted improvements. Their most interesting evaluations begin in the middle of complex, partially-built notebooks and present vague, realistic challenges. One eval presents a notebook with a chain of three bugs where the current state reveals the first bug but obscures the second and third, requiring thorough investigation to fully resolve.

Alongside normal regression-prevention evals, the team maintains aspirational eval sets where all current models perform poorly. One favorite example uses a real internal sales dashboard with an intentionally introduced fan-out bug that makes all account executives appear to exceed 900% of quota. When asked about top performers, every tested model enthusiastically congratulates the team on record-breaking performance. None catch the bug proactively, though they quickly identify it if prompted with that doesn't seem right.

Many evals derive from real internal Hex usage, leveraging the luxury of extensive internal data work. Real mistakes made by actual data practitioners inform realistic test scenarios. The team runs evaluations to answer two questions about any change: did it have the desired effect, and did it introduce undesired effects? They're working to democratize eval access across the company as the line between AI engineer and regular engineer blurs, allowing any engineer to validate that their changes improve or at least don't harm agent performance.

## Long-Horizon Evaluation: Metric City

Recognizing that single-shot evaluations fail to capture the true value proposition of Hex, the team developed Metric City, an ambitious 90-day simulation-based evaluation framework. The insight is that data platforms should improve over time as agents learn from context and build institutional knowledge. One-shot evals where Claude answers hard questions on the first try and never gets another chance don't reflect this reality.

Metric City creates a simulated company called Shorelane Commerce with a Snowflake warehouse containing realistic business data. The warehouse is carefully hand-crafted with terrible data quality problems including nulls, messed up columns, joins that don't quite work, and misleading patterns that mimic real-world messiness. The simulation runs for 90 days, with the clock advancing, DBT models running to keep data timeshifted, new rows appearing, products launching, fraud occurring, and tickets arriving from stakeholders.

Each day, the agent receives email tickets asking data questions and providing information. After replying to tickets, the agent can optionally do proactive knowledge work such as following up on loose threads, documenting findings, cleaning up wikis, and building institutional memory before ending its turn. The evaluation questions are crafted such that if the agent demonstrates desired skills and behaviors throughout the simulation, it should achieve 100% accuracy by day 90.

Currently, Claude Sonnet 4.6 achieves about 4% on day zero and 24% by day 90, with the absolute numbers less important than the capability to evaluate long-horizon learning. The simulation is expensive to run and exists in a mad science laboratory state, but it serves multiple purposes. Beyond evaluation, it's a research project to understand how models naturally organize information, what they retrieve, what they miss, and how they like to structure wikis and knowledge bases, providing insights that inform harness design.

This is viewed as the honest evaluation for a platform designed to compound value over time. While current one-try evals help understand point-in-time agent performance, they miss the flywheel effect that defines Hex's value proposition. The vision includes eventually running the actual Hex agent in this simulation rather than just the model with simple tools, creating a true end-to-end evaluation of the production system.

## Technical Debt and Model Capability Evolution

An ongoing challenge involves technical debt accumulated to work around earlier model limitations. When Hex built their first agents, models had a ceiling for handling static IDs beyond which they would hallucinate or swap identifiers. For notebooks with more than 50 to 60 cells, behavior became unreliable. The team built a complex reference registry system to map between short references and long unique IDs for cells, projects, data connections, and other artifacts.

This system became fundamental to agent operation, with ongoing maintenance burden and bug fixes. Recently, evaluation revealed that modern models no longer struggle with this and they handle the IDs fine without the compensation layer. Now the team faces the classic technical debt challenge of removing infrastructure that was once essential but has become unnecessary baggage.

This pattern repeats across the codebase. Features built to help earlier models now hobble current agents. The team constantly discovers hard ceilings on iteration counts, behavioral constraints, and architectural decisions that made sense for GPT-3.5 Turbo but hinder Claude Opus 4.6. The CEO frames this in terms of sand and stone, asking as models improve, what remains valuable and what can be washed away.

## User Experience and Showing Work

The team grapples with how much agent activity to show users. While agents work, Hex displays expanded progress, then collapses it after completion. This paradigm works reasonably well currently, but there is an expectation it will become another piece of infrastructure they'll need to rip out.

The newest models, particularly GPT-5.3 Codec Spark, work so fast that showing user progress becomes impractical and unnecessary. The team operates under the assumption that in coming months they'll desperately need to remove the follow-along behavior to unhobble agents to do more work and run more tool calls without overwhelming users.

For technical notebook users, showing work through literate programming makes sense as the notebook self-documents analysis, allowing verification and validation. For business stakeholders who don't know SQL or Python, the concept of showing work becomes philosophically different. The question shifts from showing work to providing stronger forms of verification, confidence, or accuracy.

## Domain Expertise and Visualization

Hex's approach to building quality outputs relies heavily on encoding domain expertise into agents. Team members with deep visualization expertise provide incredibly strong opinions about how charts and visual analysis should work. Their job involves directly encoding these opinions into agents and guiding other engineers to build in opinionated ways.

Users often struggle to articulate why Hex agents feel superior to alternatives, eventually landing on vague assessments like it was just better. When pressed, the superiority often comes down to qualitative factors such as a long report with five well-chosen charts, thoughtful bullet points, and an offer to explore follow-up questions. This quality is nearly impossible to evaluate quantitatively, yet it represents significant value. The challenge of evaluating what makes data work great beyond simple correctness causes ongoing concern.

## The Flywheel: Day Zero vs. Day 90 Performance

A central thesis of Hex's approach is that most of the product value comes not from initial agent capabilities but from the compounding effect of context exhaust and the feedback loop. On day zero, Hex with a Snowflake connector might be better than a random Claude instance with a connector primarily due to opinions and user-friendliness. But by day 90, as users produce artifacts, build projects, and generate verified information that guides future agent work, the platform operates in a totally different ballgame.

This flywheel effect where the platform improves continuously as it's used represents the core value proposition. It's also why single-shot evaluations fail to capture what matters. The product is designed to get better every day at organizational tasks through accumulated context and institutional learning.

## Team Composition and AI Engineering

The case study provides interesting insights into what makes effective AI engineers in this context. Izzy's own path from marketing and developer relations to AI engineering was enabled by models reaching sufficient capability that domain expertise paired with Claude could produce valuable, clean engineering contributions.

The team hires from diverse backgrounds including mathematicians, marketers, and data scientists with the primary selection criterion being genuine care about the problem. The argument is that you can teach technical skills but can't teach someone to care deeply enough to stay up late building features that resonate with users. One of their most productive AI engineers was a user who provided so much feedback they essentially recruited him from the customer base. He contributes primarily through opinions, instincts, and intuition about what will help users, enabled by models to translate those insights into working code.

Domain expertise proves particularly valuable because the agents themselves are effectively data scientists and analysts. Having user empathy allows engineers to know how agents should work, recognize when behavior indicates problems, and guide agents toward optimal paths. The notebook agent and threads agent are told they are data analysts, so having team members who understand that role deeply improves the entire system.

## Future Directions

There is excitement about several evolving areas. The unification of agent capabilities continues, with interesting questions about whether all agents should have similar tool access and how user interface and user experience should reflect this. The context agent and automated improvement of guides and semantic models represents frontier work. Memory systems that balance user flexibility with data team governance remain unsolved.

The team continues refining their understanding of what model features genuinely help versus what represents lock-in without clear benefit. Tool consolidation and simplification remains ongoing work. And the long-horizon evaluation framework promises to reshape how they think about agent improvement and platform value.

Throughout the conversation, a clear picture emerges of a team deeply engaged with the practical realities of production LLM systems, constantly balancing competing concerns, and maintaining strong opinions informed by extensive real-world usage and rigorous evaluation.
