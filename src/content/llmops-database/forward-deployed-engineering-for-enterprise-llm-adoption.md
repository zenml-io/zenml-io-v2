---
title: "Forward-Deployed Engineering for Enterprise LLM Adoption"
slug: "forward-deployed-engineering-for-enterprise-llm-adoption"
draft: false
llmopsTags:
  - "healthcare"
  - "code-generation"
  - "customer-support"
  - "document-processing"
  - "high-stakes-application"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "few-shot"
  - "evals"
  - "human-in-the-loop"
  - "crewai"
  - "cicd"
  - "openai"
industryTags: "tech"
company: "OpenAI / Ramp / Nominal / Dataland"
summary: "This panel discussion explores how multiple companies use forward-deployed engineering (FDE) teams to bring LLM applications into production at enterprise customers. Representatives from OpenAI, Ramp, Nominal, and Dataland describe how FDEs embed directly with customers to build, deploy, and iterate on AI solutions while balancing custom development with scalable product roadmaps. The approach enables these companies to tackle complex, industry-specific problems by combining deep technical expertise with intimate customer understanding, ultimately driving both immediate customer success and long-term product development. Results include significant enterprise adoption, with examples ranging from 70,000 daily customer service calls handled by AI at a telco to millions in ARR per headcount at Dataland, while continuously feeding insights back to improve core models and platforms."
link: "https://www.youtube.com/watch?v=hWuoH-ODDNc"
year: 2026
seo:
  title: "OpenAI / Ramp / Nominal / Dataland: Forward-Deployed Engineering for Enterprise LLM Adoption - ZenML LLMOps Database"
  description: "This panel discussion explores how multiple companies use forward-deployed engineering (FDE) teams to bring LLM applications into production at enterprise customers. Representatives from OpenAI, Ramp, Nominal, and Dataland describe how FDEs embed directly with customers to build, deploy, and iterate on AI solutions while balancing custom development with scalable product roadmaps. The approach enables these companies to tackle complex, industry-specific problems by combining deep technical expertise with intimate customer understanding, ultimately driving both immediate customer success and long-term product development. Results include significant enterprise adoption, with examples ranging from 70,000 daily customer service calls handled by AI at a telco to millions in ARR per headcount at Dataland, while continuously feeding insights back to improve core models and platforms."
  canonical: "https://www.zenml.io/llmops-database/forward-deployed-engineering-for-enterprise-llm-adoption"
  ogTitle: "OpenAI / Ramp / Nominal / Dataland: Forward-Deployed Engineering for Enterprise LLM Adoption - ZenML LLMOps Database"
  ogDescription: "This panel discussion explores how multiple companies use forward-deployed engineering (FDE) teams to bring LLM applications into production at enterprise customers. Representatives from OpenAI, Ramp, Nominal, and Dataland describe how FDEs embed directly with customers to build, deploy, and iterate on AI solutions while balancing custom development with scalable product roadmaps. The approach enables these companies to tackle complex, industry-specific problems by combining deep technical expertise with intimate customer understanding, ultimately driving both immediate customer success and long-term product development. Results include significant enterprise adoption, with examples ranging from 70,000 daily customer service calls handled by AI at a telco to millions in ARR per headcount at Dataland, while continuously feeding insights back to improve core models and platforms."
notion:
  pageId: "38ef8dff-2538-802e-baa0-c7fe85ee5323"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-29T15:10:00.000Z"
  lastEditedTime: "2026-06-29T15:10:00.000Z"
  publishedAt: "2026-07-01T19:45:55Z"
---

This case study provides a comprehensive view into how multiple technology companies approach productionizing LLMs through forward-deployed engineering (FDE) teams. The discussion features insights from OpenAI, Ramp, Nominal, and Dataland, offering different perspectives on the same fundamental challenge: how to successfully deploy and maintain LLM-powered solutions in complex enterprise environments.

## Overview and Context

The panel reveals a convergence around forward-deployed engineering as a critical function for LLM adoption in production. While FDE roles have historically existed at companies like Palantir, they have experienced approximately 10x growth in the past year, driven largely by the expanding capabilities of LLMs and the correspondingly broader scope of problems that can now be addressed with AI. This growth appears counterintuitive since more capable models should theoretically require less human intervention, but the panelists explain that improved model capabilities actually enable tackling more complex, heterogeneous problems that require deep domain expertise to implement successfully.

## Company-Specific Approaches

### OpenAI's FDE Model

OpenAI's forward-deployed engineering team operates with two primary mandates: driving broad adoption and pushing model capabilities to their limits. The team focuses on finding repeatable problems in the market, embedding with customers to build platforms, and then deciding whether to ship solutions as separate products or integrate them into existing offerings like Codex. Colin Jarvis, who leads this function, describes the team as operating in two distinct modes. First, they work on repeatable, scalable solutions that can eventually become self-service products. Second, they tackle the most challenging industry problems in sectors like semiconductors and life sciences, working closely with post-training teams to improve underlying model performance.

The OpenAI FDE team has grown from two people to over 90 in just a couple of years, working on approximately ten major engagements at a time. They maintain a highly selective approach, carefully qualifying whether problems are genuinely FDE-shaped and have realistic paths to recurring revenue. The team is structured with traditional FDEs (similar to Palantir's Delta role), customer-facing technical specialists (similar to Echo roles), and increasingly, industry-specific domain experts such as chip verification engineers and life scientists who can properly formulate tasks and evaluations for highly specialized domains.

A concrete example of their work involves a Japanese sales team of 2,000 people who needed a slide generation assistant. The FDEs first had to experiment with numerous approaches to format slides so models could produce quality output, eventually settling on HTML generation after trying simpler box-based layouts. They then generated extensive examples and worked with the post-training team, which led to significantly improved slide generation capabilities in subsequent model releases. This exemplifies the feedback loop between customer deployment and model improvement.

Another significant engagement involved deploying real-time voice AI for customer service at a major telecommunications company. The initial prototype struggled with basic tasks like reading back phone numbers correctly. However, after six months of iteration with the post-training team and building platform tooling for evaluation and self-improvement loops, the system now handles approximately 70,000 calls daily without major issues. This demonstrates both the technical challenges of production LLM deployment and the iterative approach required to achieve reliability at scale.

OpenAI's FDE team increasingly asks whether any new product can simply be a Codex extension rather than a standalone offering. This reflects how improved coding agents have consolidated what might have been 50 separate products into platform capabilities. The team maintains two main product tracks that haven't been absorbed into Codex: regulatory document authoring and workflow automation platforms, both targeting enterprise needs for high consistency.

### Ramp's Approach

Ramp employs FDE teams primarily to win and serve enterprise customers while protecting core product development from becoming derailed by custom enterprise requirements. Calvin, who built the team, describes FDE at Ramp as having a broad mandate to "do whatever it takes to win enterprise" while being creative about solutions. The fundamental problem they solve is avoiding the classic trap where enterprise deals derail product roadmaps through endless custom feature requests.

Ramp's FDE model differs from traditional approaches in several ways. First, FDEs work primarily remotely via Zoom rather than spending extensive time on-site, meeting with customers perhaps once per quarter. Second, they operate within the core codebase alongside other engineering teams rather than maintaining separate systems. Third, individual FDEs typically handle five to six customers simultaneously rather than deep-diving on single accounts. This "stretching thin" approach creates natural incentives for FDEs to focus on high-leverage solutions that inform the broader product roadmap rather than building extensive custom functionality.

The team measures ROI simply as revenue from enterprise customers divided by FDE salaries, and they work to keep this ratio highly favorable by minimizing maintenance burden. They prefer to accelerate roadmap features that benefit multiple customers rather than build custom solutions. When custom work is necessary, they maintain close partnerships with core product teams and strive to keep changes minimal to avoid long-term technical debt.

For Ramp's finance team customers, who typically work in Excel rather than code, the FDE team developed Ramp Labs including an Excel agent that meets users in their native environment. This exemplifies their principle of meeting customers where they are rather than forcing adoption of entirely new workflows.

### Nominal's Philosophy

Nominal builds a data and AI platform for hardware engineers working on satellites, nuclear reactors, and other advanced hardware systems. Jason, the CTO, describes forward-deployed engineering as core to their mission from day one, embedded in their company value of "empower their mission." The team's mandate extends beyond immediate customer success to understanding bleeding-edge product needs and feeding insights into long-term roadmap development.

Nominal's approach emphasizes careful boundaries between FDE work and pure consulting. They learned from Palantir's experiences during what they call the "dark ages" when FD teams essentially revolted, claiming core products were useless and building entirely separate systems. To avoid this, Nominal's first forward-deployed engineers were people who had previously built software platforms and been frustrated by telephone games between customers and engineering teams. This created high-trust relationships where leadership could be confident FDEs weren't simply building consulting projects.

The team explicitly uses forward-deployed engineering to accelerate sales cycles, viewing this as strategically worthwhile even when it means spending Nominal resources on work that might otherwise wait 12 months for a large legacy company to handle internally. However, they maintain discipline about when and how to do this. An example involved their first large contract with a drone flight testing company. The customer wanted data transformation scripts automated, and the FDE team built this functionality in a generalizable container-based architecture rather than as a bespoke solution. This became core infrastructure sold across other customers while still delivering immediate value to the initial customer.

Nominal maintains separate but related roles: mission operations (highly technical former mechanical or electrical engineers who may not be code-native), mission development (the FDE function), and a growing sales team. They emphasize rotating engineers between forward-deployed and core product roles, with some of their most successful moments coming when engineers use their own product on-site, recognize its shortcomings, and return motivated to improve it.

### Dataland's Agent-First Model

Dataland builds AI for enterprise labor outsourcing across diverse sectors including healthcare, energy, consumer electronics, logistics, and waste management. Howard, a co-founder, describes forward-deployed engineering as the lifeblood of their company because they build highly heterogeneous agents customized for each client rather than selling a one-size-fits-all platform. Their approach represents perhaps the most extreme version of custom deployment, yet they maintain software economics through careful attention to recurring value delivery.

With only two forward-deployed engineers (expanding to three), Dataland has achieved multiple millions in ARR per headcount, demonstrating extraordinary leverage. They accomplish this by being "extremely AI piled" - spending substantial time building meta-agents that accelerate their own agent development process. This addresses a fundamental challenge: no agent deployment is static. As customer businesses evolve, their systems change, policies update, and new product lines launch, all of which require agent adaptation. Dataland invests heavily in automating the outer loop of agent maintenance and improvement, enabling continuous value delivery with minimal ongoing human intervention.

Their perspective on why FDE has become more important centers on market expansion. Traditional SaaS addressed specific workflows with platforms meant for everyone, but the total addressable market for labor automation is orders of magnitude larger and inherently heterogeneous. LLM capabilities now make it possible to tackle this diverse set of problems, but success requires engineers who deeply understand specific use cases, almost to the point of being able to perform those jobs themselves. This domain expertise must be married with deep understanding of frontier AI platforms to create effective solutions.

Dataland views coding agents as particularly successful because every software engineer is naturally a forward-deployed engineer in that domain - they code daily and understand the use case intimately. To replicate this in other industries like energy or waste management requires sending engineers to deeply embed and understand those specific contexts before they can build effective solutions.

## Technical Patterns and Evolution

### The Shift from Infrastructure to Problem-Solving

Colin describes a significant shift in how FDE teams spend their time over the past year. Previously, building with early versions of agent SDKs required extensive plumbing, custom infrastructure, and numerous evaluations for each problem. The team might build five different agents with five different eval sets, and the time required just to reach a working prototype limited the complexity of addressable problems. 

Since approximately early 2026, more capable coding models that can handle long-horizon tasks have changed this dynamic. FDEs now write much less plumbing code and spend proportionally more time solving actual customer use cases. This has enabled moving up the stack to harder problems. The semiconductor engagement illustrates this: the first ten months focused on software engineering acceleration tasks like deploying agents into CI pipelines and building auto-debug agents. Only after establishing these foundations could the team begin working on agents that perform physical chip design, building on top of more stable primitives where they can trust Codex to handle the bottom 50% of tasks while focusing on higher-level, higher-value activities.

### The Evaluation and Improvement Cycle

A consistent theme across companies is the tight integration between customer deployment, evaluation development, and model improvement. OpenAI's approach exemplifies this clearly: FDEs embed with domain specialists, understand their specific tasks, ensure models can solve those tasks, and generate evaluation data that feeds back to post-training teams. This creates a flywheel where real-world deployment challenges directly drive model capability improvements, which then enable addressing even more complex problems.

The slide generation example demonstrates this process concretely. After identifying the customer need, FDEs experimented with numerous output formats, eventually selecting an approach that balanced model capabilities with quality requirements. They then generated extensive training examples based on this format. Three months later, a new model snapshot emerged with substantially improved slide generation capabilities. This pattern repeats across domains: FDEs essentially translate domain-specific problems into formats models can learn from, generate synthetic data representing those problems, and work with research teams to improve model performance on those specific tasks.

The telecommunications voice customer service deployment shows how this extends beyond single model improvements to building complete production systems. The team didn't just improve the model's ability to follow instructions - they also built platform capabilities for the customer to create their own evaluations and establish self-improvement loops for subsequent iterations. This enables customers to maintain and evolve their deployments without continuous FDE involvement, a critical requirement for scaling the approach.

### The Codex Consolidation

Multiple panelists note how increasingly capable coding agents, particularly Codex, have fundamentally changed the landscape. Six months prior to the discussion, OpenAI's FDE team anticipated building approximately 50 separate products for different use cases, potentially creating an ecosystem where others could contribute additional products. However, Codex capabilities improved so dramatically that roughly 80% of planned products could instead be implemented as Codex extensions. This consolidation affects not just OpenAI but all companies using these tools.

For Dataland's small team to achieve such high per-engineer productivity, they rely heavily on these coding capabilities to build and maintain their meta-agent infrastructure. Ramp's FDEs can serve multiple customers simultaneously partly because they can move faster with AI-assisted development. Nominal's engineers, whether traditionally mission ops or FDE roles, increasingly find themselves writing more code thanks to AI tooling, blurring previous role boundaries.

This represents a broader pattern in LLMOps: the tools used to build LLM applications are themselves rapidly improving through LLM capabilities, creating a compounding effect on developer productivity. FDE teams, as the first users of these tools in complex real-world scenarios, both benefit from and contribute to this acceleration.

## Organizational Design and Culture

### The Boundary Problem

A central challenge discussed extensively is maintaining appropriate boundaries between what FDE teams build for individual customers versus what belongs in core platforms. Calvin frames this as protecting core teams from drowning in enterprise requirements while still winning deals. Jason warns against the Palantir dark ages when FD teams essentially gave up on core products and built parallel systems. Howard emphasizes evaluating whether work delivers recurring value rather than one-time consulting.

Several mechanisms help maintain these boundaries. First, hiring profiles matter: seeking former founders, early-stage engineers, and people who care about revenue and business outcomes rather than just building interesting technology. Second, structural decisions like whether FDEs operate in shared codebases (Ramp's approach) versus separate systems affect how easily custom work can diverge from platform development. Third, metrics and culture around what constitutes success - Ramp measures FDE ROI as revenue divided by salaries, creating pressure to maximize leverage rather than headcount.

Fourth, regular rotation between FDE and core product roles helps maintain shared context and prevents siloing. When engineers who build platform features then use them with customers, they gain direct feedback about what works and what doesn't. When FDEs who have identified critical customer needs rotate to core teams, they can advocate for and implement those features as platform capabilities.

### The Services Revenue Trap

Colin articulates a key risk: services revenue becomes "a drug" that consultancies cannot quit, leading them to sell increasingly large custom engagements rather than building scalable products. OpenAI's structure helps avoid this because the commercial organization is not the power center of the business - product and research teams drive strategy and push FDEs toward buildable, scalable solutions. The team measures success not primarily by services revenue but by long-term value: What ARR will this unlock for digital-native customers who can then self-serve? What model improvements will benefit the entire customer base?

Jason describes this more graphically: customers can become addicted to forward-deployed engineers. If pulling back FDEs causes customers to fire you, it indicates failure to deliver durable value independent of headcount. The solution requires clear value engineering: ensuring that products or platforms deliver ongoing value after initial deployment, not just billable hours.

### Hiring and Team Composition

All panelists emphasize that effective FDEs require an unusual combination of skills: strong technical depth, ability to rapidly learn new domains, comfort with ambiguity, customer empathy, communication skills, and business acumen. Jason calls it perhaps the best training ground for future founders because it requires building zero-to-one solutions, staying current with AI frontiers, winning customer trust, and navigating organizational politics.

Colin emphasizes "relentless pursuit of value" and outcome focus as the most critical attribute. The best FDEs don't fall in love with the form of what they've created; they remain focused on function and user adoption. If users don't engage with a solution, effective FDEs tear it up and try something completely different rather than defending their work.

Companies hire from diverse backgrounds - consulting (BCG, McKinsey), previous Palantir experience, former founders, early-stage startup engineers - but success correlates with specific mindsets rather than pedigrees. The role also evolves with company stages. During product expansion phases, companies may want FDEs who can explore broadly and identify new use cases. During contraction phases focused on platform consolidation, they may prioritize FDEs who can standardize solutions and feed insights to core teams.

## Business Model and Scaling Considerations

### From Custom to Platform

The progression from custom solutions to platform capabilities emerges as a critical pattern for sustainable scaling. Nominal's container-based data transformation system originated as custom work for one customer but was architected from the start to be generalizable. OpenAI's workflow automation and regulatory document authoring products emerged from repeated patterns across engagements. Ramp constantly evaluates whether enterprise blockers appear across multiple customers and should therefore become platform features.

This progression isn't always linear or predictable. Jason describes product expansion and contraction cycles where companies oscillate between exploring new use cases and consolidating learnings into platforms. FDE priorities and even hiring profiles may shift between these phases. The key discipline involves recognizing when custom work is strategic (accelerating an important sales cycle, learning about a new domain, proving out a potential platform feature) versus when it simply represents undifferentiated consulting.

### Economics and Leverage

The companies demonstrate radically different economic models despite sharing the FDE approach. Ramp stretches individual FDEs across five to six customers, minimizes custom work, and focuses on roadmap acceleration. Their ROI metric is straightforward revenue divided by salary costs. Dataland achieves millions in ARR per engineer through extensive use of meta-agents and automated outer loops for agent maintenance. OpenAI focuses less on immediate services revenue and more on long-term strategic value: What model improvements does this enable? What self-service products can emerge?

All approaches emphasize leverage, but through different mechanisms. Ramp achieves leverage by keeping FDEs in the core codebase where their work has maximum reusability. Dataland achieves it by building infrastructure that dramatically accelerates subsequent agent development. OpenAI achieves it by improving underlying models and platforms such that entire categories of problems become self-serviceable.

### The Role of Improved Models

Interestingly, better models haven't reduced the need for FDE teams; instead, they've shifted what those teams do. Rather than spending months building infrastructure and evals just to get basic functionality working, FDEs now tackle harder, more valuable problems. The semiconductor example is telling: only after Codex became reliable enough to handle routine coding tasks could the team address physical chip design challenges.

This suggests a future where FDE roles continue evolving upward in abstraction. As models handle more foundational tasks autonomously, human experts focus increasingly on problem formulation, domain-specific evaluation design, and identifying the next frontier of addressable problems. The skills required may shift from traditional software engineering toward domain expertise plus AI systems knowledge.

## Critical Evaluation and Open Questions

While the panelists present compelling cases for forward-deployed engineering, several tensions and risks deserve consideration. First, the success stories primarily come from well-resourced companies (OpenAI, Ramp) or those with exceptional per-engineer productivity (Dataland). It remains unclear whether typical startups can effectively execute this model or whether it requires unusual circumstances.

Second, the line between strategic custom work and consulting remains somewhat subjective despite the articulated principles. Different companies draw this line in different places, and there's limited discussion of failures or projects that should have been abandoned earlier. The self-reported success metrics lack external validation.

Third, the scalability of the model faces inherent limits. OpenAI works on approximately ten engagements at a time with 90+ people, suggesting each major engagement requires substantial sustained attention. Even with improving tools and models, there may be a ceiling on how many complex enterprise deployments any team can effectively handle.

Fourth, the discussion focuses heavily on successful technical deployment but touches less on long-term maintenance costs, contract renewals, and customer retention after initial FDE engagement ends. The telecom example of 70,000 daily calls is impressive, but what does ongoing operation look like? How much continued support is required?

Finally, the emphasis on flexibility and custom solutions may create technical debt that becomes apparent only later. Despite stated intentions to minimize this, having 90+ engineers building across diverse customer environments inevitably creates complexity that may become difficult to maintain as those engineers rotate or leave.

The case studies nonetheless provide valuable insights into how sophisticated organizations approach productionizing LLMs in complex enterprise environments. The convergence around forward-deployed engineering across multiple companies with different business models suggests this pattern addresses real challenges in LLM adoption. The emphasis on tight feedback loops between deployment and model improvement, careful boundary management between custom and platform work, and hiring for specific mindsets rather than just technical skills offers concrete guidance for organizations building LLM products. The evolution toward more capable coding agents reducing infrastructure burden while enabling harder problem-solving also provides a glimpse into how this space may continue developing over the coming years.
