---
title: "Enterprise AI Agent Deployment Through Forward Deployed Engineering"
slug: "enterprise-ai-agent-deployment-through-forward-deployed-engineering"
draft: false
llmopsTags:
  - "code-generation"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "cicd"
  - "devops"
industryTags: "tech"
company: "Cursor"
summary: "Cursor's Forward Deployed Engineering (FDE) team helps enterprise organizations implement AI coding agents across the entire software development lifecycle, creating what they call \"AI software factories.\" The problem they address is that while individual early adopters (10-20% of employees) successfully use AI coding assistants, organizations struggle to scale agent adoption across teams and processes. Cursor's solution involves deploying software engineers with 5+ years of experience directly into customer environments to configure and customize AI agents that work across planning, design, development, testing, review, and deployment stages. The team is experiencing rapid growth, planning to expand tenfold by December 2026, and works across industries including financial services, telecommunications, software development, technology, and semiconductors to transform how entire organizations build and maintain software."
link: "https://www.latent.space/p/cursor-forward-deployed-engineers"
year: 2026
seo:
  title: "Cursor: Enterprise AI Agent Deployment Through Forward Deployed Engineering - ZenML LLMOps Database"
  description: "Cursor's Forward Deployed Engineering (FDE) team helps enterprise organizations implement AI coding agents across the entire software development lifecycle, creating what they call \"AI software factories.\" The problem they address is that while individual early adopters (10-20% of employees) successfully use AI coding assistants, organizations struggle to scale agent adoption across teams and processes. Cursor's solution involves deploying software engineers with 5+ years of experience directly into customer environments to configure and customize AI agents that work across planning, design, development, testing, review, and deployment stages. The team is experiencing rapid growth, planning to expand tenfold by December 2026, and works across industries including financial services, telecommunications, software development, technology, and semiconductors to transform how entire organizations build and maintain software."
  canonical: "https://www.zenml.io/llmops-database/enterprise-ai-agent-deployment-through-forward-deployed-engineering"
  ogTitle: "Cursor: Enterprise AI Agent Deployment Through Forward Deployed Engineering - ZenML LLMOps Database"
  ogDescription: "Cursor's Forward Deployed Engineering (FDE) team helps enterprise organizations implement AI coding agents across the entire software development lifecycle, creating what they call \"AI software factories.\" The problem they address is that while individual early adopters (10-20% of employees) successfully use AI coding assistants, organizations struggle to scale agent adoption across teams and processes. Cursor's solution involves deploying software engineers with 5+ years of experience directly into customer environments to configure and customize AI agents that work across planning, design, development, testing, review, and deployment stages. The team is experiencing rapid growth, planning to expand tenfold by December 2026, and works across industries including financial services, telecommunications, software development, technology, and semiconductors to transform how entire organizations build and maintain software."
notion:
  pageId: "390f8dff-2538-8089-987c-ca95ef6212f2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-01T19:27:00.000Z"
  lastEditedTime: "2026-07-01T19:27:00.000Z"
  publishedAt: "2026-07-01T19:41:07Z"
---

## Overview

This case study provides insight into how Cursor, an AI coding platform company, approaches enterprise deployment of LLM-powered coding agents through their Forward Deployed Engineering (FDE) organization. The interview with Pauline Brunet, VP of Forward Deployed Engineering, offers a window into the operational realities of scaling AI agent adoption from individual developers to entire enterprise software development organizations. Rather than focusing on a single customer deployment, this case study examines Cursor's systematic approach to productionizing AI coding assistants across multiple enterprise customers in various industries.

The central challenge that Cursor's FDE team addresses is the "adoption gap" between enthusiastic individual users and organization-wide transformation. While 10-20% of employees in a given organization may successfully adopt AI coding tools on their own, expanding this to coordinated, process-level automation across teams requires a fundamentally different approach involving executive sponsorship, workflow redesign, and deep technical customization.

## The Forward Deployed Engineering Model

Cursor's definition of forward deployed engineering is notably specific and contrasts with traditional customer success or solutions architecture roles. According to Brunet, FDEs are not supporting "out-of-the-box" deployments but rather going on-site to work inside customer systems and tools, deploying highly configurable platforms customized around customer workflows, processes, systems, and tools. This represents a significant investment in customer-specific implementation work rather than a one-size-fits-all approach.

The staffing requirements for this role are substantial: all FDE team members are software engineers with at least five years of experience who have developed and shipped production code. They must have built and designed systems, can make technology trade-off decisions, and possess extensive customer-facing experience. The team sources talent from companies like Spotify, Rippling, and Palantir—organizations known for deploying complex production systems. This hiring profile suggests that successful enterprise AI deployment requires deep technical expertise, not just product knowledge or customer service skills.

The scale of Cursor's investment in this approach is indicated by their aggressive growth plans: aiming to grow the FDE team tenfold by the end of December 2026. This level of investment in human-driven deployment support, even for an AI product, underscores that enterprise AI adoption remains a labor-intensive process requiring significant hand-holding and customization.

## The AI Software Factory Vision

Cursor's conceptual framework of an "AI software factory" provides useful insight into their production LLM deployment strategy. Rather than viewing AI coding assistance as point solutions at specific development stages, they envision long-running agents that work across the entire software development lifecycle: planning, design, writing, review, testing, deployment, and maintenance. This holistic approach acknowledges that organizations typically silo these stages across different teams (design teams, development teams, product managers, QA teams), each potentially optimizing their own work with AI but without cross-functional integration.

The production implementation goal is ambitious: enabling a stakeholder to specify a desired feature and have long-running agents collaborate across every step—creating product requirements documents, producing demonstrations, writing and testing code, deploying to production, and handling ongoing maintenance and feedback loops. This represents a significant departure from current AI coding assistant implementations that primarily focus on code completion and generation within the IDE.

From an LLMOps perspective, this vision raises several important operational challenges that the case study touches on but doesn't fully detail. Managing long-running agents across multiple stages of a workflow requires sophisticated orchestration, state management, error handling, and handoff mechanisms between different specialized agents. The case study doesn't provide technical details on how Cursor implements these capabilities, but the emphasis on customization and customer-specific deployment suggests that significant engineering work is required to adapt the platform to each organization's specific tooling, processes, and quality requirements.

## Local vs. Cloud Agent Deployment

The case study provides useful insight into the evolving deployment patterns for AI coding agents. Cursor offers both local agents (running through desktop applications or CLI) and cloud agents. The local agents have seen "phenomenal" self-service adoption rates, particularly among Cursor's existing user base. This aligns with the general pattern that individual developers readily adopt tools that provide immediate productivity benefits without requiring organizational change.

However, the cloud agent deployment pattern is becoming increasingly important for enterprise use cases. Brunet notes that developers appreciate being able to run tasks in the cloud without keeping their laptops half-open, but more significantly, cloud deployment enables a fundamentally different use case: standardized automation across teams and functions. The example provided is a QA agent applying consistent processes across multiple development teams. This shift from individual productivity tools to team-wide process automation represents a key transition in enterprise AI deployment.

From an LLMOps perspective, this distinction between local and cloud deployment has significant operational implications. Local agents likely provide better privacy and data security (code never leaves the developer's machine), lower latency, and potentially lower costs, but offer limited opportunities for centralized monitoring, evaluation, policy enforcement, and cross-team standardization. Cloud agents sacrifice some of these benefits but enable the organization-wide coordination that enterprises need. The case study suggests that successful enterprise deployment requires both modalities, with local agents for individual productivity and cloud agents for coordinated, process-level automation.

## The Adoption Challenge: From Enthusiasts to Organization-wide Transformation

One of the most valuable insights from this case study is the articulation of the "adoption gap" challenge in enterprise AI deployment. Brunet identifies a consistent pattern across customer organizations: 10-20% of employees become enthusiastic early adopters who successfully use both local and cloud agents for their own tasks, achieving significant personal productivity gains. However, scaling beyond this core group of adopters to achieve organization-wide transformation requires fundamentally different support.

The key barrier identified is not technical capability but organizational alignment. Long-running agents working across teams, processes, and workflows require executive sponsorship and top-down prioritization. Leadership must explicitly state, "This is a priority, and this is how we want to automate or change this process." The FDE team's role therefore involves not just technical implementation but identifying and empowering internal champions—people with sufficient authority and motivation to drive meaningful business transformation and work with both the FDE team and internal teams to change how work gets done.

This finding has important implications for LLMOps practitioners. Successful production deployment of LLM-based systems in enterprises isn't primarily a technical challenge of deploying models, managing inference infrastructure, or optimizing prompts. Rather, it's a sociotechnical challenge of workflow redesign, change management, executive alignment, and finding the right internal champions. The technical capabilities must be embedded within a broader organizational transformation effort.

## Customer Feedback and Product Development

The case study reveals an important aspect of Cursor's LLMOps approach: the FDE team plays a significant role in shaping the product roadmap. By working closely with customers on their specific use cases, the FDE team serves as a feedback mechanism for the product and engineering teams to understand what customers want to build next. This tight coupling between customer deployment experience and core product development represents a valuable approach to ensuring that the platform evolves in response to real production use cases rather than theoretical capabilities.

This organizational structure suggests that Cursor views forward deployed engineering not as a separate customer support function but as an integral part of the product development process. The learnings from customizing and configuring the platform for specific customer environments directly inform what features and capabilities should be built into the core product. This is a pattern common in enterprise infrastructure companies but perhaps less common in AI/LLM product companies, where there can be a tendency to focus on model capabilities rather than deployment and operational requirements.

## Industry Coverage and Use Case Diversity

The case study mentions that Cursor works with customers across numerous industries: financial services, telecommunications, software development, technology, semiconductors, healthcare, life sciences, public sector, retail, and consumer packaged goods. The primary focus is on transformation leaders, IT leaders, and CTO organizations creating AI software factories, but Brunet also mentions expanding use cases beyond software development to areas like call-center operations, ticketing processes, marketing, sales, and supply-chain operations.

This breadth of industry coverage and use case diversity raises interesting questions about how much the underlying LLM-powered platform must be customized for different domains. Software development is a relatively well-defined domain with clear artifacts (code, tests, documentation), established tooling (IDEs, version control, CI/CD), and measurable outcomes (test coverage, build success, deployment frequency). Extending the same agent-based approach to supply chain operations or healthcare workflows would presumably require substantial domain-specific customization, different evaluation criteria, and integration with entirely different toolsets.

The case study doesn't provide details on how Cursor handles this domain adaptation challenge, but the emphasis on the FDE team's role in configuring and customizing deployments suggests that significant work is required to adapt the platform for each use case. This is consistent with the general challenge in LLMOps: while foundation models provide general capabilities, production deployment in specific domains requires substantial engineering work to integrate with existing systems, ensure domain-appropriate behavior, and meet industry-specific requirements (compliance, security, quality standards).

## Evolution of the FDE Role

Brunet offers an interesting perspective on how she expects the FDE role to evolve: "if we are doing the same job we were doing six months ago, we have done something wrong." This rapid evolution expectation reflects the fast-moving nature of AI agent capabilities. Currently, much of the FDE team's work involves inspiring customers about possible use cases and showing them what's achievable. As capabilities mature and become more widely understood, the role will presumably shift toward more complex integration challenges and novel use case discovery.

The examples provided suggest expanding from software development workflows to adjacent areas where developers and product teams interact (showing how designers and product managers might work seamlessly in Cursor alongside developers and testing teams) and then to entirely different business functions (call centers, ticketing, marketing, sales, supply chain). This progression from core use cases to adjacent and then distant use cases is a common pattern in enterprise software adoption, but the six-month timeframe Brunet mentions suggests an unusually rapid pace of evolution.

From an LLMOps perspective, this rapid evolution poses both opportunities and challenges. The opportunity is that improving model capabilities, better agent orchestration frameworks, and accumulated deployment experience will make increasingly complex use cases feasible. The challenge is that operational practices, evaluation frameworks, and deployment patterns must evolve equally rapidly to keep pace with new capabilities. Organizations that establish rigid LLMOps practices risk having those practices become obsolete within months rather than years.

## Evaluation and ROI Measurement

One of the more concrete operational insights from the case study comes from Brunet's advice to engineers interested in FDE roles. She emphasizes the importance of understanding "measurable return on investment, both in traditional business terms and through evaluations that demonstrate the value you are creating for internal customers." This suggests that Cursor's deployment approach includes establishing evaluation frameworks and measuring the business impact of AI agent deployments.

Unfortunately, the case study doesn't provide details on what specific metrics Cursor uses to evaluate agent performance or measure ROI. Common metrics for AI coding assistants might include code acceptance rates, time saved, code quality metrics, developer satisfaction scores, and downstream impacts on deployment frequency or bug rates. For broader workflow automation use cases, evaluation would presumably need to be tailored to the specific process being automated.

The emphasis on both traditional business metrics (presumably efficiency gains, cost reduction, revenue impact) and evaluation-based value demonstration suggests a dual approach to justifying AI investments: quantitative business outcomes and quality/performance metrics specific to the AI system. This dual measurement approach is consistent with best practices in LLMOps, where technical metrics (model performance, latency, throughput) must be connected to business outcomes to justify continued investment.

## Technical Trade-offs and Design Decisions

Brunet emphasizes the importance of understanding technical trade-offs and being able to articulate design decisions: "How did you select the database? How did you choose the different services? Why did you design the system in that particular way? What were the trade-offs?" This emphasis on trade-off thinking is particularly relevant for LLMOps, where practitioners must constantly balance competing concerns: model performance vs. latency, accuracy vs. cost, privacy vs. functionality, standardization vs. customization.

While the case study doesn't detail specific technical trade-offs that Cursor's FDE team navigates, the emphasis on this skill set suggests that enterprise AI deployment involves substantial systems-level decision-making. Decisions about where to run inference (local vs. cloud), how to orchestrate multiple agents, how to integrate with existing development tooling, how to handle sensitive code and data, and how to ensure consistency across teams all involve complex trade-offs without clear right answers.

## Critical Assessment

While this case study provides valuable insights into Cursor's enterprise deployment approach, it's important to note several limitations and considerations. First, this is essentially a marketing interview designed to promote Cursor's services and recruit for their FDE team. The description of the "AI software factory" vision and long-running agents working across the entire software development lifecycle represents an aspirational goal rather than a fully realized capability that has been proven at scale across multiple customer organizations.

The case study provides almost no concrete details about actual customer outcomes, specific technical implementations, or quantitative results. There are no case examples of specific organizations that have successfully implemented the full software factory vision, no metrics on productivity improvements, no details on how many customers have moved beyond the pilot stage to organization-wide adoption. The aggressive hiring goal (10x team growth by December 2026) could indicate strong customer demand and successful deployments, or it could indicate that customer deployments require more human effort than initially anticipated.

The technical details about how Cursor's agents actually work in production are minimal. How do they handle errors when generating code that doesn't compile or pass tests? How do they maintain context across long-running tasks that span days or weeks? How do they integrate with existing code review processes, security scanning, compliance requirements? How is agent behavior evaluated and monitored in production? These operational details are crucial for understanding the maturity of the LLMOps practices but are not addressed in the interview.

The challenge of scaling from 10-20% enthusiast adoption to organization-wide transformation is presented as primarily an organizational alignment issue (needing executive sponsorship and internal champions), but there are likely technical and operational challenges as well. As AI coding assistance moves from individual developer productivity to team-wide process automation, issues of consistency, auditability, security, and quality assurance become much more critical. The case study doesn't address how Cursor handles these concerns.

Finally, the rapid evolution of the FDE role that Brunet describes (changing completely every six months) raises questions about the sustainability and scalability of this deployment model. If customer deployments require highly skilled engineers with 5+ years of experience working on-site to customize and configure the platform, and if the nature of this work changes every six months, this suggests a deployment model that may not scale efficiently as the customer base grows. Ideally, learnings from custom deployments would be incorporated into the product to reduce the need for customization over time, but the case study doesn't provide evidence that this is happening at scale.
