---
title: "Building and Scaling Internal Data Agents and AI-Powered Frontend Development Tools"
slug: "building-production-ai-agents-for-internal-data-analytics-and-full-stack-application-generation"
draft: false
llmopsTags:
  - "data-analysis"
  - "code-generation"
  - "chatbot"
  - "question-answering"
  - "customer-support"
  - "agent-based"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "docker"
  - "kubernetes"
  - "devops"
  - "cicd"
  - "continuous-deployment"
  - "continuous-integration"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "serverless"
  - "orchestration"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "documentation"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "cloudflare"
industryTags: "tech"
company: "Vercel"
summary: "Vercel developed two significant production AI applications: DZ, an internal text-to-SQL data agent that enables employees to query Snowflake using natural language in Slack, and V0, a public-facing AI tool for generating full-stack web applications. The company initially built DZ as a traditional tool-based agent but completely rebuilt it as a coding-style agent with simplified architecture (just two tools: bash and SQL execution), dramatically improving performance by leveraging models' native coding capabilities. V0 evolved from a 2023 prototype targeting frontend engineers into a comprehensive full-stack development tool as models improved, finding strong product-market fit with tech-adjacent users and enabling significant internal productivity gains. Both products demonstrate Vercel's philosophy that building custom agents is straightforward and preferable to buying off-the-shelf solutions, with the company successfully deploying these AI systems at scale while maintaining reliability and supporting their core infrastructure business."
link: "https://www.youtube.com/watch?v=_f2WpsmW76Y"
year: 2026
seo:
  title: "Vercel: Building and Scaling Internal Data Agents and AI-Powered Frontend Development Tools - ZenML LLMOps Database"
  description: "Vercel developed two significant production AI applications: DZ, an internal text-to-SQL data agent that enables employees to query Snowflake using natural language in Slack, and V0, a public-facing AI tool for generating full-stack web applications. The company initially built DZ as a traditional tool-based agent but completely rebuilt it as a coding-style agent with simplified architecture (just two tools: bash and SQL execution), dramatically improving performance by leveraging models' native coding capabilities. V0 evolved from a 2023 prototype targeting frontend engineers into a comprehensive full-stack development tool as models improved, finding strong product-market fit with tech-adjacent users and enabling significant internal productivity gains. Both products demonstrate Vercel's philosophy that building custom agents is straightforward and preferable to buying off-the-shelf solutions, with the company successfully deploying these AI systems at scale while maintaining reliability and supporting their core infrastructure business."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-agents-for-internal-data-analytics-and-full-stack-application-generation"
  ogTitle: "Vercel: Building and Scaling Internal Data Agents and AI-Powered Frontend Development Tools - ZenML LLMOps Database"
  ogDescription: "Vercel developed two significant production AI applications: DZ, an internal text-to-SQL data agent that enables employees to query Snowflake using natural language in Slack, and V0, a public-facing AI tool for generating full-stack web applications. The company initially built DZ as a traditional tool-based agent but completely rebuilt it as a coding-style agent with simplified architecture (just two tools: bash and SQL execution), dramatically improving performance by leveraging models' native coding capabilities. V0 evolved from a 2023 prototype targeting frontend engineers into a comprehensive full-stack development tool as models improved, finding strong product-market fit with tech-adjacent users and enabling significant internal productivity gains. Both products demonstrate Vercel's philosophy that building custom agents is straightforward and preferable to buying off-the-shelf solutions, with the company successfully deploying these AI systems at scale while maintaining reliability and supporting their core infrastructure business."
notion:
  pageId: "320f8dff-2538-8051-aede-fd891176be61"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-11T13:58:00.000Z"
  lastEditedTime: "2026-03-11T14:10:00.000Z"
  publishedAt: "2026-03-11T14:15:12Z"
---

## Overview

Vercel, a leading infrastructure and deployment platform for frontend developers, has built two significant production AI applications that showcase distinct approaches to LLMOps. The first is DZ (referred to as "DZero" internally), an internal data agent that translates natural language queries into SQL and executes them against the company's Snowflake data warehouse. The second is V0, a public-facing tool for generating web applications using AI. Both systems have undergone significant architectural evolution as foundation models improved, demonstrating the rapidly shifting landscape of production AI systems.

The Malta conversation (Vercel's CTO) provides rare insights into the pragmatic realities of building and maintaining production AI systems in 2025-2026, including specific decisions about when to completely rebuild systems, how to structure agent architectures, and the organizational implications of AI-assisted development.

## DZ: Internal Text-to-SQL Data Agent

### Business Context and Use Cases

DZ serves as Vercel's internal data intelligence layer, accessible to employees through Slack. The system has access to the company's entire Snowflake data warehouse, subject to user access controls. A compelling example illustrates its power: a salesperson asked "which S&P 500 CTOs and VPs of engineering have private Vercel accounts and have deployed over Christmas?" This query requires combining multiple data sources, understanding business semantics, performing external enrichment (like LinkedIn research), and constructing complex SQL queries that would traditionally require significant manual effort from data analysts.

The system has become transformational for the business, enabling employees across functions to extract insights from data without requiring SQL expertise or waiting for data team support. The democratization of data access through natural language has fundamentally changed how the company operates.

### Initial Architecture: Traditional Tool-Based Agent

The first version of DZ followed what was considered best practice for agents at the time: a "tools in a loop" architecture with multiple specialized tools for different tasks. While this approach was functional and "wasn't working badly," it lacked the magical quality that would make it truly transformative. The system could handle queries but required significant handholding and didn't consistently deliver excellent results.

### The Pivot: Coding-Style Agent Architecture

Vercel made the bold decision to completely delete the original implementation and rebuild DZ as a coding-style agent. This decision reflects a crucial insight about working with LLMs: what constitutes best practice changes rapidly as models improve, and teams must remain humble and willing to completely rethink their approaches. Malta specifically notes that "just because something was best practice in the summer of 2025 means quite little today."

The new architecture is remarkably simple, consisting of only about 50 lines of code. The system operates on two fundamental principles:

**Semantic Documentation as Code**: The team invested significant effort in documenting their entire Snowflake schema, writing prose explanations of the business value and meaning of every single column. This documentation is exported to YAML files that serve as the primary knowledge base for the agent.

**Minimal Tooling**: Unlike the original multi-tool architecture, the rebuilt system uses only two tools: a bash tool and a SQL execution tool. The agent is instructed to treat the task as a coding problem, leveraging the model's strong pre-training on coding tasks.

### Why the Coding Approach Works

The key insight driving this architecture is understanding what foundation models are optimized for. Models have extensive training data on coding tasks and excel at file system operations, bash scripting, and code generation. By framing the data analysis problem as a coding task—even though it's fundamentally about business intelligence—Vercel achieves "disproportionally good results."

The blog post title "All You Need is the File System and Bash" encapsulates this philosophy. Rather than building complex abstraction layers and specialized tools, the system presents information in formats that models naturally understand from their training: files, documentation, and code execution environments.

### Post-Training and Prompt Engineering

While Malta mentions that the models have been "post-trained" on using tools like GPT and tail, the system relies heavily on emergent behavior rather than extensive prompt engineering. As models become more intelligent, the architecture can become simpler because less explicit instruction and fewer hard-coded rules are necessary. The agent can "go to town" on the YAML documentation files to understand business semantics and construct appropriate SQL queries.

## V0: Public-Facing Frontend Development Tool

### Evolution Through Multiple "Oh Moments"

V0 launched in 2023 as a tool for generating frontend code, but its product positioning and capabilities have evolved dramatically through approximately five major pivots as models improved and usage patterns emerged. This evolution demonstrates how product strategy for AI applications must remain fluid and responsive to both technological advances and user behavior.

### Initial Launch and First Discovery (Summer 2023)

When V0 first launched, generating usable web pages with LLMs was still experimental. Early attempts produced subpar results that "wouldn't look good" and weren't production-ready. The breakthrough came serendipitously when an engineer (described as someone from China working in Berlin but visiting the San Francisco office) discovered that adding "use Tailwind" to the prompt dramatically improved results.

This discovery worked because Tailwind CSS, a utility-first CSS framework, was old enough to be included in GPT-3.5's training data but new enough that it wasn't yet mainstream. Critically, Tailwind's approach of inline styling eliminated the need for models to manage separate CSS files. Early models struggled with the context switching required to write HTML then later write corresponding CSS, but Tailwind's inline approach meant everything could be generated in one place, matching the models' sequential generation capabilities.

### Product-Market Fit Evolution

Vercel initially thought they were building a tool for frontend engineers—their core customer base. However, they quickly discovered the actual product-market fit was with backend engineers. These developers had the skills to fix issues when the AI didn't work perfectly, but benefited enormously from rapid frontend generation. The tool "sucked" in the sense that it didn't work reliably every time, which made it unsuitable for non-engineers but perfect for technical users who could debug and refine the output.

### The Sonnet 3.5 Transformation

A major inflection point came when Anthropic released Claude Sonnet 3.5. With this model, the same prompts that previously generated only frontend code could suddenly produce full-stack applications. This wasn't a pivot in the traditional startup sense (where you discover your initial hypothesis was wrong), but rather an adaptation to a fundamentally changed technological landscape. Malta emphasizes that "you cannot keep your product the same because the world is different."

This shift enabled V0 to target a broader audience, including non-engineers, because the success rate improved dramatically. The tool evolved to support end-to-end application development with reliability approaching what non-technical users need.

### Current Product Positioning

V0 now targets "tech-adjacent" users: product managers, designers, product owners, and business people with some technical interest. There's also growing interest in internal app development by business users—what Malta calls "the new crazy onslaught of shadow IT." Business people at companies can now build internal applications for their own use, representing a significant expansion of who can create software.

## Technical Infrastructure and LLMOps Practices

### Model Selection and Usage

Vercel doesn't mandate specific AI tools company-wide, preferring that employees experience what their customers experience. Malta personally uses Claude with 4.6 Fast (presumably Claude 3 Opus or similar) for development work and Codex 5.3 for code reviews. The CTO spends approximately 12 hours per day coding with AI assistance, describing it as having a "dopamine hit" quality—a quote that became his first in the Wall Street Journal.

### Unlimited Token Policy

Vercel provides unlimited API tokens to all developers, a policy explicitly mentioned in job descriptions. While this occasionally leads to unusual usage patterns (one engineer used 10x more tokens than the next highest user due to a custom harness that inadvertently bypassed caching), the company views this as worthwhile. The cost of monitoring and restricting usage exceeds the value of unrestricted access for productivity.

### Deployment Architecture and Reliability

As a company whose core business is operating software infrastructure for customers, Vercel faces unique challenges in balancing rapid iteration with reliability. Their approach includes several key principles:

**Optimistic Locking for Approvals**: Rather than requiring pre-approval from teams like legal or security, Vercel uses a "veto-based" system. Developers can ship anything but must notify relevant teams, who can then block deployment if necessary. This inverts the traditional approval model, making gatekeeping teams active participants rather than bottlenecks. Most of the time, teams like legal respond that changes are reasonable and don't require their involvement, but they retain the ability to prevent problematic deployments.

**Regional Deployment Strategy**: Vercel operates 20 core regions with deliberately autonomous serving infrastructure. There is no mechanism to deploy configuration changes to all regions simultaneously. Instead, changes roll out in waves, providing rapid feedback on any issues while preventing the catastrophic global outages that can result from bad configuration changes. This architecture explicitly prevents the type of incidents that have affected companies like Cloudflare, where global configuration systems created single points of failure.

**Differentiated Deployment Cadences**: The control plane ships every time someone pushes to the main branch, enabling rapid iteration on features. However, the serving systems deploy only once per day, reflecting deliberate trade-offs between velocity and stability for customer-facing infrastructure.

### Support and Sales Automation

Beyond development tools, Vercel has deployed agents for operational functions. They automated 87% of support intake and built an open-sourced sales lead qualification agent. Notably, these automations didn't result in layoffs. The company is growing fast enough that headcount reductions weren't necessary, and support engineers report higher job satisfaction because they now focus exclusively on complex, interesting problems rather than routine inquiries.

## Organizational Implications and Workforce Strategy

### Changing Nature of Engineering Work

Malta observes that engineering work increasingly resembles management rather than traditional individual contributor work. Senior ICs benefit most from AI assistance because they already operated in a mode of coordinating and directing work—they now simply have "more minions." Junior engineers also benefit significantly, partly because they're growing up with these tools and approach them without preconceptions (analogous to how they're better at making TikTok videos).

The most interesting question is what happens to mid-level engineers, who must learn this new working mode while potentially having established patterns that don't fit the AI-assisted workflow.

### Internship and Junior Engineer Programs

Vercel has leaned into hiring interns and junior engineers, finding that these cohorts perform exceptionally well with AI assistance. The traditional concern that junior engineers need time to develop fundamental skills is being reconsidered as AI lowers the floor for what juniors can accomplish.

### The 1,024 Employee Cap

Vercel's leadership has set a quasi-serious goal of capping headcount at 1,024 employees (a "nice round number" in computing terms), despite the company currently having 750 employees and having hiring plans that would exceed this limit. This reflects uncertainty about whether AI-enabled productivity will allow the company to scale revenue without proportionally scaling headcount.

Malta frames this as exploring "how elastic the software market is." As AI makes software cheaper to produce, does this lead to more total software (and thus more engineering jobs) or simply cheaper software (fewer jobs)? He uses YouTube as an analogy: before 2005, video production was expensive and limited to professionals. YouTube democratized video creation, and rather than eliminating video production jobs, it dramatically expanded the number of people professionally engaged in video work.

The question is whether software will follow a similar pattern. Malta is uncertain whether the equilibrium includes more or fewer software engineers than today, noting that "it's very possible that it's more" because the maintenance burden of all the additional software being created is substantial.

### The 1960s Mainframe Analogy

Drawing on Ben Thompson's analysis, Malta suggests the current transformation may be more analogous to the 1960s introduction of mainframe computers—which eliminated entire buildings of "computers" (human calculators)—than to the internet's introduction. That transformation was painful for affected individuals but resulted in dramatically increased societal wealth over time. The implication is that current changes may involve significant workforce disruption but long-term positive outcomes.

## Software Maintenance and Production Operations

### The "Free Puppy" Problem

A central theme in Malta's thinking is that while software generation is becoming essentially free, maintenance remains expensive. He compares this to getting a free puppy: the acquisition cost is zero, but the ongoing care requirements are substantial. This creates a critical challenge for the industry: as engineers generate code at unprecedented speed, how do organizations maintain and operate all this new software?

Malta is particularly excited about exploring the role of agents in software maintenance and production operations. When an engineer says they've built a new file system in a timeframe that would have been impossible previously, the question becomes: can this be shipped immediately, or is it "not real" in the sense of being production-ready?

### Self-Driving Infrastructure

Vercel is exploring what they call "self-driving infrastructure"—agentic systems that participate in DevOps processes and application operation. This represents an extension of agents beyond code generation into the operational domain. However, Malta notes that professional DevOps requires "somewhat an idea of what's going on," meaning there are limits to how much can be vibed or generated without structure. Platformization of operations remains necessary even as agents become more capable.

### Observability Challenges

The conversation touches briefly on observability for long-running agents, with Malta acknowledging this as an area of active exploration. The lack of clear observability is potentially both a temporary limitation that will be solved and a fundamental challenge of agentic systems that operate with significant autonomy.

## Product Development Philosophy

### Build vs. Buy for Agents

Vercel's thesis is that building agents is "extremely easy and you don't need to buy them." This philosophy informs both DZ and V0—both are custom-built rather than using off-the-shelf agent frameworks. Malta specifically notes that while DZ "doesn't use Cloud Code as a harness," building such infrastructure is straightforward.

This approach contrasts with the emerging market of agent platforms and frameworks, suggesting that for many use cases, custom solutions may be more appropriate than general-purpose tools.

### Rapid Iteration and Humility

The willingness to completely rebuild DZ demonstrates what Malta describes as necessary humility in the agent-building space. The field is only in its "third year for real, if at all," compared to web development's 30 years of established practice. Best practices evolve within months, and teams must be willing to throw away working systems when fundamentally better approaches emerge.

### Hypothetical: Starting V0 Today

If starting V0 from scratch today, Malta would use a team of one to three people maximum rather than seven. The reasoning is that a single person can now reach a demonstrable product faster than a team could coordinate, and teams can be added after product-market fit is proven. This represents a significant shift in how AI-first companies should think about resourcing product development.

## Strategic Positioning and Future Outlook

### Vercel's Moat in an AI World

Despite building tools that help others generate code, Malta is "not particularly worried" about disruption to Vercel's core business. The company's moat lies in operating software in production: "you throw it over the fence and we're going to run it for you." As more software gets generated (whether by Claude, Cursor, or other tools), the need for production infrastructure increases rather than decreases.

While agents can write Terraform and generate infrastructure code, professional DevOps still requires platformization and consistency. You "can't really vibe code" for production operations—there must be structure and observability.

### The Software Light vs. Software Heavy Question

The fundamental uncertainty facing the industry is whether we're currently "software light" or "software heavy." If AI reveals that we've been constrained by expensive software creation and there's massive unmet demand, the result will be more software and potentially more software jobs (like YouTube and video production). If instead we've been creating approximately the right amount of software and AI simply makes it cheaper, employment may decrease.

Malta leans toward the software light hypothesis, noting that Vercel's own metrics show evidence of increased software creation as costs decrease. The market elasticity question will determine industry structure for the next decade.

### Production AI as a Revenue Driver

The conversation reveals that Vercel sees significant revenue opportunity in helping customers deploy and operate AI-generated applications. The appropriate way to run these new types of applications in production is an active area of investment and differentiation. As the volume of software increases dramatically, infrastructure and operations become more rather than less important.

## Critical Evaluation and Limitations

Several aspects of these case studies warrant critical examination:

**Rebuild Risk**: While Vercel's willingness to completely rebuild DZ demonstrates admirable flexibility, the decision to throw away working code and "delete everything" carries significant risk. The case study presents this as unambiguously positive, but such decisions can fail if the new architecture doesn't deliver expected improvements. The success of this particular rebuild shouldn't be taken as evidence that aggressive rebuilding is always appropriate.

**Claims of Simplicity**: The assertion that building agents is "extremely easy" may reflect Vercel's specific capabilities and context rather than universal truth. As a company deeply embedded in the infrastructure space with significant AI expertise, their ability to build custom solutions quickly may not generalize to other organizations. The "50 lines of code" claim for DZ is particularly suspicious—while the agent logic may be 50 lines, the surrounding infrastructure, documentation generation, access controls, and integration with Slack and Snowflake likely represents significantly more complexity.

**Product-Market Fit Evolution**: The narrative of V0 finding different markets than intended could be interpreted either as savvy adaptation or as initial misunderstanding of the customer. The progression from frontend engineers to backend engineers to tech-adjacent users to business users suggests either remarkable flexibility or unclear initial product vision.

**Unlimited Tokens**: While providing unlimited API access sounds generous, the case study doesn't provide actual cost data or usage patterns beyond anecdotes. The engineer who used 10x more than peers due to cache misconfiguration suggests that costs can get out of control, and the dismissive attitude toward monitoring might not scale as usage grows or as more expensive models become standard.

**Organizational Structure**: The optimistic locking and veto-based approval system works well in Vercel's high-trust, technically sophisticated culture, but may not be appropriate for organizations with different risk profiles or regulatory requirements. Financial services, healthcare, or other highly regulated industries couldn't adopt this approach without significant modifications.

**Employment Impact Uncertainty**: While Malta expresses uncertainty about whether AI will lead to more or fewer software engineering jobs, the 1,024 employee cap and emphasis on doing more with fewer people suggests that Vercel's internal planning assumes significant productivity gains that may reduce hiring needs. The YouTube analogy is compelling but may not apply—video production expanded because consumption is unlimited (people can watch infinite hours), while software consumption may have more natural limits.

**Maintenance Challenge**: The "free puppy" framing is apt, but the case study doesn't provide concrete solutions to the maintenance problem. Vercel is exploring agent-assisted operations but hasn't demonstrated this at scale. The risk is that organizations generate massive amounts of software that becomes increasingly difficult to maintain, creating technical debt at unprecedented speed.

Overall, these case studies provide valuable insights into how a sophisticated infrastructure company is adapting to AI-assisted development, but the narrative should be understood as representing one possible approach rather than universal best practices. The success factors include significant technical expertise, willingness to accept risk, strong engineering culture, and a business model well-aligned with the proliferation of AI-generated software.
