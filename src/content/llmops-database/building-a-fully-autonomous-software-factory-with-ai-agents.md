---
title: "Building a Fully Autonomous Software Factory with AI Agents"
slug: "building-a-fully-autonomous-software-factory-with-ai-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "chatbot"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "cicd"
  - "continuous-integration"
  - "orchestration"
  - "devops"
  - "monitoring"
  - "documentation"
  - "open-source"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Software Factory"
summary: "This case study documents an experiment in building a completely autonomous software product using only AI agents without human-written code. The project involves creating a Notion-style note-taking application called Memo through a software factory approach where AI agents handle everything from initial development to feature planning, testing, bug fixing, and self-improvement. The builder uses tools like Claude and Codex to orchestrate multiple agents that manage the full software development lifecycle, including automated testing, UI evaluation, feedback collection, and deployment. After eight days, the system has successfully built a functional editor and added complex features like database views, though challenges remain in UI testing quality and the balance between automation speed versus proper specification and planning. The discussion reveals how AI-enabled development is fundamentally changing software team structures, product management priorities, estimation accuracy, and the trade-offs between rapid iteration and maintaining high product quality."
link: "https://www.youtube.com/watch?v=-1_NTT9p_0g"
year: 2026
seo:
  title: "Software Factory: Building a Fully Autonomous Software Factory with AI Agents - ZenML LLMOps Database"
  description: "This case study documents an experiment in building a completely autonomous software product using only AI agents without human-written code. The project involves creating a Notion-style note-taking application called Memo through a software factory approach where AI agents handle everything from initial development to feature planning, testing, bug fixing, and self-improvement. The builder uses tools like Claude and Codex to orchestrate multiple agents that manage the full software development lifecycle, including automated testing, UI evaluation, feedback collection, and deployment. After eight days, the system has successfully built a functional editor and added complex features like database views, though challenges remain in UI testing quality and the balance between automation speed versus proper specification and planning. The discussion reveals how AI-enabled development is fundamentally changing software team structures, product management priorities, estimation accuracy, and the trade-offs between rapid iteration and maintaining high product quality."
  canonical: "https://www.zenml.io/llmops-database/building-a-fully-autonomous-software-factory-with-ai-agents"
  ogTitle: "Software Factory: Building a Fully Autonomous Software Factory with AI Agents - ZenML LLMOps Database"
  ogDescription: "This case study documents an experiment in building a completely autonomous software product using only AI agents without human-written code. The project involves creating a Notion-style note-taking application called Memo through a software factory approach where AI agents handle everything from initial development to feature planning, testing, bug fixing, and self-improvement. The builder uses tools like Claude and Codex to orchestrate multiple agents that manage the full software development lifecycle, including automated testing, UI evaluation, feedback collection, and deployment. After eight days, the system has successfully built a functional editor and added complex features like database views, though challenges remain in UI testing quality and the balance between automation speed versus proper specification and planning. The discussion reveals how AI-enabled development is fundamentally changing software team structures, product management priorities, estimation accuracy, and the trade-offs between rapid iteration and maintaining high product quality."
notion:
  pageId: "34ef8dff-2538-812d-ba7a-fb10ee0b19ad"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:02:49Z"
---

## Overview

This case study presents an ambitious experiment in creating a "software factory" - a completely autonomous product development system using only AI agents to write code, with no direct human coding intervention. The project, documented on day eight of development, involves building Memo, a Notion-style note-taking application. The discussion features two speakers: the primary builder and Matt, who serves as head of product, exploring both the technical implementation and broader implications for product management in an AI-enabled world.

The software factory represents a full LLMOps implementation where large language models handle the entire software development lifecycle. The system encompasses planning, development, testing, deployment, bug fixing, and even self-improvement, demonstrating how AI agents can be orchestrated to manage complex production workflows with minimal human intervention beyond strategic direction.

## Technical Architecture and Agent Orchestration

The software factory operates through a sophisticated orchestration of multiple AI agents, each handling different aspects of the development process. The core infrastructure relies heavily on automation workflows that check the output of agents' work, creating feedback loops essential for autonomous operation. The builder emphasizes that successful autonomous development requires extensive tooling beyond simply prompting an LLM - the system needs automated checks, validations, and quality gates throughout the software development lifecycle.

The orchestration approach involves delegating work between different agents, each specialized for particular tasks. The builder notes that while tools like Codex and Claude have become excellent at producing code and solving complexity, the real challenge lies in properly structuring how these agents interact and hand off work to each other. The owner chat interface provides significant abstraction over this complexity, but underneath runs a sophisticated system of automations that validate outputs, run tests, and manage the development pipeline.

The system demonstrates multi-agent coordination across several key areas. Agents handle initial code generation, automated testing including end-to-end tests, UI testing and screenshot analysis, bug detection and fixing, feature implementation, and continuous self-improvement of the codebase. This represents a mature LLMOps stack where the infrastructure around the LLMs is as critical as the models themselves.

## Development Workflow and Production Pipeline

The production workflow follows a structured pipeline from user feedback to deployment. Users can submit feedback directly through the UI, which flows into a database. The owner automation system collects this feedback, assesses it, and highlights priority items in Slack. From Slack, the team can action items, triggering the automated development process. This creates a continuous loop from user input to code changes without manual development intervention.

Feature development follows a similarly automated path. When a new feature like the database view is needed, the process begins with specification in the owner chat. The builder provides context about requirements and technical constraints - for the database feature, this included background on Notion's data model and assessment of whether it would work for their use case. The agent then generates a complete specification, opens GitHub issues for all required work, and begins implementation. The system automatically discovers bugs during testing phases and creates additional issues to address them.

The deployment strategy leverages feature flagging extensively. New features first ship to the company's own account, allowing real-world testing in a controlled environment. Once validated, features graduate to the cloud product for broader testing, and finally to enterprise customers. This graduated rollout provides safety gates while maintaining rapid iteration. The system also includes automated rollback capabilities - experiments that don't progress to production within roughly two weeks are automatically identified and removed, preventing code bloat.

## Testing and Quality Assurance Challenges

Despite the sophisticated automation, testing remains a significant challenge, particularly for UI/UX quality. The builder notes being "quite surprised" by how poorly the system performed on UI testing during the database feature implementation. Visual bugs like date pickers being cut off by overflow containers weren't caught by automated tests, requiring manual discovery and bug reporting. The system can analyze screenshots to understand UI issues, but proactive detection of these problems during development remains inconsistent.

The testing infrastructure includes automated end-to-end tests that the agents write themselves, which successfully catch many functional bugs. However, there's a clear gap between functional correctness and user experience quality. The builder acknowledges this is "definitely something to improve on" and plans to spend time enhancing the automations and test coverage specifically around UI validation.

Quality also heavily depends on upfront specification effort. The builder contrasts two approaches: the initial product spec took a full day of planning and resulted in a polished editor with good functionality, while the database feature received only 10-15 minutes of specification and produced something "somewhat functional" but requiring significant follow-up work. This reveals a critical trade-off in AI-enabled development between the dopamine rush of rapid iteration versus the discipline of thorough planning.

## Estimation and Planning in an AI-Enabled World

The discussion reveals how profoundly AI agents have disrupted traditional software estimation. Matt notes that "every estimate I've seen from an engineer or a product manager in the past six months has been wrong by substantial margins" - describing them as off by "magnitudes" rather than mere percentages. Cognitive frameworks built over entire careers for estimating development time have become obsolete almost overnight.

The software factory itself demonstrates this dramatic compression. The initial spec estimated three to four weeks for the base product, but the system delivered a working application in just two days. This acceleration stems not just from LLM capabilities but from how effectively the orchestration system parallelizes work and eliminates human coordination overhead. However, this creates its own challenges - traditional two-week sprint planning was based on the observation that humans can't accurately plan beyond two weeks, and now even that timeframe seems long.

The compression of timelines fundamentally changes product management priorities. Matt argues that roadmaps beyond three months are no longer trustworthy given the pace of development. The conversation shifts from "how long will this take" to "should we build this at all" and "what quality bar are we holding ourselves to." The cost of ownership becomes the most expensive aspect of building software, as the initial development time has collapsed but long-term maintenance complexity remains.

## The Evolution of Product Management and Team Structure

The case study reveals a fundamental restructuring of product teams in response to AI capabilities. Matt describes his organization as "product design and engineering" without traditional specialized roles. Instead, they hire product-minded engineers, engineers who are great designers, and designers who've shipped side projects. One designer who had rarely contributed code to production before joining is now a top contributor, delivering polish that would previously have required an incredibly senior frontend specialist.

The key hiring criteria have shifted to two requirements: willingness to ship code to production and being "AI enabled" - already proficient with AI tools. Matt explicitly states that candidates not already using AI tools "probably won't be happy here." This represents a significant filtering of the talent pool based on AI adoption and comfort level.

The role collapse extends to what used to be called "full stack engineers" - people who could handle frontend, backend, and some DevOps. This concept now extends to "full stack product management" - individuals who can handle customer conversations, problem identification, pattern recognition across customer bases, market analysis, decision-making, and shipping code. Engineers who were previously strong in backend can now use pattern libraries and AI assistance to build quality frontends, supported by design primitives created by those with design expertise.

## Product Strategy and Feature Prioritization

With the cost of building features dropping dramatically, the critical skill becomes knowing what not to build. The builder expresses concern about feature bloat becoming easier than ever, noting that "deciding what to build will be the challenge" and "the main task of product teams going forward." The discussion explores whether this might drive a return to minimalism - highly focused products that solve specific pain points extremely well rather than sprawling feature suites.

Matt emphasizes the importance of teams that kill features and products, citing Google's graveyard of sunset products as somewhat admirable despite being excessive. The ability to ship a feature, evaluate it against success criteria, and roll it back when it doesn't deliver impact becomes crucial for maintaining a focused product surface. The company uses an experimentation framework where engineers passionate about features can build and demo them internally. If the demo generates excitement, they get time to explore further. The path to production requires getting it working on the company's own account first, then rolling out via feature flags.

Interestingly, Matt notes that the apps people love most tend to be minimalistic ones doing a few things really well - Instagram, TikTok, Snapchat took something complex like infinite scrollable feeds and made them very simple to use. However, the current trend in AI tools is bundling, with apps like Claude and Codex doing everything from writing code to organizing desktop photos. The tension between market demand for bundled solutions and user preference for focused tools remains unresolved.

## Quality Standards in AI-Enabled Development

A counterintuitive finding is that AI enablement allows for higher quality standards rather than lower ones. Matt explains that he now holds engineers to a much higher bar than previously because finishing features is so cheap. In traditional development, after two weeks of work there was pressure to ship at 80% completion to gather feedback. Now, taking something from 80% to 95% quality is "probably two or three prompts away," eliminating any excuse for shipping with rough edges.

This reframes AI as a tool not just for speed but for quality. Matt pushes back against the perception that AI tools lead to "slop," arguing he sees the opposite. The low cost of addressing edge cases and polish means there's no longer a valid trade-off between speed and quality - teams can have both. This requires discipline, as the temptation exists to ship quickly and move on, but the technical capacity to deliver high quality is now readily available.

The builder acknowledges this while noting the human psychology challenge. Planning isn't satisfying in the way that rapid iteration is - there's something about the "dopamine receptors" firing with each prompt and seeing immediate results that makes thorough upfront specification less appealing. Yet the database feature example demonstrates that insufficient planning leads to more total time investment through numerous iterations and bug fixes, just distributed differently across the development cycle.

## Self-Improvement and Autonomous Maintenance

One of the most striking aspects of the software factory is its self-improvement capability. The builder expresses surprise at "how well the self-improvement worked in terms of adding tests when all the backlog was built out" and how the system "went ahead and polished the product to an extent" autonomously. This represents agents not just executing specified work but identifying opportunities for improvement and implementing them without human direction.

The system uses its own automations product to find latent experiments and clean up code, including deleting features that haven't progressed to production. This meta-level of automation - agents maintaining and improving the factory itself - represents advanced LLMOps maturity. However, the builder expresses concern that maintaining a software factory shouldn't become the primary focus, drawing an analogy to physical factories where processes are necessary but often "quite mundane to maintain" and "not very creative."

The hope is that as tooling improves, even factory maintenance becomes more autonomous, allowing product roles to return to creative work focused on user experience and problem-solving rather than process management. This reflects a broader tension in LLMOps between the excitement of what's possible and the reality that sophisticated AI systems require significant operational overhead.

## Real-World Performance and Limitations

The case study is notably honest about limitations. While the factory successfully built a functional note-taking application with complex features like an editor and database views in eight days, the quality is uneven. UI bugs slip through automated testing. The builder "didn't quite expect" some behaviors and found feature development less impressive than hoped for in certain areas. The database view works but has visual glitches and usability issues requiring manual bug reporting.

The system's effectiveness varies significantly based on repository preparation and context. When the repository has good pattern libraries, component structures, and clear conventions, even underspecified prompts produce decent results. The database feature with minimal specification still produced something recognizable because the foundation work was solid. This suggests that the upfront investment in repository structure and development patterns pays significant dividends in agent effectiveness.

The discussion reveals that LLMs themselves likely have estimation biases based on training data reflecting pre-AI development timelines. The builder notes that the factory's own estimates of "three to four weeks" for work that took two days reflects how "all the data out there on software development shows timelines that are not really current anymore." This suggests LLMOps practitioners need to develop new intuitions and actively distrust model estimates based on historical data.

## Broader Implications for Software Development

The case study points toward fundamental shifts in how software is built. The builder and Matt discuss how "the fun part is more on the product side" now, with engineering becoming more about orchestration than implementation. There's concern but also hope that this evolution leads to more creative product work rather than just factory maintenance. The emphasis on product taste emerges as perhaps the most critical skill - knowing what to build, what not to build, and what quality bar to maintain.

The collapse of specialized roles into generalists who can span product, design, and engineering represents a significant organizational change. The ability to ship end-to-end becomes table stakes, enabled by AI tools that fill gaps in individual skill sets. The requirement that all team members be "AI enabled" from day one suggests a generational shift in how engineering teams are constructed and what baseline capabilities are expected.

The conversation touches on deeper questions about the future of software interfaces - will text-based prompts remain the primary interaction model, or will something more minimal and human-centric emerge? The observation that successful apps like Instagram took complexity and made it simple raises questions about what the AI equivalent looks like beyond prompt boxes and text streams.

## Practical Recommendations and Lessons

The builder offers practical guidance for teams attempting similar approaches. Start small, build feature by feature, and test thoroughly - either manually or through automation. Don't expect magic bullet moments where you describe a product and receive it fully formed the next day. Invest heavily in the software development lifecycle infrastructure - the loops, checks, and automations that validate agent output. The quality of results depends heavily on how well you've prepared the repository with patterns, components, and clear conventions.

Balance planning time against iteration speed based on feature complexity. Simple changes can be approached with minimal specification, while larger features benefit from thorough upfront planning even if it's less immediately satisfying. Recognize that the skills being developed are around AI tool orchestration and prompt engineering rather than traditional coding, but these are genuine skills requiring practice and refinement.

The experimentation framework described - demo internally, get feedback, ship to your own account, graduate through feature flags to broader audiences, and roll back experiments that don't progress - provides a concrete pattern for maintaining quality while enabling rapid innovation. The discipline to kill features and maintain a focused product surface becomes more important as the cost of building drops.

This case study ultimately demonstrates both the remarkable potential and current limitations of fully autonomous AI-driven development, providing valuable insights into what works, what doesn't, and how product development practices must evolve to leverage these capabilities effectively while maintaining quality and strategic focus.
