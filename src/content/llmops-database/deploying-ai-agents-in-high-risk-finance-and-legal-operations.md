---
title: "Deploying AI Agents in High-Risk Finance and Legal Operations"
slug: "deploying-ai-agents-in-high-risk-finance-and-legal-operations"
draft: false
llmopsTags:
  - "healthcare"
  - "fraud-detection"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "multi-modality"
  - "code-generation"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "human-in-the-loop"
  - "harness-engineering"
  - "a2a"
  - "reinforcement-learning"
  - "langchain"
  - "crewai"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "anthropic"
  - "openai"
industryTags: "finance"
company: "Circle / Wells Fargo / Mayfield"
summary: "Circle and Wells Fargo discuss their approaches to deploying AI agents in high-stakes finance and legal environments where the cost of failure is substantial. The organizations emphasize the critical importance of verifiability, auditability, and rigorous evaluation frameworks when implementing agents for tasks like SOX compliance, earnings preparation, credit underwriting, and home mortgage processing. Both companies are building agentic infrastructures including agent gateways, harness layers, and enabling self-publishing capabilities for employees, while grappling with challenges around long-running processes, agent-to-agent communication, and organizational transformation where individual contributors become managers of agents."
link: "https://www.youtube.com/watch?v=elptCI-FSCA"
year: 2026
seo:
  title: "Circle / Wells Fargo / Mayfield: Deploying AI Agents in High-Risk Finance and Legal Operations - ZenML LLMOps Database"
  description: "Circle and Wells Fargo discuss their approaches to deploying AI agents in high-stakes finance and legal environments where the cost of failure is substantial. The organizations emphasize the critical importance of verifiability, auditability, and rigorous evaluation frameworks when implementing agents for tasks like SOX compliance, earnings preparation, credit underwriting, and home mortgage processing. Both companies are building agentic infrastructures including agent gateways, harness layers, and enabling self-publishing capabilities for employees, while grappling with challenges around long-running processes, agent-to-agent communication, and organizational transformation where individual contributors become managers of agents."
  canonical: "https://www.zenml.io/llmops-database/deploying-ai-agents-in-high-risk-finance-and-legal-operations"
  ogTitle: "Circle / Wells Fargo / Mayfield: Deploying AI Agents in High-Risk Finance and Legal Operations - ZenML LLMOps Database"
  ogDescription: "Circle and Wells Fargo discuss their approaches to deploying AI agents in high-stakes finance and legal environments where the cost of failure is substantial. The organizations emphasize the critical importance of verifiability, auditability, and rigorous evaluation frameworks when implementing agents for tasks like SOX compliance, earnings preparation, credit underwriting, and home mortgage processing. Both companies are building agentic infrastructures including agent gateways, harness layers, and enabling self-publishing capabilities for employees, while grappling with challenges around long-running processes, agent-to-agent communication, and organizational transformation where individual contributors become managers of agents."
notion:
  pageId: "3b8f8dff-2538-8071-a380-e7eb1d209aca"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:01:00.000Z"
  lastEditedTime: "2026-08-10T15:01:00.000Z"
  publishedAt: "2026-08-10T15:25:56Z"
---

## Overview

This case study captures insights from executives at Circle and Wells Fargo discussing the implementation of AI agents in high-risk finance and legal operations. Nikhil from Circle and Faraz from Wells Fargo share their experiences deploying agentic systems in environments where failures can have severe regulatory, financial, and reputational consequences. The discussion reveals the unique challenges of LLMOps in heavily regulated industries, including the need for extreme verifiability, sophisticated evaluation frameworks, and careful consideration of agent reliability over extended time horizons.

Both organizations are already using coding agents extensively, which serve as a useful analogy for other agent deployments due to their inherent testability and verifiability. However, when extending agents to core finance and legal functions like SOX compliance, earnings preparation, credit underwriting, and compliance monitoring, the bar for auditability and reliability increases dramatically. The case study illustrates the tension between the promise of agentic automation and the practical challenges of deploying these systems in production environments where mistakes can trigger regulatory action or significant financial losses.

## Requirements and Constraints for High-Risk Agent Deployment

The fundamental difference between agents in finance and legal domains versus other use cases centers on the cost of failure. As Nikhil articulates, when deploying agents for SOX compliance or earnings preparation, mistakes are simply not acceptable given the level of scrutiny from regulators and the potential impact on the company's existence. This drives several key requirements that shape how these organizations approach LLMOps.

The concept of "verifier's law" emerged as a central framework for thinking about which tasks are suitable for agentic automation. Tasks that are easy to verify, like Sudoku puzzles or code where test suites can be run, are ripe for agentic processes. Coding agents have succeeded precisely because outputs can be tested, reviewed for verbosity and design documentation, and validated against clear criteria. However, many financial and legal tasks are much harder to verify, creating longer lead times for agent adoption.

Wells Fargo faces particularly challenging verification scenarios. When making credit decisions on loan or credit card applications, the verification of whether the decision was correct might not occur until five years later when a borrower defaults or successfully repays. This creates an enormous gap between the agent's decision-making and the ability to confirm whether that decision was appropriate. This temporal challenge fundamentally shapes which processes the bank is willing to automate and how aggressively they deploy agents.

The auditability of agent decision-making becomes paramount in these environments. Organizations need to understand not just what decision an agent made, but why it made that decision, what data sources it accessed, and how it arrived at its conclusion. This requires sophisticated logging, observability, and explanability capabilities that go beyond what might be needed for lower-stakes applications.

## Evaluation Frameworks and Approaches

Both organizations emphasized that evaluation strategies are highly idiosyncratic, varying not just across organizations but across individual teams within the same company. There is no universal playbook for evaluating agents in production, and each use case requires custom evaluation frameworks tailored to the specific requirements and risk profile of that process.

Circle is in the process of building frameworks for scalable evaluations, but acknowledges that evals break for numerous reasons including model drift, data quality issues, and various other factors that can degrade agent performance over time. To manage this complexity, Circle has adopted a strategy of locking down multiple variables including the specific model used, the harness configuration, and the amount of external variability beyond the direct user input. This reduces the search space when investigating why an agent's performance has degraded.

A particularly interesting evaluation approach mentioned is "shadowing," where agents operate alongside humans performing the same task. For example, when a compliance analyst receives an inbound case and makes a decision, the agent simultaneously processes the same case and makes its own recommendation. The organization then compares the human and agent decisions as a form of evaluation. This human-agent shadowing is integrated into a reinforcement learning loop, allowing the system to continuously learn from the comparison of agent outputs with human expert decisions.

This shadowing approach offers several advantages for high-risk environments. It provides real-world evaluation on actual production data without risking incorrect decisions reaching customers or regulators. It creates a continuous stream of evaluation data rather than relying on static test sets that may become stale. And it naturally captures the nuances and edge cases that occur in production but might not be represented in synthetic evaluation datasets.

Beyond accuracy metrics, both organizations track productivity metrics and economic indicators. Circle is measuring token spend against automation achieved, though they acknowledge the metrics remain fuzzy. Currently, the focus is less on minimizing token costs and more on understanding what level of productivity improvement can be achieved. Productivity manifests in several ways including increased output from the same number of humans, revenue increases, obvious cost savings, or the ability to reallocate human labor from task X to task Y.

An interesting observation is that while individual developers and product managers report being 30% more efficient when using AI tools, this individual productivity gain doesn't always translate to workflow-level improvements. This gap between individual tool usage and organizational benefit represents a significant challenge in realizing the value of agentic systems.

## Infrastructure and Architecture for Agent Deployment

Circle is building an agent gateway that serves as a central infrastructure component for their agentic ecosystem. This gateway provides discovery and communication capabilities, allowing employees to identify what agents exist in the organization and interact with them through interfaces like Slack. The gateway approach solves several problems including agent discoverability, access control, standardized interfaces, and the ability to monitor and govern agent usage across the organization.

The organization is rolling out capabilities for employees to self-publish agents, democratizing the creation of agentic tools throughout the company. This approach treats agents more like documents or presentations that employees can create as needed rather than as centralized IT projects that require extensive approval. The philosophy, as Nikhil describes it, is that he doesn't tell employees how many Google Docs they can create, so similarly he won't restrict how many agents they can build. The focus is on providing the right infrastructure, data access, and governance guardrails to enable safe self-service agent development.

Wells Fargo emphasizes the critical importance of what they call an "agentic harness," which they identify as an entrepreneurial opportunity. While the concept sounds simple—a harness that holds everything together and sits on top of agents—the execution is incredibly complex, especially for long-running processes. A home mortgage process at Wells Fargo involves approximately 1,100 steps and cannot be handled by a single agent or even a collection of homegrown agents. It requires a combination of commercial off-the-shelf agents, custom agents, and careful orchestration across all of them.

The challenge of agent-to-agent communication emerged as a critical technical problem. Many protocols exist for this, including A2A and standard SDKs, but the real difficulty lies in optimizing which data to retrieve for which task and ensuring that different agents can collaborate effectively. The specific example given was enabling a ServiceNow agent to collaborate with a Salesforce agent and a homegrown agent while sharing the right context and information. This orchestration becomes especially difficult for long-running processes that span hours, days, or weeks, where maintaining context across the entire workflow is essential.

Wells Fargo noted that while simple request-response patterns are relatively straightforward, processes that extend over time introduce significant complexity around context management. This represents a key differentiator between toy demonstrations of agents and production-grade systems handling real business processes.

## Domain-Specific Challenges and Use Cases

The organizations provided concrete examples of where they're deploying agents and the specific challenges they face. Circle mentioned deploying agents for compliance monitoring, where incorrect agent decisions could result in regulatory enforcement actions. The organization faces scrutiny from regulators who will hold the company responsible for agent mistakes, not the agent itself, creating strong incentives for extremely high reliability.

Wells Fargo is working on multimodal underwriting processes, which historically have been very manual and error-prone. Customers submit documentation at incorrect angles, with poor lighting, or in formats that are difficult to process. Current processes require humans to review these submissions and request corrections. The bank sees significant opportunity for automation here, though the economics and compute requirements haven't yet reached the point where widespread deployment is feasible.

The mortgage underwriting process was highlighted as a particularly complex example involving 1,100 distinct steps. This isn't a process that can be automated with a single agent or even a straightforward pipeline. It requires careful decomposition into subtasks, assignment of those tasks to appropriate agents, orchestration of information flow between agents, and maintenance of context throughout the entire process. The discussion emphasized that simply asking "can you use AI to make this process simpler, faster, better?" is the wrong approach. Instead, organizations should ask "what is the art of possible using AI, and can we reimagine this entire experience?" and then determine how to transition from current processes to that reimagined future state.

Circle's focus on blockchain networks, stablecoin operations, and payments infrastructure creates unique requirements. These are network businesses rather than pure software businesses, with components that have "hard physics" including cryptographic requirements, validator coordination, and regulatory compliance with entities like the OCC. The strategy is to focus on these defensible hard elements while using AI and agents as an accelerant for everything else.

## Organizational Transformation and Team Dynamics

Both organizations are grappling with how agents change organizational structure and work patterns. Circle's approach is to not treat this as a traditional organizational design problem. Employees are given access to agents as tools, similar to how they have access to Google Docs and presentations, and are expected to compose these tools to achieve outcomes. The organization isn't prescribing how many agents employees can use or dictating specific workflows.

However, Circle does expect organizational impacts around how teams are composed and what functions different roles perform. Questions emerge around whether product managers should do more product marketing, whether product marketing should extend into brand, whether business development should do more product work, and who should attend sales calls. In some cases, agents are now joining sales calls and taking notes, eliminating the need for product personnel to attend. These efficiency gains naturally lead to evolved role definitions even without formal reorganization.

Wells Fargo identified a particularly interesting organizational shift: the elimination of individual contributors as a category. In an organization of 200,000 employees, most are currently individual contributors who own work end-to-end and don't typically delegate. However, as agents become pervasive, every individual contributor effectively becomes a manager of agents. This requires developing new skills around delegation, providing feedback to agents, and managing work that is partially automated rather than fully owned.

This transition from IC to agent manager represents a fundamental change in how work is structured and requires new playbooks that don't currently exist. Wells Fargo is working with their HR organization to develop training and support for this transition. The analogy to human management is instructive: just as managers give feedback to human reports to help them grow, employees will need mechanisms to provide feedback to agents and improve their performance over time.

## Long-Term Vision and Future Directions

Looking ahead five years, both organizations see substantial changes in what will be automatable. Wells Fargo believes underwriting processes, which are currently extremely manual and involve complex multimodal challenges like processing poorly photographed documents, will become table stakes for automation. However, this requires both advances in multimodal AI capabilities and significant reductions in the economics of compute.

The discussion touched on how the AI landscape will evolve from the current dominance of large language models toward smaller, specialized, fine-tuned models as the tooling makes this easier. Eventually, quantum computing may provide additional capabilities. The progression is expected to move from generic LLMs to vertically specialized AI that better serves domain-specific use cases.

Interestingly, despite the technical capabilities that may emerge, both executives expressed skepticism about pure technological determinism. Many potential innovations in banking, such as 24/7 trading or instant global money movement, are not primarily limited by technology but by regulatory frameworks and the need to protect consumers. Similarly, Nikhil noted that while we may be looking at AGI in the near future, humans are "Byzantine" and difficult to coordinate. Even with extremely capable models, the organizational and human challenges of change management, coordination, and adoption may prove to be the limiting factor rather than technical capabilities.

Wells Fargo emphasized that they still see value in physical branches and human connection, such as having a Spanish-speaking advisor help customers with financial education in person. The hardware side of the business—not hardware in the GPU sense, but the physical and human elements—remains important. The transformation is in how services are delivered and consumed rather than a wholesale replacement of human elements.

## Competitive Dynamics and Moats

As model capabilities democratize and even open-source models approach frontier performance, both organizations are thinking carefully about where their competitive advantages lie. Circle views itself as a collection of network businesses rather than pure software businesses. The stablecoin network, the Circle Payments Network, and the Arc blockchain they're building all have network effects and coordination requirements that create defensibility beyond software alone.

Circle's blockchain work involves hard computational challenges and regulatory compliance requirements that create barriers to entry. Being chartered by the OCC and subject to regulatory exams represents a moat that software capabilities alone cannot replicate. The strategy is to focus on businesses with "hard physics"—whether computational, regulatory, or network coordination challenges—and use AI as an accelerant rather than treating AI itself as the defensible layer.

Wells Fargo's scale, regulatory relationships, physical presence, domain expertise, and existing customer relationships create moats that pure software cannot easily replicate. The bank holds proprietary data that off-the-shelf agents don't have access to, creating opportunities for custom agents that leverage this unique information. At the same time, commercial agents are becoming so powerful out of the box that it doesn't make sense not to use them where appropriate.

The emerging architecture involves a hybrid approach: leveraging commercial agents and models for general intelligence while building custom agents and fine-tuned models for scenarios where proprietary data or domain expertise create differentiation. The challenge becomes ensuring these heterogeneous agents can work together effectively, which circles back to the importance of the harness and orchestration layers.

## Reflections on Claims and Balanced Assessment

The discussion presented a relatively realistic and measured perspective on agent deployment in production environments. Unlike vendor marketing that often oversells capabilities, both executives acknowledged significant challenges including the difficulty of evaluation, the gap between individual productivity and organizational benefit, the limitations of current verification approaches for long-running processes, and the substantial organizational change management required.

The emphasis on verifiability and auditability reflects genuine concerns in regulated industries rather than merely theoretical considerations. The admission that metrics around token spend and productivity remain "fuzzy" and that there's no universal approach to evaluation across teams suggests these organizations are still in relatively early stages of agentic deployment despite already seeing benefits.

The acknowledgment that many barriers to innovation in banking are regulatory rather than technological provides important context. Similarly, the observation that humans are difficult to coordinate even when technology enables new possibilities grounds the discussion in practical reality rather than pure technological optimism.

That said, the organizations are clearly committed to agent deployment and see it as strategically important. The investments in infrastructure like agent gateways, harness layers, and evaluation frameworks indicate serious long-term commitment rather than experimentation. The willingness to enable employee self-publishing of agents shows confidence in the technology and governance approaches they've developed.

Overall, this case study provides valuable insights into the real challenges of deploying agents in high-stakes production environments where the technical capabilities must be balanced against regulatory requirements, verification challenges, and the practical limitations of current LLMOps tooling and organizational readiness.
