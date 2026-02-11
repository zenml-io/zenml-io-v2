---
title: "Scaling Finance Operations with Agentic AI in a High-Growth EV Manufacturer"
slug: "scaling-finance-operations-with-agentic-ai-in-a-high-growth-ev-manufacturer"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6936b9171d62bed57d8703f6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:34:36.969Z"
  createdOn: "2025-12-08T11:40:07.439Z"
llmopsTags:
  - "data-analysis"
  - "data-integration"
  - "realtime-application"
  - "high-stakes-application"
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "semantic-search"
  - "orchestration"
  - "monitoring"
  - "api-gateway"
  - "databases"
  - "guardrails"
  - "fastapi"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "automotive"
company: "Lucid Motors"
summary: "Lucid Motors, a software-defined electric vehicle manufacturer, partnered with PWC and AWS to implement agentic AI solutions across their finance organization to prepare for massive growth with the launch of their mid-size vehicle platform. The company developed 14 proof-of-concept use cases in just 10 weeks, spanning demand forecasting, investor analytics, treasury, accounting, and internal audit functions. By leveraging AWS Bedrock and PWC's Agent OS orchestration layer, along with access to diverse data sources across SAP, Redshift, and Salesforce, Lucid is transforming finance from a traditional reporting function into a strategic competitive advantage that provides real-time predictive analytics and enables data-driven decision making at sapphire speed."
link: "https://www.youtube.com/watch?v=pNaT-oUhpZc"
year: 2025
seo:
  title: "Lucid Motors: Scaling Finance Operations with Agentic AI in a High-Growth EV Manufacturer - ZenML LLMOps Database"
  description: "Lucid Motors, a software-defined electric vehicle manufacturer, partnered with PWC and AWS to implement agentic AI solutions across their finance organization to prepare for massive growth with the launch of their mid-size vehicle platform. The company developed 14 proof-of-concept use cases in just 10 weeks, spanning demand forecasting, investor analytics, treasury, accounting, and internal audit functions. By leveraging AWS Bedrock and PWC's Agent OS orchestration layer, along with access to diverse data sources across SAP, Redshift, and Salesforce, Lucid is transforming finance from a traditional reporting function into a strategic competitive advantage that provides real-time predictive analytics and enables data-driven decision making at sapphire speed."
  canonical: "https://www.zenml.io/llmops-database/scaling-finance-operations-with-agentic-ai-in-a-high-growth-ev-manufacturer"
  ogTitle: "Lucid Motors: Scaling Finance Operations with Agentic AI in a High-Growth EV Manufacturer - ZenML LLMOps Database"
  ogDescription: "Lucid Motors, a software-defined electric vehicle manufacturer, partnered with PWC and AWS to implement agentic AI solutions across their finance organization to prepare for massive growth with the launch of their mid-size vehicle platform. The company developed 14 proof-of-concept use cases in just 10 weeks, spanning demand forecasting, investor analytics, treasury, accounting, and internal audit functions. By leveraging AWS Bedrock and PWC's Agent OS orchestration layer, along with access to diverse data sources across SAP, Redshift, and Salesforce, Lucid is transforming finance from a traditional reporting function into a strategic competitive advantage that provides real-time predictive analytics and enables data-driven decision making at sapphire speed."
---

## Overview

Lucid Motors represents a compelling case study in rapidly deploying agentic AI capabilities across a finance organization in a high-growth technology company. As a software-defined electric vehicle manufacturer that has been selling the Lucid Air sedan since 2021 and recently introduced the Gravity SUV, the company is preparing for significant scale with the upcoming launch of a more affordable mid-size vehicle platform. The finance team, led by Aditya Baheti (head of business finance) and Will Velez (finance systems developer), partnered with PWC and AWS to establish 14 proof-of-concept AI solutions targeting all organizational levels from the board of directors to analysts—all accomplished in approximately 10 weeks.

The driving force behind this initiative was multifaceted. First, Lucid needed to scale their finance organization sustainably to support anticipated massive growth without proportionally increasing headcount. Second, their CFO had a vision to transform finance into a competitive edge that provides real-time analytics and business insights for data-driven decision making in a fast-paced, uncertain environment (particularly relevant given 2025's tariff and trade impacts). Third, there was board-level pressure, as companies investing more than 0.5% in AI have shown 21% or more total shareholder value returns over recent years. The CFO's directive to "take a leap of faith" provided the executive sponsorship critical to moving at the accelerated pace required.

## Technical Architecture and Foundation

The technical foundation of Lucid's agentic AI implementation centers on AWS Bedrock as the core LLM platform, integrated with PWC's Agent OS orchestration layer. This architecture choice reflects several key LLMOps principles. The Agent OS provides a common orchestration layer that enables multi-agent environments to function effectively by establishing guardrails, policy adherence frameworks, and agent-to-agent communication protocols with defined lanes for collaboration across workflows. The orchestration layer was implemented natively to AWS and embedded with Bedrock, working with all necessary integration points across Lucid's technology stack.

A critical discovery in the early stages was the wealth of data available beyond the finance team's immediate awareness. While finance was intimately familiar with their SAP system, PWC helped them unlock significant value from data residing in AWS Redshift that the team hadn't fully leveraged. The solution architecture integrated data from multiple sources including SAP (their primary ERP), Redshift data warehouse, Salesforce CRM, and other platforms across the organization. This cross-functional data integration proved essential—finance could now leverage data from sales, operations, manufacturing, and other domains to build more comprehensive analytical models.

The infrastructure and security governance involved daily coordination across multiple teams including cybersecurity, infrastructure, internal audit, and a dedicated AI team responsible for architectural decisions and cost economics. Will Velez emphasized the importance of cross-functional alignment, noting that the project required collaboration with teams he "didn't know existed" prior to the initiative. The human element of governance was equally important—making personal connections with stakeholders who had concerns about data security and change management proved essential to unlocking cooperation and moving quickly.

## Use Cases and Production Applications

### Demand Forecasting

The demand forecasting solution represents one of the most impactful use cases, addressing a critical need for CFOs and CEOs to understand future revenue projections. Aditya brought prior experience building AI models for demand forecasting a decade earlier using random forest algorithms, but noted the dramatic evolution in capabilities. Where previous approaches were limited by compute resources, could only handle finite attributes and files, and took days to refresh models, the new agentic approach operates at dramatically different scales and speeds.

The breakthrough in Lucid's demand forecasting lies in combining and correlating both external and internal factors within a unified platform that can run multiple statistical models and generate scenarios in fractions of a second. External factors include both leading indicators (gas prices, which have inverse correlation with EV demand) and lagging indicators (CPI, GDP growth, interest rates). These are matched against internal factors including incentives, discounts, pricing offers, order intake rates, and sales pipeline data. The system builds multiple statistical models layered on top of this integrated dataset to provide predictive analytics.

However, the case study provides an important lesson about the necessity of human oversight and business context. The model initially assumed that the elimination of EV tax credits on September 30th was a recurring annual event, when it was actually a one-time policy change. This hallucination required human intervention to correct the model's assumptions about demand acceleration in September and the subsequent impact on Q4 months. Aditya drew a parallel to post-COVID planning, when everyone assumed the worst and ended up in a supply chain crisis—demonstrating that models without proper business context can lead to significant errors. The target is to achieve 80% accuracy as a good starting point, then iterate continuously to improve model performance.

### Investor and Analyst Dashboard

Another significant use case focuses on investor analytics, providing insights not just on investor holdings but also on positions investors are taking including sell and put options. The system can identify patterns like investment groups taking positions against their own sister companies, which helps explain and potentially reduce stock price volatility. This level of sophisticated analysis provides finance leadership with actionable intelligence for shareholder relations and market strategy.

### Executive Dashboards with Conversational Analytics

Lucid developed executive dashboards that leverage agentic AI to automatically populate not just data visualizations but also narrative commentary. The system replaces traditional manual workflows where finance professionals would take screenshots of spreadsheet tables with red/green formatting, paste them into PowerPoint, and write accompanying bullet points. The new approach generates role-specific dashboards—different views and commentary for the CEO, CFO, and finance leaders—with daily updates and conversational analytics capabilities.

Users can interact naturally with these dashboards to explore their red areas and pain points, asking follow-up questions like "Why has EPS gone down?" or "What triggered that headwind?" The system provides context-aware responses that help executives quickly understand drivers of performance changes and explore different scenarios. This represents a shift from backward-looking reporting ("How did we do last quarter?") to forward-looking strategic analysis that helps identify levers for influencing future outcomes.

### Additional Use Cases Across Finance Functions

The 14 proof-of-concept solutions span multiple finance domains including treasury operations, accounting processes, and internal audit. While the panel didn't detail all use cases, they mentioned that PWC demonstrated work on internal audit controls testing that reduced testing time from 20 days to 2 minutes, with a goal of reaching under 20 seconds. This dramatic acceleration allows for larger population testing rather than sampling, while freeing internal auditors to focus on identifying business risks and protecting against malicious intent.

The accounting function is exploring continuous close capabilities, moving from monthly accruals and reconciliations to daily automated processes. This challenges traditional assumptions about why finance operates on monthly cycles when technology enables real-time financial operations. The goal is to unlock capacity for finance professionals to become true strategic business partners rather than spending the majority of their time on transactional workflows.

## LLMOps Practices and Operational Considerations

### Rapid Iteration and MVP Approach

Lucid's approach emphasizes moving quickly, failing fast, and iterating continuously. The 10-week timeline to develop 14 POCs reflects an aggressive sprint-based methodology. The team consciously adopted an 80% accuracy threshold as acceptable for initial deployment, recognizing that perfection would take too long and that models improve through real-world usage and feedback. This pragmatic approach balances the need for accuracy with the competitive advantage gained from early deployment.

The daily 8 AM check-ins (not weekly as Aditya jokingly suggested) enabled rapid unblocking of barriers and maintaining momentum. The team's comfort with uncertainty—Will noted candidates need to be "comfortable with not knowing what they're gonna do tomorrow"—reflects the startup culture necessary for rapid AI adoption. This pace isn't sustainable for every organization, but it demonstrates what's possible with proper executive alignment and organizational culture.

### Human-in-the-Loop and Augmentation Philosophy

A central theme throughout the case study is that AI augments rather than replaces finance professionals. Aditya used the travel analogy of ChatGPT providing a tourist itinerary for Jaipur that was helpful but incomplete—it was the locals who provided the real context about which shops to visit, which restaurants to avoid, and how to navigate between locations. Similarly, AI models can process vast amounts of data and generate initial analysis, but finance professionals provide the essential business context, domain expertise, and judgment that makes the analysis actionable.

This philosophy has important implications for workforce development. Finance roles are evolving from manual reconciliation and reporting to strategic analysis and business partnership. The team acknowledges that reskilling will be necessary—it's not just about reporting numbers anymore, but about leveraging AI tools strategically. The calculator analogy resonates: just as calculators didn't eliminate math jobs but enhanced productivity 10x, AI might enhance productivity 50x while still requiring human expertise to direct and interpret the results.

Leaders emphasized the importance of empathy and coaching through this transition. PWC is investing significantly in human-centered approaches for 2026, recognizing that the uncertainty around job impacts and career disruption creates genuine anxiety. The message to finance professionals is clear: those who integrate with AI technology and think differently about their roles will differentiate themselves; those who continue working in traditional ways risk becoming obsolete. The analogy of watching a fellow passenger manually creating PowerPoint slides from spreadsheets served as a stark reminder of workflows that must evolve.

### Model Performance and Continuous Improvement

The team is transparent about ongoing challenges with model accuracy and hallucinations. The EV credit example demonstrates how models can misinterpret one-time events as patterns, requiring continuous monitoring and adjustment. The journey is compared to Waymo's 10-year development of autonomous vehicles—while Lucid won't take 10 years, the expectation is that achieving high-reliability AI systems requires sustained iteration and learning.

The governance framework includes safeguards and reasonableness checks built into the orchestration layer. Automated reasoning capabilities as part of the agent core help ensure logical consistency in outputs. The team maintains a balance between automation and oversight, recognizing that regulated financial reporting requires controls that prevent AI-generated errors from reaching external stakeholders.

### Scalability and Future Architecture

Laurie Driscoll from PWC discussed the importance of purposeful and disciplined architecture decisions as companies move from experimentation to production deployment. Key considerations include total cost of ownership, integration points across business data sources, and long-term scalability and performance. She raised the important question of what workloads truly need large language models versus what might run more efficiently on edge solutions, particularly given GPU capacity constraints and energy requirements in the semiconductor supply chain.

The orchestration approach with Agent OS positions Lucid to scale from their initial agents to potentially hundreds of agents over time. The system isn't designed around individual agents but around the outcomes those agents deliver through coordinated workflows. As new agents come online, they integrate into the existing orchestration framework with established policies, guardrails, and communication protocols.

### Multi-Model Strategy and Vendor Flexibility

PWC emphasized avoiding lock-in by ensuring clients have access to multiple models from different providers. Some models are chosen for economic reasons, others for specific capabilities aligned with particular outcomes. The technology landscape is evolving rapidly, and maintaining flexibility allows organizations to adopt new models as providers continue advancing their offerings. This multi-model approach is increasingly common in enterprise LLMOps as organizations recognize that no single model excels at all tasks.

## Business Impact and Outcomes

While the implementation is still in early stages (the orchestration layer was only deployed the week before the conference), the team reports seeing powerful early results that validate their CFO's "leap of faith." The speed of scenario planning and analytics has transformed decision-making capabilities. Finance can now model multiple scenarios and quantify risk levels in ways that were previously impossible, enabling proactive risk management rather than reactive response.

The competitive advantage comes from finance's ability to see and analyze data across the entire organization, not just within the finance domain. This cross-functional visibility, combined with AI's analytical capabilities, positions finance to provide predictive insights that influence operational decisions. The airline example shared by Brad Donaldson illustrates this potential: working backward from a finance issue (crew labor budget overruns) to operational root causes (forecasting and scheduling inefficiencies) enabled $200 million in savings through improved scheduling and crew alignment.

For Lucid specifically, this capability is critical as they prepare for the growth wave from mid-size vehicle launches, autonomous driving partnerships with Nvidia, robotaxi fleets with Nuro and Uber launching in the Bay Area, and international expansion. The finance organization must scale to support this growth in a sustainable, cost-efficient manner while providing the real-time insights needed for fast-paced decision-making in uncertain market conditions.

## Lessons and Recommendations

The panel offered several key recommendations for organizations considering similar journeys. First, secure executive sponsorship and alignment before beginning—the CFO's support was essential to Lucid's rapid progress. Second, move quickly and prioritize ruthlessly—identify pain points and focus on high-impact use cases rather than trying to address everything simultaneously. Third, make it personal by building human connections with stakeholders across security, infrastructure, audit, and other governance functions.

Fourth, embrace the reality that jobs are changing and will continue to change—leaders must be role models in understanding technology, identifying use cases, and thinking about how to unlock creativity. Finance professionals need to think differently about their work, moving from transactional execution to strategic value creation. Fifth, find and empower change agents within the organization who can challenge norms and think big about operational transformations enabled by AI.

Finally, recognize that this is a continuous journey rather than a destination. What seems cutting-edge today will be archaic in 18 months. Organizations need to maintain backlogs of use cases and run continuous sprints to iterate on existing solutions while developing new capabilities. The pace of change in AI technology means that early movers gain significant advantages, but maintaining that advantage requires sustained commitment to innovation and evolution.