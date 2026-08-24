---
title: "Building an Always-On Agentic Teammate for Platform Engineering"
slug: "building-an-always-on-agentic-teammate-for-platform-engineering"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "poc"
  - "prompt-engineering"
  - "mcp"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "kubernetes"
  - "docker"
  - "fastapi"
  - "cicd"
  - "open-source"
  - "documentation"
  - "security"
  - "anthropic"
  - "openai"
industryTags: "finance"
company: "Melio"
summary: "Melio, a fintech company operating in the payments space, embarked on a journey to implement an always-on AI agent as a digital teammate working alongside their engineering teams. After initially exploring and piloting commercial solutions like Devin (similar to OpenClaw) for approximately two months, the platform team encountered significant limitations around security controls, user experience, latency, and customization capabilities. These challenges, combined with the team's deep understanding of the problem domain, led them to make the strategic decision to build their own solution called Kate. Within just two weeks of development using an agentic loop with LLMs doing the coding work, they deployed a functional platform that now supports 40 agents running across 30+ teams and 80+ Slack channels, with agents actively pushing pull requests and automating workflows throughout the organization."
link: "https://www.youtube.com/watch?v=N2TNOpWaImY"
year: 2026
seo:
  title: "Melio: Building an Always-On Agentic Teammate for Platform Engineering - ZenML LLMOps Database"
  description: "Melio, a fintech company operating in the payments space, embarked on a journey to implement an always-on AI agent as a digital teammate working alongside their engineering teams. After initially exploring and piloting commercial solutions like Devin (similar to OpenClaw) for approximately two months, the platform team encountered significant limitations around security controls, user experience, latency, and customization capabilities. These challenges, combined with the team's deep understanding of the problem domain, led them to make the strategic decision to build their own solution called Kate. Within just two weeks of development using an agentic loop with LLMs doing the coding work, they deployed a functional platform that now supports 40 agents running across 30+ teams and 80+ Slack channels, with agents actively pushing pull requests and automating workflows throughout the organization."
  canonical: "https://www.zenml.io/llmops-database/building-an-always-on-agentic-teammate-for-platform-engineering"
  ogTitle: "Melio: Building an Always-On Agentic Teammate for Platform Engineering - ZenML LLMOps Database"
  ogDescription: "Melio, a fintech company operating in the payments space, embarked on a journey to implement an always-on AI agent as a digital teammate working alongside their engineering teams. After initially exploring and piloting commercial solutions like Devin (similar to OpenClaw) for approximately two months, the platform team encountered significant limitations around security controls, user experience, latency, and customization capabilities. These challenges, combined with the team's deep understanding of the problem domain, led them to make the strategic decision to build their own solution called Kate. Within just two weeks of development using an agentic loop with LLMs doing the coding work, they deployed a functional platform that now supports 40 agents running across 30+ teams and 80+ Slack channels, with agents actively pushing pull requests and automating workflows throughout the organization."
notion:
  pageId: "3c6f8dff-2538-8057-b0f6-db80e20f3ccc"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T08:58:00.000Z"
  lastEditedTime: "2026-08-24T08:58:00.000Z"
  publishedAt: "2026-08-24T09:19:39Z"
---

## Overview and Context

Melio is a fintech company specializing in the payments space that has been on a two-year journey exploring and implementing AI-augmented development practices. The company's platform team, led by the speaker, has progressively moved through various stages of AI integration: starting with GitHub Copilot for autocomplete functionality, then moving to chat-based experiences with ChatGPT, followed by more integrated agent-based solutions like GitHub Copilot as an agent running within the IDE, and ultimately to their current state of deploying always-on agentic teammates that work alongside human engineers within their primary workspace (Slack).

The case study represents a significant evolution in how organizations are thinking about AI integration in software development—moving from assistive tools to collaborative digital team members. The presentation candidly discusses both the exploratory phase with commercial products and the ultimate decision to build an internal solution, providing valuable insights into the tradeoffs organizations face when operationalizing LLM-based systems at scale.

## Initial Exploration with Commercial Solutions

When Melio's platform team first approached the challenge of implementing an agentic teammate, they followed what might be considered best practice: evaluating existing commercial solutions before considering building internally. They explored a product similar to Devin (referred to in the presentation as resembling OpenClaw), which they found compelling for several reasons. The product offered the ability to learn over time, skill development capabilities, integration with Slack, cron job scheduling, and other features that aligned well with their vision of an always-on agent.

However, the initial enthusiasm for the commercial solution encountered significant friction when they attempted actual deployment. Operating in the fintech/payments sector, Melio faces strict security requirements that immediately created challenges. Their initial approach to hardening security involved deploying the agent in an EC2 sandbox environment with no production access, essentially creating a highly controlled container where the agent could operate. While this approach made the security team comfortable enough to begin experimentation, it represented only the first of several obstacles.

The pilot phase with the commercial solution lasted approximately two months, during which the team gained crucial hands-on experience with the paradigm of agentic AI. This experimentation period proved invaluable for understanding both the potential value proposition and the practical challenges of deploying such systems in their organizational context.

## Deployment Pattern Challenges and Learning

A particularly interesting aspect of the case study is the discussion of deployment patterns—how to structure and distribute agent instances across an organization. Melio experimented with several approaches: a single agent instance for the entire organization, dedicated agents per team, domain-specific agents (for example, one agent expert in payments, another expert in banking services), and even per-use-case agents with specialized expertise in areas like deployment processes.

For each deployment pattern, they created dedicated Slack applications with unique identities, essentially treating each agent as a distinct entity within their collaboration ecosystem. This approach initially seemed promising but quickly revealed scalability challenges. The team realized that in a larger organization, this pattern would lead to proliferation of Slack applications—potentially 50 or 60 separate instances—creating confusion about which agent to engage with for which purposes and complicating the overall user experience.

The release of Claude with tagging capabilities (presumably Claude's Projects feature or similar organizational capabilities) served as a catalyst for rethinking their deployment strategy. This timing coincided with their growing realization that the per-instance deployment pattern was fundamentally not scalable for their needs, particularly as they thought about long-term organizational growth.

## Critical Observations on Team Adoption Patterns

One of the most valuable insights from Melio's pilot phase relates to how different teams approached working with the agentic AI. The speaker identified two distinct patterns of team behavior that had dramatically different outcomes:

Some teams approached the always-on agent as a technical automation platform. They tried to think systematically about use cases, develop workflows, and create structured automations. For example, they would design a workflow where the agent would wake up each morning, review all overnight alerts that weren't critical enough to page someone via PagerDuty, open pull requests, and tag appropriate team members. While this approach sounds logical, these teams struggled significantly with analysis paralysis. The open-ended nature of the agent's capabilities and the breadth of what it could potentially do made it difficult to narrow down specific use cases, leading to excessive planning and limited actual value delivery.

In contrast, other teams treated the agent simply as a colleague—a digital team member to collaborate with naturally. They engaged in continuous interaction, providing ongoing steering and feedback in the conversation flow. They would tell the agent what to do and how to do it, correct its approach when needed, and work iteratively. Importantly, the agent's ability to autonomously develop new skills as it worked proved highly beneficial to this collaborative approach. This observation fundamentally shaped Melio's philosophy going forward: they began emphasizing collaboration over automation, encouraging teams to think of the agent as a team member rather than as a workflow automation tool like n8n.

This insight has important implications for how organizations should approach enablement and change management when deploying agentic AI systems. The more successful adoption pattern relied on natural interaction rather than upfront systematic planning, suggesting that the value of these systems may be more emergent than can be captured through traditional requirements analysis and workflow design.

## Technical and Operational Limitations of Commercial Solutions

Beyond deployment patterns and adoption challenges, Melio encountered several concrete technical limitations with the commercial solution that ultimately influenced their decision to build internally:

**User Experience Issues**: A significant problem was the drift of interaction away from their primary workspace (Slack) toward the desktop experience provided by the commercial tool. While the vendor's desktop application offered excellent capabilities, this fragmentation meant reduced organizational visibility and control. More critically, when interactions did occur within Slack, the output formatting was severely lacking. The agent would produce large blocks of unformatted text without proper markdown rendering or code blocks, making it difficult for engineers to read and act upon the outputs. This might seem like a minor issue, but user experience details significantly impact adoption rates and ongoing engagement with AI tools.

**Latency Concerns**: Time-to-first-token proved problematic in the commercial solution. While the speaker notes that the vendor released an update aimed at improving this issue just two days before the presentation, the latency challenges during their pilot period represented a meaningful friction point for real-time collaboration scenarios. When an agent is positioned as a teammate working alongside humans in a chat environment, responsiveness becomes critical to maintaining the flow of work.

**Control and Customization Limitations**: Perhaps the most significant limitation involved the inability to control underlying model selection and configuration for specific tasks. The speaker provides a concrete example: when asking the agent to create a cron job for recurring tasks, users could not specify which underlying LLM should power that particular automation. If their general configuration used Sonnet 4.5, they couldn't tell the system to use a smaller, more cost-effective model like Haiku for simpler scheduled tasks. This lack of granular control over model selection prevented optimization of the cost-performance tradeoff at the task level.

More broadly, the commercial solution lacked the deep customization needed to align with Melio's specific organizational workflows, Slack channel structure, team silos, and internal processes. For a company with established ways of working, the inability to adapt the agent system to match existing patterns rather than forcing process changes represented a substantial limitation.

## The Decision to Build Internally

After two months of hands-on experience with the commercial solution, Melio's platform team had accumulated significant domain expertise in agentic AI systems. The speaker describes feeling like an "expert" in the space—not in an arrogant sense, but rather acknowledging that the intensive daily work with these systems had given them deep understanding of the problem domain, the technical requirements, and the organizational needs.

The timing of Claude's release of their tagging/projects feature (likely Claude Projects or a similar offering from Anthropic) provided another data point. Even with a sophisticated vendor like Anthropic releasing dedicated agentic products, Melio's team didn't feel the offering was mature enough for their specific requirements. This assessment, combined with their accumulated expertise, led to a pivotal decision: build their own solution.

The speaker candidly acknowledges this as a "frightening" decision from a management perspective. Committing engineering team resources to building a custom solution in such a rapidly evolving space involves considerable risk. The technology landscape is changing quickly, and there's always the possibility that a commercial solution might suddenly emerge that obviates the need for internal development. However, the team's conviction in their understanding of the problem domain, combined with the clear gaps in available solutions, justified the investment.

They named their internal platform Kate (and humorously discovered only later that another Kate agent exists in the market as well). The key principle the speaker articulates is: when you're strong in a particular domain and deeply understand the problem space you're operating in, don't be afraid to build custom solutions if existing products don't adequately meet your needs.

## Building Kate: Architecture and Implementation Approach

The technical approach Melio took to building Kate demonstrates sophisticated thinking about modern LLM-based development and the power of agentic coding systems to accelerate development.

**Research and Feature Definition Phase**: Rather than starting with a blank slate, the team leveraged LLMs to bootstrap their understanding and feature planning. They used Claude (what was available at the time) to conduct research, specifically pointing it at the codebases of reference implementations like Devin (the commercial solution they had been evaluating), as well as documentation from Claude and other relevant sources. The LLM then generated a feature matrix—a comprehensive list of capabilities these reference systems offered.

With this feature matrix in hand, the team conducted prioritization exercises to determine what constituted the MVP versus what could be deferred to later phases. This approach demonstrates a pragmatic use of LLMs for competitive analysis and product planning, using AI to accelerate the research phase that would traditionally require substantial manual effort.

**Infrastructure Decisions**: For the core platform architecture, Melio chose Kubernetes as their orchestration layer, which makes sense given their need to manage multiple agent instances with different configurations and resource profiles. For sandboxing and isolation, they implemented containerization with Firecracker, a virtualization technology that provides lightweight, secure execution environments. These architectural choices reflect security-conscious thinking appropriate for a fintech organization while maintaining the flexibility to scale horizontally as agent usage grows across the organization.

**Agentic Development Loop**: The implementation phase itself showcases the potential of AI-augmented development. The team used state-of-the-art models available at the time—primarily GPT-4 Omni and Claude Sonnet—to actually write the code for Kate. They maintained reference implementations as ongoing context, making it easy to point the coding agent at specific implementations (like Devin's cron job code) to understand patterns and approaches.

An interesting technical note: the speaker mentions that their entire cron implementation is 300 lines of TypeScript, compared to 6,000 lines of Python in the Devin codebase. This dramatic difference could reflect several factors: TypeScript's expressiveness, different feature scopes, or potentially more concise design choices. Regardless, it illustrates that reimplementation often doesn't require matching the complexity of reference systems.

**Verification and Testing Strategy**: A crucial element of their development approach was continuous verification through what's increasingly called the "agentic loop" or "agentic engineering loop." They used Model Context Protocol (MCP) to create a direct connection between the agent they were building and their Slack workspace. This allowed them to run the agent in test/development mode within the actual Slack environment where it would ultimately operate, enabling human engineers to interact with it, test behaviors, and provide feedback that would immediately inform the next iteration of development.

This tight feedback loop—write code with AI assistance, deploy to test environment, interact with the agent as a user would, identify issues, feed observations back into the development process—represents a sophisticated implementation of test-driven development adapted for AI systems. It's the kind of approach that's becoming standard practice in LLMOps but is still relatively novel compared to traditional software development methodologies.

**Timeline and Results**: Remarkably, this entire development process—from initial planning to a working platform delivering value—took only two weeks. The speaker notes that at the time of the presentation, they were in week three of Kate being operational. Despite this short timeframe, they had already deployed 40 agent instances running across more than 30 teams and 80+ Slack channels, with agents actively contributing to work by pushing pull requests and automating various workflows.

This rapid timeline is noteworthy and likely represents the combined effect of several factors: the team's deep domain knowledge from their pilot phase, the use of agentic coding to accelerate development, clear prioritization of MVP features, and the relatively mature state of underlying LLM capabilities that Kate builds upon.

## Kate's Core Capabilities and Design Philosophy

The Kate platform embodies several key principles that distinguish it from the commercial solution Melio had evaluated:

**Native Slack Experience**: A primary focus was creating a truly native experience within Slack, their primary collaboration workspace. Kate produces outputs using Slack's native formatting capabilities, including proper code blocks and markdown rendering. This seemingly simple feature dramatically improves readability and usability compared to the plain text outputs they had experienced with the commercial solution. By keeping all interaction within the existing workspace, Kate reduces context-switching and maintains organizational visibility into agent activities.

**Per-Job Model Selection**: One of the specific limitations Melio had identified in commercial solutions was the inability to choose different models for different tasks. Kate addresses this directly by allowing per-cron-job model selection. Teams can configure specific recurring tasks to use smaller, more cost-effective models (like Haiku for simple operations) while reserving more capable models (like Sonnet or GPT-4) for complex reasoning tasks. This granular control enables cost optimization at a level of detail not available in off-the-shelf solutions.

**Composable Agent Identities**: Rather than deploying monolithic agent instances, Kate implements a concept of composable agent identities. Each agent identity is essentially a configured instance with specific skills, permissions, environment access, Slack channel memberships, and scheduled jobs. The speaker draws an analogy to how you would think about a human team member: they have their skill set, their access permissions, their workspace (which channels they're in), and their regular responsibilities (recurring tasks they perform).

This identity-based model provides flexibility in deployment patterns while maintaining manageability. Teams can create agent identities tailored to specific domains or responsibilities without fragmenting the overall platform or creating the confusion that arose from their earlier experiments with multiple separate Slack applications.

**Self-Service UI**: A significant enablement feature is a self-service interface that allows any team at Melio to create and configure their own agent identities without requiring involvement from the platform team. This democratization of agent deployment is crucial for scaling adoption across the organization. Teams can define what their agent should know, what permissions it should have, which channels it should participate in, and what recurring tasks it should perform—all through a user-friendly interface.

**Advanced Triggering Capabilities**: Beyond basic conversational interaction, Kate supports sophisticated triggering mechanisms. The speaker mentions that they recently added regular expression triggers, allowing teams to configure agents to automatically respond when messages in specific Slack channels match certain patterns. This enables proactive agent behavior without requiring explicit invocation, making the agent truly "always on" and contextually aware.

## Organizational Knowledge and the Brain

A particularly sophisticated aspect of Kate's architecture is what Melio calls the "organizational brain"—a centralized knowledge repository that feeds context to all agents. This component addresses a fundamental challenge in deploying AI across an organization: how to encode and maintain organizational knowledge, procedures, and context in a way that's accessible to AI systems while remaining maintainable by humans.

**Architecture Based on LM Studio and Cradlify**: The organizational brain is built on LM Studio by Cradlify, which provides graph-based knowledge management capabilities. While the speaker notes this is a fairly well-known concept, the specific implementation details reveal thoughtful engineering.

**Knowledge Format Standardization**: Rather than inventing a proprietary format, Melio adopted Google's Open Knowledge Graph (OKG) format as their standard for encoding organizational knowledge. This decision reflects mature engineering thinking—leveraging an existing standard from a major technology company rather than creating yet another format. Using an established standard increases the likelihood of interoperability with other tools and provides a clear, documented structure for knowledge representation.

**Git-Based Storage and CI/CD Integration**: All organizational knowledge is stored in Git repositories, treating knowledge as code. This approach brings several significant advantages. First, it enables standard software development workflows including version control, branching, pull requests, and reviews. Second, it allows the team to implement continuous integration and deployment pipelines around knowledge management, automating validation, indexing, and distribution of knowledge updates.

**Contradiction Detection**: A particularly clever feature is automated contradiction detection. When someone attempts to add a new fact or procedure to the organizational brain, the system checks whether it contradicts existing knowledge. If a contradiction is detected, it generates a merge conflict—directly analogous to code conflicts in version control—that requires human resolution. This mechanism ensures knowledge consistency and forces explicit decision-making when organizational understanding evolves or when different parts of the organization have conflicting information.

**MCP Integration for Accessibility**: To make the organizational brain accessible to both technical and non-technical team members, Melio implemented Model Context Protocol integrations. This allows people without Git expertise to read from and contribute to the organizational knowledge base through more user-friendly interfaces. By lowering the barrier to knowledge contribution, the system increases the likelihood that the brain remains current and comprehensive.

**Cross-Organizational Synchronization**: An interesting benefit the speaker highlights is how the organizational brain creates alignment across different parts of the company. They give an example where the growth team receives KPIs, and a product manager in a different building thinking about a new feature can work in sync with those same KPIs. When the PM engages with Kate to generate a product requirements document, the agent has access to the same organizational context and goals that are guiding the growth team. This shared context foundation helps maintain strategic alignment in a way that's difficult to achieve through traditional communication channels alone.

## Real-World Usage Example: Security Plugin Development

The speaker shares a specific real-world interaction that illustrates Kate's value in practice. An engineer from the security team posted in a help channel (specifically "ES AI Enablement") asking how to create a new plugin for the organization's internal marketplace focused on security use cases. The engineer had never created such a plugin before and didn't know where to start.

In the Slack thread, the speaker (who in this context was acting as a team member, not an expert) simply told Kate to help with the request. Kate responded with guidance, and notably, the engineer didn't just passively receive the information—they actively engaged, indicating they had been "uploaded" or brought up to speed by Kate's explanation.

At this point, the domain expert—the engineer who had built the contribution guidelines and framework for the plugin system—entered the conversation. Rather than repeating everything Kate had explained, they reviewed Kate's guidance, validated it, and then told Kate to proceed with creating a pull request. Kate generated the PR, the domain expert reviewed it, and the loop was closed.

This example powerfully illustrates several aspects of Kate's value:

**Preserved Context**: The entire interaction happened in a single Slack thread, meaning everyone involved—from the original requester to the domain expert—had complete visibility into the conversation and maintained shared context. There was no need to hand off context manually or summarize previous interactions.

**Multiplier Effect**: Multiple humans collaborated through and with the AI agent. The speaker could provide initial triage without deep expertise, Kate could provide detailed guidance and implementation, and the domain expert could efficiently validate and close the loop without starting from scratch.

**Natural Workflow Integration**: The entire process occurred within Slack using standard patterns (asking questions in help channels, reviewing PRs) rather than requiring anyone to learn a new tool or process. The agent participated as a member of the team rather than as a separate system requiring context switching.

## Key Principles and Lessons Learned

Drawing from Melio's experience, several key principles emerge that are relevant to other organizations considering similar implementations:

**Learn the Domain Deeply Before Building**: Melio's two-month pilot with a commercial solution wasn't wasted effort even though they ultimately built their own platform. That period of hands-on experience gave them crucial domain knowledge about agentic AI systems, user adoption patterns, technical requirements, and organizational needs. This deep understanding informed better architectural decisions and clearer prioritization when they moved to building Kate.

**Use Existing Tools to Start**: The speaker emphasizes using existing commercial tools to gain initial experience rather than immediately jumping to custom development. This approach reduces risk, accelerates learning, and provides concrete reference points for understanding what works and what doesn't. Only after identifying clear gaps that existing solutions cannot address should organizations consider building internally.

**Design for Collaboration Over Automation**: One of the most important insights from Melio's experience is that treating agentic AI as a collaborative teammate rather than as an automation platform leads to better outcomes and faster value realization. This has implications for how the technology is positioned, how teams are enabled, and how success is measured.

**Customize for Your Reality**: The speaker strongly advocates for tailoring AI agent systems to match organizational workflows, communication patterns, and processes. Off-the-shelf solutions necessarily take a generalized approach, but maximum value often comes from deep integration with existing ways of working. This argues for either finding highly customizable platforms or, in cases where the gap is significant, building internally.

**Embrace the Agentic Loop**: The development approach Melio used—having AI agents help build AI agent platforms, with continuous human verification and feedback—represents a powerful paradigm for rapid development in the LLM era. This "agent building agent" approach with tight feedback loops dramatically compressed development timelines while maintaining quality.

## Critical Assessment and Open Questions

While Melio's case study presents an impressive implementation story, several questions and potential concerns merit consideration:

**Sustainability of Custom Development**: Building a custom platform like Kate involves ongoing maintenance, keeping up with rapid advances in underlying LLM capabilities, and potential technical debt. The speaker acknowledges the decision was "frightening," and it's worth considering whether a company of Melio's scale can sustain this investment long-term versus eventually converging toward commercial solutions as they mature.

**Evaluation and Quality Assurance**: The presentation focuses heavily on development and deployment but doesn't detail how Melio evaluates Kate's performance, monitors for errors or inappropriate outputs, or ensures quality over time. For a fintech company where mistakes could have compliance or financial implications, these operational concerns are crucial. The reliance on human-in-the-loop verification is mentioned in the development process, but it's unclear how quality is maintained in ongoing production use.

**Cost Implications**: With 40 agents running across 80+ channels, each potentially making numerous LLM API calls, the operational costs could be substantial. The per-job model selection capability helps optimize costs, but the presentation doesn't address the overall cost profile or whether the investment provides positive ROI. This is particularly relevant given that the platform team itself represents a significant ongoing investment.

**Security and Compliance in Practice**: While the speaker mentions security challenges that motivated moving away from the commercial solution, the presentation doesn't detail how Kate handles sensitive data, manages permissions at a granular level, or satisfies compliance requirements specific to fintech. The sandbox/Firecracker approach suggests strong isolation, but the operational security model remains somewhat unclear.

**Organizational Change Management**: Rapid adoption—going from zero to 40 agents across 30+ teams in a matter of weeks—is impressive but also raises questions about change management, training, and ensuring consistent practices. The self-service model for agent creation provides flexibility but could potentially lead to inconsistent practices or configuration sprawl without adequate governance.

**Comparison to Alternatives**: The decision to build was partly influenced by perceived immaturity of commercial offerings, but the field is evolving rapidly. It would be valuable to understand ongoing reassessment of this decision as products like Claude Enterprise, GitHub Copilot Workspace, and other agentic platforms continue to mature.

Despite these questions, Melio's case study represents a valuable contribution to understanding how organizations can operationalize agentic AI at scale. Their candid discussion of both successes and challenges, their willingness to iterate on approach, and their emphasis on learning and collaboration over pure automation provide useful patterns for other organizations navigating similar territory.
