---
title: "Rethinking Insurance with AI: Operational Deployment Strategies for Brokers, Carriers, and Advisors"
slug: "rethinking-insurance-with-ai-operational-deployment-strategies-for-brokers-carriers-and-advisors"
draft: false
llmopsTags:
  - "customer-support"
  - "document-processing"
  - "classification"
  - "poc"
  - "prompt-engineering"
  - "embeddings"
  - "agent-based"
  - "human-in-the-loop"
  - "semantic-search"
  - "api-gateway"
  - "guardrails"
  - "documentation"
  - "security"
  - "compliance"
  - "anthropic"
industryTags: "insurance"
company: "Deloitte"
summary: "This panel discussion features insurance technology leaders from Baldwin Group, Ameriprise Financial (RiverSource), and Hudson Insurance discussing how they are deploying AI and LLM-based solutions into production workflows. The discussion covers the challenges of moving from AI experimentation to production adoption, including the need to embed AI directly into business workflows, the importance of business-led rather than technology-led initiatives, and the critical role of data foundations and architecture. Key results mentioned include reducing product rollout times from 3-6 months to 3 days at Baldwin Group, and plans to roll out enterprise-wide AI capabilities through partnerships with hyperscalers like Anthropic while maintaining appropriate governance and guardrails."
link: "https://www.youtube.com/watch?v=8THW-2PpwnY"
year: 2026
seo:
  title: "Deloitte: Rethinking Insurance with AI: Operational Deployment Strategies for Brokers, Carriers, and Advisors - ZenML LLMOps Database"
  description: "This panel discussion features insurance technology leaders from Baldwin Group, Ameriprise Financial (RiverSource), and Hudson Insurance discussing how they are deploying AI and LLM-based solutions into production workflows. The discussion covers the challenges of moving from AI experimentation to production adoption, including the need to embed AI directly into business workflows, the importance of business-led rather than technology-led initiatives, and the critical role of data foundations and architecture. Key results mentioned include reducing product rollout times from 3-6 months to 3 days at Baldwin Group, and plans to roll out enterprise-wide AI capabilities through partnerships with hyperscalers like Anthropic while maintaining appropriate governance and guardrails."
  canonical: "https://www.zenml.io/llmops-database/rethinking-insurance-with-ai-operational-deployment-strategies-for-brokers-carriers-and-advisors"
  ogTitle: "Deloitte: Rethinking Insurance with AI: Operational Deployment Strategies for Brokers, Carriers, and Advisors - ZenML LLMOps Database"
  ogDescription: "This panel discussion features insurance technology leaders from Baldwin Group, Ameriprise Financial (RiverSource), and Hudson Insurance discussing how they are deploying AI and LLM-based solutions into production workflows. The discussion covers the challenges of moving from AI experimentation to production adoption, including the need to embed AI directly into business workflows, the importance of business-led rather than technology-led initiatives, and the critical role of data foundations and architecture. Key results mentioned include reducing product rollout times from 3-6 months to 3 days at Baldwin Group, and plans to roll out enterprise-wide AI capabilities through partnerships with hyperscalers like Anthropic while maintaining appropriate governance and guardrails."
notion:
  pageId: "397f8dff-2538-8091-b1b0-ddc71a9de893"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:04:00.000Z"
  lastEditedTime: "2026-07-08T20:04:00.000Z"
  publishedAt: "2026-07-08T20:08:07Z"
---

## Overview and Context

This case study captures insights from three insurance organizations at different points in the insurance value chain - Baldwin Group (one of the top 12 insurance brokerages), Ameriprise Financial's RiverSource division (life insurance and annuities), and Hudson Insurance (specialty middle market and commercial insurance carrier). The panel discussion focuses specifically on the operational challenges and strategies for deploying AI and LLM-based solutions into production environments within the insurance industry.

The discussion emphasizes a critical transition point in the insurance industry where AI has moved beyond experimentation and proof-of-concept work into operational deployment. All three organizations share a common challenge: how to move from AI pilots to production systems that achieve meaningful business adoption and deliver measurable value. The conversation reveals several key themes around LLMOps practices specific to the insurance domain.

## Strategic Approach to Production Deployment

**Baldwin Group's Production Philosophy**

Baldwin Group, operating as a major insurance brokerage, has taken a comprehensive approach to AI deployment that centers on reimagining workflows rather than automating existing processes. The organization learned from previous RPA implementations that simply automating legacy processes without reimagining them leads to suboptimal outcomes. Their approach to production AI deployment focuses on identifying friction points where human judgment intersects with data needs, viewing these as the highest-value targets for AI augmentation.

A significant production milestone mentioned is the reduction of new product rollout time from the industry standard of 3-6 months down to 3 days using AI-enabled workflows. This dramatic acceleration demonstrates the potential impact of properly implemented AI systems in production, though the discussion acknowledges this requires fundamental rethinking of how work gets done rather than simple automation.

The organization has announced an enterprise-wide licensing partnership with Anthropic, planning to roll out Claude capabilities across their entire 5,000-person workforce. This represents a significant LLMOps challenge - essentially treating all 5,000 employees as potential AI developers who need training, governance frameworks, support systems, and best practices. The CTO explicitly positions the technology organization as an "enablement center" rather than a control center, recognizing they cannot centrally manage all AI development but must provide the guardrails and support infrastructure.

**Hudson Insurance's MVP and Iteration Approach**

Hudson Insurance, focusing on specialty middle market and commercial insurance, has adopted a rapid iteration philosophy centered on MVP development. Their approach emphasizes "win fast, lose fast" - deploying AI solutions in one to two month cycles to test with brokers, agents, and wholesalers, then quickly determining success or failure before scaling or pivoting.

This approach is particularly well-suited to their non-admitted paper business, where regulatory approval cycles are less constraining than in admitted lines. For admitted business, they must engage legal and compliance from the outset, but the MVP philosophy still applies - they just adjust the timeline expectations.

The organization is developing several production AI systems including real-time APIs for top wholesalers to provide operational data, drag-and-drop interfaces with actuarial raters for risk assessment, and market universe identification systems that help MGAs and administrators identify target markets and create sales funnels. All of these represent production deployment scenarios where AI is directly embedded in customer-facing and underwriting workflows.

A critical pre-deployment step they've implemented is business process optimization. Before deploying AI to automate any process, they have a BPO team review and optimize the underlying business process. This "old school" approach ensures they're not automating inefficient workflows, which both improves adoption and delivers better ROI.

**Ameriprise Financial RiverSource's Foundation-First Strategy**

RiverSource has taken what might be characterized as a more measured, foundation-first approach to production AI deployment. Their strategy recognizes that effective AI in production requires a solid data foundation, and they've been investing heavily in creating AI-ready data architectures.

The organization has focused on breaking down data silos across fragmented systems and building a unified data foundation with a semantic layer that enables both human and AI consumption. Critically, they're designing this foundation to serve both analytics use cases and operational business processes, recognizing that AI will need to plug into real-time operational workflows.

A key production initiative mentioned is an agentic AI tool planned for launch by year-end that will sit on top of their consumption layer and allow business users to query data using natural language prompts. This represents a significant LLMOps challenge around guardrails, validation, and access control. The team is working to define appropriate use cases, build knowledge base templates, and identify the right personas who can validate AI outputs before they're used for business operations.

The organization emphasizes co-development with business partners, validating the data foundation and architecture they're building against actual consumption patterns. This iterative validation helps ensure the production systems they build will actually meet business needs and achieve adoption.

## Critical LLMOps Challenges and Solutions

**Embedding AI into Workflows vs. Optional Tools**

A recurring theme across all three organizations is that AI solutions deployed as optional tools that users can opt in or out of consistently fail to achieve meaningful adoption. The lesson learned is that AI must be embedded directly into required business workflows to ensure consistent usage. This represents a fundamental LLMOps principle - production AI systems need to be part of the critical path for business processes, not supplementary tools.

Baldwin Group explicitly monitors adoption rates and has created a partnership model where business heads are accountable for adoption alongside technology teams. This shared accountability model helps ensure that deployed solutions actually get used rather than languishing after initial rollout.

**The Architecture Question: Flexibility and Vendor Agnosticism**

All three organizations expressed concern about the rapidly evolving AI landscape and the risk of being locked into specific vendors or point solutions. Baldwin Group articulates this clearly - they're trying to stay close to hyperscalers rather than point solution vendors, building plug-and-play architectures that can adapt as the market evolves.

The approach to model selection reflects this flexibility principle. Rather than committing to building or fine-tuning their own models, these organizations are consumers of foundation models from major providers. As new models emerge with different cost/performance tradeoffs, they want the architectural flexibility to switch between them. Baldwin Group notes that as more capable models are released, previous generation models often become significantly cheaper while still being suitable for many use cases. Matching the right model to each specific use case becomes a cost management strategy.

This architectural philosophy extends to the AI lifecycle management challenge. Organizations are actively working to avoid "killer architecture" - deployed solutions that remain in the field long past their useful life because there's no systematic decommissioning process. Proper lifecycle management becomes essential as the pace of AI evolution accelerates.

**Governance, Guardrails, and Responsible AI**

All three organizations acknowledge that deploying AI at scale requires governance frameworks, but they're trying to balance governance rigor with speed of innovation. The MVP approach helps here - smaller, incremental deployments face lighter governance overhead than large-scale transformational projects, and compliance becomes easier with bite-size chunks.

For RiverSource, governance is particularly critical given their planned agentic AI deployment. They're working to define who can access what data, what validation is required before AI outputs are used in business operations, and how to build appropriate guardrails into the system. The tension between enabling broad access to AI capabilities and maintaining appropriate controls is evident.

**The Talent and Enablement Challenge**

The discussion reveals a pragmatic approach to the AI talent shortage. Rather than trying to hire large teams of AI specialists, these organizations are focusing on enablement strategies - providing tools, training, and frameworks that allow existing business users and technologists to work with AI effectively.

RiverSource describes keeping their data management team intentionally small (seven people managing multi-million dollar projects) and instead focusing on upskilling business resources with the knowledge and tools to work with data and AI. They emphasize building a "data team" mentality that spans business and technology rather than creating organizational silos.

The discussion also acknowledges the need for different talent profiles - both people who can maintain and operate deployed systems and visionary types who chase new possibilities. Organizations need both, but they also recognize that having everyone be visionary would create chaos. There's a balance to strike between innovation and operational stability.

**Cost Management and Inference Economics**

A question from the audience about rising inference costs prompted discussion of cost management strategies. The consensus view is that organizations should not attempt to build their own foundation models or manage their own GPU infrastructure. Instead, they should remain consumers of model APIs from major providers.

The cost management strategy relies on architectural flexibility - being able to switch between models as pricing and capabilities evolve. As newer, more powerful models are released, previous generation models often see significant price reductions. Organizations can optimize costs by carefully matching model capabilities to use case requirements, using the most cost-effective model that meets each specific need rather than defaulting to the most capable (and expensive) model for everything.

**Change Management and Business Adoption**

Perhaps the most extensively discussed LLMOps challenge is achieving actual business adoption of deployed AI systems. Several strategies emerge from the discussion:

First, CEO and executive alignment is critical. When executives are aligned and communicating consistent messages about AI priorities, business units tend to follow. Without that top-down alignment, technology leaders must use influence strategies - finding respected champions within business units who can advocate for AI adoption among their peers.

Second, business engagement must begin at problem definition, not at solution delivery. The failure mode described is when technology teams develop solutions and then "take them to business" - by that point, if business hasn't been engaged throughout, they're unlikely to embrace the solution. AI initiatives must be business-led from the outset, with technology playing an enabling role.

Third, organizations should focus on outcomes rather than specific tools or technologies. Business conversations should center on the business results being pursued, while technology teams maintain flexibility on the implementation approach. This allows for adaptation as the AI landscape evolves without requiring business re-education.

Fourth, finding allies and champions within business units is essential. Technology leaders describe this as partly a psychology problem - understanding organizational dynamics, building relationships, and leveraging influence networks to drive adoption.

## Production AI Use Cases

**Broker and Underwriter Augmentation**

The core production use cases discussed center on augmenting knowledge workers - brokers, underwriters, and financial advisors. These roles involve complex judgment calls supported by large amounts of data, representing the "cross-section of human judgment and data" that Baldwin Group identifies as ideal for AI augmentation.

For brokers, AI systems are being deployed to provide richer information access, accelerate quote processes, and improve client interactions. The goal is to free up broker time from administrative and data-gathering tasks so they can focus on relationship management and advisory work.

For underwriters, AI is being used for risk assessment, market targeting, and portfolio analysis. Hudson Insurance is building systems that provide real-time risk data to wholesalers, enable actuaries to interact dynamically with MGAs, and identify promising market segments.

For financial advisors, RiverSource mentions existing AI-powered advice insights that have been in production for years, with new capabilities being added to improve productivity while maintaining the human elements of empathy and judgment that clients value.

**Product Development and Time-to-Market**

The dramatic example of reducing product launch time from months to days represents AI augmentation of product development workflows. While details of the specific implementation aren't provided, this suggests AI assistance in areas like product documentation, rate filing preparation, system configuration, and potentially regulatory submission processes.

**Data Access and Analytics**

Multiple organizations are deploying natural language interfaces to their data platforms, allowing business users to query data using conversational prompts rather than requiring SQL knowledge or waiting for analyst support. RiverSource's planned agentic AI tool represents this category of production deployment.

These systems require careful attention to semantic layers, knowledge bases, query validation, and access controls. The goal is to democratize data access while maintaining appropriate governance.

**API and Integration Layers**

Hudson Insurance is building real-time APIs to provide operational data to wholesalers and other distribution partners. This represents AI-powered data integration and delivery systems that make the company "stickier" with distribution partners by providing better, faster access to critical information.

## Lessons Learned and Practical Guidance

The panel offers several concrete lessons from their production deployment experiences:

**Progress Over Process**: While process and governance remain important, organizations can become paralyzed by process overhead. The emphasis should be on making incremental progress, with appropriate process guardrails but not process as the primary goal.

**Business-Led, Not Technology-Led**: AI initiatives must be driven and owned by business units, not positioned as technology projects. Technology enables, but business must define problems, own solutions, and drive adoption.

**MVP Mentality**: Deploy quickly with defined outcomes, determine success or failure rapidly, and either scale or pivot accordingly. This iterative approach delivers faster value and reduces risk compared to large waterfall projects.

**Process Optimization Before Automation**: Don't automate bad processes. Business process optimization should precede AI deployment to ensure you're automating efficient workflows.

**Focus on Big Story, Not Details**: Organizations can get lost in implementation details and lose sight of the strategic outcomes they're pursuing. Keep attention focused on the business value being created.

**Architecture for Flexibility**: In a rapidly evolving landscape, architectural choices should prioritize flexibility and avoid lock-in to specific vendors or approaches. Stay close to hyperscalers, build plug-and-play systems, and maintain model agnosticism.

**Lifecycle Management**: Actively manage the full lifecycle of deployed AI solutions, including systematic decommissioning of systems that have outlived their usefulness.

**Shared Accountability**: Both technology and business must be accountable for adoption and value realization, not just initial deployment.

## Critical Assessment

While the discussion provides valuable insights into production AI deployment challenges, several limitations should be noted. The specific technical implementations are described only at high level, with limited detail on model architectures, fine-tuning approaches, evaluation frameworks, or operational metrics. The dramatic claim of reducing product launch from months to days lacks supporting detail about what specifically was automated or how quality and risk were managed in the accelerated timeline.

The organizations represented are large, well-resourced enterprises working with major technology partners and hyperscalers. Their approaches may not be directly applicable to smaller insurers with more limited resources. The discussion also focuses primarily on organizational and adoption challenges rather than technical implementation details, which is valuable but leaves questions about the underlying technical approaches unanswered.

The panel's emphasis on business-led initiatives and adoption could be interpreted as somewhat defensive - potentially reflecting that these organizations have experienced failed technology-led initiatives and are now course-correcting. The true test of these approaches will be sustained value delivery over time, not just initial deployment.

Nevertheless, the practical focus on adoption, change management, and architectural flexibility represents mature thinking about production AI deployment. These organizations are clearly beyond the experimentation phase and grappling with real operational challenges of AI at scale, making their experiences highly relevant to others on similar journeys.
