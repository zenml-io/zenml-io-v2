---
title: "Building Production-Ready AI Agents for Internal Workflow Automation"
slug: "building-production-ready-ai-agents-for-internal-workflow-automation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6929603d0bdb291f49f5c8b5"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:30:18.247Z"
  createdOn: "2025-11-28T08:41:33.905Z"
llmopsTags:
  - "customer-support"
  - "fraud-detection"
  - "content-moderation"
  - "data-analysis"
  - "classification"
  - "summarization"
  - "data-cleaning"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "semantic-search"
  - "error-handling"
  - "human-in-the-loop"
  - "fastapi"
  - "langchain"
  - "open-source"
  - "documentation"
  - "databases"
  - "api-gateway"
  - "orchestration"
  - "anthropic"
  - "google-gcp"
  - "microsoft-azure"
industryTags: "tech"
company: "Vercel"
summary: "Vercel, a web hosting and deployment platform, addressed the challenge of identifying and implementing successful AI agent projects across their organization by focusing on employee pain points—specifically repetitive, boring tasks that humans disliked. The company deployed three internal production agents: a lead processing agent that automated sales qualification and research (saving hundreds of days of manual work), an anti-abuse agent that accelerated content moderation decisions by 59%, and a data analyst agent that automated SQL query generation for business intelligence. Their methodology centered on asking employees \"What do you hate most about your job?\" to identify tasks that were repetitive enough for current AI models to handle reliably while still delivering high business impact."
link: "https://www.youtube.com/watch?v=yZgYGgpy0b4"
year: 2025
seo:
  title: "Vercel: Building Production-Ready AI Agents for Internal Workflow Automation - ZenML LLMOps Database"
  description: "Vercel, a web hosting and deployment platform, addressed the challenge of identifying and implementing successful AI agent projects across their organization by focusing on employee pain points—specifically repetitive, boring tasks that humans disliked. The company deployed three internal production agents: a lead processing agent that automated sales qualification and research (saving hundreds of days of manual work), an anti-abuse agent that accelerated content moderation decisions by 59%, and a data analyst agent that automated SQL query generation for business intelligence. Their methodology centered on asking employees \"What do you hate most about your job?\" to identify tasks that were repetitive enough for current AI models to handle reliably while still delivering high business impact."
  canonical: "https://www.zenml.io/llmops-database/building-production-ready-ai-agents-for-internal-workflow-automation"
  ogTitle: "Vercel: Building Production-Ready AI Agents for Internal Workflow Automation - ZenML LLMOps Database"
  ogDescription: "Vercel, a web hosting and deployment platform, addressed the challenge of identifying and implementing successful AI agent projects across their organization by focusing on employee pain points—specifically repetitive, boring tasks that humans disliked. The company deployed three internal production agents: a lead processing agent that automated sales qualification and research (saving hundreds of days of manual work), an anti-abuse agent that accelerated content moderation decisions by 59%, and a data analyst agent that automated SQL query generation for business intelligence. Their methodology centered on asking employees \"What do you hate most about your job?\" to identify tasks that were repetitive enough for current AI models to handle reliably while still delivering high business impact."
---

## Overview

This case study presents Vercel's approach to deploying production AI agents for internal workflow automation, as shared by Malta Ubie in a conference talk. Vercel is a hosting and deployment platform that handles approximately 400 million deployments per year. The company developed a systematic methodology for identifying successful agent use cases and implemented three distinct production agents across different departments: go-to-market, trust and safety, and data analytics. The speaker emphasizes that their success came from focusing on "boring, repetitive" tasks that employees actively disliked, which aligned well with the capabilities of 2025-era frontier LLMs.

The presentation is particularly valuable because it acknowledges the high failure rate of AI projects (citing a 94% failure statistic) and proposes that many failures stem from misaligned expectations about what AI can do well. The speaker argues that AI excels particularly at coding tasks but requires careful task selection for other domains, suggesting that organizations should target low-cognitive-load, repetitive work rather than the most complex problems.

## Technical Architecture and Agent Design Philosophy

Vercel's approach to agents centers on what the speaker describes as "LLMs autonomously using tools in a loop" (citing Anthropic's definition), though the speaker critiques this as merely exposing implementation details rather than providing true conceptual clarity. More substantively, the speaker defines agents as "a new kind of software we always wanted to build but couldn't for economic reasons because it was just too difficult." This framing positions agents not as a revolutionary new category but as an enabler for automating workflows that were previously non-automatable due to the complexity of handling edge cases and decision-making with traditional if-statement-based logic.

The architectural pattern Vercel employs is workflow-based: they identify workflows with a trigger, sequential or branching steps, and an output, then replace one or more steps with an agent that can make decisions and call tools. This is implemented using their own technology stack, specifically the Vercel AI SDK for TypeScript and a newly released workflow abstraction called "use workflow." The speaker notes that tools are simply functions, and agents are functions, which means sub-agents (agents calling other agents) are just a natural compositional pattern rather than requiring special protocols or architectures.

An important design principle emphasized throughout is that agents should be specialized and focused. The concept of "sub-agents" is demystified as simply agents that are specialized for particular tasks (like researching people on LinkedIn) and can be called as tools by larger orchestrating agents. This modular approach allows for better testing, reasoning transparency, and reusability.

## Lead Processing Agent: Sales Qualification Automation

The first production agent deployed was for the go-to-market department, specifically targeting lead qualification. Vercel's sales team reported spending approximately 15 minutes per lead enriching data manually before engaging with prospects. This process involved researching the lead on LinkedIn, Googling the company to assess size and viability, and copy-pasting information into spreadsheets—classic repetitive work that consumed 15-25 minutes per lead.

The lead processing agent architecture follows this workflow:
- **Trigger**: User submits the "contact sales" form on Vercel's website
- **Initial filtering**: The main agent employs a reasoning loop to classify the submission as spam, low-quality, a support request, or a legitimate sales lead
- **Routing logic**: Support requests are automatically routed to the support team rather than sales, improving customer experience
- **Research sub-agent**: A specialized sub-agent with tools to access LinkedIn and Google conducts research on the company and contact, mirroring the human workflow
- **Output generation**: The agent drafts an email for qualified leads
- **Human-in-the-loop**: The draft is handed to a human salesperson for personalization and final sending
- **CRM integration**: Results are logged in Salesforce

The human-in-the-loop design is notable—the speaker explicitly states that "humans are actually better at" personalization, acknowledging the limitations of current models for nuanced communication while automating the tedious research portion. The claimed impact is "hundreds of days" saved, though the speaker refutes a Business Insider claim that nine of ten people were fired, noting instead that Vercel is "heavily growing" their sales organization. This suggests the automation enabled scaling rather than workforce reduction.

Vercel has open-sourced this agent at vercel.com/oss-lead-agent, positioning it not as an agent-as-a-service product but as a reference implementation that others can learn from and adapt. This reflects a broader pattern in the case study of sharing concrete implementations rather than abstract frameworks.

## Anti-Abuse Agent: Content Moderation at Scale

The second production agent addresses trust and safety for Vercel's platform. With 400 million deployments annually, the platform faces significant abuse attempts including phishing sites, scams, and impersonation. The anti-abuse team was overwhelmed by thousands of abuse reports per week coming through both a web form and an API for large-scale reporters.

The anti-abuse agent architecture includes:
- **Trigger**: Abuse report submission via web form or API
- **Reasoning loop**: The agent evaluates the report using multiple specialized tools
- **Tool suite**:
  - Project inspection tool to examine the reported project
  - Deployed assets tool to review actual content
  - Team data tool to assess account age, payment history, registration details (e.g., prepaid cards vs. established payment methods)
  - Domain registration tool
  - Multimodal model integration to visually inspect the reported site (e.g., detecting phishing pages that mimic Facebook login screens)
- **Decision support**: The agent summarizes findings with a confidence score and recommends one of three actions: block, manual review, or false positive
- **Human oversight**: Recommendations flow into Salesforce where the trust and safety team reviews and acts on the queue

The speaker emphasizes that Vercel does not allow this agent to "run wild" with automated takedowns, maintaining human oversight for final decisions. This is framed as consistent with the company's philosophy as a hosting provider: the default is not to take down websites. The agent serves to accelerate investigation by pre-researching all relevant context, allowing human operators to make faster, more informed decisions.

The reported impact is a 59% reduction in time per case, though the speaker mentions that the team believes this number has improved substantially since initial measurement. Notably, this agent has not been open-sourced due to the "cat and mouse game" nature of abuse prevention—publicizing detection methods could help bad actors evade them. However, the speaker offers to share the code privately with others in similar situations.

The design demonstrates sophisticated multi-modal reasoning (combining visual inspection with metadata analysis) and illustrates how agents can handle high-stakes decisions while maintaining human oversight for final accountability.

## Data Analyst Agent: Self-Service Business Intelligence

The third agent targets a universal corporate pain point: accessing business intelligence. The speaker describes a common scenario where employees need specific data but can't find the relevant dashboard (referencing Google's "15 different platforms" as an extreme example), don't know SQL, and must request help from a centralized data team, potentially facing quarter-long backlogs.

The data analyst agent enables natural language querying via Slack:
- **Trigger**: User posts a question to the agent in Slack
- **Schema understanding**: The agent references the company's data schema, including tables and columns
- **Semantic layer**: Critically, the agent accesses a "curated semantic catalog" that provides business context—this is positioned as the key differentiator from generic text-to-SQL tools
- **Query generation**: The agent constructs and executes SQL queries
- **Result synthesis**: Results are summarized in human-readable format with graphics
- **Delivery**: The formatted answer is posted back to the Slack thread

The speaker claims this agent performs better than "essentially all text-to-SQL tools on the market," including "probably super high-powered hundred million dollar startups." The explanation for this claim is instructive: generic tools lack the semantic understanding of a specific business's data structures and business logic. By doing the work of "teaching the agent about your business" through a curated semantic catalog, Vercel enables the agent to make contextually appropriate decisions about which data to query and how to interpret it.

The speaker provides a meta-example: the "400 million deployments per year" statistic mentioned in the talk itself was researched using this data agent. This agent is also open-sourced at vercel.com/oss-data-analyst, again positioned as a reference architecture rather than a turnkey product.

The data analyst agent illustrates an important LLMOps principle: the value often lies not in the model's raw capabilities but in the quality of context, tools, and business-specific knowledge provided to it. The semantic catalog represents significant human curation work that enables the agent to be useful in production.

## Methodology: The "What Do You Hate?" Framework

Beyond the specific agent implementations, the case study's most transferable contribution is the methodology for identifying successful agent projects. The core insight is elegantly simple: ask employees "What do you hate most about your job?" or "What busy work would you love to never do again?"

The speaker argues this question is "magical" because:
- **It identifies tasks humans find boring**: These are typically repetitive, low-cognitive-load tasks that don't engage human intelligence
- **It maps to AI strengths**: Tasks humans find tedious are often in the sweet spot for 2025-era frontier models—structured, repetitive, rule-based but with enough complexity to benefit from reasoning
- **It avoids AI weaknesses**: By not starting with the "most difficult thing in your company," this approach sidesteps areas where current AI capabilities are uncertain
- **It yields high business impact**: Repetitive tasks done frequently across an organization accumulate significant time costs
- **It has immediate stakeholder buy-in**: Employees actively want these solutions, reducing change management friction

The methodology involves going "department by department" and systematically interviewing employees. The speaker suggests this approach is universally applicable—whether building internal tools for a large company or identifying agent-as-a-service opportunities by interviewing employees at other companies' departments (though the speaker jokes about the unfortunate acronym "AaaS").

This human-centered discovery process contrasts with top-down mandates to "build agents" (the speaker references a Salesforce keynote) without clear use case identification. The speaker's thesis is that misalignment between project selection and current AI capabilities accounts for much of the reported 94% AI project failure rate.

## Open Source Strategy and Knowledge Sharing

A notable aspect of Vercel's approach is their decision to open-source the lead processing and data analyst agents (but not the anti-abuse agent due to security considerations). The speaker explicitly clarifies these are not "agent as a service" products meant for direct commercial deployment but rather reference architectures.

This strategy serves multiple purposes:
- **Community education**: Providing concrete implementations helps practitioners understand what production agents actually look like beyond abstract discussions
- **Market development**: By lowering barriers to agent development, Vercel potentially expands the market for their core infrastructure products (AI SDK, workflow abstractions)
- **Recruiting and brand**: Demonstrating technical sophistication and thought leadership
- **Learning from the community**: Open-sourcing invites feedback and improvements

The speaker emphasizes that seeing "very concretely how this is implemented" is valuable given "there's a lot of talk about this" but less concrete guidance. This reflects a broader theme in the presentation: pragmatism over hype, implementation details over marketing claims.

## Technology Stack and Tooling

While the talk is deliberately light on code details (the speaker jokes about "not actually going to go too deep into the code side"), several technology choices are mentioned:

- **Vercel AI SDK**: Described as "probably the best way to build agents" for TypeScript developers, this is Vercel's own framework for LLM application development
- **use workflow**: A newly released (mentioned as "last week") workflow abstraction for modeling agentic workflows
- **Slack**: Used as the interface for the data analyst agent, meeting users where they already work
- **Salesforce**: Used as the CRM and case management system for both the lead processing and anti-abuse agents
- **Multimodal models**: Used in the anti-abuse agent for visual inspection of reported content
- **LinkedIn and Google**: Integrated as research tools for the lead processing agent

The speaker mentions wanting to "nerd out about how to model workflows in machine language" with interested parties, suggesting there's significant depth to the workflow modeling abstraction that wasn't covered in the talk.

The choice of TypeScript and the focus on workflow abstractions reflects Vercel's position in the web development ecosystem and their expertise in developer tooling. The integration points (Slack, Salesforce) show pragmatic choices to embed agents into existing business processes rather than requiring new interfaces.

## Production Considerations and Human-in-the-Loop Design

Throughout the case study, several production deployment considerations are evident:

**Human oversight**: Each agent maintains human decision-making at critical points. The lead processing agent has humans personalize and send emails. The anti-abuse agent provides recommendations that humans review before taking action. Even the data analyst agent delivers results for human interpretation rather than automatically triggering business decisions.

**Specialized vs. general agents**: The use of sub-agents for specific tasks (LinkedIn research, data analysis) rather than monolithic general-purpose agents suggests a modular, testable architecture that can evolve components independently.

**Integration with existing systems**: All three agents integrate with existing business systems (Salesforce, Slack) rather than requiring new workflows, reducing change management burden.

**Measurable impact**: Each agent has quantified metrics (hundreds of days saved, 59% time reduction, though the speaker notes these should be viewed as initial estimates subject to revision).

**Security considerations**: The decision not to open-source the anti-abuse agent demonstrates security thinking appropriate for adversarial environments.

**Transparency**: The reasoning loop architecture suggests explainability is built into the agent design, allowing human reviewers to understand how decisions were reached.

## Critical Assessment and Limitations

While the case study presents successful deployments, several areas warrant critical consideration:

**Metrics verification**: The speaker refutes one claim (nine of ten people fired) but provides limited detail on how metrics like "hundreds of days saved" are calculated. These could reflect theoretical time savings rather than actual productivity gains or business outcomes.

**Selection bias**: By focusing on tasks employees hate, Vercel may be selecting for the easiest possible agent use cases while leaving more complex, potentially higher-value applications unexplored. The speaker acknowledges this ("sweet spot for current generation AI") but frames it as prudent rather than limiting.

**Scalability of methodology**: The "interview every department" approach may not scale to very large organizations or may miss opportunities that employees haven't identified themselves.

**Open source vs. competitive advantage**: While open-sourcing agents builds community goodwill, it raises questions about sustainable competitive advantage if these implementations become commoditized.

**Generalization limits**: All three examples are internal tools for a tech company with significant engineering resources. Applicability to non-technical organizations or customer-facing applications remains unclear.

**Model dependency**: The speaker references "2025 frontier models" without specifying which models are used, making it difficult to assess whether similar results could be achieved with open-source alternatives or require expensive proprietary models.

**Failure cases**: The presentation doesn't discuss failures, edge cases, or when these agents produce incorrect results and how such cases are handled.

## Industry Context and Broader Implications

The speaker positions agents as representing a maturity curve similar to "mobile apps in 2010 or the web in 1994"—new enough that definitions are still being debated but on the cusp of mainstream adoption. The prediction that "in like a year everyone will raise their hand" to having shipped an agent suggests the speaker sees this as an inflection point.

The framework of agents filling in a "circle of software that would be awesome to have" but was previously economically infeasible is compelling. Traditional software development required anticipating and coding for every edge case with explicit logic. The speaker argues that LLMs' emerging behaviors allow relying on model decision-making for cases that would have been too expensive to explicitly program.

This has implications for software economics: if the marginal cost of handling complexity drops dramatically, many more specialized applications become viable. The speaker's suggestion that interviewing finance departments at various companies could yield agent-as-a-service opportunities reflects this—vertical-specific agents handling domain-specific workflows become economically feasible products.

The critique that "our intuitions for how good AI is are wrong because AI is incredible at coding and not as good at essentially any other task" is important context. It suggests the current generation of models has uneven capabilities, and successful deployment requires carefully matching tasks to strengths rather than assuming general capability.

## Conclusion

Vercel's approach to deploying production AI agents demonstrates pragmatic LLMOps practices: systematic use case identification through employee interviews, focus on repetitive tasks in the current AI capability sweet spot, human-in-the-loop design for high-stakes decisions, integration with existing business systems, and measurable impact tracking. The methodology is presented as widely applicable, whether for internal tooling or identifying agent-as-a-service opportunities.

The decision to open-source reference implementations reflects a strategy of building community and market rather than protecting implementation details, suggesting Vercel views the competitive moat as residing in execution and integration rather than agent architecture per se. The emphasis on concrete implementations over abstract frameworks provides practical value for practitioners navigating the hype-heavy agent discourse.

However, questions remain about the generalizability of these successes beyond internal tools at well-resourced tech companies, the true business impact beyond initial time savings, and how these approaches will evolve as model capabilities improve and competition intensifies. The case study is strongest as a practical guide to getting started with production agents in 2025 rather than a comprehensive LLMOps framework for all contexts.