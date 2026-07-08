---
title: "Scaling Agentic AI for Fleet Management Insights to 100,000 Users"
slug: "scaling-agentic-ai-for-fleet-management-insights-to-100000-users"
draft: false
llmopsTags:
  - "internet-of-things"
  - "realtime-application"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "serverless"
  - "monitoring"
  - "orchestration"
  - "databases"
  - "postgresql"
  - "redis"
  - "open-source"
  - "anthropic"
  - "amazon-aws"
industryTags: "telecommunications"
company: "Verizon Connect"
summary: "Verizon Connect faced the challenge of transforming overwhelming fleet data—over 500 million data points daily from 1.2 million vehicle subscriptions across 80,000 indicators—into actionable insights for fleet managers. Rather than building static dashboards or rule-based systems, they deployed an agentic AI solution on AWS that combines serverless statistical anomaly detection with dynamic LLM-based investigation. The system uses AWS Lambda, Step Functions, Amazon Bedrock (with Claude and Amazon Nova models), and Strands Agents to automatically detect anomalies, investigate root causes through autonomous tool-calling, and generate natural language insights. Deployed in November 2025, the solution now delivers daily insights to 100,000 users, helping fleet managers identify safety patterns, operational inefficiencies, and maintenance needs proactively rather than reactively."
link: "https://aws.amazon.com/blogs/machine-learning/from-data-overload-to-actionable-insights-how-verizon-connect-scaled-agentic-ai-to-100000-users/"
year: 2026
seo:
  title: "Verizon Connect: Scaling Agentic AI for Fleet Management Insights to 100,000 Users - ZenML LLMOps Database"
  description: "Verizon Connect faced the challenge of transforming overwhelming fleet data—over 500 million data points daily from 1.2 million vehicle subscriptions across 80,000 indicators—into actionable insights for fleet managers. Rather than building static dashboards or rule-based systems, they deployed an agentic AI solution on AWS that combines serverless statistical anomaly detection with dynamic LLM-based investigation. The system uses AWS Lambda, Step Functions, Amazon Bedrock (with Claude and Amazon Nova models), and Strands Agents to automatically detect anomalies, investigate root causes through autonomous tool-calling, and generate natural language insights. Deployed in November 2025, the solution now delivers daily insights to 100,000 users, helping fleet managers identify safety patterns, operational inefficiencies, and maintenance needs proactively rather than reactively."
  canonical: "https://www.zenml.io/llmops-database/scaling-agentic-ai-for-fleet-management-insights-to-100000-users"
  ogTitle: "Verizon Connect: Scaling Agentic AI for Fleet Management Insights to 100,000 Users - ZenML LLMOps Database"
  ogDescription: "Verizon Connect faced the challenge of transforming overwhelming fleet data—over 500 million data points daily from 1.2 million vehicle subscriptions across 80,000 indicators—into actionable insights for fleet managers. Rather than building static dashboards or rule-based systems, they deployed an agentic AI solution on AWS that combines serverless statistical anomaly detection with dynamic LLM-based investigation. The system uses AWS Lambda, Step Functions, Amazon Bedrock (with Claude and Amazon Nova models), and Strands Agents to automatically detect anomalies, investigate root causes through autonomous tool-calling, and generate natural language insights. Deployed in November 2025, the solution now delivers daily insights to 100,000 users, helping fleet managers identify safety patterns, operational inefficiencies, and maintenance needs proactively rather than reactively."
notion:
  pageId: "397f8dff-2538-8031-80d0-c0f354d0268d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:03:00.000Z"
  lastEditedTime: "2026-07-08T20:03:00.000Z"
  publishedAt: "2026-07-08T20:08:45Z"
---

## Overview

Verizon Connect operates the Reveal platform, a global fleet management solution serving over 1.2 million active vehicle subscriptions. The company faced a classic big data challenge: fleet managers were drowning in over 500 million data points generated daily across 80,000 unique indicators. Manual analysis through fragmented logs and spreadsheets made it impossible to identify emerging safety issues, maintenance needs, or operational inefficiencies before they became costly problems. The case study describes how Verizon Connect built and scaled an agentic AI solution to production, serving 100,000 users daily with automated insights starting in November 2025.

## The Production Challenge and Architectural Approach

The case study emphasizes a critical LLMOps principle: understanding where LLMs excel and where they struggle. As noted in the text, a common pitfall in AI engineering is asking an LLM to perform numerical analysis on large-scale raw tabular data. LLMs struggle with complex table structures and numerical extraction at scale, so Verizon Connect deliberately separated concerns. They built a serverless statistical model using AWS Step Functions and AWS Lambda to handle the computationally intensive anomaly detection on structured data, identifying *what* the anomaly is. The AI agent then focuses on *why* it occurred and *how to address it*—tasks better suited to LLM reasoning capabilities.

The architecture follows a clear logical flow: a daily trigger initiates anomaly detection within the analysis layer, which pulls structured information from raw data stores. This module identifies specific anomalies and writes them to a dedicated anomalies table rather than asking the LLM to find "needles in a haystack." After anomalies are ready, a manager triggers AI agents that can run in parallel for different customers or data segments. The AI agent orchestrates the final analysis by querying anomalies for the "what" and referring back to raw data for the "why," using the LLM to synthesize these inputs into coherent narratives. Final insights are stored and served to end-users via the Reveal application.

## Two-Stage Agentic Architecture

The insight generation follows a sophisticated two-stage approach that leverages LLM reasoning capabilities differently at each stage. In Stage 1 (summary generation), the agent receives raw anomalies detected across the fleet and autonomously decides how to aggregate them into coherent insight candidates. The LLM can group anomalies by common root causes, temporal correlation, or categorical similarity—critically, both the grouping logic and selection criteria are entirely at the LLM's discretion without fixed rules. After aggregation, the agent assigns relevance scores based on factors like severity, recurrence, fleet-wide impact, and actionability, then selects the top four most relevant insights to proceed to detailed generation. This adaptive prioritization is highlighted as superior to static business rules that might miss emerging patterns.

Stage 2 (detailed generation) is where the agentic nature becomes critical for production operations. For each summary insight, a separate agent instance is spawned with access to data retrieval tools. The agent autonomously decides which tools to call, in what sequence, and how many times, iterating until it has gathered sufficient evidence to produce a data-backed insight. The case study provides a concrete example: an agent identifies a 30 percent increase in harsh braking events, autonomously pulls historical averages to establish a baseline, recognizes the spike is concentrated on specific dates, drills down to identify that vehicles 1015, 1142, and 1032 were responsible for 70 percent of events, and performs comparative analysis of Vehicle 1015's historical versus current behavior. Only after "connecting these dots" does the agent terminate the loop and generate a final, data-backed insight.

The text argues this agentic approach is essential because fleet management involves countless variables and unpredictable scenarios. Traditional code-based approaches have finite pattern coverage (only detecting explicitly programmed patterns) and rigid investigation flows (following predetermined steps regardless of what data reveals). In contrast, the AI agent can discover patterns of any nature, including edge cases not anticipated during development, and pivot investigation strategy in real time when data suggests unexpected correlations. This flexibility is particularly valuable in fleet management where driver behavior varies unpredictably, external factors create non-obvious correlations, fleet composition evolves, and new anomaly types emerge.

## LLMOps: Agent Implementation and Tooling

Verizon Connect selected Strands Agents, an open source SDK for building and executing AI agents, running in a serverless AWS Lambda environment. This deployment pattern is emphasized as enabling horizontal scaling based on demand. Importantly, the text notes the AI agent is stateless—context required for insights generation is retrieved fresh at analysis time. The agent uses specific tools to retrieve pre-calculated anomalies from Amazon S3, query additional context from Amazon Aurora for raw data and Amazon DynamoDB for historical insights, write final insights back to S3, and track task request status in DynamoDB.

The stateless design is a significant LLMOps consideration, as it simplifies scaling and recovery but requires efficient context retrieval patterns. The multi-tier data layer (S3 for anomalies and final insights, Aurora for structured raw data, DynamoDB for fast lookups of historical insights and task status) demonstrates thoughtful storage partitioning based on access patterns and performance requirements.

## Model Selection and Cost Optimization

The case study provides valuable insights into the model optimization journey for production deployment. The team initially used Claude 3.5 Sonnet (referred to in the text as "Claude 4.5 Sonnet," likely a transcription issue) to validate logic and insight quality. Post-validation, they transitioned to the more cost-efficient Claude 3.5 Haiku for production. Further price-performance optimization led to Amazon Nova 2 Lite, described as a lightning-fast multimodal model that delivers comparable insight quality while reducing input token costs by 70 percent compared to Claude 3.5 Haiku.

This cost reduction is highlighted as critical because the workload is dominated by input tokens (telematics data, anomalies, context). The efficiency of Nova 2 Lite enables more cost-effective delivery of AI insights to the entire user base. Importantly, quality was maintained through an automated testing suite and a gold-standard dataset, ensuring a battle-tested solution upon full release. This represents mature LLMOps practice: systematic model evaluation against established benchmarks during model transitions.

All LLMs are hosted in Amazon Bedrock, described as a fully managed service with comprehensive generative AI capability, security, privacy, and responsible AI features. The managed service approach simplifies operational concerns around model hosting, scaling, and security.

## Production Scale and Concurrency Management

To provide insights ready at the start of the business day for 100,000 users, Verizon Connect uses Amazon SQS to manage execution. By controlling the maximum concurrency of the SQS-to-Lambda trigger, they can smooth out spikes in API demand, stay within Amazon Bedrock quotas (Tokens Per Minute and Requests Per Minute), and provide reliable delivery without over-provisioning resources.

The case study provides a concrete scaling example: delivering insights for customers across the entire United States with a target delivery of 8:00 AM ET based on data up to Midnight PT the previous day. Given the three-hour time zone difference, the end-to-end process must complete within a five-hour window. Allocating one hour for anomaly detection leaves a four-hour window for AI agent and LLM insight generation. At a rate of 1,500 RPM (adjustable), the insight generation phase takes approximately 1.25 hours, well within operational requirements.

This demonstrates sophisticated production planning: understanding the complete pipeline timing, accounting for time zone constraints, and tuning concurrency controls to meet SLA requirements while respecting platform quotas. The use of SQS as a buffering and rate-limiting mechanism is a standard but effective pattern for managing bursts and controlling downstream load.

## Workflow Orchestration

The overall workflow demonstrates end-to-end orchestration across multiple AWS services. An insights request is triggered with a list of customer IDs for which insights must be calculated. The statistical model performs anomaly detection and stores results in S3. N parallel requests are triggered as previously described, with N agents analyzing data, creating insights, and saving them to S3. During this phase, agents invoke Amazon Bedrock APIs to reach the selected model. The Reveal application then accesses insights stored in S3.

The parallel execution model is key to meeting the scale requirements—processing insights for 100,000 users within the available time window requires substantial parallelism. The serverless architecture (Lambda, Step Functions, SQS) naturally supports this scale-out pattern without requiring infrastructure management.

## Delivered Business Value

The Operational Insights feature was rolled out to users in November 2025 and serves fleet managers with natural language narratives. Examples provided include safety pattern detection ("Your fleet saw a 100% increase in harsh braking this week. Interestingly, this coincides with a reduction in harsh acceleration, suggesting driver fatigue or increased congestion"), operational efficiency insights ("Vehicle #90000 is idling for 50% of its engine-on time, significantly above your fleet average. This represents unnecessary fuel cost"), and fleet performance observations ("Daily mileage is down 59%, but speeding events are up 54%. This suggests vehicles are traveling shorter distances at higher speeds—consider route optimization").

These examples illustrate the system's ability to go beyond simple alerting to provide contextualized analysis and actionable recommendations. The natural language format makes insights accessible to fleet managers who may not be data analysts.

## Critical Assessment and Future Direction

While the case study presents an impressive production deployment, several points warrant balanced consideration. The text is promotional content from AWS, so claims about effectiveness and adoption should be viewed accordingly. The specific metrics for insight accuracy, user satisfaction, or business impact (such as cost savings or safety improvements) are not provided beyond the architectural details and example outputs.

The choice of an agentic approach over simpler rule-based systems is well-justified for the unpredictable nature of fleet operations, but this comes with complexity trade-offs. Agentic systems with autonomous tool-calling and iterative reasoning are harder to debug, monitor, and explain than deterministic pipelines. The text doesn't discuss how Verizon Connect handles cases where the agent makes incorrect inferences or how they monitor agent behavior in production.

The stateless agent design simplifies some operational concerns but means context must be retrieved fresh for each analysis. Depending on the volume and structure of this context, this could create performance or cost challenges at scale. The text doesn't detail how they optimize these context retrieval patterns or handle cases where relevant context might be extensive.

The model optimization journey from Claude 3.5 Sonnet to Claude 3.5 Haiku to Amazon Nova 2 Lite demonstrates cost-conscious iteration, but the 70 percent cost reduction claim for Nova 2 Lite compared to Haiku is focused on input tokens. The overall cost depends on the ratio of input to output tokens and the specific pricing structure. The automated testing suite and gold-standard dataset mentioned are critical for validating these transitions, but details about the evaluation methodology are not provided.

Looking ahead, Verizon Connect plans to migrate from AWS Lambda-based agent deployment to Amazon Bedrock AgentCore Runtime to further streamline Lambda execution and use Model Context Protocol (MCP) for faster tool integration. This suggests they see room for further operational simplification and are actively engaging with emerging agent orchestration patterns.

## LLMOps Takeaways

This case study demonstrates several mature LLMOps practices. The separation of concerns between statistical anomaly detection and LLM-based reasoning shows understanding of where different computational approaches excel. The two-stage agentic architecture balances the need for prioritization with detailed investigation. The systematic model optimization journey with automated testing maintains quality while reducing costs. The use of SQS for concurrency control and rate limiting manages platform quotas while meeting SLA requirements. The serverless architecture enables horizontal scaling to meet demanding production requirements (100,000 daily users).

The case also illustrates emerging patterns in agentic AI deployment: stateless agent design for simplicity, tool-based investigation with autonomous decision-making, and multi-tier data architecture supporting different access patterns. The production timeline (deployment in November 2025 after development and validation) suggests a measured approach rather than rushing to market.

For organizations considering similar deployments, the case study suggests starting with a small-scale pilot to validate basic use cases and establish cost-efficiency, then expanding with automated workflows and data-driven personalization, and finally transitioning to full enterprise deployment with advanced orchestration and real-time processing. This phased approach balances learning and risk management with the urgency to deliver value.
