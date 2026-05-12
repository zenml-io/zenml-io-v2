---
title: "Demand-Driven Context Management for Enterprise AI Agents"
slug: "demand-driven-context-management-for-enterprise-ai-agents"
draft: false
llmopsTags:
  - "document-processing"
  - "code-generation"
  - "rag"
  - "prompt-engineering"
  - "mcp"
  - "agent-based"
  - "evals"
  - "chunking"
  - "documentation"
  - "langchain"
  - "crewai"
  - "anthropic"
industryTags: "e-commerce"
company: "IKEA"
summary: "IKEA's delivery and services domain, comprising over 100 engineers across six product teams, developed a novel approach to addressing the institutional knowledge gap that prevents AI agents from delivering business value in enterprise environments. While 88% of companies use AI, only 6% see meaningful value creation, primarily because agents struggle with undocumented institutional knowledge that exists only in people's minds. The demand-driven context approach treats agents as knowledge managers rather than mere consumers, using a pull-based strategy where agents are assigned tasks, identify knowledge gaps through failure, and then curate discovered knowledge into structured context blocks. Initial implementations demonstrated the ability to surface previously undocumented knowledge and improve confidence scores from 1.5 to 4.4 across 14 incident resolution cycles, with the approach validated through a preprint published in March 2026."
link: "https://www.youtube.com/watch?v=_QAVExf_1uw"
year: 2026
seo:
  title: "IKEA: Demand-Driven Context Management for Enterprise AI Agents - ZenML LLMOps Database"
  description: "IKEA's delivery and services domain, comprising over 100 engineers across six product teams, developed a novel approach to addressing the institutional knowledge gap that prevents AI agents from delivering business value in enterprise environments. While 88% of companies use AI, only 6% see meaningful value creation, primarily because agents struggle with undocumented institutional knowledge that exists only in people's minds. The demand-driven context approach treats agents as knowledge managers rather than mere consumers, using a pull-based strategy where agents are assigned tasks, identify knowledge gaps through failure, and then curate discovered knowledge into structured context blocks. Initial implementations demonstrated the ability to surface previously undocumented knowledge and improve confidence scores from 1.5 to 4.4 across 14 incident resolution cycles, with the approach validated through a preprint published in March 2026."
  canonical: "https://www.zenml.io/llmops-database/demand-driven-context-management-for-enterprise-ai-agents"
  ogTitle: "IKEA: Demand-Driven Context Management for Enterprise AI Agents - ZenML LLMOps Database"
  ogDescription: "IKEA's delivery and services domain, comprising over 100 engineers across six product teams, developed a novel approach to addressing the institutional knowledge gap that prevents AI agents from delivering business value in enterprise environments. While 88% of companies use AI, only 6% see meaningful value creation, primarily because agents struggle with undocumented institutional knowledge that exists only in people's minds. The demand-driven context approach treats agents as knowledge managers rather than mere consumers, using a pull-based strategy where agents are assigned tasks, identify knowledge gaps through failure, and then curate discovered knowledge into structured context blocks. Initial implementations demonstrated the ability to surface previously undocumented knowledge and improve confidence scores from 1.5 to 4.4 across 14 incident resolution cycles, with the approach validated through a preprint published in March 2026."
notion:
  pageId: "358f8dff-2538-80cd-80d0-f46692d104e4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-06T08:59:00.000Z"
  lastEditedTime: "2026-05-06T08:59:00.000Z"
  publishedAt: "2026-05-10T06:02:39Z"
---

## Overview

This case study from IKEA's delivery and services domain addresses a fundamental challenge in enterprise LLMOps: the gap between AI agent capabilities and actual business value delivery. The presenter, a staff software engineer working with over 100 engineers across six product teams, identifies that while AI agents excel at code generation and general reasoning tasks, they consistently struggle with institutional knowledge that is either poorly documented, outdated, duplicated, or exists only as tribal knowledge within teams. This knowledge gap manifests directly in business metrics, with Jira tickets and epics failing to move despite significant AI investment. The presented solution, called demand-driven context management, reverses the traditional push-based knowledge strategy by treating agents as active knowledge managers who pull information on-demand and curate it for reuse.

## The Core Problem in Enterprise LLMOps

The case study begins by contextualizing the broader enterprise AI challenge. Despite 88% of companies using AI according to McKinsey data from 2026, only 6% achieve meaningful value creation. The presenter analyzes typical Jira tickets to demonstrate that they contain three types of knowledge requirements: tasks that LLMs are already trained on (general knowledge), tasks requiring specific organizational approaches (teachable through agent extensions or skills), and tasks requiring institutional knowledge that exists nowhere in documented form. While agents handle the first two categories adequately, the third category creates insurmountable barriers to autonomous task completion.

The traditional enterprise solution has been to build extensive retrieval layers using RAG systems, MCPs, and knowledge graphs over existing documentation repositories like Confluence, Jira, SharePoint, and GitHub. However, the presenter draws from personal experience building over 20 MCP servers to argue that this approach fails because the underlying institutional knowledge base itself is fundamentally flawed. A representative breakdown shows that approximately 20% of enterprise knowledge is outdated, 20% is unreliable, 10% is duplicated across different locations, and critically, 40% exists only as tribal knowledge in people's minds and has never been documented at all. Building retrieval systems on top of this "monolithic knowledge base" produces undeterministic, unreliable, and untested outputs regardless of the sophistication of the retrieval layer.

## The Demand-Driven Context Approach

The proposed solution draws an explicit analogy to onboarding human employees. Rather than requiring new hires to master all company documentation before receiving assignments, organizations assign work items immediately and allow employees to pull information as needed, ask questions to fill gaps, and ideally document their learnings for others. The demand-driven context approach applies this same pattern to AI agents through four distinct phases.

First, instead of pushing all available knowledge to agents, the system assigns actual work items (problems, incidents, Jira tickets) to agents with only minimal initial context. Second, agents attempt to solve these problems and inevitably fail, but in failing they generate explicit checklists of missing information required for task completion. Third, domain experts fulfill these knowledge requests, and fourth, the agent not only solves the original problem but also curates the newly acquired knowledge into structured, reusable context blocks that can be leveraged by other agents or in future iterations.

This approach transforms agents from passive knowledge consumers into active knowledge managers. The system runs in cycles, with each problem-solving attempt surfacing previously undocumented knowledge, receiving expert input, and incrementally improving the curated knowledge base. The presenter explicitly compares this to Test-Driven Development, where failing tests drive incremental product development. Here, failing agent tasks drive incremental knowledge base improvement.

## Technical Implementation and Architecture

The implementation demonstrated uses Claude Code as the agent framework, though the presenter emphasizes the approach is framework-agnostic and works equally well with GitHub Copilot or other agents. The system architecture consists of several key components: agent skills that enable knowledge discovery and curation, rules that guide agent behavior, hooks for integration with knowledge sources, and a structured storage layer for the curated knowledge base.

The demonstration shows the agent working with flat file representations of enterprise knowledge sources (Confluence, Slack, GitHub) and a set of recent incidents for root cause analysis. When assigned an incident, the agent first performs retrieval against existing knowledge sources, similar to traditional RAG systems. However, it then performs three additional critical steps that distinguish this approach: it assesses confidence in retrieved information on a one-to-five scale, identifies specific knowledge gaps preventing task completion, and explicitly categorizes what business logic, terminologies, or domain concepts are undocumented.

In the live demonstration, an incident initially produced a confidence score of 1.5 out of 5, with the agent identifying multiple undocumented terminologies and missing business logic. After receiving domain expert input to fill identified gaps, the agent successfully completed the root cause analysis and documented the newly discovered knowledge in structured form. When this cycle was repeated across 14 incidents, the confidence score progressively improved from 1.4 to 4.4, demonstrating measurable knowledge base enhancement.

## Automation and Scaling Strategy

Recognizing that manual iteration would be impractical at enterprise scale, the approach emphasizes automation. Rather than requiring engineers to sit with agents answering questions in real-time, the system can batch process historical work items (archived incidents, closed Jira tickets, resolved support cases) to perform knowledge base assessment at scale. This automated context gap scanning takes existing work items, validates them against the current knowledge base, and generates comprehensive reports on documentation quality.

The context gap scanner generates probes—essentially test cases for knowledge completeness—from each work item. It then runs these probes against all connected knowledge sources and produces a consolidated analysis showing what percentage of institutional knowledge is well-documented, what is stale or unreliable, what is incomplete, and what is entirely missing. Results are organized by criticality (critical, high, medium) based on frequency of appearance across multiple work items, helping teams prioritize documentation efforts on the knowledge gaps that block the most tasks.

The demonstration of the automated scanner processed 20 incidents against a simulated knowledge base and produced metrics showing the agent could only partially handle basic edge cases due to incomplete documentation. It identified specific gaps in tribal knowledge, system information, and business processes, categorizing them by severity. The output includes a Kanban board structure that treats knowledge gaps as work items to be resolved, similar to technical debt tickets.

## Knowledge Storage and Meta-Model

A critical architectural decision concerns where and how curated knowledge should be stored. The presenter advocates strongly for using GitHub repositories as the primary storage layer, despite acknowledging this is an opinionated position. The rationale centers on collaborative knowledge management at scale: multiple agents and multiple human domain experts will contribute simultaneously to the shared knowledge base, creating natural conflicts and requiring review processes. GitHub provides built-in pull request workflows, conflict resolution mechanisms, and version control that make this collaborative curation practical. Additionally, knowledge stored in GitHub can be published to other platforms like Confluence or Slack as needed, making it a flexible foundation rather than a silo.

Beyond simple storage, the approach emphasizes maintaining a meta-model—a structured representation of how business processes relate to systems, how systems relate to APIs, and how business and technical jargons map to specific components. While not strictly required for the demand-driven context approach, the meta-model provides agents with a navigation map through the knowledge base. Rather than searching through an unstructured dump of files, agents can traverse relationships to understand that changing a particular system will affect specific business processes and require modifications to certain APIs. The file structure of the GitHub repository itself serves as a physical manifestation of this meta-model, encoding domain structure directly in the organizational hierarchy.

## Evaluation and Results

The approach has been validated through multiple implementation attempts and published as a preprint on arXiv in March 2026. Testing across different datasets demonstrated several measurable outcomes. Knowledge confidence scores improved from initial states around 1.4-1.5 to 4.4 out of 5 through iterative cycles. Previously undocumented knowledge became explicitly visible rather than remaining invisible as tribal knowledge. The automated scanner processed typical domain knowledge in approximately 96K tokens per domain, easily fitting within modern context windows like Claude's 1 million token limit without requiring additional retrieval optimization.

The presenter emphasizes that evaluation in this context differs from traditional machine learning evaluation. Rather than running formal evals on retrieval quality, the focus is on whether retrieved information actually enables task completion. Many enterprise teams build 10-20 MCP servers and check whether they produce output, but rarely assess whether that output genuinely solves problems or simply generates busywork. The demand-driven approach surfaces this distinction explicitly by measuring agent confidence in completing actual tasks and tracking what proportion of knowledge requests can be fulfilled from existing documentation versus requiring new expert input.

## Production Deployment Considerations

Several practical challenges and limitations emerged from implementation experience. Manual operation of the demand-driven cycles proves extremely tedious and is not recommended beyond initial testing. The presenter attempted to manually answer agent questions across 15 cycles and found it exhausting to the point of abandonment. Automation is essential for practical use. The approach also assumes a certain baseline of organizational dysfunction—teams with genuinely excellent, well-maintained documentation may find limited value. The system is most beneficial for organizations with complex, poorly documented institutional knowledge spread across multiple systems and tribal knowledge repositories.

Scale of deployment matters significantly. Attempting to implement demand-driven context management at full enterprise scale across multiple domains proves impractical because no single person possesses comprehensive domain expertise. The presenter recommends starting at team level, using that team's specific Jira tickets, incidents, and Confluence pages as the bounded scope. This allows faster iteration and enables a single domain expert to provide necessary knowledge inputs. Once team-level knowledge is adequately curated, the approach can expand to domain or division level.

The choice of when to apply the approach also impacts success. The presenter advocates strongly for fixing context gaps before operational deployment rather than during real-time agent operation. Using the automated scanner to assess and improve knowledge quality with historical work items, then reaching 60-80% documentation quality before assigning live tasks to agents, proves more efficient than learning on-the-fly during production incidents. This front-loads the knowledge curation effort but results in more reliable autonomous operation afterward.

## Integration with Existing LLMOps Infrastructure

The demand-driven context approach positions itself as a complementary layer within the broader LLMOps pipeline rather than a replacement for existing components. The standard enterprise AI ROI pipeline consists of LLM model quality (provided by model vendors), agent frameworks and harnesses (provided by agent platform vendors), and retrieval layers (the subject of a $9 billion market for RAG and MCP solutions). Institutional knowledge sits beneath all of this in systems like Confluence, Jira, SharePoint, and GitHub.

Demand-driven context management inserts between the institutional knowledge sources and the retrieval layer, functioning as a curator and cache. Rather than having agents query the entire monolithic knowledge base for every task, curated context blocks provide high-quality, tested knowledge that addresses 80% of common scenarios through the 80/20 principle. When agents encounter edge cases requiring deeper information, they can still access the broader knowledge base through traditional retrieval mechanisms, but the curated blocks handle most operational needs efficiently.

This architecture allows continued use of existing MCP servers and RAG systems. The flat file demonstrations in the workshop could be replaced with connections to production Confluence instances, Slack archives, or GitHub repositories through the same MCP interfaces already deployed. The demand-driven approach adds the missing layer of quality assessment, gap identification, and active curation that makes retrieval genuinely valuable rather than simply voluminous.

## Cost and Maintenance Implications

Questions from workshop participants raised important concerns about ongoing costs and maintenance burden. Processing knowledge bases that typically average 96K tokens per domain with current LLM pricing makes even daily automated scanning economically feasible. The presenter estimated that multiple participants simultaneously using the demo context gap scanner would struggle to consume even one dollar in API costs, suggesting token-based costs are not the primary constraint for most teams.

However, the maintenance question proves more complex. As enterprise knowledge evolves, previously correct documentation becomes outdated, requiring mechanisms to identify and update stale information. The system handles this partially through metadata tracking—recording creation dates and last update times, allowing threshold-based flagging of potentially outdated content. When multiple versions of the same information exist across different documents, the scanner identifies duplications and flags them for consolidation. But if a document contains genuinely incorrect information that was recently updated, the system cannot automatically detect the error any more than a human reviewing the same documentation could. This limitation reinforces that the approach aids knowledge management but does not eliminate the need for human domain expertise and oversight.

The presenter notes that the scope of affected documentation determines maintenance burden. A team-scoped implementation with focused knowledge boundaries requires less ongoing maintenance than an enterprise-wide deployment. The Kanban board structure helps manage maintenance as discrete work items that can be prioritized and tracked alongside feature development rather than as an overwhelming mass of documentation debt.

## Critical Assessment and Limitations

The workshop format allowed for substantial critical questioning that reveals important limitations and open challenges. One participant raised concerns about potential denial-of-service attacks on team members, noting that LLMs are optimized to continuously elicit information through follow-up questions. This could create unsustainable demand on domain experts if not managed carefully through batching, prioritization, and automation.

Another participant questioned the fundamental assumption that documentation represents the source of truth, arguing that in many organizations, code is the actual source of truth. The presenter acknowledged attempting to combine code repositories with textual documentation but encountering conflicts when GitHub documentation contradicted Confluence documentation, requiring additional rules to establish priority hierarchies. This challenge remains partially unresolved.

The approach also assumes relatively stable knowledge that changes incrementally rather than continuously. In environments with very high knowledge churn, the maintenance burden could indeed become overwhelming. The presenter's response that organizations will eventually need to address knowledge quality regardless of the approach is somewhat circular—it acknowledges the problem without fully solving the scalability challenge in highly dynamic domains.

The emphasis on GitHub as storage infrastructure, while pragmatically justified, also introduces vendor lock-in and assumes git-based workflows that may not align with all organizational cultures. The counterargument that knowledge can be published from GitHub to other platforms mitigates but does not eliminate this concern.

## Broader LLMOps Context and Future Directions

The case study situates demand-driven context management within the rapid evolution of AI agent capabilities. The presenter notes the progression from prompt engineering to RAG to MCP to multi-agent systems to deep agents, with recent developments like Replit enabling full-stack application generation in minutes. Against this backdrop of advancing agent capabilities, the persistent gap in institutional knowledge becomes increasingly visible as the limiting factor preventing business value realization.

The workshop discussion touched on potential extensions including using meeting transcripts as knowledge sources, applying the approach to identify gaps in internal tooling rather than documentation, and evolving not just knowledge but agent skills themselves through similar iterative processes. One participant suggested that failed tasks could drive skill evolution in addition to knowledge curation, creating a comprehensive learning system. The presenter acknowledged these as promising directions but noted the focus remains on solving the knowledge problem before retrieval rather than during operations.

The publication of a preprint on arXiv in March 2026 indicates academic engagement with the approach beyond internal IKEA implementation. The GitHub repository and context gap scanner tool made available during the workshop demonstrate commitment to open development and community validation rather than proprietary capture of the methodology.

The presenter's observation that "nobody is going to come to your company and fix your knowledge base—you have to fix it yourself" encapsulates the core insight: while LLM providers will improve model quality and retrieval vendors will improve search capabilities, the actual quality of institutional knowledge remains an internal organizational responsibility that current LLMOps practices inadequately address. Demand-driven context management proposes to make that responsibility explicit and manageable through agent-assisted curation rather than hoping better retrieval alone will suffice.
