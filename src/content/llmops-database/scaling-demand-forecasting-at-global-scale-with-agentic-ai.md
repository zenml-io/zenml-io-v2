---
title: "Scaling Demand Forecasting at Global Scale with Agentic AI"
slug: "scaling-demand-forecasting-at-global-scale-with-agentic-ai"
draft: false
llmopsTags:
  - "data-analysis"
  - "high-stakes-application"
  - "structured-output"
  - "classification"
  - "visualization"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "evals"
  - "monitoring"
  - "orchestration"
  - "databases"
  - "scalability"
  - "fastapi"
  - "langchain"
  - "databricks"
industryTags: "other"
company: "PepsiCo"
summary: "PepsiCo transformed their demand forecasting system to handle 125 million weekly forecast combinations across 1.5 million demand forecasting units (DFUs) in the United States snacks business. The company partnered with Databricks to build an agentic AI-powered platform called PEP Planner that shifts from delivering forecasts to delivering actionable decisions. The system uses multiple AI agents for anomaly detection, causal reasoning, and incident triage, enabling demand planners and data scientists to identify forecast anomalies proactively and retrain models with contextual recommendations. The solution achieved over 80% accuracy (compared to a legacy system used for 10+ years), reduced costs by 50%, decreased compute costs by 60%, and doubled time-to-value by enabling market rollouts six months earlier than planned."
link: "https://www.youtube.com/watch?v=AFFgWW-oAI0"
year: 2026
seo:
  title: "PepsiCo: Scaling Demand Forecasting at Global Scale with Agentic AI - ZenML LLMOps Database"
  description: "PepsiCo transformed their demand forecasting system to handle 125 million weekly forecast combinations across 1.5 million demand forecasting units (DFUs) in the United States snacks business. The company partnered with Databricks to build an agentic AI-powered platform called PEP Planner that shifts from delivering forecasts to delivering actionable decisions. The system uses multiple AI agents for anomaly detection, causal reasoning, and incident triage, enabling demand planners and data scientists to identify forecast anomalies proactively and retrain models with contextual recommendations. The solution achieved over 80% accuracy (compared to a legacy system used for 10+ years), reduced costs by 50%, decreased compute costs by 60%, and doubled time-to-value by enabling market rollouts six months earlier than planned."
  canonical: "https://www.zenml.io/llmops-database/scaling-demand-forecasting-at-global-scale-with-agentic-ai"
  ogTitle: "PepsiCo: Scaling Demand Forecasting at Global Scale with Agentic AI - ZenML LLMOps Database"
  ogDescription: "PepsiCo transformed their demand forecasting system to handle 125 million weekly forecast combinations across 1.5 million demand forecasting units (DFUs) in the United States snacks business. The company partnered with Databricks to build an agentic AI-powered platform called PEP Planner that shifts from delivering forecasts to delivering actionable decisions. The system uses multiple AI agents for anomaly detection, causal reasoning, and incident triage, enabling demand planners and data scientists to identify forecast anomalies proactively and retrain models with contextual recommendations. The solution achieved over 80% accuracy (compared to a legacy system used for 10+ years), reduced costs by 50%, decreased compute costs by 60%, and doubled time-to-value by enabling market rollouts six months earlier than planned."
notion:
  pageId: "3c1f8dff-2538-8053-b932-ebcfe396d58c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:04:00.000Z"
  lastEditedTime: "2026-08-19T09:04:00.000Z"
  publishedAt: "2026-08-19T09:13:40Z"
---

## Overview

PepsiCo's demand forecasting transformation represents a sophisticated application of LLMOps principles at massive scale, specifically addressing the challenge of operationalizing AI for business-critical decision-making in the consumer packaged goods industry. The company processes forecasts for over 1 billion daily consumer touchpoints across their extensive brand portfolio, requiring them to predict demand across multiple retail channels (grocery, convenience stores, clubs, e-commerce) with different purchasing behaviors and time horizons.

The core challenge PepsiCo faced was managing 1.5 million demand forecasting units (DFUs) that generate approximately 125 million weekly forecast combinations at a 104-week horizon. Each DFU comprises three hierarchical components: product (from high-level categories like "snacks" down to specific SKU and packaging size), geography, and customer (specific retailers like Walmart, Target, Publix). The hierarchical nature adds significant complexity because different levels serve different purposes—higher-level forecasts inform financial planning and budgeting, while granular forecasts drive actual demand planning and inventory management. The system operates on a weekly cadence with actuals lagging by four weeks, creating a continuous cycle of forecast generation, accuracy analysis, and model refinement.

## The Platform Architecture Decision

PepsiCo made a strategic platform decision to build on Databricks' lakehouse architecture rather than attempting a lift-and-shift migration from their legacy on-premises system that had been in use for over a decade. This was a significant business risk given the scale of operations, but the company recognized that their old approach of building bigger, more complex models was not the solution. Instead, they focused on what happens around the forecast to make it usable and actionable.

The architecture is built on several foundational principles. First, Unity catalog provides the governance layer that ties together features, models, prompts, and AI capabilities in a unified manner. This is critical because it ensures that models sit next to data rather than being distributed across different clouds or geographic regions, which would introduce latency and consistency issues. Second, the platform enables reusability across markets rather than rebuilding solutions per market, creating what they describe as a "hidden multiplier" effect where subsequent market rollouts benefit from learnings and implementations in earlier markets.

The technical stack leverages Databricks' lakehouse with Unity catalog for governance, MLflow for model management and tracking, AgentBricks for orchestrating multiple AI agents, and Genie for conversational data access. LakeFlow Connect handles ingestion from external source systems including SAP, which stores critical PepsiCo pricing and promotional data. All forecasts are stored in Delta format within the lakehouse, ensuring ACID compliance and time travel capabilities.

## The PepsiCo Forecasting Engine (PF Plus)

At the heart of the solution is what PepsiCo calls PF Plus, their proprietary forecasting engine that represents their intellectual property and domain expertise. This is an important architectural decision—PepsiCo owns and manages the forecasting engine itself, while Databricks provides the platform infrastructure. This separation allows PepsiCo to maintain competitive differentiation while leveraging cloud-native scalability and tooling.

The forecasting approach rests on three pillars. First is driver-based modeling that incorporates weather, promotions, calendar effects (holidays, events), pricing, and other contextual features that influence demand. This provides the baseline accuracy that serves as table stakes for the entire system. Second is parallelization at massive scale—the system must process 125+ million forecast combinations weekly within the demand planners' working window, providing sufficient time for human review and adjustment before deployment. Third is governed reuse, ensuring that new markets can pick up where other markets left off rather than starting from scratch.

The system forecasts at a 104-week horizon for each DFU, balancing short-term operational needs (next few weeks for inventory and distribution) with longer-term strategic planning (quarters ahead for capacity and financial planning). This extended horizon is particularly important for a company like PepsiCo that needs to coordinate manufacturing, distribution, retail partnerships, and promotional events across a complex supply chain.

## Agentic AI Implementation

The LLMOps innovation at the core of this case study centers on PEP Planner, an application that uses multiple AI agents to proactively surface insights and recommendations rather than forcing demand planners and data scientists to reactively hunt for problems. The system employs three primary agents working in concert:

The anomaly triage agent continuously monitors forecasts to identify issues such as chronic failures (DFUs that have failed for 12-13 consecutive weeks), volume spikes, deviations from actuals, and sustained bias issues. This agent doesn't just flag problems but recommends specific next actions based on PepsiCo's accumulated domain knowledge and feedback from previous interventions. The agent considers the priority of anomalies, which DFUs are affected, and what remediation approaches have worked in similar situations historically.

The causal reasoning agent performs pattern matching across multiple data sources to determine root causes of anomalies. When an anomaly is detected, this agent analyzes whether it stems from weather events, geopolitical disruptions, data quality issues, supply chain mishaps, or unexpected promotional activities. This is particularly sophisticated because it requires correlating temporal patterns across disparate data types—for instance, matching a demand spike to a "shock promo" introduced just days earlier, or connecting forecast errors to a heat dome weather event in the Pacific Northwest. The agent has access through Unity catalog to all of PepsiCo's pricing, promotional, supply chain, and operational data, allowing it to build rich contextual understanding.

The incident triage agent focuses on demand sensing for future-looking adjustments. It monitors for shock events—unexpected promotions, supply chain disruptions, weather events, social occasions—that weren't captured in the original forecast but will affect demand. This is especially relevant for large-scale events like the FIFA World Cup, where PepsiCo knows there will be significant demand but may lack historical patterns for specific venues and timeframes.

## The Demand Planner Workflow

The PEP Planner application presents demand planners with an "attention card" dashboard that surfaces critical anomalies and flags without requiring them to run complex queries or navigate multiple systems. Each morning, planners can see prioritized issues with context about which DFUs are affected, what type of anomaly has been detected (chronic failure, volume spike, bias issue, etc.), and what action the agents recommend.

The application includes rule-based engines working alongside the AI agents to classify anomalies according to PepsiCo's business logic. This hybrid approach balances the flexibility of learned patterns with the reliability of domain-specific rules that encode decades of operational experience.

When a planner identifies an issue worth escalating, they can drill into the specific DFU details and see the causal reasoning agent's assessment of likely root causes. The system provides status tracking showing whether a data scientist has already addressed the issue or if it's pending attention. Planners can approve recommended actions and send items for model retraining directly from the interface, creating a seamless handoff that was previously manual and time-consuming.

The integration with Databricks Genie allows demand planners to have conversational interactions with the data. They can ask questions like "what are the brands with the lowest accuracy?" and receive immediate visualizations and insights without needing to write SQL queries or understand the underlying data schema. This dialogue-with-data capability democratizes access to forecast intelligence across team members with varying technical skill levels.

## Data Scientist Workflow and Model Retraining

From the data science perspective, the PEP Planner application provides an adjustments tab that consolidates all items escalated by demand planners or automatically flagged by agents. For each escalation, data scientists see the agent's recommendation for how to address the issue, including which modeling approach to use (for instance, the agent might recommend LightGBM for a particular type of forecast adjustment).

Critically, the agents leverage MLflow logs from previous model training runs to inform their recommendations. By analyzing what approaches succeeded or failed in past interventions, the agents build institutional knowledge about which techniques work for which types of problems. This creates a virtuous cycle where the system becomes more intelligent over time.

Data scientists can update model recipes by adjusting feature weights, hyperparameters, and other configuration details. Before committing changes, they receive a preview showing how many DFUs would be affected by the retrain, what the adjusted forecast looks like, the delta from the current forecast, and the expected accuracy improvement. This preview capability is essential for maintaining trust—data scientists can validate that proposed changes make business sense before deploying them.

The feedback loop is a key LLMOps pattern implemented here. After each retraining, data scientists provide feedback that gets captured and fed back to the agents. This explicit feedback mechanism, combined with the implicit feedback from MLflow logs, allows the agents to continuously refine their recommendation strategies.

Unity catalog's security model ensures that demand planners only see forecasts and data for their assigned categories, preventing information leakage between teams managing different product lines or retail relationships. This fine-grained access control is built into the platform rather than being bolted on as an afterthought.

## Operational Data Storage and State Management

An important technical detail is the use of lakebase (presumably a typo in the transcript for what might be a Databricks lakehouse feature) to store operational data, session states, agent states, and user actions. This is distinct from the forecast data itself and captures the collaborative work happening around the forecasts—which issues were escalated, what decisions were made, how agents responded, what adjustments were applied.

The system uses async data synchronization to merge adjusted forecasts from the application layer back into the lakehouse, ensuring that the source of truth remains consistent while allowing low-latency interactions in the application. This architecture balances the need for immediate responsiveness in the user interface with the requirement for durable, governed storage of forecast data.

## Results and Business Impact

The business results provide validation of the LLMOps approach. Achieving over 80% accuracy against a well-established legacy system that had been refined over more than a decade is significant, especially when simultaneously reducing costs by 50% and compute costs by 60% while actually expanding scope to 125 million weekly combinations. This seemingly contradictory outcome—better accuracy, lower cost, broader scope—was possible because of the architectural rethinking rather than incremental optimization.

The 2x improvement in time-to-value, manifesting as projects rolling out six months earlier than planned, directly impacts PepsiCo's competitiveness. In the consumer goods industry, being able to respond to market changes and opportunity windows faster than competitors translates to market share and revenue. The company reports that improved forecasting has driven millions of dollars in incremental revenue.

Importantly, PepsiCo tracks bias in addition to accuracy, recognizing that forecasts can be accurate on average but systematically over- or under-predict in ways that cause operational problems. Meeting business targets for bias demonstrates that the system produces balanced forecasts that support efficient inventory management and distribution.

## The Journey and Migration Approach

The implementation timeline reveals a deliberate phased approach. In Q1, rather than attempting a lift-and-shift, PepsiCo completely retired the legacy system and started fresh with new solution architecture. This bold decision avoided the technical debt trap and allowed them to design for cloud-native scalability from the start. In Q2, they migrated models using the driver-based rebuild approach, essentially reimplementing forecasting logic to take advantage of the new platform capabilities. Q3 saw the first market going live with end-to-end decisioning, validating the approach in a real operational environment. In Q4, they demonstrated governed reuse by rolling out to a secondary market without rebuilding, proving the multiplier effect they had designed for. The current phase focuses on scaling PF Plus across markets while adding agent-driven root cause analysis and what-if scenario capabilities.

## Key Lessons and LLMOps Principles

Several LLMOps lessons emerge from this case study. First is the principle that "decision is the product, not the forecast." This reframes the entire MLOps challenge from optimizing model accuracy to optimizing business outcomes. Forecasts are only valuable insofar as they enable better decisions, and the time lag between forecast generation and action represents value erosion. By building the decision-making interface and agent recommendations directly into the platform, PepsiCo compressed this lag from days or weeks to minutes.

Second is that reuse is the hidden multiplier. In traditional ML deployments, each new market or use case often requires rebuilding models, data pipelines, and operational processes. By designing for reuse with Unity catalog governance and modular agent architectures, subsequent deployments benefit from all previous learnings and require only configuration rather than reimplementation. This compounds value exponentially as the system scales.

Third is that agents earn trust the way people do—through clear scope, showing their work, and growing autonomy as they demonstrate competence. PepsiCo didn't deploy fully autonomous agents that make changes without human review. Instead, agents make recommendations with explanations, humans validate and provide feedback, and over time the system becomes more reliable. The transparency of showing causal reasoning and providing previews of retrain impacts builds confidence that allows the human-agent partnership to become more efficient.

The emphasis on context and unified data platforms is another key insight. The causal reasoning agent's effectiveness depends entirely on having access to all relevant data—pricing, promotions, weather, supply chain events, past interventions—through Unity catalog. Fragmented data across systems would make sophisticated pattern matching impossible. The lakehouse architecture that co-locates models, data, and operational metadata enables the tight feedback loops required for production LLMOps at scale.

## Current and Future Directions

The current focus on agentic root cause analysis with Genie represents a maturation of the conversational AI capabilities. Rather than just answering factual queries, the system is moving toward explaining why forecasts failed and automatically suggesting fixes. This shifts more of the cognitive burden from humans to AI while maintaining human oversight for critical decisions.

Compressing decision latency further is an ongoing objective. While weekly forecasts work for baseline planning, unexpected disruptions—a major weather event, a viral social media trend affecting demand, a supply chain failure—require much faster response. The team is exploring how to enable rapid reforecasting and route adjustments when circumstances change dramatically.

Pushing decisioning to field partners represents the next frontier. Currently, the system supports demand planners and data scientists at headquarters. Extending decision support to drivers and route managers who face real-time choices about deliveries and inventory allocation would complete the signal-to-decision loop. This requires additional considerations around mobile interfaces, offline capability, and even simpler decision frameworks that work without deep domain expertise.

## Technical Sophistication and Pragmatism

What makes this a compelling LLMOps case study is the balance between technical sophistication and business pragmatism. PepsiCo didn't chase state-of-the-art model architectures or the latest GenAI techniques for their own sake. Instead, they identified that handoffs between forecast generation and action were the bottleneck, and they designed an agentic system to eliminate those handoffs. They recognized that their domain expertise was the competitive advantage, so they built PF Plus as proprietary IP while leveraging Databricks for platform capabilities they didn't need to own.

The multi-agent architecture is well-designed for separation of concerns—one agent for anomaly detection, another for causal reasoning, another for incident triage—rather than trying to build a single monolithic agent. Each agent has a clear scope and leverages different data sources and reasoning patterns appropriate to its task. The supervisor pattern with AgentBricks orchestrates these agents while maintaining coherent state.

The integration of rule-based systems alongside learned models shows practical wisdom. Not everything needs to be learned; some business logic is better encoded explicitly. This hybrid approach provides guardrails and ensures consistency with business requirements while still benefiting from the flexibility and pattern recognition of machine learning.

The feedback mechanisms throughout the system—explicit feedback from data scientists after retraining, implicit feedback from MLflow logs, feedback from forecast accuracy metrics—create multiple channels for learning and improvement. This multi-modal feedback is essential for LLMOps systems that need to adapt to changing business conditions and evolving data patterns.

## Operational Considerations

From an operational standpoint, the system handles the classic MLOps challenges of scale, latency, and governance. Processing 125 million weekly forecasts requires massive parallelization, which the Databricks platform provides through distributed compute. The requirement to complete within demand planners' working windows imposes strict latency constraints that shape architectural decisions around caching, pre-computation, and incremental updates.

Governance through Unity catalog addresses compliance, security, and reproducibility requirements. The ability to track lineage from raw data through features, models, forecasts, and ultimately to business decisions provides the audit trail necessary for a public company making supply chain commitments. The security model that restricts planners to their domains prevents unauthorized access while still allowing collaboration where appropriate.

Model versioning through MLflow ensures that the team can track which model version produced which forecasts, rollback if needed, and compare performance across model iterations. This is foundational MLOps practice but critical when managing thousands of models across product hierarchies, geographies, and customer segments.

The case study illustrates that successful LLMOps at scale requires not just deploying models but building comprehensive platforms that integrate data, models, applications, agents, and human workflows into coherent systems that deliver business value measurably and reliably. PepsiCo's journey from legacy forecasting to agent-driven decision support demonstrates how GenAI capabilities can transform traditional ML operations when applied thoughtfully to real business problems.
