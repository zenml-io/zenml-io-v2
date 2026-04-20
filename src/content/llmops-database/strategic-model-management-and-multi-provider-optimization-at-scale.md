---
title: "Strategic Model Management and Multi-Provider Optimization at Scale"
slug: "strategic-model-management-and-multi-provider-optimization-at-scale"
draft: false
llmopsTags:
  - "data-analysis"
  - "summarization"
  - "question-answering"
  - "classification"
  - "document-processing"
  - "customer-support"
  - "cost-optimization"
  - "model-optimization"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "evals"
  - "fine-tuning"
  - "open-source"
  - "monitoring"
  - "orchestration"
  - "cache"
  - "databases"
  - "scalability"
  - "reliability"
  - "anthropic"
  - "openai"
  - "meta"
  - "google-gcp"
  - "amazon-aws"
  - "microsoft-azure"
  - "databricks"
  - "hugging-face"
industryTags: "tech"
company: "Notion"
summary: "Notion addresses the challenges of deploying LLMs at scale for millions of users while navigating volatile pricing, model deprecations, and supplier competition from frontier labs. The solution involves building a multi-provider architecture that maintains optionality, implementing automated model evaluation and switching infrastructure (the \"Auto\" model feature), optimizing architecture and orchestration to reduce costs beyond model selection, and investing in open-weight alternatives. The results include maintaining competitive pricing for customers despite market pressures, serving 75% of AI traffic through automatically optimized model selection that switches every 2-3 weeks, and achieving cost reductions of up to 3× through architectural improvements while preserving the ability to leverage the best frontier models without vendor lock-in."
link: "https://x.com/sarahmsachs/status/2031473087791902991"
year: 2026
seo:
  title: "Notion: Strategic Model Management and Multi-Provider Optimization at Scale - ZenML LLMOps Database"
  description: "Notion addresses the challenges of deploying LLMs at scale for millions of users while navigating volatile pricing, model deprecations, and supplier competition from frontier labs. The solution involves building a multi-provider architecture that maintains optionality, implementing automated model evaluation and switching infrastructure (the \"Auto\" model feature), optimizing architecture and orchestration to reduce costs beyond model selection, and investing in open-weight alternatives. The results include maintaining competitive pricing for customers despite market pressures, serving 75% of AI traffic through automatically optimized model selection that switches every 2-3 weeks, and achieving cost reductions of up to 3× through architectural improvements while preserving the ability to leverage the best frontier models without vendor lock-in."
  canonical: "https://www.zenml.io/llmops-database/strategic-model-management-and-multi-provider-optimization-at-scale"
  ogTitle: "Notion: Strategic Model Management and Multi-Provider Optimization at Scale - ZenML LLMOps Database"
  ogDescription: "Notion addresses the challenges of deploying LLMs at scale for millions of users while navigating volatile pricing, model deprecations, and supplier competition from frontier labs. The solution involves building a multi-provider architecture that maintains optionality, implementing automated model evaluation and switching infrastructure (the \"Auto\" model feature), optimizing architecture and orchestration to reduce costs beyond model selection, and investing in open-weight alternatives. The results include maintaining competitive pricing for customers despite market pressures, serving 75% of AI traffic through automatically optimized model selection that switches every 2-3 weeks, and achieving cost reductions of up to 3× through architectural improvements while preserving the ability to leverage the best frontier models without vendor lock-in."
notion:
  pageId: "344f8dff-2538-8079-9ea5-c438325fa518"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-16T06:51:00.000Z"
  lastEditedTime: "2026-04-16T06:52:00.000Z"
  publishedAt: "2026-04-20T06:51:33Z"
---

## Overview

This case study from Notion, written by Sarah Sachs who represents one of the few buyers negotiating at scale for the "Fortune 5 Million" (companies from five-person agencies to mid-size enterprises), provides a detailed look at the strategic and operational challenges of deploying LLMs in production at massive scale. Notion's position is unique: as a horizontal knowledge work product with millions of users, they negotiate with all major frontier labs on behalf of customers who would otherwise have no leverage in the opaque token market. The case study reveals sophisticated LLMOps practices around multi-provider architecture, automated model evaluation and switching, cost optimization through architectural decisions, and the strategic role of open-weight models.

## Market Dynamics and Core Challenges

Notion faces several fundamental challenges in the LLM production landscape. The first is opaque and volatile pricing from frontier labs. The text provides concrete examples: a reasoning model upgrade with identical per-token pricing that uses approximately 3× more output tokens for certain tasks, effectively tripling the cost per task despite unchanged rate cards. Another example involves a model with significant reasoning improvements priced 40% higher than its predecessor, which is then deprecated—forcing customers to pay more even when the additional capability doesn't deliver proportional value for all use cases.

A critical structural challenge is that frontier labs are simultaneously suppliers and competitors. For every token they sell to applied AI companies like Notion, they could spend it themselves at less than 50% COGS by building first-party products. The text cites Forbes speculation that it would cost Cursor 10× to serve what Claude Code charges customers $200 for, illustrating the permanent cost disadvantage faced by companies building on top of frontier models. This creates two failure modes: tying yourself to a cheaper provider that later changes prices or builds a competing product, leaving you with no alternatives; or being forced to provide substantial additional value to justify the "bad deal" on tokens since suppliers can always undercut you on raw inference.

The market itself is described as oligopolistic, with pricing reflecting demand rather than value delivered. Labs deprecate "good-enough" older models and funnel buyers toward either expensive top-tier models or "small" offerings that are meaningfully weaker than what they replaced. The pricing signals that reach most buyers—rate cards and per-token costs—obscure the true economics and must be treated as starting points for negotiation rather than givens.

## Strategic Response: Multi-Provider Architecture and Optionality

Notion's fundamental strategic response is maintaining optionality through a multi-provider architecture. Rather than committing to a single lab for upfront discounts, they have built a system that works with all model providers, enabling them to walk away from any single provider if needed. This is explicitly framed as preserving negotiating leverage: without optionality, discounts are at the mercy of one provider. The text states that Notion would "rather forgo large upfront discounts for optionality, believing it will lead to more customer trust and growth in the long run by making sure our customers get the right model for the job every time."

This strategy counters the typical enterprise AI procurement dynamic where companies feel forced to choose between optionality and price, leading many to advertise partnership with one lab because they're financially committed. Notion rejects this as a false tradeoff, arguing that preserving optionality is precisely how you get the best price. The company uses its "massive, diverse AI traffic" as leverage to partner with model providers rather than lock into commitments that could leave customers stuck on yesterday's best model.

## Automated Model Evaluation and Switching Infrastructure

The operational centerpiece of Notion's LLMOps approach is the "Auto" model feature, which handles approximately 75% of their AI traffic. This system ensures every customer is always on a state-of-the-art model without manual intervention. The implementation involves evaluating every major model on a cost-per-capability-per-second basis and selecting the right model for each task. The evaluation and switching happens rapidly: every two to three weeks, as new models are released, tools require different functionality, or evaluations surface better options, they switch models. The model winning today might not be winning in a month, and customers never have to think about it because Notion has built the infrastructure to move at market speed.

This approach addresses a key dynamic in the frontier model landscape: the "best" frontier model can change week to week, and traffic can be lost in a second when a better model comes along. Frontier labs know this and want to press customers into commitments that minimize the impact of their models falling behind. Large-scale AI procurement becomes a game of minimum commitments—to get reasonable rates, you must commit to large amounts of traffic, with GTM teams built around annual lock-in. Notion's automated switching infrastructure allows them to avoid this trap.

The evaluation infrastructure provides additional value beyond internal optimization. Notion offers detailed eval scorecards and feedback to every provider they work with on why they switched, what improved, and what didn't. As a horizontal knowledge work product, their evals span everything from morning brief generation to deep research to retrieval to meeting summaries to agent setup flows. This breadth of signal on how models actually perform across real-world knowledge work is described as uniquely valuable, something every lab wants. The text notes they provide these evals irrespective of specific deal terms, viewing it as improving the customer experience eventually. They're building toward making this signal more broadly available.

## Architectural Optimization Beyond Model Selection

A critical insight from the case study is that model selection accounts for only about 60% of the controllable cost profile. The remaining optimization comes from "boring infrastructure work" around how you build your agent harness—orchestration, compaction, caching, and context management. These architectural decisions can swing costs by 3×, making architecture as important as model choice for cost management.

This represents a sophisticated understanding of the full stack of LLM deployment costs. Rather than obsessing exclusively over which model to pick, Notion invests heavily in the infrastructure layer. The emphasis on caching and context management aligns with best practices in production LLM systems, where redundant API calls and inefficient context windows can dramatically inflate costs. The mention of "compaction" likely refers to techniques for reducing prompt size or context length while preserving necessary information, another key cost optimization lever.

## Open-Weight Models as Strategic Alternative

Notion is actively investing in open-weight models as a strategic alternative, particularly for "moderate tasks" like triaging inboxes, summarizing meeting notes, setting up databases, and answering quick questions. The problem they're solving is that frontier labs charge more for these tasks not because they got harder, but because they've deprecated mid-tier models that used to handle them affordably, funneling everyone toward top-of-market pricing. While smaller closed models (Haiku, Nano) exist, they often error and retry enough that effective cost ends up comparable to running a larger model.

Open-weight LLMs are described as now strong enough to handle these workloads in production—not equally capable on every task, but more than capable on ones that don't require frontier reasoning. And they're improving fast. This matters for two reasons. First, it's an immediate cost lever: for a meaningful share of traffic, you can stop overpaying for capabilities you don't need. Second, and described as the bigger point, open-weight creates downward pressure on frontier pricing over time. Today, you invest in open-weight to offload easy tasks. Tomorrow, as these models close the gap, frontier labs could lose the ability to charge premium rates for work that open-weight can do just as well.

Notion is actively evaluating open-weight models for production workloads, partnering with inference providers like Fireworks and Baseten. The text notes they'll have much more to share soon, suggesting this is an active area of development. The negotiating leverage doesn't just come from threatening to walk away from a commitment; it comes from having a credible, production-ready alternative eating into the traffic that labs are counting on. For the millions of companies that can't negotiate frontier contracts at scale, open-weight isn't a side bet—it's the path to the affordable middle tier that labs have no incentive to build.

## Task Segmentation and Model Matching

Notion explicitly segments their workloads into two categories with different value profiles. For "moderate tasks"—changing database fields, triaging email inboxes, summarizing meeting notes—more powerful models don't make tasks meaningfully better. Cost is what moves the needle, and the intelligence frontier has already saturated the solution. In contrast, there are bodies of traffic where they're "thirsty for frontier capabilities": autonomous agent paths, large-scale data analysis, deep research journeys, incident remediation. These are tasks that act as independent co-workers rather than assistants, where more capability genuinely unlocks more value.

Examples of frontier-requiring workflows at Notion include deep sales research, their data analytics custom agent called "Data Scout," and Slack triage across dozens of channels. The problem identified is that the market doesn't distinguish between these two worlds. Prices rise faster than value delivered for moderate tasks, especially once labs deprecate older models. Each provider is incentivized to pursue one of two paths: be the best reasoning model, or be slightly worse but price as close to the top as possible. No one is incentivized to build a frontier-capable, secure model at moderate pricing, because the oligopoly doesn't require it.

This segmentation drives Notion's multi-tier strategy: use frontier models where they deliver genuine additional value, optimize costs through architecture and model selection for mid-tier tasks, and increasingly use open-weight alternatives for routine workloads. The automated evaluation and switching infrastructure allows this matching to happen dynamically and at scale.

## Data Flywheels and Product Moats

The text identifies two paths for applied AI companies to win when capabilities become commoditized and suppliers have permanent cost advantages. The first is data flywheels—reinforcement fine-tuning on open-weight to increase the product's own intelligence and reduce dependence on frontier pricing. Notion is investing here, along with companies like Cursor, Lovable, and Gamma. The text notes an explosion in funding for inference companies like Baseten, Fireworks, Modal, and Together, identifying this as a space to watch and the right place to innovate.

The second path is product moats—compelling enough UI, orchestration, architecture, and integrations to justify the cost. Notion has found a product space where people will pay above the labs' token costs for the full experience surrounding the capabilities. The analogy used is Datadog and AWS: Datadog couldn't exist without AWS, and AWS has a competitive product (CloudWatch), but Datadog holds significant market share because it invests entirely in the product experience around observability. It holds more expertise on that problem than AWS ever will, because that's all it does. Datadog doesn't need to win on infrastructure; it needs to win on the experience of understanding your product and meeting analytics needs.

The same principle applies to applied AI: Notion doesn't need to train the best model; they need to build the best product that uses many models and invest so deeply in the surrounding experience that the token itself becomes a commodity input, not the value proposition. This drives their negotiation strategy and overall product approach.

## Negotiation Dynamics and Procurement Strategy

The text provides insights into how Notion approaches negotiations with frontier labs. Large-scale AI procurement is described as a game of minimum commitments: to get reasonable rates, you must commit to large traffic amounts, with GTM teams built around annual lock-in. Notion counters this by maintaining optionality and using their evaluation infrastructure as value exchange rather than just financial commitments.

Key negotiation principles include treating rate cards as starting points rather than givens, building credible alternatives (open-weight) to create walk-away leverage, providing valuable feedback through detailed eval scorecards, and preserving optionality even at the cost of foregoing large upfront discounts. The company's diverse, massive AI traffic across horizontal knowledge work provides unique value to labs in understanding real-world performance across varied use cases.

## Practical Guidance for AI Product and Engineering Leaders

The text concludes with specific pointers for others negotiating with labs or deploying compute in products. Architecture matters as much as model choice—while everyone obsesses over which model to pick, model selection accounts for maybe 60% of controllable cost profile, with orchestration, compaction, caching, and context management able to swing costs by 3×. The boring infrastructure work is where real savings are.

Open-weight optionality doesn't mean offering every model. You need a few credible open-weight alternatives, not all of them. Each model you support requires reserved traffic and operational overhead. One well-evaluated open-weight option gives you the cost lever for customers and negotiating leverage with labs, with diminishing returns kicking in fast after that.

Finally, build product value that transcends the token. The companies that win in applied AI won't be the ones who got the best per-token rate; they'll be the ones who built products so good that the token becomes invisible. Managing tradeoffs like optionality versus lock-in and long-term growth versus short-term margin isn't just a procurement problem—it's a product strategy challenge.

## Critical Assessment

The case study should be read with some caution as it represents a specific perspective from a well-resourced company with significant negotiating leverage. Notion's ability to build multi-provider infrastructure, run comprehensive evals every 2-3 weeks, and maintain relationships with all major labs is not accessible to smaller companies. The claim that "preserving optionality is how you get the best price" may be true at Notion's scale but could be misleading for smaller organizations where committing to a single provider might actually yield better rates.

The specific cost figures (3× swings from architecture, <50% COGS for labs, 10× cost difference for Cursor versus Claude Code) should be treated as illustrative rather than universal. These likely vary significantly by use case, model, and negotiation context. The characterization of the market as "opaque" and "structured against buyers" is valid but also somewhat self-serving, potentially overstating Notion's role as advocate for smaller companies.

That said, the technical insights around architectural optimization, automated evaluation infrastructure, and the strategic role of open-weight models are valuable and likely generalizable. The emphasis on cost-per-capability-per-second as the key metric, the segmentation of workloads by value profile, and the recognition that model selection is only part of the cost equation all represent sophisticated production LLMOps thinking. The tension between frontier labs as both suppliers and competitors is real and important for any company building on these APIs to understand.

The case study provides a rare look at large-scale LLM operations from a company serving millions of users with diverse workloads, making it a valuable data point despite its promotional elements and the need to consider how the lessons scale up or down to different organizational contexts.
